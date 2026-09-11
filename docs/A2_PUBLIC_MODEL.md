# A2 — Public Professional Model + Bilingual Contract

Fecha / Date: **2026-09-11**. Estado / Status: **PARTIAL** hasta validar este árbol exacto en Linux CI / until this exact tree is validated in Linux CI.

## Scope

**ES.** A2 introduce una fuente pública curada y tipada para perfil, experiencia, competencias, logros, proyectos, casos de arquitectura, AI Lab, enlaces, variantes de CV, terminal y salidas derivadas. La UI existente solo recibe adaptaciones mínimas para consumir selectores. No se ha rediseñado el portfolio, avanzado a A3 ni desplegado.

**EN.** A2 introduces a curated, typed public source for profile, experience, competencies, achievements, projects, architecture cases, AI Lab, links, CV variants, terminal and derived outputs. The existing UI receives only minimal adaptations to consume selectors. The portfolio was not redesigned, A3 was not started, and nothing was deployed.

## Decisions incorporated

- **D1 — Stack.** Astro + TypeScript + Preact continúan; Flutter permanece en `legacy/` / Astro + TypeScript + Preact continue; Flutter remains in `legacy/`.
- **D2 — Name.** La UI y metadatos usan exactamente **AntoñiOS** / UI and metadata use exactly **AntoñiOS**.
- **D3 — Routing.** `/es/*` y `/en/*` son canónicas; las rutas sin idioma son documentos estáticos de compatibilidad hacia español / `/es/*` and `/en/*` are canonical; language-less routes are static compatibility documents targeting Spanish.
- **D4 — Evidence/editorial.** Solo se reorganizan hechos confirmados; alternativas y aprendizajes no confirmados permanecen `pending_editorial` / Only confirmed facts are reorganized; unconfirmed alternatives and learnings remain `pending_editorial`.
- **D5 — Availability.** GitHub y web están disponibles; LinkedIn, email y PDF ES/EN están `preparing`, sin enlaces o paths ficticios / GitHub and the website are available; LinkedIn, email and ES/EN PDFs are `preparing`, without fake links or paths.
- **D6 — Arcade.** El registry conserva Arcade como app y su entrada explícita al modo inmersivo / The registry retains Arcade as an app with explicit entry into immersive mode.
- **D7 — Budgets.** Los valores aprobados se tratan como targets, no como resultados históricos / Approved values are treated as targets, not historical results.

## Public model

**ES.** `src/data/professional/model.ts` es el dataset curado. `types.ts` separa `LocalizedText`, facts, claims, estados, relaciones, disponibilidad y estado editorial. El build no lee el vault: la revisión humana/editorial produce este modelo público depurado.

**EN.** `src/data/professional/model.ts` is the curated dataset. `types.ts` separates `LocalizedText`, facts, claims, states, relations, availability and editorial state. The build does not read the vault: human/editorial review produces this sanitized public model.

## Visibility rules

**ES.** Solo `PUBLIC` y `CV_SAFE` son publicables. El validador rechaza `PRIVATE` e `INTERVIEW_ONLY`; los tests usan fixtures sintéticas para demostrarlo. El dataset público tipado tampoco admite esos valores.

**EN.** Only `PUBLIC` and `CV_SAFE` are publishable. Validation rejects `PRIVATE` and `INTERVIEW_ONLY`; tests prove this using synthetic fixtures. The typed public dataset does not admit those values either.

## Status rules

**ES.** `CONFIRMED` es publicable. `IN_PROGRESS` exige presentación explícita y no puede respaldar una capacidad `implemented`. `NEEDS_VERIFICATION` falla la validación. El agente/API nuevo de Platform934 está `IN_PROGRESS` y se muestra como “En desarrollo”.

**EN.** `CONFIRMED` is publishable. `IN_PROGRESS` requires explicit presentation and cannot back an `implemented` capability. `NEEDS_VERIFICATION` fails validation. Platform934's new agent/API is `IN_PROGRESS` and displayed as “In progress”.

## Bilingual contract

**ES.** Todo `LocalizedText` publicado exige `es` y `en` no vacíos. No hay fallback silencioso para contenido profesional. IDs, slugs, relaciones, clasificaciones y estados permanecen estables y no dependen de labels traducidos.

**EN.** Every published `LocalizedText` requires non-empty `es` and `en`. Professional content has no silent fallback. IDs, slugs, relations, classifications and states remain stable and do not depend on translated labels.

## Routing contract

**ES.** Las páginas canónicas se generan bajo `/es/` y `/en/`, incluyendo profile, experience, architecture, projects, Platform934, AI, contact y CV. Cada una tiene canonical propio y alternates `es`, `en` y `x-default` a español. Las rutas sin prefijo generan HTML `noindex,follow` con canonical y refresh hacia `/es/*`; JavaScript preserva query y hash. Esto es un fallback estático, no una afirmación de HTTP 301. `/about/`, `/lab/` y sus variantes localizadas se conservan como aliases hacia `/profile/` y `/ai/`.

**EN.** Canonical pages are generated under `/es/` and `/en/`, including profile, experience, architecture, projects, Platform934, AI, contact and CV. Each has a self-canonical plus `es`, `en` and Spanish `x-default` alternates. Language-less routes generate `noindex,follow` HTML with a canonical and refresh to `/es/*`; JavaScript preserves query and hash. This is a static fallback, not a claim of HTTP 301. `/about/`, `/lab/` and localized variants remain as aliases to `/profile/` and `/ai/`.

## Editorial pending fields

**ES.** Cada sección de caso usa `published` o `pending_editorial`. Una sección pendiente no puede contener texto y los selectores públicos la omiten por completo. Se mantienen pendientes, según el caso, `options`, `learning`, restricciones, trade-offs, implementación o resultado cuando la evidencia no basta.

**EN.** Every case section uses `published` or `pending_editorial`. A pending section cannot contain text and public selectors omit it entirely. Depending on the case, `options`, `learning`, constraints, trade-offs, implementation or result remain pending where evidence is insufficient.

## Privacy validation

**ES.** El build falla ante IDs duplicados, referencias rotas, traducciones ausentes, visibilidad/estado prohibidos, links incompatibles con disponibilidad, assets de CV incompletos, secciones publicadas sin ambos idiomas, contenido dentro de campos pendientes y capacidades implementadas respaldadas solo por claims en progreso. No se conserva provenance privada: únicamente IDs opacos de evidencia.

**EN.** The build fails on duplicate IDs, broken references, missing translations, forbidden visibility/status, links inconsistent with availability, incomplete CV assets, published sections without both languages, content inside pending fields and implemented capabilities backed by in-progress claims. Private provenance is not retained: only opaque evidence IDs are stored.

## Selectors

**ES.** Existen `getProfile`, `getExperience`, `getCompetencies`, `getAchievements`, `getProjects`, `getArchitectureCases`, `getPublicLinks`, `getCvVariants`, `getAiLab`, `getTerminalIndex` y `getPublicClaims`. Perfil, timeline, proyectos, CV, terminal, metadatos y `llms.txt` consumen estos selectores o el adaptador derivado de ellos.

**EN.** `getProfile`, `getExperience`, `getCompetencies`, `getAchievements`, `getProjects`, `getArchitectureCases`, `getPublicLinks`, `getCvVariants`, `getAiLab`, `getTerminalIndex` and `getPublicClaims` are available. Profile, timeline, projects, CV, terminal, metadata and `llms.txt` consume these selectors or the adapter derived from them.

## Data currently included

**ES.** Perfil aprobado; cronología de nueve registros sin ocultar solapamientos; 19 competencias sin porcentajes; dos logros cuantificados; cuatro estructuras de casos; Platform934 como `personal-engineering-lab` con capacidades `implemented`, `in_progress` y `experiment`; dos ámbitos de AI Lab; enlaces y CV con disponibilidad explícita.

**EN.** Approved profile; nine-entry chronology without hiding overlaps; 19 competencies without percentages; two quantified achievements; four case structures; Platform934 as a `personal-engineering-lab` with `implemented`, `in_progress` and `experiment` capabilities; two AI Lab scopes; links and CV with explicit availability.

## Data deliberately excluded

**ES.** No se incluyen documentos completos del vault, notas internas, contactos privados, alternativas históricas no confirmadas, métricas nuevas, causalidad inventada, tecnologías no verificadas, remediación autónoma, URLs falsas ni PDFs inexistentes.

**EN.** Full vault documents, internal notes, private contact details, unconfirmed historical alternatives, new metrics, invented causality, unverified technologies, autonomous remediation, fake URLs and nonexistent PDFs are excluded.

## Tests

**ES.** Los unit tests cubren privacidad, status, locales, IDs, relaciones, disponibilidad, assets, secciones editoriales y selectores. E2E cubre canónicas `/es`/`/en`, fallback español, aliases, cambio de idioma, query/hash, HTML sin JS, salidas de máquina y el boundary diferido de Arcade/audio.

**EN.** Unit tests cover privacy, status, locales, IDs, relations, availability, assets, editorial sections and selectors. E2E covers `/es`/`/en` canonicals, Spanish fallback, aliases, language switching, query/hash, no-JS HTML, machine outputs and the deferred Arcade/audio boundary.

## Performance impact

**ES.** El chunk `Desktop` pasó de 29.026 a 28.754 bytes sin comprimir: −272 bytes. El JavaScript inicial construido suma aproximadamente 24,4 KiB gzip, por debajo del target de 40 KiB. Una estimación conservadora de home (HTML+CSS+JS gzip y wallpaper ya comprimido) es ~84,6 KiB, por debajo de 120 KiB; no sustituye una medición de red/Lighthouse alojada. El modelo y los validadores permanecen en build; el cliente recibe una proyección localizada. Los cuerpos de casos y marcadores editoriales/privados no aparecen en el chunk Desktop y Arcade/audio siguen en carga diferida.

**EN.** The uncompressed `Desktop` chunk changed from 29,026 to 28,754 bytes: −272 bytes. Built initial JavaScript totals approximately 24.4 KiB gzip, below the 40 KiB target. A conservative home estimate (gzipped HTML+CSS+JS plus the already compressed wallpaper) is ~84.6 KiB, below 120 KiB; this is not a substitute for hosted network/Lighthouse measurement. The model and validators remain build-only; the client receives a localized projection. Case bodies and editorial/private markers do not appear in the Desktop chunk, and Arcade/audio remain deferred.

## Known gaps

**ES.** LinkedIn, email y PDFs siguen en preparación; los campos editoriales pendientes necesitan confirmación humana antes de A5; no se ejecutó este árbol exacto en Linux/GitHub Actions porque no se hizo push ni deploy. El fallback estático conserva query/hash mediante JavaScript; el refresh sin JS solo conserva la ruta de destino.

**EN.** LinkedIn, email and PDFs remain in preparation; pending editorial fields need human confirmation before A5; this exact tree was not run in Linux/GitHub Actions because no push or deployment occurred. The static fallback preserves query/hash through JavaScript; the no-JS refresh preserves only the destination path.

## Ready for A3?

**ES.** **NO** hasta que todos los gates locales permanezcan verdes y Linux CI valide el árbol exacto. A2 no debe declararse DONE antes de esa evidencia.

**EN.** **NO** until all local gates remain green and Linux CI validates the exact tree. A2 must not be declared DONE before that evidence exists.
