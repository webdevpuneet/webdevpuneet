/* Registry of website section templates (gallery order). Each section lives in its own
   file with its name, version, category, tags, dates, fields, html and css. Plain JS so
   scripts/postbuild.js and the preview capture script can import it. */
import saasSplitHero from './saas-split-hero.js';
import centeredGradientHero from './centered-gradient-hero.js';
import imageBackgroundHero from './image-background-hero.js';
import appProductHero from './app-product-hero.js';
import portfolioHero from './portfolio-hero.js';
import { DEFAULT_THEME, DEFAULT_MOTION } from './meta.js';

export { SECTION_CATEGORIES, sectionCategoryById, DEFAULT_THEME, THEME_PRESETS, THEME_COLORS, THEME_KEYS, BASE_CSS, IMG, MOTION_PRESETS, MOTION_SPEEDS, DEFAULT_MOTION, GSAP_CDN, GSAP_VERSION } from './meta.js';

export const SECTION_TEMPLATES = [
  saasSplitHero,
  centeredGradientHero,
  imageBackgroundHero,
  appProductHero,
  portfolioHero,
];
export const sectionTemplateById = id => SECTION_TEMPLATES.find(t => t.id === id);

/** Default editor state for a section */
export function defaultSectionState(t) {
  return {
    fields: Object.fromEntries(t.fields.map(f => [f.key, f.value ?? ''])),
    toggles: Object.fromEntries((t.toggles || []).map(x => [x.key, x.value])),
    theme: { ...DEFAULT_THEME, ...(t.theme || {}) },
    fonts: { heading: 'inter', body: 'inter', ...(t.fonts || {}) },
    motion: { ...DEFAULT_MOTION, ...(t.motion || {}) }, // GSAP entrance animation
    uploads: {}, // field key -> { id, file, w, h }: images uploaded in this browser
  };
}

/** A saved state brought up to date with the template (unknown keys dropped, new ones added) */
export function restoreSectionState(t, saved) {
  const d = defaultSectionState(t);
  const pick = (src, def) => ({ ...def, ...Object.fromEntries(Object.entries(src || {}).filter(([k]) => k in def)) });
  const imageKeys = new Set(t.fields.filter(f => f.type === 'image').map(f => f.key));
  const uploads = Object.fromEntries(Object.entries(saved?.uploads || {}).filter(([k, u]) => imageKeys.has(k) && u?.id));
  return {
    fields: pick(saved?.fields, d.fields),
    toggles: pick(saved?.toggles, d.toggles),
    theme: pick(saved?.theme, d.theme),
    fonts: pick(saved?.fonts, d.fonts),
    motion: pick(saved?.motion, d.motion),
    uploads,
  };
}

/** Other sections, same category first, then by shared tags */
export function relatedSectionTemplates(t, limit = Infinity) {
  const tags = new Set(t.tags);
  return SECTION_TEMPLATES
    .filter(x => x.id !== t.id)
    .map((x, i) => ({ x, i, score: (x.category === t.category ? 10 : 0) + x.tags.filter(tag => tags.has(tag)).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map(r => r.x);
}
