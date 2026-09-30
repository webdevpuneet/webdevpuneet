const lottieScrollScrub = {
  id: 'lottie-scroll-scrub',
  title: 'Lottie Scroll Scrub',
  lastmod: '2026-07-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="lot-stage" id="lotStage">
  <div class="lot-intro-overlay"><p>Scroll ↓ to play the Lottie</p></div>
  <div class="lot-wrap"><div class="lot-canvas" id="lotMount"></div></div>
  <div class="lot-hud"><span id="lotPct">0</span>% complete</div>
</section>
<section class="lot-bottom"><p>Animation complete — scroll up to rewind it.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0a12;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.lot-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7c83a6;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.lot-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 42%,#15162a 0%,#0a0a12 60%)}
.lot-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8a90c0;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
.lot-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.lot-canvas{width:340px;height:340px}
.lot-canvas svg{display:block;filter:drop-shadow(0 0 24px rgba(116,132,250,.35))}
.lot-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#a5b4fc;text-transform:uppercase;opacity:.85}`,

  js: `const mount = document.getElementById('lotMount');
const pctEl = document.getElementById('lotPct');
const intro = document.querySelector('.lot-intro-overlay');

// The Lottie animation, inline as the very JSON a .lottie/.json file holds.
// To load an external file instead, delete 'animationData' below and pass
// 'path: "your-animation.json"' — every other line stays exactly the same.
// Here: a faint track ring, a coloured progress ring whose stroke "draws"
// via an animated trim path (0 -> 100), and a checkmark that draws in last.
const animationData = {
  v: '5.7.4', fr: 60, ip: 0, op: 120, w: 400, h: 400, nm: 'scroll-ring', ddd: 0, assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: 'check', sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [200, 206, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0,
      shapes: [{ ty: 'gr', nm: 'check-g', it: [
        { ty: 'sh', d: 1, ks: { a: 0, k: { i: [[0,0],[0,0],[0,0]], o: [[0,0],[0,0],[0,0]], v: [[-38,-2],[-12,26],[42,-32]], c: false } } },
        { ty: 'tm', s: { a: 0, k: 0 }, e: { a: 1, k: [ { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: 80, s: [0] }, { t: 118, s: [100] } ] }, o: { a: 0, k: 0 }, m: 1 },
        { ty: 'st', c: { a: 0, k: [0.36, 0.9, 0.56, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 18 }, lc: 2, lj: 2 },
        { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ] }],
      ip: 0, op: 120, st: 0, bm: 0
    },
    {
      ddd: 0, ind: 2, ty: 4, nm: 'ring', sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: -90 }, p: { a: 0, k: [200, 200, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0,
      shapes: [{ ty: 'gr', nm: 'ring-g', it: [
        { ty: 'el', d: 1, s: { a: 0, k: [200, 200] }, p: { a: 0, k: [0, 0] } },
        { ty: 'tm', s: { a: 0, k: 0 }, e: { a: 1, k: [ { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: 0, s: [0] }, { t: 120, s: [100] } ] }, o: { a: 0, k: 0 }, m: 1 },
        { ty: 'st', c: { a: 0, k: [0.45, 0.53, 0.98, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 16 }, lc: 2, lj: 2 },
        { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ] }],
      ip: 0, op: 120, st: 0, bm: 0
    },
    {
      ddd: 0, ind: 3, ty: 4, nm: 'track', sr: 1,
      ks: { o: { a: 0, k: 16 }, r: { a: 0, k: 0 }, p: { a: 0, k: [200, 200, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0,
      shapes: [{ ty: 'gr', nm: 'track-g', it: [
        { ty: 'el', d: 1, s: { a: 0, k: [200, 200] }, p: { a: 0, k: [0, 0] } },
        { ty: 'st', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 16 }, lc: 2, lj: 2 },
        { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ] }],
      ip: 0, op: 120, st: 0, bm: 0
    }
  ]
};

// Load the animation but DON'T autoplay — scroll, not a timer, will drive it.
const anim = lottie.loadAnimation({
  container: mount,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  animationData,
});

let total = 0;
anim.addEventListener('DOMLoaded', () => { total = anim.totalFrames; });

gsap.registerPlugin(ScrollTrigger);

// One scrubbed 0 -> 1 value maps straight onto the animation's frame range.
const state = { p: 0 };
gsap.to(state, {
  p: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#lotStage',
    start: 'top top',
    end: '+=400%',
    scrub: 0.5,
    pin: true,
  },
});

// Every frame, seek the Lottie to the exact frame for the current scroll
// position. goToAndStop(frame, true) renders a single still frame (isFrame =
// true), so scrubbing back up plays the whole thing in reverse for free.
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
    title: 'Lottie Scroll Scrub — Frame-by-Frame JSON on Scroll',
    description: 'Scrub a Lottie JSON animation frame-by-frame on scroll with lottie-web and GSAP ScrollTrigger. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Scrub a Lottie JSON Animation Frame-by-Frame on Scroll With lottie-web and GSAP',
      description: `The **Lottie Scroll Scrub** snippet plays a Lottie animation with the scrollbar instead of a clock — as you scroll down a pinned section, a progress ring "draws" itself around a circle and a checkmark strokes in at the end, and scrolling back up rewinds the whole thing. It pairs the official \`lottie-web\` player with GSAP's ScrollTrigger, and the entire animation is a plain JSON object embedded right in the code, so there is nothing to fetch and nothing that can 404.

**Lottie is just JSON, and you can inline it**

A Lottie animation is a JSON document (exported from After Effects via Bodymovin, or authored by hand) describing vector layers, shapes, and keyframes. Most tutorials load it from a URL with \`lottie.loadAnimation({ path: 'anim.json' })\`, but that means an extra network request and a file that has to be hosted somewhere. This snippet instead passes the JSON directly as \`animationData\`, so the animation ships inside the component. To use your own file, you delete the \`animationData\` object and swap in \`path: 'your-animation.json'\` — every other line stays identical, because the player's API is the same either way.

**Autoplay off, scroll on**

The critical option is \`autoplay: false\`. A normal Lottie plays on a timer the moment it loads; here we never want the internal clock to run, because scroll position — not elapsed time — decides which frame is visible. With autoplay disabled and \`loop: false\`, the animation sits frozen at frame 0 until we explicitly seek it.

**goToAndStop is what makes it scrubbable**

Each frame, the snippet calls \`anim.goToAndStop(frame, true)\`. The second argument, \`true\`, tells lottie-web the value is a *frame number* (not milliseconds), and \`goToAndStop\` renders that single still frame without starting playback. Multiplying the scroll progress (0 to 1) by \`anim.totalFrames - 1\` gives the exact frame for the current scroll position. Because lottie-web interpolates between keyframes, fractional frame values render smoothly, so the ring grows continuously rather than snapping between discrete steps.

**One scrubbed value, driven by ScrollTrigger**

Rather than reading the raw scroll offset, the snippet tweens a single plain number — \`state.p\` — from 0 to 1 with a GSAP ScrollTrigger that pins the stage (\`pin: true\`) and scrubs over a range several viewport-heights tall (\`end: '+=400%'\`). A \`requestAnimationFrame\` loop reads \`state.p\` every frame and seeks the Lottie accordingly. Deriving the frame from one normalized value each frame — the same approach used by the [scroll tunnel](/ui-snippets/three-scroll-tunnel/) and [scroll camera path](/ui-snippets/three-scroll-camera-path/) snippets — is what makes the effect fully reversible: scrolling up simply produces smaller values, and the animation plays backward with no extra code.

**The "draw" effect comes from a trim path**

The ring and checkmark don't fade in — they *stroke on*, like a pen drawing a line. That is a Lottie **trim path** (shape type \`tm\`): it renders only a portion of a stroked path, from a start percentage to an end percentage. Animating the trim's end from 0 to 100 across the timeline makes the stroke appear to draw itself. A faint static "track" ring sits behind the coloured one so the circle's full path is always visible, exactly like a circular progress indicator. This is the same visual idea as an SVG [path-draw on scroll](/ui-snippets/scroll-text-draw/), but authored once in Lottie and reusable anywhere the player runs.

**A smoothed scrub for a premium feel**

A numeric \`scrub: 0.5\` lets the animation glide toward the scroll position over about half a second instead of snapping frame-perfectly to every wheel tick. Wheel and trackpad input is noisy; that small amount of smoothing turns raw scroll jitter into a fluid, deliberate playback that feels designed rather than mechanical.

**SVG renderer for crispness**

The animation uses the \`svg\` renderer, so the ring stays razor-sharp at any size and picks up a CSS \`drop-shadow\` glow for free. For very heavy animations you could switch to the \`canvas\` renderer, but for a vector progress ring, SVG gives the cleanest result and the smallest DOM.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add lottie.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste the HTML, CSS, and JS', text: 'A faint track ring appears centred in a pinned stage with a live "% complete" read-out.' },
        { title: 'Scroll down', text: 'The coloured ring draws itself around the circle and a checkmark strokes in at the end, all tied directly to scroll position.' },
        { title: 'Scroll back up', text: 'The animation rewinds exactly, because goToAndStop seeks a single frame rather than playing on a timer.' },
        { title: 'Swap in your own Lottie file', text: 'Delete the animationData object and pass path: "your-animation.json" to loadAnimation instead — nothing else changes.' },
        { title: 'Tune the scrub length', text: 'Change the ScrollTrigger end value (+=400%) for a longer, slower playback or a shorter, quicker one.' },
      ],
    },
    features: [
      'Lottie JSON inlined as animationData — no external file fetch, nothing that can 404 in the preview',
      'autoplay:false + goToAndStop(frame, true): scroll position, not a timer, decides the visible frame',
      'Single scrubbed 0–1 value mapped onto anim.totalFrames, read in a requestAnimationFrame loop',
      'Fully reversible — scrolling up seeks smaller frames and plays the animation backward for free',
      'The "draw" effect is a Lottie trim path (tm) animating its end from 0 to 100 across the timeline',
      'Faint static track ring behind the coloured one, exactly like a circular progress indicator',
      'Smoothed scrub (0.5) so playback glides toward the scroll position instead of snapping per wheel tick',
      'SVG renderer with a CSS drop-shadow glow — crisp at any size, easy to recolour',
    ],
    useCases: [
      { icon: 'ANIM', title: 'Scroll-to-complete progress', desc: 'Turn a long-form page into a felt sense of progress — the ring fills and the checkmark lands exactly as the reader reaches the end of a section.' },
      { icon: 'WEB', title: 'Product and feature reveals', desc: 'Drive a designer-made After Effects animation with the scrollbar so a product assembles, unfolds, or animates in step with the copy beside it.' },
      { icon: 'DESIGN', title: 'Designer handoff without re-coding', desc: 'Take a Lottie a motion designer exported and make it scroll-scrubbable without rebuilding the animation in code — just swap animationData for a path to their file.' },
      { icon: 'FLOW', title: 'Onboarding and explainer steps', desc: 'Scrub through a multi-step illustration as the user scrolls, pairing each stage of a Lottie with a matching caption in a walkthrough.' },
      { icon: 'LEARN', title: 'Learn the Lottie player API', desc: 'A compact, readable example of loadAnimation, autoplay:false, totalFrames, and goToAndStop — the core of any scroll- or gesture-driven Lottie.' },
      { icon: 'CODE', title: 'Hero and landing-page motion', desc: 'Give a hero section a scroll-reactive centrepiece that reads as premium motion design, similar in spirit to the [scroll image sequence](/ui-snippets/scroll-image-sequence/) technique but vector-based and tiny.' },
      { icon: 'CODE', title: 'Related: Lottie Scroll Pulse Dots', desc: 'See the [Lottie Scroll Pulse Dots](/ui-snippets/lottie-scroll-pulse-dots/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Related Articles Carousel', desc: 'See the [Related Articles Carousel](/ui-snippets/related-articles-carousel/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why inline the Lottie JSON instead of loading a .json file?', a: 'Inlining it as animationData keeps the snippet self-contained — there is no second network request, nothing to host, and nothing that can 404 or be blocked by a sandbox. For your own project you can absolutely load an external file: delete the animationData object and pass path: "your-animation.json" to loadAnimation instead. The rest of the code, including the scroll scrubbing, is identical because the player exposes the same API regardless of how the animation was supplied.' },
      { q: 'Why use goToAndStop instead of play or setSpeed?', a: 'play and setSpeed run the animation on its own internal clock, which is exactly what you do not want when scroll should control it. goToAndStop(frame, true) renders one specific still frame and never starts the timer — the second argument tells lottie-web the value is a frame number, not milliseconds. Multiplying scroll progress by totalFrames gives the frame to show, and because lottie-web interpolates between keyframes, fractional frames render smoothly, so the motion is continuous rather than stepped.' },
      { q: 'How does the ring appear to draw itself?', a: 'That is a Lottie trim path — shape type "tm" — which renders only a portion of a stroked path from a start percentage to an end percentage. Animating the end value from 0 to 100 over the timeline makes the stroke look like it is being drawn by a pen. It is the same principle as animating stroke-dashoffset on an SVG path, but expressed inside the Lottie JSON so it travels with the animation wherever the player runs.' },
      { q: 'Does scrolling back up reverse the animation?', a: 'Yes, automatically. The frame shown is derived every requestAnimationFrame from a single scrubbed value that ScrollTrigger moves between 0 and 1. Scrolling up produces smaller values, so goToAndStop seeks earlier frames and the animation plays in reverse — the ring un-draws and the checkmark retracts — with no extra reverse-playback code.' },
      { q: 'Can I use this Lottie scroll effect in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. In a framework, call lottie.loadAnimation against a ref inside a mount effect, register the ScrollTrigger there, and on cleanup call anim.destroy() and kill the ScrollTrigger instance (or revert a gsap.context) so the SVG and scroll listener are released on unmount. The lottie-react and @lottiefiles/react-lottie wrappers work too, but the raw player shown here keeps the frame-seeking logic fully in your control.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer how a JSON file becomes a scroll-scrubbed animation. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to walk through why autoplay is disabled, what goToAndStop's second argument does, and how the trim path produces the drawing effect. The same assistant can help you extend it — ask it to load your own exported Lottie via a path instead of inline JSON, sync several Lottie layers to different scroll ranges, or add a second animation that plays as the first finishes. It can also help you swap the SVG renderer for canvas on a heavier animation, or wire the whole thing into a React or Vue component with proper cleanup. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-scrubbed Lottie animation" in plain HTML, CSS, and JavaScript using lottie-web and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-height section containing a centered container div for the Lottie, an intro caption overlay, and a live "percent complete" read-out.
- Load a Lottie animation with lottie.loadAnimation using renderer 'svg', loop false, and autoplay FALSE, so a timer never drives it. Provide the animation as an inline animationData JSON object, but leave a clear comment showing how to swap it for path: 'your-animation.json'.
- The inline Lottie should include a faint static "track" ring, a coloured progress ring whose stroke draws on via an animated trim path (type 'tm') whose end goes 0 -> 100, and a checkmark path that draws in over the last third of the timeline.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub around 0.5, and an end several hundred percent tall, animating a single plain value p from 0 to 1.
- In a requestAnimationFrame loop (independent of the scroll callback), read p and call anim.goToAndStop(p * (anim.totalFrames - 1), true) to seek a single frame, and update the percent read-out.
- Fade the intro caption out once p passes a small threshold and back in when it returns to 0.
- Confirm scrolling back up reverses the animation, since the frame is derived from a fully scrubbed value rather than a one-way timer.`,
    },
  },
};

export default lottieScrollScrub;
