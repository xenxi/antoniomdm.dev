# Google Analytics 4

## Español

### Configuración y consentimiento

Producción usa el Measurement ID público `G-RD0PDLYEDV`. Está configurado en GitHub como variable de repositorio `GA_MEASUREMENT_ID`; `.github/workflows/publish.yml` lo expone al build como `PUBLIC_GA_MEASUREMENT_ID`. Un build sin un ID válido mantiene Analytics desactivado y no genera los controles de consentimiento.

GA4 sólo se descarga después de un consentimiento analítico explícito y únicamente bajo HTTPS en `antoniomdm.dev` o `www.antoniomdm.dev`. Rechazar no carga Google. Retirar el consentimiento envía el estado denegado, elimina las cookies GA accesibles y bloquea eventos posteriores. El consentimiento puede concederse de nuevo sin recargar la página.

La aplicación usa una API tipada central; los componentes no llaman directamente a `gtag`. La navegación cliente emite una sola vista por cambio lógico de ruta. Volver a una ruta después de visitar otra sí cuenta como una nueva vista. Los clics se observan sin cancelar ni retrasar el comportamiento normal del enlace.

### Eventos

| Evento | Parámetros | Momento |
| --- | --- | --- |
| `page_view` | `page_path`, `page_location`, `page_title`, `language` | Carga inicial consentida y cada navegación lógica; ruta sin query ni hash. |
| `project_view` | `project_id`, `project_name`, `language`, `source_section` | Apertura real de una ficha de proyecto. |
| `project_external_link` | `project_id`, `project_name`, `destination`, `language` | Clic en GitHub o web externa desde una ficha. No se envía la URL. |
| `case_study_view` | `case_id`, `project_id?`, `language`, `source_section` | Apertura de un caso técnico de Arquitectura. |
| `ai_lab_view` | `language` | Entrada en la portada de AI Lab. |
| `ai_lab_case_view` | `case_id`, `case_name`, `language` | Apertura de un caso concreto de AI Lab. |
| `blog_article_view` | `article_slug`, `language`, `source_section` | Apertura de una nota publicada en el portfolio. |
| `github_click` | `source_section`, `project_id?`, `language` | Clic explícito en el perfil de GitHub fuera de una ficha de proyecto. |
| `linkedin_click` | `source_section`, `language` | Clic en LinkedIn fuera de Contacto. |
| `contact_click` | `contact_method`, `source_section`, `language` | Acción de email o LinkedIn en Contacto; evita duplicar `linkedin_click`. |
| `arcade_open` | `language` | Apertura de la aplicación Arcade. |
| `arcade_game_start` | `game_id`, `language` | Inicio o reanudación explícita de Job Route o comienzo de una misión rápida. |
| `language_change` | `from_language`, `to_language` | Cambio explícito ES ↔ EN. |
| `app_open` | `app_id`, `language` | Apertura de una aplicación AntoñiOS sin un evento de entrada especializado. |

### Privacidad y cardinalidad

Los eventos sólo aceptan nombres y parámetros allowlisted. Los IDs y slugs son estables; los valores de enumeraciones están acotados. Se rechazan parámetros adicionales, URLs, query strings, hashes y etiquetas que parezcan contener correo o URL. No se envían textos introducidos por el visitante, email, User ID, IP, user agent, timestamp, UUID ni identificadores propios de sesión. `allow_google_signals` y `allow_ad_personalization_signals` permanecen desactivados. No se utiliza GTM ni fingerprinting.

### Pruebas y DebugView

`npm run check` valida lint, TypeScript, tests y build. `tests/analytics.test.ts` cubre consentimiento, dominio, revocación y nueva concesión, eventos tipados, privacidad, bloqueo del tracker, queries, deduplicación de navegación y repeticiones legítimas. Tras construir con un ID válido, `npm run test:analytics-browser` comprueba en Chromium los flujos de rechazo, aceptación/navegación y retirada contra el artefacto estático.

Para una comprobación manual en producción, acepta la medición y revisa Network/Data Layer. DebugView se activa sólo para la pestaña actual ejecutando `sessionStorage.setItem('antonios-ga4-debug', '1')` en DevTools y recargando. Para desactivarlo: `sessionStorage.removeItem('antonios-ga4-debug')` y recarga. Esto no omite el consentimiento ni el bloqueo de dominio y nunca queda activado globalmente.

## English

### Configuration and consent

Production uses the public Measurement ID `G-RD0PDLYEDV`. It is configured in GitHub as the `GA_MEASUREMENT_ID` repository variable; `.github/workflows/publish.yml` exposes it to the build as `PUBLIC_GA_MEASUREMENT_ID`. A build without a valid ID keeps Analytics disabled and does not generate the consent controls.

GA4 is downloaded only after explicit analytics consent and only over HTTPS on `antoniomdm.dev` or `www.antoniomdm.dev`. Rejecting does not load Google. Revoking sends the denied state, removes accessible GA cookies and blocks later events. Consent can be granted again without reloading the page.

The application uses one central typed API; components never call `gtag` directly. Client navigation emits one view per logical route change. Returning to a route after visiting another does count as a new view. Click tracking neither cancels nor delays normal link behaviour.

### Events

| Event | Parameters | Trigger |
| --- | --- | --- |
| `page_view` | `page_path`, `page_location`, `page_title`, `language` | Consented initial load and each logical navigation; path without query or hash. |
| `project_view` | `project_id`, `project_name`, `language`, `source_section` | A project detail is genuinely opened. |
| `project_external_link` | `project_id`, `project_name`, `destination`, `language` | GitHub or website click from a project detail. The URL is not sent. |
| `case_study_view` | `case_id`, `project_id?`, `language`, `source_section` | An Architecture technical case is opened. |
| `ai_lab_view` | `language` | Entry into the AI Lab landing. |
| `ai_lab_case_view` | `case_id`, `case_name`, `language` | A specific AI Lab case is opened. |
| `blog_article_view` | `article_slug`, `language`, `source_section` | A portfolio note is opened. |
| `github_click` | `source_section`, `project_id?`, `language` | Explicit GitHub-profile click outside a project detail. |
| `linkedin_click` | `source_section`, `language` | LinkedIn click outside Contact. |
| `contact_click` | `contact_method`, `source_section`, `language` | Email or LinkedIn action in Contact; avoids duplicating `linkedin_click`. |
| `arcade_open` | `language` | The Arcade application is opened. |
| `arcade_game_start` | `game_id`, `language` | Job Route is explicitly started or resumed, or a quick mission begins. |
| `language_change` | `from_language`, `to_language` | Explicit ES ↔ EN switch. |
| `app_open` | `app_id`, `language` | An AntoñiOS app without a specialized entry event is opened. |

### Privacy and cardinality

Events accept only allowlisted names and parameters. IDs and slugs are stable and enumeration values are bounded. Extra parameters, URLs, query strings, hashes, and labels that look like email addresses or URLs are rejected. Visitor-entered text, email, User ID, IP, user agent, timestamps, UUIDs, and custom session identifiers are never sent. `allow_google_signals` and `allow_ad_personalization_signals` stay disabled. GTM and fingerprinting are not used.

### Testing and DebugView

`npm run check` validates lint, TypeScript, tests and build. `tests/analytics.test.ts` covers consent, domain, revocation and re-granting, typed events, privacy, blocked trackers, queries, navigation deduplication and legitimate repeated actions. After building with a valid ID, `npm run test:analytics-browser` checks the rejection, acceptance/navigation and revocation flows in Chromium against the static artifact.

For a manual production check, accept measurement and inspect Network/Data Layer. Enable DebugView only for the current tab by running `sessionStorage.setItem('antonios-ga4-debug', '1')` in DevTools and reloading. Disable it with `sessionStorage.removeItem('antonios-ga4-debug')` and reload. This bypasses neither consent nor the domain gate and is never enabled globally.
