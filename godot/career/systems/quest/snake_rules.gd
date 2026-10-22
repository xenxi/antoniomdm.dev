class_name SnakeRules
extends RefCounted

const PACKETS = [Vector2i(5, 4), Vector2i(5, 1), Vector2i(1, 1), Vector2i(1, 6)]

static func fresh() -> Dictionary:
	return {"body": [[2, 4], [1, 4], [0, 4]], "score": 0, "failed": false}

static func step(state: Dictionary, direction: Vector2i) -> Dictionary:
	if state.failed or state.score == 4 or absi(direction.x) + absi(direction.y) != 1: return state
	var head = Vector2i(state.body[0][0], state.body[0][1]) + direction
	var eating = head == PACKETS[state.score]
	var body: Array = state.body.duplicate(true)
	if not eating: body.pop_back()
	if head.x < 0 or head.y < 0 or head.x > 7 or head.y > 7 or [head.x, head.y] in body:
		var failed = state.duplicate(true)
		failed.failed = true
		return failed
	body.push_front([head.x, head.y])
	return {"body": body, "score": state.score + int(eating), "failed": false}

static func valid(value: Variant) -> bool:
	if not value is Dictionary or not value.get("failed") is bool: return false
	var score = value.get("score", -1)
	if not (score is int or score is float) or score != floor(score) or score < 0 or score > 4: return false
	if not value.get("body") is Array or value.body.size() != score + 3: return false
	var seen: Array = []
	for point in value.body:
		if not point is Array or point.size() != 2 or point in seen: return false
		for coordinate in point:
			if not (coordinate is int or coordinate is float) or coordinate != floor(coordinate) or coordinate < 0 or coordinate > 7: return false
		if not seen.is_empty() and abs(point[0] - seen.back()[0]) + abs(point[1] - seen.back()[1]) != 1: return false
		seen.append(point)
	return true
