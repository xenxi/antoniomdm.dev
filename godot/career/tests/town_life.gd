extends SceneTree
var failures: int = 0

func check(value: bool, message: String) -> void:
	if not value: failures += 1; push_error(message)

func _initialize() -> void:
	call_deferred("run")

func run() -> void:
	var saves = root.get_node("SaveManager")
	saves.path = "user://town-life-test.json"
	var container = Node2D.new()
	root.add_child(container)
	var manager = root.get_node("SceneManager")
	manager.mount(container)
	await process_frame
	var town = manager.current
	var ambience = town.get_node("LivingTown")
	var reference = JSON.parse_string(FileAccess.get_file_as_string("res://assets/environments/waterfront/navigation.json"))
	var blocked = {}
	for tile in reference.blocked: blocked[Vector2i(tile.x, tile.y)] = true
	var parity = true
	var mismatches = []
	for y in town.layout.size.y:
		for x in town.layout.size.x:
			var tile = Vector2i(x, y)
			if town.navigation.walkable(tile) == blocked.has(tile): mismatches.append(tile)
			parity = parity and town.navigation.walkable(tile) == not blocked.has(tile)
	if not parity: print("Collision differences: ", mismatches)
	check(parity, "Native and web hosts share waterfront collisions")
	for entrance in reference.entrances:
		check(not town.navigation.path(town.player.tile, Vector2i(entrance.x, entrance.y)).is_empty(), "Reachable waterfront entrance: " + entrance.id)
	check(ambience.ready_world and ambience.pedestrians.size() == 12, "City scene mounts twelve citizens")
	for object in town.get_children():
		var footprint = object.get_node_or_null("Body/CollisionPolygon2D")
		if footprint == null: continue
		var bottom = -INF
		for vertex in footprint.polygon: bottom = maxf(bottom, footprint.to_global(vertex).y)
		check(absf(bottom - object.global_position.y) < .001, "Sort origin stays at the footprint bottom: " + object.name)
		var art = object.get_node("Art")
		check(art.strips.size() == art.depth_profile.size(), "Every local ground edge has an art strip: " + object.name)
		for index in art.strips.size():
			var strip = art.strips[index]
			check(absf(strip.global_position.y - art.depth_profile[index].y) < .001, "Strip sorts at its local ground edge")
			check(absf(strip.global_position.y + strip.offset.y * strip.scale.y - art.bounds.position.y) < .001, "Depth anchors retain the original artwork placement")
	var life = TownLife.new()
	life.configure(town.navigation.grid)
	var saved = root.get_node("GameState").snapshot()
	var initial = life.citizens.duplicate(true)
	var clear_paths = true
	var bounded_steps = true
	for tick in 1800:
		var previous = life.citizens.map(func(citizen): return citizen.position)
		life.advance(1.0 / 30.0, true, false, Vector2(-100, -100))
		for i in life.citizens.size():
			var citizen = life.citizens[i]
			bounded_steps = bounded_steps and citizen.position.distance_to(previous[i]) <= citizen.speed / 30.0 + .001
			clear_paths = clear_paths and town.navigation.walkable(citizen.tile)
			var from = citizen.tile
			for tile in citizen.path:
				clear_paths = clear_paths and town.navigation.walkable(tile) and absi(tile.x - from.x) + absi(tile.y - from.y) == 1
				from = tile
	check(clear_paths, "Citizens route around actual scene obstacles without diagonal shortcuts")
	check(bounded_steps, "Citizen movement stays continuous without teleporting")
	check(life.citizens.all(func(citizen): return citizen.travel > 2.0), "All citizens participate in the living scene")
	check(life.citizens != initial, "Idle protagonist does not stop the town")
	var paused = life.citizens.duplicate(true)
	var elapsed = life.elapsed
	life.advance(10.0, false, false, Vector2.ZERO)
	check(life.citizens == paused and life.elapsed == elapsed, "Pause freezes all pedestrian and light clocks")
	life.advance(10.0, true, true, Vector2.ZERO)
	check(life.citizens == paused and life.elapsed == elapsed, "Reduced motion freezes positions without resetting the crowd")
	check(root.get_node("GameState").snapshot() == saved, "Ambient simulation never changes saved campaign state")
	# An overlapping spawn can walk away instead of being permanently trapped.
	var first = life.citizens[0]
	first.wait = 0.0
	var position_before = first.position
	life.advance(.05, true, false, position_before)
	check(first.position != position_before, "A citizen can step away from an overlapping protagonist")
	container.free()
	DirAccess.remove_absolute(saves.path)
	print("Living town: ", "PASS" if failures == 0 else "FAIL")
	quit(0 if failures == 0 else 1)
