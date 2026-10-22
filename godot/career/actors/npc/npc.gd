@tool
extends ArcadeInteractable

@export var configuration: NpcData:
	set(value):
		configuration = value
		if is_inside_tree(): _configure()

func _ready() -> void:
	_configure()
	if not Engine.is_editor_hint(): EventBus.dialogue_changed.connect(_dialogue_changed)

func _configure() -> void:
	if configuration == null: return
	interaction_id = configuration.id
	label = configuration.display_name
	if configuration.sprite_frames:
		$AnimatedSprite2D.sprite_frames = configuration.sprite_frames
		var texture = configuration.sprite_frames.get_frame_texture("default", 0)
		if texture:
			$AnimatedSprite2D.scale = Vector2.ONE * 32.0 / texture.get_height()

func interact() -> void:
	if configuration == null: return
	CharacterActions.interact("team")
	$Behaviour.transition(NpcBehaviour.State.TALK)
	EventBus.npc_interacted.emit(configuration.id)
	for quest in configuration.quests: QuestSystem.start(quest)
	DialogueSystem.begin(configuration.dialogue)

func _dialogue_changed() -> void:
	if DialogueSystem.current == null: $Behaviour.transition($Behaviour.initial_state)
