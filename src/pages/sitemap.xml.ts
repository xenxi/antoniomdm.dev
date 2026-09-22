import { getContent } from '../data/content';
import { routes } from '../data/routes';
import { locales, localizedPath } from '../i18n/core';
import { getOutOfScopeArticles, localizedArticlePath } from '../data/out-of-scope';
export async function GET() {
  const content = await getContent();
  const portfolioUrls = locales.flatMap(locale => routes(content).map(path => `https://antoniomdm.dev${localizedPath(path, locale)}`));
  const editorialUrls = (await Promise.all(locales.map(async locale => [
    `https://antoniomdm.dev${locale === 'en' ? '/en' : ''}/blog/`,
    ...(await getOutOfScopeArticles(locale)).map(localizedArticlePath).map(path => `https://antoniomdm.dev${path}`),
  ]))).flat();
  const privacyUrls = locales.map(locale => `https://antoniomdm.dev${locale === 'en' ? '/en' : ''}/privacy/`);
  const urls = [...new Set([...portfolioUrls, ...editorialUrls, ...privacyUrls])].map(url => `<url><loc>${url}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
