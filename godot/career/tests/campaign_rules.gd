extends SceneTree

var failures: Array[String] = []

func _initialize() -> void:
	call_deferred("run")

func check(condition: bool, message: String) -> void:
	if not condition:
		failures.append(message)
		push_error(message)

func run() -> void:
	var rules = CampaignRules.new()
	var game = rules.new_game()
	check(rules.unlocked(game, "freelance") and not rules.unlocked(game, "xul"), "Initial chapter gates are preserved")
	check(not rules.choose(game, "unknown").valid, "Unknown answers cannot alter progress")
	var item = rules.progress(game)
	rules.choose(game, "input")
	check(item.energy == 85 and item.sequence.is_empty(), "Wrong answers retain the existing energy penalty")
	rules.recover(game)
	check(item.energy == 100, "Coffee restores energy")
	game.timed = false
	for chapter in rules.catalog.chapters:
		check(rules.unlocked(game, chapter.id), "Previous complete chapters unlock " + chapter.id)
		rules.select(game, chapter.id)
		for _attempt in range(100):
			if rules.mission(game).is_empty(): break
			var mission = rules.mission(game)
			if mission.get("challenge", "") == "snake": rules.progress(game).snake = {"score": 4}
			if mission.has("sequence"):
				for choice in mission.sequence: check(rules.choose(game, choice).accepted, "Sequence answer is accepted: " + mission.id)
			else:
				for choice in mission.choices:
					if choice.get("accepted", false):
						check(rules.choose(game, choice.id).completed, "Mission completes: " + mission.id)
						break
		check(rules.complete(game), "Chapter missions are complete")
		for _round in range(6):
			for event in rules.eligible_events(game): rules.finish_event(game, event)
		check(rules.cleared(game, chapter.id), "Events clear their chapter")
	check(rules.has_event(game, "wedding") and rules.has_event(game, "emma-born"), "Personal event progression is preserved")
	check(rules.replay(game) and rules.unlocked(game, "system-recovery"), "Replay preserves earned gates")
	var quick = rules.quick("button", "freelance")
	check(not quick.is_empty() and rules.mission(quick).id == "button", "Quick missions start independently")
	check(rules.quick("button", "nokia").is_empty(), "Quick missions validate chapter membership")
	quick.timed = true
	rules.progress(quick).remaining = 1
	rules.tick(quick)
	check(rules.progress(quick).remaining == 0 and rules.progress(quick).energy == 85, "Timeout applies its penalty once")
	rules.tick(quick)
	check(rules.progress(quick).energy == 85, "Expired timers do not repeatedly penalize")
	var side = rules.catalog.side_quests[0]
	var side_game = rules.new_game()
	rules.select(side_game, side.chapter)
	rules.progress(side_game).mission = side.get("after", 0)
	var wrong = (int(side.correct) + 1) % side.options.size()
	check(not rules.choose_side(side_game, side.id, wrong).accepted, "Side quest failure is tracked")
	check(rules.choose_side(side_game, side.id, side.correct).reward == 0, "Retrying a failed side quest grants no reward")
	var snake = SnakeRules.fresh()
	for segment in [[1, 0, 3], [0, -1, 3], [-1, 0, 4], [0, 1, 5]]:
		for _step in range(segment[2]): snake = SnakeRules.step(snake, Vector2i(segment[0], segment[1]))
	check(snake.score == 4 and SnakeRules.valid(snake), "Snake retains its four-packet route and valid body")
	check(SnakeRules.step(SnakeRules.fresh(), Vector2i.LEFT).failed, "Snake collisions are detected")
	check(not SnakeRules.valid({"body": [[2, 4], [2, 4], [0, 4]], "score": 0, "failed": false}), "Duplicate Snake cells are rejected")
	print("Native campaign rules: PASS" if failures.is_empty() else "Native campaign rules: FAIL")
	quit(0 if failures.is_empty() else 1)
