import type { ArchitectureCaseStudy, ClaimCandidate, LocalizedText, ProfessionalModelCandidate } from './types';

const editorialKeys: (keyof Pick<ArchitectureCaseStudy, 'context' | 'problem' | 'constraints' | 'options' | 'decision' | 'tradeoffs' | 'implementation' | 'result' | 'learning'>)[] = ['context', 'problem', 'constraints', 'options', 'decision', 'tradeoffs', 'implementation', 'result', 'learning'];

function requireLocalized(value: LocalizedText | undefined, path: string, errors: string[]) {
  if (!value?.es?.trim()) errors.push(`${path}.es is required`);
  if (!value?.en?.trim()) errors.push(`${path}.en is required`);
}

function scanLocalized(value: unknown, path: string, errors: string[]) {
  if (!value || typeof value !== 'object') return;
  const record = value as Record<string, unknown>;
  if (typeof record.es === 'string' || typeof record.en === 'string') requireLocalized(record as unknown as LocalizedText, path, errors);
  for (const [key, child] of Object.entries(record)) scanLocalized(child, `${path}.${key}`, errors);
}

function ids<T extends { id: string }>(items: T[], path: string, errors: string[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id.trim()) errors.push(`${path} contains an empty id`);
    else if (seen.has(item.id)) errors.push(`${path} contains duplicate id "${item.id}"`);
    seen.add(item.id);
  }
  return seen;
}

function references(values: string[], available: Set<string>, path: string, errors: string[]) {
  for (const value of values) if (!available.has(value)) errors.push(`${path} references missing id "${value}"`);
}

function validateClaim(claim: ClaimCandidate, errors: string[]) {
  if (claim.visibility === 'PRIVATE' || claim.visibility === 'INTERVIEW_ONLY') errors.push(`claims.${claim.id} has forbidden visibility ${claim.visibility}`);
  if (claim.status === 'NEEDS_VERIFICATION') errors.push(`claims.${claim.id} has forbidden status NEEDS_VERIFICATION`);
}

function validateUrl(url: string, path: string, errors: string[]) {
  if (url === '#' || url.trim() === '') { errors.push(`${path} uses a fake URL`); return; }
  try {
    const protocol = new URL(url).protocol;
    if (!['https:', 'mailto:'].includes(protocol)) errors.push(`${path} uses unsupported protocol ${protocol}`);
  } catch { errors.push(`${path} is not a valid URL`); }
}

export function validatePublicProfessionalModel(model: ProfessionalModelCandidate): string[] {
  const errors: string[] = [];
  scanLocalized(model, 'model', errors);

  const experienceIds = ids(model.experiences, 'experiences', errors);
  const competencyIds = ids(model.competencies, 'competencies', errors);
  const achievementIds = ids(model.achievements, 'achievements', errors);
  const projectIds = ids(model.projects, 'projects', errors);
  const caseIds = ids(model.architectureCases, 'architectureCases', errors);
  const decisionIds = ids(model.representativeDecisions, 'representativeDecisions', errors);
  ids(model.decisionAreas, 'decisionAreas', errors);
  const caseSlugs = new Set<string>();
  const linkIds = ids(model.externalLinks, 'externalLinks', errors);
  const cvIds = ids(model.cvVariants, 'cvVariants', errors);
  const claimIds = ids(model.claims, 'claims', errors);
  ids(model.aiLab, 'aiLab', errors); ids(model.blogPosts, 'blogPosts', errors);

  for (const claim of model.claims) validateClaim(claim, errors);
  references(model.profile.experienceIds, experienceIds, 'profile.experienceIds', errors);
  references(model.profile.competencyIds, competencyIds, 'profile.competencyIds', errors);
  references(model.profile.achievementIds, achievementIds, 'profile.achievementIds', errors);
  references(model.profile.projectIds, projectIds, 'profile.projectIds', errors);
  references(model.profile.externalLinkIds, linkIds, 'profile.externalLinkIds', errors);
  references(model.profile.cvVariantIds, cvIds, 'profile.cvVariantIds', errors);
  references(model.profile.claimIds, claimIds, 'profile.claimIds', errors);

  for (const experience of model.experiences) {
    references(experience.claimIds, claimIds, `experiences.${experience.id}.claimIds`, errors);
    references(experience.competencyIds, competencyIds, `experiences.${experience.id}.competencyIds`, errors);
    references(experience.achievementIds, achievementIds, `experiences.${experience.id}.achievementIds`, errors);
    references(experience.caseStudyIds, caseIds, `experiences.${experience.id}.caseStudyIds`, errors);
  }
  for (const competency of model.competencies) {
    references(competency.experienceIds, experienceIds, `competencies.${competency.id}.experienceIds`, errors);
    references(competency.caseStudyIds, caseIds, `competencies.${competency.id}.caseStudyIds`, errors);
    references(competency.projectIds, projectIds, `competencies.${competency.id}.projectIds`, errors);
  }
  for (const achievement of model.achievements) {
    references(achievement.claimIds, claimIds, `achievements.${achievement.id}.claimIds`, errors);
    references(achievement.experienceIds, experienceIds, `achievements.${achievement.id}.experienceIds`, errors);
    references(achievement.caseStudyIds, caseIds, `achievements.${achievement.id}.caseStudyIds`, errors);
  }
  for (const project of model.projects) {
    references(project.claimIds, claimIds, `projects.${project.id}.claimIds`, errors);
    references(project.externalLinkIds, linkIds, `projects.${project.id}.externalLinkIds`, errors);
    ids(project.capabilities, `projects.${project.id}.capabilities`, errors);
    for (const capability of project.capabilities) {
      references(capability.claimIds, claimIds, `projects.${project.id}.capabilities.${capability.id}.claimIds`, errors);
      const claims = capability.claimIds.map(id => model.claims.find(claim => claim.id === id)).filter(Boolean) as ClaimCandidate[];
      if (capability.deliveryStatus === 'implemented' && claims.some(claim => claim.status === 'IN_PROGRESS')) errors.push(`projects.${project.id}.capabilities.${capability.id} is implemented but references an IN_PROGRESS claim`);
      if (capability.deliveryStatus === 'in_progress' && claims.length > 0 && claims.every(claim => claim.status === 'CONFIRMED')) errors.push(`projects.${project.id}.capabilities.${capability.id} is in_progress without an IN_PROGRESS claim`);
    }
  }
  for (const item of model.architectureCases) {
    if (!item.slug.trim()) errors.push(`architectureCases.${item.id}.slug is required`);
    else if (caseSlugs.has(item.slug)) errors.push(`architectureCases contains duplicate slug "${item.slug}"`);
    caseSlugs.add(item.slug);
    references(item.claimIds, claimIds, `architectureCases.${item.id}.claimIds`, errors);
    references(item.experienceIds, experienceIds, `architectureCases.${item.id}.experienceIds`, errors);
    references(item.competencyIds, competencyIds, `architectureCases.${item.id}.competencyIds`, errors);
    references(item.achievementIds, achievementIds, `architectureCases.${item.id}.achievementIds`, errors);
    for (const key of editorialKeys) {
      const section = item[key];
      if (section.status === 'published') requireLocalized(section.content, `architectureCases.${item.id}.${key}.content`, errors);
      if (section.status === 'pending_editorial' && section.content !== undefined) errors.push(`architectureCases.${item.id}.${key} is pending_editorial but contains public content`);
    }
  }
  for (const area of model.decisionAreas) references(area.decisionIds, decisionIds, `decisionAreas.${area.id}.decisionIds`, errors);
  for (const decision of model.representativeDecisions) {
    references(decision.experienceIds, experienceIds, `representativeDecisions.${decision.id}.experienceIds`, errors);
    references(decision.competencyIds, competencyIds, `representativeDecisions.${decision.id}.competencyIds`, errors);
    references(decision.caseStudyIds, caseIds, `representativeDecisions.${decision.id}.caseStudyIds`, errors);
  }
  for (const topic of model.aiLab) references(topic.claimIds, claimIds, `aiLab.${topic.id}.claimIds`, errors);
  for (const post of model.blogPosts) references(post.claimIds, claimIds, `blogPosts.${post.id}.claimIds`, errors);

  for (const link of model.externalLinks) {
    if (link.availability === 'available') {
      if (!link.url) errors.push(`externalLinks.${link.id} is available without a URL`);
      else validateUrl(link.url, `externalLinks.${link.id}.url`, errors);
    } else if (link.url !== undefined) errors.push(`externalLinks.${link.id} is ${link.availability} but has a URL`);
  }
  for (const variant of model.cvVariants) for (const locale of ['es', 'en'] as const) {
    const asset = variant.pdf[locale]; const path = `cvVariants.${variant.id}.pdf.${locale}`;
    if (asset.availability === 'available') {
      if (!asset.path || !asset.filename || !asset.mime || !asset.verifiedAt) errors.push(`${path} is available without a complete verified asset`);
    } else if (asset.path || asset.filename || asset.mime || asset.verifiedAt) errors.push(`${path} is ${asset.availability} but contains asset fields`);
  }
  return errors;
}

export function assertPublicProfessionalModel(model: ProfessionalModelCandidate): void {
  const errors = validatePublicProfessionalModel(model);
  if (errors.length) throw new Error(`Invalid public professional model:\n- ${errors.join('\n- ')}`);
}
