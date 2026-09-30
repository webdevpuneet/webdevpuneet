const webAnimationsApiPlayground = {
  id: 'web-animations-api-playground',
  title: 'Web Animations API (WAAPI) Playground',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="stage">
    <div class="stage-track">
      <div class="waapi-box" id="waapi-box">.animate()</div>
    </div>
  </div>

  <div class="status-bar">
    <div class="status-item">
      <span class="status-label">playState</span>
      <span class="status-value" id="play-state">idle</span>
    </div>
    <div class="status-item">
      <span class="status-label">currentTime</span>
      <span class="status-value" id="current-time">0ms</span>
    </div>
    <div class="status-item">
      <span class="status-label">playbackRate</span>
      <span class="status-value" id="playback-rate">1</span>
    </div>
  </div>

  <div class="controls-panel">
    <div class="control-group">
      <label for="duration-slider">Duration <span id="duration-label">1200ms</span></label>
      <input type="range" id="duration-slider" min="200" max="3000" step="100" value="1200">
    </div>
    <div class="control-group">
      <label for="easing-select">Easing</label>
      <select id="easing-select">
        <option value="linear">linear</option>
        <option value="ease" selected>ease</option>
        <option value="ease-in">ease-in</option>
        <option value="ease-out">ease-out</option>
        <option value="ease-in-out">ease-in-out</option>
        <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">cubic-bezier (back)</option>
        <option value="cubic-bezier(0.34, 1.56, 0.64, 1)">cubic-bezier (bounce-ish)</option>
      </select>
    </div>
    <div class="control-group">
      <label>Keyframe preset</label>
      <div class="preset-row">
        <button class="preset-btn active" data-preset="slide">Slide + fade</button>
        <button class="preset-btn" data-preset="spin">Spin + scale</button>
        <button class="preset-btn" data-preset="bounce">Bounce</button>
      </div>
    </div>
  </div>

  <div class="transport">
    <button class="btn" id="btn-play">Play</button>
    <button class="btn" id="btn-pause">Pause</button>
    <button class="btn" id="btn-reverse">Reverse</button>
    <button class="btn" id="btn-finish">Finish</button>
    <button class="btn btn-outline" id="btn-cancel">Cancel</button>
  </div>

  <pre class="code-out" id="code-out">element.animate([...], { duration: 1200, easing: 'ease' })</pre>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; }

.demo-wrap { max-width: 640px; margin: 0 auto; padding: 32px 20px 48px; display: flex; flex-direction: column; gap: 18px; }

.stage {
  background: #1e293b; border-radius: 16px; padding: 40px 20px;
  min-height: 160px; display: flex; align-items: center;
  border: 1px solid #334155;
}
.stage-track { width: 100%; position: relative; height: 60px; }
.waapi-box {
  position: absolute; left: 0; top: 0;
  width: 60px; height: 60px; border-radius: 14px;
  background: linear-gradient(135deg, #818cf8, #6366f1);
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; color: #fff; text-align: center;
  box-shadow: 0 8px 24px rgba(99,102,241,0.4);
}

.status-bar { display: flex; gap: 10px; }
.status-item {
  flex: 1; background: #1e293b; border: 1px solid #334155; border-radius: 10px;
  padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;
}
.status-label { font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.status-value { font-size: 14px; font-weight: 700; color: #a5b4fc; font-variant-numeric: tabular-nums; }

.controls-panel { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column; gap: 14px; }
.control-group { display: flex; flex-direction: column; gap: 8px; }
.control-group label { font-size: 12px; font-weight: 600; color: #94a3b8; display: flex; justify-content: space-between; }
.control-group input[type="range"] { accent-color: #6366f1; }
.control-group select {
  background: #0f172a; color: #e2e8f0; border: 1px solid #334155; border-radius: 8px;
  padding: 8px 10px; font-size: 13px; font-family: inherit;
}

.preset-row { display: flex; gap: 8px; flex-wrap: wrap; }
.preset-btn {
  background: #0f172a; color: #94a3b8; border: 1px solid #334155; border-radius: 8px;
  padding: 7px 12px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
  transition: all 0.15s;
}
.preset-btn:hover { border-color: #6366f1; color: #c7d2fe; }
.preset-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.transport { display: flex; gap: 8px; flex-wrap: wrap; }
.btn {
  flex: 1; min-width: 80px; padding: 10px 14px; font-size: 13px; font-weight: 600;
  border-radius: 8px; cursor: pointer; font-family: inherit; border: none;
  background: #6366f1; color: #fff; transition: background 0.15s;
}
.btn:hover { background: #4f46e5; }
.btn-outline { background: transparent; border: 1.5px solid #475569; color: #94a3b8; }
.btn-outline:hover { border-color: #f87171; color: #f87171; background: transparent; }

.code-out {
  background: #0f172a; border: 1px solid #334155; border-radius: 10px;
  padding: 14px 16px; font-size: 11px; font-family: 'SFMono-Regular', Consolas, monospace;
  color: #86efac; overflow-x: auto; white-space: pre-wrap; line-height: 1.6;
}`,

  js: `const box = document.getElementById('waapi-box');
const durationSlider = document.getElementById('duration-slider');
const durationLabel = document.getElementById('duration-label');
const easingSelect = document.getElementById('easing-select');
const presetBtns = document.querySelectorAll('.preset-btn');
const codeOut = document.getElementById('code-out');

const playStateEl = document.getElementById('play-state');
const currentTimeEl = document.getElementById('current-time');
const playbackRateEl = document.getElementById('playback-rate');

const KEYFRAME_PRESETS = {
  slide: [
    { transform: 'translateX(0) scale(1)', opacity: 1, offset: 0 },
    { transform: 'translateX(220px) scale(1.15)', opacity: 0.6, offset: 0.5 },
    { transform: 'translateX(440px) scale(1)', opacity: 1, offset: 1 },
  ],
  spin: [
    { transform: 'translateX(0) rotate(0deg) scale(1)' },
    { transform: 'translateX(220px) rotate(360deg) scale(1.4)' },
    { transform: 'translateX(440px) rotate(720deg) scale(1)' },
  ],
  bounce: [
    { transform: 'translateX(0) translateY(0)', offset: 0 },
    { transform: 'translateX(150px) translateY(-40px)', offset: 0.3 },
    { transform: 'translateX(300px) translateY(0)', offset: 0.6 },
    { transform: 'translateX(440px) translateY(-14px)', offset: 0.85 },
    { transform: 'translateX(440px) translateY(0)', offset: 1 },
  ],
};

let currentPreset = 'slide';
let animation = null;

function buildAnimation() {
  const duration = Number(durationSlider.value);
  const easing = easingSelect.value;
  const keyframes = KEYFRAME_PRESETS[currentPreset];

  if (animation) animation.cancel();

  // The actual Web Animations API call
  animation = box.animate(keyframes, {
    duration,
    easing,
    fill: 'forwards',
  });

  animation.pause();
  animation.addEventListener('finish', refreshStatus);
  animation.addEventListener('cancel', refreshStatus);

  updateCodeOutput(keyframes, duration, easing);
  refreshStatus();
  return animation;
}

function updateCodeOutput(keyframes, duration, easing) {
  codeOut.textContent =
    'const anim = element.animate(\\n' +
    '  ' + JSON.stringify(keyframes, null, 2).split('\\n').join('\\n  ') + ',\\n' +
    '  { duration: ' + duration + ', easing: \\'' + easing + '\\', fill: \\'forwards\\' }\\n' +
    ');';
}

function refreshStatus() {
  if (!animation) return;
  playStateEl.textContent = animation.playState;
  const t = animation.currentTime;
  currentTimeEl.textContent = (typeof t === 'number' ? Math.round(t) : 0) + 'ms';
  playbackRateEl.textContent = animation.playbackRate;
}

// Poll currentTime while playing (WAAPI does not fire continuous time events)
setInterval(() => {
  if (animation && animation.playState === 'running') refreshStatus();
}, 100);

durationSlider.addEventListener('input', () => {
  durationLabel.textContent = durationSlider.value + 'ms';
  buildAnimation();
});

easingSelect.addEventListener('change', buildAnimation);

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPreset = btn.dataset.preset;
    buildAnimation();
  });
});

document.getElementById('btn-play').addEventListener('click', () => {
  if (!animation || animation.playState === 'finished') buildAnimation();
  animation.play();
  refreshStatus();
});

document.getElementById('btn-pause').addEventListener('click', () => {
  if (animation) { animation.pause(); refreshStatus(); }
});

document.getElementById('btn-reverse').addEventListener('click', () => {
  if (animation) { animation.reverse(); refreshStatus(); }
});

document.getElementById('btn-finish').addEventListener('click', () => {
  if (animation) { animation.finish(); refreshStatus(); }
});

document.getElementById('btn-cancel').addEventListener('click', () => {
  if (animation) { animation.cancel(); buildAnimation(); }
});

buildAnimation();`,

  seo: {
    title: 'Web Animations API (WAAPI) Playground — Free JS Snippet',
    description: 'Interactive Web Animations API demo: real element.animate() calls with play, pause, reverse and live playState. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Web Animations API (WAAPI) — element.animate(), Animation Objects, and Programmatic Motion Control',
      description: `Most CSS animation on the web is declarative and static: you write an \`@keyframes\` block, attach it via \`animation-name\`, and the browser runs it start to finish with limited runtime control. The Web Animations API (WAAPI) inverts this — it exposes animation as a first-class JavaScript object you construct, inspect, and control frame-by-frame, using the exact same underlying compositor engine that powers native CSS animations. This snippet is a working playground built entirely around the real \`Element.animate()\` method, not CSS classes toggled by JS, so every control you touch maps directly to an actual WAAPI call.

**The animate() method signature**

Calling \`element.animate(keyframes, options)\` returns an \`Animation\` object immediately and begins running the animation (unless paused). The first argument is an array of keyframe objects — each one a plain JS object of CSS property/value pairs, optionally with an explicit \`offset\` between 0 and 1 to pin a keyframe at a specific point in the timeline (used here in the "Bounce" preset to place an overshoot at 85% through the animation rather than relying on even spacing). The second argument is an options object or plain number (shorthand for duration): this demo passes \`{ duration, easing, fill: 'forwards' }\`, where \`fill: 'forwards'\` tells the browser to retain the final keyframe's computed styles after the animation completes, rather than snapping back to the pre-animation state — the single most common source of "my WAAPI animation flickers back to start" bugs when omitted.

**The Animation object's playback control surface**

The object returned by \`animate()\` exposes a genuine transport control API that mirrors \`<video>\` or \`<audio>\`: \`.play()\` resumes or starts playback, \`.pause()\` freezes it at the current time, \`.reverse()\` flips the effective playback direction (WAAPI internally negates \`playbackRate\`), \`.finish()\` jumps immediately to the animation's end state and fires the \`finish\` event, and \`.cancel()\` aborts the animation and removes all applied effects, returning the element to its pre-animation styling. This demo wires all five directly to buttons — clicking Reverse mid-flight doesn't restart anything, it genuinely reverses the in-progress motion from wherever it currently is, which is something \`@keyframes\`-based CSS animations cannot do without manual class-swapping hacks.

**playState and currentTime: real introspection, not guesswork**

Unlike CSS animations, where JS can only detect state via \`animationstart\`/\`animationend\` events, WAAPI exposes \`animation.playState\` (one of \`idle\`, \`running\`, \`paused\`, \`finished\`) and \`animation.currentTime\` (the elapsed time in milliseconds along the timeline, settable and readable at any moment) as live, synchronously readable properties. This demo polls both every 100ms with \`setInterval\` and displays them in the status bar, because WAAPI does not fire a continuous "tick" event — reading \`currentTime\` is the correct pattern for building a scrub bar or progress indicator, the same technique underlying custom video-timeline UIs.

**Why WAAPI matters for 2025/2026 UI work**

As interfaces get more interactive — drag-to-dismiss cards, scroll-linked reveals, gesture-driven transitions — animations increasingly need to respond to real-time input rather than run ballistically to completion. WAAPI's ability to construct an animation once and then scrub, reverse, or interrupt it based on pointer position (setting \`animation.currentTime\` directly from a drag delta) is the mechanism behind many modern interruptible-gesture interfaces, and it composes cleanly with the browser's compositor thread for the same off-main-thread performance CSS animations get, when animating compositor-friendly properties like \`transform\` and \`opacity\`.

**Browser support**

WAAPI's core \`animate()\` method, the \`Animation\` interface, and all playback controls used in this demo have been supported in Chrome, Edge, Firefox, and Safari since 2020, making it fully safe for production use without polyfills as of 2025/2026. Advanced features like \`ScrollTimeline\` (scroll-driven WAAPI animations) have narrower, more recent support and are a natural next step once the fundamentals here — keyframes, options, and the transport controls — are solid.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Play the default animation', text: 'Click Play to run the "Slide + fade" preset. Watch the playState readout move from idle to running, and currentTime climb from 0ms toward the configured duration, both read directly off the live Animation object returned by box.animate().' },
        { title: 'Pause and inspect mid-flight', text: 'Click Pause while the box is moving. playState immediately reports paused and currentTime freezes at whatever millisecond it was interrupted at — this is animation.pause() being called on the real Animation instance, not a CSS class removal.' },
        { title: 'Reverse the in-progress motion', text: 'Click Reverse at any point, including mid-animation. The box genuinely reverses direction from its current position rather than restarting, because animation.reverse() flips the effective playbackRate rather than replaying from offset 0.' },
        { title: 'Swap easing and duration live', text: 'Move the Duration slider or change the Easing dropdown to rebuild the animation with new options — including a cubic-bezier() easing that produces an overshoot "back" effect. The code output panel updates to show the exact element.animate() call being constructed, including the raw keyframe array.' },
        { title: 'Switch keyframe presets', text: 'Click "Spin + scale" or "Bounce" to swap the KEYFRAME_PRESETS array passed to animate(). Notice the Bounce preset uses explicit offset values (0, 0.3, 0.6, 0.85, 1) on each keyframe object to place the overshoot precisely, instead of relying on even spacing.' },
        { title: 'Export and adapt the pattern', text: 'Click JSX or Vue to export. In your app, replace box with a ref to any DOM node, define your own keyframe array, and call .play()/.pause()/.reverse() from gesture handlers (pointermove, drag) instead of buttons for interruptible, input-driven motion.' },
      ],
    },
    features: [
      'Real Element.animate(keyframes, options) call — not CSS class toggling — returns a genuine Animation object',
      'fill: \'forwards\' retains the final keyframe state after completion instead of snapping back',
      'Offset-pinned keyframes in the Bounce preset place an overshoot precisely at 85% of the timeline',
      'Transport controls wired directly to .play() / .pause() / .reverse() / .finish() / .cancel()',
      'Live playState and currentTime readouts polled via setInterval since WAAPI has no continuous tick event',
      'cubic-bezier() easing options demonstrate custom timing functions beyond the CSS keyword set',
      'Dynamic code-output panel serializes the actual keyframes array and options object being used',
      'finish and cancel event listeners keep the status bar in sync with animation lifecycle changes',
    ],
    useCases: [
      { icon: 'APP', title: 'Interruptible drag-to-dismiss and swipe gestures', desc: 'Card-dismiss and bottom-sheet interactions need an animation that can be reversed or scrubbed mid-gesture based on live pointer position — exactly what animation.reverse() and setting animation.currentTime directly enable. Build the dismiss animation once with animate(), then drive its currentTime from pointermove deltas instead of always running it ballistically to completion.' },
      { icon: 'FLOW', title: 'Multi-step onboarding or product-tour sequences', desc: 'Chaining several animate() calls with .finished promises (each Animation exposes a .finished Promise that resolves on completion) lets you sequence a guided tour of UI highlights precisely, with the ability to let a user skip ahead by calling .finish() on the current step instantly rather than waiting out the timer.' },
      { icon: 'LEARN', title: 'Teaching the Animation object model versus CSS keyframes', desc: 'This playground is designed to make the WAAPI object model tangible: every button press maps to one documented method call, and the code-output panel shows the literal JS being executed. It is a good companion for developers moving from @keyframes-based animation toward JS-driven, input-responsive motion for the first time.' },
      { icon: 'DESIGN', title: 'Micro-interaction prototyping with instant easing feedback', desc: 'Designers and developers tuning a hover or entrance animation\'s feel can swap easing and duration live and immediately see and read the effect, rather than editing a CSS file and reloading. The same easing dropdown pattern works well alongside the [Custom Cubic-Bezier Easing Visualizer](/ui-snippets/raf-fps-meter) for comparing perceived motion quality.' },
      { icon: 'CODE', title: 'Replacing animation libraries for simple, one-off sequences', desc: 'Libraries like GSAP add meaningful bundle weight for teams that only need a handful of coordinated transform/opacity animations with play/pause/reverse control. WAAPI provides that control natively in every modern browser with zero dependencies, making it a reasonable native replacement for simpler animation needs.' },
      { icon: 'FORM', title: 'Loading and success-state transitions on form submission', desc: 'A submit button icon that morphs, spins, then settles into a checkmark state benefits from WAAPI\'s .finish() and fill: forwards behavior — start the spin animation on submit, then call .finish() the instant the network response arrives so the final frame is guaranteed to render correctly regardless of exact timing.' },
    ],
    faqs: [
      { q: 'What does fill: \'forwards\' actually do and why is it needed?', a: 'By default, a Web Animations API animation\'s visual effect is removed the instant it reaches the finished state, and the element snaps back to whatever its styles compute to without the animation — this is the fill mode "none". Setting fill: \'forwards\' in the options object tells the browser to keep applying the final keyframe\'s computed styles after the animation finishes, so a box you animated to translateX(440px) stays at 440px instead of visibly jumping back to 0. This demo sets it explicitly on every animate() call for exactly that reason.' },
      { q: 'How is animation.reverse() different from replaying the keyframes backward?', a: 'reverse() does not restart the animation or swap the keyframe array — it flips the sign of the Animation\'s effective playbackRate and, if the animation was idle, first plays it forward to establish a starting point. Called mid-flight, it continues from the current currentTime value but now counting down instead of up, which is why clicking Reverse in this demo visibly changes the box\'s direction from wherever it currently sits rather than jumping back to the start.' },
      { q: 'Why do I need to poll currentTime instead of listening for an event?', a: 'The Web Animations API deliberately does not fire a per-frame "tick" event for performance reasons — animations can run on the compositor thread independent of main-thread JavaScript. To display live progress (a scrub bar, a percentage, or the currentTime readout in this demo), the standard pattern is polling animation.currentTime on an interval (this demo uses 100ms) or reading it inside a requestAnimationFrame loop for smoother visual updates.' },
      { q: 'Can I animate properties other than transform and opacity with WAAPI?', a: 'Yes — animate() accepts any animatable CSS property in its keyframe objects, including color, width, or border-radius, exactly like @keyframes CSS. However, only transform and opacity (and a few others like filter) can typically run on the compositor thread without triggering layout or paint on every frame, so for the smoothest performance, especially on lower-powered devices, prefer transform-based keyframes as this demo does, reserving other properties for less performance-critical animations.' },
      { q: 'Is the Web Animations API safe to use in production without a polyfill?', a: 'Yes, as of 2025/2026. Element.animate(), the Animation interface, and all playback controls (.play, .pause, .reverse, .finish, .cancel) used in this demo have shipped in Chrome, Edge, Firefox, and Safari since roughly 2020, giving essentially universal support among evergreen browsers. Only newer additions like ScrollTimeline-driven animations have narrower support and would need feature detection.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to walk through what happens internally when you click Reverse mid-animation versus clicking Cancel then Play again — the distinction between manipulating an existing Animation object's playbackRate versus discarding and recreating one is easy to get wrong in real code. You could also ask it to add a progress scrub bar that lets you drag to set animation.currentTime directly, turning this from a playback demo into a true timeline editor, or to add a .finished promise chain that plays the "Bounce" preset automatically after "Slide + fade" completes, demonstrating sequenced animation composition. It's also worth asking whether a given keyframe set would benefit from being restructured as a CSS @keyframes animation instead, since the assistant can reason about the tradeoffs between declarative and WAAPI-driven approaches for your specific use case.`,
      prompt: `Build an interactive Web Animations API (WAAPI) playground in plain HTML, CSS, and JavaScript, using the real element.animate() method — no CSS @keyframes classes toggled by JS.

Requirements:
- A visual stage containing one animatable box, animated exclusively via calls to element.animate(keyframesArray, optionsObject), storing the returned Animation object in a variable so it can be controlled afterward.
- At least 3 distinct keyframe presets (selectable via buttons) with visually different motion paths, with at least one preset using explicit offset values on individual keyframes to pin a specific state at a non-even point in the timeline.
- A duration slider (in milliseconds) and an easing dropdown (including at least one keyword like ease-in-out and one custom cubic-bezier() value) that rebuild the animation with new options whenever changed.
- Five transport buttons wired to the real Animation object methods: play(), pause(), reverse(), finish(), and cancel() — each must visibly and correctly affect the in-progress animation, including reverse() working correctly when clicked mid-animation rather than only from a stopped state.
- A live status readout showing the Animation object's current playState and currentTime (in milliseconds), updated on an interval since WAAPI does not provide a continuous progress event.
- Use fill: 'forwards' in the animation options so the box retains its final position after the animation completes instead of snapping back, and explain in a comment why this is necessary.
- A read-only code output panel that reflects the actual keyframes array and options object currently being used, so the underlying API call is always visible alongside its visual result.`,
    },
  },
};

export default webAnimationsApiPlayground;
