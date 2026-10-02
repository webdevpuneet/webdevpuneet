const mouseMoveParallaxHero = {
  id: 'mouse-move-parallax-hero',
  title: 'Mouse-Move Parallax Hero',
  lastmod: '2026-09-05',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="ph-hero" id="phHero">
  <div class="parallax-layer ph-layer-back" data-depth="0.02" id="phLayerBack">
    <span class="ph-dot" style="top:10%;left:15%"></span>
    <span class="ph-dot" style="top:30%;left:80%"></span>
    <span class="ph-dot" style="top:70%;left:20%"></span>
    <span class="ph-dot" style="top:85%;left:65%"></span>
    <span class="ph-dot" style="top:50%;left:45%"></span>
    <span class="ph-dot" style="top:20%;left:55%"></span>
  </div>
  <div class="parallax-layer ph-layer-mid" data-depth="0.05">
    <span class="ph-shape ph-shape-a"></span>
    <span class="ph-shape ph-shape-b"></span>
  </div>
  <div class="parallax-layer ph-layer-front" data-depth="0.1">
    <span class="ph-shape ph-shape-c"></span>
  </div>

  <div class="ph-content">
    <h1>Build interfaces<br />that feel alive</h1>
    <p>A subtle mouse-driven parallax hero — move your cursor to see the depth.</p>
    <button class="ph-cta">Get Started</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;margin:0}
.ph-hero{position:relative;width:100%;height:100vh;min-height:480px;background:radial-gradient(circle at 30% 20%,#1e1b4b,#0b0d1a 70%);overflow:hidden;display:flex;align-items:center;justify-content:center}
.parallax-layer{position:absolute;inset:0;pointer-events:none;will-change:transform}
.ph-dot{position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.5)}
.ph-shape{position:absolute;border-radius:50%;filter:blur(50px);opacity:.55}
.ph-shape-a{width:280px;height:280px;background:#6366f1;top:15%;left:10%}
.ph-shape-b{width:220px;height:220px;background:#ec4899;bottom:10%;right:12%}
.ph-shape-c{width:160px;height:160px;background:#22d3ee;top:55%;left:60%;filter:blur(60px);opacity:.35}
.ph-content{position:relative;z-index:2;text-align:center;color:#fff;padding:24px;max-width:600px}
.ph-content h1{font-size:clamp(28px,5vw,48px);font-weight:800;line-height:1.15;margin:0 0 14px;letter-spacing:-.02em}
.ph-content p{font-size:15px;color:#c7cbe0;margin:0 0 24px;line-height:1.6}
.ph-cta{padding:13px 28px;border-radius:999px;border:none;background:#fff;color:#0b0d1a;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:transform .15s}
.ph-cta:hover{transform:translateY(-2px)}`,

  js: `var hero = document.getElementById('phHero');
var layers = Array.prototype.slice.call(document.querySelectorAll('.parallax-layer'));

var target = { x: 0, y: 0 };
var current = { x: 0, y: 0 };
var rafId = null;

function onMouseMove(e) {
  var rect = hero.getBoundingClientRect();
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;
  target.x = e.clientX - cx;
  target.y = e.clientY - cy;
}

function onMouseLeave() {
  target.x = 0;
  target.y = 0;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animate() {
  current.x = lerp(current.x, target.x, 0.08);
  current.y = lerp(current.y, target.y, 0.08);

  layers.forEach(function (layer) {
    var depth = parseFloat(layer.getAttribute('data-depth')) || 0;
    var moveX = -current.x * depth;
    var moveY = -current.y * depth;
    layer.style.transform = 'translate3d(' + moveX.toFixed(2) + 'px,' + moveY.toFixed(2) + 'px,0)';
  });

  rafId = requestAnimationFrame(animate);
}

hero.addEventListener('mousemove', onMouseMove);
hero.addEventListener('mouseleave', onMouseLeave);

animate();`,

  seo: {
    title: 'Mouse-Move Parallax Hero — Free HTML CSS JS Snippet',
    description: `A hero section with layered background shapes that drift with mouse movement at different depths, smoothed with a lerp-based easing loop. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mouse-Move Parallax Hero — Layered Depth Effect Following the Cursor',
      description: `This hero section responds to the mouse by shifting three stacked background layers at different speeds, creating an illusion of depth as the cursor moves — a common technique on modern marketing and product landing pages.

**Layered depth via data-depth**

Each .parallax-layer element carries a data-depth attribute (0.02 for the far starfield of dots, 0.05 for the mid blurred shapes, 0.1 for the closest shape). A higher depth value means the layer moves further per unit of mouse movement, so the "closest" layer visibly shifts the most while the "farthest" layer barely moves — mimicking how nearer objects appear to move faster than distant ones when your viewpoint shifts.

**Smooth easing with a lerp loop**

Raw mouse coordinates are jittery to translate directly into transforms, so the mousemove handler only updates a target {x, y} value. A separate requestAnimationFrame loop continuously moves a current {x, y} value toward that target using linear interpolation (lerp(a, b, 0.08)), producing a smooth trailing, slightly delayed motion rather than a jumpy 1:1 follow.

**Applying the transform**

On every animation frame, each layer's translate3d offset is computed as the negative of the eased cursor offset multiplied by its own depth value — moving layers in the opposite direction from the cursor, which is the direction real parallax layers move relative to a shifting viewpoint. translate3d is used specifically (rather than translate) to promote each layer to its own compositing layer for smoother, GPU-accelerated motion.

**Resetting on mouse leave**

When the cursor leaves the hero section, the target offset resets to {0, 0}, and the same lerp loop eases every layer smoothly back to its resting position rather than snapping instantly.`,
    },
    features: [
      'Three independently-moving parallax layers with distinct depth values',
      'Smooth lerp-based easing loop instead of raw 1:1 cursor tracking',
      'translate3d transforms for GPU-accelerated, jank-free motion',
      'Automatic smooth reset to resting position on mouse leave',
      'Centered headline and CTA button unaffected by the background motion',
      'Depth values fully configurable via simple data-depth attributes',
      'Single shared requestAnimationFrame loop driving all layers',
      'No dependencies — pure DOM events and CSS transforms',
    ],
    useCases: [
      { icon: '🏠', title: 'Product and SaaS landing pages', desc: 'Create an eye-catching hero where three background layers shift at different speeds as the cursor moves, giving a sense of depth.' },
      { icon: '🎨', title: 'Portfolio and agency sites', desc: 'Make a polished first impression with `translate3d` transforms that are GPU accelerated and free from jank.' },
      { icon: '🎓', title: 'Parallax and easing tutorials', desc: 'Learn a clean example of lerp-based easing instead of raw one-to-one cursor tracking, with each layer given its own `data-depth` value.' },
      { icon: '🧩', title: 'Design system hero templates', desc: 'Offer a reusable layered-depth hero, with layers smoothly returning to their resting position when the mouse leaves.' },
    ],
    faqs: [
      { q: 'Why use lerp instead of directly setting the transform from mouse position?', a: 'Directly following the raw cursor position produces a jittery, mechanical feel. Lerping the current position toward a target position each animation frame introduces a small, smooth delay that reads as fluid, natural motion instead.' },
      { q: 'How do I control how strongly each layer moves?', a: 'Adjust the data-depth attribute on each .parallax-layer element. Larger values move that layer further per unit of mouse movement; smaller values keep a layer nearly still, simulating greater distance.' },
      { q: 'Does this work on touch devices without a mouse?', a: 'The effect is driven by mousemove, so it has no effect on pure touch interaction — the layers simply stay in their default position, which is an acceptable and common fallback for a purely decorative effect like this.' },
    ],
  },
};

export default mouseMoveParallaxHero;
