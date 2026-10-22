extends Node

var path: String = "user://career-v2.json"
const MAX_BYTES = 60000
var writes_blocked: bool = false
var restore_status: String = "empty"

func allow_new_game() -> void:
	writes_blocked = false
	restore_status = "empty"

func save_game() -> bool:
	if writes_blocked: return false
	if OS.has_feature("web") and WebBridge.native_runtime:
		return true if WebBridge.write_save(JSON.stringify(GameState.snapshot())) else _failure()
	var file = FileAccess.open(path + ".tmp", FileAccess.WRITE)
	if file == null: return _failure()
	file.store_string(JSON.stringify(GameState.snapshot()))
	file.flush()
	var error = file.get_error()
	file.close()
	if error != OK: return _failure()
	if DirAccess.rename_absolute(path + ".tmp", path) != OK: return _failure()
	return true

func restore() -> bool:
	writes_blocked = false
	restore_status = "empty"
	var serialized: String = ""
	var legacy: String = ""
	if OS.has_feature("web") and WebBridge.native_runtime:
		var result = WebBridge.read_save()
		if not result.get("ok", false): return _restore_failure()
		serialized = str(result.get("value", ""))
		legacy = str(result.get("legacy", ""))
	else:
		if not FileAccess.file_exists(path): return false
		var file = FileAccess.open(path, FileAccess.READ)
		if file == null or file.get_length() > MAX_BYTES: return _restore_failure()
		serialized = file.get_as_text()
	return restore_serialized(serialized, legacy)

func restore_serialized(serialized: String, legacy: String = "") -> bool:
	if serialized.is_empty() and legacy.is_empty(): return false
	var migrating = serialized.is_empty()
	var source = legacy if migrating else serialized
	if source.to_utf8_buffer().size() > MAX_BYTES: return _restore_failure()
	var parser = JSON.new()
	if parser.parse(source) != OK: return _restore_failure()
	var value = parser.data
	if migrating: value = LegacySaveMigration.convert(value, GameSession.rules, SceneManager.WORLDS)
	if not validate(value): return _restore_failure()
	GameState.apply_exploration(value)
	GameState.language = value.language
	GameState.reduced_motion = value.reduced_motion
	GameSession.campaign = value.campaign.duplicate(true)
	GameSession.quick_game = value.quick.duplicate(true)
	GameSession.quick_id = value.quick_id
	GameSession.campaign_exploration = value.get("campaign_exploration", {}).duplicate(true)
	# Upgrade early v2 quick saves which did not carry a separate return context.
	# Compatibilidad con los primeros v2 sin contexto separado de retorno.
	if not value.quick.is_empty() and GameSession.campaign_exploration.is_empty():
		GameSession.campaign_exploration = GameState.exploration()
		GameSession.campaign_exploration.world = "town"
	writes_blocked = false
	restore_status = "migrated" if migrating else "restored"
	return true

func validate(value: Variant) -> bool:
	if not value is Dictionary or value.get("version") != 2: return false
	if not valid_exploration(value): return false
	if value.get("language") not in ["es", "en"] or not value.get("reduced_motion") is bool: return false
	if not GameSession.rules.valid_save(value.get("campaign")): return false
	if not value.get("quick") is Dictionary or not value.get("quick_id") is String: return false
	if not value.quick.is_empty():
		if not GameSession.rules.valid_save(value.quick): return false
		if value.quick_id not in GameSession.rules.chapter(value.quick.chapterId).missions: return false
	elif not value.quick_id.is_empty(): return false
	var suspended = value.get("campaign_exploration", {})
	if not suspended is Dictionary: return false
	if not suspended.is_empty() and (value.quick.is_empty() or not valid_exploration(suspended)): return false
	return true

func valid_exploration(value: Variant) -> bool:
	if not value is Dictionary or not SceneManager.WORLDS.has(value.get("world", "")): return false
	for key in ["positions", "quests", "npcs"]:
		if not value.get(key) is Dictionary: return false
	for key in ["discovered", "completed"]:
		if not value.get(key) is Array: return false
		for item in value[key]:
			if not item is String: return false
	for id in value.completed:
		if not QuestSystem.definitions.has(id) or value.completed.count(id) != 1 or value.quests.has(id): return false
	for world in value.positions:
		var point = value.positions[world]
		if not SceneManager.WORLDS.has(world) or not point is Array or point.size() != 2: return false
		for coordinate in point:
			if not (coordinate is float or coordinate is int) or not is_finite(coordinate) or coordinate != floor(coordinate): return false
	for id in value.quests:
		if not QuestSystem.definitions.has(id) or not value.quests[id] is Array: return false
		for objective in value.quests[id]:
			if objective not in QuestSystem.definitions[id].objectives or value.quests[id].count(objective) != 1: return false
	return true

func _restore_failure() -> bool:
	# Do not let bootstrap autosave replace unreadable progress with a fresh game.
	# El autoguardado del arranque nunca reemplaza una partida ilegible.
	writes_blocked = true
	restore_status = "failed"
	return _failure()

func _failure() -> bool:
	push_warning("No se pudo guardar o restaurar la partida / Could not save or restore the game")
	EventBus.save_failed.emit()
	return false
