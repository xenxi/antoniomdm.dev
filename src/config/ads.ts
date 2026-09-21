export const adsConfig = Object.freeze({
  enabled: import.meta.env.PUBLIC_ADS_ENABLED === 'true',
  clientId: import.meta.env.PUBLIC_ADS_CLIENT_ID?.trim() || undefined,
});

export function canRenderAds(config = adsConfig): boolean {
  return config.enabled && Boolean(config.clientId);
}
