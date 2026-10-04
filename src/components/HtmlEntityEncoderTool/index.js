'use client';
import { useState, useCallback } from 'react';
import s from './styles.module.css';
import DevEncodersTopNav from '@/components/DevEncodersTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const NAMED = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  '©': '&copy;', '®': '&reg;', '™': '&trade;',
  '€': '&euro;', '£': '&pound;', '¥': '&yen;', '¢': '&cent;',
  '°': '&deg;', '±': '&plusmn;', '×': '&times;', '÷': '&divide;',
  '½': '&frac12;', '¼': '&frac14;', '¾': '&frac34;',
  '«': '&laquo;', '»': '&raquo;', '—': '&mdash;', '–': '&ndash;',
  ' ': '&nbsp;', '…': '&hellip;', '•': '&bull;',
  '←': '&larr;', '→': '&rarr;', '↑': '&uarr;', '↓': '&darr;',
  '∞': '&infin;', '≠': '&ne;', '≤': '&le;', '≥': '&ge;',
  '∑': '&sum;', '√': '&radic;', 'π': '&pi;',
};
const DECODE_MAP = Object.fromEntries(Object.entries(NAMED).map(([c, e]) => [e, c]));

function encodeMinimal(text) {
  return text.replace(/[&<>"']/g, c => NAMED[c] ?? c);
}

function encodeFull(text) {
  return [...text].map(c => {
    if (NAMED[c]) return NAMED[c];
    const code = c.codePointAt(0);
    return code > 127 ? `&#${code};` : c;
  }).join('');
}

function encodeNumeric(text) {
  return [...text].map(c => {
    const code = c.codePointAt(0);
    return `&#${code};`;
  }).join('');
}

function decodeEntities(text) {
  return text
    .replace(/&[a-zA-Z]+;/g, e => DECODE_MAP[e] ?? e)
    .replace(/&#x([0-9a-fA-F]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d)));
}

const SAMPLE = '<h1>Hello "World" & beyond! © 2024</h1>';

export default function HtmlEntityEncoderTool() {
  const [input,   setInput]   = useState(SAMPLE);
  const [output,  setOutput]  = useState('');
  const [mode,    setMode]    = useState('minimal'); // minimal | full | numeric
  const [copied,  setCopied]  = useState(false);
  const [lastOp,  setLastOp]  = useState(null); // 'encode' | 'decode'

  function encode() {
    const fn = mode === 'full' ? encodeFull : mode === 'numeric' ? encodeNumeric : encodeMinimal;
    setOutput(fn(input));
    setLastOp('encode');
  }

  function decode() {
    setOutput(decodeEntities(input));
    setLastOp('decode');
  }

  function swap() {
    setInput(output);
    setOutput('');
    setLastOp(null);
  }

  function copy() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  const inputLines  = input  ? input.split('\n').length  : 0;
  const outputLines = output ? output.split('\n').length : 0;

  return (
    <div className={s.wrap}>
      <DevEncodersTopNav active="html-entity-encoder" />
      <PlaygroundTopAd />
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 4L2 8l3 4M11 4l3 4-3 4M9 3l-2 10" stroke="#f59e0b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>HTML Entity <span className={s.accent}>Encoder / Decoder</span></span>
        </div>
        <span className={s.hint}>Named · Numeric · Full Unicode</span>
      </div>

      <div className={s.body}>

        {/* Mode */}
        <div className={s.card}>
          <div className={s.fieldLabel}>Encode mode</div>
          <div className={s.modeToggle}>
            {[
              ['minimal', 'Minimal',  'Only &, <, >, ", \''],
              ['full',    'Full',     'Named + &#decimal; for non-ASCII'],
              ['numeric', 'Numeric',  'All chars as &#decimal; entities'],
            ].map(([v, l, sub]) => (
              <button key={v}
                className={mode === v ? `${s.modeBtn} ${s.modeBtnActive}` : s.modeBtn}
                onClick={() => setMode(v)}>
                <span className={s.modeBtnLabel}>{l}</span>
                <span className={s.modeBtnSub}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editors */}
        <div className={s.editorsGrid}>
          <div className={s.editorPanel}>
            <div className={s.editorHeader}>
              <span className={s.editorLabel}>Input</span>
              <span className={s.editorMeta}>{inputLines} line{inputLines !== 1 ? 's' : ''} · {input.length} chars</span>
              <button className={s.clearBtn} onClick={() => { setInput(''); setOutput(''); }}>Clear</button>
            </div>
            <textarea
              className={s.textarea}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste HTML or text to encode/decode…"
              spellCheck={false}
            />
          </div>

          <div className={s.actionsCol}>
            <button className={s.actionBtn} onClick={encode}>Encode →</button>
            <button className={s.actionBtn} onClick={decode}>← Decode</button>
            {output && <button className={s.swapBtn} onClick={swap}>⇅ Swap</button>}
          </div>

          <div className={s.editorPanel}>
            <div className={s.editorHeader}>
              <span className={s.editorLabel}>Output</span>
              <span className={s.editorMeta}>{outputLines > 0 ? `${outputLines} line${outputLines !== 1 ? 's' : ''} · ${output.length} chars` : ''}</span>
              {output && <button className={s.copyBtn} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>}
            </div>
            <textarea
              className={`${s.textarea} ${s.textareaOut}`}
              value={output}
              readOnly
              placeholder={lastOp ? '' : 'Click Encode or Decode to see results…'}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Reference table */}
        <div className={s.refCard}>
          <div className={s.refTitle}>Common HTML Entities</div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead><tr><th>Char</th><th>Named entity</th><th>Numeric</th><th>Description</th></tr></thead>
              <tbody>
                {[
                  ['&',  '&amp;',    '&#38;',  'Ampersand'],
                  ['<',  '&lt;',     '&#60;',  'Less than'],
                  ['>',  '&gt;',     '&#62;',  'Greater than'],
                  ['"',  '&quot;',   '&#34;',  'Double quote'],
                  ["'",  '&apos;',   '&#39;',  'Single quote'],
                  [' ',  '&nbsp;',   '&#160;', 'Non-breaking space'],
                  ['©',  '&copy;',   '&#169;', 'Copyright'],
                  ['®',  '&reg;',    '&#174;', 'Registered trademark'],
                  ['™',  '&trade;',  '&#8482;','Trademark'],
                  ['€',  '&euro;',   '&#8364;','Euro sign'],
                  ['£',  '&pound;',  '&#163;', 'Pound sign'],
                  ['—',  '&mdash;',  '&#8212;','Em dash'],
                  ['–',  '&ndash;',  '&#8211;','En dash'],
                  ['…',  '&hellip;', '&#8230;','Ellipsis'],
                  ['•',  '&bull;',   '&#8226;','Bullet'],
                ].map(([ch, named, num, desc]) => (
                  <tr key={named} onClick={() => setInput(ch)} style={{ cursor: 'pointer' }}>
                    <td><strong>{ch}</strong></td>
                    <td style={{ fontFamily: 'monospace', color: '#f59e0b' }}>{named}</td>
                    <td style={{ fontFamily: 'monospace', color: 'var(--text3)' }}>{num}</td>
                    <td style={{ color: 'var(--text3)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
