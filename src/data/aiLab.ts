import { publicProfessionalModel } from './professional/model';
import type { Locale } from '../i18n/core';

export type Localized = { es: string; en: string };
export const text = (es: string, en: string): Localized => ({ es, en });
const localize = (value: Localized, locale: Locale) => value[locale];

export type AiLabCaseType = 'PRODUCT_AI' | 'PROFESSIONAL_AI' | 'AGENTIC_ENGINEERING' | 'HISTORICAL_AI';
export type AiLabCaseDepth = 'DEEP_AI_CASE' | 'STANDARD_AI_CASE' | 'PRACTICE_CASE' | 'HISTORICAL_NOTE';
export type AiLabCaseOrigin = 'PERSONAL_PROJECT' | 'PROFESSIONAL' | 'PORTFOLIO_ENGINEERING' | 'HISTORICAL_PROFESSIONAL';
export type AiLabCaseStatus = 'IMPLEMENTED' | 'IN_PROGRESS' | 'HISTORICAL' | 'LOCKED_FOR_PUBLICATION';

export interface AiLabSection { id: string; title: Localized; body: Localized }
export interface AiLabFlowStep { id: string; label: Localized; detail: Localized }
export interface AiLabArchitectureGroup { id: string; title: Localized; nodes: Localized[]; note?: Localized; parallel?: boolean }
export interface AiLabCapability { id: string; title: Localized; description: Localized }
export interface AiLabNonClaim { id: string; label: Localized }
export interface AiLabRelated { label: Localized; href: string; external?: boolean }
export interface AiLabMedia { src: string; alt: Localized; caption?: Localized; width: number; height: number }
export interface AiLabAxis { id: string; title: Localized; hook: Localized; detail: Localized; closing?: Localized; caseHref: string; relatedLabel: Localized; relatedHref: string; relatedExternal?: boolean }

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
  intentTitle: Localized;
  problem: Localized;
  architecture?: AiLabArchitecture;
  flow?: AiLabFlow;
  sections: AiLabSection[];
  technologies: string[];
  capabilities: AiLabCapability[];
  limitsTitle: Localized;
  nonClaims: AiLabNonClaim[];
  media?: AiLabMedia[];
  related?: AiLabRelated[];
}

export const aiLabLanding = {
  eyebrow: text('AI LAB / DAME CINCO MINUTOS…', 'AI LAB / GIVE ME FIVE MINUTES…'),
  title: text('Quería probar una cosa.', 'I wanted to try something.'),
  intro: [
    text('Es una frase bastante peligrosa.', 'It is a fairly dangerous sentence.'),
    text(
      'A veces termina en una prueba de media hora. Otras, en un agente con herramientas, permisos, trazas, criterios de aceptación y una carpeta que definitivamente no existía esa mañana.',
      'Sometimes it ends in a half-hour test. Other times, in an agent with tools, permissions, traces, acceptance criteria and a folder that definitely did not exist that morning.',
    ),
    text(
      'Este es el rincón donde voy dejando esas pruebas: cosas que quería entender, ideas que parecían sencillas, experimentos que acabaron funcionando y límites que descubrí después de chocarme con ellos.',
      'This is the corner where I leave those experiments: things I wanted to understand, ideas that looked simple, experiments that ended up working and limits I discovered after running into them.',
    ),
  ],
  metaDescription: text(
    'Experimentos personales con IA y agentes: Platform934 API, investigación de incidencias, ingeniería agéntica y contexto histórico de ML/NLP. Lo que fui probando, lo que funcionó y los límites que encontré.',
    'Personal experiments with AI and agents: Platform934 API, incident investigation, agentic engineering and historical ML/NLP context. What I tried, what worked and the limits I ran into.',
  ),
  axisTitle: text('En qué estoy trasteando', 'What I am tinkering with'),
  professionalTitle: text('También en el trabajo', 'At work too'),
  professionalIntro: text('Hay madrigueras que empiezan con «quería probar una cosa». Y otras empiezan con un traceId. Este caso pertenece claramente al segundo grupo.', 'Some rabbit holes start with “I wanted to try something.” Others start with a traceId. This case clearly belongs to the second group.'),
  professionalBody: text('He trabajado en un flujo asistido por herramientas que conecta telemetría, trazas, conocimiento y código para ayudar a reconstruir qué ha ocurrido y generar un informe útil para investigarlo.', 'I have worked on a tool-assisted flow that connects telemetry, traces, knowledge and code to help reconstruct what happened and produce a useful investigation report.'),
  professionalDetail: text('La IA puede seguir pistas, relacionar información y ayudar a reducir el tiempo que pasamos saltando entre herramientas. Lo que no hace es decidir que ya sabe suficiente y ponerse a arreglar producción por su cuenta.', 'AI can follow clues, connect information and help reduce the time we spend jumping between tools. What it does not do is decide it knows enough and start fixing production on its own.'),
  professionalClosing: text('Investigar, sí. Tener las llaves del castillo, no.', 'Investigate, yes. Hold the keys to the castle, no.'),
  historicalTitle: text('Antes de que todo tuviera un chatbot', 'Before everything had a chatbot'),
  historicalLead: [
    text('Lo de trastear con IA no empezó con los LLM.', 'My tinkering with AI did not start with LLMs.'),
    text('Antes de prompts, agentes, embeddings y conversaciones sobre si algo necesita realmente un RAG, ya había estado trabajando con modelos predictivos, clasificación de texto y automatización basada en ML.', 'Before prompts, agents, embeddings and conversations about whether something really needs RAG, I had already worked with predictive models, text classification and ML-based automation.'),
    text('No lo cuento como GenAI con bigote postizo. Es otra etapa, con otras herramientas y otros problemas. Pero explica bastante bien de dónde viene la curiosidad.', 'I am not presenting it as GenAI with a fake moustache. It is another period, with different tools and different problems. But it explains rather well where the curiosity comes from.'),
  ],
  capabilitiesLabel: text('Lo que hay montado', "What's in there"),
  technologiesLabel: text('Tecnologías', 'Technologies'),
  backToLab: text('← Volver al AI Lab', '← Back to AI Lab'),
  openCase: text('Abrir caso', 'Open case'),
};

export const aiLabAxes: AiLabAxis[] = [
  {
    id: 'product-ai',
    title: text('IA de producto', 'Product AI'),
    hook: text(
      'Me interesa especialmente qué pasa cuando la IA deja de ser una demo y tiene que convivir con datos, permisos y reglas de negocio de verdad.',
      'What interests me most is what happens when AI stops being a demo and has to live with real data, permissions and business rules.',
    ),
    detail: text(
      'Porque recomendar una película en un prompt es fácil. Hacerlo cuando existen usuarios reales, permisos, un catálogo que cambia, reglas de negocio y acciones que no deberían depender de que el modelo esté inspirado ese día ya es bastante más entretenido. En Platform934 estoy explorando precisamente esa frontera: el modelo puede interpretar, razonar y proponer; la aplicación sigue teniendo la última palabra.',
      'Recommending a film in a prompt is easy. Doing it with real users, permissions, a changing catalogue, business rules and actions that should not depend on whether the model feels inspired that day is much more interesting. In Platform934 I am exploring exactly that boundary: the model can interpret, reason and propose; the application still has the final say.',
    ),
    closing: text('El catálogo es real. Los contratos son reales. Los permisos son reales. Y si una acción no existe, el modelo no puede inventársela.', 'The catalogue is real. The contracts are real. The permissions are real. And if an action does not exist, the model cannot invent it.'),
    caseHref: '/ai-lab/platform934/',
    relatedLabel: text('Probado en Platform934 API', 'Tried in Platform934 API'),
    relatedHref: '/projects/platform934-api/',
  },
  {
    id: 'agentic-engineering',
    title: text('Ingeniería agéntica', 'Agentic Engineering'),
    hook: text(
      'También quería averiguar cuánto trabajo podía delegar a un agente sin acabar delegándole el criterio.',
      'I also wanted to find out how much work I could hand to an agent without ending up handing over the judgement.',
    ),
    detail: text(
      'La respuesta corta: bastante. La respuesta larga acabó incluyendo hitos, criterios de aceptación, verificaciones automáticas, evidencias, límites de actuación y revisión humana.',
      'The short answer: quite a lot. The long answer ended up involving milestones, acceptance criteria, automated checks, evidence, operating boundaries and human review.',
    ),
    closing: text('Un agente puede investigar, implementar, comprobar resultados y avanzar durante bastante tiempo por su cuenta. Pero decidir si estamos resolviendo el problema correcto sigue siendo una responsabilidad que prefiero no externalizar a una ventana de contexto.', 'An agent can investigate, implement, check results and make progress for quite a while on its own. But deciding whether we are solving the right problem remains a responsibility I would rather not outsource to a context window.'),
    caseHref: '/ai-lab/agentic-engineering/',
    relatedLabel: text('Relacionado: AntoñiOS', 'Related: AntoñiOS'),
    relatedHref: '/projects/antonios/',
  },
];

const platform934: AiLabCase = {
  id: 'ai-lab-platform934-agentic-architecture',
  slug: 'platform934',
  type: 'PRODUCT_AI',
  depth: 'DEEP_AI_CASE',
  origin: 'PERSONAL_PROJECT',
  title: text('Platform934 API: que el modelo proponga, no que decida', 'Platform934 API: let the model propose, not decide'),
  eyebrow: text('IA DE PRODUCTO / PROYECTO PERSONAL', 'PRODUCT AI / PERSONAL PROJECT'),
  summary: text(
    'Poder hablar con mi biblioteca de Jellyfin sin que el modelo se inventara el catálogo ni decidiera por su cuenta qué hacer con el dispositivo.',
    'Talking to my Jellyfin library without the model making up the catalogue or deciding on its own what to do with the device.',
  ),
  lead: text(
    'Esto empezó con algo bastante simple: quería pedirle cosas a mi biblioteca en lenguaje natural. Lo interesante llegó cuando el modelo tenía que proponer una acción de verdad. El agente se apoya en contratos tipados, herramientas allowlisted y tool calling acotado: el modelo puede elegir una función de alto nivel, pero los servicios de aplicación deterministas validan los argumentos, resuelven los identificadores contra el catálogo real y conservan la autoridad sobre datos y acciones. Las recomendaciones combinan heurísticas deterministas con señales de gusto explícitas; las listas y valoraciones son privadas. La reproducción no la inicia el backend: una capacidad acotada notifica a un cliente propio y el cliente decide si reproduce. Jellyfin sigue siendo la autoridad del catálogo y de la reproducción.',
    'This started with something fairly simple: I wanted to ask my library for things in natural language. The interesting part arrived when the model actually had to propose an action. The agent relies on typed contracts, allowlisted tools and bounded tool calling: the model may pick a high-level function, but deterministic application services validate the arguments, resolve identifiers against the real catalogue and remain authoritative over data and actions. Recommendations combine deterministic heuristics with explicit taste signals; lists and ratings are private. Playback is not started by the backend: a bounded capability notifies an owned client and the client decides whether to play. Jellyfin remains the catalogue and playback authority.',
  ),
  status: 'IMPLEMENTED',
  statusLabel: text('IMPLEMENTADO / ACTIVO', 'IMPLEMENTED / ACTIVE'),
  relatedProjectSlug: 'platform934',
  intentTitle: text('Qué quería averiguar', 'What I wanted to find out'),
  problem: text(
    'Si se podía añadir una capa conversacional sobre un catálogo real sin convertir el modelo en fuente de verdad ni en un agente autónomo sobre Jellyfin.',
    'Whether a conversational layer could sit over a real catalogue without turning the model into the source of truth or an autonomous agent over Jellyfin.',
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
      title: text('Dónde está el límite', 'Where the line is'),
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
      id: 'learned',
      title: text('Lo que me hizo cambiar de idea', 'What changed my mind'),
      body: text(
        'Al principio era tentador dejar que el modelo resolviera más cosas por su cuenta. En cuanto una acción tocaba el catálogo o el dispositivo, el sistema se volvía difícil de verificar. Moverla a un servicio que la validaba contra el catálogo real dejó el resto mucho más fácil de sostener.',
        'At first it was tempting to let the model resolve more things on its own. As soon as an action touched the catalogue or the device, the system became hard to verify. Moving it to a service that validated it against the real catalogue made the rest much easier to keep stable.',
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
  limitsTitle: text('Dónde me detuve', 'Where I stopped'),
  nonClaims: [
    { id: 'no-rag', label: text('No metí RAG: para buscar dentro de un catálogo que ya conozco no lo necesitaba.', 'I did not add RAG: I did not need it to search a catalogue I already have.') },
    { id: 'no-mcp', label: text('No uso MCP. Las herramientas son funciones propias, tipadas y allowlisted.', 'I do not use MCP. The tools are my own typed, allowlisted functions.') },
    { id: 'no-vector', label: text('Sin embeddings ni base de datos vectorial: las recomendaciones son deterministas, no similitud vectorial.', 'No embeddings or vector database: recommendations are deterministic, not vector similarity.') },
    { id: 'no-autonomous-agent', label: text('El agente no es autónomo: se activa desde una conversación y no decide por su cuenta.', 'The agent is not autonomous: it starts from a conversation and does not decide on its own.') },
    { id: 'no-autonomous-playback', label: text('El backend no inicia la reproducción: solo notifica a un cliente propio y el cliente decide.', 'The backend does not start playback: it only notifies an owned client and the client decides.') },
    { id: 'no-trained-model', label: text('No hay un modelo de recomendación entrenado: son heurísticas y señales explícitas.', 'There is no trained recommendation model: it is heuristics and explicit signals.') },
    { id: 'in-progress-devices', label: text('La orquestación remota más amplia sigue en desarrollo.', 'Broader remote orchestration is still in progress.') },
  ],
  media: [
    {
      src: '/images/projects/platform934/home.webp',
      width: 1600,
      height: 1174,
      alt: text('Inicio del cliente de Platform934 con catálogo multimedia, favoritos, películas y series.', 'Platform934 client home with the media catalogue, favourites, films and series.'),
      caption: text('El producto al que acaban llegando estas conversaciones.', 'The product these conversations end up in.'),
    },
  ],
  related: [
    { label: text('Ver el proyecto Platform934 API', 'View the Platform934 API project'), href: '/projects/platform934-api/' },
  ],
};

const professional: AiLabCase = {
  id: 'ai-lab-professional-incident-investigation',
  slug: 'incident-investigation',
  type: 'PROFESSIONAL_AI',
  depth: 'STANDARD_AI_CASE',
  origin: 'PROFESSIONAL',
  title: text('Investigación asistida de incidencias', 'AI-assisted incident investigation'),
  eyebrow: text('TRABAJO / ANONIMIZADO', 'WORK / ANONYMIZED'),
  summary: publicProfessionalModel.architectureCases.find(item => item.id === 'incident-diagnosis-agent')!.summary,
  lead: text(
    'En el trabajo montamos un flujo de ingeniería supervisado que parte de un traceId y orquesta telemetría y contexto operativo, conocimiento documentado e inspección de código para sintetizar un diagnóstico, preparar un informe y comunicarlo. La IA asiste la investigación; las herramientas y el contexto están acotados; la salida se revisa y la persona conserva el criterio de ingeniería. No hay remediación autónoma en producción y no se exponen sistemas, identificadores ni datos concretos del empleador.',
    'At work we built a supervised engineering flow that starts from a traceId and orchestrates telemetry and operational context, documented knowledge and code inspection to synthesise a diagnosis, prepare a report and communicate it. AI assists the investigation; tools and context are bounded; the output is reviewed and the human retains engineering judgement. There is no autonomous production remediation, and no employer systems, identifiers or concrete data are exposed.',
  ),
  status: 'LOCKED_FOR_PUBLICATION',
  statusLabel: text('EXPERIENCIA PROFESIONAL / ANONIMIZADA', 'PROFESSIONAL EXPERIENCE / ANONYMIZED'),
  intentTitle: text('De dónde salió', 'Where it came from'),
  problem: publicProfessionalModel.architectureCases.find(item => item.id === 'incident-diagnosis-agent')!.problem.content!,
  flow: {
    title: text('El recorrido', 'The path'),
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
      title: text('Cómo lo monté', 'How I put it together'),
      body: text(
        'Las herramientas y el contexto están acotados; la IA asiste la investigación, no la dirige. El flujo se apoya en categorías conceptuales —telemetría, conocimiento documentado, inspección de código, síntesis, informe y comunicación— sin depender de un marco o proveedor concreto.',
        'Tools and context are bounded; AI assists the investigation, it does not lead it. The flow relies on conceptual categories — telemetry, documented knowledge, code inspection, synthesis, reporting and communication — without depending on a specific framework or provider.',
      ),
    },
    {
      id: 'human-control',
      title: text('Dónde paro yo', 'Where I step in'),
      body: text(
        'La salida se revisa y la persona conserva el criterio de ingeniería: qué es relevante, qué se comunica y qué se corrige. El caso permanece neutral en cuanto a proveedor y framework, porque no hay un nombre profesional verificado que publicar.',
        'The output is reviewed and the human retains engineering judgement: what matters, what is communicated and what is fixed. The case stays provider- and framework-neutral, because no verified professional name exists to publish.',
      ),
    },
    {
      id: 'no-remediation',
      title: text('Hasta dónde llega', 'How far it goes'),
      body: text(
        'La IA asiste el diagnóstico y la preparación del informe; no aplica cambios autónomos en producción ni sustituye la decisión de ingeniería.',
        'AI assists diagnosis and report preparation; it applies no autonomous production changes and does not replace engineering judgement.',
      ),
    },
  ],
  technologies: [],
  capabilities: [
    { id: 'tool-assisted', title: text('Investigación con herramientas', 'Tool-assisted investigation'), description: text('Orquestación acotada de telemetría, conocimiento y código.', 'Bounded orchestration of telemetry, knowledge and code.') },
    { id: 'supervision', title: text('Supervisión humana', 'Human supervision'), description: text('La validación y la comunicación quedan en manos de la persona.', 'Validation and communication stay with the human.') },
  ],
  limitsTitle: text('Lo que dejo fuera', 'What I leave out'),
  nonClaims: [
    { id: 'no-remediation', label: text('No hay remediación autónoma en producción.', 'There is no autonomous production remediation.') },
    { id: 'no-self-healing', label: text('Tampoco auto-reparación: el flujo diagnostica y prepara un informe, no toca el sistema.', 'No self-healing either: the flow diagnoses and prepares a report, it does not touch the system.') },
    { id: 'no-framework', label: text('No named professional framework or provider: no hay un nombre verificado que publicar.', 'No named professional framework or provider: there is no verified name to publish.') },
    { id: 'no-incident-data', label: text('Sin incidencias, identificadores ni datos de cliente.', 'No incidents, identifiers or customer data.') },
  ],
};

const agentic: AiLabCase = {
  id: 'ai-lab-agentic-engineering-practice',
  slug: 'agentic-engineering',
  type: 'AGENTIC_ENGINEERING',
  depth: 'PRACTICE_CASE',
  origin: 'PORTFOLIO_ENGINEERING',
  title: text('Ingeniería agéntica: delegar trabajo sin delegar el criterio', 'Agentic engineering: delegate work without delegating the judgement'),
  eyebrow: text('PRÁCTICA / CÓMO TRABAJO', 'PRACTICE / HOW I WORK'),
  summary: text(
    'Cuánto trabajo se puede dejar a un agente supervisado dentro de un proceso de ingeniería sin soltar el alcance, la arquitectura ni la decisión.',
    'How much work a supervised agent can take on inside an engineering process without letting go of scope, architecture or the decision.',
  ),
  lead: text(
    'También quería averiguar cuánto trabajo podía delegar a un agente sin acabar delegándole el criterio. Lo fui probando en este mismo portfolio: objetivos por hitos, criterios de aceptación explícitos, tareas acotadas, bloqueos de evidencia, verificación de tests, accesibilidad, rendimiento y regresión, gates automáticos, CI sobre SHA exacto, revisión humana y condiciones de parada. El proceso no es desarrollo de software autónomo: la persona sigue siendo responsable del alcance, la arquitectura, las decisiones editoriales, la aceptación y las decisiones de release.',
    'I also wanted to find out how much work I could hand to an agent without ending up handing over the judgement. I tried it on this very portfolio: milestone goals, explicit acceptance criteria, scoped tasks, evidence locks, test, accessibility, performance and regression verification, automated gates, exact-SHA CI, human review and stop conditions. The process is not autonomous software development: the human remains responsible for scope, architecture, editorial decisions, acceptance and release decisions.',
  ),
  status: 'IMPLEMENTED',
  statusLabel: text('PRÁCTICA ACTUAL', 'CURRENT PRACTICE'),
  intentTitle: text('Qué quería averiguar', 'What I wanted to find out'),
  problem: text(
    'Delegar implementación a agentes sin delegar el juicio técnico: hacer el trabajo trazable, verificable y reversible en lugar de confiar en la ejecución autónoma.',
    'Delegating implementation to agents without delegating technical judgement: making work traceable, verifiable and reversible instead of trusting autonomous execution.',
  ),
  flow: {
    title: text('El proceso', 'The process'),
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
      title: text('Lo que sigue siendo mío', 'What stays mine'),
      body: text(
        'La persona sigue siendo responsable del alcance, la arquitectura, las decisiones editoriales, la aceptación y las decisiones de release. El proceso se apoya en especificaciones y verificación, no en ejecución autónoma.',
        'The human remains responsible for scope, architecture, editorial decisions, acceptance and release decisions. The process is grounded in specifications and verification, not autonomous execution.',
      ),
    },
    {
      id: 'stop-conditions',
      title: text('Cuándo paro', 'When I stop'),
      body: text(
        'Cada tarea declara cuándo detenerse: evidencia insuficiente, conflicto con un bloqueo editorial, gates en rojo o decisiones fuera del alcance. Parar y preguntar forma parte del trabajo.',
        'Every task declares when to stop: insufficient evidence, conflict with an editorial lock, failing gates or decisions outside scope. Stopping and asking is part of the work.',
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
  limitsTitle: text('Dónde pongo los límites', 'Where I draw the line'),
  nonClaims: [
    { id: 'no-autonomous-development', label: text('Not autonomous software development: no dejo que un agente cierre el trabajo solo.', 'Not autonomous software development: I do not let an agent close the work on its own.') },
    { id: 'no-unsupervised', label: text('Sin agentes sin supervisión: siempre hay una revisión humana antes de aceptar.', 'No unsupervised agents: there is always a human review before accepting.') },
    { id: 'no-ai-ownership', label: text('El alcance, la arquitectura y el release no son de la IA; siguen siendo míos.', 'AI does not own scope, architecture or release; they stay mine.') },
  ],
  media: [
    {
      src: '/images/projects/antonios/desktop.webp',
      width: 1280,
      height: 720,
      alt: text('Escritorio de AntoñiOS con las ventanas de Perfil, Terminal y Proyectos.', 'AntoñiOS desktop with Profile, Terminal and Projects windows.'),
      caption: text('AntoñiOS, el proyecto donde fui probando este flujo.', 'AntoñiOS, the project where I tried this flow.'),
    },
  ],
  related: [
    { label: text('Ver AntoñiOS', 'View AntoñiOS'), href: '/projects/antonios/' },
  ],
};

const anexia: AiLabCase = {
  id: 'ai-lab-anexia-mlnet-property-pricing',
  type: 'HISTORICAL_AI',
  depth: 'HISTORICAL_NOTE',
  origin: 'HISTORICAL_PROFESSIONAL',
  title: text('Modelos predictivos inmobiliarios', 'Predictive models for real estate'),
  eyebrow: text('HISTÓRICO / ML.NET', 'HISTORICAL / ML.NET'),
  summary: text(
    'Trabajo profesional histórico en el dominio inmobiliario: modelos predictivos y trabajo basado en modelos con ML.NET y PostgreSQL.',
    'Historical professional work in the property domain: predictive and model-based work with ML.NET and PostgreSQL.',
  ),
  lead: text(
    'En el dominio inmobiliario trabajé con ML.NET y PostgreSQL en sistemas que combinaban desarrollo de producto, datos y modelos predictivos. No había un chatbot explicando elegantemente lo que acababa de hacer. Había datos, código, modelos y resultados que tenían que integrarse en una aplicación de verdad.',
    'In the real-estate domain I worked with ML.NET and PostgreSQL on systems combining product development, data and predictive models. There was no chatbot elegantly explaining what it had just done. There were data, code, models and results that had to be integrated into a real application.',
  ),
  status: 'HISTORICAL',
  statusLabel: text('HISTÓRICO', 'HISTORICAL'),
  intentTitle: text('Contexto', 'Context'),
  problem: text(
    'Contexto histórico de ML aplicado: trabajo predictivo dentro de un producto real, antes de la era de los LLM.',
    'Historical applied-ML context: predictive work inside a real product, before the LLM era.',
  ),
  sections: [],
  technologies: ['ML.NET', 'PostgreSQL'],
  capabilities: [],
  limitsTitle: text('Lo que no afirmo', 'What I do not claim'),
  nonClaims: [
    { id: 'no-genai', label: text('No es GenAI, ni LLM, ni deep learning.', 'It is not GenAI, LLM or deep learning.') },
    { id: 'no-metrics', label: text('Sin exactitud, dataset, escala ni métricas de negocio.', 'No accuracy, dataset, scale or business metrics.') },
  ],
};

const vector: AiLabCase = {
  id: 'ai-lab-vector-classic-nlp',
  type: 'HISTORICAL_AI',
  depth: 'HISTORICAL_NOTE',
  origin: 'HISTORICAL_PROFESSIONAL',
  title: text('Cuando las palabras todavía eran vectores bastante feos', 'When words were still rather ugly vectors'),
  eyebrow: text('HISTÓRICO / NLP CLÁSICO', 'HISTORICAL / CLASSIC NLP'),
  summary: text(
    'Trabajo histórico en automatización de procesos e informes y sistemas de campañas, con NLP/ML clásico y optimización.',
    'Historical work in process/reporting automation and campaign systems, with classic NLP/ML and optimization.',
  ),
  lead: text(
    'También trabajé con NLP clásico aplicado a automatización de campañas y procesos: Bag of Words, TF-IDF, Naive Bayes, métodos léxicos, bots y sistemas de optimización y puja adaptativa. Las palabras acababan convertidas en números, nadie hablaba de prompt engineering y conseguir que un sistema entendiera algo razonablemente útil de un texto ya daba bastante juego. También hubo automatización de Adwords, teoría de juegos y optimización de campañas, porque aparentemente limitarse a resolver un único problema nunca fue una opción.',
    'I also worked with classic NLP applied to campaign and process automation: Bag of Words, TF-IDF, Naive Bayes, lexical methods, bots and adaptive bidding and optimisation systems. Words ended up as numbers, nobody talked about prompt engineering, and getting a system to understand something reasonably useful from text was already plenty of fun. There was also Adwords automation, game theory and campaign optimisation, because apparently solving just one problem was never an option. This is pre-LLM-era historical context.',
  ),
  status: 'HISTORICAL',
  statusLabel: text('HISTÓRICO', 'HISTORICAL'),
  intentTitle: text('Contexto', 'Context'),
  problem: text(
    'Contexto histórico de NLP/ML clásico y optimización, anterior a los transformers y a la IA generativa.',
    'Historical context of classic NLP/ML and optimization, predating transformers and generative AI.',
  ),
  sections: [],
  technologies: ['.NET', 'Bag of Words', 'TF-IDF', 'Naive Bayes'],
  capabilities: [],
  limitsTitle: text('Lo que no afirmo', 'What I do not claim'),
  nonClaims: [
    { id: 'no-modern-ai', label: text('Sin LLM, transformers, RAG, embeddings ni agentes.', 'No LLM, transformers, RAG, embeddings or agents.') },
    { id: 'no-evasion', label: text('Sin encuadre de evasión ni anti-detección.', 'No anti-detection or evasion framing.') },
  ],
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
    intentTitle: l(item.intentTitle), problem: l(item.problem), limitsTitle: l(item.limitsTitle),
    architecture: item.architecture ? { title: l(item.architecture.title), caption: l(item.architecture.caption), groups: item.architecture.groups.map(group => ({ ...group, title: l(group.title), nodes: group.nodes.map(l), note: group.note ? l(group.note) : undefined })) } : undefined,
    flow: item.flow ? { title: l(item.flow.title), caption: l(item.flow.caption), steps: item.flow.steps.map(step => ({ ...step, label: l(step.label), detail: l(step.detail) })) } : undefined,
    sections: item.sections.map(section => ({ ...section, title: l(section.title), body: l(section.body) })),
    capabilities: item.capabilities.map(capability => ({ ...capability, title: l(capability.title), description: l(capability.description) })),
    nonClaims: item.nonClaims.map(nonClaim => ({ ...nonClaim, label: l(nonClaim.label) })),
    media: item.media?.map(media => ({ ...media, alt: l(media.alt), caption: media.caption ? l(media.caption) : undefined })),
    related: item.related?.map(link => ({ ...link, label: l(link.label) })),
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
    for (const [field, value] of Object.entries({ title: item.title, eyebrow: item.eyebrow, summary: item.summary, lead: item.lead, statusLabel: item.statusLabel, intentTitle: item.intentTitle, problem: item.problem, limitsTitle: item.limitsTitle })) if (empty(value)) errors.push(`${item.id}.${field} is not bilingual`);
    for (const section of item.sections) { if (empty(section.title) || empty(section.body)) errors.push(`${item.id}.sections.${section.id} is not bilingual`); }
    for (const capability of item.capabilities) if (empty(capability.title) || empty(capability.description)) errors.push(`${item.id}.capabilities.${capability.id} is not bilingual`);
    for (const nonClaim of item.nonClaims) if (empty(nonClaim.label)) errors.push(`${item.id}.nonClaims.${nonClaim.id} is not bilingual`);
    for (const media of item.media ?? []) if (empty(media.alt)) errors.push(`${item.id}.media.${media.src} is not bilingual`);
    for (const link of item.related ?? []) if (empty(link.label)) errors.push(`${item.id}.related.${link.href} is not bilingual`);
  }
  return errors;
}
