import { describe, expect, it } from 'vitest';
import { flatSpawn, flatWalkable, flatObjects, flatLabels, flatDoors, flatForeground, flatBoundary, flatObstacles, makeStudentFlat } from '../src/arcade/student-flat';
import { insidePolygon } from '../src/arcade/waterfront-layout';
import { mapPath } from '../src/arcade/pixel-map';
import { newGame, parseSave, updateProgress } from '../src/arcade/engine';

describe('Four-student apartment', () => {
  it('connects all clear floor and every encounter through open doorways', () => {
    const map = makeStudentFlat('es', 'freelance', [], 0);
    const pending = [flatSpawn], reached = new Set([`${flatSpawn.x},${flatSpawn.y}`]);
    for (let i=0;i<pending.length;i++) for(const [dx,dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const p={x:pending[i].x+dx,y:pending[i].y+dy}, key=`${p.x},${p.y}`;
      if(flatWalkable(p.x,p.y)&&!reached.has(key)){reached.add(key);pending.push(p);}
    }
    const unreachable=[];
    for(let y=0;y<54;y++)for(let x=0;x<80;x++)if(flatWalkable(x,y)&&!reached.has(`${x},${y}`))unreachable.push([x,y]);
    expect(unreachable).toEqual([]);
    for(const o of map.objects)expect([[0,1],[1,0],[0,-1],[-1,0]].some(([dx,dy])=>mapPath(map,flatSpawn,{x:o.x+dx,y:o.y+dy}).length>0), o.id).toBe(true);
    expect(map.residents).toHaveLength(3);
    for(const text of [...flatObjects.map(o=>o.label),...flatLabels])expect(text).toMatchObject({es:expect.any(String),en:expect.any(String)});
  });
  it('moves old apartment saves to the entrance while preserving earned progress', () => {
    const current=updateProgress(newGame(),{mission:1,energy:70,side:['cat']});
    const old={...current,flatLayout:undefined,chapters:{freelance:{...current.chapters.freelance,x:4,y:7}}};
    expect(parseSave(JSON.stringify(old))?.chapters.freelance).toMatchObject({...flatSpawn,mission:1,energy:70,side:['cat']});
    expect(parseSave(JSON.stringify(current))).toEqual(current);
    const illustratedOld={...current,flatLayout:2,chapters:{freelance:{...current.chapters.freelance,x:34,y:15}}};
    expect(parseSave(JSON.stringify(illustratedOld))?.chapters.freelance).toMatchObject({...flatSpawn,mission:1,energy:70,side:['cat']});
  });
  it('has four unique bedroom doors and no opaque layers that cut bodies in half',()=>{
    expect(flatDoors).toHaveLength(4);
    expect(new Set(flatDoors.map(d=>d.id)).size).toBe(4);
    expect(flatForeground()).toEqual([]);
  });
  it('cannot reach a bedroom through any alternative opening when its door is sealed',()=>{
    const rooms=[{x:31,y:10},{x:47,y:10},{x:30,y:22},{x:48,y:22}];
    for(const [index,door] of flatDoors.entries()){
      const map=makeStudentFlat('es','freelance',[],0),[left,top,width,height]=door.threshold;
      for(let y=0;y<54;y++)for(let x=0;x<80;x++){
        const px=(x+.5)*6,py=(y+.5)*6;
        if(px>=left&&px<=left+width&&py>=top&&py<=top+height)map.blocked.push({x,y});
      }
      expect(mapPath(map,flatSpawn,rooms[index]),door.id).toEqual([]);
    }
  });
  it('never permits a cardinal step through the middle of a wall or furniture',()=>{
    for(let y=0;y<54;y++)for(let x=0;x<80;x++)if(flatWalkable(x,y))for(const [dx,dy] of [[1,0],[0,1]])if(flatWalkable(x+dx,y+dy)){
      for(let i=0;i<=12;i++){
        const px=(x+.5+dx*i/12)*6,py=(y+.5+dy*i/12)*6;
        expect(insidePolygon(px,py,flatBoundary)&&!flatObstacles.some(p=>insidePolygon(px,py,p)),`${x},${y} → ${x+dx},${y+dy}`).toBe(true);
      }
    }
  });
});
