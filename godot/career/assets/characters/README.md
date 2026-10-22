# Antonio — sprites / Sprites de Antonio

ES: Los atlas activos son `antonio-green-{walk,actions,breaks}.webp`: 2048 × 1024, ocho fotogramas por fila, celdas de 256 px. Caminar tiene cuatro direcciones (abajo, derecha, arriba, izquierda). Acciones: puerta, portátil, hablar y guitarra. Descansos: libro, gafas, café y concentración. Pies en y=236 y cabeza centrada para evitar desplazamientos al mover objetos. Pausa conserva la fase; movimiento reducido usa una pose fija.

EN: Active atlases are `antonio-green-{walk,actions,breaks}.webp`: 2048 × 1024, eight frames per row, 256 px cells. Walking has four directions (down, right, up, left). Actions: door, laptop, talk and guitar. Breaks: book, glasses, coffee and focus. Feet sit at y=236 and heads are centered to prevent props from shifting the body. Pause preserves phase; reduced motion holds a still pose.

ES: Copia web en `public/images/job-route/antonio-green-walk.webp`. Prompts y empaquetado: `docs/ARCADE_CHARACTER_PROMPTS.md`. Las fuentes azules siguientes son históricas, no las sobrescribe el empaquetador.

EN: Web copy at `public/images/job-route/antonio-green-walk.webp`. Prompts and packing: `docs/ARCADE_CHARACTER_PROMPTS.md`. The following blue sources are historical and are not overwritten by the packer.

## Histórico / Historical

ES: `antonio-walk.webp` contiene 16 poses con transparencia, en una cuadrícula
de 4 × 4 celdas de 256 px. Filas: abajo, derecha, arriba e izquierda. La primera
columna es reposo; las siguientes forman la caminata. El modo nativo usa
SpriteFrames y el renderer anterior selecciona celdas completas, sin separar
las piernas. Pausa y movimiento reducido restablecen la pose de reposo.
La copia web está en `public/images/job-route/antonio-walk.webp`.

EN: `antonio-walk.webp` contains 16 transparent poses in a 4 × 4 grid of 256 px
cells. Rows: down, right, up, left. The first column is idle; subsequent columns
form the walk. Native mode uses SpriteFrames; the previous renderer selects
whole cells without splitting the legs. Pause and reduced motion reset to idle.
The web copy is at `public/images/job-route/antonio-walk.webp`.

ES: Generado con la herramienta integrada imagegen usando la referencia del
usuario. Normalizado a 1024 × 1024 con muestreo vecino más próximo y WebP sin
pérdidas. El generador histórico de escenas no debe sobrescribir Player.
EN: Generated with the built-in imagegen tool using the user's reference.
Normalized to 1024 × 1024 with nearest-neighbor sampling and lossless WebP.
The historical scene generator must not overwrite Player.

## Generation prompt / Prompt de generación

Create a production pixel-art walking sprite sheet for the playable character in an isometric portfolio game, closely matching the attached reference's identity and style: young adult man, swept textured chestnut hair, turquoise rectangular glasses, short brown beard, bright blue knit sweater, dark navy trousers and dark shoes. Reference image is appearance/style only, do not include laptop or background. Transparent background. EXACT regular grid: 4 columns by 4 rows, 1024x1024 canvas, each cell 256x256. Full body character centered horizontally in every cell, consistent scale, feet baseline at cell y=236, head around y=24. Rows in order: front facing down, right facing right, back facing up, left facing left. Columns: neutral standing feet together; walking left foot forward right arm forward; passing pose; walking right foot forward left arm forward. Clear alternating leg/arm poses, coherent silhouette, identical facial identity and clothing. Crisp deliberate pixel clusters and dark outlines, detailed hair and glasses matching reference, no blur, no ground shadow, no text, no labels, no grid lines, no extra objects. All 16 cells present, uniform framing and baseline, no cropping.

ES: Crear una hoja de caminata pixel art para el protagonista de un portfolio
isométrico, siguiendo la identidad y estilo de la referencia: adulto joven,
pelo castaño peinado de lado, gafas rectangulares turquesa, barba corta castaña,
jersey azul vivo, pantalón azul marino y zapatos oscuros. Sin portátil ni fondo.
Transparencia y cuadrícula regular de 4 columnas por 4 filas, lienzo de 1024 px,
celdas de 256 px. Cuerpo entero centrado, escala uniforme, pies en y=236 y cabeza
en torno a y=24 de cada celda. Filas: frente, derecha, espalda e izquierda.
Columnas: reposo, pie izquierdo y brazo derecho adelantados, paso intermedio,
pie derecho y brazo izquierdo adelantados. Alternancia clara, identidad y ropa
consistentes, píxeles definidos, contornos oscuros y detalle de pelo y gafas.
Sin desenfoque, sombra de suelo, texto, etiquetas, líneas de cuadrícula, objetos
adicionales ni recortes. Conservar las 16 celdas y la alineación de los pies.
