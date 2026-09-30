const pinPad = {
  id: 'pin-pad',
  title: 'PIN Pad',
  lastmod: '2026-06-17',
  category: 'forms',
  html: `<div class="pp-card" id="ppCard">
  <div class="pp-icon" id="ppIcon">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
  </div>
  <h2 class="pp-title" id="ppTitle">Enter your PIN</h2>
  <p class="pp-hint" id="ppHint">Demo PIN: 1 9 3 7</p>

  <div class="pp-dots" id="ppDots">
    <span class="pp-dot"></span><span class="pp-dot"></span><span class="pp-dot"></span><span class="pp-dot"></span>
  </div>

  <div class="pp-keys">
    <button class="pp-key" onclick="pressKey('1')">1</button>
    <button class="pp-key" onclick="pressKey('2')">2</button>
    <button class="pp-key" onclick="pressKey('3')">3</button>
    <button class="pp-key" onclick="pressKey('4')">4</button>
    <button class="pp-key" onclick="pressKey('5')">5</button>
    <button class="pp-key" onclick="pressKey('6')">6</button>
    <button class="pp-key" onclick="pressKey('7')">7</button>
    <button class="pp-key" onclick="pressKey('8')">8</button>
    <button class="pp-key" onclick="pressKey('9')">9</button>
    <span class="pp-key pp-blank"></span>
    <button class="pp-key" onclick="pressKey('0')">0</button>
    <button class="pp-key pp-del" onclick="del()" aria-label="Delete">⌫</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.pp-card{background:#1e293b;border:1px solid #334155;border-radius:22px;padding:28px 26px;width:100%;max-width:300px;text-align:center;box-shadow:0 22px 55px rgba(0,0,0,.45)}
.pp-card.shake{animation:pp-shake .45s ease}
@keyframes pp-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}

.pp-icon{width:46px;height:46px;border-radius:50%;background:rgba(99,102,241,.15);color:#a5b4fc;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;transition:background .3s,color .3s}
.pp-card.ok .pp-icon{background:rgba(16,185,129,.18);color:#34d399}
.pp-title{font-size:17px;font-weight:800;color:#f1f5f9}
.pp-card.ok .pp-title{color:#34d399}
.pp-hint{font-size:12px;color:#64748b;margin-top:4px}

.pp-dots{display:flex;justify-content:center;gap:16px;margin:22px 0 24px}
.pp-dot{width:13px;height:13px;border-radius:50%;background:transparent;border:2px solid #475569;transition:all .15s}
.pp-dot.filled{background:#6366f1;border-color:#6366f1;transform:scale(1.1)}
.pp-card.ok .pp-dot.filled{background:#10b981;border-color:#10b981}

.pp-keys{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.pp-key{height:58px;border:none;border-radius:16px;background:#334155;color:#f1f5f9;font-size:22px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .12s,transform .06s}
.pp-key:hover{background:#3f4d63}
.pp-key:active{transform:scale(.92);background:#475569}
.pp-blank{background:none;cursor:default;pointer-events:none}
.pp-del{background:none;font-size:20px;color:#94a3b8}
.pp-del:hover{background:#334155}`,

  js: `var CORRECT = '1937';
var pin = '';
var locked = false;
var card = document.getElementById('ppCard');

function render() {
  var dots = document.querySelectorAll('.pp-dot');
  dots.forEach(function (d, i) { d.classList.toggle('filled', i < pin.length); });
}

function pressKey(n) {
  if (locked || pin.length >= 4) return;
  pin += n;
  render();
  if (pin.length === 4) setTimeout(check, 180);
}

function del() {
  if (locked) return;
  pin = pin.slice(0, -1);
  render();
}

function check() {
  if (pin === CORRECT) {
    locked = true;
    card.classList.add('ok');
    document.getElementById('ppTitle').textContent = '✓ Unlocked';
    document.getElementById('ppHint').textContent = 'Welcome back!';
  } else {
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    document.getElementById('ppHint').textContent = 'Wrong PIN — try again';
    setTimeout(function () { pin = ''; render(); }, 450);
  }
}

document.addEventListener('keydown', function (e) {
  if (/[0-9]/.test(e.key)) pressKey(e.key);
  else if (e.key === 'Backspace') del();
});

render();`,

  seo: {
    title: 'PIN Pad — Secure Keypad HTML CSS JS Snippet',
    description: `Secure numeric PIN pad with filling dots, shake-on-error, success unlock state, backspace, and full keyboard support — vanilla JS. Exports to React, Vue & Tailwind.`,
    about: {
      title: `PIN Pad — Filling Dots, Shake-on-Error & Unlock Success State`,
      description: `A PIN pad is the focused, secure-feeling way to take a short numeric code — lock screens, payment confirmation, parental gates, 2FA backup. Unlike a free-text field, it shows masked dots that fill as you type, validates automatically at the right length, and gives unmistakable feedback: a shake for wrong, a colour shift for correct. This snippet implements all of that in plain HTML, CSS, and vanilla JavaScript, with mouse, touch, and physical-keyboard input.

**Masked dots that fill**

Four dots represent the PIN. \`pressKey\` appends a digit to the \`pin\` string (capped at four) and \`render\` fills the corresponding dots — filled dots scale up slightly and take the accent colour. The actual digits are never shown, only the count, which is the privacy expectation for a PIN. Backspace (\`del\`) removes the last digit and unfills its dot.

**Auto-submit and validation**

There is no submit button — entering the fourth digit auto-checks after a short 180ms delay (so the final dot visibly fills before validation). \`check\` compares the \`pin\` to the correct value: a match locks the pad and switches to a success state (green dots, green lock icon, "✓ Unlocked"); a mismatch triggers feedback and clears.

**Shake-on-error**

A wrong PIN plays a horizontal \`pp-shake\` keyframe on the whole card — the universally understood "nope" gesture from iOS and macOS lock screens. It's re-triggered each time with the remove-class / force-reflow / add-class pattern so it fires on every failed attempt, the hint updates to "Wrong PIN — try again", and the entry clears after the shake so the user can retry. A \`locked\` flag blocks further input once unlocked.

**Three input methods**

The on-screen keypad is a clean 3×4 grid (1–9, blank, 0, backspace) with tactile press states. A \`keydown\` listener mirrors it so physical number keys and Backspace work too — every path routes through the same \`pressKey\`/\`del\`, so they can't diverge. The success/colour states use \`transition\` on colour and background, and the shake uses a transform keyframe — both export cleanly.

In production the check would call your backend (never compare a real PIN client-side), and you'd rate-limit attempts. Pair this with an [OTP input](/ui-snippets/otp-input/) for emailed codes, a [pattern lock](/ui-snippets/pattern-lock/) for gesture entry, or an [auth login card](/ui-snippets/auth-login-card/) for full sign-in.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark PIN card appears with a lock icon, four empty dots, and a 3×4 numeric keypad.` },
      { title: 'Enter the PIN', text: `Tap digits — each fills the next dot. Entering the fourth digit auto-validates after a brief beat.` },
      { title: 'Try a wrong PIN', text: `Enter anything but 1 9 3 7 — the card shakes, the hint says "Wrong PIN", and the dots clear so you can retry.` },
      { title: 'Enter the correct PIN', text: `Type 1 9 3 7 — the dots and lock icon turn green and the title becomes "✓ Unlocked".` },
      { title: 'Use backspace', text: `Tap ⌫ (or press Backspace) to remove the last digit before submitting.` },
      { title: 'Type on your keyboard', text: `Physical number keys and Backspace work too, routed through the same logic as the on-screen pad.` },
    ] },
    features: [
      { title: 'Masked filling dots', text: `Four dots fill (and scale) as digits are entered, showing progress without ever revealing the PIN.` },
      { title: 'Auto-submit on length', text: `Entering the fourth digit auto-validates after a short delay so the last dot fills before the check runs.` },
      { title: 'Shake-on-error', text: `A wrong PIN plays a horizontal shake keyframe (re-triggered via forced reflow) — the universal "incorrect" cue.` },
      { title: 'Unlock success state', text: `A correct PIN turns the dots and lock icon green, updates the title to "✓ Unlocked", and locks further input.` },
      { title: 'Backspace support', text: `\`del\` removes the last digit and unfills its dot, on-screen (⌫) or via the Backspace key.` },
      { title: 'Full keyboard input', text: `A \`keydown\` listener routes number keys and Backspace through the same \`pressKey\`/\`del\` as the pad.` },
      { title: 'Tactile keypad', text: `A clean 3×4 grid with press scale/colour states gives satisfying physical feedback on tap.` },
      { title: 'Export-safe feedback', text: `Colour states use \`transition\` and the shake uses a transform keyframe, so feedback renders identically across frameworks.` },
    ],
    useCases: [
      { title: 'Lock and unlock screens', text: `App or kiosk lock screens where a quick PIN beats a password. Pair with a [pattern lock](/ui-snippets/pattern-lock/) as an alternative gesture.` },
      { title: 'Payment and transaction confirmation', text: `Confirm a payment or transfer with a PIN; combine with a [checkout payment form](/ui-snippets/checkout-form/) for the full flow.` },
      { title: '2FA backup and verification', text: `Numeric verification entry; for emailed/SMS codes use a longer [OTP input](/ui-snippets/otp-input/) instead.` },
      { title: 'Parental gates and kid modes', text: `A simple barrier before sensitive settings or purchases in family apps.` },
      { title: 'POS and kiosk access', text: `Staff PIN entry on shared point-of-sale or kiosk devices where a numeric pad suits touch screens.` },
      { title: 'Vault and secure sections', text: `Gate a private area of an app; combine with an [auth login card](/ui-snippets/auth-login-card/) for account sign-in.` },
      { icon: 'CODE', title: 'Related: Web Crypto Hash Demo', desc: 'See the [Web Crypto Hash Demo](/ui-snippets/web-crypto-hash-demo/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I validate the PIN securely?', a: `Never compare the real PIN on the client. Send the entered PIN to your backend over HTTPS and verify it there (against a salted hash), returning success/failure. Keep the client-side check only for demos. Always rate-limit attempts server-side and lock the account or add a cooldown after several failures to prevent brute-forcing a 4-digit space.` },
      { q: 'How do I support a 6-digit PIN?', a: `Add two more \`.pp-dot\` elements and change the length checks from 4 to 6 in \`pressKey\` and the auto-submit condition. Everything else — fill rendering, shake, success — scales automatically since it's driven by \`pin.length\` and the number of dot elements.` },
      { q: 'How do I prevent shoulder-surfing and brute force?', a: `The dots already mask digits. For stronger privacy, optionally shuffle the keypad layout each session (randomise the 0–9 positions) so observers can't infer the PIN from finger positions. For brute force, enforce server-side attempt limits and exponential backoff; the client \`locked\` flag is only a UX guard, not security.` },
      { q: 'Is the PIN pad accessible?', a: `The keys are real \`<button>\`s, so they're keyboard- and screen-reader operable, and a \`keydown\` handler adds physical number-key entry. Add an \`aria-label\` to each key, announce remaining digits and errors via an \`aria-live="polite"\` region (e.g. "3 of 4 entered", "incorrect PIN"), and ensure the success/error states are conveyed by text and icon, not colour alone.` },
      { q: 'How do I use this PIN pad in React, Vue, or Angular?', a: `In React, hold \`pin\` and a \`status\` ('idle' | 'ok' | 'error') in \`useState\`; \`pressKey\` appends and triggers validation in an effect when length hits 4, and the shake is a class keyed off \`status\`. In Vue, use \`ref\`s and a watcher on \`pin.length\`. In Angular, track \`pin\` on the component. The dot-fill and shake CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the reflow trick or the auto-submit timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the shake animation on wrong entry needs the remove-class, read offsetWidth, re-add-class sequence to replay correctly, and why check runs on a short setTimeout after the fourth digit rather than immediately. The same assistant can help optimize it, for example checking whether the same pressKey and del logic could be shared more cleanly between the on-screen button clicks and the document keydown listener, or whether the locked flag correctly blocks every input path once the pad is unlocked. It's also useful for extending the effect: ask it to support a 6-digit PIN instead of 4, add a shuffled keypad layout to defeat shoulder-surfing, or wire the check function to a real backend call with rate-limiting instead of a hardcoded client-side comparison. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a numeric PIN entry pad in plain HTML, CSS, and vanilla JavaScript with masked progress dots, a shake-on-error animation, and a success state — no frameworks.

Requirements:
- A row of exactly four dot indicators that visually fill (change color and scale slightly) one at a time as digits are entered, without ever displaying the actual digits typed.
- A 3x4 on-screen keypad of buttons for digits 0 through 9 plus a delete/backspace button, where every button press appends or removes a digit from an in-memory PIN string capped at exactly 4 characters.
- The moment the fourth digit is entered, wait a short delay (so the final dot visibly finishes filling first) and then automatically compare the entered PIN against a stored correct value — there must be no explicit submit button.
- On a correct match, switch the whole card into a visually distinct success state (for example recoloring the dots, an icon, and the title text to a success color) and permanently disable further input until reset.
- On an incorrect match, replay a horizontal shake animation on the card every single time it fails (even on consecutive failures), using the standard remove-class, force a synchronous reflow by reading an element's offsetWidth, then re-add-class technique so the CSS animation restarts from frame zero instead of being skipped by the browser, then clear the entered PIN after the shake finishes so the user can retry.
- Mirror every on-screen keypad action with a document-level keydown listener so physical number keys and the Backspace key drive the exact same append/delete logic as the on-screen buttons, with no divergent code paths.`,
    },
  },
};

export default pinPad;
