const physics2dBurst = {
  id: 'physics-2d-burst',
  title: 'Physics2D Particle Burst',
  lastmod: '2026-07-18',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/Physics2DPlugin.min.js',
  ],
  html: `<div class="p2b-stage" id="p2bStage">
  <p class="p2b-hint">Click anywhere — every particle gets a velocity, an angle, and gravity.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh}
.p2b-stage{position:relative;width:100%;min-height:100vh;overflow:hidden;cursor:crosshair;background:radial-gradient(100% 100% at 50% 0%,#131a30,#0b0d16)}
.p2b-hint{position:absolute;inset:auto 0 22px 0;text-align:center;color:#5f6782;font-size:13px;letter-spacing:.05em;pointer-events:none}
.p2b-dot{position:absolute;top:0;left:0;border-radius:2px;pointer-events:none;will-change:transform}`,

  js: `gsap.registerPlugin(Physics2DPlugin);

var stage = document.getElementById('p2bStage');
var COLORS = ['#818cf8', '#22d3ee', '#f472b6', '#fbbf24', '#34d399', '#fb7185'];

stage.addEventListener('pointerdown', function (e) {
  var rect = stage.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  for (var i = 0; i < 28; i++) {
    var dot = document.createElement('div');
    dot.className = 'p2b-dot';
    var size = gsap.utils.random(5, 11);
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.background = COLORS[i % COLORS.length];
    stage.appendChild(dot);

    gsap.set(dot, { x: x, y: y, rotation: gsap.utils.random(0, 360) });

    // physics2D: no start/end values — just launch conditions.
    // Each particle gets a random speed and direction, then gravity
    // bends every trajectory into a parabola.
    gsap.to(dot, {
      duration: gsap.utils.random(1.2, 1.9),
      physics2D: {
        velocity: gsap.utils.random(180, 480),
        angle: gsap.utils.random(230, 310), // launch upward-ish
        gravity: 700
      },
      rotation: '+=random(-180, 180)',
      opacity: 0,
      ease: 'none',
      onComplete: function () { this.targets()[0].remove(); }
    });
  }
});`,

  seo: {
    title: 'Physics2D Particle Burst — Free GSAP Physics Snippet',
    description: `Click-anywhere confetti bursts via GSAP Physics2DPlugin — per-particle velocity, launch angle, and gravity form true parabolas. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Physics2D Particle Burst — Launch-Condition Animation, Not Keyframes',
      description: `Every other tween in this library animates from a start value to an end value. This one doesn't: click the stage and 28 particles are given *launch conditions* — a speed, a direction, and gravity — and GSAP's Physics2DPlugin (free on the CDN since 3.13) integrates the resulting parabolic trajectories. No destination is ever specified; where each particle lands is an outcome, not an input. That inversion is what makes physics-based motion feel organic where eased tweens feel staged.

**velocity + angle + gravity is the whole model**

\`physics2D\` takes initial velocity (pixels/second), a launch angle (degrees, where 270 is straight up in screen coordinates), and a gravity acceleration. Each frame it advances position along the velocity vector while gravity bends it downward — projectile motion, integrated for you. Randomizing velocity (180–480) and angle (230–310, an upward cone) per particle produces the natural spread of a real burst: fast particles fly wide and high, slow ones flop shortly, all on true parabolas rather than eased arcs.

**ease: 'none' is mandatory here**

Easing curves remap time — which would distort the physics. With \`ease: 'none'\`, simulation time runs linearly and the *acceleration itself* provides all the perceived easing: particles launch fast, hang weightless at apex, and accelerate into the fall. That's why physics motion needs no easing — gravity *is* the ease.

**gsap.utils.random powers the variety**

Size, color rotation, launch speed, direction, spin, and lifetime are all drawn from \`gsap.utils.random\` ranges — six randomized dimensions per particle. The string form \`rotation: '+=random(-180, 180)'\` shows GSAP's inline random syntax: a relative spin unique per particle without writing a loop variable. Uniform particles read as a rigid fountain; layered randomness reads as confetti.

**Particles are disposable DOM, cleaned by their own tween**

Each dot is a tiny absolutely-positioned div appended on click and removed in its own \`onComplete\` (via \`this.targets()[0]\`), so the DOM returns to baseline after every burst — no pooling, no leaks, no cap logic. At 28 particles per click with transform-and-opacity-only animation, even rapid clicking stays comfortably within compositor budget; past a few hundred simultaneous particles you'd graduate to canvas.

**pointerdown, not click, for responsiveness**

Bursts fire on \`pointerdown\` so the explosion lands at the instant of press — the 100–300ms a \`click\` waits for release makes celebratory feedback feel detached. Coordinates convert from client space to stage space via \`getBoundingClientRect\`, so the burst originates exactly under the pointer regardless of page scroll.

**Where physics beats confetti libraries**

Libraries like canvas-confetti own their canvas and their look. Physics2D applies the same math to *any tweenable target* — DOM nodes, SVG elements, WebGL objects — so branded shapes, emoji, or product icons can explode with identical physics, and every burst composes with the rest of your GSAP timeline system.

**Customizing it**

Narrow the angle cone for directional cannons, raise gravity for heavier debris, or swap dots for emoji spans. Related celebration and physics patterns: [confetti button](/ui-snippets/confetti-button/), [confetti celebration card](/ui-snippets/confetti-celebration-card/), gravity-and-collision in [physics balls](/ui-snippets/physics-balls/), and friction-based motion in [physics props pucks](/ui-snippets/physics-props-pucks/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and Physics2DPlugin from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A dark stage renders with a crosshair cursor.` },
      { title: 'Click anywhere', text: `28 particles burst upward from the pointer.` },
      { title: 'Watch the arcs', text: `Gravity bends every trajectory into a parabola.` },
      { title: 'Click rapidly', text: `Each burst cleans its own DOM on completion.` },
      { title: 'Tune the physics', text: `Velocity range, angle cone, and gravity are one object.` },
    ] },
    features: [
      { title: 'Launch-condition motion', text: `Speed, angle, gravity — no destinations.` },
      { title: 'True parabolas', text: `Integrated projectile trajectories per particle.` },
      { title: 'Gravity as easing', text: `ease: 'none' lets acceleration shape motion.` },
      { title: 'Six-way randomness', text: `Size, color, speed, angle, spin, lifetime.` },
      { title: 'Inline random strings', text: `'+=random(-180,180)' spins per target.` },
      { title: 'Self-cleaning DOM', text: `Every tween removes its own particle.` },
      { title: 'Press-instant bursts', text: `pointerdown beats click latency.` },
      { title: 'Any-target physics', text: `Works on DOM, SVG, or WebGL props.` },
    ],
    useCases: [
      { title: 'Order confirmation celebrations', text: 'Burst confetti when an order completes, giving each of 28 particles a launch speed, angle and gravity so they trace true parabolas.' },
      { title: 'Gamified quiz rewards', text: 'Reward taps in quizzes and next to a [streak tracker](/ui-snippets/streak-tracker/), where every click anywhere on the stage detonates a fresh burst.' },
      { title: 'Like explosions', text: 'Release particle hearts from a [like burst button](/ui-snippets/like-burst-button/), with six-way randomness in size, colour, speed, angle, spin and lifetime.' },
      { title: 'Interactive hero toys', text: 'Offer a landing page toy that cousins [physics balls](/ui-snippets/physics-balls/), using `ease: \'none\'` so gravity itself shapes the motion.' },
      { title: 'Friction contrasts', text: 'Compare with [physics props pucks](/ui-snippets/physics-props-pucks/), which show friction instead of gravity using the same launch-condition idea.' },
    ],
    faqs: [
      { q: 'How is physics2D different from a normal GSAP tween?', a: `Normal tweens interpolate between known start and end values. physics2D takes launch conditions — velocity in px/sec, an angle in degrees, and gravity — and integrates the trajectory frame by frame; the end position is an outcome, never an input. That's why bursts look organic: each particle follows a genuine parabola instead of an eased path to a chosen point.` },
      { q: 'Why must the ease be "none"?', a: `Easing remaps the tween's time, which would warp the simulation — gravity computed against distorted time stops looking like gravity. With linear time, the acceleration itself produces all perceived easing: fast launch, weightless hang at apex, accelerating fall. In physics animation, the forces are the easing curve.` },
      { q: 'What do the angle numbers mean?', a: `Degrees in screen space: 0 points right, 90 points down (y grows downward in browsers), 270 points straight up. The demo's 230–310 range is an 80° cone centered on "up," so particles spray skyward with natural spread. Narrow the range for a cannon, use 0–360 for an omnidirectional explosion.` },
      { q: 'Will spawning DOM particles on every click cause leaks or jank?', a: `Not at this scale: each burst appends 28 tiny divs animated only via transform and opacity (compositor work), and every tween's onComplete removes its own element, so the DOM returns to baseline within two seconds of the last click. Hundreds of simultaneous particles remain fine; thousands is when a canvas approach earns its complexity.` },
      { q: 'Can particles be emoji, logos, or SVG shapes?', a: `Yes — Physics2D animates transforms on any target, so swap the div for a span containing 🎉, an inline SVG star, or an img of your logo; the identical launch math applies. That's the practical edge over confetti libraries, which own their canvas and particle look: here your branded elements are the physics objects.` },
      { q: 'How do I use Physics2D bursts in React, Vue, or Angular?', a: `Register the plugin at module scope and fire bursts from a pointerdown handler that appends particles to a stage ref — imperative DOM is correct here, since routing 28 short-lived particles through framework state would re-render per burst for nothing. Add a cleanup that kills active tweens on unmount so removals don't target dead nodes. The stage styles map directly to Tailwind.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out why this tween has no destination values on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the physics2D object's velocity, angle, and gravity properties get integrated into a parabolic path each frame, and why ease: 'none' is mandatory rather than just a stylistic choice here. The same assistant can help optimize it, for example checking whether appending and removing 28 DOM particles per click stays cheap under rapid repeated clicking, or whether the random ranges for velocity, angle, and lifetime are actually producing the visual spread you want. It's also useful for extending the effect: ask it to swap the plain divs for emoji or SVG shapes, add a directional "cannon" mode with a narrower angle cone, or trigger a burst automatically on a milestone event instead of a click. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a click-anywhere particle burst effect in plain HTML, CSS, and vanilla JavaScript using GSAP's core engine plus its Physics2DPlugin (load both from a CDN) — the motion must come from physics launch conditions, not from animating to fixed end coordinates.

Requirements:
- A full-viewport stage element that listens for pointerdown (not click) and computes the pointer's position relative to the stage using getBoundingClientRect so the burst originates exactly under the cursor.
- On each pointerdown, create around 28 small absolutely-positioned div elements, each with a randomized size and a color picked from a fixed palette array, and append them to the stage at the click position with gsap.set.
- Animate each particle with GSAP's physics2D property object specifying a randomized velocity (a wide range, e.g. 180 to 480), a randomized launch angle constrained to an upward-facing cone (not a full 360-degree spread), and a constant gravity value — do not specify any target x/y coordinates; the end position must be an emergent result of the physics integration.
- The tween's ease must be set to 'none' (linear time), since the gravity value itself is what should produce all the visual acceleration and deceleration — explain in a code comment why adding a separate easing curve would distort the simulated physics.
- Each particle should also spin by a random relative rotation amount and fade its opacity to 0 over its lifetime, and its onComplete callback must remove its own DOM element so nothing accumulates after repeated clicks.
- Vary at least five different properties per particle at random (size, color, velocity, angle, rotation amount, duration) so a burst reads as organic confetti rather than a uniform fountain.`,
    },
  },
};

export default physics2dBurst;
