extends Node2D
const ATLAS = preload("res://assets/characters/town-citizens.webp")
var style: int = 0
var frame: int = 0
var left: bool = false

func present(citizen: Dictionary, reduced: bool, screen_direction: Vector2) -> void:
	style = citizen.style
	frame = 1 + int(citizen.travel * 6.0) % 6 if citizen.moving and not reduced else 0
	if absf(screen_direction.x) > .01: left = screen_direction.x < 0.0
	queue_redraw()

func _draw() -> void:
	draw_set_transform(Vector2.ZERO, 0, Vector2(1, .38))
	draw_circle(Vector2.ZERO, 4.0, Color("04091760"))
	draw_set_transform(Vector2.ZERO, 0, Vector2(-1 if left else 1, 1))
	draw_texture_rect_region(ATLAS, Rect2(-13, -23.97, 26, 26), Rect2(frame * 128, style * 128, 128, 128))
