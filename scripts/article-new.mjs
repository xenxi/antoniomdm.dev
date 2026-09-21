import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error('Uso / Usage: npm run article:new -- <kebab-case-slug>');
}
const date = new Date().toISOString().slice(0, 10);
for (const locale of ['es', 'en']) {
  const directory = resolve('src/content/out-of-scope', locale, slug);
  const file = resolve(directory, 'index.mdx');
  try { await access(file, constants.F_OK); throw new Error(`Ya existe / Already exists: ${file}`); } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  await mkdir(resolve(directory, 'images'), { recursive: true });
  const es = locale === 'es';
  const template = `---
title: "${es ? 'TODO: título editorial' : 'TODO: editorial title'}"
summary: "${es ? 'TODO: escribe un resumen editorial manual de al menos cuarenta caracteres antes de publicar.' : 'TODO: write a manual editorial summary of at least forty characters before publishing.'}"
date: ${date}
slug: "${slug}"
locale: "${locale}"
translationKey: "${slug}"
tags:
  - TODO
category: "TODO"
type: "exploration"
readingTime: 5
featured: false
draft: true
linkedin:
  enabled: true
  mode: "review"
---

## ${es ? 'De dónde sale esto' : 'Where this comes from'}

<!-- ${es ? 'Describe el contexto verificable. Elimina este comentario antes de publicar.' : 'Describe the verifiable context. Remove this comment before publishing.'} -->

## ${es ? 'La pregunta' : 'The question'}

<Question title="${es ? 'PREGUNTA' : 'QUESTION'}">
  TODO
</Question>

## ${es ? 'Lo que probé' : 'What I tried'}

## ${es ? 'Qué encontré' : 'What I found'}

<OpenQuestions title="${es ? 'PREGUNTAS ABIERTAS' : 'OPEN QUESTIONS'}">

- TODO

</OpenQuestions>
`;
  await writeFile(file, template, { encoding: 'utf8', flag: 'wx' });
  process.stdout.write(`${es ? 'Creado' : 'Created'}: ${file}\n`);
}
process.stdout.write('Borradores ES/EN creados. Traduce y valida ambos antes de cambiar draft a false.\nES/EN drafts created. Translate and validate both before setting draft to false.\n');
