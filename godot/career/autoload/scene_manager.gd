extends Node

const WORLDS = {"town": "res://worlds/city/city.tscn", "freelance": "res://worlds/freelance/freelance.tscn"}
var container: Node2D
var current: Node2D
var changing: bool = false

func mount(target: Node2D) -> void:
	container = target
	change_world(GameState.current_world)

func change_world(id: String, spawn: String = "Entry") -> bool:
	if changing or not WORLDS.has(id) or not is_instance_valid(container): return false
	changing = true
	# Load only the requested scene; no preloaded registry retains inactive textures.
	# Carga solo la escena solicitada; el registro no retiene texturas inactivas.
	var packed = load(WORLDS[id]) as PackedScene
	if packed == null:
		changing = false
		push_error("No se pudo cargar el mapa / Could not load world: " + id)
		return false
	if is_instance_valid(current):
		EventBus.world_exited.emit(GameState.current_world)
		container.remove_child(current)
		current.free()
	DialogueSystem.cancel()
	GameState.current_world = id
	if id not in GameState.discovered_areas: GameState.discovered_areas.append(id)
	current = packed.instantiate()
	current.spawn_name = spawn
	container.add_child(current)
	changing = false
	EventBus.world_entered.emit(id)
	SaveManager.save_game()
	return true

