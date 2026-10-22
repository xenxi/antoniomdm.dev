extends Node
## Only lifecycle/configuration and portfolio intentions cross the web boundary.
## Solo ciclo de vida/configuración e intenciones del portfolio cruzan el puente.
var interface: JavaScriptObject
var callback: JavaScriptObject
var native_runtime: bool = true
var debug_enabled: bool = false
var embedded: bool = false
signal standalone_portfolio(kind: String, content_id: String)

func _ready() -> void:
	EventBus.portfolio_requested.connect(_portfolio)
	if not OS.has_feature("web"): return
	interface = JavaScriptBridge.get_interface("careerBridge")
	if interface == null:
		push_error("Puente web no disponible / Web bridge unavailable")
		return
	native_runtime = bool(interface.nativeRuntime())
	if not native_runtime: return
	debug_enabled = bool(interface.e2eDebug())
	embedded = bool(interface.embedded())
	EventBus.world_entered.connect(func(id): emit_event({"type": "worldEntered", "id": id}))
	EventBus.quest_completed.connect(func(id): emit_event({"type": "questCompleted", "id": id}))
	EventBus.dialogue_changed.connect(_dialogue)
	EventBus.language_changed.connect(_dialogue)
	EventBus.save_failed.connect(func(): emit_event({"type": "storageError"}))
	EventBus.activity_changed.connect(func(): emit_event({"type": "activity", "active": GameState.active}))
	callback = JavaScriptBridge.create_callback(_receive)
	interface.subscribe(callback)

func announce_ready() -> void:
	CharacterActions.changed.connect(func(): emit_event({"type": "characterState", "value": CharacterActions.snapshot()}))
	if interface != null and native_runtime:
		var configuration = JSON.parse_string(str(interface.configuration()))
		if configuration is Dictionary:
			GameState.set_language(str(configuration.get("language", "es")))
			GameState.reduced_motion = bool(configuration.get("reducedMotion", false))
		GameSession.changed.connect(func(): emit_event({"type": "session", "session": GameSession.view_model()}))
	emit_event({"type": "ready"})

func _receive(args: Array) -> void:
	if args.is_empty() or not args[0] is String or args[0].length() > 64000: return
	var command = JSON.parse_string(args[0])
	if not command is Dictionary: return
	match command.get("type", ""):
		"characterAction", "characterStatus", "coffeeStart", "coffeeHit", "coffeeCancel": CharacterActions.command(command)
		"activate", "resume": GameState.set_active(true)
		"pause":
			GameState.set_active(false)
			SaveManager.save_game()
			emit_event({"type": "paused"})
		"setLanguage": GameState.set_language(str(command.get("language", "es")))
		"configuration":
			if command.get("reducedMotion") is bool: GameState.reduced_motion = command.reducedMotion
		"requestSession": emit_event({"type": "session", "session": GameSession.view_model()})
		"advanceDialogue": DialogueSystem.advance()
		"cancelDialogue": DialogueSystem.cancel()
		"approach":
			if not is_instance_valid(SceneManager.current): return
			for target in SceneManager.current.interactables:
				if target.interaction_id == command.get("id", ""):
					var world = SceneManager.current
					world.player.travel_to(Vector2i(world.layout.unproject(world.to_local(target.anchor())).floor()), target)
		"interactNearby":
			if not is_instance_valid(SceneManager.current) or not SceneManager.current.player.enabled(): return
			var target = SceneManager.current.nearby()
			if target: target.interact.call_deferred()
		"step":
			var direction = command.get("direction", [])
			if not is_instance_valid(SceneManager.current) or not direction is Array or direction.size() != 2: return
			for coordinate in direction:
				if not GameSession.rules._integer(coordinate, -1, 1): return
			SceneManager.current.player.step(Vector2i(direction[0], direction[1]))
		"inspect":
			if debug_enabled and is_instance_valid(SceneManager.current):
				var player = SceneManager.current.player
				var cast = SceneManager.current.get_node_or_null("Residents")
				var doors = SceneManager.current.get_node_or_null("Doors")
				emit_event({"type": "debugDoors", "doors": doors.snapshot() if doors else []})
				emit_event({"type": "debugState", "world": GameState.current_world, "position": [player.tile.x, player.tile.y], "active": GameState.active, "reducedMotion": GameState.reduced_motion, "language": GameState.language, "residents": cast.snapshot() if cast else {}})
		_: GameSession.dispatch(command)

func _dialogue() -> void:
	var dialogue = DialogueSystem.current
	emit_event({"type": "dialogue", "id": dialogue.id if dialogue else "", "speaker": GameState.localized(dialogue.speaker) if dialogue else "", "text": GameState.localized(dialogue.lines[DialogueSystem.line_index]) if dialogue else ""})

func emit_event(payload: Dictionary) -> void:
	if interface != null: interface.emit(JSON.stringify(payload))

func read_save() -> Dictionary:
	if interface == null: return {"ok": false}
	var result = JSON.parse_string(str(interface.readSave()))
	return result if result is Dictionary else {"ok": false}

func write_save(serialized: String) -> bool:
	return interface != null and bool(interface.writeSave(serialized))

func _portfolio(kind: String, content_id: String) -> void:
	SaveManager.save_game()
	if interface != null:
		GameState.set_active(false)
		emit_event({"type": "portfolio", "kind": kind, "id": content_id})
	else: standalone_portfolio.emit(kind, content_id)
