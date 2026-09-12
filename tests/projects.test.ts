import { describe, expect, it } from 'vitest';
import { projects, type ProjectStatus, type ProjectEcosystem, type ProjectDepth } from '../src/data/projects';
import { publicProfessionalModel } from '../src/data/professional';

const statuses: ProjectStatus[] = ['IMPLEMENTED', 'ACTIVE', 'BETA', 'IN_PROGRESS', 'DESIGNED', 'PLANNED', 'HISTORICAL'];
const ecosystems: ProjectEcosystem[] = ['MEDIA_ENGINEERING', 'COMMERCE_PRODUCT_ENGINEERING', 'PERSONAL_DEVELOPER_EXPERIENCE'];
const depths: ProjectDepth[] = ['DEEP_CASE_STUDY', 'STANDARD_PROJECT', 'SMALL_PROJECT'];

describe('A6.6 project registry', () => {
  it('contains exactly the locked nine projects with unique IDs and slugs', () => {
    expect(projects).toHaveLength(9);
    expect(new Set(projects.map(project => project.id)).size).toBe(9);
    expect(new Set(projects.map(project => project.slug)).size).toBe(9);
  });

  it('keeps every public field bilingual and taxonomy values valid', () => {
    for (const project of projects) {
      expect(project.publicName.es).not.toBe(''); expect(project.publicName.en).not.toBe('');
      expect(project.content.summary.es).not.toBe(''); expect(project.content.summary.en).not.toBe('');
      expect(project.content.engineeringStory.es).not.toBe(''); expect(project.content.engineeringStory.en).not.toBe('');
      expect(project.status.every(value => statuses.includes(value))).toBe(true);
      expect(ecosystems).toContain(project.ecosystem); expect(depths).toContain(project.depth);
      expect(project.competencyIds.every(id => publicProfessionalModel.competencies.some(item => item.id === id))).toBe(true);
    }
  });

  it('preserves locked editorial boundaries and approved links', () => {
    const stream = projects.find(project => project.id === 'stream-optimizer')!;
    const koso = projects.find(project => project.id === 'koso')!;
    const studio = projects.find(project => project.id === 'luna-studio')!;
    expect(stream.technologies.some(item => item.name === 'n8n')).toBe(true);
    expect(stream.links.filter(link => link.kind === 'live')).toHaveLength(0);
    expect(koso.links.find(link => link.kind === 'live')?.label.es).toContain('Beta');
    expect(koso.links.find(link => link.kind === 'live')?.url).toContain('koso-cosas-originales');
    expect(studio.content.plannedCapabilities.map(item => `${item.es} ${item.en}`).join(' ')).toContain('DESIGNED / PLANNED');
    expect(projects.find(project => project.id === 'bio-cli')?.depth).toBe('SMALL_PROJECT');
    expect(projects.find(project => project.id === 'platform934')?.depth).toBe('DEEP_CASE_STUDY');
  });

  it('does not expose private service or repository URLs', () => {
    const serialized = JSON.stringify(projects);
    expect(serialized).not.toMatch(/github\.com\/xenxi\/(?!$)/i);
    expect(serialized).not.toMatch(/(?:192\.168\.|quickconnect|nas\/|api[_-]?key|password|token)/i);
    for (const project of projects) expect(project.links.every(link => link.kind === 'detail' || /^https:\/\//.test(link.url))).toBe(true);
  });
});
