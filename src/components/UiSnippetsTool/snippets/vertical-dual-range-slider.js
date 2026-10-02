const verticalDualRangeSlider = {
  id: 'vertical-dual-range-slider',
  title: 'Vertical Dual-Handle Range Slider',
  lastmod: '2026-09-14',
  category: 'forms',
  html: `<div class="vdr-wrap">
  <div class="vdr-readout">
    <span id="vdrMax">78°</span>
    <span class="vdr-dash">—</span>
    <span id="vdrMin">62°</span>
  </div>
  <div class="vdr-track" id="vdrTrack">
    <div class="vdr-fill" id="vdrFill"></div>
    <div class="vdr-handle" id="vdrHandleMax" tabindex="0" role="slider" aria-label="Maximum temperature" aria-valuemin="50" aria-valuemax="90" aria-valuenow="78"></div>
    <div class="vdr-handle" id="vdrHandleMin" tabindex="0" role="slider" aria-label="Minimum temperature" aria-valuemin="50" aria-valuemax="90" aria-valuenow="62"></div>
  </div>
  <div class="vdr-scale"><span>90°</span><span>70°</span><span>50°</span></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vdr-wrap{display:flex;flex-direction:column;align-items:center;gap:14px}
.vdr-readout{font:800 15px system-ui,sans-serif;color:#1f2937;display:flex;align-items:center;gap:8px}
.vdr-dash{color:#c7cad4;font-weight:600}
.vdr-track{position:relative;width:8px;height:280px;border-radius:6px;background:#e5e7eb}
.vdr-fill{position:absolute;left:0;right:0;border-radius:6px;background:linear-gradient(180deg,#f59e0b,#6366f1)}
.vdr-handle{position:absolute;left:50%;width:24px;height:24px;border-radius:50%;background:#fff;border:3px solid #6366f1;box-shadow:0 2px 8px rgba(15,23,42,.22);transform:translate(-50%,50%);cursor:grab;touch-action:none}
.vdr-handle:active{cursor:grabbing}
.vdr-handle:focus-visible{outline:2px solid #6366f1;outline-offset:3px}
.vdr-scale{position:absolute;display:flex;flex-direction:column;justify-content:space-between;height:280px;margin-left:26px;font:600 10.5px system-ui,sans-serif;color:#9ca3af}
.vdr-wrap{position:relative}`,

  js: `var track = document.getElementById('vdrTrack');
var fill = document.getElementById('vdrFill');
var handleMax = document.getElementById('vdrHandleMax');
var handleMin = document.getElementById('vdrHandleMin');
var readoutMax = document.getElementById('vdrMax');
var readoutMin = document.getElementById('vdrMin');

var MIN = 50, MAX = 90;
var valMax = 78, valMin = 62;

function pctFromVal(v) { return (v - MIN) / (MAX - MIN); }

function render() {
  var pMax = pctFromVal(valMax);
  var pMin = pctFromVal(valMin);
  // Track's bottom = MIN, top = MAX. "bottom" CSS offset from track's own bottom edge.
  handleMax.style.bottom = (pMax * 100) + '%';
  handleMin.style.bottom = (pMin * 100) + '%';
  fill.style.bottom = (pMin * 100) + '%';
  fill.style.top = ((1 - pMax) * 100) + '%';
  readoutMax.textContent = valMax + '°';
  readoutMin.textContent = valMin + '°';
  handleMax.setAttribute('aria-valuenow', valMax);
  handleMin.setAttribute('aria-valuenow', valMin);
}

function valFromClientY(clientY) {
  var rect = track.getBoundingClientRect();
  var y = Math.max(0, Math.min(rect.height, clientY - rect.top));
  var pct = 1 - y / rect.height;
  return Math.round(MIN + pct * (MAX - MIN));
}

var activeHandle = null;

function startDrag(handle) {
  return function (e) {
    activeHandle = handle;
    e.preventDefault();
  };
}

function onMove(e) {
  if (!activeHandle) return;
  var clientY = e.touches ? e.touches[0].clientY : e.clientY;
  var v = valFromClientY(clientY);
  if (activeHandle === handleMax) { valMax = Math.max(valMin + 1, Math.min(MAX, v)); }
  else { valMin = Math.min(valMax - 1, Math.max(MIN, v)); }
  render();
}

function endDrag() { activeHandle = null; }

handleMax.addEventListener('pointerdown', startDrag(handleMax));
handleMin.addEventListener('pointerdown', startDrag(handleMin));
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', endDrag);
handleMax.addEventListener('touchstart', startDrag(handleMax), { passive: false });
handleMin.addEventListener('touchstart', startDrag(handleMin), { passive: false });
window.addEventListener('touchmove', onMove, { passive: true });
window.addEventListener('touchend', endDrag);

function keyHandler(isMax) {
  return function (e) {
    var step = e.shiftKey ? 5 : 1;
    if (e.key === 'ArrowUp') { if (isMax) valMax = Math.min(MAX, valMax + step); else valMin = Math.min(valMax - 1, valMin + step); render(); e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (isMax) valMax = Math.max(valMin + 1, valMax - step); else valMin = Math.max(MIN, valMin - step); render(); e.preventDefault(); }
  };
}
handleMax.addEventListener('keydown', keyHandler(true));
handleMin.addEventListener('keydown', keyHandler(false));

render();`,

  seo: {
    title: 'Vertical Dual-Handle Range Slider — HTML CSS JS Snippet',
    description: 'A vertical range slider with two independent handles — set a min and max temperature (or any range) on a track that reads bottom-to-top, with a gradient fill, drag, touch and keyboard support. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Vertical Dual-Handle Range Slider — Two Handles, Bottom-to-Top, Never Crossing',
      description: `Most range sliders run horizontally. This one runs vertically — the natural orientation for a thermostat, an equalizer band, or a volume-style range — with *two* independent handles instead of one, each holding its own value, and a fill bar that only ever spans the segment between them.\n\n**Position measured from the bottom, not the top**\n\nBecause a vertical track visually reads bottom = low, top = high (the opposite of how a horizontal track reads left = low), every calculation here works in terms of \`bottom\` offsets rather than \`top\`. Converting a pointer's \`clientY\` into a value inverts the fraction: \`pct = 1 - y / rect.height\`, so a cursor near the top of the track produces a *high* percentage, matching the visual expectation.\n\n**Handles that physically cannot swap positions**\n\nDragging the "max" handle clamps it with \`Math.max(valMin + 1, ...)\` — it can never be dragged below the min handle's value plus one whole degree — and dragging the "min" handle clamps the opposite way against the max handle. That mutual clamp is what makes the two handles behave like a genuine range rather than two independent sliders that happen to share a track: they can slide arbitrarily close together, but never cross or overlap in value.\n\n**One fill bar spanning exactly the selected range**\n\nThe fill element's \`top\` and \`bottom\` offsets are both recalculated from the two handle percentages on every render — so the colored segment always represents precisely "everything between min and max," growing or shrinking as either handle moves, never needing to be manually kept in sync.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A vertical track appears with two handles set to 62° and 78°, and a gradient fill between them.' },
        { title: 'Drag either handle', text: 'It moves along the track and clamps against the other handle — they can\'t cross past each other.' },
        { title: 'Watch the readout', text: 'The numbers above the track update live as you drag either handle.' },
        { title: 'Use the keyboard', text: 'Focus a handle and press Up/Down to adjust by 1°, or hold Shift for 5° steps.' },
        { title: 'Adjust the range', text: 'Change the MIN/MAX constants in the JS to fit a different scale entirely.' },
      ],
    },
    features: [
      'Two fully independent handles that mutually clamp — they can approach but never cross each other',
      'Vertical orientation with position math inverted correctly (top of track = high value)',
      'A single fill bar recalculated every render to span exactly the current min-to-max segment',
      'Live numeric readout above the track, updating as either handle is dragged',
      'Full keyboard support per handle — Up/Down for fine steps, Shift+Up/Down for coarse 5-unit steps',
      'Unified pointer and touch dragging, with touch-action: none preventing scroll interference',
    ],
    useCases: [
      { icon: '🌡️', title: 'Thermostat range settings', desc: 'Set a minimum and maximum temperature on a vertical track that reads bottom to top, with two handles that can approach but never cross.' },
      { icon: '🎚️', title: 'Equalizer and level controls', desc: 'Build vertical dual-handle bands for audio, with position maths inverted so the top of the track is the high value.' },
      { icon: '📊', title: 'Dashboard threshold ranges', desc: 'Set acceptable minimum and maximum limits, with a single fill bar recalculated on every render to span exactly the chosen range.' },
      { icon: '💰', title: 'Sidebar range filters', desc: 'Offer a vertical price or capacity filter, with a live numeric readout above the track as either handle moves.' },
    ],
    faqs: [
      { q: 'How do I change the value range?', a: 'Change the MIN and MAX constants (and update the aria-valuemin/max attributes and the visible scale labels to match) — all position math derives from these two numbers.' },
      { q: 'Why can\'t the two handles cross each other?', a: 'Each handle\'s drag/keyboard update clamps against the other handle\'s current value plus or minus one unit — this is deliberate, since a "range" where min exceeds max has no meaningful interpretation for most real use cases like temperature or price ranges.' },
      { q: 'How do I make it horizontal instead?', a: 'Swap bottom/top for left/right throughout the CSS and JS, and change the position calculation from clientY/rect.height to clientX/rect.width without inverting the percentage (left = low is already the natural horizontal reading).' },
      { q: 'Can I read both selected values in my own code?', a: 'Yes — valMax and valMin are plain JavaScript variables updated on every interaction; hook a callback or custom event dispatch inside render() to react to changes in a real application.' },
      { q: 'Is it accessible?', a: 'Both handles carry role="slider" with proper aria-valuemin/max/now and a descriptive aria-label, and are independently focusable and operable via Up/Down (and Shift+Up/Down for larger steps) without a mouse.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the pointer-to-value conversion inverts the percentage (1 - y / rect.height) for this vertical slider specifically, and what would visually break if that inversion were removed. It's also worth asking the assistant to add draggable numeric labels next to each handle that can be typed into directly, or to add a third "target" marker on the track (e.g. an ideal temperature) that stays independent of the draggable min/max handles.`,
      prompt: `Build a vertical dual-handle range slider in plain HTML, CSS, and vanilla JavaScript with two independently draggable handles on a vertical track that can never cross each other — no library.

Requirements:
- A vertical track element with two separate handle elements (a minimum and a maximum), each capable of being dragged along the track independently, plus a visible fill segment that spans exactly the space between the two handles' current positions.
- All position and value calculations must correctly account for the vertical orientation reading bottom-to-top (the bottom of the track represents the minimum value, the top represents the maximum), converting a pointer's vertical screen coordinate into a value using an inverted percentage calculation appropriate for that orientation.
- The maximum handle must be prevented from ever being dragged to a value at or below the minimum handle's current value, and the minimum handle must be prevented from ever exceeding the maximum handle's current value — enforced live during dragging, not only on release.
- Dragging must work via pointer events with a touch event fallback, and the drag must not trigger native page scrolling on touch devices while active.
- A live numeric readout displaying both the current minimum and maximum values, updating in real time as either handle moves.
- Keyboard support: each handle must be independently focusable and respond to Up/Down arrow keys to adjust its value by a small step (respecting the same never-cross constraint as dragging), with a modifier key (e.g. Shift) producing a larger step size.
- Both handles must carry correct ARIA slider role and value attributes reflecting their current state.`,
    },
  },
};

export default verticalDualRangeSlider;
