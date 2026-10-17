'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sizeById, richText } from './templates/index.js';
import { mountTemplate, fitText, loadFonts, fillTokens, layoutImages } from './render';

/* Live preview of a template at its real pixel size, scaled to fit `maxW` × `maxH`.
   With `editable`, text can be edited in place (raw text with *asterisks* shows while
   focused; highlights render again on blur) and photo slots can be clicked. */
export default function Preview({ template: t, state, maxW, maxH, editable = false, onEdit, onPickImage, onReveal, onImagePos, children }) {
  const hostRef = useRef(null);
  const shadowRef = useRef(null);
  const stateRef = useRef(state);
  const [fontTick, setFontTick] = useState(0);
  stateRef.current = state;

  const z = sizeById(state.size);
  const k = Math.max(0.05, Math.min(maxW / z.w, maxH ? maxH / z.h : Infinity));
  const kRef = useRef(k);
  kRef.current = k;

  // Re-fit once the design's web fonts arrive
  useEffect(() => {
    let live = true;
    loadFonts(t, state).then(() => { if (live) setFontTick(n => n + 1); });
    return () => { live = false; };
  }, [t, state.fonts.heading, state.fonts.body]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (!shadowRef.current) shadowRef.current = host.attachShadow({ mode: 'open' });
    const root = mountTemplate(shadowRef.current, t, state, { editable });
    fitText(root);
    layoutImages(root, state);
  }, [t, state, editable, fontTick]);

  // In-place editing and photo picking (listeners live on the shadow root)
  useEffect(() => {
    const shadow = shadowRef.current;
    if (!shadow || !editable) return undefined;
    const editEl = e => e.target?.closest?.('[data-edit]');
    const onFocusIn = e => {
      const el = editEl(e);
      if (!el) return;
      onReveal?.(el.dataset.edit); // show the matching field on the left
      const raw = stateRef.current.fields[el.dataset.edit] ?? '';
      // Show the *asterisks* while editing; plain text is left alone so the caret stays where clicked
      if (raw.includes('*')) {
        el.textContent = raw;
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    };
    const onInput = e => {
      const el = editEl(e);
      if (el) onEdit?.(el.dataset.edit, el.innerText.replace(/\n$/, ''));
    };
    const onFocusOut = e => {
      const el = editEl(e);
      if (!el) return;
      el.innerHTML = richText(fillTokens(stateRef.current.fields[el.dataset.edit] ?? '', stateRef.current));
      const root = shadow.querySelector('.spt');
      if (root) { fitText(root); layoutImages(root, stateRef.current); }
    };
    /* Photos: drag to reposition inside the frame, wheel to zoom, plain click to replace */
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    let drag = null;
    const onPointerDown = e => {
      if (e.button !== 0 || e.target?.closest?.('[data-edit]')) return;
      const img = e.target?.closest?.('[data-image]');
      if (!img) return;
      const key = img.dataset.image;
      const movable = img.classList.contains('has-img') && img.dataset.imageFit !== 'contain';
      drag = { img, key, x0: e.clientX, y0: e.clientY, moved: false, movable, start: { x: 50, y: 50, zoom: 1, ...(stateRef.current.imagePos?.[key] || {}) } };
      if (movable) { img.setPointerCapture?.(e.pointerId); e.preventDefault(); }
    };
    const onPointerMove = e => {
      if (!drag?.movable) return;
      const dx = (e.clientX - drag.x0) / kRef.current, dy = (e.clientY - drag.y0) / kRef.current;
      if (!drag.moved && Math.hypot(dx, dy) * kRef.current < 4) return;
      drag.moved = true;
      // background-position %: offset = (frame - image) * pct. Moving the image by d px adds d to the offset.
      const [iw, ih] = getComputedStyle(drag.img).backgroundSize.split(' ').map(parseFloat);
      const ox = drag.img.clientWidth - iw, oy = drag.img.clientHeight - ih;
      const x = Number.isFinite(ox) && ox < -0.5 ? clamp(drag.start.x + (dx / ox) * 100, 0, 100) : drag.start.x;
      const y = Number.isFinite(oy) && oy < -0.5 ? clamp(drag.start.y + (dy / oy) * 100, 0, 100) : drag.start.y;
      onImagePos?.(drag.key, { ...drag.start, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    };
    const onPointerUp = () => {
      if (drag && !drag.moved) { onReveal?.(drag.key); onPickImage?.(drag.key); }
      else if (drag) onReveal?.(drag.key);
      drag = null;
    };
    const onWheel = e => {
      const img = e.target?.closest?.('[data-image]');
      if (!img || !img.classList.contains('has-img') || img.dataset.imageFit === 'contain') return;
      e.preventDefault();
      const key = img.dataset.image;
      const cur = { x: 50, y: 50, zoom: 1, ...(stateRef.current.imagePos?.[key] || {}) };
      const zoom = clamp(cur.zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08), 1, 4);
      onImagePos?.(key, { ...cur, zoom: Math.round(zoom * 100) / 100 });
    };
    const onKey = e => { if (e.key === 'Escape') e.target?.blur?.(); };
    shadow.addEventListener('focusin', onFocusIn);
    shadow.addEventListener('input', onInput);
    shadow.addEventListener('focusout', onFocusOut);
    shadow.addEventListener('pointerdown', onPointerDown);
    shadow.addEventListener('pointermove', onPointerMove);
    shadow.addEventListener('pointerup', onPointerUp);
    shadow.addEventListener('pointercancel', onPointerUp);
    shadow.addEventListener('wheel', onWheel, { passive: false });
    shadow.addEventListener('keydown', onKey);
    return () => {
      shadow.removeEventListener('focusin', onFocusIn);
      shadow.removeEventListener('input', onInput);
      shadow.removeEventListener('focusout', onFocusOut);
      shadow.removeEventListener('pointerdown', onPointerDown);
      shadow.removeEventListener('pointermove', onPointerMove);
      shadow.removeEventListener('pointerup', onPointerUp);
      shadow.removeEventListener('pointercancel', onPointerUp);
      shadow.removeEventListener('wheel', onWheel);
      shadow.removeEventListener('keydown', onKey);
    };
  }, [editable, onEdit, onPickImage, onReveal, onImagePos]);

  return (
    <div style={{ position: 'relative', width: z.w * k, height: z.h * k, overflow: 'hidden', flex: 'none' }}>
      <div ref={hostRef} style={{ width: z.w, height: z.h, transform: `scale(${k})`, transformOrigin: 'top left' }} />
      {children}
    </div>
  );
}
