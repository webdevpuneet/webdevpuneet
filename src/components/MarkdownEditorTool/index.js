'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { marked } from 'marked';
import styles from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Markdown parser setup ───────────────────────────────────────────────── */

marked.use({ gfm: true, breaks: true });

function parseMarkdown(text) {
  if (!text.trim()) return '';
  try {
    const html = marked.parse(text);
    return sanitize(html);
  } catch {
    return '<p>Parse error</p>';
  }
}

function sanitize(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
    .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, '');
}

/* ── Sample content ──────────────────────────────────────────────────────── */

const SAMPLE = `# Welcome to Markdown Editor

Write **Markdown** on the left and see the *live preview* on the right.

## Text Formatting

You can write **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

## Code Blocks

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

## Tables

| Feature     | Supported | Notes               |
|-------------|-----------|---------------------|
| GFM Tables  | ✅ Yes    | Responsive styling  |
| Task Lists  | ✅ Yes    | Interactive preview |
| Code Blocks | ✅ Yes    | Syntax ready        |

## Task List

- [x] Live preview
- [x] Toolbar shortcuts
- [x] Export to .md and HTML
- [ ] Add more features

## Blockquote

> "Markdown is intended to be as easy-to-read and easy-to-write as is feasible."
> — John Gruber

---

Start editing to see changes live!
`;

const LS_KEY = 'md-editor-draft';

/* ── Toolbar definition ──────────────────────────────────────────────────── */

const TOOLBAR = [
  { group: 'headings', items: [
    { action: 'h1', label: 'H1', title: 'Heading 1' },
    { action: 'h2', label: 'H2', title: 'Heading 2' },
    { action: 'h3', label: 'H3', title: 'Heading 3' },
  ]},
  { group: 'format', items: [
    { action: 'bold',   label: 'B',   title: 'Bold (Ctrl+B)',   bold: true },
    { action: 'italic', label: 'I',   title: 'Italic (Ctrl+I)', italic: true },
    { action: 'strike', label: 'S',   title: 'Strikethrough',   strike: true },
  ]},
  { group: 'code', items: [
    { action: 'code',      label: '` `',  title: 'Inline code' },
    { action: 'codeblock', label: '```',  title: 'Code block' },
  ]},
  { group: 'blocks', items: [
    { action: 'blockquote', label: '❝',  title: 'Blockquote' },
    { action: 'ul',         label: '•—', title: 'Unordered list' },
    { action: 'ol',         label: '1.', title: 'Ordered list' },
    { action: 'task',       label: '☑',  title: 'Task list' },
  ]},
  { group: 'insert', items: [
    { action: 'link',  label: '🔗',  title: 'Link (Ctrl+K)' },
    { action: 'image', label: '🖼',  title: 'Image' },
    { action: 'table', label: '⊞',   title: 'Table' },
    { action: 'hr',    label: '—',   title: 'Horizontal rule' },
  ]},
];

/* ── Format helpers ──────────────────────────────────────────────────────── */

function buildApplyFormat(editorRef, setInput) {
  return function applyFormat(action) {
    const ta = editorRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    const v = ta.value;
    const sel = v.slice(s, e);

    const wrap = (pre, suf, ph = 'text') => {
      const inner = sel || ph;
      const nv = v.slice(0, s) + pre + inner + suf + v.slice(e);
      setInput(nv);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(s + pre.length, s + pre.length + inner.length);
      });
    };

    const linePrefix = (pre) => {
      const ls = v.lastIndexOf('\n', s - 1) + 1;
      const nv = v.slice(0, ls) + pre + v.slice(ls);
      setInput(nv);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(s + pre.length, e + pre.length);
      });
    };

    const ins = (text, ns = s + text.length, ne = ns) => {
      const nv = v.slice(0, s) + text + v.slice(e);
      setInput(nv);
      requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(ns, ne); });
    };

    const actions = {
      bold:       () => wrap('**', '**', 'bold text'),
      italic:     () => wrap('*', '*', 'italic text'),
      strike:     () => wrap('~~', '~~', 'strikethrough'),
      code:       () => wrap('`', '`', 'code'),
      h1:         () => linePrefix('# '),
      h2:         () => linePrefix('## '),
      h3:         () => linePrefix('### '),
      blockquote: () => linePrefix('> '),
      ul:         () => linePrefix('- '),
      ol:         () => linePrefix('1. '),
      task:       () => linePrefix('- [ ] '),
      link:       () => sel
        ? ins(`[${sel}](url)`, s + sel.length + 3, s + sel.length + 6)
        : wrap('[', '](url)', 'link text'),
      image:      () => sel
        ? ins(`![${sel}](url)`, s + sel.length + 4, s + sel.length + 7)
        : wrap('![', '](url)', 'alt text'),
      codeblock:  () => {
        const inner = sel || 'code here';
        ins(`\`\`\`\n${inner}\n\`\`\``, s + 4, s + 4 + inner.length);
      },
      table: () => ins('\n| Col 1 | Col 2 | Col 3 |\n|-------|-------|-------|\n| Cell  | Cell  | Cell  |\n'),
      hr:    () => ins('\n\n---\n\n'),
    };

    actions[action]?.();
  };
}

/* ── useCopy ─────────────────────────────────────────────────────────────── */

function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = useCallback((text, id) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(c => c === id ? '' : c), 1500);
    });
  }, []);
  return { copied, copy };
}

/* ── Main component ──────────────────────────────────────────────────────── */

export default function MarkdownEditorTool() {
  const [input, setInput]   = useState(SAMPLE);
  const [view, setView]     = useState('split'); // 'split' | 'editor' | 'preview'
  const [saved, setSaved]   = useState(false);
  const editorRef           = useRef(null);
  const previewRef          = useRef(null);
  const saveTimerRef        = useRef(null);
  const { copied, copy }    = useCopy();

  const applyFormat = useMemo(() => buildApplyFormat(editorRef, setInput), []);

  const html = useMemo(() => parseMarkdown(input), [input]);

  // Restore draft on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem(LS_KEY);
      if (draft) setInput(draft);
    } catch {}
  }, []);

  // Auto-save to localStorage (debounced 1s)
  useEffect(() => {
    setSaved(false);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, input); setSaved(true); } catch {}
    }, 1000);
    return () => clearTimeout(saveTimerRef.current);
  }, [input]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey)) {
      if (e.key === 'b') { e.preventDefault(); applyFormat('bold'); }
      if (e.key === 'i') { e.preventDefault(); applyFormat('italic'); }
      if (e.key === 'k') { e.preventDefault(); applyFormat('link'); }
    }
    // Tab → indent
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = editorRef.current;
      if (!ta) return;
      const s = ta.selectionStart;
      const v = ta.value;
      const nv = v.slice(0, s) + '  ' + v.slice(s);
      setInput(nv);
      requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(s + 2, s + 2); });
    }
  }, [applyFormat]);

  // Scroll sync (simple %)
  const syncEditorScroll = useCallback((e) => {
    const el = e.target;
    const pr = previewRef.current;
    if (!pr) return;
    const pct = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    pr.scrollTop = pct * (pr.scrollHeight - pr.clientHeight);
  }, []);

  // Stats
  const words = useMemo(() => {
    const t = input.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [input]);
  const chars = input.length;
  const lines = input.split('\n').length;

  // Downloads
  const downloadMd = useCallback(() => {
    const blob = new Blob([input], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(a.href);
  }, [input]);

  const downloadHtml = useCallback(() => {
    const full = `<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Document</title>\n<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:2em auto;padding:0 1em;line-height:1.6}code{background:#f4f4f4;padding:.1em .4em;border-radius:3px}pre{background:#f4f4f4;padding:1em;overflow-x:auto}blockquote{border-left:3px solid #ccc;margin:0;padding:0 1em;color:#666}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 12px}</style>\n</head>\n<body>\n${html}\n</body>\n</html>`;
    const blob = new Blob([full], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(a.href);
  }, [html]);

  const showEditor  = view === 'split' || view === 'editor';
  const showPreview = view === 'split' || view === 'preview';

  return (
    <div className={styles.wrap}>
      <TextToolsTopNav active="markdown-editor" />
      <PlaygroundTopAd />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><span className={styles.accent}>M↓</span></div>
          <span>Markdown Editor</span>
        </div>

        <div className={styles.headerRight}>
          {/* View toggle */}
          <div className={styles.segmented}>
            {[
              { id: 'editor',  label: 'Editor' },
              { id: 'split',   label: 'Split' },
              { id: 'preview', label: 'Preview' },
            ].map(v => (
              <button
                key={v.id}
                className={`${styles.seg} ${view === v.id ? styles.segActive : ''}`}
                onClick={() => setView(v.id)}
              >{v.label}</button>
            ))}
          </div>

          <button className={styles.headerBtn} onClick={() => {
            setInput(SAMPLE);
            try { localStorage.removeItem(LS_KEY); } catch {}
          }}>Reset</button>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        {TOOLBAR.map((group, gi) => (
          <div key={gi} className={styles.toolbarGroup}>
            {group.items.map(btn => (
              <button
                key={btn.action}
                className={styles.toolBtn}
                onClick={() => applyFormat(btn.action)}
                title={btn.title}
                style={btn.bold ? { fontWeight: 800 } : btn.italic ? { fontStyle: 'italic' } : btn.strike ? { textDecoration: 'line-through' } : {}}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* ── Panes ── */}
      <div className={styles.panesRow}>

        {/* Editor pane */}
        {showEditor && (
          <div className={`${styles.pane} ${view === 'split' ? styles.paneHalf : ''}`}>
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}><span className={styles.badge}>Markdown</span></span>
            </div>
            <textarea
              ref={editorRef}
              className={styles.editor}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={syncEditorScroll}
              spellCheck={false}
              placeholder="Write Markdown here…"
            />
          </div>
        )}

        {/* Divider */}
        {view === 'split' && <div className={styles.divider} />}

        {/* Preview pane */}
        {showPreview && (
          <div className={`${styles.pane} ${view === 'split' ? styles.paneHalf : ''}`}>
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}><span className={`${styles.badge} ${styles.badgePreview}`}>Preview</span></span>
            </div>
            <div
              ref={previewRef}
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: html || '<p class="md-empty">Nothing to preview yet…</p>' }}
            />
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <span className={styles.stat}>{words} words</span>
        <span className={styles.stat}>{chars} chars</span>
        <span className={styles.stat}>{lines} lines</span>
        <span className={`${styles.savedIndicator} ${saved ? styles.savedOk : ''}`}>
          {saved ? '✓ Saved' : '●'}
        </span>
        <div className={styles.footerActions}>
          <button
            className={`${styles.footerBtn} ${copied === 'md' ? styles.footerBtnOk : ''}`}
            onClick={() => copy(input, 'md')}
          >{copied === 'md' ? '✓ Copied' : 'Copy MD'}</button>
          <button
            className={`${styles.footerBtn} ${copied === 'html' ? styles.footerBtnOk : ''}`}
            onClick={() => copy(html, 'html')}
          >{copied === 'html' ? '✓ Copied' : 'Copy HTML'}</button>
          <button className={styles.footerBtn} onClick={downloadMd}>↓ .md</button>
          <button className={styles.footerBtn} onClick={downloadHtml}>↓ .html</button>
        </div>
      </div>
    </div>
  );
}
