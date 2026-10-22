# Character actions / Acciones del personaje

## ES

- Abre «Acciones del personaje y café» bajo el mapa para probar puerta, trabajo,
  conversación, guitarra, estudio, gestos de reposo y café. En Godot standalone,
  el botón ☕ abre los mismos controles.
- Tras 12 segundos sin moverse se alternan gestos de tres segundos: ajustarse
  las gafas, tener una idea y encogerse de hombros. Cada gesto tiene ocho fases
  conectadas; caminar lo cancela.
- Terminales y misiones activan trabajo; NPC y diálogos activan conversación;
  la revisión activa estudio; las puertas nativas muestran el gesto antes del
  cambio de escena. Guitarra y estudio también se pueden ejecutar manualmente.
- Tres cafés virtuales, con dos segundos entre sorbos, desbloquean «Instante de
  café». Captura cinco momentos pulsando cuando el indicador está entre el 35 %
  y el 65 %. Hay doce segundos y un bloqueo de repetición de 250 ms.
- Durante el reto, el entorno animado avanza al 15 % y los temporizadores,
  eventos y consumo de energía de campaña se suspenden. El reloj del reto
  conserva su velocidad. No se modifica Engine.time_scale.
- El modo tranquilo elimina precisión y límite temporal. Movimiento reducido
  lo activa automáticamente, congela las poses y oculta partículas. No hay
  destellos ni sacudidas. La pausa congela el reto; salir o cambiar de mundo
  restablece la velocidad.
- Cafés y resultados duran esta sesión del motor; no se escriben en el guardado
  de campaña ni conceden recompensas profesionales.
- Las animaciones nuevas son poses de tres cuartos: no se han generado ocho
  versiones direccionales por acción. La caminata conserva sus cuatro direcciones.

## EN

- Open “Character actions and coffee” below the map to try door, work, talk,
  guitar, study, idle gestures and coffee. In standalone Godot, ☕ opens the same
  controls.
- After twelve idle seconds, three-second gestures alternate: adjusting
  glasses, having an idea and shrugging. Each gesture has eight connected phases;
  walking cancels it.
- Terminals and missions trigger work; NPCs and dialogue trigger conversation;
  review triggers study; native doors show the gesture before changing scenes.
  Guitar and study can also be triggered manually.
- Three virtual coffees, two seconds apart, unlock “Coffee moment”. Capture five
  moments by pressing when the indicator is between 35 % and 65 %. The round
  lasts twelve seconds; repeated inputs are blocked for 250 ms.
- During the challenge, animated surroundings run at 15 %; campaign timers,
  events and energy drain stop. The challenge clock runs normally.
  Engine.time_scale is not changed.
- Relaxed mode removes timing and precision. Reduced motion enables it
  automatically, holds poses and hides particles. No flashes or camera shake.
  Pause freezes the round; leaving or changing worlds restores normal speed.
- Coffees and results last for this engine session only. They do not enter the
  campaign save or award professional progression.
- New actions use three-quarter poses, not eight directional variants.
  Walking retains four directions.

## Authoring / Autoría

`autoload/character_actions.gd` owns the presentation clock and action selection.
`systems/quest/coffee_challenge.gd` owns the challenge rules.
`components/animation/action_art.gd` maps action IDs to atlas rows.
React displays a projection and sends intentions, never calculates a score.

`autoload/character_actions.gd` controla el reloj visual y la selección.
`systems/quest/coffee_challenge.gd` contiene las reglas del reto.
`components/animation/action_art.gd` asigna acciones a filas del atlas.
React presenta una proyección y envía intenciones; no calcula la puntuación.

ES: Los atlas actuales son `antonio-green-walk.webp`,
`antonio-green-actions.webp` y `antonio-green-breaks.webp`: ocho columnas,
cuatro filas y celdas transparentes de 256 px. La sudadera verde, las gafas,
el pelo y las proporciones siguen la referencia del 2026-10-07. Los sprites
anteriores se conservan como fuentes históricas.

EN: Current atlases are `antonio-green-walk.webp`,
`antonio-green-actions.webp` and `antonio-green-breaks.webp`: eight columns,
four rows and transparent 256 px cells. The green hoodie, glasses, hair and
proportions follow the 2026-10-07 reference. Earlier sprites remain as historical
sources.

ES: `CharacterMotion` sincroniza ocho fases por ciclo con la distancia recorrida
y conserva la fase durante huecos de entrada de hasta 100 ms. El reposo añade
respiración sutil y parpadeo frontal; la pausa congela ambos. Movimiento reducido
los desactiva. Café y puerta recorren su secuencia una vez, con preparación y
recuperación; trabajo, charla, guitarra y estudio tienen ritmos propios.

EN: `CharacterMotion` synchronizes eight phases per cycle with travelled distance
and preserves phase through input gaps up to 100 ms. Idle adds subtle breathing
and front-facing blinking; pause freezes both. Reduced motion disables them.
Coffee and door gestures play once with anticipation and recovery; work, talk,
guitar and study use individual playback rates.

ES: Al detenerse, ambos hosts usan poses de pie independientes de la caminata:
los laterales y la espalda proceden de `antonio-green-standing.webp`, con los
dos pies apoyados. El frontal conserva su pose y parpadeo anteriores. Movimiento
reducido también usa reposo, nunca un fotograma con una pierna levantada.

EN: When stopping, both hosts use standing poses separate from the walking
cycle: side and back views come from `antonio-green-standing.webp`, with both
feet planted. Front idle retains its existing pose and blink. Reduced motion
also uses idle, never a walking frame with a raised leg.

ES: La corrección de reposo pasó las cinco suites Godot y la compilación.
Se verificaron 12 casos de navegador; el caso móvil de 390 px se repitió sin
grabación tras un error de espacio al escribir el vídeo y pasó. Se revisaron
capturas del personaje detenido mirando a la izquierda en ambos hosts.

EN: The standing correction passed all five Godot suites and the build.
Twelve browser cases were verified; the 390 px mobile case passed when rerun
without recording after a disk-space error while writing its video. Screenshots
of the character stopped facing left were inspected in both hosts.

ES: Los prompts exactos y la procedencia están en
[ARCADE_CHARACTER_PROMPTS.md](ARCADE_CHARACTER_PROMPTS.md). Las imágenes se
generaron con imagegen integrado y se empaquetaron con pies y cabeza alineados,
muestreo vecino más próximo y WebP sin pérdidas.

EN: Exact prompts and provenance are in
[ARCADE_CHARACTER_PROMPTS.md](ARCADE_CHARACTER_PROMPTS.md). Images were created
with built-in imagegen and packed with aligned feet and heads, nearest-neighbor
sampling and lossless WebP.

## Tests / Pruebas

`npm run test:godot` includes `tests/character_actions.gd`.
`npx playwright test tests/e2e/character-activities.spec.ts` checks both hosts,
keyboard-accessible controls, challenge completion, cancellation, reduced
motion and Axe accessibility.

`npm run test:godot` incluye `tests/character_actions.gd`.
La prueba E2E verifica ambos hosts, controles accesibles por teclado,
finalización, cancelación, movimiento reducido y accesibilidad con Axe.

### 2026-10-07

ES: Verificados 153 tests unitarios, cinco suites Godot, 14 pruebas de navegador,
lint, typecheck, exportación web y build estático de 129 páginas. La cobertura
incluye teclado, touch, ambos hosts, pausa, movimiento reducido, reto de café,
ES/EN y HTML sin JavaScript. Vista ampliada de los sprites:
[antonio-green-preview.gif](previews/antonio-green-preview.gif).

EN: Verified 153 unit tests, five Godot suites, 14 browser tests, lint, typecheck,
web export and the 129-page static build. Coverage includes keyboard, touch,
both hosts, pause, reduced motion, coffee challenge, ES/EN and HTML without
JavaScript. Enlarged sprite preview:
[antonio-green-preview.gif](previews/antonio-green-preview.gif).

