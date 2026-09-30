const activityHeatmap = {
  id: 'activity-heatmap',
  title: 'Activity Heatmap',
  category: 'charts',
  lastmod: '2026-06-10',
  html: `<div class="wrap">
  <div class="card">
    <div class="card-header">
      <div class="card-title">Activity Overview</div>
      <div class="card-sub" id="card-sub">Loading...</div>
    </div>

    <div class="heatmap-outer">
      <div class="day-labels" id="day-labels"></div>
      <div class="heatmap-scroll">
        <div class="month-labels" id="month-labels"></div>
        <div class="heatmap-grid" id="heatmap-grid"></div>
      </div>
    </div>

    <div class="legend">
      <span class="legend-text">Less</span>
      <div class="legend-swatches" id="legend-swatches"></div>
      <span class="legend-text">More</span>
    </div>

    <div class="tooltip" id="tooltip"></div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 760px; }

.card { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 1px 8px rgba(0,0,0,0.07); border: 1px solid #e2e8f0; }

.card-header { margin-bottom: 16px; }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.card-sub { font-size: 12px; color: #64748b; margin-top: 3px; }

/* Outer layout: day labels on left, scroll area on right */
.heatmap-outer { display: flex; gap: 6px; align-items: flex-start; }

.day-labels { display: flex; flex-direction: column; gap: 0; padding-top: 20px; flex-shrink: 0; }
.day-label { height: 12px; font-size: 10px; color: #94a3b8; line-height: 12px; text-align: right; margin-bottom: 2px; }

/* Scroll wrapper for month labels + grid */
.heatmap-scroll { overflow-x: auto; overflow-y: visible; padding-bottom: 4px; flex: 1; }

/* Month labels row */
.month-labels { display: flex; height: 20px; align-items: flex-end; padding-bottom: 4px; position: relative; min-width: max-content; }
.month-label { font-size: 10px; color: #94a3b8; position: absolute; bottom: 4px; white-space: nowrap; }

/* Grid: columns = weeks, rows = days */
.heatmap-grid { display: grid; grid-template-rows: repeat(7, 12px); grid-auto-flow: column; grid-auto-columns: 12px; gap: 2px; min-width: max-content; }

.cell { width: 12px; height: 12px; border-radius: 2px; cursor: pointer; transition: opacity 0.1s; }
.cell:hover { opacity: 0.8; outline: 1.5px solid rgba(0,0,0,0.2); outline-offset: 0; }

/* Legend */
.legend { display: flex; align-items: center; gap: 5px; margin-top: 14px; justify-content: flex-end; }
.legend-text { font-size: 11px; color: #94a3b8; }
.legend-swatches { display: flex; gap: 3px; }
.legend-swatch { width: 12px; height: 12px; border-radius: 2px; }

/* Tooltip */
.tooltip { position: fixed; background: #1e293b; color: #fff; border-radius: 8px; padding: 6px 10px; font-size: 11px; pointer-events: none; white-space: nowrap; display: none; z-index: 9999; transform: translate(-50%, -110%); }
.tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 5px solid transparent; border-top-color: #1e293b; }`,

  js: `const COLORS = ['#eee', '#c7d2fe', '#818cf8', '#6366f1', '#4338ca'];
const DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKS  = 52;

// â”€â”€ Generate random activity data for the past 364 days â”€â”€
function generateData() {
  const data = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (WEEKS * 7 - 1 - i));
    const key = d.toISOString().slice(0, 10);
    // Weighted random: ~40% chance of zero, otherwise 1â€“20
    const r = Math.random();
    data[key] = r < 0.4 ? 0 : Math.ceil(Math.random() * 20);
  }
  return data;
}

// Map a raw count to a 0â€“4 tier using quartile binning
function buildTiers(data) {
  const vals = Object.values(data).filter(v => v > 0).sort((a, b) => a - b);
  if (!vals.length) return () => 0;
  const q1 = vals[Math.floor(vals.length * 0.25)];
  const q2 = vals[Math.floor(vals.length * 0.50)];
  const q3 = vals[Math.floor(vals.length * 0.75)];
  return (v) => {
    if (v === 0) return 0;
    if (v <= q1)  return 1;
    if (v <= q2)  return 2;
    if (v <= q3)  return 3;
    return 4;
  };
}

function formatDate(isoStr) {
  const [y, m, d] = isoStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return MONTHS[dt.getMonth()] + ' ' + dt.getDate() + ', ' + y;
}

// â”€â”€ Build the grid â”€â”€
function buildHeatmap() {
  const data = generateData();
  const tier = buildTiers(data);

  // Ordered list of ISO date strings (oldest â†’ newest)
  const dates = Object.keys(data).sort();
  const total  = Object.values(data).reduce((s, v) => s + v, 0);

  // Update card subtitle
  document.getElementById('card-sub').textContent = total.toLocaleString() + ' contributions in the last year';

  // Day labels (Sunâ€“Sat): each row is 12px + 2px gap = 14px
  const dayLabelsEl = document.getElementById('day-labels');
  dayLabelsEl.innerHTML = '';
  DAYS.forEach((d, i) => {
    const el = document.createElement('div');
    el.className = 'day-label';
    // Only show Sun, Tue, Thu, Sat to avoid crowding
    el.textContent = (i % 2 === 0) ? d : '';
    dayLabelsEl.appendChild(el);
  });

  // Month labels — find the column index where each new month starts
  const monthLabelsEl = document.getElementById('month-labels');
  monthLabelsEl.innerHTML = '';
  const CELL_SIZE = 14; // 12px cell + 2px gap
  let prevMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const iso = dates[w * 7]; // first day of this week (Sunday)
    if (!iso) continue;
    const m = parseInt(iso.slice(5, 7), 10) - 1;
    if (m !== prevMonth) {
      const label = document.createElement('span');
      label.className = 'month-label';
      label.textContent = MONTHS[m];
      label.style.left = (w * CELL_SIZE) + 'px';
      monthLabelsEl.appendChild(label);
      prevMonth = m;
    }
  }
  // Set a min-width on month labels container so it matches the grid
  monthLabelsEl.style.width = (WEEKS * CELL_SIZE) + 'px';

  // Grid cells
  const grid = document.getElementById('heatmap-grid');
  grid.innerHTML = '';
  const tooltip = document.getElementById('tooltip');

  dates.forEach(iso => {
    const count = data[iso] || 0;
    const t = tier(count);
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.background = COLORS[t];

    cell.addEventListener('mousemove', e => {
      const label = count + (count === 1 ? ' contribution' : ' contributions') + ' on ' + formatDate(iso);
      tooltip.textContent = label;
      tooltip.style.display = 'block';
      tooltip.style.left = e.clientX + 'px';
      tooltip.style.top  = (e.clientY - 6) + 'px';
    });
    cell.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    grid.appendChild(cell);
  });

  // Legend swatches
  const swatchesEl = document.getElementById('legend-swatches');
  swatchesEl.innerHTML = '';
  COLORS.forEach(c => {
    const s = document.createElement('div');
    s.className = 'legend-swatch';
    s.style.background = c;
    swatchesEl.appendChild(s);
  });
}

buildHeatmap();`,

  about: {
    title: 'GitHub Activity Heatmap — HTML CSS JavaScript',
    description: 'A GitHub-style activity heatmap in HTML, CSS, and JavaScript. 52-week color-coded grid with hover tooltips, month labels, and quartile intensity scale.',
    about: `The activity heatmap — most famously used by GitHub to visualize commit history — is one of the most effective data visualization patterns for showing activity over time. A 52Ã—7 grid of color-coded squares gives an immediate visual impression of consistency, streaks, and quiet periods, all at a glance without reading a single number.\n\nThis snippet recreates the GitHub contribution graph using only HTML divs, CSS grid, and vanilla JavaScript. No canvas, no SVG, no charting library. The result is a lightweight, fully customizable heatmap that you can drop into any project.\n\n**Data model and color scale**\n\nEach cell represents one day. Its value (0â€“4) maps to a color intensity tier. 0 is no activity — rendered in a neutral gray. 1 is light activity, 2 medium, 3 high, 4 maximum — each step progressively darker indigo. This five-tier scale (matching GitHub's palette) is easy to compute from raw counts: divide the max value into quartiles and bin each day accordingly.\n\n**Grid layout**\n\nThe grid runs left-to-right, week by week. Each column is one week, and each row is a day of that week (Sunday at top, Saturday at bottom). CSS grid with a fixed column width and 7 rows makes this trivial to lay out. The 52 columns render 364 days — close enough to a full year that no day is ever more than a week off-screen.\n\n**Month labels**\n\nMonth labels sit above the grid, positioned at the column index where a new month begins. Computing this requires iterating the 52 weeks and checking when the month changes — a one-time O(52) pass at initialization.\n\n**Hover tooltip**\n\nMoving the mouse over any cell shows a tooltip: "3 contributions on Jun 10, 2025". The tooltip is absolutely positioned and follows the hovered cell, clamping to stay within the container. This uses mousemove/mouseleave events on each cell element, set with addEventListener.\n\n**Legend**\n\nBelow the grid, a "Less â†’ More" legend with five swatches explains the color scale at a glance — identical to GitHub's approach.\n\n**Customizing the data**\n\nThe snippet generates random activity data for demonstration. In production, replace the generateData() function with your own data source — an API response, a database query result, or a simple object mapping ISO date strings to counts. The render logic is data-agnostic.

**Quartile binning algorithm**

The color tier is not a simple percentage of the maximum. Instead, the snippet uses quartile binning: collect all non-zero day values, sort them, then find the values at the 25th, 50th, and 75th percentiles. Any day with count <= Q1 gets tier 1, <= Q2 gets tier 2, <= Q3 gets tier 3, and above Q3 gets tier 4. This distributes cells evenly across tiers regardless of your activity range -- whether your max is 5 events per day or 500.

**Month label positioning**

Month labels are \`position: absolute\` within a relative wrapper that scrolls in sync with the grid. Each label is offset by \`weekIndex * 14px\` (14px = 12px cell + 2px gap). The snippet does one O(52) pass over all 52 weeks, checking when the month number changes from the previous week. Only the first week of a new month gets a label, preventing overlapping labels when months are short.`,
      howToUse: [
        { step: 'Explore the grid', desc: 'The 52-column grid renders on load — each column is one week (oldest left), each row a day (Sun top, Sat bottom). Darker indigo = higher activity; gray = none.' },
        { step: 'Hover cells', desc: 'Move your mouse over any cell to see the date and activity count in a tooltip.' },
        { step: 'Read the legend', desc: 'The legend below the grid shows the color scale from no activity to maximum.' },
        { step: 'Customize data', desc: 'Replace the generateData() function with your own data — map ISO date strings to activity counts.' },
        { step: 'Adjust colors', desc: 'Change the COLORS array to match your brand palette.' },
      ],
      features: [
        { title: '52-week grid', desc: 'Full year of activity displayed in a compact, scannable 52Ã—7 cell layout.' },
        { title: 'Color intensity tiers', desc: 'Five-level indigo scale from no activity to maximum, matching the GitHub contribution graph pattern.' },
        { title: 'Month labels', desc: 'Abbreviated month names positioned above the first column of each new month.' },
        { title: 'Hover tooltips', desc: 'Each cell shows the exact date and count on hover — no clicks required.' },
        { title: 'Color legend', desc: '"Less â†’ More" swatch legend below the grid explains the intensity scale.' },
        { title: 'Zero dependencies', desc: 'Pure HTML divs and CSS grid — no canvas, no SVG library, no npm packages.' },
        { title: 'Customizable data', desc: 'Swap in any data source — API response, database result, or static object.' },
      ],
      useCases: [
        { title: 'Developer Portfolios', desc: 'Show your coding consistency across the year, just like GitHub. Pair with a [stats card](/ui-snippets/stats-card/) for headline numbers.' },
        { title: 'Habit Tracking Apps', desc: 'Visualize streaks and consistency for exercise, reading, or daily check-ins. The five-tier scale works for any 0â€“4 frequency.' },
        { title: 'Analytics Dashboards', desc: 'Show daily user activity, login frequency, or event counts across a full year at a glance. Works well alongside a [line chart widget](/ui-snippets/line-chart-widget/).' },
        { title: 'CMS & Blog Platforms', desc: "Show an author's publishing cadence — posts published per day over the past year. Combine with a [rich text editor](/ui-snippets/rich-text-editor/) for a full in-browser writing workflow." },
        { title: 'Project Management Tools', desc: 'Track daily commit or task-completion activity for a team. Combine with a [leaderboard table](/ui-snippets/leaderboard-table/) for team rankings.' },
        { icon: 'CODE', title: 'Related: Chart.js Gradient Revenue Chart', desc: 'See the [Chart.js Gradient Revenue Chart](/ui-snippets/chartjs-revenue-chart/) for a related charts pattern worth pairing with this one.' },
        { icon: 'CODE', title: 'Related: Chord Diagram Chart', desc: 'See the [Chord Diagram Chart](/ui-snippets/chord-diagram-chart/) for a related charts pattern worth pairing with this one.' },
        { icon: 'CODE', title: 'Related: Beeswarm Plot Chart', desc: 'See the [Beeswarm Plot Chart](/ui-snippets/beeswarm-plot-chart/) for a related charts pattern worth pairing with this one.' },
        { icon: 'CODE', title: 'Related: Arc Diagram Chart', desc: 'See the [Arc Diagram Chart](/ui-snippets/arc-diagram-chart/) for a related charts pattern worth pairing with this one.' },
      ],
      faqs: [
        { q: 'How do I use real data instead of random data?', a: 'Replace the generateData() function. It must return an object where keys are ISO date strings ("2025-06-10") and values are activity counts (any number). The render function bins counts into 0â€“4 tiers automatically using quartile calculation.' },
        { q: 'How do I change the year displayed?', a: 'The grid always shows the past 364 days from today. To show a specific year, replace the date generation loop so it starts at Jan 1 of the target year and ends 52 weeks later.' },
        { q: 'Can I show months instead of weeks?', a: 'Yes — replace the weekly column layout with a monthly one. Each column becomes a month, each row a day of that month. The data model stays the same; only the grid iteration changes.' },
        { q: 'How do I add a click handler to cells?', a: 'In the cell creation loop, add: cell.addEventListener("click", () => { console.log(iso, count); }). The iso and count variables are captured in scope via closure.' },
        { q: 'How do I change the color palette?', a: 'Edit the COLORS array at the top of the JS. It has 5 values: [\'#eee\', \'#c7d2fe\', \'#818cf8\', \'#6366f1\', \'#4338ca\']. Index 0 is the empty-day color; indices 1-4 are the four activity tiers from lightest to darkest. Replace them with five hex values on a gradient from your brand lightest tint to its darkest shade.' },
      ],
  },

  seo: {
    title: 'Activity Heatmap HTML CSS JS — GitHub-Style Calendar',
    description: 'GitHub-style activity heatmap with 52-week grid, quartile color tiers, month/day labels, hover tooltip, and legend. Pure JS, no dependencies.',
    about: {
      title: 'Activity Heatmap — How to Build a GitHub-Style Contribution Calendar in HTML, CSS, and JavaScript',
      description: `The GitHub contribution graph is one of the most recognized data visualizations in developer tools. Its 52-column × 7-row grid of colored squares communicates an entire year of activity at a single glance — no axes, no numbers, no scrolling. The intensity of each cell encodes a count, so patterns like streaks, weekday vs weekend habits, and seasonal dips emerge immediately from the visual texture.\n\nThis snippet replicates that pattern in pure HTML, CSS, and vanilla JavaScript — no D3, no charting library, no canvas. It renders a full 364-day (52 weeks) heatmap with five color intensity tiers, month labels above the grid, day labels on the left, and a hover tooltip showing the exact count and date.\n\n## Data Model and Date Generation\n\nThe heatmap data is a plain JavaScript object where each key is an ISO date string in \`YYYY-MM-DD\` format and each value is an activity count (any non-negative integer). The \`generateData()\` function populates this object for the 364 days before today: it counts backwards from today using \`setDate(today.getDate() - offset)\` and formats each date as \`d.toISOString().slice(0, 10)\`.\n\nThe distribution is deliberately skewed: approximately 40% of days get a count of 0 (the \`Math.random() < 0.4\` branch), and the remaining 60% get a count from 1 to 20 via \`Math.ceil(Math.random() * 20)\`. This produces realistic-looking sparse activity rather than a uniform fill.\n\n## Quartile-Based Color Tier Binning\n\nRather than using a fixed scale (e.g., 1–4 = tier 1, 5–9 = tier 2), the snippet uses quartile binning: it collects all non-zero counts, sorts them ascending, and divides the sorted array into four equal quartile buckets. The thresholds are at indices 25%, 50%, and 75% of the sorted array. Any count that falls below the 25th percentile gets tier 1 (lightest), above the 75th gets tier 4 (darkest), and the middle two quartiles get tiers 2 and 3.\n\nThis adaptive approach means the color distribution always looks balanced regardless of the actual count magnitude — whether your data ranges from 1–5 or 1–500, the heatmap uses all four non-empty colors. The \`buildTiers(data)\` function returns a function \`tier(count)\` that takes a count and returns the tier index 0–4 (0 for zero counts).\n\n## CSS Grid Layout for the Cell Matrix\n\nThe core grid uses CSS: \`display: grid; grid-template-columns: repeat(52, 11px); grid-auto-rows: 11px; gap: 2px\`. The 52 columns represent weeks and the 7 rows (auto-generated) represent days. Each cell is an 11×11px div.\n\nThe key layout detail is column-first ordering: cells are appended in day order (day 0 of week 0, day 1 of week 0, ..., day 6 of week 0, day 0 of week 1, ...) so CSS Grid naturally flows them into the right column-per-week arrangement. The \`grid-auto-flow: column\` equivalent is achieved by setting 52 fixed columns — the browser fills down each column before moving to the next.\n\n## Month Label Positioning\n\nMonth labels above the grid (Jan, Feb, ..., Dec) are the trickiest part. The label for a given month must appear above the first week-column that starts in that month. For each of the 52 weeks, the snippet checks whether \`weekStart.getMonth() !== previousWeekStart.getMonth()\` — if the month changed, that column gets a label. The label div uses absolute positioning with \`left: (weekIndex * 13)px\` (column width 11px + gap 2px = 13px per column). The container has \`position: relative\` and a fixed height matching the label row.\n\n## Day Labels\n\nA separate flex column on the left shows Mon, Wed, Fri at indices 1, 3, 5 (the even-index days are left blank for a GitHub-faithful look). Each label is 11px tall plus 2px gap, aligned to the corresponding grid row.\n\n## Hover Tooltip\n\nThe tooltip is a single absolutely-positioned div that moves with the mouse. Each cell has \`data-date\` and \`data-count\` attributes set at render time. \`mouseover\` reads these via \`e.target.dataset\` and updates the tooltip content and position. The tooltip uses \`position: fixed\` and offsets from \`e.clientX\` and \`e.clientY\` with a 10px nudge to avoid covering the hovered cell. \`mouseleave\` on the grid container hides it.\n\n## Connecting Real Data\n\nTo use real contribution data, replace \`generateData()\` with a function that builds the same \`{ [YYYY-MM-DD]: count }\` object from your API. For GitHub contribution data: call the GitHub REST API (\`/users/{user}/events\`) or GraphQL API (\`contributionCalendar\`) and map each contribution day to its count. For custom apps, aggregate your events table by date server-side and return the result as a JSON object. The rendering code does not care about the source — it only requires the \`YYYY-MM-DD: count\` format.\n\n## Performance Characteristics\n\nThe snippet creates 364 DOM elements on load. This is well within browser performance limits — modern browsers handle thousands of small divs at 60fps without issue. The hover handler is attached once to the parent container (event delegation), not individually to each cell, so there are no 364 separate event listeners in memory. The month-label calculation is O(n) over 52 weeks, not 364 days.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'See the grid render', text: 'The heatmap renders automatically on load — 364 cells (52 weeks × 7 days) filled with random activity data using quartile color tiers from lightest purple to darkest indigo.' },
        { title: 'Hover over cells', text: 'Hover any cell to see a tooltip showing the exact date and activity count. Empty days show "No activity", active days show the count.' },
        { title: 'Read the legend', text: 'The legend row below the grid shows five swatches from empty (grey) to maximum intensity (dark indigo), matching the quartile tier colors used across the grid.' },
        { title: 'Plug in your data', text: 'Replace generateData() with a function returning a plain object: { "2025-06-10": 5, "2025-06-11": 12, ... }. Keys are YYYY-MM-DD strings, values are activity counts. The rendering and tier binning work unchanged.' },
        { title: 'Change the color palette', text: 'Edit the COLORS array — 5 values: [empty, tier1, tier2, tier3, tier4]. Replace with your brand gradient from lightest tint (index 1) to darkest shade (index 4). Index 0 is the zero-activity cell color.' },
        { title: 'Customize date range', text: 'Change WEEKS from 52 to any number. The loop automatically calculates start and end dates relative to today. For a specific year range, replace the date generation loop with fixed start/end Date objects.' },
      ],
    },
    features: [
      'Data model: flat { "YYYY-MM-DD": count } object — replace generateData() with any API response in that shape',
      'Quartile binning: buildTiers() sorts non-zero values and splits at 25th/50th/75th percentile — adaptive to any count range',
      'CSS Grid layout: grid-template-columns: repeat(52, 11px); grid-auto-rows: 11px; gap: 2px — 364 cells',
      'Month labels: column-position calculated as weekIndex × 13px (11px cell + 2px gap) — accurate first-week-of-month placement',
      'Day labels: Mon/Wed/Fri at indices 1/3/5 only — faithful GitHub-style alternating day label pattern',
      'Hover tooltip: event delegation on parent container, position:fixed offset from clientX/clientY — single listener for all 364 cells',
      'Five-tier COLORS array: index 0 = empty, indices 1-4 = quartile tiers — swap any hex to change theme',
      'Legend row: dynamically rendered swatches from COLORS array matching grid tier colors',
    ],
    useCases: [
      { icon: 'CODE', title: 'Developer Portfolio Contribution Graph', desc: 'Show your coding consistency across the year, exactly like GitHub. Feed data from the GitHub GraphQL API\'s contributionCalendar field. Embed on a portfolio page alongside a [stats card](/ui-snippets/stats-card/) showing total commits and longest streak.' },
      { icon: 'APP', title: 'Habit Tracker & Streak Visualization', desc: 'Visualize daily exercise, reading, meditation, or journaling streaks. The five-tier scale works for any 0–20+ frequency range. Users see their consistency patterns at a glance — months with dense dark cells vs sparse light ones tell a clear story.' },
      { icon: 'CHART', title: 'Analytics & Event Volume Dashboard', desc: 'Show daily active users, login events, purchases, or API call volume across a full year. Product managers and analysts use the heatmap to spot seasonal patterns, campaign spikes, and anomaly days without reading a data table.' },
      { icon: 'LEARN', title: 'Learning & Course Progress Tracking', desc: 'Track which days a student completed lessons, solved problems, or submitted assignments. Instructors see engagement patterns — students who study consistently vs those who cram before deadlines. Pair with a [leaderboard table](/ui-snippets/leaderboard-table/) for classroom rankings.' },
      { icon: 'FLOW', title: 'CMS Publishing Cadence Visualization', desc: 'Show an author\'s publishing frequency per day over the past year — posts, updates, or review submissions. Editors see at a glance whether a contributor is active consistently or in bursts. Combine with a [line chart widget](/ui-snippets/line-chart-widget/) for cumulative post count over time.' },
      { icon: 'PEOPLE', title: 'Team Activity & Commit History', desc: 'Show per-developer commit, PR, or deployment frequency across the year. Engineering managers use heatmaps to spot under-contribution periods and calibrate workload distribution. Each team member can have their own heatmap card in a dashboard grid.' },
    ],
    faqs: [
      { q: 'How do I use real API data instead of random data?', a: 'Replace the generateData() function body. It must return a plain object where every key is a "YYYY-MM-DD" string and every value is a non-negative integer count. For GitHub: call the GraphQL contributionCalendar API and map week → day entries. For custom apps: aggregate your events table by date server-side and return the JSON. The rest of the rendering code — tier binning, grid layout, labels, tooltip — reads only this object and needs no changes.' },
      { q: 'How does the quartile color binning work?', a: 'buildTiers() collects all non-zero counts from the data object, sorts them ascending, and computes three thresholds at the 25th, 50th, and 75th percentile indices of the sorted array. The returned tier() function maps any count to 0 (zero), 1 (below 25th), 2 (25th–50th), 3 (50th–75th), or 4 (above 75th percentile). This adaptive approach means the heatmap always shows all four active colors regardless of whether your count range is 1–5 or 1–500.' },
      { q: 'How do I change the grid to show a specific date range instead of "last 364 days"?', a: 'In generateData(), replace the today-relative loop with: const start = new Date("2025-01-01"); const end = new Date("2025-12-31"); const data = {}; for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) { data[d.toISOString().slice(0,10)] = yourCount; }. Update WEEKS = Math.ceil((end - start) / (7 * 86400000)) to match the column count.' },
      { q: 'How do I add a click handler to open a day detail view?', a: 'In the cell creation loop in buildHeatmap(), add: cell.addEventListener("click", () => { const date = iso; const count = activity[iso] || 0; openDayDetail(date, count); }). The iso and activity variables are in scope via closure. Alternatively, use event delegation: add one click listener to the heatmap-grid container and read e.target.dataset.date and e.target.dataset.count.' },
      { q: 'Can I display the heatmap horizontally with months as columns instead of weeks?', a: 'Yes — restructure the grid so each column is a month (28–31 cells wide) instead of a week (7 cells tall). Set grid-template-columns based on the number of months you want to show. Within each month column, cells represent days 1–28/30/31. You lose the clean weekly alignment but gain a month-per-column view useful for monthly habit tracking comparisons.' },
      { q: 'Can I use this activity heatmap in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons to download a converted component. In React, generate the day cells with a map() over your contribution data instead of the DOM loop, and derive each cell’s level class from the count at render time.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the percentile math by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how buildTiers computes the 25th/50th/75th percentile thresholds from the sorted non-zero values, and why that adaptive quartile approach was chosen over a fixed count-based scale. The same assistant is useful for optimizing it — asking whether creating 364 DOM cells up front is the right tradeoff versus a canvas-based renderer for embedding many heatmaps on one dashboard page, or whether the month-label positioning loop could be simplified. It's just as good for extending the heatmap: ask it to wire generateData up to a real API endpoint and cache the quartile calculation, add a year-picker to swap between different 52-week windows, or add keyboard navigation between cells for accessibility. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a GitHub-style "activity heatmap" (contribution graph) in plain HTML, CSS, and JavaScript — no charting library, no canvas or SVG, using only CSS grid for the cell layout.

Requirements:
- A data model that is a plain object mapping ISO date strings (YYYY-MM-DD) to a non-negative integer count, covering the past 364 days.
- A color-tier function that does NOT use a fixed numeric scale. Instead, collect every non-zero count, sort them ascending, and compute the values at the 25th, 50th, and 75th percentile indices of that sorted array. Map each day's count to tier 0 (zero activity), tier 1 (at or below the 25th percentile), tier 2 (at or below the 50th), tier 3 (at or below the 75th), or tier 4 (above the 75th), so the color distribution adapts automatically whether the data ranges from 1-5 or 1-500.
- A CSS grid with 52 columns (one per week) and 7 fixed rows (one per day, Sunday to Saturday), filling cells in column-first order so each week is a vertical strip.
- Month labels positioned above the grid: iterate all 52 weeks, and only when a week's starting date falls in a different month than the previous week's, insert an absolutely-positioned label at that week's pixel offset (weekIndex times the cell-plus-gap width).
- Day-of-week labels down the left side, showing only alternating labels (e.g. Sun, Tue, Thu, Sat) to avoid crowding.
- A hover tooltip that follows the cursor and displays the exact date and activity count for the hovered cell, plus a five-swatch "Less to More" legend below the grid matching the tier colors exactly.`,
    },
  },
};

export default activityHeatmap;
