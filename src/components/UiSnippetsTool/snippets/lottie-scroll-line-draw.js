const lottieScrollLineDraw = {
  id: 'lottie-scroll-line-draw',
  title: 'Lottie Scroll Line Draw',
  lastmod: '2026-07-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ldr-stage" id="ldrStage">
  <div class="ldr-intro-overlay"><p>Scroll ↓ to draw the line</p></div>
  <div class="ldr-wrap"><div class="ldr-canvas" id="ldrMount"></div></div>
  <div class="ldr-hud"><span id="ldrPct">0</span>% drawn</div>
</section>
<section class="ldr-bottom"><p>The line is complete — scroll up to erase it.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0a12;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.ldr-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7c83a6;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.ldr-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 42%,#141528 0%,#0a0a12 60%)}
.ldr-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8a90c0;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
.ldr-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.ldr-canvas{width:min(88vw,540px);height:320px}
.ldr-canvas svg{display:block;filter:drop-shadow(0 0 22px rgba(116,132,250,.4))}
.ldr-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#a5b4fc;text-transform:uppercase;opacity:.85}`,

  js: `const mount = document.getElementById('ldrMount');
const pctEl = document.getElementById('ldrPct');
const intro = document.querySelector('.ldr-intro-overlay');

// Helpers that BUILD Lottie JSON in code. Every animated keyframe gets its
// i/o easing tangents — without them lottie-web treats a keyframe as a HOLD
// keyframe and never interpolates, so the animation silently renders blank.
const S = (v) => ({ a: 0, k: v });
function kfS(pairs) {
  return { a: 1, k: pairs.map((p, i) => i < pairs.length - 1
    ? { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: p[0], s: [p[1]] }
    : { t: p[0], s: [p[1]] }) };
}
function kfM(pairs, dim) {
  const t = Array(dim).fill(0.5);
  return { a: 1, k: pairs.map((p, i) => i < pairs.length - 1
    ? { i: { x: t.slice(), y: t.slice() }, o: { x: t.slice(), y: t.slice() }, t: p[0], s: p[1] }
    : { t: p[0], s: p[1] }) };
}

const W = 540, H = 320, X0 = 50, X1 = 490, CY = 160, AMP = 50, CYC = 1.5;

// A flowing sine wave as a dense polyline — trim will draw it left to right.
// NB: build FRESH i/o tangent arrays each call. lottie-web rewrites tangent
// arrays in place (relative -> absolute), so sharing one array between the in
// and out tangents, or reusing a path object across two layers, corrupts it.
const N = 56;
function makeWavePath() {
  const v = [], i = [], o = [];
  for (let k = 0; k < N; k++) {
    const f = k / (N - 1);
    v.push([X0 + (X1 - X0) * f, CY + AMP * Math.sin(f * Math.PI * 2 * CYC)]);
    i.push([0, 0]); o.push([0, 0]);
  }
  return { i, o, v, c: false };
}

// A dot that rides the leading edge of the draw, sampled along the wave.
const dotKf = [];
for (let fr = 0; fr <= 120; fr += 6) {
  const f = fr / 120;
  dotKf.push([fr, [X0 + (X1 - X0) * f, CY + AMP * Math.sin(f * Math.PI * 2 * CYC)]]);
}

function strokeGroup(color, width, drawn) {
  const it = [{ ty: 'sh', d: 1, ks: S(makeWavePath()) }];
  if (drawn) it.push({ ty: 'tm', s: S(0), e: kfS([[0, 0], [120, 100]]), o: S(0), m: 1 });
  it.push({ ty: 'st', c: S(color), o: S(drawn ? 100 : 14), w: S(width), lc: 2, lj: 2 });
  it.push({ ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) });
  return { ty: 'gr', it };
}

function layer(ind, nm, shapes) {
  return { ddd: 0, ind, ty: 4, nm, sr: 1,
    ks: { o: S(100), r: S(0), p: S([0, 0, 0]), a: S([0, 0, 0]), s: S([100, 100, 100]) },
    ao: 0, shapes, ip: 0, op: 120, st: 0, bm: 0 };
}

const animationData = {
  v: '5.7.4', fr: 60, ip: 0, op: 120, w: W, h: H, nm: 'line-draw', ddd: 0, assets: [],
  layers: [
    layer(1, 'dot', [{ ty: 'gr', it: [
      { ty: 'el', d: 1, s: S([20, 20]), p: S([0, 0]) },
      { ty: 'fl', c: S([0.75, 0.82, 1, 1]), o: S(100) },
      { ty: 'tr', p: kfM(dotKf, 2), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
    ] }]),
    layer(2, 'wave', [strokeGroup([0.45, 0.55, 0.98, 1], 7, true)]),
    layer(3, 'track', [strokeGroup([1, 1, 1, 1], 7, false)]),
  ],
};

// Load the animation but DON'T autoplay — scroll, not a timer, drives it.
const anim = lottie.loadAnimation({
  container: mount, renderer: 'svg', loop: false, autoplay: false, animationData,
});

let total = 0;
anim.addEventListener('DOMLoaded', () => { total = anim.totalFrames; });

gsap.registerPlugin(ScrollTrigger);

// One scrubbed 0 -> 1 value maps straight onto the animation's frame range.
const state = { p: 0 };
gsap.to(state, {
  p: 1, ease: 'none',
  scrollTrigger: { trigger: '#ldrStage', start: 'top top', end: '+=400%', scrub: 0.5, pin: true },
});

// Every frame, seek the Lottie to the frame for the current scroll position.
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
    title: 'Lottie Scroll Line Draw — Scroll-Drawn SVG Path',
    description: 'Draw a flowing Lottie line as you scroll, with a dot riding the tip, using lottie-web and GSAP. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Draw a Lottie Line on Scroll With a Trim Path, lottie-web and GSAP',
      description: `The **Lottie Scroll Line Draw** snippet strokes a flowing wave onto the screen as the visitor scrolls, with a glowing dot riding the leading edge of the line, and erases it again on the way back up. Nothing plays on a timer — the scrollbar drives the animation frame by frame — and the whole Lottie is generated in JavaScript rather than exported from After Effects, so you can see exactly how the drawing effect is built.

**Lottie is JSON, and here it is built in code**

A Lottie animation is a JSON document of vector layers and keyframes. Most tutorials fetch one with \`lottie.loadAnimation({ path: 'anim.json' })\`, but this snippet constructs the JSON object directly and passes it as \`animationData\`, so there is nothing to host and nothing that can 404. A pair of tiny helpers — one for scalar keyframes, one for multi-value keyframes — assemble the animation, and both always attach the easing tangents every animated keyframe needs.

**The one keyframe detail that matters most**

When you author a Lottie by hand, every animated keyframe must carry its \`i\` (in) and \`o\` (out) bezier tangents. Omit them and lottie-web treats the keyframe as a hold keyframe: it never interpolates, and the value stays frozen at the first keyframe forever. For a trim animating 0 to 100 that means the line never draws. The helpers here set linear tangents with control points at 0.5/0.5 on every keyframe, which is why the line grows smoothly instead of staying blank.

**The draw effect is a trim path**

The wave itself is a dense polyline — a sine sampled at sixty-odd points — wrapped in a Lottie **trim path** (shape type \`tm\`). A trim path renders only a portion of a stroked path, from a start percentage to an end percentage. Animating the trim's end from 0 to 100 across the timeline makes the stroke look like it is being drawn by a pen. A second, faint copy of the exact same path sits behind it with no trim, so the full route is always faintly visible — the same idea as a progress track. This is the vector equivalent of animating \`stroke-dashoffset\` on an SVG path, but expressed inside the Lottie so it travels with the animation.

**A dot that rides the tip**

To make the draw feel alive, a filled dot follows the leading edge of the line. Because the trim end and the dot both advance linearly over the same 120 frames, the tip position is predictable: the snippet samples the wave function at regular frames and keyframes the dot's position to match. The result is a dot that appears to be pulling the line into existence as you scroll.

**Autoplay off, scroll on**

The animation is loaded with \`autoplay: false\` so its internal clock never runs. Instead a GSAP ScrollTrigger pins the stage and scrubs a single plain value from 0 to 1 as the visitor scrolls through a range several viewport-heights tall. A \`requestAnimationFrame\` loop reads that value every frame and calls \`anim.goToAndStop(p * (totalFrames - 1), true)\` — the \`true\` tells lottie-web the value is a frame number, and \`goToAndStop\` renders a single still frame without starting playback. Because lottie-web interpolates between keyframes, fractional frames render smoothly.

**Reversible for free**

Deriving the frame from one scrubbed value means scrolling up simply produces smaller values, so the line un-draws and the dot travels backward with no extra reverse-playback code. A smoothed \`scrub: 0.5\` lets the drawing glide toward the scroll position rather than snapping to every noisy wheel tick, and the intro caption fades out the moment drawing begins. Pair it with the ring-drawing [Lottie scroll scrub](/ui-snippets/lottie-scroll-scrub/) or a [scroll typewriter](/ui-snippets/scroll-typewriter/) for a full scroll-driven sequence.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add lottie.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste the HTML, CSS, and JS', text: 'A faint wave track appears centred in a pinned stage with a live "% drawn" read-out.' },
        { title: 'Scroll down', text: 'The coloured line strokes on left to right and a dot rides its leading edge, tied directly to scroll position.' },
        { title: 'Scroll back up', text: 'The line un-draws exactly, because goToAndStop seeks a single frame rather than playing on a timer.' },
        { title: 'Reshape the line', text: 'Edit the wave function (amplitude, cycles) or replace the generated points with your own path to draw any shape.' },
        { title: 'Tune the length', text: 'Change the ScrollTrigger end value (+=400%) for a longer, slower draw or a shorter, quicker one.' },
      ],
    },
    features: [
      'Lottie JSON built in code with keyframe helpers — no exported file, nothing to fetch or 404',
      'Every animated keyframe carries i/o easing tangents so lottie-web interpolates instead of holding',
      'The draw effect is a Lottie trim path (tm) animating its end from 0 to 100 across the timeline',
      'A filled dot rides the leading edge, its position sampled from the same wave function each frame',
      'Faint static copy of the path behind the drawn line acts as an always-visible route track',
      'autoplay:false + goToAndStop(frame, true): scroll position, not a timer, decides the frame',
      'Fully reversible — scrolling up seeks smaller frames and erases the line for free',
      'SVG renderer with a CSS drop-shadow glow, crisp at any size and easy to recolour',
    ],
    useCases: [
      { icon: 'ANIM', title: 'Signature and route reveals', desc: 'Draw a signature, a delivery route, or a hand-drawn underline exactly as the reader scrolls into the section, so the line feels drawn in real time.' },
      { icon: 'WEB', title: 'Section dividers with motion', desc: 'Use a drawn line as a scroll-reactive divider between page sections, giving long-form pages a sense of progress and craft.' },
      { icon: 'CHART', title: 'Simple trend lines', desc: 'Swap the wave for a data path and let a line chart draw itself on scroll, a lightweight vector alternative to a full charting library.' },
      { icon: 'DESIGN', title: 'Storytelling connectors', desc: 'Connect steps in a narrative or timeline with a line that draws between them as the visitor moves down the page.' },
      { icon: 'LEARN', title: 'Learn Lottie trim paths', desc: 'A compact, readable example of building a Lottie in code and animating a trim path — the core of every draw-on effect. Pair it with the [Lottie scroll scrub](/ui-snippets/lottie-scroll-scrub/) ring.' },
      { icon: 'CODE', title: 'Hero background accents', desc: 'A drawn line makes a subtle, premium hero accent that reacts to scroll without the weight of a video.' },
      { icon: 'CODE', title: 'Related: Lottie Scroll Donut Chart', desc: 'See the [Lottie Scroll Donut Chart](/ui-snippets/lottie-scroll-donut-chart/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why build the Lottie JSON in code instead of loading a file?', a: 'Constructing the animationData object directly keeps the snippet self-contained — there is no second network request, nothing to host, and nothing that can 404 or be blocked by a sandbox. It also makes the drawing logic visible and editable. For your own project you can load an external file instead: delete the animationData object and pass path: "your-animation.json" to loadAnimation. The scroll scrubbing is identical because the player exposes the same API either way.' },
      { q: 'Why does the line stay blank if I edit the keyframes wrong?', a: 'Because lottie-web treats an animated keyframe with no i/o easing tangents as a hold keyframe — it never interpolates, so a trim end keyframed 0 to 100 stays stuck at 0 and the line never draws. The helper functions in this snippet attach linear tangents (control points at 0.5/0.5) to every keyframe, which is what makes the value actually move. If you hand-edit a keyframe and the animation goes blank, missing tangents are the first thing to check.' },
      { q: 'How does the dot follow the exact tip of the line?', a: 'The trim end and the dot both advance linearly over the same 120 frames, so the drawn fraction at any frame is simply frame / totalFrames. The snippet samples the wave function at regular frames and keyframes the dot position to those points, so the dot sits on the leading edge of the drawn stroke throughout. If you reshape the line, regenerating the dot keyframes from the same function keeps them in sync.' },
      { q: 'Why goToAndStop instead of play?', a: 'play runs the animation on its internal clock, which is exactly what you do not want when scroll should control it. goToAndStop(frame, true) renders one specific still frame and never starts the timer — the second argument tells lottie-web the value is a frame number, not milliseconds. Multiplying scroll progress by totalFrames gives the frame to show, and fractional frames interpolate smoothly so the draw is continuous.' },
      { q: 'Can I use this Lottie line draw in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Call lottie.loadAnimation against a ref inside a mount effect, register the ScrollTrigger there, and on cleanup call anim.destroy() and kill the ScrollTrigger instance (or revert a gsap.context) so the SVG and scroll listener are released on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out how a JSON file becomes a scroll-drawn line by hand. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to walk through why every keyframe needs i/o tangents, what goToAndStop's second argument does, or how the trim path draws the stroke. The same assistant can help you extend it — ask it to replace the wave with your own path, add a second line that draws after the first, make the dot leave a fading trail, or load an external Lottie file instead of the inline JSON. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-drawn Lottie line" in plain HTML, CSS, and JavaScript using lottie-web and GSAP's ScrollTrigger plugin, both from a CDN (no bundler).

Requirements:
- A pinned full-height section with a centered container div for the Lottie, an intro caption overlay, and a live "percent drawn" read-out.
- Build the Lottie as an inline animationData JSON object (leave a comment showing how to swap it for path: 'your-animation.json'). Include small helpers that build scalar and multi-value keyframes and ALWAYS attach i/o easing tangents (linear, control points 0.5/0.5) — without them lottie-web holds the value and the animation stays blank.
- The animation is a flowing sine-wave polyline drawn on via an animated trim path (type 'tm') whose end goes 0 to 100, with a faint static copy of the path behind it as a track, plus a filled dot whose position is keyframed to ride the leading edge of the draw (sample the same wave function per frame).
- Load with lottie.loadAnimation using renderer 'svg', loop false, autoplay FALSE.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin true, start at top top, scrub around 0.5, and an end several hundred percent tall, animating one value p from 0 to 1.
- In a requestAnimationFrame loop, read p and call anim.goToAndStop(p * (anim.totalFrames - 1), true), update the read-out, and fade the caption out once p passes a small threshold.
- Confirm scrolling up reverses the draw.`,
    },
  },
};

export default lottieScrollLineDraw;
