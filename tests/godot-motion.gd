extends SceneTree
## Regression checks against the actual renderer, without a browser or GPU.
var failures = 0
var world = preload("res://world.gd").new()

func check(condition: bool, message: String) -> void:
	if not condition:
		push_error(message)
		failures += 1

func receive(x: int, y: int, reduced = false, active = true) -> void:
	world._receive([JSON.stringify({"x": x, "y": y, "active": active, "reducedMotion": reduced, "chapterId": "test", "zoom": 1})])

func key(code: int, pressed: bool) -> void:
	var event = InputEventKey.new()
	event.physical_keycode = code
	event.pressed = pressed
	world._unhandled_input(event)

func _initialize() -> void:
	world.map = {"id": "test", "width": 6, "height": 6, "ox": 240, "oy": 90, "tile": 16, "projection": "isometric", "objects": []}
	world.grid.region = Rect2i(0, 0, 6, 6)
	world.grid.diagonal_mode = AStarGrid2D.DIAGONAL_MODE_NEVER
	world.grid.update()
	world.grid.set_point_solid(Vector2i(1, 0))
	receive(0, 0)
	# Two host inputs arrive before the renderer has presented the first one.
	receive(0, 1)
	receive(1, 1)
	world.cooldown = 99
	world._process(.08)
	check(world.player.x == 0 and world.player.y > 0 and world.player.y < 1, "First leg must stay outside blocked corner")
	world._process(.1)
	check(world.player.y == 1 and world.player.x > 0 and world.player.x < 1, "Turn only after reaching the corner")
	world._process(.1)
	check(world.player == Vector2(1, 1) and world.visual_route.is_empty(), "Settle at the acknowledged tile")
	# Reduced motion removes interpolation but keeps the facing direction.
	receive(2, 1, true)
	check(world.player == Vector2(2, 1) and world.facing == Vector2i.RIGHT, "Reduced motion must retain facing")
	receive(2, 1)
	world.cooldown = 99
	key(KEY_UP, true)
	key(KEY_RIGHT, true)
	check(world._held_direction() == Vector2i.RIGHT, "Newest held direction must win")
	key(KEY_RIGHT, false)
	check(world._held_direction() == Vector2i.UP, "Releasing newest key restores the previous held direction")
	key(KEY_UP, false)
	check(world._held_direction() == Vector2i.ZERO and world.queued_direction == Vector2i.ZERO, "Release must not leave a queued step")
	# Blocked steps, nonadjacent requests and click paths never request invalid movement.
	receive(0, 0)
	world._step(Vector2i(1, 0))
	check(not world.waiting_ack and world.blocked_time > 0, "Collision must show feedback without moving")
	world._step(Vector2i(4, 4))
	check(not world.waiting_ack, "Nonadjacent steps must be rejected")
	world._route_to(world._project(2.5, .5))
	check(not world.route.is_empty(), "Click route must find a way around furniture")
	var previous = Vector2i(0, 0)
	for tile in world.route:
		check(not world.grid.is_point_solid(tile) and absi(tile.x - previous.x) + absi(tile.y - previous.y) == 1, "Every route segment must be adjacent and clear")
		previous = tile
	check(previous == Vector2i(2, 0), "Click route must arrive at its destination")
	# Overlapping object silhouettes follow visual depth; explicit markers take precedence.
	world.map.objects = [{"id": "back", "x": 1, "y": 1, "hit": [0, 0, 20, 20], "marker": [5, 5]}, {"id": "front", "x": 3, "y": 3, "hit": [0, 0, 20, 20]}]
	check(world._object_at(Vector2(19, 19)).id == "front", "Foreground silhouette must win overlapping clicks")
	check(world._object_at(Vector2(5, 5)).id == "back", "An explicit marker must remain clickable")
	key(KEY_RIGHT, true)
	world._notification(Node.NOTIFICATION_WM_WINDOW_FOCUS_OUT)
	check(world.pressed_keys.is_empty() and world.route.is_empty(), "Lost focus must clear movement")
	receive(1, 0, false, false)
	check(world.visual_route.is_empty() and world.player == Vector2(1, 0), "Pause must settle and clear interpolation")
	world.atmosphere.free()
	world.free()
	print("Godot movement checks: ", "PASS" if failures == 0 else "FAIL (%d)" % failures)
	quit(0 if failures == 0 else 1)
