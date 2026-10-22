import { chapters, text } from './campaign';
import { insidePolygon, waterfrontBoundary, waterfrontSites, waterfrontDecor, waterfrontGardens, waterfrontProject, waterfrontTile } from './waterfront-layout';

export const townCopy = {
  title: text('Villa Trayectoria', 'Career Town'),
  intro: text('Una ciudad pequeña. Toda una trayectoria por descubrir.', 'A small town. A whole career to discover.'),
  explore: text('Explorar la ciudad', 'Explore the town'),
  outside: text('Volver a la ciudad', 'Return to town'),
  enter: text('Entrar en la empresa', 'Enter the company'),
  locked: text('Puerta cerrada · completa la etapa anterior y sus eventos.', 'Door locked · finish the previous chapter and its events.'),
  requirements: text('Consultar requisitos', 'View requirements'),
  hiring: text('Aún no te contratan', 'Not hired yet'),
  hiringBody: text('La puerta está cerrada. En esta partida, necesitas demostrar más habilidades antes de incorporarte al equipo. Completa los retos pendientes y vuelve con esa experiencia.', 'The door is locked. In this game, you need to demonstrate more skills before joining the team. Complete the outstanding challenges and return with that experience.'),
  nextStep: text('Tu siguiente paso', 'Your next step'),
  skillsNeeded: text('Habilidades por demostrar', 'Skills to demonstrate'),
  challenges: text('Retos de la etapa', 'Chapter challenges'),
  eventsNeeded: text('Conversaciones y eventos pendientes', 'Outstanding conversations and events'),
  repairNeeded: text('Reparar el pipeline pendiente', 'Repair the outstanding pipeline'),
  chaptersNeeded: text('Etapas pendientes antes de esta empresa', 'Chapters remaining before this company'),
  continueTraining: text('Continuar mi preparación', 'Continue my preparation'),
  earned: text('Demostrado', 'Demonstrated'),
  outstanding: text('Pendiente', 'Outstanding'),
  available: text('Puerta abierta', 'Door open'),
  hint: text('Camina hasta una puerta y pulsa E, o toca un edificio para acercarte. Empieza en AntoñiOS, el gran edificio frente a la plaza del globo.', 'Walk to a door and press E, or tap a building to approach it. Start at AntoñiOS, the large building facing the globe plaza.'),
  park: text('Parque del primer commit', 'First Commit Park'),
  garden: text('Jardín de las ideas', 'Garden of Ideas'),
  unlocked: text('Etapa completada. Vuelve a la ciudad: la siguiente puerta ya está abierta.', 'Chapter complete. Return to town: the next door is now open.'),
  route: text('Completa cada empresa para abrir la siguiente, siguiendo el CV.', 'Complete each company to open the next, following the CV.'),
  avatar: text('Pelo castaño corto y ondulado, barba y gafas.', 'Short wavy brown hair, a beard and glasses.'),
  destination: text('Destino', 'Destination'),
  district: text('EMPRESAS / PARQUES / HISTORIAS', 'COMPANIES / PARKS / STORIES'),
};
export const townSize = { width: 64, height: 64 };
export const townSpawn = { x: 34, y: 28 };
export const buildings = chapters.map(chapter => {
  const site = waterfrontSites.find(site => site.id === chapter.id)!;
  return { ...site, door: waterfrontTile(site.approach[0], site.approach[1]) };
});
const obstacles = [...waterfrontSites, ...waterfrontDecor].map(site => site.footprint).concat(waterfrontGardens);
export function townWalkable(x: number, y: number) {
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= 64 || y >= 64) return false;
  const [sx, sy] = waterfrontProject(x + .5, y + .5);
  // ES: Reserva espacio para los pies junto a muros y bordes de jardineras.
  // EN: Leave foot clearance along walls and planter edges.
  return [[0, 0], [-2, 0], [2, 0], [0, -2], [0, 2]].every(([dx, dy]) => insidePolygon(sx + dx, sy + dy, waterfrontBoundary) && !obstacles.some(polygon => insidePolygon(sx + dx, sy + dy, polygon)));
}
