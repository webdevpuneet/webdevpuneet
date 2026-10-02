const orbitLoader = {
  id: 'orbit-loader',
  title: 'Orbit Loader',
  lastmod: '2026-07-18',
  category: 'loaders',
  html: `<div class="ob-stage">
  <div class="ob-loader" id="obLoader" role="status" aria-label="Loading">
    <div class="ob-core"></div>
    <div class="ob-orbit ob-o1"><span class="ob-planet"></span></div>
    <div class="ob-orbit ob-o2"><span class="ob-planet"></span></div>
    <div class="ob-orbit ob-o3"><span class="ob-planet"></span></div>
  </div>
  <div class="ob-controls">
    <button type="button" class="ob-chip is-on" data-speed="1">1x</button>
    <button type="button" class="ob-chip" data-speed="1.8">Fast</button>
    <button type="button" class="ob-chip" data-speed="0.5">Slow</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;display:flex}
.ob-stage{margin:auto;display:flex;flex-direction:column;align-items:center;gap:30px;padding:48px}

.ob-loader{position:relative;width:120px;height:120px;--spd:1}
.ob-core{position:absolute;inset:0;margin:auto;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#a5b4fc,#6366f1);box-shadow:0 0 18px rgba(99,102,241,.7);animation:obPulse calc(2s / var(--spd)) ease-in-out infinite}
.ob-orbit{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(148,163,184,.18)}
.ob-o1{transform:rotate(0deg);animation:obSpin calc(1.6s / var(--spd)) linear infinite}
.ob-o2{inset:18px;animation:obSpin calc(2.6s / var(--spd)) linear infinite reverse}
.ob-o3{inset:36px;animation:obSpin calc(3.4s / var(--spd)) linear infinite}
.ob-planet{position:absolute;top:-5px;left:50%;width:11px;height:11px;border-radius:50%;transform:translateX(-50%)}
.ob-o1 .ob-planet{background:#22d3ee;box-shadow:0 0 10px #22d3ee}
.ob-o2 .ob-planet{background:#f59e0b;box-shadow:0 0 10px #f59e0b;width:9px;height:9px}
.ob-o3 .ob-planet{background:#f472b6;box-shadow:0 0 10px #f472b6;width:8px;height:8px}

@keyframes obSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes obPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.25);opacity:.8}}

.ob-controls{display:flex;gap:8px}
.ob-chip{background:#1e293b;border:1px solid #334155;color:#cbd5e1;border-radius:20px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
.ob-chip.is-on{background:#6366f1;border-color:#6366f1;color:#fff}
@media (prefers-reduced-motion:reduce){.ob-orbit,.ob-core{animation:none}}`,

  js: `var loader = document.getElementById('obLoader');
var chips = Array.prototype.slice.call(document.querySelectorAll('.ob-chip'));
chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    chips.forEach(function (c) { c.classList.remove('is-on'); });
    chip.classList.add('is-on');
    loader.style.setProperty('--spd', chip.getAttribute('data-speed'));
  });
});`,

  seo: {
    title: 'Orbit Loader — Animated Orbiting Dots Spinner',
    description: `A pure-CSS orbit loader with planets circling a pulsing core, a speed control and reduced-motion support. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Orbit Loader — Pure-CSS Orbiting Spinner with Speed Control',
      description: `An orbit loader is a loading spinner styled as planets circling a glowing core — a more characterful alternative to a plain ring while staying lightweight and CSS-only. This snippet builds one with three independent orbits, a pulsing core, a speed control via a CSS variable, and reduced-motion support, in plain HTML and CSS with a sprinkle of JavaScript.

**Orbits as rotating rings**

Each orbit is a circular element that rotates with a CSS \`@keyframes\` spin, and a small "planet" dot sits at the top of each ring. Because the planet is a child of the rotating ring, spinning the ring carries the planet around its circular path — no per-frame trigonometry. Nesting three rings at decreasing \`inset\` gives concentric orbits, and giving each a different duration (and alternating direction) makes the motion feel organic rather than mechanical.

**A pulsing core**

In the centre, a radial-gradient core gently scales and fades on its own loop with a glowing box-shadow, anchoring the composition and adding life. The whole loader is built from a handful of divs with no images or SVG, so it's tiny and crisp at any size.

**Speed via a CSS variable**

All animation durations are expressed as a base time divided by a \`--spd\` custom property (e.g. \`calc(1.6s / var(--spd))\`). Changing one variable on the loader re-times every orbit and the pulse together, proportionally — so the speed control is a single \`style.setProperty('--spd', …)\` call, and a designer can re-tune the whole loader by editing one number. This is a clean demonstration of CSS variables driving coordinated animation.

**Accessible and motion-safe**

The loader is marked \`role="status"\` with an \`aria-label\`, so assistive tech announces that content is loading rather than ignoring a decorative spinner. A \`prefers-reduced-motion\` media query stops the animation for users who opt out, leaving a static, still-meaningful graphic — the responsible default for any looping animation.

**Drop-in and themeable**

Colours, sizes, orbit count, and speeds are all CSS, so restyling to match a brand or simplifying to two orbits takes minutes. It's a polished, dependency-free reference for a distinctive loading state that's still feather-light.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML and CSS', text: `An orbit loader renders with three orbiting dots and a pulsing core.` },
      { title: 'Drop it in', text: `Show it while content or a request is loading.` },
      { title: 'Set the speed', text: `Use the chips, or set the --spd variable from your code.` },
      { title: 'Recolor', text: `Change each planet and the core gradient to match your brand.` },
      { title: 'Adjust orbits', text: `Add or remove an orbit ring and tune its duration.` },
      { title: 'Respect motion', text: `It already stops under prefers-reduced-motion.` },
    ] },
    features: [
      { title: 'Orbiting planets', text: `Dots ride rotating rings — no per-frame math.` },
      { title: 'Concentric orbits', text: `Three nested rings at different speeds and directions.` },
      { title: 'Pulsing core', text: `A glowing center scales and fades on its own loop.` },
      { title: 'CSS-variable speed', text: `One --spd variable re-times every animation proportionally.` },
      { title: 'Status role', text: `role=status + aria-label announce loading.` },
      { title: 'Reduced-motion safe', text: `Animation disables for prefers-reduced-motion.` },
      { title: 'Tiny and crisp', text: `Built from divs — no images or SVG.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no spinner dependency.` },
    ],
    useCases: [
      { title: 'Page and route loading', text: 'Replace a plain ring with a characterful spinner over a [loading overlay](/ui-snippets/loading-overlay/), using three nested orbits at different speeds.' },
      { title: 'Async button states', text: 'Pair with a [loading button](/ui-snippets/loading-button/) for longer operations, where a pulsing core draws attention while work continues.' },
      { title: 'Boot and splash screens', text: 'Give a first paint some personality, with planets riding rotating rings so no per-frame JavaScript is needed.' },
      { title: 'Empty-state background work', text: 'Show background activity next to an [empty state](/ui-snippets/empty-state/), while a single `--spd` variable retimes every animation proportionally.' },
      { title: 'Nested rotation reference', text: 'Study how nested rotating wrappers create orbits cheaply, and how reduced-motion support turns the spin off for users who prefer it.' },
      { icon: 'CODE', title: 'Related: Skeleton Chat Message Loader', desc: 'See the [Skeleton Chat Message Loader](/ui-snippets/loader-skeleton-chat-messages/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the planets orbit without JavaScript?', a: `Each orbit is a ring element that rotates via a CSS keyframe animation, and the planet dot is a child positioned at the top of that ring. When the ring rotates, the child rotates with it around the center, tracing a circle — so the orbit is pure CSS transform, with no requestAnimationFrame or trigonometry. Nesting rings at smaller insets creates concentric orbits.` },
      { q: 'How does the speed control work?', a: `Every animation duration is written as a base time divided by a --spd CSS variable, like calc(1.6s / var(--spd)). Setting --spd on the loader (the chips call style.setProperty) re-times all orbits and the core pulse together and proportionally, so the whole loader speeds up or slows down in sync from a single value. It is a neat example of variables coordinating multiple animations.` },
      { q: 'Is it accessible?', a: `The loader has role="status" and an aria-label, so screen readers announce that something is loading instead of treating it as a meaningless decoration. It also respects prefers-reduced-motion, disabling the animation for users who are sensitive to motion while leaving a static graphic, which is the responsible way to ship any looping animation.` },
      { q: 'Can I change the number of orbits or colors?', a: `Yes. Add or remove an .ob-orbit element (with its planet) and give it an inset and animation duration; everything is CSS. Colors are set per planet and on the core's radial gradient, so recoloring to a brand palette or simplifying to two orbits takes a few lines and no logic changes.` },
      { q: 'How do I use this orbit loader in React, Vue, or Angular?', a: `Render the markup as a small component and toggle it while a loading flag is true. Expose speed as a prop that sets the --spd CSS variable via an inline style. The animations are pure CSS, so they port directly, and prefers-reduced-motion still applies. Tailwind users can apply sizing and colors with utilities and keep the keyframes in the stylesheet.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace every calc() by hand to see how the timing holds together. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely how a single --spd custom property, referenced inside calc(1.6s / var(--spd)) on three different orbit rings and the core pulse, keeps every animation proportionally in sync when the speed chips call setProperty, or why the ob-o2 ring adds the reverse keyword while the others don't. The same assistant can help optimize it — ask whether running three concurrent infinite CSS animations is meaningfully cheaper than a single requestAnimationFrame driving all three via transform, especially on lower-powered devices. It's also useful for extending the loader: have it add a fourth orbit with its own inset and duration, wire the core's pulse color to reflect a loading-progress percentage, or expose the speed chips as a prop-driven component instead of hardcoded buttons. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "orbit loader" spinner in plain HTML, CSS, and a small amount of JavaScript using only CSS keyframe animations and a custom property for speed control — no requestAnimationFrame, no JS-driven positioning math.

Requirements:
- A central pulsing "core" element using a radial-gradient background and a glowing box-shadow, animated with a CSS keyframe that scales it up and fades its opacity partway through the loop and back, set to loop infinitely.
- Three concentric ring elements nested at different inset values (so they form circles of decreasing radius), each with a small colored "planet" dot positioned at the top of the ring via absolute positioning, so that rotating the ring carries its planet around a circular path with zero per-frame JavaScript math.
- Give each ring a different animation duration and have at least one ring rotate in the reverse direction from the others, so the composition doesn't feel mechanically uniform.
- Express every animation's duration as a base time divided by a single shared CSS custom property (e.g. calc(1.6s / var(--spd))) defined once on the loader's root element, so changing that one custom property re-times the core pulse and all three orbit rings together, proportionally.
- Add a small row of speed-selector buttons (e.g. 1x, Fast, Slow) that, on click, mark themselves active and call element.style.setProperty to update the shared speed custom property on the loader.
- Mark the loader element with role="status" and an aria-label describing that content is loading, and add a prefers-reduced-motion media query that disables all the animations for users who have that preference set.`,
    },
  },
};

export default orbitLoader;
