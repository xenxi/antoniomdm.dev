import { waterfrontProjection, waterfrontProject, waterfrontSites, waterfrontDecor, waterfrontGardenArt, waterfrontGardens } from './waterfront-layout';
export const townProjection = waterfrontProjection;
export const townProject = (x: number, y: number, height = 0) => { const p = waterfrontProject(x, y); return [p[0], p[1] - height]; };
export const buildingOutline = (building: { outline: number[][] }) => building.outline;
export function frontEdgeAt(footprint: number[][], x: number) {
  const min = Math.min(...footprint.map(p => p[0])), max = Math.max(...footprint.map(p => p[0]));
  x = Math.max(min + .0001, Math.min(max - .0001, x));
  const crossings: number[] = [];
  for (let i = 0; i < footprint.length; i++) {
    const a = footprint[i], b = footprint[(i + 1) % footprint.length];
    if (a[0] === b[0] || x < Math.min(a[0], b[0]) || x > Math.max(a[0], b[0])) continue;
    crossings.push(a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
  }
  return Math.max(...crossings);
}
export function occlusionEdgeAt(footprint: number[][], x: number) {
  // ES: La figura debe quedar detrás del borde completo antes de ocultarse.
  // EN: Hide the figure only once it is behind the whole nearby ground edge.
  const radius = 10;
  const samples = [x - radius, x, x + radius, ...footprint.filter(p => Math.abs(p[0] - x) < radius).map(p => p[0])];
  return Math.min(...samples.map(sample => frontEdgeAt(footprint, sample)));
}
function clipAt(polygon: number[][], x: number, keepRight: boolean) {
  const result: number[][] = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i], b = polygon[(i + 1) % polygon.length];
    const insideA = keepRight ? a[0] >= x : a[0] <= x;
    const insideB = keepRight ? b[0] >= x : b[0] <= x;
    if (insideA) result.push(a);
    if (insideA !== insideB) result.push([x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])]);
  }
  return result;
}
export function townForeground(sliced = true) {
  const objects = [...waterfrontSites, ...waterfrontDecor].map(site => ({ id: site.id, polygon: site.outline, footprint: site.footprint }))
    .concat(waterfrontGardenArt.map((polygon, index) => ({ id: `garden-${index}`, polygon, footprint: waterfrontGardens[index] })));
  const layers = objects.map(object => ({ ...object, depth: (Math.max(...object.footprint.map(p => p[1])) + 100) / 4 }));
  if (!sliced) return layers;
  // ES: Cada franja se ordena en el borde del suelo situado debajo de ella.
  // EN: Each strip sorts at the ground edge directly beneath it.
  return layers.flatMap(layer => {
    const left = Math.floor(Math.min(...layer.polygon.map(p => p[0]))), right = Math.ceil(Math.max(...layer.polygon.map(p => p[0])));
    return Array.from({ length: Math.ceil((right - left) / 4) }, (_, i) => {
      const x = left + i * 4, end = Math.min(right, x + 4);
      return { ...layer, polygon: clipAt(clipAt(layer.polygon, x, true), end, false), depth: (occlusionEdgeAt(layer.footprint, (x + end) / 2) + 100) / 4 };
    }).filter(layer => layer.polygon.length >= 3);
  }).sort((a, b) => a.depth - b.depth);
}
