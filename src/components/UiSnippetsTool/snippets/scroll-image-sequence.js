const scrollImageSequence = {
  id: 'scroll-image-sequence',
  title: 'Scroll Image Sequence',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="isq-top"><p>Scroll ↓</p></section>
<section class="isq-stage" id="isqStage">
  <canvas id="isqCanvas" width="640" height="400"></canvas>
  <div class="isq-caption">
    <span class="isq-eyebrow">Canvas frame scrubbing</span>
    <h2>Every scroll tick is a frame</h2>
    <p>Frame <span id="isqFrame">1</span> / <span id="isqTotal">80</span></p>
  </div>
</section>
<section class="isq-bottom"><p>The sequence played forward — scroll up to run it in reverse.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.isq-top,.isq-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.isq-stage{position:relative;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:26px;overflow:hidden;background:radial-gradient(80% 70% at 50% 40%,#12172e,#07080d)}
#isqCanvas{width:min(640px,92vw);height:auto;border-radius:18px;border:1px solid rgba(255,255,255,.08);background:#0b0e18;box-shadow:0 30px 80px rgba(0,0,0,.55)}
.isq-caption{text-align:center;display:flex;flex-direction:column;gap:8px}
.isq-eyebrow{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#9fb4ff}
.isq-caption h2{font-size:clamp(22px,4.4vw,40px);font-weight:800;letter-spacing:-.02em}
.isq-caption p{color:#8a90a8;font-size:14px;font-variant-numeric:tabular-nums}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var canvas = document.getElementById('isqCanvas');
var ctx = canvas.getContext('2d');
var W = canvas.width, H = canvas.height;
var FRAMES = 80;
var frames = [];

// Pre-render every frame once into offscreen canvases (stands in for a
// folder of exported PNG frames — swap this loop for an Image() preloader).
for (var i = 0; i < FRAMES; i++) {
  var off = document.createElement('canvas');
  off.width = W; off.height = H;
  var c = off.getContext('2d');
  var t = i / (FRAMES - 1);

  c.fillStyle = '#0b0e18';
  c.fillRect(0, 0, W, H);

  var cx = W / 2, cy = H / 2;

  // Orbiting particle ring that expands, contracts and hue-shifts
  for (var d = 0; d < 16; d++) {
    var ang = (d / 16) * Math.PI * 2 + t * Math.PI * 2.5;
    var rad = 74 + 58 * Math.sin(t * Math.PI);
    var x = cx + Math.cos(ang) * rad * 1.7;
    var y = cy + Math.sin(ang) * rad * 0.72;
    var r = 4.5 + 3 * Math.sin(ang * 3 + t * 7);
    c.beginPath();
    c.arc(x, y, Math.max(r, 1.5), 0, Math.PI * 2);
    c.fillStyle = 'hsl(' + (205 + t * 120 + d * 5) + ',85%,66%)';
    c.fill();
  }

  // Glowing core that grows across the sequence
  var glow = c.createRadialGradient(cx, cy, 4, cx, cy, 58 + 34 * t);
  glow.addColorStop(0, 'hsla(' + (215 + t * 120) + ',90%,72%,.95)');
  glow.addColorStop(1, 'hsla(' + (215 + t * 120) + ',90%,55%,0)');
  c.fillStyle = glow;
  c.beginPath();
  c.arc(cx, cy, 58 + 34 * t, 0, Math.PI * 2);
  c.fill();

  frames.push(off);
}

var counter = document.getElementById('isqFrame');
document.getElementById('isqTotal').textContent = FRAMES;

// One numeric proxy object is tweened; painting happens in onUpdate.
var playhead = { frame: 0 };
function render() {
  var idx = Math.round(playhead.frame);
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(frames[idx], 0, 0);
  counter.textContent = idx + 1;
}
render();

gsap.to(playhead, {
  frame: FRAMES - 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#isqStage',
    start: 'top top',
    end: '+=250%',
    scrub: 0.4,
    pin: true
  },
  onUpdate: render
});`,

  seo: {
    title: 'Scroll Image Sequence — Free GSAP Canvas Scrub Snippet',
    description: `Apple-style canvas frame sequence scrubbed by the scrollbar: 80 pre-rendered frames drawn per scroll tick with GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Image Sequence — Scrub a Canvas Frame Animation With the Scrollbar',
      description: `The scroll image sequence is the technique behind Apple's AirPods and MacBook pages: an animation rendered as individual frames, drawn to a \`<canvas>\`, with the scrollbar acting as the playhead. Scroll down and the sequence plays forward frame by frame; scroll up and it runs in reverse. This snippet builds the full pipeline — frame storage, a numeric playhead, and a pinned, scrubbed ScrollTrigger — with GSAP loaded from a CDN.

**Frames are pre-rendered once, not drawn per scroll event**

The demo generates 80 frames procedurally (an orbiting particle ring with a growing core) and paints each one into its own offscreen \`document.createElement('canvas')\` at build time. That mirrors how a production sequence works with exported PNGs: every frame is decoded and rasterized exactly once, up front, so scrolling never triggers image decoding or geometry math. The scroll handler's only job is a single \`drawImage()\` blit of an already-painted bitmap — the cheapest possible paint the canvas API offers.

**A numeric playhead object is what actually gets tweened**

GSAP can't tween a canvas, so the snippet tweens a plain proxy object: \`gsap.to(playhead, { frame: FRAMES - 1 })\`. The tween's \`onUpdate\` rounds \`playhead.frame\` to an integer index and blits that frame. This proxy pattern is the standard way to scrub any non-DOM target — video currentTime, WebGL uniforms, chart data — because ScrollTrigger just needs *some* number to interpolate between its start and end.

**Pinning turns scroll distance into a timeline**

The stage is pinned with \`start: 'top top'\` and \`end: '+=250%'\`, so the section holds still while two and a half viewport-heights of scrolling map onto the 80 frames — roughly 20px of scroll per frame, enough resolution that the motion reads as continuous. \`scrub: 0.4\` adds a short smoothing window so trackpad flicks glide between frames instead of stuttering, while still snapping to the scrollbar within half a second.

**Why Math.round and not floor**

The playhead arrives as a float (frame 37.6), and \`Math.round\` picks the nearest frame in either direction. Flooring would bias the sequence backward — you'd only see frame N once you'd fully passed it — which makes reversing feel laggy by one frame. Rounding keeps forward and reverse playback symmetric.

**The frame counter is part of the same update**

The caption's "Frame 38 / 80" label updates inside the same \`onUpdate\` as the blit, so the number and the pixels can never drift apart. \`font-variant-numeric: tabular-nums\` keeps the counter from jittering horizontally as digits change width.

**Swapping in real exported frames**

To use a real sequence, replace the procedural loop with an \`Image()\` preloader: build URLs like \`frame_0001.jpg\` … \`frame_0080.jpg\`, push each loaded image into \`frames\`, and start the ScrollTrigger once \`Promise.all\` resolves. Everything downstream — the proxy, rounding, and blitting — stays identical, because \`drawImage()\` accepts images and canvases interchangeably.

**Canvas resolution is decoupled from display size**

The canvas's attribute size (640×400) fixes the bitmap resolution, while CSS scales it down responsively with \`width: min(640px, 92vw)\` — downscaling a fixed bitmap always stays sharp. For retina-crisp output, multiply the attribute size by \`devicePixelRatio\`, render frames at that resolution, and keep the CSS size unchanged; every \`drawImage\` call then blits at native density. Because the frames were pre-rendered at the same resolution as the visible canvas, no per-frame scaling interpolation happens during the scrub — the blit is a straight memory copy.

**Customizing it**

Raise \`FRAMES\` for smoother motion (120–150 for hero sequences), stretch \`end\` for a slower scrub, or layer HTML captions that fade in at timeline positions alongside the canvas. Pair it with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) for the section before, a [scroll text clip reveal](/ui-snippets/scroll-text-clip-reveal/) for copy, or a [scroll parallax layers](/ui-snippets/scroll-parallax-layers/) section after the sequence ends.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `80 frames pre-render into offscreen canvases on load.` },
      { title: 'Scroll into the stage', text: `The section pins and the sequence starts playing.` },
      { title: 'Watch the counter', text: `The frame label tracks the exact frame on screen.` },
      { title: 'Scroll back up', text: `The animation runs in reverse, frame-perfect.` },
      { title: 'Swap in real frames', text: `Replace the procedural loop with an Image() preloader.` },
    ] },
    features: [
      { title: 'Frame scrubbing', text: `The scrollbar is the animation playhead.` },
      { title: 'Offscreen pre-render', text: `Every frame is painted once at load.` },
      { title: 'Proxy tween', text: `GSAP tweens a plain { frame } object.` },
      { title: 'Single-blit paint', text: `Scrolling costs one drawImage call.` },
      { title: 'Pinned stage', text: `250% of scroll maps onto 80 frames.` },
      { title: 'Smoothed scrub', text: `scrub: 0.4 glides between frames.` },
      { title: 'Synced counter', text: `Frame label updates in the same tick.` },
      { title: 'Reversible', text: `Rounding keeps reverse playback symmetric.` },
    ],
    useCases: [
      { title: 'Product 360 rotations', text: 'Rotate a product through 80 pre-rendered frames as the scrollbar acts as the playhead, the technique behind Apple\'s product pages.' },
      { title: 'Feature walkthroughs', text: 'Scrub an exploded-view sequence, following a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) opener with [scroll pin steps](/ui-snippets/scroll-pin-steps/) for the narrative.' },
      { title: 'Story scenes', text: 'Drive a rendered scene inside a [scroll pin story](/ui-snippets/scroll-pin-story/), with every frame painted once offscreen so scrolling costs a single `drawImage` call.' },
      { title: 'Hero follow-ups', text: 'Follow the sequence with a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/), tweening a plain proxy object that holds the current frame number.' },
      { title: 'Data and editorial animations', text: 'Scrub a pre-rendered chart build near a [scroll story chart](/ui-snippets/scroll-story-chart/), or mix with [scroll parallax layers](/ui-snippets/scroll-parallax-layers/) for depth.' },
      { icon: 'CODE', title: 'Related: Scroll-Synced Margin Annotations', desc: 'See the [Scroll-Synced Margin Annotations](/ui-snippets/scroll-margin-annotations-sync/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does scrolling control the canvas animation?', a: `GSAP tweens a plain proxy object from frame 0 to frame 79 on a pinned, scrubbed ScrollTrigger. The tween's onUpdate rounds the float to an integer and blits that pre-rendered frame with drawImage. Because scrub ties tween progress to scroll position, the scrollbar literally is the playhead — forward, backward, or stopped mid-frame.` },
      { q: 'Why pre-render frames instead of drawing on each scroll event?', a: `Painting geometry per scroll event would redo gradient, arc, and trig work dozens of times a second. Pre-rendering into offscreen canvases moves all of that to load time, so the scroll path is a single drawImage blit of a finished bitmap — the same reason production sites export PNG frames rather than re-rendering 3D per tick.` },
      { q: 'How do I use real exported PNG or JPG frames?', a: `Replace the procedural loop with an Image() preloader: generate numbered URLs (frame_0001.jpg and so on), assign each to a new Image, push them into the frames array, and create the ScrollTrigger inside Promise.all so scrubbing never hits an undecoded frame. drawImage accepts images and canvases interchangeably, so nothing else changes.` },
      { q: 'How many frames and how much scroll distance should I use?', a: `The demo maps 80 frames across end: '+=250%', about 20px of scroll per frame, which reads as continuous motion. For hero sequences 100–150 frames is typical; keep roughly 15–30px of scroll per frame by scaling end with the frame count, and let scrub smoothing (0.3–0.6) hide any remaining stepping.` },
      { q: 'Can I scrub a video instead of an image sequence?', a: `You can tween video.currentTime with the same proxy pattern, but browsers only seek quickly to keyframes — scrubbing between them causes visible stalls, and Safari throttles rapid seeks aggressively. That's exactly why Apple-style pages export frames instead: a canvas blit is deterministic at any playhead position. If you must use video, re-encode it with a keyframe every frame (all-intra) to make seeking scrub-safe.` },
      { q: 'How do I use this scroll image sequence in React, Vue, or Angular?', a: `Run the frame pre-render and ScrollTrigger setup in a mount effect (useEffect, onMounted, or ngAfterViewInit) with a ref to the canvas instead of getElementById. Store the frames array in a ref so re-renders don't rebuild it, and return a cleanup that kills the trigger (or reverts a gsap.context) so the pin is removed on unmount. Tailwind can replace the layout CSS; the canvas logic ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the frame math or the proxy-object tween pattern alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why GSAP tweens a plain playhead object instead of the canvas directly, or why Math.round rather than Math.floor keeps forward and reverse playback symmetric. The same assistant can help optimize it — checking whether pre-rendering 80 offscreen canvases up front is worth the memory versus lazily decoding real image frames, or whether the resolution should scale with devicePixelRatio for retina screens. It's also useful for extending the effect: ask it to swap the procedural particle ring for a real exported PNG sequence loaded with an Image preloader, add captions that change at specific frame numbers, or sync the frame counter to a second scrubbed element. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll image sequence" effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) and the Canvas 2D API — no video element, no WebGL.

Requirements:
- Pre-render a fixed number of frames (e.g. 80) once at load time, each painted into its own offscreen canvas created with document.createElement, not redrawn on every scroll event.
- Store all the offscreen canvases in an array indexed by frame number.
- Create a single plain JavaScript object with a numeric "frame" property and tween that object's frame value from 0 to frames.length - 1 using GSAP, with ease set to none.
- Drive that tween from a ScrollTrigger with pin: true and scrub set to a smoothing value (not a boolean) so the motion glides slightly between wheel ticks, over a scroll distance long enough that each frame corresponds to roughly 15-30px of scroll.
- In the tween's onUpdate callback, round the current playhead frame value to the nearest integer (not floor, so forward and reverse feel symmetric) and draw that frame's offscreen canvas onto the visible canvas with a single drawImage call after clearing it.
- Update a text counter showing the current frame number out of the total inside the same onUpdate callback so the label can never drift out of sync with the drawn frame.
- Confirm scrolling back up plays the frames in reverse order automatically because the tween is scrubbed, with no separate reverse-playback code path.`,
    },
  },
};

export default scrollImageSequence;
