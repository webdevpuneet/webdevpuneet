'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sizeById, richText } from './templates/index.js';
import { mountTemplate, fitText, loadFonts } from './render';

/* Live preview of a template at its real pixel size, scaled to fit `maxW` × `maxH`.
   With `editable`, text can be edited in place (raw text with *asterisks* shows while
   focused; highlights render again on blur) and photo slots can be clicked. */
export default function Preview({ template: t, state, maxW, maxH, editable = false, onEdit, onPickImage, children }) {
  const hostRef = useRef(null);
  const shadowRef = useRef(null);
  const stateRef = useRef(state);
  const [fontTick, setFontTick] = useState(0);
  stateRef.current = state;

  const z = sizeById(state.size);
  const k = Math.max(0.05, Math.min(maxW / z.w, maxH ? maxH / z.h : Infinity));

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
  }, [t, state, editable, fontTick]);

  // In-place editing and photo picking (listeners live on the shadow root)
  useEffect(() => {
    const shadow = shadowRef.current;
    if (!shadow || !editable) return undefined;
    const editEl = e => e.target?.closest?.('[data-edit]');
    const onFocusIn = e => {
      const el = editEl(e);
      if (!el) return;
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
      el.innerHTML = richText(stateRef.current.fields[el.dataset.edit] ?? '');
      const root = shadow.querySelector('.spt');
      if (root) fitText(root);
    };
    const onClick = e => {
      if (e.target?.closest?.('[data-edit]')) return;
      const img = e.target?.closest?.('[data-image]');
      if (img) onPickImage?.(img.dataset.image);
    };
    const onKey = e => { if (e.key === 'Escape') e.target?.blur?.(); };
    shadow.addEventListener('focusin', onFocusIn);
    shadow.addEventListener('input', onInput);
    shadow.addEventListener('focusout', onFocusOut);
    shadow.addEventListener('click', onClick);
    shadow.addEventListener('keydown', onKey);
    return () => {
      shadow.removeEventListener('focusin', onFocusIn);
      shadow.removeEventListener('input', onInput);
      shadow.removeEventListener('focusout', onFocusOut);
      shadow.removeEventListener('click', onClick);
      shadow.removeEventListener('keydown', onKey);
    };
  }, [editable, onEdit, onPickImage]);

  return (
    <div style={{ position: 'relative', width: z.w * k, height: z.h * k, overflow: 'hidden', flex: 'none' }}>
      <div ref={hostRef} style={{ width: z.w, height: z.h, transform: `scale(${k})`, transformOrigin: 'top left' }} />
      {children}
    </div>
  );
}
