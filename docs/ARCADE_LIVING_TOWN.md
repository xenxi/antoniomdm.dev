# Ciudad viva / Living town

ES: Esta página documenta la primera entrega ambiental. El rediseño posterior del mapa está en [Paseo marítimo](ARCADE_WATERFRONT.md).

EN: This page documents the initial ambience update. The subsequent map redesign is documented in [Waterfront](ARCADE_WATERFRONT.md).

## Español

La ciudad conserva la ilustración isométrica nocturna, sus edificios, rutas y progreso. Esta entrega añade vida a esa base, inspirada en la referencia del usuario: doce peatones, cuatro apariencias, caminatas de seis fases, descansos breves, luces cálidas y cian sobre el pavimento, luciérnagas, hojas y agua animada.

`TownLife` calcula rutas cardinales sobre las colisiones reales de cada host. Los vecinos tienen velocidades distintas, ceden espacio al protagonista y nunca bloquean sus movimientos ni escriben en la partida. La simulación se comparte entre el host web actual y la ciudad nativa de Godot. Pausa y movimiento reducido congelan su reloj; el efecto del café ralentiza también el ambiente.

La luz del suelo queda por debajo de personajes y fachadas; las partículas tienen otra capa. Los orígenes de ordenación de la escena nativa se sitúan al pie de cada objeto, conservando las posiciones globales de dibujos, colisiones y entradas. La migración puntual `scripts/migrations/align-town-sort-origins.mjs` es idempotente y no se ejecuta durante el build.

Los vecinos son ambientales: todavía no tienen conversaciones o misiones. La distribución del mapa se conserva; no se han añadido los edificios ni el paseo marítimo de la imagen de referencia.

## English

The city keeps its nighttime isometric illustration, buildings, routes and saved progress. This update brings that setting to life, inspired by the user's reference: twelve pedestrians, four appearances, six-phase walks, brief stops, warm and cyan pavement light, fireflies, leaves and animated water.

`TownLife` routes citizens along cardinal paths using each host's actual collisions. Citizens walk at different speeds, give the protagonist room, never block movement and never write campaign state. Both the existing web host and native Godot city share the simulation. Pause and reduced motion freeze its clock; the coffee effect also slows the ambience.

Ground lighting sits below characters and facades; particles use a separate layer. Native scene sort origins sit at each object's footprint bottom, preserving global art, collision and entrance positions. The one-off migration `scripts/migrations/align-town-sort-origins.mjs` is idempotent and does not run during builds.

Citizens are ambient: they do not yet have conversations or quests. The map layout is retained; the reference image's buildings and waterfront have not been added.

## Arte y procedencia / Art and provenance

ES: Atlas generado con imagegen integrado el 2026-10-08 usando la referencia adjunta del usuario como guía de estilo. Original transparente de 1774×887; cada figura se recorta por alfa y se normaliza a 108 px de altura, con pies en y=118 dentro de celdas de 128 px. Atlas final: `godot/career/assets/characters/town-citizens.webp` (1024×512). Cuatro filas de personajes, reposo en columna 0 y caminata en columnas 1–6; reflejo horizontal al cambiar de sentido. El prompt utilizado se conserva abajo en su idioma original.

EN: Atlas generated with built-in imagegen on 2026-10-08, using the user's attached reference for style. Transparent 1774×887 original; each figure is alpha-cropped and normalized to 108 px tall, with feet at y=118 in 128 px cells. Final atlas: `godot/career/assets/characters/town-citizens.webp` (1024×512). Four character rows, idle in column 0 and walking in columns 1–6; horizontally flipped for the opposite direction. The exact prompt is preserved below in its original language.

> Use case: stylized-concept. Production game NPC pedestrian spritesheet, transparent background. Reference image is STYLE ONLY: warmly lit polished pixel-art chibi citizens for a lively isometric nighttime technology town. EXACT 8 columns x4 rows on landscape2:1 canvas,32 equal square cells. Each row one DIFFERENT adult citizen at identical scale in every cell: row1 woman with dark curly bob, amber jacket and dark trousers; row2 man with dark skin, short black hair, burgundy jacket and cream trousers; row3 woman with light skin and dark ponytail, teal coat and jeans; row4 older man with gray hair, glasses, blue overshirt and brown trousers. Full-body friendly stylized characters, all facing RIGHT three-quarter profile. Column1 neutral standing both feet planted arms relaxed. Columns2-7 six successive real walking cycle phases: left contact, recoil, passing feet near together, opposite right contact, recoil, passing. Column8 neutral standing small friendly head tilt, both feet planted. Genuine alternating feet and counter-swing arms, no same wide stride repeated. Dark crisp outlines, rich pixel clusters, match the reference people's detailed charming style. Character height70% ofcell, foot baseline85%, generous transparent margins on every side, no touching canvas edges. No text, logos, props, ground, cast shadows, backdrop, grid or speech bubbles. No main protagonist, no green hoodies. Four rows exactly,8characters per row.

## Comprobaciones / Checks

ES: Prueba Godot de rutas, continuidad, participación de todos los vecinos, pausa, movimiento reducido y ausencia de cambios en el progreso. Pruebas de navegador sobre píxeles reales para animación y congelación de cada host, más navegación y HTML estático bilingües. Capturas: `docs/previews/living-town.png` y `docs/previews/living-town-native.png`.

EN: Godot checks cover paths, continuous movement, every citizen participating, pause, reduced motion and unchanged saved progress. Browser tests inspect actual rendered pixels for animation and freezing in both hosts, alongside bilingual navigation and static HTML. Screenshots: `docs/previews/living-town.png` and `docs/previews/living-town-native.png`.

