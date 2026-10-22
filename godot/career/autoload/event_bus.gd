extends Node
## Gameplay signals stay inside Godot. / Las señales de juego permanecen en Godot.
signal world_entered(world_id: String)
signal world_exited(world_id: String)
signal npc_interacted(npc_id: String)
signal quest_started(quest_id: String)
signal quest_updated(quest_id: String)
signal quest_completed(quest_id: String)
signal portfolio_requested(kind: String, content_id: String)
signal language_changed
signal activity_changed
signal dialogue_changed
signal save_failed

