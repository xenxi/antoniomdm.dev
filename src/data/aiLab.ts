import { publicProfessionalModel } from './professional/model';
import type { Locale } from '../i18n/core';

export type Localized = { es: string; en: string };
export const text = (es: string, en: string): Localized => ({ es, en });
const localize = (value: Localized, locale: Locale) => value[locale];

export type AiLabCaseType = 'PRODUCT_AI' | 'PROFESSIONAL_AI' | 'AGENTIC_ENGINEERING' | 'HISTORICAL_AI';
export type AiLabCaseDepth = 'DEEP_AI_CASE' | 'STANDARD_AI_CASE' | 'PRACTICE_CASE' | 'HISTORICAL_NOTE';
export type AiLabCaseOrigin = 'PERSONAL_PROJECT' | 'PROFESSIONAL' | 'PORTFOLIO_ENGINEERING' | 'HISTORICAL_PROFESSIONAL';
export type AiLabCaseStatus = 'IMPLEMENTED' | 'IN_PROGRESS' | 'HISTORICAL' | 'LOCKED_FOR_PUBLICATION';
export type AiLabNonClaimState = 'NOT_CLAIMED' | 'DESIGNED' | 'IN_PROGRESS';

export interface AiLabSection { id: string; title: Localized; body: Localized }
export interface AiLabFlowStep { id: string; label: Localized; detail: Localized }
export interface AiLabArchitectureGroup { id: string; title: Localized; nodes: Localized[]; note?: Localized; parallel?: boolean }
export interface AiLabCapability { id: string; title: Localized; description: Localized }
export interface AiLabNonClaim { id: string; label: Localized; state: AiLabNonClaimState }
export interface AiLabBoundary { id: string; label: Localized; detail: Localized }
export interface AiLabPrinciple { id: string; title: Localized; text: Localized }
export interface AiLabAxis { id: string; title: Localized; question: Localized; summary: Localized; evidence: Localized; href: string }

export interface AiLabArchitecture { title: Localized; caption: Localized; groups: AiLabArchitectureGroup[] }
export interface AiLabFlow { title: Localized; caption: Localized; steps: AiLabFlowStep[] }

export interface AiLabCase {
  id: string;
  slug?: string;
  type: AiLabCaseType;
  depth: AiLabCaseDepth;
  origin: AiLabCaseOrigin;
  title: Localized;
  eyebrow: Localized;
  summary: Localized;
  lead: Localized;
  status: AiLabCaseStatus;
  statusLabel: Localized;
  relatedProjectSlug?: string;
  problem: Localized;
  architecture?: AiLabArchitecture;
  flow?: AiLabFlow;
  sections: AiLabSection[];
  technologies: string[];
  capabilities: AiLabCapability[];
  boundaries: AiLabBoundary[];
  nonClaims: AiLabNonClaim[];
  evidence: Localized;
}

export const aiLabLanding = {
  eyebrow: text('AI LAB / IA APLICADA', 'AI LAB / APPLIED AI'),
  title: text('IA aplicada con límites claros.', 'Applied AI with explicit boundaries.'),
  lead: text(
    'La IA, tratada como comportamiento de sistema que se ingenia: contratos, herramientas acotadas, validación determinista, verificación y control humano. No es una caja mágica ni una promesa de proveedor.',
    'AI treated as engineered system behavior: contracts, bounded tools, deterministic validation, verification and human control. It is not a magic box or a provider promise.',
  ),
  metaDescription: text(
    'IA aplicada como parte de la arquitectura de software: Platform934, investigación asistida de incidencias, ingeniería agéntica y contexto histórico de ML/NLP.',
    'Applied AI as part of software architecture: Platform934, AI-assisted incident investigation, agentic engineering and historical ML/NLP context.',
  ),
  axisTitle: text('Dos ejes, una misma disciplina', 'Two axes, one discipline'),
  principlesTitle: text('Principios de ingeniería de IA', 'AI engineering principles'),
  boundariesTitle: text('Límites', 'Boundaries'),
  boundariesKicker: text('NO RECLAMADO', 'NOT CLAIMED'),
  professionalTitle: text('IA aplicada profesional', 'Professional applied AI'),
  historicalTitle: text('Antes de los LLM', 'Before LLMs'),
  historicalLead: text(
    'Contexto histórico de trabajo con ML/NLP clásico, anterior a la IA generativa actual. No se presenta como GenAI moderna.',
    'Historical context of classic ML/NLP work, predating current generative AI. It is not presented as modern GenAI.',
  ),
  evidenceLabel: text('Evidencia', 'Evidence'),
  statusLabel: text('Estado', 'Status'),
  technologiesLabel: text('Tecnologías', 'Technologies'),
  capabilitiesLabel: text('Capacidades representativas', 'Representative capabilities'),
  demonstratesTitle: text('Qué demuestra', 'What it demonstrates'),
  boundariesSectionTitle: text('Fronteras explícitas', 'Explicit boundaries'),
  nonClaimsTitle: text('Límites explícitos / no reclamado', 'Explicit boundaries / non-claims'),
  backToLab: text('← Volver al AI Lab', '← Back to AI Lab'),
  openCase: text('Abrir caso', 'Open case'),
  flowLabel: text('Flujo', 'Flow'),
  architectureLabel: text('Arquitectura conceptual', 'Conceptual architecture'),
};

export const aiLabAxes: AiLabAxis[] = [
  {
    id: 'product-ai',
    title: text('IA de producto', 'Product AI'),
    question: text('¿Cómo diseña Antonio capacidades de IA dentro de productos software?', 'How does Antonio design AI capabilities inside software products?'),
    summary: text(
      'El modelo propone; los servicios de aplicación deterministas validan, resuelven contra el catálogo real y conservan la autoridad sobre datos y acciones.',
      'The model proposes; deterministic application services validate, resolve against the real catalogue and remain authoritative over data and actions.',
    ),
    evidence: text('Evidencia principal: Platform934 API (proyecto personal).', 'Primary evidence: Platform934 API (personal project).'),
    href: '/ai-lab/platform934/',
  },
  {
    id: 'agentic-engineering',
    title: text('Ingeniería agéntica', 'Agentic Engineering'),
    question: text('¿Cómo usa Antonio IA y agentes dentro de un proceso disciplinado de ingeniería?', 'How does Antonio use AI and agents inside a disciplined engineering process?'),
    summary: text(
      'Hitos, criterios de aceptación, bloqueos de evidencia, gates automáticos, verificación y revisión humana. La persona conserva el alcance, la arquitectura y la decisión.',
      'Milestones, acceptance criteria, evidence locks, automated gates, verification and human review. The human retains scope, architecture and decision.',
    ),
    evidence: text('Evidencia principal: la modernización de AntoñiOS (PORTFOLIO_ENGINEERING) y el flujo profesional supervisado.', 'Primary evidence: the AntoñiOS modernization (PORTFOLIO_ENGINEERING) and the supervised professional workflow.'),
    href: '/ai-lab/agentic-engineering/',
  },
];

export const aiLabPrinciples: AiLabPrinciple[] = [
  {
    id: 'bounded-component',
    title: text('Componente acotado', 'Bounded component'),
    text: text(
      'La IA es un componente acotado con capacidades explícitas, no una caja mágica.',
      'AI is a bounded component with explicit capabilities, not a magic box.',
    ),
  },
  {
    id: 'deterministic-boundary',
    title: text('Frontera determinista', 'Deterministic boundary'),
    text: text(
      'Orquestación y validación deterministas alrededor de la salida no determinista del modelo.',
      'Deterministic orchestration and validation around nondeterministic model output.',
    ),
  },
  {
    id: 'explicit-tools',
    title: text('Herramientas explícitas', 'Explicit tools'),
    text: text(
      'El acceso a herramientas es explícito, tipado y allowlisted.',
      'Tool access is explicit, typed and allowlisted.',
    ),
  },
  {
    id: 'human-judgment',
    title: text('Criterio humano', 'Human judgment'),
    text: text(
      'Los flujos con consecuencias mantienen la revisión y la decisión humanas.',
      'Consequential workflows keep human review and decision in the loop.',
    ),
  },
  {
    id: 'normal-engineering',
    title: text('Ingeniería normal', 'Normal engineering'),
    text: text(
      'La IA se ingenia con contratos, tests, trazabilidad, manejo de fallos, seguridad y conciencia de rendimiento.',
      'AI is engineered with contracts, tests, tracing, failure handling, security and performance awareness.',
    ),
  },
  {
    id: 'problem-first',
    title: text('El problema primero', 'Problem first'),
    text: text(
      'Empezar por el problema de producto; el proveedor es un detalle de implementación.',
      'Start from the product problem; the provider is an implementation detail.',
    ),
  },
  {
    id: 'scoped-agentic',
    title: text('Agentes acotados', 'Scoped agents'),
    text: text(
      'La ingeniería agéntica funciona mejor con tareas acotadas, criterios de aceptación, evidencia, verificación y condiciones de parada.',
      'Agentic engineering works better with scoped tasks, acceptance criteria, evidence, verification and stop conditions.',
    ),
  },
];

export const aiLabBoundaries: AiLabBoundary[] = [
  { id: 'no-rag', label: text('Sin RAG', 'No RAG'), detail: text('No hay recuperación aumentada ni base de datos vectorial implementada.', 'No retrieval-augmented generation or vector database is implemented.') },
  { id: 'no-mcp', label: text('Sin MCP', 'No MCP'), detail: text('MCP no está implementado.', 'MCP is not implemented.') },
  { id: 'no-vector', label: text('Sin embeddings', 'No embeddings'), detail: text('No se usan embeddings ni búsqueda semántica/vectorial.', 'No embeddings or semantic/vector search are used.') },
  { id: 'no-autonomous-agent', label: text('Sin agente autónomo', 'No autonomous agent'), detail: text('El agente es acotado y activado por el usuario.', 'The agent is bounded and user-initiated.') },
  { id: 'no-autonomous-remediation', label: text('Sin remediación autónoma', 'No autonomous remediation'), detail: text('No hay remediación autónoma en producción.', 'There is no autonomous production remediation.') },
  { id: 'no-autonomous-development', label: text('Sin desarrollo autónomo', 'No autonomous software development'), detail: text('La persona conserva el alcance, la arquitectura, la aceptación y el release.', 'The human retains scope, architecture, acceptance and release.') },
  { id: 'no-trained-recommender', label: text('Sin recomendador entrenado', 'No trained recommender'), detail: text('Las recomendaciones combinan heurísticas deterministas y señales explícitas.', 'Recommendations combine deterministic heuristics and explicit signals.') },
];

const platform934: AiLabCase = {
  id: 'ai-lab-platform934-agentic-architecture',
  slug: 'platform934',
  type: 'PRODUCT_AI',
  depth: 'DEEP_AI_CASE',
  origin: 'PERSONAL_PROJECT',
  title: text('Platform934: IA de producto acotada', 'Platform934: bounded Product AI'),
  eyebrow: text('CASO PRINCIPAL / IA DE PRODUCTO', 'PRIMARY CASE / PRODUCT AI'),
  summary: text(
    'Cómo se integra un agente conversacional sobre un catálogo real sin ceder la autoridad del sistema al modelo.',
    'How a conversational agent is integrated over a real catalogue without handing system authority to the model.',
  ),
  lead: text(
    'Platform934 API es un backend privado independiente y una puerta de enlace de agentes sobre Jellyfin. El agente conversacional se apoya en contratos tipados, herramientas allowlisted y tool calling acotado: el modelo puede seleccionar una función de alto nivel, pero los servicios de aplicación deterministas validan los argumentos, resuelven los identificadores contra el catálogo real y conservan la autoridad sobre datos y acciones. Las recomendaciones combinan heurísticas deterministas con señales de gusto explícitas; las listas y valoraciones son privadas y del usuario. La reproducción no la inicia el backend: una capacidad acotada notifica a un cliente propio y el cliente decide si reproduce. El sistema no es un agente autónomo y no usa MCP, RAG, embeddings ni base de datos vectorial; Jellyfin sigue siendo la autoridad del catálogo y de la reproducción.',
    'Platform934 API is an independent private backend and agent gateway over Jellyfin. The conversational agent relies on typed contracts, allowlisted tools and bounded tool calling: the model may select a high-level function, but deterministic application services validate arguments, resolve identifiers against the real catalogue and remain authoritative over data and actions. Recommendations combine deterministic heuristics with explicit taste signals; lists and ratings are private and user-owned. Playback is not started by the backend: a bounded capability notifies an owned client, and the client decides whether to play. The system is not an autonomous agent and does not use MCP, RAG, embeddings or a vector database; Jellyfin remains the catalogue and playback authority.',
  ),
  status: 'IMPLEMENTED',
  statusLabel: text('IMPLEMENTADO / ACTIVO', 'IMPLEMENTED / ACTIVE'),
  relatedProjectSlug: 'platform934',
  problem: text(
    'Incorporar capacidades conversacionales y de descubrimiento sobre un catálogo real, sin convertir el modelo en fuente de verdad ni en un agente autónomo sobre Jellyfin.',
    'Add conversational and discovery capabilities over a real catalogue, without turning the model into the source of truth or an autonomous agent over Jellyfin.',
  ),
  architecture: {
    title: text('Arquitectura conceptual', 'Conceptual architecture'),
    caption: text(
      'Diagrama conceptual y privado-seguro. No todas las peticiones ordinarias pasan por IA: los clientes pueden seguir hablando directamente con Jellyfin. No expone despliegue, endpoints, credenciales ni código.',
      'Conceptual, privacy-safe diagram. Not every ordinary request goes through AI: clients may still talk to Jellyfin directly. It exposes no deployment, endpoints, credentials or source.',
    ),
    groups: [
      { id: 'clients', title: text('Clientes y API', 'Clients and API'), nodes: [text('Clientes Platform934', 'Platform934 clients'), text('Platform934 API', 'Platform934 API'), text('Frontera de aplicación / agente', 'Application / agent boundary')] },
      { id: 'agent', title: text('Agente y modelo', 'Agent and model'), nodes: [text('Semantic Kernel', 'Semantic Kernel'), text('LiteLLM', 'LiteLLM'), text('Ruta de proveedor configurada', 'Configured provider route')], note: text('Las herramientas son allowlisted y tipadas; el enrutado de proveedores vive dentro de LiteLLM.', 'Tools are allowlisted and typed; provider routing lives inside LiteLLM.') },
      { id: 'services', title: text('Servicios autoritativos', 'Authoritative services'), nodes: [text('Cliente Jellyfin tipado → API oficial de Jellyfin', 'Typed Jellyfin client → official Jellyfin API'), text('PostgreSQL / EF Core', 'PostgreSQL / EF Core'), text('Hub SignalR de dispositivos → dispositivos propios activos', 'SignalR device hub → owned active devices')], parallel: true, note: text('Los servicios de aplicación validan argumentos, resuelven identificadores y ejecutan. El acceso a Jellyfin nunca ocurre desde los plugins del agente.', 'Application services validate arguments, resolve identifiers and execute. Jellyfin access never happens from agent plugins.') },
    ],
  },
  sections: [
    {
      id: 'deterministic-boundary',
      title: text('Límite determinista / no determinista', 'Deterministic vs nondeterministic boundary'),
      body: text(
        'El modelo puede proponer y seleccionar una función de alto nivel. La validación de argumentos, la resolución de identificadores contra el catálogo, el cálculo de recomendaciones y la ejecución de acciones ocurren en servicios de aplicación deterministas. La creatividad se acota al lenguaje; la verdad del catálogo y las acciones consecuentes no se delegan.',
        'The model may propose and select a high-level function. Argument validation, identifier resolution against the catalogue, recommendation scoring and action execution happen in deterministic application services. Creativity is bounded to language; catalogue truth and consequential actions are not delegated.',
      ),
    },
    {
      id: 'tool-model',
      title: text('Modelo de herramientas y capacidades', 'Tool and capability model'),
      body: text(
        'Las herramientas son explícitas, tipadas y allowlisted, y no son destructivas por defecto. El modelo no inventa acciones: elige entre capacidades declaradas que la aplicación entiende y controla.',
        'Tools are explicit, typed, allowlisted and non-destructive by default. The model does not invent actions: it chooses among declared capabilities the application understands and controls.',
      ),
    },
    {
      id: 'taste',
      title: text('Gusto, valoraciones y recomendaciones', 'Taste, ratings and recommendations'),
      body: text(
        'Las valoraciones y las señales explícitas se persisten; el perfil de gusto es inspeccionable y reversible. La puntuación de recomendaciones es determinista y se apoya en señales persistidas y en el catálogo real. El LLM puede dar forma a la conversación y a la explicación, pero la lógica autoritativa de datos y recomendación permanece en los servicios de aplicación: no es un modelo de recomendación entrenado ni similitud vectorial.',
        'Ratings and explicit signals are persisted; the taste profile is inspectable and reversible. Recommendation scoring is deterministic and grounded in persisted signals and the real catalogue. The LLM may shape conversation and explanation, but authoritative data and recommendation logic remains in application services: this is not a trained recommendation model or vector similarity.',
      ),
    },
    {
      id: 'playback',
      title: text('Reproducción y gating de dispositivos', 'Playback and device gating'),
      body: text(
        'notify_playback es una capacidad acotada: puede notificar a un cliente propio activo sobre una petición de reproducción y el cliente decide cómo o si reproduce. No es reproducción autónoma ni iniciada por el backend, y no se afirma que el backend inicie la reproducción. Las órdenes de dispositivo son acotadas, ligadas al usuario y verificadas por capacidad.',
        'notify_playback is a bounded capability: it may notify an owned active client about a playback request, and the client decides how or whether to play. It is not autonomous or backend-started playback, and it never claims the backend starts playback. Device commands are bounded, user-scoped and capability-checked.',
      ),
    },
    {
      id: 'observability',
      title: text('Observabilidad y control', 'Observability and control'),
      body: text(
        'El trabajo del agente es trazable mediante resúmenes estructurados; los prompts en bruto no se exponen. Las capacidades se controlan con toggles tipados y desactivados por defecto, gobernados por administración.',
        'Agent work is traceable through structured summaries; raw prompts are not exposed. Capabilities are controlled by typed, disabled-by-default feature toggles governed by administration.',
      ),
    },
    {
      id: 'demonstrates',
      title: text('Qué demuestra', 'What it demonstrates'),
      body: text(
        'Que se puede construir IA de producto seria manteniendo contratos, límites deterministas, capacidades explícitas, trazabilidad y control humano y de producto, sin confundir el modelo con la autoridad del sistema.',
        'That serious product AI can be built while keeping contracts, deterministic boundaries, explicit capabilities, traceability and human/product control, without confusing the model with system authority.',
      ),
    },
  ],
  technologies: ['.NET', 'ASP.NET Core', 'Semantic Kernel', 'LiteLLM', 'Jellyfin API', 'PostgreSQL', 'EF Core', 'SignalR', 'typed contracts', 'tool/function calling'],
  capabilities: [
    { id: 'search', title: text('Búsqueda anclada al catálogo', 'Catalogue-grounded search'), description: text('Resultados resueltos contra el catálogo real de Jellyfin.', 'Results resolved against the real Jellyfin catalogue.') },
    { id: 'recommendations', title: text('Recomendaciones', 'Recommendations'), description: text('Puntuación determinista enriquecida por señales de gusto persistidas.', 'Deterministic scoring enriched by persisted taste signals.') },
    { id: 'lists', title: text('Listas privadas', 'Private lists'), description: text('Listas del usuario con herramientas tipadas y propiedad por usuario.', 'User-owned lists with typed tools and per-user ownership.') },
    { id: 'ratings', title: text('Valoraciones explícitas', 'Explicit ratings'), description: text('Valoraciones 1–10 que alimentan señales de gusto explicables.', '1–10 ratings feeding explainable taste signals.') },
    { id: 'taste', title: text('Gusto inspeccionable', 'Inspectable taste'), description: text('Perfil ligero, inspeccionable y reversible a partir de señales explícitas.', 'A lightweight, inspectable and reversible profile built from explicit signals.') },
    { id: 'tools', title: text('Herramientas acotadas', 'Bounded tools'), description: text('Tool calling allowlisted, tipado y no destructivo por defecto.', 'Allowlisted, typed and non-destructive-by-default tool calling.') },
    { id: 'playback', title: text('notify_playback con gating', 'Gated notify_playback'), description: text('Notificación tipada a un cliente propio; el cliente decide.', 'Typed notification to an owned client; the client decides.') },
    { id: 'devices', title: text('Órdenes de dispositivo', 'Device commands'), description: text('Canal SignalR propio con órdenes seguras y verificadas por capacidad.', 'Owned SignalR channel with safe, capability-checked commands.') },
    { id: 'observability', title: text('Trazabilidad', 'Traceability'), description: text('Trazas de decisión y ejecución estructuradas y resumidas.', 'Structured, summary-based decision and execution traces.') },
    { id: 'feature-gating', title: text('Gating tipado de capacidades', 'Typed feature gating'), description: text('Capacidades tipadas, desactivadas por defecto y controladas por administración.', 'Typed capabilities, disabled by default and administrator-controlled.') },
  ],
  boundaries: [
    { id: 'no-autonomy', label: text('No autónomo', 'Not autonomous'), detail: text('El sistema es acotado y activado por el usuario.', 'The system is bounded and user-initiated.') },
    { id: 'no-backend-playback', label: text('Reproducción no iniciada por el backend', 'Playback not backend-started'), detail: text('Solo notifica; el cliente decide y ejecuta.', 'It only notifies; the client decides and executes.') },
  ],
  nonClaims: [
    { id: 'no-rag', label: text('Sin RAG', 'No RAG'), state: 'NOT_CLAIMED' },
    { id: 'no-mcp', label: text('Sin MCP', 'No MCP'), state: 'NOT_CLAIMED' },
    { id: 'no-vector', label: text('Sin embeddings ni base vectorial', 'No embeddings or vector database'), state: 'NOT_CLAIMED' },
    { id: 'no-autonomous-agent', label: text('Sin agente autónomo', 'No autonomous agent'), state: 'NOT_CLAIMED' },
    { id: 'no-autonomous-playback', label: text('Sin reproducción autónoma', 'No autonomous playback'), state: 'NOT_CLAIMED' },
    { id: 'no-trained-model', label: text('Sin modelo de recomendación entrenado', 'No trained recommendation model'), state: 'NOT_CLAIMED' },
    { id: 'in-progress-devices', label: text('Orquestación remota más amplia', 'Broader remote orchestration'), state: 'IN_PROGRESS' },
  ],
  evidence: text('Proyecto personal Platform934 API. No se presenta como experiencia profesional equivalente.', 'Personal Platform934 API project. It is not presented as equivalent professional experience.'),
};

const professional: AiLabCase = {
  id: 'ai-lab-professional-incident-investigation',
  slug: 'incident-investigation',
  type: 'PROFESSIONAL_AI',
  depth: 'STANDARD_AI_CASE',
  origin: 'PROFESSIONAL',
  title: text('Investigación asistida de incidencias', 'AI-assisted incident investigation'),
  eyebrow: text('CASO PROFESIONAL / ANONIMIZADO', 'PROFESSIONAL CASE / ANONYMIZED'),
  summary: publicProfessionalModel.architectureCases.find(item => item.id === 'incident-diagnosis-agent')!.summary,
  lead: text(
    'Investigación asistida de incidencias. Un flujo de ingeniería supervisado parte de un traceId y orquesta telemetría y contexto operativo, conocimiento documentado e inspección de código para sintetizar un diagnóstico, preparar un informe y comunicarlo. La IA asiste la investigación; las herramientas y el contexto están acotados; la salida se revisa y la persona conserva el criterio de ingeniería. No hay remediación autónoma en producción y no se exponen sistemas, identificadores ni datos concretos del empleador.',
    'AI-assisted incident investigation. A supervised engineering workflow starts from a traceId and orchestrates telemetry and operational context, documented knowledge and code inspection to synthesise a diagnosis, prepare a report and communicate it. AI assists the investigation; tools and context are bounded; the output is reviewed and the human retains engineering judgment. There is no autonomous production remediation, and no employer systems, identifiers or concrete data are exposed.',
  ),
  status: 'LOCKED_FOR_PUBLICATION',
  statusLabel: text('EXPERIENCIA PROFESIONAL / ANONIMIZADA', 'PROFESSIONAL EXPERIENCE / ANONYMIZED'),
  problem: publicProfessionalModel.architectureCases.find(item => item.id === 'incident-diagnosis-agent')!.problem.content!,
  flow: {
    title: text('Flujo de investigación', 'Investigation flow'),
    caption: text('Flujo conceptual, sin topología específica del empleador.', 'Conceptual flow, without employer-specific topology.'),
    steps: [
      { id: 'trace', label: text('traceId', 'traceId'), detail: text('Punto de partida: un identificador de traza acotado.', 'Starting point: a bounded trace identifier.') },
      { id: 'telemetry', label: text('Telemetría / contexto operativo', 'Telemetry / operational context'), detail: text('Se reúne evidencia operativa relevante para la investigación.', 'Relevant operational evidence is gathered for the investigation.') },
      { id: 'knowledge', label: text('Conocimiento documentado', 'Documented knowledge'), detail: text('Se consulta conocimiento y documentación existente.', 'Existing knowledge and documentation are consulted.') },
      { id: 'code', label: text('Inspección de código / contexto', 'Code / context inspection'), detail: text('Se inspecciona el código y el contexto relacionado.', 'Related code and context are inspected.') },
      { id: 'synthesis', label: text('Síntesis diagnóstica', 'Diagnostic synthesis'), detail: text('Se sintetiza un diagnóstico a partir de la evidencia.', 'A diagnosis is synthesised from the evidence.') },
      { id: 'report', label: text('Informe', 'Report'), detail: text('Se prepara un informe revisable.', 'A reviewable report is prepared.') },
      { id: 'decision', label: text('Comunicación / decisión humana', 'Communication / human decision'), detail: text('La persona decide y comunica; no hay remediación autónoma.', 'The human decides and communicates; there is no autonomous remediation.') },
    ],
  },
  sections: [
    {
      id: 'supervised',
      title: text('Flujo supervisado y acotado', 'Supervised and bounded workflow'),
      body: text(
        'Las herramientas y el contexto están acotados; la IA asiste la investigación, no la dirige. El flujo se apoya en categorías conceptuales —telemetría, conocimiento documentado, inspección de código, síntesis, informe y comunicación— sin depender de un marco o proveedor concreto.',
        'Tools and context are bounded; AI assists the investigation, it does not lead it. The workflow relies on conceptual categories — telemetry, documented knowledge, code inspection, synthesis, reporting and communication — without depending on a specific framework or provider.',
      ),
    },
    {
      id: 'human-control',
      title: text('Revisión y decisión humanas', 'Human review and decision'),
      body: text(
        'La salida se revisa y la persona conserva el criterio de ingeniería: qué es relevante, qué se comunica y qué se corrige. El caso permanece neutral en cuanto a proveedor y framework, porque no hay un nombre profesional verificado que publicar.',
        'The output is reviewed and the human retains engineering judgment: what matters, what is communicated and what is fixed. The case stays provider- and framework-neutral, because no verified professional name exists to publish.',
      ),
    },
    {
      id: 'no-remediation',
      title: text('Sin remediación autónoma', 'No autonomous remediation'),
      body: text(
        'La IA asiste el diagnóstico y la preparación del informe; no aplica cambios autónomos en producción ni sustituye la decisión de ingeniería.',
        'AI assists diagnosis and report preparation; it applies no autonomous production changes and does not replace engineering judgment.',
      ),
    },
  ],
  technologies: [],
  capabilities: [
    { id: 'tool-assisted', title: text('Investigación con herramientas', 'Tool-assisted investigation'), description: text('Orquestación acotada de telemetría, conocimiento y código.', 'Bounded orchestration of telemetry, knowledge and code.') },
    { id: 'supervision', title: text('Supervisión humana', 'Human supervision'), description: text('La validación y la comunicación quedan en manos de la persona.', 'Validation and communication stay with the human.') },
  ],
  boundaries: [
    { id: 'provider-neutral', label: text('Neutral en proveedor/framework', 'Provider/framework-neutral'), detail: text('No se nombra ningún framework o proveedor profesional.', 'No professional framework or provider is named.') },
    { id: 'anonymized', label: text('Anonimizado', 'Anonymized'), detail: text('Sin sistemas, identificadores ni datos concretos del empleador.', 'No employer systems, identifiers or concrete data.') },
  ],
  nonClaims: [
    { id: 'no-remediation', label: text('Sin remediación autónoma en producción', 'No autonomous production remediation'), state: 'NOT_CLAIMED' },
    { id: 'no-self-healing', label: text('Sin auto-reparación de producción', 'No self-healing production'), state: 'NOT_CLAIMED' },
    { id: 'no-framework', label: text('Sin framework o proveedor profesional nombrado', 'No named professional framework or provider'), state: 'NOT_CLAIMED' },
    { id: 'no-incident-data', label: text('Sin incidencias, identificadores ni datos de cliente', 'No incidents, identifiers or customer data'), state: 'NOT_CLAIMED' },
  ],
  evidence: text('Experiencia profesional presentada solo a nivel conceptual y anonimizado.', 'Professional experience presented only at a conceptual, anonymized level.'),
};

const agentic: AiLabCase = {
  id: 'ai-lab-agentic-engineering-practice',
  slug: 'agentic-engineering',
  type: 'AGENTIC_ENGINEERING',
  depth: 'PRACTICE_CASE',
  origin: 'PORTFOLIO_ENGINEERING',
  title: text('Ingeniería agéntica con gates y evidencia', 'Agentic engineering with gates and evidence'),
  eyebrow: text('PRÁCTICA / INGENIERÍA', 'PRACTICE / ENGINEERING'),
  summary: text(
    'Cómo se usan IA y agentes supervisados dentro de un proceso de ingeniería disciplinado: hitos, evidencia, gates, verificación y revisión humana.',
    'How AI and supervised agents are used inside a disciplined engineering process: milestones, evidence, gates, verification and human review.',
  ),
  lead: text(
    'Ingeniería agéntica. Uso IA y agentes supervisados como parte de un proceso de ingeniería disciplinado: objetivos por hitos, criterios de aceptación explícitos, tareas acotadas, bloqueos de evidencia, verificación de tests, accesibilidad, rendimiento y regresión, gates automáticos, CI sobre SHA exacto, revisión humana y condiciones de parada. El proceso no es desarrollo de software autónomo: la persona sigue siendo responsable del alcance, la arquitectura, las decisiones editoriales, la aceptación y las decisiones de release.',
    'Agentic engineering. I use AI and supervised agents as part of a disciplined engineering process: milestone goals, explicit acceptance criteria, scoped tasks, evidence locks, test, accessibility, performance and regression verification, automated gates, exact-SHA CI, human review and stop conditions. The process is not autonomous software development: the human remains responsible for scope, architecture, editorial decisions, acceptance and release decisions.',
  ),
  status: 'IMPLEMENTED',
  statusLabel: text('PRÁCTICA ACTUAL', 'CURRENT PRACTICE'),
  problem: text(
    'Delegar implementación a agentes sin delegar el juicio técnico: hacer el trabajo trazable, verificable y reversible en lugar de confiar en la ejecución autónoma.',
    'Delegating implementation to agents without delegating technical judgment: making work traceable, verifiable and reversible instead of trusting autonomous execution.',
  ),
  flow: {
    title: text('Flujo de ingeniería', 'Engineering flow'),
    caption: text('Proceso conceptual, no una transcripción de chat. No se exponen prompts internos.', 'Conceptual process, not a chat transcript. Internal prompts are not exposed.'),
    steps: [
      { id: 'milestone', label: text('Problema / hito', 'Problem / milestone'), detail: text('Objetivo y alcance explícitos.', 'Explicit goal and scope.') },
      { id: 'evidence', label: text('Bloqueo de evidencia', 'Evidence lock'), detail: text('Se fija qué está probado y qué no.', 'What is proven and what is not is fixed.') },
      { id: 'task', label: text('Tarea acotada de implementación', 'Bounded implementation task'), detail: text('Un cambio con límites y criterios de aceptación.', 'One change with boundaries and acceptance criteria.') },
      { id: 'verification', label: text('Verificación automática', 'Automated verification'), detail: text('Lint, typecheck, tests, build, E2E y presupuestos.', 'Lint, typecheck, tests, build, E2E and budgets.') },
      { id: 'review', label: text('Revisión humana', 'Human review'), detail: text('La persona acepta, rechaza o corrige.', 'The human accepts, rejects or corrects.') },
      { id: 'sha', label: text('SHA exacto versionado', 'Versioned exact SHA'), detail: text('El resultado queda fijado y trazable.', 'The result is fixed and traceable.') },
    ],
  },
  sections: [
    {
      id: 'human-responsibility',
      title: text('Responsabilidad humana', 'Human responsibility'),
      body: text(
        'La persona sigue siendo responsable del alcance, la arquitectura, las decisiones editoriales, la aceptación y las decisiones de release. El proceso se apoya en especificaciones y verificación, no en ejecución autónoma.',
        'The human remains responsible for scope, architecture, editorial decisions, acceptance and release decisions. The process is grounded in specifications and verification, not autonomous execution.',
      ),
    },
    {
      id: 'stop-conditions',
      title: text('Condiciones de parada', 'Stop conditions'),
      body: text(
        'Cada tarea declara cuándo detenerse: evidencia insuficiente, conflicto con un bloqueo editorial, gates en rojo o decisiones fuera del alcance. Parar y preguntar forma parte del método.',
        'Every task declares when to stop: insufficient evidence, conflict with an editorial lock, failing gates or decisions outside scope. Stopping and asking is part of the method.',
      ),
    },
  ],
  technologies: [],
  capabilities: [
    { id: 'code-quality', title: text('Calidad de código', 'Code quality'), description: text('Lint y typecheck como gates obligatorios.', 'Lint and typecheck as mandatory gates.') },
    { id: 'tests', title: text('Tests', 'Tests'), description: text('Unitarios, integración y E2E.', 'Unit, integration and E2E.') },
    { id: 'accessibility', title: text('Accesibilidad', 'Accessibility'), description: text('Comprobaciones Axe sin violaciones graves ni críticas.', 'Axe checks with zero serious or critical violations.') },
    { id: 'no-js', title: text('Sin JavaScript', 'No-JS'), description: text('El contenido esencial funciona sin JS.', 'Core content works without JS.') },
    { id: 'responsive', title: text('Responsive', 'Responsive'), description: text('Sin overflow horizontal en los tamaños objetivo.', 'No horizontal overflow at target sizes.') },
    { id: 'performance', title: text('Rendimiento', 'Performance'), description: text('Presupuestos que no se relajan para pasar.', 'Budgets that are not loosened to pass.') },
    { id: 'ci', title: text('CI', 'CI'), description: text('Verificación en Linux sobre SHA exacto.', 'Exact-SHA Linux verification.') },
  ],
  boundaries: [
    { id: 'supervised', label: text('Supervisado', 'Supervised'), detail: text('Los agentes trabajan dentro de límites y gates.', 'Agents work inside boundaries and gates.') },
    { id: 'no-prompts', label: text('Sin prompts internos', 'No internal prompts'), detail: text('No se muestra el cuerpo de los prompts.', 'Prompt bodies are not shown.') },
  ],
  nonClaims: [
    { id: 'no-autonomous-development', label: text('No es desarrollo de software autónomo', 'Not autonomous software development'), state: 'NOT_CLAIMED' },
    { id: 'no-unsupervised', label: text('Sin agentes sin supervisión', 'No unsupervised agents'), state: 'NOT_CLAIMED' },
    { id: 'no-ai-ownership', label: text('La IA no posee alcance, arquitectura ni release', 'AI does not own scope, architecture or release'), state: 'NOT_CLAIMED' },
  ],
  evidence: text('Evidencia de PORTFOLIO_ENGINEERING en este repositorio (A1–A6.6) y del flujo profesional supervisado.', 'PORTFOLIO_ENGINEERING evidence in this repository (A1–A6.6) and the supervised professional workflow.'),
};

const anexia: AiLabCase = {
  id: 'ai-lab-anexia-mlnet-property-pricing',
  type: 'HISTORICAL_AI',
  depth: 'HISTORICAL_NOTE',
  origin: 'HISTORICAL_PROFESSIONAL',
  title: text('Modelos predictivos inmobiliarios con ML.NET', 'Real-estate predictive models with ML.NET'),
  eyebrow: text('HISTÓRICO / ML.NET', 'HISTORICAL / ML.NET'),
  summary: text(
    'Trabajo profesional histórico en el dominio inmobiliario: modelos predictivos y trabajo basado en modelos con ML.NET y PostgreSQL.',
    'Historical professional work in the property domain: predictive and model-based work with ML.NET and PostgreSQL.',
  ),
  lead: text(
    'Trabajo profesional histórico en el dominio inmobiliario: modelos predictivos y trabajo basado en modelos con ML.NET y PostgreSQL, dentro de responsabilidad end-to-end. Componentes algorítmicos y de datos podían convivir con componentes de ML. Es contexto histórico de IA/ML aplicada, no un caso de IA generativa moderna.',
    'Historical professional work in the property domain: predictive and model-based work with ML.NET and PostgreSQL, within end-to-end responsibility. Algorithmic and data components could coexist with ML components. This is historical applied AI/ML context, not a modern generative-AI case.',
  ),
  status: 'HISTORICAL',
  statusLabel: text('HISTÓRICO', 'HISTORICAL'),
  problem: text(
    'Contexto histórico de ML aplicado: trabajo predictivo dentro de un producto real, antes de la era de los LLM.',
    'Historical applied-ML context: predictive work inside a real product, before the LLM era.',
  ),
  sections: [],
  technologies: ['ML.NET', 'PostgreSQL'],
  capabilities: [],
  boundaries: [
    { id: 'historical', label: text('Histórico', 'Historical'), detail: text('No es IA generativa moderna.', 'It is not modern generative AI.') },
  ],
  nonClaims: [
    { id: 'no-genai', label: text('Sin GenAI, LLM ni deep learning', 'No GenAI, LLM or deep learning'), state: 'NOT_CLAIMED' },
    { id: 'no-metrics', label: text('Sin exactitud, dataset, escala ni métricas de negocio', 'No accuracy, dataset, scale or business metrics'), state: 'NOT_CLAIMED' },
  ],
  evidence: text('Experiencia profesional histórica (Anexia, 2017–2021).', 'Historical professional experience (Anexia, 2017–2021).'),
};

const vector: AiLabCase = {
  id: 'ai-lab-vector-classic-nlp',
  type: 'HISTORICAL_AI',
  depth: 'HISTORICAL_NOTE',
  origin: 'HISTORICAL_PROFESSIONAL',
  title: text('NLP clásico y automatización de campañas', 'Classic NLP and campaign automation'),
  eyebrow: text('HISTÓRICO / NLP CLÁSICO', 'HISTORICAL / CLASSIC NLP'),
  summary: text(
    'Trabajo histórico en automatización de procesos e informes y sistemas de campañas, con NLP/ML clásico y optimización.',
    'Historical work in process/reporting automation and campaign systems, with classic NLP/ML and optimization.',
  ),
  lead: text(
    'Trabajo profesional histórico en automatización de procesos e informes y sistemas de campañas, con NLP/ML clásico (métodos léxicos, Bag of Words, TF-IDF, Naive Bayes), automatización de bots, teoría de juegos, automatización de Adwords y puja/optimización adaptativa. Es contexto histórico previo a la era de los LLM; no implica IA generativa moderna.',
    'Historical professional work in process/reporting automation and campaign systems, with classic NLP/ML (lexical methods, Bag of Words, TF-IDF, Naive Bayes), bot automation, game theory, Adwords automation and adaptive bidding/optimization. This is pre-LLM-era historical context; it does not imply modern generative AI.',
  ),
  status: 'HISTORICAL',
  statusLabel: text('HISTÓRICO', 'HISTORICAL'),
  problem: text(
    'Contexto histórico de NLP/ML clásico y optimización, anterior a los transformers y a la IA generativa.',
    'Historical context of classic NLP/ML and optimization, predating transformers and generative AI.',
  ),
  sections: [],
  technologies: ['.NET', 'Bag of Words', 'TF-IDF', 'Naive Bayes'],
  capabilities: [],
  boundaries: [
    { id: 'historical', label: text('Histórico', 'Historical'), detail: text('No se traduce a terminología GenAI moderna.', 'It is not translated into modern GenAI terminology.') },
  ],
  nonClaims: [
    { id: 'no-modern-ai', label: text('Sin LLM, transformers, RAG, embeddings ni agentes', 'No LLM, transformers, RAG, embeddings or agents'), state: 'NOT_CLAIMED' },
    { id: 'no-evasion', label: text('Sin encuadre de evasión/anti-detección', 'No anti-detection/evasion framing'), state: 'NOT_CLAIMED' },
  ],
  evidence: text('Experiencia profesional histórica (Vector ITC Group, 2017).', 'Historical professional experience (Vector ITC Group, 2017).'),
};

export const aiLabCases: AiLabCase[] = [platform934, professional, agentic, anexia, vector];

export const aiLabDetailSlugs = aiLabCases.flatMap(item => (item.slug ? [item.slug] : []));

export function getAiLabCase(locale: Locale, slug: string) {
  const item = aiLabCases.find(value => value.slug === slug);
  return item ? localizeCase(item, locale) : undefined;
}

function localizeCase(item: AiLabCase, locale: Locale) {
  const l = (value: Localized) => localize(value, locale);
  return {
    ...item,
    title: l(item.title), eyebrow: l(item.eyebrow), summary: l(item.summary), lead: l(item.lead), statusLabel: l(item.statusLabel),
    problem: l(item.problem), evidence: l(item.evidence),
    architecture: item.architecture ? { title: l(item.architecture.title), caption: l(item.architecture.caption), groups: item.architecture.groups.map(group => ({ ...group, title: l(group.title), nodes: group.nodes.map(l), note: group.note ? l(group.note) : undefined })) } : undefined,
    flow: item.flow ? { title: l(item.flow.title), caption: l(item.flow.caption), steps: item.flow.steps.map(step => ({ ...step, label: l(step.label), detail: l(step.detail) })) } : undefined,
    sections: item.sections.map(section => ({ ...section, title: l(section.title), body: l(section.body) })),
    capabilities: item.capabilities.map(capability => ({ ...capability, title: l(capability.title), description: l(capability.description) })),
    boundaries: item.boundaries.map(boundary => ({ ...boundary, label: l(boundary.label), detail: l(boundary.detail) })),
    nonClaims: item.nonClaims.map(nonClaim => ({ ...nonClaim, label: l(nonClaim.label) })),
  };
}

export function getAiLabCases(locale: Locale) {
  return aiLabCases.map(item => localizeCase(item, locale));
}

export function validateAiLabModel(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const types: AiLabCaseType[] = ['PRODUCT_AI', 'PROFESSIONAL_AI', 'AGENTIC_ENGINEERING', 'HISTORICAL_AI'];
  const depths: AiLabCaseDepth[] = ['DEEP_AI_CASE', 'STANDARD_AI_CASE', 'PRACTICE_CASE', 'HISTORICAL_NOTE'];
  const empty = (value: Localized | undefined) => !value || !value.es.trim() || !value.en.trim();
  for (const item of aiLabCases) {
    if (!item.id.trim()) errors.push('case without id'); else if (ids.has(item.id)) errors.push(`duplicate case id ${item.id}`); ids.add(item.id);
    if (item.slug) { if (slugs.has(item.slug)) errors.push(`duplicate slug ${item.slug}`); slugs.add(item.slug); }
    if (!types.includes(item.type)) errors.push(`${item.id} has invalid type`);
    if (!depths.includes(item.depth)) errors.push(`${item.id} has invalid depth`);
    for (const [field, value] of Object.entries({ title: item.title, eyebrow: item.eyebrow, summary: item.summary, lead: item.lead, statusLabel: item.statusLabel, problem: item.problem, evidence: item.evidence })) if (empty(value)) errors.push(`${item.id}.${field} is not bilingual`);
    for (const section of item.sections) { if (empty(section.title) || empty(section.body)) errors.push(`${item.id}.sections.${section.id} is not bilingual`); }
    for (const capability of item.capabilities) if (empty(capability.title) || empty(capability.description)) errors.push(`${item.id}.capabilities.${capability.id} is not bilingual`);
    for (const nonClaim of item.nonClaims) if (empty(nonClaim.label)) errors.push(`${item.id}.nonClaims.${nonClaim.id} is not bilingual`);
  }
  return errors;
}
