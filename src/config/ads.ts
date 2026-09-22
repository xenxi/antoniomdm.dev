export interface AdsConfig {
  enabled: boolean;
  clientId?: string;
  articleSlotId?: string;
}

const ADSENSE_CLIENT_ID = /^ca-pub-\d{16}$/;
const ADSENSE_SLOT_ID = /^\d{10}$/;

export function createAdsConfig(values: {
  enabled?: string;
  clientId?: string;
  articleSlotId?: string;
}): AdsConfig {
  return Object.freeze({
    enabled: values.enabled === 'true',
    clientId: values.clientId?.trim() || undefined,
    articleSlotId: values.articleSlotId?.trim() || undefined,
  });
}

export function hasValidAdsClient(
  config: Pick<AdsConfig, 'clientId'>,
): config is { clientId: string } {
  return ADSENSE_CLIENT_ID.test(config.clientId ?? '');
}

export function canLoadAdSense(config: AdsConfig = adsConfig): boolean {
  return hasValidAdsClient(config);
}

export function canRenderAds(config: AdsConfig = adsConfig): boolean {
  return (
    config.enabled &&
    hasValidAdsClient(config) &&
    ADSENSE_SLOT_ID.test(config.articleSlotId ?? '')
  );
}

export const adsConfig = createAdsConfig({
  enabled: import.meta.env.PUBLIC_ADS_ENABLED,
  clientId: import.meta.env.PUBLIC_ADS_CLIENT_ID,
  articleSlotId: import.meta.env.PUBLIC_ADS_ARTICLE_SLOT_ID,
});
