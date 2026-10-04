'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import s from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const SAMPLE_CSS = `.card {
  display: flex;
  user-select: none;
  appearance: none;
  backdrop-filter: blur(12px);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.button {
  transition: transform 180ms ease, filter 180ms ease;
  mask-image: linear-gradient(#000, transparent);
}

@supports (display: grid) {
  .dashboard {
    display: grid;
    grid-template-columns: 280px 1fr;
  }
}`;

const PRESETS = {
  defaults: ['defaults'],
  modern: ['last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Safari versions', 'last 2 Edge versions'],
  broad: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead'],
  enterprise: ['> 0.2%', 'last 4 versions', 'Firefox ESR', 'not dead'],
  mobile: ['last 3 iOS versions', 'last 3 Android versions', 'last 3 ChromeAndroid versions', 'last 3 Samsung versions'],
  custom: ['> 0.5%', 'last 2 versions', 'not dead'],
};

function countPrefixes(css) {
  const matches = css.match(/-(webkit|moz|ms|o)-/g);
  return matches ? matches.length : 0;
}

function byteSize(text) {
  return new Blob([text]).size;
}

function beautifyCss(css) {
  let formatted = '';
  let depth = 0;
  let inString = false;
  let quote = '';

  const indent = () => '  '.repeat(Math.max(depth, 0));
  const trimLineEnd = () => { formatted = formatted.replace(/[ \t]+$/g, ''); };
  const newline = (extra = false) => {
    trimLineEnd();
    formatted += extra ? '\n\n' : '\n';
  };

  for (let i = 0; i < css.length; i += 1) {
    const char = css[i];
    const prev = css[i - 1];

    if ((char === '"' || char === "'") && prev !== '\\') {
      if (!inString) {
        inString = true;
        quote = char;
      } else if (quote === char) {
        inString = false;
        quote = '';
      }
      formatted += char;
      continue;
    }

    if (inString) {
      formatted += char;
      continue;
    }

    if (char === '{') {
      trimLineEnd();
      formatted += ' {\n';
      depth += 1;
      formatted += indent();
      continue;
    }

    if (char === ';') {
      formatted += ';\n' + indent();
      continue;
    }

    if (char === '}') {
      depth -= 1;
      newline();
      formatted += indent() + '}';
      if (css.slice(i + 1).trim()) newline(true);
      continue;
    }

    if (/\s/.test(char)) {
      if (!formatted.endsWith(' ') && !formatted.endsWith('\n')) formatted += ' ';
      continue;
    }

    formatted += char;
  }

  return formatted
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: 'text/css;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function tokenClass(token) {
  if (token.startsWith('/*')) return s.tokComment;
  if (token.startsWith('@')) return s.tokAtRule;
  if (/^["']/.test(token)) return s.tokString;
  if (/^#[0-9a-fA-F]{3,8}$/.test(token)) return s.tokColor;
  if (/^-?\d/.test(token)) return s.tokNumber;
  if (/^--?[\w-]+$/.test(token)) return s.tokProperty;
  if (/^[.#]?[_a-zA-Z][-\w]*$/.test(token)) return s.tokSelector;
  return s.tokPunct;
}

function HighlightedLine({ line }) {
  const parts = [];
  const regex = /(\/\*.*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|#[0-9a-fA-F]{3,8}\b|@[\w-]+|--?[\w-]+(?=\s*:)|[-+]?\d*\.?\d+(?:px|rem|em|%|fr|s|ms|deg|vh|vw)?\b|[.#]?[_a-zA-Z][-\w]*(?=\s*\{)|[-\w]+(?=\()|[{}:;,()])/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
    parts.push(<span key={`${match.index}-${match[0]}`} className={tokenClass(match[0])}>{match[0]}</span>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts.length ? parts : ' ';
}

function CodeEditor({ value, onChange, placeholder }) {
  const highlightRef = useRef(null);
  const lineRef = useRef(null);
  const lines = value.split('\n');
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);

  const syncScroll = event => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = event.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
    }
    if (lineRef.current) lineRef.current.scrollTop = event.currentTarget.scrollTop;
  };

  return (
    <div className={s.codeShell}>
      <div ref={lineRef} className={s.lineNumbers} aria-hidden="true">
        {lineNumbers.map(number => <span key={number}>{number}</span>)}
      </div>
      <div className={s.codePane}>
        <pre ref={highlightRef} className={s.highlightLayer} aria-hidden="true">
          {lines.map((line, index) => (
            <span key={index} className={s.highlightLine}>
              <HighlightedLine line={line} />
              {'\n'}
            </span>
          ))}
        </pre>
        <textarea
          className={s.editor}
          value={value}
          onChange={event => onChange(event.target.value)}
          onScroll={syncScroll}
          spellCheck="false"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default function CssAutoprefixerTool() {
  const [input, setInput] = useState(SAMPLE_CSS);
  const [output, setOutput] = useState('');
  const [preset, setPreset] = useState('defaults');
  const [customQuery, setCustomQuery] = useState(PRESETS.custom.join('\n'));
  const [rejectQuery, setRejectQuery] = useState('ie <= 11\nop_mini all');
  const [removeOld, setRemoveOld] = useState(true);
  const [cascade, setCascade] = useState(false);
  const [grid, setGrid] = useState('autoplace');
  const [flexbox, setFlexbox] = useState('no-2009');
  const [formatOutput, setFormatOutput] = useState(true);
  const [warnings, setWarnings] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const runIdRef = useRef(0);

  const browserQueries = useMemo(() => {
    const base = preset === 'custom'
      ? customQuery.split('\n').map(v => v.trim()).filter(Boolean)
      : PRESETS[preset];
    const rejected = rejectQuery
      .split('\n')
      .map(v => v.trim())
      .filter(Boolean)
      .map(v => v.startsWith('not ') ? v : `not ${v}`);
    return [...base, ...rejected];
  }, [preset, customQuery, rejectQuery]);

  const resolvedBrowsers = useMemo(() => {
    try {
      return browserslist(browserQueries).slice(0, 18);
    } catch {
      return [];
    }
  }, [browserQueries]);

  const processCss = async (source = input, options = {}) => {
    const runId = ++runIdRef.current;
    const { keepCopied = false } = options;
    setError('');
    setWarnings([]);
    setIsProcessing(true);
    if (!keepCopied) setCopied(false);

    if (!source.trim()) {
      setOutput('');
      setIsProcessing(false);
      return;
    }

    try {
      const gridOption = grid === 'false' ? false : grid;
      const flexboxOption = flexbox === 'true' ? true : flexbox === 'false' ? false : flexbox;
      const result = await postcss([
        autoprefixer({
          overrideBrowserslist: browserQueries,
          remove: removeOld,
          cascade,
          grid: gridOption,
          flexbox: flexboxOption,
        }),
      ]).process(source, { from: undefined });
      if (runId !== runIdRef.current) return;
      setOutput(formatOutput ? beautifyCss(result.css) : result.css);
      setWarnings(result.warnings().map(warning => warning.toString()));
    } catch (err) {
      if (runId !== runIdRef.current) return;
      setOutput('');
      setError(err.message || 'Could not process this CSS.');
    } finally {
      if (runId === runIdRef.current) setIsProcessing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      processCss(input, { keepCopied: true });
    }, 350);
    return () => clearTimeout(timer);
  }, [input, browserQueries, removeOld, cascade, grid, flexbox, formatOutput]);

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const inputBytes = byteSize(input);
  const outputBytes = output ? byteSize(output) : 0;

  return (
    <div className={s.wrap}>
      <CssToolsTopNav active="css-autoprefixer" />
      <PlaygroundTopAd />
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M5 5h14l-1.4 13L12 20l-5.6-2L5 5z" fill="#818cf8" opacity=".18" stroke="#818cf8" strokeWidth="1.6" />
              <path d="M8 9h8M8.5 13h6.8M9 16l3 1 3-1 .2-2" stroke="#818cf8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>CSS <span className={s.accent}>Autoprefixer</span></span>
        </div>
        <div className={s.headerRight}>
          <span className={s.hint}>PostCSS Autoprefixer · Browserslist targets</span>
          <button className={s.secondaryBtn} onClick={() => setInput(SAMPLE_CSS)}>Load sample</button>
          <button className={s.secondaryBtn} onClick={() => { setOutput(''); setError(''); setWarnings([]); }}>Clear output</button>
          <button className={s.secondaryBtn} onClick={() => setOutput(beautifyCss(output))} disabled={!output}>Beautify output</button>
          <button className={s.secondaryBtn} onClick={copyOutput} disabled={!output}>{copied ? 'Copied' : 'Copy output'}</button>
          <button className={s.secondaryBtn} onClick={() => downloadText(output, 'autoprefixed.css')} disabled={!output}>Download CSS</button>
          <button className={s.primaryBtn} onClick={() => processCss()} disabled={isProcessing}>{isProcessing ? 'Prefixing...' : 'Autoprefix CSS'}</button>
        </div>
      </div>

      <div className={s.body}>
        <aside className={s.sidebar}>
          <section className={s.panel}>
            <h2>Browser Targets</h2>
            <label className={s.label} htmlFor="prefix-preset">Preset</label>
            <select id="prefix-preset" className={s.select} value={preset} onChange={event => setPreset(event.target.value)}>
              <option value="defaults">Browserslist defaults</option>
              <option value="modern">Modern evergreen</option>
              <option value="broad">Broad support</option>
              <option value="enterprise">Enterprise / older support</option>
              <option value="mobile">Mobile browsers</option>
              <option value="custom">Custom query</option>
            </select>

            {preset === 'custom' && (
              <>
                <label className={s.label} htmlFor="custom-query">Custom Browserslist</label>
                <textarea id="custom-query" className={s.smallArea} value={customQuery} onChange={event => setCustomQuery(event.target.value)} />
              </>
            )}

            <label className={s.label} htmlFor="reject-query">Reject browsers</label>
            <textarea id="reject-query" className={s.smallArea} value={rejectQuery} onChange={event => setRejectQuery(event.target.value)} placeholder="ie <= 11&#10;op_mini all" />
            <p className={s.help}>One browser query per line. The tool converts each line to a `not ...` Browserslist rule.</p>
          </section>

          <section className={s.panel}>
            <h2>Prefix Settings</h2>
            <label className={s.label} htmlFor="grid-mode">CSS Grid</label>
            <select id="grid-mode" className={s.select} value={grid} onChange={event => setGrid(event.target.value)}>
              <option value="false">Disable grid prefixes</option>
              <option value="autoplace">Enable grid autoplace</option>
              <option value="no-autoplace">Enable grid, no autoplace</option>
            </select>

            <label className={s.label} htmlFor="flexbox-mode">Flexbox</label>
            <select id="flexbox-mode" className={s.select} value={flexbox} onChange={event => setFlexbox(event.target.value)}>
              <option value="no-2009">No 2009 spec prefixes</option>
              <option value="true">All flexbox prefixes</option>
              <option value="false">Disable flexbox prefixes</option>
            </select>

            <label className={s.checkRow}>
              <input type="checkbox" checked={removeOld} onChange={event => setRemoveOld(event.target.checked)} />
              <span>Remove outdated prefixes</span>
            </label>
            <label className={s.checkRow}>
              <input type="checkbox" checked={cascade} onChange={event => setCascade(event.target.checked)} />
              <span>Cascade aligned prefixes</span>
            </label>
            <label className={s.checkRow}>
              <input type="checkbox" checked={formatOutput} onChange={event => setFormatOutput(event.target.checked)} />
              <span>Beautify generated CSS</span>
            </label>
          </section>

          <section className={s.panel}>
            <h2>Resolved Browsers</h2>
            <div className={s.browserList}>
              {resolvedBrowsers.length ? resolvedBrowsers.map(browser => <span key={browser}>{browser}</span>) : <em>Invalid browser query</em>}
            </div>
          </section>
        </aside>

        <main className={s.workspace}>
          <div className={s.editorGrid}>
            <section className={s.editorPanel}>
              <div className={s.editorHead}>
                <h2>Input CSS</h2>
                <span>{inputBytes} bytes</span>
              </div>
              <CodeEditor value={input} onChange={setInput} />
            </section>

            <section className={s.editorPanel}>
              <div className={s.editorHead}>
                <h2>Prefixed Output</h2>
                <span>{isProcessing ? 'prefixing...' : output ? `${outputBytes} bytes · ${countPrefixes(output)} prefixes` : 'waiting'}</span>
              </div>
              <CodeEditor value={output} onChange={setOutput} placeholder="Click Autoprefix CSS to generate output." />
            </section>
          </div>

          {error && <div className={s.error}>{error}</div>}
          {!!warnings.length && (
            <div className={s.warningBox}>
              <strong>Autoprefixer warnings</strong>
              {warnings.map(warning => <p key={warning}>{warning}</p>)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
