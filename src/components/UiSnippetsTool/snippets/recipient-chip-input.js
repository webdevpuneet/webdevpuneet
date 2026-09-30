const recipientChipInput = {
  id: 'recipient-chip-input',
  title: 'Recipient Chip Input (To: Field)',
  lastmod: '2026-08-24',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="rci-card">
  <h3>New message</h3>
  <label class="rci-label">To</label>
  <div class="rci-field" id="rciField">
    <span class="rci-chip" data-email="alex@company.com">alex@company.com<button type="button" aria-label="Remove">&times;</button></span>
    <span class="rci-chip" data-email="sam@company.com">sam@company.com<button type="button" aria-label="Remove">&times;</button></span>
    <input id="rciInput" type="text" placeholder="Add recipients…" autocomplete="off" />
  </div>
  <p class="rci-hint">Press Enter, comma, or Tab to add. Paste a comma-separated list to add several at once.</p>
  <p class="rci-count" id="rciCount">2 recipients</p>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rci-card{background:#fff;border-radius:16px;padding:26px 28px;width:100%;max-width:420px;box-shadow:0 4px 24px rgba(15,23,42,.08)}
.rci-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:16px}
.rci-label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin-bottom:8px}
.rci-field{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px;border:1.5px solid #e2e8f0;border-radius:10px;min-height:46px;transition:border-color .15s,box-shadow .15s}
.rci-field:focus-within{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.rci-chip{display:inline-flex;align-items:center;gap:6px;background:#eef2ff;color:#4338ca;font-size:12.5px;font-weight:600;padding:5px 6px 5px 10px;border-radius:999px}
.rci-chip.rci-invalid{background:#fef2f2;color:#b91c1c}
.rci-chip button{width:16px;height:16px;border:none;background:rgba(67,56,202,.12);color:inherit;border-radius:50%;font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
.rci-chip button:hover{background:rgba(67,56,202,.25)}
.rci-field input{flex:1 1 120px;min-width:120px;border:none;outline:none;font-size:13px;font-family:inherit;padding:6px 4px;color:#0f172a}
.rci-hint{font-size:11.5px;color:#94a3b8;margin-top:8px;line-height:1.5}
.rci-count{font-size:12px;color:#64748b;margin-top:10px;font-weight:600}`,
  js: `(function(){
  var field = document.getElementById('rciField');
  var input = document.getElementById('rciInput');
  var countEl = document.getElementById('rciCount');
  var EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  function updateCount() {
    var n = field.querySelectorAll('.rci-chip').length;
    countEl.textContent = n + ' recipient' + (n === 1 ? '' : 's');
  }

  function addChip(rawEmail) {
    var email = rawEmail.trim().replace(/,$/, '');
    if (!email) return;
    var isValid = EMAIL_RE.test(email);
    var chip = document.createElement('span');
    chip.className = 'rci-chip' + (isValid ? '' : ' rci-invalid');
    chip.setAttribute('data-email', email);
    chip.textContent = email;
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', 'Remove');
    removeBtn.textContent = '\\u00d7';
    removeBtn.addEventListener('click', function () {
      chip.remove();
      updateCount();
      input.focus();
    });
    chip.appendChild(removeBtn);
    field.insertBefore(chip, input);
    updateCount();
  }

  function commitInput() {
    var raw = input.value;
    if (!raw.trim()) return;
    // support pasting or typing several comma-separated addresses at once
    raw.split(',').forEach(function (part) {
      if (part.trim()) addChip(part);
    });
    input.value = '';
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      if (input.value.trim()) {
        e.preventDefault();
        commitInput();
      }
    } else if (e.key === 'Backspace' && !input.value) {
      var chips = field.querySelectorAll('.rci-chip');
      var last = chips[chips.length - 1];
      if (last) { last.remove(); updateCount(); }
    }
  });

  input.addEventListener('paste', function (e) {
    var text = (e.clipboardData || window.clipboardData).getData('text');
    if (text.indexOf(',') !== -1) {
      e.preventDefault();
      text.split(',').forEach(function (part) { if (part.trim()) addChip(part); });
    }
  });

  input.addEventListener('blur', function () {
    if (input.value.trim()) commitInput();
  });

  field.addEventListener('click', function (e) {
    if (e.target === field) input.focus();
  });

  updateCount();
})();`,
  seo: {
    title: 'Recipient Chip Input (To: Field) — Free HTML CSS JS Snippet',
    description: 'A Gmail-style "To:" field that turns typed or pasted addresses into removable chips, validating each as an email and flagging malformed entries in place.',
    about: {
      title: 'Recipient Chip Input — Email-Validated Chips with Multi-Paste Support',
      description: `Email clients turn a plain text field into a row of chips the moment you commit an address — this snippet reproduces that exact interaction, including per-chip email validation and pasting several comma-separated addresses at once, all in vanilla JavaScript.

**Per-chip validation, not just field-level**

Every address is tested against \`EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\` the moment its chip is created, and an invalid match adds the \`rci-invalid\` class instead of the default styling — turning the chip red rather than silently accepting or rejecting the whole field. This gives immediate, localized feedback: a user pasting five addresses where one is malformed sees exactly which one needs fixing, not a generic field-level error.

**Three commit triggers, one shared function**

Enter, comma, and Tab all call the same \`commitInput()\` function, and Tab's default behavior (moving focus to the next form field) is prevented with \`e.preventDefault()\` when there's pending text to commit — so tabbing out of the field always chips the in-progress text first rather than discarding it, matching what users expect from a real "To:" field.

**Splitting a paste into multiple chips**

The \`paste\` handler checks \`text.indexOf(',') !== -1\` before intervening — if the pasted content has no comma, the default paste behavior runs normally (just placing text in the input for further editing), but a comma-separated paste is caught, split, and each piece becomes its own chip immediately: \`text.split(',').forEach(part => addChip(part))\`. This is what makes pasting a whole address list from an email client or spreadsheet "just work."

**Backspace-to-remove-last-chip**

When Backspace is pressed on an empty input (\`e.key === 'Backspace' && !input.value\`), the last chip in the field is removed — the same convention used by every major email client's recipient field, letting a user quickly undo the most recent entry without reaching for the mouse.

**Click-to-focus on empty space**

Clicking anywhere in the field container that isn't a chip or the input itself still focuses the input (\`if (e.target === field) input.focus()\`), so the whole field reads as one clickable target even though it's really a flex container of separate chip and input elements.

**Customizing it**

Swap \`EMAIL_RE\` for a stricter or more permissive validation pattern, wire an autocomplete dropdown into the input's \`keyup\` handler for suggesting known contacts, or add a max-recipients limit that disables further chip creation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two sample recipient chips render already committed in the "To:" field.` },
      { title: 'Type an address and press Enter', text: `A new chip appears; valid emails render normally, malformed ones render in red.` },
      { title: 'Paste a comma-separated list', text: `Try pasting "a@x.com, b@x.com, c@x.com" — each address becomes its own chip immediately.` },
      { title: 'Press Backspace on an empty input', text: `The most recently added chip is removed, matching real email client behavior.` },
      { title: 'Click a chip\'s × button', text: `Removes just that recipient and refocuses the input.` },
      { title: 'Adjust validation', text: `Edit the EMAIL_RE regular expression in the JS to match a stricter or more permissive email format.` },
    ] },
    features: [
      { title: 'Per-chip email validation', text: `Each address is tested independently, so one malformed entry in a batch doesn't block the rest.` },
      { title: 'Enter, comma, and Tab all commit', text: `One shared commitInput() function handles all three triggers consistently.` },
      { title: 'Multi-address paste support', text: `Pasting a comma-separated list splits and commits each address as its own chip.` },
      { title: 'Backspace removes the last chip', text: `Matches the interaction users already expect from real email client recipient fields.` },
      { title: 'Tab does not lose in-progress text', text: `Pending input is committed to a chip before focus moves to the next field.` },
      { title: 'Live recipient count', text: `A footer label updates automatically as chips are added or removed.` },
      { title: 'Click-anywhere-to-focus field', text: `Clicking empty space inside the field container still focuses the text input.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no tagging or chip-input library.` },
    ],
    useCases: [
      { title: 'Email composition forms', text: `Build a To/Cc/Bcc field for a webmail client or transactional email admin tool.` },
      { title: 'Team invite forms', text: `Let admins invite several teammates by email in one paste instead of one at a time.` },
      { title: 'Newsletter and campaign tools', text: `Collect a list of recipient addresses for a test send before launching a campaign.` },
      { title: 'Calendar event invitations', text: `Add multiple attendee emails to a meeting invite with the same chip interaction.` },
      { title: 'CRM contact import', text: `Quickly paste a batch of addresses and get instant per-address validation feedback.` },
      { title: 'Support ticket CC fields', text: `Let agents add multiple stakeholders to a support thread by email.` },
    ],
    faqs: [
      { q: `How does the input decide when to turn text into a chip?`, a: `Three keydown cases call the shared commitInput() function: pressing Enter, pressing comma, or pressing Tab while there's text in the field. All three funnel through the same function so the chip-creation logic, including validation and clearing the input, only needs to exist in one place.` },
      { q: `What happens if I paste an address list with invalid emails mixed in?`, a: `Each pasted address gets its own chip and its own independent validation check against EMAIL_RE. Valid addresses render as normal blue chips; invalid ones render in red with the rci-invalid class, so you can see and fix exactly which entries are malformed without losing the valid ones.` },
      { q: `Why does Tab commit the current text instead of just moving focus?`, a: `The keydown handler calls e.preventDefault() on Tab only when there's pending text in the input. This intercepts Tab's default browser behavior (moving to the next focusable element) just long enough to commit that text as a chip first — matching the expectation that unsaved recipient text shouldn't silently disappear when you tab away.` },
      { q: `How do I limit the number of recipients that can be added?`, a: `In addChip(), before creating the new chip element, check field.querySelectorAll('.rci-chip').length against your maximum. If the limit is reached, return early without adding the chip and optionally show a warning message near the field.` },
      { q: `How would I add autocomplete suggestions from a contacts list?`, a: `Add an input event listener that reads the current partial text, filters your contacts array for matches, and renders a small dropdown of suggestions positioned below the field. Selecting a suggestion would call addChip() directly with the chosen contact's email, then clear the input the same way commitInput() does.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the multi-trigger commit logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why Enter, comma, and Tab all funnel through one commitInput() function instead of three separate handlers, and how the paste handler decides whether to let the browser's default paste behavior run versus intercepting it to split a comma-separated list into individual chips. The same assistant can help optimize it too — ask whether validating each chip's email format on every keystroke versus only on commit is worth the tradeoff for a very long recipient list. It's also useful for extending the field: ask it to add duplicate-email detection that highlights a chip already in the list, wire in a contacts autocomplete dropdown, or add separate To/Cc/Bcc rows sharing the same chip component. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "recipient chip input" (a Gmail-style "To:" field) in plain HTML, CSS, and JavaScript with no tagging library.

Requirements:
- A field container that visually looks like a single bordered input but actually holds a row of chip elements followed by a real text input, with the whole container gaining a focus ring when the inner input is focused (using :focus-within).
- Typed text turns into a chip when the user presses Enter, comma, or Tab (preventing Tab's default focus-move behavior only when there is pending text to commit), clearing the input afterward.
- Each created chip must be validated against a basic email-format regular expression independently, applying a distinct "invalid" visual style (e.g. red instead of the default blue) to any chip whose text does not look like a valid email address, without blocking the other valid chips from being added.
- Pasting text containing a comma must be intercepted so that each comma-separated piece becomes its own separate chip immediately, rather than pasting the raw comma-separated string into the input as one block of text.
- Pressing Backspace while the text input is empty removes the most recently added chip.
- Each chip includes a small remove button that deletes just that chip and returns focus to the text input.
- A live count label below the field that updates automatically to reflect the current number of chips, and clicking any empty space inside the field container (not on a chip) focuses the text input.`,
    },
  },
};

export default recipientChipInput;
