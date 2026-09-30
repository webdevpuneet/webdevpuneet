const scrollDataStoryCounters = {
  id: 'scroll-data-story-counters',
  title: 'Scroll Data Story Counters',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="dsc-intro"><h1>Five Years of Growth</h1><p>Scroll to move through time — the counters track your exact position.</p></section>
<section class="dsc-pin" id="dscPin">
  <div class="dsc-year" id="dscYear">2021</div>
  <div class="dsc-grid">
    <div class="dsc-metric">
      <div class="dsc-value" id="dscUsers">180K</div>
      <div class="dsc-metric-label">Active users</div>
    </div>
    <div class="dsc-metric">
      <div class="dsc-value" id="dscRevenue">$2.1M</div>
      <div class="dsc-metric-label">Annual revenue</div>
    </div>
    <div class="dsc-metric">
      <div class="dsc-value" id="dscCountries">14</div>
      <div class="dsc-metric-label">Countries served</div>
    </div>
    <div class="dsc-metric">
      <div class="dsc-value" id="dscTeam">9</div>
      <div class="dsc-metric-label">Team members</div>
    </div>
  </div>
  <div class="dsc-scrubtrack"><div class="dsc-scrub-fill" id="dscScrubFill"></div></div>
  <div class="dsc-hint">Scroll up or down — every number is a direct function of scroll position, not a one-time count-up.</div>
</section>
<section class="dsc-outro"><p>Scroll back to any year and the numbers snap right back to exactly where they were.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080b;color:#fff;min-height:100vh}
.dsc-intro,.dsc-outro{min-height:65vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.dsc-intro h1{font-size:clamp(28px,6vw,50px);letter-spacing:-.02em}
.dsc-intro p,.dsc-outro p{color:#8b90a8;font-size:15px;max-width:460px}
.dsc-pin{position:relative;height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;padding:24px}
.dsc-year{font-size:clamp(60px,12vw,120px);font-weight:800;letter-spacing:-.03em;color:rgba(255,255,255,.08);position:absolute;top:6%;font-variant-numeric:tabular-nums;user-select:none}
.dsc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,4vw,48px);max-width:900px;width:100%;z-index:1}
.dsc-metric{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
.dsc-value{font-size:clamp(26px,4.5vw,44px);font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#38bdf8,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent;font-variant-numeric:tabular-nums}
.dsc-metric-label{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8b90a8}
.dsc-scrubtrack{width:min(420px,80vw);height:4px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;z-index:1}
.dsc-scrub-fill{width:0%;height:100%;background:linear-gradient(90deg,#38bdf8,#818cf8);border-radius:999px}
.dsc-hint{font-size:12px;color:#5b6072;max-width:340px;text-align:center;z-index:1}
@media (max-width:680px){.dsc-grid{grid-template-columns:repeat(2,1fr);gap:28px}}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Each metric interpolates between a start and end value across the full
// scrub range — the counter's displayed number IS the scroll position,
// not a count-up animation that happens to be triggered by scroll. Scrub
// to the middle of the range and every number is exactly, deterministically
// at its midpoint value; scroll up and every number retreats precisely,
// with no re-triggering or replaying involved.
const METRICS = [
  { el: 'dscUsers', from: 180000, to: 2400000, format: (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : Math.round(n / 1000) + 'K' },
  { el: 'dscRevenue', from: 2.1, to: 48.6, format: (n) => '$' + n.toFixed(1) + 'M' },
  { el: 'dscCountries', from: 14, to: 92, format: (n) => Math.round(n).toString() },
  { el: 'dscTeam', from: 9, to: 210, format: (n) => Math.round(n).toString() },
];

const yearEl = document.getElementById('dscYear');
const scrubFill = document.getElementById('dscScrubFill');
const START_YEAR = 2021;
const END_YEAR = 2026;

const elements = METRICS.map((m) => ({ ...m, node: document.getElementById(m.el) }));

ScrollTrigger.create({
  trigger: '#dscPin',
  start: 'top top',
  end: '+=2800',
  pin: true,
  scrub: 0.3, // a touch of scrub lag smooths trackpad jitter without
              // breaking the "value = scroll position" contract meaningfully
  onUpdate(self) {
    const p = self.progress;

    elements.forEach((m) => {
      const value = m.from + (m.to - m.from) * p;
      m.node.textContent = m.format(value);
    });

    const year = START_YEAR + (END_YEAR - START_YEAR) * p;
    yearEl.textContent = Math.floor(year);
    scrubFill.style.width = (p * 100).toFixed(1) + '%';
  },
});`,

  seo: {
    title: 'Scroll Data Story Counters — Free GSAP ScrollTrigger Scrub-Driven Metrics',
    description: `KPI counters whose displayed values are computed directly from scroll position via GSAP ScrollTrigger scrub, not a one-time count-up — scroll to any point and every number lands exactly where the math says it should.`,
    about: {
      title: 'Scroll Data Story Counters — Numbers That ARE Your Scroll Position',
      description: `Most "count up on scroll" effects trigger a fixed-duration animation once a number enters the viewport — useful, but the count-up always runs the same way regardless of exactly where or how fast you scrolled. This snippet does something different: every metric's displayed value is computed live, every frame, as a direct linear function of scroll progress, so scrubbing to any point in the pinned section deterministically produces the exact same numbers every time.

**\`scrub\`, not \`onEnter\`, is the entire mechanism**

A single \`ScrollTrigger\` with \`scrub: 0.3\` covers the whole pinned section. Its \`onUpdate\` callback receives \`self.progress\` — a 0-to-1 value tied directly to scroll position — and for every metric computes \`from + (to - from) * progress\`, a plain linear interpolation. There is no \`duration\`, no easing curve, no "play once" state to track: the number at any scroll position is pure arithmetic on that position, which is what makes scrolling backward instantly and exactly reverse-correct rather than needing to "un-animate."

**Four metrics, one shared progress value, zero drift**

Every metric object in the \`METRICS\` array — users, revenue, countries, team size — reads the exact same \`p\` value inside the same \`onUpdate\` call. Because all four numbers, the year label, and the scrub-progress fill bar are derived from one shared variable in one function call, they can never fall out of sync with each other the way four independently-triggered count-up animations with different durations could.

**Per-metric formatting, shared interpolation**

Each metric supplies its own \`format(n)\` function — users abbreviate to K/M, revenue gets a dollar sign and one decimal, countries and team size round to whole numbers — while the interpolation math itself (\`from + (to - from) * progress\`) is completely generic and metric-agnostic. Adding a fifth metric is adding one object to the array with its own \`from\`, \`to\`, and \`format\`; the scrub loop needs no changes.

**A light scrub value, not zero**

\`scrub: 0.3\` (rather than \`scrub: true\`, which is equivalent to instantaneous 1:1 tracking) adds a small easing lag that smooths out jittery trackpad or mouse-wheel input, without meaningfully breaking the "value equals position" contract — the lag settles within a couple hundred milliseconds, which is imperceptible compared to the multi-thousand-pixel scroll range the counters interpolate across.

**How this differs from a count-up-on-enter pattern**

The [scroll stat reveal story](/ui-snippets/scroll-stat-reveal-story/) snippet in this library counts up once, with its own fixed duration and easing, the first time a stat scrolls into view — good for a single dramatic reveal per stat. This snippet instead ties every value continuously to scroll position for the entire pinned section, better suited to narrating change *over* a range (a multi-year growth story) rather than revealing one static end value.

**Customizing it**

Add metrics to the array with their own \`from\`/\`to\`/\`format\`, and adjust \`START_YEAR\`/\`END_YEAR\` to match your real timeline — the year label interpolates with the exact same linear formula as every metric. Pair with a [scroll company timeline](/ui-snippets/scroll-company-timeline/) immediately after for a milestone-by-milestone follow-up to the aggregate growth story.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP and ScrollTrigger', text: `Load both from the CDN and call gsap.registerPlugin(ScrollTrigger).` },
      { title: 'Paste the HTML, CSS, and JS', text: `Counters start at their "from" values and the year shows the start year.` },
      { title: 'Scroll into the pinned section', text: `Every counter and the year interpolate continuously with scroll position.` },
      { title: 'Scroll to any point and stop', text: `Numbers land exactly on their computed value for that exact scroll position.` },
      { title: 'Scroll back up', text: `Values retreat precisely — there's no count-up animation to "undo."` },
      { title: 'Edit the METRICS array', text: `Set from, to, and a format function per metric — the interpolation logic never changes.` },
    ] },
    features: [
      { title: 'Position-locked values, not one-shot count-ups', text: `Every number is deterministic arithmetic on scroll progress, every frame.` },
      { title: 'Zero drift across metrics', text: `All values, the year, and the fill bar derive from one shared progress value.` },
      { title: 'Instant, exact reverse behavior', text: `Scrolling up retreats numbers precisely — no animation state to reverse.` },
      { title: 'Per-metric formatting, shared math', text: `Each metric supplies its own display format; interpolation logic is generic.` },
      { title: 'Light scrub smoothing', text: `A small scrub value smooths jittery input without breaking scroll-locked accuracy.` },
      { title: 'Extensible metric list', text: `Add a metric object with from/to/format — no other logic needs updating.` },
      { title: 'Linear year narration', text: `A background year label tracks the same progress value as the metrics.` },
      { title: 'Fully pinned, single-viewport layout', text: `Metrics stay grouped in one frame rather than scattered across long scroll.` },
    ],
    useCases: [
      { title: 'Annual report growth narratives', text: `Let readers scrub through multi-year KPI growth at their own pace.` },
      { title: 'Investor and fundraising decks', text: `Show traction metrics as a continuous, exactly-scrubbable trajectory.` },
      { title: 'SaaS "our growth" marketing pages', text: `Narrate user, revenue, and team growth with position-accurate counters.` },
      { title: 'Sustainability or impact dashboards', text: `Interpolate environmental or program metrics across a reporting period.` },
      { title: 'Internal all-hands or board presentation microsites', text: `Give stakeholders a scrubbable, exact view of company trajectory.` },
      { title: 'Data journalism explainers', text: `Pair with a scrollytelling chart for a combined numeric-and-visual narrative.` },
      { icon: 'CODE', title: 'Related: Scroll-Triggered Overshoot Counter', desc: 'See the [Scroll-Triggered Overshoot Counter](/ui-snippets/scroll-counter-overshoot/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How is this different from a normal "count up when scrolled into view" counter?`, a: `A typical count-up counter plays a fixed-duration animation once, triggered the first time an element enters the viewport — the number always counts through the same fixed sequence regardless of exactly where or how you scrolled. This snippet instead computes each value as from + (to - from) * scrollProgress inside onUpdate, every single frame, so the displayed number is a direct, deterministic function of scroll position — stop scrolling at any point and the number is exactly, reproducibly correct for that position, with no animation duration or triggered state involved at all.` },
      { q: `Why do all four metrics, the year label, and the fill bar read the same progress variable?`, a: `They're all computed inside the same onUpdate callback from the same self.progress value passed in by ScrollTrigger for that frame. Since there's only one progress number and every displayed value is a pure function of it, none of the outputs can ever drift out of sync with each other — unlike four independently-triggered count-up animations, which could easily finish at slightly different scroll positions if their durations or easings differ.` },
      { q: `Why is scrub set to 0.3 instead of true or 0?`, a: `scrub: true (equivalent to 0) ties the tween's position to the scrollbar with zero lag — visually correct but can look jittery on a trackpad or a mouse wheel with uneven deltas. A small value like 0.3 tells GSAP to smooth the followed value over roughly 0.3 seconds, which absorbs that jitter. Because the pinned scroll range spans thousands of pixels, that small lag is imperceptible relative to the whole range — the "value equals position" behavior still holds for all practical purposes.` },
      { q: `How do I add a fifth metric to the counter grid?`, a: `Add a new HTML element with a unique id for its value display, add a matching grid cell with a label, and add one new object to the METRICS array with that same el id, a from value, a to value, and a format function describing how to render the interpolated number. No other JavaScript needs to change — the array-mapping and onUpdate loop both operate generically over however many entries the METRICS array contains.` },
      { q: `How do I build this scroll-scrubbed counter in React, Vue, or Angular?`, a: `Create the ScrollTrigger inside a mount effect after the metric elements have rendered, and write each interpolated value as a direct textContent update inside onUpdate rather than through component state — updating state at scroll-frame frequency would trigger excessive re-renders. Keep the METRICS array and DOM node references in a ref (or module-level constant scoped to the component) and call the ScrollTrigger instance's .kill() in the cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why computing each metric's value as a linear interpolation of scroll progress, evaluated fresh every onUpdate frame, produces fundamentally different (and more precisely scrubbable) behavior than a triggered, fixed-duration count-up animation — and why that same technique guarantees the four metrics, the year label, and the progress bar can never drift out of sync with each other. The same assistant can help extend the pattern — ask it to add a non-linear interpolation curve for a metric that grew faster in later years, add a secondary set of counters that only start interpolating partway through the scroll range, or sync a background gradient shift to the same progress value used for the counters. Treat the code as a working starting point for your own scroll-scrubbed data narrative.`,
      prompt: `Build a "scroll data story counters" section in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A pinned full-viewport section containing a large background year label, a grid of several metric tiles (each with a large formatted numeric value and a label underneath), and a thin progress fill bar, preceded by an intro section and followed by an outro section.
- Store each metric's starting value, ending value, and a formatting function (for currency, abbreviated large numbers like K/M, or plain integers) in a single JavaScript array, rather than hardcoding formatting logic per element.
- Create a single ScrollTrigger on the pinned section with pin: true and a scrub value (a small fractional value like 0.3 for slight smoothing, not zero lag and not a large sluggish value), covering one fixed total pinned scroll distance.
- Inside that ScrollTrigger's onUpdate callback, for every metric in the array, compute its currently displayed value as a linear interpolation between its starting and ending value using the callback's own scroll progress fraction (from + (to - from) * progress) and update that metric's DOM text using its own formatting function — do not use any duration-based or triggered count-up animation for the metric values themselves.
- In the same onUpdate callback, compute a displayed year value using the identical linear interpolation formula between a start year and an end year, and update the fill bar's width from the same progress fraction, so every displayed number, the year label, and the fill bar are all guaranteed to derive from one single shared progress value with no possibility of drifting out of sync with each other.
- Confirm that scrolling to any arbitrary point within the pinned range, in either direction, produces exactly the same displayed values every time (since they are pure functions of scroll position), and that scrolling back up smoothly and precisely retreats every value with no separate reverse-animation logic required.`,
    },
  },
};

export default scrollDataStoryCounters;
