class_name GridNavigation
extends RefCounted

const DIRECTIONS = [Vector2i.UP, Vector2i.RIGHT, Vector2i.DOWN, Vector2i.LEFT]
var grid := AStarGrid2D.new()

func configure(world: Node2D, layout: WorldGrid) -> void:
	grid.region = Rect2i(Vector2i.ZERO, layout.size)
	grid.diagonal_mode = AStarGrid2D.DIAGONAL_MODE_NEVER
	grid.update()
	# Native editor polygons are the collision source, including moved instances.
	# Los polígonos del editor son la fuente de colisiones, también al mover instancias.
	var polygons = world.find_children("*", "CollisionPolygon2D", true, false)
	var allowed = world.get_node_or_null("WalkableArea")
	var clearance = [Vector2.ZERO, Vector2(-2, 0), Vector2(2, 0), Vector2(0, -2), Vector2(0, 2)] if allowed != null else [Vector2.ZERO]
	for y in layout.size.y:
		for x in layout.size.x:
			var point = world.to_global(layout.project(Vector2(x + .5, y + .5)))
			for offset in clearance:
				var sample = point + world.get_global_transform().basis_xform(offset)
				if allowed != null and not Geometry2D.is_point_in_polygon(allowed.to_local(sample), allowed.polygon):
					grid.set_point_solid(Vector2i(x, y))
					break
				for polygon in polygons:
					if polygon.disabled or not polygon.get_parent() is StaticBody2D: continue
					if Geometry2D.is_point_in_polygon(polygon.to_local(sample), polygon.polygon):
						grid.set_point_solid(Vector2i(x, y))
						break
				if grid.is_point_solid(Vector2i(x, y)): break

func walkable(tile: Vector2i) -> bool:
	return grid.is_in_boundsv(tile) and not grid.is_point_solid(tile)

func path(from: Vector2i, to: Vector2i, adjacent: bool = false) -> Array[Vector2i]:
	var best: Array[Vector2i] = []
	var targets: Array[Vector2i] = []
	if adjacent:
		for direction in DIRECTIONS: targets.append(to + direction)
	else: targets.append(to)
	for target in targets:
		if not walkable(target): continue
		if from == target: return []
		var candidate = grid.get_id_path(from, target)
		if candidate.size() > 1 and (best.is_empty() or candidate.size() - 1 < best.size()):
			candidate.pop_front()
			best.assign(candidate)
	return best

