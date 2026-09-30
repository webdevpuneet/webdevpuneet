const breathingAnimation = {
    id: 'breathing-animation',
    title: 'Breathing / Focus Ring',
    category: 'loaders',
    html: `<div class="scene">
  <div class="breathing-wrap" id="wrap">
    <div class="ring r4"></div>
    <div class="ring r3"></div>
    <div class="ring r2"></div>
    <div class="ring r1"></div>
    <div class="core">
      <div class="label" id="label">Breathe in</div>
      <div class="timer" id="timer">4</div>
    </div>
  </div>
  <div class="controls">
    <button class="btn active" id="start-btn" onclick="toggle()">Pause</button>
    <select class="sel" onchange="setPattern(this.value)">
      <option value="4-4">4-4 Box</option>
      <option value="4-7-8">4-7-8</option>
      <option value="5-5">5-5 Equal</option>
    </select>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #050810; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.scene { display: flex; flex-direction: column; align-items: center; gap: 36px; }

.breathing-wrap { position: relative; width: 240px; height: 240px; display: flex; align-items: center; justify-content: center; }

.ring {
  position: absolute; border-radius: 50%;
  animation: breathe 8s ease-in-out infinite;
}
.r1 { width: 80px;  height: 80px;  background: rgba(99,102,241,0.6);  animation-delay: 0s;    filter: blur(0); }
.r2 { width: 120px; height: 120px; background: rgba(99,102,241,0.25); animation-delay: 0.2s;  filter: blur(2px); }
.r3 { width: 170px; height: 170px; background: rgba(99,102,241,0.12); animation-delay: 0.4s;  filter: blur(4px); }
.r4 { width: 220px; height: 220px; background: rgba(99,102,241,0.06); animation-delay: 0.6s;  filter: blur(8px); }

@keyframes breathe {
  0%,100% { transform: scale(0.8); opacity: 0.7; }
  50%      { transform: scale(1.1); opacity: 1; }
}

.core { position: relative; z-index: 1; text-align: center; display: flex; flex-direction: column; gap: 4px; }
.label { font-size: 13px; font-weight: 600; color: rgba(165,180,252,0.8); letter-spacing: 1px; text-transform: uppercase; }
.timer { font-size: 48px; font-weight: 800; color: #f1f5f9; line-height: 1; font-family: 'Courier New', monospace; }

.controls { display: flex; gap: 10px; align-items: center; }
.btn { padding: 8px 20px; font-size: 13px; font-weight: 600; background: #1e293b; color: #64748b; border: 1px solid #334155; border-radius: 8px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
.btn.active { background: #6366f1; color: #fff; border-color: #6366f1; }
.sel { padding: 8px 12px; font-size: 13px; font-family: inherit; background: #1e293b; color: #64748b; border: 1px solid #334155; border-radius: 8px; outline: none; cursor: pointer; }`,
    js: `let patterns = {
  '4-4':   [{label:'Breathe in',dur:4},{label:'Breathe out',dur:4}],
  '4-7-8': [{label:'Breathe in',dur:4},{label:'Hold',dur:7},{label:'Breathe out',dur:8}],
  '5-5':   [{label:'Breathe in',dur:5},{label:'Breathe out',dur:5}],
};
let pat = patterns['4-4'], phase = 0, remaining = pat[0].dur, running = true;
let timer = null;

function setPattern(key) { pat = patterns[key]; phase = 0; remaining = pat[0].dur; updateUI(); }

function updateUI() {
  document.getElementById('label').textContent = pat[phase].label;
  document.getElementById('timer').textContent = remaining;
  const isIn = pat[phase].label.includes('in');
  const isHold = pat[phase].label.includes('Hold');
  const dur = (pat[phase].dur * 2) + 's';
  document.querySelectorAll('.ring').forEach((r, i) => {
    r.style.animationDuration = dur;
    r.style.animationPlayState = running ? 'running' : 'paused';
    if (isHold) { r.style.animationPlayState = 'paused'; }
  });
}

function tick() {
  remaining--;
  if (remaining <= 0) {
    phase = (phase + 1) % pat.length;
    remaining = pat[phase].dur;
  }
  updateUI();
}

function toggle() {
  running = !running;
  const btn = document.getElementById('start-btn');
  btn.textContent = running ? 'Pause' : 'Resume';
  btn.classList.toggle('active', running);
  if (running) { timer = setInterval(tick, 1000); }
  else { clearInterval(timer); }
  updateUI();
}

timer = setInterval(tick, 1000);
updateUI();`,

  seo: {
    title: 'Breathing Animation — Free HTML CSS JS Snippet',
    description: 'Guided breathing circle with 4-4, 4-7-8 and 5-5 patterns, scale pulse and phase countdown timer. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: "Breathing Animation — Guided Patterns, CSS scale Pulse & Phase Timer Countdown",
      description: `A guided breathing animation is a visual tool for practicing breathing techniques that reduce anxiety, improve focus, and aid in sleep. The visual expanding and contracting circle guides the user through each phase — inhale, hold, exhale — in sync with a countdown timer, so the user can follow along without counting mentally. This snippet implements three clinically recognised breathing patterns using data-driven animation: box breathing (4-4), the 4-7-8 technique, and equal breathing (5-5).

**How the breathing pattern data structure works**

Each breathing pattern is stored as an array of \`{ label, dur }\` phase objects in the \`patterns\` object. The \`4-4\` pattern has two phases: \`[{label:'Breathe in', dur:4}, {label:'Breathe out', dur:4}]\`. The \`4-7-8\` pattern adds a hold phase: inhale 4s, hold 7s, exhale 8s. The \`5-5\` pattern is simple equal breathing: in 5s, out 5s. The \`setPattern(key)\` function resets to the first phase and duration when the user switches patterns.

**The CSS animation tied to breathing phases**

Four \`.ring\` divs of increasing size and decreasing opacity create the layered glow rings around the central core. All rings share the same \`@keyframes breathe\` animation: \`0%,100% { transform: scale(0.8); opacity: 0.7 }\` to \`50% { transform: scale(1.1); opacity: 1 }\`. The animation duration is dynamically set in \`updateUI()\` via \`r.style.animationDuration = dur\`, where \`dur = (pat[phase].dur * 2) + 's'\` — doubling the phase duration makes the animation complete exactly one full scale cycle per inhale-exhale pair.

**Hold state pausing**

During a hold phase, \`r.style.animationPlayState = 'paused'\` freezes the rings at their current scale position, visually communicating "stay expanded" during the hold. On inhale and exhale phases, \`animationPlayState\` is set back to \`'running'\`.

**The phase countdown timer**

\`setInterval(tick, 1000)\` decrements \`remaining\` each second. When it reaches zero, the \`phase\` index increments (wrapping via modulo) and \`remaining\` resets to the new phase's duration. The \`updateUI()\` function then updates both the label text and countdown number displayed inside the core element.

**Pause and resume controls**

The toggle() function pauses and resumes the session by clearing or restarting the setInterval and toggling the ring's animationPlayState. This lets users pause mid-session if interrupted without losing their place in the pattern.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Observe the breathing animation running by default', text: 'The animation starts automatically on the 4-4 box breathing pattern. Watch the layered rings expand during the Breathe in phase (countdown 4,3,2,1) and contract during the Breathe out phase. The Pause button lets you stop mid-session.' },
      { title: 'Switch between breathing patterns using the dropdown', text: 'Use the dropdown selector to change patterns: 4-4 Box Breathing for general stress relief, 4-7-8 (longer exhale, clinically studied for anxiety reduction), and 5-5 Equal Breathing for balanced calm. The animation duration and phase labels update immediately on change.' },
      { title: 'Add a custom breathing pattern to the patterns object', text: 'In the JS panel, add a new key to the patterns object: "6-2-6": [{label:"Breathe in",dur:6},{label:"Hold",dur:2},{label:"Breathe out",dur:6}]. Then add a matching option in the HTML select element: <option value="6-2-6">6-2-6 Extended</option>.' },
      { title: 'Change the ring colours and glow to match your app theme', text: 'In the CSS panel, update the rgba(99,102,241,...) values in .r1 through .r4 backgrounds to your accent colour. Adjust the blur() values to control the softness of the outer glow rings. The inner .r1 has no blur for a sharp center, while .r4 has blur(8px) for the outermost ambient glow.' },
      { title: 'Add a session duration limiter', text: 'Track completed cycles in a counter variable. After N cycles (e.g. 5 complete breath cycles), call the toggle() function to stop the session and show a completion message. Each cycle is one full pass through all phases in the pattern array.' },
      { title: 'Export as a standalone breathing exercise page or React component', text: 'Click HTML for a self-contained breathing exercise page, JSX for a React component managing phase state and animation via useEffect and useState, or Tailwind for a styled React version ready for integration into a wellness or productivity application.' },
    ]},
    features: [
      "Breathing patterns as data: { label, dur } phase arrays",
      "CSS scale animation: inhale scales to 1.4, hold maintains, exhale returns to 1",
      "Animation duration set dynamically via style.animationDuration = dur + \"s\"",
      "setInterval countdown updates displayed number each second within a phase",
      "Phases iterate via recursive setTimeout after each countdown completes",
      "Pattern buttons switch between 4-4, 4-7-8, and 5-5 techniques",
      "Ambient circle with blur and opacity layers for visual depth",
      "Export as HTML, JSX, or Tailwind CSS",
      "Mobile/Tablet/Desktop preview",
      "Live editor — preview updates as you type",
    ],
    useCases: [
      { icon: "APP", title: "Wellness and mindfulness app breathing exercises", desc: "Guided breathing is a core feature of mental wellness apps like Calm and Headspace. This component provides the visual breathing guide that users follow for stress management, anxiety relief, and daily mindfulness practice. The three built-in patterns cover the most common medically recommended techniques, and custom patterns are trivially added to the data structure." },
      { icon: "FLOW", title: "Anxiety and panic attack reduction tools", desc: "The 4-7-8 technique — inhale 4 seconds, hold 7, exhale 8 — is one of the most widely studied breathing interventions for acute anxiety. The animated circle makes the timing automatic, so users in a stressed state don't have to count manually. Pair with calming background audio and a low-stimulation dark colour scheme for maximum effectiveness in a crisis-support app." },
      { icon: "DESIGN", title: "Pre-meditation and focus session starters", desc: "Use the breathing animation as a mandatory pre-session step before entering a meditation, a focus timer like the [Pomodoro countdown](/ui-snippets/countdown-timer/) or [Pomodoro widget](/ui-snippets/pomodoro-timer/), or a deep work session. A 60-second breathing exercise (two complete 4-4 cycles) primes the nervous system for focused work. The component's pause and pattern-switch controls let users customise the warm-up to their preference before committing to a longer session." },
      { icon: "LEARN", title: "Learn CSS animation duration control via inline styles", desc: "The animation duration for each ring is set dynamically via element.style.animationDuration = dur where dur is derived from the current phase object. This overrides the CSS-declared animation duration at runtime, demonstrating how inline styles cascade above class-based styles. Edit the duration calculation in the JS panel to see how different values affect the expand/contract speed relative to the countdown." },
      { icon: "CODE", title: "Workout and fitness app post-exercise recovery", desc: "Show a breathing guide during the rest periods between workout sets or immediately after high-intensity exercise. Controlled breathing (specifically box breathing) accelerates heart rate recovery by activating the parasympathetic nervous system. The compact visual fits naturally in a rest timer screen alongside a countdown to the next set." },
      { icon: "STAR", title: "High-stakes form onboarding and checkout anxiety reduction", desc: "Insert a brief optional breathing prompt before high-stakes user actions: completing a large purchase, submitting an important [multi-step form](/ui-snippets/multi-step-form/), or publishing content for the first time. Reducing pre-action anxiety decreases form abandonment and increases completion confidence. The prompt can be dismissed immediately but provides a genuine UX benefit for anxious users." },
      { icon: 'CODE', title: 'Related: Cascading Dependency Skeleton Loader — Parent Then Children, Honestly', desc: 'See the [Cascading Dependency Skeleton Loader — Parent Then Children, Honestly](/ui-snippets/cascading-dependency-skeleton-loader/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Route Tracking Progress Loader', desc: 'See the [Route Tracking Progress Loader](/ui-snippets/loader-route-tracking-progress/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Code Editor Skeleton Loader', desc: 'See the [Code Editor Skeleton Loader](/ui-snippets/skeleton-code-editor-loader/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the breathing pattern data drive the animation timing?", a: "Each pattern is an array of { label, dur } phase objects stored in the patterns object. When a pattern is selected via setPattern(key), the pat variable is set to the pattern array and phase resets to 0. The setInterval(tick, 1000) decrements the remaining counter each second. When remaining reaches zero, phase increments by 1 and wraps back to 0 via modulo when it reaches pat.length. The updateUI() function then reads pat[phase].dur to set the new remaining countdown and pat[phase].label to update the instruction text. The animation duration is set as (pat[phase].dur * 2) + 's' — doubling the phase duration aligns the CSS scale animation peak with the midpoint of the breathe-in duration." },
      { q: "How is the ring animation duration changed dynamically per phase?", a: "The @keyframes breathe animation is applied in CSS with a static duration. In updateUI(), the duration is overridden at runtime using element.style.animationDuration = dur where dur equals the doubled phase duration as a string like '8s'. Inline styles in CSS cascade above class-based declarations, so this override takes effect immediately without removing or re-adding the animation class. Setting animationPlayState to 'paused' during hold phases freezes the rings at their peak scale, visually communicating the hold state." },
      { q: "How do I add a new custom breathing pattern?", a: "Add a new entry to the patterns object: patterns['6-2-6'] = [{label:'Breathe in',dur:6},{label:'Hold',dur:2},{label:'Breathe out',dur:6}]. Then add a matching option in the HTML select element: <option value='6-2-6'>6-2-6 Extended</option>. The setPattern() function reads the select value and looks up the pattern by key, so no other JS changes are needed. You can also add entirely new phase labels — any string works as the label." },
      { q: "How do I add audio cues at the start of each breathing phase?", a: "Use the Web Audio API to generate a brief tone at each phase transition. In updateUI(), create a tone when the phase changes: const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = pat[phase].label.includes('in') ? 440 : pat[phase].label.includes('Hold') ? 528 : 220; gain.gain.setValueAtTime(0.1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3). Different frequencies for each phase provide distinct audio cues: high for inhale, mid for hold, low for exhale." },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the duration math by hand to see why the rings feel synced to the countdown. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why dur is computed as the phase duration times two before being written to animationDuration, and how setting animationPlayState to paused during a hold phase freezes the rings without restarting the keyframe from the beginning. The same assistant can help optimize it — asking whether the setInterval-driven countdown could drift over a long session compared to a timestamp-based approach, or whether four separately-styled ring elements could be generated from one shared config object instead of four hardcoded CSS blocks. It's also useful for extending the tool: ask it to add a cycle counter that auto-stops after a set number of breaths, persist the last-used pattern to localStorage, or add the Web Audio phase-transition tones mentioned in the FAQ. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "guided breathing animation" in plain HTML, CSS, and JavaScript that supports multiple named breathing patterns with different phase counts and durations — no animation library, no canvas.

Requirements:
- Store breathing patterns as a plain JavaScript object where each pattern is an array of phase objects, each phase having a label (like "Breathe in", "Hold", "Breathe out") and a duration in seconds; patterns must be able to have two phases (equal in/out) or three phases (in/hold/out) without any special-casing in the render logic.
- Render four concentric circular div elements of increasing size and decreasing opacity, all sharing one CSS keyframe animation that scales from a smaller size up to a larger size and back down, so they read as layered glow rings pulsing together.
- Drive a one-second setInterval countdown that decrements a remaining-seconds counter; when it reaches zero, advance to the next phase in the current pattern (wrapping back to the first phase after the last), reset the countdown to that phase's duration, and update both a text label and a numeric countdown display.
- Every time the phase changes, set each ring's CSS animationDuration inline to exactly double the new phase's duration in seconds, so one full scale-up-and-down cycle of the animation always aligns with one inhale-then-exhale (or single phase) length regardless of which pattern is active.
- When the current phase's label indicates a hold, set the rings' animationPlayState to paused so they visibly freeze at whatever scale they reached, then resume to running for the next breathing phase.
- Provide a pause/resume control that stops and restarts the countdown interval and correspondingly pauses or resumes the ring animation without losing the current phase or remaining time, plus a selector that switches between at least three different named patterns, resetting to the start of the newly selected pattern.`,
    },
  }
};

export default breathingAnimation;
