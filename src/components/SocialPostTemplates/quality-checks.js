/* Quality checks for a rendered post, measured on the live preview's .spt root:
   low text contrast, text too small to read on a phone, text in the Story safe zones or
   cut off, text that doesn't fit, upscaled (blurry) photos and placeholder text left in.
   Returns [{ level: 'bad' | 'warn', text, key? }], key = the field to jump to. */

const PHONE_W = 390; // a typical phone screen in CSS px: posts are shown about this wide

function parseColor(str) {
  const m = /rgba?\(([^)]+)\)/.exec(str || '');
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
}
const lum = ({ r, g, b }) => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const mix = (fg, bg, a) => ({ r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a) });

/* The colour behind an element: the nearest solid background, or null over a photo */
function backdrop(el, root) {
  for (let n = el; n; n = n === root ? null : n.parentElement) {
    if (n.matches?.('[data-image].has-img')) return null; // text over a photo: can't judge
    const c = parseColor(getComputedStyle(n).backgroundColor);
    if (c && c.a > 0.6) return c;
  }
  return { r: 255, g: 255, b: 255 };
}
/* Text placed on top of a photo frame elsewhere in the layout (absolute overlays) */
function overPhoto(rect, photos) {
  return photos.some(p => rect.left < p.right && rect.right > p.left && rect.top < p.bottom && rect.bottom > p.top);
}

export function runChecks(root, { size, template, fields, imageDims = {}, imagePos = {} }) {
  if (!root?.isConnected) return [];
  const out = [];
  const seen = new Set();
  const add = (level, text, key) => { const id = `${key || ''}|${text}`; if (!seen.has(id)) { seen.add(id); out.push({ level, text, key }); } };
  const labelOf = key => template.fields.find(f => f.key === key)?.label || key;
  const rr = root.getBoundingClientRect();
  if (!rr.width) return [];
  const k = rr.width / size.w; // preview scale
  const photos = [...root.querySelectorAll('[data-image].has-img')].map(p => p.getBoundingClientRect());

  root.querySelectorAll('[data-edit]').forEach(el => {
    const key = el.dataset.edit;
    if (!el.textContent.trim()) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const cs = getComputedStyle(el);
    const label = labelOf(key);
    const fontPx = parseFloat(cs.fontSize) || 16;

    // Readable on a phone?
    const onPhone = fontPx * (PHONE_W / size.w);
    if (onPhone < 7.5) add('warn', `“${label}” will be about ${onPhone.toFixed(1)} px on a phone, which is hard to read. Make it bigger or shorter.`, key);

    // Contrast against what's behind it (skipped over photos and outlined text)
    const fg = parseColor(cs.color);
    if (fg && fg.a > 0.05 && !overPhoto(rect, photos)) {
      const bg = backdrop(el, root);
      if (bg) {
        let alpha = fg.a;
        for (let n = el; n && n !== root; n = n.parentElement) alpha *= parseFloat(getComputedStyle(n).opacity) || 1;
        const r = ratio(mix(fg, bg, alpha), bg);
        const large = onPhone >= 14;
        if (r < (large ? 2 : 3)) add('bad', `“${label}” has very low contrast (${r.toFixed(1)}:1) against its background. Pick a darker or lighter colour.`, key);
        else if (r < (large ? 3 : 4.5)) add('warn', `“${label}” has low contrast (${r.toFixed(1)}:1). Aim for at least ${large ? '3' : '4.5'}:1 so it reads in sunlight.`, key);
      }
    }

    // Position: cut off, or under the Story header / reply bar
    const top = (rect.top - rr.top) / k, bottom = (rect.bottom - rr.top) / k;
    const left = (rect.left - rr.left) / k, right = (rect.right - rr.left) / k;
    if (left < -2 || right > size.w + 2 || top < -2 || bottom > size.h + 2) add('bad', `“${label}” runs off the edge of the post. Shorten it.`, key);
    else if (size.safeTop && (top < size.safeTop - 4 || bottom > size.h - size.safeBottom + 4)) add('warn', `“${label}” sits where Instagram shows the Story header or reply bar.`, key);

    // Placeholder copy left in
    if (/@yourbrand\b/i.test(el.textContent)) add('warn', `Replace “@yourbrand” in “${label}” with your own handle (or set it once in the Brand kit).`, key);
  });

  // Text that still doesn't fit after shrinking
  root.querySelectorAll('[data-fit-box]').forEach(box => {
    if (box.scrollHeight > box.clientHeight + 2) {
      const key = box.querySelector('[data-edit]')?.dataset.edit;
      add('bad', `Some text doesn't fit${key ? ` (around “${labelOf(key)}”)` : ''}. Shorten it or choose a taller size.`, key);
    }
  });

  // Photos stretched beyond their real resolution look soft
  root.querySelectorAll('[data-image].has-img').forEach(el => {
    if (el.dataset.imageFit === 'contain') return;
    const key = el.dataset.image;
    const d = imageDims[key];
    if (!d?.w || !el.clientWidth) return;
    const zoom = Math.max(1, imagePos[key]?.zoom || 1);
    const up = Math.max(el.clientWidth / d.w, el.clientHeight / d.h) * zoom;
    if (up > 1.6) add('warn', `“${labelOf(key)}” is shown ${up.toFixed(1)}× larger than the photo, so it may look blurry. Use a bigger photo or zoom out.`, key);
  });

  // Empty required-looking fields are fine (they hide); flag only an empty headline
  const main = template.fields.find(f => /title|headline|quote|number/i.test(f.key) && f.type !== 'image');
  if (main && !String(fields?.[main.key] || '').trim()) add('warn', `“${main.label}” is empty.`, main.key);

  return out.sort((a, b) => (a.level === b.level ? 0 : a.level === 'bad' ? -1 : 1));
}
