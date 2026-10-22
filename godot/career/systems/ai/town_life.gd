class_name TownLife
extends RefCounted
## Ambient citizens never write campaign state or block the player.
## Los vecinos ambientales no guardan progreso ni bloquean al jugador.
const STOPS = [Vector2i(34, 28), Vector2i(32, 36), Vector2i(25, 37), Vector2i(28, 48), Vector2i(33, 46), Vector2i(41, 47), Vector2i(48, 46), Vector2i(45, 37), Vector2i(52, 29), Vector2i(55, 27), Vector2i(10, 26), Vector2i(15, 22), Vector2i(19, 23), Vector2i(14, 40)]
var grid: AStarGrid2D
var citizens: Array[Dictionary] = []
var stops: Array[Vector2i] = []
var elapsed: float = 0.0

func configure(navigation: AStarGrid2D, count: int = 12) -> void:
	grid = navigation
	citizens.clear()
	stops.clear()
	elapsed = 0.0
	for desired in STOPS:
		var nearest = Vector2i(-1, -1)
		var distance = INF
		for y in range(grid.region.position.y, grid.region.end.y):
			for x in range(grid.region.position.x, grid.region.end.x):
				var candidate = Vector2i(x, y)
				if not grid.is_in_boundsv(candidate) or grid.is_point_solid(candidate): continue
				var d = Vector2(candidate).distance_squared_to(Vector2(desired))
				if d < distance:
					distance = d
					nearest = candidate
		if nearest != Vector2i(-1, -1) and nearest not in stops: stops.append(nearest)
	if stops.size() < 2: return
	for index in mini(count, stops.size()):
		var start = (index + 1) % stops.size()
		citizens.append({"position": Vector2(stops[start]), "tile": stops[start], "goal": start,
			"path": [], "wait": .25 + index * .19, "travel": 0.0, "moving": false,
			"facing": Vector2.RIGHT, "style": index % 4, "speed": .8 + (index % 4) * .12})

func advance(delta: float, active: bool, reduced: bool, player: Vector2) -> void:
	if not active or reduced or grid == null: return
	elapsed += delta
	for index in citizens.size():
		var citizen = citizens[index]
		citizen.moving = false
		if citizen.wait > 0.0:
			citizen.wait = maxf(0.0, citizen.wait - delta)
			continue
		if citizen.path.is_empty():
			citizen.goal = (citizen.goal + 3 + index % 2) % stops.size()
			var route = grid.get_id_path(citizen.tile, stops[citizen.goal])
			if not route.is_empty(): route.remove_at(0)
			citizen.path.assign(route)
			if citizen.path.is_empty(): citizen.wait = 1.0; continue
		var target = Vector2(citizen.path[0])
		var distance = minf(delta, .1) * citizen.speed
		var next = citizen.position.move_toward(target, distance)
		# Give the protagonist space; citizens are presentation, never obstacles.
		# Cede el paso al protagonista; los vecinos nunca son obstáculos.
		if next.distance_to(player) < .75 and next.distance_to(player) < citizen.position.distance_to(player): continue
		var blocked = false
		for other in range(index):
			if next.distance_to(citizens[other].position) < .38: blocked = true; break
		if blocked: continue
		citizen.facing = (target - citizen.position).normalized()
		citizen.travel += citizen.position.distance_to(next)
		citizen.position = next
		citizen.moving = true
		if next.is_equal_approx(target):
			citizen.tile = Vector2i(target)
			citizen.path.pop_front()
			if citizen.path.is_empty(): citizen.wait = 1.8 + index % 4 * .7
