import type { Locale } from '../i18n/core';

export type PlatformStatus = 'VALIDATED' | 'IMPLEMENTED' | 'IN_PROGRESS' | 'PLANNED' | 'HISTORICAL';
type Localized = { es: string; en: string };
const text = (es: string, en: string): Localized => ({ es, en });
const localize = (value: Localized, locale: Locale) => value[locale];

export interface PlatformCard { id: string; name: Localized; purpose: Localized; technology: Localized; status: PlatformStatus; description: Localized }
export interface PlatformItem { title: Localized; body?: Localized; status?: PlatformStatus }

export const platform934 = {
  title: text('Platform934', 'Platform934'),
  eyebrow: text('PROYECTO PERSONAL / LABORATORIO DE INGENIERÍA', 'PERSONAL PROJECT / ENGINEERING LAB'),
  summary: text(
    'Plataforma multimedia multicliente construida sobre Jellyfin para explorar producto, arquitectura, rendimiento, TV nativa y agentes conversacionales.',
    'A multi-client media platform built on Jellyfin to explore product engineering, architecture, performance, native TV and conversational agents.',
  ),
  note: text('Un producto real en evolución, no un SaaS de producción.', 'A real product in evolution, not a production SaaS.'),
  technologies: ['Flutter', 'Kotlin', 'Compose TV', 'Media3', '.NET', 'Semantic Kernel', 'LiteLLM', 'Jellyfin'],
  clients: [
    { id: 'mobile', name: text('Móvil', 'Mobile'), purpose: text('Explorar y consumir películas y series desde un dispositivo móvil.', 'Browse and watch films and series from a mobile device.'), technology: text('Flutter / Android', 'Flutter / Android'), status: 'IMPLEMENTED', description: text('Cliente de producto actual. No se presenta como paridad completa con TV.', 'Current product client. It is not presented as feature parity with TV.') },
    { id: 'web', name: text('Web', 'Web'), purpose: text('Usar Platform934 desde un ordenador o navegador.', 'Use Platform934 from a computer or browser.'), technology: text('Flutter Web', 'Flutter Web'), status: 'IMPLEMENTED', description: text('Superficie general para catálogo y consumo multimedia, con alcance propio.', 'General surface for catalogue and media consumption, with its own scope.') },
    { id: 'tv-web', name: text('TV Web', 'TV Web'), purpose: text('Llevar la experiencia a webOS y televisores antiguos.', 'Bring the experience to webOS and older televisions.'), technology: text('Preact', 'Preact'), status: 'IMPLEMENTED', description: text('Cliente TV dedicado real para entornos donde el cliente nativo no es la opción adecuada.', 'A real dedicated TV client for environments where native Google TV is not the right option.') },
    { id: 'native-tv', name: text('Google TV nativo', 'Native Google TV'), purpose: text('Controlar con precisión interacción TV, reproducción y ciclo de vida.', 'Control TV interaction, playback and lifecycle with precision.'), technology: text('Kotlin · Compose TV · Media3', 'Kotlin · Compose TV · Media3'), status: 'IN_PROGRESS', description: text('Dirección nativa principal para Google TV / Android TV, con slices validados y hardening pendiente.', 'Main native direction for Google TV / Android TV, with validated slices and hardening still in progress.') },
    { id: 'flutter-tv', name: text('Flutter TV', 'Flutter TV'), purpose: text('Conservar una referencia productiva y una superficie de rollback durante la migración.', 'Retain a productive reference and rollback surface during migration.'), technology: text('Flutter / Dart', 'Flutter / Dart'), status: 'HISTORICAL', description: text('Superficie de referencia y evolución progresiva, no una implementación descartada.', 'Reference and evolutionary surface, not an abandoned implementation.') },
  ] satisfies PlatformCard[],
  boundary: {
    jellyfin: [text('Servidor multimedia y autoridad del catálogo.', 'Media server and catalogue authority.'), text('Metadatos, fuentes de reproducción y streaming/transcodificación cuando los proporciona.', 'Metadata, playback sources and streaming/transcoding where it provides them.'), text('Historial, favoritos, listas y capacidades de autenticación / QuickConnect soportadas.', 'Supported history, favourites, lists and authentication / QuickConnect capabilities.')],
    platform: [text('Clientes diferenciados, UX, navegación y foco TV.', 'Differentiated clients, UX, navigation and TV focus.'), text('Orquestación de reproducción, ciclo de vida Media3 y comportamientos de producto.', 'Playback orchestration, Media3 lifecycle and product behaviours.'), text('Conversación, herramientas acotadas, acciones de producto y experimentación.', 'Conversation, bounded tools, product actions and experimentation.')],
  },
  evolution: [
    { title: text('Alcance multiplataforma', 'Cross-platform reach'), body: text('Flutter permitió entregar valor en móvil, web y TV con una base compartida.', 'Flutter delivered broad value across mobile, web and TV with a shared base.'), status: 'IMPLEMENTED' },
    { title: text('Restricciones de TV', 'TV constraints'), body: text('Android/Google TV hizo material el valor de controlar reproducción, ciclo de vida, foco/D-pad, overlays, audio/subtítulos y hardware real.', 'Android/Google TV made deeper control of playback, lifecycle, focus/D-pad, overlays, audio/subtitles and real hardware materially valuable.'), status: 'VALIDATED' },
    { title: text('Especialización progresiva', 'Progressive specialization'), body: text('Kotlin + Compose TV + Media3 conviven con Flutter como referencia y rollback. No fue una reescritura total ni un juicio contra Flutter.', 'Kotlin + Compose TV + Media3 now coexist with Flutter as reference and rollback. This was not a total rewrite or a judgement against Flutter.'), status: 'IN_PROGRESS' },
  ] satisfies PlatformItem[],
  native: [
    { title: text('Foco y D-pad', 'Focus and D-pad'), body: text('Navegación de mando y respuesta de foco validadas en escenarios acotados.', 'Remote navigation and focus response validated in bounded scenarios.'), status: 'VALIDATED' },
    { title: text('Playback y Media3', 'Playback and Media3'), body: text('Propiedad clara del reproductor y su sesión, Direct Play, recuperación y ciclo de vida de reproducción.', 'Clear player and session ownership, Direct Play, recovery and playback lifecycle.'), status: 'VALIDATED' },
    { title: text('Audio, subtítulos y continuidad', 'Audio, subtitles and continuity'), body: text('Cambios de pistas y reproducción del siguiente episodio implementados con alcance dependiente de corpus y dispositivo.', 'Track changes and next-episode playback implemented with corpus and device scope.'), status: 'IMPLEMENTED' },
    { title: text('QuickConnect, búsqueda y perfiles', 'QuickConnect, search and profiles'), body: text('Contratos y slices nativos para autenticación, QuickConnect, búsqueda por voz, detalles, perfiles y navegación.', 'Native contracts and slices for authentication, QuickConnect, voice search, details, profiles and navigation.'), status: 'IMPLEMENTED' },
    { title: text('Hardware real y hardening', 'Real hardware and hardening'), body: text('La validación física, el rendimiento restante y los gates de release siguen siendo trabajo explícito.', 'Physical validation, remaining performance work and release gates remain explicit work.'), status: 'IN_PROGRESS' },
  ] satisfies PlatformItem[],
  performance: [
    { title: text('Respuesta de foco en Home', 'Home focus response'), body: text('~44–45 ms', '~44–45 ms') },
    { title: text('Transición de Home', 'Home transition'), body: text('~144–146 ms', '~144–146 ms') },
    { title: text('Artwork repetido completado', 'Completed repeated artwork'), body: text('0 peticiones HTTP/Coil redundantes observadas', '0 redundant completed HTTP/Coil artwork requests observed') },
  ],
  api: [
    { title: text('Platform934.Api', 'Platform934.Api'), body: text('Puerta de enlace externa de agentes en .NET, independiente, privada y situada por encima de Jellyfin.', 'An independent, private .NET external agent gateway layered over Jellyfin.') },
    { title: text('Platform934.Agent', 'Platform934.Agent'), body: text('Orquestación conversacional, decisiones y acciones trazables con herramientas allowlisted.', 'Conversational orchestration, traceable decisions and actions with allowlisted tools.') },
    { title: text('Platform934.Jellyfin', 'Platform934.Jellyfin'), body: text('Cliente tipado para acceder a la API oficial de Jellyfin.', 'Typed client for the official Jellyfin API.') },
    { title: text('Platform934.Contracts', 'Platform934.Contracts'), body: text('Contratos tipados para mantener límites explícitos entre producto, agente y servidor multimedia.', 'Typed contracts keeping explicit boundaries between product, agent and media server.') },
  ],
  agent: [
    { title: text('Búsqueda', 'Search'), status: 'IMPLEMENTED' }, { title: text('Recomendaciones', 'Recommendations'), status: 'IMPLEMENTED' }, { title: text('Crear listas', 'Create lists'), status: 'IMPLEMENTED' }, { title: text('Modificar listas', 'Modify lists'), status: 'IMPLEMENTED' }, { title: text('Discusión de películas', 'Film discussion'), status: 'IMPLEMENTED' }, { title: text('Explicación de películas', 'Film explanation'), status: 'IMPLEMENTED' }, { title: text('Llamada de herramientas', 'Tool calling'), status: 'IMPLEMENTED' }, { title: text('Acciones de reproducción/dispositivo', 'Playback/device actions'), status: 'IN_PROGRESS' },
  ] satisfies PlatformItem[],
  learnings: [
    text('La multiplataforma aporta valor, pero una implementación no es óptima para cada categoría de dispositivo.', 'Cross-platform is valuable, but one implementation is not optimal for every device category.'),
    text('El rendimiento y la UX de TV deben validarse en hardware real.', 'TV performance and UX must be validated on real hardware.'),
    text('Jellyfin evita reconstruir responsabilidades multimedia sin valor diferencial de producto.', 'Jellyfin avoids rebuilding media-server responsibilities without product value.'),
    text('Los agentes necesitan contexto real, herramientas acotadas, contratos, acciones controladas y validación.', 'Agents need real context, bounded tools, contracts, controlled actions and validation.'),
    text('Delegar trabajo a agentes no delega el juicio técnico: hacen falta disciplina, gates y revisión humana.', 'Delegating work to agents does not delegate technical judgement: discipline, gates and human review remain necessary.'),
  ],
  decisions: [
    { title: text('Jellyfin como base', 'Jellyfin as foundation'), body: text('Evita reconstruir un servidor multimedia; el trade-off es depender de contratos, corpus y dispositivos externos.', 'Avoids rebuilding a media server; the trade-off is dependence on external contracts, media corpus and devices.') },
    { title: text('API como extensión opcional', 'API as an optional extension'), body: text('Añade capacidades de agente sin convertirla en ruta obligatoria de cada operación normal de catálogo o reproducción.', 'Adds agent capabilities without making it mandatory for every normal catalogue or playback operation.') },
    { title: text('Flutter donde aporta valor', 'Flutter where it adds value'), body: text('Conserva alcance multiplataforma; el coste es mantener límites y estados entre superficies.', 'Retains cross-platform reach; the cost is maintaining boundaries and states across surfaces.') },
    { title: text('Kotlin + Media3 para TV', 'Kotlin + Media3 for TV'), body: text('Justificado por restricciones materiales de TV; el trade-off es especialización y complejidad de migración.', 'Justified by material TV constraints; the trade-off is specialization and migration complexity.') },
    { title: text('Herramientas allowlisted', 'Allowlisted tools'), body: text('Permiten acciones acotadas y trazables; no convierten al agente en autónomo.', 'Enable bounded, traceable actions; they do not make the agent autonomous.') },
  ] satisfies PlatformItem[],
  workflow: [
    text('Especificaciones y hitos', 'Specifications and milestones'), text('Criterios de aceptación y tareas acotadas', 'Acceptance criteria and bounded tasks'), text('Trabajo de agentes especialistas', 'Specialist-agent work'), text('Tests y gates de calidad/rendimiento', 'Tests and quality/performance gates'), text('Límites de riesgo y stop conditions', 'Risk limits and stop conditions'), text('Revisión humana y juicio técnico', 'Human review and technical judgement'),
  ],
};

export function getPlatform934(locale: Locale) {
  const localizeItem = (item: PlatformItem) => ({ ...item, title: localize(item.title, locale), body: item.body ? localize(item.body, locale) : undefined });
  return { ...platform934, title: localize(platform934.title, locale), eyebrow: localize(platform934.eyebrow, locale), summary: localize(platform934.summary, locale), note: localize(platform934.note, locale), clients: platform934.clients.map(item => ({ ...item, name: localize(item.name, locale), purpose: localize(item.purpose, locale), technology: localize(item.technology, locale), description: localize(item.description, locale) })), evolution: platform934.evolution.map(localizeItem), native: platform934.native.map(localizeItem), performance: platform934.performance.map(localizeItem), api: platform934.api.map(localizeItem), agent: platform934.agent.map(item => ({ ...item, title: localize(item.title, locale) })), learnings: platform934.learnings.map(item => localize(item, locale)), decisions: platform934.decisions.map(localizeItem), workflow: platform934.workflow.map(item => localize(item, locale)), boundary: { jellyfin: platform934.boundary.jellyfin.map(item => localize(item, locale)), platform: platform934.boundary.platform.map(item => localize(item, locale)) } };
}
