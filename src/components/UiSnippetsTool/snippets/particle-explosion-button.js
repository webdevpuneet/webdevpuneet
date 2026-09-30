const particleExplosionButton = {
  id: 'particle-explosion-button',
  title: 'Particle Explosion Click Button',
  lastmod: '2026-08-09',
  category: 'buttons',
  html: `<div class="explode-app">
  <div class="explode-stage" id="explode-stage">
    <canvas class="particle-canvas" id="particle-canvas"></canvas>
    <button class="explode-btn" id="explode-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
      Click Me
    </button>
  </div>
  <p class="explode-count">Clicks: <span id="click-count">0</span></p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; }

.explode-app { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 40px; }

.explode-stage {
  position: relative; width: 320px; height: 220px;
  display: flex; align-items: center; justify-content: center;
}

.particle-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none;
}

.explode-btn {
  position: relative; z-index: 2;
  display: flex; align-items: center; gap: 8px;
  background: #6366f1; color: #fff; border: none;
  font-size: 14.5px; font-weight: 700; font-family: inherit;
  padding: 13px 26px; border-radius: 12px; cursor: pointer;
  box-shadow: 0 6px 18px rgba(99,102,241,0.35);
  transition: background 0.15s, box-shadow 0.15s;
  transform: scale(1, 1);
}
.explode-btn:hover { background: #4f46e5; }
.explode-btn.recoil { animation: btn-recoil 0.42s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes btn-recoil {
  0% { transform: scale(1, 1); }
  30% { transform: scale(0.88, 0.9); }
  55% { transform: scale(1.08, 1.04); }
  100% { transform: scale(1, 1); }
}

.explode-count { font-size: 12.5px; color: #64748b; font-weight: 600; }
.explode-count span { color: #1e293b; font-weight: 700; }`,

  js: `const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
const stage = document.getElementById('explode-stage');
const btn = document.getElementById('explode-btn');
const clickCountEl = document.getElementById('click-count');

const COLORS = ['#6366f1', '#818cf8', '#f59e0b', '#22c55e', '#ec4899', '#38bdf8'];
const GRAVITY = 0.12;
let particles = [];
let clicks = 0;
let rafId = null;

function resizeCanvas() {
  const rect = stage.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnBurst(cx, cy) {
  const count = 12 + Math.floor(Math.random() * 9); // 12-20 particles
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.2 + Math.random() * 3.4;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 3 + Math.random() * 3.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      decay: 0.012 + Math.random() * 0.014,
    });
  }
  if (!rafId) rafId = requestAnimationFrame(tick);
}

function tick() {
  const rect = stage.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  particles.forEach(p => {
    p.vy += GRAVITY;
    p.x += p.vx;
    p.y += p.vy;
    p.life -= p.decay;

    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  particles = particles.filter(p => p.life > 0);

  if (particles.length > 0) {
    rafId = requestAnimationFrame(tick);
  } else {
    rafId = null;
  }
}

btn.addEventListener('click', e => {
  clicks += 1;
  clickCountEl.textContent = clicks;

  const rect = stage.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const cx = btnRect.left - rect.left + btnRect.width / 2;
  const cy = btnRect.top - rect.top + btnRect.height / 2;
  spawnBurst(cx, cy);

  btn.classList.remove('recoil');
  void btn.offsetWidth;
  btn.classList.add('recoil');
});`,

  seo: {
    title: 'Particle Explosion Click Button — Free HTML CSS JS Snippet',
    description: 'Canvas-based button that bursts 12-20 physics particles outward on click, with gravity, fade, and squash recoil. Exports to React, Vue & Angular.',
    about: {
      title: 'Particle Explosion Click Button — Canvas Physics Burst with Gravity, Fade & Squash Recoil',
      description: `Micro-interactions are the small, disposable animations that make a click feel like it did something — a satisfying confirmation rather than a silent state change. This snippet builds a genuine physics-lite particle burst using the HTML5 Canvas API: clicking the button spawns 12 to 20 individually simulated particles that fly outward from the click point, fall under gravity, fade out over their lifetime, and get removed once fully transparent, while the button itself plays a squash-and-recoil animation to sell the impact.

**Why canvas instead of DOM particles**

A common naive approach animates particles as absolutely-positioned \`<div>\` elements. That works for a handful of particles, but every additional div is a full DOM node subject to layout, paint, and composite — with 15-20 particles animating every frame across many rapid clicks, DOM-based particles start to visibly stutter. This snippet instead draws every particle as an \`arc()\` fill directly onto a single \`<canvas>\` element, which is far cheaper: the browser rasterizes pixels rather than tracking and repainting dozens of live elements, and the entire particle system's memory footprint is just a plain JavaScript array of position/velocity objects, not DOM nodes.

**The physics-lite simulation loop**

Each particle object stores \`x\`, \`y\`, \`vx\`, \`vy\` (velocity), \`size\`, \`color\`, \`life\` (starting at \`1\`, representing 100% opacity), and \`decay\` (how fast \`life\` depletes per frame). On each \`requestAnimationFrame\` tick, the update order is: apply gravity to vertical velocity (\`p.vy += GRAVITY\`), apply velocity to position (\`p.x += p.vx; p.y += p.vy\`), and decrement \`life\` by \`decay\`. This is Euler integration — the simplest possible numerical simulation, but visually convincing at these timescales and particle counts because the human eye doesn't need physically exact projectile motion to read "explosion." \`globalAlpha\` is set to \`p.life\` before drawing each particle so it visibly fades as its life depletes, and once \`life\` drops to zero or below, the particle is dropped from the array with \`particles.filter(p => p.life > 0)\` — this is the actual DOM-node-equivalent removal step, just applied to an array element instead of an element.

**Randomizing angle and velocity for a natural burst shape**

\`spawnBurst()\` picks a random angle in radians from \`0\` to \`2π\` for every particle (\`Math.random() * Math.PI * 2\`) and derives \`vx\`/\`vy\` from that angle with \`Math.cos(angle) * speed\` and \`Math.sin(angle) * speed\`, where \`speed\` itself is randomized within a range. This trigonometric decomposition is what produces a genuinely radial 360-degree burst rather than particles all flying in the same direction — any angle is equally likely, and randomized speed and \`decay\` per particle mean no two particles trace an identical arc, which is what reads as "explosion" rather than a mechanical, repeating pattern.

**High-DPI canvas sizing and the animation loop lifecycle**

\`resizeCanvas()\` handles a detail that's easy to get wrong on Retina/high-DPI displays: it reads \`window.devicePixelRatio\`, sizes the canvas's backing buffer to \`rect.width * dpr\` while keeping the CSS \`style.width\` at the logical size, and calls \`ctx.setTransform(dpr, 0, 0, dpr, 0, 0)\` so all subsequent drawing calls can still use logical (CSS) pixel coordinates while rendering at full device resolution — skip this and the particles look soft and pixelated on Retina screens. The animation loop itself is lazily started and stopped: \`spawnBurst()\` only calls \`requestAnimationFrame(tick)\` if a loop isn't already running (\`if (!rafId)\`), and \`tick()\` stops rescheduling itself once the particle array empties, so the browser isn't burning frames on an idle canvas between clicks — clicking rapidly just adds more particles into the same already-running loop rather than starting redundant loops.

**The button's own recoil animation**

Independent of the canvas particles, the button element gets a \`.recoil\` class toggled via the standard remove-reflow-readd pattern (\`btn.classList.remove('recoil'); void btn.offsetWidth; btn.classList.add('recoil')\`) so the CSS \`@keyframes btn-recoil\` squash-and-rebound animation restarts cleanly even on rapid consecutive clicks, rather than silently failing to replay because the class was never actually removed from the DOM before being re-added in the same synchronous tick.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click the button to trigger a burst',
          text: 'Each click calls spawnBurst() with the button\'s center coordinates (computed via getBoundingClientRect()), spawning 12-20 particles with randomized angle, speed, size, color, and decay rate, then starts the requestAnimationFrame loop if it is not already running.',
        },
        {
          title: 'Watch the physics simulation play out',
          text: 'Every frame, tick() applies GRAVITY to each particle\'s vertical velocity, moves it by its velocity, decrements its life, and draws it as a fading canvas arc. Particles are removed from the array once life reaches zero, and the loop stops rescheduling itself when the array is empty.',
        },
        {
          title: 'Watch the button\'s own recoil animation',
          text: 'Independently of the particles, the button itself plays a squash-and-rebound @keyframes animation via the .recoil class, retriggered on every click using the classList.remove + void offsetWidth + classList.add pattern so it replays correctly even on rapid clicks.',
        },
        {
          title: 'Adjust particle count, gravity, and colors',
          text: 'Change the count range in spawnBurst() (currently 12 + Math.floor(Math.random() * 9)) for a bigger or smaller burst, tweak the GRAVITY constant for a floatier or heavier fall, and edit the COLORS array to match your brand palette instead of the default multi-color confetti scheme.',
        },
        {
          title: 'Trigger a burst from an arbitrary point',
          text: 'spawnBurst(cx, cy) accepts any canvas-relative coordinates, not just the button center — call it with e.clientX/e.clientY (adjusted for the canvas\'s bounding rect) to burst from the exact mouse click position instead of always the button\'s center.',
        },
        {
          title: 'Export and reuse across multiple buttons',
          text: 'Click JSX to export a React component, then generalize the canvas/particle logic into a hook (e.g. useParticleBurst) that any button component can call, passing its own DOM ref so multiple explosion buttons can exist on the same page without sharing canvas state.',
        },
      ],
    },
    features: [
      'Real Canvas 2D particle simulation: position += velocity, velocity.y += gravity, fade via globalAlpha, per frame',
      'Randomized radial burst via Math.cos/sin(angle) decomposition — no two particles trace an identical arc',
      '12-20 particles per click with randomized size, color, speed, and decay rate for natural variation',
      'High-DPI canvas sizing: devicePixelRatio-aware backing buffer with ctx.setTransform for crisp Retina rendering',
      'Lazy requestAnimationFrame loop: starts only on burst, self-stops once the particle array empties, no idle frame burn',
      'Array-based particle removal via life > 0 filter — no per-particle DOM nodes, cheap even under rapid clicking',
      'Button squash-and-recoil CSS animation, retriggered via the remove/reflow/re-add class pattern on every click',
      'Click counter demonstrates the burst firing independently and correctly on every single click, not just the first',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Celebratory confirmation on form submit or checkout buttons',
        desc: 'A particle burst on a "Submit," "Add to Cart," or "Subscribe" button gives users clear, delightful confirmation that their click registered, especially useful right before an async request resolves and while the user is waiting for a server response. Trigger spawnBurst() immediately on click, before the fetch() call, so the feedback feels instant regardless of network latency.',
      },
      {
        icon: 'APP',
        title: 'Gamified reward and achievement-unlock moments',
        desc: 'Apps with points, streaks, or achievement systems often want a small celebratory flourish at the exact moment a reward is granted — completing a daily goal, unlocking a badge, or hitting a streak milestone. This burst effect pairs naturally with the [XP Level-Up Progress Bar](/ui-snippets/xp-level-progress-bar) snippet for a combined "action confirmed + progress celebrated" gamification moment.',
      },
      {
        icon: 'DESIGN',
        title: 'Marketing landing page CTA buttons that want extra delight',
        desc: 'A hero CTA button ("Get Started," "Try Free") with a subtle particle burst on hover-click adds a small moment of polish that differentiates a landing page from a generic template, without needing a full animation library. Swap the COLORS array to match your brand palette so the burst feels intentional rather than generic confetti.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching canvas-based particle systems and requestAnimationFrame loops',
        desc: 'This snippet is a compact, complete reference for the core mechanics of any canvas particle system — the update/draw loop structure, gravity and velocity integration, lifecycle management (spawn, simulate, cull), and lazy loop start/stop — patterns that scale directly to more elaborate effects like confetti cannons, fireworks, or ambient background particles.',
      },
      {
        icon: 'CODE',
        title: 'Micro-interaction pattern for design systems and component libraries',
        desc: 'Teams building an internal component library can adopt the useParticleBurst extraction pattern described in howToUse to offer a reusable "celebratory click" behavior any button in the system can opt into via a prop, keeping the physics and canvas logic centralized in one hook rather than duplicated per button instance.',
      },
      { icon: 'CODE', title: 'Related: Vibration API Pattern Demo', desc: 'See the [Vibration API Pattern Demo](/ui-snippets/vibration-pattern-demo/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why use canvas instead of animating individual div elements for the particles?',
        a: 'Canvas draws every particle as a rasterized shape within a single element, which is far cheaper than the browser tracking, laying out, and compositing 15-20 separate live DOM elements every animation frame — especially under rapid repeated clicks where multiple bursts might be animating simultaneously. The tradeoff is that canvas particles are not individually addressable DOM nodes (no CSS selectors, no event listeners per particle), which is a non-issue here since particles are purely decorative and never need to be individually interactive.',
      },
      {
        q: 'How does the particle physics simulation actually work, code-wise?',
        a: 'Each particle is a plain object with x/y position, vx/vy velocity, and a life value starting at 1. Every requestAnimationFrame tick applies three updates in order: p.vy += GRAVITY (gravity pulls the particle down over time), p.x += p.vx and p.y += p.vy (velocity moves the position), and p.life -= p.decay (the particle ages). ctx.globalAlpha is set to the current life value before drawing, so the particle visibly fades as life approaches zero, and particles are removed from the array once life drops to zero or below via particles.filter(p => p.life > 0).',
      },
      {
        q: 'Why does the canvas look blurry on Retina/high-DPI screens without the devicePixelRatio handling?',
        a: 'By default, a canvas element\'s internal pixel buffer matches its CSS size 1:1, so on a display with devicePixelRatio of 2 or 3, the canvas is rendered at a lower resolution than the screen and then upscaled, producing visibly soft, blurry particles. resizeCanvas() fixes this by setting the actual canvas.width/height attributes to the CSS size multiplied by devicePixelRatio, keeping the CSS style.width/height at the original logical size, and calling ctx.setTransform(dpr, 0, 0, dpr, 0, 0) so all subsequent drawing coordinates can stay in simple logical pixels while rendering crisply at full device resolution.',
      },
      {
        q: 'How do I make the burst originate from the exact click point instead of the button center?',
        a: 'The click handler currently computes cx/cy from btn.getBoundingClientRect() to always burst from the button\'s center. To burst from the exact cursor position instead, use the click event\'s e.clientX and e.clientY, subtract the canvas\'s own getBoundingClientRect().left/top to convert from viewport coordinates to canvas-relative coordinates, and pass those values to spawnBurst(cx, cy) instead of the button-center calculation.',
      },
      {
        q: 'Will this cause a memory leak or performance problem if a user clicks very rapidly?',
        a: 'No — every particle is a small plain object pushed into the particles array, and the array is filtered down to only living particles on every frame, so memory usage stays bounded by however many particles are currently alive and fading, typically well under a few hundred even with rapid clicking. The requestAnimationFrame loop also self-stops (rafId = null) once the array empties rather than continuing to run and consume CPU when the canvas is visually idle between click bursts.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how a single particle's life value drives both its fade-out (via globalAlpha) and its eventual removal from the array — that update/draw/cull cycle is the core pattern behind every canvas particle system, not just this one. It's also worth asking the assistant to explain the devicePixelRatio canvas-sizing code line by line if you're not sure why it's there, since skipping it is a common source of blurry canvas rendering bugs. For extension, ask it to add mouse-position-based bursts instead of always centering on the button, a confetti-shaped particle variant (rotating rectangles instead of circles), or a reusable useParticleBurst hook so multiple buttons across a page can each trigger independent bursts without duplicating the canvas and physics code.`,
      prompt: `Build a button that emits a physics-based particle explosion on click, using an HTML5 canvas and vanilla JavaScript.

Requirements:
- Clicking the button spawns between 12 and 20 particles from the button's center (or the exact click point), each with a randomized launch angle across the full 360 degrees and a randomized initial speed, so the burst reads as a genuine radial explosion rather than particles all moving in one direction.
- Simulate real per-frame physics for each particle using requestAnimationFrame: update position by adding velocity each frame, apply a constant gravity value to vertical velocity each frame so particles arc and fall, and fade each particle's opacity over its lifetime using a life/decay value rather than a fixed-duration CSS animation.
- Remove each particle once its life/opacity reaches zero, and stop the requestAnimationFrame loop entirely once no particles remain alive — do not keep an idle animation loop running between bursts.
- Render particles on a canvas (not as individual absolutely-positioned DOM elements), and handle high-DPI/Retina displays correctly so particles are not blurry on displays with devicePixelRatio greater than 1.
- The button itself should play a distinct squash-and-recoil CSS animation on every click, correctly restarting even on rapid consecutive clicks (address the specific browser behavior that can silently prevent a CSS animation from replaying if a class is removed and re-added within the same synchronous task).
- Randomize particle color, size, and fade-out speed slightly so consecutive bursts don't look mechanically identical.`,
    },
  },
};

export default particleExplosionButton;
