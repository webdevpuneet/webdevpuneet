const loyaltyTierProgress = {
  id: 'loyalty-tier-progress',
  title: 'Loyalty Program Tier Progress',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="ltp-wrap">
  <div class="ltp-card">
    <div class="ltp-head">
      <div>
        <span class="ltp-eyebrow">Current tier</span>
        <h2 id="ltpTierName">Silver</h2>
      </div>
      <div class="ltp-badge" id="ltpBadge">🥈</div>
    </div>

    <div class="ltp-points-row">
      <span id="ltpPointsEarned">2,340</span>
      <span class="ltp-points-label">points this cycle</span>
    </div>

    <div class="ltp-progress-head">
      <span id="ltpNextLabel">1,160 pts to Gold</span>
      <span id="ltpPct">67%</span>
    </div>
    <div class="ltp-track"><div class="ltp-fill" id="ltpFill"></div></div>

    <div class="ltp-demo-controls">
      <label for="ltpSlider">Simulate points earned</label>
      <input type="range" id="ltpSlider" min="0" max="12000" value="2340" step="10">
    </div>

    <div class="ltp-tiers" id="ltpTiers"></div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a1424,#06040a 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.ltp-wrap{width:100%;max-width:420px}
.ltp-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:22px}
.ltp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.ltp-eyebrow{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9d8fc7;margin-bottom:3px}
.ltp-head h2{font-size:24px;font-weight:800;letter-spacing:-.02em}
.ltp-badge{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:22px}
.ltp-points-row{display:flex;align-items:baseline;gap:7px;margin-bottom:18px}
.ltp-points-row>span:first-child{font-size:28px;font-weight:800;font-variant-numeric:tabular-nums}
.ltp-points-label{font-size:12.5px;color:#a99fc9;font-weight:600}
.ltp-progress-head{display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#c7bfe0;margin-bottom:7px}
.ltp-track{height:9px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:18px}
.ltp-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#a78bfa,#f472b6);transition:width .4s cubic-bezier(.34,1.2,.4,1)}
.ltp-demo-controls{margin-bottom:20px;padding:12px;border-radius:10px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.13)}
.ltp-demo-controls label{display:block;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#8b7fac;margin-bottom:8px}
.ltp-demo-controls input{width:100%;accent-color:#a78bfa}
.ltp-tiers{display:flex;flex-direction:column;gap:8px}
.ltp-tier-row{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);transition:border-color .2s,background .2s}
.ltp-tier-row.active{border-color:rgba(167,139,250,.5);background:rgba(167,139,250,.1)}
.ltp-tier-icon{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;background:rgba(255,255,255,.06)}
.ltp-tier-info{flex:1;min-width:0}
.ltp-tier-info strong{display:block;font-size:12.5px;font-weight:800}
.ltp-tier-info span{display:block;font-size:11px;color:#9a92b8;margin-top:1px}
.ltp-tier-range{font-size:10.5px;font-weight:700;color:#8b7fac;font-variant-numeric:tabular-nums;text-align:right;flex-shrink:0}
.ltp-tier-row.active .ltp-tier-range{color:#c7bfe0}`,

  js: `var slider = document.getElementById('ltpSlider');
var tierNameEl = document.getElementById('ltpTierName');
var badgeEl = document.getElementById('ltpBadge');
var pointsEarnedEl = document.getElementById('ltpPointsEarned');
var nextLabelEl = document.getElementById('ltpNextLabel');
var pctEl = document.getElementById('ltpPct');
var fillEl = document.getElementById('ltpFill');
var tiersEl = document.getElementById('ltpTiers');

var TIERS = [
  { name: 'Bronze', min: 0,     icon: '🥉', benefit: 'Free standard shipping' },
  { name: 'Silver', min: 1500,  icon: '🥈', benefit: '2x points on every order' },
  { name: 'Gold',   min: 3500,  icon: '🥇', benefit: 'Early access + free returns' },
  { name: 'Platinum', min: 7000, icon: '💎', benefit: 'Dedicated concierge support' },
  { name: 'Diamond', min: 12000, icon: '👑', benefit: 'Annual travel credit + all perks' }
];

function tierIndexFor(points) {
  var idx = 0;
  for (var i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].min) idx = i;
  }
  return idx;
}

function formatNum(n) { return n.toLocaleString(); }

function render(points) {
  var idx = tierIndexFor(points);
  var current = TIERS[idx];
  var next = TIERS[idx + 1];

  tierNameEl.textContent = current.name;
  badgeEl.textContent = current.icon;
  pointsEarnedEl.textContent = formatNum(points);

  if (next) {
    var span = next.min - current.min;
    var into = points - current.min;
    var pct = Math.min(100, Math.max(0, (into / span) * 100));
    fillEl.style.width = pct + '%';
    pctEl.textContent = Math.round(pct) + '%';
    nextLabelEl.textContent = formatNum(next.min - points) + ' pts to ' + next.name;
  } else {
    fillEl.style.width = '100%';
    pctEl.textContent = '100%';
    nextLabelEl.textContent = 'Top tier reached';
  }

  renderTierList(idx);
}

function renderTierList(activeIdx) {
  tiersEl.innerHTML = '';
  TIERS.forEach(function (tier, i) {
    var row = document.createElement('div');
    row.className = 'ltp-tier-row' + (i === activeIdx ? ' active' : '');
    var rangeText = TIERS[i + 1] ? (formatNum(tier.min) + '–' + formatNum(TIERS[i + 1].min - 1)) : (formatNum(tier.min) + '+');
    row.innerHTML =
      '<span class="ltp-tier-icon">' + tier.icon + '</span>' +
      '<span class="ltp-tier-info"><strong>' + tier.name + '</strong><span>' + tier.benefit + '</span></span>' +
      '<span class="ltp-tier-range">' + rangeText + '</span>';
    tiersEl.appendChild(row);
  });
}

slider.addEventListener('input', function () { render(+slider.value); });

render(+slider.value);`,

  seo: {
    title: 'Loyalty Program Tier Progress — Free Multi-Tier Rewards Widget',
    description: `A tier-focused loyalty widget showing the current tier, progress toward the next one with exact points needed, and every tier's benefits in one list with the active tier highlighted. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Loyalty Program Tier Progress — Beyond a Single Points Bar',
      description: `A points balance and a progress bar tell you how close you are to *something*, but not what that something actually unlocks. This widget is built around the full tier ladder: five named tiers, each with a real point range and a distinct benefit, with the current tier highlighted in context so the progress bar means something concrete.

**A tier lookup, not a raw percentage**

\`TIERS\` is an ordered array of \`{ name, min, icon, benefit }\` objects. \`tierIndexFor(points)\` walks the list and returns the highest tier whose \`min\` threshold the current points have crossed — the same logic a real loyalty backend would use to assign a member's tier. Everything else in the widget derives from that one lookup.

**Progress scoped to the current tier's span, not the whole scale**

The progress bar doesn't measure points against some fixed maximum — it measures progress *within the current tier's range*: \`(points - current.min) / (next.min - current.min)\`. That's why the bar resets to a fresh 0-100% at each tier boundary instead of slowly creeping across a single giant scale, and why the "points to next tier" label always shows the exact, correct gap regardless of which tier you're in.

**The full ladder, always visible**

Below the progress bar, every tier renders as its own row — icon, name, real benefit text, and its point range — with the current tier's row visually highlighted. This is the core difference from a simple points bar: a member can see not just how far they are from the next tier, but exactly what every tier above and below unlocks, which is what actually motivates progress. Drag the demo slider to watch the highlighted row, progress bar, and "points to next tier" label all update together at every tier boundary. Pair this with a [quota usage meter](/ui-snippets/quota-usage-meter/) for a broader account-status dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Renders at 2,340 points — Silver tier, 67% to Gold.` },
      { title: 'Drag the demo slider', text: `Points update live from 0 to 12,000.` },
      { title: 'Cross a tier boundary', text: `The badge, name, and highlighted row all switch instantly.` },
      { title: 'Reach the top tier', text: `The progress bar fills and shows "Top tier reached."` },
      { title: 'Read the tier list', text: `Every tier shows its real point range and unlocked benefit.` },
      { title: 'Wire up real data', text: `Call render(points) with a member's actual point balance.` },
    ] },
    features: [
      { title: 'Five-tier ladder', text: `Bronze through Diamond, each with a real point range.` },
      { title: 'Per-tier benefit text', text: `Every tier lists what it actually unlocks.` },
      { title: 'Scoped progress bar', text: `Measures progress within the current tier, not the whole scale.` },
      { title: 'Exact points-to-next label', text: `The real numeric gap to the next tier threshold.` },
      { title: 'Highlighted active tier', text: `The full list always shows where the member stands.` },
      { title: 'Single tier-lookup function', text: `One tierIndexFor() drives every derived value.` },
      { title: 'Top-tier handling', text: `Gracefully shows 100% with no "next tier" once maxed.` },
      { title: 'Zero dependencies', text: `Pure DOM and CSS, no charting library.` },
    ],
    useCases: [
      { title: 'E-commerce loyalty programs', text: `Show tier status beside a [quota usage meter](/ui-snippets/quota-usage-meter/).` },
      { title: 'Subscription/membership apps', text: `Visualize plan-tier progression and perks.` },
      { title: 'Airline/hotel status pages', text: `A real tier ladder with elite-status benefits.` },
      { title: 'Gamified onboarding', text: `Motivate usage by showing the next unlock clearly.` },
      { title: 'Credit card rewards dashboards', text: `Spend-tier progress with concrete benefit text.` },
      { title: 'Community/creator platforms', text: `Show contributor tiers and what each unlocks.` },
      { icon: 'CODE', title: 'Related: Readability Score Gauge', desc: 'See the [Readability Score Gauge](/ui-snippets/readability-score-gauge/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a simple loyalty points progress bar?', a: `A single points bar only shows how far a value is toward one fixed target. This widget is built around a full ordered tier ladder (five tiers, each with a real point range and a distinct benefit) — the current tier is looked up from that ladder, the progress bar is scoped to just the span between the current and next tier, and every tier's benefits are always visible in a list with the active one highlighted, so the member can see the whole path, not just the next checkpoint.` },
      { q: 'How is progress-within-a-tier calculated?', a: `Rather than measuring points against a single overall maximum, the bar measures (points - currentTier.min) / (nextTier.min - currentTier.min). That means the bar resets to a fresh 0% right after crossing into a new tier and reaches 100% exactly at the next tier's threshold, so the visual progress always reflects standing within the current tier rather than an oddly compressed fraction of the entire five-tier range.` },
      { q: 'What happens once a member reaches the top tier?', a: `tierIndexFor() returns the highest tier whose minimum the points have crossed, so once points reach the top tier's threshold, there is no "next" tier to measure against. The code detects this (next is undefined) and fills the bar to 100% with a "Top tier reached" label instead of trying to divide by a nonexistent next threshold.` },
      { q: 'Can I drive this from a real member\'s point balance instead of the slider?', a: `Yes — the slider just calls the same render(points) function that does everything: finding the current tier, computing progress within it, and re-rendering the highlighted tier list. Call render(memberPointsFromYourBackend) whenever the member's balance loads or changes, and remove the slider if manual demoing isn't needed.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the raw points value in state, derive the current tier index and the next tier's threshold with the same lookup logic, and bind the progress bar's width, the points-to-next label, and the tier list's "active" class to those derived values — the TIERS array itself is static configuration and doesn't need to live in state.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the progress bar is scoped to the span between the current and next tier rather than measuring against the entire point scale, and why that distinction matters for how motivating the bar feels near a tier boundary versus in the middle of a large tier's range. It's also useful for reasoning about the tier lookup — ask how tierIndexFor() correctly handles a points value that falls exactly on a tier's minimum threshold, and what would need to change to support tiers that expire or reset on a billing cycle. For extensions, ask it to add a countdown showing days left in the current earning cycle, animate a confetti burst when a tier-up crossing happens, or add a "what you'd need to do" estimate (e.g. "3 more orders at your average spend") to reach the next tier. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "loyalty program tier progress" widget in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Define an ordered array of tiers (e.g. Bronze, Silver, Gold, Platinum, Diamond), each with a name, a minimum point threshold, an icon, and a short real benefit description (e.g. "2x points on every order", "Dedicated concierge support").
- A function that, given a points value, finds the current tier (the highest tier whose minimum threshold the points have reached or exceeded) and the next tier above it (if any).
- Display the current tier's name and icon prominently, the member's points earned this cycle, and a progress bar whose fill percentage is scoped to progress WITHIN the current tier specifically — computed as (points - currentTier.min) / (nextTier.min - currentTier.min), not as a fraction of some overall maximum — along with a label showing the exact number of points remaining to the next tier (e.g. "1,160 pts to Gold"). If there is no next tier (the member is at the top), fill the bar to 100% and show a "top tier reached" message instead of dividing by an undefined threshold.
- Below the progress bar, render every tier in the ladder as its own row showing its icon, name, benefit text, and point range, with the row for the member's current tier visually highlighted so the whole tier structure — not just the immediate next step — is visible at once.
- Include a range slider (0 to comfortably above the top tier's threshold) that lets a user simulate different point totals, live-updating the current tier, progress bar, next-tier label, and highlighted row — all driven through the same single render function so it could later be called with a real member's point balance instead.`,
    },
  },
};

export default loyaltyTierProgress;
