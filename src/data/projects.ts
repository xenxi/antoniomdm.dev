import type { Locale } from '../i18n/core';

export type ProjectId = 'platform934' | 'platform934-api' | 'stream-optimizer' | 'devagon-alley' | 'luna-tartas' | 'koso' | 'luna-studio' | 'antonios' | 'bio-cli';
export type ProjectStatus = 'IMPLEMENTED' | 'ACTIVE' | 'BETA' | 'IN_PROGRESS' | 'DESIGNED' | 'PLANNED' | 'HISTORICAL';
export type ProjectDepth = 'DEEP_CASE_STUDY' | 'STANDARD_PROJECT' | 'SMALL_PROJECT';
export type ProjectEcosystem = 'MEDIA_ENGINEERING' | 'COMMERCE_PRODUCT_ENGINEERING' | 'PERSONAL_DEVELOPER_EXPERIENCE';
export type ProjectLink = { label: Localized; url: string; kind: 'live' | 'detail' | 'repository' };
export type ProjectRelation = { target: ProjectId; type: 'ECOSYSTEM' | 'CAPABILITY' | 'OPERATIONAL' | 'DISTRIBUTION' | 'EDITORIAL' | 'FUTURE' | 'DX'; label: Localized };
export type Localized = { es: string; en: string };

export interface ProjectImage { src: string; alt: Localized; caption?: Localized; width: number; height: number }
export interface ProjectTechnology { name: string; signal?: boolean }
export interface LocalizedProjectContent {
  summary: Localized;
  engineeringStory: Localized;
  implementedCapabilities: Localized[];
  plannedCapabilities: Localized[];
  nonClaims: Localized[];
  challenge: Localized;
  challengeTitle: Localized;
  purpose?: Localized;
  tradeoff?: Localized;
}
export interface Project {
  id: ProjectId; slug: string; publicName: Localized; status: ProjectStatus[]; ecosystem: ProjectEcosystem; depth: ProjectDepth;
  content: LocalizedProjectContent; technologies: ProjectTechnology[]; relations: ProjectRelation[]; competencyIds: string[];
  logo?: { src: string; width: number; height: number };
  images?: ProjectImage[];
  links: ProjectLink[]; visibility: 'PUBLIC' | 'ANONYMIZED' | 'PRIVATE'; featured: boolean; order: number;
}

const text = (es: string, en: string): Localized => ({ es, en });
const capability = (es: string, en: string) => text(es, en);
const detail = (slug: string): ProjectLink => ({ label: text('Ver proyecto', 'View project'), url: `/projects/${slug}/`, kind: 'detail' });
const repository = (url: string): ProjectLink => ({ label: text('GitHub', 'GitHub'), url, kind: 'repository' });
const live = (labelEs: string, labelEn: string, url: string): ProjectLink => ({ label: text(labelEs, labelEn), url, kind: 'live' });

export const projects: Project[] = [
  {
    id: 'platform934', slug: 'platform934', publicName: text('Platform934', 'Platform934'), status: ['IMPLEMENTED', 'ACTIVE'], ecosystem: 'MEDIA_ENGINEERING', depth: 'DEEP_CASE_STUDY',
    content: { summary: text("Quería una forma propia de recorrer mi biblioteca de Jellyfin desde el móvil, la web y el sofá. El mando de la tele acabó abriendo unas cuantas tareas más.", "I wanted my own way to browse my Jellyfin library on mobile, on the web and from the sofa. The TV remote ended up adding a few more tasks."), engineeringStory: text('Producto y clientes sobre Jellyfin, con límites de responsabilidad claros y especialización progresiva para TV.', 'Product and client engineering above Jellyfin, with clear responsibility boundaries and progressive TV specialization.'), implementedCapabilities: [capability('Clientes móvil, web y TV Web; catálogo, autenticación y reproducción.', 'Mobile, web and TV Web clients; catalogue, authentication and playback.'), capability('Navegación con foco y mando, perfiles y UX de producto.', 'Focus and remote navigation, profiles and product UX.')], plannedCapabilities: [capability('Orquestación más amplia entre dispositivos.', 'Broader remote-device orchestration.')], nonClaims: [capability('No construye Jellyfin, su servidor, transcoder ni pipeline de códecs.', 'It does not build Jellyfin, its server, transcoder or codec pipeline.')], challengeTitle: text("El reto", "The challenge"), challenge: text("Reutilizar el cliente donde tenía sentido y dar a la TV el control de foco, ciclo de vida y reproducción que necesitaba.", "Reuse the client where it made sense and give TV the focus, lifecycle and playback control it needed.") },
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Media3', 'Jellyfin'].map(name => ({ name, signal: true })), relations: [
      { target: 'platform934-api', type: 'ECOSYSTEM', label: text('Gateway de capacidades', 'Capability gateway') }, { target: 'stream-optimizer', type: 'OPERATIONAL', label: text('Automatización de soporte', 'Supporting automation') }, { target: 'devagon-alley', type: 'DISTRIBUTION', label: text('Distribución y actualizaciones', 'Distribution and updates') },
    ], competencyIds: ['software-architecture', 'performance-engineering', 'mobile-multiplatform', 'applied-ai', 'agentic-engineering', 'agentic-product-architecture'], links: [detail('platform934'), live('Abrir proyecto', 'Open project', 'https://platform9bugwarts.antoniomdm.dev/')], visibility: 'PUBLIC', featured: true, order: 1,
  },
  {
    id: 'platform934-api', slug: 'platform934-api', publicName: text('Platform934 API', 'Platform934 API'), status: ['IMPLEMENTED', 'ACTIVE'], ecosystem: 'MEDIA_ENGINEERING', depth: 'STANDARD_PROJECT',
    content: { summary: text("Un backend privado para conversar sobre mi biblioteca y pedir recomendaciones o listas. La puerta de enlace del agente conecta esas conversaciones con operaciones concretas de Jellyfin.", "A private backend for talking about my library and asking for recommendations or lists. The agent gateway connects those conversations to concrete Jellyfin operations."), engineeringStory: text('Un gateway acotado separa las capacidades de cliente, el acceso a Jellyfin, Semantic Kernel, LiteLLM y la operación.', 'A bounded gateway separates client capabilities, Jellyfin access, Semantic Kernel, LiteLLM and operations.'), implementedCapabilities: [capability('Búsqueda, recomendaciones, creación y modificación de listas.', 'Search, recommendations, list creation and modification.'), capability('Discusión y explicación de películas con tool calling allowlisted y acotado.', 'Film discussion and explanation with bounded allowlisted tool calling.')], plannedCapabilities: [capability('Orquestación más amplia de reproducción y dispositivos: EN DESARROLLO.', 'Broader playback and device orchestration: IN PROGRESS.')], nonClaims: [capability('No es autónomo, no implementa MCP y no sustituye a Jellyfin.', 'It is not autonomous, does not implement MCP and does not replace Jellyfin.')], challengeTitle: text("El problema interesante", "The interesting problem"), challenge: text("Dejar que el agente proponga acciones sin entregarle la autoridad del catálogo ni del dispositivo. Los contratos tipados y las herramientas permitidas delimitan cada paso.", "Let the agent propose actions while keeping catalogue and device authority outside it. Typed contracts and allowed tools define each step.") },
    technologies: ['.NET', 'Semantic Kernel', 'LiteLLM', 'Jellyfin API', 'typed contracts', 'Docker'].map(name => ({ name, signal: true })), relations: [{ target: 'platform934', type: 'CAPABILITY', label: text('Relación de capacidad', 'Capability relationship') }], competencyIds: ['software-architecture', 'dotnet-backend', 'applied-ai', 'agentic-product-architecture', 'testing-quality'], links: [detail('platform934-api')], visibility: 'ANONYMIZED', featured: true, order: 2,
  },
  {
    id: 'stream-optimizer', slug: 'stream-optimizer', publicName: text('Stream Optimizer', 'Stream Optimizer'), status: ['IMPLEMENTED', 'BETA'], ecosystem: 'MEDIA_ENGINEERING', depth: 'STANDARD_PROJECT',
    content: { summary: text("El mantenimiento de una biblioteca multimedia tiene bastante trabajo repetitivo. Stream Optimizer reúne flujos de n8n y un worker de FFmpeg para automatizar trailers, normalización y transcodificación.", "Maintaining a media library involves plenty of repetitive work. Stream Optimizer brings together n8n workflows and an FFmpeg worker to automate trailers, normalization and transcoding."), engineeringStory: text('n8n coordina triggers, integraciones, decisiones por lotes, logs y solicitudes al worker; el procesamiento especializado permanece en un worker con control de bajo nivel.', 'n8n coordinates triggers, integrations, batch decisions, logging and worker requests; specialized processing remains in a worker where lower-level control is needed.'), implementedCapabilities: [capability('n8n coordina colecciones, trailers, organización/normalización, revisión y solicitudes asíncronas.', 'n8n coordinates collection, trailer, organization/normalization, review and asynchronous request workflows.'), capability('Worker especializado de FFmpeg para inspección, transcodificación y jobs.', 'Specialized FFmpeg worker for inspection, transcoding and job processing.')], plannedCapabilities: [], nonClaims: [capability('No es una plataforma de microservicios ni se publican métricas operativas.', 'It is not a microservices platform and no operational metrics are published.')], challengeTitle: text("Dónde se complicó", "Where it got tricky"), challenge: text("Coordinar tareas por lotes sin mezclar las decisiones del flujo con el procesamiento de vídeo. n8n organiza el trabajo y FFmpeg lo ejecuta en un worker separado.", "Coordinate batch tasks while keeping workflow decisions separate from video processing. n8n organizes the work and FFmpeg runs it in a separate worker.") },
    technologies: ['n8n', 'FFmpeg', 'Python', 'Docker', 'yt-dlp', 'TMDB integration'].map(name => ({ name, signal: true })), relations: [{ target: 'platform934', type: 'OPERATIONAL', label: text('Soporte fuera de la ruta normal de reproducción', 'Support outside the normal playback path') }], competencyIds: ['software-architecture', 'performance-engineering'], links: [detail('stream-optimizer')], visibility: 'PRIVATE', featured: true, order: 3,
  },
  {
    id: 'devagon-alley', slug: 'devagon-alley', publicName: text('Devagon Alley', 'Devagon Alley'), status: ['IMPLEMENTED', 'BETA'], ecosystem: 'MEDIA_ENGINEERING', depth: 'STANDARD_PROJECT',
    content: { summary: text("Mis aplicaciones también necesitaban un sitio desde el que descargarse y actualizarse. Devagon Alley es ese pequeño servicio de distribución privada: acceso, catálogo, versiones y descargas.", "My apps also needed somewhere to download and update themselves. Devagon Alley is that small private application distribution and update service: access, catalogue, versions and downloads."), engineeringStory: text('Un pequeño servicio HTTP en Dart expone metadatos, manifests y artefactos respaldados por filesystem detrás de límites de autenticación.', 'A small Dart HTTP service exposes filesystem-backed metadata, manifests and artifacts behind authentication boundaries.'), implementedCapabilities: [capability('Acceso autenticado, catálogo, descargas y consulta de última versión.', 'Authenticated access, catalogue, downloads and latest-version lookup.'), capability('Control de versiones, changelog e historial de releases.', 'Version management, changelog and release history.')], plannedCapabilities: [], nonClaims: [capability('No es marketplace público, tienda comercial ni sustituto de Google Play.', 'It is not a public marketplace, commercial app store or Google Play replacement.')], challengeTitle: text("Por el camino", "Along the way"), challenge: text("Distribuir una aplicación implica mantener versiones, manifests y descargas coherentes, además de decidir quién puede acceder. Todo queda detrás del mismo servicio autenticado.", "Distributing an app means keeping versions, manifests and downloads consistent, as well as deciding who can access them. Everything sits behind the same authenticated service.") },
    technologies: ['Dart', 'Docker', 'Nginx', 'Caddy', 'HTTP/JSON', 'filesystem-backed store'].map(name => ({ name, signal: true })), relations: [{ target: 'platform934', type: 'DISTRIBUTION', label: text('Distribuye aplicaciones privadas', 'Distributes private applications') }, { target: 'luna-studio', type: 'DISTRIBUTION', label: text('Ciclo de actualización', 'Update lifecycle') }], competencyIds: ['software-architecture', 'mobile-multiplatform'], links: [detail('devagon-alley'), live('Abrir proyecto', 'Open project', 'https://devagon-alley.antoniomdm.dev/')], visibility: 'PRIVATE', featured: false, order: 4,
  },
  {
    id: 'luna-tartas', slug: 'luna-tartas', publicName: text('Luna Tartas', 'Luna Tartas'), status: ['IMPLEMENTED', 'BETA'], ecosystem: 'COMMERCE_PRODUCT_ENGINEERING', depth: 'STANDARD_PROJECT',
    content: { summary: text("Una web para los regalos hechos a mano de Luna: tartas de pañales, papelería y detalles personalizados. El catálogo organiza los productos por tipo, ocasión y destinatario.", "A website for Luna’s handmade gifts: diaper cakes, stationery and personalized details. The catalogue organizes products by type, occasion and recipient."), engineeringStory: text('La arquitectura proporcional evita añadir backend, CMS, base de datos o cuentas cuando el dominio actual no los necesita.', 'Proportional architecture avoids adding a backend, CMS, database or accounts where the current domain does not require them.'), implementedCapabilities: [capability('Catálogo estructurado, validación de contenido, SEO y generación estática.', 'Structured catalogue, content validation, SEO and static generation.'), capability('CI, analítica con consentimiento y despliegue build-time.', 'CI, consent-aware analytics and build-time deployment.')], plannedCapabilities: [], nonClaims: [capability('La implementación es generación estática, no SSR.', 'The implementation uses static generation, not SSR.')], challengeTitle: text("La decisión", "The decision"), challenge: text("Publicar un catálogo útil con poco mantenimiento. La generación estática encaja con ese ritmo: validar el contenido, construir la web y publicar.", "Publish a useful catalogue with little maintenance. Static generation fits that rhythm: validate content, build the website and publish.") },
    technologies: ['Astro', 'TypeScript', 'Zod', 'static generation', 'SEO', 'GitHub Actions'].map(name => ({ name, signal: true })), relations: [{ target: 'luna-studio', type: 'EDITORIAL', label: text('Catálogo gestionado actualmente', 'Currently managed catalogue') }], competencyIds: ['software-architecture', 'full-stack-frontend', 'performance-engineering', 'testing-quality'], links: [repository('https://github.com/xenxi/luna_tartas'), detail('luna-tartas'), live('Visitar Luna Tartas', 'Visit Luna Tartas', 'https://lunatartas.es/')], visibility: 'PUBLIC', featured: true, order: 5,
  },
  {
    id: 'koso', slug: 'koso', publicName: text('Koso', 'Koso'), status: ['IMPLEMENTED', 'BETA'], ecosystem: 'COMMERCE_PRODUCT_ENGINEERING', depth: 'STANDARD_PROJECT',
    content: { summary: text("Cosas originales que pasan de una idea a un objeto. Koso reúne productos físicos y personalizados en una tienda propia, con impresión 3D entre las formas de fabricarlos.", "Original things that go from an idea to an object. Koso brings physical and personalized products together in its own store, with 3D printing among the ways to make them."), engineeringStory: text('Un storefront estático con colecciones JSON, esquemas estrictos y rutas de descubrimiento mantiene claro el límite del dominio.', 'A static storefront with JSON collections, strict schemas and discovery paths keeps the domain boundary clear.'), implementedCapabilities: [capability('Colecciones de producto y categoría, personalización, SEO y build estático.', 'Product and category collections, personalization, SEO and static build.'), capability('Tests unitarios y E2E con CI.', 'Unit and E2E tests with CI.')], plannedCapabilities: [], nonClaims: [capability('La URL es una preview temporal; no es dominio canónico ni producto terminado de producción.', 'The URL is a temporary preview; it is not a canonical domain or production-complete product.')], challengeTitle: text("Lo interesante", "The interesting part"), challenge: text("Dar a cada producto una forma clara de encontrarse y personalizarse, manteniendo el catálogo estructurado y la tienda independiente.", "Give each product a clear way to be found and personalized while keeping the catalogue structured and the store independent.") },
    technologies: ['Astro', 'TypeScript', 'Zod', 'JSON Content Collections', 'Playwright', 'Vitest'].map(name => ({ name, signal: true })), relations: [{ target: 'luna-studio', type: 'FUTURE', label: text('Dirección multi-tienda diseñada', 'Designed multi-store direction') }], competencyIds: ['full-stack-frontend', 'software-architecture', 'testing-quality'], links: [repository('https://github.com/xenxi/koso'), detail('koso'), live('Beta / preview temporal', 'Beta / temporary preview', 'https://koso-cosas-originales.xenxi-85.chatgpt.site/')], visibility: 'PRIVATE', featured: true, order: 6,
  },
  {
    id: 'luna-studio', slug: 'luna-studio', publicName: text('Luna Studio', 'Luna Studio'), status: ['IMPLEMENTED', 'BETA'], ecosystem: 'COMMERCE_PRODUCT_ENGINEERING', depth: 'STANDARD_PROJECT',
    content: { summary: text("Editar el catálogo de Luna desde una aplicación: productos, imágenes, inventario y publicación. Luna Studio es el backoffice privado en Flutter que conecta ese trabajo con la web.", "Edit Luna’s catalogue from an app: products, images, inventory and publishing. Luna Studio is the private Flutter backoffice connecting that work to the website."), engineeringStory: text('Resuelve primero una tienda real con límites explícitos entre UI, controlador, repositorio, fuente de datos y plataformas.', 'It solves one real store first with explicit boundaries between UI, controller, repository, data source and platforms.'), implementedCapabilities: [capability('Actual: Luna Studio -> Luna Tartas.', 'Current: Luna Studio -> Luna Tartas.'), capability('Edición de catálogo, inventario, autenticación, analítica y publicación.', 'Catalogue editing, inventory, authentication, analytics and publication workflows.')], plannedCapabilities: [capability('DESIGNED / PLANNED: Luna Studio -> Luna Tartas, Koso y futuras tiendas.', 'DESIGNED / PLANNED: Luna Studio -> Luna Tartas, Koso and future stores.')], nonClaims: [capability('No gestiona Koso actualmente ni es un manager N-store implementado.', 'It does not currently manage Koso and is not an implemented N-store manager.')], challengeTitle: text("Por el camino", "Along the way"), challenge: text("Traducir la edición visual a los archivos que construyen la tienda, conservando Git como fuente del catálogo. La dirección multi-tienda está diseñada; el trabajo actual se centra en Luna Tartas.", "Translate visual editing into the files that build the store while retaining Git as the catalogue source. The multi-store direction is designed; current work focuses on Luna Tartas.") },
    technologies: ['Flutter', 'Dart', 'Android', 'Windows', 'GitHub APIs', 'GA4 Data API'].map(name => ({ name, signal: true })), relations: [{ target: 'luna-tartas', type: 'EDITORIAL', label: text('Gestión actual de una tienda', 'Current single-store management') }, { target: 'koso', type: 'FUTURE', label: text('DESIGNED / PLANNED', 'DESIGNED / PLANNED') }], competencyIds: ['software-architecture', 'mobile-multiplatform', 'testing-quality'], links: [detail('luna-studio')], visibility: 'PRIVATE', featured: true, order: 7,
  },
  {
    id: 'antonios', slug: 'antonios', publicName: text('AntoñiOS', 'AntoñiOS'), status: ['IMPLEMENTED', 'ACTIVE'], ecosystem: 'PERSONAL_DEVELOPER_EXPERIENCE', depth: 'STANDARD_PROJECT',
    content: { summary: text("Un portfolio al que le salieron ventanas, terminal y un sistema operativo ficticio. Quería que recorrerlo también tuviera algo de exploración. Estás dentro.", "A portfolio that grew windows, a terminal and a fictional operating system. I wanted browsing it to feel a little like exploring. You are inside it."), engineeringStory: text("Un mismo modelo bilingüe alimenta las páginas y las ventanas. Astro genera el HTML y Preact añade la interacción.", "One bilingual model feeds the pages and windows. Astro generates the HTML and Preact adds interaction."), implementedCapabilities: [capability('Sistema de ventanas, responsive desktop/tablet/mobile y no-JS resilience.', 'Window system, desktop/tablet/mobile behavior and no-JS resilience.'), capability('Modelo profesional bilingüe, accesibilidad, presupuestos de rendimiento y gates de CI.', 'Bilingual professional model, accessibility, performance budgets and CI gates.')], plannedCapabilities: [], nonClaims: [capability('Flutter es histórico; la producción actual usa Astro, Preact y TypeScript.', 'Flutter is historical; current production uses Astro, Preact and TypeScript.')], challengeTitle: text("El reto", "The challenge"), challenge: text("Hacer convivir el escritorio interactivo con páginas que se puedan leer, enlazar y navegar también sin JavaScript, en español e inglés.", "Make the interactive desktop coexist with pages that can be read, linked and navigated without JavaScript, in Spanish and English.") },
    technologies: ['Astro', 'Preact', 'TypeScript', 'Playwright', 'Vitest', 'historical Flutter'].map(name => ({ name, signal: true })), relations: [{ target: 'bio-cli', type: 'DX', label: text('Ecosistema conceptual de DX', 'Conceptual DX ecosystem') }], competencyIds: ['software-architecture', 'legacy-modernization', 'performance-engineering', 'full-stack-frontend', 'testing-quality'], links: [repository('https://github.com/xenxi/antoniomdm.dev'), detail('antonios'), live('Visitar antoniomdm.dev', 'Visit antoniomdm.dev', 'https://antoniomdm.dev/')], visibility: 'PUBLIC', featured: true, order: 8,
  },
  {
    id: 'bio-cli', slug: 'bio-cli', publicName: text('bio-cli / bio-dev-card', 'bio-cli / bio-dev-card'), status: ['IMPLEMENTED'], ecosystem: 'PERSONAL_DEVELOPER_EXPERIENCE', depth: 'SMALL_PROJECT',
    content: { summary: text("Una pequeña tarjeta profesional para abrir en la terminal. Node.js y TypeScript, unas preguntas y los enlaces a mano.", "A small professional card to open in the terminal. Node.js and TypeScript, a few prompts and the links at hand."), engineeringStory: text("Una utilidad de terminal con formato ESM e interacción guiada.", "A terminal utility with ESM packaging and guided interaction."), implementedCapabilities: [capability('Tarjeta profesional interactiva en la terminal.', 'Interactive professional card in the terminal.')], plannedCapabilities: [], nonClaims: [capability('No se publican métricas de descargas, popularidad ni uso.', 'No download, popularity or usage metrics are published.')], challengeTitle: text("La idea", "The idea"), challenge: text("Llevar una presentación breve al entorno donde ya trabaja quien la abre, con una interacción pequeña y directa.", "Bring a brief introduction into the environment where its reader already works, with a small, direct interaction.") },
    technologies: ['Node.js', 'TypeScript', 'ESM', 'boxen', 'inquirer', 'open'].map(name => ({ name, signal: true })), relations: [{ target: 'antonios', type: 'ECOSYSTEM', label: text('Relación conceptual, no runtime', 'Conceptual, not runtime relationship') }], competencyIds: [], links: [repository('https://github.com/xenxi/bio-cli'), detail('bio-cli')], visibility: 'PUBLIC', featured: false, order: 9,
  },
];

const projectMedia: Partial<Record<ProjectId, Pick<Project, 'logo' | 'images'>>> = {
  'luna-studio': {"logo":{"src":"/images/projects/luna-studio/logo.webp","width":320,"height":320},"images":[{"src":"/images/projects/luna-studio/catalogue.webp","width":1248,"height":709,"alt":{"es":"Catálogo de Luna Studio con búsqueda, filtros de productos y estado de publicación.","en":"Luna Studio catalogue with search, product filters and publication status."},"caption":{"es":"Gestión del catálogo de Luna Tartas desde Luna Studio.","en":"Managing the Luna Tartas catalogue in Luna Studio."}}]},
  'stream-optimizer': {"logo":{"src":"/images/projects/stream-optimizer/logo.webp","width":320,"height":320}},
  'bio-cli': {"logo":{"src":"/images/projects/bio-cli/logo.webp","width":320,"height":320}},
  antonios: { logo: {"src":"/images/projects/antonios/logo.webp","width":320,"height":320}, images: [{ src: '/images/projects/antonios/desktop.webp', width: 1280, height: 720, alt: text('Escritorio de AntoñiOS con las ventanas de Perfil, Terminal y Proyectos.', 'AntoñiOS desktop with Profile, Terminal and Projects windows.'), caption: text('El escritorio de AntoñiOS en la versión local.', 'The AntoñiOS desktop in the local version.') }] },
  "devagon-alley": {
    "images": [
      {
        "src": "/images/projects/devagon-alley/home.webp",
        "width": 1420,
        "height": 593,
        "alt": {
          "es": "Consola de Devagon Alley con catálogo de aplicaciones y versiones.",
          "en": "Devagon Alley console with the app and version catalogue."
        },
        "caption": {
          "es": "Catálogo autenticado y distribución de aplicaciones.",
          "en": "Authenticated catalogue and app distribution."
        }
      }
    ],
    "logo": {
      "src": "/images/projects/devagon-alley/logo.webp",
      "width": 320,
      "height": 320
    }
  },
  "platform934": {
    "images": [
      {
        "src": "/images/projects/platform934/home.webp",
        "width": 1600,
        "height": 1174,
        "alt": {
          "es": "Inicio de Platform934 con catálogo multimedia, favoritos, películas y series.",
          "en": "Platform934 home with the media catalogue, favourites, films and series."
        },
        "caption": {
          "es": "Inicio del cliente web de Platform934.",
          "en": "Platform934 web client home."
        }
      }
    ],
    "logo": {"src":"/images/projects/platform934/logo.webp","width":320,"height":320}
  },
  "platform934-api": {
    "images": [],
    "logo": {
      "src": "/images/projects/platform934-api/logo.webp",
      "width": 320,
      "height": 320
    }
  },
  "luna-tartas": {
    "images": [
      {
        "src": "/images/projects/luna-tartas/home.webp",
        "width": 1270,
        "height": 714,
        "alt": {
          "es": "Portada de Luna Tartas con regalos personalizados y accesos por ocasión.",
          "en": "Luna Tartas home with personalized gifts and occasion shortcuts."
        },
        "caption": {
          "es": "Portada de lunatartas.es.",
          "en": "lunatartas.es home."
        }
      },
      {
        "src": "/images/projects/luna-tartas/catalogue.webp",
        "width": 1270,
        "height": 714,
        "alt": {
          "es": "Página de regalos personalizados de Luna Tartas.",
          "en": "Luna Tartas personalized gifts page."
        },
        "caption": {
          "es": "Entrada al catálogo de regalos personalizados.",
          "en": "Entrance to the personalized gifts catalogue."
        }
      }
    ],
    "logo": {
      "src": "/images/projects/luna-tartas/logo.webp",
      "width": 320,
      "height": 357
    }
  },
  "koso": {
    "images": [
      {
        "src": "/images/projects/koso/home.webp",
        "width": 1265,
        "height": 712,
        "alt": {
          "es": "Portada de Koso con objetos originales, personalización y categorías.",
          "en": "Koso home with original objects, personalization and categories."
        },
        "caption": {
          "es": "Captura de la versión local de Koso. Productos y precios de desarrollo.",
          "en": "Screenshot of the local Koso version. Development products and prices."
        }
      }
    ],
    "logo": {"src":"/images/projects/koso/logo.webp","width":320,"height":107}
  }
};
for (const project of projects) Object.assign(project, projectMedia[project.id]);

const labReasoning: Record<ProjectId, { purpose: Localized; tradeoff: Localized }> = {
  'platform934': { purpose: text('Explorar un producto multimedia completo y medir su comportamiento en hardware TV real.', 'Explore a complete media product and measure its behaviour on real TV hardware.'), tradeoff: text('Flutter favorecía la reutilización; Kotlin y Media3 exigen mantener un cliente específico a cambio de control sobre foco, ciclo de vida y reproducción.', 'Flutter favoured reuse; Kotlin and Media3 require a dedicated client in exchange for control over focus, lifecycle and playback.') },
  'platform934-api': { purpose: text('Añadir capacidades conversacionales sin entregar la verdad del catálogo ni la autoridad del dispositivo al LLM.', 'Add conversational capabilities while keeping catalogue truth and device authority outside the LLM.'), tradeoff: text('Los servicios deterministas, contratos tipados y herramientas permitidas añaden trabajo explícito de integración; limitan lo que el agente puede hacer y permiten validarlo.', 'Deterministic services, typed contracts and allowed tools add explicit integration work; they limit what the agent can do and make validation possible.') },
  'stream-optimizer': { purpose: text('Automatizar trabajo repetitivo sobre la biblioteca multimedia.', 'Automate repetitive media-library work.'), tradeoff: text('Separar n8n de FFmpeg implica mantener el contrato y los fallos del worker; permite aislar la orquestación del procesamiento pesado.', 'Separating n8n from FFmpeg requires maintaining the worker contract and failure handling; it isolates orchestration from heavy processing.') },
  'devagon-alley': { purpose: text('Distribuir y actualizar aplicaciones propias fuera de un catálogo público.', 'Distribute and update first-party applications outside a public catalogue.'), tradeoff: text('Una distribución privada reduce alcance de producto, pero obliga a mantener acceso, versiones y compatibilidad de las actualizaciones.', 'Private distribution narrows product scope but requires maintaining access, versions and update compatibility.') },
  'luna-tartas': { purpose: text('Entregar un catálogo comercial ligero con publicación controlada y poco coste de operación.', 'Deliver a lightweight commercial catalogue with controlled publishing and low operational overhead.'), tradeoff: text('Static-first reduce infraestructura en runtime; los cambios de catálogo pasan por validación y un nuevo build.', 'Static-first reduces runtime infrastructure; catalogue changes require validation and a new build.') },
  'koso': { purpose: text('Explorar catálogo, producto físico personalizado y fabricación 3D con una arquitectura proporcional.', 'Explore catalogues, customized physical products and 3D manufacturing with proportionate architecture.'), tradeoff: text('Una tienda estática mantiene bajo el coste operativo, a cambio de no asumir capacidades dinámicas de comercio que el producto todavía no necesita.', 'A static storefront keeps operational cost low without taking on dynamic commerce capabilities the product does not yet need.') },
  'luna-studio': { purpose: text('Editar catálogo y recursos desde una aplicación, conservando Git como fuente para la web estática.', 'Edit catalogue and assets through an application while retaining Git as the static site source.'), tradeoff: text('Un backoffice específico exige mantenimiento y compatibilidad con el formato editorial; conserva la sencillez operativa de la tienda y pospone la generalización multi-tienda.', 'A dedicated backoffice requires maintenance and editorial-format compatibility; it preserves storefront simplicity and postpones multi-store generalization.') },
  'antonios': { purpose: text('Hacer explorable una trayectoria profesional mediante una interfaz propia, accesible y bilingüe.', 'Make a professional career explorable through a distinctive, accessible bilingual interface.'), tradeoff: text('El escritorio y Arcade añaden estado e interacción; el HTML estático y la vista de lectura mantienen acceso directo al contenido.', 'Desktop and Arcade add state and interaction; static HTML and reading mode keep content directly accessible.') },
  'bio-cli': { purpose: text('Probar una tarjeta profesional distribuible dentro del entorno de trabajo del desarrollador.', 'Explore a distributable professional card within the developer working environment.'), tradeoff: text('El formato CLI es pequeño y concreto; su audiencia y capacidad de presentación son más limitadas que las de la web.', 'The CLI format is small and focused; its audience and presentation capabilities are narrower than the website.') },
};
for (const project of projects) Object.assign(project.content, labReasoning[project.id]);

export const ecosystemLabels: Record<ProjectEcosystem, Localized> = {
  MEDIA_ENGINEERING: text('Media Engineering', 'Media Engineering'),
  COMMERCE_PRODUCT_ENGINEERING: text('Comercio / Product Engineering', 'Commerce / Product Engineering'),
  PERSONAL_DEVELOPER_EXPERIENCE: text('Experiencia de desarrollo personal', 'Personal Developer Experience'),
};
export const statusLabels: Record<ProjectStatus, Localized> = {
  IMPLEMENTED: text('IMPLEMENTADO', 'IMPLEMENTED'), ACTIVE: text('ACTIVO', 'ACTIVE'), BETA: text('BETA', 'BETA'), IN_PROGRESS: text('EN DESARROLLO', 'IN PROGRESS'), DESIGNED: text('DISEÑADO', 'DESIGNED'), PLANNED: text('PREVISTO', 'PLANNED'), HISTORICAL: text('HISTÓRICO', 'HISTORICAL'),
};
export const depthLabels: Record<ProjectDepth, Localized> = { DEEP_CASE_STUDY: text('Caso profundo', 'Deep case study'), STANDARD_PROJECT: text('Proyecto estándar', 'Standard project'), SMALL_PROJECT: text('Proyecto pequeño', 'Small project') };
export const localizeProject = (project: Project, locale: Locale) => ({
  ...project,
  publicName: project.publicName[locale], ecosystem: ecosystemLabels[project.ecosystem][locale], status: project.status.map(status => statusLabels[status][locale]), depth: depthLabels[project.depth][locale],
  purpose: project.content.purpose![locale], tradeoff: project.content.tradeoff![locale],
  summary: project.content.summary[locale], engineeringStory: project.content.engineeringStory[locale], implementedCapabilities: project.content.implementedCapabilities.map(item => item[locale]), plannedCapabilities: project.content.plannedCapabilities.map(item => item[locale]), nonClaims: project.content.nonClaims.map(item => item[locale]), challengeTitle: project.content.challengeTitle[locale], challenge: project.content.challenge[locale],
  images: (project.images ?? []).map(image => ({ ...image, alt: image.alt[locale], caption: image.caption?.[locale] })),
  technologies: project.technologies.map(item => item.name), links: project.links.map(link => ({ ...link, label: link.label[locale] })),
});
