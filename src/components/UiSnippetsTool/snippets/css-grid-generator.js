const cssGridGenerator = {
  id: 'css-grid-generator',
  title: 'CSS Grid Generator',
  category: 'dev',
  html: `<div class="wrap">
  <h2>CSS Grid Generator</h2>

  <div class="controls">
    <div class="control">
      <label>Columns <span id="cols-val">4</span></label>
      <input type="range" id="cols" min="1" max="12" value="4" />
    </div>
    <div class="control">
      <label>Rows <span id="rows-val">3</span></label>
      <input type="range" id="rows" min="1" max="8" value="3" />
    </div>
    <div class="control">
      <label>Column Gap <span id="col-gap-val">12px</span></label>
      <input type="range" id="col-gap" min="0" max="48" value="12" />
    </div>
    <div class="control">
      <label>Row Gap <span id="row-gap-val">12px</span></label>
      <input type="range" id="row-gap" min="0" max="48" value="12" />
    </div>
    <div class="control">
      <label>Cell count <span id="cells-val">6</span></label>
      <input type="range" id="cells" min="1" max="24" value="6" />
    </div>
  </div>

  <div class="preview-wrap">
    <div class="grid-preview" id="grid-preview"></div>
  </div>

  <div class="output">
    <div class="output-head">
      <span>Generated CSS</span>
      <button id="copy-btn">Copy CSS</button>
    </div>
    <pre id="css-output"></pre>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 720px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 18px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
.control label { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; }
.control label span { color: #6366f1; font-family: "SF Mono", Consolas, monospace; }
.control input[type="range"] { width: 100%; accent-color: #6366f1; }

.preview-wrap { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
.grid-preview { display: grid; min-height: 220px; }
.grid-cell {
  background: linear-gradient(135deg, #eef2ff, #e0e7ff); border: 1.5px dashed #a5b4fc; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #4338ca;
  min-height: 40px;
}

.output { background: #0f172a; border-radius: 12px; padding: 14px 16px; }
.output-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.output-head span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }
#copy-btn { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; cursor: pointer; }
#copy-btn:hover { background: #334155; }
#copy-btn.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }

#css-output { font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #a5b4fc; white-space: pre-wrap; line-height: 1.7; }`,
  js: `const colsInput = document.getElementById('cols');
const rowsInput = document.getElementById('rows');
const colGapInput = document.getElementById('col-gap');
const rowGapInput = document.getElementById('row-gap');
const cellsInput = document.getElementById('cells');

const colsVal = document.getElementById('cols-val');
const rowsVal = document.getElementById('rows-val');
const colGapVal = document.getElementById('col-gap-val');
const rowGapVal = document.getElementById('row-gap-val');
const cellsVal = document.getElementById('cells-val');

const gridPreview = document.getElementById('grid-preview');
const cssOutput = document.getElementById('css-output');
const copyBtn = document.getElementById('copy-btn');

function render() {
  const cols = parseInt(colsInput.value, 10);
  const rows = parseInt(rowsInput.value, 10);
  const colGap = parseInt(colGapInput.value, 10);
  const rowGap = parseInt(rowGapInput.value, 10);
  const cellCount = parseInt(cellsInput.value, 10);

  colsVal.textContent = cols;
  rowsVal.textContent = rows;
  colGapVal.textContent = colGap + 'px';
  rowGapVal.textContent = rowGap + 'px';
  cellsVal.textContent = cellCount;

  gridPreview.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
  gridPreview.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
  gridPreview.style.columnGap = colGap + 'px';
  gridPreview.style.rowGap = rowGap + 'px';

  gridPreview.innerHTML = '';
  for (let i = 1; i <= cellCount; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.textContent = i;
    gridPreview.appendChild(cell);
  }

  const css = '.grid-container {\\n' +
    '  display: grid;\\n' +
    '  grid-template-columns: repeat(' + cols + ', 1fr);\\n' +
    '  grid-template-rows: repeat(' + rows + ', 1fr);\\n' +
    '  column-gap: ' + colGap + 'px;\\n' +
    '  row-gap: ' + rowGap + 'px;\\n' +
    '}';
  cssOutput.textContent = css;
}

[colsInput, rowsInput, colGapInput, rowGapInput, cellsInput].forEach(input => {
  input.addEventListener('input', render);
});

copyBtn.addEventListener('click', () => {
  const text = cssOutput.textContent;
  const finish = () => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.textContent = 'Copy CSS'; copyBtn.classList.remove('copied'); }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(finish);
  } else {
    finish();
  }
});

render();`,

  seo: {
    title: 'CSS Grid Generator — Free HTML CSS JS Snippet',
    description: 'Visually build a CSS Grid layout with live column, row, and gap controls, an instant preview, and copyable grid-template-columns/rows CSS output. Exports to React, Vue & Tailwind.',
    about: {
      title: 'CSS Grid Generator — Live grid-template-columns, grid-template-rows & Gap Builder',
      description: `CSS Grid is one of the most powerful layout systems in modern CSS, but the property names are easy to mix up under deadline pressure — is it \`column-gap\` or \`grid-column-gap\`, and does \`repeat(4, 1fr)\` belong in \`grid-template-columns\` or \`grid-template-areas\`? This snippet turns grid construction into direct manipulation: five sliders control column count, row count, column gap, row gap, and how many placeholder cells to render, and every change instantly updates both a live visual preview and the exact CSS block you would paste into a stylesheet.

**Driving a real grid container with live style properties**

The preview element is a real \`display: grid\` container, not a simulation. \`render()\` reads each slider's current value and writes directly to \`gridPreview.style.gridTemplateColumns\`, \`gridTemplateRows\`, \`columnGap\`, and \`rowGap\` using the browser's own CSS Grid engine. This matters because it means the preview behaves exactly as a real grid would with the same properties — including how the browser handles more or fewer cells than the row/column count implies, letting you directly observe CSS Grid's implicit row creation when the cell count exceeds \`rows × columns\`.

**Populating placeholder cells**

A separate slider controls how many numbered placeholder \`.grid-cell\` divs get appended into the preview container, independent of the row and column count sliders. This is deliberate: seeing what happens when you have 10 cells in a 4-column, 2-row layout (which only accounts for 8 explicit cells) demonstrates CSS Grid's auto-placement behavior — the extra two cells flow into an implicitly created third row — without needing to explain the concept in the abstract. Dragging the cell-count slider past the explicit grid size is itself the best explanation of implicit rows.

**Building the copyable CSS output as a string**

\`render()\` also assembles a formatted CSS block as a plain string using \`repeat(N, 1fr)\` for both \`grid-template-columns\` and \`grid-template-rows\`, and separate \`column-gap\`/\`row-gap\` declarations rather than the shorthand \`gap\` property — this is intentional, since writing them separately makes it immediately clear which slider maps to which line when a user is learning the syntax, even though a production stylesheet would typically collapse them into a single \`gap: 12px 12px\` line. The \`repeat()\` function is used instead of listing out \`1fr 1fr 1fr 1fr\` explicitly, matching how experienced developers actually write grid templates for anything beyond two or three tracks.

**One-click copy to clipboard**

The Copy CSS button uses \`navigator.clipboard.writeText()\` to copy the exact generated CSS block, with a temporary "Copied!" label and green highlight for confirmation, and a safe fallback that still shows the confirmation state if the Clipboard API is unavailable in a restricted context like a sandboxed iframe.

**Why sliders instead of text inputs**

Text inputs for grid dimensions invite invalid states — negative numbers, non-numeric text, or absurdly large values that would freeze the browser rendering thousands of cells. Range sliders constrain the input space to sensible bounds (1-12 columns, 1-8 rows, 0-48px gaps, 1-24 cells) while still updating live on every drag, which keeps the tool fast and impossible to break through bad input, and keeps the generated CSS always syntactically valid no matter what the user does.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag the Columns and Rows sliders', text: 'Set the number of explicit grid tracks. The preview grid updates its column/row structure in real time.' },
        { title: 'Adjust Column Gap and Row Gap', text: 'Control the spacing between grid tracks independently — useful for asymmetric layouts like a tight column gap with a looser row gap.' },
        { title: 'Change the Cell count', text: 'Add more placeholder cells than rows × columns to see CSS Grid create implicit rows automatically.' },
        { title: 'Read the generated CSS', text: 'The dark panel always shows the exact grid-template-columns, grid-template-rows, column-gap, and row-gap declarations for the current settings.' },
        { title: 'Copy the CSS', text: 'Click "Copy CSS" to copy the block to your clipboard, ready to paste into your stylesheet on a .grid-container class.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Real display: grid container driven directly by slider values — not a simulated preview',
      'Independent column-gap and row-gap sliders for asymmetric spacing',
      'Cell-count slider demonstrates CSS Grid implicit row auto-placement live',
      'Generates copy-ready CSS using repeat(N, 1fr) matching real-world authoring style',
      'One-click Copy CSS button via the Clipboard API with visual confirmation',
      'Range-slider inputs keep every generated value syntactically valid, no broken states possible',
      'Live numeric readouts next to every slider label',
      'Zero dependencies — pure CSS Grid and vanilla JavaScript',
    ],
    useCases: [
      { icon: 'CODE', title: 'Prototyping a layout before writing final CSS', desc: 'Dial in the exact column and row count and gap spacing visually, then copy the generated block directly into your project stylesheet.' },
      { icon: 'LEARN', title: 'Teaching CSS Grid fundamentals', desc: 'Demonstrate implicit row creation by pushing the cell count past rows × columns, or show how column-gap and row-gap differ from the gap shorthand.' },
      { icon: 'DESIGN', title: 'Building a gallery or dashboard grid', desc: 'Pair with a [Masonry Grid](/ui-snippets/masonry-grid/) or a [Responsive Card Grid](/ui-snippets/css-grid-cards/) once you have settled on a base column and gap structure here.' },
      { icon: 'APP', title: 'Explaining a layout choice in code review', desc: 'Share the generated CSS and matching visual preview so a teammate can see exactly what a proposed grid-template-columns value produces before merging.' },
      { icon: 'FLOW', title: 'Quick reference for CSS Grid syntax', desc: 'Use it as a live cheat sheet — the property names and repeat() syntax are correct and copy-paste ready every time, saving a trip to MDN.' },
      { icon: 'CODE', title: 'Related: CSS Specificity Visualizer', desc: 'See the [CSS Specificity Visualizer](/ui-snippets/css-specificity-visualizer/) for a related CSS-authoring dev tool worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: cURL Command Builder', desc: 'See the [cURL Command Builder](/ui-snippets/curl-command-builder/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Meta & Open Graph Tag Generator', desc: 'See the [Meta & Open Graph Tag Generator](/ui-snippets/meta-og-tag-generator/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the preview use real CSS Grid or a fake layout simulation?', a: 'It is a real display: grid container. The sliders write directly to gridTemplateColumns, gridTemplateRows, columnGap, and rowGap on the actual DOM element, so the preview behaves exactly like CSS Grid does in any browser, including auto-placement behavior.' },
      { q: 'What happens if I set more cells than rows times columns?', a: 'CSS Grid automatically creates additional implicit rows to fit the extra cells, following the standard auto-placement algorithm. This is a genuine, useful way to see implicit row creation happen live rather than reading about it.' },
      { q: 'Why are column-gap and row-gap separate instead of using the gap shorthand?', a: 'Writing them separately in the generated CSS makes the mapping from each slider to its corresponding CSS line unambiguous, which is especially helpful while learning the syntax. You can always manually collapse them into a single gap: <row> <column>; declaration afterward.' },
      { q: 'Does this generate grid-template-areas for named regions?', a: 'No, the generator focuses on the repeat(N, 1fr) track-based approach, which covers the majority of common grid layouts. Named template areas are a separate, more advanced CSS Grid feature not covered by the sliders here.' },
      { q: 'Is there a limit to how many columns, rows, or cells I can set?', a: 'Yes, by design: columns are capped at 12, rows at 8, gaps at 48px, and cells at 24. These bounds keep the preview fast and the generated CSS always sensible; edit the min/max attributes on the range inputs in the HTML panel to raise them.' },
      { q: 'Can I use fixed pixel or percentage tracks instead of 1fr?', a: 'Not directly from the sliders, which always generate equal-width repeat(N, 1fr) tracks. Copy the generated CSS and manually edit individual track sizes (e.g. replacing one 1fr with 200px) for mixed fixed/flexible layouts.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain exactly how CSS Grid's implicit row auto-placement algorithm decides where extra cells land when the cell count exceeds rows times columns — dragging the cell slider is a great way to build intuition, and an AI assistant can fill in the specification details behind what you are seeing. It is also a solid base to extend: ask for a toggle between repeat(N, 1fr) and named grid-template-areas mode, support for mixed fixed and flexible track sizes per column, or a "randomize" button that spans some cells across multiple grid tracks using grid-column and grid-row.`,
      prompt: `Build a visual CSS Grid layout generator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- Range sliders for: number of grid columns (1-12), number of grid rows (1-8), column gap in pixels (0-48), row gap in pixels (0-48), and a separate slider for how many placeholder cells to render (1-24, independent of rows times columns).
- A live preview area that is an actual display: grid container, with its gridTemplateColumns, gridTemplateRows, columnGap, and rowGap style properties set directly from the slider values on every input event — not a simulated or hand-drawn grid.
- Numbered placeholder cells filling the preview grid according to the cell-count slider, so that setting more cells than rows times columns visibly demonstrates CSS Grid's implicit row auto-placement.
- A read-only output panel showing the exact generated CSS for a .grid-container class, using repeat(N, 1fr) for the template columns and rows and separate column-gap/row-gap declarations, updating live alongside the preview.
- A "Copy CSS" button that copies the generated CSS block to the clipboard using the Clipboard API, with a brief visual confirmation, and a safe fallback if the Clipboard API is unavailable.`,
    },
  },
};

export default cssGridGenerator;
