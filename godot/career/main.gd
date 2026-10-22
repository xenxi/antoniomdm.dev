extends Node2D

func _ready() -> void:
	# Temporary rollout adapter: keep the published campaign until its rules migrate.
	# Adaptador temporal: conserva la campaña publicada mientras se migran sus reglas.
	if OS.has_feature("web") and not WebBridge.native_runtime:
		$GameUI.queue_free()
		$WorldContainer.add_child(load("res://world.tscn").instantiate())
		return
	SaveManager.restore()
	if WebBridge.embedded: $GameUI.queue_free()
	SceneManager.mount($WorldContainer)
	WebBridge.announce_ready()
