import { describe, expect, it } from 'vitest';
import { projects, type ProjectStatus, type ProjectEcosystem, type ProjectDepth } from '../src/data/projects';
import { publicProfessionalModel } from '../src/data/professional';
import { existsSync } from 'node:fs';
import { platform934Endpoints } from '../src/data/platform934-endpoints';

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
    const publicRepos = ['https://github.com/xenxi/antoniomdm.dev', 'https://github.com/xenxi/luna_tartas', 'https://github.com/xenxi/koso', 'https://github.com/xenxi/bio-cli'];
    for (const project of projects) for (const link of project.links.filter(link => link.kind === 'repository')) expect(publicRepos).toContain(link.url);
    expect(serialized).not.toMatch(/(?:192\.168\.|quickconnect|nas\/|api[_-]?key|password|token)/i);
    for (const project of projects) expect(project.links.every(link => link.kind === 'detail' || /^https:\/\//.test(link.url))).toBe(true);
  });

  it('publishes relative API documentation with complete translations and no server location', () => {
    expect(platform934Endpoints).toHaveLength(61);
    expect(new Set(platform934Endpoints.map(endpoint => `${endpoint.method} ${endpoint.path}`)).size).toBe(61);
    expect(JSON.stringify(platform934Endpoints)).not.toMatch(/https?:|localhost|192\.168\.|servers|externalDocs/i);
    for (const endpoint of platform934Endpoints) {
      expect(endpoint.path).toMatch(/^\/(?:api\/|health)/);
      expect(endpoint.description.es.length).toBeGreaterThan(10);
      expect(endpoint.description.en.length).toBeGreaterThan(10);
    }
    expect(projects.find(project => project.id === 'platform934-api')!.links.filter(link => link.kind !== 'detail')).toEqual([]);
  });

  it('supports absent, single and multiple screenshots without invented media', () => {
    expect(projects.some(project => !project.images?.length)).toBe(true);
    expect(projects.some(project => project.images?.length === 1)).toBe(true);
    expect(projects.some(project => (project.images?.length ?? 0) > 1)).toBe(true);
    for (const project of projects) {
      expect(project.content.challenge.es).not.toMatch(/demuestra|evidencia|seniority/i);
      expect(project.content.challenge.en).not.toMatch(/demonstrat|evidence|seniority/i);
      expect(project.content.challengeTitle.es).toBeTruthy();
      expect(project.content.challengeTitle.en).toBeTruthy();
      for (const image of project.images ?? []) {
        expect(existsSync(`public${image.src}`)).toBe(true);
        expect(image.alt.es).toBeTruthy(); expect(image.alt.en).toBeTruthy();
        expect(image.caption?.es).toBeTruthy(); expect(image.caption?.en).toBeTruthy();
        expect(image.width).toBeGreaterThan(0); expect(image.height).toBeGreaterThan(0);
      }
      if (project.logo) expect(existsSync(`public${project.logo.src}`)).toBe(true);
    }
  });
});
