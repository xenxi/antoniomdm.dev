import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';
import { basePath, localizedPath, localeForPath, translator } from '../src/i18n/core';
import { spanish } from '../src/i18n/es';
import { getPortfolio } from '../src/data/portfolio';
import { cvResponse } from '../src/data/downloads';

describe('bilingual publishing contract', () => {
  it('defaults to Spanish and preserves deep paths and reading queries', () => {
    expect(localeForPath('/')).toBe('es');
    expect(localeForPath('/en/projects/platform934/')).toBe('en');
    expect(localizedPath('/cv/?view=reading', 'en')).toBe('/en/cv/?view=reading');
    expect(localizedPath('/en/notes/os-foundation/', 'es')).toBe('/notes/os-foundation/');
    expect(localizedPath('/es/projects/?source=legacy#overview', 'es')).toBe('/projects/?source=legacy#overview');
    expect(basePath('/en/')).toBe('/');
    expect(localizedPath('/en/cv.txt', 'en')).toBe('/en/cv.txt');
  });
  it('requires a Spanish translation for every explicit interface translation key', () => {
    const paths = ['src/components', 'src/arcade', 'src/data'];
    const missing: string[] = [];
    for (const dir of paths) for (const name of readdirSync(dir).filter(name => /\.tsx?$/.test(name))) {
      const file = `${dir}/${name}`; const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
      function visit(node: ts.Node) {
        if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
          const key = node.arguments[0].text;
          if (!spanish[key]) missing.push(`${file}: ${key}`);
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
    expect(missing).toEqual([]);
  });
  it('shares career evidence between languages and includes it in downloadable CVs', async () => {
    const es = getPortfolio('es'); const en = getPortfolio('en');
    expect(es.experience.map(job => job.id)).toEqual(en.experience.map(job => job.id));
    expect(es.experience).toHaveLength(9);
    expect(es.experience[0].period).toContain('Actualidad');
    expect(en.experience[0].period).toContain('Present');
    expect(es.profile.education).toContain('título no obtenido');
    expect(en.profile.education).toContain('degree not awarded');
    for (const locale of ['es', 'en'] as const) {
      const data = getPortfolio(locale); const cv = await cvResponse(locale).text();
      for (const job of data.experience) expect(cv).toContain(job.description);
      expect(cv).toContain(data.profile.education);
      expect(cv).toContain(data.profile.spokenLanguages);
    }
    expect(translator('es')('Experience')).toBe('Experiencia');
  });
});
