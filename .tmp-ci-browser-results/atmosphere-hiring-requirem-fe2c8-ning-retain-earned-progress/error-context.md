# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: atmosphere.spec.ts >> hiring requirements en: inspect locked jobs, resume training, retain earned progress
- Location: tests/e2e/atmosphere.spec.ts:41:36

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('dialog')
Expected substring: "Just change one button"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" getByRole('dialog') with timeout 5000ms
  - waiting for getByRole('dialog')

```

```yaml
- link "Skip to desktop content":
  - /url: "#desktop"
- region "AntoñiOS Career Mode":
  - text: JOB ROUTE ANTOÑIOS / COLOR
  - navigation "Career Mode navigation":
    - link "View full profile ↗":
      - /url: /en/profile/
    - link "Español":
      - /url: /arcade/?career=continue
      - text: ES
    - button "← Return to desktop"
  - heading "Freelance" [level=1]
  - paragraph: June 2013 — October 2014 · Web Developer
  - button "Return to town"
  - button "Menu"
  - button "Pause"
  - strong: ANTONIO
  - text: LV. 1 CHAPTERS 0 / 10
  - progressbar "CHAPTERS 0 / 10"
  - text: MISSION 0 / 4
  - progressbar "MISSION 0 / 4"
  - text: Career Town
  - paragraph: CURRENT OBJECTIVE
  - strong: Just change one button
  - text: Freelance E Energy 100% 79s
  - time: Sep 15, 2026, 04:06 PM
  - paragraph: WORK TODAY. A FUTURE TOMORROW.
  - figure "SCENE MAP":
    - text: SCENE MAP
    - img "Scene floor plan and route to the current objective"
    - text: Freelance
  - navigation "Menu":
    - button "M Map"
    - button "I Inventory"
    - button "J Jobs"
    - button "O Pause"
  - 'group "Pixel art town: walk with arrows and interact with E"':
    - iframe
    - text: E Interact · Workstation
    - link "Godot license":
      - /url: /licenses/godot.txt
      - text: GODOT
    - button "Follow the character"
  - paragraph: Arrows / WASD to walk · tap the floor to choose a destination or an object to approach it · E / space to interact · M for the map · hold the touch controls to walk.
  - group "Movement":
    - button "Walk north": ↑
    - button "Walk west": ←
    - button "Walk south": ↓
    - button "Walk east": →
  - button "Interact E"
  - group: Accessible direct interaction
  - complementary:
    - paragraph: Shared rental · rent and deadlines
    - paragraph: Prepare the website for delivery and resolve flat incidents to regain focus.
    - text: Energy
    - strong: 100/100
    - meter "Energy 100/100"
    - checkbox "Time challenge" [checked]
    - text: Time challenge 79s
    - progressbar "Time challenge"
    - paragraph: Main quest
    - heading "Just change one button" [level=2]
    - paragraph: The client cannot submit the form. Inspect the HTML and select the line that blocks it.
    - button "Open terminal mission →"
    - text: Accessible shortcut
    - paragraph: Go to the marked objective and press E, or use the shortcut.
    - list "Chapter missions":
      - listitem: Just change one button Workstation
      - listitem: Layout against the clock Workstation
      - listitem: Delivery works with a keyboard too Review board
      - listitem: Close scope, open the door Flatmate
    - group:
      - text: Optional incidents · 0/4
      - paragraph: "Focus: flat distractions consume energy. Resolving them restores calm."
      - button "◇ A leak before delivery"
      - button "◇ No connection to send the delivery"
      - button "◇ The washer is leaking foam" [disabled]
      - button "◇ Half an hour to review the delivery"
    - progressbar "Main quest"
    - link "View full experience ↗":
      - /url: /en/experience/#freelance
    - group: Decisions and evidence for this chapter
    - group: Campaign journal · 0/10
  - strong: Inventory
  - text: ▣ Phone ◇ Knowledge Settings and anecdotes recreated with humor. Missions are simulations; professional experience is linked separately.
  - 'button "Footsteps and doors: on" [pressed]'
  - button "Pause music"
  - text: Automatic local save
  - status: "Check the marked objective on the map: every mission has its own location."
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