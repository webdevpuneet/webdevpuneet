const waterIntakeTracker = {
  id: 'water-intake-tracker',
  title: 'Water Intake Tracker',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="wit-card">
  <div class="wit-head">
    <div class="wit-ring-wrap">
      <svg class="wit-ring" viewBox="0 0 90 90">
        <circle class="wit-ring-track" cx="45" cy="45" r="39"></circle>
        <circle class="wit-ring-fill" id="witRingFill" cx="45" cy="45" r="39"></circle>
      </svg>
      <div class="wit-ring-center">
        <span class="wit-ring-pct" id="witPct">0%</span>
        <span class="wit-ring-label">of goal</span>
      </div>
    </div>
    <div class="wit-stats">
      <div class="wit-amount"><span id="witAmount">0</span> <small>/ 2000 ml</small></div>
      <div class="wit-sub">Daily goal &middot; resets at midnight</div>
      <div class="wit-bottle-wrap">
        <div class="wit-bottle">
          <div class="wit-bottle-fill" id="witBottleFill"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="wit-actions">
    <button type="button" class="wit-add" data-ml="250">+250 ml</button>
    <button type="button" class="wit-add" data-ml="500">+500 ml</button>
    <button type="button" class="wit-reset" id="witReset">Reset</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#081019;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.wit-card{background:#0e1826;border:1px solid #1c2c3f;border-radius:18px;padding:22px;width:100%;max-width:380px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.wit-head{display:flex;align-items:center;gap:18px}
.wit-ring-wrap{position:relative;width:90px;height:90px;flex-shrink:0}
.wit-ring{width:90px;height:90px;transform:rotate(-90deg)}
.wit-ring-track{fill:none;stroke:#152233;stroke-width:7}
.wit-ring-fill{fill:none;stroke:#38bdf8;stroke-width:7;stroke-linecap:round;stroke-dasharray:245;stroke-dashoffset:245;transition:stroke-dashoffset .5s cubic-bezier(.4,0,.2,1)}
.wit-ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.wit-ring-pct{font-size:16px;font-weight:800;color:#e0f2fe}
.wit-ring-label{font-size:9px;color:#5b7891;text-transform:uppercase;letter-spacing:.04em}

.wit-stats{flex:1;min-width:0}
.wit-amount{font-size:22px;font-weight:800;color:#f0f9ff}
.wit-amount small{font-size:12px;font-weight:600;color:#5b7891}
.wit-sub{font-size:11px;color:#4b6a85;margin-top:2px;margin-bottom:10px}

.wit-bottle-wrap{display:flex}
.wit-bottle{width:34px;height:52px;border-radius:6px 6px 10px 10px;background:#0a1421;border:2px solid #1c2c3f;position:relative;overflow:hidden}
.wit-bottle::before{content:'';position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:12px;height:6px;background:#1c2c3f;border-radius:2px 2px 0 0}
.wit-bottle-fill{position:absolute;left:0;right:0;bottom:0;height:0%;background:linear-gradient(180deg,#38bdf8,#0ea5e9);transition:height .5s cubic-bezier(.4,0,.2,1)}

.wit-actions{display:flex;gap:8px;margin-top:18px}
.wit-add{flex:1;background:#132132;border:1px solid #1f3247;color:#bae6fd;font-size:12.5px;font-weight:700;padding:10px;border-radius:10px;cursor:pointer;transition:background .12s}
.wit-add:hover{background:#1a2c42}
.wit-reset{background:none;border:1px solid #1f3247;color:#5b7891;font-size:12px;font-weight:700;padding:10px 12px;border-radius:10px;cursor:pointer}
.wit-reset:hover{color:#93b4cf}`,

  js: `var GOAL = 2000;
var CIRC = 245;
var current = 0;

var pctEl = document.getElementById('witPct');
var amountEl = document.getElementById('witAmount');
var ringFillEl = document.getElementById('witRingFill');
var bottleFillEl = document.getElementById('witBottleFill');

function render() {
  var pct = Math.min(100, Math.round((current / GOAL) * 100));
  amountEl.textContent = current.toLocaleString();
  pctEl.textContent = pct + '%';
  ringFillEl.style.strokeDashoffset = (CIRC - (CIRC * pct) / 100).toString();
  bottleFillEl.style.height = pct + '%';
}

document.querySelectorAll('.wit-add').forEach(function (btn) {
  btn.addEventListener('click', function () {
    current += parseInt(btn.dataset.ml, 10);
    render();
  });
});

document.getElementById('witReset').addEventListener('click', function () {
  current = 0;
  render();
});

render();`,

  seo: {
    title: 'Water Intake Tracker — Free HTML CSS JS Snippet',
    description: `A daily hydration widget with a filling bottle, a progress ring, and quick-add buttons for logging water intake toward a goal. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Water Intake Tracker — Fillable Bottle, Progress Ring & Quick-Add Logging',
      description: `Hydration tracking works best when logging a glass of water takes one tap and the current state is legible at a glance. This widget combines three familiar visual metaphors — a progress ring, a filling bottle, and a running total — all driven by the same number, plus two quick-add buttons sized to how people actually drink water (a glass, a bottle). It pairs naturally with a [BMI calculator](/ui-snippets/bmi-calculator/) or a broader health dashboard.

**One number, three views**

\`current\` is the single source of truth for how many milliliters have been logged today. \`render()\` derives everything else from it: the percentage of the daily goal, the progress ring's stroke offset, the bottle's fill height, and the raw milliliter total — so there's never a case where the ring says one thing and the bottle says another, because both are just different renderings of the same percentage.

**A ring drawn with stroke-dashoffset**

The progress ring is two overlapping SVG circles: a static track and a colored fill circle whose \`stroke-dasharray\` is set to its full circumference and whose \`stroke-dashoffset\` is animated down as progress increases. Rotating the SVG \`-90deg\` makes the fill start from the top rather than the 3 o'clock position, matching the convention used by most goal-ring UI (including Apple's Activity rings).

**A bottle that fills like a real container**

The bottle is a simple bordered rectangle with a small "cap" pseudo-element and an absolutely positioned fill \`div\` anchored to the bottom, whose height animates as a percentage. Because the fill grows from the bottom up rather than a generic left-to-right bar, it reads intuitively as liquid filling a vessel — closer to how a real water bottle empties and fills.

**Quick-add sized to real habits**

The +250 ml and +500 ml buttons map to a standard glass and a standard bottle respectively, so logging intake takes one tap for the common cases rather than opening a number input every time. Both buttons funnel through the same click handler pattern reading a \`data-ml\` attribute, so adding a third quick-add size (say, +750 ml for a large bottle) is a one-line HTML change with no new JavaScript.

**Daily reset**

This demo's Reset button simulates the day rolling over; in production you'd instead reset \`current\` to zero automatically at local midnight (comparing the logged date to today's date on load, or scheduling a reset), and persist the running total to \`localStorage\` or your backend so it survives a page reload during the day.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A hydration card renders at 0 ml with an empty ring and bottle.` },
      { title: 'Click +250 ml or +500 ml', text: `The total, ring, and bottle fill all update together with a smooth animated transition.` },
      { title: 'Watch the goal ring', text: `The ring fills clockwise from the top as you approach the 2000 ml daily goal.` },
      { title: 'Click Reset', text: `The tracker returns to 0 ml — simulating the daily reset.` },
      { title: 'Change the goal', text: `Edit the GOAL constant to match a different daily target.` },
      { title: 'Persist it', text: `Store current in localStorage or your backend, keyed to today's date, for a real app.` },
    ] },
    features: [
      { title: 'Single source of truth', text: `One current value drives the ring, the bottle, and the total — never out of sync.` },
      { title: 'SVG progress ring', text: `A stroke-dashoffset animation fills the ring smoothly from the top, clockwise.` },
      { title: 'Bottom-up bottle fill', text: `A bottle silhouette fills from the base like a real container, not a generic bar.` },
      { title: 'Habit-sized quick-add', text: `+250 ml and +500 ml map to a standard glass and bottle for one-tap logging.` },
      { title: 'Capped percentage', text: `Progress never exceeds 100% visually even if intake goes past the daily goal.` },
      { title: 'Smooth animated transitions', text: `Ring offset and bottle height both animate with an eased cubic-bezier curve.` },
      { title: 'Data-attribute driven buttons', text: `Quick-add amounts read from data-ml, so adding a size is a markup-only change.` },
      { title: 'Explicit reset note', text: `Copy and behavior make clear the tracker is meant to reset at midnight daily.` },
    ],
    useCases: [
      { title: 'Health and fitness dashboards', text: 'Log hydration beside other daily metrics with one tap, using +250 ml and +500 ml buttons that map to a standard glass and bottle.' },
      { title: 'Wearable companion apps', text: 'Add manual water entries to complement automatic tracking, with one value driving the ring, the filling bottle and the running total.' },
      { title: 'Workplace wellness programmes', text: 'Pair with a [workout interval timer](/ui-snippets/workout-interval-timer/) in a workplace wellness hub, rewarding small daily habits with visible progress toward a goal.' },
      { title: 'Health calculator suites', text: 'Place beside a [BMI calculator](/ui-snippets/bmi-calculator/) so people can calculate a goal and then track progress toward it.' },
      { title: 'SVG ring and fill reference', text: 'See how `stroke-dashoffset` animates the progress ring and a bottom-up bottle fill gives a second, more tactile signal.' },
    ],
    faqs: [
      { q: 'How does the progress ring animate smoothly?', a: `The ring fill is an SVG circle with stroke-dasharray set to its full circumference, so the visible stroke length is controlled entirely by stroke-dashoffset — a lower offset reveals more of the circle. render() sets that offset based on the current percentage, and a CSS transition on stroke-dashoffset animates the change smoothly whenever current updates.` },
      { q: 'Why does the ring start filling from the top instead of the side?', a: `The SVG is rotated -90 degrees with a CSS transform. SVG circles start drawing at the 3 o'clock position by default, so without the rotation the ring would begin filling from the right side. Rotating it -90 degrees moves the starting point to 12 o'clock, matching the convention used by most circular goal-ring UI.` },
      { q: 'What happens if I log more than the daily goal?', a: `The raw milliliter total displayed keeps counting up accurately, but the ring and bottle fill percentage are both clamped to 100% via Math.min(100, ...) so neither visual overflows or wraps. This means the ring and bottle always represent "how much of my goal is met," capped sensibly, while the number still shows your true total.` },
      { q: 'How do I make this reset automatically at midnight?', a: `Store the logged total together with the date it was logged (e.g. in localStorage as { date: "2026-08-22", ml: 1250 }). On load, compare the stored date to today's date; if they differ, reset current to zero before rendering. You can also schedule a setTimeout to the next local midnight to reset the UI live if the page stays open overnight.` },
      { q: 'How do I use this water tracker in React, Vue, or Angular?', a: `Keep current as component state (a number), and derive the percentage, ring offset, and bottle height with computed values (useMemo, a Vue computed property, or an Angular getter) rather than direct DOM writes. The quick-add buttons become state updaters (setCurrent(c => c + amount)), and persistence to localStorage or an API is a straightforward effect keyed on current changing.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the SVG ring math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how stroke-dasharray and stroke-dashoffset combine with the -90 degree rotation to produce a ring that fills clockwise from the top, and why deriving the ring offset, bottle height, and displayed total from one current value keeps all three views guaranteed in sync. The same assistant can help you optimize it — ask whether the fill percentage calculation should round differently to avoid the ring and the displayed percentage disagreeing by a pixel at edge values. It's also useful for extending the tracker: ask it to add a weekly hydration history view, persist today's total to localStorage with an automatic midnight reset, or let the user set a custom daily goal instead of a fixed 2000 ml. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a daily "water intake tracker" widget in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Track a single running total (milliliters logged today) as the one source of truth, and derive every visual from it: a percentage-of-goal number, an SVG circular progress ring, and a bottle-shaped container that visually fills from the bottom.
- Build the progress ring using two overlapping SVG circles (a static background track and a colored fill circle) where the fill circle's stroke-dasharray equals its full circumference and its stroke-dashoffset is set based on the current percentage of the goal, with a CSS transition so changes animate smoothly; rotate the SVG so the ring visually fills clockwise starting from the top rather than the default right-side start point.
- Build a bottle/container element (CSS shapes are fine, no image assets) with an inner fill layer anchored to the bottom whose height is set as a percentage and animates smoothly, so it reads as liquid filling a vessel rather than a generic horizontal progress bar.
- Add two quick-add buttons for common serving sizes (e.g. +250 ml for a glass and +500 ml for a bottle) that each add their fixed amount to the running total and trigger every visual (ring, bottle fill, and displayed number) to update together.
- Clamp the ring and bottle fill percentage at 100% even if the logged total exceeds the daily goal, while still showing the true, uncapped total number.
- Include a reset control for testing, and in the visible copy, note that in a real app this tracker is meant to reset automatically at local midnight each day rather than needing a manual reset.`,
    },
  },
};

export default waterIntakeTracker;
