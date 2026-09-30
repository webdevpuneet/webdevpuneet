const threeScrollGalaxyFormation = {
  id: 'three-scroll-galaxy-formation',
  title: 'Three.js Scroll Galaxy Formation',
  lastmod: '2026-07-20',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="gxy-stage" id="gxyStage">
  <div class="gxy-intro-overlay"><p>Scroll ↓ to collapse the dust cloud into a galaxy</p></div>
  <canvas id="gxyCanvas"></canvas>
  <div class="gxy-hud"><span id="gxyPct">0</span>% formed</div>
</section>
<section class="gxy-bottom"><p>A spiral galaxy, fully assembled.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#04030a;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.gxy-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a86b8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 24px}
.gxy-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(ellipse at center,#0c0a1e 0%,#04030a 70%)}
.gxy-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8a86b8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease;}
#gxyCanvas{display:block;width:100%;height:100%}
.gxy-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#c4b5fd;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('gxyCanvas');
const pctEl = document.getElementById('gxyPct');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
camera.position.set(0, 22, 34);
camera.lookAt(0, 0, 0);

const COUNT = 9000;
const ARMS = 4;
const RADIUS = 16;

// Each particle carries a scattered "start" position (chaotic dust cloud) and
// a computed "target" position on a logarithmic spiral arm. Position, size,
// and target are all packed into flat Float32Arrays up front so the render
// loop only has to lerp, never allocate.
const startPos = new Float32Array(COUNT * 3);
const targetPos = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);
const livePos = new Float32Array(COUNT * 3);

const coreColor = new THREE.Color(0xfff4e0);
const midColor = new THREE.Color(0x8fb8ff);
const edgeColor = new THREE.Color(0x7c5cff);

for (let i = 0; i < COUNT; i++) {
  // Chaotic starting cloud: a big random sphere so the "before" state reads
  // as scattered dust with no visible structure.
  const sr = Math.pow(Math.random(), 0.5) * 26 + 4;
  const sTheta = Math.random() * Math.PI * 2;
  const sPhi = Math.acos(2 * Math.random() - 1);
  startPos[i * 3 + 0] = sr * Math.sin(sPhi) * Math.cos(sTheta);
  startPos[i * 3 + 1] = sr * Math.sin(sPhi) * Math.sin(sTheta) * 0.6;
  startPos[i * 3 + 2] = sr * Math.cos(sPhi);

  // Target: a point along one of ARMS logarithmic spiral arms. Distance from
  // core picks the arm angle offset so arms sweep outward, and a small
  // random scatter perpendicular to the arm keeps it from looking like a
  // wireframe rather than a dust lane.
  const t = Math.pow(Math.random(), 1.4); // bias toward the dense core
  const dist = t * RADIUS;
  const arm = i % ARMS;
  const armAngle = (arm / ARMS) * Math.PI * 2;
  const spiralAngle = armAngle + dist * 0.5 + Math.pow(t, 0.5) * 2.2;
  const scatter = (1 - t) * 1.6 + 0.25;
  const jitterR = (Math.random() - 0.5) * scatter;
  const jitterY = (Math.random() - 0.5) * scatter * 0.4;
  const finalDist = dist + jitterR;
  targetPos[i * 3 + 0] = Math.cos(spiralAngle) * finalDist;
  targetPos[i * 3 + 1] = jitterY * (1 - t * 0.6);
  targetPos[i * 3 + 2] = Math.sin(spiralAngle) * finalDist;

  // Hue gradient: white-hot core fading through blue mid-disk to violet rim.
  const c = new THREE.Color();
  if (t < 0.35) c.copy(coreColor).lerp(midColor, t / 0.35);
  else c.copy(midColor).lerp(edgeColor, (t - 0.35) / 0.65);
  colors[i * 3 + 0] = c.r;
  colors[i * 3 + 1] = c.g;
  colors[i * 3 + 2] = c.b;

  livePos.set([startPos[i * 3], startPos[i * 3 + 1], startPos[i * 3 + 2]], i * 3);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(livePos, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.16,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending, // overlapping dust glows instead of occluding
  depthWrite: false,
  sizeAttenuation: true,
});
const points = new THREE.Points(geometry, material);
scene.add(points);

const introEl = document.querySelector('.gxy-intro-overlay');
gsap.registerPlugin(ScrollTrigger);

// A single 0-1 value drives both the lerp toward the spiral and the camera
// pulling back to reveal the full disk once formed.
const form = { t: 0 };
gsap.to(form, {
  t: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#gxyStage',
    start: 'top top',
    end: '+=450%',
    scrub: 0.6,
    pin: true,
  },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const posAttr = geometry.getAttribute('position');
let rotationAccum = 0;

function animate() {
  requestAnimationFrame(animate);
  if (introEl) introEl.style.opacity = (form.t > 0.03) ? '0' : '1';

  const t = form.t;
  // Ease the lerp itself (smoothstep) so the collapse accelerates into the
  // middle of the scroll range rather than moving at a constant rate.
  const eased = t * t * (3 - 2 * t);

  for (let i = 0; i < COUNT; i++) {
    const ix = i * 3;
    const lx = startPos[ix] + (targetPos[ix] - startPos[ix]) * eased;
    const ly = startPos[ix + 1] + (targetPos[ix + 1] - startPos[ix + 1]) * eased;
    const lz = startPos[ix + 2] + (targetPos[ix + 2] - startPos[ix + 2]) * eased;
    posAttr.array[ix] = lx;
    posAttr.array[ix + 1] = ly;
    posAttr.array[ix + 2] = lz;
  }
  posAttr.needsUpdate = true;

  // Once the disk is mostly formed, spin it slowly like a real rotating
  // galaxy — the spin rate itself ramps in with t so it never spins while
  // still a chaotic cloud.
  rotationAccum += 0.0009 * eased * eased;
  points.rotation.y = rotationAccum;

  // Pull the camera back and down as the galaxy forms so the final shot
  // reveals the whole spiral from a dramatic tilted angle.
  const camDist = 34 - eased * 6;
  const camHeight = 22 - eased * 8;
  camera.position.set(Math.sin(rotationAccum * 0.2) * 2, camHeight, camDist);
  camera.lookAt(0, 0, 0);

  pctEl.textContent = Math.round(eased * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Galaxy Formation — Particle Spiral Effect',
    description: 'Scroll-scrub 9,000 particles from scattered dust into a rotating spiral galaxy with Three.js BufferGeometry and GSAP. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Particle Galaxy Formation With Three.js',
      description: `The **Three.js Scroll Galaxy Formation** snippet takes nine thousand points scattered as a chaotic dust cloud and, as the visitor scrolls through a pinned stage, lerps every single one of them into place along the arms of a rotating spiral galaxy. The whole effect is one \`THREE.BufferGeometry\`, one \`THREE.PointsMaterial\`, and a scrubbed GSAP tween — no per-particle mesh, no physics engine, just precomputed start and target positions and a per-frame interpolation.

**One BufferGeometry, not nine thousand meshes**

The naive approach to "thousands of particles" is to spawn a mesh per particle, but that means nine thousand draw calls, nine thousand transform updates, and a frame rate that collapses well before the effect looks good. Instead this snippet allocates a single flat \`Float32Array\` of length \`COUNT * 3\` and hands it to \`THREE.BufferAttribute\`, so the GPU renders every particle in one \`THREE.Points\` draw call. Updating the whole galaxy each frame is just writing floats into that array and flipping \`posAttr.needsUpdate = true\` — the same technique used by the [particle assembly](/ui-snippets/three-scroll-particle-assembly/) snippet, applied here to a spiral rather than a logo shape.

**Precomputing start and target, not simulating physics**

Rather than running an N-body gravity simulation to make particles "fall" into a spiral — expensive and hard to make deterministic on scroll-reverse — every particle's chaotic starting position and its final spiral position are both computed once, up front, and stored in parallel arrays (\`startPos\` and \`targetPos\`). The animation loop then does nothing more than \`lerp(start, target, easedProgress)\` for every particle, every frame. Because both endpoints are fixed, scrolling backward simply lerps the other direction — full reversibility falls out of the math for free, exactly like the scrubbed camera value in the [scroll tunnel](/ui-snippets/three-scroll-tunnel/) snippet.

**Logarithmic-style spiral arm placement**

Each particle's target is generated with a biased random radius \`t\` (raised to a power so points cluster densely near the core, matching how real galaxy density falls off), assigned to one of four arms by \`i % ARMS\`, and given an angle that increases with distance from the core (\`armAngle + dist * 0.5 + sqrt(t) * 2.2\`). That distance-dependent angle term is what makes the arms sweep outward into recognizable spiral curves rather than straight spokes — it is a coarse approximation of a logarithmic spiral, cheap enough to compute nine thousand times without a lookup table.

**Hue gradient from white-hot core to violet rim**

Color is baked into the same geometry via a second \`BufferAttribute\` (\`color\`) and \`vertexColors: true\` on the material, so no shader is required. Each particle's color is interpolated between a warm near-white core tone, a blue mid-disk tone, and a violet edge tone based on the same \`t\` value used for its radius — meaning color and position are derived from one shared variable, so they always agree about which particles are "core" versus "rim" even as the galaxy assembles.

**Additive blending for glowing dust**

\`THREE.AdditiveBlending\` with \`depthWrite: false\` is what makes overlapping particles brighten instead of occlude each other, which is essential for a convincing dust-cloud look — normal alpha blending would make dense clusters look like flat gray smudges instead of glowing nebulae. This is the same blending trick used in the [galaxy spiral](/ui-snippets/three-galaxy-spiral/) ambient background snippet, but here it is combined with scroll-scrubbed formation instead of a static loop.

**Smoothstep easing decoupled from the scrub**

The raw scrubbed value \`form.t\` moves linearly with scroll position (GSAP's \`ease: 'none'\`), but the visual lerp applies its own \`t * t * (3 - 2 * t)\` smoothstep on top. This keeps the scrollbar mapping perfectly linear and predictable for ScrollTrigger's pin math, while still giving the particle motion itself an eased, physical acceleration-and-settle feel — two different easings serving two different jobs.

**Rotation and camera pull-back tied to the same progress**

Once the disk is mostly formed, the whole \`THREE.Points\` object spins slowly around Y, and the spin speed itself is scaled by \`eased * eased\` so a still-chaotic cloud never visibly rotates — only a recognizable galaxy does. The camera simultaneously pulls back and drops in height as \`eased\` climbs, ending on a tilted wide shot of the finished spiral, similar in spirit to the reveal camera move in [crystal cluster](/ui-snippets/three-crystal-cluster/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A scattered particle cloud appears inside a pinned 3D stage with a live "% formed" read-out.' },
        { title: 'Scroll down', text: 'Nine thousand particles lerp from chaotic dust into a four-armed spiral galaxy and begin to rotate.' },
        { title: 'Scroll back up', text: 'The galaxy dissolves back into scattered dust exactly in reverse, since every particle lerps between two fixed points.' },
        { title: 'Retune the shape', text: 'Change ARMS for more or fewer spiral arms, or RADIUS to make the finished galaxy bigger or smaller.' },
        { title: 'Adjust the pacing', text: 'Change the ScrollTrigger end value (+=450%) for a slower, more gradual collapse or a snappier one.' },
      ],
    },
    features: [
      'Single THREE.BufferGeometry with a flat Float32Array position attribute drives all 9,000 particles in one draw call',
      'Per-particle start/target positions precomputed once; the render loop only lerps — no physics simulation required',
      'Logarithmic-style spiral placement: angle grows with distance from core across 4 assignable arms',
      'Vertex-colored hue gradient (white-hot core to violet rim) baked into a second BufferAttribute, no custom shader',
      'AdditiveBlending with depthWrite: false makes overlapping particles glow like real nebula dust',
      'Smoothstep easing applied to the lerp, decoupled from GSAP\'s linear scrollbar-to-progress mapping',
      'Rotation speed and camera pull-back both scale with eased-progress squared so only a formed galaxy spins',
      'Fully reversible and pinned — scrolling up replays the dust dispersal with zero extra code',
    ],
    useCases: [
      { icon: 'WEB', title: 'Space and astronomy sites', desc: 'Open a planetarium, observatory, or science-education homepage with a galaxy that assembles as visitors scroll past the hero.' },
      { icon: 'ANIM', title: 'Album and music launches', desc: 'A cosmic reveal suits ambient, electronic, or sci-fi themed releases better than a static hero image.' },
      { icon: 'ART', title: 'Generative art portfolios', desc: 'Showcase particle-system work with a piece that visibly demonstrates the underlying data structure as it forms.' },
      { icon: 'GAME', title: 'Space game landing pages', desc: 'Pair with a [starfield warp](/ui-snippets/three-starfield-warp/) intro section so the galaxy formation reads as arriving at a new system.' },
      { icon: 'LEARN', title: 'Teaching BufferGeometry performance', desc: 'A compact real-world example of why thousands of THREE.Points beat thousands of meshes, complete with vertex coloring.' },
      { icon: 'DESIGN', title: 'Scroll-story chapter breaks', desc: 'Use the formation as a mid-page transition between sections, similar to how the [scroll tunnel](/ui-snippets/three-scroll-tunnel/) bridges content blocks.' },
    ],
    faqs: [
      { q: 'Why precompute start and target positions instead of simulating gravity?', a: 'An N-body simulation is expensive to run every frame and, worse, is not naturally reversible — running it backward does not reliably retrace the same path. By fixing a start position and a target position for every particle up front and simply lerping between them by a scrubbed progress value, scrolling up is mathematically guaranteed to retrace the exact same path in reverse, with no extra state to manage.' },
      { q: 'Why use one BufferGeometry instead of one mesh per particle?', a: 'Nine thousand individual meshes means nine thousand draw calls and nine thousand matrix updates per frame, which tanks frame rate well before the effect looks convincing. A single THREE.BufferGeometry with a flat Float32Array position attribute lets THREE.Points render every particle in one draw call, and updating positions is just writing floats into that array and setting needsUpdate on the attribute.' },
      { q: 'Why does the color come from a BufferAttribute instead of a custom shader?', a: 'THREE.PointsMaterial supports vertexColors natively, so packing a per-particle RGB triple into a second BufferAttribute and setting vertexColors: true gets a smooth hue gradient with zero GLSL code. It is derived from the same t value used for each particle\'s spiral radius, so color and position always agree about which particles belong to the dense core versus the faint rim.' },
      { q: 'Why is additive blending important here?', a: 'With normal alpha blending, overlapping semi-transparent particles darken toward gray and dense clusters look like flat smudges. THREE.AdditiveBlending sums overlapping colors instead, so dense regions brighten like real light-emitting dust, and depthWrite: false prevents particles from occluding each other based on draw order, keeping the glow consistent from every angle.' },
      { q: 'Can I use this Three.js galaxy formation in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the geometry, particle arrays, and GSAP ScrollTrigger inside a mount effect keyed to a canvas ref, and on unmount kill the ScrollTrigger instance (or revert a gsap.context), dispose the geometry and material, and call renderer.dispose() so the pin and WebGL context do not leak between route changes.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to reverse-engineer how nine thousand particles collapse into a spiral without a physics engine. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why start and target positions are precomputed rather than simulated, or how the arm-angle formula produces a spiral rather than straight spokes. The same assistant can help you extend it — ask it to add a second particle layer for a surrounding halo, vary particle size by distance from the core for a parallax-like depth cue, or add a subtle color pulse timed to scroll velocity. It can also help optimize further, for instance moving the per-frame lerp into a vertex shader via a custom ShaderMaterial so the CPU loop disappears entirely. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-scrubbed particle galaxy formation" in plain HTML, CSS, and JavaScript using Three.js, GSAP, and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas, with a WebGLRenderer and PerspectiveCamera sized to it and updated on window resize including aspect ratio.
- Create roughly 9,000 particles using a single THREE.BufferGeometry with a flat Float32Array position attribute rendered via THREE.Points — never individual meshes per particle.
- For each particle, precompute a scattered random "start" position (a large chaotic sphere) and a "target" position placed along one of several logarithmic-style spiral arms, where the angle around the center increases with distance from the core.
- Bake a per-particle color into a second BufferAttribute (vertexColors: true) that gradients from a warm near-white core color through a blue mid-disk color to a violet rim color, driven by the same radius parameter used to place each particle.
- Use PointsMaterial with AdditiveBlending and depthWrite: false so overlapping particles glow instead of occluding each other.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub, and a multi-hundred-percent end, animating a single plain progress value from 0 to 1 with linear easing.
- Every animation frame (requestAnimationFrame, independent of the scroll callback), apply an additional smoothstep easing to the scrubbed progress, then lerp every particle's live position between its start and target by that eased value, write the results into the position BufferAttribute, and set needsUpdate to true.
- Once progress is high, slowly rotate the whole particle system and pull the camera back and down to reveal the full spiral.
- Confirm scrolling back up reverses the entire formation smoothly, since every particle lerps between two fixed, precomputed points.`,
    },
  },
};

export default threeScrollGalaxyFormation;
