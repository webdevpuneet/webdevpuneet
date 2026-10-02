const courseProgressTracker = {
  id: 'course-progress-tracker',
  title: 'Course Progress Tracker',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="cpt-panel">
  <div class="cpt-head">
    <div>
      <p class="cpt-eyebrow">Advanced CSS Layout</p>
      <h2>Course Progress</h2>
    </div>
    <div class="cpt-ring" id="cptRing">
      <svg viewBox="0 0 80 80"><circle class="cpt-ring-bg" cx="40" cy="40" r="34"/><circle class="cpt-ring-fill" id="cptRingFill" cx="40" cy="40" r="34"/></svg>
      <span class="cpt-ring-label" id="cptRingLabel">0%</span>
    </div>
  </div>
  <div class="cpt-bar-track"><div class="cpt-bar-fill" id="cptBarFill"></div></div>

  <a class="cpt-next" href="#" id="cptNext">
    <span class="cpt-next-tag">Continue where you left off</span>
    <span class="cpt-next-title">Module 4 · Grid Template Areas</span>
    <span class="cpt-next-meta">Lesson 3 of 6 · 12 min remaining</span>
  </a>

  <ul class="cpt-modules" id="cptModules">
    <li class="cpt-mod is-done" data-progress="100">
      <span class="cpt-icon" aria-hidden="true">✓</span>
      <div class="cpt-mod-body"><p class="cpt-mod-title">Flexbox Foundations</p><p class="cpt-mod-sub">6 lessons · completed</p></div>
      <div class="cpt-mod-progress"><svg viewBox="0 0 32 32"><circle class="cpt-mini-bg" cx="16" cy="16" r="13"/><circle class="cpt-mini-fill" cx="16" cy="16" r="13" style="--pct:100"/></svg></div>
    </li>
    <li class="cpt-mod is-done" data-progress="100">
      <span class="cpt-icon" aria-hidden="true">✓</span>
      <div class="cpt-mod-body"><p class="cpt-mod-title">Responsive Breakpoints</p><p class="cpt-mod-sub">5 lessons · completed</p></div>
      <div class="cpt-mod-progress"><svg viewBox="0 0 32 32"><circle class="cpt-mini-bg" cx="16" cy="16" r="13"/><circle class="cpt-mini-fill" cx="16" cy="16" r="13" style="--pct:100"/></svg></div>
    </li>
    <li class="cpt-mod is-current" data-progress="50">
      <span class="cpt-icon" aria-hidden="true">●</span>
      <div class="cpt-mod-body"><p class="cpt-mod-title">Grid Template Areas</p><p class="cpt-mod-sub">3 of 6 lessons</p></div>
      <div class="cpt-mod-progress"><svg viewBox="0 0 32 32"><circle class="cpt-mini-bg" cx="16" cy="16" r="13"/><circle class="cpt-mini-fill" cx="16" cy="16" r="13" style="--pct:50"/></svg></div>
    </li>
    <li class="cpt-mod" data-progress="0">
      <span class="cpt-icon" aria-hidden="true">○</span>
      <div class="cpt-mod-body"><p class="cpt-mod-title">Container Queries</p><p class="cpt-mod-sub">4 lessons</p></div>
      <div class="cpt-mod-progress"><svg viewBox="0 0 32 32"><circle class="cpt-mini-bg" cx="16" cy="16" r="13"/><circle class="cpt-mini-fill" cx="16" cy="16" r="13" style="--pct:0"/></svg></div>
    </li>
    <li class="cpt-mod" data-progress="0">
      <span class="cpt-icon" aria-hidden="true">○</span>
      <div class="cpt-mod-body"><p class="cpt-mod-title">Scroll-driven Animation</p><p class="cpt-mod-sub">5 lessons</p></div>
      <div class="cpt-mod-progress"><svg viewBox="0 0 32 32"><circle class="cpt-mini-bg" cx="16" cy="16" r="13"/><circle class="cpt-mini-fill" cx="16" cy="16" r="13" style="--pct:0"/></svg></div>
    </li>
  </ul>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e17;color:#e7e9f3;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.cpt-panel{width:100%;max-width:440px;background:#121628;border:1px solid #232a44;border-radius:18px;padding:22px}
.cpt-head{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:16px}
.cpt-eyebrow{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7c8cf8}
.cpt-head h2{font-size:19px;font-weight:700;margin-top:2px}
.cpt-ring{position:relative;width:64px;height:64px;flex-shrink:0}
.cpt-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.cpt-ring circle{fill:none;stroke-width:8}
.cpt-ring-bg{stroke:#232a44}
.cpt-ring-fill{stroke:#7c8cf8;stroke-linecap:round;stroke-dasharray:213.6;stroke-dashoffset:213.6;transition:stroke-dashoffset .8s ease}
.cpt-ring-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}
.cpt-bar-track{height:8px;border-radius:99px;background:#1b2039;overflow:hidden;margin-bottom:18px}
.cpt-bar-fill{height:100%;width:0%;border-radius:99px;background:linear-gradient(90deg,#7c8cf8,#c084fc);transition:width .8s ease}
.cpt-next{display:block;text-decoration:none;color:inherit;background:linear-gradient(135deg,#1d2550,#171b34);border:1px solid #33407a;border-radius:14px;padding:14px 16px;margin-bottom:20px;transition:border-color .15s,transform .15s}
.cpt-next:hover{border-color:#7c8cf8;transform:translateY(-1px)}
.cpt-next-tag{display:block;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#a5b4fc;margin-bottom:6px}
.cpt-next-title{display:block;font-size:15px;font-weight:600;margin-bottom:4px}
.cpt-next-meta{display:block;font-size:12px;color:#8b93b8}
.cpt-modules{list-style:none;display:flex;flex-direction:column;gap:6px}
.cpt-mod{display:flex;align-items:center;gap:12px;padding:10px 10px;border-radius:12px;transition:background .15s}
.cpt-mod:hover{background:#171b30}
.cpt-icon{width:22px;height:22px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;background:#1b2039;color:#5b6389}
.cpt-mod.is-done .cpt-icon{background:rgba(74,222,128,.15);color:#4ade80}
.cpt-mod.is-current .cpt-icon{background:rgba(124,140,248,.18);color:#a5b4fc}
.cpt-mod-body{flex:1;min-width:0}
.cpt-mod-title{font-size:13.5px;font-weight:600}
.cpt-mod.is-done .cpt-mod-title{color:#9aa2c0}
.cpt-mod-sub{font-size:11.5px;color:#6b7395;margin-top:2px}
.cpt-mod-progress svg{width:28px;height:28px;transform:rotate(-90deg)}
.cpt-mod-progress circle{fill:none;stroke-width:3}
.cpt-mini-bg{stroke:#232a44}
.cpt-mini-fill{stroke:#7c8cf8;stroke-linecap:round;stroke-dasharray:81.68;stroke-dashoffset:calc(81.68 - (81.68 * var(--pct)) / 100)}
.cpt-mod.is-done .cpt-mini-fill{stroke:#4ade80}`,
  js: `// Compute overall course completion from each module's data-progress attribute
// and drive the header ring + top progress bar off that single average.
const modules = Array.from(document.querySelectorAll('#cptModules .cpt-mod'));
const total = modules.reduce((sum, m) => sum + Number(m.dataset.progress || 0), 0);
const pct = Math.round(total / modules.length);

const RING_CIRCUMFERENCE = 2 * Math.PI * 34; // matches r="34" on the header ring
const ringFill = document.getElementById('cptRingFill');
const ringLabel = document.getElementById('cptRingLabel');
const barFill = document.getElementById('cptBarFill');

requestAnimationFrame(() => {
  ringFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - pct / 100));
  barFill.style.width = pct + '%';
});
ringLabel.textContent = pct + '%';

// Clicking "continue" jumps focus to the current module row for keyboard users.
document.getElementById('cptNext').addEventListener('click', (e) => {
  e.preventDefault();
  const current = document.querySelector('.cpt-mod.is-current');
  if (current) {
    current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    current.style.background = '#1d2550';
    setTimeout(() => { current.style.background = ''; }, 900);
  }
});`,
  seo: {
    title: 'Course Progress Tracker — Free LMS Sidebar UI Snippet',
    description: `A course dashboard panel with an overall-completion ring, a per-module mini progress ring, and a highlighted "continue where you left off" card. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Course Progress Tracker — Overall Ring, Module List & Resume Card',
      description: `The course progress tracker is the panel every online-learning product shows a learner as soon as they log in: how far through the course am I, and what's next? This snippet builds that panel with a header completion ring, a slim overall progress bar, a "continue where you left off" resume card, and a scrollable module list where each row carries its own mini progress ring and a done/current/upcoming status icon.

**One data source, two visualizations**

Rather than hard-coding the header percentage, the JS reads every module's \`data-progress\` attribute, averages them, and drives both the big SVG ring and the slim top bar off that single computed number. This mirrors how a real LMS would compute completion — from the actual state of each module — instead of a value someone forgot to update by hand.

**SVG rings for the completion visuals**

Both the header ring and each row's mini ring are plain \`<circle>\` elements with \`stroke-dasharray\` set to their circumference and \`stroke-dashoffset\` animated to reveal the filled arc. The mini rings use a CSS custom property, \`--pct\`, so the same \`stroke-dashoffset\` formula works for every row without repeating the circumference math per element — set \`--pct\` on the row's HTML and the ring fills itself.

**The resume card as a focal point**

The "continue where you left off" card sits between the top progress summary and the module list, styled with a gradient border-glow treatment so it reads as the primary next action rather than another list row. Clicking it scrolls the matching in-progress module into view and briefly highlights it — a pattern useful for deep-linking a learner straight back into an in-progress module.

**Status-driven module rows**

Each \`.cpt-mod\` carries a modifier class — \`.is-done\`, \`.is-current\`, or neither for upcoming — that swaps the icon glyph and colors via CSS alone, no per-row JS branching needed. Add a module by copying a row, setting its \`data-progress\` and the modifier class, and the ring and header math pick it up automatically since the average is computed from live DOM state.

**Customizing it**

Swap in real module counts, add a locked-state icon for modules gated behind prerequisites, or read progress from an API and set \`data-progress\` before this script runs. Pair it with a [lesson sidebar nav](/ui-snippets/lesson-sidebar-nav/) for full-course navigation, a [progress wizard](/ui-snippets/progress-wizard/) for a linear multi-step flow, or [circular progress](/ui-snippets/circular-progress/) for the ring pattern on its own.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `The panel renders with sample module data already filled in.` },
      { title: 'Check the header ring', text: `It animates in showing the averaged completion percentage.` },
      { title: 'Review the module list', text: `Done, current, and upcoming rows each carry their own mini ring.` },
      { title: 'Click "Continue where you left off"', text: `The current module row scrolls into view and briefly highlights.` },
      { title: 'Edit data-progress values', text: `Change a module's data-progress attribute in the HTML panel.` },
      { title: 'Reload to see the recompute', text: `The header ring and bar update to match the new average.` },
    ] },
    features: [
      { title: 'Averaged completion', text: `Header ring computed from every module's data-progress.` },
      { title: 'Shared ring math', text: `One --pct custom property drives every mini ring's dashoffset.` },
      { title: 'Resume card', text: `Highlighted "continue where you left off" next-lesson link.` },
      { title: 'Scroll-to-current', text: `Resume click scrolls and briefly flashes the active module.` },
      { title: 'Status modifiers', text: `.is-done and .is-current classes swap icon and colors via CSS.` },
      { title: 'Animated fill-in', text: `Ring and bar animate to their values on load via requestAnimationFrame.` },
      { title: 'Self-contained rows', text: `Add a module by copying a row and setting two attributes.` },
      { title: 'Dark LMS styling', text: `Indigo-to-violet gradient accents on a dark panel background.` },
    ],
    useCases: [
      { title: 'Online learning dashboards', text: 'Show learners their overall completion in a header ring, averaged from every module\'s `data-progress`, plus slim per-module rings for the detail.' },
      { title: 'Corporate compliance training', text: 'Track mandatory course completion across modules, with the continue-where-you-left-off card sending people straight to the next lesson they owe.' },
      { title: 'Cohort-based programmes', text: 'Pair with a [lesson sidebar nav](/ui-snippets/lesson-sidebar-nav/) so progress and navigation sit together, and the resume click scrolls to and flashes the active module.' },
      { title: 'Certification prep apps', text: 'Reveal which modules remain before an exam, using the [quiz result breakdown](/ui-snippets/quiz-result-breakdown/) to show which topics still need revision.' },
      { title: 'Onboarding curricula', text: 'Adapt the ring pattern for new-hire programmes alongside an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/), with one `--pct` property driving each ring\'s offset.' },
      { icon: 'CODE', title: 'Related: Environment Switcher with Color-Coded Persistent Banner', desc: 'See the [Environment Switcher with Color-Coded Persistent Banner](/ui-snippets/environment-switcher-banner/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the overall percentage calculated?', a: `The script collects every element with class .cpt-mod, reads its data-progress attribute, sums them, and divides by the module count. That single averaged number then drives both the header SVG ring's stroke-dashoffset and the slim top progress bar's width, so there's one source of truth instead of two numbers that could drift apart.` },
      { q: 'How do the mini progress rings work without repeated math?', a: `Each row's mini ring circle has a CSS custom property --pct set inline (e.g. style="--pct:50"), and the CSS computes stroke-dashoffset as the circumference minus circumference times --pct over 100. Because the formula lives once in the CSS and only --pct changes per row, adding a new module row just means copying markup and setting one property.` },
      { q: 'How do I mark a module as locked until prior ones finish?', a: `Add a .is-locked modifier alongside the existing .is-done/.is-current pattern, dim the row with reduced opacity and pointer-events: none in CSS, and swap the icon glyph to a lock symbol. Check the previous module's data-progress before allowing navigation into a locked one if you wire this to real routing.` },
      { q: 'Can the resume card link to a real lesson URL?', a: `Yes — replace the href="#" and the preventDefault-based scroll behavior with a real lesson URL once you have routing. The current demo intercepts the click to keep the example self-contained inside the sandbox, but in a real app you'd just navigate normally.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Model modules as an array of objects with title, subtitle, progress, and status fields, map them to rows, and compute the averaged percentage with a reduce in a memoized value or computed property. Drive the ring's stroke-dashoffset from that computed percentage instead of a DOM query, and the CSS ports over unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the ring math or the averaging logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how a single --pct CSS custom property lets one stroke-dashoffset formula drive every module's mini progress ring, or why the header ring's percentage is computed by averaging each module's data-progress attribute rather than being hard-coded. The same assistant can help optimize it — ask whether the reduce over data-progress values should instead weight modules by lesson count, or whether the ring's animation should use CSS @property for a smoother transition. It's also useful for extending the tracker: ask it to add a locked-module state that disables navigation until prerequisites complete, wire data-progress from a real API response, or add a confetti burst when the course hits 100%. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "course progress tracker" dashboard panel in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- A header section with an SVG ring showing the overall course completion percentage as a filled arc (using stroke-dasharray/stroke-dashoffset on a circle), plus a slim horizontal progress bar below it showing the same percentage.
- Compute that overall percentage in JavaScript, not by hard-coding it: read a data-progress attribute (0-100) off every module list item in the DOM, average them, and use that single computed value to set both the ring's stroke-dashoffset and the bar's width.
- A highlighted "continue where you left off" card, visually distinct (e.g. a gradient border or background glow) from the rest of the list, showing the next lesson's title and remaining time, that on click scrolls the current in-progress module into view in the list below and briefly flashes its background.
- A scrollable list of course modules below the resume card, each row showing: a status icon that differs for completed (checkmark), current (filled dot), and upcoming (empty circle) states via a CSS modifier class rather than per-row JavaScript branching, a title and lesson-count subtitle, and its own small SVG progress ring sized independently from the header ring.
- Make every mini ring share one CSS formula for stroke-dashoffset driven by a single CSS custom property (e.g. --pct) set inline per row, so adding a new module only requires setting that one property and a status class, not writing new CSS.
- Animate both the header ring and the top progress bar filling in on page load using requestAnimationFrame so the fill transition is visible rather than snapping instantly to its final state.`,
    },
  },
};

export default courseProgressTracker;
