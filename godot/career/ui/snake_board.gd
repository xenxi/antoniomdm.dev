extends Control

func _ready() -> void:
	custom_minimum_size = Vector2(160, 160)
	focus_mode = Control.FOCUS_ALL
	GameSession.changed.connect(queue_redraw)

func _gui_input(event: InputEvent) -> void:
	if not event is InputEventKey or not event.pressed or event.echo: return
	var directions = {KEY_UP: [0, -1], KEY_RIGHT: [1, 0], KEY_DOWN: [0, 1], KEY_LEFT: [-1, 0]}
	if directions.has(event.physical_keycode):
		GameSession.dispatch({"type": "snakeStep", "direction": directions[event.physical_keycode]})
		accept_event()

func _draw() -> void:
	var state = GameSession.rules.progress(GameSession.game()).get("snake", SnakeRules.fresh())
	draw_rect(Rect2(0, 0, 160, 160), Color("bdcb9c"))
	for y in range(8):
		for x in range(8): draw_rect(Rect2(x * 20, y * 20, 20, 20), Color("a3b080"), false, .5)
	for point in state.body: draw_rect(Rect2(point[0] * 20 + 2, point[1] * 20 + 2, 16, 16), Color("465b36"))
	if state.score < 4: draw_circle(Vector2(SnakeRules.PACKETS[state.score]) * 20 + Vector2(10, 10), 5, Color("344924"))

