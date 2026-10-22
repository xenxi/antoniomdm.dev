@tool
extends Sprite2D

@export var texture_es: Texture2D
@export var texture_en: Texture2D

func _ready() -> void:
	if Engine.is_editor_hint(): return
	EventBus.language_changed.connect(_refresh)
	_refresh()

func _refresh() -> void:
	texture = texture_en if GameState.language == "en" else texture_es
