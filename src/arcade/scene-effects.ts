import { buildings } from './town';
import { companyArt } from './company-art';

// Coordinates are in the 480 × 320 artwork space, independent of camera zoom.
export interface SceneEffects { fountains: number[][]; lights: [number, number, number, number, string?][]; fans: number[][]; steam: number[][]; screens: number[][] }
export function sceneEffects(town: boolean): SceneEffects {
  return town ? {
    fountains: [[284, 167, 13], [301, 176, 12], [314, 184, 9]],
    lights: buildings.filter(b => b.id !== 'freelance').map(b => {
      const a = companyArt[b.id].sign;
      return [a[0], a[1] + 7.7, a[0] + 28, a[1] + 21.7, companyArt[b.id].color];
    }),
    fans: [],
    steam: [], screens: [],
  } : {
    fountains: [], fans: [],
    lights: [[300, 7, 414, 50], [299, 136, 371, 167], [443, 205, 443, 234], [130, 269, 130, 287]],
    steam: [[340, 213]], screens: [[159, 169], [180, 162], [330, 112], [387, 126]],
  };
}
