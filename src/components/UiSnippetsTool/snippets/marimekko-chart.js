const marimekkoChart = {
  id: 'marimekko-chart',
  title: 'Marimekko (Mekko) Chart — Proportional Stacked Segments',
  lastmod: '2026-08-27',
  category: 'charts',
  html: `<div class="demo">
  <div class="chart-card">
    <div class="chart-head">
      <h3>Revenue by Region &amp; Product Line</h3>
      <p>Column width = region's share of total revenue · segment height = product mix within region</p>
    </div>
    <div class="mekko" id="mekko"></div>
    <div class="legend" id="legend"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.chart-card { width: 520px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
.chart-head h3 { font-size: 14.5px; font-weight: 800; color: #111827; margin-bottom: 3px; }
.chart-head p { font-size: 11px; color: #94a3b8; margin-bottom: 18px; }

.mekko { display: flex; align-items: flex-end; gap: 2px; height: 220px; }
.mekko-col { display: flex; flex-direction: column-reverse; height: 100%; position: relative; }
.mekko-seg { width: 100%; position: relative; transition: opacity 0.15s; cursor: pointer; }
.mekko-seg:hover { opacity: 0.82; }
.mekko-seg:first-child { border-radius: 0 0 4px 4px; }
.mekko-label { position: absolute; left: 50%; bottom: -20px; transform: translateX(-50%); font-size: 10px; font-weight: 700; color: #64748b; white-space: nowrap; }
.mekko-pct { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 9.5px; font-weight: 800; color: #fff; opacity: 0; transition: opacity 0.15s; pointer-events: none; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
.mekko-seg:hover .mekko-pct { opacity: 1; }

.legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #475569; }
.legend-dot { width: 9px; height: 9px; border-radius: 3px; }`,
  js: `const regions = [
  { name: 'NA', total: 42, segs: [ { label: 'Platform', val: 55, color: '#6366f1' }, { label: 'Services', val: 30, color: '#a5b4fc' }, { label: 'Add-ons', val: 15, color: '#e0e7ff' } ] },
  { name: 'EMEA', total: 27, segs: [ { label: 'Platform', val: 48, color: '#6366f1' }, { label: 'Services', val: 37, color: '#a5b4fc' }, { label: 'Add-ons', val: 15, color: '#e0e7ff' } ] },
  { name: 'APAC', total: 19, segs: [ { label: 'Platform', val: 62, color: '#6366f1' }, { label: 'Services', val: 22, color: '#a5b4fc' }, { label: 'Add-ons', val: 16, color: '#e0e7ff' } ] },
  { name: 'LATAM', total: 12, segs: [ { label: 'Platform', val: 40, color: '#6366f1' }, { label: 'Services', val: 35, color: '#a5b4fc' }, { label: 'Add-ons', val: 25, color: '#e0e7ff' } ] },
];

const mekko = document.getElementById('mekko');
const legend = document.getElementById('legend');
const totalRevenue = regions.reduce((sum, r) => sum + r.total, 0);

regions.forEach((region) => {
  const col = document.createElement('div');
  col.className = 'mekko-col';
  const widthPct = (region.total / totalRevenue) * 100;
  col.style.width = widthPct + '%';

  region.segs.forEach((seg) => {
    const segEl = document.createElement('div');
    segEl.className = 'mekko-seg';
    segEl.style.height = seg.val + '%';
    segEl.style.background = seg.color;
    segEl.title = \`\${region.name} · \${seg.label}: \${seg.val}% of region (region is \${widthPct.toFixed(0)}% of total revenue)\`;
    const pct = document.createElement('span');
    pct.className = 'mekko-pct';
    pct.textContent = seg.val + '%';
    segEl.appendChild(pct);
    col.appendChild(segEl);
  });

  const label = document.createElement('span');
  label.className = 'mekko-label';
  label.textContent = \`\${region.name} \${widthPct.toFixed(0)}%\`;
  col.appendChild(label);

  mekko.appendChild(col);
});

const productNames = regions[0].segs.map((s) => ({ label: s.label, color: s.color }));
legend.innerHTML = productNames
  .map((p) => \`<span class="legend-item"><span class="legend-dot" style="background:\${p.color}"></span>\${p.label}</span>\`)
  .join('');`,
  seo: {
    title: 'Marimekko Chart (Mekko Chart) — Two-Dimensional Proportional Stacked Bars',
    description: 'A Marimekko/mekko chart built with vanilla CSS and JS, encoding two variables at once: column width for a category\'s share of total, and stacked segment height for its internal mix.',
    about: {
      title: 'Marimekko (Mekko) Chart — Encoding Two Ratios in One Chart',
      description: `A regular stacked bar chart can show a mix within each category, but every bar is the same width — so it can't also show how big each category is relative to the others. A Marimekko chart (also called a mekko or mosaic chart) solves that by making **both dimensions meaningful**: column *width* encodes a category's share of the overall total, while the stacked *segments within* each column encode that category's internal composition, as percentages that always sum to 100% regardless of the column's width.

**Why the two axes can't be computed the same way**

Column widths are computed once, across the whole dataset: \`widthPct = (region.total / totalRevenue) * 100\`, so all four column widths sum to 100% together. But each individual segment's height is computed *within its own column only* — every region's three segments (Platform/Services/Add-ons) independently sum to 100% of that region's height, even though the regions themselves have wildly different totals. This is the core Marimekko idea: area actually represents the product of the two proportions (a big region's big segment is a large rectangle; a small region's big segment is still visually small, because the column itself is narrow) — letting a reader compare both "how big is this region" and "what's its mix" from the same figure.

**Building it without an SVG or canvas library**

Each column is a flex item whose \`width\` is set directly to its percentage share via inline style, inside a flex container (\`.mekko\`) with no gaps forcing exact widths. Each segment inside a column is a flex child (in a \`column-reverse\` flex column, so segments stack bottom-up in DOM order) sized with \`height: \${val}%\` relative to its parent column's own height — two independent percentage systems nested inside each other, both handled by ordinary flexbox without any manual pixel math.

**Hover reveals exact numbers without cluttering the base view**

Every segment shows a percentage-of-region label only on \`:hover\`, and carries a full \`title\` tooltip breaking down both the segment's within-region percentage and the region's own share of the grand total — keeping the chart's resting visual state clean while still making the underlying numbers available on demand.

**Where Marimekko charts genuinely earn their complexity**

This chart type is more cognitively demanding to read than a simple bar or pie chart, so it's best reserved for exactly the situation it was built for: comparing both the *size* and the *composition* of several categories at once — market share broken down by product mix, budget allocation broken down by department, or (as in this snippet) revenue by region broken down by product line — rather than using it as a default replacement for a simpler chart.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Edit the regions array', text: 'Each region needs a name, a total (used to compute column width) and a segs array of {label, val, color} that must sum to 100.' },
        { title: 'Keep segment percentages summing to 100 per region', text: 'Column widths are computed automatically from totals, but each region\'s own segment values are not auto-normalized — ensure they sum to 100 yourself.' },
        { title: 'Reorder segments consistently across regions', text: 'Keep the same segment order (e.g. Platform, Services, Add-ons) in every region\'s segs array so the stacking and legend stay visually aligned.' },
        { title: 'Adjust the legend automatically', text: 'The legend is generated from the first region\'s segment labels and colors — just keep label/color pairs consistent across all regions.' },
        { title: 'Hover any segment for exact figures', text: 'Each segment\'s title tooltip shows both its within-region percentage and its region\'s share of the overall total.' },
      ],
    },
    features: [
      'True two-dimensional encoding — column width for share-of-total, segment height for within-category mix',
      'Pure flexbox layout with two independent nested percentage systems, no manual pixel math',
      'Hover reveals an in-chart percentage label plus a full contextual tooltip with both ratios',
      'Auto-generated legend derived directly from the first category\'s segment definitions',
      'Column widths computed automatically from raw totals — no need to pre-normalize percentages yourself',
      'Rounded bottom corners on the base segment of each column for a polished stacked-bar look',
      'Zero dependencies — no charting library, canvas, or SVG required',
      'Scales to any number of columns and any number of stacked segments per column',
    ],
    useCases: [
      { icon: 'FIN', title: 'Market Share by Segment', desc: 'Show which competitors dominate a market (column width) and their product mix within it (segment height) at once.' },
      { icon: 'BIZ', title: 'Revenue by Region and Product Line', desc: 'The exact use case in this demo — compare regional revenue scale alongside each region\'s product composition.' },
      { icon: 'DASH', title: 'Budget Allocation by Department', desc: 'Column width for each department\'s total budget, segments for how that budget splits across categories.' },
      { icon: 'DATA', title: 'Portfolio Composition Analysis', desc: 'Compare asset classes\' relative size and their internal allocation breakdown in one figure.' },
      { icon: 'CODE', title: 'Related: Seller Rating Breakdown', desc: 'See the [Seller Rating Breakdown](/ui-snippets/seller-rating-breakdown/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between a Marimekko chart and a regular stacked bar chart?', a: 'A regular stacked bar chart uses equal-width bars, so it can only show composition, not relative size between categories. A Marimekko chart varies both the width (representing each category\'s share of an overall total) and the segment heights within each bar (representing that category\'s own internal mix), encoding two ratios in a single chart.' },
      { q: 'Do the segment percentages need to sum to 100 within each column?', a: 'Yes — each region\'s own segs array should sum to 100, since segment heights are computed as a percentage of that specific column\'s height, independent of the column\'s width or the other columns\' segment values.' },
      { q: 'How is column width calculated?', a: 'Each region\'s total is divided by the sum of all regions\' totals: widthPct = (region.total / totalRevenue) * 100. This is done once across the whole dataset so all column widths sum to 100% of the chart\'s width together.' },
      { q: 'Why use flexbox instead of SVG for this chart?', a: 'Flexbox with percentage-based width and height styles handles both nested percentage systems (column width relative to the whole, segment height relative to its column) natively, without needing to calculate absolute pixel coordinates the way an SVG-based implementation would require.' },
      { q: 'Can I add more than three segments per column?', a: 'Yes — the segs array for any region can contain as many {label, val, color} objects as needed; just make sure their val values still sum to 100 for that region.' },
      { q: 'Is this chart type accessible to screen readers?', a: 'The demo relies on hover tooltips (title attributes) for exact figures, which are not reliably announced by screen readers. For a fully accessible version, pair the chart with an adjacent data table or add appropriate aria-label text summarizing each segment\'s values.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain precisely why a Marimekko chart's segment area represents the product of two independent proportions, and to walk through a worked example comparing a large region's small segment against a small region's large segment to build real intuition for reading the chart correctly. It's also worth asking for an accessible data-table fallback rendered alongside the chart, or a version with click-to-drill-down that re-renders the mekko one level deeper into a category's own sub-breakdown.`,
      prompt: `Build a Marimekko (mekko) chart in HTML, CSS and vanilla JavaScript — no charting library, no SVG, no canvas.

Requirements:
- Accept a dataset of categories, each with a total value (used to compute that category's column width as a percentage of the sum of all totals) and a list of named segments with percentage values that sum to 100 within that category (used to compute stacked segment heights within that specific column).
- Render each category as a flex column whose width is set to its computed percentage of the overall total, and render its segments as stacked flex children whose heights are set to their percentage of that column's own height — using plain CSS percentage widths/heights, not fixed pixel calculations.
- On hovering any segment, reveal an in-chart percentage label for that segment and show a tooltip (or equivalent) stating both the segment's percentage within its category and that category's percentage share of the overall total.
- Auto-generate a color-coded legend from the segment labels and colors defined on the first category, assuming segment order and colors are consistent across all categories.
- Label each column beneath it with the category name and its computed percentage share of the total.
- Keep the whole implementation dependency-free and able to accept any number of categories and any number of segments per category.`,
    },
  },
};

export default marimekkoChart;
