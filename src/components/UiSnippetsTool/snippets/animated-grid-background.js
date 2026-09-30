const animatedGridBackground = {
  id: 'animated-grid-background',
  title: 'Animated Grid Background',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="gb-hero" id="gbHero">
  <div class="gb-grid" aria-hidden="true"></div>
  <div class="gb-spot" id="gbSpot" aria-hidden="true"></div>
  <div class="gb-fade" aria-hidden="true"></div>
  <div class="gb-content">
    <span class="gb-pill">◆ Infrastructure</span>
    <h1>Deploy on a grid<br>that moves with you</h1>
    <p>An animated dot-grid backdrop with a cursor spotlight — pure CSS and one tiny script.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05050a;color:#fff}

.gb-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center}

.gb-grid{position:absolute;inset:-2px;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:46px 46px;animation:gbPan 18s linear infinite}
@keyframes gbPan{to{background-position:46px 46px}}

.gb-spot{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.5),transparent 65%);transform:translate(-50%,-50%);left:50%;top:40%;pointer-events:none;filter:blur(20px);transition:left .12s ease-out,top .12s ease-out}

.gb-fade{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 30%,#05050a 78%)}

.gb-content{position:relative;z-index:1;padding:0 20px;max-width:620px}
.gb-pill{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.04em;color:#c7d2fe;background:rgba(99,102,241,.16);border:1px solid rgba(99,102,241,.4);padding:6px 13px;border-radius:999px;margin-bottom:18px}
.gb-content h1{font-size:clamp(30px,6.5vw,56px);font-weight:900;letter-spacing:-.03em;line-height:1.07;margin-bottom:14px}
.gb-content p{font-size:15.5px;color:#a9a9c2;line-height:1.55}`,

  js: `var hero = document.getElementById('gbHero');
var spot = document.getElementById('gbSpot');
var target = { x: 0.5, y: 0.4 }, current = { x: 0.5, y: 0.4 };
var hasPointer = false;

hero.addEventListener('pointermove', function (e) {
  var rect = hero.getBoundingClientRect();
  target.x = (e.clientX - rect.left) / rect.width;
  target.y = (e.clientY - rect.top) / rect.height;
  hasPointer = true;
});
hero.addEventListener('pointerleave', function () { hasPointer = false; });

var t = 0;
function loop() {
  t += 0.012;
  // When idle, the spotlight drifts on a slow Lissajous path; when the pointer
  // is active, it eases toward the cursor. Either way we lerp for smoothness.
  if (!hasPointer) {
    target.x = 0.5 + Math.cos(t) * 0.22;
    target.y = 0.42 + Math.sin(t * 1.3) * 0.18;
  }
  current.x += (target.x - current.x) * 0.08;
  current.y += (target.y - current.y) * 0.08;
  spot.style.left = (current.x * 100) + '%';
  spot.style.top = (current.y * 100) + '%';
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);`,

  seo: {
    title: 'Animated Grid Background — Free HTML CSS JS Hero Snippet',
    description: `A panning dot-grid hero backdrop with a cursor-following spotlight that drifts on its own when idle, plus a vignette fade. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Animated Grid Background — Panning Grid with Cursor Spotlight',
      description: `The animated grid background is the technical-but-elegant hero backdrop seen on infrastructure, dev-tool, and crypto sites: a subtle grid of lines that slowly pans, lit by a soft glowing spotlight that follows your cursor — and gently drifts on its own when the mouse is idle. This snippet builds the whole scene in plain HTML, CSS, and one small vanilla JavaScript loop, with no canvas and no images.

**The grid, drawn with gradients**

The grid is a pure-CSS pattern: two \`linear-gradient\` backgrounds — one for horizontal lines, one vertical — each a 1px opaque line over transparent, tiled at \`46px\` via \`background-size\`. Layering the two gives a crisp graph-paper grid with no SVG or image. Animating \`background-position\` by exactly one tile (\`46px 46px\`) over 18 seconds on the \`gbPan\` keyframe makes the whole grid pan diagonally and loop seamlessly, because shifting by one full cell lands on an identical pattern.

**The cursor spotlight**

A blurred radial-gradient circle, \`.gb-spot\`, acts as a light that reveals the grid beneath it. A \`pointermove\` listener converts the cursor position into normalized 0–1 coordinates relative to the hero, which become the spotlight's target. Because the spotlight is \`pointer-events: none\`, it never blocks interaction, and its \`filter: blur(20px)\` softens it into ambient light rather than a hard disc.

**Smoothing with linear interpolation**

Raw pointer coordinates are jittery, so the animation loop eases the spotlight toward its target using lerp: \`current += (target - current) * 0.08\` each frame. This is the standard trick for buttery cursor-following — the light always chases the pointer but lags slightly, giving a fluid, weighted feel instead of snapping. The 0.08 factor controls how tight or loose that follow is.

**Idle drift on a Lissajous path**

The detail that makes this feel premium: when the pointer leaves or hasn't moved, the spotlight doesn't freeze. A \`hasPointer\` flag switches the target to a slowly evolving Lissajous curve — \`cos(t)\` for x and \`sin(t * 1.3)\` for y — so the light wanders in a smooth, never-repeating loop around the hero. The moment you move the mouse again, the target snaps back to the cursor and the same lerp eases it over. One loop handles both modes.

**The vignette**

A \`.gb-fade\` layer is a radial gradient from transparent in the center to the page background at the edges, darkening the grid toward the corners. This focuses attention on the centered content and hides the grid's hard edges, so the pattern appears to dissolve into the page rather than stopping at a border.

**Customizing it**

Change \`background-size\` for a denser or sparser grid, recolor the line opacity for a bolder or subtler look, resize and recolor the spotlight's radial gradient, and tune the lerp factor for a tighter or lazier cursor follow. Adjust the Lissajous frequencies for a different idle path. Pair it with [text generate](/ui-snippets/text-generate/) headline copy or a [shimmer button](/ui-snippets/shimmer-button/) to complete a developer-product hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A hero renders with a subtly panning grid and a glowing spotlight.` },
      { title: 'Move your cursor', text: `The spotlight eases toward the pointer, revealing the grid beneath.` },
      { title: 'Stop moving', text: `The light drifts on its own along a slow looping path.` },
      { title: 'Note the vignette', text: `The grid fades into the page toward the corners.` },
      { title: 'Resize the grid', text: `Change background-size for denser or sparser lines.` },
      { title: 'Tune the follow', text: `Adjust the lerp factor and spotlight size and color.` },
    ] },
    features: [
      { title: 'CSS-only grid', text: `Two linear-gradients tiled — no SVG or image.` },
      { title: 'Seamless pan', text: `background-position shifts one full cell and loops.` },
      { title: 'Cursor spotlight', text: `A blurred radial light follows the pointer.` },
      { title: 'Lerp smoothing', text: `The light eases toward its target each frame.` },
      { title: 'Idle Lissajous drift', text: `It wanders on a smooth curve when idle.` },
      { title: 'Single unified loop', text: `One rAF handles cursor and idle modes.` },
      { title: 'Vignette fade', text: `A radial mask dissolves the grid into the page.` },
      { title: 'Non-blocking light', text: `pointer-events none keeps the hero interactive.` },
    ],
    useCases: [
      { title: 'Dev-tool heroes', text: `Backdrop for [text generate](/ui-snippets/text-generate/) headline copy.` },
      { title: 'Infrastructure sites', text: `Pair with a [shimmer button](/ui-snippets/shimmer-button/) CTA.` },
      { title: 'Crypto and fintech', text: `A technical backdrop behind a [startup hero](/ui-snippets/startup-hero/).` },
      { title: 'Docs landing pages', text: `Frame a [floating pill nav](/ui-snippets/floating-pill-nav/) above it.` },
      { title: 'Product launches', text: `Set the stage for an [animated gradient CTA](/ui-snippets/animated-gradient-cta/).` },
      { title: 'Spotlight effect demos', text: `A reference for lerp-based cursor following.` },
      { icon: 'CODE', title: 'Related: Anime.js SVG Shape Morph', desc: 'See the [Anime.js SVG Shape Morph](/ui-snippets/anime-js-morph-shapes/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Character Wobble Hover Text', desc: 'See the [Character Wobble Hover Text](/ui-snippets/character-wobble-hover-text/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the grid drawn without images?', a: `Two layered linear-gradients — one horizontal, one vertical — each paint a 1px opaque line over transparent, tiled at 46px via background-size. That produces a crisp graph-paper grid in pure CSS. Animating background-position by exactly one 46px cell loops seamlessly because shifting by a full tile lands on an identical pattern.` },
      { q: 'Why does the spotlight lag behind the cursor?', a: `The loop eases the light toward the pointer with linear interpolation: current += (target - current) * 0.08 each frame. Raw pointer coordinates are jittery, so this lerp gives a smooth, weighted follow where the light always chases but trails slightly. The 0.08 factor sets how tight or loose the follow feels.` },
      { q: 'What does the light do when I stop moving the mouse?', a: `A hasPointer flag flips on pointerleave, switching the target to a slowly evolving Lissajous curve — cos(t) for x and sin(t*1.3) for y — so the spotlight wanders in a smooth, non-repeating loop. Moving the mouse again resets the target to the cursor, and the same lerp eases it back.` },
      { q: 'How does the grid blend into the page?', a: `A vignette layer is a radial gradient from transparent at the center to the page background color at the edges. It darkens the grid toward the corners, focusing attention on the centered content and hiding the grid's hard boundary so the pattern appears to dissolve into the page.` },
      { q: 'How do I use this animated grid background in React, Vue, or Angular?', a: `Keep the grid and vignette as static CSS layers. Run the rAF loop in a mount effect, storing target and current in refs so pointer moves don't trigger re-renders, and cancel the frame on unmount. Attach pointermove and pointerleave to the hero ref. In Tailwind, build the grid with a bg-[linear-gradient(...)] arbitrary value and animate background-position via a keyframe in the config.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the lerp and Lissajous math by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why current.x is nudged toward target.x by a fraction each frame instead of being set directly, and how the hasPointer flag lets one requestAnimationFrame loop smoothly hand off between "chasing the cursor" and "drifting on a Lissajous curve". The same assistant is useful for optimizing it — asking whether the two-linear-gradient grid technique is cheaper to repaint than an SVG pattern at large viewport sizes, and whether the rAF loop should throttle when the hero scrolls out of view. It's just as good for extending it: ask it to make the spotlight change color based on scroll position, add a second smaller trailing spotlight for a comet-like effect, or expose the grid density and lerp speed as data attributes so the component is reusable across multiple heroes on one page. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "animated grid background" hero in plain HTML, CSS, and JavaScript — no canvas, no images, no libraries, using two linear-gradients for the grid and a lerp-smoothed spotlight.

Requirements:
- A full-height hero section with a background grid made from exactly two linear-gradient layers (one for horizontal lines, one for vertical), each a thin opaque line over transparent, tiled at a fixed pixel size via background-size — do not use an SVG pattern or a background image for the grid.
- Animate the grid's background-position with a linear infinite CSS keyframe that shifts it by exactly one tile's width and height, so the pan loops seamlessly with no visible jump.
- A separate blurred, circular radial-gradient "spotlight" element, positioned with left/top percentages and pointer-events disabled so it never blocks interaction with the hero.
- In JavaScript, track the spotlight's target position as normalized 0-1 coordinates. On pointermove over the hero, compute the pointer's position relative to the hero's bounding box and set it as the target; on pointerleave, mark the pointer as inactive.
- Run one continuous requestAnimationFrame loop that: when the pointer is inactive, computes the target position from a slowly evolving Lissajous curve (different sine/cosine frequencies for x and y) so the spotlight drifts in a smooth, never-repeating path; when the pointer is active, keeps the target locked to the cursor. In both cases, ease the spotlight's current displayed position toward the target using linear interpolation (current += (target - current) * smallFactor) every frame, rather than snapping directly to the target, so the motion feels weighted and lag-free of jitter.
- Add a radial-gradient vignette layer over the whole hero, transparent in the center and fading to the page's background color at the edges, so the grid dissolves into the page rather than showing a hard rectangular edge.`,
    },
  },
};

export default animatedGridBackground;
