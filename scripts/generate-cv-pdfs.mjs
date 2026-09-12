// Dev-time generator for the definitive ES/EN CV PDFs.
// Uses only Node built-ins plus the TypeScript sources already in the repository.
// Run: node scripts/generate-cv-pdfs.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicProfessionalModel as model } from '../src/data/professional/model.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const cvSupportingLine = 'Distributed Systems · Engineering Excellence · Applied AI';

const localize = (value, locale) => value[locale];

function period(start, end, locale) {
  const format = value => new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T00:00:00Z`));
  const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1);
  return `${capitalize(format(start))} — ${end ? capitalize(format(end)) : locale === 'es' ? 'Actualidad' : 'Present'}`;
}

function getProfile(locale) {
  const value = model.profile;
  return { ...value, headline: localize(value.headline, locale), summary: localize(value.summary, locale), education: value.education.map(item => localize(item, locale)), languages: value.languages.map(item => localize(item, locale)) };
}

function getExperience(locale) {
  return model.experiences.map(item => ({ ...item, company: localize(item.company, locale), role: localize(item.role, locale), period: period(item.start, item.end, locale), summary: localize(item.summary, locale) }));
}

function getCompetencies(locale) {
  return model.competencies.map(item => ({ ...item, name: localize(item.name, locale) }));
}

function getAchievements(locale) {
  return model.achievements.map(item => ({ ...item, title: localize(item.title, locale), summary: localize(item.summary, locale) }));
}

function availableUrl(id) {
  const link = model.externalLinks.find(item => item.id === id);
  if (!link || link.availability !== 'available' || !link.url) throw new Error(`Contact link "${id}" is not available`);
  return link.url;
}

const contactInfo = {
  displayName: model.profile.name,
  location: model.profile.location,
  availability: model.profile.availability,
  email: availableUrl('email').replace(/^mailto:/, ''),
  linkedin: availableUrl('linkedin'),
  github: availableUrl('github'),
  website: availableUrl('website'),
};

const contactMailto = `mailto:${contactInfo.email}`;
const contactSummary = locale => `${contactInfo.location[locale]} · ${contactInfo.availability[locale]}`;

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const LEFT = 50;
const RIGHT = PAGE_WIDTH - LEFT;
const TOP = 48;
const BOTTOM = 48;
const USABLE = RIGHT - LEFT;

const HELV = (() => {
  const width = { ' ': 278, '!': 278, '"': 355, '#': 556, '$': 556, '%': 889, '&': 667, "'": 191, '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278, ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556, '@': 1015, '[': 278, '\\': 278, ']': 278, '^': 469, '_': 556, '`': 333, '{': 334, '|': 260, '}': 334, '~': 584 };
  for (const digit of '0123456789') width[digit] = 556;
  const letters = { A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611, a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500 };
  return { ...width, ...letters };
})();

const HELVB = (() => {
  const width = { ' ': 278, '!': 333, '"': 474, '#': 556, '$': 556, '%': 889, '&': 722, "'": 238, '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278, ':': 333, ';': 333, '<': 584, '=': 584, '>': 584, '?': 611, '@': 975, '[': 333, '\\': 278, ']': 333, '^': 584, '_': 556, '`': 333, '{': 389, '|': 280, '}': 389, '~': 584 };
  for (const digit of '0123456789') width[digit] = 556;
  const letters = { A: 722, B: 722, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 556, K: 722, L: 611, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611, a: 556, b: 611, c: 556, d: 611, e: 556, f: 333, g: 611, h: 611, i: 278, j: 278, k: 556, l: 278, m: 889, n: 611, o: 611, p: 611, q: 611, r: 389, s: 556, t: 333, u: 611, v: 556, w: 778, x: 556, y: 556, z: 500 };
  return { ...width, ...letters };
})();

const ACCENTS = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U', Ñ: 'N', '·': ' ', '—': '-', '–': '-', '’': "'", '“': '"', '”': '"', '…': '.', '≈': '~', '→': '>', '←': '<', '•': '-' };
// Only glyphs outside WinAnsiEncoding are transliterated; accents and «·» are preserved.
const PDF_FALLBACK = { '→': '->', '←': '<-', '≈': '~', '—': '-', '–': '-', '’': "'", '‘': "'", '“': '"', '”': '"', '…': '...', '•': '-' };

function charWidth(char, font) {
  const normalized = ACCENTS[char] ?? char;
  const table = font === 'F2' ? HELVB : HELV;
  return table[normalized] ?? 556;
}

function textWidth(text, font, size) {
  let total = 0;
  for (const char of text) total += charWidth(char, font);
  return (total * size) / 1000;
}

function pdfText(text) {
  return [...String(text)]
    .map(char => PDF_FALLBACK[char] ?? (char.codePointAt(0) > 255 ? '?' : char))
    .join('')
    .replace(/[\\()]/g, match => `\\${match}`);
}

function withoutProtocol(url) {
  return url.replace(/^https?:\/\/(?:www\.)?/, '');
}

function wrapText(text, font, size, maxWidth) {
  const lines = [];
  for (const paragraph of String(text).split('\n')) {
    let current = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = current ? `${current} ${word}` : word;
      if (textWidth(candidate, font, size) <= maxWidth) current = candidate;
      else { if (current) lines.push(current); current = word; }
    }
    lines.push(current);
  }
  return lines;
}

function buildLines(locale) {
  const profile = getProfile(locale);
  const experiences = getExperience(locale);
  const competencies = getCompetencies(locale);
  const achievements = getAchievements(locale);
  const labels = locale === 'es'
    ? { profile: 'PERFIL PROFESIONAL', experience: 'EXPERIENCIA', skills: 'COMPETENCIAS', achievements: 'LOGROS CONFIRMADOS', education: 'FORMACIÓN', languages: 'IDIOMAS' }
    : { profile: 'PROFESSIONAL PROFILE', experience: 'EXPERIENCE', skills: 'COMPETENCIES', achievements: 'CONFIRMED ACHIEVEMENTS', education: 'EDUCATION', languages: 'LANGUAGES' };
  const lines = [];
  const line = (runs, options = {}) => lines.push({ runs, leading: options.leading ?? 11, spaceBefore: options.spaceBefore ?? 0, rule: options.rule ?? false, wrap: options.wrap ?? USABLE });
  const paragraph = (text, options = {}) => {
    const font = options.font ?? 'F1';
    const size = options.size ?? 8.8;
    const leading = options.leading ?? size * 1.28;
    for (const value of wrapText(text, font, size, options.width ?? USABLE)) line([{ text: value, font, size, link: options.link }], { leading });
  };
  const heading = (text) => {
    lines.push({ spacer: 7 });
    line([{ text, font: 'F2', size: 10.5 }], { leading: 15, rule: true });
  };

  line([{ text: profile.name, font: 'F2', size: 19 }], { leading: 22 });
  line([{ text: profile.headline, font: 'F2', size: 11 }], { leading: 14, spaceBefore: 1 });
  line([{ text: cvSupportingLine, font: 'F3', size: 9.4 }], { leading: 12 });
  lines.push({ spacer: 5 });
  for (const contact of [
    { text: contactSummary(locale) },
    { text: contactInfo.email, link: contactMailto },
    { text: withoutProtocol(contactInfo.linkedin), link: contactInfo.linkedin },
    { text: withoutProtocol(contactInfo.github), link: contactInfo.github },
    { text: withoutProtocol(contactInfo.website), link: contactInfo.website },
  ]) line([{ text: contact.text, font: 'F1', size: 8.7, link: contact.link }], { leading: 11 });

  heading(labels.profile);
  paragraph(profile.summary, { size: 8.8 });

  heading(labels.experience);
  for (const job of experiences) {
    line([{ text: job.role, font: 'F2', size: 9.2 }], { leading: 11.4, spaceBefore: 3 });
    line([{ text: job.company, font: 'F1', size: 8.5 }, { text: '  ·  ', font: 'F1', size: 8.5 }, { text: job.period, font: 'F3', size: 8.5 }], { leading: 10.6 });
    paragraph(job.summary, { size: 8.5, leading: 10.5 });
  }

  heading(labels.skills);
  paragraph(competencies.map(item => item.name).join(' · '), { size: 8.7 });

  heading(labels.achievements);
  for (const item of achievements) paragraph(`${item.title}: ${item.summary}`, { size: 8.5, leading: 10.5 });

  heading(labels.education);
  for (const item of profile.education) paragraph(item, { size: 8.7 });

  heading(labels.languages);
  for (const item of profile.languages) paragraph(item, { size: 8.7 });

  return lines;
}

function layout(lines) {
  const pages = [];
  let page = { lines: [], links: [] };
  let y = PAGE_HEIGHT - TOP;
  const flush = () => { pages.push(page); page = { lines: [], links: [] }; y = PAGE_HEIGHT - TOP; };
  for (const entry of lines) {
    if (entry.spacer) {
      if (y - entry.spacer < BOTTOM) flush(); else y -= entry.spacer;
      continue;
    }
    if (entry.spaceBefore) {
      if (y - entry.spaceBefore < BOTTOM) flush(); else y -= entry.spaceBefore;
    }
    const height = entry.leading;
    if (y - height < BOTTOM) flush();
    let cursor = LEFT;
    for (const run of entry.runs) {
      const width = textWidth(run.text, run.font, run.size);
      if (run.link) page.links.push({ x: cursor, y: y - 2, width, height: run.size + 2, url: run.link });
      cursor += width;
    }
    page.lines.push({ ...entry, y });
    y -= height;
  }
  flush();
  return pages;
}

function pageStream(page) {
  return page.lines.map(entry => {
    let x = LEFT;
    let operations = '';
    for (const run of entry.runs) {
      operations += `BT /${run.font} ${run.size} Tf ${x.toFixed(2)} ${entry.y.toFixed(2)} Td (${pdfText(run.text)}) Tj ET\n`;
      x += textWidth(run.text, run.font, run.size);
    }
    if (entry.rule) operations += `0.6 w 0.4 0.4 0.4 RG ${LEFT} ${(entry.y - entry.leading + 3).toFixed(2)} m ${RIGHT} ${(entry.y - entry.leading + 3).toFixed(2)} l S\n`;
    return operations;
  }).join('');
}

function buildPdf(pages, info) {
  const objects = [];
  const set = (number, body) => { objects[number - 1] = body; };
  const fontObject = base => `<< /Type /Font /Subtype /Type1 /BaseFont /${base} /Encoding /WinAnsiEncoding >>`;
  set(3, fontObject('Helvetica'));
  set(4, fontObject('Helvetica-Bold'));
  set(5, fontObject('Helvetica-Oblique'));

  const pageObjectNumbers = pages.map((_, index) => 6 + index * 2);
  const contentObjectNumbers = pages.map((_, index) => 7 + index * 2);
  let next = 6 + pages.length * 2;
  const annotations = [];
  pages.forEach((page, index) => page.links.forEach(link => annotations.push({ ...link, pageIndex: index, number: next++ })));
  const infoNumber = next;

  set(1, '<< /Type /Catalog /Pages 2 0 R >>');
  set(2, `<< /Type /Pages /Kids [${pageObjectNumbers.map(number => `${number} 0 R`).join(' ')}] /Count ${pages.length} >>`);
  pages.forEach((page, index) => {
    const refs = annotations.filter(annotation => annotation.pageIndex === index).map(annotation => `${annotation.number} 0 R`);
    const annots = refs.length ? ` /Annots [${refs.join(' ')}]` : '';
    set(pageObjectNumbers[index], `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${contentObjectNumbers[index]} 0 R${annots} >>`);
    const stream = pageStream(page);
    set(contentObjectNumbers[index], `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}endstream`);
  });
  for (const annotation of annotations) {
    const [x, y, w, h] = [annotation.x, annotation.y, annotation.width, annotation.height];
    set(annotation.number, `<< /Type /Annot /Subtype /Link /Rect [${x.toFixed(2)} ${y.toFixed(2)} ${(x + w).toFixed(2)} ${(y + h).toFixed(2)}] /Border [0 0 0] /A << /S /URI /URI (${pdfText(annotation.url)}) >> >>`);
  }
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}${String(now.getUTCSeconds()).padStart(2, '0')}Z`;
  set(infoNumber, `<< /Title (${pdfText(info.title)}) /Author (${pdfText(info.author)}) /Subject (${pdfText(info.subject)}) /Creator (Anto\\361iOS) /Producer (Anto\\361iOS) /CreationDate (D:${stamp}) >>`);
  const infoObjectNumber = infoNumber;

  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  let body = '';
  const offsets = [];
  for (let index = 0; index < objects.length; index++) {
    offsets[index] = header.length + body.length;
    body += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }
  const startxref = header.length + body.length;
  const xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}`;
  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${infoObjectNumber} 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;
  return Buffer.from(header + body + xref + trailer, 'latin1');
}

const outputs = {
  es: 'public/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf',
  en: 'public/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf',
};

for (const locale of ['es', 'en']) {
  const profile = getProfile(locale);
  const pages = layout(buildLines(locale));
  const buffer = buildPdf(pages, {
    title: `CV — ${profile.name} — ${profile.headline}`,
    author: profile.name,
    subject: cvSupportingLine,
  });
  const target = resolve(root, outputs[locale]);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buffer);
  console.log(`${outputs[locale]}: ${pages.length} pages, ${buffer.length} bytes`);
}

console.log('PHONE_NOT_VERIFIED_FOR_PDF: no approved telephone value was found in the repository; telephone omitted from both PDFs.');
