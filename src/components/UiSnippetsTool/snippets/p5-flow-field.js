const p5FlowField = {
  id: 'p5-flow-field',
  title: 'p5.js Perlin Flow Field',
  lastmod: '2026-08-02',
  category: 'animations',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js'],
  html: `<div class="pff-stage">
  <div id="pffHost" class="pff-host"></div>

  <div class="pff-ui">
    <span class="pff-tag">p5.js · perlin noise</span>
    <h2>Flow Field</h2>
    <p>Three thousand particles steered by a noise field they cannot see.</p>

    <div class="pff-controls">
      <label><span>Detail <b id="pffScaleVal">0.006</b></span>
        <input type="range" id="pffScale" min="1" max="20" value="6">
      </label>
      <label><span>Drift <b id="pffDriftVal">0.30</b></span>
        <input type="range" id="pffDrift" min="0" max="150" value="30">
      </label>
      <button class="pff-btn" id="pffReseed">New field</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05060d;color:#fff;min-height:100vh;overflow:hidden}
.pff-stage{position:relative;width:100vw;height:100vh}
.pff-host{position:absolute;inset:0}
.pff-host canvas{display:block}

.pff-ui{position:absolute;left:28px;bottom:28px;z-index:2;width:min(300px,calc(100vw - 56px));padding:20px;border-radius:18px;background:rgba(10,12,24,.62);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 60px -28px rgba(0,0,0,.9)}
.pff-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5eead4;background:rgba(94,234,212,.12);border:1px solid rgba(94,234,212,.3);padding:4px 10px;border-radius:99px;margin-bottom:10px}
.pff-ui h2{font-size:22px;font-weight:800;letter-spacing:-.02em}
.pff-ui p{font-size:12.5px;color:#8f9ab8;margin-top:6px;line-height:1.55}

.pff-controls{margin-top:18px;display:flex;flex-direction:column;gap:14px}
.pff-controls label{display:block}
.pff-controls span{display:flex;justify-content:space-between;font-size:11.5px;font-weight:600;color:#8f9ab8;margin-bottom:6px}
.pff-controls b{color:#5eead4;font-variant-numeric:tabular-nums}
.pff-controls input{width:100%;accent-color:#5eead4;cursor:pointer}
.pff-btn{padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#dbe3fb;font:600 12.5px system-ui;cursor:pointer;transition:background .16s}
.pff-btn:hover{background:rgba(255,255,255,.12)}`,

  js: `new p5(function (p) {
  var COUNT = 3000;
  var particles = [];
  var noiseScale = 0.006;
  var drift = 0.003;
  var zoff = 0;
  var seed = 1;

  function spawn() {
    particles.length = 0;
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        life: p.random(60, 260)
      });
    }
  }

  p.setup = function () {
    var host = document.getElementById('pffHost');
    var c = p.createCanvas(host.clientWidth, host.clientHeight);
    c.parent(host);
    p.noiseSeed(seed);
    p.noiseDetail(3, 0.5);
    p.background(5, 6, 13);
    p.strokeWeight(1.1);
    spawn();
  };

  p.draw = function () {
    // Instead of clearing, veil the canvas with a low-alpha rectangle.
    // Trails accumulate into the field lines — the field is never drawn directly.
    p.noStroke();
    p.fill(5, 6, 13, 9);
    p.rect(0, 0, p.width, p.height);

    for (var i = 0; i < particles.length; i++) {
      var pt = particles[i];

      // One 3D noise sample -> one angle. Neighbouring particles read almost
      // the same value, which is why the paths stay coherent instead of scattering.
      var angle = p.noise(pt.x * noiseScale, pt.y * noiseScale, zoff) * p.TWO_PI * 2;
      var vx = p.cos(angle);
      var vy = p.sin(angle);

      var hue = (angle * 40 + 170) % 360;
      p.stroke('hsla(' + hue.toFixed(0) + ', 85%, 68%, 0.34)');
      p.line(pt.x, pt.y, pt.x + vx * 1.6, pt.y + vy * 1.6);

      pt.x += vx * 1.6;
      pt.y += vy * 1.6;
      pt.life--;

      if (pt.life < 0 || pt.x < 0 || pt.x > p.width || pt.y < 0 || pt.y > p.height) {
        pt.x = p.random(p.width);
        pt.y = p.random(p.height);
        pt.life = p.random(60, 260);
      }
    }

    zoff += drift;
  };

  p.windowResized = function () {
    var host = document.getElementById('pffHost');
    p.resizeCanvas(host.clientWidth, host.clientHeight);
    p.background(5, 6, 13);
    spawn();
  };

  document.getElementById('pffScale').addEventListener('input', function () {
    noiseScale = Number(this.value) / 1000;
    document.getElementById('pffScaleVal').textContent = noiseScale.toFixed(3);
    p.background(5, 6, 13);
  });

  document.getElementById('pffDrift').addEventListener('input', function () {
    drift = Number(this.value) / 10000;
    document.getElementById('pffDriftVal').textContent = (Number(this.value) / 100).toFixed(2);
  });

  document.getElementById('pffReseed').addEventListener('click', function () {
    seed = Math.floor(Math.random() * 100000);
    p.noiseSeed(seed);
    p.background(5, 6, 13);
    spawn();
  });
}, document.getElementById('pffHost'));`,

  seo: {
    title: 'p5.js Perlin Flow Field — Generative Canvas Background',
    description: 'Three thousand particles steered by a 3D Perlin noise field, drawn as accumulating trails with live controls. Exports to React, Vue & Tailwind.',
    about: {
      title: 'p5.js Perlin Flow Field — Coherent Motion From One Noise Call',
      description: `A flow field is the classic piece of generative art, and it is worth building once because it demonstrates something counter-intuitive: **thousands of particles that never communicate can still move as one system**. There is no flocking logic here, no neighbor lookups, no shared state. Every particle independently asks the same invisible field which way to go, and coherence falls out for free.

## Why Perlin noise and not Math.random()

Everything rests on the difference between random and *smooth* random:

\`var angle = p.noise(pt.x * noiseScale, pt.y * noiseScale, zoff) * p.TWO_PI * 2;\`

\`Math.random()\` has no relationship between consecutive values — sample it per particle and you get static. Perlin noise is **spatially continuous**: two nearby inputs return two nearby outputs. So a particle at (100, 100) and one at (102, 100) read almost the same value, get almost the same angle, and travel almost the same direction. Follow that across the canvas and the particles trace out smooth, continuous streams.

That is the entire algorithm. One noise sample becomes one angle, the angle becomes a unit vector via \`cos\`/\`sin\`, and the particle steps along it.

## The third dimension is time

\`p.noise()\` is called with three arguments, and the third — \`zoff\` — is the interesting one. Rather than moving through a static 2D field, the particles are moving through a **slice of a 3D noise volume**, and incrementing \`zoff\` each frame slides that slice forward. The field itself morphs continuously.

This is why the drift control feels so different from a speed control. Speed would move particles faster through a fixed landscape; drift changes the landscape underneath them. At zero the field is frozen and particles settle into permanent channels; turn it up and the streams reorganize as you watch.

## Noise scale is a zoom, not a strength

\`noiseScale\` multiplies the coordinates before sampling, so it controls **how far apart in noise-space** two adjacent pixels are:

- Small values (0.001) sample a tiny patch of noise stretched over the whole canvas — vast, sweeping currents.
- Large values (0.02) sample a wide area compressed into the same space — tight, turbulent eddies.

Thinking of it as zoom rather than intensity makes the slider predictable. The other line worth knowing is \`p.noiseDetail(3, 0.5)\`, which sets how many octaves of noise are layered and how quickly each contributes less. Fewer octaves means smoother, more abstract flow; more adds fine texture at the cost of computation.

## The canvas is never cleared

\`p.fill(5, 6, 13, 9); p.rect(0, 0, p.width, p.height);\`

Each frame paints a nearly transparent rectangle over everything instead of clearing it. Old strokes fade a little more every frame and eventually disappear, so each particle leaves a tail — and **thousands of overlapping tails accumulate into the visible field lines**. The flow field is never drawn directly; it emerges from the record of where particles have been.

The alpha value is the single most sensitive number in the file. Higher, and trails vanish before they can build into structure. Lower, and the canvas saturates into a solid smear. Nine out of 255 is roughly a two-second memory.

Because the field only exists as accumulated paint, every control that changes the field also calls \`p.background()\` to wipe the canvas — otherwise the old field lines stay burned in underneath the new ones.

## Particle lifespans, and why they matter

Each particle carries a \`life\` counter and respawns at a random position when it expires or leaves the canvas. Without lifespans, every particle eventually gets trapped in a noise attractor — a spot where the field converges — and after twenty seconds the canvas is a few bright dots and nothing else. Randomizing the initial life (\`p.random(60, 260)\`) staggers respawns so the field refreshes continuously rather than pulsing.

## Instance mode

The sketch is written as \`new p5(function (p) { ... }, host)\` rather than p5's global mode. Global mode attaches \`setup\`, \`draw\`, and around 200 other names to \`window\`, which collides with almost anything else on a real page — \`text\`, \`line\`, and \`filter\` are all p5 globals. Instance mode namespaces everything behind \`p\` and mounts the canvas into a specific element, which is the only sane choice for a component embedded in an existing site.

## Reusing it

The tunable numbers are \`COUNT\`, the step size of \`1.6\`, and the background alpha. Lower \`COUNT\` on mobile — 3000 particles is comfortable on a desktop and heavy on a low-end phone. Hue is derived from the angle, so particles moving the same direction share a color and the field reads as banded rather than noisy. Compare with a [particle network](/ui-snippets/particle-network/) for connection-based motion, or [physics balls](/ui-snippets/physics-balls/) when particles should collide rather than flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the p5.js CDN', text: 'Include p5 from the CDN panel — the sketch uses instance mode.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A full-viewport flow field starts drawing immediately.' },
      { title: 'Watch it build', text: 'Field lines emerge from accumulated trails, not from drawing the field.' },
      { title: 'Change the detail', text: 'Low values give sweeping currents, high values tight turbulence.' },
      { title: 'Add drift', text: 'Advancing the noise z axis makes the whole field morph over time.' },
      { title: 'Reseed it', text: 'A new noise seed produces a completely different field.' },
    ] },
    features: [
      { title: 'Coherence with no communication', text: 'Particles never see each other — smooth noise aligns them.' },
      { title: '3D noise for time', text: 'A moving z offset slides through a noise volume so the field morphs.' },
      { title: 'Scale as zoom', text: 'noiseScale sets how far apart adjacent pixels sample the field.' },
      { title: 'Octave control', text: 'noiseDetail trades fine texture against smooth abstraction.' },
      { title: 'Trails, not clears', text: 'A low-alpha veil each frame lets the field emerge from history.' },
      { title: 'Lifespan respawning', text: 'Staggered lifetimes stop particles pooling in noise attractors.' },
      { title: 'Angle-derived color', text: 'Hue from direction, so the field reads as bands rather than noise.' },
      { title: 'Instance mode', text: 'No p5 globals leaked onto window, canvas mounted into a host div.' },
    ],
    useCases: [
      { title: 'Generative hero backdrops', text: 'Living artwork behind a headline instead of a static gradient.' },
      { title: 'Music and event visuals', text: 'A field whose drift can be driven by audio amplitude.' },
      { title: 'Login and splash screens', text: 'Atmosphere behind a [glassmorphism login](/ui-snippets/glassmorphism-login/).' },
      { title: 'Creative-coding reference', text: 'A companion to the [drawing canvas](/ui-snippets/drawing-canvas/) sketch.' },
      { title: 'Data-driven art', text: 'Swap the noise input for real data to visualize a field.' },
      { title: 'Learning Perlin noise', text: 'A live demonstration of smooth versus uniform randomness.' },
    ],
    faqs: [
      { q: 'Why Perlin noise instead of Math.random for the angles?', a: 'Math.random has no relationship between consecutive values, so sampling it per particle produces static. Perlin noise is spatially continuous — nearby inputs return nearby outputs — so particles standing close together receive almost the same angle and travel in almost the same direction. That local agreement is what makes thousands of independent particles trace coherent streams.' },
      { q: 'What is the third argument to noise() doing?', a: 'It is a z offset, so the particles are sampling a 2D slice of a 3D noise volume. Incrementing it every frame slides that slice forward, which makes the entire field morph over time. That is different from a speed control: speed moves particles faster through a fixed landscape, while drift changes the landscape underneath them.' },
      { q: 'How should I think about noiseScale?', a: 'As zoom rather than strength. It multiplies coordinates before sampling, so small values stretch a tiny patch of noise across the whole canvas and produce vast sweeping currents, while large values compress a wide area into the same space and produce tight turbulent eddies.' },
      { q: 'Why is the canvas never cleared?', a: 'Each frame paints a nearly transparent rectangle over everything instead of clearing, so old strokes fade slowly and every particle leaves a tail. Thousands of overlapping tails accumulate into the visible field lines — the flow field is never drawn directly, it emerges from the record of where particles have been. The alpha value is the most sensitive number in the sketch.' },
      { q: 'Why do particles have a lifespan?', a: 'Without one, particles drift into noise attractors — points where the field converges — and after a while the canvas is a handful of bright dots and nothing else. Randomizing each initial lifetime staggers respawns so the field keeps refreshing continuously instead of pulsing all at once.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Keep instance mode and construct the sketch in a mount effect with a ref as the parent element, storing the p5 instance in a ref. Call instance.remove() in cleanup — otherwise every remount leaves another draw loop running against a detached canvas, which is the classic p5-in-React memory leak. Drive the controls from state and write them into sketch-scoped variables via the instance.' },
    ],
    aiPrompt: {
      paragraph: `This sketch is short but every line encodes a decision about emergent behavior, which makes it excellent material for a conversation. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain precisely why Perlin noise produces coherent streams where Math.random would produce static, and what "spatially continuous" means in terms of the actual values returned for two nearby inputs. Then ask what the third noise() argument does and why changing it feels different from changing particle speed. Ask it to explain the background alpha of 9 out of 255 as a memory duration, and try 2 and 40 to see the field either saturate or fail to form. For optimization, ask at what particle count the per-frame noise sampling becomes the bottleneck, and whether precomputing the field into a grid and looking it up would be faster than sampling per particle per frame. To extend it: have it drive the drift from audio amplitude, add pointer repulsion, reduce COUNT on small screens, or write the field into a lookup grid so the same field can be reused across frames. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a generative Perlin flow field with p5.js (from a CDN) in INSTANCE MODE — new p5(sketch, hostElement), not global mode — in plain HTML, CSS, and JavaScript.

Requirements:
- Use instance mode specifically and explain why: p5 global mode attaches setup, draw and roughly 200 other names to window (including text, line and filter), which collides with almost anything else on a real page. Instance mode namespaces everything behind the sketch argument and mounts the canvas into a chosen host element.
- Create around 3000 particles, each holding an x, y position and a randomized life counter.
- Every frame, for each particle: sample p.noise(x * noiseScale, y * noiseScale, zoff), map that value to an angle across a couple of full turns, convert it to a unit vector with cos/sin, draw a short line from the particle's current position to its next position, then advance the particle along that vector.
- Explain in comments why Perlin noise rather than Math.random is essential: noise is spatially continuous, so nearby particles receive nearly identical angles and travel together, which is what creates coherent streams from particles that never communicate with each other.
- Pass a THIRD argument to noise() (a z offset) and increment it every frame, so the particles sample a moving slice of a 3D noise volume and the whole field morphs over time. Expose this as a "drift" slider and note it is different from a speed control — it changes the landscape rather than how fast particles cross it.
- Do NOT clear the canvas each frame. Instead paint a very low-alpha rectangle (around 9/255) over the whole canvas so old strokes fade slowly and each particle leaves a trail. Explain that the visible field lines are accumulated trails — the field is never drawn directly — and that this alpha value is the most sensitive number in the sketch.
- Give each particle a randomized lifespan and respawn it at a random position when it expires or leaves the canvas, and explain that without lifespans particles collect in noise attractors and the canvas decays to a few static dots.
- Derive each stroke's hue from its angle so particles travelling the same direction share a color and the field reads as banded.
- Add live controls: a noise scale slider (framed as zoom — small values give sweeping currents, large values tight turbulence), the drift slider, and a reseed button calling p.noiseSeed with a new random seed. Any control that changes the field must also call p.background() to wipe the canvas, or the previous field stays burned in underneath.
- Call p.noiseDetail to set octaves, handle windowResized by resizing the canvas and respawning, and overlay a frosted-glass control panel above the full-viewport canvas.`,
    },
  },
};

export default p5FlowField;
