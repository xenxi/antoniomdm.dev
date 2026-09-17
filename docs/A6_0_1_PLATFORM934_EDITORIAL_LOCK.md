# A6.0.1 Platform934 Human Editorial Lock

Status: HUMAN_APPROVED_EDITORIAL_SOURCE
Date: 2026-09-11

This document is the authoritative editorial source for A6.1. It records
human-confirmed product facts together with verified Platform934 API evidence.
It does not implement A6, change the professional model, or expose private
source code. Spanish and English substance are paired throughout this lock.

## Provenance

Date: 2026-09-11

Sources / Fuentes:

- `docs/A6_0_PLATFORM934_EVIDENCE_LOCK.md` / bloqueo de evidencia A6.0.
- Human-confirmed decisions in the A6.0.1 task / decisiones confirmadas por Antonio en la tarea A6.0.1.
- Verified `xenxi/platform-934-api` repository evidence / evidencia verificada del repositorio `xenxi/platform-934-api`.
- Existing portfolio professional model / modelo profesional existente del portfolio.

Authority / Autoridad: `HUMAN_APPROVED_EDITORIAL_SOURCE`

Editorial rule / Regla editorial: statuses must remain visible where useful:
`VALIDATED`, `IMPLEMENTED`, `IN_PROGRESS`, `PLANNED`, and `HISTORICAL`.
Human-confirmed runtime capabilities in this document must not be downgraded
because earlier repository evidence was incomplete. / Las capacidades runtime
confirmadas por Antonio no deben degradarse por falta de evidencia anterior.

## Project identity

Platform934 is a multi-client media platform and a personal engineering lab,
not merely an Android TV application, Netflix clone, or Jellyfin skin.
Jellyfin supplies the media-server foundation. Platform934 builds differentiated
client experiences and product capabilities around and above that foundation,
with multiple clients and an optional Platform API.

Platform934 es una plataforma multimedia multicliente y un laboratorio personal
de ingeniería, no solo una aplicación Android TV, un clon de Netflix o un skin
de Jellyfin. Jellyfin proporciona la base de servidor multimedia; Platform934
construye experiencias de cliente y capacidades de producto diferenciadas
alrededor y por encima de esa base, con múltiples clientes y una Platform API
opcional.

## Product surfaces

### Mobile

Status: `IMPLEMENTED`, current product client / cliente de producto actual.

Purpose / Propósito: use Platform934 from a mobile device to browse and use
the application, watch films and series, and consume the Platform934 experience.
The portfolio must not imply that every TV feature exists on mobile or claim
feature parity without evidence. / El portfolio no debe implicar que todas las
funciones de TV existen en móvil ni afirmar paridad sin evidencia.

### Web

Status: `IMPLEMENTED`, current product client / cliente de producto actual.

Purpose / Propósito: use and enjoy the general Platform934 experience from a
normal computer or browser, including media consumption. Do not claim full
parity with TV or mobile. / Permite usar y disfrutar la experiencia general de
Platform934 desde un ordenador o navegador, incluido el consumo multimedia,
sin afirmar paridad completa con TV o móvil.

### TV Web / Preact / webOS

Status: `IMPLEMENTED`, real dedicated TV Web client / cliente TV Web dedicado
real. Technology: Preact. Target: webOS and older televisions. Public framing:
`TV WEB CLIENT` or `WEBOS / LEGACY TV CLIENT`.

This is not a demo, prototype, or mock. The known public deployment is
`https://patata9ytrescuartos.antoniomdm.dev/`. A temporarily degraded
initialization screen is an operational/deployment issue, not evidence that
the product is a demo. Link health must be revalidated during A6.1 before a
portfolio CTA promises availability. / No es una demo, prototipo ni mock. Una
pantalla de inicialización degradada temporalmente es un problema operativo o
de despliegue, no evidencia de que el producto sea una demo.

### Native Google TV

Status: `IN_PROGRESS` overall, with bounded validated slices / con slices
validados acotados. Technology: Kotlin, Compose TV where evidenced, and Media3.
This is the native Google TV / Android TV client and the strongest current
deep-dive surface for TV interaction, playback, focus/navigation, real-hardware
validation, and performance engineering. / Es la superficie principal para
interacción TV, reproducción, foco/navegación, validación en hardware real y
rendimiento.

### Flutter TV reference/evolution

Flutter Android TV is a previous/current reference implementation and rollback
surface during progressive native migration. It is not to be called abandoned
without explicit evidence. / Flutter Android TV es una implementación de
referencia anterior/actual y superficie de rollback durante la migración nativa;
no debe llamarse abandonada sin evidencia explícita.

## Client evolution

The multi-client story is evolutionary: cross-platform clients delivered
value, while Android/Google TV constraints justified progressive native
specialization. Flutter remains useful as reference and rollback during that
transition. / La historia multicliente es evolutiva: los clientes
multiplataforma aportaron valor, mientras que las restricciones de Android/Google
TV justificaron la especialización nativa progresiva. Flutter sigue siendo útil
como referencia y rollback.

## Flutter to native TV decision

The move toward Kotlin + Media3 was driven by TV-specific constraints where
deeper native control became valuable: playback control and lifecycle,
focus/D-pad interaction, TV overlays and behavior, Media3 integration,
audio/subtitle handling, recovery, performance profiling, and real-device
behavior. This is not “Flutter was a mistake”; cross-platform delivery had
value, but one implementation is not necessarily optimal for every device
class. / El paso hacia Kotlin + Media3 respondió a restricciones específicas de
TV en las que era valioso un control nativo más profundo: reproducción y ciclo
de vida, foco/D-pad, overlays y comportamiento TV, Media3, audio/subtítulos,
recuperación, perfilado y hardware real. No significa que Flutter fuera un
error.

## Jellyfin responsibility

Jellyfin is the official media server and authority for the media library,
catalogue, metadata, playback-source information, server streaming/transcoding
where provided, supported history/favorites/playlists, and Jellyfin
authentication/QuickConnect capabilities. / Jellyfin es el servidor multimedia
oficial y la autoridad del catálogo, metadatos, fuentes de reproducción,
streaming/transcodificación cuando la proporciona, historial/favoritos/listas
soportados y autenticación/QuickConnect.

Antonio did not build Jellyfin's media server, transcoder, or codec pipeline.
/ Antonio no construyó el servidor multimedia, transcodificador ni pipeline de
codecs de Jellyfin.

## Platform934 responsibility

Platform934 owns differentiated clients, UX, catalogue presentation,
search/product experience, TV focus/navigation, playback orchestration,
Media3 client lifecycle, profiles and product behaviors, device interactions,
additional Platform API capabilities, conversational interaction, agent tools,
and recommendation/product experimentation. / Platform934 es responsable de
clientes diferenciados, UX, presentación del catálogo, experiencia de búsqueda
y producto, foco/navegación TV, orquestación de reproducción, ciclo de vida
Media3, perfiles y comportamientos de producto, interacciones con dispositivos,
capacidades adicionales de Platform API, conversación, herramientas del agente
y experimentación de recomendaciones/producto.

## Platform934 API

Platform934 API is a real independent private backend in
`xenxi/platform-934-api`. It is an external agent gateway layered over
Jellyfin, not a Jellyfin fork, plugin, or replacement media server. Jellyfin
remains authoritative for the media platform/catalogue. / Platform934 API es un
backend privado independiente real y una puerta de enlace de agentes externa
por encima de Jellyfin; no es un fork, plugin ni sustituto del servidor.

Verified structure / Estructura verificada:

- `Platform934.Api`
- `Platform934.Agent`
- `Platform934.Jellyfin`
- `Platform934.Contracts`

Verified technology / Tecnología verificada:

- .NET
- Semantic Kernel
- LiteLLM
- official Jellyfin API / API oficial de Jellyfin
- allowlisted tools / herramientas allowlisted
- typed contracts / contratos tipados
- multi-provider LLM routing and fallback / routing y fallback LLM multi-proveedor
- Docker and NAS deployment assets / assets de despliegue Docker y NAS

Platform934 API adds agent-friendly endpoints, search/recommendation
orchestration, tool safety, LLM routing abstraction, traceable agent
decisions/actions, and higher-level product capabilities. Ordinary client
operations may remain direct to Jellyfin; not every client operation must route
through Platform API. / La API añade endpoints orientados a agentes,
orquestación de búsqueda/recomendaciones, seguridad de herramientas, abstracción
de routing LLM, decisiones/acciones trazables y capacidades de producto de más
alto nivel. Las operaciones normales pueden seguir yendo directamente a
Jellyfin.

## Conversational agent

Human-confirmed runtime capabilities are marked
`HUMAN_CONFIRMED_RUNTIME_CAPABILITY`. Repository documentation lag must not
turn them into planned capabilities. / Las capacidades runtime confirmadas por
Antonio llevan la marca indicada y no deben convertirse en planificadas por
desfase documental.

| Capability / Capacidad | Status | Source / Fuente | Publication / Publicación | Boundary / Límite |
| --- | --- | --- | --- | --- |
| Search / Búsqueda | `IMPLEMENTED` | `HUMAN_CONFIRMED_RUNTIME_CAPABILITY`; verified agent/tool architecture | PUBLIC_ANONYMIZED | Search/discovery against actual Platform934/Jellyfin data where appropriate; no invented catalogue state / sin inventar catálogo |
| Recommendations / Recomendaciones | `IMPLEMENTED` | `HUMAN_CONFIRMED_RUNTIME_CAPABILITY` | PUBLIC_ANONYMIZED | May use catalogue, watched/unwatched, history, favorites and preferences where verified; do not add ranking algorithms / no añadir algoritmos no verificados |
| Lists create / Crear listas | `IMPLEMENTED` | `HUMAN_CONFIRMED_RUNTIME_CAPABILITY` | PUBLIC_ANONYMIZED | Capability exists; omit persistence mechanics unless evidenced / no inventar persistencia |
| Lists modify / Modificar listas | `IMPLEMENTED` | `HUMAN_CONFIRMED_RUNTIME_CAPABILITY` | PUBLIC_ANONYMIZED | Capability exists; omit storage mechanics unless evidenced / omitir mecánica no evidenciada |
| Film discussion / Discusión de películas | `IMPLEMENTED` | `HUMAN_CONFIRMED_RUNTIME_CAPABILITY` | PUBLIC_ANONYMIZED | Use “conversational discussion about films”; avoid anthropomorphic exaggeration / evitar antropomorfismo exagerado |
| Film explanation / Explicación de películas | `IMPLEMENTED` | `HUMAN_CONFIRMED_RUNTIME_CAPABILITY` | PUBLIC_ANONYMIZED | Do not invent spoiler policy, RAG, vector search, or specialized knowledge bases / no inventar esas tecnologías |
| Tool calling / Llamada de herramientas | `IMPLEMENTED` | Verified repository + human confirmation | PUBLIC_ANONYMIZED | Allowlisted, bounded, typed, traceable, and non-destructive by default where applicable; not autonomous / no autónomo |
| Playback/device actions / Acciones de reproducción/dispositivo | `IN_PROGRESS` for broader orchestration; gated play/pause behavior supported | Verified repository evidence and A6.0 boundary | NEEDS_HUMAN_REVIEW | Do not generalize to complete remote-device orchestration |

Current documented backend capabilities also include Jellyfin system
information, media search/items, history, favorites, recommendations,
AI-curated categories, a conversational endpoint, gated playback actions,
play/pause, and allowlisted tools. / Las capacidades documentadas incluyen
información del sistema Jellyfin, búsqueda/items, historial, favoritos,
recomendaciones, categorías curadas por IA, endpoint conversacional, acciones
de reproducción acotadas, play/pause y herramientas allowlisted.

## Agent grounding

The conversational experience is not intended to rely only on generic LLM
knowledge. Through bounded tools it can operate against real Platform934/Jellyfin
data and capabilities, including catalogue, media details, history, favorites,
and watched/unwatched signals where available. / La experiencia no depende solo
del conocimiento genérico del LLM: mediante herramientas acotadas puede operar
contra datos y capacidades reales de Platform934/Jellyfin, como catálogo,
detalles, historial, favoritos y señales de visto/no visto cuando están
disponibles.

Do not publish RAG, embeddings, vector databases, or MCP as implemented. MCP is
explicitly not currently implemented. / No publicar RAG, embeddings, bases de
datos vectoriales ni MCP como implementados. MCP no está implementado.

## Product AI

Product AI means runtime functionality: conversational discovery, search,
recommendations, lists, film discussion, film explanation, tool calling, and
bounded product actions. / La IA de producto significa funcionalidad runtime:
descubrimiento conversacional, búsqueda, recomendaciones, listas, discusión y
explicación de películas, llamadas de herramientas y acciones acotadas.

## Agentic Engineering

Agentic engineering means how Antonio develops Platform934: specifications,
milestones, acceptance criteria, specialist agent tasks, tests, quality and
performance gates, risk limits, human review, and explicit stop conditions.
Neither product AI nor this process is uncontrolled autonomy. / La ingeniería
con agentes describe cómo Antonio desarrolla Platform934: especificaciones,
hitos, criterios de aceptación, tareas especializadas, tests, gates de calidad
y rendimiento, límites de riesgo, revisión humana y condiciones explícitas de
parada. Ninguno implica autonomía sin control.

## Performance evidence approved for publication

These are scoped measurements, not universal guarantees. Required context:
measured on real TV hardware in a controlled validation scenario. / Son
mediciones acotadas, no garantías universales. Debe conservarse el contexto de
hardware TV real y escenario controlado.

1. Home focus response: approximately 44–45 ms.
2. Home transition: approximately 144–146 ms.
3. Artwork request behavior in the validated scenario: 0 redundant completed
   HTTP/Coil artwork requests observed.

Do not state that Platform934 always responds in 45 ms or that zero network
duplication exists globally. / No afirmar que Platform934 siempre responde en
45 ms ni que existe duplicación de red cero globalmente.

## Performance evidence retained as internal/supporting evidence

Catalogue transition p95, app-work p95, Chromecast soak, cold backdrop timing,
slow-frame debt, PSS/memory debt, and release/profile constraints remain
secondary or internal evidence. Performance work is measured iteratively and
remaining debt is retained rather than hidden. / Estas evidencias permanecen
secundarias o internas; el trabajo de rendimiento se mide iterativamente y la
deuda restante se conserva en vez de ocultarse.

## Personal learnings

1. Cross-platform is valuable, but one implementation is not optimal for every
   device category; specialization is justified when platform constraints are
   material. / La multiplataforma aporta valor, pero una implementación no es
   óptima para cada categoría; especializarse se justifica ante restricciones
   materiales.
2. TV performance and UX must be validated on real hardware; emulators and
   desktops cannot fully represent focus, decoding, memory, playback, device
   interaction, or rendering behavior. / El rendimiento y UX de TV deben
   validarse en hardware real; emuladores y escritorio no representan todo.
3. Build on existing infrastructure: Jellyfin solves difficult media-server
   responsibilities, allowing focus on product experience, clients,
   architecture, performance, and AI/product differentiation. / Construir sobre
   infraestructura existente permite centrarse en producto, clientes,
   arquitectura, rendimiento y diferenciación.
4. Agents need real capabilities: context, bounded tools, clear contracts,
   controlled actions, and validation to avoid inventing system state. / Los
   agentes necesitan contexto real, herramientas acotadas, contratos claros,
   acciones controladas y validación.
5. Agentic development still needs engineering discipline: specifications,
   milestones, acceptance criteria, tests, quality gates, performance evidence,
   risk boundaries, and human review. / Delegar trabajo a agentes no delega el
   juicio técnico; siguen siendo necesarias especificaciones, hitos, criterios,
   tests, gates, evidencia, límites y revisión humana.

## Public TV Web deployment

`https://patata9ytrescuartos.antoniomdm.dev/` is the public deployment of the
real Preact TV Web client for webOS and older TVs. It is not a demo. Product
status is separate from public link health: operational revalidation is
required before adding a direct portfolio CTA. / Es el despliegue público del
cliente TV Web real en Preact para webOS y televisores antiguos; no es una demo.
El estado del producto se separa de la salud del enlace público.

## System landscape facts

The following presentation-only nodes and edges are safe for A6.1:

```text
Platform934 clients
        |--------------------> Jellyfin
        |--------------------> Platform934 API
                                  |
                                  v
                           Platform934 Agent
                                  |
                           Semantic Kernel
                                  |
                              LiteLLM
                                  |
                           LLM provider(s)
```

The clients are Mobile, Web, TV Web/Preact for webOS and older TVs, and native
Google TV/Android TV in Kotlin/Media3. Flutter TV is a reference/evolution
surface. Agent tools use a typed Jellyfin client to query or act on the actual
media platform. This conceptual diagram is not a claim that every ordinary
operation routes through Platform API. / Es un diagrama conceptual: no afirma
que todas las operaciones pasen por Platform API.

## Competency implications

Platform934 supports positioning in Software Architecture, Senior .NET
Engineering, Performance Engineering, Mobile/Multiplatform, Applied AI,
Agentic Engineering, and end-to-end ownership. Platform934.Api provides genuine
personal .NET evidence, but Platform934 alone does not prove every professional
distributed-systems or event-driven competency. / Platform934.Api aporta
evidencia personal genuina de .NET, pero Platform934 no prueba por sí solo todas
las competencias profesionales de sistemas distribuidos o event-driven.

## Privacy boundaries

Never publish tokens, API keys, private endpoints, internal IPs, server URLs not
intentionally public, QuickConnect codes, user IDs, personal media data, private
infrastructure details, NAS credentials, environment secrets, or provider
credentials. The Platform API repository is private; publish architecture
concepts, never private source code. / Nunca publicar secretos, credenciales,
datos personales, endpoints privados, infraestructura privada ni código fuente
privado. El repositorio Platform API es privado.

## Explicitly unsupported claims

The portfolio must not claim:

- Platform934 built Jellyfin / que Platform934 construyó Jellyfin.
- A custom transcoder or media server / un transcodificador o servidor propio.
- Event Sourcing or arbitrary distributed-systems architecture claims / Event Sourcing o afirmaciones distribuidas arbitrarias.
- RAG, embeddings, or a vector database / RAG, embeddings o base vectorial.
- MCP currently implemented / MCP implementado actualmente.
- An autonomous agent / un agente autónomo.
- Universal performance guarantees / garantías universales de rendimiento.
- Full feature parity across clients / paridad completa entre clientes.
- Specific production LLM providers inferred from configuration / proveedores LLM de producción inferidos de configuración.

## Superseded A6.0 conclusions

The following A6.0 conclusions are
`SUPERSEDED_BY_HUMAN_CONFIRMATION` or verified API evidence for A6.1:

- TV Web described as a demo or live demo needing product classification: it
  is a real Preact TV client, not a demo. Link health still needs revalidation.
- Independent Platform API backend unverified: the private
  `xenxi/platform-934-api` backend is confirmed real and independent.
- .NET, Semantic Kernel, and LiteLLM absent/unverified: they are verified for
  Platform934 API; provider configuration is not proof of production provider use.
- List creation and list modification unverified for the conversational agent:
  both are human-confirmed working today; persistence mechanics remain omitted.
- Film discussion incomplete and film explanation unverified: both are
  human-confirmed working today, without invented RAG, spoiler, or knowledge-base claims.
- Typed tool calling marked merely in progress: allowlisted, bounded, typed,
  traceable tool calling is verified and approved; autonomy remains unsupported.
- Agent runtime capabilities downgraded due to documentation gaps: search,
  recommendations, lists, film discussion, and film explanation are runtime
  capabilities confirmed by Antonio.
- TV specialization motivation marked unresolved: the Kotlin/Media3 decision
  is approved as specialization for material Android/Google TV constraints.

A6.0 remains historical evidence and is not rewritten. / A6.0 sigue siendo
evidencia histórica y no se modifica.

## A6 authoring readiness

The following A6.1 sections are `READY_FOR_A6_AUTHORING`:

1. What Platform934 is / Qué es Platform934
2. Multi-client ecosystem / Ecosistema multicliente
3. Jellyfin / Platform934 boundary / Límite Jellyfin / Platform934
4. Client evolution / Evolución de clientes
5. Native Google TV deep dive / Profundización en Google TV nativo
6. Playback / Media3 / Reproducción / Media3
7. Performance engineering / Ingeniería de rendimiento
8. Platform934 API
9. Conversational Agent / Agente conversacional
10. Product AI / IA de producto
11. Agentic Engineering / Ingeniería con agentes
12. Decisions and trade-offs / Decisiones y trade-offs
13. Learnings / Aprendizajes
14. Current evolution / roadmap / Evolución actual / roadmap
15. Technical evidence / relations / Evidencia técnica / relaciones

The structure above authorizes organization, not final copy. A6.1 must preserve
scope, statuses, privacy boundaries, and the distinction between product status
and public deployment health. / La estructura autoriza organización, no copy
final, y debe conservar alcance, estados, privacidad y la distinción entre
estado del producto y salud del despliegue.
