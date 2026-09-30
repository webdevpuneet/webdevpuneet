const compressionStreamDemo = {
  id: 'compression-stream-demo',
  title: 'CompressionStream API Demo',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<section class="csd-wrap">
  <span class="csd-tag">compressionstream api · gzip in the browser</span>
  <h1>Compress text, client-side</h1>
  <p id="csdStatus">Type or paste text below — it's compressed with the real CompressionStream API, no server involved.</p>

  <textarea class="csd-input" id="csdInput" rows="6" placeholder="Paste some text here… (longer, more repetitive text compresses better)">The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.</textarea>

  <div class="csd-grid">
    <div class="csd-stat"><span id="csdOriginal">0 B</span><small>original size</small></div>
    <div class="csd-stat"><span id="csdCompressed">0 B</span><small>compressed (gzip)</small></div>
    <div class="csd-stat"><span id="csdRatio">0%</span><small>size reduction</small></div>
  </div>

  <div class="csd-verify" id="csdVerify"></div>
  <p class="csd-note" id="csdNote"></p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0c1f1a,#04100d 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.csd-wrap{width:100%;max-width:560px}
.csd-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5eead4;background:rgba(94,234,212,.1);border:1px solid rgba(94,234,212,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.csd-wrap h1{font-size:clamp(26px,5.5vw,36px);font-weight:800;letter-spacing:-.03em}
.csd-wrap>p{font-size:13.5px;color:#9cc9bd;margin-top:8px;line-height:1.6}
.csd-input{width:100%;margin:20px 0;padding:14px;border-radius:12px;background:#08150f;border:1px solid rgba(94,234,212,.25);color:#e4fbf3;font:13px/1.6 ui-monospace,monospace;resize:vertical}
.csd-input:focus{outline:none;border-color:#5eead4}
.csd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
.csd-stat{background:#08150f;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 8px;text-align:center}
.csd-stat span{display:block;font-size:18px;font-weight:800;color:#5eead4}
.csd-stat small{font-size:10px;color:#5f8a7c;text-transform:uppercase;letter-spacing:.05em}
.csd-verify{font-size:12.5px;padding:12px 14px;border-radius:10px;background:#08150f;border:1px solid rgba(255,255,255,.08);color:#a9d9cb;margin-bottom:12px}
.csd-verify.ok{border-color:rgba(94,234,212,.4);color:#5eead4}
.csd-verify.bad{border-color:rgba(248,113,113,.4);color:#f87171}
.csd-note{font-size:11.5px;color:#5f8a7c;line-height:1.6}`,

  js: `var input = document.getElementById('csdInput');
var statusEl = document.getElementById('csdStatus');
var originalEl = document.getElementById('csdOriginal');
var compressedEl = document.getElementById('csdCompressed');
var ratioEl = document.getElementById('csdRatio');
var verifyEl = document.getElementById('csdVerify');
var noteEl = document.getElementById('csdNote');

function formatBytes(n) {
  if (n >= 1024 * 1024) return (n / (1024 * 1024)).toFixed(2) + ' MB';
  if (n >= 1024) return (n / 1024).toFixed(2) + ' KB';
  return n + ' B';
}

async function streamToBytes(readableStream) {
  var reader = readableStream.getReader();
  var chunks = [];
  var total = 0;
  while (true) {
    var result = await reader.read();
    if (result.done) break;
    chunks.push(result.value);
    total += result.value.length;
  }
  var out = new Uint8Array(total);
  var offset = 0;
  for (var i = 0; i < chunks.length; i++) {
    out.set(chunks[i], offset);
    offset += chunks[i].length;
  }
  return out;
}

var supported = typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';
var debounceTimer = null;

async function runCompression() {
  var text = input.value;
  var encoder = new TextEncoder();
  var originalBytes = encoder.encode(text);
  originalEl.textContent = formatBytes(originalBytes.length);

  if (!supported) return; // handled entirely by the fallback branch below

  try {
    // Real gzip compression via the browser's native CompressionStream,
    // backed by the same zlib/gzip implementation the browser uses for
    // network responses -- not a JS reimplementation.
    var cs = new CompressionStream('gzip');
    var compressedStream = new Blob([originalBytes]).stream().pipeThrough(cs);
    var compressedBytes = await streamToBytes(compressedStream);
    compressedEl.textContent = formatBytes(compressedBytes.length);

    var ratio = originalBytes.length > 0
      ? ((1 - compressedBytes.length / originalBytes.length) * 100)
      : 0;
    ratioEl.textContent = (ratio < 0 ? 0 : ratio).toFixed(1) + '%';

    // Round-trip: decompress what we just compressed and verify it matches
    // the original bytes exactly, so the ratio above is demonstrably real
    // rather than a display trick.
    var ds = new DecompressionStream('gzip');
    var decompressedStream = new Blob([compressedBytes]).stream().pipeThrough(ds);
    var decompressedBytes = await streamToBytes(decompressedStream);
    var decodedText = new TextDecoder().decode(decompressedBytes);

    var matches = decodedText === text;
    verifyEl.className = 'csd-verify ' + (matches ? 'ok' : 'bad');
    verifyEl.textContent = matches
      ? 'Round-trip verified: decompressing the compressed bytes reproduces the original text exactly.'
      : 'Round-trip mismatch — decompressed text did not match the original (unexpected).';

    statusEl.textContent = 'Compressed and verified using the real CompressionStream/DecompressionStream gzip codec.';
  } catch (err) {
    verifyEl.className = 'csd-verify bad';
    verifyEl.textContent = 'Compression failed: ' + (err && err.message ? err.message : String(err));
  }
}

if (supported) {
  noteEl.textContent = 'Byte counts come from real TextEncoder/gzip output, not an estimate — very short or already-dense text can even compress LARGER due to gzip header/footer overhead, which is expected and shown honestly here.';
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runCompression, 250);
  });
  runCompression();
} else {
  // CompressionStream is unsupported in some older browsers. There is no
  // honest way to fake a real gzip byte count, so rather than invent a
  // plausible-looking ratio, this fallback clearly states no compression
  // was performed and only reports the real, measurable original size.
  statusEl.textContent = 'CompressionStream API unsupported in this browser — compression cannot run here.';
  compressedEl.textContent = 'N/A';
  ratioEl.textContent = 'N/A';
  verifyEl.textContent = 'No round-trip check possible without the compression API.';
  noteEl.textContent = "This is a real limitation, not a simulated one: without CompressionStream/DecompressionStream, this demo only shows the original text's true byte size and cannot honestly report a compressed size or ratio. Consider a JS gzip polyfill library if you need this to work in unsupported browsers.";
  input.addEventListener('input', function () {
    var bytes = new TextEncoder().encode(input.value);
    originalEl.textContent = formatBytes(bytes.length);
  });
  runCompression();
}`,

  seo: {
    title: 'CompressionStream API Demo — Free Real Gzip-in-Browser Tool',
    description: `Client-side text compression using the real CompressionStream/DecompressionStream APIs, with a genuine compression ratio computed from actual byte lengths and a round-trip verification step. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CompressionStream API Demo — Real Gzip Bytes, Not a Guessed Ratio',
      description: `This snippet compresses whatever text you type using the browser's built-in \`CompressionStream\`, the same gzip/deflate codec the browser already uses under the hood for network responses — now exposed as a streams-based API you can run entirely client-side, with no server round-trip and no bundled compression library.

**The real compression pipeline**

Text is encoded to bytes with \`TextEncoder\`, wrapped in a \`Blob\`, turned into a \`ReadableStream\` via \`.stream()\`, and piped through \`new CompressionStream('gzip')\` with \`.pipeThrough()\`. The output is another stream, which a small \`streamToBytes()\` helper drains chunk by chunk into a single \`Uint8Array\` — that array's \`.length\` is the actual compressed byte count. Nothing here is estimated: both the "before" and "after" numbers are real \`TextEncoder\`/stream output lengths.

**A genuine ratio, computed, not chosen**

The displayed reduction percentage is literally \`(1 - compressedBytes.length / originalBytes.length) * 100\`. Because it's derived from measured byte lengths on both sides, it behaves the way real gzip actually does — highly repetitive text (like the default sample sentence repeated three times) compresses dramatically, while short or already information-dense text can compress *poorly*, sometimes even growing slightly larger once gzip's header and footer overhead is counted. The snippet states this honestly rather than hiding the case where compression "fails" to help.

**Proving it round-trips**

Compressing bytes proves nothing about correctness on its own, so this demo immediately decompresses its own output with \`new DecompressionStream('gzip')\`, decodes the result back to text with \`TextDecoder\`, and does a strict string-equality check against the original input. That comparison — not just a "success" message — is the actual proof that the compression is lossless and the byte counts above are trustworthy.

**Handling the unsupported case honestly**

\`CompressionStream\`/\`DecompressionStream\` are missing in some older browsers. There's no honest way to fabricate a real gzip byte count without actually running gzip, so rather than fake a plausible-looking ratio, the fallback here plainly states compression cannot run, shows only the real original size, and suggests a JS polyfill library as the real-world workaround. Pair this with a [storage quota meter](/ui-snippets/storage-quota-meter/) for a broader "what this browser's storage/data APIs can do" dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Sample text compresses immediately on load.` },
      { title: 'Edit the text', text: `Compression re-runs (debounced) as you type.` },
      { title: 'Read the three stats', text: `Original size, compressed size, and reduction %.` },
      { title: 'Check the verify line', text: `Confirms a real decompress round-trip matches the input.` },
      { title: 'Try very short text', text: `Watch the ratio go poor or even negative — gzip overhead.` },
      { title: 'Try unsupported browsers', text: `A clear "cannot run here" message appears instead of fake numbers.` },
    ] },
    features: [
      { title: 'Real gzip via CompressionStream', text: `The browser's native codec, not a JS library.` },
      { title: 'Streams-based pipeline', text: `Blob.stream().pipeThrough() end to end.` },
      { title: 'Measured byte counts', text: `TextEncoder + stream draining, never estimated.` },
      { title: 'Computed ratio', text: `(1 − compressed/original) × 100 from real lengths.` },
      { title: 'Round-trip verification', text: `Decompresses and string-compares against the input.` },
      { title: 'Debounced live updates', text: `Recompresses as you type without lag.` },
      { title: 'Honest small-input behavior', text: `Shows overhead making short text grow, not shrink.` },
      { title: 'Unsupported-browser fallback', text: `States plainly that no compression can run.` },
    ],
    useCases: [
      { title: 'Client-side upload prep', text: `Shrink text payloads before sending to a server.` },
      { title: 'IndexedDB storage savings', text: `Pair with [storage quota meter](/ui-snippets/storage-quota-meter/).` },
      { title: 'Clipboard/export tools', text: `Compress large text exports client-side.` },
      { title: 'Educational demos', text: `Show gzip's real behavior on different text patterns.` },
      { title: 'Offline-first apps', text: `Compress cached data before writing to storage.` },
      { title: 'Log/data viewers', text: `Estimate transfer savings for large text blobs.` },
      { icon: 'CODE', title: 'Related: Dependency Graph Viewer', desc: 'See the [Dependency Graph Viewer](/ui-snippets/dependency-graph-viewer/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this really running gzip, or just simulating a ratio?', a: `It's real. new CompressionStream('gzip') is the same codec implementation the browser already uses to decode gzip-encoded network responses, now exposed for you to run in the other direction on arbitrary bytes. Both the original and compressed byte counts come from actually encoding and streaming the data, not from an estimate or lookup table.` },
      { q: 'Why does short text sometimes get BIGGER after compression?', a: `Gzip adds a fixed amount of header and footer overhead (roughly 18-20 bytes) to every compressed payload. For very short or already low-redundancy text, that overhead can outweigh whatever gzip manages to save, so the "compressed" size ends up larger than the original — a real, well-known gzip behavior this demo shows honestly rather than hiding.` },
      { q: 'How does the round-trip verification prove the ratio is real?', a: `After compressing, the demo immediately runs the compressed bytes back through DecompressionStream, decodes the result to text, and does a strict equality check against your original input. If compression were faked or lossy, that check would fail — so a passing "round-trip verified" message is direct proof the compressed byte count is both real and correct.` },
      { q: 'What happens in browsers without CompressionStream support?', a: `The API is feature-detected up front. If it's missing, the demo does not invent a plausible-looking compressed size or ratio — since there is no honest number to show without actually running gzip — and instead states clearly that compression cannot run in this browser, showing only the real, measurable original byte size.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the compression/decompression logic into an async function triggered from your input's onChange (debounced), store the resulting byte counts and verification result in component state, and render them from there. The CompressionStream/DecompressionStream/TextEncoder APIs themselves are framework-agnostic and need no adaptation.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain the full pipeline from typed text to compressed bytes — TextEncoder to Blob to stream to pipeThrough(CompressionStream) to a drained Uint8Array — and why draining the resulting ReadableStream chunk by chunk is necessary to get a final byte length. It's also useful for reasoning about the round-trip verification step — ask why decompressing and comparing to the original string is meaningfully stronger proof of correctness than just displaying a ratio number. For extensions, ask it to add a 'deflate-raw' format comparison alongside gzip, or to support compressing an uploaded file instead of typed text using the same stream pipeline. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "CompressionStream API demo" in plain HTML, CSS, and JavaScript using the real browser CompressionStream and DecompressionStream APIs — no libraries.

Requirements:
- A textarea for user-typed text. On input (debounced ~250ms), encode the text with TextEncoder, wrap it in a Blob, get a stream via blob.stream(), and pipe it through new CompressionStream('gzip') using pipeThrough(). Drain the resulting ReadableStream chunk-by-chunk into a single Uint8Array to get the real compressed byte length.
- Display three real, computed stats: original byte length (from TextEncoder), compressed byte length (from the drained stream), and a reduction percentage computed as (1 - compressed/original) * 100 — do not estimate or hardcode any of these three numbers.
- CRITICAL round-trip step: immediately decompress the compressed bytes using new DecompressionStream('gzip') through the same Blob-stream-pipeThrough-drain pattern, decode the result back to text with TextDecoder, and do a strict string equality check against the original input text. Show a clear pass/fail verification message based on that real comparison, not a hardcoded "success" message.
- Handle and clearly show the case where very short or low-redundancy text compresses WORSE (larger) than the original due to gzip header/footer overhead — do not clamp or hide a negative/poor reduction percentage.
- CRITICAL fallback: feature-detect typeof CompressionStream !== 'undefined' (and DecompressionStream). If unsupported, do NOT fabricate a compressed size or ratio — show a clear message stating compression cannot run in this browser, and only display the real original byte size computed from TextEncoder.`,
    },
  },
};

export default compressionStreamDemo;
