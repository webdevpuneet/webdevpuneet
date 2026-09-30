const textHashGenerator = {
  id: 'text-hash-generator',
  title: 'Text Hash Generator',
  lastmod: '2026-09-05',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="thg-card">
  <div class="thg-head">
    <h2>Text Hash Generator</h2>
    <p>Type or paste text to compute SHA-1, SHA-256, and SHA-384 digests live.</p>
  </div>

  <textarea id="thgInput" rows="4" placeholder="Type something to hash…">The quick brown fox jumps over the lazy dog</textarea>

  <button class="thg-btn" id="thgHashBtn" type="button">Hash text</button>

  <div class="thg-results">
    <div class="thg-result-row">
      <div class="thg-result-head">
        <span class="thg-algo">SHA-1</span>
        <button class="thg-copy" data-target="thgOutSha1" type="button">Copy</button>
      </div>
      <code id="thgOutSha1">…</code>
    </div>
    <div class="thg-result-row">
      <div class="thg-result-head">
        <span class="thg-algo">SHA-256</span>
        <button class="thg-copy" data-target="thgOutSha256" type="button">Copy</button>
      </div>
      <code id="thgOutSha256">…</code>
    </div>
    <div class="thg-result-row">
      <div class="thg-result-head">
        <span class="thg-algo">SHA-384</span>
        <button class="thg-copy" data-target="thgOutSha384" type="button">Copy</button>
      </div>
      <code id="thgOutSha384">…</code>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.thg-card{font-family:system-ui,-apple-system,sans-serif;background:#12141f;color:#e7e9f5;border:1px solid #262a3d;border-radius:16px;padding:26px;max-width:480px;width:100%}
.thg-head h2{margin:0 0 6px;font-size:19px}
.thg-head p{margin:0 0 16px;font-size:13px;color:#9096b3;line-height:1.5}
#thgInput{width:100%;background:#0e1019;border:1px solid #262a3d;border-radius:10px;padding:12px;color:#e7e9f5;font-family:system-ui,sans-serif;font-size:13.5px;resize:vertical;margin-bottom:12px}
#thgInput:focus{outline:none;border-color:#6366f1}
.thg-btn{width:100%;background:#6366f1;border:none;color:#fff;font-size:13.5px;font-weight:700;padding:11px;border-radius:9px;cursor:pointer;margin-bottom:18px}
.thg-btn:hover{background:#4f52e0}
.thg-results{display:flex;flex-direction:column;gap:12px}
.thg-result-row{background:#181b2a;border:1px solid #262a3d;border-radius:10px;padding:12px}
.thg-result-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.thg-algo{font-size:11.5px;font-weight:700;color:#a5a9ff;text-transform:uppercase;letter-spacing:.04em}
.thg-copy{background:#20243a;border:1px solid #333955;color:#dfe2f6;font-size:10.5px;font-weight:600;padding:4px 9px;border-radius:6px;cursor:pointer}
.thg-copy:hover{background:#282d47}
.thg-result-row code{display:block;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;word-break:break-all;color:#c7cae6;line-height:1.5}`,

  js: `var algorithms = [
  { name: 'SHA-1', outputId: 'thgOutSha1' },
  { name: 'SHA-256', outputId: 'thgOutSha256' },
  { name: 'SHA-384', outputId: 'thgOutSha384' },
];

function bufferToHex(buffer) {
  var bytes = new Uint8Array(buffer);
  var hex = '';
  for (var i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0');
  return hex;
}

async function hashAll(text) {
  var encoder = new TextEncoder();
  var data = encoder.encode(text);
  for (var i = 0; i < algorithms.length; i++) {
    var algo = algorithms[i];
    var digest = await crypto.subtle.digest(algo.name, data);
    document.getElementById(algo.outputId).textContent = bufferToHex(digest);
  }
}

var input = document.getElementById('thgInput');
var hashBtn = document.getElementById('thgHashBtn');
var debounceTimer = null;

function scheduleHash() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function () { hashAll(input.value); }, 300);
}

input.addEventListener('input', scheduleHash);
hashBtn.addEventListener('click', function () { hashAll(input.value); });

document.querySelectorAll('.thg-copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var target = document.getElementById(btn.dataset.target);
    navigator.clipboard.writeText(target.textContent).then(function () {
      var original = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = original; }, 1200);
    });
  });
});

// Hash the pre-filled demo text on load.
hashAll(input.value);`,

  seo: {
    title: 'Text Hash Generator — Free HTML CSS JS Snippet',
    description: `A live text hashing tool that computes SHA-1, SHA-256, and SHA-384 digests with the Web Crypto API as you type. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Text Hash Generator — Live SHA-1, SHA-256 & SHA-384 Digests',
      description: `This snippet hashes arbitrary text into three digest algorithms at once — SHA-1, SHA-256, and SHA-384 — entirely in the browser using the native \`crypto.subtle.digest\` method, with no server round trip and no third-party hashing library.\n\n**How the hashing works**\n\nThe input string is first encoded into a byte array with \`TextEncoder\`, which \`crypto.subtle.digest\` accepts directly. The function loops over a small \`algorithms\` array, calling \`digest(algo.name, data)\` for each of \`'SHA-1'\`, \`'SHA-256'\`, and \`'SHA-384'\`, converting each resulting ArrayBuffer into a lowercase hex string with the shared \`bufferToHex\` helper.\n\n**Live and on-demand hashing**\n\nTyping in the textarea triggers a debounced re-hash (300ms after the last keystroke) so all three digests stay in sync with the input without recomputing on every keystroke, while the "Hash text" button forces an immediate recalculation.\n\n**Per-algorithm copy buttons**\n\nEach result row has its own small copy button that reads the corresponding \`<code>\` element's text and writes it to the clipboard via \`navigator.clipboard.writeText\`, with a short "Copied" label swap for feedback.`,
    },
    features: [
      'Computes SHA-1, SHA-256, and SHA-384 digests via crypto.subtle.digest',
      'Debounced live hashing as the user types, plus an explicit hash button',
      'Independent copy-to-clipboard button for each algorithm\'s result',
      'TextEncoder used to correctly convert strings to byte arrays before hashing',
      'Pre-filled demo text hashed automatically on load',
      'Monospace hex output for easy visual comparison',
      'Runs entirely client-side — no text ever leaves the browser',
      'Zero dependencies — pure Web Crypto and DOM APIs',
    ],
    useCases: [
      { icon: 'CODE', title: 'Developer utility pages', desc: 'Offer a quick multi-algorithm hash checker alongside other dev tools.' },
      { icon: 'LEARN', title: 'Cryptography teaching demos', desc: 'Show students how the same input produces different digests across algorithms.' },
      { icon: 'FORM', title: 'Data integrity checks', desc: 'Quickly hash a config string or short payload to compare across environments.' },
      { icon: 'APP', title: 'Internal QA tools', desc: 'Verify that two systems produce identical hashes for the same input text.' },
    ],
    faqs: [
      { q: 'Is SHA-1 safe to use here?', a: 'SHA-1 is included for compatibility and comparison purposes; it is cryptographically broken for collision resistance, so SHA-256 or SHA-384 should be preferred for any security-sensitive use.' },
      { q: 'Does the text get sent anywhere?', a: 'No. TextEncoder and crypto.subtle.digest both run locally in the browser, so the text never leaves the page.' },
      { q: 'Why does hashing wait after I stop typing?', a: 'A 300ms debounce avoids recomputing three digests on every keystroke, keeping the UI responsive while still feeling live.' },
    ],
  },
};

export default textHashGenerator;
