/**
 * Auto-tags every UI snippet and writes src/lib/snippet-tag-map.js.
 *
 * Tags are derived from what a snippet actually *contains* — the CDN libraries it
 * loads, the browser APIs it calls, the CSS techniques it uses, and the domain its
 * title describes — so the map can be regenerated after any snippet batch lands
 * without hand-maintaining 1600 tag lists.
 *
 *   node scripts/generate-snippet-tags.mjs          # write the map
 *   node scripts/generate-snippet-tags.mjs --report # counts per tag, no write
 *
 * A snippet keeps at most MAX_TAGS tags. Rules are grouped into tiers: a specific
 * tier-1 signal (GSAP, Three.js) always beats a broad tier-5 one (gradient, hover)
 * so the five slots go to the tags a person would actually search for. Any snippet
 * module may also declare its own `tags: [...]`, which wins over everything here.
 */

import fs from 'node:fs';
import path from 'node:path';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const MAX_TAGS = 5;
const OUT = path.resolve('src/lib/snippet-tag-map.js');

/**
 * Each rule: [tagId, tier, test]. `test` receives a context object with the raw
 * fields plus a lowercased haystack of everything, so rules stay one-liners.
 * Lower tier number = more specific = wins a slot first.
 */
const RULES = [
  // ── Tier 1 — the library the snippet actually loads ──────────────────────
  // Match real usage, not a mention: a CDN URL or an actual API call. Several
  // snippet titles say "No GSAP", which a bare /gsap/ would happily tag.
  ['gsap',        1, c => /cdn[^\s"']*gsap|gsap\.(to|from|fromto|timeline|set|registerplugin|utils)|greensock|scrolltrigger\.(create|refresh|kill)|registerplugin\(scrolltrigger/.test(c.all)],
  ['three-js',    1, c => /three@|three\.min\.js|THREE\./.test(c.raw)],
  // Real usage, not a mention: the CDN URL, or Bootstrap's own data-bs-* JS
  // hooks / bootstrap.Modal-style API calls a snippet's markup or script uses.
  ['bootstrap',   1, c => /cdn[^\s"']*\/bootstrap@|data-bs-toggle|data-bs-target|data-bs-dismiss|data-bs-parent|bootstrap\.(modal|offcanvas|tab|collapse|tooltip|popover|toast)\b/.test(c.all)],
  ['lottie',      1, c => /lottie/.test(c.all)],

  // ── Tier 2 — the browser API or platform feature it's built on ───────────
  ['canvas',              2, c => /<canvas|getcontext\(['"]2d/.test(c.all)],
  ['web-audio',           2, c => /audiocontext|new audio\(|<audio/.test(c.all)],
  ['web-crypto',          2, c => /crypto\.subtle|getrandomvalues/.test(c.all)],
  ['intersection-observer', 2, c => /intersectionobserver/.test(c.all)],
  ['local-storage',       2, c => /localstorage|sessionstorage|indexeddb/.test(c.all)],
  ['clipboard-api',       2, c => /navigator\.clipboard|execcommand\(['"]copy/.test(c.all)],
  ['drag-and-drop',       2, c => /draggable|dragstart|dragover|drop-zone|dropzone|drag.?(and.?)?drop|reorder/.test(c.all)],
  ['touch-gestures',      2, c => /touchstart|touchmove|pointerdown|swipe|pinch|long.?press/.test(c.all)],
  ['keyboard-navigation', 2, c => /keydown|keyup|['"]keypress|arrowdown|shortcut/.test(c.all)],
  ['svg',                 2, c => /<svg/.test(c.all)],

  // ── Tier 3 — the CSS or motion technique on show ─────────────────────────
  ['glassmorphism',    3, c => /backdrop-filter|glassmorph|\bglass\b/.test(c.all)],
  ['3d-effects',       3, c => /perspective|preserve-3d|rotate3d|rotatey|translatez/.test(c.all)],
  ['parallax',         3, c => /parallax/.test(c.all)],
  ['scroll-animation', 3, c => c.cat === 'scroll' || /scrolltrigger|scroll-behavior|scrollytelling|onscroll|['"]scroll['"]/.test(c.all)],
  ['text-effects',     3, c => /typewriter|scramble|marquee|background-clip:\s*text|text-stroke|glitch|split.?text|gradient text/.test(c.all)],
  ['css-animation',    3, c => /@keyframes/.test(c.all)],
  ['dark-mode',        3, c => /prefers-color-scheme|data-theme|dark.?mode|theme.?toggle/.test(c.all)],
  ['accessibility',    3, c => /:focus-visible|prefers-reduced-motion|sr-only|aria-live|aria-expanded|role="dialog"|role="tablist"/.test(c.all)],
  ['css-only',         3, c => !c.hasJs],

  // ── Tier 4 — what the component is for ───────────────────────────────────
  ['ai-ui',            4, c => /\bai\b|\bllm\b|prompt|chatbot|token|agent|inference|model/.test(c.title) || c.id.startsWith('ai-')],
  ['developer-tools',  4, c => c.cat === 'dev' || /terminal|console|json|regex|api|git\b|log\b|code|debug|env\b|cron|http|devtool/.test(c.title)],
  ['data-visualization', 4, c => c.cat === 'charts' || /chart|graph|sparkline|gauge|heatmap|meter|histogram|plot/.test(c.title)],
  ['dashboard-ui',     4, c => c.cat === 'dashboards' || /dashboard|kpi|metric|analytics|stat|monitor|uptime|status/.test(c.title)],
  ['ecommerce',        4, c => /cart|checkout|product|price|pricing|coupon|order|shipping|store|payment|invoice/.test(c.title)],
  ['authentication',   4, c => /login|sign.?up|sign.?in|password|otp|auth|2fa|verif|account|permission/.test(c.title)],
  ['media-player',     4, c => /video|audio|player|playlist|podcast|music|volume|camera|gallery|lightbox|carousel|slider/.test(c.title)],
  ['social-ui',        4, c => /like|comment|share|follow|avatar|feed|profile|chat|message|reaction|story|notification/.test(c.title)],
  ['mobile-ui',        4, c => c.cat === 'mobile' || /mobile|phone|bottom.?sheet|tab.?bar|app.?screen|swipe/.test(c.title)],
  ['games',            4, c => c.cat === 'games' || /game|puzzle|quiz|score|player|level|maze|snake|memory/.test(c.title)],
  ['loading-states',   4, c => c.cat === 'loaders' || /skeleton|shimmer|spinner|loading|progress|placeholder/.test(c.title)],
  ['landing-page',     4, c => c.cat === 'heroes' || c.cat === 'pricing' || /hero|landing|cta|testimonial|feature|waitlist|newsletter|footer/.test(c.title)],
  ['onboarding',       4, c => /onboard|tour|walkthrough|wizard|multi.?step|stepper|welcome|empty state|tooltip|coach/.test(c.title)],
  ['timers',           4, c => /countdown|timer|stopwatch|clock|schedule|calendar|date/.test(c.title)],
  ['data-tables',      4, c => c.cat === 'tables' || /table|spreadsheet|column|row|grid view|leaderboard/.test(c.title)],
  ['form-validation',  4, c => c.cat === 'forms' || /validat|form|input|field|select|checkbox|toggle|upload/.test(c.title)],

  // ── Tier 5 — broad techniques that only fill leftover slots ──────────────
  ['micro-interactions', 5, c => c.cat === 'buttons' || /ripple|magnet|cursor|tilt|glow|pulse|bounce|shake|wiggle|confetti|spotlight|stagger|hover|toggle|reveal|flip|morph/.test(c.title)],
  ['css-grid',      5, c => /display:\s*grid|grid-template/.test(c.all)],
  ['js-libraries',  5, c => c.hasCdn],
];

/** Builds the match context for one snippet. */
function context(sn) {
  const raw = [sn.html, sn.css, sn.js, (sn.cdnUrls || []).join(' ')].filter(Boolean).join('\n');
  return {
    id:     sn.id,
    cat:    sn.category,
    title:  sn.title.toLowerCase(),
    raw,
    all:    (raw + '\n' + sn.title).toLowerCase(),
    hasJs:  Boolean(sn.js && sn.js.trim()),
    hasCdn: Boolean(sn.cdnUrls && sn.cdnUrls.length),
  };
}

// Last resort so no snippet ships tagless: the closest tag for its category.
const FALLBACK_BY_CATEGORY = {
  buttons: 'micro-interactions', forms: 'form-validation',     cards: 'css-grid',
  navigation: 'keyboard-navigation', footers: 'landing-page',  modals: 'accessibility',
  tables: 'data-tables',       charts: 'data-visualization',   loaders: 'loading-states',
  animations: 'css-animation', scroll: 'scroll-animation',     layouts: 'css-grid',
  dashboards: 'dashboard-ui',  pricing: 'ecommerce',           heroes: 'landing-page',
  mobile: 'mobile-ui',         games: 'games',                 misc: 'micro-interactions',
  dev: 'developer-tools',      carousels: 'touch-gestures',    media: 'media-player',
  tools: 'developer-tools',    visualizers: 'data-visualization',
};

/** Returns up to MAX_TAGS tag ids for a snippet, most specific first. */
export function tagsFor(sn) {
  if (Array.isArray(sn.tags) && sn.tags.length) return sn.tags.slice(0, MAX_TAGS);
  const c = context(sn);
  const hits = [];
  for (const [id, tier, test] of RULES) {
    let ok = false;
    try { ok = test(c); } catch { ok = false; }
    if (ok) hits.push({ id, tier, order: hits.length });
  }
  hits.sort((a, b) => a.tier - b.tier || a.order - b.order);
  if (!hits.length) {
    const fb = FALLBACK_BY_CATEGORY[c.cat];
    return fb ? [fb] : [];
  }
  return hits.slice(0, MAX_TAGS).map(h => h.id);
}

const map = {};
for (const sn of SNIPPETS) map[sn.id] = tagsFor(sn);

// ── Report ────────────────────────────────────────────────────────────────
const counts = {};
for (const tags of Object.values(map)) for (const t of tags) counts[t] = (counts[t] || 0) + 1;
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`${SNIPPETS.length} snippets · ${sorted.length} tags in use`);
for (const [t, n] of sorted) console.log(`  ${String(n).padStart(4)}  ${t}`);
const untagged = Object.entries(map).filter(([, t]) => !t.length).map(([id]) => id);
if (untagged.length) console.log(`\n⚠ ${untagged.length} untagged: ${untagged.slice(0, 20).join(', ')}`);

if (process.argv.includes('--report')) process.exit(0);

// ── Write ─────────────────────────────────────────────────────────────────
const body = Object.keys(map).sort()
  .map(id => `  '${id}': [${map[id].map(t => `'${t}'`).join(', ')}],`)
  .join('\n');

fs.writeFileSync(OUT, `// AUTO-GENERATED by scripts/generate-snippet-tags.mjs — do not edit by hand.
// Regenerate after adding snippets:  node scripts/generate-snippet-tags.mjs
// Maps a snippet id to its tags (max ${MAX_TAGS}, most specific first). Tag copy and
// SEO content for each id live in src/lib/snippet-tags.js.

export const SNIPPET_TAG_MAP = {
${body}
};
`, 'utf8');
console.log(`\n✓ wrote ${path.relative(process.cwd(), OUT)} — ${Object.keys(map).length} snippets`);
