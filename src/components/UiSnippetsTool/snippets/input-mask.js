const inputMask = {
  id: 'input-mask',
  title: 'Input Mask Fields',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<div class="ims-card">
  <h3>Formatted inputs</h3>

  <div class="ims-field">
    <label for="imsPhone">Phone number</label>
    <input type="tel" id="imsPhone" data-mask="phone" inputmode="numeric" placeholder="(555) 123-4567">
  </div>

  <div class="ims-field">
    <label for="imsCard">Card number</label>
    <input type="text" id="imsCard" data-mask="card" inputmode="numeric" placeholder="1234 5678 9012 3456">
  </div>

  <div class="ims-row">
    <div class="ims-field">
      <label for="imsExp">Expiry</label>
      <input type="text" id="imsExp" data-mask="expiry" inputmode="numeric" placeholder="MM/YY">
    </div>
    <div class="ims-field">
      <label for="imsDate">Date</label>
      <input type="text" id="imsDate" data-mask="date" inputmode="numeric" placeholder="DD/MM/YYYY">
    </div>
  </div>

  <div class="ims-field">
    <label for="imsCurrency">Amount</label>
    <input type="text" id="imsCurrency" data-mask="currency" inputmode="decimal" placeholder="$0.00">
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 24px}

.ims-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:380px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.ims-card h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:18px}

.ims-row{display:flex;gap:12px}
.ims-row .ims-field{flex:1}
.ims-field{margin-bottom:15px}
.ims-field label{display:block;font-size:12.5px;font-weight:700;color:#475569;margin-bottom:7px}
.ims-field input{width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px 13px;font-size:14px;font-family:inherit;color:#0f172a;letter-spacing:.02em;font-variant-numeric:tabular-nums;transition:border-color .15s,box-shadow .15s}
.ims-field input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}`,

  js: `// Each mask takes the raw typed value and returns the formatted display string.
var MASKS = {
  phone: function (d) {
    d = d.replace(/\\D/g, '').slice(0, 10);
    if (d.length > 6) return '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
    if (d.length > 3) return '(' + d.slice(0, 3) + ') ' + d.slice(3);
    if (d.length > 0) return '(' + d;
    return '';
  },
  card: function (d) {
    return d.replace(/\\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  },
  expiry: function (d) {
    d = d.replace(/\\D/g, '').slice(0, 4);
    if (d.length > 2) return d.slice(0, 2) + '/' + d.slice(2);
    return d;
  },
  date: function (d) {
    d = d.replace(/\\D/g, '').slice(0, 8);
    var out = d.slice(0, 2);
    if (d.length > 2) out += '/' + d.slice(2, 4);
    if (d.length > 4) out += '/' + d.slice(4);
    return out;
  },
  currency: function (raw) {
    var d = raw.replace(/[^\\d.]/g, '');
    var parts = d.split('.');
    var intPart = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
    var dec = parts.length > 1 ? '.' + parts[1].slice(0, 2) : '';
    return d === '' ? '' : '$' + intPart + dec;
  },
};

document.querySelectorAll('[data-mask]').forEach(function (input) {
  var fn = MASKS[input.dataset.mask];
  input.addEventListener('input', function () {
    // Preserve caret position relative to the end so editing mid-string feels natural.
    var atEnd = this.selectionStart === this.value.length;
    var formatted = fn(this.value);
    this.value = formatted;
    if (!atEnd) {
      // Re-place the caret near where it was (best-effort for digit insertions).
      var pos = Math.min(this.selectionStart, formatted.length);
      this.setSelectionRange(pos, pos);
    }
  });
});`,

  seo: {
    title: 'Input Mask Fields — Auto-Format Inputs HTML CSS JS',
    description: `Self-formatting inputs that mask phone, card, expiry, date, and currency values as you type — no library. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Input Mask Fields — Live Auto-Formatting for Phone, Card, Date & Currency',
      description: `An input mask formats a value as the user types — adding the parentheses and dashes to a phone number, the spaces to a card number, the slashes to a date — so the field is always readable and the user never has to type punctuation. This snippet builds a reusable masking system in plain HTML, CSS, and vanilla JavaScript, with five ready-made masks (phone, card number, expiry, date, currency) driven by a single \`data-mask\` attribute.

**One attribute, any mask**

Every masked input just declares \`data-mask="phone"\` (or card, expiry, date, currency), and a single setup loop wires the matching formatter to its \`input\` event. The masks live in a \`MASKS\` object where each entry is a pure function: it takes the raw typed value and returns the formatted display string. This keeps the system extensible — adding a new mask (SSN, IBAN, license plate) is one function in the object plus the attribute on the field, with no per-field code.

**Format from digits, not from keystrokes**

The robust way to mask is to strip the value down to its raw characters and re-build the formatted string from scratch on every input — rather than trying to insert punctuation at the caret per keystroke. The phone mask, for example, removes all non-digits, caps at 10, then assembles \`(555) 123-4567\` from whatever digits remain. This "extract then reformat" approach handles every editing case correctly: typing, pasting a pre-formatted number, deleting from the middle, or selecting and replacing — because the output is always derived from the clean underlying value, not from the messy intermediate state.

**The five built-in masks**

*Phone* builds US-style \`(area) prefix-line\` progressively as digits arrive. *Card number* groups 16 digits into four space-separated blocks (the standard for readability and matching the printed card). *Expiry* inserts the \`MM/YY\` slash after two digits. *Date* assembles \`DD/MM/YYYY\` with slashes. *Currency* strips to digits and a decimal point, adds thousands separators with a regex, caps the decimals at two, and prefixes \`$\`. Each caps its length so the user can't overflow the format. These cover the inputs that most need masking — the ones where unformatted entry is hardest to read and most error-prone.

**Caret handling**

Re-rendering the whole value on every keystroke risks throwing the caret to the end mid-edit. The snippet preserves the end-of-string case (the common one — typing forward) naturally, and best-effort restores the caret position when editing in the middle, so the field feels natural rather than jumpy. Full caret-perfect masking is genuinely hard (it's why libraries exist), but this handles the everyday typing and pasting cases that cover the vast majority of real use.

**Mobile keyboards and accessibility**

Each field sets the right \`inputmode\` (\`numeric\` for phone/card/date, \`decimal\` for currency) so mobile devices show the appropriate keypad, and \`type="tel"\` on the phone field for the same reason. The display value is always the masked, human-readable form; when you submit, strip it back to the raw value (the FAQs show how) so your backend stores clean data. \`tabular-nums\` keeps the digits evenly spaced as they format.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A form renders with phone, card, expiry, date, and currency fields, each formatting as you type.` },
      { title: 'Type a phone number', text: `Enter digits — parentheses and a dash appear automatically as "(555) 123-4567" without typing any punctuation.` },
      { title: 'Try the card field', text: `Type 16 digits and they group into four space-separated blocks; expiry inserts the slash after two digits.` },
      { title: 'Test currency', text: `Type numbers and a $ prefix, thousands commas, and two-decimal cap appear automatically.` },
      { title: 'Add your own mask', text: `Add a function to the MASKS object (raw value → formatted string) and a data-mask attribute on the field.` },
      { title: 'Strip on submit', text: `Before sending, remove the formatting (value.replace(/\\D/g, '')) so your backend stores the clean raw value.` },
    ] },
    features: [
      { title: 'data-mask attribute system', text: `One attribute picks the formatter; a single loop wires every masked field — no per-field code.` },
      { title: 'Five built-in masks', text: `Phone, card number, expiry (MM/YY), date (DD/MM/YYYY), and currency, each length-capped.` },
      { title: 'Extract-then-reformat', text: `Every keystroke rebuilds the format from the raw value, so typing, pasting, and mid-string edits all stay correct.` },
      { title: 'Pure-function masks', text: `Each mask is a raw→formatted function in one object — add SSN, IBAN, or any format with a single entry.` },
      { title: 'Currency with separators', text: `Adds thousands commas, caps decimals at two, and prefixes $ from a regex, formatting money as typed.` },
      { title: 'Best-effort caret handling', text: `Preserves the natural end-of-string typing case and restores mid-string caret position on edits.` },
      { title: 'Mobile keypad hints', text: `Correct inputmode (numeric/decimal) and type=tel surface the right mobile keyboard per field.` },
      { title: 'Tabular-aligned digits', text: `font-variant-numeric: tabular-nums keeps digits evenly spaced as the mask applies.` },
    ],
    useCases: [
      { title: 'Checkout and payment forms', text: `Format card numbers and expiry as typed — pair with a [credit card input](/ui-snippets/credit-card-input/) for the full card UI.` },
      { title: 'Contact and signup forms', text: `Mask phone numbers so they're always readable, alongside a [multi email input](/ui-snippets/multi-email-input/) for recipients.` },
      { title: 'Booking and date entry', text: `Format date fields without a full date picker for quick keyboard entry.` },
      { title: 'Invoicing and finance', text: `Format currency amounts with separators in billing or expense forms.` },
      { title: 'Profile and account settings', text: `Keep phone, tax ID, or other formatted fields consistent across an app.` },
      { title: 'Learning input masking', text: `A reference for the extract-then-reformat technique and caret handling — compare with a [currency input](/ui-snippets/currency-input/) for the money-only version.` },
      { icon: 'CODE', title: 'Related: One-Time vs Monthly Donation Toggle', desc: 'See the [One-Time vs Monthly Donation Toggle](/ui-snippets/recurring-donation-toggle/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I get the raw, unformatted value to submit?', a: `Strip the formatting before sending: for digit-only masks, value.replace(/\\D/g, '') gives the clean digits (e.g. "5551234567"); for currency, value.replace(/[^\\d.]/g, '') gives the number. Always store and validate the raw value server-side — the mask is a display concern, so never persist the formatted string with its punctuation.` },
      { q: 'How do I add a new mask, like SSN or IBAN?', a: `Add a function to the MASKS object keyed by a name — it receives the raw input value and returns the formatted string (strip to the allowed characters, cap the length, and insert the separators). Then put data-mask="ssn" on the field. The setup loop wires it automatically; no other code changes.` },
      { q: 'Why rebuild the whole value instead of inserting characters at the caret?', a: `Inserting punctuation per keystroke breaks on paste, mid-string deletion, and selection-replace, because the intermediate value is messy. Stripping to the raw characters and reformatting from scratch produces a correct result for every editing action, since the output is always derived from clean data. The only tricky part is caret restoration, which this handles for the common cases.` },
      { q: 'How robust is the caret handling?', a: `It preserves the natural forward-typing case (caret at end) perfectly and makes a best-effort restore when editing mid-string. Truly caret-perfect masking across every edit and locale is hard — it's the main reason dedicated masking libraries exist. For most forms (where users type left-to-right and occasionally paste) this is more than sufficient; for complex cases, layer a library on top of the same mask functions.` },
      { q: 'How do I use input masks in React, Vue, or Angular?', a: `In React, make the input controlled — hold the value in useState and set it to mask(e.target.value) in onChange; in Vue, use a watcher or computed setter on the v-model; in Angular, apply the mask in the (input) handler or a custom directive. The mask functions are pure and port unchanged — they take a raw string and return a formatted one regardless of framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to reason through every regex in the MASKS object unaided. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the currency mask's thousands-separator regex works on the split integer and decimal parts, or why the extract-then-reformat approach (stripping to raw characters and rebuilding the string from scratch on every input event) is more robust than inserting punctuation at the caret position directly. The same assistant can help optimize it — ask whether the caret-restoration logic in the shared input listener could be made more accurate for mid-string edits, since right now it is explicitly a best-effort approximation. It is just as useful for extending the system: ask it to add a new mask function for an SSN, IBAN, or postal code following the same data-mask attribute convention, wire up server-side stripping of the formatted value before submit, or add per-mask validation that flags an incomplete phone number or expired card date. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of self-formatting input fields in plain HTML, CSS, and JavaScript using a single data-mask attribute convention — no input-masking library.

Requirements:
- A MASKS object where each key (phone, card, expiry, date, currency) maps to a pure function that takes the input's raw current value and returns a fully formatted display string; do not try to insert characters at the caret position — instead strip the value down to its meaningful raw characters (digits, or digits plus a decimal point for currency) and rebuild the entire formatted string from that clean value on every call.
- The phone mask must progressively build a US-style format like (555) 123-4567 as digits arrive, capping at 10 digits.
- The card mask must group up to 16 digits into space-separated blocks of 4.
- The expiry mask must insert a slash after the second digit to produce MM/YY, capping at 4 digits.
- The date mask must insert slashes after the second and fourth digits to produce DD/MM/YYYY, capping at 8 digits.
- The currency mask must strip to digits and at most one decimal point, insert comma thousands separators into the integer portion with a regex, cap the decimal portion at two digits, and prefix a dollar sign.
- A single setup loop must query every element with a data-mask attribute, look up its formatter function by the attribute's value, and attach one input event listener that: reads whether the caret was at the end of the string before formatting, replaces the input's value with the formatter's output, and if the caret was not at the end, restores the selection to approximately the same position (best-effort) rather than always jumping to the end.
- Each field must set the appropriate inputmode (numeric or decimal) so mobile devices show the correct keypad.`,
    },
  },
};

export default inputMask;
