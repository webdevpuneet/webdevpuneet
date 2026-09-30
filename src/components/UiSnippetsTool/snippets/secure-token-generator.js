const secureTokenGenerator = {
  id: 'secure-token-generator',
  title: 'Secure Token Generator',
  lastmod: '2026-09-05',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="stg-card">
  <div class="stg-head">
    <h2>Secure Token Generator</h2>
    <p>Cryptographically secure API keys generated with the Web Crypto API.</p>
  </div>

  <div class="stg-field">
    <label>Token length (bytes)</label>
    <div class="stg-lengths" id="stgLengths">
      <button class="stg-len-btn" data-len="16">16</button>
      <button class="stg-len-btn active" data-len="32">32</button>
      <button class="stg-len-btn" data-len="48">48</button>
    </div>
  </div>

  <div class="stg-field">
    <label>Encoding</label>
    <div class="stg-lengths" id="stgFormats">
      <button class="stg-len-btn active" data-fmt="hex">Hex</button>
      <button class="stg-len-btn" data-fmt="base64url">Base64url</button>
    </div>
  </div>

  <div class="stg-token-box">
    <code id="stgTokenOutput">generating…</code>
  </div>

  <div class="stg-actions">
    <button class="stg-btn stg-btn-primary" id="stgCopyBtn" type="button">Copy</button>
    <button class="stg-btn" id="stgRegenBtn" type="button">Regenerate</button>
  </div>

  <div class="stg-meta" id="stgMeta">32 bytes · 256 bits of entropy</div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.stg-card{font-family:system-ui,-apple-system,sans-serif;background:#12141f;color:#e7e9f5;border:1px solid #262a3d;border-radius:16px;padding:26px;max-width:440px;width:100%}
.stg-head h2{margin:0 0 6px;font-size:19px}
.stg-head p{margin:0 0 20px;font-size:13px;color:#9096b3;line-height:1.5}
.stg-field{margin-bottom:16px}
.stg-field label{display:block;font-size:11.5px;font-weight:600;color:#9096b3;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px}
.stg-lengths{display:flex;gap:8px}
.stg-len-btn{flex:1;background:#181b2a;border:1px solid #262a3d;color:#c7cae6;font-size:13px;font-weight:600;padding:9px;border-radius:9px;cursor:pointer;transition:all .12s}
.stg-len-btn:hover{border-color:#3d4265}
.stg-len-btn.active{background:rgba(99,102,241,.16);border-color:#6366f1;color:#a5a9ff}
.stg-token-box{background:#0e1019;border:1px solid #262a3d;border-radius:10px;padding:14px;margin-bottom:14px;min-height:52px;display:flex;align-items:center}
.stg-token-box code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;word-break:break-all;color:#7dffb0;line-height:1.5}
.stg-actions{display:flex;gap:10px;margin-bottom:12px}
.stg-btn{flex:1;background:#181b2a;border:1px solid #262a3d;color:#e7e9f5;font-size:13.5px;font-weight:600;padding:10px;border-radius:9px;cursor:pointer;transition:background .12s}
.stg-btn:hover{background:#20233a}
.stg-btn-primary{background:#6366f1;border-color:#6366f1;color:#fff}
.stg-btn-primary:hover{background:#4f52e0}
.stg-meta{text-align:center;font-size:11.5px;color:#8b90ab}`,

  js: `var state = { length: 32, format: 'hex' };

function randomBytes(n) {
  var bytes = new Uint8Array(n);
  crypto.getRandomValues(bytes);
  return bytes;
}

function bytesToHex(bytes) {
  var hex = '';
  for (var i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0');
  return hex;
}

function bytesToBase64Url(bytes) {
  var binary = '';
  for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  var b64 = btoa(binary);
  return b64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
}

var outputEl = document.getElementById('stgTokenOutput');
var metaEl = document.getElementById('stgMeta');
var copyBtn = document.getElementById('stgCopyBtn');
var regenBtn = document.getElementById('stgRegenBtn');

function generateToken() {
  var bytes = randomBytes(state.length);
  var token = state.format === 'hex' ? bytesToHex(bytes) : bytesToBase64Url(bytes);
  outputEl.textContent = token;
  metaEl.textContent = state.length + ' bytes · ' + (state.length * 8) + ' bits of entropy';
  return token;
}

document.getElementById('stgLengths').addEventListener('click', function (e) {
  var btn = e.target.closest('.stg-len-btn');
  if (!btn) return;
  document.querySelectorAll('#stgLengths .stg-len-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  state.length = parseInt(btn.dataset.len, 10);
  generateToken();
});

document.getElementById('stgFormats').addEventListener('click', function (e) {
  var btn = e.target.closest('.stg-len-btn');
  if (!btn) return;
  document.querySelectorAll('#stgFormats .stg-len-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  state.format = btn.dataset.fmt;
  generateToken();
});

regenBtn.addEventListener('click', generateToken);

copyBtn.addEventListener('click', function () {
  navigator.clipboard.writeText(outputEl.textContent).then(function () {
    copyBtn.textContent = 'Copied!';
    setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1500);
  });
});

generateToken();`,

  seo: {
    title: 'Secure Token Generator — Free HTML CSS JS Snippet',
    description: `Generates cryptographically secure API tokens with crypto.getRandomValues, in hex or base64url, with copy and regenerate controls. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Secure Token Generator — Web Crypto Random API Keys',
      description: `This snippet generates API tokens and secret keys suitable for real use, because every byte comes from \`crypto.getRandomValues\`, the browser's cryptographically secure pseudo-random number generator, never from \`Math.random\`.\n\n**Random bytes to text**\n\nA \`Uint8Array\` of the selected length is filled in place by \`crypto.getRandomValues(bytes)\`. From there, \`bytesToHex()\` converts each byte to a two-character hex pair, while \`bytesToBase64Url()\` builds a binary string and runs it through \`btoa\`, then swaps the standard base64 alphabet's \`+\`/\`/\` characters and strips padding to produce a URL-safe token.\n\n**Length and encoding controls**\n\nA row of pill buttons lets the user pick 16, 32, or 48 bytes (128/256/384 bits of entropy), and a second row switches between hex and base64url encoding. Both controls immediately regenerate the token so the displayed value always matches the selected settings.\n\n**Copy and regenerate**\n\nThe Copy button calls \`navigator.clipboard.writeText\` and shows temporary "Copied!" feedback, while Regenerate simply reruns the same generation function to produce a fresh value on demand.`,
    },
    features: [
      'Uses crypto.getRandomValues exclusively — never Math.random for token bytes',
      'Selectable token length: 16, 32, or 48 random bytes',
      'Hex and base64url output encodings, switchable without regenerating manually',
      'Monospace readonly-style display box for the generated token',
      'Clipboard copy via navigator.clipboard.writeText with button feedback',
      'One-click regenerate button for a fresh secure value',
      'Live entropy readout in bits based on selected byte length',
      'Zero dependencies — pure Web Crypto and DOM APIs',
    ],
    useCases: [
      { icon: 'CODE', title: 'API key generation UIs', desc: 'Let users generate a new API key or secret directly in a dashboard.' },
      { icon: 'APP', title: 'Developer tool sites', desc: 'Offer a quick, trustworthy token generator utility page.' },
      { icon: 'FORM', title: 'Onboarding and setup flows', desc: 'Generate a webhook signing secret or client secret during app setup.' },
      { icon: 'LEARN', title: 'Web Crypto API teaching example', desc: 'Demonstrates secure random byte generation and encoding conversions.' },
    ],
    faqs: [
      { q: 'Is this actually cryptographically secure?', a: 'Yes. Every byte comes from crypto.getRandomValues, backed by the operating system\'s CSPRNG, unlike Math.random which is not suitable for secrets.' },
      { q: 'What is base64url and why offer it?', a: 'Base64url is standard base64 with + and / replaced by - and _ and padding removed, making the token safe to use directly in URLs and filenames.' },
      { q: 'How much entropy do these tokens have?', a: 'Entropy in bits equals byte length times 8, so a 32-byte token has 256 bits of entropy, far beyond what is brute-forceable.' },
    ],
  },
};

export default secureTokenGenerator;
