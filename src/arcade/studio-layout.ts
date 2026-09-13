// Logical coordinates remain independent of the high-resolution artwork.
// The floor polygon follows the open corridor in neon-office.webp (480 × 320 space).
export const studioProject = (x: number, y: number) => ({ x: 288 + (x - y) * 16, y: 84 + (x + y) * 8 });
export const studioFloor = [[206, 118], [277, 92], [284, 128], [351, 157], [301, 181], [305, 206], [343, 237], [393, 262], [316, 301], [281, 277], [277, 247], [263, 224], [220, 202], [217, 170], [188, 153]];
export function inPolygon(x: number, y: number, polygon: number[][]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [ax, ay] = polygon[i], [bx, by] = polygon[j];
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside;
  }
  return inside;
}
export const studioObjects = [
  { id: 'terminal', x: 3, y: 8, hit: [132, 146, 84, 57] },
  { id: 'team', x: 5, y: 2, hit: [287, 86, 112, 65] },
  { id: 'coffee', x: 9, y: 6, hit: [348, 156, 44, 85] },
  { id: 'portal', x: 0, y: 1, hit: [257, 43, 26, 51] },
  { id: 'secret', x: 0, y: 3, hit: [229, 47, 24, 39] },
] as const;
export function studioWalkable(x: number, y: number) {
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x > 10 || y > 10 || studioObjects.some(o => o.x === x && o.y === y)) return false;
  const p = studioProject(x + .5, y + .5);
  return inPolygon(p.x, p.y, studioFloor);
}
