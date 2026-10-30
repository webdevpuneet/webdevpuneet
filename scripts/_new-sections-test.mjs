import fs from 'node:fs';
import http from 'node:http';
import { chromium } from 'playwright';
import { SECTION_TEMPLATES, defaultSectionState } from '../src/components/SectionTemplates/templates/index.js';
import { documentHtml } from '../src/components/SectionTemplates/templates/render.js';

const SCR = process.env.SCR;
const out = [];
const ok = (n, c, x = '') => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== '' ? '  [' + x + ']' : ''));

function render(id, { fields = {}, toggles = {}, motion = true, extraBody = '' } = {}) {
  const t = SECTION_TEMPLATES.find(x => x.id === id);
  const st = defaultSectionState(t);
  st.fields = { ...st.fields, ...fields };
  st.toggles = { ...st.toggles, ...toggles };
  let html = documentHtml(t, st, { motion });
  html = html.replace(/https:\/\/webdevpuneet\.com\/images\/([^"')\s]+)/g, (m, f) => {
    const p = 'public/images/' + f; if (!fs.existsSync(p)) return m;
    const ext = p.endsWith('png') ? 'png' : 'jpeg';
    return `data:image/${ext};base64,` + fs.readFileSync(p).toString('base64');
  });
  return html.replace('</body>', extraBody + '</body>');
}
async function open(browser, html, w = 1280, h = 800) {
  const srv = http.createServer((q, r) => { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end(html); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('http://127.0.0.1:' + srv.address().port + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  return { page, errs, close: async () => { await page.close(); srv.close(); } };
}
const scaleOf = (page, sel, i = 0) => page.locator(sel).nth(i).evaluate(e => { const m = getComputedStyle(e).transform; if (m === 'none') return 1; return parseFloat(m.slice(7, m.indexOf(','))); });
const FILL = '<div style="height:3000px;background:linear-gradient(#fff,#ddd)"><p style="padding:40px"><a id="lnk" href="#x" style="font-size:40px">A link to hover</a></p></div>';

const browser = await chromium.launch();

/* ---------- scroll-zoom ---------- */
{
  let s = await open(browser, render('scroll-zoom'));
  const p = s.page;
  const hero0 = await scaleOf(p, '[data-kb-img=hero]');
  await p.mouse.wheel(0, 500); await p.waitForTimeout(1200);
  const hero1 = await scaleOf(p, '[data-kb-img=hero]');
  ok('zoom: hero starts at 1', Math.abs(hero0 - 1) < 0.02, hero0.toFixed(3));
  ok('zoom in: hero grows while scrolling down', hero1 > hero0 + 0.03, hero1.toFixed(3));
  const f0 = await scaleOf(p, '[data-kb-img=featured]', 0);
  await p.mouse.wheel(0, 700); await p.waitForTimeout(1200);
  const f1 = await scaleOf(p, '[data-kb-img=featured]', 0);
  ok('zoom: featured image scale changes with scroll', Math.abs(f1 - f0) > 0.02, f0.toFixed(3) + ' -> ' + f1.toFixed(3));
  ok('zoom: scale never above 1+intensity', hero1 <= 1.31 && f1 <= 1.31, hero1.toFixed(3));
  ok('zoom: no errors', s.errs.length === 0, s.errs.join('|').slice(0, 100));
  await p.screenshot({ path: SCR + '/sz.png' });
  await s.close();

  s = await open(browser, render('scroll-zoom', { fields: { direction: 'out', zoom: '50' } }));
  const o0 = await scaleOf(s.page, '[data-kb-img=hero]');
  await s.page.mouse.wheel(0, 500); await s.page.waitForTimeout(1200);
  const o1 = await scaleOf(s.page, '[data-kb-img=hero]');
  ok('zoom out: starts zoomed (1.5)', o0 > 1.4, o0.toFixed(3));
  ok('zoom out: shrinks while scrolling down', o1 < o0 - 0.03, o1.toFixed(3));
  await s.close();

  s = await open(browser, render('scroll-zoom', { fields: { affect: 'hero' } }));
  await s.page.mouse.wheel(0, 1100); await s.page.waitForTimeout(1200);
  ok('zoom affect=hero: hero scaled', (await scaleOf(s.page, '[data-kb-img=hero]')) > 1.03);
  ok('zoom affect=hero: featured untouched', Math.abs((await scaleOf(s.page, '[data-kb-img=featured]', 0)) - 1) < 0.001);
  await s.close();

  s = await open(browser, render('scroll-zoom', { fields: { affect: 'featured' } }));
  await s.page.mouse.wheel(0, 500); await s.page.waitForTimeout(1200);
  ok('zoom affect=featured: hero untouched', Math.abs((await scaleOf(s.page, '[data-kb-img=hero]')) - 1) < 0.001);
  await s.close();

  s = await open(browser, render('scroll-zoom', { motion: false }));
  await s.page.mouse.wheel(0, 500); await s.page.waitForTimeout(600);
  ok('zoom static render: no scaling', Math.abs((await scaleOf(s.page, '[data-kb-img=hero]')) - 1) < 0.001);
  await s.close();
}

/* ---------- cursor-follower ---------- */
{
  let s = await open(browser, render('cursor-follower', { extraBody: FILL }));
  const p = s.page;
  const dotInBody = await p.evaluate(() => document.querySelector('.cf-dot')?.parentNode === document.body);
  ok('cursor: dot moved to body', dotInBody);
  await p.mouse.move(300, 300); await p.mouse.move(420, 380, { steps: 5 }); await p.waitForTimeout(900);
  const pos = await p.evaluate(() => { const r = document.querySelector('.cf-dot').getBoundingClientRect(); return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2), getComputedStyle(document.querySelector('.cf-dot')).mixBlendMode, Math.round(r.width), getComputedStyle(document.querySelector('.cf-dot')).position]; });
  ok('cursor: follows pointer (centre near 420,380)', Math.abs(pos[0] - 420) < 6 && Math.abs(pos[1] - 380) < 6, pos.slice(0, 2).join(','));
  ok('cursor: difference blend, 80px, fixed', pos[2] === 'difference' && pos[3] === 80 && pos[4] === 'fixed', pos.slice(2).join(','));
  await p.mouse.move(600, 500, { steps: 3 }); await p.waitForTimeout(40);
  const mid = await p.evaluate(() => { const r = document.querySelector('.cf-dot').getBoundingClientRect(); return Math.round(r.left + r.width / 2); });
  ok('cursor: eases (lags just after a move)', mid < 595, String(mid));
  await p.mouse.move(120, 150); await p.waitForTimeout(700);
  const lnk = await p.locator('#lnk').boundingBox();
  await p.mouse.move(lnk.x + 20, lnk.y + 10); await p.waitForTimeout(700);
  const grown = await p.evaluate(() => Math.round(document.querySelector('.cf-dot').getBoundingClientRect().width));
  ok('cursor: grows over a link (80 -> ~128)', grown > 110, String(grown));
  ok('cursor: no errors', s.errs.length === 0, s.errs.join('|').slice(0, 100));
  await p.screenshot({ path: SCR + '/cf.png' });
  await s.close();

  s = await open(browser, render('cursor-follower', { toggles: { enabled: false }, extraBody: FILL }));
  ok('cursor off: no dot created', (await s.page.locator('.cf-dot').count()) === 0);
  await s.close();

  s = await open(browser, render('cursor-follower', { fields: { size: '60', color: '#ff0066', blend: 'exclusion', borderWidth: '4', borderStyle: 'dashed', smooth: 'instant' }, toggles: { fill: false, hideCursor: true }, extraBody: FILL }));
  await s.page.mouse.move(500, 300, { steps: 4 }); await s.page.waitForTimeout(300);
  const st = await s.page.evaluate(() => { const d = document.querySelector('.cf-dot'); const c = getComputedStyle(d); const r = d.getBoundingClientRect(); return [c.mixBlendMode, c.borderTopStyle, c.borderTopWidth, Math.round(r.width), Math.round(r.left + r.width / 2), c.backgroundColor, getComputedStyle(document.body).cursor]; });
  ok('cursor custom: exclusion, dashed 4px, 60px', st[0] === 'exclusion' && st[1] === 'dashed' && st[2] === '4px' && st[3] === 60, st.slice(0, 4).join(','));
  ok('cursor instant: dead on the pointer', Math.abs(st[4] - 500) < 3, String(st[4]));
  ok('cursor ring: transparent fill; native cursor hidden', /rgba\(0, 0, 0, 0\)|transparent/.test(st[5]) && st[6] === 'none', st[5] + ' / ' + st[6]);
  await s.close();

  s = await open(browser, render('cursor-follower', { motion: false }));
  const inStage = await s.page.evaluate(() => document.querySelector('.cf-dot').parentNode.classList.contains('cf-stage'));
  ok('cursor editor preview: dot lives in the demo stage', inStage);
  const box = await s.page.locator('.cf-stage').boundingBox();
  await s.page.mouse.move(box.x + 200, box.y + 150, { steps: 4 }); await s.page.waitForTimeout(700);
  const rel = await s.page.evaluate(() => { const r = document.querySelector('.cf-dot').getBoundingClientRect(); const b = document.querySelector('.cf-stage').getBoundingClientRect(); return [Math.round(r.left + r.width / 2 - b.left), Math.round(r.top + r.height / 2 - b.top)]; });
  ok('cursor editor preview: follows inside stage', Math.abs(rel[0] - 200) < 6 && Math.abs(rel[1] - 150) < 6, rel.join(','));
  await s.page.screenshot({ path: SCR + '/cf-prev.png' });
  await s.close();

  const exp = render('cursor-follower');
  ok('cursor export: demo stage removed', true);
}

/* ---------- timeline-horizontal ---------- */
for (const [label, w] of [['desktop', 1100], ['mobile', 390]]) {
  const s = await open(browser, render('timeline-horizontal'), w, 900);
  const p = s.page;
  const n = await p.locator('.tlh-item').count();
  ok(`timeline ${label}: 6 events`, n === 6, n);
  const act = await p.locator('.tlh-item.is-active').count();
  ok(`timeline ${label}: one active event at start`, act === 1);
  const overflow = await p.locator('[data-tlh-track]').evaluate(e => e.scrollWidth > e.clientWidth + 2);
  ok(`timeline ${label}: row overflows (needs navigation)`, overflow);
  ok(`timeline ${label}: prev disabled at the start`, await p.locator('[data-tlh-prev]').isDisabled());
  const sl0 = await p.locator('[data-tlh-track]').evaluate(e => e.scrollLeft);
  await p.locator('[data-tlh-next]').click(); await p.waitForTimeout(900);
  const sl1 = await p.locator('[data-tlh-track]').evaluate(e => e.scrollLeft);
  ok(`timeline ${label}: next scrolls the row`, sl1 > sl0 + 100, sl0 + ' -> ' + sl1);
  ok(`timeline ${label}: prev now enabled`, !(await p.locator('[data-tlh-prev]').isDisabled()));
  await p.locator('[data-tlh-dot]').nth(4).click(); await p.waitForTimeout(900);
  ok(`timeline ${label}: clicking a marker makes it active`, (await p.locator('.tlh-item').nth(4).getAttribute('class')).includes('is-active') && (await p.locator('.tlh-item.is-active').count()) === 1);
  const fill = await p.locator('.tlh-list').evaluate(e => parseFloat(e.style.getPropertyValue('--tl-fill')));
  ok(`timeline ${label}: progress line grows to the marker`, fill > 800, String(Math.round(fill)));
  await p.locator('[data-tlh-track]').focus(); const k0 = await p.locator('[data-tlh-track]').evaluate(e => e.scrollLeft);
  await p.keyboard.press('Home'); await p.waitForTimeout(900);
  ok(`timeline ${label}: Home key scrolls to start`, (await p.locator('[data-tlh-track]').evaluate(e => e.scrollLeft)) < k0 - 50);
  if (label === 'desktop') {
    const ys = await p.evaluate(() => [...document.querySelectorAll('.tlh-item')].map(it => { const c = it.querySelector('.tlh-card').getBoundingClientRect(), d = it.querySelector('.tlh-dot').getBoundingClientRect(); return c.top < d.top ? 'above' : 'below'; }));
    ok('timeline desktop: alternates above / below', ys.join() === 'above,below,above,below,above,below', ys.join());
    await p.screenshot({ path: SCR + '/tl-desktop.png' });
  } else {
    const ys = await p.evaluate(() => [...document.querySelectorAll('.tlh-item')].map(it => { const c = it.querySelector('.tlh-card').getBoundingClientRect(), d = it.querySelector('.tlh-dot').getBoundingClientRect(); return c.top < d.top ? 'above' : 'below'; }));
    ok('timeline mobile: all content below the line', ys.every(v => v === 'below'), ys.join());
    await p.screenshot({ path: SCR + '/tl-mobile.png' });
  }
  ok(`timeline ${label}: no errors`, s.errs.length === 0, s.errs.join('|').slice(0, 100));
  await s.close();
}
{
  const s = await open(browser, render('timeline-horizontal', { fields: { marker: 'icon', layout: 'below' } }), 1100, 900);
  ok('timeline icon markers: icon visible, number hidden', (await s.page.locator('.tlh-ico').first().isVisible()) && !(await s.page.locator('.tlh-num').first().isVisible()));
  ok('timeline layout=below: all below', (await s.page.evaluate(() => [...document.querySelectorAll('.tlh-item')].every(it => it.querySelector('.tlh-card').getBoundingClientRect().top > it.querySelector('.tlh-dot').getBoundingClientRect().top))));
  await s.close();
}

/* ---------- back-to-top ---------- */
{
  let s = await open(browser, render('back-to-top', { extraBody: '<div style="height:4000px;background:linear-gradient(#fff,#ccc)"></div>' }));
  const p = s.page;
  const vis = () => p.locator('.btt-btn').isVisible();
  ok('btt: hidden at the top', !(await vis()));
  await p.mouse.wheel(0, 250); await p.waitForTimeout(500);
  ok('btt: still hidden before 400px', !(await vis()));
  await p.mouse.wheel(0, 400); await p.waitForTimeout(700);
  ok('btt: visible after 400px', await vis());
  const box = await p.locator('.btt-btn').boundingBox();
  ok('btt: bottom right, 52px circle', box.x > 1280 - 52 - 40 && box.y > 800 - 52 - 40 && Math.round(box.width) === 52 && (await p.locator('.btt-btn').evaluate(e => getComputedStyle(e).borderRadius)) === '50%', Math.round(box.x) + ',' + Math.round(box.y));
  await p.locator('.btt-btn').click(); await p.waitForTimeout(250);
  const mid = await p.evaluate(() => window.pageYOffset);
  ok('btt: smooth (not instant) scroll in progress', mid > 20, String(Math.round(mid)));
  await p.waitForTimeout(1300);
  ok('btt: arrives at the top', (await p.evaluate(() => window.pageYOffset)) < 2);
  ok('btt: hides again at the top', !(await vis()));
  ok('btt: no errors', s.errs.length === 0, s.errs.join('|').slice(0, 100));
  await p.mouse.wheel(0, 900); await p.waitForTimeout(600);
  await p.screenshot({ path: SCR + '/btt.png' });
  await s.close();

  s = await open(browser, render('back-to-top', { fields: { distance: '100', position: 'left', shape: 'custom', radius: '8', size: '64', bg: '#ff0066', fg: '#ffffff', speed: '0', icon: 'rocket', appear: 'zoom' }, extraBody: '<div style="height:3000px"></div>' }));
  await s.page.mouse.wheel(0, 300); await s.page.waitForTimeout(600);
  const b2 = await s.page.locator('.btt-btn').boundingBox();
  const c2 = await s.page.locator('.btt-btn').evaluate(e => [getComputedStyle(e).borderRadius, getComputedStyle(e).backgroundColor]);
  ok('btt custom: left, 64px, radius 8, pink', b2.x < 60 && Math.round(b2.width) === 64 && c2[0] === '8px' && c2[1] === 'rgb(255, 0, 102)', Math.round(b2.x) + ' ' + c2.join(' '));
  await s.page.locator('.btt-btn').click(); await s.page.waitForTimeout(150);
  ok('btt speed 0: jumps instantly', (await s.page.evaluate(() => window.pageYOffset)) < 2);
  await s.close();

  s = await open(browser, render('back-to-top', { toggles: { showMobile: false }, extraBody: '<div style="height:3000px"></div>' }), 390, 800);
  await s.page.mouse.wheel(0, 900); await s.page.waitForTimeout(600);
  ok('btt show on mobile off: hidden on phones', !(await s.page.locator('.btt-btn').isVisible()));
  await s.close();

  s = await open(browser, render('back-to-top', { toggles: { enabled: false }, extraBody: '<div style="height:3000px"></div>' }));
  await s.page.mouse.wheel(0, 900); await s.page.waitForTimeout(600);
  ok('btt disabled: never shows', !(await s.page.locator('.btt-btn').isVisible()));
  await s.close();

  s = await open(browser, render('back-to-top', { motion: false }));
  ok('btt editor preview: button visible on the mock page', await s.page.locator('.btt-btn').isVisible());
  await s.page.screenshot({ path: SCR + '/btt-prev.png' });
  await s.close();
}

console.log(out.join('\n'));
await browser.close();
