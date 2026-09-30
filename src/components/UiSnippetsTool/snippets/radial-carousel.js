const radialCarousel = {
  id: 'radial-carousel',
  title: 'Radial / Circular Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="rc-stage">
  <div class="rc-ring" id="rcRing">
    <div class="rc-item" data-i="0"><span>🎧</span></div>
    <div class="rc-item" data-i="1"><span>📷</span></div>
    <div class="rc-item" data-i="2"><span>⌚</span></div>
    <div class="rc-item" data-i="3"><span>🎮</span></div>
    <div class="rc-item" data-i="4"><span>🔊</span></div>
    <div class="rc-item" data-i="5"><span>💻</span></div>
  </div>
  <div class="rc-label" id="rcLabel">Headphones</div>
  <div class="rc-controls">
    <button class="rc-btn" id="rcPrev" aria-label="Rotate left">‹</button>
    <button class="rc-btn" id="rcNext" aria-label="Rotate right">›</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rc-stage{display:flex;flex-direction:column;align-items:center;gap:22px}
.rc-ring{position:relative;width:280px;height:280px}
.rc-item{position:absolute;top:50%;left:50%;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;background:linear-gradient(160deg,#232c42,#161c2c);border:1.5px solid #2a3348;display:flex;align-items:center;justify-content:center;font-size:26px;transition:transform .6s cubic-bezier(.65,0,.35,1),opacity .6s,box-shadow .3s}
.rc-item.rc-active{background:linear-gradient(160deg,#6366f1,#4338ca);border-color:#818cf8;box-shadow:0 10px 26px rgba(99,102,241,.45);transform:scale(1.15) var(--pos)!important}
.rc-label{color:#fff;font-size:16px;font-weight:800;min-height:22px}
.rc-controls{display:flex;gap:16px}
.rc-btn{width:40px;height:40px;border-radius:50%;background:#161c2c;border:1px solid #2a3348;color:#cbd5e1;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
.rc-btn:hover{background:#232c42;color:#fff}`,

  js: `var items = document.querySelectorAll('.rc-item');
var labels = ['Headphones', 'Camera', 'Watch', 'Console', 'Speaker', 'Laptop'];
var count = items.length;
var radius = 120;
var rotation = 0;

function layout() {
  items.forEach(function (item, i) {
    var angle = (360 / count) * i + rotation;
    var rad = angle * Math.PI / 180;
    var x = Math.sin(rad) * radius;
    var y = -Math.cos(rad) * radius;
    var pos = 'translate(' + x + 'px, ' + y + 'px)';
    item.style.setProperty('--pos', pos);
    item.style.transform = pos;
    var normalized = ((angle % 360) + 360) % 360;
    var isActive = normalized < 8 || normalized > 352;
    item.classList.toggle('rc-active', isActive);
    if (isActive) document.getElementById('rcLabel').textContent = labels[i] || '';
  });
}

function rotate(dir) {
  rotation += dir * (360 / count);
  layout();
}

document.getElementById('rcNext').addEventListener('click', function () { rotate(1); });
document.getElementById('rcPrev').addEventListener('click', function () { rotate(-1); });

items.forEach(function (item, i) {
  item.addEventListener('click', function () {
    var angle = (360 / count) * i + rotation;
    var normalized = ((angle % 360) + 360) % 360;
    var steps = Math.round(-normalized / (360 / count));
    rotation += steps * (360 / count);
    layout();
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') rotate(1);
  else if (e.key === 'ArrowLeft') rotate(-1);
});

layout();`,

  seo: {
    title: 'Radial / Circular Carousel — HTML CSS JS Snippet',
    description: 'Items arranged in a real circle that rotates to bring one to the front — trigonometry-driven positioning, click any item to bring it forward, arrow keys and prev/next. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Radial / Circular Carousel — Trigonometric Positioning Around a Ring',
      description: `Instead of sliding items left-to-right, this carousel arranges them around the circumference of a circle and *rotates the whole ring* so a different item ends up at the "front" (the top position, nearest the label). Every item's position comes from one trigonometry call: \`x = sin(angle) * radius\`, \`y = -cos(angle) * radius\`, where \`angle\` is that item's fixed slot around the circle plus the ring's current \`rotation\`. Change \`rotation\` by one step and every item recomputes its (x, y) simultaneously — the whole ring visibly turns.\n\n**Detecting "which one is at the front" without tracking an index**\n\nRather than keeping a separate "active index" variable, the front item is *derived*: after computing each item's angle, the code normalizes it to 0–360° and checks whether it falls within a small window around 0° (the top of the circle). This means clicking any item can work out exactly how many steps to rotate to bring *that* item to the front — normalize its current angle, and rotate by the negative of that amount — without a lookup table matching items to rotation offsets.\n\n**Scale and shadow, not just position**\n\nThe active item additionally gets \`scale(1.15)\` and a colored glow, layered on top of its positional transform via a CSS custom property (\`--pos\`) that holds the translate() call — so the active state can add a scale without overwriting the position transform underneath it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'Six items appear arranged around a circle, with the top one highlighted and labeled.' },
        { title: 'Click the arrows', text: 'The whole ring rotates one slot, bringing the next item to the top.' },
        { title: 'Click any item', text: 'The ring rotates directly to bring that specific item to the front — shortest path either direction.' },
        { title: 'Use arrow keys', text: 'Left/Right rotates the ring one step at a time without the mouse.' },
        { title: 'Add a seventh item', text: 'Add one more .rc-item and its label — the angle math (360 / count) adjusts automatically.' },
      ],
    },
    features: [
      'True circular arrangement — every item\'s position is computed from sin/cos, not hardcoded coordinates',
      'One rotation variable drives the entire ring — change it once and every item repositions together',
      'Front item detected by angle normalization, no separate active-index variable to keep in sync',
      'Click any item to rotate it directly to the front, choosing the shortest rotation automatically',
      'Active item scales up and glows via a CSS custom property layered on top of its position transform',
      'Item count is read from the DOM — add or remove an .rc-item and the angle spacing recalculates itself',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Category or icon pickers', desc: 'A playful way to browse a small set of options — product categories, filters, or team member avatars.' },
      { icon: 'APP',    title: 'Feature highlight wheels', desc: 'Rotate through a handful of key features or stats on a landing page with genuine visual interest.' },
      { icon: 'STAR',   title: 'Skill or tag showcases', desc: 'Arrange skills, technologies, or tags in a ring for a portfolio\'s about section.' },
      { icon: 'LEARN',  title: 'Learning trigonometric layout', desc: 'One of the clearest practical demonstrations of using sin/cos to place elements on a circle.' },
    ],
    faqs: [
      { q: 'How do I change the circle\'s size?', a: 'Update the radius variable in the JS (in pixels) and, if needed, the .rc-ring width/height in the CSS to comfortably fit items at that radius plus their own size.' },
      { q: 'Why does the active item use a CSS custom property instead of a class-only transform?', a: 'Because both the position (translate, changes every rotation) and the active-state emphasis (scale, changes only when active) need to combine into one transform. Storing the position in --pos lets the .rc-active rule append scale() without JavaScript needing to know or duplicate the current position value.' },
      { q: 'Can items be arranged in an ellipse instead of a perfect circle?', a: 'Yes — multiply the x calculation by a different radius than the y calculation (e.g. x = sin(angle) * radiusX, y = -cos(angle) * radiusY) to flatten the ring into an ellipse.' },
      { q: 'How do I make it auto-rotate?', a: 'Call rotate(1) on a setInterval at your desired pace, and clear the interval on any manual interaction (click or keydown) so autoplay doesn\'t fight a user actively browsing.' },
      { q: 'Is it accessible?', a: 'The prev/next controls are real buttons with aria-labels, each item is independently clickable, and Left/Right arrow keys provide full keyboard control without a mouse.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the sin/cos calculation places each item and why -cos is used for the y-axis specifically (rather than plain cos) to make angle 0 land at the top of the circle instead of the right side. It's also worth asking the assistant to add momentum-based dragging (rotate the ring proportionally as a user drags, then snap to the nearest item on release) instead of the current click-to-rotate-only interaction, or to make the ring tilt in 3D via a perspective wrapper for a more dramatic carousel effect.`,
      prompt: `Build a radial (circular) carousel in plain HTML, CSS, and vanilla JavaScript where items are arranged around the circumference of a ring and the whole ring rotates to bring a different item to the front — no library.

Requirements:
- A set of item elements absolutely positioned inside a container, where each item's (x, y) position is computed with trigonometry (sine and cosine) from that item's fixed angular slot around the circle (360 degrees divided by the total item count) plus a single shared "rotation" variable, not from hardcoded per-item coordinates.
- Rotating the ring must mean changing only that one shared rotation variable and then recomputing every item's position from it in one pass — a single state change must visibly move every item simultaneously around the circle.
- The item currently nearest a fixed reference position (the top of the circle) must be automatically detected by normalizing its computed angle into the 0-360 degree range and checking whether it falls within a small tolerance window of zero, without maintaining a separate manually-tracked "active index" variable.
- The detected front item must receive a distinct visual treatment (a larger scale and a colored glow) layered on top of its positional transform, not replacing it — items must keep rotating around the circle in their scaled-up state too.
- Clicking any individual item must rotate the ring the shortest direction necessary to bring that specific item to the front position.
- Provide rotate-left and rotate-right buttons that step the ring by one item's worth of angle, plus Left/Right arrow key support performing the same action.
- The angular spacing between items must be calculated from the actual number of item elements present in the DOM, so adding or removing an item automatically redistributes the spacing.`,
    },
  },
};

export default radialCarousel;
