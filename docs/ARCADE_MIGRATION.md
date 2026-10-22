# Arcade architecture migration / Migración de arquitectura Arcade

## Estado / Status

**ES:** Trabajo en curso. La escena principal nativa es `godot/career/main.tscn`.
La web publicada conserva temporalmente la campaña anterior mediante el adaptador
de `main.gd`. `?runtime=native` en la exportación activa el nuevo slice. Esto no es
la migración terminada: todavía hay autoridad de campaña y movimiento en Preact
en la ruta publicada. No retirar el adaptador hasta migrar y verificar esa campaña.

**EN:** Work in progress. The native main scene is `godot/career/main.tscn`.
The published website temporarily retains the previous campaign through the
`main.gd` adapter. `?runtime=native` on the export enables the new slice. This is
not the completed migration: the published route still has campaign and movement
authority in Preact. Remove the adapter only after migrating and verifying it.

## Existing flow / Flujo existente

**ES:** Astro publica las rutas estáticas ES/EN. Desktop carga Arcade bajo demanda;
`CareerGame.tsx` selecciona y carga el host bajo demanda. `ExistingCareerGame.tsx`
controla todavía la campaña publicada, misiones rápidas, eventos, temporizadores,
energía, desbloqueos, diálogos, audio y guardado v1. Los mapas se construyen en
`town.ts`, `pixel-map.ts` y `company-scenes.ts`. `godot-art.ts` rasteriza las capas;
`GodotWorld.tsx` envía PNG, geometría y posición a `shell.html`. `world.gd` calcula
rutas, solicita pasos y espera confirmaciones de Preact; `atmosphere.gd` dibuja
efectos. Los tests cubren también Snake, consecuencias de fallos, reparaciones,
partidas antiguas, misiones rápidas aisladas, requisitos de contratación, audio,
movimiento reducido y controles HTML equivalentes. Deben conservarse al sustituir
la autoridad. `legacy/` contiene Flutter histórico y no interviene.

**EN:** Astro publishes static ES/EN routes. Desktop lazily loads Arcade;
`CareerGame.tsx` selects and lazily loads the host. `ExistingCareerGame.tsx`
still controls the published campaign, isolated quick missions, events, timers,
energy, unlocks, dialogues, audio and v1 saves. Maps are assembled in `town.ts`,
`pixel-map.ts` and `company-scenes.ts`. `godot-art.ts` rasterizes layers;
`GodotWorld.tsx` sends PNGs, geometry and positions to `shell.html`. `world.gd`
finds routes, requests steps and waits for Preact acknowledgements;
`atmosphere.gd` renders effects. Tests also cover Snake, failure consequences,
repairs, old saves, isolated quick missions, hiring requirements, audio, reduced
motion and equivalent HTML controls. These must survive the authority migration.
`legacy/` is historical Flutter and is not involved.

## Native slice / Slice nativo

| Element | ES | EN |
| --- | --- | --- |
| `main.tscn` | Bootstrap, contenedor de mundo y UI | Bootstrap, world container and UI |
| `autoload/game_state.gd` | Estado serializable, idioma y actividad | Serializable state, language and activity |
| `autoload/scene_manager.gd` | Registro cerrado, carga bajo demanda y liberación del mundo anterior | Closed registry, on-demand loading and previous-world disposal |
| `autoload/event_bus.gd` | Señales del juego | Gameplay signals |
| `autoload/save_manager.gd` | Guardado v2 validado, archivo temporal y errores visibles | Validated v2 saves, temporary file and visible errors |
| `autoload/web_bridge.gd` | Ciclo de vida, idioma, configuración e intenciones del portfolio | Lifecycle, language, configuration and portfolio intentions |
| `actors/player` | Movimiento local, teclado y rutas | Local movement, keyboard and routes |
| `actors/npc` | Actor configurable por Resource | Resource-configured actor |
| `components` | Proyección, presentación, interacción y datos de diálogo | Projection, presentation, interaction and dialogue data |
| `systems` | Navegación, diálogo, quest y estados de comportamiento | Navigation, dialogue, quest and behaviour states |
| `worlds` | Escenas y polígonos editables | Editable scenes and polygons |
| `data` | Recursos bilingües de NPC, diálogo y quest | Bilingual NPC, dialogue and quest resources |

**ES:** `systems/quest/campaign_rules.gd` contiene las reglas portadas de la
campaña existente: respuestas, secuencias, energía, temporizadores, misiones
opcionales, eventos personales, requisitos y replay. `game_session.gd` coordina
estas reglas en el slice; `snake_rules.gd` separa el minijuego. La campaña y las
partidas rápidas tienen estados distintos. La persistencia nativa usa `user://`;
la exportación Web usa almacenamiento síncrono mediante un adaptador de
`localStorage` en el shell, bajo `antonios:career:v2`. Preact no recibe posiciones
en este protocolo ni confirma movimientos. `inspect` solo existe con
`e2eDebug=1`; es una consulta puntual de tests, no sincronización de juego.

**EN:** `systems/quest/campaign_rules.gd` ports the existing campaign rules:
answers, sequences, energy, timers, side quests, personal events, requirements
and replay. `game_session.gd` coordinates these rules in the slice;
`snake_rules.gd` separates the minigame. Campaign and quick runs use separate
states. Native persistence uses `user://`; Web uses synchronous storage through
a shell `localStorage` adapter under `antonios:career:v2`. Preact receives no
positions in this protocol and never acknowledges movement. `inspect` is
available only with `e2eDebug=1`; it is an on-demand test query, not game sync.

**ES:** Las colisiones se obtienen de `CollisionPolygon2D` bajo `StaticBody2D`.
Los polígonos de `HitArea` solo seleccionan interactuables. La navegación usa
AStarGrid2D sin diagonales; no necesita NavigationAgent2D. Mover un objeto con sus
hijos mueve también su colisión y punto de aproximación. Los sprites son nodos
reales, visibles sin ejecutar scripts de Astro. El arte capturado se conserva;
el suelo descubierto al mover un recorte de ciudad necesita autoría artística.

**EN:** Collision comes from `CollisionPolygon2D` children of `StaticBody2D`.
`HitArea` polygons only select interactables. Navigation uses non-diagonal
AStarGrid2D; NavigationAgent2D is unnecessary. Moving an object and its children
also moves its collision and approach point. Sprites are real nodes, visible
without Astro scripts. Captured artwork is preserved; ground revealed when moving
a city cutout needs artistic authoring.

## Authoring / Autoría

1. **ES:** Abre `godot/career/project.godot` con Godot 4.7.2. Abre
   `worlds/city/city.tscn` o `worlds/freelance/freelance.tscn` y usa F6.
   F5 ejecuta `main.tscn`. No hace falta Astro.
   **EN:** Open `godot/career/project.godot` in Godot 4.7.2. Open either world
   and press F6. F5 runs `main.tscn`. Astro is unnecessary.
2. **ES:** Para un mapa, duplica una escena, asigna un `WorldGrid` único, edita
   los ejes y dimensiones, sprites, polígonos y `Spawns/Entry`; registra su ruta
   en `SceneManager.WORLDS`. No precargues todas las escenas.
   **EN:** Duplicate a world, assign a unique `WorldGrid`, edit its axes,
   dimensions, sprites, polygons and `Spawns/Entry`, then register its path in
   `SceneManager.WORLDS`. Do not preload every scene.
3. **ES:** Instancia `actors/npc/npc.tscn`. Crea un `NpcData` con identificador,
   nombres ES/EN, SpriteFrames, diálogo y quests. Ajusta su posición y polígonos.
   **EN:** Instance `actors/npc/npc.tscn`. Create an `NpcData` with its ID,
   ES/EN names, SpriteFrames, dialogue and quests. Adjust position and polygons.
4. **ES:** Crea un `ArcadeDialogue` con líneas bilingües, speaker y hooks. La
   muestra `data/dialogues/flatmate.tres` usa texto de la escena anterior.
   **EN:** Create an `ArcadeDialogue` with bilingual lines, speaker and hooks.
   `data/dialogues/flatmate.tres` reuses text from the previous scene.
5. **ES:** Crea un `ArcadeQuest`, define objetivos, requisitos y siguiente quest;
   regístralo en QuestSystem. Los hooks de diálogo registran objetivos.
   **EN:** Create an `ArcadeQuest`, define objectives, prerequisites and next
   quest; register it with QuestSystem. Dialogue hooks record objectives.
6. **ES:** Añade un Node2D con `interactable.gd`, `HitArea/CollisionPolygon2D`
   y, opcionalmente, `Approach`. Configura diálogo, mapa o intención de portfolio.
   **EN:** Add a Node2D with `interactable.gd`, `HitArea/CollisionPolygon2D`
   and optionally `Approach`. Configure a dialogue, world or portfolio intention.
7. **ES:** Una intención de portfolio emite tipo e ID, nunca una URL arbitraria.
   En standalone la UI explica la acción y permite continuar. `NativeArcade.tsx`
   valida el ID contra el modelo público antes de abrir el contenido. Las rutas
   con ancla cargan la página localizada para abrir el detalle correspondiente.
   **EN:** A portfolio intention emits a kind and ID, never an arbitrary URL.
   Standalone UI explains the action and allows continuing. `NativeArcade.tsx`
   validates IDs against the public model before opening content. Anchored routes
   load the localized page to open the corresponding detail.

**ES:** Para probar el host nuevo, exporta y construye, abre
`/arcade/?nativeArcade=1` y entra en Arcade. Su equivalente inglés es
`/en/arcade/?nativeArcade=1`. El cambio de idioma conserva este selector y el
guardado; `?career=continue&nativeArcade=1` reanuda la partida. El host solo envía
comandos de ciclo de vida, configuración, intenciones de interacción y decisiones
de diálogo; presenta las respuestas del juego como controles HTML accesibles.

**EN:** To test the new host, export and build, open
`/arcade/?nativeArcade=1` and enter Arcade. Its English counterpart is
`/en/arcade/?nativeArcade=1`. Language switching retains this selector and save;
`?career=continue&nativeArcade=1` resumes the game. The host sends only lifecycle,
configuration, interaction intentions and dialogue decisions; it presents game
responses as accessible HTML controls.

## Outstanding migration / Migración pendiente

**ES:** No promover todavía el slice a la ruta habitual. Falta integrar las
escenas de las demás etapas con las reglas portadas y completar la paridad de
selección de capítulos, misiones rápidas en esas etapas, HUD/minimapa,
cámara, audio y atmósfera, y adaptar sus pruebas de integración. Después deben
eliminarse el adaptador de `main.gd`, `ExistingCareerGame.tsx`, el
puente de posiciones, `world.gd` y los generadores runtime de mapas que ya no se
usen. Las pruebas de compatibilidad actuales conservan valor hasta ese corte.

**EN:** Do not promote the slice to the regular route yet. Remaining work:
integrate other chapter scenes with the ported rules, complete chapter selection,
quick runs in those chapters, HUD/minimap, camera, audio and atmosphere
parity, and adapt their integration tests. Then remove the `main.gd` adapter,
`ExistingCareerGame.tsx`, position bridge, `world.gd` and unused runtime
map generators. Current compatibility tests remain useful until that cutover.

## Sessions, saves and presentation / Sesiones, guardados y presentación

**ES (2026-10-03):** La entrada de Arcade carga solo el host seleccionado. El
host nativo ya no importa `GodotWorld` ni sus generadores de mapas; los textos
compartidos están en `world-copy.ts`. `SessionPresentation` construye el mismo
menú, opciones, feedback y tablero de Snake para la UI nativa y los controles
HTML. El evento `session` contiene solo una proyección de presentación, sin el
diccionario completo de campaña, quests ni posiciones del jugador.

**EN (2026-10-03):** Arcade loads only the selected host. The native host no
longer imports `GodotWorld` or its map generators; shared text lives in
`world-copy.ts`. `SessionPresentation` builds the same menu, choices, feedback
and Snake board for native UI and HTML controls. The `session` event contains
only a presentation projection, without the campaign dictionary, quests or
player coordinates.

**ES:** «Partida y misiones» abre el menú generado por Godot. Las prácticas se
ofrecen únicamente para etapas con escena nativa, actualmente Freelance. Godot
conserva la exploración de campaña en `campaign_exploration` y crea otra para
la misión rápida: posiciones, NPC y quests no se mezclan. Ambas sesiones se
guardan en v2; al terminar o volver al hub, se restaura la campaña suspendida.
Los guardados v2 tempranos sin ese contexto retornan al hub con los datos de
exploración que sí conservan. No se puede reconstruir un estado anterior que
esos guardados nunca almacenaron.

**EN:** “Game and missions” opens the Godot-authored menu. Practice is offered
only for chapters with a native scene, currently Freelance. Godot suspends
campaign exploration in `campaign_exploration` and creates a separate one for
the quick mission: positions, NPCs and quests never mix. Both sessions are
saved in v2; ending practice or returning to the hub restores the suspended
campaign. Early v2 saves without that context return to the hub with their
available exploration data. They cannot recover an earlier state that was
never stored.

**ES:** Si no existe v2, `LegacySaveMigration` valida y convierte v1 en Godot,
conservando progreso, decisiones, eventos, energía y accesos de los layouts
antiguos. Nunca borra ni modifica la clave v1. Una etapa sin escena nativa se
reanuda desde el hub conservando su progreso. Las coordenadas antiguas se
validan como datos; cada escena comprueba la colisión y usa su spawn si hace
falta. V2 tiene prioridad. Si no puede leerse, no se sustituye por v1 ni por una
partida vacía: se bloquea la escritura hasta confirmar una nueva campaña.

**EN:** When v2 is absent, `LegacySaveMigration` validates and converts v1 in
Godot, preserving progression, choices, events, energy and access earned in old
layouts. The v1 key is never modified or deleted. A chapter without a native
scene resumes at the hub with its progression retained. Old coordinates are
validated as data; each scene checks collisions and falls back to its spawn
when needed. V2 takes precedence. If unreadable, it is never replaced by v1 or
a fresh game: writes remain blocked until a new campaign is confirmed.

**ES:** `tests/save_sessions.gd` prueba importación, datos corruptos, prioridad,
aislamiento y vuelta tras guardar. `native-sessions.spec.ts` comprueba el flujo
en WASM real y que el host nativo no descargue `ExistingCareerGame`. El test de
renderizado profesional conserva sus aserciones usando SSR asíncrono, requerido
por la carga diferida. El selector temporal sigue existiendo; este incremento
no declara terminada la migración global.

**EN:** `tests/save_sessions.gd` checks import, corruption, precedence,
isolation and return after saving. `native-sessions.spec.ts` checks real WASM
and that the native host does not download `ExistingCareerGame`. The professional
rendering test retains its assertions using async SSR, required by lazy loading.
The temporary selector remains; this increment does not complete the overall
migration.

## Verification / Verificación

```powershell
npm run test:godot
npm test
npm run lint
npm run typecheck
npm run build:godot
npm run build
npx playwright test tests/e2e/native-arcade.spec.ts
```

**ES:** `test:godot` conserva la suite anterior y añade `tests/architecture.gd`:
movimiento sin ACK, colisiones nativas, pausa, liberación de mundos, retorno al
hub, NPC, diálogo, quest y validación de guardados. El runner también detecta
errores GDScript cuando Godot devuelve código cero. Los scripts de
`scripts/migrations/` son conversiones puntuales; NO se ejecutan en build y NO
deben sobrescribir escenas después de editarlas en Godot. El workaround de CI
existente permanece intacto. Las pruebas nativas usan un archivo de guardado
separado y lo eliminan al acabar.

**EN:** `test:godot` preserves the previous suite and adds `tests/architecture.gd`:
ACK-free movement, native collisions, pause, world disposal, hub return, NPC,
dialogue, quest and save validation. The runner also detects GDScript errors when
Godot returns zero. `scripts/migrations/` contains one-time conversions; they do
NOT run during builds and must NOT overwrite scenes after editor authoring. The
existing CI workaround is unchanged. Native tests use and clean up a separate save.

### Local results / Resultados locales (2026-09-22)

**ES:** 153 tests unitarios, tres suites Godot y 60 pruebas E2E aplicables pasan.
Tras los últimos cambios de guardado se repitieron las cinco pruebas nativas:
todas pasan, incluida la salida al escritorio con persistencia confirmada.
Lint, typecheck, exportación Godot 4.7.2 y build Astro de 129 páginas pasan.
Se verificaron ES/EN, HTML estático, navegación y accesibilidad del diálogo con
Axe; touch se probó mediante emulación de navegador a 390 y 820 px, no en iOS
físico. Se corrigió además la pérdida de pasos de ruta durante un ACK tardío en
el adaptador anterior, con una prueba de regresión. Estos resultados verifican
el incremento y la compatibilidad; no completan la migración pendiente.

**EN:** 153 unit tests, three Godot suites and 60 applicable E2E tests pass.
After the final save changes, all five native tests passed again, including
desktop exit with confirmed persistence. Lint, typecheck, Godot 4.7.2 export and
the 129-page Astro build pass. ES/EN, static HTML, navigation and dialogue
accessibility with Axe were checked; touch used browser emulation at 390 and
820 px, not physical iOS hardware. Lost route steps during a delayed ACK in the
previous adapter were also fixed with a regression test. These results verify
this increment and compatibility; they do not complete the outstanding migration.

### Session refactor results / Resultados de sesiones (2026-10-03)

**ES:** Pasan 153 tests unitarios, las cinco suites Godot, lint, typecheck,
la exportación Godot y el build de 129 páginas. La ronda amplia de navegador
terminó con 61 de 64 casos correctos y tres fallos de proceso, red o espera.
Con el build terminado se repitieron los casos afectados junto con los flujos
nativos: 13 de 13 correctos, sin cambiar ni relajar sus aserciones. La cobertura
incluye campaña completa, ES/EN, HTML estático, navegación, misiones rápidas,
audio, importación v1, protección de datos corruptos y retorno tras recargar.
El movimiento táctil nativo verifica ahora el desplazamiento efectivo del
personaje, además del envío del comando.

**EN:** All 153 unit tests, five Godot suites, lint, typecheck, Godot export
and the 129-page build pass. The broad browser run finished with 61 of 64 cases
passing and three process, network or timeout failures. After the build
finished, affected cases were rerun alongside native flows: all 13 passed,
without changing or relaxing assertions. Coverage includes the full campaign,
ES/EN, static HTML, navigation, quick missions, audio, v1 import, corrupt-save
protection and returning after reload. Native touch movement now checks actual
character displacement as well as command delivery.
