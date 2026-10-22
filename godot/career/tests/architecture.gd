extends SceneTree

var failures: Array[String] = []

func _initialize() -> void:
	call_deferred("run")

func check(condition: bool, message: String) -> void:
	if not condition:
		failures.append(message)
		push_error(message)

func run() -> void:
	var state = root.get_node("GameState")
	var manager = root.get_node("SceneManager")
	var dialogue = root.get_node("DialogueSystem")
	var quests = root.get_node("QuestSystem")
	var saves = root.get_node("SaveManager")
	saves.path = "user://architecture-test.json"
	state.positions.clear()
	state.active_quests.clear()
	state.completed_quests.clear()
	var container = Node2D.new()
	root.add_child(container)
	manager.mount(container)
	await process_frame
	check(container.get_child_count() == 1 and manager.current.world_id == "town", "Bootstrap loads only the city")
	var city = manager.current
	check(city.get_node("Object_freelance/Art").texture != null, "City artwork exists without a web host")
	check(not city.navigation.walkable(Vector2i(2, 2)), "Native building polygons block movement")
	check(city.navigation.walkable(city.player.tile), "City spawn is walkable")
	var player = city.player
	var city_spawn = player.tile
	var visual = player.get_node("Visual")
	var sprite = visual.get_node("AnimatedSprite2D")
	for direction in ["down", "right", "up", "left"]:
		visual.present(direction, true, false, .125)
		check(sprite.animation == direction and sprite.sprite_frames.get_frame_count(direction) == 8, "Eight authored poses per direction")
	visual.present("down", false, false, 0.0)
	visual.present("down", true, false, .125, .5)
	check(sprite.frame == 1, "Walking advances the pose")
	visual.present("down", true, true, .125)
	check(sprite.frame == 2, "Reduced motion holds the settled pose")
	visual.present("left", true, false, .125)
	player.stop()
	visual.present("left", false, false, .2)
	for direction in ["down", "right", "up", "left"]:
		visual.present(direction, false, false, .2)
		visual._process(0.0)
		check(not sprite.visible and visual.action_sprite.visible, "Stopped characters use standing artwork in every direction")
		check(visual.action_sprite.texture == ActionArt.standing_texture(direction) and visual.action_sprite.region_rect == ActionArt.standing_region(direction), "Standing artwork follows the last facing direction")
		visual.present(direction, true, true, .125)
		visual._process(0.0)
		check(not sprite.visible, "Reduced motion never freezes a raised walking leg")
	player.step(Vector2i.RIGHT)
	for frame in range(20): await physics_frame
	check(player.tile == city_spawn + Vector2i.RIGHT, "Godot completes movement without an acknowledgement")
	state.set_active(false)
	player.step(Vector2i.RIGHT)
	check(not player.moving, "Paused players reject movement")
	state.set_active(true)
	var old_world = weakref(city)
	check(manager.change_world("freelance"), "Company transition succeeds")
	await process_frame
	check(old_world.get_ref() == null and container.get_child_count() == 1, "Previous world is freed")
	var office = manager.current
	var npc = office.get_node("Object_team")
	check(npc.configuration.id == "flatmate", "NPC uses a typed configuration resource")
	var destination = Vector2i(office.layout.unproject(npc.position).floor())
	var route = office.navigation.path(office.player.tile, destination, true)
	check(not route.is_empty(), "NPC has a reachable approach route")
	var previous = office.player.tile
	for tile in route:
		check(office.navigation.walkable(tile) and absi(previous.x - tile.x) + absi(previous.y - tile.y) == 1, "Routes avoid collisions and diagonal shortcuts")
		previous = tile
	var touch = InputEventScreenTouch.new()
	touch.pressed = true
	touch.position = office.get_global_transform_with_canvas() * (npc.position + Vector2(0, -16))
	office._unhandled_input(touch)
	check(office.player.target == npc, "Touching the NPC selects its editor-authored hit area")
	for _step in range(100):
		if office.player.target == null: break
		office.player._physics_process(.125)
	await process_frame
	check(dialogue.current != null and state.active_quests.has("first_visit"), "NPC dialogue starts its quest")
	dialogue.advance()
	dialogue.advance()
	check(dialogue.current == null and "first_visit" in state.completed_quests, "Finishing the conversation completes its objective")
	check(not quests.start("first_visit"), "Completed quests cannot reward twice")
	var ui = load("res://ui/game_ui.tscn").instantiate()
	root.add_child(ui)
	root.get_node("GameSession").dispatch({"type": "openMission"})
	await process_frame
	check(root.get_node("GameSession").panel == "mission", "Standalone UI opens a real campaign mission")
	root.get_node("GameSession").dispatch({"type": "closePanel"})
	ui.free()
	check(saves.validate(state.snapshot()), "Current save validates")
	var invalid = state.snapshot()
	invalid.positions.town = ["bad", 1]
	check(not saves.validate(invalid), "Corrupt coordinates are rejected")
	check(manager.change_world("town"), "Return to hub succeeds")
	await process_frame
	check(manager.current.player.tile == city_spawn + Vector2i.RIGHT, "Godot restores the hub position")
	check(not manager.change_world("../../unknown"), "Scene paths cannot be supplied by callers")
	check(saves.save_game() and saves.restore(), "Native campaign and quest saves round-trip")
	container.free()
	DirAccess.remove_absolute(saves.path)
	print("Arcade architecture: PASS" if failures.is_empty() else "Arcade architecture: FAIL")
	quit(0 if failures.is_empty() else 1)
