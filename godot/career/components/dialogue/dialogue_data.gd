class_name ArcadeDialogue
extends Resource

@export var id: String = ""
@export var speaker: Dictionary = {"es": "", "en": ""}
@export var lines: Array[Dictionary] = []
@export var start_quest: String = ""
@export var objective_event: String = ""
@export_enum("none", "experience", "project", "blog", "ai-lab") var portfolio_kind: String = "none"
@export var content_id: String = ""
