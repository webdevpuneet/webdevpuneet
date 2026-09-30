const multiStepForm = {
    id: 'multi-step-form',
    title: 'Multi-step Form',
    category: 'forms',
    html: `<div class="wizard">
  <div class="progress">
    <div class="step-dot active" id="d1">1</div>
    <div class="line" id="l1"></div>
    <div class="step-dot" id="d2">2</div>
    <div class="line" id="l2"></div>
    <div class="step-dot" id="d3">3</div>
  </div>

  <div class="step active" id="s1">
    <h3>Personal Info</h3>
    <div class="fields">
      <input type="text" placeholder="First name" />
      <input type="text" placeholder="Last name" />
      <input type="email" placeholder="Email address" />
    </div>
  </div>

  <div class="step" id="s2">
    <h3>Account Setup</h3>
    <div class="fields">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm password" />
    </div>
  </div>

  <div class="step" id="s3">
    <h3>All Done! 🎉</h3>
    <p class="confirm-msg">Your account has been created successfully. Check your email for the verification link.</p>
    <div class="confirm-icon">✓</div>
  </div>

  <div class="actions">
    <button class="btn ghost" id="back-btn" onclick="prevStep()" style="display:none">Back</button>
    <button class="btn solid" id="next-btn" onclick="nextStep()">Next →</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.wizard { background: #fff; border-radius: 18px; padding: 28px 24px; width: 340px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 24px; }

.progress { display: flex; align-items: center; }
.step-dot { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #94a3b8; flex-shrink: 0; transition: all 0.25s; }
.step-dot.active { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
.step-dot.done { border-color: #6366f1; background: #6366f1; color: #fff; }

.line { flex: 1; height: 2px; background: #e2e8f0; transition: background 0.25s; }
.line.done { background: #6366f1; }

.step { display: none; flex-direction: column; gap: 14px; }
.step.active { display: flex; animation: slideIn 0.2s ease; }
@keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:none; } }

h3 { font-size: 16px; font-weight: 700; color: #1e293b; }

.fields { display: flex; flex-direction: column; gap: 10px; }
.fields input { padding: 10px 13px; font-size: 13px; font-family: inherit; border: 1.5px solid #e2e8f0; border-radius: 8px; outline: none; color: #1e293b; transition: border-color 0.15s; }
.fields input:focus { border-color: #6366f1; }

.confirm-msg { font-size: 13px; color: #64748b; line-height: 1.65; }
.confirm-icon { font-size: 40px; text-align: center; color: #16a34a; }

.actions { display: flex; gap: 10px; justify-content: flex-end; }
.btn { padding: 9px 20px; font-size: 13px; font-weight: 600; border-radius: 8px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
.btn.solid { background: #6366f1; color: #fff; border: none; }
.btn.solid:hover { background: #4f46e5; }
.btn.ghost { background: none; color: #475569; border: 1.5px solid #e2e8f0; }
.btn.ghost:hover { border-color: #6366f1; color: #6366f1; }`,
    js: `let cur = 1;
const total = 3;

function update() {
  for (let i = 1; i <= total; i++) {
    document.getElementById('s'+i).classList.toggle('active', i === cur);
    const dot = document.getElementById('d'+i);
    dot.classList.toggle('active', i === cur);
    dot.classList.toggle('done', i < cur);
    dot.textContent = i < cur ? '✓' : i;
    if (i < total) document.getElementById('l'+i).classList.toggle('done', i < cur);
  }
  document.getElementById('back-btn').style.display = cur > 1 ? 'block' : 'none';
  const nextBtn = document.getElementById('next-btn');
  nextBtn.textContent = cur === total - 1 ? 'Submit ✓' : cur === total ? 'Done' : 'Next →';
  if (cur === total) nextBtn.style.background = '#16a34a';
}

function nextStep() { if (cur < total) { cur++; update(); } }
function prevStep() { if (cur > 1) { cur--; update(); } }`,

  seo: {
    title: 'Multi-Step Form — Free HTML CSS JS Wizard Snippet',
    description: 'Three-step form wizard with dot stepper, done/active states and back/next navigation guards. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Multi-Step Form — cur Variable, Dot Active/Done States & Step Panel Switching',
      description: `A multi-step form breaks a long form into manageable sections — account details, personal info, and confirmation — displayed one at a time, as in a [checkout form](/ui-snippets/checkout-form/) or [progress wizard](/ui-snippets/progress-wizard/). The [stepper](/ui-snippets/stepper/) indicator at the top shows progress through the sections, reducing the cognitive load of a large single-page form.

**The cur variable and update()**

\`let cur = 1\` tracks the current step (1-indexed). \`update()\` runs after every Next or Back click. For each step index \`i\`, it: shows/hides the step panel via \`.active\` class, updates the dot via \`.active\` (current) and \`.done\` (completed), and sets the dot's \`textContent\` to \`'✓'\` for done steps or the step number for active/pending. Back/Next buttons have boundary guards — Back is disabled at step 1, Next changes to Submit at step 3.

**The dot stepper**

Each dot is a 32px circle. \`.step-dot.active\` applies accent colour border and text. \`.step-dot.done\` applies filled accent background with white tick. The connecting lines between dots fill with accent colour for completed steps.

**Step panel switching**

Each \`.step-content\` panel has \`display: none\` by default. Adding \`.active\` switches to \`display: flex\`. Only one panel is active at a time — \`update()\` iterates all panels and sets the class based on the index comparison.

**Validation before advancing**

In a production form, validate the current step's fields before calling \`next()\`. If validation fails, show error messages and return without incrementing \`cur\`.

**Step state management**

The stepper has three states per step: pending (grey circle with number), active (accent ring with pulsing outer glow), and done (filled circle with checkmark). These are managed by index comparison: steps before currentStep are done, currentStep is active, steps after are pending. Each step dot uses CSS conditional classes rather than inline styles — this keeps the visual logic in CSS where it belongs.

**Validation before advance**

goNext() checks required fields in the current step before advancing: const required = currentPanel.querySelectorAll('[required]'); const valid = [...required].every(f => f.value.trim()). If any required field is empty, the step does not advance and the empty fields get a red border via .invalid class. This prevents users from reaching the final step with incomplete data.

**Progress line fill**

The connecting line between step dots fills progressively: width: (currentStep / totalSteps) * 100 + '%'. The line uses a gradient from accent to accent — a visual indicator of overall progress separate from the individual step dots.

**Data collection across steps**

Each input retains its value as steps change because the panels are shown/hidden via display toggle, not created/destroyed. Collect all form values at the final step using new FormData(formElement) or querySelectorAll('[name]') to gather all named inputs regardless of which panel they are in.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click Next and Back', text: 'Click Next to advance through steps. The dot stepper updates with active and done states. Click Back to return.' },
        { title: 'Update step content', text: 'In the HTML panel, change the heading, field labels, and input types in each .step-content div.' },
        { title: 'Add a fourth step', text: 'Add a .step-dot and connecting .line element in the stepper row, and a .step-content div. Update const total = 4 in the JS.' },
        { title: 'Add step validation', text: 'In the JS next() function, check required fields before incrementing cur. If a field is empty, show an error and return.' },
        { title: 'Change accent colour', text: 'Update the accent colour (#6366f1) on .step-dot.active, .step-dot.done, and .connecting line in the CSS panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'cur variable (1-indexed) drives all step state — one source of truth',
      'update() sets .active/.done on dots and .active on step panels',
      'Done dots show checkmark; active dots show number; pending dots dim',
      'Connecting lines fill with accent for completed step segments',
      'Next changes to Submit label at the last step',
      'Back disabled at step 1; boundary guards prevent out-of-range navigation',
      'Step panels use display: none / display: flex toggle via .active',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'FORM',   title: 'Sign-up and onboarding wizards',      desc: 'Split registration into Account, Profile, and Preferences steps. Each step focuses the user on one set of fields, reducing abandonment.' },
      { icon: 'FLOW',   title: 'Checkout and payment flows',          desc: 'Break checkout into Shipping, Payment, and Review steps. The progress indicator shows users how close they are to completing the order.' },
      { icon: 'APP',    title: 'Survey and feedback forms',            desc: 'Present survey questions in groups to prevent overwhelm. The stepper shows progress through the survey.' },
      { icon: 'LEARN',  title: 'Learn step state management with a variable', desc: 'The entire form state lives in one cur variable. Edit update() in the JS panel to understand how a single integer drives all visual states.' },
      { icon: 'DESIGN', title: 'Setup and configuration wizards',     desc: 'Guide users through initial product configuration in steps. The progress indicator communicates how much setup remains.' },
      { icon: 'CODE',   title: 'Add per-step validation',             desc: 'Insert field validation before cur++ in next(). If a required field is empty, show an inline error message and return without advancing.' },
      { icon: 'CODE', title: 'Related: Sort Dropdown', desc: 'See the [Sort Dropdown](/ui-snippets/sort-dropdown/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the step navigation work?', a: 'next() increments cur if cur < total; prev() decrements if cur > 1. After either, update() runs — it loops i from 1 to total and applies .active/.done to each dot and .active to the matching step panel.' },
      { q: 'How do connecting lines fill for completed steps?', a: 'Each .line element between dots has a conditional class. Lines before the current step (i < cur) get .done applied via classList.toggle("done", i < cur). CSS .line.done applies the accent background colour.' },
      { q: 'How do I add a fourth step?', a: 'Add a .step-dot, a connecting .line, and another .step-dot to the progress row in the HTML. Add a fourth .step-content div. Update const total = 4 in the JS. The update() loop handles any number of steps.' },
      { q: 'How do I add validation before advancing?', a: 'In next(), before cur++, read the current step\'s required fields: const inputs = document.querySelectorAll("#s" + cur + " input[required]"). Check each input.value. If any are empty, show an error message and return early without incrementing cur.' },
      { q: 'How do I submit the form on the last step?', a: 'The Next button changes label to Submit at the last step. Wire the button\'s onclick to a submit function when cur === total, or replace the button with a real <button type="submit"> inside a <form> element.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. In React, manage currentStep in useState. Derive dot states and panel visibility from currentStep in the render. Validate the current step panel\'s inputs in the next handler before incrementing.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing every classList.toggle call by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the single cur variable drives three independent visual systems at once — the step-dot fill and checkmark, the connecting line fill, and which .step panel is display: flex — inside one update() function. The same assistant can help optimize it, for instance asking whether looping from 1 to total on every single Next/Back click is wasteful compared to only touching the two steps whose state actually changed, or whether the hardcoded three-step total should instead be derived from counting .step elements in the DOM. It's also handy for extending the wizard: ask it to add real per-step required-field validation before cur++, persist entered values if the user navigates away and back, or swap the dot stepper for a labeled step-name version. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "multi-step form wizard" in plain HTML, CSS, and JavaScript driven by a single current-step integer — no form library, no framework.

Requirements:
- A row of numbered circular step indicators connected by horizontal line segments, where each circle and its adjacent line segment must independently show one of three states (pending/grey, active/highlighted, or done/filled with a checkmark instead of its number), computed purely by comparing that step's position to the current step variable.
- Several form step panels, each hidden by default (display: none) and shown only when its index equals the current step, with a slide-and-fade-in animation each time a panel becomes active.
- A single function that, given the current step number, updates every dot's state, every connecting line's fill, and which panel is visible — so there is exactly one place where step-transition logic lives, not scattered across multiple handlers.
- A Back button that is hidden entirely on the first step and a Next button whose label changes to "Submit" on the second-to-last step and something like "Done" on the very last step.
- Before advancing past any step, check that step's required input fields have non-empty values; if any are empty, block the advance and visually flag the empty fields rather than silently failing.
- All step panels must remain in the DOM the whole time (not recreated), so any values a user typed on an earlier step are still present if they navigate back to it.
- The final step must be a distinct confirmation view (not just another form panel) with a success icon and message.`,
    },
  },
};

export default multiStepForm;
