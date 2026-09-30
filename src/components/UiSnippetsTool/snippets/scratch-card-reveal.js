const scratchCardReveal = {
  id: 'scratch-card-reveal',
  title: 'Scratch Card Reveal',
  category: 'animations',
  description: 'Free scratch card reveal HTML CSS JavaScript snippet. Canvas overlay erased with destination-out compositing as the user drags, percentage-based reveal detection auto-clears the card past a threshold.',
  html: `<div class="demo">
  <div class="card">
    <div class="prize">
      <span class="label">YOU WON</span>
      <span class="amount">25% OFF</span>
      <span class="hint">Use code SCRATCH25 at checkout</span>
    </div>
    <canvas class="scratch-layer" width="320" height="180"></canvas>
    <div class="reveal-msg">Scratched clear! Code copied below.</div>
  </div>
  <button class="reset-btn" type="button">Reset card</button>
</div>`,
  css: `.demo {
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  background: linear-gradient(135deg, #1e1b4b, #312e81);
}
.card {
  position: relative;
  width: 320px;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}
.prize {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(135deg, #f59e0b, #ec4899);
  color: #fff;
  text-align: center;
}
.prize .label {
  font-size: 12px;
  letter-spacing: 2px;
  opacity: 0.85;
}
.prize .amount {
  font-size: 32px;
  font-weight: 800;
}
.prize .hint {
  font-size: 13px;
  background: rgba(0,0,0,0.2);
  padding: 4px 12px;
  border-radius: 999px;
}
.scratch-layer {
  position: absolute;
  inset: 0;
  cursor: grab;
  touch-action: none;
}
.scratch-layer.cleared {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.reveal-msg {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translate(-50%, 12px);
  background: rgba(15,23,42,0.85);
  color: #fff;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 999px;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  white-space: nowrap;
}
.reveal-msg.show {
  opacity: 1;
  transform: translate(-50%, 0);
}
.reset-btn {
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: #e5e7eb;
  font-size: 13px;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.reset-btn:hover {
  background: rgba(255,255,255,0.16);
  border-color: rgba(255,255,255,0.4);
}`,
  js: `const canvas = document.querySelector('.scratch-layer');
const ctx = canvas.getContext('2d');
const card = document.querySelector('.card');
const msg = document.querySelector('.reveal-msg');
const resetBtn = document.querySelector('.reset-btn');

const CLEAR_THRESHOLD = 0.55;
let scratching = false;
let cleared = false;

function paintLayer() {
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#cbd5e1');
  grad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(15,23,42,0.55)';
  ctx.font = '700 16px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);

  ctx.globalCompositeOperation = 'source-over';
}

function reset() {
  cleared = false;
  canvas.classList.remove('cleared');
  msg.classList.remove('show');
  paintLayer();
}

function pointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  const point = e.touches ? e.touches[0] : e;
  return {
    x: ((point.clientX - rect.left) / rect.width) * canvas.width,
    y: ((point.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function scratchAt(x, y) {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
}

function checkCleared() {
  if (cleared) return;
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let transparent = 0;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 30) transparent++;
  }
  const ratio = transparent / (pixels.length / 4);
  if (ratio > CLEAR_THRESHOLD) {
    cleared = true;
    canvas.classList.add('cleared');
    msg.classList.add('show');
  }
}

function start(e) {
  scratching = true;
  canvas.style.cursor = 'grabbing';
  const { x, y } = pointerPos(e);
  scratchAt(x, y);
}
function move(e) {
  if (!scratching || cleared) return;
  e.preventDefault();
  const { x, y } = pointerPos(e);
  scratchAt(x, y);
  checkCleared();
}
function end() {
  scratching = false;
  canvas.style.cursor = 'grab';
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', move);
window.addEventListener('mouseup', end);
canvas.addEventListener('touchstart', start, { passive: true });
canvas.addEventListener('touchmove', move, { passive: false });
canvas.addEventListener('touchend', end);

resetBtn.addEventListener('click', reset);

paintLayer();`,
  seo: {
    title: 'Scratch Card Reveal — Free HTML CSS JS Canvas Snippet',
    description: 'Scratch-to-reveal promo card using Canvas destination-out erasing with pixel-sampling auto-clear. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How this scratch card reveal was built — Canvas compositing and pixel sampling',
      description: `This snippet recreates the "scratch-to-win" promo card you see in loyalty apps, email campaigns, and game-style discount popups — drag across a frosted overlay and a hidden prize erodes into view underneath, exactly like scratching a physical lottery ticket. The whole effect runs on a single \`<canvas>\` layered on top of a plain HTML prize card, with zero dependencies and about 90 lines of JavaScript.

**Painting the scratch layer**

A \`paintLayer()\` function fills the canvas with a brushed-metal linear gradient (\`#cbd5e1\` to \`#94a3b8\`) and stamps "SCRATCH HERE" across the middle in semi-transparent text. That canvas sits directly over a \`.prize\` div containing the badge, headline, and discount code — the prize is real DOM markup the whole time, just hidden behind an opaque layer of pixels. If you want to see the same gradient-fill-and-text primitives applied to a different effect, the [Sparkline Chart](/ui-snippets/sparkline-chart) snippet draws its lines and fills with the very same canvas building blocks, just arranged into a data visualization instead of a prize layer.

**Erasing with \`destination-out\` compositing**

The actual "scratching" is one line of canvas magic: \`ctx.globalCompositeOperation = 'destination-out'\`. In this mode, anything you draw doesn't add new pixels — it *subtracts* from what's already there, punching transparent holes wherever the new shape overlaps the existing layer. Each pointer move calls \`scratchAt(x, y)\`, which draws a filled circle (\`ctx.arc\` + \`ctx.fill\`) at the cursor position; because of the composite mode, that circle erases a soft round patch of the gradient instead of painting over it, revealing the prize card underneath pixel by pixel.

**Detecting "fully scratched" with pixel sampling**

Rather than waiting for the visitor to scratch every last pixel — which feels tedious and often never quite happens — \`checkCleared()\` reads the canvas's raw pixel data with \`ctx.getImageData()\` and walks every fourth byte (the alpha channel) to count how many pixels have become transparent. Once that ratio crosses a \`CLEAR_THRESHOLD\` of 0.55 (55% scratched away), the snippet fades the whole canvas out with a CSS \`opacity\` transition and slides in a "Scratched clear!" confirmation message — so the reveal feels generous and complete well before every pixel is gone.

**Pointer and touch in one code path**

A small \`pointerPos()\` helper normalizes both \`mousemove\` and \`touchmove\` events into the same \`{x, y}\` shape, scaling client coordinates into canvas-space coordinates via \`getBoundingClientRect()\`. That lets \`start\`, \`move\`, and \`end\` handle mouse and touch identically — register both event families once, and the scratching works the same whether someone drags with a mouse on desktop or a finger on a phone, with \`touch-action: none\` on the canvas preventing the page from scrolling mid-scratch.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Stack the prize card under a canvas', text: 'Place the real prize markup (badge, headline, code) inside a `.prize` div, then layer an absolutely-positioned `<canvas class="scratch-layer">` directly on top of it with `inset: 0`.' },
        { title: 'Paint the opaque scratch surface', text: 'On load, fill the canvas with a `createLinearGradient` and draw "SCRATCH HERE" text over it inside a `paintLayer()` function — this is the layer the visitor erases.' },
        { title: 'Erase with destination-out compositing', text: 'Set `ctx.globalCompositeOperation = "destination-out"` before drawing, then stamp filled circles (`ctx.arc` + `ctx.fill`) at the pointer position on every `mousemove`/`touchmove` to punch transparent holes in the layer.' },
        { title: 'Sample pixels to detect "enough" scratching', text: 'Read `ctx.getImageData()` and count transparent pixels by checking the alpha byte (`pixels[i] < 30`). Once the transparent ratio passes a threshold (e.g. 0.55), treat the card as cleared.' },
        { title: 'Auto-clear and show the reveal message', text: 'When the threshold is hit, add a `.cleared` class that fades the canvas to `opacity: 0` via CSS transition, and toggle a `.show` class on the confirmation message so it slides into view.' },
        { title: 'Wire up mouse and touch together', text: 'Normalize coordinates with a `pointerPos()` helper that reads `e.touches?.[0] ?? e`, and register both `mousedown`/`mousemove`/`mouseup` and `touchstart`/`touchmove`/`touchend` so the same handlers drive desktop and mobile.' },
      ],
    },
    features: [
      'Canvas `destination-out` compositing — drawn shapes erase existing pixels instead of painting over them, the exact mechanic that makes a scratch surface feel real',
      'Pixel-sampling reveal detection — `getImageData()` counts transparent pixels and auto-clears the card once a configurable percentage threshold is crossed, so visitors never have to scratch every corner',
      'Real DOM prize content underneath — the badge, headline, and code are plain HTML hidden by the canvas, so the "prize" stays selectable, accessible, and easy to restyle without touching any drawing code',
      'Unified mouse + touch handling — a single `pointerPos()` helper normalizes both input types into canvas-space coordinates, with `touch-action: none` to stop page scroll while scratching',
      'Smooth fade-and-reveal finish — a CSS `opacity` transition dissolves the spent overlay and a slide-up confirmation message appears, instead of an abrupt cut to the prize',
      'One-click reset — a "Reset card" button repaints the scratch layer and clears all state, perfect for demos or repeatable promo widgets',
      'Zero dependencies — pure Canvas 2D API and vanilla JavaScript; copy the HTML, CSS, and JS into any page and it runs immediately',
    ],
    useCases: [
      { icon: 'STAR', title: 'Loyalty and rewards promos', desc: 'Drop a scratch card into a loyalty dashboard or post-purchase page to reveal a discount code, bonus points, or surprise gift — the physical-ticket metaphor drives genuine excitement and higher engagement than a plain coupon banner.' },
      { icon: 'WRITE', title: 'Email and landing-page campaigns', desc: 'Embed the interaction on a campaign landing page tied to an email blast — "Scratch to reveal your offer" consistently pulls more interaction than a static "Click to reveal" button.' },
      { icon: 'FLOW', title: 'Onboarding and gamified milestones', desc: 'Use the reveal as a celebratory unlock for completing a signup flow, tutorial, or first purchase — pairs naturally with the [Confetti Celebration Card](/ui-snippets/confetti-celebration-card) for a two-step "complete, then celebrate" sequence.' },
      { icon: 'CODE', title: 'Learning canvas compositing modes', desc: 'A focused, real-world example of `globalCompositeOperation` — the same family of techniques (`destination-out`, `source-atop`, `lighter`, etc.) used in image editors, masking tools, and particle effects.' },
      { icon: 'DESIGN', title: 'Game-style discount widgets for e-commerce', desc: 'Replace a static "10% off" banner with an interactive scratch-to-win card on a cart or checkout page — the act of scratching makes the discount feel earned rather than handed out.' },
      { icon: 'LEARN', title: 'A reference for pixel-data inspection', desc: 'The `getImageData()` sampling loop is a clean, copyable pattern any time you need to measure how much of a canvas has changed — useful well beyond scratch cards, in drawing apps, masking tools, or progress trackers.' },
    ],
    faqs: [
      { q: 'How does the scratch effect actually erase the canvas instead of drawing over it?', a: 'By setting `ctx.globalCompositeOperation = "destination-out"` before drawing. In that mode, new shapes subtract from the canvas\'s existing pixels rather than painting on top — so stamping a filled circle at the cursor position punches a transparent hole in the overlay, revealing whatever sits underneath (in this case, a real HTML prize card).' },
      { q: 'How does the snippet know when the card has been "fully" scratched?', a: 'It does not wait for 100% — that would feel tedious. Instead, `checkCleared()` calls `ctx.getImageData()` to read every pixel\'s alpha value and counts how many have become transparent. Once that count divided by the total pixel count passes `CLEAR_THRESHOLD` (set to 0.55, i.e. 55%), the card is treated as revealed: the canvas fades out and a confirmation message appears.' },
      { q: 'Can I make the scratch brush bigger or change its shape?', a: 'Yes — `scratchAt(x, y)` draws a filled circle with `ctx.arc(x, y, 18, 0, Math.PI * 2)`. Increase the radius (the `18`) for a fatter brush, or replace the `arc` call with a different path — a rounded rectangle, a star, or even a custom SVG-derived shape — to change the scratch tool\'s footprint.' },
      { q: 'Does this work on touchscreens, or only with a mouse?', a: 'Both. A `pointerPos()` helper reads `e.touches?.[0] ?? e` so the same coordinate math works for `mousemove` and `touchmove`. The canvas also sets `touch-action: none`, which stops the browser from scrolling the page while a finger drags across it — without that, scratching on mobile would fight with the page scroll gesture.' },
      { q: 'How do I change what prize or message gets revealed underneath?', a: 'Edit the markup inside `.prize` — the badge text, headline, and hint are plain HTML, not canvas drawing, so you can restyle or replace them freely (swap in a gift icon, a percentage-off headline, a referral code, anything). The scratch mechanics in the JS do not need to change at all; they only operate on the canvas overlay sitting above whatever content you put underneath it.' },
      { q: 'Can I use this scratch card snippet on my own site for free, including commercial projects?', a: 'Yes — copy the HTML, CSS, and JS with the buttons on this page and use them anywhere, including commercial products, with no attribution required. The snippet uses only the native Canvas 2D API and vanilla JavaScript, so there are no licensing concerns or third-party dependencies to track.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the compositing math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting globalCompositeOperation to destination-out makes a filled arc erase pixels instead of painting over them, and why checkCleared reads the alpha byte at every fourth index of the ImageData array rather than every byte. The same assistant is useful for optimizing it — ask whether calling getImageData on the full canvas after every single pointermove is wasteful once the card is large or scratched rapidly, and how to throttle that sampling without missing the moment the threshold is crossed. It is just as useful for extending the effect — ask it to make the scratch brush a soft-edged gradient instead of a hard-edged circle, add a haptic or sound cue at the threshold crossing, or generalize the prize layer to load an arbitrary background image instead of a solid gradient. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scratch card" reveal in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no images, no libraries, no CSS mask tricks.

Requirements:
- A prize layer built from real HTML (a badge, headline, and code), with a canvas element absolutely positioned directly on top of it at the same size, covering the prize completely.
- On load, paint the canvas with an opaque linear gradient plus centered text like "SCRATCH HERE", so the prize underneath is fully hidden by real pixels, not by CSS opacity or visibility.
- Implement the actual scratching by setting ctx.globalCompositeOperation to destination-out before drawing, then stamping filled circles at the pointer position on every move — this composite mode must be the mechanism that erases existing canvas pixels rather than painting new ones on top.
- Normalize both mouse and touch input into the same coordinate math with one helper function that converts client coordinates into canvas-space coordinates via getBoundingClientRect, and register mousedown/mousemove/mouseup alongside touchstart/touchmove/touchend so the same scratch logic drives both input types, with touch-action: none on the canvas to stop the page from scrolling mid-gesture.
- Implement threshold-based auto-clearing: periodically call getImageData on the canvas, walk the pixel array checking only the alpha channel (every 4th byte) to count how many pixels have become transparent, and once that fraction crosses a configurable ratio (for example 0.55), treat the card as fully revealed.
- On crossing the threshold, fade the entire canvas out via a CSS opacity transition (add a class rather than removing the canvas outright) and reveal a confirmation message, plus provide a reset function that repaints the canvas and clears all scratch state back to the covered starting condition.`,
    },
  },
};

export default scratchCardReveal;
