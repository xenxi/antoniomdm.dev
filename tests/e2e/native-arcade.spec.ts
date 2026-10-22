import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const channel = 'antonios:godot:v1';
async function command(page: Page, value: Record<string, unknown>) {
  await page.evaluate(({ channel, value }) => window.postMessage({ channel, type: 'command', command: value }, location.origin), { channel, value });
}
async function inspect(page: Page) {
  await page.evaluate(() => { (window as Window & { nativeEvents?: Record<string, unknown>[] }).nativeEvents = []; });
  await command(page, { type: 'inspect' });
  await expect.poll(() => page.evaluate(() => (window as Window & { nativeEvents?: Record<string, unknown>[] }).nativeEvents?.find(event => event.type === 'debugState'))).toBeTruthy();
  return page.evaluate(() => (window as Window & { nativeEvents?: Record<string, unknown>[] }).nativeEvents!.find(event => event.type === 'debugState')!);
}

for (const locale of ['es', 'en']) test(`native Arcade ${locale}: standalone web bootstrap, movement, pause and language`, async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const target = window as Window & { nativeEvents?: Record<string, unknown>[] };
    target.nativeEvents = [];
    window.addEventListener('message', event => { if (event.data?.channel === 'antonios:godot:v1') target.nativeEvents!.push(event.data); });
  });
  await page.goto(`/games/career/index.html?runtime=native&e2eDebug=1&lang=${locale}`);
  await expect.poll(() => page.evaluate(() => (window as Window & { nativeEvents?: Record<string, unknown>[] }).nativeEvents?.some(event => event.type === 'ready')), { timeout: 60_000 }).toBe(true);
  const initial = await inspect(page);
  expect(initial.world).toBe('town');
  expect(initial.language).toBe(locale);
  await page.locator('canvas').focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(async () => (await inspect(page)).position).not.toEqual(initial.position);
  await command(page, { type: 'pause' });
  const paused = await inspect(page);
  await page.keyboard.press('ArrowRight');
  expect((await inspect(page)).position).toEqual(paused.position);
  expect(paused.active).toBe(false);
  await command(page, { type: 'setLanguage', language: locale === 'es' ? 'en' : 'es' });
  expect((await inspect(page)).language).not.toBe(locale);
  await command(page, { type: 'configuration', reducedMotion: true });
  expect((await inspect(page)).reducedMotion).toBe(true);
  await command(page, { type: 'resume' });
  expect((await inspect(page)).active).toBe(true);
  const beforeStep = (await inspect(page)).position;
  await command(page, { type: 'step', direction: [-1, 0] });
  await expect.poll(async () => (await inspect(page)).position).not.toEqual(beforeStep);
  expect(errors).toEqual([]);
});

test('native embedded slice: hub, NPC quest, portfolio and saved continuation', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/arcade/?nativeArcade=1');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.arcade-launcher button').click();
  await expect(page.locator('.native-arcade .godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  await page.getByRole('button', { name: 'Entrar en Freelance', exact: true }).click();
  await expect(page.locator('.native-arcade .godot-world')).toHaveAttribute('data-map', 'freelance');
  await page.getByRole('button', { name: 'Hablar con el compañero de piso' }).click();
  await expect(page.getByRole('dialog')).toContainText('Prepara la web', { timeout: 15_000 });
  await page.getByRole('dialog').getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('dialog')).toContainText('portfolio');
  await page.getByRole('dialog').getByRole('button', { name: 'Continuar' }).click();
  await expect(page).toHaveURL('/experience/#freelance');
  await expect(page.locator('#freelance')).toBeVisible();
  const save = await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v2')!));
  expect(save.completed).toContain('first_visit');
  await page.goto('/en/arcade/?career=continue&nativeArcade=1');
  await expect(page.locator('.native-arcade .godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  await expect(page.locator('.native-arcade .godot-world')).toHaveAttribute('data-map', 'freelance');
  await page.getByRole('button', { name: 'Return to town' }).click();
  await expect(page.locator('.native-arcade .godot-world')).toHaveAttribute('data-map', 'town');
  await page.getByRole('button', { name: 'Return to desktop', exact: true }).click();
  await expect(page.locator('.native-arcade')).toHaveCount(0);
  const exitedSave = await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v2')!));
  expect(exitedSave.world).toBe('town');
  expect(exitedSave.completed).toContain('first_visit');
});

for (const width of [390, 820]) test(`native touch controls and accessible dialogue at ${width}px`, async ({ browser, baseURL }) => {
  test.setTimeout(90_000);
  const context = await browser.newContext({ baseURL, viewport: { width, height: 900 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  try {
    await page.goto('/en/arcade/?nativeArcade=1');
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    await page.locator('.arcade-launcher button').tap();
    const host = page.locator('.native-arcade');
    await expect(host.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
    await page.getByRole('button', { name: 'Enter Freelance', exact: true }).tap();
    await expect(host.locator('.godot-world')).toHaveAttribute('data-map', 'freelance');
    await page.getByRole('button', { name: 'Walk east', exact: true }).tap();
    await page.getByRole('button', { name: 'Talk to the flatmate' }).tap();
    await expect(page.getByRole('dialog')).toContainText('Prepare the website', { timeout: 15_000 });
    expect(await host.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    expect((await new AxeBuilder({ page }).include('.native-arcade').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.getByRole('dialog').getByRole('button', { name: 'Continue' }).tap();
    await expect(page.getByRole('dialog')).toContainText('portfolio');
  } finally {
    await context.close();
  }
});
