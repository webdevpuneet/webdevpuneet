'use client';

import { useState, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── HTML → Markdown converter ───────────────────────────────────────────────── */

function nodeToMd(node, ctx = { listType: null, listDepth: 0, orderedIndex: [] }) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    // Inside pre/code don't escape
    if (ctx.inCode) return text;
    // Collapse whitespace outside block elements
    return text.replace(/\n/g, ' ');
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const tag  = node.tagName.toLowerCase();
  const children = () => Array.from(node.childNodes).map(n => nodeToMd(n, ctx)).join('');
  const trimChildren = () => children().trim();

  // Headings
  if (/^h[1-6]$/.test(tag)) {
    const level = tag[1];
    return `\n\n${'#'.repeat(level)} ${trimChildren()}\n\n`;
  }

  // Paragraph
  if (tag === 'p') return `\n\n${trimChildren()}\n\n`;

  // Line break
  if (tag === 'br') return '  \n';

  // Horizontal rule
  if (tag === 'hr') return '\n\n---\n\n';

  // Bold
  if (tag === 'strong' || tag === 'b') {
    const inner = trimChildren();
    return inner ? `**${inner}**` : '';
  }

  // Italic
  if (tag === 'em' || tag === 'i') {
    const inner = trimChildren();
    return inner ? `*${inner}*` : '';
  }

  // Strikethrough
  if (tag === 'del' || tag === 's' || tag === 'strike') {
    const inner = trimChildren();
    return inner ? `~~${inner}~~` : '';
  }

  // Inline code
  if (tag === 'code' && node.parentElement?.tagName.toLowerCase() !== 'pre') {
    const inner = node.textContent;
    return inner ? `\`${inner}\`` : '';
  }

  // Code block
  if (tag === 'pre') {
    const codeEl = node.querySelector('code');
    const raw = (codeEl || node).textContent.replace(/\n$/, '');
    const lang = codeEl
      ? (Array.from(codeEl.classList).find(c => c.startsWith('language-'))?.replace('language-', '') ?? '')
      : '';
    return `\n\n\`\`\`${lang}\n${raw}\n\`\`\`\n\n`;
  }

  // Blockquote
  if (tag === 'blockquote') {
    const inner = trimChildren()
      .split('\n')
      .map(l => `> ${l}`)
      .join('\n');
    return `\n\n${inner}\n\n`;
  }

  // Unordered list
  if (tag === 'ul') {
    const newCtx = { ...ctx, listType: 'ul', listDepth: ctx.listDepth + 1, orderedIndex: [...ctx.orderedIndex, 0] };
    return `\n\n${Array.from(node.childNodes).map(n => nodeToMd(n, newCtx)).join('')}\n`;
  }

  // Ordered list
  if (tag === 'ol') {
    const newCtx = { ...ctx, listType: 'ol', listDepth: ctx.listDepth + 1, orderedIndex: [...ctx.orderedIndex, 0] };
    return `\n\n${Array.from(node.childNodes).map(n => nodeToMd(n, newCtx)).join('')}\n`;
  }

  // List item
  if (tag === 'li') {
    const indent = '  '.repeat(Math.max(0, ctx.listDepth - 1));
    let bullet;
    if (ctx.listType === 'ol') {
      const idxArr = [...ctx.orderedIndex];
      idxArr[idxArr.length - 1]++;
      ctx.orderedIndex[ctx.orderedIndex.length - 1]++;
      bullet = `${ctx.orderedIndex[ctx.orderedIndex.length - 1]}.`;
    } else {
      bullet = '-';
    }
    const inner = trimChildren().replace(/\n\n/g, '\n');
    return `${indent}${bullet} ${inner}\n`;
  }

  // Link
  if (tag === 'a') {
    const href  = node.getAttribute('href') || '';
    const title = node.getAttribute('title') || '';
    const inner = trimChildren();
    if (!inner) return href ? `<${href}>` : '';
    const titlePart = title ? ` "${title}"` : '';
    return `[${inner}](${href}${titlePart})`;
  }

  // Image
  if (tag === 'img') {
    const src   = node.getAttribute('src') || '';
    const alt   = node.getAttribute('alt') || '';
    const title = node.getAttribute('title') || '';
    const titlePart = title ? ` "${title}"` : '';
    return `![${alt}](${src}${titlePart})`;
  }

  // Table
  if (tag === 'table') return convertTable(node);

  // thead/tbody/tfoot — handled inside table
  if (tag === 'thead' || tag === 'tbody' || tag === 'tfoot') return children();

  // tr — handled inside table
  if (tag === 'tr') return children();

  // th/td — handled inside table
  if (tag === 'th' || tag === 'td') return trimChildren();

  // div/section/article/main/header/footer/aside/nav — block wrapper
  const blockTags = new Set(['div','section','article','main','header','footer','aside','nav','figure','figcaption','details','summary']);
  if (blockTags.has(tag)) {
    const inner = children();
    const trimmed = inner.trim();
    if (!trimmed) return '';
    return `\n\n${trimmed}\n\n`;
  }

  // Span and other inline — just pass through
  return children();
}

function convertTable(tableEl) {
  const rows = Array.from(tableEl.querySelectorAll('tr'));
  if (!rows.length) return '';

  const data = rows.map(row =>
    Array.from(row.querySelectorAll('th, td')).map(cell => {
      // Use nodeToMd for cell content
      return Array.from(cell.childNodes).map(n => nodeToMd(n)).join('').trim().replace(/\|/g, '\\|');
    })
  );

  if (!data.length) return '';
  const colCount = Math.max(...data.map(r => r.length));

  // Pad rows
  const padded = data.map(row => {
    while (row.length < colCount) row.push('');
    return row;
  });

  const header = padded[0];
  const sep    = header.map(() => '---');
  const body   = padded.slice(1);

  const fmt = row => `| ${row.join(' | ')} |`;

  const lines = [fmt(header), fmt(sep), ...body.map(fmt)];
  return `\n\n${lines.join('\n')}\n\n`;
}

function htmlToMarkdown(html) {
  if (!html.trim()) return '';
  try {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, 'text/html');
    // Use body content
    const root   = doc.body || doc.documentElement;
    let md = Array.from(root.childNodes).map(n => nodeToMd(n)).join('');
    // Clean up excessive blank lines
    md = md.replace(/\n{3,}/g, '\n\n').trim();
    return md;
  } catch {
    return '';
  }
}

/* ── Sample HTML ─────────────────────────────────────────────────────────────── */
const SAMPLE = `<h1>HTML to Markdown Converter</h1>
<p>Paste any <strong>HTML</strong> on the left and get <em>clean Markdown</em> instantly — perfect for pulling content from web pages, CMS exports, or email templates.</p>

<h2>What's Supported</h2>
<ul>
  <li>Headings <code>h1</code> through <code>h6</code></li>
  <li><strong>Bold</strong>, <em>italic</em>, and <del>strikethrough</del> text</li>
  <li>Inline and fenced code blocks</li>
  <li>Links and images</li>
  <li>Ordered and unordered lists</li>
  <li>Blockquotes and tables</li>
</ul>

<h2>Code Example</h2>
<pre><code class="language-javascript">function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>

<h2>Table Example</h2>
<table>
  <thead>
    <tr><th>Feature</th><th>Supported</th></tr>
  </thead>
  <tbody>
    <tr><td>Tables</td><td>Yes</td></tr>
    <tr><td>Code blocks</td><td>Yes</td></tr>
    <tr><td>Links</td><td>Yes</td></tr>
  </tbody>
</table>

<blockquote>
  <p>Great for converting blog posts, documentation, and scraped web content into Markdown.</p>
</blockquote>

<p>Visit <a href="https://webdevpuneet.com">webdevpuneet.com</a> for more free developer tools.</p>`;

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function HtmlToMarkdown() {
  const [input, setInput]   = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => htmlToMarkdown(input), [input]);

  const copy = useCallback(async () => {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const download = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  const paste = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    setInput(text);
  }, []);

  const inputBytes  = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(markdown).length;

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="html-to-markdown" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </span>
          HTML to Markdown
        </div>
        <div className={s.headerActions}>
          <button className={s.actionBtn} onClick={paste}>Paste</button>
          <button className={s.actionBtn} onClick={() => setInput(SAMPLE)}>Sample</button>
          <button className={s.actionBtn} onClick={() => setInput('')}>Clear</button>
        </div>
      </div>

      {/* Panes */}
      <div className={s.panes}>
        {/* Left — HTML input */}
        <div className={s.pane}>
          <div className={s.paneHeader}>
            <span className={s.paneLabel}>HTML Input</span>
            <span className={s.paneMeta}>{formatBytes(inputBytes)}</span>
          </div>
          <textarea
            className={s.editor}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste HTML here…"
            spellCheck={false}
          />
        </div>

        <div className={s.divider} />

        {/* Right — Markdown output */}
        <div className={s.pane}>
          <div className={s.paneHeader}>
            <span className={s.paneLabel}>Markdown Output</span>
            <div className={s.outputActions}>
              <span className={s.paneMeta}>{formatBytes(outputBytes)}</span>
              <button
                className={`${s.actionBtn} ${copied ? s.actionBtnDone : ''}`}
                onClick={copy}
                disabled={!markdown}
              >{copied ? '✓ Copied' : 'Copy'}</button>
              <button className={s.actionBtn} onClick={download} disabled={!markdown}>
                Download .md
              </button>
            </div>
          </div>
          <textarea
            className={`${s.editor} ${s.editorOutput}`}
            readOnly
            value={markdown}
            placeholder="Markdown will appear here…"
          />
        </div>
      </div>
    </div>
  );
}
