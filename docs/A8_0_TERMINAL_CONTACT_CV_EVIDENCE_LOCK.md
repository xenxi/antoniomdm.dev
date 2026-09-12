# A8.0 Terminal + Contact + CV Evidence & UX Lock

## Status

`HUMAN_RESOLVED` — the five P0 human decisions were resolved by the human
editorial lock in `docs/A8_0_1_TERMINAL_CONTACT_CV_EDITORIAL_LOCK.md` (email
value, LinkedIn URL, location/remote publication, telephone policy and the
approved CV artifact / languages). No implementation, commit, push or deploy was
performed.

`HUMAN_RESOLVED` — las cinco decisiones humanas P0 fueron resueltas por el
bloqueo editorial humano en `docs/A8_0_1_TERMINAL_CONTACT_CV_EDITORIAL_LOCK.md`
(valor de email, URL de LinkedIn, publicación de ubicación/modalidad, política de
teléfono y el artefacto de CV aprobado / idiomas). No se realizó implementación,
commit, push ni despliegue.

## Human Decisions Resolved

Recorded by the human-approved A8.0.1 editorial lock. These decisions override
the safe defaults below.

1. **P0-1 — Public professional email: RESOLVED.** Authorized public value:
   `antoniom.diaz.moreno@gmail.com`. May be published in Contact, Profile/contact
   shortcuts, Terminal `contact`, CV, `mailto:` links and the copy-email action.
   No other email is published unless separately approved.
2. **P0-2 — Public LinkedIn: RESOLVED.** Authorized public value:
   `https://www.linkedin.com/in/antoniomanueldiazmoreno`. May be published in
   Contact, Profile, Terminal, CV and external professional links. No tracking
   parameters are invented.
3. **P0-3 — Public location / remote status: RESOLVED.** Authorized public
   wording — ES: `Linares (Jaén), España · Remoto`; EN:
   `Linares (Jaén), Spain · Remote`. Approved for Contact, Profile, CV and the
   professional summary where contextually useful. Street address, postal
   address, exact home location and coordinates are not published.
4. **P0-4 — Telephone: RESOLVED.** Web policy: the telephone number is **not**
   published on the interactive website (no Contact phone field, no `tel:` link,
   no Terminal phone output, no Profile phone shortcut, no hidden DOM phone
   number, no structured-data phone number). CV policy: the telephone **may**
   remain inside the downloadable CV artifact only; it must not be exposed
   elsewhere.
5. **P0-5 — CV publication strategy: RESOLVED.** Keep the printable CV and the
   TXT CV (ES/EN). Create in A8.1 the definitive PDF CV ES and PDF CV EN,
   generated/curated from the already locked professional model and validated
   before publication. They are not authorized merely by existing local files.
   Approved target state: ES PDF, EN PDF, printable version, TXT fallback ES,
   TXT fallback EN.

## Purpose

**ES.** Auditar el estado real de Terminal, Contact y CV; separar lo
implementado de lo placeholder/legacy; inventariar la información personal ya
pública; y fijar el contrato UX/privacidad/contenido autoritativo para A8. Este
documento es solo investigación, evidencia y bloqueo; no implementa A8.

**EN.** Audit the real state of Terminal, Contact and CV; separate implemented
behavior from placeholder/legacy behavior; inventory personal data already
public; and define the authoritative UX/privacy/content contract for A8. This
document is research, evidence and lock only; it does not implement A8.

## Sources Audited

- Baselines: `AGENTS.md`, `docs/ANTONIOMDM_OS_ARCHITECTURE.md`,
  `docs/ANTONIOS_AURA_PIXEL.md`.
- Evidence locks and milestone docs: `docs/A2_PUBLIC_MODEL.md`,
  `docs/A3_IDENTITY_PROFILE.md`, `docs/A4_EXPERIENCE_COMPETENCIES.md`,
  `docs/A5_0_EDITORIAL_EVIDENCE_LOCK.md`,
  `docs/A5_0_1_ARCHITECTURE_EDITORIAL_LOCK.md`,
  `docs/A5_ARCHITECTURE_CASE_STUDIES.md`,
  `docs/A6_0_PLATFORM934_EVIDENCE_LOCK.md`,
  `docs/A6_0_1_PLATFORM934_EDITORIAL_LOCK.md`,
  `docs/A6_5_PROJECT_PORTFOLIO_EVIDENCE_LOCK.md`,
  `docs/A6_5_1_PROJECT_PORTFOLIO_EDITORIAL_LOCK.md`, `docs/A6_6_PROJECTS.md`,
  `docs/A7_0_AI_LAB_EVIDENCE_LOCK.md`,
  `docs/A7_0_1_AI_LAB_EDITORIAL_LOCK.md`, `docs/A7_1_AI_LAB.md`.
- Implementation: `src/components/AppContent.tsx` (Terminal and Contact),
  `src/components/Desktop.tsx`, `src/components/Profile.tsx`,
  `src/components/Window.tsx`, `src/os/registry.ts`,
  `src/os/profile-sections.ts`, `src/os/types.ts`,
  `src/data/professional/model.ts`, `src/data/professional/selectors.ts`,
  `src/data/professional/types.ts`, `src/data/professional/validation.ts`,
  `src/data/ui.ts`, `src/data/routes.ts`, `src/data/downloads.ts`,
  `src/data/portfolio.ts`, `src/pages/[...path].astro`,
  `src/pages/{,es/,en/}cv.txt.ts`, `src/layouts/Shell.astro`,
  `src/i18n/{core,es}.ts`, `src/styles/{global,aura}.css`.
- Tests: `tests/professional-model.test.ts`, `tests/profile-routing.test.ts`,
  `tests/e2e/{desktop,aura,a3}.spec.ts`.
- Asset and content search across `public/`, `src/`, `docs/`, `tests/` for
  `cv|resume|curriculum|pdf|download|email|linkedin|github|phone|location`,
  plus a repository-wide PDF search (excluding `node_modules/`, `legacy/`,
  `dist/`, `.git/`).
- Private source of career facts: `xenxi/knowledge-vault`
  (`career/master/cv-master.md`) referenced by A7 docs. It is **not** read by
  the build and was **not** opened or copied during this audit. No credentials
  or private contact values were printed.

## Current Terminal Architecture

**ES.** El Terminal es una app Preact dentro del window manager
(`data-window="terminal"`), abierta por la ruta `/terminal/` (equivalente
`/en/terminal/`; `/es/terminal/` es documento de compatibilidad). No es un
shell: es un formulario controlado con un mapa fijo de comandos.

**EN.** Terminal is a Preact app inside the window manager
(`data-window="terminal"`), opened by `/terminal/` (EN `/en/terminal/`;
`/es/terminal/` is a compatibility document). It is not a shell: it is a
controlled form over a fixed command map.

Evidence (`src/components/AppContent.tsx:51-71`):

- Commands are read from the typed model through `getTerminalIndex`:
  `src/data/ui.ts:32` → `src/data/professional/selectors.ts:61-68` →
  `src/data/professional/model.ts:154-156`.
- Route commands are built in-memory as
  `{ id: route }` from `terminalIndex` (`AppContent.tsx:57`).
- Parsing is `input.trim().toLowerCase()` (`AppContent.tsx:59`). No tokenizer,
  no argument grammar, no `open <app>` parsing.
- Navigation routes go through the shell `open(path)` callback
  (`AppContent.tsx:66-67`) → `Desktop.tsx:85-90`, which validates
  `appForPath` + `knownPaths` before opening and pushing history.
- External link: `github` returns `https://github.com/xenxi` as text and is
  rendered as an anchor because the line equals `profile.github`
  (`AppContent.tsx:68,71`).
- Output is a `role="log"` region with `aria-live="polite"`; the input is
  labelled by `Terminal command` (`AppContent.tsx:71`).
- State: `input` and `lines` only (`useState`). Lines are capped at 100
  (`.slice(-100)`). No persistence.
- Initial output: `AntoñiOS [version 1.0]`, a simulated `whoami`, the localized
  role, an empty line and `Type help to explore.` (`AppContent.tsx:56`).
- Registry wiring: `src/os/registry.ts:8,27`; app ID in `src/os/types.ts:1`.
- Desktop auto-opens Terminal only as a side window on the home route at
  `>=1280px` (`Desktop.tsx:121-129`); it is not the only navigation path.

**Functional vs decorative:** the Terminal is genuinely functional for
navigation and identity output, and intentionally decorative for `sudo`,
`reboot`, `theme` and `arcade`. It does **not** execute arbitrary input.

**Keyboard-first, history, autocomplete:** keyboard-operable (Enter submits,
standard text input), but there is **no** command history, **no**
ArrowUp/ArrowDown recall and **no** autocomplete anywhere in `src/`.

**Locale:** command tokens are stable identifiers (English/ASCII) and are not
translated, per A2. Output strings and app labels are localized through `t()`
and the A2 selectors; the initial `whoami` and role are localized. `help`
itself prints the stable token list and is language-neutral.

**Direct routes / JS:** the Terminal is reachable at its own URL; interaction
requires JS. Without JS the SSR shell still renders the initial terminal log
and, more importantly, the desktop icons and Profile actions expose all
professional destinations as real links.

## Current Command Inventory

Legend: `KEEP`, `REFINE`, `ALIAS`, `DEPRECATE`, `REMOVE`, `ADD_LATER`.

| Command | Aliases | Current behavior | Destination / output | ES | EN | Implemented | Legacy | Broken | Useful | Recommended A8 action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `help` | none | Prints fixed token list | `help · whoami · profile · experience · architecture · projects · ai · contact · cv · github · clear · theme · arcade · reboot` | Same tokens (neutral); discovery text ES localized | Same | Yes | No | No | Yes | KEEP |
| `whoami` | none | Identity line | `Antonio Manuel Díaz Moreno — <localized role>` | Localized role | Localized role | Yes | No | No | Yes | KEEP |
| `profile` | none | Opens app | `/profile/` | Opens Profile | Opens Profile | Yes | No | No | Yes | KEEP |
| `experience` | none | Opens app | `/experience/` | Opens Profile → Experience | Same | Yes | No | No | Yes | KEEP |
| `architecture` | none | Opens app | `/architecture/` | Opens Architecture | Same | Yes | No | No | Yes | KEEP |
| `projects` | none | Opens app | `/projects/` | Opens Projects | Same | Yes | No | No | Yes | KEEP |
| `ai` | none | Opens app | `/ai-lab/` | Opens AI Lab | Same | Yes | No | No | Yes | KEEP |
| `contact` | none | Opens app | `/contact/` | Opens Contact | Same | Yes | No | No | Yes | KEEP |
| `cv` | none | Opens CV document | `/cv/` | Opens printable CV section | Same | Yes | No | No | Yes | KEEP / REFINE |
| `github` | none | Prints URL; anchor | `https://github.com/xenxi` | Neutral URL | Neutral URL | Yes | No | No | Yes | KEEP |
| `clear` | none | Empties log | `clear` | Neutral | Neutral | Yes | No | No | Yes | KEEP / REFINE (a11y) |
| `theme` | none | Opens settings | `/settings/` + `Opening theme…` | Localized string | Localized string | Yes | Partial (not a registry app in model) | No | Low | KEEP |
| `arcade` | none | Opens Arcade | `/arcade/` + `Opening arcade…` | Localized string | Localized string | Yes | No | No | Low | KEEP |
| `reboot` | none | Easter egg text | `Have you tried turning it off and on again?` | Localized | Localized | Yes | No | No | Decorative | KEEP |
| `sudo` | none | Easter egg text | `Nice try. Curiosity needs no root access.` | Localized | Localized | Yes | No | No | Decorative | KEEP |
| `about` | — | Not a command | Falls through to unknown | — | — | No | No | No | Medium | ADD_LATER (alias) |
| `career` / `work` | — | Not a command | Unknown | — | — | No | No | No | Medium | ADD_LATER (alias) |
| `resume` | — | Not a command | Unknown | — | — | No | No | No | Medium | ADD_LATER (alias) |
| `linkedin` | — | Not a command | Unknown (link still `preparing`) | — | — | No | No | No | High once approved | ADD_LATER (after P0) |
| `open <app>` | — | Not a command | Unknown | — | — | No | No | No | Low | REJECT for now (see UX) |
| unknown input | — | Inert message | `Command not found. Type help.` | Localized | Localized | Yes | No | No | Yes | KEEP |

**Notes.** `theme`, `arcade`, `reboot` and `sudo` are hardcoded in the component
rather than sourced from `terminalCommands`; that duplication is the main
architectural gap. `linkedin`/`email` are excluded from `getTerminalIndex`
because their availability is `preparing` (`selectors.ts:65`), so they are not
even listed by `help`.

## Terminal UX Findings

**ES.** Hallazgos verificados: prompt inicial con `whoami` simulado y pista
`help`; ejecución con Enter; sin historial ni autocompletado; sin Escape
específico (Escape minimize pertenece a la ventana, no al terminal); `clear`
existe pero borra el log sin conservar contexto accesible; comandos
desconocidos inertes; enlaces externos como anchors reales; integración real con
el window manager (foco, minimizar/restaurar conserva líneas); en pantallas
pequeñas la app ocupa el workspace y el contenido hace scroll; el input móvil no
garantiza visibilidad por encima del teclado (no hay scroll-to-prompt).

**EN.** Verified findings: initial prompt with simulated `whoami` and `help`
hint; Enter execution; no history or autocomplete; no Terminal-specific Escape
(Escape minimize belongs to the window); `clear` exists but wipes the log
without preserving accessible context; unknown commands are inert; external
links are real anchors; real window-manager integration (focus, minimize/
restore keeps lines); on small screens the app fills the workspace and content
scrolls; mobile input visibility above the soft keyboard is not guaranteed (no
scroll-to-prompt).

## Recommended Terminal Contract

**ES.** El Terminal debe seguir siendo una interfaz de navegación de poder para
reclutadores y usuarios técnicos dentro de AntoñiOS, no un emulador Unix.

- Prompt inicial: mantener la identidad y la pista `help`, con rol localizado.
- Descubrimiento: `help` derivado del registro real de comandos.
- Foco: entrada con etiqueta programática; foco visible.
- Ejecución: Enter. Sin ejecución arbitraria.
- Historial: **recomendado añadir** historial de sesión (no persistente) con
  ArrowUp/ArrowDown, porque es barato, esperado y no rompe la arquitectura.
- Escape: devolver foco/limpiar la línea de entrada; no debe cerrar la ventana
  de forma silenciosa.
- `clear`: limpiar el log y anunciar el resultado de forma no agresiva para
  tecnologías de asistencia.
- Desconocidos: mantener inerte el input y el mensaje localizado.
- Alias: `about`→`profile`/`whoami`, `career`/`work`→`experience`,
  `resume`→`cv` solo si se aprueban.
- Móvil: scroll-to-prompt al enfocar; botones táctiles ≥44 px; sin requerir
  teclado físico.
- Lectores de pantalla: `role="log"` con `aria-live="polite"`; evitar anuncios
  excesivos; el comando y su salida deben ser legibles.
- Localización: tokens estables; texto de interfaz en ES/EN.
- Feedback de navegación: mantener `Opening <command>…` localizado.
- Integración: seguir usando el `open()` real del window manager.
- **`open <app>`: no recomendado en A8.1.** Añadiría gramática de argumentos y
  validación sin beneficio sobre un comando por app; la arquitectura actual es
  un mapa fijo y no debe crecer a un parser innecesario.

**EN.** Terminal should remain a power-user / recruiter navigation interface
inside AntoñiOS, not a Unix emulator.

- Initial prompt: keep identity plus `help` hint, localized role.
- Discovery: `help` derived from the real command registry.
- Focus: programmatically labelled input; visible focus.
- Execution: Enter. No arbitrary execution.
- History: **recommended to add** a session (non-persistent) history with
  ArrowUp/ArrowDown, because it is cheap, expected and does not break the
  architecture.
- Escape: return focus / clear the input line; must not silently close the
  window.
- `clear`: clear the log and announce the result without excessive
  announcements to assistive tech.
- Unknown: keep input inert and the message localized.
- Aliases: `about`→`profile`/`whoami`, `career`/`work`→`experience`,
  `resume`→`cv` only if approved.
- Mobile: scroll-to-prompt on focus; touch targets ≥44 px; no physical keyboard
  required.
- Screen readers: `role="log"` with `aria-live="polite"`; avoid excessive
  announcements; command and output must be legible.
- Localization: stable tokens; interface text in ES/EN.
- Navigation feedback: keep localized `Opening <command>…`.
- Integration: keep using the real window-manager `open()`.
- **`open <app>`: not recommended for A8.1.** It would add argument grammar and
  validation with no benefit over one command per app; the current architecture
  is a fixed map and should not grow into an unnecessary parser.

## Terminal Security Boundary

**ES.** LOCK: el Terminal público **no es un shell**. Nunca debe ofrecer
ejecución arbitraria de comandos, acceso a sistema de ficheros, acceso a
entorno, shell de red, acceso a repositorio, secretos, comandos de servidor,
`eval`, `exec`, `child_process` ni ejecución dinámica de URLs arbitrarias. Los
comandos provienen de un registro allowlisted fijo; la entrada desconocida
permanece inerte. `github` solo se resuelve desde el enlace tipado y verificado
del modelo; no se construyen URLs desde la entrada.

**EN.** LOCK: the public Terminal **is not a shell**. It must never provide
arbitrary command execution, filesystem access, environment access, a network
shell, repository access, secrets, server commands, `eval`, `exec`,
`child_process` or dynamic arbitrary URL execution. Commands come from a fixed
allowlisted registry; unknown input stays inert. `github` is resolved only from
the typed, verified model link; URLs are never built from input.

## Current Contact Surface

**ES.** Estado actual verificado:

- Existe una app Contact dedicada en `/contact/` (equivalente `/en/contact/`),
  registrada en `src/os/registry.ts:10`, renderizada en
  `src/components/AppContent.tsx:37`.
- Contact recorre `publicLinks` (`src/data/professional/model.ts:146-151`) y
  muestra enlace real solo cuando `availability === 'available'` y hay URL; en
  caso contrario muestra `En preparación` / `No disponible`.
- `PublicShortcuts` (`src/components/Profile.tsx:31-35`) muestra GitHub y
  LinkedIn; LinkedIn aparece como `Working on it`.
- El launcher (`Desktop.tsx:172`) ofrece CV y `Download CV` (deshabilitado como
  texto cuando no hay asset) y los mismos atajos públicos.
- El Terminal usa `getTerminalIndex`, que **omite** enlaces no disponibles.

**EN.** Verified current state:

- A dedicated Contact app exists at `/contact/` (EN `/en/contact/`), registered
  in `src/os/registry.ts:10`, rendered in `src/components/AppContent.tsx:37`.
- Contact iterates `publicLinks` (`src/data/professional/model.ts:146-151`) and
  renders a real link only when `availability === 'available'` and a URL exists;
  otherwise it shows `Working on it` / `Unavailable`.
- `PublicShortcuts` (`src/components/Profile.tsx:31-35`) shows GitHub and
  LinkedIn; LinkedIn appears as `Working on it`.
- The launcher (`Desktop.tsx:172`) offers CV and `Download CV` (rendered as text
  when no asset exists) and the same public shortcuts.
- Terminal uses `getTerminalIndex`, which **omits** unavailable links.

### Contact facts found in the repository

| Category | Value | Where exposed | Public? | Purpose | Privacy level | Recommended A8 treatment |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub | `https://github.com/xenxi` | model external link; Contact; Profile shortcuts; Terminal; SEO `sameAs` | Yes (available, verified 2026-09-11) | Professional code | PUBLIC_APPROVED | Keep as canonical action |
| Website / domain | `https://antoniomdm.dev` | model external link; Contact | Yes (available, verified 2026-09-11) | Portfolio | PUBLIC_APPROVED | Keep |
| Email | none (availability `preparing`, no URL) | model placeholder; UI shows state only | No | Recruiter contact | NEEDS_HUMAN_CONFIRMATION | Await P0 value before any `mailto:` |
| LinkedIn | none (availability `preparing`, no URL) | model placeholder; Profile shortcut state | No | Professional network | NEEDS_HUMAN_CONFIRMATION | Await P0 URL |
| Telephone | none anywhere in public repo (type allows `phone`) | not shown | No | Optional | NEEDS_HUMAN_CONFIRMATION | Default: do not publish |
| Location | none published | not shown | No | Context | NEEDS_HUMAN_CONFIRMATION | Candidate Linares (Jaén), España — needs approval |
| Remote availability | none published; test asserts absent (`tests/e2e/aura.spec.ts:19`) | not shown | No | Recruiter signal | NEEDS_HUMAN_CONFIRMATION | Needs approval before adding |
| Contact form | none | — | No | — | NOT_FOUND | Reject (see Rejected Options) |
| Analytics | none in the portfolio | — | No | — | NOT_FOUND | Do not add |

No credential, secret or private contact literal was found in the public tree.
Full name (`Antonio Manuel Díaz Moreno`) is intentionally public.

## Contact Data Classification

**ES.** El modelo A2 ya separa disponibilidad (`available` / `preparing` /
`unavailable`) y el validador impide URLs ficticias o inconsistentes
(`src/data/professional/validation.ts:113-118`). Eso significa que hoy no hay
ningún dato de contacto inventado.

**EN.** The A2 model already separates availability and the validator prevents
fake or inconsistent URLs. This means there is currently no invented contact
data.

## Recommended Contact Architecture

**ES.** Mantener **una única fuente tipada**. Recomendación: extender el modelo
profesional existente (`externalLinks` ya es el dueño de email/LinkedIn/GitHub/
website) con campos de contacto no-enlace (ubicación, modalidad remota) en un
tipo `ContactInfo` derivado, no duplicado. Contact, Terminal, Profile y el CV
deben consumir el mismo selector. No duplicar literales de email/LinkedIn/GitHub
en componentes.

Opciones evaluadas:

- **A. App Contact dedicada:** ya existe. Mantenerla como destino canónico.
- **B. Contacto dentro de Profile:** ya existe como shortcut; no debe convertirse
  en la fuente principal.
- **C. `contact` del Terminal abriendo la app:** ya ocurre; conservar.
- **D. Combinación con fuente única:** **recomendada.**

**EN.** Keep **one typed source**. Recommendation: extend the existing
professional model (`externalLinks` already owns email/LinkedIn/GitHub/website)
with non-link contact fields (location, remote) into a derived `ContactInfo`
type, not a duplicate. Contact, Terminal, Profile and CV must consume the same
selector. Do not duplicate email/LinkedIn/GitHub literals across components.

Options evaluated:

- **A. Dedicated Contact app:** already exists. Keep as the canonical target.
- **B. Contact inside Profile:** already exists as a shortcut; it must not
  become the primary source.
- **C. Terminal `contact` opening the app:** already happens; keep.
- **D. Combination over a single source of truth:** **recommended.**

## Contact Actions

**ES.**

- Enviar email (`mailto:`): solo tras aprobación P0 del valor.
- Abrir LinkedIn: solo tras aprobación P0 de la URL.
- Abrir GitHub: disponible hoy.
- Abrir sitio web: disponible hoy.
- Copiar email: solo tras aprobación P0; es una mejora de usabilidad frente a
  exponer el literal en texto plano.
- Teléfono (`tel:`): **solo con aprobación humana explícita.**
- Formulario con backend/BD/CAPTCHA/servicio de email: **rechazado** por defecto
  (portfolio estático sin requisito demostrado).

**EN.**

- Send email (`mailto:`): only after P0 approval of the value.
- Open LinkedIn: only after P0 approval of the URL.
- Open GitHub: available now.
- Open website: available now.
- Copy email: only after P0 approval; a usability improvement over exposing the
  literal in plain text.
- Telephone (`tel:`): **only with explicit human approval.**
- Backend/database/CAPTCHA/email-service form: **rejected** by default (static
  portfolio without demonstrated need).

## Current CV State

**ES.** **No existe ningún PDF de CV** en el repositorio (búsqueda global de
`*.pdf` fuera de `node_modules/`, `legacy/`, `dist/`, `.git/`). El estado
`preparing` del modelo es correcto. Lo que sí existe:

- CV imprimible/legible en `/cv/` (sección Profile, `Profile.tsx:64`), con
  `Print / Save PDF`.
- CV de texto real generado desde el modelo en `/cv.txt`, `/es/cv.txt`,
  `/en/cv.txt` (`src/data/downloads.ts`, `src/pages/{,es/,en/}cv.txt.ts`).
- Capturas de QA de estados ES/EN en `docs/quality/a3/screenshots/a3/`.

Clasificación de cada artefacto de CV:

| Asset | Classification | Notes |
| --- | --- | --- |
| `/cv/` printable Profile section | `CURRENT_APPROVED` | Derived from the locked model at request/build time |
| `/cv.txt`, `/es/cv.txt`, `/en/cv.txt` | `CURRENT_APPROVED` | Real text download generated from the model |
| PDF ES/EN (`cvVariants[].pdf`) | `NOT_FOUND` | Availability `preparing`; no file, no path |
| Any other `cv/resume/curriculum` file | `NOT_FOUND` | None found |

**EN.** **No CV PDF exists** in the repository (global `*.pdf` search outside
`node_modules/`, `legacy/`, `dist/`, `.git/`). The model's `preparing` state is
correct. What does exist:

- A printable/readable CV at `/cv/` (Profile section, `Profile.tsx:64`), with
  `Print / Save PDF`.
- A real text CV generated from the model at `/cv.txt`, `/es/cv.txt`,
  `/en/cv.txt` (`src/data/downloads.ts`, `src/pages/{,es/,en/}cv.txt.ts`).
- QA screenshots of ES/EN states in `docs/quality/a3/screenshots/a3/`.

## CV Consistency Audit

**ES.** El CV de texto se genera directamente desde el modelo, por lo que es
consistente por construcción: titular, experiencia, fechas, competencias,
educación, idiomas y enlaces salen de los mismos selectores. No hay un PDF que
pueda divergir. No se abrió `knowledge-vault` ni ningún CV privado.

**EN.** The text CV is generated directly from the model, so it is consistent by
construction: headline, experience, dates, competencies, education, languages
and links come from the same selectors. There is no PDF that could diverge.
`knowledge-vault` and any private CV were not opened.

## Recommended CV Contract

**ES.**

- `professional model` = fuente de verdad factual y pública.
- `CV` = representación documental curada de la misma evidencia bloqueada.
- El CV no puede introducir nuevos empleadores, métricas, títulos, claims de IA,
  formación, fechas ni niveles de idioma sin evidencia.
- Hasta que exista un PDF aprobado, mantener el CV imprimible y el TXT como
  artefactos canónicos; los PDFs ES/EN permanecen `preparing`.
- Cuando se apruebe un PDF, registrarlo en `CvVariant.pdf` con `availability`,
  `path`, `filename`, `mime` y `verifiedAt` (el validador ya lo exige:
  `validation.ts:119-124`). Solo assets `approved` entran en el registro.

**EN.**

- `professional model` = factual/public source of truth.
- `CV` = curated document representation of that same locked evidence.
- The CV must not introduce new employers, metrics, titles, AI claims,
  education, dates or language proficiency without evidence.
- Until an approved PDF exists, keep the printable CV and the TXT as canonical
  artifacts; ES/EN PDFs remain `preparing`.
- When a PDF is approved, register it in `CvVariant.pdf` with `availability`,
  `path`, `filename`, `mime` and `verifiedAt` (the validator already requires
  it). Only `approved` assets enter the registry.

## CV Language Strategy

**ES.** Recomendación (no vinculante): dos artefactos PDF estables, si se
aprueban:

- `/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf`
- `/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf`

Sin números de versión en URLs públicas (`cv-final-v3-new.pdf` **no**). Hoy la
convención de assets estáticos es `public/` en la raíz; un subdirectorio
`public/cv/` es una elección estable y compatible. No crear ni copiar archivos
en A8.0.

**EN.** Recommendation (non-binding): two stable PDF artifacts, if approved:

- `/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf`
- `/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf`

No version numbers in public URLs (`cv-final-v3-new.pdf` is **not** allowed).
Today the static asset convention is root `public/`; a `public/cv/`
subdirectory is a stable, compatible choice. Do not create or copy files in
A8.0.

## Education Boundary

**ES.** LOCK preservado en `model.ts:121`: «Ingeniería Técnica en Informática
de Gestión — Escuela Politécnica Superior de Córdoba. Estudios cursados salvo el
proyecto final; título no obtenido.» No se implica título. Ningún CV público
existente lo contradice. No se cambia la redacción.

**EN.** LOCK preserved in `model.ts:121`: “Technical Engineering in Management
Information Systems — Escuela Politécnica Superior de Córdoba. Coursework
completed except the final project; degree not awarded.” No degree is implied.
No existing public CV contradicts it. Wording is not changed.

## Language Boundary

**ES.** LOCK preservado en `model.ts:121`: español nativo; inglés con lectura y
comprensión técnica avanzadas y conversación profesional en desarrollo. **No**
se introducen `B2`, `C1`, `fluent` ni `professional proficiency`.

**EN.** LOCK preserved in `model.ts:121`: native Spanish; English with advanced
technical reading/comprehension and developing professional conversation. **No**
`B2`, `C1`, `fluent` or `professional proficiency` is introduced.

## Professional Positioning Boundary

**ES.** LOCK: titular principal `Software Architect | Senior .NET Engineer`
(`model.ts:117`). No cambiar a AI Engineer, AI Architect, Machine Learning
Engineer, Data Scientist ni Tech Lead. A7.0.1 fijó el posicionamiento de apoyo
como `Distributed Systems · Engineering Excellence · Applied AI`; la `focusLine`
actual del modelo es `.NET · Distributed Systems · Legacy Modernization ·
Applied AI`. **Discrepancia registrada (P1, no P0):** A8.1 no debe cambiar el
modelo por iniciativa propia; si el CV/Contact necesitan una línea de foco, usar
el posicionamiento bloqueado y confirmar la armonización con Antonio.

**EN.** LOCK: primary headline `Software Architect | Senior .NET Engineer`
(`model.ts:117`). Do not change to AI Engineer, AI Architect, Machine Learning
Engineer, Data Scientist or Tech Lead. A7.0.1 locked the supporting positioning
as `Distributed Systems · Engineering Excellence · Applied AI`; the current
model `focusLine` is `.NET · Distributed Systems · Legacy Modernization ·
Applied AI`. **Discrepancy recorded (P1, not P0):** A8.1 must not change the
model on its own initiative; if CV/Contact need a focus line, use the locked
positioning and confirm harmonization with Antonio.

## Professional Metrics Boundary

**ES.** Solo métricas ya bloqueadas:

- Suite de integración mayor `~60 min → ~2 min` (aproximado).
- `~1–2` llamadas API síncronas eliminadas por evento relevante en las
  integraciones afectadas (aproximado).

Prohibido inventar porcentajes de productividad, ahorro de costes, latencia,
usuarios, ingresos o productividad de IA.

**EN.** Only previously locked metrics:

- Largest integration suite `~60 min → ~2 min` (approximate).
- `~1–2` synchronous API calls removed per relevant event in affected
  integrations (approximate).

Inventing productivity percentages, cost savings, latency percentages, user
counts, revenue or AI productivity percentages is prohibited.

## Personal Data / Privacy Matrix

| Item | Current public state | Classification | Recommended A8 treatment |
| --- | --- | --- | --- |
| Full name (Antonio Manuel Díaz Moreno) | Published | PUBLIC | Keep |
| City/province (Linares, Jaén) | Not published | OPTIONAL_PUBLIC / NEEDS_HUMAN_CONFIRMATION | Wait for P0 |
| Country (España) | Not published | OPTIONAL_PUBLIC / NEEDS_HUMAN_CONFIRMATION | Wait for P0 |
| Remote availability | Not published | OPTIONAL_PUBLIC / NEEDS_HUMAN_CONFIRMATION | Wait for P0 |
| Email | Placeholder only | NEEDS_HUMAN_CONFIRMATION | Wait for P0 value |
| Telephone | Absent | PRIVATE by default / NEEDS_HUMAN_CONFIRMATION | Do not publish unless explicit P0 |
| LinkedIn | Placeholder only | NEEDS_HUMAN_CONFIRMATION | Wait for P0 URL |
| GitHub | Published | PUBLIC | Keep |
| Domain / website | Published | PUBLIC | Keep |
| Photo / portrait | Intentionally none; SVG PixelAvatar | NOT_NEEDED | Do not require a real portrait |
| Family information | Absent | PRIVATE | Never publish |
| Date of birth / age | Absent | NOT_NEEDED | Do not introduce without explicit approval |
| Home address | Absent | PRIVATE | Never publish |

## No-JS Contract

**ES.** LOCK: el Terminal es una mejora, **nunca el único mecanismo de
navegación**. Sin JS, el HTML SSR ya expone iconos de escritorio y acciones
profesionales como enlaces reales (`Desktop.tsx:167`, `Profile.tsx:52`), por lo
que se puede alcanzar Profile, Experience, Architecture, Projects, AI Lab,
Contact y CV (imprimible/TXT). Si en A8.1 se añaden acciones de Contact/CV,
deben seguir existiendo como enlaces HTML reales sin JS.

**EN.** LOCK: Terminal is an enhancement, **never the only navigation
mechanism**. Without JS, the SSR HTML already exposes desktop icons and
professional actions as real links (`Desktop.tsx:167`, `Profile.tsx:52`), so
Profile, Experience, Architecture, Projects, AI Lab, Contact and CV
(printable/TXT) remain reachable. If A8.1 adds Contact/CV actions, they must
remain real HTML links without JS.

## Mobile Contract

**ES.** LOCK para A8.1: teclado blando soportado sin teclado físico;
scroll-to-prompt al enfocar; controles de historial/alías táctiles ≥44 px;
tamaño de ventana sin overflow horizontal; Contact y CV con acciones táctiles.
Hoy el Terminal funciona en móvil dentro de la ventana, pero no garantiza
visibilidad del input sobre el teclado.

**EN.** LOCK for A8.1: soft keyboard supported without a physical keyboard;
scroll-to-prompt on focus; touch history/alias controls ≥44 px; window size
without horizontal overflow; Contact and CV with touch-friendly actions. Today
Terminal works on mobile inside the window but does not guarantee input
visibility above the keyboard.

## Accessibility Contract

**ES.** LOCK para A8.1:

- Terminal: semántica real de input, etiqueta programática (`Terminal command`),
  foco visible, `role="log"`/`aria-live="polite"` sin anuncios excesivos,
  operación por teclado, sin trampa de foco; `clear` no debe destruir el
  contexto de accesibilidad de forma inesperada.
- Contact: enlaces descriptivos, foco visible, objetivos prácticos de 44 px.
- CV: el enlace debe identificar idioma y comportamiento PDF/descarga; no
  depender solo de un icono.
- Axe: 0 violaciones serias y 0 críticas.

**EN.** LOCK for A8.1:

- Terminal: real input semantics, programmatic label (`Terminal command`),
  visible focus, `role="log"`/`aria-live="polite"` without excessive
  announcements, keyboard operation, no focus trap; `clear` must not destroy
  accessibility context unexpectedly.
- Contact: descriptive links, visible focus, practical 44 px targets.
- CV: the link must identify language and PDF/download behavior; do not rely on
  an icon alone.
- Axe: 0 serious and 0 critical violations.

## Routing Contract

**ES.** Rutas actuales: `/terminal/` y `/en/terminal/` (app del window
manager); `/contact/` y `/en/contact/` (app dedicada existente); `/cv/` y
`/en/cv/` (documento imprimible); `/cv.txt`, `/es/cv.txt`, `/en/cv.txt`
(assets de texto generados). Recomendación: **no inventar rutas públicas
nuevas**. Terminal y Contact siguen siendo apps del registro; los PDFs de CV,
si se aprueban, son assets estáticos estables (`/cv/...pdf`), no rutas SPA
falsas.

**EN.** Current routes: `/terminal/` and `/en/terminal/` (window-manager app);
`/contact/` and `/en/contact/` (existing dedicated app); `/cv/` and `/en/cv/`
(printable document); `/cv.txt`, `/es/cv.txt`, `/en/cv.txt` (generated text
assets). Recommendation: **do not invent new public routes**. Terminal and
Contact remain registry apps; CV PDFs, if approved, are stable static assets
(`/cv/...pdf`), not fake SPA routes.

## Analytics Boundary

**ES.** El portfolio **no incluye analítica**. No se añade en A8. Solo si en el
futuro existe una arquitectura de analítica propia, se podrían registrar eventos
genéricos (CV download, LinkedIn click, GitHub click, email click). Nunca enviar
como payload: dirección de email, teléfono, contenido del CV ni comandos del
Terminal. No se añade analítica en A8.0.

**EN.** The portfolio **includes no analytics**. None is added in A8. Only if an
owned analytics architecture exists in the future could generic events be
recorded (CV download, LinkedIn click, GitHub click, email click). Never send as
payload: email address, telephone, CV contents or Terminal commands. No
analytics is added in A8.0.

## Recommended A8.1 Command Registry

| Canonical | Aliases | Action | Localized output | Requires JS | Fallback | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| `help` | — | List registry commands | Yes (interface text) | Yes | Static links elsewhere | Discovery |
| `profile` | `about`, `whoami` (see note) | Open `/profile/` | `Opening profile…` | Yes | Profile real link | Primary identity |
| `experience` | `career`, `work` | Open `/experience/` | `Opening experience…` | Yes | Profile link | Career |
| `architecture` | — | Open `/architecture/` | `Opening architecture…` | Yes | Desktop icon | Case studies |
| `projects` | — | Open `/projects/` | `Opening projects…` | Yes | Desktop icon | Work |
| `ai` | — | Open `/ai-lab/` | `Opening ai…` | Yes | Desktop icon | Applied AI |
| `cv` | `resume` | Open `/cv/` | `Opening cv…` | Yes | `/cv/` link + TXT | CV access |
| `contact` | — | Open `/contact/` | `Opening contact…` | Yes | Desktop icon | Recruiter path |
| `github` | — | Show verified URL | Neutral URL | Yes | Profile shortcut | Code |
| `linkedin` | — | Show verified URL | Neutral URL | Yes | Profile shortcut | Only after P0 |
| `clear` | — | Clear log | Neutral | Yes | — | Housekeeping |
| `theme` | — | Open `/settings/` | `Opening theme…` | Yes | Settings real link | Existing easter egg |
| `arcade` | — | Open `/arcade/` | `Opening arcade…` | Yes | Desktop icon | Existing app |
| `reboot` | — | Decorative text | Localized | Yes | — | Existing easter egg |
| `sudo` | — | Decorative text | Localized | Yes | — | Existing boundary joke |

**Note / Nota.** `whoami` should keep printing identity; `about` as an alias of
`profile` must be confirmed so it does not collide with `whoami`. A8.1 must move
the hardcoded commands (`theme`, `arcade`, `reboot`, `sudo`) and aliases into the
typed registry so `help` and behavior cannot drift.

## Proposed Contact Data Contract

**ES.** Conceptual (no implementado):

```ts
interface ContactInfo {
  displayName: string;
  location?: LocalizedText;   // only if P0 approves
  remote?: boolean;           // only if P0 approves
  email?: string;             // only if P0 approves
  linkedin?: string;          // only if P0 approves
  github: string;             // available today
  website: string;            // available today
  phone?: string;             // only if explicit P0 approval
}
```

Debe derivarse de `professional/model.ts` (extendiendo `ExternalLink` y el
perfil), no ser un segundo almacén de hechos.

**EN.** Conceptual (not implemented): derive `ContactInfo` from
`professional/model.ts` (extending `ExternalLink` and the profile); it must not
become a second factual store.

## Proposed CV Asset Contract

**ES.** Conceptual (no implementado):

```ts
interface CvAsset {
  locale: 'es' | 'en';
  publicPath: string;
  filename: string;
  mime: string;
  label: LocalizedText;
  status: 'approved' | 'preparing' | 'unavailable';
  verifiedAt: string;
}
```

Solo assets **aprobados** entran en este registro. El validador existente ya
exige el conjunto completo de campos cuando `availability === 'available'`.

**EN.** Only **approved** assets enter this registry. The existing validator
already requires the full field set when `availability === 'available'`.

## P0 Human Questions

`P0 Human Questions Remaining: 0` — all five were resolved by
`docs/A8_0_1_TERMINAL_CONTACT_CV_EDITORIAL_LOCK.md` (see
[Human Decisions Resolved](#human-decisions-resolved)). The original questions
are preserved below for historical reference.

1. **Email público — RESOLVED:** authorized value
   `antoniom.diaz.moreno@gmail.com`. *Original question:* ¿qué dirección de email
   profesional se autoriza para el portfolio? *Why required:* habilita
   `mailto:`/copiar email; hoy no existe valor alguno. *Safe default:* mantener
   `preparing`; sin `mailto:`.
2. **LinkedIn — RESOLVED:** authorized value
   `https://www.linkedin.com/in/antoniomanueldiazmoreno`. *Original question:*
   ¿cuál es la URL pública del perfil? *Why required:* habilita la acción y el
   comando `linkedin`. *Safe default:* mantener `preparing`; sin enlace.
3. **Ubicación y modalidad — RESOLVED:** publish `Linares (Jaén), España` +
   `Remoto` (EN `Linares (Jaén), Spain` + `Remote`). *Original question:* ¿se
   publican `Linares (Jaén), España` y/o `Remote / remoto`? *Why required:* son
   datos personales nuevos, no presentes en el modelo. *Safe default:* no
   publicar.
4. **Teléfono — RESOLVED:** not published on the web; permitted only inside the
   downloadable CV artifact. *Original question:* ¿se publica un teléfono de
   contacto? *Why required:* dato personal sensible; el tipo lo permite pero no
   hay valor. *Safe default:* no publicar; sin acción `tel:`.
5. **CV aprobado — RESOLVED:** keep printable + TXT ES/EN; create and validate
   definitive PDF CV ES and PDF CV EN in A8.1. *Original question:* ¿qué
   artefacto exacto se aprueba publicar y en qué idiomas/formatos (ES/EN, PDF y/o
   TXT)? *Why required:* no existe ningún PDF y no se debe publicar un CV solo
   porque exista. *Safe default:* no publicar PDF; mantener CV imprimible y TXT
   generados del modelo.

## P1 Refinements

1. Harmonize the model `focusLine` (`.NET · Distributed Systems · Legacy
   Modernization · Applied AI`) with the A7.0.1 locked supporting positioning
   (`Distributed Systems · Engineering Excellence · Applied AI`), with human
   confirmation.
2. Add session command history (ArrowUp/ArrowDown) and Escape-to-clear-input to
   Terminal.
3. Move `theme`, `arcade`, `reboot`, `sudo` and any aliases from hardcoded
   component strings into the typed registry.
4. Add scroll-to-prompt and touch history controls for mobile.
5. Prefer a copy-email action over a raw visible email if P0 approves the
   address.
6. Decide whether `about` aliases `profile` or `whoami` to avoid ambiguity.
7. Confirm the eventual PDF naming/path convention (`/cv/...-es.pdf`,
   `/cv/...-en.pdf`) before creating assets.

## Rejected Options

**ES/EN.**

- Real shell execution / ejecución real de shell.
- Arbitrary URLs from Terminal input / URLs arbitrarias desde la entrada.
- Filesystem Terminal commands / comandos de sistema de ficheros.
- Backend contact form / formulario de contacto con backend.
- Database for contact / base de datos para contacto.
- CAPTCHA / email service without requirement / CAPTCHA o servicio de email sin
  requisito.
- Publishing an unapproved CV / publicar un CV no aprobado.
- Publishing home address or family information / publicar dirección o
  información familiar.
- Making Terminal the only navigation / hacer del Terminal la única navegación.
- Duplicating contact literals across components / duplicar literales de
  contacto entre componentes.
- Fake AI terminal assistant / asistente de IA falso en el Terminal.
- CV content inconsistent with the professional model / contenido de CV
  inconsistente con el modelo profesional.
- `open <app>` argument grammar in A8.1 / gramática de argumentos `open <app>`.

## Evidence Gaps

- `xenxi/knowledge-vault` (private CV master) was not read; no private CV values
  were compared or copied.
- No PDF or binary CV asset exists to inspect for factual drift.
- No manual screen-reader or physical-device testing was performed for Terminal,
  Contact or CV.
- No current analytics architecture exists to attach events to.
- The exact approved email/LinkedIn/location/remote/telephone values are not in
  the repository and require Antonio.

## Proposed Next Milestone

**A8.0.1 Human Editorial Lock** — resolve the 5 P0 questions above and record
Antonio's decisions before any A8.1 implementation. Even though no source code
needs to change for A8.0.1, the privacy/UX decisions must be locked
deterministically first. A8.1 (Terminal/Contact/CV implementation) must not
start while P0 remains open.

**A8.0.1 Bloqueo Editorial Humano** — resolver las 5 preguntas P0 y registrar
las decisiones de Antonio antes de cualquier implementación A8.1. A8.1
(implementación de Terminal/Contact/CV) no debe comenzar mientras quede P0
abierto.
