const lottieScrollDonutChart = {
  id: 'lottie-scroll-donut-chart',
  title: 'Lottie Scroll Donut Chart',
  lastmod: '2026-07-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="dnt-stage" id="dntStage">
  <div class="dnt-intro-overlay"><p>Scroll ↓ to fill the donut</p></div>
  <div class="dnt-wrap"><div class="dnt-canvas" id="dntMount"></div></div>
  <div class="dnt-hud"><span id="dntPct">0</span>% filled</div>
</section>
<section class="dnt-bottom"><p>The donut is complete — scroll up to empty it.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0a12;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.dnt-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7c83a6;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.dnt-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 42%,#15152b 0%,#0a0a12 60%)}
.dnt-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8a90c0;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
.dnt-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.dnt-canvas{width:340px;height:340px}
.dnt-canvas svg{display:block;filter:drop-shadow(0 0 26px rgba(116,132,250,.32))}
.dnt-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#a5b4fc;text-transform:uppercase;opacity:.85}`,

  js: `const mount = document.getElementById('dntMount');
const pctEl = document.getElementById('dntPct');
const intro = document.querySelector('.dnt-intro-overlay');

// Build Lottie JSON in code. Every animated keyframe gets its i/o easing
// tangents — without them lottie-web holds the value and no segment fills.
const S = (v) => ({ a: 0, k: v });
function kfS(pairs) {
  return { a: 1, k: pairs.map((p, i) => i < pairs.length - 1
    ? { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: p[0], s: [p[1]] }
    : { t: p[0], s: [p[1]] }) };
}

const R = 108, WID = 34, CXY = 170;
const VALUES = [0.4, 0.28, 0.2, 0.12];
const COLORS = [[0.45, 0.53, 0.98, 1], [0.66, 0.42, 0.95, 1], [0.36, 0.85, 0.95, 1], [0.4, 0.9, 0.56, 1]];

// A donut segment is a thick stroked ring, rotated so 0% starts at the top,
// trimmed to its slice: trim START is fixed at the segment's beginning, trim
// END animates from that start to its end over the segment's timeline window.
function segment(ind, startPct, endPct, t0, t1, color) {
  return { ddd: 0, ind, ty: 4, nm: 'seg' + ind, sr: 1,
    ks: { o: S(100), r: S(-90), p: S([CXY, CXY, 0]), a: S([0, 0, 0]), s: S([100, 100, 100]) },
    ao: 0, ip: 0, op: 120, st: 0, bm: 0,
    shapes: [{ ty: 'gr', it: [
      { ty: 'el', d: 1, s: S([R * 2, R * 2]), p: S([0, 0]) },
      { ty: 'tm', s: S(startPct), e: kfS([[t0, startPct], [t1, endPct]]), o: S(0), m: 1 },
      { ty: 'st', c: S(color), o: S(100), w: S(WID), lc: 2, lj: 2 },
      { ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
    ] }] };
}

// Faint full track ring behind the segments.
const track = { ddd: 0, ind: 1, ty: 4, nm: 'track', sr: 1,
  ks: { o: S(12), r: S(0), p: S([CXY, CXY, 0]), a: S([0, 0, 0]), s: S([100, 100, 100]) },
  ao: 0, ip: 0, op: 120, st: 0, bm: 0,
  shapes: [{ ty: 'gr', it: [
    { ty: 'el', d: 1, s: S([R * 2, R * 2]), p: S([0, 0]) },
    { ty: 'st', c: S([1, 1, 1, 1]), o: S(100), w: S(WID), lc: 2, lj: 2 },
    { ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
  ] }] };

// Build the segments, each drawing in its own slice of the timeline in order.
const segments = [];
let startPct = 0, t0 = 0;
for (let k = 0; k < VALUES.length; k++) {
  const endPct = startPct + VALUES[k] * 100;
  const t1 = t0 + VALUES[k] * 120;
  segments.push(segment(k + 2, startPct, endPct, Math.round(t0), Math.round(t1), COLORS[k]));
  startPct = endPct; t0 = t1;
}

const animationData = {
  v: '5.7.4', fr: 60, ip: 0, op: 120, w: 340, h: 340, nm: 'donut-chart', ddd: 0, assets: [],
  layers: [...segments, track],
};

// Load but DON'T autoplay — scroll drives the fill.
const anim = lottie.loadAnimation({
  container: mount, renderer: 'svg', loop: false, autoplay: false, animationData,
});

let total = 0;
anim.addEventListener('DOMLoaded', () => { total = anim.totalFrames; });

gsap.registerPlugin(ScrollTrigger);

const state = { p: 0 };
gsap.to(state, {
  p: 1, ease: 'none',
  scrollTrigger: { trigger: '#dntStage', start: 'top top', end: '+=400%', scrub: 0.5, pin: true },
});

function tick() {
  requestAnimationFrame(tick);
  if (!total) return;
  const p = Math.max(0, Math.min(1, state.p));
  anim.goToAndStop(p * (total - 1), true);
  pctEl.textContent = Math.round(p * 100);
  if (intro) intro.style.opacity = p > 0.02 ? '0' : '1';
}
tick();`,

  seo: {
    title: 'Lottie Scroll Donut Chart — Segments Fill on Scroll',
    description: 'A Lottie donut whose coloured segments draw in one after another as you scroll, using trim paths. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Filled Lottie Donut Chart With Sequential Trim-Path Segments',
      description: `The **Lottie Scroll Donut Chart** snippet fills a multi-colour donut one segment at a time as the visitor scrolls — each coloured slice sweeping in from where the last one ended — and empties it again on the way up. Nothing plays on a timer; the scrollbar drives the fill frame by frame, and the whole chart is generated in JavaScript, so the way each segment draws is fully visible in the code.

**Lottie is JSON, assembled in code**

A Lottie animation is a JSON document of vector layers and keyframes. Instead of fetching one, this snippet builds the \`animationData\` object directly and passes it to \`lottie.loadAnimation\`, so there is nothing to host and nothing that can 404. A \`segment\` helper stamps out each slice as a layer, and a keyframe helper assembles the draw with the easing tangents lottie-web requires.

**Every segment is a trimmed ring**

The donut is not four separate arcs drawn at different angles — it is four copies of the same thick stroked ring, each trimmed to a different slice of the circumference. A Lottie **trim path** (shape type \`tm\`) renders only a portion of a stroked path, from a start percentage to an end percentage. For segment two, for example, the trim start is fixed at forty percent and the trim end animates from forty to sixty-eight percent, so it draws only its own slice, beginning exactly where segment one ended. Every layer carries a minus-ninety-degree rotation so that zero percent starts at the top of the circle, the way a donut chart is conventionally read.

**Drawing the segments in sequence**

Each segment fills during its own window of the timeline. The windows are sized in proportion to the segment values and laid end to end, so the first slice draws over the opening frames, the second picks up right after, and so on until the ring is complete. Before a segment's window its trim end sits at its start percentage, so the slice is invisible until its turn; after the window it holds at full, so it stays drawn. The result is a donut that fills slice by slice in order rather than all at once.

**The one keyframe detail that matters**

When you author a Lottie by hand, every animated keyframe must carry its \`i\` (in) and \`o\` (out) bezier tangents. Omit them and lottie-web treats the keyframe as a hold keyframe: it never interpolates, so a trim end keyframed to grow stays stuck at its start and the slice never draws. The keyframe helper here attaches linear tangents to every keyframe, which is what makes the segments fill.

**Autoplay off, scroll on**

The animation is loaded with \`autoplay: false\` so its internal clock never runs. A GSAP ScrollTrigger pins the stage and scrubs a single plain value from 0 to 1 over a range several viewport-heights tall, and a \`requestAnimationFrame\` loop reads that value every frame and calls \`anim.goToAndStop(p * (totalFrames - 1), true)\`. The \`true\` tells lottie-web the value is a frame number, and \`goToAndStop\` renders a single still frame without starting playback, so the fill is welded to scroll position. Because lottie-web interpolates between keyframes, fractional frames render smoothly.

**Reversible for free**

Deriving the frame from one scrubbed value means scrolling up produces smaller values, so the segments un-draw in reverse order with no extra code. A smoothed \`scrub: 0.5\` lets the fill glide toward the scroll position rather than snapping to every wheel tick, and the caption fades out the moment the first slice appears. Pair it with the [Lottie scroll bar chart](/ui-snippets/lottie-scroll-bar-chart/) or the [Lottie scroll scrub](/ui-snippets/lottie-scroll-scrub/) ring for a fuller data reveal.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add lottie.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste the HTML, CSS, and JS', text: 'A faint track ring appears centred in a pinned stage with a live "% filled" read-out.' },
        { title: 'Scroll down', text: 'The coloured segments draw in one after another around the donut, tied directly to scroll position.' },
        { title: 'Scroll back up', text: 'The segments un-draw exactly, because goToAndStop seeks a single frame rather than playing on a timer.' },
        { title: 'Set your own data', text: 'Edit the VALUES array (fractions that sum to 1) and the COLORS array to plot your own breakdown.' },
        { title: 'Tune the fill', text: 'Change the ScrollTrigger end value (+=400%) for a longer, slower fill or a shorter, quicker one.' },
      ],
    },
    features: [
      'Lottie JSON built in code with keyframe helpers — no exported file, nothing to fetch or 404',
      'Each segment is a thick stroked ring trimmed to its own slice via a Lottie trim path (tm)',
      'Every animated keyframe carries i/o easing tangents so lottie-web interpolates instead of holding',
      'Segments draw in sequence, each over a timeline window sized to its value, starting where the last ended',
      'Minus-ninety-degree layer rotation so zero percent begins at the top, as donut charts are read',
      'autoplay:false + goToAndStop(frame, true): scroll position, not a timer, decides the frame',
      'Fully reversible — scrolling up un-draws the segments in reverse for free',
      'Data-driven: edit one VALUES array and one COLORS array to plot your own breakdown',
    ],
    useCases: [
      { icon: 'CHART', title: 'Scroll-revealed breakdowns', desc: 'Fill a donut of budget, market share, or usage split exactly as the reader scrolls into your data section, so each slice lands with motion.' },
      { icon: 'DASH', title: 'Lightweight dashboard rings', desc: 'A vector donut that reacts to scroll makes a crisp dashboard accent without pulling in a full charting library.' },
      { icon: 'WEB', title: 'Pricing and plan comparisons', desc: 'Show how a plan or budget divides up, drawing each portion as visitors scroll through the explanation.' },
      { icon: 'ANIM', title: 'Report and survey results', desc: 'Animate a survey or composition breakdown into place as its section scrolls in, pairing each slice with its label.' },
      { icon: 'LEARN', title: 'Learn Lottie trim segments', desc: 'A clear example of building multiple trim-path slices from one ring and sequencing them. Pair it with the [Lottie scroll scrub](/ui-snippets/lottie-scroll-scrub/) ring.' },
      { icon: 'CODE', title: 'Data-driven hero graphics', desc: 'Feed real proportions into the VALUES array to turn the donut into a live, scroll-reactive summary of your own data.' },
      { icon: 'CODE', title: 'Related: Locomotive Scroll Sections', desc: 'See the [Locomotive Scroll Sections](/ui-snippets/locomotive-scroll-sections/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does each segment draw only its own slice?', a: 'Every segment is a copy of the same thick stroked ring, but its trim path start is fixed at the segment beginning and its trim end animates from that start to the segment end. So segment two, starting at forty percent, has its trim end grow from forty to sixty-eight percent — it renders only that slice, beginning exactly where segment one finished. A minus-ninety-degree rotation on each layer puts zero percent at the top.' },
      { q: 'Why do the segments stay blank if I edit the keyframes wrong?', a: 'Because lottie-web treats an animated keyframe with no i/o easing tangents as a hold keyframe — it never interpolates, so a trim end keyframed to grow stays stuck at its start and the slice never draws. The keyframe helper in this snippet attaches linear tangents to every keyframe. If you hand-edit a keyframe and a slice stops drawing, missing tangents are the first thing to check.' },
      { q: 'How do I plot my own breakdown?', a: 'Edit the VALUES array so its entries are fractions that sum to 1, and the COLORS array to match. The segment start percentages, timeline windows, and draw order all derive from those values, so they adapt automatically — add or remove entries to change the number of slices. Keep the values summing to 1 so the ring closes cleanly at full scroll.' },
      { q: 'Why goToAndStop instead of play?', a: 'play runs the animation on its internal clock, which is exactly what you do not want when scroll should control it. goToAndStop(frame, true) renders one specific still frame and never starts the timer — the second argument tells lottie-web the value is a frame number, not milliseconds. Multiplying scroll progress by totalFrames gives the frame to show, and fractional frames interpolate smoothly so the fill is continuous.' },
      { q: 'Can I use this Lottie donut chart in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Call lottie.loadAnimation against a ref inside a mount effect, register the ScrollTrigger there, and on cleanup call anim.destroy() and kill the ScrollTrigger instance (or revert a gsap.context) so the SVG and scroll listener are released on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer how a JSON file becomes a scroll-filled donut. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to walk through how each segment is trimmed to its own slice, or why every keyframe needs i/o tangents. The same assistant can help you extend it — ask it to add a percentage label in the centre, a legend beside the donut, feed the VALUES from real data, or animate a slice popping out on the way in. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-filled Lottie donut chart" in plain HTML, CSS, and JavaScript using lottie-web and GSAP's ScrollTrigger plugin, both from a CDN (no bundler).

Requirements:
- A pinned full-height section with a centered container div for the Lottie, an intro caption overlay, and a live "percent filled" read-out.
- Build the Lottie as an inline animationData JSON object (leave a comment showing how to swap it for path: 'your-animation.json'). Include a keyframe helper that ALWAYS attaches i/o easing tangents (linear) — without them lottie-web holds the value and nothing draws.
- The animation is a donut made of several coloured segments. Each segment is a copy of the same thick stroked ring, trimmed to its slice: the trim start is fixed at the segment's beginning percentage and the trim end animates from that start to its end. Rotate every segment layer by -90 degrees so 0% is at the top. Draw the segments in sequence, each over a timeline window sized in proportion to its value and laid end to end. Add a faint full-circle track behind them.
- Load with lottie.loadAnimation using renderer 'svg', loop false, autoplay FALSE.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin true, start at top top, scrub around 0.5, and an end several hundred percent tall, animating one value p from 0 to 1.
- In a requestAnimationFrame loop, read p and call anim.goToAndStop(p * (anim.totalFrames - 1), true), update the read-out, and fade the caption out once p passes a small threshold.
- Confirm scrolling up un-draws the segments in reverse.`,
    },
  },
};

export default lottieScrollDonutChart;
