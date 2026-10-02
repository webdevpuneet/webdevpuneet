const zdogOrbitScene = {
  id: 'zdog-orbit-scene',
  title: 'Zdog Pseudo-3D Orbit Scene',
  lastmod: '2026-08-02',
  category: 'animations',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/zdog@1.1.3/dist/zdog.dist.min.js'],
  html: `<div class="zos-wrap">
  <div class="zos-head">
    <span class="zos-tag">zdog · flat-shaded 3d</span>
    <h2>Drag the planet</h2>
    <p>A round, hand-drawn 3D scene rendered entirely from strokes — no lighting, no meshes, no WebGL.</p>
  </div>

  <canvas class="zos-canvas" id="zosCanvas" width="480" height="480"></canvas>

  <div class="zos-controls">
    <button class="zos-btn is-on" id="zosSpin">Auto-spin: on</button>
    <label class="zos-range">
      <span>Zoom</span>
      <input type="range" id="zosZoom" min="60" max="150" value="100">
    </label>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1d1240,#0a0716 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.zos-wrap{display:flex;flex-direction:column;align-items:center;gap:18px;width:min(520px,94vw)}
.zos-head{text-align:center}
.zos-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc;background:rgba(240,171,252,.12);border:1px solid rgba(240,171,252,.32);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.zos-head h2{font-size:clamp(24px,5vw,34px);font-weight:800;letter-spacing:-.02em}
.zos-head p{font-size:13.5px;color:#9d94c4;margin-top:8px;line-height:1.6;max-width:420px}

.zos-canvas{width:min(100%,420px);height:auto;cursor:grab;touch-action:none}
.zos-canvas:active{cursor:grabbing}

.zos-controls{display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center}
.zos-btn{padding:9px 18px;border-radius:99px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#cfc6ee;font:600 12.5px system-ui;cursor:pointer;transition:border-color .16s,color .16s}
.zos-btn.is-on{border-color:#c084fc;color:#f3e8ff;background:rgba(192,132,252,.14)}
.zos-range{display:flex;align-items:center;gap:9px;font-size:12px;color:#9d94c4}
.zos-range input{width:120px;accent-color:#c084fc;cursor:pointer}`,

  js: `var TAU = Zdog.TAU;

var illo = new Zdog.Illustration({
  element: '#zosCanvas',
  zoom: 1,
  dragRotate: true,
  // Fires when a drag starts so auto-spin can yield to the user.
  onDragStart: function () { spinning = false; syncSpinBtn(); }
});

var scene = new Zdog.Anchor({ addTo: illo });

// The planet: a Shape with no path is a single point, and a huge stroke
// turns that point into a sphere. That is the whole trick in Zdog.
var planet = new Zdog.Shape({
  addTo: scene,
  stroke: 150,
  color: '#7c3aed'
});

new Zdog.Ellipse({
  addTo: planet,
  diameter: 108,
  translate: { z: 26 },
  stroke: 12,
  color: '#a78bfa'
});

new Zdog.Ellipse({
  addTo: scene,
  diameter: 260,
  quarters: 4,
  rotate: { x: TAU / 4 - 0.42 },
  stroke: 13,
  color: '#f0abfc'
});

new Zdog.Ellipse({
  addTo: scene,
  diameter: 300,
  rotate: { x: TAU / 4 - 0.42 },
  stroke: 5,
  color: 'rgba(240,171,252,.45)'
});

var moonOrbit = new Zdog.Anchor({ addTo: scene, rotate: { x: TAU / 4 - 0.9 } });
new Zdog.Shape({ addTo: moonOrbit, translate: { x: 180 }, stroke: 30, color: '#22d3ee' });
new Zdog.Shape({ addTo: moonOrbit, translate: { x: -164, y: 40 }, stroke: 18, color: '#fbbf24' });

for (var i = 0; i < 14; i++) {
  var a = (i / 14) * TAU;
  new Zdog.Shape({
    addTo: scene,
    translate: { x: Math.cos(a) * 218, y: Math.sin(a) * 218, z: -160 },
    stroke: i % 3 === 0 ? 9 : 5,
    color: '#e9d5ff'
  });
}

var spinning = true;
var spinBtn = document.getElementById('zosSpin');

function syncSpinBtn() {
  spinBtn.classList.toggle('is-on', spinning);
  spinBtn.textContent = 'Auto-spin: ' + (spinning ? 'on' : 'off');
}

spinBtn.addEventListener('click', function () {
  spinning = !spinning;
  syncSpinBtn();
});

document.getElementById('zosZoom').addEventListener('input', function () {
  illo.zoom = Number(this.value) / 100;
});

function animate() {
  if (spinning) scene.rotate.y += 0.008;
  moonOrbit.rotate.z += 0.014;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}
animate();`,

  seo: {
    title: 'Zdog Pseudo-3D Orbit Scene — Flat-Shaded 3D Canvas',
    description: 'A draggable planet, ring and orbiting moons built with Zdog, where 3D shapes are drawn purely from thick strokes. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Zdog Pseudo-3D Orbit Scene — 3D Without a Single Polygon',
      description: `There is a large gap between a flat SVG illustration and a full **Three.js** scene. Three.js means meshes, materials, lights, a camera, and a WebGL context — a lot of machinery when all you want is a small illustrated object that turns. **Zdog** occupies exactly that gap: a 2.5kb library that renders genuine 3D geometry into a plain 2D canvas, with a deliberately flat, rounded, hand-illustrated look.

## The trick that defines the library

The planet in this scene is created like this:

\`new Zdog.Shape({ addTo: scene, stroke: 150, color: '#7c3aed' })\`

That is a \`Shape\` with **no path at all**, which means it is a single point in 3D space. It renders as a sphere because \`stroke: 150\` gives that point a 150-unit-thick round cap. Zdog draws every shape as a stroked path with round line caps and joins, so a point becomes a ball, a line becomes a capsule, and a rectangle becomes a rounded slab.

Understanding that one idea explains the entire library. There is no lighting model, no shading, and no depth buffer — Zdog sorts shapes by their z position and paints them in order. That is also why its aesthetic is so consistent: everything looks like it was drawn with a very fat marker, because it was.

## Anchors, and why the scene has a hierarchy

\`Zdog.Anchor\` is an invisible transform node — the same idea as an empty group in a 3D editor. Children inherit its rotation and translation, which is what makes the moons work:

\`var moonOrbit = new Zdog.Anchor({ addTo: scene, rotate: { x: TAU / 4 - 0.9 } });\`

Both moons are added to \`moonOrbit\` and simply translated outward on the x axis. Rotating that anchor on \`z\` in the animation loop sweeps them both around a shared orbital plane — no trigonometry per moon, no per-frame position math. Tilting the anchor once on \`x\` tilts the entire orbit.

The same principle nests further: the light band on the planet is added to \`planet\` rather than \`scene\`, so it travels with the planet automatically.

\`Zdog.TAU\` is a full turn in radians (2π). Zdog exposes it because virtually every rotation in a 3D scene is naturally expressed as a fraction of a full turn — \`TAU / 4\` for a quarter turn is far more legible than \`1.5707963\`.

## The render loop is manual, and cheaper than it looks

\`illo.updateRenderGraph()\` does two things: it walks the scene graph applying transforms, and it **re-sorts every shape by depth** before painting. Nothing appears until it is called, which means a completely static Zdog scene costs zero frames — you call it once and stop. Only because this scene animates does it need a \`requestAnimationFrame\` loop.

## Drag rotation, and yielding to the user

\`dragRotate: true\` gives pointer and touch orbiting for free. The interesting part is the callback:

\`onDragStart: function () { spinning = false; syncSpinBtn(); }\`

Auto-spin turns itself off the moment the user grabs the scene. Without this, the object keeps rotating underneath the drag and fights whatever the user is trying to look at — a small courtesy that separates a toy from a control. The button label updates in the same handler so the UI never claims spin is on while it is not.

\`touch-action: none\` on the canvas is the CSS half of this. Without it, a touch drag scrolls the page instead of rotating the scene, since the browser claims the gesture before Zdog sees it.

## Sizing and sharpness

The canvas carries explicit \`width\` and \`height\` attributes (480×480) while CSS scales it down with \`width: min(100%, 420px); height: auto\`. Rendering at a larger backing size than the display size is a simple way to get crisp edges on high-DPI screens without configuring device pixel ratio manually. Zdog also supports \`resize: true\` for a canvas that fills its container, but a fixed backing size keeps the scene's proportions predictable.

The zoom slider writes straight to \`illo.zoom\`, which scales the whole illustration around its origin — useful, and something that would require moving a camera in a real 3D engine.

## Reusing it

Build scenes from the primitives: \`Shape\` for points and paths, \`Ellipse\`, \`Rect\`, \`RoundedRect\`, \`Polygon\`, \`Box\`, \`Cylinder\`, \`Cone\`, and \`Hemisphere\`. Group anything that should move together under an \`Anchor\`. Keep stroke widths generous — thin strokes lose the illustrated character that is the whole reason to choose Zdog over a real 3D engine. When you outgrow it and need lighting or textures, a [Three.js product viewer](/ui-snippets/three-product-viewer/) is the next step up; for flat rotation only, [CSS 3D cube](/ui-snippets/css-3d-cube/) needs no library at all.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Zdog CDN', text: 'Include the zdog dist build from the CDN panel — global Zdog.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A planet with rings, moons, and a star field renders and spins.' },
      { title: 'Drag the scene', text: 'Pointer and touch orbiting work out of the box, and auto-spin yields.' },
      { title: 'Toggle auto-spin', text: 'The button reflects state, including when a drag turned it off.' },
      { title: 'Zoom in and out', text: 'The slider writes directly to illo.zoom — no camera needed.' },
      { title: 'Build your own', text: 'Group shapes under an Anchor and rotate the anchor, not each shape.' },
    ] },
    features: [
      { title: 'Spheres from stroke width', text: 'A pathless Shape with a thick round cap renders as a ball.' },
      { title: 'No WebGL required', text: 'Real 3D geometry painted into a plain 2D canvas context.' },
      { title: 'Anchor-based hierarchy', text: 'Rotating one invisible node sweeps both moons on a shared plane.' },
      { title: 'Inherited transforms', text: 'The planet band is a child of the planet, so it follows for free.' },
      { title: 'TAU-based rotation', text: 'Fractions of a full turn instead of raw radian literals.' },
      { title: 'Free drag orbiting', text: 'dragRotate handles pointer and touch with no gesture code.' },
      { title: 'Auto-spin yields to drag', text: 'onDragStart stops rotation so the scene never fights the user.' },
      { title: 'Crisp on high-DPI', text: 'A 480px backing canvas displayed at 420px stays sharp.' },
    ],
    useCases: [
      { title: 'Illustrated hero graphics', text: 'Show a turning planet with a ring and two orbiting moons, drawn with thick strokes in a plain 2D canvas rather than WebGL.' },
      { title: 'Empty and error states', text: 'Add playful 3D art beside an [empty state](/ui-snippets/empty-state/), where dragging rotates the whole scene through one anchor.' },
      { title: 'Product and feature icons', text: 'Create rotating marks that feel handmade, with spheres produced from a pathless `Shape` with a thick round cap.' },
      { title: 'Loading and splash screens', text: 'Offer a lighter alternative to WebGL on a [splash screen](/ui-snippets/splash-screen/), using real 3D geometry without meshes, materials or lights.' },
      { title: 'Scene graph teaching', text: 'Learn anchors and inherited transforms, since rotating one invisible node sweeps both moons and the planet band follows as a child.' },
    ],
    faqs: [
      { q: 'How does Zdog draw a sphere with no mesh?', a: 'The planet is a Shape with no path, which makes it a single point in 3D space. Zdog renders every shape as a stroked path with round caps, so a 150-unit stroke on a single point paints as a filled circle that behaves like a ball. The same principle turns a line into a capsule and a rectangle into a rounded slab — there is no geometry beyond strokes.' },
      { q: 'What is a Zdog.Anchor for?', a: 'It is an invisible transform node, like an empty group in a 3D editor. Children inherit its rotation and translation, so adding both moons to one anchor and rotating that anchor sweeps them around a shared orbital plane with no per-moon trigonometry. Tilting the anchor once tilts the whole orbit.' },
      { q: 'Why is updateRenderGraph called manually every frame?', a: 'It applies the scene transforms and re-sorts every shape by depth before painting, and nothing renders until it runs. That means a static Zdog scene costs zero frames — you call it once and stop. Only animated scenes need a requestAnimationFrame loop, which is a meaningful saving over engines that always render continuously.' },
      { q: 'Why does auto-spin stop when I drag?', a: 'The Illustration is given an onDragStart callback that clears the spinning flag and updates the button label. Without it the scene keeps rotating underneath the drag and fights whatever the user is trying to look at. Routing the label update through the same handler keeps the UI from claiming spin is on when it is not.' },
      { q: 'Why does the canvas need touch-action: none?', a: 'Without it, a touch drag on the canvas is claimed by the browser as a page scroll before Zdog ever sees the gesture, so rotation simply does not work on mobile. Setting touch-action: none tells the browser that element handles its own gestures.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Build the illustration and scene graph in a mount effect against a canvas ref, and keep the illo and animated anchors in refs rather than state since they mutate every frame. Cancel the requestAnimationFrame handle in cleanup. Drive the zoom slider from state and write it to illo.zoom in a small effect, and keep the spinning flag in state so the button label stays declarative.' },
    ],
    aiPrompt: {
      paragraph: `Zdog's core idea is unusual enough that it is worth having spelled out rather than inferred. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain exactly why a Zdog.Shape with no path and a stroke of 150 renders as a sphere, and what that implies about how Zdog draws every other primitive. Then ask it to trace the scene graph and explain why rotating moonOrbit on its z axis moves both moons together, and what would have to change if each moon were added directly to the scene instead. Ask why updateRenderGraph must be called manually and what that saves for a static illustration. For optimization, ask whether the depth re-sort inside updateRenderGraph becomes a bottleneck as shape count grows, and roughly where that limit sits. To extend it: have it add a Zdog.Cone rocket on a tilted anchor, animate a moon's stroke to suggest a phase change, add a second illustration sharing one rAF loop, or gate the auto-spin behind prefers-reduced-motion. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a draggable pseudo-3D space scene using the Zdog library (from a CDN, global Zdog) rendering into a plain 2D canvas — no WebGL, no Three.js.

Requirements:
- Create a Zdog.Illustration bound to a canvas element with dragRotate: true so pointer and touch orbiting work with no gesture code of your own.
- Build the planet as a Zdog.Shape with NO path and a very large stroke (around 150), and comment on why this works: Zdog renders every shape as a stroked path with round caps, so a pathless Shape is a single point that a thick stroke paints as a sphere. There are no meshes and no lighting — shapes are simply depth-sorted and painted.
- Add a lighter band to the planet as a Zdog.Ellipse whose addTo target is the PLANET rather than the scene, so it inherits the planet's transform automatically.
- Add a tilted ring system: two Zdog.Ellipse instances of different diameters and stroke widths, both rotated on x by roughly TAU/4 minus a small offset so the ring reads as tilted rather than edge-on. Use Zdog.TAU and express rotations as fractions of a full turn rather than raw radian literals.
- Create a Zdog.Anchor to act as an orbital plane, add two moon Shapes to it translated outward on the x axis, and rotate ONLY that anchor in the animation loop so both moons sweep together — explain that an Anchor is an invisible transform node whose children inherit its rotation, which removes any need for per-moon trigonometry.
- Scatter a ring of small background star Shapes positioned with cos/sin around a circle at a negative z so they sit behind the planet, varying stroke sizes slightly.
- Drive animation with a requestAnimationFrame loop that increments rotations and then calls illo.updateRenderGraph() — note that nothing renders until that call, which means a static scene costs zero frames.
- Add an auto-spin toggle button, and wire the Illustration's onDragStart callback to turn auto-spin OFF and update the button label, so the scene never keeps rotating underneath a user's drag.
- Add a zoom range input writing directly to illo.zoom.
- Set touch-action: none on the canvas and explain that without it a touch drag is claimed by the browser as a page scroll before Zdog sees it, so rotation silently fails on mobile. Give the canvas explicit width/height attributes larger than its CSS display size so it stays crisp on high-DPI screens.`,
    },
  },
};

export default zdogOrbitScene;
