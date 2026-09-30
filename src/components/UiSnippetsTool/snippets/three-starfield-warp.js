const threeStarfieldWarp = {
  id: 'three-starfield-warp',
  title: 'Three.js Starfield Warp',
  lastmod: '2026-07-19',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
  ],
  html: `<canvas id="warpCanvas"></canvas>
<button id="warpBtn" class="warp-btn">Hold for warp speed</button>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;background:#000}
#warpCanvas{display:block;width:100%;height:100%}
.warp-btn{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);padding:11px 22px;border-radius:999px;border:1px solid rgba(147,197,253,0.4);background:rgba(10,14,30,0.65);color:#dbeafe;font:13px system-ui,sans-serif;font-weight:600;letter-spacing:.02em;cursor:pointer;backdrop-filter:blur(6px);transition:background .15s,transform .15s;-webkit-user-select:none;user-select:none}
.warp-btn:hover{background:rgba(30,58,138,0.5)}
.warp-btn:active,.warp-btn.active{transform:translateX(-50%) scale(0.96);background:rgba(59,130,246,0.55)}`,

  js: `const canvas = document.getElementById('warpCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 60);
camera.position.z = 1;

// Stars are stored as individual { x, y, z } records rather than only in the
// BufferGeometry, so each star's Z can be reset independently every frame
// without recreating any geometry.
const STAR_COUNT = 2600;
const FIELD = 24;
const stars = [];
const positions = new Float32Array(STAR_COUNT * 3);

function resetStar(i, freshField) {
  stars[i] = {
    x: (Math.random() - 0.5) * FIELD,
    y: (Math.random() - 0.5) * FIELD,
    z: freshField ? Math.random() * FIELD : FIELD,
  };
}
for (let i = 0; i < STAR_COUNT; i++) resetStar(i, true);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0xdbeafe, size: 0.045, transparent: true, opacity: 0.9, sizeAttenuation: true });
const points = new THREE.Points(geometry, material);
scene.add(points);

const posAttr = geometry.getAttribute('position');

let warp = false;
const btn = document.getElementById('warpBtn');
function setWarp(on) { warp = on; btn.classList.toggle('active', on); btn.textContent = on ? 'Warp speed!' : 'Hold for warp speed'; }
btn.addEventListener('pointerdown', () => setWarp(true));
btn.addEventListener('pointerup', () => setWarp(false));
btn.addEventListener('pointerleave', () => setWarp(false));
btn.addEventListener('touchstart', e => { e.preventDefault(); setWarp(true); }, { passive: false });
btn.addEventListener('touchend', () => setWarp(false));

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  const speed = warp ? 0.9 : 0.05;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = stars[i];
    s.z -= speed;
    if (s.z <= 0.1) resetStar(i, false);

    // Perspective-divide the star's X/Y by its remaining Z so stars near the
    // camera appear to fly outward toward the screen edges — the classic
    // "hyperspace" effect — rather than just moving in a straight line.
    const k = FIELD / s.z;
    positions[i * 3]     = s.x * k * 0.06;
    positions[i * 3 + 1] = s.y * k * 0.06;
    positions[i * 3 + 2] = -s.z + FIELD * 0.5;
  }
  posAttr.needsUpdate = true;

  material.size = warp ? 0.09 : 0.045;
  camera.fov = warp ? 92 : 75;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Starfield Warp — WebGL Hyperspace Point Field Effect',
    description: 'Build a 3D hyperspace starfield in Three.js — 2,600 points streaming past the camera, with a hold-to-warp button that widens the field of view for a true speed-up effect.',
    about: {
      title: 'How to Build a Three.js Hyperspace Starfield With a Warp-Speed Button',
      description: `The **Three.js Starfield Warp** snippet renders thousands of stars flying past the camera in real 3D depth, with a press-and-hold button that pushes the field into "warp speed" — widening the field of view and speeding up the stream — using core Three.js loaded from a CDN and no external texture or model assets.

**Perspective division is what makes stars fly outward**

Every star is stored as a plain \`{x, y, z}\` object, independent of the \`BufferGeometry\` that actually renders it. Each frame, a star's on-screen X and Y position is computed as \`(x / z) × constant\` — dividing by the star's remaining distance from the camera. As \`z\` shrinks toward zero, that division makes the same fixed X/Y spread out further and further from the center of the screen. This one line of perspective math is the entire secret behind the classic "hyperspace" look: stars near the camera appear to streak outward toward the frame edges, while distant stars barely seem to move.

**Recycling stars instead of destroying and recreating them**

Rather than allocating new star objects as ones pass the camera, every star that reaches \`z <= 0.1\` is simply reassigned a fresh random X/Y and pushed back out to the far edge of the field via \`resetStar()\`. The underlying \`BufferGeometry\` — and its \`Float32Array\` of positions — is allocated exactly once at startup and never resized. This recycling pattern is standard for any continuously-flowing particle effect (rain, snow, sparks, or starfields): allocate a fixed pool once, and cycle members through it forever rather than paying for garbage collection on every reset.

**Two separate parameters drive the field: speed and field of view**

Holding the warp button changes two things simultaneously, not just one: the per-frame Z-decrement speed (how fast stars travel toward the camera) and the camera's field of view (\`camera.fov\`), which is widened from 75° to 92°. Speed alone would just make stars move faster in a straight line; widening the FOV at the same time is what makes the streaks visibly stretch and bow outward toward the frame edges, matching the exaggerated, wide-angle look of film hyperspace sequences.

**Point size also scales with warp state**

The \`PointsMaterial\`'s \`size\` property doubles while warping, since faster-moving points crossing more screen distance per frame read as thinner without a matching size increase — a detail easy to miss but noticeable by its absence once you compare the effect with and without it.

**A press-and-hold button, not a toggle**

The warp button responds to \`pointerdown\`/\`pointerup\`/\`pointerleave\` (plus \`touchstart\`/\`touchend\` for older mobile browsers that fire pointer events inconsistently), rather than toggling on click. That choice matches the interaction pattern of the "hold" metaphor: warp speed is a temporary boost the visitor actively sustains, not a persistent mode they forget is on.

**Where to take it from here**

This same recycled-particle-with-perspective-division pattern underlies rain, snow, embers, and confetti effects just as much as starfields — only the reset direction and per-particle physics differ. Pair it with a [particle network](/ui-snippets/particle-network/) for a "space station" themed section, or contrast the real 3D depth here against the flat Canvas 2D [starfield](/ui-snippets/starfield/) snippet to see the difference perspective division makes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the Three.js CDN', text: 'Add three.min.js from the CDN panel — no add-ons are required for this snippet.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A slow-drifting starfield begins immediately; 2,600 points recycle continuously.' },
        { title: 'Hold the warp button', text: 'Press and hold to speed up the field and widen the camera FOV for a hyperspace streak effect.' },
        { title: 'Release to slow down', text: 'Letting go instantly returns to the calm, ambient drift speed.' },
        { title: 'Tune star count and field size', text: 'Adjust STAR_COUNT and FIELD to trade density and depth range for performance.' },
        { title: 'Resize the window', text: 'Renderer size and camera aspect ratio update automatically on resize.' },
      ],
    },
    features: [
      'Perspective-divided positions: dividing X/Y by remaining Z is the entire hyperspace-streak mechanism',
      'Recycled particle pool: a fixed array of 2,600 stars is reused forever, never reallocated',
      'Press-and-hold warp button: pointerdown/pointerup drive a temporary speed boost, not a toggle',
      'Dual warp parameters: both travel speed and camera field of view change together for a convincing streak',
      'Dynamic point size: PointsMaterial size doubles during warp so fast-moving points stay visible',
      'Touch-compatible controls: touchstart/touchend listeners back up pointer events for older mobile browsers',
      'Zero external assets: no textures, models, or noise libraries — just points and perspective math',
      'Runs at 60fps with thousands of points thanks to a single BufferGeometry draw call',
    ],
    useCases: [
      { icon: 'GAME', title: 'Game and app loading screens', desc: 'A holdable warp button gives visitors an interactive way to pass the time during real loading, unlike a passive spinner.' },
      { icon: 'WEB', title: 'Space, sci-fi, and travel landing pages', desc: 'An interactive hyperspace effect signals speed and scale, ideal for space, travel-booking, or sci-fi themed products.' },
      { icon: 'ART', title: 'Event and launch countdown pages', desc: 'Pair with a [countdown timer](/ui-snippets/countdown-timer/) — visitors can "warp" toward the reveal while waiting.' },
      { icon: 'LEARN', title: 'Teaching perspective projection', desc: 'A focused, minimal demonstration of manual perspective division — the core concept behind all 3D-to-2D projection.' },
      { icon: 'DESIGN', title: 'Portfolio hero backgrounds', desc: 'An interactive, physics-adjacent background stands out more than a static starfield image or CSS-only animation.' },
      { icon: 'ANIM', title: 'Transition and page-load effects', desc: 'Trigger a brief automatic warp burst on page load or route change as a distinctive transition moment.' },
    ],
    faqs: [
      { q: 'How does the effect make stars fly outward instead of just moving closer?', a: 'Each star\'s screen X and Y position is computed by dividing its fixed spatial X/Y by its remaining Z distance from the camera. As Z shrinks toward zero, that division makes the same X/Y spread progressively further from the screen center — the mathematical definition of perspective, applied manually rather than left entirely to the camera.' },
      { q: 'Why reset stars instead of creating new ones each time?', a: 'The BufferGeometry\'s position array is allocated once, at a fixed size, when the scene starts. Recycling a star — giving it a new random X/Y and pushing its Z back to the far edge — reuses that same array slot forever, avoiding any per-frame memory allocation or garbage collection, which keeps the frame rate stable even with thousands of stars cycling continuously.' },
      { q: 'Why does the warp button change field of view, not just speed?', a: 'Speeding up star movement alone just makes the same straight-line motion happen faster. Widening the camera\'s field of view at the same time exaggerates the outward perspective spread, which is what actually produces the bowed, stretched streak look associated with hyperspace or warp-speed effects in film.' },
      { q: 'Why use pointerdown/pointerup instead of a click toggle for the button?', a: 'The interaction is meant to feel like actively holding down a boost, not switching a persistent mode on and off. pointerdown starts the warp and pointerup (or pointerleave, in case the cursor slides off the button while pressed) ends it, matching a press-and-hold metaphor rather than a toggle switch.' },
      { q: 'Can I make the starfield denser or extend how far it reaches?', a: 'Yes. Raise STAR_COUNT for a denser field at a higher GPU cost, or increase FIELD to extend how far back stars spawn, giving a longer sense of depth before they reach the camera.' },
      { q: 'Can I use this Three.js starfield warp effect in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind CSS utility-class version. Store the warp boolean in component state or a ref rather than a plain module variable, initialize the renderer and star pool inside a mount effect, and call renderer.dispose() plus cancelAnimationFrame on cleanup so the WebGL context is released when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the perspective-division math from first principles by yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why dividing each star's X and Y by its remaining Z produces the outward hyperspace streak, or why the warp effect changes both speed and camera field of view rather than just one. The same assistant can help optimize it, for instance checking whether the per-star loop could be restructured to avoid recalculating the perspective divide for stars that haven't moved meaningfully, or whether the star count could scale automatically with device performance. It is also useful for extending the effect: ask it to add colored streak trails using line segments instead of points, trigger an automatic warp burst on page load, or tie the warp intensity to scroll position instead of a button. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "hyperspace starfield" effect in plain HTML, CSS, and JavaScript using Three.js loaded from a CDN (no bundler, no build step) — thousands of points streaming past the camera with a hold-to-warp control.

Requirements:
- A full-viewport canvas with a WebGLRenderer sized to match it, updated on window resize including camera aspect ratio, and a PerspectiveCamera with a wide field of view positioned near the origin.
- A fixed-size pool of at least 2,000 stars, each tracked as a plain object with its own x, y, and z coordinate, separate from the BufferGeometry's Float32Array used only for rendering.
- Every animation frame, decrement each star's z coordinate by a speed value; when a star's z drops below a small threshold, reset it to a fresh random x/y and push its z back out to the far edge of the field, without ever allocating a new object or resizing the geometry's array.
- Compute each star's rendered X and Y position by dividing its stored x/y by its remaining z (a perspective-divide), so stars closer to the camera appear to spread further from the screen center than distant ones.
- Render all stars as a single THREE.Points object using one BufferGeometry and PointsMaterial, updating the position attribute's needsUpdate flag once per frame.
- Add an on-screen button that, while actively pressed (using pointerdown and pointerup/pointerleave events, with touchstart/touchend as a fallback), increases both the per-frame z speed and the camera's field of view simultaneously, then instantly reverts both values the moment the button is released.
- Also increase the rendered point size while the warp state is active, so fast-moving points remain clearly visible rather than becoming faint thin streaks.`,
    },
  },
};

export default threeStarfieldWarp;
