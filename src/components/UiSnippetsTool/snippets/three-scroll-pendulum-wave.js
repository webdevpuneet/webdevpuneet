const threeScrollPendulumWave = {
  id: 'three-scroll-pendulum-wave',
  title: 'Three.js Scroll Pendulum Wave',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pnd-stage" id="pndStage">
  <div class="pnd-intro"><p>Scroll ↓ to run the pendulum wave</p></div>
  <canvas id="pndCanvas"></canvas>
  <div class="pnd-hud">T = <span id="pndTime">0.0</span> S</div>
</section>
<section class="pnd-bottom"><p>Order, chaos, order again.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0d16;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.pnd-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7e89a8;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.pnd-stage{height:100vh;position:relative;overflow:hidden;background:#0a0d16}
.pnd-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#7e89a8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#pndCanvas{display:block;width:100%;height:100%}
.pnd-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#a78bfa;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('pndCanvas');
const timeEl = document.getElementById('pndTime');
const introEl = document.querySelector('.pnd-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0d16);
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const key = new THREE.DirectionalLight(0xffffff, 0.9);
key.position.set(10, 20, 15);
scene.add(key);

// Support beam the pendulums hang from.
const beam = new THREE.Mesh(
  new THREE.BoxGeometry(34, 0.8, 1.6),
  new THREE.MeshStandardMaterial({ color: 0x2a3145, roughness: 0.5, metalness: 0.6 })
);
beam.position.y = 12;
scene.add(beam);

// The classic demo: N pendulums whose oscillation counts over one cycle
// step 26, 27, 28... so they drift out of phase and realign at T = CYCLE.
const N = 15, CYCLE = 30, BASE_OSC = 26;
const pendulums = [];
for (let i = 0; i < N; i++) {
  const group = new THREE.Group();
  group.position.set(-14 + i * 2, 12, 0);
  const freq = (BASE_OSC + i) / CYCLE * Math.PI * 2; // rad/s
  // Longer strings for slower pendulums, matching real physics where
  // period grows with sqrt(length).
  const len = 9 * Math.pow((CYCLE / (BASE_OSC + i)) * BASE_OSC / CYCLE, 2) * (CYCLE * CYCLE) / (BASE_OSC * BASE_OSC) * 0.5 + 2.5;
  const wire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, len, 6),
    new THREE.MeshBasicMaterial({ color: 0x596585 })
  );
  wire.position.y = -len / 2;
  group.add(wire);
  const hue = i / N;
  const bobMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.62 + hue * 0.3, 0.75, 0.6),
    roughness: 0.25, metalness: 0.4,
    emissive: new THREE.Color().setHSL(0.62 + hue * 0.3, 0.75, 0.25),
  });
  const bob = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 32), bobMat);
  bob.position.y = -len;
  group.add(bob);
  scene.add(group);
  pendulums.push({ group, freq, bobMat, baseEm: bobMat.emissive.clone() });
}

gsap.registerPlugin(ScrollTrigger);
// Scroll scrubs simulated time itself: one full realignment cycle.
const sim = { t: 0 };
gsap.to(sim, {
  t: CYCLE,
  ease: 'none',
  scrollTrigger: { trigger: '#pndStage', start: 'top top', end: '+=500%', scrub: 0.4, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
const AMP = 0.55;
function animate() {
  requestAnimationFrame(animate);
  const rt = clock.getElapsedTime();
  const T = sim.t;
  if (introEl) introEl.style.opacity = T > 0.15 ? '0' : '1';

  pendulums.forEach((p, i) => {
    // Swing in the Z plane: angle = A · sin(ω·T). Simulated time comes
    // from the scrub, so scrolling backwards runs physics in reverse.
    const angle = AMP * Math.sin(p.freq * T);
    p.group.rotation.x = angle;
    // Bobs glow brightest at the swing extremes where they pause.
    const k = Math.abs(angle) / AMP;
    p.bobMat.emissiveIntensity = 0.4 + k * 1.1;
  });

  // Camera slides from a side profile (wave shape visible) to a front view
  // (phase pattern visible) across the cycle.
  const prog = T / CYCLE;
  const ang = 1.35 - prog * 1.2;
  camera.position.set(Math.sin(ang) * 26, 6 + Math.sin(rt * 0.25) * 0.6, Math.cos(ang) * 26);
  camera.lookAt(0, 5, 0);

  timeEl.textContent = T.toFixed(1);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Pendulum Wave — GSAP Physics Scrub',
    description: 'Scroll scrubs simulated time through a 15-pendulum wave — snakes, chaos, and realignment, reversible frame-perfect. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Scrubbed Pendulum Wave With Three.js and GSAP',
      description: `The **Three.js Scroll Pendulum Wave** snippet recreates the famous physics demonstration — fifteen pendulums of graduated frequency swinging from one beam, drifting from a perfect traveling wave into apparent chaos and snapping back into unison — with one twist: scroll position *is* time. GSAP's ScrollTrigger scrubs a simulated-time value from 0 to 30 seconds, so users can play the demonstration forward, pause at any instant, and run physics backwards, which no video of the real apparatus can do.

**The pendulum wave equation**

The classic apparatus works because pendulum \`i\` completes exactly \`26 + i\` oscillations in one shared cycle. This snippet encodes that directly: each pendulum's angular frequency is \`(26 + i) / 30 × 2π\` rad/s, and its swing angle at any instant is \`A × sin(ω × T)\`. At T = 0 all fifteen are in phase; small frequency differences accumulate into traveling snakes, then two interleaved groups swinging opposite ways, then apparent randomness — and at exactly T = 30 every phase difference is a whole multiple of 2π and the line snaps back together. None of this is choreographed; it falls out of fifteen sine evaluations per frame.

**Scrubbing time instead of animating it**

Because the swing angle is a closed-form function of T (no integration, no accumulated state), simulated time can jump anywhere without error: scroll fast and the wave fast-forwards, stop mid-scroll and it freezes at a physically exact configuration, scroll up and entropy visibly runs backwards into order. This is the deepest version of the derive-from-one-value pattern in this series — where the [gear train](/ui-snippets/three-scroll-gear-train/) scrubs an angle, this scrubs the independent variable of a physics equation. Any simulation expressible in closed form gets scrub-reversibility for free.

**Rotation about the pivot, not bob positioning**

Each pendulum is a \`Group\` positioned at the beam with the wire and bob as children hanging below the group origin. Setting \`group.rotation.x\` swings the entire assembly about the pivot — the wire tilts and the bob traces its arc automatically through the transform hierarchy, the same scene-graph leverage used by the chips in the [exploded view](/ui-snippets/three-scroll-exploded-view/). Computing bob arc positions by hand would need trigonometry per frame and would leave the wire pointing the wrong way.

**Emissive glow at the turning points**

Real pendulum bobs seem to hang at their extremes, where velocity crosses zero. To emphasize this, each bob's \`emissiveIntensity\` scales with \`|angle| / A\` — bobs glow brightest exactly where they pause. Since neighboring pendulums reach extremes at different instants, the glow sweeps along the line as its own secondary wave, making phase relationships readable even from the front view. Bob hues sweep a blue-to-magenta HSL range so each pendulum is identifiable across camera moves.

**A camera move that changes what you understand**

The pendulum wave looks completely different from different angles: side-on you see the swing amplitude; front-on you see the phase pattern — the snakes and interleaving groups. The camera slides 1.2 radians from profile toward front view across the cycle, so the scroll journey doubles as a lesson in why this demonstration is filmed from the end of the beam. A small clock-driven bob keeps the shot alive during scroll pauses, consistent with the idle-motion convention across this series, like the drifting clouds of the [planet approach](/ui-snippets/three-scroll-planet-approach/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'Fifteen pendulums hang motionless and aligned from a beam, viewed from the side, with a T = 0.0 S HUD.' },
        { title: 'Scroll to start time', text: 'The line swings as one, then a traveling snake forms as small frequency differences accumulate.' },
        { title: 'Pause anywhere', text: 'Stop scrolling and the system freezes at an exact instant — inspect the two interleaved counter-swinging groups around mid-cycle.' },
        { title: 'Scroll backwards', text: 'Physics runs in reverse: chaos reassembles into the traveling wave and back to unison, frame-perfect.' },
        { title: 'Retune the demonstration', text: 'Change N, CYCLE, or BASE_OSC — e.g. 20 pendulums over 40 s starting at 35 oscillations — and the wave patterns recompute automatically.' },
      ],
    },
    features: [
      'True pendulum-wave physics: pendulum i completes 26 + i oscillations per 30 s cycle, realigning exactly at cycle end',
      'Scroll scrubs simulated time — play, pause mid-swing, and run entropy backwards, impossible with the real apparatus',
      'Closed-form angles (A·sin(ωT)) mean zero accumulated state: time can jump anywhere without integration error',
      'Pivot-group rotation swings wire and bob together through the scene graph, no per-frame trigonometry for bob arcs',
      'Emissive intensity tied to |angle|/A makes bobs glow at their turning points, sweeping a secondary glow wave along the line',
      'HSL hue ramp across pendulums keeps each identifiable through camera moves',
      'Camera slides from side profile to front view — the two angles that reveal amplitude versus phase pattern',
      'Live simulated-time HUD driven by the same scrubbed value',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Physics teaching and STEM outreach pages', desc: 'The scrub turns a one-shot classroom demo into an explorable: students pause at the interleave point and reverse it, unlike any video.' },
      { icon: 'WEB', title: 'Science museum and planetarium sites', desc: 'A signature interactive for institutions whose real pendulum wave draws crowds — pair with a [scroll year timeline](/ui-snippets/scroll-year-timeline/) of exhibits.' },
      { icon: 'ANIM', title: 'Order-from-chaos brand storytelling', desc: 'The realignment moment is a ready-made metaphor for consultancies and data companies; land key copy exactly at T = 30.' },
      { icon: 'DESIGN', title: 'Ambient hero sections', desc: 'Even without the physics framing, fifteen glowing bobs tracing waves make a hypnotic backdrop, calmer than a [lightning orb](/ui-snippets/three-scroll-lightning-orb/).' },
      { icon: 'ART', title: 'Kinetic and generative art portfolios', desc: 'Present it as time-sculpture alongside pieces like the [wave ribbon](/ui-snippets/three-wave-ribbon/), with scroll as the exhibition control.' },
      { icon: 'DATA', title: 'Explaining periodicity and aliasing', desc: 'Analytics and signal-processing products can use the interleaved-groups moment to explain sampling and phase concretely.' },
    ],
    faqs: [
      { q: 'Why do the pendulums realign perfectly at the end of the cycle?', a: 'Each pendulum completes a whole number of oscillations in the shared 30-second cycle — 26 for the first, 27 for the next, and so on. At T = 30 every pendulum has finished its integer count, so every phase difference is a multiple of 2π and the line is exactly as it was at T = 0. The intermediate snakes and interleaved groups are just the fractional phase differences passing through simple ratios like 1/2 and 1/3.' },
      { q: 'Why can scroll scrub the physics without breaking it?', a: 'Because the swing angle is closed-form — angle = A·sin(ω·T) — there is no integrator carrying state from frame to frame. Any T gives an exact configuration, so jumping time around (which is what fast or reversed scrolling does) cannot accumulate error. A force-integrated simulation would need fixed timesteps and could not run backwards for free.' },
      { q: 'How do the wire and bob swing together?', a: 'Each pendulum is a Group whose origin sits at the pivot on the beam; the wire and bob are children positioned below it. Setting group.rotation.x rotates the whole assembly about the pivot, so the wire tilts and the bob follows its arc purely through the transform hierarchy — no per-frame trigonometry to place the bob, and the wire always points at it by construction.' },
      { q: 'What drives the glow moving along the line of bobs?', a: 'Each bob\'s emissiveIntensity is 0.4 + 1.1 × |angle| / A, peaking at the swing extremes where the pendulum momentarily pauses. Neighboring pendulums hit their extremes at slightly different times, so the brightness peak travels along the line as its own wave — a secondary visualization of the same phase relationships that create the position snakes.' },
      { q: 'Can I use this pendulum wave in React, Vue, or Angular?', a: 'Yes. Export with the JSX, Vue, Angular, or Tailwind buttons. Create the pendulum groups and ScrollTrigger in a mount effect against a canvas ref; keep sim.t in a plain object (not state) since it updates every scrubbed frame. On cleanup kill the ScrollTrigger, dispose wire and bob geometries and materials, and call renderer.dispose() so the pin and WebGL context release cleanly.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to rediscover why 26, 27, 28... oscillations per cycle produce snakes and realignment. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the phase mathematics, why closed-form angles make time scrubbing exact, or what happens if you change BASE_OSC. The same assistant can extend the demonstration — adding motion-blur trails by rendering bob positions at several recent T values with fading opacity, a slider that decouples from scroll for touch-free replay, damping that makes amplitude decay with T for realism, or labels that appear at notable instants (half-cycle interleave, third-cycle triplets). It can also retheme bob hues to a brand ramp. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-scrubbed pendulum wave" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), ambient plus directional light, and a metallic support beam (BoxGeometry) at the top.
- 15 pendulums hanging from the beam. Each is a THREE.Group with its origin AT the pivot: a thin CylinderGeometry wire child and a SphereGeometry bob child at the wire's end. Bob materials use an HSL hue ramp (blue → magenta) with an emissive component.
- Pendulum wave frequencies: pendulum i has angular frequency (26 + i) / 30 × 2π rad/s, so the line realigns exactly at T = 30. Slightly longer wires for slower pendulums.
- One GSAP tween (ease "none") scrubbing a SIMULATED TIME value from 0 to 30 on a ScrollTrigger with pin: true, scrub ~0.4, end ~+=500%.
- Each frame set group.rotation.x = 0.55 × sin(freq × T) per pendulum — closed form, no integration — and set emissiveIntensity = 0.4 + 1.1 × |angle| / 0.55 so bobs glow at their turning points.
- A camera that slides ~1.2 radians from a side profile toward a front view across the cycle (lookAt beam center), with a small clock-driven bob so the shot idles alive.
- A HUD showing T to one decimal place, and an intro overlay fading once T passes ~0.15.
- Confirm: pausing scroll freezes an exact configuration, and scrolling backwards runs the wave in reverse until the pendulums realign at T = 0.`,
    },
  },
};

export default threeScrollPendulumWave;