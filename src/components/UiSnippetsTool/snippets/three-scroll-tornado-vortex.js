const threeScrollTornadoVortex = {
  id: 'three-scroll-tornado-vortex',
  title: 'Three.js Scroll Tornado Vortex',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="tor-stage" id="torStage">
  <div class="tor-intro"><p>Scroll ↓ to summon the vortex</p></div>
  <canvas id="torCanvas"></canvas>
  <div class="tor-hud">INTENSITY <span id="torPct">0</span>%</div>
</section>
<section class="tor-bottom"><p>The storm has passed.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0e1013;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.tor-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8d99a8;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.tor-stage{height:100vh;position:relative;overflow:hidden;background:#0e1013}
.tor-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8d99a8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#torCanvas{display:block;width:100%;height:100%}
.tor-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#7dd3fc;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('torCanvas');
const pctEl = document.getElementById('torPct');
const introEl = document.querySelector('.tor-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1013);
scene.fog = new THREE.FogExp2(0x0e1013, 0.014);
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);

scene.add(new THREE.AmbientLight(0x8899bb, 0.7));
const storm = new THREE.PointLight(0x9ad7ff, 0.9, 120);
storm.position.set(0, 26, 0);
scene.add(storm);

// Cracked-earth ground.
const ground = new THREE.Mesh(
  new THREE.CircleGeometry(70, 64),
  new THREE.MeshLambertMaterial({ color: 0x1a1e26 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

function rand(seed) {
  const x = Math.sin(seed * 137.3 + 17.7) * 31743.7719;
  return x - Math.floor(x);
}

// Every particle stores polar-coordinate parameters, not positions. Each
// frame computes position from (height, phase, radius jitter) + intensity,
// so the funnel is a pure function of scroll and clock — no forces.
const COUNT = 2600;
const geo = new THREE.BufferGeometry();
const positions = new Float32Array(COUNT * 3);
geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const parts = [];
for (let i = 0; i < COUNT; i++) {
  parts.push({
    h: rand(i) ,                    // 0–1 height fraction in the funnel
    phase: rand(i + 1e4) * Math.PI * 2,
    jitter: 0.6 + rand(i + 2e4) * 0.9,
    speed: 0.7 + rand(i + 3e4) * 1.1,
    // Scattered rest position on the ground for intensity = 0.
    rx: (rand(i + 4e4) - 0.5) * 90,
    rz: (rand(i + 5e4) - 0.5) * 90,
  });
}
const points = new THREE.Points(geo, new THREE.PointsMaterial({
  color: 0xaebfd4, size: 0.42, transparent: true, opacity: 0.85, sizeAttenuation: true,
}));
scene.add(points);

// A few larger debris chunks that only join the vortex at high intensity.
const debris = [];
for (let i = 0; i < 12; i++) {
  const d = new THREE.Mesh(
    new THREE.BoxGeometry(0.7 + rand(i + 9e4) * 0.9, 0.5, 0.7),
    new THREE.MeshLambertMaterial({ color: 0x39424f })
  );
  d.position.set((rand(i + 6e4) - 0.5) * 60, 0.4, (rand(i + 7e4) - 0.5) * 60);
  scene.add(d);
  debris.push({ m: d, rest: d.position.clone(), phase: rand(i + 8e4) * Math.PI * 2, h: 0.1 + rand(i) * 0.75 });
}

const FUNNEL_H = 30;
// Funnel radius by height: narrow at the ground, wide at the top.
function funnelRadius(hFrac) { return 1.2 + Math.pow(hFrac, 1.6) * 14; }

gsap.registerPlugin(ScrollTrigger);
// Intensity ramps 0→1 across the first 70% of scroll, holds, then the
// last 15% disperses the storm again for an arc with an ending.
const st = { p: 0 };
gsap.to(st, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#torStage', start: 'top top', end: '+=450%', scrub: 0.5, pin: true },
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
  const p = st.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  const intensity = p < 0.7 ? Math.min(1, p / 0.7) : (p < 0.85 ? 1 : Math.max(0, 1 - (p - 0.85) / 0.15));
  const ease = intensity * intensity * (3 - 2 * intensity); // smoothstep

  // The funnel core wanders so the tornado stalks the plain.
  const coreX = Math.sin(t * 0.22) * 6 * ease;
  const coreZ = Math.cos(t * 0.17) * 6 * ease;

  for (let i = 0; i < COUNT; i++) {
    const pt = parts[i];
    const y = pt.h * FUNNEL_H * ease + 0.15;
    const r = funnelRadius(pt.h) * pt.jitter;
    const a = pt.phase + t * (2.2 + (1 - pt.h) * 3.2) * pt.speed * (0.15 + ease);
    // Lerp between scattered rest position and funnel position by ease.
    const fx = coreX + Math.cos(a) * r, fz = coreZ + Math.sin(a) * r;
    positions[i * 3] = pt.rx + (fx - pt.rx) * ease;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = pt.rz + (fz - pt.rz) * ease;
  }
  geo.attributes.position.needsUpdate = true;

  debris.forEach((d) => {
    // Debris needs intensity > 0.5 before lift-off; below that it trembles.
    const lift = Math.max(0, (ease - 0.5) * 2);
    const a = d.phase + t * 2.6;
    const r = funnelRadius(d.h) * 0.85;
    const fx = coreX + Math.cos(a) * r, fz = coreZ + Math.sin(a) * r;
    d.m.position.x = d.rest.x + (fx - d.rest.x) * lift + Math.sin(t * 18 + d.phase) * 0.05 * ease * (1 - lift);
    d.m.position.y = 0.4 + d.h * FUNNEL_H * lift;
    d.m.position.z = d.rest.z + (fz - d.rest.z) * lift;
    d.m.rotation.x += 0.03 * lift; d.m.rotation.y += 0.05 * lift;
  });

  storm.intensity = 0.5 + ease * 1.4 + Math.sin(t * 7) * 0.15 * ease;
  const ang = t * 0.07 + p * 1.2;
  camera.position.set(Math.sin(ang) * (40 - ease * 10), 12 + ease * 6, Math.cos(ang) * (40 - ease * 10));
  camera.lookAt(coreX, 8 * ease + 2, coreZ);

  pctEl.textContent = Math.round(intensity * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Tornado Vortex — GSAP Particle Funnel',
    description: 'Scroll gathers 2,600 ground particles into a wandering tornado funnel with debris lift-off and dispersal arc. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Tornado Vortex With Three.js and GSAP',
      description: `The **Three.js Scroll Tornado Vortex** snippet gathers 2,600 dust particles scattered across a dark plain into a spinning, wandering tornado funnel as the user scrolls — complete with tumbling debris that lifts off only once the storm passes half strength, and a dispersal phase that lets the storm die at the end of the scroll. GSAP's ScrollTrigger scrubs one intensity value; the funnel itself is pure parametric math evaluated per frame.

**Particles store parameters, not positions**

The core design decision: no particle stores its position, velocity, or any integrated state. Each stores five permanent parameters — a height fraction in the funnel, an orbital phase, a radius jitter, a speed multiplier, and a scattered rest position on the ground — all generated by the seeded \`sin\`-hash used throughout this series (see the [Rubik's cube assembly](/ui-snippets/three-scroll-rubiks-assemble/)). Every frame computes each particle's funnel position from those parameters plus clock time, then lerps between rest position and funnel position by eased intensity. The tornado is therefore a pure function of scroll and clock: scrub to any point and the storm is exactly what it should be, with no simulation to diverge or explode.

**The funnel profile is one function**

The tornado's silhouette lives in a single line: \`funnelRadius(h) = 1.2 + h^1.6 × 14\` — narrow at the ground, flaring wide at the top, with the 1.6 exponent controlling how "stalky" the profile looks. Angular speed also varies by height, \`2.2 + (1 − h) × 3.2\`, so the base spins visibly faster than the crown, matching how real vortices conserve angular momentum as radius shrinks. Changing two numbers redesigns the storm.

**An intensity arc with an ending**

Rather than mapping scroll linearly to strength, intensity ramps 0→1 across the first 70% of scroll, holds full force through 85%, then falls back to zero over the final 15% — so the storm has a narrative arc: gathering, rampage, dispersal. The raw intensity passes through a smoothstep (\`i² × (3 − 2i)\`) before use, removing the velocity discontinuities at the ramp boundaries. The funnel core also wanders the plain on slow sine paths scaled by intensity, so a strong storm stalks while a weak one stays put — and the camera's look-at target tracks the wandering core.

**Debris with a lift-off threshold**

Twelve box-geometry debris chunks behave differently from dust: below intensity 0.5 they only tremble in place (a high-frequency positional shiver scaled by \`1 − lift\`), and only above it do they lerp from their rest spots into the funnel's rotation, tumbling with accumulating rotation. That threshold creates the storm's most legible beat — the moment the ground itself starts coming apart — and demonstrates how one scrubbed value can gate qualitatively different behaviors, the way the [voxel build](/ui-snippets/three-scroll-voxel-build/) gates per-block slices.

**Atmosphere from light, fog, and camera**

A cold point light above the funnel flickers with a sine tremor scaled by intensity, standing in for internal lightning; \`FogExp2\` matched to the background swallows the plain's edge. The camera closes from 40 to 30 units and rises as the storm builds, on top of a slow permanent orbit — motion layering consistent with the rest of the series, like the [ocean dive](/ui-snippets/three-scroll-ocean-dive/)'s sway. For a calmer take on scroll-gathered particles, compare the [particle assembly](/ui-snippets/three-scroll-particle-assembly/) snippet, which pulls points into a shape instead of a storm.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A pinned dark plain shows dust scattered flat on the ground, debris chunks at rest, and an INTENSITY 0% HUD.' },
        { title: 'Scroll to gather the storm', text: 'Dust spirals up into a funnel — narrow at the base, flaring at the crown — while the core begins to wander the plain.' },
        { title: 'Cross half intensity', text: 'Debris chunks stop trembling and lift off into the rotation, tumbling as the internal lightning flickers harder.' },
        { title: 'Ride out the arc', text: 'The storm holds full force through 85% of the scroll, then disperses — particles settle back to their exact rest spots.' },
        { title: 'Redesign the storm', text: 'Edit funnelRadius() and the height-speed formula to reshape the silhouette and spin profile; raise COUNT if your audience runs desktop GPUs.' },
      ],
    },
    features: [
      'Stateless particle design: 2,600 particles store parameters, positions are computed fresh each frame',
      'Funnel silhouette from one function — radius = 1.2 + h^1.6 × 14 — narrow base, flaring crown',
      'Height-dependent spin (faster at the base) echoing angular-momentum behavior of real vortices',
      'Intensity arc with a narrative: ramp to 70%, hold to 85%, disperse to 100% of scroll',
      'Smoothstep applied to intensity removes velocity discontinuities at phase boundaries',
      'Wandering funnel core on intensity-scaled sine paths, tracked by the camera look-at',
      'Debris lift-off threshold at intensity 0.5 — trembling below, tumbling orbit above',
      'Flickering internal storm light and FogExp2 matched to the background for atmosphere',
    ],
    useCases: [
      { icon: 'WEB', title: 'Weather and climate-tech products', desc: 'A storm you can scrub is a natural hero for forecasting APIs and climate-risk platforms; annotate intensity stages with pinned copy via [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'GAME', title: 'Disaster and survival game promos', desc: 'The debris lift-off beat lands as a gameplay tease; hand off to a [scroll camera path](/ui-snippets/three-scroll-camera-path/) for level flythroughs.' },
      { icon: 'ANIM', title: '"Disruption" brand narratives', desc: 'Gather → rampage → disperse maps to market-disruption storytelling, with the calm ending letting your product be what remains.' },
      { icon: 'LEARN', title: 'Teaching stateless particle systems', desc: 'A strong counter-example to force integration: everything reads as physics, yet no state is integrated and the scrub can never diverge.' },
      { icon: 'ART', title: 'Generative art and music pages', desc: 'Bind intensity to audio amplitude instead of scroll for a storm that dances, cousin to the [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/).' },
      { icon: 'DESIGN', title: 'Dramatic section transitions', desc: 'Use the dispersal ending as a wipe into the next section, the stormy sibling of the [curtain reveal](/ui-snippets/scroll-curtain-reveal/).' },
    ],
    faqs: [
      { q: 'Why do particles store parameters instead of positions and velocities?', a: 'Integrated state (position += velocity) breaks under scrubbing: fast scrolls skip frames, reverse scrolls would need inverse forces, and error accumulates. Storing permanent parameters (height fraction, phase, jitter, speed, rest position) and computing position fresh each frame from parameters + intensity + clock makes the storm a pure function — any scroll position yields an exact, repeatable configuration, forwards or backwards.' },
      { q: 'How does the funnel get its tornado silhouette?', a: 'One function: funnelRadius(h) = 1.2 + h^1.6 × 14, where h is the particle\'s height fraction. The 1.2 floor keeps a visible core at the ground, the exponent 1.6 makes radius grow slowly near the base then flare toward the crown. Multiply by each particle\'s jitter factor so the wall has thickness instead of being a perfect surface of revolution.' },
      { q: 'What makes the debris behave differently from the dust?', a: 'Debris computes lift = max(0, (intensity − 0.5) × 2): zero below half strength, ramping to one at full. Below the threshold, chunks only get a high-frequency positional shiver (scaled by 1 − lift) so they tremble; above it they lerp from rest into a funnel orbit and accumulate tumble rotation. One scrubbed value gates two qualitatively different behaviors.' },
      { q: 'Why does intensity ramp, hold, and then fall instead of tracking scroll linearly?', a: 'A linear map means the storm is strongest exactly at the last pixel of scroll, which feels unfinished — the user leaves mid-rampage. The 70/15/15 arc gives the sequence an ending: dust settles back to its exact rest spots (the lerp target at intensity 0), so the pinned section closes on calm and hands off cleanly to the content below.' },
      { q: 'Can I use this tornado vortex in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the particle arrays and ScrollTrigger inside a mount effect against a canvas ref. The Float32Array and parts array should live in the effect scope, not state. On cleanup kill the ScrollTrigger, dispose the points geometry/material and each debris mesh, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to invent stateless vortex math. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why positions are computed rather than integrated, how the funnel profile function shapes the silhouette, or how the debris threshold gates lift-off. The same assistant can push the storm further — a second counter-rotating outer particle shell, ground dust rings that ripple outward from the wandering core, color grading the dust darker as intensity rises, or replacing scroll with microphone amplitude so the storm reacts to sound. If you need more particles, ask it to move the per-particle math into a custom ShaderMaterial vertex shader with intensity as a uniform. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven tornado vortex" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on resize), cool ambient light, a PointLight above the funnel, a dark CircleGeometry ground, and FogExp2 matched to the background.
- ~2,600 particles in one THREE.Points with a position BufferAttribute. Each particle stores ONLY permanent parameters from a seeded sin-hash (no Math.random): height fraction, orbital phase, radius jitter, speed multiplier, and a scattered ground rest position. No stored velocities.
- One GSAP tween (ease "none") scrubbing p 0→1 on a ScrollTrigger with pin: true and end ~+=450%.
- Derive intensity with an arc: ramp 0→1 over p in [0, 0.7], hold 1 in [0.7, 0.85], fall to 0 in [0.85, 1]; pass it through smoothstep before use.
- Each frame compute every particle's funnel position: y = heightFrac × 30 × intensity; radius = (1.2 + heightFrac^1.6 × 14) × jitter; angle = phase + time × (2.2 + (1 − heightFrac) × 3.2) × speed × (0.15 + intensity); then LERP between rest position and funnel position by intensity. Funnel core (cx, cz) wanders on slow sine paths scaled by intensity.
- 12 BoxGeometry debris chunks with lift = max(0, (intensity − 0.5) × 2): below threshold they tremble in place with a high-frequency shiver, above it they lerp into a funnel orbit at 85% radius and accumulate tumble rotation.
- Storm light intensity flickers with a sine scaled by intensity; camera orbits slowly, closing from 40 to ~30 units and rising as the storm builds, lookAt tracking the wandering core.
- An INTENSITY % HUD from the derived intensity and an intro overlay fading at p > 0.02.
- Confirm scrolling back re-disperses every particle to its exact rest spot.`,
    },
  },
};

export default threeScrollTornadoVortex;