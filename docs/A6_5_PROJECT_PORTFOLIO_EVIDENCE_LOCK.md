# A6.5 Project Portfolio Evidence Lock

Status: `READY_FOR_A6_6_EDITORIAL_IMPLEMENTATION`

Audit basis / Base de auditoria: 2026-09-12. This document is the evidence and
editorial contract for the nine personal projects approved for A6.5. It does
not implement routes, UI, project cards, or changes to the professional model.
Este documento es el contrato de evidencia y edición para los nueve proyectos
personales aprobados para A6.5. No implementa rutas, UI, tarjetas de proyectos
ni cambios en el modelo profesional.

Status vocabulary / Vocabulario de estados: `IMPLEMENTED`, `BETA`, `ACTIVE`,
`IN_PROGRESS`, `PLANNED`, `DESIGNED`, `HISTORICAL`, `NEEDS_VERIFICATION`.
`BETA` does not mean production-ready. `DESIGNED` and `PLANNED` must never be
rendered as implemented. / `BETA` no significa listo para producción. `DESIGNED`
y `PLANNED` nunca deben mostrarse como implementados.

## 1. Scope

The locked portfolio set is exactly these projects: Platform934, Platform934
API, Stream Optimizer, Devagon Alley, Luna Tartas, Koso, Luna Studio, AntoñiOS
and bio-cli / bio-dev-card. Existing A5 professional architecture case
studies remain separate. / El conjunto bloqueado contiene exactamente estos
proyectos. Los casos profesionales de arquitectura de A5 permanecen separados.

The portfolio preserves product and operational relationships. The projects
are not nine claims that they share one repository, deployment, or runtime
request path. / El portfolio conserva relaciones de producto y operación. No
son nueve afirmaciones de que compartan repositorio, despliegue o ruta de
ejecución.

Evidence priority / Prioridad: current source code, current documentation,
tests/CI/deployment configuration, locked AntoñiOS evidence, human-confirmed
facts in the milestone brief, then conservative inference. Contradictions are
recorded rather than silently promoted. / Las contradicciones se registran y no
se convierten silenciosamente en afirmaciones.

## 2. Evidence sources

| Project | Repository / source | Relevant evidence | Tests, CI, deployment | Human-confirmed facts used |
| --- | --- | --- | --- | --- |
| Platform934 | `C:\lab\repos\platform934`; A6 source in this repository | `docs/A6_0_PLATFORM934_EVIDENCE_LOCK.md`, `docs/A6_0_1_PLATFORM934_EDITORIAL_LOCK.md`, `docs/A6_PLATFORM934.md`; client and TV source | A6 CI and E2E evidence; TV Web deployment was not approved as a CTA | A6.0.1 approved API and agent runtime capabilities |
| Platform934 API | `C:\lab\repos\platform-934-api` | `README.md`; `docs/agent-gateway/01-architecture.md`; `04-tool-catalog.md`; source under `src/Platform934.Api` | `tests/Platform934.Api.Tests/ApiEndpointSurfaceTests.cs`; Docker Compose; health/readiness routes | Independent private backend; current conversational capability list; MCP not implemented |
| Stream Optimizer | `C:\lab\repos\stream-optimizer` | `n8n/n8n_data/*.json`; `n8n/ffmpeg-worker/app.py`; Dockerfiles, Compose and `deploy.md` | n8n and worker container definitions; no production metrics approved | Automation/media-processing role around Platform934 |
| Devagon Alley | `C:\lab\repos\platform934/nas/devagon-alley-store` | `app_store_server.dart`; `app_store/store.json`; Nginx/Caddy/Docker files; `GUIA_NAS.md` | Dart HTTP server, health route, store/API/download handlers, deployment files | Private distribution/update service; multiple private applications |
| Luna Tartas | `C:\lab\repos\luna_tartas` | `README.md`; `astro.config.mjs`; `src/content`, `src/lib/catalog`, schemas and pages | Contract tests; GitHub Actions; static GitHub Pages deployment; production URL | Real niche storefront/catalogue; official name is Luna Tartas |
| Koso | `C:\lab\repos\koso` | `README.md`; `docs/architecture.md`, `catalog.md`, `content.md`, `seo.md`; `src/content`, schemas and Astro pages | CI, Vitest, Playwright, content validation, static build; temporary hosted beta | Different store and product niche; 3D fabrication is a capability, not the whole brand |
| Luna Studio | `C:\lab\repos\luna-studio` | `README.md`; `docs/architecture.md`, `authentication.md`, `catalog-contract.md`, `analytics.md`, `release.md`; `lib`, `test` | Flutter analyze/tests/build instructions; GitHub Actions; Android/Windows release contracts | Current manager of Luna Tartas only; multi-store is designed/planned |
| AntoñiOS | Current repository `xenxi/antoniomdm.dev`; historical `legacy/flutter` | `README.md`; A2-A6 locks; `src/data/professional/model.ts`; Astro/Preact/TypeScript source; Playwright and CI | A6 CI run `34650787250`, SHA `8242c52c26a8c77f4aaa576f2332c20b7146e974` | Portfolio is a personal engineering product and modernization of the author's legacy portfolio |
| bio-cli / bio-dev-card | Intended repository `xenxi/bio-cli`; no local checkout found during this audit | No local source or package metadata available | Human confirmation says package was published; release evidence still needs retrieval | Published package and small terminal business-card role |

Repository scans were read-only. Secret values, private endpoints, internal
paths, private media data and private source are not evidence for publication.
Los escaneos fueron de solo lectura. Los valores secretos, endpoints privados,
rutas internas, datos multimedia privados y código privado no son evidencia
publicable.

## 3. Portfolio taxonomy

### MEDIA ENGINEERING

Platform934, Platform934 API, Stream Optimizer and Devagon Alley. The first is
the product/client platform; the API is an independent gateway; the latter two
are supporting automation and distribution systems. / Platform934, Platform934
API, Stream Optimizer y Devagon Alley. El primero es la plataforma de producto
y clientes; la API es una puerta de enlace independiente; los otros dos son
sistemas auxiliares de automatización y distribución.

### COMMERCE / PRODUCT ENGINEERING

Luna Tartas, Koso and Luna Studio. Luna Tartas and Koso are independent niche
storefronts. Luna Studio currently manages Luna Tartas only. / Luna Tartas,
Koso y Luna Studio. Luna Tartas y Koso son tiendas independientes. Luna Studio
gestiona actualmente solo Luna Tartas.

### PERSONAL DEVELOPER EXPERIENCE

AntoñiOS and bio-cli / bio-dev-card. Their relationship is an ecosystem and
developer-experience relationship, not a runtime dependency. / Su relación es
de ecosistema y experiencia de desarrollo, no una dependencia runtime.

## 4. Project registry

### Platform934

- **ID:** `platform934`
- **Public name:** Platform934
- **Repository/source:** `xenxi/platform934`; authoritative A6 locks in this repository
- **Visibility:** personal project; source details anonymized for public presentation
- **Status:** `IMPLEMENTED / ACTIVE`
- **Ecosystem:** Media Engineering
- **Presentation depth:** `DEEP_CASE_STUDY`, already locked by A6
- **Public summary ES:** Plataforma multimedia multicliente y laboratorio personal de ingeniería construido alrededor de Jellyfin, con clientes diferenciados, experiencia TV y orquestación de reproducción.
- **Public summary EN:** A multi-client media platform and personal engineering lab built around Jellyfin, with differentiated clients, TV experience and playback orchestration.
- **Primary engineering story:** Product and client engineering above Jellyfin, with clear responsibility boundaries and progressive TV specialization.
- **Technologies:** Flutter, Dart, Preact, TypeScript where evidenced, Kotlin, Compose TV where evidenced, Media3, Jellyfin.
- **Implemented capabilities:** Mobile and web client surfaces; dedicated TV Web client; catalogue/authentication/playback scenarios; focus and remote navigation; bounded real-hardware performance evidence; profiles and product UX; A6 API/agent relationship.
- **Designed/planned or in progress:** Broader remote-device orchestration is `IN_PROGRESS`; native Google TV hardening and release gates remain `IN_PROGRESS`.
- **Explicit non-claims:** Platform934 did not build Jellyfin, its server, transcoder or codec pipeline; it is not a Netflix clone; no universal feature parity, iOS support, or autonomous agent claim.
- **Relations:** `RUNTIME` to Jellyfin; `ECOSYSTEM` to Platform934 API; `OPERATIONAL` to Stream Optimizer; `DISTRIBUTION` to Devagon Alley.
- **Competency mappings:** `software-architecture`, `performance-engineering`, `mobile-multiplatform`, `applied-ai`, `agentic-engineering`, `agentic-product-architecture`.
- **Missing competency candidates:** none required for A6.5; workflow automation is mapped to Stream Optimizer instead.
- **Public links:** `https://antoniomdm.dev/` is the portfolio link only; no TV Web CTA until the existing A6 operational decision is revalidated.
- **Privacy restrictions:** Do not publish Jellyfin URLs, QuickConnect codes, user IDs, media catalogues, private endpoints, deployment topology, credentials or private source.

### Platform934 API

- **ID:** `platform934-api`
- **Public name:** Platform934 API
- **Repository/source:** private `xenxi/platform-934-api`; source is not a public CTA
- **Visibility:** private backend; public narrative must be anonymized
- **Status:** `IMPLEMENTED / ACTIVE`
- **Ecosystem:** Media Engineering
- **Presentation depth:** `STANDARD_PROJECT`
- **Public summary ES:** Backend privado independiente y puerta de enlace de agentes sobre Jellyfin. Añade contratos tipados, herramientas allowlisted y orquestación conversacional sin sustituir a Jellyfin como autoridad multimedia.
- **Public summary EN:** An independent private backend and agent gateway layered over Jellyfin. It adds typed contracts, allowlisted tools and conversational orchestration without replacing Jellyfin as the media authority.
- **Primary engineering story:** A bounded gateway separates client/product capabilities, Jellyfin access, Semantic Kernel orchestration, LiteLLM routing and persistence/operations.
- **Technologies:** .NET, ASP.NET Core, Semantic Kernel, LiteLLM, official Jellyfin API, typed contracts, PostgreSQL/EF Core where documented, SignalR device boundary, Docker.
- **Implemented capabilities:** Authenticated Jellyfin-backed media search; recommendations; list creation and modification; film discussion and explanation; bounded tool calling; health/readiness; traceable agent decisions/actions; typed allowlisted tools; current API tests.
- **Designed/planned or in progress:** Broader playback/device orchestration is `IN_PROGRESS`; the gateway's future tool expansion remains bounded by the documented roadmap.
- **Explicit non-claims:** The agent is not autonomous; MCP is not implemented; it is not a Jellyfin fork or replacement; do not publish endpoints, credentials, provider names/secrets, internal deployment details or source.
- **Relations:** `RUNTIME`/`ECOSYSTEM` to Platform934; ordinary client operations may remain direct to Jellyfin; not every client request routes through this API.
- **Competency mappings:** `software-architecture`, `dotnet-backend`, `applied-ai`, `agentic-product-architecture`; `distributed-systems` only for specific backend/device/persistence claims, not as a blanket label.
- **Missing competency candidates:** none required; release/deployment could be considered later if the model gains that competency.
- **Public links:** No repository or endpoint CTA. Relationship to Platform934 may be shown.
- **Privacy restrictions:** Exclude private URLs, tokens, API keys, LLM provider credentials, database strings, logs, hostnames, source code and deployment topology.

### Stream Optimizer

- **ID:** `stream-optimizer`
- **Public name:** Stream Optimizer
- **Repository/source:** `xenxi/stream-optimizer`
- **Visibility:** source visibility and safe public repository CTA require a separate visibility check
- **Status:** `IMPLEMENTED / BETA`
- **Ecosystem:** Media Engineering
- **Presentation depth:** `STANDARD_PROJECT`
- **Public summary ES:** Servicios de automatización y procesamiento multimedia alrededor del ecosistema Platform934. Combina workflows de n8n con un worker especializado de FFmpeg para mantenimiento, trailers, normalización y transcodificación.
- **Public summary EN:** Automation and media-processing services around the Platform934 ecosystem. It combines n8n workflows with a specialized FFmpeg worker for maintenance, trailers, normalization and transcoding.
- **Primary engineering story:** Workflow automation coordinates integrations and batch decisions; specialized worker code performs bounded media processing.
- **Technologies:** n8n, Docker, Docker Compose, FFmpeg, Python, yt-dlp where evidenced, Jellyfin/TMDB integrations where evidenced, Tailscale configuration where evidenced.
- **Implemented capabilities:** n8n workflows for automatic collection creation, trailer acquisition/download, media organization/maintenance and asynchronous transcode requests; containerized FFmpeg worker with queue/status handling, QSV attempt and CPU fallback; path-boundary checks; deployment configuration.
- **n8n evidence:** `n8n/n8n_data/Jellyfin - Auto colecciones por carpetas.json` contains n8n nodes and code for scanning/mapping media folders and creating/updating collections. `Jellyfin Trailer PRO.json` contains scheduled/manual triggers, Jellyfin/TMDB requests, trailer selection, yt-dlp command execution and review logging. `NAS Media Organizer.json` contains scheduled/batch automation and filesystem decisions. `Transcode Peliculas+Series ASYNC.json` calls the worker's `/transcode` endpoint and polls/handles results. Therefore n8n is the orchestration layer, not merely a listed dependency.
- **Responsibility boundary:** n8n coordinates triggers, API calls, branching, batch loops, logging and worker requests. `ffmpeg-worker/app.py` performs media inspection, audio/subtitle mapping, FFmpeg transcoding, job queueing, completion and controlled input movement. Do not imply n8n itself is the transcoder.
- **Designed/planned or in progress:** Beta operational hardening and broader production guarantees are not claimed; no throughput or reliability metric is approved.
- **Explicit non-claims:** Do not call it a microservices platform; do not claim universal automation, production SLA, processing throughput, storage savings, or autonomous media management.
- **Relations:** `OPERATIONAL`/`SUPPORTING` to Platform934; it is not in the normal playback request path.
- **Competency mappings:** `software-architecture` only for the evidenced responsibility boundaries; `performance-engineering` for media-processing implementation where scoped.
- **Missing competency candidates:** workflow automation / n8n; media operations; release engineering; CLI/tooling if later supported by the model.
- **Public links:** No CTA until repository visibility and safe contents are reviewed.
- **Privacy restrictions:** Never publish internal IPs, NAS paths, hostnames, tokens, credentials, media names, environment values or workflow data containing private catalogue information.

### Devagon Alley

- **ID:** `devagon-alley`
- **Public name:** Devagon Alley
- **Repository/source:** `xenxi/platform934/nas/devagon-alley-store`
- **Visibility:** implementation embedded in Platform934 repository; no private infrastructure CTA
- **Status:** `IMPLEMENTED / BETA`
- **Ecosystem:** Media Engineering
- **Presentation depth:** `STANDARD_PROJECT`
- **Public summary ES:** Servicio privado de distribución y actualización de aplicaciones, con acceso autenticado, catálogo de versiones y descargas para aplicaciones privadas.
- **Public summary EN:** A private application distribution and update service with authenticated access, version catalogue and downloads for private applications.
- **Primary engineering story:** A small Dart HTTP service exposes filesystem-backed application metadata, manifests and artifacts behind session, bearer-token or app-key boundaries.
- **Technologies:** Dart, Docker, Nginx, Caddy, filesystem-backed store, HTTP/JSON, session cookies.
- **Implemented capabilities:** Authenticated web login/session; health endpoint; store and app summaries; latest-version/manifest lookup; app download authorization; version metadata, release notes and release history fields; multiple application entries; client update contract used by Luna Studio.
- **Designed/planned or in progress:** Production availability and operational hardening are not generalized from local source/configuration.
- **Explicit non-claims:** It is not a public app marketplace; do not publish credentials, app keys, update tokens, internal paths, hostnames, infrastructure configuration or private artifact names.
- **Relations:** `DISTRIBUTION` to Platform934 applications; `DISTRIBUTION`/`OPERATIONAL` to Luna Studio update lifecycle where its contract is evidenced.
- **Competency mappings:** `software-architecture` for the service boundary; `mobile-multiplatform` only as a distribution relationship, not as an implementation claim.
- **Missing competency candidates:** release engineering / application lifecycle management.
- **Public links:** No public service CTA approved.
- **Privacy restrictions:** Exclude auth secrets, session values, app keys/tokens, NAS paths, private download URLs, private APKs and deployment topology.

### Luna Tartas

- **ID:** `luna-tartas`
- **Public name:** Luna Tartas
- **Repository/source:** `xenxi/luna_tartas`
- **Visibility:** repository documentation describes it as public; verify current repository visibility before a GitHub CTA
- **Status:** `IMPLEMENTED / BETA`
- **Ecosystem:** Commerce / Product Engineering
- **Presentation depth:** `STANDARD_PROJECT`
- **Public summary ES:** Catálogo y tienda estática para productos personalizados de papelería, regalos y productos relacionados. Su arquitectura combina contenido estructurado, validación en build y mecanismos externos de contacto/conversión.
- **Public summary EN:** A static catalogue and storefront for personalized stationery, gifts and related products. Its architecture combines structured content, build-time validation and external contact/conversion mechanisms.
- **Primary engineering story:** Proportional product architecture: static generation is used deliberately instead of adding a backend, CMS, accounts or database that the current domain does not require.
- **Technologies:** Astro, TypeScript, YAML/content collections, Zod schemas, static generation, HTML/JSON-LD, GitHub Actions, GitHub Pages, GA4 with consent, responsive CSS, low client-JS approach.
- **Implemented capabilities:** Structured catalogue and taxonomy; published/draft validation; product detail/listing routes; build-time content and asset checks; static output; SEO and structured data; responsive/accessibility tests; analytics instrumentation and consent UI; CI and GitHub Pages deployment.
- **Rendering boundary:** `astro.config.mjs` sets `output: 'static'`. The approved claim is static generation/build-time rendering, not SSR. Client JavaScript is used only where the current code requires interaction or analytics; no universal hydration claim.
- **Designed/planned or in progress:** Future editorial/operational improvements remain governed by the repository docs; no backend, CMS, accounts or database is planned as a missing requirement for the current storefront.
- **Explicit non-claims:** Do not call it SSR; do not claim a full commerce backend, user accounts, database, sales, conversion, traffic or payment processing.
- **Relations:** `EDITORIAL`/`RUNTIME` to Luna Studio as its current catalogue source; independent from Koso.
- **Competency mappings:** `software-architecture`, `full-stack-frontend`, `performance-engineering` where scoped, `end-to-end-ownership` if existing model semantics are used.
- **Missing competency candidates:** SEO/product web engineering; static commerce architecture if model expansion is later justified.
- **Public links:** `https://lunatartas.es/` approved as live site CTA. GitHub CTA requires current visibility and content review.
- **Privacy restrictions:** Exclude private analytics credentials, contact configuration, unpublished product data, personal customer data, tokens and deployment secrets.

### Koso

- **ID:** `koso`
- **Public name:** Koso
- **Repository/source:** `xenxi/koso`
- **Visibility:** repository is marked private in `package.json`; no GitHub CTA
- **Status:** `IMPLEMENTED / BETA`
- **Ecosystem:** Commerce / Product Engineering
- **Presentation depth:** `STANDARD_PROJECT`
- **Public summary ES:** Tienda Astro independiente para productos físicos originales y personalizados, con catálogo estructurado, descubrimiento y personalización. La fabricación 3D es una capacidad de producción, no toda la propuesta de marca.
- **Public summary EN:** An independent Astro storefront for original and personalized physical products, with structured catalogue, discovery and personalization. 3D fabrication is a production capability, not the whole brand proposition.
- **Primary engineering story:** Content-driven static storefront with strict schemas, domain mapping and SEO/discovery paths, deliberately without SSR or service infrastructure.
- **Technologies:** Astro, TypeScript, Zod, JSON Content Collections, static generation, responsive CSS, Playwright, Vitest, GitHub Actions.
- **Implemented capabilities:** Product/category/content collections; schema validation; catalogue and product routes; personalization inputs; favorites/local interactions where evidenced; SEO/content tooling; CI, unit/E2E tests and static build; temporary hosted beta preview.
- **Designed/planned or in progress:** Blog/content, marketplace/social distribution, backoffice integration and multi-store tooling are evolving or planned unless a specific implementation is later verified. `Koso Studio` is a future direction, not current Luna Studio management.
- **Explicit non-claims:** Koso is not a Luna Tartas clone, theme, sub-brand or multi-tenant system; do not claim production completeness, permanent domain, accounts, payments, social APIs, newsletter or public catalogue readiness beyond the beta evidence.
- **Relations:** `EDITORIAL` independent storefront; `FUTURE/DESIGNED` relationship to Luna Studio multi-store direction only.
- **Competency mappings:** `full-stack-frontend`, `software-architecture` where the static/domain boundary is discussed.
- **Missing competency candidates:** SEO/product web engineering; content-driven commerce if later justified.
- **Public links:** `https://koso-cosas-originales.xenxi-85.chatgpt.site/` may be used only with the label `Beta / temporary preview`; it is not canonical.
- **Privacy restrictions:** Exclude preview credentials, private configuration, unpublished fixtures, personal/customer information and hosting internals.

### Luna Studio

- **ID:** `luna-studio`
- **Public name:** Luna Studio
- **Repository/source:** `xenxi/luna-studio`
- **Visibility:** private backoffice; no GitHub CTA
- **Status:** `IMPLEMENTED / BETA`
- **Ecosystem:** Commerce / Product Engineering
- **Presentation depth:** `STANDARD_PROJECT`
- **Public summary ES:** Backoffice privado Flutter para editar y revisar el catálogo de Luna Tartas, consultar inventario y analítica y controlar su ciclo de publicación y actualización.
- **Public summary EN:** A private Flutter backoffice for editing and reviewing the Luna Tartas catalogue, consulting inventory and analytics, and controlling its publication and update lifecycle.
- **Primary engineering story:** Clean boundaries around one real store first: UI -> Controller/Notifier -> Repository -> DataSource -> API/platform, with source-of-truth boundaries kept explicit.
- **Technologies:** Flutter, Dart, Android, Windows, Riverpod where evidenced, GitHub REST/Git Data API, GitHub Actions, GA4 Data API, secure storage, local cache, Devagon Alley update contract.
- **Implemented capabilities:** Catalogue read/edit workflows; inventory view; GitHub authentication and repository integration; local/cache behavior; GA4 analytics dashboard contract; Android/Windows application source; tests and build/release tooling; update/release contracts.
- **Current architecture:** Luna Studio manages Luna Tartas today. Luna Tartas remains the editorial catalogue source, GA4 remains analytics authority, and Devagon Alley remains distribution infrastructure.
- **Designed/planned only:** Multi-store management for Luna Tartas, Koso and future storefronts is `DESIGNED / PLANNED`, not implemented. Do not claim current Koso management.
- **Explicit non-claims:** No current N-store manager; no current Koso integration; no server, database, CMS, Firebase or Supabase introduced by V1; external OAuth/release gates remain scoped where docs say so.
- **Relations:** `RUNTIME`/`EDITORIAL` to Luna Tartas; `DISTRIBUTION` to Devagon Alley; `FUTURE/DESIGNED` to Koso.
- **Competency mappings:** `software-architecture`, `mobile-multiplatform`, `full-stack-frontend` where appropriate.
- **Missing competency candidates:** release engineering / application lifecycle management.
- **Public links:** No app or repository CTA; project may link contextually to Luna Tartas only if desired.
- **Privacy restrictions:** Exclude OAuth tokens, GitHub App secrets, GA4 credentials, signing keys, keystores, private update configuration and customer/catalogue data.

### AntoñiOS / antoniomdm.dev

- **ID:** `antonios`
- **Public name:** AntoñiOS; repository/project name `antoniomdm.dev`
- **Repository/source:** current `xenxi/antoniomdm.dev`; historical Flutter retained under `legacy/`
- **Visibility:** public site; current repository CTA requires normal visibility/content review
- **Status:** `IMPLEMENTED / ACTIVE`
- **Ecosystem:** Personal Developer Experience
- **Presentation depth:** `DEEP_CASE_STUDY` or rich `STANDARD_PROJECT`; use a concise project narrative and do not duplicate the whole site
- **Public summary ES:** AntoñiOS es la modernización del portfolio legacy del autor tratada como un producto de ingeniería: un escritorio OS ficticio con ventanas, responsive progressive enhancement, modelo profesional bilingüe, accesibilidad, rendimiento, pruebas y gates de CI.
- **Public summary EN:** AntoñiOS is the modernization of the author's legacy portfolio treated as an engineering product: a fictional desktop OS with windows, responsive progressive enhancement, a bilingual professional model, accessibility, performance, tests and CI gates.
- **Primary engineering story:** Incremental modernization, evidence-backed data modeling and controlled evolution of a personal product rather than a disposable landing page.
- **Technologies:** Astro, Preact, TypeScript, static HTML, Playwright, Vitest, ESLint, Astro check, GitHub Actions; historical Flutter evidence in repository history/legacy.
- **Implemented capabilities:** Window management and OS interaction model; desktop/tablet/mobile behavior; progressive enhancement and no-JS narrative; accessibility; typed bilingual professional model; architecture case studies; project evidence system; performance budgets; Playwright regression and CI quality gates; optional/lazy Arcade boundary.
- **Designed/planned or in progress:** Future project implementation belongs to A6.6; no claim is made here for new project routes or UI.
- **Explicit non-claims:** This lock does not duplicate the current site; historical Flutter is not current production UI; do not claim universal device testing, unverified metrics, or autonomous AI development.
- **Relations:** `ECOSYSTEM` to bio-cli / bio-dev-card; this project is the portfolio that will later consume this lock.
- **Competency mappings:** `software-architecture`, `legacy-modernization`, `performance-engineering`, `full-stack-frontend`, `testing-quality`, `agentic-engineering` only for the evidenced supervised development process.
- **Missing competency candidates:** none required; project evidence may support SEO/product web engineering as a future candidate.
- **Public links:** `https://antoniomdm.dev/` approved. No duplicate self-link is required inside its future narrative.
- **Privacy restrictions:** Preserve existing A6 privacy lock; exclude personal contact data not already approved, internal CI values, private source details, secrets and private infrastructure.

### bio-cli / bio-dev-card

- **ID:** `bio-cli`
- **Public name:** bio-cli / bio-dev-card
- **Repository/source:** intended `xenxi/bio-cli`; local checkout unavailable in this audit
- **Visibility:** package publication is human-confirmed; repository/package metadata needs verification
- **Status:** `IMPLEMENTED`
- **Ecosystem:** Personal Developer Experience
- **Presentation depth:** `SMALL_PROJECT`
- **Public summary ES:** Pequeña herramienta CLI de Node.js y TypeScript que funciona como tarjeta profesional en la terminal y expone información de contacto mediante un paquete npm.
- **Public summary EN:** A small Node.js and TypeScript CLI that works as a terminal business card and exposes professional/contact information through an npm package.
- **Primary engineering story:** Small, focused developer-experience utility with package delivery rather than a major architecture case study.
- **Technologies:** Node.js, TypeScript, ESM, CLI, npm packaging; `boxen`, `inquirer` and `open` are human-confirmed expected dependencies pending source verification.
- **Implemented capabilities:** Published npm package and terminal business-card role are `HUMAN_CONFIRMED`; exact commands/build metadata remain to be verified from the repository.
- **Designed/planned or in progress:** Possible integration with the AntoñiOS Terminal is conceptual/ecosystem only, not a runtime dependency.
- **Explicit non-claims:** Do not retain stale “will be released soon” wording; do not inflate this into a platform, architecture case study or claim unverified package metadata.
- **Relations:** `ECOSYSTEM` to AntoñiOS; possible future/editorial integration only.
- **Competency mappings:** closest existing tooling/TypeScript fit if confirmed; omit `full-stack-frontend` unless semantic fit is established.
- **Missing competency candidates:** CLI/tooling and npm package engineering.
- **Public links:** npm/GitHub CTA not approved until package and repository URLs/visibility are verified.
- **Privacy restrictions:** Exclude personal contact values, unpublished package credentials, tokens and maintainer metadata not approved for publication.

## 5. Platform934

A6 remains authoritative. A6.5 only adds the portfolio relationship model:
Platform934 is the primary Media Engineering product; Platform934 API is a
related independent private backend; Stream Optimizer and Devagon Alley are
supporting systems. Jellyfin remains authoritative for the media-server,
catalogue, playback-source, streaming/transcoding, authentication/QuickConnect
and supported history/favourites/playlists responsibilities. / A6 sigue siendo
la autoridad; A6.5 solo añade cómo participa en el portfolio.

## 6. Platform934 API

The current repository is a real independent .NET API project. Its documented
shape is clients -> `Platform934.Api` -> Jellyfin API, Semantic Kernel -> LiteLLM
-> provider route, and PostgreSQL persistence. The agent reaches Jellyfin only
through the typed client boundary. Tool rules are allowlisted, typed,
traceable, bounded and non-destructive by default. / El repositorio actual es
un proyecto API .NET independiente real. Las operaciones conversacionales
confirmadas son búsqueda, recomendaciones, creación/modificación de listas,
discusión y explicación de películas y tool calling acotado. La orquestación
de dispositivos/reproducción más amplia permanece `IN_PROGRESS`. MCP no está
implementado.

The public story must not expose the private repository, endpoints, secrets,
provider credentials, deployment topology or source code. / La historia pública
no debe exponer repositorio privado, endpoints, secretos, credenciales,
topología de despliegue ni código fuente.

## 7. Stream Optimizer

The repository contains four relevant n8n workflow exports and a separate
Python FFmpeg worker. The n8n Compose file builds an n8n container and an
`ffmpeg-worker` container. The worker exposes a job-oriented HTTP surface,
validates storage roots and runs FFmpeg with QSV-first/CPU-fallback behavior.
The workflows coordinate Jellyfin/TMDB reads, folder mapping, collection
creation, trailer selection/download, review logging, organization and async
transcoding. / El repositorio contiene cuatro workflows n8n y un worker Python
FFmpeg separado. n8n coordina; el worker ejecuta el procesamiento especializado.

This supports practical n8n experience as a verified engineering story. It
does not support a generic “microservices platform” claim or any invented
operational metric. / Esto demuestra experiencia práctica con n8n, pero no
autoriza llamar al conjunto plataforma de microservicios ni inventar métricas.

## 8. Devagon Alley

The Dart server implements login/session handling, health, store summaries,
app details, manifests and protected downloads. The store is filesystem-backed
and configuration-driven. The Luna Studio release contract consumes a manifest
with version, minimum supported version, force-update, URL and release notes.
This verifies private distribution/update-service capabilities, not a public
marketplace. / El servidor Dart implementa login/sesión, salud, resúmenes,
detalles, manifests y descargas protegidas. Verifica distribución privada y
actualizaciones, no un marketplace público.

## 9. Luna Tartas

`astro.config.mjs` explicitly sets `output: 'static'`. The current evidence is
therefore static generation, not SSR. The catalogue flow is structured content
through schema/domain validation into Astro HTML, JSON-LD and catalog output.
The repository documents GitHub Actions and GitHub Pages deployment and tests
cover catalogue, SEO, analytics, accessibility, responsive behavior and
performance contracts. / La configuración confirma generación estática, no SSR.

The editorial lesson is proportional architecture: a lightweight storefront
can be a deliberate product decision when external contact/conversion and
build-time content validation satisfy the domain. / La lección editorial es la
arquitectura proporcional, no la ausencia de ingeniería.

## 10. Koso

Koso is an independent static Astro storefront with JSON content collections,
Zod validation, product/category/collection/campaign/editorial routes and a
private preview posture in the repository documentation. Its current deployed
beta URL is temporary. Blog/content, social/marketplace distribution,
backoffice and multi-store directions are not to be promoted beyond their
verified implementation status. / Koso es una tienda Astro estática
independiente. Su URL desplegada es una beta temporal y no un dominio canónico.

## 11. Luna Studio

Code and tests support Android and Windows Flutter surfaces, catalogue editing,
inventory, GitHub integration, local/cache behavior, GA4 analytics contracts,
authentication boundaries and release/update contracts. The source-of-truth
model is explicit: Luna Tartas owns editorial catalogue data, GA4 owns
aggregated analytics and Devagon Alley owns distribution. / El código y los
tests soportan superficies Flutter Android/Windows, edición, inventario,
GitHub, cache local, GA4, autenticación y release/updates.

Current: Luna Studio -> Luna Tartas. Target: Luna Studio -> Luna Tartas and
Koso. The target is `DESIGNED / PLANNED`; current Koso management is false. /
Actual: Luna Studio -> Luna Tartas. Objetivo: Luna Studio -> Luna Tartas y
Koso. El objetivo es `DESIGNED / PLANNED`; la gestión actual de Koso es falsa.

## 12. AntoñiOS

The project is explicitly a modernization of the author's own older portfolio.
The current Astro/Preact/TypeScript product preserves a fictional desktop OS
interaction model while adding typed bilingual professional data, accessibility,
no-JS coverage, responsive behavior, performance budgets, architecture case
studies, project evidence and CI/E2E gates. The historical Flutter implementation
is evidence of the legacy starting point, not current production UI. / El
proyecto moderniza explícitamente el portfolio legacy del propio autor. Flutter
histórico demuestra el punto de partida, no la UI de producción actual.

Approved concise lesson / Lección aprobada: treat a portfolio as a real product:
model its data, measure performance, design accessibility, preserve
compatibility and control evolution instead of treating it as a disposable
landing page. / tratar el portfolio como un producto real: modelar datos, medir
rendimiento, diseñar accesibilidad, preservar compatibilidad y controlar su
evolución.

## 13. bio-cli

Human confirmation establishes that the package was published. Because the
checkout is not available locally, package name, current version, npm URL,
source commands, build scripts and dependency metadata remain
`NEEDS_VERIFICATION`. The A6.6 implementation may use the small-project summary
but must not invent those fields. / La confirmación humana establece que el
paquete se publicó. Al no existir el checkout local, versión, URL npm, comandos,
build y dependencias quedan `NEEDS_VERIFICATION`.

## 14. Media ecosystem

### CURRENT architecture only

```text
Platform934 clients
    |--------------------------> Jellyfin
    |
    +--------------------------> Platform934 API (optional product/agent path)
                                      |
                               Platform934 Agent
                                      |
                               Semantic Kernel
                                      |
                                   LiteLLM
                                      |
                                LLM provider route
```

Supporting systems, outside the normal playback request path:

```text
Stream Optimizer -> media automation / processing / enrichment
Devagon Alley    -> private application distribution / update lifecycle
```

The diagram is conceptual. It does not claim that every client request passes
through Platform934 API, Stream Optimizer or Devagon Alley. / El diagrama es
conceptual y no afirma que toda petición pase por esos sistemas.

## 15. Commerce ecosystem

### CURRENT architecture

```text
Luna Tartas
    | structured catalogue
    v
Luna Studio (current single-store backoffice)

Koso
    | its own current static storefront/catalogue
```

### TARGET / DESIGNED architecture

```text
                 Luna Studio
                /           \
        Luna Tartas           Koso
             |                 |
         catalogue         catalogue
         analytics         analytics
         assets            assets
```

The second diagram is `DESIGNED / PLANNED`. It is not evidence that Luna
Studio manages Koso today. / El segundo diagrama es `DESIGNED / PLANNED` y no
demuestra gestión actual de Koso.

## 16. Personal DX ecosystem

```text
AntoñiOS -> project evidence, professional model and terminal experience
    ^
    | conceptual/ecosystem relationship
bio-cli / bio-dev-card -> small published terminal business card package
```

No runtime dependency is claimed. The future integration remains editorial or
product direction until source evidence proves otherwise. / No se afirma una
dependencia runtime.

## 17. Cross-project architectural themes

Only these evidence-backed themes are approved:

- Proportional architecture: static storefronts avoid unnecessary backend infrastructure.
- Avoid unnecessary infrastructure: Luna Tartas and Koso explicitly keep V1 static.
- Specialization when device constraints justify it: Platform934's TV evolution.
- Shared tooling only after real reuse pressure: Luna Studio's current one-store boundary and designed multi-store direction.
- Explicit source-of-truth boundaries: Jellyfin, Luna Tartas, GA4 and Devagon Alley retain their authorities.
- Automation with bounded responsibilities: n8n orchestrates; the FFmpeg worker processes.
- Operational tooling separated from product clients: Stream Optimizer and Devagon Alley support but do not become playback clients.
- Evidence-driven engineering: A6 locks, repository tests, CI and bounded claims.
- Incremental modernization: AntoñiOS and the historical-to-current portfolio transition.

## 18. Competency matrix

Existing model IDs only. A blank cell means no mapping is approved.

| Project | software-architecture | performance-engineering | mobile-multiplatform | applied-ai | agentic-engineering | agentic-product-architecture | dotnet-backend | distributed-systems | full-stack-frontend | legacy-modernization | testing-quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Platform934 | X | X | X | X | X | X |  |  |  |  |  |
| Platform934 API | X |  |  | X |  | X | X | scoped |  |  | X |
| Stream Optimizer | scoped | scoped |  |  |  |  |  |  |  |  |  |
| Devagon Alley | scoped |  | scoped relationship |  |  |  |  |  |  |  |  |
| Luna Tartas | X | scoped |  |  |  |  |  |  | X |  | X |
| Koso | scoped |  |  |  |  |  |  |  | X |  | X |
| Luna Studio | X |  | X |  |  |  |  |  | scoped |  | X |
| AntoñiOS | X | X |  |  | scoped |  |  |  | X | X | X |
| bio-cli |  |  |  |  |  |  |  |  |  |  |  |

`scoped` means the competency may be presented only with the bounded evidence
in the registry, not as a global project property. / `scoped` exige conservar
el alcance concreto de la evidencia.

## 19. Missing competency candidates

Candidates only; do not modify the professional model in A6.5:

- Workflow automation / n8n.
- Media operations and processing.
- Release engineering / application lifecycle management.
- CLI/tooling and npm package engineering.
- SEO/product web engineering.

## 20. Public CTA matrix

| Project | Live URL | GitHub | Visibility | CTA allowed | Required label | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| AntoñiOS | `https://antoniomdm.dev/` | `https://github.com/xenxi` only as existing general profile, not a project repo | public site | YES | none | Current public site approved |
| Luna Tartas | `https://lunatartas.es/` | repository visibility to revalidate | site public; repo documentation says public | YES | none | Official production URL |
| Koso | `https://koso-cosas-originales.xenxi-85.chatgpt.site/` | NO | temporary beta | YES, cautiously | `Beta / temporary preview` | URL is temporary and not canonical |
| Platform934 TV Web | `https://patata9ytrescuartos.antoniomdm.dev/` | NO | public deployment but operationally unresolved | NO | none | Existing A6 decision: initialization/health must be revalidated |
| Platform934 API | none | NO | private repository | NO | none | Private source/backend |
| Stream Optimizer | none | NO until visibility/content review | unresolved | NO | none | Internal paths/secrets require review |
| Devagon Alley | none | NO | private infrastructure | NO | none | Private distribution service |
| Luna Studio | none | NO | private backoffice | NO | none | Private application |
| bio-cli | npm/repository URL unresolved | NO until verified | unresolved | NO | none | Local repository/package evidence missing |

## 21. Claim matrix

| Claim | Project | Evidence | Classification | Public? | Required qualification |
| --- | --- | --- | --- | --- | --- |
| Platform934 is implemented and active | Platform934 | A6 locks and current source | VERIFIED + HUMAN_CONFIRMED | YES | Preserve Jellyfin boundary |
| Platform934 API is an independent private .NET gateway | Platform934 API | README, architecture docs, source | VERIFIED + HUMAN_CONFIRMED | YES, anonymized | Do not expose repository or endpoints |
| Agent capabilities include search, recommendations, list create/modify, film discussion/explanation | Platform934 API | human-approved A6.0.1 lock | HUMAN_CONFIRMED | YES | Tool calling is bounded and not autonomous |
| MCP is implemented | Platform934 API | README explicitly lists out of scope | DO_NOT_PUBLISH | NO | State that MCP is not implemented |
| Stream Optimizer uses n8n | Stream Optimizer | four workflow exports and Compose | VERIFIED | YES | Explain n8n orchestration role |
| Stream Optimizer is a microservices platform | Stream Optimizer | no sufficient architectural proof | DO_NOT_PUBLISH | NO | Use services/workflows/worker wording |
| Devagon Alley distributes private applications | Devagon Alley | Dart handlers and Luna Studio release contract | VERIFIED + HUMAN_CONFIRMED | YES, anonymized | Not a public marketplace |
| Luna Tartas uses static generation | Luna Tartas | `output: 'static'`, README | VERIFIED | YES | Do not call it SSR |
| Luna Tartas lacks engineering because it has no backend | Luna Tartas | contrary to proportional architecture evidence | DO_NOT_PUBLISH | NO | Explain deliberate static architecture |
| Koso is implemented and in beta | Koso | README, source, tests, temporary deployment | HUMAN_CONFIRMED + VERIFIED | YES | Label URL temporary beta |
| Koso is a Luna clone or sub-brand | Koso | contradicted by brief and independent repo | DO_NOT_PUBLISH | NO | Independent niche storefront |
| Luna Studio manages Luna Tartas | Luna Studio | README, architecture, catalog contract, code | VERIFIED + HUMAN_CONFIRMED | YES | Current single-store scope |
| Luna Studio manages Koso today | Luna Studio | architecture says target only | DO_NOT_PUBLISH | NO | `DESIGNED / PLANNED` only |
| AntoñiOS modernizes the author's legacy portfolio | AntoñiOS | legacy source/history, README, current architecture | HUMAN_CONFIRMED + VERIFIED | YES | Historical Flutter is not current production UI |
| bio-dev-card was published | bio-cli | explicit human confirmation | HUMAN_CONFIRMED | YES, small project | Package URL/version still needs verification |
| bio-cli exact dependencies/build metadata | bio-cli | local source unavailable | NEEDS_VERIFICATION | NO | Recheck repository before CTA |

## 22. Privacy matrix

| Area | Excluded information | Public replacement |
| --- | --- | --- |
| Platform934/Jellyfin | URLs, QuickConnect codes, user IDs, personal media titles/catalogues, credentials | Jellyfin responsibility boundary and anonymized client/product story |
| Platform934 API | Private endpoints, tokens, provider secrets, database strings, logs, private deployment/source | Typed, bounded agent gateway description |
| Stream Optimizer | Internal IPs, NAS paths, private hostnames, workflow credentials, tokens, personal media data | n8n orchestration and FFmpeg worker boundary |
| Devagon Alley | App keys, update tokens, session values, NAS paths, private APKs and deployment details | Private distribution/update service capability |
| Luna Tartas | Analytics credentials, unpublished products, customer/contact data, deployment secrets | Public storefront, structured catalogue and static architecture |
| Koso | Private preview config, unpublished fixtures, hosting internals, customer information | Beta/temporary preview label and current implemented scope |
| Luna Studio | GitHub/Google OAuth values, GA4 credentials, signing keys/keystores, private update config | Flutter backoffice architecture and source-of-truth boundaries |
| AntoñiOS | Unapproved contact data, internal CI values, private infrastructure and source | Existing A6 privacy lock and concise modernization story |
| bio-cli | Private contact values, package credentials and maintainer metadata | Small CLI/package role, pending package verification |

## 23. Unresolved items

- Reinspect `xenxi/bio-cli` or package registry evidence to verify package URL, version, commands, build scripts, dependencies and repository visibility.
- Revalidate public GitHub visibility and safe contents before adding any project repository CTA.
- Revalidate Platform934 TV Web deployment before any direct CTA; the A6 lock currently disallows it.
- Confirm which Stream Optimizer repository portions, if any, are safe to describe publicly after removing secret-like deployment values from the narrative.
- Keep Koso's temporary beta URL clearly non-canonical until a permanent domain is approved.

These are implementation/editorial follow-ups, not permission to infer missing
facts. / Son seguimientos de implementación/editorial, no permiso para inferir
hechos faltantes.

## 24. A6.6 readiness

`READY`

The nine-project registry, bilingual summaries, ecosystem relationships,
current/target boundaries, status taxonomy, claim qualifications, CTA rules and
privacy restrictions are sufficiently locked for A6.6 to implement without
inventing facts. The listed unresolved items only constrain specific CTAs or
bio-cli metadata; they do not block the evidence contract. / El registro de
nueve proyectos, resúmenes bilingües, relaciones, límites actual/objetivo,
estados, claims, CTAs y privacidad están suficientemente bloqueados para que
A6.6 implemente sin inventar hechos. Los pendientes solo limitan CTAs concretos
o metadatos de bio-cli.
