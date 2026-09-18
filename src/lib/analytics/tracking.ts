import type { AnalyticsLanguage, AnalyticsEvent } from './events';

export interface PageViewInput {
  pagePath: string;
  pageTitle: string;
  language: AnalyticsLanguage;
  viewEvent?: AnalyticsEvent;
}

export interface AnalyticsBridge {
  track(event: AnalyticsEvent): boolean;
  trackPageView(input: PageViewInput): boolean;
}

declare global {
  interface Window {
    __ANTONIOS_ANALYTICS__?: AnalyticsBridge;
  }
}

export function trackEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.__ANTONIOS_ANALYTICS__?.track(event) ?? false;
  } catch {
    return false;
  }
}

export function trackPageNavigation(input: PageViewInput): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.__ANTONIOS_ANALYTICS__?.trackPageView(input) ?? false;
  } catch {
    return false;
  }
}
