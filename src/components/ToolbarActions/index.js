'use client';

/* Toolbar actions shared by the Email Templates and Social Post Templates editors:
   a "Fork" button and an "Export ▾" menu, styled like the UI Snippets toolbar.
   options: [{ icon: 'html'|'zip'|'file'|'text'|'image', label, sub, onClick, disabled? }] */

import { useEffect, useRef, useState } from 'react';
import us from '../UiSnippetsTool/styles.module.css';

const EXPORT_ICON = {
  html: <svg width="16" height="18" viewBox="0 0 512 512" aria-hidden="true"><path fill="#e44d26" d="M107 457L75 96h362l-32 361-149 41z"/><path fill="#f16529" d="M256 444l120-33 27-307H256z"/><path fill="#ebebeb" d="M256 208h-62l-4-45h66v-44H144l11 127h101zm0 122l-49-13-3-36h-44l6 67 90 25z"/><path fill="#fff" d="M256 208v44h58l-6 58-52 14v46l90-25 7-77 7-60zm0-89v44h114l-4-44z"/></svg>,
  react: <svg width="17" height="17" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="50" rx="10" ry="10" fill="#61dafb"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(120 50 50)"/></svg>,
  vue: <svg width="17" height="15" viewBox="0 0 261.76 226.69" aria-hidden="true"><path d="M161.096 0l-30.225 52.351L100.647 0H0l130.871 226.69L261.742 0z" fill="#41b883"/><path d="M161.096 0l-30.225 52.351L100.647 0H52.346l78.525 136.01L209.397 0z" fill="#34495e"/></svg>,
  zip: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>,
  file: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>,
  video: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="M16 10l6-3v10l-6-3z"/></svg>,
  image: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  text: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>,
};
const EXPORT_TINT = { react: '#61dafb', vue: '#41b883', html: '#e44d26', zip: '#6366f1', file: '#0ea5e9', text: '#059669', image: '#db2777', video: '#7c3aed' };

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

/* "+ Add to page" dropdown: a new page, or one of the saved pages.
   loadPages(): Promise<[{ id, name, updated }]>, onPick(pageId | null): null means a new page. */
/* "+ Add to page": loadPages() resolves to saved websites
   [{ id, name, updated, pages: [{ id, name, file }] }]; onPick(siteId, pageId) with
   (null, null) for a new website and pageId null for a one-page site. Multi-page websites
   list each page under the site's name, so it's clear where the section goes. */
export function AddToPageMenu({ loadPages, onPick, title = 'Add this section to a page in the Website Builder' }) {
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    let live = true;
    Promise.resolve(loadPages()).then(p => { if (live) setPages(p || []); }).catch(() => { if (live) setPages([]); });
    const onDoc = ev => { if (ref.current && !ref.current.contains(ev.target)) setOpen(false); };
    const onKey = ev => { if (ev.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { live = false; document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const pick = (id, pageId = null) => { setOpen(false); onPick(id, pageId); };
  const when = d => (d.updated ? `Edited ${new Date(d.updated).toLocaleDateString()}` : '');
  return (
    <div className={us.popoverAnchor} ref={ref}>
      <button type="button" className={us.iconBtn} onClick={() => setOpen(v => !v)} title={title} aria-haspopup="true" aria-expanded={open}>
        + Add to page
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 1, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className={us.exportMenu} role="menu" style={{ width: 300 }}>
          <div className={us.exportMenuHead}>Add this section to…</div>
          <button type="button" className={us.exportMenuItem} role="menuitem" onClick={() => pick(null)}>
            <span className={us.exportMenuItemText}>
              <span className={us.exportMenuItemLabel}>+ New website</span>
              <span className={us.exportMenuItemSub}>Start an empty one-page website with this section</span>
            </span>
          </button>
          <div className={us.exportMenuHead} style={{ marginTop: 6 }}>Your websites</div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {pages === null && <div className={us.exportMenuItemSub} style={{ padding: '6px 10px' }}>Loading…</div>}
            {pages && !pages.length && <div className={us.exportMenuItemSub} style={{ padding: '6px 10px' }}>No saved websites yet. Save one in the Website Builder and it will show here.</div>}
            {(pages || []).map(d => (d.pages?.length > 1 ? (
              // Multi-page website: its name, then one row per page
              <div key={d.id} role="group" aria-label={`${d.name}, ${d.pages.length} pages`} style={{ padding: '4px 0', borderTop: '1px solid var(--border, rgba(127,127,127,.2))' }}>
                <div className={us.exportMenuItemText} style={{ padding: '6px 10px 2px' }}>
                  <span className={us.exportMenuItemLabel}>{d.name}</span>
                  <span className={us.exportMenuItemSub}>Multi-page website · {d.pages.length} pages · {when(d)}</span>
                </div>
                {d.pages.map((p, i) => (
                  <button key={p.id} type="button" className={us.exportMenuItem} role="menuitem" onClick={() => pick(d.id, p.id)} style={{ paddingLeft: 22 }} aria-label={`Add to the ${p.name} page of ${d.name}`}>
                    <span className={us.exportMenuItemText}>
                      <span className={us.exportMenuItemLabel}>{i === 0 ? '⌂' : '▤'} {p.name}</span>
                      <span className={us.exportMenuItemSub}>{p.file}{i === 0 ? ' · home page' : ''}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <button key={d.id} type="button" className={us.exportMenuItem} role="menuitem" onClick={() => pick(d.id)} style={{ borderTop: '1px solid var(--border, rgba(127,127,127,.2))' }}>
                <span className={us.exportMenuItemText}>
                  <span className={us.exportMenuItemLabel}>{d.name}</span>
                  <span className={us.exportMenuItemSub}>One page · {when(d)}</span>
                </span>
              </button>
            )))}
          </div>
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

/* Undo / Redo (icon-only, with tooltips) and Reset as a compact toolbar group (same 26px buttons as Fork / Export) */
export function HistoryButtons({ onUndo, onRedo, onReset, canUndo, canRedo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} role="group" aria-label="Edit history">
      <button type="button" className={us.iconBtn} onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)" aria-label="Undo" style={{ width: 28, padding: 0, justifyContent: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>
      </button>
      <button type="button" className={us.iconBtn} onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)" aria-label="Redo" style={{ width: 28, padding: 0, justifyContent: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>
      </button>
      <button type="button" className={us.iconBtn} onClick={onReset} title="Back to the original (undo brings your edits back)">Reset</button>
    </div>
  );
}

/* Save (to My designs): same compact style; shows "Saved ✓" for a moment after saving.
   `menu`: optional [{ label, sub, onClick }] shown from a ▾ next to it (Detach, My designs…).
   `saveAs`: optional { defaultName, onSave(name) }: adds "Save as new design", which turns the
   dropdown into a name field with Save / Cancel. */
export function SaveButton({ onClick, busy = false, saved = false, dirty = false, disabled = false, title = 'Save to My designs (Ctrl+S)', menu = [], saveAs = null }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null); // null = menu, string = naming a new design
  const ref = useRef(null);
  useEffect(() => { if (!open) setName(null); }, [open]);
  const items = [...(saveAs ? [{ label: 'Save as new design', sub: 'Keep this version under a new name', keepOpen: true, onClick: () => setName(saveAs.defaultName || '') }] : []), ...menu];
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = ev => { if (ref.current && !ref.current.contains(ev.target)) setOpen(false); };
    const onKey = ev => { if (ev.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const tint = saved ? { color: '#16a34a', borderColor: '#16a34a' } : {};
  return (
    <div className={us.popoverAnchor} ref={ref} style={{ display: 'flex' }}>
      <button type="button" className={us.iconBtn} onClick={onClick} disabled={disabled} title={title} style={{ ...tint, ...(items.length ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : {}) }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>
        {busy ? 'Saving…' : saved ? 'Saved ✓' : 'Save'}
        {dirty && !busy && !saved && <span aria-label="unsaved changes" style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', marginLeft: 1 }} />}
      </button>
      {items.length > 0 && (
        <button type="button" className={us.iconBtn} onClick={() => setOpen(v => !v)} disabled={disabled} aria-haspopup="true" aria-expanded={open} aria-label="More save options" style={{ ...tint, padding: '0 5px', marginLeft: -1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      )}
      {open && name === null && (
        <div className={us.exportMenu} role="menu" style={{ width: 250 }}>
          {items.map(o => (
            <button key={o.label} type="button" className={us.exportMenuItem} role="menuitem" onClick={() => { o.onClick(); if (!o.keepOpen) setOpen(false); }}>
              <span className={us.exportMenuItemText}>
                <span className={us.exportMenuItemLabel}>{o.label}</span>
                {o.sub && <span className={us.exportMenuItemSub}>{o.sub}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
      {open && name !== null && (
        <form
          className={us.exportMenu}
          style={{ width: 260, padding: 10, gap: 8 }}
          onSubmit={ev => { ev.preventDefault(); saveAs.onSave(name); setOpen(false); }}
        >
          <span className={us.exportMenuHead} style={{ margin: 0, padding: '0 2px 6px' }}>Save as new design</span>
          <input
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder="Design name"
            aria-label="Design name"
            maxLength={60}
            autoFocus
            onFocus={ev => ev.target.select()}
            style={{ height: 30, padding: '0 9px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--bg)', color: 'var(--text)', fontSize: 12.5, fontFamily: 'var(--font-ui)' }}
          />
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button type="button" className={us.iconBtn} onClick={() => setName(null)}>Cancel</button>
            <button type="submit" className={us.iconBtn} style={{ background: 'var(--accent, #6366f1)', borderColor: 'var(--accent, #6366f1)', color: '#fff' }}>Save</button>
          </div>
        </form>
      )}
    </div>
  );
}
