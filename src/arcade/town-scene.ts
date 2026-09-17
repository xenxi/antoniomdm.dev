import { buildings, trees } from './town';

// Projection calibrated to the illustrated plate generated from the town blockout.
// Logical town coordinates stay unchanged, including existing saved positions.
export const townProjection = { ox: 180, oy: 17, tile: 9.6, axes: [9.6, 5.45, -9.4, 4.65] };
export const townProject = (x: number, y: number, height = 0) => [180 + x * 9.6 - y * 9.4, 17 + x * 5.45 + y * 4.65 - height];
export function buildingOutline(b: typeof buildings[number]) {
  const { x, y, width: w, height: d } = b;
  return [townProject(x, y, 29), townProject(x + w, y, 29), townProject(x + w, y), townProject(x + w, y + d), townProject(x, y + d), townProject(x, y + d, 29)];
}
export function townForeground() {
  return [
    ...buildings.map(b => ({ depth: b.x + b.y + b.width + b.height, polygon: buildingOutline(b) })),
    ...trees.map(t => {
      const [x, y] = townProject(t.x + 1, t.y + 1);
      return { depth: t.x + t.y + 2, polygon: Array.from({ length: 16 }, (_, i) => [x + Math.cos(i * Math.PI / 8) * 8.5, y - 9 + Math.sin(i * Math.PI / 8) * 11.5]) };
    }),
  ].sort((a, b) => a.depth - b.depth);
}
