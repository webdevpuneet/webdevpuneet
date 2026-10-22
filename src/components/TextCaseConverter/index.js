'use client';

import { useState, useMemo, useCallback } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

/* ── Case conversion logic ───────────────────────────────────────────────────── */

function toWords(text) {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')          // split camelCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')    // split ABCDef → ABC Def
    .replace(/[-_./]+/g, ' ')                       // replace separators
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

function titleCaseWord(w) {
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

/* Preserve line breaks for cases that operate line-by-line */
function mapLines(text, fn) {
  return text.split('\n').map(fn).join('\n');
}

const CONVERSIONS = [
  {
    id: 'upper',
    label: 'UPPER CASE',
    example: 'HELLO WORLD',
    accent: '#ef4444',
    convert: t => t.toUpperCase(),
  },
  {
    id: 'lower',
    label: 'lower case',
    example: 'hello world',
    accent: '#3b82f6',
    convert: t => t.toLowerCase(),
  },
  {
    id: 'title',
    label: 'Title Case',
    example: 'Hello World',
    accent: '#8b5cf6',
    convert: t => mapLines(t, line =>
      line.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    ),
  },
  {
    id: 'sentence',
    label: 'Sentence case',
    example: 'Hello world. How are you?',
    accent: '#06b6d4',
    convert: t => mapLines(t, line => {
      const lower = line.toLowerCase();
      return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
    }),
  },
  {
    id: 'camel',
    label: 'camelCase',
    example: 'helloWorld',
    accent: '#f59e0b',
    convert: t => mapLines(t, line => {
      const words = toWords(line);
      if (!words.length) return '';
      return words[0].toLowerCase() + words.slice(1).map(titleCaseWord).join('');
    }),
  },
  {
    id: 'pascal',
    label: 'PascalCase',
    example: 'HelloWorld',
    accent: '#ec4899',
    convert: t => mapLines(t, line => toWords(line).map(titleCaseWord).join('')),
  },
  {
    id: 'snake',
    label: 'snake_case',
    example: 'hello_world',
    accent: '#10b981',
    convert: t => mapLines(t, line => toWords(line).map(w => w.toLowerCase()).join('_')),
  },
  {
    id: 'screaming',
    label: 'SCREAMING_SNAKE',
    example: 'HELLO_WORLD',
    accent: '#f97316',
    convert: t => mapLines(t, line => toWords(line).map(w => w.toUpperCase()).join('_')),
  },
  {
    id: 'kebab',
    label: 'kebab-case',
    example: 'hello-world',
    accent: '#14b8a6',
    convert: t => mapLines(t, line => toWords(line).map(w => w.toLowerCase()).join('-')),
  },
  {
    id: 'cobol',
    label: 'COBOL-CASE',
    example: 'HELLO-WORLD',
    accent: '#6366f1',
    convert: t => mapLines(t, line => toWords(line).map(w => w.toUpperCase()).join('-')),
  },
  {
    id: 'train',
    label: 'Train-Case',
    example: 'Hello-World',
    accent: '#a855f7',
    convert: t => mapLines(t, line => toWords(line).map(titleCaseWord).join('-')),
  },
  {
    id: 'dot',
    label: 'dot.case',
    example: 'hello.world',
    accent: '#64748b',
    convert: t => mapLines(t, line => toWords(line).map(w => w.toLowerCase()).join('.')),
  },
  {
    id: 'alternating',
    label: 'aLtErNaTiNg',
    example: 'hElLo WoRlD',
    accent: '#e11d48',
    convert: t => {
      let toggle = false;
      return t.split('').map(c => {
        if (!/[a-zA-Z]/.test(c)) return c;
        const out = toggle ? c.toUpperCase() : c.toLowerCase();
        toggle = !toggle;
        return out;
      }).join('');
    },
  },
  {
    id: 'inverse',
    label: 'iNVERSE cASE',
    example: 'hELLO wORLD',
    accent: '#0ea5e9',
    convert: t => t.split('').map(c =>
      c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
    ).join(''),
  },
];

const SAMPLE = `The quick brown fox jumps over the lazy dog.
Hello World from webdevpuneet.com.`;

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function TextCaseConverter() {
  const [input, setInput]       = useState(SAMPLE);
  const [copied, setCopied]     = useState('');
  const [search, setSearch]     = useState('');
  const [pinned, setPinned]     = useState(new Set());

  const results = useMemo(() =>
    CONVERSIONS.map(c => ({ ...c, output: c.convert(input) })),
    [input]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return results;
    return results.filter(r => r.label.toLowerCase().includes(q) || r.id.includes(q));
  }, [results, search]);

  /* Sort: pinned first */
  const sorted = useMemo(() => [
    ...filtered.filter(r => pinned.has(r.id)),
    ...filtered.filter(r => !pinned.has(r.id)),
  ], [filtered, pinned]);

  const copyResult = useCallback(async (id, text) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1800);
  }, []);

  const togglePin = useCallback((id) => {
    setPinned(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const applyToInput = useCallback((text) => {
    setInput(text);
  }, []);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="text-case-converter" />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>Aa</span>
          Text Case Converter
        </div>
        <div className={s.headerMeta}>
          <span className={s.metaChip}>{wordCount} words</span>
          <span className={s.metaChip}>{charCount} chars</span>
        </div>
        <div className={s.headerActions}>
          <button className={s.actionBtn} onClick={async () => { const t = await navigator.clipboard.readText(); setInput(t); }}>Paste</button>
          <button className={s.actionBtn} onClick={() => setInput(SAMPLE)}>Sample</button>
          <button className={s.actionBtn} onClick={() => setInput('')}>Clear</button>
        </div>
      </div>

      {/* Input */}
      <div className={s.inputWrap}>
        <textarea
          className={s.inputArea}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or paste your text here…"
          spellCheck={false}
        />
      </div>

      {/* Results toolbar */}
      <div className={s.toolbar}>
        <span className={s.toolbarLabel}>{CONVERSIONS.length} conversions</span>
        <input
          className={s.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter cases…"
        />
      </div>

      {/* Results grid */}
      <div className={s.grid}>
        {sorted.map(r => (
          <div
            key={r.id}
            className={`${s.card} ${pinned.has(r.id) ? s.cardPinned : ''}`}
            style={{ '--accent': r.accent }}
          >
            <div className={s.cardHeader}>
              <div className={s.cardLabel}>
                <span className={s.cardDot} style={{ background: r.accent }} />
                {r.label}
              </div>
              <div className={s.cardActions}>
                <button
                  className={`${s.pinBtn} ${pinned.has(r.id) ? s.pinBtnActive : ''}`}
                  onClick={() => togglePin(r.id)}
                  title={pinned.has(r.id) ? 'Unpin' : 'Pin to top'}
                >⊹</button>
                <button
                  className={s.applyBtn}
                  onClick={() => applyToInput(r.output)}
                  title="Apply back to input"
                >↑</button>
                <button
                  className={`${s.copyBtn} ${copied === r.id ? s.copyBtnDone : ''}`}
                  onClick={() => copyResult(r.id, r.output)}
                >
                  {copied === r.id ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
            <div className={s.cardOutput}>
              {r.output || <span className={s.empty}>—</span>}
            </div>
            <div className={s.cardExample}>e.g. {r.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
