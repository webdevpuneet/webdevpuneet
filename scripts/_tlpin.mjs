import fs from 'node:fs';
import http from 'node:http';
import { chromium } from 'playwright';
import { SECTION_TEMPLATES, defaultSectionState } from '../src/components/SectionTemplates/templates/index.js';
import { documentHtml } from '../src/components/SectionTemplates/templates/render.js';
const t = SECTION_TEMPLATES.find(x => x.id === 'timeline-horizontal');
function page(fields = {}) {
  const st = defaultSectionState(t); st.fields = { ...st.fields, ...fields };
  return documentHtml(t, st, { motion: true }).replace('<body>', '<body><div style="height:500px;background:#eef"><h2 style="padding:40px">Content above</h2></div>').replace('</body>', '<div style="height:1600px;background:#fee"><h2 style="padding:40px">Content below</h2></div></body>');
}
const out = []; const ok = (n, c, x = '') => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== '' ? '  [' + x + ']' : ''));
const b = await chromium.launch();
async function open(html, w, h) {
  const srv = http.createServer((q, r) => { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end(html); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('http://127.0.0.1:' + srv.address().port + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  return { p, errs, close: async () => { await p.close(); srv.close(); } };
}
const tx = p => p.locator('.tlh-list').evaluate(e => { const m = getComputedStyle(e).transform; return m === 'none' ? 0 : parseFloat(m.split(',')[4]); });
const state = p => p.evaluate(() => ({ active: [...document.querySelectorAll('.tlh-item')].findIndex(i => i.classList.contains('is-active')), fill: parseFloat(document.querySelector('.tlh-list').style.getPropertyValue('--tl-fill')), top: Math.round(document.querySelector('.st-timeline-horizontal').getBoundingClientRect().top), pinned: document.querySelector('.st-timeline-horizontal').classList.contains('is-tl-pinned'), navHidden: getComputedStyle(document.querySelector('[data-tlh-next]')).display === 'none' }));

let s = await open(page(), 1280, 800); let p = s.p;
let st = await state(p);
ok('pin: pinned class set on desktop', st.pinned && st.navHidden, JSON.stringify(st));
ok('pin: starts with first event active', st.active === 0);
// scroll to the section
await p.evaluate(() => window.scrollTo(0, document.querySelector('.st-timeline-horizontal').getBoundingClientRect().top + window.pageYOffset)); await p.waitForTimeout(900);
const x0 = await tx(p); const s0 = await state(p);
ok('pin: section sits at the top of the screen', Math.abs(s0.top) < 3, String(s0.top));
const y0 = await p.evaluate(() => window.pageYOffset);
await p.mouse.wheel(0, 600); await p.waitForTimeout(1500);
const x1 = await tx(p), s1 = await state(p); const y1 = await p.evaluate(() => window.pageYOffset);
ok('pin: page scrolled', y1 > y0 + 300, y0 + ' -> ' + y1);
ok('pin: stays pinned while scrolling', Math.abs(s1.top) < 3, String(s1.top));
ok('pin: timeline moved left (to the right along the line)', x1 < x0 - 150, x0.toFixed(0) + ' -> ' + x1.toFixed(0));
ok('pin: progress line grew', s1.fill > s0.fill + 150, Math.round(s0.fill) + ' -> ' + Math.round(s1.fill));
await p.mouse.wheel(0, 700); await p.waitForTimeout(1500);
const x2 = await tx(p), s2 = await state(p);
ok('pin: later event now active', s2.active > s1.active || s2.active >= 3, s1.active + ' -> ' + s2.active);
await p.screenshot({ path: process.env.SCR + '/tl-pin-mid.png' });
await p.mouse.wheel(0, 3000); await p.waitForTimeout(1500);
const x3 = await tx(p), s3 = await state(p);
ok('pin: reaches the last event and releases the pin', s3.active === 5 && x3 <= x2, 'active ' + s3.active + ' x ' + Math.round(x3));
ok('pin: section scrolls away after the end', s3.top < -50, String(s3.top));
await p.mouse.wheel(0, -4500); await p.waitForTimeout(1500);
const s4 = await state(p);
ok('pin: scrolling back up returns to the first event', s4.active <= 1, String(s4.active));
// click marker jumps
await p.evaluate(() => window.scrollTo(0, document.querySelector('.st-timeline-horizontal').getBoundingClientRect().top + window.pageYOffset)); await p.waitForTimeout(800);
await p.locator('[data-tlh-dot]').nth(4).click(); await p.waitForTimeout(2000);
const s5 = await state(p);
ok('pin: clicking a marker scrolls to that event', s5.active >= 3, String(s5.active));
ok('pin: no errors', s.errs.length === 0, s.errs.join('|').slice(0, 100));
await s.close();

s = await open(page({ scrollMode: 'free' }), 1280, 800);
st = await state(s.p);
ok('free mode: not pinned, arrows visible', !st.pinned && !st.navHidden);
await s.close();

s = await open(page(), 390, 800);
st = await state(s.p);
ok('phone: pinned mode falls back to swipe + arrows', !st.pinned && !st.navHidden);
await s.close();

s = await open(page().replace('<head>', '<head><script>Object.defineProperty(window,"matchMedia",{value:q=>({matches:/reduce/.test(q),media:q,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}})})</script>'), 1280, 800);
st = await state(s.p);
ok('reduced motion: no pinning', !st.pinned && !st.navHidden);
await s.close();

console.log(out.join('\n')); await b.close();
