export const ANALYTICS_CONSENT_STORAGE_KEY = 'antonios-analytics-consent';

export type AnalyticsConsent = 'granted' | 'denied';

export interface ConsentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function getStoredAnalyticsConsent(
  storage?: ConsentStorage,
): AnalyticsConsent | undefined {
  try {
    const consent = storage?.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return consent === 'granted' || consent === 'denied' ? consent : undefined;
  } catch {
    return undefined;
  }
}

export function setAnalyticsConsent(
  consent: AnalyticsConsent,
  storage?: ConsentStorage,
): AnalyticsConsent {
  try {
    storage?.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // If storage is unavailable, the next page load safely asks again.
  }

  return consent;
}
