/* Live text patch for the section / Website Builder previews.

   Every edit used to build a whole new page and swap it in, so the new page ran all its entrance animations
   again. When an edit only changes TEXT (a field typed in the panel), the changed text is written straight into
   the page that is already showing: no reload, the scroll position is untouched and nothing re-animates.

   How it decides: both versions of the page are parsed, and the text-bound elements (data-edit, data-i-edit,
   data-cs-edit) are emptied. If everything else is identical, only text changed. Each text element is identified
   by a signature (its section, list item, block and field key), so the matching elements in the live page are
   found even if scripts have cloned some of them (marquees). A live element is only patched while it still holds
   what the page was built with: one that scripts have changed (a counter that has counted) makes the whole update
   fall back to the normal reload, so the result is always right. Headline text effects are the exception: GSAP
   SplitText wraps the words (data-anim-text), which is fine as long as the words are still the same; the heading
   is then replaced with the new text as plain text, already in its final place, so nothing plays again. */

const TEXT_SEL = '[data-edit],[data-i-edit],[data-cs-edit]';
const squash = t => String(t).replace(/\s+/g, ' ').trim();
const textOfHtml = html => { const d = document.createElement('div'); d.innerHTML = html; return squash(d.textContent); };
/** The live element still shows what the page was built with (`was`), apart from words wrapped by a headline text effect */
const stillSame = (el, was) => el.innerHTML === was || (!!el.closest('[data-anim-text]') && squash(el.textContent) === textOfHtml(was));

function sigOf(el) {
  const uid = el.closest('section[data-uid]')?.getAttribute('data-uid') || '';
  const item = el.closest('[data-item]')?.getAttribute('data-item') || '';
  const block = el.closest('[data-cs-block]')?.getAttribute('data-cs-block') || '';
  const kind = el.hasAttribute('data-edit') ? 'e' : el.hasAttribute('data-i-edit') ? 'i' : 'c';
  const key = el.getAttribute('data-edit') ?? el.getAttribute('data-i-edit') ?? el.getAttribute('data-cs-edit');
  return `${uid}|${item}|${block}|${kind}|${key}`;
}

/** Parses a page: its text by signature, and its structure with all of that text removed */
export function analyse(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const groups = new Map();
  let conflict = false; // two elements with one signature but different text: not safe to patch
  const els = [...doc.querySelectorAll(TEXT_SEL)];
  els.forEach(el => {
    const sig = sigOf(el);
    const inner = el.innerHTML;
    if (groups.has(sig) && groups.get(sig) !== inner) conflict = true;
    else groups.set(sig, inner);
  });
  els.forEach(el => { el.innerHTML = ''; });
  return { skeleton: doc.documentElement.outerHTML, groups, conflict };
}

/** Tries to bring `liveDoc` (showing the page `prev` was made from) up to `nextHtml` by patching text only.
    Returns { analysis, patched }: `analysis` describes nextHtml (keep it for the next call). */
export function livePatch(prev, nextHtml, liveDoc) {
  const next = analyse(nextHtml);
  const result = { analysis: next, patched: false };
  if (!prev || !liveDoc?.body || prev.conflict || next.conflict) return result;
  if (prev.skeleton !== next.skeleton) return result; // something other than text changed
  const changed = [...next.groups].filter(([sig, inner]) => prev.groups.get(sig) !== inner);
  if (!changed.length) { result.patched = true; return result; }
  const live = new Map();
  liveDoc.querySelectorAll(TEXT_SEL).forEach(el => {
    const sig = sigOf(el);
    if (!live.has(sig)) live.set(sig, []);
    live.get(sig).push(el);
  });
  for (const [sig] of changed) {
    const els = live.get(sig);
    if (!els?.length) return result;
    const was = prev.groups.get(sig);
    if (els.some(el => el.hasAttribute('data-st-editing') || !stillSame(el, was))) return result;
  }
  for (const [sig, inner] of changed) {
    live.get(sig).forEach(el => {
      el.innerHTML = inner;
      if (el.hasAttribute('data-anim-text')) el.removeAttribute('aria-label'); // SplitText set it from the old words
    });
  }
  result.patched = true;
  return result;
}
