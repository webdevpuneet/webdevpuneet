const documentSignatureFlow = {
  id: 'document-signature-flow',
  title: 'Document E-Signature Flow',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="ds-card">
  <div class="ds-view" id="ds-signView">
    <div class="ds-doc">
      <div class="ds-doc-head">
        <h2>Service Agreement</h2>
        <span class="ds-doc-pages">Page 3 of 3</span>
      </div>
      <p>This Service Agreement ("Agreement") is entered into by and between the parties for the provision of services as described in Exhibit A. By signing below, both parties acknowledge they have read and agree to the terms set forth in this Agreement.</p>
      <p>This Agreement shall remain in effect until terminated by either party with 30 days' written notice.</p>
      <div class="ds-sign-marker">
        <span class="ds-sign-arrow">✍</span>
        <span>Sign here</span>
      </div>
    </div>

    <div class="ds-pad-wrap">
      <div class="ds-pad-head">
        <span>Draw your signature below</span>
        <button type="button" class="ds-clear" id="dsClear">Clear</button>
      </div>
      <canvas id="dsCanvas" class="ds-canvas" width="600" height="180"></canvas>
      <p class="ds-pad-hint" id="dsPadHint">Use your mouse, finger, or stylus to sign.</p>
    </div>

    <button type="button" class="ds-submit" id="dsSubmit" disabled>Sign &amp; Submit</button>
  </div>

  <div class="ds-view ds-view--confirm" id="ds-confirmView" hidden>
    <div class="ds-check">✓</div>
    <h2>Document signed</h2>
    <p class="ds-confirm-sub">Your signature has been recorded and applied to the document.</p>
    <div class="ds-signed-preview">
      <img id="dsSignedImg" alt="Captured signature" />
      <span class="ds-timestamp" id="dsTimestamp"></span>
    </div>
    <button type="button" class="ds-restart" id="dsRestart">Sign another document</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e8ebf4;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.ds-card{width:100%;max-width:560px;background:#131622;border:1px solid #242a3c;border-radius:16px;padding:24px}
.ds-doc{background:#0f1119;border:1px solid #202538;border-radius:12px;padding:18px 20px;margin-bottom:20px}
.ds-doc-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
.ds-doc-head h2{font-size:16px;margin:0}
.ds-doc-pages{font-size:11.5px;color:#767f98}
.ds-doc p{font-size:12.5px;line-height:1.7;color:#9aa1b8;margin:0 0 10px}
.ds-sign-marker{display:flex;align-items:center;gap:8px;margin-top:14px;padding:10px 12px;border:1.5px dashed #6f8dff;border-radius:8px;background:#161b2c;color:#a9b7ff;font-size:12.5px;font-weight:600}
.ds-sign-arrow{font-size:16px}
.ds-pad-wrap{margin-bottom:18px}
.ds-pad-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.ds-pad-head span{font-size:12.5px;font-weight:600;color:#aab0c4}
.ds-clear{background:transparent;border:1px solid #2c3248;color:#9aa1b8;padding:5px 12px;border-radius:8px;font-size:11.5px;cursor:pointer}
.ds-clear:hover{border-color:#4a5270;color:#e8ebf4}
.ds-canvas{width:100%;height:180px;background:#fff;border-radius:10px;border:1px solid #2c3248;touch-action:none;cursor:crosshair;display:block}
.ds-pad-hint{font-size:11.5px;color:#767f98;margin:8px 0 0}
.ds-submit{width:100%;background:#2c3248;color:#767f98;border:none;padding:13px;border-radius:10px;font-size:14px;font-weight:700;cursor:not-allowed;transition:background .2s ease,color .2s ease}
.ds-submit:not(:disabled){background:#6f8dff;color:#0b0e1a;cursor:pointer}
.ds-submit:not(:disabled):hover{background:#89a2ff}
.ds-view--confirm{text-align:center}
.ds-check{width:52px;height:52px;border-radius:50%;background:#173523;color:#5fe0a0;font-size:26px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.ds-confirm-sub{font-size:13.5px;color:#9aa1b8;margin:0 0 18px}
.ds-signed-preview{background:#fff;border-radius:10px;padding:14px;margin-bottom:10px;position:relative}
.ds-signed-preview img{width:100%;height:auto;display:block}
.ds-timestamp{display:block;text-align:right;font-size:10.5px;color:#8b8f9c;margin-top:6px;font-style:italic}
.ds-restart{width:100%;background:#6f8dff;color:#0b0e1a;border:none;padding:13px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;margin-top:14px}
.ds-restart:hover{background:#89a2ff}`,

  js: `// Real freehand signature capture using the Canvas 2D API + Pointer Events.
const canvas = document.getElementById('dsCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('dsClear');
const submitBtn = document.getElementById('dsSubmit');
const padHint = document.getElementById('dsPadHint');

const signView = document.getElementById('ds-signView');
const confirmView = document.getElementById('ds-confirmView');
const signedImg = document.getElementById('dsSignedImg');
const timestampEl = document.getElementById('dsTimestamp');
const restartBtn = document.getElementById('dsRestart');

let drawing = false;
let hasDrawn = false;
let lastX = 0;
let lastY = 0;

ctx.lineWidth = 2.4;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = '#1a1f2e';

// Canvas internal resolution vs. displayed CSS size can differ; map pointer
// coordinates from client space into canvas coordinate space.
function getCanvasPoint(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function startStroke(e) {
  drawing = true;
  const p = getCanvasPoint(e);
  lastX = p.x;
  lastY = p.y;
  canvas.setPointerCapture(e.pointerId);
}

function continueStroke(e) {
  if (!drawing) return;
  const p = getCanvasPoint(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
  lastX = p.x;
  lastY = p.y;

  if (!hasDrawn) {
    hasDrawn = true;
    submitBtn.disabled = false;
    padHint.textContent = 'Looks good — click "Sign & Submit" when ready.';
  }
}

function endStroke(e) {
  drawing = false;
  if (e && canvas.hasPointerCapture(e.pointerId)) {
    canvas.releasePointerCapture(e.pointerId);
  }
}

canvas.addEventListener('pointerdown', startStroke);
canvas.addEventListener('pointermove', continueStroke);
canvas.addEventListener('pointerup', endStroke);
canvas.addEventListener('pointercancel', endStroke);
canvas.addEventListener('pointerleave', () => { if (drawing) drawing = false; });

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasDrawn = false;
  submitBtn.disabled = true;
  padHint.textContent = 'Use your mouse, finger, or stylus to sign.';
});

submitBtn.addEventListener('click', () => {
  if (submitBtn.disabled) return;
  signedImg.src = canvas.toDataURL('image/png');
  const now = new Date();
  timestampEl.textContent = 'Signed ' + now.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  signView.hidden = true;
  confirmView.hidden = false;
});

restartBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasDrawn = false;
  submitBtn.disabled = true;
  padHint.textContent = 'Use your mouse, finger, or stylus to sign.';
  confirmView.hidden = true;
  signView.hidden = false;
});`,

  seo: {
    title: 'Document E-Signature Flow — Free Canvas Signature Pad + Sign Flow',
    description: `A document e-signature flow with a real freehand Canvas signature pad (pointer events, not a static image), a Clear button, and a Sign & Submit step that shows a signed confirmation with timestamp. Plain HTML, CSS & JS.`,
    about: {
      title: 'Document E-Signature Flow — Real Freehand Signing, Start to Confirmation',
      description: `The document e-signature flow is the pattern behind every "sign this contract in your browser" experience: a document preview with a marked signing location, a pad to actually draw a signature, and a confirmation once it's submitted. This snippet implements genuine freehand drawing with the Canvas 2D API and Pointer Events — not a placeholder image or a typed-name stand-in.

**A document preview with a clear signing target**

The top of the card shows a mock agreement excerpt with a dashed "Sign here" marker, so the pad below has visible context for what it's attached to — mirroring how real e-signature tools (like DocuSign) anchor a signature to a specific spot in a document.

**Real strokes via Pointer Events**

The pad listens for \`pointerdown\`, \`pointermove\`, and \`pointerup\` (plus \`pointercancel\`/\`pointerleave\` for robustness) rather than separate mouse and touch handlers — Pointer Events unify mouse, touch, and stylus input into one API, and \`canvas.setPointerCapture(e.pointerId)\` keeps the stroke tracking even if the pointer briefly leaves the canvas bounds mid-drag.

**Coordinate mapping, not just raw pixels**

\`getCanvasPoint()\` converts a pointer's \`clientX\`/\`clientY\` into the canvas's internal coordinate space by scaling against \`canvas.getBoundingClientRect()\` — necessary because the canvas's CSS display size (\`width: 100%\`) and its internal drawing resolution (\`width="600" height="180"\`) aren't the same, and drawing without this conversion would misalign the ink from the cursor on any non-1:1 scaling.

**Segment-by-segment stroke drawing**

Each \`pointermove\` draws a line segment from the last recorded point to the current one (\`ctx.moveTo\` → \`ctx.lineTo\` → \`ctx.stroke()\`) with round line caps and joins, which is what produces a smooth continuous signature rather than disconnected dots.

**Submit disabled until something is actually drawn**

\`hasDrawn\` only flips true on the first real stroke segment, and the Sign & Submit button stays disabled until then — so an empty signature can't be submitted. Clear resets both the canvas pixels and this flag together.

**A real captured image in the confirmation**

On submit, \`canvas.toDataURL('image/png')\` captures the actual drawn strokes as a PNG data URL and displays it in the confirmation view alongside a formatted timestamp — so what's shown afterward is the literal signature the user drew, not a mock.

**Customizing it**

Change stroke color/width, add a typed-name fallback for accessibility, or send the \`toDataURL()\` output to a real document-signing backend instead of just displaying it. Pair it with [signature pad](/ui-snippets/signature-pad/) or [terms acceptance checkbox](/ui-snippets/terms-acceptance-checkbox/) as a pre-step.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The document preview and empty pad render.` },
      { title: 'Draw on the pad', text: `Mouse, touch, or stylus — pointer events handle all.` },
      { title: 'Clear if needed', text: `Resets the canvas and disables Submit again.` },
      { title: 'Click "Sign & Submit"', text: `Enabled only once a real stroke was drawn.` },
      { title: 'View the confirmation', text: `The captured PNG and a real timestamp appear.` },
      { title: 'Sign another document', text: `Resets the pad and returns to the sign view.` },
    ] },
    features: [
      { title: 'Real freehand drawing', text: `Canvas 2D strokes, not a static placeholder.` },
      { title: 'Unified pointer events', text: `Mouse, touch, and stylus via one event set.` },
      { title: 'Coordinate-space mapping', text: `Aligns ink precisely under the cursor.` },
      { title: 'Pointer capture', text: `Keeps tracking a stroke past canvas edges.` },
      { title: 'Empty-signature guard', text: `Submit stays disabled until something is drawn.` },
      { title: 'Clear button', text: `Resets both pixels and the drawn-state flag.` },
      { title: 'Captured PNG confirmation', text: `toDataURL shows exactly what was drawn.` },
      { title: 'Real formatted timestamp', text: `toLocaleString records the actual sign time.` },
    ],
    useCases: [
      { title: 'Contract and agreement signing', text: 'Provide a self-contained sign-here flow with a real canvas signature pad, a Clear button and a timestamped confirmation after Sign and Submit.' },
      { title: 'Delivery proof of receipt', text: 'Capture a recipient\'s signature on delivery, with pointer capture keeping the stroke tracking even when the finger leaves the canvas edge.' },
      { title: 'HR onboarding paperwork', text: 'Sign offer letters or policy acknowledgements in the browser, with unified pointer events supporting mouse, touch and stylus identically.' },
      { title: 'Consent forms', text: 'Pair with a [terms acceptance checkbox](/ui-snippets/terms-acceptance-checkbox/) so a person agrees to the terms and then signs, with coordinate mapping putting ink exactly under the cursor.' },
      { title: 'Standalone pad reuse', text: 'Lift the pad out as a [signature pad](/ui-snippets/signature-pad/) for any capture task, such as a field service customer signing off a completed job.' },
      { icon: 'CODE', title: 'Related: Focus Mode / Do Not Disturb Status Toggle', desc: 'See the [Focus Mode / Do Not Disturb Status Toggle](/ui-snippets/focus-status-toggle/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this a real drawable signature pad, or a static image?', a: `It's real freehand drawing on an HTML5 canvas using pointerdown/pointermove/pointerup events. Every stroke you see is drawn segment-by-segment as the pointer moves, captured with canvas.toDataURL('image/png') on submit — there's no placeholder image involved.` },
      { q: 'Why use Pointer Events instead of separate mouse and touch handlers?', a: `Pointer Events (pointerdown/pointermove/pointerup/pointercancel) unify mouse, touch, and stylus input into a single API, so one set of handlers works across input types without duplicating logic for MouseEvent and TouchEvent separately. setPointerCapture also keeps a stroke tracking smoothly even if the pointer moves faster than the canvas bounds during a fast drag.` },
      { q: 'Why does the code convert client coordinates before drawing?', a: `The canvas has a CSS display size (width: 100% of its container) that can differ from its internal drawing resolution (width="600" height="180"). getCanvasPoint() scales clientX/clientY from getBoundingClientRect() into the canvas's actual coordinate space, so the ink lands exactly under the cursor regardless of how the canvas is scaled by CSS.` },
      { q: 'Can the Submit button be clicked with an empty signature?', a: `No — hasDrawn only becomes true the first time a real stroke segment is drawn, and Sign & Submit stays disabled until then. Clicking Clear resets both the canvas and hasDrawn together, re-disabling the button.` },
      { q: 'How do I send the signature to a real backend?', a: `In the submit handler, instead of (or in addition to) setting signedImg.src to the toDataURL() output, POST that data URL (or convert it to a Blob first) to your document-signing API along with the document ID and signer identity, then update the confirmation view once the server confirms it was recorded.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why getCanvasPoint() maps clientX/clientY through getBoundingClientRect() and a scale factor instead of using the raw pointer coordinates directly, and why Pointer Events with setPointerCapture are the right choice over separate mouse/touch handlers for a signature pad. It can help you add signature smoothing (e.g. quadratic curve interpolation between points for a less jagged line), support multiple document pages with a signature required on each, or wire the toDataURL() output to a real signing backend with proper consent logging alongside the timestamp.`,
      prompt: `Build a "document e-signature flow" in plain HTML, CSS, and JavaScript (no dependencies).

Requirements:
- A document preview area showing a short mock agreement excerpt with a visually distinct "Sign here" marker indicating where the signature applies.
- A REAL freehand signature pad implemented with an HTML5 <canvas> element and the Canvas 2D drawing API, driven by pointerdown/pointermove/pointerup (and pointercancel/pointerleave for robustness) Pointer Events — not mouse-only events, not a static placeholder image, and not a typed-name substitute.
- Correctly map pointer client coordinates into the canvas's internal drawing coordinate space (accounting for the canvas's CSS display size potentially differing from its width/height attributes) so strokes align precisely under the cursor/finger/stylus at any scale.
- Use canvas.setPointerCapture on pointerdown so a stroke keeps tracking smoothly even during a fast drag near the canvas edge.
- A Clear button that resets the canvas pixels and any "has the user drawn something" state together.
- A "Sign & Submit" button that stays disabled until at least one real stroke has been drawn (guard against submitting an empty signature), and on click captures the canvas content via toDataURL('image/png'), then transitions to a confirmation view showing that captured image and a real formatted timestamp (e.g. via toLocaleString) of when it was signed.
- A way to return to the signing view and sign again, resetting the canvas and button state cleanly.`,
    },
  },
};

export default documentSignatureFlow;
