import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const [input,environment]=process.argv.slice(2);
if(!input||!environment)throw new Error('Indica atlas y escenario originales / Supply the original atlas and environment');
const metadata=await sharp(input).metadata(),cw=metadata.width/8,ch=metadata.height/6;
if(!Number.isInteger(cw)||!Number.isInteger(ch))throw new Error('Se requiere una cuadrícula de 8×6 / An 8×6 grid is required');
const frames=[];
for(let row=0;row<6;row++) for(let col=0;col<8;col++) {
 const cell=await sharp(input).extract({left:col*cw,top:row*ch,width:cw,height:ch}).png().toBuffer();
 const {data,info}=await sharp(cell).trim({threshold:5}).png().toBuffer({resolveWithObject:true});
 frames.push({data,info,row,col});
}
const sizes=[0,1,2].map(id=>Math.max(...frames.filter(f=>Math.floor(f.row/2)===id).map(f=>f.info.height)));
const layers=[];
for(const f of frames){const scale=(f.row<4?190:155)/sizes[Math.floor(f.row/2)];const width=Math.round(f.info.width*scale),height=Math.round(f.info.height*scale);layers.push({input:await sharp(f.data).resize(width,height).png().toBuffer(),left:f.col*256+Math.floor((256-width)/2),top:f.row*256+225-height});}
const atlas=await sharp({create:{width:2048,height:1536,channels:4,background:'#00000000'}}).composite(layers).webp({lossless:true}).toBuffer();
mkdirSync('godot/career/assets/characters',{recursive:true});
await sharp(atlas).toFile('public/images/job-route/student-residents.webp');
await sharp(atlas).toFile('godot/career/assets/characters/student-residents.webp');
await sharp(environment).webp({quality:94}).toFile('public/images/job-route/student-flat.webp');
