const invader = [
  '..X.....X..',
  '...X...X...',
  '..XXXXXXX..',
  '.XX.XXX.XX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  'X.X.....X.X',
  '...XX.XX...',
];

export default function PixelInvader({ className = '' }: { className?: string }) {
  return <svg class={`pixel-invader ${className}`.trim()} viewBox="0 0 11 8" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    {invader.flatMap((row, y) => Array.from(row).map((cell, x) => cell === 'X' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null))}
  </svg>;
}
