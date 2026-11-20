'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

/* ── Models ──────────────────────────────────────────────────────────────────
   Rates are USD per 1 million tokens (input, output) and the context window in tokens. They change often, so every
   number is editable on the page. Last reviewed 2026-11-20 against the providers' pricing pages and press coverage.
   family: which token-count estimate the model uses (see FAMILY below). */
const MODELS = [
  { id: 'opus-5-5',   name: 'Claude Opus 5.5',   family: 'claude', input: 4,    output: 20,  ctx: 1000000 },
  { id: 'sonnet-5-5', name: 'Claude Sonnet 5.5', family: 'claude', input: 2,    output: 10,  ctx: 1000000 },
  { id: 'haiku-5-5',  name: 'Claude Haiku 5.5',  family: 'claude', input: 0.1,  output: 0.5, ctx: 1000000 },
  { id: 'gpt-5-4',    name: 'GPT-5.4',           family: 'gpt',    input: 2.5,  output: 15,  ctx: 1050000 },
  { id: 'gpt-5',      name: 'GPT-5',             family: 'gpt',    input: 1.25, output: 10,  ctx: 400000 },
  { id: 'custom',     name: 'Your own model',    family: 'gpt',    input: 1,    output: 3,   ctx: 128000 },
];

/* Claude's tokenizer produces somewhat more tokens than OpenAI's for the same English text, so the Claude estimate is the
   base estimate scaled up. These are estimates, not exact counts. */
const FAMILY = {
  gpt:    { label: 'GPT-style',    scale: 1.0 },
  claude: { label: 'Claude-style', scale: 1.12 },
};

const SAMPLES = [
  { id: 'prompt', name: 'Support email prompt', text: null },
  { id: 'article', name: 'Long article', text: null },
  { id: 'code', name: 'Code file', text: null },
  { id: 'json', name: 'JSON data', text: null },
];

const SAMPLE = `Summarise the customer email below in two sentences, then list any action items as bullet points.

Hi team, our checkout page has been throwing a 500 error since Tuesday. Three customers have emailed us, and one of them says the discount code SAVE20 is also being rejected. Can someone look at this before Friday's sale starts?`;

/* ── Token estimate ──────────────────────────────────────────────────────────
   No tokenizer file is downloaded: this walks the text in the same pieces a byte-pair tokenizer tends to produce.
   - short English words are one token, longer words split roughly every 4.5 letters
   - digits run about 3 per token, punctuation about 1 token per mark (a run of the same mark counts once)
   - a space in front of a word rides along with it, line breaks and long indents cost a token
   - CJK characters cost about 1 token each, other non-Latin scripts about 1 per 2 letters, emoji about 2 */
const CJK = /[぀-ヿ㐀-䶿一-鿿가-힯]/;
const PIECES = /[A-Za-zÀ-ɏ]+|\d+|[぀-ヿ㐀-䶿一-鿿가-힯]|\p{L}+|\p{Extended_Pictographic}|\n+|[ \t]{2,}|[ \t]|([^\sA-Za-z\d\p{L}])\1*/gu;

function sampleText(id) {
  if (id === 'article') {
    const p = 'Large language models read text as tokens, not words. A token is a chunk of characters, often a short word or part of a longer one, and every request is billed by the number of tokens that go in and come out. That is why a long document can cost far more than a short question, and why trimming a prompt saves real money when it runs thousands of times. ';
    return (p + 'Teams that watch their token use early tend to avoid two surprises: a bill that is larger than planned, and a request that is rejected because it does not fit in the context window. ').repeat(14).trim();
  }
  if (id === 'code') {
    return `export function groupBy(items, getKey) {
  const groups = new Map();
  for (const item of items) {
    const key = getKey(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

export function summarise(orders) {
  const byCustomer = groupBy(orders, o => o.customerId);
  return [...byCustomer.entries()].map(([id, list]) => ({
    customerId: id,
    orders: list.length,
    total: list.reduce((sum, o) => sum + o.total, 0),
  }));
}`;
  }
  if (id === 'json') {
    const rows = [];
    for (let i = 1; i <= 12; i++) rows.push({ id: 1000 + i, name: 'Customer ' + i, email: 'customer' + i + '@example.com', plan: i % 3 === 0 ? 'pro' : 'free', active: i % 2 === 0, tags: ['trial', 'newsletter'] });
    return JSON.stringify(rows, null, 2);
  }
  return SAMPLE;
}

function estimateBase(text) {
  if (!text) return 0;
  let n = 0;
  const parts = text.match(PIECES) || [];
  for (const p of parts) {
    const c = p.charCodeAt(0);
    if (/^[A-Za-zÀ-ɏ]+$/.test(p)) n += p.length <= 7 ? 1 : Math.ceil(p.length / 4.5);
    else if (/^\d+$/.test(p)) n += Math.ceil(p.length / 3);
    else if (CJK.test(p)) n += 1;
    else if (/^\p{Extended_Pictographic}$/u.test(p)) n += 2;
    else if (/^\p{L}+$/u.test(p)) n += Math.ceil(p.length / 2);
    else if (p[0] === '\n') n += Math.min(p.length, 3) > 1 ? 1 + (p.length > 2 ? 1 : 0) : 1;
    else if (p[0] === ' ' || p[0] === '\t') n += p.length >= 2 ? Math.ceil(p.length / 4) : 0; // a single space joins the next word
    else n += 1;
    void c;
  }
  return n;
}

const STORE_KEY = 'wdp-token-counter-v1';
const CACHE_READ = 0.1; // cached input is billed at about 10 percent of the normal input rate
const BATCH_RATE = 0.5; // batch APIs are about half price

const fmt = n => Math.round(n).toLocaleString('en-US');
function money(v) {
  if (!isFinite(v)) return '-';
  if (v === 0) return '$0';
  if (v < 0.0001) return '<$0.0001';
  if (v < 1) return '$' + v.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TokenCounterTool() {
  const [text, setText] = useState(SAMPLE);
  const [outTokens, setOutTokens] = useState(500);
  const [calls, setCalls] = useState(1000);
  const [rows, setRows] = useState(() => MODELS.map(m => ({ ...m })));
  const [copied, setCopied] = useState(false);
  const [cache, setCache] = useState(0);      // share of the input that is read from the prompt cache, 0 to 100
  const [batch, setBatch] = useState(false);  // batch API discount
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef(null);

  /* remember the last session in this browser only */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.text === 'string') setText(d.text);
        if (d.outTokens !== undefined) setOutTokens(d.outTokens);
        if (d.calls !== undefined) setCalls(d.calls);
        if (d.cache !== undefined) setCache(d.cache);
        if (typeof d.batch === 'boolean') setBatch(d.batch);
        if (Array.isArray(d.rows) && d.rows.length === MODELS.length) setRows(MODELS.map((m, i) => ({ ...m, ...d.rows[i], id: m.id, family: m.family })));
      }
    } catch (e) {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ text: text.length < 200000 ? text : '', outTokens, calls, cache, batch, rows })); } catch (e) {}
  }, [loaded, text, outTokens, calls, cache, batch, rows]);

  const base = useMemo(() => estimateBase(text), [text]);
  const chars = text.length;
  const words = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  const lines = useMemo(() => (text ? text.split('\n').length : 0), [text]);

  const results = useMemo(() => rows.map(r => {
    const tokens = Math.round(base * FAMILY[r.family].scale);
    const share = Math.min(100, Math.max(0, Number(cache) || 0)) / 100;
    const inRate = r.input * ((1 - share) + share * CACHE_READ);
    const per = ((tokens * inRate + Number(outTokens || 0) * r.output) / 1e6) * (batch ? BATCH_RATE : 1);
    const need = tokens + Number(outTokens || 0);
    return { ...r, tokens, per, total: per * Number(calls || 0), pct: r.ctx ? (tokens / r.ctx) * 100 : 0, fits: need <= r.ctx };
  }), [rows, base, outTokens, calls, cache, batch]);

  const cheapest = useMemo(() => {
    const live = results.filter(r => r.id !== 'custom');
    return live.length ? live.reduce((a, b) => (b.per < a.per ? b : a)).id : '';
  }, [results]);

  const cheapestRow = results.find(r => r.id === cheapest);
  const pages = Math.max(0, base) / 500; // about 500 tokens to a page of text
  const sizeNote = !base ? 'Nothing pasted yet' : pages < 0.2 ? 'A few sentences' : pages < 1.5 ? 'About ' + (pages < 0.75 ? 'half a page' : 'a page') + ' of text' : 'About ' + fmt(pages) + ' pages of text';

  function setRate(id, key, value) {
    setRows(rows.map(r => (r.id === id ? { ...r, [key]: value === '' ? '' : Math.max(0, Number(value)) } : r)));
  }
  function resetRates() { setRows(MODELS.map(m => ({ ...m }))); setCache(0); setBatch(false); }

  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) { alert('That file is over 4 MB. Paste the part you want to count instead.'); e.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || ''));
    reader.readAsText(f);
    e.target.value = '';
  }

  function copySummary() {
    const extras = (Number(cache) > 0 ? ', ' + cache + '% cached input' : '') + (batch ? ', batch pricing' : '');
    const lines2 = [
      'Token estimate (' + fmt(chars) + ' characters, ' + fmt(words) + ' words)',
      ...results.map(r => r.name + ': ~' + fmt(r.tokens) + ' input tokens, about ' + money(r.per) + ' per call with ' + fmt(outTokens || 0) + ' output tokens' + extras),
      'Counted at webdevpuneet.com/token-counter/',
    ];
    try { navigator.clipboard.writeText(lines2.join('\n')); } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap} style={{ '--accent': '#f59e0b' }}>
      <TextToolsTopNav active="token-counter" />
      <div className={s.header}>
        <div className={s.logo}><span className={s.logoIcon}>T</span><span>Token Counter <span className={s.accent}>&amp; AI Cost</span></span></div>
        <span className={s.hint}>Estimates in your browser. Nothing is uploaded.</span>
      </div>
      <div className={s.body}>
        <div className={s.cols}>
          <section className={s.panel}>
            <div className={s.panelHeader}>
              <div className={s.panelTitle}>Your text or prompt</div>
              <div className={s.actions}>
                <button type="button" onClick={() => fileRef.current && fileRef.current.click()}>Open file</button>
                <button type="button" onClick={() => setText('')}>Clear</button>
                <select className={s.sampleSel} value="" onChange={e => { if (e.target.value) setText(sampleText(e.target.value)); }} aria-label="Load a sample">
                  <option value="">Sample...</option>
                  {SAMPLES.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
                </select>
                <input ref={fileRef} type="file" accept=".txt,.md,.json,.csv,.html,.css,.js,.ts,.tsx,.jsx,.py,.log,text/*" hidden onChange={onFile} />
              </div>
            </div>
            <textarea className={s.input} value={text} onChange={e => setText(e.target.value)} spellCheck={false} placeholder="Paste a prompt, document or code here to see how many tokens it uses..." aria-label="Text to count" />
            <div className={s.stats}>
              <span className={s.pill}><strong>{fmt(chars)}</strong> character{chars === 1 ? '' : 's'}</span>
              <span className={s.pill}><strong>{fmt(words)}</strong> word{words === 1 ? '' : 's'}</span>
              <span className={s.pill}><strong>{fmt(lines)}</strong> line{lines === 1 ? '' : 's'}</span>
              <span className={s.pill}>GPT-style <strong>~{fmt(base)}</strong> tokens</span>
              <span className={s.pill}>Claude-style <strong>~{fmt(base * FAMILY.claude.scale)}</strong> tokens</span>
            </div>
            <div className={s.cards}>
              <div className={s.card}><span>Size</span><strong>{sizeNote}</strong></div>
              <div className={s.card}><span>Cheapest per call</span><strong>{cheapestRow ? money(cheapestRow.per) : '-'}</strong><em>{cheapestRow ? cheapestRow.name : ''}</em></div>
              <div className={s.card}><span>{fmt(calls || 0)} calls, cheapest</span><strong>{cheapestRow ? money(cheapestRow.total) : '-'}</strong><em>{batch ? 'batch price' : 'standard price'}</em></div>
            </div>
          </section>

          <section className={s.panel}>
            <div className={s.panelTitle}>Cost settings</div>
            <label className={s.field}><span>Expected reply length (output tokens)</span>
              <input type="number" min="0" value={outTokens} onChange={e => setOutTokens(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} />
            </label>
            <div className={s.presets}>
              {[['Short', 200], ['Paragraph', 500], ['A page', 800], ['Long', 2000], ['Code file', 4000]].map(([n, v]) => (
                <button key={n} type="button" className={Number(outTokens) === v ? s.presetOn : ''} onClick={() => setOutTokens(v)} title={v + ' tokens'}>{n}</button>
              ))}
            </div>
            <label className={s.field}><span>How many times will you send it? (calls)</span>
              <input type="number" min="0" value={calls} onChange={e => setCalls(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} />
            </label>
            <div className={s.presets}>
              {[1, 100, 1000, 10000, 100000].map(n => (
                <button key={n} type="button" className={Number(calls) === n ? s.presetOn : ''} onClick={() => setCalls(n)}>{n >= 1000 ? fmt(n / 1000) + 'k' : n} call{n === 1 ? '' : 's'}</button>
              ))}
            </div>
            <label className={s.field}><span>Share of the input read from the prompt cache: {cache}%</span>
              <input type="range" min="0" max="100" step="5" value={cache} onChange={e => setCache(Number(e.target.value))} aria-label="Share of input read from the prompt cache" />
            </label>
            <label className={s.check}><input type="checkbox" checked={batch} onChange={e => setBatch(e.target.checked)} /> Batch API (about half price, results come back later)</label>
            <div className={s.notice}>Token counts here are <strong>estimates</strong> (usually within about 10 to 15 percent for English). For an exact count, use the provider&apos;s own token-count endpoint before you send a big job.</div>
          </section>
        </div>

        <section className={s.panel}>
          <div className={s.panelHeader}>
            <div className={s.panelTitle}>Cost and context window by model</div>
            <div className={s.actions}>
              <button type="button" onClick={copySummary}>{copied ? 'Copied' : 'Copy summary'}</button>
              <button type="button" onClick={resetRates}>Reset rates</button>
            </div>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr><th>Model</th><th>Input tokens</th><th>$ in / 1M</th><th>$ out / 1M</th><th>Per call</th><th>{fmt(calls || 0)} calls</th><th>Context window</th></tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.id}>
                    <td data-label="Model"><div className={s.mname}>{r.id === 'custom' ? (
                      <input className={s.nameInput} value={r.name} onChange={e => setRows(rows.map(x => (x.id === r.id ? { ...x, name: e.target.value } : x)))} aria-label="Model name" />
                    ) : r.name}{r.id === cheapest && <em className={s.badge}>cheapest</em>}</div><div className={s.sub}>{FAMILY[r.family].label} estimate</div></td>
                    <td data-label="Input tokens"><strong>~{fmt(r.tokens)}</strong></td>
                    <td data-label="$ in / 1M"><input className={s.rate} type="number" min="0" step="0.01" value={r.input} onChange={e => setRate(r.id, 'input', e.target.value)} aria-label={r.name + ' input price per million tokens'} /></td>
                    <td data-label="$ out / 1M"><input className={s.rate} type="number" min="0" step="0.01" value={r.output} onChange={e => setRate(r.id, 'output', e.target.value)} aria-label={r.name + ' output price per million tokens'} /></td>
                    <td data-label="Per call">{money(r.per)}</td>
                    <td data-label="Total"><strong>{money(r.total)}</strong></td>
                    <td data-label="Context window">
                      <div className={s.ctxTop}>
                        <input className={`${s.rate} ${s.ctxIn}`} type="number" min="0" step="1000" value={r.ctx} onChange={e => setRate(r.id, 'ctx', e.target.value)} aria-label={r.name + ' context window in tokens'} />
                        <span className={r.fits ? s.fit : s.nofit}>{r.fits ? 'fits' : 'too long'}</span>
                      </div>
                      <div className={s.bar} title={r.pct.toFixed(2) + '% of the context window used by the input'}><i style={{ width: Math.min(100, Math.max(r.pct, r.tokens ? 0.6 : 0)) + '%' }} className={r.fits ? '' : s.barOver} /></div>
                      <div className={s.sub}>{r.pct < 0.01 && r.tokens ? '<0.01' : r.pct.toFixed(2)}% used</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.foot}>Prices are US dollars per million tokens and can change, so edit any rate to match the provider&apos;s current pricing page. The table uses the standard text rate. Cached input is counted at 10 percent of the input rate and batch jobs at 50 percent, which match the usual discounts, but the extra cost of writing a cache and any long-prompt surcharge (some models charge more above 100,000 or 272,000 tokens) are not included. Images, audio and tool calls are priced differently.</p>
        </section>
      </div>
    </div>
  );
}
