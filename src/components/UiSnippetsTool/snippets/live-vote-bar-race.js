const liveVoteBarRace = {
  id: 'live-vote-bar-race',
  title: 'Live Vote Bar Race',
  lastmod: '2026-08-08',
  category: 'charts',
  html: `<div class="vbr-wrap">
  <div class="vbr-header">
    <span class="vbr-title">Live Poll Results</span>
    <span class="vbr-status" id="vbr-status">
      <span class="vbr-pulse"></span> updating
    </span>
  </div>
  <div class="vbr-bars" id="vbr-bars"></div>
  <div class="vbr-controls">
    <button class="vbr-btn" id="vbr-toggle" type="button">Pause</button>
    <button class="vbr-btn" id="vbr-reset" type="button">Reset</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; padding: 32px; }

.vbr-wrap { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 8px 24px rgba(15,23,42,0.05); }

.vbr-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.vbr-title { font-size: 14px; font-weight: 700; color: #0f172a; }
.vbr-status { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
.vbr-pulse { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: vbr-pulse 1.4s ease-in-out infinite; }
@keyframes vbr-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }

.vbr-bars { position: relative; display: flex; flex-direction: column; gap: 10px; }

.vbr-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.vbr-rank { width: 18px; font-size: 12px; font-weight: 800; color: #94a3b8; text-align: center; flex-shrink: 0; }
.vbr-crown { position: absolute; left: -2px; top: -14px; font-size: 14px; opacity: 0; transform: translateY(4px) scale(0.6); transition: opacity 0.3s, transform 0.3s; }
.vbr-crown.show { opacity: 1; transform: translateY(0) scale(1); }

.vbr-name-col { width: 84px; flex-shrink: 0; font-size: 12.5px; font-weight: 600; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.vbr-track { position: relative; flex: 1; height: 26px; background: #f1f5f9; border-radius: 7px; overflow: hidden; }
.vbr-fill { height: 100%; border-radius: 7px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.vbr-fill-label { font-size: 11px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }

.vbr-controls { display: flex; gap: 8px; margin-top: 16px; }
.vbr-btn { flex: 1; padding: 9px; border-radius: 9px; border: 1.5px solid #e2e8f0; background: #fff; color: #334155; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
.vbr-btn:hover { border-color: #c7d2fe; background: #f8fafc; }`,
  js: `const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4'];

let candidates = [
  { id: 'a', name: 'Aurora', votes: 42 },
  { id: 'b', name: 'Nimbus', votes: 38 },
  { id: 'c', name: 'Solace', votes: 30 },
  { id: 'd', name: 'Vertex', votes: 24 },
  { id: 'e', name: 'Ember', votes: 16 },
];

const barsEl = document.getElementById('vbr-bars');
const toggleBtn = document.getElementById('vbr-toggle');
const resetBtn = document.getElementById('vbr-reset');

let intervalId = null;
let running = true;
let lastLeaderId = null;

function sortedByVotes(list) {
  return [...list].sort((a, b) => b.votes - a.votes);
}

function maxVotes(list) {
  return Math.max(...list.map(c => c.votes), 1);
}

// ---- Initial render: build one DOM row per candidate, once ----
function buildRows() {
  barsEl.innerHTML = '';
  const ranked = sortedByVotes(candidates);
  ranked.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'vbr-row';
    row.dataset.id = c.id;
    row.innerHTML =
      '<span class="vbr-rank">' + (i + 1) + '</span>' +
      '<span class="vbr-crown" data-role="crown">👑</span>' +
      '<span class="vbr-name-col">' + c.name + '</span>' +
      '<div class="vbr-track"><div class="vbr-fill" data-role="fill" style="background:' + COLORS[i % COLORS.length] + '"><span class="vbr-fill-label" data-role="label"></span></div></div>';
    barsEl.appendChild(row);
  });
  updateBars(true);
}

// ---- FLIP reorder ----
// Naively re-sorting the DOM (removing and re-inserting rows in rank order)
// makes every row visually "pop" to its new spot instantly, because the
// browser has no idea a row used to be somewhere else - it just sees a new
// layout. FLIP fixes this: measure every row's position before the reorder
// (First), apply the new order instantly (Last), invert each row with a
// transform so it still LOOKS like it's in its old spot (Invert), then
// transition that transform back to zero (Play) so it visibly glides.
function reorderWithFlip() {
  const rows = Array.from(barsEl.children);
  const first = new Map();
  rows.forEach(row => first.set(row.dataset.id, row.getBoundingClientRect().top));

  const ranked = sortedByVotes(candidates);
  ranked.forEach(c => {
    const row = barsEl.querySelector('[data-id="' + c.id + '"]');
    if (row) barsEl.appendChild(row); // re-insert in new order, no animation yet
  });

  const rowsAfter = Array.from(barsEl.children);
  rowsAfter.forEach(row => {
    const last = row.getBoundingClientRect().top;
    const delta = first.get(row.dataset.id) - last;
    if (delta) {
      row.style.transition = 'none';
      row.style.transform = 'translateY(' + delta + 'px)';
      // force reflow so the inverted transform is registered before Play
      row.getBoundingClientRect();
      row.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      row.style.transform = 'translateY(0)';
    }
  });

  // Update rank numbers to match new order
  rowsAfter.forEach((row, i) => {
    row.querySelector('.vbr-rank').textContent = i + 1;
  });
}

function updateBars(skipCrownAnim) {
  const max = maxVotes(candidates);
  const ranked = sortedByVotes(candidates);
  const leader = ranked[0];

  ranked.forEach(c => {
    const row = barsEl.querySelector('[data-id="' + c.id + '"]');
    if (!row) return;
    const fill = row.querySelector('[data-role="fill"]');
    const label = row.querySelector('[data-role="label"]');
    const crown = row.querySelector('[data-role="crown"]');
    const pct = (c.votes / max) * 100;
    fill.style.width = pct + '%';
    label.textContent = c.votes;
    crown.classList.toggle('show', c.id === leader.id);
  });

  if (!skipCrownAnim && leader.id !== lastLeaderId) {
    const leaderCrown = barsEl.querySelector('[data-id="' + leader.id + '"] [data-role="crown"]');
    if (leaderCrown) {
      leaderCrown.style.animation = 'none';
      // restart a little pop animation on the crown when leadership changes
      requestAnimationFrame(() => {
        leaderCrown.style.transition = 'transform 0.4s cubic-bezier(0.34,1.8,0.64,1)';
        leaderCrown.style.transform = 'translateY(-4px) scale(1.3)';
        setTimeout(() => { leaderCrown.style.transform = 'translateY(0) scale(1)'; }, 220);
      });
    }
  }
  lastLeaderId = leader.id;
}

function tickVotes() {
  candidates = candidates.map(c => ({
    ...c,
    votes: Math.max(0, c.votes + Math.floor(Math.random() * 9) - 3),
  }));
  reorderWithFlip();
  updateBars(false);
}

function start() {
  if (intervalId) return;
  intervalId = setInterval(tickVotes, 1500);
  running = true;
  toggleBtn.textContent = 'Pause';
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
  running = false;
  toggleBtn.textContent = 'Resume';
}

toggleBtn.addEventListener('click', () => {
  if (running) stop(); else start();
});

resetBtn.addEventListener('click', () => {
  candidates = [
    { id: 'a', name: 'Aurora', votes: 42 },
    { id: 'b', name: 'Nimbus', votes: 38 },
    { id: 'c', name: 'Solace', votes: 30 },
    { id: 'd', name: 'Vertex', votes: 24 },
    { id: 'e', name: 'Ember', votes: 16 },
  ];
  lastLeaderId = null;
  buildRows();
});

buildRows();
start();`,
  seo: {
    title: 'Live Vote Bar Race — Free FLIP-Animated Ranking Snippet',
    description: 'A bar-chart-race style ranking that reorders with smooth FLIP animation and a crown for the leader. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Live Vote Bar Race — Animated Ranking Bars That Reorder Smoothly With the FLIP Technique',
      description: `The "bar chart race" format — a set of labeled horizontal bars that grow, shrink, and swap vertical positions as their underlying numbers change over time — has become one of the most recognizable data-visualization formats on social media, used constantly for election results, sports standings, and trending topics. This snippet builds a live, interactive version: five candidates with simulated vote counts that update on a timer, bars that resize smoothly, rows that physically glide past each other when their rank changes, and a small crown animation whenever a new leader takes first place.

**Why naive re-sorting causes a visual "pop"**

The obvious way to reorder a list of DOM rows by rank is to sort the underlying data and re-insert the elements in the new order — \`container.appendChild(row)\` for each row in rank order. The problem is that the browser has no concept of "this row used to be third and is now first" once you do that; it simply computes a new layout and paints it. The result is every reordered row instantly jumping to its new position with zero visible motion — a jarring pop that makes it hard to follow which item moved where, exactly the failure mode a bar-chart race must avoid to be legible.

**FLIP: First, Last, Invert, Play**

The fix is the FLIP technique. **First**: before touching the DOM order, \`reorderWithFlip()\` records every row's current \`top\` position with \`getBoundingClientRect()\`. **Last**: the rows are then actually re-inserted into the container in their new sorted order — a real DOM mutation, causing an instant (invisible, un-animated) jump to the new layout. **Invert**: for each row, the delta between its old \`top\` and its new \`top\` is computed, and that delta is applied as a \`transform: translateY(...)\` — which visually cancels the jump out, making the row *appear* to still be sitting in its old position even though it has already moved in the DOM. **Play**: a CSS transition is enabled and the transform is reset to \`translateY(0)\`, so the browser animates from the inverted (old-looking) position to the true (new) position — which the eye reads as the row smoothly gliding to its new rank, exactly the effect a bar race needs.

**The forced-reflow step is not optional**

Between setting the inverted transform and clearing it, the code calls \`row.getBoundingClientRect()\` again purely to force the browser to compute layout synchronously. Without this, both style writes can get batched into a single paint and the transition has no starting frame to animate from — the row would just silently snap to its final position. This one-line detail is the most common way a from-scratch FLIP implementation silently stops animating.

**Why bar width still uses a plain CSS transition, not FLIP**

Only the *reordering* (vertical position) needs FLIP, because a width change on a single element does not have the "the browser threw away my old position" problem that reordering has — a straightforward \`transition: width 0.5s\` on \`.vbr-fill\` already animates smoothly between two known widths on the same element. FLIP specifically solves the reordering problem, not general-purpose resizing, so this snippet uses the right tool for each of its two moving parts rather than over-engineering the whole thing through FLIP.

**Deriving the crown from the same sorted data, not a separate check**

The trophy/crown only appears on the current \`ranked[0]\` and is shown or hidden via a plain \`classList.toggle('show', c.id === leader.id)\` recomputed every tick — it never has its own independent state. A small pop animation (a scale-and-lift transform, hand-triggered rather than declared as a \`@keyframes\` loop) only fires when \`leader.id !== lastLeaderId\`, so the celebratory bounce plays exactly once per actual leadership change, not on every tick where the same candidate happens to still be winning.

**Simulated data on a timer, structured for a real feed**

\`tickVotes()\` randomly nudges each candidate's vote count and is called from a plain \`setInterval\`; in a production version you would replace the random nudge with data pulled from a WebSocket or polling endpoint and call the same \`reorderWithFlip()\` + \`updateBars()\` pair whenever new numbers arrive — the animation layer is fully decoupled from where the numbers come from.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the bars update automatically', text: 'Every 1.5 seconds each candidate\'s vote count shifts slightly, and the corresponding bar width and number animate smoothly to the new value.' },
      { title: 'Watch rows swap places when rank changes', text: 'When a candidate\'s votes overtake the row above it, both rows visibly glide past each other into their new vertical order rather than jump-cutting — that\'s the FLIP reorder in action.' },
      { title: 'Watch for the crown', text: 'A small crown icon appears above whichever row currently has the most votes, and it plays a quick pop animation the moment leadership changes from one candidate to another.' },
      { title: 'Click Pause', text: 'The update timer stops and the bars freeze at their current values; the button label switches to "Resume".' },
      { title: 'Click Resume', text: 'Updates continue from wherever the vote counts currently stand, on the same 1.5-second interval.' },
      { title: 'Click Reset', text: 'All candidates return to their original starting vote counts and rank order, rebuilding the rows from scratch.' },
    ]},
    features: [
      'FLIP-based row reordering: measured positions, an inverted transform, then a played transition — no jump-cut pops',
      'Forced-reflow step between Invert and Play so the browser always has a frame to animate from',
      'Bar width and vote-count label animate with a plain CSS transition, kept separate from the FLIP reorder logic',
      'Crown indicator derived live from the current leader on every tick, with a one-shot pop animation on leadership change only',
      'Simulated live updates via setInterval, structured so real WebSocket/polling data could drive the identical render path',
      'Pause/Resume toggle that cleanly starts and stops the interval without losing current vote state',
      'Reset restores original data and rebuilds all rows, demonstrating the non-animated initial-build path versus the animated update path',
      'Zero dependencies: FLIP measurements via native getBoundingClientRect(), no animation or charting library',
    ],
    useCases: [
      { icon: 'APP', title: 'Live polls, elections, and audience voting displays', desc: 'Drop in real vote totals from a backend or WebSocket feed to show an audience-facing live ranking during a stream, event, or town-hall style poll, alongside a [poll widget](/ui-snippets/poll-widget) for the actual voting UI.' },
      { icon: 'CHART', title: 'Sports league standings and leaderboard widgets', desc: 'Adapt candidate votes into team points or scores for a live standings widget; compare the FLIP-driven reorder here with the static ranking layout in [leaderboard podium](/ui-snippets/leaderboard-podium) and [leaderboard table](/ui-snippets/leaderboard-table) for different presentation styles.' },
      { icon: 'DASH', title: 'Analytics dashboards showing trending items', desc: 'Reuse the reorder engine for "trending products," "top search terms," or "most active users" widgets where rank naturally shifts as new data streams in, next to a [bar chart](/ui-snippets/bar-chart) for a static comparison view.' },
      { icon: 'LEARN', title: 'Teaching the FLIP animation technique for list reordering', desc: 'A focused, real-world example of FLIP applied specifically to reordering (as opposed to the position-and-size morph FLIP handles in other UI components), useful for understanding the technique before applying it to drag-and-drop lists.' },
      { icon: 'WEB', title: 'Social-media style "bar chart race" embeds', desc: 'Recreate the viral bar-chart-race format as an interactive, embeddable web component instead of a pre-rendered video, letting viewers pause and inspect any moment of the race themselves.' },
      { icon: 'DESIGN', title: 'Design system reference for animated ranked lists', desc: 'Use as a canonical implementation reference anywhere your product needs a ranked list whose order can change live — comment threads by upvotes, leaderboards, or priority queues.' },
      { icon: 'CODE', title: 'Related: Sankey Diagram', desc: 'See the [Sankey Diagram](/ui-snippets/sankey-diagram/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does re-sorting the DOM directly cause a visual "pop" instead of a smooth animation?', a: 'When you remove and re-insert DOM elements in a new order, the browser computes and paints the new layout with no awareness that an element used to be somewhere else — from its perspective, it is just laying out elements at their current positions. There is nothing to animate from, so every reordered row instantly appears at its new position in a single frame, which reads as a jarring pop rather than motion.' },
      { q: 'What exactly does the Invert step in FLIP do, mechanically?', a: 'After the DOM has already been reordered (so every row is sitting at its true new position), Invert computes how far each row moved (new position minus old position) and applies the *opposite* of that as a CSS transform. Because a transform does not affect layout, the row is still occupying its new DOM position for layout purposes, but visually it is offset back to where it used to be. Play then transitions that transform back to zero, which the browser can animate smoothly since it is only animating a transform, not layout.' },
      { q: 'Why is a forced reflow needed between setting the inverted transform and clearing it?', a: 'Browsers batch style writes and only recompute layout/paint when something forces them to, such as reading a layout property like getBoundingClientRect(). Without that forced read in between, both the "apply inverted transform" write and the "clear it back to zero" write can be coalesced into a single paint, meaning the browser never actually renders the inverted (old-looking) frame — the row would just silently snap to its destination with no visible glide.' },
      { q: 'Can I use this bar race in React, Vue, or Angular?', a: 'Yes, with care around where FLIP measurements happen relative to re-renders. In React, measure row positions with refs before updating the sorted state, let React re-render the new order, then in a useLayoutEffect (which runs before paint) apply the inverted transform and immediately trigger the Play transition — useLayoutEffect matters here because a regular useEffect can run after the browser has already painted the un-animated new positions. Clear the setInterval driving simulated updates inside the effect\'s cleanup function. In Vue, do the same measurement-before/apply-after pattern around nextTick and clear the interval in onUnmounted; in Angular, use ngOnDestroy to clear it.' },
      { q: 'How do I feed this from a real backend instead of random simulated votes?', a: 'Replace the random nudge inside tickVotes() with however you receive real data — a WebSocket message handler, a polling fetch() on an interval, or a server-sent event listener — as long as it ends by updating the candidates array with the new vote counts and then calling the same reorderWithFlip() followed by updateBars(false). The animation logic has no dependency on where the numbers came from, only that candidates reflects the latest values before those two functions run.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI assistant like Claude and ask it to trace exactly what reorderWithFlip() does between the First measurement and the Play transition — walking through why the DOM is reordered before the inverted transform is applied (not after) will make FLIP click in a way the acronym alone doesn't. Good extensions to ask for: animating the crown traveling smoothly from the old leader's row to the new leader's row instead of just popping on the new one, adding a subtle color pulse on any bar that just changed rank, or generalizing reorderWithFlip() into a standalone function that could reorder any list of elements, not just this specific bar race.`,
      prompt: `Build a "bar chart race" style live ranking widget in plain HTML, CSS, and JavaScript where ranked horizontal bars reorder smoothly instead of jump-cutting, no libraries.

Requirements:
- A vertical list of labeled horizontal bars, each showing a name, a fill proportional to its current value relative to the maximum, and the numeric value itself.
- Simulate periodic data updates on a setInterval that randomly adjusts each item's value.
- When values change and cause the rank order to shift, reorder the underlying DOM rows using the FLIP technique: before reordering, measure every row's current position with getBoundingClientRect (First); re-insert the rows into the container in the new sorted order, causing an instant unanimated layout jump (Last); for each row, compute the delta between its old and new position and apply it as an inverted CSS transform so it visually appears unmoved (Invert); force a synchronous layout read; then enable a CSS transition and reset the transform to identity so the row animates smoothly from its old-looking position to its true new position (Play).
- Animate each bar's width and displayed number with a normal CSS transition separately from the FLIP reorder logic, since resizing a single element does not need the FLIP technique.
- Show a small trophy or crown indicator on whichever item currently has the highest value, derived fresh from the sorted data on every update, and play a brief pop/bounce animation on it only at the exact moment the leader changes, not on every update.
- Include Pause/Resume controls that stop and restart the update interval without losing the current data, and a Reset control that restores the original starting values and rebuilds the list.
- Explain in code comments why naive DOM re-sorting without FLIP causes a jarring instant pop instead of a smooth animated reorder.`,
    },
  },
};

export default liveVoteBarRace;
