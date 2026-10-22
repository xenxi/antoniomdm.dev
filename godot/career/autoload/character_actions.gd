extends Node
## Shared presentation and coffee rules for both migration hosts.
## Presentación y reglas de café compartidas por ambos hosts de la migración.
signal changed
const ACTIONS = ["door", "work", "talk", "guitar", "study", "idle", "coffee", "focus"]
var action: String = ""
var elapsed: float = 0.0
var duration: float = 0.0
var idle_elapsed: float = 0.0
var idle_variant: int = 0
var moving: bool = false
var legacy_active: bool = false
var legacy_reduced: bool = false
var publish_clock: float = 0.0
var coffee := CoffeeChallenge.new()

func _ready() -> void:
	EventBus.world_entered.connect(func(_id): reset_world())
	EventBus.dialogue_changed.connect(func():
		if DialogueSystem.current != null: play("talk", 3600.0)
		elif action == "talk": cancel_action())

func active() -> bool:
	return GameState.active if WebBridge.native_runtime else legacy_active

func reduced() -> bool:
	return GameState.reduced_motion if WebBridge.native_runtime else legacy_reduced

func world_speed() -> float:
	return .15 if coffee.phase == "playing" and not coffee.untimed else 1.0

func play(id: String, seconds: float = 3.2) -> void:
	if id not in ACTIONS or not active(): return
	# Repeated dialogue/mission updates must not rewind an ongoing gesture.
	# Las actualizaciones de diálogo/misión no rebobinan un gesto en curso.
	if action == id and id in ["work", "talk", "guitar", "study"]:
		duration = maxf(duration, elapsed + seconds)
		return
	action = id
	elapsed = 0.0
	duration = seconds
	idle_elapsed = 0.0
	changed.emit()

func interact(id: String) -> void:
	if id == "coffee":
		if coffee.drink(): play("coffee", 2.0)
	elif id in ["portal", "door"]: play("door", .65)
	elif id in ["terminal", "computer", "desk"]: play("work", 4.0)
	elif id in ["guitar", "music"]: play("guitar", 5.0)
	elif id in ["books", "study", "library", "review"]: play("study", 4.0)
	else: play("talk", 3.2)
	changed.emit()

func command(value: Dictionary) -> void:
	if value.get("type") == "characterStatus": changed.emit(); return
	if not active(): return
	match value.get("type"):
		"characterAction":
			if coffee.phase == "playing": return
			var id = str(value.get("id", ""))
			if id == "coffee": interact(id)
			elif id in ACTIONS and id != "focus": play(id, 5.0 if id == "guitar" else 3.2)
		"coffeeStart":
			if coffee.start(reduced() or value.get("untimed", false) == true): play("focus", 3600.0)
		"coffeeHit": coffee.hit()
		"coffeeCancel": coffee.cancel(); cancel_action()
		_: return
	changed.emit()

func cancel_action() -> void:
	var had_action = not action.is_empty()
	action = ""
	elapsed = 0.0
	duration = 0.0
	idle_elapsed = 0.0
	if had_action: changed.emit()

func reset_world() -> void:
	cancel_action()
	coffee.cancel()
	moving = false
	changed.emit()

func motion(value: bool) -> void:
	moving = value
	if moving:
		idle_elapsed = 0.0
		if action != "focus": cancel_action()

func frame() -> int:
	if reduced(): return 0
	# A sip or door gesture plays once with anticipation and recovery.
	# Un sorbo o una puerta se animan una vez, con preparación y recuperación.
	if action in ["coffee", "door", "idle"]:
		var progress = clampf(elapsed / maxf(duration, .01), 0.0, .999)
		return mini(7, int(smoothstep(0.0, 1.0, progress) * 8.0))
	# Schedule expressions as short beats, avoiding a blink on every other frame.
	# Espacia las expresiones para no parpadear en cada fotograma alterno.
	if action == "work":
		var sequence = [0, 1, 2, 4, 6, 4, 2, 1, 0, 1, 2, 4, 6, 7, 6, 4]
		return sequence[int(elapsed * 10.0) % sequence.size()]
	if action == "guitar":
		var sequence = [0, 2, 4, 6, 4, 2, 0, 2, 4, 6, 4, 2, 1, 3, 5, 7]
		return sequence[int(elapsed * 12.0) % sequence.size()]
	var fps = {"talk": 8.0, "study": 6.0, "focus": 7.0}.get(action, 8.0)
	return int(elapsed * fps) % 8

func presentation_action() -> String:
	# Each idle variant is a complete gesture, never unrelated poses in a loop.
	# Cada variante de reposo es un gesto completo, no poses inconexas en bucle.
	return ["idle", "focus", "talk"][idle_variant] if action == "idle" else action

func _process(delta: float) -> void:
	if not active(): return
	if reduced() and coffee.phase == "playing": coffee.untimed = true
	var previous = coffee.phase
	coffee.tick(delta)
	if previous == "playing" and coffee.phase != "playing": cancel_action(); changed.emit()
	if not action.is_empty():
		elapsed += delta
		if elapsed >= duration: cancel_action(); changed.emit()
	elif not moving and coffee.phase != "playing":
		idle_elapsed += delta
		if idle_elapsed >= 12.0 and not reduced():
			idle_variant = (idle_variant + 1) % 3
			play("idle", 3.0)
	publish_clock += delta
	if coffee.phase == "playing" and publish_clock >= .1:
		publish_clock = 0.0
		changed.emit()

func snapshot() -> Dictionary:
	return {"action": action, "coffee": coffee.snapshot(), "active": active(), "slow": world_speed() < 1.0}
