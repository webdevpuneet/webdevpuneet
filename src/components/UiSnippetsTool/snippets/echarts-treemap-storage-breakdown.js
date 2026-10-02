const echartsTreemapStorageBreakdown = {
  id: 'echarts-treemap-storage-breakdown',
  title: 'ECharts Treemap Storage Breakdown',
  lastmod: '2026-09-19',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/echarts@6.0.0/dist/echarts.min.js',
  ],
  html: `<div class="etm-wrap">
  <div class="etm-card">
    <div class="etm-head">
      <div>
        <div class="etm-title" id="etmTitle">Storage — All Files</div>
        <div class="etm-sub">Click a category to drill in, click the header to go back</div>
      </div>
      <button class="etm-back" id="etmBack" type="button" disabled>&larr; Back</button>
    </div>
    <div class="etm-chart" id="etmChart"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.etm-wrap{width:100%;max-width:640px}
.etm-card{background:#fff;border-radius:16px;padding:22px;box-shadow:0 1px 8px rgba(0,0,0,.07);border:1px solid #e2e8f0}
.etm-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px}
.etm-title{font-size:13px;font-weight:700;color:#0f172a}
.etm-sub{font-size:11.5px;color:#94a3b8;margin-top:3px}
.etm-back{background:#eef0ff;color:#6366f1;border:none;border-radius:8px;padding:6px 12px;font:700 12px system-ui,sans-serif;cursor:pointer;white-space:nowrap}
.etm-back:disabled{opacity:.4;cursor:default}
.etm-back:not(:disabled):hover{background:#e0e4ff}
.etm-chart{width:100%;height:340px}`,

  js: `var el = document.getElementById('etmChart');
var titleEl = document.getElementById('etmTitle');
var backBtn = document.getElementById('etmBack');
var chart = echarts.init(el);

// Each top-level node carries its own explicit itemStyle.color rather than
// relying on the treemap's implicit level-0 color list -- that list is
// assigned by post-sort index (treemap sorts by value descending by
// default), so an explicit color per node is what guarantees "Photos" is
// always indigo regardless of how the values happen to rank.
var data = [
  { name: 'Photos', value: 128, itemStyle: { color: '#6366f1' }, children: [
    { name: 'Camera Roll', value: 74 },
    { name: 'Screenshots', value: 31 },
    { name: 'Edited', value: 23 },
  ]},
  { name: 'Videos', value: 96, itemStyle: { color: '#f59e0b' }, children: [
    { name: 'Recordings', value: 58 },
    { name: 'Downloaded', value: 38 },
  ]},
  { name: 'Documents', value: 41, itemStyle: { color: '#16a34a' }, children: [
    { name: 'PDFs', value: 22 },
    { name: 'Spreadsheets', value: 12 },
    { name: 'Other', value: 7 },
  ]},
  { name: 'Apps', value: 63, itemStyle: { color: '#ec4899' }, children: [
    { name: 'Games', value: 40 },
    { name: 'Tools', value: 23 },
  ]},
  { name: 'System', value: 22, itemStyle: { color: '#94a3b8' } },
];

var option = {
  tooltip: {
    backgroundColor: '#0f172a',
    borderWidth: 0,
    textStyle: { color: '#fff', fontSize: 12 },
    formatter: function (p) { return '<b>' + p.name + '</b><br/>' + p.value + ' GB'; },
  },
  series: [{
    type: 'treemap',
    roam: false,
    nodeClick: 'zoomToNode',
    leafDepth: 1,
    breadcrumb: { show: false },
    label: {
      show: true,
      formatter: function (p) { return p.name + '\\n' + p.value + ' GB'; },
      color: '#fff',
      fontWeight: 700,
      fontSize: 12,
    },
    upperLabel: { show: false },
    itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2 },
    levels: [
      { itemStyle: { borderWidth: 0 } },
      { itemStyle: { borderColor: 'rgba(255,255,255,.6)' } },
    ],
    data: data,
  }],
};

chart.setOption(option);

chart.on('click', function (p) {
  if (p.data && p.data.children && p.data.children.length) {
    titleEl.textContent = 'Storage — ' + p.name;
    backBtn.disabled = false;
  }
});

backBtn.addEventListener('click', function () {
  chart.dispatchAction({ type: 'treemapRootToNode', targetNode: '' });
  titleEl.textContent = 'Storage — All Files';
  backBtn.disabled = true;
});

var ro = new ResizeObserver(function () { chart.resize(); });
ro.observe(el);`,

  seo: {
    title: 'ECharts Treemap Storage Breakdown — Free Drill-Down Snippet',
    description: `A clickable storage breakdown treemap built with Apache ECharts — box area encodes size, click any category to zoom into its subcategories. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ECharts Treemap Storage Breakdown — Area Encodes Size, Clicking Drills In',
      description: `A pie chart runs out of room past five or six slices. A bar chart can't show a category's internal breakdown without a second chart. A treemap solves both: every box's *area* is proportional to its value, nested categories render as boxes inside boxes, and clicking one zooms the whole chart into just that subtree — which is exactly how a storage-usage screen should work.

**leafDepth is what keeps the first view at the top level**

Without it, ECharts renders every leaf of a nested dataset at once — Camera Roll, Screenshots, Recordings, PDFs, and every other grandchild flattened into one crowded grid, with no visible "Photos" or "Videos" box to click. Setting \`leafDepth: 1\` on the series tells ECharts to treat whatever is one level below the *current root* as the leaves to render, so the initial view shows exactly the five top-level categories, and after zooming into "Photos" it shows exactly that category's three children — the same option re-applies relative to the new root automatically.

**nodeClick: 'zoomToNode' is the click interaction itself**

That option is what turns "Photos" into a clickable box that replaces the entire chart with its children filling the same space — no manual state management, no re-rendering a different dataset. ECharts tracks the "current root" of the treemap internally and re-lays-out from there, and \`leafDepth\` re-evaluates against whatever that new root is.

**Getting back out: dispatchAction, not setOption**

Reversing the zoom isn't done by calling \`setOption\` again — that would just re-render the same drilled-in view. Instead, \`chart.dispatchAction({ type: 'treemapRootToNode', targetNode: '' })\` is the documented action for resetting a treemap's root back to the top level, which is what the Back button calls.

**A click handler updates the surrounding UI**

The chart's own \`click\` event fires on every box click, and the handler checks whether the clicked node has \`children\` before updating the header title and enabling the Back button — clicking a leaf node (like "PDFs", which has no further breakdown) still triggers ECharts' own click event but shouldn't change the surrounding chrome, since there's nowhere further to drill.

**Two label layers, one hidden**

\`label\` styles the text inside whichever boxes are currently the smallest visible unit; \`upperLabel\` would style a *parent* box's label when its children are also visible (common in flattened multi-level treemaps) — turned off here (\`show: false\`) because \`nodeClick: 'zoomToNode'\` never shows two levels at once, so an upper label would never actually render and is disabled for clarity.

**Reusing it**

Swap the storage categories for any hierarchical size data — folder sizes, budget line items, org headcount by department — and the drill-down interaction, back button, and tooltip keep working unchanged since they only depend on the \`children\` structure being present or absent.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ECharts CDN', text: `Load echarts.min.js before the snippet's JS runs.` },
      { title: 'Paste HTML, CSS, and JS', text: `Five top-level storage categories render as sized boxes.` },
      { title: 'Click a box with children', text: `The chart zooms into its subcategories.` },
      { title: 'Read the updated header', text: `It names the category you drilled into.` },
      { title: 'Click Back', text: `The treemap resets to the top-level view.` },
      { title: 'Hover any box', text: `The tooltip shows its exact size in GB.` },
    ] },
    features: [
      { title: 'Area-proportional sizing', text: `Box area encodes value directly, no axis needed.` },
      { title: 'One level at a time', text: `leafDepth keeps each view to the current root's direct children.` },
      { title: 'Click-to-zoom drill-down', text: `nodeClick: zoomToNode handles the whole interaction.` },
      { title: 'Programmatic reset', text: `dispatchAction resets the root without re-rendering.` },
      { title: 'Synced header and button', text: `Chart click events drive the surrounding UI state.` },
      { title: 'Hierarchical data model', text: `Nested children arrays describe categories naturally.` },
      { title: 'Leaf-node awareness', text: `Clicking a childless box does not falsely enable Back.` },
      { title: 'Custom tooltip formatter', text: `Shows exact GB values, not raw treemap fractions.` },
      { title: 'Responsive canvas', text: `ResizeObserver keeps the treemap sized to its container.` },
    ],
    useCases: [
      { title: 'Storage and disk usage screens', text: 'Show photos, videos, documents and apps as boxes sized by the space they use, and let people click a category to see what is inside it.' },
      { title: 'Budget and cost breakdowns', text: 'Let departments drill down into line items. Box area encodes value directly, so large costs are obvious without reading an axis.' },
      { title: 'Headcount and org views', text: 'Go from company to department to team, with `leafDepth` keeping each view to the current root\'s direct children so the screen stays uncluttered.' },
      { title: 'Portfolio allocation dashboards', text: 'Drill from asset class down to individual holdings, with a back button that resets the root through `dispatchAction` instead of re-rendering the chart.' },
      { title: 'Learning ECharts treemaps', text: 'Study how `nodeClick: \'zoomToNode\'` handles the whole zoom interaction, and why a treemap beats pie and bar charts once categories nest.' },
      { icon: 'CODE', title: 'Related: ECharts Calendar Heatmap', desc: 'See the [ECharts Calendar Heatmap](/ui-snippets/echarts-calendar-heatmap/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the chart show only 5 boxes at first instead of every leaf?', a: `The series sets leafDepth: 1, which tells ECharts to render only the nodes one level below the current root as visible boxes — at the top level that means the 5 top-level categories, not their combined 11 grandchildren all flattened together. Without leafDepth, a treemap given multi-level data renders every leaf in the whole tree at once, which would show Camera Roll, Screenshots, Recordings and every other grandchild crowded into one view with no top-level category to click.` },
      { q: 'How does clicking a box zoom into its children?', a: `The series option nodeClick: 'zoomToNode' tells ECharts to handle box clicks itself: when a node with children is clicked, the chart replaces its current view with that node's children filling the same space, tracking the new "root" internally, and leafDepth: 1 re-evaluates against that new root so exactly one level is shown again. No manual re-rendering or data-swapping code is needed on your end for the zoom itself.` },
      { q: 'Why does the Back button call dispatchAction instead of setOption?', a: `Calling setOption again would just redraw the same option object, including whatever root the treemap is currently zoomed to — it does not reset the zoom state. dispatchAction({ type: 'treemapRootToNode', targetNode: '' }) is the specific documented action for resetting a treemap's internal root back to the top level, which setOption has no equivalent for.` },
      { q: 'How does the code know whether a clicked box has subcategories?', a: `The chart's own click event handler receives the clicked node's full data object, including its children array if one was defined in the original data. Checking p.data.children && p.data.children.length lets the handler distinguish a drillable category (update the header, enable Back) from a leaf node like a specific file type that has nothing further to show.` },
      { q: 'How do I use my own hierarchical data?', a: `Replace the data array with your own nodes, each an object with a name, a value, and optionally a children array of the same shape for any node with subcategories. Leaf nodes (no children) render as plain boxes; nodes with children become clickable drill-down targets automatically once nodeClick: 'zoomToNode' is set.` },
      { q: 'How do I use this treemap in React, Vue, or Angular?', a: `Initialize the chart once against a container ref/template ref, attach the click listener via chart.on('click', ...) in the same effect/lifecycle hook, and keep the current root name in component state to drive your header and button rather than reading it back from the chart. Dispose the instance on unmount and keep the ResizeObserver pattern for responsive sizing.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to build drill-down state management by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how nodeClick: 'zoomToNode' handles the zoom-in interaction internally versus how dispatchAction with treemapRootToNode resets it, and why setOption alone cannot undo a treemap's current zoom state. The same assistant can help optimize it — ask whether the click handler's check for p.data.children is the most robust way to distinguish drillable nodes from leaves, and whether the two-level levels array styling is necessary given the current data only nests one level deep. It's also useful for extending the effect: ask it to add a breadcrumb trail showing the full drill-down path instead of a single Back button, support for a third nesting level, or a search box that highlights matching boxes across all levels. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a clickable, drill-down treemap visualization (such as a device storage breakdown) using Apache ECharts (load echarts from a CDN, no other library), in plain HTML, CSS, and JavaScript.

Requirements:
- Model the data as a hierarchical list: top-level categories each with a name and a numeric value, where some categories additionally have a nested list of subcategory objects of the same shape (name and value).
- Render it as a treemap where each box's area is proportional to its value, colored by top-level category, with the category name and its value (with a unit label such as "GB") shown as text inside each box.
- Configure the treemap so that clicking a box which has subcategories zooms the entire chart into showing just that box's children filling the available space, using the library's built-in drill-down behavior rather than manually swapping out the chart's data.
- Show a header above the chart that displays which level is currently in view (e.g. "All Files" at the top level, or the clicked category's name after drilling in), and a Back button that is disabled at the top level and enabled after drilling into a category.
- Make the Back button reset the treemap to its top-level view using the library's dedicated action for resetting a treemap's zoom/root state (not by re-calling the option-setting method with the original data, which would not undo an internal zoom state).
- Ensure that clicking a box with no subcategories does not incorrectly enable the Back button or change the header, since there is nothing further to drill into.
- Show a tooltip on hover with the box's name and its exact value.
- Keep the chart instance responsive to its container being resized by calling the chart's resize method whenever the container's size changes.`,
    },
  },
};

export default echartsTreemapStorageBreakdown;
