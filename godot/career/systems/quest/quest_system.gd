extends Node

var definitions: Dictionary = {}

func _ready() -> void:
	register(load("res://data/quests/first_visit.tres"))

func register(quest: ArcadeQuest) -> void:
	assert(quest != null and not quest.id.is_empty() and not quest.objectives.is_empty())
	definitions[quest.id] = quest

func start(id: String) -> bool:
	if not definitions.has(id) or GameState.active_quests.has(id) or id in GameState.completed_quests: return false
	var quest: ArcadeQuest = definitions[id]
	for prerequisite in quest.prerequisites:
		if prerequisite not in GameState.completed_quests: return false
	GameState.active_quests[id] = []
	EventBus.quest_started.emit(id)
	SaveManager.save_game()
	return true

func record(objective: String) -> void:
	for id in GameState.active_quests.keys():
		if not definitions.has(id): continue
		var quest: ArcadeQuest = definitions[id]
		var progress: Array = GameState.active_quests[id]
		if objective not in quest.objectives or objective in progress: continue
		progress.append(objective)
		EventBus.quest_updated.emit(id)
		if progress.size() == quest.objectives.size():
			GameState.active_quests.erase(id)
			GameState.completed_quests.append(id)
			EventBus.quest_completed.emit(id)
			if not quest.next_quest.is_empty(): start(quest.next_quest)
	SaveManager.save_game()
