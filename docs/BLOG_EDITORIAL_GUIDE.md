# Out of Scope / Out of Context · Guía editorial v2.2 (propuesta) / Editorial guide (draft)

**Estado / Status:** v2.1 aprobada el 23 de octubre de 2026; ajustes de voz v2.2 propuestos el 25 de octubre, pendientes de revisión y aprobación. / v2.1 approved on October 23, 2026; v2.2 voice refinements proposed on October 25, pending review and approval.

Esta guía es la **fuente de verdad editorial** del blog para los **artículos nuevos creados a partir de la aprobación de v2.1**. No es retroactiva: los artículos ya publicados conservan íntegros texto, extensión, portadas, categorías, metadatos, conclusiones y aprendizajes. Sólo caben correcciones puntuales y justificadas de errores factuales, enlaces o problemas técnicos; nunca reescrituras o rediseños encubiertos. La arquitectura, rutas y publicación se explican en [`OUT_OF_SCOPE.md`](OUT_OF_SCOPE.md).

This is the blog's **editorial source of truth** for **new articles written after v2.1 approval**. It is not retroactive: existing published articles keep their copy, length, covers, categories, metadata, conclusions and lessons unchanged. Only narrowly scoped corrections of factual errors, broken links or technical problems are allowed—not covert editorial rewrites or redesigns. Architecture, routes and publishing remain documented in [`OUT_OF_SCOPE.md`](OUT_OF_SCOPE.md).

**Nombre / Naming:** «Out of Scope» es el nombre editorial usado en estas decisiones; el repositorio y partes de la interfaz todavía muestran «Out of Context». Aprobar esta guía **no autoriza un cambio de marca o de rutas**. / “Out of Scope” is the editorial name used for these decisions; the repository and parts of the UI still say “Out of Context”. Approving this guide **does not authorize a brand or URL migration**.

## Referencias prácticas / Practical references

Esta guía es normativa; los artículos existentes son referencias de cualidades, **no plantillas que haya que reproducir ni piezas que deban actualizarse**. [`La pregunta se queda`](../src/content/out-of-scope/es/la-pregunta-se-queda/index.mdx) conserva su condición de *golden sample* de autenticidad y reflexión. [`El PR estaba en verde`](../src/content/out-of-scope/es/el-pr-estaba-en-verde/index.mdx) es referencia de ritmo, ironía y claridad. [`Claudio tiene derecho a colgarte`](../src/content/out-of-scope/es/claudio-tiene-derecho-a-colgarte/index.mdx) inspira humor con rigor e incertidumbre, y [`Me han quitado el teclado`](../src/content/out-of-scope/es/me-han-quitado-el-teclado/index.mdx) perspectiva profesional y ambición conceptual; **sus extensiones actuales no son objetivos de la v2.1**.

This guide is normative; existing articles are references for specific qualities, **not templates to imitate or posts to update**. [`The question remains`](../src/content/out-of-scope/en/the-question-remains/index.mdx) remains the authenticity-and-reflection *golden sample*. [`The PR was green`](../src/content/out-of-scope/en/the-pr-was-green/index.mdx) models pace, irony and clarity. [`Claudio has the right to hang up`](../src/content/out-of-scope/en/claudio-has-the-right-to-hang-up/index.mdx) models humour with scientific care; [`They took my keyboard`](../src/content/out-of-scope/en/they-took-my-keyboard/index.mdx) models professional perspective and conceptual ambition. **Their current lengths are not v2.1 targets**.

## Español

### Identidad y promesa al lector

Out of Scope es una columna personal de ingeniería, tecnología y decisiones que parecían estupendas hasta que alguien hizo una pregunta incómoda. No es un agregador de noticias, academia, catálogo de tutoriales ni máquina de rellenar buscadores. El portfolio responde «qué he construido»; el blog muestra **cómo pienso, qué cuestiono, cuándo me equivoco y qué aprendo**. Más de quince años de oficio deben notarse en el criterio, no porque repita mi biografía.

**Promesa:** una historia con personalidad en tres minutos, que deje (1) una sonrisa, (2) una reflexión o tensión interesante y (3) un aprendizaje real. No todos los textos tienen que hacer reír constantemente, pero ninguno se publica sólo para mantener actividad.

**Regla de selección:** antes de escribir, completar «Esto me interesa porque revela ____, y merece la pena entenderlo porque ____». Una noticia sólo se convierte en artículo si aporta una contradicción, una consecuencia poco evidente, una interpretación propia o un principio transferible.

### Voz, autenticidad y humor

- **Veterano, no dinosaurio.** Experiencia para reconocer patrones, no autoridad infalible; actualizar la opinión cuando cambie la evidencia.
- **Mordaz, no arrogante.** Ironía incisiva contra hype, burocracia, malas decisiones y exageraciones corporativas, no contra personas vulnerables, usuarios o profesionales que aprenden.
- **Humano, no personaje.** Primera persona natural, dudas, curiosidad, entusiasmo, contradicciones, errores y autocrítica. No hace falta parecer brillante en cada frase.
- **Friki, no diccionario de memes.** Jira, Kubernetes, legacy, videojuegos, bots y la jerga dev pueden enriquecer una historia; evitar muletillas y remates reciclados.
- **Reflexivo, no predicador.** Tomar posición, ofrecer razones y reconocer límites; nunca disfrazar una preferencia contextual de ley universal.

Escribir como alguien que cuenta una historia interesante durante un café, no como un comunicado ni una charla de venta. Se admiten expresiones coloquiales, sarcasmo contundente y, excepcionalmente, una palabrota orgánica. **El humor revela contradicciones; no es relleno.** Si al eliminar un chiste el texto mejora, el chiste sobra. No poner uno por párrafo ni rebajar hechos o consecuencias humanas serias a simples bromas.

La personalidad no consiste en insertar «yo creo» ante información ajena. Explicar qué me llamó la atención, por qué discrepo, qué habría pensado antes, qué cambiaría en mi práctica o qué incertidumbre persiste. **Nunca inventar proyectos, experiencias, experimentos ni conversaciones** para parecer cercano. Diferenciar lo observado personalmente de lo leído en otras fuentes; no divulgar información privada por autenticidad.

Apodos de IA: «Gepeto», «Claudio» y «Gema» cuando encajen respectivamente con OpenAI, Claude y Gemini; sin alternancia mecánica ni mascota omnipresente. En pasajes que exijan precisión, utilizar los nombres reales. Las referencias de AntoñiOS son una segunda capa opcional, no un requisito.

### Calibración de voz v2.2: más colmillo, mismo rigor (propuesta)

La referencia para **artículos nuevos** es una historia contada por un desarrollador veterano a otro durante un café: alguien con oficio, que disfruta del salseo cuando lo hay y sabe cuándo dejar de bromear. El texto debe tener **voz propia antes que apariencia de artículo impecable**. Esta calibración se aplica al aprobar v2.2; no modifica textos publicados ni obliga a convertir temas serios en comedia.

- **Gancho con contradicción, no con introducción.** Entrar por la tensión, la consecuencia absurda o un contraste temporal verificable. Dos o tres frases pueden bastar; no fabricar secuencias, diálogos o intenciones para conseguir ritmo.
- **Mala leche con dirección.** Cargar contra el hype, las promesas de «ahora todo es gratis», la burocracia y las decisiones que merecen una ceja levantada. No convertir a personas reales en villanos ni confundir torpeza con dolo.
- **Humor de situación, no chistes pegados.** Buscar el detalle técnico que hace cómica la contradicción: una interfaz impecable que no protege nada, un despliegue celebrado antes de verificarlo, un sistema «retirado» que sigue vivo. Los ejemplos son mecanismos, **no frases para reciclar**.
- **Conversación con ritmo.** Alternar frases cortas, pausas y algún remate seco; preferir verbos concretos, imágenes reconocibles y expresiones coloquiales a explicaciones ceremoniosas. Permitir un punto de irreverencia sin sonar como un personaje actuando ni encadenar bromas por obligación.
- **La ceja no es una prueba.** Se puede expresar sospecha, extrañeza o escepticismo, pero separar claramente hechos verificados, versión de las partes, indicios e interpretación personal. Si falta evidencia, decirlo sin rodeos; nunca insinuar una acusación grave sólo para conservar el chiste.
- **Remate con segunda lectura.** Buscar un cierre irónico que resuma la contradicción y deje una idea útil, sin volver a explicar toda la moraleja. Evitar muletillas y repetir recursos recientes: ni el mismo login, ni las mismas cejas, ni la misma factura en cada artículo.

**Intensidad variable por tema:** «Salseo con logs» admite mayor mordacidad y contraste cómico; Arquitectura e Ingeniería agéntica pueden ser irónicas sin perder profundidad; IA / Reflexiones y temas humanos o sensibles requieren más contención. La personalidad permanece, pero el volumen del sarcasmo cambia.

**Prueba de edición:** si el texto podría firmarlo cualquier divulgador tecnológico, buscar qué contradicción concreta te importa y qué opinas tú. Si una broma oscurece los hechos, humilla a un afectado o parece copiada del artículo anterior, quitarla. Si el remate funciona pero el argumento no, todavía no hay artículo.

### Temas, titulares y tres minutos

**Una tesis por artículo.** El título despierta curiosidad con preguntas incómodas, contradicciones o remates naturales, sin clickbait ni promesas de «guía definitiva». `summary` plantea el conflicto, no adelanta toda la resolución.

**Extensión para artículos nuevos:** objetivo **400–460 palabras** y techo editorial **480 palabras**, contando narración, encabezados, conclusiones y bloque de aprendizaje. Las fuentes externas no cuentan en la estimación; código, esquemas y gráficos que demanden lectura sí se consideran. Calcular `readingTime` del contenido completo a un ritmo conservador de alrededor de **160 palabras/minuto**, con ajustes razonables por idioma y complejidad. Nunca excluir el bloque de aprendizaje del tiempo declarado para una nueva pieza.

No rellenar por llegar a una cifra; eliminar introducciones protocolarias, redundancias y vueltas sobre la misma idea. Si una explicación no cabe con rigor, acotar la tesis, separar investigaciones distintas o registrar de forma explícita una excepción justificada; **nunca falsear los minutos**.

### Familias temáticas y nueva categoría

Las categorías editoriales principales para nuevos artículos son:

| Categoría ES | Categoría EN | Perspectiva |
| --- | --- | --- |
| Arquitectura | Architecture | Sistemas, decisiones, rendimiento, costes, calidad y pragmatismo. |
| Ingeniería agéntica | Agentic engineering | Agentes, automatización, delegación, validación y desarrollo. |
| IA / Reflexiones | AI / Reflections | Investigación, ética, capacidades, límites y dilemas de IA. |
| Side quests | Side quests | Curiosidad, descubrimientos, aprendizajes fuera del ticket. |
| **Salseo con logs** | **Drama with Receipts** | Polémicas tecnológicas, meteduras de pata públicas, marketing desbocado y contradicciones empresariales explicadas con evidencia. |

**«Salseo con logs» no es un sitio para rumores o humillación.** El escándalo atrae; el análisis justifica entrar. Partir de hechos contrastados, explicar qué decisiones y mecanismos hicieron posible el problema y extraer un aprendizaje útil. Por ejemplo, un ejecutivo entusiasmado con un prototipo de IA que confunde «se ve en el navegador» con «es seguro en producción» es un ángulo narrativo; **no atribuir incidentes concretos a alguien sin verificación**. Que algo aparezca en el frontend no implica por sí solo una filtración: evaluar la sensibilidad de los datos y los controles reales de acceso y autorización.

En cuestiones sensibles, contrastar fuentes primarias e independientes, distinguir acusaciones de hechos probados, no inferir intenciones, no reproducir datos privados ni credenciales, y evitar detalles técnicos que faciliten abuso. Reírse de decisiones cuestionables, no de sus víctimas.

La categoría responde al **enfoque** y las etiquetas a las tecnologías y asuntos secundarios. Un fallo relacionado con IA puede ser «Salseo con logs» si el eje es la decisión empresarial, o «IA / Reflexiones» si el eje es conceptual. No duplicar artículos para aparecer en varias categorías.

**Implementación:** el campo actual `category` es texto libre, así que las categorías nuevas podrán aparecer al publicar artículos que las utilicen. La guía por sí sola no crea contenido ni filtros vacíos en la web. No cambiar la clasificación histórica.

### Ritmo narrativo sin plantilla

La estructura no debe sonar a un formulario rellenado. Preferir este recorrido flexible:

1. **Gancho:** tensión o contradicción en las dos o tres primeras frases; nunca «En este artículo vamos a…».
2. **Conflicto:** sólo los hechos y el contexto necesarios para comprender qué ocurre.
3. **Mi mirada:** interpretación y criterio del autor; qué resulta absurdo, qué cuestiono, por qué me importa o qué haría de otro modo.
4. **Resolución:** una idea fuerte, una decisión práctica o una incertidumbre bien delimitada.
5. **Remate:** cuando proceda, una frase memorable, mordaz, irónica o humana, sin repetir la moraleja.

Las pruebas, números o ejemplos sirven a la historia. Los encabezados sólo se utilizan si agilizan la lectura móvil; no imponer un número fijo. Humor, profundidad y sarcasmo pueden variar entre artículos, pero la voz no debe parecer escrita en serie.

### Rigor, utilidad y límites

Seguir cuando resulte aplicable **problema → razonamiento → evidencia/experimento → resultado → aprendizaje**, no definición → teoría → tutorial → conclusión. Hechos verificados, interpretaciones, opiniones e hipótesis deben diferenciarse; un resultado contextual no es una ley universal. Evitar atribuir causalidad sin respaldo o convertir estimaciones en mediciones. Recoger contraargumentos relevantes con honestidad.

Código, datos, logs, tablas y diagramas aparecen únicamente si ayudan a comprender la tesis, en su versión mínima útil. No explicar obviedades técnicas ni publicar instrucciones excesivas donde basten referencias a documentación oficial. El lector debe obtener una perspectiva, un criterio o una aplicación aprovechable en otro contexto.

**No hay obligación de publicar.** Descartar notas de prensa resumidas sin opinión propia, refritos de tendencias, tutoriales genéricos, chistes con una moraleja postiza y artículos que repiten aprendizajes recientes. La periodicidad no excusa la falta de valor.

### Bloques editoriales disponibles

Los componentes MDX existentes son opcionales. No se insertan para decorar ni forman una plantilla rígida.

| Intención editorial | Componente actual | Uso |
| --- | --- | --- |
| Pregunta que guía la investigación | `Question` | Formula la duda concreta sin sustituir su desarrollo en el texto. |
| Hipótesis puesta a prueba | `Experiment` | Explica qué se probó y con qué propósito. |
| Resultado o evidencia relevante | `Result` | Equivale al `LOG` narrativo cuando hace falta destacar un hallazgo. |
| Algo detectado | `Observation` | Separa una observación de la interpretación posterior. |
| Código imprescindible | `Code` o bloque de código Markdown | Muestra sólo lo necesario para comprender el punto. |
| Contexto secundario | `Aside` o `Callout` | Equivale a una `NOTE`; debe poder omitirse sin romper el hilo principal. |
| Límite inicial y exploración posterior | `OriginalScope` / `OutOfScope` | Hace visible dónde terminó el encargo y empezó la investigación. |
| Incertidumbres restantes | `OpenQuestions` | Conserva preguntas reales cuando aportan valor; no fuerza un cierre abierto. |
| Comparación o apoyo visual | `Compare`, `Image`, `Gallery` | Se usa sólo cuando la relación visual aclara el razonamiento. |

`LOG` ya aparece como identificador visual automático en la cabecera del artículo; no existe como bloque MDX independiente. `POSTMORTEM` existe como tipo de artículo (`type: postmortem`), no como componente. No se añaden componentes nuevos hasta que un caso editorial repetido justifique su semántica y su mantenimiento.

### Portadas: misma colección, cinco familias reconocibles

**Sólo para artículos nuevos.** Conservar el lenguaje compartido de pixel art de aventura gráfica retro, escenas narrativas, iluminación cinematográfica, sombras ciruela, alto contraste y textura coherente con AntoñiOS. **Diferenciar por temática** mediante tres elementos: color dominante, atmósfera y tipo de escena; no basta aplicar un filtro de color a una imagen genérica.

| Familia | Dominante de referencia | Atmósfera y motivos |
| --- | --- | --- |
| Arquitectura | Azul tecnológico `#397BD5` | Planos, estructuras, sistemas, conexiones, salas técnicas. |
| Ingeniería agéntica | Cian/turquesa `#30C7CF` | Bots, terminales, automatización y caos organizado. |
| IA / Reflexiones | Violeta/lavanda `#9874DE` | Laboratorios, preguntas, símbolos conceptuales, dilemas. |
| Side quests | Ámbar/dorado `#E9B458` | Exploración, descubrimientos, talleres y aventuras. |
| Salseo con logs | Coral/rojo rosado `#F16577` | Oficinas absurdas, alertas, celebraciones prematuras y caos corporativo. |

Los hexadecimales orientan la **dirección artística**, no prescriben cada píxel ni alteran automáticamente los colores de la interfaz. Mantener un fondo oscuro compartido, pero evitar que todas las portadas vuelvan a quedar dominantemente moradas. El personaje, la iluminación y la historia han de variar de una categoría a otra. Una escena debe contar una situación, no limitarse a ilustrar el nombre de la tecnología.

Formato **16:9**, motivo principal legible en miniatura, composición apta para tarjetas/cabeceras/social, sin títulos incrustados y sin texto innecesario. Usar `cover` y `coverAlt` naturales en ES/EN; si hay texto indispensable, localizar la imagen. Recursos compartidos en `src/assets/blog/`. Una ilustración por artículo, con personalidad propia. Claudio aparece exclusivamente en su propio artículo; ni él ni otros personajes son mascotas generales. En casos de salseo, caricaturizar comportamientos, no fabricar supuestas pruebas ni mostrar información sensible o retratos engañosos de personas reales.

**Compatibilidad:** las ilustraciones y metadatos de todos los artículos ya publicados permanecen intactos. El esquema actual **no incluye** un campo `visualTheme`: puede añadirse en una implementación futura, opcional y con fallback para el histórico, si se requiere automatizar los acentos por familia. Esta aprobación **no implica** cambiar esquema, CSS ni la interfaz existente.

### El aprendizaje que merece subrayarse

Cada artículo **nuevo** cierra con un bloque de aprendizajes **dentro de los tres minutos**, después del remate narrativo y antes de las fuentes. Debe funcionar como apuntes de estudio: **tres conceptos orientativos** (se admiten dos o cuatro si el contenido lo exige), cada uno con **nombre en negrita** y **una frase clara** que explique el principio, su uso o su límite. Extensión orientativa **70–95 palabras incluyendo la síntesis final**.

Encabezado variable, con humor natural («Lo que sobrevivió al garbage collector», «Conocimiento desbloqueado», «Lo que me llevo a RAM»); elegirlo al editar, nunca aleatorizarlo durante la visita. Cerrar normalmente con **«Para guardar en RAM»** o una variante que encaje.

Priorizar principios **transversales**, no repetir el caso técnico ni introducir afirmaciones nuevas que el artículo no haya fundamentado. No inventar conceptos para completar una lista. Ejemplo:

- **Coste ≠ valor.** Que una solución sea barata de construir no significa que compense mantenerla.
- **Delegar exige verificar.** La responsabilidad por el resultado sigue siendo humana aunque otra herramienta ejecute el trabajo.
- **Aprender no es producir.** Optimizar la entrega y desarrollar criterio son objetivos diferentes.

**Para guardar en RAM:** cuando construir se abarata, elegir bien qué construir cobra más importancia.

La aprobación editorial incluye este bloque y el cálculo actualizado de `readingTime`. **No modificar** los anexos históricos ni sus tiempos de lectura antiguos.

### Encabezado de fuentes

Cuando haya fuentes o lecturas adicionales, usar un título breve, natural y con humor discreto. Variarlo entre artículos: «Las fuentes, por si acaso», «No me lo he inventado todo», «De dónde sale todo esto», «Para contrastar mis desvaríos» u otras frases del mismo estilo. Elegir una variante al editar y conservarla en el artículo; no cambiarla aleatoriamente en cada visita. Evitar «Para seguir por la madriguera» como fórmula recurrente. Para el artículo de Claudio queda fijado «No me lo he inventado todo».

### Metadatos, idiomas y reutilización

El MDX es la única fuente del artículo. `summary` se escribe a mano para tarjetas, listados, RSS y copia social predeterminada; también cubre la descripción SEO si no existe `seo.description`. `linkedin.text` permite una adaptación deliberada; la URL canónica depende de `locale` y `slug`, nunca se copia en el cuerpo. `translationKey` conecta ES/EN incluso cuando los slugs difieren.

**Toda nueva publicación se revisa en español e inglés.** Traducir la tesis y el rigor; adaptar las bromas y giros culturales con naturalidad. Mantener categorías pareadas e identidad cromática compartida. Cada versión debe respetar su lectura completa y su `readingTime` real. Evitar cuerpos duplicados o información interna sobre CMS, SEO o rutas dentro de la narración.

### LinkedIn: conversación, no anuncio

Un resumen de LinkedIn funciona **de manera autónoma**: cuenta una idea, una historia o reflexión con la voz del blog, aunque nadie abra el enlace. Evitar «he escrito un artículo», «descubre cómo» y llamadas artificiosas a comentar. Si aparece un enlace, incorporarlo con naturalidad, por defecto directo y sin eslogan comercial. Emojis y hashtags sólo cuando aporten.

No publicar nuevos artículos ni sus adaptaciones sociales sin la revisión y aprobación establecidas. El archivo publicado no se reescribe para encajar con estas pautas.

### Revisión editorial y de publicación

Antes de aprobar un artículo **nuevo**:

- **Firma:** ¿hay perspectiva personal o podría firmarlo cualquier desarrollador?
- **Colmillo:** ¿el sarcasmo nace de una contradicción real, tiene un blanco legítimo y no recicla el chiste de la semana pasada?
- **Café:** ¿lo contaría así a un colega, sin jerga corporativa ni tono académico impostado?
- **Gancho y tensión:** ¿engancha desde el principio sin clickbait? ¿Hay una única tesis?
- **Tijeras:** ¿podemos suprimir repeticiones, contexto innecesario o el chiste menos inspirado?
- **Verdad:** ¿están los hechos contrastados y separados de hipótesis, opiniones e interpretaciones?
- **Subrayador:** ¿los aprendizajes son claros, fundamentados, transversales y consultables?
- **Tres minutos:** ¿narración + cierre + aprendizajes caben en ≤480 palabras y `readingTime` es honesto?
- **Archivo:** ¿evita reciclar argumentos y respeta íntegros los artículos publicados?
- **Miniatura:** ¿conserva pixel art compartido y se reconoce la familia temática a primera vista?
- **ES/EN:** ¿ambos idiomas transmiten la misma tesis con humor natural y metadatos equivalentes?
- **Salseo:** si hay acusaciones o fallos públicos, ¿se han verificado y protegido datos y víctimas?
- **Técnico:** comprobar frontmatter, HTML estático, navegación, idioma, canonical, RSS, sitemap, SEO, móvil, tests, lint, typecheck y build antes de dar por terminada una publicación.

Evitar «En el vertiginoso mundo de…», «En este artículo exploraremos…», «Como desarrolladores…», «En conclusión…», keyword stuffing, moralejas forzadas y preguntas artificiales de engagement. No perseguir cuota de publicaciones: **tres minutos, una historia, algo de mala leche y una idea que merezca quedarse.**

## English

### Identity and reader promise

Out of Scope is a personal column about engineering, technology and choices that seemed brilliant until somebody asked an awkward question. Not a news aggregator, course, generic tutorial archive or search-traffic factory. The portfolio shows **what I built**; the blog reveals **how I think, what I challenge, where I get things wrong and what I learn**. More than fifteen years of experience should be evident in judgement, not repeated biography.

**Reader promise:** a distinctive three-minute story that ideally leaves (1) a smile, (2) a worthwhile thought or tension and (3) a practical lesson. Every post need not be a comedy routine, but none exists just to maintain publishing frequency.

**Topic test:** before writing, complete “This interests me because it reveals ____, and understanding it matters because ____.” A news item becomes a post only with an original angle, meaningful contradiction, less-obvious consequence or transferable principle.

### Voice, authenticity and humour

- **Experienced, not a dinosaur.** Recognise patterns without claiming infallibility; update your view when evidence changes.
- **Sharp, not arrogant.** Direct sarcasm at hype, bureaucracy, poor decisions and corporate contradictions, not learners, vulnerable people or users.
- **Human, not a manufactured character.** Natural first-person prose; admit doubts, excitement, mistakes, self-contradictions and changed minds.
- **Geeky, not a meme catalogue.** Jira, Kubernetes, legacy, games and dev jargon are optional seasoning, never required catchphrases.
- **Thoughtful, not preachy.** Take a stance, give reasons and acknowledge the limits of contextual judgement.

Write like a developer telling an interesting story over coffee, not delivering a corporate announcement. Colloquial phrasing, sharp irony and an occasional organic swear word are permitted. **Humour exposes contradictions, it does not pad an article.** If removing a joke improves a paragraph, remove it. Do not force one per paragraph or trivialise serious human consequences.

First person is more than prepending “I think” to a press summary. Explain what surprised me, what I disagree with, what I used to believe, what I would change, or what remains uncertain. **Never invent personal anecdotes, projects, experiments or conversations** to manufacture authenticity. Distinguish first-hand experience from others' reporting; privacy is not the price of sounding real.

Playful AI nicknames: “Gepeto”, “Claudio” and “Gema” where appropriate for OpenAI, Claude and Gemini respectively. No mechanical rotation or universal mascot. Use actual product names where precision matters. AntoñiOS jokes and references remain an optional secondary layer.

### Voice calibration v2.2: sharper wit, unchanged standards (draft)

For **new articles**, picture an experienced developer telling another developer a story over coffee: someone who knows the craft, enjoys the drama when it deserves attention, and knows when the jokes need to stop. **A distinctive voice matters more than polished article-speak.** This refinement applies only after v2.2 approval; it never rewrites published pieces or turns sensitive subjects into comedy.

- **Open with a contradiction, not a preamble.** Lead with tension, an absurd consequence, or a verifiable contrast in timing. Two or three sentences may be enough; never invent chronology, dialogue or motives to make the opening land.
- **Point the sarcasm somewhere useful.** Target hype, grand promises, bureaucracy and questionable decisions. Don't cast real people as villains or turn poor judgement into an unsupported allegation of misconduct.
- **Find humour in the situation.** The best joke often sits inside the technical contradiction: a polished interface that protects nothing, a deployment celebrated before verification, a supposedly retired system still running. These are **patterns to notice, not punchlines to copy**.
- **Sound like a conversation.** Mix short sentences, pauses and the occasional dry punchline. Prefer concrete verbs and recognisable details to ceremonial explanations. Be irreverent when it fits, but never perform a character or force a joke into every paragraph.
- **A raised eyebrow isn't evidence.** Curiosity and scepticism are welcome, but verified facts, the parties' accounts, indications and personal interpretation must remain distinct. State what isn't known; don't smuggle a serious accusation into a witty insinuation.
- **Close on a second meaning.** Aim for an ironic last line that crystallises the tension and leaves a useful thought without restating the whole lesson. Avoid repeating recent devices and signature jokes across articles.

**Adjust the intensity to the subject:** Drama with Receipts can be sharper and more mischievous; Architecture and Agentic engineering can be wry without sacrificing depth; AI / Reflections and sensitive human stories require more restraint. Keep the personality, change the volume.

**Editing test:** if any tech writer could sign the piece, find the specific contradiction that matters to you and explain your own position. Cut jokes that obscure facts, mock affected people or echo the previous post. A great punchline without a sound argument is not yet an article.

### Topics, headlines and the three-minute rule

**One thesis per article.** Headlines should invite curiosity through a contradiction, awkward question or earned punchline without clickbait or false promises of a definitive guide. The hand-written `summary` sets up tension rather than giving away the whole answer.

**New posts:** target **400–460 words**, editorial ceiling **480 words**, **including narrative, headings, conclusions and learning notes**. References and citations are excluded from the estimate; time needed to read code, diagrams and charts is not. Set `readingTime` for the complete reader experience at a conservative baseline of about **160 words/minute**, with sensible language and complexity adjustments. Never exclude learning notes from new articles' stated reading time.

Do not pad to reach the target. Edit introductions, duplicate arguments and unnecessary exposition. If technical precision cannot fit, narrow the thesis, split genuinely separate investigations or make an explicitly justified exception—and **never misstate reading time**.

### Topic families and the new category

Editorial categories for new posts:

| Spanish | English | Focus |
| --- | --- | --- |
| Arquitectura | Architecture | Architecture, performance, trade-offs, cost, quality and pragmatic choices. |
| Ingeniería agéntica | Agentic engineering | Agents, automation, delegation, validation and developer workflows. |
| IA / Reflexiones | AI / Reflections | AI research, ethics, abilities, limits and open questions. |
| Side quests | Side quests | Curiosity and discoveries beyond the original ticket. |
| **Salseo con logs** | **Drama with Receipts** | Tech controversies, public failures, runaway marketing and revealing corporate contradictions, backed by evidence. |

**“Drama with Receipts” is not a rumour feed or a public-shaming column.** Drama draws attention; analysis earns it. Start with verified facts, explain the decisions and mechanisms behind the incident, and draw a useful transferable lesson. A founder who mistakes a prompt-built prototype for production-ready software may be a strong angle; **never attribute a specific breach or negligence without verification**. Sensitive information visible in frontend code does not automatically establish a data breach; assess the nature of the data and real authorisation and access controls.

For reputation-sensitive cases, prefer primary evidence with independent corroboration; clearly distinguish allegations from proven facts; avoid unsupported motives, private data, credentials and unnecessarily actionable exploit details. Critique decisions, not victims.

Categories describe the editorial **angle**; tags describe secondary technologies and topics. An AI security story may belong in Drama with Receipts when corporate judgement is central, or AI / Reflections when the point is conceptual. Do not duplicate an article for multiple categories.

**Implementation note:** the current `category` field accepts plain text. A new category can appear when a new published article actually uses it; this document alone does not create an empty navigation category. Keep historical classifications untouched.

### Narrative rhythm without a template

Let the piece read like a story, not a filled-out form. Preferred flexible arc:

1. **Hook:** an immediate tension or contradiction in the first two or three sentences; never “In this article we will…”.
2. **Conflict:** only the facts and context needed to understand the situation.
3. **My take:** the author's judgement—what seems absurd, what I question, why it matters to me or what I would do differently.
4. **Resolution:** one strong idea, actionable criterion or precisely stated uncertainty.
5. **Closing beat:** when it fits, an ironic, sharp, human or memorable final line without repeating the thesis.

Evidence and examples serve the story. Add headings when they help mobile reading, not to satisfy a template. Tone may vary by subject, but the writing must never feel mass-produced.

### Rigour, utility and limits

When relevant prefer **problem → reasoning → evidence/experiment → result → learning**, not definition → theory → tutorial → conclusion. Separate verifiable facts from interpretation, opinion and hypotheses. Do not turn case-specific observations into universal laws, correlations into causation or personal estimates into measurements; address material counterarguments fairly.

Code, logs, charts, tables and diagrams appear only where essential, reduced to the smallest useful unit. Skip technical basics better covered by official documentation. Give readers a perspective, decision rule or concept that helps beyond one product.

**Publishing is optional.** Reject summaries of press releases without an original view, shallow trend-chasing, generic tutorials, filler morals and repetitions of recent lessons. A calendar is not a reason to publish a weak article.

### Available editorial blocks

Existing MDX components are optional. They are not decoration or a rigid article template.

| Editorial intent | Current component | Use |
| --- | --- | --- |
| Question guiding the investigation | `Question` | States the concrete doubt without replacing its development in the prose. |
| Hypothesis put to the test | `Experiment` | Explains what was tested and why. |
| Relevant result or evidence | `Result` | Acts as a narrative `LOG` when a finding needs emphasis. |
| Something detected | `Observation` | Separates an observation from the interpretation that follows. |
| Essential code | `Code` or a Markdown code block | Shows only what is needed to understand the point. |
| Secondary context | `Aside` or `Callout` | Acts as a `NOTE`; removing it must not break the main thread. |
| Initial boundary and later exploration | `OriginalScope` / `OutOfScope` | Shows where the assignment ended and the investigation began. |
| Remaining uncertainty | `OpenQuestions` | Preserves genuine questions when useful; it does not force an open ending. |
| Comparison or visual support | `Compare`, `Image`, `Gallery` | Used only when the visual relationship clarifies the reasoning. |

`LOG` already appears as the automatic visual identifier in the article header; it is not a separate MDX block. `POSTMORTEM` exists as an article type (`type: postmortem`), not as a component. Add no new component until a repeated editorial need justifies its semantics and maintenance cost.

### Covers: one collection, five recognisable families

**For new articles only.** Preserve the shared AntoñiOS aesthetic: retro adventure-game pixel art, narrative scenes, cinematic lighting, plum shadows, strong contrast and coherent texture. Make topics identifiable through **dominant colour, atmosphere and scene language**, rather than recolouring the same generic illustration.

| Family | Reference dominant | Atmosphere and motifs |
| --- | --- | --- |
| Architecture | Technical blue `#397BD5` | Plans, structures, systems, connected infrastructure. |
| Agentic engineering | Cyan/turquoise `#30C7CF` | Bots, terminals, automation, organised chaos. |
| AI / Reflections | Violet/lavender `#9874DE` | Labs, abstractions, questions and dilemmas. |
| Side quests | Amber/gold `#E9B458` | Exploration, discoveries, workshops and adventure. |
| Drama with Receipts | Coral/rosy red `#F16577` | Absurd offices, alerts, premature celebrations and corporate chaos. |

Hex codes define **art direction**, not per-pixel requirements or automatic UI recolouring. Keep a common nocturnal/plum foundation, but do not let every image revert to dominant purple. Change lighting, characters and scenery meaningfully across topics. The illustration should convey a scene, not simply depict a technology logo.

Use **16:9**, a clear miniature-readable focal subject, composition suitable for cards/article headers/social previews, no embedded article title, and minimal text. Set `cover` and natural ES/EN `coverAlt`; localise image text if unavoidable. Keep shared assets under `src/assets/blog/`. Each story gets distinct artwork. Claudio appears only in his own article and is not a general blog mascot. For public scandals, caricature decisions and behaviours; never forge apparent evidence, expose private information or mislead viewers with real-person depictions.

**Backwards compatibility:** all covers and metadata in existing articles remain untouched. The current schema **does not implement** `visualTheme`; if category accents are automated later, this could become an optional field with a safe legacy fallback. Approving this guide **does not** itself modify schema, CSS or existing interfaces.

### Learning worth highlighting

Every **new** article ends with a concise learning block **within the three-minute budget**, after the narrative closing beat and before sources. Treat it like highlighted study notes: **typically three concepts** (two or four if justified), each a **bold, short principle** plus **one precise sentence** explaining its use or limitations. Aim for **70–95 words total, including the final takeaway**.

Vary the heading naturally with understated geek humour (“What survived the garbage collector”, “Knowledge unlocked”, “Saved to RAM”); choose it while editing, never randomise on page visits. Conclude with a memorable “Save to RAM” line or suitable variation.

Prioritise **transferable principles**, not restatements of the specific technology. Introduce no claims unsupported by the story. Do not invent lessons to fill a list. Example:

- **Cost ≠ value.** A solution being cheap to build does not make it worth maintaining.
- **Delegation requires verification.** Responsibility stays with the person accepting the outcome even when a tool performs the task.
- **Learning is not production.** Shipping efficiently and developing sound judgement are distinct goals.

**Save to RAM:** as building gets cheaper, choosing what deserves to be built grows more important.

Editorial approval includes this section and accurate `readingTime`. **Never update older appendices or legacy reading-time metadata** to make them fit v2.1.

### Sources heading

When including sources or further reading, use a short, natural heading with understated humour. Vary it between articles: “Sources, just in case”, “I didn't make all of this up”, “Where all this comes from”, “To fact-check my ramblings”, or similar wording. Choose a variant during editing and keep it in the article; do not randomise it on each visit. Avoid “Further down the rabbit hole” as a recurring formula. Claudio's article uses “I didn't make all of this up”.

### Metadata, languages and reuse

MDX remains the single source of content. Hand-write `summary` for cards, listings, RSS and default social copy; it also supplies the SEO description unless `seo.description` exists. Use `linkedin.text` for a deliberate social adaptation; derive canonical URLs from `locale` and `slug` instead of copying them into the body. `translationKey` links ES/EN even when slugs differ.

**Review every new article in Spanish and English.** Preserve thesis, meaning and evidence while adapting jokes and cultural references naturally. Keep categories paired and cover identity aligned. Each language version needs its own honest complete reading-time estimate. Do not duplicate bodies or expose internal CMS, SEO or route mechanics in visible prose.

### LinkedIn: conversation, not promotion

A LinkedIn adaptation must **stand on its own**: a useful observation, small story or reflection in the blog's voice even if readers never click. Avoid “I've published an article”, “discover how” and contrived engagement questions. If an article link appears, use a natural direct transition without sales copy; add emoji or hashtags only where helpful.

No new article or social adaptation goes live without the established review and approval. Do not rewrite historical social copy to retrofit v2.1.

### Editorial and publishing review

Before approving a **new** article:

- **Signature:** does it reflect a recognisable personal perspective, rather than generic developer prose?
- **Bite:** does the sarcasm arise from a real contradiction, have a legitimate target and avoid recycling last week's joke?
- **Coffee test:** would I tell this story to a colleague without corporate jargon or manufactured authority?
- **Hook and tension:** does it engage immediately, honestly, with one thesis?
- **Scissors:** can duplicated context, rambling arguments or the weakest joke go?
- **Truth:** are facts checked and distinct from interpretations, opinions and hypotheses?
- **Highlighter:** are the lessons precise, supported, transferable and easy to revisit?
- **Three minutes:** do narrative + ending + learning stay at ≤480 words with an honest `readingTime`?
- **Archive:** does the post avoid recycled ideas and leave older published articles unchanged?
- **Thumbnail:** is the common pixel-art identity intact and the topic family obvious at a glance?
- **ES/EN:** is meaning equivalent and humour idiomatic in both languages?
- **Drama:** if claims or incidents concern real people, have evidence, privacy and harm been assessed?
- **Technical:** validate frontmatter, static HTML, navigation, language switch, canonical, RSS, sitemap, SEO, mobile, tests, lint, typecheck and build before publication.

Avoid “In today's fast-paced world…”, “In this article we will explore…”, “As developers…”, “In conclusion…”, SEO keyword stuffing, forced morals, clickbait and engagement bait. Do not meet publishing quotas by manufacturing value: **three minutes, one story, a touch of bite and a thought worth keeping.**
