'use client';

/* "Uploaded images" gallery shared by the template tools: lists every image uploaded in this
   browser (src/lib/image-library.js) and reports the one picked. Loads when opened.
   onPick(item): { sig, key, origin, blob, file, w, h, type }. */

import { useEffect, useState } from 'react';
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
  return (
    <>
      <button type="button" className={s.miniBtn} onClick={() => setOpen(o => !o)} aria-expanded={open}>{open ? 'Close gallery' : label}</button>
      {open && (
        <div style={{ flexBasis: '100%', width: '100%' }}>
          <style>{'.wdpLibDel{opacity:0;transition:opacity .12s}.wdpLibTile:hover .wdpLibDel,.wdpLibDel:focus-visible{opacity:1}@media(hover:none){.wdpLibDel{opacity:1}}'}</style>
          {items === null && <span className={s.hint}>Loading…</span>}
          {items && !items.length && <span className={s.hint}>Nothing uploaded yet. Upload an image and it will show up here to reuse.</span>}
          {items && items.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 6, maxHeight: 190, overflowY: 'auto', padding: 2 }}>
              {items.map(a => (
                <div key={a.sig} className="wdpLibTile" style={{ position: 'relative', aspectRatio: '1' }}>
                  <button
                    type="button"
                    title={`${a.file} · ${a.w}×${a.h}`}
                    onClick={() => { onPick(a); setOpen(false); }}
                    style={{ width: '100%', height: '100%', padding: 0, border: a.sig === currentSig ? '2px solid #6366f1' : '1px solid rgba(100,116,139,.4)', borderRadius: 6, overflow: 'hidden', background: '#e2e8f0', cursor: 'pointer' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.url} alt={a.file} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
      )}
    </>
  );
}
