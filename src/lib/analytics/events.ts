import type { Locale } from '../../i18n/core';
import type { AppId } from '../../os/types';

export type AnalyticsLanguage = Locale;
export type AnalyticsSourceSection =
  | 'home'
  | 'projects'
  | 'project'
  | 'architecture'
  | 'ai_lab'
  | 'blog'
  | 'out_of_scope'
  | 'about'
  | 'contact'
  | 'terminal'
  | 'arcade'
  | 'portfolio'
  | 'other';
export type ProjectExternalDestination =
  | 'github'
  | 'website'
  | 'demo'
  | 'documentation'
  | 'other';
export type ContactMethod = 'email' | 'linkedin' | 'other';

export type AnalyticsEvent =
  | {
      name: 'project_view';
      params: {
        project_id: string;
        project_name: string;
        language: AnalyticsLanguage;
        source_section: AnalyticsSourceSection;
      };
    }
  | {
      name: 'project_external_link';
      params: {
        project_id: string;
        project_name: string;
        destination: ProjectExternalDestination;
        language: AnalyticsLanguage;
      };
    }
  | {
      name: 'case_study_view';
      params: {
        case_id: string;
        project_id?: string;
        language: AnalyticsLanguage;
        source_section: AnalyticsSourceSection;
      };
    }
  | { name: 'ai_lab_view'; params: { language: AnalyticsLanguage } }
  | {
      name: 'ai_lab_case_view';
      params: {
        case_id: string;
        case_name: string;
        language: AnalyticsLanguage;
      };
    }
  | {
      name: 'blog_article_view';
      params: {
        article_slug: string;
        language: AnalyticsLanguage;
        source_section: AnalyticsSourceSection;
      };
    }
  | { name: 'article_view' | 'article_50_percent' | 'article_complete' | 'article_portfolio_click' | 'article_contact_click' | 'article_share'; params: { article_slug: string; language: AnalyticsLanguage } }
  | { name: 'article_project_click'; params: { article_slug: string; project_id: string; language: AnalyticsLanguage } }
  | { name: 'article_external_link'; params: { article_slug: string; destination: string; language: AnalyticsLanguage } }
  | {
      name: 'github_click';
      params: {
        source_section: AnalyticsSourceSection;
        project_id?: string;
        language: AnalyticsLanguage;
      };
    }
  | {
      name: 'linkedin_click';
      params: {
        source_section: AnalyticsSourceSection;
        language: AnalyticsLanguage;
      };
    }
  | {
      name: 'contact_click';
      params: {
        contact_method: ContactMethod;
        source_section: AnalyticsSourceSection;
        language: AnalyticsLanguage;
      };
    }
  | { name: 'arcade_open'; params: { language: AnalyticsLanguage } }
  | {
      name: 'arcade_game_start';
      params: { game_id: string; language: AnalyticsLanguage };
    }
  | {
      name: 'language_change';
      params: {
        from_language: AnalyticsLanguage;
        to_language: AnalyticsLanguage;
      };
    }
  | {
      name: 'app_open';
      params: { app_id: AppId; language: AnalyticsLanguage };
    };

const languages = new Set<AnalyticsLanguage>(['es', 'en']);
const sourceSections = new Set<AnalyticsSourceSection>([
  'home',
  'projects',
  'project',
  'architecture',
  'ai_lab',
  'blog',
  'out_of_scope',
  'about',
  'contact',
  'terminal',
  'arcade',
  'portfolio',
  'other',
]);
const destinations = new Set<ProjectExternalDestination>([
  'github',
  'website',
  'demo',
  'documentation',
  'other',
]);
const contactMethods = new Set<ContactMethod>(['email', 'linkedin', 'other']);
const appIds = new Set<AppId>([
  'welcome',
  'projects',
  'experience',
  'blog',
  'lab',
  'about',
  'background',
  'terminal',
  'settings',
  'arcade',
  'architecture',
  'contact',
]);
const stableId = /^[a-z0-9][a-z0-9-]{0,79}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).every((key) => keys.includes(key));
}

function isPublicLabel(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 120 &&
    !value.includes('@') &&
    !value.includes('://') &&
    !value.includes('?') &&
    !value.includes('#')
  );
}

function isLanguage(value: unknown): value is AnalyticsLanguage {
  return languages.has(value as AnalyticsLanguage);
}

function isSource(value: unknown): value is AnalyticsSourceSection {
  return sourceSections.has(value as AnalyticsSourceSection);
}

function optionalStableId(value: unknown): value is string | undefined {
  return value === undefined || (typeof value === 'string' && stableId.test(value));
}

export function sanitizeAnalyticsEvent(value: unknown): AnalyticsEvent | undefined {
  if (!isRecord(value) || typeof value.name !== 'string' || !isRecord(value.params)) {
    return undefined;
  }

  const params = value.params;
  switch (value.name) {
    case 'project_view':
      if (
        !hasOnlyKeys(params, ['project_id', 'project_name', 'language', 'source_section']) ||
        typeof params.project_id !== 'string' ||
        !stableId.test(params.project_id) ||
        !isPublicLabel(params.project_name) ||
        !isLanguage(params.language) ||
        !isSource(params.source_section)
      ) return undefined;
      break;
    case 'project_external_link':
      if (
        !hasOnlyKeys(params, ['project_id', 'project_name', 'destination', 'language']) ||
        typeof params.project_id !== 'string' ||
        !stableId.test(params.project_id) ||
        !isPublicLabel(params.project_name) ||
        !destinations.has(params.destination as ProjectExternalDestination) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'case_study_view':
      if (
        !hasOnlyKeys(params, ['case_id', 'project_id', 'language', 'source_section']) ||
        typeof params.case_id !== 'string' ||
        !stableId.test(params.case_id) ||
        !optionalStableId(params.project_id) ||
        !isLanguage(params.language) ||
        !isSource(params.source_section)
      ) return undefined;
      break;
    case 'ai_lab_view':
    case 'arcade_open':
      if (!hasOnlyKeys(params, ['language']) || !isLanguage(params.language)) return undefined;
      break;
    case 'ai_lab_case_view':
      if (
        !hasOnlyKeys(params, ['case_id', 'case_name', 'language']) ||
        typeof params.case_id !== 'string' ||
        !stableId.test(params.case_id) ||
        !isPublicLabel(params.case_name) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'blog_article_view':
      if (
        !hasOnlyKeys(params, ['article_slug', 'language', 'source_section']) ||
        typeof params.article_slug !== 'string' ||
        !stableId.test(params.article_slug) ||
        !isLanguage(params.language) ||
        !isSource(params.source_section)
      ) return undefined;
      break;
    case 'article_view':
    case 'article_50_percent':
    case 'article_complete':
    case 'article_portfolio_click':
    case 'article_contact_click':
    case 'article_share':
      if (
        !hasOnlyKeys(params, ['article_slug', 'language']) ||
        typeof params.article_slug !== 'string' ||
        !stableId.test(params.article_slug) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'article_project_click':
      if (
        !hasOnlyKeys(params, ['article_slug', 'project_id', 'language']) ||
        typeof params.article_slug !== 'string' || !stableId.test(params.article_slug) ||
        typeof params.project_id !== 'string' || !stableId.test(params.project_id) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'article_external_link':
      if (
        !hasOnlyKeys(params, ['article_slug', 'destination', 'language']) ||
        typeof params.article_slug !== 'string' || !stableId.test(params.article_slug) ||
        !isPublicLabel(params.destination) || !isLanguage(params.language)
      ) return undefined;
      break;
    case 'github_click':
      if (
        !hasOnlyKeys(params, ['source_section', 'project_id', 'language']) ||
        !isSource(params.source_section) ||
        !optionalStableId(params.project_id) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'linkedin_click':
      if (
        !hasOnlyKeys(params, ['source_section', 'language']) ||
        !isSource(params.source_section) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'contact_click':
      if (
        !hasOnlyKeys(params, ['contact_method', 'source_section', 'language']) ||
        !contactMethods.has(params.contact_method as ContactMethod) ||
        !isSource(params.source_section) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'arcade_game_start':
      if (
        !hasOnlyKeys(params, ['game_id', 'language']) ||
        typeof params.game_id !== 'string' ||
        !stableId.test(params.game_id) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    case 'language_change':
      if (
        !hasOnlyKeys(params, ['from_language', 'to_language']) ||
        !isLanguage(params.from_language) ||
        !isLanguage(params.to_language) ||
        params.from_language === params.to_language
      ) return undefined;
      break;
    case 'app_open':
      if (
        !hasOnlyKeys(params, ['app_id', 'language']) ||
        !appIds.has(params.app_id as AppId) ||
        !isLanguage(params.language)
      ) return undefined;
      break;
    default:
      return undefined;
  }

  return value as AnalyticsEvent;
}

export function languageChangeEvent(
  from: AnalyticsLanguage,
  to: AnalyticsLanguage,
): AnalyticsEvent | undefined {
  return from === to
    ? undefined
    : {
        name: 'language_change',
        params: { from_language: from, to_language: to },
      };
}
