import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

test.use({ reducedMotion: 'reduce' });
const sections = ['/profile/', '/experience/', '/profile/competencies/', '/profile/achievements/', '/profile/education/', '/profile/languages/', '/cv/'];
const ids = ['overview', 'experience', 'competencies', 'achievements', 'education', 'languages', 'cv'];
const shots = 'test-results/a3';

for (const [width, height] of [[320, 740], [390, 844], [768, 1024], [820, 1180], [1100, 800], [1280, 800], [1440, 1000], [1920, 1080]]) {
  test(`A3 initial professional access and shell at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const requests: string[] = []; page.on('request', request => requests.push(request.url()));
    await page.goto('/es/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
    await expect(page.locator('.os')).toHaveAttribute('data-shell', width < 720 ? 'mobile' : width < 1100 ? 'tablet' : 'desktop');
    await expect(page.locator('[data-window]')).toHaveCount(width >= 1280 ? 3 : 1);
    await expect(page.locator('[data-profile-section="overview"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Antonio Manuel Díaz Moreno', exact: true })).toBeVisible();
    await expect(page.locator('.role')).toHaveText('Software Architect | Senior .NET Engineer');
    await expect(page.locator('.focus-line')).toContainText('.NET · Distributed Systems · Legacy Modernization · Applied AI');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    expect(requests.filter(url => /\/Arcade\.|\/arcade\/|\.(mp3|wav|ogg)$/.test(url))).toEqual([]);
    const win = (await page.locator('[data-window="about"]').boundingBox())!;
    if (width >= 1100) {
      expect(win.x).toBeGreaterThanOrEqual(120);
      const viewport = (await page.locator('[data-window="about"] .window-content').boundingBox())!;
      for (const action of await page.locator('.professional-actions a').all()) {
        const rect = (await action.boundingBox())!;
        expect(rect.y).toBeGreaterThanOrEqual(viewport.y);
        expect(rect.y + rect.height).toBeLessThanOrEqual(viewport.y + viewport.height);
        expect(rect.x + rect.width).toBeLessThanOrEqual(viewport.x + viewport.width);
      }
      for (const shortcut of await page.locator('[data-desktop-app]').all()) {
        const rect = (await shortcut.boundingBox())!; expect(rect.x + rect.width).toBeLessThan(win.x);
      }
    } else {
      expect(win.width).toBe(width < 720 ? width : width - 24);
      await expect(page.locator('.resize-handle').first()).toBeHidden();
    }
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await mkdir(shots, { recursive: true }); await page.screenshot({ path: `${shots}/es-${width}x${height}.png` });
  });
}

test('A3 sections share a window, update metadata, restore history and preserve language state', async ({ page }) => {
  await page.goto('/en/profile/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  for (let i = 1; i < sections.length; i++) {
    await page.locator(`.profile-tabs a[href="/en${sections[i]}"]`).click();
    await expect(page).toHaveURL(`/en${sections[i]}`);
    await expect(page.locator('[data-window="about"]')).toHaveCount(1);
    await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', ids[i]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://antoniomdm.dev/en${sections[i]}`);
  }
  await page.goBack(); await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'languages');
  await page.goForward(); await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'cv');
  await expect(page.locator('.pdf-state')).toHaveCount(2);
  await expect(page.locator('.pdf-state a[download]')).toHaveCount(2);
  await expect(page.locator('.pdf-state .availability')).toHaveText(['Available', 'Available']);
  await page.screenshot({ path: `${shots}/cv-en.png` });
  await page.goto('/es/profile/competencies/?source=a3#content');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL('/en/profile/competencies/?source=a3#content');
  await page.reload(); await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'competencies');
});

test('A3 launcher opens every app and keyboard restores minimized state', async ({ page }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  for (const [path, id] of [['/profile/', 'about'], ['/architecture/', 'architecture'], ['/projects/', 'projects'], ['/ai-lab/', 'lab'], ['/notes/', 'notes'], ['/terminal/', 'terminal'], ['/arcade/', 'arcade'], ['/contact/', 'contact'], ['/settings/', 'settings']]) {
    await page.keyboard.press('Alt+l');
    await expect(page.getByRole('textbox', { name: 'Find an application' })).toBeFocused();
    await page.locator(`.launcher nav a[href="/en${path}"]`).focus(); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(`/en${path}`);
    await expect(page.locator(`[data-window="${id}"]`)).toHaveClass(/active/);
  }
  await page.keyboard.press('Alt+l'); await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open launcher', exact: true })).toBeFocused();
  await page.getByRole('link', { name: 'Open Profile', exact: true }).click();
  await page.getByRole('button', { name: 'Minimize Profile', exact: true }).click();
  await expect(page.locator('[data-window="about"]')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Restore Profile', exact: true })).toHaveClass(/is-minimized/);
  await page.getByRole('button', { name: 'Restore Profile', exact: true }).focus(); await page.keyboard.press('Enter');
  await expect(page.locator('[data-window="about"]')).toBeFocused();
  await expect(page.getByRole('button', { name: 'Restore Profile', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('A3 approved contact and CV states are honest', async ({ page }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.screenshot({ path: `${shots}/desktop-en.png` });
  await expect(page.locator('.public-shortcuts a[href*="linkedin"]')).toHaveCount(1);
  await expect(page.locator('.public-shortcuts a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.locator('.public-shortcuts')).not.toContainText('Working on it');
  await page.keyboard.press('Alt+l');
  await expect(page.locator('.launcher-extras a[download]')).toHaveCount(1);
  await expect(page.locator('.launcher-extras')).not.toContainText('Working on it');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `${shots}/launcher-en.png` });
  await page.keyboard.press('Escape'); await page.goto('/es/cv/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.screenshot({ path: `${shots}/cv-es.png` });
  await page.goto('/es/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.keyboard.press('Alt+l'); await expect(page.locator('.launcher')).toBeVisible();
  await page.screenshot({ path: `${shots}/launcher-es.png` });
});

test('A3 a deferred article failure keeps a real reading link and can be retried', async ({ page }) => {
  await page.goto('/en/notes/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.route('**/en/notes/os-foundation/', route => route.abort());
  await page.locator('.note-card').click();
  await expect(page.getByRole('status')).toContainText('This article could not load.');
  await expect(page.locator('.prose').getByRole('link', { name: 'Reading view ↗' })).toHaveAttribute('href', '/en/notes/os-foundation/?view=reading');
  await page.unroute('**/en/notes/os-foundation/');
  await page.locator('.back-link').click(); await page.locator('.note-card').click();
  await expect(page.locator('[data-note-body] h2').first()).toBeVisible();
});

for (const width of [390, 820]) test(`A3 inactive apps leave keyboard navigation at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 }); await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.professional-actions a[href="/en/projects/"]').click();
  await expect(page.locator('[data-window="about"]')).toHaveAttribute('inert', '');
  await expect(page.locator('[data-window="about"]')).toBeHidden();
  await page.getByRole('button', { name: 'Restore Profile', exact: true }).click();
  await expect(page.locator('[data-window="projects"]')).toBeHidden();
  await expect(page.locator('[data-window="about"]')).not.toHaveAttribute('inert', '');
});

test('A3 all professional sections and real links work without JavaScript', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage();
  const links = new Set<string>();
  for (const locale of ['es', 'en']) for (let i = 0; i < sections.length; i++) {
    await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${locale === 'en' ? '/en' : ''}${sections[i]}`);
    await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', ids[i]);
    await expect(page.locator('.profile-section h1').first()).toBeVisible();
    for (const href of await page.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')!))) {
      expect(href).not.toBe('#'); expect(href).not.toBe('');
      if (href.startsWith('/')) links.add(href);
    }
  }
  for (const href of links) expect((await request.get(href)).status(), href).toBe(200);
  const home = await (await request.get('/en/')).text();
  expect(home).not.toContain('data-note-body');
  expect(home).not.toContain('pending_editorial');
  await context.close();
});

for (const scale of [2, 4]) test(`A3 ${scale * 100}% zoom equivalent reflow`, async ({ page }) => {
  // Desktop browser zoom reduces the CSS viewport; 1280x800 at 200%/400%.
  await page.setViewportSize({ width: 1280 / scale, height: 800 / scale });
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1280 / scale);
  await page.locator('.professional-actions a[href="/en/cv/"]').click();
  await expect(page.locator('.pdf-state')).toHaveCount(2);
  await page.getByRole('button', { name: 'Open launcher', exact: true }).click();
  await page.locator('.launcher nav a[href="/en/contact/"]').click();
  await expect(page.locator('[data-window="contact"]')).toBeVisible();
  await page.screenshot({ path: `${shots}/zoom-${scale * 100}.png` });
});
