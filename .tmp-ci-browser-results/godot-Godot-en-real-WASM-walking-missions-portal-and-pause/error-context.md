# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: godot.spec.ts >> Godot en: real WASM, walking, missions, portal and pause
- Location: tests/e2e/godot.spec.ts:8:36

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.career-game-heading h1')
Expected substring: "Signlab"
Received string:    "Career Town"
Timeout: 10000ms

Call log:
  - Expect "toContainText" locator('.career-game-heading h1') with timeout 10000ms
  - waiting for locator('.career-game-heading h1')
    21 × locator resolved to <h1>Career Town</h1>
       - unexpected value "Career Town"

```

```yaml
- heading "Career Town" [level=1]
```

# Test source

```ts
  1   | import { townProject } from '../../src/arcade/town-scene';
  2   | import { test, expect } from '@playwright/test';
  3   | import { chapters, missionById } from '../../src/arcade/campaign';
  4   | import { unlockBefore, clickCompanyObject } from './career-fixture';
  5   | import AxeBuilder from '@axe-core/playwright';
  6   | 
  7   | test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
  8   | for (const locale of ['es', 'en']) test(`Godot ${locale}: real WASM, walking, missions, portal and pause`, async ({ page }) => {
  9   |   test.setTimeout(90000);
  10  |   const errors: string[] = [];
  11  |   page.on('pageerror', error => errors.push(error.message));
  12  |   const requests: string[] = [];
  13  |   page.on('request', request => requests.push(request.url()));
  14  |   await unlockBefore(page, 'xul');
  15  |   await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  16  |   await expect(page.locator('[data-ready="true"]')).toBeVisible();
  17  |   expect(requests.filter(url => url.includes('/games/career/'))).toEqual([]);
  18  |   await page.locator('.arcade-launcher button').click();
  19  |   expect(requests.filter(url => url.endsWith('.wasm'))).toEqual([]);
  20  |   await page.locator('[data-chapter="xul"]').click();
  21  |   const world = page.locator('.godot-world');
  22  |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  23  |   expect(requests.some(url => url.endsWith('.wasm'))).toBe(true);
  24  |   const canvas = page.frameLocator('.godot-frame').locator('canvas');
  25  |   await expect(canvas).toBeVisible();
  26  |   await canvas.focus(); await canvas.press('ArrowUp');
  27  |   await expect(world).toHaveAttribute('data-player', '4,6');
  28  |   const box = (await canvas.boundingBox())!;
  29  |   await clickCompanyObject(page, 'xul', 'terminal');
  30  |   await expect(page.getByRole('dialog')).toContainText(locale === 'es' ? 'El primer bug' : 'The first bug');
  31  |   await page.locator('[data-choice="loop"]').click();
  32  |   await page.getByRole('dialog').getByRole('button').last().click();
  33  |   for (const id of chapters.find(c => c.id === 'xul')!.missions.slice(1)) {
  34  |     await page.locator('.career-quest-panel').getByRole('button', { name: locale === 'es' ? 'Abrir misión del terminal' : 'Open terminal mission' }).click();
  35  |     await page.locator('[data-choice="' + missionById[id].choices.find(c => c.accepted)!.id + '"]').click();
  36  |     await page.getByRole('dialog').getByRole('button').last().click();
  37  |   }
  38  |   await expect(page.locator('.godot-portal')).toHaveClass(/is-open/);
  39  |   await clickCompanyObject(page, 'xul', 'portal');
  40  |   await expect(world).toHaveAttribute('data-map', 'town');
  41  |   await canvas.click({ position: { x: townProject(14.5, 5.5)[0] / 480 * box.width, y: (townProject(14.5, 5.5)[1] - 5) / 320 * box.height } });
> 42  |   await expect(page.locator('.career-game-heading h1')).toContainText('Signlab', { timeout: 10000 });
      |                                                         ^ Error: expect(locator).toContainText(expected) failed
  43  |   await expect(world).toHaveAttribute('data-player', '4,7');
  44  |   await canvas.focus(); await canvas.press('Escape');
  45  |   await expect(page.locator('.career-paused')).toBeVisible();
  46  |   await page.locator('.career-paused button').click();
  47  |   await expect(world).toHaveAttribute('data-engine', 'ready');
  48  |   expect(requests.filter(url => url.endsWith('.wasm'))).toHaveLength(1);
  49  |   await canvas.focus(); await canvas.press('Tab');
  50  |   await expect(world.locator('a.godot-badge')).toBeFocused();
  51  |   await world.screenshot({ path: `test-results/godot-${locale}.png` });
  52  |   await canvas.screenshot({ path: `test-results/godot-map-${locale}.png` });
  53  |   expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  54  |   expect(errors).toEqual([]);
  55  | });
  56  | 
  57  | test('failed export retries Godot without a second engine or losing progress', async ({ page }) => {
  58  |   await page.route('**/games/career/index.html*', route => route.fulfill({ contentType: 'text/html', body: `<script>parent.postMessage({channel:'antonios:godot:v1',type:'error'},location.origin)</script>` }));
  59  |   await unlockBefore(page, 'xul');
  60  |   await page.goto('/en/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  61  |   await page.locator('.arcade-launcher button').click(); await page.locator('[data-chapter="xul"]').click();
  62  |   const world = page.locator('.godot-world');
  63  |   await expect(world).toHaveAttribute('data-engine', 'failed');
  64  |   await expect(world).toContainText('Try loading again');
  65  |   await expect(world.locator('canvas')).toHaveCount(0);
  66  |   await world.focus(); await page.keyboard.press('ArrowUp');
  67  |   await expect(world).toHaveAttribute('data-player', '4,7');
  68  |   await page.unroute('**/games/career/index.html*');
  69  |   await page.getByRole('button', { name: 'Try again' }).click();
  70  |   await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  71  |   await expect(world).toHaveAttribute('data-player', '4,7');
  72  |   await expect(page.locator('.godot-frame')).toHaveCount(1);
  73  |   await expect(world).toHaveAttribute('data-player', '4,7');
  74  | });
  75  | 
  76  | test.describe('Godot on a touch screen', () => {
  77  |   test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  78  |   test('touch movement, real scene and localized continuation', async ({ page }) => {
  79  |     await page.goto('/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  80  |     await page.locator('.arcade-launcher button').tap(); await page.locator('[data-chapter="freelance"]').tap();
  81  |     const world = page.locator('.godot-world');
  82  |     await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  83  |     const canvas = page.frameLocator('.godot-frame').locator('canvas');
  84  |     await page.getByRole('button', { name: 'Caminar al norte', exact: true }).tap();
  85  |     await expect(world).toHaveAttribute('data-player', '4,6');
  86  |     await canvas.scrollIntoViewIfNeeded();
  87  | 
  88  |     await clickCompanyObject(page, 'freelance', 'terminal', false, true);
  89  |     await expect(page.getByRole('dialog')).toContainText('Solo es cambiar un botón');
  90  |     await page.getByRole('button', { name: 'Cerrar', exact: true }).tap();
  91  |     await expect(world).toHaveAttribute('data-player', '3,7');
  92  |     await canvas.screenshot({ path: 'test-results/godot-room.png' });
  93  |     await page.locator('.career-game-heading').scrollIntoViewIfNeeded();
  94  |     await page.screenshot({ path: 'test-results/godot-mobile.png' });
  95  |     expect(await page.locator('.career-world').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  96  |     await page.locator('.career-world a[data-language]').tap();
  97  |     await expect(page).toHaveURL('/en/arcade/?career=continue');
  98  |     await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  99  |     await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  100 |     await expect(world).toHaveAttribute('data-player', '3,7');
  101 |     expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  102 |   });
  103 | });
  104 | 
```