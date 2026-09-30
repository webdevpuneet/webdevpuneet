const cssBoxModelInspector = {
  id: 'css-box-model-inspector',
  title: 'CSS Box Model Inspector',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="stage-panel">
    <div class="stage" id="stage">
      <div class="layer margin-layer" id="margin-layer">
        <span class="layer-tag margin-tag">margin</span>
        <span class="val val-top" id="val-margin-top"></span>
        <span class="val val-right" id="val-margin-right"></span>
        <span class="val val-bottom" id="val-margin-bottom"></span>
        <span class="val val-left" id="val-margin-left"></span>
        <div class="layer border-layer" id="border-layer">
          <span class="layer-tag border-tag">border</span>
          <span class="val val-top" id="val-border-top"></span>
          <span class="val val-right" id="val-border-right"></span>
          <span class="val val-bottom" id="val-border-bottom"></span>
          <span class="val val-left" id="val-border-left"></span>
          <div class="layer padding-layer" id="padding-layer">
            <span class="layer-tag padding-tag">padding</span>
            <span class="val val-top" id="val-padding-top"></span>
            <span class="val val-right" id="val-padding-right"></span>
            <span class="val val-bottom" id="val-padding-bottom"></span>
            <span class="val val-left" id="val-padding-left"></span>
            <div class="content-box" id="content-box">
              <span id="content-dims">200 x 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-readout">
      Rendered total: <strong id="total-readout">--</strong>
    </div>
  </div>

  <div class="controls">
    <div class="control-group">
      <div class="group-title">box-sizing</div>
      <div class="segmented" id="sizing-toggle">
        <button class="seg-btn active" data-sizing="content-box" type="button">content-box</button>
        <button class="seg-btn" data-sizing="border-box" type="button">border-box</button>
      </div>
    </div>

    <div class="control-group">
      <div class="group-title">Link sides</div>
      <label class="link-toggle">
        <input type="checkbox" id="link-check" checked />
        <span>Apply uniformly to all sides</span>
      </label>
    </div>

    <div class="sliders" id="sliders"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 880px; display: flex; gap: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; flex-wrap: wrap; }

.stage-panel { flex: 1 1 380px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.stage { position: relative; width: 100%; height: 320px; background: repeating-conic-gradient(#f1f5f9 0% 25%, #f8fafc 0% 50%) 0 0 / 20px 20px; border: 1px solid #eef2f7; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: auto; }

.layer { position: relative; display: flex; align-items: center; justify-content: center; transition: padding 0.28s cubic-bezier(0.4,0,0.2,1), border-width 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1), height 0.28s cubic-bezier(0.4,0,0.2,1); }

.margin-layer { background: rgba(249, 115, 22, 0.28); border-radius: 6px; }
.border-layer { background: rgba(234, 179, 8, 0.35); border-style: solid; border-color: #eab308; border-radius: 4px; transition: padding 0.28s cubic-bezier(0.4,0,0.2,1), border-width 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1), height 0.28s cubic-bezier(0.4,0,0.2,1); }
.padding-layer { background: rgba(34, 197, 94, 0.32); border-radius: 3px; }
.content-box { background: #6366f1; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; border-radius: 3px; transition: width 0.28s cubic-bezier(0.4,0,0.2,1), height 0.28s cubic-bezier(0.4,0,0.2,1); }

.layer-tag { position: absolute; top: 2px; left: 4px; font-size: 8.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; padding: 1px 5px; border-radius: 4px; color: #fff; opacity: 0.9; pointer-events: none; }
.margin-tag { background: #f97316; }
.border-tag { background: #eab308; color: #422006; }
.padding-tag { background: #22c55e; }

.val { position: absolute; font-size: 9.5px; font-weight: 700; color: #1e293b; background: rgba(255,255,255,0.85); padding: 0 4px; border-radius: 3px; pointer-events: none; }
.val-top { top: 2px; left: 50%; transform: translateX(-50%); }
.val-bottom { bottom: 2px; left: 50%; transform: translateX(-50%); }
.val-left { left: 2px; top: 50%; transform: translateY(-50%); }
.val-right { right: 2px; top: 50%; transform: translateY(-50%); }

.total-readout { font-size: 12px; color: #64748b; font-family: ui-monospace, monospace; }
.total-readout strong { color: #0f172a; }

.controls { flex: 1 1 260px; display: flex; flex-direction: column; gap: 16px; }
.control-group { display: flex; flex-direction: column; gap: 6px; }
.group-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }

.segmented { display: flex; border: 1.5px solid #e2e8f0; border-radius: 9px; overflow: hidden; width: fit-content; }
.seg-btn { padding: 7px 12px; font-size: 12px; font-weight: 600; border: none; background: #fff; color: #64748b; cursor: pointer; transition: background 0.15s, color 0.15s; }
.seg-btn.active { background: #6366f1; color: #fff; }

.link-toggle { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #374151; font-weight: 500; cursor: pointer; }
.link-toggle input { accent-color: #6366f1; width: 15px; height: 15px; }

.sliders { display: flex; flex-direction: column; gap: 10px; max-height: 320px; overflow-y: auto; padding-right: 4px; }
.slider-group { border: 1px solid #f1f5f9; border-radius: 9px; padding: 8px 10px; }
.slider-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.slider-head span:first-child { font-size: 11.5px; font-weight: 700; color: #0f172a; }
.slider-head span:last-child { font-size: 11px; font-weight: 700; color: #6366f1; font-family: ui-monospace, monospace; }
.side-rows { display: flex; flex-direction: column; gap: 5px; }
.side-row { display: flex; align-items: center; gap: 6px; }
.side-row label { font-size: 9.5px; color: #94a3b8; width: 34px; flex-shrink: 0; text-transform: uppercase; font-weight: 700; }
.side-row input[type="range"] { flex: 1; accent-color: #6366f1; }
.side-row .side-val { font-size: 10.5px; color: #64748b; width: 30px; text-align: right; font-family: ui-monospace, monospace; }`,
  js: `const SIDES = ['top', 'right', 'bottom', 'left'];
const state = {
  padding: { top: 16, right: 16, bottom: 16, left: 16 },
  border: { top: 4, right: 4, bottom: 4, left: 4 },
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  sizing: 'content-box',
  linked: true,
};
const CONTENT_W = 200;
const CONTENT_H = 100;

function buildSliders() {
  const wrap = document.getElementById('sliders');
  wrap.innerHTML = '';
  const groups = [
    { key: 'padding', label: 'Padding', max: 40, color: '#22c55e' },
    { key: 'border', label: 'Border width', max: 16, color: '#eab308' },
    { key: 'margin', label: 'Margin', max: 48, color: '#f97316' },
  ];
  groups.forEach(g => {
    const groupEl = document.createElement('div');
    groupEl.className = 'slider-group';
    const head = document.createElement('div');
    head.className = 'slider-head';
    head.innerHTML = '<span>' + g.label + '</span><span id="sum-' + g.key + '"></span>';
    groupEl.appendChild(head);
    const rows = document.createElement('div');
    rows.className = 'side-rows';
    SIDES.forEach(side => {
      const row = document.createElement('div');
      row.className = 'side-row';
      const id = g.key + '-' + side;
      row.innerHTML = '<label>' + side + '</label><input type="range" min="0" max="' + g.max + '" value="' + state[g.key][side] + '" id="' + id + '" /><span class="side-val" id="' + id + '-val">' + state[g.key][side] + 'px</span>';
      rows.appendChild(row);
      groupEl.appendChild(rows);
    });
    wrap.appendChild(groupEl);
  });

  groups.forEach(g => {
    SIDES.forEach(side => {
      const input = document.getElementById(g.key + '-' + side);
      input.addEventListener('input', () => onSlide(g.key, side, Number(input.value)));
    });
  });
}

function onSlide(key, side, value) {
  if (state.linked) {
    SIDES.forEach(s => { state[key][s] = value; });
    SIDES.forEach(s => {
      const input = document.getElementById(key + '-' + s);
      const label = document.getElementById(key + '-' + s + '-val');
      if (input) input.value = value;
      if (label) label.textContent = value + 'px';
    });
  } else {
    state[key][side] = value;
    document.getElementById(key + '-' + side + '-val').textContent = value + 'px';
  }
  render();
}

function render() {
  const margin = document.getElementById('margin-layer');
  const border = document.getElementById('border-layer');
  const padding = document.getElementById('padding-layer');
  const content = document.getElementById('content-box');

  margin.style.padding = state.margin.top + 'px ' + state.margin.right + 'px ' + state.margin.bottom + 'px ' + state.margin.left + 'px';
  border.style.borderWidth = state.border.top + 'px ' + state.border.right + 'px ' + state.border.bottom + 'px ' + state.border.left + 'px';
  padding.style.padding = state.padding.top + 'px ' + state.padding.right + 'px ' + state.padding.bottom + 'px ' + state.padding.left + 'px';

  let contentW = CONTENT_W;
  let contentH = CONTENT_H;
  if (state.sizing === 'border-box') {
    const horizExtra = state.padding.left + state.padding.right + state.border.left + state.border.right;
    const vertExtra = state.padding.top + state.padding.bottom + state.border.top + state.border.bottom;
    contentW = Math.max(20, CONTENT_W - horizExtra);
    contentH = Math.max(20, CONTENT_H - vertExtra);
  }
  content.style.width = contentW + 'px';
  content.style.height = contentH + 'px';
  document.getElementById('content-dims').textContent = Math.round(contentW) + ' x ' + Math.round(contentH);

  SIDES.forEach(side => {
    document.getElementById('val-margin-' + side).textContent = state.margin[side];
    document.getElementById('val-border-' + side).textContent = state.border[side];
    document.getElementById('val-padding-' + side).textContent = state.padding[side];
  });

  ['padding', 'border', 'margin'].forEach(key => {
    const sumEl = document.getElementById('sum-' + key);
    if (sumEl) {
      const allSame = SIDES.every(s => state[key][s] === state[key][SIDES[0]]);
      sumEl.textContent = allSame ? state[key][SIDES[0]] + 'px' : SIDES.map(s => state[key][s]).join('/') + 'px';
    }
  });

  const renderedW = state.sizing === 'border-box'
    ? CONTENT_W
    : CONTENT_W + state.padding.left + state.padding.right + state.border.left + state.border.right;
  const renderedH = state.sizing === 'border-box'
    ? CONTENT_H
    : CONTENT_H + state.padding.top + state.padding.bottom + state.border.top + state.border.bottom;
  document.getElementById('total-readout').textContent = renderedW + 'px × ' + renderedH + 'px (width set to ' + CONTENT_W + 'px, box-sizing: ' + state.sizing + ')';
}

document.getElementById('sizing-toggle').addEventListener('click', e => {
  const btn = e.target.closest('.seg-btn');
  if (!btn) return;
  state.sizing = btn.dataset.sizing;
  document.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b === btn));
  render();
});

document.getElementById('link-check').addEventListener('change', e => {
  state.linked = e.target.checked;
});

buildSliders();
render();`,
  seo: {
    title: 'CSS Box Model Inspector — Free HTML CSS JS Snippet',
    description: 'Animated, color-coded content/padding/border/margin layers with per-side sliders and a content-box vs border-box toggle. Exports to React, Vue & Tailwind.',
    about: {
      title: 'CSS Box Model Inspector — Animated Content, Padding, Border & Margin Layers with box-sizing Comparison in Vanilla JS',
      description: `The CSS box model is one of those things every developer technically knows and regularly gets wrong anyway, usually because the effect of a padding or border change on the element's final rendered size is invisible until you actually measure it in DevTools. This snippet turns the box model into something you manipulate directly: four nested, color-coded layers — content, padding, border, margin — each with independent per-side sliders, animated transitions between values, and a live toggle between \`box-sizing: content-box\` and \`border-box\` so the single most common source of layout bugs becomes something you can watch happen instead of something you have to remember.

**Structure: nested divs mirror the spec's own model**

The DOM is four literally nested \`<div>\` elements — \`.margin-layer\` wraps \`.border-layer\` wraps \`.padding-layer\` wraps \`.content-box\` — which mirrors how the CSS spec itself describes the box model as a set of concentric edges (margin edge, border edge, padding edge, content edge) around a single element. Rather than drawing four separate rectangles with manual math, each "layer" is simply the previous layer's padding: the orange margin layer uses its own CSS \`padding\` property to create visible space before the yellow border layer begins, the yellow layer uses \`border-width\` to create the border band, and the green padding layer uses \`padding\` again before the indigo content box. This means the browser's own layout engine is doing all the geometry — the script only ever sets \`style.padding\` and \`style.borderWidth\` in pixels per side, and CSS lays out the rest.

**The color convention is deliberately borrowed from DevTools**

Content renders indigo/blue, padding green, border gold/yellow, margin orange — the same four-color convention Chrome, Firefox, and Safari all use in their built-in box-model inspector overlays. This is not arbitrary; matching the browser's own convention means the mental model you build here transfers directly the next time you open DevTools and hover an element, instead of teaching you a second color scheme to translate from.

**Per-side sliders and the "link sides" toggle**

Each of the three groups (padding, border, margin) renders four range inputs, one per side (\`top\`, \`right\`, \`bottom\`, \`left\`), built programmatically in \`buildSliders()\` rather than hand-written four times over — a single \`groups\` array drives the DOM generation, so extending the max range or adding a fourth group needs one array edit, not four copy-pasted blocks. A "link sides" checkbox controls whether dragging one slider updates all four sides of that layer at once (the common case, uniform spacing) or just the one side you touched (for exploring asymmetric layouts, like a card with extra top padding). The linked/unlinked logic lives entirely in \`onSlide()\`, which either broadcasts the new value to all four \`SIDES\` or writes to a single one, then calls \`render()\`.

**Why the layers visibly animate instead of snapping**

Every layer's CSS declares \`transition: padding 0.28s, border-width 0.28s, width 0.28s, height 0.28s\` with a \`cubic-bezier(0.4,0,0.2,1)\` ease — the same "standard" easing curve Material Design uses for size changes. Because \`padding\` and \`border-width\` are both natively animatable CSS properties, dragging a slider doesn't need a JavaScript animation loop at all: the script just writes the new pixel value to \`style.padding\` on every \`input\` event, and the browser's compositor interpolates the visual change smoothly between the old and new value. This is a deliberate choice over animating with \`requestAnimationFrame\` — CSS transitions here are simpler, smoother, and free of frame-timing bugs, because the property itself is what's changing, not an unrelated transform standing in for it.

**box-sizing: content-box vs border-box, made visibly concrete**

This is the part that actually resolves real confusion. The content box has a fixed base size (\`CONTENT_W = 200\`, \`CONTENT_H = 100\`) representing a CSS \`width\`/\`height\` declaration. In \`content-box\` mode (the CSS default), that 200px \`width\` describes the content area only — padding and border are added on top, so the total rendered footprint grows every time you increase padding or border. In \`border-box\` mode, the exact same 200px \`width\` is reinterpreted as the *total* footprint including padding and border, so \`render()\` subtracts the current padding and border from 200 to compute the shrunken content box width (clamped to a 20px floor so it never inverts). Toggling the segmented control replays both interpretations against the identical padding/border values you've already dialed in, and the "Rendered total" readout below the stage prints the actual final footprint in both modes — the exact number a real layout bug report would hinge on.

**Live pixel labels instead of a separate readout panel**

Each layer overlays four small absolutely-positioned \`.val\` spans, one per side, showing that side's current pixel value directly on the layer itself (top value at the top edge, left value at the left edge, and so on) rather than in a separate legend the user has to cross-reference. This keeps the spatial relationship between "this number" and "this visible band of color" immediate, which matters because the entire point of the component is connecting a slider value to where it physically shows up on screen.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Drag any padding, border, or margin slider', text: 'The matching colored layer (green padding, gold border, orange margin) animates smoothly to its new thickness, and the pixel label on that edge updates in real time.' },
      { title: 'Uncheck "Apply uniformly to all sides"', text: 'Now each of the four sliders in a group (top/right/bottom/left) controls only that one side, letting you build asymmetric spacing like extra top padding on a card header.' },
      { title: 'Watch the indigo content box and the "Rendered total" readout', text: 'The content box stays a fixed 200x100px in content-box mode while the overall footprint grows as you add padding or border — the readout below the stage prints the exact final width and height.' },
      { title: 'Click the border-box segment in the box-sizing toggle', text: 'With the same padding and border values still applied, the content box itself now visibly shrinks so the total footprint holds steady at 200px wide — the core content-box vs border-box distinction, side by side.' },
      { title: 'Toggle box-sizing back and forth without changing any slider', text: 'This isolates the box-sizing effect from any padding/border change, making it unambiguous that the same CSS width value produces two different rendered sizes purely based on this one property.' },
      { title: 'Push padding or border to their maximum values', text: 'In border-box mode the content box shrinks toward its 20px floor and stops changing, demonstrating the real-world edge case where padding and border can consume the entire declared width.' },
    ]},
    features: [
      'Four literally nested divs (margin > border > padding > content) so the browser layout engine computes the real geometry, not hand-rolled math',
      'DevTools-matching color convention: blue/indigo content, green padding, gold border, orange margin',
      'Independent per-side sliders (top/right/bottom/left) for padding, border-width, and margin, built from one data-driven array',
      '"Link sides" toggle switches between uniform four-side updates and fully independent per-side control',
      'CSS transitions (not a JS animation loop) drive smooth layer resizing on every slider input',
      'Live box-sizing: content-box vs border-box toggle recomputes and animates the content box\'s actual size',
      'Rendered-total readout prints the true final footprint in pixels for the current box-sizing mode',
      'Absolutely-positioned per-side pixel labels overlay each layer directly at the edge they describe',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching the CSS box model in a course or workshop', desc: 'Let students drag padding, border, and margin independently and watch the DevTools-matching color layers respond, then flip box-sizing to make the single most common layout bug — width doesn\'t behave the way you expected — concrete instead of theoretical.' },
      { icon: 'CODE', title: 'Debugging an unexpected element size in a real layout', desc: 'Recreate a problem element\'s padding, border, and width here to quickly test whether switching box-sizing (or adjusting one side\'s padding) produces the footprint you actually want, before touching production CSS.' },
      { icon: 'DESIGN', title: 'Onboarding new frontend developers', desc: 'Pair with the [CSS tooltip](/ui-snippets/css-tooltip) and [CSS animated border](/ui-snippets/css-animated-border) snippets as part of a "CSS fundamentals" onboarding sequence — box model, positioning, and animation basics in one interactive set instead of static documentation.' },
      { icon: 'WEB', title: 'Blog post or documentation embed on box-sizing', desc: 'Embed directly in an article explaining content-box versus border-box; readers can manipulate the exact scenario your prose describes instead of trusting a static diagram, which is the single most requested clarification on this topic.' },
      { icon: 'APP', title: 'Interview and assessment prep for CSS fundamentals', desc: 'Use as a self-check tool before a frontend interview: if the border-box toggle behavior still surprises you when you flip it, that is the box model gap worth reviewing before the interview, not after.' },
      { icon: 'CODE', title: 'Related: Event Bubbling Visualizer', desc: 'See the [Event Bubbling Visualizer](/ui-snippets/event-bubbling-visualizer/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Can I use this box model inspector in React, Vue, or Angular?', a: 'Yes. Move the padding/border/margin numbers into component state (useState in React, a reactive ref in Vue, or a component property in Angular) and bind each slider\'s value and input/change handler to update that state. Because the actual size change is a CSS transition on padding/border-width/width, not a requestAnimationFrame loop, there is no animation frame to clean up in useEffect/onUnmounted/ngOnDestroy — you only need to make sure your framework re-renders the inline styles (or CSS custom properties, if you switch to that pattern) whenever state changes. The box-sizing toggle is just a class or inline style bound to a boolean/string in state.' },
      { q: 'Why does the content box shrink instead of the whole element growing in border-box mode?', a: 'That is the entire point of border-box: the declared width (200px here) is redefined by the spec to mean the total rendered footprint including padding and border, rather than just the content area. Since the total must stay at 200px, the browser has no choice but to shrink the content area by however much padding and border you have added. This snippet\'s render() function performs that exact subtraction (CONTENT_W minus padding and border on each side) to mirror what the browser itself computes internally.' },
      { q: 'What happens if padding and border together exceed the declared width in border-box mode?', a: 'Browsers clamp the content box at a minimum size rather than letting it go negative; this snippet mirrors that with a 20px floor (Math.max(20, ...)) so the content box never inverts or disappears. In real layouts this is the scenario behind many "why is my button\'s text overflowing" bugs — heavy padding or a thick border silently eating almost all of a narrow declared width.' },
      { q: 'Why do margin, border, and padding use different visual mechanisms (padding vs border-width)?', a: 'Because that mirrors the real CSS properties involved: padding is genuinely implemented with the padding property on the margin and padding layer divs, and the border band is genuinely implemented with border-width and border-color on the border layer div. Nothing here is faked with manually-sized colored rectangles — every layer thickness you see is the literal CSS property applied to a literal nested element, so the behavior you learn transfers directly to writing real CSS.' },
      { q: 'How do I add corner-specific radius or a fifth "outline" layer?', a: 'Add an outline-layer div outside the margin layer (outlines are drawn outside the border box and, unlike margin, do not affect layout) with its own outline-width slider, plus an outline-offset slider if you want to demonstrate the gap between border and outline. Border-radius can be added as one more per-corner slider group following the exact same buildSliders() pattern used for padding, border, and margin.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to walk through exactly why render() only needs to subtract padding and border from 200px in border-box mode, and why margin never enters that calculation. It's also worth asking why CSS transitions were chosen over a requestAnimationFrame loop for the resizing animation. Good extensions to request: an outline layer outside margin, a corner-specific border-radius control, or a "measure" mode that overlays the exact numbers DevTools would report for the current state.`,
      prompt: `Build an interactive, animated CSS box model inspector in plain HTML, CSS, and JavaScript — no frameworks, no libraries.

Requirements:
- Four nested divs representing margin, border, padding, and content, color-coded to match the browser DevTools box-model convention (blue/indigo content, green padding, gold/yellow border, orange margin), with each outer layer using its own CSS padding or border-width property to create the visible space for the layer inside it (not hand-computed rectangle positions).
- Independent range-slider controls for each side (top/right/bottom/left) of padding, border-width, and margin, generated from a single data-driven array rather than duplicated markup, plus a "link sides" checkbox that switches between updating all four sides uniformly and updating only the one side being dragged.
- CSS transitions (not a JavaScript animation loop) on padding, border-width, width, and height so every slider change animates smoothly rather than snapping instantly.
- A segmented toggle between box-sizing: content-box and box-sizing: border-box that, using the same padding/border values already applied, recomputes and animates the content box's actual rendered size — shrinking it in border-box mode so the total footprint stays constant, growing the total footprint in content-box mode instead.
- A live readout showing the true final rendered width and height in pixels for the current box-sizing mode, plus small pixel-value labels overlaid directly on each layer at the edge they describe.
- Clamp the content box to a sensible minimum size in border-box mode so heavy padding/border values cannot invert or negative-size it.`,
    },
  },
};

export default cssBoxModelInspector;
