const smartwatchMockup = {
  id: 'smartwatch-mockup',
  title: 'Smartwatch Mockup',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<div class="sw-stage">
  <div class="sw-watch">
    <span class="sw-band sw-top"></span>
    <span class="sw-band sw-bottom"></span>
    <span class="sw-crown"></span>
    <span class="sw-btn"></span>
    <div class="sw-screen" id="swScreen">
      <div class="sw-face" id="swFace">
        <div class="sw-time" id="swTime">9:41</div>
        <div class="sw-date" id="swDate">MON 29</div>
        <div class="sw-rings">
          <svg viewBox="0 0 100 100" width="92">
            <circle class="sw-bg" cx="50" cy="50" r="42"/><circle class="sw-r r1" cx="50" cy="50" r="42"/>
            <circle class="sw-bg" cx="50" cy="50" r="32"/><circle class="sw-r r2" cx="50" cy="50" r="32"/>
            <circle class="sw-bg" cx="50" cy="50" r="22"/><circle class="sw-r r3" cx="50" cy="50" r="22"/>
          </svg>
        </div>
        <div class="sw-complications"><span>72<small>bpm</small></span><span>8.2<small>k</small></span></div>
      </div>
    </div>
  </div>
  <button type="button" class="sw-toggle" id="swToggle">Close rings</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}
.sw-stage{text-align:center}

.sw-watch{position:relative;width:172px;height:200px;background:#0b1220;border-radius:48px;box-shadow:0 24px 44px -20px rgba(15,23,42,.55),inset 0 0 0 2px #1e293b;display:flex;align-items:center;justify-content:center}
.sw-band{position:absolute;left:50%;transform:translateX(-50%);width:104px;background:#475569;z-index:-1}
.sw-top{bottom:calc(100% - 26px);height:70px;border-radius:18px 18px 0 0;background:linear-gradient(#334155,#475569)}
.sw-bottom{top:calc(100% - 26px);height:70px;border-radius:0 0 18px 18px;background:linear-gradient(#475569,#334155)}
.sw-crown{position:absolute;right:-5px;top:64px;width:7px;height:26px;background:#94a3b8;border-radius:3px}
.sw-btn{position:absolute;right:-3px;top:104px;width:4px;height:34px;background:#334155;border-radius:3px}

.sw-screen{width:148px;height:176px;border-radius:40px;overflow:hidden;background:#000;color:#fff;display:flex;align-items:center;justify-content:center}
.sw-face{position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px}
.sw-time{font-size:34px;font-weight:700;letter-spacing:-1px;color:#34d399;font-variant-numeric:tabular-nums;line-height:1}
.sw-date{font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:1px;margin-top:2px}
.sw-rings{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:.32}
.sw-bg{fill:none;stroke:#1e293b;stroke-width:7}
.sw-r{fill:none;stroke-width:7;stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset 1s ease}
.r1{stroke:#fb2576}.r2{stroke:#a3e635}.r3{stroke:#22d3ee}
.sw-complications{display:flex;gap:14px;margin-top:auto;font-size:14px;font-weight:800;font-variant-numeric:tabular-nums}
.sw-complications small{font-size:9px;font-weight:700;color:#94a3b8;margin-left:1px}

.sw-toggle{margin-top:22px;background:#0f172a;color:#fff;border:none;border-radius:9px;padding:9px 16px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit}
.sw-toggle:hover{background:#1e293b}`,

  js: `var timeEl = document.getElementById('swTime');
var dateEl = document.getElementById('swDate');
var DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function tick() {
  var d = new Date();
  var h = d.getHours() % 12 || 12;
  timeEl.textContent = h + ':' + ('0' + d.getMinutes()).slice(-2);
  dateEl.textContent = DAYS[d.getDay()] + ' ' + d.getDate();
}
tick();
setInterval(tick, 5000);

// Animate the activity rings using stroke-dasharray, like Apple Watch.
var rings = [
  { el: document.querySelector('.r1'), r: 42, pct: 0 },
  { el: document.querySelector('.r2'), r: 32, pct: 0 },
  { el: document.querySelector('.r3'), r: 22, pct: 0 }
];
rings.forEach(function (ring) {
  var c = 2 * Math.PI * ring.r;
  ring.circ = c;
  ring.el.style.strokeDasharray = c;
  ring.el.style.strokeDashoffset = c;
});

var closed = false;
function setRings(targets) {
  rings.forEach(function (ring, i) {
    ring.el.style.strokeDashoffset = ring.circ * (1 - targets[i]);
  });
}

document.getElementById('swToggle').addEventListener('click', function () {
  closed = !closed;
  document.getElementById('swScreen').querySelector('.sw-rings').style.opacity = closed ? '1' : '.32';
  setRings(closed ? [0.86, 0.72, 0.95] : [0, 0, 0]);
  this.textContent = closed ? 'Reset rings' : 'Close rings';
});`,

  seo: {
    title: 'Smartwatch Mockup — Free CSS Watch Face Device Snippet',
    description: `A pure-CSS smartwatch mockup with bands, crown, a live clock face, and animated activity rings. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Smartwatch Mockup — CSS Watch Frame with Activity Rings',
      description: `A smartwatch mockup presents a watch face design inside a wearable device frame — for fitness apps, complications, and wearable concepts. This snippet builds an Apple-Watch-style one in pure HTML and CSS (bands, digital crown, side button, rounded screen) with a live clock and animated activity rings, in vanilla JavaScript with no dependency.

**The watch body and bands**

The case is a rounded square with a heavily-curved \`border-radius\`, an \`inset box-shadow\` edge, and a soft drop shadow. The two bands are gradient \`<span>\`s positioned above and below the case with \`z-index:-1\` so they tuck behind it, and the digital crown and side button are slivers on the right edge — all CSS, no image, so it scales cleanly and recolors at will.

**A live OLED-style face**

The screen is pure black (like an always-on OLED), with a green digital time that updates live, an abbreviated date built from a \`DAYS\` array, and two complications (heart rate, steps) at the bottom. The bright monospace-numeral time over black is the classic smartwatch look, achieved with font weight and letter-spacing rather than a custom font.

**Activity rings with stroke-dasharray**

The three concentric rings are the centerpiece. Each is an SVG \`<circle>\` whose \`stroke-dasharray\` equals its circumference (\`2πr\`) and whose \`stroke-dashoffset\` starts at full (empty). Animating the offset toward \`circumference × (1 - percent)\` fills the ring proportionally, and a 1s \`transition\` makes them sweep closed — exactly the technique behind real activity rings. A \`-90°\` rotation starts each ring at the top, and \`stroke-linecap: round\` gives the soft ends.

**Interactive "close your rings"**

A toggle animates all three rings from empty to their targets (86%, 72%, 95%) and brightens them, then resets — a satisfying demo of the fill animation and a stand-in for live fitness data. Because each ring's geometry is precomputed, setting a new percentage is a single offset assignment.

**Reusing it**

Swap the complications, recolor the rings, or replace the face entirely — the frame is a reusable wrapper. Feed real heart-rate or step data into \`setRings()\` and the time from a device, and pair it with a [phone mockup](/ui-snippets/phone-mockup/) to present a companion app.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A CSS smartwatch renders with a live face and dim activity rings.` },
      { title: 'Watch the clock', text: `The time and date update live on the watch face.` },
      { title: 'Press close rings', text: `The three rings sweep from empty to their targets.` },
      { title: 'Reset them', text: `Toggle again to animate the rings back to empty.` },
      { title: 'Recolor the rings', text: `Change the stroke colors for your own metrics.` },
      { title: 'Feed real data', text: `Drive setRings() from live fitness values.` },
    ] },
    features: [
      { title: 'Pure-CSS watch', text: `Case, bands, crown, and button with no images.` },
      { title: 'Live OLED face', text: `Green digital time over true black, updating live.` },
      { title: 'Activity rings', text: `SVG stroke-dasharray fills like Apple Watch.` },
      { title: 'Smooth sweep', text: `A 1s transition animates the rings closed.` },
      { title: 'Top-start rings', text: `A -90° rotation begins each fill at twelve.` },
      { title: 'Complications', text: `Heart rate and steps at the bottom of the face.` },
      { title: 'Reusable frame', text: `Swap the face for any watch UI.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS for wearable mockups.` },
    ],
    useCases: [
      { title: 'Fitness app concepts', text: 'Show rings beside an [activity rings](/ui-snippets/activity-rings/) set, with SVG `stroke-dasharray` rings filling like an Apple Watch through a one-second sweep.' },
      { title: 'Wearable design presentations', text: 'Present a watch face next to a [phone mockup](/ui-snippets/phone-mockup/) to show a companion pair, with bands, crown and button drawn in CSS only.' },
      { title: 'Health dashboards', text: 'Pair with a [gauge chart](/ui-snippets/gauge-chart/) of vitals, using a live OLED-style green digital time over true black.' },
      { title: 'Complication design', text: 'Prototype watch faces alongside a [metric card grid](/ui-snippets/metric-card-grid/), updating the clock from real time every second.' },
      { title: 'Marketing frames', text: 'Frame a watch app inside a [bento grid](/ui-snippets/bento-grid/), and use it to learn how ring progress is drawn through dash arrays.' },
    ],
    faqs: [
      { q: 'How are the activity rings animated?', a: `Each ring is an SVG circle whose stroke-dasharray equals its circumference (2πr) and whose stroke-dashoffset starts at the full circumference, hiding the stroke. Setting the offset to circumference × (1 - percent) reveals that fraction, and a 1-second CSS transition makes it sweep. A -90° rotation starts the fill at the top and round line caps soften the ends.` },
      { q: 'Is the watch an image?', a: `No, it's pure CSS. The case is a heavily-rounded square with an inset edge shadow, the bands are gradient spans tucked behind it with negative z-index, and the crown and button are slivers on the edge. Because there's no photo, the watch stays sharp at any size and every part can be recolored.` },
      { q: 'Does the watch show the real time?', a: `Yes. A tick function reads the current Date, formats a 12-hour time, and builds an abbreviated day-and-date label from a day-name array, updating on an interval. The bright green numerals over the black face mimic an always-on OLED display.` },
      { q: 'Can I drive the rings with real fitness data?', a: `Yes. Each ring's circumference is precomputed, so setting a new fill is a single stroke-dashoffset assignment via the setRings() function with three percentages. Pass live move, exercise, and stand values (0 to 1) and the rings animate to match; feed device time into the clock the same way.` },
      { q: 'How do I use this smartwatch mockup in React, Vue, or Angular?', a: `Make the watch a component and bind each ring's strokeDashoffset to a percent in state, updating it from your data. Put the clock interval in a mount effect with cleanup. Expose a slot to swap the whole face. In Tailwind, build the case and bands with rounded utilities and gradients, and keep the rings as an inline SVG with bound offsets.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the ring-fill geometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each ring's stroke-dasharray is set to its own circumference (2 times pi times r) and why stroke-dashoffset at that same value hides the entire stroke, or why the whole SVG is rotated -90 degrees so the fill animation starts at 12 o'clock instead of 3 o'clock. The same assistant can help optimize it, for instance checking whether the setInterval clock tick at 5 seconds is the right tradeoff between accuracy and unnecessary re-renders for a watch face that only displays minutes. It is just as useful for extending the mockup: ask it to add a fourth outer ring for a custom metric, make the complications tappable to cycle through different data views, or drive the rings from a real fitness API response instead of the hardcoded target percentages. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a CSS-and-SVG "smartwatch mockup" with animated activity rings in plain HTML, CSS, and JavaScript — no images, no canvas, no libraries.

Requirements:
- A watch case built entirely from CSS shapes: a heavily rounded rectangular body, two band segments (top and bottom) positioned behind the case using a negative z-index so they appear to pass under it, a thin digital crown sliver, and a side button sliver — all using gradients and border-radius, no bitmap images.
- Inside the case, a rounded rectangular screen rendering a black watch face containing: a live-updating digital time display and abbreviated day/date label driven by JavaScript's Date object on a repeating interval, and two or more small "complications" (e.g. heart rate, step count) as text.
- Three concentric SVG circles as activity rings. For each ring, set its stroke-dasharray to its own circumference (2 * PI * radius) and its initial stroke-dashoffset to that same full circumference so it renders fully hidden. Rotate the whole ring SVG group -90 degrees around its center so ring fills begin at the 12 o'clock position, and use round line caps on the ring strokes.
- A function that accepts a percentage per ring and sets each ring's stroke-dashoffset to circumference times (1 minus that percentage), animated with a CSS transition on stroke-dashoffset (around 1 second, ease timing) so the ring visibly sweeps to its new fill level.
- A toggle control that calls this fill function with a set of target percentages to demonstrate the rings animating from empty to filled, and back to empty when toggled again, also adjusting the ring group's opacity between a dim "inactive" state and a bright "active" state.`,
    },
  },
};

export default smartwatchMockup;
