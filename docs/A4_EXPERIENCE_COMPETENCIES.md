# A4 — Experience + Competencies + Achievements

## Scope / Alcance
**ES:** A4 presenta el modelo público A2 mediante Experience, Competencies, Achievements, Education y Languages. No se añadieron claims profesionales ni fechas nuevas.

**EN:** A4 presents the A2 public model through Experience, Competencies, Achievements, Education and Languages. No professional claims or new dates were added.

## E2E coverage
**ES:** `tests/e2e/a4.spec.ts` cubre rutas ES/EN directas, las nueve experiencias derivadas del modelo, cronología y solapamientos, `details/summary` con ratón y teclado, 19 competencias, clasificación y recencia separadas, ausencia de ratings, el anchor `software-architecture`, métricas, alcance de eventos, educación, idiomas, relaciones, Back/Forward, Axe, responsive, no-JS y capturas. Se actualizó el selector obsoleto de `tests/e2e/i18n.spec.ts` para el markup `details` actual.

**EN:** `tests/e2e/a4.spec.ts` covers direct ES/EN routes, all nine model-derived experiences, chronology and overlaps, mouse and keyboard `details/summary` interaction, 19 competencies, separate classification and recency, absence of ratings, the `software-architecture` anchor, metrics, event scope, education, languages, relations, Back/Forward, Axe, responsive behavior, no-JS and screenshots. The obsolete selector in `tests/e2e/i18n.spec.ts` was updated for the current `details` markup.

## Experience / Experiencia
**ES:** Las nueve experiencias conservan el orden y fechas exactos del modelo A2, incluidos los solapamientos. `details/summary` sigue siendo nativo, usable con teclado, touch y no-JS. Domingo Alonso aparece abierto inicialmente y conserva su rol exacto: «Desarrollador sénior .NET / Arquitecto de software».

**EN:** The nine experiences retain the exact A2 order and dates, including overlaps. Native `details/summary` remains usable with keyboard, touch and no-JS. Domingo Alonso opens initially and keeps its exact role: “Senior .NET Developer / Software Architect”.

## Competencies / Competencias
**ES:** Las 19 competencias muestran clasificación y recencia como ejes separados, además de skills, anchors y relaciones existentes. No se usan progressbars, meters, estrellas, porcentajes ni scores.

**EN:** All 19 competencies show classification and recency as separate axes, together with skills, anchors and existing relations. No progressbars, meters, stars, percentages or scores are used.

## Achievements / Logros
**ES:** Los dos logros A2 muestran scope, relaciones y métricas legibles. La suite comunica `~60 minutos → ~2 minutos` como aproximado. La reducción de llamadas conserva el alcance «por evento relevante en las integraciones afectadas». No se añadió `30x` como métrica primaria.

**EN:** The two A2 achievements show scope, relations and readable metrics. The suite communicates `~60 minutes → ~2 minutes` as approximate. The call reduction retains the scope “per relevant event in affected integrations”. No `30x` primary metric was added.

## Education / Formación
**ES:** Se conserva el texto A2: estudios cursados salvo el proyecto final; título no obtenido.

**EN:** The A2 wording is preserved: coursework completed except the final project; degree not awarded.

## Languages / Idiomas
**ES:** Se conserva español nativo e inglés con lectura/comprensión técnica avanzadas y conversación profesional en desarrollo. No se añaden niveles CEFR.

**EN:** Native Spanish and English with advanced technical reading/comprehension and developing professional conversation are preserved. No CEFR levels are added.

## Cross-links / Relaciones
**ES:** Los links de Experience a Competency, Competency a Experience/Project, Achievement a Experience/Architecture y sus destinos existentes conservan locale, hashes válidos y navegación Back/Forward. No se implementaron casos A5: las relaciones de arquitectura llegan al índice existente de Architecture, sin campos inventados.

**EN:** Experience-to-Competency, Competency-to-Experience/Project and Achievement-to-Experience/Architecture links preserve locale, valid hashes and Back/Forward navigation. A5 case studies were not implemented: architecture relations reach the existing Architecture index without invented fields.

## Accessibility QA
**ES:** Axe pasó sin violaciones en Experience, Competencies y Achievements. La interacción de teclado de `summary`, enlaces, foco visible y métricas como texto se verificó mediante Playwright. Screen reader manual QA: **NOT PERFORMED**.

**EN:** Axe passed with zero violations on Experience, Competencies and Achievements. Keyboard interaction for `summary`, links, visible focus and metrics as text was verified with Playwright. Screen reader manual QA: **NOT PERFORMED**.

## Visual QA / QA visual
**ES:** Se capturaron `1440x1000` y `390x844`; también se verificaron `820x1180` y `320x740` sin overflow horizontal. Las capturas están en `docs/quality/a4/screenshots/a4/`: `01-experience-es-collapsed.png`, `02-experience-es-domingo-expanded.png`, `03-competencies-es.png`, `04-achievements-es.png`, `05-experience-en.png`, `06-experience-mobile-es.png` y `07-competencies-mobile-es.png`. No se detectó clipping en assertions de layout. La inspección visual humana de píxeles no pudo realizarse en esta interfaz porque el visor de imágenes no está disponible.

**EN:** `1440x1000` and `390x844` were captured; `820x1180` and `320x740` were also checked without horizontal overflow. Screenshots are in `docs/quality/a4/screenshots/a4/`: `01-experience-es-collapsed.png`, `02-experience-es-domingo-expanded.png`, `03-competencies-es.png`, `04-achievements-es.png`, `05-experience-en.png`, `06-experience-mobile-es.png` and `07-competencies-mobile-es.png`. No clipping was detected by layout assertions. Human pixel-level visual inspection could not be performed in this interface because an image viewer is unavailable.

## No-JS QA
**ES:** Experience, Competencies, Achievements, Education y Languages se verificaron en ES y EN con JavaScript deshabilitado; el HTML profesional principal permanece visible.

**EN:** Experience, Competencies, Achievements, Education and Languages were verified in ES and EN with JavaScript disabled; the main professional HTML remains visible.

## Performance after A4 / Rendimiento tras A4
**ES:** `npm run build` genera 64 páginas. JS inicial: `23.1 KiB gzip`; home: `43.2 KiB` de assets gzip estimados; Arcade/audio inicial: `0` requests. Lighthouse local de producción: `100/100/100/100`, LCP `1206 ms`, CLS `0`, transferencia `45.6 KiB`.

**EN:** `npm run build` generates 64 pages. Initial JS: `23.1 KiB gzip`; home: `43.2 KiB` estimated gzipped assets; initial Arcade/audio: `0` requests. Local production Lighthouse: `100/100/100/100`, LCP `1206 ms`, CLS `0`, transfer `45.6 KiB`.

## Local gates / Gates locales
**ES:** `npm ci` PASS, `npm run lint` PASS, `npm run typecheck` PASS, `npm test` PASS con 31 tests, `npm run build` PASS, `npm run test:e2e` PASS con 45 escenarios, `git diff --check` PASS.

**EN:** `npm ci` PASS, `npm run lint` PASS, `npm run typecheck` PASS, `npm test` PASS with 31 tests, `npm run build` PASS, `npm run test:e2e` PASS with 45 scenarios, `git diff --check` PASS.

## Linux CI
**ES:** Run `34615695541`, SHA `3092458fc49ec551328c2fdba855b1e5007899bb`, runner `ubuntu-latest`, Node `24`: PASS. `npm ci`, lint, typecheck, unit, build y E2E pasaron. Deploy: SKIPPED / NOT RUN.

**EN:** Run `34615695541`, SHA `3092458fc49ec551328c2fdba855b1e5007899bb`, runner `ubuntu-latest`, Node `24`: PASS. `npm ci`, lint, typecheck, unit, build and E2E passed. Deploy: SKIPPED / NOT RUN.

## Content review / Revisión de contenido
**ES:** Todo el contenido profesional visible sigue derivándose de `src/data/professional/model.ts`. No se cambiaron claims, roles, métricas, educación ni idiomas. Los fixes de producto solo corrigieron destinos de links y accesibilidad del markup.

**EN:** All visible professional content remains derived from `src/data/professional/model.ts`. Claims, roles, metrics, education and languages were not changed. Product fixes only corrected link destinations and markup accessibility.

## Remaining limitations / Limitaciones restantes
**ES:** La revisión manual con lector de pantalla no se realizó. A5 continúa sin iniciar y no hay deploy.

**EN:** Manual screen-reader review was not performed. A5 remains unstarted and there was no deploy.

## Ready for A5?
**NO**. A5 no debe iniciarse dentro de este cierre.

**NO**. A5 must not start as part of this closure.
