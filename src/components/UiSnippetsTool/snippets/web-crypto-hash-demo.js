const webCryptoHashDemo = {
  id: 'web-crypto-hash-demo',
  title: 'Web Crypto Hash Demo',
  lastmod: '2026-08-22',
  category: 'tools',
  cdnUrls: [],
  html: `<section class="wch-wrap">
  <span class="wch-tag">crypto.subtle.digest</span>
  <h1>Live text hasher</h1>
  <p id="wchStatus">Type below — the digest updates live using the real Web Crypto API.</p>

  <div class="wch-field">
    <label for="wchInput">Text to hash</label>
    <textarea id="wchInput" rows="3" placeholder="Type or paste anything…">The quick brown fox jumps over the lazy dog</textarea>
  </div>

  <div class="wch-algos" id="wchAlgos">
    <button class="wch-algo-btn active" data-algo="SHA-256" type="button">SHA-256</button>
    <button class="wch-algo-btn" data-algo="SHA-384" type="button">SHA-384</button>
    <button class="wch-algo-btn" data-algo="SHA-512" type="button">SHA-512</button>
    <button class="wch-algo-btn" data-algo="SHA-1" type="button">SHA-1</button>
  </div>

  <div class="wch-output">
    <div class="wch-output-head">
      <span id="wchAlgoLabel">SHA-256 digest</span>
      <button class="wch-copy" id="wchCopy" type="button">Copy</button>
    </div>
    <code id="wchHex">—</code>
  </div>

  <p class="wch-note" id="wchNote">Every keystroke is hashed on your device with crypto.subtle — nothing is sent anywhere.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0f2418,#04100a 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.wch-wrap{width:100%;max-width:520px}
.wch-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6ee7b7;background:rgba(110,231,183,.1);border:1px solid rgba(110,231,183,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.wch-wrap h1{font-size:clamp(26px,6vw,34px);font-weight:800;letter-spacing:-.03em}
.wch-wrap>p{font-size:13.5px;color:#a3b5ac;margin-top:8px;line-height:1.6}
.wch-field{margin:20px 0 14px}
.wch-field label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#8ea89a;margin-bottom:7px}
.wch-field textarea{width:100%;resize:vertical;min-height:70px;padding:12px 14px;border-radius:11px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font:14px/1.5 system-ui}
.wch-field textarea:focus{outline:none;border-color:#6ee7b7}
.wch-algos{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.wch-algo-btn{padding:9px 16px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#c8d6ce;font:700 12.5px system-ui;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
.wch-algo-btn:hover{background:rgba(255,255,255,.09)}
.wch-algo-btn.active{background:linear-gradient(135deg,#34d399,#10b981);border-color:transparent;color:#052e1c}
.wch-output{border-radius:12px;background:rgba(0,0,0,.35);border:1px solid rgba(110,231,183,.22);padding:14px 16px;margin-bottom:12px}
.wch-output-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
.wch-output-head span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6ee7b7}
.wch-copy{padding:6px 12px;border-radius:7px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8ecf5;font:600 11.5px system-ui;cursor:pointer}
.wch-copy:hover{background:rgba(255,255,255,.11)}
.wch-output code{display:block;word-break:break-all;font-family:'SFMono-Regular',Consolas,monospace;font-size:12.5px;line-height:1.7;color:#a7f3d0}
.wch-note{font-size:11.5px;color:#6c8577;line-height:1.6}`,

  js: `var inputEl = document.getElementById('wchInput');
var hexEl = document.getElementById('wchHex');
var algoLabelEl = document.getElementById('wchAlgoLabel');
var statusEl = document.getElementById('wchStatus');
var noteEl = document.getElementById('wchNote');
var copyBtn = document.getElementById('wchCopy');
var algoButtons = document.querySelectorAll('.wch-algo-btn');

var currentAlgo = 'SHA-256';
var debounceTimer = null;

// Real Web Crypto support check. crypto.subtle only exists in a secure
// context (https:// or localhost) -- on a plain http:// origin the
// "subtle" property is simply absent even in modern browsers.
var supported = !!(window.crypto && window.crypto.subtle && window.crypto.subtle.digest);

// Convert a hash ArrayBuffer to a lowercase hex string. This is the
// textbook-correct pattern: view the buffer as bytes, map each byte to a
// zero-padded 2-digit hex string, and join with no separator.
function bufferToHex(buffer) {
  var bytes = new Uint8Array(buffer);
  var hex = new Array(bytes.length);
  for (var i = 0; i < bytes.length; i++) {
    hex[i] = bytes[i].toString(16).padStart(2, '0');
  }
  return hex.join('');
}

async function computeHash() {
  if (!supported) return;
  var text = inputEl.value;
  var encoder = new TextEncoder();
  var data = encoder.encode(text);
  try {
    var digestBuffer = await window.crypto.subtle.digest(currentAlgo, data);
    hexEl.textContent = text.length ? bufferToHex(digestBuffer) : '—';
    statusEl.textContent = text.length
      ? 'Digest updates on every keystroke — computed entirely on your device.'
      : 'Type something to see its digest.';
  } catch (err) {
    hexEl.textContent = '—';
    statusEl.textContent = 'Hashing failed (' + (err && err.name ? err.name : 'error') + ').';
  }
}

function scheduleHash() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(computeHash, 150);
}

function setAlgo(algo, btn) {
  currentAlgo = algo;
  algoButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
  algoLabelEl.textContent = algo + ' digest';
  scheduleHash();
}

algoButtons.forEach(function (btn) {
  btn.addEventListener('click', function () { setAlgo(btn.dataset.algo, btn); });
});

inputEl.addEventListener('input', scheduleHash);

copyBtn.addEventListener('click', function () {
  var text = hexEl.textContent;
  if (text === '—' || !navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(function () {
    copyBtn.textContent = 'Copied!';
    setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1200);
  }).catch(function () {});
});

if (!supported) {
  // crypto.subtle requires a secure context. Rather than leave the demo
  // blank or throw on the first digest() call, disable input and explain
  // exactly why -- this is the one legitimately common way this very
  // broadly supported API can be unavailable.
  inputEl.disabled = true;
  algoButtons.forEach(function (b) { b.disabled = true; });
  hexEl.textContent = '—';
  statusEl.textContent = 'Web Crypto (crypto.subtle) is unavailable here — it requires a secure context (HTTPS or localhost). Serve this page over HTTPS to use the live hasher.';
  noteEl.textContent = 'This is not a browser-support gap (crypto.subtle.digest is supported in every modern browser) — it is a secure-context requirement.';
} else {
  computeHash();
}`,

  seo: {
    title: 'Web Crypto Hash Demo — Free SHA-256/384/512 Live Text Hasher',
    description: `A live text hasher using the real crypto.subtle.digest() Web Crypto API — SHA-256, SHA-384, SHA-512, or SHA-1, computed client-side on every keystroke. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Web Crypto Hash Demo — Real SHA-2 Digests Computed On Your Device',
      description: `This snippet is a genuine cryptographic hash tool, not a lookup table or a fake spinner: every keystroke runs the typed text through the browser's native \`crypto.subtle.digest()\`, and the hex string on screen is the actual digest — verifiable against any other SHA-256 implementation.

**The real call: crypto.subtle.digest()**

Text first goes through \`new TextEncoder().encode(text)\`, which turns the string into a UTF-8 \`Uint8Array\` — hashing always operates on bytes, not JavaScript's UTF-16 string representation. That byte array is passed to \`window.crypto.subtle.digest(algorithm, data)\`, an async method that returns a promise resolving to an \`ArrayBuffer\` containing the raw digest bytes (32 bytes for SHA-256, 48 for SHA-384, 64 for SHA-512, 20 for SHA-1).

**Correct ArrayBuffer-to-hex conversion**

The result is a raw \`ArrayBuffer\`, not a readable string, so \`bufferToHex()\` wraps it in a \`Uint8Array\` view, maps each byte through \`byte.toString(16).padStart(2, '0')\` to get a zero-padded two-character hex pair, and joins with no separator. This is the textbook-correct pattern for the job — the \`padStart\` matters because a byte like \`5\` (0x05) would otherwise render as a single hex digit \`5\` instead of \`05\`, silently shortening and corrupting the digest string. You can verify the output against any known test vector: hashing \`"The quick brown fox jumps over the lazy dog"\` (this demo's default text) with SHA-256 must produce \`d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592\`.

**Debounced, not throttled**

Every keystroke calls \`scheduleHash()\`, which clears any pending timer and sets a new 150ms one before actually hashing — so a fast typist only triggers one digest computation after they pause, not one per character. \`digest()\` is cheap for short strings, but debouncing keeps the UI from recomputing on every single keypress of a long paste.

**The one real caveat: secure contexts only**

Unlike the flaky, permission-gated APIs elsewhere in this library, \`crypto.subtle\` is broadly supported in every modern browser — but it is only exposed in a *secure context*: an HTTPS origin, or \`localhost\` during development. On a plain \`http://\` page, \`window.crypto.subtle\` is simply \`undefined\`. The code checks for that explicitly and disables the inputs with a message naming the actual requirement, rather than letting the first \`digest()\` call throw a confusing \`TypeError\`. Pair this with a [password generator](/ui-snippets/password-generator/) for a broader "client-side crypto toolkit" page, or a [password strength](/ui-snippets/password-strength/) meter.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The default text hashes immediately with SHA-256.` },
      { title: 'Type or paste your own text', text: `The digest recomputes live, debounced by 150ms.` },
      { title: 'Switch algorithms', text: `Choose SHA-256, SHA-384, SHA-512, or SHA-1.` },
      { title: 'Copy the digest', text: `Click Copy to grab the current hex string.` },
      { title: 'Verify it', text: `Compare the output against any standard SHA implementation.` },
      { title: 'Served over http://?', text: `Inputs disable with an explanation — serve over HTTPS instead.` },
    ] },
    features: [
      { title: 'Real crypto.subtle.digest()', text: `Genuine SHA-2/SHA-1 digests, not a lookup or mock.` },
      { title: 'Correct hex conversion', text: `Byte-by-byte padStart(2,'0') mapping, verified against test vectors.` },
      { title: 'Four algorithms', text: `SHA-256, SHA-384, SHA-512, and SHA-1 selectable.` },
      { title: 'Debounced live updates', text: `One digest per pause, not per keystroke.` },
      { title: 'UTF-8 correct input', text: `TextEncoder converts strings to bytes before hashing.` },
      { title: 'Secure-context detection', text: `Explains the real crypto.subtle availability requirement.` },
      { title: 'One-click copy', text: `Copies the current digest with a confirmation state.` },
      { title: 'Zero dependencies', text: `No hashing library — the browser does the actual work.` },
    ],
    useCases: [
      { title: 'Developer security scratchpads', text: 'Hash text on every pause in typing using the genuine `crypto.subtle.digest()`, with SHA-256, SHA-384, SHA-512 and SHA-1 selectable.' },
      { title: 'File-integrity education', text: 'Teach how a checksum changes when a single character changes, with a byte-by-byte hex conversion verified against known test vectors.' },
      { title: 'Config checksum displays', text: 'Show a settings blob\'s hash so teams can confirm two environments hold identical data, using debounced updates to avoid per-keystroke work.' },
      { title: 'Webhook payload debugging', text: 'Manually compute a payload digest while debugging signature verification, pairing with a [password generator](/ui-snippets/password-generator/) for secret creation.' },
      { title: 'Avalanche effect lessons', text: 'Show students how tiny input changes produce completely different digests, computed client-side so nothing is sent anywhere.' },
    ],
    faqs: [
      { q: 'Is the hash actually computed, or is it a fake/simulated value?', a: `It's a real digest. The typed text is UTF-8 encoded with TextEncoder and passed to the browser's native window.crypto.subtle.digest(algorithm, data), which returns the actual cryptographic hash as an ArrayBuffer. You can verify it: hashing the default sample text "The quick brown fox jumps over the lazy dog" with SHA-256 produces d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592, matching any standard SHA-256 implementation.` },
      { q: 'How does the code convert the digest to a hex string correctly?', a: `digest() returns a raw ArrayBuffer, so the code wraps it in a Uint8Array, maps each byte through byte.toString(16).padStart(2, '0'), and joins the results with no separator. The padStart(2, '0') is essential -- without it, a byte value like 5 (hex 0x05) would render as a single character "5" instead of "05", silently truncating and corrupting the digest.` },
      { q: 'Why might crypto.subtle be unavailable even in a modern browser?', a: `crypto.subtle is only exposed in a secure context: an HTTPS origin or localhost during local development. On a plain http:// page (not localhost), window.crypto.subtle is undefined even in an up-to-date browser, since the Web Crypto API is deliberately restricted to secure contexts. The code checks for this and disables the inputs with an explanation rather than letting the first digest() call throw.` },
      { q: 'Why is the input debounced instead of hashing on every keystroke?', a: `digest() is genuinely cheap for short strings, but hashing on every single keypress during a fast paste or fast typing would still mean many redundant computations whose results are immediately discarded. A 150ms debounce (clearing and resetting a timer on each input event) collapses that into one digest call after the user actually pauses, which is smoother without adding noticeable lag.` },
      { q: 'How do I use this hasher in React, Vue, or Angular?', a: `Keep the input text and selected algorithm in component state, and in an effect (or watcher) debounce a call to window.crypto.subtle.digest(algorithm, new TextEncoder().encode(text)), converting the resulting ArrayBuffer to hex with the same byte-mapping loop. Because digest() is a promise, guard against a stale response landing after a newer one by tracking a request id or using an AbortController-style flag.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why TextEncoder is needed before hashing (rather than passing the raw JavaScript string) and why the ArrayBuffer-to-hex conversion requires padStart(2, '0') on each byte specifically. It's also a good way to sanity-check correctness — ask it to trace the default sample text through SHA-256 by hand or verify the expected digest against a known test vector, and to explain precisely why crypto.subtle exists only in secure contexts and what that means for local development versus production hosting. For extensions, ask it to add HMAC support via crypto.subtle.importKey and sign, add a file-upload mode that hashes a File's bytes instead of typed text, or add a visual "avalanche effect" demo showing how much the output changes for a one-character input change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Web Crypto hash demo" in plain HTML, CSS, and JavaScript using the real browser crypto.subtle.digest() API — no hashing libraries.

Requirements:
- A textarea for input text and a row of buttons to select the hash algorithm (SHA-256, SHA-384, SHA-512, SHA-1), with the currently selected algorithm visually highlighted.
- On input (debounced by roughly 150ms so it doesn't recompute on every single keystroke) and on algorithm change, encode the current text with new TextEncoder().encode(text) and pass the resulting bytes to await window.crypto.subtle.digest(algorithmName, data), which returns a Promise<ArrayBuffer> containing the raw digest.
- CRITICAL: convert the resulting ArrayBuffer to a lowercase hex string using the textbook-correct pattern -- wrap it in a Uint8Array, map each byte through byte.toString(16).padStart(2, '0') to get a zero-padded two-character hex pair, and join the array with no separator. Get this exactly right; padStart is required or single-digit hex bytes will corrupt the output. Verify your implementation would produce d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592 when SHA-256-hashing the text "The quick brown fox jumps over the lazy dog".
- Display the resulting hex digest in a monospace, word-broken output block labeled with the active algorithm, plus a "Copy" button using navigator.clipboard.writeText with a brief confirmation state.
- Handle the rare but real unsupported case: crypto.subtle is only available in a secure context (HTTPS or localhost), so check for its existence (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) before wiring up hashing. If unavailable, disable the inputs and show a status message explaining specifically that a secure context is required -- do not let an unguarded digest() call throw an unhandled error.`,
    },
  },
};

export default webCryptoHashDemo;
