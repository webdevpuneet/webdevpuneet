'use client';

/* Toolbar actions shared by the Email Templates and Social Post Templates editors:
   a "Fork" button and an "Export ▾" menu, styled like the UI Snippets toolbar.
   options: [{ icon: 'html'|'zip'|'file'|'text'|'image', label, sub, onClick, disabled? }] */

import { useEffect, useRef, useState } from 'react';
import us from '../UiSnippetsTool/styles.module.css';

const EXPORT_ICON = {
  html: <svg width="16" height="18" viewBox="0 0 512 512" aria-hidden="true"><path fill="#e44d26" d="M107 457L75 96h362l-32 361-149 41z"/><path fill="#f16529" d="M256 444l120-33 27-307H256z"/><path fill="#ebebeb" d="M256 208h-62l-4-45h66v-44H144l11 127h101zm0 122l-49-13-3-36h-44l6 67 90 25z"/><path fill="#fff" d="M256 208v44h58l-6 58-52 14v46l90-25 7-77 7-60zm0-89v44h114l-4-44z"/></svg>,
  zip: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>,
  file: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>,
  image: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  text: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>,
};
const EXPORT_TINT = { html: '#e44d26', zip: '#6366f1', file: '#0ea5e9', text: '#059669', image: '#db2777' };

export function ExportMenu({ options, head = 'Export as…', title = 'Copy or download' }) {
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
  return (
    <div className={us.popoverAnchor} ref={ref}>
      <button type="button" className={us.iconBtn} onClick={() => setOpen(v => !v)} title={title} aria-haspopup="true" aria-expanded={open}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M4 19h16"/></svg>
        Export
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 1, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className={us.exportMenu} role="menu">
          <div className={us.exportMenuHead}>{head}</div>
          {options.map(o => (
            <button key={o.label} type="button" className={us.exportMenuItem} role="menuitem" disabled={o.disabled} onClick={() => { o.onClick(); setOpen(false); }}>
              <span className={us.exportMenuItemIcon} style={{ background: `${EXPORT_TINT[o.icon]}1a` }}>{EXPORT_ICON[o.icon]}</span>
              <span className={us.exportMenuItemText}>
                <span className={us.exportMenuItemLabel}>{o.label}</span>
                <span className={us.exportMenuItemSub}>{o.sub}</span>
              </span>
              <svg className={us.exportMenuItemArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ForkButton({ onClick, busy = false, disabled = false, title = 'Save an editable copy of the code in My Code (opens in a new tab)' }) {
  return (
    <button type="button" className={us.iconBtn} onClick={onClick} disabled={disabled} title={title}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 7.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><line x1="12" y1="11.5" x2="12" y2="16.5"/></svg>
      {busy ? 'Forking…' : 'Fork'}
    </button>
  );
}

/* Undo / Redo / Reset as a compact toolbar group (same 26px buttons as Fork / Export) */
export function HistoryButtons({ onUndo, onRedo, onReset, canUndo, canRedo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} role="group" aria-label="Edit history">
      <button type="button" className={us.iconBtn} onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>
        Undo
      </button>
      <button type="button" className={us.iconBtn} onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>
        Redo
      </button>
      <button type="button" className={us.iconBtn} onClick={onReset} title="Back to the original (undo brings your edits back)">Reset</button>
    </div>
  );
}
