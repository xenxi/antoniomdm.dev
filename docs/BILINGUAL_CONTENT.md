# Contenido bilingüe / Bilingual content

## Requisito / Requirement

ES: Español por defecto e inglés seleccionable. Cada cambio de texto debe incluir ambos idiomas, también en accesibilidad, errores, SEO, notas, CV y recursos compartidos. Este requisito permanente está en [AGENTS.md](../AGENTS.md).

EN: Spanish is the default and English is selectable. Every text change must include both languages, including accessibility, errors, SEO, notes, CV and shared assets. This permanent requirement is recorded in [AGENTS.md](../AGENTS.md).

## Implementación / Implementation

- ES: Las rutas originales sirven español; `/en/` sirve inglés. El selector conserva la página y los parámetros de lectura. La URL mantiene el idioma al navegar, recargar o compartir. No se redirige según el idioma del navegador.
- EN: Original routes serve Spanish; `/en/` serves English. The switch preserves the page and reading parameters. The URL retains the language when navigating, reloading or sharing. Browser language does not trigger redirects.
- ES: Interfaz en `src/i18n/es.ts` (claves en inglés); componentes con `useLocale()`. Datos profesionales en pares ES/EN en `src/data/career.ts`. No almacenar estado de idioma global durante renderizado estático.
- EN: Interface copy lives in `src/i18n/es.ts` (English keys); components use `useLocale()`. Career data uses ES/EN pairs in `src/data/career.ts`. Do not store global locale state during static rendering.
- ES: Cada nota debe existir con el mismo nombre en `src/content/notes/es/` y `src/content/notes/en/`. La compilación falla si falta una traducción publicada. Traducir título, descripción, etiquetas y cuerpo.
- EN: Each note must have the same filename in `src/content/notes/es/` and `src/content/notes/en/`. The build fails if a published translation is missing. Translate the title, description, tags and body.
- ES: CV y RSS se generan para ambos idiomas a partir de los mismos datos. Las imágenes sociales se generan con `npm run assets:prepare`.
- EN: CV and RSS are generated for both languages from shared data. Social images are generated with `npm run assets:prepare`.

## Fuente profesional / Career source

ES: Revisado el 10 de septiembre de 2026 contra `xenxi/knowledge-vault`: `career/master/profile.md`, `career/master/cv-master.md`, `career/projects/platform934.md` y `career/experience/early-career.md`. Se publican resúmenes profesionales, no el repositorio privado ni sus notas de trabajo. Conservar aproximaciones en métricas y distinguir trabajo terminado de funciones en desarrollo. La formación no implica título obtenido y el inglés no tiene nivel MCER acreditado.

EN: Reviewed on 10 September 2026 against the same knowledge-vault files. Publish professional summaries, not the private repository or its working notes. Preserve approximate metrics and distinguish completed work from features in progress. Education does not imply an awarded degree, and English has no certified CEFR level.

## Validación / Validation

`npm run check` y / and `npm run test:e2e`.

ES: Las pruebas cubren traducciones explícitas, paridad de trayectoria, CV, HTML sin JavaScript, selector, rutas profundas, navegación, vista de lectura y accesibilidad móvil en español. Las pruebas de comportamiento previas se ejecutan en las rutas inglesas.

EN: Tests cover explicit translations, career parity, CV, HTML without JavaScript, switching, deep routes, navigation, reading view and Spanish mobile accessibility. Existing behavior tests run on the English routes.
