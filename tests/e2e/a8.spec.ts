import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ reducedMotion: 'reduce' });

const PDF_ES = '/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf';
const PDF_EN = '/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf';
const EMAIL = 'antoniom.diaz.moreno@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/antoniomanueldiazmoreno';
const GITHUB = 'https://github.com/xenxi';
const WEBSITE = 'https://antoniomdm.dev';

for (const [locale, summary] of [['es', 'Linares (Jaén), España · Remoto'], ['en', 'Linares (Jaén), Spain · Remote']] as const) {
  test(`A8 Contact ${locale.toUpperCase()} publishes exactly the approved channels and no phone`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(`/${locale === 'en' ? 'en/' : ''}contact/`);
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    const contact = page.locator('[data-window="contact"]');
    await expect(contact).toHaveClass(/active/);
    await expect(contact.getByRole('heading', { name: 'Antonio Manuel Díaz Moreno' })).toBeVisible();
    await expect(contact.locator('.contact-summary')).toHaveText(summary);
    await expect(contact.locator(`a[href="mailto:${EMAIL}"]`)).toHaveCount(1);
    await expect(contact.locator('.contact-actions')).toContainText(EMAIL);
    await expect(contact.locator(`a[href="${LINKEDIN}"]`)).toHaveCount(1);
    await expect(contact.locator(`a[href="${GITHUB}"]`)).toHaveCount(1);
    await expect(contact.locator(`a[href="${WEBSITE}"]`)).toHaveCount(1);
    await expect(contact.locator('[href^="tel:"]')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('+34');
    await contact.locator('.contact-copy').click();
    await expect(contact.locator('.contact-copy-status')).not.toBeEmpty();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(EMAIL);
  });
}

test('A8 Profile keeps approved contact links active without phone', async ({ page }) => {
  await page.goto('/en/profile/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const profile = page.locator('[data-window="about"]');
  await expect(profile.locator('.public-shortcuts a[href^="mailto:"]')).toHaveCount(1);
  await expect(profile.locator(`.public-shortcuts a[href="${LINKEDIN}"]`)).toHaveCount(1);
  await expect(profile.locator(`.public-shortcuts a[href="${GITHUB}"]`)).toHaveCount(1);
  await expect(profile.locator(`.public-shortcuts a[href="${WEBSITE}"]`)).toHaveCount(1);
  await expect(profile.locator('.contact-summary')).toContainText('Linares (Jaén), Spain · Remote');
  await expect(profile.locator('[href^="tel:"]')).toHaveCount(0);
});

test('A8 Terminal routes every canonical command and alias through the window manager', async ({ page }) => {
  const cases = [
    ['profile', '/en/profile/', 'about'], ['experience', '/en/experience/', 'about'], ['architecture', '/en/architecture/', 'architecture'],
    ['projects', '/en/projects/', 'projects'], ['ai', '/en/ai-lab/', 'lab'], ['contact', '/en/contact/', 'contact'], ['cv', '/en/cv/', 'about'],
    ['about', '/en/profile/', 'about'], ['career', '/en/experience/', 'about'], ['work', '/en/experience/', 'about'], ['resume', '/en/cv/', 'about'],
  ] as const;
  for (const [token, path, id] of cases) {
    await page.goto('/en/terminal/');
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    const command = page.getByRole('textbox', { name: 'Terminal command' });
    await command.fill(token);
    await command.press('Enter');
    await expect(page).toHaveURL(path);
    await expect(page.locator(`[data-window="${id}"]`)).toHaveClass(/active/);
  }
});

test('A8 Terminal help, identity, external links, history, escape and clear stay inert and accessible', async ({ page }) => {
  await page.goto('/en/terminal/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const command = page.getByRole('textbox', { name: 'Terminal command' });
  const log = page.getByRole('log');

  await command.fill('help'); await command.press('Enter');
  await expect(log).toContainText('Available commands');
  await expect(log).toContainText('whoami');
  await expect(log).toContainText('Aliases');

  await command.fill('whoami'); await command.press('Enter');
  await expect(log).toContainText('Antonio Manuel Díaz Moreno');
  await expect(log).toContainText('Software Architect | Senior .NET Engineer');

  await command.fill('github'); await command.press('Enter');
  await expect(log.locator(`a[href="${GITHUB}"]`)).toHaveCount(1);
  await command.fill('linkedin'); await command.press('Enter');
  await expect(log.locator(`a[href="${LINKEDIN}"]`)).toHaveCount(1);

  await command.fill('help'); await command.press('Enter');
  await command.press('ArrowUp');
  await expect(command).toHaveValue('help');
  await command.fill('whoami'); await command.press('Enter');
  await command.press('ArrowUp');
  await expect(command).toHaveValue('whoami');
  await command.press('ArrowUp');
  await expect(command).toHaveValue('help');
  await command.press('ArrowDown');
  await expect(command).toHaveValue('whoami');
  await command.press('ArrowDown');
  await expect(command).toHaveValue('');

  await command.fill('draft input');
  await command.press('Escape');
  await expect(command).toHaveValue('');
  await expect(page.locator('[data-window="terminal"]')).toBeVisible();

  await command.fill('help'); await command.press('Enter');
  await expect(log.locator('p')).not.toHaveCount(0);
  await command.fill('clear'); await command.press('Enter');
  await expect(log.locator('p')).toHaveCount(0);
  await expect(command).toBeFocused();

  await command.fill('frobnicate'); await command.press('Enter');
  await expect(log).toContainText('Command not found. Type help.');
});

test('A8 Terminal history resets on reload and never persists', async ({ page }) => {
  await page.goto('/en/terminal/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const command = page.getByRole('textbox', { name: 'Terminal command' });
  await command.fill('whoami'); await command.press('Enter');
  await command.press('ArrowUp'); await expect(command).toHaveValue('whoami');
  await page.reload(); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const reloaded = page.getByRole('textbox', { name: 'Terminal command' });
  await reloaded.press('ArrowUp');
  await expect(reloaded).toHaveValue('');
  const storage = await page.evaluate(() => ({
    localKeys: Object.keys(localStorage),
    localValues: Object.values(localStorage),
    sessionKeys: Object.keys(sessionStorage),
  }));
  expect(JSON.stringify(storage)).not.toContain('whoami');
  expect(storage.sessionKeys).toEqual([]);
});

test('A8 Terminal hostile input cannot execute or navigate', async ({ page }) => {
  await page.goto('/en/terminal/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const before = page.url();
  const command = page.getByRole('textbox', { name: 'Terminal command' });
  for (const input of ['open https://example.com', '../../etc/passwd', 'javascript:alert(1)', 'eval(1)', 'github attacker', 'github xenxi']) {
    await command.fill(input); await command.press('Enter');
  }
  await expect(page.getByRole('log')).toContainText('Command not found. Type help.');
  expect(page.url()).toBe(before);
  await expect(page.locator('[data-window="about"]')).toHaveCount(0);
});

test('A8 CV surfaces active ES/EN PDF, printable and TXT actions', async ({ page, request }) => {
  await page.goto('/en/cv/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const cv = page.locator('[data-window="about"]');
  await expect(cv.locator(`.pdf-state a[download][href="${PDF_EN}"]`)).toHaveCount(1);
  await expect(cv.locator(`.pdf-state a[download][href="${PDF_ES}"]`)).toHaveCount(1);
  await expect(cv.locator('.extended-cv a[href="/es/cv.txt"]')).toHaveCount(1);
  await expect(cv.locator('.extended-cv a[href="/en/cv.txt"]')).toHaveCount(1);
  await expect(cv.getByRole('button', { name: /Print \/ Save PDF/ })).toBeVisible();
  for (const path of [PDF_ES, PDF_EN, '/es/cv.txt', '/en/cv.txt']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  expect((await request.get(PDF_EN)).headers()['content-type']).toContain('pdf');
});

test('A8 professional access works without JavaScript for Contact and CV', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/en/contact/');
  await expect(page.locator(`a[href="mailto:${EMAIL}"]`)).toBeVisible();
  await expect(page.locator(`a[href="${LINKEDIN}"]`)).toHaveCount(1);
  await expect(page.locator(`a[href="${GITHUB}"]`)).toHaveCount(1);
  await expect(page.locator(`a[href="${WEBSITE}"]`)).toHaveCount(1);
  await expect(page.locator('.contact-summary')).toContainText('Linares (Jaén), Spain · Remote');
  await page.goto('/en/cv/');
  await expect(page.locator(`a[download][href="${PDF_EN}"]`)).toBeVisible();
  await expect(page.locator('a[download][href="/en/cv.txt"]')).toBeVisible();
  await context.close();
});

for (const [width, height] of [[1440, 900], [768, 1024], [390, 844]] as const) {
  test(`A8 Contact and CV avoid horizontal overflow at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    for (const path of ['/es/contact/', '/es/cv/', '/en/terminal/']) {
      await page.goto(path);
      await expect(page.locator('[data-ready="true"]')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(width);
    }
  });
}

test('A8 Contact, Terminal and CV have no serious or critical accessibility violations', async ({ page }) => {
  for (const path of ['/es/contact/', '/en/contact/', '/en/terminal/', '/en/cv/']) {
    await page.goto(path);
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.filter(violation => ['serious', 'critical'].includes(violation.impact ?? '')), path).toEqual([]);
  }
});

test('A8 production preview has no console errors, failed requests or broken PDF URLs', async ({ page }) => {
  const consoleErrors: string[] = [];
  const failed: string[] = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('requestfailed', request => { if (!request.failure()?.errorText.includes('ERR_ABORTED')) failed.push(request.url()); });
  page.on('response', response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  for (const path of ['/es/contact/', '/en/contact/', '/en/terminal/', '/en/cv/', '/en/profile/']) {
    await page.goto(path);
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
  }
  await page.goto('/en/terminal/');
  const command = page.getByRole('textbox', { name: 'Terminal command' });
  for (const token of ['help', 'whoami', 'github', 'linkedin', 'profile', 'frobnicate', 'clear']) {
    await command.fill(token); await command.press('Enter');
  }
  expect(consoleErrors).toEqual([]);
  expect(failed).toEqual([]);
});

test('A8 privacy scan keeps telephone and private data out of public web output', async ({ page }) => {
  for (const path of ['/es/contact/', '/es/profile/', '/en/terminal/', '/es/cv/']) {
    await page.goto(path);
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    const html = await page.content();
    expect(html).not.toContain('+34');
    expect(html.toLowerCase()).not.toContain('teléfono');
    expect(html).not.toMatch(/href="tel:/i);
    await expect(page.locator('[href^="tel:"]')).toHaveCount(0);
  }
});
