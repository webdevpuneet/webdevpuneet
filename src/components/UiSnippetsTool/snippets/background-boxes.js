const backgroundBoxes = {
  id: 'background-boxes',
  title: 'Background Boxes',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="bb-hero">
  <div class="bb-grid" id="bbGrid" aria-hidden="true"></div>
  <div class="bb-fade" aria-hidden="true"></div>
  <div class="bb-content">
    <h1>Hover the grid</h1>
    <p>Cells light up in random colors under your cursor — a living interactive backdrop.</p>
    <button type="button" class="bb-btn">Explore</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05050b;color:#fff}

.bb-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center}
.bb-grid{position:absolute;inset:0;display:grid;transform:skewX(-48deg) rotate(0deg) scale(1.6);transform-origin:center}
.bb-cell{border-right:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);transition:background-color .15s ease}

.bb-fade{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 25%,#05050b 72%);pointer-events:none}

.bb-content{position:relative;z-index:1;padding:0 20px;max-width:560px;pointer-events:none}
.bb-content h1{font-size:clamp(34px,8vw,68px);font-weight:900;letter-spacing:-.03em;background:linear-gradient(120deg,#fff,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.bb-content p{margin-top:14px;font-size:16px;color:#9a9ab8;line-height:1.55}
.bb-btn{margin-top:24px;pointer-events:auto;background:#6366f1;color:#fff;border:none;border-radius:12px;padding:13px 26px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;transition:transform .15s,background .2s}
.bb-btn:hover{background:#4f46e5;transform:translateY(-2px)}`,

  js: `var grid = document.getElementById('bbGrid');
var COLORS = ['#6366f1','#ec4899','#22d3ee','#34d399','#fbbf24','#fb7185','#a78bfa','#60a5fa'];
var COLS = 24, ROWS = 16, SIZE = 56;   // cell size in px

grid.style.gridTemplateColumns = 'repeat(' + COLS + ',' + SIZE + 'px)';
grid.style.gridTemplateRows = 'repeat(' + ROWS + ',' + SIZE + 'px)';

var cells = [];
for (var i = 0; i < COLS * ROWS; i++) {
  var c = document.createElement('div');
  c.className = 'bb-cell';
  grid.appendChild(c);
  cells.push(c);
}

// On hover, flash the cell a random color, then let it fade back via transition.
// Event delegation keeps us to a single listener for hundreds of cells.
grid.addEventListener('pointerover', function (e) {
  var cell = e.target;
  if (!cell.classList.contains('bb-cell')) return;
  cell.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
});
grid.addEventListener('pointerout', function (e) {
  var cell = e.target;
  if (!cell.classList.contains('bb-cell')) return;
  // Delay clearing slightly so quick passes leave a brief trail.
  setTimeout(function () { cell.style.backgroundColor = ''; }, 400);
});`,

  seo: {
    title: 'Background Boxes — Free HTML CSS JS Interactive Grid Snippet',
    description: `A skewed grid hero backdrop whose cells light up in random colors under the cursor and fade out, built with event delegation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Background Boxes — Cursor-Lit Skewed Grid Backdrop',
      description: `Background boxes is the interactive hero backdrop where a large skewed grid of cells lights up in random colors as your cursor sweeps across it, leaving a brief trail of color that fades away — a playful, living surface behind your headline. This snippet builds it with plain HTML, CSS, and a compact vanilla JavaScript handler that stays fast even with hundreds of cells.

**Generating the grid**

The grid is created in JavaScript: a loop appends \`COLS × ROWS\` (here 24 × 16 = 384) plain \`<div>\` cells into a CSS grid whose column and row tracks are set to a fixed pixel size. Each cell has only a faint right and bottom border, so together they form a clean graph-paper lattice. Building the cells in code rather than hand-writing 384 divs keeps the markup tiny and the dimensions trivially adjustable through three constants.

**The signature skew**

What turns a plain grid into the recognizable "boxes" look is the container transform: \`skewX(-48deg) scale(1.6)\`. The skew shears the whole lattice into a dynamic parallelogram angle, and the scale-up ensures the skewed grid still covers the full hero with no empty corners. This single transform on the container is what gives the backdrop its distinctive diagonal energy.

**Lighting cells with event delegation**

Rather than attaching a listener to every one of the hundreds of cells, the snippet uses event delegation: two listeners on the grid container catch \`pointerover\` and \`pointerout\` events as they bubble up, and a class check confirms the target is a cell. On \`pointerover\` the cell's \`background-color\` is set to a random color from the palette; on \`pointerout\` it's cleared. Delegation means the cost stays constant no matter how large the grid grows — adding more cells doesn't add more listeners.

**The fading color trail**

Each cell has a \`transition\` on \`background-color\`, so when the color is cleared the cell fades back to transparent instead of snapping. The clear is also delayed by 400ms with a \`setTimeout\`, so a quick cursor pass leaves a short-lived trail of lit cells rather than only ever showing the single cell directly under the pointer. The combination of the delay and the transition is what creates the comet-tail effect.

**The vignette and content layering**

A radial \`.bb-fade\` layer darkens the grid toward the edges so the lit cells appear to emerge from darkness and the hard grid boundary is hidden. The content sits above at a higher z-index and is set \`pointer-events: none\` (except the button) so moving the cursor over the headline still passes through to light the grid underneath — the text never blocks the interaction.

**Customizing it**

Change \`COLS\`, \`ROWS\`, and \`SIZE\` to resize the lattice, edit the skew angle for a different slant, swap the \`COLORS\` palette, or tune the 400ms clear delay to lengthen or shorten the trail. Adjust the vignette stops to focus more or less tightly. Pair it with a [text generate](/ui-snippets/text-generate/) headline or a [shimmer button](/ui-snippets/shimmer-button/) for a vivid interactive hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A skewed grid hero renders behind a centered headline.` },
      { title: 'Sweep your cursor', text: `Cells light up in random colors under the pointer.` },
      { title: 'Move quickly', text: `A short trail of lit cells fades out behind you.` },
      { title: 'Hover the headline', text: `The grid still lights up through the text.` },
      { title: 'Resize the lattice', text: `Change COLS, ROWS, and SIZE constants.` },
      { title: 'Recolor and re-skew', text: `Edit the palette and the skew angle.` },
    ] },
    features: [
      { title: 'Code-generated grid', text: `Cells built from three size constants.` },
      { title: 'Skewed lattice', text: `skewX plus scale gives the boxes their slant.` },
      { title: 'Event delegation', text: `Two listeners light hundreds of cells.` },
      { title: 'Random color flash', text: `Each hovered cell picks a palette color.` },
      { title: 'Fading color trail', text: `A delay plus transition leaves a comet tail.` },
      { title: 'Vignette fade', text: `Cells emerge from a darkened surround.` },
      { title: 'Click-through content', text: `pointer-events none lets the grid light under text.` },
      { title: 'Constant cost', text: `Grid size never adds more listeners.` },
    ],
    useCases: [
      { title: 'Interactive heroes', text: `Backdrop for a [text generate](/ui-snippets/text-generate/) headline.` },
      { title: 'Dev-tool landing pages', text: `Pair with an [animated grid background](/ui-snippets/animated-grid-background/) elsewhere.` },
      { title: 'Playful 404 pages', text: `Liven up an [empty state](/ui-snippets/empty-state/) screen.` },
      { title: 'Event microsites', text: `Add a [shimmer button](/ui-snippets/shimmer-button/) over the grid.` },
      { title: 'Portfolio intros', text: `A dynamic alternative to a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Delegation demos', text: `A reference for delegated grid interactions.` },
      { icon: 'CODE', title: 'Related: Canvas Fractal Tree Generator', desc: 'See the [Canvas Fractal Tree Generator](/ui-snippets/canvas-fractal-tree/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: FAB Container Transform Sheet', desc: 'See the [FAB Container Transform Sheet](/ui-snippets/fab-container-transform-sheet/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does it light hundreds of cells efficiently?', a: `Through event delegation. Instead of a listener on every cell, two listeners on the grid container catch pointerover and pointerout as they bubble, and a class check confirms the target is a cell. The cost stays constant regardless of grid size, so adding more cells never adds more listeners.` },
      { q: 'What creates the fading trail behind the cursor?', a: `Each cell has a CSS transition on background-color, and the color is cleared on pointerout after a 400ms setTimeout. The delay keeps recently-hovered cells lit briefly while you move on, and the transition fades them out smoothly, producing a short comet-tail trail rather than only the single cell under the pointer.` },
      { q: 'Why is the grid skewed?', a: `The container has transform: skewX(-48deg) scale(1.6). The skew shears the lattice into a dynamic diagonal parallelogram — the recognizable boxes look — and the scale ensures the skewed grid still covers the whole hero with no empty corners. It's a single transform on the container.` },
      { q: 'Why can I still light the grid while hovering the headline?', a: `The content layer is set to pointer-events: none (except the button), so pointer events pass through the text to the grid beneath. That means moving the cursor over the headline still triggers the cells underneath, and the text never blocks the interaction.` },
      { q: 'How do I use these background boxes in React, Vue, or Angular?', a: `Render the cells from an array sized by your constants, and attach delegated pointerover/pointerout handlers on the grid container (or use the framework's event binding with a target check). Set the cell color via inline style or a brief state map, clearing it on a timeout. The skew and vignette are pure CSS. In Tailwind, build the grid with grid utilities and apply the skew with an arbitrary transform value.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the delegation and timing tricks here by inspection alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the pointerover and pointerout listeners sit on the grid container instead of on each of the 384 cells, and how the classList check filters bubbled events down to real cells. The same assistant can help you optimize it — asking whether building the lattice with a single reusable pool of cell colors avoids repeated string lookups, or whether a CSS-only hover selector could replace the JS entirely for browsers that support it. It's also useful for extending the effect: ask it to make the lit color follow the cursor's velocity, ripple outward to neighboring cells instead of a single flash, or drive the grid from real-time data so cells light up on actual events. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive "background boxes" hero backdrop in plain HTML, CSS, and JavaScript using event delegation — no per-cell event listeners, no libraries.

Requirements:
- Generate a large grid of plain div cells in JavaScript from three constants (columns, rows, and cell size in pixels), appending them into a CSS grid container whose gridTemplateColumns and gridTemplateRows are set from those constants.
- Apply a single transform on the grid container combining skewX and scale so the lattice reads as a slanted parallelogram that still fully covers its wrapping section with no visible gaps at the corners.
- Attach exactly one pointerover and one pointerout listener to the grid container itself (not to individual cells), and inside each handler check that the event target carries the cell class before acting, so the listener count never grows even if the grid has thousands of cells.
- On pointerover, set the hovered cell's background-color to a random color chosen from a fixed palette array.
- On pointerout, do not clear the color immediately — delay clearing it by a few hundred milliseconds with setTimeout, and give the cell's background-color a CSS transition, so a fast cursor pass leaves a brief fading trail of lit cells rather than an instant single-cell highlight.
- Layer a radial-gradient vignette above the grid that fades to the page background color at the edges, and place any headline content above that with pointer-events: none (except for any real buttons), so hovering the text still lights the grid underneath.`,
    },
  },
};

export default backgroundBoxes;
