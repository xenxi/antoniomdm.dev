import { describe, expect, it } from 'vitest';
import { getArchitectureCases, getCvVariants, getExperience, getProfile, getProjects, getPublicLinks, getTerminalIndex, publicProfessionalModel, validatePublicProfessionalModel, type ProfessionalModelCandidate } from '../src/data/professional';

const candidate = (): ProfessionalModelCandidate => structuredClone(publicProfessionalModel);

describe('public professional model', () => {
  it('is a valid, strictly bilingual curated dataset', () => {
    expect(validatePublicProfessionalModel(candidate())).toEqual([]);
    expect(getProfile('es').headline).toBe('Software Architect | Senior .NET Engineer');
    expect(getProfile('en').focusLine).toContain('Applied AI');
    expect(getExperience('es').map(item => item.id)).toEqual(getExperience('en').map(item => item.id));
    expect(getExperience('es').map(item => [item.id, item.start, item.end])).toEqual([
      ['domingo-alonso', '2021-07', null], ['anexia', '2017-12', '2021-07'], ['vector-itc', '2017-05', '2017-12'],
      ['nokia', '2016-01', '2017-05'], ['alcatel-lucent', '2014-09', '2016-01'], ['freelance', '2013-06', '2014-10'],
      ['la-salle', '2013-10', '2014-02'], ['signlab', '2013-01', '2013-04'], ['xul', '2012-10', '2012-12'],
    ]);
  });

  it.each(['PRIVATE', 'INTERVIEW_ONLY'] as const)('rejects %s visibility', visibility => {
    const value = candidate(); value.claims[0].visibility = visibility;
    expect(validatePublicProfessionalModel(value).join('\n')).toContain(`forbidden visibility ${visibility}`);
  });

  it('rejects NEEDS_VERIFICATION claims', () => {
    const value = candidate(); value.claims[0].status = 'NEEDS_VERIFICATION';
    expect(validatePublicProfessionalModel(value).join('\n')).toContain('forbidden status NEEDS_VERIFICATION');
  });

  it('rejects implemented capabilities backed by in-progress claims', () => {
    const value = candidate(); const project = value.projects[0];
    project.capabilities.find(item => item.id === 'cross-device-control')!.deliveryStatus = 'implemented';
    expect(validatePublicProfessionalModel(value).join('\n')).toContain('implemented but references an IN_PROGRESS claim');
  });

  it('rejects fake preparing links and incomplete available CV assets', () => {
    const value = candidate(); value.externalLinks.find(link => link.id === 'github')!.url = '#';
    value.externalLinks.find(link => link.id === 'linkedin')!.availability = 'preparing';
    delete value.externalLinks.find(link => link.id === 'website')!.url;
    value.cvVariants[0].pdf.es = { availability: 'available' };
    const errors = validatePublicProfessionalModel(value).join('\n');
    expect(errors).toContain('externalLinks.github.url uses a fake URL');
    expect(errors).toContain('linkedin is preparing but has a URL');
    expect(errors).toContain('externalLinks.website is available without a URL');
    expect(errors).toContain('available without a complete verified asset');
  });

  it('rejects missing locales, duplicate ids and broken relations', () => {
    const value = candidate(); value.profile.summary.en = ''; value.experiences[1].id = value.experiences[0].id; value.profile.competencyIds.push('not-a-competency');
    const errors = validatePublicProfessionalModel(value).join('\n');
    expect(errors).toContain('model.profile.summary.en is required');
    expect(errors).toContain('duplicate id');
    expect(errors).toContain('references missing id "not-a-competency"');
  });

  it('rejects published sections without both locales and pending sections with content', () => {
    const value = candidate(); value.architectureCases[0].context.content!.en = ''; value.architectureCases[0].options.content = { es: 'Inventado', en: 'Invented' };
    const errors = validatePublicProfessionalModel(value).join('\n');
    expect(errors).toContain('architectureCases.vehicle-read-model.context.content.en is required');
    expect(errors).toContain('pending_editorial but contains public content');
  });

  it('publishes the approved A5 sections while keeping undocumented options out', () => {
    const cases = getArchitectureCases('en'); const vehicle = cases.find(item => item.id === 'vehicle-read-model')!;
    expect(vehicle.sections.some(section => section.id === 'options')).toBe(false);
    expect(vehicle.sections.some(section => section.id === 'learning')).toBe(true);
    expect(validatePublicProfessionalModel(candidate())).toEqual([]);
  });

  it('keeps the original cases, adds the new deep dives and preserves exact A5 relations', () => {
    const cases = publicProfessionalModel.architectureCases;
    expect(cases.map(item => item.id)).toEqual(['vehicle-read-model', 'testing-infrastructure', 'event-summaries', 'legacy-modernization', 'service-boundaries-and-ddd', 'incident-diagnosis-agent']);
    expect(new Set(cases.map(item => item.slug)).size).toBe(6);
    expect(cases.slice(0, 4).map(item => [item.id, item.experienceIds, item.competencyIds, item.achievementIds])).toEqual([
      ['vehicle-read-model', ['domingo-alonso'], ['software-architecture', 'performance-engineering', 'sql-data-architecture'], []],
      ['testing-infrastructure', ['domingo-alonso'], ['testing-quality'], ['integration-suite-feedback']],
      ['event-summaries', ['domingo-alonso'], ['distributed-systems', 'event-driven-architecture'], ['event-summary-api-calls']],
      ['legacy-modernization', ['domingo-alonso'], ['legacy-modernization', 'software-architecture'], []],
    ]);
    const value = candidate(); value.architectureCases[1].slug = value.architectureCases[0].slug;
    expect(validatePublicProfessionalModel(value).join('\n')).toContain('duplicate slug');
  });

  it('keeps every published A5 field bilingual and every route destination non-empty', () => {
    for (const item of publicProfessionalModel.architectureCases) {
      expect(item.slug.trim()).not.toBe('');
      expect(item.title.es.trim()).not.toBe(''); expect(item.title.en.trim()).not.toBe('');
      expect(item.summary.es.trim()).not.toBe(''); expect(item.summary.en.trim()).not.toBe('');
      for (const section of [item.context, item.problem, item.constraints, item.decision, item.tradeoffs, item.implementation, item.result, item.learning]) {
        expect(section).toMatchObject({ status: 'published' });
        expect(section.content?.es.trim()).not.toBe(''); expect(section.content?.en.trim()).not.toBe('');
      }
      if (item.options.status === 'published') {
        expect(item.options.content?.es.trim()).not.toBe(''); expect(item.options.content?.en.trim()).not.toBe('');
      } else expect(item.options).toEqual({ status: 'pending_editorial' });
    }
  });

  it('protects the two scoped approximate metrics without a primary 30x claim', () => {
    const testing = getArchitectureCases('en').find(item => item.id === 'testing-infrastructure')!;
    const events = getArchitectureCases('en').find(item => item.id === 'event-summaries')!;
    const testingResult = testing.sections.find(section => section.id === 'result')!.content;
    const eventResult = events.sections.find(section => section.id === 'result')!.content;
    expect(testingResult).toContain('approximate'); expect(testingResult).toContain('~60'); expect(testingResult).toContain('~2');
    expect(testingResult).not.toMatch(/30\s*[×x]/i);
    expect(eventResult).toContain('~1–2'); expect(eventResult).toContain('per relevant event'); expect(eventResult).toContain('affected integrations');
    expect(publicProfessionalModel.claims.map(claim => `${claim.text.es} ${claim.text.en}`).join(' ')).not.toMatch(/30\s*[×x]/i);
  });

  it('keeps availability and delivery status explicit after A8.1 approval', () => {
    const linkedin = getPublicLinks('es').find(link => link.id === 'linkedin'); expect(linkedin).toMatchObject({ availability: 'available', url: 'https://www.linkedin.com/in/antoniomanueldiazmoreno' });
    const email = getPublicLinks('en').find(link => link.id === 'email'); expect(email).toMatchObject({ availability: 'available', url: 'mailto:antoniom.diaz.moreno@gmail.com' });
    expect(getCvVariants('en')[0].pdf).toMatchObject({ availability: 'available', path: '/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf' });
    expect(getProjects('en')[0].capabilities.find(item => item.id === 'tool-calling-agent')?.deliveryStatus).toBe('implemented');
    expect(getTerminalIndex('en').find(item => item.id === 'github')?.url).toBe('https://github.com/xenxi');
    expect(getTerminalIndex('en').find(item => item.id === 'linkedin')?.url).toBe('https://www.linkedin.com/in/antoniomanueldiazmoreno');
  });
});
