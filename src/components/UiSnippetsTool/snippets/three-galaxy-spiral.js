const threeGalaxySpiral = {
  id: 'three-galaxy-spiral',
  title: 'Three.js Galaxy Spiral',
  lastmod: '2026-07-19',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<canvas id="galaxyCanvas"></canvas>
<div class="gx-badge">12,000 particles · spiral formula</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;background:#020207}
#galaxyCanvas{display:block;width:100%;height:100%;cursor:grab}
#galaxyCanvas:active{cursor:grabbing}
.gx-badge{position:fixed;left:18px;bottom:18px;padding:7px 13px;border-radius:7px;background:rgba(10,10,20,0.7);border:1px solid rgba(196,181,253,0.25);color:#e0d7fc;font:12px ui-monospace,monospace;backdrop-filter:blur(6px)}`,

  js: `const canvas = document.getElementById('galaxyCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.set(0, 5, 9);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.4;
controls.minDistance = 3;
controls.maxDistance = 18;

// Galaxy parameters, all named so the shape is easy to retune.
const COUNT = 12000;
const ARMS = 4;
const SPIN = 1.4;
const RANDOMNESS = 0.28;
const RADIUS = 5;
const INSIDE_COLOR = new THREE.Color(0xffb86b);
const OUTSIDE_COLOR = new THREE.Color(0x7c3aed);

const positions = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);
const baseAngles = new Float32Array(COUNT);
const baseRadii = new Float32Array(COUNT);
// A fixed random offset per particle, generated once — the animation loop
// re-adds this same offset every frame after recomputing the rotated ideal
// position, so scatter never drifts or needs recalculating.
const offsets = new Float32Array(COUNT * 3);

for (let i = 0; i < COUNT; i++) {
  // Each particle's radius is biased toward the center with a power curve,
  // matching how real spiral galaxies are denser near their core.
  const r = Math.pow(Math.random(), 1.6) * RADIUS;
  const armAngle = ((i % ARMS) / ARMS) * Math.PI * 2;
  // Spin angle grows with radius — this is the entire spiral-arm formula:
  // particles further from center have rotated further around the arm.
  const spinAngle = r * SPIN;
  const angle = armAngle + spinAngle;

  offsets[i * 3]     = (Math.random() - 0.5) * RANDOMNESS * (1 - r / RADIUS + 0.3);
  offsets[i * 3 + 1] = (Math.random() - 0.5) * RANDOMNESS * 0.4;
  offsets[i * 3 + 2] = (Math.random() - 0.5) * RANDOMNESS * (1 - r / RADIUS + 0.3);

  positions[i * 3]     = Math.cos(angle) * r + offsets[i * 3];
  positions[i * 3 + 1] = offsets[i * 3 + 1];
  positions[i * 3 + 2] = Math.sin(angle) * r + offsets[i * 3 + 2];

  baseAngles[i] = armAngle; // store the arm's starting angle only — spin is added back in every frame
  baseRadii[i] = r;

  const mixed = INSIDE_COLOR.clone().lerp(OUTSIDE_COLOR, r / RADIUS);
  colors[i * 3] = mixed.r; colors[i * 3 + 1] = mixed.g; colors[i * 3 + 2] = mixed.b;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.045,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const galaxy = new THREE.Points(geometry, material);
scene.add(galaxy);

const core = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xffe4b8 })
);
scene.add(core);

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const posAttr = geometry.getAttribute('position');
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.0009;

  // Differential rotation: particles closer to the core sweep around
  // faster than particles further out, exactly like a real galaxy's
  // rotation curve, rather than the whole disc spinning as one rigid body.
  // Position is always recomputed from the saved arm angle, radius, and
  // fixed random offset — never from the previous frame's position — so
  // the shape stays perfectly stable no matter how long the loop runs.
  for (let i = 0; i < COUNT; i++) {
    const r = baseRadii[i];
    const speed = 1 / (0.3 + r);
    const angle = baseAngles[i] + r * SPIN + t * speed;
    posAttr.setX(i, Math.cos(angle) * r + offsets[i * 3]);
    posAttr.setZ(i, Math.sin(angle) * r + offsets[i * 3 + 2]);
  }
  posAttr.needsUpdate = true;

  core.scale.setScalar(1 + Math.sin(t * 40) * 0.06);
  controls.update();
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Galaxy Spiral — Procedural WebGL Spiral Galaxy Particles',
    description: 'Build a procedural spiral galaxy in Three.js — 12,000 particles arranged with a radius-driven spin formula, colored from core to edge, rotating at different speeds by radius.',
    about: {
      title: 'How to Build a Procedural Three.js Spiral Galaxy',
      description: `The **Three.js Galaxy Spiral** snippet procedurally generates 12,000 particles into a convincing spiral-galaxy shape — dense glowing core, four sweeping arms, warm-to-cool color gradient — using nothing but a radius-driven spin formula and additive blending, with core Three.js and OrbitControls loaded from a CDN.

**The entire spiral shape comes from one line: spin angle grows with radius**

The defining formula of this snippet is deceptively simple: each particle's final angle around the center is \`armAngle + radius * SPIN\`. Because particles further from the core have a larger radius, they've been rotated further around their arm than particles close in — and that difference in rotation-per-radius is the *entire* mathematical definition of a logarithmic spiral. Multiple arms come from assigning each particle to one of \`ARMS\` evenly-spaced starting angles via \`(i % ARMS) / ARMS\`, so the same spin formula, applied to four different starting angles, produces four parallel spiral arms rather than one.

**A power-curve radius distribution, not a uniform one**

Radius is sampled as \`Math.random() ** 1.6 * RADIUS\` rather than plain \`Math.random() * RADIUS\`. Raising a 0–1 random value to a power greater than 1 biases the result toward zero — concentrating far more particles near the galactic core and thinning them out toward the edge, matching how real galaxies are visibly denser at the center. A plain linear distribution would produce an unrealistic, evenly-spread disc instead.

**Randomness that shrinks toward the edges**

Each particle gets a small random X/Y/Z jitter added on top of its ideal spiral position, but that jitter's magnitude is itself scaled by \`(1 - r/RADIUS)\` — particles near the core get more scatter, particles near the outer edge get almost none. This produces a galaxy that looks appropriately "fuzzy" and turbulent near its bright center while its outer arms stay crisp and well-defined, rather than uniform noise applied everywhere.

**Color mixed by radius, not randomly assigned**

Every particle's color is a linear interpolation between a warm inner color and a cooler outer color, using \`radius / RADIUS\` as the mix factor via \`THREE.Color.lerp()\`. Because that same radius value also drives the spiral math, color and shape share one underlying number — exactly the same principle used in the [particle wave](/ui-snippets/three-particle-wave/) snippet's height-to-color link, applied here to radial position instead of elevation.

**Differential rotation: inner particles orbit faster than outer ones**

Real galaxies don't rotate as a rigid disc — stars closer to the center complete an orbit much faster than stars near the edge. The animation loop gives each particle a rotation speed of \`1 / (0.3 + radius)\`, so particles near the core visibly race around while outer-arm particles drift slowly, which is what keeps the spiral arms from ever looking like they're rigidly spinning in lockstep.

**Additive blending makes overlapping particles glow**

The \`PointsMaterial\` uses \`THREE.AdditiveBlending\`, which sums overlapping particle colors instead of one drawing over another. Wherever many particles cluster densely — especially near the bright core — their colors add together into a genuinely brighter glow, rather than the topmost particle simply hiding the ones behind it.

**Where this generation technique applies**

The radius-driven-angle-plus-power-curve-density formula generalizes to any spiral or vortex shape — hurricane visualizations, whirlpool effects, or abstract vortex loaders. Pair it with a [starfield warp](/ui-snippets/three-starfield-warp/) for a "traveling toward a galaxy" scroll sequence, or contrast its particle-based density against the smooth, continuous surface of the [morphing blob](/ui-snippets/three-morphing-blob/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load both CDN scripts', text: 'Add three.min.js and OrbitControls.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A 12,000-particle spiral galaxy appears immediately, slowly rotating.' },
        { title: 'Drag to orbit, scroll to zoom', text: 'Manually inspect the galaxy from any angle; release to resume auto-rotation.' },
        { title: 'Adjust arm count and spin', text: 'Change ARMS and SPIN to produce tighter, looser, or more numerous spiral arms.' },
        { title: 'Retint the galaxy', text: 'Edit INSIDE_COLOR and OUTSIDE_COLOR for a different core-to-edge color gradient.' },
        { title: 'Resize the window', text: 'Renderer size and camera aspect ratio update automatically.' },
      ],
    },
    features: [
      'Radius-driven spiral formula: spin angle grows with distance from center, the mathematical basis of a logarithmic spiral',
      'Power-curve density distribution: particles concentrate near the core, matching real galaxy density',
      'Radius-scaled randomness: scatter shrinks toward the outer edge for crisp arms and a fuzzy, bright core',
      'Radius-driven color gradient: warm inner color blends to a cool outer color via THREE.Color.lerp()',
      'Differential rotation: inner particles orbit faster than outer ones, avoiding a rigid-disc look',
      'Additive blending: overlapping particles brighten together instead of occluding one another',
      'OrbitControls with auto-rotate: damped drag-to-inspect with idle rotation when not in use',
      'Fully procedural: no textures, models, or external datasets — every particle is generated from formulas',
    ],
    useCases: [
      { icon: 'WEB', title: 'Space and astronomy education sites', desc: 'A procedurally accurate spiral galaxy is a strong, explorable centerpiece for science and education content.' },
      { icon: 'ART', title: 'Music, event, and festival sites', desc: 'A glowing, rotating galaxy suits ambient, electronic, or cosmic visual branding far better than a static image.' },
      { icon: 'LEARN', title: 'Teaching procedural generation', desc: 'A complete, focused example of building complex organic shapes from simple formulas rather than authored data.' },
      { icon: 'DESIGN', title: 'Portfolio and agency showpieces', desc: 'Demonstrates both procedural generation skill and WebGL particle performance in one striking visual.' },
      { icon: 'GAME', title: 'Game menu and loading backgrounds', desc: 'A slowly rotating, explorable galaxy gives a loading or title screen a genuinely premium feel.' },
      { icon: 'ANIM', title: 'Sci-fi and space-travel narratives', desc: 'Pair with a [starfield warp](/ui-snippets/three-starfield-warp/) intro so visitors "arrive" at the galaxy after scrolling through hyperspace.' },
    ],
    faqs: [
      { q: 'How does one formula produce a full spiral galaxy shape?', a: 'Every particle\'s final angle is its starting arm angle plus its radius multiplied by a spin constant. Because particles further from the center have a larger radius, that formula rotates them further around — the defining property of a logarithmic spiral. Assigning particles to several evenly-spaced starting arm angles turns one spiral formula into several parallel arms.' },
      { q: 'Why is radius sampled with Math.random() raised to a power instead of plain random?', a: 'Raising a 0-1 random value to a power greater than 1 (1.6 in this snippet) skews the result toward zero, so far more particles land near the galactic core than near the edge — matching how real spiral galaxies are visibly denser at their center. Sampling radius with plain Math.random() would instead produce an unrealistic, evenly-spread disc of particles.' },
      { q: 'Why does the random scatter shrink near the edges of the galaxy?', a: 'Each particle\'s random position jitter is multiplied by (1 - radius/RADIUS), which is close to 1 near the core and close to 0 near the outer edge. This produces a galaxy that looks appropriately turbulent and fuzzy near its bright center while its outer spiral arms stay crisp and well-defined.' },
      { q: 'Why do inner particles rotate faster than outer particles?', a: 'Real spiral galaxies exhibit differential rotation — stars closer to the center complete an orbit much faster than stars further out. The animation loop gives each particle a rotation speed of 1 divided by (a small constant plus its radius), so smaller radii produce visibly faster rotation, which keeps the arms from looking like a single rigid, uniformly-spinning disc.' },
      { q: 'What does additive blending do for the galaxy\'s appearance?', a: 'THREE.AdditiveBlending sums the colors of overlapping particles instead of the frontmost particle simply hiding the ones behind it. In densely packed regions — especially near the bright core — many overlapping particles\' colors add together into a genuinely brighter glow, which is what gives the core its luminous look.' },
      { q: 'Can I use this Three.js galaxy spiral in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind CSS utility-class version. Build the particle buffers and controls inside a mount effect so the generation formula only runs once, and call controls.dispose() plus renderer.dispose() on cleanup.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer the spiral-galaxy math by staring at the formulas alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why raising a random value to a power biases particle density toward the core, or how the differential rotation speed formula keeps inner and outer particles from spinning in rigid lockstep. The same assistant can help optimize it, for instance checking whether the per-particle position rewrite in the animation loop could be restructured to avoid the redundant angle recomputation, or whether particle count could scale down automatically on lower-end GPUs. It is also useful for extending the effect: ask it to add a second, counter-rotating galaxy for a colliding-galaxies visual, tie the color gradient to a different property like particle speed instead of radius, or add a subtle bulge by lifting particles near the core slightly along the Y axis. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a procedural "spiral galaxy" in plain HTML, CSS, and JavaScript using Three.js and its OrbitControls addon, both loaded from a CDN (no bundler, no build step, no external textures or datasets).

Requirements:
- A full-viewport canvas with a WebGLRenderer sized to match it, updated on window resize including camera aspect ratio, plus OrbitControls with damping and idle auto-rotation enabled.
- Generate at least 10,000 particles procedurally. For each particle: sample a radius using a random value raised to a power greater than 1 (so density concentrates toward the center rather than being uniform), assign it to one of several evenly-spaced "arm" starting angles using its index modulo the arm count, and compute its final angle as that arm's starting angle plus the radius multiplied by a spin constant — so particles further from the center are rotated further around, forming a logarithmic spiral.
- Add a small random position offset to each particle, scaled down as radius approaches the maximum radius, so scatter is more pronounced near the core and minimal near the outer edge.
- Color each particle by linearly interpolating between a warm inner color and a cooler outer color based on that particle's radius divided by the maximum radius, using the color interpolation method on Three.js's color class.
- Render all particles as a single THREE.Points object with vertex colors enabled and additive blending, so overlapping particles in dense regions brighten together rather than occluding each other.
- Every animation frame, rotate each particle around the center at a speed inversely related to its radius (smaller radius means faster rotation), so the galaxy exhibits differential rotation rather than spinning as one rigid disc.
- Add a small glowing sphere at the center representing the galactic core, with a subtle pulsing scale animation.`,
    },
  },
};

export default threeGalaxySpiral;
