const imageBlurUp = {
  id: 'image-blur-up',
  title: 'Image Blur-Up Loader',
  lastmod: '2026-06-16',
  category: 'loaders',
  html: `<div class="bu-stage">
  <div class="bu-gallery" id="buGallery">
    <div class="bu-card">
      <div class="bu-img" style="background:radial-gradient(circle at 30% 78%,#fbbf24 0,transparent 38%),radial-gradient(circle at 72% 28%,#fb923c 0,transparent 26%),linear-gradient(160deg,#7c2d12,#b45309 45%,#fcd34d)">
        <div class="bu-blur" style="background:radial-gradient(circle at 30% 78%,#fbbf24 0,transparent 38%),radial-gradient(circle at 72% 28%,#fb923c 0,transparent 26%),linear-gradient(160deg,#7c2d12,#b45309 45%,#fcd34d)"></div>
        <div class="bu-shimmer"></div>
      </div>
      <div class="bu-cap">Sunset Ridge</div>
    </div>
    <div class="bu-card">
      <div class="bu-img" style="background:radial-gradient(circle at 70% 68%,#67e8f9 0,transparent 34%),radial-gradient(circle at 25% 30%,#38bdf8 0,transparent 24%),linear-gradient(160deg,#0c4a6e,#0ea5e9 60%,#a5f3fc)">
        <div class="bu-blur" style="background:radial-gradient(circle at 70% 68%,#67e8f9 0,transparent 34%),radial-gradient(circle at 25% 30%,#38bdf8 0,transparent 24%),linear-gradient(160deg,#0c4a6e,#0ea5e9 60%,#a5f3fc)"></div>
        <div class="bu-shimmer"></div>
      </div>
      <div class="bu-cap">Coral Bay</div>
    </div>
    <div class="bu-card">
      <div class="bu-img" style="background:radial-gradient(circle at 40% 62%,#4ade80 0,transparent 32%),radial-gradient(circle at 78% 32%,#a3e635 0,transparent 22%),linear-gradient(160deg,#14532d,#15803d 55%,#bbf7d0)">
        <div class="bu-blur" style="background:radial-gradient(circle at 40% 62%,#4ade80 0,transparent 32%),radial-gradient(circle at 78% 32%,#a3e635 0,transparent 22%),linear-gradient(160deg,#14532d,#15803d 55%,#bbf7d0)"></div>
        <div class="bu-shimmer"></div>
      </div>
      <div class="bu-cap">Pine Hollow</div>
    </div>
    <div class="bu-card">
      <div class="bu-img" style="background:radial-gradient(circle at 60% 42%,#f0abfc 0,transparent 24%),radial-gradient(circle at 24% 72%,#818cf8 0,transparent 28%),linear-gradient(160deg,#1e1b4b,#6d28d9 60%,#ec4899)">
        <div class="bu-blur" style="background:radial-gradient(circle at 60% 42%,#f0abfc 0,transparent 24%),radial-gradient(circle at 24% 72%,#818cf8 0,transparent 28%),linear-gradient(160deg,#1e1b4b,#6d28d9 60%,#ec4899)"></div>
        <div class="bu-shimmer"></div>
      </div>
      <div class="bu-cap">Neon District</div>
    </div>
  </div>
  <button class="bu-reload" onclick="reload()">↻ Reload images</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.bu-stage{width:100%;max-width:440px}
.bu-gallery{display:grid;grid-template-columns:1fr 1fr;gap:14px}

.bu-card{position:relative;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.35)}
.bu-img{position:relative;height:130px;background-size:cover;background-position:center}
.bu-blur{position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(16px);transform:scale(1.15);opacity:1;transition:opacity .7s ease}
.bu-card.loaded .bu-blur{opacity:0}

.bu-shimmer{position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);background-size:220% 100%;animation:bu-shimmer 1.2s linear infinite;opacity:1;transition:opacity .4s}
.bu-card.loaded .bu-shimmer{opacity:0;animation:none}
@keyframes bu-shimmer{from{background-position:120% 0}to{background-position:-120% 0}}

.bu-cap{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:20px 12px 9px;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);text-shadow:0 1px 4px rgba(0,0,0,.5);opacity:0;transform:translateY(6px);transition:opacity .5s .15s,transform .5s .15s}
.bu-card.loaded .bu-cap{opacity:1;transform:translateY(0)}

.c1{--img:radial-gradient(circle at 30% 78%,#fbbf24 0,transparent 38%),radial-gradient(circle at 72% 28%,#fb923c 0,transparent 26%),linear-gradient(160deg,#7c2d12,#b45309 45%,#fcd34d)}
.c2{--img:radial-gradient(circle at 70% 68%,#67e8f9 0,transparent 34%),radial-gradient(circle at 25% 30%,#38bdf8 0,transparent 24%),linear-gradient(160deg,#0c4a6e,#0ea5e9 60%,#a5f3fc)}
.c3{--img:radial-gradient(circle at 40% 62%,#4ade80 0,transparent 32%),radial-gradient(circle at 78% 32%,#a3e635 0,transparent 22%),linear-gradient(160deg,#14532d,#15803d 55%,#bbf7d0)}
.c4{--img:radial-gradient(circle at 60% 42%,#f0abfc 0,transparent 24%),radial-gradient(circle at 24% 72%,#818cf8 0,transparent 28%),linear-gradient(160deg,#1e1b4b,#6d28d9 60%,#ec4899)}

.bu-reload{display:block;margin:20px auto 0;padding:10px 18px;background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.bu-reload:hover{background:#334155;color:#fff}`,

  js: `function loadImages() {
  var cards = document.querySelectorAll('.bu-card');
  cards.forEach(function (card, i) {
    // Simulate each image finishing its download at a staggered time.
    // In production, swap this for img.onload on the real full-resolution source.
    setTimeout(function () { card.classList.add('loaded'); }, 500 + i * 450 + Math.random() * 300);
  });
}

function reload() {
  document.querySelectorAll('.bu-card').forEach(function (card) { card.classList.remove('loaded'); });
  // Let the blurred/shimmer state paint before re-revealing.
  requestAnimationFrame(loadImages);
}

loadImages();`,

  seo: {
    title: 'Image Blur-Up Loader — Progressive Image Snippet',
    description: `Progressive blur-up image loader: a blurred placeholder with a shimmer sharpens into the full image, plus a staggered reveal. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Image Blur-Up Loader — LQIP Placeholder, Shimmer & Sharpen-On-Load Reveal`,
      description: `Blur-up is the progressive image-loading technique behind Medium, Next.js Image, and most modern media sites. Instead of a blank box or a sudden image pop-in, you show a tiny, blurred low-quality placeholder (an LQIP) immediately, then crossfade to the full-resolution image once it downloads — the picture appears to sharpen into focus. It eliminates layout shift, gives instant visual feedback, and feels premium. This snippet implements the full effect in plain HTML, CSS, and vanilla JavaScript: a blurred placeholder with an animated shimmer that sharpens into the final image, plus a staggered gallery reveal and a reload control to replay it.

**The two-layer blur-up structure**

Each card's image area renders the full image as its background, and a \`::after\` pseudo-element renders the *same* image scaled up and heavily blurred (\`filter: blur(16px)\`) on top of it at full opacity. So before "load", you see only the soft, blurred version. When the card gains the \`.loaded\` class, the blurred \`::after\` transitions its opacity to zero over 0.7s, revealing the crisp image underneath — the signature sharpen-into-focus crossfade. Scaling the blur layer slightly (\`scale(1.15)\`) hides the transparent edges that \`blur()\` would otherwise feather in.

**Shimmer while loading**

A \`::before\` layer sweeps a diagonal highlight gradient across the placeholder on a loop (\`bu-shimmer\`), the same skeleton-loader cue users associate with "content is coming". It is disabled and faded out the moment the card loads, so the shimmer never competes with the real image. The caption also fades and slides up only after load, so text never appears over a blurry, unreadable placeholder.

**Staggered, realistic reveal**

\`loadImages\` adds \`.loaded\` to each card on a staggered, slightly randomised timer (\`500 + i × 450 + random\`), mimicking how real images finish downloading at different times rather than all at once. This is purely a stand-in for the real trigger: in production you set each \`<img>\`'s \`src\` (or \`data-src\` via an \`IntersectionObserver\` for lazy loading) and add \`.loaded\` in its \`onload\` handler. The CSS does not change.

**Replayable**

\`reload\` removes \`.loaded\` from every card to restore the blurred shimmer state, then calls \`loadImages\` on the next animation frame so the browser paints the placeholder before the reveal begins again — letting you see the effect repeatedly.

The placeholders here are built from layered CSS gradients so the snippet is self-contained, but the structure maps one-to-one onto real images: use a base64 LQIP (a tiny ~20px blurred thumbnail) as the blur layer and the full file as the image. Pair this with an [infinite scroll](/ui-snippets/infinite-scroll/) feed, a [skeleton loader](/ui-snippets/skeleton-loader/) for non-image content, or a [photo gallery](/ui-snippets/photo-gallery/) grid.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 2×2 gallery appears with each tile starting blurred and shimmering, then sharpening into a crisp image one after another.` },
      { title: 'Watch the sharpen-in', text: `Each tile's blurred placeholder crossfades to the sharp image over about 0.7s, and its caption fades up once the image is clear.` },
      { title: 'Note the stagger', text: `The four tiles reveal at slightly different, randomised times — mimicking real images finishing their downloads independently.` },
      { title: 'Replay it', text: `Click "↻ Reload images" — every tile returns to the blurred shimmer state and the blur-up sequence plays again.` },
      { title: 'Swap in real images', text: `Use a tiny base64 LQIP as the blur layer and your full image as the background or \`<img>\`; add \`.loaded\` in the image's \`onload\`.` },
      { title: 'Add lazy loading', text: `Trigger the load via an \`IntersectionObserver\` so each image only starts downloading when it scrolls near the viewport.` },
    ] },
    features: [
      { title: 'Two-layer blur-up', text: `A \`::after\` renders the same image blurred over the sharp original; fading it out on load produces the sharpen-into-focus crossfade.` },
      { title: 'Edge-clean blur', text: `The blur layer is scaled to \`1.15\` so \`filter: blur()\` does not feather transparent edges into the tile.` },
      { title: 'Loading shimmer', text: `A \`::before\` sweeps a diagonal highlight on a loop while loading, the familiar "content coming" cue, then disables itself on load.` },
      { title: 'Caption gated on load', text: `The caption fades and slides up only after the image sharpens, so text never sits over an unreadable blurry placeholder.` },
      { title: 'Staggered randomised reveal', text: `\`loadImages\` adds \`.loaded\` on a per-tile staggered timer with jitter, mimicking real independent download completion.` },
      { title: 'Production-ready trigger point', text: `The simulated timeout maps directly to \`img.onload\` — swap one line to drive the reveal from real downloads.` },
      { title: 'Replayable sequence', text: `\`reload\` resets state and re-runs on the next animation frame, so the placeholder repaints before the effect replays.` },
      { title: 'Self-contained placeholders', text: `Layered CSS gradients stand in for photos, so the snippet works offline while matching the exact structure real LQIPs use.` },
    ],
    useCases: [
      { title: 'Media-heavy article pages', text: `The Medium-style technique for in-article images — show a blurred LQIP instantly, sharpen on load, zero layout shift.` },
      { title: 'Photo galleries and portfolios', text: `Reveal grid thumbnails gracefully as they load. Combine with a [photo gallery](/ui-snippets/photo-gallery/) or [image lightbox](/ui-snippets/image-lightbox/).` },
      { title: 'E-commerce product grids', text: `Load product imagery without pop-in; pair with a [product card](/ui-snippets/product-card/) grid and lazy loading for long catalogues.` },
      { title: 'Infinite-scroll feeds', text: `As new items load, their images blur-up into place. Drop it into an [infinite scroll](/ui-snippets/infinite-scroll/) feed.` },
      { title: 'Hero and banner images', text: `Avoid a blank hero by painting a blurred placeholder first, then sharpening — improves perceived load time above the fold.` },
      { title: 'Dashboards and content cards', text: `Any card with a cover image benefits; use a [skeleton loader](/ui-snippets/skeleton-loader/) for the surrounding text while the image blurs up.` },
      { icon: 'CODE', title: 'Related: Concentric Rings Progress Loader', desc: 'See the [Concentric Rings Progress Loader](/ui-snippets/loader-concentric-rings-progress/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I use this with real images?', a: `Generate a tiny (~20px wide) blurred thumbnail for each image, base64-encode it, and use it as the \`::after\` blur layer (or a separate \`<img>\`). Load the full image and add the \`.loaded\` class in its \`onload\` handler: \`img.onload = () => card.classList.add('loaded')\`. Set the full \`src\` last so the placeholder shows first. The CSS crossfade is identical.` },
      { q: 'How do I generate the low-quality placeholders (LQIP)?', a: `At build time, resize each image to ~16–24px wide and base64-encode it (tools like \`sharp\`, \`lqip\`, or \`plaiceholder\` do this). The result is a sub-1KB string you inline as the blur layer's background — no extra network request, instant render. Frameworks like Next.js Image automate this with their \`placeholder="blur"\` prop.` },
      { q: 'How do I combine blur-up with lazy loading?', a: `Wrap each card in an \`IntersectionObserver\`. The blurred LQIP shows immediately (it is inline), but only set the full image's \`src\` when the card intersects the viewport, adding \`.loaded\` on its \`onload\`. This way off-screen images cost nothing until the user scrolls near them, while still avoiding pop-in.` },
      { q: 'Does the blur-up cause layout shift (CLS)?', a: `No, as long as the image container has a fixed aspect ratio or height (this snippet sets a height). Because the placeholder occupies the final image's box from the first paint, the sharp image replaces it in place with no reflow — which is exactly why blur-up scores well on Cumulative Layout Shift.` },
      { q: 'How do I use this blur-up loader in React, Vue, or Angular?', a: `In React, track a \`loaded\` boolean per image in state, render the blur layer and the \`<img>\`, and set \`loaded\` in \`onLoad\`; toggle the class from state. In Vue, use a \`ref\` and \`@load\`. In Angular, bind \`[class.loaded]\` and \`(load)\`. Or simply use a framework image component (Next.js \`Image\` with \`placeholder="blur"\`) which implements this technique natively. The two-layer CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the crossfade layering by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the blurred layer is scaled up with scale(1.15) before the blur filter is applied, or how swapping the simulated setTimeout for a real img.onload handler would change the loadImages function while leaving the CSS untouched. The same assistant is useful for optimizing it — ask whether the shimmer animation's background-position keyframe is GPU-accelerated or would benefit from being expressed as a transform instead for smoother performance on lower-end devices. It's just as handy for extending the loader: ask it to wire real lazy loading with an IntersectionObserver so offscreen tiles don't start downloading until they approach the viewport, generate real base64 LQIP placeholders at build time instead of gradient stand-ins, or add a subtle scale-down-to-scale-up motion during the sharpen transition. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a progressive "blur-up" image loading gallery in plain HTML, CSS, and JavaScript — no library, no framework image component.

Requirements:
- A grid of image cards, each containing a base sharp image layer and a second absolutely-positioned layer directly on top showing the identical image blurred with a CSS blur filter and scaled up slightly (to hide the blur filter's feathered edges from bleeding past the tile boundary).
- Each card must also show a diagonal shimmer highlight sweeping across it on a continuous CSS keyframe animation (looping background-position) while the card is in its unloaded state, to signal "content is loading" the way a skeleton loader does.
- Add a "loaded" state class per card that, when applied, fades the blurred overlay layer's opacity to zero over roughly 0.7 seconds (revealing the sharp image beneath) and simultaneously stops and hides the shimmer animation.
- Each card's caption must start hidden and only fade in and slide up after that card receives its loaded class, with a slight additional transition delay so the caption clearly follows the image sharpening rather than appearing simultaneously.
- Simulate real-world staggered image loading by adding the loaded class to each card after a different randomized delay (not all cards at the same instant), structured so that in production this exact trigger point could be replaced by a real image element's onload event with no other code changes.
- Add a reload control that removes the loaded class from every card, waits one animation frame for the blurred/shimmering state to repaint, and then re-triggers the staggered load sequence so the whole effect can be replayed on demand.`,
    },
  },
};

export default imageBlurUp;
