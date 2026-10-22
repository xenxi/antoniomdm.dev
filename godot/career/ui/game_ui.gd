extends CanvasLayer

var panel: PanelContainer
var title: Label
var body: Label
var next: Button
var notice: String = ""
var status: Label
var pause_button: Button

func _ready() -> void:
	var toolbar = HBoxContainer.new()
	toolbar.position = Vector2(6, 4)
	add_child(toolbar)
	pause_button = Button.new()
	pause_button.pressed.connect(func(): GameState.set_active(not GameState.active); _refresh())
	toolbar.add_child(pause_button)
	var language = Button.new()
	language.text = "ES / EN"
	language.pressed.connect(func(): GameState.set_language("en" if GameState.language == "es" else "es"))
	toolbar.add_child(language)
	var activities = PanelContainer.new()
	activities.set_script(load("res://ui/activity_panel.gd"))
	add_child(activities)
	activities.hide()
	var activities_button = Button.new()
	activities_button.text = "☕"
	activities_button.tooltip_text = "Acciones y café / Actions and coffee"
	activities_button.pressed.connect(func(): activities.visible = not activities.visible)
	toolbar.add_child(activities_button)
	var mission_button = Button.new()
	mission_button.text = "▣"
	mission_button.pressed.connect(func(): GameSession.dispatch({"type": "openMission"}))
	toolbar.add_child(mission_button)
	var menu_button = Button.new()
	menu_button.text = "☰"
	menu_button.tooltip_text = "Partida y misiones / Game and missions"
	menu_button.pressed.connect(func(): GameSession.dispatch({"type": "openMenu"}))
	toolbar.add_child(menu_button)
	status = Label.new()
	status.add_theme_font_size_override("font_size", 10)
	toolbar.add_child(status)
	panel = PanelContainer.new()
	panel.position = Vector2(8, 196)
	panel.size = Vector2(464, 116)
	add_child(panel)
	var column = VBoxContainer.new()
	panel.add_child(column)
	title = Label.new()
	title.add_theme_font_size_override("font_size", 12)
	column.add_child(title)
	body = Label.new()
	body.custom_minimum_size = Vector2(448, 45)
	body.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	body.add_theme_font_size_override("font_size", 12)
	column.add_child(body)
	next = Button.new()
	next.pressed.connect(_advance)
	column.add_child(next)
	EventBus.dialogue_changed.connect(_refresh)
	EventBus.language_changed.connect(_refresh)
	EventBus.activity_changed.connect(_refresh)
	EventBus.quest_completed.connect(func(_id): _refresh())
	EventBus.save_failed.connect(func(): notice = "save"; _refresh())
	WebBridge.standalone_portfolio.connect(func(_kind, _id): notice = "portfolio"; _refresh())
	var campaign_panel = PanelContainer.new()
	campaign_panel.set_script(load("res://ui/campaign_panel.gd"))
	add_child(campaign_panel)
	_refresh()

func _refresh() -> void:
	var en = GameState.language == "en"
	pause_button.text = ("Pause" if en else "Pausa") if GameState.active else ("Resume" if en else "Continuar")
	status.text = ("Arrows / WASD · E · click / touch" if en else "Flechas / WASD · E · clic / toque")
	panel.visible = DialogueSystem.current != null or not notice.is_empty()
	if DialogueSystem.current:
		title.text = GameState.localized(DialogueSystem.current.speaker)
		body.text = GameState.localized(DialogueSystem.current.lines[DialogueSystem.line_index])
	elif notice == "save":
		title.text = "Save unavailable" if en else "Guardado no disponible"
		body.text = "You can keep playing. Check storage permissions." if en else "Puedes seguir jugando. Revisa los permisos de almacenamiento."
	else:
		title.text = "Portfolio" if en else "Portfolio"
		body.text = "In the website, this action opens the professional experience. Continue exploring here." if en else "En la web, esta acción abre la experiencia profesional. Aquí puedes seguir explorando."
	next.text = "Continue" if en else "Continuar"
	if panel.visible: next.grab_focus.call_deferred()
	else: get_viewport().gui_release_focus()

func _advance() -> void:
	if DialogueSystem.current: DialogueSystem.advance()
	else: notice = ""; _refresh()

func _unhandled_key_input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and not event.echo and event.physical_keycode == KEY_ESCAPE:
		GameState.set_active(not GameState.active)
		get_viewport().set_input_as_handled()
