'use client';

// Tabbed HTML/CSS/JS source viewer for the static (server-rendered) code
// section on the canonical snippet page. Unlike the in-page editor's own
// Related/Code tab switch — which renders only one side of a ternary, so the
// other is never in the HTML at all — every panel here is always mounted;
// only the `hidden` attribute toggles, so a crawler reading the raw response
// still sees all three languages' full source regardless of which tab is
// "active" for a human visitor.

import { useState } from 'react';
import s from './SourceCodeTabs.module.css';

const LANGS = [
  { id: 'html', label: 'HTML' },
  { id: 'css',  label: 'CSS' },
  { id: 'js',   label: 'JavaScript' },
];

// A .css URL belongs in a <link>, everything else in a <script src> — same
// split used everywhere else in the codebase (the live editor, demo.js) that
// turns a snippet's cdnUrls into real tags.
function isCssUrl(url) {
  return /\.css(\?.*)?$/.test(url.trim());
}

function tagFor(url) {
  return isCssUrl(url)
    ? `<link rel="stylesheet" href="${url}">`
    : `<script src="${url}"><\/script>`;
}

export default function SourceCodeTabs({ html, css, js, htmlHl, cssHl, jsHl, cdnUrls = [] }) {
  const [active, setActive] = useState('html');
  const [copied, setCopied] = useState(false);
  const [cdnCopied, setCdnCopied] = useState(false);

  const CODE = { html, css, js };
  const HL   = { html: htmlHl, css: cssHl, js: jsHl };
  const tabs = LANGS.filter(t => t.id !== 'js' || js);
  const urls = cdnUrls.filter(u => u && u.trim());

  function handleCopy() {
    navigator.clipboard.writeText(CODE[active] || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  }

  function handleCdnCopy() {
    navigator.clipboard.writeText(urls.map(tagFor).join('\n')).then(() => {
      setCdnCopied(true);
      setTimeout(() => setCdnCopied(false), 1400);
    }).catch(() => {});
  }

  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <div className={s.tabs} role="tablist">
          {tabs.map(t => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              className={`${s.tabBtn} ${active === t.id ? s.tabBtnActive : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" className={s.copyBtn} onClick={handleCopy}>
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy {tabs.find(t => t.id === active)?.label}
            </>
          )}
        </button>
      </div>

      {/* This snippet's HTML/CSS/JS tabs never include the <link>/<script> CDN
          tags themselves — they're a separate field. Without this, copying
          the source here silently drops what the snippet actually needs to
          run. Shown for every snippet that loads one, not just Bootstrap's. */}
      {urls.length > 0 && (
        <div className={s.cdnBar}>
          <span className={s.cdnLabel}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
            Requires
          </span>
          <div className={s.cdnChips}>
            {urls.map(u => (
              <a key={u} className={s.cdnChip} href={u} target="_blank" rel="noopener noreferrer" title={u}>
                {isCssUrl(u) ? 'CSS' : 'JS'} · {u.replace(/^https?:\/\//, '').split('/').filter(Boolean).pop()}
              </a>
            ))}
          </div>
          <button type="button" className={s.cdnCopyBtn} onClick={handleCdnCopy}>
            {cdnCopied ? 'Copied!' : 'Copy tags'}
          </button>
        </div>
      )}

      <div className={s.body}>
        {tabs.map(t => (
          <div
            key={t.id}
            hidden={active !== t.id}
            className={s.panel}
            dangerouslySetInnerHTML={{ __html: HL[t.id] }}
          />
        ))}
      </div>
    </div>
  );
}
