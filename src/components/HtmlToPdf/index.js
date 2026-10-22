'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { marked } from 'marked';
import s from './styles.module.css';
import PdfToolsTopNav from '@/components/PdfToolsTopNav';

const LS_KEY = 'html-to-pdf-state';

function loadSaved() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

const SAMPLE_MD = `# Project Proposal

**Author:** Jane Smith
**Date:** May 2026
**Status:** Draft

---

## Overview

This document outlines the proposal for the **Q3 Platform Redesign** project. The goal is to modernise the user interface, improve performance, and reduce onboarding time for new customers.

## Goals

1. Reduce average page load time by **40%**
2. Increase new-user activation rate from 52% to 70%
3. Migrate all legacy jQuery components to React

## Timeline

| Phase        | Duration  | Owner         |
|--------------|-----------|---------------|
| Discovery    | 2 weeks   | Product team  |
| Design       | 3 weeks   | UX team       |
| Development  | 8 weeks   | Engineering   |
| QA & Launch  | 2 weeks   | All teams     |

## Technical Notes

The redesign will use the following stack:

\`\`\`
Framework  : Next.js 15
Styling    : CSS Modules
State      : React 19 (built-in hooks)
Deployment : Vercel (Edge Network)
\`\`\`

> **Note:** All legacy API endpoints must remain backward-compatible during the migration period to avoid breaking existing integrations.

## Next Steps

- [ ] Sign off on design mockups by 15 May
- [ ] Provision staging environment
- [ ] Schedule kick-off meeting with all stakeholders
`;

const SAMPLE_HTML = `<h1>Project Proposal</h1>
<p><strong>Author:</strong> Jane Smith &nbsp;&nbsp;
<strong>Date:</strong> May 2026 &nbsp;&nbsp;
<strong>Status:</strong> Draft</p>
<hr>
<h2>Overview</h2>
<p>This document outlines the proposal for the <strong>Q3 Platform Redesign</strong> project.
The goal is to modernise the user interface, improve performance, and reduce onboarding time
for new customers.</p>
<h2>Goals</h2>
<ol>
  <li>Reduce average page load time by <strong>40%</strong></li>
  <li>Increase new-user activation rate from 52% to 70%</li>
  <li>Migrate all legacy jQuery components to React</li>
</ol>
<h2>Timeline</h2>
<table>
  <thead><tr><th>Phase</th><th>Duration</th><th>Owner</th></tr></thead>
  <tbody>
    <tr><td>Discovery</td><td>2 weeks</td><td>Product team</td></tr>
    <tr><td>Design</td><td>3 weeks</td><td>UX team</td></tr>
    <tr><td>Development</td><td>8 weeks</td><td>Engineering</td></tr>
    <tr><td>QA &amp; Launch</td><td>2 weeks</td><td>All teams</td></tr>
  </tbody>
</table>
<h2>Technical Notes</h2>
<pre><code>Framework  : Next.js 15
Styling    : CSS Modules
State      : React 19 (built-in hooks)
Deployment : Vercel (Edge Network)</code></pre>
<blockquote>
  <p><strong>Note:</strong> All legacy API endpoints must remain backward-compatible during the
  migration period to avoid breaking existing integrations.</p>
</blockquote>
`;

const FONT_FAMILIES = [
  { label: 'Sans-serif', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' },
  { label: 'Serif',      value: 'Georgia, "Times New Roman", Times, serif' },
  { label: 'Monospace',  value: '"Courier New", Courier, monospace' },
];

const FONT_SIZES = ['11px', '12px', '13px', '14px', '16px', '18px'];

const PAGE_SIZES = [
  { label: 'A4',     css: 'A4'     },
  { label: 'Letter', css: 'letter' },
  { label: 'Legal',  css: 'legal'  },
];

function buildPrintHtml({ bodyHtml, font, fontSize, pageSize, orientation }) {
  const orientPart = orientation === 'landscape' ? ' landscape' : '';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@page { size: ${pageSize}${orientPart}; margin: 20mm; }
*, *::before, *::after { box-sizing: border-box; }
body {
  font-family: ${font};
  font-size: ${fontSize};
  line-height: 1.65;
  color: #1a1a1a;
  margin: 0;
  padding: 0;
}
h1 { font-size: 2em; margin: 0 0 0.5em; line-height: 1.25; }
h2 { font-size: 1.45em; margin: 1.2em 0 0.4em; line-height: 1.3; }
h3 { font-size: 1.2em; margin: 1em 0 0.35em; }
h4, h5, h6 { margin: 0.8em 0 0.3em; }
p { margin: 0 0 0.8em; }
ul, ol { padding-left: 1.6em; margin: 0 0 0.8em; }
li { margin-bottom: 0.3em; }
code {
  background: #f3f4f6;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.85em;
  font-family: "Courier New", Courier, monospace;
}
pre {
  background: #f3f4f6;
  padding: 0.9em 1.1em;
  border-radius: 6px;
  overflow: auto;
  margin: 0 0 0.8em;
}
pre code { background: none; padding: 0; font-size: inherit; }
blockquote {
  border-left: 3px solid #d1d5db;
  margin: 0 0 0.8em;
  padding: 0.4em 1em;
  color: #6b7280;
}
table { width: 100%; border-collapse: collapse; margin: 0 0 0.8em; font-size: 0.95em; }
th, td { border: 1px solid #e5e7eb; padding: 0.45em 0.75em; text-align: left; }
th { background: #f9fafb; font-weight: 600; }
img { max-width: 100%; height: auto; }
hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.2em 0; }
a { color: #2563eb; text-decoration: underline; }
strong { font-weight: 700; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
}

export default function HtmlToPdf() {
  const [mode, setMode]             = useState('markdown');
  const [content, setContent]       = useState(SAMPLE_MD);
  const [font, setFont]             = useState(FONT_FAMILIES[0].value);
  const [fontSize, setFontSize]     = useState('14px');
  const [pageSize, setPageSize]     = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [printing, setPrinting]     = useState(false);
  const [saved, setSaved]           = useState(false);
  const [histIdx, setHistIdx]       = useState(0);

  const hydrated   = useRef(false);
  const saveTimer  = useRef(null);
  const histStack  = useRef([SAMPLE_MD]); // content snapshots
  const skipHist   = useRef(false);       // true while undo/redo is applying
  const histTimer  = useRef(null);

  // Restore from localStorage on first mount, then init history with loaded content
  useEffect(() => {
    const data = loadSaved();
    let initial = SAMPLE_MD;
    if (data) {
      if (data.content   !== undefined) { setContent(data.content); initial = data.content; }
      if (data.mode)                    setMode(data.mode);
      if (data.font)                    setFont(data.font);
      if (data.fontSize)                setFontSize(data.fontSize);
      if (data.pageSize)                setPageSize(data.pageSize);
      if (data.orientation)             setOrientation(data.orientation);
      setSaved(true);
    }
    histStack.current = [initial];
    setHistIdx(0);
    hydrated.current = true;
  }, []);

  // Debounced history snapshot on content change
  useEffect(() => {
    if (!hydrated.current) return;
    if (skipHist.current) { skipHist.current = false; return; }
    clearTimeout(histTimer.current);
    histTimer.current = setTimeout(() => {
      const stack = histStack.current;
      if (content === stack[histIdx]) return;
      const next = stack.slice(0, histIdx + 1);
      next.push(content);
      histStack.current = next;
      setHistIdx(next.length - 1);
    }, 500);
    return () => clearTimeout(histTimer.current);
  // histIdx intentionally omitted — we read it synchronously via the ref's derived value
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // Debounced autosave
  useEffect(() => {
    if (!hydrated.current) return;
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify({ content, mode, font, fontSize, pageSize, orientation }));
        setSaved(true);
      } catch { /* quota exceeded */ }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [content, mode, font, fontSize, pageSize, orientation]);

  const undo = useCallback(() => {
    setHistIdx(i => {
      const next = Math.max(0, i - 1);
      if (next === i) return i;
      skipHist.current = true;
      setContent(histStack.current[next]);
      return next;
    });
  }, []);

  const redo = useCallback(() => {
    setHistIdx(i => {
      const next = Math.min(histStack.current.length - 1, i + 1);
      if (next === i) return i;
      skipHist.current = true;
      setContent(histStack.current[next]);
      return next;
    });
  }, []);

  const canUndo = histIdx > 0;
  const canRedo = histIdx < histStack.current.length - 1;

  const clear = () => {
    if (content && !window.confirm('Clear all content?')) return;
    setContent('');
  };

  const onKeyDown = useCallback((e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
    if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redo(); }
  }, [undo, redo]);

  const bodyHtml = useMemo(() => {
    if (mode === 'markdown') {
      try { return marked.parse(content); } catch { return '<p>Parse error in Markdown.</p>'; }
    }
    return content;
  }, [mode, content]);

  const previewDoc = useMemo(
    () => buildPrintHtml({ bodyHtml, font, fontSize, pageSize, orientation }),
    [bodyHtml, font, fontSize, pageSize, orientation]
  );

  const switchMode = (next) => {
    if (next === mode) return;
    if (next === 'html') {
      try { setContent(marked.parse(content)); } catch { /* keep */ }
    } else {
      setContent(SAMPLE_MD);
    }
    setMode(next);
  };

  const download = useCallback(() => {
    setPrinting(true);
    const win = window.open('', '_blank');
    if (!win) {
      alert('Pop-up blocked. Please allow pop-ups for this site and try again.');
      setPrinting(false);
      return;
    }
    win.document.write(buildPrintHtml({ bodyHtml, font, fontSize, pageSize, orientation }));
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      setPrinting(false);
    }, 350);
  }, [bodyHtml, font, fontSize, pageSize, orientation]);

  return (
    <div className={s.container}>
      <PdfToolsTopNav active="html-to-pdf" />
      {/* Toolbar */}
      <div className={s.toolbar}>
        <div className={s.toolbarLeft}>
          <img src="/icons/html-to-pdf.svg" width={26} height={26} alt="" />
          HTML / Markdown to PDF
        </div>
        <div className={s.toolbarRight}>
          <span className={`${s.savedBadge} ${saved ? s.savedOn : s.savedPending}`}>
            <span className={s.savedDot} />
            {saved ? 'Saved' : 'Saving…'}
          </span>

          <div className={s.historyBtns}>
            <button className={s.historyBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">↩</button>
            <button className={s.historyBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">↪</button>
          </div>

          <div className={s.modeToggle}>
            <button
              className={`${s.modeBtn} ${mode === 'markdown' ? s.modeActive : ''}`}
              onClick={() => switchMode('markdown')}
            >Markdown</button>
            <button
              className={`${s.modeBtn} ${mode === 'html' ? s.modeActive : ''}`}
              onClick={() => switchMode('html')}
            >HTML</button>
          </div>

          <select className={s.select} value={font} onChange={e => setFont(e.target.value)} title="Font family">
            {FONT_FAMILIES.map(f => <option key={f.label} value={f.value}>{f.label}</option>)}
          </select>

          <select className={s.select} value={fontSize} onChange={e => setFontSize(e.target.value)} title="Font size">
            {FONT_SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
          </select>

          <select className={s.select} value={pageSize} onChange={e => setPageSize(e.target.value)} title="Paper size">
            {PAGE_SIZES.map(p => <option key={p.label} value={p.css}>{p.label}</option>)}
          </select>

          <button
            className={`${s.orientBtn} ${orientation === 'landscape' ? s.orientActive : ''}`}
            onClick={() => setOrientation(o => o === 'portrait' ? 'landscape' : 'portrait')}
            title={`Switch to ${orientation === 'portrait' ? 'landscape' : 'portrait'}`}
          >
            {orientation === 'portrait' ? '▯ Portrait' : '▭ Landscape'}
          </button>

          <button className={s.clearBtn} onClick={clear} title="Clear editor">
            Clear
          </button>

          <button
            className={s.downloadBtn}
            onClick={download}
            disabled={printing || !content.trim()}
          >
            {printing ? 'Opening…' : '↓ Download PDF'}
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className={s.split}>
        <div className={s.editorPane}>
          <div className={s.paneHeader}>{mode === 'markdown' ? 'Markdown' : 'HTML'}</div>
          <textarea
            className={s.editor}
            value={content}
            onChange={e => setContent(e.target.value)}
            spellCheck={false}
            placeholder={mode === 'markdown' ? '# Start typing Markdown…' : '<h1>Start typing HTML…</h1>'}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className={s.previewPane}>
          <div className={s.paneHeader}>Preview</div>
          <iframe
            className={s.preview}
            srcDoc={previewDoc}
            title="PDF Preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
