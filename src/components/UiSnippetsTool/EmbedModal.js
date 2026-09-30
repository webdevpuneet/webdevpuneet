'use client';

import { useState } from 'react';

// Falls back to the production domain only for a pre-hydration/SSR pass —
// this modal is only ever mounted after a client click, so in practice
// window.location.origin (localhost, a staging domain, or production) is
// what actually gets used, keeping the generated code and preview correct
// wherever this is being tested or run.
function siteOrigin() {
  return typeof window !== 'undefined' ? window.location.origin : 'https://webdevpuneet.com';
}

function embedCode(origin, slug, title) {
  const src = `${origin}/ui-snippets/${slug}/embed/`;
  return `<iframe src="${src}" style="width:100%;height:480px;border:0;border-radius:10px;overflow:hidden;" loading="lazy" title="${title} — Free HTML/CSS/JS Snippet by webdevpuneet.com"></iframe>`;
}

/**
 * "Embed this snippet" modal — opened from the "Embed" entry in the in-app
 * Export dropdown (UiSnippetsTool/index.js). Only ever called for library
 * snippets (a real slug under /ui-snippets/[slug]/embed/ exists at build
 * time) — never for a user's
 * custom/MyCode snippet.
 */
export default function EmbedModal({ slug, title, onClose }) {
  const [copied, setCopied] = useState(false);
  const origin = siteOrigin();
  const code = embedCode(origin, slug, title);
  const embedUrl = `${origin}/ui-snippets/${slug}/embed/`;

  function copy() {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: 560,
          maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,.35)',
          border: '1px solid var(--border)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '14px 18px', borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-ui)', marginRight: 'auto' }}>
            Embed this snippet
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 26, height: 26, borderRadius: '50%', border: 'none',
              background: 'var(--bg-2,#f1f5f9)', color: 'var(--text-2,#64748b)',
              cursor: 'pointer', fontSize: 12,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 18 }}>
          <p style={{ fontSize: 12.5, color: 'var(--text-2,#64748b)', lineHeight: 1.55, margin: '0 0 12px', fontFamily: 'var(--font-ui)' }}>
            Paste this into any WordPress post, blog, or website — it shows just the live preview,
            with a link back to the full editable source on this site.
          </p>

          <div style={{
            position: 'relative', border: '1px solid var(--border)', borderRadius: 10,
            overflow: 'hidden', marginBottom: 14, height: 220, background: '#fff',
          }}>
            <iframe
              src={embedUrl}
              title={`${title} embed preview`}
              loading="lazy"
              sandbox="allow-scripts allow-forms"
              style={{ width: '100%', height: '100%', border: 0 }}
            />
          </div>

          <textarea
            readOnly
            value={code}
            onClick={e => e.target.select()}
            style={{
              width: '100%', height: 76, resize: 'vertical', fontFamily: 'var(--font-mono, monospace)',
              fontSize: 12, lineHeight: 1.5, padding: 10, borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--bg-2,#f8fafc)', color: 'var(--text)',
              marginBottom: 10,
            }}
          />

          <button
            onClick={copy}
            style={{
              width: '100%', padding: '10px 0', borderRadius: 9, border: 'none',
              background: copied ? '#16a34a' : 'var(--accent)', color: '#fff',
              fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-ui)',
            }}
          >
            {copied ? '✓ Copied' : 'Copy embed code'}
          </button>
        </div>
      </div>
    </div>
  );
}
