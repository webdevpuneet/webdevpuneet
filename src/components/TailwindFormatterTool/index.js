'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import DevConvertersTopNav from '@/components/DevConvertersTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const GROUPS = [
  { name: 'Layout',        patterns: [/^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|table|hidden|contents|flow-root|list-item)$/, /^(container|columns|box-|float-|clear-|overflow|overscroll-)/, /^(static|fixed|absolute|relative|sticky)$/, /^(visible|invisible|collapse)$/, /^(aspect-)/, /^(top-|bottom-|left-|right-|inset-|z-)/] },
  { name: 'Flexbox & Grid',patterns: [/^(flex-|grow|shrink|order-|justify-|items-|self-|place-|content-|gap-|col-|row-|grid-)/] },
  { name: 'Spacing',       patterns: [/^[mp][xytblr]?-/, /^space-/] },
  { name: 'Sizing',        patterns: [/^(w-|h-|min-w|max-w|min-h|max-h|size-)/] },
  { name: 'Typography',    patterns: [/^(text-|font-|tracking-|leading-|line-clamp-|list-|decoration-|underline|overline|line-through|no-underline|uppercase|lowercase|capitalize|normal-case|truncate|whitespace-|break-|indent-)/] },
  { name: 'Background',    patterns: [/^(bg-|from-|via-|to-|gradient-)/] },
  { name: 'Border',        patterns: [/^(border|rounded|ring|outline|divide-)/] },
  { name: 'Effects',       patterns: [/^(shadow|opacity-|mix-blend|blur-|backdrop-|drop-shadow|brightness-|contrast-|grayscale|hue-rotate|invert|saturate|sepia)/] },
  { name: 'Transitions',   patterns: [/^(transition|duration-|ease-|delay-|animate-)/] },
  { name: 'Transforms',    patterns: [/^(scale-|rotate-|translate-|skew-|origin-)/] },
  { name: 'Interactivity', patterns: [/^(cursor-|pointer-|select-|resize|scroll-|snap-|touch-|user-|will-change-|appearance-)/] },
  { name: 'SVG',           patterns: [/^(fill-|stroke-)/] },
  { name: 'Accessibility', patterns: [/^(sr-|not-sr-|forced-)/] },
];

function getGroup(cls) {
  const base = cls.replace(/^([a-z]+:)+/, '');
  for (const g of GROUPS) {
    if (g.patterns.some(p => p.test(base))) return g.name;
  }
  return 'Other';
}

function getVariantPrefix(cls) {
  const m = cls.match(/^((?:[a-z][a-z0-9-]*:)+)/);
  return m ? m[1] : '';
}

const SAMPLE = 'flex p-4 text-white flex bg-blue-500 mt-2 hover:bg-blue-600 p-4 rounded-lg font-bold text-xl items-center justify-between shadow-md w-full cursor-pointer border border-blue-400 transition-all duration-200 text-white hover:shadow-lg dark:bg-blue-700 sm:p-6 gap-2';

export default function TailwindFormatterTool() {
  const [input, setInput] = useState('');
  const [optDedup, setOptDedup] = useState(true);
  const [optSort, setOptSort] = useState(true);
  const [optGroup, setOptGroup] = useState(true);
  const [optMultiline, setOptMultiline] = useState(false);
  const [tab, setTab] = useState('flat');
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 1800); };

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const all = input.trim().split(/[\s\n,]+/).filter(Boolean);
    const seen = new Set();
    const dupes = [];
    const unique = [];
    for (const c of all) {
      if (seen.has(c)) dupes.push(c);
      else { seen.add(c); unique.push(c); }
    }
    const working = optDedup ? unique : all;
    const grouped = {};
    for (const cls of working) {
      const g = optGroup ? getGroup(cls) : 'All';
      (grouped[g] = grouped[g] || []).push(cls);
    }
    if (optSort) {
      for (const g of Object.keys(grouped)) grouped[g].sort((a, b) => a.localeCompare(b));
    }
    const groupOrder = GROUPS.map(g => g.name).concat(['Other', 'All']);
    const sortedKeys = Object.keys(grouped).sort((a, b) => groupOrder.indexOf(a) - groupOrder.indexOf(b));
    const allClasses = sortedKeys.flatMap(k => grouped[k]);
    return { grouped, sortedKeys, allClasses, dupes, unique, total: all.length };
  }, [input, optDedup, optSort, optGroup]);

  const flatText = result ? (optMultiline ? result.allClasses.join('\n') : result.allClasses.join(' ')) : '';

  const copy = () => {
    if (!flatText) { showToast('Format first!'); return; }
    navigator.clipboard.writeText(flatText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      showToast('Copied!');
    });
  };

  return (
    <div className={styles.wrap}>
      <DevConvertersTopNav active="tailwind-formatter" />
      {/* Header */}
      <div className={styles.header} style={{ height: 'auto', minHeight: 52 }}>
        <div className={styles.headerIcon}>
          <svg width="16" height="16" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.463 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z" fill="white"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>Tailwind <span className={styles.headerAccent}>Formatter</span></span>
        <PlaygroundTopAd inline />
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.opts}>
          <span className={styles.optsLabel}>Options</span>
          <label className={styles.optLabel}><input type="checkbox" checked={optDedup} onChange={e => setOptDedup(e.target.checked)} /> Dedup</label>
          <label className={styles.optLabel}><input type="checkbox" checked={optSort} onChange={e => setOptSort(e.target.checked)} /> Sort</label>
          <label className={styles.optLabel}><input type="checkbox" checked={optGroup} onChange={e => setOptGroup(e.target.checked)} /> Group</label>
          <label className={styles.optLabel}><input type="checkbox" checked={optMultiline} onChange={e => setOptMultiline(e.target.checked)} /> Multiline</label>
        </div>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={() => { setInput(SAMPLE); }}>Sample</button>
          <button className={styles.btn} onClick={() => { setInput(''); }}>Clear</button>
          <button className={`${styles.btn} ${copied ? styles.btnCopied : ''}`} onClick={copy}>Copy</button>
        </div>
      </div>

      {/* Stats */}
      {result && (
        <div className={styles.statsBar}>
          <span>Total: <b>{result.total}</b></span>
          <span>Unique: <b>{result.unique.length}</b></span>
          <span className={result.dupes.length > 0 ? styles.dupesBad : ''}>Dupes: <b>{result.dupes.length}</b></span>
          <span>Groups: <b>{result.sortedKeys.length}</b></span>
        </div>
      )}

      <div className={styles.panels}>
        {/* Input panel */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>Input</span>
            <span className={styles.panelMeta}>{input.trim() ? input.trim().split(/[\s\n,]+/).filter(Boolean).length + ' classes' : 'paste classes'}</span>
          </div>
          <div className={styles.editorWrap}>
            <textarea
              className={styles.textarea}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="flex p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 …"
              spellCheck={false}
            />
            {!input && (
              <div className={styles.emptyState}>
                <div className={styles.emptyGlyph}>tw</div>
                <div className={styles.emptyText}>Paste Tailwind classes to format</div>
              </div>
            )}
          </div>
        </div>

        {/* Output panel */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div className={styles.panelTabs}>
              <button className={`${styles.tabBtn} ${tab === 'flat' ? styles.tabBtnActive : ''}`} onClick={() => setTab('flat')}>Flat</button>
              <button className={`${styles.tabBtn} ${tab === 'grouped' ? styles.tabBtnActive : ''}`} onClick={() => setTab('grouped')}>Grouped</button>
            </div>
            <span className={styles.panelMeta}>{result ? result.allClasses.length + ' classes' : ''}</span>
          </div>
          <div className={styles.outputScroll}>
            {tab === 'flat' && (result ? (
              <pre className={styles.flatPre}>{flatText || 'Nothing to show'}</pre>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyGlyph}>{ }</div>
                <div className={styles.emptyText}>Output will appear here</div>
              </div>
            ))}

            {tab === 'grouped' && (result ? (
              <div className={styles.groupedOutput}>
                {result.sortedKeys.map(key => (
                  <div key={key} className={styles.groupBlock}>
                    <div className={styles.groupTitle}>{key} <span className={styles.groupCount}>{result.grouped[key].length}</span></div>
                    <div className={styles.groupClasses}>
                      {result.grouped[key].map(cls => {
                        const v = getVariantPrefix(cls);
                        const base = cls.slice(v.length);
                        return (
                          <div key={cls} className={styles.classChip}>
                            {v && <span className={styles.variant}>{v}</span>}
                            {base}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyGlyph}>{ }</div>
                <div className={styles.emptyText}>Output will appear here</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toastMsg && <div className={styles.toast}>{toastMsg}</div>}
    </div>
  );
}
