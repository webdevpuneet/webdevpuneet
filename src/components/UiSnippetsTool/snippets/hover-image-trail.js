const hoverImageTrail = {
  id: 'hover-image-trail',
  title: 'Hover Image Trail',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="hi-stage" id="hiStage">
  <h2 class="hi-title">Move your cursor</h2>
  <p class="hi-sub">A trail of images chases the pointer and fades away.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#f4f4f8}

.hi-stage{position:relative;height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:crosshair;touch-action:none}
.hi-title{font-size:clamp(30px,7vw,64px);font-weight:900;letter-spacing:-.03em;pointer-events:none}
.hi-sub{color:#7a7a92;pointer-events:none}

.hi-img{position:absolute;width:150px;height:190px;border-radius:14px;object-fit:cover;pointer-events:none;will-change:transform,opacity;transform:translate(-50%,-50%) scale(.4);opacity:0;box-shadow:0 18px 40px -16px rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.1)}
.hi-img.show{animation:hiPop .9s cubic-bezier(.22,1,.36,1) forwards}
@keyframes hiPop{
  0%{opacity:0;transform:translate(-50%,-50%) scale(.4) rotate(var(--r))}
  18%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0deg)}
  100%{opacity:0;transform:translate(-50%,-50%) scale(.92) rotate(calc(var(--r) * -.5)) translateY(26px)}
}`,

  js: `var stage = document.getElementById('hiStage');
// Gradient data-URI tiles keep the demo dependency-free; swap for real <img> src.
var COLORS = ['6366f1','ec4899','f59e0b','22d3ee','34d399','fb7185','a78bfa','60a5fa'];
function tile(hex) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="190">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#' + hex + '"/><stop offset="1" stop-color="#0a0a0f"/>' +
    '</linearGradient></defs><rect width="150" height="190" fill="url(#g)"/></svg>';
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

var imgs = COLORS.map(function (c) {
  var img = document.createElement('img');
  img.className = 'hi-img';
  img.src = tile(c);
  img.alt = '';
  stage.appendChild(img);
  return img;
});

var idx = 0, lastX = 0, lastY = 0, threshold = 70;

function spawn(x, y) {
  var img = imgs[idx % imgs.length];
  idx++;
  var rect = stage.getBoundingClientRect();
  img.style.left = (x - rect.left) + 'px';
  img.style.top = (y - rect.top) + 'px';
  img.style.setProperty('--r', (Math.random() * 26 - 13) + 'deg');
  // Restart the animation by removing and re-adding the class.
  img.classList.remove('show');
  void img.offsetWidth;   // force reflow so the animation replays
  img.classList.add('show');
}

function onMove(x, y) {
  var dx = x - lastX, dy = y - lastY;
  // Only drop a new image once the pointer has traveled far enough — this
  // spaces the trail evenly regardless of how fast the cursor moves.
  if (Math.sqrt(dx * dx + dy * dy) < threshold) return;
  lastX = x; lastY = y;
  spawn(x, y);
}

stage.addEventListener('mousemove', function (e) { onMove(e.clientX, e.clientY); });
stage.addEventListener('touchmove', function (e) {
  var t = e.touches[0]; onMove(t.clientX, t.clientY);
}, { passive: true });`,

  seo: {
    title: 'Hover Image Trail — Free HTML CSS JS Cursor Effect Snippet',
    description: `A trail of images that spawn along the cursor path, pop in with rotation, and fade away — spaced by distance, not time. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Hover Image Trail — Distance-Spaced Cursor Image Trail',
      description: `The hover image trail is the interactive showpiece on creative portfolios and agency sites: as you move the cursor across a section, a stream of images appears along the path, each popping in with a little rotation and then fading away behind the pointer. This snippet builds the complete effect in plain HTML, CSS, and vanilla JavaScript, with the key detail that makes it feel right — the trail is spaced by distance traveled, not by time.

**Distance-based spawning**

The naive version drops an image on every \`mousemove\` event, which floods the screen when you move slowly and leaves gaps when you move fast. Instead, this snippet tracks the last spawn position and only releases a new image once the pointer has traveled past a \`threshold\` of 70 pixels, measured with \`Math.sqrt(dx*dx + dy*dy)\`. The result is an evenly spaced trail no matter how quickly or slowly the cursor moves — the images mark out the path's geometry rather than its timing.

**A pool of recycled images**

Rather than creating and destroying DOM nodes constantly, the snippet builds a fixed pool of eight \`<img>\` elements once and cycles through them with a modulo index (\`idx % imgs.length\`). Each spawn reuses the next image in the pool, repositions it under the pointer, and replays its animation. Reusing a small pool keeps the DOM stable and avoids the garbage-collection churn of endlessly appending and removing elements.

**Replaying the CSS animation**

Each image's entrance is a single \`hiPop\` keyframe that scales it up from 0.4×, snaps any rotation back to straight, then fades out while drifting down and counter-rotating. To make the same element replay its animation on every reuse, the code removes the \`show\` class, forces a reflow by reading \`offsetWidth\`, then re-adds the class. That \`void img.offsetWidth\` line is the classic trick to restart a CSS animation — without it the browser coalesces the class changes and the animation never re-triggers.

**Per-image randomized rotation**

Each spawn sets a CSS custom property \`--r\` to a random angle between -13° and 13°. The keyframe reads \`--r\` so every image enters at a slightly different tilt and exits counter-rotating, which keeps the trail organic instead of looking like identical stamps. Because the randomness lives in a CSS variable, the animation itself stays a single shared keyframe.

**Dependency-free image tiles**

So the snippet runs with zero assets, each "photo" is generated as an inline SVG gradient encoded as a data URI. In a real build you'd point each pool image's \`src\` at actual photos — the spawning, spacing, and animation logic doesn't change. The images are \`pointer-events: none\` so they never intercept the cursor, and the heading is too, so movement tracking is uninterrupted.

**Touch support**

A \`touchmove\` listener (registered \`passive\`) feeds the same \`onMove\` function using the first touch point, so dragging a finger across the stage produces the same trail on mobile. The stage sets \`touch-action: none\` so the gesture isn't hijacked by the browser's scroll.

**Customizing it**

Lower the \`threshold\` for a denser trail or raise it for a sparser one, change the image dimensions, lengthen the \`hiPop\` duration for slower fades, or widen the random rotation range for more chaos. Swap the SVG tiles for your portfolio images and you have a signature landing interaction. Pair it with a [sparkles text](/ui-snippets/sparkles-text/) headline or a [custom cursor](/ui-snippets/custom-cursor/) for a fully bespoke pointer experience.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A full-height stage renders with a centered prompt.` },
      { title: 'Move the cursor', text: `Images appear along the path, popping in with a slight tilt.` },
      { title: 'Move fast or slow', text: `The trail stays evenly spaced because it is distance-based.` },
      { title: 'Watch them fade', text: `Each image drifts down, counter-rotates, and fades out.` },
      { title: 'Try on touch', text: `Drag a finger to produce the same trail on mobile.` },
      { title: 'Swap in real photos', text: `Point each pool image src at your portfolio images.` },
    ] },
    features: [
      { title: 'Distance-based spacing', text: `New images spawn only after 70px of travel.` },
      { title: 'Recycled image pool', text: `A fixed set of nodes cycled by a modulo index.` },
      { title: 'Replayable animation', text: `A forced reflow restarts the CSS keyframe each reuse.` },
      { title: 'Randomized rotation', text: `A --r custom property tilts each image uniquely.` },
      { title: 'Pop-and-fade keyframe', text: `Scale in, settle, then drift down and fade.` },
      { title: 'Asset-free tiles', text: `Inline SVG data URIs run the demo with no files.` },
      { title: 'Touch support', text: `touchmove feeds the same spawn logic.` },
      { title: 'Non-blocking images', text: `pointer-events none keeps tracking smooth.` },
    ],
    useCases: [
      { title: 'Creative portfolios', text: `A signature hero beside a [portfolio hero](/ui-snippets/portfolio-hero/).` },
      { title: 'Agency landing pages', text: `Pair with an [agency hero](/ui-snippets/agency-hero/) headline.` },
      { title: 'Photography sites', text: `Trail real thumbnails toward a [photo gallery](/ui-snippets/photo-gallery/).` },
      { title: 'Interactive headers', text: `Combine with a [custom cursor](/ui-snippets/custom-cursor/).` },
      { title: 'Product reveals', text: `Tease shots before a [feature cards](/ui-snippets/feature-cards/) grid.` },
      { title: 'Pointer effect demos', text: `A reference for distance-spaced trail spawning.` },
      { icon: 'CODE', title: 'Related: Paper.js Vector Blob', desc: 'See the [Paper.js Vector Blob](/ui-snippets/paper-js-vector-blob/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why space the trail by distance instead of time?', a: `Time-based spawning floods the screen when the cursor moves slowly and leaves gaps when it moves fast. By only spawning after the pointer travels past a 70px threshold — measured with the Pythagorean distance between the last and current position — the images mark out the path evenly regardless of cursor speed, which is what makes the trail look deliberate.` },
      { q: 'How does it avoid creating endless DOM nodes?', a: `It builds a fixed pool of eight img elements once and cycles through them with a modulo index. Each spawn reuses the next image in the pool — repositioning it and replaying its animation — so the DOM size stays constant and there's no garbage-collection churn from constantly appending and removing elements.` },
      { q: 'How does the same image replay its animation?', a: `The code removes the show class, reads img.offsetWidth to force a synchronous reflow, then re-adds the class. That reflow is the classic trick that makes the browser register the class removal before the re-add, so the CSS keyframe restarts. Without it, the two class changes would be batched and the animation would not replay.` },
      { q: 'Can I use my own images?', a: `Yes. The demo generates SVG gradient tiles as data URIs only so it has zero dependencies. In production, set each pool image's src to a real photo URL. The spacing, recycling, rotation, and fade logic are independent of the image source, so nothing else changes.` },
      { q: 'How do I use this hover image trail in React, Vue, or Angular?', a: `Create the image pool with refs (an array of refs or a single container ref you query) and attach mousemove and touchmove listeners in a mount effect with cleanup. Keep the spawn index and last position in refs, not state, so movement doesn't trigger re-renders. The CSS keyframe and the reflow-based replay work unchanged; in Tailwind, express the keyframe in the config and the rotation via an inline --r style.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the spacing math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the trail is spaced using the Pythagorean distance between the last and current pointer position instead of a fixed timer, or what the void img.offsetWidth line is actually forcing the browser to do before the show class is re-added. The same assistant is useful for optimizing it — ask whether eight pooled images is enough for fast, erratic mouse movement or whether the threshold value should scale with pool size to avoid running out of images to reuse. It's just as handy for extending the effect: ask it to vary the image size based on cursor speed, make the trail respond to touch pressure on supporting devices, or swap the SVG gradient tiles for real lazy-loaded photographs with a fallback placeholder. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a cursor-following image trail effect in plain HTML, CSS, and JavaScript — no library, no canvas.

Requirements:
- A full-height stage element that tracks mousemove (and touchmove for mobile) events.
- A fixed pool of image elements created once up front (not created and destroyed on every movement), cycled through with a modulo index so the pool is reused indefinitely without growing the DOM.
- Track the last position at which an image was spawned, and on every pointer move compute the straight-line distance from that last spawn position to the current position using the Pythagorean theorem; only spawn a new image once that distance exceeds a fixed pixel threshold, so the trail is spaced evenly by distance traveled regardless of how fast or slow the cursor moves.
- Each spawned image must be positioned at the pointer's coordinates relative to the stage (not the viewport), assigned a random rotation angle via a CSS custom property, and play a single CSS keyframe animation that scales it up from a small size with the random rotation, snaps to full size and zero rotation, then fades out while drifting downward and rotating the opposite direction.
- Because the same pooled image elements are reused, force the CSS animation to replay from scratch on every reuse: remove the animation-triggering class, force a synchronous layout reflow by reading a layout property like offsetWidth, then re-add the class.
- All images and text must have pointer-events disabled so nothing interferes with pointer tracking, and touch handling must prevent the page from scrolling while dragging across the stage.`,
    },
  },
};

export default hoverImageTrail;
