import type { Locale } from '../i18n/core';
import type { PixelMap } from './pixel-map';
import { insidePolygon } from './waterfront-layout';
import { sceneImage } from './scene-art';

export const flatAsset = '/images/job-route/student-flat-doors.webp';
export const residentsAsset = '/images/job-route/student-residents.webp';
export const residentLines = {
  cape: {es:'La capa no se lava con los calzoncillos. Y el fuet es mi plan de emergencia para cualquier deadline.',en:'The cape does not go in the wash with my boxers. And fuet is my emergency plan for every deadline.'},
  hairy: {es:'Me está subiendo la bilirrubina… ¡necesito soltar los nervios bailando! Luego vuelvo a estudiar.',en:'My bilirubin is rising… I need to dance these nerves away! Then I can get back to studying.'},
};
export const flatSpawn = { x: 39, y: 43 };
const pts = (p: number[][]) => p.map(v => v.map(n => n / 3.2));
const rect = (x: number, y: number, w: number, h: number) => pts([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
export const flatBoundary = pts([[431,35],[1120,35],[1233,450],[1291,450],[1460,857],[1340,871],[855,834],[842,884],[662,884],[659,802],[222,784],[60,693],[140,455],[277,446],[350,231]]);
// ES: Muros, camas y muebles medidos sobre el arte. Los huecos son puertas.
// EN: Walls, beds and furniture measured against the art. Gaps are doorways.
export const flatObstacles = [
  rect(672,30,24,155), rect(636,225,42,169), rect(610,420,46,90),
  rect(816,30,34,155), rect(828,225,41,169), rect(844,420,40,90),
  rect(352,224,306,22), rect(854,223,341,23), rect(276,442,359,22), rect(876,442,371,22),
  rect(1277,454,18,130), rect(1297,674,24,155),
  rect(465,70,177,113), rect(378,164,141,60), rect(887,72,182,42), rect(943,145,116,75),
  rect(362,330,104,90), rect(458,274,175,121), rect(908,263,96,49), rect(982,350,97,66), rect(1084,311,99,80),
  rect(267,455,337,160), rect(312,635,218,131), rect(147,512,91,115),
  pts([[882,621],[988,573],[1062,622],[960,730],[872,690]]), rect(1054,696,126,49), rect(1078,536,162,105),
  rect(1175,498,75,56), rect(1316,593,72,110),
  rect(706,30,127,148), rect(1107,68,71,137),
];
// ES: Un único umbral por dormitorio; cocina y salón tienen pasos abiertos.
// EN: Exactly one threshold per bedroom; kitchen and living room have open passages.
export const flatDoors = [
  {id:'bedroom-player', hinge:[213,58], side:-1, threshold:[207,58,12,12]},
  {id:'bedroom-music', hinge:[260,58], side:1, threshold:[254,58,14,12]},
  {id:'bedroom-cyclist', hinge:[203,122], side:-1, threshold:[197,122,15,10]},
  {id:'bedroom-medicine', hinge:[265,122], side:1, threshold:[258,122,16,10]},
];
export const flatObjects = [
  { id:'terminal', label:{es:'Puesto de trabajo · tu habitación',en:'Workstation · your bedroom'}, point:[191,65], hit:[147,31,55,26] },
  { id:'review', label:{es:'Panel de revisión',en:'Review board'}, point:[190,66], hit:[194,37,15,18] },
  { id:'team', label:{es:'Compañero músico',en:'Musician flatmate'}, point:[280,65], hit:[268,37,26,23] },
  { id:'sink', label:{es:'Fuga de agua',en:'Water leak'}, point:[110,195], hit:[110,157,27,33] },
  { id:'washer', label:{es:'Lavadora de espuma',en:'Foam washer'}, point:[78,204], hit:[48,155,27,37] },
  { id:'router', label:{es:'Router y gato',en:'Router and cat'}, point:[376,209], hit:[347,173,31,28] },
  { id:'coffee', label:{es:'Cocina / café',en:'Kitchen / coffee'}, point:[182,196], hit:[172,153,17,39] },
  { id:'portal', label:{es:'Volver a la ciudad',en:'Return to town'}, point:[237,267], hit:[219,242,40,30] },
  { id:'cape', label:{es:'Compañero de la capa y el fuet',en:'Cape and fuet flatmate'}, point:[371,246], hit:[349,216,35,31] },
  { id:'hairy', label:{es:'Compañero ciclista · bilirrubina',en:'Cyclist flatmate · bilirubin'}, point:[183,133], hit:[171,110,25,21] },
];
export const flatResidentPoints = [[280,65],[371,246],[183,133]];
export const flatLabels = [
  {point:[165,72],es:'TU HABITACIÓN',en:'YOUR ROOM'}, {point:[298,72],es:'MÚSICA',en:'MUSIC'},
  {point:[145,140],es:'BICICLETAS',en:'BICYCLES'}, {point:[316,140],es:'MEDICINA',en:'MEDICINE'},
  {point:[126,240],es:'COCINA',en:'KITCHEN'}, {point:[361,260],es:'SALÓN',en:'LIVING ROOM'},
  {point:[241,22],es:'BAÑO',en:'BATHROOM'}, {point:[432,246],es:'BALCÓN',en:'BALCONY'},
];
export function flatWalkable(x: number, y: number) {
  if (!Number.isInteger(x) || !Number.isInteger(y) || x<0 || y<0 || x>=80 || y>=54) return false;
  const sx=(x+.5)*6, sy=(y+.5)*6;
  return [[0,0],[-2,0],[2,0],[0,-2],[0,2]].every(([dx,dy])=>insidePolygon(sx+dx,sy+dy,flatBoundary)&&!flatObstacles.some(p=>insidePolygon(sx+dx,sy+dy,p)));
}
export function makeStudentFlat(locale: Locale, company: string, resolved: string[], mission: number): PixelMap {
  const map: PixelMap = {id:'freelance',width:80,height:54,tile:6,ox:0,oy:0,axes:[6,0,0,6],projection:'isometric',screenDepth:true,spawn:flatSpawn,art:flatAsset,sprite:'/images/job-route/antonio-green-walk.webp',spriteScale:.58,locale,company,scene:{resolved,mission},rects:[],labels:[],blocked:[],objects:[],residents:flatResidentPoints,doors:flatDoors};
  for(let y=0;y<54;y++)for(let x=0;x<80;x++)if(!flatWalkable(x,y))map.blocked.push({x,y});
  map.objects=flatObjects.map(o=>({id:o.id,x:Math.floor(o.point[0]/6),y:Math.floor(o.point[1]/6),label:o.label[locale],hit:o.hit as [number,number,number,number],marker:[o.hit[0]+o.hit[2]/2,o.hit[1]-3]}));
  map.effects={fountains:[],fans:[],lights:[],screens:[[175,40]],steam:[[183,165]]};
  map.ambience={notes:resolved.includes('noise')?[]:[[280,34]],puddles:resolved.includes('leak')?[]:[[119,190]]};
  return map;
}
export function flatForeground() {
  // The cutaway plate needs no opaque furniture copies above actors.
  // El fondo seccionado no necesita copias opacas de muebles sobre los actores.
  return [] as {id:string;footprint:number[][];polygon:number[][]}[];
}
export function paintStudentFlat(map: PixelMap) {
  const plate=sceneImage(flatAsset)!;
  const background=document.createElement('canvas');background.width=1536;background.height=1024;
  const ctx=background.getContext('2d')!;ctx.scale(3.2,3.2);ctx.drawImage(plate,0,0,480,320);
  ctx.font='bold 3.3px monospace';ctx.textAlign='center';
  for(const label of flatLabels){const value=label[map.locale==='en'?'en':'es'];const width=ctx.measureText(value).width+5;ctx.fillStyle='#0a1726dd';ctx.fillRect(label.point[0]-width/2,label.point[1]-4,width,6);ctx.fillStyle='#f8ddb2';ctx.fillText(value,label.point[0],label.point[1]);}
  return {background,entities:[],detailed:true};
}
