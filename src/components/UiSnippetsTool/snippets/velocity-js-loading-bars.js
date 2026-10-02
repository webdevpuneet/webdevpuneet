const velocityJsLoadingBars = {
  id: 'velocity-js-loading-bars',
  title: 'Velocity.js Bouncing Loader Bars',
  lastmod: '2026-09-17',
  category: 'loaders',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/velocity-animate@2.0.6/velocity.min.js'],
  html: `<div class="vlb-stage">
  <div class="vlb-head">
    <span class="vlb-tag">velocity.js · loop: true</span>
    <h2>Equalizer Loader</h2>
    <p>Each bar loops an independent bounce, staggered so the row ripples like an audio equalizer.</p>
  </div>
  <div class="vlb-panel">
    <div class="vlb-bars" id="vlbBars"></div>
    <p class="vlb-label">Processing your request…</p>
  </div>
  <button class="vlb-toggle" id="vlbToggle">Stop</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#221530,#0b0713);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vlb-stage{width:min(420px,94vw);display:flex;flex-direction:column;align-items:center;gap:20px}
.vlb-head{text-align:center}
.vlb-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f472b6;background:rgba(244,114,182,.12);border:1px solid rgba(244,114,182,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.vlb-head h2{font-size:clamp(24px,5vw,32px);font-weight:800;letter-spacing:-.02em}
.vlb-head p{font-size:13.5px;color:#c3aed6;margin-top:7px}

.vlb-panel{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:40px 30px;display:flex;flex-direction:column;align-items:center;gap:20px;box-shadow:0 24px 60px -24px rgba(0,0,0,.8)}
.vlb-bars{display:flex;align-items:flex-end;gap:8px;height:70px}
.vlb-bar{width:10px;height:16px;border-radius:6px;background:linear-gradient(180deg,#f472b6,#a855f7);transform-origin:bottom center}
.vlb-label{font-size:12.5px;color:#c3aed6;letter-spacing:.02em}

.vlb-toggle{padding:9px 20px;border-radius:99px;border:1px solid rgba(244,114,182,.4);background:rgba(244,114,182,.14);color:#fbcfe8;font:700 12.5px system-ui;cursor:pointer}
.vlb-toggle:hover{background:rgba(244,114,182,.22)}`,

  js: `var container = document.getElementById('vlbBars');
var BAR_COUNT = 7;
var bars = [];

for (var i = 0; i < BAR_COUNT; i++) {
  var bar = document.createElement('div');
  bar.className = 'vlb-bar';
  container.appendChild(bar);
  bars.push(bar);
}

function startLoop() {
  bars.forEach(function (bar, i) {
    Velocity(bar, { height: ['62px', '16px'] }, {
      duration: 480,
      easing: 'easeInOutSine',
      loop: true,
      delay: i * 90
    });
  });
}

function stopLoop() {
  // Velocity's "stop" queue-clearing command halts the current tween in place
  // rather than jumping straight to the end value, so bars settle mid-motion.
  Velocity(bars, 'stop', true);
  Velocity(bars, { height: '16px' }, { duration: 260, easing: 'easeOutQuad' });
}

var running = true;
var toggle = document.getElementById('vlbToggle');

toggle.addEventListener('click', function () {
  running = !running;
  if (running) {
    toggle.textContent = 'Stop';
    startLoop();
  } else {
    toggle.textContent = 'Resume';
    stopLoop();
  }
});

startLoop();`,

  seo: {
    title: 'Velocity.js Bouncing Loader Bars — Equalizer Loop Snippet',
    description: 'A row of loader bars that loop an independent bounce animation via Velocity.js loop: true, staggered per bar into an audio-equalizer ripple. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Velocity.js Bouncing Loader Bars — loop: true and Queue-Aware Stopping, Explained',
      description: `A believable "processing" indicator needs motion that never visibly restarts — no snap back to a starting frame, no seam where one cycle ends and the next begins. Velocity.js's \`loop\` option handles this natively by re-running an animation's keyframes back and forth (like \`alternate\` in CSS) rather than jumping back to frame zero, and this snippet leans on that plus per-bar delay to build a convincing equalizer loader with no \`setInterval\` anywhere in the code.

## loop: true, and why it's not the same as repeating a tween

\`\`\`js
Velocity(bar, { height: ['62px', '16px'] }, { duration: 480, easing: 'easeInOutSine', loop: true, delay: i * 90 });
\`\`\`

\`height: ['62px', '16px']\` is Velocity's \`[end, start]\` shorthand: animate **to** 62px, starting **from** 16px. With \`loop: true\`, once the tween reaches 62px, Velocity reverses it back down to 16px, then back up again, indefinitely — the exact same easing curve runs forward and backward. Because \`easeInOutSine\` is symmetric, the direction reversal is invisible; there's no jump, just continuous oscillation. This is meaningfully different from calling the same animation repeatedly in a loop yourself, which would need a \`complete\` callback re-invoking itself and risks a one-frame reset snap at each cycle boundary if timing drifts.

## The stagger is what sells "equalizer" over "seven bars bouncing"

Each bar gets \`delay: i * 90\`, a flat per-index offset applied once at start. Because every bar's \`loop: true\` animation keeps re-triggering on its own internal clock after that initial delay, the **phase offset persists forever** — bar 2 is always ~90ms behind bar 1, bar 3 always ~90ms behind bar 2, and so on. That's what makes it read as a ripple traveling across the row rather than seven bars randomly bouncing in sync.

## Stopping mid-motion instead of snapping to an end state

\`\`\`js
Velocity(bars, 'stop', true);
Velocity(bars, { height: '16px' }, { duration: 260, easing: 'easeOutQuad' });
\`\`\`

Calling \`Velocity(element, 'stop', true)\` is a **command string**, not a property animation — it's Velocity's API for halting whatever is currently running on those elements and clearing their remaining queue (the \`true\` argument clears the queue instead of just pausing the current tween). Without it, a plain new \`Velocity()\` call would simply queue *behind* the infinite \`loop: true\` animation, which by definition never finishes — so the "settle to 16px" animation would silently wait forever and never run. Stopping first, then issuing a fresh short tween back to the resting height, is the only way to interrupt an infinite loop and bring the bars to a clean, intentional stop rather than freezing wherever they happened to be.

## Reusing it

Bind \`startLoop\`/\`stopLoop\` to a real async operation — start on request send, stop on response — and the loader becomes an honest progress indicator rather than a decorative one. The bar count and stagger interval are both single constants, so scaling to a wider or narrower equalizer is a one-line change.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Velocity.js CDN', text: 'Include velocity-animate from the CDN panel.' },
      { title: 'Paste HTML, CSS, and JS', text: 'Seven bars generate in JS and start bouncing immediately in a staggered loop.' },
      { title: 'Watch the ripple', text: "Each bar's animation is delayed 90ms more than the last, producing a traveling equalizer wave." },
      { title: 'Click Stop', text: "Velocity's stop command halts the infinite loop and eases every bar back to resting height." },
      { title: 'Click Resume', text: 'The staggered loop restarts cleanly from the resting height.' },
      { title: 'Wire it to a real request', text: 'Call startLoop() on request send and stopLoop() on response to make it an honest progress indicator.' },
    ] },
    features: [
      { title: 'loop: true oscillation', text: 'Velocity reverses the tween direction on each cycle instead of resetting to frame zero, so there is no visible seam.' },
      { title: 'Persistent per-bar phase offset', text: 'A one-time delay: i * 90 keeps every bar permanently out of phase with its neighbor, producing a ripple.' },
      { title: 'Symmetric easing', text: 'easeInOutSine looks identical forward and backward, so the loop direction reversal is invisible.' },
      { title: 'Queue-aware stop command', text: "Velocity(el, 'stop', true) clears the infinite loop's queue so a new animation can actually run." },
      { title: 'Graceful settle', text: 'Stopping eases bars to resting height rather than freezing them mid-bounce.' },
      { title: 'No setInterval anywhere', text: "The entire loop and stagger run on Velocity's own animation engine." },
      { title: 'JS-generated bars', text: 'Bar count is a single constant; the DOM and animation both scale from it.' },
      { title: 'Toggle control', text: 'A single button demonstrates starting and cleanly interrupting an infinite animation.' },
    ],
    useCases: [
      { title: 'API request indicators', text: 'Start the bounce loop when a fetch begins and stop it on response, using `Velocity(el, \'stop\', true)` to clear the queued infinite loop.' },
      { title: 'Equalizer-style progress', text: 'Show work in progress with bars that ripple like an audio equalizer, each with a permanent `delay: i * 90` phase offset.' },
      { title: 'Audio and voice interfaces', text: 'Reuse the bar shape as a stylised level meter for recording or playback states in voice and audio interfaces of any kind.' },
      { title: 'Chat typing alternatives', text: 'Tune the stagger faster for a lively typing indicator, relying on symmetric `easeInOutSine` so the loop shows no seam.' },
      { title: 'Velocity loop mechanics', text: 'Study how `loop: true` reverses the tween on each cycle instead of snapping back to the start, which is what removes the visible restart.' },
    ],
    faqs: [
      { q: 'How is loop: true different from just calling the animation repeatedly?', a: 'loop: true makes Velocity reverse the same tween back and forth using its existing easing curve, with no gap or restart between cycles. Re-triggering a fresh animation yourself in a complete callback risks a visible snap back to the start value at each boundary and needs manual bookkeeping to keep running.' },
      { q: 'Why does the stagger keep working forever if delay is only set once?', a: "Each bar's own loop: true animation keeps oscillating independently after its initial delay fires once. Because every bar started 90ms after the previous one and then loops on its own clock at the same duration, the phase difference between neighboring bars never changes — it's a fixed offset baked in at start, not something re-applied each cycle." },
      { q: "What does Velocity(bars, 'stop', true) actually do?", a: "'stop' is a Velocity command (not a properties object) that halts whichever animation is currently running on those elements. The true argument tells it to also clear any queued animations rather than just pausing the current one — necessary here because loop: true animations never naturally finish, so anything queued behind them would wait forever without an explicit stop." },
      { q: 'Why not just set the bar height directly to stop it instead of using stop first?', a: "Calling a new Velocity() animation without stopping first queues it behind whatever is currently animating, and by default Velocity waits for the current animation to finish before running the next one in queue. Since loop: true never finishes, the new animation would simply never start — stop clears that block first." },
      { q: 'Why use easeInOutSine specifically?', a: "It's symmetric — its shape read forward looks identical read backward. Since loop: true replays the tween in reverse on alternating cycles, an asymmetric easing curve (like easeOutBounce) would look visibly different bouncing up versus bouncing down, breaking the illusion of continuous motion." },
      { q: 'How do I change how many bars there are?', a: 'Change the BAR_COUNT constant — the generation loop, the stagger delay (i * 90), and the flex layout all read from the resulting bars array, so no other code needs to change.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is a compact way to learn Velocity's loop and stop mechanics, which behave differently from a typical CSS animation. Paste it into an AI assistant like Claude and ask it to explain precisely why an infinite loop: true animation blocks any newly queued Velocity call on the same element until you explicitly call the 'stop' command, and why the 'stop' command takes a boolean second argument. Then ask what visual artifact would appear if easeInOutSine were replaced with an asymmetric curve like easeOutBounce — the bounce would look different going up than coming down, breaking the illusion of continuous oscillation. For extension, ask it to drive the bar heights from a live Web Audio API frequency analyzer instead of a fixed random bounce, add a color shift synced to bar height, or convert the stagger into a symmetric ripple that radiates from the center bar outward.`,
      prompt: `Build a "bouncing equalizer loader" using Velocity.js (v2, from a CDN, no jQuery) in plain HTML, CSS, and JavaScript.

Requirements:
- Generate 7 bar elements in JavaScript (not hand-written HTML) and append them to a flex row aligned to the bottom, each bar a narrow rounded rectangle with a gradient fill.
- Animate each bar's height using Velocity's [end, start] shorthand, e.g. height: ['62px', '16px'], with loop: true so it oscillates up and down indefinitely using the SAME tween reversed, not a repeated fresh animation — use a symmetric easing curve like easeInOutSine so the reversal is invisible.
- Give each bar a one-time delay of index * 90ms when starting its loop, so the bars fall permanently out of phase with each other and the row reads as a traveling ripple/equalizer wave rather than bars bouncing in sync.
- Implement a Stop/Resume toggle button. Stopping must first call Velocity(bars, 'stop', true) — the queue-clearing stop command — before issuing a new short animation back to the resting height; explain in a comment why skipping the stop call would cause the new animation to queue behind the infinite loop and never run.
- No setInterval or setTimeout polling anywhere — all timing driven by Velocity's own duration/delay/loop options.
- Style it as a dark purple/pink themed panel with a rounded bordered card, soft shadow, and a "Processing your request…" label beneath the bars.`,
    },
  },
};

export default velocityJsLoadingBars;
