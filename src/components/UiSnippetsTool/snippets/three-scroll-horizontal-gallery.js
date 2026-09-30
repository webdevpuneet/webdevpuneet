const threeScrollHorizontalGallery = {
  id: 'three-scroll-horizontal-gallery',
  title: 'Three.js Scroll Horizontal Gallery',
  lastmod: '2026-07-19',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="hgl-top"><p>Scroll ↓ to pan the gallery →</p></section>
<section class="hgl-stage" id="hglStage">
  <canvas id="hglCanvas"></canvas>
  <div class="hgl-count"><span id="hglIndex">1</span> / 6</div>
</section>
<section class="hgl-bottom"><p>End of the collection.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0a12;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.hgl-top,.hgl-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7a7f9c;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.hgl-stage{height:100vh;position:relative;overflow:hidden;background:linear-gradient(160deg,#12121f,#0a0a12)}
#hglCanvas{display:block;width:100%;height:100%}
.hgl-count{position:absolute;right:26px;bottom:26px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.2em;color:#c4b5fd}`,

  js: `const canvas = document.getElementById('hglCanvas');
const indexEl = document.getElementById('hglIndex');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 9);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const key = new THREE.DirectionalLight(0xffffff, 0.9);
key.position.set(3, 5, 8);
scene.add(key);

// Six framed panels laid out left-to-right along the X axis. Vertical page
// scroll pans a "group" horizontally so the whole strip slides across the
// viewport — a common gallery pattern (vertical scroll → horizontal motion).
const PANELS = 6;
const GAP = 4.2;
const colors = [0x60a5fa, 0xf472b6, 0xfbbf24, 0x34d399, 0xa78bfa, 0xf87171];
const group = new THREE.Group();
const cards = [];
for (let i = 0; i < PANELS; i++) {
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(3, 4, 0.2),
    new THREE.MeshStandardMaterial({ color: colors[i], metalness: 0.25, roughness: 0.45 })
  );
  card.position.x = i * GAP;
  group.add(card);
  cards.push(card);
}
scene.add(group);

gsap.registerPlugin(ScrollTrigger);

// The group's X slides from 0 to minus the width of the whole strip (leaving
// the last panel centered). One scrubbed value drives the pan; per-card
// rotation is derived from each card's screen position each frame.
const totalTravel = (PANELS - 1) * GAP;
const pan = { x: 0 };
gsap.to(pan, {
  x: -totalTravel,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hglStage',
    start: 'top top',
    end: '+=450%',
    scrub: 0.6,
    pin: true,
    onUpdate: (self) => {
      indexEl.textContent = Math.min(PANELS, Math.round(self.progress * (PANELS - 1)) + 1);
    },
  },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  group.position.x = pan.x;

  // Each card turns to face the camera as it nears the center and angles away
  // toward the edges, giving the strip a subtle coverflow-style depth.
  cards.forEach((card) => {
    const worldX = card.position.x + group.position.x;
    card.rotation.y = THREE.MathUtils.clamp(-worldX * 0.14, -0.6, 0.6);
    const dist = Math.abs(worldX);
    card.position.z = -dist * 0.25;
    card.material.emissive = new THREE.Color(colors[cards.indexOf(card)]);
    card.material.emissiveIntensity = Math.max(0, 0.35 - dist * 0.08);
  });

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Horizontal Gallery — GSAP Coverflow',
    description: 'Turn vertical scroll into a horizontal 3D coverflow pan with GSAP ScrollTrigger and Three.js. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Vertical-Scroll Horizontal 3D Gallery With Three.js and GSAP',
      description: `The **Three.js Scroll Horizontal Gallery** snippet takes plain vertical page scroll and turns it into a horizontal pan across a strip of six 3D panels — the scrollbar slides the whole gallery sideways while each panel rotates coverflow-style toward the camera — using core Three.js and GSAP's ScrollTrigger plugin, both loaded from a CDN.

**Vertical scroll, horizontal motion**

The defining trick of this pattern is decoupling input direction from output direction: the visitor scrolls down as usual, but a single scrubbed value moves a Three.js \`Group\` along its X axis, so the panels slide left across the viewport. This "vertical-in, horizontal-out" gallery is one of the most requested scroll effects because it lets a horizontal showcase live inside an ordinary vertical page without hijacking the scrollbar's native behavior or fighting touch devices.

**Panels in a group, panned as one**

All six panels are added to a single \`THREE.Group\` at fixed X offsets a constant gap apart. Scroll never touches the individual panels' base positions — it only moves the group. Panning the container rather than each panel means the strip's layout is defined once, and lengthening the gallery is just a matter of adding another panel and letting the travel distance recompute from the panel count and gap.

**Coverflow depth derived from screen position**

Each frame, every panel's world X (its own offset plus the group's current pan) is used to compute two things: a Y rotation clamped so the panel turns to face the camera as it nears center and angles away toward the edges, and a small negative Z push proportional to its distance from center so off-center panels recede slightly. This is what gives the flat strip its sense of 3D depth — panels at the focus stand upright and forward, while their neighbors tilt back like album covers in a coverflow.

**Emissive glow marks the focused panel**

The panel nearest the center also gets the most emissive intensity, fading to zero as it slides away. Because this is computed from the same distance-from-center value that drives rotation and depth, the highlight tracks the focus automatically — there is no separate "which panel is active" state to keep in sync; the geometry's position *is* the state.

**One scrubbed value, a derived index**

The group's X is tweened from 0 to minus the full strip width so the last panel ends centered, and ScrollTrigger's \`onUpdate\` maps \`self.progress\` to a 1-of-6 counter for the on-screen index. Keeping a single source of truth — the scrubbed pan — means the visible index, the rotations, the depth, and the glow all derive from it consistently, and scrolling back up reverses every one of them exactly.

**scrub: 0.6 and a pinned stage**

A numeric scrub smooths the pan against noisy wheel and trackpad input, and pinning the stage for \`+=450%\` gives each panel a comfortable moment at center. The same pinned-scrub-derive approach powers the [scroll camera path](/ui-snippets/three-scroll-camera-path/) flythrough; here it drives a lateral pan instead of forward travel. Pair it with a [scroll particle assembly](/ui-snippets/three-scroll-particle-assembly/) intro or a [product stages](/ui-snippets/three-scroll-product-stages/) close-up section.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A strip of six colored 3D panels appears in a pinned stage with a 1-of-6 counter.' },
        { title: 'Scroll down', text: 'Vertical scroll pans the whole gallery sideways; panels rotate toward the camera as they reach center.' },
        { title: 'Scroll back up', text: 'The pan, rotations, depth, and glow all reverse exactly, since everything derives from one scrubbed value.' },
        { title: 'Add or restyle panels', text: 'Change the PANELS count, GAP, and colors array; the travel distance recomputes automatically.' },
        { title: 'Tune the pacing', text: 'Adjust the ScrollTrigger end value (+=450%) for a slower or faster pan across the collection.' },
      ],
    },
    features: [
      'Vertical scroll converted to horizontal pan — a horizontal showcase inside an ordinary vertical page',
      'All panels in one THREE.Group panned along X, so layout is defined once and scales with panel count',
      'Coverflow depth: per-panel Y rotation and Z recede derived each frame from distance to screen center',
      'Emissive glow tracks the focused panel automatically from the same distance value — no active-state flag',
      'Single scrubbed pan value drives motion, rotation, depth, glow, and the on-screen index consistently',
      'Derived 1-of-N counter via ScrollTrigger onUpdate self.progress',
      'Smoothed scrub (0.6) and pinned stage give each panel a clear moment at center',
      'Fully reversible — scrolling back up unwinds the entire pan with no extra code',
    ],
    useCases: [
      { icon: 'SHOP', title: 'Product collection showcases', desc: 'Pan across a line of products, plans, or case studies as a 3D coverflow inside a normal scroll page.' },
      { icon: 'ART', title: 'Portfolio and photo strips', desc: 'Present work samples as tilting panels that turn to face the viewer one at a time on scroll.' },
      { icon: 'WEB', title: 'Feature carousels without carousels', desc: 'Replace a click-driven slider with a scroll-driven pan that works on touch without hijacking gestures.' },
      { icon: 'LEARN', title: 'Teaching group transforms', desc: 'A clear example of animating a parent Group while deriving child transforms from world position each frame.' },
      { icon: 'DESIGN', title: 'Brand story chapters', desc: 'Use each panel as a chapter and pair the reveal with a [particle assembly](/ui-snippets/three-scroll-particle-assembly/) opener.' },
      { icon: 'ANIM', title: 'Editorial long-reads', desc: 'Break up a long article with a horizontal 3D interlude that pans as the reader keeps scrolling down.' },
    ],
    faqs: [
      { q: 'How does vertical scrolling produce horizontal motion?', a: 'ScrollTrigger scrubs a single value that is applied to a THREE.Group\'s X position, not to the page. The visitor scrolls down normally, but the output is the group sliding left, so a horizontal gallery lives inside a vertical page without overriding native scroll behavior or breaking touch input.' },
      { q: 'Why pan a Group instead of moving each panel?', a: 'All panels sit at fixed offsets inside one Group, and scroll only moves the Group. This defines the strip layout a single time and keeps the animation trivial: adding a panel just extends the strip and recomputes the total travel from the panel count and gap, with no change to the tween or per-panel positions.' },
      { q: 'How is the coverflow depth created?', a: 'Each frame, every panel\'s world X (its offset plus the Group pan) is turned into a clamped Y rotation and a small negative Z push proportional to its distance from screen center. Panels at the focus stand upright and forward; their neighbors tilt back and recede, giving the flat strip a convincing coverflow depth.' },
      { q: 'How does the focused panel highlight itself?', a: 'The emissive intensity of each panel is computed from the same distance-from-center value that drives its rotation and depth, peaking at center and fading to zero at the edges. Because the highlight derives from geometry position, there is no separate active-panel state to track — the panel\'s position is the source of truth.' },
      { q: 'Can I use this Three.js horizontal gallery in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the Group, panels, and GSAP timeline inside a mount effect against a canvas ref, drive panel data from props, and on cleanup kill the ScrollTrigger and call renderer.dispose() so the pin and WebGL context are released on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to figure out how to make a downward scroll move things sideways. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why the panels live in a single Group and how each panel's rotation and depth are derived from its distance to screen center. The same assistant can help you extend it — ask it to load real image textures onto the panels, add a title caption that fades in for whichever panel is centered, or snap the pan to the nearest panel when the visitor stops scrolling. It can also optimize the per-frame loop, for instance caching the emissive Color objects instead of allocating a new one each frame. Treat the code as a starting point for a conversation, not a finished artifact.`,
      prompt: `Build a "vertical-scroll horizontal 3D gallery" in plain HTML, CSS, and JavaScript using Three.js, GSAP, and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas, with a WebGLRenderer and PerspectiveCamera sized to it and updated on window resize including aspect ratio, plus ambient and directional lighting.
- Create about six flat panel meshes (thin boxes) added to a single THREE.Group, each at a fixed X offset a constant gap apart, in different colors.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub (~0.6), and an end several hundred percent tall, animating one plain value from 0 to minus the total strip width so the last panel ends centered. Use onUpdate to map self.progress to a 1-of-N index counter.
- Every animation frame (requestAnimationFrame), set the Group's X to the scrubbed value, then for each panel compute its world X (offset plus Group X) and derive: a clamped Y rotation that faces the camera near center and angles away toward the edges, a small negative Z push proportional to distance from center, and an emissive intensity that peaks at center — giving a coverflow depth effect.
- Confirm scrolling back up reverses the pan, rotations, depth, and glow, since everything derives from one fully scrubbed value rather than a timer.`,
    },
  },
};

export default threeScrollHorizontalGallery;
