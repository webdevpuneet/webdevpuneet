// Share image for /email-templates/ (1200×630), in the same style as the Website Builder one
// (scripts/capture-website-builder-og.mjs): what the tool is on the left (name, promise, live
// template count, what every email supports) and a fan of real email previews on the right
// (public/images/email-templates/previews/, made by scripts/capture-email-previews.mjs).
//   node scripts/capture-email-templates-og.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import { EMAIL_TEMPLATES } from '../src/components/EmailTemplates/templates/index.js';

// The top of each email (its header and hero), as a data URL
const top = async (id, height = 820) => `data:image/png;base64,${(await sharp(`public/images/email-templates/previews/${id}.png`).extract({ left: 0, top: 0, width: 640, height }).png().toBuffer()).toString('base64')}`;
// Back to front
const CARDS = ['black-friday-sale', 'newsletter', 'order-confirmation', 'welcome'];
const imgs = await Promise.all(CARDS.map(id => top(id)));
const pos = [
  { x: 905, y: 70, r: 10 },
  { x: 800, y: 40, r: 4 },
  { x: 690, y: 70, r: -3 },
  { x: 585, y: 110, r: -9 },
];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;color:#fff;
  background:radial-gradient(900px 600px at 85% 20%,rgba(244,114,182,.35),transparent 60%),radial-gradient(700px 500px at 0% 100%,rgba(56,189,248,.25),transparent 60%),linear-gradient(135deg,#1e1b4b,#4c1d95)}
.grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:26px 26px;mask-image:linear-gradient(90deg,#000 0,transparent 55%)}
.left{position:absolute;left:68px;top:62px;width:520px}
.brand{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:700;opacity:.92}
.logo{width:40px;height:40px;border-radius:11px;background:#fff;display:grid;place-items:center}
.env{width:22px;height:16px;border:3px solid #6d28d9;border-radius:3px;position:relative;overflow:hidden}
.env:after{content:"";position:absolute;left:1px;top:-9px;width:14px;height:14px;border:3px solid #a78bfa;transform:rotate(45deg)}
h1{margin-top:34px;font-size:64px;line-height:1.02;font-weight:800;letter-spacing:-2px}
h1 span{background:linear-gradient(90deg,#fde68a,#f9a8d4);-webkit-background-clip:text;background-clip:text;color:transparent}
p{margin-top:20px;font-size:23px;line-height:1.4;color:#ddd6fe}
.stats{display:flex;gap:12px;margin-top:30px}
.stat{padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18)}
.stat b{display:block;font-size:30px;line-height:1;font-weight:800}
.stat small{display:block;margin-top:5px;font-size:14px;color:#c4b5fd}
.chips{display:flex;gap:8px;margin-top:22px}
.chip{padding:7px 13px;border-radius:999px;background:#fff;color:#4c1d95;font-size:15px;font-weight:700}
.card{position:absolute;width:300px;height:390px;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.25)}
.card img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
.phone{position:absolute;left:1000px;top:330px;width:150px;height:270px;border-radius:26px;background:#0f172a;padding:9px;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);transform:rotate(6deg)}
.phone .screen{width:100%;height:100%;border-radius:18px;overflow:hidden;background:#fff}.phone img{display:block;width:100%;height:auto}
.url{position:absolute;left:68px;bottom:34px;font-size:17px;font-weight:600;color:#e9d5ff;opacity:.85}
</style></head><body><div class="grid"></div>
${imgs.map((src, i) => `<div class="card" style="left:${pos[i].x}px;top:${pos[i].y}px;transform:rotate(${pos[i].r}deg)"><img src="${src}"></div>`).join('')}
<div class="phone"><div class="screen"><img src="${await top(CARDS[3], 1300)}"></div></div>
<div class="left">
  <div class="brand"><div class="logo"><div class="env"></div></div>Email Templates</div>
  <h1>HTML emails that <span>just work.</span></h1>
  <p>Edit in your browser, then copy the HTML or download a ZIP. Free, no sign-up.</p>
  <div class="stats">
    <div class="stat"><b>${EMAIL_TEMPLATES.length}</b><small>email templates</small></div>
    <div class="stat"><b>Dark</b><small>mode built in</small></div>
    <div class="stat"><b>600px</b><small>responsive</small></div>
  </div>
  <div class="chips"><span class="chip">Gmail</span><span class="chip">Outlook</span><span class="chip">Apple Mail</span></div>
</div>
<div class="url">webdevpuneet.com/email-templates</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'load' });
const shot = await p.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await b.close();
await sharp(shot).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile('public/images/email-templates.png');
console.log('public/images/email-templates.png written');
