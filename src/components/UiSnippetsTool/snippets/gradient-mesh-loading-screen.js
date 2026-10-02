const gradientMeshLoadingScreen = {
  id: 'gradient-mesh-loading-screen',
  title: 'Gradient Mesh Loading Screen',
  category: 'loaders',
  html: `<div class="gm-screen" id="gmScreen">
  <div class="gm-blob gm-b1"></div>
  <div class="gm-blob gm-b2"></div>
  <div class="gm-blob gm-b3"></div>
  <div class="gm-blob gm-b4"></div>
  <div class="gm-content">
    <div class="gm-ring"></div>
    <p class="gm-label" id="gmLabel">Preparing your workspace…</p>
    <p class="gm-pct" id="gmPct">0%</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh}

.gm-screen{position:relative;min-height:100vh;overflow:hidden;background:#0b0a14;display:flex;align-items:center;justify-content:center}

.gm-blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;will-change:transform}
.gm-b1{width:340px;height:340px;background:#6366f1;top:-60px;left:-60px;animation:gmFloat1 11s ease-in-out infinite}
.gm-b2{width:300px;height:300px;background:#ec4899;bottom:-80px;right:-40px;animation:gmFloat2 13s ease-in-out infinite}
.gm-b3{width:260px;height:260px;background:#22d3ee;top:20%;right:10%;animation:gmFloat3 9s ease-in-out infinite}
.gm-b4{width:220px;height:220px;background:#a78bfa;bottom:10%;left:8%;animation:gmFloat4 15s ease-in-out infinite}

@keyframes gmFloat1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.15)}}
@keyframes gmFloat2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-50px,-30px) scale(1.1)}}
@keyframes gmFloat3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,50px) scale(.9)}}
@keyframes gmFloat4{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(35px,-45px) scale(1.2)}}

.gm-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center}

.gm-ring{width:46px;height:46px;border-radius:50%;border:3px solid rgba(255,255,255,.18);border-top-color:#fff;animation:gmSpin .8s linear infinite}
@keyframes gmSpin{to{transform:rotate(360deg)}}

.gm-label{font-size:14px;font-weight:600;color:#fff}
.gm-pct{font-size:12px;color:rgba(255,255,255,.6);font-variant-numeric:tabular-nums}`,

  js: `// A full-screen loading state with soft, blurred gradient blobs drifting
// behind the spinner. The percentage is a real accumulating value tied to a
// short queue of simulated async setup steps, not a decorative countdown \\u2014
// the blobs are purely ambient motion, independent of that real progress.
var labelEl = document.getElementById('gmLabel');
var pctEl = document.getElementById('gmPct');

var STEPS = [
  { label: 'Preparing your workspace…', weight: 1 },
  { label: 'Loading your recent files…', weight: 2 },
  { label: 'Syncing preferences…', weight: 1 },
  { label: 'Almost ready…', weight: 1 },
];

var totalWeight = STEPS.reduce(function (sum, s) { return sum + s.weight; }, 0);

function runSteps(index, doneWeight) {
  if (index >= STEPS.length) {
    pctEl.textContent = '100%';
    labelEl.textContent = 'Ready';
    return;
  }
  var step = STEPS[index];
  labelEl.textContent = step.label;

  var stepDuration = 500 + Math.random() * 700;
  var stepStart = Date.now();
  var startWeight = doneWeight;

  var tick = setInterval(function () {
    var stepFraction = Math.min(1, (Date.now() - stepStart) / stepDuration);
    var currentWeight = startWeight + step.weight * stepFraction;
    pctEl.textContent = Math.round((currentWeight / totalWeight) * 100) + '%';
    if (stepFraction >= 1) {
      clearInterval(tick);
      runSteps(index + 1, startWeight + step.weight);
    }
  }, 60);
}

runSteps(0, 0);`,

  seo: {
    title: 'Gradient Mesh Loading Screen — Blurred Blob Background CSS JS',
    description: 'A full-screen loading state with soft, drifting blurred gradient blobs behind a spinner and a real accumulating percentage. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Gradient Mesh Loading Screen \\u2014 A Full-Page Loader with Drifting Blurred Gradient Blobs',
      description: `A plain spinner on a flat background is functional but forgettable. This snippet builds a loading screen with an animated mesh-gradient backdrop \\u2014 several large, heavily blurred, colored circles drifting slowly and independently behind the spinner \\u2014 the same soft, glowing-blob aesthetic increasingly used for AI product loading states and splash screens, combined with a real accumulating progress percentage rather than a purely decorative number.

**Four independently drifting blobs**

Each \`.gm-blob\` is a large circle with \`filter: blur(60px)\` and a distinct saturated color, positioned in a different corner or edge of the screen. Each has its own \`@keyframes\` (\`gmFloat1\` through \`gmFloat4\`) with different durations (9s to 15s) and different \`translate\`/\`scale\` targets, so the blobs never move in sync \\u2014 the combined effect looks organic and unpredictable even though each individual animation loops perfectly. The heavy blur is what turns four solid circles into a soft, mesh-gradient-like wash of color rather than four visible discs.

**A real percentage underneath the ambience**

While the background is purely decorative motion, the percentage counter is not. \`runSteps()\` walks a small \`STEPS\` array of setup phases, each carrying a relative \`weight\` (some steps are expected to take proportionally longer than others). For the currently running step, an interval recomputes \`startWeight + step.weight * stepFraction\` against the step's own randomized duration, converts that into a percentage of \`totalWeight\`, and only advances to the next step once the current one's fraction reaches 1 \\u2014 so the number displayed is a genuine weighted sum of completed and in-progress work, not a value counting up on a fixed schedule unrelated to the labeled steps.

**Weighted steps, not equal-sized steps**

Giving \`Loading your recent files…\` a \`weight\` of 2 versus 1 for the others means it's expected to represent twice as large a share of total progress \\u2014 useful because real setup steps rarely take equal time, and a progress percentage that jumps in four identical 25% chunks reads as obviously fake once users notice a "quick" step and a "slow" step take the same visual jump.

**Ambient motion, functional foreground**

Keeping the blob animations entirely CSS-driven (transform and opacity only, both compositor-friendly) means the expensive-looking visual richness costs nothing on the main thread, leaving it free for the real step-tracking JavaScript logic to run smoothly alongside it.

**Customizing it**

Recolor the blobs to match your brand palette, adjust blur radius and blob count, or swap \`STEPS\`' simulated durations for real async task durations and weights matching your app's actual startup sequence. Pair the same visual backdrop with [an async task completion ring](/ui-snippets/async-task-completion-ring/) in place of the simple spinner and percentage for a more detailed real-progress readout.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A full-screen dark backdrop appears with four blurred gradient blobs drifting behind a spinner.' },
        { title: 'Watch the blobs drift', text: 'Each blob moves on its own independent timing and path, creating an organic ambient motion.' },
        { title: 'Watch the label and percentage', text: 'The step label changes and the percentage climbs as a real weighted sum of step progress.' },
        { title: 'Reach 100%', text: 'The label switches to "Ready" once every weighted step has genuinely completed.' },
        { title: 'Recolor the blobs', text: 'Change each .gm-blob\\u2019s background color to match your brand palette.' },
        { title: 'Edit the STEPS array', text: 'Adjust labels, weights, and durations to reflect your app\\u2019s real startup sequence.' },
      ],
    },
    features: [
      'Four independently-animated, heavily-blurred gradient blobs for an ambient mesh backdrop',
      'Each blob has its own duration and motion path so they never move in sync',
      'Real weighted percentage counter, not a decorative fixed-duration countdown',
      'Weighted STEPS array lets some phases represent more of total progress than others',
      'GPU-friendly transform/opacity-only blob animation keeps the main thread free',
      'Spinner and label combo for a familiar loading-screen focal point',
      'Randomized per-step duration avoids identical, robotic pacing',
      'Full-screen layout ready for splash screens or route transitions',
      'Zero dependencies — pure CSS animation plus a small JS progress tracker',
      'Easily themeable colors, blur radius, and blob count',
    ],
    useCases: [
      { icon: '🚀', title: 'App splash and startup', desc: 'Cover first launch with four slow, heavily blurred gradient blobs and a spinner with a real accumulating percentage.' },
      { icon: '🔄', title: 'Page transition screens', desc: 'Offer a richer full-screen alternative to a top bar, with each blob using its own duration and path so they never move in sync.' },
      { icon: '🤖', title: 'AI product onboarding', desc: 'Match the soft, glowing look common in AI interfaces while a workspace is prepared behind the scenes.' },
      { icon: '⚙️', title: 'Provisioning and account setup', desc: 'Show weighted real progress, where a `STEPS` array lets heavier phases represent more of the total than quick ones.' },
      { icon: '🎓', title: 'Weighted progress teaching', desc: 'Study how `startWeight` accumulates across steps, giving a percentage that reflects actual work instead of a decorative fixed-duration count.' },
      { icon: 'CODE', title: 'Related: Async Task Completion Ring', desc: 'See the [Async Task Completion Ring](/ui-snippets/async-task-completion-ring/) for a more detailed real-progress readout to pair with this backdrop.' },
      { icon: 'CODE', title: 'Related: Streaming Text Skeleton Reveal', desc: 'See the [Streaming Text Skeleton Reveal](/ui-snippets/streaming-text-skeleton-reveal/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are the background blobs affecting performance?', a: 'No, they animate only transform and opacity, which the browser can composite on the GPU without triggering layout or paint on every frame. The blur filter is applied once per element rather than recalculated per frame, so four blobs cost very little even though the visual effect looks expensive.' },
      { q: 'Is the percentage counter connected to real progress or just decorative?', a: 'It is real. runSteps() walks a small array of setup phases, each with a relative weight, and computes the displayed percentage as (completed weight + current step\\u2019s in-progress fraction of its own weight) divided by total weight \\u2014 advancing to the next step only once the current one\\u2019s fraction genuinely reaches 1.' },
      { q: 'Why do some steps contribute more to the percentage than others?', a: 'Each STEPS entry has a weight value; a step with weight 2 is treated as representing twice as much of total progress as a step with weight 1. This avoids the common giveaway of fake progress bars where every labeled phase jumps the same fixed percentage regardless of how substantial that phase actually is.' },
      { q: 'How do I make the blobs move differently?', a: 'Each blob has its own @keyframes rule (gmFloat1 through gmFloat4) controlling its translate and scale targets, and its own animation-duration set directly on the .gm-b1 through .gm-b4 selectors. Edit those independently \\u2014 keeping the durations different from one another is what keeps the combined motion from ever repeating in a visible cycle.' },
      { q: 'How do I connect the percentage to real async setup work?', a: 'Replace each step\\u2019s randomized stepDuration with the real duration of your actual async call (or better, update currentWeight/percentage directly from that call\\u2019s own progress or completion event instead of a timed interval) \\u2014 the weighted-sum percentage formula and step-advancement logic need no other changes.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep an array of step weights and a currentIndex plus currentStepFraction in state, updating currentStepFraction inside a mount effect (via interval or real progress events) and advancing currentIndex once it reaches 1. Derive the displayed percentage from that state the same way runSteps computes it; the blob backdrop is plain CSS and needs no JavaScript at all.' },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming the blobs and the percentage are both decorative, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how each blob's independent keyframe animation and duration combine to avoid a visibly repeating cycle, and how runSteps() computes a real weighted percentage from a mix of completed steps and one in-progress step's fractional contribution. The same assistant can help optimize it \\u2014 for instance asking whether the blur filter's cost scales meaningfully with blob size and count on lower-end GPUs, and whether reducing blob count or blur radius would be worth it for very old devices. It's also useful for extending it: ask it to tie STEPS' weights and completion to real async setup calls instead of the simulated timer, add a subtle fade-out transition once the loader reaches 100%, or make the blob palette themeable via CSS custom properties. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a full-screen loading splash screen in plain HTML, CSS, and JavaScript \\u2014 no libraries \\u2014 with an animated mesh-gradient backdrop and a real weighted progress percentage.

Requirements:
- A full-viewport dark background containing four large circular elements, each with a distinct saturated color and a heavy CSS blur filter, positioned around different areas of the screen so their blurred edges overlap and blend into a soft mesh-like wash of color.
- Each of the four blurred circles must animate independently via its own CSS keyframes with a different duration and a different translate/scale motion path, so the combined ambient motion never looks like it's repeating in visible lockstep.
- Keep all of the blob animation limited to transform and opacity properties only, for GPU-friendly compositing.
- In the foreground, show a simple spinning ring, a status label, and a percentage number.
- Drive the label and percentage from a small array of named setup steps, where each step has a relative "weight" representing how large a share of total progress it should count for (not all steps equal) \\u2014 compute the displayed percentage as a genuine running weighted sum: fully-completed steps' weights plus the currently in-progress step's own fractional completion, divided by the total weight across all steps.
- Advance to the next step's label only once the current step's weighted fraction has genuinely reached completion (via a real timer-based fraction calculation, not an arbitrary fixed delay unrelated to the displayed number), and show a final "Ready" label once every step's weight has been accounted for.`,
    },
  },
};

export default gradientMeshLoadingScreen;
