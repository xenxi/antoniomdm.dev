# ANTONIOMDM OS — M1 Foundation

## Initial audit and decision

The original project is a Flutter application split into domain, infrastructure, application and presentation layers. MaterialApp and Fluro expose `/`, `/experience` and `/blog`; no history URL strategy is configured. Windows and Arcade layouts wrap the same routed child. `EngineModeBloc` owns Windows/Arcade selection, power and audio state.

Windows has **one** draggable modal, not a window manager. Close and minimize toggle the same boolean; no independent app lifecycle, task restoration or bounded geometry exists. Arcade is a decorative cabinet with buttons and a 720px responsive layout, not a playable world. First entry from its desktop icon schedules music automatically. Menu settings/images/games are largely unimplemented.

Verified content: Antonio Manuel Díaz Moreno; .NET, TypeScript, Dart, Angular and Flutter; Software Engineer at Domingo Alonso Group starting July 2021. The entry's historical `Actualidad` does not establish current employment. The description is lorem ipsum and other timeline steps are placeholders. No local projects, complete CV, article bodies or metrics exist. Platform 9¾ and its Android TV/Kotlin/Media3/Jellyfin stack come from the M1 brief. Luna and Koso are not published without supporting facts.

The old blog fetches `xenxi/blog/Posts` through the GitHub API at runtime. A build-time base64 token is decoded in the browser; article links target an undefined route and the renderer has an unreachable return. The public source returned **HTTP 404 on 2026-09-09**. No old articles were claimed as recovered. The new `os-foundation.md` explicitly identifies itself as a new development log.

`web/index.html` uses `$FLUTTER_BASE_HREF`, a hand-written `main.dart.js` bootstrap, Flutter service worker and four-second fallback. HTML and manifest retain “A new Flutter project.” There is no semantic professional content in the root HTML. `web/CNAME` is `antoniomdm.dev`; CI builds unpinned beta Flutter and publishes via `bluefireteam/flutter-gh-pages@v7`, injecting `G_TOKEN` into the browser bundle.

**Chosen architecture: Astro 7 + TypeScript + server-rendered Preact island + Markdown Content Collections.** Astro emits real HTML for every route. Preact enhances that HTML with the desktop interaction. No backend, runtime CMS, GitHub token, Flutter engine, drag framework, icon package or game framework is necessary for M1. This satisfies the requested desktop experience while making HTML, deep links, accessibility and performance first-class.

References: [Astro collections](https://docs.astro.build/en/guides/content-collections/), [official Preact integration](https://docs.astro.build/en/guides/integrations-guide/preact/). Sites building/hosting guidance was consulted; the user's existing repository, preferred Astro architecture and GitHub Pages publishing model were retained. No separate hosting project or domain migration was introduced.

## Relevant tree

```text
src/
  os/                  types, registry, pure reducer, preferences
  components/          Desktop, Window, AppContent, Icon
  data/                portfolio, collection loader, route/SEO metadata
  content/notes/       Markdown articles
  content.config.ts   validated collection schema
  arcade/              lazy module and engine contract
  layouts/Shell.astro HTML document, SEO and SSR island
  pages/               generated routes, RSS, sitemap, CV text, 404
  styles/              tokens, desktop/apps/mobile/print, lazy Arcade CSS
public/                optimized assets, CNAME, robots, llms, retirement worker
tests/                 reducer/preferences and Playwright tests
scripts/               asset preparation and Lighthouse measurement
docs/                  architecture, legacy audit, delivery and quality reports
legacy/flutter/        original code and assets, excluded from production
.github/workflows/     Node quality gates and gh-pages deployment
```

## WindowManager and registry

`ApplicationDefinition` specifies id, name, icon, component key, path, description, defaultSize, minSize, initialPosition, resizable, maximizable and singleInstance. It is independent of presentation. The component key selects its content renderer. All M1 apps are single instance; project/note detail documents share their parent application window.

`DesktopState` holds `openWindows`, `activeWindowId` and `zOrder`. Each instance owns path, rectangle and normal/minimized/maximized state. Minimized/maximized lists and positions/sizes derive from instances rather than duplicate state. Closing removes an instance, never the app. Opening an existing app restores and focuses it. Z-order is a bounded permutation; closing/minimizing picks the next visible app.

Maximize saves an independent `restoreRect`; unmaximize restores it exactly. Minimize remembers whether the window was maximized. Viewport changes constrain both current and restore rectangles when necessary. Maximized windows fill the workspace, excluding system bars.

`Window.tsx` provides pointer dragging and eight resize edges/corners. A gesture updates only that DOM element through requestAnimationFrame and commits to the reducer on pointer-up. Global pointer listeners keep movement active outside the titlebar; completion, cancellation and unmount clean them up. Cancellation restores the original geometry. Alt+arrows moves; Alt+Shift+arrows resizes; Escape minimizes. Focus returns to the next window or desktop icon after close/minimize.

Desktop icons are real links: click, double click, tap and Enter open an app. Launcher uses native links, search, Alt+L and Escape. Taskbar selection/minimized markers reflect reducer state. The terminal accepts a fixed command map, never evaluates input and never runs a shell. GitHub returns a real clickable link; navigation commands open apps.

## Routes and SEO

`[...path].astro` builds all registry and detail paths, rendering the initial app server-side. `/` opens Welcome directly on the desktop. Directory index output and trailing slashes work with GitHub Pages; the host normalizes `/projects` to `/projects/`. `/blog/` emits a static redirect document to Notes (a meta redirect, not a claimed HTTP 301 on static hosting). Unknown paths use the static 404.

Known same-origin links use History API. Modified clicks, downloads, external links, queries and unknown URLs retain native navigation. Popstate opens/restores the corresponding app. Window focus/close/minimize update the active path. Back to `/` opens Welcome. There is no hash router.

Shared metadata covers title, description, canonical, OpenGraph, Twitter, Person, WebSite, ProfilePage/WebPage, Article, SoftwareSourceCode and BreadcrumbList. Client navigation updates title, canonical, social metadata and JSON-LD; direct requests get the full route-specific HTML/head. RSS and sitemap use the same collection. `llms.txt` is a concise maintained navigation guide, not another catalogue.

`?view=reading` presents the same content as a document. A no-JavaScript stylesheet exposes static navigation and expanded content. `/cv/` has printable HTML and Print/Save PDF; `/cv.txt` is a real download generated from shared profile/experience. It is explicitly a profile extract because no full CV existed. Print CSS hides chrome and prints the active document.

## Content

`portfolio.ts` is the single source for profile, projects, experience and lab concepts. Desktop/SSR and Arcade share it. `content.ts` queries Markdown at build time, orders by date and serializes metadata/rendered HTML. Only trusted repository Markdown belongs in this renderer; do not inject arbitrary user HTML. The collection validates title, description, date, updated, tags, readingTime, canonical and draft. Drafts are excluded from routes and RSS.

M1 has one small note. Before a large archive is added, load article bodies on demand instead of serializing every body on every route. No GitHub request or token is needed to install, build or visit the site.

## Persistence, effects and audio

**ES.** Solo las preferencias validadas viven bajo `antoniomdm-os:preferences:v2`: fondo, efectos, sonido, música y sonidos de interfaz. Medianoche es el fondo predeterminado; los efectos, el sonido y la música empiezan activos, mientras que los sonidos de interfaz empiezan desactivados. Un almacenamiento inválido o no disponible utiliza valores seguros. Las ventanas y su geometría permanecen deliberadamente en la sesión. Restablecer aplica los valores predeterminados y abre Bienvenida.

**EN.** Only validated preferences live under `antoniomdm-os:preferences:v2`: wallpaper, effects, sound, music and UI sounds. Midnight is the default wallpaper; effects, sound and music start enabled, while UI sounds start disabled. Invalid or unavailable storage falls back safely. Window instances and geometry deliberately remain session-local. Reset applies the defaults and opens Welcome.

Short CSS entry/focus/launcher effects respect prefers-reduced-motion and Settings. M1 close/minimize and maximize geometry commit immediately; dedicated exit/dock/geometric animation choreography is a documented polish item. Optional UI sounds use a tiny native Web Audio oscillator. Arcade audio requires Sound and Music preferences plus explicit Play, and is released on exit.

## Arcade boundary

Initial code imports only the Arcade type contract, erased at compile time. The desktop icon opens the lightweight app launcher. Only ENTER calls `import('../arcade/Arcade')`, loading its CSS/background; MP3 is requested only by Play. There is no prefetch or engine in the initial graph.

`ArcadeProps` supplies shared article content, preferences, navigation and exit. `ArcadeEngine` defines mount/pause/dispose for M2. Any future implementation must release frames, listeners and audio on disposal. M1 is a destination preview, explicitly not a walkable world. Destination controls open the same desktop documents. Escape exits; the inactive desktop is inert. A generation guard prevents stale async entry after cancellation; import failure allows retry.

## Responsive/accessibility

At >=720px windows float. Below 720px the same definitions fill the workspace; only the active app is visible, with dock switching and a home icon grid after minimizing. Content is unchanged between layouts.

Semantic regions, real links/buttons, accessible controls, visible focus, keyboard move/resize, launcher search, live terminal output, reduced motion, no-JS content, reading/print layouts form the baseline. Chromium, Axe and mobile viewport tests are automated. Real assistive-technology sessions, touch hardware, Safari and Firefox remain separate checks.

## Adding content and apps

**App:** extend AppId, registry metadata and the owned SVG icon family. Add its component renderer (split larger apps into their own components). Routes and launcher derive from the registry. Add a desktop icon if appropriate and a behavior/no-JS smoke test. Heavy modules go behind an explicit action.

**Project:** add a verified entry with unique slug, category, description, stack and provenance in `portfolio.ts`. Explorer, detail route, metadata, sitemap and shared Arcade data derive from that entry. Extend the case-study model with facts when available; never couple it to window state.

**Article:** add `src/content/notes/your-slug.md` with validated frontmatter. Use `draft: true` before publication and a positive readingTime. Typecheck validates schema; build creates the route, feed, sitemap and Article metadata. Set canonical only for intentional cross-publication.

## Commands and deployment

CI uses Node 24. Run `npm ci`, `npm run dev`. Production: `npm run build` then `npm run preview`. Astro 7 preview runs a managed background server: `npx astro preview status` / `npx astro preview stop`. Checks: lint, typecheck, test, `npx playwright install chromium`, test:e2e. `node scripts/lighthouse.mjs` measures the running local production preview and saves reports.

Optimized assets are committed. `node scripts/prepare-assets.mjs` explicitly regenerates them from retained assets; the normal build does not read legacy files. There is no executable Flutter stage in the production scripts or pipeline.

The workflow validates PRs/main, then publishes dist to **gh-pages** on main, preserving the branch model, CNAME and .nojekyll. It does not require changing Pages to a new mode. Remote branch protections and Pages configuration must be verified on publication. No push/public deployment was performed during this delivery.

The worker at the original `flutter_service_worker.js` URL retires the old PWA: activates, removes only known Flutter caches, unregisters and reloads controlled clients. Desktop also unregisters only matching legacy registrations. Installed-production PWA migration requires a real rollout check; fresh-browser tests do not prove every historical cache transition. G_TOKEN is no longer used; review/revoke it if the old client build exposed a usable token.

## M2 recommendation

First validate current employment, responsibilities and full CV; write Platform 9¾ from real architecture evidence and screenshots, then recover legacy articles with dates/canonicals. After content review, implement a small top-down world behind ArcadeEngine using shared data. Follow with animation polish, larger-archive delivery, Safari/Firefox, assistive technology, PWA retirement and deployed performance checks. No additional projects or employment claims should be invented to fill the UI.
