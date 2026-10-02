const uuidV4Generator = {
  id: 'uuid-v4-generator',
  title: 'UUID v4 Generator',
  lastmod: '2026-09-05',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="uvg-card">
  <div class="uvg-head">
    <h2>UUID v4 Generator</h2>
    <p>RFC-4122 version 4 UUIDs generated with a cryptographically secure random source.</p>
  </div>

  <div class="uvg-main-row">
    <code id="uvgMainUuid">…</code>
    <button class="uvg-copy" id="uvgMainCopy" type="button">Copy</button>
  </div>

  <div class="uvg-actions">
    <button class="uvg-btn uvg-btn-primary" id="uvgGenOne" type="button">Generate new UUID</button>
    <button class="uvg-btn" id="uvgGenTen" type="button">Generate 10</button>
  </div>

  <ul class="uvg-batch" id="uvgBatch"></ul>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.uvg-card{font-family:system-ui,-apple-system,sans-serif;background:#12141f;color:#e7e9f5;border:1px solid #262a3d;border-radius:16px;padding:26px;max-width:480px;width:100%}
.uvg-head h2{margin:0 0 6px;font-size:19px}
.uvg-head p{margin:0 0 18px;font-size:13px;color:#9096b3;line-height:1.5}
.uvg-main-row{display:flex;align-items:center;gap:10px;background:#0e1019;border:1px solid #262a3d;border-radius:10px;padding:14px;margin-bottom:14px}
.uvg-main-row code{flex:1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14.5px;color:#7dffb0;word-break:break-all}
.uvg-copy{flex-shrink:0;background:#20243a;border:1px solid #333955;color:#dfe2f6;font-size:11.5px;font-weight:600;padding:6px 11px;border-radius:7px;cursor:pointer}
.uvg-copy:hover{background:#282d47}
.uvg-actions{display:flex;gap:10px;margin-bottom:14px}
.uvg-btn{flex:1;background:#181b2a;border:1px solid #262a3d;color:#e7e9f5;font-size:13px;font-weight:600;padding:10px;border-radius:9px;cursor:pointer}
.uvg-btn:hover{background:#20233a}
.uvg-btn-primary{background:#6366f1;border-color:#6366f1;color:#fff}
.uvg-btn-primary:hover{background:#4f52e0}
.uvg-batch{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;max-height:220px;overflow-y:auto}
.uvg-batch li{display:flex;align-items:center;gap:8px;background:#181b2a;border:1px solid #262a3d;border-radius:8px;padding:8px 10px}
.uvg-batch code{flex:1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;color:#c7cae6;word-break:break-all}
.uvg-batch button{flex-shrink:0;background:#20243a;border:1px solid #333955;color:#dfe2f6;font-size:10px;font-weight:600;padding:4px 8px;border-radius:6px;cursor:pointer}
.uvg-batch button:hover{background:#282d47}`,

  js: `// Generates an RFC-4122 version 4 UUID using crypto.getRandomValues, not
// Math.random, so the randomness backing each UUID is cryptographically secure.
function generateUuidV4() {
  var bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set version bits: the 4 most significant bits of byte 6 become 0100 (version 4).
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant bits: the 2 most significant bits of byte 8 become 10 (RFC 4122 variant).
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  var hex = [];
  for (var i = 0; i < 256; i++) hex.push(i.toString(16).padStart(2, '0'));

  var parts = [];
  for (var j = 0; j < bytes.length; j++) parts.push(hex[bytes[j]]);

  return (
    parts[0] + parts[1] + parts[2] + parts[3] + '-' +
    parts[4] + parts[5] + '-' +
    parts[6] + parts[7] + '-' +
    parts[8] + parts[9] + '-' +
    parts[10] + parts[11] + parts[12] + parts[13] + parts[14] + parts[15]
  );
}

var mainUuidEl = document.getElementById('uvgMainUuid');
var mainCopyBtn = document.getElementById('uvgMainCopy');
var batchList = document.getElementById('uvgBatch');

function setMainUuid() {
  mainUuidEl.textContent = generateUuidV4();
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(function () {
    var original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(function () { btn.textContent = original; }, 1200);
  });
}

mainCopyBtn.addEventListener('click', function () {
  copyText(mainUuidEl.textContent, mainCopyBtn);
});

document.getElementById('uvgGenOne').addEventListener('click', setMainUuid);

document.getElementById('uvgGenTen').addEventListener('click', function () {
  batchList.innerHTML = '';
  for (var i = 0; i < 10; i++) {
    var uuid = generateUuidV4();
    var li = document.createElement('li');
    var code = document.createElement('code');
    code.textContent = uuid;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      copyText(this.previousElementSibling.textContent, this);
    });
    li.appendChild(code);
    li.appendChild(btn);
    batchList.appendChild(li);
  }
});

setMainUuid();`,

  seo: {
    title: 'UUID v4 Generator — Free HTML CSS JS Snippet',
    description: `Generates RFC-4122 version 4 UUIDs using crypto.getRandomValues with correct version and variant bit-setting, plus batch generation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'UUID v4 Generator — Cryptographically Random RFC-4122 UUIDs',
      description: `This snippet generates version 4 UUIDs that follow the RFC-4122 specification exactly, sourcing every random bit from \`crypto.getRandomValues\` rather than \`Math.random\`, which is not suitable for identifiers that must avoid collisions or be unpredictable.\n\n**Correct bit-setting**\n\nAfter filling a 16-byte \`Uint8Array\` with secure random values, the function overwrites the top nibble of byte 6 to \`0100\` to mark the UUID as version 4, and the top two bits of byte 8 to \`10\` to mark the RFC-4122 variant — exactly as the spec requires, so the output is a spec-compliant v4 UUID rather than just a random-looking string.\n\n**Formatting**\n\nEach byte is converted to its two-character hex representation and the 16 hex pairs are joined into the standard \`8-4-4-4-12\` UUID layout with hyphens inserted at the correct positions.\n\n**Single and batch generation**\n\nThe main panel shows one large UUID with its own copy button, refreshed by "Generate new UUID". The "Generate 10" button produces a scrollable list of ten fresh UUIDs, each with an individual copy button built dynamically with \`document.createElement\`.`,
    },
    features: [
      'Generates UUIDs with crypto.getRandomValues, never Math.random',
      'Correct RFC-4122 version 4 and variant bit-setting on the raw bytes',
      'Single large UUID display with its own copy button',
      'Batch mode generates 10 UUIDs at once, each independently copyable',
      'Standard 8-4-4-4-12 hyphenated formatting',
      'Clipboard copy via navigator.clipboard.writeText with button feedback',
      'Scrollable batch list for generating larger sets without layout breakage',
      'Zero dependencies — pure Web Crypto and DOM APIs',
    ],
    useCases: [
      { icon: '🗄️', title: 'Database seeding', desc: 'Generate primary-key UUIDs for test data, with batch mode producing ten at once, each independently copyable.' },
      { icon: '🧪', title: 'API testing utilities', desc: 'Produce unique request or resource identifiers while testing an API, each one created from secure random bytes rather than a predictable counter.' },
      { icon: '🧰', title: 'Standalone developer utility sites', desc: 'Offer a dependable standalone UUID generator page for developers, with one large display and its own copy button for quick use.' },
      { icon: '🎓', title: 'RFC-4122 teaching', desc: 'Show exactly how the version and variant bits are set on raw bytes to turn random data into a valid version 4 UUID.' },
    ],
    faqs: [
      { q: 'Why use crypto.getRandomValues instead of Math.random?', a: 'Math.random is not guaranteed to be cryptographically secure and can be predictable, which is unsuitable for identifiers meant to be globally unique and non-guessable; crypto.getRandomValues uses the operating system\'s secure random source.' },
      { q: 'What makes this a valid version 4 UUID?', a: 'The generator explicitly sets the four version bits in byte 6 to 0100 and the two variant bits in byte 8 to 10, exactly as RFC-4122 requires, rather than relying on the raw random bytes to happen to look right.' },
      { q: 'How likely is a collision?', a: 'With 122 random bits of entropy, the probability of two v4 UUIDs colliding is astronomically small even across billions of generated values.' },
    ],
  },
};

export default uuidV4Generator;
