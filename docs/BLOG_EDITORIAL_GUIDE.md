# Out of Context · Guía editorial / Editorial guide

Esta guía es la fuente de verdad editorial para Out of Context. Se aplica a cualquier creación, reescritura o revisión de artículos. La arquitectura técnica, las rutas y el flujo de publicación se documentan en [`OUT_OF_SCOPE.md`](OUT_OF_SCOPE.md).

This guide is the editorial source of truth for Out of Context. It applies whenever an article is created, rewritten, or reviewed. Technical architecture, routes, and the publishing workflow are documented in [`OUT_OF_SCOPE.md`](OUT_OF_SCOPE.md).

## Referencia práctica / Practical reference

La guía explica las reglas editoriales. [`La pregunta se queda`](../src/content/out-of-scope/es/la-pregunta-se-queda/index.mdx) es el artículo de referencia editorial (*golden sample*) que demuestra cómo suenan en la práctica. Deben consultarse juntos cuando resulte útil para crear o revisar un artículo; en caso de duda, esta guía conserva la autoridad normativa.

This guide explains the editorial rules. [`The question remains`](../src/content/out-of-scope/en/the-question-remains/index.mdx) is the editorial reference article (*golden sample*) showing how they sound in practice. Consult them together when useful for writing or reviewing an article; when in doubt, this guide remains the normative authority.

## Español

### Identidad

Out of Context es un cuaderno de campo de ingeniería, no un blog de tutoriales. Cuenta pequeñas historias de ingeniería de software desde la experiencia personal de Antonio. Una entrada suele nacer de una pregunta surgida durante el trabajo, un comportamiento inesperado, una decisión de arquitectura, un experimento, un fallo, una limitación o una solución que funcionó por motivos que merecían una segunda mirada.

La tecnología concreta no es el hilo conductor. El hilo conductor es la manera de enfrentarse a un problema: qué llamó la atención, qué se probó, qué evidencia apareció y qué cambió después. El portfolio responde principalmente «qué he hecho»; el blog cuenta qué ocurrió mientras lo hacía y qué aprendí por el camino. Un proyecto real puede aportar contexto, pero el artículo debe resultar interesante sin conocer previamente ese proyecto.

### Voz y personalidad

- Escribir predominantemente en primera persona. Debe percibirse una persona detrás del texto.
- Transmitir experiencia sin solemnidad, criterio sin dogmatismo, curiosidad, pragmatismo y comodidad ante la incertidumbre o el error.
- Preferir «me encontré con esto, probé aquello y cambié de opinión por este motivo» a «voy a enseñarte la forma correcta».
- Distinguir hechos y observaciones de decisiones contextuales y opiniones personales.
- Usar humor cuando nazca de lo ocurrido. La ironía ocasional y el entusiasmo por investigar más de lo estrictamente necesario encajan; una sucesión de chistes no.
- Las referencias geek y expresiones de AntoñiOS —`DAME CINCO MINUTOS...`, `SIDE QUEST EN CURSO`, madrigueras, videojuegos, bugs, procesos o compilaciones— son una segunda capa opcional. No son muletillas ni requisitos de marca.
- Evitar lenguaje corporativo, tono académico innecesario, falsa autoridad y frases que suenen a contenido genérico o generado en serie.

Prueba de autenticidad: **si el artículo podría haberlo escrito cualquier desarrollador, todavía no está terminado**. Debe contener al menos una experiencia, observación, decisión, prueba, error, cambio de opinión o razonamiento propio. Nunca se inventan anécdotas para cumplir esta regla; si falta información real, se señala durante la edición.

### Alcance, título y extensión

**Un artículo desarrolla una idea principal.** Se prefiere una pregunta o un descubrimiento concreto a un tema enciclopédico. El título despierta curiosidad sin clickbait y sin prometer una guía definitiva que el texto no ofrece.

El objetivo habitual es una lectura de 3–5 minutos: aproximadamente 600–1.000 palabras, con un límite blando de 1.200. No se añade relleno para alcanzar una cifra. Si la idea queda bien contada en 500 palabras, se publican 500. Si supera claramente las 1.200, se comprueba antes si contiene dos artículos.

### Ritmo narrativo

No existe una plantilla obligatoria, pero el ritmo habitual es:

1. **Gancho.** Una frase o un párrafo corto que introduce una situación, contradicción, problema o pregunta. Nunca «En este artículo vamos a…».
2. **Contexto.** Sólo lo necesario para entender qué estaba haciendo y por qué importaba; no documentación completa del proyecto.
3. **Pregunta.** El detalle que hizo que mereciera la pena seguir investigando.
4. **Madriguera.** Pruebas, código, arquitectura, mediciones, hipótesis, errores, alternativas y trade-offs. La experiencia y la evidencia van antes que la teoría genérica.
5. **Lo que me llevo.** La conclusión, regla personal, decisión, cambio de práctica, incertidumbre o pregunta mejor que dejó la investigación.
6. **Remate.** Cuando encaje, una frase breve que cierre la historia. No una conclusión académica ni una pregunta genérica al lector.

Los encabezados y las listas se usan sólo si mejoran la lectura, especialmente en móvil. La progresión debe sentirse narrativa, no como un esquema rellenado.

### Rigor técnico

El recorrido preferido es **problema → razonamiento → experimento → resultado → aprendizaje**, no **definición → teoría → tutorial → conclusión**. Código, logs, benchmarks, diagramas y resultados sólo aparecen cuando ayudan a contar la historia, reducidos al fragmento mínimo necesario. Se separa la observación de su interpretación, no se inventan resultados y una experiencia concreta no se presenta como ley universal.

No se explican conceptos básicos que el lector técnico puede consultar en la documentación oficial salvo que sean imprescindibles para seguir la historia. SEO, metadata y semántica HTML siguen siendo importantes en la implementación, pero no condicionan la voz visible.

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

### Metadata y reutilización

El artículo MDX es la única fuente de contenido. `summary` se escribe a mano y presenta la pregunta o el descubrimiento sin resolver todo el artículo. Alimenta tarjetas, listados, RSS y la copia social predeterminada; también actúa como descripción SEO cuando no existe `seo.description`. `linkedin.text` sólo se usa cuando la publicación necesita una adaptación deliberada. La URL canónica se deriva de `locale` y `slug`; no se copia dentro del artículo. `translationKey` relaciona las versiones ES/EN aunque sus slugs difieran.

No se publican dos copias del cuerpo ni se traslada al artículo información interna sobre MDX, CMS, URLs indexables o implementación SEO.

### Lista de revisión

Antes de publicar o dar por terminada una revisión:

- confirmar una idea principal, un primer párrafo con tensión y una progresión narrativa;
- comprobar que la primera persona es natural y que hay evidencia de por qué Antonio cuenta esta historia;
- eliminar repeticiones, explicaciones evidentes, frases largas, encabezados y listas innecesarios;
- comprobar que el humor no parece añadido y que la tecnología no eclipsa la pregunta;
- evitar «En el vertiginoso mundo de…», «En este artículo exploraremos…», «Como desarrolladores…», «En conclusión…», «Es importante destacar que…» y «A continuación veremos…»;
- evitar keyword stuffing, introducciones SEO artificiales, moralejas, clickbait y llamadas genéricas a comentar;
- revisar la longitud y dividir el texto si contiene dos investigaciones;
- revisar conjuntamente ES y EN, con el mismo significado, metadata equivalente y lectura natural en cada idioma;
- validar frontmatter, HTML estático, navegación, cambio de idioma, canonical, RSS, sitemap, SEO, vista móvil, tests, lint, typecheck y build.

## English

### Identity

Out of Context is an engineering field notebook, not a tutorial blog. It tells small software-engineering stories from Antonio's personal experience. An entry will usually begin with a question that surfaced at work, unexpected behaviour, an architectural decision, an experiment, a failure, a limitation, or a solution that worked for reasons worth a second look.

No particular technology is the connecting thread. The thread is the way a problem is approached: what drew attention, what was tested, what evidence appeared, and what changed afterwards. The portfolio primarily answers “what have I done?”; the blog tells what happened while doing it and what I learned along the way. A real project may provide context, but the article must remain interesting to someone who does not know that project.

### Voice and personality

- Write predominantly in the first person. A person should be clearly present behind the prose.
- Convey experience without solemnity, judgement without dogmatism, curiosity, pragmatism, and comfort with uncertainty or failure.
- Prefer “I ran into this, tried that, and changed my mind for this reason” to “I am going to teach you the correct way”.
- Distinguish facts and observations from contextual decisions and personal opinions.
- Use humour when it grows naturally from events. Occasional irony and enthusiasm for investigating beyond strict necessity fit; a stream of jokes does not.
- Geek references and AntoñiOS phrases—`DAME CINCO MINUTOS...`, `SIDE QUEST EN CURSO`, rabbit holes, games, bugs, processes, or builds—are an optional second layer. They are neither catchphrases nor branding requirements.
- Avoid corporate language, unnecessary academic tone, false authority, and phrasing that sounds generic or mass-produced.

Authenticity test: **if any developer could have written the article, it is not finished yet**. It must contain at least one real experience, observation, decision, test, error, change of mind, or recognisable line of reasoning. Never invent anecdotes to satisfy this rule; flag missing real information during editing.

### Scope, title, and length

**One article develops one main idea.** Prefer a concrete question or discovery to an encyclopaedic topic. The title creates curiosity without clickbait or promising a definitive guide the text does not deliver.

The usual target is a 3–5 minute read: roughly 600–1,000 words, with a soft limit around 1,200. Never pad an article to reach a number. If the idea is properly told in 500 words, publish 500. If it clearly exceeds 1,200, first check whether it contains two articles.

### Narrative rhythm

There is no mandatory template, but the usual rhythm is:

1. **Hook.** A sentence or short paragraph that immediately introduces a situation, contradiction, problem, or question. Never “In this article we will…”.
2. **Context.** Only what is needed to understand what I was doing and why it mattered; not complete project documentation.
3. **Question.** The detail that made further investigation worthwhile.
4. **Rabbit hole.** Tests, code, architecture, measurements, hypotheses, errors, alternatives, and trade-offs. Experience and evidence come before generic theory.
5. **What I am taking away.** The conclusion, personal rule, decision, changed practice, uncertainty, or better question left by the investigation.
6. **Closing beat.** When it fits, a short sentence that closes the story—not an academic conclusion or a generic question to the reader.

Use headings and lists only when they improve reading, particularly on mobile. The progression should feel like a narrative, not a filled-in outline.

### Technical rigour

The preferred path is **problem → reasoning → experiment → result → learning**, not **definition → theory → tutorial → conclusion**. Code, logs, benchmarks, diagrams, and results appear only when they help tell the story and are reduced to the smallest useful fragment. Keep observations separate from interpretations, never invent results, and do not present a contextual experience as a universal law.

Do not explain basic concepts a technical reader can find in official documentation unless they are essential to the story. SEO, metadata, and semantic HTML still matter in implementation, but they do not shape the visible voice.

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

### Metadata and reuse

The MDX article is the single content source. `summary` is hand-written and presents the question or discovery without resolving the whole article. It feeds cards, listings, RSS, and default social copy; it also supplies the SEO description when `seo.description` is absent. Use `linkedin.text` only when the post needs a deliberate adaptation. The canonical URL is derived from `locale` and `slug`; it is not copied into the article. `translationKey` connects ES/EN versions even when their slugs differ.

Do not publish duplicate article bodies or put internal MDX, CMS, indexable-URL, or SEO implementation details in the article.

### Review checklist

Before publishing or completing a review:

- confirm one main idea, an opening paragraph with tension, and narrative progression;
- check that first person feels natural and the text shows why Antonio is telling this story;
- remove repetition, obvious explanations, long sentences, and unnecessary headings or lists;
- check that humour does not feel inserted and technology does not overshadow the question;
- avoid “In today's fast-paced world…”, “In this article we will explore…”, “As developers…”, “In conclusion…”, “It is important to note…” and “Next, we will see…”;
- avoid keyword stuffing, artificial SEO openings, forced morals, clickbait, and generic engagement prompts;
- review the length and split the text if it contains two investigations;
- review ES and EN together for equivalent meaning, equivalent metadata, and natural prose in each language;
- validate frontmatter, static HTML, navigation, language switching, canonical, RSS, sitemap, SEO, mobile rendering, tests, lint, typecheck, and build.
