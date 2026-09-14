# Mapa de empresas / Company map

## Español

La ilustración `public/images/job-route/company-district.webp` se editó con la herramienta integrada ImageGen a partir de `neon-district.webp`. Cada etapa tiene su propio edificio; freelance es una casa con tejado de tejas. Es una representación ficticia, no una reproducción de las sedes reales.

Los ocho logotipos son recursos separados. Sus fuentes y fecha de consulta se conservan en `public/images/job-route/brands/sources.json`; las marcas pertenecen a sus respectivos titulares. Se usan identidades disponibles en las fuentes, sin afirmar que todas correspondan al periodo de empleo. Freelance y System Recovery no reciben una marca empresarial inventada.

`company-art.ts` mantiene los puntos de anclaje medidos sobre la ilustración en coordenadas 480 × 320. Puertas, marcos y cierres comparten esos puntos, independientemente del marcador y del zoom. Los cierres permanecen quietos. La posición lógica, las colisiones, las rutas y los guardados se conservan.

Los efectos de pasos exteriores/interiores, pestillo, apertura y cierre se sintetizan localmente con Web Audio. Requieren activar el sonido del sistema; el botón «Pasos y puertas» permite silenciarlos por separado de la música. Solo los desplazamientos válidos producen pasos. Pausa, ocultación y salida detienen los efectos y la salida libera el contexto de audio.

Instrucción de imagen: conservar cámara, calles, árboles, fuentes, huellas y accesos; crear una casa con tejas en el primer edificio de la fila superior; diferenciar las ocho empresas con materiales, tejados y colores; dejar carteles sin letras para incorporar logotipos auténticos por código. Se especificaron los centros en píxeles para mantener el orden de la campaña. El prompt exacto se conserva en `company-map-image-prompt.txt`.

## English

The built-in ImageGen tool edited `public/images/job-route/company-district.webp` from `neon-district.webp`. Each chapter has its own building; freelance is a home with a tiled roof. This is a fictional representation, not a reproduction of the actual offices.

The eight logos are separate assets. Their sources and retrieval date are recorded in `public/images/job-route/brands/sources.json`; trademarks belong to their respective owners. Available source identities are used without claiming they all match the employment period. Freelance and System Recovery do not receive invented company brands.

`company-art.ts` stores anchors measured on the illustration in 480 × 320 coordinates. Doors, frames and shutters share these anchors independently of markers and zoom. Shutters remain stationary. Logical positions, collisions, routes and saves are preserved.

Outdoor/indoor footsteps, latch, opening and closing effects are synthesized locally with Web Audio. They require system sound; the “Footsteps and doors” button mutes them independently of music. Only valid moves produce footsteps. Pause, hiding and exit stop effects; exit releases the audio context.

Image brief: preserve the camera, streets, trees, fountains, footprints and entrances; put a tiled home at the first building in the upper row; distinguish the eight companies through materials, roofs and colors; keep signage blank for authentic logos composed in code. Pixel centers specified the campaign order. The exact prompt is saved in `company-map-image-prompt.txt`.
