// Builds SNIPPET-QA.html (project root): one page, styled like TEMPLATES-ROADMAP.html, listing
// every UI snippet in a single table with its functionality, look & feel, improvement areas,
// status and last check, plus progress counters, progress by category and a session log.
//
// Sources (both in snippet-qa/):
//   results.json  automated checks, written by scripts/snippet-qa.mjs
//   review.json   the manual review, updated each session as snippets are checked and fixed:
//     { "log": [{ "date": "YYYY-MM-DD", "note": "…" }],
//       "items": { "<id>": { "status": "ok|improve|broken|fixed",
//                            "func": { "result": "pass|issue", "note": "…" },
//                            "look": { "result": "pass|issue", "note": "…" },
//                            "seo":  { "result": "pass|issue", "note": "…" },   (pass hides the auto SEO findings)
//                            "improve": ["…"], "reviewedAt": "YYYY-MM-DD", "fixedAt": "YYYY-MM-DD" } } }
//
//   node scripts/snippet-qa-report.mjs   rebuild the page without running any tests
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const ROOT = path.resolve('snippet-qa');
const OUT = path.resolve('SNIPPET-QA.html');
const LIVE = 'https://webdevpuneet.com/ui-snippets/';

export const srcHash = s => createHash('sha1').update(`${s.html}\n/*css*/${s.css}\n/*js*/${s.js}\n${(s.cdnUrls || []).join(',')}`).digest('hex').slice(0, 12);
const readJson = async (p, def) => { try { return JSON.parse(await readFile(p, 'utf8')); } catch { return def; } };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const STATUS = {
  todo: ['Not started', 'todo'],
  auto: ['Auto-checked', 'auto'],
  ok: ['OK', 'done'],
  improve: ['Needs work', 'doing'],
  broken: ['Broken', 'bad'],
  fixed: ['Fixed', 'fixed'],
};

// Auto findings → the two review columns (manual review notes take priority when present)
function autoColumn(r, areas) {
  if (!r) return '<span class="muted">—</span>';
  const fs = (r.findings || []).filter(f => areas.includes(f.area));
  const worst = fs.some(f => f.sev === 'error') ? 'bad' : fs.some(f => f.sev === 'warn') ? 'doing' : null;
  const head = worst ? `<span class="pill ${worst}">${fs.filter(f => f.sev !== 'info').length || fs.length} issue${fs.length > 1 ? 's' : ''}</span>` : '<span class="pill done">pass</span>';
  const facts = [];
  if (areas.includes('functionality')) {
    if (r.controls) facts.push(`${(r.changed || []).length}/${r.controls} controls respond`);
    if (r.keyboardResponds != null) facts.push(`keys ${r.keyboardResponds ? '✓' : '✗'}`);
    if (r.scrollResponds != null) facts.push(`scroll ${r.scrollResponds ? '✓' : '✗'}`);
  }
  const list = fs.length ? `<ul>${fs.map(f => `<li class="sev-${f.sev}">${esc(f.msg)}</li>`).join('')}</ul>` : '';
  return `${head} <span class="muted">auto${facts.length ? ' · ' + facts.join(' · ') : ''}</span>${list ? `<details><summary>details</summary>${list}</details>` : ''}`;
}
/* SEO content checks: static, run on every build for every snippet. Limits follow the site's
   rule (title 50–60 chars, max 60; description 150–160, max 160) and the use-case rules
   (4–6 entries, 18–42 words each). */
const words = t => String(t || '').trim().split(/\s+/).filter(Boolean).length;
// Browser / React / JS names a description may mention without the snippet defining them
const BUILTIN = new Set('requestAnimationFrame cancelAnimationFrame setInterval setTimeout clearInterval clearTimeout querySelector querySelectorAll addEventListener removeEventListener fetch getComputedStyle getBoundingClientRect getElementById preventDefault stopPropagation toggle classList appendChild createElement map filter reduce forEach push pop shift splice slice sort join split includes random floor round toFixed scrollTo scrollIntoView focus blur click observe disconnect useState useEffect useRef useMemo useCallback setState parse stringify now toLocaleString toISOString matchMedia getItem setItem play pause writeText then animate'.split(' '));
export function seoFindings(s, ctx) {
  const seo = s.seo || {}, f = [];
  const add = (sev, msg) => f.push({ sev, area: 'seo', msg });
  const t = (seo.title || '').length, d = (seo.description || '').length;
  if (!t) add('warn', 'No SEO title');
  else if (t > 60) add('warn', `SEO title is ${t} chars (max 60)`);
  else if (t < 50) add('info', `SEO title is ${t} chars (aim for 50–60)`);
  if (!d) add('warn', 'No meta description');
  else if (d > 160) add('warn', `Meta description is ${d} chars (max 160)`);
  else if (d < 150) add('info', `Meta description is ${d} chars (aim for 150–160)`);
  if (t && ctx.titleCount[seo.title] > 1) add('warn', 'SEO title is used by another snippet too');
  const aw = words(seo.about?.description);
  if (aw < 150) add('warn', `About section is thin (${aw} words)`);
  else if (aw < 250) add('info', `About section is short (${aw} words)`);
  if (!seo.howToUse?.items?.length) add('warn', 'No "How to use" steps');
  else if (seo.howToUse.items.length < 4) add('info', `Only ${seo.howToUse.items.length} "How to use" steps`);
  if ((seo.features?.length || 0) < 5) add('info', `Only ${seo.features?.length || 0} features listed`);
  const uc = (seo.useCases || []).filter(u => !/^Related:/.test(u.title || ''));
  if (uc.length < 4) add('info', `Only ${uc.length} use cases (aim for 4–6)`);
  const thinUc = uc.filter(u => words(u.text || u.desc) < 18).length;
  if (thinUc) add('info', `${thinUc} use case${thinUc > 1 ? 's are' : ' is'} under 18 words`);
  if ((seo.faqs?.length || 0) < 4) add(seo.faqs?.length ? 'info' : 'warn', `Only ${seo.faqs?.length || 0} FAQs`);
  const shortFaq = (seo.faqs || []).filter(q => words(q.a) < 20).length;
  if (shortFaq) add('info', `${shortFaq} FAQ answer${shortFaq > 1 ? 's are' : ' is'} under 20 words`);
  if (!seo.aiPrompt) add('info', 'No AI prompt section');
  const blob = JSON.stringify(seo);
  const broken = [...new Set([...blob.matchAll(/\/ui-snippets\/([a-z0-9-]+)/g)].map(m => m[1]).filter(id => !ctx.ids.has(id) && id !== 'mycode' && id !== 'category'))];
  if (broken.length) add('warn', `Links to snippets that don't exist: ${broken.join(', ')}`);
  // The write-up names functions, classes or constants the code doesn't have (stale after an edit?)
  const code = `${s.html}\n${s.css}\n${s.js}`;
  const text = [seo.about?.description, ...(seo.howToUse?.items || []).map(i => i.text), ...(seo.faqs || []).map(q => q.a)].join('\n');
  const miss = new Set();
  for (const m of text.matchAll(/\b([a-z][A-Za-z0-9]{2,})\(\)/g)) if (!BUILTIN.has(m[1]) && !code.includes(m[1])) miss.add(`${m[1]}()`);
  for (const m of text.matchAll(/`\.([a-z][\w-]{2,})`/g)) if (!code.includes(m[1])) miss.add(`.${m[1]}`);
  for (const m of text.matchAll(/`([A-Z][A-Z0-9_]{3,})`/g)) if (!code.includes(m[1])) miss.add(m[1]);
  for (const m of text.matchAll(/`(--[\w-]+)`/g)) if (!code.includes(m[1])) miss.add(m[1]);
  if (miss.size) add('warn', `Write-up mentions ${[...miss].slice(0, 5).join(', ')}${miss.size > 5 ? '…' : ''} but the code has no such name (stale or wrong description?)`);
  return f;
}
function seoColumn(fs) {
  if (!fs.length) return '<span class="pill done">pass</span>';
  const warns = fs.filter(x => x.sev === 'warn').length;
  return `<span class="pill ${warns ? 'doing' : 'todo'}">${warns ? `${warns} issue${warns > 1 ? 's' : ''}` : 'minor'}</span><details><summary>details</summary><ul>${fs.map(x => `<li class="sev-${x.sev}">${esc(x.msg)}</li>`).join('')}</ul></details>`;
}

function reviewColumn(v) {
  if (!v) return null;
  return `<span class="pill ${v.result === 'pass' ? 'done' : 'doing'}">${v.result === 'pass' ? 'pass' : 'issue'}</span>${v.note ? ` ${esc(v.note)}` : ''}`;
}

export async function buildReport() {
  const results = await readJson(path.join(ROOT, 'results.json'), {});
  const review = await readJson(path.join(ROOT, 'review.json'), { log: [], items: {} });
  const items = review.items || {};
  const cats = [...new Set(SNIPPETS.map(s => s.category))].sort();

  const rows = [];
  const counts = { todo: 0, auto: 0, ok: 0, improve: 0, broken: 0, fixed: 0 };
  const byCat = Object.fromEntries(cats.map(c => [c, { n: 0, auto: 0, reviewed: 0, ok: 0, improve: 0, broken: 0, fixed: 0, autoErr: 0, seo: 0 }]));
  let autoErr = 0, autoWarn = 0, changed = 0, seoBad = 0;
  const ctx = { ids: new Set(SNIPPETS.map(s => s.id)), titleCount: {} };
  SNIPPETS.forEach(s => { const k = s.seo?.title; if (k) ctx.titleCount[k] = (ctx.titleCount[k] || 0) + 1; });

  SNIPPETS.forEach((s, i) => {
    const r = results[s.id], m = items[s.id] || {};
    const status = m.status || (r ? 'auto' : 'todo');
    counts[status]++;
    const c = byCat[s.category];
    c.n++;
    if (r) c.auto++;
    if (m.status) { c.reviewed++; c[m.status]++; }
    if (r?.verdict === 'error') { autoErr++; c.autoErr++; }
    if (r?.verdict === 'warn') autoWarn++;
    const seoF = m.seo?.result === 'pass' ? [] : seoFindings(s, ctx);
    const seoIssue = seoF.some(x => x.sev === 'warn');
    if (seoIssue) { seoBad++; c.seo++; }
    const stale = r && r.hash !== srcHash(s);
    if (stale) changed++;

    const improve = [
      ...(m.improve || []).map(x => `<li>${esc(x)}</li>`),
      ...(!m.improve && r ? (r.findings || []).filter(f => f.area === 'improve' || f.area === 'a11y').map(f => `<li class="muted">${esc(f.msg)}</li>`) : []),
    ];
    const autoPill = r ? `<span class="pill ${{ error: 'bad', warn: 'doing', clean: 'done' }[r.verdict] || 'todo'}" title="Automated test result">${{ error: 'errors', warn: 'warnings', clean: 'clean' }[r.verdict] || '?'}</span>` : '';
    rows.push(`<tr data-cat="${s.category}" data-status="${status}" data-auto="${r ? r.verdict : 'none'}" data-seo="${seoIssue ? 'issue' : 'ok'}" data-q="${esc((s.title + ' ' + s.id).toLowerCase())}">
<td class="n">${i + 1}</td>
<td><a href="${LIVE}${s.id}/" target="_blank" rel="noopener">${esc(s.title)}</a><div class="muted id">${s.id}</div></td>
<td>${s.category}</td>
<td>${reviewColumn(m.func) || autoColumn(r, ['functionality'])}</td>
<td>${reviewColumn(m.look) || autoColumn(r, ['look'])}</td>
<td>${m.seo?.note ? `<span class="pill ${m.seo.result === 'pass' ? 'done' : 'doing'}">${m.seo.result === 'pass' ? 'pass' : 'issue'}</span> ${esc(m.seo.note)}` : seoColumn(seoF)}</td>
<td>${improve.length ? `<ul>${improve.join('')}</ul>` : '<span class="muted">—</span>'}</td>
<td><span class="pill ${STATUS[status][1]}">${STATUS[status][0]}</span>${autoPill ? `<div style="margin-top:4px">${autoPill}</div>` : ''}${stale ? '<div class="muted">code changed, retest</div>' : ''}</td>
<td class="muted">${m.fixedAt ? `fixed ${m.fixedAt}<br>` : ''}${m.reviewedAt ? `reviewed ${m.reviewedAt}<br>` : ''}${r ? `auto ${r.testedAt.slice(0, 10)}` : ''}</td>
</tr>`);
  });

  const n = SNIPPETS.length;
  const reviewed = counts.ok + counts.improve + counts.broken + counts.fixed;
  const tested = Object.keys(results).filter(id => SNIPPETS.some(s => s.id === id)).length;
  const pct = x => `${Math.round((x / n) * 1000) / 10}%`;
  const nextCat = cats.find(c => byCat[c].reviewed < byCat[c].n);
  const seg = (k, cls) => (counts[k] ? `<span class="${cls}" style="width:${(counts[k] / n) * 100}%" title="${STATUS[k][0]}: ${counts[k]}"></span>` : '');
  const today = new Date().toISOString().slice(0, 10);
  const log = (review.log || []).slice().reverse();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>UI Snippets — QA Tracker</title>
<!-- Generated by scripts/snippet-qa-report.mjs from snippet-qa/results.json + snippet-qa/review.json. Don't edit by hand. -->
<style>
  :root {
    --bg: #f7f7f4; --card: #ffffff; --text: #1c1b18; --muted: #6b675d; --line: #e4e0d5;
    --accent: #0f766e; --accent-soft: #e6f4f1; --done: #15803d; --doing: #b45309; --todo: #64748b; --bad: #b91c1c; --fixed: #0369a1; --auto: #7c3aed; --code: #f1efe8;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #14130f; --card: #1d1c18; --text: #ecebe4; --muted: #a8a397; --line: #34322b; --accent: #5eead4; --accent-soft: #10302c; --done: #4ade80; --doing: #fbbf24; --todo: #94a3b8; --bad: #f87171; --fixed: #38bdf8; --auto: #a78bfa; --code: #2a2822; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; }
  .wrap { max-width: 1500px; margin: 0 auto; padding: 32px 20px 80px; }
  header h1 { font-size: 30px; line-height: 1.2; margin: 0 0 6px; }
  header p { margin: 0 0 4px; color: var(--muted); }
  nav.toc { margin: 20px 0 8px; display: flex; flex-wrap: wrap; gap: 6px; }
  nav.toc a { font-size: 13px; padding: 5px 10px; border: 1px solid var(--line); border-radius: 99px; color: var(--text); text-decoration: none; background: var(--card); }
  nav.toc a:hover { border-color: var(--accent); }
  section { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 22px 24px; margin: 18px 0; }
  .next { border: 2px solid var(--accent); }
  h2 { font-size: 21px; margin: 0 0 12px; }
  p { margin: 0 0 10px; }
  a { color: var(--accent); }
  code { background: var(--code); padding: 1px 6px; border-radius: 5px; font-size: 13px; }
  .callout { background: var(--accent-soft); border-left: 4px solid var(--accent); padding: 12px 16px; border-radius: 8px; margin: 10px 0; }
  .muted { color: var(--muted); font-size: 13px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 14px 0; }
  .stat { border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; }
  .stat b { display: block; font-size: 24px; font-variant-numeric: tabular-nums; }
  .stat span { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; }
  .bar { display: flex; height: 12px; border-radius: 99px; overflow: hidden; background: var(--code); margin: 6px 0 4px; }
  .bar span { display: block; height: 100%; }
  .b-done { background: var(--done); } .b-fixed { background: var(--fixed); } .b-doing { background: var(--doing); } .b-bad { background: var(--bad); } .b-auto { background: color-mix(in srgb, var(--auto) 45%, transparent); }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { font-size: 11.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); background: var(--card); }
  td.n { text-align: right; color: var(--muted); font-variant-numeric: tabular-nums; }
  td ul { margin: 4px 0 0; padding-left: 16px; }
  td li { margin: 2px 0; }
  .id { font-family: ui-monospace, monospace; font-size: 11.5px; }
  .pill { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 99px; letter-spacing: .03em; white-space: nowrap; }
  .done { background: color-mix(in srgb, var(--done) 16%, transparent); color: var(--done); }
  .doing { background: color-mix(in srgb, var(--doing) 18%, transparent); color: var(--doing); }
  .todo { background: color-mix(in srgb, var(--todo) 16%, transparent); color: var(--todo); }
  .bad { background: color-mix(in srgb, var(--bad) 15%, transparent); color: var(--bad); }
  .fixed { background: color-mix(in srgb, var(--fixed) 15%, transparent); color: var(--fixed); }
  .auto { background: color-mix(in srgb, var(--auto) 15%, transparent); color: var(--auto); }
  .sev-error { color: var(--bad); } .sev-warn { color: var(--doing); } .sev-info { color: var(--muted); }
  details summary { cursor: pointer; font-size: 12px; color: var(--muted); margin-top: 3px; }
  .mini { height: 6px; border-radius: 99px; background: var(--code); overflow: hidden; min-width: 90px; }
  .mini span { display: block; height: 100%; background: var(--accent); }
  .filters { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 12px; position: sticky; top: 0; background: var(--card); padding: 8px 0; z-index: 2; }
  .filters input, .filters select { font: inherit; font-size: 13px; padding: 6px 10px; border: 1px solid var(--line); border-radius: 8px; background: var(--bg); color: var(--text); }
  .filters input { flex: 1; min-width: 200px; }
  #main thead th { position: sticky; top: 50px; z-index: 1; }
  .tableWrap { overflow-x: auto; }
  #main { min-width: 1100px; }
  #main td:nth-child(4), #main td:nth-child(5), #main td:nth-child(6) { width: 17%; }
  #main td:nth-child(7) { width: 19%; }
  @media (max-width: 640px) { .wrap { padding: 20px 14px 60px; } section { padding: 18px 14px; } }
</style>
</head>
<body>
<div class="wrap">

<header>
  <h1>UI Snippets — QA Tracker</h1>
  <p>Every snippet in the library, checked for <strong>functionality</strong>, <strong>look &amp; feel</strong> and <strong>areas for improvement</strong>, worked through in batches over several days.</p>
  <p class="muted">Last built ${today} · ${n} snippets · File: <code>webdevpuneet/SNIPPET-QA.html</code> (generated, don't edit by hand)</p>
</header>

<nav class="toc" aria-label="Contents">
  <a href="#now">▶ Where we are</a>
  <a href="#cats">Progress by category</a>
  <a href="#how">How it works</a>
  <a href="#log">Session log</a>
  <a href="#all">All snippets</a>
</nav>

<section id="now" class="next">
  <h2>▶ Where we are</h2>
  <div class="stats">
    <div class="stat"><span>Reviewed</span><b>${reviewed} <small class="muted">/ ${n}</small></b><span>${pct(reviewed)}</span></div>
    <div class="stat"><span>Auto-tested</span><b>${tested}</b><span>${pct(tested)}</span></div>
    <div class="stat"><span>OK</span><b style="color:var(--done)">${counts.ok}</b></div>
    <div class="stat"><span>Needs work</span><b style="color:var(--doing)">${counts.improve}</b></div>
    <div class="stat"><span>Broken</span><b style="color:var(--bad)">${counts.broken}</b></div>
    <div class="stat"><span>Fixed</span><b style="color:var(--fixed)">${counts.fixed}</b></div>
    <div class="stat"><span>SEO issues</span><b style="color:var(--doing)">${seoBad}</b></div>
    <div class="stat"><span>Auto errors / warnings</span><b>${autoErr} <small class="muted">/ ${autoWarn}</small></b></div>
  </div>
  <div class="bar">${seg('ok', 'b-done')}${seg('fixed', 'b-fixed')}${seg('improve', 'b-doing')}${seg('broken', 'b-bad')}${seg('auto', 'b-auto')}</div>
  <p class="muted">Green OK · blue fixed · amber needs work · red broken · purple auto-tested only · grey not started</p>
  <div class="callout">
    <strong>Next:</strong> ${tested < n ? `auto-test the remaining ${n - tested} snippets (<code>node scripts/snippet-qa.mjs --limit=200</code>), then ` : ''}${nextCat ? `review the <strong>${nextCat}</strong> category (${byCat[nextCat].n - byCat[nextCat].reviewed} left)` : 'all categories reviewed'}${changed ? ` · ${changed} snippets changed since their auto test` : ''}.
  </div>
</section>

<section id="cats">
  <h2>Progress by category</h2>
  <div class="tableWrap"><table>
    <thead><tr><th>Category</th><th>Snippets</th><th>Auto-tested</th><th>Reviewed</th><th></th><th>OK</th><th>Needs work</th><th>Broken</th><th>Fixed</th><th>Auto errors</th><th>SEO issues</th></tr></thead>
    <tbody>${cats.map(c => { const x = byCat[c]; return `<tr><td><a href="#all" data-jump="${c}">${c}</a></td><td>${x.n}</td><td>${x.auto}</td><td>${x.reviewed}</td><td><div class="mini"><span style="width:${(x.reviewed / x.n) * 100}%"></span></div></td><td>${x.ok}</td><td>${x.improve}</td><td>${x.broken}</td><td>${x.fixed}</td><td>${x.autoErr}</td><td>${x.seo}</td></tr>`; }).join('')}</tbody>
  </table></div>
</section>

<section id="how">
  <h2>How it works</h2>
  <p><strong>1. Automated test</strong> (<code>node scripts/snippet-qa.mjs</code>): runs each snippet in headless Chrome. On desktop it records JS errors, failed loads, blank renders and broken images. It clicks, types into and changes every control, and notes which ones change nothing. Games get a keyboard check and scroll effects a scroll check. At 390px it checks for sideways scrolling and small tap targets. It also flags low-contrast or tiny text, unnamed buttons, unlabelled inputs, missing focus styles and missing reduced-motion support. Only new or changed snippets are retested; <code>--limit=200</code> runs a batch, <code>--category=games</code> one category, <code>--force</code> everything.</p>
  <p><strong>SEO content</strong> (checked on every rebuild, all snippets): title 50–60 chars (max 60), meta description 150–160 (max 160), duplicate titles, thin About text, missing or few How-to steps, features, use cases and FAQs, links to snippets that don't exist, and write-ups that name functions, classes or constants the code doesn't have (a sign the description went stale after an edit).</p>
  <p><strong>2. Manual review</strong>: snippets are opened and checked by hand in batches, and the verdicts go into <code>snippet-qa/review.json</code>. Manual notes replace the auto text in the Functionality and Look &amp; feel columns.</p>
  <p><strong>3. Fix</strong>: snippets marked Needs work or Broken get fixed and marked Fixed, then retested.</p>
  <p><strong>What the checks can't catch</strong>, so the manual review still matters: logic that runs without errors but gives the wrong result (wrong maths, a game rule that's off, walls drawn on the wrong side), whether a design actually looks good, copy that is accurate but unhelpful, and effects that only show over time or on real touch devices. The auto results tell us where to look first; the review decides.</p>
  <p class="muted">Rebuild this page without testing: <code>node scripts/snippet-qa-report.mjs</code>. The auto checks are heuristics: a "control changed nothing" can be a control whose effect is only visual over time, so always confirm by hand before fixing.</p>
</section>

<section id="log">
  <h2>Session log</h2>
  ${log.length ? `<table><thead><tr><th style="width:120px">Date</th><th>What happened</th></tr></thead><tbody>${log.map(l => `<tr><td>${esc(l.date)}</td><td>${esc(l.note)}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">Nothing logged yet.</p>'}
</section>

<section id="all">
  <h2>All snippets</h2>
  <div class="filters">
    <input id="q" type="search" placeholder="Search title or id…" aria-label="Search">
    <select id="fCat" aria-label="Category"><option value="">All categories</option>${cats.map(c => `<option>${c}</option>`).join('')}</select>
    <select id="fStatus" aria-label="Status"><option value="">Any status</option>${Object.entries(STATUS).map(([k, [l]]) => `<option value="${k}">${l}</option>`).join('')}</select>
    <select id="fAuto" aria-label="Auto result"><option value="">Any auto result</option><option value="error">Auto: errors</option><option value="warn">Auto: warnings</option><option value="clean">Auto: clean</option><option value="none">Not auto-tested</option></select>
    <select id="fSeo" aria-label="SEO"><option value="">Any SEO</option><option value="issue">SEO issues</option><option value="ok">SEO ok</option></select>
    <span class="muted" id="shown" style="align-self:center"></span>
  </div>
  <div class="tableWrap"><table id="main">
    <thead><tr><th>#</th><th>Snippet</th><th>Category</th><th>Functionality</th><th>Look &amp; feel</th><th>SEO content</th><th>Areas for improvement</th><th>Status</th><th>Checked</th></tr></thead>
    <tbody>
${rows.join('\n')}
    </tbody>
  </table></div>
</section>

</div>
<script>
const rows = [...document.querySelectorAll('#main tbody tr')];
const val = id => document.getElementById(id).value;
function filter() {
  const q = val('q').trim().toLowerCase(), c = val('fCat'), s = val('fStatus'), a = val('fAuto'), e = val('fSeo');
  let n = 0;
  for (const r of rows) {
    const on = (!q || r.dataset.q.includes(q)) && (!c || r.dataset.cat === c) && (!s || r.dataset.status === s) && (!a || r.dataset.auto === a) && (!e || r.dataset.seo === e);
    r.hidden = !on; if (on) n++;
  }
  document.getElementById('shown').textContent = n + ' of ' + rows.length + ' shown';
}
['q', 'fCat', 'fStatus', 'fAuto', 'fSeo'].forEach(id => document.getElementById(id).addEventListener('input', filter));
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => { document.getElementById('fCat').value = a.dataset.jump; filter(); }));
filter();
</script>
</body>
</html>
`;
  await writeFile(OUT, html);
  return { out: OUT, n, reviewed, tested };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildReport().then(({ out, n, reviewed, tested }) => console.log(`Built ${out} · ${reviewed}/${n} reviewed · ${tested} auto-tested`));
}
