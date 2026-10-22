class_name ActionArt
extends RefCounted
const FIRST = preload("res://assets/characters/antonio-green-actions.webp")
const SECOND = preload("res://assets/characters/antonio-green-breaks.webp")
const STANDING = preload("res://assets/characters/antonio-green-standing.webp")

static func standing_texture(direction: String) -> Texture2D:
	return SECOND if direction == "down" else STANDING

static func standing_region(direction: String, blink: bool = false) -> Rect2:
	# Front idle already has grounded feet and a matching blink.
	# El reposo frontal ya tiene los pies apoyados y un parpadeo coherente.
	if direction == "down": return region("idle", 6 if blink else 0)
	return Rect2(maxi(0, ["down", "right", "up", "left"].find(direction)) * 256, 0, 256, 256)

static func texture(id: String) -> Texture2D:
	return FIRST if id in ["door", "work", "talk", "guitar"] else SECOND

static func region(id: String, frame: int) -> Rect2:
	var row = ["door", "work", "talk", "guitar"].find(id)
	if row < 0: row = ["study", "idle", "coffee", "focus"].find(id)
	return Rect2(clampi(frame, 0, 7) * 256, maxi(row, 0) * 256, 256, 256)
