# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: atmosphere.spec.ts >> hiring requirements es: inspect locked jobs, resume training, retain earned progress
- Location: tests/e2e/atmosphere.spec.ts:41:36

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
  - text: Profesional independiente E Energía 100% 80s
  - time: 15 sept 2026, 16:06
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
    - text: E Interactuar · Puesto de trabajo
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
    - strong: 100/100
    - meter "Energía 100/100"
    - checkbox "Contrarreloj" [checked]
    - text: Contrarreloj 80s
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
  5  | test.use({ launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
  6  | test('Godot ambience animates water, pauses gameplay and obeys live reduced-motion changes', async ({ page }) => {
  7  |   test.setTimeout(90000);
  8  |   const errors: string[] = [];
  9  |   page.on('pageerror', error => errors.push(error.message));
  10 |   page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  11 |   await page.goto('/arcade/');
  12 |   await page.locator('.arcade-launcher button').click();
  13 |   await page.getByRole('button', { name: 'Nueva partida', exact: true }).click();
  14 |   const world = page.locator('.godot-world'), canvas = page.frameLocator('.godot-frame').locator('canvas');
  15 |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  16 |   await expect(world).toHaveAttribute('data-player', '4,6');
  17 |   const box = (await canvas.boundingBox())!;
  18 |   const fountain = () => page.screenshot({ clip: { x: box.x + 279 / 480 * box.width, y: box.y + 150 / 320 * box.height, width: 41 / 480 * box.width, height: 39 / 320 * box.height } });
  19 |   // Read actual rendered pixels: the pond must change while the player stands still.
  20 |   const first = await fountain(); await page.waitForTimeout(350);
  21 |   expect((await fountain()).equals(first)).toBe(false);
  22 |   // Closed shutters stay fixed while the rest of the scene animates.
  23 |   const shutter = () => page.screenshot({ clip: { x: box.x + 216 / 480 * box.width, y: box.y + 78 / 320 * box.height, width: 6 / 480 * box.width, height: 9 / 320 * box.height } });
  24 |   const closed = await shutter(); await page.waitForTimeout(350);
  25 |   expect((await shutter()).equals(closed)).toBe(true);
  26 |   await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  27 |   await expect(world).toBeHidden();
  28 |   await page.keyboard.press('ArrowRight');
  29 |   await expect(world).toHaveAttribute('data-player', '4,6');
  30 |   await page.locator('.career-paused button').click();
  31 |   await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(300);
  32 |   const reduced = await canvas.screenshot(); await page.waitForTimeout(350);
  33 |   expect((await canvas.screenshot()).equals(reduced)).toBe(true);
  34 |   await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(250);
  35 |   const resumed = await fountain(); await page.waitForTimeout(350);
  36 |   expect((await fountain()).equals(resumed)).toBe(false);
  37 |   await world.screenshot({ path: 'test-results/living-town.png' });
  38 |   expect(errors).toEqual([]);
  39 | });
  40 | 
  41 | for (const locale of ['es', 'en']) test(`hiring requirements ${locale}: inspect locked jobs, resume training, retain earned progress`, async ({ page }) => {
  42 |   test.setTimeout(60000);
  43 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  44 |   await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  45 |   await page.locator('.arcade-launcher button').click();
  46 |   await page.getByRole('button', { name: locale === 'es' ? 'Nueva partida' : 'New game', exact: true }).click();
  47 |   const world = page.locator('.godot-world');
  48 |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  49 |   await page.locator('.job-shortcuts button').filter({ hasText: locale === 'es' ? 'Trabajos' : 'Jobs' }).click();
  50 |   await page.getByRole('dialog').getByRole('button', { name: /XUL/ }).click();
  51 |   const dialog = page.getByRole('dialog');
  52 |   await expect(dialog).toContainText(locale === 'es' ? 'Aún no te contratan' : 'Not hired yet');
  53 |   await expect(dialog).toContainText(locale === 'es' ? 'Solo es cambiar un botón' : 'Just change one button');
  54 |   await expect(world).toHaveAttribute('data-map', 'town');
  55 |   expect((await new AxeBuilder({ page }).include('.career-dialog').withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
  56 |   await dialog.screenshot({ path: `test-results/hiring-${locale}.png` });
  57 |   await dialog.getByRole('button', { name: locale === 'es' ? 'Continuar mi preparación' : 'Continue my preparation', exact: false }).click();
  58 |   await expect(world).toHaveAttribute('data-map', 'freelance');
  59 |   // The glowing exclamation is clickable, not merely decoration.
  60 | 
  61 |   await clickCompanyObject(page, 'freelance', 'terminal', true);
> 62 |   await expect(dialog).toContainText(locale === 'es' ? 'Solo es cambiar un botón' : 'Just change one button');
     |                        ^ Error: expect(locator).toContainText(expected) failed
  63 |   // Inspect earned mission progress while the required event is still pending.
  64 |   // Freeze its timer explicitly instead of racing the 200ms event trigger.
  65 |   const clockStart = new Date('2026-09-14T00:00:00Z');
  66 |   await page.clock.install({ time: clockStart });
  67 |   await page.clock.pauseAt(new Date(clockStart.getTime() + 1000));
  68 |   await dialog.locator('[data-choice="button"]').click();
  69 |   await page.clock.runFor(150);
  70 |   await dialog.getByRole('button').last().click();
  71 |   await page.locator('.job-shortcuts button').filter({ hasText: locale === 'es' ? 'Trabajos' : 'Jobs' }).click();
  72 |   await page.clock.runFor(150);
  73 |   await dialog.getByRole('button', { name: /XUL/ }).click();
  74 |   await page.clock.runFor(150);
  75 |   await expect(dialog).toContainText(locale === 'es' ? 'Demostrado' : 'Demonstrated');
  76 |   await expect(dialog).toContainText(locale === 'es' ? 'Habilidades por demostrar' : 'Skills to demonstrate');
  77 |   await expect(dialog).toContainText(locale === 'es' ? 'Maquetación contra reloj' : 'Layout against the clock');
  78 | });
  79 | 
```