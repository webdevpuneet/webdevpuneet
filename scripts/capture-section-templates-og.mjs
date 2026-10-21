// Share image for /website-section-templates/ (the library page): title on the left, a
// fanned collage of real section previews on the right (1200×630).
//   node scripts/capture-section-templates-og.mjs
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '../src/components/SectionTemplates/templates/index.js';

const shot = async id => `data:image/png;base64,${(await readFile(`public/images/section-templates/previews/${id}.png`)).toString('base64')}`;
const cards = await Promise.all(['saas-split-hero', 'pricing-three-tier', 'features-bento', 'testimonials-grid', 'faq-accordion', 'footer-columns'].map(shot));
const icon = (await readFile('public/icons/website-section-templates.svg', 'utf8')).replace(/<\?xml[^>]*>/, '');
const n = SECTION_TEMPLATES.length, cats = SECTION_CATEGORIES.length;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif;color:#fff;
  background:radial-gradient(900px 500px at 85% 20%,#7c3aed55,transparent 60%),linear-gradient(135deg,#1e1b4b,#312e81 55%,#4c1d95)}
.copy{position:absolute;left:64px;top:0;bottom:0;width:470px;display:flex;flex-direction:column;justify-content:center;gap:22px}
.brand{display:flex;align-items:center;gap:12px;font-size:20px;font-weight:700;color:#c7d2fe}
.brand span{width:44px;height:44px;border-radius:12px;background:#fff;display:grid;place-items:center}
.brand svg{width:26px;height:26px}
h1{font-size:62px;line-height:1.02;font-weight:800;letter-spacing:-.03em}
h1 em{font-style:normal;background:linear-gradient(90deg,#a5b4fc,#f0abfc);-webkit-background-clip:text;color:transparent}
p{font-size:22px;line-height:1.4;color:#c7d2fe;font-weight:500}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips b{font-size:15px;font-weight:700;padding:7px 13px;border-radius:999px;background:#ffffff1a;border:1px solid #ffffff2e}
.stack{position:absolute;left:560px;top:-10px;width:760px;height:660px}
.card{position:absolute;width:460px;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px #0009,0 0 0 1px #ffffff26}
.card img{display:block;width:100%}
.url{position:absolute;left:64px;bottom:34px;font-size:17px;font-weight:700;color:#a5b4fc}
</style></head><body>
<div class="copy">
  <div class="brand"><span>${icon}</span>Free · No sign-up</div>
  <h1>Website <em>Section</em> Templates</h1>
  <p>${n} editable sections in ${cats} categories, animated with GSAP. Export HTML, React or Vue.</p>
  <div class="chips"><b>Hero</b><b>Pricing</b><b>Features</b><b>FAQ</b><b>+ more</b></div>
</div>
<div class="stack">
  <div class="card" style="left:250px;top:40px;transform:rotate(5deg)"><img src="${cards[3]}"></div>
  <div class="card" style="left:270px;top:330px;transform:rotate(-4deg)"><img src="${cards[5]}"></div>
  <div class="card" style="left:20px;top:360px;transform:rotate(3deg)"><img src="${cards[4]}"></div>
  <div class="card" style="left:40px;top:70px;transform:rotate(-5deg)"><img src="${cards[1]}"></div>
  <div class="card" style="left:150px;top:205px;width:500px;transform:rotate(-1deg)"><img src="${cards[0]}"></div>
</div>
<div class="url">webdevpuneet.com/website-section-templates</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'public/images/section-templates/og/website-section-templates.jpg', type: 'jpeg', quality: 88 });
await b.close();
console.log('public/images/section-templates/og/website-section-templates.jpg written');
