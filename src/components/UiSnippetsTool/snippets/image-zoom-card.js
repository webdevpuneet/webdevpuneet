const imageZoomCard = {
  id: 'image-zoom-card',
  title: 'Image Zoom Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<figure class="iz-card" id="izCard">
  <div class="iz-frame" id="izFrame">
    <div class="iz-img" id="izImg"></div>
    <span class="iz-hint">Hover to zoom</span>
  </div>
  <figcaption class="iz-cap">
    <strong>Alpine Field Watch</strong>
    <span>Sapphire crystal · 200m</span>
  </figcaption>
</figure>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0e16;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.iz-card{width:300px;background:#141826;border:1px solid #222838;border-radius:18px;overflow:hidden}
.iz-frame{position:relative;aspect-ratio:1/1;overflow:hidden;cursor:zoom-in}
.iz-img{position:absolute;inset:0;background:
  radial-gradient(circle at 30% 30%,#cbd5ff,transparent 40%),
  conic-gradient(from 200deg at 60% 55%,#4f46e5,#0ea5e9,#22c55e,#f59e0b,#ec4899,#4f46e5);
  background-color:#1b2030;
  transform:scale(1);
  transform-origin:center center;
  transition:transform .45s cubic-bezier(.22,1,.36,1)}
/* On hover the image scales up; JS sets the origin to follow the cursor. */
.iz-frame:hover .iz-img{transform:scale(2.1);transition:transform .12s ease-out}
.iz-hint{position:absolute;left:12px;bottom:12px;z-index:1;font-size:11px;font-weight:600;color:#fff;background:rgba(0,0,0,.45);backdrop-filter:blur(4px);padding:5px 10px;border-radius:999px;transition:opacity .2s;pointer-events:none}
.iz-frame:hover .iz-hint{opacity:0}
.iz-cap{padding:16px 18px;display:flex;flex-direction:column;gap:3px}
.iz-cap strong{color:#fff;font-size:15px}
.iz-cap span{font-size:13px;color:#8b93a8}`,

  js: `var frame = document.getElementById('izFrame');
var img = document.getElementById('izImg');

// Move the zoom focal point to wherever the cursor is over the frame.
frame.addEventListener('mousemove', function (e) {
  var r = frame.getBoundingClientRect();
  var x = ((e.clientX - r.left) / r.width) * 100;
  var y = ((e.clientY - r.top) / r.height) * 100;
  img.style.transformOrigin = x + '% ' + y + '%';
});

// Reset to centre so the next hover starts cleanly.
frame.addEventListener('mouseleave', function () {
  img.style.transformOrigin = 'center center';
});`,

  seo: {
    title: 'Image Zoom Card — Free HTML CSS JS Hover Zoom Product Card',
    description: `A product card whose image magnifies toward the cursor on hover using transform-origin tracking, with no second image or library. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Image Zoom Card — Magnify Toward the Cursor on Hover',
      description: `The image zoom card is the product-photo interaction from e-commerce sites: hovering the image magnifies it, and the zoom centres on wherever your cursor is, so you can inspect any part of the product. This snippet builds it with plain HTML, CSS transforms, and a four-line JavaScript handler — no magnifier lens, no high-res second image, and no library.

**Zoom by scaling, focus by transform-origin**

The trick is two CSS properties working together. On hover the image element scales up (\`transform: scale(2.1)\`), and the part that stays centred is set by \`transform-origin\`. JavaScript updates that origin on every \`mousemove\` to the cursor's position as a percentage of the frame, so the magnified region is always whatever you're pointing at. Scaling toward the cursor — rather than a fixed centre — is what makes it feel like a real magnifier sweeping across the product.

**Clipping with the frame**

The image lives in a \`.iz-frame\` with \`overflow: hidden\` and a fixed \`aspect-ratio\`, so the scaled-up image is clipped to the card and never spills over its neighbours. The frame also carries a \`cursor: zoom-in\` to signal the interaction before the user even hovers.

**Two-speed transitions**

The transition is tuned for feel: scaling in on hover is quick (~120ms) so the zoom responds instantly, while scaling back out on \`mouseleave\` is slower with an ease-out curve so it settles gently. Setting different transition durations for the hover and rest states is a small detail that makes the interaction feel polished rather than mechanical.

**A self-contained demo image**

So the snippet works with zero assets, the "photo" is built from layered CSS gradients (a conic colour wheel plus a soft radial highlight). In your own card you'd replace the \`background\` with a \`background-image: url(...)\` of a real product shot — everything else, including the cursor tracking, works identically because the zoom operates on whatever the element's background is.

**Why CSS scale beats a lens**

Classic zoom widgets load a second, larger image and float a lens over a thumbnail — more markup, more bytes, and a sliding panel to manage. Scaling the existing image with \`transform\` keeps it to one element and runs entirely on the GPU compositor, so it's lighter and smoother, at the cost of needing a reasonably high-resolution source for the zoomed detail to stay crisp.

**Customizing it**

Change the zoom factor, the transition speeds, or the \`cursor\`; swap the gradient for a real image; or add a fade for the "Hover to zoom" hint, which disappears on hover here. Pair it with a [product card](/ui-snippets/product-card/), an [image magnifier](/ui-snippets/image-magnifier/), or a [photo gallery](/ui-snippets/photo-gallery/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A product card with an image renders.` },
      { title: 'Hover the image', text: `It magnifies and the hint fades out.` },
      { title: 'Move the cursor', text: `The zoom focal point follows the pointer.` },
      { title: 'Move away', text: `The image eases back to its normal size.` },
      { title: 'Use a real photo', text: `Set background-image on the .iz-img element.` },
      { title: 'Tune the zoom', text: `Change the scale factor on hover.` },
    ] },
    features: [
      { title: 'Cursor-focused zoom', text: `transform-origin tracks the pointer.` },
      { title: 'Single element', text: `No second image or magnifier lens.` },
      { title: 'Clipped to frame', text: `overflow hidden contains the scale.` },
      { title: 'Two-speed transitions', text: `Fast zoom in, gentle ease out.` },
      { title: 'GPU-only', text: `Pure transform, no layout work.` },
      { title: 'zoom-in cursor', text: `Signals the interaction up front.` },
      { title: 'Asset-free demo', text: `Gradient stands in for a real photo.` },
      { title: 'Drop-in image', text: `Swap background for any product shot.` },
    ],
    useCases: [
      { title: 'Product photo inspection', text: 'Let shoppers inspect fine detail on a [product card](/ui-snippets/product-card/), where the zoom centres on wherever the cursor is.' },
      { title: 'Quick view dialogs', text: 'Zoom inside a [product quick view](/ui-snippets/product-quick-view/), using one element and `transform-origin` tracking instead of a second image.' },
      { title: 'Lighter lens alternative', text: 'Offer a simpler option than an [image magnifier](/ui-snippets/image-magnifier/), clipping the scaled image with `overflow: hidden` instead of drawing a separate lens.' },
      { title: 'Gallery and lightbox combinations', text: 'Combine with a [photo gallery](/ui-snippets/photo-gallery/) or pair with an [image lightbox](/ui-snippets/image-lightbox/) for a fuller viewing experience.' },
      { title: 'Catalogue detail views', text: 'Provide a detail view beside a [spotlight product card](/ui-snippets/spotlight-product-card/), with a fast zoom in and a gentle ease out.' },
      { icon: 'CODE', title: 'Related: Team Member Card Grid', desc: 'See the [Team Member Card Grid](/ui-snippets/team-member-card-grid/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the zoom follow the cursor?', a: `On hover the image scales up with transform: scale, and which part stays centred is controlled by transform-origin. A mousemove handler sets that origin to the cursor's position as a percentage of the frame, so the magnified region is always whatever you point at — scaling toward the cursor rather than a fixed centre is what makes it feel like a real magnifier.` },
      { q: 'Why not use a magnifier lens with a second image?', a: `Classic zoom widgets load a larger second image and float a lens over a thumbnail, which means more markup, more bytes, and a sliding panel to manage. Scaling the existing image with transform keeps it to one element on the GPU compositor, so it is lighter and smoother — you just need a reasonably high-resolution source for the zoomed detail to stay crisp.` },
      { q: 'Why does the image not overflow the card?', a: `The image sits in a frame with overflow: hidden and a fixed aspect-ratio, so when it scales up it is clipped to the frame and never spills onto neighbouring content. The frame also carries cursor: zoom-in to hint the interaction before the user hovers.` },
      { q: 'How do I use my own product photo?', a: `Replace the .iz-img background gradients with background-image: url(your-photo) and keep background-size: cover. Everything else, including the cursor tracking and the scale, works identically because the zoom operates on the element's background whatever it is. Use a high-resolution image so the zoomed detail stays sharp.` },
      { q: 'How do I use this image zoom card in React, Vue, or Angular?', a: `Render the figure as normal markup and attach an onMouseMove handler that writes transformOrigin to the image via a ref, imperatively, so you do not re-render per pointer move; reset it on mouse leave. The scale and transition CSS port unchanged. In Tailwind use scale and origin utilities, setting the dynamic origin through an inline style.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to puzzle out the coordinate math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the mousemove handler converts clientX and clientY into the percentage-based transformOrigin the CSS scale reads, or why the frame needs overflow hidden for the effect to look correct. The same assistant can help optimize it — asking whether writing transformOrigin on every mousemove event should be throttled with requestAnimationFrame for lower-end devices, or whether the two-speed transition timing could be tuned further. It is just as useful for extending the card — ask it to add pinch-to-zoom or a draggable pan for touch devices, layer in a small magnifier lens as an alternative to full-card scaling, or swap the gradient placeholder for a real lazy-loaded product photo with a loading state. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hover-to-zoom product image card in plain HTML, CSS, and JavaScript using only CSS transforms and a mousemove listener — no canvas, no second high-res image swap, no libraries.

Requirements:
- A card containing a fixed aspect-ratio frame with overflow hidden, holding a single image element (or background) that fills the frame.
- On hover, the image must scale up (for example transform: scale(2.1)) with a fast transition (around 120ms) so the zoom feels immediate, while scaling back down on mouse leave must use a slower, eased transition so it settles gently — the two states need different transition durations.
- A mousemove listener on the frame must compute the cursor's position as a percentage of the frame's width and height using getBoundingClientRect, and set that as the image's transform-origin so the zoomed-in region is always centered on wherever the cursor currently is, not a fixed point.
- On mouseleave, reset transform-origin back to center so the next hover starts from a clean, predictable state.
- Add a small pill-shaped hint label (like "Hover to zoom") absolutely positioned over the frame that fades out on hover so it doesn't obscure the zoomed image.
- Give the frame a zoom-in cursor so the interaction is signaled before the user hovers.
- Everything must be clippable to the card's rounded corners, and the zoom must never cause the image to overflow into surrounding layout.`,
    },
  },
};

export default imageZoomCard;
