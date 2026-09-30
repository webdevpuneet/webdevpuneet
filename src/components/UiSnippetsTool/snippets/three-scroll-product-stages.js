const threeScrollProductStages = {
  id: 'three-scroll-product-stages',
  title: 'Three.js Scroll Product Stages',
  lastmod: '2026-07-19',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="prs-top"><p>Scroll ↓ to explore the product</p></section>
<section class="prs-stage" id="prsStage">
  <canvas id="prsCanvas"></canvas>
  <div class="prs-copy">
    <div class="prs-slide" data-i="0"><h2>Precision core</h2><p>Machined from a single block.</p></div>
    <div class="prs-slide" data-i="1"><h2>Turn it over</h2><p>Every angle considered.</p></div>
    <div class="prs-slide" data-i="2"><h2>Inside out</h2><p>See how it comes apart.</p></div>
    <div class="prs-slide" data-i="3"><h2>Yours to own</h2><p>Assembled and ready.</p></div>
  </div>
</section>
<section class="prs-bottom"><p>The full story, one scroll.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0b0d12;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.prs-top,.prs-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:#767c94}
.prs-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(70% 60% at 62% 45%,#171a24,#0b0d12)}
#prsCanvas{display:block;width:100%;height:100%}
.prs-copy{position:absolute;left:7%;top:0;bottom:0;width:34%;pointer-events:none}
.prs-slide{position:absolute;top:50%;transform:translateY(-50%);opacity:0}
.prs-slide h2{font-size:clamp(24px,3.4vw,40px);font-weight:700;line-height:1.1;margin-bottom:10px}
.prs-slide p{font-size:15px;color:#aab2cc;max-width:22ch}
@media(max-width:640px){.prs-copy{width:80%;left:8%;top:auto;bottom:8%;height:auto}.prs-slide{position:absolute}}`,

  js: `const canvas = document.getElementById('prsCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 8);

scene.add(new THREE.AmbientLight(0x40465c, 0.8));
const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(4, 6, 8); scene.add(key);
const rim = new THREE.DirectionalLight(0x8ab4ff, 0.7); rim.position.set(-6, -2, -4); scene.add(rim);

// A product built from three stacked ring segments so it can visibly "explode"
// into parts at the third stage, then reassemble.
const product = new THREE.Group();
const mat = new THREE.MeshStandardMaterial({ color: 0xd7dbe6, metalness: 0.85, roughness: 0.25 });
const accent = new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0.6, roughness: 0.3 });
const partOffsets = [1.15, 0, -1.15];
const parts = partOffsets.map((baseY, i) => {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.32, 24, 80), i === 1 ? accent : mat);
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  g.userData.baseY = baseY;
  g.position.y = baseY;
  product.add(g);
  return g;
});
scene.add(product);

const slides = Array.from(document.querySelectorAll('.prs-slide'));
gsap.registerPlugin(ScrollTrigger);

// Four stages over the scroll. 's' runs 0→3 (one unit per stage). Each visual
// property is a piecewise function of s, so stages blend smoothly into each other.
const view = { s: 0 };
gsap.to(view, {
  s: 3,
  ease: 'none',
  scrollTrigger: {
    trigger: '#prsStage',
    start: 'top top',
    end: '+=500%',
    scrub: 0.6,
    pin: true,
  },
});

function lerp(a, b, t) { return a + (b - a) * t; }
function seg(s, from, to, a, b) {
  if (s <= from) return a;
  if (s >= to) return b;
  const t = (s - from) / (to - from);
  return lerp(a, b, t * t * (3 - 2 * t));
}

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  const s = view.s;

  // Stage 0→1: spin a half turn.  1→2: flip on X.  2→3: explode then settle.
  product.rotation.y = seg(s, 0, 1, 0, Math.PI) + seg(s, 3, 3, 0, 0);
  product.rotation.x = seg(s, 1, 2, 0, Math.PI * 0.85);
  const explode = seg(s, 2, 2.6, 0, 1) - seg(s, 2.6, 3, 0, 1);
  parts.forEach((p) => { p.position.y = p.userData.baseY * (1 + explode * 1.4); });

  // Idle life: gentle continuous yaw layered on top of the staged rotation.
  product.rotation.y += Math.sin(performance.now() * 0.0003) * 0.05;

  // Cross-fade the four text slides based on which stage is nearest.
  slides.forEach((el, i) => {
    const d = Math.abs(s - i);
    el.style.opacity = String(Math.max(0, 1 - d * 1.6));
    el.style.transform = 'translateY(-50%) translateX(' + (Math.min(1, d) * -18) + 'px)';
  });

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Product Stages — GSAP Scrollytelling',
    description: 'Spin, flip and explode a 3D product through synced scroll stages with GSAP ScrollTrigger and Three.js. Export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build an Apple-Style Scroll Product Showcase With Three.js and GSAP',
      description: `The **Three.js Scroll Product Stages** snippet turns a scroll into a guided product tour: a 3D object spins, flips, explodes into parts, and reassembles across four stages while synchronized captions cross-fade beside it — every beat driven by scroll position, not a timer — using core Three.js and GSAP's ScrollTrigger plugin, both loaded from a CDN. This is the "scrollytelling" pattern popularized by high-end product pages.

**One continuous stage value, not four discrete steps**

Instead of snapping between four separate states, the snippet scrubs a single value \`s\` continuously from 0 to 3 — literally "which stage are we on, fractionally." A value of 1.5 means the tour is exactly halfway between the second and third beats. Every visual property is then written as a piecewise function of \`s\`, so the stages don't jump; they flow into one another, and any scroll position produces a coherent in-between frame.

**A segment helper for smooth piecewise motion**

The heart of the effect is a small \`seg(s, from, to, a, b)\` helper that returns \`a\` before its range, \`b\` after it, and a smooth-stepped blend in between. The product's Y spin is one segment (stage 0→1), its X flip is another (1→2), and its explode-and-settle is a pair of overlapping segments (2→2.6 out, 2.6→3 back). Composing motion from these labelled ranges keeps each stage's behavior isolated and readable — you can retune when the flip happens without touching the spin.

**A product that comes apart**

The object is built as three stacked ring segments in a parent group, each remembering its resting Y offset. During the explode segment those offsets are scaled outward so the parts separate, then pulled back as the final stage settles. Because the parts are children of one group, the staged spin and flip still apply to the whole assembly while the explode acts only on the individual parts — two independent transforms layered cleanly.

**Captions cross-fade by proximity to their stage**

The four HTML captions are positioned over the canvas, and each frame their opacity is set from how close \`s\` is to that caption's index, with a small horizontal drift as they fade. Driving the text from the same scrubbed value as the 3D means copy and motion are always in lockstep — the "see how it comes apart" line reaches full opacity exactly as the product explodes, with no separate scroll listeners to fall out of sync.

**Idle life on top of staged motion**

A gentle continuous yaw and a slow sine wobble are added on top of the staged rotation, so the product never looks frozen when the visitor pauses mid-scroll. The staged transform gives the tour its structure; the idle motion keeps it feeling alive between beats.

**scrub: 0.6, pinned, fully reversible**

A numeric scrub smooths the scenario against noisy input, and pinning for \`+=500%\` gives each of the four stages a comfortable span. Because everything — rotation, explode, and text opacity — derives from the one scrubbed \`s\`, scrolling back up rewinds the entire tour precisely. This is the same pinned-scrub foundation as the [scroll camera path](/ui-snippets/three-scroll-camera-path/), here choreographing an object instead of a camera. Pair it with a [horizontal gallery](/ui-snippets/three-scroll-horizontal-gallery/) of variants or a [particle assembly](/ui-snippets/three-scroll-particle-assembly/) intro.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A metallic 3D product appears in a pinned stage with four captions layered beside it.' },
        { title: 'Scroll down', text: 'The product spins, flips, explodes into parts, and reassembles while captions cross-fade in sync.' },
        { title: 'Scroll back up', text: 'The whole tour rewinds exactly, since every beat derives from one scrubbed stage value.' },
        { title: 'Retime the stages', text: 'Edit the seg() ranges to change when the spin, flip, and explode happen without touching each other.' },
        { title: 'Swap the product and copy', text: 'Replace the ring parts with your own geometry and edit the four .prs-slide captions to match.' },
      ],
    },
    features: [
      'Single continuous stage value s (0–3) so the four beats flow into one another instead of snapping',
      'seg(from,to,a,b) helper composes smooth-stepped piecewise motion from labelled scroll ranges',
      'Layered transforms: staged spin and flip apply to the whole group while explode acts only on the parts',
      'Product built from separable ring parts that come apart and reassemble during the explode segment',
      'HTML captions cross-fade by proximity to their stage index, always in lockstep with the 3D',
      'Idle yaw and sine wobble keep the product alive when scrolling pauses between beats',
      'One scrubbed value drives rotation, explode, and text — scrolling up rewinds everything exactly',
      'Pinned stage with smoothed scrub (0.6) gives each of the four stages a comfortable span',
    ],
    useCases: [
      { icon: 'SHOP', title: 'Product landing pages', desc: 'Walk buyers through a device or gadget with a scroll-guided spin, flip, and exploded-view tour.' },
      { icon: 'WEB', title: 'Feature announcements', desc: 'Reveal what a product is, how it turns, and how it comes apart across four synced scroll beats.' },
      { icon: 'LEARN', title: 'Teaching scrollytelling', desc: 'A compact example of driving both 3D transforms and HTML copy from one continuous scrubbed value.' },
      { icon: 'DESIGN', title: 'Hardware and industrial design', desc: 'Show machined parts separating in an exploded view, then settling back into the finished object.' },
      { icon: 'ANIM', title: 'Story-driven marketing', desc: 'Chapter a brand narrative and pair it with a [scroll tunnel](/ui-snippets/three-scroll-tunnel/) transition between acts.' },
      { icon: 'ART', title: 'Interactive case studies', desc: 'Present a build process as staged 3D beats instead of a static row of before/after images.' },
    ],
    faqs: [
      { q: 'Why use one continuous stage value instead of four discrete states?', a: 'Scrubbing a single value s from 0 to 3 means any scroll position maps to a fractional stage, so the beats blend rather than snap. A value of 1.5 is a coherent halfway frame between stages two and three. Writing every visual property as a function of s guarantees smooth in-between frames at any scroll position.' },
      { q: 'What does the seg() helper do?', a: 'seg(s, from, to, a, b) returns a before its range, b after it, and a smooth-stepped blend within. Each motion — the spin, the flip, the explode — is one or two labelled segments, so the stages stay isolated and readable. You can change when the flip happens by editing its range without affecting the spin.' },
      { q: 'How does the product explode and reassemble?', a: 'It is built from three ring parts in a parent group, each storing its resting Y offset. During the explode segment those offsets scale outward to separate the parts, then a following segment pulls them back as the final stage settles. The staged spin and flip apply to the whole group while the explode acts only on the parts, layering two independent transforms.' },
      { q: 'How do the captions stay in sync with the 3D?', a: 'Each frame, every caption\'s opacity is computed from how close the scrubbed stage value is to that caption\'s index, with a small horizontal drift. Because text and 3D read from the same value, the copy for a beat reaches full opacity exactly when that beat plays, with no separate scroll listeners that could drift out of sync.' },
      { q: 'Can I use this Three.js product showcase in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the product group and GSAP timeline inside a mount effect against refs, render captions as JSX/template elements you fade via the scrubbed value, and on cleanup kill the ScrollTrigger and call renderer.dispose() so the pin and WebGL context are freed on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to hand-choreograph four product stages by trial and error. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why the tour uses one continuous stage value and how the seg() helper isolates each beat. The same assistant can help you extend it — ask it to load a real GLTF model in place of the ring parts, add a fifth stage that changes the product's color, or trigger a subtle camera dolly-in on the final beat. It can also refactor the choreography into a data-driven list of stages so you can add or reorder beats without editing the animation loop by hand. Treat the code as a starting point for a conversation, not a finished artifact.`,
      prompt: `Build a "scroll-driven product showcase" (scrollytelling) in plain HTML, CSS, and JavaScript using Three.js, GSAP, and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas with a WebGLRenderer, PerspectiveCamera, and ambient + directional + rim lighting, sized and updated on window resize including aspect ratio.
- Build a "product" as a parent THREE.Group containing about three separable parts (e.g. stacked torus rings), each storing its resting Y offset in userData; give one part an accent material.
- Overlay four absolutely-positioned HTML captions (heading + paragraph) beside the canvas.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub (~0.6), and an end several hundred percent tall, animating one plain value s continuously from 0 to 3 (one unit per stage).
- Write a helper seg(s, from, to, a, b) that returns a before its range, b after it, and a smooth-stepped blend within. Every animation frame, use it to compose: a Y spin over stage 0→1, an X flip over 1→2, and an explode-then-settle over 2→2.6 and 2.6→3 that scales each part's stored Y offset outward and back. Add a gentle idle yaw/wobble on top.
- Each frame, set each caption's opacity from how close s is to its index, with a small horizontal drift, so copy and motion stay in lockstep.
- Confirm scrolling back up rewinds the entire tour, since every property derives from the one scrubbed value rather than a timer.`,
    },
  },
};

export default threeScrollProductStages;
