const donationThermometer = {
  id: 'donation-thermometer',
  title: 'Donation Thermometer',
  lastmod: '2026-08-22',
  category: 'charts',
  cdnUrls: [],
  html: `<div class="dt-card">
  <div class="dt-header">
    <h3>Winter Coat Drive</h3>
    <p>Help us keep 500 kids warm this season</p>
  </div>

  <div class="dt-body">
    <div class="dt-tube-wrap">
      <div class="dt-tube" id="dtTube" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Funds raised toward goal">
        <div class="dt-tick dt-tick-100"><span>$10,000</span></div>
        <div class="dt-tick dt-tick-75"><span>$7,500</span></div>
        <div class="dt-tick dt-tick-50"><span>$5,000</span></div>
        <div class="dt-tick dt-tick-25"><span>$2,500</span></div>
        <div class="dt-fill" id="dtFill"></div>
      </div>
      <div class="dt-bulb"><div class="dt-bulb-fill" id="dtBulb"></div></div>
    </div>

    <div class="dt-stats">
      <div class="dt-stat">
        <span class="dt-stat-label">Raised</span>
        <span class="dt-stat-value" id="dtRaised">$0</span>
      </div>
      <div class="dt-stat">
        <span class="dt-stat-label">Goal</span>
        <span class="dt-stat-value" id="dtGoal">$10,000</span>
      </div>
      <div class="dt-stat">
        <span class="dt-stat-label">To goal</span>
        <span class="dt-stat-value dt-pct" id="dtPct">0%</span>
      </div>
    </div>

    <div class="dt-controls">
      <button type="button" class="dt-btn" id="dtAdd">+ Add $500 gift</button>
      <button type="button" class="dt-btn dt-btn-ghost" id="dtReset">Reset</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1117;color:#e6edf3;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 20px}

.dt-card{background:#151b23;border:1px solid #262f3a;border-radius:18px;padding:26px;width:100%;max-width:380px}
.dt-header h3{font-size:19px;font-weight:800;margin-bottom:4px}
.dt-header p{font-size:13px;color:#8b96a5;margin-bottom:22px}

.dt-body{display:flex;flex-direction:column;align-items:center;gap:20px}
.dt-tube-wrap{display:flex;flex-direction:column;align-items:center}
.dt-tube{position:relative;width:56px;height:260px;background:#1c2330;border:3px solid #313c4d;border-radius:28px 28px 6px 6px;overflow:hidden}
.dt-fill{position:absolute;bottom:0;left:0;width:100%;height:0%;background:linear-gradient(180deg,#ff8a3d,#f43f5e);border-radius:0 0 3px 3px;transition:height 1.1s cubic-bezier(.22,.9,.3,1)}
.dt-bulb{width:76px;height:76px;border-radius:50%;background:#1c2330;border:3px solid #313c4d;margin-top:-8px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;position:relative;z-index:2}
.dt-bulb-fill{width:100%;height:0%;background:linear-gradient(180deg,#f43f5e,#e11d48);border-radius:0 0 50% 50% / 0 0 40% 40%;transition:height 1.1s cubic-bezier(.22,.9,.3,1)}

.dt-tick{position:absolute;left:0;right:0;height:0;border-top:1px dashed #3a4557;display:flex;align-items:center;justify-content:center;transition:border-color .3s,opacity .3s}
.dt-tick span{position:absolute;left:64px;font-size:10.5px;font-weight:700;color:#8b96a5;white-space:nowrap;transition:color .3s}
.dt-tick-100{bottom:100%}
.dt-tick-75{bottom:75%}
.dt-tick-50{bottom:50%}
.dt-tick-25{bottom:25%}
.dt-tick.dt-passed{border-top-color:#f59e0b}
.dt-tick.dt-passed span{color:#f59e0b}

.dt-stats{display:flex;gap:10px;width:100%}
.dt-stat{flex:1;background:#1c2330;border-radius:10px;padding:10px 8px;text-align:center;display:flex;flex-direction:column;gap:3px}
.dt-stat-label{font-size:10.5px;color:#8b96a5;text-transform:uppercase;letter-spacing:.06em;font-weight:700}
.dt-stat-value{font-size:15px;font-weight:800;color:#e6edf3}
.dt-pct{color:#fb923c}

.dt-controls{display:flex;gap:8px;width:100%}
.dt-btn{flex:1;background:#f43f5e;color:#fff;border:none;border-radius:10px;padding:11px;font-size:13.5px;font-weight:700;cursor:pointer;transition:background .15s}
.dt-btn:hover{background:#e11d48}
.dt-btn-ghost{background:transparent;border:1px solid #313c4d;color:#8b96a5}
.dt-btn-ghost:hover{background:#1c2330;color:#e6edf3}`,

  js: `var GOAL = 10000;
var raised = 0;
var STEP = 500;

var fillEl = document.getElementById('dtFill');
var bulbEl = document.getElementById('dtBulb');
var tubeEl = document.getElementById('dtTube');
var raisedEl = document.getElementById('dtRaised');
var pctEl = document.getElementById('dtPct');

function money(n) {
  return '$' + n.toLocaleString('en-US');
}

function render() {
  var pct = Math.min(100, (raised / GOAL) * 100);
  fillEl.style.height = pct + '%';
  bulbEl.style.height = Math.min(100, pct + 30) + '%'; // bulb fills a little ahead so it never looks empty
  raisedEl.textContent = money(raised);
  pctEl.textContent = Math.round(pct) + '%';
  tubeEl.setAttribute('aria-valuenow', Math.round(pct));

  [25, 50, 75, 100].forEach(function (mark) {
    var el = document.querySelector('.dt-tick-' + mark);
    el.classList.toggle('dt-passed', pct >= mark);
  });
}

document.getElementById('dtAdd').addEventListener('click', function () {
  raised = Math.min(GOAL, raised + STEP);
  render();
});

document.getElementById('dtReset').addEventListener('click', function () {
  raised = 0;
  render();
});

render();`,

  seo: {
    title: 'Donation Thermometer — Free Fundraising Progress Bar HTML CSS JS',
    description: `A classic vertical fundraising thermometer with live fill, goal milestones, and percent-to-goal tracking. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Donation Thermometer — A Vertical Fundraising Gauge With Milestone Ticks',
      description: `The donation thermometer is the oldest fundraising visual in the book — a mercury-style tube that rises as gifts come in, instantly communicating "how close are we" without anyone reading a number. This snippet rebuilds it in plain HTML, CSS, and vanilla JavaScript: a tube-and-bulb fill, milestone tick marks at 25/50/75/100%, and a live stats row.

**Tube plus bulb, like the real thing**

The visual is two parts: a tall \`.dt-tube\` and a rounded \`.dt-bulb\` beneath it, each with its own fill layer whose \`height\` is driven by the raised-to-goal ratio. The bulb fill is offset 30 points ahead of the tube's percentage so it never reads as empty at $0 — a small realism touch borrowed from actual glass thermometers, where the bulb always holds some mercury.

**Milestone ticks that light up**

Four dashed tick lines sit at 25%, 50%, 75%, and 100% of the tube's height, each labeled with its dollar amount. As \`raised\` crosses a threshold, that tick's \`.dt-passed\` class turns its line and label amber — a lightweight way to celebrate progress at a glance without a separate animation for every milestone.

**One render() function, one source of truth**

\`raised\` is a single number. Every visual — the fill heights, the raised/goal/percent stat row, and the milestone tick states — is derived from it inside one \`render()\` call, the same pattern as the rest of this library: change the number, call \`render()\`, and everything stays consistent.

**Smooth, physical-feeling rise**

The fill's \`height\` transitions over 1.1s with a custom cubic-bezier that overshoots slightly before settling, so each new gift feels like a real rise in liquid rather than an instant jump — pair this with a [count-up](/ui-snippets/count-up/) on the raised figure for an even more tactile update.

**Accessible by default**

The tube carries \`role="progressbar"\` with live \`aria-valuenow\`, so screen readers announce the current percentage as it changes — important for a widget whose entire point is otherwise visual.

**Customizing it**

Swap \`GOAL\` and \`STEP\` for your campaign's real numbers, wire \`dtAdd\` to your donation webhook instead of a demo button, and change the milestone percentages or add more ticks. Pair it with a [donation amount picker](/ui-snippets/donation-amount-picker/) or a [progress bar](/ui-snippets/progress-bar/) for a flatter alternative.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A tube-and-bulb thermometer renders at $0 of a $10,000 goal.` },
      { title: 'Click "Add $500 gift"', text: `The fill rises smoothly and the stats update.` },
      { title: 'Watch the milestones', text: `Tick lines at 25/50/75/100% turn amber once passed.` },
      { title: 'Click Reset', text: `The thermometer empties back to $0.` },
      { title: 'Change GOAL and STEP', text: `Set your real campaign goal and gift increment.` },
      { title: 'Wire it to real donations', text: `Call render() after adding to raised from your payment webhook.` },
    ] },
    features: [
      { title: 'Tube-and-bulb visual', text: `A two-part fill mimics a real mercury thermometer, with the bulb reading full at any nonzero amount.` },
      { title: 'Milestone ticks', text: `25/50/75/100% marks highlight in amber as the campaign crosses each one.` },
      { title: 'Live stat row', text: `Raised, goal, and percent-to-goal update together from one number.` },
      { title: 'Single render() source of truth', text: `Every visual derives from the raised value, so state never drifts.` },
      { title: 'Smooth eased rise', text: `A cubic-bezier transition makes each gift feel like a physical rise in liquid.` },
      { title: 'Accessible progressbar role', text: `aria-valuenow updates so assistive tech announces real progress.` },
      { title: 'Locale-formatted currency', text: `toLocaleString formats amounts with thousands separators.` },
      { title: 'Simple config', text: `GOAL and STEP are the only numbers you need to change for a real campaign.` },
    ],
    useCases: [
      { title: 'Nonprofit campaign pages', text: 'Use the classic fundraising visual to show how close a capital campaign is to its goal, with milestone ticks highlighting at 25, 50, 75 and 100%.' },
      { title: 'Crowdfunding trackers', text: 'Show progress toward stretch goals, with the stat row updating raised, goal and percent together from one number through a single `render()` function.' },
      { title: 'School and PTA fundraisers', text: 'Offer a familiar, low-effort progress display, and place a [donation amount picker](/ui-snippets/donation-amount-picker/) next to it so visitors can give straight away.' },
      { title: 'Giving days and telethons', text: 'Pair with a [live visitor counter](/ui-snippets/live-visitor-counter/) to show both momentum and audience while the campaign is running.' },
      { title: 'Team goals and sales targets', text: 'Reuse the mercury-style fill for internal targets, or compare it with a simpler [gradient progress](/ui-snippets/gradient-progress/) bar.' },
      { icon: 'CODE', title: 'Related: Lollipop Chart', desc: 'See the [Lollipop Chart](/ui-snippets/lollipop-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the bulb stay filled even at $0?', a: `The bulb's fill height is set to the tube's percentage plus a fixed 30-point offset, capped at 100%. That means even at 0% overall progress the bulb shows some fill, matching how a real thermometer's bulb always holds mercury — purely a visual realism choice, not tied to any real minimum amount.` },
      { q: 'How do the milestone ticks know when to light up?', a: `Each tick element is checked against the current percentage on every render: if the raised percentage is at or above the tick's threshold (25, 50, 75, or 100), a dt-passed class is added, which switches its dashed line and label color to amber via CSS transitions. No separate timers or animations are needed — it is a direct comparison recalculated each render.` },
      { q: 'How do I connect this to real donation data?', a: `Replace the demo dtAdd button handler with your payment webhook or polling logic: whenever a new gift is confirmed, add its amount to the raised variable and call render(). Everything else — fill heights, stats, and milestone highlighting — updates automatically from that one number.` },
      { q: 'Can I change the goal or the milestone percentages?', a: `Yes. GOAL controls the denominator for every percentage calculation, so changing it rescales the whole gauge. The milestone percentages are a plain array (25, 50, 75, 100) inside the forEach loop — add, remove, or change values there, and add matching .dt-tick elements with the corresponding bottom offset in CSS.` },
      { q: 'How do I use this donation thermometer in React, Vue, or Angular?', a: `Hold raised in component state (useState, ref(), or a component field) and derive the percentage in a computed value; bind it to the fill and bulb heights and the stat text. The render() function's logic maps directly to a computed/derived value in any framework — only the DOM-writing lines change to framework bindings.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the tube-and-bulb math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the bulb's fill offset keeps it looking full at low percentages, and how the milestone tick comparison logic decides when to add the dt-passed class. The same assistant can help optimize it — asking whether the 1.1s transition duration feels right for very large or very frequent donation batches, or whether the tick threshold check should debounce for rapid successive gifts. It's also useful for extending the widget: ask it to add a count-up animation on the raised figure, a confetti burst when the goal is reached, or a horizontal thermometer variant for narrow layouts. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "donation thermometer" fundraising progress gauge in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A vertical tube element and a circular bulb element beneath it, each with its own fill layer whose height is set by a percentage derived from a raised amount divided by a goal amount, both fills transitioning smoothly rather than jumping instantly.
- The bulb's fill should read as visually full even when the raised amount is zero or very low (for example, by offsetting its percentage ahead of the tube's), so the gauge never looks broken at the start of a campaign.
- Four milestone tick marks positioned at 25%, 50%, 75%, and 100% of the tube's height, each labeled with its corresponding dollar amount, that visually highlight (a distinct color for both the line and label) once the current percentage reaches or passes that threshold.
- A stats row showing the raised amount, the goal amount, and the percent-to-goal, all formatted with thousands separators, updating together whenever the raised amount changes.
- A single function that is the only place allowed to update the DOM: given the current raised number, it recalculates the fill heights, the stat text, and every milestone tick's highlighted state, so there is one source of truth and no way for the visuals to drift out of sync.
- A demo control that adds a fixed increment to the raised amount (simulating an incoming gift) and a reset control, plus an accessible progressbar role with a live aria-valuenow reflecting the current percentage.`,
    },
  },
};

export default donationThermometer;
