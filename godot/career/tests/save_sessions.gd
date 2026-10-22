extends SceneTree
var failures = 0

func check(value: bool, message: String) -> void:
	if not value: failures += 1; push_error(message)

func _initialize() -> void:
	call_deferred("run")

func run() -> void:
	var state = root.get_node("GameState")
	var session = root.get_node("GameSession")
	var saves = root.get_node("SaveManager")
	var manager = root.get_node("SceneManager")
	saves.path = "user://save-session-test.json"
	var old = session.rules.new_game()
	old.version = 1
	old.layout = 3
	old.world = {"x": 4, "y": 6, "inside": false}
	old.chapters.freelance.x = 4
	old.chapters.freelance.y = 7
	old.chapters.freelance.energy = 55
	old.chapters.freelance.seen = ["freelance"]
	old.chapters.freelance.completedEvents = ["freelance"]
	old.chapters.freelance.erase("failedSide")
	old.erase("timed")
	var original = JSON.stringify(old)
	check(saves.restore_serialized("", original), "Imports an actual v1-shaped save")
	check(saves.restore_status == "migrated" and session.campaign.chapters.freelance.energy == 55, "Migration preserves progression and defaults")
	check(not session.campaign.chapters.freelance.has("x"), "Campaign no longer owns coordinates")
	check(not state.positions.has("town"), "Old city coordinates reset without discarding campaign progress")
	check(JSON.stringify(old) == original, "Conversion never mutates its input")
	var value = state.snapshot()
	check(saves.restore_serialized(JSON.stringify(value), "invalid"), "Valid v2 takes precedence over old data")
	check(not saves.restore_serialized("invalid", original), "Corrupt v2 cannot silently fall back to v1")
	check(saves.writes_blocked and not saves.save_game(), "Invalid restoration blocks bootstrap overwrites")
	saves.allow_new_game()
	var corrupt = old.duplicate(true)
	corrupt.chapters.freelance.energy = "bad"
	check(LegacySaveMigration.convert(corrupt, session.rules, manager.WORLDS).is_empty(), "Malformed old progression is rejected")
	corrupt = old.duplicate(true)
	corrupt.chapters.freelance.x = 1.5
	check(LegacySaveMigration.convert(corrupt, session.rules, manager.WORLDS).is_empty(), "Fractional coordinates are rejected")
	var earlier = old.duplicate(true)
	earlier.layout = 2
	earlier.chapterId = "xul"
	earlier.chapters.xul = earlier.chapters.freelance.duplicate(true)
	earlier.world.inside = true
	var imported = LegacySaveMigration.convert(JSON.parse_string(JSON.stringify(earlier)), session.rules, manager.WORLDS)
	check("freelance" in imported.campaign.cleared and imported.world == "town", "Older layouts retain earned access; missing maps resume at hub")
	check(saves.restore_serialized(JSON.stringify(value)), "Restores initial campaign")
	var container = Node2D.new()
	root.add_child(container)
	manager.mount(container)
	await process_frame
	var campaign = session.campaign.duplicate(true)
	var exploration = state.exploration()
	var mission = session.rules.chapter("freelance").missions[0]
	session.dispatch({"type": "startQuick", "chapter": "freelance", "id": mission})
	check(not session.quick_game.is_empty() and session.panel == "mission", "Starts a separate quick run")
	check(state.completed_quests.is_empty() and state.positions.is_empty(), "Quick run starts with independent exploration")
	session.rules.progress(session.quick_game).mission = 1
	session.panel = "info"
	session.dispatch({"type": "openMission"})
	check(not session.available() and session.panel == "info", "Completed quick runs cannot advance to a different mission")
	session.rules.progress(session.quick_game).energy = 20
	state.completed_quests.append("first_visit")
	state.npc_state["flatmate"] = {"visited": true}
	check(saves.save_game() and saves.restore(), "Suspended campaign survives quick-run save and restore")
	check(session.campaign == campaign, "Quick run never changes campaign progression")
	session.dispatch({"type": "endQuick"})
	check(session.quick_game.is_empty() and session.campaign_exploration.is_empty(), "Ending quick run clears temporary session")
	check(state.exploration() == exploration, "Ending quick run restores the exact campaign exploration")
	check(session.campaign == campaign, "Campaign remains unchanged after return")
	var view = session.view_model()
	for key in ["game", "campaign", "positions", "chapters", "quests"]:
		check(not view.has(key), "Bridge exposes presentation rather than authoritative state")
	session.dispatch({"type": "openMenu"})
	check(session.view_model().presentation.choices.any(func(choice): return choice.command.type == "startQuick"), "Godot authors quick-run menu commands")
	session.dispatch({"type": "confirmNewGame"})
	check(session.panel == "reset" and session.campaign == campaign, "New game requires a separate confirmation without erasing progress")
	session.dispatch({"type": "closePanel"})
	check(session.campaign == campaign, "Cancelling reset preserves campaign")
	container.free()
	DirAccess.remove_absolute(saves.path)
	print("Save migration and run isolation: ", "PASS" if failures == 0 else "FAIL")
	quit(0 if failures == 0 else 1)
