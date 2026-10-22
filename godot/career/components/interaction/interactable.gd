@tool
class_name ArcadeInteractable
extends Node2D

@export var interaction_id: String = ""
@export var label: Dictionary = {"es": "Interactuar", "en": "Interact"}
@export_enum("dialogue", "world", "portfolio", "campaign") var action: String = "dialogue"
@export_file("*.tres") var dialogue_path: String = ""
@export var destination: String = ""
@export var spawn_name: String = "Entry"
@export_enum("experience", "project", "blog", "ai-lab") var portfolio_kind: String = "experience"
@export var content_id: String = ""
var opening: bool = false

func interact() -> void:
	match action:
		"world":
			if SceneManager.changing or opening: return
			opening = true
			CharacterActions.interact("door")
			if not GameState.reduced_motion:
				await get_tree().create_timer(.65).timeout
			opening = false
			if GameState.active: GameSession.request_world(destination, spawn_name)
		"dialogue":
			CharacterActions.interact("team")
			EventBus.npc_interacted.emit(interaction_id)
			if not dialogue_path.is_empty(): DialogueSystem.begin(load(dialogue_path))
		"portfolio": EventBus.portfolio_requested.emit(portfolio_kind, content_id)
		"campaign": GameSession.interact(interaction_id)

func anchor() -> Vector2:
	var marker = get_node_or_null("Approach")
	return marker.global_position if marker else global_position

func contains(point: Vector2) -> bool:
	var hit = get_node_or_null("HitArea/CollisionPolygon2D")
	if get_parent() is ArcadeWorld and get_parent().world_id == "town" and has_node("Approach"):
		if Rect2(anchor() - Vector2(5, 20), Vector2(10, 23)).has_point(point): return true
	return hit != null and Geometry2D.is_point_in_polygon(hit.to_local(point), hit.polygon)
