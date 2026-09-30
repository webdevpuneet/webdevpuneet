const pixiParticleField = {
  id: 'pixi-particle-field',
  title: 'Pixi.js Particle Field',
  lastmod: '2026-08-02',
  category: 'animations',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/pixi.js@7.4.0/dist/pixi.min.js'],
  html: `<div class="ppf-stage" id="ppfStage">
  <div class="ppf-ui">
    <span class="ppf-tag">pixi.js · webgl</span>
    <h2>2,400 sprites, one draw call</h2>
    <p>Move your pointer through the field — every particle is repelled individually.</p>
    <div class="ppf-row">
      <span class="ppf-fps"><b id="ppfFps">60</b> fps</span>
      <button class="ppf-btn" id="ppfBurst">Burst</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#04050d;color:#fff;min-height:100vh;overflow:hidden}
.ppf-stage{position:relative;width:100vw;height:100vh}
.ppf-stage canvas{display:block;position:absolute;inset:0}

.ppf-ui{position:absolute;left:50%;bottom:34px;transform:translateX(-50%);z-index:2;text-align:center;padding:20px 26px;border-radius:18px;background:rgba(8,10,22,.6);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 60px -28px rgba(0,0,0,.9);width:min(340px,calc(100vw - 40px))}
.ppf-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc;background:rgba(240,171,252,.12);border:1px solid rgba(240,171,252,.3);padding:4px 10px;border-radius:99px;margin-bottom:10px}
.ppf-ui h2{font-size:19px;font-weight:800;letter-spacing:-.02em}
.ppf-ui p{font-size:12.5px;color:#8f9ab8;margin-top:6px;line-height:1.55}
.ppf-row{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:16px}
.ppf-fps{font-size:12px;color:#8f9ab8;font-variant-numeric:tabular-nums}
.ppf-fps b{color:#5eead4;font-size:15px}
.ppf-btn{padding:9px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#dbe3fb;font:600 12.5px system-ui;cursor:pointer;transition:background .16s}
.ppf-btn:hover{background:rgba(255,255,255,.13)}`,

  js: `var stage = document.getElementById('ppfStage');

var app = new PIXI.Application({
  resizeTo: stage,
  backgroundColor: 0x04050d,
  antialias: true,
  resolution: Math.min(window.devicePixelRatio, 2),
  autoDensity: true
});
stage.appendChild(app.view);

// One white circle rendered once into a GPU texture. Every sprite reuses it
// and is only tinted — which is what lets thousands share a single draw call.
var g = new PIXI.Graphics();
g.beginFill(0xffffff);
g.drawCircle(0, 0, 24);
g.endFill();
var texture = app.renderer.generateTexture(g, { resolution: 2 });
g.destroy();

var COUNT = 2400;
var TINTS = [0x818cf8, 0x22d3ee, 0xf0abfc, 0x5eead4, 0xfbbf24];

var container = new PIXI.ParticleContainer(COUNT, {
  position: true,
  scale: true,
  tint: true,
  alpha: true
});
app.stage.addChild(container);

var parts = [];

function seed(sprite) {
  sprite.x = Math.random() * app.screen.width;
  sprite.y = Math.random() * app.screen.height;
  var s = 0.06 + Math.random() * 0.16;
  sprite.scale.set(s);
  sprite.alpha = 0.25 + Math.random() * 0.5;
  return { sp: sprite, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, base: s };
}

for (var i = 0; i < COUNT; i++) {
  var sp = new PIXI.Sprite(texture);
  sp.anchor.set(0.5);
  sp.tint = TINTS[i % TINTS.length];
  sp.blendMode = PIXI.BLEND_MODES.ADD;
  container.addChild(sp);
  parts.push(seed(sp));
}

var pointer = { x: -9999, y: -9999 };
stage.addEventListener('pointermove', function (e) {
  var r = stage.getBoundingClientRect();
  pointer.x = e.clientX - r.left;
  pointer.y = e.clientY - r.top;
});
stage.addEventListener('pointerleave', function () {
  pointer.x = pointer.y = -9999;
});

var RADIUS = 150;
var RADIUS_SQ = RADIUS * RADIUS;

app.ticker.add(function (delta) {
  var w = app.screen.width, h = app.screen.height;

  for (var i = 0; i < parts.length; i++) {
    var p = parts[i], sp = p.sp;

    var dx = sp.x - pointer.x;
    var dy = sp.y - pointer.y;
    var d2 = dx * dx + dy * dy;

    // Compare squared distances — no Math.sqrt unless the particle is actually
    // in range. At 2,400 particles a frame that is 2,400 square roots saved.
    if (d2 < RADIUS_SQ && d2 > 0.01) {
      var d = Math.sqrt(d2);
      var push = (1 - d / RADIUS) * 1.6;
      p.vx += (dx / d) * push;
      p.vy += (dy / d) * push;
    }

    p.vx *= 0.96;
    p.vy *= 0.96;
    sp.x += p.vx * delta;
    sp.y += p.vy * delta;

    if (sp.x < -20) sp.x = w + 20;
    else if (sp.x > w + 20) sp.x = -20;
    if (sp.y < -20) sp.y = h + 20;
    else if (sp.y > h + 20) sp.y = -20;
  }
});

var fpsEl = document.getElementById('ppfFps');
setInterval(function () { fpsEl.textContent = Math.round(app.ticker.FPS); }, 500);

document.getElementById('ppfBurst').addEventListener('click', function () {
  var cx = app.screen.width / 2, cy = app.screen.height / 2;
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    var a = Math.random() * Math.PI * 2;
    var f = 4 + Math.random() * 9;
    p.sp.x = cx; p.sp.y = cy;
    p.vx = Math.cos(a) * f;
    p.vy = Math.sin(a) * f;
  }
});`,

  seo: {
    title: 'Pixi.js Particle Field — WebGL Sprite Background',
    description: 'A WebGL field of 2,400 additive sprites with pointer repulsion, batched through a Pixi ParticleContainer. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Pixi.js Particle Field — Why WebGL Beats Canvas 2D at Scale',
      description: `A canvas 2D particle background is fine at a few hundred particles. Past roughly a thousand it starts costing frames, because every particle is a separate \`arc()\` and \`fill()\` and the CPU is issuing every one of those calls individually.

**Pixi.js** is a WebGL renderer, and it changes the economics completely: sprites that share a texture and blend mode are **batched into a single draw call** and rasterized by the GPU in parallel. This field runs 2,400 particles with pointer physics comfortably at 60fps, and the interesting part is the handful of decisions that make that possible.

## One texture, generated once

Every particle is the same white circle:

\`var g = new PIXI.Graphics(); g.beginFill(0xffffff); g.drawCircle(0, 0, 24); g.endFill(); var texture = app.renderer.generateTexture(g, { resolution: 2 }); g.destroy();\`

The circle is drawn **once** into a GPU texture, and all 2,400 sprites reference that same texture. The \`Graphics\` object is destroyed immediately afterward — it was scaffolding, and keeping it alive would leak its geometry.

Crucially the circle is white, because color comes from \`sprite.tint\`. Tinting is a per-sprite multiply applied in the shader, so five different colors do **not** mean five textures and five draw calls. If each color were its own texture, batching would break into five batches — the exact mistake that makes people conclude WebGL "isn't faster."

Drawing the source circle at radius 24 and then scaling sprites down to 0.06–0.22 is deliberate: scaling a texture *down* stays sharp, scaling *up* goes soft.

## ParticleContainer, and what it gives up

\`new PIXI.ParticleContainer(COUNT, { position: true, scale: true, tint: true, alpha: true })\`

\`ParticleContainer\` is a stripped-down \`Container\` built for exactly this case. Its children cannot have their own children, filters, or masks, and it only uploads the properties you explicitly enable. That is why the options object is a whitelist — declaring \`rotation\` when nothing rotates means uploading 2,400 unused floats to the GPU every frame.

That is the trade: fewer features, dramatically less per-frame work.

## The optimization that matters most

Inside the ticker, the pointer repulsion uses squared distances:

\`var d2 = dx * dx + dy * dy; if (d2 < RADIUS_SQ && d2 > 0.01) { var d = Math.sqrt(d2); ... }\`

\`Math.sqrt\` is comparatively expensive and, more importantly, completely unnecessary for a *comparison*. If \`d² < r²\` then \`d < r\` — so the square root is only computed for particles actually within the radius, which is usually a small fraction of the field. At 2,400 particles across 60 frames that avoids roughly 140,000 square roots per second. This is the single most transferable idea in the file and it applies to any distance check in any language.

## Additive blending

\`sp.blendMode = PIXI.BLEND_MODES.ADD\` makes overlapping particles sum their color values rather than paint over each other. Dense regions blow out toward white and sparse ones stay dim, which produces the glowing, energetic look without any bloom filter. It also means low per-sprite alpha (0.25–0.75) is intentional: with additive blending, brightness comes from *overlap*, so starting particles dim leaves headroom for clusters to glow.

## Velocity, damping, and delta

Each particle carries its own velocity, gets pushed away from the pointer proportionally to how close it is (\`(1 - d / RADIUS)\`, so the force falls off to zero at the edge rather than cutting off abruptly), then has that velocity damped by \`0.96\` each frame. Damping is what makes the field settle instead of accumulating energy forever.

\`app.ticker.add(function (delta) { ... })\` supplies a delta multiplier normalized so 1.0 means 60fps. Multiplying movement by it keeps the field moving at the same real-world speed on a 30fps laptop and a 144Hz monitor.

## Retina without the cost blowup

\`resolution: Math.min(window.devicePixelRatio, 2)\` with \`autoDensity: true\` renders crisply on high-DPI screens while capping the pixel count. A phone reporting DPR 3 would otherwise ask the GPU to shade nine times as many pixels as DPR 1 for a difference nobody can see. \`resizeTo: stage\` keeps the renderer matched to its container with no resize handler to write.

## Reusing it

\`COUNT\` is the main dial — 2,400 is comfortable on a desktop; halve it on mobile. Change \`TINTS\` for your brand, and keep the source texture white so tinting continues to batch. For a connection-based look instead of a free field, compare [particle network](/ui-snippets/particle-network/); for a noise-steered variant, [p5.js flow field](/ui-snippets/p5-flow-field/) uses the same particle count on canvas 2D and shows exactly where that approach runs out.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Pixi.js CDN', text: 'Include pixi.js v7 from the CDN panel — global PIXI.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A full-viewport WebGL particle field starts immediately.' },
      { title: 'Move your pointer', text: 'Particles within 150px are pushed away with falloff.' },
      { title: 'Watch the FPS readout', text: 'Live from app.ticker.FPS, sampled twice a second.' },
      { title: 'Press Burst', text: 'Every particle is re-seeded at center with radial velocity.' },
      { title: 'Tune the count', text: 'Adjust COUNT and TINTS — keep the source texture white.' },
    ] },
    features: [
      { title: 'Single batched draw call', text: 'Shared texture and blend mode let 2,400 sprites batch together.' },
      { title: 'Generated GPU texture', text: 'One Graphics circle rendered to texture, then destroyed.' },
      { title: 'Tint instead of textures', text: 'A white source tinted per sprite keeps five colors in one batch.' },
      { title: 'ParticleContainer whitelist', text: 'Only position, scale, tint and alpha are uploaded per frame.' },
      { title: 'Squared-distance culling', text: 'Math.sqrt runs only for particles actually in range.' },
      { title: 'Additive glow', text: 'Overlapping sprites sum to bright clusters with no bloom filter.' },
      { title: 'Delta-scaled motion', text: 'Ticker delta keeps speed identical at 30fps and 144Hz.' },
      { title: 'Capped retina resolution', text: 'devicePixelRatio clamped to 2 so phones do not shade 9x pixels.' },
    ],
    useCases: [
      { title: 'High-density hero backgrounds', text: 'Particle counts canvas 2D cannot sustain.' },
      { title: 'Music and event visuals', text: 'Drive the repulsion radius from audio amplitude.' },
      { title: 'Game and product landing pages', text: 'A WebGL first impression without a full 3D scene.' },
      { title: 'Interactive art installations', text: 'Pointer or camera input steering thousands of sprites.' },
      { title: 'Loading and transition states', text: 'Burst the field on route change as a wipe.' },
      { title: 'Learning WebGL batching', text: 'A reference next to [particle network](/ui-snippets/particle-network/) on canvas 2D.' },
    ],
    faqs: [
      { q: 'Why is Pixi faster than canvas 2D for this?', a: 'Canvas 2D issues a separate arc and fill call per particle from the CPU. Pixi batches every sprite that shares a texture and blend mode into a single WebGL draw call, and the GPU rasterizes them in parallel. That is why 2,400 particles run comfortably here where the same count in canvas 2D would start costing frames.' },
      { q: 'Why is the source circle white instead of colored?', a: 'Because color comes from sprite.tint, which is a per-sprite multiply applied in the shader. A white texture tinted five ways stays one texture and therefore one batch. Creating five colored textures instead would split rendering into five draw calls and lose most of the benefit — a common mistake that leads people to conclude WebGL is not faster.' },
      { q: 'What does ParticleContainer give up compared to a normal Container?', a: 'Its children cannot have their own children, filters, or masks. In exchange it only uploads the properties you explicitly enable in its options object, so declaring rotation when nothing rotates would mean pushing 2,400 unused floats to the GPU every frame. It is a deliberate feature-for-throughput trade.' },
      { q: 'Why compare squared distances instead of using Math.sqrt?', a: 'A square root is expensive and unnecessary for a comparison: if d squared is less than r squared, then d is less than r. Computing sqrt only for particles actually inside the radius avoids roughly 140,000 square roots per second at 2,400 particles and 60fps. The technique applies to any distance check anywhere.' },
      { q: 'Why are the particles so transparent by default?', a: 'Because additive blending means brightness comes from overlap. Starting each sprite at 0.25 to 0.75 alpha leaves headroom so dense clusters sum toward white and glow while sparse regions stay dim. Fully opaque particles would saturate immediately and the field would lose all its depth.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Create the Application in a mount effect against a container ref and append app.view there. In cleanup call app.destroy(true, { children: true, texture: true }) — otherwise every remount leaks a WebGL context, and browsers cap how many can exist, so after a dozen navigations the canvas simply goes blank. Keep the particle array in a ref, never state, since it mutates every frame.' },
    ],
    aiPrompt: {
      paragraph: `Almost every line in this ticker is a performance decision, which makes it a genuinely useful thing to have explained. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why sprites sharing one texture and blend mode collapse into a single WebGL draw call, and what would happen to batching if you created five separately colored textures instead of tinting one white one. Then ask it to justify the squared-distance comparison — have it count roughly how many Math.sqrt calls per second that avoids at this particle count — and explain why the same trick applies to any distance check. Ask what ParticleContainer gives up in exchange for its throughput, and what declaring rotation: true in its options would cost per frame. For optimization, ask where the real ceiling is: at what COUNT does the JavaScript loop rather than the GPU become the bottleneck, and whether moving the physics into a shader would help. To extend it: have it add attract mode on click, drive the repulsion radius from audio, halve COUNT on small screens, or add a proper destroy path for single-page apps. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a WebGL particle field using Pixi.js v7 (from a CDN, global PIXI) with pointer repulsion, in plain HTML, CSS, and JavaScript.

Requirements:
- Create a PIXI.Application with resizeTo pointing at a container element, antialias on, resolution set to Math.min(window.devicePixelRatio, 2) and autoDensity true. Explain that capping the resolution matters because a phone reporting DPR 3 would otherwise make the GPU shade nine times as many pixels for no visible gain.
- Generate ONE texture at startup: draw a white circle with PIXI.Graphics, call renderer.generateTexture() on it, then destroy the Graphics object. The source circle must be WHITE — explain that color comes from per-sprite tint (a shader multiply), so one white texture tinted several ways stays a single batch, whereas creating separately colored textures would split rendering into multiple draw calls and lose the performance benefit entirely.
- Draw the source circle at a larger radius than sprites will display at, and scale sprites down, since scaling a texture down stays sharp while scaling up goes soft.
- Add roughly 2,400 sprites to a PIXI.ParticleContainer whose options object whitelists ONLY position, scale, tint and alpha. Explain that ParticleContainer children cannot have children, filters or masks, and that it only uploads the properties you enable — so declaring rotation when nothing rotates would push thousands of unused floats to the GPU every frame.
- Set every sprite's blendMode to ADD and give each a low starting alpha (roughly 0.25 to 0.75). Explain that with additive blending brightness comes from overlap, so low alpha leaves headroom for dense clusters to sum toward white and glow.
- In the ticker, repel particles from the pointer: compute dx and dy, then compare SQUARED distance against a squared radius and only call Math.sqrt for particles actually within range. Comment on why — a square root is unnecessary for a comparison since d² < r² implies d < r, and skipping it avoids on the order of a hundred thousand square roots per second at this particle count.
- Make the repulsion force fall off with distance using (1 - d / RADIUS) so it reaches zero at the edge rather than cutting off abruptly. Give each particle its own velocity, damp it by about 0.96 each frame so the field settles, and multiply movement by the ticker's delta so speed is identical at 30fps and 144Hz.
- Wrap particles around the screen edges rather than bouncing, track the pointer with pointermove on the container (converting client coordinates via getBoundingClientRect) and reset it far off-screen on pointerleave.
- Add a live FPS readout sampled from app.ticker.FPS on an interval, and a Burst button that re-seeds every particle at the center with a random radial velocity. Overlay a frosted-glass control panel above the canvas.`,
    },
  },
};

export default pixiParticleField;
