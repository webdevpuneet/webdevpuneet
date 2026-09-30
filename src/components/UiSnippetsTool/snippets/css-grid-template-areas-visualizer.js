const cssGridTemplateAreasVisualizer = {
  id: 'css-grid-template-areas-visualizer',
  title: 'CSS Grid Template Areas Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="toolbar">
    <div class="area-picker" id="area-picker">
      <button class="area-chip active" data-area="header" style="--chip: #6366f1">header</button>
      <button class="area-chip" data-area="sidebar" style="--chip: #f59e0b">sidebar</button>
      <button class="area-chip" data-area="main" style="--chip: #10b981">main</button>
      <button class="area-chip" data-area="footer" style="--chip: #ec4899">footer</button>
      <button class="area-chip" data-area="." style="--chip: #94a3b8">empty (.)</button>
    </div>
    <div class="toolbar-actions">
      <label class="dim-control">Rows
        <select id="rows-select"><option>2</option><option selected>3</option><option>4</option></select>
      </label>
      <label class="dim-control">Cols
        <select id="cols-select"><option>2</option><option selected>3</option><option>4</option></select>
      </label>
      <button class="btn-reset" id="btn-reset">Reset</button>
    </div>
  </div>

  <p class="paint-hint">Click a label above, then click-and-drag across cells below to paint that named area.</p>

  <div class="painter-grid" id="painter-grid"></div>

  <div class="preview-wrap">
    <p class="preview-label">Live rendered layout</p>
    <div class="preview-grid" id="preview-grid"></div>
  </div>

  <pre class="code-out" id="code-out"></pre>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }

.demo-wrap { max-width: 720px; margin: 0 auto; padding: 32px 20px 48px; display: flex; flex-direction: column; gap: 16px; }

.toolbar {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 14px 16px; display: flex; flex-direction: column; gap: 12px;
}
.area-picker { display: flex; gap: 8px; flex-wrap: wrap; }
.area-chip {
  border: 2px solid transparent; background: color-mix(in srgb, var(--chip) 14%, white);
  color: var(--chip); font-weight: 700; font-size: 12px;
  padding: 7px 14px; border-radius: 8px; cursor: pointer; font-family: 'SFMono-Regular', Consolas, monospace;
  transition: all 0.15s;
}
.area-chip:hover { border-color: color-mix(in srgb, var(--chip) 40%, white); }
.area-chip.active { border-color: var(--chip); background: var(--chip); color: #fff; }

.toolbar-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.dim-control { font-size: 12px; font-weight: 600; color: #64748b; display: flex; align-items: center; gap: 6px; }
.dim-control select { border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 8px; font-family: inherit; font-size: 12px; }
.btn-reset {
  margin-left: auto; background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;
  padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
}
.btn-reset:hover { background: #fee2e2; }

.paint-hint { font-size: 12px; color: #94a3b8; }

.painter-grid {
  display: grid; gap: 4px;
  background: #e2e8f0; border-radius: 12px; padding: 8px;
  user-select: none;
}
.paint-cell {
  min-height: 46px; border-radius: 6px; background: #fff;
  border: 1.5px dashed #cbd5e1; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: #94a3b8;
  font-family: 'SFMono-Regular', Consolas, monospace;
  transition: background 0.1s, border-color 0.1s;
}

.preview-wrap { display: flex; flex-direction: column; gap: 8px; }
.preview-label { font-size: 12px; font-weight: 600; color: #94a3b8; }
.preview-grid {
  display: grid; gap: 8px; min-height: 220px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 10px;
}
.preview-area {
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: #fff; text-transform: capitalize;
}

.code-out {
  background: #0f172a; color: #86efac; border-radius: 10px; padding: 14px 16px;
  font-size: 12px; font-family: 'SFMono-Regular', Consolas, monospace; line-height: 1.7;
  overflow-x: auto; white-space: pre;
}`,

  js: `const AREA_COLORS = { header: '#6366f1', sidebar: '#f59e0b', main: '#10b981', footer: '#ec4899', '.': '#94a3b8' };

const painterGrid = document.getElementById('painter-grid');
const previewGrid = document.getElementById('preview-grid');
const codeOut = document.getElementById('code-out');
const rowsSelect = document.getElementById('rows-select');
const colsSelect = document.getElementById('cols-select');
const chips = document.querySelectorAll('.area-chip');

let rows = 3;
let cols = 3;
let activeArea = 'header';
let isPainting = false;
let grid = [];

function defaultGrid(r, c) {
  const g = Array.from({ length: r }, () => Array.from({ length: c }, () => '.'));
  // seed a sensible default layout
  for (let x = 0; x < c; x++) g[0][x] = 'header';
  if (r > 1) for (let x = 0; x < c; x++) g[r - 1][x] = 'footer';
  for (let y = 1; y < r - 1; y++) {
    g[y][0] = 'sidebar';
    for (let x = 1; x < c; x++) g[y][x] = 'main';
  }
  if (r === 2) { for (let x = 0; x < c; x++) g[1][x] = 'main'; }
  return g;
}

function buildPainter() {
  grid = defaultGrid(rows, cols);
  render();
}

function render() {
  painterGrid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
  painterGrid.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
  painterGrid.innerHTML = '';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.className = 'paint-cell';
      const area = grid[y][x];
      cell.textContent = area === '.' ? '' : area;
      cell.style.background = area === '.' ? '#fff' : AREA_COLORS[area] + '22';
      cell.style.borderColor = area === '.' ? '#cbd5e1' : AREA_COLORS[area];
      cell.style.color = area === '.' ? '#94a3b8' : AREA_COLORS[area];
      cell.dataset.x = x;
      cell.dataset.y = y;

      cell.addEventListener('mousedown', () => { isPainting = true; paint(x, y); });
      cell.addEventListener('mouseenter', () => { if (isPainting) paint(x, y); });

      painterGrid.appendChild(cell);
    }
  }

  renderPreview();
  renderCode();
}

function paint(x, y) {
  grid[y][x] = activeArea;
  render();
}

function renderPreview() {
  const areasStr = grid.map(row => '"' + row.join(' ') + '"').join(' ');
  previewGrid.style.gridTemplateAreas = areasStr;
  previewGrid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
  previewGrid.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
  previewGrid.innerHTML = '';

  const seen = new Set();
  grid.flat().forEach(name => {
    if (name === '.' || seen.has(name)) return;
    seen.add(name);
    const el = document.createElement('div');
    el.className = 'preview-area';
    el.textContent = name;
    el.style.gridArea = name;
    el.style.background = AREA_COLORS[name] || '#6366f1';
    previewGrid.appendChild(el);
  });
}

function renderCode() {
  const lines = grid.map(row => '  "' + row.join(' ') + '"');
  codeOut.textContent =
    '.layout {\\n' +
    '  display: grid;\\n' +
    '  grid-template-areas:\\n' +
    lines.join('\\n') + ';\\n' +
    '  grid-template-columns: repeat(' + cols + ', 1fr);\\n' +
    '  grid-template-rows: repeat(' + rows + ', 1fr);\\n' +
    '}\\n\\n' +
    '.header  { grid-area: header; }\\n' +
    '.sidebar { grid-area: sidebar; }\\n' +
    '.main    { grid-area: main; }\\n' +
    '.footer  { grid-area: footer; }';
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeArea = chip.dataset.area;
  });
});

document.addEventListener('mouseup', () => { isPainting = false; });

rowsSelect.addEventListener('change', () => { rows = Number(rowsSelect.value); buildPainter(); });
colsSelect.addEventListener('change', () => { cols = Number(colsSelect.value); buildPainter(); });
document.getElementById('btn-reset').addEventListener('click', buildPainter);

buildPainter();`,

  seo: {
    title: 'CSS Grid Template Areas Visualizer — Free Layout Snippet',
    description: 'Paint a grid to build grid-template-areas visually and get the live generated CSS string. Learn named CSS Grid layout. Exports to React, Vue, Tailwind.',
    about: {
      title: 'CSS Grid Template Areas — Visual Named-Area Layout Builder and the grid-template-areas Syntax',
      description: `CSS Grid offers several ways to place items into a grid — explicit row/column line numbers, the \`grid-column\`/\`grid-row\` shorthand, or automatic placement — but the most human-readable of them all is \`grid-template-areas\`. It lets you literally draw your page layout as ASCII art inside your CSS, naming regions like \`header\`, \`sidebar\`, \`main\`, and \`footer\`, then assign each grid item to one of those names with a single \`grid-area\` declaration. This snippet turns that textual syntax into an interactive visual builder: paint cells with named areas, and watch both the rendered layout and the exact generated CSS string update together in real time.

**The syntax: a grid of quoted strings**

\`grid-template-areas\` takes one quoted string per grid row, with each string containing space-separated area names for that row's columns — e.g. \`"header header" "sidebar main" "footer footer"\` describes a 3-row, 2-column grid where the header spans both columns, the sidebar and main content sit side by side, and the footer spans the full width again. Every string must have the same number of space-separated tokens (representing equal column counts), and a cell can be marked with a single period \`.\` to leave it explicitly empty. This demo's \`renderCode()\` function builds exactly this string from a 2D array of area names, joining each row's tokens with spaces and wrapping each row in quotes — precisely mirroring what you'd hand-write in a stylesheet.

**Why non-rectangular spans are the interesting part**

The real power of named areas is that a single name can occupy a non-rectangular-looking token pattern in the ASCII grid as long as the actual occupied cells form a rectangle — repeating \`header\` across two columns in one row makes it span both columns as one grid item. This is fundamentally different from manually computing \`grid-column: 1 / 3\` line numbers; the area name IS the placement instruction, self-documenting the intent directly in the CSS. The browser's grid layout algorithm validates that each named area's cells form a valid rectangle at parse time — an invalid, non-rectangular shape (like an L-shape) is simply ignored as invalid syntax.

**Connecting the template to actual elements**

Once \`grid-template-areas\` is declared on the container, each child element opts into a named region with a single line: \`.header { grid-area: header; }\`. This is dramatically more readable in a real stylesheet than remembering which numbered line range corresponds to the header versus the sidebar, especially as a layout gains and loses regions across responsive breakpoints — a well-known pattern is redefining \`grid-template-areas\` entirely inside a \`@media\` query to restack a sidebar below the main content on narrow viewports, without touching any of the child elements' \`grid-area\` declarations at all.

**How this demo's painter maps to the syntax**

The paint grid in this demo is backed by a plain 2D JavaScript array (\`grid[y][x]\`), initialized by \`defaultGrid()\` to a sensible header/sidebar/main/footer starting layout. Clicking an area chip sets \`activeArea\`, and clicking-and-dragging across cells (using \`mousedown\` + \`mouseenter\` + a global \`mouseup\` listener to track the drag gesture) calls \`paint(x, y)\`, which writes the active area name into that cell of the array. Every paint triggers a full re-render: the preview grid's \`gridTemplateAreas\` style property is set directly from the generated string, and a matching \`.preview-area\` element is created for each unique area name found in the grid, with \`el.style.gridArea = name\` placing it. This closes the loop — the same data structure drives the interactive painter, the live rendered preview, and the text output, so what you see is guaranteed to match what the generated CSS actually does.

**Why this matters for 2025/2026 layout work**

Even with subgrid and container queries expanding what Grid can do, named template areas remain the clearest way to express page-level and component-level layout intent to future maintainers, designers reading a CSS file, or an AI coding assistant trying to understand a layout's structure from source alone. Being able to visually prototype an area layout before committing it to a stylesheet — and see immediately whether a given ASCII pattern is even valid — removes a common trial-and-error step from building responsive, semantically named grid layouts.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick an area to paint', text: 'Click one of the colored chips — header, sidebar, main, footer, or empty (.) — to set activeArea. The active chip is highlighted, and every subsequent cell you paint in the grid below will be assigned that name in the underlying grid[y][x] array.' },
        { title: 'Click and drag across cells', text: 'Click a cell to paint it, or press and drag across multiple cells to paint them all in one gesture — the isPainting flag set on mousedown and cleared on a document-level mouseup, combined with mouseenter on each cell, is what makes the drag-paint gesture work smoothly.' },
        { title: 'Watch the live preview update', text: 'The "Live rendered layout" panel is a real CSS Grid with its grid-template-areas property set directly from your painted pattern via previewGrid.style.gridTemplateAreas, and one colored block per unique area name placed with grid-area — so you see the actual browser layout result, not a simulation.' },
        { title: 'Read the generated CSS string', text: 'The code panel shows the exact grid-template-areas value your pattern produces, correctly quoted row by row, plus the matching .header/.sidebar/.main/.footer { grid-area: ... } rules — copy this directly into your stylesheet.' },
        { title: 'Change the row and column count', text: 'Use the Rows and Cols selects to rebuild the grid at a different size (2 to 4 in each dimension) via buildPainter(), which reseeds a default header/sidebar/main/footer pattern sized to the new dimensions so you always start from something valid.' },
        { title: 'Export and adapt to your own regions', text: 'Click JSX or Vue to export the pattern. In your project, replace the five demo area names with your own (e.g. nav, content, aside), keep the same paint-grid data structure, and swap the preview colors for your design system\'s palette.' },
      ],
    },
    features: [
      'Real grid-template-areas value built from a 2D JS array and applied via previewGrid.style.gridTemplateAreas',
      'Click-and-drag painting using mousedown + mouseenter + a document-level mouseup listener',
      'Live text output shows the exact quoted, row-by-row CSS string plus matching grid-area rules',
      'defaultGrid() seeds a sensible header/sidebar/main/footer starting layout for any row/column count',
      'Empty-area token (.) supported explicitly, matching the real CSS grid-template-areas empty-cell syntax',
      'Adjustable row and column count (2-4) rebuilds the grid and reseeds a valid default pattern',
      'Preview renders one element per unique named area using grid-area, deduplicated via a Set',
      'color-mix() used for chip backgrounds to derive a tinted variant of each area\'s accent color',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching CSS Grid named areas to developers new to Grid', desc: 'grid-template-areas is one of the more approachable parts of CSS Grid syntactically, but it is still easy to get the quoting or column-count-per-row wrong on the first few tries. This visual painter removes the trial-and-error of hand-writing the ASCII pattern by generating a guaranteed-valid string from clicks, letting a learner focus on understanding named placement rather than debugging syntax.' },
      { icon: 'DESIGN', title: 'Prototyping a responsive dashboard or app shell layout', desc: 'Before committing a page shell (header, nav, content, aside, footer) to a stylesheet, sketch a few row/column configurations in the painter to see how the regions relate spatially, then copy the generated grid-template-areas string as the starting point for both a desktop layout and a redefined mobile version inside a media query.' },
      { icon: 'CODE', title: 'Generating starter CSS for a new page template', desc: 'Rather than writing grid-template-areas by hand and manually counting quote characters per row, use this tool to paint the intended structure and copy the code panel output directly into a new stylesheet — reducing a common source of "Unexpected token" or mismatched-column-count CSS errors when authoring named grid layouts manually.' },
      { icon: 'APP', title: 'Explaining an existing layout\'s structure to a team or AI assistant', desc: 'If you inherit a codebase with a grid-template-areas-based layout, recreating the pattern in this painter by clicking through the existing CSS string gives an instant visual readout of the layout\'s actual structure — useful for onboarding, code review, or pairing with an AI coding assistant that needs to understand which named regions exist before helping restructure the layout.' },
      { icon: 'FLOW', title: 'Designing a layout that restacks at different breakpoints', desc: 'Because a single grid-template-areas property fully redefines placement without touching child elements\' grid-area rules, use the painter to design a desktop 3-column pattern and a separate single-column mobile pattern (sidebar and main both set to full width, stacked), then apply the mobile string inside a max-width media query rule.' },
      { icon: 'FORM', title: 'Building a print or PDF-style page layout with named regions', desc: 'Print stylesheets and paginated media benefit from clearly named regions (masthead, body-copy, sidebar-notes, page-footer) for maintainability. Use the painter to lay out a print-oriented grid, rename the demo\'s area chips to match your print regions, and export the generated CSS as the basis of a @media print grid-template-areas rule.' },
      { icon: 'CODE', title: 'Related: Drag & Drop Reorder List', desc: 'See the [Drag & Drop Reorder List](/ui-snippets/drag-drop-reorder-list/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What happens if my grid-template-areas rows have different numbers of columns?', a: 'The CSS is invalid and the entire grid-template-areas declaration is dropped by the browser, falling back to implicit grid placement — every quoted row string must contain the same number of space-separated area tokens. This demo prevents that class of error entirely, since every row of the underlying JS array always has exactly cols entries by construction, so any pattern you paint is guaranteed to serialize into valid, equal-width rows.' },
      { q: 'Can one named area span multiple rows and columns at the same time?', a: 'Yes — repeat the same area name across a rectangular block of cells in the pattern, in both the row and column directions, e.g. a 2x2 block of "main" tokens spanning two rows and two columns. The only constraint is that the occupied cells for a given name must form a rectangle; try painting a non-rectangular shape with one area name in this demo and you will see the preview\'s grid-area placement behave unpredictably, which mirrors how a real browser treats invalid area shapes.' },
      { q: 'How do I leave a cell empty in grid-template-areas?', a: 'Use a single period (.) as that cell\'s token instead of a name — this demo exposes it as the "empty (.)" chip. An empty cell participates in the grid\'s track sizing but has no element explicitly placed into it via grid-area, leaving a genuine gap in the layout, which is different from simply having fewer grid items than cells.' },
      { q: 'How do named areas interact with responsive breakpoints?', a: 'The standard pattern is to redeclare grid-template-areas (and often grid-template-columns) entirely inside a @media query, without touching any child element\'s grid-area rule. Since each element only references an area name, not a coordinate, redefining where that name sits in the pattern — for example collapsing a sidebar to sit below main content in a single-column mobile pattern — automatically restacks the layout with no other CSS changes needed.' },
      { q: 'Does grid-template-areas work well alongside subgrid or container queries?', a: 'Yes — grid-template-areas defines placement for the direct children of the grid container it is declared on, and is fully compatible with nested grids using display: grid or subgrid inside any named area\'s element. Combined with container query units as in the [Container Query Units demo](/ui-snippets/css-container-query-units-demo), a named area like main can itself become a query container so its internal content scales relative to the space that area actually receives after the outer grid\'s track sizing resolves.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly how the code panel's string gets built from the grid array, and what would happen (in real CSS) if two rows ended up with a different number of tokens — understanding that failure mode is one of the most common gotchas when hand-writing grid-template-areas. You could also ask it to add a responsive mode: painting a separate mobile pattern and generating a matching @media (max-width: 640px) block automatically, or to add validation that highlights cells in red if a named area's occupied cells don't form a valid rectangle. It's also a good candidate for a refactor conversation — ask whether representing the grid as a Map of area name to bounding box, instead of a raw 2D array, would make it easier to detect and prevent invalid non-rectangular shapes while painting.`,
      prompt: `Build an interactive visual builder for CSS grid-template-areas in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A row/column-configurable grid of clickable cells (adjustable via two selects, at least 2-4 rows and 2-4 columns) backed by a 2D JavaScript array holding a string area name (or "." for empty) per cell.
- A palette of selectable named areas (e.g. header, sidebar, main, footer) plus an explicit "empty" option, each with its own accent color; clicking one sets it as the active paint value.
- Click-and-drag painting across multiple cells in one gesture (mousedown to start, mouseenter per cell while dragging, and a document-level mouseup to stop), not just single-cell clicks.
- A live rendered preview elsewhere on the page that is an actual CSS grid with its grid-template-areas property set directly from the painted pattern (not simulated with absolute positioning), with one colored block per unique named area correctly placed via the grid-area property.
- A read-only text output showing the exact, correctly quoted, row-by-row grid-template-areas CSS string your pattern produces, plus a matching grid-area rule for each named area, formatted as it would appear in a real stylesheet.
- Sensible default seeded pattern on load and on any row/column count change, so the grid never starts in an invalid or confusing empty state.
- Explain, in a comment, what makes a set of painted cells for one area name "invalid" in real CSS (i.e. when it doesn't form a rectangle) even though this demo may not strictly enforce it.`,
    },
  },
};

export default cssGridTemplateAreasVisualizer;
