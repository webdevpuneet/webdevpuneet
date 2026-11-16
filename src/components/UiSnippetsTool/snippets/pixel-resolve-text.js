const pixelResolveText = {
  id: 'pixel-resolve-text',
  title: 'Pixel Resolve Text',
  lastmod: '2026-11-15',
  category: 'text-animations',
  html: `<main class="stage">
  <h1 class="sr">Crisp at last</h1>
  <canvas id="cv" role="img" aria-label="Crisp at last"></canvas>
  <div class="row">
    <button type="button" id="resolve" class="primary">Resolve</button>
    <button type="button" id="pixelate" class="ghost">Pixelate</button>
    <label class="pace">Steps
      <select id="steps" aria-label="Number of resolution steps">
        <option value="6">6 (jumpy)</option>
        <option value="9" selected>9</option>
        <option value="14">14 (smooth)</option>
      </select>
    </label>
  </div>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#0d1117;font-family:system-ui,sans-serif}
.stage{display:grid;gap:26px;justify-items:center;padding:24px 16px;width:100%}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
canvas{width:min(760px,100%);height:auto;aspect-ratio:760/220;display:block;border:1px solid #232b38;border-radius:14px;background:#10161f}
.row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center}
button,select{font:600 13px system-ui,sans-serif;border-radius:999px;cursor:pointer}
.primary{color:#04140a;background:#4ade80;border:0;padding:10px 24px}
.ghost{color:#d3dbe8;background:transparent;border:1px solid #394456;padding:9px 20px}
.pace{display:flex;align-items:center;gap:8px;font-size:13px;color:#8996ab}
select{color:#d3dbe8;background:#161d29;border:1px solid #394456;padding:8px 12px}
:focus-visible{outline:2px solid #4ade80;outline-offset:3px}`,

  js: `var cv = document.getElementById('cv');
var ctx = cv.getContext('2d');
var TEXT = 'Crisp at last';
var W = 760, H = 220, DPR = Math.min(window.devicePixelRatio || 1, 2);
cv.width = W * DPR; cv.height = H * DPR;

// 1. Draw the sharp text once onto an offscreen canvas
var src = document.createElement('canvas');
src.width = cv.width; src.height = cv.height;
var sctx = src.getContext('2d');
function drawSource() {
  sctx.clearRect(0, 0, src.width, src.height);
  var g = sctx.createLinearGradient(0, 0, src.width, 0);
  g.addColorStop(0, '#4ade80'); g.addColorStop(1, '#38bdf8');
  sctx.fillStyle = g;
  sctx.textAlign = 'center'; sctx.textBaseline = 'middle';
  var size = 118 * DPR;                                  // largest size; shrinks if the text would not fit
  var face = 'px "Arial Black", Impact, sans-serif';
  sctx.font = '900 ' + size + face;
  var fit = (src.width * 0.88) / sctx.measureText(TEXT).width;
  if (fit < 1) { size *= fit; sctx.font = '900 ' + size + face; }
  sctx.fillText(TEXT, src.width / 2, src.height / 2 + 6 * DPR);
}

// 2. To fake a low resolution: shrink the source into a tiny canvas, then stretch it back with smoothing off
var tiny = document.createElement('canvas');
var tctx = tiny.getContext('2d');
function showAtBlock(b) {
  ctx.clearRect(0, 0, cv.width, cv.height);
  if (b <= 1) { ctx.drawImage(src, 0, 0); return; }
  var w = Math.max(1, Math.round(cv.width / b)), h = Math.max(1, Math.round(cv.height / b));
  tiny.width = w; tiny.height = h;
  tctx.clearRect(0, 0, w, h);
  tctx.drawImage(src, 0, 0, w, h);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tiny, 0, 0, w, h, 0, 0, cv.width, cv.height);
}

// Block sizes shrink geometrically from very chunky down to the real pixels
function sizes(n) {
  var out = [];
  for (var i = 0; i < n; i++) out.push(Math.max(1, Math.round(64 * DPR * Math.pow(1 / (64 * DPR), i / (n - 1)))));
  out[n - 1] = 1;
  return out;
}

var timer = null;
function play(reverse) {
  clearTimeout(timer);
  var list = sizes(parseInt(document.getElementById('steps').value, 10));
  if (reverse) list.reverse();
  var i = 0;
  (function next() {
    showAtBlock(list[i++]);
    if (i < list.length) timer = setTimeout(next, 150);
  })();
}

document.getElementById('resolve').addEventListener('click', function () { play(false); });
document.getElementById('pixelate').addEventListener('click', function () { play(true); });

drawSource();
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) showAtBlock(1);
else play(false);`,

  seo: {
    title: 'Pixel Resolve Text — Canvas Text That Sharpens From Blocks',
    description: `Headline drawn on a canvas that starts as huge pixel blocks and sharpens step by step into crisp type, or pixelates back out. Choose how many steps it takes.`,
    about: {
      title: `Pixel Resolve Text — Canvas Downscale and Nearest-Neighbour Upscale in Steps`,
      description: `Think of a low-resolution image loading, or a retro game mock-up resolving into sharp art: the picture starts as a few huge squares and gets finer until the detail snaps in. This snippet does that to a headline using the canvas. It isn't blur and it isn't a filter, but a real change of resolution, so the intermediate frames look like actual pixel art.

**How to fake a low resolution**

The sharp text is drawn once onto an offscreen canvas, filled with a green-to-cyan gradient. To show it "at block size b", the code draws that canvas into a much smaller one (width ÷ b, height ÷ b), which throws detail away, then draws the small canvas back to full size with \`imageSmoothingEnabled = false\`. With smoothing off, the browser uses nearest-neighbour scaling, so each source pixel becomes a hard-edged b×b square.

**Steps that feel even**

Block sizes aren't linear. Going from 64 to 1 in equal steps would spend most frames on blocks too small to notice a change. Instead each step multiplies by the same factor (\`Math.pow\`), so the text sharpens at a steady perceived rate; the last step is forced to exactly 1, which draws the original crisp image. A step timer of 150ms and a select for 6, 9 or 14 steps lets you trade snappy for smooth.

**Practical details**

The canvas is sized by device pixel ratio (capped at 2) so the final frame is truly sharp on retina screens. Because canvas text can't be read by search engines or screen readers, a visually hidden \`<h1>\` holds the same text and the canvas has an \`aria-label\`. Reduced-motion visitors get the sharp text immediately.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the three blocks', text: `A dark panel appears with a green-cyan headline that starts as big blocks and sharpens in nine steps. Resolve and Pixelate buttons replay it in each direction.` },
      { title: 'Change the text', text: `Edit \`TEXT\` in the JS, and update the hidden \`<h1>\` and the canvas \`aria-label\` so they match. The font starts at 118px and shrinks automatically so any text fits the 760px width; change 118 to set the largest size.` },
      { title: 'Change the colours', text: `Edit the two \`addColorStop\` values for another gradient, or set a flat \`fillStyle\`.` },
      { title: 'Set the speed', text: `The 150 in \`setTimeout\` is milliseconds per step; the select changes how many steps there are. Fewer steps with a longer delay looks more like a retro game; many fast steps looks like an image loading.` },
      { title: 'Use it as a loader', text: `Call \`play(false)\` when your content is ready, or call it on scroll into view for a one-time reveal.` },
    ] },
    features: [
      { title: 'Real pixelation', text: `The text is downscaled and stretched with smoothing off, so every frame has hard-edged blocks instead of a blur.` },
      { title: 'Geometric steps', text: `Block sizes shrink by a constant factor, so the sharpening looks even from first frame to last.` },
      { title: 'Both directions', text: `One function resolves or pixelates (it reverses the same list), so the effect can be an exit as well as an entrance.` },
      { title: 'Retina-sharp finish', text: `The canvas uses the device pixel ratio so the last frame is crisp on high-density screens.` },
      { title: 'Adjustable steps', text: `A select changes between 6, 9 and 14 steps for choppy or smooth results.` },
      { title: 'Readable by everything else', text: `A hidden \`<h1>\` and an \`aria-label\` carry the text for search engines and screen readers.` },
    ],
    useCases: [
      { title: 'Retro and game-style landing pages', text: `Title screens and "insert coin" heroes where pixel art is on-theme.` },
      { title: 'Image and video loading states', text: `Resolve a headline or logo as a progressive reveal while the page's real assets arrive.` },
      { title: 'Privacy and redaction demos', text: `Show how pixelation hides a name or number, then reverse it for contrast.` },
      { title: 'Tech and glitch-adjacent branding', text: `Cybersecurity, AI and dev-tool brands can use a resolving wordmark as an intro.` },
      { title: 'Transitions between hero messages', text: `Pixelate one phrase out, swap the text, and resolve the next phrase in.` },
    ],
    faqs: [
      { q: 'Why is the text not selectable?', a: `It's pixels on a canvas. That is why the snippet includes a visually hidden heading with the same words, which keeps the page accessible and indexable.` },
      { q: 'Why not use CSS filter or image-rendering?', a: `CSS can't pixelate live text at changing block sizes. \`image-rendering: pixelated\` only affects images, so a canvas that really resamples the picture is the simplest approach.` },
      { q: 'Can I use a custom font?', a: `Yes, but the font must be loaded before drawing. Wait for \`document.fonts.ready\` (or \`document.fonts.load()\`) and then call \`drawSource()\`, or the canvas will use the fallback font.` },
      { q: 'How can I pixelate an image instead of text?', a: `Replace the text drawing in \`drawSource()\` with \`sctx.drawImage(img, ...)\`. The downscale-then-stretch step works the same way for any picture.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant to explain why drawing a canvas into a smaller canvas and back with imageSmoothingEnabled set to false produces real pixel blocks, and why the block sizes are generated with a geometric progression rather than evenly spaced. A good follow-up is how to wait for a web font before drawing.`,
      prompt: `Build a pixel-resolve text effect on an HTML canvas in plain JavaScript, with no libraries.

Requirements:
- A canvas sized from CSS dimensions multiplied by devicePixelRatio (capped at 2). Draw the headline once onto an offscreen source canvas using a heavy font and a horizontal gradient fill.
- A function showAtBlock(b) that clears the main canvas; for b of 1 or less draws the source directly; otherwise draws the source into a tiny canvas of width/b by height/b, then draws that tiny canvas stretched to full size with imageSmoothingEnabled set to false so each pixel becomes a hard block.
- Generate the list of block sizes geometrically from about 64 down to exactly 1, with a configurable step count. A timer steps through the list every ~150ms, and the list can be reversed so the same function pixelates text instead of resolving it.
- Buttons for Resolve and Pixelate and a select for 6, 9 or 14 steps; starting a new run cancels the previous timer.
- Include a visually hidden h1 with the same text and an aria-label on the canvas. Under prefers-reduced-motion draw the sharp text immediately.`,
    },
  },
};

export default pixelResolveText;
