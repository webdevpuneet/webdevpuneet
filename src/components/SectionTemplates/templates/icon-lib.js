/* Icons picked from the open-source icon sets (see ../icon-sets.js). Such an icon is stored in
   the section's state as a self-contained id, `svg|name|w|h|<url-encoded markup>`, so saved
   designs and every export keep working offline. The curated Lucide set in icons.js keeps its
   short ids ('zap'). The markup is checked against a strict whitelist before it is rendered. */
import { ICONS, iconSvg } from './icons.js';

const TAGS = 'path|circle|rect|line|polyline|polygon|ellipse|g|defs|clipPath|mask|linearGradient|radialGradient|stop';
const TOKEN = new RegExp(`<(?:(?:${TAGS})(?:\\s+[a-zA-Z][\\w:-]*="[^"<>]*")*\\s*/?|/(?:${TAGS}))>`, 'g');

/** The markup when it is only plain SVG shapes, '' otherwise */
export function safeBody(body, max = 20000) {
  const s = String(body || '');
  if (!s || s.length > max) return '';
  if (s.replace(TOKEN, '').trim()) return '';
  if (/\son\w+\s*=|javascript:|href|style\s*=/i.test(s)) return '';
  return s;
}

export const encodeIcon = (name, w, h, body) => `svg|${String(name).replace(/[|]/g, '')}|${w || 24}|${h || 24}|${encodeURIComponent(body)}`;

export function decodeIcon(id) {
  if (typeof id !== 'string' || !id.startsWith('svg|')) return null;
  const [, name, w, h, enc] = id.split('|');
  try {
    const body = safeBody(decodeURIComponent(enc || ''));
    return body ? { name, w: Number(w) || 24, h: Number(h) || 24, body } : null;
  } catch { return null; }
}

/** Inline SVG for either kind of icon id ('' when unknown) */
export function iconSvgAny(id, size = 24) {
  const c = decodeIcon(id);
  if (!c) return iconSvg(id, size);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${c.w} ${c.h}" fill="currentColor" aria-hidden="true">${c.body}</svg>`;
}

export const iconLabelAny = id => ICONS[id]?.[0] || decodeIcon(id)?.name || '';
