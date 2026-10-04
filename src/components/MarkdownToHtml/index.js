'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { marked } from 'marked';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Parser ──────────────────────────────────────────────────────────────────── */
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

/* ── Sample ──────────────────────────────────────────────────────────────────── */
const SAMPLE = `# Markdown to HTML Converter

Convert **Markdown** to clean HTML instantly — paste your README, docs, or blog post on the left and copy the HTML on the right.

## Features

- **GFM support** — GitHub Flavored Markdown including tables and task lists
- *Italic*, **bold**, ~~strikethrough~~, and \`inline code\`
- Fenced code blocks with language hints

## Code Example

\`\`\`javascript
function hello(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Table Example

| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |

## Task List

- [x] Parse Markdown
- [x] Render HTML preview
- [ ] Deploy to production

> Blockquotes work too — great for callouts and pull quotes in documentation.

[Visit webdevpuneet.com](https://webdevpuneet.com)
`;

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function MarkdownToHtml() {
  const [input, setInput] = useState(SAMPLE);
  const [outputMode, setOutputMode] = useState('preview'); // 'preview' | 'html'
  const [copied, setCopied] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const textareaRef = useRef(null);

  const html = parseMarkdown(input);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1a1a1a; }
    h1,h2,h3,h4,h5,h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
    code { background: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    pre { background: #f4f4f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #e2e8f0; margin: 0; padding: 0 16px; color: #64748b; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; }
    th { background: #f8fafc; font-weight: 600; }
    img { max-width: 100%; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
${html}
</body>
</html>`;

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [html]);

  const copyFullHtml = useCallback(async () => {
    await navigator.clipboard.writeText(fullHtml);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  }, [fullHtml]);

  const downloadHtml = useCallback(() => {
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [fullHtml]);

  const loadSample = useCallback(() => setInput(SAMPLE), []);
  const clear = useCallback(() => setInput(''), []);

  const paste = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    setInput(text);
  }, []);

  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(html).length;

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="markdown-to-html" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>MD</span>
          Markdown to HTML
        </div>
        <div className={s.headerActions}>
          <button className={s.actionBtn} onClick={paste}>Paste</button>
          <button className={s.actionBtn} onClick={loadSample}>Sample</button>
          <button className={s.actionBtn} onClick={clear}>Clear</button>
        </div>
      </div>

      {/* Panes */}
      <div className={s.panes}>
        {/* Left — Markdown input */}
        <div className={s.pane}>
          <div className={s.paneHeader}>
            <span className={s.paneLabel}>Markdown</span>
            <span className={s.paneMeta}>{countWords(input)} words · {formatBytes(inputBytes)}</span>
          </div>
          <textarea
            ref={textareaRef}
            className={s.editor}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste or type your Markdown here…"
            spellCheck={false}
          />
        </div>

        {/* Divider */}
        <div className={s.divider} />

        {/* Right — HTML output */}
        <div className={s.pane}>
          <div className={s.paneHeader}>
            <div className={s.outputTabs}>
              <button
                className={`${s.tab} ${outputMode === 'preview' ? s.tabActive : ''}`}
                onClick={() => setOutputMode('preview')}
              >Preview</button>
              <button
                className={`${s.tab} ${outputMode === 'html' ? s.tabActive : ''}`}
                onClick={() => setOutputMode('html')}
              >HTML</button>
            </div>
            <div className={s.outputActions}>
              {outputMode === 'html' && (
                <span className={s.paneMeta}>{formatBytes(outputBytes)}</span>
              )}
              <button
                className={`${s.actionBtn} ${copied ? s.actionBtnDone : ''}`}
                onClick={copyHtml}
                disabled={!html}
              >{copied ? '✓ Copied' : 'Copy HTML'}</button>
              <button
                className={`${s.actionBtn} ${copiedFull ? s.actionBtnDone : ''}`}
                onClick={copyFullHtml}
                disabled={!html}
              >{copiedFull ? '✓ Copied' : 'Copy Full Page'}</button>
              <button className={s.actionBtn} onClick={downloadHtml} disabled={!html}>
                Download
              </button>
            </div>
          </div>

          {outputMode === 'preview' ? (
            <div
              className={s.preview}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <textarea
              className={`${s.editor} ${s.editorMono}`}
              readOnly
              value={html}
              placeholder="HTML output will appear here…"
            />
          )}
        </div>
      </div>
    </div>
  );
}
