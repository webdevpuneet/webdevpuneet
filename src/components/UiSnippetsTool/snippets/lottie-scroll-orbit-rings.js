const lottieScrollOrbitRings = {
  id: 'lottie-scroll-orbit-rings',
  title: 'Lottie Scroll Orbit Rings',
  lastmod: '2026-07-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="orb-stage" id="orbStage">
  <div class="orb-intro-overlay"><p>Scroll ↓ to spin the rings</p></div>
  <div class="orb-wrap"><div class="orb-canvas" id="orbMount"></div></div>
  <div class="orb-hud"><span id="orbPct">0</span>% spun</div>
</section>
<section class="orb-bottom"><p>The rings have aligned — scroll up to wind them back.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0a12;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.orb-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7c83a6;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.orb-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 42%,#15162c 0%,#0a0a12 60%)}
.orb-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8a90c0;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
.orb-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.orb-canvas{width:340px;height:340px}
.orb-canvas svg{display:block;filter:drop-shadow(0 0 26px rgba(116,132,250,.35))}
.orb-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#a5b4fc;text-transform:uppercase;opacity:.85}`,

  js: `const mount = document.getElementById('orbMount');
const pctEl = document.getElementById('orbPct');
const intro = document.querySelector('.orb-intro-overlay');

// Build Lottie JSON in code. Every animated keyframe gets its i/o easing
// tangents — without them lottie-web holds the value and nothing rotates.
const S = (v) => ({ a: 0, k: v });
function kfS(pairs) {
  return { a: 1, k: pairs.map((p, i) => i < pairs.length - 1
    ? { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: p[0], s: [p[1]] }
    : { t: p[0], s: [p[1]] }) };
}
function layer(ind, nm, rotDeg, shapes) {
  return { ddd: 0, ind, ty: 4, nm, sr: 1,
    ks: { o: S(100), r: kfS([[0, 0], [120, rotDeg]]), p: S([170, 170, 0]), a: S([0, 0, 0]), s: S([100, 100, 100]) },
    ao: 0, shapes, ip: 0, op: 120, st: 0, bm: 0 };
}

// An arc = a stroked ellipse trimmed to part of its circumference, plus a dot
// riding the arc's leading end. Rotating the whole layer sweeps it around.
function ring(radius, arcPct, color, width) {
  return [
    { ty: 'gr', it: [
      { ty: 'el', d: 1, s: S([radius * 2, radius * 2]), p: S([0, 0]) },
      { ty: 'tm', s: S(0), e: S(arcPct), o: S(0), m: 1 },   // static partial arc
      { ty: 'st', c: S(color), o: S(100), w: S(width), lc: 2, lj: 2 },
      { ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
    ] },
    { ty: 'gr', it: [
      { ty: 'el', d: 1, s: S([width + 6, width + 6]), p: S([radius, 0]) },   // dot at 3 o'clock (arc start)
      { ty: 'fl', c: S([1, 1, 1, 1]), o: S(100) },
      { ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
    ] },
  ];
}

// A faint full track ring behind each arc.
function track(radius, width) {
  return { ddd: 0, ind: 90 + radius, ty: 4, nm: 'track' + radius, sr: 1,
    ks: { o: S(12), r: S(0), p: S([170, 170, 0]), a: S([0, 0, 0]), s: S([100, 100, 100]) },
    ao: 0, ip: 0, op: 120, st: 0, bm: 0,
    shapes: [{ ty: 'gr', it: [
      { ty: 'el', d: 1, s: S([radius * 2, radius * 2]), p: S([0, 0]) },
      { ty: 'st', c: S([1, 1, 1, 1]), o: S(100), w: S(width), lc: 2, lj: 2 },
      { ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
    ] }] };
}

const animationData = {
  v: '5.7.4', fr: 60, ip: 0, op: 120, w: 340, h: 340, nm: 'orbit-rings', ddd: 0, assets: [],
  layers: [
    // central hub
    { ddd: 0, ind: 1, ty: 4, nm: 'hub', sr: 1,
      ks: { o: S(100), r: S(0), p: S([170, 170, 0]), a: S([0, 0, 0]), s: S([100, 100, 100]) },
      ao: 0, ip: 0, op: 120, st: 0, bm: 0,
      shapes: [{ ty: 'gr', it: [
        { ty: 'el', d: 1, s: S([26, 26]), p: S([0, 0]) },
        { ty: 'fl', c: S([0.55, 0.6, 1, 1]), o: S(100) },
        { ty: 'tr', p: S([0, 0]), a: S([0, 0]), s: S([100, 100]), r: S(0), o: S(100) },
      ] }] },
    layer(2, 'ringA', 300,  ring(58,  72, [0.45, 0.53, 0.98, 1], 8)),
    layer(3, 'ringB', -240, ring(100, 55, [0.66, 0.42, 0.95, 1], 8)),
    layer(4, 'ringC', 200,  ring(140, 40, [0.36, 0.85, 0.95, 1], 8)),
    track(58, 8), track(100, 8), track(140, 8),
  ],
};

// Load but DON'T autoplay — scroll drives the rotation.
const anim = lottie.loadAnimation({
  container: mount, renderer: 'svg', loop: false, autoplay: false, animationData,
});

let total = 0;
anim.addEventListener('DOMLoaded', () => { total = anim.totalFrames; });

gsap.registerPlugin(ScrollTrigger);

const state = { p: 0 };
gsap.to(state, {
  p: 1, ease: 'none',
  scrollTrigger: { trigger: '#orbStage', start: 'top top', end: '+=400%', scrub: 0.5, pin: true },
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
    title: 'Lottie Scroll Orbit Rings — Rings Spin on Scroll',
    description: 'Three concentric Lottie arcs spin at different speeds as you scroll, driven by lottie-web and GSAP. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build Scroll-Driven Concentric Orbit Rings in Lottie With Rotation Keyframes',
      description: `The **Lottie Scroll Orbit Rings** snippet spins three concentric arcs around a glowing hub — each at its own speed and direction — as the visitor scrolls, and winds them back when scrolling up. Nothing plays on a timer; the scrollbar drives the rotation frame by frame, and the whole animation is generated in JavaScript so the mechanism is fully visible in the code.

**Lottie is JSON, assembled in code**

A Lottie animation is a JSON document of vector layers and keyframes. Instead of fetching one, this snippet builds the \`animationData\` object directly and passes it to \`lottie.loadAnimation\`, so there is nothing to host and nothing that can 404. Helper functions stamp out each ring as a layer, and a keyframe helper assembles the rotation with the easing tangents lottie-web requires.

**Rotation as the animated property**

A full ring looks identical no matter how it is rotated, so rotation alone would be invisible. The trick here is to draw each ring as a partial arc — a stroked ellipse trimmed to a fraction of its circumference — with a dot riding the arc's leading end. Now the ring is visibly asymmetric, and rotating the entire layer sweeps the arc and its dot around the hub. Each ring layer animates only its transform rotation, from 0 to a target angle, over the timeline.

**The one keyframe detail that matters**

When you author a Lottie by hand, every animated keyframe must carry its \`i\` (in) and \`o\` (out) bezier tangents. Omit them and lottie-web treats the keyframe as a hold keyframe: it never interpolates, so a rotation animated 0 to 300 stays stuck at 0 and nothing spins. The keyframe helper attaches linear tangents to every keyframe, which is what makes the rings turn.

**Different speeds and directions build depth**

The three rings rotate by different amounts and in opposite directions — the inner ring sweeps one way, the middle ring the other, the outer ring a third — so they read as independent orbiting layers rather than one rigid object. A faint full-circle track sits behind each arc so the ring's path is always visible, and a filled hub anchors the centre. That mismatch of rotation is what gives the composition its sense of mechanical depth.

**Autoplay off, scroll on**

The animation is loaded with \`autoplay: false\` so its internal clock never runs. A GSAP ScrollTrigger pins the stage and scrubs a single plain value from 0 to 1 over a range several viewport-heights tall, and a \`requestAnimationFrame\` loop reads that value every frame and calls \`anim.goToAndStop(p * (totalFrames - 1), true)\`. The \`true\` tells lottie-web the value is a frame number, and \`goToAndStop\` renders a single still frame without starting playback, so the rotation is welded to scroll position. Because lottie-web interpolates between keyframes, fractional frames render smoothly.

**Reversible for free**

Deriving the frame from one scrubbed value means scrolling up produces smaller values, so the rings wind back in reverse with no extra code. A smoothed \`scrub: 0.5\` lets the rotation glide toward the scroll position rather than snapping to every wheel tick, and the caption fades out the moment the rings begin to move. Pair it with the [Lottie scroll scrub](/ui-snippets/lottie-scroll-scrub/) ring or a [Three.js scroll orbit showcase](/ui-snippets/three-scroll-orbit-showcase/) for a fuller motion sequence.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add lottie.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste the HTML, CSS, and JS', text: 'Three faint track rings and a hub appear centred in a pinned stage with a live "% spun" read-out.' },
        { title: 'Scroll down', text: 'The three arcs sweep around the hub at different speeds and directions, tied directly to scroll position.' },
        { title: 'Scroll back up', text: 'The rings wind back exactly, because goToAndStop seeks a single frame rather than playing on a timer.' },
        { title: 'Retune the rings', text: 'Change each ring radius, arc length, colour, and its target rotation angle and direction to design your own orbit.' },
        { title: 'Tune the spin', text: 'Change the ScrollTrigger end value (+=400%) for a longer, slower spin or a shorter, quicker one.' },
      ],
    },
    features: [
      'Lottie JSON built in code with keyframe helpers — no exported file, nothing to fetch or 404',
      'Each ring is a partial arc (trimmed ellipse) with a dot on its leading end, so rotation is visible',
      'Every animated keyframe carries i/o easing tangents so lottie-web interpolates instead of holding',
      'Three rings rotate by different amounts and opposite directions for a sense of mechanical depth',
      'Faint full-circle track behind each arc keeps the ring path visible, with a filled hub at the centre',
      'autoplay:false + goToAndStop(frame, true): scroll position, not a timer, decides the frame',
      'Fully reversible — scrolling up winds the rings back in reverse for free',
      'SVG renderer with a CSS drop-shadow glow, crisp at any size and easy to recolour',
    ],
    useCases: [
      { icon: 'ANIM', title: 'Loading and processing states', desc: 'A scroll-reactive orbit reads as a system working — pair it with a section that explains a pipeline, sync, or computation.' },
      { icon: 'WEB', title: 'Tech and product heroes', desc: 'Concentric orbiting rings signal something engineered and precise, a strong centrepiece for SaaS and hardware landing pages.' },
      { icon: 'DESIGN', title: 'Section transition markers', desc: 'Spin the rings as the visitor passes between sections to mark a shift in the narrative with motion rather than a hard cut.' },
      { icon: 'GAME', title: 'Sci-fi and space themes', desc: 'Orbiting arcs suit space, astronomy, and sci-fi microsites, echoing planetary orbits or a reactor core.' },
      { icon: 'LEARN', title: 'Learn Lottie rotation and trim', desc: 'A compact example of combining a static trim arc with animated layer rotation. Pair it with the [Lottie scroll scrub](/ui-snippets/lottie-scroll-scrub/) ring.' },
      { icon: 'CODE', title: 'Brand loaders and marks', desc: 'Tune the arc lengths and colours to build a distinctive orbiting brand mark that reacts as visitors scroll.' },
      { icon: 'CODE', title: 'Related: Lottie Scroll Donut Chart', desc: 'See the [Lottie Scroll Donut Chart](/ui-snippets/lottie-scroll-donut-chart/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Lottie Scroll Pulse Dots', desc: 'See the [Lottie Scroll Pulse Dots](/ui-snippets/lottie-scroll-pulse-dots/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why draw partial arcs instead of full rings?', a: 'A complete circle looks identical at every rotation, so animating its rotation would be invisible. Trimming each ellipse to a fraction of its circumference — and adding a dot on the leading end — makes the ring visibly asymmetric, so rotating the layer produces a clear sweeping motion. The trim here is static (a fixed arc length); it is the layer rotation that is keyframed.' },
      { q: 'Why do the rings sit still if I edit the keyframes wrong?', a: 'Because lottie-web treats an animated keyframe with no i/o easing tangents as a hold keyframe — it never interpolates, so a rotation keyframed 0 to 300 stays stuck at 0 and nothing spins. The keyframe helper in this snippet attaches linear tangents to every keyframe. If you hand-edit a rotation and a ring stops turning, missing tangents are the first thing to check.' },
      { q: 'How do I change how far and which way each ring spins?', a: 'Each ring layer is created with a target rotation in degrees — positive spins clockwise, negative anticlockwise. Change those numbers to speed up, slow down, or reverse any ring, and adjust the radius, arc length, colour, and stroke width per ring to redesign the composition. The rings are independent layers, so they can differ freely.' },
      { q: 'Why goToAndStop instead of play?', a: 'play runs the animation on its internal clock, which is exactly what you do not want when scroll should control it. goToAndStop(frame, true) renders one specific still frame and never starts the timer — the second argument tells lottie-web the value is a frame number, not milliseconds. Multiplying scroll progress by totalFrames gives the frame to show, and fractional frames interpolate smoothly so the rotation is continuous.' },
      { q: 'Can I use this Lottie orbit in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Call lottie.loadAnimation against a ref inside a mount effect, register the ScrollTrigger there, and on cleanup call anim.destroy() and kill the ScrollTrigger instance (or revert a gsap.context) so the SVG and scroll listener are released on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer how a JSON file becomes scroll-driven orbiting rings. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to walk through why the rings are drawn as partial arcs, or why every keyframe needs i/o tangents. The same assistant can help you extend it — ask it to add more rings, make the dots pulse as they pass a marker, tie the ring speeds to a data value, or add small ticks around each track. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build "scroll-driven concentric orbit rings" in plain HTML, CSS, and JavaScript using lottie-web and GSAP's ScrollTrigger plugin, both from a CDN (no bundler).

Requirements:
- A pinned full-height section with a centered container div for the Lottie, an intro caption overlay, and a live "percent spun" read-out.
- Build the Lottie as an inline animationData JSON object (leave a comment showing how to swap it for path: 'your-animation.json'). Include a keyframe helper that ALWAYS attaches i/o easing tangents (linear) — without them lottie-web holds the value and nothing rotates.
- The animation is three concentric rings around a filled central hub. Draw each ring as a stroked ellipse trimmed to a partial arc (a static trim), with a dot on the arc's leading end so rotation is visible. Animate each ring layer's transform rotation from 0 to a different target angle, with different directions per ring. Add a faint full-circle track behind each arc.
- Load with lottie.loadAnimation using renderer 'svg', loop false, autoplay FALSE.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin true, start at top top, scrub around 0.5, and an end several hundred percent tall, animating one value p from 0 to 1.
- In a requestAnimationFrame loop, read p and call anim.goToAndStop(p * (anim.totalFrames - 1), true), update the read-out, and fade the caption out once p passes a small threshold.
- Confirm scrolling up winds the rings back.`,
    },
  },
};

export default lottieScrollOrbitRings;
