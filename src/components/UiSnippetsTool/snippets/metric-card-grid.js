const metricCardGrid = {
  id: 'metric-card-grid',
  title: 'Metric KPI Card Grid',
  lastmod: '2026-06-13',
  category: 'dashboards',
  html: `<div class="page">
  <div class="page-header">
    <div>
      <h1 class="page-title">Overview</h1>
      <p class="page-sub">Last 30 days · Updated just now</p>
    </div>
    <div class="period-toggle">
      <button class="pt-btn active" onclick="setPeriod(this,'30d')">30d</button>
      <button class="pt-btn" onclick="setPeriod(this,'7d')">7d</button>
      <button class="pt-btn" onclick="setPeriod(this,'1d')">24h</button>
    </div>
  </div>

  <div class="metric-grid">
    <div class="metric-card">
      <div class="metric-top">
        <div class="metric-icon" style="--ic:#eef2ff;--stroke:#6366f1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="trend up">↑ 12.5%</div>
      </div>
      <div class="metric-val">24,531</div>
      <div class="metric-label">Total Users</div>
      <div class="sparkline" id="spark1"></div>
    </div>

    <div class="metric-card">
      <div class="metric-top">
        <div class="metric-icon" style="--ic:#f0fdf4;--stroke:#10b981">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="trend up">↑ 8.2%</div>
      </div>
      <div class="metric-val">$48,290</div>
      <div class="metric-label">Monthly Revenue</div>
      <div class="sparkline" id="spark2"></div>
    </div>

    <div class="metric-card">
      <div class="metric-top">
        <div class="metric-icon" style="--ic:#fff7ed;--stroke:#f59e0b">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <div class="trend down">↓ 2.1%</div>
      </div>
      <div class="metric-val">3m 42s</div>
      <div class="metric-label">Avg. Session</div>
      <div class="sparkline" id="spark3"></div>
    </div>

    <div class="metric-card">
      <div class="metric-top">
        <div class="metric-icon" style="--ic:#fdf4ff;--stroke:#a855f7">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="trend up">↑ 4.7%</div>
      </div>
      <div class="metric-val">73.4%</div>
      <div class="metric-label">Conversion Rate</div>
      <div class="sparkline" id="spark4"></div>
    </div>
  </div>

  <div class="breakdown-row">
    <div class="breakdown-card">
      <h3 class="breakdown-title">Top Channels</h3>
      <div class="channel-list">
        <div class="channel-item">
          <span class="ch-name">Organic Search</span>
          <div class="ch-bar-wrap"><div class="ch-bar" style="width:68%;background:#6366f1"></div></div>
          <span class="ch-pct">68%</span>
        </div>
        <div class="channel-item">
          <span class="ch-name">Direct</span>
          <div class="ch-bar-wrap"><div class="ch-bar" style="width:22%;background:#10b981"></div></div>
          <span class="ch-pct">22%</span>
        </div>
        <div class="channel-item">
          <span class="ch-name">Social</span>
          <div class="ch-bar-wrap"><div class="ch-bar" style="width:10%;background:#f59e0b"></div></div>
          <span class="ch-pct">10%</span>
        </div>
      </div>
    </div>
    <div class="breakdown-card">
      <h3 class="breakdown-title">Goal Progress</h3>
      <div class="goals">
        <div class="goal-item">
          <div class="goal-head"><span>Revenue target</span><span class="goal-pct">82%</span></div>
          <div class="goal-track"><div class="goal-fill" style="width:82%;background:linear-gradient(90deg,#6366f1,#8b5cf6)"></div></div>
        </div>
        <div class="goal-item">
          <div class="goal-head"><span>User growth</span><span class="goal-pct">91%</span></div>
          <div class="goal-track"><div class="goal-fill" style="width:91%;background:linear-gradient(90deg,#10b981,#059669)"></div></div>
        </div>
        <div class="goal-item">
          <div class="goal-head"><span>Churn reduction</span><span class="goal-pct">44%</span></div>
          <div class="goal-track"><div class="goal-fill" style="width:44%;background:linear-gradient(90deg,#f59e0b,#ef4444)"></div></div>
        </div>
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc;min-height:100vh;padding:24px 20px}
.page{max-width:860px;margin:0 auto;display:flex;flex-direction:column;gap:20px}

.page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.page-title{font-size:20px;font-weight:800;color:#1e293b}
.page-sub{font-size:12px;color:#94a3b8;margin-top:2px}
.period-toggle{display:flex;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;overflow:hidden;flex-shrink:0}
.pt-btn{padding:6px 14px;font-size:12px;font-weight:600;color:#64748b;background:none;border:none;cursor:pointer;transition:all .15s;font-family:inherit}
.pt-btn.active{background:#6366f1;color:#fff}
.pt-btn:hover:not(.active){background:#f1f5f9;color:#1e293b}

.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.metric-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;transition:box-shadow .2s,transform .2s}
.metric-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.07);transform:translateY(-2px)}

.metric-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.metric-icon{width:34px;height:34px;border-radius:10px;background:var(--ic);color:var(--stroke);display:flex;align-items:center;justify-content:center}
.trend{font-size:11px;font-weight:700;padding:2px 7px;border-radius:6px}
.trend.up{color:#059669;background:#d1fae5}
.trend.down{color:#dc2626;background:#fee2e2}

.metric-val{font-size:22px;font-weight:900;color:#1e293b;line-height:1;margin-bottom:4px}
.metric-label{font-size:11px;color:#64748b;font-weight:500;margin-bottom:8px}

.sparkline{height:32px;display:flex;align-items:flex-end;gap:2px}
.spark-bar{flex:1;border-radius:2px 2px 0 0;transition:height .3s,background .15s;min-height:3px}
.sparkline:hover .spark-bar{opacity:.6}
.sparkline:hover .spark-bar:hover{opacity:1;transform:scaleY(1.08);transform-origin:bottom}

.breakdown-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.breakdown-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px}
.breakdown-title{font-size:13px;font-weight:700;color:#1e293b;margin-bottom:14px}

.channel-list{display:flex;flex-direction:column;gap:10px}
.channel-item{display:grid;grid-template-columns:110px 1fr 36px;align-items:center;gap:8px}
.ch-name{font-size:12px;color:#334155;font-weight:500}
.ch-bar-wrap{background:#f1f5f9;border-radius:4px;height:6px;overflow:hidden}
.ch-bar{height:100%;border-radius:4px;transition:width .6s cubic-bezier(.4,0,.2,1)}
.ch-pct{font-size:11px;font-weight:700;color:#64748b;text-align:right}

.goals{display:flex;flex-direction:column;gap:12px}
.goal-item{display:flex;flex-direction:column;gap:5px}
.goal-head{display:flex;justify-content:space-between;font-size:12px;color:#334155;font-weight:500}
.goal-pct{font-weight:700;color:#1e293b}
.goal-track{background:#f1f5f9;border-radius:6px;height:7px;overflow:hidden}
.goal-fill{height:100%;border-radius:6px;transition:width .7s cubic-bezier(.4,0,.2,1)}

@media(max-width:700px){.metric-grid{grid-template-columns:repeat(2,1fr)}.breakdown-row{grid-template-columns:1fr}}`,

  js: `// Sparkline data sets
const DATA = {
  spark1: [40,55,45,60,52,68,58,72,65,80,70,88],
  spark2: [30,40,35,55,48,62,50,72,60,78,68,82],
  spark3: [70,65,72,60,68,55,62,50,58,45,52,48],
  spark4: [45,50,48,60,55,65,58,70,62,68,65,73],
};

const COLORS = {
  spark1: '#6366f1',
  spark2: '#10b981',
  spark3: '#f59e0b',
  spark4: '#a855f7',
};

Object.entries(DATA).forEach(([id, vals]) => {
  const wrap = document.getElementById(id);
  const max = Math.max(...vals);
  vals.forEach(v => {
    const bar = document.createElement('div');
    bar.className = 'spark-bar';
    bar.style.height = (v / max * 100) + '%';
    bar.style.background = COLORS[id];
    bar.style.opacity = '0.5';
    bar.style.cursor = 'pointer';
    bar.title = v;
    wrap.appendChild(bar);
  });
  // Last bar full opacity (current)
  wrap.lastChild.style.opacity = '1';
});

function setPeriod(btn, period) {
  document.querySelectorAll('.pt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}`,

  seo: {
    title: 'Metric KPI Card Grid — Dashboard Cards HTML CSS JS',
    description: `Dashboard KPI metric grid with sparklines, trend badges, period toggle, and goal progress bars. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Metric KPI Card Grid — Sparkline Charts, Trend Badges & Dashboard Layout Pattern`,
      description: `KPI metric cards are the centrepiece of every analytics dashboard — they surface the numbers that matter most and communicate direction (up, down, stable) at a glance. This snippet builds a complete dashboard overview section: a four-card metric grid with sparkline bar charts, up/down trend badges, colour-coded icon system, period toggle, and two breakdown panels (channel attribution and goal progress bars).

Dashboard UI design is one of the most nuanced areas of frontend development. The challenge is information density: each card must communicate the metric value, direction, magnitude of change, and a trend over time — all in a compact card that doesn't feel overwhelming. The sparkline chart, trend badge, and icon each contribute a different signal layer without competing for attention.

**Sparkline bar charts via dynamic DOM**

Sparklines are rendered via JavaScript rather than embedded SVG because the data values are dynamic — the JS reads arrays from the \`DATA\` object and creates \`<div class="spark-bar">\` elements for each data point. Bar height is calculated as \`(v / max * 100) + '%'\` — normalising each value against the maximum in the dataset. This makes the tallest bar always 100% height regardless of the absolute values, which maximises use of the available vertical space.

The last bar in each sparkline gets full opacity (1.0) while earlier bars are semi-transparent (0.5) — visually indicating that the rightmost bar is the most recent data point. On hover, all bars dim to 0.6 and the hovered bar gets a slight scale-up, creating an interactive feel without a library.

**Trend badge with colour coding**

Trend badges use a \`.trend.up\` (green background + dark green text) and \`.trend.down\` (red background + dark red text) pattern. These use tinted backgrounds rather than just colour text — ensuring sufficient contrast for accessibility. The badge direction (↑/↓) uses Unicode arrow characters rather than SVG icons for weight efficiency. Note that "down" is not always bad — a decreasing churn rate or decreasing session bounce rate would use \`.trend.down\` with a positive implication.

**Period toggle control**

The period toggle is a segmented control built from buttons in a bordered container with \`overflow: hidden\`. The active state uses a full \`background: #6366f1\` fill. This pattern is identical to the [segmented control](/ui-snippets/segmented-control/) snippet — a common dashboard filtering pattern that drives a date range change in production implementations.

**Channel breakdown bars**

The breakdown panel uses a CSS grid with three columns: label (fixed width), progress bar (flexible), and percentage (fixed width). The bars animate in width via CSS transition — the same gradient progress pattern from [gradient progress bars](/ui-snippets/gradient-progress/). The three channels (Organic/Direct/Social) cover the most common attribution model for web products.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A four-card KPI grid appears with sparklines, trend badges, and icons. Below it: a channel breakdown bar chart and a goal progress section.` },
      { title: 'Read the metric cards', text: `Total Users (↑12.5%), Monthly Revenue (↑8.2%), Avg. Session (↓2.1%), Conversion Rate (↑4.7%). Each card has a sparkline showing the 12-point trend.` },
      { title: 'Hover the sparkline bars', text: `All bars dim to 60% opacity. The hovered bar returns to full opacity with a slight scale-up — interactive tooltip-ready micro-interaction.` },
      { title: 'Click the period toggle', text: `30d / 7d / 24h buttons highlight the active period. Wire the click handler to reload data for the selected period in production.` },
      { title: 'Update the metrics', text: `Change \`.metric-val\` text for the displayed number. Change \`.trend\` class and text for the direction badge. Update the \`DATA\` arrays in JS for sparkline values.` },
      { title: 'Customise breakdown bars', text: `Change the \`style="width:X%"\` on \`.ch-bar\` elements and update the percentage labels. Update channel names in \`.ch-name\`.` },
    ] },
    features: [
      { title: 'Dynamic sparkline bars', text: `JS renders \`<div>\` bars from a data array, normalised to the max value. Last bar full opacity; earlier bars semi-transparent for temporal context.` },
      { title: 'Trend direction badges', text: `\`.trend.up\` (green tint) and \`.trend.down\` (red tint) with Unicode arrows — accessible colour + text direction signal.` },
      { title: 'Colour-coded icon system', text: `\`--ic\` (background) and \`--stroke\` (icon colour) on each \`.metric-icon\` — one inline style attribute sets the entire icon colour theme.` },
      { title: 'Period toggle control', text: `Segmented button group for date range selection — 30d/7d/24h. Active state via \`.active\` class on click.` },
      { title: 'Channel breakdown bars', text: `CSS Grid label + bar + percentage layout with animated fill bars — the standard traffic attribution visualisation.` },
      { title: 'Goal progress bars', text: `Gradient fill progress bars with percentage labels showing target achievement — colour-coded by health (indigo = on track, amber/red = at risk).` },
      { title: 'Hover lift on metric cards', text: `\`translateY(-2px)\` + \`box-shadow\` on hover — consistent with the dashboard card interaction pattern.` },
      { title: 'Responsive grid', text: `4-column on desktop, 2-column on tablet/mobile. Breakdown row stacks to single column on small screens.` },
    ],
    useCases: [
      { title: 'SaaS analytics dashboards', text: `The primary use case — user growth, revenue, activation, and churn KPIs in the main dashboard overview. Period toggle drives date range selection.` },
      { title: 'E-commerce performance dashboards', text: `Orders, revenue, conversion rate, and average order value as the four headline metrics. Channel breakdown shows traffic source attribution.` },
      { title: 'Marketing analytics overviews', text: `Impressions, clicks, conversions, and CPA as KPIs. Goal progress bars show campaign pacing against monthly targets.` },
      { title: 'Executive reporting dashboards', text: `High-level business metrics in a single-page overview for leadership — simple numbers, direction, and goals without raw data tables.` },
      { title: 'DevOps monitoring dashboards', text: `Requests/sec, error rate, p95 latency, and uptime as KPI cards. Sparklines show hourly trends. Period toggle switches between time windows.` },
      { title: 'Internal team productivity tools', text: `Tickets closed, velocity, deployment frequency, and cycle time as engineering metrics — the DORA metrics dashboard pattern.` },
      { icon: 'CODE', title: 'Related: Reconnect Backoff Visualizer', desc: 'See the [Reconnect Backoff Visualizer](/ui-snippets/reconnect-backoff-visualizer/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect the period toggle to real data?', a: `Add a \`fetchMetrics(period)\` function that calls your API with the period parameter. On response, update each \`.metric-val\` innerHTML, update the \`DATA\` sparkline arrays, re-render sparklines, and update \`.trend\` classes based on the new direction. Debounce rapid period switches.` },
      { q: 'How do I add a tooltip to each sparkline bar?', a: `Add \`position: relative\` to \`.sparkline\` and \`overflow: visible\`. On bar \`mouseover\`, create a tooltip div with the value, position it above the hovered bar using \`getBoundingClientRect\`, and remove it on \`mouseleave\`. Or use \`title\` attribute — already set in the JS with \`bar.title = v\`.` },
      { q: 'How do I animate metrics counting up on load?', a: `Use a count-up animation: start from 0 and increment to the target value over ~1 second using \`requestAnimationFrame\`. The [count-up](/ui-snippets/count-up/) snippet implements this exact pattern — apply it to each \`.metric-val\` element on \`DOMContentLoaded\`.` },
      { q: 'How do I export this as a React component?', a: `Create a \`MetricCard\` component with \`{label, value, trend, trendDir, data, color, icon}\` props. The sparkline uses \`useRef\` and a \`useEffect\` to render bars into the DOM. The parent \`MetricGrid\` maps a \`metrics\` array. The period toggle uses \`const [period, setPeriod] = useState('30d')\` and triggers a data refetch via \`useEffect([period])\`.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to eyeball the sparkline math to trust it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each sparkline bar's height is normalized against the max value in its own DATA array rather than a shared scale, or why the last bar is deliberately kept at full opacity while the rest sit at half. The same assistant is useful for optimizing it — asking whether rebuilding every sparkline from scratch on a period-toggle click is wasteful compared to updating existing bar heights in place, or how many metric cards this DOM-generation approach can scale to before it should switch to a canvas or SVG sparkline. It's also a fast way to extend the dashboard: ask it to wire the 30d/7d/24h period toggle to an actual data refetch, add a hover tooltip showing each bar's raw value instead of relying on the title attribute, or turn the goal progress bars into a live countdown against a real deadline. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "KPI metric card grid" dashboard section in plain HTML, CSS, and JavaScript using only CSS grid and dynamically generated DOM elements for the charts — no charting library, no SVG.

Requirements:
- A responsive CSS grid of metric cards (four columns on desktop, collapsing to two on tablet-width screens via a media query), each card containing a colored icon tile, an up or down trend badge with a percentage, a large bold value, a label, and a small bar-chart sparkline area.
- Store each sparkline's data as a plain array of numbers in a JavaScript object keyed by an id per card. For each array, compute the maximum value and generate one absolutely-sized bar div per data point whose height is set to (value / max * 100) + '%', so the tallest point in that specific series always fills the full sparkline height regardless of the series' absolute scale.
- The last (most recent) bar in every sparkline must render at full opacity while every earlier bar renders at a lower opacity, to visually mark which point is "now" versus history, and hovering the sparkline should dim all bars except the one directly under the cursor, which should highlight and scale up slightly.
- Trend badges must use a tinted background color combined with an up or down arrow character, not color alone, so direction is still legible without relying purely on hue — and a "down" trend must be stylable as either good or bad depending on the metric (e.g. down is good for churn, bad for revenue).
- Add a segmented period-toggle control (e.g. 30d / 7d / 24h) built from plain buttons where clicking one adds an active class to itself and removes it from its siblings.
- Below the metric grid, add two side-by-side breakdown cards: one with horizontal labeled bars showing percentage-of-total breakdown (e.g. traffic channels) and one with labeled goal-progress bars showing percent-to-target, both using CSS width transitions so changing the width value animates smoothly.`,
    },
  },
};

export default metricCardGrid;
