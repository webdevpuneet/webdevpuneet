// Scratch: render theme-motion frames of one template (uses the real applyAmbient code from render.js). node scripts/_frames.mjs <id> <size> <out.png>
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
import { TEMPLATES, SIZES } from '../src/components/SocialPostTemplates/templates/index.js';
import { templateSource } from '../src/components/SocialPostTemplates/source.js';
const [id, sz, out] = process.argv.slice(2);
const src = fs.readFileSync('src/components/SocialPostTemplates/render.js', 'utf8');
const engine = src.slice(src.indexOf('const clamp01'), src.indexOf('const restoreAmbient'));
const t = TEMPLATES.find(x => x.id === id); const z = SIZES.find(s => s.id === sz);
const { html, css, size } = templateSource(t, z);
const b = await chromium.launch(); const pg = await b.newPage();
const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.setViewportSize({ width: size.w, height: size.h });
await pg.setContent(`<!DOCTYPE html><html><head><style>${css}</style></head><body style="margin:0">${html}<script>const flagFrame=()=>{};${engine};window.__amb=ambientItems(document.querySelector('.spt'));window.__ap=(t)=>applyAmbient(window.__amb,t,${size.w < size.h ? size.w / 100 : size.h / 100});</script></body></html>`, { waitUntil: 'networkidle' });
const tiles = [];
for (const tm of [0.2, 0.75, 1.5, 3, 5.5]) {
  await pg.evaluate(tm => window.__ap(tm), tm);
  tiles.push(await sharp(await pg.screenshot()).resize({ height: 520 }).png().toBuffer());
}
const m = await sharp(tiles[0]).metadata();
await sharp({ create: { width: (m.width + 12) * tiles.length + 12, height: 544, channels: 3, background: '#888' } }).composite(tiles.map((x, i) => ({ input: x, left: 12 + i * (m.width + 12), top: 12 }))).png().toFile(out);
console.log('frames ok', errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors');
await b.close();
