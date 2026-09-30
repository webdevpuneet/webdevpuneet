const modalOnboardingChecklistProgress = {
  id: 'modal-onboarding-checklist-progress',
  title: 'Onboarding Checklist Modal with Progress Ring',
  lastmod: '2026-08-30',
  category: 'modals',
  cdnUrls: [],
  html: `<div class="ocp-page"><button type="button" class="ocp-open" id="ocpOpen">Getting started <span class="ocp-badge" id="ocpOpenBadge">0/4</span></button></div>

<div class="ocp-backdrop" id="ocpBackdrop"></div>
<div class="ocp-modal" id="ocpModal" role="dialog" aria-modal="true" aria-labelledby="ocpTitle">
  <button type="button" class="ocp-close" id="ocpClose" aria-label="Close">✕</button>

  <div class="ocp-head">
    <svg class="ocp-ring" width="52" height="52" viewBox="0 0 52 52">
      <circle class="ocp-ring-track" cx="26" cy="26" r="22" fill="none" stroke-width="5"/>
      <circle class="ocp-ring-fill" id="ocpRingFill" cx="26" cy="26" r="22" fill="none" stroke-width="5" stroke-dasharray="138.2" stroke-dashoffset="138.2" transform="rotate(-90 26 26)"/>
    </svg>
    <div>
      <h3 id="ocpTitle">Set up your workspace</h3>
      <p class="ocp-sub" id="ocpSub">0 of 4 steps complete</p>
    </div>
  </div>

  <ul class="ocp-list" id="ocpList">
    <li class="ocp-item" data-task="profile">
      <button type="button" class="ocp-item-head">
        <span class="ocp-check"></span>
        <span class="ocp-item-title">Complete your profile</span>
        <svg class="ocp-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ocp-item-body">
        <p>Add your name and photo so teammates recognize you.</p>
        <input type="text" class="ocp-item-input" placeholder="Your full name">
        <button type="button" class="ocp-item-done" data-task="profile">Mark complete</button>
      </div>
    </li>
    <li class="ocp-item" data-task="workspace">
      <button type="button" class="ocp-item-head">
        <span class="ocp-check"></span>
        <span class="ocp-item-title">Name your workspace</span>
        <svg class="ocp-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ocp-item-body">
        <p>This appears in your URL and at the top of every page.</p>
        <input type="text" class="ocp-item-input" placeholder="e.g. Acme Marketing">
        <button type="button" class="ocp-item-done" data-task="workspace">Mark complete</button>
      </div>
    </li>
    <li class="ocp-item" data-task="invite">
      <button type="button" class="ocp-item-head">
        <span class="ocp-check"></span>
        <span class="ocp-item-title">Invite a teammate</span>
        <svg class="ocp-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ocp-item-body">
        <p>Collaboration works better with at least one other person.</p>
        <input type="text" class="ocp-item-input" placeholder="teammate@company.com">
        <button type="button" class="ocp-item-done" data-task="invite">Mark complete</button>
      </div>
    </li>
    <li class="ocp-item" data-task="integration">
      <button type="button" class="ocp-item-head">
        <span class="ocp-check"></span>
        <span class="ocp-item-title">Connect an integration</span>
        <svg class="ocp-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ocp-item-body">
        <p>Link Slack, GitHub, or Google Calendar to see live updates here.</p>
        <button type="button" class="ocp-item-done" data-task="integration">Mark complete</button>
      </div>
    </li>
  </ul>

  <p class="ocp-done-msg" id="ocpDoneMsg" hidden>All set! Your workspace is ready to go.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}
.ocp-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.ocp-open{display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #e2e8f0;color:#0f172a;border-radius:11px;padding:11px 18px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit}
.ocp-badge{background:#eef2ff;color:#6366f1;font-size:11.5px;font-weight:800;padding:3px 9px;border-radius:99px}

.ocp-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.ocp-backdrop.show{opacity:1;pointer-events:all}

.ocp-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);opacity:0;pointer-events:none;
  width:min(420px,92vw);max-height:86vh;overflow-y:auto;background:#fff;border-radius:18px;padding:26px 24px 24px;z-index:91;
  transition:opacity .22s,transform .22s;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.ocp-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}
.ocp-close{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:13px}

.ocp-head{display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-right:20px}
.ocp-ring{flex-shrink:0}
.ocp-ring-track{stroke:#e2e8f0}
.ocp-ring-fill{stroke:#6366f1;stroke-linecap:round;transition:stroke-dashoffset .35s ease}
.ocp-head h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:3px}
.ocp-sub{font-size:12.5px;color:#64748b;font-weight:600}

.ocp-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.ocp-item{border:1.5px solid #e2e8f0;border-radius:12px;overflow:hidden;transition:border-color .15s}
.ocp-item.ocp-complete{border-color:#bbf7d0;background:#f0fdf4}

.ocp-item-head{width:100%;display:flex;align-items:center;gap:11px;padding:13px 14px;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit}
.ocp-check{width:20px;height:20px;border-radius:50%;border:2px solid #cbd5e1;flex-shrink:0;position:relative;transition:background .15s,border-color .15s}
.ocp-item.ocp-complete .ocp-check{background:#22c55e;border-color:#22c55e}
.ocp-item.ocp-complete .ocp-check::after{content:'';position:absolute;left:5px;top:1px;width:5px;height:9px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.ocp-item-title{flex:1;font-size:13.5px;font-weight:700;color:#1e293b}
.ocp-item.ocp-complete .ocp-item-title{color:#16a34a;text-decoration:line-through;text-decoration-color:#86efac}
.ocp-chev{color:#94a3b8;transition:transform .2s;flex-shrink:0}
.ocp-item.ocp-open .ocp-chev{transform:rotate(180deg)}

.ocp-item-body{max-height:0;overflow:hidden;transition:max-height .25s ease}
.ocp-item.ocp-open .ocp-item-body{max-height:180px}
.ocp-item-body>*{padding:0 14px}
.ocp-item-body p{font-size:12.5px;color:#64748b;line-height:1.5;padding-bottom:10px}
.ocp-item-input{width:calc(100% - 28px);margin:0 14px 10px;border:1.5px solid #e2e8f0;border-radius:8px;padding:8px 10px;font-size:13px;font-family:inherit;outline:none}
.ocp-item-input:focus{border-color:#6366f1}
.ocp-item-done{margin:0 14px 14px;background:#6366f1;color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit}
.ocp-item.ocp-complete .ocp-item-done{background:#22c55e}

.ocp-done-msg{margin-top:16px;text-align:center;font-size:13px;font-weight:700;color:#16a34a;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px}`,

  js: `// A non-linear onboarding checklist: unlike a gated wizard, tasks can be opened,
// completed, and revisited in ANY order — completing task 3 before task 1 works
// fine. The progress ring and header text are always derived from how many
// .ocp-item elements currently carry the .ocp-complete class.
var openBtn = document.getElementById('ocpOpen');
var openBadge = document.getElementById('ocpOpenBadge');
var backdrop = document.getElementById('ocpBackdrop');
var modal = document.getElementById('ocpModal');
var closeBtn = document.getElementById('ocpClose');
var items = document.querySelectorAll('.ocp-item');
var ringFill = document.getElementById('ocpRingFill');
var subText = document.getElementById('ocpSub');
var doneMsg = document.getElementById('ocpDoneMsg');
var list = document.getElementById('ocpList');

var RING_CIRCUMFERENCE = 138.2; // 2 * PI * r, r = 22
var TOTAL = items.length;

function openModal() {
  backdrop.classList.add('show');
  modal.classList.add('show');
}
function closeModal() {
  backdrop.classList.remove('show');
  modal.classList.remove('show');
}
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// Each item's header toggles its own expanded state independently — opening one
// task to read its instructions does not close any other already-open task.
items.forEach(function (item) {
  var head = item.querySelector('.ocp-item-head');
  head.addEventListener('click', function () {
    item.classList.toggle('ocp-open');
  });
});

function updateProgress() {
  var completeCount = document.querySelectorAll('.ocp-item.ocp-complete').length;

  var offset = RING_CIRCUMFERENCE - (completeCount / TOTAL) * RING_CIRCUMFERENCE;
  ringFill.style.strokeDashoffset = offset;

  subText.textContent = completeCount + ' of ' + TOTAL + ' steps complete';
  openBadge.textContent = completeCount + '/' + TOTAL;

  var allDone = completeCount === TOTAL;
  doneMsg.hidden = !allDone;
  if (allDone) {
    setTimeout(function () { list.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
  }
}

document.querySelectorAll('.ocp-item-done').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); // don't also toggle the accordion open/close
    var item = btn.closest('.ocp-item');
    var alreadyComplete = item.classList.contains('ocp-complete');

    item.classList.toggle('ocp-complete', !alreadyComplete);
    btn.textContent = alreadyComplete ? 'Mark complete' : 'Completed \\u2713';

    // Collapse a task automatically once it's marked done, since there's nothing
    // more to do there — but leave it expanded if the visitor un-marks it.
    if (!alreadyComplete) {
      item.classList.remove('ocp-open');
    }

    updateProgress();
  });
});

updateProgress();`,

  seo: {
    title: 'Onboarding Checklist Modal with Progress Ring — Free HTML CSS JS Snippet',
    description: 'A getting-started checklist modal where tasks can be completed in any order, each expanding for its own instructions, with an SVG progress ring that tracks real completion state. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Onboarding Checklist Modal — Non-Linear Tasks, SVG Progress Ring, Independent Expand/Collapse',
      description: `A step-gated wizard forces task 1 before task 2 before task 3 — appropriate for a signup flow, wrong for onboarding. Real "getting started" checklists (the kind you see in Notion, Linear, or Slack after signing up) let a new user do whichever task feels easiest first. This modal is built that way: any task can be opened, completed, or revisited in any order, and the progress ring simply reflects however many are done at any given moment.

**No gating logic, on purpose**

There's no code anywhere checking whether task 1 is complete before allowing task 3 to be marked done. The only global operation is \`updateProgress()\`, which recomputes completion by counting \`.ocp-item.ocp-complete\` elements in the live DOM — it has no concept of task order, and it doesn't need one, because none is enforced.

**Independent expand/collapse per task, not an accordion**

Each task's header click only toggles \`.ocp-open\` on its own \`<li>\` — there's no "close all others" step like a single-open FAQ accordion. A visitor reading the instructions for "Invite a teammate" can also have "Connect an integration" open at the same time, since checklist tasks (unlike sequential wizard steps) genuinely benefit from being compared side by side.

**The SVG progress ring, explained**

The ring is two overlapping \`<circle>\` elements: a static gray \`.ocp-ring-track\` and a colored \`.ocp-ring-fill\` on top, both using \`stroke-dasharray\` set to the circle's circumference (\`138.2\`, precomputed as \`2 * π * 22\` for the 22px radius). Setting \`stroke-dashoffset\` to a value between \`0\` (fully drawn) and the full circumference (invisible) reveals a proportional arc — \`updateProgress()\` computes \`offset = circumference - (completeCount / total) * circumference\`, so completing more tasks reduces the offset and draws more of the ring, animated by a CSS \`transition\` on \`stroke-dashoffset\`. The \`rotate(-90deg)\` transform on the fill circle is what makes the arc start filling from the top (12 o'clock) rather than the default 3 o'clock start point of an SVG circle's path.

**Completing a task auto-collapses it, un-completing doesn't re-collapse anything**

When \`ocp-item-done\` is clicked to *mark* a task complete, its \`.ocp-open\` class is removed — the task's job is done, so there's nothing left to read, and collapsing it keeps the checklist tidy as tasks get knocked out. But clicking the same button again to *undo* completion deliberately leaves the expanded state alone, since a visitor un-marking a task most likely wants to see its instructions again, not have it snap shut.

**\`e.stopPropagation()\` prevents a double-toggle**

The "Mark complete" button lives inside the same clickable header row's parent — without \`e.stopPropagation()\` in its click handler, a click would also bubble up and fire the header's own open/close toggle, causing the task to complete AND collapse-then-reopen in a confusing flash. Stopping propagation keeps the two interactions cleanly separate.

**Customizing it**

Add a fifth task by copying an \`.ocp-item\` block with its own \`data-task\` and a matching \`.ocp-item-done\` button — \`TOTAL\` is derived from \`items.length\` automatically, so the ring and counters adjust without any manual update. Replace the demo's instant \`classList.toggle\` completion with a real backend call by having the "Mark complete" handler \`await\` a \`fetch()\` before toggling the visual state, so a failed save doesn't show a false completion.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the checklist', text: 'Click the "Getting started" trigger — the badge already shows how many of the four tasks are done.' },
        { title: 'Expand any task, in any order', text: 'Click a task header to reveal its instructions — multiple tasks can be expanded at once.' },
        { title: 'Mark a task complete', text: 'The progress ring animates to reflect the new completion count, and the task auto-collapses.' },
        { title: 'Un-mark a task', text: 'Click "Completed" again to revert it — the ring updates accordingly and the task stays expanded.' },
        { title: 'Complete all four', text: 'A confirmation message appears once every task is marked done.' },
        { title: 'Add a fifth task', text: 'Copy an .ocp-item block with its own data-task — TOTAL and the ring update automatically from items.length.' },
      ],
    },
    features: [
      'Non-linear checklist — tasks can be completed in any order, unlike a gated wizard',
      'SVG progress ring driven by stroke-dasharray/stroke-dashoffset, animated via CSS transition',
      'Ring circumference and offset computed from real completion count, no hardcoded percentages',
      'Each task expands/collapses independently — not a single-open accordion',
      'Completing a task auto-collapses it; un-completing deliberately leaves it expanded',
      'e.stopPropagation() on the complete button prevents an accidental double-toggle with the header',
      'Header text and badge counter both derived live from items.length and the complete count',
      'All-done confirmation message appears automatically once every task is complete',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'SaaS post-signup onboarding', desc: 'Show a getting-started checklist immediately after account creation, distinct from the [step validation gated wizard modal](/ui-snippets/step-validation-gated-wizard-modal/) used for the signup flow itself.' },
      { icon: 'FLOW', title: 'Workspace and team setup flows', desc: 'Let a new admin invite teammates and connect integrations in whatever order suits their rollout.' },
      { icon: 'LEARN', title: 'Learn SVG progress ring math', desc: 'Study how stroke-dasharray and a computed stroke-dashoffset draw a proportional arc without a canvas or chart library.' },
      { icon: 'DESIGN', title: 'Onboarding tour alternatives', desc: 'Pair with or replace an [onboarding tour](/ui-snippets/onboarding-tour/) for users who prefer a checklist they control over a guided walkthrough.' },
      { icon: 'CODE', title: 'Product-led growth activation tracking', desc: 'Reuse the same non-linear completion pattern to track key activation events per account.' },
      { icon: 'CODE', title: 'Related: Onboarding Checklist Widget', desc: 'Pair with the [Onboarding Checklist Widget](/ui-snippets/onboarding-checklist-widget/) for a persistent, non-modal version of the same idea.' },
    ],
    faqs: [
      { q: 'Can tasks be completed in any order, or does it force a sequence like a wizard?', a: 'Any order. There is no gating logic anywhere in the code checking whether an earlier task is complete before allowing a later one to be marked done — updateProgress() only counts however many .ocp-item elements currently carry the .ocp-complete class, with no concept of task ordering at all.' },
      { q: 'How is the progress ring drawn without a chart library or canvas?', a: 'It uses two overlapping SVG <circle> elements with stroke-dasharray set to the circle\'s circumference (138.2, precomputed for a 22px radius). The filled circle\'s stroke-dashoffset is set to circumference minus (completeCount / total) times circumference, which reveals a proportional arc — animated smoothly via a CSS transition on stroke-dashoffset whenever a task is completed or un-completed.' },
      { q: 'Why does the ring arc start filling from the top instead of the right side?', a: 'An SVG circle\'s path naturally starts at its 3 o\'clock position. The fill circle has a CSS transform: rotate(-90deg) applied around its own center, which rotates that starting point to 12 o\'clock — the conventional starting position for a progress ring.' },
      { q: 'Why does completing a task collapse it, but un-completing it does not re-collapse anything?', a: 'When a task is marked complete, its instructions are no longer needed, so collapsing it automatically keeps the checklist visually tidy as more tasks get finished. But un-marking a task most likely means the visitor wants to revisit or redo it, so the code deliberately leaves its expanded state untouched in that direction rather than forcing it shut.' },
      { q: 'Why does the Mark Complete button call e.stopPropagation()?', a: 'The button sits inside the same list item whose header has its own click handler for expanding/collapsing. Without stopping propagation, a click on the button would also bubble up and trigger the header\'s toggle, causing the task to both complete and flicker its open/closed state in the same click — stopPropagation() keeps completing a task and expanding/collapsing it as two independent interactions.' },
      { q: 'How do I add a fifth checklist task?', a: 'Copy an entire .ocp-item <li> block — including its .ocp-item-head, .ocp-check, title, chevron, and .ocp-item-body with a matching .ocp-item-done button sharing the same data-task value — and add it to #ocpList. No JavaScript changes are needed: TOTAL is derived from items.length automatically, so the ring, the header subtext, and the open-button badge all adjust on their own.' },
    ],
    aiPrompt: {
      paragraph: `Instead of reasoning through the stroke-dasharray math on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the SVG progress ring's stroke-dashoffset is computed from the live completion count, why the fill circle needs a -90 degree rotation to start its arc at the top, and why completing a task auto-collapses it while un-completing one deliberately does not. The same assistant can help you extend it — ask it to persist completion state to localStorage or a real backend so progress survives a page refresh, add a small celebratory animation (like a confetti burst) when the final task is completed, or add a "skip for now" option per task that dismisses it from the count without marking it complete. It's also useful for a UX review: ask whether auto-collapsing on completion could feel jarring if a task's instructions included a follow-up link the visitor still wanted to reference, and whether an "undo" toast after completion might be a better pattern than requiring a second click on the same button. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an onboarding checklist modal in plain HTML, CSS, and vanilla JavaScript with an SVG progress ring — no library, no framework, and tasks must NOT be gated in a required sequence.

Requirements:
- A trigger button that opens a modal (backdrop + centered dialog with a fade/scale transition) showing an SVG circular progress ring next to a heading and a "X of Y steps complete" subtext, followed by a list of several checklist tasks (e.g. four), each with a title and an expand/collapse accordion-style body containing instructions and a "Mark complete" button.
- Each task must expand and collapse completely independently of the others (clicking one task's header must never affect any other task's expanded/collapsed state) — this must explicitly NOT be a single-open accordion, and tasks must be completable in any order with no dependency between them.
- The SVG progress ring must be built from two overlapping circle elements using stroke-dasharray equal to the circle's circumference, with the filled circle's stroke-dashoffset recalculated from the actual number of currently-completed tasks divided by the total, animated with a CSS transition — not a hardcoded set of preset percentages. Rotate the filled circle so its arc visually starts at the top of the ring rather than the default right-hand starting point of an SVG circle.
- Clicking a task's "Mark complete" button must toggle that task's completed state (visually distinct styling, like a checkmark and strikethrough title) and immediately update the progress ring and header text — but this click must not also trigger that task's own expand/collapse toggle, since both controls live in the same list item.
- When a task is newly marked complete, automatically collapse its body (since its instructions are no longer needed) — but when a task is un-marked back to incomplete, leave its expanded/collapsed state exactly as it was, don't force it open or closed.
- Once every task is marked complete, show a small all-done confirmation message that stays hidden the rest of the time.
- Support closing the modal via a close button, backdrop click, and the Escape key.`,
    },
  },
};

export default modalOnboardingChecklistProgress;
