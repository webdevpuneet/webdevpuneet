const matterJsPlinkoBoard = {
  id: 'matter-js-plinko-board',
  title: 'Matter.js Plinko Board with Live Bell-Curve Histogram',
  lastmod: '2026-11-14',
  category: 'games',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js',
  ],
  html: `<div class="pk">
  <div class="pk-top">
    <div>
      <h2>Plinko</h2>
      <p>Each peg is a coin flip. Drop enough balls and the landing counts trace a bell curve.</p>
    </div>
    <div class="pk-score"><span id="pkScore">0</span><small>points</small></div>
  </div>
  <div class="pk-stage" id="pkStage"></div>
  <svg class="pk-hist" id="pkHist" viewBox="0 0 600 96" role="img" aria-label="Landing histogram"></svg>
  <div class="pk-controls">
    <button type="button" data-drop="1">Drop 1</button>
    <button type="button" data-drop="10">Drop 10</button>
    <button type="button" data-drop="50">Drop 50</button>
    <button type="button" id="pkReset" class="ghost">Reset</button>
    <span class="pk-count" id="pkCount" aria-live="polite"></span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0a1d;color:#ede9fe;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.pk{width:100%;max-width:620px}
.pk-top{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:10px}
.pk h2{font-size:20px}
.pk-top p{font-size:12.5px;color:#a78bfa;margin-top:4px}
.pk-score{text-align:right;font:800 28px system-ui;font-variant-numeric:tabular-nums;color:#fde047}
.pk-score small{display:block;font:600 11px system-ui;color:#a78bfa}
.pk-stage{border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#1e1b4b,#0f0c29);border:1px solid #312e81}
.pk-stage canvas{display:block;width:100%;height:auto}
.pk-hist{display:block;width:100%;height:auto;margin-top:6px}
.pk-hist text{font:600 10px system-ui;fill:#a78bfa;text-anchor:middle}
.pk-controls{display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap}
.pk button{border:0;border-radius:10px;background:#7c3aed;color:#fff;font:700 13px system-ui;padding:9px 14px;cursor:pointer}
.pk button.ghost{background:transparent;border:1px solid #4c1d95;color:#c4b5fd}
.pk :focus-visible{outline:2px solid #fde047;outline-offset:2px}
.pk-count{margin-left:auto;font-size:12.5px;color:#a78bfa}`,

  js: `var M = Matter, Engine = M.Engine, Render = M.Render, Runner = M.Runner, Bodies = M.Bodies,
    Composite = M.Composite, Events = M.Events, Body = M.Body;

var W = 600, H = 640;
var engine = Engine.create();
engine.gravity.y = 1;
var render = Render.create({
  element: document.getElementById('pkStage'),
  engine: engine,
  options: { width: W, height: H, wireframes: false, background: 'transparent', pixelRatio: window.devicePixelRatio || 1 },
});

var ROWS = 11, GAP = 40, TOP = 70, PEG_R = 5, BALL_R = 7;
var SLOTS = ROWS + 1;
var MULT = [16, 6, 3, 1.5, 1, 0.5, 0.5, 1, 1.5, 3, 6, 16];
var slotW = GAP;
var boardLeft = W / 2 - (SLOTS * slotW) / 2;
var slotTop = TOP + ROWS * GAP + 16;
var counts = new Array(SLOTS).fill(0), dropped = 0, score = 0;

// Triangle of pegs: row r has r + 3 pegs. Every peg bounces a ball left or
// right with roughly equal chance, so ROWS rows ≈ ROWS coin flips.
var statics = [];
for (var r = 0; r < ROWS; r++) {
  var n = r + 3;
  for (var i = 0; i < n; i++) {
    var x = W / 2 + (i - (n - 1) / 2) * GAP;
    statics.push(Bodies.circle(x, TOP + r * GAP, PEG_R, { isStatic: true, restitution: 0.3, friction: 0, label: 'peg', render: { fillStyle: '#c4b5fd' } }));
  }
}
// Slot dividers, floor and side walls.
// Inner dividers only: the two edge slots extend to the side walls, so a
// ball that bounces wide off an outer peg still lands in an edge slot.
for (var s = 1; s < SLOTS; s++) {
  statics.push(Bodies.rectangle(boardLeft + s * slotW, slotTop + 50, 4, 100, { isStatic: true, render: { fillStyle: '#4c1d95' } }));
}
statics.push(Bodies.rectangle(W / 2, H + 20, W, 60, { isStatic: true, render: { fillStyle: '#312e81' } }));
statics.push(Bodies.rectangle(-20, H / 2, 40, H * 2, { isStatic: true }));
statics.push(Bodies.rectangle(W + 20, H / 2, 40, H * 2, { isStatic: true }));

// Guard walls parallel to the edge of the peg triangle, half a gap outside
// the outermost pegs. The gap is narrower than a ball, so a ball bounced
// wide by an outer peg comes back into play instead of dropping down the
// side — otherwise the edge slots fill up far more than probability says.
// Outermost peg in row r sits at x = W/2 ± ((r + 2) / 2) * GAP.
function wallBetween(x1, y1, x2, y2) {
  var len = Math.hypot(x2 - x1, y2 - y1);
  return Bodies.rectangle((x1 + x2) / 2, (y1 + y2) / 2, len, 6, {
    isStatic: true, angle: Math.atan2(y2 - y1, x2 - x1), friction: 0, restitution: 0.3, render: { fillStyle: '#4c1d95' },
  });
}
function edgeX(y) { return (y - TOP) / 2 + GAP * 1.5; } // distance from centre
var wy1 = TOP - GAP, wy2 = TOP + (ROWS - 0.5) * GAP;
statics.push(wallBetween(W / 2 - edgeX(wy1), wy1, W / 2 - edgeX(wy2), wy2));
statics.push(wallBetween(W / 2 + edgeX(wy1), wy1, W / 2 + edgeX(wy2), wy2));

// One sensor per slot. Sensors detect collisions but have no physical
// response, so balls fall straight through them.
var sensors = [];
for (var k = 0; k < SLOTS; k++) {
  var left = k === 0 ? 0 : boardLeft + slotW * k;
  var right = k === SLOTS - 1 ? W : boardLeft + slotW * (k + 1);
  var sensor = Bodies.rectangle((left + right) / 2, slotTop + 60, right - left - 6, 10, { isStatic: true, isSensor: true, label: 'slot-' + k, render: { visible: false } });
  sensors.push(sensor);
}
Composite.add(engine.world, statics.concat(sensors));

// A shared NEGATIVE collision group means balls never collide with each
// other. That keeps every ball's path independent, like a textbook
// Galton board, instead of piles of balls deflecting each other.
var BALL_GROUP = -1;
function drop() {
  var jitter = (Math.random() - 0.5) * 6;
  var ball = Bodies.circle(W / 2 + jitter, 30, BALL_R, {
    restitution: 0.3, friction: 0.002, frictionAir: 0.015, density: 0.004,
    collisionFilter: { group: BALL_GROUP },
    label: 'ball',
    render: { fillStyle: '#fde047' },
  });
  Composite.add(engine.world, ball);
  dropped++;
}

// A physics bounce is NOT a fair coin: a ball keeps some sideways momentum
// from the last peg, so free bouncing drifts to the edges far more often
// than probability says. To model a true Galton board, each peg hit sets the
// ball's sideways speed to the same value in a random direction — one fair
// left/right decision per peg — while gravity and collisions do the rest.
var KICK = 1.1;
Events.on(engine, 'collisionStart', function (e) {
  e.pairs.forEach(function (p) {
    var b = p.bodyA.label === 'ball' ? p.bodyA : p.bodyB.label === 'ball' ? p.bodyB : null;
    var peg = p.bodyA.label === 'peg' || p.bodyB.label === 'peg';
    if (b && peg) Body.setVelocity(b, { x: (Math.random() < 0.5 ? -1 : 1) * KICK, y: Math.min(b.velocity.y, 1.5) });
  });
});

Events.on(engine, 'collisionStart', function (e) {
  e.pairs.forEach(function (p) {
    var sensor = p.bodyA.isSensor ? p.bodyA : p.bodyB.isSensor ? p.bodyB : null;
    var ball = p.bodyA.label === 'ball' ? p.bodyA : p.bodyB.label === 'ball' ? p.bodyB : null;
    if (!sensor || !ball || ball.counted) return;
    ball.counted = true;
    var slot = Number(sensor.label.slice(5));
    counts[slot]++;
    score += MULT[slot];
    document.getElementById('pkScore').textContent = Math.round(score * 10) / 10;
    // Remove landed balls shortly after so hundreds of drops stay smooth.
    setTimeout(function () { Composite.remove(engine.world, ball); }, 900);
  });
});

// Draw slot multipliers and the histogram (with the binomial expectation).
// The histogram lives in an SVG under the canvas whose viewBox has the same
// width as the canvas, so each column lines up with its slot at any size.
var hist = document.getElementById('pkHist'), lastTotal = -1;
function drawHistogram() {
  var total = counts.reduce(function (a, b) { return a + b; }, 0);
  if (total === lastTotal) return;
  lastTotal = total;
  var maxShare = Math.max(binom(ROWS, Math.floor(ROWS / 2)), total ? Math.max.apply(null, counts) / total : 0);
  var html = '';
  for (var k = 0; k < SLOTS; k++) {
    var x = boardLeft + slotW * k;
    var h = total ? (counts[k] / total) / maxShare * 70 : 0;
    var eh = binom(ROWS, k) / maxShare * 70;
    html += '<rect x="' + (x + 4) + '" y="' + (80 - h) + '" width="' + (slotW - 8) + '" height="' + h + '" rx="3" fill="rgba(253,224,71,.55)"/>' +
      '<rect x="' + (x + 2) + '" y="' + (80 - eh - 1) + '" width="' + (slotW - 4) + '" height="2.5" fill="#f472b6"/>' +
      '<text x="' + (x + slotW / 2) + '" y="93">' + (total ? Math.round(counts[k] / total * 100) : 0) + '%</text>';
  }
  hist.innerHTML = html;
}
function binom(n, k) { var c = 1; for (var i = 1; i <= k; i++) c = c * (n - i + 1) / i; return c / Math.pow(2, n); }
Events.on(render, 'afterRender', function () {
  var ctx = render.context, pr = render.options.pixelRatio;
  ctx.save();
  ctx.scale(pr, pr);
  for (var k = 0; k < SLOTS; k++) {
    var x = boardLeft + slotW * k;
    ctx.fillStyle = MULT[k] >= 6 ? '#f472b6' : MULT[k] >= 1.5 ? '#c4b5fd' : '#7c3aed';
    ctx.font = '700 11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(MULT[k] + 'x', x + slotW / 2, slotTop + 88);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '600 10px system-ui';
    ctx.fillText(counts[k], x + slotW / 2, slotTop + 20);
  }
  ctx.restore();
  drawHistogram();
  document.getElementById('pkCount').textContent = dropped + ' dropped · bars = actual · pink line = expected';
});

var queue = 0;
setInterval(function () { if (queue > 0) { drop(); queue--; } }, 110);
document.querySelectorAll('[data-drop]').forEach(function (b) {
  b.addEventListener('click', function () { queue += Number(b.dataset.drop); });
});
document.getElementById('pkReset').addEventListener('click', function () {
  queue = 0;
  Composite.allBodies(engine.world).forEach(function (b) { if (b.label === 'ball') Composite.remove(engine.world, b); });
  counts.fill(0); dropped = 0; score = 0; lastTotal = -1;
  document.getElementById('pkScore').textContent = '0';
});

Render.run(render);
Runner.run(Runner.create(), engine);
queue = 20;

/* wdp-share:start */
(function () {
  var TITLE = 'Matter.js Plinko Board with Live Bell-Curve Histogram', URL = 'https://webdevpuneet.com/ui-snippets/matter-js-plinko-board/';
  if (window.__wdpShare) return;
  window.__wdpShare = true;
  var blob = null, file = null, lastInfo = null;

  /* ---- UI ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-in,.wdps-btn,.wdps-box{touch-action:manipulation;-webkit-tap-highlight-color:transparent}.wdps-in{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:11px 22px;font:800 15px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 0 #11793a;pointer-events:auto;position:relative;z-index:5}' +
    '.wdps-in:hover{background:#15803d}.wdps-in:active{transform:translateY(2px);box-shadow:0 1px 0 #11793a}' +
    '.wdps-btn{position:fixed;right:12px;bottom:12px;z-index:2147483000;border:0;border-radius:99px;padding:9px 16px;font:700 13px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.3)}' +
    '.wdps-btn.wdps-hot{animation:wdps-p 1.4s ease-in-out infinite}' +
    '@keyframes wdps-p{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,.6),0 3px 12px rgba(0,0,0,.3)}50%{box-shadow:0 0 0 9px rgba(22,163,74,0),0 3px 12px rgba(0,0,0,.3)}}' +
    '.wdps-btn:active{transform:translateY(1px)}' +
    '.wdps-in[hidden],.wdps-btn[hidden],.wdps-box[hidden],.wdps-box [hidden]{display:none}' +
    '.wdps-box{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:2147483001;width:max-content;max-width:calc(100vw - 24px);box-sizing:border-box;background:#fff;color:#64748b;border:1px solid #d5e2ee;border-radius:12px;padding:8px 12px;font:700 12px/1.4 system-ui,sans-serif;box-shadow:0 8px 26px rgba(15,23,42,.25);display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
    '.wdps-box button,.wdps-box a{border:1px solid #d5e2ee;background:#f8fafc;color:#1e293b;border-radius:99px;padding:5px 12px;font:700 12px system-ui,sans-serif;text-decoration:none;cursor:pointer}' +
    '.wdps-box .wdps-x{border:0;background:none;font-size:19px;line-height:1;padding:0 4px;margin-left:auto;color:#475569}' +
    '@media (max-width:700px){.wdps-box{width:calc(100vw - 24px);justify-content:center;padding:10px 12px}.wdps-box>span{width:100%;text-align:center}.wdps-box button,.wdps-box a{padding:9px 14px;font-size:13px}.wdps-box .wdps-x{position:absolute;top:4px;right:4px}.wdps-in{width:100%;max-width:320px}}';
  document.head.appendChild(st);

  var pill = document.createElement('button');
  pill.type = 'button'; pill.className = 'wdps-btn'; pill.textContent = 'Share result';
  var inl = document.createElement('button');
  inl.type = 'button'; inl.className = 'wdps-in'; inl.textContent = 'Share result'; inl.hidden = true;
  var box = document.createElement('div');
  box.className = 'wdps-box'; box.hidden = true;
  box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Share your result');
  box.innerHTML =
    '<span data-a="msg">Share your result:</span>' +
    '<button type="button" data-a="copy">Copy image</button>' +
    '<a data-a="dl" download="result.png">Download image</a>' +
    '<button type="button" data-a="more" hidden>More&hellip;</button>' +
    '<a data-a="wa" target="_blank" rel="noopener">WhatsApp</a>' +
    '<a data-a="x" target="_blank" rel="noopener">X</a>' +
    '<a data-a="fb" target="_blank" rel="noopener">Facebook</a>' +
    '<button type="button" class="wdps-x" data-a="close" aria-label="Close share options">&times;</button>';
  document.body.appendChild(box);
  document.body.appendChild(pill);
  function q(a) { return box.querySelector('[data-a="' + a + '"]'); }
  function ours(el) { return el === inl || el === pill || !!el.closest('.wdps-box'); }

  /* ---- reading the result from the screen ---- */
  function shown(el) {
    if (!el || !el.getClientRects().length) return false;
    for (var n = el; n && n !== document.body; n = n.parentElement) {
      var cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.1) return false;
      if (n.hidden || n.getAttribute('aria-hidden') === 'true') return false;
    }
    return true;
  }
  function txt(el) { return (el.textContent || '').replace(/\\s+/g, ' ').trim(); }
  function sig(el) { return ((el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '')).toLowerCase(); }
  var OUTCOME = /(you win|you won|win!|wins|victory|game over|time.?s up|cleared|complete|solved|defeat|you lose|you lost|lost|draw|crash|failed|success|congrat|score|result|finished|beat|all matched|well done|perfect|new best)/i;
  var HEADSIG = /(title|headline|msg|message|banner|result|verdict|status)/;
  var WIN = /(you win|you won|win!|wins|victory|cleared|complete|solved|success|congrat|beat|matched|perfect|new best|record)/i;
  var LOSS = /(game over|time.?s up|defeat|you lose|you lost|lost|crash|failed|out of)/i;
  var BOX = /(overlay|modal|banner|result|over|end|dialog|screen|popup|panel|card|finish|win)/;
  function readResult() {
    var head = '', sub = '', root = null, headEl = null;
    var all = document.body.querySelectorAll('h1,h2,h3,h4,p,strong,div,span');
    for (var i = 0; i < all.length && !head; i++) {
      var el = all[i];
      if (ours(el) || el.children.length > 2) continue;
      if (!HEADSIG.test(sig(el))) continue;
      /* a banner that holds its own title: use the title inside it instead */
      var inner = false;
      for (var c = 0; c < el.children.length; c++) if (HEADSIG.test(sig(el.children[c]))) inner = true;
      if (inner) continue;
      var t = txt(el);
      if (t.length < 3 || t.length > 70 || !OUTCOME.test(t) || !shown(el)) continue;
      head = t; headEl = el; root = el.parentElement;
    }
    if (root) {
      var kids = root.querySelectorAll('p,span,div');
      for (var j = 0; j < kids.length && !sub; j++) {
        var k = kids[j];
        if (ours(k) || k.children.length > 2 || !/(sub|text|summary|note|desc|detail)/.test(sig(k))) continue;
        var tt = txt(k);
        if (tt && tt !== head && tt.length >= 5 && tt.length <= 160 && shown(k)) sub = tt;
      }
    }
    /* the result screen the button goes into: the nearest overlay / banner / result box around the headline */
    var host = null;
    for (var n = headEl, d = 0; n && n !== document.body && d < 4; n = n.parentElement, d++) {
      if (d > 0 && BOX.test(sig(n)) && n.tagName !== 'BUTTON') { host = n; break; }
    }
    return { head: head, sub: sub, host: host };
  }
  var STATRE = /(score|moves|time|wpm|best|level|streak|accuracy|combo|coins|distance|height|points|stars|lives|wins|attempt|guess)/;
  function readStats() {
    var out = [], seen = {};
    var all = document.body.querySelectorAll('span,strong,b,div,p,output');
    for (var i = 0; i < all.length && out.length < 4; i++) {
      var el = all[i];
      if (ours(el) || el.children.length > 1) continue;
      if (!STATRE.test(sig(el))) continue;
      var t = txt(el);
      if (!t || t.length > 28 || !/[0-9]/.test(t) || !shown(el)) continue;
      if (!/[a-zA-Z]/.test(t) && el.parentElement) {
        var parts = [], ch = el.parentElement.childNodes;
        for (var p = 0; p < ch.length; p++) { var pv = (ch[p].textContent || '').replace(/\\s+/g, ' ').trim(); if (pv) parts.push(pv); }
        var pt = parts.join(' ');
        if (pt.length <= 30 && /[a-zA-Z]/.test(pt)) t = pt;
      }
      var key = t.toLowerCase();
      if (seen[key]) continue;
      seen[key] = 1; out.push(t);
    }
    return out;
  }
  function bestCanvas() {
    var cs = document.querySelectorAll('canvas'), best = null, area = 0;
    for (var i = 0; i < cs.length; i++) {
      var r = cs[i].getBoundingClientRect(), a = r.width * r.height;
      if (a > area && a > 8000 && shown(cs[i])) { area = a; best = cs[i]; }
    }
    return best;
  }

  /* ---- show the button when a result is on screen ---- */
  var lastHost = null, timer = 0;
  function sync() {
    timer = 0;
    var r = readResult();
    if (r.head && r.host) {
      if (inl.parentElement !== r.host) r.host.appendChild(inl);
      if (inl.hidden) inl.hidden = false;
      if (!pill.hidden) pill.hidden = true;
    } else {
      if (!inl.hidden) inl.hidden = true;
      if (pill.hidden) pill.hidden = false;
      pill.classList.toggle('wdps-hot', !!r.head);
    }
    if (lastHost && !r.head && !box.hidden) box.hidden = true;
    lastHost = r.head ? (r.host || document.body) : null;
  }
  function later() { if (!timer) timer = setTimeout(sync, 200); }
  try {
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var t = list[i].target;
        if (t.nodeType !== 1) t = t.parentElement;
        if (t && !ours(t)) { later(); return; }
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
  } catch (e) {}
  setInterval(later, 1500);
  later();

  /* ---- the card (1080 x 1080, drawn in memory, light like Pocket Artillery's) ---- */
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        g.fillText(line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines - 1) { line = words.slice(i).join(' '); break; }
      } else line = tst;
    }
    if (line) {
      while (line.length > 3 && g.measureText(line).width > maxW) line = line.slice(0, -2);
      g.fillText(line, x, y); y += lh;
    }
    return y;
  }
  function makeCard(info, cb) {
    var S = 1080, c = document.createElement('canvas');
    c.width = S; c.height = S;
    var g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, 0, S);
    gr.addColorStop(0, '#eaf4ff'); gr.addColorStop(1, '#fff3ef');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    var cv = bestCanvas();
    var head = info.head || 'Can you beat me?';
    var kind = /draw|tie/i.test(head) ? 'draw' : LOSS.test(head) && !WIN.test(head) ? 'loss' : 'win';
    g.textAlign = 'center';
    g.fillStyle = '#1e293b'; g.font = '800 60px system-ui, sans-serif';
    var y = wrap(g, TITLE, S / 2, cv ? 120 : 200, 980, 68, 1);
    g.fillStyle = kind === 'draw' ? '#475569' : kind === 'loss' ? '#3b63e0' : '#e8553a';
    g.font = '800 ' + (head.length > 22 ? 76 : 100) + 'px system-ui, sans-serif';
    y = wrap(g, head, S / 2, y + (head.length > 22 ? 70 : 90), 980, head.length > 22 ? 84 : 108, 2);
    if (info.sub) { g.fillStyle = '#475569'; g.font = '700 38px system-ui, sans-serif'; y = wrap(g, info.sub, S / 2, y + 4, 940, 48, 2); }
    if (info.stats.length) {
      g.font = '800 36px system-ui, sans-serif';
      var gap = 18, pad = 26, ws = [], tot = -gap;
      for (var i = 0; i < info.stats.length; i++) { ws.push(g.measureText(info.stats[i]).width + pad * 2); tot += ws[i] + gap; }
      var sc = tot > 1000 ? 1000 / tot : 1, px = (S - tot * sc) / 2, py = y + 14;
      for (var k = 0; k < info.stats.length; k++) {
        var w0 = ws[k] * sc;
        g.fillStyle = '#ffffff'; g.strokeStyle = '#d5e2ee'; g.lineWidth = 3;
        g.beginPath();
        if (g.roundRect) g.roundRect(px, py, w0, 64, 32); else g.rect(px, py, w0, 64);
        g.fill(); g.stroke();
        g.fillStyle = '#1e293b'; g.font = '800 ' + Math.round(36 * sc) + 'px system-ui, sans-serif';
        g.fillText(info.stats[k], px + w0 / 2, py + 44);
        px += w0 + gap * sc;
      }
      y = py + 64 + 10;
    }
    if (cv) {
      try {
        var maxW = 960, maxH = Math.max(180, 930 - y - 30), r = cv.width / cv.height;
        var w = maxW, h = w / r;
        if (h > maxH) { h = maxH; w = h * r; }
        var x = (S - w) / 2, yy = y + 20 + Math.max(0, (maxH - h) / 2);
        g.save(); g.shadowColor = 'rgba(60,100,140,0.3)'; g.shadowBlur = 30; g.shadowOffsetY = 10;
        g.fillStyle = '#fff'; g.fillRect(x - 8, yy - 8, w + 16, h + 16); g.restore();
        g.drawImage(cv, x, yy, w, h);
      } catch (e) {}
    }
    g.fillStyle = '#1e293b'; g.font = '800 46px system-ui, sans-serif';
    g.fillText('Can you beat it?', S / 2, 1000);
    g.fillStyle = '#64748b'; g.font = '700 34px system-ui, sans-serif';
    g.fillText('Play free at webdevpuneet.com', S / 2, 1050);
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    try { c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png'); } catch (e) { cb(null, dataUrl); }
  }

  function shareText(info) {
    var bits = [];
    if (info.head) bits.push(info.head);
    if (info.stats.length) bits.push(info.stats.join(', '));
    return TITLE + ': ' + (bits.length ? bits.join(' - ') + '. ' : '') + 'Can you beat it? ' + URL;
  }
  function msg(t) { q('msg').textContent = t; }
  function openFallback() {
    var t = encodeURIComponent(shareText(lastInfo));
    q('wa').href = 'https://wa.me/?text=' + t;
    q('x').href = 'https://twitter.com/intent/tweet?text=' + t;
    q('fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(URL) + '&quote=' + t;
    box.hidden = false;
  }
  function nativeShare() {
    /* a user cancel does nothing; anything else (blocked in an iframe, no permission) shows Copy / Download / links */
    try {
      navigator.share({ files: [file], title: TITLE, text: shareText(lastInfo) }).catch(function (e) { if (!e || e.name !== 'AbortError') openFallback(); });
    } catch (e) { openFallback(); }
  }
  function onShare() {
    var info = readResult(); info.stats = readStats();
    lastInfo = info;
    msg('Share your result:');
    makeCard(info, function (b, dataUrl) {
      blob = b; file = null;
      if (b) { try { file = new File([b], 'result.png', { type: 'image/png' }); } catch (e) {} }
      if (dataUrl) q('dl').href = dataUrl;
      q('dl').hidden = !dataUrl;
      var canNative = !!(file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
      var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      q('more').hidden = !canNative;
      if (canNative && touch) nativeShare();
      else openFallback();
    });
  }
  /* Games often have document/window level touch and pointer handlers (some call preventDefault, which cancels the tap's
     click on phones, others restart the game on touchstart). So: keep every pointer event on our controls away from the
     game, and fire on touchend as well as click (guarded so one tap shares once). */
  var busy = 0;
  function trigger() { if (busy) return; busy = 1; setTimeout(function () { busy = 0; }, 700); onShare(); }
  function guard(el, act) {
    var evs = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'click'];
    for (var i = 0; i < evs.length; i++) el.addEventListener(evs[i], function (e) { e.stopPropagation(); });
    if (act) {
      el.addEventListener('touchend', function (e) { if (e.cancelable) e.preventDefault(); act(); });
      el.addEventListener('click', function () { act(); });
    }
  }
  guard(pill, trigger);
  guard(inl, trigger);
  guard(box);
  q('more').addEventListener('click', function () { if (file) nativeShare(); });
  q('close').addEventListener('click', function () { box.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) box.hidden = true; });
  q('copy').addEventListener('click', function () {
    try {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(
        function () { msg('Image copied. Paste it into your chat or post.'); },
        function () { msg('Could not copy here. Try Download image.'); }
      );
    } catch (e) { msg('Copying images is not supported here. Try Download image.'); }
  });
})();
/* wdp-share:end */`,

  seo: {
    title: 'Matter.js Plinko Board with Live Bell-Curve Histogram — Free Game Snippet',
    description: `A Plinko / Galton board built with Matter.js: a triangle of pegs, slot sensors that count landings with collisionStart, a negative collision group so balls never hit each other, multiplier scoring and a live histogram against the binomial expectation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Plinko and the Galton Board — Probability You Can Watch With Matter.js',
      description: `A Plinko board is a game show favourite and, underneath, a Galton board: a demonstration that many independent random events add up to a bell curve. Each peg sends a ball left or right; after eleven rows, landing in the middle is common and the edges are rare. This snippet plays the game and draws the statistics while it does.

**Pegs as coin flips**

The pegs form a triangle: each row has one more peg than the row above, offset by half a gap. The number of rightward bounces across eleven rows decides the slot — if each bounce is a fair coin flip.

**Real bounces aren't fair coins**

Here's the interesting part: with pure physics, they aren't. A ball keeps some sideways momentum from the previous peg, so free bouncing drifts outward and the edge slots fill up many times more often than probability predicts. (Tuning restitution alone doesn't fix it: lively balls skip columns, dead balls roll along the pegs.) So on every ball–peg collision the snippet sets the ball's sideways speed to a fixed value in a random direction — one fair left/right decision per peg — and leaves gravity and collisions to do the rest. That's the idealised Galton board the maths describes, and the histogram shows it matching.

**Guard walls**

Two slanted walls run parallel to the edges of the peg triangle, half a gap outside the outermost pegs. The gap is narrower than a ball, so a ball knocked wide comes back into play.

**Sensors count landings**

Each slot has an invisible sensor body (\`isSensor: true\`). Sensors take part in collision detection but produce no physical response, so balls pass straight through while \`Events.on(engine, 'collisionStart')\` reports the contact. The handler finds which body in the pair is the ball and which is the sensor, counts the ball once, adds the slot's multiplier to the score, and removes the ball shortly after so hundreds of drops stay smooth.

**Collision groups keep balls independent**

In a real board, balls knock into each other and pile up. Giving every ball the same negative \`collisionFilter.group\` means bodies in that group never collide with each other, while still colliding with pegs and walls. Each ball's path stays independent, which is what the statistics assume.

**Histogram versus theory**

Below the board, yellow bars show the actual share of balls in each slot, drawn in an SVG whose viewBox matches the canvas width so every column lines up with its slot. A pink tick shows the expected share from the binomial distribution, C(n, k) / 2ⁿ. After fifty or a hundred drops the bars settle around the ticks — the law of large numbers in action. The multipliers are highest at the edges because those slots are the least likely.

**Drop queue**

Drops are queued and released every 110 ms so a "Drop 50" doesn't spawn fifty overlapping balls at once.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the opening drop', text: `Twenty balls fall on load.` },
      { title: 'Drop more', text: `Drop 1, 10 or 50; balls are queued so they don't overlap.` },
      { title: 'Read the histogram', text: `Yellow bars are actual shares; pink ticks are the binomial expectation.` },
      { title: 'Track your score', text: `Each landing adds its slot's multiplier.` },
      { title: 'Reset', text: `Clears balls, counts and score.` },
    ] },
    features: [
      { title: 'Triangular peg grid', text: `11 rows of offset static circles.` },
      { title: 'Slot sensors', text: `isSensor bodies counted with collisionStart.` },
      { title: 'Independent balls', text: `Negative collision group, no ball-to-ball hits.` },
      { title: 'Binomial overlay', text: `Expected share per slot drawn as ticks.` },
      { title: 'Live histogram', text: `Actual landing shares as bars.` },
      { title: 'Multiplier scoring', text: `Rare edge slots pay the most.` },
      { title: 'Body cleanup', text: `Landed balls removed for performance.` },
      { title: 'Queued drops', text: `Timed release for large batches.` },
    ],
    useCases: [
      { title: 'Casual Plinko mini-game', text: 'Ship a satisfying Plinko game quickly: a triangle of pegs, drop zones and multiplier scoring are already wired, so you only need to change the prizes and visuals.' },
      { title: 'Statistics and probability lessons', text: 'Make the central limit theorem visible: after eleven rows of pegs balls pile up in the middle, and the live histogram is drawn against the expected binomial ticks.' },
      { title: 'Learning Matter.js sensors and filtering', text: 'See `isSensor` slots counted with `collisionStart`, plus a negative collision group that stops balls hitting each other. Both patterns are reusable in any game with scoring zones.' },
      { title: 'Giveaways and prize boards', text: 'Adapt the slots into weighted prizes for a promotion or event, and let the multiplier scoring show how likely each outcome really is.' },
      { title: 'Data storytelling about randomness', text: 'Explain why extreme outcomes are rare using the live histogram instead of formulas. Readers drop a few hundred balls and watch the bell curve emerge on its own.' },
      { icon: 'CODE', title: 'Related: Matter.js Collision Filter Categories', desc: 'More on groups and masks: [Matter.js Collision Filter Categories Demo](/ui-snippets/matter-js-collision-filter-categories/).' },
      { icon: 'CODE', title: 'Related: Histogram', desc: 'A standalone histogram chart: [Histogram](/ui-snippets/histogram/).' },
    ],
    faqs: [
      { q: 'How do I detect when a ball lands in a slot in Matter.js?', a: `Put a static body with isSensor: true in the slot and listen to Events.on(engine, 'collisionStart'). Each event has pairs; check whether one body is your sensor and the other is a ball.` },
      { q: 'How do I stop balls from colliding with each other?', a: `Give them the same negative collisionFilter.group value. Bodies sharing a negative group never collide with each other but still collide with everything else.` },
      { q: 'Why does a Plinko board make a bell curve?', a: `Each peg is roughly a 50/50 left-or-right bounce, and the final slot depends on how many bounces went right. That count follows a binomial distribution, which approaches a normal (bell) curve as the number of rows grows.` },
      { q: 'How do I keep performance smooth with many balls?', a: `Remove bodies once they've landed with Composite.remove, and release drops over time rather than all at once.` },
      { q: 'Is a physics Plinko board really 50/50 at each peg?', a: `No. Balls carry sideways momentum from peg to peg, so pure physics drifts toward the edges. This snippet makes each peg a fair coin by setting the sideways velocity to a fixed speed in a random direction on every peg hit. Remove that handler to see how different unmodified physics is.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain collision groups versus categories and masks. Ask it to add a risk slider that changes the multipliers, sound effects on peg hits, a bet-and-balance game loop, or a comparison mode that lets balls collide so you can see how the distribution changes. It can also compute the expected score per ball from the multipliers and binomial probabilities.`,
      prompt: `Build a Plinko (Galton board) game with Matter.js 0.20 (from a CDN) in plain HTML, CSS and JavaScript on a dark purple theme.

Requirements:
- A triangle of static round pegs (11 rows, each with one more peg than the last), slot dividers, a floor and side walls.
- One invisible static sensor per slot; count landings in a collisionStart handler, counting each ball once, adding the slot's multiplier to a score, and removing landed balls after a short delay.
- Balls share a negative collision group so they never collide with each other; drop them near the top centre with a small random offset.
- Make every peg a fair coin flip: on each ball–peg collision, set the ball's horizontal velocity to a fixed speed in a random direction (and cap its downward speed), and add guard walls parallel to the peg triangle's edges, half a gap outside the outermost pegs.
- Buttons to drop 1, 10 or 50 balls through a timed queue, and to reset; drop 20 balls on load.
- Only inner slot dividers: the two edge slots extend to the side walls (with their sensors widened to match) so balls that bounce wide still land in an edge slot.
- In the renderer's afterRender event, draw each slot's multiplier and count; below the canvas, an SVG histogram (viewBox matching the canvas width) with a bar for the actual share of balls per slot, a tick at the binomial expected share C(n, k)/2ⁿ, and percentages, plus a dropped counter.`,
    },
  },
};

export default matterJsPlinkoBoard;
