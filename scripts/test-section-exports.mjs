// Tests every website section template through every export path, in Node (no dev server):
// default / edited (HTML chars, script tags, javascript: links) / empty / max-size content and
// every choice option; save → restore gives the same HTML; React + Vue exports compile (and
// React renders); Website Builder page; a multi-page site with every section and its Next.js
// files. Compiling needs esbuild and @vue/compiler-sfc (not project deps): without them those
// checks are skipped. Run before a deploy:  node scripts/test-section-exports.mjs [idPrefix…]
// Writes the outputs to .section-export-test/ (gitignored) and exits 1 on any issue.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { register, createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// The site's '@/…' import alias (src/…)
const SRC_URL = pathToFileURL(path.join(ROOT, 'src')).href + '/';
register('data:text/javascript,' + encodeURIComponent(`import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
export async function resolve(spec, ctx, next) {
  if (!spec.startsWith('@/')) return next(spec, ctx);
  let u = ${JSON.stringify(SRC_URL)} + spec.slice(2);
  if (!/[.][a-z]+$/.test(u)) u = fs.existsSync(fileURLToPath(u + '.js')) ? u + '.js' : u + '/index.js';
  return next(u, ctx);
}`));
// From the project, or from a folder that has them: SECTION_TEST_DEPS=C:/somewhere/node_modules
const optional = name => import(name).catch(() => (process.env.SECTION_TEST_DEPS
  ? import(pathToFileURL(createRequire(path.join(process.env.SECTION_TEST_DEPS, 'x.js')).resolve(name)).href).catch(() => null)
  : null));
const esbuild = await optional('esbuild');
const vue = await optional('@vue/compiler-sfc');
if (!esbuild || !vue) console.log('(esbuild / @vue/compiler-sfc not installed: React and Vue compile checks skipped)');
const imp = p => import(pathToFileURL(path.join(ROOT, p)).href);
const T = await imp('src/components/SectionTemplates/templates/index.js');
const R = await imp('src/components/SectionTemplates/templates/render.js');
const P = await imp('src/components/SectionTemplates/templates/page.js');
const S = await imp('src/components/SectionTemplates/templates/site.js');
const N = await imp('src/components/SectionTemplates/templates/nextjs.js');
const SS = await imp('src/components/SectionTemplates/templates/section-style.js');
const X = await imp('src/lib/snippet-exporters.js');

const FILTER = process.argv.slice(2);
const OUT = path.join(ROOT, '.section-export-test');
fs.mkdirSync(OUT, { recursive: true });
const issues = [];
const bad = (id, what, detail = '') => issues.push({ id, what, detail: String(detail).slice(0, 400) });

const NASTY = `Tom & Jerry's "best" <b>deal</b> <script>alert(1)</script> <img src=x onerror=alert(2)> 🚀 Ünïcødé`;
const LEFTOVER = /\sdata-(edit|href|image|bg|icon|lines|links|set|show-if|hide-if|optional|list|list-done|item|i-[a-z-]+)=/;
const clone = o => JSON.parse(JSON.stringify(o));

function fuzzState(t, base, mode) {
  const st = clone(base);
  const val = (f, i) => {
    switch (f.type) {
      case 'text': return mode === 'empty' ? '' : `${NASTY} ${i}`;
      case 'textarea': return mode === 'empty' ? '' : `${NASTY}\nSecond line & more ${i}`;
      case 'lines': return mode === 'empty' ? '' : `One <i>x</i>\nTwo & three\n\n${NASTY}`;
      case 'links': return mode === 'empty' ? '' : `Home | index.html\nBad | javascript:alert(1)\nNo url\nQuery | https://example.com/?a=1&b="2"`;
      case 'url': return mode === 'empty' ? '' : (i % 2 ? 'javascript:alert(1)' : 'https://example.com/path?a=1&b=2#x"y');
      case 'image': return mode === 'empty' ? '' : 'https://example.com/img.jpg?x=1&y=2';
      case 'icon': return mode === 'empty' ? '' : 'not-a-real-icon';
      case 'choice': { const o = f.options || []; const v = o[(i + 1) % Math.max(1, o.length)]; return Array.isArray(v) ? v[0] : (v?.value ?? v ?? f.value); }
      case 'check': return mode === 'empty' ? '' : 'yes';
      default: return f.value ?? '';
    }
  };
  t.fields.forEach((f, i) => { if (f.type !== 'switch') st.fields[f.key] = /html/i.test(f.key) && mode !== 'empty' ? '<p class="x">Free <strong>shipping</strong><br><img src="https://example.com/a.png" alt="badge"></p>' : val(f, i); });
  for (const k of Object.keys(st.toggles)) st.toggles[k] = mode === 'empty' ? false : !st.toggles[k];
  for (const l of t.lists || []) {
    if (mode === 'empty') st.lists[l.key] = [];
    else if (mode === 'max') {
      const n = l.max || 24;
      st.lists[l.key] = Array.from({ length: n }, (_, j) => T.listItem(l, Object.fromEntries(l.fields.map((f, i) => [f.key, val(f, i + j)])), `m${j}`));
    }
  }
  return st;
}

function checkHtml(id, label, html) {
  if (LEFTOVER.test(html)) bad(id, `${label}: binding attribute left in export`, html.match(LEFTOVER)[0]);
  if (/<script>alert\(1\)/i.test(html)) bad(id, `${label}: text field HTML not escaped (script)`);
  if (/<img src=x onerror/i.test(html)) bad(id, `${label}: text field HTML not escaped (img onerror)`);
  if (/href="\s*javascript:/i.test(html)) bad(id, `${label}: javascript: URL in href`);
  if (/undefined|\[object Object\]|NaN(?![\w-])/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    const m = html.replace(/<script[\s\S]*?<\/script>/g, '').match(/.{0,60}(undefined|\[object Object\]|NaN(?![\w-])).{0,40}/);
    bad(id, `${label}: "undefined/NaN/[object Object]" in output`, m?.[0]);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) bad(id, `${label}: duplicate id`, [...new Set(dup)].join(', '));
}

async function compileReact(id, label, code) {
  if (!esbuild) return;
  try {
    const r = await esbuild.transform(code, { loader: 'jsx', format: 'esm', jsx: 'automatic' });
    // Render on the server: catches bad style objects, attribute errors, invalid nesting warnings
    const file = path.join(OUT, `${id}-${label}.mjs`);
    fs.writeFileSync(file, r.code);
    const errs = [];
    const orig = console.error;
    console.error = (...a) => errs.push(a.map(String).join(' '));
    try {
      const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
      renderToStaticMarkup(React.createElement(mod.default));
    } finally { console.error = orig; }
    const real = errs.filter(e => !/useLayoutEffect/.test(e));
    if (real.length) bad(id, `${label}: React warnings on render`, real[0]);
  } catch (e) { bad(id, `${label}: React compile/render failed`, e.message); }
}

function compileVue(id, label, code) {
  if (!vue) return;
  const { parse: parseSfc, compileScript, compileTemplate } = vue;
  try {
    const { descriptor, errors } = parseSfc(code, { filename: `${id}.vue` });
    if (errors.length) return bad(id, `${label}: Vue SFC parse error`, errors[0].message || errors[0]);
    let bindings;
    if (descriptor.scriptSetup || descriptor.script) {
      const sc = compileScript(descriptor, { id });
      bindings = sc.bindings;
    }
    const tp = compileTemplate({ source: descriptor.template.content, filename: `${id}.vue`, id, compilerOptions: { bindingMetadata: bindings } });
    if (tp.errors.length) bad(id, `${label}: Vue template compile error`, tp.errors[0].message || tp.errors[0]);
    if (tp.tips?.length) bad(id, `${label}: Vue template tip`, tp.tips[0]);
  } catch (e) { bad(id, `${label}: Vue compile failed`, e.message); }
}

const list = T.SECTION_TEMPLATES.filter(t => !FILTER.length || FILTER.some(f => t.id.startsWith(f)));
const all = [...list, ...(FILTER.length ? [] : T.CUSTOM_TEMPLATES)];
let n = 0;
for (const t of all) {
  const id = t.id;
  const def = T.defaultSectionState(t);
  const variants = { default: def, edited: fuzzState(t, def, 'edited'), empty: fuzzState(t, def, 'empty'), max: fuzzState(t, def, 'max') };
  // Every choice option renders
  for (const f of t.fields.filter(f => f.type === 'choice')) {
    for (const o of f.options || []) {
      const v = Array.isArray(o) ? o[0] : o?.value ?? o;
      const st = clone(def); st.fields[f.key] = v;
      variants[`choice-${f.key}=${v}`] = st;
    }
  }
  // Look panel options
  variants.look = { ...clone(def), style: { scheme: 'inverted', top: '50', bottom: '200', hide: 'phone', css: '.x{color:red}' } };
  variants.motion = { ...clone(def), motion: { ...def.motion, preset: 'fade-up' } };

  for (const [vn, st] of Object.entries(variants)) {
    let html;
    try { html = R.documentHtml(t, st, { clean: true }); } catch (e) { bad(id, `${vn}: documentHtml threw`, e.stack); continue; }
    try { R.documentHtml(t, st, { clean: false }); } catch (e) { bad(id, `${vn}: preview render threw`, e.message); }
    checkHtml(id, vn, html);
    if (vn === 'default' || vn === 'edited' || vn === 'empty') fs.writeFileSync(path.join(OUT, `${id}.${vn}.html`), html);
    // Save → reload gives the same page
    try {
      const back = T.restoreSectionState(t, JSON.parse(JSON.stringify(st)));
      const html2 = R.documentHtml(t, back, { clean: true });
      if (html2 !== html && vn !== 'look') {
        let i = 0; while (html[i] === html2[i]) i++;
        bad(id, `${vn}: changed after save/restore`, `…${html.slice(i - 60, i + 60)}… VS …${html2.slice(i - 60, i + 60)}…`);
      }
    } catch (e) { bad(id, `${vn}: restore threw`, e.message); }
  }

  // React + Vue exports (default and edited content)
  for (const vn of ['default', 'edited']) {
    try {
      const parts = R.snippetParts(t, variants[vn], {});
      await compileReact(id, `react-${vn}`, X.toReactComponent(parts));
      compileVue(id, `vue-${vn}`, X.toVueSfc(parts));
      fs.writeFileSync(path.join(OUT, `${id}.${vn}.jsx`), X.toReactComponent(parts));
      fs.writeFileSync(path.join(OUT, `${id}.${vn}.vue`), X.toVueSfc(parts));
    } catch (e) { bad(id, `${vn}: snippetParts/export threw`, e.message); }
  }

  // Website Builder: section sent from the editor (incoming) and added from the picker
  try {
    const page = P.emptyPage('Test');
    const sec = P.newPageSection(id, []);
    if (!sec) { bad(id, 'newPageSection returned null'); continue; }
    const { style: lookIn, ...inState } = T.restoreSectionState(t, JSON.parse(JSON.stringify(variants.edited)));
    const incoming = { uid: P.newUid(), tpl: id, anchor: P.defaultAnchor(id, [sec]), state: inState };
    page.sections = [sec, incoming];
    const html = P.pageDocumentHtml(page, { clean: true });
    checkHtml(id, 'builder-page', html);
    const restored = P.restorePage(JSON.parse(JSON.stringify(page)));
    if (P.pageDocumentHtml(restored, { clean: true }) !== html) bad(id, 'builder page changed after save/restore');
  } catch (e) { bad(id, 'builder page threw', e.stack); }
  n++;
}

// One multi-page site with every section, split over pages → static files + Next.js
try {
  let site = S.emptySite('Harness site');
  const ids = list.map(t => t.id);
  const pages = [];
  for (let i = 0; i < ids.length; i += 10) pages.push(ids.slice(i, i + 10));
  site = { ...site, pages: [] };
  pages.forEach((chunk, i) => {
    const secs = [];
    for (const tid of chunk) secs.push(P.newPageSection(tid, secs));
    site.pages.push({ ...S.newSitePage({ pages: site.pages }, i ? `Page ${i}` : 'Home', secs), slug: i ? `page-${i}` : 'home', inNav: true });
  });
  site = S.restoreSite(JSON.parse(JSON.stringify(site)));
  const files = S.siteFiles(site, {});
  const dir = path.join(OUT, 'site'); fs.rmSync(dir, { recursive: true, force: true });
  for (const f of files) { fs.mkdirSync(path.dirname(path.join(dir, f.path)), { recursive: true }); fs.writeFileSync(path.join(dir, f.path), f.base64 ? Buffer.from(f.content, 'base64') : f.content); }
  for (const f of files.filter(f => f.path.endsWith('.html'))) checkHtml('SITE', f.path, f.content);
  const next = N.siteNextFiles(site, files);
  const ndir = path.join(OUT, 'next'); fs.rmSync(ndir, { recursive: true, force: true });
  for (const f of next) { fs.mkdirSync(path.dirname(path.join(ndir, f.path)), { recursive: true }); fs.writeFileSync(path.join(ndir, f.path), f.base64 ? Buffer.from(f.content, 'base64') : f.content); }
  for (const f of esbuild ? next.filter(f => /\.(jsx?|mjs)$/.test(f.path)) : []) {
    try { await esbuild.transform(f.content, { loader: 'jsx', format: 'esm', jsx: 'automatic' }); }
    catch (e) { bad('NEXT', `${f.path} does not compile`, e.message); }
  }
  console.log(`site: ${site.pages.length} pages, ${files.length} files, next: ${next.length} files`);
} catch (e) { bad('SITE', 'site export threw', e.stack); }

fs.writeFileSync(path.join(OUT, 'issues.json'), JSON.stringify(issues, null, 2));
const byWhat = {};
for (const i of issues) (byWhat[i.what.replace(/^[^:]*: /, '')] ||= new Set()).add(i.id);
console.log(`${n} sections tested, ${issues.length} issues`);
for (const [w, ids] of Object.entries(byWhat)) console.log(`- ${w} (${ids.size}): ${[...ids].slice(0, 12).join(', ')}${ids.size > 12 ? ' …' : ''}`);
process.exit(issues.length ? 1 : 0);
