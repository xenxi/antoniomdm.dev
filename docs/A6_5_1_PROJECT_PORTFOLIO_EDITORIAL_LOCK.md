# A6.5.1 Project Portfolio Human Editorial Lock

Status: `HUMAN_APPROVED_EDITORIAL_LOCK`

## 1. Purpose

This document is the human-approved editorial contract for A6.6. It resolves
the remaining editorial uncertainties from A6.5 without implementing Projects
UI, routes, project cards, the professional model or application behavior.
Este documento es el contrato editorial aprobado por la persona responsable
para A6.6. Resuelve las incertidumbres editoriales restantes de A6.5 sin
implementar UI, rutas, tarjetas, modelo profesional ni comportamiento.

All nine A6.5 projects remain in scope. The summaries below are
implementation-safe editorial guidance, not final marketing copy. / Los nueve
proyectos de A6.5 siguen dentro del alcance. Los resúmenes son guía editorial
segura para implementación, no copy final de marketing.

## 2. Relationship to A6.5

A6.5 remains the historical evidence audit and source of repository findings.
A6.5.1 supersedes only its now-resolved editorial uncertainties: bio-cli
metadata and visibility, Stream Optimizer's public-safe boundary, CTA policy,
Devagon Alley framing, Koso's temporary deployment label, and the explicit
human decision that no A6.6 blocker remains. / A6.5 sigue siendo la auditoría
histórica de evidencia y la fuente de hallazgos de repositorio. A6.5.1 solo
reemplaza sus incertidumbres editoriales ya resueltas.

A6.5.1 does not reopen A6 decisions. Existing Platform934 and Platform934 API
boundaries remain governed by the A6 locks. / A6.5.1 no reabre decisiones de
A6. Las fronteras existentes de Platform934 y Platform934 API siguen regidas
por los locks de A6.

## 3. Approved project registry

| Project | Public name | Status | Ecosystem | Presentation depth | Public visibility | Repository visibility | Live CTA policy | GitHub CTA policy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Platform934 | Platform934 | `IMPLEMENTED / ACTIVE` | Media Engineering | `DEEP_CASE_STUDY` | Public project narrative, anonymized source details | Not a public project-repository CTA in this lock | No new live CTA; preserve A6 decision for TV Web | Do not add mechanically |
| Platform934 API | Platform934 API | `IMPLEMENTED / ACTIVE` | Media Engineering | `STANDARD_PROJECT` | Public anonymized narrative | Private | No endpoint/service CTA | `NO CTA` |
| Stream Optimizer | Stream Optimizer | `IMPLEMENTED / BETA` | Media Engineering | `STANDARD_PROJECT` | Public conceptual and technology-level narrative | `PRIVATE` | No live service CTA | `NO CTA` |
| Devagon Alley | Devagon Alley | `IMPLEMENTED / BETA` | Media Engineering | `STANDARD_PROJECT` | Public conceptual service narrative | Embedded in Platform934/private infrastructure | No service CTA | `NO CTA` |
| Luna Tartas | Luna Tartas | `IMPLEMENTED / BETA` | Commerce / Product Engineering | `STANDARD_PROJECT` | Public product/site narrative | Public repository, verify stable link before CTA | `https://lunatartas.es/` allowed | Only after visibility, stability and content review |
| Koso | Koso | `IMPLEMENTED / BETA` | Commerce / Product Engineering | `STANDARD_PROJECT` | Public beta narrative | Private | Temporary beta URL allowed with required label | `NO CTA` |
| Luna Studio | Luna Studio | `IMPLEMENTED / BETA` | Commerce / Product Engineering | `STANDARD_PROJECT` | Public anonymized backoffice narrative | Private | No app/service CTA | `NO CTA` |
| AntoñiOS | AntoñiOS / `antoniomdm.dev` | `IMPLEMENTED / ACTIVE` | Personal Developer Experience | `RICH STANDARD_PROJECT` preferred | Public project narrative | Public repository may be considered only after normal review | `https://antoniomdm.dev/` allowed | Do not add mechanically |
| bio-cli | bio-cli / bio-dev-card | `IMPLEMENTED` | Personal Developer Experience | `SMALL_PROJECT` | Public small-project narrative | `PUBLIC`, `xenxi/bio-cli` | Package CTA not required for A6.6; may be added only with verified stable URL | May be considered after stable-link/content review |

`BETA` is not production-ready. `DESIGNED` and `PLANNED` are not
implemented. / `BETA` no significa listo para producción. `DESIGNED` y
`PLANNED` no son implementados.

## 4. Approved public narratives

These bilingual summaries are the approved factual contract. A6.6 may adapt
length and presentation, but must preserve the qualifications. / Estos
resúmenes bilingües forman el contrato factual aprobado. A6.6 puede adaptar
su longitud y presentación, pero debe conservar las condiciones.

### Platform934

- **ES:** Plataforma multimedia multicliente y laboratorio personal de ingeniería construido alrededor de Jellyfin, con clientes diferenciados, experiencia TV y orquestación de reproducción.
- **EN:** A multi-client media platform and personal engineering lab built around Jellyfin, with differentiated clients, TV experience and playback orchestration.
- **Editorial boundary:** Keep Jellyfin as the media-server and catalogue authority. Do not duplicate the A6 case study or claim that Platform934 built Jellyfin, its transcoder or codec pipeline.

### Platform934 API

- **ES:** Backend privado independiente y puerta de enlace de agentes sobre Jellyfin. Añade contratos tipados, Semantic Kernel, LiteLLM y herramientas allowlisted con tool calling acotado.
- **EN:** An independent private backend and agent gateway layered over Jellyfin. It adds typed contracts, Semantic Kernel, LiteLLM and allowlisted tools with bounded tool calling.
- **Editorial boundary:** Search, recommendations, list creation/modification, film discussion/explanation and bounded tool calling are approved implemented capabilities. Broader playback/device orchestration is `IN_PROGRESS`. Do not call the agent autonomous or claim MCP.

### Stream Optimizer

- **ES:** Servicios de automatización y procesamiento multimedia utilizados alrededor del ecosistema Platform934. n8n coordina workflows de colecciones, trailers, organización/normalización, revisión y solicitudes asíncronas; un worker especializado realiza procesamiento y transcodificación con FFmpeg.
- **EN:** Automation and media-processing services used around the Platform934 ecosystem. n8n coordinates collection, trailer, organization/normalization, review and asynchronous request workflows; a specialized worker performs FFmpeg processing and transcoding.
- **Editorial boundary:** Present n8n as practical workflow orchestration, not merely as a technology name. Keep the repository private and describe only conceptual architecture, responsibilities and approved technologies.

### Devagon Alley

- **ES:** Servicio privado de distribución y actualización de aplicaciones, con acceso autenticado, catálogo de aplicaciones, descargas, consulta de última versión, control de versiones, changelog e historial de releases.
- **EN:** A private application distribution and update service with authenticated access, an application catalogue, downloads, latest-version lookup, version management, changelog and release history.
- **Editorial boundary:** It can support private applications such as Platform934 TV, Platform934 mobile and Luna Studio. It is not a public marketplace, a Google Play replacement or a commercial app store.

### Luna Tartas

- **ES:** Tienda y catálogo real de nicho para papelería personalizada, regalos y productos relacionados, construido con contenido estructurado, validación en build y generación estática.
- **EN:** A real niche storefront and catalogue for personalized stationery, gifts and related products, built with structured content, build-time validation and static generation.
- **Editorial boundary:** Describe Astro `output: 'static'`, not SSR. The absence of a backend, CMS, database or user accounts is a deliberate proportional architecture decision, not a default engineering gap.

### Koso

- **ES:** Tienda independiente centrada en productos físicos originales y personalizados, con una experiencia de catálogo y descubrimiento donde la fabricación 3D es una capacidad de producción importante, no toda la propuesta de marca.
- **EN:** An independent storefront focused on original and personalized physical products, with catalogue discovery where 3D fabrication is an important production capability, not the whole brand proposition.
- **Editorial boundary:** Koso is not a Luna Tartas clone, theme, sub-brand or current second Luna Studio tenant. The only approved live presentation is a beta/temporary preview, not a canonical domain.

### Luna Studio

- **ES:** Backoffice privado Flutter para gestionar actualmente el catálogo de Luna Tartas, inventario, autenticación, analítica y flujos de publicación/actualización.
- **EN:** A private Flutter backoffice currently managing the Luna Tartas catalogue, inventory, authentication, analytics and publication/update workflows.
- **Editorial boundary:** Current scope is one store: Luna Studio -> Luna Tartas. Multi-store support for Luna Tartas, Koso and future stores is `DESIGNED / PLANNED`, not implemented.

### AntoñiOS

- **ES:** Producto de ingeniería que moderniza el portfolio legacy del autor mediante un escritorio OS ficticio, interacción con ventanas, modelo profesional bilingüe, responsive progressive enhancement, accesibilidad, rendimiento, pruebas y gates de CI.
- **EN:** An engineering product that modernizes the author's legacy portfolio through a fictional desktop OS, window interaction, a bilingual professional model, responsive progressive enhancement, accessibility, performance, testing and CI gates.
- **Editorial boundary:** Prefer a rich standard project presentation to avoid recursive duplication of the whole portfolio. Historical Flutter is the legacy starting point; current production is Astro/Preact/TypeScript.

### bio-cli / bio-dev-card

- **ES:** Pequeña herramienta CLI de Node.js y TypeScript que funciona como tarjeta profesional en la terminal y se distribuye como el paquete npm `bio-dev-card`.
- **EN:** A small Node.js and TypeScript CLI that works as a terminal business card and is distributed as the `bio-dev-card` npm package.
- **Editorial boundary:** Keep it as a small developer-experience project. Do not retain stale release-soon wording and do not invent download, popularity or usage metrics.

## 5. Media ecosystem lock

The approved conceptual current model is:

```text
Platform934 clients
       |
       +--------------------> Jellyfin
       |
       +--> Platform934 API
                |
         Platform934 Agent
                |
         Semantic Kernel
                |
             LiteLLM
                |
           LLM provider(s)
```

Supporting systems:

```text
Stream Optimizer
    -> automation / media processing / enrichment

Devagon Alley
    -> application distribution / update lifecycle
```

This is a conceptual project relationship, not a claim that every client
request follows the same path. Stream Optimizer and Devagon Alley are not in
the normal playback request path unless a specific implementation requires it.
/ Es una relación conceptual; no afirma una ruta única de ejecución.

## 6. Commerce ecosystem lock

### CURRENT

```text
Luna Tartas
    |
structured catalogue
    |
Luna Studio

Koso
    |
independent current storefront/catalogue
```

Luna Studio currently manages Luna Tartas only. Koso is independent. / Luna
Studio gestiona actualmente solo Luna Tartas. Koso es independiente.

### DESIGNED / PLANNED

```text
              Luna Studio
             /           \
     Luna Tartas         Koso
          |                |
      catalogue         catalogue
      analytics         analytics
      assets            assets
```

The second model must be visibly labeled `DESIGNED / PLANNED`. It must never be
rendered as current multi-store management. / El segundo modelo debe llevar
visiblemente `DESIGNED / PLANNED` y nunca mostrarse como gestión multi-tienda
actual.

## 7. Personal DX ecosystem lock

AntoñiOS and bio-cli / bio-dev-card form a conceptual developer-experience
ecosystem. bio-cli may later integrate naturally with an AntoñiOS Terminal, but
no runtime dependency is approved by this lock. / AntoñiOS y bio-cli / bio-dev-
card forman un ecosistema conceptual de experiencia de desarrollo. Puede existir
una integración futura, pero no se aprueba una dependencia runtime.

## 8. Capability/status boundaries

- **IMPLEMENTED:** The capability has repository or approved human evidence and may be described as current implementation within its scope.
- **ACTIVE:** The project is current and active; it does not mean every capability is complete or production-ready.
- **BETA:** The project has an implementation and may be presented, but must not be described as production-ready or complete.
- **IN_PROGRESS:** The direction or capability is being implemented; present the bounded existing slice and remaining work.
- **DESIGNED:** Architecture or behavior has been intentionally designed; do not render it as runtime capability.
- **PLANNED:** Future scope or roadmap; do not render it as current implementation.
- **HISTORICAL:** Relevant prior implementation or migration context; do not represent it as current production unless separately evidenced.

Specific locked boundaries:

| Project | Current implemented scope | Must remain non-current |
| --- | --- | --- |
| Platform934 | Multiclient media product and TV/client capabilities from A6 | Autonomous agent, universal parity, Jellyfin server/transcoder ownership |
| Platform934 API | Approved conversational capabilities and bounded tools | Autonomous agent, MCP, complete broader device orchestration |
| Stream Optimizer | n8n workflows plus specialized media-processing worker | Microservices-platform claim, metrics, SLA, private operations |
| Devagon Alley | Private application catalogue, manifests, downloads and update lifecycle | Public marketplace, Google Play replacement, commercial app store |
| Luna Tartas | Static generated structured-content storefront | SSR, full backend commerce, unverified business metrics |
| Koso | Independent beta storefront and current catalogue/product implementation | Permanent domain, production completeness, Luna Studio management |
| Luna Studio | Single-store Luna Tartas backoffice | Current Koso or N-store management |
| AntoñiOS | Current modernized portfolio product | Recursive duplication, historical Flutter as current UI |
| bio-cli | Published small CLI package role | Download/popularity metrics and unverified live registry facts |

## 9. Technology evidence lock

Only the following technology references are approved for A6.6 project
presentation:

| Project | Approved technologies |
| --- | --- |
| Platform934 | Flutter, Dart, Preact, TypeScript where scoped, Kotlin, Compose TV where evidenced, Media3, Jellyfin |
| Platform934 API | .NET, Semantic Kernel, LiteLLM, official Jellyfin API, typed contracts, Docker; PostgreSQL/EF Core and SignalR only with scoped wording |
| Stream Optimizer | n8n, FFmpeg, Python, Docker, Docker Compose, yt-dlp, Jellyfin integration, TMDB integration |
| Devagon Alley | Dart, Docker, Nginx, Caddy, HTTP/JSON, filesystem-backed application store |
| Luna Tartas | Astro, TypeScript, structured YAML/content collections, schemas/Zod where evidenced, static generation, SEO, analytics, GitHub Actions, GitHub Pages |
| Koso | Astro, TypeScript, Zod, JSON Content Collections, static generation, Playwright, Vitest, GitHub Actions |
| Luna Studio | Flutter, Dart, Android, Windows, GitHub APIs, local/cache storage, GA4 Data API contracts, release/update mechanisms |
| AntoñiOS | Astro, Preact, TypeScript, Playwright, Vitest, performance budgets, CI quality gates, historical Flutter |
| bio-cli | Node.js, TypeScript, ESM, CLI/npm package tooling, `boxen`, `inquirer`, `open` |

Technology names do not independently establish a competency, architecture
claim or production guarantee. / Los nombres de tecnologías no establecen por
sí solos una competencia, arquitectura ni garantía de producción.

## 10. n8n editorial lock

Stream Optimizer must expose practical n8n experience in A6.6. n8n is the
workflow-orchestration layer, coordinating:

- collection workflows;
- trailer acquisition and download workflows;
- media organization and normalization flows;
- review and logging flows;
- asynchronous media-processing requests.

Specialized processing remains in workers where appropriate. The FFmpeg worker
performs media inspection, transcoding and related job processing. n8n is not
to be described as the transcoder, and Stream Optimizer is not to be described
as a microservices platform. / El procesamiento especializado permanece en
workers. n8n no es el transcoder y Stream Optimizer no es una plataforma de
microservicios.

The repository is `PRIVATE`. Publish conceptual architecture, responsibilities
and approved technologies only. Never publish the private repository URL,
source code, internal paths, hosts, credentials, private Docker/environment
values or operational topology beyond safe conceptual diagrams. / El
repositorio es `PRIVATE`; solo se publican arquitectura conceptual,
responsabilidades y tecnologías aprobadas.

## 11. Multi-store editorial lock

Current implementation:

```text
Luna Studio -> Luna Tartas
```

Target direction:

```text
Luna Studio -> Luna Tartas
             -> Koso
             -> future stores
```

The target is explicitly `DESIGNED / PLANNED`. It is not implemented. Do not
claim that Luna Studio currently manages multiple stores or Koso. The approved
lesson is: solve one real store first, keep boundaries clean, then generalize
when a second concrete use case justifies the abstraction. / La dirección
objetivo es explícitamente `DESIGNED / PLANNED`, no implementada.

## 12. bio-cli resolution

The A6.5 uncertainty is resolved by remote repository evidence and human
publication confirmation:

- **Repository:** `xenxi/bio-cli`
- **Repository visibility:** `PUBLIC`
- **Package:** `bio-dev-card`
- **Repository package.json version:** `2.0.2`
- **Technology metadata:** Node.js, TypeScript, ESM, CLI and npm package tooling; `boxen`, `inquirer` and `open`
- **Repository/package metadata classification:** `VERIFIED FROM REMOTE REPOSITORY`
- **Publication classification:** `HUMAN_CONFIRMED`
- **Project status:** `IMPLEMENTED`
- **Presentation depth:** `SMALL_PROJECT`

The repository package version is not a claim about the current npm registry
latest version. Current npm download counts, popularity, usage metrics and
registry state are not required for A6.6 and must not be invented. The stale
README phrase “will be released soon” must not be used as current status. /
La versión del package.json no afirma la versión latest actual del registro
npm. No se necesitan métricas de descargas, popularidad ni uso.

## 13. CTA policy

Live-product CTA and GitHub CTA are separate decisions.

Approved live CTAs:

| Project | URL | Label | Decision |
| --- | --- | --- | --- |
| AntoñiOS | `https://antoniomdm.dev/` | none | `ALLOWED` |
| Luna Tartas | `https://lunatartas.es/` | none | `ALLOWED` |
| Koso | `https://koso-cosas-originales.xenxi-85.chatgpt.site/` | `Beta / temporary preview` | `ALLOWED` |
| Platform934 TV Web | existing A6 URL | none | `NO CTA` until separately revalidated; not an A6.6 blocker |

GitHub rules:

- Private repositories receive no GitHub CTA.
- Public repositories may receive a GitHub CTA only after confirming public visibility, stable URL, editorial value and appropriate repository contents.
- A6.6 must not mechanically link every project to GitHub.
- Stream Optimizer receives no GitHub CTA because it is private.
- Platform934 API, Devagon Alley and Luna Studio receive no GitHub CTA because their source is private or infrastructure-bound.
- bio-cli is public, but a GitHub/package CTA is optional and requires a stable-link/content review; it is not required for A6.6.

## 14. Privacy policy

The following must never reach the portfolio:

- API keys, OAuth secrets, update tokens, app keys, passwords and signing material.
- Private repository URLs, private source code, private deployment endpoints and provider credentials.
- Internal IPs, NAS paths, private hostnames, QuickConnect codes and infrastructure topology beyond safe conceptual diagrams.
- Jellyfin server URLs, usernames, user IDs, personal media titles/catalogues and private media data.
- Environment values, database connection strings, logs, private Docker values and operational credentials.
- Customer/contact data, unpublished product data, private analytics configuration and package maintainer metadata not approved for publication.

An `.env.example` or configuration contract can evidence that a capability
exists, but never authorizes publishing actual values. / Un `.env.example` o
contrato de configuración puede demostrar que existe una capacidad, pero nunca
autoriza publicar valores reales.

## 15. Competency candidates

Candidates only; A6.5.1 does not add or modify competencies:

- workflow automation / n8n;
- media operations / media processing;
- release engineering / application lifecycle;
- CLI/tooling / npm package engineering;
- SEO / product web engineering.

A6.6 must first reuse existing competency semantics. A new competency is
justified only by multiple meaningful evidence items, improved positioning,
non-duplication, honest ES/EN representation and updated validation. Do not
create one merely to match a technology.

## 16. A6.6 implementation invariants

- Implement exactly these nine projects and no additional primary projects.
- Preserve the three approved ecosystems and do not flatten them into unrelated cards.
- Preserve all locked statuses, including `BETA`, `ACTIVE`, `IN_PROGRESS`, `DESIGNED` and `PLANNED` boundaries.
- Provide equivalent Spanish and English project summaries for every user-visible claim.
- Keep Platform934 and Platform934 API related but independently modeled.
- Keep Stream Optimizer independently visible and show practical n8n orchestration.
- Keep Devagon Alley independently visible even though its source lives inside Platform934.
- Keep Luna Tartas and Koso as independent stores.
- Show Luna Studio as a current Luna Tartas backoffice only.
- Label the multi-store architecture `DESIGNED / PLANNED` wherever shown.
- Present Koso's URL only as `Beta / temporary preview`; never as canonical.
- Do not add a Platform934 TV Web CTA.
- Do not expose private repository links, endpoints, credentials or infrastructure details.
- Do not invent metrics, popularity, sales, downloads, traffic, throughput, uptime or cost claims.
- Keep bio-cli as a `SMALL_PROJECT` and do not require a local checkout.
- Do not duplicate the entire AntoñiOS site inside its own project narrative.
- Do not modify the professional model as part of A6.6 unless a separate approved scope requires it.

## 17. Remaining blockers

`NONE`

The previously unresolved editorial items are resolved. Platform934 TV Web
health revalidation remains outside this milestone and means `NO CTA`, not an
A6.6 blocker. / Los elementos editoriales pendientes han sido resueltos. La
revalidación de Platform934 TV Web queda fuera de este hito y significa `NO CTA`,
no bloqueo de A6.6.

## 18. Ready for A6.6

`YES`

The human editorial lock is complete. A6.6 may implement the project model
using this document together with the historical A6.5 evidence lock and the
authoritative A6 locks, without inventing facts or reopening resolved editorial
decisions. / El lock editorial humano está completo. A6.6 puede implementar el
modelo de proyectos usando este documento, A6.5 y los locks autoritativos de A6,
sin inventar hechos ni reabrir decisiones resueltas.
