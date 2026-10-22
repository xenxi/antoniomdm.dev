class_name CoffeeChallenge
extends RefCounted
## A session-only arcade challenge; never changes campaign rewards or save data.
## Reto de sesión independiente de las recompensas y del guardado de campaña.
const GOAL = 5
var phase: String = "idle"
var cups: int = 0
var hits: int = 0
var misses: int = 0
var remaining: float = 12.0
var cursor: float = 0.0
var elapsed: float = 0.0
var cooldown: float = 0.0
var sip_cooldown: float = 0.0
var untimed: bool = false

func drink() -> bool:
	if phase == "playing" or sip_cooldown > 0.0: return false
	cups = mini(3, cups + 1)
	sip_cooldown = 2.0
	if cups == 3: phase = "ready"
	return true

func start(accessible: bool) -> bool:
	if cups < 3 or phase == "playing": return false
	untimed = accessible
	phase = "playing"
	hits = 0
	misses = 0
	remaining = 12.0
	elapsed = 0.0
	cursor = .5 if untimed else 0.0
	cooldown = 0.0
	return true

func tick(delta: float) -> void:
	sip_cooldown = maxf(0.0, sip_cooldown - delta)
	cooldown = maxf(0.0, cooldown - delta)
	if phase != "playing": return
	elapsed += delta
	cursor = .5 if untimed else (1.0 - cos(elapsed * 2.5)) * .5
	if not untimed:
		remaining = maxf(0.0, remaining - delta)
		if remaining == 0.0: phase = "lost"

func hit() -> void:
	if phase != "playing" or cooldown > 0.0: return
	cooldown = .25
	if cursor >= .35 and cursor <= .65: hits += 1
	else: misses += 1
	if hits >= GOAL: phase = "won"

func cancel() -> void:
	phase = "ready" if cups == 3 else "idle"

func snapshot() -> Dictionary:
	return {"phase": phase, "cups": cups, "hits": hits, "misses": misses,
		"remaining": snappedf(remaining, .1), "cursor": cursor, "untimed": untimed}
