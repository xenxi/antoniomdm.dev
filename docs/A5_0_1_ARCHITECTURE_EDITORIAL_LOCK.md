# A5.0.1 Architecture Editorial Lock

Status: HUMAN_APPROVED_EDITORIAL_SOURCE  
Date: 2026-09-11

## Purpose

This document records additional architecture evidence and personal
engineering conclusions explicitly confirmed by Antonio after the A5.0
evidence audit.

Rules:

- It supplements A2 for A5 architecture case-study authoring.
- It does not automatically change the public model.
- A5.1 must consume only claims explicitly approved here or already approved by A2.
- No historical alternative may be inferred.
- No metric may be generalized beyond its documented scope.
- Conceptual diagrams are explanatory and are not literal production topology diagrams.

This is an editorial source, not final website copy. English technical terminology is retained where it is the most precise expression. The approved content is recorded in both Spanish and English in substance for the repository's bilingual editorial contract.

## Scope And Editorial Boundaries

The four approved architecture case-study IDs are:

- `vehicle-read-model`
- `testing-infrastructure`
- `event-summaries`
- `legacy-modernization`

The `ArchitectureCaseStudy` type currently has no `diagram` field. Diagram facts below are presentation guidance for A5.1 only; this document does not alter the type or public model.

## Vehicle Read Model

Case ID: `vehicle-read-model`  
Título / Title: Modelo de lectura de vehículos / Vehicle read model

### Context / Contexto

Originally, obtaining vehicle details depended on a legacy stored procedure/path that resolved vehicles for an entire company rather than allowing the relevant state of a single vehicle to be obtained cheaply. Even a question such as whether a vehicle was reserved could require resolving pricing, validations, locking and other logic across the company's vehicle set. This created database pressure and could block both internal use cases and external consumers.

Originalmente, obtener detalles de vehículos dependía de una stored procedure o ruta legacy que resolvía los vehículos de una empresa completa, en lugar de permitir obtener de forma económica el estado relevante de un único vehículo. Incluso una pregunta como si un vehículo estaba reservado podía requerir resolver precios, validaciones, bloqueos y otra lógica sobre el conjunto de vehículos de la empresa. Esto generaba presión sobre la base de datos y podía bloquear casos de uso internos y consumidores externos.

### Problem / Problema

The objective was to reduce dependency on this expensive shared read path without waiting for a complete rewrite or optimization of the legacy implementation.

El objetivo era reducir la dependencia de esta ruta de lectura compartida y costosa sin esperar a una reescritura u optimización completa de la implementación legacy.

### Evolution / Evolución

#### Phase 1 / Fase 1

A background service populated a vehicle projection in a table belonging to the system. Population and updates used bulk operations. Reads that did not require the authoritative transactional path could use this projection.

Un servicio en segundo plano poblaba una proyección de vehículos en una tabla perteneciente al sistema. La población y las actualizaciones usaban operaciones bulk. Las lecturas que no requerían la ruta transaccional autoritativa podían usar esta proyección.

Confirmed result / Resultado confirmado: this reduced pressure on the database and dependent systems / redujo la presión sobre la base de datos y los sistemas dependientes.

#### Phase 2 / Fase 2

The approach evolved toward incremental updates. At strategic update points, changes were registered using the Outbox Pattern and corresponding events were emitted. Those events updated the vehicle projection as state changed.

El enfoque evolucionó hacia actualizaciones incrementales. En puntos estratégicos de actualización, los cambios se registraban mediante el patrón Outbox y se emitían los eventos correspondientes. Esos eventos actualizaban la proyección de vehículos a medida que cambiaba el estado.

Confirmed result / Resultado confirmado: this further reduced pressure on the legacy/database read path / redujo aún más la presión sobre la ruta de lectura legacy/de base de datos.

The case must not be described as making the entire system event-driven. It must not claim exactly-once delivery, Event Sourcing or automatically label the architecture CQRS. No broker, database or infrastructure technology is confirmed.

El caso no debe describirse como una transformación de todo el sistema en event-driven. No debe afirmar exactly-once, Event Sourcing ni etiquetar automáticamente la arquitectura como CQRS. No hay confirmación de broker, base de datos o tecnología de infraestructura concreta.

### Current Evolution / Evolución actual

The legacy code/path continues to be progressively optimized and to lose responsibilities. The projection/event approach bought time for incremental evolution instead of requiring a Big Bang rewrite.

El código o ruta legacy continúa optimizándose progresivamente y perdiendo responsabilidades. El enfoque de proyección y eventos permitió evolucionar de forma incremental, en lugar de exigir una reescritura Big Bang.

### Consistency And Trade-Offs / Consistencia Y Trade-Offs

The projection does not replace authoritative state everywhere. The optimized representation is used where its guarantees are sufficient; operations requiring exact or authoritative state may still use the authoritative source.

La proyección no sustituye al estado autoritativo en todas partes. La representación optimizada se usa donde sus garantías son suficientes; las operaciones que requieren estado exacto o autoritativo pueden seguir usando la fuente autoritativa.

Approved concepts / Conceptos aprobados:

- additional representation of state / representación adicional del estado;
- synchronization responsibility / responsabilidad de sincronización;
- explicit consistency decisions / decisiones explícitas de consistencia;
- recovery and reconciliation must be considered / se deben considerar recuperación y reconciliación;
- eventual consistency where appropriate / consistencia eventual cuando sea apropiado.

No reconciliation implementation details are documented.

No se documentan detalles de implementación de reconciliación.

### Result / Resultado

Safe public result / Resultado público seguro:

- database/read-path pressure was reduced / se redujo la presión sobre la base de datos y la ruta de lectura;
- incremental event-driven evolution reduced it further / la evolución incremental basada en eventos la redujo aún más;
- the solution bought time for progressive modernization of the legacy path / la solución permitió tiempo para modernizar progresivamente la ruta legacy.

No percentages, latency, throughput or other invented metrics may be added.

No deben añadirse porcentajes, latencia, throughput ni otras métricas inventadas.

### Learning / Aprendizaje

Antonio did not learn eventual consistency from this case; he already understood that principle.

Antonio no aprendió la consistencia eventual a partir de este caso; ya comprendía ese principio.

The reinforced personal learning was / El aprendizaje personal reforzado fue:

- clear ownership over a process matters / es importante que exista ownership claro sobre un proceso;
- shared components can couple systems and teams, and failures in heavily coupled shared paths can propagate into systems owned by other teams / los componentes compartidos pueden acoplar sistemas y equipos, y los fallos en rutas compartidas muy acopladas pueden propagarse a sistemas propiedad de otros equipos;
- modernization of this kind should be surgical / este tipo de modernización debe ser quirúrgica;
- safety nets and controlled transition mechanisms are necessary / son necesarias redes de seguridad y mecanismos de transición controlada;
- architecture should progressively recover ownership of the business capability a team needs to evolve without unnecessary risk to other teams / la arquitectura debe recuperar progresivamente el ownership de la capacidad de negocio que un equipo necesita evolucionar, sin crear riesgo innecesario para otros equipos.

### Historical Alternatives / Alternativas Históricas

NOT DOCUMENTED. No historical alternatives were explicitly confirmed. Redis, Elasticsearch, CQRS, replicas, Kafka and other technologies must not be presented as considered options.

NO DOCUMENTADAS. No se confirmaron alternativas históricas explícitas. Redis, Elasticsearch, CQRS, réplicas, Kafka y otras tecnologías no deben presentarse como opciones consideradas.

## Testing Infrastructure

Case ID: `testing-infrastructure`  
Título / Title: Infraestructura de testing / Testing infrastructure

### Frame / Marco

This was not one monolithic testing rewrite. It was a sequence of independent improvements introduced over time. Typical triggers were a new requirement, work in a legacy area or a testing limitation discovered while changing real production code.

No fue una reescritura monolítica del testing. Fue una secuencia de mejoras independientes introducidas con el tiempo. Los desencadenantes habituales fueron un requisito nuevo, trabajo en un área legacy o una limitación de testing descubierta al cambiar código real de producción.

The recurring engineering approach was / El enfoque de ingeniería recurrente fue:

1. identify the testing friction / identificar la fricción de testing;
2. improve or correct the affected tests / mejorar o corregir las pruebas afectadas;
3. normalize the useful pattern / normalizar el patrón útil;
4. update shared testing infrastructure when reuse was justified / actualizar la infraestructura compartida cuando la reutilización lo justificaba;
5. train and share the approach with the team / formar al equipo y compartir el enfoque;
6. make future development easier / facilitar el desarrollo futuro.

### Builder Problem / Problema Del Builder

Before Object Mothers, part of the test setup relied on a large builder working through wrappers around business entities. To obtain an entity in a desired state, tests could execute business behavior instead of simply constructing the state required by the scenario. That could trigger domain or business events, mutate unrelated state, involve behavior outside the test's intention, require complex setup and obscure test semantics.

Antes de los Object Mothers, parte de la preparación dependía de un builder grande que trabajaba mediante wrappers alrededor de entidades de negocio. Para obtener una entidad en el estado deseado, las pruebas podían ejecutar comportamiento de negocio en lugar de construir directamente el estado requerido por el escenario. Eso podía disparar eventos de dominio o negocio, mutar estado no relacionado, involucrar comportamiento ajeno a la intención de la prueba, exigir una preparación compleja y ocultar la semántica del test.

The builder could become a long sequence of setters and setup operations from which the business scenario was difficult to understand.

El builder podía convertirse en una secuencia larga de setters y operaciones de preparación difícil de interpretar desde el punto de vista del escenario de negocio.

### Object Mothers / Object Mothers

Object Mothers or factories introduced semantically meaningful states, such as an accepted offer. Their purpose was to make the scenario express what business state was needed rather than expose all mechanics required to construct it.

Los Object Mothers o factories introdujeron estados semánticamente significativos, como una oferta aceptada. Su objetivo era que el escenario expresara qué estado de negocio se necesitaba, en lugar de exponer todos los mecanismos necesarios para construirlo.

This does not establish that Object Mother is universally superior to Builder. The decision addressed the specific historical builder, design and context.

Esto no establece que Object Mother sea universalmente superior a Builder. La decisión respondía al builder, diseño y contexto históricos concretos.

### External API Testing / Testing De APIs Externas

Another historical pattern wrapped `HttpClient` primarily to expose an interface that could be mocked. This provided isolation but was not a meaningful integration test of the real HTTP contract.

Otro patrón histórico envolvía `HttpClient` principalmente para exponer una interfaz que pudiera simularse. Esto proporcionaba aislamiento, pero no constituía una prueba de integración significativa del contrato HTTP real.

WireMock-based tests were introduced for relevant scenarios. They could use representative API responses and serialization or contract definitions based on the API's OpenAPI definition. The goal was to verify behavior closer to the actual integration boundary rather than merely verify behavior against a mock configured by the same test.

Se introdujeron pruebas basadas en WireMock para escenarios relevantes. Podían usar respuestas representativas de la API y definiciones de serialización o contrato basadas en la definición OpenAPI de la API. El objetivo era verificar comportamiento más cercano al límite real de integración, en lugar de verificarlo únicamente contra un mock configurado por el mismo test.

Do not state that every external API used WireMock or that every contract was OpenAPI.

No debe afirmarse que todas las APIs externas usaban WireMock ni que todos los contratos eran OpenAPI.

### Other Techniques / Otras Técnicas

A2-confirmed techniques may remain associated with the broader testing evolution where already supported: characterization tests, integration tests, persistence-agnostic testing where applicable, EF or legacy persistence contexts where supported, TestServer and useful mock failure messages.

Las técnicas confirmadas por A2 pueden seguir asociándose a la evolución más amplia del testing cuando ya estén respaldadas: characterization tests, integration tests, testing agnóstico de persistencia cuando aplique, contextos de persistencia EF o legacy cuando estén respaldados, TestServer y mensajes de fallo útiles en mocks.

These techniques must not be forced into one simultaneous initiative.

Estas técnicas no deben forzarse dentro de una única iniciativa simultánea.

### Metric / Métrica

Approved metric / Métrica aprobada: the largest integration suite changed approximately from `~60 minutes` to `~2 minutes`.

La mayor suite de integración pasó aproximadamente de `~60 minutos` a `~2 minutos`.

If `~30x` is displayed, it is derived arithmetic only (`60 / 2 ≈ 30`), not an independent measurement. The improvement happened over time and must not be attributed to Object Mothers, Dapper, WireMock, parallelization, TestServer or any individual technique.

Si se muestra `~30x`, es solo aritmética derivada (`60 / 2 ≈ 30`), no una medición independiente. La mejora ocurrió con el tiempo y no debe atribuirse a Object Mothers, Dapper, WireMock, paralelización, TestServer ni a una técnica individual.

### Trade-Off / Trade-Off

Building custom testing infrastructure creates software that must itself be maintained. Industry-standard tools should generally be preferred where they fit.

Construir infraestructura de testing propia crea software que también debe mantenerse. En general deben preferirse herramientas estándar de la industria cuando encajen.

In this context, the team needed tooling that reduced friction in a legacy-heavy system and shifted attention from “How do I technically make this test possible?” toward “What behavior am I testing and why?”. Temporary complexity or possible overengineering was accepted pragmatically because it enabled that transition.

En este contexto, el equipo necesitaba herramientas que redujeran la fricción en un sistema con mucho legado y desplazaran la atención desde «¿Cómo hago técnicamente posible este test?» hacia «¿Qué comportamiento estoy probando y por qué?». La complejidad temporal o el posible overengineering se aceptaron pragmáticamente porque permitían esa transición.

### Learning / Aprendizaje

The lesson was pragmatism and adaptation to context. The shared library was not intended to become permanent architecture merely because it was useful at that moment.

La lección fue el pragmatismo y la adaptación al contexto. La librería compartida no pretendía convertirse en arquitectura permanente solo porque resultara útil en ese momento.

As team testing maturity increased, legacy constraints decreased and standard approaches became easier to apply, the intention was to simplify or remove unnecessary parts of the custom testing infrastructure.

A medida que aumentaba la madurez del equipo en testing, disminuían las restricciones del legado y resultaba más sencillo aplicar enfoques estándar, la intención era simplificar o eliminar las partes innecesarias de la infraestructura propia.

Approved principle / Principio aprobado: good transition infrastructure should be allowed to become simpler or less necessary as the system and team mature / una buena infraestructura de transición debe poder simplificarse o dejar de ser necesaria a medida que maduran el sistema y el equipo.

### Historical Alternatives / Alternativas Históricas

NOT DOCUMENTED. Antonio did not confirm a formal historical alternatives evaluation for the overall initiative.

NO DOCUMENTADAS. Antonio no confirmó una evaluación formal de alternativas históricas para la iniciativa global.

## Event Summaries

Case ID: `event-summaries`  
Título / Title: Eventos resumen / Event summaries

### Context / Contexto

The application exposed business-process narrative through Notification Events. Conceptual examples include a sales process created, a vehicle added and an offer accepted. Events were intentionally concise and centered on the business narrative. DDD influenced this design; no “DDD by the book” claim is appropriate.

La aplicación exponía la narrativa de procesos de negocio mediante Notification Events. Ejemplos conceptuales incluyen la creación de un proceso de venta, la incorporación de un vehículo y la aceptación de una oferta. Los eventos eran deliberadamente concisos y centrados en la narrativa de negocio. DDD influyó en este diseño; no corresponde afirmar «DDD by the book».

### Problem / Problema

Real consumers did not necessarily consume the complete event narrative. Some subscribed only to particular events relevant to them, such as `offer accepted`. When such an event arrived, a consumer could lack the context required to work. It then had to call multiple synchronous API endpoints to retrieve missing information. Some information could be needed again when subsequent events were consumed.

Los consumidores reales no necesariamente consumían la narrativa completa de eventos. Algunos se suscribían solo a eventos relevantes para ellos, como `offer accepted`. Cuando llegaba un evento así, el consumidor podía carecer del contexto necesario para trabajar. Entonces debía llamar a varios endpoints API síncronos para recuperar la información faltante. Parte de esa información podía volver a necesitarse al consumir eventos posteriores.

This produced read amplification and reintroduced temporal and operational coupling to the synchronous API.

Esto producía amplificación de lectura y reintroducía acoplamiento temporal y operativo con la API síncrona.

### Decision / Decisión

Event Summaries were introduced for affected consumption patterns. Summaries carried sufficient relevant state and context for those consumers to avoid the repeated synchronous enrichment pattern.

Se introdujeron Event Summaries para los patrones de consumo afectados. Los resúmenes transportaban estado y contexto relevante suficiente para que esos consumidores evitaran el patrón repetido de enriquecimiento síncrono.

It is acceptable to explain this concept as close to Event-Carried State Transfer because Antonio explicitly confirmed that architectural interpretation.

Es aceptable explicar este concepto como cercano a Event-Carried State Transfer porque Antonio confirmó explícitamente esa interpretación arquitectónica.

Not all events became summaries. Granular Notification Events were not removed. This is not Event Sourcing and does not claim exactly-once delivery.

No todos los eventos se convirtieron en resúmenes. Los Notification Events granulares no se eliminaron. Esto no es Event Sourcing ni afirma entrega exactly-once.

### Trade-Off / Trade-Off

Accepted costs / Costes aceptados:

- larger payloads / payloads mayores;
- some controlled data duplication / cierta duplicación controlada de datos;
- richer event contracts / contratos de eventos más ricos.

Benefit / Beneficio: reduced synchronous operational coupling for affected consumers / reducción del acoplamiento operativo síncrono para los consumidores afectados.

Do not describe this as total synchronous decoupling. All claims remain scoped to affected events and integrations.

No debe describirse como desacoplamiento síncrono total. Todas las afirmaciones quedan limitadas a los eventos e integraciones afectados.

### Result / Resultado

Approved metric / Métrica aprobada: approximately `1–2` synchronous API calls were removed per relevant event in affected integrations.

Se eliminaron aproximadamente `1–2` llamadas API síncronas por evento relevante en las integraciones afectadas.

No global API reduction, latency, throughput, percentage or infrastructure-cost claim may be added.

No deben añadirse afirmaciones sobre reducción global de API, latencia, throughput, porcentajes o coste de infraestructura.

### Learning / Aprendizaje

The learning was pragmatism over architectural purity. Architecture should account for how consumers actually use a system, not only how the theoretical model expects them to use it.

El aprendizaje fue priorizar el pragmatismo frente a la pureza arquitectónica. La arquitectura debe tener en cuenta cómo usan realmente los consumidores un sistema, no solo cómo el modelo teórico espera que lo usen.

A small, conceptually pure event can still create undesirable operational coupling if consumers must immediately perform synchronous enrichment.

Un evento pequeño y conceptualmente puro puede crear acoplamiento operativo indeseable si los consumidores deben realizar inmediatamente un enriquecimiento síncrono.

### Evolution And Reversibility / Evolución Y Reversibilidad

The summaries solve the current consumption problem without requiring the granular business narrative to disappear. If consumer behavior evolves, summaries can themselves evolve or be deprecated. This preserves architectural optionality; it is not a promise that such a migration will happen.

Los resúmenes resuelven el problema actual de consumo sin exigir que desaparezca la narrativa granular de negocio. Si evoluciona el comportamiento de los consumidores, los resúmenes pueden evolucionar o deprecarse. Esto conserva opcionalidad arquitectónica; no es una promesa de que esa migración vaya a ocurrir.

### Historical Alternatives / Alternativas Históricas

NOT DOCUMENTED. No historical alternatives were explicitly confirmed.

NO DOCUMENTADAS. No se confirmaron alternativas históricas explícitas.

## Legacy Modernization

Case ID: `legacy-modernization`  
Título / Title: Modernización gradual del legado / Incremental legacy modernization

### Framing / Enfoque

This case must be presented as a recurring modernization strategy and decision framework, not as one isolated stored-procedure project. Accessory pricing may be used as a concrete illustration of the strategy.

Este caso debe presentarse como una estrategia y marco de decisión recurrente de modernización, no como un único proyecto aislado de stored procedure. La extracción de precios de accesorios puede usarse como ilustración concreta de la estrategia.

Legacy intervention is selected according to context rather than one universal modernization strategy. The two important qualitative decision dimensions are business or operational criticality and expected frequency of change, or churn. This is not a mathematically scored matrix.

La intervención sobre legacy se selecciona según el contexto, en lugar de aplicar una estrategia universal. Las dos dimensiones cualitativas importantes son la criticidad de negocio u operativa y la frecuencia esperada de cambio, o churn. No es una matriz con puntuación matemática.

### Tactical Low-Churn Case / Caso Táctico De Bajo Churn

For a stable area receiving a small or punctual change, avoid unnecessary broad rewriting. Approved concepts include creating a seam around the affected behavior, using a wrapper or abstraction where appropriate, adding Characterization Tests, including relevant corner cases, preserving existing behavior and making the smallest safe change.

Para un área estable que recibe un cambio pequeño o puntual, se debe evitar una reescritura amplia innecesaria. Los conceptos aprobados incluyen crear un seam alrededor del comportamiento afectado, usar un wrapper o abstracción cuando corresponda, añadir Characterization Tests, incluir casos límite relevantes, conservar el comportamiento existente y realizar el cambio seguro más pequeño.

Michael Feathers' concept of seams may be referenced accurately. Not every tactical change uses exactly the same mechanics.

Puede referenciarse correctamente el concepto de seams de Michael Feathers. No todo cambio táctico usa exactamente los mismos mecanismos.

### Progressive High-Churn Or High-Risk Case / Caso Progresivo De Alto Churn O Riesgo

For actively evolving or critical components, progressive extraction strategies may include the Strangler Fig Pattern, Branch by Abstraction, an intermediate abstraction, an isolated new implementation, old/new coexistence where appropriate, Feature Toggles, parallel execution or A-B verification where appropriate, progressive routing or adoption and eventual removal of legacy responsibilities.

Para componentes que evolucionan activamente o son críticos, las estrategias de extracción progresiva pueden incluir Strangler Fig Pattern, Branch by Abstraction, una abstracción intermedia, una implementación nueva aislada, convivencia old/new cuando corresponda, Feature Toggles, ejecución en paralelo o verificación A/B cuando corresponda, adopción o routing progresivos y retirada eventual de responsabilidades legacy.

These are conditional techniques; not every modernization uses every technique. Old/new coexistence is not the only possible guarantee.

Son técnicas condicionales; no toda modernización usa todas las técnicas. La convivencia old/new no es la única garantía posible.

### Accessory Pricing Illustration / Ilustración De Precios De Accesorios

An area related to accessory pricing illustrates progressive modernization. Responsibilities are being extracted from legacy code progressively. The purpose is to make affected business behavior easier to evolve, optimize, correct, test and own, while reducing the risk that changes affect shared flows or other teams.

Un área relacionada con precios de accesorios ilustra la modernización progresiva. Las responsabilidades se están extrayendo del código legacy progresivamente. El propósito es hacer más fácil evolucionar, optimizar, corregir, probar y asumir ownership del comportamiento de negocio afectado, reduciendo a la vez el riesgo de que los cambios afecten a flujos compartidos u otros equipos.

No stored-procedure name, line count, table name, timing, percentage, bug count, customer or internal system name is documented.

No se documentan nombre de stored procedure, número de líneas, nombres de tablas, tiempos, porcentajes, número de bugs, cliente ni nombre de sistema interno.

### Result / Resultado

This is a recurring strategy rather than one single completed case with one numeric result. Safe qualitative outcomes are that it facilitates evolution, supports optimization, allows lower-risk corrections to unrelated flows, improves the ability to own and evolve parts of shared legacy systems and reduces unnecessary impact on other teams.

Esta es una estrategia recurrente, no un único caso completado con un único resultado numérico. Los resultados cualitativos seguros son que facilita la evolución, permite optimización, permite corregir con menor riesgo para flujos no relacionados, mejora la capacidad de asumir ownership y evolucionar partes de sistemas legacy compartidos y reduce el impacto innecesario sobre otros equipos.

### Trade-Off / Trade-Off

Progressive old/new coexistence can temporarily add abstraction layers, toggles, parallel paths, characterization coverage, comparison or verification mechanisms and migration or removal work. This complexity is accepted when proportional to the risk of replacing a critical legacy component directly.

La convivencia progresiva old/new puede añadir temporalmente capas de abstracción, toggles, rutas paralelas, cobertura de caracterización, mecanismos de comparación o verificación y trabajo de migración o retirada. Esta complejidad se acepta cuando es proporcional al riesgo de sustituir directamente un componente legacy crítico.

### Learning / Aprendizaje

1. Refactor for value, not ego. Legacy code that works, changes rarely and does not materially constrain the business is not automatically a modernization priority. Architectural cleanliness alone is insufficient justification for a high-risk rewrite.

   Refactorizar por valor, no por ego. El código legacy que funciona, cambia rara vez y no limita materialmente el negocio no es automáticamente una prioridad de modernización. La limpieza arquitectónica por sí sola no justifica una reescritura de alto riesgo.

2. Build the safety net first. With opaque legacy behavior, understanding and characterizing existing behavior before changing it is more important than rewriting quickly.

   Construir primero la red de seguridad. Ante comportamiento legacy opaco, entender y caracterizar el comportamiento existente antes de cambiarlo es más importante que reescribir rápido.

3. Prefer reversible migration for critical systems. Controlled old/new coexistence, progressive activation and rollback capability can substantially reduce modernization risk compared with a Big Bang replacement. This is not the only possible safe strategy.

   Preferir migraciones reversibles para sistemas críticos. La convivencia controlada old/new, la activación progresiva y la capacidad de rollback pueden reducir sustancialmente el riesgo de modernización frente a una sustitución Big Bang. No es la única estrategia segura posible.

4. Ownership matters. Modernization is especially valuable when it allows a team to evolve the business capability it owns without introducing unnecessary risk into other teams' flows.

   El ownership importa. La modernización es especialmente valiosa cuando permite a un equipo evolucionar la capacidad de negocio que posee sin introducir riesgo innecesario en los flujos de otros equipos.

### Historical Alternatives / Alternativas Históricas

NOT DOCUMENTED. No explicit historical alternatives catalogue was confirmed. Do not fabricate a comparison such as full rewrite versus microservices versus modular monolith.

NO DOCUMENTADAS. No se confirmó un catálogo de alternativas históricas explícitas. No debe fabricarse una comparación como reescritura completa frente a microservicios frente a monolito modular.

## Conceptual Diagram Facts

These facts are presentation-only and may be used by A5.1 to create explanatory diagrams. They do not describe literal production topology and do not modify `ArchitectureCaseStudy`.

Estos hechos son solo de presentación y A5.1 puede usarlos para crear diagramas explicativos. No describen la topología literal de producción y no modifican `ArchitectureCaseStudy`.

### `vehicle-read-model`

Allowed conceptual nodes / Nodos conceptuales permitidos:

- legacy or authoritative vehicle path / ruta de vehículos legacy o autoritativa;
- database or transactional source at conceptual level / base de datos o fuente transaccional a nivel conceptual;
- background projection service / servicio de proyección en segundo plano;
- vehicle read projection / proyección de lectura de vehículos;
- bulk update / actualización bulk;
- Outbox;
- event / evento;
- incremental projection update / actualización incremental de la proyección;
- frequent read / lectura frecuente;
- exact-state operation / operación de estado exacto.

Allowed relationships / Relaciones permitidas:

- legacy source → background projection → bulk projection update;
- business or transactional change → Outbox → event → projection update;
- frequent read → projection;
- exact-state operation → authoritative source.

Do not include named infrastructure not confirmed.

No incluir infraestructura con nombre que no haya sido confirmada.

### `testing-infrastructure`

Allowed conceptual story / Historia conceptual permitida:

`legacy testing friction → local improvement → normalization → shared testing support → team adoption → future simplification`

Examples may show / Los ejemplos pueden mostrar:

- business-state setup → semantic Object Mother/factory;
- external API ↔ WireMock-backed integration boundary.

Do not imply that every technique belongs to one architecture layer.

No insinuar que todas las técnicas pertenecen a una misma capa arquitectónica.

### `event-summaries`

Before / Antes:

`Notification Event → Consumer → synchronous API enrichment calls → required context`

After / Después:

`business change → granular notification remains`

For affected consumption / Para el consumo afectado:

`business change → Event Summary → Consumer with relevant context`

Do not draw every consumer as summary-based.

No dibujar todos los consumidores como basados en resúmenes.

### `legacy-modernization`

Allowed conceptual decision / Decisión conceptual permitida:

`criticality + expected churn → choose proportional intervention strategy`

Tactical / Táctico:

`legacy behavior → seam → characterization → minimal safe change`

Progressive / Progresivo:

`legacy implementation → abstraction → old/new coexistence → controlled adoption → progressive legacy removal`

This is not literal production topology.

Esto no es topología literal de producción.

## Publication Status / Estado De Publicación

After this human review set / Después de esta revisión humana:

| Case | Status |
|---|---|
| `vehicle-read-model` | `READY_FOR_A5_AUTHORING` |
| `testing-infrastructure` | `READY_FOR_A5_AUTHORING` |
| `event-summaries` | `READY_FOR_A5_AUTHORING` |
| `legacy-modernization` | `READY_FOR_A5_AUTHORING` |

This means sufficient human-approved evidence exists to author A5 without inventing missing history. It does not mean A5 is implemented. Historical options remain undocumented wherever stated.

Esto significa que existe evidencia aprobada por Antonio suficiente para redactar A5 sin inventar historia faltante. No significa que A5 esté implementado. Las opciones históricas permanecen no documentadas donde se indica.

## Relations / Relaciones

Only relations verified in A5.0, A2 and the model are recorded. No relation was invented or changed.

Solo se registran relaciones verificadas en A5.0, A2 y el modelo. No se inventó ni cambió ninguna relación.

| Case | Experience | Competencies | Achievements | Projects |
|---|---|---|---|---|
| `vehicle-read-model` | `domingo-alonso` | `software-architecture`, `performance-engineering`, `sql-data-architecture` | none | none |
| `testing-infrastructure` | `domingo-alonso` | `testing-quality` | `integration-suite-feedback` | none |
| `event-summaries` | `domingo-alonso` | `distributed-systems`, `event-driven-architecture` | `event-summary-api-calls` | none |
| `legacy-modernization` | `domingo-alonso` | `legacy-modernization`, `software-architecture` | none | none |

Desired relations not present in the model would be marked `NOT CURRENTLY MODELED`. None was identified in this review.

Las relaciones deseadas que no existieran en el modelo se marcarían como `NOT CURRENTLY MODELED`. No se identificó ninguna en esta revisión.

## Explicit Exclusions / Exclusiones Explícitas

- No historical alternative is inferred for any case / No se infiere ninguna alternativa histórica para ningún caso.
- No metric is generalized beyond its documented scope / No se generaliza ninguna métrica fuera de su alcance documentado.
- No Event Sourcing, exactly-once, universal event-driven architecture or automatic CQRS claim / No se afirma Event Sourcing, exactly-once, arquitectura universal event-driven ni CQRS automático.
- No broker, database engine, named infrastructure, customer, private system, endpoint, operational identifier, credential, person or internal URL / No se incluyen broker, motor de base de datos, infraestructura con nombre, cliente, sistema privado, endpoint, identificador operativo, credencial, persona ni URL interna.
- No changes are made to A5.0, the public model, UI or product code by this editorial lock / Este lock editorial no modifica A5.0, el modelo público, la UI ni el código de producto.
