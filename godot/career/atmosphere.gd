extends Node2D
## All ambient animation shares the world's clock, pause and reduced-motion state.
var scene: Dictionary = {}
var context: Dictionary = {}
var actor = Vector2.ZERO
var elapsed = 0.0
var openings: Dictionary = {}
var hovered = ""

func present(data: Dictionary, status: Dictionary, player: Vector2, camera: Vector2, clock: float, delta: float) -> void:
	scene = data
	context = status
	actor = player
	elapsed = 0.0 if status.get("reducedMotion", false) else clock
	var zoom = float(status.get("zoom", 1))
	position = -camera.round() * zoom
	scale = Vector2(zoom, zoom)
	for object in scene.get("objects", []):
		var near = actor.distance_to(Vector2(object.x, object.y)) < 2.0
		var target = 1.0 if near and not object.get("locked", false) else 0.0
		openings[object.id] = target if status.get("reducedMotion", false) else move_toward(float(openings.get(object.id, 0)), target, delta * 3.5)
	queue_redraw()

func _glow_line(a: Vector2, b: Vector2, tint: Color, strength: float) -> void:
	for width in [5.0, 2.5]:
		draw_line(a, b, Color(tint, 0.035 * strength), width)
	draw_line(a, b, Color(tint, 0.45 * strength), 0.65)

func _ellipse(center: Vector2, radius: float, tint: Color) -> void:
	var points = PackedVector2Array()
	for i in range(25):
		var angle = float(i) / 24 * TAU
		points.append(center + Vector2(cos(angle) * radius, sin(angle) * radius * 0.36))
	draw_polyline(points, tint, 0.45)

func _fountain(f: Array, index: int) -> void:
	var base = Vector2(f[0], f[1])
	var height = float(f[2])
	for ring in range(3):
		var phase = fmod(elapsed * 0.45 + ring / 3.0 + index * 0.2, 1.0)
		_ellipse(base, 1 + phase * 5, Color(0.5, 0.91, 1, (1 - phase) * 0.65))
	# Independent parabolic streams and falling droplets over the painted jets.
	for jet in range(5):
		var offset = (jet - 2) * 1.5
		var phase = fmod(elapsed * 0.75 + jet * 0.21 + index * 0.13, 1.0)
		var points = PackedVector2Array()
		for step in range(13):
			var t = step / 12.0
			points.append(base + Vector2(offset * t, -height * sin(t * PI) * (0.88 + 0.08 * sin(elapsed * 1.4 + jet))))
		draw_polyline(points, Color("78dff449"), 0.45)
		var drop = base + Vector2(offset * phase, -height * sin(phase * PI))
		draw_rect(Rect2(drop, Vector2(0.65, 1.25)), Color("d2ffffce"))
	_glow_line(base, base - Vector2(0, height * 0.8), Color("7cecff"), 0.7)

func _marker(center: Vector2, kind: String, near: bool, phase: float) -> void:
	var float_y = 0.0 if scene.id == "town" else (sin(elapsed * 2.6 + phase) * 1.4 if kind == "quest" else sin(elapsed * 1.7 + phase) * 0.5)
	var p = center + Vector2(0, float_y)
	var color = Color("ffd77b") if kind == "quest" else Color("78e4dc")
	if kind == "complete": color = Color("91ecad")
	var size = 5.5 if kind == "quest" else (4.5 if near else 3.5)
	draw_circle(p, size + 2, Color(color, 0.06))
	var diamond = PackedVector2Array([p + Vector2(0, -size - 1), p + Vector2(size, 0), p + Vector2(0, size + 1), p + Vector2(-size, 0)])
	draw_colored_polygon(diamond, Color("071525ee"))
	diamond.append(diamond[0])
	draw_polyline(diamond, color, 0.65)
	if kind == "quest":
		draw_rect(Rect2(p + Vector2(-0.8, -3), Vector2(1.6, 3.8)), color)
		draw_rect(Rect2(p + Vector2(-0.8, 2), Vector2(1.6, 1.4)), color)
	elif kind == "complete":
		draw_polyline(PackedVector2Array([p + Vector2(-2, 0), p + Vector2(-0.5, 1.5), p + Vector2(2.5, -2)]), color, 0.8)
	else:
		draw_circle(p, 1.1, color)
	if near: draw_line(p + Vector2(0, size + 2), p + Vector2(0, size + 4), color, 0.7)

func _door(object: Dictionary) -> void:
	if not object.has("entrance"): return
	var entrance = object.entrance
	var bottom = Vector2(entrance.anchor[0], entrance.anchor[1])
	var width = float(entrance.width)
	var height = float(entrance.height)
	var locked = object.get("locked", false)
	var tint = Color(entrance.color)
	# Fixed facade coordinates. Only the leaves move, within the door frame.
	draw_set_transform(bottom, 0, Vector2.ONE)
	var frame = PackedVector2Array([Vector2(-width / 2, -width / 4), Vector2(width / 2, width / 4), Vector2(width / 2, width / 4 - height), Vector2(-width / 2, -width / 4 - height)])
	if locked:
		draw_colored_polygon(frame, Color("152234"))
		for i in range(1, int(height / 2)):
			var left = Vector2(-width / 2 + 0.5, -width / 4 - i * 2)
			draw_line(left, left + Vector2(width - 1, (width - 1) / 2), Color("46556b"), 0.4)
		# A small fixed latch, on the facade plane; no floating padlock card.
		var p = Vector2(0, -height * 0.45)
		draw_arc(p + Vector2(0, -0.8), 0.9, PI, TAU, 10, Color("e7c19a"), 0.5)
		draw_rect(Rect2(p + Vector2(-1.2, -0.8), Vector2(2.4, 2.1)), Color("e7c19a"))
	else:
		var opening = float(openings.get(object.id, 0))
		# Leave the painted domestic door intact; glass office leaves stay in-frame.
		if object.id != "freelance":
			draw_colored_polygon(frame, Color("102632b0"))
			for side in [-1, 1]:
				var outer = side * width / 2
				var inner = side * width / 2 * opening
				var leaf = PackedVector2Array([Vector2(outer, outer / 2), Vector2(inner, inner / 2), Vector2(inner, inner / 2 - height), Vector2(outer, outer / 2 - height)])
				if opening < 0.99: draw_colored_polygon(leaf, Color("a0d5db45"))
				draw_line(Vector2(inner, inner / 2), Vector2(inner, inner / 2 - height), Color("bbd5d7"), 0.4)
	frame.append(frame[0])
	draw_polyline(frame, Color("70675c") if object.id == "freelance" else Color("607185"), 0.55)
	var threshold = Color("d1a482") if locked else tint.lightened(0.3)
	draw_line(Vector2(-width / 2, -width / 4), Vector2(width / 2, width / 4), threshold, 0.6 if hovered != object.id else 1.0)
	draw_set_transform(Vector2.ZERO)

func _draw() -> void:
	if scene.is_empty(): return
	var effects = scene.get("effects", {})
	for i in range(effects.get("lights", []).size()):
		var line = effects.lights[i]
		var strength = 0.55 + 0.28 * sin(elapsed * 1.15 + i * 2.7)
		_glow_line(Vector2(line[0], line[1]), Vector2(line[2], line[3]), (Color(line[4]) if line.size() > 4 else Color("73edea")), strength)
	for i in range(effects.get("fountains", []).size()): _fountain(effects.fountains[i], i)
	for f in effects.get("fans", []):
		var p = Vector2(f[0], f[1])
		for blade in range(3):
			var angle = elapsed * 1.8 + blade * TAU / 3 + p.x
			draw_line(p, p + Vector2(cos(angle) * 2.0, sin(angle) * 1.0), Color("abc3d750"), 0.5)
	for s in effects.get("steam", []):
		for i in range(3):
			var phase = fmod(elapsed * 0.25 + i / 3.0, 1)
			var p = Vector2(s[0] + sin(phase * 6 + i) * 1.2, s[1] - phase * 8)
			draw_line(p, p - Vector2(0.4, 1.5), Color(0.85, 0.91, 1, (1 - phase) * 0.28), 0.5)
	for s in effects.get("screens", []):
		var p = Vector2(s[0], s[1])
		for i in range(3):
			var width = 1.0 + fmod(floor(elapsed * 0.8 + i * 2.1 + p.x), 4)
			draw_line(p + Vector2(0, i), p + Vector2(width, i + width * 0.2), Color("a1f4e966"), 0.4)
	for i in range(scene.get("objects", []).size()):
		var object = scene.objects[i]
		if not object.has("marker"): continue
		var near = actor.distance_to(Vector2(object.x, object.y)) < 2.2 or hovered == object.id
		var marker = Vector2(object.marker[0], object.marker[1])
		if scene.id == "town":
			_door(object)
			if not object.get("locked", false): _marker(marker, "complete" if object.get("complete", false) else "quest", near, i)
		else:
			var is_objective = object.id == context.get("objective", "")
			_marker(marker, "quest" if is_objective else "interact", near, i)
			if near and object.has("hit"):
				var r = object.hit
				for corner in [Vector2(r[0], r[1]), Vector2(r[0] + r[2], r[1]), Vector2(r[0], r[1] + r[3]), Vector2(r[0] + r[2], r[1] + r[3])]:
					var dx = 3.0 if corner.x == r[0] else -3.0
					var dy = 3.0 if corner.y == r[1] else -3.0
					draw_line(corner, corner + Vector2(dx, 0), Color("9cf2de90"), 0.5)
					draw_line(corner, corner + Vector2(0, dy), Color("9cf2de90"), 0.5)
