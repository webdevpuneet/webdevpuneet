'use client';

import { useState, useMemo, useCallback, useRef, forwardRef } from 'react';
import styles from './styles.module.css';
import JsonToolsTopNav from '@/components/JsonToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Sample ─────────────────────────────────────────────────────────────── */

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "admin",
    "active": true,
    "score": 98.5,
    "tags": ["typescript", "react", "node"],
    "address": {
      "street": "123 Main St",
      "city": "San Francisco",
      "zip": "94105",
      "country": "US"
    }
  },
  "posts": [
    {
      "id": 101,
      "title": "Getting Started with TypeScript",
      "published": true,
      "views": 1200,
      "author": null
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "perPage": 10
  }
}`;

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function toPascalCase(str) {
  return String(str)
    .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, c => c.toUpperCase());
}

function singularize(pascal) {
  if (pascal.endsWith('ies')) return pascal.slice(0, -3) + 'y';
  if (/s$/.test(pascal) && !/(?:ss|us|is|as)$/.test(pascal)) return pascal.slice(0, -1);
  return pascal + 'Item';
}

/* ── Generator ───────────────────────────────────────────────────────────── */

function generateTS(jsonStr, opts) {
  const { rootName, outputMode, exportKw, optionalFields, arrayStyle, nullAs } = opts;
  if (!jsonStr.trim()) return { output: '', error: null };

  let json;
  try {
    json = JSON.parse(jsonStr);
  } catch (e) {
    const msg = e.message || String(e);
    return { output: '', error: 'JSON parse error — ' + msg.split('\n')[0].slice(0, 100) };
  }

  const interfaces = []; // [{name, fields}] in discovery order
  const registered = new Set();

  function uniqueName(base) {
    if (!registered.has(base)) { registered.add(base); return base; }
    let i = 2;
    while (registered.has(base + i)) i++;
    registered.add(base + i);
    return base + i;
  }

  function processObject(obj, name) {
    const fields = [];
    for (const [key, val] of Object.entries(obj)) {
      fields.push({ key, type: resolveType(val, key) });
    }
    interfaces.push({ name, fields });
  }

  function resolveType(val, key) {
    if (val === null) {
      return nullAs === 'unknown' ? 'unknown' : nullAs === 'any' ? 'any' : 'null';
    }
    if (typeof val === 'string') return 'string';
    if (typeof val === 'number') return 'number';
    if (typeof val === 'boolean') return 'boolean';
    if (Array.isArray(val)) return resolveArrayType(val, key);
    if (typeof val === 'object') {
      const childName = uniqueName(toPascalCase(key));
      processObject(val, childName);
      return childName;
    }
    return 'unknown';
  }

  function resolveArrayType(arr, key) {
    if (arr.length === 0) {
      return arrayStyle === 'generic' ? 'Array<unknown>' : 'unknown[]';
    }
    const typeSet = new Set();
    let objName = '';
    for (const item of arr) {
      if (item === null) {
        typeSet.add(nullAs === 'unknown' ? 'unknown' : nullAs === 'any' ? 'any' : 'null');
        continue;
      }
      if (typeof item === 'string') { typeSet.add('string'); continue; }
      if (typeof item === 'number') { typeSet.add('number'); continue; }
      if (typeof item === 'boolean') { typeSet.add('boolean'); continue; }
      if (Array.isArray(item)) { typeSet.add('unknown[]'); continue; }
      if (typeof item === 'object') {
        if (!objName) {
          const merged = Object.assign({}, ...arr.filter(x => x && typeof x === 'object' && !Array.isArray(x)));
          objName = uniqueName(singularize(toPascalCase(key)));
          processObject(merged, objName);
        }
        typeSet.add(objName);
        continue;
      }
    }
    const types = [...typeSet];
    let inner = types.length === 0 ? 'unknown' : types.length === 1 ? types[0] : types.join(' | ');
    if (arrayStyle === 'generic') return `Array<${inner}>`;
    return types.length > 1 ? `(${inner})[]` : `${inner}[]`;
  }

  // Start
  if (Array.isArray(json)) {
    if (json.length > 0) {
      const firstObj = json.find(x => x && typeof x === 'object' && !Array.isArray(x));
      if (firstObj) {
        const merged = Object.assign({}, ...json.filter(x => x && typeof x === 'object' && !Array.isArray(x)));
        processObject(merged, uniqueName(singularize(toPascalCase(rootName))));
      }
    }
  } else if (json && typeof json === 'object') {
    processObject(json, uniqueName(toPascalCase(rootName)));
  } else {
    return { output: `// Primitive value — no interface needed\n// Type: ${typeof json}`, error: null };
  }

  if (interfaces.length === 0) {
    return { output: '// No interfaces generated — check your JSON input', error: null };
  }

  const kw = outputMode === 'type' ? 'type' : 'interface';
  const exp = exportKw ? 'export ' : '';
  const lines = [];
  const rendered = [...interfaces].reverse();

  for (let i = 0; i < rendered.length; i++) {
    const { name, fields } = rendered[i];
    if (kw === 'interface') {
      lines.push(`${exp}interface ${name} {`);
    } else {
      lines.push(`${exp}type ${name} = {`);
    }
    for (const { key, type } of fields) {
      const opt = optionalFields ? '?' : '';
      lines.push(`  ${key}${opt}: ${type};`);
    }
    lines.push(kw === 'interface' ? '}' : '};');
    if (i < rendered.length - 1) lines.push('');
  }

  return { output: lines.join('\n'), error: null };
}

/* ── Syntax highlighting ─────────────────────────────────────────────────── */

const PRIMITIVES = new Set(['string', 'number', 'boolean', 'null', 'unknown', 'any', 'never', 'void', 'undefined']);

function highlightTypeTokens(typeStr) {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const re = /\b\w+\b|\[\]|<|>|\||\(|\)|\s+|./g;
  let result = '';
  let m;
  while ((m = re.exec(typeStr)) !== null) {
    const tok = m[0];
    if (/^\s+$/.test(tok)) { result += tok; continue; }
    if (tok === '|') { result += ` <span class="ts-punct">|</span> `; continue; }
    if (tok === '[]') { result += `<span class="ts-punct">[]</span>`; continue; }
    if (tok === '<' || tok === '>') { result += `<span class="ts-punct">${esc(tok)}</span>`; continue; }
    if (tok === '(' || tok === ')') { result += `<span class="ts-punct">${tok}</span>`; continue; }
    if (PRIMITIVES.has(tok)) { result += `<span class="ts-prim">${tok}</span>`; continue; }
    if (tok === 'Array') { result += `<span class="ts-builtin">${tok}</span>`; continue; }
    if (/^[A-Z]/.test(tok)) { result += `<span class="ts-name">${tok}</span>`; continue; }
    result += esc(tok);
  }
  return result;
}

function highlightTS(raw) {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return raw.split('\n').map(line => {
    if (!line) return '';

    // Declaration: [export] interface|type Name ...
    const declMatch = line.match(/^(export\s+)?(interface|type)\s+([A-Z]\w*)(.*)$/);
    if (declMatch) {
      const [, ex, kw, name, rest] = declMatch;
      let out = '';
      if (ex) out += `<span class="ts-kw">${esc(ex.trimEnd())}</span> `;
      out += `<span class="ts-kw">${kw}</span> <span class="ts-name">${esc(name)}</span>`;
      out += `<span class="ts-punct">${esc(rest)}</span>`;
      return out;
    }

    // Property: "  key?: type;"
    const propMatch = line.match(/^(\s+)(\w+)(\??):\s*(.+?)(;?)$/);
    if (propMatch) {
      const [, indent, key, opt, type, semi] = propMatch;
      return `${esc(indent)}<span class="ts-prop">${esc(key)}</span><span class="ts-punct">${opt}:</span> ${highlightTypeTokens(type)}<span class="ts-punct">${semi}</span>`;
    }

    // Closing brace / comment
    if (/^[}]/.test(line.trim())) return `<span class="ts-punct">${esc(line)}</span>`;
    if (/^\/\//.test(line.trim())) return `<span class="ts-comment">${esc(line)}</span>`;

    return esc(line);
  }).join('\n');
}

/* ── useCopy ─────────────────────────────────────────────────────────────── */

function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = useCallback((text, id) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(c => (c === id ? '' : c)), 1500);
    });
  }, []);
  return { copied, copy };
}

/* ── Main component ──────────────────────────────────────────────────────── */

export default function JsonToTypeScriptTool() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [rootName, setRootName] = useState('Root');
  const [outputMode, setOutputMode] = useState('interface');
  const [exportKw, setExportKw] = useState(true);
  const [optionalFields, setOptionalFields] = useState(false);
  const [arrayStyle, setArrayStyle] = useState('brackets');
  const [nullAs, setNullAs] = useState('null');
  const { copied, copy } = useCopy();
  const inputLineRef  = useRef(null);
  const outputLineRef = useRef(null);
  const syncInputScroll  = useCallback(e => { if (inputLineRef.current)  inputLineRef.current.scrollTop  = e.target.scrollTop; }, []);
  const syncOutputScroll = useCallback(e => { if (outputLineRef.current) outputLineRef.current.scrollTop = e.target.scrollTop; }, []);

  const opts = useMemo(
    () => ({ rootName: rootName.trim() || 'Root', outputMode, exportKw, optionalFields, arrayStyle, nullAs }),
    [rootName, outputMode, exportKw, optionalFields, arrayStyle, nullAs]
  );

  const result = useMemo(() => generateTS(input, opts), [input, opts]);

  const highlighted = useMemo(
    () => (result.output ? highlightTS(result.output) : ''),
    [result.output]
  );

  function handleDownload() {
    if (!result.output) return;
    const blob = new Blob([result.output], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${opts.rootName.toLowerCase()}.ts`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const inputLines = input ? input.split('\n').length : 1;
  const outputLines = result.output ? result.output.split('\n').length : 0;
  const interfaceCount = result.output
    ? (result.output.match(/\binterface\s+\w+|^type\s+\w+/gm) || []).length
    : 0;

  return (
    <div className={styles.wrap}>
      <JsonToolsTopNav active="json-to-typescript" />
      <PlaygroundTopAd />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><span className={styles.accent}>TS</span></div>
          <span>JSON → TypeScript</span>
        </div>

        <div className={styles.controls}>
          {/* Root name */}
          <div className={styles.rootGroup}>
            <span className={styles.ctrlLabel}>Root</span>
            <input
              className={styles.rootInput}
              value={rootName}
              onChange={e => setRootName(e.target.value)}
              placeholder="Root"
              spellCheck={false}
            />
          </div>

          {/* interface | type */}
          <div className={styles.segmented}>
            {['interface', 'type'].map(m => (
              <button
                key={m}
                className={`${styles.seg} ${outputMode === m ? styles.segActive : ''}`}
                onClick={() => setOutputMode(m)}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Array style */}
          <div className={styles.segmented}>
            {[
              { id: 'brackets', label: 'T[]' },
              { id: 'generic',  label: 'Array<T>' },
            ].map(s => (
              <button
                key={s.id}
                className={`${styles.seg} ${arrayStyle === s.id ? styles.segActive : ''}`}
                onClick={() => setArrayStyle(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Null as */}
          <div className={styles.nullGroup}>
            <span className={styles.ctrlLabel}>null as</span>
            <div className={styles.segmented}>
              {['null', 'unknown', 'any'].map(n => (
                <button
                  key={n}
                  className={`${styles.seg} ${nullAs === n ? styles.segActive : ''}`}
                  onClick={() => setNullAs(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <button
            className={`${styles.toggleBtn} ${exportKw ? styles.toggleBtnOn : ''}`}
            onClick={() => setExportKw(v => !v)}
            title="Add export keyword"
          >
            export
          </button>
          <button
            className={`${styles.toggleBtn} ${optionalFields ? styles.toggleBtnOn : ''}`}
            onClick={() => setOptionalFields(v => !v)}
            title="Mark all fields as optional"
          >
            optional
          </button>
        </div>
      </div>

      {/* ── Error bar ── */}
      {result.error && (
        <div className={styles.errorBar}>
          <span className={styles.errorIcon}>⚠</span>
          <span>{result.error}</span>
        </div>
      )}

      {/* ── Panes ── */}
      <div className={styles.panesRow}>

        {/* Input */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              <span className={styles.badge}>JSON</span>
              Input
            </span>
            <div className={styles.paneActions}>
              <button className={styles.actionBtn} onClick={() => setInput(SAMPLE_JSON)}>Sample</button>
              <button className={styles.actionBtn} onClick={() => setInput('')}>Clear</button>
            </div>
          </div>
          <div className={styles.editorWrap}>
            <LineNums ref={inputLineRef} count={inputLines} />
            <textarea
              className={styles.editor}
              value={input}
              onChange={e => setInput(e.target.value)}
              onScroll={syncInputScroll}
              spellCheck={false}
              placeholder='Paste JSON here…'
            />
          </div>
          <div className={styles.paneFooter}>
            <span className={styles.stat}>{inputLines} lines</span>
            <span className={styles.stat}>{fmtBytes(new TextEncoder().encode(input).length)}</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>

        {/* Output */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              <span className={`${styles.badge} ${styles.badgeTs}`}>TypeScript</span>
              Output
            </span>
            <div className={styles.paneActions}>
              <button
                className={`${styles.actionBtn} ${copied === 'out' ? styles.actionBtnOk : ''}`}
                onClick={() => copy(result.output, 'out')}
                disabled={!result.output}
              >
                {copied === 'out' ? '✓ Copied' : 'Copy'}
              </button>
              <button
                className={styles.actionBtn}
                onClick={handleDownload}
                disabled={!result.output}
              >
                Download .ts
              </button>
            </div>
          </div>
          <div className={styles.editorWrap}>
            {result.output ? (
              <>
                <LineNums ref={outputLineRef} count={outputLines} />
                <pre
                  className={styles.output}
                  onScroll={syncOutputScroll}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </>
            ) : (
              <div className={styles.emptyOutput}>
                {result.error ? 'Fix the error to see output' : 'TypeScript interfaces will appear here'}
              </div>
            )}
          </div>
          <div className={styles.paneFooter}>
            {result.output ? (
              <>
                <span className={styles.stat}>{outputLines} lines</span>
                <span className={styles.stat}>{interfaceCount} interface{interfaceCount !== 1 ? 's' : ''}</span>
              </>
            ) : (
              <span className={styles.stat}>—</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── LineNums ────────────────────────────────────────────────────────────── */

const LineNums = forwardRef(function LineNums({ count }, ref) {
  return (
    <div ref={ref} className={styles.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={styles.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
});

function fmtBytes(n) {
  if (n < 1024) return n + ' B';
  return (n / 1024).toFixed(1) + ' KB';
}
