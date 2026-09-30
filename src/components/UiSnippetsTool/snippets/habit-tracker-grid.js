const habitTrackerGrid = {
  id: 'habit-tracker-grid',
  title: 'Habit Tracker Grid',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="htg-card">
  <div class="htg-head">
    <div>
      <h2>Daily Reading</h2>
      <p class="htg-sub">Click a day to cycle its intensity. Streak is computed from the grid.</p>
    </div>
    <div class="htg-streak">
      <span class="htg-streak-num" id="htgStreakNum">0</span>
      <span class="htg-streak-label">day streak</span>
    </div>
  </div>
  <div class="htg-grid-wrap">
    <div class="htg-days" id="htgDayLabels"></div>
    <div class="htg-grid" id="htgGrid"></div>
  </div>
  <div class="htg-legend">
    <span>Less</span>
    <span class="htg-cell htg-l0"></span>
    <span class="htg-cell htg-l1"></span>
    <span class="htg-cell htg-l2"></span>
    <span class="htg-cell htg-l3"></span>
    <span>More</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.htg-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:24px;max-width:640px;margin:0 auto}
.htg-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:18px}
.htg-head h2{font-size:18px;margin:0 0 4px}
.htg-sub{font-size:12px;color:#8b90a8;margin:0;max-width:320px}
.htg-streak{text-align:right}
.htg-streak-num{display:block;font-size:28px;font-weight:800;color:#fb923c;line-height:1}
.htg-streak-label{font-size:11px;color:#8b90a8;text-transform:uppercase;letter-spacing:.05em}
.htg-grid-wrap{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px}
.htg-days{display:grid;grid-template-rows:repeat(7,13px);gap:3px;flex-shrink:0;padding-top:0}
.htg-days span{font-size:9px;color:#6b7090;line-height:13px}
.htg-grid{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,13px);gap:3px}
.htg-cell{width:13px;height:13px;border-radius:3px;background:#161927;cursor:pointer;border:1px solid rgba(255,255,255,.04)}
.htg-cell:hover{outline:1px solid rgba(255,255,255,.4);outline-offset:1px}
.htg-l0{background:#161927}
.htg-l1{background:#3f2a17}
.htg-l2{background:#b45309}
.htg-l3{background:#fb923c}
.htg-legend{display:flex;align-items:center;gap:4px;margin-top:14px;font-size:10px;color:#8b90a8}
.htg-legend .htg-cell{cursor:default;width:11px;height:11px}
.htg-legend .htg-cell:hover{outline:none}`,

  js: `// 20 weeks x 7 days of habit intensity data (0 = none, 1 = light, 2 = medium,
// 3 = full). Seeded pseudo-random generator so the demo grid looks organic
// but is reproducible, and importantly ends with a real trailing streak so
// the streak counter has something genuine to compute from.
var WEEKS = 20;
var DAYS = 7;

function seedRand(seed) {
  var s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

var rand = seedRand(42);
var totalDays = WEEKS * DAYS;
var grid = []; // flat array, index 0 = oldest day, last index = today

for (var i = 0; i < totalDays; i++) {
  var daysFromToday = totalDays - 1 - i;
  if (daysFromToday < 9) {
    // Force the most recent 9 days to be an active streak (level >= 1) so
    // there's always a real, visible streak for the counter to find.
    grid.push(1 + Math.floor(rand() * 3));
  } else {
    var r = rand();
    if (r < 0.35) grid.push(0);
    else if (r < 0.6) grid.push(1);
    else if (r < 0.85) grid.push(2);
    else grid.push(3);
  }
}

var gridEl = document.getElementById('htgGrid');
var dayLabelsEl = document.getElementById('htgDayLabels');
var streakNumEl = document.getElementById('htgStreakNum');

var dayNames = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
dayNames.forEach(function (name) {
  var span = document.createElement('span');
  span.textContent = name;
  dayLabelsEl.appendChild(span);
});

var cells = [];

function renderGrid() {
  gridEl.innerHTML = '';
  cells = [];
  grid.forEach(function (level, idx) {
    var cell = document.createElement('div');
    cell.className = 'htg-cell htg-l' + level;
    cell.dataset.index = idx;
    cell.title = 'Day ' + (idx + 1) + ' \\u2014 level ' + level;
    cell.addEventListener('click', function () {
      cycleCell(idx);
    });
    gridEl.appendChild(cell);
    cells.push(cell);
  });
}

function cycleCell(idx) {
  grid[idx] = (grid[idx] + 1) % 4; // 0 -> 1 -> 2 -> 3 -> 0
  cells[idx].className = 'htg-cell htg-l' + grid[idx];
  cells[idx].title = 'Day ' + (idx + 1) + ' \\u2014 level ' + grid[idx];
  updateStreak();
}

// Real streak calculation: scan backwards from the most recent day (the
// last element in the grid array) and count consecutive days with
// intensity level > 0. This recomputes fresh from the grid data every
// time a cell changes — it is never a hardcoded or cached number.
function computeStreak(data) {
  var streak = 0;
  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i] > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function updateStreak() {
  var streak = computeStreak(grid);
  streakNumEl.textContent = streak;
}

renderGrid();
updateStreak();`,

  seo: {
    title: 'Habit Tracker Grid — Free GitHub-Style Contribution Grid Snippet',
    description: `A GitHub-contributions-style habit tracker grid with 4-level click-to-cycle cells and a live streak counter computed by scanning the grid data. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Habit Tracker Grid — Click-to-Cycle Cells With a Real Computed Streak',
      description: `The habit tracker grid is the GitHub-contributions-style calendar that's become the default way to visualize a daily habit: one cell per day, weeks running left to right, intensity shown by color. This snippet builds the interactive version — clickable cells that cycle through four levels, plus a streak counter genuinely computed by scanning the grid data rather than hardcoded.

**Four-level cells, click to cycle**

Each cell holds an integer 0–3 (none, light, medium, full). Clicking a cell calls \`cycleCell(idx)\`, which advances that day's value with modulo arithmetic (\`(grid[idx] + 1) % 4\`) and updates both its CSS class and its data — so the grid's visual state and its underlying array are always the same source of truth, never out of sync.

**A real streak calculation, not a hardcoded number**

The headline feature is \`computeStreak(data)\`: it walks backward from the most recent day (the last element in the flat \`grid\` array) and counts consecutive days where the level is greater than zero, stopping at the first day with level 0. This runs fresh every time a cell is clicked via \`updateStreak()\` — there's no cached or manually-set streak number anywhere in the code. Toggle today's cell to 0 and watch the streak collapse to 0 immediately; toggle it back and the streak recalculates from the actual data.

**Seeded but organic-looking data**

The initial 20-week grid is generated with a small seeded pseudo-random function so it reproduces the same layout on every load while still looking like real, varied habit data. The most recent 9 days are deliberately forced to intensity 1+ so there's always a genuine trailing streak to demonstrate the counter working on load, not just after interaction.

**Legend and day labels**

A four-swatch "Less → More" legend mirrors the same four CSS classes used in the grid, and Mon/Wed/Fri row labels orient the grid the way GitHub's contribution graph does, without cluttering every row.

**Customizing it**

Swap the seeded generator for real per-day habit data from your backend, change the week count, add a month-label row along the top, or persist clicks to localStorage or an API. Pair it with [activity heatmap](/ui-snippets/activity-heatmap/), [streak tracker](/ui-snippets/streak-tracker/), or [activity rings](/ui-snippets/activity-rings/) for a fuller habit-dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 20-week grid renders with a live streak counter.` },
      { title: 'Click any cell', text: `It cycles none \\u2192 light \\u2192 medium \\u2192 full \\u2192 none.` },
      { title: 'Watch the streak update', text: `computeStreak() rescans the grid after every click.` },
      { title: 'Zero out the most recent day', text: `The streak counter drops to 0 immediately.` },
      { title: 'Wire up persistence', text: `Save the grid array to localStorage or your backend.` },
    ] },
    features: [
      { title: 'Real computed streak', text: `computeStreak() scans grid data, never hardcoded.` },
      { title: 'Click-to-cycle cells', text: `Four intensity levels via simple modulo arithmetic.` },
      { title: 'GitHub-style layout', text: `Weeks as columns, days as rows, familiar at a glance.` },
      { title: 'Seeded demo data', text: `Reproducible but organic-looking initial grid.` },
      { title: 'Guaranteed visible streak', text: `Recent days seeded active so the counter has data.` },
      { title: 'Matching legend', text: `Same four CSS levels used in cells and legend.` },
      { title: 'Day-of-week labels', text: `Mon/Wed/Fri orientation without clutter.` },
      { title: 'Zero dependencies', text: `Pure DOM, no charting library.` },
    ],
    useCases: [
      { title: 'Personal habit apps', text: `Track reading, exercise, meditation, or journaling.` },
      { title: 'Team dashboards', text: `Pair with [activity heatmap](/ui-snippets/activity-heatmap/) for engagement.` },
      { title: 'Gamified onboarding', text: `Show streaks alongside [streak tracker](/ui-snippets/streak-tracker/).` },
      { title: 'Wellness apps', text: `Visualize daily check-ins over months.` },
      { title: 'Learning platforms', text: `Show consistent study-day streaks to learners.` },
      { title: 'Developer tools', text: `Show commit-like daily activity for any tracked event.` },
      { icon: 'CODE', title: 'Related: Job Queue Depth Monitor — Live Backlog Trend with Threshold Alerts', desc: 'See the [Job Queue Depth Monitor — Live Backlog Trend with Threshold Alerts](/ui-snippets/job-queue-depth-monitor/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the streak number really computed, or just displayed?', a: `It's genuinely computed. computeStreak(data) scans the grid array backward from the most recent day, counting consecutive entries greater than 0 until it hits a 0 (or the start of the array). It runs on load and again after every single cell click via updateStreak() — there is no hardcoded or cached streak value anywhere.` },
      { q: 'What happens if I set today\'s cell to "none"?', a: `The streak immediately drops to 0, because computeStreak() starts scanning from the last element of the array and stops at the first zero it finds — if the most recent day is 0, the streak is 0 regardless of how many active days came before it, exactly like a real habit-tracking streak.` },
      { q: 'How do the four intensity levels work?', a: `Each cell holds an integer 0-3. Clicking calls cycleCell(idx), which does (grid[idx] + 1) % 4 to advance it, wrapping back to 0 after 3. The cell's CSS class and its underlying array value are updated together in the same function, so they never drift out of sync.` },
      { q: 'Why are the most recent days seeded as active?', a: `So the demo has a real, non-zero streak visible on first load — otherwise a purely random grid might happen to end on a 0 day and the streak counter would show 0 with nothing to demonstrate. In your real implementation, this would simply be actual user data.` },
      { q: 'How do I persist changes across page loads?', a: `Save the grid array to localStorage (or your backend) inside cycleCell() after updating it, and load it back in place of the seeded generator on page load. The rendering and streak logic work unchanged against any grid array shaped as a flat list of 0-3 values.` },
    ],
    aiPrompt: {
      paragraph: `The interesting part of a habit tracker isn't the grid — it's making sure the streak number is trustworthy, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to trace through computeStreak() to confirm it genuinely recalculates from the grid array on every change rather than incrementing/decrementing a separate counter that could drift out of sync with the actual cell data. It's also worth asking about edge cases: what happens at grid boundaries, whether the streak logic should account for a "grace day" some habit apps allow, or how to extend computeStreak() into a companion function that also finds the longest historical streak (not just the current trailing one) by scanning for the longest run of consecutive non-zero values anywhere in the array. From there, have it help wire the grid to localStorage or a backend so clicks persist across sessions.`,
      prompt: `Build a "habit tracker grid" (GitHub-contributions-style) in plain HTML, CSS, and JavaScript — no dependencies, no CDN.

Requirements:
- Render a grid of cells representing roughly 20 weeks x 7 days (weeks as columns, days as rows), where each cell holds an integer intensity level from 0 (none) to 3 (full), styled with 4 distinct background colors.
- Clicking a cell cycles its level forward (0 -> 1 -> 2 -> 3 -> 0) using modulo arithmetic, updating both the cell's visual class and the underlying data value together.
- Implement a REAL streak-calculation function that takes the grid's flat data array and scans backward from the most recent day, counting consecutive days with intensity > 0, stopping at the first day with intensity 0. Do NOT hardcode the streak number — it must be recalculated by this function every time a cell's value changes, and must correctly drop to 0 if the most recent day is set to "none."
- Show the computed streak number prominently at the top of the card, updating live after every click.
- Include a small 4-swatch legend ("Less" to "More") using the same CSS classes as the grid cells, and light day-of-week labels (e.g. Mon/Wed/Fri) along the left edge.
- Seed the initial data with a reproducible pseudo-random generator so the grid looks organic on load, dark-theme friendly.`,
    },
  },
};

export default habitTrackerGrid;
