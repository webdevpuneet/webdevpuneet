const loaderMultiStageChecklist = {
  id: 'loader-multi-stage-checklist',
  title: 'Multi-Stage Loading Checklist',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="cl-card">
  <div class="cl-head">
    <h2 class="cl-title">Setting up your workspace</h2>
    <p class="cl-sub" id="clSub">This usually takes a few seconds…</p>
  </div>
  <ul class="cl-list" id="clList">
    <li class="cl-item" data-label="Connecting to server">
      <span class="cl-icon"></span>
      <span class="cl-text">Connecting to server</span>
    </li>
    <li class="cl-item" data-label="Verifying your account">
      <span class="cl-icon"></span>
      <span class="cl-text">Verifying your account</span>
    </li>
    <li class="cl-item" data-label="Fetching your data">
      <span class="cl-icon"></span>
      <span class="cl-text">Fetching your data</span>
    </li>
    <li class="cl-item" data-label="Preparing dashboard">
      <span class="cl-icon"></span>
      <span class="cl-text">Preparing dashboard</span>
    </li>
    <li class="cl-item" data-label="Almost there">
      <span class="cl-icon"></span>
      <span class="cl-text">Almost there</span>
    </li>
  </ul>
  <button type="button" class="cl-replay" id="clReplay">↻ Replay</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.cl-card{width:100%;max-width:380px;background:#121729;border:1px solid #232a41;border-radius:16px;padding:24px;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.cl-head{margin-bottom:18px}
.cl-title{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.01em}
.cl-sub{font-size:12.5px;color:#7c88a6;margin-top:4px;transition:opacity .2s}

.cl-list{list-style:none;display:flex;flex-direction:column;gap:2px}
.cl-item{display:flex;align-items:center;gap:12px;padding:10px 6px;border-radius:10px;opacity:.4;transition:opacity .3s}
.cl-item.is-active,.cl-item.is-done{opacity:1}

.cl-icon{position:relative;width:20px;height:20px;flex-shrink:0;border-radius:50%;border:2px solid #2b3350}
.cl-item.is-active .cl-icon{border-color:#6366f1;border-top-color:transparent;animation:clSpin .7s linear infinite}
.cl-item.is-done .cl-icon{border-color:#22c55e;background:#22c55e}
.cl-item.is-done .cl-icon::after{content:'✓';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#06210f}
.cl-item.is-error .cl-icon{border-color:#f87171}
.cl-item.is-error .cl-icon::after{content:'!';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#f87171}
@keyframes clSpin{to{transform:rotate(360deg)}}

.cl-text{font-size:13.5px;font-weight:600;color:#8a93ad}
.cl-item.is-active .cl-text{color:#fff}
.cl-item.is-done .cl-text{color:#c3cadf;text-decoration:line-through;text-decoration-color:#2b3350}

.cl-replay{display:none;margin-top:18px;width:100%;padding:10px;background:#1c2338;border:1px solid #2b3350;color:#c3cadf;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.cl-replay.show{display:block}
.cl-replay:hover{background:#242c47}`,

  js: `var items = Array.prototype.slice.call(document.querySelectorAll('.cl-item'));
var sub = document.getElementById('clSub');
var replay = document.getElementById('clReplay');
var timers = [];

// Each stage takes a different, realistic amount of time rather than a fixed
// interval — some steps (verifying an account) genuinely take longer than
// others (connecting), so the checklist advances at irregular real intervals.
var DURATIONS = [900, 1300, 1100, 1500, 800];

function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function runChecklist() {
  clearTimers();
  replay.classList.remove('show');
  sub.textContent = 'This usually takes a few seconds…';
  items.forEach(function (item) {
    item.classList.remove('is-active', 'is-done', 'is-error');
  });

  var elapsed = 0;
  items.forEach(function (item, i) {
    // Mark this step active as soon as the previous ones have finished.
    timers.push(setTimeout(function () {
      items.forEach(function (it, j) {
        it.classList.toggle('is-active', j === i);
        if (j < i) it.classList.add('is-done');
      });
    }, elapsed));

    elapsed += DURATIONS[i];

    // Then mark it done once its own duration elapses.
    timers.push(setTimeout(function () {
      item.classList.remove('is-active');
      item.classList.add('is-done');
      if (i === items.length - 1) {
        sub.textContent = 'All set — redirecting…';
        replay.classList.add('show');
      }
    }, elapsed));
  });
}

replay.addEventListener('click', runChecklist);
runChecklist();`,

  seo: {
    title: 'Multi-Stage Loading Checklist — Sequenced Step-by-Step Loader',
    description: `A literal text checklist that completes one step at a time — active spinner, then a checkmark — driven by real staggered timers, not a fake all-at-once reveal. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Multi-Stage Loading Checklist — A Sequenced, Text-Based Setup Tracker',
      description: `Most loaders show a single spinner and leave the user guessing what's actually happening. A multi-stage checklist instead names each real step of a setup process — "Connecting to server", "Verifying your account", "Fetching your data" — and completes them one at a time in front of the user, so waiting feels like watching real progress rather than staring at an opaque spin. This snippet builds that pattern in plain HTML, CSS, and vanilla JavaScript, with the sequencing driven by real, staggered \`setTimeout\` calls rather than a CSS animation that fakes the timing.

**A list, not a circle or a bar**

Unlike a circular step tracker such as [progress circle steps](/ui-snippets/progress-circle-steps/), which shows abstract numbered nodes, this pattern is a literal vertical checklist of labelled tasks — closer to what a CLI installer or a CI pipeline log shows. Each \`.cl-item\` renders its own icon and text, and only the active and completed items are fully opaque; upcoming steps sit dimmed at 40% opacity so the eye is drawn to what's happening right now.

**Three icon states from one element**

The icon is a single 20px circle whose appearance is entirely class-driven: idle is a muted ring, active adds a spinning border with one transparent edge (the classic CSS spinner trick, borrowed conceptually from a much larger [loading overlay](/ui-snippets/loading-overlay/) spinner but shrunk to list-item scale), and done fills the circle green with a \`::after\` checkmark. No icon library or SVG is needed — every state is CSS.

**Real sequencing, not synchronized CSS delays**

The core of this snippet is \`runChecklist()\`, which walks a \`DURATIONS\` array of different times per step and schedules two \`setTimeout\` calls per item: one to mark it active once every prior step's duration has elapsed, and one to mark it done after its own duration passes. Because the durations are irregular (900ms, 1300ms, 1100ms…) rather than one repeating interval, the checklist advances at a pace that reads as genuine work being tracked, not a looping animation. In a real app you would swap these fixed timeouts for actual completion signals — resolve each promise, fire each item's "done" state from its corresponding async call.

**A finished, replayable state**

Once the last item completes, the subtitle updates to a completion message and a Replay button appears, letting you re-trigger the entire sequence from a clean state — useful for demoing the effect repeatedly, and a direct model for a "session expired, reconnecting…" re-run in production.

**Wiring it to real async work**

Replace each step's timeout with the promise or callback that actually represents that step: call \`markDone(i)\` inside a \`.then()\` for step "Connecting to server" fed by your actual connection check, and so on. The active/done class toggling and CSS stay identical — only the trigger source changes. Pair it with a [loading overlay](/ui-snippets/loading-overlay/) for the surrounding page chrome or an [ai thinking loader](/ui-snippets/ai-thinking-loader/) for a single-stage AI wait.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A five-step checklist renders and begins running automatically.` },
      { title: 'Watch the stages advance', text: `Each step spins while active, then turns into a green checkmark, one at a time.` },
      { title: 'Reach the end', text: `The subtitle updates and a Replay button appears.` },
      { title: 'Click Replay', text: `The whole sequence resets and runs again from the first step.` },
      { title: 'Edit the durations', text: `Change the DURATIONS array to match your real steps' typical timing.` },
      { title: 'Wire real async work', text: `Replace each step's timeout with the promise or event that represents it.` },
    ] },
    features: [
      { title: 'Literal text checklist', text: `Named steps, not abstract nodes — the user reads exactly what is happening.` },
      { title: 'Three-state icon', text: `Idle ring, spinning active state, and a filled checkmark — pure CSS.` },
      { title: 'Real staggered timers', text: `Two setTimeout calls per step drive genuine sequential timing.` },
      { title: 'Irregular durations', text: `Steps take different amounts of time, reading as real work, not a loop.` },
      { title: 'Dimmed upcoming steps', text: `40% opacity keeps focus on the current and completed items.` },
      { title: 'Completion state', text: `A finishing message and Replay control appear once done.` },
      { title: 'Fully replayable', text: `Resets every class and timer cleanly before re-running.` },
      { title: 'Drop-in async hook', text: `Swap any timeout for a real promise with no CSS changes.` },
    ],
    useCases: [
      { title: 'Account and app setup', text: 'Show named onboarding steps completing one by one, with an idle ring, a spinning active state and a filled checkmark for each.' },
      { title: 'CI/CD and build tool screens', text: 'Mirror a pipeline\'s step-by-step progress with literal text such as Connecting to server and Verifying your account.' },
      { title: 'Data import and migration', text: 'Track Parsing file, Validating rows and Saving records, using irregular step durations so the sequence reads as real work.' },
      { title: 'Long AI or batch jobs', text: 'Pair with an [AI thinking loader](/ui-snippets/ai-thinking-loader/) to show both that the model is working and which stage it has reached.' },
      { title: 'Completion hand-off', text: 'End on an [empty state](/ui-snippets/empty-state/) or first-use screen, using two `setTimeout` calls per step for genuine sequential timing.' },
      { icon: 'CODE', title: 'Related: Liquid Fill Progress Indicator', desc: 'See the [Liquid Fill Progress Indicator](/ui-snippets/loader-liquid-fill-progress/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a circular step tracker?', a: `Progress circle steps shows abstract numbered nodes connected by a line, suited to a wizard the user navigates. This checklist is a literal vertical list of named tasks that complete on their own, unattended, suited to a setup or loading sequence the user simply watches rather than steps through manually.` },
      { q: 'How does the timing actually work?', a: `runChecklist walks a DURATIONS array and schedules two setTimeout calls per step: one that marks it active once every prior duration has elapsed, and one that marks it done after its own duration passes. Because the durations differ per step, the sequence advances irregularly, the way real setup tasks actually would, rather than ticking on one uniform interval.` },
      { q: 'How do I connect this to real async work?', a: `Replace each step's timeout with the actual promise or event it represents — call the function that adds is-active when a request starts and the one that adds is-done in its .then() or callback. Keep the same class toggling; only the trigger source changes from a timer to a real completion signal.` },
      { q: 'What happens if a step fails?', a: `Add an is-error class alongside is-active and is-done (the CSS already includes a red error icon state) and switch a step to it instead of is-done when its underlying operation rejects. You can then show a retry action, similar in spirit to the [loading state with retry on error](/ui-snippets/loader-retry-error-state/) pattern, scoped to just that one step.` },
      { q: 'How do I use this checklist loader in React, Vue, or Angular?', a: `Hold the current step index (or a per-step status map) in state and derive each item's class from it, exactly like runChecklist. Trigger transitions from real async effects instead of setTimeout — an effect per step, or a reducer driven by your actual setup calls. The CSS icon states port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how runChecklist schedules two setTimeout calls per item — one to flip on is-active once every earlier step's duration has elapsed, one to flip on is-done after its own duration — and why using irregular per-step durations rather than one repeating interval is what makes the sequence read as real progress instead of a looping animation. It's worth a design check too: ask whether dimming upcoming steps to 40% opacity is the right amount of visual hierarchy, or whether the active step's spinner should also get a subtle background highlight. For extending it, ask for a version that adds an error state mid-sequence with a per-step retry action, wires each step to a real fetch or promise instead of a timer, or persists progress across a page reload so a long setup can resume where it left off. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "multi-stage loading checklist" in plain HTML, CSS, and JavaScript — a literal list of named setup steps that complete one at a time via real timers, not decorative CSS.

Requirements:
- A vertical list of at least five list items, each with a circular status icon and a text label describing a real setup step (e.g. "Connecting to server", "Verifying your account", "Fetching your data").
- Each item must support three distinct states driven purely by CSS classes on the icon: an idle/upcoming muted ring state, an active state showing a CSS-only spinning border (no SVG or image), and a done state showing a filled circle with a checkmark rendered via a pseudo-element.
- Upcoming (not yet reached) items must be visually de-emphasized (e.g. reduced opacity) so the current and completed steps stand out.
- Drive the sequencing with a JavaScript array of different duration values per step (not one uniform repeating interval), and for each step schedule one timeout that marks it active once all prior steps' durations have elapsed, and a second timeout that marks it done after that step's own duration passes — so steps visibly complete one after another at realistic, non-uniform intervals, never all at once.
- When the final step completes, update a subtitle/status message to a completion state and reveal a "Replay" button that resets every item's classes and re-runs the entire sequence from the beginning.
- Structure the code so a real implementation could replace each step's timeout with an actual promise resolution or callback from a real async operation, without changing the class-toggling logic.`,
    },
  },
};

export default loaderMultiStageChecklist;
