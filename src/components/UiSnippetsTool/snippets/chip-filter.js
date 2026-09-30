const chipFilter = {
  id: 'chip-filter',
  title: 'Chip Filter',
  lastmod: '2026-06-12',
  category: 'forms',
  html: `<div class="page">
  <div class="header">
    <h1 class="heading">Component Library</h1>
    <p class="sub">48 components across 6 categories</p>
  </div>
  <div class="chips" id="chips" role="group" aria-label="Filter by category">
    <button class="chip active" data-cat="all">All <span class="chip-count" id="count-all">12</span></button>
    <button class="chip" data-cat="layout">Layout <span class="chip-count" id="count-layout"></span></button>
    <button class="chip" data-cat="forms">Forms <span class="chip-count" id="count-forms"></span></button>
    <button class="chip" data-cat="data">Data <span class="chip-count" id="count-data"></span></button>
    <button class="chip" data-cat="feedback">Feedback <span class="chip-count" id="count-feedback"></span></button>
    <button class="chip" data-cat="nav">Navigation <span class="chip-count" id="count-nav"></span></button>
  </div>
  <div class="grid" id="grid" aria-live="polite"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 24px 20px; }

.page { max-width: 680px; margin: 0 auto; }

.header { margin-bottom: 20px; }
.heading { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.sub { font-size: 13px; color: #64748b; }

.chips {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-bottom: 20px;
}

.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 999px;
  border: 1.5px solid #e2e8f0;
  background: #fff; color: #64748b;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.1s;
  white-space: nowrap;
  user-select: none;
}
.chip:hover { border-color: #6366f1; color: #6366f1; background: #f5f3ff; }
.chip.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.chip-count {
  font-size: 10px; font-weight: 700;
  min-width: 18px; height: 18px; padding: 0 4px;
  border-radius: 9px;
  background: rgba(255,255,255,0.25); color: inherit;
  display: flex; align-items: center; justify-content: center;
}
.chip:not(.active) .chip-count { background: #f1f5f9; color: #94a3b8; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  transition: border-color 0.15s, box-shadow 0.15s, opacity 0.2s, transform 0.2s;
}
.card:hover { border-color: #a5b4fc; box-shadow: 0 4px 14px rgba(99,102,241,0.1); }
.card.hidden { opacity: 0; transform: scale(0.94); pointer-events: none; position: absolute; }

.card-icon {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; margin-bottom: 10px;
}
.card-name { font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 3px; }
.card-desc { font-size: 11.5px; color: #64748b; line-height: 1.4; margin-bottom: 8px; }
.card-tag {
  display: inline-block;
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
  padding: 2px 8px; border-radius: 4px;
}
.tag-layout   { background: #eff6ff; color: #3b82f6; }
.tag-forms    { background: #f0fdf4; color: #22c55e; }
.tag-data     { background: #fefce8; color: #eab308; }
.tag-feedback { background: #fdf4ff; color: #a855f7; }
.tag-nav      { background: #fff7ed; color: #f97316; }

.empty { grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8; font-size: 14px; display: none; }
.empty.show { display: block; }`,
  js: `const ITEMS = [
  { name:'Bento Grid',      desc:'Responsive asymmetric grid',      cat:'layout',   icon:'⬛', bg:'#eff6ff' },
  { name:'Masonry Layout',  desc:'Pinterest-style column layout',   cat:'layout',   icon:'🧱', bg:'#eff6ff' },
  { name:'Dashboard Grid',  desc:'Admin panel skeleton layout',     cat:'layout',   icon:'📐', bg:'#eff6ff' },
  { name:'Floating Label',  desc:'Animated placeholder input',      cat:'forms',    icon:'✏️',  bg:'#f0fdf4' },
  { name:'OTP Input',       desc:'6-digit code entry field',        cat:'forms',    icon:'🔢', bg:'#f0fdf4' },
  { name:'Tag Input',       desc:'Multi-value chip input',          cat:'forms',    icon:'🏷️',  bg:'#f0fdf4' },
  { name:'Data Table',      desc:'Sortable & filterable table',     cat:'data',     icon:'📊', bg:'#fefce8' },
  { name:'Donut Chart',     desc:'SVG donut with tooltip',          cat:'data',     icon:'🍩', bg:'#fefce8' },
  { name:'Line Chart',      desc:'SVG sparkline widget',            cat:'data',     icon:'📈', bg:'#fefce8' },
  { name:'Toast Queue',     desc:'Stacked notification toasts',     cat:'feedback', icon:'🔔', bg:'#fdf4ff' },
  { name:'Progress Bar',    desc:'Animated step progress bar',      cat:'feedback', icon:'📶', bg:'#fdf4ff' },
  { name:'Mega Menu',       desc:'Multi-column dropdown nav',       cat:'nav',      icon:'🗂️',  bg:'#fff7ed' },
];

const grid   = document.getElementById('grid');
const chips  = document.querySelectorAll('.chip');
let active   = 'all';

function countByCat(cat) { return cat === 'all' ? ITEMS.length : ITEMS.filter(i => i.cat === cat).length; }

function updateCounts() {
  chips.forEach(c => {
    const cat = c.dataset.cat;
    const span = c.querySelector('.chip-count');
    span.textContent = countByCat(cat);
  });
}

function render() {
  const shown = active === 'all' ? ITEMS : ITEMS.filter(i => i.cat === active);

  grid.innerHTML = shown.map(item => \`
    <div class="card">
      <div class="card-icon" style="background:\${item.bg}">\${item.icon}</div>
      <div class="card-name">\${item.name}</div>
      <div class="card-desc">\${item.desc}</div>
      <span class="card-tag tag-\${item.cat}">\${item.cat}</span>
    </div>
  \`).join('');

  if (!shown.length) {
    grid.innerHTML = '<div class="empty show">No components match this filter.</div>';
  }
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    active = chip.dataset.cat;
    render();
  });
});

updateCounts();
render();`,
  seo: {
    title: 'Chip Filter — Free HTML CSS JS Snippet',
    description: `Pill filter chips filtering a responsive card grid by category with live count badges and animated transitions. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Chip Filter — HTML CSS JavaScript',
      description: `Pill-shaped filter chips that instantly filter a card grid by category. Active state, count badges, and animated cards. Zero dependencies.

Chip filters — sometimes called filter pills or tag filters — are a core navigation pattern in component libraries, design systems, marketplaces, and content-heavy interfaces. They give users a tactile, scannable way to narrow a collection without leaving the page. This snippet builds a complete chip filter system with per-category counts, active state management, and live grid filtering using pure HTML, CSS, and vanilla JavaScript.

**Chip active state and styling**

Each chip button uses \`border-radius: 999px\` to create a fully rounded pill shape regardless of text length. In the inactive state the chip has a \`1.5px solid #e2e8f0\` border on a white background with muted grey text. The \`.active\` class switches to a solid indigo fill (\`background: #6366f1\`) with white text — a single class toggle drives the full visual transition. A CSS \`transition\` on \`border-color\`, \`background\`, and \`color\` ensures the switch animates smoothly rather than snapping.

**Count badges**

Each chip contains a \`.chip-count\` span showing how many items belong to that category. On inactive chips the badge uses a light \`#f1f5f9\` background; on the active chip it inherits white text with a semi-transparent white background (\`rgba(255,255,255,0.25)\`) to maintain legibility against the indigo fill. Counts are computed once on load by filtering the ITEMS array — this keeps the JS simple and avoids DOM queries for counting.

**Rendering approach**

Rather than toggling \`display\` or \`visibility\` on existing DOM nodes, the \`render()\` function replaces \`grid.innerHTML\` entirely with only the matching items. This is deliberately simple — for small datasets (under 200 items) it is faster and less error-prone than a dual-state approach with CSS \`hidden\` classes. For larger datasets where DOM churn is costly, a \`hidden\` class approach with \`position: absolute\` would be preferable to avoid reflow.

**Data model**

Each item object carries \`name\`, \`desc\`, \`cat\`, \`icon\`, and \`bg\` fields. The category string on each item matches the \`data-cat\` attribute on the corresponding chip, making the filter a simple \`Array.filter()\` call: \`ITEMS.filter(i => i.cat === active)\`. Adding a new category requires only adding items with the new cat string and a matching chip button — no other logic changes.

**Empty state**

When no items match the active filter (impossible with the default data but relevant when connecting to dynamic data), the grid renders a centred "No components match this filter" message. The empty state div is always in the DOM but hidden; \`show\` class makes it visible.

**Accessibility**

The chip group has \`role="group"\` and \`aria-label="Filter by category"\`. The grid has \`aria-live="polite"\` so screen readers announce when the content updates after a filter change. Chip buttons are native \`<button>\` elements so they receive keyboard focus and fire on Enter/Space by default.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Click any category chip',
        text: `The chip switches to the filled indigo active state and the card grid instantly re-renders with only matching components.`,
      },
      {
        title: 'Click "All"',
        text: `The "All" chip activates and all 12 cards are shown. The count badge on the chip shows the total item count.`,
      },
      {
        title: 'Read the count badges',
        text: `Each chip shows a small badge with the number of items in that category, so users know what to expect before filtering.`,
      },
      {
        title: 'Hover a card',
        text: `Cards show a subtle indigo border and a soft shadow lift to indicate they are interactive links in a real implementation.`,
      },
      {
        title: 'Add your own items',
        text: `Extend the ITEMS array with your own objects — each needs name, desc, cat (matching a chip data-cat), icon, and bg color.`,
      },
      {
        title: 'Add a new category',
        text: `Add a chip button with data-cat="yourcat" and add ITEMS entries with cat:"yourcat". No other code changes are required.`,
      },
    ] },
    features: [
      {
        title: 'Pill-shaped chips',
        text: `border-radius: 999px creates perfect pills regardless of label length. Active chips switch to solid indigo fill with a smooth CSS transition.`,
      },
      {
        title: 'Count badges',
        text: `Each chip shows the item count for its category. Inactive badges use a light background; active badges inherit white text on the indigo fill.`,
      },
      {
        title: 'Live grid re-render',
        text: `Clicking a chip replaces grid.innerHTML with only matching cards — simple, fast, and zero DOM diffing complexity for small datasets.`,
      },
      {
        title: 'Empty state',
        text: `When a filter returns no items the grid shows a clear empty-state message instead of a confusing blank area.`,
      },
      {
        title: 'Category tag on cards',
        text: `Each card has a colour-coded category badge so the category is visible after filtering (useful when items span multiple tags in future extensions).`,
      },
      {
        title: 'Accessible group semantics',
        text: `Chip container has role="group" and aria-label. The grid has aria-live="polite" so screen readers announce filter result changes.`,
      },
      {
        title: 'Data-driven',
        text: `All categories and items live in a single ITEMS array. Adding new categories requires no logic changes — only new data and a chip button.`,
      },
      {
        title: 'Hover card lift',
        text: `Cards animate with border-color and box-shadow transitions on hover, signalling interactivity without distracting from the filter flow.`,
      },
    ],
    useCases: [
      {
        title: 'Component libraries',
        text: `Filter a UI kit by category — layout, forms, navigation, feedback — exactly as shown. Pair each card with a [modal](/ui-snippets/modal/) to show component details on click.`,
      },
      {
        title: 'Job boards and marketplaces',
        text: `Filter listings by role, location, or salary range. Combine with [tag input](/ui-snippets/tag-input/) to allow multi-select filtering with typed tags.`,
      },
      {
        title: 'Blog and article archives',
        text: `Filter posts by topic. Each chip represents a category; the grid shows article cards. Pair with a [search box](/ui-snippets/search-box/) for keyword + category filtering.`,
      },
      {
        title: 'Product catalogues',
        text: `Filter products by department. Each card is a [product card](/ui-snippets/product-card/) with price, image, and add-to-cart. Chip filter drives the visible subset.`,
      },
      {
        title: 'Portfolio sites',
        text: `Filter projects by skill or technology. Combine with a [masonry grid](/ui-snippets/masonry-grid/) layout so project screenshots fill space naturally.`,
      },
      { icon: 'CODE', title: 'Related: Hamburger Menu — CSS Only Checkbox Hack (No JavaScript)', desc: 'See the [Hamburger Menu — CSS Only Checkbox Hack (No JavaScript)](/ui-snippets/css-only-hamburger-menu-checkbox/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I support multi-select (multiple active chips)?',
        a: `Change active from a string to a Set: const active = new Set(["all"]). On chip click, toggle the category in/out of the set. In render(), filter items where the set has "all" or includes item.cat. Update chip active class based on set membership.`,
      },
      {
        q: 'How do I animate cards out and in when filtering?',
        a: `Add an opacity:0 and transform:scale(0.95) state on .card before re-rendering. Use setTimeout to apply the new innerHTML after a 150ms fade-out. Then requestAnimationFrame to add an opacity:1 class on the new cards.`,
      },
      {
        q: 'How do I make this work with real backend data?',
        a: `Replace the ITEMS array with a fetch() call to your API endpoint. On page load, fetch all items once, store them in the ITEMS variable, then call updateCounts() and render(). Chip clicks just re-filter the in-memory array without additional network requests.`,
      },
      {
        q: 'How do I persist the active filter in the URL?',
        a: `On chip click, update the URL with history.pushState(null, "", "?cat=" + active). On page load, read the parameter with new URLSearchParams(location.search).get("cat") and set the initial active value before calling render().`,
      },
      {
        q: 'Can I use icons instead of text labels on chips?',
        a: `Yes — replace the button text with an SVG icon and a hidden <span> for screen readers, keeping aria-label on the button. The pill shape and count badge work identically.`,
      },
      {
        q: 'Can I use this chip filter in React, Vue, or Angular?',
        a: `Yes. Click the React, Vue, Angular, or Tailwind export button above the preview. In React, store the active category (or a Set for multi-select) in useState and toggle each chip class with a conditional className; in Vue bind :class to a reactive value with @click; in Angular use [class.active] with (click). The count-badge calculation and the filtered-list re-render are framework-agnostic, so only the event binding and class-toggling syntax differ from the vanilla version. The Tailwind export converts the pill shape, active state, and badge styling into utility classes for a Tailwind codebase.`,
      },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming the innerHTML-replace approach in render() is obviously fine, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why replacing the entire grid's innerHTML on every chip click is a reasonable choice for this dataset size, and at what item count it would start to matter that no DOM diffing happens. The same assistant is useful for optimizing it — ask whether updateCounts() recalculating countByCat() for every chip on every render is wasteful compared to computing all category counts once in a single pass over ITEMS. It's also a good partner for extending the filter: ask it to support multiple simultaneously active chips (a Set instead of a single string), persist the active filter to the URL query string so a filtered view is shareable, or animate cards fading out and in instead of snapping when the filter changes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "chip filter" for a card grid in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- A row of pill-shaped filter buttons (border-radius near 999px) generated from a fixed list of categories plus an "All" option, each showing a count badge for how many items belong to that category, computed from a single JavaScript array of item objects (not hardcoded numbers).
- Clicking a chip must mark it (and only it) as the active chip via a shared CSS class, and re-render the card grid to show only items whose category matches the clicked chip's category — with "All" showing every item.
- The active chip's visual style must differ meaningfully from inactive chips (not just a subtle color shift) — for example a filled background versus an outlined one — and the count badge's colors must also adapt so it stays legible against both the active and inactive chip backgrounds.
- Re-render the grid by rebuilding its contents from the filtered subset of the items array each time a chip is clicked, rather than toggling visibility classes on pre-existing card elements.
- When a filter produces zero matching items, replace the grid contents with a clear "no items match this filter" message instead of leaving a blank area.
- Each card must display a colored icon swatch, a name, a short description, and a small category tag whose color corresponds to that category — driven from the same per-item category field used for filtering, not a separate lookup.
- Mark the chip container with an appropriate ARIA role for a button group and mark the grid as a live region so screen readers announce when the filtered results change.`,
    },
  },
};
export default chipFilter;
