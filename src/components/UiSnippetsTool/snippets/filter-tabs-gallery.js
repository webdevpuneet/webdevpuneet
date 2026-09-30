const filterTabsGallery = {
  id: 'filter-tabs-gallery',
  title: 'Filter Tabs Gallery',
  category: 'media',
  html: `<div class="gallery-wrap">
  <div class="filter-tabs" role="tablist" aria-label="Gallery filters">
    <button class="filter-tab active" data-filter="all" onclick="filterGallery(this)">All</button>
    <button class="filter-tab" data-filter="nature" onclick="filterGallery(this)">Nature</button>
    <button class="filter-tab" data-filter="city" onclick="filterGallery(this)">City</button>
    <button class="filter-tab" data-filter="people" onclick="filterGallery(this)">People</button>
  </div>
  <div class="gallery-grid" id="galleryGrid">
    <div class="gallery-item" data-category="nature"><div class="thumb thumb-1"></div><span>Forest Trail</span></div>
    <div class="gallery-item" data-category="city"><div class="thumb thumb-2"></div><span>Skyline</span></div>
    <div class="gallery-item" data-category="people"><div class="thumb thumb-3"></div><span>Portrait</span></div>
    <div class="gallery-item" data-category="nature"><div class="thumb thumb-4"></div><span>Mountain Lake</span></div>
    <div class="gallery-item" data-category="city"><div class="thumb thumb-5"></div><span>Night Streets</span></div>
    <div class="gallery-item" data-category="people"><div class="thumb thumb-6"></div><span>Street Style</span></div>
    <div class="gallery-item" data-category="nature"><div class="thumb thumb-7"></div><span>Desert Dunes</span></div>
    <div class="gallery-item" data-category="city"><div class="thumb thumb-8"></div><span>Bridge</span></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; }

.gallery-wrap { width: 100%; max-width: 720px; margin: 0 auto; }

.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.filter-tab:hover { border-color: #6366f1; color: #6366f1; }
.filter-tab.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 560px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }

.gallery-item {
  transition: opacity 0.25s ease, transform 0.25s ease;
  opacity: 1;
  transform: scale(1);
}
.gallery-item.hidden {
  opacity: 0;
  transform: scale(0.85);
  position: absolute;
  pointer-events: none;
  width: 0;
  height: 0;
  overflow: hidden;
}

.thumb {
  aspect-ratio: 1;
  border-radius: 10px;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
}
.thumb-1, .thumb-4, .thumb-7 { background: linear-gradient(135deg, #34d399, #10b981); }
.thumb-2, .thumb-5, .thumb-8 { background: linear-gradient(135deg, #60a5fa, #3b82f6); }
.thumb-3, .thumb-6 { background: linear-gradient(135deg, #f472b6, #ec4899); }

.gallery-item span { font-size: 12px; color: #475569; font-weight: 500; }`,
  js: `function filterGallery(btn) {
  const filter = btn.dataset.filter;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.gallery-item').forEach(item => {
    const match = filter === 'all' || item.dataset.category === filter;
    item.classList.toggle('hidden', !match);
  });
}`,

  seo: {
    title: 'Filter Tabs Gallery — Free HTML CSS JS Filterable Image Grid Snippet',
    description: 'A filterable image gallery with category tabs (All / Nature / City / People). Fade-and-scale transitions on filter, powered by data-category attributes and vanilla JS.',
    about: {
      title: 'Filter Tabs Gallery — HTML, CSS & JavaScript Filterable Grid',
      description: `Portfolio sites, stock photo pages, and product catalogs all need a way to narrow a large grid down to a relevant subset without a page reload. This snippet pairs a row of pill-shaped filter tabs with a responsive image grid, where clicking a tab instantly shows only the matching items with a soft fade-and-scale transition.

The gallery uses a **single source of truth**: every \`.gallery-item\` carries a \`data-category\` attribute (\`nature\`, \`city\`, or \`people\`). The filter tabs carry a matching \`data-filter\` attribute. No duplicate lists or hidden state to keep in sync — the DOM attribute is the state.

**How the filtering logic works**

Clicking a tab calls \`filterGallery(btn)\`, which reads \`btn.dataset.filter\`. It then loops over every \`.gallery-item\` and checks whether \`filter === 'all'\` or the item's \`dataset.category\` matches. Items that don't match get the \`.hidden\` class toggled on; items that do match get it removed. This is a single pass over the grid, so it scales fine to a few hundred items without any noticeable delay.

**How the fade-and-scale transition works**

Rather than just toggling \`display: none\`, hidden items transition their \`opacity\` to 0 and \`transform: scale(0.85)\` down slightly, using a 0.25s CSS \`transition\`. Once faded out, the \`.hidden\` class also collapses the item's box (\`width/height: 0\`, \`position: absolute\`, \`overflow: hidden\`) so the remaining visible items reflow into a clean grid instead of leaving gaps. Because the collapse properties and the opacity/transform properties are on the same class, the fade plays first visually before the layout collapses — the effect reads as a gentle "items melt away" rather than an abrupt jump.

**Extending the categories**

Add a new tab button with a new \`data-filter\` value, then tag any gallery items with the matching \`data-category\`. No JavaScript changes are required — the loop works for any number of categories.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Filter Tabs Gallery" in the sidebar Library tab to load the HTML, CSS, and JS panels.' },
        { title: 'Click through the filters', text: 'Try All, Nature, City, and People in the preview to see the fade-and-scale filtering in action.' },
        { title: 'Swap in your own images', text: 'Replace the gradient .thumb divs with <img> tags, or set background-image on each .thumb in the CSS panel.' },
        { title: 'Add more categories', text: 'Add a new filter tab with a data-filter value and tag matching gallery items with the same data-category. No JS changes needed.' },
        { title: 'Adjust the transition', text: 'Tune the 0.25s duration or the scale(0.85) value in the CSS panel to make the filter feel snappier or slower.' },
        { title: 'Export and save', text: 'Use the export buttons for HTML, JSX, or Tailwind, or click "Save as" to store your version in IndexedDB.' },
      ],
    },
    features: [
      'Category filtering driven entirely by data-category / data-filter attributes',
      'Fade-and-scale exit transition instead of an abrupt display:none jump',
      'Single-pass filterGallery() function scales to large grids without slowdown',
      'Responsive grid — 4 columns on desktop, 2 on mobile via a single media query',
      'Active tab styled with a solid pill background for clear visual state',
      'Hidden items collapse their box so the grid reflows without gaps',
      'Add unlimited categories with zero JavaScript changes',
      'No external image or icon library required — gradient placeholders included',
      'Fully keyboard-clickable buttons with role="tablist" for screen readers',
    ],
    useCases: [
      { icon: 'GALLERY', title: 'Portfolio and photography sites', desc: 'Let visitors filter a body of work by category without leaving the page or triggering a reload.' },
      { icon: 'SHOP', title: 'Product or catalog grids', desc: 'Swap category names for product types (Shirts / Shoes / Accessories) and reuse the same filtering logic.' },
      { icon: 'LEARN', title: 'Learn attribute-driven UI state', desc: 'Study how data-* attributes act as the single source of truth instead of maintaining a separate JS array of items.' },
      { icon: 'DESIGN', title: 'Prototype content-heavy pages', desc: 'Quickly mock up a filterable media library or asset browser before wiring it to a real backend.' },
      { icon: 'FLOW', title: 'Blog or article tag filters', desc: 'Adapt the same pattern to filter blog post cards by tag instead of image category.' },
      { icon: 'CODE', title: 'Multi-select filtering', desc: 'Use this single-select version as a base, then extend filterGallery to support multiple active tags with a Set instead of a single string.' },
      { icon: 'CODE', title: 'Related: Keyboard Keys', desc: 'See the [Keyboard Keys](/ui-snippets/kbd-keys/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the gallery know which items match a filter?', a: 'Every gallery item has a data-category attribute. When a tab is clicked, filterGallery reads the tab\'s data-filter value and compares it against each item\'s data-category, toggling a .hidden class on non-matches.' },
      { q: 'Why use data attributes instead of separate arrays?', a: 'Keeping the category directly on the DOM element means there is only one place to update when content changes — no risk of a JS array getting out of sync with the actual markup.' },
      { q: 'Can I filter by multiple categories at once?', a: 'The base version supports one active filter at a time. To support multi-select, track selected filters in a Set, toggle tabs individually instead of clearing all, and check item.dataset.category against the Set with .has().' },
      { q: 'How do I add a new category like "Animals"?', a: 'Add a button with data-filter="animals" to the .filter-tabs row, and add data-category="animals" to any gallery-item you want included. No JavaScript edits are required.' },
      { q: 'Why do hidden items disappear instead of just fading?', a: 'The .hidden class both fades the opacity/scale and collapses the box dimensions. This lets the remaining visible items reflow cleanly into the grid instead of leaving empty gaps where filtered-out items used to be.' },
      { q: 'Can I use real photos instead of the gradient placeholders?', a: 'Yes. Replace the .thumb divs with <img src="..." class="thumb"> tags, or keep the divs and set background-image and background-size: cover in CSS.' },
      { q: 'Does this work with a large number of images?', a: 'Yes, the filtering loop is O(n) over the visible items and runs in under a millisecond for typical gallery sizes (dozens to a few hundred items).' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant and ask it to walk through why the .hidden class combines opacity/transform transitions with box-collapsing properties in the same class — that combination is what makes the exit feel like a smooth fade instead of a layout jump. You can also ask it to convert the single-select filter into a multi-select one using a Set of active categories, or to add a "count" badge on each tab showing how many items match. It's a good exercise in seeing how far you can push a pattern using only data attributes as state before you actually need a JS framework.`,
      prompt: `Build a "filter tabs gallery" in plain HTML, CSS, and vanilla JavaScript.

Requirements:
- A row of pill-shaped filter buttons (All, plus at least three specific categories), each carrying a data-filter attribute, with exactly one marked active at a time.
- A responsive image grid below the tabs where every grid item carries a data-category attribute matching one of the filter values.
- A single filterGallery(btn) function that reads the clicked button's data-filter, updates the active class on the tabs, and loops once over all grid items toggling a .hidden class based on whether data-category matches the filter (or the filter is "all").
- The .hidden state must combine a CSS opacity/transform transition (for a fade-and-scale effect) with box-collapsing (zero width/height, absolute positioning) so that hidden items don't leave gaps and visible items reflow into a clean grid.
- The grid must be responsive (at least 4 columns on desktop collapsing to 2 on narrow viewports) using a single media query.
- No external libraries, no build step, and the pattern must support adding new categories purely by adding new markup — no JavaScript changes.`,
    },
  },
};

export default filterTabsGallery;
