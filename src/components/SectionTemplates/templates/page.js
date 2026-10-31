/* Whole pages for the Website Builder (/website-builder/): an ordered list of sections
   sharing ONE theme, font pair and motion setting.

   Page shape:
     { name, theme, fonts, motion, sections: [{ uid, tpl, state }] }
   Each section's own theme / fonts / motion are ignored on a page: the page's win, so any
   mix of sections looks like one website.

   The page document includes every template's CSS once, every behaviour script once,
   one GSAP include with the union of plugins, one motion runtime (it already animates
   every .st on the page) and all sections' structured data. */

import { sectionTemplateById, defaultSectionState, restoreSectionState, listItem } from './index.js';
import { formatHtml } from './format.js';
import { WEBSITE_TEMPLATES, websiteTemplateById } from './starters.js';
import { DEFAULT_THEME, DEFAULT_MOTION, BASE_CSS, esc, gsapCdn, THEME_PRESETS, THEME_COLORS, scaleCss } from './meta.js';
import { BEHAVIORS } from './behaviors.js';
import { cleanScroll, scrollAttr, SCROLL_RUNTIME } from './scroll.js';
import { artMarkup, ART_CSS, ART_RUNTIME, cleanArt } from './art.js';
import { cleanSectionStyle, sectionStyleCss, sectionStyleClass, sectionRules, HIDE_CSS } from './section-style.js';
import { themeCss, googleFontsUrl, fillHtml, motionScript, motionPlugins, schemaTag } from './render.js';

export const newUid = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** A new, empty page */
export const emptyPage = (name = 'Untitled page') => ({ name, theme: { ...DEFAULT_THEME }, fonts: { heading: 'jakarta', body: 'inter' }, motion: { ...DEFAULT_MOTION }, sections: [] });

/* Section anchors: an optional id per section so navbar links like #pricing scroll to it.
   New sections get a default from their category (unique on the page). */
const ANCHOR_FOR = { features: 'features', pricing: 'pricing', testimonials: 'customers', faq: 'faq', contact: 'contact', blog: 'blog', team: 'team', stats: 'results', cta: 'get-started', gallery: 'gallery', about: 'about' };
/** A URL-safe anchor id ('' when empty) */
export const cleanAnchor = v => String(v || '').toLowerCase().trim().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
/** The default anchor for a template on a page ('' for navbars, heroes and footers) */
export function defaultAnchor(tplId, sections = []) {
  const t = sectionTemplateById(tplId);
  const base = t?.anchor ?? ANCHOR_FOR[t?.category]; // a template can set its own (or '' for none)
  if (!base) return '';
  const used = new Set(sections.map(s => s.anchor).filter(Boolean));
  let a = base, n = 2;
  while (used.has(a)) a = `${base}-${n++}`;
  return a;
}

/* ── Per-section style overrides ──────────────────────────────────────────────────
   A section on a page may override the page theme for itself only (colours, gradient, spacing,
   background photo, hiding by screen size, typography, own CSS): see section-style.js, which
   the Website Sections editor shares. */
export { SECTION_SCHEMES, SECTION_SPACING, SECTION_OVERLAYS, BG_KEY, cleanSectionStyle, sectionPadding } from './section-style.js';

/** A section instance for a page (default content of its template) */
export function newPageSection(tplId, sections = []) {
  const t = sectionTemplateById(tplId);
  return t ? { uid: newUid(), tpl: tplId, anchor: defaultAnchor(tplId, sections), state: defaultSectionState(t) } : null;
}

/* Starter pages = the website templates (templates/starters.js): each is a stack of
   sections with a theme, fonts and real content for its industry. */
export const STARTERS = WEBSITE_TEMPLATES;

/** Apply a template's content overrides ({ fields, lists, toggles }) to a section state */
function withOverrides(t, state, o = {}) {
  const next = { ...state, fields: { ...state.fields, ...(o.fields || {}) }, toggles: { ...state.toggles, ...(o.toggles || {}) }, lists: { ...state.lists } };
  for (const [key, items] of Object.entries(o.lists || {})) {
    const l = (t.lists || []).find(x => x.key === key);
    if (l && Array.isArray(items)) next.lists[key] = items.map((v, i) => listItem(l, v, `o${i}`));
  }
  const art = o.art && cleanArt(o.art); // SVG artwork layer (art.js)
  if (art) next.art = art;
  return next;
}

/** Sections from a template's [templateId, overrides] list (unknown ids skipped) */
export function starterSections(list = []) {
  const out = [];
  for (const [id, o] of list) {
    const sec = newPageSection(id, out);
    if (!sec) continue;
    if (o && typeof o.anchor === 'string') sec.anchor = cleanAnchor(o.anchor); // a template can name a section's anchor
    sec.state = withOverrides(sectionTemplateById(id), sec.state, o);
    out.push(sec);
  }
  return out;
}

/** A new page built from a website template (its home page; site.js adds the other pages) */
export function pageFromStarter(starterId) {
  const st = websiteTemplateById(starterId);
  if (!st) return emptyPage();
  const page = emptyPage(st.name);
  const preset = st.preset && THEME_PRESETS.find(p => p.id === st.preset);
  if (preset) page.theme = { ...page.theme, ...Object.fromEntries(THEME_COLORS.map(c => [c.key, preset[c.key]])) };
  if (st.theme) page.theme = { ...page.theme, ...st.theme };
  page.fonts = { ...page.fonts, ...(st.fonts || {}) };
  page.sections = starterSections(st.sections);
  return page;
}

/** A saved page brought up to date: unknown templates dropped, each state restored */
export function restorePage(saved) {
  const base = emptyPage();
  const p = saved || {};
  return {
    name: String(p.name || base.name),
    theme: { ...base.theme, ...(p.theme || {}) },
    fonts: { ...base.fonts, ...(p.fonts || {}) },
    motion: { ...base.motion, ...(p.motion || {}) },
    sections: (Array.isArray(p.sections) ? p.sections : [])
      .map(s => {
        const t = sectionTemplateById(s?.tpl);
        if (!t) return null;
        const style = cleanSectionStyle(s.style);
        const scroll = cleanScroll(s.scroll);
        return { uid: s.uid || newUid(), tpl: t.id, anchor: cleanAnchor(s.anchor), state: restoreSectionState(t, s.state), ...(style ? { style } : {}), ...(scroll ? { scroll } : {}) };
      })
      .filter(Boolean),
  };
}

/** The state a section renders with on the page (page theme, fonts and motion win) */
export const sectionOnPage = (page, s) => ({ ...s.state, theme: page.theme, fonts: page.fonts, motion: page.motion });

const pageTemplates = page => page.sections.map(s => sectionTemplateById(s.tpl)).filter(Boolean);
const THEME_HOLDER = { theme: {}, fonts: {} };

/** CSS for the whole page: theme tokens and base once, each template's CSS once (sizes
    scaled by the page theme's Sizes settings) */
export function pageCss(page, { fontFaces = '' } = {}) {
  const seen = new Set();
  const parts = [fontFaces, themeCss(THEME_HOLDER, { theme: page.theme, fonts: page.fonts }), scaleCss(BASE_CSS, page.theme)];
  for (const t of pageTemplates(page)) if (!seen.has(t.id)) { seen.add(t.id); parts.push(`/* ${t.name} */\n${scaleCss(t.css, page.theme)}`); }
  if (page.sections.some(s => s.state?.art)) parts.push(ART_CSS); // SVG artwork layers (art.js)
  if (page.sections.some(s => s.style?.hide)) parts.push(HIDE_CSS); // sections hidden on phones / larger screens
  // Per-section typography and own CSS, scoped to each section
  for (const s of page.sections) { const r = sectionRules(s.style, `.st[data-uid="${String(s.uid).replace(/[^\w-]/g, '')}"]`); if (r) parts.push(r); }
  return parts.filter(Boolean).join('\n');
}

/** Every section's markup, in order. imageSrc(uid, key) resolves uploaded images. */
export function pageMarkup(page, { imageSrc, clean = true } = {}) {
  return page.sections.map(s => {
    const t = sectionTemplateById(s.tpl);
    if (!t) return '';
    const src = imageSrc ? k => imageSrc(s.uid, k) : undefined;
    const id = cleanAnchor(s.anchor);
    const css = sectionStyleCss(page.theme, t, s.style, k => imageSrc?.(s.uid, k));
    const sc = scrollAttr(s);
    return `<section${id ? ` id="${id}"` : ''} class="st st-${t.id}${sectionStyleClass(s.style)}"${css ? ` style="${esc(css)}"` : ''}${sc ? ` data-scroll="${esc(sc)}"` : ''} data-uid="${esc(s.uid)}">\n${artMarkup(s.state?.art, s.uid)}${fillHtml(t, sectionOnPage(page, s), { imageSrc: src, clean })}\n</section>`;
  }).join('\n');
}

/* ── Page scroll effects (Theme tab → Animation, Website Builder only) ──────────────
   smooth    ScrollSmoother on desktop-sized screens with a mouse (touch keeps native
             scrolling, and the full-screen mobile menus never show there). The script wraps
             the sections in #smooth-wrapper / #smooth-content at run time, so the exported
             markup is unchanged and works without JavaScript. Leading sticky headers stay
             outside the wrapper, so they still stick and their menus work; the content gets
             their height as top padding. #anchor links scroll smoothly below the header.
   parallax  Backgrounds drift slower than the page (ScrollTrigger scrub): [data-bg] photo
             layers (image hero) and per-section background images, which move to their own
             layer inside the section so the content never shifts. Works with or without smooth.
   Both run only with motion (exports, ▶ Play) and are off for reduced motion. */
const scrollOn = page => !!(page.motion?.smooth || page.motion?.parallax || page.motion?.progress);

export function scrollScript(m = {}) {
  return `(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  var scrub = function (el, sec, from, to) {
    gsap.fromTo(el, { yPercent: from }, { yPercent: to, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
  };
  if (${!!m.parallax}) {
    document.querySelectorAll('.st [data-bg]').forEach(function (el) {
      gsap.set(el, { scale: 1.2 });
      scrub(el, el.closest('.st'), -7, 7);
    });
    document.querySelectorAll('.st').forEach(function (sec) {
      var bg = sec.style.backgroundImage;
      if (!bg || bg.indexOf('url(') < 0) return; // a photo only (a gradient section stays as it is)
      var layer = document.createElement('div');
      layer.setAttribute('aria-hidden', 'true');
      layer.style.cssText = 'position:absolute;left:0;right:0;top:-16%;bottom:-16%;z-index:-1;pointer-events:none;background-size:cover;background-position:center';
      layer.style.backgroundImage = bg;
      sec.style.backgroundImage = 'none';
      sec.style.isolation = 'isolate';
      sec.insertBefore(layer, sec.firstChild);
      scrub(layer, sec, -9, 9);
    });
  }
  if (${!!m.progress}) {
    // Reading progress: a thin brand-coloured bar across the top of the screen
    var first = document.querySelector('.st');
    var bar = document.createElement('div');
    bar.setAttribute('aria-hidden', 'true');
    bar.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:3px;z-index:9999;pointer-events:none;transform-origin:0 50%;transform:scaleX(0)';
    bar.style.background = (first && getComputedStyle(first).getPropertyValue('--st-brand').trim()) || '#4f46e5';
    document.body.appendChild(bar);
    gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  }
  if (${!!m.smooth} && window.ScrollSmoother) {
    gsap.registerPlugin(ScrollSmoother);
    gsap.matchMedia().add('(min-width: 1024px) and (pointer: fine)', function () {
      var all = Array.prototype.filter.call(document.body.children, function (el) { return el.classList && el.classList.contains('st') && !el.classList.contains('st-floating-social-share'); });
      var head = [];
      while (head.length < all.length && all[head.length].querySelector('[data-sticky-flag]')) head.push(all[head.length]);
      var rest = all.slice(head.length);
      if (!rest.length) return;
      var wrap = document.createElement('div'), content = document.createElement('div');
      wrap.id = 'smooth-wrapper'; content.id = 'smooth-content';
      wrap.appendChild(content);
      rest[0].parentNode.insertBefore(wrap, rest[0]);
      rest.forEach(function (el) { content.appendChild(el); });
      var headH = function () { return head.reduce(function (h, el) { return h + el.offsetHeight; }, 0); };
      var pad = function () { content.style.paddingTop = head.length ? headH() + 'px' : ''; };
      pad();
      var ro = window.ResizeObserver && head.length ? new ResizeObserver(pad) : null;
      head.forEach(function (el) { if (ro) ro.observe(el); });
      var root = document.documentElement, was = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      var smoother = ScrollSmoother.create({ wrapper: wrap, content: content, smooth: 1.1, smoothTouch: false });
      ScrollTrigger.refresh();
      var onClick = function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        var t = a && a.getAttribute('href').length > 1 && document.getElementById(a.getAttribute('href').slice(1));
        if (!t || !content.contains(t)) return;
        e.preventDefault();
        smoother.scrollTo(t, true, 'top ' + headH() + 'px');
      };
      document.addEventListener('click', onClick);
      return function () {
        document.removeEventListener('click', onClick);
        if (ro) ro.disconnect();
        smoother.kill();
        rest.forEach(function (el) { wrap.parentNode.insertBefore(el, wrap); });
        wrap.remove();
        root.style.scrollBehavior = was;
      };
    });
  }
})();`;
}

/** Scripts for the page: each behaviour once, then the motion runtime once, then the page
    scroll effects */
export function pageScript(page, { motion = true } = {}) {
  const names = [...new Set(pageTemplates(page).flatMap(t => t.behaviors || []))];
  const behaviors = names.map(n => BEHAVIORS[n]?.js).filter(Boolean).join('\n');
  const anim = motion && page.sections.length ? motionScript({ motion: page.motion }) : '';
  const scroll = motion && page.sections.length && scrollOn(page) ? scrollScript(page.motion) : '';
  const scrollAnims = motion && page.sections.some(s => s.scroll) ? SCROLL_RUNTIME : ''; // per-section scroll animations (scroll.js)
  const art = motion && page.sections.some(s => s.state?.art?.anim) ? ART_RUNTIME : ''; // animated SVG artwork (art.js)
  return [behaviors && !motion ? 'window.ST_STILL = true;' : '', behaviors, anim, scroll, scrollAnims, art].filter(Boolean).join('\n');
}

/** GSAP CDN URLs the page needs ([] when it has no scripts) */
export function pageCdn(page, { motion = true } = {}) {
  const names = [...new Set(pageTemplates(page).flatMap(t => t.behaviors || []))];
  const plugins = [...names.flatMap(n => BEHAVIORS[n]?.plugins || []), ...(motion ? motionPlugins({ motion: page.motion }) : []), ...(motion && page.motion?.smooth ? ['ScrollSmoother'] : [])];
  return pageScript(page, { motion }) ? gsapCdn([...new Set(plugins)]) : [];
}

/** All sections' JSON-LD (FAQPage, BlogPosting lists …) */
export const pageSchema = page => page.sections.map(s => { const t = sectionTemplateById(s.tpl); return t ? schemaTag(t, sectionOnPage(page, s)) : ''; }).join('');

/** Document-level CSS every page needs before the section CSS */
export const pageBaseCss = page => `body{margin:0;background:${page.theme?.bg || '#fff'}}
html{scroll-behavior:smooth}section[id]{scroll-margin-top:84px}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}`;

/**
 * The complete page as one HTML document.
 * @param imageSrc  (uid, key) => url   uploaded images (data URLs, images/… or blob: in the preview)
 * @param clean     strip editor bindings (exports)
 * @param motion    include the entrance animation runtime
 * Multi-page sites (site.js) also pass:
 * @param title       the <title> (default: page.name)
 * @param canonical   absolute URL for <link rel="canonical">
 * @param activeFile  this page's file name (index.html, about.html): the navbar link to it gets aria-current="page"
 * @param stylesheet  href of a shared stylesheet, used instead of an inline <style>
 * @param script      src of a shared script, used instead of an inline <script>
 * @param cdnUrls     GSAP URLs to load (default: what this page needs)
 */
/** The navbar link that points at this page gets aria-current="page" (styled in each navbar's CSS),
    so visitors see where they are. Links with a #hash point inside a page and are left alone. */
export function markActiveNav(html, activeFile) {
  const same = h => h === activeFile || (activeFile === 'index.html' && (h === './' || h === '/' || h === ''));
  return html.replace(/<a\b[^>]*\bclass="(?:nb|nf|na)-link"[^>]*>/g, tag => {
    const href = (tag.match(/\shref="([^"]*)"/) || [])[1];
    return href !== undefined && !href.includes('#') && same(href) ? tag.replace(/>$/, ' aria-current="page">') : tag;
  });
}

/* Every exported page needs exactly one <h1>. Inner pages often start with a section whose heading is an
   h2 (the hero with the h1 is only on the home page), so when a page has no h1 its first heading is promoted.
   Section CSS targets classes (.st-h2) and the base style treats h1 and h2 alike, so nothing changes visually. */
function ensureH1(html) {
  if (/<h1[\s>]/i.test(html)) return html;
  const open = html.search(/<h2[\s>]/i);
  const close = open < 0 ? -1 : html.indexOf('</h2>', open);
  if (close < 0) return html;
  return html.slice(0, open) + html.slice(open, close + 5).replace(/^<h2/i, '<h1').replace(/<\/h2>$/i, '</h1>') + html.slice(close + 5);
}

export function pageDocumentHtml(page, { imageSrc, clean = true, fontFaces = '', extraHead = '', motion = true, description = '', title, canonical = '', stylesheet = '', script = '', cdnUrls, activeFile = '' } = {}) {
  const gf = googleFontsUrl(THEME_HOLDER, { fonts: page.fonts });
  const js = script ? '' : pageScript(page, { motion });
  const cdn = cdnUrls || (js ? pageCdn(page, { motion }) : []);
  const libs = cdn.map(u => `<script src="${u}"></script>`).join('\n');
  const scripts = script ? `${libs ? `${libs}\n` : ''}<script src="${esc(script)}"></script>\n` : js ? `${libs}\n<script>\n${js}\n</script>\n` : '';
  const styles = stylesheet ? `<link rel="stylesheet" href="${esc(stylesheet)}">` : `<style>\n${pageBaseCss(page)}\n${pageCss(page, { fontFaces })}\n</style>`;
  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title || page.name || 'My website')}</title>
${description ? `<meta name="description" content="${esc(description)}">\n` : ''}${canonical ? `<link rel="canonical" href="${esc(canonical)}">\n` : ''}<!-- Built with the free Website Builder · https://webdevpuneet.com/website-builder/ -->
${gf ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${gf}" rel="stylesheet">\n` : ''}${clean ? pageSchema(page) : ''}${styles}${extraHead}
</head>
<body>
${clean ? ensureH1(pageMarkup(page, { imageSrc, clean })) : pageMarkup(page, { imageSrc, clean })}
${scripts}</body>
</html>
`;
  const out = activeFile ? markActiveNav(doc, activeFile) : doc;
  // Exports are indented like hand-written HTML (the builder preview isn't, it's never read)
  return clean ? formatHtml(out) : out;
}
