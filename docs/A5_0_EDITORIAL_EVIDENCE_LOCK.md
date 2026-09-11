# A5.0 Editorial Evidence Lock

## Method

### Sources reviewed

- `docs/ANTONIO_OS_AUDIT_2026-09-10.md`, including the Architecture case boundaries and the public-content limits.
- `docs/A2_PUBLIC_MODEL.md`, including the bilingual/public-visibility contract, editorial pending rules and the four case IDs.
- `docs/A3_IDENTITY_PROFILE.md`, including the statement that case-study completion was outside A3.
- `docs/A4_EXPERIENCE_COMPETENCIES.md`, including the existing case cross-links and the A5 boundary.
- `src/data/professional/model.ts`, `types.ts`, `selectors.ts` and `validation.ts`.
- No local copy of the private editorial repository was found. No private source was connected to the build or copied into this repository.

The real `ArchitectureCaseStudy` type has `id`, `slug`, `title`, `summary`, the nine editorial sections `context`, `problem`, `constraints`, `options`, `decision`, `tradeoffs`, `implementation`, `result`, `learning`, plus `claimIds`, `experienceIds`, `competencyIds` and `achievementIds`. It has no `diagram` property. `diagram` is therefore audited below as the requested conceptual-documentation field, without changing the model.

### Classification rules

- **CONFIRMED**: sufficient public, curated evidence exists to state the fact without invention.
- **MISSING**: the reviewed sources do not contain the required fact.
- **PENDING_EDITORIAL**: factual groundwork exists, but a personal interpretation, historical framing or editorial decision is still required from Antonio.
- Pending model sections are not public: selectors omit them and validation rejects content inside them.
- Alternatives are historical only when a source explicitly records them as considered alternatives. Technical plausibility is not evidence.
- Metrics remain approximate. `~60 minutes → ~2 minutes` is the only testing timing basis; `≈30x` is only derived arithmetic (`60 / 2 ≈ 30`), not an independent measurement.
- All wording below is bilingual in substance. The document is an audit, not final case-study copy.

### Privacy

Only public-model IDs, curated evidence summaries and non-sensitive abstractions are included. No customer names, private system names, people or operational identifiers are included. The one stored-procedure reference is kept at the already approved generic level: large, untested pricing responsibility, with accessory pricing only where the public model already says so.

## Global findings

Across the four cases and the requested fields, including `id`, `slug`, `title`, `summary`, the nine typed editorial sections and the conceptual `diagram` audit: **CONFIRMED: 48; MISSING: 9; PENDING_EDITORIAL: 7**. These counts classify field-level evidence in this matrix; they do not count relation IDs separately.

The model IDs are exactly: `vehicle-read-model`, `testing-infrastructure`, `event-summaries`, and `legacy-modernization`. No relation-ID bug was found in the reviewed model. The model has no `diagram` field, so no diagram relation or stored diagram content is being claimed.

## vehicle-read-model

### Current public state

ID: `vehicle-read-model`  
Slug: `vehicle-read-model`  
Current section status: `context`, `problem`, `constraints`, `decision`, `tradeoffs` and `result` are `published`; `options`, `implementation` and `learning` are `pending_editorial`.  
PUBLISHABLE NOW: **PARTIAL**. The core problem, boundary, decision and bounded result can be published; implementation detail and historical alternatives must remain omitted.

### Evidence matrix

| Field | Status | Evidence source | Public wording limit | Do not say |
|---|---|---|---|---|
| id | CONFIRMED | `model.ts`: case entry ID | Use `vehicle-read-model` as the stable ID. / Usar `vehicle-read-model` como ID estable. | Do not rename it or introduce another case. |
| slug | CONFIRMED | `model.ts`: case slug | Use `vehicle-read-model` as the slug. / Usar `vehicle-read-model` como slug. | Do not create a translated or new slug. |
| title | CONFIRMED | `model.ts`: localized title | “Modelo de lectura de vehículos” / “Vehicle read model”. | Do not label it as CQRS. |
| summary | CONFIRMED | `model.ts`: localized summary | Repeated reads were isolated with explicit consistency requirements. / Se aislaron lecturas repetitivas con requisitos explícitos de consistencia. | Do not call it a formal CQRS, Event Sourcing or cache architecture. |
| context | CONFIRMED | `model.ts`; Audit §9 Architecture | Catalogue and filters frequently read vehicle state. / Catálogo y filtros consultaban con frecuencia el estado de vehículos. | Do not name a customer, system or traffic volume. |
| problem | CONFIRMED | `model.ts`; claim `vehicle-read-model-claim` | The read path depended on a costly stored procedure over heavily read and updated operational tables. / La lectura dependía de una stored procedure costosa sobre tablas operacionales muy leídas y actualizadas. | Do not add line count, duration, schema, database or performance percentage. |
| constraints | CONFIRMED | `model.ts`; Audit §9 Architecture | Critical operations had to access exact current state. / Las operaciones críticas debían acceder al estado actual exacto. | Do not claim every operation required strong consistency. |
| options | MISSING | `model.ts` marks `pending_editorial`; Audit §9 explicitly forbids an invented historical option list. | No historical alternatives can be published. / No pueden publicarse alternativas históricas. | Do not list Redis, Elasticsearch, replicas, Kafka, materialized views, microservices or CQRS as considered options. |
| decision | CONFIRMED | `model.ts`; claim `ev-vehicle-read-model` | An optimized representation was created for repeated reads. / Se creó una representación optimizada para lecturas repetitivas. | Do not assert the mechanism, engine or formal architecture pattern. |
| tradeoffs | CONFIRMED | `model.ts`; Audit §9 Architecture | Catalogue and filters accept eventual consistency; critical operations query the source of truth. / Catálogo y filtros aceptan consistencia eventual; operaciones críticas consultan la fuente de verdad. | Do not generalize eventual consistency to all operations. |
| implementation | MISSING | `model.ts` marks `pending_editorial`; no public source gives the update mechanism. | Omit implementation details. / Omitir detalles de implementación. | Do not claim events, refresh frequency, replicas, cache, broker or independent service. |
| result | CONFIRMED | `model.ts`; claim `vehicle-read-model-claim`; Audit §9 Architecture | Read-heavy workload was isolated from critical transactional queries. / La carga intensiva de lectura quedó aislada de las consultas transaccionales críticas. | Do not add latency, throughput, cost or percentage improvements. |
| learning | PENDING_EDITORIAL | `model.ts` marks `pending_editorial`; facts support a consistency boundary but no personal learning statement. | Publish only after Antonio states the personal technical conclusion. / Publicar solo cuando Antonio declare su conclusión técnica personal. | Do not write “I learned that all reads need different consistency” as Antonio’s quote or learning. |
| diagram | CONFIRMED | Audit §9 Architecture; published context/decision/tradeoff/result | A conceptual diagram may show operational source, optimized read representation, read-heavy consumers and exact-state critical operations. / Un diagrama conceptual puede mostrar fuente operacional, representación optimizada, consumidores de lectura y operaciones de estado exacto. | Do not draw a broker, cache, database replica, CQRS split or event edge. |
| claimIds | CONFIRMED | `model.ts`; validation references `vehicle-read-model-claim` | The case references `vehicle-read-model-claim`. / El caso referencia `vehicle-read-model-claim`. | Do not treat the claim ID as evidence of unrecorded implementation details. |
| relations | CONFIRMED | `model.ts`; validation; A4 cross-link statement | Experience `domingo-alonso`; competencies `software-architecture`, `performance-engineering`, `sql-data-architecture`; no achievements; no projects. / Experiencia `domingo-alonso`; competencias indicadas; sin logros ni proyectos. | Do not add relations to projects or achievements. |

### Confirmed facts

- Catalogue and filters repeatedly read vehicle state.
- The read path depended on a costly stored procedure over operational tables that were heavily read and updated.
- Critical operations retained exact current-state access.
- An optimized read representation was created.
- Eventual consistency is accepted for catalogue and filters; critical operations use the source of truth.
- The supported result is isolation of read-heavy workload from critical transactional queries.

### Unsupported statements

- Historical alternatives considered are not documented.
- No formal CQRS, Event Sourcing, Redis, Elasticsearch, SQL replica, Kafka, materialized view, distributed cache or independent microservice is evidenced.
- No update/event mechanism, refresh frequency, SLA, latency, throughput, cost or percentage result is evidenced.
- No personal learning statement is evidenced.

### Questions for Antonio

1. What historical alternatives did you actually consider before creating the optimized representation? If none were explicitly compared, say so.
2. How was the optimized representation updated, at the level of detail safe to publish?
3. What personal technical conclusion, if any, did you take from separating eventual-consistency reads from exact-state operations?

### Diagram evidence

Status: **CONFIRMED** for a conceptual boundary diagram; implementation-level diagram remains **MISSING**.  
Nodes:
- operational source of vehicle state
- optimized read representation
- catalogue/filter consumers
- critical operations
Edges:
- catalogue/filter reads use the optimized representation
- critical operations read the source of truth
Unsupported nodes: event broker, cache technology, replica, search engine, CQRS command/query services, refresh worker.

### Relations

Experience: `domingo-alonso`  
Competencies: `software-architecture`, `performance-engineering`, `sql-data-architecture`  
Achievements: none  
Projects: none  
Relation issue: none found.

## testing-infrastructure

### Current public state

ID: `testing-infrastructure`  
Slug: `testing-infrastructure`  
Current section status: `context`, `problem`, `decision`, `implementation` and `result` are `published`; `constraints`, `options`, `tradeoffs` and `learning` are `pending_editorial`.  
PUBLISHABLE NOW: **PARTIAL**. A bounded infrastructure-and-result account is possible, but causal attribution, historical alternatives and personal learning must be omitted.

### Evidence matrix

| Field | Status | Evidence source | Public wording limit | Do not say |
|---|---|---|---|---|
| id | CONFIRMED | `model.ts`: case entry ID | Use `testing-infrastructure`. / Usar `testing-infrastructure`. | Do not rename it. |
| slug | CONFIRMED | `model.ts`: case slug | Use `testing-infrastructure`. / Usar `testing-infrastructure`. | Do not create another route. |
| title | CONFIRMED | `model.ts`: localized title | “Infraestructura de testing” / “Testing infrastructure”. | Do not present it as one monolithic project unless confirmed. |
| summary | CONFIRMED | `model.ts`: localized summary | A shared foundation for useful, fast and diagnosable tests. / Una base compartida para pruebas útiles, rápidas y diagnosticables. | Do not claim every listed technique belonged to one initiative without editorial confirmation. |
| context | CONFIRMED | `model.ts`; Audit §9 Architecture | Fragility, complexity and execution time hindered effective integration testing. / Fragilidad, complejidad y tiempo impedían usar eficazmente las pruebas de integración. | Do not add a test count or specific failure rate. |
| problem | CONFIRMED | `model.ts`; achievement `integration-suite-feedback` | The largest integration suite took approximately one hour to provide feedback. / La mayor suite de integración tardaba aproximadamente una hora en dar feedback. | Do not state that all suites took one hour. |
| constraints | MISSING | `model.ts` marks `pending_editorial`; no public source defines the project constraints. | Omit unconfirmed constraints. / Omitir restricciones no confirmadas. | Do not infer legacy compatibility, CI budget, team size or database restrictions. |
| options | MISSING | `model.ts` marks `pending_editorial`; Audit forbids invented comparisons. | No historical options are publishable. / No son publicables alternativas históricas. | Do not invent old-vs-new infrastructure or framework A-vs-B comparisons. |
| decision | CONFIRMED | `model.ts`; Audit §9 Architecture | A common infrastructure was initiated, with tests separated by boundary and legacy characterization. / Se impulsó una infraestructura común, separando pruebas por frontera y caracterizando legado. | Do not imply a single completed program included every technique below. |
| tradeoffs | PENDING_EDITORIAL | Facts identify techniques, but no public source states which costs or tradeoffs were consciously accepted. | Publish only an Antonio-confirmed tradeoff. / Publicar solo un trade-off confirmado por Antonio. | Do not claim speed was traded for fidelity, isolation, maintenance or coverage without evidence. |
| implementation | CONFIRMED | `model.ts`; Audit §9 Architecture; testing competency evidence | Publicly name Object Mothers, semantic contracts/naming, persistence abstractions, EF/Dapper and WireMock/TestServer as supported techniques. / Pueden nombrarse esas técnicas como evidencia respaldada. | Do not claim each technique caused the timing result, or that they were one project. |
| result | CONFIRMED | `model.ts`; achievement and claim `testing-improvement`; A4 §Achievements | The largest suite changed from approximately 60 minutes to approximately 2 minutes. `≈30x` is DERIVED arithmetic only. / La mayor suite pasó aproximadamente de 60 a 2 minutos; `≈30x` solo es cálculo derivado. | Do not present 30x as an independent measurement or attribute the ~58 minutes to one technique. |
| learning | PENDING_EDITORIAL | `model.ts` marks `pending_editorial`; no personal reflection is recorded. | Ask for Antonio’s conclusion before publishing it. / Pedir la conclusión de Antonio antes de publicarla. | Do not turn a generic testing principle into a personal learning. |
| diagram | CONFIRMED | `model.ts` implementation and Audit §9 Architecture | A conceptual diagram may show test boundaries, shared infrastructure, persistence abstraction and external-service test boundary. / Puede mostrarse un diagrama conceptual de fronteras y abstracciones. | Do not draw an exact CI topology, database setup or causal pipeline. |
| claimIds | CONFIRMED | `model.ts`; claim `testing-improvement`; validation | The case references `testing-improvement`. / El caso referencia `testing-improvement`. | Do not use it to infer causal attribution. |
| relations | CONFIRMED | `model.ts`; validation; A4 cross-link statement | Experience `domingo-alonso`; competency `testing-quality`; achievement `integration-suite-feedback`; no projects. / Relaciones indicadas; sin proyecto. | Do not add a project relation. |

### Confirmed facts

- Integration testing was hindered by fragility, complexity and execution time.
- The largest integration suite moved from approximately 60 minutes to approximately 2 minutes.
- A common infrastructure was initiated with boundary separation and legacy characterization.
- Publicly supported implementation terms include Object Mothers, semantic contracts/naming, persistence abstractions, EF, Dapper, WireMock and TestServer.
- The approximate ratio `60 / 2 ≈ 30` is DERIVED, not an independent metric.

### Unsupported statements

- No historical alternative list or framework comparison is documented.
- No causal percentage or causal split is documented for Dapper, Object Mothers, parallelization, mocking, TestServer or database strategy.
- No exact number of tests, team size, CI architecture, database topology or coverage change is documented.
- No personal learning statement is documented.

### Questions for Antonio

1. Which of the listed testing techniques came from this same initiative, and which came from separate efforts?
2. What constraints did the initiative have that are safe to publish?
3. What tradeoff did you consciously accept when changing the testing infrastructure?
4. Which historical alternatives, if any, were actually considered before the chosen approach?
5. What personal lesson, if any, do you want to attach to the change from approximately 60 minutes to approximately 2 minutes?

### Diagram evidence

Status: **CONFIRMED** for a conceptual diagram; exact runtime topology is **MISSING**.  
Nodes:
- test boundary
- shared testing infrastructure
- semantic test contracts/Object Mothers
- persistence abstraction
- EF/Dapper boundary
- WireMock/TestServer boundary
Edges:
- tests use shared infrastructure and semantic test data/contracts
- persistence tests cross the persistence abstraction through EF/Dapper
- integration boundaries use WireMock/TestServer where supported
Unsupported nodes: specific CI runners, parallelization coordinator, database instances, queues, framework comparison branches.

### Relations

Experience: `domingo-alonso`  
Competencies: `testing-quality`  
Achievements: `integration-suite-feedback`  
Projects: none  
Relation issue: none found.

## event-summaries

### Current public state

ID: `event-summaries`  
Slug: `event-summaries`  
Current section status: `context`, `problem`, `decision` and `result` are `published`; `constraints`, `options`, `tradeoffs`, `implementation` and `learning` are `pending_editorial`.  
PUBLISHABLE NOW: **PARTIAL**. The bounded integration result and general decision are publishable; payload, compatibility and tradeoff details are not.

### Evidence matrix

| Field | Status | Evidence source | Public wording limit | Do not say |
|---|---|---|---|---|
| id | CONFIRMED | `model.ts`: case entry ID | Use `event-summaries`. / Usar `event-summaries`. | Do not rename it. |
| slug | CONFIRMED | `model.ts`: case slug | Use `event-summaries`. / Usar `event-summaries`. | Do not create another route. |
| title | CONFIRMED | `model.ts`: localized title | “Eventos resumen” / “Event summaries”. | Do not relabel it as formal event-carried state transfer. |
| summary | CONFIRMED | `model.ts`: localized summary | More context in events reduced synchronous coupling. / Más contexto en eventos redujo acoplamiento síncrono. | Do not claim all synchronous coupling was removed. |
| context | CONFIRMED | `model.ts`; Audit §9 Architecture | Consumers needed additional context while processing certain events. / Los consumidores necesitaban contexto adicional al procesar ciertos eventos. | Do not name consumers or systems. |
| problem | CONFIRMED | `model.ts`; Audit §9 Architecture | Affected integrations made synchronous API calls to complete that context. / Las integraciones afectadas hacían llamadas API síncronas para completar el contexto. | Do not generalize to the whole platform. |
| constraints | MISSING | `model.ts` marks `pending_editorial`; no public constraint set is recorded. | Omit constraints beyond the affected integration boundary. / Omitir restricciones no documentadas. | Do not invent payload, compatibility, ordering, delivery or schema constraints. |
| options | MISSING | `model.ts` marks `pending_editorial`; Audit §9 forbids inferred patterns/options. | No historical alternatives are publishable. / No son publicables alternativas históricas. | Do not invent queues, brokers, synchronous variants or schema alternatives as considered options. |
| decision | CONFIRMED | `model.ts`; competency `event-driven-architecture` | Summary events were designed with the context required by downstream consumers. / Se diseñaron eventos resumen con el contexto requerido por consumidores downstream. | Do not claim Event Sourcing, exactly-once or a named broker. |
| tradeoffs | PENDING_EDITORIAL | Audit §9 says payload/versioning may be a general trade-off, not a documented historical decision. | A general trade-off can be discussed only as editorial framing, not as a historical fact. / Un trade-off general solo puede presentarse como marco editorial. | Do not say a specific payload or compatibility cost was accepted historically. |
| implementation | MISSING | `model.ts` marks `pending_editorial`; no payload shape or update flow is public. | Omit implementation detail. / Omitir detalle de implementación. | Do not invent event fields, schema registry, serialization, broker or delivery guarantees. |
| result | CONFIRMED | `model.ts`; claim `event-summary-improvement`; achievement; A4 §Achievements | Approximately 1–2 synchronous API calls were removed per relevant event in affected integrations. / Se eliminaron aproximadamente 1–2 llamadas por evento relevante en integraciones afectadas. | Do not claim total removal, global reduction, exact latency, throughput, cost or event count. |
| learning | PENDING_EDITORIAL | `model.ts` marks `pending_editorial`; no personal reflection is recorded. | Ask Antonio for the personal conclusion. / Pedir la conclusión personal a Antonio. | Do not present a generic event-driven principle as his learning. |
| diagram | CONFIRMED | `model.ts` context/decision/result; Audit §9 Architecture | A conceptual diagram may show event, downstream consumer and the former affected synchronous context lookup boundary, with summary event context replacing that lookup. / Puede mostrar evento, consumidor y límite de llamadas síncronas afectadas. | Do not draw a specific broker, schema registry, protocol or delivery guarantee. |
| claimIds | CONFIRMED | `model.ts`; claim `event-summary-improvement`; validation | The case references `event-summary-improvement`. / El caso referencia `event-summary-improvement`. | Do not expand its scope beyond affected integrations and relevant events. |
| relations | CONFIRMED | `model.ts`; validation; A4 cross-link statement | Experience `domingo-alonso`; competencies `distributed-systems`, `event-driven-architecture`; achievement `event-summary-api-calls`; no projects. / Relaciones indicadas; sin proyecto. | Do not add a project relation. |

### Confirmed facts

- Certain consumers needed additional context for certain events.
- Affected integrations previously made synchronous API calls to complete that context.
- Summary events were designed with required downstream context.
- The bounded result is approximately 1–2 synchronous API calls removed per relevant event in affected integrations.

### Unsupported statements

- Event payload, schema, compatibility, ordering, delivery and consumer details are missing.
- No historical alternatives are documented.
- No named broker, Event Sourcing, event-carried-state-transfer formalism, schema registry, protobuf/Avro or exactly-once guarantee is evidenced.
- No global performance, latency, throughput, cost or total-call reduction is evidenced.
- No personal learning statement is evidenced.

### Questions for Antonio

1. What minimum context did the summary event carry, at a publishable level?
2. What did the consumer previously need the synchronous calls to obtain?
3. Which compatibility or payload tradeoff was actually considered and accepted, if any?
4. What personal technical conclusion, if any, did you take from moving context into the event?

### Diagram evidence

Status: **CONFIRMED** for a boundary diagram; payload-level diagram is **MISSING**.  
Nodes:
- relevant event
- summary event context
- downstream consumer
- affected synchronous API lookup boundary
Edges:
- relevant event reaches downstream consumer with summary context
- summary context removes approximately 1–2 affected synchronous API calls per relevant event
Unsupported nodes: broker, schema registry, serialization format, retry/dead-letter infrastructure, exactly-once processor.

### Relations

Experience: `domingo-alonso`  
Competencies: `distributed-systems`, `event-driven-architecture`  
Achievements: `event-summary-api-calls`  
Projects: none  
Relation issue: none found.

## legacy-modernization

### Current public state

ID: `legacy-modernization`  
Slug: `legacy-modernization`  
Current section status: `context`, `problem`, `constraints`, `decision`, `tradeoffs` and `implementation` are `published`; `options`, `result` and `learning` are `pending_editorial`.  
PUBLISHABLE NOW: **PARTIAL**. The risk-based strategy and anonymized accessory-pricing implementation are supported; a single incident framing and concrete result require editorial closure.

### Evidence matrix

| Field | Status | Evidence source | Public wording limit | Do not say |
|---|---|---|---|---|
| id | CONFIRMED | `model.ts`: case entry ID | Use `legacy-modernization`. / Usar `legacy-modernization`. | Do not rename it. |
| slug | CONFIRMED | `model.ts`: case slug | Use `legacy-modernization`. / Usar `legacy-modernization`. | Do not create another route. |
| title | CONFIRMED | `model.ts`: localized title | “Modernización gradual del legado” / “Incremental legacy modernization”. | Do not frame every technique as one incident. |
| summary | CONFIRMED | `model.ts`; claim `legacy-modernization-claim` | Reversible strategies were adjusted to risk and expected change frequency. / Estrategias reversibles ajustadas al riesgo y frecuencia de cambio. | Do not call it a universal recipe. |
| context | CONFIRMED | `model.ts`; Audit §9 Architecture | Some pricing responsibilities lived in large untested stored procedures. / Parte de la lógica de precios estaba en stored procedures grandes sin pruebas. | Do not publish lines, duration, customer, tables, volume or procedure name. |
| problem | CONFIRMED | `model.ts`; claim `legacy-modernization-claim` | Change had to preserve stable behavior and a safe fallback path. / El cambio debía preservar comportamiento estable y una vía segura de retorno. | Do not claim a specific incident, bug count or quantified risk. |
| constraints | CONFIRMED | `model.ts`; Audit §9 Architecture | The strategy distinguished one-off changes from areas expected to evolve. / La estrategia diferenciaba cambios puntuales de áreas destinadas a evolucionar. | Do not claim this distinction applied identically in every project. |
| options | MISSING | `model.ts` marks `pending_editorial`; Audit explicitly forbids invented rejected options. | No historical alternatives are publishable. / No son publicables alternativas históricas. | Do not say full rewrite, microservices, DDD or modular monolith were considered alternatives. |
| decision | PENDING_EDITORIAL | `model.ts` records a repeated risk-based strategy, but the source does not establish one unique case history. | Publish as a documented strategy unless Antonio confirms a specific case framing. / Publicar como estrategia documentada salvo que Antonio confirme un caso concreto. | Do not turn a recurring practice into a single beginning-to-end incident. |
| tradeoffs | CONFIRMED | `model.ts`; Audit §9 Architecture | One-off changes use minimum safe intervention; evolving areas accept more infrastructure for verification and reversal. / Cambios puntuales usan mínima intervención segura; áreas evolutivas aceptan más infraestructura. | Do not claim a specific project accepted an unrecorded cost. |
| implementation | CONFIRMED | `model.ts`; competency `legacy-modernization`; Audit §9 Architecture | Characterization/Golden Master, seam or wrapper, old/new execution, controlled verification, progressive Strangler and feature toggles/rollback may be described as conditional techniques; accessory-pricing responsibility was progressively extracted while retaining legacy fallback. / Técnicas condicionales y extracción de precios de accesorios con fallback legacy. | Do not claim both patterns were always applied, or expose proprietary implementation details. |
| result | MISSING | `model.ts` marks `pending_editorial`; the public source gives no observable result beyond retained fallback/strategy. | Omit a quantified or case-specific result. / Omitir resultado cuantificado o específico. | Do not invent percentage improvement, bugs avoided, duration, lines, volume or successful rollout scope. |
| learning | PENDING_EDITORIAL | `model.ts` marks `pending_editorial`; strategy facts exist but no personal reflection. | Ask Antonio for the personal lesson. / Pedir a Antonio el aprendizaje personal. | Do not claim he learned that Strangler or characterization is always best. |
| diagram | CONFIRMED | `model.ts`; Audit §9 Architecture | A conditional conceptual diagram may show legacy path, characterization, seam/wrapper, old/new paths, verification, progressive extraction and fallback, with branches marked according to risk/change frequency. / Diagrama conceptual condicional, no universal production topology. | Do not show both patterns as a mandatory sequence or add microservices/DDD infrastructure. |
| claimIds | CONFIRMED | `model.ts`; claim `legacy-modernization-claim`; validation | The case references `legacy-modernization-claim`. / El caso referencia `legacy-modernization-claim`. | Do not use it to infer a single named project or quantitative result. |
| relations | CONFIRMED | `model.ts`; validation; A4 cross-link statement | Experience `domingo-alonso`; competencies `legacy-modernization`, `software-architecture`; no achievements; no projects. / Relaciones indicadas; sin logros ni proyectos. | Do not add other company or project relations. |

### Confirmed facts

- Some pricing responsibility lived in large untested stored procedures.
- Safe change required preserving stable behavior and a fallback path.
- The public strategy distinguishes one-off changes from areas expected to evolve.
- Supported techniques include characterization/Golden Master, seams, old/new execution, controlled verification, progressive Strangler, feature toggles and rollback, applied according to risk.
- Accessory-pricing responsibility is described as progressively extracted while retaining the legacy path as fallback.

### Unsupported statements

- No historical alternatives are documented.
- No full rewrite, microservices, DDD or modular-monolith comparison is evidenced.
- No procedure name, size, line count, customer, tables, duration, volume, bug count or percentage result is evidenced.
- The source does not prove that the recurring strategy describes one unique incident.
- No personal learning statement is evidenced.

### Questions for Antonio

1. Should this be presented as one specific accessory-pricing case or as a documented pattern used across multiple changes?
2. Which concrete result of the accessory-pricing extraction is safe and useful to publish, without sensitive detail?
3. Were any alternatives explicitly considered in that case? If not, confirm that no historical option list should be shown.
4. What personal conclusion, if any, do you take from choosing the smallest safe change versus progressive extraction?

### Diagram evidence

Status: **CONFIRMED** for a conditional strategy diagram; a single production-case diagram is **PENDING_EDITORIAL**.  
Nodes:
- legacy logic/path
- characterization or Golden Master
- seam/wrapper
- old path and new path
- controlled verification
- progressive extraction/Strangler stage
- feature toggle or rollback path
Edges:
- characterization precedes a safe change
- seam enables comparison or extraction
- old/new execution can feed controlled verification
- fallback remains available where risk requires it
Unsupported nodes: mandatory microservice boundary, DDD model, rewrite branch, named databases, customer systems.

### Relations

Experience: `domingo-alonso`  
Competencies: `legacy-modernization`, `software-architecture`  
Achievements: none  
Projects: none  
Relation issue: none found.

# Human review required

## P0 — necessary to publish case coherently

1. **Vehicle read model:** confirm whether the case should remain a bounded read-model decision without naming an architecture pattern, and provide the safe-to-publish update mechanism if implementation is required.
2. **Testing infrastructure:** confirm which techniques belonged to the same initiative and whether any historical alternatives were actually considered.
3. **Event summaries:** provide the publishable event context and confirm the exact affected boundary; otherwise publish only the current bounded result.
4. **Legacy modernization:** decide whether the framing is one accessory-pricing case or a recurring strategy, and provide a safe-to-publish result if it is a case.

## P1 — improves case but case can publish without it

1. **Vehicle read model:** state the personal technical learning, if any.
2. **Testing infrastructure:** state the accepted tradeoff and personal learning, if any.
3. **Event summaries:** confirm any historical payload/compatibility tradeoff and personal learning, if any.
4. **Legacy modernization:** confirm any concrete historical alternatives and personal learning, if any.

## P2 — optional detail

1. **Vehicle read model:** confirm whether any additional anonymized result can be stated without a new metric.
2. **Testing infrastructure:** clarify whether semantic naming refers specifically to contracts, test names or both.
3. **Event summaries:** clarify whether any non-sensitive consumer role can be named generically in a conceptual diagram.
4. **Legacy modernization:** confirm whether the conditional diagram should show both low-iteration and continuous-evolution branches.
