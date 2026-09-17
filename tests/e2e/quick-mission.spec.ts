import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { completeEvent, newGame, updateProgress } from '../../src/arcade/engine';

test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });

for (const locale of ['es', 'en']) test(`quick mission ${locale}: direct entry, isolated saves, replay and language`, async ({ page }) => {
  test.setTimeout(90000);
  const campaign = updateProgress(completeEvent(newGame(), 'freelance'), { mission: 1, energy: 70 });
  await page.addInitScript(save => { if (!localStorage.getItem('antonios:career:v1')) localStorage.setItem('antonios:career:v1', save); }, JSON.stringify(campaign));
  const l = (es: string, en: string) => locale === 'es' ? es : en;
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: l('Arcade · misión rápida', 'Arcade · quick mission'), exact: true }).click();
  await page.getByLabel(l('Elegir escenario', 'Choose a setting'), { exact: true }).selectOption('nokia');
  await expect(page.locator('[data-quick-mission]')).toHaveCount(4);
  expect((await new AxeBuilder({ page }).include('.career-mission-select').withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
  await page.locator('.career-mission-select').screenshot({ path: `test-results/mission-select-${locale}.png` });
  await page.getByRole('button', { name: l('Jugar esta misión', 'Play this mission') }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-map', 'nokia');
  await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await page.getByRole('dialog').getByRole('button', { name: l('Cerrar', 'Close'), exact: true }).click();
  await page.locator('.career-world').getByRole('link', { name: locale === 'es' ? 'English' : 'Español', exact: true }).click();
  await expect(page).toHaveURL(/career=continue&mission=/);
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-map', 'nokia');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v1')!))).toEqual(campaign);
  await page.getByRole('dialog').getByRole('button', { name: l('Close', 'Cerrar'), exact: true }).click();
  await page.getByRole('button', { name: l('Back to mission select', 'Volver al selector'), exact: true }).click();
  await page.getByRole('button', { name: l('Arcade · quick mission', 'Arcade · misión rápida'), exact: true }).click();
  await page.getByLabel(l('Choose a setting', 'Elegir escenario'), { exact: true }).selectOption('freelance');
  await page.getByRole('button', { name: l('Play this mission', 'Jugar esta misión') }).click();
  await page.locator('[data-choice="button"]').click();
  await expect(page.getByRole('dialog')).toContainText(l('Mission cleared!', '¡Misión superada!'));
  await page.getByRole('button', { name: l('Replay mission', 'Repetir misión'), exact: true }).click();
  await expect(page.locator('[data-choice="button"]')).toBeEnabled();
  await page.locator('[data-choice="button"]').click();
  await page.getByRole('button', { name: l('Next mission', 'Siguiente misión'), exact: false }).click();
  await expect(page.locator('[data-choice="responsive-1"]')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: l('Close', 'Cerrar'), exact: true }).click();
  await page.getByRole('button', { name: l('Back to mission select', 'Volver al selector'), exact: true }).click();
  await page.getByRole('button', { name: l('Continue', 'Continuar'), exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v1')!))).toEqual(campaign);
  expect(errors).toEqual([]);
});

test('music defaults on, pauses and honors saved mute', async ({ page }) => {
  test.setTimeout(90000);
  await page.addInitScript(() => {
    const audio: HTMLAudioElement[] = [];
    const NativeAudio = window.Audio;
    window.Audio = new Proxy(NativeAudio, { construct(target, args: [string?]) { const element = new target(args[0]); audio.push(element); return element; } });
    Object.assign(window, { arcadeAudio: audio });
  });
  const playing = () => page.evaluate(() => (window as unknown as { arcadeAudio: HTMLAudioElement[] }).arcadeAudio.some(a => !a.paused));
  await page.goto('/en/arcade/'); await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: 'New game', exact: true }).click();
  await expect.poll(playing).toBe(true);
  await page.getByRole('button', { name: 'Pause music', exact: true }).click();
  await expect.poll(playing).toBe(false);
  await page.getByRole('button', { name: 'Play music', exact: true }).click();
  await expect.poll(playing).toBe(true);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect.poll(playing).toBe(false);
  await page.locator('.career-paused button').click(); await expect.poll(playing).toBe(true);
  await page.getByRole('button', { name: '← Return to desktop', exact: true }).click();
  await expect.poll(playing).toBe(false);
  await page.evaluate(() => localStorage.setItem('antoniomdm-os:preferences:v1', JSON.stringify({ sound: true, music: false })));
  await page.goto('/en/arcade/'); await page.locator('.arcade-launcher button').click();
  await expect(page.getByText('Music disabled in Settings', { exact: true })).toBeVisible();
  expect(await playing()).toBe(false);
});

test('mobile mission selector has no overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/arcade/'); await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: 'Arcade · misión rápida', exact: true }).click();
  await page.getByLabel('Elegir escenario', { exact: true }).selectOption('system-recovery');
  await expect(page.locator('[data-quick-mission]')).toHaveCount(7);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.locator('.career-mission-select').screenshot({ path: 'test-results/mission-select-mobile.png' });
});
