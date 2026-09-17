# A5 Architecture Case Studies

## Scope

A5 implements the Architecture application as an index and four bilingual, routable engineering case studies. It changes the approved public architecture copy, presentation, routing, metadata, cross-links, validation and QA coverage. It does not implement A6 or deploy the site.

## Sources

- `docs/A2_PUBLIC_MODEL.md` defines the public professional model, bilingual contract, status rules and relations.
- `docs/A5_0_EDITORIAL_EVIDENCE_LOCK.md` records the evidence audit and unsupported boundaries before human review.
- `docs/A5_0_1_ARCHITECTURE_EDITORIAL_LOCK.md` is the human-approved editorial source for A5 authoring and takes precedence for the four case studies.

No private vault content is connected to the build. A5.0 and A5.0.1 remain unchanged historical/editorial documents.

## Information model changes

The existing `ArchitectureCaseStudy` fields populated from A5.0.1 are `summary`, `context`, `problem`, `constraints`, `decision`, `tradeoffs`, `implementation`, `result` and `learning`. `options` remains `pending_editorial` for every case because no historical alternatives catalogue is documented. IDs, slugs, claim IDs and relation IDs are unchanged.

No `diagram` field was added to `ArchitectureCaseStudy`. `src/data/architecture-presentation.ts` owns a small presentation-only, localized diagram structure. `getUiData` adds it only for the directly requested case; it is not professional evidence, a public claim or literal production topology.

Validation now also rejects empty or duplicate architecture slugs. Existing publication, visibility, status, translation and reference checks are unchanged.

## Routes

| Document | Spanish default | English | Spanish compatibility |
| --- | --- | --- | --- |
| Index | `/architecture/` | `/en/architecture/` | `/es/architecture/` |
| Vehicle read model | `/architecture/vehicle-read-model/` | `/en/architecture/vehicle-read-model/` | `/es/architecture/vehicle-read-model/` |
| Testing infrastructure | `/architecture/testing-infrastructure/` | `/en/architecture/testing-infrastructure/` | `/es/architecture/testing-infrastructure/` |
| Event summaries | `/architecture/event-summaries/` | `/en/architecture/event-summaries/` | `/es/architecture/event-summaries/` |
| Legacy modernization | `/architecture/legacy-modernization/` | `/en/architecture/legacy-modernization/` | `/es/architecture/legacy-modernization/` |

Spanish remains the unprefixed default. Existing `/es/` compatibility documents route to the equivalent default-Spanish page; `/en/` remains canonical for English. Case routes support direct load, refresh, locale switching and browser Back/Forward.

## UX implementation

The Architecture index uses a compact two-column desktop grid and single-column narrow layout. Each card gives the title, summary, competency themes and a real route. Case details use a scan-first header, structured editorial sections, a conceptual diagram and grouped evidence links. The Architecture app retains the existing movable, resizable and maximizable desktop window, tablet workspace behavior and mobile single-app behavior.

Full professional sections and diagram data are included only for the requested case route. The index and unrelated routes receive case summaries and relation IDs, not all four case bodies.

## Case-study evidence boundaries

### Vehicle read model

Published: the company-level legacy read pressure, background bulk projection, incremental Outbox/event evolution, explicit projection-versus-authoritative-state boundary, qualitative result and ownership/coupling learning.

Deliberately not claimed: CQRS, Event Sourcing, exactly-once, a broker, database engine, cache/search technology, replicas, microservice extraction, reconciliation mechanics or numeric performance.

### Testing infrastructure

Published: a sequence of improvements rather than one rewrite; the historical builder friction; semantic Object Mothers/factories; the HTTP boundary and WireMock where appropriate; other A2-approved techniques as contextual, non-simultaneous tools; maintenance trade-off; temporary transition-infrastructure learning; and the largest suite changing approximately from `~60 minutes` to `~2 minutes` over time.

Deliberately not claimed: a formal alternatives catalogue, universal Object Mother superiority, one simultaneous migration, a single-technique causal attribution, suite size or an independently measured `30x` result.

### Event summaries

Published: granular Notification Events as business narrative, synchronous enrichment by affected consumers, Event Summaries as Event-Carried State Transfer for affected paths, retained granular events, payload/duplication/contract trade-offs, reversible evolution and approximately `~1–2` synchronous API calls removed per relevant event in affected integrations.

Deliberately not claimed: global replacement of events, Event Sourcing, exactly-once, a named broker or schema technology, total decoupling, platform-wide impact, latency, throughput, percentage or cost.

### Legacy modernization

Published: a recurring qualitative framework based on criticality and expected churn; tactical seams/characterization/minimal intervention; conditional progressive techniques; anonymized accessory-pricing responsibility extraction; qualitative result; and the four approved learning principles.

Deliberately not claimed: a quantitative scorecard, one isolated completed project, universal pattern combination, mandatory old/new coexistence, procedure/table/system names, customer details or numeric results.

## Diagrams

All four diagrams are responsive semantic HTML and CSS. Each `figure` has an accessible heading and visible description. Nodes use text, borders and sequence in addition to color. Flows become vertical on narrow containers and do not animate. They are conceptual explanations and not literal production topology.

## Relations

| Case | Experience | Competencies | Achievement |
| --- | --- | --- | --- |
| `vehicle-read-model` | `domingo-alonso` | `software-architecture`, `performance-engineering`, `sql-data-architecture` | none |
| `testing-infrastructure` | `domingo-alonso` | `testing-quality` | `integration-suite-feedback` |
| `event-summaries` | `domingo-alonso` | `distributed-systems`, `event-driven-architecture` | `event-summary-api-calls` |
| `legacy-modernization` | `domingo-alonso` | `legacy-modernization`, `software-architecture` | none |

Architecture relations now target the corresponding case route rather than only the index. Case links target the existing localized Experience, Competencies and Achievements anchors.

## Accessibility

The index uses real links; details use semantic headings, sections, lists and figures. Focus-visible styles follow the existing cyan system treatment. There are no nested interactive controls, focus traps or diagram animation. Axe WCAG 2 A/AA and 2.1 AA reports zero violations on the Spanish index, all four Spanish cases and the representative English Event Summaries case. Keyboard links and browser navigation are covered by Playwright. Manual screen-reader QA was not performed.

## Responsive QA

Playwright verifies the four case diagrams at `1440x1000`, `820x1180`, `390x844` and `320x740`. No horizontal document overflow was detected. Diagram flows stack vertically on narrow containers and labels remain textual. The required desktop, tablet and mobile screenshots were reviewed; no clipping or unreadable labels were observed in the captured states.

## No-JS

The Spanish and English index and all eight localized case documents render their core professional content, diagrams and relations in server-generated HTML with JavaScript disabled. Case cards intentionally use document navigation so the requested route receives its complete, server-authored case data.

## Performance

Local production preview measurement on the Spanish default home:

- Initial JS gzip: `27.3 KiB` (`27,326` bytes), below the `40 KiB` budget.
- Home gzip asset estimate: `54.4 KiB` (`54,409` bytes).
- Lighthouse transferred: `57.4 KiB` (`57,440` bytes).
- Arcade boot requests: `0`.
- Audio boot requests: `0`.
- Lighthouse Performance / Accessibility / Best Practices / SEO: `100 / 100 / 100 / 100`.
- LCP: `1,579 ms`.
- CLS: `0`.

The first A5 implementation measured `29.2 KiB` initial JS gzip. Moving localized diagram definitions into build-time presentation data reduced it to `27.3 KiB`. Compared with the documented A4 baseline of `23.1 KiB`, A5 adds approximately `4.2 KiB` gzip for the Architecture renderer and interaction surface while remaining within budget. Measurements are local production-preview diagnostics, not hosted-domain results. Evidence is stored in `docs/quality/a5/performance.json` and `docs/quality/a5/lighthouse.html`.

## Tests

Unit tests cover exact IDs and relations, bilingual published fields, pending undocumented options, publication validation, forbidden statuses/visibility, unique/non-empty slugs, scoped approximate metrics and absence of a primary `30x` claim.

`tests/e2e/a5.spec.ts` covers both indexes, all eight localized direct case routes, case navigation, locale preservation, Back/Forward, Experience/Competency/Achievement links, content-safety boundaries, diagram accessibility and labels, Axe, all required responsive sizes, no-JS and screenshots. Existing A4 and i18n expectations now follow their modeled architecture relation to the exact case route.

Local gates: `npm ci`, lint, typecheck, 34 unit tests, build of 76 static pages, full 74-scenario E2E and `git diff --check` pass on the final implementation tree.

## Screenshots

- `docs/quality/a5/screenshots/a5/01-architecture-index-es-desktop.png`
- `docs/quality/a5/screenshots/a5/02-vehicle-read-model-es-desktop.png`
- `docs/quality/a5/screenshots/a5/03-testing-infrastructure-es-desktop.png`
- `docs/quality/a5/screenshots/a5/04-event-summaries-es-desktop.png`
- `docs/quality/a5/screenshots/a5/05-legacy-modernization-es-desktop.png`
- `docs/quality/a5/screenshots/a5/06-architecture-index-en-desktop.png`
- `docs/quality/a5/screenshots/a5/07-vehicle-read-model-mobile-es.png`
- `docs/quality/a5/screenshots/a5/08-event-summaries-mobile-es.png`
- `docs/quality/a5/screenshots/a5/09-legacy-modernization-tablet-es.png`

## Remaining limitations

Manual testing with a physical touch device and a real screen reader was not performed. Lighthouse measurements are local rather than hosted. The established no-JS Spanish compatibility redirect preserves the destination path but not query/hash, as documented in A2–A4.

## Deployment

**NOT PERFORMED.** A5 does not publish to production or merge a temporary verification pull request.
