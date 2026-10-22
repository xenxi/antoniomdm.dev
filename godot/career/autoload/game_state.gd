extends Node
## Serializable state only; systems own rules. / Solo estado; los sistemas aplican reglas.
var current_world: String = "town"
var positions: Dictionary = {}
var discovered_areas: Array[String] = []
var active_quests: Dictionary = {}
var completed_quests: Array[String] = []
var npc_state: Dictionary = {}
var language: String = "es"
var reduced_motion: bool = false
var active: bool = true

func set_language(value: String) -> void:
	if value not in ["es", "en"] or language == value: return
	language = value
	EventBus.language_changed.emit()

func set_active(value: bool) -> void:
	if active == value: return
	active = value
	EventBus.activity_changed.emit()

func localized(value: Dictionary) -> String:
	return str(value.get(language, value.get("es", "")))

func snapshot() -> Dictionary:
	var value = exploration()
	value.merge({"version": 2, "language": language, "reduced_motion": reduced_motion,
		"campaign": GameSession.campaign.duplicate(true), "quick": GameSession.quick_game.duplicate(true),
		"quick_id": GameSession.quick_id, "campaign_exploration": GameSession.campaign_exploration.duplicate(true)})
	return value

func exploration() -> Dictionary:
	return {"world_layout": 2, "flat_layout": 3, "world": current_world, "positions": positions.duplicate(true),
		"discovered": discovered_areas.duplicate(), "quests": active_quests.duplicate(true),
		"completed": completed_quests.duplicate(), "npcs": npc_state.duplicate(true)}

func apply_exploration(value: Dictionary) -> void:
	current_world = value.world
	positions = value.positions.duplicate(true)
	if value.get("world_layout", 1) != 2: positions.erase("town")
	if value.get("flat_layout", 1) != 3: positions.erase("freelance")
	discovered_areas.assign(value.discovered)
	active_quests = value.quests.duplicate(true)
	completed_quests.assign(value.completed)
	npc_state = value.npcs.duplicate(true)

func fresh_exploration(world: String = "town") -> Dictionary:
	return {"world_layout": 2, "flat_layout": 3, "world": world, "positions": {}, "discovered": [], "quests": {}, "completed": [], "npcs": {}}
