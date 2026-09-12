# A6.6 Projects Implementation

Status: implementation complete and ready for review. No deployment or commit was performed.

## Scope

The existing Projects application was upgraded with exactly the nine projects locked by A6.5 and A6.5.1. Platform934 continues to use its existing deep case-study component and route; the remaining projects use the same reusable detail presentation with smaller treatment for `bio-cli`.

## Architecture

`src/data/projects.ts` is the single source of truth for project identity, bilingual content, status, ecosystem, presentation depth, capabilities, non-claims, relations, competency IDs, visibility and approved links. `src/data/portfolio.ts` localizes this registry into the existing UI data contract. The professional model was not expanded with new competencies.

The existing Astro catch-all route generates all localized project routes through `src/data/routes.ts`. The existing Preact window manager remains the Projects entry point, so navigation/history, reopen behavior and no-JS static HTML conventions are preserved.

## Registry

The registry contains Platform934, Platform934 API, Stream Optimizer, Devagon Alley, Luna Tartas, Koso, Luna Studio, AntoñiOS and bio-cli. It models `IMPLEMENTED`, `ACTIVE` and `BETA` compound states, the approved three ecosystems, deep/standard/small depth, explicit relations and the designed/planned Luna Studio multi-store direction.

## Presentation

The landing view groups the cards by ecosystem and provides keyboard-operable filters for all projects, Media Engineering, Commerce / Product Engineering and Personal Developer Experience. Cards show status, ecosystem, depth and a limited high-signal technology selection. Detail pages expose engineering story, capabilities, boundaries, demonstrations and approved CTAs.

The media diagram keeps Stream Optimizer and Devagon Alley outside the normal playback path. The commerce view has separate CURRENT and `DESIGNED / PLANNED` diagrams. The personal DX relation is explicitly conceptual rather than runtime.

## CTA policy

Only the approved live CTAs are rendered: `antoniomdm.dev`, `lunatartas.es`, and Koso's temporary URL with its beta label. Private projects have no service or repository CTA. bio-cli has no unverified npm or GitHub CTA. Platform934 TV Web remains unlinked.

## Accessibility, no-JS and responsive behavior

Semantic headings, lists, links, buttons, textual status labels and visible focus use the existing AntoñiOS styles. Filters enhance the static page but all nine links remain in the initial rendered HTML when JavaScript is unavailable. Existing no-JS shell rules expose the window contents as normal document flow. Project cards and diagrams stack on narrow screens, with reduced-motion behavior inherited from the global stylesheet.

## Performance

No new dependency, image or diagram library was introduced. Project content is statically serialized through the existing UI data path. Filter interaction is local state in the existing Projects window and does not hydrate individual cards.

## Tests

`tests/projects.test.ts` validates count, uniqueness, bilingual content, taxonomy, competency references, private-data restrictions, n8n, Koso beta labeling, Luna Studio designed/planned scope, Platform934 depth and bio-cli depth. `tests/e2e/a6-projects.spec.ts` covers the browser acceptance contract: exact registry counts, keyboard filters and focus, editorial boundaries, approved CTAs, history, no-JS detail pages, Axe and responsive layouts. Existing route generation supplies ES and `/en/` equivalents for every slug.

## Browser acceptance evidence

Initial browser validation was temporarily blocked by a Windows file lock during `npm ci`. After the repository-owned Astro dev process was stopped, the locked dependency installation completed successfully without changing `package.json` or `package-lock.json`. The recovered validation used the repository Playwright webServer and left no repository-owned server running.

- Route generation: all nine ES routes and all nine `/en/` routes exist as non-empty static HTML, including `bio-cli`; every route has a localized title, meta description, H1 and document language, with no 404 output.
- Platform934: `/projects/platform934/` and `/en/projects/platform934/` continue to render the existing A6 deep case-study surface rather than the generic project detail.
- Browser tests: the dedicated A6.6 suite passes 8/8, and the complete repository E2E suite passes 87/87.
- ES/EN: project prose, metadata, status facts, filter labels and CTA labels were verified in both locales; English content comes from the bilingual project registry and the existing translator architecture.
- No-JS: the Projects landing exposes all nine project cards and names; Platform934 API, Stream Optimizer, Luna Studio and Koso retain H1, engineering story, status and core content without JavaScript.
- Accessibility: Axe passes with 0 serious and 0 critical violations on ES/EN Projects landings, Platform934 API, Luna Studio and Koso. Keyboard filters preserve visible focus and `aria-pressed` state.
- Responsive: Projects, Stream Optimizer, Luna Studio and Koso were checked at 1440x900, 768x1024 and 390x844 with no horizontal document overflow; status labels, CTAs and current/planned diagrams remain readable.
- Performance: the existing A6 performance tooling reported 36,210 bytes initial JS gzip and 74,221 bytes route transfer estimate for Platform934 in the local production preview. The same measurement recorded 71,560 bytes for the Projects landing and 70,703 bytes for Stream Optimizer, with 36,210 bytes initial JS gzip on both routes. The standard Lighthouse command reported 100 performance, accessibility, best-practices and SEO scores. No dependency, budget or per-card hydration change was introduced.
- Regression suite: lint, typecheck, 38 unit tests, static build and all 87 existing browser tests pass. No tests were weakened and no timeouts were loosened.

## Files changed

- `src/data/projects.ts`
- `src/data/portfolio.ts`
- `src/components/AppContent.tsx`
- `src/i18n/es.ts`
- `src/styles/global.css`
- `tests/projects.test.ts`
- `docs/A6_6_PROJECTS.md`
