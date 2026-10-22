class_name ArcadePlayer
extends CharacterBody2D

signal arrived(tile: Vector2i)
signal interaction_requested(target: ArcadeInteractable)
const KEYS = {KEY_UP: Vector2i.UP, KEY_W: Vector2i.UP, KEY_DOWN: Vector2i.DOWN, KEY_S: Vector2i.DOWN, KEY_LEFT: Vector2i.LEFT, KEY_A: Vector2i.LEFT, KEY_RIGHT: Vector2i.RIGHT, KEY_D: Vector2i.RIGHT}
@export var tiles_per_second: float = 8.0
var layout: WorldGrid
var navigation: GridNavigation
var tile: Vector2i
var route: Array[Vector2i] = []
var held_keys: Array[int] = []
var target: ArcadeInteractable
var moving: bool = false
var destination: Vector2i
var facing: String = "down"

func configure(grid: WorldGrid, nav: GridNavigation, spawn: Vector2i) -> void:
	layout = grid
	navigation = nav
	tile = spawn
	destination = tile
	position = layout.project(Vector2(tile) + Vector2(.5, .5))
	EventBus.activity_changed.connect(stop)
	EventBus.dialogue_changed.connect(stop)
	GameSession.changed.connect(_session_changed)

func _session_changed() -> void:
	if not GameSession.panel.is_empty(): stop()

func _unhandled_key_input(event: InputEvent) -> void:
	if not event is InputEventKey or not KEYS.has(event.physical_keycode): return
	if not event.pressed:
		held_keys.erase(event.physical_keycode)
		return
	if event.echo or not enabled(): return
	held_keys.erase(event.physical_keycode)
	held_keys.append(event.physical_keycode)
	route.clear()
	target = null
	if not moving: _begin_step(tile + KEYS[event.physical_keycode])
	get_viewport().set_input_as_handled()

func enabled() -> bool:
	return GameState.active and DialogueSystem.current == null and GameSession.panel.is_empty() and layout != null

func stop() -> void:
	$Visual.present(facing, false, GameState.reduced_motion, 0.0)
	held_keys.clear()
	route.clear()
	target = null
	# Settle the accepted step; never leave the player inside a collision.
	# Termina el paso aceptado; nunca deja al jugador dentro de una colisión.
	if moving and layout:
		var doors = get_parent().get_node_or_null("Doors")
		var end = layout.project(Vector2(destination) + Vector2(.5, .5))
		if not doors or doors.passage_ready(position, end): tile = destination
		destination = tile
		position = layout.project(Vector2(tile) + Vector2(.5, .5))
		moving = false
		arrived.emit(tile)

func travel_to(point: Vector2i, interactable: ArcadeInteractable = null) -> void:
	if not enabled(): return
	held_keys.clear()
	target = interactable
	route = navigation.path(destination if moving else tile, point, target != null)

func step(direction: Vector2i) -> void:
	if not enabled() or moving or absi(direction.x) + absi(direction.y) != 1: return
	target = null
	route.clear()
	_begin_step(tile + direction)

func _begin_step(next: Vector2i) -> void:
	if not navigation.walkable(next) or absi(next.x - tile.x) + absi(next.y - tile.y) != 1: return
	var direction = next - tile
	facing = "up" if direction == Vector2i.UP else "left" if direction == Vector2i.LEFT else "right" if direction == Vector2i.RIGHT else "down"
	destination = next
	moving = true

func _physics_process(delta: float) -> void:
	var doors = get_parent().get_node_or_null("Doors")
	if doors: doors.advance(delta, enabled(), GameState.reduced_motion, position)
	if not enabled():
		$Visual.present(facing, false, GameState.reduced_motion, delta)
		return
	var before = position
	if moving:
		var end = layout.project(Vector2(destination) + Vector2(.5, .5))
		if doors and not doors.request_crossing(position, end, GameState.reduced_motion):
			$Visual.present(facing, false, GameState.reduced_motion, delta)
			return
		var distance = layout.project(Vector2(destination)).distance_to(layout.project(Vector2(tile)))
		position = end if GameState.reduced_motion else position.move_toward(end, distance * tiles_per_second * delta)
		if position.is_equal_approx(end):
			tile = destination
			moving = false
			arrived.emit(tile)
	if not moving:
		if is_instance_valid(target):
			var point = Vector2i(layout.unproject(get_parent().to_local(target.anchor())).floor())
			if absi(tile.x - point.x) + absi(tile.y - point.y) <= 1:
				var interaction = target
				target = null
				route.clear()
				interaction_requested.emit(interaction)
		if not route.is_empty(): _begin_step(route.pop_front())
		elif not held_keys.is_empty(): _begin_step(tile + KEYS[held_keys.back()])
	var travelled = layout.unproject(position).distance_to(layout.unproject(before))
	$Visual.present(facing, moving, GameState.reduced_motion, delta, travelled)

func _notification(what: int) -> void:
	if what == NOTIFICATION_WM_WINDOW_FOCUS_OUT: stop()
