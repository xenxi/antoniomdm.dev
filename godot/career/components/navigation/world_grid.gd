@tool
class_name WorldGrid
extends Resource

@export var size: Vector2i = Vector2i(30, 20)
@export var origin: Vector2 = Vector2(180, 17)
@export var axis_x: Vector2 = Vector2(9.6, 5.45)
@export var axis_y: Vector2 = Vector2(-9.4, 4.65)

func project(tile: Vector2) -> Vector2:
	return origin + axis_x * tile.x + axis_y * tile.y

func unproject(point: Vector2) -> Vector2:
	return Transform2D(axis_x, axis_y, origin).affine_inverse() * point

