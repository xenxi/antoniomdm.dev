import type { Locale } from '../i18n/core';
import { mapPath, mapProject, type CompanySign, type PixelMap } from './pixel-map';
import { buildings, townCopy } from './town';
import { text } from './campaign';
import { useEffect, useState } from 'preact/hooks';

export const hudCopy = {
  objective: text('OBJETIVO ACTUAL', 'CURRENT OBJECTIVE'),
  level: text('NV.', 'LV.'),
  progress: text('ETAPAS', 'CHAPTERS'),
  map: text('MAPA DE LA CIUDAD', 'CITY MAP'),
  floor: text('MAPA DE LA OFICINA', 'OFFICE MAP'),
  floorRoute: text('Plano de la oficina y ruta al puesto de trabajo', 'Office floor plan and route to the workstation'),
  route: text('Ruta hacia la siguiente empresa disponible', 'Route to the next available company'),
  explore: text('Acércate a la entrada', 'Approach the entrance'),
  interact: text('Hablar / interactuar', 'Talk / interact'),
  menu: text('Menú', 'Menu'),
  mapKey: text('Mapa', 'Map'),
  journal: text('Diario de viaje', 'Travel journal'),
  tagline: text('Distintas empresas. Una historia que construir.', 'Different companies. One story to build.'),
  edition: text('UNA AVENTURA DE ANTOÑIOS', 'AN ANTOÑIOS ADVENTURE'),
  tasks: text('MISIÓN', 'MISSION'),
  inventory: text('Inventario', 'Inventory'),
  jobs: text('Trabajos', 'Jobs'),
  options: text('Pausa', 'Pause'),
  motto: text('TRABAJO HOY.\nUN FUTURO MAÑANA.', 'WORK TODAY.\nA FUTURE TOMORROW.'),
  floorNumber: text('PLANTA 01', 'FLOOR 01'),
};

export default function GameHud({ locale, map, signs, x, y, inside, currentId, mission, completed, missionProgress = 0, missionTotal = 1, onAction }: { locale: Locale; map: PixelMap; signs: CompanySign[]; x: number; y: number; inside: boolean; currentId: string; mission?: string; completed: number; missionProgress?: number; missionTotal?: number; onAction?: (action: string) => void }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 60000); return () => clearInterval(timer); }, []);
  const target = signs.find(sign => sign.id === (inside ? currentId : signs.find(sign => !sign.complete && sign.unlocked)?.id)) ?? signs.at(-1)!;
  const building = buildings.find(b => b.id === target.id)!;
  const position = { x, y };
  const destination = inside ? map.objects.find(o => o.id === 'terminal')! : building.door;
  const path = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dx, dy]) => mapPath(map, position, { x: destination.x + dx, y: destination.y + dy })).filter(route => route.length).sort((a, b) => a.length - b.length)[0] ?? [];
  const mini = (p: { x: number; y: number }) => inside ? { x: p.x * 16 + 8, y: p.y * 16 + 8 } : mapProject(map, p.x + .5, p.y + .5);
  const miniPosition = mini(position), miniDestination = mini(destination);
  return <div class="job-hud">
    <div class="job-player-card"><img src="/images/job-route/antonio-portrait.webp" width="80" height="80" alt="" /><div><div class="job-player-name"><strong>ANTONIO</strong><small>{hudCopy.level[locale]} {Math.min(completed + 1, 10)}</small></div><label>{hudCopy.progress[locale]} <span>{completed} / 10</span><progress value={completed} max={10} /></label>{inside && <label class="job-mission-meter">{hudCopy.tasks[locale]} <span>{missionProgress} / {missionTotal}</span><progress value={missionProgress} max={missionTotal} /></label>}<small class="job-player-subtitle">{townCopy.title[locale]}</small></div></div>
    <div class="job-objective"><span class="job-quest-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M17 12V7h14v5M5 14h38v27H5zM5 23l19 5 19-5M21 25v7h6v-7" fill="none" stroke="currentColor" stroke-width="3" /></svg></span><div><p>{hudCopy.objective[locale]}</p><strong>{inside ? mission ?? townCopy.unlocked[locale] : target.name}</strong><small>{inside ? target.name : hudCopy.explore[locale]} <kbd>E</kbd></small></div></div>
    <div class="job-clock"><time dateTime={now.toISOString()}>{new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(now)} <span aria-hidden="true">☼</span></time><p>{hudCopy.motto[locale]}</p></div>
    <figure class="job-minimap"><figcaption>{(inside ? hudCopy.floor : hudCopy.map)[locale]}</figcaption><svg viewBox={inside ? `0 0 ${map.width * 16} ${map.height * 16}` : '0 0 480 320'} role="img" aria-label={(inside ? hudCopy.floorRoute : hudCopy.route)[locale]}><rect width={map.width * 16} height={map.height * 16} fill="#111d34" />{!inside && map.art && <image href={map.art} width="480" height="320" opacity=".65" />}{inside && map.blocked.map(p => <rect key={`${p.x},${p.y}`} x={p.x * 16} y={p.y * 16} width="16" height="16" fill="#30475f" />)}{inside && map.objects.map(o => <rect key={o.id} x={o.x * 16 + 3} y={o.y * 16 + 3} width="10" height="10" fill="#75b4bb" />)}<polyline points={[position, ...path].map(p => { const point = mini(p); return `${point.x},${point.y}`; }).join(' ')} fill="none" stroke="#f0cf90" stroke-width="6" stroke-dasharray="2 13" stroke-linecap="round" /><circle cx={miniDestination.x} cy={miniDestination.y} r="13" fill="#e489cb" stroke="#191c38" stroke-width="5" /><circle cx={miniPosition.x} cy={miniPosition.y} r="10" fill="#91eee0" stroke="#102033" stroke-width="4" /></svg><small>{inside ? target.name : townCopy.title[locale]}</small></figure>
    <nav class="job-shortcuts" aria-label={hudCopy.menu[locale]}>{[['M', 'mapKey'], ['I', 'inventory'], ['J', 'jobs'], ['O', 'options']].map(([key, label]) => <button key={key} onClick={() => onAction?.(key)}><kbd>{key}</kbd>{hudCopy[label as keyof typeof hudCopy][locale]}</button>)}</nav>
  </div>;
}
