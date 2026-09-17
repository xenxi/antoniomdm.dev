# Proyectos: contenido y recursos / Projects: content and assets

Revisión / Review: 2026-09-15.

## Fuentes / Sources

Las fichas conservan el stack, el estado y los límites de las fichas de `xenxi/knowledge-vault`, en `career/projects/`, y del modelo existente. Las descripciones cuentan qué se construyó y qué problema apareció; no añaden resultados ni métricas. Las URLs de Devagon Alley y Platform934 fueron facilitadas expresamente por el usuario. La visibilidad pública de los cuatro repositorios enlazados se comprobó con GitHub.

The entries retain the stack, status and boundaries recorded in `xenxi/knowledge-vault`, under `career/projects/`, and the existing model. Descriptions explain what was built and the problem encountered; they add no results or metrics. The user explicitly supplied the Devagon Alley and Platform934 URLs. GitHub confirmed public visibility for the four linked repositories.

## Inventario / Inventory

| Proyecto / Project | Recursos / Assets | Enlaces externos / External links |
| --- | --- | --- |
| Platform934 | Logo y captura aportados / Supplied logo and screenshot | Web aportada / Supplied website |
| Platform934 API | Logo aportado; 61 operaciones del contrato OpenAPI / Supplied logo; 61 OpenAPI contract operations | Ninguno / None |
| Stream Optimizer | Logo aportado / Supplied logo | Ninguno / None |
| Devagon Alley | Logo y captura aportados / Supplied logo and screenshot | Web aportada, con autenticación / Supplied website, with authentication |
| Luna Tartas | Logo aportado; capturas de portada y catálogo públicos / Supplied logo; screenshots of the public home and catalogue | Web y repositorio público / Website and public repository |
| Koso | Logo aportado; captura del build local existente / Supplied logo; screenshot of the existing local build | Preview temporal que requiere acceso; repositorio público / Temporary preview requiring sign-in; public repository |
| Luna Studio | Logo y captura de catálogo aportados / Supplied logo and catalogue screenshot | Ninguno / None |
| AntoñiOS | Logo aportado y captura del escritorio local / Supplied logo and local desktop screenshot | Web y repositorio público / Website and public repository |
| bio-cli | Logo aportado / Supplied logo | Repositorio público / Public repository |

Las siete imágenes recibidas se identificaron por su contenido: 1/2 Devagon Alley, 3/4 Platform934, 5 API, 6 Luna, 7 Koso. No llegaron imágenes 8/9. Los recursos WebP conservan el contenido de las imágenes; no se han generado interfaces. Los textos alternativos y pies están traducidos; las capturas conservan el idioma original de cada aplicación.

The seven received images were identified by their contents: 1/2 Devagon Alley, 3/4 Platform934, 5 API, 6 Luna, 7 Koso. Images 8/9 were not received. WebP assets preserve the image contents; no interfaces were generated. Alternative text and captions are translated; screenshots retain each application's original language.

En la segunda entrega se incorporaron el logo y la captura de Luna Studio, los nuevos logos de Koso y Platform934, y los logos de Stream Optimizer, AntoñiOS y bio-cli. Las imágenes 6 y 7 corresponden al mismo logo de AntoñiOS; la 8 es bio-cli. Los nueve logos de la lista usan un marco de 96 × 96 píxeles y conservan sus proporciones.

The second batch added the Luna Studio logo and screenshot, new Koso and Platform934 logos, and the Stream Optimizer, AntoñiOS and bio-cli logos. Images 6 and 7 depict the same AntoñiOS logo; image 8 is bio-cli. All nine list logos use a 96 × 96 pixel frame and retain their aspect ratios.

## Contrato de publicación de la API / API publishing contract

`src/data/platform934-endpoints.ts` contiene exclusivamente método HTTP, ruta relativa, grupo y descripción ES/EN. Los tres adjuntos OpenAPI eran idénticos. Se han cubierto sus 61 operaciones en 14 grupos. En las operaciones sin descripción original, el texto se limita a lo que indican método, ruta y esquema de solicitud. No se publica el documento bruto, servidores, URLs base, ejemplos ni configuración de ejecución. La presencia de una operación en el contrato no implica que se haya probado en el servicio desplegado.

`src/data/platform934-endpoints.ts` contains only HTTP method, relative path, group and ES/EN description. The three OpenAPI attachments were identical. All 61 operations are covered in 14 groups. For operations without an original description, the text is limited to what the method, path and request schema indicate. The raw document, servers, base URLs, examples and runtime configuration are not published. An operation's presence in the contract does not imply it was tested against the deployed service.

## Mantenimiento / Maintenance

Los logos son independientes de `images`. Una ficha admite cero, una o varias capturas; sin imágenes no se renderiza la galería. Las capturas se abren a tamaño completo en otra pestaña. Los enlaces de detalle sirven para navegar dentro de AntoñiOS; las acciones externas se generan únicamente para web y repositorios públicos verificados.

Logos are independent from `images`. An entry supports zero, one or multiple screenshots; no gallery is rendered without images. Screenshots open at full size in another tab. Detail links navigate within AntoñiOS; external actions are generated only for websites and verified public repositories.
