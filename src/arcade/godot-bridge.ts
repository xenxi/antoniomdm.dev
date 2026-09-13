import { isWalkable, nearby, objects, type ObjectId } from './engine';
import type { Chapter } from './campaign';
import { mapWalkable, type PixelMap } from './pixel-map';

export function readMapAction(value: unknown, state: { x: number; y: number; active: boolean; map: PixelMap }): { type: 'move'; x: number; y: number } | { type: 'interact'; id: string } | { type: 'pause' } | { type: 'map' } | null {
  if (!state.active || !value || typeof value !== 'object') return null;
  const action = value as Record<string, unknown>;
  if (action.type === 'map') return { type: 'map' };
  if (action.type === 'pause') return { type: 'pause' };
  if (action.type === 'move' && typeof action.x === 'number' && typeof action.y === 'number' && Math.abs(action.x - state.x) + Math.abs(action.y - state.y) === 1 && mapWalkable(state.map, action.x, action.y)) return { type: 'move', x: action.x, y: action.y };
  if (action.type === 'interact' && typeof action.id === 'string' && state.map.objects.some(object => object.id === action.id && Math.abs(object.x - state.x) + Math.abs(object.y - state.y) <= 1)) return { type: 'interact', id: action.id };
  return null;
}

export const bridgeChannel = 'antonios:godot:v1';
export const portal = { x: 9, y: 5 };
export type WorldAction = { type: 'move'; x: number; y: number } | { type: 'interact'; id: ObjectId } | { type: 'portal' } | { type: 'pause' };
export interface WorldPosition { x: number; y: number; scenario: Chapter['scenario']; active: boolean; portalEnabled: boolean }

// The web campaign owns progress. The renderer can request only adjacent, legal actions.
export function readWorldAction(value: unknown, state: WorldPosition): WorldAction | null {
  if (!state.active || !value || typeof value !== 'object') return null;
  const action = value as Record<string, unknown>;
  if (action.type === 'pause') return { type: 'pause' };
  if (action.type === 'move' && typeof action.x === 'number' && typeof action.y === 'number'
    && Math.abs(action.x - state.x) + Math.abs(action.y - state.y) === 1 && isWalkable(action.x, action.y, state.scenario)) {
    return { type: 'move', x: action.x, y: action.y };
  }
  if (action.type === 'interact' && objects.some(object => object.id === action.id) && nearby(state.x, state.y) === action.id) return { type: 'interact', id: action.id as ObjectId };
  if (action.type === 'portal' && state.portalEnabled && Math.abs(portal.x - state.x) + Math.abs(portal.y - state.y) <= 1) return { type: 'portal' };
  return null;
}

export function blockedTiles(scenario: Chapter['scenario']) {
  const blocked: { x: number; y: number }[] = [];
  for (let y = 0; y <= 10; y++) for (let x = 0; x <= 10; x++) if (!isWalkable(x, y, scenario)) blocked.push({ x, y });
  return blocked;
}
