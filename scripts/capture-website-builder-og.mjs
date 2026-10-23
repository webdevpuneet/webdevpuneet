// Share image for /website-builder/ (1200×630): what the tool is on the left (name, promise,
// live counts of templates and sections, export formats) and a fanned stack of real website
// template thumbnails on the right (public/images/website-templates/thumb/, made by
// scripts/capture-website-templates.mjs). Rendered as HTML in headless Chromium.
//   node scripts/capture-website-builder-og.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { WEBSITE_TEMPLATES } from '../src/components/SectionTemplates/templates/starters.js';
import { SECTION_TEMPLATES } from '../src/components/SectionTemplates/templates/index.js';

const thumb = async id => `data:image/jpeg;base64,${(await readFile(`public/images/website-templates/thumb/${id}.jpg`)).toString('base64')}`;
// Back to front: the front card is the most recognisable page
const CARDS = ['hotel', 'podcast', 'restaurant', 'saas'];
const imgs = await Promise.all(CARDS.map(thumb));
const pos = [
  { x: 640, y: 40, r: 9, s: 0.86 },
  { x: 560, y: 92, r: 4, s: 0.9 },
  { x: 610, y: 210, r: -3, s: 0.94 },
  { x: 520, y: 300, r: -8, s: 1 },
];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;color:#fff;
  background:radial-gradient(900px 600px at 85% 20%,rgba(167,139,250,.45),transparent 60%),radial-gradient(700px 500px at 0% 100%,rgba(56,189,248,.25),transparent 60%),linear-gradient(135deg,#1e1b4b,#4c1d95)}
.grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:26px 26px;mask-image:linear-gradient(90deg,#000 0,transparent 55%)}
.left{position:absolute;left:68px;top:62px;width:500px}
.brand{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:700;opacity:.92}
.logo{width:40px;height:40px;border-radius:11px;background:#fff;display:grid;place-items:center}
.logo i{display:block;width:20px;height:4px;border-radius:2px;background:#6d28d9;box-shadow:0 7px 0 #a78bfa,0 -7px 0 #6d28d9}
h1{margin-top:34px;font-size:66px;line-height:1.02;font-weight:800;letter-spacing:-2px}
h1 span{background:linear-gradient(90deg,#fde68a,#f9a8d4);-webkit-background-clip:text;background-clip:text;color:transparent}
p{margin-top:20px;font-size:23px;line-height:1.4;color:#ddd6fe}
.stats{display:flex;gap:12px;margin-top:30px}
.stat{padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18)}
.stat b{display:block;font-size:30px;line-height:1;font-weight:800}
.stat small{display:block;margin-top:5px;font-size:14px;color:#c4b5fd}
.chips{display:flex;gap:8px;margin-top:22px}
.chip{padding:7px 13px;border-radius:999px;background:#fff;color:#4c1d95;font-size:15px;font-weight:700}
.card{position:absolute;width:560px;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.25);transform-origin:center}
.bar{height:26px;background:#eef0f6;display:flex;align-items:center;gap:6px;padding:0 12px}
.bar i{width:9px;height:9px;border-radius:50%;background:#f87171}.bar i+i{background:#fbbf24}.bar i+i+i{background:#34d399}
.card img{display:block;width:100%;height:330px;object-fit:cover;object-position:top}
.url{position:absolute;left:68px;bottom:34px;font-size:17px;font-weight:600;color:#e9d5ff;opacity:.85}
</style></head><body><div class="grid"></div>
${imgs.map((src, i) => `<div class="card" style="left:${pos[i].x}px;top:${pos[i].y}px;transform:rotate(${pos[i].r}deg) scale(${pos[i].s})"><div class="bar"><i></i><i></i><i></i></div><img src="${src}"></div>`).join('')}
<div class="left">
  <div class="brand"><div class="logo"><i></i></div>Website Builder</div>
  <h1>Build a website. <span>Free.</span></h1>
  <p>Pick a template, edit it in your browser and export clean code. No sign-up.</p>
  <div class="stats">
    <div class="stat"><b>${WEBSITE_TEMPLATES.length}</b><small>website templates</small></div>
    <div class="stat"><b>${SECTION_TEMPLATES.length}</b><small>sections</small></div>
    <div class="stat"><b>GSAP</b><small>scroll animation</small></div>
  </div>
  <div class="chips"><span class="chip">HTML</span><span class="chip">React</span><span class="chip">Vue</span><span class="chip">ZIP</span></div>
</div>
<div class="url">webdevpuneet.com/website-builder</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'load' });
const shot = await p.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await sharp(shot).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile('public/images/website-builder.png');
await b.close();
console.log('public/images/website-builder.png written');
