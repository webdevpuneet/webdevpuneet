const loaderMilestoneProgressBar = {
  id: 'loader-milestone-progress-bar',
  title: 'Progress Bar with Milestone Labels',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="mp-card">
  <div class="mp-track" id="mpTrack">
    <div class="mp-fill" id="mpFill"></div>
    <div class="mp-milestones" id="mpMilestones"></div>
  </div>
  <div class="mp-labels" id="mpLabels"></div>
  <button type="button" class="mp-btn" id="mpBtn">Run upload</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.mp-card{width:100%;max-width:420px;background:#151f34;border:1px solid #223055;border-radius:16px;padding:24px}

.mp-track{position:relative;height:8px;background:#1e293b;border-radius:6px;margin:0 6px}
.mp-fill{position:absolute;top:0;left:0;bottom:0;width:0%;background:linear-gradient(90deg,#6366f1,#22d3ee);border-radius:6px;transition:width .5s cubic-bezier(.22,1,.36,1)}

.mp-milestones{position:absolute;inset:0}
.mp-tick{position:absolute;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#1e293b;border:2px solid #334155;transition:background .3s,border-color .3s,transform .3s}
.mp-tick.mp-hit{background:#6366f1;border-color:#a5b4fc;transform:scale(1.15)}

.mp-labels{position:relative;height:34px;margin:10px 6px 0}
.mp-tag{position:absolute;top:0;transform:translateX(-50%);font-size:10.5px;font-weight:700;color:#5b6484;white-space:nowrap;transition:color .3s}
.mp-tag.mp-hit{color:#818cf8}
.mp-tag.mp-current{color:#fff}

.mp-btn{margin-top:18px;width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:11px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
.mp-btn:hover{background:#4f46e5}
.mp-btn:disabled{opacity:.5;cursor:not-allowed}`,

  js: `var MILESTONES = [
  { pct: 0, label: 'Uploading' },
  { pct: 35, label: 'Processing' },
  { pct: 70, label: 'Optimizing' },
  { pct: 100, label: 'Done' },
];

var fill = document.getElementById('mpFill');
var ticksWrap = document.getElementById('mpMilestones');
var labelsWrap = document.getElementById('mpLabels');
var btn = document.getElementById('mpBtn');

MILESTONES.forEach(function (m) {
  var tick = document.createElement('div');
  tick.className = 'mp-tick';
  tick.style.left = m.pct + '%';
  tick.dataset.pct = m.pct;
  ticksWrap.appendChild(tick);

  var tag = document.createElement('div');
  tag.className = 'mp-tag';
  tag.style.left = m.pct + '%';
  tag.textContent = m.label;
  tag.dataset.pct = m.pct;
  labelsWrap.appendChild(tag);
});

var ticks = ticksWrap.querySelectorAll('.mp-tick');
var tags = labelsWrap.querySelectorAll('.mp-tag');

// The only thing that determines a milestone's visual state is a real
// comparison between the current progress value and that milestone's own
// position — not a fixed timer per milestone.
function applyProgress(progress) {
  fill.style.width = progress + '%';

  ticks.forEach(function (tick) {
    var pct = Number(tick.dataset.pct);
    tick.classList.toggle('mp-hit', progress >= pct);
  });

  tags.forEach(function (tag) {
    var pct = Number(tag.dataset.pct);
    tag.classList.toggle('mp-hit', progress >= pct);
  });

  // "Current" milestone: the highest one whose position is <= progress,
  // as long as we haven't fully reached the next one yet.
  var current = null;
  MILESTONES.forEach(function (m) {
    if (progress >= m.pct) current = m.pct;
  });
  tags.forEach(function (tag) {
    tag.classList.toggle('mp-current', Number(tag.dataset.pct) === current && progress < 100);
  });
}

function runUpload() {
  btn.disabled = true;
  var progress = 0;
  applyProgress(0);

  var timer = setInterval(function () {
    progress += 2 + Math.random() * 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      btn.disabled = false;
    }
    applyProgress(progress);
  }, 180);
}

btn.addEventListener('click', runUpload);
applyProgress(0);`,

  seo: {
    title: 'Progress Bar with Milestone Labels — Position-Aware Loading Bar in HTML CSS JS',
    description: `A progress bar with labeled milestones that activate the instant real progress crosses their position — computed from the actual percentage, not fixed timing. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Progress Bar with Milestone Labels — Labels That React to Real Progress, Not a Timer',
      description: `A milestone progress bar labels specific points along a bar — "Uploading," "Processing," "Optimizing," "Done" — so users know not just how much is done, but what's happening at each stage. The part that's easy to get wrong is making those labels light up on a fixed animation schedule instead of the bar's actual value; this snippet computes every milestone's state from a real comparison against the current progress percentage, so it stays correct even if progress speeds up, stalls, or jumps.

**Milestones as data, not fixed CSS positions**

A \`MILESTONES\` array holds \`{ pct, label }\` pairs — a position along the 0–100 track and its label. Both the tick dot and the text label for each milestone are generated from this array and placed with \`style.left = pct + '%'\`, so the milestone positions live in one place and the track adapts automatically if you add, remove, or reposition a milestone.

**Real position-vs-progress comparison**

The core logic is \`applyProgress(progress)\`, called every time the real progress value changes: for every milestone, it checks \`progress >= pct\` and toggles a \`mp-hit\` class accordingly — a live comparison, recomputed from the actual current value, not a \`setTimeout\` per milestone assuming a fixed pace. Crucially, this means if you drive \`progress\` from a real upload's \`loaded/total\`, a milestone lights up the instant the bar visually reaches it, correctly handling any pace — fast, slow, uneven, or paused.

**A "current" stage, not just done/not-done**

Beyond the binary hit/not-hit state, the code also computes which milestone is the *current* one — the highest milestone whose position is at or below the current progress, as long as 100% hasn't been reached — and highlights just that label differently (\`mp-current\`, shown in full white). That third state is what lets a user glance at the bar and know not just "which stages are complete" but "which stage is happening right now," which two-state hit/miss labeling can't convey.

**Driving it from anything**

The demo simulates progress with a random-increment \`setInterval\`, but \`applyProgress(progress)\` is the only function that needs calling — wire it to a real upload's progress event, a multi-step task's completion count, or any 0–100 value, and the fill width, tick states, and label states all stay correct automatically. Pair it with an [upload progress](/ui-snippets/upload-progress/) bar for the raw percentage, or a [segmented progress](/ui-snippets/segmented-progress/) bar for a discrete-step alternative.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A bar with 4 labeled milestones renders at 0%.` },
      { title: 'Click "Run upload"', text: `Progress climbs at an uneven pace; milestones light up as the bar reaches them.` },
      { title: 'Watch the current stage', text: `The active milestone's label turns fully white while progress is between it and the next.` },
      { title: 'Edit MILESTONES', text: `Add, remove, or reposition { pct, label } entries — the bar adapts automatically.` },
      { title: 'Drive it from real data', text: `Call applyProgress(yourRealPercentage) from your actual task's progress updates.` },
      { title: 'Restyle it', text: `Change the tick size, fill gradient, or label typography.` },
    ] },
    features: [
      { title: 'Milestones as data', text: `A single MILESTONES array drives tick positions and labels.` },
      { title: 'Real position-vs-progress check', text: `Each milestone's hit state is a live comparison, not a timed animation.` },
      { title: 'Three real states', text: `Upcoming, hit, and current are all derived from the same progress value.` },
      { title: 'Correct at any pace', text: `Works identically whether progress is fast, slow, uneven, or paused.` },
      { title: 'Single source of truth', text: `applyProgress() is the only function needed to keep everything in sync.` },
      { title: 'Smooth fill transition', text: `The bar fill eases with a cubic-bezier transition as width changes.` },
      { title: 'Animated tick activation', text: `Ticks scale up and recolor the instant they're crossed.` },
      { title: 'Zero dependencies', text: `Pure HTML/CSS/JS — no charting or progress library.` },
    ],
    useCases: [
      { title: 'File upload pipelines', text: `Label real stages like Uploading/Processing/Done — pair with [upload progress](/ui-snippets/upload-progress/).` },
      { title: 'Video/asset processing', text: `Show transcoding stages (Uploading, Encoding, Optimizing, Ready).` },
      { title: 'Multi-phase deployments', text: `Label build/test/deploy phases on one bar.` },
      { title: 'Onboarding with sub-stages', text: `A richer alternative to a [segmented progress](/ui-snippets/segmented-progress/) bar when steps aren't equal-width.` },
      { title: 'Import/export jobs', text: `Show parsing, validating, and writing stages with real position feedback.` },
      { title: 'Learning position-driven UI logic', text: `A reference for deriving UI state from a real value comparison instead of timers.` },
      { icon: 'CODE', title: 'Related: Liquid Fill Progress Indicator', desc: 'See the [Liquid Fill Progress Indicator](/ui-snippets/loader-liquid-fill-progress/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does a milestone know when to activate?', a: `Every call to applyProgress(progress) compares the real current progress value against each milestone's own pct position with progress >= pct, and toggles that milestone's hit class based purely on that comparison. There is no timer or animation schedule per milestone — the state is recomputed live from the actual value every time progress changes.` },
      { q: 'What happens if progress moves unevenly or stalls?', a: `Nothing breaks, because milestone state is derived fresh from the current value on every call rather than assuming a fixed pace. If progress stalls at 50%, the "Processing" milestone (at 35%) stays lit and "Optimizing" (at 70%) stays unlit correctly for as long as it stalls; if progress later jumps straight to 90%, both intermediate milestones correctly activate at once.` },
      { q: 'How is the "current" milestone different from "hit"?', a: `Hit just means progress has reached or passed that milestone's position — multiple milestones can be hit simultaneously. Current is the single highest milestone that's been hit but where progress hasn't yet reached 100%, representing "the stage happening right now" rather than "the stages already completed," and is highlighted with a distinct, brighter style.` },
      { q: 'How do I add or reposition milestones?', a: `Edit the MILESTONES array — each entry is just { pct, label }. Positions don't need to be evenly spaced; put them wherever your real process's stages actually occur (e.g. a slow initial stage might justify placing its milestone further along than a naive even split). The tick and label rendering, plus all the hit/current logic, adapt automatically.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep MILESTONES as static config and hold progress in component state. Derive each milestone's hit/current class from progress >= milestone.pct directly in the render (a computed property in Vue, a derived value in React), rather than porting the imperative classList.toggle calls — the comparison logic is the same, just expressed declaratively.` },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming the milestone highlighting is timed, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how applyProgress() derives every milestone's hit state from a live progress >= pct comparison rather than a per-milestone animation delay, and how the separate "current milestone" calculation (the highest hit milestone below 100%) differs from simple hit/miss binary state. The same assistant can help optimize it — for instance asking whether recalculating every milestone's state on every progress update is efficient enough for very frequent progress events (like a fast-firing upload progress handler), or whether it should be throttled. It's also useful for extending the pattern: ask it to support milestones with a range instead of a single point (a start and end percentage for a named phase), add a tooltip showing estimated time per stage, or animate the current milestone's label with a subtle pulse to draw more attention to it. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a progress bar with labeled milestones in plain HTML, CSS, and JavaScript where each milestone's visual state is computed from a real comparison against the current progress value — no library, no fixed per-milestone timing.

Requirements:
- Define milestones as a data array of objects, each with a position percentage (0-100) along the bar and a text label (e.g. Uploading at 0, Processing at 35, Optimizing at 70, Done at 100). Generate both the tick markers on the bar and the text labels below it from this single array, positioned absolutely at their pct value — do not hard-code the tick/label positions in CSS.
- Write one function that takes the current real progress value (0-100) and: sets the fill bar's width to that value, and for every milestone in the array, determines whether it has been "hit" purely by checking if progress is greater than or equal to that milestone's own position — this must be a live comparison recomputed on every call, not a CSS animation or JavaScript timeout tied to elapsed time.
- Separately compute which single milestone is the "current" one — defined as the highest-position milestone that has been hit, as long as progress has not yet reached 100 — and apply a visually distinct style to just that one label (different from both the hit style and the not-yet-reached style), so there are three distinguishable states: upcoming, hit/completed, and currently active.
- Demonstrate the logic is correct regardless of pace by driving progress from a demo button that increments it by a randomized, uneven amount on an interval (not a fixed linear increment), and confirm the milestones activate at the correct moments regardless of how unevenly progress advances.
- Give the fill bar a smooth CSS transition on width, and give each tick marker a smooth transition on its own hit-state styling (a subtle scale and color change) so activation feels responsive rather than instant and jarring.`,
    },
  },
};

export default loaderMilestoneProgressBar;
