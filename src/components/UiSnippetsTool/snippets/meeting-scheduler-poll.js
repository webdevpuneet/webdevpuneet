const meetingSchedulerPoll = {
  id: 'meeting-scheduler-poll',
  title: 'Meeting Scheduler Poll',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="msp-card">
  <div class="msp-head">
    <h2>Find a time</h2>
    <p>Click the slots that work for you — vote counts update live.</p>
  </div>

  <div class="msp-grid" id="mspGrid">
    <div class="msp-corner"></div>
    <div class="msp-day">Mon 24</div>
    <div class="msp-day">Tue 25</div>
    <div class="msp-day">Wed 26</div>
    <div class="msp-day">Thu 27</div>
  </div>

  <div class="msp-summary" id="mspSummary"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d13;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.msp-card{background:#14161f;border:1px solid #252939;border-radius:18px;padding:22px;width:100%;max-width:460px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.msp-head h2{font-size:16.5px;font-weight:800;color:#f1f5f9}
.msp-head p{font-size:12px;color:#6b7280;margin-top:4px;margin-bottom:16px}

.msp-grid{display:grid;grid-template-columns:52px repeat(4,1fr);gap:5px}
.msp-corner{}
.msp-day{font-size:11px;font-weight:800;color:#9ca3af;text-align:center;padding-bottom:6px}
.msp-time{font-size:10.5px;color:#6b7280;display:flex;align-items:center;justify-content:flex-end;padding-right:6px;font-variant-numeric:tabular-nums}
.msp-cell{position:relative;aspect-ratio:1.3;border-radius:7px;background:#1c2030;border:1px solid #262b3d;cursor:pointer;transition:transform .1s,border-color .15s;display:flex;align-items:center;justify-content:center}
.msp-cell:hover{transform:scale(1.05);border-color:#4338ca}
.msp-cell.picked{border-color:#818cf8;box-shadow:inset 0 0 0 2px #818cf8}
.msp-count{font-size:11px;font-weight:800;color:#e5e7eb;font-variant-numeric:tabular-nums}
.msp-count.zero{color:#4b5566;font-weight:600}
.msp-cell.best::before{content:'\\2605';position:absolute;top:-6px;right:-6px;font-size:11px;color:#fbbf24}

.msp-summary{margin-top:18px;background:rgba(129,140,248,.08);border:1px solid rgba(129,140,248,.22);border-radius:12px;padding:12px 14px;font-size:12.5px;color:#c7d2fe;display:flex;align-items:center;gap:8px}
.msp-summary svg{width:15px;height:15px;flex-shrink:0;color:#818cf8}
.msp-summary b{color:#e0e7ff}`,

  js: `var DAYS = 4;
var TIMES = ['9 AM', '10 AM', '11 AM', '1 PM', '2 PM'];
// votes[timeIndex][dayIndex]
var votes = [
  [2, 4, 1, 0],
  [3, 5, 2, 1],
  [1, 2, 6, 3],
  [4, 3, 2, 5],
  [0, 1, 3, 2],
];
var picked = {};
var MAX_VOTES = 8;

var grid = document.getElementById('mspGrid');
var summary = document.getElementById('mspSummary');

function heat(count) {
  var t = Math.min(count / MAX_VOTES, 1);
  var alpha = 0.08 + t * 0.55;
  return 'rgba(99,102,241,' + alpha.toFixed(2) + ')';
}

function findBest() {
  var best = { t: 0, d: 0, v: -1 };
  for (var t = 0; t < TIMES.length; t++) {
    for (var d = 0; d < DAYS; d++) {
      if (votes[t][d] > best.v) best = { t: t, d: d, v: votes[t][d] };
    }
  }
  return best;
}

function render() {
  var cells = grid.querySelectorAll('.msp-time, .msp-cell');
  cells.forEach(function (c) { c.remove(); });

  var best = findBest();

  TIMES.forEach(function (label, t) {
    var timeEl = document.createElement('div');
    timeEl.className = 'msp-time';
    timeEl.textContent = label;
    grid.appendChild(timeEl);

    for (var d = 0; d < DAYS; d++) {
      var key = t + '-' + d;
      var count = votes[t][d];
      var cell = document.createElement('div');
      cell.className = 'msp-cell' + (picked[key] ? ' picked' : '') + (t === best.t && d === best.d && best.v > 0 ? ' best' : '');
      cell.style.background = heat(count);
      cell.dataset.key = key;
      cell.innerHTML = '<span class="msp-count' + (count === 0 ? ' zero' : '') + '">' + count + '</span>';
      grid.appendChild(cell);
    }
  });

  var bestLabel = TIMES[best.t] + ' on ' + grid.querySelectorAll('.msp-day')[best.d].textContent;
  summary.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>' +
    (best.v > 0 ? 'Best time so far: <b>' + bestLabel + '</b> with ' + best.v + ' votes' : 'No votes yet — click a slot to get started');
}

grid.addEventListener('click', function (e) {
  var cell = e.target.closest('.msp-cell');
  if (!cell) return;
  var key = cell.dataset.key;
  var parts = key.split('-');
  var t = parseInt(parts[0], 10), d = parseInt(parts[1], 10);
  if (picked[key]) {
    votes[t][d] = Math.max(0, votes[t][d] - 1);
    delete picked[key];
  } else {
    votes[t][d] += 1;
    picked[key] = true;
  }
  render();
});

render();`,

  seo: {
    title: 'Meeting Scheduler Poll — Free HTML CSS JS Snippet',
    description: `A When2meet-style "find a time" poll grid with toggleable slots, live heat-colored vote counts, and a best-time summary. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Meeting Scheduler Poll — Toggleable Time-Slot Grid With Heat-Colored Votes',
      description: `Scheduling a meeting across several people usually turns into an email thread of proposed times and half-answers. The meeting scheduler poll fixes that with the pattern popularized by When2meet and Doodle: lay out every candidate day and time as a grid, let people click the slots that work for them, and let the vote counts and color intensity do the summarizing. This snippet builds that grid in plain HTML, CSS, and vanilla JavaScript. Pair it with [availability scheduler](/ui-snippets/availability-scheduler/) or [poll widget](/ui-snippets/poll-widget/) for related scheduling and voting patterns.

**A vote matrix, not a list**

Votes are stored as a 2D array indexed by time row and day column — \`votes[timeIndex][dayIndex]\` — which mirrors exactly how the grid is laid out visually. This makes the mapping between data and UI direct: rendering is just iterating the same two dimensions the grid already has, and looking up "how many people are free Tuesday at 10am" is a single array access rather than a search.

**Heat intensity instead of a bare number**

Each cell's background opacity scales with its vote count relative to a configurable maximum, so the grid reads like a heatmap at a glance — busy, popular slots glow brighter without anyone needing to read every number individually. The exact count still sits inside the cell for precision, but the color does the first pass of communication, the same principle behind a [heatmap matrix](/ui-snippets/heatmap-matrix/).

**Toggleable, not just clickable**

Clicking a cell adds your vote and marks it "picked" with a highlighted border; clicking it again removes your vote and un-marks it. This models the real behavior people expect from an availability poll — you're allowed to change your mind about a slot without leaving a phantom vote behind, and the visual "picked" ring makes it obvious which cells you personally have selected versus ones that are merely popular with others.

**A summary that updates itself**

\`findBest()\` scans the entire vote matrix on every render to find the single highest-voted slot, marks it with a star in the grid, and writes a one-line summary ("Best time so far: Tue 25 at 10 AM with 5 votes") beneath the grid. Because this recomputes from the live vote data every time, the summary can never fall out of sync with the grid — there's no separate "winner" state to update by hand.

**Scaling it up**

For a real poll, replace the static \`votes\` matrix with data fetched from your backend, and send each toggle as a vote/unvote request tied to the current user rather than mutating a shared array directly (so one person's clicks don't silently overwrite another's). The day/time labels, grid dimensions, and \`MAX_VOTES\` heat scale are all easy to make configurable for a longer scheduling window.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 4-day by 5-time-slot grid renders with pre-seeded vote counts and heat colors.` },
      { title: 'Click a slot', text: `Your vote is added, the cell brightens, and a highlighted ring marks it as picked.` },
      { title: 'Click it again', text: `Your vote is removed and the ring disappears — you're free to change your mind.` },
      { title: 'Watch the star', text: `The current highest-voted slot gets a star marker in the grid.` },
      { title: 'Read the summary', text: `The line below the grid always names the current best time and its vote count.` },
      { title: 'Extend the grid', text: `Change DAYS, TIMES, or MAX_VOTES to fit a different scheduling window.` },
    ] },
    features: [
      { title: '2D vote matrix', text: `Votes are stored indexed exactly like the grid, keeping data and UI directly mapped.` },
      { title: 'Heat-intensity cells', text: `Background opacity scales with vote count so popular slots glow without reading numbers.` },
      { title: 'Toggleable voting', text: `Clicking a slot adds a vote; clicking again removes it, with a visible picked ring.` },
      { title: 'Auto-computed best slot', text: `findBest() scans the live matrix every render — the summary can never drift from the grid.` },
      { title: 'Star marker on the leader', text: `The current top slot is flagged directly in the grid, not just in the text summary.` },
      { title: 'Zero-vote dimming', text: `Empty slots show a muted count so busy and quiet times are easy to tell apart.` },
      { title: 'Configurable grid size', text: `DAYS, TIMES, and MAX_VOTES are simple constants to extend the scheduling window.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no charting or scheduling library required.` },
    ],
    useCases: [
      { title: 'Team meeting scheduling', text: `Find a slot that works across a distributed team without an email back-and-forth.` },
      { title: 'Interview or event coordination', text: `Poll candidates or attendees on which time windows they can make.` },
      { title: 'Recurring standup planning', text: `Combine with a [calendar widget](/ui-snippets/calendar-widget/) to pick a recurring slot from real availability.` },
      { title: 'Group availability collection', text: `Pair with an [availability scheduler](/ui-snippets/availability-scheduler/) for a fuller booking flow once a time is chosen.` },
      { title: 'Class or workshop scheduling', text: `Let students or attendees vote on session times that fit their schedules.` },
      { title: 'General voting and consensus UI', text: `A reference implementation alongside a [poll widget](/ui-snippets/poll-widget/) for any grid-shaped voting problem.` },
      { icon: 'CODE', title: 'Related: Shipping Address Form — Live Validation Error Summary', desc: 'See the [Shipping Address Form — Live Validation Error Summary](/ui-snippets/shipping-form-error-summary-panel/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the heat color relate to the vote count?', a: `Each cell's background opacity is calculated from its vote count divided by a configurable MAX_VOTES ceiling, clamped to 1. A slot with zero votes is nearly transparent; one at or above MAX_VOTES renders at full intensity. This gives a continuous visual gradient rather than a few hard color buckets, so relative popularity is visible even between two moderately-voted slots.` },
      { q: 'Can I vote for multiple slots and change my mind?', a: `Yes — clicking any slot toggles your vote on it independently of every other slot, and clicking a picked slot again removes just that vote. There's no limit on how many slots one person can mark as workable, which matches how real "find a time" polls are meant to be used: mark everything that could work, not just one preference.` },
      { q: 'How is the best time determined?', a: `findBest() iterates the entire votes matrix on every render and keeps the highest count it finds, defaulting to the first cell if every slot is tied at zero. Because this runs fresh each render rather than being tracked incrementally, the star marker and the summary text are always consistent with the actual current vote data.` },
      { q: 'How do I make this a real multi-person poll?', a: `Replace the local votes array with data fetched from your backend, and instead of mutating votes[t][d] directly in the click handler, send a vote/unvote request scoped to the current user and slot. On success, update the local matrix with the server's authoritative counts (or re-fetch) so concurrent voters don't silently overwrite each other's clicks.` },
      { q: 'How do I use this scheduler poll in React, Vue, or Angular?', a: `Model votes as state (an array of arrays, or a flatter map keyed by "day-time"), and derive the heat color, the picked class, and the best-slot star from that state with computed values. Handle the click as a state update rather than direct array mutation and re-render declaratively — the grid layout and heat-color logic port over directly.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the heat-scaling or best-slot logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the vote count is mapped to a background opacity to create the heatmap effect, and why findBest() recomputing from the live matrix on every render is what keeps the star marker and the summary text from ever disagreeing with the grid. The same assistant can help you optimize it — ask whether rebuilding every cell's DOM node on each render is necessary for a small grid like this versus patching just the changed cell. It's also useful for extending the poll: ask it to add per-person tooltips showing who voted for a slot, support a longer date range with horizontal scrolling, or persist votes to a backend so multiple real people can vote concurrently. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "find a time" meeting scheduler poll in plain HTML, CSS, and JavaScript, in the style of When2meet/Doodle — no frameworks or libraries.

Requirements:
- Render a grid with days as columns and time slots as rows, where each intersection cell is clickable and shows a live vote count for that specific day/time combination, stored in a 2D data structure indexed the same way as the grid (time index, then day index) so data and layout stay directly mapped.
- Give each cell a background color whose intensity (opacity or lightness) scales continuously with its vote count relative to a configurable maximum, so the grid reads as a heatmap at a glance in addition to showing the exact number inside each cell.
- Make voting toggleable per cell: clicking an unvoted cell increments its count and visually marks it as "picked" by the current user (e.g. a highlighted border ring); clicking an already-picked cell decrements its count and removes the picked marking. A user must be able to pick any number of cells, not just one.
- Compute the single highest-voted cell fresh on every render by scanning the actual vote data (not a separately tracked "winner" variable), visually flag that cell in the grid (e.g. a small star), and show a one-line text summary below the grid naming that day, time, and vote count — falling back to a neutral "no votes yet" message when every cell is at zero.
- Visually distinguish zero-vote cells (e.g. a dimmed count) from cells with at least one vote, so an empty grid doesn't look identical to a lightly-voted one.
- Keep the grid dimensions and vote-count-to-heat scale as simple, easily changed constants so the poll can be extended to more days or time slots.`,
    },
  },
};

export default meetingSchedulerPoll;
