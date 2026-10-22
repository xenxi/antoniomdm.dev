@tool
class_name ArcadeWorld
extends Node2D

@export var world_id: String = "town"
@export var layout: WorldGrid
@export var background_es: Texture2D
@export var background_en: Texture2D
var spawn_name: String = "Entry"
var navigation := GridNavigation.new()
var player: ArcadePlayer
var interactables: Array[ArcadeInteractable] = []

func _ready() -> void:
	if Engine.is_editor_hint(): return
	if world_id != "town":
		var ambience = Node2D.new()
		ambience.set_script(load("res://components/animation/focus_ambience.gd"))
		add_child(ambience)
	if SceneManager.container == null:
		# F6: the edited world is already loaded; attach services without replacing it.
		# F6: conecta los servicios a la escena abierta sin sustituirla.
		_bootstrap_standalone.call_deferred()
	navigation.configure(self, layout)
	for node in find_children("*", "Node2D", true, false):
		if node is ArcadeInteractable: interactables.append(node)
	player = $Player
	var marker = get_node_or_null("Spawns/" + spawn_name)
	if marker == null: marker = $Spawns/Entry
	var spawn = Vector2i(layout.unproject(marker.position).floor())
	if GameState.positions.has(world_id):
		var saved = GameState.positions[world_id]
		var candidate = Vector2i(saved[0], saved[1])
		if navigation.walkable(candidate): spawn = candidate
	player.configure(layout, navigation, spawn)
	player.arrived.connect(_arrived)
	player.interaction_requested.connect(_interact)
	EventBus.language_changed.connect(_language_changed)
	_language_changed()

func _bootstrap_standalone() -> void:
	var container = Node2D.new()
	container.name = "WorldContainer"
	get_tree().root.add_child(container)
	reparent(container)
	get_tree().current_scene = container
	SceneManager.container = container
	SceneManager.current = self
	GameState.current_world = world_id
	var ui = load("res://ui/game_ui.tscn").instantiate()
	get_tree().root.add_child(ui)

func _language_changed() -> void:
	$Background.texture = background_en if GameState.language == "en" else background_es

func _arrived(tile: Vector2i) -> void:
	GameState.positions[world_id] = [tile.x, tile.y]
	# Persist settled routes, not frame-by-frame positions or web acknowledgements.
	# Guarda rutas terminadas, no posiciones por frame ni confirmaciones de la web.
	if player.route.is_empty(): SaveManager.save_game()

func _interact(target: ArcadeInteractable) -> void:
	# Defer transitions so the active player cannot free its own call stack.
	# Difiere transiciones para no liberar al jugador dentro de su propia llamada.
	target.interact.call_deferred()

func nearby() -> ArcadeInteractable:
	for target in interactables:
		var point = Vector2i(layout.unproject(to_local(target.anchor())).floor())
		if absi(player.tile.x - point.x) + absi(player.tile.y - point.y) <= 1: return target
	return null

func _unhandled_input(event: InputEvent) -> void:
	if Engine.is_editor_hint() or not player.enabled(): return
	if event is InputEventKey and event.pressed and not event.echo:
		if event.physical_keycode in [KEY_E, KEY_SPACE]:
			var target = nearby()
			if target: _interact(target)
			get_viewport().set_input_as_handled()
	var point: Vector2
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT: point = event.position
	elif event is InputEventScreenTouch and event.pressed: point = event.position
	else: return
	point = get_global_transform_with_canvas().affine_inverse() * point
	var selected: ArcadeInteractable
	for target in interactables:
		if target.contains(to_global(point)) and (selected == null or target.position.y > selected.position.y): selected = target
	var destination = to_local(selected.anchor()) if selected else point
	player.travel_to(Vector2i(layout.unproject(destination).floor()), selected)
	get_viewport().set_input_as_handled()
