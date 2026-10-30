import fs from 'node:fs';
import http from 'node:http';
import { chromium } from 'playwright';
import { siteFromStarter, siteFiles } from '../src/components/SectionTemplates/templates/site.js';
const out = []; const ok = (n, c, x = '') => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== '' ? '  [' + x + ']' : ''));
const b = await chromium.launch();
async function serve(id, multi) {
  const files = siteFiles(siteFromStarter(id, { multi }), {});
  const map = new Map(files.map(f => [f.path, f]));
  const srv = http.createServer((q, r) => {
    const p = decodeURIComponent(q.url.split('?')[0]).replace(/^\//, '') || 'index.html';
    const f = map.get(p);
    if (!f) { r.writeHead(404); r.end('nf'); return; }
    const type = p.endsWith('.css') ? 'text/css' : p.endsWith('.js') ? 'text/javascript' : p.endsWith('.html') ? 'text/html' : 'application/octet-stream';
    r.writeHead(200, { 'Content-Type': type });
    r.end(f.encoding === 'base64' ? Buffer.from(f.content, 'base64') : f.content);
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  return { url: 'http://127.0.0.1:' + srv.address().port + '/', close: () => srv.close() };
}
async function visit(url, w = 1280, h = 800) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => (/fonts\.googleapis|fonts\.gstatic|cdnjs/.test(r.request().url()) ? r.continue() : r.fulfill({ status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>' })));
  await p.goto(url, { waitUntil: 'load', timeout: 45000 }); await p.waitForTimeout(1500);
  return { p, errs };
}

/* school: pinned timeline + back to top + accessibility toolbar, one page and a second page of the multi-page site */
{
  const s = await serve('school', false); const { p, errs } = await visit(s.url);
  const top = () => p.locator('.st-timeline-horizontal').evaluate(e => Math.round(e.getBoundingClientRect().top));
  await p.evaluate(() => window.scrollTo(0, document.querySelector('.st-timeline-horizontal').getBoundingClientRect().top + window.pageYOffset)); await p.waitForTimeout(900);
  const a0 = await p.evaluate(() => [...document.querySelectorAll('.tlh-item')].findIndex(i => i.classList.contains('is-active')));
  await p.mouse.wheel(0, 700); await p.waitForTimeout(1500);
  const a1 = await p.evaluate(() => [...document.querySelectorAll('.tlh-item')].findIndex(i => i.classList.contains('is-active')));
  ok('school site: timeline pinned while scrolling', Math.abs(await top()) < 4, String(await top()));
  ok('school site: events advance with scroll', a1 > a0, a0 + ' -> ' + a1);
  ok('school site: back to top visible and works', await p.locator('.btt-btn').isVisible());
  await p.locator('.btt-btn').click(); await p.waitForTimeout(1900);
  ok('school site: back to top reaches the top', (await p.evaluate(() => window.pageYOffset)) < 5);
  await p.locator('.a11y-fab').click(); await p.waitForTimeout(400); await p.click('[data-feature=gray]');
  ok('school site: accessibility grayscale works with the page', /grayscale/.test(await p.evaluate(() => getComputedStyle(document.querySelector('main, body > div, .st-image-background-hero') || document.body).filter)) || (await p.evaluate(() => document.documentElement.style.getPropertyValue('--a11y-filter'))).includes('grayscale'));
  ok('school site: no script errors', errs.length === 0, errs.join('|').slice(0, 160));
  await p.screenshot({ path: process.env.SCR + '/school-live.png' });
  await p.close(); s.close();
  const m = await serve('school', true); const v = await visit(m.url + 'index.html');
  const files = ['index.html'];
  ok('school multi: home has widgets', (await v.p.locator('.btt-btn').count()) === 1 && (await v.p.locator('.a11y-fab').count()) === 1);
  ok('school multi: no script errors', v.errs.length === 0, v.errs.join('|').slice(0, 160));
  await v.p.close(); m.close();
}
/* agency: cursor follower + back to top */
{
  const s = await serve('agency', false); const { p, errs } = await visit(s.url);
  await p.mouse.move(400, 300); await p.mouse.move(640, 420, { steps: 6 }); await p.waitForTimeout(900);
  const pos = await p.evaluate(() => { const d = document.querySelector('.cf-dot'); if (!d) return null; const r = d.getBoundingClientRect(); return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2), getComputedStyle(d).mixBlendMode]; });
  ok('agency site: cursor circle follows the pointer', pos && Math.abs(pos[0] - 640) < 8 && Math.abs(pos[1] - 420) < 8 && pos[2] === 'difference', JSON.stringify(pos));
  ok('agency site: no script errors', errs.length === 0, errs.join('|').slice(0, 160));
  await p.screenshot({ path: process.env.SCR + '/agency-live.png' });
  await p.close(); s.close();
}
/* real-estate: scroll zoom */
{
  const s = await serve('real-estate', false); const { p, errs } = await visit(s.url);
  await p.evaluate(() => window.scrollTo(0, document.querySelector('.st-scroll-zoom').getBoundingClientRect().top + window.pageYOffset - 100)); await p.waitForTimeout(800);
  const sc0 = await p.locator('[data-kb-img=hero]').evaluate(e => getComputedStyle(e).transform);
  await p.mouse.wheel(0, 500); await p.waitForTimeout(1500);
  const sc1 = await p.locator('[data-kb-img=hero]').evaluate(e => getComputedStyle(e).transform);
  ok('real-estate site: hero image zoom changes while scrolling', sc0 !== sc1 && sc1 !== 'none', sc0.slice(0, 22) + ' -> ' + sc1.slice(0, 22));
  ok('real-estate site: no script errors', errs.length === 0, errs.join('|').slice(0, 160));
  await p.close(); s.close();
}
/* salon: team accordion */
{
  const s = await serve('salon', false); const { p, errs } = await visit(s.url);
  const n = await p.locator('.ta-item').count();
  ok('salon site: team accordion with 4 stylists', n === 4, n);
  await p.locator('.ta-item').nth(2).locator('.ta-trigger').scrollIntoViewIfNeeded(); await p.locator('.ta-item').nth(2).locator('.ta-trigger').click(); await p.waitForTimeout(900);
  ok('salon site: clicking a strip opens it', (await p.locator('.ta-item').nth(2).getAttribute('class')).includes('is-open'));
  ok('salon site: no script errors', errs.length === 0, errs.join('|').slice(0, 160));
  await p.screenshot({ path: process.env.SCR + '/salon-live.png' });
  await p.close(); s.close();
}
console.log(out.join('\n')); await b.close();
