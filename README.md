# AntoñiOS

Español por defecto sin prefijo, con inglés en `/en/`. Las rutas `/es/` son aliases estáticos de compatibilidad hacia español. **Todo texto nuevo o modificado debe estar en ambos idiomas.** Consulta [el requisito permanente](AGENTS.md), [el contrato público A2](docs/A2_PUBLIC_MODEL.md) y [la guía bilingüe](docs/BILINGUAL_CONTENT.md).

Spanish is the default without a prefix, with English under `/en/`. `/es/` routes are static compatibility aliases targeting Spanish. **Every new or modified text must be available in both languages.** See the guides above.

Software Architect Playground. An Astro + TypeScript + Preact portfolio with a desktop window manager, static content routes and an explicitly loaded Career Mode RPG.

**ES.** [Career Mode](docs/CAREER_MODE.md): nueve experiencias y un desafío final, mapas isométricos, seis familias de misiones, eventos personales, guardado local y CV siempre accesible. Entra desde `/arcade/`.

**EN.** [Career Mode](docs/CAREER_MODE.md): nine experiences and a final challenge, isometric maps, six mission families, personal events, local saves and an always accessible CV. Enter from `/en/arcade/`.

```sh
npm ci
npm run dev
```

Production: `npm run build` and `npm run preview`. Requires Node >=22.12 (CI uses Node 24). Astro 7 preview runs in the background; stop it with `npx astro preview stop`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Click, double click, tap or Enter on desktop icons. Drag the titlebar, resize at edges, use window controls, or move with Alt+arrows and resize with Alt+Shift+arrows. Escape minimizes; Alt+L opens the launcher. Mobile apps fill the workspace. Audio is off by default.

[Architecture and extension guide](docs/ANTONIOMDM_OS_ARCHITECTURE.md) · [Flutter legacy audit](docs/LEGACY_AUDIT.md) · [M1 delivery and checks](docs/M1_DELIVERY.md)

Original Flutter code/assets are retained under `legacy/flutter/`, **not part of the production build**. GitHub Actions builds only Astro and publishes dist to the existing gh-pages branch with the original antoniomdm.dev CNAME.

