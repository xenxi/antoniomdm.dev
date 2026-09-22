import { readFileSync } from 'node:fs';

const pages = [
  {
    locale: 'es',
    file: 'dist/privacy/index.html',
    canonical: 'https://antoniomdm.dev/privacy/',
    alternate: 'https://antoniomdm.dev/en/privacy/',
    label: 'Privacidad',
  },
  {
    locale: 'en',
    file: 'dist/en/privacy/index.html',
    canonical: 'https://antoniomdm.dev/en/privacy/',
    alternate: 'https://antoniomdm.dev/privacy/',
    label: 'Privacy',
  },
];

function requireMatch(html, pattern, message) {
  if (!pattern.test(html)) throw new Error(message);
}

for (const page of pages) {
  const html = readFileSync(page.file, 'utf8');
  requireMatch(html, new RegExp(`<html lang="${page.locale}"`), `${page.file}: incorrect lang`);
  requireMatch(html, new RegExp(`<link rel="canonical" href="${page.canonical}"`), `${page.file}: incorrect canonical`);
  requireMatch(html, new RegExp(`hreflang="${page.locale}" href="${page.canonical}"`), `${page.file}: missing self hreflang`);
  requireMatch(html, new RegExp(`href="${page.alternate}"`), `${page.file}: missing translated alternate`);
  requireMatch(html, /hreflang="x-default" href="https:\/\/antoniomdm\.dev\/privacy\/"/, `${page.file}: incorrect x-default`);
  requireMatch(html, new RegExp(`>${page.label}</a>`), `${page.file}: missing privacy footer link`);
  requireMatch(html, /data-open-analytics-settings/, `${page.file}: missing analytics settings control`);
  requireMatch(html, /data-open-ad-settings/, `${page.file}: missing advertising settings control`);
  if (/BlogPosting/.test(html)) throw new Error(`${page.file}: privacy must not be a BlogPosting`);
}

const linkedPages = [
  ['dist/index.html', 'href="/privacy/"', '>Privacidad</a>'],
  ['dist/en/index.html', 'href="/en/privacy/"', '>Privacy</a>'],
  ['dist/blog/index.html', 'href="/privacy/"', '>Privacidad</a>'],
  ['dist/en/blog/index.html', 'href="/en/privacy/"', '>Privacy</a>'],
];

for (const [file, href, label] of linkedPages) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes(href) || !html.includes(label)) {
    throw new Error(`${file}: missing localized privacy footer link`);
  }
}

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
for (const page of pages) {
  if (!sitemap.includes(`<loc>${page.canonical}</loc>`)) {
    throw new Error(`dist/sitemap.xml: missing ${page.canonical}`);
  }
}

console.log('Verified bilingual privacy HTML.');
