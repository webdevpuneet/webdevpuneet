'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sizeById, richText } from './templates/index.js';
import { mountTemplate, fitText, loadFonts, fillTokens, layoutImages } from './render';
import fmt from '../EmailTemplates/format.module.css';

const FMT_TAGS = { b: ['<b>', '</b>'], i: ['<i>', '</i>'], u: ['<u>', '</u>'], hl: ['*', '*'] };
/* Text offsets of a range inside an element (textContent positions) */
function rangeOffsets(el, r) {
  const pre = document.createRange();
  pre.selectNodeContents(el);
  pre.setEnd(r.startContainer, r.startOffset);
  const a = pre.toString().length;
  return [a, a + r.toString().length];
}
/* Selects textContent positions a..b inside an element */
function selectOffsets(el, a, b, sel) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let pos = 0, start = null, end = null, n;
  while ((n = walker.nextNode())) {
    const len = n.nodeValue.length;
    if (!start && a <= pos + len) start = [n, a - pos];
    if (!end && b <= pos + len) { end = [n, b - pos]; break; }
    pos += len;
  }
  if (!start || !end) return;
  const r = document.createRange();
  r.setStart(...start);
  r.setEnd(...end);
  sel.removeAllRanges();
  sel.addRange(r);
}

/* Live preview of a template at its real pixel size, scaled to fit `maxW` × `maxH`.
   With `editable`, text can be edited in place (raw text with *asterisks* shows while
   focused; highlights render again on blur) and photo slots can be clicked. */
export default function Preview({ template: t, state, maxW, maxH, editable = false, onEdit, onPickImage, onReveal, onImagePos, onLayout, children }) {
  // onLayout(root): called after every render and text fit (the quality checks measure it)
  const onLayoutRef = useRef(onLayout);
  onLayoutRef.current = onLayout;
  const hostRef = useRef(null);
  const shadowRef = useRef(null);
  const stateRef = useRef(state);
  const [fontTick, setFontTick] = useState(0);
  const [bar, setBar] = useState(null); // B / I / U bar over a text selection while editing in place

  // Selection bar: shown over selected text inside the element being edited
  useEffect(() => {
    if (!editable) return undefined;
    const update = () => {
      const shadow = shadowRef.current;
      if (!shadow) return;
      const sel = shadow.getSelection?.() || document.getSelection();
      const el = shadow.activeElement?.closest?.('[data-edit]');
      if (!sel || !sel.rangeCount || sel.isCollapsed || !el) { setBar(null); return; }
      const r = sel.getRangeAt(0);
      if (!el.contains(r.startContainer) || !el.contains(r.endContainer)) { setBar(null); return; }
      const [a, b] = rangeOffsets(el, r);
      const raw = el.textContent;
      const picked = raw.slice(a, b);
      const on = Object.fromEntries(Object.entries(FMT_TAGS).map(([k, [o, c]]) => [k, (raw.slice(a - o.length, a) === o && raw.slice(b, b + c.length) === c) || (picked.startsWith(o) && picked.endsWith(c))]));
      const rect = r.getBoundingClientRect();
      setBar({ x: Math.max(8, Math.min(rect.left + rect.width / 2 - 50, window.innerWidth - 120)), y: Math.max(8, rect.top - 44), a, b, on });
    };
    document.addEventListener('selectionchange', update);
    return () => document.removeEventListener('selectionchange', update);
  }, [editable]);

  // Wraps (or unwraps) the selection in <b>, <i> or <u>; the input event saves the field
  const applyFmt = kind => {
    const shadow = shadowRef.current;
    const el = shadow?.activeElement?.closest?.('[data-edit]');
    const sel = shadow?.getSelection?.() || document.getSelection();
    if (!el || !sel || !bar) return;
    const [o, c] = FMT_TAGS[kind];
    const raw = el.textContent;
    let { a, b } = bar;
    const picked = raw.slice(a, b);
    let text, selStart, selLen;
    if (raw.slice(a - o.length, a) === o && raw.slice(b, b + c.length) === c) {
      selectOffsets(el, a - o.length, b + c.length, sel);
      text = picked; selStart = a - o.length; selLen = picked.length;
    } else if (picked.startsWith(o) && picked.endsWith(c)) {
      text = picked.slice(o.length, picked.length - c.length); selStart = a; selLen = text.length;
    } else {
      text = o + picked + c; selStart = a + o.length; selLen = picked.length;
    }
    document.execCommand('insertText', false, text);
    selectOffsets(el, selStart, selStart + selLen, sel);
  };
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
    onLayoutRef.current?.(root);
  }, [t, state, editable, fontTick, maxW, maxH]);

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
      // Show the *asterisks* and <b>/<i>/<u> tags while editing; plain text is left alone so the caret stays where clicked
      if (raw.includes('*') || raw.includes('<')) {
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
    const onKey = e => {
      if (e.key === 'Escape') { e.target?.blur?.(); return; }
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && ['b', 'i', 'u'].includes(e.key.toLowerCase()) && editEl(e)) {
        e.preventDefault(); // plain-text editing: the B / I / U bar wraps the selection in tags instead
        document.querySelector('[data-spt-fmt-' + e.key.toLowerCase() + ']')?.click();
      }
    };
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
      {bar && (
        <div className={fmt.pop} style={{ left: bar.x, top: bar.y }} role="toolbar" aria-label="Format text" onMouseDown={e => e.preventDefault()}>
          <button type="button" className={bar.on.b ? fmt.on : ''} aria-pressed={bar.on.b} onClick={() => applyFmt('b')} title="Bold (Ctrl+B)" aria-label="Bold" data-spt-fmt-b=""><b>B</b></button>
          <button type="button" className={bar.on.i ? fmt.on : ''} aria-pressed={bar.on.i} onClick={() => applyFmt('i')} title="Italic (Ctrl+I)" aria-label="Italic" data-spt-fmt-i=""><i style={{ fontFamily: 'Georgia, serif' }}>I</i></button>
          <button type="button" className={bar.on.u ? fmt.on : ''} aria-pressed={bar.on.u} onClick={() => applyFmt('u')} title="Underline (Ctrl+U)" aria-label="Underline" data-spt-fmt-u=""><u>U</u></button>
          <button type="button" className={bar.on.hl ? fmt.on : ''} aria-pressed={bar.on.hl} onClick={() => applyFmt('hl')} title="Accent colour highlight (*text*)" aria-label="Accent highlight">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 11l-6 6v3h9l3-3"/><path d="M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
