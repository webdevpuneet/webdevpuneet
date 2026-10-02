const progressWizard = {
  id: 'progress-wizard',
  title: 'Multi-Step Progress Wizard',
  lastmod: '2026-06-13',
  category: 'navigation',
  html: `<div class="wizard-wrap">
  <div class="wizard">
    <div class="wizard-header">
      <h2 class="wizard-title">Create Your Account</h2>
      <p class="wizard-sub">Complete all steps to get started</p>
    </div>

    <!-- Step indicator -->
    <div class="steps" id="stepsEl">
      <div class="step active" data-step="1">
        <div class="step-circle">
          <svg class="step-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="step-info">
          <div class="step-label">Profile</div>
          <div class="step-desc">Personal info</div>
        </div>
      </div>
      <div class="step-line"><div class="step-line-fill" id="line1"></div></div>
      <div class="step" data-step="2">
        <div class="step-circle">
          <svg class="step-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="step-info">
          <div class="step-label">Security</div>
          <div class="step-desc">Set password</div>
        </div>
      </div>
      <div class="step-line"><div class="step-line-fill" id="line2"></div></div>
      <div class="step" data-step="3">
        <div class="step-circle">
          <svg class="step-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="step-info">
          <div class="step-label">Plan</div>
          <div class="step-desc">Choose tier</div>
        </div>
      </div>
      <div class="step-line"><div class="step-line-fill" id="line3"></div></div>
      <div class="step" data-step="4">
        <div class="step-circle">
          <svg class="step-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="step-info">
          <div class="step-label">Done</div>
          <div class="step-desc">All set!</div>
        </div>
      </div>
    </div>

    <!-- Panels -->
    <div class="panels">
      <div class="panel active" id="panel1">
        <h3 class="panel-title">Personal Information</h3>
        <div class="field-row">
          <div class="field"><label>First name</label><input type="text" placeholder="Alex" value="Alex"></div>
          <div class="field"><label>Last name</label><input type="text" placeholder="Morgan" value="Morgan"></div>
        </div>
        <div class="field"><label>Email address</label><input type="email" placeholder="alex@example.com" value="alex@example.com"></div>
        <div class="field"><label>Job title</label><input type="text" placeholder="Software Engineer" value="Software Engineer"></div>
      </div>

      <div class="panel" id="panel2">
        <h3 class="panel-title">Set Your Password</h3>
        <div class="field"><label>Password</label><input type="password" placeholder="Min. 8 characters" value="••••••••••"></div>
        <div class="field"><label>Confirm password</label><input type="password" placeholder="Repeat password" value="••••••••••"></div>
        <div class="strength-row">
          <div class="strength-bars">
            <div class="sbar filled"></div><div class="sbar filled"></div><div class="sbar filled"></div><div class="sbar"></div>
          </div>
          <span class="strength-label">Strong</span>
        </div>
        <label class="checkbox-row"><input type="checkbox" checked> Enable two-factor authentication</label>
      </div>

      <div class="panel" id="panel3">
        <h3 class="panel-title">Choose Your Plan</h3>
        <div class="plan-cards">
          <label class="plan-card"><input type="radio" name="plan" value="free" checked><div class="plan-body"><div class="plan-name">Free</div><div class="plan-price">$0/mo</div><div class="plan-feat">3 projects · 1GB storage</div></div></label>
          <label class="plan-card selected"><input type="radio" name="plan" value="pro"><div class="plan-body"><div class="plan-name">Pro <span class="pop-badge">Popular</span></div><div class="plan-price">$12/mo</div><div class="plan-feat">Unlimited projects · 50GB</div></div></label>
          <label class="plan-card"><input type="radio" name="plan" value="team"><div class="plan-body"><div class="plan-name">Team</div><div class="plan-price">$39/mo</div><div class="plan-feat">5 seats · 200GB storage</div></div></label>
        </div>
      </div>

      <div class="panel" id="panel4">
        <div class="success-state">
          <div class="success-ring">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 class="success-title">Account Created!</h3>
          <p class="success-sub">Welcome aboard, Alex. Your account is ready. Check your inbox for a confirmation email.</p>
          <div class="summary-pills">
            <span class="pill">Alex Morgan</span>
            <span class="pill">alex@example.com</span>
            <span class="pill pill-pro">Pro Plan</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer nav -->
    <div class="wizard-footer">
      <button class="btn-back" id="btnBack" onclick="prevStep()" disabled>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>
      <span class="step-count" id="stepCount">Step 1 of 4</span>
      <button class="btn-next" id="btnNext" onclick="nextStep()">
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #f0f4ff 0%, #faf0ff 100%); display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.wizard-wrap { width: 100%; max-width: 520px; }
.wizard { background: #fff; border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,0.1); overflow: hidden; }
.wizard-header { padding: 28px 28px 0; }
.wizard-title { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 4px; }
.wizard-sub { font-size: 13px; color: #6b7280; }

/* Step indicator */
.steps { display: flex; align-items: center; padding: 24px 28px; gap: 0; }
.step { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.step-circle { width: 36px; height: 36px; border-radius: 50%; border: 2px solid #e5e7eb; background: #fff; display: flex; align-items: center; justify-content: center; color: #9ca3af; transition: all 0.3s; flex-shrink: 0; }
.step.active .step-circle { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
.step.done .step-circle { border-color: #6366f1; background: #6366f1; color: #fff; }
.check-icon { display: none; }
.step.done .step-icon { display: none; }
.step.done .check-icon { display: block; }
.step-info { display: none; }
.step.active .step-info { display: block; }
.step-label { font-size: 12px; font-weight: 700; color: #111827; }
.step-desc { font-size: 10px; color: #6b7280; }
.step-line { flex: 1; height: 2px; background: #e5e7eb; margin: 0 8px; position: relative; overflow: hidden; }
.step-line-fill { height: 100%; width: 0; background: #6366f1; transition: width 0.4s ease; }

/* Panels */
.panels { padding: 0 28px; min-height: 220px; }
.panel { display: none; animation: fadeIn 0.25s ease; }
.panel.active { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
.panel-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 16px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
.field label { font-size: 12px; font-weight: 600; color: #374151; }
.field input { padding: 9px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 13px; color: #111827; outline: none; transition: border-color 0.2s; }
.field input:focus { border-color: #6366f1; }
.strength-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.strength-bars { display: flex; gap: 4px; }
.sbar { width: 32px; height: 4px; border-radius: 2px; background: #e5e7eb; }
.sbar.filled { background: #10b981; }
.strength-label { font-size: 11px; font-weight: 700; color: #10b981; }
.checkbox-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; cursor: pointer; }
.checkbox-row input { width: 15px; height: 15px; accent-color: #6366f1; }
.plan-cards { display: flex; flex-direction: column; gap: 10px; }
.plan-card { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1.5px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: all 0.15s; }
.plan-card:has(input:checked) { border-color: #6366f1; background: #f5f3ff; }
.plan-card input { accent-color: #6366f1; }
.plan-body { flex: 1; }
.plan-name { font-size: 13px; font-weight: 700; color: #111827; display: flex; align-items: center; gap: 6px; }
.plan-price { font-size: 12px; font-weight: 600; color: #6366f1; }
.plan-feat { font-size: 11px; color: #6b7280; }
.pop-badge { font-size: 9px; font-weight: 700; background: #6366f1; color: #fff; padding: 1px 6px; border-radius: 10px; }

/* Success */
.success-state { text-align: center; padding: 20px 0; }
.success-ring { width: 68px; height: 68px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; animation: pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275); }
@keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
.success-title { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 8px; }
.success-sub { font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 16px; }
.summary-pills { display: flex; flex-wrap: wrap; gap: 7px; justify-content: center; }
.pill { font-size: 12px; font-weight: 600; padding: 4px 12px; background: #f3f4f6; color: #374151; border-radius: 20px; }
.pill-pro { background: #eef2ff; color: #6366f1; }

/* Footer */
.wizard-footer { display: flex; align-items: center; justify-content: space-between; padding: 20px 28px; border-top: 1px solid #f3f4f6; margin-top: 20px; }
.btn-back { display: flex; align-items: center; gap: 5px; padding: 8px 16px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #fff; color: #6b7280; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-back:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; }
.btn-back:disabled { opacity: 0.35; cursor: default; }
.step-count { font-size: 12px; color: #9ca3af; font-weight: 500; }
.btn-next { display: flex; align-items: center; gap: 5px; padding: 9px 20px; border: none; border-radius: 8px; background: #6366f1; color: #fff; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.btn-next:hover { background: #4f46e5; }`,

  js: `let current = 1;
const TOTAL = 4;

function updateWizard() {
  for (let i = 1; i <= TOTAL; i++) {
    const step = document.querySelector('[data-step="' + i + '"]');
    const panel = document.getElementById('panel' + i);
    step.classList.remove('active','done');
    panel.classList.remove('active');
    if (i < current) step.classList.add('done');
    else if (i === current) { step.classList.add('active'); panel.classList.add('active'); }
    if (i <= TOTAL - 1) {
      const fill = document.getElementById('line' + i);
      if (fill) fill.style.width = i < current ? '100%' : '0%';
    }
  }
  document.getElementById('btnBack').disabled = current === 1;
  document.getElementById('btnNext').disabled = current === TOTAL;
  const nextBtn = document.getElementById('btnNext');
  nextBtn.innerHTML = current === TOTAL - 1
    ? 'Finish <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'
    : 'Next <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>';
  document.getElementById('stepCount').textContent = 'Step ' + current + ' of ' + TOTAL;
}

function nextStep() { if (current < TOTAL) { current++; updateWizard(); } }
function prevStep() { if (current > 1) { current--; updateWizard(); } }

// Plan card radio sync
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', function() {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    this.querySelector('input').checked = true;
  });
});

updateWizard();`,

  seo: {
    title: 'Multi-Step Progress Wizard — HTML CSS JS Snippet',
    description: 'Multi-step signup wizard with animated step indicator, connector fill, panel transitions, and plan selector. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `Multi-Step Progress Wizard — Animated Step Indicator, Connector Fill & Plan Selector`,
      description: `A multi-step wizard breaks a long form into smaller, focused stages that feel manageable. Each step shows one logical group of fields — personal info, security, plan selection, confirmation — and a persistent progress indicator at the top communicates how far along the user is. Research consistently shows that multi-step forms have higher completion rates than long single-page forms because the cognitive load per screen is lower and progress feels visible and achievable.\n\n**Step indicator architecture**\n\nThe step indicator is a horizontal flex row: four \`.step\` elements separated by \`.step-line\` spacers. Each step contains a circle icon and a label; only the active step shows its label text (via \`display:none\` on \`.step-info\` and \`display:block\` on \`.step.active .step-info\`). This keeps the indicator compact on small screens while showing helpful context on the active step.\n\n**Connector line fill animation**\n\nEach \`.step-line\` has a child \`.step-line-fill\` div. When a step is completed, JavaScript sets \`fill.style.width = '100%'\`. Because the CSS defines \`transition: width 0.4s ease\` on the fill, the line smoothly grows from left to right — visually "unlocking" the path to the next step. This technique requires no canvas or SVG — just a block div inside an \`overflow:hidden\` container.\n\n**Done state: swap icon via CSS**\n\nCompleted steps show a checkmark instead of their original icon. This is achieved with two sibling SVGs: \`.step-icon\` (the step's purpose icon) and \`.check-icon\` (a checkmark). By default \`.check-icon\` is \`display:none\`. When the parent gets the \`.done\` class, CSS rules flip them: \`.step.done .step-icon { display:none }\` and \`.step.done .check-icon { display:block }\`. No DOM manipulation required — the icons are always in the HTML, CSS controls which is visible.\n\n**Panel transitions**\n\nEach form section is a \`.panel\` div; only the one with \`.active\` has \`display:block\`. A CSS \`@keyframes fadeIn\` animation on \`.panel.active\` slides the panel in from 12px to the right with an opacity fade over 250ms, giving a sense of forward motion when advancing steps. Going backwards could use a mirrored animation (translateX from -12px) which you can add by swapping the class on the panel before setting active.\n\n**Plan selector with :has() CSS**\n\nThe plan selection uses \`<label>\` wrappers containing a hidden radio input. \`.plan-card:has(input:checked)\` applies the selected border and background when the radio inside is checked — pure CSS selection state with no JavaScript listener. A JavaScript click handler also syncs a \`.selected\` class for browsers that don't support \`:has()\` yet, providing a robust progressive enhancement approach.\n\n**JavaScript state machine**\n\nThe \`current\` integer tracks the active step (1–4). \`updateWizard()\` is a pure render function: it iterates 1–TOTAL, assigns \`active\`/\`done\`/neutral classes to each step, activates the matching panel, and sets line fill widths. Both \`nextStep()\` and \`prevStep()\` simply increment/decrement \`current\` then call \`updateWizard()\`. This single-state-variable + pure-render pattern maps directly to React's \`useState\` hook.\n\n**Success state animation**\n\nThe final panel shows a green ring with a checkmark that scales in from 0 using \`@keyframes pop\` with a spring cubic-bezier \`(0.175, 0.885, 0.32, 1.275)\`. This overshoot easing is the same used in iOS confirmation animations — it makes the success feel earned and satisfying.\n\n**Button state management**\n\nThe Back button has the HTML \`disabled\` attribute toggled by \`btnBack.disabled = current === 1\`. The Next button's label changes to "Finish" with a checkmark icon when on the penultimate step, and the button is disabled on the last step. All visual states flow from the single \`current\` integer — no scattered class toggles.\n\n**React integration**\n\nUse \`useState(1)\` for the current step. Wrap each panel in a component: \`<ProfileStep />\`, \`<SecurityStep />\`, \`<PlanStep />\`, \`<SuccessStep />\`. Render only the active component. The step indicator maps over a \`STEPS\` config array to render circles and labels. Pass \`onNext\` and \`onBack\` callbacks down to each step component, or manage navigation in the parent wizard component.\n\n**Accessibility**\n\nThe step indicator should use \`role="list"\` on the steps container and \`role="listitem"\` on each step. The active step should have \`aria-current="step"\`. The panels should use \`aria-live="polite"\` so screen readers announce the new panel content when it appears. Disabled buttons already communicate their state via the HTML \`disabled\` attribute.\n\nSee also the [stepper snippet](/ui-snippets/stepper/) for a simpler number-based indicator, the [multi-step form snippet](/ui-snippets/multi-step-form/) for a form-focused variant, and the [circular steps snippet](/ui-snippets/circular-steps/) for a radial progress design.`
    },
    howToUse: [
      { title: 'Copy the full HTML structure', text: 'The wizard needs all four .panel divs and the .steps indicator in the same container. Do not separate them — the JS targets all elements by ID.' },
      { title: 'Adjust step count', text: 'To add or remove steps: add/remove .step and .step-line elements in .steps, add/remove .panel divs, and update the TOTAL constant in the JS.' },
      { title: 'Add the CSS and JS', text: 'Paste both blocks. The JS updateWizard() function is the single source of truth — it derives all visual state from the current integer variable.' },
      { title: 'Customise panel content', text: 'Replace the content inside each .panel with your own form fields. The wizard navigation works independently of what is inside each panel.' },
      { title: 'Add validation before advancing', text: 'In nextStep(), add a validation check before incrementing current. Return early if validation fails, and show an error message inside the current panel.' }
    ],
    features: [
      'Animated connector line fill between steps',
      'Icon-to-checkmark swap on completed steps using CSS only',
      'Panel slide-in animation on step change',
      'Plan selector using :has() CSS with JS fallback',
      'Back/Next button state derived from single integer',
      'Next button label changes to "Finish" on last step',
      'Success panel with spring-easing pop animation',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: '👤', title: 'Signup onboarding', desc: 'Create a multi-step account flow with profile, security and plan steps, with an animated connector filling between completed steps.' },
      { icon: '⚙️', title: 'Product setup wizards', desc: 'Split a SaaS configuration into manageable stages, with icons turning into checkmarks on completed steps through CSS only.' },
      { icon: '🛒', title: 'Checkout flows', desc: 'Divide an e-commerce checkout into cart, shipping and payment, with panels sliding in when the step changes.' },
      { icon: '📝', title: 'Intake and survey forms', desc: 'Break long forms into sections to improve completion, using a plan selector built with `:has()` and a JavaScript fallback.' },
      { icon: 'CODE', title: 'Related: Sticky Product Bar', desc: 'See the [Sticky Product Bar](/ui-snippets/sticky-product-bar/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I implement this wizard in React?', a: 'Use useState(1) for current step. Map a STEPS config array to render the indicator. Render only the active panel component. Pass onNext/onBack as props or use a context.' },
      { q: 'How do I add validation before advancing to the next step?', a: 'In nextStep(), run your validation logic first. If it fails, show an error inside the current panel and return early without incrementing current.' },
      { q: 'Can I allow clicking step circles to jump to any step?', a: 'Add an onclick to each .step that calls goToStep(n). Only allow jumping to completed steps (where i < current) to prevent skipping required fields.' },
      { q: 'How do I animate backwards as well as forwards?', a: 'Track a direction variable (next/prev). In fadeIn keyframe, use translateX(12px) for forward. Add a fadeInBack animation with translateX(-12px) and apply it when direction is prev.' },
      { q: 'How do I export this wizard to React, Vue, or Angular?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the step-indicator and panel styles become utility classes, a Vue 3 single-file component with the step navigation in script setup, and an Angular standalone component. Each converter preserves the markup, the connector-fill animation, and the panel transitions, so the wizard behaves identically across React, Vue, and Angular. Hold the current step and form values in component state and pass the plan options in as a prop or input instead of hardcoding the panels.' }
    ],
    aiPrompt: {
      paragraph: `You don't have to trace every class toggle in updateWizard by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how a single current integer drives the step circles, the connector fill widths, the active panel, and the Back/Next button states all from one loop in updateWizard, or how the plan-card selection uses the CSS :has(input:checked) selector alongside a JavaScript fallback for browsers without it. The same assistant can help optimize it, for instance checking whether updateWizard's full re-render on every step change is wasteful compared to diffing only the two steps that changed, or whether the inline SVG icons duplicated in every step should be deduplicated with symbol/use references. It's equally useful for extending the wizard: ask it to add per-step field validation that blocks nextStep() until required inputs are filled, animate backward navigation with a mirrored slide direction, or persist in-progress answers to sessionStorage so a refresh doesn't lose progress. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-step signup wizard in plain HTML, CSS, and JavaScript with no framework and no libraries.

Requirements:
- A horizontal step indicator with one circular node per step (containing a purpose icon and a separate checkmark icon layered in the same node), connected by thin line segments between adjacent nodes. Only the active step's text label should be visible; other steps show only their icon.
- Each connector line segment must contain a child fill element that starts at zero width and animates to 100% width via a CSS transition on width when the step before it is completed, visually "unlocking" progress toward the next step.
- A completed step's node must swap from its purpose icon to the checkmark icon purely through CSS display toggles driven by a done class — both icons must already exist in the markup, with only visibility switched.
- One panel per step, each holding that step's form fields, with only the active step's panel displayed; switching the active panel must play a CSS keyframe animation that fades in and slides in slightly from one side.
- A single current integer step variable and one pure render function that, each time it runs, loops over every step and derives that step's classes (done, active, or neither), the matching panel's visibility, and each connector fill's width purely from comparing the step's position to current — no other code should ever set these classes directly.
- A plan-selection panel using label-wrapped radio inputs where the visually selected card is driven by the CSS :has(input:checked) selector, plus a JavaScript click handler that also toggles a selected class as a fallback for browsers without :has() support.
- Back and Next buttons wired to decrement/increment current and re-run the render function, with Back disabled on the first step, and Next's label and icon changing to "Finish" specifically on the second-to-last step.`,
    },
  },
};

export default progressWizard;
