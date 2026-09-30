const muuriFilterableDraggableGrid = {
  id: 'muuri-filterable-draggable-grid',
  title: 'Muuri Filterable, Sortable and Draggable Grid',
  lastmod: '2026-09-24',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/muuri@0.9.5/dist/muuri.min.js',
  ],
  html: `<div class="mu-app">
  <div class="mu-bar">
    <input id="muSearch" type="search" placeholder="Search projects..." aria-label="Search projects">
    <div class="mu-chips" id="muChips" role="group" aria-label="Filter by category"></div>
    <div class="mu-tools">
      <button type="button" id="muSort">Sort A&ndash;Z</button>
      <button type="button" id="muShuffle">Shuffle</button>
    </div>
  </div>
  <div class="mu-count" id="muCount" aria-live="polite"></div>
  <div class="mu-grid" id="muGrid"></div>
</div>`,
  css: `body { background: #eef0f6; padding: 14px; font-family: system-ui, sans-serif; }
.mu-app { max-width: 780px; margin: 0 auto; }
.mu-bar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 8px; }
.mu-bar input { flex: 1; min-width: 160px; padding: 10px 12px; border: 1.5px solid #cfd5e4; border-radius: 10px; font: 500 14px/1.2 system-ui, sans-serif; }
.mu-bar input:focus { outline: 0; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,.14); }
.mu-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.mu-chips button { font: 800 12px/1 system-ui, sans-serif; color: #384057; background: #e3e6f2; border: 0; border-radius: 999px; padding: 8px 12px; cursor: pointer; }
.mu-chips button[aria-pressed="true"] { background: #4f46e5; color: #fff; }
.mu-tools { display: flex; gap: 6px; }
.mu-tools button { font: 800 12px/1 system-ui, sans-serif; color: #4338ca; background: #fff; border: 1.5px solid #d3d8ee; border-radius: 9px; padding: 8px 12px; cursor: pointer; }
.mu-tools button:hover { background: #eef0ff; }
.mu-count { margin: 4px 2px 10px; font-size: 12.5px; color: #6b7290; font-weight: 600; }
.mu-grid { position: relative; }
/* Muuri positions each .mu-item absolutely; the inner .mu-card is what we style and what gets the drag shadow. */
.mu-item { position: absolute; width: 33.333%; padding: 6px; box-sizing: border-box; display: block; z-index: 1; touch-action: none; }
@media (max-width: 560px) { .mu-item { width: 50%; } }
.mu-item.muuri-item-dragging { z-index: 3; }
.mu-item.muuri-item-releasing { z-index: 2; }
.mu-item.muuri-item-hidden { z-index: 0; }
.mu-card { height: 100%; min-height: 96px; border-radius: 14px; padding: 14px; color: #fff; cursor: grab; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(20,25,70,.15); user-select: none; transition: box-shadow .2s; }
.mu-item.muuri-item-dragging .mu-card { cursor: grabbing; box-shadow: 0 16px 30px rgba(20,25,70,.35); }
.mu-card b { font-size: 15px; line-height: 1.2; } .mu-card small { font: 800 10.5px/1 system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase; opacity: .85; }
.mu-card p { margin: 6px 0 0; font-size: 12px; line-height: 1.4; opacity: .9; }
.mu-empty { padding: 30px; text-align: center; color: #6b7290; font-weight: 700; display: none; }`,
  js: `const PROJECTS = [
  ['Brand refresh', 'Design', 'New identity for the spring launch.', 130, '#ec4899,#f43f5e'],
  ['Checkout redesign', 'Design', 'Fewer steps, clearer errors.', 96, '#8b5cf6,#6366f1'],
  ['Design tokens', 'Design', 'One source of truth for colour and space.', 110, '#a855f7,#ec4899'],
  ['API v3', 'Engineering', 'Versioned, documented, typed.', 150, '#0ea5e9,#2563eb'],
  ['Search index', 'Engineering', 'Sub-50ms queries at scale.', 104, '#06b6d4,#0891b2'],
  ['Mobile app', 'Engineering', 'Offline-first rewrite.', 122, '#3b82f6,#4f46e5'],
  ['Launch campaign', 'Marketing', 'Multi-channel spring push.', 100, '#f59e0b,#ef4444'],
  ['Newsletter revamp', 'Marketing', 'Weekly digest with personalisation.', 92, '#f97316,#dc2626'],
  ['Partner programme', 'Marketing', 'Referral tiers and payouts.', 118, '#eab308,#f97316'],
  ['Onboarding study', 'Research', 'Interviews with 24 new users.', 108, '#10b981,#059669'],
  ['Pricing survey', 'Research', 'Willingness-to-pay across segments.', 98, '#14b8a6,#0d9488'],
  ['Accessibility audit', 'Research', 'WCAG 2.2 gaps and fixes.', 126, '#22c55e,#15803d'],
];
const grid = document.getElementById('muGrid');
grid.innerHTML = PROJECTS.map(function (p) {
  return '<div class="mu-item" data-cat="' + p[1] + '" data-title="' + p[0].toLowerCase() + '"><div class="mu-card" style="min-height:' + p[3] + 'px;background:linear-gradient(150deg,' + p[4] + ')"><div><small>' + p[1] + '</small><br><b>' + p[0] + '</b><p>' + p[2] + '</p></div></div></div>';
}).join('');

const muuri = new Muuri(grid, {
  items: '.mu-item',
  layoutDuration: 380,
  layoutEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  showDuration: 300, hideDuration: 300,
  layout: { fillGaps: true },              // masonry-style: small items slot into gaps instead of leaving holes
  dragEnabled: true,
  dragSortHeuristics: { sortInterval: 60, minDragDistance: 8, minBounceBackAngle: 1 },
  dragRelease: { duration: 420, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  dragPlaceholder: { enabled: false },
});

// ---- filter: one predicate combines the category chips and the search box ----
const CATS = ['All'].concat(Array.from(new Set(PROJECTS.map(function (p) { return p[1]; }))));
let cat = 'All', q = '';
const chips = document.getElementById('muChips');
chips.innerHTML = CATS.map(function (c) { return '<button type="button" data-c="' + c + '" aria-pressed="' + (c === 'All') + '">' + c + '</button>'; }).join('');

function applyFilter() {
  muuri.filter(function (item) {
    const el = item.getElement();
    const okCat = cat === 'All' || el.dataset.cat === cat;
    const okQ = !q || el.dataset.title.indexOf(q) !== -1;
    return okCat && okQ;
  });
}
muuri.on('filter', function (shown) {
  document.getElementById('muCount').textContent = shown.length + ' of ' + PROJECTS.length + ' projects shown · drag any card to reorder';
});

chips.addEventListener('click', function (e) {
  const b = e.target.closest('button'); if (!b) return;
  cat = b.dataset.c;
  chips.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
  applyFilter();
});
document.getElementById('muSearch').addEventListener('input', function (e) { q = e.target.value.trim().toLowerCase(); applyFilter(); });

// ---- sort / shuffle: both reorder the SAME items the user can drag, so the layout stays one source of truth ----
document.getElementById('muSort').addEventListener('click', function () {
  muuri.sort(function (a, b) { return a.getElement().dataset.title < b.getElement().dataset.title ? -1 : 1; });
});
document.getElementById('muShuffle').addEventListener('click', function () {
  muuri.sort(function () { return Math.random() - 0.5; });
});
// Relayout when the window resizes (Muuri does not know the container's item widths changed).
window.addEventListener('resize', function () { muuri.refreshItems().layout(); });
applyFilter();`,

  seo: {
    title: 'Muuri Filterable Draggable Grid — Free JS Snippet',
    description: `A masonry-style grid built with Muuri that combines category filtering, live search, sorting, shuffling and drag-to-reorder, all animated and sharing one layout.`,
    about: {
      title: 'Muuri Filterable, Sortable and Draggable Grid — HTML, CSS & JavaScript',
      description: `Most grid libraries do one of three things. Isotope filters and sorts a masonry layout. Sortable and Dragula let you drag items. Masonry packs items into tight columns. Muuri is unusual in doing all of them at once, in the same layout engine: a grid whose items can be filtered by category, ordered by any function, rearranged by hand and packed like masonry, with every change animated. That combination is what makes it the natural choice for portfolio pages, project boards and dashboards, where users both search and curate.

The core setup is a container and a set of items. new Muuri(container, options) positions each element absolutely, calculates a packed layout and animates items into place; the items themselves must have their own wrapper with the positioning and padding, while the inner card carries the visual styling, which is why the CSS separates .mu-item from .mu-card. layout: { fillGaps: true } turns on the masonry behaviour: when a tall card leaves a hole beside it, a later, shorter card is slotted into the gap instead of being pushed to the next row. Card heights are set individually here, which is what makes the effect visible.

Filtering is a predicate. muuri.filter(function (item) { ... }) receives every item and returns whether it should be shown; the snippet's predicate combines the selected category chip with the search text, so both controls work together instead of one clearing the other. Hidden items animate away and the rest close ranks. The filter event reports the shown items, which drives the count line. Sorting is similarly a comparator: muuri.sort(fn) reorders the underlying item list, and the Shuffle button uses a random comparator. Because sort and drag act on the same list, you can sort A–Z, then drag one card to override its position, and the layout stays consistent — there is no separate "manual order" to reconcile.

Dragging is enabled with dragEnabled: true, and the dragSortHeuristics options tune how quickly items swap as you drag: sortInterval throttles the calculation and minDragDistance avoids accidental drags. dragRelease gives the dropped card a soft settle animation. Because layout is computed from item sizes, the snippet calls refreshItems().layout() when the window resizes, since Muuri has no way to know the percentage widths changed. The web-animations polyfill that older Muuri versions needed is not required in current browsers.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Filter by category', text: 'Click Design, Engineering, Marketing or Research. Other cards animate away and the rest close ranks.' },
        { title: 'Search', text: 'Type in the search box. It combines with the selected category chip.' },
        { title: 'Drag a card', text: 'Drag any card to a new place. Neighbours slide aside as you pass over them.' },
        { title: 'Sort or shuffle', text: 'Press Sort A–Z or Shuffle to reorder all visible cards, then drag one to override.' },
        { title: 'Notice the packing', text: 'Cards of different heights pack tightly, with short ones filling gaps beside tall ones.' },
      ],
    },
    features: [
      'Filtering, sorting, shuffling and drag-to-reorder in one layout engine',
      'Masonry-style fillGaps packing for cards of different heights',
      'Single filter predicate combining category chips and search',
      'Sort and shuffle operate on the same list the user can drag',
      'Tuned drag sorting heuristics and a soft release animation',
      'Animated show, hide and layout transitions',
      'Live shown-count from the filter event',
      'Layout refreshed on window resize',
    ],
    useCases: [
      { icon: 'WEB', title: 'Portfolios and project galleries', desc: `Let visitors filter work and curate what they see. For a card-focused layout with a sliding row see the [Swiper multi-row grid](/ui-snippets/swiper-multirow-grid-carousel/).` },
      { icon: 'DASH', title: 'Personal boards and bookmark walls', desc: `Search and rearrange saved items freely.` },
      { icon: 'SHOP', title: 'Wishlists and comparison walls', desc: `Group and reorder products the user is considering.` },
      { icon: 'LEARN', title: 'Learning combined layout features', desc: `A rare example where filter, sort and drag share one source of truth.` },
    ],
    faqs: [
      { q: 'How is Muuri different from Isotope or Sortable?', a: 'Muuri combines filtering, sorting, masonry packing and drag-and-drop in one engine, so all of them work on the same layout.' },
      { q: 'How do I filter with Muuri?', a: 'Call muuri.filter with a predicate function, or a selector string, that returns true for items to show.' },
      { q: 'How do I combine a category filter with search?', a: 'Write one predicate that checks both conditions, and call it whenever either control changes.' },
      { q: 'Why is there a wrapper inside each item?', a: 'Muuri positions the outer item absolutely, so padding and visuals go on an inner element to avoid layout glitches.' },
      { q: 'How do I make it masonry?', a: 'Set layout: { fillGaps: true } so smaller items fill gaps left by taller ones.' },
      { q: 'Why does my layout break on resize?', a: 'Call muuri.refreshItems().layout() when the container or item sizes change, as Muuri does not detect this automatically.' },
      { q: 'Can I use this draggable grid in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Muuri, so in a framework project install it with npm install muuri instead of the CDN tag, create it in useEffect / onMounted / ngAfterViewInit and re-run layout() after the items change, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to persist the manual order, add multi-select with bulk actions, or add drag between two grids.`,
      prompt: `Build a filterable, sortable, draggable masonry grid with Muuri 0.9 loaded from a CDN.

Requirements:
- Create new Muuri(grid, { items, layoutDuration, layout: { fillGaps: true }, dragEnabled: true, dragSortHeuristics, dragRelease }) with twelve project cards of different heights, each inside a positioned wrapper.
- Add category chips (with aria-pressed) and a search box; both feed a single muuri.filter predicate, and a filter event handler shows how many cards are visible.
- Add Sort A-Z and Shuffle buttons using muuri.sort with a comparator.
- Call muuri.refreshItems().layout() on window resize.`,
    },
  },
};

export default muuriFilterableDraggableGrid;
