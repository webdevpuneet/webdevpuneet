const flexGrowShrinkDistributionVisualizer = {
  id: 'flex-grow-shrink-distribution-visualizer',
  title: 'Flex Grow and Shrink Space Distribution Visualizer',
  lastmod: '2026-09-25',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="fx">
  <div class="fx-top">
    <h2>Where does the space go? flex-grow vs flex-shrink</h2>
    <p>The math below is calculated by hand and checked against the browser's real layout of the same flex container.</p>
  </div>
  <label class="fx-width">Container width <input type="range" id="fxW" min="200" max="760" value="620"><output id="fxWOut"></output></label>
  <div class="fx-items" id="fxItems"></div>
  <div class="fx-stage">
    <div class="fx-label">Your math</div>
    <div class="fx-calc" id="fxCalc"></div>
    <div class="fx-label">The browser</div>
    <div class="fx-real" id="fxReal"></div>
  </div>
  <div class="fx-explain" id="fxExplain" aria-live="polite"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;color:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.fx{width:100%;max-width:820px}
.fx h2{font-size:18px}
.fx-top p{font-size:12.5px;color:#64748b;margin-top:4px}
.fx-width{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;margin-top:14px}
.fx-width input{flex:1;accent-color:#0ea5e9}
.fx-width output{font-variant-numeric:tabular-nums;width:52px}
.fx-items{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
@media (max-width:640px){.fx-items{grid-template-columns:1fr}}
.fx-item{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px;font-size:12px}
.fx-item b{display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:6px}
.fx-item b i{width:12px;height:12px;border-radius:4px}
.fx-item label{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:5px;color:#475569}
.fx-item input{width:64px;border:1px solid #cbd5e1;border-radius:7px;padding:4px 6px;font:600 12px ui-monospace,monospace}
.fx-stage{margin-top:14px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px}
.fx-label{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin:4px 0}
/* outline, not border: a border would sit inside the border-box width and
   steal 2px from the space being distributed, so the check would fail. */
.fx-calc,.fx-real{position:relative;height:46px;background:repeating-linear-gradient(90deg,#f1f5f9 0 1px,transparent 1px 20px);outline:1px dashed #94a3b8;border-radius:8px;margin-bottom:8px}
.fx-calc span{position:absolute;top:4px;bottom:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;font:700 11px ui-monospace,monospace;color:#fff;overflow:hidden;white-space:nowrap}
/* The real flex container. min-width:0 disables the automatic minimum
   (min-content) so the browser uses the same pure formula as the math. */
.fx-real{display:flex;gap:0;overflow:hidden}
.fx-real div{min-width:0;border-radius:6px;margin:4px 0;display:flex;align-items:center;justify-content:center;font:700 11px ui-monospace,monospace;color:#fff;overflow:hidden;white-space:nowrap}
.fx-explain{margin-top:12px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;font-size:13px;line-height:1.65}
.fx-explain code{font:600 12px ui-monospace,monospace;background:#f1f5f9;padding:1px 5px;border-radius:4px}
.fx-explain .ok{color:#16a34a;font-weight:700}.fx-explain .bad{color:#dc2626;font-weight:700}`,

  js: `var items = [
  { name: 'A', basis: 200, grow: 1, shrink: 1, color: '#0ea5e9' },
  { name: 'B', basis: 150, grow: 2, shrink: 1, color: '#8b5cf6' },
  { name: 'C', basis: 100, grow: 0, shrink: 4, color: '#f97316' },
];

function renderInputs() {
  document.getElementById('fxItems').innerHTML = items.map(function (it, i) {
    return '<div class="fx-item"><b><i style="background:' + it.color + '"></i>Item ' + it.name + '</b>' +
      ['basis', 'grow', 'shrink'].map(function (k) {
        return '<label>flex-' + k + ' <input type="number" min="0" step="' + (k === 'basis' ? 10 : 1) + '" value="' + it[k] + '" data-i="' + i + '" data-k="' + k + '"></label>';
      }).join('') + '</div>';
  }).join('');
}

// The flexible-length resolution algorithm from the CSS Flexbox spec (9.7),
// with min sizes of 0 and no max sizes. Items that would go below 0 are
// frozen at 0 and the remaining space is shared again among the others.
function resolve(width) {
  var sizes = items.map(function (it) { return it.basis; });
  var frozen = items.map(function () { return false; });
  var growing = width - sizes.reduce(function (a, b) { return a + b; }, 0) >= 0;
  var steps = [];
  for (var round = 0; round < items.length; round++) {
    var used = 0;
    items.forEach(function (it, i) { used += frozen[i] ? sizes[i] : it.basis; });
    var free = width - used;
    var active = items.map(function (_, i) { return i; }).filter(function (i) { return !frozen[i]; });
    if (!active.length) break;
    if (growing) {
      var sumGrow = active.reduce(function (s, i) { return s + items[i].grow; }, 0);
      // If the grow factors add up to less than 1, only that fraction of
      // the free space is handed out.
      var share = sumGrow < 1 ? free * sumGrow : free;
      active.forEach(function (i) { sizes[i] = items[i].basis + (sumGrow ? share * items[i].grow / sumGrow : 0); });
      steps.push({ free: free, sum: sumGrow, grow: true });
      break;
    }
    // Shrinking is weighted by shrink × basis, not by shrink alone: big
    // items give up more space than small ones with the same factor.
    var sumScaled = active.reduce(function (s, i) { return s + items[i].shrink * items[i].basis; }, 0);
    var sumShrink = active.reduce(function (s, i) { return s + items[i].shrink; }, 0);
    var take = sumShrink < 1 ? free * sumShrink : free;
    var violated = false;
    active.forEach(function (i) {
      var target = items[i].basis + (sumScaled ? take * (items[i].shrink * items[i].basis) / sumScaled : 0);
      sizes[i] = target;
      if (target < 0) violated = true;
    });
    steps.push({ free: free, sum: sumScaled, grow: false });
    if (!violated) break;
    active.forEach(function (i) { if (sizes[i] < 0) { sizes[i] = 0; frozen[i] = true; } });
  }
  return { sizes: sizes, growing: growing, steps: steps, frozen: frozen };
}

function draw() {
  var width = Number(document.getElementById('fxW').value);
  document.getElementById('fxWOut').textContent = width + 'px';
  var calc = document.getElementById('fxCalc');
  var real = document.getElementById('fxReal');
  calc.style.width = width + 'px';
  real.style.width = width + 'px';
  var r = resolve(width);

  var x = 0;
  calc.innerHTML = items.map(function (it, i) {
    var w = r.sizes[i];
    var html = '<span style="left:' + x + 'px;width:' + Math.max(0, w) + 'px;background:' + it.color + '">' + it.name + ' ' + w.toFixed(1) + '</span>';
    x += w;
    return html;
  }).join('');

  real.innerHTML = items.map(function (it) {
    return '<div style="flex:' + it.grow + ' ' + it.shrink + ' ' + it.basis + 'px;background:' + it.color + '">' + it.name + '</div>';
  }).join('');

  // Measure the browser's own result and compare.
  var measured = Array.prototype.map.call(real.children, function (el) { return el.getBoundingClientRect().width; });
  var match = measured.every(function (m, i) { return Math.abs(m - r.sizes[i]) < 0.6; });

  var s = r.steps[r.steps.length - 1];
  var basisSum = items.reduce(function (a, it) { return a + it.basis; }, 0);
  var h = 'Bases add up to <code>' + basisSum + 'px</code> in a <code>' + width + 'px</code> container, so there is <b>' +
    (r.growing ? (width - basisSum) + 'px of free space to share out</b> using <code>flex-grow</code>.' : Math.abs(width - basisSum) + 'px too much content to remove</b> using <code>flex-shrink</code>.') + '<br>';
  if (r.growing) {
    h += items.map(function (it) { return it.name + ': ' + it.basis + ' + ' + s.free + ' × ' + it.grow + '/' + s.sum + ' = <b>' + r.sizes[items.indexOf(it)].toFixed(1) + '</b>'; }).join(' · ');
  } else {
    h += 'Each item shrinks in proportion to <code>shrink × basis</code> (total ' + s.sum + '): ' +
      items.map(function (it, i) { return it.name + ' weight ' + it.shrink + '×' + it.basis + ' → <b>' + r.sizes[i].toFixed(1) + '</b>' + (r.frozen[i] ? ' (clamped at 0, space re-shared)' : ''); }).join(' · ');
  }
  h += '<br>Browser measured: ' + measured.map(function (m, i) { return items[i].name + ' ' + m.toFixed(1); }).join(', ') +
    ' — <span class="' + (match ? 'ok">matches the math ✓' : 'bad">differs') + '</span>';
  document.getElementById('fxExplain').innerHTML = h;
}

document.getElementById('fxItems').addEventListener('input', function (e) {
  var i = e.target.dataset.i, k = e.target.dataset.k;
  if (i === undefined) return;
  var v = Math.max(0, Number(e.target.value) || 0);
  items[i][k] = v;
  draw();
});
document.getElementById('fxW').addEventListener('input', draw);
renderInputs();
draw();`,

  seo: {
    title: 'Flex Grow and Shrink Visualizer — See How Flexbox Distributes Space',
    description: `Change flex-basis, flex-grow, flex-shrink and container width and see the exact space distribution worked out step by step, next to the browser's real layout of the same flex items, with a live check that the two match. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Flexbox Space Distribution — The Math Behind flex-grow and flex-shrink',
      description: `Most people learn that flex-grow: 2 means "gets twice as much". That's only half true, and flex-shrink works differently again, which is why flex layouts sometimes do surprising things. This visualizer calculates the distribution by hand, following the algorithm in the CSS Flexbox specification, and renders a real flex container next to it so you can check the math against the browser.

**Start from the bases**

Every item starts at its \`flex-basis\`. Adding them up and comparing with the container width gives either positive free space (the container is bigger) or negative free space (the content overflows).

**Growing: split the leftover space**

With positive free space, each item gets a share proportional to its \`flex-grow\`: \`basis + free × grow / Σgrow\`. So flex-grow: 2 means twice the share of the *extra* space, not twice the size. An item with grow 0 keeps its basis. If the grow factors add up to less than 1, only that fraction of the free space is handed out.

**Shrinking: weighted by size**

With negative free space, the reduction is shared in proportion to \`flex-shrink × flex-basis\`, not flex-shrink alone. A 400px item with shrink 1 gives up twice as much as a 200px item with shrink 1. This rule prevents small items from collapsing to nothing before large ones have shrunk at all.

**Freezing and re-sharing**

If the calculation pushes an item below zero, the spec freezes it at its minimum and runs the distribution again among the remaining items. Try a high flex-shrink on a small item in a narrow container to see an item clamped and the others adjusted.

**Why min-width: 0**

Real flex items default to \`min-width: auto\`, which stops them shrinking below their content. The demo sets \`min-width: 0\` on the real items so the browser uses the same pure formula as the math. In your own layouts, that default is often why an item refuses to shrink.

**Checked against the browser**

The browser's measured widths are printed under the explanation with a match indicator.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Drag the container width', text: `Switch between growing and shrinking by making it larger or smaller than the bases.` },
      { title: 'Edit each item', text: `Change flex-basis, flex-grow and flex-shrink.` },
      { title: 'Read the math', text: `The explanation shows the formula with your numbers.` },
      { title: 'Compare', text: `The real flex container below should match the calculated one.` },
      { title: 'Force a clamp', text: `Give a small item a large shrink in a narrow container.` },
    ] },
    features: [
      { title: 'Spec-based calculation', text: `Flexbox 9.7 resolution with freezing.` },
      { title: 'Grow formula shown', text: `basis + free × grow / Σgrow.` },
      { title: 'Shrink weighted by basis', text: `shrink × basis proportions.` },
      { title: 'Fractional factor rule', text: `Sums below 1 hand out part of the space.` },
      { title: 'Clamp and re-share', text: `Items frozen at 0 and space redistributed.` },
      { title: 'Real browser comparison', text: `A live flex container rendered beside the math.` },
      { title: 'Measured verification', text: `getBoundingClientRect widths checked.` },
      { title: 'No libraries', text: `Plain HTML, CSS and JavaScript.` },
    ],
    useCases: [
      { title: 'Learning flexbox properly', text: `Understand the numbers, not just the effect.` },
      { title: 'Debugging layouts', text: `Why a sidebar shrinks more than expected.` },
      { title: 'Design system work', text: `Choose sensible flex values for components.` },
      { title: 'Teaching CSS', text: `Demonstrate grow versus shrink live.` },
      { title: 'Interview preparation', text: `A common front-end question.` },
      { icon: 'CODE', title: 'Related: Flexbox Alignment Visualizer', desc: 'Alignment rather than sizing: [Flexbox Alignment Visualizer](/ui-snippets/flexbox-alignment-visualizer/).' },
      { icon: 'CODE', title: 'Related: CSS Grid Template Areas Visualizer', desc: 'The grid equivalent: [CSS Grid Template Areas Visualizer](/ui-snippets/css-grid-template-areas-visualizer/).' },
    ],
    faqs: [
      { q: 'How does flex-grow distribute space?', a: `The free space (container size minus the sum of flex-basis values) is divided in proportion to each item's flex-grow value and added to its basis. flex-grow: 2 gets twice the share of the extra space, not twice the final size.` },
      { q: 'How does flex-shrink work?', a: `When items overflow, the overflow is removed in proportion to flex-shrink multiplied by flex-basis. Larger items therefore shrink more than smaller items with the same flex-shrink value.` },
      { q: 'Why won’t my flex item shrink?', a: `Flex items default to min-width: auto, which prevents them from shrinking below their minimum content size. Set min-width: 0 (or overflow: hidden) on the item to allow it to shrink further.` },
      { q: 'What happens if flex-grow values add up to less than 1?', a: `Only that fraction of the free space is distributed. For example, two items with flex-grow 0.25 each receive half of the free space between them, and the rest stays empty.` },
      { q: 'What does flex: 1 mean?', a: `It is shorthand for flex-grow: 1, flex-shrink: 1 and flex-basis: 0%. With a zero basis, all space is free space, so items with flex: 1 end up equal in size regardless of content (subject to minimum sizes).` },
    ],
    aiPrompt: {
      paragraph: `Paste this visualizer into an AI assistant like Claude and ask it to explain, with your current numbers, why flex-shrink is weighted by flex-basis. Ask it to add max-width constraints (which also freeze items), min-width: auto behaviour using real text content, gaps between items, or a mode for flex-basis: 0 versus auto. It can also help debug a real layout by modelling your items here first.`,
      prompt: `Build a flexbox space distribution visualizer in plain HTML, CSS and JavaScript.

Requirements:
- A container width slider and three items, each with editable flex-basis, flex-grow and flex-shrink.
- Calculate each item's final width by hand following the CSS Flexbox flexible length algorithm with min sizes of 0: positive free space is shared by flex-grow (handing out only the fraction equal to the sum of grow factors if it is below 1); negative free space is removed in proportion to flex-shrink × flex-basis; items that would go below 0 are frozen at 0 and the remaining space is re-shared.
- Draw the calculated widths as positioned bars, and below them render a real flex container of the same width whose items use the same flex values with min-width: 0.
- Measure the real items with getBoundingClientRect and show whether they match the calculation.
- Explain the result in words with the actual numbers and formula used, including any clamped items.`,
    },
  },
};

export default flexGrowShrinkDistributionVisualizer;
