const lockerPickupCodeCard = {
  id: 'locker-pickup-code-card',
  title: 'Parcel Locker Pickup Code Card',
  category: 'cards',
  html: `<div class="wrap">
  <div class="locker-card">
    <div class="locker-head">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
      <div>
        <h3>Package ready for pickup</h3>
        <p>Riverside Station &middot; Locker <span id="lockerNum">C-14</span></p>
      </div>
    </div>

    <div class="locker-code-box">
      <span class="locker-code-label">Pickup code</span>
      <div class="locker-code-row">
        <span class="locker-code" id="lockerCode">4 8 2 9 1 7</span>
        <button class="locker-copy-btn" id="lockerCopyBtn">Copy</button>
      </div>
    </div>

    <div class="locker-expiry">
      <div class="locker-expiry-bar"><div class="locker-expiry-fill" id="expiryFill"></div></div>
      <span class="locker-expiry-text" id="expiryText">Code expires in 47:58:00</span>
    </div>

    <button class="locker-regen-btn" id="regenBtn">Generate new code</button>
    <p class="locker-note" id="lockerNote">Show this code, or scan the QR on the locker screen, within the pickup window.</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.wrap { width: 100%; max-width: 340px; }
.locker-card { background: #fff; border-radius: 20px; padding: 22px; box-shadow: 0 18px 44px rgba(15,23,42,0.1); border: 1px solid #f1f5f9; }

.locker-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.locker-head svg { color: #6366f1; flex-shrink: 0; }
.locker-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; }
.locker-head p { font-size: 12px; color: #94a3b8; margin-top: 2px; }

.locker-code-box { background: #f8fafc; border-radius: 14px; padding: 14px 16px; margin-bottom: 16px; }
.locker-code-label { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px; }
.locker-code-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.locker-code { font-size: 22px; font-weight: 800; letter-spacing: 0.08em; color: #0f172a; font-family: ui-monospace, 'SF Mono', monospace; transition: transform 0.25s ease, opacity 0.25s ease; }
.locker-code.swap { transform: translateY(-6px); opacity: 0; }

.locker-copy-btn { border: none; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.08); color: #4f46e5; font-size: 11.5px; font-weight: 700; padding: 7px 12px; border-radius: 8px; cursor: pointer; flex-shrink: 0; transition: background 0.12s, color 0.12s; }
.locker-copy-btn:hover { background: #eef2ff; }
.locker-copy-btn.copied { background: #dcfce7; color: #15803d; }

.locker-expiry { margin-bottom: 16px; }
.locker-expiry-bar { height: 6px; border-radius: 999px; background: #f1f5f9; overflow: hidden; margin-bottom: 8px; }
.locker-expiry-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #6366f1, #8b5cf6); transition: width 1s linear, background 0.4s; }
.locker-expiry-fill.urgent { background: linear-gradient(90deg, #f59e0b, #dc2626); }
.locker-expiry-text { font-size: 11.5px; font-weight: 700; color: #64748b; font-variant-numeric: tabular-nums; }
.locker-expiry-text.urgent { color: #dc2626; }

.locker-regen-btn { width: 100%; border: 1px solid #e2e8f0; background: #fff; color: #4f46e5; font-size: 12.5px; font-weight: 700; padding: 10px; border-radius: 10px; cursor: pointer; margin-bottom: 12px; transition: background 0.12s, opacity 0.15s; }
.locker-regen-btn:hover:not(:disabled) { background: #f8fafc; }
.locker-regen-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.locker-note { font-size: 11.5px; color: #94a3b8; text-align: center; line-height: 1.5; }`,
  js: `var TOTAL_SECONDS = 48 * 3600;
var remaining = 47 * 3600 + 58 * 60;
var canRegen = true;

var codeEl = document.getElementById('lockerCode');
var fillEl = document.getElementById('expiryFill');
var textEl = document.getElementById('expiryText');
var regenBtn = document.getElementById('regenBtn');
var copyBtn = document.getElementById('lockerCopyBtn');
var noteEl = document.getElementById('lockerNote');

function formatCode(digits) {
  return digits.split('').join(' ');
}

function randomCode() {
  var out = '';
  for (var i = 0; i < 6; i++) out += Math.floor(Math.random() * 10);
  return out;
}

function formatRemaining(sec) {
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = Math.floor(sec % 60);
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  return pad(h) + ':' + pad(m) + ':' + pad(s);
}

function updateExpiry() {
  var pct = Math.max(0, (remaining / TOTAL_SECONDS) * 100);
  fillEl.style.width = pct + '%';
  var urgent = remaining < 3600 * 4;
  fillEl.classList.toggle('urgent', urgent);
  textEl.classList.toggle('urgent', urgent);
  if (remaining <= 0) {
    textEl.textContent = 'Code expired — generate a new one to pick up your package';
    regenBtn.disabled = false;
    return;
  }
  textEl.textContent = 'Code expires in ' + formatRemaining(remaining);
}

function tick() {
  if (remaining > 0) {
    remaining -= 30;
    updateExpiry();
  }
}

function swapCode(newDigits) {
  codeEl.classList.add('swap');
  setTimeout(function () {
    codeEl.textContent = formatCode(newDigits);
    copyBtn.dataset.value = newDigits;
    codeEl.classList.remove('swap');
  }, 220);
}

function copyCode() {
  var value = copyBtn.dataset.value || '482917';
  var restore = copyBtn.textContent;
  function done(ok) {
    copyBtn.textContent = ok ? 'Copied!' : 'Failed';
    copyBtn.classList.toggle('copied', ok);
    setTimeout(function () { copyBtn.textContent = restore; copyBtn.classList.remove('copied'); }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(function () { done(true); }, function () { done(false); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    done(ok);
  }
}

regenBtn.addEventListener('click', function () {
  if (!canRegen) return;
  canRegen = false;
  regenBtn.disabled = true;
  regenBtn.textContent = 'Generating…';
  setTimeout(function () {
    var fresh = randomCode();
    swapCode(fresh);
    remaining = TOTAL_SECONDS;
    updateExpiry();
    regenBtn.textContent = 'New code generated';
    noteEl.textContent = 'A fresh code was issued — the old code no longer works on the locker screen.';
    setTimeout(function () {
      regenBtn.textContent = 'Generate new code';
      regenBtn.disabled = false;
      canRegen = true;
    }, 2200);
  }, 900);
});

copyBtn.dataset.value = '482917';
copyBtn.addEventListener('click', copyCode);

updateExpiry();
setInterval(tick, 1000);`,
  seo: {
    title: 'Parcel Locker Pickup Code Card — Free HTML CSS JS Snippet',
    description: 'A parcel locker pickup card with a live countdown to code expiry, one-click code copy, and a regenerate-code action with cooldown. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Parcel Locker Pickup Code Card — Countdown Timer, Copy-to-Clipboard & Code Regeneration',
      description: `Package lockers hand a customer one job: type or scan a code into a keypad before it stops working. This card is built around that single moment — a large, unmistakably legible pickup code, a countdown that makes the expiry window impossible to miss, and a copy button so the code can be pasted into a locker's touchscreen search field instead of misread digit by digit.

**A countdown that recolors itself as urgency rises**

\`remaining\` starts at just under 48 hours and ticks down every second via \`setInterval(tick, 1000)\`, which decrements it by 30 to keep the demo timeline fast without changing the display format. \`updateExpiry()\` derives a percentage of \`TOTAL_SECONDS\` remaining for the progress bar's \`width\`, and once \`remaining\` drops under four hours it adds an \`.urgent\` class that swaps the bar's gradient from indigo to amber-red and turns the countdown text red. The threshold is deliberately not the final minute — someone who still has hours left doesn't need alarm, but someone under four hours benefits from a visual nudge before the deadline sneaks past them.

**Digits formatted for a keypad, not for reading as a word**

\`formatCode()\` inserts a space between every digit of the six-digit code (\`'482917'\` becomes \`'4 8 2 9 1 7'\`) and renders it in a monospace font at a large size. Locker keypads and touchscreens expect digits typed one at a time; a run of six digits with no separation is easy to lose your place in mid-entry, especially glancing between a phone screen and a physical keypad in a lobby or hallway.

**Regeneration with a cooldown, not an instant re-roll**

Clicking \`#regenBtn\` disables the button, shows a "Generating…" label, and only after a 900ms delay swaps in a fresh six-digit code via \`randomCode()\` — mimicking a real request to a locker network's backend rather than instantaneous client-side randomness. \`canRegen\` guards against a second click firing mid-request, and after the swap the button stays disabled for a further 2.2 seconds with a "New code generated" confirmation label before returning to normal, giving the user time to notice their old code just changed before they could accidentally tap regenerate again and invalidate the one they just got.

**Copy button with the same clipboard fallback pattern as any code field**

\`copyCode()\` tries \`navigator.clipboard.writeText()\` first and falls back to a hidden \`<textarea>\` plus \`document.execCommand('copy')\` when the async Clipboard API isn't available, keeping the button usable across the wide range of devices and browsers a delivery-pickup notification link might be opened in — an in-app webview, an older Android browser, or a non-HTTPS staging link.

**The swap transition avoids a jarring instant digit-flip**

\`swapCode()\` adds a \`.swap\` class that fades and lifts the code out over 220ms before the text content actually changes underneath, then removes the class so the new digits fade back in. Instantly replacing six digits with six different digits reads as a glitch; the brief fade communicates "this value just changed" the same way the incident widget's row-removal transition does.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the countdown', text: 'The expiry timer ticks down every second and the progress bar and text turn urgent-red under four hours remaining.' },
        { title: 'Click Copy', text: 'Copies the current six-digit code to the clipboard, showing a brief "Copied!" confirmation on the button.' },
        { title: 'Click "Generate new code"', text: 'Simulates requesting a fresh code from the locker network — the old code fades out and a new one fades in, and the timer resets to a full window.' },
        { title: 'Replace the locker and code values', text: 'Update the station name, locker number in the HTML, and the initial code passed to formatCode() and copyBtn.dataset.value in the JS.' },
        { title: 'Wire to a real pickup API', text: 'Replace randomCode() with a fetch call to your locker network\'s code-issuance endpoint, and set remaining from the real expiry timestamp it returns.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Live countdown timer with progress bar that recolors from indigo to amber-red under a configurable urgency threshold',
      'Six-digit code displayed large, monospaced, and digit-spaced for easy keypad entry',
      'Copy-to-clipboard with async Clipboard API and hidden-textarea execCommand fallback',
      'Regenerate action with a simulated request delay and a post-swap cooldown to prevent accidental double-regeneration',
      'Fade-and-swap transition when the code changes instead of an instant jarring digit-flip',
      'Expired state disables the countdown text and re-enables the regenerate button automatically',
      'Helper note text updates after regeneration to confirm the old code no longer works',
      'Compact card suited to a push notification landing page or delivery-app pickup screen',
    ],
    useCases: [
      { icon: 'APP', title: 'Delivery and parcel locker apps', desc: 'The core use case — surface this after a delivery notification so a customer can retrieve a package without digging through email for the original confirmation.' },
      { icon: 'FLOW', title: 'Grocery and click-and-collect pickup', desc: 'Show a pickup code for a curbside or in-store locker order alongside the [Delivery ETA Card](/ui-snippets/delivery-eta-card/) for the full order-to-pickup journey.' },
      { icon: 'FORM', title: 'Dry cleaning and laundry locker services', desc: 'Any unattended locker-based pickup service — laundry, key exchange, equipment rental — can reuse the same countdown-and-code pattern.' },
      { icon: 'DESIGN', title: 'Campus and coworking parcel rooms', desc: 'University mailrooms and coworking spaces increasingly use smart lockers for resident and member deliveries; this card fits their pickup-notification email or app screen.' },
      { icon: 'CODE', title: 'Learn urgency-threshold styling', desc: 'A clean example of a countdown that stays visually calm most of the time and only escalates its color once a real deadline threshold is crossed.' },
      { icon: 'ACCESS', title: 'Fallback-safe clipboard copy', desc: 'Demonstrates the standard pattern of trying the modern async Clipboard API first and degrading gracefully to execCommand for older or restricted browser contexts.' },
    ],
    faqs: [
      { q: 'How does the countdown turn red before it expires?', a: 'updateExpiry() checks whether remaining is under four hours (3600 * 4 seconds) and, if so, adds an .urgent class to both the progress bar fill and the countdown text, which swaps their colors from indigo/gray to an amber-to-red gradient and solid red respectively.' },
      { q: 'Is the regenerated code cryptographically secure?', a: 'randomCode() uses Math.random() for demo purposes, which is not cryptographically secure. In production, the code should be generated server-side using a secure random source and returned to the client via your locker network\'s API rather than generated in the browser.' },
      { q: 'Why does the regenerate button stay disabled after generating a new code?', a: 'canRegen and the disabled attribute stay set for about 2.2 seconds after the new code appears, giving the user a moment to register that their old code just changed before they could tap regenerate again and invalidate the code they just received.' },
      { q: 'What happens when the countdown reaches zero?', a: 'The countdown text switches to an "expired" message and the regenerate button is explicitly re-enabled (in case it was mid-cooldown), since the only useful action left once a code expires is requesting a fresh one.' },
      { q: 'Why is the code displayed with spaces between digits?', a: 'formatCode() joins the six digits with spaces to make the code easier to read digit-by-digit while typing it into a physical locker keypad, rather than trying to parse a run of six unspaced characters at a glance.' },
      { q: 'How do I connect this to a real locker network API?', a: 'Replace randomCode() with a fetch() call to your provider\'s code-issuance endpoint, set remaining from the real expiresAt timestamp the API returns (converted to seconds from now), and update the station and locker number text from the same response.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the countdown's urgency threshold works and why it recolors at four hours specifically rather than at the final few minutes. The same assistant can help optimize it — for instance asking whether the setInterval-based countdown should instead compute remaining time from a fixed expiry timestamp (Date.now() based) to avoid any drift on a tab left open for hours. It's also useful for extending the card: ask it to add a QR code alongside the digit code for locker screens with a camera, support multiple pending packages in one card, or persist the countdown across a page refresh using localStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "parcel locker pickup code" card in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- Display a large, digit-spaced six-digit pickup code alongside a station name and locker number, plus a "Copy" button that copies just the raw digits (no spaces) to the clipboard using the async Clipboard API with a fallback to a hidden textarea and execCommand for browsers without it, showing a brief inline "Copied!" confirmation that reverts after roughly a second and a half.
- Implement a live countdown timer (ticking at least once per second) showing hours, minutes, and seconds remaining until the code expires, backed by a horizontal progress bar whose fill width shrinks in proportion to time remaining.
- Once remaining time drops below a configurable urgency threshold (for example four hours), both the progress bar and the countdown text must visually switch to a distinct "urgent" color scheme, and switch back if the countdown is reset above the threshold.
- Add a "Generate new code" button that, on click, disables itself and shows a brief loading label, then after a short simulated delay replaces the currently displayed code with a newly generated six-digit code using a fade-out/fade-in transition (not an instant text swap), resets the countdown to its full duration, and stays disabled for a couple of seconds afterward before becoming clickable again, so the button cannot be clicked twice in a row before the previous request would realistically complete.
- When the countdown reaches zero, switch the countdown text to an "expired" message and make sure the regenerate button is enabled so the user's only remaining action is requesting a new code.`,
    },
  },
};

export default lockerPickupCodeCard;
