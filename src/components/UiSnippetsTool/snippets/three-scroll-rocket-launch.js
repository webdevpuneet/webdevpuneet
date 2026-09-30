const threeScrollRocketLaunch = {
  id: 'three-scroll-rocket-launch',
  title: 'Three.js Scroll Rocket Launch Sequence',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="rkt-stage" id="rktStage">
  <div class="rkt-intro"><p>Scroll ↓ to launch</p></div>
  <canvas id="rktCanvas"></canvas>
  <div class="rkt-hud">ALT <span id="rktAlt">0.0</span> KM · <span id="rktPhase">PRE-LAUNCH</span></div>
</section>
<section class="rkt-bottom"><p>Orbit insertion nominal.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a1120;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.rkt-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7f93b8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;background:#02040c}
.rkt-stage{height:100vh;position:relative;overflow:hidden;background:#0a1120}
.rkt-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#cfe0ff;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#rktCanvas{display:block;width:100%;height:100%}
.rkt-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#fb923c;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('rktCanvas');
const altEl = document.getElementById('rktAlt');
const phaseEl = document.getElementById('rktPhase');
const introEl = document.querySelector('.rkt-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
// Sky gradient handled by scroll: dawn blue → deep space.
const SKY0 = new THREE.Color(0x2a4a7a), SKY1 = new THREE.Color(0x01020a);
scene.background = SKY0.clone();
scene.fog = new THREE.Fog(0x2a4a7a, 60, 220);
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 600);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const sun = new THREE.DirectionalLight(0xffe8c8, 1.1);
sun.position.set(-40, 30, 30);
scene.add(sun);
const engineGlow = new THREE.PointLight(0xff9a3c, 0, 40);
scene.add(engineGlow);

// Launch pad ground + tower, left behind as the rocket climbs.
const ground = new THREE.Mesh(
  new THREE.CylinderGeometry(80, 80, 2, 48),
  new THREE.MeshLambertMaterial({ color: 0x24354f })
);
ground.position.y = -1;
scene.add(ground);
const tower = new THREE.Mesh(
  new THREE.BoxGeometry(2, 26, 2),
  new THREE.MeshLambertMaterial({ color: 0x374b66 })
);
tower.position.set(6, 13, 0);
scene.add(tower);

// The rocket: booster stage + upper stage + capsule + fins, grouped so
// stage separation can split the hierarchy mid-flight.
const rocket = new THREE.Group();
scene.add(rocket);
const white = new THREE.MeshStandardMaterial({ color: 0xe8ecf2, roughness: 0.4, metalness: 0.3 });
const dark = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5, metalness: 0.5 });

const booster = new THREE.Group();
const boosterBody = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 12, 24), white);
boosterBody.position.y = 6;
booster.add(boosterBody);
for (let i = 0; i < 4; i++) {
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.4, 2.2), dark);
  const a = (i / 4) * Math.PI * 2;
  fin.position.set(Math.cos(a) * 1.9, 1.6, Math.sin(a) * 1.9);
  fin.rotation.y = -a;
  booster.add(fin);
}
const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.25, 1.4, 24), dark);
nozzle.position.y = -0.6;
booster.add(nozzle);
rocket.add(booster);

const upper = new THREE.Group();
const upperBody = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 5.5, 24), white);
upperBody.position.y = 14.75;
upper.add(upperBody);
const capsule = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3.2, 24), dark);
capsule.position.y = 19.1;
upper.add(capsule);
rocket.add(upper);

// Exhaust: recycled particles pushed down from the active nozzle; their
// spawn rate scales with thrust so the plume dies at MECO.
const EX = 500;
const exGeo = new THREE.BufferGeometry();
const exPos = new Float32Array(EX * 3);
const exLife = new Float32Array(EX);
for (let i = 0; i < EX; i++) { exLife[i] = Math.random(); exPos[i * 3 + 1] = -9999; }
exGeo.setAttribute('position', new THREE.BufferAttribute(exPos, 3));
const exhaust = new THREE.Points(exGeo, new THREE.PointsMaterial({
  color: 0xffb35c, size: 0.85, transparent: true, opacity: 0.9,
  blending: THREE.AdditiveBlending, depthWrite: false,
}));
scene.add(exhaust);

// Stars fade in as the sky darkens.
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(900 * 3);
for (let i = 0; i < 900; i++) {
  starPos[i * 3] = (Math.random() - 0.5) * 500;
  starPos[i * 3 + 1] = 60 + Math.random() * 400;
  starPos[i * 3 + 2] = (Math.random() - 0.5) * 500;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
  color: 0xdde6ff, size: 0.9, transparent: true, opacity: 0, sizeAttenuation: true,
}));
scene.add(stars);

gsap.registerPlugin(ScrollTrigger);
const flight = { p: 0 };
gsap.to(flight, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#rktStage', start: 'top top', end: '+=500%', scrub: 0.5, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Flight profile phases (fractions of scroll):
// 0–0.08 ignition rumble · 0.08–0.55 boost · 0.55–0.62 separation
// 0.62–1 upper-stage climb to orbit.
const SEP = 0.58;
const clock = new THREE.Clock();
const skyTmp = new THREE.Color();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const p = flight.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  // Altitude: quadratic in p so the climb accelerates like a real ascent.
  const alt = Math.max(0, (p - 0.08) / 0.92);
  const y = alt * alt * 190;
  rocket.position.y = y;

  // Ignition rumble before liftoff.
  const rumble = (p > 0.02 && p < 0.1) ? Math.sin(t * 60) * 0.06 * ((p - 0.02) / 0.08) : 0;
  rocket.position.x = rumble;

  // Stage separation: after SEP the booster stops tracking the rocket
  // group's climb and falls away with tumble.
  const sep = Math.max(0, (p - SEP) / (1 - SEP));
  if (sep > 0) {
    booster.position.y = -sep * sep * 150;
    booster.position.x = -sep * 22;
    booster.rotation.z = sep * 1.8;
  } else {
    booster.position.set(0, 0, 0);
    booster.rotation.z = 0;
  }

  // Thrust: full during boost, brief gap at separation, upper stage relights.
  const thrust = p < 0.06 ? 0 : (p < SEP ? 1 : (p < SEP + 0.05 ? 0.1 : 0.75));
  engineGlow.intensity = thrust * (2.2 + Math.sin(t * 40) * 0.5);
  // The active nozzle: booster bottom before sep, upper stage bottom after.
  const nozzleY = p < SEP ? y - 0.6 : y + 12 - 0.5;
  engineGlow.position.set(rumble, nozzleY - 1.5, 0);

  const ep = exhaust.geometry.attributes.position;
  for (let i = 0; i < EX; i++) {
    exLife[i] += 0.025 + (i % 7) * 0.004;
    if (exLife[i] > 1) {
      exLife[i] = 0;
      if (thrust > 0.15) {
        ep.array[i * 3] = rumble + (Math.random() - 0.5) * 0.7;
        ep.array[i * 3 + 1] = nozzleY;
        ep.array[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
      } else {
        ep.array[i * 3 + 1] = -9999;
      }
    } else if (ep.array[i * 3 + 1] > -999) {
      ep.array[i * 3 + 1] -= 1.1 + exLife[i] * 1.6;
      ep.array[i * 3] += (Math.random() - 0.5) * 0.3;
      ep.array[i * 3 + 2] += (Math.random() - 0.5) * 0.3;
    }
  }
  ep.needsUpdate = true;
  exhaust.material.opacity = 0.25 + thrust * 0.65;

  // Sky darkens with altitude; stars and fog respond in lockstep.
  const dark01 = Math.min(1, y / 130);
  skyTmp.copy(SKY0).lerp(SKY1, dark01);
  scene.background.copy(skyTmp);
  scene.fog.color.copy(skyTmp);
  stars.material.opacity = Math.max(0, dark01 - 0.35) * 1.4;

  // Chase camera: below-looking-up at the pad, pulling alongside in
  // flight, settling behind the upper stage near orbit.
  const camY = 6 + y * 0.96 + dark01 * 6;
  const camDist = 26 - Math.min(1, p * 2) * 6 + dark01 * 8;
  const ang = 0.5 + p * 1.1;
  camera.position.set(Math.sin(ang) * camDist, camY, Math.cos(ang) * camDist);
  camera.lookAt(rumble, y + (p < SEP ? 8 : 15), 0);

  altEl.textContent = (y * 0.55).toFixed(1);
  phaseEl.textContent = p < 0.08 ? 'PRE-LAUNCH' : (p < SEP ? 'BOOST' : (p < SEP + 0.05 ? 'STAGE SEP' : 'ORBIT BURN'));
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Rocket Launch — Stage Separation Scrub',
    description: 'Scroll flies a two-stage rocket from ignition rumble through booster separation to orbit as the sky fades to stars. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Rocket Launch With Stage Separation in Three.js',
      description: `The **Three.js Scroll Rocket Launch Sequence** snippet flies a two-stage rocket from a rumbling launch pad to orbit in one scroll: ignition shake, an accelerating boost climb, booster separation with a tumbling fall-away, an upper-stage relight, and a sky that darkens from dawn blue to starfield black as altitude accrues. GSAP's ScrollTrigger scrubs one flight value; a phase table carves it into the mission timeline.

**A mission profile, not an animation timeline**

The scroll is divided the way real launches are: pre-launch below 8%, boost to 58%, a five-point separation window, then the orbit burn. Each frame classifies the scrubbed value against these fractions and derives phase-specific behavior — rumble amplitude, thrust level, which nozzle emits, HUD phase text. Because classification happens per frame from one value (rather than chained tweens firing), scrubbing backwards flies the mission in reverse: the booster re-attaches, the sky re-lightens, the rumble returns. The quadratic altitude curve \`alt² × 190\` makes the climb accelerate like a vehicle burning off mass, opposite to the braking curve of the [planet approach](/ui-snippets/three-scroll-planet-approach/).

**Stage separation via group hierarchy**

The rocket is a \`Group\` containing two child groups — booster and upper stage. Before separation both inherit the parent's climb; after it, the booster's *local* position and rotation animate away (falling on its own quadratic, drifting sideways, tumbling 1.8 radians) while the parent group keeps climbing with the upper stage. No re-parenting, no world-matrix surgery: the separation is two local transforms diverging inside one hierarchy, the same leverage the [exploded view](/ui-snippets/three-scroll-exploded-view/) uses for its chips.

**Exhaust with lifetimes, gated by thrust**

The plume is 500 recycled particles, each with a life value that wraps at 1. On rebirth, a particle respawns at the *currently active* nozzle — booster bottom before separation, upper-stage bottom after — but only if thrust exceeds 0.15; otherwise it parks at y = −9999. This spawn-gating means the plume naturally dies during the separation coast and re-ignites for the orbit burn, with no particle-system on/off switch: the thrust scalar is the only control. A flickering point light at the nozzle (intensity \`thrust × (2.2 + sin(40t) × 0.5)\`) lights nearby geometry with engine glow.

**Sky-to-space is one lerp driving three systems**

Altitude normalizes into a darkness value that simultaneously lerps the background color, re-colors the fog to match (the halo-avoidance rule from the [ocean dive](/ui-snippets/three-scroll-ocean-dive/)), and fades in a 900-point starfield that only becomes visible past 35% darkness. One derived scalar keeps the three systems in perfect sync — no way for stars to appear in a blue sky.

**A chase camera with phase awareness**

The camera reads like launch coverage: low and looking up at the pad, pulling alongside during boost (its Y tracks 96% of rocket altitude so the vehicle slowly outruns it), then drifting wider and higher as space arrives. Its look-at target switches from the booster's midsection to the upper stage after separation, keeping the active vehicle framed while the spent booster tumbles out of shot. The ignition rumble is a 60 Hz sine on the rocket's X position, amplitude-enveloped by the pre-launch window — a cheap, effective shake that also feeds the exhaust spawn origin. For the descent-flavored sibling of this scene, see the [staircase climb](/ui-snippets/three-scroll-staircase-climb/); for city-scale flyover framing, the [city flyover](/ui-snippets/three-scroll-city-flyover/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A white two-stage rocket stands beside its tower under a dawn sky, HUD reading ALT 0.0 KM · PRE-LAUNCH.' },
        { title: 'Scroll to ignite', text: 'The vehicle shakes with a 60 Hz rumble, the plume lights, and liftoff begins — altitude climbing on an accelerating curve.' },
        { title: 'Watch separation at 58%', text: 'The booster tumbles away trailing nothing while the upper stage coasts briefly, then relights for the orbit burn.' },
        { title: 'Reach orbit', text: 'The sky completes its fade to black, stars at full strength, HUD reading ORBIT BURN as the camera settles wide.' },
        { title: 'Re-profile the mission', text: 'Adjust SEP and the phase fractions, the alt² × 190 climb curve, or the thrust table to fly a different vehicle.' },
      ],
    },
    features: [
      'Mission-profile phase table: pre-launch, boost, stage sep, orbit burn — classified per frame from one scrubbed value',
      'Stage separation through group hierarchy: booster diverges locally while the parent keeps climbing — no re-parenting',
      'Thrust-gated exhaust: 500 lifetime-recycled particles that die at MECO and relight for the second burn automatically',
      'Exhaust respawns at whichever nozzle is active — booster before separation, upper stage after',
      'Quadratic altitude curve so the climb accelerates like a vehicle burning off mass',
      'One darkness scalar lerps sky, fog, and star opacity in lockstep — stars cannot appear in blue sky',
      'Ignition rumble: 60 Hz sine on X, amplitude-enveloped by the pre-launch window',
      'Phase-aware chase camera that switches its framing target at separation',
    ],
    useCases: [
      { icon: 'WEB', title: 'Aerospace and launch-provider sites', desc: 'The obvious literal fit — annotate each phase with mission copy pinned via [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'ANIM', title: 'Startup "launch" landing pages', desc: 'Product launches get the metaphor at full fidelity: countdown, liftoff, stage sep as feature tiers, orbit as the CTA.' },
      { icon: 'GAME', title: 'Space sim and strategy game promos', desc: 'Kerbal-adjacent games can preview ascent mechanics; hand off to the [black hole approach](/ui-snippets/three-scroll-black-hole/) for late-game stakes.' },
      { icon: 'LEARN', title: 'Teaching phase-based scrub design', desc: 'A compact study in carving one scrubbed value into mission phases with per-phase behavior — reusable for any multi-act sequence.' },
      { icon: 'DESIGN', title: 'Portfolio hero with vertical momentum', desc: 'The climb-and-darken arc gives personal sites a punchy opening that resolves into a calm starfield for content below.' },
      { icon: 'DATA', title: 'Milestone and funding storytelling', desc: 'Map boost to growth metrics and separation to a pivot — the altitude HUD doubles as a counter like the [animated stat row](/ui-snippets/animated-stat-row/).' },
    ],
    faqs: [
      { q: 'How does stage separation work without re-parenting the booster?', a: 'The rocket Group contains booster and upper-stage child groups. Both inherit the parent\'s climb, so before separation their local transforms are identity. After p crosses SEP, the booster\'s LOCAL position and rotation animate away — falling on its own quadratic, drifting sideways, tumbling — while the parent keeps rising. World position = parent climb + local divergence, so the fall-away is automatic and perfectly reversible when scrolling back.' },
      { q: 'How does the exhaust plume know when to cut off and relight?', a: 'Each particle has a lifetime that wraps at 1. On wrap it respawns at the active nozzle only if the thrust scalar exceeds 0.15; otherwise it parks off-screen at y = −9999. Thrust is derived per frame from the phase table (1 during boost, 0.1 during the separation coast, 0.75 for the orbit burn), so the plume dies and relights purely as a consequence of thrust — there is no explicit particle-system toggle anywhere.' },
      { q: 'Why do the sky, fog, and stars never get out of sync?', a: 'All three consume one derived scalar: dark01 = min(1, altitude / 130). The background lerps dawn-blue to space-black by it, the fog color copies the same lerped color (so distant geometry dissolves correctly at every altitude), and star opacity is max(0, dark01 − 0.35) × 1.4, keeping stars invisible until the sky is ~35% dark. One input, three outputs — desynchronization is structurally impossible.' },
      { q: 'What creates the ignition rumble?', a: 'A 60 Hz sine on the rocket\'s X position — sin(t × 60) × 0.06 — multiplied by an envelope that ramps in across the 2%–10% scroll window and is zero elsewhere. The exhaust spawn origin and engine light follow the same offset, so the whole vehicle-plus-plume assembly shakes as one. It reads as engines straining against hold-downs at a cost of one line.' },
      { q: 'Can I use this rocket launch in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the rocket hierarchy, particles, and ScrollTrigger in a mount effect against a canvas ref; update the two HUD spans through refs since they change per frame. On cleanup kill the ScrollTrigger, dispose all geometries and materials (booster, upper stage, exhaust, stars, ground, tower), and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to storyboard a launch from scratch — the mission profile is already a phase table you can edit. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the group-hierarchy separation trick, the thrust-gated particle respawn, or the single darkness scalar syncing sky, fog, and stars. The same assistant can extend the mission — a launch tower that retracts its arm at ignition, a max-Q condensation ring at a set altitude, fairing halves that jettison after separation using the same local-divergence pattern, a second booster for a side-core configuration, or a countdown overlay that ticks with early scroll. It can also re-tune the phase fractions so separation lands exactly on your page's key message. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven two-stage rocket launch" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), ambient + warm directional light, a wide ground cylinder, and a launch tower box beside the pad.
- A rocket as a Group containing TWO child groups: a booster (cylinder body, 4 fins, nozzle) and an upper stage (cylinder + cone capsule). White MeshStandardMaterial bodies with dark accents.
- One GSAP tween (ease "none") scrubbing p 0→1 on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=500%.
- A mission phase table applied per frame: pre-launch below 0.08 (60 Hz X-rumble with a ramp-in envelope), boost to SEP = 0.58, a 0.05-wide separation coast, then orbit burn. Derive thrust per phase: 0 → 1 → 0.1 → 0.75.
- Altitude = ((p − 0.08) / 0.92)² × 190 clamped at 0, applied to the rocket group — an ACCELERATING climb.
- Stage separation WITHOUT re-parenting: after SEP the booster's LOCAL transform diverges (its own downward quadratic, sideways drift, ~1.8 rad tumble) while the parent group keeps climbing with the upper stage; before SEP its local transform resets to identity so reverse scroll re-attaches it.
- Exhaust: 500 particles with wrapping lifetimes; on wrap, respawn at the ACTIVE nozzle (booster bottom before SEP, upper-stage bottom after) only when thrust > 0.15, else park at y = −9999. Additive blending, plus a flickering PointLight at the nozzle scaled by thrust.
- One darkness scalar dark01 = min(1, altitude/130) lerping the sky background dawn-blue → black, copying the same color into the fog, and fading in a 900-point starfield only past 0.35.
- A chase camera: low and looking up pre-launch, tracking ~96% of altitude alongside during boost, widening in space; its lookAt target switches from booster midsection to upper stage at SEP.
- A HUD with live altitude (scaled to km) and phase name (PRE-LAUNCH / BOOST / STAGE SEP / ORBIT BURN); intro overlay fades at p > 0.02.
- Confirm reverse scrolling flies the mission backwards, booster re-attaching and sky re-lightening.`,
    },
  },
};

export default threeScrollRocketLaunch;