# Out of Context · Blog de AntoñiOS

## Español

### Arquitectura y rutas

Out of Context es el Blog y forma parte del mismo build estático de Astro y del dominio `antoniomdm.dev`. Español conserva la convención del portfolio sin prefijo: `/blog/` y `/blog/<slug>/`. Inglés vive en `/en/blog/` y `/en/blog/<slug>/`. Las rutas históricas `/notes/...`, `/out-of-scope/...` y sus equivalentes bajo `/es/` son redirecciones de compatibilidad, no contenido duplicado indexable.

La única aplicación Blog de AntoñiOS usa `/blog/app/` y simula un editor de código con el lenguaje visual Aura Pixel. Muestra metadatos y enlaza a la URL editorial canónica con `utm_source=antonios&utm_medium=portfolio&utm_campaign=blog`; nunca renderiza el cuerpo completo.

### Crear y previsualizar un artículo

Antes de crear, reescribir o revisar un artículo, lee la [guía editorial de Out of Context](BLOG_EDITORIAL_GUIDE.md). Es la fuente de verdad sobre identidad, voz, estructura, extensión y criterios de revisión; este documento conserva únicamente el contrato técnico y de publicación.

```sh
npm run article:new -- mi-pregunta
npm run dev
```

El comando crea dos borradores, sin publicarlos:

```text
src/content/out-of-scope/
├── es/mi-pregunta/index.mdx
└── en/mi-pregunta/index.mdx
```

Cada carpeta incluye `images/`. El comando no traduce el contenido: crea esqueletos ES/EN que deben escribirse y revisarse. Mantén `draft: true` hasta completar ambos. Los slugs pueden diferir entre idiomas; `translationKey` es la relación estable entre traducciones. Si una traducción no existe, no se genera un `hreflang` falso y el selector de idioma no aparece en ese artículo.

### Frontmatter

`title`, `summary`, `date`, `slug`, `locale`, `translationKey`, al menos un `tag`, `category`, `type` y `readingTime` son obligatorios. `summary` es manual y es la única fuente para tarjetas, listados, RSS y el formatter social. `seo.description`, si existe, sustituye al summary sólo en metadatos. Tipos permitidos: `exploration`, `experiment`, `postmortem` y `notes`; orientan la presentación, no fuerzan secciones.

```mdx
---
title: "¿Qué está ocurriendo aquí?"
summary: "Una exploración concreta de un comportamiento que sobrevivió al cierre de la historia original."
date: 2026-09-20
slug: "que-esta-ocurriendo"
locale: "es"
translationKey: "what-is-happening"
tags: ["Arquitectura", "Rendimiento"]
category: "Architecture"
type: "exploration"
readingTime: 6
featured: false
draft: true
linkedin:
  enabled: true
  mode: "review"
---
```

Un frontmatter inválido falla durante sync, typecheck o build con la ruta y el campo problemático. Antes de publicar ejecuta `npm run check`; para el recorrido real de navegador ejecuta también `npm run test:e2e` según la guía principal.

### Imágenes y componentes MDX

Las portadas usan el helper de imagen de Astro declarado en el schema: `cover: "./images/cover.webp"` exige `coverAlt`. Las imágenes del cuerpo se importan para conservar dimensiones y optimización:

```mdx
import flow from './images/flow.webp';

<Image src={flow} alt="Flujo simplificado" position="wide" caption="Del comando al siguiente frame." number={1} zoom />
```

`position` admite `inline`, `wide`, `full`, `left` y `right`; las posiciones laterales pasan a vertical en móvil. `zoom` usa un diálogo nativo navegable por teclado. También están disponibles `Gallery`, `Compare`, `Question`, `Experiment`, `Result`, `Observation`, `Aside`, `Callout`, `Code`, `OriginalScope`, `OutOfScope`, `OpenQuestions` y `AdSlot`. Estas piezas comparten una abstracción visual pequeña; no son plantillas obligatorias.

### Publicación, SEO y RSS

Al cambiar ambos borradores a `draft: false`, `npm run build` genera HTML estático, canonical limpio, OpenGraph, Twitter card, JSON-LD `BlogPosting`, sitemap y los feeds `/blog/rss.xml` y `/en/blog/rss.xml`. `seo.description ?? summary` es la regla de descripción. Los UTM nunca forman parte del canonical ni del `page_view`.

### Analytics

El Blog reutiliza `AnalyticsConsent.astro`, la propiedad GA4 existente y la pasarela tipada. No añade otro `gtag`. Sin consentimiento no carga GA ni acepta eventos. Registra `article_view`, profundidades únicas `article_50_percent` y `article_complete`, y los clics `article_project_click`, `article_portfolio_click`, `article_contact_click`, `article_share` y `article_external_link`. Sólo se envían slug, idioma, IDs estables o hostname; nunca query strings ni texto introducido.

### LinkedIn

```sh
npm run article:social -- --locale=es --slug=mi-pregunta
```

El formatter usa `title + summary + canonical URL` y añade los UTM de LinkedIn. `linkedin.text` es el override previsto; el valor por defecto de `mode` es `review`. El workflow genera el preview después del deploy y tiene `continue-on-error`; no publica nada. No hay credenciales, scraping ni automatización de navegador. Una integración futura debe usar una aplicación y API oficial de LinkedIn, guardar la `Review key` devuelta por el formatter y rechazar una segunda publicación con esa clave. También debe comprobar primero que la URL canónica desplegada responde correctamente.

### Publicidad

`AdSlot` y `src/config/ads.ts` son el límite de integración. `PUBLIC_ADS_ENABLED` es falso por defecto y, sin flag e ID público, el componente no produce HTML, espacio ni scripts. No hay IDs inventados. Antes de activar un proveedor hay que ampliar el consentimiento con una categoría publicitaria explícita, configurar IDs públicos mediante variables de entorno e implementar el adaptador oficial dentro de ese límite. Los anuncios sólo pertenecen a la página editorial, nunca a la ventana de AntoñiOS, y no deben insertarse dentro de código, tablas o bloques técnicos.

## English

### Architecture and routes

Out of Context is the Blog and is part of the same static Astro build and `antoniomdm.dev` domain. Spanish follows the portfolio convention without a prefix: `/blog/` and `/blog/<slug>/`. English lives at `/en/blog/` and `/en/blog/<slug>/`. Historical `/notes/...`, `/out-of-scope/...`, and `/es/` equivalents are compatibility redirects rather than duplicate indexable content.

The single AntoñiOS Blog app uses `/blog/app/` and simulates a code editor with the Aura Pixel visual language. It shows metadata and links to the canonical editorial URL with `utm_source=antonios&utm_medium=portfolio&utm_campaign=blog`; it never renders the full body.

### Creating and previewing an article

Before creating, rewriting, or reviewing an article, read the [Out of Context editorial guide](BLOG_EDITORIAL_GUIDE.md). It is the source of truth for identity, voice, structure, length, and review criteria; this document covers only the technical and publishing contract.

```sh
npm run article:new -- my-question
npm run dev
```

The command creates two unpublished drafts under `src/content/out-of-scope/es/my-question/` and `src/content/out-of-scope/en/my-question/`, each with an `images/` folder. It does not translate content: both ES/EN skeletons must be written and reviewed. Keep `draft: true` until both are complete. Slugs may differ; `translationKey` is their stable relationship. A missing translation produces neither a false `hreflang` nor a language switch on that article.

### Frontmatter

`title`, `summary`, `date`, `slug`, `locale`, `translationKey`, at least one `tag`, `category`, `type`, and `readingTime` are required. `summary` is hand-written and remains the single source for cards, listings, RSS, and social copy. `seo.description`, when present, replaces it only in metadata. Allowed types are `exploration`, `experiment`, `postmortem`, and `notes`; they guide presentation without enforcing sections. The Spanish example above has the exact same field structure for English.

Invalid frontmatter fails content sync, typecheck, or build with the affected path and field. Run `npm run check` before publishing and the repository's `npm run test:e2e` browser flow when completing full local verification.

### Images and MDX components

Covers use Astro's schema image helper: `cover: "./images/cover.webp"` requires `coverAlt`. Import body images and pass them to `Image` to retain dimensions and optimisation. Semantic positions are `inline`, `wide`, `full`, `left`, and `right`; side figures stack on mobile. `zoom` uses a keyboard-accessible native dialog.

Available components are `Image`, `Gallery`, `Compare`, `Question`, `Experiment`, `Result`, `Observation`, `Aside`, `Callout`, `Code`, `OriginalScope`, `OutOfScope`, `OpenQuestions`, and `AdSlot`. They share a small visual abstraction and do not impose an article template.

### Publishing, SEO and RSS

Once both drafts use `draft: false`, `npm run build` generates static HTML, a clean canonical, OpenGraph, Twitter card, `BlogPosting` JSON-LD, sitemap entries, and `/blog/rss.xml` plus `/en/blog/rss.xml`. The description rule is `seo.description ?? summary`. UTM values never enter the canonical or `page_view`.

### Analytics

The Blog reuses `AnalyticsConsent.astro`, the existing GA4 property, and the typed gateway. It adds no second `gtag`. Without consent, GA does not load and events are refused. It records `article_view`, one-shot `article_50_percent` and `article_complete` depths, plus `article_project_click`, `article_portfolio_click`, `article_contact_click`, `article_share`, and `article_external_link`. Only slugs, language, stable IDs, or a hostname are sent—never query strings or visitor-entered text.

### LinkedIn

Run `npm run article:social -- --locale=en --slug=my-question` to produce review copy from `title + summary + canonical URL` with LinkedIn UTM values. `linkedin.text` is the planned override and `review` is the default mode. The post-deploy workflow only generates a preview and cannot publish. It contains no credentials, scraping, or browser automation. A future integration must use an official LinkedIn application/API, persist the formatter's `Review key`, refuse duplicate keys, and first verify that the deployed canonical URL is reachable.

### Advertising

`AdSlot` and `src/config/ads.ts` are the integration boundary. `PUBLIC_ADS_ENABLED` is false by default; without the flag and a public ID the component produces no HTML, gap, or script. No IDs are invented. Before enabling a provider, add an explicit advertising consent category, configure public IDs through environment variables, and implement the official adapter within this boundary. Ads belong only in the full editorial page, never the AntoñiOS window or inside code, tables, and technical blocks.
