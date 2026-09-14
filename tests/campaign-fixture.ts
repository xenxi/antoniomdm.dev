import { newSnake, stepSnake } from '../src/arcade/snake';
import { updateProgress, type GameState } from '../src/arcade/engine';

export const snakeRoute: [number, number, number][] = [[1, 0, 3], [0, -1, 3], [-1, 0, 4], [0, 1, 5]];
export function finishSnake(state: GameState) {
  let snake = newSnake();
  for (const [dx, dy, count] of snakeRoute) for (let i = 0; i < count; i++) snake = stepSnake(snake, dx, dy);
  return updateProgress(state, { snake });
}
