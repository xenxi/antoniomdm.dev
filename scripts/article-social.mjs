import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { formatLinkedInPost, linkedinDedupeKey } from './out-of-scope-linkedin.mjs';

const root = resolve('src/content/out-of-scope');
const scalar = (source, key) => source.match(new RegExp(`^\\s*${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1]?.replace(/["']$/, '');
const linkedinText = source => source.match(/^\s*text:\s*[>|]\s*\r?\n((?:\s{4}.+(?:\r?\n|$))+)/m)?.[1]?.split(/\r?\n/).map(line => line.replace(/^\s{4}/, '')).join('\n').trim();
const files = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, item.name);
    if (item.isDirectory()) await walk(path);
    else if (/\.mdx?$/.test(item.name)) files.push(path);
  }
}
await walk(root);
const requestedLocale = process.argv.find(value => /^--locale=/.test(value))?.split('=')[1];
const requestedSlug = process.argv.find(value => /^--slug=/.test(value))?.split('=')[1];
let count = 0;
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const locale = scalar(source, 'locale'); const slug = scalar(source, 'slug');
  if (scalar(source, 'draft') !== 'false' || scalar(source, 'enabled') === 'false') continue;
  if ((requestedLocale && locale !== requestedLocale) || (requestedSlug && slug !== requestedSlug)) continue;
  const title = scalar(source, 'title'); const summary = scalar(source, 'summary'); const date = scalar(source, 'date');
  if (!title || !summary || !locale || !slug || !date) throw new Error(`Incomplete social metadata in ${file}`);
  const canonicalUrl = `https://antoniomdm.dev${locale === 'en' ? '/en' : ''}/blog/${slug}/`;
  const output = formatLinkedInPost({ title, summary, canonicalUrl, locale, text: linkedinText(source) });
  process.stdout.write(`\n--- ${locale}/${slug} ---\n${output}\n\nReview key: ${linkedinDedupeKey({ canonicalUrl, publishedAt: date })}\n`);
  count += 1;
}
if (!count) throw new Error('No published Blog article matched the requested filters.');
