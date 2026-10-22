import { expect, test, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { clickCanvasPoint, enableGodotE2EDebug } from './career-fixture';
import { completeEvent, newGame } from '../../src/arcade/engine';

for(const locale of ['es','en']) test(`student flat ${locale}: illustrated room, movement and both flatmate conversations`, async ({page})=>{
  test.setTimeout(120_000);
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await enableGodotE2EDebug(page);
  // Isolate locomotion from the campaign's timed client interruption.
  // Aísla el movimiento de la interrupción programada del cliente.
  await page.addInitScript(save=>localStorage.setItem('antonios:career:v1',save),JSON.stringify({...completeEvent(newGame(),'freelance'),timed:false}));
  await page.goto(locale==='es'?'/arcade/':'/en/arcade/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.arcade-launcher button').click();
  await page.locator('[data-chapter="freelance"]').click();
  const world=page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine','ready',{timeout:60_000});
  await expect(world).toHaveAttribute('data-player','39,43');
  const canvas=page.frameLocator('.godot-frame').locator('canvas');
  await canvas.focus();await canvas.press('ArrowUp');
  await expect(world).toHaveAttribute('data-player','39,42');
  mkdirSync('docs/previews',{recursive:true});
  await canvas.screenshot({path:`docs/previews/student-flat-game-${locale}.png`});
  for(const [x,y] of [[30,22],[48,22],[31,10],[47,10],[39,36]]){
    await clickCanvasPoint(page,{x:(x+.5)*6,y:(y+.5)*6},`floor-${x}-${y}`);
    await expect(world).toHaveAttribute('data-player',`${x},${y}`,{timeout:20_000});
    await expect(world).toHaveAttribute('data-movement-state','idle',{timeout:10_000});
  }
  const doorIds=await page.evaluate(()=>{
    const debug=(window as Window & {__CAREER_E2E_DEBUG__?:{events?:{doors?:{id:string;crossings:number}[]}[]}}).__CAREER_E2E_DEBUG__;
    return [...new Set((debug?.events??[]).flatMap(event=>(event.doors??[]).filter(door=>door.crossings>0).map(door=>door.id)))];
  });
  expect(doorIds).toHaveLength(4);
  await canvas.screenshot({path:`docs/previews/student-flat-doors-${locale}.png`});
  await page.locator('.career-direct > summary').click();
  await page.getByRole('button',{name:locale==='es'?'Hablar con el compañero de la capa':'Talk to the caped flatmate'}).click();
  await expect(page.getByRole('dialog')).toContainText('fuet');
  await page.getByRole('dialog').getByRole('button').last().click();
  await page.getByRole('button',{name:locale==='es'?'Hablar con el compañero ciclista':'Talk to the cyclist flatmate'}).click();
  await expect(page.getByRole('dialog')).toContainText(locale==='es'?'bilirrubina':'bilirubin');
  expect(errors).toEqual([]);
});

type Cast={count:number;elapsed:number;poses:number[];rows:number[];tension:number};
type State={world:string;active:boolean;language:string;residents:Cast};
async function command(page:Page,command:Record<string,unknown>){
  await page.evaluate(command=>window.postMessage({channel:'antonios:godot:v1',type:'command',command},location.origin),command);
}
async function inspect(page:Page):Promise<State>{
  await page.evaluate(()=>{(window as Window & {flatState?:State}).flatState=undefined;});
  await command(page,{type:'inspect'});
  await expect.poll(()=>page.evaluate(()=>(window as Window & {flatState?:State}).flatState)).toBeTruthy();
  return page.evaluate(()=>(window as Window & {flatState?:State}).flatState!);
}
for(const locale of ['es','en'])test(`native student flat ${locale}: three animated NPCs, pause and reduced motion`,async({page})=>{
  test.setTimeout(90_000);
  await page.addInitScript(()=>window.addEventListener('message',event=>{
    if(event.data?.channel==='antonios:godot:v1' && event.data.type==='debugState')(window as Window & {flatState?:State}).flatState=event.data;
    if(event.data?.channel==='antonios:godot:v1' && event.data.type==='ready')(window as Window & {flatReady?:boolean}).flatReady=true;
  }));
  await page.goto(`/games/career/index.html?runtime=native&e2eDebug=1&lang=${locale}`);
  await expect.poll(()=>page.evaluate(()=>(window as Window & {flatReady?:boolean}).flatReady),{timeout:60_000}).toBe(true);
  await expect.poll(async()=> (await inspect(page)).world,{timeout:60_000}).toBe('town');
  await command(page,{type:'enterWorld',id:'freelance'});
  await expect.poll(async()=> (await inspect(page)).residents.count).toBe(3);
  const start=await inspect(page);
  await expect.poll(async()=> (await inspect(page)).residents.elapsed).toBeGreaterThan(start.residents.elapsed+.3);
  await page.locator('canvas').screenshot({path:`test-results/student-flat-native-${locale}.png`});
  await command(page,{type:'pause'});
  await expect.poll(async()=> (await inspect(page)).active).toBe(false);
  const paused=await inspect(page);await page.waitForTimeout(350);
  expect((await inspect(page)).residents).toEqual(paused.residents);
  await command(page,{type:'configuration',reducedMotion:true});
  await command(page,{type:'resume'});
  const reduced=await inspect(page);await page.waitForTimeout(350);
  expect((await inspect(page)).residents).toEqual(reduced.residents);
  expect(reduced.language).toBe(locale);
});
