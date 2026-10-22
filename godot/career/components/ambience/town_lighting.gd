extends Node2D
## Ground pools and upper particles use separate layers to preserve occlusion.
## Luz del suelo y partículas separadas para respetar las oclusiones.
var foreground: bool = false
var native_fountains: bool = false
var elapsed: float = 0.0
var reduced: bool = false
var pools: Array[Vector2] = []
const FOUNTAINS = [Vector3(207, 225, 13), Vector3(240, 228, 12)]

func _ellipse(center: Vector2, radius: float, tint: Color) -> void:
	var polygon = PackedVector2Array()
	for i in 24:
		var angle = i * TAU / 24.0
		polygon.append(center + Vector2(cos(angle), sin(angle) * .45) * radius)
	draw_colored_polygon(polygon, tint)

func _draw() -> void:
	var clock = 0.0 if reduced else elapsed
	if not foreground:
		for index in pools.size():
			var strength = .85 + .15 * sin(clock * .55 + index * 1.7)
			var tint = Color("ffbd69") if index % 4 != 3 else Color("58dfeb")
			for radius in range(14, 2, -2):
				_ellipse(pools[index], float(radius), Color(tint, .018 * strength))
			# Short reflected highlights stay on the pavement, away from facades.
			for line in 3:
				var p = pools[index] + Vector2(-2 + line * 1.3, 1 + line)
				draw_line(p, p + Vector2(3.5, 1.6), Color(tint, .11 * strength), .45)
		return
	if native_fountains:
		for fountain in FOUNTAINS:
			var base = Vector2(fountain.x, fountain.y)
			for jet in 4:
				var phase = fmod(clock * .8 + jet * .25, 1.0)
				var p = base + Vector2((jet - 1.5) * phase * 1.2, -sin(phase * PI) * fountain.z)
				draw_circle(p, .6, Color("b4f5ffb0"))
			for ring in 3:
				var phase = fmod(clock * .5 + ring / 3.0, 1.0)
				_ellipse(base, 1 + phase * 5, Color(.35, .8, 1, (1 - phase) * .12))
	# Reflejos sobre el agua del puerto / Reflections on the harbor water.
	for index in 24:
		var x = 4 + (index * 31) % 164
		var y = 240 + x * .46 + (index % 4) * 7
		var shift = sin(clock * .9 + index * 1.8) * 1.6
		var tint = Color(.2, .75, 1, .12 + .08 * sin(clock * .6 + index))
		draw_line(Vector2(x + shift, y), Vector2(x + shift + 2.5, y), tint, .5)
	if reduced: return
	# Restrained fireflies and drifting leaves around the garden and promenade.
	# Luciérnagas y hojas discretas alrededor del jardín y del paseo.
	for index in pools.size():
		var base = pools[index]
		var phase = clock * .35 + index * 2.37
		var p = base + Vector2(sin(phase) * 9, -8 + cos(phase * .73) * 5)
		var alpha = .25 + .22 * sin(phase * 1.4)
		draw_circle(p, 1.7, Color(1, .78, .32, alpha * .08))
		draw_circle(p, .4, Color(1, .88, .5, alpha))
	for index in 7:
		var phase = fmod(clock * .075 + index * .143, 1.0)
		var base = Vector2(95 + index * 42, 75 + index * 17)
		var p = base + Vector2(phase * 18 + sin(phase * 12) * 3, phase * 25)
		draw_line(p, p + Vector2(1.0, .5), Color(.8, .65, .31, sin(phase * PI) * .6), .6)
