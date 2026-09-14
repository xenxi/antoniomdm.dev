// Anchors measured on company-district.webp, in the renderer's 480 × 320 space.
// Door geometry is independent of the logical interaction tile and quest marker.
export const companyArt: Record<string, { color: string; logo?: string; sign: number[]; door: number[]; width: number; height: number }> = {
  freelance: { color: '#edb77b', sign: [158, 38], door: [171, 65], width: 6.5, height: 17 },
  xul: { color: '#f28b32', logo: 'xul', sign: [205, 59], door: [219, 92], width: 11, height: 17 },
  signlab: { color: '#cc369c', logo: 'signlab', sign: [255, 86], door: [269, 119], width: 11, height: 17 },
  'la-salle': { color: '#387cbb', logo: 'la-salle', sign: [306, 111], door: [322, 146], width: 10, height: 17 },
  'alcatel-lucent': { color: '#8052b9', logo: 'alcatel-lucent', sign: [357, 141], door: [374.5, 174], width: 11, height: 17 },
  nokia: { color: '#1761eb', logo: 'nokia', sign: [57, 89], door: [72, 122], width: 11, height: 17 },
  'vector-itc': { color: '#d0477a', logo: 'vector-itc', sign: [106, 116], door: [120, 149], width: 11, height: 17 },
  anexia: { color: '#ff790d', logo: 'anexia', sign: [155, 143], door: [168, 176], width: 11, height: 17 },
  'domingo-alonso': { color: '#1257e8', logo: 'domingo-alonso', sign: [202, 170], door: [215, 202], width: 11, height: 17 },
  'system-recovery': { color: '#edb451', sign: [247, 194], door: [262.5, 229], width: 12, height: 18 },
};
export const companyLogo = (id: string) => companyArt[id]?.logo ? `/images/job-route/brands/${companyArt[id].logo}.png` : undefined;
