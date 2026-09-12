# A7.0 AI Lab Evidence Lock

## Status

`HUMAN_RESOLVED`

All five P0 human questions are resolved by explicit human decisions recorded in
the **P0 Human Decisions (Resolved)** section. `P0 Human Questions Remaining:
NONE`. This milestone performed research and evidence locking. It does not
implement the AI Lab UI, does not modify product code, and does not deploy.

`HUMAN_RESOLVED` — las cinco preguntas humanas P0 están resueltas mediante
decisiones humanas explícitas registradas en la sección **P0 Human Decisions
(Resolved)**. `P0 Human Questions Remaining: NONE`. Este hito realizó
investigación y bloqueo de evidencia. No implementa la UI del AI Lab, no modifica
el código de producto y no despliega.

The authoritative editorial boundary produced from these decisions is
`docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md` (`READY_FOR_VERSIONING`). A7.0.1 also
records the Platform934 API current-state delta audit that P0-5 approved.

La frontera editorial autoritativa producida por estas decisiones es
`docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md` (`READY_FOR_VERSIONING`). A7.0.1 también
registra la auditoría delta del estado actual de Platform934 API aprobada por
P0-5.

## Purpose

Determine exactly what Antonio can publicly and credibly claim about applied AI,
agentic engineering, AI-assisted software engineering, bounded agent/tool
architectures, professional and personal AI usage, historical ML/NLP work,
experimentation and future AI direction. Every candidate public statement must be
traceable to existing evidence or explicitly marked as requiring human
confirmation.

Determinar exactamente qué puede afirmar Antonio pública y creíblemente sobre IA
aplicada, ingeniería con agentes, ingeniería de software asistida por IA,
arquitecturas acotadas de agentes/herramientas, uso profesional y personal de IA,
trabajo histórico de ML/NLP, experimentación y dirección futura. Toda afirmación
pública candidata debe ser trazable a evidencia existente o marcarse
explícitamente como pendiente de confirmación humana.

## Sources audited

Exact repository files/docs used. Repository scans were read-only.

Portfolio and professional evidence:

- `docs/A2_PUBLIC_MODEL.md`
- `docs/A3_IDENTITY_PROFILE.md`
- `docs/A4_EXPERIENCE_COMPETENCIES.md`
- `docs/A5_ARCHITECTURE_CASE_STUDIES.md`
- `docs/A5_0_EDITORIAL_EVIDENCE_LOCK.md`
- `docs/A5_0_1_ARCHITECTURE_EDITORIAL_LOCK.md`
- `docs/A6_0_PLATFORM934_EVIDENCE_LOCK.md`
- `docs/A6_0_1_PLATFORM934_EDITORIAL_LOCK.md`
- `docs/A6_PLATFORM934.md`
- `docs/A6_5_PROJECT_PORTFOLIO_EVIDENCE_LOCK.md`
- `docs/A6_5_1_PROJECT_PORTFOLIO_EDITORIAL_LOCK.md`
- `docs/A6_6_PROJECTS.md`
- `docs/ANTONIO_OS_AUDIT_2026-09-10.md`
- `src/data/professional/model.ts`
- `src/data/professional/types.ts`
- `src/data/professional/selectors.ts`
- `src/data/professional/validation.ts`
- `src/data/platform934.ts` (page dataset referenced by A6)
- `package.json`, `.github/workflows/publish.yml`, `scripts/*.mjs`
- `tests/professional-model.test.ts`, `tests/projects.test.ts`, `tests/e2e/a6*.spec.ts`, `tests/e2e/aura.spec.ts`

Platform934 evidence/implementation documentation:

- `xenxi/platform-934-api` (private, read-only), `README.md` and
  `docs/agent-gateway/00-vision.md`, `01-architecture.md`, `02-roadmap.md`,
  `03-decisions.md`, `04-tool-catalog.md`, `08-agent-rules.md`
- A6.5 lock records the independent `xenxi/platform-934-api` backend and the
  `docs/agent-gateway/01-architecture.md` and `04-tool-catalog.md` sources.

Professional career source: `xenxi/knowledge-vault` (`career/master/cv-master.md`
and experience sheets) was the human-readable source recorded by
`docs/ANTONIO_OS_AUDIT_2026-09-10.md`. No local copy of the vault was available
during this audit; only the curated public model derived from it was used.

## Evidence taxonomy

Origins:

- `PROFESSIONAL` — current employment (Domingo Alonso).
- `PERSONAL_PROJECT` — personal builds such as Platform934 / Platform934 API.
- `HISTORICAL_PROFESSIONAL` — earlier employment (Anexia, Vector, Nokia,
  Alcatel-Lucent).
- `PORTFOLIO_ENGINEERING` — the AntoñiOS/portfolio modernization process itself.
- `EXPERIMENTAL` — personal exploration not tied to a product.
- `FUTURE_DIRECTION` — intended, designed or planned, not implemented.

Confidence:

- `LOCKED` — explicit and already approved/versioned in a human lock or the
  curated public model.
- `SUPPORTED` — evidence exists but wording needs conservative interpretation.
- `HUMAN_CONFIRMATION_REQUIRED` — repository evidence is insufficient to publish
  the claim safely.
- `REJECTED` — claim must not appear publicly.

`REJECTED` is used where evidence explicitly contradicts the claim (for example,
MCP is documented as not implemented). `NOT SUPPORTED` in the high-risk matrix
means no evidence was found and the default is to omit it.

`REJECTED` se usa cuando la evidencia contradice explícitamente la afirmación
(por ejemplo, MCP documentado como no implementado). `NOT SUPPORTED` en la
matriz de alto riesgo significa que no se encontró evidencia y por defecto se
omite.

## Professional Applied AI

### Domingo Alonso

**Evidence**

- `model.ts` experience `domingo-alonso`, section `ai`:
  - ES: «Flujos de ingeniería con agentes supervisados y diagnóstico de
    incidencias mediante orquestación de telemetría, conocimiento, código e
    informes.»
  - EN: “Supervised agent engineering workflows and incident diagnosis through
    orchestration of telemetry, knowledge, code and reporting.”
- Claim `ai-engineering` (`PUBLIC`/`CV_SAFE`, `CONFIRMED`, professional):
  «Uso de agentes supervisados dentro del ciclo de ingeniería.» /
  “Use of supervised agents within the engineering lifecycle.”
- Claim `incident-agent` (`CV_SAFE`, `CONFIRMED`, professional):
  «Flujo con herramientas para investigación, diagnóstico, informe y
    notificación de incidencias.» / “Tool-using workflow for incident
    investigation, diagnosis, reporting and notification.”
- AI Lab topics in the model:
  - `ai-for-engineering` — supervised agents for discovery, planning, code and
    legacy comprehension, implementation, testing, CI diagnosis and technical
    review (`professional`, `CONFIRMED`).
  - `ai-inside-software` — from `traceId` through telemetry, documented
    knowledge, code inspection, diagnosis and reporting; **without autonomous
    remediation** (`professional`, `CONFIRMED`).
- `ANTONIO_OS_AUDIT_2026-09-10.md` §5 allows naming telemetry, Confluence, code
  inspection and Teams for incident diagnosis, while excluding real IDs,
  incidents, endpoints and autonomous remediation. It also states the human
  keeps the judgment.
- Competencies mapping this evidence: `applied-ai` (STRONG/CURRENT),
  `agentic-engineering` (STRONG/CURRENT), `agentic-product-architecture`
  (EMERGING/CURRENT).

**Safe public claims**

- ES: Existen flujos de ingeniería con agentes supervisados y un flujo con
  herramientas para investigación, diagnóstico, informe y notificación de
  incidencias; la persona mantiene el criterio y la decisión.
- EN: Supervised agentic engineering workflows exist, plus a tool-using workflow
  for incident investigation, diagnosis, reporting and notification; the human
  retains judgment and decision.
- ES: El flujo de diagnóstico parte de un `traceId` y orquesta telemetría,
  conocimiento documentado e inspección de código antes de diagnosticar e
  informar.
- EN: The diagnosis workflow starts from a `traceId` and orchestrates telemetry,
  documented knowledge and code inspection before diagnosing and reporting.

**Unsafe claims**

- Any named professional AI technology (LLM provider, Semantic Kernel, LiteLLM,
  LangChain/LangGraph, AutoGen, MCP, RAG, vector database, embeddings,
  evaluation framework, prompt framework, AI SDK) — no professional evidence.
- Autonomous agents, autonomous incident remediation, self-healing production.
- “AI platform” or “AI architecture” as a professional title or global status.
- Specific incident IDs, endpoints, prompts, internal URLs, customer data.

**Confidence**

- Professional applied AI use: `LOCKED` (already modeled and human-approved).
- Professional incident workflow as an AI Lab case: `SUPPORTED` (wording and
  anonymization need human confirmation).
- Professional named AI technologies: `HUMAN_CONFIRMATION_REQUIRED`.
- Autonomous remediation: `REJECTED`.

### Anexia

**Evidence**

- `model.ts` experience `anexia` section `scope`:
  - ES: «Soluciones .NET y Angular, aplicaciones Flutter Android/iOS en
    producción y modelos predictivos inmobiliarios con ML.NET y PostgreSQL.»
  - EN: “.NET and Angular solutions, production Flutter Android/iOS
    applications, and real-estate predictive models using ML.NET and
    PostgreSQL.”
- Competency `applied-ai` maps `anexia`.
- `ANTONIO_OS_AUDIT_2026-09-10.md` §5: “Ownership, .NET/Angular, Flutter
  Android/iOS en producción, datasets/modelos ML.NET. Sin inventar versiones.”

**Safe public claims**

- ES: Trabajo histórico con modelos predictivos inmobiliarios usando ML.NET y
  PostgreSQL, dentro de responsabilidad end-to-end.
- EN: Historical work on real-estate predictive models using ML.NET and
  PostgreSQL, within end-to-end responsibility.

**Unsafe claims**

- “AI platform”, “modern generative AI”, “LLM”, “deep learning” or “production
  AI architecture”.
- Specific model versions, accuracy, dataset size, business metrics or
  algorithms not recorded.

**Confidence**

- Property/real-estate predictive modeling with ML.NET and PostgreSQL:
  `HISTORICAL_PROFESSIONAL`, `SUPPORTED`.
- Separation of algorithmic pricing components from ML.NET components:
  `HUMAN_CONFIRMATION_REQUIRED` (the curated source does not split them).

### Vector

**Evidence**

- `model.ts` experience `vector-itc` summary:
  - ES: «Automatización de procesos e informes, sistemas de campañas y NLP/ML
    clásico con métodos léxicos, Bag of Words, TF-IDF y Naive Bayes.»
  - EN: “Process and reporting automation, campaign systems, and classic NLP/ML
    using lexical methods, Bag of Words, TF-IDF and Naive Bayes.”
- Competency `applied-ai` maps `vector-itc`.
- `ANTONIO_OS_AUDIT_2026-09-10.md` §5: “Automatización, NLP clásico y
  optimización de alto nivel. Excluir tácticas operativas.”

**Safe public claims**

- ES: Trabajo histórico con NLP/ML clásico (métodos léxicos, Bag of Words,
  TF-IDF, Naive Bayes), automatización de procesos/informes y sistemas de
  campañas.
- EN: Historical classic NLP/ML work (lexical methods, Bag of Words, TF-IDF,
  Naive Bayes), process/reporting automation and campaign systems.

**Unsafe claims**

- LLM, transformer, RAG, embeddings, autonomous AI or “anti-detection system”.
- Game theory, Adwords automation and adaptive bidding/optimization are **not**
  present in repository evidence — must not be published unless confirmed.
- Operational tactics of any kind.

**Confidence**

- Classical NLP/ML and process automation: `HISTORICAL_PROFESSIONAL`,
  `SUPPORTED`.
- Game theory / Adwords / adaptive bidding: `HUMAN_CONFIRMATION_REQUIRED`.

### Nokia / Alcatel-Lucent

**Evidence**

- Nokia (`model.ts`): “Evolution of CAD tools into a GIS-like platform for
  telecom network modelling, validation, costing and preliminary designs.”
  Competencies: `dotnet-backend`, `problem-decomposition`,
  `software-architecture`.
- Alcatel-Lucent (`model.ts`): “Automation, an internal platform and CAD
  integrations with engineering validation rules using .NET, C#, VB and web
  components.” Competencies: `dotnet-backend`, `problem-decomposition`,
  `software-architecture`.

**AI relevance decision**

`NOT AI LAB MATERIAL`.

Both are algorithmic/automation and tooling work (GIS/CAD, validation rules,
automation). There is no defensible AI/ML connection in the recorded evidence.
They may remain in the general experience narrative but must not be presented as
AI Lab evidence or as machine learning.

Ambos son trabajo algorítmico/de automatización (GIS/CAD, reglas de validación).
No existe conexión AI/ML defendible en la evidencia. No deben presentarse como
evidencia del AI Lab ni como machine learning.

## Personal Product AI

### Platform934 API

**Architecture**

- Independent private `.NET` backend and external agent gateway layered over
  Jellyfin. Verified projects/packages per A6.0.1: `Platform934.Api`,
  `Platform934.Agent`, `Platform934.Jellyfin`, `Platform934.Contracts`.
- Conceptual path: Platform934 clients → Platform934 API → Platform934 Agent →
  Semantic Kernel → LiteLLM → LLM provider(s); Jellyfin accessed only through a
  typed Jellyfin client boundary; PostgreSQL persistence.
- Jellyfin remains authoritative for the media platform/catalogue. Ordinary
  client operations may stay direct to Jellyfin.

**Implemented**

Locked by A6.0.1 / A6.5.1 and reused as-is:

- Authenticated Jellyfin-backed media search.
- Recommendations.
- List creation and list modification.
- Film discussion and film explanation.
- Bounded tool calling, with allowlisted, typed, traceable and
  non-destructive-by-default tools.
- Health/readiness and traceable agent decisions/actions.

A supplementary read-only audit of the private repository confirms Semantic
Kernel + LiteLLM usage and an allowlisted, non-destructive tool surface. That
read also shows newer documented work (personal-list CRUD tools, ratings, taste
feedback, gated `notify_playback` where the client decides, structured
`AgentDecisionTrace`/`ToolExecutionTrace`). Under P0-5 these are now audited in
`docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md` as the current verified delta; they are
still not part of the A6.5 public lock, which remains a historically valid
snapshot.

**In progress**

- Broader playback/device orchestration: `IN_PROGRESS`. The agent is never
  described as autonomous.

**Boundaries**

- Typed tool contracts; allowlisted tools/actions; explicit capabilities;
  bounded tool calling; traceability; validation; deterministic boundaries
  around nondeterministic model behavior; human-controlled product behavior.
- `MCP` is explicitly not implemented. `RAG`, `embeddings`, a vector database
  and autonomous operation are not evidenced.

**Technologies (public-safe)**

- .NET, ASP.NET Core, Semantic Kernel, LiteLLM, official Jellyfin API, typed
  contracts, Docker; PostgreSQL/EF Core and SignalR only with scoped wording.

**Safe claims**

- ES: Backend privado independiente y puerta de enlace de agentes sobre
  Jellyfin, con contratos tipados, Semantic Kernel, LiteLLM y herramientas
  allowlisted con tool calling acotado.
- EN: An independent private backend and agent gateway layered over Jellyfin,
  with typed contracts, Semantic Kernel, LiteLLM and allowlisted tools with
  bounded tool calling.
- ES: Búsqueda, recomendaciones, creación/modificación de listas, discusión y
  explicación de películas y tool calling acotado están implementados.
- EN: Search, recommendations, list creation/modification, film discussion and
  explanation, and bounded tool calling are implemented.

**Non-claims**

- Not autonomous, not an MCP system, not a Jellyfin fork/replacement, no RAG,
  no embeddings, no vector database, no universal feature parity, no release or
  production-signing claim. No endpoints, tokens, provider credentials,
  database strings, logs, hostnames, source or deployment topology.

## Agentic Engineering

### Professional workflow

- `model.ts` claim `ai-engineering` and topic `ai-for-engineering`: supervised
  agents used inside the engineering lifecycle.
- `ANTONIO_OS_AUDIT_2026-09-10.md` §5: supervised agents, milestones, gates,
  validation and review; the human retains architecture and review judgment.
- Classification: current professional practice; `SUPPORTED` for public AI Lab
  narrative at the concept level. Not autonomous software development.

### AntoñiOS engineering workflow

`PORTFOLIO_ENGINEERING` evidence in this repository is substantial and
versioned:

- Milestone decomposition and explicit specifications (A1–A6, A6.5, A6.6).
- Evidence locks and human editorial locks (`docs/A6_*`, `docs/A5_0_1_*`).
- Automated gates: `npm run lint`, `astro check`, `vitest`, static build,
  Playwright E2E, Lighthouse and per-milestone performance scripts.
- Bilingual ES/EN parity, no-JS and accessibility (Axe) gates.
- Exact-SHA Linux CI verification and preserved evidence artifacts
  (`docs/quality/*`).
- Human approval gates, retained risk/debt, stop conditions and rollback.

This supports a public example of **AI-assisted / agentic engineering workflow**
presented conceptually, without exposing internal prompts and without presenting
the AI as autonomous.

`SUPPORTED` — safe to present at the process/concept level. `HUMAN_CONFIRMATION_REQUIRED`
for any detailed claim about the AI's role, tooling or prompts.

### Product architecture vs engineering workflow

These are distinct competencies and must not be conflated:

- **Agentic Product Architecture** — building AI functionality into a product
  (Platform934 API; `agentic-product-architecture`).
- **Agentic Engineering** — using AI agents to design/build/test/review software
  (professional workflow and AntoñiOS; `agentic-engineering`).

A6.0 and A6.0.1 already require this separation. This lock preserves it.

## AI Engineering Principles

Each principle is classified as `APPROVED`, `SUPPORTED_WITH_CAUTIOUS_WORDING`
or `NOT_EVIDENCED`.

| Principle | Evidence | Classification | Safe wording |
| --- | --- | --- | --- |
| AI as a bounded system component, not magic | Platform934 API bounded tools; A6 learnings | SUPPORTED_WITH_CAUTIOUS_WORDING | “Bounded component with explicit capabilities” — avoid “magic” framing |
| Deterministic boundaries around nondeterministic models | Platform934 API design principles; A6.0.1 learnings | SUPPORTED_WITH_CAUTIOUS_WORDING | “Deterministic orchestration and validation around model output” |
| Tool access should be explicit and constrained | Platform934 API allowlisted, non-destructive tools; A6 locks | APPROVED | “Allowlisted, typed, bounded tools” |
| Human review remains part of consequential workflows | Professional incident workflow; engineering gates | APPROVED | “Human review and decision remain in the loop” |
| AI features need normal software engineering (tests, contracts, observability, failure handling, performance awareness) | Platform934 API typed contracts/health/traceability; portfolio gates | APPROVED | “AI features are engineered with contracts, tests, tracing and failure handling” |
| Start with the product problem, not the model/provider | A6.0.1 learnings; Platform934 API design | SUPPORTED_WITH_CAUTIOUS_WORDING | “Start from the product problem; the provider is an implementation detail” |
| Agentic engineering benefits from scoped tasks, acceptance gates, evidence, stop conditions, verification | Professional workflow; AntoñiOS A1–A6.6 | APPROVED | “Scoped tasks, acceptance gates, evidence and stop conditions” |

General philosophy without evidence must not be restated as claimed experience.

## High-Risk Claim Matrix

| Claim | Classification | Evidence | Reason |
| --- | --- | --- | --- |
| Professional RAG | NOT SUPPORTED | No professional evidence in model, audit or locks | No source records retrieval-augmented generation |
| Professional vector databases | NOT SUPPORTED | None | No professional evidence |
| Professional embeddings | NOT SUPPORTED | None | No professional evidence |
| Professional Semantic Kernel | NOT SUPPORTED | Only personal Platform934 API uses SK | Must not transfer personal tech into professional experience |
| Professional MCP | NOT SUPPORTED | None | No professional evidence |
| Professional LangChain / LangGraph | NOT SUPPORTED | None | No professional evidence |
| Professional autonomous agents | REJECTED | Professional workflow is supervised; human keeps judgment | Contradicts locked evidence |
| Autonomous production remediation | REJECTED | A2/audit explicitly exclude; model says “sin remediación autónoma” | Explicit non-claim |
| AI Architect title | REJECTED | Headline locked as “Software Architect \| Senior .NET Engineer” | No evidence; repositioning prohibited |
| AI Engineer title | REJECTED | Same | No evidence; repositioning prohibited |
| Machine Learning Engineer title | REJECTED | Historical ML.NET/NLP only | No evidence; repositioning prohibited |
| Platform934 MCP | REJECTED | A6.0.1/A6.5.1 + private README/decisions: MCP not implemented | Explicitly documented as not implemented |
| Platform934 RAG | NOT SUPPORTED | Private roadmap/decisions: no RAG | No implementation evidence |
| Platform934 vector DB | NOT SUPPORTED | Private roadmap/decisions: no vector storage | No implementation evidence |
| Platform934 embeddings | NOT SUPPORTED | Private roadmap/decisions: no embeddings | No implementation evidence |
| Platform934 autonomous agent | REJECTED | A6 locks: agent is not autonomous | Explicit non-claim |
| AI-generated production without human review | REJECTED | Human review is part of the evidenced flows | Contradicts evidence |

## Candidate AI Lab Cases

Schema fields: ID, title ES, title EN, origin, period, evidence confidence,
public suitability, technical depth, recommended presentation depth, what it
demonstrates, safe technologies, safe claims, non-claims, overlap with existing
portfolio case, recommendation.

### A. Professional incident investigation assistant / agent workflow

- **ID:** `ai-lab-professional-incident-workflow`
- **Title ES:** Diagnóstico de incidencias con herramientas supervisadas
- **Title EN:** Incident diagnosis with supervised tools
- **Origin:** PROFESSIONAL (Domingo Alonso)
- **Period:** Current (2021–present, applied AI scope)
- **Evidence confidence:** LOCKED for the fact (`incident-agent`,
  `ai-inside-software`); SUPPORTED for case presentation
- **Public suitability:** Medium-high if anonymized and no tool/model names are
  required; requires P0 approval to present employer work
- **Technical depth:** High conceptually (traceId → telemetry → knowledge → code
  inspection → diagnosis → report), but no named stack may be published
- **Recommended presentation depth:** Concept/architecture case, anonymized
- **What it demonstrates:** Bounded, tool-using assistance inside a real
  engineering investigation; human review and no autonomous remediation
- **Safe technologies:** Telemetry, documented knowledge lookup, code
  inspection, reporting, engineering communication — as categories only
- **Safe claims:** Tool-using workflow for investigation, diagnosis, reporting
  and notification; human retains judgment; no autonomous remediation
- **Non-claims:** Autonomous remediation; named LLM/framework; specific
  incidents, IDs, endpoints, prompts or customer data
- **Overlap:** None with A5/A6 cases; supports `applied-ai`
- **Recommendation:** Include only after P0 confirmation of scope and
  anonymization; otherwise keep at profile/experience level

### B. Platform934 conversational agent

- **ID:** `ai-lab-platform934-conversational-agent`
- **Title ES:** Agente conversacional acotado sobre Jellyfin
- **Title EN:** Bounded conversational agent over Jellyfin
- **Origin:** PERSONAL_PROJECT
- **Period:** Current personal project
- **Evidence confidence:** LOCKED (A6.0.1/A6.5.1 human-approved)
- **Public suitability:** High
- **Technical depth:** High (typed contracts, allowlisted tools, SK, LiteLLM,
  bounded orchestration)
- **Recommended presentation depth:** Standard-to-deep AI Lab case
- **What it demonstrates:** Product AI with explicit capabilities, bounded tool
  calling, deterministic boundaries and human control
- **Safe technologies:** .NET, ASP.NET Core, Semantic Kernel, LiteLLM, official
  Jellyfin API, typed contracts, allowlisted tools, Docker
- **Safe claims:** Implemented search, recommendations, list
  creation/modification, film discussion/explanation and bounded tool calling;
  broader playback/device orchestration `IN_PROGRESS`
- **Non-claims:** Autonomous agent, MCP, RAG, embeddings, vector DB, provider
  names, endpoints, private source
- **Overlap:** High with A6 Platform934 deep case study and A6.5 Platform934 API
  project card
- **Recommendation:** Include, but frame as *how AI is engineered* rather than
  repeating the A6 product description

### C. Agentic engineering workflow / AntoñiOS

- **ID:** `ai-lab-agentic-engineering-workflow`
- **Title ES:** Ingeniería asistida por agentes con gates y evidencia
- **Title EN:** Agent-assisted engineering with gates and evidence
- **Origin:** PORTFOLIO_ENGINEERING (plus professional workflow evidence)
- **Period:** Current portfolio modernization (A1–A6.6)
- **Evidence confidence:** SUPPORTED (process evidence is versioned); human
  confirmation required for detailed AI-role wording
- **Public suitability:** High at process/concept level
- **Technical depth:** Medium-high (milestones, AC, gates, exact-SHA CI,
  rollback, stop conditions)
- **Recommended presentation depth:** Concept case / engineering practice page
- **What it demonstrates:** Scoped tasks, acceptance gates, evidence locks,
  verification and human approval applied to agent-assisted engineering
- **Safe technologies:** Not technology-brand dependent; describe practice
- **Safe claims:** Supervised AI-assisted/agentic engineering workflow with
  milestones, gates, tests, evidence and human review; not autonomous
- **Non-claims:** Autonomous software development; exposure of internal prompts;
  private source
- **Overlap:** Conceptual with AntoñiOS project narrative; distinct from A6
  Platform934
- **Recommendation:** Include as the AI Lab's engineering-practice axis

### D. Anexia ML.NET property-pricing work

- **ID:** `ai-lab-anexia-mlnet-property-pricing`
- **Title ES:** Modelos predictivos inmobiliarios con ML.NET
- **Title EN:** Real-estate predictive models with ML.NET
- **Origin:** HISTORICAL_PROFESSIONAL
- **Period:** Anexia, December 2017 – July 2021
- **Evidence confidence:** SUPPORTED
- **Public suitability:** Medium (historical, low detail)
- **Technical depth:** Medium (ML.NET + PostgreSQL, real-estate domain)
- **Recommended presentation depth:** Small historical note or single card
- **What it demonstrates:** Early applied ML in a production software context
- **Safe technologies:** ML.NET, PostgreSQL
- **Safe claims:** Real-estate predictive models using ML.NET and PostgreSQL
- **Non-claims:** GenAI, LLM, deep learning, AI platform, accuracy/business
  metrics
- **Overlap:** Experience entry in profile; no A5/A6 case
- **Recommendation:** Preserve as historical ML context; do not force it into
  the primary AI Lab story

### E. Vector classical NLP / optimization work

- **ID:** `ai-lab-vector-classic-nlp`
- **Title ES:** NLP clásico y automatización de campañas
- **Title EN:** Classic NLP and campaign automation
- **Origin:** HISTORICAL_PROFESSIONAL
- **Period:** Vector ITC Group, May – December 2017
- **Evidence confidence:** SUPPORTED for BoW/TF-IDF/Naive Bayes; other topics
  HUMAN_CONFIRMATION_REQUIRED
- **Public suitability:** Low-medium
- **Technical depth:** Medium (classic NLP pipeline)
- **Recommended presentation depth:** Small historical note, or omit
- **What it demonstrates:** Pre-LLM NLP/ML foundations and process automation
- **Safe technologies:** Bag of Words, TF-IDF, Naive Bayes, .NET
- **Safe claims:** Classic NLP/ML and process/reporting automation
- **Non-claims:** LLM, transformer, RAG, embeddings, autonomous AI,
  anti-detection, game theory/Adwords unless confirmed
- **Overlap:** Experience entry in profile
- **Recommendation:** Optional historical note; do not present as modern GenAI

A7.0 determines evidence, not UI quantity. Not all five candidates must become
AI Lab cases.

## Duplication Matrix

| AI Lab candidate | Experience overlap | Architecture overlap | Projects overlap | Unique AI Lab value |
| --- | --- | --- | --- | --- |
| A. Professional incident workflow | Domingo Alonso experience summary | None | None | How supervised tool use is bounded in a real investigation flow |
| B. Platform934 conversational agent | None | None | A6 deep case + Platform934 API card | Engineering rationale: typed contracts, allowlisted tools, deterministic boundaries |
| C. Agentic engineering workflow | Generic `agentic-engineering` competency | None | AntoñiOS project narrative | The supervised engineering method itself, as practice |
| D. Anexia ML.NET | Anexia experience scope | None | None | Historical applied ML context |
| E. Vector classic NLP | Vector experience summary | None | None | Historical pre-LLM NLP context |

Distinction to preserve (only where evidence supports it):

- Projects: what was built.
- Architecture: technical decisions and tradeoffs.
- AI Lab: how Antonio thinks about and engineers AI-enabled systems.

AI Lab must not repeat the A6 Platform934 case verbatim.

## Public Positioning

Existing positioning is unchanged and must be reinforced:

- **Headline:** Software Architect | Senior .NET Engineer.
- **Supporting direction:** Distributed Systems · Engineering Excellence ·
  Applied AI (as an important specialization/direction).
- **Not acceptable:** AI Engineer, AI Architect, Machine Learning Engineer or
  Data Scientist as current titles.

`LOCKED`. Positioning comes from `model.ts` profile and the A2/A3 locks. AI Lab
content must not reposition Antonio or imply seniority beyond the evidence.

## Recommended AI Lab Scope

Content scope only; no UI design.

- **Professional:** Present supervised, tool-using AI usage in engineering
  (incident investigation/diagnosis) at a conceptual, anonymized level only if
  P0 approves; otherwise keep it in experience.
- **Personal:** Platform934 API as the primary Product AI example: bounded
  agent/tool architecture, typed contracts, Semantic Kernel and LiteLLM as an
  abstraction layer, explicit capabilities and non-autonomy.
- **Historical:** Anexia ML.NET and Vector classic NLP as brief, clearly
  historical context; Nokia/Alcatel-Lucent excluded from AI Lab.
- **Engineering practice:** Agentic engineering workflow / AntoñiOS as the
  second axis, emphasizing milestones, acceptance gates, evidence, human review
  and stop conditions.

Two axes must remain separate: Product AI and AI-augmented engineering.

## P0 Human Decisions (Resolved)

All five P0 questions below were resolved by explicit human decisions in A7.0.1.
The original question text is preserved as historical context. The decisions are
authoritative and supersede the previous safe defaults.

Todas las preguntas P0 siguientes fueron resueltas por decisiones humanas
explícitas en A7.0.1. El texto original se conserva como contexto histórico. Las
decisiones son autoritativas y sustituyen a los valores por defecto anteriores.

`P0 Human Questions Remaining: NONE`

### P0-1 — Professional incident investigation workflow

- **Historical question:** May the employer incident-investigation workflow be
  presented publicly as an AI Lab case? Previously `SUPPORTED` pending human
  confirmation of scope and anonymization.
- **Human decision:** **YES.** The professional AI-assisted incident
  investigation workflow may be presented publicly as an anonymized AI Lab case
  at the conceptual level only: `traceId` → telemetry/context investigation →
  documented knowledge/context → code/context inspection → diagnosis → report →
  communication.
- **Mandatory boundaries:** anonymize employer/client/system specifics; no
  private URLs, repository names, production identifiers, credentials,
  confidential incident data, customer data, private prompts or internal
  topology; no implication of autonomous remediation; human judgment/control
  remains explicit. It is a supervised engineering workflow and must **not** be
  called autonomous.
- **Resolves:** A7.0 “Professional named AI technologies” remains
  provider/framework-neutral unless separately verified; the case itself is now
  `LOCKED_FOR_PUBLICATION` at the anonymized concept level.

### P0-2 — Professional AI technologies

- **Historical question:** May any specific professional AI technology be named?
  Previously `HUMAN_CONFIRMATION_REQUIRED`; safe default was to name none.
- **Human decision:** **YES, specific professional AI technologies may be named
  WHEN VERIFIED.** This is permission to publish verified names, **not** evidence
  that any particular technology was used professionally. Personal-project
  technologies must not be transferred into professional experience. Each
  technology is classified `VERIFIED_PROFESSIONAL`, `PERSONAL_ONLY`,
  `NOT_EVIDENCED` or `HUMAN_CONFIRMATION_REQUIRED`. Only
  `VERIFIED_PROFESSIONAL` names may be presented as professional.
- **Audit result:** No professional AI framework or provider is explicitly
  evidenced, so the professional incident case remains
  **framework/provider-neutral**. `ML.NET` and classic NLP components are
  verified as `HISTORICAL_PROFESSIONAL`. Semantic Kernel and LiteLLM are
  `PERSONAL_ONLY` (Platform934 API). No new P0 is created because the repository
  contains no ambiguous technology attribution.

### P0-3 — Anexia ML.NET

- **Historical question:** May the ML.NET property-pricing work be described
  beyond “predictive models with ML.NET and PostgreSQL”? Previously the split
  between algorithmic and ML.NET components was `HUMAN_CONFIRMATION_REQUIRED`.
- **Human decision:** **YES.** The work may be developed beyond the shortest
  wording when repository evidence supports the detail. Approved factual core:
  historical professional work; real-estate/property pricing domain;
  predictive/model-based work; ML.NET; PostgreSQL; algorithmic components may
  coexist with ML components.
- **Boundary:** Do not invent exact model algorithms, training methodology,
  dataset size, accuracy, production scale, MLOps, deep learning or GenAI. The
  evidence does not split deterministic/domain pricing logic, data/geospatial
  processing and predictive/ML.NET components, so those distinctions remain
  conceptual only. Classification: `HISTORICAL_PROFESSIONAL`.

### P0-4 — Vector

- **Historical question:** Were game theory, Adwords-related automation and
  adaptive bidding/optimization real and publishable? Previously these were
  `HUMAN_CONFIRMATION_REQUIRED` and the safe default was to omit them.
- **Human decision:** **YES.** The following were real and are publishable:
  game theory; Adwords automation; adaptive bidding / optimization. They join
  the already-evidenced automation/bots, classic NLP, lexical methods, Bag of
  Words, TF-IDF, Naive Bayes and process/reporting automation.
- **Boundary:** This is `HISTORICAL_PROFESSIONAL` work. Do not translate it into
  modern GenAI terminology, do not claim LLMs/transformers/RAG/embeddings/vector
  databases/autonomous agents/modern agent frameworks unless separately
  evidenced, and do not frame automation as anti-detection/evasion.

### P0-5 — Platform934 API current work

- **Historical question:** May AI Lab use only the A6.5-locked capabilities or
  include newer private-repo work? Previously newer work was
  `HUMAN_CONFIRMATION_REQUIRED`; safe default was the A6.5 snapshot only.
- **Human decision:** **DO NOT restrict AI Lab to the A6.5 snapshot.** All
  current verifiable work in the private Platform934 API repository may be
  considered for the AI Lab, subject to a current-state delta audit. Repository
  existence proves implementation evidence, but public wording still requires
  correct implementation status, privacy safety, architecture accuracy and no
  speculative interpretation.
- **Boundary:** A6.5/A6.6 remain historically valid snapshots and must not be
  retroactively edited. The A7.0.1 delta audit records the A6 locked baseline and
  the current verified delta with per-capability evidence, status, tool/action
  boundary, human-control and privacy implications.

## P0 Human Questions (Historical)

The following original P0 wording is preserved for traceability. All entries are
resolved above; no P0 question remains open.

Las preguntas P0 originales se conservan para trazabilidad. Todas están resueltas
arriba; no queda ninguna pregunta P0 abierta.

1. **Professional incident workflow as a case.** What evidence is missing: a
   decision on whether the employer incident-investigation workflow may be
   presented publicly as an AI Lab case. Why it matters: it is the only
   professional applied-AI case. Safe default: keep it at experience/claim level
   and omit a dedicated case. **Resolved: YES, anonymized concept-level case.**
2. **Professional technology names.** What evidence is missing: explicit
   confirmation of whether any specific professional AI technology may be named.
   Why it matters: no professional framework/provider is evidenced. Safe
   default: name none; describe architecture concepts only. **Resolved: YES when
   verified; no professional AI technology is currently verified, so the case
   stays provider-neutral.**
3. **Anexia ML.NET detail.** What evidence is missing: whether the ML.NET
   property-pricing work may be described beyond “predictive models with ML.NET
   and PostgreSQL”. Why it matters: it is the only historical ML evidence. Safe
   default: keep current model wording, no metrics or algorithms. **Resolved:
   YES, within the approved factual core; no invented algorithms, metrics or
   scale.**
4. **Vector advanced topics.** What evidence is missing: whether game theory,
   Adwords-related automation and adaptive bidding/optimization were real and
   publishable. Why it matters: these are not in repository evidence. Safe
   default: omit them and publish only BoW/TF-IDF/Naive Bayes and process
   automation. **Resolved: YES, human-confirmed and publishable as
   `HISTORICAL_PROFESSIONAL`.**
5. **Platform934 public capability set.** What evidence is missing: whether AI
   Lab may use only the A6.5-locked capabilities or include newer private-repo
   work (personal-list CRUD, ratings, taste, gated playback notification). Why
   it matters: newer work is not publicly locked. Safe default: use only the
   A6.5-locked capabilities. **Resolved: YES, audit all current verifiable work;
   A6.5/A6.6 remain valid snapshots.**

## P1 Refinements (Resolved by Conservative Defaults)

The previous P1 refinements are resolved in A7.0.1 using conservative defaults.
They do not require another human question unless evidence conflicts.

Las refinaciones P1 anteriores quedan resueltas en A7.0.1 con valores por defecto
conservadores. No requieren otra pregunta humana salvo que la evidencia entre en
conflicto.

- Preferred terminology for the two axes (`Product AI` vs `AI-augmented
  engineering`) in ES/EN. **Resolved:** ES `IA aplicada` / `IA de producto` /
  `Ingeniería agéntica`; EN `Applied AI` / `Product AI` / `Agentic Engineering`.
- Whether to mention LiteLLM as an abstraction layer (already public in A6) or
  keep AI Lab provider-neutral. **Resolved:** LiteLLM and Semantic Kernel may be
  named for Platform934, confirmed by current evidence; upstream LLM provider
  names stay out of public product wording.
- Whether the AntoñiOS engineering workflow should be its own AI Lab case or a
  supporting section. **Resolved:** it is an Agentic Engineering
  `PRACTICE_CASE`, not another product.
- Depth of the Anexia and Vector historical notes (small card vs one-line
  context). **Resolved:** compact historical notes.
- Preferred level of detail for the `traceId → diagnosis → report` flow.
  **Resolved:** enough conceptual detail to demonstrate architecture/engineering
  thinking, with no employer-specific topology.

## Rejected Claims

- Professional RAG, vector databases, embeddings, Semantic Kernel, MCP,
  LangChain/LangGraph.
- Professional autonomous agents and autonomous production remediation.
- AI Architect, AI Engineer, Machine Learning Engineer titles.
- Platform934 MCP, RAG, vector DB or embeddings.
- Platform934 autonomous agent.
- AI-generated production without human review.
- Nokia/Alcatel-Lucent as AI/ML evidence.
- Named production LLM providers inferred from configuration.

## Privacy / Security Boundary

The evidence lock and any future AI Lab content must not expose:

- company secrets; client or customer names not already public/approved;
- internal URLs, private IPs, tokens, credentials, API keys;
- private repository URLs and private source code;
- production identifiers, internal endpoint names, deployment topology;
- private prompts and internal model-selection policy;
- internal model/provider credentials and cost information;
- confidential incident data, logs, telemetry identifiers or personal media
  data.

Professional examples must remain abstract. The private `xenxi/platform-934-api`
backend is referenced only as an anonymized architecture concept.

## Evidence Gaps

Status after A7.0.1 human decisions:

- No professional AI technology names are evidenced. **Resolved as a
  framework/provider-neutral case (P0-2).**
- No professional RAG/embeddings/vector/MCP evidence exists. **Unchanged;
  remains a rejected/not-supported claim.**
- Anexia algorithmic vs ML.NET component split is not recorded. **Resolved:
  boundaries remain conceptual only; no invented split (P0-3).**
- Vector game theory/Adwords/bidding are not in repository evidence. **Resolved:
  human-confirmed publishable, `HISTORICAL_PROFESSIONAL` (P0-4).**
- The professional incident workflow has no public-safe implementation detail.
  **Resolved: publishable only as an anonymized conceptual flow (P0-1).**
- Platform934 API newer capabilities are not in the A6 public lock. **Resolved:
  A7.0.1 current-state delta audit (P0-5).**
- No local `knowledge-vault` copy was available for deeper career cross-check.
  **Remains an optional follow-up; does not block AI Lab content.**
- `EXPERIMENTAL` personal AI evidence is limited to Platform934; no separate
  approved experimental AI case exists. **Unchanged; no experimental case is
  added.**
- No approved visuals or prompts exist for AI Lab publication. **Unchanged;
  visuals are out of scope for A7.0.1 and belong to a later implementation
  milestone.**

## Proposed next milestone

`A7.0.2 Evidence + Editorial Locks Closure / Versioning` — version
`docs/A7_0_AI_LAB_EVIDENCE_LOCK.md` and
`docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md` together, with no product-code changes.
No residual P0 or P1 gap blocks versioning.

`A7.0.2 Evidence + Editorial Locks Closure / Versioning` — versionar juntos
`docs/A7_0_AI_LAB_EVIDENCE_LOCK.md` y
`docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md`, sin cambios de código de producto.
Ningún P0/P1 residual bloquea el versionado.
