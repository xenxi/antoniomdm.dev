extends Node2D
## ES: Poses dibujadas, pies alineados y un reloj compartido para ambos modos.
## EN: Authored poses, aligned feet and one clock shared by both runtimes.
const ATLAS = preload("res://assets/characters/student-residents.webp")
const POINTS = [Vector2(280, 65), Vector2(371, 246), Vector2(183, 133)]
var elapsed: float = 0.0
var native: bool = false
var residents: Array[Sprite2D] = []
var meter: Polygon2D
var meter_label: Label
var quiet: bool = false
var tension: float = 0.0
var rows: Array[int] = [0, 2, 4]
var poses: Array[int] = [0, 0, 0]

func _ready() -> void:
	if get_parent() is ArcadeWorld:
		native = true
		_configure_native.call_deferred()

func _configure_native() -> void:
	configure(true)
	get_parent().get_node("Object_team/AnimatedSprite2D").visible = false
	EventBus.npc_interacted.connect(func(id):
		if id == "hairy": elapsed = floorf(elapsed / 36.0) * 36.0)

func configure(native_mode: bool) -> void:
	native = native_mode
	y_sort_enabled = native
	for resident in residents: resident.free()
	residents.clear()
	for point in POINTS:
		var sprite = Sprite2D.new()
		sprite.texture = ATLAS
		sprite.region_enabled = true
		sprite.centered = false
		sprite.offset = Vector2(-128, -225)
		sprite.scale = Vector2.ONE * .15
		sprite.position = point
		add_child(sprite)
		residents.append(sprite)
	meter = Polygon2D.new()
	meter.color = Color("efbe55")
	residents[2].add_child(meter)
	meter_label = Label.new()
	meter_label.position = Vector2(-88, -204)
	meter_label.add_theme_font_size_override("font_size", 18)
	residents[2].add_child(meter_label)
	advance(0.0, false, false, Vector2.ZERO)

func _process(delta: float) -> void:
	if not native or residents.is_empty(): return
	var world = get_parent()
	quiet = "noise" in GameSession.rules.progress(GameSession.game()).get("side", [])
	advance(delta * CharacterActions.world_speed(), GameState.active and GameSession.panel.is_empty() and DialogueSystem.current == null, GameState.reduced_motion, world.player.position)

func advance(delta: float, active: bool, reduced: bool, player: Vector2, language: String = "") -> void:
	if residents.is_empty(): return
	if active and not reduced: elapsed += delta
	var cycle = fmod(elapsed, 36.0)
	var cape_cycle = fmod(elapsed, 16.0)
	var walking = cape_cycle >= 12.0
	tension = minf(cycle / 30.0, 1.0)
	rows = [1 if quiet or fmod(elapsed, 16.0) >= 8.0 else 0, 3 if walking else 2, 5 if cycle >= 30.0 else 4]
	poses = [0 if quiet else int(elapsed * 8) % 8, int(elapsed * (8 if walking else 7)) % 8, int(elapsed * 10) % 8 if cycle >= 30.0 else mini(7, int(tension * 8))]
	# ES: El paseo va y vuelve por un tramo de suelo libre delante del sofá.
	# EN: The stroll goes out and back along clear floor in front of the sofa.
	var distance = 6.0 * (cape_cycle - 12.0 if cape_cycle < 14.0 else 16.0 - cape_cycle) if walking else 0.0
	residents[1].position = POINTS[1] - Vector2(distance, 0)
	residents[1].flip_h = walking and cape_cycle < 14.0
	for index in residents.size():
		var sprite = residents[index]
		sprite.region_rect = Rect2(poses[index] * 256, rows[index] * 256, 256, 256)
		if not native: sprite.z_index = clampi(int((sprite.position.y - player.y) * 16), -1000, 1000)
	meter.polygon = PackedVector2Array([Vector2(-85, -170), Vector2(-85 + tension * 170, -170), Vector2(-85 + tension * 170, -159), Vector2(-85, -159)])
	var lang = GameState.language if language.is_empty() else language
	meter_label.text = "BILIRRUBINA" if lang == "es" else "BILIRUBIN"

func snapshot() -> Dictionary:
	return {"count": residents.size(), "elapsed": elapsed, "rows": rows, "poses": poses, "tension": tension}
