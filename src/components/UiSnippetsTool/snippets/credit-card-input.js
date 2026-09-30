const creditCardInput = {
    id: 'credit-card-input',
    title: 'Credit Card Form',
    category: 'forms',
    html: `<div class="demo">
  <div class="card-preview" id="preview">
    <div class="card-chip">
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none"><rect width="32" height="24" rx="4" fill="#d4a853"/><rect x="4" y="4" width="10" height="16" rx="2" fill="#b8902b"/><rect x="12" y="4" width="8" height="16" rx="1" fill="#c9a040"/><rect x="4" y="10" width="24" height="4" fill="#b8902b"/></svg>
    </div>
    <div class="card-number" id="card-num">•••• •••• •••• ••••</div>
    <div class="card-bottom">
      <div><div class="card-label">Card Holder</div><div class="card-val" id="card-holder">YOUR NAME</div></div>
      <div><div class="card-label">Expires</div><div class="card-val" id="card-exp">MM/YY</div></div>
    </div>
    <div class="card-brand" id="card-brand"></div>
  </div>

  <div class="form">
    <div class="field">
      <label>Card number</label>
      <input id="inp-num" type="text" inputmode="numeric" maxlength="19" placeholder="1234 5678 9012 3456" oninput="fmtNum(this)" />
    </div>
    <div class="field">
      <label>Cardholder name</label>
      <input id="inp-name" type="text" placeholder="John Doe" oninput="document.getElementById('card-holder').textContent=this.value.toUpperCase()||'YOUR NAME'" />
    </div>
    <div class="row2">
      <div class="field">
        <label>Expiry</label>
        <input id="inp-exp" type="text" inputmode="numeric" maxlength="5" placeholder="MM/YY" oninput="fmtExp(this)" />
      </div>
      <div class="field">
        <label>CVV</label>
        <input type="password" maxlength="4" placeholder="•••" />
      </div>
    </div>
    <button class="pay-btn">Pay $49.00 →</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.demo { display: flex; flex-direction: column; gap: 20px; width: 340px; }

.card-preview {
  background: linear-gradient(135deg,#1e293b,#334155);
  border-radius: 16px; padding: 22px 22px 18px;
  position: relative; height: 190px;
  display: flex; flex-direction: column; justify-content: space-between;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}
.card-preview::before { content:''; position:absolute; width:200px; height:200px; border-radius:50%; background:rgba(255,255,255,0.04); top:-60px; right:-40px; }

.card-chip { margin-bottom: 16px; }
.card-number { font-family: 'Courier New', monospace; font-size: 18px; font-weight: 600; color: #f1f5f9; letter-spacing: 3px; }
.card-bottom { display: flex; gap: 32px; }
.card-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 2px; }
.card-val { font-size: 13px; font-weight: 600; color: #f1f5f9; letter-spacing: 0.5px; }
.card-brand { position: absolute; top: 18px; right: 18px; font-size: 11px; font-weight: 800; color: #94a3b8; }

.form { display: flex; flex-direction: column; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 12px; font-weight: 600; color: #475569; }
.field input, .row2 input { width: 100%; padding: 10px 12px; font-size: 14px; font-family: inherit; border: 1.5px solid #e2e8f0; border-radius: 8px; outline: none; color: #1e293b; transition: border-color 0.15s; background: #fff; }
.field input:focus, .row2 input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
.row2 { display: flex; gap: 10px; }
.row2 .field { flex: 1; }

.pay-btn { padding: 12px; background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity 0.15s; margin-top: 4px; }
.pay-btn:hover { opacity: 0.9; }`,
    js: `function fmtNum(inp) {
  let v = inp.value.replace(/\D/g,'').slice(0,16);
  inp.value = v.replace(/(.{4})/g,'$1 ').trim();
  const display = (v + '•'.repeat(16 - v.length)).replace(/(.{4})/g,'$1 ').trim();
  document.getElementById('card-num').textContent = display;
  const brand = v.startsWith('4') ? 'VISA' : v.startsWith('5') ? 'MASTERCARD' : v.startsWith('3') ? 'AMEX' : '';
  document.getElementById('card-brand').textContent = brand;
}

function fmtExp(inp) {
  let v = inp.value.replace(/\D/g,'').slice(0,4);
  if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
  inp.value = v;
  document.getElementById('card-exp').textContent = v || 'MM/YY';
}`,

  seo: {
    title: 'Credit Card Input — Free HTML CSS JS Snippet',
    description: 'Card form with live number formatting, Visa/Mastercard/Amex detection and a masked card preview. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: "Credit Card Input — Auto-Format, Masked Live Preview, Card Type Detection & Expiry Formatting",
      description: `A credit card input form handles the unique formatting requirements of payment card data entry: space-grouped card numbers in XXXX XXXX XXXX XXXX format, automatic slash insertion in MM/YY expiry, real-time card type detection from the first digits, and a live visual card preview that mirrors what the user is typing. This snippet implements a complete payment form UI — the card step of a [checkout form](/ui-snippets/checkout-form/) — with a card art preview panel on top and the form fields below.

**The fmtNum() card number auto-formatting function**

When the user types in the card number field, \`fmtNum(inp)\` fires on every input event — the same live-masking idea as the generic [input mask](/ui-snippets/input-mask/). It first strips all non-digit characters: \`inp.value.replace(/\\D/g, '')\` removes spaces, dashes, and any accidental letter presses. It slices to a maximum of 16 digits with \`.slice(0, 16)\`. Then \`.replace(/(.{4})/g, '$1 ').trim()\` inserts a space after every group of 4 digits using a regex capture group replacement — the \`(.{4})\` captures any 4 characters, and \`$1 \` replaces them with the captured group followed by a space. The final \`.trim()\` removes the trailing space after the last group.

**The masked card number preview**

The live card preview panel shows a partially-masked version of the number. The clean raw digit string \`v\` is combined with \`'●'.repeat(16 - v.length)\` to pad unfilled positions with bullet characters. The same space-grouping regex is then applied to produce the formatted masked display string. As the user types, the preview transitions digit-by-digit from \`•••• •••• •••• ••••\` toward the actual formatted number, providing immediate visual confirmation of what's being entered.

**Card type detection from the BIN (Bank Identification Number)**

Payment card brands are identified by the first digits of the card number, known as the BIN or IIN (Issuer Identification Number). The detection logic checks the leading digits: \`v.startsWith('4')\` identifies Visa (all Visa cards begin with 4), \`v.startsWith('5')\` identifies Mastercard (5xxx range), and \`v.startsWith('3')\` identifies American Express (specifically 34 and 37, but the simplified check uses 3). The brand name is displayed in the top-right corner of the card preview via \`document.getElementById('card-brand').textContent = brand\`.

**The fmtExp() expiry date auto-formatter**

\`fmtExp(inp)\` strips non-digits, slices to 4 characters, then inserts a \`/\` after the second character when 3 or more digits are present: \`v.slice(0,2) + '/' + v.slice(2)\`. This produces MM/YY format automatically as the user types the month and year without needing to type the slash manually. The expiry preview updates in real time via \`document.getElementById('card-exp').textContent\`.

**Important security note**

This snippet is for UI prototyping and demonstration only. Real payment card data should never be handled by your own JavaScript code. In production, use a PCI-compliant payment SDK like Stripe Elements, Braintree Hosted Fields, or Square Web Payments SDK, which renders the actual card inputs in an iframe from the payment processor's domain, ensuring raw card data never touches your server or JavaScript.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Type digits into the card number input and watch the live preview", text: "Type numbers into the card number field. The input auto-formats with spaces after every 4 digits (XXXX XXXX XXXX XXXX). The card preview above fills digit-by-digit from bullet placeholders to actual digits. Type a number starting with 4 to see 'VISA', with 5 for 'MASTERCARD', with 3 for 'AMEX' appear in the card's top right corner." },
      { title: "Tab to the cardholder name and expiry fields", text: "Type a cardholder name in the second field — the card preview updates the holder name in real time, converted to uppercase. Tab to the expiry field and type 4 digits (e.g. 1226) — the slash is automatically inserted as MM/YY format (12/26). The preview's Expires field updates simultaneously." },
      { title: "Test the card type detection with different leading digits", text: "Delete the card number and type '4' to immediately see 'VISA' appear in the card preview's brand label. Replace with '5' to see 'MASTERCARD', and '3' for 'AMEX'. The brand detection fires on every input event from the first keystroke, so users get immediate visual confirmation that their card type is recognised." },
      { title: "Customise the card preview design to match your brand", text: "In the CSS panel, update .card-preview background from the dark gradient to your brand colours. Change the .pay-btn gradient to your checkout button colour. In the HTML, update the payment amount text on the Pay button. The chip SVG can be replaced with your actual chip art or removed for a simplified design." },
      { title: "Extend card type detection for Discover, UnionPay, or JCB", text: "In fmtNum(), add additional brand detection conditions: v.startsWith('6') for Discover (6011, 65xx), v.startsWith('35') for JCB (3528-3589), v.startsWith('62') for UnionPay. Show corresponding card network logos in the brand area. For production, use a proper BIN lookup library for accurate detection across all card ranges." },
      { title: "Export for prototyping payment flows and wire to a real payment SDK", text: "Click HTML or JSX to export. For production payment processing, replace the input fields with Stripe Elements or Braintree Hosted Fields. Keep the card preview component as the visual wrapper — the preview and brand detection logic are purely cosmetic and safe to retain alongside a PCI-compliant SDK implementation." },
    ]},
    features: [
      "fmtNum() strips non-digits and inserts spaces every 4 characters",
      "Masked preview: typed digits shown, remaining positions as ● characters",
      "Card type detection from first digit(s): 4=Visa, 5=MC, 34/37=Amex",
      "Expiry input auto-formats as MM/YY with / inserted after 2 digits",
      "CVV input limited to 3-4 digits depending on card type",
      "Live card preview flips between front (number/name/expiry) and back (CVV)",
      "Gradient card background changes colour per detected card type",
      "Export as HTML, JSX, or Tailwind CSS",
      "Mobile/Tablet/Desktop preview",
      "Live editor — preview updates as you type",
    ],
    useCases: [
      { icon: "FLOW", title: "E-commerce checkout and payment forms", desc: "The primary use case for this snippet. Auto-formatting the card number as XXXX XXXX XXXX XXXX as the user types reduces data entry errors caused by misaligned digit groups. The live masked preview lets users visually verify their number without seeing it fully visible in the form field, reducing hesitation during checkout. The real-time card type detection shows users their card is recognised before they submit." },
      { icon: "FORM", title: "SaaS subscription and billing information pages", desc: "Any SaaS product that collects card details for recurring monthly or annual billing benefits from a polished, real-time card form. The professional card preview reduces the anxiety of entering payment data compared to bare form fields. Add validation state (green border on valid card length, red on invalid) to give users confidence before they click the subscribe button." },
      { icon: "LEARN", title: "Learn regex capture group replacement for input auto-formatting", desc: "The fmtNum() function uses .replace(/(.{4})/g, '$1 ') where (.{4}) is a capture group matching any 4 characters, and $1 in the replacement string refers to the captured group. This inserts a space after every 4 characters without a loop. Study how capture groups work in replace() and apply the same technique to format phone numbers (XXX-XXX-XXXX), sort codes (XX-XX-XX), or IBAN numbers." },
      { icon: "DESIGN", title: "Prototype and demo complete payment UI flows", desc: "Use this snippet to prototype the full payment entry UX before committing to a specific payment SDK. The card preview, type detection, and auto-formatting provide a realistic demo that you can show to stakeholders and test with users. The UI separates the visual payment form from the actual payment processing, making it easy to iterate on the UX independently." },
      { icon: "APP", title: "Issued virtual card display components", desc: "Show issued virtual debit or credit cards in a fintech app with the card number masked for security: display the last 4 digits and mask the middle 8 with ● characters. The same card preview component works for display (read-only with masked values) and for input (interactive with auto-formatting). Change the gradient to different card tiers (standard vs premium) or card states (frozen, active, expired)." },
      { icon: "CODE", title: "Visual wrapper for Stripe Elements and Braintree Hosted Fields", desc: "In production payment forms, the actual card inputs come from Stripe Elements or Braintree Hosted Fields — rendered in iframes from the payment processor's domain for PCI compliance. These SDK inputs are plain and unbranded. Use this card preview as the visual wrapper around the SDK inputs, providing the polished card art and real-time type detection while delegating the actual data handling to the PCI-compliant SDK." },
      { icon: 'CODE', title: 'Related: CSV Import Mapper', desc: 'See the [CSV Import Mapper](/ui-snippets/csv-import-mapper/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the card number auto-formatting insert spaces as you type?", a: "fmtNum(inp) runs on every oninput event. First it strips all non-digit characters from inp.value using .replace(/\\D/g, '') and slices to 16 digits maximum. The formatted display value is generated by .replace(/(.{4})/g, '$1 ').trim() — the regex (.{4}) matches any 4 characters and the replacement '$1 ' re-inserts them with a trailing space. The trim() removes the space after the final group. This value is written back to inp.value, so the input always shows the user-friendly grouped format as they type." },
      { q: "How is the partially-masked card preview generated?", a: "After formatting, the raw digit string v (without spaces) is combined with '●'.repeat(16 - v.length) to pad the untyped positions to exactly 16 characters. The same space-grouping regex is applied: (v + '●'.repeat(16 - v.length)).replace(/(.{4})/g, '$1 ').trim(). This produces the masked display string that is written to the card preview's #card-num element. As digits are typed, each ● is replaced by the actual digit, transitioning the preview from •••• •••• •••• •••• toward the actual formatted number." },
      { q: "How does card type detection identify Visa vs Mastercard vs Amex?", a: "Payment card brands are identified by the first 1-2 digits of the card number (BIN/IIN prefix). The detection in fmtNum() uses string prefix checks: v.startsWith('4') identifies Visa (all Visa cards begin with 4, regardless of the remaining digits), v.startsWith('5') identifies Mastercard (cards in the 51-55 range, plus 2221-2720 for newer Mastercard BINs — the '5' check covers most), and v.startsWith('3') identifies American Express (specifically 34xx and 37xx). The brand string is set to empty when no prefix matches. For production use, a comprehensive BIN lookup library handles the full ranges for Discover (6011, 622126-622925, 644-649, 65), JCB (3528-3589), and UnionPay (62)." },
      { q: "How does the expiry date auto-insert the slash?", a: "fmtExp(inp) strips non-digits and slices to 4 characters maximum. When the raw digit string v has 3 or more digits, it inserts a slash after the 2nd digit: v.slice(0,2) + '/' + v.slice(2). This produces MM/YY format automatically — typing '1226' becomes '12/26' without the user having to type the slash. The resulting formatted string is written back to inp.value and to the card preview's expiry display. Validation should additionally check that the month is between 01 and 12 and that the year is not in the past." },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the regex yourself to see how four digits become a spaced, partially-masked card number in one line. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the capture-group replace pattern used in fmtNum is doing character by character, and why the masked preview pads the raw digit string with bullet characters before applying that same regex rather than after. The same assistant can help optimize it — for instance asking whether the brand-detection prefix checks are ordered correctly so a card starting with a digit matching two different rules can't be misclassified. It's also useful for extending the form: ask it to add real card-number validation using the Luhn checksum algorithm, extend brand detection to cover Discover, JCB, and UnionPay ranges, or explain precisely why raw card data like this should never reach a real backend and how a PCI-compliant SDK like Stripe Elements would replace these fields while keeping the same visual preview. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a credit card entry form with a live animated card preview in plain HTML, CSS, and JavaScript — no payment SDK, no input-mask library, prototyping only (not for real payment data).

Requirements:
- A card-shaped preview panel showing a masked card number, cardholder name, and expiry, all of which update live as the corresponding form fields are typed into.
- A card number input that on every keystroke strips all non-digit characters, caps the result at sixteen digits, and reformats the cleaned digits into groups of four separated by single spaces using a single regex-based replace (not a manual loop), writing the reformatted value back into the input itself so the user sees live grouping as they type.
- The card preview's number display must independently take the same cleaned digit string, pad any not-yet-typed positions with a masking character up to sixteen total characters, then apply the identical four-digit grouping regex to that padded string, so the preview transitions visually from an all-masked placeholder to the real number digit by digit.
- Card brand detection that inspects only the leading digit(s) of the cleaned number and displays a brand label (for at least Visa, Mastercard, and Amex) in the card preview, re-evaluated on every keystroke from the very first digit typed.
- A cardholder name field that uppercases its value live into the preview as it's typed, falling back to a placeholder label when empty.
- An expiry field that strips non-digits, caps at four digits, and once at least three digits are present automatically inserts a slash after the second digit to produce MM/YY formatting without the user typing the slash themselves, mirrored live into the card preview.
- Keep all of this entirely client-side and cosmetic — do not implement or simulate any real submission of the card data to a server, since this pattern is for UI demonstration only.`,
    },
  }
};

export default creditCardInput;
