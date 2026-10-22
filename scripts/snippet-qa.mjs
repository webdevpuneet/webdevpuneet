// Snippet QA runner: tests every UI snippet in headless Chromium, saves the results to
// snippet-qa/results.json and rebuilds the tracker page SNIPPET-QA.html (project root).
//
//   node scripts/snippet-qa.mjs                 test snippets not tested yet (or changed since)
//   node scripts/snippet-qa.mjs --limit=200     only the next 200 of those (spread it over days)
//   node scripts/snippet-qa.mjs --category=games
//   node scripts/snippet-qa.mjs maze- sticky-   only ids starting with these prefixes (always retested)
//   node scripts/snippet-qa.mjs --force         retest everything
//   node scripts/snippet-qa.mjs --concurrency=6 (default 4)
//   node scripts/snippet-qa-report.mjs          rebuild SNIPPET-QA.html without testing
//
// What one test does, per snippet:
//   Desktop 1280×800: JS errors, console errors, failed requests, blank render, broken images,
//   accessibility basics (unnamed buttons, images without alt, unlabeled inputs), tiny text,
//   low-contrast text, then clicks / types into every control and records which ones change
//   nothing ("dead"), plus a keyboard probe (games) and a scroll probe (scroll effects).
//   Elements that change by themselves (timers, animations) are learned first and ignored.
//   Mobile 390×844: horizontal overflow (and the widest element), small tap targets.
//   Source: missing focus styles, animation without prefers-reduced-motion, alert()/prompt().
// Results merge into results.json keyed by id with a hash of the source, so a snippet is
// retested automatically once its code changes. The manual review lives in
// snippet-qa/review.json (format in scripts/snippet-qa-report.mjs).
import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';
import { buildReport, srcHash } from './snippet-qa-report.mjs';

const ROOT = path.resolve('snippet-qa');
const RESULTS = path.join(ROOT, 'results.json');

const ARGS = process.argv.slice(2);
const flag = name => ARGS.includes(`--${name}`);
const opt = (name, def) => { const a = ARGS.find(x => x.startsWith(`--${name}=`)); return a ? a.split('=').slice(1).join('=') : def; };
const FORCE = flag('force');
const LIMIT = Number(opt('limit', 0)) || 0;
const CATEGORY = opt('category', '');
const CONCURRENCY = Math.max(1, Number(opt('concurrency', 4)) || 4);
const FILTERS = ARGS.filter(a => !a.startsWith('--'));

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };
const MAX_CONTROLS = 16;

function buildDoc(s) {
  const cdn = (s.cdnUrls || []).map(url => (/\.css(\?.*)?$/.test(url.trim()) ? `<link rel="stylesheet" href="${url}">` : `<script src="${url}"><\/script>`)).join('');
  // Stops links and form submits from navigating away mid-test (the snippet's own handlers
  // still run) and answers alert / confirm / prompt so they never block.
  const guard = `<script>addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a){var h=a.getAttribute('href')||'';if(h&&h[0]!=='#'&&h.indexOf('javascript:')!==0)e.preventDefault();}},true);addEventListener('submit',function(e){e.preventDefault()},true);window.alert=function(){};window.confirm=function(){return true};window.prompt=function(){return 'test'};<\/script>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${s.title.replace(/</g, '&lt;')}</title>${guard}${cdn}<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}${s.css}</style></head><body>${s.html}${s.js ? `<script>${s.js}<\/script>` : ''}</body></html>`;
}

/* ───────── in-page helpers (run inside the snippet page) ───────── */

const PAGE_HELPERS = () => {
  const fnv = str => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
  const visible = el => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05;
  };
  const label = el => {
    const t = (el.getAttribute('aria-label') || el.innerText || el.value || el.getAttribute('title') || el.getAttribute('placeholder') || el.getAttribute('name') || '').trim().replace(/\s+/g, ' ');
    const tag = el.tagName.toLowerCase() + (el.type && el.tagName === 'INPUT' ? `[${el.type}]` : '');
    const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : (el.id ? '#' + el.id : '');
    return `${tag}${cls}${t ? ` "${t.slice(0, 40)}"` : ''}`;
  };
  // Per-element "own" state: tag, attributes, direct text, form value, canvas pixels, scroll.
  // full includes inline styles; structural drops them (for pages animating via style).
  const ignore = new Set(); // elements that change by themselves (timers, animations)
  const own = (el, mode) => {
    let s = el.tagName;
    for (const a of el.attributes) { if (a.name === 'data-qa-i' || (mode === 'structural' && a.name === 'style')) continue; s += ` ${a.name}=${a.value}`; }
    for (const n of el.childNodes) if (n.nodeType === 3) s += '|' + n.textContent;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) s += '|v=' + (el.type === 'checkbox' || el.type === 'radio' ? el.checked : el.value);
    if (el.tagName === 'CANVAS' && mode === 'full') { try { if (el.width * el.height < 4e6) s += '|c=' + fnv(el.toDataURL('image/png').slice(-4000)); } catch { /* tainted */ } }
    if (el.scrollTop || el.scrollLeft) s += `|s=${el.scrollTop},${el.scrollLeft}`;
    return s;
  };
  const els = () => [...document.body.querySelectorAll('*')].filter(e => e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE');
  const snap = mode => new Map(els().map(e => [e, fnv(own(e, mode))]));
  let prev = null;
  // Call repeatedly while idle: every element whose own state moved is ignored from then on
  const calibrate = mode => { const s = snap(mode); if (prev) for (const [e, h] of s) if (prev.has(e) && prev.get(e) !== h) ignore.add(e); prev = s; return ignore.size; };
  const resetIgnore = () => { ignore.clear(); prev = null; };
  const sig = mode => {
    let s = '', n = 0;
    for (const e of els()) { n++; if (!ignore.has(e)) s += fnv(own(e, mode)); }
    return `${fnv(s)}:${n}:${Math.round(scrollX)},${Math.round(scrollY)}`;
  };
  // Relative luminance contrast of text against the first opaque background behind it
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = el => {
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null; // gradient / image: can't judge
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0.9) return c;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  return { fnv, visible, label, sig, calibrate, resetIgnore, ignoredCount: () => ignore.size, parse, lum, bgOf };
};

/* ───────── one snippet ───────── */

async function testSnippet(browser, s, base) {
  const t0 = Date.now();
  const r = { id: s.id, hash: srcHash(s), testedAt: new Date().toISOString(), errors: [], consoleErrors: [], failedRequests: [], dead: [], blocked: [], changed: [], controls: 0 };

  /* desktop */
  const ctx = await browser.newContext({ viewport: DESKTOP });
  const page = await ctx.newPage();
  ctx.on('page', p => { if (p !== page) p.close().catch(() => {}); }); // links opening new tabs
  let phase = 'load';
  page.on('pageerror', e => r.errors.push(`${phase === 'load' ? '' : `[${phase}] `}${String(e.message || e).slice(0, 200)}`));
  page.on('console', m => { if (m.type() === 'error') r.consoleErrors.push(m.text().slice(0, 200)); });
  page.on('requestfailed', q => r.failedRequests.push(`${q.url().slice(0, 140)} (${q.failure()?.errorText || 'failed'})`));
  page.on('response', q => { if (q.status() >= 400) r.failedRequests.push(`${q.url().slice(0, 140)} (${q.status()})`); });
  page.on('dialog', d => d.dismiss().catch(() => {}));
  try {
    try { await page.goto(`${base}qa/${s.id}`, { waitUntil: 'networkidle', timeout: 20000 }); }
    catch { r.slowLoad = true; await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {}); }
    await page.waitForTimeout(700);
    await page.evaluate(`window.__qa = (${PAGE_HELPERS.toString()})()`);

    Object.assign(r, await page.evaluate(() => {
      const { visible, label, parse, lum, bgOf } = window.__qa;
      const all = [...document.body.querySelectorAll('*')].filter(e => !['SCRIPT', 'STYLE', 'TEMPLATE'].includes(e.tagName));
      const vis = all.filter(visible);
      const area = vis.reduce((m, e) => { const b = e.getBoundingClientRect(); return Math.max(m, b.width * b.height); }, 0);
      const textLen = (document.body.innerText || '').trim().length;
      const hasMedia = vis.some(e => ['CANVAS', 'SVG', 'IMG', 'VIDEO', 'svg'].includes(e.tagName));
      const brokenImages = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src').slice(0, 100));
      const imgNoAlt = [...document.images].filter(i => !i.hasAttribute('alt') && visible(i)).length;
      const unnamedButtons = [...document.querySelectorAll('button,[role=button]')].filter(b => visible(b) && !(b.innerText || '').trim() && !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby') && !b.getAttribute('title')).map(label).slice(0, 6);
      const unlabeledInputs = [...document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')].filter(i => visible(i) && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby') && !(i.id && document.querySelector(`label[for="${CSS.escape(i.id)}"]`)) && !i.closest('label')).map(label).slice(0, 6);
      let smallText = 0; const lowContrast = [];
      const seen = new Set();
      for (const e of vis) {
        const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
        if (!own) continue;
        const cs = getComputedStyle(e);
        if (parseFloat(cs.fontSize) < 11) smallText++;
        const fg = parse(cs.color), bg = bgOf(e);
        if (fg && bg && fg.a > 0.5) {
          const a = lum(fg), b = lum(bg), ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          const large = parseFloat(cs.fontSize) >= 18.66 || (parseFloat(cs.fontSize) >= 14 && Number(cs.fontWeight) >= 700);
          if (ratio < (large ? 3 : 4.5)) { const k = label(e); if (!seen.has(k) && lowContrast.length < 6) { seen.add(k); lowContrast.push(`${k} ${ratio.toFixed(1)}:1`); } }
        }
      }
      return { blank: !hasMedia && (textLen < 2 || area < 400), visibleEls: vis.length, brokenImages, imgNoAlt, unnamedButtons, unlabeledInputs, smallText, lowContrast };
    }));

    // Does the page change by itself (animations, timers)? Then learn which elements do it and
    // leave them out, so a ticking clock or particle canvas isn't mistaken for a click effect.
    const sig = m => page.evaluate(mm => window.__qa.sig(mm), m);
    const a1 = await sig('full'); await page.waitForTimeout(900); const a2 = await sig('full');
    r.animated = a1 !== a2;
    let mode = 'full';
    if (r.animated) {
      mode = null;
      for (const m of ['full', 'structural']) {
        await page.evaluate(mm => { window.__qa.resetIgnore(); window.__qa.calibrate(mm); }, m);
        for (const wait of [700, 900]) { await page.waitForTimeout(wait); await page.evaluate(mm => window.__qa.calibrate(mm), m); }
        const b1 = await sig(m); await page.waitForTimeout(700); const b2 = await sig(m);
        if (b1 === b2) { mode = m; break; }
      }
      r.ignoredEls = await page.evaluate(() => window.__qa.ignoredCount());
    }
    r.interactionsInconclusive = mode === null;
    r.unclear = [];

    // Controls to exercise
    const controls = await page.evaluate(max => {
      const { visible, label } = window.__qa;
      const sel = 'button,[role=button],[role=tab],[role=switch],[role=checkbox],a[href],input,select,textarea,summary,label,[onclick],[tabindex]:not([tabindex="-1"])';
      let list = [...document.querySelectorAll(sel)];
      for (const e of document.body.querySelectorAll('*')) if (!list.includes(e) && getComputedStyle(e).cursor === 'pointer' && !e.closest(sel)) list.push(e);
      list = list.filter(e => visible(e) && !e.disabled && !(e.tagName === 'INPUT' && ['hidden', 'file', 'color', 'date', 'time', 'datetime-local', 'month', 'week'].includes(e.type)));
      list = list.filter(e => !list.some(o => o !== e && o.contains(e) && o.tagName !== 'LABEL' && o.tagName !== 'BODY')); // the outer control wins
      list = list.filter(e => !(e.tagName === 'LABEL' && (e.control || e.querySelector('input,select,textarea')) && list.includes(e.control || e.querySelector('input,select,textarea'))));
      const pri = e => (e.matches('button,[role=button],summary,select,input,textarea') ? 0 : e.matches('a[href],[role=tab],label') ? 1 : 2);
      list.sort((a, b) => pri(a) - pri(b));
      return list.slice(0, max).map((e, i) => { e.setAttribute('data-qa-i', i); const t = e.tagName; return { i, label: label(e), kind: t === 'SELECT' ? 'select' : t === 'TEXTAREA' || (t === 'INPUT' && /^(text|search|email|number|tel|url|password|)$/.test(e.type)) ? 'type' : t === 'INPUT' && e.type === 'range' ? 'range' : 'click' }; });
    }, MAX_CONTROLS);
    r.controls = controls.length;

    if (mode) {
      for (const c of controls) {
        phase = `after ${c.label}`;
        const before = await sig(mode);
        const loc = page.locator(`[data-qa-i="${c.i}"]`).first();
        try {
          if (!(await loc.count())) { r.blocked.push(`${c.label} (removed from page)`); continue; }
          if (c.kind === 'type') { await loc.fill(c.label.includes('number') ? '42' : 'Test 123', { timeout: 1500 }); await loc.press('Enter', { timeout: 800 }).catch(() => {}); }
          else if (c.kind === 'select') { await loc.evaluate(el => { if (el.options.length > 1) { el.selectedIndex = (el.selectedIndex + 1) % el.options.length; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); } }); }
          else if (c.kind === 'range') { await loc.evaluate(el => { const min = +el.min || 0, max = el.max === '' ? 100 : +el.max; el.value = String(+el.value >= (min + max) / 2 ? min + (max - min) * 0.2 : min + (max - min) * 0.8); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }); }
          else {
            try { await loc.click({ timeout: 1500 }); }
            catch { await loc.evaluate(el => el.click()); r.blocked.push(`${c.label} (covered, clicked via script)`); }
          }
        } catch (e) { r.blocked.push(`${c.label} (${String(e.message).split('\n')[0].slice(0, 60)})`); continue; }
        await page.waitForTimeout(450);
        const after = await sig(mode);
        (after !== before ? r.changed : r.ignoredEls ? r.unclear : r.dead).push(c.label);
        if (after !== before) { await page.keyboard.press('Escape').catch(() => {}); await page.waitForTimeout(150); }
      }

      // Keyboard probe: games and keyboard-driven widgets
      if (s.category === 'games' || /key(down|up|press)/.test(s.js || '')) {
        phase = 'keyboard';
        await page.locator('body').click({ position: { x: 2, y: 2 }, timeout: 1000 }).catch(() => {});
        const before = await sig(mode);
        for (const k of ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'Space', 'Enter']) { await page.keyboard.press(k).catch(() => {}); await page.waitForTimeout(120); }
        await page.waitForTimeout(300);
        r.keyboardResponds = (await sig(mode)) !== before;
      }
    }

    // Scroll probe: scroll-driven effects
    const scrollable = await page.evaluate(() => document.documentElement.scrollHeight > innerHeight + 40);
    if (scrollable && (s.category === 'scroll' || /scroll/i.test(s.js || '') || (s.cdnUrls || []).some(u => u.includes('ScrollTrigger')))) {
      phase = 'scroll';
      await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300);
      const before = await page.evaluate(() => window.__qa.sig('structural') + window.__qa.fnv(document.body.innerHTML));
      await page.mouse.wheel(0, 900); await page.waitForTimeout(400); await page.mouse.wheel(0, 900); await page.waitForTimeout(600);
      const after = await page.evaluate(() => window.__qa.sig('structural') + window.__qa.fnv(document.body.innerHTML));
      r.scrollResponds = before !== after;
    }
  } catch (e) {
    r.errors.push(`[runner] ${String(e.message || e).split('\n')[0].slice(0, 200)}`);
  } finally {
    await ctx.close().catch(() => {});
  }

  /* mobile */
  const mctx = await browser.newContext({ viewport: MOBILE, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const mpage = await mctx.newPage();
  mpage.on('dialog', d => d.dismiss().catch(() => {}));
  try {
    try { await mpage.goto(`${base}qa/${s.id}`, { waitUntil: 'networkidle', timeout: 20000 }); }
    catch { await mpage.waitForLoadState('load', { timeout: 10000 }).catch(() => {}); }
    await mpage.waitForTimeout(600);
    Object.assign(r, await mpage.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const over = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw;
      let widest = '';
      if (over > 1) {
        let best = 0;
        for (const e of document.body.querySelectorAll('*')) {
          const b = e.getBoundingClientRect();
          if (b.right > vw + 1 && b.width > best && getComputedStyle(e).position !== 'fixed') { best = b.width; widest = `${e.tagName.toLowerCase()}${typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : ''} (${Math.round(b.width)}px)`; }
        }
      }
      const targets = [...document.querySelectorAll('button,a[href],input:not([type=hidden]),select,[role=button]')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && (b.width < 24 || b.height < 24); });
      return { mobileOverflow: over > 1 ? over : 0, mobileWidest: widest, smallTargets: targets.length };
    }));
  } catch (e) {
    r.errors.push(`[mobile runner] ${String(e.message || e).split('\n')[0].slice(0, 160)}`);
  } finally {
    await mctx.close().catch(() => {});
  }

  /* source checks */
  const css = s.css || '', js = s.js || '';
  r.noFocusStyles = r.controls > 0 && !/:focus/.test(css);
  r.noReducedMotion = /(@keyframes|animation\s*:|transition\s*:|requestAnimationFrame|gsap\.)/.test(css + js) && !/prefers-reduced-motion/.test(css + js);
  r.usesDialogs = /\b(alert|prompt|confirm)\s*\(/.test(js);
  r.consoleLog = /console\.log\(/.test(js);
  r.ms = Date.now() - t0;
  r.failedRequests = [...new Set(r.failedRequests)].slice(0, 8);
  r.consoleErrors = [...new Set(r.consoleErrors)].slice(0, 8);
  r.errors = [...new Set(r.errors)].slice(0, 8);
  r.findings = findings(r, s);
  r.verdict = r.findings.some(f => f.sev === 'error') ? 'error' : r.findings.some(f => f.sev === 'warn') ? 'warn' : 'clean';
  return r;
}

/* Raw measurements → readable findings. area: functionality | look | a11y | improve */
function findings(r, s) {
  const f = [];
  const add = (sev, area, msg) => f.push({ sev, area, msg });
  r.errors.forEach(e => add('error', 'functionality', `JavaScript error: ${e}`));
  if (r.blank) add('error', 'functionality', 'Renders nothing visible on desktop');
  r.failedRequests.forEach(u => add('error', 'functionality', `Failed to load ${u}`));
  r.brokenImages?.forEach(u => add('error', 'look', `Broken image: ${u}`));
  r.consoleErrors.forEach(e => add('warn', 'functionality', `Console error: ${e}`));
  if (r.dead.length) add(r.dead.length >= Math.max(2, r.controls / 2) ? 'warn' : 'info', 'functionality', `${r.dead.length} of ${r.controls} controls changed nothing when used: ${r.dead.slice(0, 6).join(', ')}${r.dead.length > 6 ? '…' : ''}`);
  if (r.unclear?.length) add('info', 'functionality', `${r.unclear.length} controls showed no change outside the animating parts (their effect may be inside the animation, check by hand): ${r.unclear.slice(0, 5).join(', ')}${r.unclear.length > 5 ? '…' : ''}`);
  if (r.interactionsInconclusive) add('info', 'functionality', 'Page keeps changing on its own, so control effects could not be measured: check them by hand');
  if (r.keyboardResponds === false) add(s.category === 'games' ? 'warn' : 'info', 'functionality', 'Arrow keys / Space / Enter changed nothing (check the keyboard controls)');
  if (r.scrollResponds === false) add('info', 'functionality', 'Scrolling the page changed nothing (check the scroll effect)');
  if (r.slowLoad) add('info', 'functionality', 'Network did not settle within 20s (slow CDN or a request that never ends)');
  if (r.mobileOverflow) add('warn', 'look', `Scrolls sideways on a 390px phone by ${r.mobileOverflow}px${r.mobileWidest ? ` (widest: ${r.mobileWidest})` : ''}`);
  if (r.lowContrast?.length) add('warn', 'look', `Low-contrast text: ${r.lowContrast.join('; ')}`);
  if (r.smallText > 3) add('info', 'look', `${r.smallText} text elements below 11px`);
  if (r.smallTargets > 2) add('info', 'look', `${r.smallTargets} tap targets smaller than 24px on mobile`);
  if (r.unnamedButtons?.length) add('warn', 'a11y', `Buttons with no accessible name: ${r.unnamedButtons.join(', ')}`);
  if (r.unlabeledInputs?.length) add('warn', 'a11y', `Inputs with no label: ${r.unlabeledInputs.join(', ')}`);
  if (r.imgNoAlt) add('info', 'a11y', `${r.imgNoAlt} images without alt text`);
  if (r.noFocusStyles) add('info', 'improve', 'No :focus / :focus-visible styles in the CSS (keyboard users can’t see focus)');
  if (r.noReducedMotion) add('info', 'improve', 'Animates but has no prefers-reduced-motion fallback');
  if (r.usesDialogs) add('info', 'improve', 'Uses alert() / prompt() / confirm(): an inline message would feel more polished');
  if (r.consoleLog) add('info', 'improve', 'Leaves console.log() calls in the JS');
  return f;
}

/* ───────── main ───────── */

const readJson = async (p, def) => { try { return JSON.parse(await readFile(p, 'utf8')); } catch { return def; } };

async function main() {
  await mkdir(ROOT, { recursive: true });
  const results = await readJson(RESULTS, {});

  let queue = SNIPPETS.filter(s => (!CATEGORY || s.category === CATEGORY) && (!FILTERS.length || FILTERS.some(f => s.id.startsWith(f))));
  if (!FORCE && !FILTERS.length) queue = queue.filter(s => results[s.id]?.hash !== srcHash(s));
  if (LIMIT) queue = queue.slice(0, LIMIT);
  console.log(`Testing ${queue.length} snippet(s) with ${CONCURRENCY} workers…`);

  const byId = Object.fromEntries(SNIPPETS.map(s => [s.id, s]));
  const server = http.createServer((req, res) => {
    const id = decodeURIComponent((req.url || '').replace(/^\/qa\//, '').split('?')[0]);
    const s = byId[id];
    res.writeHead(s ? 200 : 404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(s ? buildDoc(s) : 'not found');
  });
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();

  let done = 0, saving = Promise.resolve();
  const save = () => (saving = saving.then(() => writeFile(RESULTS, JSON.stringify(results, null, 1))));
  let stopping = false;
  process.on('SIGINT', () => { if (stopping) process.exit(1); stopping = true; console.log('\nStopping after the current snippets (Ctrl+C again to quit now)…'); });

  const worker = async () => {
    while (queue.length && !stopping) {
      const s = queue.shift();
      let r;
      try {
        r = await Promise.race([testSnippet(browser, s, base), new Promise((_, no) => setTimeout(() => no(new Error('timed out after 90s')), 90000))]);
      } catch (e) {
        r = { id: s.id, hash: srcHash(s), testedAt: new Date().toISOString(), errors: [`[runner] ${e.message}`], findings: [{ sev: 'error', area: 'functionality', msg: `Test run failed: ${e.message}` }], verdict: 'error' };
      }
      results[s.id] = r;
      done++;
      const n = r.findings?.length || 0;
      console.log(`${String(done).padStart(4)}  ${r.verdict.padEnd(5)}  ${s.id}${n ? `  (${n} finding${n > 1 ? 's' : ''})` : ''}`);
      if (done % 10 === 0) save();
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await save();
  await browser.close();
  await new Promise(ok => server.close(ok));
  await buildReport();

  const all = Object.values(results);
  const count = v => all.filter(r => r.verdict === v).length;
  console.log(`\nTested ${done} now · ${all.length}/${SNIPPETS.length} tested overall · errors ${count('error')} · warnings ${count('warn')} · clean ${count('clean')}`);
  console.log(`Open ${path.resolve('SNIPPET-QA.html')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
