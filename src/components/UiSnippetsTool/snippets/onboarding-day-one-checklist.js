const onboardingDayOneChecklist = {
  id: 'onboarding-day-one-checklist',
  title: 'New Hire Day-One Checklist',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="odc-card">
  <div class="odc-head">
    <h2>Welcome to Northwind, Jamie</h2>
    <p class="odc-sub">Complete these steps to get fully set up.</p>
    <div class="odc-progress-track"><div class="odc-progress-fill" id="odcProgressFill"></div></div>
    <span class="odc-progress-label" id="odcProgressLabel">0 of 9 complete</span>
  </div>

  <div class="odc-celebrate" id="odcCelebrate" hidden>
    <div class="odc-celebrate-icon">&#127881;</div>
    <h3>You're all set, Jamie!</h3>
    <p>Every day-one task is complete. Welcome to the team.</p>
  </div>

  <div class="odc-groups" id="odcGroups">
    <section class="odc-group">
      <h3 class="odc-group-title">Before you start</h3>
      <ul class="odc-list">
        <li class="odc-item"><label><input type="checkbox" checked /><span class="odc-box"></span><span class="odc-text">Sign offer letter &amp; NDA</span></label></li>
        <li class="odc-item"><label><input type="checkbox" checked /><span class="odc-box"></span><span class="odc-text">Submit I-9 &amp; tax forms</span></label></li>
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Set up direct deposit</span></label></li>
      </ul>
    </section>

    <section class="odc-group">
      <h3 class="odc-group-title">Day one</h3>
      <ul class="odc-list">
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Activate laptop &amp; company email</span></label></li>
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Join Slack &amp; team channels</span></label></li>
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Meet your onboarding buddy</span></label></li>
      </ul>
    </section>

    <section class="odc-group">
      <h3 class="odc-group-title">First week</h3>
      <ul class="odc-list">
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Complete security &amp; compliance training</span></label></li>
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Schedule 1:1s with your team</span></label></li>
        <li class="odc-item"><label><input type="checkbox" /><span class="odc-box"></span><span class="odc-text">Ship your first small task</span></label></li>
      </ul>
    </section>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e7e9f2;padding:40px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.odc-card{width:100%;max-width:480px;background:#12141f;border:1px solid #23273a;border-radius:18px;padding:26px}
.odc-head h2{margin:0 0 4px;font-size:19px}
.odc-sub{margin:0 0 16px;color:#9aa0b8;font-size:13.5px}
.odc-progress-track{height:9px;border-radius:99px;background:#1c2032;overflow:hidden}
.odc-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#34d399,#22d3ee);border-radius:99px;transition:width .3s ease}
.odc-progress-label{display:block;margin-top:8px;font-size:12px;color:#8a8fa8}
.odc-groups{margin-top:20px;display:flex;flex-direction:column;gap:20px}
.odc-group-title{margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#a5b4fc}
.odc-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.odc-item label{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:9px;cursor:pointer}
.odc-item label:hover{background:#181b27}
.odc-item input{position:absolute;opacity:0;width:1px;height:1px}
.odc-box{width:19px;height:19px;flex:none;border-radius:6px;border:1.5px solid #3a3f5c;position:relative;transition:background .15s ease,border-color .15s ease}
.odc-item input:checked + .odc-box{background:#34d399;border-color:#34d399}
.odc-item input:checked + .odc-box::after{content:'';position:absolute;left:6px;top:2px;width:5px;height:9px;border:solid #062018;border-width:0 2px 2px 0;transform:rotate(40deg)}
.odc-item input:focus-visible + .odc-box{outline:2px solid #6d5efc;outline-offset:2px}
.odc-text{font-size:13.5px;color:#e7e9f2}
.odc-item input:checked ~ .odc-text{color:#7d8199;text-decoration:line-through}
.odc-celebrate{text-align:center;padding:20px 10px;margin-top:18px;border-radius:14px;background:#0f2e22;display:none}
.odc-celebrate.odc-show{display:block}
.odc-celebrate-icon{font-size:28px;margin-bottom:8px}
.odc-celebrate h3{margin:0 0 4px;color:#34d399;font-size:16px}
.odc-celebrate p{margin:0;color:#9ae6c2;font-size:13px}
.odc-groups.odc-hide{display:none}`,

  js: `const checkboxes = document.querySelectorAll('.odc-item input[type="checkbox"]');
const fill = document.getElementById('odcProgressFill');
const label = document.getElementById('odcProgressLabel');
const celebrate = document.getElementById('odcCelebrate');
const groups = document.getElementById('odcGroups');
const total = checkboxes.length;

function updateProgress() {
  const done = document.querySelectorAll('.odc-item input[type="checkbox"]:checked').length;
  const pct = Math.round((done / total) * 100);
  fill.style.width = pct + '%';
  label.textContent = done + ' of ' + total + ' complete';

  if (done === total) {
    celebrate.hidden = false;
    requestAnimationFrame(() => celebrate.classList.add('odc-show'));
    groups.classList.add('odc-hide');
  } else {
    celebrate.classList.remove('odc-show');
    celebrate.hidden = true;
    groups.classList.remove('odc-hide');
  }
}

checkboxes.forEach((box) => box.addEventListener('change', updateProgress));

updateProgress();`,

  seo: {
    title: 'New Hire Day-One Checklist — Free Onboarding Progress UI',
    description: `A grouped new-hire onboarding checklist (Before you start / Day one / First week) with checkable items, a live progress bar, and a celebratory completed state. Plain HTML, CSS & JS.`,
    about: {
      title: 'New Hire Day-One Checklist — Grouped Tasks With a Progress Bar',
      description: `The new hire day-one checklist is the first thing a new employee sees: onboarding tasks grouped by timing, checked off as they're completed, with a progress bar tracking the whole thing and a celebratory screen once every task is done. This snippet builds it in plain HTML, CSS, and JavaScript.

**Grouped, not one flat list**

Tasks are split into three \`<section>\` groups — Before you start, Day one, First week — each with its own heading. Grouping by timing rather than showing one undifferentiated list matches how a new hire actually thinks about the first days: what's needed before arriving versus what happens once they're in the building.

**Real checkbox semantics, custom look**

Each item is a native \`<input type="checkbox">\` visually hidden but still focusable, paired with a sibling \`<span class="odc-box">\` styled as the visible check via a CSS \`:checked + .odc-box\` selector, plus \`:focus-visible + .odc-box\` for a visible keyboard-focus ring. The checkbox stays a real, accessible form control — screen readers and keyboard navigation work exactly as expected — while the visual design is fully custom.

**Progress computed live, from the DOM**

Every \`change\` event recounts \`:checked\` boxes against the total and updates both the bar's width and a "N of 9 complete" label — nothing is tracked separately in a counter variable that could drift out of sync with what's actually checked.

**A completed state that feels earned**

Reaching 100% hides the checklist groups entirely and reveals a celebratory panel with an emoji, a personalized headline, and a confirmation message — faded in via a class toggled on the next animation frame so the transition actually animates rather than snapping in. Unchecking any item afterward reverses both: the celebration hides and the checklist groups reappear.

**Strikethrough on completed items**

Checked items get their label text struck through and dimmed via \`:checked ~ .odc-text\`, giving immediate visual feedback on each item beyond just the aggregate progress bar.

**Customizing it**

Swap the task list and grouping for your own onboarding flow, persist checked state to localStorage or a backend per employee, or add due dates per task. Pair it with an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/) for a simpler flat version, or an [onboarding tour](/ui-snippets/onboarding-tour/) for a guided product walkthrough alongside it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A grouped checklist with a progress bar renders.` },
      { title: 'Check off an item', text: `The bar fills and the count label updates immediately.` },
      { title: 'Watch the item text', text: `Checked items get struck through and dimmed.` },
      { title: 'Check every remaining item', text: `The checklist hides and a celebration panel fades in.` },
      { title: 'Uncheck an item afterward', text: `The celebration reverses and the checklist reappears.` },
      { title: 'Edit the groups and items', text: `Add, remove, or rename tasks; the total recalculates.` },
    ] },
    features: [
      { title: 'Three timed groups', text: `Before you start, Day one, First week sections.` },
      { title: 'Accessible custom checkboxes', text: `Real inputs styled via :checked sibling selectors.` },
      { title: 'Live progress bar', text: `Recomputed from actual :checked count, not a counter.` },
      { title: 'Strikethrough feedback', text: `Each checked item's text visually completes.` },
      { title: 'Celebratory completed state', text: `Fades in only once every item is checked.` },
      { title: 'Reversible completion', text: `Unchecking restores the checklist view.` },
      { title: 'Keyboard-focus ring', text: `:focus-visible styling on the custom checkbox.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS, and JS.` },
    ],
    useCases: [
      { title: 'HR onboarding portals', text: `Pair with an [onboarding tour](/ui-snippets/onboarding-tour/) for the product side.` },
      { title: 'IT provisioning checklists', text: `Track laptop, email, and access setup.` },
      { title: 'Remote new-hire kits', text: `Combine before/day-one/week-one shipping tasks.` },
      { title: 'Manager onboarding plans', text: `Track 1:1s and team introductions.` },
      { title: 'Compliance tracking', text: `Confirm required training is complete.` },
      { title: 'General setup wizards', text: `Reuse the grouped-checklist pattern anywhere.` },
      { icon: 'CODE', title: 'Related: Active Sessions / Device List', desc: 'See the [Active Sessions / Device List](/ui-snippets/session-device-list/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the progress bar kept accurate as items are checked and unchecked?', a: `Every checkbox's change event calls updateProgress, which re-queries the DOM for how many checkboxes currently have :checked true out of the total, and recomputes the percentage from that fresh count. There's no separate counter variable being incremented or decremented — the bar always reflects exactly what's checked in the DOM at that moment, so it can't drift out of sync.` },
      { q: 'Are the checkboxes still accessible despite the custom visual style?', a: `Yes. Each is a real native input type="checkbox", just visually hidden with position:absolute and a 1px size rather than display:none, so it stays in the accessibility tree and keyboard tab order. The visible box is a sibling span styled via the :checked + .odc-box CSS selector, and :focus-visible + .odc-box adds an outline when the hidden input receives keyboard focus — so screen readers and keyboard users get the same semantics as a default checkbox.` },
      { q: 'Why does the celebration panel fade in with requestAnimationFrame instead of just adding a class immediately?', a: `The panel starts with hidden removed and its odc-show class (which triggers the CSS opacity/display transition) added one frame later. Adding both in the same synchronous step can cause the browser to skip the transition since it never registers the "before" state — deferring the class addition to the next frame guarantees the starting state is painted first, so the fade actually animates.` },
      { q: 'How would I persist checked state across a page reload?', a: `On each change event, also write the checked state of every checkbox (keyed by a stable id or index) to localStorage or a backend call. On page load, before calling updateProgress for the first time, read that saved state back and set each checkbox's checked property accordingly, then call updateProgress once to sync the bar and celebration state to what was restored.` },
      { q: 'How do I use this checklist in React, Vue, or Angular?', a: `Model each task as an object with a completed boolean, grouped by section, held in component state. Render checkboxes bound to that state via your framework's two-way or event binding, derive the progress count and percentage from the same array in render, and conditionally render the celebration panel when every task's completed is true. The custom checkbox CSS (:checked + sibling) needs no changes since it's pure CSS.` },
    ],
    aiPrompt: {
      paragraph: `Checklist components look simple but have a few details worth double-checking, so paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to confirm the hidden-native-checkbox-plus-styled-sibling-span pattern keeps the control genuinely accessible (correct focus order, screen-reader announcement, :focus-visible handling) rather than just visually convincing. The same assistant can help you extend the data model — for example asking it to add persistence to localStorage so progress survives a reload, to make certain tasks required before others unlock (a "Day one" task stays disabled until every "Before you start" task is checked), or to add due dates per task with overdue styling. It's also useful for reviewing the completion celebration: ask whether the reversible uncheck behavior (celebration hides again if an item is unchecked) is the right UX or whether a completed checklist should stay "completed" once reached.`,
      prompt: `Build a "new hire day-one checklist" in plain HTML, CSS, and JavaScript — no frameworks, no dependencies.

Requirements:
- Onboarding tasks grouped into three labeled sections in this order: "Before you start", "Day one", and "First week", each containing several checklist items.
- Each item uses a real native <input type="checkbox"> that is visually hidden (not display:none — keep it in the accessibility tree and tab order) paired with a sibling element styled to look like a custom checkbox via a CSS :checked + sibling selector, plus a visible focus ring via :focus-visible + sibling for keyboard users.
- A progress bar and a "N of TOTAL complete" text label above the checklist, recomputed on every checkbox's change event by counting how many checkboxes are currently :checked against the total — do not track completion with a separately incremented counter variable that could drift from the actual checkbox states.
- Checked items show their label text with a strikethrough and dimmed color, driven by CSS from the checkbox's checked state.
- When every checkbox becomes checked, hide the checklist groups and reveal a celebratory panel (icon, heading, message) that fades in — deferring the class that triggers the fade to the next animation frame so the transition actually animates rather than snapping in instantly. If any item is unchecked afterward, reverse this: hide the celebration and show the checklist groups again.
- Keep it in a dark theme with a green/teal accent for progress and completion, and make sure the JavaScript only references classnames/ids that exist in the HTML you write.`,
    },
  },
};

export default onboardingDayOneChecklist;
