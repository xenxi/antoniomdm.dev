import { expect, test } from '@playwright/test';

test('API reference filters locally, keeps all operations in HTML and has no service links', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/projects/platform934-api/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('.endpoint')).toHaveCount(61);
  await expect(page.locator('.project-api-reference a, .project-links')).toHaveCount(0);
  const search = page.getByRole('searchbox');
  await search.fill('/api/lists');
  await expect(page.locator('.endpoint')).toHaveCount(7);
  await expect(page.locator('.endpoint-group')).toHaveAttribute('open', '');
  await search.fill('zz-no-endpoint');
  await expect(page.getByText('No hay operaciones que coincidan con la búsqueda.')).toBeVisible();
  await search.fill('');
  await expect(page.locator('.endpoint')).toHaveCount(61);
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/platform934-api\/$/);
  await expect(page.getByRole('heading', { name: 'Endpoint reference' })).toBeVisible();
  await expect(page.locator('.endpoint').first()).toContainText('Link the authenticated account');
  expect(requests.filter(url => new URL(url).pathname.startsWith('/api/'))).toEqual([]);
});

test('screenshots and external actions support keyboard navigation and new tabs', async ({ page }) => {
  await page.goto('/en/projects/luna-tartas/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const images = page.locator('.project-gallery img');
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute('alt', /Luna Tartas/);
    expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  const github = page.locator('.project-links a').first();
  const live = page.locator('.project-links a').last();
  await github.focus();
  await page.keyboard.press('ArrowRight');
  await expect(live).toBeFocused();
  await expect(live).toHaveAttribute('rel', 'noopener noreferrer');
  // Observe the actual popup without depending on the third-party service.
  await page.context().route('https://lunatartas.es/', route => route.fulfill({ body: '<title>Luna</title>' }));
  const popupPromise = page.waitForEvent('popup');
  await page.keyboard.press('Enter');
  const popup = await popupPromise;
  await expect(popup).toHaveURL('https://lunatartas.es/');
  await popup.close();
  const screenshotPromise = page.waitForEvent('popup');
  await page.locator('.project-gallery a').first().click();
  const screenshot = await screenshotPromise;
  await expect(screenshot).toHaveURL(/\/images\/projects\/luna-tartas\/home.webp$/);
  await screenshot.close();
  await page.goto('/en/projects/stream-optimizer/');
  await expect(page.locator('.project-gallery, .project-links')).toHaveCount(0);
  await expect(page.locator('.project-logo')).toHaveAttribute('src', '/images/projects/stream-optimizer/logo.webp');
});

test('new content remains usable without JavaScript in both languages on mobile', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const prefix of ['', '/en']) {
    for (const slug of ['platform934', 'platform934-api', 'luna-tartas', 'devagon-alley', 'koso', 'antonios', 'stream-optimizer', 'luna-studio', 'bio-cli']) {
      await page.goto(`${prefix}/projects/${slug}/`);
      await expect(page.locator('html')).toHaveAttribute('lang', prefix ? 'en' : 'es');
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.locator('body').innerText()).not.toMatch(/Qué demuestra|What it demonstrates|Competencies and evidence/);
      const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('article, section, h1, h2, h3, p, a, dl, dd, code, div')).filter(element => element.getBoundingClientRect().right > 390).map(element => `${element.tagName}.${element.className}: ${element.getBoundingClientRect().right}`).slice(-15));
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${slug}: ${overflow.join(', ')}`).toBeLessThanOrEqual(390);
      if (slug === 'platform934-api') {
        await expect(page.locator('.endpoint')).toHaveCount(61);
        await page.locator('.endpoint-group').last().locator('summary').click();
        await expect(page.locator('.endpoint-group').last().locator('dd').last()).toBeVisible();
        expect(await page.locator('.project-api-reference').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      }
      for (const image of await page.locator('.project-gallery img').all()) {
        await image.scrollIntoViewIfNeeded();
        expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      }
    }
  }
  await context.close();
});
