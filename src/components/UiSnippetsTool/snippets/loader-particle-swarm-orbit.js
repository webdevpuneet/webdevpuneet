const loaderParticleSwarmOrbit = {
  id: 'loader-particle-swarm-orbit',
  title: 'Particle Swarm Loader',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="ps-stage">
  <div class="ps-field" id="psField" role="status" aria-label="Loading"><div class="ps-core"></div></div>
  <p class="ps-hint">12 particles, each with its own radius, speed, and phase</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07070f;color:#8b90ab;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ps-stage{display:flex;flex-direction:column;align-items:center;gap:18px}
.ps-field{position:relative;width:220px;height:220px}
.ps-core{position:absolute;top:50%;left:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#818cf8);box-shadow:0 0 22px 4px rgba(129,140,248,.7)}

.ps-particle{position:absolute;top:50%;left:50%;border-radius:50%;will-change:transform,opacity}

.ps-hint{font-size:12px;color:#5b6083}`,

  js: `var field = document.getElementById('psField');
var COUNT = 12;
var colors = ['#818cf8', '#22d3ee', '#f472b6', '#34d399', '#fbbf24'];
var particles = [];

// Give every particle genuinely randomized orbit parameters — radius, angular
// speed, phase offset, and vertical eccentricity — instead of evenly spacing
// identical orbits. This is what turns a ring of dots into a swarm.
for (var i = 0; i < COUNT; i++) {
  var el = document.createElement('div');
  el.className = 'ps-particle';
  var size = 4 + Math.random() * 6;
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  el.style.background = colors[i % colors.length];
  el.style.boxShadow = '0 0 ' + (size * 1.6) + 'px ' + colors[i % colors.length];
  field.appendChild(el);

  particles.push({
    el: el,
    radius: 30 + Math.random() * 80,          // per-particle orbit radius
    speed: (0.4 + Math.random() * 1.4) * (Math.random() < 0.5 ? -1 : 1), // rad/s, mixed direction
    phase: Math.random() * Math.PI * 2,        // per-particle start angle
    eccentricity: 0.55 + Math.random() * 0.45, // flattens the orbit into an ellipse
    baseOpacity: 0.45 + Math.random() * 0.55,
  });
}

var start = null;
function tick(ts) {
  if (!start) start = ts;
  var elapsed = (ts - start) / 1000;
  particles.forEach(function (p) {
    var angle = p.phase + elapsed * p.speed;
    var x = Math.cos(angle) * p.radius;
    var y = Math.sin(angle) * p.radius * p.eccentricity;
    // Particles nearer the "front" of their ellipse (larger sin) appear
    // slightly bigger and brighter, faking depth without a 3D engine.
    var depth = (Math.sin(angle) + 1) / 2;
    var scale = 0.7 + depth * 0.6;
    p.el.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) scale(' + scale.toFixed(2) + ')';
    p.el.style.opacity = (p.baseOpacity * (0.5 + depth * 0.5)).toFixed(2);
    p.el.style.zIndex = String(Math.round(depth * 100));
  });
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);`,

  seo: {
    title: 'Particle Swarm Loader — Randomized Orbiting Particles in HTML CSS JS',
    description: `12 particles with independently randomized radius, speed, phase, and eccentricity orbit a glowing core — a genuine swarm, not a ring of identical dots. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Particle Swarm Loader — 12 Particles With Real Per-Particle Randomized Orbits',
      description: `A ring loader like an [orbit loader](/ui-snippets/orbit-loader/) or [dots loader](/ui-snippets/dots-loader/) typically animates a handful of evenly-spaced dots on identical circular paths — clean, but mechanical. A swarm reads differently: dozens of particles moving at their own pace on their own paths, converging and drifting apart unpredictably. This snippet builds that with 12 particles, each given genuinely randomized orbit parameters computed once at load and then animated every frame with real trigonometry — not CSS keyframes on a shared ring.

**Per-particle randomized parameters**

Each particle gets its own \`radius\` (30–110px), \`speed\` (0.4–1.8 rad/s, with roughly half orbiting clockwise and half counter-clockwise), \`phase\` (a random starting angle around the circle), and \`eccentricity\` (0.55–1, flattening the circular path into an ellipse of varying flatness). These are generated once with \`Math.random()\` when the particles are created, so no two particles trace the same path — a structural difference from a CSS \`@keyframes\` ring where every dot shares one rotation duration and only differs by a fixed \`animation-delay\`.

**Real per-frame position math, not CSS rotation**

A single \`requestAnimationFrame\` loop computes every particle's \`x\`/\`y\` position each frame from \`Math.cos(angle) * radius\` and \`Math.sin(angle) * radius * eccentricity\`, where \`angle\` advances by each particle's own \`speed\` times elapsed time. This is genuinely computed motion — the position exists as real numbers you could log, not an opaque CSS animation — which is what makes true per-particle randomization possible; CSS keyframes can't express twelve different radii and speeds without twelve separate keyframe blocks.

**Faked depth from the ellipse**

Because each orbit is flattened into an ellipse, particles on the "near" side of their path (where \`sin(angle)\` is largest) are scaled up slightly and given higher opacity and \`z-index\`, while particles on the "far" side shrink and fade. This single trick — deriving apparent depth from the same sine value that already drives vertical position — gives the swarm a pseudo-3D quality without any actual 3D transform or WebGL.

**A genuine swarm, not a bigger ring**

Twelve particles with independently randomized radius, direction, speed, and phase is meaningfully more complex than the 3–8 dot rings common elsewhere in this library: there is no repeating unit, no shared timing, and the pattern never exactly loops. Tune \`COUNT\`, the radius range, or the color palette to match your brand, and consider pairing it with a [gradient progress](/ui-snippets/gradient-progress/) bar for a companion determinate indicator once real progress is known.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `12 particles orbit a glowing core at independently randomized speeds.` },
      { title: 'Watch for a full minute', text: `Notice the pattern never exactly repeats — each particle has its own phase and speed.` },
      { title: 'Change particle count', text: `Edit the COUNT constant to add or remove particles.` },
      { title: 'Tune the orbit ranges', text: `Adjust the radius, speed, and eccentricity random ranges for a tighter or wider swarm.` },
      { title: 'Recolor the palette', text: `Edit the colors array to match your brand.` },
      { title: 'Reuse the position math', text: `The angle/radius/eccentricity formula ports to canvas or SVG if you need thousands of particles.` },
    ] },
    features: [
      { title: 'Per-particle random radius', text: `Each of 12 particles orbits at its own distance from the core.` },
      { title: 'Per-particle random speed & direction', text: `Roughly half orbit clockwise, half counter-clockwise, at varied rates.` },
      { title: 'Per-particle random phase', text: `Staggered starting angles so particles never bunch identically.` },
      { title: 'Elliptical orbits', text: `A randomized eccentricity flattens each path differently.` },
      { title: 'Faked depth from sine', text: `Near-side particles scale up and brighten; far-side ones shrink and fade.` },
      { title: 'Real per-frame math', text: `Positions computed from cos/sin each frame — not CSS keyframe rotation.` },
      { title: 'Glowing core', text: `A radial-gradient center anchors the swarm visually.` },
      { title: 'No dependencies', text: `Pure DOM elements and vanilla JS — no canvas or physics library.` },
    ],
    useCases: [
      { title: 'AI / processing loaders', text: `A richer alternative to a [dots loader](/ui-snippets/dots-loader/) for "working" states.` },
      { title: 'Full-page loading screens', text: `Fill a splash screen with ambient motion while assets load.` },
      { title: 'Brand / hero loading moments', text: `Pair with a [hero section](/ui-snippets/hero-section/) as an animated centerpiece.` },
      { title: 'Data-sync indicators', text: `Show background sync activity next to a [gradient progress](/ui-snippets/gradient-progress/) bar.` },
      { title: 'Empty/loading dashboard states', text: `Fill a card while a widget's data resolves.` },
      { title: 'Studying orbital motion in CSS/JS', text: `A reference for real per-frame trigonometric animation vs. CSS keyframes.` },
      { icon: 'CODE', title: 'Related: Progress Bar with Milestone Labels', desc: 'See the [Progress Bar with Milestone Labels](/ui-snippets/loader-milestone-progress-bar/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a typical CSS orbit ring?', a: `A CSS-keyframe orbit ring rotates one shared element (or a few dots on it) using @keyframes, so every dot shares the same duration and only differs by animation-delay. Here, each of 12 particles has its own independently randomized radius, speed, direction, and phase computed once in JS, and every frame recalculates each particle's position from real cos/sin math — a structurally different, much less repetitive motion.` },
      { q: 'Why compute positions in JavaScript instead of CSS animations?', a: `CSS keyframes can express a fixed number of named states per animation, which becomes unwieldy for 12+ particles each needing a unique radius and speed. Driving position from a requestAnimationFrame loop with real numbers means every parameter can be randomized independently and the same formula scales to any particle count without writing new keyframe blocks.` },
      { q: 'How does the depth effect work without 3D transforms?', a: `Each orbit is an ellipse (y is scaled by an eccentricity factor), so a particle at the "front" of its ellipse has a larger sine value than one at the "back". That same sine value drives a size scale and opacity boost, so front particles appear closer and back particles appear farther — a 2D trick that reads as depth without any actual perspective transform.` },
      { q: 'Will this perform well with more particles?', a: `12 DOM-element particles with a requestAnimationFrame loop is well within budget for any modern browser. If you need hundreds or thousands, port the same angle/radius/eccentricity formula to a <canvas> 2D context or WebGL point sprites instead of individual DOM elements, since DOM updates get costly at very high counts.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Generate the particle parameter array once (in useMemo, a computed ref, or a component field) so it is not re-randomized on every re-render, then run the requestAnimationFrame loop in a mount effect with cleanup that cancels the frame on unmount. Update each particle's transform via a ref rather than through component state to avoid a re-render every frame.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the swarm math by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how each particle's independently randomized radius, speed, phase, and eccentricity are generated once and then combined every frame into a position via cos/sin, and how the same sine value that shapes the elliptical orbit is reused to fake depth through scale and opacity. The same assistant can help optimize it — for example asking whether 12 DOM-element particles updated via inline transform styles every frame is efficient enough, or whether a <canvas> approach would be better past a few dozen particles. It's also useful for extending the effect: ask it to make particles occasionally swap orbits, add a subtle trailing effect behind each particle, or tie the swarm's overall speed to a real loading-progress value so it visibly "settles" as work completes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "particle swarm" loading indicator in plain HTML, CSS, and JavaScript with at least 12 particles orbiting a central core — no canvas library, no physics engine.

Requirements:
- A container holding a glowing central core element and one small circular particle element per particle, created dynamically in JavaScript (not hand-written in the HTML) so the particle count is a single configurable constant.
- Each particle must be assigned independently RANDOMIZED orbit parameters when it is created: its own orbit radius, its own angular speed (with roughly half the particles orbiting clockwise and half counter-clockwise), its own starting phase angle, and its own orbital eccentricity that flattens its circular path into an ellipse of a randomized flatness — do not give every particle the same radius/speed/phase.
- Drive all particle motion from a single requestAnimationFrame loop that, every frame, computes each particle's current x and y position directly from cos(angle) and sin(angle) times its own radius and eccentricity, where angle is derived from that particle's own phase plus elapsed time times its own speed — not from CSS keyframe animations.
- Use the same per-frame sine value that determines each particle's vertical elliptical position to also derive a scale factor and an opacity/z-index adjustment, so particles on the near side of their ellipse appear larger and brighter than particles on the far side, faking depth without any 3D transform.
- Give particles varied sizes and colors from a small palette so the swarm reads as visually varied rather than uniform.
- Confirm that because every particle's radius, speed, phase, and eccentricity differ, the overall pattern never exactly repeats within any short observation window, unlike a simple evenly-spaced dot ring.`,
    },
  },
};

export default loaderParticleSwarmOrbit;
