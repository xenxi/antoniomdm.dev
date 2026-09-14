import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';

await mkdir('public/arcade', { recursive: true });
await mkdir('public/audio', { recursive: true });
await mkdir('public/images/identity', { recursive: true });
await sharp('src/assets/antonios-logo.png').resize({ width: 144 }).webp({ lossless: true }).toFile('public/images/identity/antonios-logo.webp');
await sharp('src/assets/antonios-wallpaper-graphite.png').resize({ width: 1600 }).webp({ quality: 78 }).toFile('public/wallpaper.webp');
await sharp('src/assets/antonios-wallpaper-midnight.png').resize({ width: 1600 }).webp({ quality: 78 }).toFile('public/wallpaper-midnight.webp');
await sharp('legacy/flutter/assets/img/bg_02.jpg').resize({ width: 1440 }).webp({ quality: 75 }).toFile('public/arcade/world.webp');
await copyFile('legacy/flutter/assets/audio/arcade_01.mp3', 'public/audio/arcade_01.mp3');
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="bg"><stop stop-color="#10182d"/><stop offset="1" stop-color="#2e2549"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><rect x="60" y="60" width="1080" height="510" rx="18" fill="#101525" stroke="#78709e"/><path d="M60 115h1080" stroke="#343b54"/><text x="90" y="96" font-family="monospace" font-size="22" fill="#b4a5fa">welcome.app</text><text x="115" y="235" font-family="sans-serif" font-size="30" fill="#87e5e7">ANTONIOMDM OS</text><text x="110" y="340" font-family="sans-serif" font-size="66" fill="#f0f0fb">Antonio M. Díaz Moreno</text><text x="115" y="405" font-family="sans-serif" font-size="36" fill="#b4a5fa">Software Architect</text><text x="115" y="505" font-family="monospace" font-size="22" fill="#a8b0c9">I design and build software for the real world.</text></svg>`;
await mkdir('public/en', { recursive: true });
await sharp(Buffer.from(social)).png().toFile('public/en/social.png');
const socialEs = social.replace('welcome.app', 'bienvenida.app').replace('Software Architect', 'Arquitecto de software').replace('I design and build software for the real world.', 'Diseño y construyo software para el mundo real.');
await sharp(Buffer.from(socialEs)).png().toFile('public/social.png');
