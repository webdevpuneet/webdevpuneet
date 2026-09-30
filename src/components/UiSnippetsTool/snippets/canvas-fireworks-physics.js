const canvasFireworksPhysics = {
  id: 'canvas-fireworks-physics',
  title: 'Canvas Fireworks Physics',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<section class="fwp-wrap">
  <canvas class="fwp-canvas" id="fwpCanvas"></canvas>
  <div class="fwp-content">
    <span class="fwp-tag">canvas 2d · from-scratch physics</span>
    <h1>Happy launch day</h1>
    <p>Click anywhere to launch a rocket. Gravity, drag, and fade are hand-rolled — no particle library.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#04050c;color:#fff;min-height:100vh}
.fwp-wrap{position:relative;min-height:100vh;overflow:hidden;cursor:crosshair}
.fwp-canvas{position:absolute;inset:0;width:100%;height:100%}
.fwp-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none;padding:26px}
.fwp-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fca5a5;background:rgba(252,165,165,.1);border:1px solid rgba(252,165,165,.3);padding:5px 12px;border-radius:99px;margin-bottom:16px}
.fwp-content h1{font-size:clamp(30px,7vw,54px);font-weight:800;letter-spacing:-.03em;text-shadow:0 4px 30px rgba(0,0,0,.6)}
.fwp-content p{font-size:14px;color:#b9c0e0;margin-top:10px;max-width:420px;line-height:1.7;text-shadow:0 2px 12px rgba(0,0,0,.6)}`,

  js: `var canvas = document.getElementById('fwpCanvas');
var ctx = canvas.getContext('2d');
var wrap = document.querySelector('.fwp-wrap');
var W, H;

function resize() {
  W = canvas.width = wrap.clientWidth;
  H = canvas.height = wrap.clientHeight;
}
resize();
window.addEventListener('resize', resize);

var GRAVITY = 0.045;
var DRAG = 0.985;
var COLORS = ['#f87171', '#fbbf24', '#a78bfa', '#60a5fa', '#4ade80', '#f472b6', '#e2e8f0'];

var rockets = [];
var particles = [];

function Rocket(x) {
  this.x = x;
  this.y = H;
  this.targetY = H * (0.18 + Math.random() * 0.32);
  this.vy = -(9 + Math.random() * 3.5);
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  this.trail = [];
}

function launchRocket(x) {
  rockets.push(new Rocket(typeof x === 'number' ? x : Math.random() * W));
}

// A physics particle: position, velocity, and a life counter. Gravity pulls
// every particle down each frame; DRAG bleeds off velocity so the burst
// decelerates like real debris instead of coasting forever.
function Particle(x, y, color) {
  var angle = Math.random() * Math.PI * 2;
  var speed = 1.5 + Math.random() * 5.5;
  this.x = x;
  this.y = y;
  this.vx = Math.cos(angle) * speed;
  this.vy = Math.sin(angle) * speed;
  this.color = color;
  this.life = 1;
  this.decay = 0.008 + Math.random() * 0.018;
  this.size = 1.4 + Math.random() * 1.8;
}

function explode(x, y, color) {
  var count = 60 + Math.floor(Math.random() * 40);
  for (var i = 0; i < count; i++) particles.push(new Particle(x, y, color));
}

function tick() {
  ctx.fillStyle = 'rgba(4,5,12,0.22)';
  ctx.fillRect(0, 0, W, H);

  for (var i = rockets.length - 1; i >= 0; i--) {
    var r = rockets[i];
    r.trail.push({ x: r.x, y: r.y });
    if (r.trail.length > 6) r.trail.shift();

    r.vy += GRAVITY * 0.4;
    r.y += r.vy;

    ctx.beginPath();
    for (var t = 0; t < r.trail.length; t++) {
      var p = r.trail[t];
      ctx.fillStyle = r.color;
      ctx.globalAlpha = (t + 1) / r.trail.length * 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (r.vy >= 0 || r.y <= r.targetY) {
      explode(r.x, r.y, r.color);
      rockets.splice(i, 1);
    }
  }

  for (var j = particles.length - 1; j >= 0; j--) {
    var pt = particles[j];
    pt.vy += GRAVITY;
    pt.vx *= DRAG;
    pt.vy *= DRAG;
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life -= pt.decay;

    if (pt.life <= 0) {
      particles.splice(j, 1);
      continue;
    }

    ctx.globalAlpha = Math.max(pt.life, 0);
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(tick);
}

wrap.addEventListener('click', function (e) {
  var rect = wrap.getBoundingClientRect();
  launchRocket(e.clientX - rect.left);
});

var autoTimer = setInterval(function () {
  if (rockets.length + particles.length < 260) launchRocket();
}, 1400);

// Seed the sky immediately so the demo isn't blank on load.
launchRocket();
requestAnimationFrame(tick);`,

  seo: {
    title: 'Canvas Fireworks Physics — Free From-Scratch Particle Explosion',
    description: `Rockets launch, arc, and explode into gravity-and-drag particle bursts built entirely with hand-rolled physics on a 2D canvas — click to launch, no particle library. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Fireworks Physics — Gravity, Drag, and Fade From Scratch',
      description: `Most confetti and firework effects on the web reach for a particle library. This snippet is the opposite exercise: rockets, trails, explosions, gravity, air drag, and fade are all implemented directly against the 2D canvas API with two small object constructors and a handful of physics constants — useful both as a working effect and as a compact reference for how particle systems actually work under the hood.

**Two kinds of particle**

A \`Rocket\` starts at the bottom of the canvas with an upward velocity and a randomly chosen target height; a \`Particle\` is spawned only at the moment of explosion, with a random angle and speed so it flies outward in every direction from the burst point. Keeping these as two distinct, tiny constructors (rather than one particle type with a mode flag) keeps each one's update logic — arc-and-detonate versus radiate-and-fade — easy to read in isolation.

**Real gravity and drag, not a lookup table**

Every particle's vertical velocity increases by a constant \`GRAVITY\` each frame, exactly like a real projectile under constant acceleration. \`DRAG\` (0.985) is multiplied into both velocity components every frame, so particles lose speed exponentially rather than linearly — this is what makes a burst's outer edge decelerate and hang for a moment before gravity visibly takes over, matching how real fireworks debris behaves far more convincingly than a fixed-duration animation would.

**Life as a countdown, not a timer**

Rather than tracking each particle's remaining time with \`Date.now()\` comparisons, every particle has a \`life\` value starting at 1 that decrements by a random \`decay\` each frame, and \`ctx.globalAlpha\` is set directly from that value before drawing. Because \`decay\` is randomized per particle, a single burst fades out unevenly — some sparks visibly outlast others — instead of every particle in an explosion vanishing on the same frame.

**A trail from a short history array**

Each rocket keeps its own \`trail\` array of its last six positions, and every frame draws all of them with alpha increasing toward the most recent point. This is the same "ring buffer of recent positions, alpha-ramped" technique used for cursor trails and comet effects — it produces a convincing motion streak with no extra state beyond an array you push to and shift from.

**Fading the whole canvas, not clearing it**

Instead of \`ctx.clearRect\`, each frame paints a translucent \`rgba(4,5,12,0.22)\` rectangle over everything. That leaves a faint afterimage of the previous frame rather than a hard cut, giving trails and bursts a soft motion-blur quality for almost no extra code. Compare this from-scratch approach with the library-driven [canvas confetti burst](/ui-snippets/canvas-confetti-burst/), or pair it with a [starfield](/ui-snippets/starfield/) backdrop for a night-sky celebration scene.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A rocket auto-launches on load and the sky starts filling.` },
      { title: 'Click anywhere', text: `A new rocket launches from that x position and climbs upward.` },
      { title: 'Watch it detonate', text: `At its random target height it explodes into 60-100 particles.` },
      { title: 'Observe the fade', text: `Particles lose speed to drag, fall to gravity, and fade at random rates.` },
      { title: 'Let it auto-loop', text: `A timer launches new rockets every ~1.4s, capped by particle count.` },
      { title: 'Tune the show', text: `Change GRAVITY, DRAG, COLORS, or the particle count per burst.` },
    ] },
    features: [
      { title: 'From-scratch physics', text: `Gravity and drag as plain constants — no particle library.` },
      { title: 'Two particle types', text: `A Rocket constructor and a Particle constructor, each simple.` },
      { title: 'Exponential drag', text: `Velocity multiplied by DRAG each frame for a natural decel.` },
      { title: 'Randomized fade rate', text: `Per-particle decay means bursts fade unevenly, not all at once.` },
      { title: 'Ring-buffer trails', text: `Each rocket keeps its last 6 positions, alpha-ramped.` },
      { title: 'Motion-blur clear', text: `A translucent fill instead of clearRect leaves soft afterimages.` },
      { title: 'Click to launch', text: `Rockets fire from the clicked x position.` },
      { title: 'Self-throttling auto-loop', text: `A timer launches new rockets, capped by total particle count.` },
    ],
    useCases: [
      { title: 'Celebration and success states', text: `A bigger moment than [canvas confetti burst](/ui-snippets/canvas-confetti-burst/).` },
      { title: 'New Year / holiday landing pages', text: `A full-screen night-sky celebration hero.` },
      { title: 'Product launch pages', text: `Auto-loop fireworks behind a launch-day headline.` },
      { title: 'Event countdown finales', text: `Trigger explode() manually when a countdown hits zero.` },
      { title: 'Physics teaching demos', text: `A compact, readable gravity-and-drag reference example.` },
      { title: 'Night-sky scenes', text: `Layer over a [starfield](/ui-snippets/starfield/) backdrop.` },
      { icon: 'CODE', title: 'Related: Canvas Noise Texture Background', desc: 'See the [Canvas Noise Texture Background](/ui-snippets/canvas-noise-texture-bg/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cursor-Follow Underline Draw', desc: 'See the [Cursor-Follow Underline Draw](/ui-snippets/link-underline-cursor-draw/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a library like canvas-confetti?', a: `Everything here — rocket launch, arc, detonation, particle spawning, gravity, drag, and fade — is written directly against the 2D canvas API with two small constructors and a few numeric constants, with no external particle engine involved. The [canvas confetti burst](/ui-snippets/canvas-confetti-burst/) snippet wraps the canvas-confetti library instead; this one is the from-scratch version, useful when you want full control over the physics or want to see exactly how a particle system works.` },
      { q: 'How does the drag constant affect the explosion?', a: `Every frame, each particle's vx and vy are multiplied by DRAG (0.985), so velocity decays exponentially rather than dropping by a fixed amount. That produces a burst whose outer ring visibly slows and seems to hang for a moment before gravity pulls it down — much closer to how real firework debris moves through air resistance than a burst with no drag, which would keep expanding outward at a constant rate.` },
      { q: 'Why do some particles fade out before others in the same burst?', a: `Each particle is given its own random decay value when it is created, and its life counter (starting at 1) drops by that amount every frame, directly driving ctx.globalAlpha. Because decay varies per particle, a single explosion does not vanish as one uniform block — some sparks linger visibly longer than others, the same way real embers burn out at different rates.` },
      { q: 'Why paint a translucent rectangle instead of calling clearRect?', a: `clearRect would wipe every trace of the previous frame instantly, leaving hard-edged dots with no sense of motion. Filling the canvas each frame with a low-alpha rgba(4,5,12,0.22) rectangle instead partially erases the previous frame, leaving a fading afterimage behind every moving trail and particle — a cheap way to get a motion-blur look without a shader or an offscreen buffer.` },
      { q: 'Will performance hold up with rockets launching continuously?', a: `The auto-launch timer checks rockets.length + particles.length against a cap (260) before firing a new rocket, so the total particle count self-limits rather than growing without bound. Combined with particles being removed from the array once their life reaches zero, the scene reaches a steady-state particle count instead of accumulating indefinitely, which keeps frame time roughly constant during continuous play.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why the DRAG constant is applied multiplicatively every frame rather than subtracted, and how that produces exponential rather than linear deceleration — try changing DRAG from 0.985 to 0.95 and 0.999 and ask it to predict the visual difference before you run it. It's also useful for reasoning about the fade: ask why life and globalAlpha are tied together directly instead of using a CSS transition or a separate opacity tween, and why per-particle randomized decay matters for how a burst reads. For extensions, ask it to add a secondary "crackle" burst that spawns a few seconds after the main explosion at reduced scale, make rocket color match its eventual burst color visibly during the trail, or add a sound-trigger hook that fires on each detonation. It can also help you reason about performance — ask how the rockets.length + particles.length cap interacts with the auto-launch timer to keep the scene from growing unbounded. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "canvas fireworks" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API — hand-rolled particle physics, no particle or animation library.

Requirements:
- A full-bleed canvas over a dark night-sky background. Clicking anywhere on the page launches a rocket from that horizontal position; also auto-launch a rocket immediately on load and every roughly 1.4 seconds afterward via a timer, but only if the total number of active rockets plus particles is below a cap (e.g. 260) so the effect self-throttles instead of growing unbounded.
- A Rocket object: starts at the bottom of the canvas, has an upward initial velocity and a randomly chosen target height, keeps a short trailing array (its last ~6 positions) drawn each frame with alpha increasing toward the most recent point, and detonates (spawning particles, then being removed) once its upward velocity crosses zero or it reaches its target height.
- A Particle object created only at detonation: given a random angle and speed so it radiates outward from the burst point in every direction, with its own random decay rate controlling how fast its life value (starting at 1) counts down each frame.
- Real physics on every particle each frame: add a constant GRAVITY to vertical velocity (so particles arc and fall), multiply both velocity components by a DRAG constant just under 1 (so speed decays exponentially, not linearly), and set the particle's rendered alpha directly from its remaining life value so particles fade out, with particles removed from the array once life reaches zero.
- Instead of ctx.clearRect each frame, fill the canvas with a low-alpha dark rectangle (e.g. rgba(4,5,12,0.22)) so previous frames leave a fading afterimage rather than a hard cut, giving trails and bursts a soft motion-blur quality.
- Pick each rocket/burst's color randomly from a small palette array, spawn 60-100 particles per explosion, and keep the whole thing running smoothly via a single requestAnimationFrame loop that updates and draws both the rockets array and the particles array every frame.`,
    },
  },
};

export default canvasFireworksPhysics;
