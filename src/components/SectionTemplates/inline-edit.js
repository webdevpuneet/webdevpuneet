'use client';

/* Click-to-edit in section previews (the section editor and the Website Builder), like the
   Email and Social Post editors: text bound with data-edit is edited right in the preview,
   and clicking any other bound element (image, background, icon, bullet list, link list,
   button link) points to its input in the panel, which scrolls into view and flashes.

   The preview is rendered with clean:false, so bindings stay on the elements: section fields
   as data-<kind>="key", list item fields as data-i-<kind>="key" inside an element marked
   data-item="<listKey>.<itemId>" (see fillHtml). */

import { useCallback, useEffect, useRef, useState } from 'react';

const KINDS = ['edit', 'image', 'bg', 'icon', 'lines', 'links', 'href'];
const SEL = KINDS.flatMap(k => [`[data-${k}]`, `[data-i-${k}]`]).join(',');
const HOVER = KINDS.filter(k => k !== 'href').flatMap(k => [`[data-${k}]:hover`, `[data-i-${k}]:hover`]).join(',');

export const INLINE_EDIT_CSS = `${KINDS.flatMap(k => [`[data-${k}]`, `[data-i-${k}]`]).join(',')}{cursor:pointer}
:is(${HOVER}):not([data-st-editing]){outline:2px dashed rgba(99,102,241,.75);outline-offset:3px}
[data-st-editing]{outline:2px solid #6366f1 !important;outline-offset:3px;cursor:text}`;

/** What a bound element edits: { kind, key, list, item, uid } (list/item null for section fields) */
export function targetOf(el) {
  const uid = el.closest('section[data-uid]')?.getAttribute('data-uid') || null;
  for (const kind of KINDS) {
    const key = el.getAttribute(`data-${kind}`);
    if (key != null) return { kind, key, list: null, item: null, uid };
    const ikey = el.getAttribute(`data-i-${kind}`);
    if (ikey != null) {
      const ref = el.closest('[data-item]')?.getAttribute('data-item') || '';
      const at = ref.indexOf('.');
      return { kind, key: ikey, list: at > 0 ? ref.slice(0, at) : null, item: at > 0 ? ref.slice(at + 1) : null, uid };
    }
  }
  return null;
}

/** The field definition a target edits (item fields fall back to the section's own fields,
    as they do when rendering). Returns { fd, target } with the target normalised. */
export function fieldOfTarget(t, target) {
  if (!t || !target) return null;
  if (target.list) {
    const l = (t.lists || []).find(x => x.key === target.list);
    const fd = l?.fields.find(x => x.key === target.key);
    if (fd) return { fd, target };
  }
  const fd = t.fields.find(x => x.key === target.key);
  return fd ? { fd, target: { ...target, list: null, item: null } } : null;
}

/* Edited preview text -> field value, in the syntax richText() renders: *brand words*,
   <b> <i> <u>, and new lines (line breaks in multi-line fields, spaces otherwise) */
const RICH = { b: 'b', strong: 'b', i: 'i', em: 'i', u: 'u' };
function domToValue(node, multi) {
  let out = '';
  node.childNodes.forEach(n => {
    if (n.nodeType === 3) { out += n.nodeValue.replace(/ /g, ' '); return; }
    if (n.nodeType !== 1 || n.hasAttribute('data-st-bar')) return;
    const tag = n.tagName.toLowerCase();
    if (tag === 'br') { out += multi ? '\n' : ' '; return; }
    const inner = domToValue(n, multi);
    if (n.classList.contains('hl')) out += inner ? `*${inner}*` : '';
    else if (RICH[tag]) out += inner ? `<${RICH[tag]}>${inner}</${RICH[tag]}>` : '';
    else if (tag === 'div' || tag === 'p') out += (out && !out.endsWith('\n') ? (multi ? '\n' : ' ') : '') + inner;
    else out += inner;
  });
  return out;
}

/* Popover over selected text while editing in the preview (as in the Email and Social Post
   editors): bold, italic, underline, brand colour (the *word* highlight) and clear formatting.
   Lives in the preview document; returns { remove }. */
const BAR_ICON = {
  hl: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A4.6 4.6 0 0 0 22 9.8C22 6 17.5 3 12 3z"/><circle cx="7.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor"/><circle cx="16.5" cy="10.5" r="1.2" fill="currentColor"/></svg>',
  clear: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/><path d="M3 3l18 18"/></svg>',
};
function selectionBar(doc, el, onChange) {
  const btn = 'display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:28px;padding:0 6px;border:0;border-radius:6px;background:none;color:#4b5563;cursor:pointer;font:14px/1 -apple-system,Segoe UI,Arial,sans-serif;';
  const css = doc.createElement('style');
  css.textContent = '[data-st-bar] svg{pointer-events:none;display:block}[data-st-bar] button:hover{background:#f3f4f6 !important;color:#111827 !important}[data-st-bar] button[aria-pressed="true"]{background:#eef2ff !important;color:#4f46e5 !important}';
  doc.head.appendChild(css);
  const bar = doc.createElement('div');
  bar.setAttribute('data-st-bar', '');
  bar.style.cssText = 'position:absolute;z-index:2147483647;display:none;align-items:center;gap:2px;padding:3px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.14);';
  bar.innerHTML = `<button type="button" data-cmd="bold" title="Bold (Ctrl+B)" style="${btn}"><b>B</b></button><button type="button" data-cmd="italic" title="Italic (Ctrl+I)" style="${btn}"><i style="font-family:Georgia,serif">I</i></button><button type="button" data-cmd="underline" title="Underline (Ctrl+U)" style="${btn}"><u>U</u></button><button type="button" data-cmd="hl" title="Brand colour" style="${btn}">${BAR_ICON.hl}</button><span style="width:1px;height:18px;margin:0 3px;background:#e5e7eb"></span><button type="button" data-cmd="clear" title="Remove formatting" style="${btn}">${BAR_ICON.clear}</button>`;
  doc.body.appendChild(bar);
  // Headings and buttons are already bold: Bold would only un-bold them on screen (and that
  // isn't something the field can store), so it's hidden there
  if (parseInt(doc.defaultView.getComputedStyle(el).fontWeight, 10) >= 600) bar.querySelector('[data-cmd="bold"]').style.display = 'none';

  const hlOf = node => { const e = node?.nodeType === 1 ? node : node?.parentElement; const h = e?.closest('.hl'); return h && el.contains(h) ? h : null; };
  const unwrap = n => { n.replaceWith(...n.childNodes); };
  const place = () => {
    const sel = doc.getSelection();
    if (!sel.rangeCount || sel.isCollapsed || !el.contains(sel.anchorNode)) { bar.style.display = 'none'; return; }
    bar.querySelectorAll('[data-cmd]').forEach(b => {
      const cmd = b.dataset.cmd;
      let on = false;
      if (cmd === 'hl') on = !!hlOf(sel.anchorNode);
      else if (cmd !== 'clear') { try { on = doc.queryCommandState(cmd); } catch { on = false; } }
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const r = sel.getRangeAt(0).getBoundingClientRect();
    const win = doc.defaultView;
    bar.style.display = 'flex';
    const w = bar.offsetWidth;
    bar.style.left = `${Math.min(Math.max(4, r.left + win.scrollX), win.scrollX + doc.documentElement.clientWidth - w - 4)}px`;
    bar.style.top = `${r.top + win.scrollY - 42 < win.scrollY + 4 ? r.bottom + win.scrollY + 8 : r.top + win.scrollY - 42}px`;
  };
  bar.addEventListener('mousedown', m => m.preventDefault()); // keep the text selected
  bar.addEventListener('click', c => {
    const cmd = c.target.closest('[data-cmd]')?.dataset.cmd;
    if (!cmd) return;
    const sel = doc.getSelection();
    if (!sel.rangeCount) return;
    if (cmd === 'hl') {
      const h = hlOf(sel.anchorNode);
      if (h) unwrap(h);
      else {
        const range = sel.getRangeAt(0);
        const span = doc.createElement('span');
        span.className = 'hl';
        span.appendChild(range.extractContents());
        span.querySelectorAll('.hl').forEach(unwrap); // no highlight inside a highlight
        range.insertNode(span);
        sel.removeAllRanges();
        const r = doc.createRange(); r.selectNodeContents(span); sel.addRange(r);
      }
    } else if (cmd === 'clear') {
      doc.execCommand('removeFormat');
      const range = sel.getRangeAt(0);
      el.querySelectorAll('.hl').forEach(h => { if (range.intersectsNode(h)) unwrap(h); });
    } else doc.execCommand(cmd);
    el.normalize();
    onChange();
    place();
  });
  doc.addEventListener('selectionchange', place);
  return { remove: () => { doc.removeEventListener('selectionchange', place); bar.remove(); css.remove(); } };
}

/**
 * Wires click-to-edit into a preview document (call on every iframe load).
 * @param resolve  target => { fd, target } | null     (fieldOfTarget with the right template)
 * @param onInput  (target, value) => void             text typed in the preview
 * @param onReveal (target, focus) => void             show that field's input in the panel
 * @param onStart / onEnd                              an inline text edit begins / ends
 */
export function bindInlineEdit(doc, { resolve, onInput, onReveal, onStart, onEnd }) {
  if (!doc?.head || doc.__stInline) return;
  doc.__stInline = true;
  const style = doc.createElement('style');
  style.textContent = INLINE_EDIT_CSS;
  doc.head.appendChild(style);

  doc.addEventListener('click', ev => {
    const el = ev.target.closest?.(SEL);
    if (!el || el.isContentEditable) return;
    const hit = resolve(targetOf(el));
    if (!hit) return;
    const { fd, target } = hit;
    if (target.kind !== 'edit' || (fd.type !== 'text' && fd.type !== 'textarea')) { onReveal(target, true); return; }

    ev.preventDefault();
    onStart?.();
    el.contentEditable = 'true';
    el.setAttribute('data-st-editing', '');
    try { doc.execCommand('styleWithCSS', false, false); } catch { /* old engines */ }
    el.focus();
    const range = doc.caretRangeFromPoint?.(ev.clientX, ev.clientY);
    if (range) { const sel = doc.getSelection(); sel.removeAllRanges(); sel.addRange(range); }

    const multi = fd.type === 'textarea';
    const onIn = () => onInput(target, domToValue(el, multi).replace(/\n+$/, ''));
    const onPaste = p => { p.preventDefault(); doc.execCommand('insertText', false, p.clipboardData.getData('text/plain')); };
    const onKey = k => {
      if (k.key === 'Escape' || (k.key === 'Enter' && !multi)) { k.preventDefault(); el.blur(); }
      else if (k.key === 'Enter' && multi) { k.preventDefault(); doc.execCommand('insertLineBreak'); }
    };
    const bar = selectionBar(doc, el, onIn);
    const onBlur = () => {
      bar.remove();
      el.removeEventListener('input', onIn);
      el.removeEventListener('keydown', onKey);
      el.removeEventListener('paste', onPaste);
      el.removeEventListener('blur', onBlur);
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-st-editing');
      onEnd?.();
    };
    el.addEventListener('input', onIn);
    el.addEventListener('keydown', onKey);
    el.addEventListener('paste', onPaste);
    el.addEventListener('blur', onBlur);
    onReveal(target, false);
  }, true);
}

/**
 * Keeps the preview iframe from reloading while text is edited in it (every keystroke updates
 * the state, and a reload would end the edit). Returns [htmlToShow, onStart, onEnd].
 * Unfreezing waits a moment, so clicking from one text straight into another keeps editing.
 */
export function useFrozenPreview(html) {
  const [frozen, setFrozen] = useState(null);
  const live = useRef(html);
  live.current = html;
  const timer = useRef(0);
  const onStart = useCallback(() => { clearTimeout(timer.current); setFrozen(cur => cur ?? live.current); }, []);
  const onEnd = useCallback(() => { clearTimeout(timer.current); timer.current = setTimeout(() => setFrozen(null), 350); }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [frozen ?? html, onStart, onEnd];
}
