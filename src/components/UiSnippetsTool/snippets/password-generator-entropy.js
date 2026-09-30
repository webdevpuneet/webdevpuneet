const passwordGeneratorEntropy = {
  id: 'password-generator-entropy',
  title: 'Password Generator with Entropy Meter',
  lastmod: '2026-09-05',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="pge-card">
  <div class="pge-head">
    <h2>Password Generator</h2>
    <p>Secure random passwords with a real entropy calculation, not a guessed strength label.</p>
  </div>

  <div class="pge-output-row">
    <code id="pgeOutput">…</code>
    <button class="pge-copy" id="pgeCopy" type="button">Copy</button>
  </div>

  <div class="pge-strength">
    <div class="pge-strength-track"><div class="pge-strength-fill" id="pgeStrengthFill"></div></div>
    <div class="pge-strength-label" id="pgeStrengthLabel">Fair · 0 bits</div>
  </div>

  <div class="pge-field">
    <div class="pge-slider-row">
      <label for="pgeLength">Length</label>
      <span id="pgeLengthValue">16</span>
    </div>
    <input type="range" id="pgeLength" min="6" max="64" value="16" />
  </div>

  <div class="pge-checks">
    <label><input type="checkbox" id="pgeUpper" checked /> Uppercase (A-Z)</label>
    <label><input type="checkbox" id="pgeLower" checked /> Lowercase (a-z)</label>
    <label><input type="checkbox" id="pgeNumbers" checked /> Numbers (0-9)</label>
    <label><input type="checkbox" id="pgeSymbols" /> Symbols (!@#$…)</label>
  </div>

  <button class="pge-btn" id="pgeGenerate" type="button">Generate password</button>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.pge-card{font-family:system-ui,-apple-system,sans-serif;background:#12141f;color:#e7e9f5;border:1px solid #262a3d;border-radius:16px;padding:26px;max-width:440px;width:100%}
.pge-head h2{margin:0 0 6px;font-size:19px}
.pge-head p{margin:0 0 18px;font-size:13px;color:#9096b3;line-height:1.5}
.pge-output-row{display:flex;align-items:center;gap:10px;background:#0e1019;border:1px solid #262a3d;border-radius:10px;padding:14px;margin-bottom:12px}
.pge-output-row code{flex:1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14.5px;color:#7dffb0;word-break:break-all}
.pge-copy{flex-shrink:0;background:#20243a;border:1px solid #333955;color:#dfe2f6;font-size:11.5px;font-weight:600;padding:6px 11px;border-radius:7px;cursor:pointer}
.pge-copy:hover{background:#282d47}
.pge-strength{margin-bottom:18px}
.pge-strength-track{height:8px;border-radius:99px;background:#20243a;overflow:hidden;margin-bottom:8px}
.pge-strength-fill{height:100%;width:0%;border-radius:99px;transition:width .25s ease,background .25s ease}
.pge-strength-label{font-size:12px;color:#9096b3;font-weight:600}
.pge-field{margin-bottom:16px}
.pge-slider-row{display:flex;justify-content:space-between;font-size:12.5px;color:#9096b3;margin-bottom:8px;font-weight:600}
.pge-slider-row span{color:#e7e9f5}
input[type="range"]{width:100%;accent-color:#6366f1}
.pge-checks{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
.pge-checks label{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#c7cae6}
.pge-checks input{accent-color:#6366f1;width:15px;height:15px}
.pge-btn{width:100%;background:#6366f1;border:none;color:#fff;font-size:13.5px;font-weight:700;padding:12px;border-radius:9px;cursor:pointer}
.pge-btn:hover{background:#4f52e0}`,

  js: `var CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}<>?',
};

var upperEl = document.getElementById('pgeUpper');
var lowerEl = document.getElementById('pgeLower');
var numbersEl = document.getElementById('pgeNumbers');
var symbolsEl = document.getElementById('pgeSymbols');
var lengthEl = document.getElementById('pgeLength');
var lengthValueEl = document.getElementById('pgeLengthValue');
var outputEl = document.getElementById('pgeOutput');
var strengthFill = document.getElementById('pgeStrengthFill');
var strengthLabel = document.getElementById('pgeStrengthLabel');

function activeCharset() {
  var pool = '';
  if (upperEl.checked) pool += CHARSETS.upper;
  if (lowerEl.checked) pool += CHARSETS.lower;
  if (numbersEl.checked) pool += CHARSETS.numbers;
  if (symbolsEl.checked) pool += CHARSETS.symbols;
  return pool;
}

// Cryptographically secure random password, one character at a time,
// sourced from crypto.getRandomValues rather than Math.random.
function generatePassword(length, pool) {
  if (!pool) return '';
  var randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  var result = '';
  for (var i = 0; i < length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

// Real Shannon-style entropy estimate: bits = length * log2(charset size).
function calculateEntropy(length, charsetSize) {
  if (charsetSize <= 1) return 0;
  return length * Math.log2(charsetSize);
}

function strengthFromEntropy(bits) {
  if (bits < 40) return { label: 'Weak', color: '#f87171', pct: 25 };
  if (bits < 64) return { label: 'Fair', color: '#facc15', pct: 50 };
  if (bits < 100) return { label: 'Strong', color: '#4ade80', pct: 75 };
  return { label: 'Very strong', color: '#22d3ee', pct: 100 };
}

function updateAll() {
  var length = parseInt(lengthEl.value, 10);
  lengthValueEl.textContent = length;
  var pool = activeCharset();
  var password = pool ? generatePassword(length, pool) : '(select at least one character type)';
  outputEl.textContent = password;

  var bits = calculateEntropy(length, pool.length || 1);
  var strength = strengthFromEntropy(bits);
  strengthFill.style.width = strength.pct + '%';
  strengthFill.style.background = strength.color;
  strengthLabel.textContent = strength.label + ' · ' + Math.round(bits) + ' bits of entropy';
}

[upperEl, lowerEl, numbersEl, symbolsEl].forEach(function (el) {
  el.addEventListener('change', updateAll);
});
lengthEl.addEventListener('input', updateAll);
document.getElementById('pgeGenerate').addEventListener('click', updateAll);

document.getElementById('pgeCopy').addEventListener('click', function () {
  var btn = this;
  navigator.clipboard.writeText(outputEl.textContent).then(function () {
    var original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(function () { btn.textContent = original; }, 1500);
  });
});

updateAll();`,

  seo: {
    title: 'Password Generator with Entropy Meter — Free HTML CSS JS Snippet',
    description: `A password generator using crypto.getRandomValues with checkboxes for character sets and a real entropy-in-bits strength meter. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Password Generator with Entropy Meter — Real Bits-of-Entropy Calculation',
      description: `This snippet generates passwords securely and rates them honestly. Instead of an arbitrary "strong/weak" guess, the strength meter is driven by a real entropy calculation: bits = length × log2(charset size), the standard formula for the information content of a uniformly random string.\n\n**Secure character selection**\n\nEach password character is chosen using \`crypto.getRandomValues\` on a \`Uint32Array\`, with the result taken modulo the active character pool's length — never \`Math.random\`, which is unsuitable for anything security-sensitive.\n\n**Configurable character sets and length**\n\nFour checkboxes toggle uppercase letters, lowercase letters, numbers, and symbols in and out of the active pool, and a range slider from 6 to 64 characters controls password length. Both regenerate the password and recompute entropy immediately.\n\n**Honest entropy-based strength**\n\n\`calculateEntropy()\` multiplies the chosen length by \`Math.log2(charsetSize)\` to get real bits of entropy, and \`strengthFromEntropy()\` buckets that number into weak/fair/strong/very strong labels with a matching coloured bar — so enabling more character types or increasing length visibly and correctly raises the score.`,
    },
    features: [
      'Generates passwords with crypto.getRandomValues, never Math.random',
      'Real entropy calculation: bits = length × log2(charset size)',
      'Coloured strength bar with four tiers driven by the computed entropy',
      'Toggleable character sets: uppercase, lowercase, numbers, symbols',
      'Range slider for password length from 6 to 64 characters',
      'Live regeneration and entropy recompute on every setting change',
      'Clipboard copy with temporary button feedback',
      'Zero dependencies — pure Web Crypto and DOM APIs',
    ],
    useCases: [
      { icon: 'CODE', title: 'Signup and account settings forms', desc: 'Offer a "generate a secure password" helper next to a password field.' },
      { icon: 'FORM', title: 'Password policy education', desc: 'Show users exactly how each character set choice affects real entropy.' },
      { icon: 'APP', title: 'Developer and IT utility tools', desc: 'Generate strong passwords for service accounts or shared credentials.' },
      { icon: 'LEARN', title: 'Entropy and randomness teaching example', desc: 'Demonstrates the log2-based entropy formula in a visual, interactive way.' },
    ],
    faqs: [
      { q: 'Is the strength meter a real calculation?', a: 'Yes. It multiplies the password length by log2 of the active character set size to get bits of entropy, then buckets that number into a label — it is not a hardcoded or guessed rating.' },
      { q: 'Why crypto.getRandomValues instead of Math.random?', a: 'Math.random is not cryptographically secure and can be predictable; crypto.getRandomValues draws from the operating system\'s secure random source, which is what password generation requires.' },
      { q: 'What happens if I uncheck every character type?', a: 'The output shows a prompt to select at least one character type, since an empty character pool cannot produce a password or a meaningful entropy value.' },
    ],
  },
};

export default passwordGeneratorEntropy;
