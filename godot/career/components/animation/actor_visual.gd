extends Node2D
## Presentation can change without changing movement. / Presentación independiente del movimiento.
var gait := CharacterMotion.new()
var action_sprite: Sprite2D
var facing: String = "down"

func _ready() -> void:
	action_sprite = Sprite2D.new()
	action_sprite.region_enabled = true
	action_sprite.position = $AnimatedSprite2D.position
	action_sprite.scale = $AnimatedSprite2D.scale
	add_child(action_sprite)

func _process(_delta: float) -> void:
	var id = CharacterActions.presentation_action()
	var resting = id.is_empty() and not gait.walking()
	action_sprite.visible = not id.is_empty() or resting
	$AnimatedSprite2D.visible = not action_sprite.visible
	if not id.is_empty():
		action_sprite.texture = ActionArt.texture(id)
		action_sprite.region_rect = ActionArt.region(id, CharacterActions.frame())
	elif resting:
		action_sprite.texture = ActionArt.standing_texture(facing)
		action_sprite.region_rect = ActionArt.standing_region(facing, gait.blink())
	queue_redraw()

func _draw() -> void:
	if CharacterActions.coffee.phase != "playing": return
	# Calm ring, no flashes or camera shake. / Aro tranquilo, sin destellos ni sacudidas.
	draw_arc(Vector2(0, -10), 18, 0, TAU, 32, Color(.25, .85, 1.0, .5), .6)

func present(direction: String, moving: bool, reduced: bool, delta: float, distance: float = 0.0) -> void:
	CharacterActions.motion(moving)
	facing = direction
	gait.advance(delta, moving or distance > .001, distance, reduced, GameState.active)
	$AnimatedSprite2D.animation = direction
	# Manual phase keeps pause and reduced motion deterministic.
	# La fase manual respeta la pausa y el movimiento reducido.
	$AnimatedSprite2D.frame = gait.frame()
	position.y = gait.offset_y()

