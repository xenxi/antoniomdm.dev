import { getContent } from '../data/content';
import { routes } from '../data/routes';
import { locales, localizedPath } from '../i18n/core';
export async function GET() {
  const content = await getContent();
  const urls = locales.flatMap(locale => routes(content).map(path => `<url><loc>https://antoniomdm.dev${localizedPath(path, locale)}</loc></url>`)).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
