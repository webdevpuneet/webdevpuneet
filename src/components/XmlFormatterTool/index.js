'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './styles.module.css';
import DevConvertersTopNav from '@/components/DevConvertersTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
// ── Pure XML utilities ────────────────────────────────────────────────────────

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sample XML document -->
<bookstore xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <book category="fiction" id="b1">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price currency="USD">12.99</price>
  </book>
  <book category="science" id="b2">
    <title lang="en">A Brief History of Time</title>
    <author>Stephen Hawking</author>
    <year>1988</year>
    <price currency="USD">14.99</price>
    <description><![CDATA[A landmark volume in science writing by one of the great minds of our time, Stephen Hawking's book explores such profound questions as: How did the universe begin—and what made its start possible?]]></description>
  </book>
</bookstore>`.trim();

/**
 * Tokenise an XML string into an array of token objects.
 * Token types: 'prolog', 'comment', 'cdata', 'open', 'close', 'self', 'text', 'pi'
 */
function tokenize(xml) {
  const tokens = [];
  let i = 0;
  const len = xml.length;

  while (i < len) {
    if (xml[i] !== '<') {
      // text node
      let j = xml.indexOf('<', i);
      if (j === -1) j = len;
      const text = xml.slice(i, j);
      if (text.trim()) tokens.push({ type: 'text', raw: text });
      else tokens.push({ type: 'ws', raw: text }); // whitespace-only
      i = j;
      continue;
    }

    // starts with '<'
    if (xml.startsWith('<?', i)) {
      // processing instruction / XML declaration
      const end = xml.indexOf('?>', i);
      if (end === -1) throw { message: 'Unclosed processing instruction', pos: i };
      tokens.push({ type: 'pi', raw: xml.slice(i, end + 2) });
      i = end + 2;
    } else if (xml.startsWith('<!--', i)) {
      // comment
      const end = xml.indexOf('-->', i);
      if (end === -1) throw { message: 'Unclosed comment', pos: i };
      tokens.push({ type: 'comment', raw: xml.slice(i, end + 3) });
      i = end + 3;
    } else if (xml.startsWith('<![CDATA[', i)) {
      // CDATA section
      const end = xml.indexOf(']]>', i);
      if (end === -1) throw { message: 'Unclosed CDATA section', pos: i };
      tokens.push({ type: 'cdata', raw: xml.slice(i, end + 3) });
      i = end + 3;
    } else if (xml.startsWith('</', i)) {
      // closing tag
      const end = xml.indexOf('>', i);
      if (end === -1) throw { message: 'Unclosed closing tag', pos: i };
      const raw = xml.slice(i, end + 1);
      const name = raw.slice(2, raw.length - 1).trim();
      tokens.push({ type: 'close', raw, name });
      i = end + 1;
    } else {
      // opening or self-closing tag
      let end = i + 1;
      let inStr = false;
      let strChar = '';
      while (end < len) {
        const ch = xml[end];
        if (inStr) {
          if (ch === strChar) inStr = false;
        } else if (ch === '"' || ch === "'") {
          inStr = true; strChar = ch;
        } else if (ch === '>') {
          break;
        }
        end++;
      }
      if (end >= len) throw { message: 'Unclosed tag', pos: i };
      const raw = xml.slice(i, end + 1);
      const selfClose = raw.endsWith('/>');
      // extract tag name
      const nameMatch = raw.match(/^<([^\s/>]+)/);
      const name = nameMatch ? nameMatch[1] : '';
      tokens.push({ type: selfClose ? 'self' : 'open', raw, name });
      i = end + 1;
    }
  }
  return tokens;
}

/**
 * Validate tokens for balanced tags. Returns null on success or an error string.
 * Also performs a rough char-position → line/col mapping.
 */
function validateTokens(tokens, originalXml) {
  // Build char offsets for line/col lookup
  const lineOffsets = [0];
  for (let i = 0; i < originalXml.length; i++) {
    if (originalXml[i] === '\n') lineOffsets.push(i + 1);
  }
  function posToLineCol(pos) {
    let lo = 0, hi = lineOffsets.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineOffsets[mid] <= pos) lo = mid; else hi = mid - 1;
    }
    return { line: lo + 1, col: pos - lineOffsets[lo] + 1 };
  }

  const stack = [];
  let docRootCount = 0;

  for (const tok of tokens) {
    if (tok.type === 'open') {
      stack.push(tok);
    } else if (tok.type === 'self') {
      docRootCount++;
    } else if (tok.type === 'close') {
      if (stack.length === 0) {
        return `Unexpected closing tag </${tok.name}> — no matching opening tag`;
      }
      const open = stack[stack.length - 1];
      if (open.name !== tok.name) {
        // Try to find a better message
        const loc = posToLineCol(originalXml.indexOf(tok.raw));
        return `Mismatched tag: expected </${open.name}> but found </${tok.name}> (line ${loc.line}, col ${loc.col})`;
      }
      stack.pop();
      if (stack.length === 0) docRootCount++;
    }
  }

  if (stack.length > 0) {
    const last = stack[stack.length - 1];
    const loc = posToLineCol(originalXml.indexOf(last.raw));
    return `Unclosed tag <${last.name}> opened at line ${loc.line}, col ${loc.col}`;
  }

  if (docRootCount > 1) {
    return 'Multiple root elements — XML must have exactly one root element';
  }

  return null; // valid
}

/**
 * Pretty-print XML from tokens with configurable indent string.
 */
function formatTokens(tokens, indentStr) {
  let depth = 0;
  const lines = [];
  const ind = () => indentStr.repeat(depth);

  for (const tok of tokens) {
    if (tok.type === 'ws') continue; // strip inter-tag whitespace

    if (tok.type === 'pi' || tok.type === 'comment') {
      lines.push(ind() + tok.raw);
    } else if (tok.type === 'cdata') {
      lines.push(ind() + tok.raw);
    } else if (tok.type === 'open') {
      lines.push(ind() + tok.raw);
      depth++;
    } else if (tok.type === 'self') {
      lines.push(ind() + tok.raw);
    } else if (tok.type === 'close') {
      depth = Math.max(0, depth - 1);
      // check if last line was its open tag — if so, merge as inline
      const lastIdx = lines.length - 1;
      if (lastIdx >= 0) {
        const last = lines[lastIdx];
        const openTagRe = new RegExp(`^(\\s*)<${tok.name}(\\s[^>]*)?>$`);
        if (openTagRe.test(last)) {
          lines[lastIdx] = last + tok.raw;
          continue;
        }
      }
      lines.push(ind() + tok.raw);
    } else if (tok.type === 'text') {
      lines.push(ind() + tok.raw.trim());
    }
  }

  return lines.join('\n');
}

/**
 * Minify XML: strip all inter-tag whitespace, keep text nodes.
 */
function minifyTokens(tokens) {
  const parts = [];
  for (const tok of tokens) {
    if (tok.type === 'ws') continue;
    if (tok.type === 'text') parts.push(tok.raw.trim());
    else parts.push(tok.raw);
  }
  return parts.join('');
}

/**
 * Syntax-highlight a formatted XML string.
 * Returns an HTML string with <span> elements.
 */
function syntaxHighlight(xml) {
  // We'll build output char-by-char via regex replacement on each token-section
  return xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '\x00LT\x00')
    .replace(/>/g, '\x00GT\x00')
    .split('\n')
    .map(line => {
      // Restore and wrap
      let s = line
        // comments
        .replace(/\x00LT\x00(!--[\s\S]*?--)\x00GT\x00/g,
          (_, inner) => `<span class="xml-comment">&lt;${inner}&gt;</span>`)
        // CDATA
        .replace(/\x00LT\x00(!\[CDATA\[[\s\S]*?]])\x00GT\x00/g,
          (_, inner) => `<span class="xml-cdata">&lt;${inner}&gt;</span>`)
        // processing instructions
        .replace(/\x00LT\x00(\?[\s\S]*?\?)\x00GT\x00/g,
          (_, inner) => `<span class="xml-pi">&lt;${inner}&gt;</span>`)
        // closing tags
        .replace(/\x00LT\x00(\/[^\x00]+)\x00GT\x00/g,
          (_, inner) => {
            const name = inner.slice(1).trim();
            return `<span class="xml-bracket">&lt;/</span><span class="xml-tag">${name}</span><span class="xml-bracket">&gt;</span>`;
          })
        // opening / self-closing tags with attributes
        .replace(/\x00LT\x00([^\x00/][^\x00]*)\x00GT\x00/g,
          (_, inner) => {
            // inner is like: tagName attr1="val1" attr2='val2' or tagName/
            const selfClose = inner.endsWith('/');
            const body = selfClose ? inner.slice(0, -1).trimEnd() : inner;
            // split tag name from attributes
            const spaceIdx = body.search(/\s/);
            const tagName = spaceIdx === -1 ? body : body.slice(0, spaceIdx);
            const attrStr = spaceIdx === -1 ? '' : body.slice(spaceIdx);

            // highlight attributes
            const attrHtml = attrStr.replace(
              /(\s+)([\w:.-]+)(=)(["'])([^"']*)(["'])/g,
              (_, ws, name, eq, q1, val, q2) =>
                `${ws}<span class="xml-attr">${name}</span>${eq}<span class="xml-value">${q1}${val}${q2}</span>`
            );

            return `<span class="xml-bracket">&lt;</span><span class="xml-tag">${tagName}</span>${attrHtml}<span class="xml-bracket">${selfClose ? ' /' : ''}&gt;</span>`;
          });
      // Restore any unmatched lt/gt
      s = s.replace(/\x00LT\x00/g, '&lt;').replace(/\x00GT\x00/g, '&gt;');
      return s;
    })
    .join('\n');
}

function getIndentStr(indent) {
  if (indent === 'tab') return '\t';
  return ' '.repeat(parseInt(indent));
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function XmlFormatterTool() {
  const [input, setInput] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [outputText, setOutputText] = useState('');
  const [indent, setIndent] = useState('2');
  const [status, setStatus] = useState({ type: 'idle', msg: 'Paste or type XML, then click Format' });
  const [outMeta, setOutMeta] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const inputRef       = useRef(null);
  const inputGutterRef  = useRef(null);
  const outputGutterRef = useRef(null);
  const toastTimerRef  = useRef(null);
  const debounceRef    = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast({ show: false, msg: '' }), 2200);
  }, []);

  const processXml = useCallback((raw, ind, mode = 'format') => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setStatus({ type: 'idle', msg: 'Paste or type XML, then click Format' });
      setOutputHtml('');
      setOutputText('');
      setIsEmpty(true);
      setOutMeta('');
      return;
    }

    try {
      const tokens = tokenize(trimmed);
      const validErr = validateTokens(tokens, trimmed);

      if (validErr) {
        setStatus({ type: 'err', msg: validErr });
        setOutputHtml('');
        setOutputText('');
        setIsEmpty(true);
        setOutMeta('');
        return;
      }

      let result;
      if (mode === 'minify') {
        result = minifyTokens(tokens);
      } else {
        result = formatTokens(tokens, getIndentStr(ind));
      }

      const lines = result.split('\n').length;
      const size = formatSize(new Blob([result]).size);
      setOutputHtml(syntaxHighlight(result));
      setOutputText(result);
      setIsEmpty(false);
      setStatus({ type: 'ok', msg: mode === 'minify' ? `Minified · ${size}` : 'Valid XML' });
      setOutMeta(mode === 'minify' ? `1 line · ${size}` : `${lines} lines · ${size}`);
    } catch (err) {
      const msg = err.message || 'Invalid XML';
      setStatus({ type: 'err', msg });
      setOutputHtml('');
      setOutputText('');
      setIsEmpty(true);
      setOutMeta('');
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => processXml(val, indent), 400);
  };

  const handleFormat = () => processXml(input, indent, 'format');
  const handleMinify = () => processXml(input, indent, 'minify');
  const handleValidate = () => {
    const trimmed = input.trim();
    if (!trimmed) { showToast('No XML to validate'); return; }
    try {
      const tokens = tokenize(trimmed);
      const err = validateTokens(tokens, trimmed);
      if (err) {
        setStatus({ type: 'err', msg: err });
        showToast('Invalid XML — see error');
      } else {
        setStatus({ type: 'ok', msg: 'Valid XML — no errors found' });
        showToast('Valid XML');
      }
    } catch (e) {
      setStatus({ type: 'err', msg: e.message || 'Parse error' });
      showToast('Parse error');
    }
  };

  const handleSample = () => {
    setInput(SAMPLE_XML);
    processXml(SAMPLE_XML, indent, 'format');
  };

  const handleIndentChange = (e) => {
    const val = e.target.value;
    setIndent(val);
    if (input.trim()) processXml(input, val, 'format');
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => showToast('Copied to clipboard!'));
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.xml';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded formatted.xml');
  };

  const handleClear = () => {
    setInput('');
    setOutputHtml('');
    setOutputText('');
    setIsEmpty(true);
    setStatus({ type: 'idle', msg: 'Paste or type XML, then click Format' });
    setOutMeta('');
    inputRef.current?.focus();
  };

  function syncScroll(e, ref) {
    if (ref.current) ref.current.scrollTop = e.target.scrollTop;
  }

  const inputLineCount  = input      ? input.split('\n').length      : 1;
  const outputLineCount = outputText ? outputText.split('\n').length : 1;

  function LineNums({ count, gutterRef }) {
    return (
      <div className={styles.lineNums} ref={gutterRef} aria-hidden="true">
        {Array.from({ length: Math.max(count, 1) }, (_, i) => (
          <div key={i} className={styles.lineNum}>{i + 1}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <DevConvertersTopNav active="xml-formatter" />
      <PlaygroundTopAd />
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/icons/xml-formatter.svg" alt="" width={28} height={28} className={styles.logoIcon} />
          XML<span>formatter</span>
        </div>
        <div className={styles.toolbar}>
          <button className={`${styles.btn} ${styles.primary}`} onClick={handleFormat}>Format</button>
          <button className={styles.btn} onClick={handleMinify}>Minify</button>
          <button className={styles.btn} onClick={handleValidate}>Validate</button>
          <div className={styles.divider} />
          <select className={styles.indentSelect} value={indent} onChange={handleIndentChange} aria-label="Indent size">
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tab</option>
          </select>
          <div className={styles.divider} />
          <button className={styles.btn} onClick={handleSample}>Sample</button>
          <button className={styles.btn} onClick={handleCopy} disabled={isEmpty}>Copy</button>
          <button className={styles.btn} onClick={handleDownload} disabled={isEmpty}>Download</button>
          <button className={`${styles.btn} ${styles.danger}`} onClick={handleClear}>Clear</button>
        </div>
      </header>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={`${styles.statusDot} ${styles[status.type]}`} />
        <span className={`${styles.statusMsg} ${styles[status.type]}`}>{status.msg}</span>
        {outMeta && <span className={styles.outMeta}>{outMeta}</span>}
      </div>

      {/* Privacy note */}
      <div className={styles.privacyNote}>
        Runs fully in your browser — no data is uploaded or stored.
      </div>

      {/* Two-panel layout */}
      <main className={styles.panels}>
        {/* Input Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>Input</span>
          </div>
          <div className={styles.panelBody}>
            <LineNums count={inputLineCount} gutterRef={inputGutterRef} />
            <textarea
              ref={inputRef}
              className={styles.textarea}
              value={input}
              onChange={handleInputChange}
              onScroll={e => syncScroll(e, inputGutterRef)}
              placeholder={`Paste your XML here…\n\nExample:\n<root>\n  <item id="1">Hello</item>\n</root>`}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>Output</span>
            {outMeta && <span className={styles.panelMeta}>{outMeta}</span>}
          </div>
          <div className={styles.panelBody}>
            {!isEmpty && <LineNums count={outputLineCount} gutterRef={outputGutterRef} />}
            <div
              className={styles.outputScroll}
              onScroll={e => syncScroll(e, outputGutterRef)}
            >
              {isEmpty ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyGlyph}>&lt;/&gt;</div>
                  <div className={styles.emptyText}>formatted XML will appear here</div>
                </div>
              ) : (
                <div
                  className={styles.output}
                  dangerouslySetInnerHTML={{ __html: outputHtml }}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      <div className={`${styles.toast} ${toast.show ? styles.toastShow : ''}`}>
        {toast.msg}
      </div>
    </div>
  );
}
