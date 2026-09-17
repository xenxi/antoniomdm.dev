# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: office.spec.ts >> detailed Godot office en: art, navigation, localized HUD and mobile
- Location: tests/e2e/office.spec.ts:6:36

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
  - text: Freelance E Energy 100% 68s
  - time: Sep 15, 2026, 04:11 PM
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
    - text: Time challenge 68s
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