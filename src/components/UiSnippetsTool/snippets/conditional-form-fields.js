const conditionalFormFields = {
  id: 'conditional-form-fields',
  title: 'Conditional Form Fields',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<form class="cff-card" id="cffForm" novalidate>
  <h3>Contact us</h3>

  <div class="cff-field">
    <label for="cffReason">What can we help with?</label>
    <select id="cffReason">
      <option value="">Choose a topic…</option>
      <option value="sales">Sales enquiry</option>
      <option value="support">Technical support</option>
      <option value="billing">Billing question</option>
      <option value="other">Something else</option>
    </select>
  </div>

  <!-- Shown only for: sales -->
  <div class="cff-cond" data-when="sales">
    <div class="cff-cond-inner">
      <div class="cff-field">
        <label for="cffCompany">Company name</label>
        <input type="text" id="cffCompany" data-req placeholder="Acme Inc.">
      </div>
      <div class="cff-field">
        <label for="cffSeats">Team size</label>
        <select id="cffSeats" data-req>
          <option value="">Select…</option>
          <option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Shown only for: support -->
  <div class="cff-cond" data-when="support">
    <div class="cff-cond-inner">
      <div class="cff-field">
        <label for="cffOrder">Account / order ID</label>
        <input type="text" id="cffOrder" data-req placeholder="e.g. ACC-10293">
      </div>
      <label class="cff-check"><input type="checkbox" id="cffUrgent"> This is blocking my work (urgent)</label>
    </div>
  </div>

  <!-- Shown only for: billing -->
  <div class="cff-cond" data-when="billing">
    <div class="cff-cond-inner">
      <div class="cff-field">
        <label for="cffInvoice">Invoice number</label>
        <input type="text" id="cffInvoice" data-req placeholder="INV-0000">
      </div>
    </div>
  </div>

  <div class="cff-field" id="cffMsgWrap" hidden>
    <label for="cffMessage">Message</label>
    <textarea id="cffMessage" rows="3" data-req placeholder="Tell us a bit more…"></textarea>
  </div>

  <button type="submit" class="cff-submit" id="cffSubmit" disabled>Send message</button>
  <p class="cff-done" id="cffDone" hidden>✓ Thanks — we'll reply within one business day.</p>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 24px}

.cff-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:400px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.cff-card h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:18px}

.cff-field{margin-bottom:14px}
.cff-field label{display:block;font-size:12.5px;font-weight:700;color:#475569;margin-bottom:7px}
.cff-field input,.cff-field select,.cff-field textarea{width:100%;border:1.5px solid #e2e8f0;border-radius:9px;padding:10px 12px;font-size:13.5px;font-family:inherit;color:#0f172a;background:#fff;transition:border-color .15s,box-shadow .15s;resize:vertical}
.cff-field input:focus,.cff-field select:focus,.cff-field textarea:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}

/* Conditional groups: hidden by default, revealed via .show with a height/opacity glide.
   The single .cff-cond-inner wrapper is the one collapsible grid row — wrapping is
   required so groups with multiple fields collapse fully (a bare multi-child grid
   leaves extra children in auto implicit rows that never collapse). */
.cff-cond{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .28s ease,opacity .2s ease}
.cff-cond-inner{overflow:hidden;min-height:0}
.cff-cond.show{grid-template-rows:1fr;opacity:1}

.cff-check{display:flex;align-items:center;gap:8px;font-size:13px;color:#475569;font-weight:600;cursor:pointer;margin-bottom:14px}
.cff-check input{width:16px;height:16px;accent-color:#6366f1}

.cff-submit{width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s;margin-top:4px}
.cff-submit:hover:not(:disabled){background:#4f46e5}
.cff-submit:disabled{opacity:.45;cursor:not-allowed}

.cff-done{margin-top:12px;text-align:center;font-size:13px;font-weight:700;color:#16a34a;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:9px;padding:10px}`,

  js: `var form = document.getElementById('cffForm');
var reason = document.getElementById('cffReason');
var conds = Array.prototype.slice.call(document.querySelectorAll('.cff-cond'));
var msgWrap = document.getElementById('cffMsgWrap');
var submit = document.getElementById('cffSubmit');

function visibleRequiredFields() {
  var fields = [];
  conds.forEach(function (group) {
    if (group.classList.contains('show')) {
      group.querySelectorAll('[data-req]').forEach(function (f) { fields.push(f); });
    }
  });
  // The message box is shown for every chosen topic.
  if (!msgWrap.hidden) {
    msgWrap.querySelectorAll('[data-req]').forEach(function (f) { fields.push(f); });
  }
  return fields;
}

function validate() {
  var value = reason.value;
  var ready = value !== '';
  visibleRequiredFields().forEach(function (f) {
    if (!f.value.trim()) ready = false;
  });
  submit.disabled = !ready;
}

function applyConditions() {
  var value = reason.value;
  conds.forEach(function (group) {
    group.classList.toggle('show', group.dataset.when === value);
  });
  // Message box appears once any topic is chosen.
  msgWrap.hidden = value === '';
  validate();
}

reason.addEventListener('change', applyConditions);
form.addEventListener('input', validate);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (submit.disabled) return;
  // Collect only the relevant fields for the chosen topic here.
  form.querySelectorAll('select, input, textarea, button').forEach(function (el) { el.disabled = true; });
  document.getElementById('cffDone').hidden = false;
});

applyConditions();`,

  seo: {
    title: 'Conditional Form Fields — Dynamic Form HTML CSS JS',
    description: `A dynamic form that shows and hides fields based on a dropdown choice, validating only the visible required fields. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Conditional Form Fields — Show/Hide Inputs by Choice with Scoped Validation',
      description: `Long forms that ask everyone every question are a leading cause of abandonment. Conditional fields fix that by revealing only the inputs relevant to the path a user chose — a sales enquiry asks for company size, a support request asks for an order ID, and neither shows the other's fields. This snippet builds that dynamic-form pattern in plain HTML, CSS, and vanilla JavaScript, with the one detail most implementations get wrong: validating only the fields that are actually visible.

**Declarative conditions in the markup**

Each conditional group carries a \`data-when\` attribute naming the dropdown value that reveals it (\`data-when="sales"\`, \`data-when="support"\`). When the topic changes, \`applyConditions()\` simply toggles a \`.show\` class on each group based on whether its \`data-when\` matches the current value — there's no per-group \`if\` statement to maintain. Adding a new branch is a markup change (a new group with the right \`data-when\`), not a JavaScript change, which keeps the logic flat no matter how many paths the form grows.

**Validation that follows visibility**

The critical correctness detail: a required field that's hidden must not block submission. \`visibleRequiredFields()\` collects \`[data-req]\` inputs *only* from groups currently showing (plus the always-on message box), so the submit button enables when the relevant fields are filled — and a hidden support field never traps a sales enquiry. Tying required-ness to visibility is the difference between a form that submits and one that's mysteriously stuck because an off-screen field is empty. The submit button stays disabled until every *visible* required field has a value, giving constant, honest readiness feedback.

**A smooth reveal without measuring height**

Animating a collapsible section open has historically meant measuring its content height in JavaScript. This snippet uses the modern CSS grid trick instead: the group is a grid with \`grid-template-rows: 0fr\` collapsed and \`1fr\` expanded, with the inner content set to \`overflow: hidden; min-height: 0\`. Transitioning between \`0fr\` and \`1fr\` animates the section to exactly its natural height with no JavaScript measurement at all — clean, content-agnostic, and smooth. Opacity fades alongside it for polish.

**Reset behaviour that prevents stale data**

Switching topics hides the previous branch's fields. Those inputs keep their values in the DOM (so switching back restores them), but because validation only counts visible fields, a half-filled hidden branch never affects the current submission. On submit, you collect only the fields relevant to the chosen topic — the FAQs cover scoping the payload so you don't send a support form's empty company-name field to your sales endpoint.

**Accessible and progressive**

The conditional groups are real form elements that exist in the DOM whether shown or not, so the markup stays simple and the form degrades gracefully. For full accessibility you'd also toggle \`aria-hidden\` and the \`disabled\` attribute on hidden inputs (so they leave the tab order entirely) — the FAQs explain how to layer that on. The whole form is driven by two listeners (\`change\` on the selector, \`input\` for live validation), keeping the behaviour easy to follow and port.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A contact form renders with a topic dropdown and no extra fields until you choose a topic.` },
      { title: 'Pick a topic', text: `Choose "Sales enquiry" — company and team-size fields glide open; choose "Technical support" and order-ID/urgent fields appear instead.` },
      { title: 'Watch scoped validation', text: `The Send button stays disabled until every visible required field is filled — hidden branches never block it.` },
      { title: 'Switch topics', text: `Change the dropdown — the previous branch collapses and the new one reveals; the button re-evaluates against the now-visible fields.` },
      { title: 'Submit', text: `With all visible required fields filled, Send enables; submitting shows a confirmation and locks the form.` },
      { title: 'Add your own branches', text: `Add a new <div class="cff-cond" data-when="yourvalue"> group and a matching <option> — no JavaScript changes needed.` },
    ] },
    features: [
      { title: 'Declarative data-when conditions', text: `Each group names the value that reveals it via data-when, so adding a branch is markup-only with no new logic.` },
      { title: 'Visibility-scoped validation', text: `Only [data-req] fields inside currently-shown groups can block submission — hidden required fields never trap the form.` },
      { title: 'Live submit-button readiness', text: `The submit button enables exactly when every visible required field has a value, giving constant honest feedback.` },
      { title: 'Height-measurement-free reveal', text: `The grid-template-rows 0fr→1fr trick animates each section to its natural height with zero JavaScript measurement.` },
      { title: 'Values preserved across switches', text: `Hidden fields keep their values in the DOM, so switching back to a branch restores what was typed.` },
      { title: 'Two-listener simplicity', text: `A change handler on the selector and an input handler for validation drive the entire form — easy to follow and port.` },
      { title: 'Always-on shared fields', text: `The message box shows for every topic, demonstrating mixing conditional and always-present fields.` },
      { title: 'Confirmation and lock on submit', text: `Submitting disables the form and shows a success message, ready to wire to a real endpoint.` },
    ],
    useCases: [
      { title: 'Contact and support forms', text: `Ask topic-specific questions (order ID for support, company for sales) without overwhelming every visitor — pair with a [contact form](/ui-snippets/contact-form/).` },
      { title: 'Multi-path signup and onboarding', text: `Show different fields for "individual" vs "team" accounts, or business vs personal, in a [multi-step form](/ui-snippets/multi-step-form/).` },
      { title: 'Checkout and shipping', text: `Reveal a "gift message" field only when "this is a gift" is checked, or business-tax fields for company orders.` },
      { title: 'Surveys and applications', text: `Branch follow-up questions based on a prior answer so respondents only see relevant items.` },
      { title: 'Booking and quote requests', text: `Show service-specific fields after the user picks a service type, keeping the initial form short.` },
      { title: 'Learning dynamic-form patterns', text: `A reference for the modern grid-rows reveal and visibility-scoped validation — compare with a [progress wizard](/ui-snippets/progress-wizard/) for sequential multi-step flows.` },
      { icon: 'CODE', title: 'Related: Styled Range Slider — CSS Only Vendor Pseudo-Elements (No JavaScript)', desc: 'See the [Styled Range Slider — CSS Only Vendor Pseudo-Elements (No JavaScript)](/ui-snippets/css-only-styled-range-slider/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I make sure hidden required fields don\'t block submission?', a: `Tie required-ness to visibility: only validate [data-req] fields inside groups that currently have the .show class (plus any always-on fields), as visibleRequiredFields() does here. A hidden field's value is irrelevant to the current path, so it must be excluded from the readiness check — this is the single most common bug in conditional forms.` },
      { q: 'How do I fully remove hidden fields from the tab order and screen readers?', a: `Beyond hiding them visually, set the disabled attribute and aria-hidden="true" on inputs inside collapsed groups (and remove those when shown). Disabled fields skip the tab order and aren't submitted, and aria-hidden keeps screen readers from announcing off-screen inputs. Toggle both alongside the .show class in applyConditions().` },
      { q: 'How do I submit only the fields relevant to the chosen path?', a: `On submit, read the selected topic and collect values only from the visible groups (and shared fields), building a payload scoped to that path — don't send a support form's empty company field to your sales endpoint. Iterate the .show groups' inputs, or maintain a per-topic field map.` },
      { q: 'Why use the grid-template-rows trick instead of max-height for the reveal?', a: `Animating max-height requires guessing a value larger than any content (which makes the timing feel off and clips tall content), while measuring exact height needs JavaScript. The grid 0fr→1fr transition animates to the content's true natural height automatically, with no measurement and no magic numbers — it adapts to any content length.` },
      { q: 'How do I use conditional fields in React, Vue, or Angular?', a: `In React, hold the selected value in useState and conditionally render each group with {value === 'sales' && <SalesFields/>}, computing form validity from the currently-rendered required fields; in Vue, use v-if with a computed valid flag; in Angular, use *ngIf and reactive-forms validators toggled per branch. The framework's conditional rendering replaces the .show class, and validity follows what's rendered.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the visibility-to-validation link by hand to trust it's correct. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why visibleRequiredFields() only collects data-req inputs from groups carrying the show class, and why that specific detail is what prevents a hidden branch from ever blocking submission. The same assistant can help optimize it — for instance asking whether the grid-template-rows 0fr-to-1fr collapse trick has any edge cases with dynamically-inserted content, or whether hidden fields should also get aria-hidden and disabled for full accessibility rather than just being visually collapsed. It is also useful for extending the form: ask it to support nested conditions (a field that only appears when a previous conditional field has a specific value), add a second dropdown that branches further, or wire the submit handler to POST only the fields relevant to the chosen path. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a form with conditional, dropdown-driven field groups in plain HTML, CSS, and JavaScript — no form library, no framework.

Requirements:
- A topic dropdown, plus several field groups each marked with a data attribute naming the exact dropdown value that should reveal it (e.g. data-when="sales"), so adding a new conditional branch requires only a new markup group and a new option, never a new line of JavaScript branching logic.
- On every change of the dropdown, toggle a "show" class on each group based purely on whether its data-when value matches the current selection — no group-specific if/else chain.
- Animate each group's reveal and collapse using CSS grid-template-rows transitioning between 0fr and 1fr (with the inner content wrapped in its own element using overflow hidden), so the section expands and collapses to its exact natural content height with zero JavaScript height measurement and no fixed max-height guess.
- Mark specific inputs inside each conditional group as required via a data attribute, and implement validation so that only required fields inside groups that are CURRENTLY visible can block form submission — a required field belonging to a hidden, unselected branch must never prevent the submit button from enabling.
- The submit button must be disabled by default and re-evaluate its disabled state live on every input event, enabling exactly when the topic is chosen and every currently-visible required field has a non-empty value.
- Include at least one field that is shared/always-visible regardless of which topic is chosen, to demonstrate mixing always-on fields with conditional ones.
- On submit, prevent the default action, disable all form controls, and show a confirmation message in place of the form.`,
    },
  },
};

export default conditionalFormFields;
