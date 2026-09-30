const goalProgressRing = {
  id: 'goal-progress-ring',
  title: 'Goal Progress Ring',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="gpr-card">
  <h2 class="gpr-title">Fundraising Goal</h2>
  <div class="gpr-ring-wrap">
    <svg class="gpr-ring" viewBox="0 0 200 200" id="gprRing">
      <circle class="gpr-track" cx="100" cy="100" r="86"></circle>
      <circle class="gpr-fill" id="gprFill" cx="100" cy="100" r="86"></circle>
    </svg>
    <div class="gpr-center">
      <span class="gpr-pct" id="gprPct">0%</span>
      <span class="gpr-badge" id="gprBadge">In progress</span>
    </div>
  </div>
  <div class="gpr-amounts">
    <span class="gpr-current" id="gprCurrentLabel">$3,200</span>
    <span class="gpr-of">of</span>
    <span class="gpr-goal" id="gprGoalLabel">$5,000</span>
  </div>
  <div class="gpr-controls">
    <label class="gpr-field">
      <span>Current amount</span>
      <input type="number" id="gprCurrentInput" value="3200" min="0" step="50">
    </label>
    <label class="gpr-field">
      <span>Goal amount</span>
      <input type="number" id="gprGoalInput" value="5000" min="1" step="50">
    </label>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gpr-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:26px;max-width:340px;margin:0 auto;text-align:center}
.gpr-title{font-size:16px;margin:0 0 18px;font-weight:700}
.gpr-ring-wrap{position:relative;width:200px;height:200px;margin:0 auto}
.gpr-ring{width:100%;height:100%;transform:rotate(-90deg)}
.gpr-track{fill:none;stroke:#1c2033;stroke-width:14}
.gpr-fill{fill:none;stroke:#6366f1;stroke-width:14;stroke-linecap:round;stroke-dasharray:540.35;stroke-dashoffset:540.35;transition:stroke-dashoffset .5s cubic-bezier(.2,.8,.2,1),stroke .4s ease}
.gpr-fill.gpr-complete{stroke:#4ade80}
.gpr-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.gpr-pct{font-size:32px;font-weight:800;letter-spacing:-.02em}
.gpr-badge{font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#a8adc4;background:#1c2033;padding:4px 10px;border-radius:999px;transition:background .3s ease,color .3s ease}
.gpr-badge.gpr-complete{color:#0c1a10;background:#4ade80}
.gpr-amounts{margin-top:16px;font-size:15px;color:#c7cae0}
.gpr-current{font-weight:800;color:#f2f3fa}
.gpr-of{color:#6b7090;margin:0 6px;font-size:12px}
.gpr-goal{font-weight:700}
.gpr-controls{display:flex;gap:10px;margin-top:20px}
.gpr-field{flex:1;display:flex;flex-direction:column;gap:5px;text-align:left}
.gpr-field span{font-size:11px;color:#8b90a8}
.gpr-field input{width:100%;padding:8px 10px;border-radius:8px;border:1px solid #262a3b;background:#161927;color:#f2f3fa;font-size:13px}
.gpr-field input:focus{outline:none;border-color:#6366f1}`,

  js: `var RADIUS = 86;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~540.35, matches the CSS dasharray

var fill = document.getElementById('gprFill');
var pctEl = document.getElementById('gprPct');
var badgeEl = document.getElementById('gprBadge');
var currentLabel = document.getElementById('gprCurrentLabel');
var goalLabel = document.getElementById('gprGoalLabel');
var currentInput = document.getElementById('gprCurrentInput');
var goalInput = document.getElementById('gprGoalInput');

function formatCurrency(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function update() {
  var current = Math.max(0, Number(currentInput.value) || 0);
  var goal = Math.max(1, Number(goalInput.value) || 1);
  var ratio = Math.min(current / goal, 1); // cap the ring fill at 100%
  var pct = Math.round(ratio * 100);

  var offset = CIRCUMFERENCE * (1 - ratio);
  fill.style.strokeDashoffset = offset;

  pctEl.textContent = pct + '%';
  currentLabel.textContent = formatCurrency(current);
  goalLabel.textContent = formatCurrency(goal);

  var complete = current >= goal;
  fill.classList.toggle('gpr-complete', complete);
  badgeEl.classList.toggle('gpr-complete', complete);
  badgeEl.textContent = complete ? 'Goal reached!' : 'In progress';
}

currentInput.addEventListener('input', update);
goalInput.addEventListener('input', update);

update();`,

  seo: {
    title: 'Goal Progress Ring — Free Editable Circular Progress Snippet',
    description: `A large circular progress ring toward a numeric goal, with editable current-value input that live-updates the fill, percentage, and a celebratory complete state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Goal Progress Ring — Live-Editable Circular Progress Toward a Target',
      description: `The goal progress ring is the fundraising and target-tracking widget that turns "$3,200 of $5,000 raised" into an instantly readable circle — the ring's fill proportion communicates progress before anyone reads a single number. This snippet builds a fully interactive version in plain HTML, CSS, and JavaScript using an SVG stroke-dashoffset ring.

**How the ring fill actually works**

The ring is an SVG circle with \`stroke-dasharray\` set to its full circumference (\`2 * Math.PI * 86 \\u2248 540.35\`) and \`stroke-dashoffset\` animated to control how much of that dash is visible. \`update()\` computes \`ratio = current / goal\` (capped at 1 so overachieving a goal doesn't overflow the ring), then sets \`offset = CIRCUMFERENCE * (1 - ratio)\` — at ratio 0 the full circumference is offset (empty ring), at ratio 1 the offset is 0 (fully filled ring). The CSS transition on \`stroke-dashoffset\` makes every change animate smoothly rather than snapping.

**Live-editable inputs**

Two number inputs — current amount and goal amount — drive everything. Typing in either fires \`update()\` on the \`input\` event, so the ring fill, the center percentage, and the "$X of $Y" labels all recompute and animate in real time as you type, not just on blur or submit.

**Celebratory completion state**

When \`current >= goal\`, the ring's stroke color and the status badge both switch to green and the badge text changes to "Goal reached!" — a clear but restrained celebration (color and copy change, no confetti or overlay) that keeps the widget usable as a persistent dashboard element rather than a one-time animation.

**Currency formatting**

\`formatCurrency()\` uses \`toLocaleString('en-US')\` so amounts render with proper thousands separators regardless of how large the input numbers get.

**Customizing it**

Swap dollar amounts for any unit (steps, subscribers, pages read), change the ring's color or thickness, or make the inputs read-only and drive the ring from a live API value instead. Pair it with [gradient stat ring](/ui-snippets/gradient-stat-ring/), [progress circle steps](/ui-snippets/progress-circle-steps/), or [activity rings](/ui-snippets/activity-rings/) for a fuller goals dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The ring renders filled to the default current/goal ratio.` },
      { title: 'Edit the current-amount input', text: `The ring fill, percentage, and label update live.` },
      { title: 'Edit the goal-amount input', text: `The ratio recalculates against the new target.` },
      { title: 'Reach or exceed the goal', text: `The ring and badge switch to a green complete state.` },
      { title: 'Swap the unit', text: `Change formatCurrency() to format steps, points, or any metric.` },
    ] },
    features: [
      { title: 'SVG stroke-dashoffset ring', text: `Smoothly animated fill via real circle geometry.` },
      { title: 'Live-editable inputs', text: `Current and goal amounts update the ring as you type.` },
      { title: 'Capped at 100%', text: `Ratio never exceeds 1, so the ring never over-fills.` },
      { title: 'Celebratory complete state', text: `Color and badge change at 100%, no confetti needed.` },
      { title: 'Currency formatting', text: `Thousands separators via toLocaleString.` },
      { title: 'Smooth transitions', text: `CSS-eased stroke-dashoffset and color changes.` },
      { title: 'Center percentage readout', text: `Large, legible progress number at a glance.` },
      { title: 'Zero dependencies', text: `Plain SVG and DOM, no chart library.` },
    ],
    useCases: [
      { title: 'Fundraising pages', text: `Show live progress toward a campaign target.` },
      { title: 'Sales dashboards', text: `Track quota attainment toward a revenue goal.` },
      { title: 'Fitness apps', text: `Pair with [activity rings](/ui-snippets/activity-rings/) for daily targets.` },
      { title: 'Crowdfunding platforms', text: `Display backer totals against a funding goal.` },
      { title: 'Learning platforms', text: `Show course-completion progress toward 100%.` },
      { title: 'Subscription growth', text: `Track subscriber count toward a milestone.` },
      { icon: 'CODE', title: 'Related: Job Queue Depth Monitor — Live Backlog Trend with Threshold Alerts', desc: 'See the [Job Queue Depth Monitor — Live Backlog Trend with Threshold Alerts](/ui-snippets/job-queue-depth-monitor/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the ring know how much of itself to fill?', a: `It uses SVG stroke-dasharray set to the circle's full circumference and stroke-dashoffset to hide part of that dash. The JS computes ratio = current / goal, then sets offset = circumference * (1 - ratio) — an offset of 0 shows the full ring, an offset equal to the circumference shows none of it. A CSS transition animates the offset change smoothly.` },
      { q: 'What happens if the current value exceeds the goal?', a: `The ratio is capped at 1 with Math.min(current / goal, 1), so the ring never fills past a full circle even if someone enters a current amount greater than the goal. The percentage and complete state still reflect the real numbers — the badge switches to "Goal reached!" as soon as current >= goal.` },
      { q: 'Is the "celebratory" state just confetti?', a: `No — by design it's restrained: the ring's stroke color and the status badge both switch to green with updated copy ("Goal reached!"), with no confetti or animated overlay. That keeps it usable as a persistent dashboard widget rather than a one-time celebration effect that gets stale on repeat views.` },
      { q: 'Can I use this for non-currency goals, like steps or pages read?', a: `Yes — replace formatCurrency() with whatever formatting your unit needs (or none at all), and update the input labels and title text. The ring-fill math (ratio, dashoffset) is unit-agnostic and works the same for any two numbers.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move current and goal into component state, compute ratio and offset the same way in a derived value, and bind stroke-dashoffset as an inline style or SVG attribute bound to that computed value instead of writing to the DOM directly on input events.` },
    ],
    aiPrompt: {
      paragraph: `SVG progress rings look simple but the stroke-dasharray/dashoffset math trips people up constantly, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to walk through exactly why circumference = 2 * Math.PI * radius has to match the SVG circle's actual r attribute, why the ring is rotated -90deg in CSS (so progress starts at 12 o'clock instead of 3 o'clock), and why dashoffset = circumference * (1 - ratio) is the correct formula rather than dashoffset = circumference * ratio. It's also a good prompt for extending the widget: ask it to add a smooth count-up animation on the center percentage number (not just the ring) as the value changes, to support multiple concentric rings for tracking several goals at once, or to add an aria-live region so screen reader users get an announcement when the goal is reached.`,
      prompt: `Build a "goal progress ring" in plain HTML, CSS, and JavaScript using SVG — no dependencies, no CDN.

Requirements:
- An SVG circle ring (a background track circle plus a foreground fill circle) where the fill circle's progress is controlled via stroke-dasharray (set to the circle's circumference) and stroke-dashoffset (computed from the current progress ratio), with a CSS transition so changes animate smoothly. Rotate the SVG so progress starts at the top (12 o'clock), not the default 3 o'clock start point.
- Two number inputs: "current amount" and "goal amount". On every input event on either field, recompute the ratio (current / goal, capped at a maximum of 1 so it never over-fills) and update: the ring's stroke-dashoffset, a large percentage readout in the center of the ring, and "$X of $Y" style labels showing the formatted current and goal amounts.
- Format the amounts with thousands separators (e.g. via toLocaleString).
- When current reaches or exceeds goal, switch the ring's stroke color and a status badge to a distinct "complete" color/style with updated text (e.g. "Goal reached!") — no confetti or celebratory animation overlay, just a clear color and copy change.
- Dark-theme friendly, centered layout, all values driven from the two inputs.`,
    },
  },
};

export default goalProgressRing;
