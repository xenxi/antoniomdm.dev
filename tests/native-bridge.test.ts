import { describe, expect, it } from 'vitest';
import { nativePortfolioPath, readNativePanel } from '../src/arcade/native-bridge';
import { getPortfolio } from '../src/data/portfolio';
import { getExperience } from '../src/data/professional';

describe('native Arcade portfolio boundary', () => {
  const data = { portfolio: getPortfolio('es'), professionalExperience: getExperience('es') };
  it('resolves published identifiers and rejects arbitrary URLs and unknown content', () => {
    expect(nativePortfolioPath({ type: 'portfolio', kind: 'experience', id: 'freelance' }, data)).toBe('/experience/#freelance');
    const project = data.portfolio.projects[0];
    expect(nativePortfolioPath({ type: 'portfolio', kind: 'project', id: project.id }, data)).toBe(`/projects/${project.slug}/`);
    for (const id of ['https://example.com', '__proto__', '../../private', 'unknown']) {
      expect(nativePortfolioPath({ type: 'portfolio', kind: 'project', id }, data)).toBeNull();
    }
    expect(nativePortfolioPath({ type: 'move', kind: 'experience', id: 'freelance' }, data)).toBeNull();
    expect(nativePortfolioPath(null, data)).toBeNull();
  });
  it('accepts only declarative game actions in accessible panels', () => {
    const panel = { title: 'Quest', text: 'Text', feedback: '', choices: [{ id: 'button', label: 'Answer', disabled: false, command: { type: 'answer', id: 'button' } }] };
    expect(readNativePanel(panel)).toEqual(panel);
    expect(readNativePanel({ ...panel, choices: [{ ...panel.choices[0], command: { type: 'eval', script: 'alert(1)' } }] })).toBeNull();
    expect(readNativePanel({ ...panel, choices: [null] })).toBeNull();
    expect(readNativePanel({ ...panel, board: { cells: Array(64).fill(0), label: 'Snake' } })).not.toBeNull();
    expect(readNativePanel({ ...panel, board: { cells: [99], label: 'Snake' } })).toBeNull();
  });
});
