import { buildings } from './town';
import { townProject } from './town-scene';

// Coordinates are in the 480 × 320 artwork space, independent of camera zoom.
export function sceneEffects(town: boolean) {
  return town ? {
    fountains: [[284, 167, 13], [301, 176, 12], [314, 184, 9]],
    lights: buildings.map(b => {
      const a = townProject(b.x + .4, b.y + b.height, 17);
      return [...a, a[0] + 29, a[1] + 14.5];
    }),
    fans: [[177, 28], [225, 47], [277, 74], [325, 102], [372, 130], [78, 83], [125, 110], [174, 140], [224, 167], [273, 194]],
    steam: [], screens: [],
  } : {
    fountains: [], fans: [],
    lights: [[300, 7, 414, 50], [299, 136, 371, 167], [443, 205, 443, 234], [130, 269, 130, 287]],
    steam: [[340, 213]], screens: [[159, 169], [180, 162], [330, 112], [387, 126]],
  };
}
