const threeScrollSeasonsTree = {
  id: 'three-scroll-seasons-tree',
  title: 'Three.js Scroll Four Seasons Tree',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ssn-stage" id="ssnStage">
  <div class="ssn-intro"><p>Scroll ↓ to pass a year</p></div>
  <canvas id="ssnCanvas"></canvas>
  <div class="ssn-hud" id="ssnSeason">SPRING</div>
</section>
<section class="ssn-bottom"><p>And spring comes back around.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0f141a;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.ssn-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8fa3b0;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.ssn-stage{height:100vh;position:relative;overflow:hidden;background:#0f141a}
.ssn-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#dbeafe;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#ssnCanvas{display:block;width:100%;height:100%}
.ssn-hud{position:absolute;left:24px;bottom:24px;font-size:13px;letter-spacing:.2em;color:#a7f3d0;text-transform:uppercase;opacity:.85;transition:color .5s}`,

  js: `const canvas = document.getElementById('ssnCanvas');
const seasonEl = document.getElementById('ssnSeason');
const introEl = document.querySelector('.ssn-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 300);

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const sun = new THREE.DirectionalLight(0xffffff, 1.0);
sun.position.set(18, 30, 14);
scene.add(sun);

function rand(seed) {
  const x = Math.sin(seed * 113.5 + 271.9) * 43758.5453;
  return x - Math.floor(x);
}

// Ground disc — its color is season-graded along with everything else.
const ground = new THREE.Mesh(
  new THREE.CircleGeometry(60, 64),
  new THREE.MeshLambertMaterial({ color: 0x2d4a2f })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Low-poly trunk + branches.
const wood = new THREE.MeshLambertMaterial({ color: 0x4a3426 });
const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 9, 8), wood);
trunk.position.y = 4.5;
scene.add(trunk);
const branches = [];
for (let i = 0; i < 6; i++) {
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.42, 5.5, 6), wood);
  const a = (i / 6) * Math.PI * 2 + rand(i) * 0.7;
  b.position.set(Math.cos(a) * 2.2, 8 + rand(i + 50) * 2.2, Math.sin(a) * 2.2);
  b.rotation.z = Math.cos(a) * 1.0;
  b.rotation.x = -Math.sin(a) * 1.0;
  scene.add(b);
  branches.push(b);
}

// Foliage: 90 icosahedron puffs on the crown. Season drives their color,
// scale (bare in winter), and emissive blossom tint in spring.
const PUFFS = 90;
const puffs = [];
for (let i = 0; i < PUFFS; i++) {
  const theta = rand(i) * Math.PI * 2, phi = Math.acos(2 * rand(i + 900) - 1);
  const r = 4.2 * Math.cbrt(rand(i + 1800));
  const mat = new THREE.MeshLambertMaterial({ color: 0x67b26f });
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9 + rand(i + 2700) * 0.8, 0), mat);
  m.position.set(
    Math.sin(phi) * Math.cos(theta) * r * 1.15,
    11.5 + Math.cos(phi) * r * 0.75,
    Math.sin(phi) * Math.sin(theta) * r * 1.15
  );
  scene.add(m);
  puffs.push({ m, mat, phase: rand(i + 3600) * Math.PI * 2, scale: m.scale.x });
}

// One recycled particle system plays blossom petals (spring), falling
// leaves (autumn), and snow (winter) — only color/size/behavior change.
const FLAKES = 400;
const flakeGeo = new THREE.BufferGeometry();
const flakePos = new Float32Array(FLAKES * 3);
const flakeSeed = [];
for (let i = 0; i < FLAKES; i++) {
  flakePos[i * 3] = (rand(i + 5e3) - 0.5) * 44;
  flakePos[i * 3 + 1] = rand(i + 6e3) * 22;
  flakePos[i * 3 + 2] = (rand(i + 7e3) - 0.5) * 44;
  flakeSeed.push(rand(i + 8e3));
}
flakeGeo.setAttribute('position', new THREE.BufferAttribute(flakePos, 3));
const flakeMat = new THREE.PointsMaterial({ color: 0xffc4dd, size: 0.3, transparent: true, opacity: 0.9, sizeAttenuation: true });
const flakes = new THREE.Points(flakeGeo, flakeMat);
scene.add(flakes);

// Season keyframes: sky, ground, foliage, light color/intensity, foliage
// scale, particle color and opacity. Year progress lerps between them.
const K = [
  { sky: 0x9fd3e8, ground: 0x3d6b3f, leaf: 0x7cc47f, light: 0xfff7e0, li: 1.0, scale: 0.85, pc: 0xffc4dd, po: 0.9, name: 'SPRING', hud: '#a7f3d0' },
  { sky: 0x87c8f0, ground: 0x2f5e31, leaf: 0x2e8b3d, light: 0xfff2c4, li: 1.25, scale: 1.1, pc: 0xffffff, po: 0.0, name: 'SUMMER', hud: '#86efac' },
  { sky: 0xd9b38c, ground: 0x6b5232, leaf: 0xd97b29, light: 0xffdba8, li: 0.85, scale: 0.95, pc: 0xe8933a, po: 0.85, name: 'AUTUMN', hud: '#fdba74' },
  { sky: 0xbfd3de, ground: 0xdfe8ee, leaf: 0xf4f8fb, light: 0xdce9f5, li: 0.6, scale: 0.12, pc: 0xffffff, po: 0.95, name: 'WINTER', hud: '#bae6fd' },
  // Wrap target = spring again, so the year closes its loop.
  { sky: 0x9fd3e8, ground: 0x3d6b3f, leaf: 0x7cc47f, light: 0xfff7e0, li: 1.0, scale: 0.85, pc: 0xffc4dd, po: 0.9, name: 'SPRING', hud: '#a7f3d0' },
];
const cA = new THREE.Color(), cB = new THREE.Color(), cOut = new THREE.Color();
function lerpHex(a, b, f, into) {
  cA.setHex(a); cB.setHex(b);
  into.copy(cA).lerp(cB, f);
  return into;
}

scene.background = new THREE.Color(K[0].sky);

gsap.registerPlugin(ScrollTrigger);
const year = { p: 0 };
gsap.to(year, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#ssnStage', start: 'top top', end: '+=500%', scrub: 0.5, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const p = year.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  // Which pair of season keyframes are we between?
  const seg = Math.min(3.999, p * 4);
  const i0 = Math.floor(seg), f = seg - i0;
  // Smoothstep the blend so each season holds near its center.
  const sf = f * f * (3 - 2 * f);
  const A = K[i0], B = K[i0 + 1];

  scene.background = lerpHex(A.sky, B.sky, sf, cOut).clone();
  ground.material.color.copy(lerpHex(A.ground, B.ground, sf, cOut));
  sun.color.copy(lerpHex(A.light, B.light, sf, cOut));
  sun.intensity = A.li + (B.li - A.li) * sf;

  const leafC = lerpHex(A.leaf, B.leaf, sf, cOut).clone();
  const scale = A.scale + (B.scale - A.scale) * sf;
  puffs.forEach((pf) => {
    pf.mat.color.copy(leafC);
    const s = pf.scale * scale * (1 + Math.sin(t * 1.2 + pf.phase) * 0.03);
    pf.m.scale.setScalar(Math.max(0.001, s));
  });

  flakeMat.color.copy(lerpHex(A.pc, B.pc, sf, cOut));
  flakeMat.opacity = A.po + (B.po - A.po) * sf;
  flakeMat.size = 0.22 + flakeMat.opacity * 0.16;
  const fp = flakes.geometry.attributes.position;
  for (let i = 0; i < FLAKES; i++) {
    let y = fp.array[i * 3 + 1] - (0.02 + flakeSeed[i] * 0.035);
    fp.array[i * 3] += Math.sin(t * 0.8 + flakeSeed[i] * 9) * 0.012;
    if (y < 0) y = 22;
    fp.array[i * 3 + 1] = y;
  }
  fp.needsUpdate = true;

  const cur = f < 0.5 ? A : B;
  seasonEl.textContent = cur.name;
  seasonEl.style.color = cur.hud;

  const ang = 0.4 + p * Math.PI * 1.05 + t * 0.02;
  camera.position.set(Math.sin(ang) * 30, 10 + Math.sin(t * 0.25) * 0.6, Math.cos(ang) * 30);
  camera.lookAt(0, 9, 0);

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Seasons Tree — Keyframe Color Grading',
    description: 'Scroll carries a low-poly tree through spring blossoms, summer, autumn fall and bare winter snow via keyframe lerping. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Four Seasons Tree With Three.js and GSAP',
      description: `The **Three.js Scroll Four Seasons Tree** snippet plants a low-poly tree on a hillside disc and lets one scroll carry it through an entire year — spring blossoms drifting past green buds, deep summer foliage, orange autumn leaf-fall, bare branches under snow, and back to spring — while the camera circles the tree a half-turn. The engine underneath is a compact keyframe system: five season states, one scrubbed year value, and everything on screen lerped between adjacent keyframes.

**Seasons as data: the keyframe table**

Every visual property that changes across the year lives in one array of keyframe objects: sky color, ground color, foliage color, light color and intensity, foliage scale, particle color, and particle opacity, plus a HUD name and accent. The frame loop computes which pair of keyframes the year progress falls between (\`seg = p × 4\`), and lerps every property by the fractional part. Adding a fifth visual property to the year means adding one field to five objects — no animation code changes. The fifth keyframe duplicates spring, so the year closes its loop and the scroll's end matches its beginning, a cyclical structure unlike the linear arcs of the [ocean dive](/ui-snippets/three-scroll-ocean-dive/) or [planet approach](/ui-snippets/three-scroll-planet-approach/).

**Smoothstep holds each season at its center**

Raw linear blending would keep the scene perpetually in transition — always between seasons, never *in* one. Passing the blend fraction through smoothstep (\`f²(3 − 2f)\`) flattens the curve near 0 and 1, so each season visibly holds near its keyframe before easing into the next. One line converts a continuous color wash into four distinct acts with transitions.

**Winter is a scale, not a texture swap**

The foliage is 90 icosahedron puffs distributed through the crown by a cube-root radial distribution (which fills a sphere evenly instead of clustering at the center). Their season behavior is driven by two lerped values: color (bud green → deep green → orange → snowy white) and scale — and winter's scale keyframe is 0.12, which shrinks the puffs to almost nothing and reveals the branch skeleton underneath. Shrinking beats hiding: the tree visibly *loses* its leaves through late autumn and buds them back through early spring, both directions handled by the same lerp. Each puff also breathes ±3% on clock time with a per-puff phase, so the crown rustles while scroll is idle.

**One particle system plays three roles**

Pink blossom petals in spring, orange falling leaves in autumn, white snow in winter — all the same 400-point recycled system. The keyframes drive its color and opacity (summer sets opacity 0, turning it off entirely), while per-particle seeds vary fall speed and sway. Points wrap from ground back to the sky, the recycle pattern this series uses everywhere from [starfield warp](/ui-snippets/three-starfield-warp/) onward. One system, three seasonal meanings, zero allocation.

**A half-orbit that pairs with the year**

The camera circles the tree just over half a turn across the scroll, so each season also gets its own viewing angle — and because sun color and intensity are keyframed too, the same geometry reads warm and lush in summer light and cold and skeletal under the dim winter sun. The HUD swaps the season name and its accent color at each blend midpoint. Scrolling backwards runs the year in reverse, snow lifting off and leaves reattaching, since every property derives from the single scrubbed value — the same guarantee behind the [tornado vortex](/ui-snippets/three-scroll-tornado-vortex/)'s dispersal.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A low-poly tree in fresh spring green stands on a hill disc, pink blossom petals drifting, the HUD reading SPRING.' },
        { title: 'Scroll through summer', text: 'Foliage deepens and swells, petals stop, light warms and brightens as the camera begins its half-orbit.' },
        { title: 'Enter autumn and winter', text: 'The crown turns orange as leaves fall, then puffs shrink to bare branches while snow drifts down under cold dim light.' },
        { title: 'Close the loop', text: 'The final quarter blends winter back into spring — the year ends where it began.' },
        { title: 'Retheme the year', text: 'Edit the K keyframe array — every color, light level, foliage scale, and particle behavior for each season lives in one object per season.' },
      ],
    },
    features: [
      'Compact keyframe system: five season states, every visual property lerped between adjacent pairs',
      'Smoothstep on the blend fraction so each season holds at its center instead of perpetually transitioning',
      'Winter as foliage scale 0.12 — the tree visibly sheds and regrows leaves through the same lerp',
      'One 400-point recycled particle system playing blossoms, leaf-fall, and snow via keyframed color/opacity',
      'Cube-root radial puff distribution fills the crown evenly instead of clustering at the center',
      'Keyframed sun color and intensity: the same geometry reads lush in summer, skeletal in winter',
      'Half-orbit camera giving each season its own viewing angle, plus clock-driven crown rustle',
      'Cyclical structure — the fifth keyframe duplicates spring so the scroll ends where it began',
    ],
    useCases: [
      { icon: 'WEB', title: 'Seasonal campaign and holiday pages', desc: 'One asset covers a whole year of campaigns — pin copy per season with [scroll pin steps](/ui-snippets/scroll-pin-steps/) and land the CTA in the season you are selling.' },
      { icon: 'ANIM', title: 'Growth and lifecycle storytelling', desc: 'Nonprofits, gardens, and sustainability brands get the literal metaphor: plant, flourish, shed, rest, return.' },
      { icon: 'LEARN', title: 'Teaching keyframe interpolation', desc: 'A clean, visual introduction to keyframe tables, segment indexing, and why smoothstep beats linear blends — transferable far beyond Three.js.' },
      { icon: 'DESIGN', title: 'Ambient hero for calm brands', desc: 'Wellness, tea, and stationery brands can idle on any season — the rustling crown and drifting particles keep it alive, gentler than a [tornado vortex](/ui-snippets/three-scroll-tornado-vortex/).' },
      { icon: 'ART', title: 'Generative art and poetry pages', desc: 'Pair each season with a stanza; the reverse scroll reading (winter back to spring) becomes part of the piece.' },
      { icon: 'GAME', title: 'Farming and cozy game promos', desc: 'Stardew-adjacent games can preview their season cycle in one scroll, then hand off to a [scroll horizontal gallery](/ui-snippets/three-scroll-horizontal-gallery/) of screenshots.' },
    ],
    faqs: [
      { q: 'How does one scroll value drive four completely different seasons?', a: 'Through a keyframe table: five state objects (spring, summer, autumn, winter, spring-again) each hold sky, ground, foliage, and light colors, light intensity, foliage scale, and particle color/opacity. The frame loop maps progress to a segment (p × 4), takes the adjacent keyframe pair, and lerps every property by the smoothstepped fraction. The seasons are data; the animation code never mentions any season by name.' },
      { q: 'Why do the leaves shrink in winter instead of being hidden?', a: 'Scale is continuous, visibility is binary. With winter\'s foliage scale keyframed at 0.12, the autumn→winter blend shows the crown gradually thinning to bare branches, and winter→spring shows buds swelling back — both directions for free through the same lerp. Toggling visible would snap 90 puffs off in one frame, which reads as a glitch rather than a season.' },
      { q: 'How can one particle system be petals, leaves, and snow?', a: 'The falling behavior is identical — only color, opacity, and size differ, and those are keyframed like everything else: pink at 0.9 opacity in spring, off (0.0) in summer, orange in autumn, white in winter. Per-particle seeds vary drop speed and sway so the field never looks uniform. One geometry, one material, one draw call, three seasonal meanings.' },
      { q: 'What does the smoothstep on the blend fraction actually change?', a: 'Linear blending means the scene is at a 50/50 color mix through the middle of every segment — the year reads as one long crossfade. Smoothstep (f²(3−2f)) has near-zero slope at both ends, so the scene sits close to each pure keyframe for a good portion of its segment and moves through the mix quickly. Four distinct seasons with transitions, rather than four transitions with no seasons.' },
      { q: 'Can I use this seasons tree in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the tree, keyframe table, and ScrollTrigger in a mount effect against a canvas ref; update the HUD season name through a ref since it changes during scrub. On cleanup kill the ScrollTrigger, dispose trunk, branch, puff, ground, and flake geometries/materials, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to design a keyframe interpolation system from scratch — this snippet is one, in about thirty lines. Paste its HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the segment/fraction indexing, why smoothstep creates distinct seasons, or how winter works as a scale keyframe. The same assistant can grow the scene — a second smaller tree with offset timing, keyframed fog for autumn mist, day-night as a second orthogonal keyframe track blended with the seasons, birds that appear only in the spring and summer segments, or your brand's palette swapped into the K table in one pass. It can also refactor the keyframe walker into a reusable function you feed any property table. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven four seasons tree" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), ambient light, and one DirectionalLight sun whose color AND intensity will be keyframed.
- A low-poly tree: cylinder trunk, ~6 tilted cylinder branches placed around it with seeded randomness (sin-hash, no Math.random), and ~90 icosahedron foliage puffs distributed through the crown using a cube-root radial distribution for even sphere filling.
- A CircleGeometry ground disc whose color is keyframed with the seasons.
- A keyframe array of FIVE season states (spring, summer, autumn, winter, spring again for wraparound), each holding: sky color, ground color, leaf color, light color, light intensity, foliage scale (winter ≈ 0.12 so branches bare out), particle color, particle opacity (summer = 0), a season name, and a HUD accent color.
- One GSAP tween (ease "none") scrubbing year progress 0→1 on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=500%.
- Each frame: seg = p × 4, take keyframes K[floor(seg)] and K[floor(seg)+1], blend fraction = smoothstep(frac(seg)), and lerp EVERY property — scene.background, ground color, sun color/intensity, puff color and scale, particle color/opacity. No season logic outside the table.
- One recycled 400-point particle system falling from sky to ground and wrapping, with per-particle seeded speed and sway — it must read as blossoms (pink), leaf-fall (orange), and snow (white) purely through the keyframed color/opacity.
- Puffs breathe ±3% on clock time with per-puff phase; camera orbits just over half a turn across the scroll at radius ~30, lookAt the crown.
- A HUD showing the nearer keyframe's season name and accent color, and an intro overlay fading at p > 0.02.
- Confirm reverse scrolling runs the year backwards — snow lifting, leaves reattaching — with no one-shot events.`,
    },
  },
};

export default threeScrollSeasonsTree;