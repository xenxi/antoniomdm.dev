class_name CampaignRules
extends RefCounted
## Existing campaign rules, independent of rendering, input and persistence.
## Reglas de campaña existentes, independientes del render, entrada y persistencia.

var catalog: CampaignCatalog = preload("res://data/campaign/catalog.tres")
var missions: Dictionary = {}

func _init() -> void:
	for mission in catalog.missions: missions[mission.id] = mission

func fresh_progress() -> Dictionary:
	return {"mission": 0, "sequence": [], "seen": [], "completedEvents": [],
		"pendingPipeline": false, "choices": [], "side": [], "failedSide": [], "energy": 100}

func new_game() -> Dictionary:
	return {"version": 2, "chapterId": catalog.chapters[0].id,
		"chapters": {catalog.chapters[0].id: fresh_progress()}, "coffee": false, "secret": false, "cleared": [], "timed": true}

func chapter(id: String) -> Dictionary:
	for item in catalog.chapters:
		if item.id == id: return item
	return {}

func progress(state: Dictionary, id: String = "") -> Dictionary:
	return state.chapters.get(id if not id.is_empty() else state.chapterId, fresh_progress())

func mission(state: Dictionary) -> Dictionary:
	var index = int(progress(state).mission)
	var ids: Array = chapter(state.chapterId).get("missions", [])
	return missions[ids[index]] if index < ids.size() else {}

func patch(state: Dictionary, changes: Dictionary) -> void:
	if not state.chapters.has(state.chapterId): state.chapters[state.chapterId] = fresh_progress()
	state.chapters[state.chapterId].merge(changes, true)

func select(state: Dictionary, id: String) -> bool:
	if chapter(id).is_empty(): return false
	state.chapterId = id
	if not state.chapters.has(id): state.chapters[id] = fresh_progress()
	return true

func complete(state: Dictionary, id: String = "") -> bool:
	if id.is_empty(): id = state.chapterId
	return int(progress(state, id).mission) >= chapter(id).get("missions", []).size()

func has_event(state: Dictionary, id: String) -> bool:
	for item in state.chapters.values():
		if id in item.completedEvents: return true
	return false

func eligible_events(state: Dictionary, id: String = "") -> Array[String]:
	if id.is_empty(): id = state.chapterId
	var available: Array[String] = []
	if id in catalog.freelance_chapter_ids: available.append("freelance")
	if id in ["alcatel-lucent", "anexia", "system-recovery"]: available.append("incident")
	for event in catalog.personal_events:
		if chapter(id).experienceId == event.occursDuringExperienceId and id != "system-recovery": available.append(event.id)
	if id == "anexia" and has_event(state, "wedding"): available.append("friday")
	if id in ["domingo-alonso", "system-recovery"] and has_event(state, "emma-born"): available.append("family")
	return available.filter(func(event): return event not in progress(state, id).seen)

func cleared(state: Dictionary, id: String) -> bool:
	if id in state.get("cleared", []): return true
	var item = progress(state, id)
	return complete(state, id) and not item.pendingPipeline and item.seen.all(func(event): return event in item.completedEvents) and eligible_events(state, id).is_empty()

func unlocked(state: Dictionary, id: String) -> bool:
	for item in catalog.chapters:
		if item.id == id: return true
		if not cleared(state, item.id): return false
	return false

func fail_attempt(state: Dictionary) -> void:
	var item = progress(state)
	var current = mission(state)
	var changes = {"energy": maxi(0, int(item.energy) - 15), "sequence": []}
	item.erase("snake")
	if not current.is_empty():
		changes.choices = item.choices.filter(func(id): return not id.begins_with(current.id + ":"))
		if state.timed: changes.remaining = maxi(0, int(item.get("remaining", current.get("seconds", 90))) - 10)
	patch(state, changes)

func tick(state: Dictionary) -> void:
	var item = progress(state)
	var current = mission(state)
	if current.is_empty() or not state.timed or item.get("remaining", -1) == 0 or item.energy == 0: return
	item.remaining = int(item.get("remaining", current.get("seconds", 90))) - 1
	if item.remaining == 0: fail_attempt(state)

func recover(state: Dictionary) -> void:
	var item = progress(state)
	if item.energy == 0:
		item.sequence = []
		item.erase("snake")
		item.erase("remaining")
		var current = mission(state)
		if not current.is_empty(): item.choices = item.choices.filter(func(id): return not id.begins_with(current.id + ":"))
	item.energy = 100

func choose(state: Dictionary, choice_id: String) -> Dictionary:
	var item = progress(state)
	var current = mission(state)
	if current.is_empty() or item.energy == 0 or (state.timed and item.get("remaining", -1) == 0): return {"valid": false}
	if current.get("challenge", "") == "snake" and item.get("snake", {}).get("score", 0) != 4: return {"valid": false}
	var choice: Dictionary = {}
	for option in current.choices:
		if option.id == choice_id: choice = option
	if choice.is_empty(): return {"valid": false}
	var accepted = current.sequence[item.sequence.size()] == choice_id if current.has("sequence") else bool(choice.get("accepted", false))
	if not accepted:
		fail_attempt(state)
		return {"valid": true, "accepted": false, "completed": false, "feedback": choice.feedback}
	item.sequence.append(choice_id)
	var finished = not current.has("sequence") or item.sequence.size() == current.sequence.size()
	item.choices.append(current.id + ":" + choice_id)
	if finished:
		item.sequence = []
		item.mission += 1
		item.erase("remaining")
		item.erase("snake")
		item.energy = maxi(0, int(item.energy) - 10)
	return {"valid": true, "accepted": true, "completed": finished, "feedback": choice.feedback}

func choose_side(state: Dictionary, id: String, index: int) -> Dictionary:
	var item = progress(state)
	var side: Dictionary = {}
	for candidate in catalog.side_quests:
		if candidate.id == id and candidate.chapter == state.chapterId: side = candidate
	if side.is_empty() or item.energy == 0 or index < 0 or index >= side.options.size() or item.mission < side.get("after", 0) or id in item.side: return {"valid": false}
	if index != side.correct:
		fail_attempt(state)
		if id not in item.failedSide: item.failedSide.append(id)
		return {"valid": true, "accepted": false, "reward": 0, "feedback": side.failures.get(str(index), {})}
	var reward = 0 if id in item.failedSide else mini(20, 100 - int(item.energy))
	item.side.append(id)
	item.energy += reward
	return {"valid": true, "accepted": true, "reward": reward, "feedback": side.result}

func begin_event(state: Dictionary, id: String) -> bool:
	if id not in eligible_events(state) and id not in progress(state).seen: return false
	if id not in progress(state).seen: progress(state).seen.append(id)
	return true

func finish_event(state: Dictionary, id: String) -> bool:
	if not begin_event(state, id): return false
	if id not in progress(state).completedEvents: progress(state).completedEvents.append(id)
	return true

func replay(state: Dictionary) -> bool:
	if not cleared(state, state.chapterId): return false
	if state.chapterId not in state.cleared: state.cleared.append(state.chapterId)
	var previous = progress(state)
	var fresh = fresh_progress()
	fresh.seen = previous.seen.duplicate()
	fresh.completedEvents = previous.completedEvents.duplicate()
	state.chapters[state.chapterId] = fresh
	return true

func quick(mission_id: String, chapter_id: String) -> Dictionary:
	var item = chapter(chapter_id)
	if item.is_empty() or mission_id not in item.missions: return {}
	var state = new_game()
	select(state, chapter_id)
	progress(state).mission = item.missions.find(mission_id)
	return state

func valid_save(value: Variant) -> bool:
	if not value is Dictionary or value.get("version") != 2 or chapter(str(value.get("chapterId", ""))).is_empty(): return false
	if not value.get("chapters") is Dictionary or not value.chapters.has(value.chapterId): return false
	for key in ["coffee", "secret", "timed"]:
		if not value.get(key) is bool: return false
	if not value.get("cleared") is Array: return false
	for id in value.cleared:
		if not id is String or chapter(id).is_empty(): return false
	for id in value.chapters:
		if not id is String or chapter(id).is_empty(): return false
		var item = value.chapters[id]
		if not item is Dictionary or not item.get("pendingPipeline") is bool: return false
		if not _integer(item.get("mission"), 0, chapter(id).missions.size()) or not _integer(item.get("energy"), 0, 100): return false
		for key in ["seen", "completedEvents", "sequence", "choices", "side", "failedSide"]:
			if not item.get(key) is Array or item[key].size() > 100: return false
			for entry in item[key]:
				if not entry is String: return false
		for event in item.seen:
			if event not in ["freelance", "incident", "wedding", "emma-born", "friday", "family"]: return false
		for event in item.completedEvents:
			if event not in item.seen: return false
		var current = missions[chapter(id).missions[item.mission]] if item.mission < chapter(id).missions.size() else {}
		var sequence: Array = current.get("sequence", [])
		if item.sequence.size() >= maxi(1, sequence.size()): return false
		for index in item.sequence.size():
			if item.sequence[index] != sequence[index]: return false
		if item.has("remaining") and not _integer(item.remaining, 0, current.get("seconds", 90)): return false
		if item.has("snake") and (current.get("challenge", "") != "snake" or not SnakeRules.valid(item.snake)): return false
		for choice in item.choices:
			var parts = choice.split(":")
			if parts.size() != 2 or parts[0] not in chapter(id).missions: return false
			if not missions[parts[0]].choices.any(func(option): return option.id == parts[1]): return false
		for side in item.side + item.failedSide:
			if not catalog.side_quests.any(func(candidate): return candidate.id == side and candidate.chapter == id): return false
	return true

func _integer(value: Variant, minimum: int, maximum: int) -> bool:
	return (value is int or value is float) and is_finite(value) and value == floor(value) and value >= minimum and value <= maximum
