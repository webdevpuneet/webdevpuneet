'use client';

/* "Export" dropdown on a website template page: same four choices as the editor's Export menu.
   Each one opens the editor with the template loaded and runs that export on arrival
   (?starter=<id>[&pages=multi]&export=zip|next|react|vue), so nothing needs to be built here. */

import { useEffect, useRef, useState } from 'react';
import us from '@/components/UiSnippetsTool/styles.module.css';
import { EXPORT_ICON, EXPORT_TINT } from '@/components/ToolbarActions';
import st from '../templates.module.css';

export default function TemplateExport({ starter, multi = false, pageCount = 1 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = ev => { if (ref.current && !ref.current.contains(ev.target)) setOpen(false); };
    const onKey = ev => { if (ev.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const href = kind => `/website-builder/editor/?starter=${starter}${multi ? '&pages=multi' : ''}&export=${kind}`;
  const of = multi ? `All ${pageCount} pages` : 'The page';
  const items = [
    { kind: 'zip', icon: 'html', label: multi ? 'Download website ZIP' : 'Download ZIP', sub: multi ? `${pageCount} HTML pages, styles.css, script.js and an assets folder` : 'index.html plus an assets folder with every image' },
    { kind: 'next', icon: 'next', label: 'Download Next.js site', sub: `${of} as a Next.js project (App Router), with sitemap, llms.txt and favicon` },
    { kind: 'react', icon: 'react', label: 'Download React ZIP', sub: `The .jsx component${multi ? ' of the home page' : ''} plus an assets folder with every image` },
    { kind: 'vue', icon: 'vue', label: 'Download Vue ZIP', sub: `The .vue component${multi ? ' of the home page' : ''} plus an assets folder with every image` },
  ];

  return (
    <div className={us.popoverAnchor} ref={ref} style={{ gridColumn: '1 / -1' }} data-no-support-prompt>
      <button type="button" className={`${st.btn} ${st.btnGhost}`} style={{ width: '100%', justifyContent: 'center' }} onClick={() => setOpen(v => !v)} aria-haspopup="true" aria-expanded={open}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M4 19h16" /></svg>
        Export
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={us.exportMenu} role="menu" style={{ width: 'min(320px, 100%)', maxWidth: '100%' }}>
          <div className={us.exportMenuHead}>{multi ? 'Export this website as…' : 'Export this page as…'}</div>
          {items.map(o => (
            <a key={o.kind} href={href(o.kind)} className={us.exportMenuItem} role="menuitem" style={{ textDecoration: 'none' }}>
              <span className={us.exportMenuItemIcon} style={{ background: `${EXPORT_TINT[o.icon]}1a` }}>{EXPORT_ICON[o.icon]}</span>
              <span className={us.exportMenuItemText}>
                <span className={us.exportMenuItemLabel}>{o.label}</span>
                <span className={us.exportMenuItemSub}>{o.sub}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
