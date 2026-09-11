# M1 — ANTONIOMDM OS Foundation delivery

Delivered locally on 2026-09-09. Production architecture: Astro 7.3.2 + TypeScript 6.0.3 + Preact 10.29.8. The full initial audit, architecture decision, new tree and extension guide are in [ANTONIOMDM_OS_ARCHITECTURE.md](ANTONIOMDM_OS_ARCHITECTURE.md); SDK/dependency/asset decisions are in [LEGACY_AUDIT.md](LEGACY_AUDIT.md).

## Implemented and exercised

- Desktop home with owned icon family, optimized dark wallpaper, initial Welcome, top bar, clock, launcher and live taskbar.
- Ten registry apps: Welcome, Projects, Experience, Notes, Lab, About, CV, Terminal, Settings, Arcade.
- Common reducer: open, focus, bounded z-order, close/reopen, minimize/restore, maximize/unmaximize, exact restore geometry and single instance.
- Titlebar drag, eight resize handles, viewport bounds and keyboard movement/resize. Mobile switches to full-workspace apps and a dock.
- Project categories and featured Platform 9¾ route. Historical experience with honest date caveat. No invented jobs, projects or metrics.
- Static Markdown Notes, real detail paths, shared content, RSS/sitemap and SEO/structured data. Navigation updates History API and supports Back/Forward.
- Controlled terminal commands, persisted/validated preferences, reset, sound off by default and optional native audio.
- CV HTML, reading/print layout and text download; explicitly a profile extract, not a fabricated complete CV.
- Lab concept previews and Arcade launcher/entry/destination screen/exit. Module and background are deferred until ENTER; music until explicit Play.
- Production workflow builds/verifies Astro only and preserves gh-pages and antoniomdm.dev. Actual remote publication was not executed.

## Real quality gates

Final application gates ran after `npm ci` completed successfully on Windows with Node 24.19.0 / npm 11.17.0.

| Gate | Result | Evidence |
|---|---|---|
| Clean install, npm ci | PASS | 546 packages installed; audit found 0 vulnerabilities |
| npm run lint | PASS | ESLint, exit 0 |
| npm run typecheck | PASS | 26 files; 0 errors, 0 warnings, 0 hints |
| npm test | PASS | 16 reducer/preferences assertions/scenarios |
| npm run build | PASS | Astro production output; 14 page documents plus generated feeds/endpoints |
| npm run test:e2e | PASS | 11 Chromium scenarios, all passing |
| Axe WCAG A/AA/2.1 AA | PASS | No violations on desktop and Projects snapshots |
| Legacy preservation | PASS | 137 original files; normalized Git blob hashes match |
| git diff --check | PASS | No whitespace errors; Git emits ordinary Windows LF/CRLF notices |
| Lighthouse mobile, local production preview | PASS | Performance 100, Accessibility 100, Best Practices 100, SEO 100 |
| LCP / CLS measured | PASS | 1215.205 ms / 0.0004086745 |
| Flutter SDK/get/analyze/test/build | NOT RUN | LEGACY / NOT PART OF PRODUCTION BUILD |
| GitHub-hosted workflow / deploy | NOT RUN | No push or public deployment requested as a delivery action |
| Deployed-domain Lighthouse | NOT RUN | Local measurement is not a hosted guarantee |
| Safari / Firefox / physical touch / screen-reader sessions | NOT RUN | Chromium and viewport simulation only |
| Installed historical PWA upgrade | NOT RUN | Retirement mechanism implemented; real upgrade check remains |

Full Lighthouse reports: [HTML](quality/lighthouse.html), [JSON](quality/lighthouse.json), [compact result](quality/summary.json). These were measured against the production app source used in the final clean build; subsequent changes were dependency pinning, documentation and archival verification tooling. Lighthouse still lists non-scoring opportunities for the dependency tree and roughly 150 ms of render-blocking CSS savings.

## Test coverage

`tests/window-manager.test.ts` covers open/close/reopen, single instance/document paths, minimize/restore, maximized-minimized restoration, exact unmaximize, focus/z-order, minimizing focus safety, bounds, viewport, reset, route mapping and corrupt/typed preferences.

`tests/e2e/desktop.spec.ts` covers:

1. Desktop entry and full window drag/resize/maximize/minimize/restore/close/reopen lifecycle.
2. Direct project detail and browser Back/Forward.
3. Network-level Arcade module/background/audio lazy boundaries and exit.
4. Keyboard launcher/terminal/window controls and persisted/reset settings.
5. Mobile full-workspace apps, width/overflow and dock restoration.
6. Actual professional/article/CV HTML with JavaScript disabled.
7. Main route/feed/asset responses and CNAME/.nojekyll build artifacts.
8. Axe and desktop/mobile screenshot generation.
9. Project filtering, note body, Lab concept and printable CV.
10. Audio opt-in followed by explicit Play and Arcade disposal.
11. Maximized geometry recovery after shrinking the viewport.

## Errors encountered and resolved

- Initial typecheck lacked Node types and flagged deprecated imports. Added explicit types/current APIs; final check has no diagnostics.
- Four initial browser failures came from measuring moving entrance-animation rectangles and treating the Pages CNAME artifact as an ordinary preview URL. Geometry tests now use reduced motion; CNAME is verified on disk. Final full browser suite passes.
- Initial Lighthouse launch through chrome-launcher failed with Windows `spawn UNKNOWN`. The script now uses the same working Playwright Chromium runtime and completed successfully.
- First clean install hit EPERM because the running preview held Astro's native compiler open. Stopped only the identified project preview, then reran npm ci successfully.
- An intermediate dependency pinning helper needed PowerShell's hashtable parser for the lockfile's empty root key. Corrected and regenerated the lockfile before the final clean install.
- Raw archival comparison saw Windows checkout line endings as changes. Verification now compares canonical Git blobs with the configured normalization; all 137 files match. No content was edited to make the check pass.

No unresolved lint/type/test/build failures remain. npm's new allow-scripts review notice for esbuild is still emitted; installation and actual build both completed, and no permission bypass was applied.

## Created and modified files

New foundation: `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`.

New application source:

```text
src/os/types.ts
src/os/registry.ts
src/os/window-manager.ts
src/os/preferences.ts
src/components/Desktop.tsx
src/components/Window.tsx
src/components/AppContent.tsx
src/components/Icon.tsx
src/data/portfolio.ts
src/data/content.ts
src/data/routes.ts
src/content.config.ts
src/content/notes/os-foundation.md
src/arcade/contract.ts
src/arcade/Arcade.tsx
src/styles/global.css
src/styles/arcade.css
src/layouts/Shell.astro
src/pages/[...path].astro
src/pages/404.astro
src/pages/blog.astro
src/pages/cv.txt.ts
src/pages/rss.xml.ts
src/pages/sitemap.xml.ts
```

New public files: `.nojekyll`, `CNAME` (same domain), `robots.txt`, `llms.txt`, `favicon.svg`, `social.png`, `wallpaper.webp`, `arcade/world.webp`, `audio/arcade_01.mp3`, `flutter_service_worker.js` (retirement, not a Flutter bootstrap).

New verification/tooling: `tests/window-manager.test.ts`, `tests/e2e/desktop.spec.ts`, `scripts/prepare-assets.mjs`, `scripts/lighthouse.mjs`, `scripts/verify-legacy.mjs`.

New docs: this file, architecture guide, legacy audit, Lighthouse summary/full reports. Screenshots/traces are generated under ignored `test-results/`; dist and node_modules are also ignored.

Modified original files: `.github/workflows/publish.yml`, `.gitignore`, `README.md`.

Moved legacy: all 137 original Flutter/native/assets/test files into `legacy/flutter/`. **No legacy contents deleted.** Unstaged Git status shows old paths as deleted and the new directory as untracked until staged; blob verification proves they are preserved. The separate archived manifest is not a second active build architecture.

## Remaining debt and recommended M2

M1 delivers the functioning foundation, not the complete portfolio/game. The complete CV, current career timeline, Platform 9¾ case study and inaccessible old blog require real source content. Lab has working concept panels, not simulators. Arcade has a tested lazy boundary and destination preview, not movement/maps. Close/minimize/maximize transitions are immediate; richer motion choreography remains polish. Large note archives should load article bodies on demand. No geometry persistence beyond the current session is claimed.

Recommended next milestone: **M2 — verified professional content and Platform 9¾ case study**, followed by the small top-down Arcade world. Before public rollout, validate Pages settings, the installed-PWA retirement path and hosted performance. Remote main/gh-pages branches were confirmed to exist; account settings and actual deploy were not changed.
