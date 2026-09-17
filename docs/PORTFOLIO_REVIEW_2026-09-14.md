# Revisión profesional / Professional review — 2026-09-14

## Fuente e inventario / Source and inventory

ES: Se ejecutó `git fetch origin` en knowledge-vault antes de editar. HEAD y origin/main coinciden en `ecd75a15420c49ec5d9a2ace98e352fcc913aea6`. Se revisaron master, CV, experiencia, proyectos y arquitectura. Las referencias siguientes son trazabilidad editorial; no se incorporan a las páginas ni al bundle del navegador.

EN: `git fetch origin` ran in knowledge-vault before editing. HEAD and origin/main match `ecd75a15420c49ec5d9a2ace98e352fcc913aea6`. Master, CV, experience, projects and architecture were reviewed. The following references are editorial provenance, excluded from pages and browser bundles.

| Evidencia / Evidence | Clasificación / Classification | Fuente / Source |
| --- | --- | --- |
| Trayectoria, discovery → producción / Career, discovery → production | PROFESSIONAL_CONFIRMED | career/master/cv-master.md; career/experience/*.md |
| Retirar servicio innecesario / Remove unnecessary service | PROFESSIONAL_CONFIRMED | career/architecture/cases/service-boundaries-and-ddd.md, A |
| Retirar DDD ceremonial / Remove ceremonial DDD | PROFESSIONAL_CONFIRMED | same file, B |
| Modelar un CRUD complejo / Model complex CRUD | RECURRING_PATTERN_CONFIRMED | same file, C |
| Estilo, persistencia, comunicación, medición, simplificación / Style, persistence, communication, measurement, simplification | RECURRING_PATTERN_CONFIRMED | career/architecture/decision-patterns.md |
| Read representation, modernización, diagnóstico, delivery / Read representation, modernization, diagnosis, delivery | PROFESSIONAL_CONFIRMED | career/experience/domingo-alonso.md |
| Mayor suite ~60 min → ~2 min / Largest suite ~60 min → ~2 min | METRIC_CONFIRMED | career/master/cv-master.md, Testing |
| ~1–2 llamadas menos por evento relevante, integraciones afectadas / ~1–2 fewer calls per relevant event, affected integrations | METRIC_CONFIRMED | career/experience/domingo-alonso.md, Event summaries |
| Agente de diagnóstico con herramientas / Tool-using diagnosis agent | PROFESSIONAL_CONFIRMED | career/experience/domingo-alonso.md, Alert auditor |
| Nueve laboratorios / Nine labs | PERSONAL_CONFIRMED | career/projects/*.md |
| Semantic Kernel, LiteLLM, SignalR, PostgreSQL, EF Core | PERSONAL_CONFIRMED | career/projects/platform934-api.md |
| gRPC, MassTransit, RAG, Qdrant/vector DB, Polly/circuit breaker, Container Apps, Grafana/Tempo, ahorro cloud cuantificado / quantified cloud savings | UNVERIFIED | No positive confirmation in the fetched career sources |

ES: No se infieren tecnologías por plausibilidad. Se mantiene RabbitMQ histórico, streaming propio, Outbox/Inbox, retries/error queues/replay, Redis, OpenTelemetry/Application Insights, Azure App Service/Functions/SQL/Storage/Key Vault, pipelines/Sonar/blue-green. Clean/Hexagonal, Vertical Slice, DDD y CQRS se presentan como decisiones contextuales, sin convertir una opción en un despliegue concreto no documentado.

EN: Technologies are not inferred from plausibility. Historical RabbitMQ, custom streaming, Outbox/Inbox, retries/error queues/replay, Redis, OpenTelemetry/Application Insights, Azure App Service/Functions/SQL/Storage/Key Vault and pipelines/Sonar/blue-green remain supported. Clean/Hexagonal, Vertical Slice, DDD and CQRS are contextual choices, not evidence of an undocumented deployment.

## Estado inicial y plan / Initial state and plan

ES: El árbol ya contenía cambios del usuario en componentes, modelo, estilos, pruebas y capturas; se conservan. Ya existían 10 áreas, 13 decisiones y 6 casos. Las carencias detectadas fueron principios duplicados en Terminal, dos registros de proyectos, ausencia de relaciones de claims/métricas en decisiones, texto del perfil truncado, entrega poco visible y vínculos incompletos con Arcade. Los PDFs debían regenerarse después de actualizar el modelo.

EN: The working tree already contained user changes in components, model, styles, tests and screenshots; they are preserved. Ten areas, thirteen decisions and six cases were already present. Gaps included duplicated Terminal principles, two project registries, missing claim/metric relations on decisions, truncated profile copy, weak delivery visibility and incomplete Arcade links. PDFs needed regeneration after updating the model.

1. ES: Consolidar contenido y trazabilidad por ID, sin leer el vault privado durante el build. EN: Consolidate content and provenance by ID, without reading the private vault at build time.
2. ES: Completar arquitectura en tres niveles, entrega, resultados y navegación hacia evidencia. EN: Complete three-level architecture, delivery, outcomes and evidence navigation.
3. ES: Derivar Terminal, laboratorios, Arcade y CV del mismo modelo bilingüe. EN: Derive Terminal, labs, Arcade and CV from the same bilingual model.
4. ES: Ejecutar lint, análisis estático, unitarios/integración, build, E2E y revisión visual responsive/PDF. EN: Run lint, static analysis, unit/integration tests, build, E2E and responsive/PDF visual review.

## Posicionamiento / Positioning

**Software Architect | Senior .NET Engineer**

ES: Diseño, modernizo y llevo a producción sistemas .NET complejos. Arquitectura conectada con la implementación y con el comportamiento real del sistema.

EN: I design, modernize and deliver complex .NET systems to production. Architecture connected to implementation and real system behaviour.

ES: Experiencia profesional como evidencia principal; laboratorios personales como curiosidad, autonomía y aprendizaje. IA aplicada permanece secundaria. No se añaden cargos de gestión ni títulos de AI/Enterprise Architect.

EN: Professional experience is the primary evidence; personal labs demonstrate curiosity, autonomy and learning. Applied AI remains secondary. No management roles or AI/Enterprise Architect titles are added.

## Entrega detallada / Detailed delivery

### 1. Knowledge-vault actualizado / Updated knowledge-vault

ES: La revisión fuente de este informe es el commit indicado arriba, contrastado con origin/main mediante fetch. El CV maestro aporta cronología y posicionamiento; las fichas de experiencia delimitan responsabilidad y resultados; los patrones y casos separan decisiones concretas de criterios recurrentes; los proyectos delimitan experimentación personal. Las 22 afirmaciones del modelo tienen referencia en professional-evidence.json y una prueba impide perder esa correspondencia.

EN: The source revision is the commit above, checked against origin/main after fetching. The master CV supplies chronology and positioning; experience records constrain responsibility and outcomes; patterns and cases distinguish concrete decisions from recurring judgement; project records delimit personal experimentation. All 22 model claims have references in professional-evidence.json, protected by a consistency test.

### 2. Diferencias respecto al portfolio / Differences from the portfolio

ES: El trabajo anterior ya contenía seis casos, trece decisiones y diez áreas. Esta revisión completa la jerarquía y sus relaciones, añade entrega controlada, corrige repeticiones, normaliza nueve laboratorios y aporta resultados cualitativos con alcance explícito. Se detectaron además enlaces de navegación cliente que abrían casos sin su contenido: ahora esos enlaces cargan el documento completo. Se conserva el trabajo previo y la estética Aura/AntoñiOS.

EN: The preceding work already contained six cases, thirteen decisions and ten areas. This review completes their hierarchy and relations, adds controlled delivery, removes repetition, normalizes nine labs and adds explicitly scoped qualitative outcomes. Client-side links could open cases without their content; these links now load the complete document. Existing work and the Aura/AntoñiOS aesthetic are preserved.

### 3. Posicionamiento aplicado / Applied positioning

ES: Software Architect | Senior .NET Engineer. La introducción de inicio explica qué hago; el perfil aporta identidad y alcance; experiencia y arquitectura aportan evidencia. Discovery, implementación y producción forman un recorrido continuo. IA aplicada es una capacidad secundaria y los proyectos personales apoyan curiosidad y autonomía.

EN: Software Architect | Senior .NET Engineer. The home introduction explains what I do; the profile supplies identity and scope; experience and architecture supply evidence. Discovery, implementation and production form a continuous path. Applied AI remains secondary; personal projects support curiosity and autonomy.

### 4. Modelo compartido / Shared model

ES: PublicProfessionalModel conecta Profile, Experience, Competency, Achievement, DecisionArea, ArchitectureDecision, ArchitectureCase y Project mediante IDs. Las decisiones incorporan claimIds y achievementIds; el perfil centraliza introduction y mode. El catálogo canónico genera las proyecciones profesionales de los nueve proyectos: no hay un segundo registro manual de nombres, resúmenes o tecnologías. Los selectores aplican ES/EN. La validación rechaza referencias inexistentes, decisiones sin respaldo y evidencia personal promovida a profesional. El build no necesita acceso al vault privado.

EN: PublicProfessionalModel connects Profile, Experience, Competency, Achievement, DecisionArea, ArchitectureDecision, ArchitectureCase and Project by ID. Decisions now carry claimIds and achievementIds; profile centralizes introduction and mode. The canonical catalog generates professional projections for all nine projects instead of maintaining a second manual list of names, summaries or technologies. Selectors apply ES/EN. Validation rejects missing references, unsupported decisions and personal evidence promoted to professional evidence. Builds do not require private vault access.

### 5. Estructura de Architecture / Architecture structure

ES: Tres niveles: áreas para orientarse, catorce decisiones con problema/decisión/principio desplegables y seis casos profundos con contexto, problema, restricciones, alternativas, decisión, motivo, implementación, trade-offs, resultado y aprendizaje. Competencias, experiencias y resultados se enlazan por ID. Los casos de simplificación y diagnóstico tienen diagramas propios. Donde la fuente no contiene una lista completa de alternativas, se declara esa limitación.

EN: Three levels: areas for orientation, fourteen expandable problem/decision/principle entries and six detailed cases covering context, problem, constraints, options, decision, rationale, implementation, trade-offs, outcome and learning. Competencies, experience and outcomes are linked by ID. Simplification and diagnosis cases have their own diagrams. Missing complete shortlists of alternatives are stated as evidence limitations.

### 6. Áreas finales / Final areas

ES: Se separa DevOps y entrega de Resiliencia; total 11. EN: DevOps and delivery is separated from Resilience; total 11.

| ES | EN |
| --- | --- |
| Límites y arquitectura | Boundaries & Architecture |
| Complejidad de dominio | Domain Complexity |
| Datos y rendimiento | Data & Performance |
| Sistemas distribuidos | Distributed Systems |
| Modernización segura | Safe Modernization |
| Testing e ingeniería de calidad | Testing & Quality Engineering |
| Observabilidad y producción | Observability & Production |
| Resiliencia | Resilience |
| DevOps y entrega | DevOps & Delivery |
| IA aplicada | Applied AI |
| Simplificación técnica | Technical Simplification |

### 7. Decisiones representativas / Representative decisions

ES: Total 14; entrega controlada es la incorporación adicional. El CRUD complejo está marcado como patrón recurrente. Las dos simplificaciones se sustentan en casos profesionales distintos.

EN: Total 14; controlled delivery is the additional entry. Complex CRUD is identified as a recurring pattern. The two simplifications are supported by distinct professional cases.

| ES | EN |
| --- | --- |
| Eliminar un servicio innecesario | Remove an unnecessary service |
| DDD solo donde existe complejidad de dominio | DDD only where domain complexity exists |
| Cuando un CRUD deja de ser CRUD | When CRUD is not really CRUD |
| Elegir estilo por contexto | Choose architectural style by context |
| Persistencia según el workload | Persistence follows the workload |
| Medir antes de optimizar | Measure before optimizing |
| Comunicación por semántica | Communication follows semantics |
| Enriquecer eventos donde aporta valor | Enrich events where it pays off |
| Modernizar es gestionar riesgo | Modernization is risk management |
| El testing también es arquitectura | Testing is architecture too |
| Diagnosticar el comportamiento real | Diagnose real runtime behaviour |
| Contener el fallo concreto | Contain the concrete failure |
| Delimitar las capacidades del agente | Bound agent capabilities |
| Automatizar la validación, controlar la promoción | Automate validation, control promotion |

### 8. Casos desarrollados / Developed cases

ES: Los seis casos preexistentes se conservan y completan; no se presentan como seis casos nuevos creados en esta revisión. EN: The six existing cases are preserved and completed, not described as six newly created cases.

| ES | EN |
| --- | --- |
| Modelo de lectura de vehículos | Vehicle read model |
| Infraestructura de testing | Testing infrastructure |
| Eventos resumen | Event summaries |
| Modernización gradual del legado | Incremental legacy modernization |
| Límites distribuidos y DDD pragmático | Distributed boundaries and pragmatic DDD |
| Agente para diagnóstico de incidencias | Incident-diagnosis agent |

### 9. Tecnologías confirmadas / Confirmed technologies

ES: La revisión da más visibilidad a Clean/Hexagonal Architecture, Vertical Slice, DDD y CQRS como elecciones contextuales; EF/Dapper/SQL/Redis por carga; streaming propio y RabbitMQ histórico; Outbox/Inbox, orden, duplicados, retries, colas de error y replay; OpenTelemetry/Application Insights; Azure App Service, Functions, SQL, Storage, Key Vault, pipelines, Sonar y blue-green con promoción final manual. No son una lista de novedades históricas ni una afirmación de uso simultáneo en cada sistema.

EN: The review gives greater visibility to contextual Clean/Hexagonal Architecture, Vertical Slice, DDD and CQRS choices; workload-driven EF/Dapper/SQL/Redis; custom streaming and historical RabbitMQ; Outbox/Inbox, ordering, duplicates, retries, error queues and replay; OpenTelemetry/Application Insights; Azure App Service, Functions, SQL, Storage, Key Vault, pipelines, Sonar and blue-green with manual final promotion. These are not all newly discovered technologies or simultaneous deployments in every system.

### 10. Métricas y resultados / Metrics and outcomes

| Evidencia / Evidence | Alcance / Scope |
| --- | --- |
| ~60 min → ~2 min | Mayor suite de integración, mejora acumulada de infraestructura / Largest integration suite, accumulated infrastructure improvement |
| ~1–2 llamadas API síncronas menos / fewer synchronous API calls | Por evento relevante en integraciones afectadas / Per relevant event in affected integrations |
| Menor presión y bloqueo / Lower pressure and locking | Representación de lectura de catálogo y filtros; cualitativo / Catalog and filter read representation; qualitative |
| Modernización reversible / Reversible modernization | Extracción gradual de precios de accesorios; cualitativo / Incremental accessory-pricing extraction; qualitative |

ES: No se extrapolan porcentajes de negocio, ahorros cloud, volúmenes globales ni reducción de incidencias. EN: No business percentages, cloud savings, global volumes or incident reductions are extrapolated.

### 11. Exclusiones y límites / Exclusions and boundaries

ES: gRPC, MassTransit, RAG, Qdrant/vector DB, Polly/circuit breaker, Container Apps, Grafana/Tempo y ahorro cloud cuantificado siguen sin respaldo positivo. Semantic Kernel, LiteLLM, SignalR, PostgreSQL y EF Core están confirmados en Platform934 API personal: no se convierten por ello en experiencia profesional. El agente profesional investiga, diagnostica, informa y notifica; no se afirma remediación autónoma. Se omiten notas internas y contactos privados. Lo diseñado o en progreso no se presenta como entregado.

EN: gRPC, MassTransit, RAG, Qdrant/vector DB, Polly/circuit breaker, Container Apps, Grafana/Tempo and quantified cloud savings remain unsupported. Semantic Kernel, LiteLLM, SignalR, PostgreSQL and EF Core are confirmed in personal Platform934 API work and are not thereby promoted to professional experience. The professional agent investigates, diagnoses, reports and notifies; autonomous remediation is not claimed. Internal notes and private contacts are excluded. Designed or in-progress capabilities are not presented as delivered.

### 12. Proyectos y Arcade / Projects and Arcade

ES: Nueve laboratorios agrupados en tres ecosistemas: Platform934, Platform934 API, Stream Optimizer, Devagon Alley, Luna Tartas, Koso, Luna Studio, AntoñiOS y bio-cli. Cada uno explica propósito y trade-off, conserva su profundidad y estado, y distingue lo implementado de lo previsto. Se elimina el filtro Production vacío, se traducen los estados del catálogo y se corrige JSON-LD que atribuía lenguajes/plataformas de un proyecto a todos. Arcade consume experiencia y competencias compartidas; su diario añade problemas con revelación de la decisión real, resultados de la etapa y exploración opcional de laboratorios. La progresión y el guardado existentes se conservan.

EN: Nine labs across three ecosystems: Platform934, Platform934 API, Stream Optimizer, Devagon Alley, Luna Tartas, Koso, Luna Studio, AntoñiOS and bio-cli. Each explains purpose and trade-off, retains depth and status, and separates implemented from planned capabilities. The empty Production filter is removed, catalog statuses are localized, and JSON-LD no longer assigns one project's languages/platforms to every project. Arcade consumes shared experience and competencies; its journal adds problems with a reveal of the actual decision, chapter outcomes and optional lab exploration. Existing progression and saves remain intact.

### 13. Terminal

ES: principles se genera a partir de las decisiones; impact, a partir de logros y alcance; mode usa el perfil compartido. Se incluyen cat principles.txt y cat mode.txt como alias permitidos. whoami queda breve y se reduce la repetición del inicio. La entrada sigue siendo una lista cerrada de comandos de interfaz, con pruebas de texto hostil y sin ejecución de shell.

EN: principles is generated from decisions; impact from achievements and scope; mode from the shared profile. cat principles.txt and cat mode.txt are allowed aliases. whoami stays brief and home repetition is reduced. Input remains a closed list of interface commands, with hostile-input tests and no shell execution.

### 14. Profile y CV / Profile and CV

ES: Inicio con una introducción completa, perfil con cuatro resultados contextualizados y experiencias enlazadas a sus casos. El CV toma foco, experiencia, resultados y decisiones del modelo; los PDFs ES/EN tienen dos páginas cada uno. Se corrigieron líneas divisorias que cruzaban texto y se verificaron visualmente las cuatro páginas renderizadas. Las variantes de descarga mantienen el idioma.

EN: Home has a complete introduction, profile has four scoped outcomes, and experience links to related cases. The CV draws focus, experience, outcomes and decisions from the model; ES/EN PDFs each have two pages. Dividers crossing text were fixed and all four rendered pages were visually checked. Download variants preserve language.

### 15. Archivos modificados / Changed files

ES: Inventario del diff respecto a dcc5b8c y archivos nuevos de esta revisión. EN: Diff inventory against dcc5b8c and new files from this review.

- public/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf
- public/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf
- scripts/generate-cv-pdfs.mjs
- src/arcade/CareerGame.tsx
- src/components/AppContent.tsx
- src/components/Architecture.tsx
- src/components/Profile.tsx
- src/components/Terminal.tsx
- src/data/aiLab.ts
- src/data/architecture-presentation.ts
- src/data/cv.ts
- src/data/portfolio.ts
- src/data/professional/decisions.ts
- src/data/professional/model.ts
- src/data/professional/selectors.ts
- src/data/professional/types.ts
- src/data/professional/validation.ts
- src/data/projects.ts
- src/data/routes.ts
- src/data/terminal.ts
- src/data/ui.ts
- src/i18n/es.ts
- src/os/registry.ts
- src/styles/aura.css
- tests/a8.test.ts
- tests/e2e/a3.spec.ts
- tests/e2e/a4.spec.ts
- tests/e2e/a5.spec.ts
- tests/e2e/a6.spec.ts
- tests/e2e/atmosphere.spec.ts
- tests/e2e/desktop.spec.ts
- tests/e2e/office.spec.ts
- .gitattributes
- docs/PORTFOLIO_REVIEW_2026-09-14.md
- docs/professional-evidence.json
- docs/quality/professional-review-2026-09-14.json
- tests/e2e/professional-review.spec.ts
- tests/professional-evidence.test.ts

### 16–17. Validación y resultados / Validation and results

| Comprobación / Check | Resultado / Result |
| --- | --- |
| Prettier (componentes/datos y pruebas nuevas de esta revisión / reviewed component, data and new tests) | PASS |
| ESLint | PASS |
| Astro / TypeScript | 112 archivos / files; 0 errors, 0 warnings, 0 hints |
| Vitest | 98 / 98; 13 archivos / files |
| Build de producción / Production build | 118 páginas estáticas / static pages |
| Playwright E2E, ejecución final / final run | 155 / 155, un worker / one worker |
| Repetición focalizada de oficina / Focused office repetition | 6 / 6, ES + EN |
| Repetición focalizada de ambiente y contratación / Focused ambience and hiring repetition | 9 / 9, ES + EN |
| git diff --check | PASS |
| PDF | 2 páginas ES + 2 EN renderizadas e inspeccionadas / rendered and visually inspected |
| Privacidad / Privacy | Sin referencias del manifiesto privado en dist; checks de contactos y claims correctos / No private-manifest references in dist; contact and claim checks pass |

ES: Comandos principales: npm run check; npm run test:e2e -- --workers=1 (y ejecución final de playwright con el mismo build); node scripts/generate-cv-pdfs.mjs. Las pruebas E2E usan el puerto 4331 para no interferir con el servicio existente del usuario. Se verificaron rutas ES sin prefijo y EN con /en/, HTML sin JavaScript, cambio de idioma conservando página, anclas, teclado, foco, ventanas, scroll, Terminal, Architecture, Projects, Arcade completo, recursos y PDFs. Las pruebas nuevas comprueban 11 áreas, 14 decisiones, contenido completo al seguir enlaces, 22 referencias editoriales, límites de evidencia y consistencia entre adaptadores.

EN: Main commands: npm run check; npm run test:e2e -- --workers=1 (and the final playwright run against the same build); node scripts/generate-cv-pdfs.mjs. E2E uses port 4331 to avoid interfering with the user's existing service. Coverage includes unprefixed ES and /en/ routes, no-JavaScript HTML, page-preserving language switching, anchors, keyboard, focus, windows, scrolling, Terminal, Architecture, Projects, the complete Arcade campaign, resources and PDFs. New tests cover 11 areas, 14 decisions, full content after following links, 22 editorial references, evidence boundaries and adapter consistency.

ES: Durante la validación se corrigieron expectativas anteriores (dos resultados y filtro Production) y sincronización de pruebas Arcade. Los diálogos esperan su cierre antes de enviar otra tecla; el reloj de prueba parte de una fecha explícita para evitar diferencias entre reloj del proceso y navegador. No se relajaron las aserciones funcionales del juego. La ejecución final completa pasó después de esas correcciones.

EN: Validation corrected previous expectations (two outcomes and the Production filter) and Arcade test synchronization. Tests wait for dialogs to close before sending another key; the mock clock starts from an explicit date to avoid process/browser clock differences. Game functionality assertions were not relaxed. The final full run passed after these corrections.

ES: Revisión visual mediante navegador a 1440, 820 y 390 px: lectura, espacios, scroll, Terminal maximizado/minimizado/restaurado conservando salida, Projects y casos de Architecture; cambio ES/EN manteniendo caso. Las pruebas automatizadas amplían esa cobertura a 768 px y al juego táctil. Los cuatro renders finales del CV se inspeccionaron de nuevo tras la última generación.

EN: Browser visual review at 1440, 820 and 390 px covered reading, spacing, scrolling, Terminal maximize/minimize/restore with retained output, Projects and Architecture cases, including page-preserving ES/EN switching. Automated tests extend coverage to 768 px and touch gameplay. All four final CV renders were inspected again after the last generation.

| Lighthouse local móvil / Local mobile Lighthouse | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| / | 99 | 100 | 100 | 100 | 1.956 s | 0 |
| /architecture/ | 99 | 100 | 100 | 100 | 1.968 s | 0 |
| /en/profile/ | 99 | 100 | 100 | 100 | 1.955 s | 0 |

ES: Medición con throttling móvil simulado y preview local; no representa datos de usuarios reales ni garantiza iguales resultados en producción. TBT 0 ms en las tres rutas. Snapshot en docs/quality/professional-review-2026-09-14.json. Vista previa final disponible en http://127.0.0.1:4332/.

EN: Measurements use simulated mobile throttling and local preview; they are not field data and do not guarantee identical production results. TBT is 0 ms on all three routes. Snapshot: docs/quality/professional-review-2026-09-14.json. Final local preview: http://127.0.0.1:4332/.

### 18. Mejoras futuras / Future improvements

ES: Completar alternativas y mediciones de los casos únicamente cuando aparezca evidencia primaria; añadir medición de campo si se autoriza instrumentación; ampliar los encuentros de Arcade con mecánicas opcionales sin duplicar hechos; definir un comando de formato estable para todo el repositorio. Ninguna de estas ampliaciones se presenta como entregada. No se ha desplegado ni enviado cambios al remoto.

EN: Complete case alternatives and measurements only when primary evidence becomes available; add field measurements if instrumentation is authorized; expand Arcade encounters with optional mechanics without duplicating facts; define a stable repository-wide formatting command. None of these extensions is represented as delivered. No deployment or remote push was performed.
