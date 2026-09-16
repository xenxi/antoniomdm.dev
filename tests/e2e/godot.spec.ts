import { townProject } from '../../src/arcade/town-scene';
import { test, expect } from '@playwright/test';
import { chapters, missionById } from '../../src/arcade/campaign';
import { unlockBefore, clickCanvasPoint, clickCompanyObject, dumpGodotDebugBestEffort, enableGodotE2EDebug, waitForGodotInteraction } from './career-fixture';
import AxeBuilder from '@axe-core/playwright';

test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
test.beforeEach(async ({ page }) => enableGodotE2EDebug(page));
test.afterEach(async ({ page }, testInfo) => { if (testInfo.status !== testInfo.expectedStatus) await dumpGodotDebugBestEffort(page, testInfo); });
for (const locale of ['es', 'en']) test(`Godot ${locale}: real WASM, walking, missions, portal and pause`, async ({ page }) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await unlockBefore(page, 'xul');
  await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  expect(requests.filter(url => url.includes('/games/career/'))).toEqual([]);
  await page.locator('.arcade-launcher button').click();
  expect(requests.filter(url => url.endsWith('.wasm'))).toEqual([]);
  await page.locator('[data-chapter="xul"]').click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  expect(requests.some(url => url.endsWith('.wasm'))).toBe(true);
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  await expect(canvas).toBeVisible();
  await canvas.focus(); await canvas.press('ArrowUp');
  await expect(world).toHaveAttribute('data-player', '4,6');
  await clickCompanyObject(page, 'xul', 'terminal');
  await waitForGodotInteraction(page, 'terminal', locale === 'es' ? 'El primer bug' : 'The first bug');
  await page.locator('[data-choice="loop"]').click();
  await page.getByRole('dialog').getByRole('button').last().click();
  for (const id of chapters.find(c => c.id === 'xul')!.missions.slice(1)) {
    await page.locator('.career-quest-panel').getByRole('button', { name: locale === 'es' ? 'Abrir misión del terminal' : 'Open terminal mission' }).click();
    await page.locator('[data-choice="' + missionById[id].choices.find(c => c.accepted)!.id + '"]').click();
    await page.getByRole('dialog').getByRole('button').last().click();
  }
  await expect(page.locator('.godot-portal')).toHaveClass(/is-open/);
  await clickCompanyObject(page, 'xul', 'portal');
  await waitForGodotInteraction(page, 'portal');
  await expect(world).toHaveAttribute('data-map', 'town', { timeout: 30_000 });
  await expect(world).toHaveAttribute('data-godot-map', 'town');
  await clickCanvasPoint(page, { x: townProject(14.5, 5.5)[0], y: townProject(14.5, 5.5)[1] - 5 }, 'town-signlab');
  await expect(page.locator('.career-game-heading h1')).toContainText('Signlab', { timeout: 10000 });
  await expect(world).toHaveAttribute('data-player', '4,7');
  await canvas.focus(); await canvas.press('Escape');
  await expect(page.locator('.career-paused')).toBeVisible();
  await page.locator('.career-paused button').click();
  await expect(world).toHaveAttribute('data-engine', 'ready');
  expect(requests.filter(url => url.endsWith('.wasm'))).toHaveLength(1);
  await canvas.focus(); await canvas.press('Tab');
  await expect(world.locator('a.godot-badge')).toBeFocused();
  await world.screenshot({ path: `test-results/godot-${locale}.png` });
  await canvas.screenshot({ path: `test-results/godot-map-${locale}.png` });
  expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});

test('failed export retries Godot without a second engine or losing progress', async ({ page }) => {
  await page.route('**/games/career/index.html*', route => route.fulfill({ contentType: 'text/html', body: `<script>parent.postMessage({channel:'antonios:godot:v1',type:'error'},location.origin)</script>` }));
  await unlockBefore(page, 'xul');
  await page.goto('/en/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.arcade-launcher button').click(); await page.locator('[data-chapter="xul"]').click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine', 'failed');
  await expect(world).toContainText('Try loading again');
  await expect(world.locator('canvas')).toHaveCount(0);
  await world.focus(); await page.keyboard.press('ArrowUp');
  await expect(world).toHaveAttribute('data-player', '4,7');
  await page.unroute('**/games/career/index.html*');
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await expect(world).toHaveAttribute('data-player', '4,7');
  await expect(page.locator('.godot-frame')).toHaveCount(1);
  await expect(world).toHaveAttribute('data-player', '4,7');
});

test.describe('Godot on a touch screen', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test('touch movement, real scene and localized continuation', async ({ page }) => {
    await page.goto('/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
    await page.locator('.arcade-launcher button').tap(); await page.locator('[data-chapter="freelance"]').tap();
    const world = page.locator('.godot-world');
    await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
    const canvas = page.frameLocator('.godot-frame').locator('canvas');
    await page.getByRole('button', { name: 'Caminar al norte', exact: true }).tap();
    await expect(world).toHaveAttribute('data-player', '4,6');
    await canvas.scrollIntoViewIfNeeded();

    await clickCompanyObject(page, 'freelance', 'terminal', false, true);
    await waitForGodotInteraction(page, 'terminal', 'Solo es cambiar un botón');
    await page.getByRole('button', { name: 'Cerrar', exact: true }).tap();
    await expect(world).toHaveAttribute('data-player', '3,7');
    await canvas.screenshot({ path: 'test-results/godot-room.png' });
    await page.locator('.career-game-heading').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'test-results/godot-mobile.png' });
    expect(await page.locator('.career-world').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.locator('.career-world a[data-language]').tap();
    await expect(page).toHaveURL('/en/arcade/?career=continue');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
    await expect(world).toHaveAttribute('data-player', '3,7');
    expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  });
});
