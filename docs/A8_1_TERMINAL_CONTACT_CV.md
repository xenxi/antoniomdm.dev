# A8.1 Terminal + Contact + CV Implementation

## Status

IMPLEMENTED

## Baseline

- Branch: `codex/antonios-aura-pixel`
- HEAD: `003bf5e2c60bb855075b9342315b4c700b444706`
- Initial worktree: CLEAN
- Locks applied unchanged: `docs/A8_0_TERMINAL_CONTACT_CV_EVIDENCE_LOCK.md`,
  `docs/A8_0_1_TERMINAL_CONTACT_CV_EDITORIAL_LOCK.md`.
- No workflow, no dependency manifest and no deployment change.

## Contact implementation

- Dedicated Contact app preserved at `/contact/` and `/en/contact/`
  (`src/components/Contact.tsx`, rendered from `src/components/AppContent.tsx`).
- Visible identity and location/availability summary.
- Real actions: email `mailto:`, LinkedIn, GitHub, website.
- Copy-email button is progressive enhancement only: the visible address and the
  `mailto:` link always remain available; feedback is localized and failures
  degrade gracefully without telemetry.
- No backend, no message textarea, no CAPTCHA, no phone, no `tel:` action.

## Public contact data

Single typed source: `src/data/contact.ts` (`ContactInfo`), derived from
`src/data/professional/model.ts`. No factual literal is duplicated in
components.

- Name: Antonio Manuel Díaz Moreno
- Location ES: Linares (Jaén), España / EN: Linares (Jaén), Spain
- Remote ES: Remoto / EN: Remote
- Email: `antoniom.diaz.moreno@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/antoniomanueldiazmoreno`
- GitHub: `https://github.com/xenxi`
- Website: `https://antoniomdm.dev`

## Privacy boundary

- Telephone is not present anywhere in the interactive website, the public
  contact model, HTML, JSON-LD, client data or actions.
- `ExternalLink.kind` no longer includes `phone`, and the model validator rejects
  any non-`https:`/`mailto:` protocol, so a `tel:` link cannot enter the public
  model.
- Home address, family data, date of birth and age are absent.
- No analytics were added.

## Terminal implementation

- Existing Terminal refined, not replaced (`src/components/Terminal.tsx`).
- Commands resolve through the typed allowlist in `src/data/terminal.ts`.
- Deterministic handlers only; no user code is evaluated and no URL is built from
  input. Navigation goes through the real window-manager `open()` and its
  known-path validation.

## Command registry

`src/data/terminal.ts` exposes `TerminalCommandDefinition` with an explicit
action category (`OUTPUT`, `NAVIGATE`, `EXTERNAL_LINK`, `CLEAR`, `THEME`,
`ARCADE`, `REBOOT`, `EASTER_EGG`).

Canonical commands: `help`, `whoami`, `profile`, `experience`, `architecture`,
`projects`, `ai`, `contact`, `cv`, `github`, `linkedin`, `clear`, `theme`,
`arcade`, `reboot`, `sudo`.

`help` is generated from the registry and lists canonical commands and aliases.
Command tokens are stable and untranslated; descriptions are ES/EN.

## Aliases

`about` → `profile`, `career` → `experience`, `work` → `experience`,
`resume` → `cv`. Alias targets are validated by unit test. Aliases resolve to
the same canonical destinations as their targets.

## History / keyboard behavior

- In-memory session history only; nothing is persisted (no `localStorage`,
  `sessionStorage`, IndexedDB, URL, cookie, analytics or server).
- `ArrowUp` recalls previous non-empty commands; `ArrowDown` advances and returns
  to the current draft after the newest entry.
- Commands are trimmed, empty entries ignored and consecutive duplicates
  collapsed.
- `Escape` clears the current input only and consumes the event so the window is
  not minimized.

## Terminal security boundary

- Unknown input stays inert with the localized `Command not found. Type help.`
  message and no navigation.
- No `eval`, `Function` constructor, `child_process`, `exec*`, `spawn`,
  filesystem, `process.env`, dynamic import or input-built URL.
- External URLs (`github`, `linkedin`) resolve only from the typed, verified
  model links; `github <user>` and `open <url>` are inert.

## CV implementation

- Existing printable CV and `/cv.txt`, `/es/cv.txt`, `/en/cv.txt` preserved and
  still derived from the professional model.
- Typed CV asset registry: `src/data/cv.ts` (`CvAsset`, `status: 'APPROVED'`)
  with ES PDF, EN PDF, printable and TXT ES/EN.
- Model `cvVariants[].pdf` is now `available` with path, filename, MIME and
  verification date, satisfying the existing model validator.

## PDF ES

- Path: `public/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf`
- Pages: 2
- Title: `Software Architect | Senior .NET Engineer`
- Supporting: `Distributed Systems · Engineering Excellence · Applied AI`

## PDF EN

- Path: `public/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf`
- Pages: 2
- Editorial equivalent of the ES artifact.

## PDF validation

- Generated from the locked model by `scripts/generate-cv-pdfs.mjs` (Node
  built-ins only; no new dependency, no website runtime code).
- Valid `%PDF-1.4` header, `%%EOF` trailer, `/Count 2`.
- Uncompressed text layer using standard WinAnsi base-14 fonts; text is
  extractable and accents/`·` are preserved.
- Required factual strings, education boundary and language boundary verified in
  both languages.
- No unsupported claims or telephone text present.

## Printable/TXT fallback

- Printable CV at `/cv/` with `Print / Save PDF` retained.
- TXT fallbacks registered and linked: `/es/cv.txt`, `/en/cv.txt` (and the
  canonical `/cv.txt`).

## No-JS behavior

- Contact links (`mailto:`, LinkedIn, GitHub, website) and location render in SSR
  HTML without JavaScript.
- CV PDF, printable and TXT links render and resolve without JavaScript.
- Terminal remains a progressive enhancement and is never the only route to
  professional content.

## Accessibility

- Terminal: real labelled input, visible focus, `role="log"` with
  `aria-live="polite"`, no keyboard trap, accessible `clear` that preserves
  context and returns focus.
- Contact: descriptive links and practical 44 px targets.
- CV links identify CV, language and PDF in visible text and accessible names.
- Targeted Axe: 0 serious and 0 critical violations.

## Mobile/responsive

- Verified at 1440x900, 768x1024 and 390x844 with no horizontal overflow.
- Terminal input scrolls into view on focus and after execution; no mandatory
  physical keyboard and no overbuilt toolbar.

## Tests

- Unit `tests/a8.test.ts`: 16 deterministic tests covering approved contact
  values, absence of a public phone field, exact email/LinkedIn, ES/EN
  location/availability, canonical commands, aliases, unique ids, alias targets,
  external links from the model, hostile-input inertness, terminal source
  security, CV registry and PDF artifacts.
- Updated `tests/professional-model.test.ts` and `tests/e2e/a3.spec.ts` to the
  approved available state (no assertion weakened; placeholder assertions were
  replaced with stronger available-asset assertions).
- E2E `tests/e2e/a8.spec.ts`: 15 tests covering Contact ES/EN, copy email,
  Profile links, terminal navigation/aliases/help/whoami/history/escape/clear,
  unknown and hostile input, CV actions, no-JS access, responsive widths, Axe,
  console/network health and privacy.

## Validation run

- `npm run lint`: PASS
- `npm run typecheck`: PASS (0 errors, 0 warnings)
- `npm test`: PASS (7 files, 65 tests)
- `npm run build`: PASS (112 pages)
- Targeted A8 E2E: PASS (15/15)
- Full E2E: PASS (119/119)
- Axe serious: 0 / critical: 0
- Responsive: 1440x900, 768x1024, 390x844 PASS
- `git diff --check`: PASS (only standard CRLF warnings)
- Manifest diff (`package.json`, `package-lock.json`): EMPTY

## Browser Acceptance (A8.1.1)

Performed on the production preview (`astro preview` on the built output), not
the dev server, with Playwright/Chromium. A8.1.1 added 247 programmatic browser
acceptance assertions (routes, states and viewports below) and re-ran the
committed suites; all passed. No new feature, route, claim, metric, command,
dependency or data was introduced.

### Routes / states / viewports tested

- Contact: `/contact/`, `/en/contact/` at 1440x900, 768x1024, 390x844.
- Profile: `/`, `/profile/`, `/en/`, `/en/profile/`.
- Terminal: `/terminal/`, `/en/terminal/` (plain, canonical commands, aliases,
  history, Escape, clear, hostile input, mobile 390x844).
- CV: `/cv/`, `/en/cv/`.
- No-JS: `/`, `/profile/`, `/experience/`, `/architecture/`, `/projects/`,
  `/projects/platform934/`, `/ai-lab/`, `/contact/`, `/cv/` and EN equivalents.

### Contact acceptance

- ES/EN name, `Linares (Jaén), España · Remoto` /
  `Linares (Jaén), Spain · Remote`, email, exact `mailto:`, LinkedIn, GitHub and
  website URLs verified in the DOM at all three viewports.
- Copy-email works and copies the approved address; feedback is localized
  (`Correo electrónico copiado al portapapeles.` /
  `Email copied to clipboard.`). Clipboard failure degrades to the localized
  fallback and never removes the visible address or the `mailto:` link.
- No phone value and no `tel:` link; practical 44 px targets; visible focus; no
  horizontal overflow; no console errors or failed requests.
- No-JS: name, location, remote status, email and all four links render as real
  HTML links.

### Profile contact acceptance

- `/`, `/profile/`, `/en/`, `/en/profile/` expose the `mailto:`, LinkedIn,
  GitHub and website actions; location/remote are shown; no "Working on it" for
  approved links; no phone.

### Terminal acceptance

- Canonical commands `help`, `whoami`, `profile`, `experience`, `architecture`,
  `projects`, `ai`, `contact`, `cv`, `github`, `linkedin`, `clear`, `theme`,
  `arcade`, `reboot`, `sudo` each produced their locked behavior in the browser.
- Aliases `about→profile`, `career/work→experience`, `resume→cv` resolve
  deterministically with no wrong route, duplicate navigation or translated
  token.
- History: ArrowUp cycles back and stops at the oldest entry, ArrowDown advances
  and returns to the empty current line, empty input adds no line, and a reload
  clears it. Nothing is persisted in localStorage, sessionStorage, IndexedDB,
  cookies or the URL.
- Escape clears the input, keeps the Terminal window open and leaves focus
  usable.
- `clear` empties the visible log, keeps the labelled log/input context,
  refocuses the input and keeps the session history recallable.
- Hostile input (`open https://example.com`, `../../etc/passwd`,
  `javascript:alert(1)`, `eval(alert(1))`, `github attacker`, `linkedin foo`,
  `rm -rf /`, `curl https://example.com`) stays inert: no navigation, no dialog,
  no network request triggered from input, localized unknown-command feedback and
  a stable app.
- Mobile 390x844: no horizontal overflow, prompt not clipped and visible, the
  latest prompt scrolls into view after execution, the input stays visible after
  a viewport-height shrink that emulates the soft keyboard, Escape does not close
  the window and history stays usable.
- Axe on the Terminal-open state: 0 serious, 0 critical.

### CV acceptance

- `/cv/` and `/en/cv/` expose `[download]` actions for both PDFs, the printable
  CV and both TXT fallbacks; no "preparing" placeholders.
- PDF HTTP: 200, `application/pdf`, non-zero size, `%PDF-` header, no HTML
  fallback and no 404/redirect loop.
- PDF text extracted from the uncompressed content streams (no OCR) is ordered
  and correct, with accents and `·` preserved.
- Both PDFs are 2 pages. Content-stream layout reconstruction found no clipping,
  no baseline overlap and all runs within the margins (left 50 pt, right
  545.28 pt, bottom 48 pt). The EN artifact ends with one continuation line for
  the second language at the top of page 2 (a widow inherent to keeping the CV at
  2 pages); no section title is orphaned.
- Language isolation: the ES artifact has no English editorial sections and the
  EN artifact no Spanish editorial sections beyond proper/institution names.
- Primary title is `Software Architect | Senior .NET Engineer` in both. Forbidden
  titles (AI Engineer, AI Architect, Machine Learning Engineer, Data Scientist),
  unsupported language levels (B2, C1, fluent, full professional proficiency),
  unsupported AI claims (RAG, MCP, embeddings, vector database, autonomous
  remediation/agent) and any new metric are absent.
- Education boundary preserved (`título no obtenido` / `degree not awarded`).
  Languages preserved (`Español nativo` / `Native Spanish` and the conservative
  English wording in both artifacts).
- Telephone absent; no home address, family data, date of birth/age, private
  repository URL or credentials in either PDF.

### No-JS / responsive / i18n / accessibility

- Representative professional routes render essential content without JS;
  Contact and CV remain usable and the Terminal stays inert.
- `documentElement.scrollWidth <= clientWidth` for Contact, CV, Profile and the
  open Terminal at 1440x900, 768x1024 and 390x844.
- ES/EN Contact labels, Terminal `help`/descriptions, copy-email feedback and CV
  labels are localized; command tokens remain invariant.
- Axe on Contact ES/EN, CV, Profile and Terminal open: 0 serious and 0 critical;
  several pages report 0 total violations. No keyboard trap, labelled input and
  visible focus were confirmed.

### Console / network / performance

- No console errors, uncaught exceptions, failed local requests, 404/500 or
  broken PDF requests across the A8 routes/states.
- Lighthouse on the production preview (mobile default): Contact and CV both
  scored Performance 99, Accessibility 100, Best Practices 100 and SEO 100, with
  CLS 0 and TBT 0. Home scored 99/100/100/100.
- Bundle vs. the A8 baseline (HEAD): no new runtime dependency and the manifest
  diff is EMPTY. The main client chunk increased by ~4.9 kB raw (~1.4 kB gzip)
  from the new Terminal/Contact components, which is not a material regression.

### Hardening performed (A8.1.1)

1. **Removed duplicated professional model from the client bundle.** The A8.1
   `Contact`, `Terminal` and `Profile` components imported `src/data/contact.ts`
   and `src/data/cv.ts`, which import `publicProfessionalModel`, so the whole
   model was duplicated into the main client chunk (main chunk +~45 kB raw /
   +~13.7 kB gzip). The derived values (`contact`, `contactMailto`, `cvAssets`,
   `cvSupportingLine`) are now computed server-side in `getUiData` and passed
   through the existing `UiData` hydration props; the client components consume
   `data`. The net main-chunk increase is now ~1.4 kB gzip, the model no longer
   appears in client JS, and no UI, route, label, claim, metric or behavior
   changed.

No other hardening change was required: all acceptance checks passed on the
production preview.

## Files changed

Modified:

- `src/components/AppContent.tsx`
- `src/components/Profile.tsx`
- `src/data/professional/model.ts`
- `src/data/professional/selectors.ts`
- `src/data/professional/types.ts`
- `src/data/professional/validation.ts`
- `src/data/ui.ts`
- `src/i18n/es.ts`
- `src/styles/global.css`
- `tests/e2e/a3.spec.ts`
- `tests/e2e/i18n.spec.ts`
- `tests/professional-model.test.ts`

Note: `src/components/Desktop.tsx` was modified during A8.1 only to drop the
`data` prop from `PublicShortcuts`. The A8.1.1 hardening restored that prop
(`PublicShortcuts` derives from `UiData` again), so `Desktop.tsx` is no longer
net-changed against HEAD.

New:

- `src/components/Contact.tsx`
- `src/components/Terminal.tsx`
- `src/data/contact.ts`
- `src/data/cv.ts`
- `src/data/terminal.ts`
- `scripts/generate-cv-pdfs.mjs`
- `tests/a8.test.ts`
- `tests/e2e/a8.spec.ts`
- `docs/A8_1_TERMINAL_CONTACT_CV.md`

Generated PDF assets:

- `public/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf`
- `public/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf`

Generated QA artifacts committed: none (regenerated `docs/quality` screenshots
from the E2E run were reverted).

## Explicit non-claims / rejected scope

Not implemented, per lock: backend contact form, telephone on web, `tel:` links,
AI terminal assistant, real shell, arbitrary commands or arguments,
`open <app>` grammar, input-built URLs, analytics platform, unrelated Profile
redesign, A9 Arcade work.

## Ready for A8.1.1

YES

## Ready for A8.2

YES — A8.1 changes plus the A8.1.1 hardening are complete, validated and
uncommitted, ready for A8.2 closure/versioning.
