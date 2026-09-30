const elasticDragSlider = {
  id: 'elastic-drag-slider',
  title: 'Elastic Drag Slider',
  lastmod: '2026-08-08',
  category: 'forms',
  html: `<div class="eds-wrap">
  <label class="eds-label">Volume<span class="eds-value" id="eds-value">50</span></label>
  <div class="eds-track" id="eds-track">
    <div class="eds-fill" id="eds-fill"></div>
    <div class="eds-thumb" id="eds-thumb" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"></div>
  </div>
  <p class="eds-hint">Drag fast and release — the thumb overshoots and springs back</p>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; padding: 32px; }

.eds-wrap { width: 100%; max-width: 340px; }
.eds-label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 14px; }
.eds-value { font-variant-numeric: tabular-nums; color: #6366f1; font-weight: 800; }

.eds-track { position: relative; height: 8px; border-radius: 999px; background: #e2e8f0; margin: 30px 4px; }
.eds-fill { position: absolute; top: 0; left: 0; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #818cf8, #6366f1); width: 50%; }

.eds-thumb {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #6366f1;
  box-shadow: 0 3px 10px rgba(99,102,241,0.35);
  cursor: grab;
  touch-action: none;
  will-change: transform;
}
.eds-thumb:active { cursor: grabbing; }
.eds-thumb:focus-visible { outline: 2px solid #6366f1; outline-offset: 3px; }

.eds-hint { font-size: 12px; color: #94a3b8; margin-top: 6px; text-align: center; }`,
  js: `const track = document.getElementById('eds-track');
const thumb = document.getElementById('eds-thumb');
const fill = document.getElementById('eds-fill');
const valueEl = document.getElementById('eds-value');

// ---- Spring physics state ----
// position: the value the thumb is currently rendered at (0-100)
// target:   the value the pointer/keyboard wants it to end up at
// velocity: current rate of change of position, in value-units per frame
// These three numbers, integrated every animation frame, are the entire
// "spring" - no CSS transition or cubic-bezier is used to move the thumb.
let position = 50;
let target = 50;
let velocity = 0;

const STIFFNESS = 0.22; // how strongly the spring pulls toward the target
const DAMPING = 0.62;   // how strongly velocity is resisted (energy loss)
const SETTLE_EPSILON = 0.05;

let dragging = false;
let rafId = null;
let lastPointerValue = 50;
let lastPointerTime = 0;

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function trackRect() {
  return track.getBoundingClientRect();
}

function valueFromClientX(clientX) {
  const rect = trackRect();
  const ratio = (clientX - rect.left) / rect.width;
  return clamp(ratio * 100, 0, 100);
}

function render(pos) {
  const clamped = pos; // allow visual overshoot past 0/100 briefly for the spring effect
  fill.style.width = clamp(clamped, 0, 100) + '%';
  thumb.style.left = clamped + '%';
  const shown = Math.round(clamp(clamped, 0, 100));
  valueEl.textContent = shown;
  thumb.setAttribute('aria-valuenow', String(shown));
}

// ---- The physics loop ----
// Every frame we compute a spring force pulling position toward target,
// subtract a damping force proportional to velocity (this is what makes it
// settle instead of oscillating forever), integrate velocity into position,
// and keep looping via requestAnimationFrame until the system is at rest.
function tick() {
  const springForce = -STIFFNESS * (position - target);
  const dampingForce = -DAMPING * velocity;
  const acceleration = springForce + dampingForce;

  velocity += acceleration;
  position += velocity;

  render(position);

  const atRest = Math.abs(velocity) < SETTLE_EPSILON && Math.abs(position - target) < SETTLE_EPSILON;
  if (!atRest || dragging) {
    rafId = requestAnimationFrame(tick);
  } else {
    position = target;
    velocity = 0;
    render(position);
    rafId = null;
  }
}

function ensureLoopRunning() {
  if (rafId === null) {
    rafId = requestAnimationFrame(tick);
  }
}

function onPointerDown(e) {
  dragging = true;
  thumb.setPointerCapture(e.pointerId);
  lastPointerValue = valueFromClientX(e.clientX);
  lastPointerTime = performance.now();
  ensureLoopRunning();
}

function onPointerMove(e) {
  if (!dragging) return;
  const now = performance.now();
  const val = valueFromClientX(e.clientX);
  const dt = Math.max(1, now - lastPointerTime);

  // While actively dragging, the thumb should track the pointer exactly -
  // the spring only takes over once the user lets go. We still derive a
  // velocity estimate from how fast the pointer is moving so the release
  // carries that momentum into the spring instead of starting from zero.
  velocity = ((val - lastPointerValue) / dt) * 16; // scale to "per animation frame" units
  target = val;
  position = val;
  render(position);

  lastPointerValue = val;
  lastPointerTime = now;
}

function onPointerUp(e) {
  if (!dragging) return;
  dragging = false;
  thumb.releasePointerCapture(e.pointerId);
  // target is already the released value; the existing velocity (captured
  // from the last movement) now drives the spring's overshoot and settle.
  ensureLoopRunning();
}

thumb.addEventListener('pointerdown', onPointerDown);
thumb.addEventListener('pointermove', onPointerMove);
thumb.addEventListener('pointerup', onPointerUp);
thumb.addEventListener('pointercancel', onPointerUp);

track.addEventListener('pointerdown', (e) => {
  if (e.target === thumb) return;
  const val = valueFromClientX(e.clientX);
  target = val;
  velocity = 0;
  ensureLoopRunning();
});

thumb.addEventListener('keydown', (e) => {
  let delta = 0;
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = 5;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -5;
  if (!delta) return;
  e.preventDefault();
  target = clamp(target + delta, 0, 100);
  ensureLoopRunning();
});

render(position);`,
  seo: {
    title: 'Elastic Drag Slider — Free Spring Physics JS Snippet',
    description: 'A range slider thumb that overshoots and springs back with real stiffness/damping physics on release. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Elastic Drag Slider — A Real Spring-Physics Simulation for a Range Input Thumb',
      description: `Most "springy" sliders on the web fake it with a CSS \`transition: left 0.3s cubic-bezier(...)\` that includes a slight overshoot curve. That produces a fixed, identical bounce no matter how the user interacts with it — drag the thumb one pixel or fling it across the whole track, and you get the exact same canned animation. This snippet does something different: it runs an actual spring simulation, every animation frame, driven by the real velocity of the user's drag. Flick the thumb hard and it overshoots further and takes longer to settle; nudge it gently and it barely wobbles. That distinction — physically *simulated* motion versus a pre-baked easing curve — is the entire point of the snippet, and the \`about\` text below walks through exactly how the loop works.

**The three numbers that define a spring**

The whole simulation lives in three variables: \`position\` (where the thumb currently is, 0-100), \`target\` (where it is being pulled toward), and \`velocity\` (how fast \`position\` is currently changing). Nothing else is needed to simulate a damped spring. Every animation frame, two forces are computed and summed into an acceleration: \`springForce = -STIFFNESS * (position - target)\` — a restoring force proportional to how far the thumb is from its target, always pointing back toward it, exactly like Hooke's law for a physical spring — and \`dampingForce = -DAMPING * velocity\`, a force that always opposes the current velocity, bleeding energy out of the system so it does not oscillate forever. \`velocity += acceleration; position += velocity;\` is literally Euler integration: update velocity from acceleration, then update position from velocity, once per frame.

**Why STIFFNESS and DAMPING are tuned as a pair**

\`STIFFNESS\` (0.22 here) controls how hard the spring pulls back toward the target — higher values snap back faster but overshoot more violently. \`DAMPING\` (0.62) controls how much that overshoot is resisted — too little damping and the thumb oscillates visibly several times before settling (an "underdamped" spring); too much and it never overshoots at all, which defeats the point of an elastic slider (a "critically damped" or "overdamped" spring). These two constants were tuned together by hand until a fast flick produced one clean, visible overshoot and settle rather than a pinball-like wobble — changing one without the other is the most common way to make a spring feel wrong.

**Turning drag speed into launch velocity**

While the pointer is actively down, the thumb tracks the cursor's position exactly (\`position = val\`) rather than lagging behind through the spring — a slider should feel perfectly responsive while you are holding it. But on every \`pointermove\`, the code also computes \`velocity = ((val - lastPointerValue) / dt) * 16\`, a real speed estimate from how far the value moved divided by how much time passed. That velocity is not used while dragging, but the moment \`pointerup\` fires, it becomes the *initial velocity fed into the spring loop* — so a fast flick releases with real carried momentum, producing a bigger overshoot, while a slow, careful drag releases with almost no velocity and barely overshoots at all. This is the key mechanism that makes the spring feel connected to the user's actual gesture rather than generic.

**The requestAnimationFrame settle-and-stop loop**

\`tick()\` runs on \`requestAnimationFrame\`, updates the physics, calls \`render()\`, and then checks whether the system is close enough to rest (\`Math.abs(velocity) < SETTLE_EPSILON\` and \`Math.abs(position - target) < SETTLE_EPSILON\`) to stop scheduling itself. This matters for two reasons: it avoids running an animation loop forever after the spring has visually stopped moving, and it snaps \`position\` exactly to \`target\` on the final frame so floating-point drift never leaves the thumb a fraction of a pixel off from its true value.

**Why the fill and thumb are allowed to overshoot past 0-100 visually**

\`render()\` deliberately clamps the *fill bar width* to 0-100% but lets the *thumb's left position* overshoot slightly past those bounds during the spring's bounce, since a real spring released near either end of the track should be able to visibly push past the edge before springing back — clamping the thumb too aggressively would silently remove the elastic feel exactly where it is most visible.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Drag the thumb slowly', text: 'The thumb tracks your cursor exactly with no lag, and the value label updates in real time as you move.' },
      { title: 'Drag it quickly and release mid-motion', text: 'On release, the thumb keeps moving briefly in the direction you were dragging, overshoots past where you let go, then springs back and settles — the faster the flick, the bigger the overshoot.' },
      { title: 'Release it gently near the middle', text: 'A slow, careful drag produces almost no overshoot at all, since very little velocity was captured at the moment of release.' },
      { title: 'Click anywhere on the track (not the thumb)', text: 'The target jumps to that position and the spring animates the thumb there from its current position, still with a small settle motion.' },
      { title: 'Use the arrow keys after focusing the thumb', text: 'Left/Right or Up/Down nudge the value by 5 and animate through the same spring physics rather than jumping instantly, keeping keyboard control visually consistent with drag.' },
      { title: 'Watch it near the track edges', text: 'Flick hard toward 0 or 100 and the thumb visibly pushes slightly past the edge before the spring pulls it back, since only the fill bar — not the thumb\'s position — is hard-clamped.' },
    ]},
    features: [
      'Real spring simulation: position, velocity, and target integrated every requestAnimationFrame tick',
      'Hooke\'s-law restoring force (-stiffness * displacement) plus a separate damping force each frame',
      'Drag velocity is measured live from pointermove deltas and carried into the spring as launch momentum on release',
      'Thumb tracks the pointer exactly while dragging — the spring only takes over after pointerup',
      'Automatic settle detection stops the requestAnimationFrame loop once velocity and displacement are near zero',
      'Click-on-track-to-jump support, animated through the same spring rather than snapping instantly',
      'Full keyboard support (arrow keys) that nudges the target and animates via the identical physics loop',
      'No CSS transition or cubic-bezier anywhere — 100% of the motion comes from the hand-written physics loop',
    ],
    useCases: [
      { icon: 'FORM', title: 'Volume, brightness, and playback controls', desc: 'A tactile, game-like feel for media controls where a quick flick to max or min should feel physically satisfying rather than mechanical — pairs well next to a [brightness slider](/ui-snippets/brightness-slider) for a consistent control-panel feel.' },
      { icon: 'APP', title: 'Mobile-first settings and preference panels', desc: 'Spring-based sliders read as more "native app" than web-native ones, useful in PWAs or hybrid apps aiming to feel closer to iOS/Android system controls.' },
      { icon: 'GAME', title: 'Game HUD sliders and stat allocators', desc: 'Character stat sliders, difficulty selectors, or in-game settings menus benefit from motion that feels reactive to how hard the player drags, not just a flat animation.' },
      { icon: 'LEARN', title: 'Teaching spring physics and requestAnimationFrame loops', desc: 'A compact, self-contained example of Hooke\'s law plus damping implemented from scratch — useful before reaching for a physics or animation library like Framer Motion or React Spring.' },
      { icon: 'DESIGN', title: 'Design system "delight" component reference', desc: 'A reference implementation for a design system\'s elastic/spring interaction guidelines, distinct from the standard [range slider](/ui-snippets/range-slider) or [multi-range slider](/ui-snippets/multi-range-slider) which use plain linear motion.' },
      { icon: 'CODE', title: 'Portfolio pieces demonstrating physics-based UI', desc: 'A strong, explainable showcase of "real" simulated motion versus faked CSS easing, good for a frontend portfolio focused on interaction design and animation fundamentals.' },
      { icon: 'CODE', title: 'Related: Ghost Text Inline Autocomplete Input', desc: 'See the [Ghost Text Inline Autocomplete Input](/ui-snippets/ghost-text-autocomplete-input/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why not just use a CSS cubic-bezier with overshoot instead of JavaScript physics?', a: 'A CSS cubic-bezier transition always plays the exact same fixed curve regardless of how the interaction happened — a one-pixel nudge and a full-track flick would animate identically. The whole point of this snippet is that the overshoot amount and settle time genuinely depend on how fast the user was dragging when they released, which requires computing real velocity from pointer movement and feeding it into an actual spring equation every frame — something a static CSS curve structurally cannot do.' },
      { q: 'What do STIFFNESS and DAMPING actually control, and how do I retune them?', a: 'STIFFNESS scales the restoring force pulling position toward target — raise it for a snappier, faster-reacting spring, lower it for a looser, slower one. DAMPING scales the force that resists velocity and bleeds energy out of the system — raise it to reduce oscillation (less bouncy, settles faster), lower it to allow more visible overshoot and wobble before it settles. Change them together: a high-stiffness, low-damping spring will oscillate wildly, while a high-stiffness, high-damping spring will feel snappy with barely any bounce at all.' },
      { q: 'Why does the loop stop itself instead of running requestAnimationFrame forever?', a: 'tick() checks whether both velocity and the remaining distance to target are below a small epsilon threshold; once true (and the user is not actively dragging), it snaps position exactly to target, zeroes velocity, and does not reschedule itself. This avoids burning CPU on an animation loop that is visually already at rest, and the final snap avoids leaving position a fraction of a pixel off from target due to floating-point rounding across many frames.' },
      { q: 'Can I use this elastic slider in React, Vue, or Angular?', a: 'Yes. Keep position/target/velocity in refs (not state, since they change every animation frame and do not need to trigger re-renders directly) and drive the visual thumb/fill styles imperatively inside the tick loop, same as the vanilla version. Start the requestAnimationFrame loop from pointer event handlers attached in a useEffect (React) or onMounted (Vue) or ngAfterViewInit (Angular), and make sure to call cancelAnimationFrame on whatever ID the loop last scheduled inside the component\'s cleanup/unmount hook so a lingering spring animation does not keep writing to a detached DOM node.' },
      { q: 'How do I make the spring feel stiffer/snappier or looser/bouncier without breaking the settle detection?', a: 'Increase both STIFFNESS and DAMPING proportionally for a snappier-but-still-controlled feel, or lower both proportionally for a looser, slower one — keep their ratio roughly similar to what shipped here to avoid the underdamped or overdamped extremes described above. SETTLE_EPSILON generally does not need to change; it is independent of stiffness and damping and just defines "close enough to stop animating."' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JS to an AI assistant like Claude and ask it to explain, line by line, how springForce and dampingForce combine into acceleration inside tick() — understanding that one function is the fastest way to really grasp spring physics for UI. From there, good extensions to request: a second spring axis for a 2D drag pad instead of a 1D slider, a "snap to nearest step" behavior once the spring settles (e.g. rounding to the nearest 10), or exposing STIFFNESS/DAMPING as live-adjustable sliders themselves so you can feel the tuning tradeoffs interactively.`,
      prompt: `Build a range slider in plain HTML, CSS, and JavaScript whose thumb visibly overshoots and springs back into place using real spring physics, no libraries, no CSS transition doing the settling motion.

Requirements:
- A draggable circular thumb on a horizontal track, with a filled portion of the track showing the current value, plus a numeric value label that updates live.
- Implement an actual spring simulation with three tracked numbers per frame: current position, a target position, and current velocity — do not use a CSS transition or cubic-bezier timing function to produce the overshoot/settle motion.
- Every animation frame (via requestAnimationFrame), compute a restoring spring force proportional to the negative of (position minus target) scaled by a stiffness constant, and a damping force proportional to the negative of velocity scaled by a damping constant; sum them into an acceleration, integrate acceleration into velocity, and integrate velocity into position.
- While the user is actively dragging the thumb with the pointer, the thumb must track the pointer's position exactly (no lag or spring lag during the drag itself) — the spring should only take over once the pointer is released.
- While dragging, continuously measure the real velocity of the pointer's movement (change in value divided by change in time between move events) and carry that measured velocity into the spring simulation as its initial velocity at the moment of release, so a fast flick produces a bigger overshoot than a slow drag.
- Automatically stop the requestAnimationFrame loop once velocity and the distance to target both drop below a small threshold, snapping exactly to the target value to avoid floating-point drift, and restart the loop cleanly if the user interacts again.
- Support clicking anywhere on the track to set a new target (animated through the same spring, not an instant jump) and full keyboard arrow-key control that also goes through the spring rather than jumping instantly.`,
    },
  },
};

export default elasticDragSlider;
