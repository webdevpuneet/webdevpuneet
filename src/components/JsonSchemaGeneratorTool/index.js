'use client';
import { useState, useMemo, useRef } from 'react';
import s from './styles.module.css';
import JsonToolsTopNav from '@/components/JsonToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Schema inference ────────────────────────────────────────────────────── */
function inferSchema(value, depth = 0) {
  if (value === null) return { type: 'null' };
  if (typeof value === 'boolean') return { type: 'boolean' };
  if (typeof value === 'string') return { type: 'string' };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' };
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: 'array', items: {} };
    return { type: 'array', items: inferSchema(value[0], depth + 1) };
  }
  if (typeof value === 'object') {
    const properties = {};
    const required = [];
    for (const [key, val] of Object.entries(value)) {
      properties[key] = inferSchema(val, depth + 1);
      required.push(key);
    }
    const schema = { type: 'object', properties };
    if (required.length) schema.required = required;
    return schema;
  }
  return {};
}

function generateSchema(json) {
  return { '$schema': 'http://json-schema.org/draft-07/schema#', ...inferSchema(json) };
}

/* ── Syntax highlighter ──────────────────────────────────────────────────── */
// Groups: 1+2=key+colon, 3=string value, 4=number, 5=keyword, 6=punct, 7=whitespace
const TOKEN_RE = /("(?:\\.|[^"\\])*")(\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}\[\],])|(\s+)/g;

const TOKEN_COLOR_LIGHT = {
  key:   '#0550ae',
  colon: 'var(--text3)',
  str:   '#b45309',
  num:   '#1d4ed8',
  kw:    '#7c3aed',
  punct: '#374151',
};
const TOKEN_COLOR_DARK = {
  key:   '#4ade9e',
  colon: 'var(--text3)',
  str:   '#fb923c',
  num:   '#60a5fa',
  kw:    '#c084fc',
  punct: 'var(--text3)',
};
function getTokenColor() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark') return TOKEN_COLOR_DARK;
  return TOKEN_COLOR_LIGHT;
}

function tokenize(str) {
  const parts = [];
  let last = 0;
  for (const m of str.matchAll(TOKEN_RE)) {
    if (m.index > last) parts.push({ t: 'text', v: str.slice(last, m.index) });
    if      (m[1]) { parts.push({ t: 'key',   v: m[1] }); parts.push({ t: 'colon', v: m[2] }); }
    else if (m[3]) parts.push({ t: 'str',   v: m[3] });
    else if (m[4]) parts.push({ t: 'num',   v: m[4] });
    else if (m[5]) parts.push({ t: 'kw',    v: m[5] });
    else if (m[6]) parts.push({ t: 'punct', v: m[6] });
    else if (m[7]) parts.push({ t: 'text',  v: m[7] });
    last = m.index + m[0].length;
  }
  if (last < str.length) parts.push({ t: 'text', v: str.slice(last) });
  return parts;
}

function HighlightedJson({ code }) {
  const parts = useMemo(() => tokenize(code), [code]);
  const TC = getTokenColor();
  return (
    <>
      {parts.map((p, i) =>
        p.t === 'text'
          ? p.v
          : <span key={i} style={{ color: TC[p.t] }}>{p.v}</span>
      )}
    </>
  );
}

/* ── Line numbers ────────────────────────────────────────────────────────── */
function LineNums({ count, gutterRef }) {
  return (
    <div className={s.lineNums} ref={gutterRef} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

/* ── Sample ──────────────────────────────────────────────────────────────── */
const SAMPLE = `{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "active": true,
  "score": 98.5,
  "tags": ["admin", "user"],
  "address": {
    "street": "123 Main St",
    "city": "Portland",
    "zip": "97201"
  }
}`;

/* ── Component ───────────────────────────────────────────────────────────── */
export default function JsonSchemaGeneratorTool() {
  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');
  const [copied, setCopied] = useState(false);

  const inputGutterRef  = useRef(null);
  const outputGutterRef = useRef(null);

  const schema = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const parsed = JSON.parse(input);
      setError('');
      return JSON.stringify(generateSchema(parsed), null, 2);
    } catch (e) {
      setError(e.message);
      return null;
    }
  }, [input]);

  function syncScroll(e, ref) {
    if (ref.current) ref.current.scrollTop = e.target.scrollTop;
  }

  function copy() {
    if (!schema) return;
    navigator.clipboard.writeText(schema).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function download() {
    if (!schema) return;
    const blob = new Blob([schema], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'schema.json'; a.click();
    URL.revokeObjectURL(url);
  }

  const inputLineCount  = input  ? input.split('\n').length  : 1;
  const outputLineCount = schema ? schema.split('\n').length : 1;

  return (
    <div className={s.wrap}>
      <JsonToolsTopNav active="json-schema-generator" />
      <PlaygroundTopAd />
      <div className={s.toolbar}>
        <div className={s.titleRow}>
          <img src="/icons/json-schema-generator.svg" alt="" width={26} height={26} className={s.logoIcon} />
          <span className={s.title}>JSON Schema <span className={s.accent}>Generator</span></span>
        </div>
        <div className={s.actions}>
          <button className={s.btn} onClick={() => setInput(SAMPLE)}>Sample</button>
          <button className={s.btn} onClick={() => { setInput(''); setError(''); }}>Clear</button>
          {schema && <button className={s.btn} onClick={copy}>{copied ? 'Copied!' : 'Copy Schema'}</button>}
          {schema && <button className={s.btn} onClick={download}>Download</button>}
        </div>
      </div>

      <div className={s.panels}>
        {/* Input panel */}
        <div className={s.panel}>
          <div className={s.panelHeader}>JSON Input</div>
          <div className={s.panelBody}>
            <LineNums count={inputLineCount} gutterRef={inputGutterRef} />
            <textarea
              className={s.textarea}
              value={input}
              onChange={e => setInput(e.target.value)}
              onScroll={e => syncScroll(e, inputGutterRef)}
              placeholder={'Paste your JSON here...\n\n{\n  "name": "Alice",\n  "age": 30\n}'}
              spellCheck={false}
            />
          </div>
          {error && <div className={s.error}>{error}</div>}
        </div>

        {/* Output panel */}
        <div className={s.panel}>
          <div className={s.panelHeader}>Generated Schema (Draft 7)</div>
          <div className={s.panelBody}>
            <LineNums count={outputLineCount} gutterRef={outputGutterRef} />
            <pre className={s.output} onScroll={e => syncScroll(e, outputGutterRef)}>
              {schema
                ? <HighlightedJson code={schema} />
                : <span className={s.placeholder}>Schema will appear here</span>
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
