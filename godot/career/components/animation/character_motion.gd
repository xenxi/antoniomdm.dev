class_name CharacterMotion
extends RefCounted
## Distance drives the gait; short input/ACK gaps do not restart it.
## La distancia marca el paso; las pausas breves de entrada/ACK no lo reinician.
const FRAME_COUNT = 8
const FRAMES_PER_TILE = 2.0
const SETTLE_SECONDS = .10
var phase: float = 0.0
var still_time: float = 1.0
var idle_time: float = 0.0
var weight: float = 0.0
var reduced: bool = false

func advance(delta: float, walking: bool, distance: float, reduce_motion: bool, active: bool) -> void:
	reduced = reduce_motion
	if reduced:
		phase = 0.0
		weight = 0.0
		still_time = 1.0
		idle_time = 0.0
		return
	if not active: return
	if walking:
		phase = fposmod(phase + maxf(distance, 0.0) * FRAMES_PER_TILE, FRAME_COUNT)
		still_time = 0.0
		idle_time = 0.0
	else:
		still_time += delta
		idle_time += delta
	weight = move_toward(weight, 1.0 if walking else 0.0, delta * 10.0)

func walking() -> bool:
	return not reduced and still_time < SETTLE_SECONDS

func frame() -> int:
	return int(phase) if walking() else 2

func blink() -> bool:
	return not reduced and fmod(idle_time, 4.6) > 4.44

func offset_y() -> float:
	if reduced: return 0.0
	return -sin(phase * TAU / 4.0) * weight * .22 + sin(idle_time * TAU / 3.4) * (1.0 - weight) * .16
