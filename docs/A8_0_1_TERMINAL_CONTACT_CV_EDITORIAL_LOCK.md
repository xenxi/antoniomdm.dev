# A8.0.1 Terminal + Contact + CV Human Editorial Lock

## Status

`READY_FOR_VERSIONING` — human-only A8.0 privacy/publication decisions are
resolved and converted into a deterministic implementation contract for A8.1.
This document is editorial only: it does not implement A8, does not modify
product code, tests, routes, dependencies or workflows, does not create PDFs,
does not copy CV files into public assets, and has not been committed, pushed or
deployed.

`READY_FOR_VERSIONING` — las decisiones humanas de privacidad/publicación de
A8.0 están resueltas y convertidas en un contrato de implementación determinista
para A8.1. Este documento es solo editorial: no implementa A8, no modifica código
de producto, tests, rutas, dependencias ni workflows, no crea PDFs, no copia
archivos de CV en assets públicos y no ha sido commiteado, pusheado ni
desplegado.

Baseline: branch `codex/antonios-aura-pixel`, HEAD
`85e7ea8954265bdbcaaaf3745a857fc955f43d0d`.

## Human Decisions

The following human-approved decisions are authoritative and override the safe
defaults recorded in `docs/A8_0_TERMINAL_CONTACT_CV_EVIDENCE_LOCK.md`.

- **P0-1 Public professional email — RESOLVED:** publish
  `antoniom.diaz.moreno@gmail.com` in the Contact app, Profile/contact
  shortcuts, Terminal `contact`, CV, `mailto:` links and the copy-email action.
  No other email is published unless separately approved.
- **P0-2 Public LinkedIn — RESOLVED:** publish
  `https://www.linkedin.com/in/antoniomanueldiazmoreno` in Contact, Profile,
  Terminal, CV and external professional links. No tracking parameters.
- **P0-3 Public location / remote — RESOLVED:** publish ES
  `Linares (Jaén), España · Remoto` and EN `Linares (Jaén), Spain · Remote` in
  Contact, Profile, CV and the professional summary where contextually useful.
  Street address, postal address, exact home location and coordinates are not
  published.
- **P0-4 Telephone — RESOLVED:** not published on the interactive website. The
  telephone may remain only inside the downloadable CV artifact.
- **P0-5 CV strategy — RESOLVED:** keep printable CV + TXT ES/EN; A8.1 creates
  and validates the definitive PDF CV ES and PDF CV EN from the locked model.

**ES.** Estas cinco decisiones son las únicas fuentes autorizadas para los datos
de contacto y la política de CV de A8. Ninguna otra dirección, URL o dato
personal se publica sin una nueva aprobación humana explícita.

## Public Contact Data

Canonical public contact dataset for A8.

| Field | Value | Publication |
| --- | --- | --- |
| Name | Antonio Manuel Díaz Moreno | Public |
| Location ES | Linares (Jaén), España | Public |
| Location EN | Linares (Jaén), Spain | Public |
| Availability ES | Remoto | Public |
| Availability EN | Remote | Public |
| Email | `antoniom.diaz.moreno@gmail.com` | Public |
| LinkedIn | `https://www.linkedin.com/in/antoniomanueldiazmoreno` | Public |
| GitHub | `https://github.com/xenxi` | Public |
| Website | `https://antoniomdm.dev` | Public |
| Telephone | `NOT_PUBLIC_ON_WEB` | Private web / CV-only |
| Photo | `NOT_REQUIRED` | Not published |
| Family data | `PRIVATE` | Never published |
| Home address | `PRIVATE` | Never published |
| Age / date of birth | `NOT_NEEDED` | Never published |

## Contact UX Contract

**ES.** La app Contact dedicada existente (`/contact/`, `/en/contact/`) se
conserva; no se sustituye por un formulario con backend.

Actions required:

- Send email → `mailto:antoniom.diaz.moreno@gmail.com` (real link, works without
  JS).
- Open LinkedIn → verified profile URL.
- Open GitHub → verified profile URL.
- Open website → verified domain.
- Copy email → progressive enhancement; never the only way to reach the address.

**EN.** The existing dedicated Contact app (`/contact/`, `/en/contact/`) is
kept; it is not replaced by a backend form. The actions above are required.
Telephone has no web action.

## Terminal Product Contract

**ES.** El Terminal sigue siendo una interfaz de navegación de poder para
reclutadores y usuarios técnicos dentro de AntoñiOS. No es un shell real, ni un
emulador Unix, ni un asistente de IA, ni un ejecutor arbitrario de comandos.
A8.1 refina el Terminal existente; no lo reemplaza.

**EN.** Terminal remains a power-user / recruiter navigation interface inside
AntoñiOS. It is not a real shell, a Unix emulator, an AI assistant or an
arbitrary command executor. A8.1 refines the existing Terminal; it does not
replace it.

## Terminal Command Contract

Canonical command set for A8.1:

`help`, `whoami`, `profile`, `experience`, `architecture`, `projects`, `ai`,
`contact`, `cv`, `github`, `linkedin`, `clear`, `theme`, `arcade`, `reboot`,
`sudo`.

Existing commands remain unless a concrete regression or architecture issue
requires otherwise. Recommended aliases:

- `about` → `profile` (single deterministic target; `whoami` keeps
  terminal-flavored identity output).
- `career` → `experience`.
- `work` → `experience`.
- `resume` → `cv`.

Explicitly not implemented: `open <app>` and arbitrary argument parsing.

Command tokens are stable English-like identifiers and are **not** translated
between locales; output, `help` descriptions and localized strings are ES/EN.

## Terminal Security Boundary

**ES.** LOCK: el Terminal público permanece estrictamente allowlisted. Prohibido:
`eval`, constructor `Function`, `child_process`, shell, sistema de ficheros,
acceso a entorno, acceso a repositorio, ejecución de URLs arbitrarias, ejecución
dinámica de scripts, comandos definidos por el usuario y ejecución de comandos de
red. La entrada desconocida permanece inerte y muestra el mensaje localizado. Las
URLs se resuelven únicamente desde el modelo tipado y verificado; nunca se
construyen desde la entrada.

**EN.** LOCK: the public Terminal stays strictly allowlisted. Forbidden: `eval`,
`Function` constructor, `child_process`, shell, filesystem, environment access,
repository access, arbitrary URL execution, dynamic script execution,
user-defined commands and network command execution. Unknown input stays inert
with the localized message. URLs resolve only from the typed, verified model;
they are never built from input.

## Terminal Accessibility Contract

**ES.** A8.1 debe incluir:

- input real con etiqueta programática (`Terminal command`);
- foco visible;
- manejo lógico de teclado (Enter ejecuta);
- sin trampa de teclado;
- salida/log accesible (`role="log"`, `aria-live="polite"`, sin anuncios
  excesivos);
- `clear` que conserva el contexto accesible/prompt y devuelve el foco al input;
- Escape que limpia únicamente la entrada actual, sin cerrar de forma inesperada
  la ventana completa (salvo que el comportamiento global de ventanas de
  AntoñiOS lo requiera).

**EN.** A8.1 must include real input with a programmatic label, visible focus,
logical keyboard handling, no keyboard trap, accessible output/log, and a
`clear` that preserves accessible context and returns focus to the input. Escape
clears the current input only.

## Terminal Mobile Contract

**ES.** A8.1 debe soportar el uso móvil del Terminal:

- el input permanece visible al abrirse el teclado blando;
- el scroll sigue el prompt actual (scroll-to-prompt);
- sin overflow horizontal;
- objetivos táctiles ≥44 px donde existan controles;
- la interacción con el historial no debe requerir teclado físico si se ofrecen
  controles visibles.

No se sobreconstruye una barra de herramientas móvil salvo que las pruebas
demuestren que es necesaria.

**EN.** A8.1 must support mobile Terminal use: input visible above the soft
keyboard, scroll-follows-prompt, no horizontal overflow, practical 44 px touch
targets, and history interaction not requiring a physical keyboard when visible
controls are provided. A mobile toolbar is not overbuilt unless testing shows it
is needed.

## CV Publication Strategy

**ES.** Estrategia aprobada: mantener el CV imprimible y los CV de texto (TXT ES
y TXT EN). Crear en A8.1 los PDF definitivos ES y EN, generados/curados desde el
modelo profesional ya bloqueado. Los PDFs no quedan autorizados por existir
archivos locales; A8.1 debe validarlos antes de publicarlos. Estado objetivo
aprobado: PDF ES, PDF EN, versión imprimible, TXT de respaldo ES, TXT de respaldo
EN.

**EN.** Approved strategy: keep the printable CV and the TXT CVs (TXT ES and
TXT EN). Create in A8.1 the definitive ES and EN PDFs from the already locked
professional model. They are not authorized merely by existing local files;
A8.1 must validate them before publication. Approved target state: ES PDF,
EN PDF, printable version, TXT fallback ES, TXT fallback EN.

## CV Source-of-Truth Contract

**ES.** El modelo profesional/público permanece como fuente de verdad factual.
PDF, TXT e imprimible no deben divergir de él. No se introducen en el CV nuevos
empleadores, títulos, claims de IA, métricas, fechas de empleo, formación ni
niveles de idioma sin un futuro evidence lock explícito.

**EN.** The professional/public data model remains the factual source of truth.
PDF, TXT and printable CVs must not diverge from it. No new employer claims,
title claims, AI claims, metrics, employment dates, education claims or language
proficiency claims are introduced without a future explicit evidence lock.

## CV ES/EN Contract

**ES.** Deben existir dos PDFs estables. Rutas públicas preferidas:

- `/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf`
- `/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf`

Si la arquitectura actual de assets estáticos prefiere otra ubicación estable,
A8.1 puede adaptar el directorio conservando nombres semánticos estables, sin
números de versión, sin `final`, sin `v3` y sin nombres temporales. El CV PDF debe
orientarse a reclutadores y ser conciso (preferiblemente 2 páginas si sigue
siendo legible y preciso). ES y EN deben ser equivalentes editoriales, no copias
mezcladas mecánicamente.

**EN.** Two stable PDFs must exist at the preferred public paths above. If the
current static-asset architecture strongly prefers another stable location, A8.1
may adapt the directory while preserving stable semantic filenames, with no
version numbers, no `final`, no `v3` and no temporary naming. The PDF CV should
be recruiter-oriented and concise (preferably 2 pages if readable and accurate).
ES and EN must be editorial equivalents, not mechanically mixed-language copies.

## CV Positioning Boundary

**ES.** Titular principal: `Software Architect | Senior .NET Engineer`.
Posicionamiento de apoyo: `Distributed Systems · Engineering Excellence · Applied
AI`. El CV no se titula como AI Engineer, AI Architect, Machine Learning Engineer
ni Data Scientist. Applied AI es una especialización/dirección, no una profesión
sustitutiva.

**EN.** Primary professional title: `Software Architect | Senior .NET Engineer`.
Supporting positioning: `Distributed Systems · Engineering Excellence · Applied
AI`. The CV is not titled AI Engineer, AI Architect, Machine Learning Engineer or
Data Scientist. Applied AI is a specialization/direction, not a replacement
profession.

## CV Education Boundary

**ES.** La formación debe preservar el límite factual previamente aprobado:
Ingeniería Técnica en Informática de Gestión — Escuela Politécnica Superior de
Córdoba. Estudios cursados salvo el proyecto final / equivalente aprobado. Título
no obtenido. No se escribe Bachelor, Graduate, Degree awarded ni University
degree completed.

**EN.** Education must preserve the previously approved factual boundary:
Technical Engineering in Management Information Systems — Escuela Politécnica
Superior de Córdoba. Coursework completed except the final project / approved
equivalent. Degree not awarded. Do not write Bachelor, Graduate, Degree awarded
or University degree completed.

## CV Language Boundary

**ES.** Español: nativo. Inglés: lectura/comprensión técnica avanzada y
conversación profesional en desarrollo. No se publica `B2`, `C1`, `fluent` ni
`full professional proficiency` sin evidencia futura.

**EN.** Spanish: Native. English: advanced technical reading/comprehension and
developing professional conversation. Do not publish `B2`, `C1`, `fluent` or
`full professional proficiency` without future evidence.

## CV Metrics Boundary

**ES.** Solo pueden aparecer métricas profesionales ya bloqueadas:

- suite de integración: `~60 min → ~2 min`;
- derivada: `≈30x` solo donde se enmarque explícitamente como aritmética
  derivada;
- resúmenes de eventos: `~1–2` llamadas API síncronas eliminadas por evento
  relevante en las integraciones afectadas.

No se crean nuevos porcentajes ni métricas de impacto de negocio.

**EN.** Only already locked professional metrics may appear: integration suite
`~60 min → ~2 min`; derived `≈30x` only where explicitly framed as derived
arithmetic; event summaries `~1–2` synchronous API calls removed per relevant
event in affected integrations. No new percentages or business impact metrics.

## Telephone Boundary

**ES.** El teléfono puede aparecer dentro del PDF del CV. No debe filtrarse a:
Contact web, Profile, Terminal, código fuente fuera del PDF, datos de contacto
JSON/estructurados del sitio, analítica ni UI interactiva pública. Si A8.1 genera
metadatos PDF o texto accesible, el teléfono dentro del PDF sigue siendo
aceptable porque el PDF es el artefacto de CV aprobado.

**EN.** Telephone may appear inside the PDF CV. It must not leak into web
Contact, Profile, Terminal, page source outside the PDF, site JSON/structured
contact data, analytics or public interactive UI. If A8.1 generates PDF metadata
or accessible PDF text, telephone inside the PDF is still acceptable because the
PDF itself is the approved CV artifact.

## Privacy Matrix

| Item | Public web | CV-only | Private |
| --- | --- | --- | --- |
| Full name | Yes | Yes | — |
| City/province/country (city level) | Yes | Yes | — |
| Remote availability | Yes | Yes | — |
| Professional email | Yes | Yes | — |
| LinkedIn | Yes | Yes | — |
| GitHub | Yes | Yes | — |
| Website | Yes | Yes | — |
| Telephone | No | Yes | — |
| Home address | No | No | Yes |
| Family information | No | No | Yes |
| Date of birth / age | No | No | Yes |
| Private repositories | No | No | Yes |
| Credentials / private identifiers | No | No | Yes |

**ES/EN.** CV-only exception: telephone only. Everything marked private is never
published.

## No-JS Contract

**ES.** El Terminal puede requerir JS. El acceso profesional no. Sin JS, un
visitante debe poder acceder a Profile, Experience, Architecture, Projects, AI
Lab, la información de Contact y las acciones de CV imprimible/descarga. El
Terminal es una mejora progresiva, nunca el único mecanismo de navegación.

**EN.** Terminal may require JS; professional access must not. Without JS, a
visitor must still reach Profile, Experience, Architecture, Projects, AI Lab,
Contact information and CV printable/download actions. Terminal remains
progressive enhancement.

## Analytics Boundary

**ES.** No existe requisito de analítica para A8 y no se añade analítica solo por
este hito. Si en el futuro una arquitectura de analítica propia lo permite,
podrían registrarse eventos genéricos (`cv_download`, `linkedin_open`,
`github_open`, `email_open`), nunca con payloads que contengan email, teléfono,
contenido del CV ni comandos del Terminal. A8.1 no añade analítica nueva salvo
que ya exista un patrón aprobado y una razón concreta.

**EN.** No analytics requirement exists for A8 and none is added solely for this
milestone. If a future owned analytics architecture supports generic events
(`cv_download`, `linkedin_open`, `github_open`, `email_open`), they must never
include payloads containing email address, telephone, CV contents or Terminal
commands. A8.1 adds no new analytics unless an approved pattern and concrete
reason already exist.

## Approved A8.1 Scope

A8.1 may implement:

- approved public contact data;
- Contact app refinement;
- Profile contact links;
- Terminal `linkedin`;
- terminal aliases;
- session command history;
- `clear`/Escape accessibility behavior;
- mobile prompt behavior;
- typed terminal command registry;
- CV asset registry;
- ES PDF CV;
- EN PDF CV;
- active CV download actions;
- existing printable/TXT integration;
- accessibility/i18n/tests.

## Explicitly Rejected Scope

A8.1 must not implement:

- backend contact form;
- telephone on web;
- AI terminal assistant;
- real shell;
- arbitrary commands;
- analytics platform;
- unrelated Profile redesign;
- A9 Arcade work.

Also rejected: `tel:` links, hidden DOM phone numbers, structured-data phone
numbers, fake JS email obfuscation, duplicating contact literals across
components, `open <app>` argument grammar, and publishing CV PDFs before they
are validated.

## Acceptance Preconditions for A8.1

A8.1 cannot be considered DONE unless:

- Contact uses approved public values;
- no phone appears in web UI/source contact model;
- email `mailto:` works;
- LinkedIn works;
- GitHub works;
- website works;
- location/remote visible where intended;
- terminal remains allowlisted;
- terminal history is session-only;
- unknown commands are inert;
- no real shell behavior;
- no-JS contact/CV access works;
- ES PDF exists and validates;
- EN PDF exists and validates;
- PDFs match locked professional facts;
- education remains a non-awarded degree;
- English claims remain conservative;
- primary title remains `Software Architect | Senior .NET Engineer`;
- PDFs have stable filenames;
- telephone, if included, appears only inside CV artifacts;
- Axe serious/critical = 0;
- mobile has no horizontal overflow;
- full regression passes.
