const clipboardPasteButton = {
  id: 'clipboard-paste-button',
  title: 'Clipboard Paste Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="cpb-wrap">
  <span class="cpb-tag">navigator.clipboard · read &amp; write</span>
  <h1>Clipboard field</h1>
  <p id="cpbStatus">Type, paste, or use the buttons below — the input always stays editable.</p>

  <div class="cpb-card">
    <label class="cpb-label" for="cpbInput">Tracking number</label>
    <input class="cpb-input" id="cpbInput" type="text" placeholder="Paste or type a value…" />
    <div class="cpb-actions">
      <button class="cpb-btn" id="cpbPasteBtn">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/></svg>
        Paste from clipboard
      </button>
      <button class="cpb-btn primary" id="cpbCopyBtn">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
        <span id="cpbCopyLabel">Copy</span>
      </button>
    </div>
  </div>

  <p class="cpb-note">Clipboard read/write requires a secure context and often a permission grant — inside a sandboxed preview iframe it is frequently denied. When that happens the field stays fully usable; you just select and copy/paste by hand instead.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1e1a2e,#08070f 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.cpb-wrap{width:100%;max-width:440px;text-align:center}
.cpb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c4b5fd;background:rgba(196,181,253,.1);border:1px solid rgba(196,181,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.cpb-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.cpb-wrap p{font-size:13.5px;color:#a89dc2;margin-top:8px;line-height:1.6}
.cpb-card{margin-top:22px;border-radius:16px;border:1px solid rgba(196,181,253,.18);background:#120f1e;padding:20px;text-align:left}
.cpb-label{display:block;font-size:11.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#8f80b3;margin-bottom:8px}
.cpb-input{width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font:14px system-ui;outline:none;transition:border-color .15s}
.cpb-input:focus{border-color:#c4b5fd}
.cpb-actions{display:flex;gap:10px;margin-top:14px}
.cpb-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:11px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e8e2f5;font:600 12.5px system-ui;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}
.cpb-btn:hover{background:rgba(255,255,255,.09)}
.cpb-btn:active{transform:scale(.97)}
.cpb-btn.primary{background:linear-gradient(135deg,#c084fc,#818cf8);border-color:transparent;color:#1a0f2e;font-weight:700}
.cpb-btn.copied{background:rgba(74,222,128,.16);border-color:rgba(74,222,128,.4);color:#86efac}
.cpb-note{font-size:11.5px;color:#5d5474;max-width:420px;margin:16px auto 0;line-height:1.6}
.cpb-inline-msg{font-size:12px;color:#fca5a5;margin-top:10px;text-align:left;display:none}
.cpb-inline-msg.show{display:block}`,

  js: `var statusEl = document.getElementById("cpbStatus");
var input = document.getElementById("cpbInput");
var pasteBtn = document.getElementById("cpbPasteBtn");
var copyBtn = document.getElementById("cpbCopyBtn");
var copyLabel = document.getElementById("cpbCopyLabel");

var msgEl = document.createElement("p");
msgEl.className = "cpb-inline-msg";
document.querySelector(".cpb-card").appendChild(msgEl);

function showInlineMessage(text) {
  msgEl.textContent = text;
  msgEl.classList.add("show");
}

function clearInlineMessage() {
  msgEl.classList.remove("show");
}

async function pasteFromClipboard() {
  clearInlineMessage();

  if (!navigator.clipboard || !navigator.clipboard.readText) {
    // Unsupported browser, or (very common) the "clipboard-read" permission
    // isn't exposed at all in this context — the input stays editable, the
    // viewer just has to paste with a keyboard shortcut or right-click instead.
    showInlineMessage("Clipboard read isn\\u2019t available here \\u2014 use Ctrl/Cmd+V in the field instead.");
    input.focus();
    return;
  }

  try {
    statusEl.textContent = "Requesting clipboard access\\u2026";
    var text = await navigator.clipboard.readText();
    input.value = text;
    input.focus();
    statusEl.textContent = "Pasted from clipboard.";
  } catch (err) {
    // NotAllowedError (denied or blocked by permissions policy), or the
    // read simply isn\\u2019t permitted in this sandboxed context.
    showInlineMessage("Clipboard permission was denied or blocked (" + (err && err.name ? err.name : "blocked") + ") \\u2014 the field is still editable, paste manually with Ctrl/Cmd+V.");
    statusEl.textContent = "Couldn\\u2019t read the clipboard automatically.";
    input.focus();
  }
}

function manualCopyFallback(text) {
  var temp = document.createElement("textarea");
  temp.value = text;
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.focus();
  temp.select();
  var ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  document.body.removeChild(temp);
  return ok;
}

function flashCopied() {
  copyBtn.classList.add("copied");
  copyLabel.textContent = "Copied!";
  setTimeout(function () {
    copyBtn.classList.remove("copied");
    copyLabel.textContent = "Copy";
  }, 1800);
}

async function copyToClipboard() {
  clearInlineMessage();
  var text = input.value;

  if (!text) {
    showInlineMessage("Nothing to copy yet \\u2014 type or paste a value first.");
    input.focus();
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Copied to clipboard.";
      flashCopied();
      return;
    } catch (err) {
      // Fall through to the manual fallback below.
    }
  }

  if (manualCopyFallback(text)) {
    statusEl.textContent = "Copied to clipboard.";
    flashCopied();
  } else {
    showInlineMessage("Automatic copy isn\\u2019t available \\u2014 select the field\\u2019s text and copy manually with Ctrl/Cmd+C.");
    input.select();
    statusEl.textContent = "Couldn\\u2019t copy automatically.";
  }
}

pasteBtn.addEventListener("click", pasteFromClipboard);
copyBtn.addEventListener("click", copyToClipboard);

input.addEventListener("paste", function () {
  clearInlineMessage();
  // A native browser paste (Ctrl/Cmd+V) always works even when the
  // programmatic Clipboard API is unavailable \\u2014 the field never depends
  // solely on the buttons above.
  setTimeout(function () { statusEl.textContent = "Pasted."; }, 0);
});`,

  seo: {
    title: 'Clipboard Paste Button — Free navigator.clipboard Read & Write',
    description: `A paste-from-clipboard and copy-to-clipboard input pair using navigator.clipboard.readText()/writeText(), with an honest permission-denied message and a field that stays manually usable. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Clipboard Paste Button — Read & Write With a Manually-Usable Fallback',
      description: `This snippet pairs a "Paste from clipboard" and a "Copy" button around a single text input, wired to the real \`navigator.clipboard\` API's \`readText()\` and \`writeText()\` methods. Clipboard access is a permission-gated capability — it needs a secure context, is often scoped to a user gesture, and is one of the APIs most commonly blocked entirely inside a sandboxed preview iframe — so the design goal here is that the input is a fully working text field regardless of whether the Clipboard API cooperates.

**Reading the clipboard**

\`pasteFromClipboard()\` first checks \`navigator.clipboard && navigator.clipboard.readText\` exists, then calls it inside a \`try/catch\`. On success, the resolved string fills the input directly. On a rejection — almost always a \`NotAllowedError\` from a denied permission prompt or a blocked \`clipboard-read\` permissions policy — an inline message appears explaining exactly that, and directs the viewer to the keyboard shortcut instead. The input is never disabled; a real \`Ctrl/Cmd+V\` paste always works independent of the button, because that's a native browser behavior the Clipboard API doesn't gate.

**Writing the clipboard**

\`copyToClipboard()\` mirrors the same shape: try \`navigator.clipboard.writeText()\` first, and if it's unavailable or throws, fall back to the classic technique of selecting a temporary off-screen \`<textarea>\` and calling \`document.execCommand('copy')\`. Only if that also fails does the UI ask the viewer to select the field and copy manually — and even then, it calls \`input.select()\` for them so the manual step is one keystroke, not a hunt.

**Inline, not silent, failure**

Every failure path writes a specific, visible sentence into an inline message element rather than failing silently or logging to the console. That's the same honesty principle behind this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet, which names the exact \`getUserMedia\` error rather than just switching modes quietly — a viewer should always be able to tell why a permission-gated demo is behaving the way it is.

**A field that never breaks**

Because the \`<input>\` is a normal, always-editable form control, none of this matters to someone who simply types their value in or uses their OS's native copy/paste shortcuts. The Clipboard API only ever adds convenience buttons on top of a baseline that already works — which is the right way to layer a flaky permission-gated capability onto a form. Pair it with a plain [copy button](/ui-snippets/copy-button/) for a simpler one-directional case, or a [Web Share button](/ui-snippets/web-share-button/) for sharing instead of copying.

**Customizing it**

Swap the input for a textarea to paste larger blocks, add a "clear" button, or validate the pasted value (e.g. a tracking-number format) before accepting it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A labeled input with Paste and Copy buttons renders.` },
      { title: 'Click "Paste from clipboard"', text: `The browser may prompt; on approval the field fills in.` },
      { title: 'Click "Copy"', text: `The field's value copies; the button confirms with a checkmark.` },
      { title: 'Deny or lack clipboard permission', text: `An inline message explains it, and the field stays editable.` },
      { title: 'Use Ctrl/Cmd+V directly', text: `Native browser paste always works regardless of the API.` },
      { title: 'Type a value manually', text: `The whole flow degrades to a plain, functional text input.` },
    ] },
    features: [
      { title: 'Real clipboard read', text: `navigator.clipboard.readText() fills the input directly.` },
      { title: 'Real clipboard write', text: `writeText() copies the current field value.` },
      { title: 'execCommand fallback', text: `Legacy copy path if the Clipboard API write fails.` },
      { title: 'Specific inline errors', text: `Names the exact reason a permission was denied.` },
      { title: 'Always-editable input', text: `Manual typing and native Ctrl/Cmd+V work regardless.` },
      { title: 'Auto-select on manual fallback', text: `input.select() makes the manual copy step one keystroke.` },
      { title: 'Copied confirmation state', text: `A checkmark-style label confirms a successful copy.` },
      { title: 'Empty-value guard', text: `Copy is blocked with a message if there's nothing to copy.` },
    ],
    useCases: [
      { title: 'Tracking number / code fields', text: `Let users paste an order or tracking ID quickly.` },
      { title: 'API key / token inputs', text: `Pair with a [copy button](/ui-snippets/copy-button/) for the generated value.` },
      { title: 'Referral link fields', text: `Combine with a [Web Share button](/ui-snippets/web-share-button/).` },
      { title: 'Support ticket forms', text: `Paste an error message or log line for triage.` },
      { title: 'Settings & config panels', text: `Copy a webhook URL or embed snippet reliably.` },
      { title: 'Dashboards', text: `Copy a filtered view link from a [status dashboard](/ui-snippets/status-dashboard/).` },
      { icon: 'CODE', title: 'Related: FAB Speed Dial Menu', desc: 'See the [FAB Speed Dial Menu](/ui-snippets/fab-speed-dial-menu/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "Why doesn't the Paste button fill the field automatically?", a: `navigator.clipboard.readText() is permission-gated: the browser may show a one-time prompt, and many contexts \— including sandboxed preview iframes like the one likely rendering this demo \— block the "clipboard-read" permission entirely via their permissions policy, so the call rejects immediately with no prompt at all. When that happens the field stays fully editable; you can always paste with Ctrl/Cmd+V or type the value directly.` },
      { q: "Is it safe for a page to read my clipboard automatically?", a: `No, and browsers enforce that: navigator.clipboard.readText() normally requires an explicit user gesture, like a click on the Paste button itself, and typically shows a permission prompt the first time a site requests it. A page cannot silently poll your clipboard in the background \— this snippet's Paste button only ever fires the request in direct response to a click.` },
      { q: "Why does Copy sometimes fall back to a different method?", a: `The modern navigator.clipboard.writeText() can be unavailable in older browsers or blocked by the same kind of permissions policy that affects reading. When that happens, the snippet falls back to the classic technique of selecting a temporary hidden textarea and calling document.execCommand('copy'), which has much broader legacy support. Only if that also fails does it ask you to select the field and copy manually \— and it pre-selects the text for you.` },
      { q: "Will this work inside a sandboxed preview iframe?", a: `The buttons may not \— many sandboxed iframes disable both clipboard-read and clipboard-write via their allow attribute or permissions policy header, which is the exact scenario this snippet is built to handle honestly. What always works regardless is typing directly into the field and using your browser's native Ctrl/Cmd+C and Ctrl/Cmd+V shortcuts, since those aren't gated by the JavaScript Clipboard API at all.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Bind the input's value to component state, and call the same readText()/writeText() logic from your click handlers, updating state instead of touching the DOM directly. Keep the inline error message and the "Copied!" confirmation as pieces of local state with a setTimeout reset, and make sure the input remains a fully controlled-or-uncontrolled field that works independent of whether the Clipboard API calls succeed.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain the layered fallback design: why the Paste button checks for navigator.clipboard.readText before calling it, why a denied or blocked read shows a specific inline message rather than disabling the input, and why the Copy button tries the modern writeText() API before falling back to the older execCommand('copy') technique on a temporary hidden textarea. It's a useful prompt for reasoning about permission-gated browser APIs generally \— ask why these calls typically require both a secure context (HTTPS) and a direct user gesture, and why a sandboxed iframe (like the one likely rendering this demo) so often blocks them by default via its permissions policy. For extensions, ask it to add clipboard-format detection (e.g. only accept pasted text matching a pattern), a textarea variant for multi-line content, or a toast-style confirmation instead of the inline button state change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Clipboard Paste Button" widget in plain HTML, CSS, and JavaScript \— no libraries.

Requirements:
- A single text input alongside a "Paste from clipboard" button and a "Copy" button.
- The Paste button should check that navigator.clipboard and navigator.clipboard.readText exist before calling it, wrap the call in a try/catch, and on success set the input's value to the resolved text and focus the input.
- The Copy button should read the input's current value, guard against copying an empty string, and try navigator.clipboard.writeText() first; if the Clipboard API is unavailable or the call throws, fall back to creating a temporary off-screen textarea, selecting its content, and calling the legacy document.execCommand('copy'); show a brief "Copied!" confirmation state on the button (e.g. swapping its label and adding a success style for about two seconds) when either method succeeds.
- CRITICAL: on any clipboard permission denial or unsupported-browser case (a common and expected outcome, since this snippet may render inside a sandboxed preview iframe that blocks clipboard-read/clipboard-write via its permissions policy), show a specific inline message explaining what happened and that the field can still be used manually \— never disable the input. If the copy fallback chain fully fails, select the input's text for the user so a manual Ctrl/Cmd+C is a single keystroke.
- Make sure a native browser paste (Ctrl/Cmd+V) into the input always works regardless of whether the Paste button's programmatic clipboard read succeeds, since that's a separate, ungated browser behavior the demo should not interfere with.`,
    },
  },
};

export default clipboardPasteButton;
