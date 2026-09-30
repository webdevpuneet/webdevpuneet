const hoverRevealList = {
  id: 'hover-reveal-list',
  title: 'Hover Reveal List',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<section class="hr-section" id="hrSection">
  <ul class="hr-list" id="hrList">
    <li class="hr-row" data-img="#6366f1,#8b5cf6"><span class="hr-name">Northwind Rebrand</span><span class="hr-meta">Identity · 2024</span></li>
    <li class="hr-row" data-img="#ec4899,#f43f5e"><span class="hr-name">Lumen Mobile App</span><span class="hr-meta">Product · 2024</span></li>
    <li class="hr-row" data-img="#22d3ee,#3b82f6"><span class="hr-name">Atlas Dashboard</span><span class="hr-meta">Web · 2023</span></li>
    <li class="hr-row" data-img="#34d399,#10b981"><span class="hr-name">Forge Campaign</span><span class="hr-meta">Motion · 2023</span></li>
    <li class="hr-row" data-img="#f59e0b,#ef4444"><span class="hr-name">Drift Packaging</span><span class="hr-meta">Print · 2022</span></li>
  </ul>
  <div class="hr-preview" id="hrPreview" aria-hidden="true"></div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08080e;color:#fff;display:flex;align-items:center;min-height:100vh}

.hr-section{position:relative;width:100%;max-width:760px;margin:0 auto;padding:30px 24px}
.hr-list{list-style:none}
.hr-row{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:22px 6px;border-top:1px solid #1c1c2e;cursor:pointer;position:relative;z-index:2}
.hr-row:last-child{border-bottom:1px solid #1c1c2e}
.hr-name{font-size:clamp(22px,4.5vw,38px);font-weight:800;letter-spacing:-.02em;color:#6b6b86;transition:color .3s,transform .3s}
.hr-meta{font-size:13px;color:#46465e;transition:color .3s}
.hr-row:hover .hr-name{color:#fff;transform:translateX(10px)}
.hr-row:hover .hr-meta{color:#a9a9c2}

.hr-preview{position:fixed;z-index:1;width:260px;height:180px;border-radius:14px;background:var(--g);pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.85) rotate(-6deg);transition:opacity .25s,transform .25s;box-shadow:0 30px 60px -24px rgba(0,0,0,.8);will-change:transform,opacity;background-size:cover}
.hr-preview.show{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(-4deg)}`,

  js: `var section = document.getElementById('hrSection');
var rows = Array.prototype.slice.call(document.querySelectorAll('.hr-row'));
var preview = document.getElementById('hrPreview');
var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, visible = false;

rows.forEach(function (row) {
  row.addEventListener('pointerenter', function () {
    preview.style.setProperty('--g', 'linear-gradient(135deg,' + row.getAttribute('data-img') + ')');
    preview.classList.add('show');
    visible = true;
  });
  row.addEventListener('pointerleave', function () {
    preview.classList.remove('show');
    visible = false;
  });
});

// The preview eases toward the cursor (lerp) so it trails smoothly behind it.
section.addEventListener('pointermove', function (e) {
  tx = e.clientX; ty = e.clientY;
  if (!raf) raf = requestAnimationFrame(loop);
});
function loop() {
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;
  preview.style.left = cx + 'px';
  preview.style.top = cy + 'px';
  if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 || visible) {
    raf = requestAnimationFrame(loop);
  } else { raf = null; }
}`,

  seo: {
    title: 'Hover Reveal List — Free HTML CSS JS Preview Snippet',
    description: `An editorial project list where hovering a row floats a thumbnail preview that eases along with your cursor and tilts. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Hover Reveal List — Floating Thumbnail That Follows the Cursor',
      description: `The hover reveal list is the editorial index — common on portfolio and studio sites — where a clean list of project names sits quietly until you hover a row, at which point a thumbnail preview fades in and floats along with your cursor, tilted slightly like a card held in the air. This snippet builds it with plain HTML, CSS, and a small vanilla JavaScript loop.

**A single shared preview**

Rather than one image per row, there's a single fixed-position \`.hr-preview\` element that all rows share. Hovering a row sets the preview's background (from the row's \`data-img\`) and reveals it; leaving hides it. Reusing one element keeps the DOM minimal and means the preview can smoothly cross-fade as you move from one row to the next instead of having images pop in and out. In production you'd set the background to a real thumbnail URL per row.

**Easing toward the cursor with lerp**

The preview doesn't snap to the pointer — it trails. A \`pointermove\` handler stores the raw cursor position as a target, and an animation loop eases the preview's actual position toward it with linear interpolation: \`current += (target - current) * 0.18\` each frame. That lag is what makes the thumbnail feel like it's floating and being dragged through the air behind the cursor, rather than rigidly pinned to it. The 0.18 factor tunes how tightly it follows.

**A self-terminating loop**

The \`requestAnimationFrame\` loop only runs while it has work to do. It keeps going while the preview is visible or while it's still catching up to the cursor (the distance check), and sets \`raf = null\` to stop once the preview is hidden and settled. The next \`pointermove\` restarts it. This avoids burning a frame loop forever when the pointer is idle and nothing is shown.

**The reveal and tilt**

The preview starts hidden at \`opacity: 0\`, scaled down and rotated \`-6deg\`. Adding the \`.show\` class transitions it to full opacity, full scale, and \`-4deg\` — so it both fades in and subtly straightens, giving a lively pop. The slight constant rotation makes it read as a physical card rather than a flat rectangle. A strong drop shadow lifts it above the list.

**The list interaction**

Each row's name is muted at rest and brightens and nudges right on hover, while its meta text lightens — so the row itself responds, not just the preview. Rows sit above the preview in z-index so the floating image passes behind the text, keeping the names readable. The whole thing reads as a refined, interactive index.

**Customizing it**

Swap each row's \`data-img\` for real thumbnail URLs, change the preview size and tilt, tune the \`0.18\` follow tightness, or adjust the row hover treatment. Make rows real links to project pages. Pair it with a [flip link](/ui-snippets/flip-link/) navigation or a [hero parallax grid](/ui-snippets/hero-parallax-grid/) for a complete studio site.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A quiet list of project names renders.` },
      { title: 'Hover a row', text: `A thumbnail preview fades in near your cursor.` },
      { title: 'Move the cursor', text: `The preview eases along, trailing and tilted.` },
      { title: 'Move between rows', text: `The preview cross-fades to each project's image.` },
      { title: 'Swap in thumbnails', text: `Set each row's data-img to a real image URL.` },
      { title: 'Tune the follow', text: `Adjust the lerp factor and preview tilt.` },
    ] },
    features: [
      { title: 'Single shared preview', text: `One element cross-fades across rows.` },
      { title: 'Lerp cursor follow', text: `The thumbnail trails smoothly behind the pointer.` },
      { title: 'Self-terminating loop', text: `rAF stops when idle and hidden.` },
      { title: 'Fade-and-straighten', text: `Preview pops in with a tilt change.` },
      { title: 'Floating card feel', text: `Constant rotation and a deep shadow.` },
      { title: 'Responsive rows', text: `Names brighten and nudge on hover.` },
      { title: 'Readable layering', text: `Preview passes behind the row text.` },
      { title: 'Image-swappable', text: `data-img makes it a real thumbnail index.` },
    ],
    useCases: [
      { title: 'Portfolio indexes', text: `Pair with a [hero parallax grid](/ui-snippets/hero-parallax-grid/) of work.` },
      { title: 'Studio project lists', text: `Top with a [flip link](/ui-snippets/flip-link/) navigation.` },
      { title: 'Case-study menus', text: `Preview each study before opening it.` },
      { title: 'Blog archives', text: `Float article images on a [table of contents](/ui-snippets/table-of-contents/).` },
      { title: 'Photography sets', text: `Reveal a shot per collection name.` },
      { title: 'Cursor-follow demos', text: `A reference for lerp-trailing previews.` },
      { icon: 'CODE', title: 'Related: Nav Tabs — Overflow Collapse to ', desc: 'See the [Nav Tabs — Overflow Collapse to ](/ui-snippets/nav-tabs-overflow-more-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use one shared preview instead of an image per row?', a: `A single fixed preview element keeps the DOM minimal and lets the thumbnail cross-fade as you move between rows, rather than separate images popping in and out. Each row just sets the shared preview's background from its data-img and toggles its visibility, so moving down the list smoothly swaps the picture.` },
      { q: 'Why does the preview trail behind the cursor?', a: `A pointermove handler stores the raw cursor position as a target, and an animation loop eases the preview toward it with linear interpolation: current += (target - current) * 0.18 each frame. That deliberate lag makes the thumbnail feel like it's floating and being dragged through the air, rather than rigidly pinned to the pointer. The 0.18 factor controls how tightly it follows.` },
      { q: 'Does the animation loop run constantly?', a: `No. The requestAnimationFrame loop only runs while the preview is visible or still catching up to the cursor; once it's hidden and settled, it sets the frame handle to null and stops. The next pointermove restarts it. This avoids running a frame loop forever while the pointer is idle and nothing is shown.` },
      { q: 'Why does the floating image not cover the names?', a: `The rows sit above the preview in z-index, so the thumbnail passes behind the text as it follows the cursor. The names stay fully readable, and the preview reads as a layer floating between the list and the background rather than obscuring the content.` },
      { q: 'How do I use this hover reveal list in React, Vue, or Angular?', a: `Render the rows from data and keep the cursor target and eased position in refs. Run the lerp loop in a mount effect, starting it on pointermove and cancelling on unmount. Set the shared preview's background and visibility from the hovered row's state. The CSS ports directly; in Tailwind, position the preview fixed with transform utilities and drive its background via an inline variable.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the interpolation loop by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the lerp formula current += (target - current) * 0.18 does frame by frame, or why the requestAnimationFrame loop deliberately stops itself once the preview is hidden and has caught up to the cursor. The same assistant is useful for optimizing it — ask whether the distance check (Math.abs comparisons) used to decide when to stop the loop could ever leave it running forever under specific mouse-movement patterns, and how to guard against that. It's just as handy for extending the effect: ask it to add a second, slower-trailing preview layer for a parallax depth effect, make the preview's tilt angle respond to the direction of cursor movement instead of a fixed value, or crossfade between two different thumbnails when moving quickly between rows. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an editorial hover-reveal project list in plain HTML, CSS, and JavaScript where hovering a row floats a single shared thumbnail preview that trails the cursor — no library, no per-row image elements.

Requirements:
- A list of rows, each containing a project name and metadata, with each row storing its preview image or gradient reference in a data attribute.
- One single fixed-position preview element shared across all rows (not one per row), initially hidden with reduced opacity, scaled down, and rotated slightly.
- On pointerenter of a row, set the shared preview's background from that row's data attribute and reveal it; on pointerleave, hide it again — so moving between rows cross-fades the same element rather than swapping distinct images.
- Track the raw pointer position on every pointermove over the list's container, storing it as a target coordinate separate from the preview's current displayed coordinate.
- Run a requestAnimationFrame loop that each frame moves the current displayed coordinate a fraction of the way toward the target coordinate (linear interpolation, not a direct snap), so the preview visibly lags behind and trails the cursor smoothly, and apply that current coordinate to the preview's position every frame.
- The loop must not run indefinitely: it should keep going only while the preview is currently visible or while the displayed coordinate is still measurably far from the target, and stop itself (clearing its handle) once both conditions are false, restarting cleanly on the next pointer movement.
- Give the row names a hover state that brightens their color and nudges them horizontally, while ensuring the row text always renders above the floating preview in stacking order so it stays readable.`,
    },
  },
};

export default hoverRevealList;
