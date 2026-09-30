const matterFallingTags = {
  id: 'matter-falling-tags',
  title: 'Matter.js Falling Tags',
  lastmod: '2026-08-02',
  category: 'animations',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js'],
  html: `<div class="mft-shell">
  <div class="mft-top">
    <div>
      <span class="mft-tag">matter.js · rigid bodies</span>
      <h2>Drag the stack</h2>
    </div>
    <button class="mft-reset" id="mftReset">Drop again</button>
  </div>
  <div class="mft-stage" id="mftStage">
    <span class="mft-chip c1">TypeScript</span>
    <span class="mft-chip c2">React</span>
    <span class="mft-chip c3">Rust</span>
    <span class="mft-chip c4">GraphQL</span>
    <span class="mft-chip c5">Figma</span>
    <span class="mft-chip c6">Postgres</span>
    <span class="mft-chip c7">WebGL</span>
    <span class="mft-chip c8">Docker</span>
    <span class="mft-chip c9">Go</span>
    <span class="mft-chip c10">Tailwind</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d18;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.mft-shell{width:min(680px,94vw)}
.mft-top{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:14px}
.mft-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:5px 11px;border-radius:99px;margin-bottom:10px}
.mft-top h2{font-size:clamp(22px,4.4vw,32px);font-weight:800;letter-spacing:-.02em}
.mft-reset{flex-shrink:0;padding:10px 18px;border-radius:11px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#dbe2f5;font:600 13px system-ui;cursor:pointer;transition:background .18s,border-color .18s}
.mft-reset:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3)}

.mft-stage{position:relative;height:400px;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 26px 60px -28px rgba(0,0,0,.9);cursor:grab}
.mft-stage:active{cursor:grabbing}
.mft-chip{position:absolute;top:0;left:0;white-space:nowrap;padding:11px 20px;border-radius:99px;font-size:14px;font-weight:700;color:#0a0d18;will-change:transform;user-select:none;box-shadow:0 6px 16px -6px rgba(0,0,0,.6)}
.c1{background:#60a5fa}.c2{background:#38bdf8}.c3{background:#fb923c}.c4{background:#f472b6}.c5{background:#a78bfa}
.c6{background:#34d399}.c7{background:#facc15}.c8{background:#22d3ee}.c9{background:#7dd3fc}.c10{background:#5eead4}`,

  js: `var Engine = Matter.Engine, Runner = Matter.Runner, Bodies = Matter.Bodies,
    Composite = Matter.Composite, Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint, Body = Matter.Body;

var stage = document.getElementById('mftStage');
var W = stage.clientWidth;
var H = stage.clientHeight;

var engine = Engine.create();
engine.gravity.y = 1;

var WALL = 120;
var floor = Bodies.rectangle(W / 2, H + WALL / 2, W * 3, WALL, { isStatic: true });
var left  = Bodies.rectangle(-WALL / 2, H / 2, WALL, H * 4, { isStatic: true });
var right = Bodies.rectangle(W + WALL / 2, H / 2, WALL, H * 4, { isStatic: true });
Composite.add(engine.world, [floor, left, right]);

var chips = Array.prototype.slice.call(document.querySelectorAll('.mft-chip'));

var pairs = chips.map(function (el, i) {
  var w = el.offsetWidth, h = el.offsetHeight;
  var body = Bodies.rectangle(
    40 + Math.random() * Math.max(1, W - 80),
    -80 - i * 70,
    w, h,
    {
      restitution: 0.52,
      friction: 0.32,
      frictionAir: 0.012,
      // Chamfer by half the height so the physics body is a true pill,
      // matching the CSS border-radius — square corners would visibly snag.
      chamfer: { radius: h / 2 }
    }
  );
  Body.setAngle(body, (Math.random() - 0.5) * 0.6);
  return { el: el, body: body, w: w, h: h };
});

Composite.add(engine.world, pairs.map(function (p) { return p.body; }));

var mouse = Mouse.create(stage);
var mc = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { stiffness: 0.16, render: { visible: false } }
});
Composite.add(engine.world, mc);

// Matter grabs wheel events by default, which traps page scrolling over the stage.
if (mouse.mousewheel) {
  mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
}

Runner.run(Runner.create(), engine);

(function frame() {
  for (var i = 0; i < pairs.length; i++) {
    var p = pairs[i], pos = p.body.position;
    p.el.style.transform =
      'translate(' + (pos.x - p.w / 2) + 'px,' + (pos.y - p.h / 2) + 'px) rotate(' + p.body.angle + 'rad)';
  }
  requestAnimationFrame(frame);
})();

document.getElementById('mftReset').addEventListener('click', function () {
  pairs.forEach(function (p, i) {
    Body.setPosition(p.body, { x: 40 + Math.random() * Math.max(1, W - 80), y: -80 - i * 70 });
    Body.setVelocity(p.body, { x: 0, y: 0 });
    Body.setAngularVelocity(p.body, 0);
    Body.setAngle(p.body, (Math.random() - 0.5) * 0.6);
  });
});

window.addEventListener('resize', function () {
  var nw = stage.clientWidth, nh = stage.clientHeight;
  if (!nw || !nh) return;
  W = nw; H = nh;
  Body.setPosition(floor, { x: W / 2, y: H + WALL / 2 });
  Body.setPosition(left,  { x: -WALL / 2, y: H / 2 });
  Body.setPosition(right, { x: W + WALL / 2, y: H / 2 });
});`,

  seo: {
    title: 'Matter.js Falling Tags — Draggable Physics Chips',
    description: 'Real HTML tag chips that fall, collide, stack and can be dragged, driven by a Matter.js physics world synced to the DOM. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Matter.js Falling Tags — Physics Bodies Synced to Real DOM',
      description: `Physics-driven "skill chips that tumble into a pile" is one of the most-copied effects on award-winning portfolio sites, and almost every tutorial builds it the wrong way: they let **Matter.js** draw everything into its own \`<canvas>\` using \`Matter.Render\`. That is fine for a physics demo and useless for a real interface — canvas-drawn labels are not selectable, not readable by a screen reader, not stylable with CSS, and not indexable by search engines.

This snippet does it the way production sites do. The chips stay **real DOM elements** with real text, real \`border-radius\`, real box-shadows. Matter.js runs an invisible rigid-body simulation alongside them, and every frame each element's \`transform\` is written from its matching body's position and angle. You get genuine physics on genuine HTML.

## Measuring first, simulating second

Each chip is measured before it gets a body:

\`var w = el.offsetWidth, h = el.offsetHeight;\`

That measurement is what makes the collision shape match what the user actually sees. "Tailwind" is a wider chip than "Go", so it needs a wider body — hard-coding one size for all of them produces the classic broken version where short chips float on invisible padding and long ones overlap.

The bodies are created with \`chamfer: { radius: h / 2 }\`, which rounds the rectangle's corners by half its height, turning the collision shape into a **true pill** that matches the CSS \`border-radius: 99px\`. Without the chamfer the physics body has square corners while the visual has round ones, and chips visibly snag on each other's invisible edges — the single most common giveaway that a physics-chip effect was built carelessly.

## The sync loop

The bridge between simulation and DOM is four lines inside a \`requestAnimationFrame\` loop:

\`p.el.style.transform = 'translate(' + (pos.x - p.w / 2) + 'px,' + (pos.y - p.h / 2) + 'px) rotate(' + p.body.angle + 'rad)'\`

Two details matter. Matter.js positions bodies by their **center**, while CSS \`translate\` on an absolutely positioned element moves its **top-left corner** — so half the width and height are subtracted to convert between the two coordinate conventions. And \`body.angle\` is in **radians**, which is why the CSS uses \`rotate(...rad)\` rather than converting to degrees; CSS accepts radians natively, so the conversion is free.

Only \`transform\` is written — never \`top\` or \`left\` — so the browser composites the movement without recalculating layout for ten elements sixty times a second.

## Dragging, and the wheel-event trap

\`MouseConstraint\` is what makes the pile grabbable: it creates a spring between the pointer and whichever body is under it, with \`stiffness: 0.16\` giving a soft elastic pull rather than a rigid snap. Bodies dragged into the stack shove the others out of the way, because the constraint feeds forces back into the same solver.

There is a trap here that catches almost everyone. \`Matter.Mouse\` binds wheel listeners to its element by default, so a stage placed mid-page **swallows page scrolling** — the user's wheel does nothing and they cannot scroll past your section. Removing \`mouse.mousewheel\` from both \`mousewheel\` and \`DOMMouseScroll\` releases it. The guard around it exists because the property name has moved between Matter versions.

## Walls, and why they are oversized

Three static bodies form the floor and side walls. They are deliberately far larger than the visible stage — \`W * 3\` wide, \`H * 4\` tall, \`120px\` thick — because thin walls in a discrete-step solver can be **tunneled through** by a fast body that moves further in one step than the wall is deep. A thick, oversized wall makes escape geometrically impossible, which is much cheaper than enabling continuous collision detection. There is no ceiling on purpose: chips spawn above the stage at negative Y and fall in.

The \`resize\` handler repositions the three walls with \`Body.setPosition\` rather than rebuilding the world, so a rotated phone or a dragged window doesn't strand the pile outside the new bounds.

## Reusing it

Swap the chip text for skills, tags, product categories, or filter values and the simulation adapts automatically, since every body is measured from its element. Raise \`restitution\` for a bouncier pile, raise \`frictionAir\` for a floatier one. It sits naturally beside a [tag cloud](/ui-snippets/tag-cloud/) as its playful counterpart, or a [physics balls](/ui-snippets/physics-balls/) canvas if you want to see the same ideas without a library.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Matter.js CDN', text: 'Include matter-js from the CDN panel — one script, no bundler needed.' },
      { title: 'Paste HTML, CSS, and JS', text: 'Ten tag chips drop in from above and settle into a pile.' },
      { title: 'Drag a chip', text: 'Grab any tag and throw it — the rest of the stack reacts and reshuffles.' },
      { title: 'Press Drop again', text: 'Every body is repositioned above the stage and falls fresh.' },
      { title: 'Edit the tags', text: 'Change the chip text — bodies are measured from the DOM, so sizes follow.' },
      { title: 'Tune the feel', text: 'Adjust restitution for bounce and frictionAir for how floaty the fall is.' },
    ] },
    features: [
      { title: 'Real DOM, real physics', text: 'Chips stay selectable HTML, not shapes painted into a canvas.' },
      { title: 'Bodies measured from elements', text: 'offsetWidth and offsetHeight size each collision shape to its chip.' },
      { title: 'Pill-shaped colliders', text: 'chamfer radius of h/2 matches the CSS border-radius so nothing snags.' },
      { title: 'Center-to-corner conversion', text: 'Half width and height subtracted to bridge Matter and CSS origins.' },
      { title: 'Radian rotation', text: 'body.angle is piped straight into CSS rotate() with rad units.' },
      { title: 'Throwable stack', text: 'MouseConstraint with 0.16 stiffness gives an elastic grab.' },
      { title: 'Page scroll preserved', text: 'Matter wheel listeners are unbound so the stage never traps scrolling.' },
      { title: 'Tunnel-proof walls', text: 'Oversized static bodies stop fast chips escaping the stage.' },
    ],
    useCases: [
      { title: 'Portfolio skill piles', text: 'The signature tech-stack effect, a livelier take on a [tag cloud](/ui-snippets/tag-cloud/).' },
      { title: 'Playful 404 pages', text: 'Let the page furniture collapse into a heap on a [404 page](/ui-snippets/404-page/).' },
      { title: 'Filter and category chips', text: 'Turn a static [chip filter](/ui-snippets/chip-filter/) row into something tactile.' },
      { title: 'Hero interactions', text: 'A draggable pile above the fold that rewards the first click.' },
      { title: 'Product feature reveals', text: 'Drop benefit tags into view as a section scrolls in.' },
      { title: 'Learning rigid-body basics', text: 'A readable reference for bodies, constraints, and DOM syncing.' },
      { icon: 'CODE', title: 'Related: Wave Text Animation', desc: 'See the [Wave Text Animation](/ui-snippets/wave-text/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why sync DOM elements instead of using Matter.Render?', a: 'Matter.Render paints into a canvas, which means the labels are not real text — they cannot be selected, read by a screen reader, styled with CSS, or indexed. Keeping the chips as HTML and only borrowing positions from the simulation gives you real, accessible markup with real physics behind it.' },
      { q: 'Why subtract half the width and height in the transform?', a: 'Matter.js stores a body position at its center point, but a CSS translate on an absolutely positioned element moves its top-left corner. Subtracting half the measured width and height converts between the two conventions; skip it and every chip renders offset down and to the right by half its own size.' },
      { q: 'What does the chamfer option do?', a: 'It rounds the corners of the rectangular collision shape. Setting the radius to half the chip height makes the physics body a true pill, matching the visual border-radius. Without it the invisible body has square corners while the chip looks rounded, so chips catch on edges that appear to be nowhere near them.' },
      { q: 'Why remove the mousewheel listeners?', a: 'Matter.Mouse binds wheel handlers to its element so a canvas game can zoom. On a page section that means the stage swallows scrolling — the user hits your component and the page stops moving. Unbinding mousewheel and DOMMouseScroll hands scrolling back to the browser while leaving drag intact.' },
      { q: 'Why are the walls so much bigger than the stage?', a: 'Discrete physics steps let a fast body jump past a thin wall between frames, escaping the world entirely. Making the walls 120px thick and several times the stage size makes that geometrically impossible, which is far cheaper than enabling continuous collision detection.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Create the engine, bodies, and runner inside a mount effect with a ref to the stage, and keep the body list in a ref rather than state since it mutates every frame. Cancel the requestAnimationFrame handle and call Matter.Runner.stop plus Matter.Engine.clear in the cleanup, or each mount leaks a running simulation. Render the chips from an array and measure them after the first paint.' },
    ],
    aiPrompt: {
      paragraph: `The clever parts of this snippet are the seams between two coordinate systems, which is exactly what an AI assistant is good at making explicit. Paste the HTML, CSS, and JS into an assistant like Claude and ask it to explain why the sync loop subtracts p.w / 2 and p.h / 2 before writing the transform, and what the chips would look like if you removed that — then try it and watch every chip sit offset by half its own size. Ask it next why chamfer: { radius: h / 2 } is required rather than cosmetic, and have it describe the exact visual symptom of leaving it out. For optimization, ask whether writing transform on ten elements per frame is meaningfully cheaper than writing top and left, and at what body count you would stop syncing DOM and switch to canvas rendering. For extension: have it add touch support via Matter's pointer handling, spawn a new chip on click at the cursor, freeze the simulation with Runner.stop once the pile has settled to save battery, or drive the chip list from real data so a filter adds and removes bodies live. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "falling tags" physics effect with Matter.js (from a CDN) where real HTML chips fall, collide, stack, and can be dragged — do NOT use Matter.Render or draw anything into a canvas.

Requirements:
- The tag chips must stay real DOM elements with real text, CSS border-radius and shadows, absolutely positioned inside a relative stage container. Matter.js runs an invisible simulation and you sync each element to its body every frame.
- Measure each chip with offsetWidth/offsetHeight BEFORE creating its body, and size the rectangle body from those measurements, so wide labels get wide colliders and short ones get short colliders.
- Give each body a chamfer with a radius of half the chip's height, so the collision shape is a true pill matching the CSS border-radius. Explain in a comment why square-cornered bodies would make rounded chips visibly snag on each other.
- Drive the visuals with a requestAnimationFrame loop that writes ONLY transform (never top/left): translate the element by the body position MINUS half the chip's width and height — because Matter positions bodies by their center while CSS translate moves the top-left corner — and rotate by body.angle using CSS rad units directly, since body.angle is in radians.
- Add a Matter MouseConstraint with a soft stiffness (around 0.16) so chips can be grabbed and thrown, shoving the rest of the pile realistically.
- After creating the Mouse, remove its 'mousewheel' and 'DOMMouseScroll' listeners (guarded, since the property name varies by version) so the stage does not swallow page scrolling — a section-embedded physics stage otherwise traps the user's wheel.
- Create three static walls (floor, left, right) that are deliberately oversized — several times the stage dimensions and around 120px thick — so fast-moving bodies cannot tunnel through them between discrete solver steps. No ceiling: chips spawn above the stage at negative Y and fall in, staggered so they don't all land at once.
- Add a reset button that repositions every body above the stage and zeroes its velocity and angular velocity, and a resize handler that repositions the three walls with Body.setPosition rather than rebuilding the world.`,
    },
  },
};

export default matterFallingTags;
