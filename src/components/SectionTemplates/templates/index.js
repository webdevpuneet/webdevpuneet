/* Registry of website section templates (gallery order). Each section lives in its own
   file with its name, version, category, tags, dates, fields, html and css. Plain JS so
   scripts/postbuild.js and the preview capture script can import it. */
import saasSplitHero from './saas-split-hero.js';
import centeredGradientHero from './centered-gradient-hero.js';
import imageBackgroundHero from './image-background-hero.js';
import appProductHero from './app-product-hero.js';
import portfolioHero from './portfolio-hero.js';
import featuresIconGrid from './features-icon-grid.js';
import featuresSplitImage from './features-split-image.js';
import featuresBento from './features-bento.js';
import featuresAlternating from './features-alternating.js';
import featuresSteps from './features-steps.js';
import pricingThreeTier from './pricing-three-tier.js';
import pricingDarkGlow from './pricing-dark-glow.js';
import pricingSinglePlan from './pricing-single-plan.js';
import pricingRows from './pricing-rows.js';
import testimonialsGrid from './testimonials-grid.js';
import testimonialsCarousel from './testimonials-carousel.js';
import testimonialsMarquee from './testimonials-marquee.js';
import testimonialSpotlight from './testimonial-spotlight.js';
import faqAccordion from './faq-accordion.js';
import faqSplit from './faq-split.js';
import faqGrid from './faq-grid.js';
import ctaGradientBanner from './cta-gradient-banner.js';
import ctaSplitImage from './cta-split-image.js';
import ctaNewsletter from './cta-newsletter.js';
import ctaStrip from './cta-strip.js';
import statsCounters from './stats-counters.js';
import logoCloud from './logo-cloud.js';
import statsDarkSplit from './stats-dark-split.js';
import navbarSimple from './navbar-simple.js';
import navbarFloating from './navbar-floating.js';
import navbarAnnouncement from './navbar-announcement.js';
import footerColumns from './footer-columns.js';
import footerGiant from './footer-giant.js';
import footerNewsletter from './footer-newsletter.js';
import footerMinimal from './footer-minimal.js';
import teamGrid from './team-grid.js';
import teamCarousel from './team-carousel.js';
import teamHiring from './team-hiring.js';
import contactSplitForm from './contact-split-form.js';
import contactCards from './contact-cards.js';
import contactMap from './contact-map.js';
import blogCards from './blog-cards.js';
import blogFeatured from './blog-featured.js';
import blogList from './blog-list.js';
import { DEFAULT_THEME, DEFAULT_MOTION } from './meta.js';

export { SECTION_CATEGORIES, sectionCategoryById, DEFAULT_THEME, THEME_PRESETS, THEME_COLORS, THEME_KEYS, BASE_CSS, IMG, MOTION_PRESETS, MOTION_SPEEDS, TEXT_EFFECTS, DEFAULT_MOTION, GSAP_CDN, GSAP_VERSION, SCALE_CONTROLS, SCALE_MIN, SCALE_MAX, SCALE_STEP, scaleCss } from './meta.js';
export { ICONS, ICON_IDS, iconSvg } from './icons.js';
export { iconSvgAny, iconLabelAny, encodeIcon, decodeIcon } from './icon-lib.js';

export const SECTION_TEMPLATES = [
  saasSplitHero,
  centeredGradientHero,
  imageBackgroundHero,
  appProductHero,
  portfolioHero,
  featuresIconGrid,
  featuresSplitImage,
  featuresBento,
  featuresAlternating,
  featuresSteps,
  pricingThreeTier,
  pricingDarkGlow,
  pricingSinglePlan,
  pricingRows,
  testimonialsGrid,
  testimonialsCarousel,
  testimonialsMarquee,
  testimonialSpotlight,
  faqAccordion,
  faqSplit,
  faqGrid,
  ctaGradientBanner,
  ctaSplitImage,
  ctaNewsletter,
  ctaStrip,
  statsCounters,
  logoCloud,
  statsDarkSplit,
  navbarSimple,
  navbarFloating,
  navbarAnnouncement,
  footerColumns,
  footerGiant,
  footerNewsletter,
  footerMinimal,
  teamGrid,
  teamCarousel,
  teamHiring,
  contactSplitForm,
  contactCards,
  contactMap,
  blogCards,
  blogFeatured,
  blogList,
];
export const sectionTemplateById = id => SECTION_TEMPLATES.find(t => t.id === id);

/* Repeatable lists (t.lists): each item is { _id, ...its fields }. _id keeps uploads tied
   to the right item when items are added, removed or reordered. */
export const newItemId = () => `i${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
/** A list item with every field of the list (missing ones from the list's blank item) */
export function listItem(list, values = {}, id) {
  const item = { _id: id || values._id || newItemId() };
  for (const fd of list.fields) item[fd.key] = values[fd.key] ?? fd.value ?? '';
  return item;
}
const defaultLists = t => Object.fromEntries((t.lists || []).map(l => [l.key, l.value.map((v, i) => listItem(l, v, `d${i}`))]));
/** Upload keys an image can live under: section image fields, and `${list}.${itemId}.${field}` */
export const listImageKey = (listKey, itemId, fieldKey) => `${listKey}.${itemId}.${fieldKey}`;

/** Default editor state for a section */
export function defaultSectionState(t) {
  return {
    lists: defaultLists(t),
    fields: Object.fromEntries(t.fields.map(f => [f.key, f.value ?? ''])),
    // Toggles, plus the ones switch fields control (e.g. showLogoIcon), so restore keeps them
    toggles: {
      ...Object.fromEntries(t.fields.filter(f => f.type === 'switch' && f.toggle).map(f => [f.toggle, f.value !== false])),
      ...Object.fromEntries((t.toggles || []).map(x => [x.key, x.value])),
    },
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
  const lists = {};
  for (const l of t.lists || []) {
    const items = Array.isArray(saved?.lists?.[l.key]) ? saved.lists[l.key] : null;
    lists[l.key] = items ? items.slice(0, l.max || 24).map(it => listItem(l, it)) : d.lists[l.key];
  }
  const imageKeys = new Set(t.fields.filter(f => f.type === 'image').map(f => f.key));
  for (const l of t.lists || []) {
    const imgs = l.fields.filter(fd => fd.type === 'image');
    for (const it of lists[l.key]) for (const fd of imgs) imageKeys.add(listImageKey(l.key, it._id, fd.key));
  }
  const uploads = Object.fromEntries(Object.entries(saved?.uploads || {}).filter(([k, u]) => imageKeys.has(k) && u?.id));
  return {
    lists,
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
