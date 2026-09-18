import type { AnalyticsConfig } from './config';
import { sanitizeAnalyticsEvent, type AnalyticsEvent } from './events';

export const GA4_TRACKER_SCRIPT_ID = 'antonios-ga4-tracker';

export interface AnalyticsWindow {
  dataLayer?: unknown[];
}

export function createGtagDispatcher(
  window: AnalyticsWindow,
): (...command: unknown[]) => void {
  // GA4 expects its command queue to receive the function's Arguments object.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function gtag(..._command: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer ??= []).push(arguments);
  };
}

export interface AnalyticsDocument {
  getElementById(id: string): HTMLElement | null;
  createElement(tagName: 'script'): HTMLScriptElement;
  head: Pick<HTMLHeadElement, 'append'>;
}

export interface AnalyticsRuntime {
  document: AnalyticsDocument;
  dispatch(...command: unknown[]): void;
  hasConsent(): boolean;
  isProduction(): boolean;
  isDebugMode(): boolean;
}

export interface AnalyticsAdapter {
  trackPageView(pagePath: string, pageTitle: string, language: string): boolean;
  track(event: AnalyticsEvent | unknown): boolean;
  revoke(): void;
}

function hasActiveConfig(
  config: AnalyticsConfig,
): config is AnalyticsConfig & { enabled: true; measurementId: string } {
  return (
    config.enabled &&
    config.provider === 'ga4' &&
    config.consentRequired &&
    typeof config.measurementId === 'string'
  );
}

function appendTracker(
  measurementId: string,
  document: AnalyticsDocument,
): void {
  if (document.getElementById(GA4_TRACKER_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = GA4_TRACKER_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.async = true;
  document.head.append(script);
}

export function createAnalyticsAdapter(
  config: AnalyticsConfig,
  runtime: AnalyticsRuntime,
): AnalyticsAdapter {
  const activeConfig = hasActiveConfig(config) ? config : undefined;
  let configured = false;
  let gaConsentGranted = false;

  const canMeasure = () =>
    activeConfig !== undefined &&
    runtime.hasConsent() &&
    runtime.isProduction();

  const configure = () => {
    if (activeConfig === undefined) return;

    if (!configured) {
      runtime.dispatch('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }

    if (!gaConsentGranted) {
      runtime.dispatch('consent', 'update', {
        analytics_storage: 'granted',
      });
      gaConsentGranted = true;
    }

    if (!configured) {
      runtime.dispatch('js', new Date());
      runtime.dispatch('config', activeConfig.measurementId, {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
        anonymize_ip: true,
        send_page_view: false,
        ...(runtime.isDebugMode() ? { debug_mode: true } : {}),
      });
      appendTracker(activeConfig.measurementId, runtime.document);
      configured = true;
    }
  };

  return Object.freeze({
    trackPageView(
      pagePath: string,
      pageTitle: string,
      language: string,
    ): boolean {
      if (
        !canMeasure() ||
        !pagePath.startsWith('/') ||
        pagePath.includes('?') ||
        pagePath.includes('#')
      ) {
        return false;
      }

      try {
        configure();
        runtime.dispatch('event', 'page_view', {
          page_path: pagePath,
          page_location: `https://antoniomdm.dev${pagePath}`,
          page_title: pageTitle.slice(0, 200),
          language: language === 'en' ? 'en' : 'es',
        });
        return true;
      } catch {
        return false;
      }
    },

    track(event: AnalyticsEvent | unknown): boolean {
      if (!canMeasure()) return false;
      const sanitized = sanitizeAnalyticsEvent(event);
      if (sanitized === undefined) return false;

      try {
        configure();
        runtime.dispatch('event', sanitized.name, sanitized.params);
        return true;
      } catch {
        return false;
      }
    },

    revoke(): void {
      if (!configured || !gaConsentGranted) return;
      try {
        runtime.dispatch('consent', 'update', {
          analytics_storage: 'denied',
        });
      } catch {
        // A blocked tracker must never affect consent controls or navigation.
      }
      gaConsentGranted = false;
    },
  });
}
