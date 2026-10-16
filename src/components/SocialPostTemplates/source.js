/* Build-time source for a template page: the template's default HTML (text filled
   in) and its full CSS, so the code is in the server-rendered HTML for crawlers and
   AI assistants. No DOM needed; safe to import from server components. */

import { BASE_CSS, SIZES, richText } from './templates/index.js';
import { FONTS } from '../OgImageGenerator/engine.js';

const fontById = id => FONTS.find(f => f.id === id) || FONTS[0];
const stack = f => (f.family ? `"${f.family}", ${f.fallback}` : f.stack);

/* `size` is optional: {id, w, h, safeTop?, safeBottom?}. Defaults to the template's opening size.
   scripts/capture-template-previews.mjs uses it to render 1200x630 OG images. */
export function templateSource(t, size) {
  const z = size || SIZES.find(s => s.id === (t.defaultSize || 'portrait')) || SIZES[0];
  const fonts = [...new Set([t.fonts.heading, t.fonts.body, ...(t.extraFonts || [])])].map(fontById);
  const vars = [
    `width:${z.w}px`, `height:${z.h}px`,
    `--u:${Math.min(z.w, z.h) / 100}px`,
    `--safe-top:${z.safeTop || 0}px`, `--safe-bottom:${z.safeBottom || 0}px`,
    `--font-heading:${stack(fontById(t.fonts.heading)).replace(/"/g, "'")}`,
    `--font-body:${stack(fontById(t.fonts.body)).replace(/"/g, "'")}`,
    ...t.vars.map(v => `--${v.key}:${v.value}`),
  ].join(';');
  const values = Object.fromEntries(t.fields.filter(f => f.type !== 'image').map(f => [f.key, f.value || '']));
  // Every [data-edit] element in a template is empty; fill it with the default text
  const body = t.html.replace(/(<([a-z0-9]+)\b[^>]*\bdata-edit="([^"]+)"[^>]*>)(<\/\2>)/gi,
    (m, open, tag, key, close) => open + richText(values[key] ?? '') + close);
  const families = fonts.filter(f => f.family);
  const html = `<!-- ${t.name} v${t.version} · ${z.label} ${z.w}×${z.h} -->\n<div class="spt is-${z.id}" style="${vars}">\n${body}\n</div>\n`;
  const css = `${families.length ? `@import url('https://fonts.googleapis.com/css2?${families.map(f => `family=${f.family.replace(/ /g, '+')}:wght@${f.weights.join(';')}`).join('&')}&display=swap');\n\n` : ''}/* Shared base (every template) */\n${BASE_CSS.trim()}\n\n/* ${t.name} */\n${t.css}\n`;
  return { html, css, size: z };
}
