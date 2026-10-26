'use client';

/* "Uploaded images" gallery shared by the template tools: lists every image uploaded in this
   browser (src/lib/image-library.js) and reports the one picked. Loads when opened.
   onPick(item): { sig, key, origin, blob, file, w, h, type }. */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import s from '../SocialPostTemplates/styles.module.css';
import { listImages, deleteImage } from '@/lib/image-library';

export default function ImageLibraryPicker({ onPick, currentSig = '', label = 'Uploaded images' }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(null);
  useEffect(() => {
    if (!open) return undefined;
    let live = true;
    const made = [];
    listImages().then(list => {
      if (!live) return;
      setItems(list.map(a => { const url = URL.createObjectURL(a.blob); made.push(url); return { ...a, url }; }));
    }).catch(() => { if (live) setItems([]); });
    return () => { live = false; made.forEach(u => URL.revokeObjectURL(u)); setItems(null); };
  }, [open]);
  // The gallery is a modal: Escape or a click outside closes it, and the page behind stays put
  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open]);
  return (
    <>
      <button type="button" className={s.miniBtn} onClick={() => setOpen(true)} aria-haspopup="dialog">{label}</button>
      {open && createPortal(
        <div
          onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'grid', placeItems: 'center', padding: 'clamp(8px, 3vw, 32px)', background: 'rgba(15,23,42,.62)', backdropFilter: 'blur(3px)' }}
        >
        <div role="dialog" aria-modal="true" aria-label={label} style={{ display: 'flex', flexDirection: 'column', width: 'min(960px, 100%)', maxHeight: '100%', borderRadius: 16, background: 'var(--bg, #fff)', color: 'var(--text, #0f172a)', boxShadow: '0 30px 80px rgba(0,0,0,.45)', overflow: 'hidden' }}>
          <style>{'.wdpLibDel{opacity:0;transition:opacity .12s}.wdpLibTile:hover .wdpLibDel,.wdpLibDel:focus-visible{opacity:1}@media(hover:none){.wdpLibDel{opacity:1}}'}</style>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderBottom: '1px solid rgba(127,127,127,.25)' }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>{label}{items?.length ? <span style={{ opacity: 0.6, fontWeight: 500 }}> {items.length}</span> : null}</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close gallery" style={{ width: 32, height: 32, border: 0, borderRadius: 8, background: 'transparent', color: 'inherit', fontSize: 24, lineHeight: 1, cursor: 'pointer' }}>&times;</button>
          </header>
          <div style={{ padding: 18, overflowY: 'auto' }}>
          {items === null && <span className={s.hint}>Loading…</span>}
          {items && !items.length && <span className={s.hint}>Nothing uploaded yet. Upload an image and it will show up here to reuse.</span>}
          {items && items.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 2 }}>
              {items.map(a => (
                <div key={a.sig} className="wdpLibTile" style={{ position: 'relative', height: 140, maxWidth: '100%' }}>
                  <button
                    type="button"
                    title={`${a.file} · ${a.w}×${a.h}`}
                    onClick={() => { onPick(a); setOpen(false); }}
                    style={{ display: 'block', height: '100%', maxWidth: '100%', padding: 0, border: a.sig === currentSig ? '2px solid #6366f1' : '1px solid rgba(100,116,139,.4)', borderRadius: 6, overflow: 'hidden', background: '#e2e8f0', cursor: 'pointer' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.url} alt={a.file} style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
                  </button>
                  <button
                    type="button"
                    className="wdpLibDel"
                    title="Remove from gallery"
                    aria-label={`Remove ${a.file} from gallery`}
                    onClick={() => { deleteImage(a); setItems(list => list.filter(x => x.sig !== a.sig)); URL.revokeObjectURL(a.url); }}
                    style={{ position: 'absolute', top: 3, right: 3, width: 20, height: 20, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0, borderRadius: 999, background: 'rgba(15,23,42,.8)', color: '#fff', fontSize: 14, lineHeight: 1, cursor: 'pointer' }}
                  >&times;</button>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
        </div>,
        document.body
      )}
    </>
  );
}
