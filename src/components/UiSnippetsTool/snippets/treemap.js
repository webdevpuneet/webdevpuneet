const treemap = {
  id: 'treemap',
  title: 'Treemap',
  lastmod: '2026-11-10',
  category: 'charts',
  html: `<div class="tm-card">
  <div class="tm-head">
    <div class="tm-titles">
      <h3>Disk usage by folder</h3>
      <span class="tm-total" id="tmTotal"></span>
    </div>
    <div class="tm-seg" role="group" aria-label="Measure by">
      <button type="button" class="tm-seg-btn is-on" data-m="size" aria-pressed="true">Size</button>
      <button type="button" class="tm-seg-btn" data-m="files" aria-pressed="false">Files</button>
    </div>
  </div>
  <div class="tm-box" id="tmBox"></div>
  <div class="tm-detail" id="tmDetail" aria-live="polite"></div>
  <div class="tm-tip" id="tmTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#eef2f7;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
button{font:inherit;color:inherit;border:0;background:none;cursor:pointer}

.tm-card{position:relative;background:#fff;border-radius:18px;padding:20px;width:100%;max-width:480px;box-shadow:0 1px 2px rgba(15,23,42,.05),0 22px 48px rgba(15,23,42,.1)}
.tm-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.tm-titles h3{font-size:16px;font-weight:800;color:#0f172a;letter-spacing:-.01em}
.tm-total{display:block;font-size:12px;font-weight:700;color:#64748b;margin-top:2px;font-variant-numeric:tabular-nums}

.tm-seg{display:inline-flex;background:#f1f5f9;border-radius:999px;padding:3px;flex:none}
.tm-seg-btn{padding:5px 13px;border-radius:999px;font-size:12px;font-weight:700;color:#64748b;transition:background .2s,color .2s,box-shadow .2s}
.tm-seg-btn:hover{color:#0f172a}
.tm-seg-btn.is-on{background:#fff;color:#4338ca;box-shadow:0 1px 3px rgba(15,23,42,.15)}
.tm-seg-btn:focus-visible,.tm-cell:focus-visible{outline:2px solid #4338ca;outline-offset:2px}

.tm-box{position:relative;width:100%;height:288px}
.tm-cell{position:absolute;left:0;top:0;display:block;text-align:left;border-radius:9px}
.tm-box.morph .tm-cell{transition:transform .55s cubic-bezier(.2,.8,.2,1),width .55s cubic-bezier(.2,.8,.2,1),height .55s cubic-bezier(.2,.8,.2,1)}
.tm-fill{position:absolute;inset:2px;border-radius:8px;padding:9px 10px;overflow:hidden;display:flex;flex-direction:column;gap:2px;
  background-color:var(--c);background-image:linear-gradient(155deg,rgba(255,255,255,.26),rgba(255,255,255,0) 55%,rgba(0,0,0,.16));
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);
  transition:opacity .2s,transform .2s,box-shadow .2s;
  animation:tm-in .55s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i) * 60ms)}
.tm-box:hover .tm-cell:not(:hover) .tm-fill{opacity:.5}
.tm-cell:hover .tm-fill{transform:scale(1.025)}
.tm-cell.is-sel .tm-fill{box-shadow:inset 0 0 0 2.5px rgba(255,255,255,.95),0 6px 16px -4px var(--c)}
.tm-name,.tm-val{display:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tm-cell.is-labeled .tm-name,.tm-cell.is-labeled .tm-val{display:block}
.tm-name{font-size:12.5px;font-weight:800;color:#fff;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,.28)}
.tm-val{font-size:11px;font-weight:600;color:rgba(255,255,255,.88);font-variant-numeric:tabular-nums}

.tm-detail{display:flex;align-items:center;gap:12px;margin-top:14px;padding:11px 13px;background:#f8fafc;border-radius:12px;min-height:58px}
.tm-dot{width:12px;height:12px;border-radius:4px;background:var(--c);flex:none}
.tm-d-main{flex:1;min-width:0}
.tm-d-name{font-size:13px;font-weight:800;color:#0f172a;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tm-d-sub{font-size:12px;color:#64748b;font-variant-numeric:tabular-nums}
.tm-d-bar{height:5px;border-radius:99px;background:#e2e8f0;margin-top:6px;overflow:hidden}
.tm-d-bar i{display:block;height:100%;width:var(--w);background:var(--c);border-radius:99px;transition:width .5s cubic-bezier(.2,.8,.2,1)}
.tm-d-pct{font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-.02em;font-variant-numeric:tabular-nums;flex:none}

.tm-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:600;padding:6px 10px;border-radius:8px;transform:translate(-50%,-135%);white-space:nowrap;z-index:5;box-shadow:0 8px 20px rgba(15,23,42,.25)}
.tm-tip[hidden]{display:none}
.tm-tip b{font-weight:800}

@keyframes tm-in{from{opacity:0;transform:scale(.86)}to{opacity:1;transform:scale(1)}}
@media (prefers-reduced-motion:reduce){
  .tm-fill{animation:none}
  .tm-box.morph .tm-cell,.tm-d-bar i{transition:none}
}
@media (max-width:420px){.tm-box{height:260px}.tm-head{flex-wrap:wrap}}`,

  js: `// Your data: one entry per tile. Each number is a measure you can switch between.
var DATA = [
  { name: 'node_modules', size: 1840, files: 48210, color: '#6366f1' },
  { name: 'Photos',       size: 920,  files: 6420,  color: '#16a34a' },
  { name: 'Videos',       size: 760,  files: 310,   color: '#f59e0b' },
  { name: 'Documents',    size: 410,  files: 9850,  color: '#ec4899' },
  { name: 'Music',        size: 280,  files: 3120,  color: '#0ea5e9' },
  { name: 'Downloads',    size: 240,  files: 1240,  color: '#0d9488' },
  { name: 'Cache',        size: 150,  files: 14600, color: '#a855f7' },
  { name: 'Other',        size: 90,   files: 2150,  color: '#64748b' },
];

var METRICS = {
  size:  { fmt: function (v) { return v >= 1000 ? (v / 1000).toFixed(2) + ' GB' : v + ' MB'; } },
  files: { fmt: function (v) { return v.toLocaleString() + ' files'; } },
};

var box = document.getElementById('tmBox');
var tip = document.getElementById('tmTip');
var card = document.querySelector('.tm-card');
var detail = document.getElementById('tmDetail');
var metric = 'size';
var selected = DATA[0];
var items = [];

// Squarified treemap: fill a rectangle row by row, adding tiles to the current row
// only while that keeps the worst aspect ratio in the row from getting worse.
function squarify(list, x, y, w, h) {
  var total = list.reduce(function (s, i) { return s + i.value; }, 0);
  var scale = (w * h) / total;           // pixels of area per unit of value
  var rect = { x: x, y: y, w: w, h: h };
  var rest = list.slice(), row = [];

  function worst(r, side) {
    var sum = 0, max = 0, min = Infinity;
    r.forEach(function (i) { var a = i.value * scale; sum += a; max = Math.max(max, a); min = Math.min(min, a); });
    return Math.max((side * side * max) / (sum * sum), (sum * sum) / (side * side * min));
  }
  function place(r) {
    var sum = r.reduce(function (s, i) { return s + i.value * scale; }, 0);
    var pos;
    if (rect.w >= rect.h) {              // wide space: stack the row as a column on the left
      var cw = sum / rect.h; pos = rect.y;
      r.forEach(function (i) { var ih = (i.value * scale) / cw; i.rect = { x: rect.x, y: pos, w: cw, h: ih }; pos += ih; });
      rect.x += cw; rect.w -= cw;
    } else {                             // tall space: lay the row along the top
      var rh = sum / rect.w; pos = rect.x;
      r.forEach(function (i) { var iw = (i.value * scale) / rh; i.rect = { x: pos, y: rect.y, w: iw, h: rh }; pos += iw; });
      rect.y += rh; rect.h -= rh;
    }
  }
  while (rest.length) {
    var side = Math.min(rect.w, rect.h);
    if (!row.length || worst(row.concat(rest[0]), side) <= worst(row, side)) row.push(rest.shift());
    else { place(row); row = []; }
  }
  if (row.length) place(row);
}

// Build each tile once; later renders only move and resize them.
DATA.forEach(function (d, i) {
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'tm-cell';
  b.dataset.i = i;
  b.style.setProperty('--c', d.color);
  b.style.setProperty('--i', i);
  b.setAttribute('aria-label', d.name);
  b.innerHTML = '<span class="tm-fill"><span class="tm-name"></span><span class="tm-val"></span></span>';
  b.querySelector('.tm-name').textContent = d.name;
  b.addEventListener('click', function () { selected = d; renderDetail(); markSelected(); });
  box.appendChild(b);
  d.el = b;
});

function total() { return DATA.reduce(function (s, d) { return s + d[metric]; }, 0); }
function pct(d) { return Math.round((d[metric] / total()) * 100); }

function render() {
  var W = box.clientWidth, H = box.clientHeight;
  items = DATA.map(function (d) { return { d: d, value: d[metric] }; })
              .sort(function (a, b) { return b.value - a.value; });
  squarify(items, 0, 0, W, H);
  var m = METRICS[metric], t = total();
  document.getElementById('tmTotal').textContent = m.fmt(t) + ' across ' + DATA.length + ' folders';
  items.forEach(function (it) {
    var r = it.rect, el = it.d.el;
    el.style.transform = 'translate(' + r.x + 'px,' + r.y + 'px)';
    el.style.width = r.w + 'px';
    el.style.height = r.h + 'px';
    el.classList.toggle('is-labeled', r.w > 78 && r.h > 46);
    el.querySelector('.tm-val').textContent = m.fmt(it.value) + (r.w > 120 ? ' · ' + Math.round(it.value / t * 100) + '%' : '');
  });
  renderDetail();
  markSelected();
}

function renderDetail() {
  var d = selected, m = METRICS[metric], p = pct(d);
  detail.style.setProperty('--c', d.color);
  detail.style.setProperty('--w', p + '%');
  detail.innerHTML = '<span class="tm-dot"></span>' +
    '<div class="tm-d-main"><span class="tm-d-name"></span>' +
    '<span class="tm-d-sub">' + m.fmt(d[metric]) + ' of ' + m.fmt(total()) + '</span>' +
    '<div class="tm-d-bar"><i></i></div></div>' +
    '<span class="tm-d-pct">' + p + '%</span>';
  detail.querySelector('.tm-d-name').textContent = d.name;
}

function markSelected() {
  DATA.forEach(function (d) {
    d.el.classList.toggle('is-sel', d === selected);
    d.el.setAttribute('aria-pressed', d === selected);
  });
}

// Switch the measure: tiles glide to their new positions.
document.querySelectorAll('.tm-seg-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.dataset.m === metric) return;
    metric = btn.dataset.m;
    document.querySelectorAll('.tm-seg-btn').forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on);
    });
    box.classList.add('morph');
    render();
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { box.classList.remove('morph'); }, 650);
  });
});

box.addEventListener('mousemove', function (e) {
  var cell = e.target.closest('.tm-cell');
  if (!cell) { tip.hidden = true; return; }
  var d = DATA[cell.dataset.i], r = card.getBoundingClientRect();
  tip.innerHTML = d.name + ' · <b>' + METRICS[metric].fmt(d[metric]) + '</b> · ' + pct(d) + '%';
  tip.style.left = Math.max(70, Math.min(r.width - 70, e.clientX - r.left)) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
box.addEventListener('mouseleave', function () { tip.hidden = true; });

if (window.ResizeObserver) new ResizeObserver(render).observe(box);
else window.addEventListener('resize', render);

render();`,

  seo: {
    title: 'Treemap Chart in HTML, CSS & JS — Squarified, No Library',
    description: `Interactive treemap with a real squarified layout, animated Size/Files switch, hover focus, click-to-inspect panel and keyboard support. Plain JS, no library.`,
    about: {
      title: 'Treemap — Squarified Layout, Animated Measure Switch and a Click-to-Inspect Panel',
      description: `A treemap fills a rectangle with tiles whose area is proportional to a value, so you can see at a glance which item dominates and how the rest compare. This version is a disk-usage chart built in plain HTML, CSS and vanilla JavaScript: it computes a squarified layout itself, lets you switch the measure between Size and Files with the tiles gliding to their new positions, dims everything but the tile you hover, and shows the selected folder's share in a detail panel underneath. There is no charting library and no canvas, so every tile is a real button.

**Squarified layout, written out**

\`squarify(list, x, y, w, h)\` converts each value to pixels of area, then fills the rectangle row by row. It keeps adding tiles to the current row while the worst aspect ratio in that row does not get worse, and starts a new row as soon as it would. The row is laid as a column when the free space is wide and along the top when it is tall. This is the algorithm behind D3's treemap and most disk-usage tools, and it is why the tiles stay close to square instead of turning into thin strips.

**Switch the measure and the tiles move**

Two buttons, Size and Files, change which number drives the area. The tiles are built once; a re-render only changes each tile's translate, width and height, and a short \`morph\` class turns on a CSS transition so they slide into the new arrangement. The same folder that dominates by size (node_modules at 1.84 GB) is also huge by file count, while Videos shrinks to a sliver because it holds only 310 files — the kind of contrast a treemap is good at showing.

**Hover focus and a click-to-inspect panel**

Hovering a tile dims the others to half opacity and lifts the hovered tile slightly, with a cursor-following tooltip carrying the name, value and percentage. Clicking a tile (or pressing Enter on it) selects it: a white inner ring marks it, and the panel below shows its value, its share of the total as a large percentage and a progress bar that animates when the selection changes.

**Labels that fit**

A tile shows its name only when it is at least 78px wide and 46px tall, and adds the percentage once it passes 120px. Smaller tiles stay clean and rely on the tooltip and the panel, so nothing is clipped.

**Responsive, accessible, motion-aware**

A ResizeObserver re-runs the layout whenever the box changes width, so the chart repacks on rotation or window resize. Tiles enter with a staggered scale-and-fade, and \`prefers-reduced-motion\` turns the entrance and the glide off. Because the tiles are buttons with aria-labels, the chart can be reached with Tab and operated with Enter.

**Your data**

Edit the \`DATA\` array: each entry takes a name, a colour and one number per measure. Add a measure by adding a key to the entries and to \`METRICS\` along with a formatter.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS and JS', text: `The tiles fade in one after another, with node_modules selected and its share shown in the panel under the chart.` },
      { title: 'Hover a tile', text: `The other tiles dim, the tile lifts, and a tooltip shows its name, value and percentage.` },
      { title: 'Click or press Enter on a tile', text: `It gets a white ring and the panel shows its value, share of the total and a progress bar.` },
      { title: 'Switch Size / Files', text: `The tiles glide to a new arrangement because the area now follows the other measure.` },
      { title: 'Replace DATA', text: `Give each entry a name, a colour and a number for each measure, then add matching keys to METRICS.` },
      { title: 'Change the height', text: `Edit the .tm-box height in the CSS; the layout reads the real box size, so no JavaScript change is needed.` },
    ] },
    features: [
      { title: 'Squarified layout', text: `Rows grow only while the worst aspect ratio improves, so tiles stay close to square.` },
      { title: 'Animated measure switch', text: `Size and Files re-pack the same tiles, which slide to their new positions.` },
      { title: 'Hover focus', text: `Other tiles dim to 50% and the hovered one lifts, with a tooltip showing value and percentage.` },
      { title: 'Click-to-inspect panel', text: `The selected folder's value, share and progress bar update below the chart.` },
      { title: 'Labels only where they fit', text: `Names appear from 78×46px and percentages from 120px wide; small tiles use the tooltip.` },
      { title: 'Keyboard operable', text: `Every tile is a labelled button, reachable with Tab and selected with Enter.` },
      { title: 'ResizeObserver repack', text: `The layout recalculates whenever the box width changes, including on rotation.` },
      { title: 'Reduced-motion aware', text: `Entrance and glide animations switch off for visitors who prefer less motion.` },
    ],
    useCases: [
      { title: 'Storage and quota screens', text: 'Show which folders eat a drive or workspace, switch to file count to find the folder with thousands of tiny files, and click one to see its exact share.' },
      { title: 'Spend breakdowns', text: 'Lay out budget categories by amount, then flip to transaction count so finance can see a category that is small in money but busy in activity.' },
      { title: 'Portfolio allocation', text: 'Size tiles by holding value and compare with a [pie chart](/ui-snippets/pie-chart/) when there are only three or four positions worth showing.' },
      { title: 'Bundle and repo analysis', text: 'Map package size against file count to spot the dependency that dominates your build, with the percentage panel ready for a screenshot in a report.' },
      { title: 'Inventory by category', text: 'Fit dozens of categories in a fixed box, where a [bar chart](/ui-snippets/bar-chart/) would scroll, and let staff click a tile for stock share.' },
    ],
    faqs: [
      { q: 'What is the difference between this and a simple slice-and-dice treemap?', a: `Slice-and-dice splits the rectangle in two at every step and often produces long thin strips. Squarified lays out rows and checks the worst aspect ratio before adding each tile, so shapes stay near square and are easier to compare and label. It costs a few more lines but reads much better with eight or more items.` },
      { q: 'How does the Size / Files switch animate?', a: `The tiles are created once. Switching the measure re-runs the layout and sets a new translate, width and height on each existing tile, while a temporary morph class adds a 0.55s transition. Because the elements are reused rather than rebuilt, they slide between positions instead of popping in.` },
      { q: 'Why do some tiles have no label?', a: `A label needs room or it gets clipped. A tile shows its name only when it is at least 78px wide and 46px tall, and adds the percentage past 120px. Every tile still shows its name, value and percentage in the hover tooltip, and clicking it puts the same details in the panel below.` },
      { q: 'Can I add another measure besides Size and Files?', a: `Yes. Add a numeric key to each DATA entry, add a matching entry with a formatter to METRICS, and add a button with that key in data-m. The layout reads DATA[i][metric], so no other code changes.` },
      { q: 'How do I use this treemap in React, Vue or Angular?', a: `Keep the data, metric and selected item in state, compute the layout from a measured width (a ResizeObserver hook in React, a ref in Vue or Angular) and render the tiles with a loop, using the translate, width and height values as inline styles. The squarify function is plain JavaScript and moves over unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how worst() decides whether the next tile joins the current row, and why place() switches between a column and a row depending on whether the free rectangle is wider than tall. Since the measure switch, hover dimming and click-to-inspect panel already exist, ask for what is missing: nested folders where clicking a tile zooms into its children with a breadcrumb, a colour scale driven by a third value such as age or growth, a search box that highlights matching tiles, or a legend you can click to hide categories. You could also ask whether squarify should be memoised so the layout is not recomputed when only the selection changes.`,
      prompt: `Build an interactive treemap in plain HTML, CSS and vanilla JavaScript — no charting library, no canvas.

Requirements:
- Data is an array of folders, each with a name, a colour and two numeric measures (size in MB and file count). Two segmented buttons, Size and Files, choose which measure drives tile area.
- Implement the squarified algorithm: convert values to pixel areas, fill the rectangle row by row, keep adding to the current row only while the worst aspect ratio does not get worse, lay the row as a column when the free space is wider than tall and along the top otherwise.
- Create the tiles once as buttons with aria-labels. On every render only update each tile's translate transform, width and height. When the measure changes, add a temporary class that transitions transform, width and height over 0.55s so tiles glide to their new positions.
- Tiles use a gradient over their colour, a 2px gap, rounded corners and a staggered scale-and-fade entrance. Show the name only on tiles at least 78×46px and the percentage on tiles wider than 120px.
- On hover, dim the other tiles to 50% opacity, lift the hovered tile slightly, and show a cursor-following tooltip with name, value and percentage, clamped inside the card.
- Clicking or pressing Enter on a tile selects it: draw a white inner ring and update a detail panel with a colour dot, the value, its share of the total as a large percentage and an animated progress bar. Preselect the largest tile.
- Re-run the layout with a ResizeObserver, and respect prefers-reduced-motion by disabling the entrance and the glide.`,
    },
  },
};

export default treemap;
