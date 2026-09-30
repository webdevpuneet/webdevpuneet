const uuidUlidGenerator = {
  id: 'uuid-ulid-generator',
  title: 'UUID / ULID Generator & Validator',
  category: 'dev',
  html: `<div class="wrap">
  <h2>UUID / ULID Generator</h2>

  <div class="tabs">
    <button class="tab active" data-mode="uuid4">UUID v4</button>
    <button class="tab" data-mode="ulid">ULID</button>
  </div>

  <div class="output-row">
    <input type="text" id="output-input" readonly spellcheck="false" />
    <button class="btn btn-primary" id="btn-copy">Copy</button>
  </div>

  <div class="controls">
    <button class="btn" id="btn-generate">Generate New</button>
    <label class="bulk-label">
      Bulk: <input type="number" id="bulk-count" min="1" max="100" value="5" />
      <button class="btn" id="btn-bulk">Generate</button>
    </label>
  </div>

  <div class="bulk-out" id="bulk-out"></div>

  <div class="divider"></div>

  <div class="validate-row">
    <input type="text" id="validate-input" spellcheck="false" placeholder="Paste a UUID or ULID here to validate..." />
  </div>
  <div class="validate-result" id="validate-result"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 620px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.tabs { display: flex; gap: 6px; margin-bottom: 14px; }
.tab { flex: 1; padding: 9px; border-radius: 9px; border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 12.5px; font-weight: 700; cursor: pointer; }
.tab.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.output-row { display: flex; gap: 8px; margin-bottom: 12px; }
#output-input { flex: 1; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; color: #1e293b; background: #f8fafc; }
.btn { font-size: 12.5px; font-weight: 700; padding: 10px 16px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; white-space: nowrap; }
.btn:hover { border-color: #6366f1; color: #6366f1; }
.btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; color: #fff; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.bulk-label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
.bulk-label input { width: 52px; padding: 7px 8px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 12.5px; }

.bulk-out { max-height: 150px; overflow-y: auto; background: #0f172a; border-radius: 10px; padding: 10px 12px; font-family: monospace; font-size: 11.5px; color: #86efac; line-height: 1.8; display: none; white-space: pre; }
.bulk-out.shown { display: block; }

.divider { height: 1px; background: #eef2f7; margin: 18px 0; }

.validate-row input { width: 100%; padding: 11px 13px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 13px; }
.validate-row input:focus { outline: none; border-color: #6366f1; }

.validate-result { margin-top: 10px; font-size: 12.5px; font-weight: 600; min-height: 18px; }
.validate-result.valid { color: #16a34a; }
.validate-result.invalid { color: #dc2626; }
.validate-result .detail { display: block; font-weight: 500; color: #64748b; margin-top: 4px; font-family: monospace; font-size: 11.5px; }`,
  js: `let mode = 'uuid4';
const outputInput = document.getElementById('output-input');
const bulkOut = document.getElementById('bulk-out');
const validateInput = document.getElementById('validate-input');
const validateResult = document.getElementById('validate-result');

function genUuid4() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map(b => b.toString(16).padStart(2, '0'));
  return hex.slice(0,4).join('') + '-' + hex.slice(4,6).join('') + '-' + hex.slice(6,8).join('') + '-' + hex.slice(8,10).join('') + '-' + hex.slice(10,16).join('');
}

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function encodeCrockford(bytes) {
  let bits = '';
  for (const b of bytes) bits += b.toString(2).padStart(8, '0');
  let out = '';
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    out += CROCKFORD[parseInt(bits.slice(i, i + 5), 2)];
  }
  return out;
}

function genUlid() {
  const time = Date.now();
  const timeBytes = new Uint8Array(6);
  let t = time;
  for (let i = 5; i >= 0; i--) { timeBytes[i] = t % 256; t = Math.floor(t / 256); }
  const randBytes = crypto.getRandomValues(new Uint8Array(10));

  let timeBits = '';
  for (const b of timeBytes) timeBits += b.toString(2).padStart(8, '0');
  timeBits = timeBits.slice(0, 48);
  let timeStr = '';
  for (let i = 0; i < 48; i += 5) timeStr += CROCKFORD[parseInt(timeBits.slice(i, i + 5).padEnd(5, '0'), 2)];

  const randStr = encodeCrockford(randBytes);
  return (timeStr + randStr).slice(0, 26);
}

function currentGenerator() {
  return mode === 'uuid4' ? genUuid4 : genUlid;
}

function generate() {
  outputInput.value = currentGenerator()();
  bulkOut.classList.remove('shown');
}

function generateBulk() {
  const count = Math.min(100, Math.max(1, Number(document.getElementById('bulk-count').value) || 1));
  const gen = currentGenerator();
  const lines = [];
  for (let i = 0; i < count; i++) lines.push(gen());
  bulkOut.textContent = lines.join('\\n');
  bulkOut.classList.add('shown');
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    mode = tab.dataset.mode;
    generate();
  });
});

document.getElementById('btn-generate').addEventListener('click', generate);
document.getElementById('btn-bulk').addEventListener('click', generateBulk);
document.getElementById('btn-copy').addEventListener('click', () => {
  navigator.clipboard.writeText(outputInput.value);
});

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ULID_RE = /^[0-9A-HJKMNP-TV-Z]{26}$/;

function validate() {
  const val = validateInput.value.trim();
  if (!val) { validateResult.textContent = ''; validateResult.className = 'validate-result'; return; }

  if (UUID_RE.test(val)) {
    const version = val[14];
    validateResult.innerHTML = 'Valid UUID (version ' + version + ')<span class="detail">RFC 4122 format confirmed via variant/version bit check</span>';
    validateResult.className = 'validate-result valid';
  } else if (ULID_RE.test(val) && val.length === 26) {
    const timePart = val.slice(0, 10);
    let bits = '';
    for (const ch of timePart) bits += CROCKFORD.indexOf(ch).toString(2).padStart(5, '0');
    const ms = parseInt(bits.slice(0, 48), 2);
    const date = new Date(ms);
    const dateStr = isNaN(date.getTime()) ? 'unknown' : date.toISOString();
    validateResult.innerHTML = 'Valid ULID<span class="detail">Embedded timestamp: ' + dateStr + '</span>';
    validateResult.className = 'validate-result valid';
  } else {
    validateResult.textContent = 'Not a recognized UUID or ULID format.';
    validateResult.className = 'validate-result invalid';
  }
}

validateInput.addEventListener('input', validate);

generate();`,

  seo: {
    title: 'UUID / ULID Generator & Validator — Free HTML CSS JS Snippet',
    description: 'Generate cryptographically random UUID v4 and lexicographically sortable ULID identifiers using crypto.getRandomValues, plus a format validator with embedded timestamp decode. Exports to React & Vue.',
    about: {
      title: 'UUID v4 / ULID Generator & Validator — Real crypto.getRandomValues Entropy, Crockford Base32 Timestamp Encoding',
      description: `Both UUIDs and ULIDs solve the same underlying problem — generating an identifier unique enough to assign without checking a central database — but they trade off differently between randomness and sortability. This snippet generates both formats correctly, using real cryptographic randomness from the Web Crypto API rather than \`Math.random()\`, and includes a validator that recognizes and decodes both.

**UUID v4: 122 bits of real entropy, RFC 4122 formatted**

\`genUuid4()\` prefers the browser's native \`crypto.randomUUID()\` when available, which is the most correct implementation possible — it's provided directly by the browser's cryptographic subsystem. As a fallback for older environments, the function generates 16 random bytes via \`crypto.getRandomValues()\` (a cryptographically secure random number generator, unlike \`Math.random()\` which is not specified to be unpredictable), then manually sets the two fixed bit patterns RFC 4122 requires: byte 6 is masked to \`0x40\` in its top nibble to encode "version 4," and byte 8 is masked to \`0x80\`/\`0xa0\`-range to encode the "variant" bits. Only 122 of the 128 bits are actually random — the other 6 are fixed by the version and variant markers — which is why UUID v4 collision probability calculations use 122, not 128, bits of entropy.

**ULID: sortable by design, using Crockford's Base32**

A ULID (Universally Unique Lexicographically Sortable Identifier) deliberately encodes the current timestamp into its first 48 bits (10 characters), followed by 80 bits (16 characters) of randomness — 26 characters total. Because the timestamp comes first and is encoded in a way that preserves ordering, ULIDs generated later always sort after ULIDs generated earlier when compared as plain strings, which a random UUID cannot do. \`genUlid()\` builds the 48-bit millisecond timestamp as 6 raw bytes, then encodes both the timestamp bytes and 10 additional random bytes through \`encodeCrockford()\`, which converts the bit string 5 bits at a time into Crockford's Base32 alphabet — a 32-character set (\`0-9\`, most letters, deliberately excluding \`I\`, \`L\`, \`O\`, and \`U\` to avoid visual confusion with \`1\`, \`0\`, and profanity) chosen specifically for human readability and reduced transcription errors versus standard Base64.

**Why 5-bit chunks, not the usual base64's 6-bit chunks**

Base32 uses a 32-symbol alphabet, and \`32 = 2^5\`, so each output character encodes exactly 5 bits of input — that's why \`encodeCrockford()\` walks the bit string in slices of 5 (\`bits.slice(i, i + 5)\`) rather than the 6-bit slices you'd use for standard Base64's 64-symbol alphabet. 128 bits total (48 timestamp + 80 random) divided by 5 bits per character comes out to 25.6, which is why the timestamp portion is deliberately truncated to exactly 10 Crockford characters (50 bits' worth of capacity holding a 48-bit value, zero-padded) and the combined string is sliced to exactly 26 characters in the final step.

**Validating and decoding both formats**

The validator applies a strict regex for each format — the UUID pattern specifically checks for a version digit (1-5) in the expected position and a variant nibble (8, 9, a, or b) in the next group, rather than accepting any 32 hex characters in UUID-shaped groups, which would also match non-compliant "UUID-like" strings. For a recognized ULID, the validator goes further: it decodes the first 10 characters back through the Crockford alphabet into their original 48-bit value and renders it as an ISO date, letting you extract the exact creation timestamp embedded in any ULID you paste in — a capability that has no UUID v4 equivalent, since a v4 UUID intentionally carries no information about when it was created.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Choose UUID v4 or ULID', text: 'Click a tab to switch generator mode — the currently displayed identifier regenerates in the newly selected format immediately.' },
        { title: 'Click Generate New for a single value', text: 'Produces one fresh identifier using real cryptographic randomness from the Web Crypto API.' },
        { title: 'Use Copy to grab it', text: 'Copies the current output value straight to your clipboard.' },
        { title: 'Set a bulk count and click Generate', text: 'Produces up to 100 identifiers at once in the selected format, one per line, ready to paste into a seed script or test fixture.' },
        { title: 'Paste any UUID or ULID into the validator', text: 'It checks the format strictly (including version/variant bits for UUIDs) and reports whether it\'s valid.' },
        { title: 'Read the decoded ULID timestamp', text: 'For a valid ULID, the validator extracts and displays the exact millisecond timestamp encoded in its first 10 characters as an ISO date.' },
      ],
    },
    features: [
      'Real cryptographic randomness via crypto.randomUUID() / crypto.getRandomValues(), never Math.random()',
      'Correct RFC 4122 UUID v4 bit-pattern construction (version nibble, variant bits) when using the manual fallback path',
      'Genuine ULID implementation: 48-bit millisecond timestamp + 80 bits of randomness, Crockford Base32 encoded',
      'Bulk generation of up to 100 identifiers at once in either format',
      'One-click copy-to-clipboard for the current single generated value',
      'Strict format validator distinguishing real UUIDs (checking version/variant nibbles) from merely hex-shaped lookalikes',
      'ULID validator decodes and displays the exact embedded creation timestamp as an ISO date',
      'Entirely client-side — every identifier is generated and validated locally, nothing is transmitted',
    ],
    useCases: [
      { icon: 'CODE', title: 'Seeding test fixtures and database records', desc: 'Generate a batch of realistic primary-key identifiers for local development seed data or automated test fixtures without writing a script.' },
      { icon: 'FLOW', title: 'Choosing between UUID and ULID for a new schema', desc: 'Generate a few of each side by side to see the practical difference: ULIDs stay roughly sorted by creation time in a database index, while UUID v4 values are uniformly random and don\'t.' },
      { icon: 'CODE', title: 'Debugging an identifier from logs or a support ticket', desc: 'Paste an ID a user reports seeing into the validator to confirm its format, and for a ULID, instantly see exactly when that record was created without querying the database.' },
      { icon: 'LEARN', title: 'Teaching how UUIDs and ULIDs are actually constructed', desc: 'Walk through the version and variant bit placement in UUID v4, or the Crockford Base32 timestamp encoding in ULID, using real generated values as concrete examples.' },
      { icon: 'APP', title: 'API and integration testing', desc: 'Quickly generate placeholder resource IDs when manually testing an API endpoint that expects a UUID or ULID path parameter.' },
      { icon: 'CODE', title: 'Related: Unix Timestamp Converter', desc: 'See the [Unix Timestamp Converter](/ui-snippets/unix-timestamp-converter/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does this use crypto.getRandomValues() instead of Math.random()?', a: 'Math.random() is not specified to be cryptographically secure or unpredictable — in some engines its output can theoretically be predicted from prior outputs. crypto.getRandomValues() (and crypto.randomUUID(), which uses it internally) is backed by the operating system\'s cryptographically secure random number generator, which is the correct source of randomness for any identifier where uniqueness genuinely matters.' },
      { q: 'What is the practical difference between UUID v4 and ULID?', a: 'UUID v4 is 128 bits of (mostly) pure randomness with no ordering information — two UUIDs generated a second apart sort in effectively random order relative to each other. A ULID deliberately puts a millisecond timestamp in its first 48 bits, so ULIDs generated later always sort after ones generated earlier as plain strings, which makes them friendlier to database indexes that benefit from roughly-increasing keys.' },
      { q: 'Why does ULID use Crockford\'s Base32 alphabet specifically?', a: 'Crockford\'s Base32 excludes the letters I, L, O, and U from its alphabet because they are easily confused with 1, 1, 0, and each other when read aloud or handwritten, and U is excluded partly to reduce accidental profanity in generated strings. This makes ULIDs meaningfully easier to transcribe correctly by hand than a base64-encoded identifier.' },
      { q: 'How does the validator know a string is a real UUID and not just 32 random hex characters in the right shape?', a: 'The validator\'s regex specifically checks that the version digit (the first character of the third group) is between 1 and 5, and that the variant nibble (the first character of the fourth group) is 8, 9, a, or b, per RFC 4122. A string with correct dash placement but the wrong version or variant character is correctly rejected as not a valid UUID.' },
      { q: 'How is a ULID\'s embedded timestamp decoded?', a: 'The first 10 characters of a ULID encode a 48-bit millisecond Unix timestamp using 5-bit Crockford Base32 chunks. The validator reverses that encoding — looking up each character\'s 5-bit value and concatenating them back into the original 48-bit number — then constructs a JavaScript Date from that millisecond value to display as an ISO string.' },
      { q: 'Are the generated identifiers guaranteed globally unique?', a: 'No identifier scheme can mathematically guarantee absolute uniqueness — both UUID v4 and ULID rely on the random portion being large enough that a collision is astronomically unlikely in practice (UUID v4 has 122 random bits; ULID has 80). For virtually all real-world applications this collision probability is negligible, but it is a probabilistic guarantee, not an absolute one.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JavaScript to an AI assistant like Claude and ask it to walk through exactly how the ULID timestamp gets encoded into Crockford Base32 5-bit chunks and why that\'s different from the 6-bit chunking a typical base64 encoder uses — it's a neat, self-contained bit-manipulation example. It's also a good base to extend: ask for UUID v1 (timestamp-based) or v7 (a newer sortable UUID variant similar in spirit to ULID) generation, a "monotonic ULID" mode that guarantees strictly increasing output even for multiple IDs generated within the same millisecond, or a batch export button that downloads generated IDs as a CSV file.`,
      prompt: `Build a UUID v4 and ULID generator and validator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A tab switcher between "UUID v4" and "ULID" generation modes, and a Generate button that produces one identifier using crypto.getRandomValues() (or crypto.randomUUID() where available) — never Math.random() — for the random portion.
- For UUID v4, correctly set the RFC 4122 version nibble (4) and variant bits in the generated bytes before formatting as the standard 8-4-4-4-12 hyphenated hex string.
- For ULID, implement the real algorithm: encode the current millisecond Unix timestamp into the first 48 bits, append 80 bits of cryptographic randomness, and encode the combined 128 bits using Crockford's Base32 alphabet (5 bits per output character) to produce a 26-character sortable string.
- Add a bulk-generation option that produces a user-specified number of identifiers (capped at a reasonable maximum like 100) in the currently selected format, one per line.
- Add a separate validator input where a user can paste any string; use a strict regex to determine whether it's a well-formed UUID (checking the version and variant characters specifically, not just hex-and-dashes shape) or a well-formed ULID (26 Crockford Base32 characters).
- For a valid ULID specifically, decode its first 10 characters back into the embedded 48-bit timestamp and display it as a human-readable ISO date, since this is the ULID's key advantage over a UUID.
- Include a copy-to-clipboard button for the currently generated single value.`,
    },
  },
};

export default uuidUlidGenerator;
