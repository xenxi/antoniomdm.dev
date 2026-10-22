class_name NpcBehaviour
extends Node
## Finite states; replace this component to add a strategy, never the actor.
## Estados finitos; una estrategia futura sustituye este componente, no el actor.
enum State { IDLE, WALK, WORK, TALK }
@export var initial_state: State = State.IDLE
var state: State = State.IDLE
signal state_changed(value: State)

func _ready() -> void:
	state = initial_state

func transition(value: State) -> void:
	if value == state: return
	state = value
	state_changed.emit(state)

