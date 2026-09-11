# A3 — Identity, Profile and immediate professional access

Fecha / Date: **2026-09-11**. Estado / Status: **PARTIAL — Linux CI pending**.

## Scope

**ES.** A3 presenta el modelo público A2 mediante AntoñiOS, con Profile como app inicial y acceso directo a trayectoria, proyectos, arquitectura, CV y contacto. No incorpora contenido profesional nuevo, no despliega y no inicia A4. La referencia A2 es `c674bc38418d441524af9d23c577cdb8b88d270d`, validada en [Linux CI](https://github.com/xenxi/antoniomdm.dev/actions/runs/34566881050). Los estados PARTIAL de los documentos A1/A2 locales preceden a esa ejecución.

**EN.** A3 presents the A2 public model through AntoñiOS, with Profile as the initial app and direct access to experience, projects, architecture, CV and contact. It adds no professional claims, does not deploy and does not start A4. A2 reference `c674bc38418d441524af9d23c577cdb8b88d270d` passed the linked Linux CI run; local A1/A2 PARTIAL statements predate that run.

## Visual direction

**ES.** Grafito `#141718`, ventanas opacas `#1b1f21`, texto claro `#f1f0e9`, ámbar `#e9b56a` para acciones y cyan `#79d4d8` para foco/estado. Iconos SVG propios, tipografías del sistema, superficies sin blur y movimiento funcional de 160 ms. Se retira la petición del wallpaper raster del inicio; permanece disponible el asset existente, sin alterarlo.

**EN.** Graphite background, opaque dark windows, off-white text, amber actions and cyan focus/status. Owned SVG icons, system fonts, no blur and functional 160 ms motion. Boot no longer requests the raster wallpaper; the existing asset remains untouched.

## AntoñiOS identity

**ES.** Nombre visible exacto AntoñiOS, marca tipográfica `[ñ]` y favicon propio en los mismos colores. La identidad no imita una titlebar comercial ni usa semáforos. Microcopy breve y funcional: sistema listo, perfil cargado y disponibilidad explícita. Se mantiene el identificador histórico `about` para Profile y los valores de preferencias para no romper compatibilidad; las nuevas clases usan `antonios`.

**EN.** Exact visible name AntoñiOS, a `[ñ]` wordmark and matching owned favicon. No commercial titlebar imitation or traffic lights. Short functional copy covers system readiness, loaded profile and explicit availability. The historical `about` Profile ID and stored preference values remain compatible; new identity classes use `antonios`.

## Profile architecture

**ES.** `Profile.tsx` compone siete documentos del mismo singleton: Overview, Experience, Competencies, Achievements, Education, Languages y CV. `profile-sections.ts` centraliza sus nombres/rutas y la sección activa. `ui.ts` proyecta los selectores A2 a datos localizados mínimos; el modelo y su validador permanecen fuera del bundle cliente.

**EN.** Profile composes seven documents in one singleton: Overview, Experience, Competencies, Achievements, Education, Languages and CV. The section registry owns names, routes and active selection. UI data is a localized projection of A2 selectors; the model and validator stay outside the client bundle.

**ES.** Overview muestra el nombre completo, titular y focus line exactos de A2. Su intro es la primera frase del resumen aprobado; el CV conserva el resumen completo. «Más allá del cargo» utiliza `humanNote` sin inventar opiniones o hobbies. No cambia `src/data/professional/model.ts` (blob Git `510866f5a62f96b7af64ccdde89de5597ad196b9`).

**EN.** Overview shows A2's full name, headline and focus line. Its introduction is the first sentence of the approved summary; the CV retains the full summary. Beyond the role uses the approved humanNote without invented opinions or hobbies. The professional model remains byte-equivalent under Git normalization, with the blob hash above.

**ES.** El CV ampliado se puede leer, imprimir y descargar como texto. Los PDFs español e inglés y LinkedIn/email siguen en preparación según A2; no tienen href ficticio ni botones de descarga habilitados. El launcher y Contact consumen la misma disponibilidad. No se ha generado ni presentado un PDF como final.

**EN.** Extended CV supports reading, printing and text download. Spanish/English PDFs and LinkedIn/email remain preparing according to A2, without fake hrefs or enabled download buttons. Launcher and Contact consume the same availability. No final PDF was generated or implied.

## Desktop behavior

**ES.** A partir de 1100 px, ventanas libres con drag, resize, Z-order, cierre, minimizar/restaurar y maximizar/restaurar geometría. El reducer `window-manager.ts` no cambia (blob `860404884d2fd285ef708fff527d22cb8c00ef33`). Profile abre hasta 960×660, dejando espacio a los ocho accesos del escritorio. En 1100×800, 1280×800, 1440×1000 y 1920×1080 las cinco acciones profesionales quedan dentro del área visible sin scroll.

**EN.** From 1100 px, free windows retain drag, resize, Z-order, close, minimize/restore and exact maximized geometry restoration. The existing reducer is unchanged, with the blob above. Profile opens up to 960×660, leaving space for eight desktop shortcuts. All five professional actions fit the visible content area at the four tested desktop widths, without scrolling.

**ES.** El launcher abre las nueve apps del registro, ofrece búsqueda y accesos CV/GitHub/LinkedIn. La barra conserva tareas abiertas, activa/minimizada, acceso permanente a Profile, Settings y Arcade. Se evitan múltiples instancias de Profile al cambiar sección.

**EN.** Launcher opens nine registered apps, with search and CV/GitHub/LinkedIn access. Taskbar shows running, active and minimized apps, plus permanent Profile, Settings and Arcade access. Profile section changes never create additional instances.

## Tablet behavior

**ES.** Entre 720 y 1099 px la ventana ocupa el workspace con 12 px de margen. Solo la activa se presenta y recibe foco; las demás siguen recuperables desde la barra. Drag y resize se desactivan; se conserva maximizar con controles de 44 px. Verificado en 768×1024 y 820×1180.

**EN.** Between 720 and 1099 px, windows fill the workspace with a 12 px margin. Only the active window is visible and focusable; others remain recoverable from the taskbar. Drag/resize are disabled and the 44 px maximize control remains available. Verified at both required tablet sizes.

## Mobile behavior

**ES.** Por debajo de 720 px una app ocupa el workspace, sin drag, resize ni control de maximizar. Launcher y barra inferior permiten cambiar de app. Las tabs se ajustan en líneas legibles y el contenido tiene scroll vertical. A 320×740 las acciones requieren scroll; a 390×844 las cinco se ven en el Overview inicial. El criterio obligatorio de cero scroll se aplica al escritorio. No hay overflow horizontal en ninguno de los tamaños probados.

**EN.** Below 720 px, one app fills the workspace without drag, resize or maximize control. Launcher and bottom taskbar switch apps. Tabs wrap legibly and content scrolls vertically. At 320×740, actions require scrolling; at 390×844 all five fit initially. The mandatory no-scroll criterion applies to desktop. No tested viewport has horizontal overflow.

**ES.** Para alturas de viewport de hasta 420 px (incluido reflow equivalente a 400% zoom), el shell pasa a scroll de documento y mantiene la barra accesible, evitando que el chrome deje el contenido sin altura útil.

**EN.** At viewport heights up to 420 px, including equivalent 400% zoom reflow, the shell uses document scrolling with an accessible taskbar, preventing window chrome from consuming the content area.

## Navigation

| Sección / Section | Español / Spanish | English |
| --- | --- | --- |
| Overview | `/es/profile/` | `/en/profile/` |
| Experience | `/es/experience/` | `/en/experience/` |
| Competencies | `/es/profile/competencies/` | `/en/profile/competencies/` |
| Achievements | `/es/profile/achievements/` | `/en/profile/achievements/` |
| Education | `/es/profile/education/` | `/en/profile/education/` |
| Languages | `/es/profile/languages/` | `/en/profile/languages/` |
| CV | `/es/cv/` | `/en/cv/` |

**ES.** Home abre Overview directamente. Se mantiene el contrato A2: canónicas `/es/*` y `/en/*`, rutas sin prefijo como fallback estático español y aliases previos. Abrir/focalizar/restaurar app sincroniza URL y metadatos; Back/Forward restaura documento. El idioma conserva app, sección, query y hash. La geometría no se serializa en URL. Cada ruta nueva genera HTML Astro con la sección correcta sin JS.

**EN.** Home opens Overview immediately. A2 canonical locale paths, static Spanish compatibility documents and existing aliases remain. App opening/focus/restoration updates URL and metadata; Back/Forward restores the document. Language switching retains app, section, query and hash. Geometry stays outside URLs. Each new route produces the correct Astro HTML without JavaScript.

## Accessibility

**ES.** Navegación semántica con enlaces reales y `aria-current`, sin roles tab que prometan interacciones no implementadas. Ventanas normales `region`, sin focus trap modal. Controles con título, aria-label, objetivo de 44 px y foco cyan. Foco inicial/restaurado síncrono, Escape minimiza y Alt+L abre launcher; Escape del launcher devuelve el foco. Teclado Alt+flechas/Alt+Mayús+flechas conserva mover/redimensionar en escritorio. Minimizadas y apps compactas inactivas usan hidden/inert; los shortcuts que quedan detrás de la app compacta también son inert. `prefers-reduced-motion` desactiva animaciones.

**EN.** Semantic real-link navigation with aria-current, without tab roles implying unsupported interactions. Normal windows use region semantics without modal focus traps. Controls have titles, aria-labels, 44 px targets and cyan focus. Synchronous opening/restoration focus, Escape minimizes, Alt+L opens launcher, and launcher Escape restores focus. Desktop keyboard move/resize remains. Hidden/minimized apps and compact-mode background shortcuts leave keyboard navigation through hidden/inert. Reduced motion disables animations.

**ES.** Axe WCAG 2 A/AA y 2.1 AA: cero violaciones en todos los viewports iniciales, launcher, escritorio y proyectos. Reflow comprobado a 640×400 y 320×200, equivalente a 200%/400% sobre 1280×800. No se presenta como una prueba manual de la UI de zoom del navegador ni de lector de pantalla real.

**EN.** Axe reports zero WCAG 2 A/AA and 2.1 AA violations in the tested initial viewports, launcher, desktop and projects. Reflow was checked at 640×400 and 320×200, equivalent to 200%/400% of 1280×800. This is not claimed as a manual native browser zoom or screen-reader test.

## Performance

Medición local de build de producción / Local production-build measurement, Chromium + Lighthouse mobile simulated throttling. `scripts/a3-performance.mjs before|after`, with the foreground preview running on 4321.

| Métrica / Metric | Before | After | Budget |
| --- | ---: | ---: | ---: |
| Initial external JS gzip | 21.28 KiB | 22.65 KiB | ≤40 KiB |
| Home HTML+CSS+JS gzip + compressed assets estimate | 81.41 KiB | 40.36 KiB | ≤120 KiB |
| Lighthouse total transferred, including headers | 84.06 KiB | 42.75 KiB | ≤120 KiB |
| Arcade/audio boot requests | 0 | 0 | 0 |
| Lighthouse Performance / Accessibility / Best Practices / SEO | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | Diagnostic |
| LCP | 1656 ms | 1205 ms | Diagnostic |
| CLS | 0 | 0 | Diagnostic |

**ES.** El límite JS incluye los cinco scripts externos solicitados en inicio; los scripts inline y props se contabilizan en HTML/home. Incluso contando conservadoramente todo el HTML gzip como JS, el total queda en ~33,68 KiB, debajo de 40. La reducción principal procede de eliminar la petición de wallpaper de 45.440 bytes. Sin librerías ni fuentes nuevas; lockfile idéntico a A2. Los cuerpos del blog se excluyen del payload inicial salvo visita directa a un artículo, y se obtienen al abrirlo; ante error queda enlace real de lectura y se permite reintentar. Casos de arquitectura solo envían resúmenes; Arcade/assets/audio conservan sus fronteras dinámicas.

**EN.** JS counts the five external boot scripts; inline scripts and props are included in HTML/home. Even conservatively counting all gzipped HTML as JS gives ~33.68 KiB, below 40. Removing the 45,440-byte wallpaper request provides most of the transfer reduction. No new libraries or fonts; lockfile matches A2. Blog bodies are omitted from boot except direct article visits, and fetched on opening with a real reading fallback and retry path. Architecture cases send summaries only; Arcade/assets/audio remain dynamically deferred.

**ES.** [Antes](quality/a3/before.json), [después](quality/a3/after.json) y [Lighthouse final](quality/a3/after-lighthouse.html) contienen tamaños, peticiones y resultados. Son mediciones de preview local comprimido, no del dominio desplegado; se ha respetado NO deploy.

**EN.** Linked reports contain asset sizes, requests and results. They measure compressed local preview, not the deployed domain; no deployment occurred.

## Tests

| Gate | Resultado local / Local result |
| --- | --- |
| `npm ci` | PASS; zero audit vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS; 0 errors/warnings/hints |
| `npm test` | PASS; 31 tests |
| `npm run build` | PASS; 64 static pages |
| `npm run test:e2e` | PASS; 32 scenarios |
| Linux CI | Pending dispatch / Pendiente de ejecución |

**ES.** Se conservan todos los escenarios A1/A2. Solo se actualizan sus expectativas de presentación de bienvenida a Profile, nombre completo y acceso a experiencia dentro de Profile. A3 añade 2 unit tests y 17 E2E para mapping, singleton, paridad de labels, viewports, acceso sin scroll, launcher, foco, minimizar/restaurar, estados preparing, no-JS, hrefs, reflow, preservación de idioma y carga diferida/errores de artículo. No hay retries añadidos ni relajación de checks geométricos anteriores.

**EN.** All A1/A2 scenarios remain; only welcome/Profile, full-name and Profile experience-access expectations were updated. A3 adds two unit tests and seventeen E2E scenarios covering routing, singleton, labels, viewports, above-fold access, launcher, focus, minimize/restore, preparing states, no-JS, hrefs, reflow, language preservation and deferred article loading/errors. No added retries or weakened prior geometry checks.

## Screenshots reviewed

**ES.** Capturas persistidas en [screenshots](quality/a3/screenshots/a3/): escritorio ES/EN, 320×740, 390×844, 768×1024, 820×1180, 1100×800 adicional al mínimo, 1280×800, 1440×1000, 1920×1080, Overview, launcher ES/EN, CV ES/EN y estados de reflow. Se revisaron jerarquía, límites, texto, scroll, controles, foco y estados; las pruebas miden además los bounds de accesos/ventanas. Las capturas de zoom muestran navegación ya desplazada hasta Contact.

**EN.** Persisted screenshots cover ES/EN desktop, every required viewport plus 1100×800, Overview, both launchers, both CV preparing states and zoom-equivalent reflow. Review checks hierarchy, boundaries, text, scrolling, controls, focus and states; tests additionally assert window/action bounds. Zoom screenshots show navigation already scrolled to Contact.

## Deviations

**ES.** Se mantienen los IDs históricos `about`, `welcome`, `experience` y `cv` por compatibilidad interna; los tres últimos no son apps independientes del launcher y todas sus rutas profesionales abren Profile. Se escoge no permitir drag en tablet. Las rutas españolas canónicas conservan `/es/` según la instrucción explícita A3 y el contrato aprobado A2, con fallback español sin prefijo. Se incluye una corrección acotada de carga de cuerpos del blog porque A3 prohíbe enviarlos en boot. Se usan fondos CSS lisos y favicon SVG propio, sin raster generado.

**EN.** Historical internal IDs remain compatible, but welcome/experience/cv are not independent launcher apps and their professional routes resolve to Profile. Tablet dragging is intentionally disabled. Spanish canonicals retain `/es/` per explicit A3 and approved A2 routing, with unprefixed Spanish fallback. A bounded blog-body loading correction enforces the A3 boot boundary. Plain CSS backgrounds and an owned SVG favicon replace the need for generated raster art.

## Known gaps

**ES.** Los PDFs, LinkedIn y email siguen preparando según A2. Contact es el acceso mínimo coherente, no una app ampliada. Casos editoriales, juego Arcade y demás alcance futuro permanecen fuera de A3. El fallback español sin JS conserva destino pero no query/hash (limitación estática heredada A2). A 320 px hay scroll vertical de contenido. Faltan pruebas manuales con lector de pantalla/dispositivos físicos. Linux CI A3 debe quedar confirmado antes de marcar DONE.

**EN.** PDFs, LinkedIn and email remain preparing per A2. Contact provides coherent minimum access rather than an expanded app. Editorial case completion, an Arcade game and future scope remain outside A3. The inherited no-JS Spanish fallback preserves destination but not query/hash. Content scrolls vertically at 320 px. Physical-device and manual screen-reader testing were not performed. A3 Linux CI must pass before DONE.

## Ready for A4?

**NO — pending Linux CI.** No A4 work started / No se ha iniciado A4.

## Files changed

`src/components/{Desktop,Window,AppContent,Icon,Profile}.tsx`, `src/os/{registry,types,profile-sections}.ts`, `src/data/{ui,routes}.ts`, `src/i18n/es.ts`, `src/layouts/Shell.astro`, `src/styles/global.css`, `public/favicon.svg`, `tests/profile-routing.test.ts`, `tests/e2e/{a3,desktop,i18n}.spec.ts`, `scripts/a3-performance.mjs`, this document and `docs/quality/a3/*`.

**ES.** Se preserva el árbol local previo de migración Flutter/Astro y el índice real. La validación Linux se prepara sobre A2 con un índice temporal y una rama de verificación, sin checkout/reset/stash ni cambios a main o gh-pages.

**EN.** The existing local Flutter/Astro migration and real index are preserved. Linux verification is prepared on A2 through a temporary index and verification branch, without checkout/reset/stash or changes to main/gh-pages.
