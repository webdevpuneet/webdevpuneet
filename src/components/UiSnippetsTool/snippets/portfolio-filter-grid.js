const portfolioFilterGrid = {
  id: 'portfolio-filter-grid',
  title: 'Portfolio Filter Grid',
  lastmod: '2026-06-17',
  category: 'layouts',
  html: `<div class="pf">
  <div class="pf-tabs" id="pfTabs">
    <button class="pf-tab active" data-filter="all" onclick="filterItems(this)">All <span>9</span></button>
    <button class="pf-tab" data-filter="design" onclick="filterItems(this)">Design <span>3</span></button>
    <button class="pf-tab" data-filter="dev" onclick="filterItems(this)">Development <span>4</span></button>
    <button class="pf-tab" data-filter="photo" onclick="filterItems(this)">Photography <span>2</span></button>
  </div>

  <div class="pf-grid" id="pfGrid">
    <div class="pf-item in" data-cat="design" style="background:linear-gradient(140deg,#6366f1,#4338ca)"><span class="pf-emoji">🎨</span><div class="pf-meta"><div class="pf-name">Brand System</div><span class="pf-cat">Design</span></div></div>
    <div class="pf-item in" data-cat="dev" style="background:linear-gradient(140deg,#0ea5e9,#0369a1)"><span class="pf-emoji">💻</span><div class="pf-meta"><div class="pf-name">Dashboard App</div><span class="pf-cat">Development</span></div></div>
    <div class="pf-item in" data-cat="photo" style="background:linear-gradient(140deg,#f59e0b,#b45309)"><span class="pf-emoji">📷</span><div class="pf-meta"><div class="pf-name">Desert Series</div><span class="pf-cat">Photography</span></div></div>
    <div class="pf-item in" data-cat="dev" style="background:linear-gradient(140deg,#10b981,#047857)"><span class="pf-emoji">⚙️</span><div class="pf-meta"><div class="pf-name">API Platform</div><span class="pf-cat">Development</span></div></div>
    <div class="pf-item in" data-cat="design" style="background:linear-gradient(140deg,#ec4899,#9d174d)"><span class="pf-emoji">✏️</span><div class="pf-meta"><div class="pf-name">Icon Pack</div><span class="pf-cat">Design</span></div></div>
    <div class="pf-item in" data-cat="dev" style="background:linear-gradient(140deg,#8b5cf6,#6d28d9)"><span class="pf-emoji">📱</span><div class="pf-meta"><div class="pf-name">Mobile App</div><span class="pf-cat">Development</span></div></div>
    <div class="pf-item in" data-cat="photo" style="background:linear-gradient(140deg,#14b8a6,#0f766e)"><span class="pf-emoji">🌊</span><div class="pf-meta"><div class="pf-name">Coast Walk</div><span class="pf-cat">Photography</span></div></div>
    <div class="pf-item in" data-cat="design" style="background:linear-gradient(140deg,#f43f5e,#9f1239)"><span class="pf-emoji">🖼️</span><div class="pf-meta"><div class="pf-name">Landing Page</div><span class="pf-cat">Design</span></div></div>
    <div class="pf-item in" data-cat="dev" style="background:linear-gradient(140deg,#3b82f6,#1d4ed8)"><span class="pf-emoji">🧩</span><div class="pf-meta"><div class="pf-name">Component Lib</div><span class="pf-cat">Development</span></div></div>
  </div>
  <div class="pf-empty" id="pfEmpty">No projects in this category.</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.pf{width:100%;max-width:620px}

.pf-tabs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:20px}
.pf-tab{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #e2e8f0;border-radius:999px;padding:8px 15px;font-size:13px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:all .15s}
.pf-tab span{font-size:11px;color:#94a3b8;font-weight:700}
.pf-tab:hover{border-color:#cbd5e1}
.pf-tab.active{background:#6366f1;border-color:#6366f1;color:#fff}
.pf-tab.active span{color:rgba(255,255,255,.8)}

.pf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:560px){.pf-grid{grid-template-columns:repeat(2,1fr)}}
.pf-item{position:relative;aspect-ratio:1;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;box-shadow:0 8px 22px rgba(0,0,0,.18)}
.pf-item.hide{display:none}
.pf-item.in{animation:pf-in .4s cubic-bezier(.2,.7,.3,1) both}
@keyframes pf-in{from{opacity:0;transform:scale(.92) translateY(10px)}to{opacity:1;transform:none}}
.pf-emoji{position:absolute;top:14px;left:14px;font-size:30px;filter:drop-shadow(0 4px 8px rgba(0,0,0,.3))}
.pf-meta{position:relative;z-index:1}
.pf-item::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.5),transparent 55%)}
.pf-name{position:relative;z-index:1;font-size:14px;font-weight:800;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.4)}
.pf-cat{position:relative;z-index:1;font-size:11px;font-weight:600;color:rgba(255,255,255,.85)}

.pf-empty{display:none;text-align:center;color:#94a3b8;font-size:14px;padding:40px 0}
.pf-empty.show{display:block}`,

  js: `function filterItems(btn) {
  document.querySelectorAll('.pf-tab').forEach(function (t) { t.classList.remove('active'); });
  btn.classList.add('active');
  var f = btn.dataset.filter;
  var shown = 0;
  document.querySelectorAll('.pf-item').forEach(function (item) {
    var match = (f === 'all' || item.dataset.cat === f);
    item.classList.toggle('hide', !match);
    if (match) {
      item.style.animationDelay = (shown * 0.045) + 's';
      item.classList.remove('in');
      void item.offsetWidth;   // restart the entrance animation
      item.classList.add('in');
      shown++;
    }
  });
  document.getElementById('pfEmpty').classList.toggle('show', shown === 0);
}`,

  seo: {
    title: 'Portfolio Filter Grid — Isotope-Style HTML CSS JS',
    description: `Filterable portfolio grid with category tabs that show/hide items with a staggered scale-in animation, counts, and an empty state. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Portfolio Filter Grid — Category Tabs, Staggered Reveal & Per-Tab Counts`,
      description: `A filterable grid — the "Isotope" pattern — lets visitors narrow a portfolio, gallery, or catalogue by category with a single tap, and the items that match animate into place. It is a staple of portfolio sites, case-study pages, and project galleries. This snippet implements it in plain HTML, CSS, and vanilla JavaScript with a smooth, dependency-free reveal: category tabs with counts, a responsive grid, a staggered scale-in for matching items, and an empty state.

**Tag-based filtering**

Every grid item carries a \`data-cat\` attribute, and every tab a \`data-filter\`. \`filterItems\` moves the \`active\` class to the clicked tab, then loops the items: those whose category matches the filter (or the special \`all\`) stay visible, the rest get a \`.hide\` class that sets \`display: none\`. This is the simplest robust filtering model — no layout library, no DOM reordering, just a class toggle per item driven by data attributes.

**Staggered scale-in reveal**

Matching items don't just appear — they animate in. For each visible item, \`filterItems\` sets an \`animation-delay\` based on a running visible-count, then re-triggers a \`pf-in\` keyframe (opacity + scale + translate) using the remove-class / force-reflow / add-class trick. The result is a pleasing cascade where the filtered items pour into the grid left-to-right, every time you change tabs. Because the animation uses only \`transform\` and \`opacity\`, it runs on the compositor and exports cleanly to utility frameworks (which animate transforms but not layout).

**Why display:none over a FLIP reorder**

True Isotope animates items physically sliding to new positions (the FLIP technique), which is impressive but fragile and heavy. This snippet deliberately uses \`display: none\` for non-matching items and an entrance animation for matching ones — the matching items fade and scale in while the grid reflows instantly underneath. It is far simpler, has no edge cases, and reads as polished for the vast majority of portfolio use cases.

**Counts and empty state**

Each tab shows a count of items in that category, helping users gauge what's there before clicking. After filtering, \`filterItems\` reveals a "No projects in this category" message if nothing matched — a graceful end state instead of a blank grid. The grid itself is a responsive three-column layout that collapses to two on mobile, with square \`aspect-ratio\` tiles and a legibility gradient over each.

Swap the tiles for real project thumbnails and link them out. Pair this with an [image lightbox](/ui-snippets/image-lightbox/) for full views, a [masonry grid](/ui-snippets/masonry-grid/) for varied heights, or a [chip filter](/ui-snippets/chip-filter/) for multi-tag filtering.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A portfolio appears with category tabs (All, Design, Development, Photography) above a 3-column grid of nine project tiles.` },
      { title: 'Click a category', text: `Click "Design" — only design projects remain and they scale-in one after another in a staggered cascade.` },
      { title: 'Switch tabs', text: `Each tab change re-runs the entrance animation for the newly matching items, so filtering always feels alive.` },
      { title: 'Read the counts', text: `Each tab shows how many projects it contains, so visitors know what to expect before clicking.` },
      { title: 'Back to All', text: `Click "All" to bring every project back, again with the staggered reveal.` },
      { title: 'Swap in real work', text: `Replace each tile's gradient and emoji with a project thumbnail and set its \`data-cat\`; the filtering needs no changes.` },
    ] },
    features: [
      { title: 'Data-attribute filtering', text: `Items declare \`data-cat\` and tabs \`data-filter\`; \`filterItems\` shows matches and hides the rest with a class — no library.` },
      { title: 'Staggered scale-in', text: `Each visible item gets an incremental \`animation-delay\` and a re-triggered \`pf-in\` keyframe, so matches cascade into the grid.` },
      { title: 'Reflow-restarted animation', text: `The remove-class / read \`offsetWidth\` / add-class trick replays the entrance on every filter change.` },
      { title: 'Compositor-friendly motion', text: `The reveal animates only \`transform\` and \`opacity\`, so it stays smooth and survives the Tailwind/React export.` },
      { title: 'Per-tab counts', text: `Tabs display the number of items in each category, setting expectations before a click.` },
      { title: 'Active tab state', text: `The selected tab highlights in the accent colour, a clear indication of the current filter.` },
      { title: 'Empty state', text: `If a filter matches nothing, a friendly message replaces the blank grid.` },
      { title: 'Responsive grid', text: `A 3-column grid of square \`aspect-ratio\` tiles collapses to 2 columns on mobile, with a legibility gradient per tile.` },
    ],
    useCases: [
      { title: 'Portfolio and case-study galleries', text: `The classic use — filter projects by discipline. Pair with an [image lightbox](/ui-snippets/image-lightbox/) for full-size views.` },
      { title: 'Product and shop catalogues', text: `Filter products by type from a grid; for multi-tag filtering combine with a [chip filter](/ui-snippets/chip-filter/) or [faceted filter sidebar](/ui-snippets/faceted-filter-sidebar/).` },
      { title: 'Photo and media galleries', text: `Group shots by album or subject; works alongside a [masonry grid](/ui-snippets/masonry-grid/) for varied aspect ratios.` },
      { title: 'Blog and resource libraries', text: `Filter articles or downloads by topic, with counts showing how much each category holds.` },
      { title: 'Team and directory pages', text: `Filter people by department or role; reuse the tabs + grid with a [team card](/ui-snippets/team-card/) layout.` },
      { title: 'Component / template showcases', text: `Filter UI examples by type — the same pattern this very snippet library could use to browse categories.` },
      { icon: 'CODE', title: 'Related: Smart TV Mockup', desc: 'See the [Smart TV Mockup](/ui-snippets/tv-mockup/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add more categories or items?', a: `Add a tab with a \`data-filter\` value and grid items with the matching \`data-cat\`. \`filterItems\` works generically off those attributes, so no code changes are needed. Update each tab's count span (or compute counts in JS on load by counting items per \`data-cat\`).` },
      { q: 'How do I support filtering by multiple tags at once?', a: `Give items a space-separated \`data-cat\` (e.g. "design web") and change the match test to check whether the item's tag list includes the active filter. For multi-select filtering (show items matching ANY selected tag), track a set of active filters and show an item if its tags intersect that set — pair it with a [chip filter](/ui-snippets/chip-filter/) UI.` },
      { q: 'Why not animate items sliding to new positions (true Isotope)?', a: `Position-shuffle animations use the FLIP technique (measure first/last positions, animate the delta), which is impressive but adds significant complexity and edge cases, especially with responsive grids. Using \`display: none\` for non-matches plus an entrance animation for matches is far simpler, robust, and looks polished — the right trade-off for most portfolios.` },
      { q: 'Is the filter grid accessible?', a: `Use real \`<button>\` tabs (this snippet does) so they are keyboard-operable, and add \`aria-pressed\` to reflect the active filter. Consider grouping the tabs with \`role="group"\` and an accessible label, and announcing the result count via an \`aria-live\` region so screen-reader users hear "Showing 3 design projects" after filtering.` },
      { q: 'How do I use this filter grid in React, Vue, or Angular?', a: `In React, hold the active filter in \`useState\` and derive the visible items by filtering the array in render — no class toggling; use a CSS animation keyed on the filter (or a \`key\` change) to replay the entrance. In Vue, use a \`computed\` filtered list with \`<transition-group>\` for animation. In Angular, an \`*ngFor\` over a filtered array with \`@animations\`. The keyframe and grid CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the reflow trick or the staggering formula by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why filterItems removes and re-adds the "in" class with a forced offsetWidth read in between, and how the shown counter multiplied by a fixed increment produces the animation-delay that makes matching items cascade in left to right. The same assistant can help optimize it, for example checking whether display none is really the best way to hide non-matching items versus a FLIP-based reposition animation, or whether the staggering delay should scale down automatically for filters with many more matching items. It's also useful for extending the effect: ask it to support filtering by multiple simultaneous tags instead of one category at a time, add a search input that filters by item name alongside the category tabs, or animate the tab's active-state pill sliding between tabs instead of an instant class swap. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a filterable portfolio grid (the "Isotope" pattern) in plain HTML, CSS, and vanilla JavaScript, with no masonry or filtering library.

Requirements:
- A row of category tab buttons, each carrying a data-filter value (including a special "all" value), and a grid of item tiles, each carrying a data-cat value naming its category.
- Clicking a tab must move an active-state class to that tab and, for every grid item, decide whether it matches the new filter (either the item's category equals the tab's filter, or the filter is "all"); non-matching items must be hidden via a CSS class that sets display: none, and matching items must remain visible.
- Every time matching items are revealed by a filter change, they must replay a scale-and-fade entrance animation from scratch — even if that same item was already visible before the filter changed — using the standard technique of removing the animation class, forcing a synchronous reflow by reading the element's offsetWidth, then re-adding the animation class so the browser doesn't skip an animation it considers already-played.
- Stagger the entrance animation so matching items cascade in left-to-right rather than popping in simultaneously, by assigning each visible item an increasing CSS animation-delay based on a running count of how many items have been shown so far in that render pass.
- If a filter matches zero items, reveal a distinct "no items" empty-state message in place of the grid; hide that message again as soon as a filter matches at least one item.
- Keep the animation limited to transform and opacity properties only (no animating layout properties like width, height, or top/left) so it stays smooth and compositor-friendly.`,
    },
  },
};

export default portfolioFilterGrid;
