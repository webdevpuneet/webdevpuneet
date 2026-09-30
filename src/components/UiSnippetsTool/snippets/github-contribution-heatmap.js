const githubContributionHeatmap = {
  id: 'github-contribution-heatmap',
  title: 'GitHub-Style Contribution Heatmap',
  lastmod: '2026-08-24',
  category: 'dev',
  cdnUrls: [],
  html: `<div class="chm-card">
  <div class="chm-head">
    <div>
      <h3>Contribution activity</h3>
      <p id="chmTotal">— contributions in the last year</p>
    </div>
    <div class="chm-legend">
      <span>Less</span>
      <span class="chm-swatch" data-level="0"></span>
      <span class="chm-swatch" data-level="1"></span>
      <span class="chm-swatch" data-level="2"></span>
      <span class="chm-swatch" data-level="3"></span>
      <span class="chm-swatch" data-level="4"></span>
      <span>More</span>
    </div>
  </div>
  <div class="chm-scroll">
    <div class="chm-months" id="chmMonths"></div>
    <div class="chm-body">
      <div class="chm-days">
        <span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span></span>
      </div>
      <div class="chm-grid" id="chmGrid"></div>
    </div>
  </div>
  <div class="chm-tooltip" id="chmTooltip" hidden></div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.chm-card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:20px;width:100%;max-width:760px;position:relative}
.chm-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.chm-head h3{font-size:14px;font-weight:700;color:#e6edf3}
.chm-head p{font-size:12px;color:#7d8590;margin-top:2px}
.chm-legend{display:flex;align-items:center;gap:4px;font-size:11px;color:#7d8590}
.chm-swatch{width:11px;height:11px;border-radius:2px;background:#161b22;border:1px solid rgba(240,246,252,.08)}
.chm-swatch[data-level="0"]{background:#161b22}
.chm-swatch[data-level="1"]{background:#0e4429}
.chm-swatch[data-level="2"]{background:#006d32}
.chm-swatch[data-level="3"]{background:#26a641}
.chm-swatch[data-level="4"]{background:#39d353}
.chm-scroll{overflow-x:auto;padding-bottom:4px}
.chm-months{display:grid;grid-auto-flow:column;grid-auto-columns:11px;gap:3px;margin-left:28px;margin-bottom:4px;font-size:10px;color:#7d8590;white-space:nowrap}
.chm-body{display:flex;gap:6px}
.chm-days{display:grid;grid-template-rows:repeat(7,11px);gap:3px;font-size:9px;color:#7d8590;width:22px;text-align:right;line-height:11px}
.chm-grid{display:grid;grid-template-rows:repeat(7,11px);grid-auto-flow:column;gap:3px}
.chm-cell{width:11px;height:11px;border-radius:2px;background:#161b22;border:1px solid rgba(240,246,252,.06);cursor:pointer;transition:outline .1s}
.chm-cell[data-level="1"]{background:#0e4429}
.chm-cell[data-level="2"]{background:#006d32}
.chm-cell[data-level="3"]{background:#26a641}
.chm-cell[data-level="4"]{background:#39d353}
.chm-cell:hover{outline:1px solid #e6edf3}
.chm-tooltip{position:fixed;background:#1c2128;border:1px solid #30363d;color:#e6edf3;font-size:11.5px;padding:6px 10px;border-radius:6px;pointer-events:none;white-space:nowrap;z-index:10;box-shadow:0 8px 20px rgba(0,0,0,.4)}
.chm-tooltip[hidden]{display:none}`,
  js: `(function(){
  var DAY = 24 * 60 * 60 * 1000;
  var WEEKS = 53;
  var today = new Date();
  today.setHours(0,0,0,0);
  var start = new Date(today.getTime() - (WEEKS * 7 - 1) * DAY);
  // align start to a Sunday so weeks stack into clean 7-row columns
  start = new Date(start.getTime() - start.getDay() * DAY);

  var grid = document.getElementById('chmGrid');
  var monthsRow = document.getElementById('chmMonths');
  var tooltip = document.getElementById('chmTooltip');
  var totalEl = document.getElementById('chmTotal');
  var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var days = [];
  var cursor = new Date(start);
  while (cursor <= today) {
    // pseudo-random but deterministic-looking activity: weekday bias + occasional bursts
    var isWeekend = cursor.getDay() === 0 || cursor.getDay() === 6;
    var r = Math.random();
    var count = 0;
    if (cursor > today) count = 0;
    else if (r < (isWeekend ? 0.55 : 0.3)) count = 0;
    else if (r < 0.6) count = Math.floor(Math.random() * 3) + 1;
    else if (r < 0.85) count = Math.floor(Math.random() * 6) + 3;
    else count = Math.floor(Math.random() * 12) + 8;
    days.push({ date: new Date(cursor), count: cursor > today ? -1 : count });
    cursor = new Date(cursor.getTime() + DAY);
  }

  function levelFor(count) {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  }

  var total = 0;
  var lastMonthLabel = -1;
  var weekIndex = 0;
  days.forEach(function (d, i) {
    var dow = i % 7;
    if (dow === 0 && i !== 0) weekIndex++;
    var cell = document.createElement('div');
    cell.className = 'chm-cell';
    if (d.count >= 0) {
      cell.setAttribute('data-level', String(levelFor(d.count)));
      total += d.count;
    } else {
      cell.style.visibility = 'hidden';
    }
    var label = d.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    cell.addEventListener('mouseenter', function (e) {
      if (d.count < 0) return;
      tooltip.hidden = false;
      tooltip.textContent = (d.count === 0 ? 'No contributions' : d.count + ' contribution' + (d.count === 1 ? '' : 's')) + ' on ' + label;
      positionTooltip(e);
    });
    cell.addEventListener('mousemove', positionTooltip);
    cell.addEventListener('mouseleave', function () { tooltip.hidden = true; });
    grid.appendChild(cell);

    if (dow === 0 && d.date.getMonth() !== lastMonthLabel) {
      lastMonthLabel = d.date.getMonth();
      var m = document.createElement('span');
      m.style.gridColumn = String(weekIndex + 1);
      m.textContent = monthNames[d.date.getMonth()];
      monthsRow.appendChild(m);
    }
  });

  function positionTooltip(e) {
    tooltip.style.left = (e.clientX + 12) + 'px';
    tooltip.style.top = (e.clientY - 30) + 'px';
  }

  totalEl.textContent = total.toLocaleString() + ' contributions in the last year';
})();`,
  seo: {
    title: 'GitHub-Style Contribution Heatmap — Free HTML CSS JS Calendar Snippet',
    description: 'A 53-week activity calendar heatmap with five color intensity levels, month labels, and a hover tooltip, built with CSS Grid and vanilla JavaScript — no charting library.',
    about: {
      title: 'Contribution Heatmap — CSS Grid Calendar with Level-Based Color Coding',
      description: `A contribution heatmap turns a year of daily activity counts into a single scannable grid, the pattern popularized by GitHub's profile page and now common on habit trackers, analytics dashboards, and streak-tracking apps. This snippet builds the full grid, color scale, and hover tooltip from scratch using CSS Grid and vanilla JavaScript — no charting library required.

**Building the date grid**

The script computes a 53-week window ending today, then rewinds \`start\` to the previous Sunday with \`start = new Date(start.getTime() - start.getDay() * DAY)\` so every week lands cleanly into 7 rows. It then walks forward one day at a time, pushing \`{ date, count }\` objects into a flat \`days\` array — day 0 is the top-left cell, day 6 wraps to the next column, matching how \`grid-auto-flow: column\` lays cells out.

**CSS Grid does the calendar layout**

\`.chm-grid\` uses \`grid-template-rows: repeat(7, 11px)\` with \`grid-auto-flow: column\`, so pushing 371 cells in date order automatically arranges them into weeks-as-columns without any manual row/column math in JavaScript — the grid algorithm handles wrapping every 7 cells into a new column for you.

**A five-level, not continuous, color scale**

Rather than mapping raw counts to color via \`hsl()\` interpolation, \`levelFor()\` buckets counts into five discrete tiers (0, 1–2, 3–5, 6–10, 11+) matching GitHub's actual convention. Discrete levels read faster at a glance than a continuous gradient because the eye only has to distinguish five states, not infinite shades — each level maps to a fixed \`data-level\` attribute and a corresponding CSS background color.

**Month labels aligned to grid columns**

As the loop walks days, it detects a Sunday that starts a new month (\`dow === 0 && d.date.getMonth() !== lastMonthLabel\`) and appends a label positioned with \`style.gridColumn = weekIndex + 1\`, keeping the month row's labels aligned to the exact week column they belong to even though months don't divide evenly into 53 weeks.

**A tooltip that follows the cursor**

Each cell gets \`mouseenter\`/\`mousemove\`/\`mouseleave\` listeners that show a fixed-position tooltip offset from \`e.clientX\`/\`e.clientY\`, formatted with \`toLocaleDateString()\` for a locale-correct date string — cheaper than a full tooltip library for a grid with hundreds of hoverable cells.

**Customizing it**

Swap the random data generator for a real \`fetch()\` call to your activity API, change \`WEEKS\` to show a shorter range, or adjust the \`levelFor()\` thresholds to match your own data's distribution.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 53-week calendar grid renders with randomly generated activity levels and a color legend.` },
      { title: 'Hover a cell', text: `A tooltip shows the exact contribution count and date for that day.` },
      { title: 'Scroll horizontally', text: `On narrow viewports the grid scrolls inside its own container so the page never scrolls sideways.` },
      { title: 'Replace the data source', text: `Swap the random count generator in the JS for a fetch() call returning real daily counts.` },
      { title: 'Adjust the color levels', text: `Edit levelFor() thresholds and the .chm-cell[data-level] CSS colors to match your brand palette.` },
      { title: 'Change the time range', text: `Edit the WEEKS constant to show a shorter or longer history than 53 weeks.` },
    ] },
    features: [
      { title: '53-week CSS Grid calendar', text: `grid-auto-flow: column arranges 371 day cells into weekly columns with zero manual layout math.` },
      { title: 'Five-level color scale', text: `Counts bucket into 5 discrete intensity tiers matching the familiar GitHub convention.` },
      { title: 'Month labels aligned to columns', text: `Labels are positioned with style.gridColumn so they line up with the exact week they start.` },
      { title: 'Cursor-following tooltip', text: `Shows exact count and locale-formatted date on hover without a tooltip library.` },
      { title: 'Sunday-aligned start date', text: `The window rewinds to the previous Sunday so every column represents a full week.` },
      { title: 'Total contributions summary', text: `Header text sums all counts and formats with toLocaleString() for thousands separators.` },
      { title: 'Horizontal scroll container', text: `The grid scrolls inside its own overflow-x container on narrow screens.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS Grid, and vanilla JavaScript — no charting or date library.` },
    ],
    useCases: [
      { title: 'Developer profile pages', text: `Show a contributor's commit or PR activity, matching the pattern GitHub popularized.` },
      { title: 'Habit and streak trackers', text: `Visualize daily habit completions over a year at a glance.` },
      { title: 'Analytics dashboards', text: `Display daily active users, orders, or events as a scannable calendar.` },
      { title: 'Fitness and wellness apps', text: `Show workout or meditation streaks with the same familiar heatmap language.` },
      { title: 'Content platforms', text: `Visualize a writer's or streamer's daily posting activity over the year.` },
      { title: 'Internal team dashboards', text: `Track daily deploys, incidents, or support tickets resolved per day.` },
      { icon: 'CODE', title: 'Related: Text Diff Checker', desc: 'See the [Text Diff Checker](/ui-snippets/text-diff-checker/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Base64 & URL-Safe Encoder/Decoder', desc: 'See the [Base64 & URL-Safe Encoder/Decoder](/ui-snippets/base64-playground/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: UUID / ULID Generator & Validator', desc: 'See the [UUID / ULID Generator & Validator](/ui-snippets/uuid-ulid-generator/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: cURL Command Builder', desc: 'See the [cURL Command Builder](/ui-snippets/curl-command-builder/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Number Base Converter', desc: 'See the [Number Base Converter](/ui-snippets/number-base-converter/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Semver Range Checker', desc: 'See the [Semver Range Checker](/ui-snippets/semver-range-checker/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why does the grid start on the previous Sunday instead of exactly a year ago?`, a: `CSS Grid's grid-auto-flow: column wraps every 7 cells into a new column. If the first day isn't a Sunday, the first week would be a partial column and every subsequent week would be visually misaligned. Rewinding start to the prior Sunday guarantees every column is a clean 7-day week.` },
      { q: `How do I connect this to real activity data instead of random numbers?`, a: `Replace the days.push({ date, count }) loop with data fetched from your API — for example fetch('/api/activity').then(r => r.json()), where the response is an array of { date, count } objects covering the same date range. Keep the date objects normalized to midnight so day-of-week math stays correct.` },
      { q: `How does the color level get chosen for each day?`, a: `levelFor(count) buckets the raw count into one of five tiers (0, 1, 2, 3, 4) using fixed thresholds. Each cell gets a data-level attribute, and the CSS selects a background color per level with .chm-cell[data-level="N"]. Edit the thresholds in levelFor() to fit your own data's typical range.` },
      { q: `Can I make each cell clickable to show details for that day?`, a: `Yes — the cell.addEventListener block already wires up mouseenter/mousemove/mouseleave for the tooltip. Add a click listener in the same forEach loop that reads d.date and d.count and opens a modal, navigates to a detail page, or expands an inline panel.` },
      { q: `Why use discrete color levels instead of a smooth gradient?`, a: `A five-level scale is easier to read at a glance across hundreds of cells because the eye only has to distinguish five known states rather than judge a continuous gradient's exact shade. It also matches the convention most developers already recognize from GitHub, so no legend explanation is needed.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the week-alignment math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the start date gets rewound to the previous Sunday before the grid is built, and how grid-auto-flow: column turns a flat array of day cells into a calendar of weekly columns without manual row/column indexing. The same assistant can help optimize it too — ask whether building 371 DOM nodes up front is worth it versus a canvas-based render for very large date ranges. It's also useful for extending the heatmap: ask it to add a year selector, wire real data in from an API, or add keyboard navigation between cells for accessibility. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "GitHub-style contribution heatmap" in plain HTML, CSS, and JavaScript with no charting library.

Requirements:
- A calendar grid covering the last 53 weeks ending today, laid out with CSS Grid using 7 fixed-height rows and grid-auto-flow set to column so pushing day cells in chronological order automatically wraps into weekly columns.
- Before building the grid, rewind the start date to the closest previous Sunday so every column represents a complete 7-day week with no partial first column.
- Generate a count for each day (or accept it from an external data source) and bucket that count into five discrete intensity levels using fixed thresholds, applying a different background color per level via a data attribute rather than a computed gradient.
- Month name labels positioned above the grid, aligned to the exact week column in which that month's first Sunday falls, computed by tracking which grid column index the loop is on when the month changes.
- A hover tooltip that follows the cursor and shows the exact count and a human-readable date for the cell being hovered, positioned relative to the mouse event coordinates.
- A small legend showing "Less" to "More" with sample swatches for each of the five levels, and a header summary line showing the total count across the whole grid.
- The grid must scroll horizontally inside its own container on narrow viewports without causing the page itself to scroll sideways.`,
    },
  },
};

export default githubContributionHeatmap;
