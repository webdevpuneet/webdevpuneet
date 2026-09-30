const cssContainerQueryUnitsDemo = {
  id: 'css-container-query-units-demo',
  title: 'Container Query Units (cqw/cqh) Demo',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="controls">
    <label class="control-row">
      <span>Container width</span>
      <input type="range" id="width-slider" min="160" max="820" value="520" step="4">
      <span class="value-badge" id="width-value">520px</span>
    </label>
    <div class="unit-readout">
      <div class="readout-item">
        <span class="readout-label">8cqi on container</span>
        <span class="readout-value" id="cqi-readout">41.6px</span>
      </div>
      <div class="readout-item">
        <span class="readout-label">3.5vw on viewport</span>
        <span class="readout-value" id="vw-readout">--</span>
      </div>
    </div>
  </div>

  <div class="resizable-container" id="resizable-container" style="width: 520px;">
    <div class="container-tag">.card { container-type: inline-size; }</div>
    <div class="cqi-box">
      <p class="cqi-text">Scales with container</p>
      <p class="cqi-sub">font-size: 8cqi</p>
    </div>
  </div>

  <div class="vw-sibling">
    <div class="container-tag muted">Sibling — NOT inside a query container</div>
    <div class="vw-box">
      <p class="vw-text">Scales with viewport</p>
      <p class="vw-sub">font-size: 3.5vw</p>
    </div>
  </div>

  <p class="hint">Drag the slider — the left card's text resizes because it reads <code>cqi</code> (container inline-size) units. The right box only changes if you resize your <em>browser window</em>, because <code>vw</code> only ever reads the viewport.</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; color: #1e293b; }

.demo-wrap { max-width: 900px; margin: 0 auto; padding: 32px 20px 48px; display: flex; flex-direction: column; gap: 20px; }

.controls {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 18px 20px; display: flex; flex-direction: column; gap: 14px;
}
.control-row { display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 600; color: #475569; }
.control-row input[type="range"] { flex: 1; accent-color: #6366f1; }
.value-badge {
  background: #ede9fe; color: #6366f1; font-weight: 700; font-size: 12px;
  padding: 4px 10px; border-radius: 20px; min-width: 64px; text-align: center;
}

.unit-readout { display: flex; gap: 12px; }
.readout-item {
  flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
  padding: 10px 14px; display: flex; flex-direction: column; gap: 4px;
}
.readout-label { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
.readout-value { font-size: 16px; font-weight: 700; color: #6366f1; font-variant-numeric: tabular-nums; }

/* Resizable container */
.resizable-container {
  container-type: inline-size;
  container-name: demo-card;
  background: #fff; border: 2px solid #6366f1; border-radius: 16px;
  padding: 24px; max-width: 100%; min-width: 160px;
  transition: width 0.05s linear;
  position: relative;
  overflow: hidden;
}
.container-tag {
  position: absolute; top: 10px; right: 14px;
  font-size: 10px; font-family: 'SFMono-Regular', Consolas, monospace;
  color: #a5b4fc; background: #eef2ff; padding: 3px 8px; border-radius: 6px;
}
.container-tag.muted { color: #94a3b8; background: #f1f5f9; }

.cqi-box { padding-top: 18px; }
.cqi-text {
  font-size: 8cqi;
  font-weight: 800; color: #4338ca; line-height: 1.1;
  white-space: nowrap;
}
.cqi-sub {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 12px; color: #818cf8; margin-top: 6px;
}

/* Viewport sibling */
.vw-sibling {
  background: #fff; border: 2px dashed #cbd5e1; border-radius: 16px;
  padding: 24px; position: relative; overflow: hidden;
}
.vw-box { padding-top: 18px; }
.vw-text {
  font-size: 3.5vw;
  font-weight: 800; color: #475569; line-height: 1.1;
  white-space: nowrap;
}
.vw-sub {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 12px; color: #94a3b8; margin-top: 6px;
}

.hint { font-size: 13px; color: #64748b; line-height: 1.6; background: #fffbeb; border: 1px solid #fde68a; padding: 12px 16px; border-radius: 10px; }
.hint code { background: #fef3c7; padding: 1px 6px; border-radius: 4px; font-family: 'SFMono-Regular', Consolas, monospace; }`,

  js: `const slider = document.getElementById('width-slider');
const widthValue = document.getElementById('width-value');
const container = document.getElementById('resizable-container');
const cqiReadout = document.getElementById('cqi-readout');
const vwReadout = document.getElementById('vw-readout');

function updateContainer() {
  const px = Number(slider.value);
  container.style.width = px + 'px';
  widthValue.textContent = px + 'px';
  // 8cqi = 8% of the container's inline-size (its width, since container-type: inline-size)
  const cqiPx = (px * 8) / 100;
  cqiReadout.textContent = cqiPx.toFixed(1) + 'px';
}

function updateViewportReadout() {
  const vwPx = (window.innerWidth * 3.5) / 100;
  vwReadout.textContent = vwPx.toFixed(1) + 'px (viewport ' + window.innerWidth + 'px)';
}

slider.addEventListener('input', updateContainer);
window.addEventListener('resize', updateViewportReadout);

updateContainer();
updateViewportReadout();`,

  seo: {
    title: 'Container Query Units cqw/cqh/cqi — Free CSS Snippet',
    description: 'Interactive demo of CSS container query units (cqw, cqh, cqi) sizing text relative to a resizable container, not the viewport. Exports to React, Vue, Tailwind.',
    about: {
      title: 'CSS Container Query Units (cqw, cqh, cqi, cqmin, cqmax) — Component-Relative Sizing Explained',
      description: `For years, responsive typography and spacing in CSS had exactly one relative axis to work with: the viewport. Units like \`vw\`, \`vh\`, and \`vmin\` let a value scale with the browser window, but they had no concept of the actual space available to the element using them. A card in a 240px sidebar and a card in a 1200px main column would compute the exact same \`vw\`-based font-size, because \`vw\` has no idea it's sitting inside a narrow container. Container query units fix this at the root: they are relative units that resolve against the size of the nearest ancestor established as a **query container**, not the browser viewport.

**How a query container is established**

An element becomes a query container by setting \`container-type\` on it — most commonly \`container-type: inline-size\`, which tracks only the element's inline dimension (width in a horizontal writing mode). You can optionally name it with \`container-name\` so nested queries can target a specific ancestor rather than the nearest one. In this demo, \`.resizable-container\` has \`container-type: inline-size; container-name: demo-card;\` applied, which is what makes every \`cq*\` unit used by its descendants resolve against *that box's* width rather than the window's.

**The unit vocabulary: cqw, cqh, cqi, cqb, cqmin, cqmax**

Once an ancestor is a query container, descendants can use \`cqw\` (1% of the container's width), \`cqh\` (1% of the container's height), \`cqi\` (1% of the inline-size — width in normal horizontal writing modes, so functionally identical to \`cqw\` in most layouts but writing-mode aware), \`cqb\` (1% of the block-size), \`cqmin\` (the smaller of cqi/cqb), and \`cqmax\` (the larger). This demo uses \`font-size: 8cqi\` on \`.cqi-text\` — meaning the heading is always exactly 8% of the container's current inline-size. Drag the width slider from 160px to 820px and watch the readout: at 520px the text computes to 41.6px (520 × 0.08); at 300px it drops to 24px. The math is linear and live because the browser recalculates \`cqi\` on every layout pass, the same way it recalculates \`vw\`.

**Why the vw sibling doesn't move**

The right-hand box in this demo uses \`font-size: 3.5vw\` and sits *outside* any query container. Resizing the left card's width has zero effect on it — \`vw\` only reads \`window.innerWidth\`, which the JS in this demo also displays via a \`resize\` listener for comparison. This side-by-side contrast is the core lesson: viewport units answer "how big is the browser window," while container query units answer "how big is *this specific box*, wherever it happens to be placed."

**Why this matters for real component libraries in 2025/2026**

Design systems increasingly ship components meant to be dropped into wildly different contexts — a product card might render in a 3-column grid, a narrow sidebar widget, or a full-width hero. Before container query units, achieving a self-scaling card required either JavaScript-driven \`ResizeObserver\` logic or brittle breakpoint-based media queries tied to the *page's* width rather than the *component's* width. Container query units, paired with the \`@container\` at-rule for conditional layout switches, let a single component author its own internal responsive behavior declaratively, in CSS alone, correctly scoped to wherever it's mounted — including inside CMS-driven pages, dashboard widgets, and email-client-style embedded panels where you don't control the outer page structure.

**Browser support and pairing with clamp()**

Container query units and \`container-type\` shipped in all major evergreen browsers (Chrome, Edge, Safari, Firefox) starting in 2023, and by 2025 they're safe for production use without fallbacks in virtually any modern browser target. A common refinement is wrapping a \`cq\` unit inside \`clamp()\`, e.g. \`font-size: clamp(1rem, 8cqi, 3rem)\`, so the text still scales fluidly with the container but never shrinks below a legible floor or balloons past a sane ceiling — the same pattern used in the companion [Fluid Typography with clamp()](/ui-snippets/css-clamp-responsive-type-demo) snippet, just swapping the middle argument's unit from \`vw\` to \`cqi\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag the width slider', text: 'The slider directly sets the inline width of #resizable-container in JavaScript. Watch the "8cqi on container" readout update in lockstep — it is computed as container width times 0.08, matching exactly what the browser does internally when resolving font-size: 8cqi.' },
        { title: 'Compare against the vw sibling', text: 'The dashed box below uses font-size: 3.5vw and lives outside any query container. Moving the slider never changes it, because vw only tracks window.innerWidth, shown live in the "3.5vw on viewport" readout via a window resize listener.' },
        { title: 'Resize your actual browser window', text: 'To see the vw box respond, resize the browser window itself (not the slider). This proves the two units read from genuinely different sources: cqi from the nearest container-type: inline-size ancestor, vw from the viewport.' },
        { title: 'Inspect the container-type declaration', text: 'Open the CSS panel and find .resizable-container { container-type: inline-size; container-name: demo-card; }. This single declaration is what "activates" cqw/cqh/cqi units for every descendant — without it, cq* units fall back to behaving like small px values (0), so always confirm an ancestor establishes containment.' },
        { title: 'Try swapping cqi for cqw or cqmin', text: 'In .cqi-text, change font-size: 8cqi to 8cqw and observe it behaves identically here (because this container only varies in width). Then try cqmin(8cqi, 8cqb) conceptually — cqmin resolves to whichever of inline-size or block-size percentage is smaller, useful for square-ish avatar or icon containers.' },
        { title: 'Export and adapt to your components', text: 'Click JSX or Vue to export. In a real design system, apply container-type: inline-size to your card/widget wrapper component and use cqi-based font-size or padding on its internal typography so the component self-scales correctly whether it renders in a grid, sidebar, or modal — no JS ResizeObserver required.' },
      ],
    },
    features: [
      'container-type: inline-size establishes .resizable-container as a CSS query container',
      'font-size: 8cqi scales text as a live percentage of the container\'s inline-size, not the viewport',
      'Side-by-side vw sibling proves the difference — 3.5vw only reacts to window.innerWidth',
      'JS mirrors the browser\'s own unit math: cqiPx = containerWidthPx * 0.08 shown as a numeric readout',
      'Live width slider drives container.style.width, forcing a real layout recalculation on every input event',
      'window resize listener updates the vw readout independently of the container slider',
      'container-name: demo-card demonstrates named containment for targeting a specific ancestor',
      'No ResizeObserver or JS-computed font sizing anywhere — all scaling is native CSS cq* units',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Self-scaling product/profile cards across layout contexts', desc: 'A card component that must look correct whether it renders in a 3-column grid, a 280px sidebar, or a full-width hero needs its internal type and spacing to respond to its own box, not the page. Apply container-type: inline-size to the card wrapper and use cqi-based font-size on headings so every instance scales proportionally to wherever it is mounted, with zero JavaScript.' },
      { icon: 'APP', title: 'Dashboard widgets that get resized or dragged by users', desc: 'Draggable/resizable dashboard panels (charts, KPI tiles, embeds) commonly let users resize the widget itself. Container query units let the widget\'s title and numbers scale in real time as the panel is resized, exactly like this demo\'s slider drives the 8cqi text — far cheaper than recalculating font sizes with a ResizeObserver callback on every drag frame.' },
      { icon: 'LEARN', title: 'Teaching the difference between viewport-relative and container-relative units', desc: 'Developers new to container queries often assume cqw is "just vw but smarter." This side-by-side demo makes the distinction concrete: resizing the container changes only the left value, resizing the browser window changes only the right value, which is the clearest way to internalize that these are two independent coordinate systems.' },
      { icon: 'CODE', title: 'CMS and page-builder components with unpredictable placement', desc: 'Content authored in a CMS or drag-and-drop page builder can end up inside columns of arbitrary widths that the component author never controls. Using cqi units instead of rem or vw for internal typography means the same reusable block component looks proportionally correct regardless of which column width an editor drops it into.' },
      { icon: 'FORM', title: 'Email-client-safe or iframe-embedded widget typography', desc: 'Embedded widgets (support chat bubbles, third-party badges, iframe-rendered components) render inside a host page whose width the widget author cannot query via media queries. Since container query units resolve against the widget\'s own root container rather than the host viewport, they let embedded UI scale correctly even inside a narrow iframe on a wide desktop page.' },
      { icon: 'FLOW', title: 'Combining cqi with clamp() for fluid but bounded scaling', desc: 'Raw cqi values scale linearly forever, which can produce oversized text in very wide containers. Wrapping it as font-size: clamp(1rem, 8cqi, 3rem) keeps the container-relative scaling behavior from this demo while adding a hard floor and ceiling, the same fluid-bounding technique explored in the [Fluid Typography clamp() demo](/ui-snippets/css-clamp-responsive-type-demo).' },
      { icon: 'CODE', title: 'Related: CSS text-box-trim Demo', desc: 'See the [CSS text-box-trim Demo](/ui-snippets/css-text-box-trim-demo/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between cqw and cqi?', a: 'cqw is always 1% of the container\'s width. cqi is 1% of the container\'s inline-size, which is writing-mode aware — in standard horizontal-tb documents (the vast majority of English/European-language sites) cqi and cqw resolve identically. In vertical writing modes (some Japanese/Chinese layouts), inline-size maps to the container\'s height instead, so cqi would track that dimension while cqw always tracks literal width. Use cqi for logical, internationalization-safe sizing and cqw only when you specifically mean physical width.' },
      { q: 'Why does my cqi value compute to 0 or fall back to a tiny size?', a: 'Container query units only resolve against an ancestor that has container-type set to inline-size, size, or normal with containment. If no ancestor establishes containment, cqi units are treated as invalid at compute time and typically fall back to 0 or the initial value for that property. Always confirm a parent element (not necessarily the direct parent — any ancestor) declares container-type: inline-size, as .resizable-container does in this demo.' },
      { q: 'Do container query units work without also using the @container at-rule?', a: 'Yes — cqw/cqh/cqi/cqb/cqmin/cqmax are standalone length units usable anywhere a length is valid (font-size, padding, gap, width), independent of whether you also write @container conditional rules. This demo uses only the unit, with no @container block at all, proving the units are useful purely for continuous fluid scaling even without breakpoint-style conditional CSS.' },
      { q: 'Which browsers support container query units in 2026?', a: 'All major evergreen browsers — Chrome and Edge (105+), Safari (16+), and Firefox (110+) — have shipped full support for container-type and the full cq* unit set since 2023. As of 2025/2026 there is no meaningful browser gap for production use; the only caveat is that container-type: size (which also allows querying block-size) forces layout containment, which can affect intrinsic sizing of the container itself, so inline-size is the safer default for most components.' },
      { q: 'Can I use container query units inside a grid-template-areas layout?', a: 'Yes — apply container-type: inline-size to the grid container or to individual grid item wrappers, then any cq* unit used inside that item resolves against its own box, not the whole grid or the viewport. This composes well with the [Grid Template Areas Visualizer](/ui-snippets/css-grid-template-areas-visualizer) pattern, letting each named area size its internal content relative to the actual space that area receives after the grid track sizing algorithm runs.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to trace exactly why the .cqi-text font-size changes when the slider moves but the .vw-text font-size doesn't — having it explain the browser's containment and unit-resolution algorithm step by step will make the cqw/vw distinction stick far better than reading about it. You could also ask it to add a third comparison box using cqmin so you can see how it behaves differently once the container's height and width diverge, or to refactor the numeric readouts to use the CSS Typed OM (element.computedStyleMap()) instead of manual JS math so the displayed value is guaranteed to match what the browser actually rendered. It's also a good target for a browser-support conversation — ask which container query features need fallbacks for any older browsers you still need to support.`,
      prompt: `Build an interactive HTML/CSS/JS demo that teaches the difference between CSS container query units (cqw/cqi) and viewport units (vw) by showing them side by side.

Requirements:
- A range slider that directly controls the pixel width of a container element via JavaScript (element.style.width), with the current width shown in a badge next to the slider.
- The container element must have container-type: inline-size (and a container-name) set in CSS, and must contain a text element styled with font-size using a cqi unit (e.g. 8cqi) so it visibly scales in real time as the slider moves.
- A second, visually distinct sibling box outside any query container, styled with a vw-based font-size (e.g. 3.5vw), that does NOT change when the slider moves — only when the actual browser window is resized.
- Two live numeric readouts: one computing and displaying the expected pixel value of the cqi text (container width times the percentage) and one displaying the current vw-based pixel value plus the current window.innerWidth, updated via a window resize listener.
- Clear visual/textual labeling on each box (e.g. a small tag reading "container-type: inline-size" vs "NOT inside a query container") so a viewer can tell at a glance which box is which without reading the CSS.
- An explanatory caption below both boxes stating in plain language why one box reacts to the slider and the other does not.
- No external libraries — vanilla CSS container queries and plain DOM APIs only.`,
    },
  },
};

export default cssContainerQueryUnitsDemo;
