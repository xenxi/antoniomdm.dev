class_name LegacySaveMigration
extends RefCounted
## Convert data only. Reading and committing belong to SaveManager.
## Convierte datos; SaveManager controla la lectura y la escritura.

static func convert(value: Variant, rules: CampaignRules, worlds: Dictionary) -> Dictionary:
	if not value is Dictionary or value.get("version") != 1: return {}
	if value.has("layout") and value.layout != 2 and value.layout != 3: return {}
	if not value.get("chapterId") is String or rules.chapter(value.chapterId).is_empty(): return {}
	if not value.get("chapters") is Dictionary or not value.chapters.has(value.chapterId): return {}
	for key in ["coffee", "secret"]:
		if not value.get(key) is bool: return {}
	if value.has("timed") and not value.timed is bool: return {}
	var campaign = rules.new_game()
	campaign.chapterId = value.chapterId
	campaign.coffee = value.coffee
	campaign.secret = value.secret
	campaign.timed = value.get("timed", true)
	campaign.cleared = value.get("cleared", []).duplicate() if value.get("cleared", []) is Array else []
	if value.has("cleared") and not value.cleared is Array: return {}
	campaign.chapters = {}
	var positions: Dictionary = {}
	for id in value.chapters:
		if not id is String or rules.chapter(id).is_empty(): return {}
		var source = value.chapters[id]
		if not source is Dictionary or not _point(source): return {}
		var progress = rules.fresh_progress()
		for key in ["mission", "sequence", "seen", "completedEvents", "pendingPipeline", "choices"]:
			if not source.has(key): return {}
			progress[key] = source[key]
		for key in ["side", "failedSide", "energy", "remaining", "snake"]:
			if source.has(key): progress[key] = source[key]
		campaign.chapters[id] = progress.duplicate(true)
		if worlds.has(id) and value.get("layout", 0) == 3: positions[id] = [source.x, source.y]
	if not rules.valid_save(campaign): return {}
	# Older layouts counted fewer missions; preserve their earned chapter access.
	# Los mapas antiguos tenían menos misiones; conserva los accesos ya ganados.
	if value.get("layout", 0) != 3:
		for chapter in rules.catalog.chapters:
			if chapter.id == campaign.chapterId: break
			if chapter.id not in campaign.cleared: campaign.cleared.append(chapter.id)
		for id in campaign.chapters:
			var item = campaign.chapters[id]
			var old_count = 7 if id == "system-recovery" else 2 if id == "domingo-alonso" else 1
			if item.mission >= old_count and not item.pendingPipeline and item.seen.all(func(event): return event in item.completedEvents) and rules.eligible_events(campaign, id).is_empty():
				if id not in campaign.cleared: campaign.cleared.append(id)
	var world = "town"
	var inside = true
	if value.has("world"):
		if not value.world is Dictionary or not _point(value.world) or not value.world.get("inside") is bool: return {}
		inside = value.world.inside
		positions.town = [value.world.x, value.world.y]
	if inside and worlds.has(campaign.chapterId): world = campaign.chapterId
	return {"version": 2, "world_layout": value.get("townLayout", 1), "flat_layout": value.get("flatLayout", 1), "world": world, "positions": positions, "discovered": [world],
		"quests": {}, "completed": [], "npcs": {}, "language": "es", "reduced_motion": false,
		"campaign": campaign, "quick": {}, "quick_id": "", "campaign_exploration": {}}

static func _point(value: Dictionary) -> bool:
	for key in ["x", "y"]:
		var coordinate = value.get(key)
		if not (coordinate is int or coordinate is float) or not is_finite(coordinate) or coordinate != floor(coordinate) or coordinate < 0 or coordinate > 256: return false
	return true
