import {
  createAnalyticsAdapter,
  createGtagDispatcher,
  type AnalyticsAdapter,
  type AnalyticsWindow,
} from './adapter';
import type { AnalyticsConfig } from './config';
import {
  languageChangeEvent,
  type AnalyticsEvent,
  type AnalyticsLanguage,
  type AnalyticsSourceSection,
  type ProjectExternalDestination,
} from './events';
import {
  getStoredAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from './consent';
import { routeViewEventFromDocument } from './route-events';
import type { AnalyticsBridge, PageViewInput } from './tracking';

const PRODUCTION_HOSTS = new Set(['antoniomdm.dev', 'www.antoniomdm.dev']);
export const ANALYTICS_DEBUG_STORAGE_KEY = 'antonios-ga4-debug';

function browserStorage(window: Window): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function isDebugMode(window: Window): boolean {
  try {
    return window.sessionStorage.getItem(ANALYTICS_DEBUG_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function clearGaCookies(document: Document): void {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=', 1)[0]?.trim();
    if (name === '_ga' || name?.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; Domain=.antoniomdm.dev; Path=/; SameSite=Lax`;
    }
  });
}

export function createPageViewTracker(adapter: AnalyticsAdapter) {
  let lastPageKey: string | undefined;

  return Object.freeze({
    track(input: PageViewInput): boolean {
      const key = `${input.language}:${input.pagePath}`;
      if (key === lastPageKey) return false;

      const tracked = adapter.trackPageView(
        input.pagePath,
        input.pageTitle,
        input.language,
      );
      if (!tracked) return false;

      lastPageKey = key;
      if (input.viewEvent) adapter.track(input.viewEvent);
      return true;
    },
    reset(): void {
      lastPageKey = undefined;
    },
  });
}

function sourceSectionForElement(element: Element): AnalyticsSourceSection {
  if (element.closest('.launcher')) return 'home';
  const appId = element.closest<HTMLElement>('[data-window]')?.dataset.window;
  const byApp: Record<string, AnalyticsSourceSection> = {
    welcome: 'home',
    projects: 'project',
    architecture: 'architecture',
    lab: 'ai_lab',
    notes: 'blog',
    about: 'about',
    contact: 'contact',
    terminal: 'terminal',
    arcade: 'arcade',
  };
  return (appId && byApp[appId]) || 'other';
}

export function interactionEventFromElement(
  element: Element,
  language: AnalyticsLanguage,
): AnalyticsEvent | undefined {
  const languageLink = element.closest<HTMLElement>('[data-language]');
  if (languageLink?.dataset.language === 'es' || languageLink?.dataset.language === 'en') {
    return languageChangeEvent(language, languageLink.dataset.language);
  }

  const projectLink = element.closest<HTMLElement>('[data-project-destination]');
  const project = projectLink?.closest<HTMLElement>('[data-project-detail]');
  if (
    projectLink &&
    project?.dataset.projectId &&
    project.dataset.projectName
  ) {
    return {
      name: 'project_external_link',
      params: {
        project_id: project.dataset.projectId,
        project_name: project.dataset.projectName,
        destination: projectLink.dataset.projectDestination as ProjectExternalDestination,
        language,
      },
    };
  }

  const link = element.closest<HTMLAnchorElement>('a[href]');
  if (!link) return undefined;
  const sourceSection = sourceSectionForElement(link);

  if (link.protocol === 'mailto:') {
    return {
      name: 'contact_click',
      params: {
        contact_method: 'email',
        source_section: sourceSection,
        language,
      },
    };
  }

  const hostname = link.hostname.toLowerCase();
  if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) {
    return sourceSection === 'contact'
      ? {
          name: 'contact_click',
          params: {
            contact_method: 'linkedin',
            source_section: 'contact',
            language,
          },
        }
      : {
          name: 'linkedin_click',
          params: { source_section: sourceSection, language },
        };
  }

  if (hostname === 'github.com' || hostname.endsWith('.github.com')) {
    return {
      name: 'github_click',
      params: { source_section: sourceSection, language },
    };
  }

  return undefined;
}

export function bindAnalytics(
  config: AnalyticsConfig,
  document: Document,
  window: Window,
): void {
  if (!config.enabled || window.__ANTONIOS_ANALYTICS__) return;

  const region = document.getElementById('analytics-consent');
  const panel = document.getElementById('analytics-consent-panel');
  const settings = document.getElementById('analytics-consent-settings');
  const status = document.getElementById('analytics-consent-status');
  if (region === null || panel === null || settings === null || status === null) {
    return;
  }

  const storage = browserStorage(window);
  const adapter = createAnalyticsAdapter(config, {
    document,
    dispatch: createGtagDispatcher(window as Window & AnalyticsWindow),
    hasConsent: () => getStoredAnalyticsConsent(storage) === 'granted',
    isProduction: () =>
      window.location.protocol === 'https:' &&
      PRODUCTION_HOSTS.has(window.location.hostname),
    isDebugMode: () => isDebugMode(window),
  });
  const pageTracker = createPageViewTracker(adapter);

  const bridge: AnalyticsBridge = {
    track: (event) => adapter.track(event),
    trackPageView: (input) => pageTracker.track(input),
  };
  window.__ANTONIOS_ANALYTICS__ = bridge;

  const language = (): AnalyticsLanguage =>
    document.documentElement.lang === 'en' ? 'en' : 'es';
  const trackCurrentPage = () => {
    const currentLanguage = language();
    bridge.trackPageView({
      pagePath: window.location.pathname,
      pageTitle: document.title,
      language: currentLanguage,
      viewEvent: routeViewEventFromDocument(
        document,
        window.location.pathname.replace(/^\/en(?=\/|$)/, '') || '/',
        currentLanguage,
      ),
    });
  };

  const render = (consent?: AnalyticsConsent, editing = false) => {
    panel.hidden = !editing && consent !== undefined;
    settings.hidden = editing || consent === undefined;
    region.dataset.analyticsConsentState = editing
      ? 'editing'
      : (consent ?? 'pending');
  };

  const choose = (consent: AnalyticsConsent) => {
    setAnalyticsConsent(consent, storage);
    render(consent);
    status.textContent =
      consent === 'granted'
        ? status.dataset.granted ?? ''
        : status.dataset.denied ?? '';

    if (consent === 'granted') {
      trackCurrentPage();
    } else {
      adapter.revoke();
      pageTracker.reset();
      clearGaCookies(document);
    }
  };

  region
    .querySelector('[data-analytics-consent="accept"]')
    ?.addEventListener('click', () => choose('granted'));
  region
    .querySelector('[data-analytics-consent="reject"]')
    ?.addEventListener('click', () => choose('denied'));
  settings.addEventListener('click', () => {
    render(getStoredAnalyticsConsent(storage), true);
    panel.focus();
  });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const analyticsEvent = interactionEventFromElement(event.target, language());
    if (analyticsEvent) bridge.track(analyticsEvent);
  });

  const storedConsent = getStoredAnalyticsConsent(storage);
  render(storedConsent);
  if (storedConsent === 'granted') trackCurrentPage();
}
