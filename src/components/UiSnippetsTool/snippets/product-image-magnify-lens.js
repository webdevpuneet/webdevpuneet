const productImageMagnifyLens = {
  id: 'product-image-magnify-lens',
  title: 'Product Image Magnify Lens',
  category: 'media',
  html: `<div class="magnify-wrap">
  <div class="image-panel" id="imagePanel">
    <div class="product-image" id="productImage"></div>
    <div class="lens" id="lens"></div>
  </div>
  <div class="zoom-panel" id="zoomPanel">
    <p class="zoom-hint">Hover the image to zoom</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.magnify-wrap { display: flex; gap: 16px; max-width: 620px; flex-wrap: wrap; }

.image-panel {
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 12px;
  overflow: hidden;
  cursor: crosshair;
  border: 1px solid #e2e8f0;
}

.product-image {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(45deg, #6366f1 0 20px, #818cf8 20px 40px, #a855f7 40px 60px, #c084fc 60px 80px);
  background-size: 400px 400px;
}

.lens {
  position: absolute;
  width: 90px;
  height: 90px;
  border: 2px solid #fff;
  background: rgba(255,255,255,0.25);
  box-shadow: 0 0 0 1px rgba(15,23,42,0.2);
  border-radius: 8px;
  pointer-events: none;
  display: none;
}

.zoom-panel {
  width: 260px;
  height: 260px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zoom-hint { font-size: 12px; color: #94a3b8; padding: 20px; text-align: center; }

.zoom-panel.zoomed { background-repeat: no-repeat; }`,
  js: `const imagePanel = document.getElementById('imagePanel');
const productImage = document.getElementById('productImage');
const lens = document.getElementById('lens');
const zoomPanel = document.getElementById('zoomPanel');

const ZOOM_FACTOR = 2.5;

imagePanel.addEventListener('mouseenter', () => {
  lens.style.display = 'block';
  zoomPanel.classList.add('zoomed');
  zoomPanel.innerHTML = '';
});

imagePanel.addEventListener('mouseleave', () => {
  lens.style.display = 'none';
  zoomPanel.classList.remove('zoomed');
  zoomPanel.style.backgroundImage = '';
  zoomPanel.innerHTML = '<p class="zoom-hint">Hover the image to zoom</p>';
});

imagePanel.addEventListener('mousemove', (e) => {
  const rect = imagePanel.getBoundingClientRect();
  const lensSize = lens.offsetWidth;

  let x = e.clientX - rect.left - lensSize / 2;
  let y = e.clientY - rect.top - lensSize / 2;

  x = Math.max(0, Math.min(x, rect.width - lensSize));
  y = Math.max(0, Math.min(y, rect.height - lensSize));

  lens.style.left = x + 'px';
  lens.style.top = y + 'px';

  const bgStyle = getComputedStyle(productImage);
  zoomPanel.style.backgroundImage = bgStyle.backgroundImage;
  zoomPanel.style.backgroundSize = (rect.width * ZOOM_FACTOR) + 'px ' + (rect.height * ZOOM_FACTOR) + 'px';
  zoomPanel.style.backgroundPosition = '-' + (x * ZOOM_FACTOR) + 'px -' + (y * ZOOM_FACTOR) + 'px';
});`,

  seo: {
    title: 'Product Image Magnify Lens — Free HTML CSS JS Amazon-Style Zoom Snippet',
    description: 'An Amazon-style product image magnifier: a lens square follows the cursor over the image while an adjacent panel shows a zoomed view of that exact region. Vanilla JS.',
    about: {
      title: 'Product Image Magnify Lens — HTML, CSS & JavaScript Hover Zoom',
      description: `E-commerce product pages often need to show fine detail — fabric texture, stitching, screen resolution — that a normal-sized photo can't convey. The "magnify lens" pattern, popularized by Amazon, solves this by overlaying a small square lens on the image that follows the cursor, while a separate zoomed panel shows a magnified view of exactly the region under the lens.

**How the lens follows the cursor**

A \`mousemove\` listener on the image container calculates the cursor's position relative to the container using \`e.clientX - rect.left\` and \`e.clientY - rect.top\` (where \`rect\` is from \`getBoundingClientRect()\`). The lens is centered on the cursor by subtracting half its own size from that position. \`Math.max(0, Math.min(...))\` clamps the lens position so it never slides past the edges of the image — without this clamp, dragging the cursor to the very edge would push the lens partially outside the image bounds, which looks broken and would reference invalid image coordinates.

**How the zoomed panel shows the correct region**

The zoom panel is a separate element with its own \`background-image\` set to the *same* image as the product photo, but scaled much larger via \`background-size\` (the container's width/height multiplied by a \`ZOOM_FACTOR\`), and then positioned with \`background-position\` set to the negative of the lens's coordinates, also multiplied by \`ZOOM_FACTOR\`. This is the same technique used by CSS sprite sheets: an oversized background image is shifted so only the desired region shows through the panel's fixed viewport size. Because the lens position and the background-position math both derive from the same \`x\`/\`y\` values (just scaled by the zoom factor), the zoomed view always shows precisely what's under the lens, not an approximation.

**Why the zoom factor is a single constant**

\`ZOOM_FACTOR\` controls both how much larger the background image is scaled and how much further the background-position shifts per pixel of lens movement — these two numbers must always match, or the zoomed image would drift out of alignment with the lens as the cursor moves. Keeping it as one shared constant guarantees they never get out of sync.

**Extending to real photography**

This demo uses a repeating CSS gradient as a stand-in "image" so the effect is visible without an external asset. In production, set \`background-image: url(...)\` on \`.product-image\` with a real, sufficiently high-resolution photo — the zoom quality is limited by the source image's native resolution, since the zoom panel is just scaling that same file larger.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Product Image Magnify Lens" in the sidebar Library tab to load the demo panels.' },
        { title: 'Hover the image', text: 'Move your cursor over the left panel in the preview and watch the lens follow it and the right panel zoom in.' },
        { title: 'Swap in a real photo', text: 'Replace the .product-image background gradient with background-image: url(your-photo.jpg) at high resolution.' },
        { title: 'Adjust the zoom level', text: 'Change the ZOOM_FACTOR constant in the JS panel — higher values zoom in further but require a higher-resolution source image.' },
        { title: 'Adjust the lens size', text: 'Change the lens width/height in the CSS panel to make the highlighted region larger or smaller.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this on a real product detail page.' },
      ],
    },
    features: [
      'Lens square tracks the cursor precisely using getBoundingClientRect-relative coordinates',
      'Lens position is clamped so it can never slide past the edges of the source image',
      'Zoomed panel uses a scaled background-image with matching background-position math, sprite-sheet style',
      'Single ZOOM_FACTOR constant keeps the lens size and the zoom scale mathematically in sync',
      'Zoom panel and lens only activate on mouseenter/mousemove, resetting cleanly on mouseleave',
      'No canvas or WebGL required — pure CSS background-image transforms',
      'Works with any image source once background-image is set on the product image element',
      'Adjustable lens size and zoom factor via two independent, clearly-named values',
    ],
    useCases: [
      { icon: 'SHOP', title: 'E-commerce product detail pages', desc: 'Let shoppers inspect fine texture, stitching, or material detail before purchasing, exactly like major retail sites.' },
      { icon: 'ART', title: 'Art and photography portfolios', desc: 'Allow viewers to zoom into brushwork or fine photographic detail without opening a separate lightbox.' },
      { icon: 'LEARN', title: 'Learn coordinate-mapped zoom mechanics', desc: 'Study how lens position and background-position math must scale together by the same factor to stay aligned.' },
      { icon: 'DESIGN', title: 'Real estate and interior photography', desc: 'Adapt the pattern to let buyers inspect finishes, fixtures, or floor materials in listing photos up close.' },
      { icon: 'CODE', title: 'Foundation for pinch-zoom on mobile', desc: 'Use as a base to add a touch-equivalent pinch-to-zoom interaction for mobile shoppers.' },
      { icon: 'CODE', title: 'Related: Accordion — CSS Only Checkbox Hack (No JavaScript)', desc: 'See the [Accordion — CSS Only Checkbox Hack (No JavaScript)](/ui-snippets/css-only-checkbox-accordion/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Sticky Add to Cart Bar', desc: 'See the [Sticky Add to Cart Bar](/ui-snippets/sticky-add-to-cart-bar/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the lens know where the cursor is relative to the image?', a: 'A mousemove listener uses getBoundingClientRect() on the image container to get its position on the page, then subtracts that from the cursor\'s clientX/clientY to get coordinates relative to the image itself, independent of scroll position or page layout.' },
      { q: 'How is the zoomed panel able to show exactly the region under the lens?', a: 'The zoom panel shares the same background image as the product photo, scaled up by a zoom factor via background-size, and shifted into position with background-position set to the negative of the lens coordinates multiplied by that same zoom factor — the same technique used for CSS sprite sheets.' },
      { q: 'Why must the lens size and zoom factor be related?', a: 'They aren\'t directly coupled by value, but ZOOM_FACTOR is used consistently for both scaling the background image and shifting its position, so the visible zoomed region always corresponds exactly to what the lens is currently covering. Changing ZOOM_FACTOR changes how much magnification is applied without breaking that alignment.' },
      { q: 'What happens when the cursor moves near the edge of the image?', a: 'The lens position is clamped with Math.max/Math.min so it can never move past the image boundaries, keeping it fully within the visible photo at all times even when the cursor itself is right at the edge.' },
      { q: 'Does this need a high-resolution source image?', a: 'Yes — the zoom effect works by scaling up the same image file, so the maximum useful zoom level is limited by the source photo\'s native resolution. A low-resolution image will look blurry once magnified.' },
      { q: 'Can this work with a canvas element or a <img> tag instead of a background-image?', a: 'The demo uses a background-image because it makes the scale/position math for the zoom panel straightforward with plain CSS. Using an <img> tag would require the equivalent object-position and transform: scale math applied to the image element instead.' },
      { q: 'Does this magnifier work on mobile/touch devices?', a: 'The base version relies on mouse hover events (mouseenter/mousemove/mouseleave), so it does not activate on touch. A touch-friendly version would need to listen for touchmove and possibly show the zoom panel in a modal or below the image instead of side by side.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to walk through the sprite-sheet-style math connecting the lens's clamped coordinates to the zoom panel's background-size and background-position values — understanding why both must be scaled by the same ZOOM_FACTOR is the key to correctly extending or debugging this pattern. It's also worth asking the assistant to add touch support (a tap-and-hold to activate the lens on mobile), or to swap the CSS background-image approach for a real <img>-based implementation if you need features like responsive srcset images.`,
      prompt: `Build a "product image magnify lens" (Amazon-style zoom) in plain HTML, CSS, and vanilla JavaScript — no canvas, no library.

Requirements:
- A product image panel and a separate adjacent zoom panel of the same visible size, both empty/hidden of zoom content until hovered.
- A small square "lens" overlay that appears on mouseenter over the image and follows the cursor on mousemove, calculated using getBoundingClientRect() so the lens position is relative to the image container regardless of page scroll.
- The lens position must be clamped so it can never move outside the bounds of the image, even when the cursor itself is at or beyond the image's edge.
- The zoom panel must share the same source image as a background-image, scaled up by a single named zoom-factor constant via background-size, and shifted using background-position calculated as the negative of the lens's current coordinates multiplied by that same zoom-factor — so the zoomed view always corresponds exactly to the region currently under the lens.
- On mouseleave, the lens must hide and the zoom panel must reset to an empty/placeholder state.
- Keep the zoom factor and lens size as two independently adjustable constants near the top of the JavaScript.`,
    },
  },
};

export default productImageMagnifyLens;
