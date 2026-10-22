extends SceneTree
var failures: Array[String] = []
func _initialize() -> void: call_deferred("run")
func check(condition: bool, message: String) -> void:
	if not condition:
		failures.append(message)
		push_error(message)
func run() -> void:
	var state = root.get_node("GameState")
	var manager = root.get_node("SceneManager")
	var saves = root.get_node("SaveManager")
	saves.path = "user://student-flat-test.json"
	var container = Node2D.new()
	root.add_child(container)
	manager.mount(container)
	manager.change_world("freelance")
	await process_frame
	await process_frame
	var flat = manager.current
	var cast = flat.get_node("Residents")
	var doors = flat.get_node("Doors")
	check(doors.doorways.size() == 4, "One animated door for each of four bedrooms")
	check(flat.find_children("Art", "Node2D", true, false).is_empty(), "Furniture overlays cannot crop the residents")
	for index in doors.doorways.size():
		var area = doors.threshold(index)
		var from = area.get_center() + Vector2(-15, 0)
		var to = area.get_center() + Vector2(15, 0)
		check(not doors.request_crossing(from, to), "Closed door blocks crossing before opening")
		doors.advance(.1, true, false, from)
		check(doors.openings[index] > 0 and doors.openings[index] < 1, "Door swings through intermediate poses")
		var paused = doors.openings[index]
		doors.advance(5, false, false, from)
		check(doors.openings[index] == paused, "Pause freezes door animations")
		doors.advance(.2, true, false, from)
		check(doors.request_crossing(from, to), "Open door permits crossing")
		doors.advance(3, true, false, area.get_center())
		check(doors.openings[index] == 1, "Door never closes on an occupant")
		doors.advance(2, true, false, Vector2(237, 267))
		check(doors.openings[index] == 0, "Door closes after the passage is clear")
		check(doors.request_crossing(from, to, true) and doors.openings[index] == 1, "Reduced motion opens the door without animation")
		doors.advance(2, true, true, Vector2(237,267))
	cast.set_process(false)
	check(cast.residents.size() == 3 and flat.has_node("Player"), "Four residents including the player")
	check(flat.player.tile == Vector2i(39,43), "Apartment spawn is at the entrance")
	var captured = JSON.parse_string(FileAccess.get_file_as_string("res://assets/environments/freelance/student-flat-capture.json"))
	var blocked = {}
	for point in captured.map.blocked: blocked[Vector2i(point.x,point.y)] = true
	for y in 54:
		for x in 80: check(flat.navigation.walkable(Vector2i(x,y)) == not blocked.has(Vector2i(x,y)), "Native/web furniture collision parity")
	for target in flat.interactables:
		var tile = Vector2i(flat.layout.unproject(target.anchor()).floor())
		var nearby = absi(flat.player.tile.x-tile.x)+absi(flat.player.tile.y-tile.y) <= 1
		check(nearby or not flat.navigation.path(flat.player.tile,tile,true).is_empty(), "Reachable apartment interaction: " + target.interaction_id)
	# Walk into every bedroom and back through the live player/door controller.
	# Entra y sale de todos los dormitorios con el controlador real.
	state.set_active(true)
	flat.player.tile = Vector2i(36,10)
	flat.player.position = flat.layout.project(Vector2(36.5,10.5))
	flat.player.step(Vector2i.LEFT)
	flat.player._physics_process(.01)
	flat.player.stop()
	check(flat.player.tile == Vector2i(36,10), "Stopping while waiting cannot teleport through a closed door")
	flat.player.tile = Vector2i(39,43)
	flat.player.destination = flat.player.tile
	flat.player.position = flat.layout.project(Vector2(39.5,43.5))
	for destination in [Vector2i(31,10), Vector2i(47,10), Vector2i(30,22), Vector2i(48,22), Vector2i(39,43)]:
		flat.player.travel_to(destination)
		for tick in 1200:
			flat.player._physics_process(.04)
			check(flat.navigation.walkable(Vector2i(flat.layout.unproject(flat.player.position).floor())), "Crossing only traverses clear floor")
			if flat.player.route.is_empty() and not flat.player.moving: break
		check(flat.player.tile == destination, "Player reaches each bedroom through its single door")
	cast.elapsed = 0
	cast.advance(1.0,true,false,flat.player.position)
	check(cast.rows[0] == 0 and cast.poses[1] != 0, "Trumpet and fuet use authored animation poses")
	cast.advance(8.0,true,false,flat.player.position)
	check(cast.rows[0] == 1, "Musician changes to guitar")
	cast.advance(4.0,true,false,flat.player.position)
	check(cast.rows[1] == 3 and cast.residents[1].position.x < 371, "Cape walk uses authored poses and traverses clear floor")
	var cape_tile = Vector2i(flat.layout.unproject(cast.residents[1].position).floor())
	check(flat.navigation.walkable(cape_tile), "Cape patrol never crosses furniture")
	var clock = cast.elapsed
	cast.advance(10.0,false,false,flat.player.position)
	cast.advance(10.0,true,true,flat.player.position)
	check(cast.elapsed == clock, "Pause and reduced motion freeze ambient animation")
	cast.elapsed = 29
	cast.advance(0.0,true,false,flat.player.position)
	check(cast.rows[2] == 4 and cast.poses[2] == 7, "Nerves build gradually through drawn poses")
	cast.advance(2.0,true,false,flat.player.position)
	check(cast.rows[2] == 5 and cast.tension == 1.0, "Comic bilirubin climax starts the frantic dance")
	cast.advance(6.0,true,false,flat.player.position,"en")
	check(cast.rows[2] == 4 and cast.tension < .1 and cast.meter_label.text == "BILIRUBIN", "Recovery and English localization")
	cast.quiet = true
	cast.advance(1.0,true,false,flat.player.position)
	check(cast.rows[0] == 1 and cast.poses[0] == 0, "Noise quest settles the musician")
	var old = state.exploration()
	old.erase("flat_layout")
	old.positions.freelance = [4,7]
	state.apply_exploration(old)
	check(not state.positions.has("freelance"), "Old saves reset only the obsolete apartment coordinates")
	container.free()
	DirAccess.remove_absolute(saves.path)
	print("Student flat: PASS" if failures.is_empty() else "Student flat: FAIL")
	quit(0 if failures.is_empty() else 1)
