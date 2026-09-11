# AntoñiOS Aura Pixel — PASS

## Alcance / Scope

ES: Implementación sobre Astro/Preact, en `codex/antonios-aura-pixel`. La base solicitada `codex/a3-linux-verification-20260911` (ae73033) es antecesora de la base local (041804e); se conservaron sus tres commits posteriores de A4. No se modificaron `legacy/`, el modelo profesional, los CV, las dependencias ni el documento previo del usuario `A5_0_EDITORIAL_EVIDENCE_LOCK.md`. Cambios locales, sin publicación.

EN: Implemented on Astro/Preact in `codex/antonios-aura-pixel`. Requested base `codex/a3-linux-verification-20260911` (ae73033) is an ancestor of the local base (041804e); its three subsequent A4 commits were preserved. `legacy/`, the professional model, CVs, dependencies and the user's existing `A5_0_EDITORIAL_EVIDENCE_LOCK.md` were not changed. Local changes, not deployed.

## Auditoría / Audit

| Área / Area | Implementación existente / Existing implementation |
| --- | --- |
| Shell, top bar, desktop, dock | `src/components/Desktop.tsx` |
| Ventana / Window | `src/components/Window.tsx` |
| Estado y geometría / State and geometry | `src/os/window-manager.ts` |
| Registro / Registry | `src/os/registry.ts` |
| Perfil y experiencia / Profile and experience | `src/components/Profile.tsx` |
| Proyectos y terminal / Projects and terminal | `src/components/AppContent.tsx` |
| Contenido público / Public content | `src/data/professional/`, projected through `src/data/ui.ts` |
| Idiomas / Languages | `src/i18n/core.ts`, `src/i18n/es.ts`, `src/pages/[...path].astro` |
| Estilos / Styles | Existing `global.css`; new `aura.css` layer |
| Pruebas / Tests | Vitest and Playwright; existing A3/A4 suites retained |

## Comparación con el mockup / Mockup comparison

| Criterio / Criterion | Resultado revisado / Reviewed result |
| --- | --- |
| Composición / Composition | Perfil principal; Terminal y Proyectos independientes a partir de 1280 px. / Main Profile; independent Terminal and Projects from 1280 px. |
| Jerarquía / Hierarchy | Nombre retro, rol dorado, resumen, acciones y enlaces profesionales. / Retro name, gold role, summary, actions and professional links. |
| Profundidad / Depth | Gradientes discretos, puntos y silueta urbana abstracta; sin habitación ilustrada. / Subtle gradients, dots and abstract skyline; no illustrated room. |
| Perfil / Profile | Datos del modelo público existente; panel SYSTEM.SYS sólo con experiencia confirmada y tecnología. / Existing public model; SYSTEM.SYS only shows confirmed experience and technology. |
| Avatar | SVG propio con pelo oscuro, gafas, camisa, corbata, portátil y taza. / Original SVG with dark hair, glasses, shirt, tie, laptop and mug. |
| Retro | Dos guiños decorativos traducidos, un pequeño invasor y comando `reboot` opcional. / Two translated decorative references, a small invader and optional `reboot` command. |
| Dock | Flotante; activo, abierto y minimizado derivados del estado real. / Floating; active, open and minimized states come from the real manager. |
| Ventanas / Windows | Borde activo violeta/cian, sombra moderada y controles con colores de hover. / Purple/cyan active border, restrained shadow and colored hover controls. |
| Aura | Paleta y alias semánticos para fondos, texto, bordes, acentos, sombras y glow. / Palette and semantic aliases for backgrounds, text, borders, accents, shadows and glow. |
| Terminal | App interactiva conservada; `whoami` inicial y salida real del perfil; `theme` y `arcade` ahora ejecutan las rutas anunciadas. / Interactive app retained; initial `whoami` and actual profile output; `theme` and `arcade` now execute their advertised routes. |
| Proyectos / Projects | Lista compacta, miniatura SVG ilustrativa propia, tecnologías, filtros y destacado. Sólo Platform 9¾ está publicado en el dataset. / Compact list, original illustrative SVG thumbnail, technologies, filters and featured indicator. Only Platform 9¾ is published in the dataset. |
| Responsive | Cinco anchuras en ambos idiomas; tablet y móvil priorizan una ventana, con contenido desplazable y decoración reducida. / Five widths in both languages; tablet and mobile prioritize one window, with scrollable content and reduced decoration. |

ES: Las diferencias frente al ejemplo son deliberadas: se conserva Antonio Manuel Díaz Moreno y su rol validado, no se añaden proyectos, ubicación o modalidad sin evidencia, ni menús o papelera sin funcionalidad. La miniatura ilustra una app multimedia; no se presenta como captura real del proyecto. El avatar es una identidad geométrica propia, no un retrato de una persona o personaje.

EN: Differences from the example are intentional: Antonio Manuel Díaz Moreno and his validated role are retained; no unsupported projects, location, work arrangement, inert menus or bin are introduced. The thumbnail illustrates a media app; it is not presented as an actual project screenshot. The avatar is an original geometric identity, not a portrait of a person or character.

## Navegación e idiomas / Navigation and languages

ES: Se corrigió la discrepancia anterior con AGENTS.md: las rutas canónicas españolas no llevan prefijo; inglés permanece bajo `/en/`. `/es/` conserva documentos de compatibilidad que mantienen query y hash al redirigir. Canonical, hreflang, navegación, feeds, sitemap y enlaces de CV usan el mismo localizador. El texto nuevo de interfaz, avatar, estados de red/audio y terminal tiene ES/EN. No se ha reescrito contenido profesional.

EN: The previous mismatch with AGENTS.md was corrected: canonical Spanish routes have no prefix; English remains under `/en/`. `/es/` keeps compatibility documents that preserve query and hash when redirecting. Canonical, hreflang, navigation, feeds, sitemap and CV links use the same localizer. New interface, avatar, network/audio state and terminal text has ES/EN versions. Professional content was not rewritten.

## Validación / Validation

| Comprobación / Check | Resultado / Result |
| --- | --- |
| Baseline `npm run check` | PASS: lint, types, 31 unit tests, build |
| Final `npm run check` | PASS: lint, types without diagnostics, 31 unit tests, static build |
| Final `npm run test:e2e -- --workers=4` | PASS: 57/57, Chromium on Windows; `ANTONIOS_E2E_PORT=4323` |
| Static build | 64 pages, including Spanish compatibility documents |
| Window manager | Open, close, minimize, maximize, exact restore, drag, resize, focus, z-order, reopen, responsive transitions |
| Keyboard and accessibility | Axe WCAG 2 A/AA and 2.1 AA checks; cyan focus, real buttons/links, reduced motion, 200%/400% reflow |
| ES/EN | Static HTML without JS, deep links, Back/Forward, query/hash, metadata, feeds and text CVs |
| Arcade | Launch/exit, deferred engine/assets, audio only after explicit interaction |
| Touch | PASS: single taps open apps, minimize/restore and enter/exit Arcade at 390 px |
| Aura-specific | 1440, 1280, 1024, 768, 390 px × ES/EN; avatar accessible name, independent windows, stack navigation, real network/audio state |

ES: El puerto configurable permite ejecutar las pruebas contra el build sin interferir con el servidor de desarrollo existente en 4321. Las capturas A4 ahora se escriben en `test-results/a4` para no sobrescribir evidencia histórica versionada.

EN: The configurable port lets tests use the build without interfering with the existing development server on 4321. A4 screenshots now go to `test-results/a4` to avoid overwriting versioned historical evidence.

## Capturas / Screenshots

| Anchura / Width | Español | English |
| --- | --- | --- |
| 1440 | [ES](quality/aura-pixel/es-1440.png) | [EN](quality/aura-pixel/en-1440.png) |
| 1280 | [ES](quality/aura-pixel/es-1280.png) | [EN](quality/aura-pixel/en-1280.png) |
| 1024 | [ES](quality/aura-pixel/es-1024.png) | [EN](quality/aura-pixel/en-1024.png) |
| 768 | [ES](quality/aura-pixel/es-768.png) | [EN](quality/aura-pixel/en-768.png) |
| 390 | [ES](quality/aura-pixel/es-390.png) | [EN](quality/aura-pixel/en-390.png) |

## Archivos modificados o añadidos / Changed or added files

- `public/favicon.svg`
- `src/styles/aura.css`
- `src/components/Desktop.tsx`, `Profile.tsx`, `AppContent.tsx`, `Icon.tsx`, `PixelAvatar.tsx`, `ProjectThumbnail.tsx`
- `src/data/ui.ts`, `src/data/routes.ts`
- `src/i18n/core.ts`, `src/i18n/es.ts`
- `src/layouts/Shell.astro`
- `src/pages/[...path].astro`, `src/pages/404.astro`, `src/pages/blog.astro`, `src/pages/es/blog.astro`
- `playwright.config.ts`, `scripts/e2e-preview.mjs`
- `tests/i18n.test.ts`, `tests/e2e/a3.spec.ts`, `tests/e2e/a4.spec.ts`, `tests/e2e/desktop.spec.ts`, `tests/e2e/i18n.spec.ts`, `tests/e2e/aura.spec.ts`
- This report / Este informe; `docs/quality/aura-pixel/*.png`

## Pendientes y límites / Pending items and limits

ES: Sin pendientes del rediseño. LinkedIn y PDF siguen en preparación según el estado previo; no se inventaron destinos. Verificado con Chromium, emulación de viewport y prueba explícita de pulsaciones táctiles; no se realizó validación manual en dispositivos físicos ni en Safari/Firefox. No se añadieron dependencias, fuentes remotas, vídeo, WebGL ni bucles de canvas. El contenido largo sigue desplazándose dentro de las ventanas.

EN: No remaining redesign tasks. LinkedIn and PDF remain in preparation according to their previous state; no destinations were invented. Verified with Chromium, viewport emulation and an explicit touch tap test; no manual validation on physical devices or Safari/Firefox. No dependencies, remote fonts, video, WebGL or canvas loops were added. Long content remains scrollable inside windows.

## Ajuste de marca [A] / [A] brand refinement

ES: Favicon, cabecera, dock y portátil del avatar comparten el mismo SVG `[A]` con corchetes cian y letra violeta. Verificación: lint, tipos, 31 pruebas unitarias, build y 12 pruebas E2E de composición ES/EN, navegación y touch aprobadas.

EN: Favicon, header, dock and avatar laptop share the same `[A]` SVG with cyan brackets and a purple letter. Validation: lint, types, 31 unit tests, build and 12 E2E tests for ES/EN composition, navigation and touch passed.
