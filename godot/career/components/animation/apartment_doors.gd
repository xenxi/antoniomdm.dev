extends Node2D
## Shared hinged doors: routes wait for the leaf, then close after clearing it.
## Puertas compartidas: la ruta espera la hoja y se cierra tras despejar el paso.
@export var doorways: Array[Dictionary] = []
var native = true
var leaves: Array[Node2D] = []
var openings: Array[float] = []
var holds: Array[float] = []
var crossings: Array[int] = []

class Leaf extends Node2D:
	var side = -1.0
	var length = 12.0
	var opening = 0.0
	func _draw() -> void:
		var base = Vector2(side * lerpf(2.5, 13.0, opening), length * cos(opening * PI * .5))
		var top = Vector2(0, -25)
		var corners = PackedVector2Array([Vector2.ZERO, base, base + top, top])
		draw_colored_polygon(corners, Color("704025"))
		draw_polyline(PackedVector2Array([Vector2.ZERO, base, base + top, top, Vector2.ZERO]), Color("d39a53"), .65, true)
		for fraction in [.27, .75]:
			var a = base * .13 + top * fraction
			var b = base * .87 + top * fraction
			draw_line(a, b, Color("a46a38"), .65, true)
		draw_line(base * .13 + top * .12, base * .13 + top * .88, Color("a46a38"), .45, true)
		draw_line(base * .87 + top * .12, base * .87 + top * .88, Color("a46a38"), .45, true)
		draw_circle(base * .83 + top * .47, .65, Color("ffe4a0"))

func _ready() -> void:
	if not doorways.is_empty(): configure(doorways, true)

func configure(values: Array, is_native: bool) -> void:
	native = is_native
	for leaf in leaves: leaf.free()
	leaves.clear()
	openings.clear()
	holds.clear()
	crossings.clear()
	doorways.assign(values)
	for door in doorways:
		var leaf = Leaf.new()
		leaf.position = Vector2(door.hinge[0], door.hinge[1])
		leaf.side = float(door.side)
		leaf.length = float(door.threshold[3])
		add_child(leaf)
		leaves.append(leaf)
		openings.append(0.0)
		holds.append(0.0)
		crossings.append(0)

func threshold(index: int) -> Rect2:
	var area = doorways[index].threshold
	return Rect2(area[0], area[1], area[2], area[3])

func touches(area: Rect2, from: Vector2, to: Vector2) -> bool:
	if area.has_point(from) or area.has_point(to): return true
	var corners = [area.position, area.position + Vector2(area.size.x, 0), area.end, area.position + Vector2(0, area.size.y)]
	for i in 4:
		if Geometry2D.segment_intersects_segment(from, to, corners[i], corners[(i + 1) % 4]) != null: return true
	return false

func request_crossing(from: Vector2, to: Vector2, reduced: bool = false) -> bool:
	var ready = true
	for i in doorways.size():
		if not touches(threshold(i).grow(4), from, to): continue
		if holds[i] <= 0.0:
			CharacterActions.interact("door")
			crossings[i] += 1
		holds[i] = 1.0
		if reduced: openings[i] = 1.0
		if openings[i] < .95: ready = false
	return ready

func passage_ready(from: Vector2, to: Vector2) -> bool:
	for i in doorways.size():
		if touches(threshold(i).grow(4), from, to) and openings[i] < .95: return false
	return true

func advance(delta: float, active: bool, reduced: bool, feet: Vector2) -> void:
	if not active: return
	for i in doorways.size():
		# A stopped character in the opening keeps the door open safely.
		# Un personaje detenido en el umbral mantiene la puerta abierta.
		if threshold(i).grow(5).has_point(feet) and openings[i] > 0.0: holds[i] = 1.0
		else: holds[i] = maxf(0, holds[i] - delta)
		var target = 1.0 if holds[i] > 0.0 else 0.0
		openings[i] = target if reduced else move_toward(openings[i], target, delta * 4.0)
		leaves[i].opening = openings[i]
		leaves[i].queue_redraw()

func snapshot() -> Array:
	var result = []
	for i in doorways.size(): result.append({"id": doorways[i].id, "opening": openings[i], "crossings": crossings[i]})
	return result
