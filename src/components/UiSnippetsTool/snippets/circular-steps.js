const circularSteps = {
  id: 'circular-steps',
  title: 'Circular Step Indicator',
  lastmod: '2026-06-12',
  category: 'navigation',
  html: `<div class="wizard">
  <div class="steps-track" id="steps-track">
    <div class="step active" data-step="1">
      <div class="circle-wrap">
        <svg class="ring" viewBox="0 0 44 44">
          <circle class="ring-bg" cx="22" cy="22" r="18"/>
          <circle class="ring-fill" cx="22" cy="22" r="18" id="ring-1"/>
        </svg>
        <span class="step-num">1</span>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="step-label">Account</span>
    </div>
    <div class="connector" id="conn-1-2"></div>
    <div class="step" data-step="2">
      <div class="circle-wrap">
        <svg class="ring" viewBox="0 0 44 44">
          <circle class="ring-bg" cx="22" cy="22" r="18"/>
          <circle class="ring-fill" cx="22" cy="22" r="18" id="ring-2"/>
        </svg>
        <span class="step-num">2</span>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="step-label">Profile</span>
    </div>
    <div class="connector" id="conn-2-3"></div>
    <div class="step" data-step="3">
      <div class="circle-wrap">
        <svg class="ring" viewBox="0 0 44 44">
          <circle class="ring-bg" cx="22" cy="22" r="18"/>
          <circle class="ring-fill" cx="22" cy="22" r="18" id="ring-3"/>
        </svg>
        <span class="step-num">3</span>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="step-label">Billing</span>
    </div>
    <div class="connector" id="conn-3-4"></div>
    <div class="step" data-step="4">
      <div class="circle-wrap">
        <svg class="ring" viewBox="0 0 44 44">
          <circle class="ring-bg" cx="22" cy="22" r="18"/>
          <circle class="ring-fill" cx="22" cy="22" r="18" id="ring-4"/>
        </svg>
        <span class="step-num">4</span>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="step-label">Done</span>
    </div>
  </div>
  <div class="panel-wrap">
    <div class="panel active" id="panel-1">
      <h2>Create your account</h2>
      <p>Enter a username and password to get started. We never share your details with third parties.</p>
      <input class="field" type="text" placeholder="Username" />
      <input class="field" type="password" placeholder="Password" />
    </div>
    <div class="panel" id="panel-2">
      <h2>Set up your profile</h2>
      <p>Add a display name and avatar URL so others can recognise you in shared workspaces.</p>
      <input class="field" type="text" placeholder="Display name" />
      <input class="field" type="url" placeholder="Avatar URL (optional)" />
    </div>
    <div class="panel" id="panel-3">
      <h2>Billing details</h2>
      <p>Start free for 14 days — no card required. You can add payment later from your dashboard.</p>
      <input class="field" type="text" placeholder="Card number" />
      <input class="field" type="text" placeholder="MM / YY / CVC" />
    </div>
    <div class="panel" id="panel-4">
      <h2>🎉 All set!</h2>
      <p>Your account has been created. Check your inbox for a confirmation email and then log in.</p>
    </div>
  </div>
  <div class="actions">
    <button class="btn btn-back" id="btn-back" disabled>Back</button>
    <button class="btn btn-next" id="btn-next">Next</button>
  </div>
</div>`,
  css: `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f1f5f9;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.wizard{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.08);width:100%;max-width:500px;padding:32px 28px;display:flex;flex-direction:column;gap:28px}
/* track */
.steps-track{display:flex;align-items:flex-start;justify-content:center;gap:0}
.step{display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;z-index:1}
.connector{flex:1;height:2px;background:#e2e8f0;margin-top:21px;transition:background .4s}
.connector.done{background:#6366f1}
/* ring */
.circle-wrap{position:relative;width:44px;height:44px;cursor:default}
.ring{width:44px;height:44px;transform:rotate(-90deg)}
.ring-bg{fill:none;stroke:#e2e8f0;stroke-width:3}
.ring-fill{fill:none;stroke:#6366f1;stroke-width:3;stroke-linecap:round;
  stroke-dasharray:113;stroke-dashoffset:113;transition:stroke-dashoffset .5s ease}
.step-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#94a3b8;transition:color .3s}
.check-icon{position:absolute;inset:0;margin:auto;width:18px;height:18px;color:#6366f1;opacity:0;transform:scale(.6);transition:opacity .25s,transform .25s}
.step-label{font-size:12px;font-weight:500;color:#94a3b8;transition:color .3s;white-space:nowrap}
/* active */
.step.active .ring-fill{stroke-dashoffset:28}
.step.active .step-num{color:#6366f1}
.step.active .step-label{color:#6366f1}
/* done */
.step.done .ring-fill{stroke-dashoffset:0}
.step.done .step-num{opacity:0}
.step.done .check-icon{opacity:1;transform:scale(1)}
.step.done .step-label{color:#22c55e}
.step.done .ring-fill{stroke:#22c55e}
/* panel */
.panel-wrap{position:relative;overflow:hidden;min-height:140px}
.panel{display:none;flex-direction:column;gap:14px;animation:fadeUp .3s ease}
.panel.active{display:flex}
.panel h2{font-size:18px;font-weight:700;color:#1e293b}
.panel p{font-size:14px;color:#64748b;line-height:1.6}
.field{width:100%;padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;transition:border-color .2s}
.field:focus{border-color:#6366f1}
/* actions */
.actions{display:flex;justify-content:space-between;gap:12px}
.btn{flex:1;padding:11px 20px;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s,opacity .2s}
.btn-back{background:#f1f5f9;color:#64748b}
.btn-back:hover:not(:disabled){background:#e2e8f0}
.btn-back:disabled{opacity:.4;cursor:default}
.btn-next{background:#6366f1;color:#fff}
.btn-next:hover{background:#4f46e5}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`,
  js: `const TOTAL = 4;
let current = 1;

const stepEls = [...document.querySelectorAll('.step')];
const panelEls = [...document.querySelectorAll('.panel')];
const connEls = [...document.querySelectorAll('.connector')];
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');

// circumference = 2π×18 ≈ 113.1
const C = 2 * Math.PI * 18;

function setRingProgress(ringEl, fraction) {
  ringEl.style.strokeDashoffset = C * (1 - fraction);
}

function render() {
  stepEls.forEach((el, i) => {
    const n = i + 1;
    const ring = el.querySelector('.ring-fill');
    el.classList.toggle('active', n === current);
    el.classList.toggle('done', n < current);
    if (n < current) setRingProgress(ring, 1);
    else if (n === current) setRingProgress(ring, 0.75);
    else setRingProgress(ring, 0);
  });
  connEls.forEach((el, i) => el.classList.toggle('done', i + 1 < current));
  panelEls.forEach((el, i) => el.classList.toggle('active', i + 1 === current));
  btnBack.disabled = current === 1;
  btnNext.textContent = current === TOTAL ? 'Finish' : 'Next';
}

btnNext.addEventListener('click', () => {
  if (current < TOTAL) { current++; render(); }
  else { alert('Form submitted! 🎉'); current = 1; render(); }
});
btnBack.addEventListener('click', () => { if (current > 1) { current--; render(); } });

render();`,
  seo: {
    title: 'Circular Step Indicator — Free HTML CSS JS Snippet',
    description: `SVG ring progress steps with animated stroke-dashoffset, check icons, and connector lines. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Circular Step Indicator — SVG Ring Progress, Animated Connectors & Multi-Step Wizard in Vanilla JS`,
      description: `A multi-step wizard tells users exactly where they are in a process, how far they've come, and what remains — reducing drop-offs on long registration, checkout, and onboarding flows by giving a visual contract up front. This snippet delivers a polished four-step wizard with circular SVG ring progress indicators, animated fill arcs, check-mark transitions, colour-coded connector lines, and a slide-in panel system — all in plain HTML, CSS, and vanilla JavaScript with zero dependencies.

A multi-step wizard is one of the highest-value UI components in any product that involves user data entry. When users can see that they're on step 2 of 4, completion rates measurably increase compared to a single long form — the progress indicator converts an open-ended task into a finite sequence. This snippet delivers a polished four-step wizard with circular SVG ring progress indicators, animated stroke arcs, check-mark reveal transitions, colour-changing connector lines between steps, content panel switching, and Back/Next navigation — all built in plain HTML, CSS, and vanilla JavaScript with zero dependencies.

**SVG stroke-dasharray / stroke-dashoffset animation technique**

The ring around each step number is a \`<circle>\` element inside an SVG. The circle has \`stroke-dasharray: 113\` — that's the circumference of the circle (2π × r = 2π × 18 ≈ 113.1 px). By animating \`stroke-dashoffset\` from 113 (fully hidden) toward 0 (fully drawn), CSS creates the impression of a stroke drawing itself around the circle. The inactive state uses an offset of 113 (no stroke visible), the active state uses ~28 (showing ~75% of the ring), and the completed state uses 0 (full ring). A single CSS \`transition: stroke-dashoffset 0.5s ease\` animates between all three states smoothly whenever a class changes. The SVG is rotated −90° with CSS so the stroke begins at 12 o'clock rather than the default 3 o'clock position.

**Check-icon reveal and state layering**

Each step circle contains two overlapping elements: a \`<span class="step-num">\` showing the number, and a hidden check SVG. When a step gains the \`done\` class, the number fades out (opacity:0) while the check icon scales from 0.6 to 1 and fades in — a compound transform + opacity transition. Both elements are absolutely positioned inside the circle wrapper so they occupy the same space; CSS \`transition\` handles the crossfade without any JavaScript timing code. The check icon uses a \`<polyline points="20 6 9 17 4 12">\` path which draws the classic "√" tick.

**Connector line state**

The horizontal lines between step circles are simple \`<div class="connector">\` elements. In the CSS they are \`flex:1\` — they stretch to fill the gap between circles. Their background colour transitions between \`#e2e8f0\` (grey, incomplete) and \`#6366f1\` (indigo, complete) as steps are completed. The \`render()\` function applies \`done\` to each connector at index \`i\` when \`i + 1 < current\`, meaning connector 0 (between steps 1 and 2) turns indigo once step 2 is current.

**Panel switching with CSS animation**

Content panels are \`display:none\` by default and switch to \`display:flex\` when the \`active\` class is applied. A \`@keyframes fadeUp\` animation (opacity 0→1, translateY 8px→0) plays on each newly active panel, giving the wizard a light upward wipe between steps. Because the animation is applied via the class name and the panel switches to \`display:flex\` simultaneously, no JavaScript timeout or requestAnimationFrame trick is needed.

**Customising for real forms**

Swap the placeholder \`<input>\` fields for your actual form fields. For validation, check field values inside the \`btnNext\` click handler before incrementing \`current\` — return early and highlight invalid fields if needed. The step labels ("Account", "Profile", "Billing", "Done") are plain text nodes in the HTML; change them to match your wizard's stages. To add more steps, duplicate a \`.step\`, a \`.connector\`, and a \`.panel\`, increment \`TOTAL\`, and the ring math handles the rest. Pair with a [vertical timeline](/ui-snippets/vertical-timeline/) for a history view after the wizard completes.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Load the snippet',
        text: `Paste the HTML, CSS, and JS into your page. The wizard renders with step 1 active, showing a 75% arc ring around the number 1 and the Account panel.`,
      },
      {
        title: 'Click Next to advance',
        text: `The current step's ring completes to a full green circle with a check icon, the connector line turns indigo, and step 2 activates with the Profile panel fading up.`,
      },
      {
        title: 'Continue through all steps',
        text: `Each completed step shows a full green ring and check mark. The connector between completed steps is indigo; future steps remain grey.`,
      },
      {
        title: 'Use Back to return',
        text: `Back reverses the animation — the last completed step loses its check icon and returns to the active ring state, the connector reverts to grey.`,
      },
      {
        title: 'Finish on step 4',
        text: `The Next button reads "Finish" on the last step. On click, a success alert fires and the wizard resets to step 1 — ready for another submission in demos.`,
      },
      {
        title: 'Customise labels and steps',
        text: `Edit the \`.step-label\` text in HTML and \`<h2>\` headings in each panel. Add validation inside the btnNext handler before incrementing \`current\`.`,
      },
    ] },
    features: [
      {
        title: 'SVG stroke-dashoffset rings',
        text: `Each step circle uses an SVG \`<circle>\` with animated \`stroke-dashoffset\` driven by CSS transitions — no canvas, no icon font, pure SVG math.`,
      },
      {
        title: 'Three visual states',
        text: `Inactive (grey, empty ring), active (indigo, 75% ring), and done (green, full ring + check icon) — each with distinct colour and icon transitions.`,
      },
      {
        title: 'Animated check-mark crossfade',
        text: `The step number and check icon share the same circle space. On completion, the number fades out while the SVG polyline check scales in via a compound CSS transition.`,
      },
      {
        title: 'Colour-coded connector lines',
        text: `Connector divs between steps change from grey to indigo with a \`background\` CSS transition as steps complete, giving a visual trail of progress.`,
      },
      {
        title: 'Animated panel transitions',
        text: `Each content panel enters with a \`fadeUp\` keyframe animation (opacity + translateY), creating a smooth forward-motion feel as users progress.`,
      },
      {
        title: 'Back and Next navigation',
        text: `The Back button is disabled on step 1 and re-enables once you advance. The Next button transforms into "Finish" on the last step.`,
      },
      {
        title: 'Zero dependencies',
        text: `Pure HTML, CSS, and vanilla JS — no React, no Vue, no animation library. The complete ring math is a single formula: \`C * (1 - fraction)\`.`,
      },
      {
        title: 'Accessible markup',
        text: `Steps use data attributes for state; panels are plain divs. Extend with \`aria-current="step"\` on the active step and \`role="tabpanel"\` on panels for full ARIA support.`,
      },
    ],
    useCases: [
      {
        title: 'User registration wizards',
        text: `Break a lengthy sign-up form into Account, Profile, Preferences, and Done steps so users see progress instead of a wall of fields. Combine with a [stepper](/ui-snippets/stepper/) for linear form flows.`,
      },
      {
        title: 'Checkout flows',
        text: `Guide shoppers through Cart → Shipping → Payment → Confirmation with visual progress rings that reduce checkout abandonment. Pair with a [pricing toggle](/ui-snippets/pricing-toggle/) on the payment step.`,
      },
      {
        title: 'Onboarding tours',
        text: `Walk new users through setup tasks with a visual step counter. For an overlay version that highlights UI elements, see the [onboarding tour](/ui-snippets/onboarding-tour/) snippet.`,
      },
      {
        title: 'Multi-page surveys',
        text: `Show respondents how many sections remain in a long survey, reducing abandonment. Each section maps to one step with a custom label.`,
      },
      {
        title: 'Installation wizards',
        text: `Guide users through software or service setup steps (Connect, Configure, Test, Launch) with clear visual confirmation as each stage completes.`,
      },
      {
        title: 'Project setup flows',
        text: `SaaS products can use the wizard for workspace creation — name your workspace, invite teammates, choose a plan, go live. Each ring completion reinforces progress.`,
      },
      { icon: 'CODE', title: 'Related: Hamburger Menu — CSS Only Checkbox Hack (No JavaScript)', desc: 'See the [Hamburger Menu — CSS Only Checkbox Hack (No JavaScript)](/ui-snippets/css-only-hamburger-menu-checkbox/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I add more steps?',
        a: `Duplicate a \`.step\` div, a \`.connector\` div, and a \`.panel\` div in the HTML, then increment \`TOTAL\` in the JS. The ring math derives from \`TOTAL\` automatically — no further changes needed.`,
      },
      {
        q: 'Can I add form validation before advancing?',
        a: `Yes. In the \`btnNext\` click handler, add a guard before \`current++\`: check your fields, add an error class if invalid, and \`return\` early. Only call \`current++; render()\` once validation passes.`,
      },
      {
        q: 'How do I change the ring fill percentage for the active state?',
        a: `The active state sets \`stroke-dashoffset\` to 28 (≈75% filled). Change this in the \`setRingProgress\` call for the active step: e.g., \`setRingProgress(ring, 0.5)\` for 50%. The fraction argument maps directly to the visible arc percentage.`,
      },
      {
        q: 'Can I use this circular step indicator in React, Vue, or Angular?',
        a: `Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, keep \`currentStep\` in \`useState\` and derive each step's state (inactive/active/done) during render. Move the ring fraction math into a helper function and pass the result as an inline SVG \`style\` prop — the CSS transition animates the change automatically. In Vue, use \`computed\` properties for step states; in Angular, use a \`@Pipe\` or template expression.`,
      },
      {
        q: 'Why use SVG instead of a CSS conic-gradient ring?',
        a: `\`conic-gradient\` produces sharp edges and cannot be animated with CSS transitions in most browsers. SVG \`stroke-dashoffset\` animates natively with \`transition\` and produces smooth anti-aliased arcs at any size. It's also easier to control the start angle (rotate the SVG −90°) and stroke cap style (\`stroke-linecap: round\`).`,
      },
    ],
    aiPrompt: {
      paragraph: `Instead of assuming the ring math is self-evident, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the constant C (2 times PI times 18) relates to the hardcoded stroke-dasharray value of 113 in the CSS, and why the active step deliberately shows a 75 percent filled ring rather than either 0 or 100 percent. The same assistant can help you harden it — ask whether render() correctly handles a form validation failure (what should happen to the ring, connector, and panel state if a user tries to advance past an incomplete step), since the current click handler always advances. It's also a good partner for extending the wizard: ask it to add per-step validation that blocks the Next click when required fields are empty, animate the connector line filling left-to-right instead of snapping between two colors, or make the whole step indicator independently clickable so users can jump back to any completed step. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-step "circular step indicator" wizard in plain HTML, CSS, and JavaScript using inline SVG rings — no library.

Requirements:
- A horizontal row of numbered step circles connected by flex-grow connector line divs between them, where each step circle contains a background SVG ring (a static gray circle), a foreground progress SVG ring (using stroke-dasharray set to the circle's exact circumference and stroke-dashoffset to control fill amount) rotated -90 degrees, a numeral, and a hidden checkmark icon layered on top of each other in the same space.
- Each step must render in exactly one of three distinct states derived from comparing its own step number to the current step number: not-yet-reached (empty ring, gray numeral, no connector highlight), currently-active (ring filled to a partial percentage like 75 percent, accent-colored numeral), and completed (ring fully filled, numeral faded out, checkmark faded and scaled in, connector after it colored to indicate progress).
- The crossfade between the numeral and the checkmark on a completed step must use only opacity and transform (scale) transitions on two absolutely-positioned overlapping elements — no JavaScript-driven timing or swapping of DOM content.
- Below the step row, render one content panel per step where only the panel matching the current step is displayed (using a display toggle, not just visibility), and give the newly shown panel an entrance animation (fade plus slight upward translate) via a CSS keyframe rather than a JavaScript animation library.
- Wire Back and Next buttons where Back is disabled on the first step, Next's label changes to a distinct final action label (e.g. "Finish") on the last step, and clicking Next advances the current step and re-renders every step circle, connector, and panel from that single current-step variable rather than manipulating individual DOM classes ad hoc.
- Make the ring math derive from a single circle radius so that changing the radius (and the corresponding CSS circle radius) is the only thing needed to resize the whole ring system consistently.`,
    },
  },
};

export default circularSteps;
