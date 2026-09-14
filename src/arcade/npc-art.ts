import type { Furnishing } from './company-scenes';

export function npcAsset(item: Furnishing, chapter: string): string | undefined {
  const role = item.kind === 'person' ? (chapter === 'domingo-alonso' ? 'family' : 'engineer') : ['doctor', 'musician', 'dancer', 'child'].includes(item.kind) ? item.kind : undefined;
  return role ? `/images/job-route/npc-${role}.webp` : undefined;
}

const illustratedFurniture = new Set(['desk', 'table', 'sofa', 'bed', 'plant', 'rack', 'board', 'coffee', 'washer', 'sink', 'router', 'phone-blue', 'phone-green', 'skeleton', 'bookcase', 'lamp']);
export function furnitureAsset(item: Furnishing): string | undefined {
  return illustratedFurniture.has(item.kind) ? `/images/job-route/furniture-${item.kind}.webp` : undefined;
}
