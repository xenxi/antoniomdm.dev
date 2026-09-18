export interface AnalyticsConfig {
  enabled: boolean;
  provider: 'ga4';
  measurementId?: string;
  consentRequired: true;
}

const GA4_MEASUREMENT_ID = /^G-[A-Z0-9]{10}$/;

export function createAnalyticsConfig(value?: string): AnalyticsConfig {
  const measurementId = value?.trim();

  if (!measurementId) {
    return Object.freeze({
      enabled: false,
      provider: 'ga4',
      consentRequired: true,
    });
  }

  if (!GA4_MEASUREMENT_ID.test(measurementId)) {
    throw new Error(
      'PUBLIC_GA_MEASUREMENT_ID must use the GA4 G-XXXXXXXXXX format',
    );
  }

  return Object.freeze({
    enabled: true,
    provider: 'ga4',
    measurementId,
    consentRequired: true,
  });
}

export const analyticsConfig = createAnalyticsConfig(
  import.meta.env.PUBLIC_GA_MEASUREMENT_ID,
);
