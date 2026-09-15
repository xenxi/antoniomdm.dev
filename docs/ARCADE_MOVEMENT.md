# Movimiento y ambiente / Movement and ambience

## Español

Godot presenta los pasos confirmados por la web en una cola de tramos. Si llegan dos giros antes del siguiente fotograma, el personaje completa cada tramo sin interpolar a través de una esquina bloqueada. Las peticiones de movimiento siguen limitadas a casillas adyacentes transitables. Con movimiento reducido, la posición cambia directamente y conserva la orientación.

La última dirección pulsada tiene prioridad; al soltarla vuelve a tener prioridad la anterior si sigue pulsada. Soltar todas las teclas, pausar o perder el foco limpia la entrada pendiente. Los controles táctiles identifican el dedo activo: soltar un dedo anterior no cancela el nuevo. El botón mantenido cambia de aspecto.

El suelo señala el destino seleccionado y las colisiones tienen una marca breve con un pequeño retroceso visual. Los clics sobre objetos superpuestos priorizan su profundidad, salvo que se pulse un marcador explícito. Los recorridos buscan una casilla libre junto al objeto y esperan a que termine el desplazamiento antes de interactuar.

Los personajes secundarios respiran y se balancean alrededor de los pies, con amplitud limitada a su casilla. La sombra permanece en el suelo. Los interiores añaden actividad en pantallas, luces de servidores y teléfonos, alfombras y señalización de salida. Las notas del músico y las ondas de la fuga desaparecen al resolver sus incidencias. Pausa y movimiento reducido detienen las animaciones. Las transiciones esperan a que el siguiente escenario tenga sus imágenes listas; resolver una misión no provoca un fundido de todo el escenario.

Verificación: `npm run test:godot` ejecuta regresiones contra el motor real mediante `tests/godot-motion.gd`. Requiere `GODOT_BIN`, igual que `build:godot`, y se ejecuta en CI. Comprueba giros alrededor de obstáculos, tramos adyacentes, prioridades de teclas, colisiones, rutas, clics superpuestos, pausa y pérdida de foco. `tests/e2e/movement-polish.spec.ts` comprueba el motor web, animación/reducción de movimiento y dos contactos táctiles simultáneos con Chromium. No sustituye pruebas en dispositivos móviles físicos.

## English

Godot presents web-acknowledged steps as a queue of segments. When two turns arrive before the next frame, the character completes each segment instead of interpolating through a blocked corner. Movement requests remain limited to adjacent walkable tiles. Reduced motion changes position immediately while retaining facing.

The most recently pressed direction takes priority; releasing it restores the preceding direction if still held. Releasing every key, pausing or losing focus clears pending input. Touch controls identify the active finger: releasing an older finger does not cancel the newer one. The held button changes appearance.

The floor marks the selected destination; collisions have a brief marker and slight visual recoil. Clicks on overlapping objects prioritize visual depth unless an explicit marker is clicked. Routes seek a free tile beside the object and wait for movement to finish before interacting.

NPCs breathe and sway around planted feet, with motion limited to their tile. Shadows stay on the floor. Interiors add screen activity, server and phone lights, rugs and exit markings. The musician's notes and leak ripples disappear when their incidents are resolved. Pause and reduced motion stop animations. Transitions wait for the next scene's images to load; completing a mission does not fade the whole scene.

Validation: `npm run test:godot` runs regressions against the actual engine through `tests/godot-motion.gd`. It requires `GODOT_BIN`, like `build:godot`, and runs in CI. It covers turns around obstacles, adjacent segments, key priority, collisions, routes, overlapping clicks, pause and focus loss. `tests/e2e/movement-polish.spec.ts` checks the web engine, animation/reduced motion and simultaneous touch contacts in Chromium. This does not replace testing on physical mobile devices.
