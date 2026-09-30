const modalReportContentFlagReason = {
  id: 'modal-report-content-flag-reason',
  title: 'Report Content Modal with Reason Picker',
  lastmod: '2026-08-31',
  category: 'modals',
  cdnUrls: [],
  html: `<div class="rcm-page"><button type="button" class="rcm-open" id="rcmOpen">Report this post</button></div>

<div class="rcm-backdrop" id="rcmBackdrop"></div>
<div class="rcm-modal" id="rcmModal" role="dialog" aria-modal="true" aria-labelledby="rcmTitle">
  <button type="button" class="rcm-close" id="rcmClose" aria-label="Close">&#10005;</button>

  <div class="rcm-step" id="rcmStepReason">
    <h3 id="rcmTitle">Report this post</h3>
    <p class="rcm-sub">Help us understand what's wrong. Your report is anonymous.</p>

    <div class="rcm-reasons" id="rcmReasons">
      <label class="rcm-reason">
        <input type="radio" name="rcmReason" value="Spam or misleading">
        <span class="rcm-radio"></span>
        <span class="rcm-reason-text"><b>Spam or misleading</b><small>Fake engagement, scams, or deceptive links</small></span>
      </label>
      <label class="rcm-reason">
        <input type="radio" name="rcmReason" value="Harassment or bullying">
        <span class="rcm-radio"></span>
        <span class="rcm-reason-text"><b>Harassment or bullying</b><small>Targets a person or group with abuse</small></span>
      </label>
      <label class="rcm-reason">
        <input type="radio" name="rcmReason" value="Hate speech">
        <span class="rcm-radio"></span>
        <span class="rcm-reason-text"><b>Hate speech</b><small>Attacks based on identity or protected traits</small></span>
      </label>
      <label class="rcm-reason">
        <input type="radio" name="rcmReason" value="Violent or graphic content">
        <span class="rcm-radio"></span>
        <span class="rcm-reason-text"><b>Violent or graphic content</b><small>Depicts or threatens real-world harm</small></span>
      </label>
      <label class="rcm-reason">
        <input type="radio" name="rcmReason" value="Something else">
        <span class="rcm-radio"></span>
        <span class="rcm-reason-text"><b>Something else</b><small>Doesn't fit the categories above</small></span>
      </label>
    </div>

    <div class="rcm-details-wrap" id="rcmDetailsWrap" hidden>
      <label class="rcm-details-label" for="rcmDetails">Add details (optional)</label>
      <textarea id="rcmDetails" maxlength="280" placeholder="Anything else that would help us review this?"></textarea>
      <span class="rcm-char-count" id="rcmCharCount">0 / 280</span>
    </div>

    <div class="rcm-footer">
      <span class="rcm-hint" id="rcmHint">Choose a reason to continue</span>
      <button type="button" class="rcm-submit" id="rcmSubmit" disabled>Submit report</button>
    </div>
  </div>

  <div class="rcm-step rcm-step-done" id="rcmStepDone" hidden>
    <div class="rcm-done-icon">&#10003;</div>
    <h3>Report submitted</h3>
    <p id="rcmDoneText">Thanks for flagging this. Our team will review it shortly.</p>
    <button type="button" class="rcm-done-btn" id="rcmDoneBtn">Close</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}
.rcm-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.rcm-open{background:#fff;border:1.5px solid #fecaca;color:#dc2626;border-radius:11px;padding:12px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}

.rcm-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.rcm-backdrop.show{opacity:1;pointer-events:all}

.rcm-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);opacity:0;pointer-events:none;
  width:min(440px,92vw);max-height:88vh;overflow-y:auto;background:#fff;border-radius:18px;padding:28px 26px 22px;z-index:91;
  transition:opacity .2s,transform .2s;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.rcm-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}
.rcm-close{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:12px;z-index:2}

#rcmTitle{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:4px}
.rcm-sub{font-size:12.5px;color:#64748b;margin-bottom:18px}

.rcm-reasons{display:flex;flex-direction:column;gap:8px;margin-bottom:6px}
.rcm-reason{display:flex;align-items:flex-start;gap:11px;padding:12px 13px;border:1.5px solid #e2e8f0;border-radius:12px;cursor:pointer;transition:border-color .15s,background .15s}
.rcm-reason:hover{border-color:#c7cff5}
.rcm-reason input{position:absolute;opacity:0;width:0;height:0}
.rcm-radio{width:17px;height:17px;border-radius:50%;border:1.5px solid #cbd5e1;flex-shrink:0;margin-top:1px;position:relative;transition:border-color .15s}
.rcm-reason input:checked ~ .rcm-radio{border-color:#dc2626}
.rcm-reason input:checked ~ .rcm-radio::after{content:'';position:absolute;inset:3px;border-radius:50%;background:#dc2626}
.rcm-reason:has(input:checked){border-color:#dc2626;background:#fef2f2}
.rcm-reason-text b{display:block;font-size:13px;font-weight:700;color:#1e293b}
.rcm-reason-text small{font-size:11px;color:#94a3b8}

.rcm-details-wrap{margin-top:14px;margin-bottom:6px}
.rcm-details-label{display:block;font-size:12px;font-weight:700;color:#334155;margin-bottom:6px}
.rcm-details-wrap textarea{width:100%;min-height:70px;resize:vertical;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 12px;font-size:13px;font-family:inherit;color:#1e293b;outline:none}
.rcm-details-wrap textarea:focus{border-color:#dc2626}
.rcm-char-count{display:block;text-align:right;font-size:10.5px;color:#94a3b8;margin-top:4px}

.rcm-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;margin-top:12px;border-top:1px solid #f1f5f9}
.rcm-hint{font-size:11.5px;color:#94a3b8}
.rcm-submit{background:#dc2626;color:#fff;border:none;border-radius:9px;padding:10px 20px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.rcm-submit:hover:not(:disabled){background:#b91c1c}
.rcm-submit:disabled{background:#f3a9a9;cursor:not-allowed}

.rcm-step-done{text-align:center;padding:14px 4px 6px}
.rcm-done-icon{width:52px;height:52px;border-radius:50%;background:#dcfce7;color:#16a34a;font-size:22px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.rcm-step-done h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:8px}
.rcm-step-done p{font-size:13px;color:#64748b;line-height:1.5;margin-bottom:20px}
.rcm-done-btn{background:#0f172a;color:#fff;border:none;border-radius:9px;padding:10px 26px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit}`,

  js: `// "Something else" is the only reason that requires the optional details
// field to actually be shown -- every other reason keeps it hidden unless a
// visitor wants to add context voluntarily. Submitting swaps the whole first
// step for a confirmation step rather than just clearing the form in place.
var backdrop = document.getElementById('rcmBackdrop');
var modal = document.getElementById('rcmModal');
var openBtn = document.getElementById('rcmOpen');
var closeBtn = document.getElementById('rcmClose');
var reasonInputs = Array.prototype.slice.call(document.querySelectorAll('input[name="rcmReason"]'));
var detailsWrap = document.getElementById('rcmDetailsWrap');
var detailsTextarea = document.getElementById('rcmDetails');
var charCount = document.getElementById('rcmCharCount');
var hintEl = document.getElementById('rcmHint');
var submitBtn = document.getElementById('rcmSubmit');
var stepReason = document.getElementById('rcmStepReason');
var stepDone = document.getElementById('rcmStepDone');
var doneText = document.getElementById('rcmDoneText');
var doneBtn = document.getElementById('rcmDoneBtn');

function openModal() { backdrop.classList.add('show'); modal.classList.add('show'); }
function closeModal() { backdrop.classList.remove('show'); modal.classList.remove('show'); }

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

function getSelectedReason() {
  var checked = reasonInputs.filter(function (input) { return input.checked; })[0];
  return checked ? checked.value : null;
}

function updateFormState() {
  var reason = getSelectedReason();

  detailsWrap.hidden = reason !== 'Something else';

  if (!reason) {
    hintEl.textContent = 'Choose a reason to continue';
    submitBtn.disabled = true;
  } else if (reason === 'Something else' && detailsTextarea.value.trim() === '') {
    hintEl.textContent = 'Please add a few details for "Something else"';
    submitBtn.disabled = true;
  } else {
    hintEl.textContent = 'Reports are reviewed within 24 hours';
    submitBtn.disabled = false;
  }
}

reasonInputs.forEach(function (input) {
  input.addEventListener('change', updateFormState);
});

detailsTextarea.addEventListener('input', function () {
  charCount.textContent = detailsTextarea.value.length + ' / 280';
  updateFormState();
});

submitBtn.addEventListener('click', function () {
  var reason = getSelectedReason();
  if (!reason) return;

  var details = detailsTextarea.value.trim();
  // reason and details now hold everything a real report submission needs, e.g.:
  // fetch('/api/reports', { method: 'POST', body: JSON.stringify({ reason: reason, details: details }) })

  doneText.textContent = 'Thanks for flagging this as \\u201C' + reason + '\\u201D. Our team will review it shortly.';
  stepReason.hidden = true;
  stepDone.hidden = false;
});

doneBtn.addEventListener('click', function () {
  closeModal();
  setTimeout(function () {
    reasonInputs.forEach(function (input) { input.checked = false; });
    detailsTextarea.value = '';
    charCount.textContent = '0 / 280';
    stepReason.hidden = false;
    stepDone.hidden = true;
    updateFormState();
  }, 250);
});

updateFormState();`,

  seo: {
    title: 'Report Content Modal with Reason Picker — Free HTML CSS JS Snippet',
    description: 'A content moderation report modal with a radio-button reason picker, a conditional optional-details field, and a confirmation step after submission. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Report Content Modal — Conditional Details Field and a Confirmation Step',
      description: `A generic "report this" button that just says "thanks" gives a moderation team nothing to act on. This modal collects a specific, structured reason via radio buttons, reveals an optional free-text field only when the selected reason genuinely benefits from more context, and swaps in a real confirmation step — including which reason was reported — once submitted.

**One \`updateFormState()\` function governs visibility, hint text, and the submit button together**

Every interaction — selecting a reason or typing into the details textarea — calls \`updateFormState()\`, which reads the currently checked radio via \`getSelectedReason()\` and then decides three things at once: whether the details textarea is shown, what the hint line beneath the reasons says, and whether the submit button is enabled. Because all three come from the same function call reading the same current state, there's no path where the hint text could say "choose a reason" while the submit button is somehow already enabled.

**The details field's visibility is reason-dependent, not a blanket option**

\`detailsWrap.hidden = reason !== 'Something else'\` means the optional context field only appears for the one reason that's genuinely ambiguous without it — a report for "Hate speech" or "Violent or graphic content" doesn't need an extra prompt, since the category itself is the useful signal. This keeps the modal shorter for the common cases while still gathering more context exactly where it's most valuable.

**"Something else" has its own validation branch**

Selecting "Something else" without typing anything into the details field keeps the submit button disabled and shows a specific hint ("Please add a few details...") rather than silently accepting an unhelpful, contentless report. Every other reason only requires the radio selection itself — the validation branches based on which reason is selected, not one uniform rule applied to all five.

**A radio group built from a native \`<input type="radio">\`, styled but not reinvented**

Each \`.rcm-reason\` label wraps a visually-hidden native radio input plus a custom \`.rcm-radio\` circle styled via the sibling combinator (\`input:checked ~ .rcm-radio\`) and a \`:has()\` selector highlighting the whole row. Using real radio inputs (rather than a fully custom JS-driven single-select) means keyboard navigation, form semantics, and "exactly one can be checked" are all handled by the browser's native radio-group behavior for free.

**Submission swaps the whole step, it doesn't just reset the form silently**

Clicking submit hides \`#rcmStepReason\` and reveals \`#rcmStepDone\` — including a confirmation sentence that names the specific reason that was reported (\`"Thanks for flagging this as 'Harassment or bullying'"\`) — rather than just clearing the radio buttons and showing a generic toast. The form only actually resets when the visitor closes the confirmation step via \`doneBtn\`, delayed until after the modal's own closing transition finishes.

**Customizing it**

Wire the commented-out \`fetch()\` call at the point where \`reason\` and \`details\` are collected to a real moderation endpoint. Add a sixth reason by adding another \`.rcm-reason\` label with a new \`value\` — \`reasonInputs\` is queried generically from \`input[name="rcmReason"]\`, so \`getSelectedReason()\` and \`updateFormState()\` require no changes for it to work correctly.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the report modal', text: 'Click "Report this post" to open the reason picker.' },
        { title: 'Select a reason', text: 'The submit button enables once a reason is chosen — except for "Something else."' },
        { title: 'Try "Something else"', text: 'A details textarea appears and is required before the submit button enables.' },
        { title: 'Submit the report', text: 'The reason picker is replaced by a confirmation step naming the reason you selected.' },
        { title: 'Close the confirmation', text: 'The form resets fully so reopening the modal starts fresh.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Native radio-button reason picker with a fully custom styled indicator',
      'Optional details textarea appears only for the one reason that needs it',
      '"Something else" requires actual details text before the submit button enables',
      'One updateFormState() function keeps hint text, field visibility, and the submit button in sync',
      'Character counter on the optional details textarea with a real maxlength cap',
      'Submission swaps to a real confirmation step naming the specific reason reported',
      'Form fully resets only after the confirmation step is dismissed, not on submit itself',
      'CSS :has() selector highlights the entire selected reason row, not just its radio dot',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Social platforms and community forums', desc: 'Give moderators structured, categorized reports instead of unstructured free-text complaints.' },
      { icon: 'FLOW', title: 'Marketplace listing and review flagging', desc: 'Pair with a [rating feedback modal](/ui-snippets/modal-rating-feedback-star-comment/) for a complementary positive-feedback collection flow.' },
      { icon: 'FORM', title: 'Comment sections and user-generated content sites', desc: 'Let readers flag problematic comments with a reason that routes directly to the right moderation queue.' },
      { icon: 'LEARN', title: 'Learn conditional field visibility patterns', desc: 'Study how updateFormState() ties field visibility, validation, and button state to which specific option is selected.' },
      { icon: 'DESIGN', title: 'Trust & safety and content moderation tools', desc: 'Reuse the same reason-plus-conditional-details pattern for internal moderator escalation forms.' },
      { icon: 'CODE', title: 'Related: Type to Confirm Delete Modal', desc: 'See the [Type to Confirm Delete Modal](/ui-snippets/modal-type-to-confirm-delete/) for a related high-stakes-action confirmation pattern.' },
    ],
    faqs: [
      { q: 'Why does the details textarea only appear for "Something else"?', a: 'detailsWrap.hidden is set to reason !== \'Something else\' inside updateFormState(), so the field only becomes visible when that specific radio is selected. The other four reasons are specific enough categories that an extra free-text prompt is not needed to make the report actionable, which keeps the modal shorter for the common cases.' },
      { q: 'Can I submit "Something else" without typing any details?', a: 'No — updateFormState() has a dedicated check for reason === \'Something else\' && detailsTextarea.value.trim() === \'\', which keeps the submit button disabled and shows a hint asking for details specifically in that case. Every other reason only requires the radio selection itself to enable the button.' },
      { q: 'What happens after I click Submit report?', a: 'The reason and any details text are collected (shown at the point where a real fetch() call to a backend endpoint would send them), and the modal swaps from the reason-picker step to a confirmation step that names the specific reason you selected in its message, rather than just clearing the form and showing a generic success message.' },
      { q: 'Does the form reset immediately after submitting?', a: 'No — the reason-picker step is hidden and the confirmation step is shown, but the actual form fields (radio selection, textarea content) are not cleared until the visitor clicks the confirmation step\'s Close button, and even then the reset is delayed slightly to let the modal\'s own closing transition finish first.' },
      { q: 'How is exactly one reason enforced as selected?', a: 'All five reason options are native input type="radio" elements sharing the same name="rcmReason" attribute, so the browser\'s built-in radio-group behavior guarantees only one can be checked at a time — no custom JavaScript single-select logic is needed for that part.' },
      { q: 'How do I add a sixth report reason?', a: 'Add another .rcm-reason label following the same markup pattern, with its own radio input sharing name="rcmReason" and a distinct value attribute. reasonInputs is queried generically via document.querySelectorAll(\'input[name="rcmReason"]\'), so getSelectedReason() and updateFormState() both pick up the new option automatically with no other JavaScript changes.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the conditional logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how updateFormState() ties the details field's visibility, the hint text, and the submit button's enabled state together to the currently selected reason, and why "Something else" gets its own validation branch requiring non-empty details text while the other four reasons do not. The same assistant can help you extend it — ask it to wire the commented-out fetch() call to a real moderation backend and handle a failed submission by showing an error state instead of jumping straight to the confirmation step, add a secondary "block this user" checkbox that appears only for the Harassment or Hate speech reasons, or rate-limit the report button client-side so a visitor cannot submit multiple reports on the same content in quick succession. It's also useful for an accessibility review: ask whether the confirmation step should receive programmatic focus when it appears, and whether the radio group needs a fieldset and legend for correct screen-reader grouping semantics. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a content-report modal in plain HTML, CSS, and vanilla JavaScript with a radio-button reason picker, a conditionally shown optional details field, and a real confirmation step — no framework.

Requirements:
- A trigger button that opens a modal (backdrop plus centered dialog with a fade/scale transition), closable via a close button, backdrop click, and the Escape key.
- Inside the modal, five reason options as a native radio-button group (same name attribute, one value each), each showing a bold label and a short description, with a custom-styled radio indicator (the native input visually hidden, a styled circle indicator driven by its checked state) and the entire row highlighted when its radio is selected.
- Below the reasons, an optional textarea with a character counter and a real maxlength attribute, hidden by default — it must only become visible when the specific reason meant for open-ended cases (e.g. "Something else") is selected, and stay hidden for every other reason.
- Write one function that runs on every reason change and every textarea input, deciding together: whether the details field is shown, what a hint message beneath the reasons says, and whether the submit button is enabled. The submit button must specifically stay disabled if no reason is selected, and separately stay disabled if the details-requiring reason is selected but the textarea is empty or whitespace-only — every other reason should enable the button as soon as it is selected, with no details required.
- Clicking submit must not simply reset the form or show a toast — it must hide the reason-picking content and reveal a distinct confirmation view inside the same modal, with a message that names the specific reason that was reported.
- The confirmation view's own close button must close the modal and only then (after a short delay so it happens after the modal's closing transition) reset every field — unchecking the radios, clearing the textarea and its character count, and switching back to the reason-picking view — so reopening the modal always starts fresh.`,
    },
  },
};

export default modalReportContentFlagReason;
