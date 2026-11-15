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
  var blob = null;

  /* ---- UI: a small pill fixed to the bottom-right corner, and a panel above it ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-btn{position:fixed;right:12px;bottom:12px;z-index:2147483000;border:0;border-radius:99px;padding:9px 16px;font:700 13px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.3)}' +
    '.wdps-btn:active{transform:translateY(1px)}' +
    '.wdps-box{position:fixed;right:12px;bottom:56px;z-index:2147483000;max-width:min(92vw,330px);background:#fff;color:#1e293b;border:1px solid #d5e2ee;border-radius:14px;padding:10px 12px;font:600 12px/1.4 system-ui,sans-serif;box-shadow:0 8px 26px rgba(0,0,0,.3);display:flex;flex-wrap:wrap;gap:6px;align-items:center}' +
    '.wdps-box[hidden]{display:none}' +
    '.wdps-box img{width:100%;border-radius:8px;border:1px solid #e2e8f0}' +
    '.wdps-box button,.wdps-box a{border:1px solid #d5e2ee;background:#f8fafc;color:#1e293b;border-radius:99px;padding:5px 11px;font:700 12px system-ui,sans-serif;text-decoration:none;cursor:pointer}' +
    '.wdps-box .wdps-x{margin-left:auto;border:0;background:none;font-size:16px;padding:0 4px}';
  document.head.appendChild(st);
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'wdps-btn'; btn.textContent = 'Share result';
  var box = document.createElement('div');
  box.className = 'wdps-box'; box.hidden = true;
  box.innerHTML =
    '<img alt="Your result card">' +
    '<button type="button" data-a="more" hidden>Share&hellip;</button>' +
    '<button type="button" data-a="copy">Copy image</button>' +
    '<a data-a="dl" download="result.png">Download image</a>' +
    '<a data-a="wa" target="_blank" rel="noopener">WhatsApp</a>' +
    '<a data-a="x" target="_blank" rel="noopener">X</a>' +
    '<a data-a="fb" target="_blank" rel="noopener">Facebook</a>' +
    '<button type="button" class="wdps-x" data-a="close" aria-label="Close">&times;</button>' +
    '<span data-a="msg" style="width:100%;color:#64748b"></span>';
  document.body.appendChild(box);
  document.body.appendChild(btn);
  function q(a) { return box.querySelector('[data-a="' + a + '"]'); }

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
  var OUTCOME = /(you win|you won|win!|wins|victory|game over|time.?s up|cleared|complete|solved|defeat|you lose|you lost|lost|draw|crash|failed|success|congrat|score|result|finished|beat)/i;
  function readResult() {
    var head = '', sub = '', root = null;
    var all = document.body.querySelectorAll('h1,h2,h3,h4,p,strong,div,span');
    for (var i = 0; i < all.length && !head; i++) {
      var el = all[i];
      if (el.closest('.wdps-box') || el.children.length > 2) continue;
      var s = sig(el);
      if (!/(title|headline|msg|message|banner|result|verdict|status)/.test(s)) continue;
      var t = txt(el);
      if (t.length < 3 || t.length > 70 || !OUTCOME.test(t) || !shown(el)) continue;
      head = t; root = el.parentElement;
    }
    if (root) {
      var kids = root.querySelectorAll('p,span,div');
      for (var j = 0; j < kids.length && !sub; j++) {
        var k = kids[j];
        if (k.children.length > 2 || !/(sub|text|summary|note|desc|detail)/.test(sig(k))) continue;
        var tt = txt(k);
        if (tt && tt !== head && tt.length >= 5 && tt.length <= 160 && shown(k)) sub = tt;
      }
    }
    return { head: head, sub: sub };
  }
  var STATRE = /(score|moves|time|wpm|best|level|streak|accuracy|combo|coins|distance|height|points|stars|lives|wins|attempt|guess)/;
  function readStats() {
    var out = [], seen = {};
    var all = document.body.querySelectorAll('span,strong,b,div,p,output');
    for (var i = 0; i < all.length && out.length < 4; i++) {
      var el = all[i];
      if (el.closest('.wdps-box') || el.children.length > 1) continue;
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

  /* ---- the card (1080 x 1080, drawn in memory) ---- */
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        g.fillText(line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines) return y;
      } else line = tst;
    }
    if (line) { g.fillText(line, x, y); y += lh; }
    return y;
  }
  function makeCard(info, cb) {
    var S = 1080, c = document.createElement('canvas');
    c.width = S; c.height = S;
    var g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, S, S);
    gr.addColorStop(0, '#0f172a'); gr.addColorStop(1, '#312e81');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    g.textAlign = 'center';
    g.fillStyle = '#a5b4fc'; g.font = '700 38px system-ui, sans-serif';
    g.fillText(TITLE.toUpperCase(), S / 2, 100);
    g.fillStyle = '#ffffff'; g.font = '800 84px system-ui, sans-serif';
    var y = wrap(g, info.head || 'Can you beat me?', S / 2, 215, 940, 94, 2);
    g.fillStyle = '#cbd5e1'; g.font = '600 38px system-ui, sans-serif';
    if (info.sub) y = wrap(g, info.sub, S / 2, y + 6, 900, 50, 2);
    g.fillStyle = '#fde68a'; g.font = '800 48px system-ui, sans-serif';
    for (var i = 0; i < info.stats.length; i++) { g.fillText(info.stats[i], S / 2, y + 60 + i * 60); }
    y = y + 60 + info.stats.length * 60;
    var cv = bestCanvas();
    if (cv) {
      try {
        var maxW = 900, maxH = Math.max(160, 930 - y), r = cv.width / cv.height;
        var w = maxW, h = w / r;
        if (h > maxH) { h = maxH; w = h * r; }
        var x = (S - w) / 2, yy = y + 20;
        g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 30; g.fillStyle = '#000';
        g.fillRect(x - 6, yy - 6, w + 12, h + 12); g.restore();
        g.drawImage(cv, x, yy, w, h);
      } catch (e) {}
    }
    g.fillStyle = '#ffffff'; g.font = '800 46px system-ui, sans-serif';
    g.fillText('Can you beat it?', S / 2, 990);
    g.fillStyle = '#94a3b8'; g.font = '700 32px system-ui, sans-serif';
    g.fillText('Play free at webdevpuneet.com', S / 2, 1040);
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png');
  }

  function shareText(info) {
    var bits = [];
    if (info.head) bits.push(info.head);
    if (info.stats.length) bits.push(info.stats.join(', '));
    return TITLE + ': ' + (bits.length ? bits.join(' - ') + '. ' : '') + 'Can you beat it? ' + URL;
  }
  function msg(t) { q('msg').textContent = t; }
  function nativeShare(file, text) {
    navigator.share({ files: [file], title: TITLE, text: text }).catch(function () {});
  }

  btn.addEventListener('click', function () {
    var info = readResult(); info.stats = readStats();
    var text = shareText(info);
    makeCard(info, function (b, dataUrl) {
      blob = b;
      if (!b) { msg('Could not make the image here.'); box.hidden = false; return; }
      var file = null;
      try { file = new File([b], 'result.png', { type: 'image/png' }); } catch (e) {}
      var canNative = !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
      var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      box.querySelector('img').src = dataUrl;
      q('dl').href = dataUrl;
      var t = encodeURIComponent(text);
      q('wa').href = 'https://wa.me/?text=' + t;
      q('x').href = 'https://twitter.com/intent/tweet?text=' + t;
      q('fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(URL) + '&quote=' + t;
      q('more').hidden = !canNative;
      q('more').onclick = function () { nativeShare(file, text); };
      msg('Copy or download the image, or pick a site.');
      if (canNative && touch) { nativeShare(file, text); }
      else { box.hidden = false; }
    });
  });
  q('close').addEventListener('click', function () { box.hidden = true; });
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
