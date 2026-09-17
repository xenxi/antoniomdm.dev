# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: town.spec.ts >> desktop: explore town, locked doors, enter and leave, preserve world across languages
- Location: tests/e2e/town.spec.ts:6:45

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.career-status')
Expected substring: "Puerta cerrada"
Received string:    "Camina hasta una puerta y pulsa E, o toca un edificio para acercarte. Empieza por la casa freelance, con tejado de tejas, al noroeste."
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('.career-status') with timeout 5000ms
  - waiting for locator('.career-status')
    12 × locator resolved to <p role="status" class="career-status">Camina hasta una puerta y pulsa E, o toca un edif…</p>
       - unexpected value "Camina hasta una puerta y pulsa E, o toca un edificio para acercarte. Empieza por la casa freelance, con tejado de tejas, al noroeste."

```

```yaml
- status: Camina hasta una puerta y pulsa E, o toca un edificio para acercarte. Empieza por la casa freelance, con tejado de tejas, al noroeste.
```

# Test source

```ts
  1  | import { townProject } from '../../src/arcade/town-scene';
  2  | import { test, expect } from '@playwright/test';
  3  | import AxeBuilder from '@axe-core/playwright';
  4  | 
  5  | test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
  6  | for (const engine of ['desktop', 'mobile']) test(`${engine}: explore town, locked doors, enter and leave, preserve world across languages`, async ({ page }) => {
  7  |   test.setTimeout(60000);
  8  |   if (engine === 'mobile') await page.setViewportSize({ width: 390, height: 844 });
  9  |   await page.goto('/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  10 |   await page.locator('.arcade-launcher button').click();
  11 |   await expect(page.locator('[data-chapter="xul"]')).toBeDisabled();
  12 |   await page.getByRole('button', { name: 'Nueva partida', exact: false }).click();
  13 |   const world = page.locator('.godot-world');
  14 |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  15 |   await expect(world).toHaveAttribute('data-map', 'town');
  16 |   await expect(world).toHaveAttribute('data-player', '4,6');
  17 |   const canvas = page.frameLocator('.godot-frame').locator('canvas');
  18 |   const box = (await canvas.boundingBox())!;
  19 |   // A future building is reachable, but approaching it cannot start a locked chapter.
  20 |   await canvas.click({ position: { x: townProject(9.5, 5.5)[0] / 480 * box.width, y: (townProject(9.5, 5.5)[1] - 5) / 320 * box.height } });
> 21 |   await expect(page.locator('.career-status')).toContainText('Puerta cerrada');
     |                                                ^ Error: expect(locator).toContainText(expected) failed
  22 |   await expect(page.getByRole('dialog')).toContainText('Aún no te contratan');
  23 |   await expect(page.getByRole('dialog')).toContainText('Solo es cambiar un botón');
  24 |   await page.getByRole('dialog').getByRole('button', { name: 'Cerrar', exact: true }).click();
  25 |   await expect(world).toHaveAttribute('data-map', 'town');
  26 |   await canvas.click({ position: { x: townProject(4.5, 5.5)[0] / 480 * box.width, y: (townProject(4.5, 5.5)[1] - 5) / 320 * box.height } });
  27 |   await expect(world).toHaveAttribute('data-map', 'freelance');
  28 |   await page.locator('.career-game-heading').getByRole('button', { name: 'Volver a la ciudad' }).click();
  29 |   await expect(world).toHaveAttribute('data-map', 'town');
  30 |   await expect(world).toHaveAttribute('data-player', '4,6');
  31 |   await page.getByRole('button', { name: 'Caminar al este', exact: true }).click();
  32 |   await expect(world).toHaveAttribute('data-player', '5,6');
  33 |   await page.locator('.career-world a[data-language]').click();
  34 |   await expect(page).toHaveURL('/en/arcade/?career=continue');
  35 |   await expect(world).toHaveAttribute('data-map', 'town');
  36 |   await expect(world).toHaveAttribute('data-player', '5,6');
  37 |   await expect(page.locator('.career-game-heading h1')).toHaveText('Career Town');
  38 |   await expect(page.locator('[data-company="xul"]')).toBeDisabled();
  39 |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  40 |   await page.locator('.career-world').evaluate(el => { el.scrollTop = 0; });
  41 |   await page.screenshot({ path: `test-results/town-${engine}.png`, fullPage: true });
  42 |   await page.getByRole('button', { name: 'Follow the character', exact: true }).click();
  43 |   await expect(world).toHaveAttribute('data-zoom', '2');
  44 |   const zoomCanvas = page.frameLocator('.godot-frame').locator('canvas');
  45 |   const zoomBox = (await zoomCanvas.boundingBox())!;
  46 |   await zoomCanvas.click({ position: { x: (240 + 9.6 * 2) / 480 * zoomBox.width, y: (townProject(6.5, 6.5)[1] * 2) / 320 * zoomBox.height } });
  47 |   await expect(world).toHaveAttribute('data-player', '6,6');
  48 |   await page.locator('.career-game-heading').scrollIntoViewIfNeeded();
  49 |   await page.screenshot({ path: `test-results/town-zoom-${engine}.png`, fullPage: true });
  50 |   expect(await page.locator('.career-world').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  51 |   expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  52 | });
  53 | 
```