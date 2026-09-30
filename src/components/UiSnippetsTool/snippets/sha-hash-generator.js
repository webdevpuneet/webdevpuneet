const shaHashGenerator = {
  id: 'sha-hash-generator',
  title: 'SHA Hash Generator',
  category: 'dev',
  html: `<div class="wrap">
  <h2>SHA Hash Generator</h2>
  <p class="sub">Computes real cryptographic digests using the browser's Web Crypto API — nothing leaves the page.</p>

  <textarea id="text-input" spellcheck="false" placeholder="Type or paste text to hash...">The quick brown fox jumps over the lazy dog</textarea>

  <div class="rows" id="rows"></div>

  <div class="file-row">
    <label class="file-btn" for="file-input">Hash a file instead</label>
    <input type="file" id="file-input" hidden />
    <span id="file-name" class="file-name"></span>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; color: #e2e8f0; }

.wrap { max-width: 720px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
.sub { font-size: 12.5px; color: #94a3b8; margin-bottom: 16px; }

#text-input {
  width: 100%; min-height: 70px; resize: vertical; padding: 12px 14px;
  background: #1e293b; border: 1.5px solid #334155; border-radius: 10px;
  color: #e2e8f0; font-family: "SF Mono", Consolas, monospace; font-size: 13px; line-height: 1.6; margin-bottom: 16px;
}
#text-input:focus { outline: none; border-color: #6366f1; }

.rows { display: flex; flex-direction: column; gap: 10px; }
.row { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 12px 14px; }
.row-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.row-head .algo { font-size: 11.5px; font-weight: 800; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.04em; }
.row-head .bits { font-size: 10.5px; color: #64748b; }
.copy-btn { background: #0f172a; border: 1px solid #334155; color: #cbd5e1; font-size: 10.5px; font-weight: 700; padding: 4px 9px; border-radius: 6px; cursor: pointer; }
.copy-btn:hover { background: #334155; }
.copy-btn.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }
.hash-out { font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #86efac; word-break: break-all; line-height: 1.6; }

.file-row { margin-top: 16px; display: flex; align-items: center; gap: 10px; }
.file-btn { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 12px; font-weight: 700; padding: 8px 14px; border-radius: 8px; cursor: pointer; }
.file-btn:hover { background: #334155; }
.file-name { font-size: 11.5px; color: #94a3b8; }`,
  js: `const ALGOS = [
  { label: 'SHA-1', name: 'SHA-1' },
  { label: 'SHA-256', name: 'SHA-256' },
  { label: 'SHA-384', name: 'SHA-384' },
  { label: 'SHA-512', name: 'SHA-512' },
];

const textInput = document.getElementById('text-input');
const rows = document.getElementById('rows');
const fileInput = document.getElementById('file-input');
const fileName = document.getElementById('file-name');

const rowEls = {};

ALGOS.forEach((algo) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML =
    '<div class="row-head"><span class="algo">' + algo.label + '</span>' +
    '<button class="copy-btn" data-algo="' + algo.name + '">Copy</button></div>' +
    '<div class="hash-out" id="out-' + algo.name + '">computing...</div>';
  rows.appendChild(row);
  rowEls[algo.name] = row.querySelector('.hash-out');
});

function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

let requestId = 0;

async function computeAll(source) {
  const myRequest = ++requestId;
  const encoder = new TextEncoder();
  const data = typeof source === 'string' ? encoder.encode(source) : source;
  for (const algo of ALGOS) {
    try {
      const digest = await crypto.subtle.digest(algo.name, data);
      if (myRequest !== requestId) return;
      rowEls[algo.name].textContent = bufferToHex(digest);
    } catch (err) {
      if (myRequest !== requestId) return;
      rowEls[algo.name].textContent = 'unavailable in this context';
    }
  }
}

textInput.addEventListener('input', () => {
  fileName.textContent = '';
  computeAll(textInput.value);
});

fileInput.addEventListener('change', async () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  fileName.textContent = file.name + ' (' + file.size + ' bytes)';
  const buffer = await file.arrayBuffer();
  computeAll(buffer);
});

rows.addEventListener('click', (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const algo = btn.getAttribute('data-algo');
  const text = rowEls[algo].textContent;
  const finish = () => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(finish);
  } else {
    finish();
  }
});

computeAll(textInput.value);`,

  seo: {
    title: 'SHA Hash Generator — Free HTML CSS JS Snippet',
    description: 'Generate real SHA-1, SHA-256, SHA-384 and SHA-512 digests of text or files in the browser using the Web Crypto API, updated live with one-click copy. Exports to React, Vue & Tailwind.',
    about: {
      title: 'SHA Hash Generator — SHA-1, SHA-256, SHA-384 & SHA-512 via Web Crypto SubtleCrypto',
      description: `Checking a file's integrity or generating a quick fingerprint for a string usually means reaching for a command-line tool like \`shasum\` or \`openssl dgst\`. This snippet gets the same real cryptographic digests directly in the browser using \`crypto.subtle.digest\`, the SubtleCrypto interface built into every modern browser — no server round trip, no library, and no token or file content ever leaves the page.

**Four algorithms computed from the same input**

An \`ALGOS\` array lists the four digest algorithms SubtleCrypto supports natively — \`SHA-1\`, \`SHA-256\`, \`SHA-384\`, and \`SHA-512\` — and \`computeAll()\` runs the same \`ArrayBuffer\` through \`crypto.subtle.digest()\` once per algorithm, updating each row independently as its promise resolves. Notably, SubtleCrypto does not expose MD5 at all — it was deliberately excluded from the Web Crypto spec because MD5 is cryptographically broken, which is itself a useful thing for this tool to demonstrate by omission.

**Encoding text into bytes before hashing**

\`crypto.subtle.digest\` operates on raw bytes, not JavaScript strings, so any digest algorithm needs its input as an \`ArrayBuffer\` or typed array first. For text input, \`TextEncoder().encode(text)\` converts the string into a UTF-8 \`Uint8Array\` before it is handed to \`digest()\`. This is the same encoding step every server-side hashing library performs implicitly — making it explicit here is what makes the digests match \`shasum\` or Node's \`crypto.createHash\` output exactly for the same input text.

**Hashing a file directly**

The file input reads the selected file as raw bytes via \`file.arrayBuffer()\`, an async \`File\` API method, and passes that buffer straight into the same \`computeAll()\` function used for text — no re-encoding needed, since the file's bytes are already exactly what should be hashed. This lets the tool double as a quick file-integrity checker: hash a downloaded file locally and compare it against a publisher's published checksum without installing anything.

**Converting a digest buffer into a hex string**

\`crypto.subtle.digest()\` resolves to a raw \`ArrayBuffer\`, not a readable string. \`bufferToHex()\` wraps it in a \`Uint8Array\`, then converts each byte to a two-character hex pair with \`byte.toString(16).padStart(2, '0')\` — the \`padStart\` call matters because a byte value under 16 (like \`0x0a\`) would otherwise produce a single hex character and silently shift every following byte pair, corrupting the digest's readable representation.

**Avoiding stale results with a request counter**

Because typing triggers a new async \`digest()\` call on every keystroke and digests do not necessarily resolve in the order they were requested, a simple incrementing \`requestId\` closure variable is captured at the start of each \`computeAll()\` call. Before writing any result to the DOM, the code checks that the captured id still matches the latest \`requestId\` — if the user kept typing while an older digest was still computing, that stale result is silently discarded instead of overwriting a newer, correct one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type or paste text', text: 'All four hash digests recompute live on every keystroke using the Web Crypto API.' },
        { title: 'Read each digest', text: 'SHA-1, SHA-256, SHA-384, and SHA-512 hex digests are shown in separate rows, each computed independently.' },
        { title: 'Or hash a file', text: 'Click "Hash a file instead" to select a local file — its raw bytes are hashed directly, useful for verifying a download against a published checksum.' },
        { title: 'Copy a specific digest', text: 'Click Copy next to any algorithm row to copy just that hex string to your clipboard.' },
        { title: 'Compare against a known checksum', text: 'Paste the same input elsewhere and compare the generated hash character-for-character against a published value.' },
      ],
    },
    features: [
      'Real cryptographic digests via the native crypto.subtle.digest Web Crypto API, not a JS reimplementation',
      'Four algorithms computed in parallel: SHA-1, SHA-256, SHA-384, SHA-512',
      'Hash arbitrary text or a local file selected through a native file input',
      'File hashing reads raw bytes via File.arrayBuffer(), matching command-line tool output exactly',
      'Stale-result protection via a request counter so fast typing never shows an out-of-order digest',
      'Per-row Copy button with visual confirmation',
      'Zero dependencies — pure browser built-ins, nothing sent over the network',
      'Live recomputation on every keystroke, no submit button required',
    ],
    useCases: [
      { icon: 'CODE', title: 'Verifying a downloaded file\'s integrity', desc: 'Hash a downloaded installer or archive locally and compare the SHA-256 digest against the checksum published by the software vendor, without installing a CLI tool.' },
      { icon: 'LEARN', title: 'Teaching how cryptographic hashing works', desc: 'Change a single character in the input and show that the entire digest changes completely (the avalanche effect) — a fast, visual way to demonstrate why hashes detect tampering.' },
      { icon: 'APP', title: 'Generating a quick fingerprint for cache-busting', desc: 'Hash a config or asset\'s content to generate a short, deterministic fingerprint for a build pipeline or cache key, right from the browser during prototyping.' },
      { icon: 'FLOW', title: 'Sanity-checking a signature or webhook payload', desc: 'Independently hash a raw webhook body to compare against a signature header while debugging an integration, alongside a [webhook event tester](/ui-snippets/webhook-event-tester/).' },
      { icon: 'DASH', title: 'Internal developer tooling', desc: 'Pair with the [JWT Decoder & Inspector](/ui-snippets/jwt-decoder/) or [Base64 Playground](/ui-snippets/base64-playground/) in an internal dev-tools dashboard.' },
    ],
    faqs: [
      { q: 'Why is there no MD5 or SHA-224 option?', a: 'The Web Crypto SubtleCrypto specification only defines digest support for SHA-1, SHA-256, SHA-384, and SHA-512 — MD5 was deliberately left out of the browser standard because it is cryptographically broken and unsuitable for any security-sensitive use.' },
      { q: 'Will this produce the same hash as the shasum or openssl command-line tools?', a: 'Yes, for text input. The tool encodes the string to UTF-8 bytes with TextEncoder before hashing, which is the same encoding those command-line tools use by default, so the resulting hex digest matches exactly for identical input.' },
      { q: 'Is SHA-1 secure to use?', a: 'No — SHA-1 has known collision attacks and should not be used for security purposes like password storage or digital signatures. It is included here for compatibility checking and legacy verification only; prefer SHA-256 or SHA-512 for anything security-sensitive.' },
      { q: 'Does hashing a large file freeze the page?', a: 'crypto.subtle.digest() is asynchronous and returns a Promise, so the browser tab stays responsive while a large file hashes, though very large files can still take a few seconds depending on the algorithm and device.' },
      { q: 'Is my file or text uploaded anywhere?', a: 'No. Everything happens locally using the browser\'s built-in Web Crypto API — no network request is made, which is exactly why it is safe to hash sensitive local files with this tool.' },
      { q: 'Why do the hashes sometimes flicker while typing fast?', a: 'They should not overwrite each other out of order — a request counter discards any digest result that resolves after a newer one has already been requested, so only the result matching your latest input is ever shown.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain why crypto.subtle.digest needs a TextEncoder step for text input but not for file input, and why MD5 is intentionally absent from the Web Crypto API. It is also a good base to extend: ask for an HMAC mode using crypto.subtle.sign with a user-supplied secret key, a side-by-side "compare two hashes" mode for verifying a checksum against a pasted expected value, or drag-and-drop support for the file input.`,
      prompt: `Build a client-side SHA hash generator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where typed or pasted text is hashed live on every input event using the browser's native crypto.subtle.digest (Web Crypto SubtleCrypto API) — not a hand-rolled or bundled hashing implementation.
- Compute and display SHA-1, SHA-256, SHA-384, and SHA-512 digests simultaneously, each in its own labeled row, formatted as lowercase hex strings.
- Convert the input text to bytes using TextEncoder before hashing, and convert each resulting ArrayBuffer digest to a hex string manually (mapping each byte to a two-character, zero-padded hex pair) rather than using any third-party formatting helper.
- Also support hashing a local file selected via a native file input, reading its raw bytes with File.arrayBuffer() and running the same four algorithms against that buffer.
- Guard against out-of-order async results: since digest() is asynchronous and typing fires many requests quickly, only ever display the result of the most recently requested computation, discarding any stale one that resolves late.
- A Copy button next to each algorithm's digest using the Clipboard API with a brief visual confirmation.
- Do not implement MD5 — explain in a code comment that the Web Crypto API does not support it because it is cryptographically broken.`,
    },
  },
};

export default shaHashGenerator;
