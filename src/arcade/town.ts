import { chapters, text } from './campaign';

export const townCopy = {
  title: text('Villa Trayectoria', 'Career Town'),
  intro: text('Una ciudad pequeña. Toda una trayectoria por descubrir.', 'A small town. A whole career to discover.'),
  explore: text('Explorar la ciudad', 'Explore the town'),
  outside: text('Volver a la ciudad', 'Return to town'),
  enter: text('Entrar en la empresa', 'Enter the company'),
  locked: text('Puerta cerrada · completa la etapa anterior y sus eventos.', 'Door locked · finish the previous chapter and its events.'),
  available: text('Puerta abierta', 'Door open'),
  hint: text('Camina hasta una puerta y pulsa E, o toca un edificio para acercarte. Empieza por el estudio freelance, al noroeste.', 'Walk to a door and press E, or tap a building to approach it. Start at the freelance studio in the northwest.'),
  park: text('Parque del primer commit', 'First Commit Park'),
  garden: text('Jardín de las ideas', 'Garden of Ideas'),
  unlocked: text('Etapa completada. Vuelve a la ciudad: la siguiente puerta ya está abierta.', 'Chapter complete. Return to town: the next door is now open.'),
  route: text('Completa cada empresa para abrir la siguiente, siguiendo el CV.', 'Complete each company to open the next, following the CV.'),
  avatar: text('Pelo castaño corto y ondulado, barba y gafas.', 'Short wavy brown hair, a beard and glasses.'),
  destination: text('Destino', 'Destination'),
  district: text('EMPRESAS / PARQUES / HISTORIAS', 'COMPANIES / PARKS / STORIES'),
};
export const townSize = { width: 30, height: 20 };
export const townSpawn = { x: 4, y: 6 };
export const buildings = chapters.map((chapter, index) => {
  const x = 2 + (index % 5) * 5;
  const y = index < 5 ? 2 : 13;
  return { id: chapter.id, x, y, width: 4, height: 3, door: { x: x + 2, y: y + 3 } };
});
export const pond = { x: 18, y: 8, width: 5, height: 3 };
export const trees = [
  ...Array.from({ length: 15 }, (_, i) => ({ x: i * 2, y: 0 })),
  ...Array.from({ length: 15 }, (_, i) => ({ x: i * 2, y: 18 })),
  ...[0, 28].flatMap(x => [2, 4, 6, 8, 10, 12, 14, 16].map(y => ({ x, y }))),
  ...[3, 6, 10, 24, 26].map(x => ({ x, y: 8 })),
];
export function townWalkable(x: number, y: number) {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 1 && x <= 28 && y >= 1 && y <= 18
    && !buildings.some(b => x >= b.x && x < b.x + b.width && y >= b.y && y < b.y + b.height)
    && !(x >= pond.x && x < pond.x + pond.width && y >= pond.y && y < pond.y + pond.height)
    && !trees.some(t => x >= t.x && x < t.x + 2 && y >= t.y && y < t.y + 2);
}
