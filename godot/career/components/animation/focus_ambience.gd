extends Node2D
## Lightweight world particles make the coffee time dilation visible.
## Partículas ligeras para visualizar la dilatación temporal del café.
var elapsed: float = 0.0

func _ready() -> void:
	z_index = 20

func _process(delta: float) -> void:
	if not GameState.active: return
	if not GameState.reduced_motion: elapsed += delta * CharacterActions.world_speed()
	queue_redraw()

func _draw() -> void:
	if GameState.reduced_motion: return
	for i in 24:
		var point = Vector2(fmod(i * 71.0 + elapsed * 8.0, 480.0), fmod(i * 53.0 + elapsed * 35.0, 320.0))
		draw_line(point, point + Vector2(0, 2), Color(.65, .85, 1.0, .24), .6)
