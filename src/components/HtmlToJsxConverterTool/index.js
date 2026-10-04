'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import DevConvertersTopNav from '@/components/DevConvertersTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const VOID_ELEMENTS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

const EVENT_MAP = {
  onclick:'onClick',ondblclick:'onDoubleClick',onmousedown:'onMouseDown',onmouseup:'onMouseUp',
  onmouseover:'onMouseOver',onmouseout:'onMouseOut',onmousemove:'onMouseMove',
  onmouseenter:'onMouseEnter',onmouseleave:'onMouseLeave',onkeydown:'onKeyDown',
  onkeyup:'onKeyUp',onkeypress:'onKeyPress',onfocus:'onFocus',onblur:'onBlur',
  onchange:'onChange',oninput:'onInput',onsubmit:'onSubmit',onreset:'onReset',
  onselect:'onSelect',onscroll:'onScroll',onwheel:'onWheel',ondragstart:'onDragStart',
  ondrag:'onDrag',ondragend:'onDragEnd',ondragenter:'onDragEnter',ondragleave:'onDragLeave',
  ondrop:'onDrop',onload:'onLoad',onerror:'onError',oncontextmenu:'onContextMenu',
  onanimationstart:'onAnimationStart',onanimationend:'onAnimationEnd',
  ontransitionend:'onTransitionEnd',onpointerdown:'onPointerDown',onpointerup:'onPointerUp',
  onpointermove:'onPointerMove',ontouchstart:'onTouchStart',ontouchmove:'onTouchMove',
  ontouchend:'onTouchEnd',onpaste:'onPaste',oncopy:'onCopy',oncut:'onCut',
};

const ATTR_MAP = {
  tabindex:'tabIndex',readonly:'readOnly',maxlength:'maxLength',cellpadding:'cellPadding',
  cellspacing:'cellSpacing',rowspan:'rowSpan',colspan:'colSpan',usemap:'useMap',
  frameborder:'frameBorder',contenteditable:'contentEditable',crossorigin:'crossOrigin',
  accesskey:'accessKey',enctype:'encType',novalidate:'noValidate',allowfullscreen:'allowFullScreen',
  autocomplete:'autoComplete',autofocus:'autoFocus',autoplay:'autoPlay',
  spellcheck:'spellCheck',srcdoc:'srcDoc',srcset:'srcSet',
};

const HISTORY_KEY = 'htmltojsx_history';
const MAX_HISTORY = 18;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function persistHistory(entries) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {}
  return entries;
}

// ─── Conversion logic ────────────────────────────────────────────────────────

function styleStringToObject(styleStr) {
  if (!styleStr) return '{}';
  const parts = styleStr.split(';').map(s => s.trim()).filter(Boolean);
  const pairs = parts.map(part => {
    const idx = part.indexOf(':');
    if (idx === -1) return null;
    const prop = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const useNum = !isNaN(Number(val)) && val === String(Number(val));
    return `${camel}: ${useNum ? val : '"' + val + '"'}`;
  }).filter(Boolean);
  return '{{ ' + pairs.join(', ') + ' }}';
}

function transformAttributes(attrStr, opts) {
  if (!attrStr.trim()) return '';
  const attrs = [];
  const regex = /([a-zA-Z_:][a-zA-Z0-9_:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
  let m;
  while ((m = regex.exec(attrStr)) !== null) {
    let name = m[1];
    const value = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4];
    const nameLower = name.toLowerCase();
    if (opts.camelEvents && EVENT_MAP[nameLower]) name = EVENT_MAP[nameLower];
    else if (opts.className && nameLower === 'class') name = 'className';
    else if (opts.htmlFor && nameLower === 'for') name = 'htmlFor';
    else if (ATTR_MAP[nameLower]) name = ATTR_MAP[nameLower];
    if (value === undefined) { attrs.push(name); continue; }
    if (opts.inlineStyle && nameLower === 'style') { attrs.push('style=' + styleStringToObject(value)); continue; }
    if (value === 'true') { attrs.push(name); continue; }
    if (value === 'false') { attrs.push(name + '={false}'); continue; }
    const num = Number(value);
    if (!isNaN(num) && value !== '') { attrs.push(name + '={' + num + '}'); continue; }
    attrs.push(name + '="' + value + '"');
  }
  return attrs.length ? ' ' + attrs.join(' ') : '';
}

function getTagName(token) {
  const m = token.match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
  return m ? m[1].toLowerCase() : '';
}

function prettify(code, isJsx = false) {
  const tokenRe = isJsx
    ? /\{\/\*[\s\S]*?\*\/\}|<\/>|<>|<\/[^>]+>|<[^>]*\/\s*>|<[^>]+>|[^<{]+|\{[^}]*\}/g
    : /<!--[\s\S]*?-->|<\/>|<>|<\/[^>]+>|<[^>]*\/\s*>|<[^>]+>|[^<]+/g;

  const tokens = [];
  let m;
  while ((m = tokenRe.exec(code)) !== null) {
    const t = m[0].trim();
    if (t) tokens.push(t);
  }

  let indent = 0;
  const lines = [];
  const pad = (n) => '  '.repeat(n);

  for (const token of tokens) {
    if (token.startsWith('</') || token === '</>') {
      indent = Math.max(0, indent - 1);
      lines.push(pad(indent) + token);
    } else if (token === '<>') {
      lines.push(pad(indent) + token);
      indent++;
    } else if (
      token.startsWith('<!--') ||
      token.startsWith('{/*') ||
      (token.startsWith('<') && (token.endsWith('/>') || VOID_ELEMENTS.has(getTagName(token))))
    ) {
      lines.push(pad(indent) + token);
    } else if (token.startsWith('<')) {
      lines.push(pad(indent) + token);
      indent++;
    } else {
      lines.push(pad(indent) + token);
    }
  }

  return lines.join('\n');
}

function htmlToJsx(html, opts) {
  let result = html;
  result = result.replace(/<!--([\s\S]*?)-->/g, (_, c) => '{/*' + c + '*/}');
  result = result.replace(/<([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g, (match, tag, attrs, selfClose) => {
    const transformedAttrs = transformAttributes(attrs, opts);
    const isVoid = VOID_ELEMENTS.has(tag.toLowerCase());
    if (opts.selfClosing && (isVoid || selfClose)) return '<' + tag + transformedAttrs + ' />';
    return '<' + tag + transformedAttrs + '>';
  });
  if (opts.wrapFragment) {
    result = '<>\n' + result.trim() + '\n</>';
  }
  result = prettify(result, true);
  if (opts.wrapComponent) {
    const indented = result.split('\n').map(l => '  ' + l).join('\n');
    result = `export const MyComponent = () => (\n${indented}\n);`;
  }
  return result;
}

// ─── Syntax highlighting ─────────────────────────────────────────────────────
// Uses CSS classes (hj-*) defined in globals.css — automatically adapts to
// light and dark themes without any inline style color values.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hlHtmlAttrs(str) {
  if (!str) return '';
  return str.replace(
    /(\s*)([a-zA-Z_:][a-zA-Z0-9_:.-]*)(?:(=)(?:"([^"]*)"|'([^']*)'|(\S+)))?/g,
    (full, space, name, eq, dq, sq, bare) => {
      if (!name) return esc(full);
      let r = space + `<span class="hj-attrN">${name}</span>`;
      if (eq !== undefined) {
        r += `<span class="hj-punct">=</span>`;
        if (dq !== undefined) r += `<span class="hj-attrV">"${esc(dq)}"</span>`;
        else if (sq !== undefined) r += `<span class="hj-attrV">'${esc(sq)}'</span>`;
        else if (bare !== undefined) r += `<span class="hj-attrV">${esc(bare)}</span>`;
      }
      return r;
    }
  );
}

function hlJsxAttrs(str) {
  if (!str) return '';
  return str.replace(
    /(\s*)([a-zA-Z_:][a-zA-Z0-9_:.-]*)(?:(=)(?:\{\{([^}]*)\}\}|\{([^}]*)\}|"([^"]*)"|'([^']*)'))?/g,
    (full, space, name, eq, dbl, single, dq, sq) => {
      if (!name) return esc(full);
      let r = space + `<span class="hj-attrN">${name}</span>`;
      if (eq !== undefined) {
        r += `<span class="hj-punct">=</span>`;
        if (dbl !== undefined) r += `<span class="hj-expr">{{${esc(dbl)}}}</span>`;
        else if (single !== undefined) r += `<span class="hj-expr">{${esc(single)}}</span>`;
        else if (dq !== undefined) r += `<span class="hj-attrV">"${esc(dq)}"</span>`;
        else if (sq !== undefined) r += `<span class="hj-attrV">'${esc(sq)}'</span>`;
      }
      return r;
    }
  );
}

function highlightHtml(code) {
  let out = '';
  const re = /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?>)|([^<]+|<)/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const [full, comment, openClose, tagName, attrs, close, other] = m;
    if (comment !== undefined) {
      out += `<span class="hj-cmt">${esc(comment)}</span>`;
    } else if (tagName !== undefined) {
      out += `<span class="hj-punct">${esc(openClose)}</span>`;
      out += `<span class="hj-tag">${tagName}</span>`;
      out += hlHtmlAttrs(attrs);
      out += `<span class="hj-punct">${esc(close)}</span>`;
    } else {
      out += esc(other || full);
    }
  }
  return out;
}

function hlKeywords(text) {
  const parts = text.split(/\b(export|const|default|return|function|import|from|MyComponent)\b/);
  return parts.map((p, i) => {
    if (i % 2 === 0) return esc(p);
    return `<span class="${p === 'MyComponent' ? 'hj-tag' : 'hj-expr'}">${p}</span>`;
  }).join('');
}

function highlightJsx(code) {
  let out = '';
  const re = /(\{\/\*[\s\S]*?\*\/\})|(<\/>)|(<>)|(<\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?>)|([^<{]+|<|\{[^}]*\})/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const [full, jsxCmt, fragClose, fragOpen, openClose, tagName, attrs, close, other] = m;
    if (jsxCmt !== undefined) {
      out += `<span class="hj-cmt">${esc(jsxCmt)}</span>`;
    } else if (fragClose !== undefined) {
      out += `<span class="hj-punct">&lt;/&gt;</span>`;
    } else if (fragOpen !== undefined) {
      out += `<span class="hj-punct">&lt;&gt;</span>`;
    } else if (tagName !== undefined) {
      out += `<span class="hj-punct">${esc(openClose)}</span>`;
      out += `<span class="hj-tag">${tagName}</span>`;
      out += hlJsxAttrs(attrs);
      out += `<span class="hj-punct">${esc(close)}</span>`;
    } else {
      out += hlKeywords(other || full);
    }
  }
  return out;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function LineNumbers({ count, scrollTop }) {
  const ref = useRef(null);
  if (ref.current) ref.current.scrollTop = scrollTop;
  const nums = Array.from({ length: Math.max(count, 1) }, (_, i) => i + 1);
  return (
    <div ref={ref} className={styles.lineNums} aria-hidden="true">
      {nums.map(n => <div key={n} className={styles.lineNum}>{n}</div>)}
    </div>
  );
}

function CodeEditor({ value, onChange, onPaste, placeholder }) {
  const preRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const lineCount = value ? value.split('\n').length : 1;

  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    setScrollTop(top);
    if (preRef.current) {
      preRef.current.scrollTop = top;
      preRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  return (
    <div className={styles.editorWrapper}>
      <LineNumbers count={lineCount} scrollTop={scrollTop} />
      <div className={styles.editorInner}>
        <pre
          ref={preRef}
          className={styles.highlight}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightHtml(value) + '\n' }}
        />
        <textarea
          className={styles.editorTextarea}
          value={value}
          onChange={e => onChange(e.target.value)}
          onPaste={e => {
            const text = e.clipboardData.getData('text/plain');
            if (onPaste && text) onPaste(text);
          }}
          onScroll={handleScroll}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}

function CodeOutput({ value, placeholder }) {
  const [scrollTop, setScrollTop] = useState(0);
  const lineCount = value ? value.split('\n').length : 0;

  if (!value) {
    return (
      <div className={styles.editorWrapper}>
        <div className={styles.editorInner}>
          <pre className={styles.highlight} style={{ color: '#444' }}>{placeholder}</pre>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.editorWrapper}>
      <LineNumbers count={lineCount} scrollTop={scrollTop} />
      <div className={styles.editorInner}>
        <pre
          className={`${styles.highlight} ${styles.outputPre}`}
          onScroll={e => setScrollTop(e.target.scrollTop)}
          dangerouslySetInnerHTML={{ __html: highlightJsx(value) + '\n' }}
        />
      </div>
    </div>
  );
}

// ─── Sample ──────────────────────────────────────────────────────────────────

const SAMPLE = `<div class="card" onclick="handleClick()" style="border: 1px solid red">
  <img src="avatar.png" alt="User avatar" />
  <div class="content">
    <h2 class="title">Hello, World!</h2>
    <p style="color: red; font-size: 14px;">Sample paragraph.</p>
    <label for="email">Email address</label>
    <input type="email" id="email" maxlength="100" readonly />
    <button class="btn btn-primary" tabindex="0">Submit</button>
  </div>
</div>`;

// ─── Main component ──────────────────────────────────────────────────────────

export default function HtmlToJsxConverterTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState({ text: 'Ready', state: '' });
  const [lineCount, setLineCount] = useState(null);
  const [copyDone, setCopyDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyIdRef = useRef(0);
  const [opts, setOpts] = useState({
    selfClosing: true, className: true, htmlFor: true,
    camelEvents: true, inlineStyle: true, wrapFragment: true, wrapComponent: false,
  });

  const convert = useCallback((html, options) => {
    if (!html.trim()) { setOutput(''); setStatus({ text: 'Ready', state: '' }); setLineCount(null); return; }
    try {
      const jsx = htmlToJsx(html, options);
      setOutput(jsx);
      setStatus({ text: 'Converted', state: 'ok' });
      setLineCount(jsx.split('\n').length);
    } catch (e) {
      setStatus({ text: 'Error: ' + e.message, state: 'warn' });
    }
  }, []);

  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);
    historyIdRef.current = stored.reduce((maxId, entry) => Math.max(maxId, entry.id || 0), 0);
    convert(SAMPLE, opts);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = (val) => { setInput(val); convert(val, opts); };
  const toggleOpt = (key) => { const n = { ...opts, [key]: !opts[key] }; setOpts(n); convert(input, n); };

  const saveHistoryEntry = useCallback((action, text) => {
    if (!text || !text.trim()) return;
    const entryText = text.trim();
    const entry = {
      id: ++historyIdRef.current,
      action,
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      chars: entryText.length,
      preview: entryText.replace(/\s+/g, ' ').trim().slice(0, 120),
      text: entryText,
    };
    setHistory(prev => persistHistory([entry, ...prev.filter(item => item.text !== entryText)].slice(0, MAX_HISTORY)));
  }, []);

  const applyHistoryEntry = (entry) => {
    setInput(entry.text);
    convert(entry.text, opts);
    setHistoryOpen(false);
  };

  const clearHistory = () => {
    setHistory(persistHistory([]));
    historyIdRef.current = 0;
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 1800);
      saveHistoryEntry('Copy', input);
    });
  };

  const handleDownload = () => {
    if (!output) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' }));
    a.download = 'component.jsx'; a.click();
  };

  const TOGGLES = [
    { key: 'selfClosing', label: 'Self-closing tags' },
    { key: 'className', label: 'class → className' },
    { key: 'htmlFor', label: 'for → htmlFor' },
    { key: 'camelEvents', label: 'Camel events' },
    { key: 'inlineStyle', label: 'Style strings → objects' },
    { key: 'wrapFragment', label: 'Wrap in <>…</>' },
    { key: 'wrapComponent', label: 'Export component' },
  ];

  return (
    <div className={styles.wrap}>
      <DevConvertersTopNav active="html-to-jsx-converter" />
      <PlaygroundTopAd />
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>&lt;/&gt;</div>
          <div className={styles.logoText}>HTML <span>→</span> JSX</div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.btnSm} onClick={() => setHistoryOpen(true)}>
            History{history.length ? ` (${history.length})` : ''}
          </button>
          <span className={styles.tag}>React Dev Tool</span>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.optionsBar}>
          <span className={styles.optionLabel}>Options:</span>
          {TOGGLES.map(o => (
            <button key={o.key} className={`${styles.toggle} ${opts[o.key] ? styles.toggleActive : ''}`} onClick={() => toggleOpt(o.key)}>
              <span className={styles.toggleDot}></span>{o.label}
            </button>
          ))}
        </div>
        <div className={styles.editorGrid}>
          <div className={styles.pane}>
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}>HTML Input</span>
              <div className={styles.paneActions}>
                <button className={styles.btnSm} onClick={() => { setInput(SAMPLE); convert(SAMPLE, opts); saveHistoryEntry('Sample', SAMPLE); }}>Sample</button>
                <button className={styles.btnSm} onClick={() => { const p = prettify(input); setInput(p); convert(p, opts); saveHistoryEntry('Prettify', p); }}>Prettify</button>
                <button className={styles.btnSm} onClick={() => { setInput(''); setOutput(''); setStatus({ text: 'Ready', state: '' }); setLineCount(null); }}>Clear</button>
              </div>
            </div>
            <CodeEditor
              value={input}
              onChange={handleInput}
              onPaste={(text) => saveHistoryEntry('Paste', text)}
              placeholder="Paste your HTML here…"
            />
          </div>
          <div className={styles.pane}>
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}>JSX Output</span>
              <div className={styles.paneActions}>
                <button className={`${styles.btnSm} ${copyDone ? styles.btnSuccess : ''}`} onClick={handleCopy}>{copyDone ? 'Copied!' : 'Copy'}</button>
                <button className={styles.btnSm} onClick={handleDownload}>Download .jsx</button>
              </div>
            </div>
            <CodeOutput value={output} placeholder="JSX will appear here…" />
          </div>
        </div>
      </div>
      <div className={styles.statusBar}>
        <div className={styles.statusItem}>
          <span className={`${styles.statusDot} ${status.state === 'ok' ? styles.statusOk : status.state === 'warn' ? styles.statusWarn : ''}`}></span>
          <span>{status.text}</span>
        </div>
        {lineCount !== null && <div className={styles.statusItem}>— {lineCount} lines</div>}
      </div>
      {historyOpen && (
        <div className={styles.historyOverlay} onClick={() => setHistoryOpen(false)}>
          <div className={styles.historyPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.historyPanelHead}>
              <div>
                <div className={styles.historyPanelTitle}>Conversion History</div>
                <div className={styles.historyItemTs}>{history.length} saved entries</div>
              </div>
              <div className={styles.historyPanelActions}>
                <button className={styles.btnSm} onClick={clearHistory}>Clear</button>
                <button className={styles.btnSm} onClick={() => setHistoryOpen(false)}>Close</button>
              </div>
            </div>
            <div className={styles.historyList}>
              {history.length === 0 ? (
                <div className={styles.historyEmpty}>No saved conversions yet. Use Sample, Prettify, or Copy to add history entries.</div>
              ) : history.map(entry => (
                <button key={entry.id} className={styles.historyItem} onClick={() => applyHistoryEntry(entry)}>
                  <div className={styles.historyItemTop}>
                    <span className={styles.historyItemAction}>{entry.action}</span>
                    <span className={styles.historyItemTs}>{entry.ts}</span>
                  </div>
                  <div className={styles.historyItemMeta}>{entry.chars} chars</div>
                  <div className={styles.historyItemPreview}>{entry.preview}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
