import type { ContentData } from '../../data/portfolio';
import type { UiData } from '../../data/ui';
import { getAiLabCases } from '../../data/aiLab';
import { normalizePath } from '../../os/registry';
import type {
  AnalyticsEvent,
  AnalyticsLanguage,
  AnalyticsSourceSection,
} from './events';

export function sourceSectionForPath(path: string): AnalyticsSourceSection {
  const normalized = normalizePath(path);
  if (normalized === '/') return 'home';
  if (normalized === '/projects/') return 'projects';
  if (normalized.startsWith('/projects/')) return 'project';
  if (normalized.startsWith('/architecture/')) return 'architecture';
  if (normalized.startsWith('/ai-lab/')) return 'ai_lab';
  if (normalized.startsWith('/notes/')) return 'blog';
  if (normalized.startsWith('/profile/') || normalized === '/profile/') return 'about';
  if (normalized === '/contact/') return 'contact';
  if (normalized === '/terminal/') return 'terminal';
  if (normalized === '/arcade/') return 'arcade';
  return 'other';
}

export function routeViewEvent(
  path: string,
  language: AnalyticsLanguage,
  data: UiData,
  content: ContentData,
  sourceSection: AnalyticsSourceSection = 'portfolio',
): AnalyticsEvent | undefined {
  const normalized = normalizePath(path);
  const project = data.portfolio.projects.find(
    (item) => normalized === `/projects/${item.slug}/`,
  );
  if (project) {
    return {
      name: 'project_view',
      params: {
        project_id: project.id,
        project_name: project.name,
        language,
        source_section: sourceSection,
      },
    };
  }

  const architectureCase = data.architectureCases.find(
    (item) => normalized === `/architecture/${item.slug}/`,
  );
  if (architectureCase) {
    return {
      name: 'case_study_view',
      params: {
        case_id: architectureCase.id,
        language,
        source_section: sourceSection,
      },
    };
  }

  if (normalized === '/ai-lab/') {
    return { name: 'ai_lab_view', params: { language } };
  }

  const aiLabCase = getAiLabCases(language).find(
    (item) => item.slug && normalized === `/ai-lab/${item.slug}/`,
  );
  if (aiLabCase) {
    return {
      name: 'ai_lab_case_view',
      params: {
        case_id: aiLabCase.id,
        case_name: aiLabCase.title,
        language,
      },
    };
  }

  const note = content.notes.find(
    (item) => normalized === `/notes/${item.slug}/`,
  );
  if (note) {
    return {
      name: 'blog_article_view',
      params: {
        article_slug: note.slug,
        language,
        source_section: sourceSection,
      },
    };
  }

  if (normalized === '/arcade/') {
    return { name: 'arcade_open', params: { language } };
  }

  return undefined;
}

export function routeViewEventFromDocument(
  document: Document,
  path: string,
  language: AnalyticsLanguage,
): AnalyticsEvent | undefined {
  const normalized = normalizePath(path);
  const project = document.querySelector<HTMLElement>('[data-project-detail]');
  if (project?.dataset.projectId && project.dataset.projectName) {
    return {
      name: 'project_view',
      params: {
        project_id: project.dataset.projectId,
        project_name: project.dataset.projectName,
        language,
        source_section: 'portfolio',
      },
    };
  }

  const architectureCase = document.querySelector<HTMLElement>(
    '[data-architecture-case]',
  );
  if (architectureCase?.dataset.architectureCase) {
    return {
      name: 'case_study_view',
      params: {
        case_id: architectureCase.dataset.architectureCase,
        language,
        source_section: 'portfolio',
      },
    };
  }

  const aiCase = document.querySelector<HTMLElement>('[data-ai-lab-case]');
  if (aiCase?.dataset.aiLabCase && aiCase.dataset.aiLabCaseName) {
    return {
      name: 'ai_lab_case_view',
      params: {
        case_id: aiCase.dataset.aiLabCase,
        case_name: aiCase.dataset.aiLabCaseName,
        language,
      },
    };
  }

  if (normalized === '/ai-lab/' && document.querySelector('.ai-lab-landing')) {
    return { name: 'ai_lab_view', params: { language } };
  }

  const article = document.querySelector<HTMLElement>('[data-note-slug]');
  if (article?.dataset.noteSlug) {
    return {
      name: 'blog_article_view',
      params: {
        article_slug: article.dataset.noteSlug,
        language,
        source_section: 'portfolio',
      },
    };
  }

  if (normalized === '/arcade/' && document.querySelector('[data-arcade]')) {
    return { name: 'arcade_open', params: { language } };
  }

  return undefined;
}
