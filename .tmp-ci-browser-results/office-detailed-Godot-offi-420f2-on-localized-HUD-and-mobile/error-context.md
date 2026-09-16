# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: office.spec.ts >> detailed Godot office es: art, navigation, localized HUD and mobile
- Location: tests/e2e/office.spec.ts:6:36

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('dialog')
Expected substring: "Solo es cambiar un botón"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" getByRole('dialog') with timeout 5000ms
  - waiting for getByRole('dialog')

```

```yaml
- link "Saltar al contenido del escritorio":
  - /url: "#desktop"
- region "AntoñiOS Career Mode":
  - text: JOB ROUTE ANTOÑIOS / COLOR
  - navigation "Navegación de Career Mode":
    - link "Ver perfil completo ↗":
      - /url: /profile/
    - link "English":
      - /url: /en/arcade/?career=continue
      - text: EN
    - button "← Volver al escritorio"
  - heading "Profesional independiente" [level=1]
  - paragraph: Junio de 2013 — Octubre de 2014 · Desarrollador web
  - button "Volver a la ciudad"
  - button "Menú"
  - button "Pausar"
  - strong: ANTONIO
  - text: NV. 1 ETAPAS 0 / 10
  - progressbar "ETAPAS 0 / 10"
  - text: MISIÓN 0 / 4
  - progressbar "MISIÓN 0 / 4"
  - text: Villa Trayectoria
  - paragraph: OBJETIVO ACTUAL
  - strong: Solo es cambiar un botón
  - text: Profesional independiente E Energía 97% 67s
  - time: 15 sept 2026, 16:11
  - paragraph: TRABAJO HOY. UN FUTURO MAÑANA.
  - figure "PLANO DEL ESCENARIO":
    - text: PLANO DEL ESCENARIO
    - img "Plano del escenario y ruta al objetivo actual"
    - text: Profesional independiente
  - navigation "Menú":
    - button "M Mapa"
    - button "I Inventario"
    - button "J Trabajos"
    - button "O Pausa"
  - 'group "Ciudad pixel art: camina con flechas e interactúa con E"':
    - iframe
    - link "Licencia de Godot":
      - /url: /licenses/godot.txt
      - text: GODOT
    - button "Acercar al personaje"
  - paragraph: Flechas / WASD para caminar · pulsa el suelo para elegir destino o un objeto para acercarte · E / espacio para interactuar · M para el mapa · mantén pulsados los controles táctiles.
  - group "Movimiento":
    - button "Caminar al norte": ↑
    - button "Caminar al oeste": ←
    - button "Caminar al sur": ↓
    - button "Caminar al este": →
  - button "Interactuar E"
  - group: Interacción directa accesible
  - complementary:
    - paragraph: Piso compartido · alquiler y deadlines
    - paragraph: Prepara la web para la entrega y resuelve las incidencias del piso para recuperar concentración.
    - text: Energía
    - strong: 97/100
    - meter "Energía 97/100"
    - checkbox "Contrarreloj" [checked]
    - text: Contrarreloj 67s
    - progressbar "Contrarreloj"
    - paragraph: Misión principal
    - heading "Solo es cambiar un botón" [level=2]
    - paragraph: El cliente no puede enviar el formulario. Inspecciona el HTML y selecciona la línea que lo bloquea.
    - button "Abrir misión del terminal →"
    - text: Acceso directo accesible
    - paragraph: Ve al objetivo marcado y pulsa E, o usa el acceso directo.
    - list "Misiones de esta etapa":
      - listitem: Solo es cambiar un botón Puesto de trabajo
      - listitem: Maquetación contra reloj Puesto de trabajo
      - listitem: La entrega también se usa con teclado Panel de revisión
      - listitem: Cerrar alcance, abrir la puerta Compañero de piso
    - group:
      - text: Incidencias opcionales · 0/4
      - paragraph: "Concentración: las distracciones del piso consumen energía. Resolverlas devuelve la calma."
      - button "◇ Una fuga antes de la entrega"
      - button "◇ Sin conexión para enviar la entrega"
      - button "◇ La lavadora pierde espuma" [disabled]
      - button "◇ Media hora para revisar la entrega"
    - progressbar "Misión principal"
    - link "Ver experiencia completa ↗":
      - /url: /experience/#freelance
    - group: Decisiones y evidencia de esta etapa
    - group: Diario de campaña · 0/10
  - strong: Inventario
  - text: ▣ Teléfono ◇ Conocimiento Escenarios y anécdotas recreados con humor. Las misiones son simulaciones; la experiencia profesional está enlazada por separado.
  - 'button "Pasos y puertas: activados" [pressed]'
  - button "Pausar música"
  - text: Guardado local automático
  - status: "Consulta el objetivo marcado en el plano: cada misión tiene su lugar."
```

# Test source

```ts
  1  | import { clickCompanyObject } from './career-fixture';
  2  | import { test, expect } from '@playwright/test';
  3  | import AxeBuilder from '@axe-core/playwright';
  4  | 
  5  | test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
  6  | for (const locale of ['es', 'en']) test(`detailed Godot office ${locale}: art, navigation, localized HUD and mobile`, async ({ page }) => {
  7  |   test.setTimeout(90000);
  8  |   const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  9  |   await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  10 |   await expect(page.locator('[data-ready="true"]')).toBeVisible();
  11 |   await page.locator('.arcade-launcher button').click();
  12 |   await page.locator('[data-chapter="freelance"]').click();
  13 |   const world = page.locator('.godot-world');
  14 |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  15 |   await expect(world).toHaveAttribute('data-zoom', '1');
  16 |   await expect(world.locator('canvas')).toHaveCount(0);
  17 |   const canvas = page.frameLocator('.godot-frame').locator('canvas');
  18 |   await page.waitForTimeout(1200);
  19 |   await page.locator('.career-scene').screenshot({ path: `test-results/office-${locale}.png` });
  20 |   await canvas.focus(); await canvas.press('i');
  21 |   await expect(page.getByRole('dialog')).toContainText(locale === 'es' ? 'Inventario' : 'Inventory');
  22 |   await page.keyboard.press('Escape');
  23 |   await expect(page.getByRole('dialog')).toHaveCount(0);
  24 |   await expect(page.locator('.godot-frame')).not.toHaveAttribute('aria-hidden', 'true');
  25 |   await canvas.focus(); await canvas.press('j');
  26 |   await expect(page.getByRole('dialog')).toContainText(locale === 'es' ? 'Trabajos' : 'Jobs');
  27 |   await page.keyboard.press('Escape');
  28 |   await expect(page.getByRole('dialog')).toHaveCount(0);
  29 |   await expect(page.locator('.godot-frame')).not.toHaveAttribute('aria-hidden', 'true');
  30 |   await canvas.focus(); await canvas.press('o');
  31 |   await expect(page.locator('.career-paused')).toBeVisible();
  32 |   await page.locator('.career-paused button').click();
  33 |   await canvas.focus(); await canvas.press('ArrowUp');
  34 |   await expect(world).toHaveAttribute('data-player', '4,6');
  35 | 
  36 |   await clickCompanyObject(page, 'freelance', 'terminal');
> 37 |   await expect(page.getByRole('dialog')).toContainText(locale === 'es' ? 'Solo es cambiar un botón' : 'Just change one button');
     |                                          ^ Error: expect(locator).toContainText(expected) failed
  38 |   await page.getByRole('dialog').getByRole('button', { name: locale === 'es' ? 'Cerrar' : 'Close', exact: true }).click();
  39 |   await page.setViewportSize({ width: 390, height: 844 });
  40 |   await page.locator('.career-world').evaluate(el => { el.scrollTop = 0; });
  41 |   await page.screenshot({ path: `test-results/office-mobile-${locale}.png` });
  42 |   expect(await page.locator('.career-world').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  43 |   expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  44 |   expect(errors).toEqual([]);
  45 | });
  46 | 
```