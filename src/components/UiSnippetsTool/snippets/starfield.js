const starfield = {
  id: 'starfield',
  title: 'Starfield',
  lastmod: '2026-06-23',
  category: 'animations',
  html: `<div class="sf-stage">
  <canvas id="sfCanvas" class="sf-canvas"></canvas>
  <div class="sf-overlay">
    <h1>Warp speed</h1>
    <p>A 3D starfield rendered on canvas — drag the slider to change speed.</p>
    <input type="range" id="sfSpeed" min="1" max="20" value="6" aria-label="Speed">
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif}

.sf-stage{position:relative;width:100%;height:100vh;overflow:hidden;background:#05060f}
.sf-canvas{position:absolute;inset:0;display:block}
.sf-overlay{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#fff;text-align:center;padding:20px;pointer-events:none}
.sf-overlay h1{font-size:44px;font-weight:800;letter-spacing:-.02em;text-shadow:0 2px 30px rgba(99,102,241,.6)}
.sf-overlay p{font-size:14px;color:#94a3b8;max-width:340px;line-height:1.6}
.sf-overlay input{pointer-events:auto;width:220px;accent-color:#6366f1;margin-top:6px}`,

  js: `var canvas = document.getElementById('sfCanvas');
var ctx = canvas.getContext('2d');
var speedInput = document.getElementById('sfSpeed');
var stars = [];
var COUNT = 400;
var speed = 6;
var w, h, cx, cy;

function resize() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
  cx = w / 2; cy = h / 2;
}

// Each star has x, y in a centered space and z = depth. Smaller z = closer.
function reset(s) {
  s.x = (Math.random() - 0.5) * w;
  s.y = (Math.random() - 0.5) * h;
  s.z = Math.random() * w;
  s.pz = s.z;       // previous z, for the motion-blur streak
}

function init() {
  resize();
  stars = [];
  for (var i = 0; i < COUNT; i++) { var s = {}; reset(s); stars.push(s); }
}

function frame() {
  // Fade the previous frame slightly instead of clearing — leaves light trails.
  ctx.fillStyle = 'rgba(5,6,15,0.35)';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#cdd6ff';
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    s.pz = s.z;
    s.z -= speed;                       // fly toward the viewer
    if (s.z < 1) { reset(s); continue; }
    // Project 3D position onto the 2D screen (perspective divide by z).
    var sx = cx + (s.x / s.z) * w;
    var sy = cy + (s.y / s.z) * w;
    var px = cx + (s.x / s.pz) * w;
    var py = cy + (s.y / s.pz) * w;
    var r = (1 - s.z / w) * 2.4;        // closer stars are bigger
    ctx.lineWidth = r;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }
  raf = requestAnimationFrame(frame);
}

var raf;
speedInput.addEventListener('input', function () { speed = +speedInput.value; });
window.addEventListener('resize', function () { resize(); });
init();
frame();`,

  seo: {
    title: 'Starfield — Canvas Warp-Speed Star Animation JS',
    description: `A 3D warp-speed starfield on canvas — perspective-projected stars with motion-blur streaks and adjustable speed. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Starfield — A 3D Warp-Speed Star Animation on HTML Canvas',
      description: `The warp-speed starfield — stars streaking outward from the centre as if you're flying through space — is a classic, mesmerising background effect. This snippet builds it on an HTML \`<canvas>\` with vanilla JavaScript, using real 3D perspective projection and motion-blur trails, plus an adjustable speed — no library and no images.

**Real 3D, projected to 2D**

Each star has an x, y position in a centred space and a z value representing its depth. Every frame, z decreases (the star flies toward you), and the star is drawn at a screen position computed by perspective projection: \`screenX = centerX + (x / z) × width\`. Dividing by z is what creates the perspective — as a star gets closer (smaller z), the same x/y spreads further from the centre, so stars accelerate outward toward the edges exactly like real motion through a star field. When a star passes the viewer (z < 1) it's recycled to a new random far-away position, keeping the field infinite.

**Motion-blur streaks, not dots**

Stars are drawn as short *lines*, not points: each frame remembers the star's previous z, projects both the old and new positions, and strokes a line between them. So a fast-moving star leaves a streak from where it was to where it is — the speed lines that sell the warp effect. The faster the speed, the longer the gap between frames and the longer the streak, so the motion blur scales naturally with velocity.

**Trails via a translucent clear**

Instead of clearing the canvas each frame, the snippet paints a semi-transparent dark rectangle over it. This dims the previous frame slightly rather than erasing it, so star streaks fade out over a few frames, adding a soft glowing trail behind everything. This translucent-overpaint trick is a cheap, classic way to get persistence-of-motion trails on canvas without tracking history.

**Adjustable speed and responsive**

A slider sets the \`speed\` (how fast z decreases), letting you go from a gentle drift to a hyperspace jump live. The canvas resizes with the window, recomputing the centre and dimensions, and the whole loop runs on \`requestAnimationFrame\` so it's smooth and pauses in background tabs. Closer stars are drawn thicker, reinforcing depth.

**Drop-in background and adaptable**

It's designed as a full-stage background with overlay content on top (a hero headline and the speed slider here). Tune \`COUNT\` for density, the speed range, the trail opacity, or the star colour. It's a complete, dependency-free reference for canvas perspective projection and motion-blur trails — the foundation of starfields, particle warps, and space backgrounds. If you're using this as a hero backdrop rather than a standalone demo, also wrap the \`requestAnimationFrame\` call to check \`prefers-reduced-motion\` and fall back to a static starry image — a screen-filling field of streaking lines is exactly the kind of motion that triggers discomfort for vestibular-sensitive visitors, and it costs only a few lines to respect the setting. Performance scales mainly with \`COUNT\` and canvas area: a single full-viewport canvas with a few hundred stars is cheap on desktop, but on a large 4K display or an underpowered mobile GPU the same pixel count costs more to fill every frame — if you notice dropped frames on low-end hardware, lowering \`COUNT\` is a more effective fix than reducing the trail opacity, since the per-star math (not the fill) is what dominates the frame budget at high densities.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A full-screen starfield animates behind a hero headline and a speed slider.` },
      { title: 'Adjust the speed', text: `Drag the slider from a gentle drift to a warp-speed streak.` },
      { title: 'Resize the window', text: `The canvas re-fits and the projection centre recomputes.` },
      { title: 'Tune density', text: `Change COUNT for more or fewer stars.` },
      { title: 'Overlay your content', text: `Put your hero text and CTAs in the overlay above the canvas.` },
      { title: 'Restyle it', text: `Change the background, star colour, trail opacity, or star size scaling.` },
    ] },
    features: [
      { title: '3D perspective projection', text: `Stars are projected with screen = center + (pos / z) × width, so they accelerate outward.` },
      { title: 'Infinite recycling', text: `Stars that pass the viewer reset to a far random position, keeping the field endless.` },
      { title: 'Motion-blur streaks', text: `Each star is a line from its previous to current position, scaling with speed.` },
      { title: 'Trail via translucent clear', text: `A semi-transparent overpaint each frame fades old streaks into soft trails.` },
      { title: 'Depth-scaled size', text: `Closer stars are drawn thicker, reinforcing the sense of depth.` },
      { title: 'Adjustable speed', text: `A slider changes the warp velocity live.` },
      { title: 'requestAnimationFrame loop', text: `Smooth rendering that pauses in background tabs.` },
      { title: 'Canvas, no library', text: `Pure canvas 2D and vanilla JS — no images or dependencies.` },
    ],
    useCases: [
      { title: 'Hero and landing backgrounds', text: `A dynamic space backdrop behind a headline — pair with a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/) for other ambient looks.` },
      { title: 'Coming-soon and launch pages', text: `A warp-speed background for a teaser, alongside a [coming soon hero](/ui-snippets/coming-soon-hero/).` },
      { title: 'Game and sci-fi UIs', text: `A flying-through-space effect for menus and loaders.` },
      { title: 'Login and splash screens', text: `An eye-catching animated backdrop.` },
      { title: 'Event and product reveals', text: `Build anticipation with motion behind the content.` },
      { title: 'Learning canvas projection', text: `A reference for 3D-to-2D projection and motion trails — compare with [floating particles](/ui-snippets/floating-particles/).` },
    ],
    faqs: [
      { q: 'How does the 3D perspective work?', a: `Each star has x, y in a centred space and z for depth. The screen position is center + (x / z) × width (and the same for y). Dividing by z is the perspective divide: as z shrinks (the star nears you), the same x/y maps further from the centre, so stars fan outward and accelerate toward the edges — the hallmark of flying through a star field. Each frame z decreases by the speed value.` },
      { q: 'How are the streaks created?', a: `Stars are drawn as lines, not dots. Each frame the code keeps the star's previous z, projects both the old and new positions to screen coordinates, and strokes a line between them. A star moving fast covers more distance per frame, so the line is longer — the motion blur scales with speed automatically, producing the warp speed-lines.` },
      { q: 'Why paint a translucent rectangle instead of clearing the canvas?', a: `Clearing fully each frame would show only the current single-frame streaks. Painting a semi-transparent dark rectangle over the previous frame dims it instead of erasing it, so each streak lingers and fades over several frames — adding a soft glowing trail. It's a classic, cheap canvas technique for persistence-of-motion without storing past frames.` },
      { q: 'How do I control density and performance?', a: `COUNT sets the number of stars; a few hundred is smooth on most devices. The loop is O(COUNT) per frame with simple math and one stroke each, so it scales well, but lower COUNT or streak detail on low-end devices. Because it uses requestAnimationFrame, it automatically pauses when the tab is hidden, saving battery.` },
      { q: 'How do I use this starfield in React, Vue, or Angular?', a: `Put the canvas in a ref, and start the animation loop in a useEffect (React), onMounted (Vue), or ngAfterViewInit (Angular), cancelling the requestAnimationFrame and removing the resize listener on cleanup/unmount to avoid leaks. Hold speed in state bound to the slider. The projection and drawing code is framework-agnostic — only the lifecycle and the canvas ref move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the perspective-divide math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why dividing x and y by z is what makes stars accelerate outward as they approach, or how storing each star's previous z alongside its current z produces a motion-blur line instead of a single dot. The same assistant can help optimize it, for example checking whether COUNT stars with individual stroke calls per frame could be batched into fewer canvas draw calls, or whether the translucent-overpaint trail technique scales differently on a 4K display versus a small mobile viewport as the FAQ discusses. It's also useful for extending the feature: ask it to add mouse-parallax so the star field subtly shifts with cursor position, tint stars by depth for a more colorful nebula feel, or add a prefers-reduced-motion fallback that freezes the field into a static starry image. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 3D warp-speed starfield animation on an HTML canvas, in plain JavaScript, no libraries.

Requirements:
- Generate a fixed number of stars, each with a random x and y position in a coordinate space centered on the canvas, and a random z depth value representing distance from the viewer.
- Every animation frame, decrease each star's z by a speed value (making it approach the viewer), and project its 3D position to a 2D screen coordinate using true perspective division: screen position equals the canvas center plus (position divided by z) times the canvas width — not a linear or fixed-ratio scale.
- When a star's z drops below a small threshold (it has passed the viewer), immediately reset it to a new random position with a large random z, so the field appears infinite rather than emptying out.
- Draw each star as a short line (not a single dot) from its previous frame's projected position to its current frame's projected position, so faster-moving stars produce visibly longer streaks, and make each star's line thickness increase as its z decreases (closer stars appear bigger).
- Instead of clearing the canvas completely each frame, paint a semi-transparent dark rectangle over the entire canvas before drawing the new star positions, so previous streaks fade gradually into soft trails rather than disappearing instantly.
- Provide a range slider that live-updates the speed variable driving how fast z decreases, and make the canvas resize responsively to its container, recomputing the center point used for projection.
- As a documented accessibility note in a code comment, describe how to check prefers-reduced-motion and fall back to a single static rendered frame instead of a continuously looping animation.`,
    },
  },
};

export default starfield;
