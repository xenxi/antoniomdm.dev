// ES: Geometría medida sobre waterfront-city.webp (1536 × 1024).
// EN: Geometry measured on waterfront-city.webp (1536 × 1024).
export const waterfrontProjection = { ox: 240, oy: -100, tile: 8, axes: [8, 4, -8, 4] };
export const waterfrontProject = (x: number, y: number) => [240 + (x - y) * 8, -100 + (x + y) * 4];
export const waterfrontTile = (x: number, y: number) => ({ x: Math.floor((x - 240) / 16 + (y + 100) / 8), y: Math.floor((y + 100) / 8 - (x - 240) / 16) });
const points = (values: number[][]) => values.map(p => p.map(n => n / 3.2));
export const waterfrontBoundary = points([[0,190],[315,70],[615,85],[826,180],[1330,200],[1536,150],[1536,785],[1410,830],[1250,970],[1110,1020],[820,950],[605,840],[485,855],[0,647]]);
export interface WaterfrontSite { id: string; name: string; outline: number[][]; footprint: number[][]; approach: number[]; sign: number[]; signWidth: number; slope: number; color: string; }
const site = (id: string, name: string, outline: number[][], footprint: number[][], approach: number[], sign: number[], signWidth: number, slope: number, color: string): WaterfrontSite => ({ id, name, outline: points(outline), footprint: points(footprint), approach: approach.map(n => n / 3.2), sign: sign.map(n => n / 3.2), signWidth: signWidth / 3.2, slope, color });
export const waterfrontSites: WaterfrontSite[] = [
  site('freelance', 'AntoñiOS', [[719,152],[884,58],[1221,153],[1330,168],[1330,411],[1110,512],[719,321]], [[719,321],[933,232],[1330,411],[1110,512]], [932,474], [869,197], 213, .46, '#66ddff'),
  site('xul', 'XUL', [[307,0],[382,0],[445,29],[445,102],[392,137],[307,96]], [[307,96],[358,74],[445,102],[392,137]], [372,159], [327,49], 43, .4, '#43cced'),
  site('signlab', 'Signlab', [[520,23],[615,22],[626,46],[626,119],[526,142],[518,64]], [[520,119],[575,110],[626,119],[526,142]], [573,158], [538,55], 67, 0, '#f17797'),
  site('la-salle', 'La Salle', [[674,0],[747,19],[759,49],[755,130],[696,159],[674,115]], [[674,115],[720,98],[755,130],[696,159]], [704,181], [686,49], 52, .3, '#8ce28b'),
  site('alcatel-lucent', 'Alcatel-Lucent', [[754,39],[817,61],[823,137],[788,167],[754,147]], [[754,147],[787,133],[823,137],[788,167]], [792,185], [763,77], 49, .35, '#c99aff'),
  site('nokia', 'NOKIA', [[80,195],[178,145],[281,184],[281,308],[190,366],[80,307]], [[80,307],[179,260],[281,308],[190,366]], [146,367], [120,240], 86, .43, '#8ebaff'),
  site('vector-itc', 'Vector', [[341,225],[480,168],[630,219],[631,400],[496,451],[341,371]], [[341,371],[480,312],[631,400],[496,451]], [397,430], [388,282], 99, .44, '#e35f93'),
  site('anexia', 'Anexia', [[1343,153],[1464,109],[1536,143],[1536,249],[1420,294],[1343,258]], [[1343,258],[1464,207],[1536,249],[1420,294]], [1390,310], [1370,190], 44, .4, '#ffaa62'),
  site('domingo-alonso', 'Domingo Alonso', [[29,449],[248,344],[410,409],[410,558],[190,659],[29,579]], [[29,579],[248,474],[410,558],[190,659]], [270,648], [205,552], 107, -.45, '#81b4ff'),
  site('system-recovery', 'System Recovery', [[1224,510],[1365,460],[1500,512],[1500,654],[1370,719],[1224,645]], [[1224,645],[1365,590],[1500,654],[1370,719]], [1305,700], [1294,556], 94, .43, '#d3efff'),
];
export const waterfrontDecor = [
  site('ai-lab', 'AI LAB', [[990,637],[1145,576],[1296,634],[1296,760],[1147,829],[990,754]], [[990,754],[1145,695],[1296,760],[1147,829]], [1060,809], [1164,743], 108, -.44, '#d39aff'),
  site('pizza', 'Pikoseta', [[1328,338],[1417,283],[1536,340],[1536,510],[1438,540],[1328,471]], [[1328,471],[1420,411],[1536,469],[1438,540]], [1437,537], [1360,381], 128, .42, '#ffbf73'),
];
export const waterfrontGardens = [
  points([[612,458],[758,405],[845,466],[845,491],[749,544],[612,500]]),
  points([[814,536],[903,480],[1018,562],[955,630],[848,588]]),
  points([[405,676],[529,600],[568,613],[601,660],[523,720],[432,709]]),
  points([[541,729],[643,671],[725,654],[828,695],[885,742],[782,816],[673,829],[538,758]]),
  points([[886,801],[1039,837],[1128,898],[1128,943],[894,863]]),
];
// Art silhouettes include raised foliage and the fountain globe for occlusion.
// Las siluetas incluyen vegetación elevada y el globo para las oclusiones.
export const waterfrontGardenArt = [
  points([[615,400],[718,369],[813,400],[845,466],[845,491],[749,544],[612,500]]),
  points([[814,536],[862,495],[907,497],[958,523],[1018,562],[955,630],[848,588]]),
  points([[405,661],[443,599],[539,574],[568,613],[601,660],[523,720],[432,709]]),
  points([[538,758],[541,729],[643,671],[679,611],[715,591],[756,602],[773,633],[768,672],[828,695],[885,742],[782,816],[673,829]]),
  points([[886,801],[948,770],[1093,833],[1128,898],[1128,943],[894,863]]),
];
export function insidePolygon(x: number, y: number, polygon: number[][]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [ax, ay] = polygon[i], [bx, by] = polygon[j];
    if (Math.abs((x - ax) * (by - ay) - (y - ay) * (bx - ax)) < .00001 && x >= Math.min(ax, bx) && x <= Math.max(ax, bx) && y >= Math.min(ay, by) && y <= Math.max(ay, by)) return true;
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside;
  }
  return inside;
}
export const waterfrontFountains = [[207,225,13],[240,228,12]];
export const waterfrontStops = [[290,151],[208,178],[144,150],[86,207],[137,222],[193,254],[255,281],[302,230],[424,225],[470,231],[111,51],[178,51],[207,70],[38,120]].map(([x,y]) => waterfrontTile(x,y));

