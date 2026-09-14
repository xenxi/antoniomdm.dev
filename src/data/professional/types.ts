import type { Project as CatalogProject } from '../projects';
import type { Locale } from '../../i18n/core';

export type LocalizedText = Record<Locale, string>;
export type PublicVisibility = 'PUBLIC' | 'CV_SAFE';
export type PublicStatus = 'CONFIRMED' | 'IN_PROGRESS';
export type RejectedVisibility = 'PRIVATE' | 'INTERVIEW_ONLY';
export type RejectedStatus = 'NEEDS_VERIFICATION';
export type Availability = 'available' | 'preparing' | 'unavailable';
export type DeliveryStatus = 'implemented' | 'in_progress' | 'experiment';
export type EditorialStatus = 'published' | 'pending_editorial';
export type CompetencyClassification = 'PRIMARY / STRONG' | 'STRONG / CURRENT' | 'STRONG / SECONDARY' | 'EMERGING / CURRENT';

export interface PublicClaim {
  id: string;
  visibility: PublicVisibility;
  status: PublicStatus;
  text: LocalizedText;
  evidenceKind: 'professional' | 'personal' | 'learning';
  evidenceId?: string;
  reviewedAt?: string;
}

export interface ClaimCandidate extends Omit<PublicClaim, 'visibility' | 'status'> {
  visibility: PublicVisibility | RejectedVisibility;
  status: PublicStatus | RejectedStatus;
}

export interface ProfessionalProfile {
  id: string;
  name: string;
  shortName: string;
  headline: LocalizedText;
  focusLine: LocalizedText;
  introduction: LocalizedText;
  mode: LocalizedText;
  summary: LocalizedText;
  humanNote: LocalizedText;
  location: LocalizedText;
  availability: LocalizedText;
  focusAreas: string[];
  experienceIds: string[];
  competencyIds: string[];
  achievementIds: string[];
  education: LocalizedText[];
  languages: LocalizedText[];
  projectIds: string[];
  externalLinkIds: string[];
  cvVariantIds: string[];
  claimIds: string[];
}

export interface ExperienceSection { id: string; title: LocalizedText; content: LocalizedText }
export interface Experience {
  id: string;
  company: LocalizedText;
  role: LocalizedText;
  start: `${number}-${number}`;
  end: `${number}-${number}` | null;
  summary: LocalizedText;
  sections: ExperienceSection[];
  claimIds: string[];
  competencyIds: string[];
  achievementIds: string[];
  caseStudyIds: string[];
}

export interface Competency {
  id: string;
  name: LocalizedText;
  classification: CompetencyClassification;
  recency: 'CURRENT' | 'RECENT_RETURNING' | 'PROFESSIONAL_HISTORICAL_CURRENT_PERSONAL';
  summary?: LocalizedText;
  skills: string[];
  evidenceIds: string[];
  experienceIds: string[];
  caseStudyIds: string[];
  projectIds: string[];
}

export interface AchievementMetric {
  kind: 'duration_change' | 'range_reduction';
  before?: string;
  after?: string;
  range?: string;
  unit: LocalizedText;
  approximate: boolean;
  derivation?: 'arithmetic';
}
export interface Achievement {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  scope: LocalizedText;
  metric?: AchievementMetric;
  claimIds: string[];
  experienceIds: string[];
  caseStudyIds: string[];
}

export interface Capability {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  deliveryStatus: DeliveryStatus;
  claimIds: string[];
}
export interface ProjectDecision { id: string; title: LocalizedText; description: LocalizedText }
export interface Project {
  id: string;
  slug: string;
  kind: 'personal-engineering-lab';
  title: LocalizedText;
  summary: LocalizedText;
  technologies: string[];
  sections: ExperienceSection[];
  capabilities: Capability[];
  decisions: ProjectDecision[];
  claimIds: string[];
  externalLinkIds: string[];
}

export interface EditorialSection {
  status: EditorialStatus;
  content?: LocalizedText;
}
export interface ArchitectureCaseStudy {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  context: EditorialSection;
  problem: EditorialSection;
  constraints: EditorialSection;
  options: EditorialSection;
  decision: EditorialSection;
  tradeoffs: EditorialSection;
  implementation: EditorialSection;
  result: EditorialSection;
  learning: EditorialSection;
  claimIds: string[];
  experienceIds: string[];
  competencyIds: string[];
  achievementIds: string[];
}

export type DecisionEvidenceKind = 'professional' | 'personal' | 'recurring-pattern';

export interface DecisionArea {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  decisionIds: string[];
}

export interface ArchitectureDecision {
  id: string;
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  decision: LocalizedText;
  principle: LocalizedText;
  evidence: LocalizedText;
  evidenceKind: DecisionEvidenceKind;
  experienceIds: string[];
  competencyIds: string[];
  caseStudyIds: string[];
  technologyExamples: string[];
  claimIds: string[];
  achievementIds: string[];
}

export interface ExternalLink {
  id: string;
  kind: 'github' | 'linkedin' | 'email' | 'website' | 'other';
  label: LocalizedText;
  url?: string;
  availability: Availability;
  verifiedAt?: string;
}
export interface AssetAvailability {
  availability: Availability;
  path?: string;
  filename?: string;
  mime?: string;
  verifiedAt?: string;
}
export interface CvVariant {
  id: string;
  title: LocalizedText;
  primary: boolean;
  extendedRoute: LocalizedText;
  pdf: Record<Locale, AssetAvailability>;
}

export interface AiLabTopic {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  evidenceKind: 'professional' | 'personal';
  status: PublicStatus;
  claimIds: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  status: 'published' | 'draft';
  claimIds: string[];
}

export interface PublicProfessionalModel {
  profile: ProfessionalProfile;
  experiences: Experience[];
  competencies: Competency[];
  achievements: Achievement[];
  projects: Project[];
  projectCatalog: CatalogProject[];
  architectureCases: ArchitectureCaseStudy[];
  decisionAreas: DecisionArea[];
  representativeDecisions: ArchitectureDecision[];
  aiLab: AiLabTopic[];
  externalLinks: ExternalLink[];
  cvVariants: CvVariant[];
  blogPosts: BlogPost[];
  claims: PublicClaim[];
}

export type ProfessionalModelCandidate = Omit<PublicProfessionalModel, 'claims'> & { claims: ClaimCandidate[] };
