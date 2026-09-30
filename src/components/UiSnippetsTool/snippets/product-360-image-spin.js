const product360ImageSpin = {
  id: 'product-360-image-spin',
  title: '360° Product Spin Viewer',
  lastmod: '2026-08-08',
  category: 'media',
  html: `<div class="viewer-card">
  <div class="product-stage" id="product-stage">
    <div class="shadow-ellipse"></div>
    <div class="bottle" id="bottle">
      <div class="bottle-cap"></div>
      <div class="bottle-body" id="bottle-body">
        <div class="bottle-label">
          <span class="label-line label-line-1">EAU DE</span>
          <span class="label-line label-line-2">SPIN</span>
        </div>
      </div>
    </div>
    <div class="drag-hint" id="drag-hint">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9l-4 3 4 3"/><path d="M16 9l4 3-4 3"/><path d="M4 12h16"/></svg>
      <span>Drag to rotate</span>
    </div>
    <div class="frame-indicator" id="frame-indicator">1 / 24</div>
  </div>
  <p class="viewer-caption">Click and drag horizontally &mdash; works with touch too</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.viewer-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(15,23,42,0.08);
  width: 100%;
  max-width: 360px;
}

.product-stage {
  position: relative;
  height: 320px;
  border-radius: 14px;
  background: radial-gradient(circle at 50% 30%, #f8fafc, #e2e8f0 85%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
}
.product-stage:active { cursor: grabbing; }

.shadow-ellipse {
  position: absolute;
  bottom: 38px;
  width: 120px;
  height: 18px;
  background: radial-gradient(ellipse, rgba(15,23,42,0.22), transparent 70%);
  border-radius: 50%;
}

.bottle {
  position: relative;
  width: 92px;
  height: 220px;
  perspective: 800px;
}

.bottle-cap {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 26px;
  border-radius: 6px 6px 3px 3px;
  background: linear-gradient(90deg, #4338ca, #6366f1 45%, #818cf8 55%, #4338ca);
  z-index: 2;
}

.bottle-body {
  position: absolute;
  top: 22px;
  left: 0;
  width: 100%;
  height: 198px;
  border-radius: 14px 14px 20px 20px;
  background-image: repeating-linear-gradient(
    90deg,
    #cbd5e1 0%,
    #f8fafc 4%,
    #94a3b8 9%,
    #e2e8f0 14%,
    #ffffff 18%,
    #a5b4cb 24%,
    #cbd5e1 30%
  );
  background-size: 400% 100%;
  background-position: 0% 0%;
  box-shadow: inset 0 0 22px rgba(15,23,42,0.12), 0 8px 20px rgba(15,23,42,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-position 0.05s linear;
}

.bottle-label {
  width: 62px;
  height: 74px;
  background: rgba(255,255,255,0.92);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  box-shadow: 0 1px 4px rgba(15,23,42,0.1);
}
.label-line { font-size: 8px; font-weight: 700; letter-spacing: 0.08em; color: #4338ca; }
.label-line-2 { font-size: 13px; letter-spacing: 0.12em; }

.drag-hint {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(15,23,42,0.82);
  color: #f1f5f9;
  font-size: 11px;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: 20px;
  pointer-events: none;
  transition: opacity 0.4s, transform 0.4s;
}
.drag-hint.faded { opacity: 0; transform: translate(-50%, 8px); }

.frame-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15,23,42,0.75);
  color: #f8fafc;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  padding: 4px 9px;
  border-radius: 8px;
  letter-spacing: 0.02em;
}

.viewer-caption {
  margin-top: 14px;
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
}`,

  js: `const stage = document.getElementById('product-stage');
const body = document.getElementById('bottle-body');
const hint = document.getElementById('drag-hint');
const indicator = document.getElementById('frame-indicator');

const TOTAL_FRAMES = 24;
const PX_PER_FRAME = 9; // horizontal drag pixels needed to advance one frame

let currentFrame = 0;
let dragging = false;
let startX = 0;
let startFrame = 0;
let hasInteracted = false;

function applyFrame(frame) {
  currentFrame = ((frame % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
  // Map the frame index to a background-position shift on the repeating
  // gradient. This is the "fake frame swap" — a real product viewer would
  // instead swap body.style.backgroundImage between 24 photographed
  // sprite frames (frame-01.jpg ... frame-24.jpg) at this exact point.
  const positionPercent = (currentFrame / TOTAL_FRAMES) * 400;
  body.style.backgroundPosition = positionPercent + '% 0%';
  indicator.textContent = (currentFrame + 1) + ' / ' + TOTAL_FRAMES;
}

function markInteracted() {
  if (hasInteracted) return;
  hasInteracted = true;
  hint.classList.add('faded');
}

function pointerDown(e) {
  dragging = true;
  startX = e.clientX;
  startFrame = currentFrame;
  stage.setPointerCapture(e.pointerId);
  markInteracted();
}

function pointerMove(e) {
  if (!dragging) return;
  const deltaX = e.clientX - startX;
  const frameDelta = Math.round(deltaX / PX_PER_FRAME);
  applyFrame(startFrame - frameDelta);
}

function pointerUp(e) {
  dragging = false;
  try { stage.releasePointerCapture(e.pointerId); } catch (err) {}
}

stage.addEventListener('pointerdown', pointerDown);
stage.addEventListener('pointermove', pointerMove);
stage.addEventListener('pointerup', pointerUp);
stage.addEventListener('pointercancel', pointerUp);
stage.addEventListener('pointerleave', () => { if (dragging) dragging = false; });

applyFrame(0);`,

  seo: {
    title: '360° Product Spin Viewer — Free HTML CSS JS Snippet',
    description: 'Drag-to-rotate product viewer with a frame counter and fading hint, built from a CSS-shaded bottle. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: '360° Product Spin Viewer — Drag-Driven Frame Swapping, Pointer Events & CSS-Simulated Photography',
      description: `Interactive 360° product viewers let shoppers drag or swipe to "spin" a product and inspect it from every angle, a pattern popularized by e-commerce categories like footwear, watches, and cosmetics where texture, shape, and material catch matter more than a single static photo can convey. This snippet builds the full interaction — pointer-driven drag tracking, frame index calculation with wraparound, a fading first-use hint, and a live frame counter — using only CSS and vanilla JavaScript.

**How real 360° viewers work**

In production, a 360° viewer is backed by a **sprite sequence**: a product is photographed on a motorized turntable at fixed angle increments (commonly 24, 36, or 72 shots for a full rotation), producing a numbered set of images like \`frame-01.jpg\` through \`frame-24.jpg\`. The viewer preloads all frames, tracks the user's horizontal drag distance, converts that distance into a frame index using a fixed pixels-per-frame ratio, and swaps the visible \`<img>\` source (or background-image) to the corresponding frame. Because the swap happens dozens of times per second during a drag, the eye perceives continuous rotation even though it's really a fast slideshow of discrete photographs.

**Faking the illusion without real photography**

This demo has no product photography to work with, so it fakes the same illusion using a single CSS-shaded shape instead of 24 separate images. The \`.bottle-body\` element uses a \`repeating-linear-gradient\` with alternating light and dark bands to mimic how light rakes across a cylindrical glass surface — bright highlight, mid-tone, shadow, repeat. That gradient is rendered at \`background-size: 400% 100%\`, four times wider than the element itself, so shifting its \`background-position-x\` slides a different portion of the banded pattern into view. The JS layer computes a \`currentFrame\` value from 0–23 exactly as a real viewer would, then converts that frame index into a background-position percentage: \`(currentFrame / 24) * 400\`. The result reads convincingly as a rotating cylindrical object, even though under the hood it's one gradient sliding sideways rather than 24 discrete photos — the same trick used by CSS-only "spinning" demos before real photography is swapped in.

**Pointer tracking and frame math**

The interaction uses the unified \`Pointer Events\` API (\`pointerdown\`, \`pointermove\`, \`pointerup\`, \`pointercancel\`) rather than separate mouse and touch listeners, so the exact same code handles a desktop mouse drag and a mobile touch-drag without branching. On \`pointerdown\`, the stage captures the pointer via \`setPointerCapture()\` so drag tracking continues correctly even if the cursor leaves the element's bounds mid-drag, and records the starting X coordinate and starting frame. On every \`pointermove\`, the horizontal delta since the drag began is divided by a fixed \`PX_PER_FRAME\` constant (9px here) and rounded to the nearest whole frame — a smaller constant makes the spin more sensitive to short drags, a larger one requires more deliberate dragging per frame. The resulting frame index wraps around with a double modulo (\`((frame % 24) + 24) % 24\`) so dragging past frame 0 in either direction correctly loops to frame 23 or frame 1 instead of hitting a dead stop.

**Hint fade and frame indicator**

A small "drag to rotate" pill overlay sits at the bottom of the stage on first render, disappearing permanently the moment the user starts their first drag — implemented with a single \`hasInteracted\` boolean guard so it never reappears even if the user later releases and re-drags. A frame indicator in the corner ("1 / 24") gives the user a concrete sense of progress through the full rotation, reinforcing that this is a bounded, explorable object rather than an open-ended interaction.

**Why this matters for 2026 product pages**

As shoppers increasingly compare products across many tabs and rely on visual detail instead of long descriptions, drag-to-inspect viewers reduce return rates by setting accurate physical expectations before purchase. Building the interaction mechanics correctly — smooth wraparound, pointer capture, a fading hint that never annoys returning users — matters more than which rendering technique (real photos vs. CSS) drives the final frame.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Drag horizontally to spin',
          text: 'Press down anywhere on the .product-stage and drag left or right. pointerDown() records the starting X and current frame, and pointerMove() converts the running horizontal delta into a new frame via Math.round(deltaX / PX_PER_FRAME).',
        },
        {
          title: 'Watch the frame indicator and hint',
          text: 'The top-right badge always reflects applyFrame()\'s currentFrame + 1 out of TOTAL_FRAMES. The bottom "Drag to rotate" pill fades out permanently the first time markInteracted() runs, tracked by the hasInteracted flag.',
        },
        {
          title: 'Swap in real product photography',
          text: 'Replace the repeating-linear-gradient technique with an actual sprite sequence: preload 24 images (frame-01.jpg ... frame-24.jpg), and inside applyFrame(), instead of setting background-position, set body.style.backgroundImage = "url(frame-" + String(currentFrame + 1).padStart(2, \'0\') + ".jpg)".',
        },
        {
          title: 'Tune drag sensitivity',
          text: 'Adjust the PX_PER_FRAME constant at the top of the JS panel. Lower values (e.g. 5) make the spin feel more responsive to short drags; higher values (e.g. 15) require more deliberate dragging per frame, useful for viewers with many more than 24 frames.',
        },
        {
          title: 'Increase frame count for smoother rotation',
          text: 'Change TOTAL_FRAMES from 24 to 36 or 72 for a smoother apparent rotation with real photography, and widen background-size proportionally (e.g. TOTAL_FRAMES * (100/6)%) if keeping the CSS-gradient fallback technique.',
        },
        {
          title: 'Export and drop into a product page',
          text: 'Click HTML to download a standalone file, or JSX for a React component. Wrap the pointer handlers in useRef and useEffect for React so listeners attach once on mount and clean up correctly on unmount.',
        },
      ],
    },
    features: [
      'Unified Pointer Events API (pointerdown/pointermove/pointerup/pointercancel) — one code path for mouse and touch',
      'setPointerCapture() keeps drag tracking accurate even when the cursor leaves the stage mid-drag',
      'Double-modulo frame wraparound: ((frame % 24) + 24) % 24 loops smoothly past both ends',
      'CSS repeating-linear-gradient + background-size 400% simulates a rotating cylindrical shaded surface',
      'Drag sensitivity tunable via a single PX_PER_FRAME constant',
      'Self-fading first-use hint gated by a one-time hasInteracted boolean',
      'Live frame-count indicator ("N / 24") updates in sync with every drag frame',
      'touch-action: pan-y on the stage keeps vertical page scroll working on mobile during horizontal drags',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'E-commerce product detail pages for footwear, cosmetics, and accessories',
        desc: 'Shoppers drag to inspect stitching, material texture, and shape from every angle before adding to cart, which measurably reduces return rates for categories where a single flat photo undersells physical detail. Replace the CSS gradient with a real 24-to-72-frame turntable photo sequence and this exact interaction layer works unchanged.',
      },
      {
        icon: 'DESIGN',
        title: 'Furniture and home goods configurators',
        desc: 'Combine the spin viewer with a color or material swatch selector so changing a swatch also changes which photographed frame set loads, letting shoppers spin a sofa or lamp in the exact finish they are considering.',
      },
      {
        icon: 'FLOW',
        title: 'Automotive and industrial equipment showcases',
        desc: 'Cars, machinery, and large equipment are frequently shown with a drag-to-rotate exterior view on dealer and manufacturer sites, since these products are too large or complex for a shopper to intuit from a handful of static angles alone.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching pointer-event drag tracking and frame-based animation math',
        desc: 'The pattern of converting a continuous drag delta into a discrete, wrapping frame index generalizes well beyond product viewers — carousel components, custom range sliders, and drag-to-reorder lists all rely on similar delta-to-index math.',
      },
      {
        icon: 'FORM',
        title: 'Marketing pages and landing hero sections for physical products',
        desc: 'A spinnable hero product shot creates a more tactile, premium first impression than a static image, and works well paired with a [Gradient Button](/ui-snippets/gradient-button) call-to-action placed just below the viewer.',
      },
      {
        icon: 'CODE',
        title: 'Prototyping 360° viewers before commissioning real turntable photography',
        desc: 'Design and engineering teams can validate the full interaction — drag sensitivity, hint timing, indicator placement — using the CSS-only fallback in this snippet well before a product photo shoot happens, then swap in the real sprite sequence at launch with a single change inside applyFrame().',
      },
    ],
    faqs: [
      {
        q: 'How many frames does a real 360° product viewer typically use?',
        a: 'Most commercial viewers use 24 or 36 frames for a full rotation, which is dense enough to feel smooth during a normal-speed drag while keeping the initial image download reasonable (24 frames at ~40KB each is under 1MB). High-end viewers for jewelry or watches sometimes use 72 frames for extra-smooth close-up rotation, at the cost of a heavier initial load that usually needs lazy or progressive preloading.',
      },
      {
        q: 'Why use Pointer Events instead of separate mouse and touch listeners?',
        a: 'The Pointer Events API (pointerdown, pointermove, pointerup, pointercancel) is supported across desktop and mobile browsers and fires for mouse, touch, and pen input through one unified event model, eliminating the need to maintain parallel mousedown/touchstart and mousemove/touchmove listeners with duplicated drag-delta logic. setPointerCapture() is also only available through this API, and is what keeps drag tracking correct if the pointer briefly leaves the stage element mid-drag.',
      },
      {
        q: 'How do I replace the CSS gradient trick with real product photography?',
        a: 'Preload 24 (or however many) numbered images, then inside applyFrame() replace the background-position calculation with body.style.backgroundImage = `url(frame-${String(currentFrame + 1).padStart(2, "0")}.jpg)`. Preload every frame on mount (new Image().src = url for each) so there is no flicker on the first few drags while images are still downloading.',
      },
      {
        q: 'Why does the hint only fade once instead of reappearing?',
        a: 'The hasInteracted boolean flag is checked at the top of markInteracted() and only lets the fade-out class get added the very first time the user starts a drag; every subsequent pointerdown short-circuits immediately. This mirrors real product viewers, which show the rotate hint on first page load only — repeatedly showing it after every drag would be a distracting, non-calm interruption for a user who has already learned the interaction.',
      },
      {
        q: 'Can this viewer support zoom in addition to rotation?',
        a: 'Yes — add a pinch-to-zoom or scroll-wheel listener that scales the .bottle element via CSS transform: scale(), independent of the drag-to-rotate logic which only ever touches background-position or backgroundImage. Keep the two interactions on separate event listeners (wheel for zoom, pointer drag for rotation) so they don\'t interfere with each other\'s gesture detection.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly how a raw pointermove delta in pixels gets converted into a wrapping 0–23 frame index, and why the double-modulo formula is needed for correct wraparound in both drag directions. It's also a strong candidate for extension with AI help: ask it to swap the CSS-gradient illusion for a real preloaded 24-image sprite sequence with a loading spinner shown until all frames finish downloading, add momentum/inertia so releasing mid-drag continues spinning briefly before settling, or add keyboard arrow-key support so the viewer is usable without a mouse or touchscreen at all.`,
      prompt: `Build a drag-to-rotate 360° product viewer in plain HTML, CSS, and JavaScript, using the unified Pointer Events API so the same code handles both mouse and touch input.

Requirements:
- A fixed-size viewer stage that the user can press and horizontally drag (or touch-drag on mobile) to rotate through a bounded sequence of frames, wrapping around seamlessly at both ends (dragging past the last frame loops back to the first, and vice versa).
- Track drag state with pointerdown/pointermove/pointerup/pointercancel, capture the pointer on pointerdown via setPointerCapture so tracking stays correct even if the cursor briefly leaves the stage element mid-drag, and release capture cleanly on pointerup/pointercancel.
- Convert the running horizontal drag distance into a discrete frame index using a single tunable "pixels per frame" constant, rounding to the nearest whole frame rather than jumping continuously.
- Since there's no real product photography available, simulate the rotation illusion using pure CSS — a shaded object built from a repeating gradient or layered box-shadows whose position shifts as the computed frame index changes — but write it so the frame-swap logic is cleanly separable from the illusion technique (i.e. swapping in a real 24-image sprite sequence later should only require changing one function).
- Show a small overlay hint ("Drag to rotate") on first load that permanently fades out the moment the user starts their very first drag, and never reappears afterward even after further drags.
- Show a live frame counter (e.g. "14 / 24") that updates in real time as the user drags.
- Ensure vertical page scrolling still works normally on touch devices even while horizontal drag-to-rotate is active on the stage.`,
    },
  },
};

export default product360ImageSpin;
