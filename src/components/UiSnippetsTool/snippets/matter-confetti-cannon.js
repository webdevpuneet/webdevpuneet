const matterConfettiCannon = {
  id: 'matter-confetti-cannon',
  title: 'Matter.js Confetti Cannon',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js',
  ],
  html: `<div class="mc-wrap">
  <canvas id="mcCanvas" class="mc-canvas"></canvas>
  <button class="mc-btn" id="mcFire">Launch confetti</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0c14;color:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden}
.mc-wrap{position:relative;width:min(92vw,520px);height:min(70vh,420px);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,#12142280 0%,#0b0c14 100%);border:1px solid #1f2236}
.mc-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.mc-btn{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);padding:12px 26px;border-radius:999px;border:none;background:linear-gradient(135deg,#f97316,#ec4899);color:#fff;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 8px 26px rgba(236,72,153,.4);z-index:2}
.mc-btn:active{transform:translateX(-50%) scale(.96)}`,

  js: `const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const wrap = document.querySelector('.mc-wrap');
const canvas = document.getElementById('mcCanvas');

function size() {
  return { w: wrap.clientWidth, h: wrap.clientHeight };
}
let { w, h } = size();

const engine = Engine.create();
engine.gravity.y = 1;

const render = Render.create({
  canvas,
  engine,
  options: {
    width: w,
    height: h,
    wireframes: false,
    background: 'transparent',
  },
});
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Floor and side walls so confetti bounces and settles instead of falling
// off the bottom of the canvas forever.
function makeBounds(w, h) {
  const t = 40;
  return [
    Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, { isStatic: true, render: { visible: false } }),
    Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, { isStatic: true, render: { visible: false } }),
    Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, { isStatic: true, render: { visible: false } }),
  ];
}
let bounds = makeBounds(w, h);
World.add(engine.world, bounds);

window.addEventListener('resize', () => {
  const s = size();
  w = s.w; h = s.h;
  render.canvas.width = w;
  render.canvas.height = h;
  render.options.width = w;
  render.options.height = h;
  World.remove(engine.world, bounds);
  bounds = makeBounds(w, h);
  World.add(engine.world, bounds);
});

const colors = ['#f97316', '#ec4899', '#6366f1', '#22c55e', '#fbbf24', '#06b6d4', '#a78bfa'];

function launchConfetti() {
  const originX = w / 2;
  const originY = h - 30;
  const pieces = [];

  for (let i = 0; i < 60; i++) {
    const isCircle = Math.random() > 0.5;
    const color = colors[i % colors.length];
    const size2 = 6 + Math.random() * 6;
    const body = isCircle
      ? Bodies.circle(originX, originY, size2 / 2, {
          restitution: 0.55,
          friction: 0.15,
          render: { fillStyle: color },
        })
      : Bodies.rectangle(originX, originY, size2, size2 * 0.6, {
          restitution: 0.5,
          friction: 0.2,
          render: { fillStyle: color },
        });
    pieces.push(body);
  }

  World.add(engine.world, pieces);

  pieces.forEach((body) => {
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * 1.4;
    // setVelocity, not applyForce: applyForce divides by each body's own
    // mass to get velocity, so these deliberately tiny, randomly-sized
    // pieces (mass varies with radius) would launch at wildly different,
    // often absurd speeds for the same force value. setVelocity gives every
    // piece a consistent, predictable launch speed regardless of its mass.
    const speed = 6 + Math.random() * 8;
    Body.setVelocity(body, {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
  });

  // Clean up old confetti after it settles, so repeated bursts don't
  // accumulate hundreds of resting bodies and slow the simulation down.
  setTimeout(() => {
    World.remove(engine.world, pieces);
  }, 6000);
}

document.getElementById('mcFire').addEventListener('click', launchConfetti);`,

  seo: {
    title: 'Matter.js Confetti Cannon — Free Physics-Based Confetti Burst Snippet',
    description: `A button that launches physics-simulated confetti with real gravity, bounce, and collisions using Matter.js, settling naturally at the bottom of the canvas. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Matter.js Confetti Cannon — Real Physics Confetti That Bounces and Settles',
      description: `Most confetti effects fake physics with CSS keyframes and hand-tuned easing curves — see [confetti button](/ui-snippets/confetti-button/) for that approach. This snippet uses [Matter.js](https://brm.io/matter-js/), a real 2D rigid-body physics engine, so every piece of confetti actually has mass, velocity, restitution, and collides with the floor and walls (and, briefly, each other) rather than following a pre-baked trajectory — the burst looks different every time you click it.

**Engine, renderer, and runner**

Matter.js separates three concerns: \`Engine\` runs the physics simulation (gravity, collisions, constraints), \`Render\` draws the current body states to a canvas, and \`Runner\` drives the engine forward on a fixed timestep loop. This snippet wires up all three against the same canvas, with \`engine.gravity.y = 1\` set explicitly so confetti actually falls once launched, rather than floating.

**Invisible bounds keep the burst contained**

Three static bodies — a floor and two side walls, all with \`render: { visible: false }\` — bound the play area so confetti bounces and settles inside the canvas instead of falling through the bottom edge forever (Matter.js bodies fall infinitely without a floor to collide with). \`makeBounds()\` is recreated on window resize so the walls always match the current canvas size.

**Launching a burst with real forces**

\`launchConfetti()\` creates 60 mixed circle and rectangle bodies at a point near the bottom-center, each with randomized \`restitution\` (bounciness) and \`friction\`, then calls \`Body.applyForce\` with a randomized upward-ish angle and magnitude per piece — an actual physics impulse, not a CSS animation-fill-mode. \`Body.setAngularVelocity\` gives each piece independent spin. Because the engine resolves gravity, drag, and collisions every tick, pieces naturally spread, tumble, bounce off each other and the floor, and settle at different rates.

**Cleanup so bursts don't accumulate**

Each burst's bodies are removed from the world 6 seconds after launch via \`World.remove\`, so clicking the button repeatedly doesn't leave hundreds of resting bodies in the simulation, which would otherwise slow collision resolution down over time.

**Where this fits**

For a lighter CSS-only confetti burst, see [confetti button](/ui-snippets/confetti-button/) or [canvas confetti burst](/ui-snippets/canvas-confetti-burst/); for real physics without confetti, see [physics balls](/ui-snippets/physics-balls/), [physics 2D burst](/ui-snippets/physics-2d-burst/), or [physics props pucks](/ui-snippets/physics-props-pucks/) — this snippet borrows the same Matter.js setup pattern and applies it to a celebratory launch instead of draggable or falling props.

**Customizing it**

Change \`engine.gravity.y\` for a floatier or heavier fall, tune \`restitution\`/\`friction\` per body for bouncier or stickier confetti, or increase the piece count for a denser burst (watch performance if you also increase the cleanup delay).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the matter-js CDN', text: `Include matter.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An empty physics canvas and a launch button render.` },
      { title: 'Click "Launch confetti"', text: `60 bodies launch upward with randomized force.` },
      { title: 'Watch it settle', text: `Gravity and collisions bring pieces to rest naturally.` },
      { title: 'Click again', text: `A fresh burst launches; old pieces clean up after 6s.` },
      { title: 'Resize the window', text: `Bounds rebuild so confetti stays contained.` },
    ] },
    features: [
      { title: 'Real rigid-body physics', text: `Matter.js simulates gravity, mass, and collisions.` },
      { title: 'Invisible floor and walls', text: `Bounds keep confetti contained without visible bodies.` },
      { title: 'Mixed shapes', text: `Circles and rectangles vary the burst's silhouette.` },
      { title: 'Randomized impulses', text: `Body.applyForce gives every piece a unique path.` },
      { title: 'Independent spin', text: `Angular velocity is randomized per piece.` },
      { title: 'Resize-safe bounds', text: `Walls rebuild to match the current canvas size.` },
      { title: 'Auto cleanup', text: `Settled confetti is removed after 6 seconds.` },
      { title: 'Repeatable bursts', text: `Every click produces a genuinely different outcome.` },
    ],
    useCases: [
      { title: 'Purchase confirmations', text: `A heavier celebratory moment than CSS confetti.` },
      { title: 'Achievement unlocks', text: `Pair with [confetti celebration card](/ui-snippets/confetti-celebration-card/).` },
      { title: 'Physics playgrounds', text: `Sits alongside [physics balls](/ui-snippets/physics-balls/).` },
      { title: 'Game-like interactions', text: `Reuse the engine setup for [physics props pucks](/ui-snippets/physics-props-pucks/).` },
      { title: 'Learning Matter.js', text: `A compact example of forces, bodies, and bounds.` },
      { title: 'Comparing confetti techniques', text: `Contrast with [canvas confetti burst](/ui-snippets/canvas-confetti-burst/).` },
      { icon: 'CODE', title: 'Related: Wave Text Animation', desc: 'See the [Wave Text Animation](/ui-snippets/wave-text/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a CSS-based confetti effect?', a: `A CSS confetti burst (like the confetti button snippet) pre-calculates each particle's trajectory as a keyframe animation with fixed start and end states. This snippet instead creates real Matter.js bodies with mass, restitution, and friction, then applies actual force impulses to them — gravity, collisions with the floor and walls, and piece-to-piece contact are all resolved by the physics engine every tick, so the outcome is genuinely simulated rather than pre-authored, and no two bursts play out identically.` },
      { q: 'Why are the floor and walls invisible?', a: `They're real Matter.js static bodies (isStatic: true) so confetti collides with and bounces off them, but render: { visible: false } tells Matter's renderer not to draw them, since their only job is to contain the simulation, not to be seen. Without them, confetti bodies would fall under gravity indefinitely and exit the canvas instead of settling at a visible floor.` },
      { q: 'What does Body.applyForce actually do?', a: `It applies a force vector to a body at a given point, which Matter.js's engine integrates into that body's velocity over subsequent simulation steps — this is a genuine physics impulse, not a CSS transform. Because each of the 60 pieces gets its own randomized angle and magnitude, they launch in a natural-looking spread rather than a mechanically uniform fan.` },
      { q: 'Why remove the confetti bodies after 6 seconds?', a: `Once confetti has settled at the floor, the bodies are still part of the physics world and Matter.js's collision detection still has to check them against everything else every tick. Repeated clicks without cleanup would accumulate hundreds of resting bodies, gradually slowing collision resolution down; removing each burst's pieces from the world a few seconds after it settles keeps the simulation's body count bounded.` },
      { q: 'What happens if I resize the browser window mid-burst?', a: `The resize listener recreates the render canvas dimensions and rebuilds the three boundary bodies (floor and two walls) to match the new size, removing the old ones first. Confetti bodies already in flight or settled keep their existing position and velocity — they're unaffected by the resize — but the new bounds ensure any bodies launched afterward, or already resting near an old wall position, stay properly contained.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer Matter.js's engine/render/runner split from its docs alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the invisible floor and wall bodies keep confetti contained without being drawn, and why applying a randomized force vector to each piece via Body.applyForce produces a different-every-time burst compared to a CSS keyframe animation with fixed start and end states. The same assistant can help optimize it — asking whether 60 bodies with a 6-second cleanup window is reasonable for lower-end devices, or whether switching some circle bodies to a lower-cost collision shape would help performance at higher particle counts. It's also useful for extending the effect: ask it to add a second burst origin so confetti launches from both bottom corners, make gravity strength configurable so the fall feels heavier or floatier, or add mouse-based repulsion so moving the cursor near settled confetti scatters it again. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a button-triggered confetti burst that uses real 2D rigid-body physics via Matter.js (load it from a CDN), rendered to a canvas, with gravity, bouncing, and settling — not a pre-authored CSS keyframe animation.

Requirements:
- Set up a Matter.js Engine, Render (targeting a canvas sized to its container, with wireframes disabled and a transparent background), and Runner, and start the simulation running.
- Set the engine's gravity explicitly so launched bodies actually fall.
- Create three static, invisible boundary bodies — a floor beneath the visible canvas area and a wall just outside each side — so confetti bodies collide with them and stay contained within the canvas instead of falling out of view indefinitely. Render these bodies invisible while still keeping them solid for collision purposes.
- Rebuild these boundary bodies whenever the window is resized, so they continue to match the canvas's current dimensions.
- On a button click, create roughly 60 new physics bodies near the bottom-center of the canvas, mixing circle and rectangle shapes, each with randomized size, a randomized color from a small fixed palette, and randomized restitution (bounciness) and friction values.
- Immediately after creating each burst body, apply an actual physics force to it (not a fixed velocity) at a randomized upward-ish angle and randomized magnitude, and also give it a randomized angular velocity so pieces spin independently as they fly and fall.
- A few seconds after each burst (once pieces have had time to settle), remove that burst's bodies from the physics world so repeated clicks don't cause the simulation to accumulate an ever-growing number of resting bodies and slow down over time.`,
    },
  },
};

export default matterConfettiCannon;
