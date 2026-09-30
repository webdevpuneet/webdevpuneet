const threeScrollHourglass = {
  id: 'three-scroll-hourglass',
  title: 'Three.js Scroll Hourglass Sand Timer',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="hgl-stage" id="hglStage">
  <div class="hgl-intro"><p>Scroll ↓ to let the sand run</p></div>
  <canvas id="hglCanvas"></canvas>
  <div class="hgl-hud"><span id="hglPct">0</span>% ELAPSED</div>
</section>
<section class="hgl-bottom"><p>Time’s up.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#141210;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.hgl-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#a89d8a;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.hgl-stage{height:100vh;position:relative;overflow:hidden;background:#141210}
.hgl-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#a89d8a;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#hglCanvas{display:block;width:100%;height:100%}
.hgl-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#eab308;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('hglCanvas');
const pctEl = document.getElementById('hglPct');
const introEl = document.querySelector('.hgl-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141210);
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);

scene.add(new THREE.AmbientLight(0xfff2dc, 0.6));
const key = new THREE.DirectionalLight(0xffe9c0, 1.0);
key.position.set(10, 16, 12);
scene.add(key);

// The whole hourglass lives in one group so the end-of-scroll flip
// rotates glass, sand piles, and stream together.
const rig = new THREE.Group();
scene.add(rig);

// Glass: two cones meeting at a narrow neck, semi-transparent.
const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xcfe6e8, transparent: true, opacity: 0.16, roughness: 0.05,
  metalness: 0, side: THREE.DoubleSide, depthWrite: false,
});
const topGlass = new THREE.Mesh(new THREE.ConeGeometry(5, 8, 48, 1, true), glassMat);
topGlass.position.y = 4.2;
rig.add(topGlass);
const botGlass = new THREE.Mesh(new THREE.ConeGeometry(5, 8, 48, 1, true), glassMat);
botGlass.rotation.x = Math.PI;
botGlass.position.y = -4.2;
rig.add(botGlass);

// Wood frame: two discs and three pillars.
const wood = new THREE.MeshStandardMaterial({ color: 0x5b4226, roughness: 0.65 });
[8.6, -8.6].forEach((y) => {
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.4, 0.9, 48), wood);
  disc.position.y = y;
  rig.add(disc);
});
for (let i = 0; i < 3; i++) {
  const a = (i / 3) * Math.PI * 2;
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 17.2, 12), wood);
  pillar.position.set(Math.cos(a) * 5.9, 0, Math.sin(a) * 5.9);
  rig.add(pillar);
}

// Sand piles: cones whose scale is driven analytically from progress.
// Volume conserved: top pile shrinks as bottom grows by the same cube law.
const sandMat = new THREE.MeshStandardMaterial({ color: 0xd9a441, roughness: 0.9 });
const topSand = new THREE.Mesh(new THREE.ConeGeometry(4.6, 6.6, 40), sandMat);
// Top sand is an inverted cone sitting in the upper bulb, tip down at the neck.
topSand.rotation.x = Math.PI;
rig.add(topSand);
const botSand = new THREE.Mesh(new THREE.ConeGeometry(4.6, 5.2, 40), sandMat.clone());
rig.add(botSand);

// The falling stream: a thin column of recycled particles through the neck.
const GRAINS = 220;
const grainGeo = new THREE.BufferGeometry();
const grainPos = new Float32Array(GRAINS * 3);
const grainSeed = new Float32Array(GRAINS);
for (let i = 0; i < GRAINS; i++) {
  grainSeed[i] = Math.random();
  grainPos[i * 3 + 1] = -9999;
}
grainGeo.setAttribute('position', new THREE.BufferAttribute(grainPos, 3));
const grains = new THREE.Points(grainGeo, new THREE.PointsMaterial({
  color: 0xe8b95a, size: 0.16, transparent: true, opacity: 0.95, sizeAttenuation: true,
}));
rig.add(grains);

gsap.registerPlugin(ScrollTrigger);
const timer = { p: 0 };
gsap.to(timer, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#hglStage', start: 'top top', end: '+=450%', scrub: 0.5, pin: true },
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
  const p = timer.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  // Sand runs across the first 88% of scroll; the flip takes the rest.
  const run = Math.min(1, p / 0.88);
  const flip = Math.max(0, (p - 0.88) / 0.12);

  // Volume conservation: pile volume ∝ scale³, so scale = cbrt(fraction).
  const topFrac = Math.max(0.0001, 1 - run);
  const botFrac = Math.max(0.0001, run);
  const ts = Math.cbrt(topFrac), bs = Math.cbrt(botFrac);
  topSand.scale.set(ts, ts, ts);
  // Keep the top pile's tip pinned at the neck (y=0): the inverted cone's
  // tip sits half its scaled height below its center.
  topSand.position.y = 0.4 + (6.6 * ts) / 2;
  botSand.scale.set(bs, bs, bs);
  botSand.position.y = -8.2 + (5.2 * bs) / 2;

  // Stream particles: visible only while sand is running (0 < run < 1).
  const flowing = run > 0.005 && run < 0.995;
  for (let i = 0; i < GRAINS; i++) {
    grainSeed[i] += 0.03 + (i % 5) * 0.005;
    if (grainSeed[i] > 1) {
      grainSeed[i] = 0;
      grainPos[i * 3] = (Math.random() - 0.5) * 0.22;
      grainPos[i * 3 + 1] = flowing ? 0.3 : -9999;
      grainPos[i * 3 + 2] = (Math.random() - 0.5) * 0.22;
    } else if (grainPos[i * 3 + 1] > -999) {
      // Accelerate downward — sand in free fall, not linear drip.
      grainPos[i * 3 + 1] -= 0.18 + grainSeed[i] * 0.55;
      if (grainPos[i * 3 + 1] < botSand.position.y + 2.6 * bs) grainPos[i * 3 + 1] = -9999;
    }
  }
  grainGeo.attributes.position.needsUpdate = true;

  // The flip: once the sand has run out, the last 12% of scroll rotates
  // the whole rig upside down, resetting the timer for a loop.
  const fe = flip * flip * (3 - 2 * flip);
  rig.rotation.z = fe * Math.PI;

  const ang = 0.5 + p * 1.2 + t * 0.05;
  camera.position.set(Math.sin(ang) * 26, 3 + Math.sin(t * 0.3) * 0.8, Math.cos(ang) * 26);
  camera.lookAt(0, 0, 0);

  pctEl.textContent = Math.round(run * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Hourglass — Volume-True Sand Timer',
    description: 'Scroll runs sand through a glass with cube-root volume conservation, free-fall grains and an end-of-scroll flip. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Hourglass With Conserved Sand Volume in Three.js',
      description: `The **Three.js Scroll Hourglass Sand Timer** snippet runs sand through a glass as the user scrolls — the upper pile shrinking, a thin accelerating grain stream threading the neck, the lower pile growing — and, once the last grain falls, flips the entire instrument upside down in the final 12% of scroll, ready to run again. GSAP's ScrollTrigger scrubs elapsed time; the sand piles obey a cube-root law that keeps their combined volume honest.

**Volume conservation is a cube root**

The naive approach scales pile height linearly with progress, which loses sand: a cone at half scale holds one-eighth the volume, so linear-scaling piles would visibly evaporate mid-run. Since pile volume scales with the cube of uniform scale, the correct mapping is \`scale = cbrt(fraction)\` — the top pile scales by \`cbrt(1 − run)\` and the bottom by \`cbrt(run)\`, making their volumes sum to a constant at every scroll position. The visible consequence is exactly what real hourglasses do: the top pile seems barely to shrink at first, then collapses rapidly at the end, while the bottom pile leaps up early and creeps later. The physics produces the drama for free.

**Pinning cone tips through scaling**

Scaling a cone happens about its center, which would make the top pile float off the neck as it shrinks. Both piles therefore get their Y position recomputed from their scaled height each frame — the inverted top cone's tip stays pinned at the neck (\`y = 0.4 + scaledHeight/2\`), and the bottom pile's base stays welded to the bulb floor. It is the scaling counterpart of the hinge-translation trick in the [book pages](/ui-snippets/three-scroll-book-pages/) snippet: decide which edge must not move, then position from that edge.

**A grain stream that falls, not drips**

The neck stream is 220 recycled particles with wrapping lifetimes, respawning at the neck only while sand is actually running (\`0 < run < 1\`) — the same spawn-gating as the [rocket launch](/ui-snippets/three-scroll-rocket-launch/) exhaust, so the stream starts and stops as a consequence of state rather than a toggle. Each grain's fall speed grows with its lifetime (\`0.18 + life × 0.55\`), approximating gravitational acceleration; grains vanish when they meet the rising surface of the bottom pile, whose height the kill-line tracks via \`botSand.position.y + 2.6 × scale\`. The stream visibly lands *on* the pile at every fill level.

**Glass from MeshPhysicalMaterial, frame from primitives**

The bulbs are two open-ended cones at 16% opacity with near-zero roughness and \`depthWrite: false\` — the standard recipe for believable glass without refraction shaders: transparency plus specular highlight equals glass to the eye, the same budget-material philosophy as the cover glass in the [exploded view](/ui-snippets/three-scroll-exploded-view/). The wooden frame is two discs and three pillars of rough \`MeshStandardMaterial\`, warm-lit to set the antique mood.

**The flip closes the loop**

Everything — glass, frame, piles, stream — lives in one rig \`Group\`, so the final phase can smoothstep \`rig.rotation.z\` through π and the whole instrument turns over as a unit. Because the flip window sits after the sand window (88%/12% of one scrubbed value, the phase-split pattern from the [Rubik's cube assembly](/ui-snippets/three-scroll-rubiks-assemble/)), scrolling back first un-flips, then un-pours. The elapsed HUD reads from the run fraction — a scroll-progress display in the spirit of a [scroll reading-time indicator](/ui-snippets/scroll-reading-time/), but diegetic: the page's progress bar is the sand itself.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'An antique hourglass — wood frame, glass bulbs, full top pile — rotates slowly under warm light with 0% ELAPSED in the HUD.' },
        { title: 'Scroll to run the sand', text: 'A thin accelerating stream threads the neck; the top pile shrinks on the cube-root law while the bottom pile rises to meet the falling grains.' },
        { title: 'Watch the endgame', text: 'Near 88% the top pile collapses rapidly — the cube-root law\'s signature — and the stream dies as the last volume transfers.' },
        { title: 'Complete the flip', text: 'The final 12% of scroll smoothsteps the whole rig through a half-turn, resetting the timer upside down.' },
        { title: 'Re-dress the instrument', text: 'Swap sand and wood colors, bulb opacity, or GRAINS count; the volume math only cares about the run fraction.' },
      ],
    },
    features: [
      'Cube-root volume conservation: top scales by cbrt(1 − run), bottom by cbrt(run) — sand never evaporates',
      'Emergent drama: the top pile collapses fast at the end purely from the volume law, no easing tricks',
      'Cone tips pinned through scaling by recomputing Y from scaled height each frame',
      'Grain stream with lifetime recycling, gravity-like acceleration, and spawn-gating by run state',
      'Kill-line that tracks the rising bottom pile so grains visibly land on the surface at any fill level',
      'Believable glass from MeshPhysicalMaterial: 16% opacity, near-zero roughness, depthWrite off — no refraction shader',
      'One rig Group so the end-of-scroll flip rotates glass, piles, and stream as a unit',
      'Phase-split scrub: 88% sand run, 12% smoothstepped flip, reversible in exact order',
    ],
    useCases: [
      { icon: 'WEB', title: 'Deadline and countdown campaigns', desc: 'Sales, launches, and event pages get a literal timer whose urgency accelerates visually near the end — stronger than a numeric [circular countdown](/ui-snippets/circular-countdown/).' },
      { icon: 'ANIM', title: 'Reading-progress storytelling', desc: 'Pin the hourglass beside an article so the sand tracks scroll like a diegetic [scroll reading-time](/ui-snippets/scroll-reading-time/) indicator.' },
      { icon: 'LEARN', title: 'Teaching volume-preserving animation', desc: 'The cube-root law is the star: a memorable one-line lesson in why uniform scale is not linear in quantity.' },
      { icon: 'DESIGN', title: 'Heritage and craft brand heroes', desc: 'Watchmakers, whisky, and slow-craft brands get patience rendered as an object, warmer than the mechanics of a [gear train](/ui-snippets/three-scroll-gear-train/).' },
      { icon: 'GAME', title: 'Turn-based and strategy game promos', desc: 'The flip moment is a natural "your move" beat for games marketing turn mechanics.' },
      { icon: 'SHOP', title: 'Limited-drop commerce pages', desc: 'Run the sand across a product story and land the flip on the buy CTA — scarcity you scrub through.' },
    ],
    faqs: [
      { q: 'Why do the sand piles scale by the cube root of progress?', a: 'A cone scaled uniformly by s holds s³ times its volume, so a pile at half scale contains only 12.5% of its sand. Scaling linearly would make sand vanish mid-run. Using scale = cbrt(fraction), volume is proportional to fraction itself, and top (1 − run) plus bottom (run) sums to constant total volume at every scroll position. The visible bonus: the top pile collapses dramatically near the end, exactly like a real hourglass.' },
      { q: 'How do the cones stay attached to the neck and floor while scaling?', a: 'Scaling happens about a mesh\'s center, so a shrinking cone would drift away from the neck. Each frame both piles get position.y recomputed from their scaled height — the inverted top cone\'s tip pinned at the neck via y = 0.4 + (height × scale)/2, the bottom cone\'s base held at the bulb floor. Fix the edge that must not move, derive the center from it.' },
      { q: 'What stops the grain stream when the sand runs out?', a: 'Respawn gating: when a grain\'s lifetime wraps, it only re-enters at the neck if 0.005 < run < 0.995; otherwise it parks at y = −9999. In-flight grains finish their fall and die on the pile surface, so the stream drains naturally rather than blinking off — and reappears the same way when scrolling back into the running window.' },
      { q: 'How do grains know where the top of the bottom pile is?', a: 'The kill-line is computed from the same values that scale the pile: a grain despawns when its y drops below botSand.position.y + 2.6 × bottomScale, which tracks the pile apex as it rises. Because pile scale and kill-line derive from one run fraction, the stream always terminates visually on the sand surface, at 5% full or 95%.' },
      { q: 'Can I use this hourglass in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the rig and ScrollTrigger inside a mount effect against a canvas ref; the grain Float32Arrays live in effect scope. On cleanup kill the ScrollTrigger, dispose the glass, wood, sand, and grain geometries/materials (note the bottom pile clones the sand material — dispose both), and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to re-derive the volume math. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the cube-root conservation law, the tip-pinning position formula, or the spawn-gated grain stream. The same assistant can refine the illusion — a slight sand-level slope using a scaled hemisphere instead of a cone tip, dust motes puffing where the stream lands, a second full run after the flip by extending the scrub range and mirroring the pile roles, or binding the run fraction to a real deadline (time remaining until your event) instead of scroll. It can also restyle the instrument — brass frame, colored sand, frosted glass — by adjusting the three materials. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven hourglass sand timer" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), and warm ambient + directional light.
- One rig Group containing everything, so an end-of-scroll flip can rotate the whole instrument.
- Glass bulbs: two open-ended ConeGeometry meshes meeting at a neck, MeshPhysicalMaterial at ~16% opacity, roughness ~0.05, DoubleSide, depthWrite false. Wood frame: two CylinderGeometry discs top and bottom plus three pillars.
- Sand piles as cones with VOLUME CONSERVATION: top pile scale = cbrt(1 − run), bottom = cbrt(run), where run = min(1, p / 0.88). Recompute each pile's position.y from its scaled height every frame so the top cone's tip stays pinned at the neck and the bottom cone's base stays on the bulb floor.
- A grain stream of ~220 recycled particles: wrapping lifetimes; on wrap respawn at the neck ONLY while 0.005 < run < 0.995 (else park at y = −9999); fall speed grows with lifetime (gravity feel); despawn when y drops below the bottom pile's apex, computed as botSand.position.y + 2.6 × bottomScale so grains land on the rising surface.
- One GSAP tween (ease "none") scrubbing p 0→1 on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=450%.
- Phase split: sand runs over p ∈ [0, 0.88]; the final 12% smoothsteps rig.rotation.z through π, flipping the instrument for a reset.
- A slow orbiting camera with a clock-driven bob, an ELAPSED % HUD from the run fraction, and an intro overlay fading at p > 0.02.
- Confirm reverse scrolling un-flips first, then un-pours — piles regrowing and the stream reappearing — with no one-shot events.`,
    },
  },
};

export default threeScrollHourglass;