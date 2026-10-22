@tool
extends Node2D
## ES: Franjas ordenadas por la base real, sin elevar el suelo ante los actores.
## EN: Strips sorted by the actual ground edge, never lifting pavement over actors.
@export var texture_es: Texture2D
@export var texture_en: Texture2D
@export var bounds: Rect2
@export var depth_profile: PackedVector2Array
var texture: Texture2D
var strips: Array[Sprite2D] = []

func _ready() -> void:
	if Engine.is_editor_hint():
		queue_redraw()
		return
	y_sort_enabled = true
	for index in depth_profile.size():
		var p = depth_profile[index]
		var end = depth_profile[index + 1].x if index + 1 < depth_profile.size() else float(texture_es.get_width())
		var strip = Sprite2D.new()
		strip.centered = false
		strip.region_enabled = true
		strip.region_rect = Rect2(p.x, 0, end - p.x, texture_es.get_height())
		strip.position = Vector2(bounds.position.x + p.x / 3.2, p.y) - get_parent().position
		strip.offset = Vector2(0, (bounds.position.y - p.y) * 3.2)
		strip.scale = Vector2.ONE / 3.2
		add_child(strip)
		strips.append(strip)
	EventBus.language_changed.connect(_refresh)
	_refresh()

func _refresh() -> void:
	texture = texture_en if GameState.language == "en" else texture_es
	for strip in strips: strip.texture = texture

func _draw() -> void:
	if Engine.is_editor_hint() and texture_es:
		draw_texture_rect(texture_es, Rect2(bounds.position - get_parent().position, bounds.size), false)
