extends Node2D
## The web campaign supplies artwork and collisions to the sole game renderer, Godot.
class PixelLayer extends Node2D:
	var texture: ImageTexture
	var depth = -100.0
	var motion: Array = []
	var bounds = Rect2(0, 0, 480, 320)
	func load_art(data: String, region: Array = []) -> void:
		if region.size() == 4: bounds = Rect2(region[0], region[1], region[2], region[3])
		var bitmap = Image.new()
		if bitmap.load_png_from_buffer(Marshalls.base64_to_raw(data)) == OK:
			texture = ImageTexture.create_from_image(bitmap)
	func _draw() -> void:
		if texture: draw_texture_rect(texture, bounds, false)

var artwork: Array[PixelLayer] = []
var sprite_texture: ImageTexture
const DIRECTIONS = [Vector2i.UP, Vector2i.RIGHT, Vector2i.DOWN, Vector2i.LEFT]
var bridge: JavaScriptObject
var callback: JavaScriptObject
var state: Dictionary = {"x": 4, "y": 6, "active": false, "reducedMotion": false, "chapterId": "town"}
var map: Dictionary = {}
var frames: Dictionary = {}
var travel = 0.0
var waiting_ack = false
var queued_direction = Vector2i.ZERO
var pressed_keys: Array[int] = []
var visual_route: Array[Vector2] = []
var requested_tile = Vector2i(-1, -1)
var destination = Vector2i(-1, -1)
var destination_time = 0.0
var blocked_tile = Vector2i(-1, -1)
var blocked_time = 0.0
var footfalls: Array[Dictionary] = []
const MOVE_KEYS = {KEY_UP: Vector2i.UP, KEY_W: Vector2i.UP, KEY_DOWN: Vector2i.DOWN, KEY_S: Vector2i.DOWN, KEY_LEFT: Vector2i.LEFT, KEY_A: Vector2i.LEFT, KEY_RIGHT: Vector2i.RIGHT, KEY_D: Vector2i.RIGHT}
var camera_position = Vector2.ZERO
var grid = AStarGrid2D.new()
var player = Vector2(4, 6)
var route: Array[Vector2i] = []
var goal = ""
var tick = 0.0
var cooldown = 0.0
var facing = Vector2i.DOWN
var atmosphere = preload("res://atmosphere.gd").new()

func _ready() -> void:
	atmosphere.z_index = 2
	add_child(atmosphere)
	if OS.has_feature("web"):
		bridge = JavaScriptBridge.get_interface("careerBridge")
		callback = JavaScriptBridge.create_callback(_receive)
		bridge.subscribe(callback)
		_emit({"type": "ready"})

func _receive(args: Array) -> void:
	var incoming = JSON.parse_string(args[0])
	if not incoming is Dictionary: return
	var changed = state.chapterId != incoming.chapterId
	var delta_position = Vector2i(incoming.x - state.x, incoming.y - state.y)
	if not changed and delta_position != Vector2i.ZERO:
		if incoming.reducedMotion: facing = delta_position
		# Present every accepted grid step, even when host inputs arrive within one frame.
		# Interpolating straight to the latest state would cut through blocked corners.
		if absi(delta_position.x) + absi(delta_position.y) == 1:
			visual_route.append(Vector2(incoming.x, incoming.y))
		else:
			visual_route.clear()
			player = Vector2(incoming.x, incoming.y)
		if Vector2i(incoming.x, incoming.y) != requested_tile:
			route.clear()
			goal = ""
			queued_direction = Vector2i.ZERO
	elif changed: facing = Vector2i.DOWN
	waiting_ack = false
	requested_tile = Vector2i(-1, -1)
	if incoming.has("map"):
		map = incoming.map
		frames = incoming.frames
		_rebuild_art()
		grid.region = Rect2i(0, 0, map.width, map.height)
		grid.cell_size = Vector2.ONE
		grid.diagonal_mode = AStarGrid2D.DIAGONAL_MODE_NEVER
		grid.update()
		grid.fill_solid_region(grid.region, false)
		for tile in map.blocked: grid.set_point_solid(Vector2i(tile.x, tile.y))
	if not incoming.active or changed:
		atmosphere.hovered = ""
		Input.set_default_cursor_shape(Input.CURSOR_ARROW)
		route.clear()
		goal = ""
		queued_direction = Vector2i.ZERO
		pressed_keys.clear()
		visual_route.clear()
		player = Vector2(incoming.x, incoming.y)
		destination_time = 0
		blocked_time = 0
		footfalls.clear()
	state = incoming
	if state.reducedMotion:
		player = Vector2(state.x, state.y)
		visual_route.clear()
	if changed or state.reducedMotion: camera_position = _camera_target()
	queue_redraw()

func _emit(event: Dictionary) -> void:
	if bridge:
		event.chapterId = state.chapterId
		bridge.emit(JSON.stringify(event))

func _process(delta: float) -> void:
	if not state.active or map.is_empty(): return
	tick += delta
	cooldown = maxf(0, cooldown - delta)
	destination_time = maxf(0, destination_time - delta)
	blocked_time = maxf(0, blocked_time - delta)
	for foot in footfalls: foot.life -= delta
	footfalls = footfalls.filter(func(foot): return foot.life > 0)
	var target = Vector2(state.x, state.y)
	var before = player
	var speed = 8.0
	var budget = delta * speed
	while not visual_route.is_empty() and budget > 0:
		var waypoint = visual_route[0]
		var distance = player.distance_to(waypoint)
		var direction = waypoint - player
		if direction.length_squared() > 0.001: facing = Vector2i(signf(direction.x), signf(direction.y))
		player = player.move_toward(waypoint, budget)
		budget -= distance
		if player.distance_to(waypoint) < 0.001: visual_route.pop_front()
	if state.reducedMotion: player = target
	var last_stride = floori(travel * 2)
	travel += player.distance_to(before)
	if not state.reducedMotion and floori(travel * 2) != last_stride:
		footfalls.append({"point": _project(player.x + .5, player.y + .5), "life": 0.28})
	camera_position = _camera_target() if state.reducedMotion else camera_position.lerp(_camera_target(), 1.0 - exp(-delta * 14.0))
	if cooldown == 0 and visual_route.is_empty() and player.distance_to(target) < 0.05:
		if queued_direction != Vector2i.ZERO:
			var next_direction = queued_direction
			queued_direction = Vector2i.ZERO
			_step(Vector2i(state.x, state.y) + next_direction)
		elif not route.is_empty(): _step(route.pop_front())
		elif not goal.is_empty():
			_interact(goal)
			goal = ""
		else:
			var direction = _held_direction()
			if direction != Vector2i.ZERO: _step(Vector2i(state.x, state.y) + direction)
	atmosphere.present(map, state, player, camera_position, tick, delta)
	queue_redraw()

func _step(tile: Vector2i) -> void:
	if waiting_ack: return
	if _distance(tile) != 1:
		route.clear()
		goal = ""
		return
	facing = tile - Vector2i(state.x, state.y)
	if grid.is_in_boundsv(tile) and not grid.is_point_solid(tile):
		waiting_ack = true
		requested_tile = tile
		_emit({"type": "move", "x": tile.x, "y": tile.y})
	else:
		blocked_tile = tile
		blocked_time = 0.24
		route.clear()
		goal = ""
	cooldown = 0.115

func _held_direction() -> Vector2i:
	return MOVE_KEYS[pressed_keys.back()] if not pressed_keys.is_empty() else Vector2i.ZERO

func _notification(what: int) -> void:
	if what == NOTIFICATION_WM_WINDOW_FOCUS_OUT:
		pressed_keys.clear()
		queued_direction = Vector2i.ZERO
		route.clear()
		goal = ""

func _distance(tile: Vector2i) -> int:
	return absi(tile.x - int(state.x)) + absi(tile.y - int(state.y))

func _interact(id: String) -> void:
	for object in map.objects:
		if object.id == id and _distance(Vector2i(object.x, object.y)) <= 1:
			if not visual_route.is_empty():
				goal = id
				return
			_emit({"type": "interact", "id": id})
			return

func _unhandled_input(event: InputEvent) -> void:
	if not state.active or map.is_empty(): return
	if event is InputEventKey and not event.pressed and MOVE_KEYS.has(event.physical_keycode):
		pressed_keys.erase(event.physical_keycode)
		queued_direction = _held_direction()
	if event is InputEventMouseMotion:
		atmosphere.hovered = ""
		var cursor = event.position / float(state.get("zoom", 1)) + camera_position.round()
		var object = _object_at(cursor)
		if not object.is_empty(): atmosphere.hovered = object.id
		Input.set_default_cursor_shape(Input.CURSOR_POINTING_HAND if not atmosphere.hovered.is_empty() else Input.CURSOR_ARROW)
	if event is InputEventKey and event.pressed and not event.echo:
		if event.physical_keycode == KEY_ESCAPE: _emit({"type": "pause"})
		elif event.physical_keycode == KEY_M: _emit({"type": "map"})
		elif event.physical_keycode in [KEY_I, KEY_J, KEY_O]: _emit({"type": "shortcut", "key": OS.get_keycode_string(event.physical_keycode)})
		elif event.physical_keycode in [KEY_E, KEY_SPACE]:
			route.clear()
			goal = ""
			for object in map.objects:
				if _distance(Vector2i(object.x, object.y)) <= 1:
					_interact(object.id)
					return
		else:
			if MOVE_KEYS.has(event.physical_keycode):
				pressed_keys.erase(event.physical_keycode)
				pressed_keys.append(event.physical_keycode)
				route.clear()
				goal = ""
				destination_time = 0
				if (cooldown == 0 or state.reducedMotion) and not waiting_ack and visual_route.is_empty(): _step(Vector2i(state.x, state.y) + MOVE_KEYS[event.physical_keycode])
				else: queued_direction = MOVE_KEYS[event.physical_keycode]
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT: _route_to(event.position)
	elif event is InputEventScreenTouch and event.pressed: _route_to(event.position)

func _object_hit(object: Dictionary, screen: Vector2) -> bool:
	var hit = Rect2(map.ox + object.x * map.tile, map.oy + object.y * map.tile, map.tile, map.tile)
	if object.has("hit"): hit = Rect2(object.hit[0], object.hit[1], object.hit[2], object.hit[3])
	var inside = hit.has_point(screen)
	if inside and object.has("hitPolygon"):
		var polygon = PackedVector2Array()
		for p in object.hitPolygon: polygon.append(Vector2(p[0], p[1]))
		inside = Geometry2D.is_point_in_polygon(screen, polygon)
	if object.has("marker") and not object.get("locked", false):
		inside = inside or screen.distance_to(Vector2(object.marker[0], object.marker[1])) < 8
	return inside

func _object_at(screen: Vector2) -> Dictionary:
	var selected: Dictionary = {}
	var highest = -INF
	for object in map.objects:
		if not _object_hit(object, screen): continue
		var priority = float(object.x + object.y)
		if object.has("marker") and screen.distance_to(Vector2(object.marker[0], object.marker[1])) < 8: priority += 1000
		if priority > highest:
			highest = priority
			selected = object
	return selected

func _route_to(screen: Vector2) -> void:
	screen = screen / float(state.get("zoom", 1)) + camera_position.round()
	var tile: Vector2i
	if map.has("axes"):
		var axes = map.axes
		var delta = screen - Vector2(map.ox, map.oy)
		var determinant = axes[0] * axes[3] - axes[1] * axes[2]
		tile = Vector2i(floori((delta.x * axes[3] - delta.y * axes[2]) / determinant), floori((delta.y * axes[0] - delta.x * axes[1]) / determinant))
	elif map.get("projection", "") == "isometric":
		var dx = (screen.x - map.ox) / map.tile
		var dy = (screen.y - map.oy) / (map.tile / 2.0)
		tile = Vector2i(floori((dx + dy) / 2.0), floori((dy - dx) / 2.0))
	else: tile = Vector2i(floori((screen.x - map.ox) / map.tile), floori((screen.y - map.oy) / map.tile))
	goal = ""
	route.clear()
	queued_direction = Vector2i.ZERO
	pressed_keys.clear()
	var object = _object_at(screen)
	if not object.is_empty():
		tile = Vector2i(object.x, object.y)
		goal = object.id
	if not goal.is_empty() and _distance(tile) <= 1:
		var interaction = goal
		goal = ""
		_interact(interaction)
		return
	var targets: Array[Vector2i] = []
	if goal.is_empty(): targets.append(tile)
	else:
		for direction in DIRECTIONS: targets.append(tile + direction)
	for target in targets:
		if not grid.is_in_boundsv(target) or grid.is_point_solid(target): continue
		var candidate = grid.get_id_path(Vector2i(state.x, state.y), target)
		if candidate.size() > 1 and (route.is_empty() or candidate.size() - 1 < route.size()):
			candidate.pop_front()
			route.assign(candidate)
	if route.is_empty():
		goal = ""
		if tile != Vector2i(state.x, state.y):
			blocked_tile = tile
			blocked_time = .35
	else:
		destination = route.back()
		destination_time = 1.0

func _tile_outline(tile: Vector2i, color: Color, inset = 0.15) -> void:
	var points = PackedVector2Array([_project(tile.x + inset, tile.y + inset), _project(tile.x + 1 - inset, tile.y + inset), _project(tile.x + 1 - inset, tile.y + 1 - inset), _project(tile.x + inset, tile.y + 1 - inset)])
	points.append(points[0])
	draw_polyline(points, color, .75, true)

func _project(x: float, y: float) -> Vector2:
	if map.has("axes"): return Vector2(map.ox + map.axes[0] * x + map.axes[2] * y, map.oy + map.axes[1] * x + map.axes[3] * y)
	if map.get("projection", "") == "isometric": return Vector2(map.ox + (x - y) * map.tile, map.oy + (x + y) * map.tile / 2.0)
	return Vector2(map.ox + x * map.tile, map.oy + y * map.tile)

func _rebuild_art() -> void:
	sprite_texture = null
	if map.get("spriteImage"):
		var bitmap = Image.new()
		if bitmap.load_png_from_buffer(Marshalls.base64_to_raw(map.spriteImage)) == OK: sprite_texture = ImageTexture.create_from_image(bitmap)
	for layer in artwork: layer.queue_free()
	artwork.clear()
	var background = PixelLayer.new()
	background.load_art(map.image)
	background.z_index = -2
	add_child(background)
	artwork.append(background)
	for entity in map.get("entities", []):
		var layer = PixelLayer.new()
		layer.load_art(entity.image, entity.get("bounds", []))
		layer.depth = entity.depth
		layer.motion = entity.get("motion", [])
		add_child(layer)
		artwork.append(layer)

func _camera_target() -> Vector2:
	var zoom = float(state.get("zoom", 1))
	var point = _project(player.x + 0.5, player.y + 0.5)
	return Vector2(clampf(point.x - 240 / zoom, 0, 480 - 480 / zoom), clampf(point.y - 160 / zoom, 0, 320 - 320 / zoom)).round()

func _draw() -> void:
	if map.is_empty(): return
	atmosphere.present(map, state, player, camera_position, tick, 0)
	var zoom = float(state.get("zoom", 1))
	draw_set_transform(-camera_position.round() * zoom, 0, Vector2(zoom, zoom))
	for layer in artwork:
		layer.position = -camera_position.round() * zoom
		layer.scale = Vector2(zoom, zoom)
		layer.rotation = 0
		if layer.motion.size() >= 3 and not state.reducedMotion:
			var phase = tick * layer.motion[2] + (layer.motion[3] if layer.motion.size() >= 4 else 0)
			layer.position += Vector2(layer.motion[0], layer.motion[1]) * sin(phase) * zoom
			if layer.motion.size() == 8:
				# Animate around planted feet. Keep every NPC within its collision tile.
				var pivot = Vector2(layer.motion[4], layer.motion[5])
				layer.rotation = sin(phase) * layer.motion[6]
				layer.scale.y *= 1 + sin(phase * .7) * layer.motion[7]
				layer.position += pivot * zoom - (pivot * layer.scale).rotated(layer.rotation)
		layer.z_index = -2 if layer.depth == -100 else (1 if layer.depth > player.x + player.y + 1 else -1)
	if destination_time > 0 or not route.is_empty(): _tile_outline(destination, Color("8ce5cd"))
	if blocked_time > 0: _tile_outline(blocked_tile, Color("efa58f"), .26)
	if not state.reducedMotion:
		for foot in footfalls:
			draw_circle(foot.point, (1 - foot.life / .28) * 1.4, Color(.77, .87, .87, foot.life / .28 * .18))
	for tile in route:
		draw_rect(Rect2(_project(tile.x + 0.5, tile.y + 0.5) - Vector2.ONE, Vector2(2, 2)), Color("fff0bc"))
	var point = _project(player.x + 0.5, player.y + 0.5)
	if blocked_time > 0 and not state.reducedMotion:
		var away = (_project(player.x + facing.x + .5, player.y + facing.y + .5) - point).normalized()
		point -= away * sin(clampf(blocked_time / .24, 0, 1) * PI) * .65
	var sprite_scale = float(map.get("spriteScale", 1))
	var px = roundf(point.x - 12)
	var py = roundf(point.y + (0 if map.get("projection", "") == "isometric" else map.tile / 2.0) - 31)
	draw_set_transform((-camera_position.round() + point) * zoom, 0, Vector2(zoom, zoom * 0.36) * sprite_scale)
	draw_circle(Vector2.ZERO, 9, Color("04091790"))
	if map.get("art"): draw_arc(Vector2.ZERO, 11, 0, TAU, 32, Color("70f3efb0"), 0.7)
	draw_set_transform(-camera_position.round() * zoom, 0, Vector2(zoom, zoom))
	var moving = player.distance_to(Vector2(state.x, state.y)) > 0.01
	var direction = "up" if facing == Vector2i.UP else "left" if facing == Vector2i.LEFT else "right" if facing == Vector2i.RIGHT else "down"
	var frame = int(travel * 3) % 4 if moving and not state.reducedMotion else 0
	if sprite_texture:
		draw_set_transform((-camera_position.round() + point) * zoom, 0, Vector2(zoom, zoom) * sprite_scale)
		point = Vector2.ZERO
		var index = ["down", "right", "up", "left"].find(direction)
		var stride = sin(travel * TAU) * 1.4 if moving and not state.reducedMotion else 0.0
		var bob = absf(sin(travel * TAU)) * .55 if moving and not state.reducedMotion else (0.0 if state.reducedMotion else sin(tick * 1.8) * 0.18)
		draw_texture_rect_region(sprite_texture, Rect2(point.x - 12, point.y - 43 - bob, 24, 30.5), Rect2(index * 96, 0, 96, 122))
		draw_texture_rect_region(sprite_texture, Rect2(point.x - 12, point.y - 12.5 + stride, 12, 13.5), Rect2(index * 96, 122, 48, 54))
		draw_texture_rect_region(sprite_texture, Rect2(point.x, point.y - 12.5 - stride, 12, 13.5), Rect2(index * 96 + 48, 122, 48, 54))
	elif frames.has(direction):
		for r in frames[direction][frame]: draw_rect(Rect2(px + r[0], py + r[1], r[2], r[3]), Color(r[4]))
	if state.chapterId == "town" and not state.reducedMotion:
		draw_set_transform(-camera_position.round() * zoom, 0, Vector2(zoom, zoom))
		for i in range(45): draw_rect(Rect2(floorf(fmod(i * 71 + tick * 9, 480)), floorf(fmod(i * 53 + tick * 62, 320)), 1, 3), Color("b6d3f026"))
