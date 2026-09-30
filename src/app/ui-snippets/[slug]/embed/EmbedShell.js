'use client';

import { useState } from 'react';
import styles from './styles.module.css';

// CodePen-style embed: dark top bar with HTML / CSS / JS / Result tabs
// (Result active by default) and an "Edit in Editor" link to the canonical
// snippet page. The Result iframe stays mounted while code tabs are shown so
// switching back doesn't restart animations or lose interactive state.
// Derives a short, human-readable label from a CDN script/style URL so
// readers can tell which library is loaded without expanding the full path
// — e.g. "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" -> "gsap@3.12.5".
function cdnLibLabel(url) {
  try {
    const { pathname, hostname } = new URL(url);
    const npmMatch = pathname.match(/\/npm\/([^/]+)/) || pathname.match(/\/gh\/([^/]+)/);
    if (npmMatch) return npmMatch[1];
    const parts = pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || hostname;
  } catch {
    return url;
  }
}

// A .css URL belongs on the CSS tab, everything else on JS — same split the
// live editor uses. Without it, a stylesheet CDN (e.g. Bootstrap's own CSS)
// only ever showed up under the JS tab, so a reader checking just the CSS
// tab could copy the CSS source and never learn it needs that CDN link too.
function isCssUrl(url) {
  return /\.css(\?.*)?$/.test(url.trim());
}

export default function EmbedShell({ title, html, css, js, htmlHl, cssHl, jsHl, srcDoc, canonicalUrl, cdnUrls = [] }) {
  const [active, setActive] = useState('result');
  const [copied, setCopied] = useState('');

  const tabs = [
    { id: 'html', label: 'HTML', code: html, hl: htmlHl },
    { id: 'css', label: 'CSS', code: css, hl: cssHl },
    ...(js ? [{ id: 'js', label: 'JS', code: js, hl: jsHl }] : []),
    { id: 'result', label: 'Result', code: null, hl: null },
  ];

  const activeTab = tabs.find(t => t.id === active);

  // Third-party sites embed this page inside an <iframe> without a
  // "clipboard-write" Permissions-Policy grant, so navigator.clipboard
  // silently rejects there. Fall back to the legacy execCommand('copy')
  // path (still honored inside sandboxed iframes off a real click), and
  // as a last resort just select the code so the user can hit Ctrl/Cmd+C.
  function legacyCopy(code, id) {
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    if (ok) {
      setCopied(id);
    } else {
      selectCodeBlock(id);
      setCopied('manual');
    }
    setTimeout(() => setCopied(''), 1500);
  }

  function selectCodeBlock(id) {
    const el = document.getElementById(`embed-code-${id}`);
    if (!el || !window.getSelection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  async function copyCode(code, id) {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard API unavailable');
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      legacyCopy(code, id);
    }
  }

  // Same technique the main editor's "Pop out preview" button uses: a Blob
  // URL sidesteps needing a same-origin page to navigate to, so this works
  // even when the embed itself is nested inside a third-party site's iframe
  // (a nested iframe can't just call requestFullscreen on itself reliably
  // across browsers/sandboxes, but window.open always can escape the frame).
  function popOut() {
    const blob = new Blob([srcDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank', 'width=' + screen.width + ',height=' + screen.height);
    if (win) win.addEventListener('load', () => URL.revokeObjectURL(url));
  }

  return (
    <div className={styles.embedWrap}>
      <div className={styles.topBar}>
        <span className={styles.embedTitle} title={title}>{title}</span>
        <div className={styles.tabGroup}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`${styles.tabBtn} ${active === t.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          className={styles.popOutBtn}
          onClick={popOut}
          aria-label="Open full screen in a new tab"
          title="Open full screen in a new tab"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
        <a
          className={styles.editLink}
          href={canonicalUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Edit in Editor"
          title="Edit in Editor"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <span className={styles.editLabel}>Edit in Editor</span>
        </a>
      </div>

      <div className={styles.body}>
        {/* Result stays mounted (hidden, not unmounted) so animations/state survive tab switches */}
        <div className={active === 'result' ? styles.resultPane : styles.resultPaneHidden}>
          <iframe
            className={styles.embedFrame}
            srcDoc={srcDoc}
            sandbox="allow-scripts allow-forms"
            title={`${title} — live preview`}
          />
        </div>

        {active !== 'result' && activeTab && (
          <div className={styles.codePane}>
            {(active === 'css' || active === 'js') && cdnUrls.some(u => isCssUrl(u) === (active === 'css')) && (
              <div className={styles.cdnStrip}>
                <span className={styles.cdnStripLabel}>CDN</span>
                <div className={styles.cdnChips}>
                  {cdnUrls.filter(u => isCssUrl(u) === (active === 'css')).map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={styles.cdnChip}
                      title={url}
                    >
                      {cdnLibLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <button
              className={styles.copyBtn}
              onClick={() => copyCode(activeTab.code, activeTab.id)}
            >
              {copied === activeTab.id ? 'Copied!' : copied === 'manual' ? 'Press Ctrl+C' : 'Copy'}
            </button>
            <div
              id={`embed-code-${activeTab.id}`}
              className={styles.codePre}
              dangerouslySetInnerHTML={{ __html: activeTab.hl }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
