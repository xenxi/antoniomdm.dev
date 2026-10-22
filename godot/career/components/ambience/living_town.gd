extends Node2D
## One ambient simulation shared by native scenes and the temporary web host.
## Una simulación ambiental compartida por escenas nativas y el host temporal.
@export_range(0, 14) var population: int = 12
var life := TownLife.new()
var pedestrians: Array[Node2D] = []
var ground: Node2D
var air: Node2D
var projection: Callable
var native: bool = false
var ready_world: bool = false

func _ready() -> void:
	if get_parent() is ArcadeWorld:
		native = true
		_configure_native.call_deferred()

func _configure_native() -> void:
	var world = get_parent()
	configure(world.navigation.grid, func(tile: Vector2): return world.layout.project(tile), true)

func configure(grid: AStarGrid2D, project: Callable, native_mode: bool) -> void:
	for pedestrian in pedestrians: pedestrian.free()
	pedestrians.clear()
	if is_instance_valid(ground): ground.free()
	if is_instance_valid(air): air.free()
	native = native_mode
	y_sort_enabled = native
	projection = project
	life.configure(grid, population)
	for citizen in life.citizens:
		var pedestrian = Node2D.new()
		pedestrian.set_script(load("res://components/ambience/town_pedestrian.gd"))
		add_child(pedestrian)
		pedestrians.append(pedestrian)
	ground = Node2D.new()
	ground.set_script(load("res://components/ambience/town_lighting.gd"))
	ground.z_index = -2 if native else -1500
	add_child(ground)
	air = Node2D.new()
	air.set_script(load("res://components/ambience/town_lighting.gd"))
	air.foreground = true
	air.native_fountains = native
	air.z_index = 5 if native else 1500
	add_child(air)
	for stop in life.stops:
		ground.pools.append(projection.call(Vector2(stop) + Vector2(.5, .5)))
		air.pools.append(projection.call(Vector2(stop) + Vector2(.5, .5)))
	ready_world = true
	advance(0.0, false, false, Vector2(-100, -100))

func _process(delta: float) -> void:
	if not native or not ready_world: return
	var world = get_parent()
	advance(delta * CharacterActions.world_speed(), GameState.active, GameState.reduced_motion, world.layout.unproject(world.player.position) - Vector2(.5, .5))

func advance(delta: float, active: bool, reduced: bool, player: Vector2) -> void:
	if not ready_world: return
	life.advance(delta, active, reduced, player)
	for index in pedestrians.size():
		var citizen = life.citizens[index]
		var pedestrian = pedestrians[index]
		pedestrian.position = projection.call(citizen.position + Vector2(.5, .5))
		var direction = projection.call(citizen.facing) - projection.call(Vector2.ZERO)
		pedestrian.present(citizen, reduced, direction)
		if not native: pedestrian.z_index = clampi(int((citizen.position.x + citizen.position.y - player.x - player.y) * 16), -1000, 1000)
	for layer in [ground, air]:
		layer.elapsed = life.elapsed
		layer.reduced = reduced
		layer.queue_redraw()
