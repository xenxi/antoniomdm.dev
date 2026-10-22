class_name NpcData
extends Resource

@export var id: String = ""
@export var display_name: Dictionary = {"es": "Equipo", "en": "Team"}
@export var sprite_frames: SpriteFrames
@export var dialogue: ArcadeDialogue
@export var speed: float = 35.0
@export var quests: Array[String] = []

