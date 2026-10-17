/* Shared by the Social Post Templates and Email Templates editors: clicking an element in
   the preview shows its field in the left panel. */

/* Scrolls only the left panel (not the page) so `el` sits in its middle, then flashes it */
export function revealInPanel(el, flashClass) {
  if (!el) return;
  let box = el.parentElement;
  while (box && !/(auto|scroll)/.test(getComputedStyle(box).overflowY)) box = box.parentElement;
  if (box) {
    const r = el.getBoundingClientRect(), b = box.getBoundingClientRect();
    box.scrollTo({ top: box.scrollTop + (r.top - b.top) - (b.height - r.height) / 2, behavior: 'smooth' });
  }
  el.classList.remove(flashClass);
  void el.offsetWidth; // restart the animation
  el.classList.add(flashClass);
}
