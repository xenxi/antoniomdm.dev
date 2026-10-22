extends Node

var current: ArcadeDialogue
var line_index: int = 0

func begin(dialogue: ArcadeDialogue) -> void:
	if dialogue == null or dialogue.lines.is_empty(): return
	current = dialogue
	line_index = 0
	if not dialogue.start_quest.is_empty(): QuestSystem.start(dialogue.start_quest)
	EventBus.dialogue_changed.emit()

func advance() -> void:
	if current == null: return
	line_index += 1
	if line_index < current.lines.size():
		EventBus.dialogue_changed.emit()
		return
	var finished = current
	current = null
	if not finished.objective_event.is_empty(): QuestSystem.record(finished.objective_event)
	EventBus.dialogue_changed.emit()
	if finished.portfolio_kind != "none":
		EventBus.portfolio_requested.emit(finished.portfolio_kind, finished.content_id)

func cancel() -> void:
	current = null
	EventBus.dialogue_changed.emit()
