# A7.1 AI Lab Implementation

## Status

`IMPLEMENTED` — AI Lab is implemented as a bilingual, evidence-driven AntoñiOS
application, uncommitted, built on the A7.0/A7.0.1 locks without reinterpreting
them. No commit, push or deploy was performed.

`IMPLEMENTADO` — el AI Lab está implementado como aplicación bilingüe de
AntoñiOS basada en evidencia, sin commit, push ni despliegue, sobre los bloqueos
A7.0/A7.0.1 sin reinterpretarlos.

## Baseline

- Repository: `xenxi/antoniomdm.dev` (local `C:\lab\repos\antoniomdm.dev`).
- Branch: `codex/antonios-aura-pixel`.
- HEAD: `5afbce742e096d5ac0dce1e0d223843a59814c19`.
- Initial worktree: clean.

## Implementation scope

- Public AI Lab section answering how AI capabilities are designed inside
  products, how nondeterministic behavior is constrained, how tools/actions are
  exposed safely, how human control is retained, how AI/agents support
  engineering and what historical ML/NLP predates current work.
- Two non-conflated axes: Product AI and Agentic Engineering.
- Four-level content hierarchy: Platform934 (`DEEP_AI_CASE`), professional
  incident investigation (`STANDARD_AI_CASE`), agentic engineering
  (`PRACTICE_CASE`), Anexia and Vector (`HISTORICAL_NOTE`).
- Bilingual ES/EN content, routes, metadata and accessibility strings.
- No dependency changes; no new runtime libraries.

## Architecture / data model

`src/data/aiLab.ts` defines the typed bilingual model:

- `AiLabCase` with `id`, `slug?`, `type`, `depth`, `origin`, `title`, `eyebrow`,
  `summary`, `lead`, `status`, `statusLabel`, `relatedProjectSlug?`, `problem`,
  `architecture?`, `flow?`, `sections`, `technologies`, `capabilities`,
  `boundaries`, `nonClaims`, `evidence`.
- Types: `PRODUCT_AI`, `PROFESSIONAL_AI`, `AGENTIC_ENGINEERING`, `HISTORICAL_AI`.
- Depths: `DEEP_AI_CASE`, `STANDARD_AI_CASE`, `PRACTICE_CASE`,
  `HISTORICAL_NOTE`.
- Origins: `PERSONAL_PROJECT`, `PROFESSIONAL`, `PORTFOLIO_ENGINEERING`,
  `HISTORICAL_PROFESSIONAL`.
- Case IDs preserve the editorial lock:
  `ai-lab-platform934-agentic-architecture`,
  `ai-lab-professional-incident-investigation`,
  `ai-lab-agentic-engineering-practice`,
  `ai-lab-anexia-mlnet-property-pricing`, `ai-lab-vector-classic-nlp`.
- Selectors: `getAiLabCase(locale, slug)`, `getAiLabCases(locale)`.
- `validateAiLabModel()` enforces unique ids/slugs and bilingual completeness.
- Global exports: `aiLabLanding`, `aiLabAxes`, `aiLabPrinciples`,
  `aiLabBoundaries`, `aiLabDetailSlugs`.

Technology buckets remain separate: Platform934 lists personal technologies
(`.NET`, `Semantic Kernel`, `LiteLLM`, `Jellyfin API`, `PostgreSQL`, `EF Core`,
`SignalR`, typed contracts, tool/function calling). The professional case has an
empty technology list and stays framework/provider-neutral.

## Routes

- Landing: `/ai-lab/` (ES) and `/en/ai-lab/` (EN).
- Detail: `/ai-lab/platform934/`, `/ai-lab/incident-investigation/`,
  `/ai-lab/agentic-engineering/` and `/en/...` equivalents.
- Historical notes live on the landing and have no separate detail route.
- Legacy compatibility: `/ai/`, `/lab/`, their `/en/...` and `/es/...` variants
  render static redirects to `/ai-lab/`.
- `routes()` includes the three detail routes; `appForPath()` maps `/ai-lab/`
  and its detail paths to the single `lab` app. One app registration, no
  duplicate windows.

## Content hierarchy

- Platform934: AI-specific product case. Problem/intent, conceptual
  architecture, deterministic vs nondeterministic boundary, tool/capability
  model, taste/ratings/recommendations, device/playback gating, observability
  and control, what it demonstrates, explicit boundaries/non-claims.
- Professional incident case: anonymized, provider/framework-neutral supervised
  flow `traceId → telemetry/context → documented knowledge → code inspection →
  diagnostic synthesis → report → human decision`.
- Agentic Engineering: milestone/evidence-lock/bounded-task/automated-verification/
  human-review/exact-SHA workflow plus seven verification lanes (code quality,
  tests, accessibility, no-JS, responsive, performance, CI).
- Historical AI: compact notes for Anexia (ML.NET / property pricing) and Vector
  (classic NLP, BoW/TF-IDF/Naive Bayes, game theory, Adwords automation,
  adaptive bidding), both explicitly pre-LLM.

## Platform934 AI-specific scope

The architecture diagram preserves the verified conceptual shape: Platform934
clients → Platform934 API → application/agent boundary → Semantic Kernel →
LiteLLM → configured provider route, plus the typed Jellyfin client,
PostgreSQL/EF Core and the SignalR device hub. It does not claim that every
request passes through AI.

Representative capabilities surfaced without claiming ML: catalogue-grounded
search, recommendations, private lists, explicit ratings, inspectable taste
signals, deterministic recommendation scoring, bounded tools, gated
`notify_playback`, first-party device commands, traceability and typed feature
gating. `notify_playback` is framed as a gated notification where the client
decides; playback is never backend-started. Taste/recommendation logic is framed
as deterministic with the LLM shaping conversation/explanation only. No RAG,
MCP, embeddings, vector database, trained recommender or autonomous agent.

## Professional anonymization boundary

No employer/client naming, no private URLs, repository names, endpoints,
tokens, prompts, telemetry identifiers, incident data or topology. The case is
conceptual and framework/provider-neutral; no professional AI framework or
provider is named.

## Agentic Engineering scope

Presented as supervised engineering practice, grounded in
`PORTFOLIO_ENGINEERING` evidence and the professional supervised workflow. No
internal prompt bodies are exposed. Not presented as autonomous software
development; the human retains scope, architecture, editorial decisions,
acceptance and release.

## Historical AI treatment

Anexia and Vector are historical context only. Anexia: predictive/model-based
work with ML.NET and PostgreSQL, algorithmic/data components may coexist, no
algorithms, metrics, scale or MLOps invented. Vector: classic NLP/ML and
optimization, not modern GenAI. Nokia/Alcatel-Lucent are excluded from AI Lab.

## Privacy

No private repository URL, source path, endpoint, credential, token, device id,
Jellyfin user id, provider configuration, internal prompt, production topology,
customer/employer data or incident detail is published. Case evidence text is
conceptual and anonymized.

## Accessibility

- Semantic heading hierarchy (single `h1` per page, `h2`/`h3` for structure).
- Keyboard-operable cards/links with visible focus (`:focus-visible`).
- Diagrams are semantic HTML (`figure`, `ol`, text nodes) and readable as text.
- State/boundary meaning is carried by text labels, not color alone.
- `prefers-reduced-motion` respected through the existing reduced-motion rules.
- No duplicate DOM ids (section ids are unique per page; diagram ids are
  prefixed with the case id).
- Axe (wcag2a, wcag2aa, wcag21aa) reports zero violations on the landing and
  detail routes (see tests).

## No-JS

Platform934 SSRs the initial app window for the requested path. Without
JavaScript the AI Lab landing (H1, axes, professional case, historical notes,
principles, boundaries) and all three detail cases (titles, diagrams, flows,
capabilities, non-claims, back link) are present in the rendered HTML. Verified
by the A7 no-JS test.

## Performance

- No dependency changes; `package.json` / `package-lock.json` untouched.
- No visualization, chart, diagram or AI SDK libraries added; diagrams are
  HTML/CSS.
- No per-node hydration: AI Lab is part of the existing single client island.
- Measured static outputs (local production build): landing HTML ~119 KB,
  Platform934 detail HTML ~119 KB (full SSR app shell included), total JS
  `dist/_astro` 153,207 bytes across 7 chunks, total CSS 66,330 bytes.
- Existing Lighthouse/performance scripts and budgets were not modified.

## Tests

- `tests/ai-lab.test.ts`: 11 unit tests — case count, unique ids/slugs,
  bilingual completeness, valid types/depths, locked Platform934/professional/
  agentic depths, historical Anexia/Vector, professional
  framework/provider-neutrality, no unsupported RAG/MCP/vector/embedding claims,
  no autonomous remediation, no AI Engineer/AI Architect repositioning,
  Platform934 personal technology attribution, pre-LLM historical framing.
- `tests/e2e/a7-ai-lab.spec.ts`: 17 browser tests — landing hierarchy (ES/EN),
  direct detail routes, Platform934 architecture/capabilities/non-claims,
  professional anonymization/neutrality, agentic workflow/verification lanes,
  app open/reopen/history, locale switch, keyboard focus, 1440x900 / 768x1024 /
  390x844 without horizontal overflow, Axe, and no-JS.
- Updated existing route/assertions: `tests/profile-routing.test.ts`,
  `tests/e2e/a3.spec.ts`, `tests/e2e/desktop.spec.ts` now target `/ai-lab/`.
  No test expectations were weakened and no timeouts were loosened.

## Validation actually run

- `npm run lint` — PASS.
- `npm run typecheck` (`astro check`) — PASS (0 errors/warnings/hints).
- `npm test` (vitest) — PASS (49 tests, 6 files).
- `npm run build` — PASS (112 static pages, includes AI Lab landing, three
  detail routes per locale and legacy redirects).
- `npx playwright test tests/e2e/a7-ai-lab.spec.ts` — PASS (17 tests).
- `npx playwright test` (full suite) — PASS (104 tests).
- Generated A5/A6 QA screenshots touched by the full run were reverted; the
  final diff contains no screenshot/report artifact changes.

## Browser Acceptance (A7.1.1)

Real-browser acceptance was performed against a local production preview
(`npm run build` followed by the repository preview flow,
`http://127.0.0.1:4321`), using Playwright Chromium (headless) at 1440x900,
768x1024 and 390x844 with `prefers-reduced-motion: reduce`.

- Routes tested: ES/EN landing; `platform934`, `incident-investigation` and
  `agentic-engineering` in both locales; legacy redirects `/ai/`, `/lab/`,
  `/en/ai/`, `/en/lab/`, `/es/ai/`, `/es/lab/`; representative existing routes
  (`/`, `/profile/`, `/experience/`, `/architecture/`, `/projects/`,
  `/projects/platform934/`) and EN equivalents.
- Console/network: no uncaught error and no failed local request on any AI Lab
  route.
- Layout: no horizontal document overflow at any tested viewport; no clipped AI
  Lab container; the architecture diagram reflows from three columns (1440/768)
  to a single stacked column (390).
- Axe (wcag2a, wcag2aa, wcag21aa): zero violations on ES/EN landing and the
  Platform934, incident and agentic cases.
- No-JS: the landing and all three detail cases render the localized H1, core
  content, diagrams/flows, principles, boundaries and links without JavaScript.
- i18n: no Spanish editorial leakage on EN pages and no English editorial prose
  on ES pages outside accepted technical terms; localized titles, descriptions,
  canonicals and `lang`.
- Keyboard: focus reaches the axes, the professional feature, chrome and dock in
  a logical order with no trap on the landing.
- Professional claim scan: the rendered professional incident case contains no
  `Semantic Kernel`, `LiteLLM`, `RAG`, `MCP`, embeddings, vector database,
  `OpenAI`, `LangChain`, `LangGraph` or `AutoGen`.
- Performance (local production preview): AI Lab landing and detail pages share
  the existing single island; landing transfer ~65 KB total (~49 KB JS, ~15 KB
  CSS). Lighthouse on the preview reported performance 100 (landing), 99
  (Platform934 EN) and 100 (incident), with accessibility, best-practices and SEO
  100 on all three; CLS 0 and TBT 0. No dependency added.
- Redirects resolve to `/ai-lab/` (ES) and `/en/ai-lab/` (EN) with no loop and no
  duplicate canonical.

### Hardening performed

- Platform934 conceptual architecture: the authoritative-services group is now
  rendered as parallel peers instead of a vertical chain. The previous downward
  arrows implied a false sequence (Jellyfin API → PostgreSQL → SignalR); the
  typed Jellyfin boundary, PostgreSQL/EF Core and the SignalR device hub are
  sibling integrations, and the agent path is not upstream of Jellyfin. No
  factual content changed.
- The AI Lab case back link now has a 44px minimum target height, consistent
  with the architecture case back link.

## Files changed

New:

- `src/data/aiLab.ts`
- `src/components/AiLab.tsx`
- `tests/ai-lab.test.ts`
- `tests/e2e/a7-ai-lab.spec.ts`
- `docs/A7_1_AI_LAB.md`

Modified:

- `src/components/AppContent.tsx` (AI Lab app branch)
- `src/data/routes.ts` (detail routes and metadata)
- `src/os/registry.ts` (`/ai-lab/` path and path resolution)
- `src/data/professional/model.ts` (terminal AI route to `/ai-lab/`)
- `src/arcade/Arcade.tsx` (Arcade destination to `/ai-lab/`)
- `src/pages/[...path].astro` (`/ai/`, `/lab/` redirect to `/ai-lab/`)
- `src/i18n/es.ts` (AI Lab interface strings)
- `src/styles/aura.css` (AI Lab Aura styles)
- `tests/profile-routing.test.ts`, `tests/e2e/a3.spec.ts`,
  `tests/e2e/desktop.spec.ts`

Evidence locks `docs/A7_0_AI_LAB_EVIDENCE_LOCK.md` and
`docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md` were not modified.
