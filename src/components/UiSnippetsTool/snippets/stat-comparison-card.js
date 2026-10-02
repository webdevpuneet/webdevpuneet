const statComparisonCard = {
  id: 'stat-comparison-card',
  title: 'Stat Comparison Card',
  lastmod: '2026-06-22',
  category: 'dashboards',
  html: `<div class="scc-grid" id="sccGrid"></div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.scc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px;max-width:720px;width:100%}

.scc-card{background:#fff;border-radius:14px;padding:18px;box-shadow:0 8px 24px rgba(15,23,42,.06)}
.scc-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.scc-label{font-size:12.5px;font-weight:700;color:#64748b}
.scc-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px}
.scc-ico.indigo{background:#eef2ff}.scc-ico.green{background:#f0fdf4}.scc-ico.amber{background:#fffbeb}.scc-ico.pink{background:#fdf2f8}

.scc-value{font-size:27px;font-weight:800;color:#0f172a;letter-spacing:-.5px;font-variant-numeric:tabular-nums;line-height:1}
.scc-meta{display:flex;align-items:center;gap:7px;margin-top:10px}
.scc-delta{display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:800;padding:2px 7px;border-radius:999px}
.scc-delta.up{background:#dcfce7;color:#15803d}
.scc-delta.down{background:#fee2e2;color:#b91c1c}
.scc-delta.flat{background:#f1f5f9;color:#64748b}
.scc-delta svg{width:12px;height:12px}
.scc-vs{font-size:11.5px;color:#94a3b8}

/* Tiny inline sparkline */
.scc-spark{margin-top:12px;height:34px;width:100%}
.scc-spark path.line{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.scc-spark path.area{opacity:.12}`,

  js: `var STATS = [
  { label: 'Revenue',     value: 48200, prev: 41800, fmt: 'usd', icon: '💰', tone: 'indigo', spark: [30,32,31,35,34,38,41,40,44,48] },
  { label: 'New users',   value: 1284,  prev: 1390,  fmt: 'num', icon: '👥', tone: 'green',  spark: [22,21,20,19,18,17,16,15,14,13] },
  { label: 'Conversion',  value: 3.8,   prev: 3.2,   fmt: 'pct', icon: '🎯', tone: 'amber',  spark: [3.0,3.1,3.0,3.3,3.4,3.5,3.6,3.5,3.7,3.8] },
  { label: 'Avg. session',value: 264,   prev: 264,   fmt: 'sec', icon: '⏱️', tone: 'pink',   spark: [260,262,261,265,263,264,266,263,265,264] },
];
var COLOR = { up: '#22c55e', down: '#ef4444', flat: '#94a3b8' };

function fmtValue(v, type) {
  if (type === 'usd') return '$' + Math.round(v).toLocaleString();
  if (type === 'pct') return v.toFixed(1) + '%';
  if (type === 'sec') { var m = Math.floor(v / 60), s = v % 60; return m + 'm ' + (s < 10 ? '0' : '') + s + 's'; }
  return Math.round(v).toLocaleString();
}

function sparkPath(data, w, h) {
  var min = Math.min.apply(null, data), max = Math.max.apply(null, data);
  var range = max - min || 1;
  var step = w / (data.length - 1);
  var pts = data.map(function (d, i) { return [i * step, h - ((d - min) / range) * (h - 4) - 2]; });
  var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  var area = line + ' L' + w + ' ' + h + ' L0 ' + h + ' Z';
  return { line: line, area: area };
}

function render() {
  document.getElementById('sccGrid').innerHTML = STATS.map(function (s) {
    var diff = s.value - s.prev;
    var pct = s.prev === 0 ? 0 : (diff / s.prev) * 100;
    var dir = Math.abs(pct) < 0.05 ? 'flat' : pct > 0 ? 'up' : 'down';
    var arrow = dir === 'up' ? '<polyline points="18 15 12 9 6 15"/>' : dir === 'down' ? '<polyline points="6 9 12 15 18 9"/>' : '<line x1="6" y1="12" x2="18" y2="12"/>';
    var sp = sparkPath(s.spark, 100, 34);
    var stroke = COLOR[dir];
    return '<div class="scc-card">' +
      '<div class="scc-top"><span class="scc-label">' + s.label + '</span><span class="scc-ico ' + s.tone + '">' + s.icon + '</span></div>' +
      '<div class="scc-value">' + fmtValue(s.value, s.fmt) + '</div>' +
      '<div class="scc-meta">' +
        '<span class="scc-delta ' + dir + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + arrow + '</svg>' + Math.abs(pct).toFixed(1) + '%</span>' +
        '<span class="scc-vs">vs last month</span>' +
      '</div>' +
      '<svg class="scc-spark" viewBox="0 0 100 34" preserveAspectRatio="none">' +
        '<path class="area" d="' + sp.area + '" fill="' + stroke + '"/>' +
        '<path class="line" d="' + sp.line + '" stroke="' + stroke + '"/>' +
      '</svg>' +
    '</div>';
  }).join('');
}

render();`,

  seo: {
    title: 'Stat Comparison Card — KPI Trend Card HTML CSS JS',
    description: `Dashboard KPI cards showing a value, percent change vs the previous period with a colored trend arrow, and an inline sparkline. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Stat Comparison Card — KPI Value with Period-Over-Period Change & Sparkline',
      description: `Every analytics dashboard opens with a row of KPI cards, and a good one never shows a number in isolation — it shows the value, how it compares to last period, and the recent trend, so a glance answers "is this good and which way is it heading?" This snippet builds those stat comparison cards in plain HTML, CSS, and vanilla JavaScript: a big value, a color-coded percent-change pill with a direction arrow, a "vs last month" reference, and an inline SVG sparkline — all generated from data.

**A number with context, not in a vacuum**

Each card pairs the headline value with a delta computed against the previous period (\`(value − prev) / prev × 100\`). The delta renders as a pill — green with an up arrow for an increase, red with a down arrow for a decrease, gray with a flat line when essentially unchanged — plus the "vs last month" label so the comparison is explicit. This is the difference between "Revenue: $48,200" (which means nothing alone) and "$48,200, ▲15.3% vs last month" (which is a decision-ready insight).

**Direction-aware, not just positive/negative**

The card classifies the change into up, down, or *flat* — a change under a small threshold (0.05%) reads as "no real change" rather than a misleadingly precise "▲0.0%". This matters for metrics that hover (like average session time in the demo, which is unchanged): forcing every metric into up-or-down would imply movement that isn't there. And critically, color follows direction, not value — for a metric where down is good (like churn), you'd flip the tone, since "green = good" depends on the metric.

**Smart per-metric formatting**

Different KPIs need different formats, so \`fmtValue()\` handles currency ($48,200 with thousands separators), counts (1,284), percentages (3.8%), and durations (4m 24s) from a \`fmt\` flag on each stat. The value, the delta, and the sparkline all derive from the same data object, so a card is fully described by its data — adding a new KPI is one array entry, not new markup.

**An inline sparkline built from a path**

The mini trend chart is a tiny inline SVG. \`sparkPath()\` normalizes the data series to the chart's height (scaling between the series min and max so the shape fills the space), builds an \`M…L…\` line path, and closes it into a filled area below. The sparkline's color matches the trend direction, reinforcing the up/down signal visually — a falling metric gets a red line, a rising one green. It's drawn with \`preserveAspectRatio="none"\` so it stretches to the card width responsively, and at this size a sparkline conveys "the shape of recent history" far better than any axis-laden chart.

**Responsive grid, drop-in ready**

The cards sit in an auto-fit grid that reflows from four across down to one on narrow screens. Because everything is data-driven and self-contained, you populate \`STATS\` from your analytics API (current value, previous-period value, and a short series for the sparkline) and the whole row renders — values formatted, deltas computed, trends colored, sparklines drawn. The FAQs cover wiring real data and handling metrics where down is the good direction.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A responsive row of KPI cards renders — revenue, users, conversion, and session time — each with a value, change, and sparkline.` },
      { title: 'Read the deltas', text: `Each card shows a colored pill: green ▲ for up, red ▼ for down, gray for essentially unchanged, vs last month.` },
      { title: 'Note the sparkline', text: `The mini trend line under each value matches the change color, showing the recent shape at a glance.` },
      { title: 'Check the formatting', text: `Values format per metric — currency, counts, percentages, and durations — from the fmt flag.` },
      { title: 'Edit the stats', text: `Change the STATS array (value, prev, fmt, icon, tone, spark) to your KPIs — cards regenerate.` },
      { title: 'Connect real analytics', text: `Populate STATS from your analytics API with the current value, previous-period value, and a sparkline series.` },
    ] },
    features: [
      { title: 'Period-over-period delta', text: `Each card computes percent change against the previous period and shows it as a color-coded pill with a direction arrow.` },
      { title: 'Up / down / flat classification', text: `Near-zero changes read as "flat" rather than a misleading precise arrow, so unchanged metrics look unchanged.` },
      { title: 'Direction-driven color', text: `Color follows the change direction (not the value), and is easy to flip for metrics where down is good.` },
      { title: 'Per-metric formatting', text: `fmtValue() renders currency, counts, percentages, and durations from a single fmt flag.` },
      { title: 'Inline SVG sparkline', text: `A data-normalized path draws a mini trend line and filled area, colored to match the trend.` },
      { title: 'Fully data-driven', text: `Value, delta, and sparkline all derive from one stat object — adding a KPI is one array entry.` },
      { title: 'Responsive auto-fit grid', text: `Cards reflow from four across to one column on small screens automatically.` },
      { title: 'Tabular-aligned numbers', text: `Values use tabular-nums so digits line up cleanly across cards.` },
    ],
    useCases: [
      { title: 'Analytics KPI summary rows', text: 'Top a dashboard with cards showing value, percent change versus the previous period and an inline trend line, answering is this good at a glance.' },
      { title: 'Revenue and sales overviews', text: 'Show revenue, orders and conversion rate side by side, with near-zero changes classed as flat rather than a misleading tiny arrow.' },
      { title: 'Marketing performance reports', text: 'Display traffic, leads and cost per acquisition, where colour follows the direction of the change and can be inverted for metrics where down is good.' },
      { title: 'Wider card grids', text: 'Place several cards inside a [metric card grid](/ui-snippets/metric-card-grid/) and expand any tiny trend into a full [sparkline chart](/ui-snippets/sparkline-chart/).' },
      { title: 'SaaS health boards', text: 'Surface uptime, latency and ticket volume together, with `fmtValue()` handling currency, counts, percentages and durations in one consistent way.' },
    ],
    faqs: [
      { q: 'How do I connect this to real analytics data?', a: `Populate the STATS array from your analytics API: each entry needs the current value, the previous-period value (prev) for the delta, a fmt flag for formatting, and a short numeric series (spark) for the sparkline. Fetch those on load (and on refresh), assign to STATS, and call render() — every card's value, delta, and trend recompute from the data.` },
      { q: 'How do I handle metrics where a decrease is good?', a: `For metrics like churn, bounce rate, or error count, "down" is positive, so invert the color logic for those cards — add an inverted flag to the stat and, when set, map a negative change to the green/up tone and a positive change to red/down. The percent and arrow stay the same; only the color tone flips to reflect that lower is better.` },
      { q: 'Why classify near-zero changes as "flat"?', a: `A metric that barely moved shouldn't display a precise "▲0.0%" with an up arrow, which implies meaningful growth. Treating changes below a small threshold as flat (gray, with a neutral line) honestly communicates "no real change," which is more useful than forcing every metric into up or down. Adjust the threshold to your tolerance.` },
      { q: 'How is the sparkline drawn from the data?', a: `sparkPath() finds the series min and max, normalizes each point to the chart height (so the line fills the vertical space regardless of the values' scale), and builds an SVG path with M/L commands, then closes a filled area below it. preserveAspectRatio="none" stretches it to the card width. Pass any-length series; the path adapts to the number of points.` },
      { q: 'How do I use these stat cards in React, Vue, or Angular?', a: `In React, hold the stats in useState and compute each delta and sparkline path with useMemo, rendering cards with .map(); in Vue, use a computed over a reactive stats array; in Angular, use *ngFor with getters or pipes. The delta, formatting, and sparkline functions are plain JavaScript that port unchanged — only the per-data re-render moves into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the delta classification and sparkline normalization by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why changes under the 0.05 percent threshold are classified as flat rather than a misleadingly precise up or down arrow, or how sparkPath normalizes an arbitrary-length data series to a fixed chart height using its own min and max rather than a hardcoded scale. The same assistant can help optimize it, for example checking whether fmtValue's if-chain of format types would benefit from a lookup object as more formats (like compact-K notation) get added. It's also useful for extending the feature: ask it to add an inverted flag so metrics like churn treat a decrease as the good direction, animate the delta pill's percentage counting up on render, or add a click handler that expands a card into a full time-series chart. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a row of KPI comparison cards with sparklines in plain HTML, CSS, and JavaScript, no charting library.

Requirements:
- Render every card from a single array of stat objects, each with a label, an icon, a current value, a previous-period value, a format type flag, and a short numeric array for the sparkline — no hardcoded per-card markup.
- Write one formatting function that renders a value differently depending on its format flag: as currency with thousands separators, as a plain count with thousands separators, as a percentage with one decimal place, and as a minutes-and-seconds duration — selectable purely by the flag, not by special-casing each card in the render loop.
- Compute each card's percent change from current versus previous value, and classify it into exactly three states — up, down, or flat — where "flat" applies whenever the absolute percent change falls under a small threshold (not just when it's exactly zero), so metrics that barely moved don't display a misleadingly precise directional arrow.
- Color and arrow-direction for the delta pill must be driven entirely by that up/down/flat classification (green up arrow, red down arrow, gray flat line), and the same classification's color must also be used for the sparkline stroke and fill, so the whole card visually agrees on direction.
- Build the sparkline as a normalized SVG path: given the arbitrary-length numeric series, scale every point to the chart's fixed pixel height using that series' own minimum and maximum (not a fixed range), and close the line into a filled area path beneath it. The SVG must stretch to the card's actual width responsively.
- Lay the cards out in a CSS grid that auto-fits from several columns down to a single column as available width shrinks, with no JavaScript-driven layout logic.
- As a documented extension in a code comment, describe how to add an "inverted" flag per stat so metrics where a decrease is the desirable direction (like churn or error rate) flip the color mapping while keeping the same percent and arrow logic.`,
    },
  },
};

export default statComparisonCard;
