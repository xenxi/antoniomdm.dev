import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';
import { basePath, localizedPath, localeForPath, translator } from '../src/i18n/core';
import { spanish } from '../src/i18n/es';
import { getPortfolio } from '../src/data/portfolio';

describe('bilingual publishing contract', () => {
  it('defaults to Spanish and preserves deep paths and reading queries', () => {
    expect(localeForPath('/')).toBe('es');
    expect(localeForPath('/en/projects/platform934/')).toBe('en');
    expect(localizedPath('/profile/languages/?view=reading', 'en')).toBe('/en/profile/languages/?view=reading');
    expect(localizedPath('/en/notes/os-foundation/', 'es')).toBe('/notes/os-foundation/');
    expect(localizedPath('/es/projects/?source=legacy#overview', 'es')).toBe('/projects/?source=legacy#overview');
    expect(basePath('/en/')).toBe('/');
    expect(localizedPath('/en/profile/languages/', 'en')).toBe('/en/profile/languages/');
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
  it('shares career evidence between languages and localizes language capabilities', () => {
    const es = getPortfolio('es'); const en = getPortfolio('en');
    expect(es.experience.map(job => job.id)).toEqual(en.experience.map(job => job.id));
    expect(es.experience).toHaveLength(9);
    expect(es.experience[0].period).toContain('Actualidad');
    expect(en.experience[0].period).toContain('Present');
    expect(es.profile.education).toContain('título no obtenido');
    expect(en.profile.education).toContain('degree not awarded');
    expect(es.profile.languages.find(language => language.id === 'spanish')).toMatchObject({ name: 'Español', native: true });
    expect(en.profile.languages.find(language => language.id === 'spanish')).toMatchObject({ name: 'Spanish', native: true });
    expect(es.profile.languages.find(language => language.id === 'english')?.capabilities.map(capability => capability.level)).toEqual(['Avanzada', 'Avanzada', 'En desarrollo']);
    expect(en.profile.languages.find(language => language.id === 'english')?.capabilities.map(capability => capability.level)).toEqual(['Advanced', 'Advanced', 'In development']);
    expect(translator('es')('Experience')).toBe('Experiencia');
  });
});
