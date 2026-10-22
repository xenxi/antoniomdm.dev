import { waterfrontSites } from './waterfront-layout';
// ES: Anclas del nuevo paseo marítimo. EN: Anchors for the new waterfront.
export const companyArt: Record<string, { color: string; logo?: string; sign: number[]; door: number[]; width: number; height: number }> = Object.fromEntries(waterfrontSites.map(site => [site.id, {
  color: site.color, sign: site.sign, door: [site.approach[0], site.approach[1] - 5], width: 8, height: 14,
}]));
export const companyLogo = (id: string) => companyArt[id]?.logo ? `/images/job-route/brands/${companyArt[id].logo}.png` : undefined;
