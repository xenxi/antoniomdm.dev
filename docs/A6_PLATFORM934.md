# A6.1 Platform934

## Implemented structure / Estructura implementada

**ES.** Platform934 tiene una experiencia de proyecto dedicada en `/projects/platform934/`, con equivalente `/en/projects/platform934/`. La página es contenido estático bilingüe y conserva la ventana de proyectos y la navegación de AntoñiOS.

**EN.** Platform934 has a dedicated project experience at `/projects/platform934/`, with `/en/projects/platform934/` as its localized equivalent. The page is bilingual static content and preserves the AntoñiOS project window and navigation.

The page contains the project identity, five client surfaces, a semantic system landscape, the Jellyfin boundary, client evolution, native Google TV, Media3, scoped performance evidence, Platform934 API, conversational capabilities, product AI, Agentic Engineering, decisions, learnings, current status and competency evidence.

## Data and model / Datos y modelo

`src/data/platform934.ts` owns the editorial page dataset and its ES/EN localization. `src/data/professional/model.ts` keeps Platform934 as a `personal-engineering-lab`, updates the identity and technology list, and links only to existing competency IDs. No A5 professional case relation was added. The model now represents the independently verified `.NET` Platform934 API and the human-confirmed runtime capabilities without exposing private repository details.

## Architecture diagram / Diagrama de arquitectura

`src/components/Platform934.tsx` implements the diagram as semantic `figure`, heading, caption, labeled nodes and text edges. It explicitly shows that normal client operations may go directly to Jellyfin and that Platform934 API is optional for agent/product capabilities. The agent path is represented as Platform934 Agent, Semantic Kernel, LiteLLM, provider(s), a typed Jellyfin client and the official Jellyfin API.

## Client surfaces / Superficies

Mobile and Web are current product clients with no parity claim. TV Web is the real Preact client for webOS and older TVs. Native Google TV is Kotlin, Compose TV where evidenced, and Media3, with `IN_PROGRESS` overall and bounded validated slices. Flutter TV is retained as a productive reference/rollback surface during progressive migration.

The public TV Web deployment was treated as product evidence, not automatically as a portfolio CTA. Its operational health is separate from the product classification and no direct CTA was added.

## Platform API and agent / API y agente

Platform934 API is presented as the private independent `.NET` external agent gateway layered over Jellyfin. The page names `Platform934.Api`, `Platform934.Agent`, `Platform934.Jellyfin` and `Platform934.Contracts`, plus Semantic Kernel, LiteLLM, typed contracts and allowlisted tools. No endpoint, token, provider secret, private host or source code is published.

The conversational capability matrix marks search, recommendations, list creation, list modification, film discussion, film explanation and bounded tool calling as `IMPLEMENTED`. Broader playback/device orchestration is `IN_PROGRESS`; the agent is not described as autonomous. Grounding is limited to available real catalogue, details, history, favourites and watched/unwatched signals. MCP is explicitly not implemented.

## Performance evidence / Evidencia de rendimiento

The published metrics are exact to the approved scope:

- Home focus response: approximately `44–45 ms`.
- Home transition: approximately `144–146 ms`.
- Artwork behavior: `0` redundant completed HTTP/Coil artwork requests observed in the validated scenario.

All three are labeled as measured on real TV hardware in a controlled validation scenario. Performance is iterative and retained debt is stated rather than hidden. No secondary internal debt metric is promoted as a headline.

## Accessibility and responsive evidence / Accesibilidad y responsive

The architecture is a semantic figure with a screen-reader caption and meaningful node text. Headings, lists, status text, links and visible focus inherit the existing AntoñiOS accessibility patterns. Reduced motion is covered by the existing global media query and the A6 E2E suite uses reduced motion. The CSS stacks grids, boundaries and metrics on narrow viewports.

## No-JS / Sin JavaScript

All Platform934 narrative, architecture, statuses, metrics and relations are rendered in the initial HTML. The no-JS E2E check opens both the route and system/status sections with JavaScript disabled.

## Tests and screenshots / Tests y capturas

`tests/e2e/a6.spec.ts` covers both routes, bilingual surfaces, Preact TV Web, native TV, boundary, API technologies, agent statuses, exact metrics, five learnings, product AI/process separation, no A5 relation contamination, direct/history navigation, Axe, responsive overflow, no-JS and screenshots.

Committed screenshot paths:

- `docs/quality/a6/screenshots/a6/01-platform934-es-desktop.png`
- `docs/quality/a6/screenshots/a6/02-platform934-en-desktop.png`
- `docs/quality/a6/screenshots/a6/03-platform934-architecture-es.png`
- `docs/quality/a6/screenshots/a6/04-platform934-native-tv-es.png`
- `docs/quality/a6/screenshots/a6/05-platform934-agent-es.png`
- `docs/quality/a6/screenshots/a6/06-platform934-mobile-es.png`
- `docs/quality/a6/screenshots/a6/07-platform934-tablet-es.png`

## Performance portfolio evidence / Evidencia del portfolio

The recorded `docs/quality/a6/performance.json` is generated by `scripts/a6-performance.mjs` against the local production preview. It records initial JS gzip, Platform934 route transfer, Arcade boot requests and audio boot requests, plus Lighthouse when available. Platform934 content is route-local and no heavy diagram library or Home-loaded media asset was added.

## Known limitations / Limitaciones conocidas

Native TV hardening, physical validation and release gates remain in progress. Broader remote-device orchestration remains in progress. Client feature parity is intentionally not claimed. The TV Web deployment is not linked as a direct CTA pending separate operational revalidation. The private Platform API repository is not exposed.

## Privacy review / Revisión de privacidad

PASS. The page contains no tokens, API keys, private endpoints, internal IPs, QuickConnect codes, user IDs, personal media, NAS details, environment secrets, provider credentials or private source code.
