extends PanelContainer
## Both native UI and web consume the same presentation contract.
## La UI nativa y la web consumen el mismo contrato de presentación.
var column: VBoxContainer
var signature: String = ""
var resources: Label

func _ready() -> void:
	position = Vector2(8, 44)
	size = Vector2(464, 268)
	var scroll = ScrollContainer.new()
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	add_child(scroll)
	column = VBoxContainer.new()
	column.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	column.custom_minimum_size.x = 448
	scroll.add_child(column)
	GameSession.changed.connect(refresh)
	EventBus.language_changed.connect(refresh)
	refresh()

func label_text(value: String, font_size: int = 12) -> Label:
	var label = Label.new()
	label.text = value
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.add_theme_font_size_override("font_size", font_size)
	column.add_child(label)
	return label

func refresh() -> void:
	var model = GameSession.view_model()
	var content = model.presentation
	visible = not model.panel.is_empty()
	# Keep keyboard focus between timer ticks and snake moves.
	# Conserva el foco entre ticks y movimientos de Snake.
	var structure = content.duplicate(true)
	if structure.has("board"): structure.board = true
	var next_signature = JSON.stringify([model.panel, structure])
	if signature == next_signature:
		if is_instance_valid(resources): resources.text = model.status
		return
	signature = next_signature
	for child in column.get_children():
		column.remove_child(child)
		child.queue_free()
	if not visible:
		get_viewport().gui_release_focus()
		return
	resources = label_text(model.status)
	label_text(content.title, 16)
	label_text(content.text)
	if content.has("board"):
		var board = Control.new()
		board.set_script(load("res://ui/snake_board.gd"))
		column.add_child(board)
	if not content.feedback.is_empty(): label_text(content.feedback)
	for choice in content.choices:
		var button = Button.new()
		button.text = choice.label
		button.add_theme_font_size_override("font_size", 12)
		button.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		button.disabled = choice.disabled
		button.pressed.connect(func(): GameSession.dispatch(choice.command))
		column.add_child(button)
