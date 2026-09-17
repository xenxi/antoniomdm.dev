export interface Cell { x: number; y: number }
export interface SnakeState { body: Cell[]; score: number; failed: boolean }
export const packets: Cell[] = [{ x: 5, y: 4 }, { x: 5, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 6 }];
export const newSnake = (): SnakeState => ({ body: [{ x: 2, y: 4 }, { x: 1, y: 4 }, { x: 0, y: 4 }], score: 0, failed: false });
export function stepSnake(state: SnakeState, dx: number, dy: number): SnakeState {
  if (state.failed || state.score === packets.length || Math.abs(dx) + Math.abs(dy) !== 1) return state;
  const head = { x: state.body[0].x + dx, y: state.body[0].y + dy };
  const eating = head.x === packets[state.score].x && head.y === packets[state.score].y;
  const body = eating ? state.body : state.body.slice(0, -1);
  if (head.x < 0 || head.y < 0 || head.x > 7 || head.y > 7 || body.some(p => p.x === head.x && p.y === head.y)) return { ...state, failed: true };
  return { body: [head, ...body], score: state.score + Number(eating), failed: false };
}
export function validSnake(value: unknown): value is SnakeState {
  if (!value || typeof value !== 'object') return false;
  const s = value as SnakeState;
  return Number.isInteger(s.score) && s.score >= 0 && s.score <= 4 && typeof s.failed === 'boolean' && Array.isArray(s.body) && s.body.length === s.score + 3 && s.body.every((p, i) => p && Number.isInteger(p.x) && Number.isInteger(p.y) && p.x >= 0 && p.y >= 0 && p.x < 8 && p.y < 8 && !s.body.slice(0, i).some(q => q.x === p.x && q.y === p.y) && (i === 0 || Math.abs(p.x - s.body[i - 1].x) + Math.abs(p.y - s.body[i - 1].y) === 1));
}
