import { expect, test } from '@playwright/test';
import { enableGodotE2EDebug, clickCanvasPoint } from './career-fixture';

test.use({ launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
for (const locale of ['es', 'en']) for (const native of [false, true]) test(`city ground ${locale} ${native ? 'native' : 'web'}: stairs, fountain and blocked beds`, async ({ page }) => {
  test.setTimeout(90_000);
  await enableGodotE2EDebug(page);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  if (native) await page.addInitScript(() => {
    const target = window as Window & { cityEvents?: Record<string, unknown>[] };
    target.cityEvents = [];
    window.addEventListener('message', event => { if (event.data?.channel === 'antonios:godot:v1') target.cityEvents!.push(event.data); });
  });
  if (native) {
    await page.goto(`/games/career/index.html?runtime=native&e2eDebug=1&lang=${locale}`);
    await expect.poll(() => page.evaluate(() => (window as Window & { cityEvents?: Record<string, unknown>[] }).cityEvents?.some(e => e.type === 'ready')), { timeout: 60_000 }).toBe(true);
    await page.evaluate(() => window.postMessage({ channel: 'antonios:godot:v1', type: 'command', command: { type: 'configuration', reducedMotion: true } }, location.origin));
  } else {
    await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
    await page.locator('.arcade-launcher button').click();
    await page.getByRole('button', { name: locale === 'es' ? 'Nueva partida' : 'New game', exact: true }).click();
    await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  }
  const canvas = native ? page.locator('canvas') : page.frameLocator('.godot-frame').locator('canvas');
  const position = async () => {
    if (!native) return (await page.locator('.godot-world').getAttribute('data-player'))!.split(',').map(Number);
    await page.evaluate(() => {
      (window as Window & { cityEvents?: Record<string, unknown>[] }).cityEvents = [];
      window.postMessage({ channel: 'antonios:godot:v1', type: 'command', command: { type: 'inspect' } }, location.origin);
    });
    await expect.poll(() => page.evaluate(() => (window as Window & { cityEvents?: Record<string, unknown>[] }).cityEvents?.find(e => e.type === 'debugState'))).toBeTruthy();
    return page.evaluate(() => (window as Window & { cityEvents?: Record<string, unknown>[] }).cityEvents!.find(e => e.type === 'debugState')!.position);
  };
  const click = async (x: number, y: number) => {
    if (!native) return clickCanvasPoint(page, { x, y }, 'ground');
    const box = (await canvas.boundingBox())!;
    const scale = Math.min(box.width / 480, box.height / 320);
    await canvas.click({ position: { x: (box.width - 480 * scale) / 2 + x * scale, y: (box.height - 320 * scale) / 2 + y * scale } });
  };
  for (const target of [{ name: 'stairs', x: 256, y: 160, tile: [33, 31] }, { name: 'fountain', x: 216, y: 268, tile: [44, 47] }]) {
    await click(target.x, target.y);
    await expect.poll(position, { timeout: 30_000 }).toEqual(target.tile);
    await page.waitForTimeout(300);
    await canvas.screenshot({ path: `docs/previews/city-${target.name}-${native ? 'native' : 'web'}-${locale}.png` });
  }
  // The pool and its planted border cannot become a walkable destination.
  await click(216, 244);
  await page.waitForTimeout(300);
  expect(await position()).toEqual([44, 47]);
  expect(errors).toEqual([]);
});
