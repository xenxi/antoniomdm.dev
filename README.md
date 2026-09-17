# AntoñiOS

Español por defecto sin prefijo, con inglés en `/en/`. Las rutas `/es/` son aliases estáticos de compatibilidad hacia español. **Todo texto nuevo o modificado debe estar en ambos idiomas.** Consulta [el requisito permanente](AGENTS.md), [el contrato público A2](docs/A2_PUBLIC_MODEL.md) y [la guía bilingüe](docs/BILINGUAL_CONTENT.md).

Spanish is the default without a prefix, with English under `/en/`. `/es/` routes are static compatibility aliases targeting Spanish. **Every new or modified text must be available in both languages.** See the guides above.

Software Architect Playground. An Astro + TypeScript + Preact portfolio with a desktop window manager, static content routes and an explicitly loaded Career Mode RPG.

**ES.** [Career Mode](docs/CAREER_MODE.md): nueve experiencias y un desafío final, ciudad abierta isométrica e interiores isométricos con estética de neón, seis familias de misiones, eventos personales, guardado local y CV siempre accesible. Entra desde `/arcade/`.

**EN.** [Career Mode](docs/CAREER_MODE.md): nine experiences and a final challenge, an isometric open town and neon isometric interiors, six mission families, personal events, local saves and an always accessible CV. Enter from `/en/arcade/`.

**ES.** [Mundo Godot](docs/GODOT_ARCADE.md): personajes pixel art, ciudad con parques y empresas cuyas puertas se abren al completar cada etapa. Configura `GODOT_BIN` con Godot 4.7.2 y sus plantillas, y ejecuta `npm run build:godot` antes de iniciar la web. `npm run build:release` prepara la exportación completa.

**EN.** [Godot world](docs/GODOT_ARCADE.md): pixel art characters, a town with parks and company doors unlocked by completing each chapter. Set `GODOT_BIN` to Godot 4.7.2 with its templates, then run `npm run build:godot` before starting the website. `npm run build:release` prepares the complete export.

```sh
npm ci
npm run dev
```

**ES.** Para la validación completa local instala Node/npm (Node >=22.12; CI usa Node 24), Godot `4.7.2.stable`, sus Export Templates oficiales `4.7.2.stable` y los navegadores de Playwright. Configura `GODOT_BIN` con el ejecutable de Godot si no está en `PATH`. `npm ci` activa el hook pre-push versionado automáticamente. Producción: `npm run build` y `npm run preview`. Astro 7 preview se ejecuta en segundo plano; detenlo con `npx astro preview stop`.

**EN.** For complete local verification install Node/npm (Node >=22.12; CI uses Node 24), Godot `4.7.2.stable`, its official `4.7.2.stable` Export Templates, and Playwright browsers. Set `GODOT_BIN` to the Godot executable if it is not on `PATH`. `npm ci` automatically enables the versioned pre-push hook. Production: `npm run build` and `npm run preview`. Astro 7 preview runs in the background; stop it with `npx astro preview stop`.

```sh
npx playwright install chromium
npm run verify:local
```

**ES.** Ejecuta `npx playwright install chromium` una vez tras instalar dependencias y después `npm run verify:local` antes de cada push o PR. El comando ejecuta, por orden, `test:godot`, tests unitarios, lint, typecheck y `test:e2e`; este último exporta el build Web real de Godot y construye Astro antes de Playwright. Un fallo devuelve un código de salida distinto de cero y cancela el push normal mediante `.githooks/pre-push` (Git permite omitirlo con `--no-verify`).

**EN.** Run `npx playwright install chromium` once after installing dependencies, then run `npm run verify:local` before every push or PR. The command runs, in order, `test:godot`, unit tests, lint, typecheck, and `test:e2e`; the latter exports the real Godot Web build and builds Astro before Playwright. A failure returns a non-zero exit code and cancels a normal push through `.githooks/pre-push` (Git allows bypassing it with `--no-verify`).

**ES.** La validación completa, incluido Playwright/Godot E2E, se aplica localmente. El CI obligatorio de GitHub ejecuta `test:godot`, tests unitarios, lint, typecheck y build. El workflow **ANTONIOMDM OS · manual browser E2E** conserva los E2E Playwright/Godot para ejecuciones manuales desde la pestaña Actions mientras se investiga la diferencia de entorno.

**EN.** Complete validation, including Playwright/Godot E2E, is enforced locally. Required GitHub CI runs `test:godot`, unit tests, lint, typecheck, and build. The **ANTONIOMDM OS · manual browser E2E** workflow retains Playwright/Godot E2E for manual runs from the Actions tab while the environment difference is investigated.

Click, double click, tap or Enter on desktop icons. Drag the titlebar, resize at edges, use window controls, or move with Alt+arrows and resize with Alt+Shift+arrows. Escape minimizes; Alt+L opens the launcher. Mobile apps fill the workspace. Audio is off by default.

[Architecture and extension guide](docs/ANTONIOMDM_OS_ARCHITECTURE.md) · [Flutter legacy audit](docs/LEGACY_AUDIT.md) · [M1 delivery and checks](docs/M1_DELIVERY.md)

Original Flutter code/assets are retained under `legacy/flutter/`, **not part of the production build**. GitHub Actions builds only Astro and publishes dist to the existing gh-pages branch with the original antoniomdm.dev CNAME.

