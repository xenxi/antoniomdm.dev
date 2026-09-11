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
    project.capabilities.find(item => item.id === 'tool-calling-agent')!.deliveryStatus = 'implemented';
    expect(validatePublicProfessionalModel(value).join('\n')).toContain('implemented but references an IN_PROGRESS claim');
  });

  it('rejects fake preparing links and incomplete available CV assets', () => {
    const value = candidate(); value.externalLinks.find(link => link.id === 'linkedin')!.url = '#';
    delete value.externalLinks.find(link => link.id === 'github')!.url;
    value.cvVariants[0].pdf.es = { availability: 'available' };
    const errors = validatePublicProfessionalModel(value).join('\n');
    expect(errors).toContain('linkedin is preparing but has a URL');
    expect(errors).toContain('github is available without a URL');
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

  it('keeps pending editorial fields out of public selectors', () => {
    const cases = getArchitectureCases('en'); const vehicle = cases.find(item => item.id === 'vehicle-read-model')!;
    expect(vehicle.sections.some(section => section.id === 'options')).toBe(false);
    expect(vehicle.sections.some(section => section.id === 'learning')).toBe(false);
    expect(validatePublicProfessionalModel(candidate())).toEqual([]);
  });

  it('keeps availability and delivery status explicit', () => {
    const linkedin = getPublicLinks('es').find(link => link.id === 'linkedin'); expect(linkedin).toMatchObject({ availability: 'preparing' }); expect(linkedin).not.toHaveProperty('url');
    expect(getCvVariants('en')[0].pdf).toEqual({ availability: 'preparing' });
    expect(getProjects('en')[0].capabilities.find(item => item.id === 'tool-calling-agent')?.deliveryStatus).toBe('in_progress');
    expect(getTerminalIndex('en').find(item => item.id === 'github')?.url).toBe('https://github.com/xenxi');
  });
});
