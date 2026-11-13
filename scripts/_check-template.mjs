// Scratch: render one social template at every size into one contact sheet. Usage: node scripts/_check-template.mjs <id> <outfile>
import { chromium } from 'playwright';
import sharp from 'sharp';
import { TEMPLATES, SIZES } from '../src/components/SocialPostTemplates/templates/index.js';
import { templateSource } from '../src/components/SocialPostTemplates/source.js';
const [id, out, fill] = process.argv.slice(2); // FILL: pass 'fill' to simulate uploaded photos
const t = TEMPLATES.find(x => x.id === id);
const browser = await chromium.launch(); const pg = await browser.newPage();
const tiles = [];
for (const z of SIZES) {
  const { html, css, size } = templateSource(t, z);
  await pg.setViewportSize({ width: size.w, height: size.h });
  await pg.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style><style>html,body{margin:0;width:${size.w}px;height:${size.h}px;overflow:hidden}</style></head><body>${html}</body></html>`, { waitUntil: 'networkidle' });
  await pg.evaluate(([f, ig]) => { window.__fill = f; window.__ignore = ig; }, [!!fill, (process.env.IGNORE || '').split(',').filter(Boolean)]);
  const issues = await pg.evaluate(async () => {
    await document.fonts.ready;
    const root = document.querySelector('.spt');
    if (window.__fill) root.querySelectorAll('[data-image]').forEach(e => { e.classList.add('has-img'); e.style.backgroundImage = 'linear-gradient(135deg,#f97316,#ec4899)'; });
    const els = [...root.querySelectorAll('[data-fit]')];
    const boxes = [...new Set(els.map(el => el.closest('[data-fit-box]') || root))];
    const over = () => boxes.some(b => b.scrollHeight > b.clientHeight + 1) || els.some(el => el.scrollWidth > el.clientWidth + 1);
    const base = els.map(el => parseFloat(getComputedStyle(el).fontSize) || 16);
    let k = 1; for (let i = 0; i < 45 && over(); i++) { k *= 0.95; els.forEach((el, j) => { el.style.fontSize = `${Math.max(9, base[j] * k)}px`; }); }
    const r = root.getBoundingClientRect(); const bad = [];
    root.querySelectorAll('*').forEach(el => { const b = el.getBoundingClientRect(); if (b.width && b.height && getComputedStyle(el).position !== 'absolute' && (b.right > r.right + 2 || b.bottom > r.bottom + 2 || b.left < r.left - 2)) bad.push(el.className || el.tagName); });
    if (!root.classList.contains('is-landscape')) { const kids = [...root.firstElementChild.children].filter(k => getComputedStyle(k).position !== 'absolute' && k.getBoundingClientRect().height > 0); for (let i = 0; i < kids.length - 1; i++) if (kids[i].getBoundingClientRect().bottom > kids[i + 1].getBoundingClientRect().top + 1) bad.push('OVERLAP:' + kids[i].className + '>' + kids[i + 1].className); }
    root.querySelectorAll(':scope > div > *').forEach(k => { if (getComputedStyle(k).position !== 'absolute' && k.scrollHeight > k.clientHeight + 2 && !(window.__ignore || []).some(x => k.classList.contains(x))) bad.push('CONTENT-OVERFLOW:' + k.className + ' ' + k.scrollHeight + '>' + k.clientHeight); });
    return bad.slice(0, 8);
  });
  console.log(z.id, size.w + 'x' + size.h, issues.length ? 'OVERFLOW: ' + issues.join(',') : 'ok');
  const buf = await pg.screenshot({ clip: { x: 0, y: 0, width: size.w, height: size.h }, type: 'png' });
  tiles.push({ z, buf: await sharp(buf).resize({ height: 560 }).png().toBuffer() });
}
const metas = await Promise.all(tiles.map(x => sharp(x.buf).metadata()));
const W = metas.reduce((a, m) => a + m.width + 16, 16);
await sharp({ create: { width: W, height: 592, channels: 3, background: '#888' } }).composite(tiles.map((x, i) => ({ input: x.buf, left: 16 + metas.slice(0, i).reduce((a, m) => a + m.width + 16, 0), top: 16 }))).png().toFile(out);
await browser.close();
