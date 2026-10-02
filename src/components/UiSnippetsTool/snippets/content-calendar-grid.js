const contentCalendarGrid = {
  id: 'content-calendar-grid',
  title: 'Content Calendar Grid',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="ccg-card">
  <div class="ccg-head">
    <h3>Content calendar</h3>
    <span class="ccg-month" id="ccgMonth">August 2026</span>
  </div>

  <div class="ccg-legend">
    <span><i class="ccg-dot ccg-blog"></i>Blog</span>
    <span><i class="ccg-dot ccg-social"></i>Social</span>
    <span><i class="ccg-dot ccg-email"></i>Email</span>
  </div>

  <div class="ccg-weekdays">
    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
  </div>
  <div class="ccg-grid" id="ccgGrid"></div>

  <div class="ccg-panel" id="ccgPanel" hidden>
    <div class="ccg-panel-head">
      <h4 id="ccgPanelDate">August 12</h4>
      <button type="button" id="ccgPanelClose" aria-label="Close">&times;</button>
    </div>
    <div class="ccg-panel-list" id="ccgPanelList"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ccg-card{background:#101521;border:1px solid #1e2536;border-radius:18px;padding:22px;width:100%;max-width:480px;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.ccg-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.ccg-head h3{font-size:16px;font-weight:800;color:#eef1fa}
.ccg-month{font-size:12px;color:#7580a0;font-weight:700}

.ccg-legend{display:flex;gap:14px;margin-bottom:16px}
.ccg-legend span{display:flex;align-items:center;gap:6px;font-size:11px;color:#8790ac;font-weight:700}
.ccg-dot{width:7px;height:7px;border-radius:999px;display:inline-block}
.ccg-blog{background:#818cf8}
.ccg-social{background:#4ade80}
.ccg-email{background:#fb923c}

.ccg-weekdays{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:6px}
.ccg-weekdays span{font-size:10px;text-transform:uppercase;letter-spacing:.03em;color:#576079;text-align:center;font-weight:700}

.ccg-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.ccg-day{aspect-ratio:1/1;background:#151b28;border:1px solid #1e2536;border-radius:9px;padding:5px;display:flex;flex-direction:column;gap:3px;cursor:pointer;transition:border-color .15s,background .15s;overflow:hidden}
.ccg-day:hover{border-color:#333f5c;background:#191f2e}
.ccg-day.is-empty{visibility:hidden;cursor:default}
.ccg-day.is-today{border-color:#818cf8}
.ccg-day.is-active{border-color:#a5b4fc;background:#1b2338}
.ccg-day-num{font-size:10.5px;font-weight:700;color:#9aa4bf}
.ccg-day.is-today .ccg-day-num{color:#a5b4fc}
.ccg-chips{display:flex;flex-direction:column;gap:2px}
.ccg-chip{font-size:8.5px;font-weight:700;padding:1.5px 4px;border-radius:4px;color:#0b0d14;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ccg-chip.ccg-blog{background:#818cf8;color:#0b0d14}
.ccg-chip.ccg-social{background:#4ade80;color:#06180d}
.ccg-chip.ccg-email{background:#fb923c;color:#1a0d02}
.ccg-more{font-size:8.5px;font-weight:700;color:#576079}

.ccg-panel{margin-top:16px;padding:14px 15px;background:#0c1019;border:1px solid #1e2536;border-radius:12px}
.ccg-panel[hidden]{display:none}
.ccg-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.ccg-panel-head h4{font-size:13.5px;font-weight:800;color:#eef1fa}
.ccg-panel-head button{background:none;border:none;color:#576079;font-size:16px;cursor:pointer;line-height:1}
.ccg-panel-head button:hover{color:#a5b4fc}
.ccg-panel-list{display:flex;flex-direction:column;gap:7px}
.ccg-panel-row{display:flex;align-items:center;gap:9px;font-size:12px;color:#c7cee0}
.ccg-panel-row .ccg-dot{width:8px;height:8px;flex-shrink:0}
.ccg-panel-type{font-size:9.5px;font-weight:800;text-transform:uppercase;color:#576079;letter-spacing:.03em}`,

  js: `var MONTH_LABEL = 'August 2026';
var DAYS_IN_MONTH = 31;
var START_WEEKDAY = 6; // Aug 1, 2026 falls on a Saturday (0=Sun..6=Sat)

var TYPE_LABEL = { blog: 'Blog', social: 'Social', email: 'Email' };

var POSTS = {
  3:  [{ type: 'social', title: 'Product teaser reel' }],
  5:  [{ type: 'blog', title: 'How we built the new dashboard' }],
  7:  [{ type: 'email', title: 'Weekly digest #34' }, { type: 'social', title: 'Behind the scenes' }],
  12: [{ type: 'blog', title: 'Q3 feature roundup' }, { type: 'social', title: 'Launch countdown' }, { type: 'email', title: 'Customer spotlight' }],
  14: [{ type: 'social', title: 'Poll: what should we build next' }],
  18: [{ type: 'email', title: 'Monthly newsletter' }],
  20: [{ type: 'blog', title: 'Engineering deep dive: caching' }, { type: 'social', title: 'Team AMA announcement' }],
  22: [{ type: 'social', title: 'Customer testimonial clip' }],
  25: [{ type: 'blog', title: 'Roadmap update' }, { type: 'email', title: 'Beta invite wave 2' }, { type: 'social', title: 'Countdown: 3 days' }],
  28: [{ type: 'email', title: 'End of month recap' }],
};

var gridEl = document.getElementById('ccgGrid');
var monthEl = document.getElementById('ccgMonth');
var panelEl = document.getElementById('ccgPanel');
var panelDateEl = document.getElementById('ccgPanelDate');
var panelListEl = document.getElementById('ccgPanelList');
var panelCloseBtn = document.getElementById('ccgPanelClose');

var activeDay = null;

function renderGrid() {
  monthEl.textContent = MONTH_LABEL;
  var cells = [];

  for (var i = 0; i < START_WEEKDAY; i++) {
    cells.push('<div class="ccg-day is-empty"></div>');
  }

  for (var day = 1; day <= DAYS_IN_MONTH; day++) {
    var posts = POSTS[day] || [];
    var visible = posts.slice(0, 2);
    var overflow = posts.length - visible.length;

    var chipsHtml = visible.map(function (p) {
      return '<span class="ccg-chip ccg-' + p.type + '">' + p.title + '</span>';
    }).join('');
    if (overflow > 0) {
      chipsHtml += '<span class="ccg-more">+' + overflow + ' more</span>';
    }

    cells.push(
      '<div class="ccg-day" data-day="' + day + '">' +
        '<span class="ccg-day-num">' + day + '</span>' +
        '<div class="ccg-chips">' + chipsHtml + '</div>' +
      '</div>'
    );
  }

  gridEl.innerHTML = cells.join('');
}

function showDay(day) {
  var posts = POSTS[day] || [];
  activeDay = day;

  gridEl.querySelectorAll('.ccg-day').forEach(function (el) {
    el.classList.toggle('is-active', Number(el.dataset.day) === day);
  });

  panelDateEl.textContent = 'August ' + day;

  if (posts.length === 0) {
    panelListEl.innerHTML = '<p style="font-size:12px;color:#576079">No content scheduled this day.</p>';
  } else {
    panelListEl.innerHTML = posts.map(function (p) {
      return '<div class="ccg-panel-row">' +
        '<i class="ccg-dot ccg-' + p.type + '"></i>' +
        '<span class="ccg-panel-type">' + TYPE_LABEL[p.type] + '</span>' +
        '<span>' + p.title + '</span>' +
      '</div>';
    }).join('');
  }

  panelEl.hidden = false;
}

gridEl.addEventListener('click', function (e) {
  var cell = e.target.closest('.ccg-day');
  if (!cell || cell.classList.contains('is-empty')) return;
  showDay(Number(cell.dataset.day));
});

panelCloseBtn.addEventListener('click', function () {
  panelEl.hidden = true;
  gridEl.querySelectorAll('.ccg-day').forEach(function (el) { el.classList.remove('is-active'); });
  activeDay = null;
});

renderGrid();`,

  seo: {
    title: 'Content Calendar Grid — Free Month-View Content Planner (HTML/CSS/JS)',
    description: `A month-view content calendar with colored post-type chips, overflow "+N more" on busy days, and a click-through day detail panel. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Content Calendar Grid — Month View With Colored Chips and a Day Detail Panel',
      description: `Marketing teams plan across multiple content types — blog posts, social updates, email sends — and a shared month view is the fastest way to see the whole publishing cadence at a glance. This snippet builds that content calendar in plain HTML, CSS, and vanilla JavaScript: a 7-column month grid, up to two colored chips per day with graceful overflow, and a click-through panel showing everything scheduled on a given day.

**A month grid built from two numbers**

The grid is generated from just \`DAYS_IN_MONTH\` and \`START_WEEKDAY\` (which weekday the 1st falls on) — \`renderGrid()\` pads the front of the grid with invisible empty cells so day 1 lands in the correct weekday column, then renders one cell per day of the month. This is the same technique any calendar UI needs, and it's isolated in one small loop rather than tangled into the rendering of each day's content.

**Type-coded chips with honest overflow**

Each day's scheduled posts are stored as an array under that day's number in a \`POSTS\` lookup object. A day cell shows at most its first two posts as small colored chips — indigo for blog, green for social, orange for email — and if more exist, a "+N more" label makes the overflow explicit instead of silently hiding it or awkwardly shrinking chips to fit. The chip color and its label both come from the same \`type\` field, so a chip can never be colored inconsistently with what it says.

**Click a day, see everything**

Clicking any day cell opens a detail panel below the grid listing every post scheduled that day — not just the two visible chips — each with its type dot, type label, and title. The clicked cell gets a distinct active outline so it's clear which day the panel is describing, and a close button collapses the panel and clears that highlight.

**Where it fits**

Pair it with a [calendar widget](/ui-snippets/calendar-widget/) for a date-picker use case, a [schedule table](/ui-snippets/schedule-table/) for a list-based alternative view of the same data, or a [gantt table](/ui-snippets/gantt-table/) for longer-running campaign timelines alongside daily content.

**Customizing it**

Swap in real dates computed from the actual current month (rather than the hardcoded August 2026 example), add drag-to-reschedule, or extend the \`POSTS\` lookup with status (draft/scheduled/published) so chips can also communicate publishing state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An August 2026 month grid renders with colored post chips on scheduled days.` },
      { title: 'Scan the legend', text: `Blog is indigo, social is green, email is orange.` },
      { title: 'Spot a busy day', text: `Days with 3+ posts show two chips plus a "+N more" label.` },
      { title: 'Click any day', text: `A detail panel opens below listing every post scheduled that day.` },
      { title: 'Click another day', text: `The active highlight moves and the panel updates to the new day.` },
      { title: 'Close the panel', text: `Click the × to collapse it and clear the active-day highlight.` },
    ] },
    features: [
      { title: 'Two-number month generation', text: `Grid padding and day count derive from just days-in-month and start weekday.` },
      { title: 'Type-coded chips', text: `Blog, social, and email each get a consistent color across chips, dots, and labels.` },
      { title: 'Honest overflow', text: `Busy days show a "+N more" label instead of hiding or cramming extra posts.` },
      { title: 'Click-through day panel', text: `Selecting a day reveals its full post list, not just the two visible chips.` },
      { title: 'Active-day highlight', text: `The selected cell stays visibly distinct while its panel is open.` },
      { title: 'Data-driven schedule', text: `One POSTS lookup object drives every chip, the overflow count, and the panel.` },
      { title: 'Legend included', text: `A color key sits above the grid so chip meaning is never ambiguous.` },
      { title: 'Framework-agnostic core', text: `The grid-generation and day-lookup logic port directly to any component model.` },
    ],
    useCases: [
      { title: 'Marketing content planning', text: 'Plan blog, social and email sends on one month grid, with each content type keeping a consistent colour across chips, dots and the detail panel.' },
      { title: 'Editorial schedule overviews', text: 'Pair with a [schedule table](/ui-snippets/schedule-table/) so editors can see the month visually and then work through the same items in a sortable list.' },
      { title: 'Campaign timeline dashboards', text: 'Combine with a [gantt table](/ui-snippets/gantt-table/) to show launch dates in context, while busy days display an honest +N more label.' },
      { title: 'Social media schedulers', text: 'Give a lightweight monthly overview of queued posts, with the click-through panel revealing every post on a day, not only the two that fit.' },
      { title: 'Day-selection interfaces', text: 'Adapt the day-click pattern from the [calendar widget](/ui-snippets/calendar-widget/), where grid padding and day count derive from just two numbers.' },
      { icon: 'CODE', title: 'Related: Deployment Pipeline Stage Tracker', desc: 'See the [Deployment Pipeline Stage Tracker](/ui-snippets/deployment-pipeline-stage-tracker/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the grid know where the 1st of the month falls?', a: `A START_WEEKDAY constant (0 for Sunday through 6 for Saturday) tells renderGrid() how many empty, invisible padding cells to render before day 1, so day 1 lands in the correct weekday column. Combined with DAYS_IN_MONTH, that's all the grid needs to lay out any month correctly.` },
      { q: 'Why do busy days show "+N more" instead of all their chips?', a: `Each day cell only has room for two chips before it gets cramped or the aspect-ratio square overflows. Rather than shrinking chips illegibly or silently dropping extra posts, the third-and-beyond posts are summarized as a "+N more" label — clicking the day still reveals the complete list in the detail panel.` },
      { q: 'How is a post color decided?', a: `Every post object has a type field ("blog", "social", or "email"), and both its chip and its dot in the detail panel apply a CSS class built directly from that field (ccg-blog, ccg-social, ccg-email). Because the chip and the panel row read the same type value, a post's color is always consistent wherever it appears.` },
      { q: 'What happens when I click a day with no scheduled posts?', a: `The detail panel still opens (so clicking any day is a consistent interaction) but shows a plain "No content scheduled this day" message instead of an empty list, so it's clear the day was intentionally checked and simply has nothing planned.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move POSTS and activeDay into component state, and derive the grid cells and the panel's post list with a map/computed property instead of manual innerHTML writes. The month-padding calculation (empty cells before day 1) and the overflow-count logic are pure and port over unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the month-grid math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how START_WEEKDAY and DAYS_IN_MONTH combine in renderGrid() to pad the grid so day 1 always lands in the correct weekday column, and why each day's chips and detail-panel rows read color from the same type field instead of two separate color assignments that could drift apart. The same assistant can help you make it dynamic — ask it to compute DAYS_IN_MONTH and START_WEEKDAY from a real JavaScript Date object for the current month instead of hardcoded constants, and to add "previous month" / "next month" navigation that regenerates the grid. It's also useful for extending the data model: ask it to add a draft/scheduled/published status to each post that shows as a secondary indicator on the chip, or to make chips draggable between days to reschedule content. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a month-view "content calendar" grid in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Render a standard 7-column (Sunday-Saturday) month grid for a given month, using a days-in-month count and a start-weekday value to correctly pad empty cells before day 1 so it lands in the right weekday column.
- Store scheduled content in a lookup object keyed by day number, where each day can have zero or more post objects, each with a "type" (e.g. blog, social, email) and a title.
- Each day cell should render up to 2 small colored chips (one per scheduled post, color-coded consistently by type — a different color for each of at least 3 content types) and, if a day has more than 2 posts, an honest "+N more" indicator rather than hiding or cramming the extras.
- Include a color-coded legend above the grid explaining what each chip color means.
- Clicking any day cell must open a detail panel (below or beside the grid) listing every post scheduled that day — including ones not visible as chips — each showing its type and title, and must visually mark that day cell as the active/selected one.
- Clicking a different day updates the panel and moves the active-day highlight; a close control collapses the panel and clears the highlight.
- Days with zero scheduled posts should still be clickable and show a clear "nothing scheduled" message in the panel rather than an empty list.`,
    },
  },
};

export default contentCalendarGrid;
