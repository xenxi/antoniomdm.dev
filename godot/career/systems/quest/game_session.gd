extends Node
## Session orchestration; rules, physics and presentation remain separate.
## Coordina la sesión; reglas, física y presentación permanecen separadas.
signal changed
var rules := CampaignRules.new()
var campaign: Dictionary
var quick_game: Dictionary = {}
var quick_id: String = ""
var campaign_exploration: Dictionary = {}
var menu_return_panel: String = ""
var panel: String = ""
var selected_side: String = ""
var event_id: String = ""
var event_phase: int = 0
var interrupted_panel: String = ""
var feedback: Dictionary = {}
var clock: float = 0.0
var event_clock: float = 0.0
var energy_clock: float = 0.0

func _ready() -> void:
	campaign = rules.new_game()
	EventBus.world_entered.connect(_world_entered)
	EventBus.language_changed.connect(func(): changed.emit())
	EventBus.activity_changed.connect(func(): changed.emit())

func game() -> Dictionary:
	return quick_game if not quick_game.is_empty() else campaign

func _world_entered(id: String) -> void:
	if id != "town": rules.select(game(), id)
	panel = ("info" if quick_done() else "mission") if not quick_game.is_empty() else ""
	clock = 0.0
	event_clock = 0.0
	energy_clock = 0.0
	feedback = {}
	menu_return_panel = ""
	changed.emit()

func available() -> bool:
	return WebBridge.native_runtime and GameState.active and GameState.current_world != "town" and not SceneManager.changing and not quick_done()

func quick_done() -> bool:
	return not quick_game.is_empty() and rules.progress(quick_game).mission > rules.chapter(quick_game.chapterId).missions.find(quick_id)

func _process(delta: float) -> void:
	if CharacterActions.coffee.phase == "playing": return
	if not available() or DialogueSystem.current != null or quick_done(): return
	if panel not in ["", "mission"]: return
	if quick_game.is_empty():
		for pending in rules.progress(game()).seen:
			if pending not in rules.progress(game()).completedEvents:
				_start_event(pending)
				return
	clock += delta
	if clock >= 1.0:
		clock -= 1.0
		rules.tick(game())
		_publish()
	if quick_game.is_empty():
		event_clock += delta
		if event_clock >= (0.2 if rules.complete(game()) else 16.0):
			var pending = rules.eligible_events(game())
			if not pending.is_empty(): _start_event(pending[0])
	if game().chapterId == "freelance" and panel.is_empty():
		energy_clock += delta
		if energy_clock >= 12.0:
			energy_clock -= 12.0
			var unfinished = rules.catalog.side_quests.any(func(side): return side.chapter == "freelance" and side.id not in rules.progress(game()).side and rules.progress(game()).mission >= side.get("after", 0))
			if unfinished:
				rules.progress(game()).energy = maxi(0, int(rules.progress(game()).energy) - 3)
				_publish()

func _publish() -> void:
	changed.emit()
	SaveManager.save_game()

func _start_event(id: String) -> void:
	if not rules.begin_event(game(), id): return
	interrupted_panel = panel
	event_id = id
	event_phase = 0
	panel = "event"
	feedback = {}
	_publish()

func interact(id: String) -> void:
	if not available() or not panel.is_empty(): return
	CharacterActions.interact(id)
	var current = rules.mission(game())
	if not current.is_empty() and id == current.get("target", "terminal"):
		panel = "mission"
	elif id == "coffee":
		game().coffee = true
		rules.recover(game())
		feedback = rules.catalog.quest_copy["infinite" if game().chapterId == "nokia" else "coffee"]
		panel = "info"
	elif id == "secret":
		game().secret = true
		feedback = rules.catalog.copy.secretLine
		panel = "info"
	else:
		for side in rules.catalog.side_quests:
			if side.chapter == game().chapterId and side.target == id and side.id not in rules.progress(game()).side and rules.progress(game()).mission >= side.get("after", 0):
				selected_side = side.id
				panel = "side"
				break
		if panel.is_empty():
			feedback = rules.catalog.copy.npcLine
			panel = "info"
	_publish()

func dispatch(command: Dictionary) -> void:
	var type = str(command.get("type", ""))
	match type:
		"newGame":
			SaveManager.allow_new_game()
			campaign = rules.new_game()
			quick_game = {}
			quick_id = ""
			campaign_exploration = {}
			GameState.apply_exploration(GameState.fresh_exploration())
			GameState.set_active(true)
			SceneManager.change_world("town")
		"enterWorld":
			var id = str(command.get("id", ""))
			request_world(id)
		"returnToHub": request_world("town")
		"endQuick": _end_quick()
		"startQuick":
			_start_quick(str(command.get("id", "")), str(command.get("chapter", "")))
		"openMenu":
			if panel not in ["menu", "reset"]: menu_return_panel = panel
			panel = "menu"
		"confirmNewGame": panel = "reset"
		"openMission":
			if available() and not rules.mission(game()).is_empty():
				CharacterActions.play("work", 4.0)
				panel = "mission"
		"interact":
			interact(str(command.get("id", "")))
			return
		"answer":
			if not available() or panel != "mission": return
			var result = rules.choose(game(), str(command.get("id", "")))
			if result.get("valid", false):
				feedback = result.feedback
				if result.completed: panel = "info"
		"sideAnswer":
			if not available() or panel != "side" or not command.get("index") is float and not command.get("index") is int: return
			if command.index != floor(command.index): return
			var result = rules.choose_side(game(), selected_side, int(command.index))
			if result.get("valid", false):
				feedback = result.feedback
				if result.accepted: panel = "info"
		"closePanel":
			if panel in ["menu", "reset"]: panel = menu_return_panel
			elif panel == "event": GameState.set_active(false)
			else:
				panel = interrupted_panel if panel == "info" else ""
				interrupted_panel = ""
		"setTimerEnabled":
			if command.get("enabled") is bool: game().timed = command.enabled
		"retryMission":
			var current = rules.mission(game())
			if available() and not current.is_empty(): rules.progress(game()).remaining = current.get("seconds", 90)
		"recoverEnergy":
			if available(): rules.recover(game())
		"repairPipeline":
			if available(): rules.progress(game()).pendingPipeline = false
		"replay":
			if available(): rules.replay(game())
		"eventChoice": _event_choice(str(command.get("id", "")))
		"snakeStep", "snakeRestart":
			if not available() or panel != "mission" or rules.mission(game()).get("challenge", "") != "snake": return
			var item = rules.progress(game())
			if item.energy == 0 or (game().timed and item.get("remaining", -1) == 0): return
			var before = item.get("snake", SnakeRules.fresh())
			var after = SnakeRules.fresh()
			if type == "snakeStep":
				var direction = command.get("direction", [])
				if not direction is Array or direction.size() != 2: return
				if not direction[0] is float and not direction[0] is int: return
				if not direction[1] is float and not direction[1] is int: return
				after = SnakeRules.step(before, Vector2i(direction[0], direction[1]))
			if after.failed and not before.failed: rules.fail_attempt(game())
			item.snake = after
		_: return
	_publish()

func request_world(id: String, spawn: String = "Entry") -> bool:
	if not GameState.active: return false
	if id == "town" and not quick_game.is_empty(): return _end_quick()
	if id != "town" and not rules.unlocked(game(), id): return false
	return SceneManager.change_world(id, spawn)

func _start_quick(id: String, chapter: String) -> void:
	if not GameState.active or not SceneManager.WORLDS.has(chapter): return
	var initial = rules.quick(id, chapter)
	if initial.is_empty(): return
	if is_instance_valid(SceneManager.current): SceneManager.current.player.stop()
	var previous = GameState.exploration()
	var previous_quick = quick_game
	var previous_id = quick_id
	if quick_game.is_empty(): campaign_exploration = previous.duplicate(true)
	quick_game = initial
	quick_id = id
	GameState.apply_exploration(GameState.fresh_exploration(chapter))
	if not SceneManager.change_world(chapter):
		GameState.apply_exploration(previous)
		quick_game = previous_quick
		quick_id = previous_id
		if quick_game.is_empty(): campaign_exploration = {}
		return
	panel = "mission"

func _end_quick() -> bool:
	if quick_game.is_empty(): return false
	var previous = GameState.exploration()
	var saved = campaign_exploration.duplicate(true)
	var previous_quick = quick_game
	var previous_id = quick_id
	quick_game = {}
	quick_id = ""
	campaign_exploration = {}
	GameState.apply_exploration(saved)
	if SceneManager.change_world(saved.world): return true
	GameState.apply_exploration(previous)
	quick_game = previous_quick
	quick_id = previous_id
	campaign_exploration = saved
	return false

func _event_choice(id: String) -> void:
	if not available() or panel != "event": return
	if event_id == "freelance" and event_phase == 0:
		if id in ["accept", "acceptAnyway"]: event_phase = 1
		return
	var allowed = {"freelance": ["fixConfig"], "incident": ["investigate", "delegate", "defer"], "wedding": ["weddingAction"], "emma-born": ["welcomeEmma"], "friday": ["home", "deploy"], "family": ["pause", "delegate"]}
	if id not in allowed.get(event_id, []): return
	if id == "defer":
		rules.fail_attempt(game())
		feedback = rules.catalog.copy.deferResult
		return
	if id == "investigate": rules.progress(game()).pendingPipeline = true
	rules.finish_event(game(), event_id)
	event_id = ""
	panel = "info"
	var result = {"fixConfig": "sideDone", "investigate": "investigateResult", "weddingAction": "weddingDone", "welcomeEmma": "familyDone", "home": "homeResult"}.get(id, "coverResult")
	feedback = rules.catalog.copy[result]
	if id == "pause": GameState.set_active(false)

func view_model() -> Dictionary:
	return SessionPresentation.view_model(self)
