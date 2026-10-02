const rankTierBadge = {
  id: 'rank-tier-badge',
  title: 'Competitive Rank Tier Badge',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<section class="rtb-wrap">
  <div class="rtb-card" id="rtbCard">
    <div class="rtb-glow"></div>
    <div class="rtb-emblem" id="rtbEmblem">◆</div>
    <div class="rtb-tier" id="rtbTier">Platinum</div>
    <div class="rtb-points" id="rtbPoints">2,140 RP</div>

    <div class="rtb-progress-track">
      <div class="rtb-progress-fill" id="rtbProgressFill"></div>
    </div>
    <div class="rtb-progress-label" id="rtbProgressLabel">360 RP to Diamond</div>
  </div>

  <div class="rtb-controls">
    <button class="rtb-btn" id="rtbLose">− 150 RP</button>
    <button class="rtb-btn primary" id="rtbGain">+ 150 RP</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#111827,#040609 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.rtb-wrap{display:flex;flex-direction:column;align-items:center;gap:18px}
.rtb-card{position:relative;width:280px;padding:32px 26px 26px;border-radius:20px;background:linear-gradient(160deg,#151d2e,#0a0e18);border:1px solid var(--tier-color,#94a3b8);text-align:center;overflow:hidden;box-shadow:0 0 40px -10px var(--tier-glow,rgba(148,163,184,.4))}
.rtb-glow{position:absolute;inset:-40% -40% auto -40%;height:60%;background:radial-gradient(closest-side,var(--tier-glow,rgba(148,163,184,.35)),transparent);pointer-events:none}
.rtb-emblem{position:relative;font-size:44px;color:var(--tier-color,#94a3b8);text-shadow:0 0 18px var(--tier-glow,rgba(148,163,184,.6));margin-bottom:6px}
.rtb-tier{position:relative;font-size:22px;font-weight:800;letter-spacing:.02em;color:var(--tier-color,#e2e8f0);margin-bottom:2px}
.rtb-points{position:relative;font-size:12.5px;color:#8291a8;margin-bottom:20px}
.rtb-progress-track{position:relative;height:8px;border-radius:99px;background:#0a0e18;border:1px solid rgba(255,255,255,.08);overflow:hidden;margin-bottom:8px}
.rtb-progress-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--tier-color,#94a3b8),var(--tier-glow,#cbd5e1));width:0%;transition:width .5s ease}
.rtb-progress-label{position:relative;font-size:11px;color:#71809a}
.rtb-controls{display:flex;gap:10px}
.rtb-btn{padding:10px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#e5eaf1;font:600 12.5px system-ui;cursor:pointer}
.rtb-btn:hover{background:rgba(255,255,255,.11)}
.rtb-btn.primary{background:linear-gradient(135deg,#60a5fa,#818cf8);border-color:transparent;color:#04121f;font-weight:700}`,

  js: `var card = document.getElementById('rtbCard');
var emblemEl = document.getElementById('rtbEmblem');
var tierEl = document.getElementById('rtbTier');
var pointsEl = document.getElementById('rtbPoints');
var fillEl = document.getElementById('rtbProgressFill');
var labelEl = document.getElementById('rtbProgressLabel');
var gainBtn = document.getElementById('rtbGain');
var loseBtn = document.getElementById('rtbLose');

// Tiers ordered low to high, each with the RP threshold where it BEGINS,
// a color, and a glow color used for the border/emblem/progress bar.
var TIERS = [
  { name: 'Bronze',   min: 0,    color: '#c2793d', glow: 'rgba(194,121,61,.5)',  emblem: '●' },
  { name: 'Silver',   min: 500,  color: '#9ca8b4', glow: 'rgba(156,168,180,.5)', emblem: '■' },
  { name: 'Gold',     min: 1200, color: '#f4c430', glow: 'rgba(244,196,48,.5)',  emblem: '▲' },
  { name: 'Platinum', min: 2000, color: '#5fd6c4', glow: 'rgba(95,214,196,.5)',  emblem: '◆' },
  { name: 'Diamond',  min: 2500, color: '#7dd3fc', glow: 'rgba(125,211,252,.6)', emblem: '✦' },
];

var rp = 2140;

function tierForRp(points) {
  var idx = 0;
  for (var i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].min) idx = i;
  }
  return idx;
}

function render() {
  rp = Math.max(0, rp);
  var idx = tierForRp(rp);
  var tier = TIERS[idx];
  var next = TIERS[idx + 1];

  card.style.setProperty('--tier-color', tier.color);
  card.style.setProperty('--tier-glow', tier.glow);
  emblemEl.textContent = tier.emblem;
  tierEl.textContent = tier.name;
  pointsEl.textContent = rp.toLocaleString() + ' RP';

  if (next) {
    var span = next.min - tier.min;
    var into = rp - tier.min;
    var pct = Math.min(100, Math.max(0, (into / span) * 100));
    fillEl.style.width = pct.toFixed(1) + '%';
    labelEl.textContent = (next.min - rp).toLocaleString() + ' RP to ' + next.name;
  } else {
    // Top tier: no "next" tier exists, so show it as maxed out rather than
    // leaving a stale progress bar or a misleading target.
    fillEl.style.width = '100%';
    labelEl.textContent = 'Highest tier reached';
  }
}

gainBtn.addEventListener('click', function () { rp += 150; render(); });
loseBtn.addEventListener('click', function () {
  rp -= 150;
  render();
});

render();`,

  seo: {
    title: 'Competitive Rank Tier Badge — Free Gaming Rank UI',
    description: `A Bronze-to-Diamond competitive rank badge with a tier-colored glow, live progress bar toward the next tier, and points-remaining readout, all derived from a single ranked-points value. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Competitive Rank Tier Badge — One Points Value Drives Everything',
      description: `This is the rank badge pattern from competitive games and gamified apps — a Bronze-through-Diamond tier name, a tier-colored glow and emblem, and a progress bar toward the next tier with a "points needed" readout. Every part of the badge is derived from a single ranked-points (RP) number, not set independently.

**A table of tier thresholds, not a chain of if/else**

\`TIERS\` is an ordered array of \`{ name, min, color, glow, emblem }\` objects, where \`min\` is the RP value at which that tier begins. \`tierForRp(points)\` walks the list and keeps the *last* tier whose \`min\` the current points meet or exceed — a small, readable loop that scales cleanly to any number of tiers without a growing if/else chain, and makes adding a new tier (say, an "Ascendant" tier above Diamond) a one-line array addition.

**Colors driven by CSS custom properties**

Rather than toggle classes per tier, the current tier's \`color\` and \`glow\` are written onto the card as CSS custom properties (\`--tier-color\`, \`--tier-glow\`) via \`style.setProperty()\`. Every visual element that needs the tier color — the border, the box-shadow glow, the emblem, the tier name text, and the progress bar's gradient — reads from those same two properties, so the whole badge re-themes instantly and consistently with a single JS write.

**A progress bar computed from real thresholds**

The bar's fill percentage is \`(currentRP - currentTierMin) / (nextTierMin - currentTierMin) * 100\` — the share of the *current tier's own point range* that's been completed, not a share of some arbitrary max. The label reads \`nextTierMin - currentRP\`, the exact number of points still needed, recalculated fresh every time RP changes.

**The top-tier edge case, handled explicitly**

At the highest tier (Diamond here), there's no "next tier" to progress toward. Rather than let the math produce \`NaN\` or a stale bar, the code explicitly detects the missing next tier, fills the bar to 100%, and swaps the label to "Highest tier reached" — an honest terminal state instead of a broken-looking one. Pair this with an [activity rings](/ui-snippets/activity-rings/) or [gradient stat ring](/ui-snippets/gradient-stat-ring/) card for a fuller player-profile dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A Platinum-tier badge renders with sample RP.` },
      { title: 'Click "+ 150 RP"', text: `Watch the progress bar and points-needed label update.` },
      { title: 'Cross a tier threshold', text: `The badge's color, glow, and emblem swap automatically.` },
      { title: 'Reach Diamond', text: `The bar fills to 100% and shows "Highest tier reached".` },
      { title: 'Click "− 150 RP"', text: `Confirm the badge can also demote correctly.` },
      { title: 'Edit TIERS', text: `Add, remove, or re-threshold tiers freely.` },
    ] },
    features: [
      { title: 'Single-source RP value', text: `Every visual element derives from one number.` },
      { title: 'Table-driven tiers', text: `An ordered array, not a nested if/else chain.` },
      { title: 'CSS custom property theming', text: `One JS write re-colors the whole card.` },
      { title: 'Real threshold-based progress', text: `Bar fill and label computed from actual tier ranges.` },
      { title: 'Handles the top tier', text: `Explicit "highest tier reached" terminal state.` },
      { title: 'Tier-colored glow', text: `box-shadow and radial gradient read the same variable.` },
      { title: 'Locale-formatted points', text: `toLocaleString() for large RP values.` },
      { title: 'Easily extended', text: `Add a new tier with one array entry.` },
    ],
    useCases: [
      { title: 'Competitive game profiles', text: 'Show a ranked-mode badge from Bronze to Diamond, with the glow, emblem and progress bar all derived from one ranked-points value.' },
      { title: 'Gamified learning apps', text: 'Pair with [activity rings](/ui-snippets/activity-rings/) so a learner sees both daily streak progress and their overall tier, with points needed shown for the next one.' },
      { title: 'Loyalty and rewards tiers', text: 'Map spend to Bronze through Diamond status, using a table-driven array of tiers instead of a nested if-else chain.' },
      { title: 'Esports leaderboard rows', text: 'Display each player\'s rank next to their stats, with one JavaScript write to a CSS custom property recolouring the whole card.' },
      { title: 'Sales rep performance tiers', text: 'Combine with a [gradient stat ring](/ui-snippets/gradient-stat-ring/) for fitness or sales gamification, where real threshold ranges decide the bar fill.' },
    ],
    faqs: [
      { q: 'How does the badge know which tier the current RP belongs to?', a: `TIERS is an ordered array of objects each with a min RP threshold where that tier begins. tierForRp() walks the array and keeps updating its answer to the last tier whose min the current RP meets or exceeds, so the result is always the highest tier the player has actually reached — no separate if/else chain to keep in sync as tiers are added.` },
      { q: 'How is the progress bar percentage calculated?', a: `It's (currentRP - currentTierMin) / (nextTierMin - currentTierMin) * 100 — the share of the CURRENT tier's own point range that has been completed, not a percentage of some fixed global maximum. That's why the bar always starts near 0% right after a promotion and fills toward 100% as the next tier approaches.` },
      { q: 'What happens at the highest tier, where there is no "next" tier?', a: `The code explicitly checks whether a next tier exists in the TIERS array. If not (i.e. the player is at the top tier), it skips the normal percentage math entirely, sets the bar to a full 100%, and swaps the label to "Highest tier reached" — avoiding a NaN or divide-by-zero result from trying to compute progress toward a tier that doesn't exist.` },
      { q: 'How does one JS update re-color the whole badge at once?', a: `The current tier's color and glow values are written onto the card element as CSS custom properties (--tier-color and --tier-glow) via style.setProperty(). Every element that needs tier coloring — border, glow, emblem, tier name, and progress bar gradient — references those same two custom properties in its CSS, so updating them once updates every dependent style simultaneously.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep rp and the TIERS array as-is (or move TIERS to a constants file), compute the current tier index and next-tier progress with the same tierForRp() logic inside a derived/computed value, and set the CSS custom properties either via an inline style object or a ref's style.setProperty() call in an effect that runs when rp changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why tierForRp() walks the TIERS array keeping the last matching threshold instead of using a chain of if/else statements, and what happens to that logic's correctness if the TIERS array isn't kept sorted by ascending min value. It's also useful for reasoning about the progress bar math — ask why the percentage is computed relative to the current tier's own point range rather than as a percentage of the maximum possible RP. For extensions, ask it to add a promotion celebration animation that fires specifically when rp growth crosses a tier's min threshold (not on every point gain), or to add tier icons as SVGs instead of Unicode glyph characters. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "competitive rank tier badge" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A TIERS array of objects (at least Bronze, Silver, Gold, Platinum, Diamond) each with a name, a min ranked-points (RP) threshold where that tier begins, a color, a glow color, and an emblem character, ordered from lowest to highest threshold.
- A single rp number driving the entire badge. Write a tierForRp(points) function that determines the current tier by finding the highest-threshold tier whose min the points meet or exceed (do not use a manually maintained if/else chain per tier).
- Apply the current tier's color and glow as CSS custom properties (e.g. --tier-color, --tier-glow) on the badge's root element via style.setProperty(), and reference those same two custom properties from CSS for the border color, a box-shadow/glow effect, the emblem color, the tier name text color, and the progress bar's gradient — so a single JS update re-themes the whole badge.
- CRITICAL progress bar logic: compute the fill percentage as (rp - currentTierMin) / (nextTierMin - currentTierMin) * 100 — the share of the CURRENT tier's own RP range completed — and a label showing exactly how many points remain to the next tier, both computed live from rp and the TIERS thresholds, not hardcoded.
- CRITICAL edge case: when rp is in the highest tier (no next tier exists in the array), do not attempt the normal percentage math — instead show the bar at 100% and a clear "Highest tier reached" (or similar) label instead of a broken/NaN result.
- Two buttons that add or subtract RP (e.g. ±150) and re-render the whole badge, demonstrating both promotion (tier increases, color/glow/emblem swap) and demotion (tier decreases) working correctly through the same render function.`,
    },
  },
};

export default rankTierBadge;
