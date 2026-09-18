import { describe, expect, it, vi } from 'vitest';
import { createAnalyticsConfig } from '../src/lib/analytics/config';
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  getStoredAnalyticsConsent,
  setAnalyticsConsent,
} from '../src/lib/analytics/consent';
import {
  createAnalyticsAdapter,
  createGtagDispatcher,
  GA4_TRACKER_SCRIPT_ID,
  type AnalyticsAdapter,
  type AnalyticsRuntime,
} from '../src/lib/analytics/adapter';
import {
  languageChangeEvent,
  sanitizeAnalyticsEvent,
  type AnalyticsEvent,
} from '../src/lib/analytics/events';
import { createPageViewTracker } from '../src/lib/analytics/instrumentation';
import { trackEvent } from '../src/lib/analytics/tracking';

function runtime(
  options: {
    consent?: () => boolean;
    production?: boolean;
    dispatch?: (...command: unknown[]) => void;
    debug?: boolean;
  } = {},
) {
  const appended: HTMLScriptElement[] = [];
  const document = {
    getElementById: vi.fn(() => null),
    createElement: vi.fn(() => ({}) as HTMLScriptElement),
    head: { append: (script: HTMLScriptElement) => appended.push(script) },
  };
  const analyticsRuntime: AnalyticsRuntime = {
    document,
    dispatch: options.dispatch ?? vi.fn(),
    hasConsent: options.consent ?? (() => true),
    isProduction: () => options.production ?? true,
    isDebugMode: () => options.debug ?? false,
  };
  return { appended, document, analyticsRuntime };
}

const projectView: AnalyticsEvent = {
  name: 'project_view',
  params: {
    project_id: 'platform934-api',
    project_name: 'Platform934 API',
    language: 'es',
    source_section: 'projects',
  },
};

describe('consent-aware Google Analytics', () => {
  it('stays disabled without a Measurement ID and validates configured IDs', () => {
    expect(createAnalyticsConfig()).toEqual({
      enabled: false,
      provider: 'ga4',
      consentRequired: true,
    });
    expect(createAnalyticsConfig('G-ABC1234567')).toMatchObject({
      enabled: true,
      measurementId: 'G-ABC1234567',
    });
    expect(() => createAnalyticsConfig('UA-123')).toThrow();
  });

  it('defaults safely when consent is missing or storage is unavailable', () => {
    const storage = new Map<string, string>();
    const browserStorage = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    };

    expect(getStoredAnalyticsConsent(browserStorage)).toBeUndefined();
    expect(setAnalyticsConsent('granted', browserStorage)).toBe('granted');
    expect(storage.get(ANALYTICS_CONSENT_STORAGE_KEY)).toBe('granted');
    expect(getStoredAnalyticsConsent(browserStorage)).toBe('granted');
    expect(
      getStoredAnalyticsConsent({
        getItem: () => {
          throw new Error('blocked');
        },
        setItem: vi.fn(),
      }),
    ).toBeUndefined();
  });

  it('does not load or track without consent', () => {
    const dispatch = vi.fn();
    const { appended, analyticsRuntime } = runtime({
      consent: () => false,
      dispatch,
    });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );

    expect(adapter.trackPageView('/', 'Home', 'es')).toBe(false);
    expect(adapter.track(projectView)).toBe(false);
    expect(appended).toHaveLength(0);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('does not load or track outside the production domain runtime', () => {
    const dispatch = vi.fn();
    const { appended, analyticsRuntime } = runtime({
      production: false,
      dispatch,
    });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );

    expect(adapter.track(projectView)).toBe(false);
    expect(appended).toHaveLength(0);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('tracks after acceptance, stops after revocation and can be granted again', () => {
    let consent = true;
    const dispatch = vi.fn();
    const { analyticsRuntime } = runtime({
      consent: () => consent,
      dispatch,
    });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );

    expect(adapter.track(projectView)).toBe(true);
    consent = false;
    adapter.revoke();
    expect(adapter.track(projectView)).toBe(false);
    consent = true;
    expect(adapter.track(projectView)).toBe(true);

    const projectEvents = dispatch.mock.calls.filter(
      (call) => call[0] === 'event' && call[1] === 'project_view',
    );
    expect(projectEvents).toHaveLength(2);
    expect(
      dispatch.mock.calls.filter(
        (call) => call[0] === 'consent' && call[1] === 'update',
      ),
    ).toHaveLength(3);
  });

  it('loads one restricted tracker and strips query strings from page views', () => {
    const analyticsWindow: { dataLayer?: unknown[] } = {};
    const { appended, analyticsRuntime } = runtime({
      dispatch: createGtagDispatcher(analyticsWindow),
    });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );

    expect(adapter.trackPageView('/en/projects/', 'Projects', 'en')).toBe(true);
    expect(adapter.trackPageView('/?private=value', 'Nope', 'es')).toBe(false);
    expect(adapter.trackPageView('/projects/#private', 'Nope', 'es')).toBe(false);
    expect(appended).toHaveLength(1);
    expect(appended[0]?.id).toBe(GA4_TRACKER_SCRIPT_ID);
    expect(appended[0]?.src).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-ABC1234567',
    );
    expect(analyticsWindow.dataLayer).toHaveLength(5);
  });

  it('emits typed project views and project external-link parameters', () => {
    const dispatch = vi.fn();
    const { analyticsRuntime } = runtime({ dispatch });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );
    const external: AnalyticsEvent = {
      name: 'project_external_link',
      params: {
        project_id: 'platform934',
        project_name: 'Platform934',
        destination: 'website',
        language: 'en',
      },
    };

    expect(adapter.track(projectView)).toBe(true);
    expect(adapter.track(external)).toBe(true);
    expect(dispatch).toHaveBeenCalledWith('event', 'project_view', projectView.params);
    expect(dispatch).toHaveBeenCalledWith(
      'event',
      'project_external_link',
      external.params,
    );
  });

  it('only creates language_change for an explicit change', () => {
    expect(languageChangeEvent('es', 'es')).toBeUndefined();
    expect(languageChangeEvent('es', 'en')).toEqual({
      name: 'language_change',
      params: { from_language: 'es', to_language: 'en' },
    });
  });

  it('rejects unknown parameters, URLs and likely personal data', () => {
    expect(sanitizeAnalyticsEvent(projectView)).toEqual(projectView);
    expect(
      sanitizeAnalyticsEvent({
        ...projectView,
        params: { ...projectView.params, url: 'https://example.com/?email=a@b.com' },
      }),
    ).toBeUndefined();
    expect(
      sanitizeAnalyticsEvent({
        ...projectView,
        params: { ...projectView.params, project_name: 'person@example.com' },
      }),
    ).toBeUndefined();
  });

  it('absorbs a blocked gtag dispatcher without breaking callers', () => {
    const { analyticsRuntime } = runtime({
      dispatch: () => {
        throw new Error('blocked by browser');
      },
    });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );

    expect(() => adapter.track(projectView)).not.toThrow();
    expect(adapter.track(projectView)).toBe(false);
    expect(trackEvent(projectView)).toBe(false);
  });

  it('deduplicates one logical page view without blocking later revisits', () => {
    const adapter: AnalyticsAdapter = {
      trackPageView: vi.fn(() => true),
      track: vi.fn(() => true),
      revoke: vi.fn(),
    };
    const tracker = createPageViewTracker(adapter);
    const input = {
      pagePath: '/projects/platform934/',
      pageTitle: 'Platform934',
      language: 'es' as const,
      viewEvent: projectView,
    };

    expect(tracker.track(input)).toBe(true);
    expect(tracker.track(input)).toBe(false);
    expect(
      tracker.track({ ...input, pagePath: '/projects/', viewEvent: undefined }),
    ).toBe(true);
    expect(tracker.track(input)).toBe(true);
    expect(adapter.trackPageView).toHaveBeenCalledTimes(3);
    expect(adapter.track).toHaveBeenCalledTimes(2);
  });

  it('allows two legitimate repeated interactions with the same entity', () => {
    const dispatch = vi.fn();
    const { analyticsRuntime } = runtime({ dispatch });
    const adapter = createAnalyticsAdapter(
      createAnalyticsConfig('G-ABC1234567'),
      analyticsRuntime,
    );

    expect(adapter.track(projectView)).toBe(true);
    expect(adapter.track(projectView)).toBe(true);
    expect(
      dispatch.mock.calls.filter(
        (call) => call[0] === 'event' && call[1] === 'project_view',
      ),
    ).toHaveLength(2);
  });
});
