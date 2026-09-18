import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
for (const locale of ['es', 'en']) test(`world sounds ${locale}: valid steps, doors, mute and cleanup`, async ({ page }) => {
  test.setTimeout(90000);
  await page.addInitScript(() => {
    localStorage.setItem('antoniomdm-os:preferences:v2', JSON.stringify({ sound: true, music: false, uiSounds: false }));
    const stats = { starts: 0, closed: 0 };
    Object.assign(window, { worldAudioStats: stats });
    for (const proto of [AudioBufferSourceNode.prototype, OscillatorNode.prototype]) {
      const start = proto.start;
      proto.start = function (...args: Parameters<typeof start>) { stats.starts++; return Reflect.apply(start, this, args); };
    }
    const close = AudioContext.prototype.close;
    AudioContext.prototype.close = function () { stats.closed++; return close.call(this); };
  });
  const l = (es: string, en: string) => locale === 'es' ? es : en;
  const starts = () => page.evaluate(() => (window as unknown as { worldAudioStats: { starts: number } }).worldAudioStats.starts);
  await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  await page.locator('.arcade-launcher button').click();
  expect(await starts()).toBe(0);
  await page.getByRole('button', { name: l('Nueva partida', 'New game'), exact: true }).click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  expect(await starts()).toBe(0);
  await page.getByRole('button', { name: l('Caminar al este', 'Walk east'), exact: true }).click();
  await expect.poll(starts).toBe(2);
  // The building blocks this move, so it must not sound like a footstep.
  await world.focus(); await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowUp');
  await expect(world).toHaveAttribute('data-player', '5,5');
  const beforeWall = await starts();
  await page.keyboard.press('ArrowUp'); expect(await starts()).toBe(beforeWall);
  await page.locator('[data-company="freelance"]').click();
  await expect(world).toHaveAttribute('data-map', 'freelance');
  expect(await starts()).toBe(beforeWall + 3);
  await page.getByRole('button', { name: l('Volver a la ciudad', 'Return to town'), exact: true }).click();
  await expect(world).toHaveAttribute('data-map', 'town');
  expect(await starts()).toBe(beforeWall + 6);
  await page.locator('.job-shortcuts button').filter({ hasText: l('Trabajos', 'Jobs') }).click();
  await page.getByRole('dialog').getByRole('button', { name: /XUL/ }).click();
  expect(await starts()).toBe(beforeWall + 9);
  await page.getByRole('dialog').getByRole('button', { name: l('Cerrar', 'Close'), exact: true }).click();
  await page.locator('.career-game-heading').getByRole('button', { name: l('Pausar', 'Pause'), exact: true }).click();
  const paused = await starts();
  await page.keyboard.press('ArrowRight'); expect(await starts()).toBe(paused);
  await page.locator('.career-paused button').click();
  await page.getByRole('button', { name: l('Pasos y puertas: activados', 'Footsteps and doors: on'), exact: true }).click();
  const muted = await starts();
  await page.getByRole('button', { name: l('Caminar al este', 'Walk east'), exact: true }).click();
  await expect(world).toHaveAttribute('data-player', '5,6');
  expect(await starts()).toBe(muted);
  await page.getByRole('button', { name: l('← Volver al escritorio', '← Return to desktop'), exact: true }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { worldAudioStats: { closed: number } }).worldAudioStats.closed)).toBe(1);
});
