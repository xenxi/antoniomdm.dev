# Puertas y colisiones del piso / Apartment doors and collisions

ES: Cada dormitorio tiene un único umbral. Cocina y salón se comunican por pasos abiertos amplios. La colisión corresponde al suelo y las paredes; se han eliminado los recortes opacos del fondo que ocultaban el cuerpo de los personajes. El controlador compartido espera la apertura antes de cruzar, mantiene la hoja abierta mientras se ocupa el umbral y la cierra después de despejarlo. Pausa congela la animación; movimiento reducido cambia la puerta de estado sin interpolación. El personaje hace el gesto de abrir. Los guardados del plano anterior se trasladan a la entrada conservando los objetivos completados.

EN: Each bedroom has one threshold. Kitchen and living room connect through wide open passages. Collisions follow floors and walls; opaque background crops that obscured characters have been removed. The shared controller waits for the door to open before crossing, keeps it open while someone occupies the threshold and closes it after the passage clears. Pause freezes animation; reduced motion changes the door state without interpolation. The character performs an opening gesture. Saves from the previous layout move to the entrance while preserving completed objectives.

ES: Pruebas: recorrido real de los cuatro dormitorios en Godot y navegador; todas las casillas transitables y objetivos conectados; ningún segmento de movimiento atraviesa muebles o muros; apertura intermedia, espera, pausa, permanencia en el umbral, cierre y movimiento reducido; paridad del plano nativo/web y navegación ES/EN.

EN: Tests: actual traversal of all four bedrooms in Godot and browser; every navigable tile and objective connected; no movement segment crosses furniture or walls; intermediate opening, waiting, pause, threshold occupancy, closing and reduced motion; native/web layout parity and ES/EN navigation.

## Archivos / Files

- `public/images/job-route/student-flat-doors.webp`: fondo corregido / corrected background.
- `godot/career/components/animation/apartment_doors.gd`: hojas animadas y control del paso / animated leaves and passage control.
- `src/arcade/student-flat.ts`: fuente del plano y cuatro puertas / layout and four-door source.
- `scripts/migrations/create-student-flat.mjs`: exportación puntual del plano; `FLAT_CAPTURE_URL` permite escoger el servidor local / one-time layout export; `FLAT_CAPTURE_URL` selects the local server.
- `docs/previews/student-flat-doors-es.png`, `student-flat-doors-en.png`: capturas de comprobación / verification captures.

## Procedencia del arte / Artwork provenance

ES: Edición con imagegen integrado el 2026-10-10, skill `C:/Users/Usuario/.codex/skills/.system/imagegen/SKILL.md`. Se conservó la distribución y el mobiliario. Originales: `exec-5be208ac-c831-4129-a808-3976ffe8e95b.png` (primera corrección) y `exec-0d6e9992-3e3a-470f-ab11-f437fe21c295.png` (seleccionado). Conversión a WebP con Sharp. Las puertas son geometría animada del motor, separada del fondo. Los originales anteriores se conservan.

EN: Edited with built-in imagegen on 2026-10-10, skill `C:/Users/Usuario/.codex/skills/.system/imagegen/SKILL.md`. Layout and furniture were preserved. Originals: `exec-5be208ac-c831-4129-a808-3976ffe8e95b.png` (first correction) and `exec-0d6e9992-3e3a-470f-ab11-f437fe21c295.png` (selected). Converted to WebP with Sharp. Doors use animated engine geometry, separate from the background. Previous originals are preserved.

### Prompt 1

Use case: precise-object-edit. Asset type: fixed game background plate, 1536x1024. Input image is the edit target. Preserve the exact apartment outer silhouette, camera, all four bedrooms, furniture, kitchen, living room, balcony, laundry, bathrooms, warm lighting and existing polished isometric game art. Correct ONLY the central hallway partitions and doorways for a playable game. Remove ALL wooden door leaves from the hallway (including the extra door panels between rooms). Each of the FOUR bedrooms must have exactly ONE empty open doorway into the hallway, placed near the FRONT of that bedroom: upper-left bedroom threshold at approximately (674,211), upper-right at (837,211), middle-left bicycle bedroom at (650,414), middle-right medicine bedroom at (862,414). These four openings must show uninterrupted walkable floor through them, with thin wooden jambs and NO wooden leaf: the moving door leaf will be rendered by the game. Remove the extra hallway doors near y=300 and y=450; replace them with clean continuous cutaway partition. Kitchen and living room should each have one wide CLEAR floor opening to the lower hallway at about y=670, no wooden panel, no extra doors. Lower the hallway-side cutaway walls to floor-height wherever necessary so a game character walking in the room is fully visible. Do not add windows, furniture, people, text, UI, icons, or extra doors. Retain the single outside entrance door at the bottom, bathroom entrance and balcony glazing. Keep all other pixels and room positions as close as possible to the target.

### Prompt 2

Use case: precise-object-edit. Edit the attached apartment game background. Preserve outer boundary and ALL furniture, lighting, room placements, camera and style exactly. Fix only doorway openings. The two MIDDLE bedroom doorways (bicycle room left, medicine room right) are too high: move their floor openings DOWN about 35 pixels, so their floor thresholds are at y=415..440, x=640 left and x=850 right. Keep exactly ONE empty opening per bedroom, no extra upper opening. Remove the lower hallway wall stubs at x=640..675,y=675..795 and x=830..875,y=675..795 and make uninterrupted wooden floor there, so kitchen and living room each have ONE WIDE open passage from y=622..780, not two separate openings. Retain the upper two bedroom openings and the single front entrance door. No additional doors, wooden door leaves, text, people or objects. This is a walkable cutaway game map: clear continuous floor across every passage.
