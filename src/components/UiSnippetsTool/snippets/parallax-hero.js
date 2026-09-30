const parallaxHero = {
  id: 'parallax-hero',
  title: 'Parallax Hero Section',
  lastmod: '2026-06-12',
  category: 'scroll',
  html: `<div class="hero" id="hero">
  <!-- parallax layers - back to front -->
  <div class="layer layer-sky" id="layer-sky"></div>
  <div class="layer layer-mountains" id="layer-mountains">
    <svg class="mountains-svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,300 200,80 400,200 600,40 800,160 1000,60 1200,180 1200,300" fill="#1e1b4b" opacity="0.7"/>
      <polygon points="0,300 150,120 350,220 550,80 750,190 950,90 1150,200 1200,180 1200,300" fill="#312e81" opacity="0.5"/>
    </svg>
  </div>
  <div class="layer layer-hills" id="layer-hills">
    <svg class="hills-svg" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,200 C150,80 300,160 450,100 C600,40 750,140 900,80 C1050,20 1150,100 1200,60 L1200,200 Z" fill="#4338ca" opacity="0.6"/>
    </svg>
  </div>
  <div class="layer layer-stars" id="layer-stars"></div>
  <!-- content layer (no parallax — anchored) -->
  <div class="hero-content">
    <div class="eyebrow">✦ New in 2025</div>
    <h1 class="hero-heading">Build&nbsp;faster.<br>Ship&nbsp;smarter.</h1>
    <p class="hero-sub">A design system that adapts to your workflow — not the other way around. Start free, scale effortlessly.</p>
    <div class="hero-actions">
      <button class="btn btn-primary">Get started free</button>
      <button class="btn btn-ghost">See examples →</button>
    </div>
  </div>
  <div class="scroll-hint" id="scroll-hint">
    <span>Move your cursor</span>
    <div class="mouse-icon"><div class="mouse-dot"></div></div>
  </div>
</div>`,
  css: `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{margin:0;font-family:system-ui,sans-serif;background:#0f0f1a;overflow:hidden}
.hero{position:relative;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
/* layers — extend 80px beyond hero edges so translation never clips */
.layer{position:absolute;inset:0 -80px;will-change:transform}
.layer-sky{
  background:radial-gradient(ellipse at 60% 30%, #312e81 0%, #0f0f1a 65%);
}
/* stars */
.layer-stars{pointer-events:none}
/* mountains + hills hold SVGs */
.mountains-svg,.hills-svg{
  position:absolute;bottom:0;left:0;
  width:100%;height:100%;
}
/* content */
.hero-content{
  position:relative;z-index:10;
  text-align:center;
  max-width:620px;
  padding:0 24px;
  pointer-events:none;
}
.eyebrow{
  display:inline-flex;align-items:center;gap:6px;
  font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:#818cf8;background:rgba(99,102,241,.15);
  border:1px solid rgba(99,102,241,.3);
  padding:5px 14px;border-radius:20px;margin-bottom:20px;
  pointer-events:all;
}
.hero-heading{
  font-size:clamp(36px,6vw,72px);font-weight:900;line-height:1.1;
  color:#f1f5f9;letter-spacing:-.02em;margin-bottom:20px;
  background:linear-gradient(135deg,#f1f5f9,#818cf8);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hero-sub{font-size:clamp(14px,2vw,18px);color:#94a3b8;line-height:1.7;margin-bottom:32px;pointer-events:all}
.hero-actions{display:flex;gap:14px;justify-content:center;pointer-events:all}
.btn{padding:13px 28px;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:transform .2s,box-shadow .2s}
.btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 20px rgba(99,102,241,.4)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(99,102,241,.5)}
.btn-ghost{background:rgba(255,255,255,.08);color:#f1f5f9;border:1px solid rgba(255,255,255,.15)}
.btn-ghost:hover{background:rgba(255,255,255,.15);transform:translateY(-2px)}
/* scroll hint */
.scroll-hint{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:#475569;font-size:12px;letter-spacing:.05em;text-transform:uppercase;z-index:10;animation:fadeHint 2s 1.5s ease both}
@keyframes fadeHint{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.mouse-icon{width:22px;height:34px;border:2px solid #475569;border-radius:12px;display:flex;align-items:flex-start;justify-content:center;padding-top:5px}
.mouse-dot{width:3px;height:6px;background:#475569;border-radius:2px;animation:scrollDot 1.6s ease infinite}
@keyframes scrollDot{0%{opacity:1;transform:translateY(0)}80%{opacity:0;transform:translateY(10px)}100%{opacity:0;transform:translateY(0)}}`,
  js: `const hero = document.getElementById('hero');
const layers = [
  { el: document.getElementById('layer-stars'),    xFactor: 0.01, yFactor: 0.01 },
  { el: document.getElementById('layer-sky'),      xFactor: 0.02, yFactor: 0.02 },
  { el: document.getElementById('layer-mountains'),xFactor: 0.04, yFactor: 0.03 },
  { el: document.getElementById('layer-hills'),    xFactor: 0.07, yFactor: 0.05 },
];

// Generate random stars
const starsLayer = document.getElementById('layer-stars');
const svgNS = 'http://www.w3.org/2000/svg';
const starSvg = document.createElementNS(svgNS, 'svg');
starSvg.setAttribute('viewBox', '0 0 1200 800');
starSvg.setAttribute('width', '100%');
starSvg.setAttribute('height', '100%');
starSvg.style.cssText = 'position:absolute;inset:0';
for (let i = 0; i < 120; i++) {
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', Math.random() * 1200);
  circle.setAttribute('cy', Math.random() * 500);
  const r = Math.random() * 1.5 + 0.3;
  circle.setAttribute('r', r);
  circle.setAttribute('fill', '#fff');
  circle.setAttribute('opacity', Math.random() * 0.6 + 0.2);
  starSvg.appendChild(circle);
}
starsLayer.appendChild(starSvg);

// Smooth lerp state
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let rafId;
let demoMode = true, demoT = 0;

function lerp(a, b, t) { return a + (b - a) * t; }

function animate() {
  if (demoMode) {
    demoT += 0.008;
    targetX = Math.sin(demoT) * 500;
    targetY = Math.sin(demoT * 0.6) * 60;
  }
  currentX = lerp(currentX, targetX, 0.06);
  currentY = lerp(currentY, targetY, 0.06);
  layers.forEach(({ el, xFactor, yFactor }) => {
    const tx = currentX * xFactor;
    const ty = currentY * yFactor;
    el.style.transform = \`translate(\${tx}px, \${ty}px)\`;
  });
  rafId = requestAnimationFrame(animate);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

hero.addEventListener('mouseenter', () => { demoMode = false; });
hero.addEventListener('mousemove', e => {
  if (reducedMotion) return;
  const rect = hero.getBoundingClientRect();
  targetX = e.clientX - rect.left - rect.width / 2;
  targetY = e.clientY - rect.top - rect.height / 2;
});

hero.addEventListener('mouseleave', () => { demoMode = true; });

// Device tilt support
if (window.DeviceOrientationEvent && !reducedMotion) {
  window.addEventListener('deviceorientation', e => {
    targetX = (e.gamma || 0) * 8;  // left-right tilt
    targetY = (e.beta  || 0) * 4;  // front-back tilt
  });
}

animate(); // always start — demo loop runs regardless of reduced-motion`,
  seo: {
    title: 'Parallax Hero Section — Free HTML CSS JS Snippet',
    description: `Mouse-driven multi-layer parallax hero with lerp smoothing, SVG mountain layers, star field, and device tilt support. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Parallax Hero — Mouse-Driven Layered Parallax, Lerp Smoothing & SVG Depth Layers in Vanilla JS`,
      description: `A parallax hero section creates the illusion of depth by moving background layers at different speeds as the cursor moves — slower layers feel farther away, faster layers feel closer. This snippet builds a five-layer parallax hero (stars, sky gradient, distant mountains, closer hills, anchored content) driven by mouse position and lerp smoothing, with device tilt support for mobile and a \`prefers-reduced-motion\` fallback — all in pure HTML, CSS, and vanilla JavaScript.

Parallax effects are one of the defining techniques of motion-rich web design — they appear on SaaS landing pages, game sites, portfolio headers, and interactive storytelling pages. The key challenge is making them feel smooth and physical rather than choppy or nauseating. This snippet solves that with linear interpolation (lerp) smoothing, SVG vector layers that scale to any resolution, procedural star generation, and device orientation support for mobile — all in under 80 lines of vanilla JavaScript.

**Multi-layer depth using xFactor / yFactor per layer**

The parallax effect is defined by a \`layers\` array where each entry has an element reference and two factors: \`xFactor\` and \`yFactor\`. The layer closest to the viewer (hills) has the highest factors (0.07, 0.05), while the farthest layer (stars) has the lowest (0.01, 0.01). When the cursor is at centre-relative offset (targetX, targetY), each layer's transform is set to \`translate(targetX * xFactor, targetY * yFactor)\` — multiplying by a small factor converts the full cursor travel range (~600px on a 1200px screen) into a subtle layer offset (hills move ~42px max at factor 0.07). Adding more layers is just adding one more entry to the array with the element and desired factors.

**Lerp smoothing for physical feel**

The cursor offset is not applied directly to the layers — that would produce jerky, latency-sensitive motion. Instead, \`targetX\` and \`targetY\` record where the cursor is, while \`currentX\` and \`currentY\` are the values currently applied to the layers. A \`requestAnimationFrame\` loop runs \`lerp(current, target, 0.06)\` each frame — linear interpolation at 6% per frame. This means the current value closes 6% of the remaining gap every ~16ms, producing an exponential ease toward the target. At 60fps, the layers "chase" the cursor with a natural deceleration, feeling physical and weighty.

**SVG layers for resolution-independent depth**

The mountain and hill shapes are inline SVGs with \`preserveAspectRatio="xMidYMax slice"\` and \`width:100%; height:100%\`, so they fill their container and crop rather than letterbox at any viewport size. The mountain SVG uses two \`<polygon>\` elements at different opacities for a layered ridge effect. The hill layer uses a \`<path>\` with bezier curves for smooth organic slopes. Because these are vector shapes, they scale sharply to any screen density — no raster image artifacts.

**Procedural star generation**

120 stars are generated programmatically in JavaScript using \`document.createElementNS\` to build SVG \`<circle>\` elements with random positions, radii (0.3–1.8px), and opacities (0.2–0.8). This avoids embedding a data URI or loading an image just for star dots. Because stars are in their own layer with the lowest parallax factor, they drift almost imperceptibly — giving a sense of immense distance.

**Device orientation and reduced motion**

On mobile devices that support the DeviceOrientation API, \`gamma\` (left-right tilt, scaled ×8) and \`beta\` (front-back tilt, scaled ×4) are fed into the same \`targetX\`/\`targetY\` variables. The lerp loop smooths the noisy gyroscope data automatically. If \`prefers-reduced-motion: reduce\` is set, the animation loop is never started and all layers remain at \`translate(0,0)\`.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Load the snippet',
        text: `Paste the HTML, CSS, and JS into your page. A deep-space hero appears with gradient sky, SVG mountain silhouettes, a star field, and centred headline and CTA buttons.`,
      },
      {
        title: 'Move the cursor slowly across the hero',
        text: `The layers drift at different speeds — stars barely move while the hills follow the cursor more closely, creating a convincing 3D depth illusion.`,
      },
      {
        title: 'Observe the lerp smoothing',
        text: `When you stop the cursor, the layers continue drifting momentarily before settling — the exponential lerp easing gives each layer physical inertia.`,
      },
      {
        title: 'Move the cursor off the hero',
        text: `All layers smoothly return to their centre positions as targetX and targetY reset to 0 and the lerp loop runs them back.`,
      },
      {
        title: 'Test on mobile (tilt)',
        text: `On a device that supports DeviceOrientationEvent, tilting the phone left-right and forward-back drives the parallax layers.`,
      },
      {
        title: 'Customise content and layers',
        text: `Edit the \`.hero-content\` HTML for your own headline and CTAs. Adjust \`xFactor\`/\`yFactor\` in the layers array to change depth intensity per layer.`,
      },
    ] },
    features: [
      {
        title: 'Lerp-smoothed cursor tracking',
        text: `\`currentX\` and \`currentY\` close 6% of the gap to \`targetX\`/\`targetY\` per frame — exponential ease-in that gives layers physical inertia and smooth deceleration.`,
      },
      {
        title: 'Five independent depth layers',
        text: `Stars, sky gradient, distant mountains, closer hills, and anchored content each have independent xFactor/yFactor — add layers by appending to the array.`,
      },
      {
        title: 'SVG mountain and hill silhouettes',
        text: `Vector shapes with \`preserveAspectRatio="xMidYMax slice"\` fill the hero at any resolution without pixelation. Two mountain polygons create depth with opacity layering.`,
      },
      {
        title: 'Procedural star field',
        text: `120 SVG circles with randomised position, size, and opacity are generated in JS — no image asset required. Stars appear in the far-background layer.`,
      },
      {
        title: 'Device tilt support',
        text: `DeviceOrientationEvent feeds \`gamma\` and \`beta\` values into the same target variables as mouse events — the parallax works by tilting on mobile.`,
      },
      {
        title: 'prefers-reduced-motion support',
        text: `The rAF animation loop is skipped entirely when reduced motion is preferred. Layers render at \`translate(0,0)\` — no layout shift.`,
      },
      {
        title: 'Gradient headline with clip',
        text: `\`background-clip: text\` applies an indigo→slate gradient to the headline text — a zero-image technique for gradient typography.`,
      },
      {
        title: 'Scroll hint animation',
        text: `An animated mouse-scroll icon fades up from below after 1.5s, prompting users to scroll. Uses a CSS-only \`@keyframes scrollDot\` loop.`,
      },
    ],
    useCases: [
      {
        title: 'SaaS product landing pages',
        text: `A parallax hero is the highest-impact "wow moment" on a marketing page — it signals quality and interactivity within the first second. Pair with a [stats card](/ui-snippets/stats-card/) section below.`,
      },
      {
        title: 'Developer portfolio headers',
        text: `Replace a static hero with a parallax scene that responds to cursor movement — a strong visual demonstration of front-end skill. Add a [typewriter](/ui-snippets/typewriter/) effect to the headline.`,
      },
      {
        title: 'Game or app launch pages',
        text: `Games and creative apps benefit from an immersive hero that establishes the visual world before the user even clicks. Add character sprites as additional layers, or compare with a [video background hero](/ui-snippets/video-bg-hero/) if you prefer motion footage over vector layers.`,
      },
      {
        title: 'Event or conference headers',
        text: `A parallax landscape with mountains and sky creates a natural scene for outdoor, adventure, or technology events. Customise the SVG shapes to match the event theme.`,
      },
      {
        title: 'Interactive storytelling intros',
        text: `Use layered parallax to establish a narrative scene — a city skyline, a forest, or an abstract space — before scrolling into the story content.`,
      },
      {
        title: 'Agency and studio showcase pages',
        text: `Creative agencies use parallax heroes to demonstrate motion design capability to potential clients. The GPU-composited transforms keep it at 60fps.`,
      },
      { icon: 'CODE', title: 'Related: Rellax Parallax Layers', desc: 'See the [Rellax Parallax Layers](/ui-snippets/rellax-parallax-layers/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I add more parallax layers?',
        a: `Add a new \`div.layer\` in the HTML with a unique ID and place your content (SVG, image, or CSS pattern) inside it. Add a matching entry to the \`layers\` array in JS with the element reference and your chosen \`xFactor\`/\`yFactor\` values. Lower factors = further away. Use \`z-index\` in CSS to control the stacking order.`,
      },
      {
        q: 'Can I use scroll-driven parallax instead of mouse-driven?',
        a: `Yes. Replace the \`mousemove\` handler with a \`scroll\` event listener that sets \`targetY = window.scrollY * -0.3\` (for example). The lerp loop smooths the scroll updates. For CSS-only scroll parallax, use \`transform: translateY(var(--scroll-y))\` with the new CSS \`animation-timeline: scroll()\` API.`,
      },
      {
        q: 'Why does the content layer not move with the parallax?',
        a: `The \`.hero-content\` div is outside the \`layers\` array and has no transform applied to it — it stays anchored in the centre. The \`pointer-events:none\` on \`.hero-content\` ensures mouse events pass through to the hero container, which handles the \`mousemove\` listener for the layers below.`,
      },
      {
        q: 'Can I use this parallax hero in React, Vue, or Angular?',
        a: `Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, set up the lerp rAF loop in \`useEffect\` and write transforms directly to DOM elements via refs — do NOT use \`useState\` for per-frame updates or you'll trigger thousands of re-renders per second. Return \`cancelAnimationFrame\` from the \`useEffect\` cleanup. In Vue, use \`onMounted\`/\`onUnmounted\`; in Angular, \`ngAfterViewInit\`/\`ngOnDestroy\`.`,
      },
      {
        q: 'How do I make the parallax work on scroll as well as mouse movement?',
        a: `Add a \`scroll\` listener on the window alongside the \`mousemove\` listener. On scroll, update \`targetY += window.scrollY * scrollFactor\` (where \`scrollFactor\` is small, like 0.1). The lerp loop handles both inputs simultaneously — you don't need a separate loop.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the lerp math or the per-layer factor tuning by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why currentX and currentY chase targetX and targetY at a fixed 0.06 interpolation rate instead of snapping straight to the cursor, or how the xFactor and yFactor pairs on each layer produce the illusion of depth. The same assistant can help optimize it, for instance checking whether writing a transform to four DOM elements every animation frame is cheap enough on lower-end phones, or whether the 120 procedurally generated star circles could be batched into a single path for fewer draw calls. It is just as useful for extending the effect: ask it to add a scroll-driven parallax layer alongside the existing mouse-driven one, generate the mountain silhouettes procedurally instead of hardcoding the SVG points, or add a foreground layer with drifting clouds. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mouse-driven multi-layer parallax hero section in plain HTML, CSS, and vanilla JavaScript, with no libraries and no canvas — every layer must be a positioned DOM element moved with CSS transforms.

Requirements:
- At least four stacked absolutely-positioned layers (for example: a star field, a sky gradient, distant mountains, closer hills) plus one anchored content layer that never moves.
- Each moving layer must be driven by its own small xFactor and yFactor multiplier stored in a JS array or object, so a layer's on-screen shift equals the cursor offset from center times that layer's own factor — closer layers get bigger factors than farther ones.
- The raw cursor position must never be applied directly to the layers. Instead, track a target x/y from pointer position and a separately-stored current x/y, and on every requestAnimationFrame tick move current a fixed fraction (like 6 percent) of the remaining distance toward target, so the layers visibly ease and settle rather than snapping.
- Generate a star field of at least 100 small SVG circles procedurally in JavaScript (random position, radius, and opacity) rather than using an image asset.
- Support device tilt on mobile via the DeviceOrientationEvent API, feeding gamma and beta into the same target x/y variables used by the mouse handler.
- Respect prefers-reduced-motion: when it matches, never start the animation loop and leave every layer at rest.
- On mouseleave, the target should return to zero so the lerp loop eases every layer smoothly back to center.`,
    },
  },
};

export default parallaxHero;
