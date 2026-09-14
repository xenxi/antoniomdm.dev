import { describe, expect, it } from 'vitest';
import { directionFromKey, findDirectionalTarget, pickEntry, type Box } from '../src/os/spatial-navigation';

const box = (x: number, y: number, width = 100, height = 100): Box => ({ x, y, width, height });
const grid = [box(0, 0), box(100, 0), box(200, 0), box(0, 100), box(100, 100), box(200, 100), box(0, 200), box(100, 200), box(200, 200)];

describe('Spatial navigation geometry', () => {
  it('maps arrow keys to directions and ignores other keys', () => {
    expect(directionFromKey('ArrowUp')).toBe('up');
    expect(directionFromKey('ArrowDown')).toBe('down');
    expect(directionFromKey('ArrowLeft')).toBe('left');
    expect(directionFromKey('ArrowRight')).toBe('right');
    expect(directionFromKey('Enter')).toBeNull();
    expect(directionFromKey('a')).toBeNull();
  });

  it('moves between grid cells along both axes from the centre', () => {
    const centre = grid[4];
    expect(findDirectionalTarget(centre, grid, 'right')).toBe(5);
    expect(findDirectionalTarget(centre, grid, 'left')).toBe(3);
    expect(findDirectionalTarget(centre, grid, 'up')).toBe(1);
    expect(findDirectionalTarget(centre, grid, 'down')).toBe(7);
  });

  it('prefers the nearest aligned neighbour over a diagonally closer one', () => {
    const origin = box(0, 0);
    const aligned = box(300, 0);
    const diagonal = box(40, 120);
    expect(findDirectionalTarget(origin, [diagonal, aligned], 'right')).toBe(1);
    expect(findDirectionalTarget(origin, [diagonal], 'down')).toBe(0);
  });

  it('never wraps to an element behind the origin or at the edge', () => {
    const centre = grid[4];
    expect(findDirectionalTarget(centre, [grid[3]], 'right')).toBe(-1);
    expect(findDirectionalTarget(centre, [grid[5]], 'left')).toBe(-1);
    expect(findDirectionalTarget(grid[8], grid, 'right')).toBe(-1);
    expect(findDirectionalTarget(grid[8], grid, 'down')).toBe(-1);
    expect(findDirectionalTarget(centre, [centre], 'right')).toBe(-1);
  });

  it('chooses a sane entry candidate when focus sits on a container', () => {
    expect(pickEntry(grid, 'down')).toBe(0);
    expect(pickEntry(grid, 'right')).toBe(0);
    expect(pickEntry(grid, 'up')).toBe(8);
    expect(pickEntry(grid, 'left')).toBe(8);
    expect(pickEntry([], 'down')).toBe(-1);
  });
});
