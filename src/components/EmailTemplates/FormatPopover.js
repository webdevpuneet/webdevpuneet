'use client';

/* Selection toolbar for the email editor's text fields: select text in any field marked
   data-rich and a small popover offers Bold, Italic, Underline, Link and Clear, which wrap
   the selection in the inline HTML the templates allow (<b> <i> <u> <a href>).
   Ctrl/Cmd+B, I and U work in those fields too. */

import { useCallback, useEffect, useRef, useState } from 'react';
import f from './format.module.css';

const TAGS = { b: ['<b>', '</b>'], i: ['<i>', '</i>'], u: ['<u>', '</u>'] };

export default function FormatPopover({ containerRef, onChange }) {
  const [pos, setPos] = useState(null); // { x, y } (fixed) while a selection is active
  const [linking, setLinking] = useState(null); // URL draft while adding a link
  const target = useRef(null); // the input / textarea with the selection
  const sel = useRef([0, 0]);
  const popRef = useRef(null);

  const close = useCallback(() => { setPos(null); setLinking(null); }, []);

  // Applies a change to the field, then puts the selection back around the same text
  const apply = useCallback((el, value, start, end) => {
    onChange(el.dataset.rich, value);
    requestAnimationFrame(() => { try { el.focus(); el.setSelectionRange(start, end); } catch { /* gone */ } });
  }, [onChange]);

  const wrap = useCallback((kind, href) => {
    const el = target.current;
    if (!el) return;
    const [a, b] = sel.current;
    const v = el.value;
    const picked = v.slice(a, b);
    let open, closeTag;
    if (kind === 'a') { open = `<a href="${href}">`; closeTag = '</a>'; }
    else [open, closeTag] = TAGS[kind];
    // Toggle off when the selection is already wrapped in that tag
    if (v.slice(a - open.length, a) === open && v.slice(b, b + closeTag.length) === closeTag) {
      apply(el, v.slice(0, a - open.length) + picked + v.slice(b + closeTag.length), a - open.length, b - open.length);
    } else if (picked.startsWith(open) && picked.endsWith(closeTag)) {
      const inner = picked.slice(open.length, picked.length - closeTag.length);
      apply(el, v.slice(0, a) + inner + v.slice(b), a, a + inner.length);
    } else {
      apply(el, v.slice(0, a) + open + picked + closeTag + v.slice(b), a + open.length, b + open.length);
    }
    close();
  }, [apply, close]);

  /* Removes the link around (or inside) the selection; its text stays */
  const unlink = useCallback(() => {
    const el = target.current;
    if (!el) return;
    const [a, b] = sel.current;
    const v = el.value;
    const open = v.lastIndexOf('<a ', a);
    const openEnd = open > -1 ? v.indexOf('>', open) : -1;
    const closeBefore = open > -1 ? v.indexOf('</a>', open) : -1;
    // Selection sits inside one link: drop that link's tags
    if (open > -1 && openEnd > -1 && openEnd < a + 1 && closeBefore >= b) {
      const tagLen = openEnd + 1 - open;
      const nv = v.slice(0, open) + v.slice(openEnd + 1, closeBefore) + v.slice(closeBefore + 4);
      apply(el, nv, a - tagLen, b - tagLen);
    } else {
      // Links fully inside the selection
      const inner = v.slice(a, b).replace(/<a\s[^>]*>/gi, '').replace(/<\/a>/gi, '');
      apply(el, v.slice(0, a) + inner + v.slice(b), a, a + inner.length);
    }
    close();
  }, [apply, close]);

  const clear = useCallback(() => {
    const el = target.current;
    if (!el) return;
    const [a, b] = sel.current;
    const v = el.value;
    const inner = v.slice(a, b).replace(/<\/?(b|strong|i|em|u|a)\b[^>]*>/gi, '');
    apply(el, v.slice(0, a) + inner + v.slice(b), a, a + inner.length);
    close();
  }, [apply, close]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const isRich = el => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.dataset.rich;
    const check = ev => {
      const el = ev.target;
      if (!isRich(el)) return;
      const { selectionStart: a, selectionEnd: b } = el;
      if (a === b) { close(); return; }
      target.current = el;
      sel.current = [a, b];
      const r = el.getBoundingClientRect();
      // Above the mouse when the selection was made with it, else above the field
      const x = ev.type === 'mouseup' ? ev.clientX : r.left + Math.min(r.width / 2, 120);
      const y = ev.type === 'mouseup' ? ev.clientY : r.top;
      setPos({ x: Math.max(8, Math.min(x - 90, window.innerWidth - 200)), y: Math.max(8, y - 44) });
    };
    const onKey = ev => {
      const el = ev.target;
      if (!isRich(el)) return;
      if (ev.key === 'Escape') { close(); return; }
      if ((ev.ctrlKey || ev.metaKey) && !ev.shiftKey && !ev.altKey && ['b', 'i', 'u'].includes(ev.key.toLowerCase())) {
        if (el.selectionStart === el.selectionEnd) return;
        ev.preventDefault();
        target.current = el;
        sel.current = [el.selectionStart, el.selectionEnd];
        wrap(ev.key.toLowerCase());
      }
    };
    const onScroll = () => close();
    root.addEventListener('mouseup', check);
    root.addEventListener('keyup', check);
    root.addEventListener('keydown', onKey);
    root.addEventListener('scroll', onScroll, true);
    return () => {
      root.removeEventListener('mouseup', check);
      root.removeEventListener('keyup', check);
      root.removeEventListener('keydown', onKey);
      root.removeEventListener('scroll', onScroll, true);
    };
  }, [containerRef, close, wrap]);

  // Clicking anywhere else closes it
  useEffect(() => {
    if (!pos) return undefined;
    const down = ev => { if (!popRef.current?.contains(ev.target) && ev.target !== target.current) close(); };
    document.addEventListener('mousedown', down);
    return () => document.removeEventListener('mousedown', down);
  }, [pos, close]);

  if (!pos) return null;
  // Which formats already wrap the selection (shown as selected buttons)
  const el = target.current;
  const [a, b] = sel.current;
  const v = el?.value || '';
  const picked = v.slice(a, b);
  const wrapped = (open, closeTag) => (v.slice(a - open.length, a) === open && v.slice(b, b + closeTag.length) === closeTag) || (picked.startsWith(open) && picked.endsWith(closeTag));
  const on = { b: wrapped('<b>', '</b>'), i: wrapped('<i>', '</i>'), u: wrapped('<u>', '</u>'), a: (() => { const o = v.lastIndexOf('<a ', a); return (o > -1 && v.indexOf('>', o) < a && v.indexOf('</a>', o) >= b) || /<a\s/i.test(picked); })() };
  return (
    <div ref={popRef} className={f.pop} style={{ left: pos.x, top: pos.y }} role="toolbar" aria-label="Format text" onMouseDown={ev => { if (ev.target.tagName !== 'INPUT') ev.preventDefault(); }}>
      {linking === null ? (
        <>
          <button type="button" className={on.b ? f.on : ''} aria-pressed={on.b} onClick={() => wrap('b')} title="Bold (Ctrl+B)" aria-label="Bold"><b>B</b></button>
          <button type="button" className={on.i ? f.on : ''} aria-pressed={on.i} onClick={() => wrap('i')} title="Italic (Ctrl+I)" aria-label="Italic"><i style={{ fontFamily: 'Georgia, serif' }}>I</i></button>
          <button type="button" className={on.u ? f.on : ''} aria-pressed={on.u} onClick={() => wrap('u')} title="Underline (Ctrl+U)" aria-label="Underline"><u>U</u></button>
          {on.a
            ? (
              <button type="button" className={f.on} aria-pressed onClick={unlink} title="Remove link (keeps the text)" aria-label="Remove link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/><path d="M3 3l18 18"/></svg>
              </button>
            )
            : (
              <button type="button" onClick={() => setLinking('https://')} title="Add a link" aria-label="Link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>
              </button>
            )}
          <i className={f.sep} />
          <button type="button" onClick={clear} title="Remove formatting" aria-label="Remove formatting">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/><path d="M3 3l18 18"/></svg>
          </button>
        </>
      ) : (
        <form className={f.link} onSubmit={ev => { ev.preventDefault(); if (linking.trim()) wrap('a', linking.trim().replace(/"/g, '%22')); }}>
          <input value={linking} onChange={ev => setLinking(ev.target.value)} placeholder="https://…" aria-label="Link URL" autoFocus onFocus={ev => ev.target.select()} />
          <button type="submit" aria-label="Add link">✓</button>
          <button type="button" onClick={() => setLinking(null)} aria-label="Cancel">✕</button>
        </form>
      )}
    </div>
  );
}
