const facetedFilterSidebar = {
  id: 'faceted-filter-sidebar',
  title: 'Faceted Filter Sidebar',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="catalog">
  <aside class="filters" id="filters">
    <div class="filters-head">
      <span class="filters-title">Filters</span>
      <button class="clear-all" id="clearAll" onclick="clearAll()">Clear all</button>
    </div>

    <div class="chips" id="activeChips"></div>

    <div class="facet open">
      <button class="facet-head" onclick="toggleFacet(this)">
        <span>Category</span>
        <svg class="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="facet-body">
        <label class="check"><input type="checkbox" value="Sneakers" onchange="onFacet(this,'Category')"><span class="box"></span>Sneakers<em>128</em></label>
        <label class="check"><input type="checkbox" value="Boots" onchange="onFacet(this,'Category')"><span class="box"></span>Boots<em>64</em></label>
        <label class="check"><input type="checkbox" value="Sandals" onchange="onFacet(this,'Category')"><span class="box"></span>Sandals<em>41</em></label>
        <label class="check"><input type="checkbox" value="Loafers" onchange="onFacet(this,'Category')"><span class="box"></span>Loafers<em>27</em></label>
      </div>
    </div>

    <div class="facet open">
      <button class="facet-head" onclick="toggleFacet(this)">
        <span>Price</span>
        <svg class="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="facet-body">
        <div class="price-vals"><span id="priceMinVal">$0</span><span id="priceMaxVal">$300</span></div>
        <div class="range">
          <div class="range-track"><div class="range-fill" id="rangeFill"></div></div>
          <input type="range" id="priceMin" min="0" max="300" value="0" step="10" oninput="onPrice()">
          <input type="range" id="priceMax" min="0" max="300" value="300" step="10" oninput="onPrice()">
        </div>
      </div>
    </div>

    <div class="facet open">
      <button class="facet-head" onclick="toggleFacet(this)">
        <span>Color</span>
        <svg class="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="facet-body">
        <div class="swatches">
          <button class="swatch" style="--c:#1e293b" data-color="Black" onclick="onSwatch(this)" title="Black"></button>
          <button class="swatch" style="--c:#ffffff" data-color="White" onclick="onSwatch(this)" title="White"></button>
          <button class="swatch" style="--c:#ef4444" data-color="Red" onclick="onSwatch(this)" title="Red"></button>
          <button class="swatch" style="--c:#3b82f6" data-color="Blue" onclick="onSwatch(this)" title="Blue"></button>
          <button class="swatch" style="--c:#10b981" data-color="Green" onclick="onSwatch(this)" title="Green"></button>
          <button class="swatch" style="--c:#f59e0b" data-color="Amber" onclick="onSwatch(this)" title="Amber"></button>
        </div>
      </div>
    </div>

    <div class="facet open">
      <button class="facet-head" onclick="toggleFacet(this)">
        <span>Rating</span>
        <svg class="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="facet-body">
        <label class="rate"><input type="radio" name="rating" value="4" onchange="onRating(this)"><span class="stars" data-n="4"></span>& up</label>
        <label class="rate"><input type="radio" name="rating" value="3" onchange="onRating(this)"><span class="stars" data-n="3"></span>& up</label>
        <label class="rate"><input type="radio" name="rating" value="2" onchange="onRating(this)"><span class="stars" data-n="2"></span>& up</label>
      </div>
    </div>
  </aside>

  <div class="results">
    <div class="results-head"><span id="resultCount">260</span> products match</div>
    <div class="results-note">Apply filters on the left — active selections appear as removable chips at the top of the sidebar.</div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;padding:24px 16px;color:#1e293b}
.catalog{max-width:760px;margin:0 auto;display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}

.filters{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:6px 16px 14px}
.filters-head{display:flex;align-items:center;justify-content:space-between;padding:14px 0 6px}
.filters-title{font-size:15px;font-weight:800}
.clear-all{background:none;border:none;color:#6366f1;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;opacity:0;pointer-events:none;transition:opacity .15s}
.clear-all.show{opacity:1;pointer-events:auto}

.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}
.chips:empty{margin:0}
.chip{display:inline-flex;align-items:center;gap:5px;background:#eef2ff;color:#4f46e5;border:1px solid #c7d2fe;border-radius:999px;font-size:11px;font-weight:700;padding:4px 8px;animation:pop .18s ease}
.chip button{background:none;border:none;color:#818cf8;cursor:pointer;font-size:13px;line-height:1;padding:0;font-family:inherit}
.chip button:hover{color:#4f46e5}
@keyframes pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}

.facet{border-top:1px solid #f1f5f9}
.facet-head{width:100%;display:flex;align-items:center;justify-content:space-between;background:none;border:none;padding:12px 0;font-size:13px;font-weight:700;color:#1e293b;cursor:pointer;font-family:inherit}
.caret{color:#94a3b8;transition:transform .2s}
.facet:not(.open) .caret{transform:rotate(-90deg)}
.facet-body{overflow:hidden;max-height:300px;transition:max-height .25s ease,opacity .2s;opacity:1;padding-bottom:10px}
.facet:not(.open) .facet-body{max-height:0;opacity:0;padding-bottom:0}

.check{display:flex;align-items:center;gap:9px;font-size:13px;color:#475569;padding:5px 0;cursor:pointer;user-select:none}
.check input{position:absolute;opacity:0;width:0;height:0}
.box{width:17px;height:17px;border:2px solid #cbd5e1;border-radius:5px;flex-shrink:0;transition:all .15s;position:relative}
.check input:checked+.box{background:#6366f1;border-color:#6366f1}
.check input:checked+.box::after{content:'';position:absolute;left:4.5px;top:1px;width:4px;height:8px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.check em{margin-left:auto;font-style:normal;font-size:11px;color:#94a3b8;font-weight:600}

.price-vals{display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#1e293b;margin-bottom:10px}
.range{position:relative;height:24px}
.range-track{position:absolute;top:10px;left:0;right:0;height:4px;background:#e2e8f0;border-radius:4px}
.range-fill{position:absolute;height:100%;background:#6366f1;border-radius:4px}
.range input{position:absolute;top:0;left:0;width:100%;height:24px;margin:0;background:none;pointer-events:none;-webkit-appearance:none;appearance:none}
.range input::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:auto;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #6366f1;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.2)}
.range input::-moz-range-thumb{pointer-events:auto;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #6366f1;cursor:pointer}

.swatches{display:flex;flex-wrap:wrap;gap:8px;padding:6px 6px 6px 2px}
.swatch{width:26px;height:26px;border-radius:50%;background:var(--c);border:1px solid rgba(0,0,0,.12);cursor:pointer;position:relative;transition:transform .12s}
.swatch:hover{transform:scale(1.12)}
.swatch.active{box-shadow:0 0 0 2px #fff,0 0 0 4px #6366f1}
.swatch.active::after{content:'';position:absolute;left:51%;top:44%;width:4.5px;height:8px;border:solid #fff;border-width:0 2px 2px 0;transform:translate(-50%,-50%) rotate(45deg);filter:drop-shadow(0 1px 1px rgba(0,0,0,.45))}
.swatch[data-color="White"].active::after{border-color:#1e293b;filter:none}

.rate{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b;padding:5px 0;cursor:pointer}
.rate input{accent-color:#6366f1}
.stars{--n:0}
.stars::before{content:'★★★★★';letter-spacing:1px;background:linear-gradient(90deg,#f59e0b calc(var(--n)*20%),#d1d5db calc(var(--n)*20%));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-size:14px}

.results{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;min-height:120px}
.results-head{font-size:18px;font-weight:800}
.results-head span{color:#6366f1}
.results-note{font-size:13px;color:#94a3b8;margin-top:8px;line-height:1.5}

@media(max-width:640px){.catalog{grid-template-columns:1fr}}`,

  js: `var TOTAL = 260;
var state = { Category: [], Color: [], rating: null, price: [0, 300] };

function toggleFacet(btn) {
  btn.parentElement.classList.toggle('open');
}

function onFacet(input, group) {
  var arr = state[group];
  if (input.checked) arr.push(input.value);
  else state[group] = arr.filter(function (v) { return v !== input.value; });
  render();
}

function onSwatch(btn) {
  var c = btn.dataset.color;
  btn.classList.toggle('active');
  if (state.Color.indexOf(c) === -1) state.Color.push(c);
  else state.Color = state.Color.filter(function (v) { return v !== c; });
  render();
}

function onRating(input) {
  state.rating = input.value;
  render();
}

function onPrice() {
  var lo = document.getElementById('priceMin');
  var hi = document.getElementById('priceMax');
  var min = +lo.value, max = +hi.value;
  if (min > max - 10) { if (this === lo) min = max - 10; else max = min + 10; lo.value = min; hi.value = max; }
  state.price = [min, max];
  document.getElementById('priceMinVal').textContent = '$' + min;
  document.getElementById('priceMaxVal').textContent = '$' + max;
  var fill = document.getElementById('rangeFill');
  fill.style.left = (min / 300 * 100) + '%';
  fill.style.right = (100 - max / 300 * 100) + '%';
  render();
}

function removeChip(key, value) {
  if (key === 'rating') {
    state.rating = null;
    document.querySelectorAll('input[name="rating"]').forEach(function (r) { r.checked = false; });
  } else if (key === 'price') {
    state.price = [0, 300];
    document.getElementById('priceMin').value = 0;
    document.getElementById('priceMax').value = 300;
    onPrice();
    return;
  } else {
    state[key] = state[key].filter(function (v) { return v !== value; });
    document.querySelectorAll('.check input, .swatch').forEach(function (el) {
      var val = el.value || el.dataset.color;
      if (val === value) { el.checked = false; el.classList && el.classList.remove('active'); }
    });
  }
  render();
}

function clearAll() {
  state = { Category: [], Color: [], rating: null, price: [0, 300] };
  document.querySelectorAll('.check input, input[name="rating"]').forEach(function (i) { i.checked = false; });
  document.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('active'); });
  document.getElementById('priceMin').value = 0;
  document.getElementById('priceMax').value = 300;
  onPrice();
}

function render() {
  var chips = [];
  state.Category.forEach(function (v) { chips.push(['Category', v, v]); });
  state.Color.forEach(function (v) { chips.push(['Color', v, v]); });
  if (state.price[0] > 0 || state.price[1] < 300) chips.push(['price', null, '$' + state.price[0] + ' – $' + state.price[1]]);
  if (state.rating) chips.push(['rating', null, state.rating + '★ & up']);

  var box = document.getElementById('activeChips');
  box.innerHTML = chips.map(function (c) {
    return '<span class="chip">' + c[2] + '<button onclick="removeChip(\\'' + c[0] + '\\',\\'' + (c[1] || '') + '\\')" aria-label="Remove">×</button></span>';
  }).join('');

  document.getElementById('clearAll').classList.toggle('show', chips.length > 0);

  var active = state.Category.length + state.Color.length + (state.rating ? 1 : 0) + ((state.price[0] > 0 || state.price[1] < 300) ? 1 : 0);
  var remaining = Math.max(8, Math.round(TOTAL * Math.pow(0.72, active)));
  document.getElementById('resultCount').textContent = active ? remaining : TOTAL;
}

document.querySelectorAll('.stars').forEach(function (s) { s.style.setProperty('--n', s.dataset.n); });
onPrice();`,

  seo: {
    title: 'Faceted Filter Sidebar — HTML CSS JS Snippet',
    description: `Faceted filter sidebar — collapsible facets, dual-handle price range, swatches, rating filter, active chips & clear-all. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Faceted Filter Sidebar — Collapsible Facets, Dual Range Slider, Colour Swatches & Active-Filter Chips`,
      description: `Faceted search is the backbone of every catalogue, marketplace, and product listing page. When a shop has thousands of items, users do not scroll — they filter. A faceted filter sidebar lets shoppers narrow results by combining independent dimensions (category, price, colour, rating) and instantly see how many products match. This snippet implements the complete pattern in plain HTML, CSS, and vanilla JavaScript: collapsible facet groups, a dual-handle price range, clickable colour swatches, a star-rating filter, removable active-filter chips, and a clear-all action.

The single most important UX principle in faceted filtering is feedback: every selection must immediately update both the visible "active filters" summary and the result count. This snippet keeps a single \`state\` object as the source of truth and re-derives the whole UI from it in one \`render\` function — the same unidirectional-data-flow idea React popularised, written in vanilla JS.

**Collapsible facet groups**

Each facet is a \`.facet\` block with an \`.open\` class. The \`toggleFacet\` function toggles that class on click; the CSS animates \`max-height\` from its open value to \`0\` and rotates the caret \`svg\` 90 degrees. Using \`max-height\` (rather than \`height\`) lets the panel collapse with a transition even though its natural height is unknown. Long facet lists stay scannable because users can fold the groups they are not using.

**Dual-handle price range**

The price filter stacks two \`<input type="range">\` elements on the same track. Both have \`pointer-events: none\` so the track shows through, and only the thumbs re-enable pointer events via \`::-webkit-slider-thumb\`. The \`onPrice\` function reads both values, enforces a minimum gap so the handles cannot cross (\`min > max - 10\`), and sets the \`.range-fill\` element's \`left\` and \`right\` as percentages to paint the selected band. This is the standard two-thumb slider technique that avoids any library.

**Colour swatches and star rating**

Swatches are buttons whose colour comes from a \`--c\` CSS custom property, so one rule styles every chip. Clicking toggles an \`.active\` ring and adds or removes the colour from \`state.Color\`. The rating facet uses radio inputs and a pure-CSS star bar: \`.stars::before\` renders five glyphs and a \`linear-gradient\` clipped to text fills them to \`--n × 20%\`, giving partial-star precision without images.

**Active-filter chips and clear-all**

After every change, \`render\` rebuilds the chip row from \`state\`. Each chip carries a \`removeChip(key, value)\` handler that clears just that selection — unchecking the matching input or resetting the price — then re-renders. The Clear-all button only appears (\`.show\`) when at least one filter is active. The mock result count decays with each active facet so the count feels responsive; in production you would swap that for the length of your filtered dataset or an API response.

Pair this sidebar with a [product card](/ui-snippets/product-card/) grid, a [chip filter](/ui-snippets/chip-filter/) bar for quick toggles, or a [pagination table](/ui-snippets/pagination-table/) to page through matches.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sidebar appears with four facet groups — Category, Price, Colour, Rating — beside a results panel showing "260 products match".` },
      { title: 'Collapse a facet', text: `Click any group heading — the panel folds with a smooth max-height transition and the caret rotates. Click again to expand it.` },
      { title: 'Tick category boxes', text: `Check Sneakers and Boots — each adds a removable chip at the top of the sidebar and the result count drops.` },
      { title: 'Drag the price handles', text: `Move the two range thumbs — the purple fill band tracks between them and the dollar labels update. The handles cannot cross.` },
      { title: 'Pick colours and a rating', text: `Click colour swatches to ring them, then choose "4★ & up" — both appear as chips and the count recalculates.` },
      { title: 'Remove or clear filters', text: `Click the × on any chip to drop that filter, or hit "Clear all" (it only shows when filters are active) to reset everything.` },
    ] },
    features: [
      { title: 'Single-state render model', text: `One \`state\` object holds every selection; a single \`render\` function rebuilds chips, the clear-all button, and the result count — unidirectional flow in vanilla JS.` },
      { title: 'Collapsible facet groups', text: `\`toggleFacet\` toggles an \`.open\` class; CSS animates \`max-height\` to 0 and rotates the caret, so unknown-height panels still transition smoothly.` },
      { title: 'Dual-handle price range', text: `Two stacked range inputs with \`pointer-events\` only on the thumbs; \`onPrice\` enforces a minimum gap and paints the selected band via left/right percentages.` },
      { title: 'Custom-property colour swatches', text: `Each swatch reads its fill from a \`--c\` variable, so a single CSS rule styles every colour and the active ring uses a layered box-shadow.` },
      { title: 'Pure-CSS partial star rating', text: `\`.stars::before\` clips a \`linear-gradient\` to text at \`--n × 20%\` — fractional star fills with no SVG or image assets.` },
      { title: 'Removable active-filter chips', text: `\`render\` rebuilds the chip row from state; each chip's × calls \`removeChip(key, value)\` to clear exactly one selection and re-sync its input.` },
      { title: 'Conditional clear-all', text: `The Clear-all control fades in via a \`.show\` class only when one or more filters are active, then resets the entire state and all inputs.` },
      { title: 'Live result count', text: `The count decays per active facet so filtering feels instant; swap the formula for your filtered array length or a server count in production.` },
    ],
    useCases: [
      { title: 'E-commerce category pages', text: `The primary use case — narrow a shoe, apparel, or electronics catalogue by category, price, colour, and rating. Drop it beside a [product card](/ui-snippets/product-card/) grid.` },
      { title: 'Marketplace and listing search', text: `Property, car, and job marketplaces use faceted sidebars to combine many filter dimensions. Pair the sidebar with a [data table](/ui-snippets/data-table/) of results.` },
      { title: 'Documentation and content libraries', text: `Filter articles or components by tag, type, and difficulty. Combine with a [search box](/ui-snippets/search-box/) for free-text plus facet filtering.` },
      { title: 'Admin dashboards and reports', text: `Refine large record sets by status, owner, date, and rating before exporting. Works alongside a [pagination table](/ui-snippets/pagination-table/) for paged results.` },
      { title: 'Travel and booking sites', text: `Filter hotels or flights by price band, star rating, and amenity colour tags — the dual range slider maps directly to nightly-price filtering.` },
      { title: 'Mobile filter sheets', text: `On narrow screens the sidebar stacks above results; move it into a [bottom sheet](/ui-snippets/bottom-sheet/) triggered by a "Filters" button for mobile catalogues.` },
      { icon: 'CODE', title: 'Related: Interest Selector', desc: 'See the [Interest Selector](/ui-snippets/interest-selector/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect the filters to a real product list?', a: `In \`render\`, replace the mock count formula with a filter over your dataset: keep an array of products and run \`products.filter(p => state.Category.length === 0 || state.Category.includes(p.category))\` and similar checks for colour, price band, and rating. Render the matching items into the results panel and set the count to the filtered length.` },
      { q: 'How do I keep filters in the URL so they survive a refresh?', a: `On each \`render\`, serialise \`state\` into query params with \`URLSearchParams\` and call \`history.replaceState\`. On load, read the params back and pre-check the matching inputs before the first \`render\`. This makes filtered views shareable and bookmarkable — essential for SEO and paid traffic landing pages.` },
      { q: 'How do I add a search box inside a long facet?', a: `For facets with many options (brands, sizes), add an \`<input type="text">\` above the list and filter the visible \`.check\` rows on \`oninput\` by matching the label text. Hide non-matching rows with \`display:none\` so users can type to find an option instead of scrolling.` },
      { q: 'Is the dual range slider accessible?', a: `Add \`aria-label="Minimum price"\` and \`aria-label="Maximum price"\` to the two range inputs and \`aria-valuetext\` updated in \`onPrice\` so screen readers announce dollar amounts. Range inputs are keyboard-operable by default (arrow keys), and the minimum-gap guard prevents an invalid inverted range.` },
      { q: 'Can I use this faceted sidebar in React, Vue, or Angular?', a: `Yes. In React, move \`state\` into \`useState\` and render chips and counts from it directly — no manual \`render\` call needed. In Vue, make \`state\` reactive with \`ref\`/\`reactive\` and bind inputs with \`v-model\`. In Angular, hold state on the component and use \`(change)\`/\`(input)\` bindings. The dual-range CSS and star-bar trick port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the single state object by hand to trust it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the render function rebuilds the chip row, the clear-all visibility, and the result count from one shared state object, and why the dual price-range sliders enforce a minimum gap between their two values. The same assistant can help optimize it — ask whether the mock result-count decay formula should be replaced with an actual filtered-array length once real product data is wired in, and whether the render function's full innerHTML rebuild on every filter change would need to become more surgical for a sidebar with dozens of facets. It's also useful for extending the sidebar: ask it to persist the whole filter state into the URL's query string so filtered views are shareable, add a text search box inside a long facet list, or add a "results preview count" next to each individual checkbox showing how many items that option alone would match. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a faceted filter sidebar in plain HTML, CSS, and JavaScript with collapsible facet groups, a dual-handle price slider, color swatches, and removable filter chips — no library.

Requirements:
- A single shared state object holding the current selections for at least four facet types: a multi-select category list, a multi-select color list, a single price range (min and max), and a single-select star rating, with one render function that derives every piece of dependent UI (the active-filter chip row, a conditionally visible clear-all button, and a result count) from that one state object.
- Each facet group must be individually collapsible: clicking its header toggles an open class, and the CSS must animate the facet's body between its full height and zero height using a max-height transition combined with a rotating caret icon, not an instant display toggle.
- Implement the price range as two overlapping native range inputs on the same visual track, with pointer-events disabled on the inputs themselves and re-enabled only on their thumb via the browser-specific thumb pseudo-elements, and enforce a minimum gap so the two handles can never cross or overlap each other.
- Implement color selection as a row of round swatch buttons whose fill color comes from a single CSS custom property per swatch, with a distinct ringed "active" visual state applied via a class toggle, and a checkmark visible only on the active swatch.
- Implement a star rating filter using radio inputs paired with a pure-CSS partial-star display built from a repeated star glyph clipped by a linear-gradient tied to a CSS custom property, not five separate image or SVG elements.
- Every active selection across every facet type must appear as its own removable chip above the facet list; clicking a chip's remove control must clear only that specific selection, re-sync the corresponding form control (uncheck a checkbox, deactivate a swatch, or reset the range), and re-run the render function.
- Provide a single clear-all action that resets every facet back to its default state in one call, and make sure it is only visible at all while at least one filter is currently active.`,
    },
  },
};

export default facetedFilterSidebar;
