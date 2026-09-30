const riveInteractiveIcon = {
  id: 'rive-interactive-icon',
  title: 'Rive Interactive Icon',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://unpkg.com/@rive-app/canvas@2.7.0/rive.js',
  ],
  html: `<div class="ri-wrap">
  <div class="ri-stage">
    <canvas id="riCanvas" class="ri-canvas" width="220" height="220" hidden></canvas>
    <svg id="riFallback" class="ri-fallback" viewBox="0 0 100 100" width="220" height="220">
      <circle class="ri-ring" cx="50" cy="50" r="34" />
      <path id="riCheck" class="ri-check" d="M32 52 L45 65 L70 35" />
    </svg>
  </div>
  <p class="ri-status" id="riStatus">Loading Rive animation…</p>
  <button class="ri-btn" id="riReplay">Replay</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c12;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}
.ri-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;padding:32px}
.ri-stage{width:220px;height:220px;border-radius:24px;background:radial-gradient(circle at 30% 20%,#1c2440,#0d0f1c);display:flex;align-items:center;justify-content:center;border:1px solid #232a44}
.ri-canvas{width:100%;height:100%}
.ri-fallback{display:block}
.ri-ring{fill:none;stroke:#2c355c;stroke-width:4}
.ri-check{fill:none;stroke:#4ade80;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:60;animation:ri-draw 1.1s ease .2s forwards infinite}
@keyframes ri-draw{
  0%{stroke-dashoffset:60}
  40%,60%{stroke-dashoffset:0}
  100%{stroke-dashoffset:-60}
}
.ri-status{font-size:13px;color:#7d84a6}
.ri-btn{padding:9px 20px;border-radius:999px;border:1px solid #2e3559;background:#141a2e;color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .2s}
.ri-btn:hover{border-color:#818cf8}`,

  js: `// Rive's real API: point new rive.Rive({ src, canvas, ... }) at a hosted
// .riv file exported from the Rive editor. This sandbox has no .riv asset to
// host, so "src" below points at Rive's own public example file (their demo
// CDN can go offline or change without notice). In production, replace src
// with the URL of your own exported .riv file.
const RIVE_SRC = 'https://cdn.rive.app/animations/vehicles.riv';

const canvas = document.getElementById('riCanvas');
const fallback = document.getElementById('riFallback');
const status = document.getElementById('riStatus');
const replayBtn = document.getElementById('riReplay');

let riveInstance = null;
let usingFallback = false;

function playFallback(reason) {
  usingFallback = true;
  canvas.hidden = true;
  fallback.style.display = 'block';
  status.textContent = reason || 'Showing built-in fallback icon.';
  const check = document.getElementById('riCheck');
  check.style.animation = 'none';
  void check.offsetWidth;
  check.style.animation = 'ri-draw 1.1s ease .1s forwards';
}

try {
  // Wrap the Rive load in try/catch (and its own error callback) so a failed
  // fetch, a CORS block, or the CDN being unreachable never leaves the demo
  // blank — the SVG fallback below always renders as a safety net.
  riveInstance = new rive.Rive({
    src: RIVE_SRC,
    canvas: canvas,
    autoplay: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      canvas.hidden = false;
      fallback.style.display = 'none';
      status.textContent = 'Rive animation loaded from ' + RIVE_SRC;
      canvas.width = 220;
      canvas.height = 220;
    },
    onLoadError: () => playFallback('Rive asset failed to load — showing fallback icon.'),
  });
} catch (err) {
  playFallback('Rive runtime unavailable — showing fallback icon.');
}

replayBtn.addEventListener('click', () => {
  if (!usingFallback && riveInstance) {
    try {
      riveInstance.reset();
      riveInstance.play();
      return;
    } catch (err) {
      playFallback('Rive playback failed — showing fallback icon.');
      return;
    }
  }
  playFallback();
});`,

  seo: {
    title: 'Rive Interactive Icon — Free Rive Runtime Snippet With SVG Fallback',
    description: `A Rive.js-powered interactive icon that loads a .riv animation via the Rive web runtime, with a guaranteed animated SVG fallback if the asset fails. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Rive Interactive Icon — The Rive Runtime Pattern, With a Fallback That Never Blanks',
      description: `[Rive](https://rive.app) is a design tool and runtime for small, state-machine-driven vector animations — icons that react to hover, loading states that blend between phases, character animations with real logic behind them — exported as a compact \`.riv\` binary and played back in the browser with \`new rive.Rive({ src, canvas, stateMachines })\`. This snippet demonstrates that exact loading pattern, but since a live sandbox has no server to host a custom \`.riv\` file on, it points \`src\` at Rive's own public example asset and — critically — wraps the whole load in error handling with an always-available animated SVG checkmark as a fallback, so the preview is never blank even if that external asset is unreachable.

**The real Rive API surface**

\`new rive.Rive({ src, canvas, autoplay, stateMachines, onLoad, onLoadError })\` is exactly how you'd load Rive in production. \`stateMachines\` names the state machine (built visually in the Rive editor) that drives the animation's logic — timelines, blend states, inputs — rather than a single fixed timeline. \`onLoad\` fires once the \`.riv\` file has been fetched and parsed; \`onLoadError\` fires if it can't be. Both are used here for real, not simulated.

**Why the fallback matters**

Embedding a third-party asset URL in a public snippet is fragile — the demo CDN could move, rate-limit, or go offline, and a broken Rive load would otherwise leave a blank canvas with no explanation. This snippet wraps instantiation in \`try/catch\` and always renders a small self-contained SVG (a circle with an animated checkmark stroke, using \`stroke-dasharray\`/\`stroke-dashoffset\`) underneath, toggling visibility so exactly one of "real Rive" or "fallback icon" is showing at any time — never neither.

**A pattern worth reusing beyond Rive**

Any snippet that depends on a hosted binary asset — a \`.riv\` file, a \`.lottie\` file, a font, a texture — benefits from the same shape: attempt the real load, catch both synchronous construction errors and the library's own async error callback, and always have a pure-CSS/SVG stand-in ready to show. See [Lottie hover icon button](/ui-snippets/lottie-hover-icon-button/) for the same guarantee applied to an inline Lottie animation instead of a fallback SVG.

**Where Rive fits vs. Lottie**

Lottie plays back an After Effects timeline; Rive is closer to a tiny game engine for vector graphics, with state machines and runtime inputs (useful for things like a play/pause icon that blends between states, or a like-button burst with actual physics). Pick Rive when interaction state needs to drive the animation's logic, not just trigger a linear play.

**Customizing it**

Swap \`RIVE_SRC\` for your own exported \`.riv\` file's URL, point \`stateMachines\` at the state machine name from your file, and use \`riveInstance.stateMachineInputs(...)\` to wire booleans/triggers to hover or click events. Redesign the SVG fallback to visually match your real Rive asset so the transition between "still loading" and "loaded" feels seamless.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Rive runtime CDN', text: `Include @rive-app/canvas from unpkg.` },
      { title: 'Paste HTML, CSS, and JS', text: `A canvas and an SVG fallback both render, one hidden.` },
      { title: 'Watch it load', text: `The Rive asset plays on the canvas if it loads.` },
      { title: 'If the asset fails', text: `The animated SVG checkmark shows instead, never blank.` },
      { title: 'Click "Replay"', text: `Resets and replays whichever is currently active.` },
      { title: 'Swap in your own .riv', text: `Change RIVE_SRC to your exported file's URL.` },
    ] },
    features: [
      { title: 'Real Rive runtime API', text: `new rive.Rive with src, canvas, stateMachines.` },
      { title: 'Guaranteed fallback', text: `An animated SVG always has something to show.` },
      { title: 'Error-safe loading', text: `try/catch plus onLoadError cover both failure modes.` },
      { title: 'State-machine ready', text: `Structured for stateMachineInputs-driven logic.` },
      { title: 'Never-blank preview', text: `Exactly one of Rive/fallback is visible at all times.` },
      { title: 'Replay control', text: `One button resets whichever animation is active.` },
      { title: 'Status messaging', text: `Text label reports load state for transparency.` },
      { title: 'Small dependency footprint', text: `Only the Rive canvas runtime is required.` },
    ],
    useCases: [
      { title: 'Interactive icons', text: `Icons that react to hover, load, or click state.` },
      { title: 'Loading indicators', text: `State machines blend between loading phases.` },
      { title: 'Onboarding illustrations', text: `Lightweight vector animation without video.` },
      { title: 'Like/react buttons', text: `Pair with [confetti button](/ui-snippets/confetti-button/) for a burst.` },
      { title: 'Asset-load fallback pattern', text: `Reuse alongside [Lottie hover icon button](/ui-snippets/lottie-hover-icon-button/).` },
      { title: 'Notification icons', text: `A state-driven alternative to [notification bell](/ui-snippets/notification-bell/).` },
    ],
    faqs: [
      { q: "Why does src point at Rive's own example file instead of a custom icon?", a: `A live code sandbox has no server to host a custom exported .riv binary on, so this snippet points at one of Rive's own publicly hosted example files purely to demonstrate the real loading API working end to end. In your own project, replace RIVE_SRC with the URL of a .riv file you've exported from the Rive editor and uploaded to your own hosting or CDN.` },
      { q: 'What happens if the Rive asset fails to load?', a: `The rive.Rive constructor call is wrapped in try/catch to guard against synchronous errors, and the onLoadError callback handles asynchronous failures like a network error or the CDN being unreachable. Either path calls the same playFallback() function, which hides the canvas, shows the SVG checkmark icon, and restarts its CSS keyframe animation — so the preview always has something animating, never a blank box.` },
      { q: 'What is stateMachines for?', a: `Rive files can define state machines visually in the Rive editor — named states, transitions, and inputs (booleans, triggers, numbers) that drive which part of the animation plays based on logic rather than a single fixed timeline. Passing stateMachines: "State Machine 1" tells the runtime to drive playback through that state machine; in a real icon you'd typically also call riveInstance.stateMachineInputs() to read or set those inputs from hover/click handlers.` },
      { q: 'How is this different from just embedding a Lottie or GIF?', a: `Lottie and GIF both play a fixed, pre-rendered timeline. Rive's state machines let runtime code drive the animation's logic — blending between states, responding to numeric inputs, branching based on booleans — which is closer to a tiny animated state machine than a video loop. That flexibility is the tradeoff for a slightly heavier runtime and the need to design the state machine in the Rive editor first.` },
      { q: 'Can I trigger the Rive animation on hover instead of autoplay?', a: `Yes. Set autoplay: false in the constructor, then in a mouseenter listener call riveInstance.play() (or set a boolean state machine input to true), and in mouseleave call riveInstance.pause() or reset the input to false. The onLoad callback is the right place to attach those listeners, since riveInstance isn't guaranteed usable until the file has finished loading.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess whether a blank canvas means Rive failed or is just slow. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the try/catch around new rive.Rive(...) and the onLoadError callback together cover both the synchronous and asynchronous ways a hosted .riv asset can fail to load, and why toggling canvas.hidden alongside the SVG fallback's display is the right way to guarantee exactly one of them is always visible. The same assistant can help you extend it — asking how to read or set state machine inputs so the icon reacts to hover or click state instead of just autoplaying, or how to preload the .riv file and show a skeleton state during the fetch instead of the full fallback icon. It's also useful for applying the same never-blank pattern elsewhere: ask it to adapt the try/catch-plus-fallback structure to a different asset-dependent snippet, like a custom font or a remote Lottie JSON. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive icon using Rive's web runtime (load @rive-app/canvas from a CDN), with a fallback that guarantees the icon is never blank even if the Rive asset fails to load.

Requirements:
- A canvas element sized for the icon, plus a separate self-contained SVG element (built with pure CSS/SVG, no external assets) showing a simple animated icon such as a circle with a checkmark drawn on via stroke-dasharray/stroke-dashoffset animation — the SVG must be able to render and animate completely on its own with zero network dependency.
- Instantiate new rive.Rive({ src, canvas, autoplay, stateMachines, onLoad, onLoadError }) pointing src at some .riv file URL (clearly commented that a real project should point this at its own exported .riv file), wrapped in a try/catch block.
- On successful load (the onLoad callback), show the canvas and hide the SVG fallback. On failure — caught either by the try/catch around construction or by the onLoadError callback — hide the canvas and show/restart the SVG fallback's animation, updating a status text element to explain what's showing and why.
- At all times, exactly one of the canvas or the SVG fallback should be visible — never both hidden (a blank state) and never both visible.
- Add a "Replay" button that, if the real Rive animation is active, calls its reset and play methods (also wrapped in error handling that falls back to the SVG on failure), and if the fallback is active, restarts the SVG's CSS animation.
- Comment clearly that the state machine input API (stateMachineInputs) is how a production icon would wire hover/click interactivity into the animation's logic.`,
    },
  },
};

export default riveInteractiveIcon;
