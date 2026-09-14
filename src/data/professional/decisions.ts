import type {
  ArchitectureDecision,
  DecisionArea,
  LocalizedText,
} from "./types";

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const decisionAreas: DecisionArea[] = [
  {
    id: "boundaries",
    title: text("Límites y arquitectura", "Boundaries & Architecture"),
    summary: text(
      "Crear, mover o retirar límites según ownership, cambio y coste operativo.",
      "Create, move or remove boundaries according to ownership, change and operational cost.",
    ),
    decisionIds: ["remove-unnecessary-service", "choose-style-by-context"],
  },
  {
    id: "domain",
    title: text("Complejidad de dominio", "Domain Complexity"),
    summary: text(
      "Modelar las reglas que necesitan protección y mantener simple lo que no la necesita.",
      "Model the rules that need protection and keep simple what does not.",
    ),
    decisionIds: ["ddd-where-needed", "crud-isnt-crud"],
  },
  {
    id: "data",
    title: text("Datos y rendimiento", "Data & Performance"),
    summary: text(
      "Alinear persistencia, workload, consistencia y comportamiento medido.",
      "Align persistence, workload, consistency and measured behaviour.",
    ),
    decisionIds: ["persistence-by-workload", "performance-from-evidence"],
  },
  {
    id: "distribution",
    title: text("Sistemas distribuidos", "Distributed Systems"),
    summary: text(
      "Elegir la semántica de comunicación antes que la tecnología de moda.",
      "Choose communication semantics before fashionable technology.",
    ),
    decisionIds: ["communication-by-semantics", "summary-events"],
  },
  {
    id: "modernization",
    title: text("Modernización segura", "Safe Modernization"),
    summary: text(
      "Evolucionar legado con caracterización, reversibilidad y riesgo proporcional.",
      "Evolve legacy systems with characterization, reversibility and proportional risk.",
    ),
    decisionIds: ["modernize-by-risk"],
  },
  {
    id: "quality",
    title: text(
      "Testing e ingeniería de calidad",
      "Testing & Quality Engineering",
    ),
    summary: text(
      "Convertir el feedback lento o frágil en una capacidad de diseño compartida.",
      "Turn slow or fragile feedback into a shared design capability.",
    ),
    decisionIds: ["testing-as-architecture"],
  },
  {
    id: "production",
    title: text("Observabilidad y producción", "Observability & Production"),
    summary: text(
      "Seguir la arquitectura hasta el runtime, el diagnóstico y el impacto real.",
      "Follow architecture into runtime, diagnosis and real-world impact.",
    ),
    decisionIds: ["diagnose-runtime-behaviour"],
  },
  {
    id: "resilience",
    title: text("Resiliencia", "Resilience"),
    summary: text(
      "Contener fallos y desplegar cambios con señales, rollback y coste explícito.",
      "Contain failures and deliver changes with signals, rollback and explicit cost.",
    ),
    decisionIds: ["contain-the-failure"],
  },
  {
    id: "delivery",
    title: text("DevOps y entrega", "DevOps & Delivery"),
    summary: text(
      "Validación automatizada y promoción controlada hasta producción.",
      "Automated validation and controlled promotion through production.",
    ),
    decisionIds: ["deliver-with-control"],
  },
  {
    id: "ai",
    title: text("IA aplicada", "Applied AI"),
    summary: text(
      "Usar agentes dentro de límites tipados, observables y bajo control humano.",
      "Use agents within typed, observable and human-controlled boundaries.",
    ),
    decisionIds: ["bound-agent-capabilities"],
  },
  {
    id: "simplification",
    title: text("Simplificación técnica", "Technical Simplification"),
    summary: text(
      "Reducir complejidad accidental, carga cognitiva y coste total del sistema.",
      "Reduce accidental complexity, cognitive load and total system cost.",
    ),
    decisionIds: ["remove-unnecessary-service", "ddd-where-needed"],
  },
];

const decisions: Omit<ArchitectureDecision, "claimIds" | "achievementIds">[] = [
  {
    id: "remove-unnecessary-service",
    number: "01",
    title: text(
      "Eliminar un servicio innecesario",
      "Remove an unnecessary service",
    ),
    summary: text(
      "Un boundary distribuido no tenía una razón independiente suficiente y añadía coste operativo.",
      "A distributed boundary had no sufficient independent reason and added operational cost.",
    ),
    problem: text(
      "La funcionalidad seguía en el mismo flujo y no tenía ownership, evolución, reutilización, escalado o aislamiento propios.",
      "The functionality remained in the same flow and had no independent ownership, evolution, reuse, scaling or isolation.",
    ),
    decision: text(
      "Cuestionar el microservicio y devolver responsabilidad al límite que podía asumirla de forma más simple.",
      "Challenge the microservice and return responsibility to the boundary that could own it more simply.",
    ),
    principle: text(
      "Un boundary distribuido debe pagar la complejidad que introduce.",
      "A distributed boundary must pay for the complexity it introduces.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: [
      "software-architecture",
      "distributed-systems",
      "performance-engineering",
    ],
    caseStudyIds: ["service-boundaries-and-ddd"],
    technologyExamples: ["Microservices", "HTTP", "Observability"],
  },
  {
    id: "ddd-where-needed",
    number: "02",
    title: text(
      "DDD solo donde existe complejidad de dominio",
      "DDD only where domain complexity exists",
    ),
    summary: text(
      "Retirar capas ceremoniales cuando no protegen invariantes ni comportamiento significativo.",
      "Remove ceremonial layers when they protect neither invariants nor meaningful behaviour.",
    ),
    problem: text(
      "Un subsistema transaccional y orientado a rendimiento pagaba entidades, agregados y abstracciones que actuaban como DTOs.",
      "A transactional, performance-oriented subsystem paid for entities, aggregates and abstractions that behaved like DTOs.",
    ),
    decision: text(
      "Simplificar y aceptar acoplamiento controlado a infraestructura cuando encaja mejor con el problema.",
      "Simplify and accept controlled infrastructure coupling when it better fits the problem.",
    ),
    principle: text(
      "DDD gestiona complejidad de dominio; no debe crearla.",
      "DDD manages domain complexity; it should not create it.",
    ),
    evidence: text("Experiencia profesional", "Professional experience"),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["software-architecture", "performance-engineering"],
    caseStudyIds: ["service-boundaries-and-ddd"],
    technologyExamples: ["DDD", "SQL", "Data access"],
  },
  {
    id: "crud-isnt-crud",
    number: "03",
    title: text(
      "Cuando un CRUD deja de ser CRUD",
      "When CRUD is not really CRUD",
    ),
    summary: text(
      "Introducir un modelo más rico cuando aparecen invariantes, transiciones y coordinación real.",
      "Introduce a richer model when real invariants, transitions and coordination appear.",
    ),
    problem: text(
      "Una implementación centrada en datos empezaba a ocultar reglas de negocio y acoplamientos entre procesos.",
      "A data-centric implementation started hiding business rules and process coupling.",
    ),
    decision: text(
      "Usar Value Objects, límites de agregado, comportamiento y eventos donde el dominio lo justifica.",
      "Use Value Objects, aggregate boundaries, behaviour and events where the domain justifies them.",
    ),
    principle: text(
      "La competencia no es usar DDD: es reconocer cuándo se amortiza.",
      "The skill is not using DDD: it is recognizing when it pays for itself.",
    ),
    evidence: text(
      "Patrón recurrente profesional confirmado",
      "Confirmed recurring professional pattern",
    ),
    evidenceKind: "recurring-pattern",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["software-architecture"],
    caseStudyIds: ["service-boundaries-and-ddd"],
    technologyExamples: ["Value Objects", "Domain Events", "Aggregates"],
  },
  {
    id: "choose-style-by-context",
    number: "04",
    title: text(
      "Elegir estilo por contexto",
      "Choose architectural style by context",
    ),
    summary: text(
      "Clean, Hexagonal, Vertical Slice o una estructura transaccional simple son opciones, no dogmas.",
      "Clean, Hexagonal, Vertical Slice or a simple transactional structure are options, not dogma.",
    ),
    problem: text(
      "Una plantilla global puede esconder dónde está realmente la complejidad y multiplicar indirection sin proteger nada.",
      "A global template can hide where complexity actually lives and multiply indirection without protecting anything.",
    ),
    decision: text(
      "Evaluar invariantes, integración, datos, ownership, churn, testabilidad y coste operativo por subsistema.",
      "Evaluate invariants, integration, data, ownership, churn, testability and operational cost per subsystem.",
    ),
    principle: text(
      "La arquitectura debe ajustarse al problema, no al revés.",
      "Architecture should fit the problem, not the other way around.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso", "anexia"],
    competencyIds: ["software-architecture", "problem-decomposition"],
    caseStudyIds: [],
    technologyExamples: [
      "Clean Architecture",
      "Hexagonal Architecture",
      "Vertical Slice",
    ],
  },
  {
    id: "persistence-by-workload",
    number: "05",
    title: text(
      "Persistencia según el workload",
      "Persistence follows the workload",
    ),
    summary: text(
      "EF, Dapper, SQL, cache y representaciones de lectura responden a necesidades distintas.",
      "EF, Dapper, SQL, caching and read representations answer different needs.",
    ),
    problem: text(
      "Lecturas frecuentes y costosas presionaban datos transaccionales compartidos, pero algunas operaciones exigían estado exacto.",
      "Frequent expensive reads pressured shared transactional data, while some operations required exact state.",
    ),
    decision: text(
      "Aislar el workload con una representación optimizada y conservar la fuente autoritativa donde la consistencia lo exige.",
      "Isolate the workload with an optimized representation and retain the authoritative source where consistency requires it.",
    ),
    principle: text(
      "La consistencia es una decisión del flujo, no una bandera global.",
      "Consistency is a flow decision, not a global flag.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["sql-data-architecture", "performance-engineering"],
    caseStudyIds: ["vehicle-read-model"],
    technologyExamples: ["EF", "Dapper", "SQL", "Redis"],
  },
  {
    id: "performance-from-evidence",
    number: "06",
    title: text("Medir antes de optimizar", "Measure before optimizing"),
    summary: text(
      "El diagnóstico parte de ejecución, bloqueo, recursos y comportamiento observado.",
      "Diagnosis starts from execution, blocking, resources and observed behaviour.",
    ),
    problem: text(
      "Los síntomas de rendimiento pueden estar en SQL, pools, CPU, locks o en el diseño del acceso.",
      "Performance symptoms can live in SQL, pools, CPU, locks or access design.",
    ),
    decision: text(
      "Triangular planes, sesiones, métricas y trazas antes de elegir una optimización.",
      "Triangulate plans, sessions, metrics and traces before choosing an optimization.",
    ),
    principle: text(
      "Una hipótesis de rendimiento necesita evidencia runtime.",
      "A performance hypothesis needs runtime evidence.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["performance-engineering", "observability-production"],
    caseStudyIds: ["vehicle-read-model"],
    technologyExamples: ["Execution plans", "SQL sessions", "OpenTelemetry"],
  },
  {
    id: "communication-by-semantics",
    number: "07",
    title: text(
      "Comunicación por semántica",
      "Communication follows semantics",
    ),
    summary: text(
      "Sync, async y eventos se eligen por consistencia, acoplamiento, entrega y fallos.",
      "Sync, async and events are chosen by consistency, coupling, delivery and failure semantics.",
    ),
    problem: text(
      "La misma arquitectura de comunicación no sirve para todos los consumidores ni todos los flujos.",
      "The same communication architecture does not fit every consumer or flow.",
    ),
    decision: text(
      "Elegir la mecánica que contenga mejor la propagación de fallos y respete la semántica requerida.",
      "Choose the mechanism that best contains failure propagation and respects the required semantics.",
    ),
    principle: text(
      "La pregunta es qué semántica necesita el flujo, no qué tecnología parece más moderna.",
      "The question is what semantics the flow needs, not which technology looks newer.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["distributed-systems", "event-driven-architecture"],
    caseStudyIds: ["event-summaries"],
    technologyExamples: ["Domain Events", "Outbox/Inbox", "RabbitMQ"],
  },
  {
    id: "summary-events",
    number: "08",
    title: text(
      "Enriquecer eventos donde aporta valor",
      "Enrich events where it pays off",
    ),
    summary: text(
      "Los summary events redujeron acoplamiento conversacional en las integraciones afectadas.",
      "Summary events reduced chatty coupling in affected integrations.",
    ),
    problem: text(
      "Consumidores necesitaban contexto adicional y lo obtenían mediante llamadas API síncronas.",
      "Consumers needed additional context and obtained it through synchronous API calls.",
    ),
    decision: text(
      "Mantener la narrativa granular y añadir resúmenes con contexto para los consumidores que lo necesitaban.",
      "Keep the granular narrative and add contextual summaries for consumers that needed them.",
    ),
    principle: text(
      "La duplicación controlada puede ser más barata que el enriquecimiento remoto repetido.",
      "Controlled duplication can be cheaper than repeated remote enrichment.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["distributed-systems", "event-driven-architecture"],
    caseStudyIds: ["event-summaries"],
    technologyExamples: ["Events", "Eventual consistency", "API integration"],
  },
  {
    id: "modernize-by-risk",
    number: "09",
    title: text(
      "Modernizar es gestionar riesgo",
      "Modernization is risk management",
    ),
    summary: text(
      "Caracterizar primero; extraer y convivir cuando el cambio esperado lo justifica.",
      "Characterize first; extract and coexist when expected change justifies it.",
    ),
    problem: text(
      "Cambiar legado compartido sin conocer su comportamiento puede romper flujos no relacionados.",
      "Changing shared legacy without knowing its behaviour can break unrelated flows.",
    ),
    decision: text(
      "Usar Golden Master, seams, convivencia old/new, Strangler, toggles y rollback de forma proporcional.",
      "Use Golden Master, seams, old/new coexistence, Strangler, toggles and rollback proportionally.",
    ),
    principle: text(
      "La modernización segura es una secuencia reversible, no una reescritura heroica.",
      "Safe modernization is a reversible sequence, not a heroic rewrite.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["legacy-modernization", "software-architecture"],
    caseStudyIds: ["legacy-modernization"],
    technologyExamples: ["Golden Master", "Strangler Fig", "Feature toggles"],
  },
  {
    id: "testing-as-architecture",
    number: "10",
    title: text(
      "El testing también es arquitectura",
      "Testing is architecture too",
    ),
    summary: text(
      "El feedback de una suite de integración era una limitación real de productividad y Definition of Done.",
      "Integration-suite feedback was a real productivity and Definition-of-Done constraint.",
    ),
    problem: text(
      "Setup frágil, persistencias distintas, mocks opacos y una suite mayor cercana a una hora impedían probar con fluidez.",
      "Fragile setup, multiple persistence mechanisms, opaque mocks and a largest suite near one hour blocked flow.",
    ),
    decision: text(
      "Crear infraestructura compartida, estados semánticos, separación por límites y diagnósticos útiles.",
      "Create shared infrastructure, semantic states, boundary-focused test layers and useful diagnostics.",
    ),
    principle: text(
      "Si probar es demasiado caro, el sistema de ingeniería también tiene un problema arquitectónico.",
      "If testing is too expensive, the engineering system has an architecture problem too.",
    ),
    evidence: text(
      "Experiencia profesional confirmada · ~60 min → ~2 min",
      "Confirmed professional experience · ~60 min → ~2 min",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["testing-quality", "technical-leadership"],
    caseStudyIds: ["testing-infrastructure"],
    technologyExamples: ["Object Mothers", "WireMock", "TestServer"],
  },
  {
    id: "diagnose-runtime-behaviour",
    number: "11",
    title: text(
      "Diagnosticar el comportamiento real",
      "Diagnose real runtime behaviour",
    ),
    summary: text(
      "La arquitectura continúa en trazas, recursos, sesiones SQL, alertas y correlación de despliegues.",
      "Architecture continues through traces, resources, SQL sessions, alerts and deployment correlation.",
    ),
    problem: text(
      "Un incidente no se explica por una capa aislada: hay que acotar blast radius y conectar telemetría con implementación.",
      "An incident is not explained by one layer: blast radius must be narrowed and telemetry connected to implementation.",
    ),
    decision: text(
      "Investigar global vs tenant, cambios recientes, trazas, recursos y SQL; añadir instrumentación dirigida si falta señal.",
      "Investigate global vs tenant scope, recent changes, traces, resources and SQL; add targeted instrumentation when signal is missing.",
    ),
    principle: text(
      "La observabilidad no es decoración posterior al deploy.",
      "Observability is not decoration after deployment.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["observability-production", "performance-engineering"],
    caseStudyIds: ["incident-diagnosis-agent"],
    technologyExamples: [
      "OpenTelemetry",
      "Application Insights",
      "Distributed traces",
    ],
  },
  {
    id: "contain-the-failure",
    number: "12",
    title: text("Contener el fallo concreto", "Contain the concrete failure"),
    summary: text(
      "Retries, error queues, health checks y aislamiento solo valen si contienen un fallo identificado.",
      "Retries, error queues, health checks and isolation matter only when they contain an identified failure.",
    ),
    problem: text(
      "Reintentar sin límites puede amplificar carga y propagar fallos; no todos los flujos toleran la misma disponibilidad parcial.",
      "Unbounded retries can amplify load and propagate failures; not every flow tolerates the same partial availability.",
    ),
    decision: text(
      "Ajustar reintentos, colas de error y aislamiento a la semántica del flujo y a la capacidad de diagnosticarlo.",
      "Tune retries, error queues and isolation to the flow semantics and the ability to diagnose it.",
    ),
    principle: text(
      "La resiliencia es una decisión sobre fallos, no una colección de patrones.",
      "Resilience is a failure decision, not a pattern collection.",
    ),
    evidence: text(
      "Experiencia profesional confirmada",
      "Confirmed professional experience",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: ["distributed-systems", "observability-production"],
    caseStudyIds: ["event-summaries"],
    technologyExamples: ["Retries", "Error queues", "Health checks"],
  },
  {
    id: "bound-agent-capabilities",
    number: "13",
    title: text(
      "Delimitar las capacidades del agente",
      "Bound agent capabilities",
    ),
    summary: text(
      "Aplicar ingeniería de software a sistemas con IA: herramientas explícitas, contratos y control humano.",
      "Apply software engineering to AI systems: explicit tools, contracts and human control.",
    ),
    problem: text(
      "Un modelo no debe convertirse en fuente de verdad ni autoridad operativa sin límites verificables.",
      "A model must not become a source of truth or operational authority without verifiable boundaries.",
    ),
    decision: text(
      "Orquestar telemetría, conocimiento, código e informes mediante herramientas acotadas, salidas estructuradas y supervisión.",
      "Orchestrate telemetry, knowledge, code and reporting through bounded tools, structured outputs and supervision.",
    ),
    principle: text(
      "La IA aplicada necesita límites deterministas alrededor de lo no determinista.",
      "Applied AI needs deterministic boundaries around the non-deterministic part.",
    ),
    evidence: text(
      "Experiencia profesional confirmada · diagnóstico, no remediación autónoma",
      "Confirmed professional experience · diagnosis, not autonomous remediation",
    ),
    evidenceKind: "professional",
    experienceIds: ["domingo-alonso"],
    competencyIds: [
      "applied-ai",
      "agentic-engineering",
      "observability-production",
    ],
    caseStudyIds: ["incident-diagnosis-agent"],
    technologyExamples: [
      "Tool orchestration",
      "Typed contracts",
      "Human review",
    ],
  },
];

decisions.push({
  id: "deliver-with-control",
  number: "14",
  title: text(
    "Automatizar la validación, controlar la promoción",
    "Automate validation, control promotion",
  ),
  summary: text(
    "La entrega forma parte de la arquitectura: entornos, quality gates y comportamiento en producción.",
    "Delivery is part of architecture: environments, quality gates and production behaviour.",
  ),
  problem: text(
    "Un cambio validado en código todavía debe demostrar que puede desplegarse y operar con seguridad.",
    "A change validated in code must still demonstrate that it can be deployed and operated safely.",
  ),
  decision: text(
    "Usar pipelines, tests y Sonar entre entornos, despliegue blue-green y promoción final controlada; seguir la funcionalidad con telemetría.",
    "Use pipelines, tests and Sonar across environments, blue-green deployment and controlled final promotion; follow functionality through telemetry.",
  ),
  principle: text(
    "Automatizar la evidencia de entrega sin perder control sobre producción.",
    "Automate delivery evidence while retaining control over production.",
  ),
  evidence: text("Experiencia profesional", "Professional experience"),
  evidenceKind: "professional",
  experienceIds: ["domingo-alonso"],
  competencyIds: ["azure-ci-cd", "observability-production"],
  caseStudyIds: [],
  technologyExamples: ["Azure App Service", "Functions", "Sonar", "Blue-green"],
});

const relations: Record<
  string,
  { claimIds: string[]; achievementIds: string[] }
> = {
  "persistence-by-workload": {
    claimIds: ["vehicle-read-model-claim"],
    achievementIds: ["read-workload-isolation"],
  },
  "performance-from-evidence": {
    claimIds: ["domingo-scope"],
    achievementIds: [],
  },
  "summary-events": {
    claimIds: ["event-summary-improvement"],
    achievementIds: ["event-summary-api-calls"],
  },
  "modernize-by-risk": {
    claimIds: ["legacy-modernization-claim"],
    achievementIds: ["reversible-modernization"],
  },
  "testing-as-architecture": {
    claimIds: ["testing-improvement"],
    achievementIds: ["integration-suite-feedback"],
  },
  "diagnose-runtime-behaviour": {
    claimIds: ["domingo-scope"],
    achievementIds: [],
  },
  "contain-the-failure": { claimIds: ["domingo-scope"], achievementIds: [] },
  "communication-by-semantics": {
    claimIds: ["domingo-scope"],
    achievementIds: [],
  },
  "bound-agent-capabilities": {
    claimIds: ["incident-agent", "ai-engineering"],
    achievementIds: [],
  },
  "deliver-with-control": { claimIds: ["domingo-scope"], achievementIds: [] },
};
export const representativeDecisions: ArchitectureDecision[] = decisions.map(
  (item) => ({
    ...item,
    ...(relations[item.id] ?? {
      claimIds: ["architecture-judgement"],
      achievementIds: [],
    }),
  }),
);
