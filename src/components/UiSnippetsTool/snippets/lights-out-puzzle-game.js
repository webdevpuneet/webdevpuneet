const lightsOutPuzzleGame = {
  id: 'lights-out-puzzle-game',
  title: 'Lights Out Puzzle Game',
  category: 'games',
  html: `<div class="lo-app">
  <div class="lo-header">
    <h2>Lights Out</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Moves</span><span class="stat-val" id="lo-moves">0</span></div>
      <div class="stat"><span class="stat-label">Best</span><span class="stat-val" id="lo-best">--</span></div>
    </div>
  </div>

  <p class="lo-goal">Click a tile to toggle it and its neighbors. Turn every light off to win.</p>

  <div class="lo-grid" id="lo-grid"></div>

  <p class="lo-feedback" id="lo-feedback">Good luck.</p>

  <div class="lo-actions">
    <button class="ghost-btn" id="lo-reset">Reset puzzle</button>
    <button class="ghost-btn" id="lo-new">New puzzle</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; }

.lo-app { max-width: 380px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.lo-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.lo-header h2 { font-size: 19px; font-weight: 800; color: #f1f5f9; }

.stats { display: flex; gap: 10px; }
.stat { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 6px 14px; min-width: 56px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b; }
.stat-val { display: block; font-size: 15px; font-weight: 800; color: #facc15; }

.lo-goal { font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.6; }

.lo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; width: 100%; aspect-ratio: 1; }
.lo-cell {
  border: none; border-radius: 8px; cursor: pointer;
  background: #1e293b; box-shadow: inset 0 0 0 1px #334155;
  transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
}
.lo-cell:active { transform: scale(0.94); }
.lo-cell.on { background: #facc15; box-shadow: 0 0 18px rgba(250,204,21,0.55), inset 0 0 0 1px #eab308; }

.lo-feedback { font-size: 12.5px; font-weight: 600; color: #94a3b8; text-align: center; min-height: 16px; }
.lo-feedback.win { color: #4ade80; font-weight: 800; }

.lo-actions { display: flex; gap: 10px; }
.ghost-btn {
  background: none; border: 1.5px solid #334155; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #cbd5e1;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #facc15; color: #facc15; }`,
  js: `const SIZE = 5;
let board = new Array(SIZE * SIZE).fill(false);
let moves = 0;
let best = null;
let won = false;
let seed = [];

const gridEl = document.getElementById('lo-grid');
const movesEl = document.getElementById('lo-moves');
const bestEl = document.getElementById('lo-best');
const feedback = document.getElementById('lo-feedback');

function idx(r, c) { return r * SIZE + c; }

// Toggling a cell also toggles its orthogonal neighbors (the classic "plus" pattern).
function applyToggle(r, c, silent) {
  const cells = [[r, c], [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];
  cells.forEach(([rr, cc]) => {
    if (rr >= 0 && rr < SIZE && cc >= 0 && cc < SIZE) {
      board[idx(rr, cc)] = !board[idx(rr, cc)];
    }
  });
  if (!silent) render();
}

function render() {
  gridEl.querySelectorAll('.lo-cell').forEach((btn, i) => {
    btn.classList.toggle('on', board[i]);
  });
}

function buildGrid() {
  gridEl.innerHTML = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const btn = document.createElement('button');
      btn.className = 'lo-cell';
      btn.type = 'button';
      btn.addEventListener('click', () => onCellClick(r, c));
      gridEl.appendChild(btn);
    }
  }
}

function onCellClick(r, c) {
  if (won) return;
  applyToggle(r, c, false);
  moves++;
  movesEl.textContent = String(moves);
  checkWin();
}

function checkWin() {
  if (board.every((v) => v === false)) {
    won = true;
    feedback.textContent = 'Solved in ' + moves + ' moves!';
    feedback.className = 'lo-feedback win';
    if (best === null || moves < best) {
      best = moves;
      bestEl.textContent = String(best);
    }
  } else {
    feedback.textContent = 'Keep going.';
    feedback.className = 'lo-feedback';
  }
}

// Any sequence of toggles is its own inverse in this game, so generating a
// puzzle by applying N random toggles from the solved (all-off) state
// guarantees the result can always be solved again.
function generatePuzzle() {
  board = new Array(SIZE * SIZE).fill(false);
  seed = [];
  const rounds = 12 + Math.floor(Math.random() * 6);
  for (let i = 0; i < rounds; i++) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    seed.push([r, c]);
    applyToggle(r, c, true);
  }
  if (board.every((v) => v === false)) {
    // Extremely unlikely all-off shuffle landed back on solved — force one flip.
    applyToggle(0, 0, true);
  }
}

function startPuzzle(reuseSeed) {
  won = false;
  moves = 0;
  movesEl.textContent = '0';
  feedback.textContent = 'Good luck.';
  feedback.className = 'lo-feedback';
  if (reuseSeed) {
    board = new Array(SIZE * SIZE).fill(false);
    seed.forEach(([r, c]) => applyToggle(r, c, true));
  } else {
    generatePuzzle();
  }
  render();
}

document.getElementById('lo-reset').addEventListener('click', () => startPuzzle(true));
document.getElementById('lo-new').addEventListener('click', () => startPuzzle(false));

buildGrid();
startPuzzle(false);

/* wdp-share:start */
(function () {
  var TITLE = 'Lights Out Puzzle Game', URL = 'https://webdevpuneet.com/ui-snippets/lights-out-puzzle-game/';
  if (window.__wdpShare) return;
  window.__wdpShare = true;
  var blob = null, file = null, lastInfo = null;

  /* ---- UI ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-in{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:11px 22px;font:800 15px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 0 #11793a;pointer-events:auto;position:relative;z-index:5}' +
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
  pill.addEventListener('click', onShare);
  inl.addEventListener('click', function (e) { e.stopPropagation(); onShare(); });
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
    title: 'Lights Out Puzzle Game — Free HTML CSS JS Snippet',
    description: 'A classic 5x5 Lights Out toggle-grid puzzle with guaranteed-solvable generation, move counting and a plus-shaped neighbor toggle rule. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Lights Out Puzzle Game — 5x5 Toggle Grid with Guaranteed-Solvable Generation',
      description: `Lights Out is a classic electronic puzzle from the 1990s: a grid of lights where clicking one tile toggles it and its orthogonal neighbors, and the goal is to turn every light off. It is a pure logic puzzle rooted in linear algebra over GF(2) — every toggle is its own inverse, which makes it possible to generate a puzzle that is provably solvable without running any solver at all. This snippet implements a complete playable 5x5 board in vanilla JavaScript: click handling, the plus-shaped toggle rule, guaranteed-solvable puzzle generation, a move counter, and a best-score tracker.

**The plus-shaped toggle rule**

\`applyToggle(r, c)\` flips the clicked cell and its four orthogonal neighbors (up, down, left, right — never diagonals), skipping any neighbor that falls outside the \`SIZE x SIZE\` grid. This five-cell "plus" pattern is the entire rule set of the game. Every other mechanic — solvability, the win condition, puzzle generation — follows directly from how this one function behaves.

**Why random toggles from the solved state always produce a solvable puzzle**

Because every toggle operation is its own inverse (applying the same toggle twice returns a cell to its original state) and toggles commute with each other, any sequence of toggles applied to the solved, all-off board can be undone by applying the exact same sequence of toggles again, in any order. \`generatePuzzle()\` exploits this directly: it starts from an all-off board, records a random sequence of cell coordinates in \`seed\`, and applies each one silently. The resulting scrambled board is guaranteed solvable — no backtracking solver or brute-force search is needed to prove it, because the seed sequence itself is a valid solution.

**Reset versus New Puzzle**

The two action buttons expose this property directly. "Reset puzzle" replays the same \`seed\` array from a cleared board, restoring the identical starting position without re-randomizing it — useful if you want to retry a specific puzzle after a failed attempt. "New puzzle" calls \`generatePuzzle()\` again, producing a fresh random \`seed\` and therefore a fresh solvable puzzle.

**Move counting and win detection**

Every click that isn't ignored (input is locked once \`won\` is true) increments \`moves\` and re-renders the grid. \`checkWin()\` runs after every move and simply checks whether every entry in the \`board\` array is \`false\` — Lights Out has no partial-credit state, only fully off or not yet solved. When the board clears, the game locks input, shows the final move count, and updates \`best\` if this run beat the previous record for the session.

**Rendering as toggled CSS classes, not redrawn DOM**

\`buildGrid()\` creates the 25 button elements once, and every subsequent update only toggles the \`.on\` class via \`render()\` — the DOM nodes themselves are never rebuilt during play. This keeps the click handler wiring stable and avoids the flicker or lost focus state that full re-renders can introduce in a rapid-click puzzle game.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click any lit tile', text: 'Clicking a tile calls applyToggle(r, c), which flips that cell and its up/down/left/right neighbors — never diagonals.' },
        { title: 'Watch the move counter', text: 'Every accepted click increments the moves stat shown in the header, live.' },
        { title: 'Turn every light off to win', text: 'checkWin() runs after each move and checks board.every(v => v === false). Clearing the board locks the grid and shows your final move count.' },
        { title: 'Reset to retry the same puzzle', text: 'Click "Reset puzzle" to replay the same random seed array from a cleared board — useful for re-attempting a puzzle you scrambled up.' },
        { title: 'Generate a new puzzle', text: 'Click "New puzzle" to call generatePuzzle() again, which applies a fresh set of random toggles from the solved state.' },
        { title: 'Tune the grid size', text: 'Change the SIZE constant in the JS panel to build a 3x3, 4x4, or larger board — the toggle and win logic scale automatically.' },
      ],
    },
    features: [
      'applyToggle() implements the classic plus-shaped neighbor toggle rule with edge bounds checking',
      'Puzzles are generated by replaying random toggles from the solved state, guaranteeing solvability with no solver needed',
      'Reset puzzle replays the exact same seed sequence; New puzzle generates a fresh random seed',
      'Live move counter and a best-moves-to-solve record tracked for the session',
      'Win detection via a single board.every() check — no partial-credit state',
      'Grid is built once and updated by toggling CSS classes, not full DOM re-renders',
      'Glowing lit-tile styling with inset box-shadow and CSS transitions for tactile feedback',
      'Configurable SIZE constant scales the grid and all logic to any board dimension',
    ],
    useCases: [
      { icon: 'GAME', title: 'Brain-training and puzzle game collections', desc: 'A self-contained logic puzzle that fits alongside other grid-based games like the [sliding puzzle game](/ui-snippets/sliding-puzzle-game/) or [minesweeper](/ui-snippets/minesweeper-game/) in a games hub.' },
      { icon: 'LEARN', title: 'Teaching linear algebra over GF(2)', desc: 'Lights Out is a textbook example of a system of equations over the field with two elements. Use this snippet as a concrete, interactive demo before introducing the underlying matrix theory.' },
      { icon: 'APP', title: 'Loading-screen or empty-state distraction', desc: 'Drop the puzzle into an idle moment in a product — a waiting room, an empty dashboard state, or a loading screen — as a lightweight, dependency-free timekiller.' },
      { icon: 'CODE', title: 'Reference implementation of state-toggle generation', desc: 'The seed-and-replay generation technique (apply random moves from a known-solved state to guarantee solvability) generalizes to any puzzle built on invertible, commutative operations.' },
      { icon: 'DESIGN', title: 'Neon-tile visual style reference', desc: 'The glowing yellow lit-tile treatment with inset shadows is directly reusable for any toggle-grid or status-light dashboard visualization.' },
    ],
    faqs: [
      { q: 'What exactly happens when I click a tile?', a: 'applyToggle(r, c) flips the clicked cell and its up, down, left, and right neighbors (never diagonals), skipping any neighbor that falls outside the grid boundary. This five-cell plus pattern is the entire rule set of the game.' },
      { q: 'How does the game guarantee every generated puzzle is solvable?', a: 'Every toggle in Lights Out is its own inverse and toggles commute, so any sequence of random toggles applied to the all-off solved board can always be undone by applying that exact same sequence again. generatePuzzle() records the random sequence it applies as seed, which doubles as a guaranteed valid solution.' },
      { q: 'What is the difference between Reset and New Puzzle?', a: 'Reset puzzle replays the stored seed array from a cleared board, restoring the exact same starting position. New Puzzle calls generatePuzzle() again to produce a brand-new random seed and a different scrambled board.' },
      { q: 'Can I change the grid size?', a: 'Yes. Change the SIZE constant in the JS panel. The board array, toggle logic, win check, and CSS grid-template-columns all reference SIZE, so a 3x3, 4x4, or 7x7 board works without further changes.' },
      { q: 'Does the best score persist after a page reload?', a: 'No, best is held in a plain JavaScript variable for the current session only. To persist it across visits, read and write the value to localStorage inside startPuzzle() and checkWin().' },
      { q: 'Is there always a fastest possible solution?', a: 'Yes, but this snippet does not compute it — it only verifies the seed sequence itself is a valid solution. Finding the minimum-move solution requires solving the underlying linear system over GF(2), which is a good extension exercise but outside the scope of the base game.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why applying random toggles from the solved board guarantees the resulting puzzle is solvable, and how that connects to Lights Out being a linear system over GF(2). It's also a great candidate for extension — ask the assistant to add a "shortest solution" solver using Gaussian elimination over GF(2) so you can display the true minimum move count, add a hint button that reveals one correct next move toward that optimal solution, or persist the best score per grid size in localStorage.`,
      prompt: `Build a Lights Out puzzle game in plain HTML, CSS, and JavaScript — no libraries, no backend.

Requirements:
- Render a 5x5 grid of tile buttons, each either "on" (lit) or "off", built once and updated only by toggling a CSS class afterward.
- Clicking a tile must toggle that tile and its orthogonal (up, down, left, right — never diagonal) neighbors that exist within the grid bounds, using one shared toggle function.
- Generate a new puzzle by starting from the fully-off solved board and applying a random sequence of toggles to it, storing that exact sequence so it can be replayed later — explain in a comment why this guarantees the resulting puzzle is always solvable without needing a separate solver.
- Add a "Reset puzzle" button that restores the exact same scrambled starting position by replaying the stored random sequence from a cleared board, and a separate "New puzzle" button that generates a brand-new random sequence.
- Track and display a live move counter that increments on every accepted click, and detect a win the moment every tile in the grid is off, at which point further clicks should be ignored and the final move count shown.
- Track a best (lowest) moves-to-solve value across puzzles played in the current session and display it alongside the live counter.`,
    },
  },
};

export default lightsOutPuzzleGame;
