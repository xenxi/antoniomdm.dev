extends PanelContainer
var buttons: Dictionary = {}
var status: Label
var meter: ProgressBar
var relaxed: CheckBox
const LABELS = {
	"door": ["Puerta", "Door"], "work": ["Trabajar", "Work"], "talk": ["Hablar", "Talk"],
	"guitar": ["Guitarra", "Guitar"], "study": ["Estudiar", "Study"], "idle": ["Gesto de reposo", "Idle gesture"],
	"coffee": ["Beber café", "Drink coffee"], "start": ["Iniciar reto", "Start challenge"],
	"hit": ["Atrapar momento", "Capture moment"], "cancel": ["Salir del reto", "Leave challenge"]}

func _ready() -> void:
	position = Vector2(8, 42)
	custom_minimum_size = Vector2(350, 0)
	var column = VBoxContainer.new()
	add_child(column)
	var grid = GridContainer.new()
	grid.columns = 4
	column.add_child(grid)
	for id in LABELS:
		var button = Button.new()
		button.add_theme_font_size_override("font_size", 11)
		button.pressed.connect(func(): _command(id))
		grid.add_child(button)
		buttons[id] = button
	relaxed = CheckBox.new()
	relaxed.add_theme_font_size_override("font_size", 11)
	column.add_child(relaxed)
	meter = ProgressBar.new()
	meter.custom_minimum_size = Vector2(320, 14)
	meter.show_percentage = false
	column.add_child(meter)
	status = Label.new()
	status.add_theme_font_size_override("font_size", 11)
	column.add_child(status)
	CharacterActions.changed.connect(refresh)
	EventBus.language_changed.connect(refresh)
	EventBus.activity_changed.connect(refresh)
	refresh()

func _command(id: String) -> void:
	var type = {"start": "coffeeStart", "hit": "coffeeHit", "cancel": "coffeeCancel"}.get(id, "characterAction")
	CharacterActions.command({"type": type, "id": id, "untimed": relaxed.button_pressed})

func refresh() -> void:
	var en = GameState.language == "en"
	var coffee = CharacterActions.coffee
	var playing = coffee.phase == "playing"
	for id in buttons:
		buttons[id].text = LABELS[id][1 if en else 0]
		buttons[id].disabled = not GameState.active or (playing and id not in ["hit", "cancel"])
	buttons.start.disabled = not GameState.active or coffee.cups < 3 or playing
	buttons.hit.visible = playing
	buttons.cancel.visible = playing
	relaxed.text = "No time limit or precision requirement" if en else "Sin límite de tiempo ni precisión"
	relaxed.disabled = playing
	meter.visible = playing
	meter.value = coffee.cursor * 100.0
	status.text = ("Coffee %d/3 · Hits %d/5 · Misses %d" if en else "Café %d/3 · Aciertos %d/5 · Fallos %d") % [coffee.cups, coffee.hits, coffee.misses]
	if playing:
		status.text += "\n" + (("Press between 35 and 65%% · %ds" if en else "Pulsa entre 35 y 65%% · %ds") % ceili(coffee.remaining) if not coffee.untimed else ("Press five times at your own pace" if en else "Pulsa cinco veces a tu ritmo"))
	elif coffee.phase == "won": status.text += "\n" + ("Five moments captured!" if en else "¡Cinco momentos atrapados!")
	elif coffee.phase == "lost": status.text += "\n" + ("Try again" if en else "Vuelve a intentarlo")
