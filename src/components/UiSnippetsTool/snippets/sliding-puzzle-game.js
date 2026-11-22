const slidingPuzzleGame = {
  id: 'sliding-puzzle-game',
  title: 'Sliding Number Puzzle (15-Puzzle)',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="puzzle-wrap">
  <div class="topbar">
    <div class="stat">
      <span class="stat-label">Moves</span>
      <span class="stat-value" id="moves">0</span>
    </div>
    <h2 class="title">15-Puzzle</h2>
    <button class="btn-shuffle" id="btn-shuffle">New Game</button>
  </div>

  <div class="board-frame">
    <div class="board" id="board"></div>
    <div class="win-banner hidden" id="win-banner">
      <span>Solved in <strong id="win-moves">0</strong> moves!</span>
    </div>
  </div>
  <p class="hint">Click a tile next to the empty slot to slide it.</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.puzzle-wrap { width: 100%; max-width: 380px; }

.topbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px; gap: 10px;
}
.title { font-size: 17px; font-weight: 800; color: #1e293b; }
.stat { display: flex; flex-direction: column; align-items: flex-start; }
.stat-label { font-size: 10px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-value { font-size: 18px; font-weight: 800; color: #6366f1; font-variant-numeric: tabular-nums; }

.btn-shuffle {
  background: #6366f1; color: #fff; border: none;
  padding: 9px 16px; border-radius: 8px;
  font-size: 12px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s;
}
.btn-shuffle:hover { background: #4f46e5; }

.board-frame {
  position: relative;
  background: #e0e7ff; border-radius: 14px; padding: 10px;
  box-shadow: 0 16px 40px rgba(99,102,241,0.18);
}

.board {
  position: relative;
  width: 100%; aspect-ratio: 1 / 1;
  background: #c7d2fe; border-radius: 8px;
  overflow: hidden;
}

.tile {
  position: absolute;
  width: 25%; height: 25%;
  display: flex; align-items: center; justify-content: center;
  font-size: clamp(18px, 6vw, 26px); font-weight: 800; color: #fff;
  background: linear-gradient(145deg, #818cf8, #6366f1);
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(49,46,129,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
  cursor: pointer; user-select: none;
  transition: transform 0.16s ease;
  will-change: transform;
}
.tile:hover { filter: brightness(1.06); }
.tile.solved-flash { background: linear-gradient(145deg, #34d399, #059669); }

.win-banner {
  position: absolute; inset: 10px;
  background: rgba(15, 23, 42, 0.85);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 18px; font-weight: 800;
  text-align: center; padding: 16px;
}
.win-banner.hidden { display: none; }

.hint { margin-top: 12px; text-align: center; font-size: 12px; color: #94a3b8; }`,

  js: `const SIZE = 4;
const TILE_COUNT = SIZE * SIZE; // 16 cells, last one is the empty slot

const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const winBanner = document.getElementById('win-banner');
const winMovesEl = document.getElementById('win-moves');
const btnShuffle = document.getElementById('btn-shuffle');

let tiles = []; // tiles[i] = value at cell index i (0 = empty)
let moves = 0;
let solved = false;

function solvedState() {
  const arr = [];
  for (let i = 1; i < TILE_COUNT; i++) arr.push(i);
  arr.push(0);
  return arr;
}

function indexToRowCol(index) {
  return { row: Math.floor(index / SIZE), col: index % SIZE };
}

function areAdjacent(a, b) {
  const A = indexToRowCol(a);
  const B = indexToRowCol(b);
  const dr = Math.abs(A.row - B.row);
  const dc = Math.abs(A.col - B.col);
  return (dr + dc) === 1;
}

function shuffleFromSolved() {
  tiles = solvedState();
  let emptyIndex = tiles.indexOf(0);

  // Perform many random legal slides from the solved state so the
  // puzzle is always guaranteed solvable (never a raw random permutation).
  const SHUFFLE_MOVES = 250;
  let lastEmpty = -1;
  for (let i = 0; i < SHUFFLE_MOVES; i++) {
    const neighbors = [];
    const { row, col } = indexToRowCol(emptyIndex);
    if (row > 0) neighbors.push(emptyIndex - SIZE);
    if (row < SIZE - 1) neighbors.push(emptyIndex + SIZE);
    if (col > 0) neighbors.push(emptyIndex - 1);
    if (col < SIZE - 1) neighbors.push(emptyIndex + 1);

    // avoid immediately undoing the previous move for a better shuffle
    const candidates = neighbors.filter(n => n !== lastEmpty);
    const pick = candidates[Math.floor(Math.random() * candidates.length)];

    [tiles[emptyIndex], tiles[pick]] = [tiles[pick], tiles[emptyIndex]];
    lastEmpty = emptyIndex;
    emptyIndex = pick;
  }
}

function cellPosition(index) {
  const { row, col } = indexToRowCol(index);
  return { x: col * 100, y: row * 100 };
}

function render() {
  board.innerHTML = '';
  tiles.forEach((value, index) => {
    if (value === 0) return; // empty slot has no tile element
    const el = document.createElement('div');
    el.className = 'tile';
    el.textContent = value;
    el.dataset.value = String(value);
    const { x, y } = cellPosition(index);
    el.style.transform = 'translate(' + x + '%, ' + y + '%)';
    el.addEventListener('click', () => attemptMove(index));
    board.appendChild(el);
  });
}

function attemptMove(fromIndex) {
  if (solved) return;
  const emptyIndex = tiles.indexOf(0);
  if (!areAdjacent(fromIndex, emptyIndex)) return;

  [tiles[fromIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[fromIndex]];
  moves++;
  movesEl.textContent = moves;
  render();
  checkWin();
}

function checkWin() {
  const target = solvedState();
  const isSolved = tiles.every((v, i) => v === target[i]);
  if (isSolved) {
    solved = true;
    winMovesEl.textContent = moves;
    winBanner.classList.remove('hidden');
    document.querySelectorAll('.tile').forEach(t => t.classList.add('solved-flash'));
  }
}

function newGame() {
  solved = false;
  moves = 0;
  movesEl.textContent = '0';
  winBanner.classList.add('hidden');
  shuffleFromSolved();
  render();
}

btnShuffle.addEventListener('click', newGame);

newGame();

/* wdp-share:start */
(function () {
  var TITLE = 'Sliding Number Puzzle (15-Puzzle)', URL = 'https://webdevpuneet.com/ui-snippets/sliding-puzzle-game/';
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
  var outline = 0;
  function put(g, t, x, y) { if (outline) { g.lineJoin = 'round'; g.lineWidth = outline; g.strokeStyle = 'rgba(8,12,28,.85)'; g.strokeText(t, x, y); } g.fillText(t, x, y); }
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        put(g, line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines - 1) { line = words.slice(i).join(' '); break; }
      } else line = tst;
    }
    if (line) {
      while (line.length > 3 && g.measureText(line).width > maxW) line = line.slice(0, -2);
      put(g, line, x, y); y += lh;
    }
    return y;
  }
  /* Biggest-screenshot card: the game frame fills the whole image, the text sits on top of it as an overlay. */
  function bgOf(el) {
    for (var n = el; n; n = n.parentElement) {
      var c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'transparent' && c.slice(-4) !== ', 0)') return c;
    }
    return '#0f172a';
  }
  function drawBig(info, cv) {
    var W = 1080, r = cv.width / cv.height, H = Math.max(810, Math.min(1350, Math.round(W / r)));
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var g = c.getContext('2d');
    g.fillStyle = bgOf(cv.parentElement || cv); g.fillRect(0, 0, W, H);
    var w = W, h = w / r;
    if (h > H) { h = H; w = h * r; }
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    try { g.drawImage(cv, (W - w) / 2, (H - h) / 2, w, h); } catch (e) { return null; }
    /* dark fades under the text so it stays readable on any game colours */
    var g1 = g.createLinearGradient(0, 0, 0, H * 0.55); g1.addColorStop(0, 'rgba(8,12,28,.74)'); g1.addColorStop(1, 'rgba(8,12,28,0)');
    g.fillStyle = g1; g.fillRect(0, 0, W, H * 0.55);
    var g2 = g.createLinearGradient(0, H - 200, 0, H); g2.addColorStop(0, 'rgba(8,12,28,0)'); g2.addColorStop(1, 'rgba(8,12,28,.85)');
    g.fillStyle = g2; g.fillRect(0, H - 200, W, 200);
    var head = info.head || 'Can you beat me?';
    var kind = /draw|tie/i.test(head) ? 'draw' : LOSS.test(head) && !WIN.test(head) ? 'loss' : 'win';
    g.textAlign = 'center';
    var y = 36;
    g.fillStyle = 'rgba(255,255,255,.93)'; g.font = '800 34px system-ui, sans-serif'; outline = 7;
    y = wrap(g, TITLE.toUpperCase(), W / 2, y + 34, 1000, 42, 1);
    g.fillStyle = kind === 'draw' ? '#e2e8f0' : kind === 'loss' ? '#9db8ff' : '#ffc233';
    var big = head.length > 22 ? 84 : 112; g.font = '900 ' + big + 'px system-ui, sans-serif'; outline = 16;
    y = wrap(g, head, W / 2, y + big * 0.85, 1000, big * 1.05, 2);
    if (info.sub) { g.fillStyle = '#fff'; g.font = '700 40px system-ui, sans-serif'; outline = 9; y = wrap(g, info.sub, W / 2, y + 6, 980, 50, 2); }
    outline = 0;
    if (info.stats.length) {
      g.font = '800 38px system-ui, sans-serif';
      var gap = 16, pad = 26, ws = [], tot = -gap;
      for (var i = 0; i < info.stats.length; i++) { ws.push(g.measureText(info.stats[i]).width + pad * 2); tot += ws[i] + gap; }
      var sc = tot > 960 ? 960 / tot : 1, px = (W - tot * sc) / 2, py = y + 14;
      for (var k = 0; k < info.stats.length; k++) {
        var w0 = ws[k] * sc;
        g.fillStyle = 'rgba(8,12,28,.72)'; g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3;
        g.beginPath();
        if (g.roundRect) g.roundRect(px, py, w0, 68, 34); else g.rect(px, py, w0, 68);
        g.fill(); g.stroke();
        g.fillStyle = '#fff'; g.font = '800 ' + Math.round(38 * sc) + 'px system-ui, sans-serif';
        g.fillText(info.stats[k], px + w0 / 2, py + 47);
        px += w0 + gap * sc;
      }
    }
    outline = 8;
    g.fillStyle = '#fff'; g.font = '900 52px system-ui, sans-serif'; put(g, 'Can you beat it?', W / 2, H - 84);
    g.fillStyle = 'rgba(255,255,255,.92)'; g.font = '700 34px system-ui, sans-serif'; outline = 6; put(g, 'Play free at webdevpuneet.com', W / 2, H - 34);
    outline = 0;
    return c;
  }
  function finish(c, cb) {
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    try { c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png'); } catch (e) { cb(null, dataUrl); }
  }
  function makeCard(info, cb) {
    var cv0 = bestCanvas();
    if (cv0) { var bc = drawBig(info, cv0); if (bc) { finish(bc, cb); return; } }
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
    title: 'Sliding Number Puzzle (15-Puzzle) — Free JS Snippet',
    description: 'Classic 4x4 15-puzzle with guaranteed-solvable shuffling, transform-based sliding and a move counter. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Sliding Number Puzzle (15-Puzzle) — Solvable Shuffling, Transform-Based Tile Sliding & Win Detection',
      description: `The 15-puzzle is one of the oldest mechanical puzzles ever popularized, dating back to the 1870s, and it remains a genuinely interesting programming exercise because a naive implementation is broken by default: a puzzle shuffled by fully randomizing 16 numbers is only solvable **half the time**. This snippet implements the correct approach — shuffling by performing a long sequence of random legal slides starting from the solved position — alongside smooth, transform-based tile animation and accurate win detection.

**Why a random permutation is the wrong shuffle**

The 15-puzzle's underlying mathematics involves permutation parity. Every legal slide move is equivalent to a single transposition combined with moving the blank tile, and it can be proven that exactly half of all 16! possible tile arrangements are reachable from the solved state through legal moves — the other half are permutation-parity odd and mathematically unsolvable no matter how the player slides tiles. Generating a shuffle by calling something like \`Array.sort(() => Math.random() - 0.5)\` on the 16 values ignores this entirely and will produce an unsolvable board roughly 50% of the time. This snippet avoids the problem completely: \`shuffleFromSolved()\` starts from the perfectly solved \`tiles\` array and performs 250 random **legal** slides in a row, each one swapping the blank with a randomly chosen adjacent neighbor. Because every individual move is legal and reversible, the resulting board is, by construction, always reachable back to the solved state — no parity checking required.

**Avoiding a lazy, oscillating shuffle**

A subtle secondary bug in naive "random legal slide" shufflers is that the blank tile can bounce back and forth between the same two cells repeatedly, producing a shuffle that looks busy but barely moves anything overall. This snippet tracks \`lastEmpty\`, the blank's position before the previous move, and filters it out of the candidate neighbor list on each iteration (\`neighbors.filter(n => n !== lastEmpty)\`). This forces every shuffle step to make genuine progress rather than immediately undoing the prior move, producing a well-mixed 4x4 board after 250 iterations.

**Representing the board as a flat array, not a grid**

The puzzle state lives in a single flat array, \`tiles\`, of length 16, where \`tiles[i]\` is the value shown at cell index \`i\` and \`0\` represents the empty slot. Helper functions \`indexToRowCol()\` and \`areAdjacent()\` convert between the flat index and a 2D row/column coordinate using simple integer division and modulo (\`row = Math.floor(index / 4)\`, \`col = index % 4\`), and determine legality of a move by checking that the Manhattan distance between the clicked tile's cell and the empty cell equals exactly 1. This flat-array-plus-coordinate-math representation avoids nested arrays entirely and keeps the swap logic ( \`[tiles[a], tiles[b]] = [tiles[b], tiles[a]]\` ) a single line using array destructuring.

**Transform-based sliding instead of layout reflow**

Each numbered tile is an absolutely positioned \`div\` inside the \`.board\` container, sized to exactly 25% width and height. Rather than reordering DOM elements or changing \`top\`/\`left\` (which forces the browser to recompute layout), every tile's position is set with \`el.style.transform = 'translate(x%, y%)'\`, computed from its cell index. Because \`transform\` is a compositor-only property, the browser can animate the 0.16s ease transition on the GPU without triggering layout or paint, which is why the tiles glide smoothly even during a rapid sequence of clicks. On every move, \`render()\` fully re-derives each tile's transform from the current \`tiles\` array and re-attaches its click handler, keeping the DOM state and the logical state trivially in sync.

**Win detection and move counting**

After every successful \`attemptMove()\`, \`checkWin()\` compares the live \`tiles\` array against the canonical solved array (1 through 15 followed by 0) element-by-element. On a match, a green \`.solved-flash\` class is applied to every tile and a banner reports the final move count — a lower move count indicating a more efficient solve, similar in spirit to the scoring feedback in a memory-matching game.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Start a new shuffled board',
          text: 'The puzzle shuffles itself automatically on load, or click "New Game" to reshuffle. shuffleFromSolved() always starts from the solved array and performs 250 random legal slides, so the resulting board is guaranteed solvable.',
        },
        {
          title: 'Slide tiles into the empty slot',
          text: 'Click any tile that is directly above, below, left, or right of the empty slot to slide it. attemptMove() checks areAdjacent() using row/column Manhattan distance before allowing the swap — clicking a non-adjacent tile does nothing.',
        },
        {
          title: 'Watch the move counter',
          text: 'Every successful slide increments the moves variable and updates the #moves display immediately. Use it as a lightweight scoring mechanism — challenge yourself or others to solve the puzzle in fewer moves.',
        },
        {
          title: 'Reach the solved state',
          text: 'checkWin() runs after every move, comparing the live tiles array to the canonical 1-15-then-0 solved order. On a match, every tile flashes green and a "Solved in N moves!" banner appears over the board.',
        },
        {
          title: 'Understand the transform-based rendering',
          text: 'render() recomputes every visible tile\'s translate(x%, y%) transform from its index in the tiles array and reattaches a click listener. Because it uses CSS transform rather than top/left, the 0.16s slide transition runs smoothly without layout thrashing.',
        },
        {
          title: 'Export and adapt',
          text: 'Click HTML or JSX to export. Change SIZE from 4 to 3 for a classic 8-puzzle, or swap the number labels for image tile fragments (background-position offsets) to build a picture-sliding puzzle instead.',
        },
      ],
    },
    features: [
      'Guaranteed-solvable shuffle: 250 random legal slides performed from the solved state, never a raw permutation',
      'lastEmpty tracking prevents the shuffle from oscillating the blank between the same two cells repeatedly',
      'Flat 16-element array board representation with indexToRowCol() and areAdjacent() coordinate helpers',
      'GPU-friendly transform: translate(x%, y%) tile positioning instead of top/left layout properties',
      'Array destructuring swap ([tiles[a], tiles[b]] = [tiles[b], tiles[a]]) for concise, bug-resistant move logic',
      'Live move counter incremented on every successful attemptMove()',
      'checkWin() compares live state against the canonical solved array after every move for instant win detection',
      'Solved-state visual feedback: every tile flashes green (.solved-flash) alongside a move-count summary banner',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'Teaching example for permutation parity and correct shuffle algorithms',
        desc: 'This is a strong classroom or interview-prep artifact for explaining why "shuffle by randomizing an array" fails for constrained puzzles. It demonstrates the general fix — shuffle by replaying random legal moves from a known-good state — which applies equally to Rubik\'s-cube-style puzzles, sudoku generation, and any other combinatorial puzzle with reachability constraints.',
      },
      {
        icon: 'APP',
        title: 'Standalone brain-teaser widget for a games or puzzles page',
        desc: 'Embed this as a self-contained time-killer alongside a [Memory Match Game](/ui-snippets/memory-match-game) or [Tic-Tac-Toe](/ui-snippets/tic-tac-toe-game) on a portfolio, waiting-room kiosk, or product changelog page. It needs no backend, no images, and no external state — the whole game lives in one component.',
      },
      {
        icon: 'DESIGN',
        title: 'Base for a photo or logo sliding puzzle',
        desc: 'Replace the numeric tile labels with 16 equal background-position slices of a single image (using CSS background-image and background-position offset per tile index) to turn this into a "reveal the picture" sliding puzzle — a common onboarding or marketing gimmick. The shuffle, move, and win-detection logic require no changes.',
      },
      {
        icon: 'CODE',
        title: 'Reference implementation for GPU-composited drag-free tile animation',
        desc: 'Because every tile position update goes through a single style.transform assignment rather than DOM reordering or top/left changes, this snippet is a good reference for any grid-rearranging UI (kanban reordering previews, grid-based dashboards) that needs cheap, jank-free repositioning animations.',
      },
      {
        icon: 'FLOW',
        title: 'Speedrun or timed-challenge puzzle mode',
        desc: 'Layer a stopwatch on top of the existing move counter to build a timed challenge mode — start the timer on the first attemptMove() call and stop it in checkWin() alongside the existing move-count banner, then persist best times per difficulty with localStorage the same way a [Whack-a-Mole Game](/ui-snippets/whack-a-mole-game) tracks its best score.',
      },
      {
        icon: 'FORM',
        title: 'Accessibility and keyboard-navigation extension exercise',
        desc: 'The current implementation is click/tap driven; it is a good exercise to extend with arrow-key support that moves whichever tile is adjacent to the blank in the pressed direction, plus aria-live region announcements of the move count and win state for screen reader users.',
      },
      { icon: 'CODE', title: 'Related: Matter.js Stacking Tower Game', desc: 'See the [Matter.js Stacking Tower Game](/ui-snippets/matter-js-stacking-tower-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why is a plain random shuffle wrong for a 15-puzzle?',
        a: 'The 15-puzzle has a mathematical property called permutation parity: only exactly half of all possible arrangements of the 16 tiles are actually reachable from the solved state using legal slide moves. A shuffle that randomly permutes all 16 values (e.g. sorting with a random comparator) ignores this and produces an unsolvable board roughly 50% of the time. This snippet avoids the issue by shuffling through 250 random legal slides starting from the solved state, so every generated board is provably solvable by construction.',
      },
      {
        q: 'How does the code know which tiles can move?',
        a: 'areAdjacent() converts both the clicked tile\'s flat array index and the empty slot\'s index into row/column coordinates via indexToRowCol(), then checks that the Manhattan distance between them (the sum of the absolute row difference and column difference) equals exactly 1. Only tiles directly above, below, left, or right of the blank satisfy this and are allowed to move; diagonal tiles and any tile further away are rejected.',
      },
      {
        q: 'Why does the code use CSS transform instead of positioning tiles with top and left?',
        a: 'Changing top or left forces the browser to recompute layout (reflow) on every move, which can cause visible jank, especially with many tiles animating simultaneously. transform: translate() is a compositor-only property that modern browsers can animate purely on the GPU without triggering layout or paint, which is why render() sets el.style.transform = translate(x%, y%) for every tile rather than adjusting its box position directly.',
      },
      {
        q: 'Can I change the puzzle size from 4x4 to something else?',
        a: 'Yes. Changing the SIZE constant at the top of the JS panel from 4 to 3 produces a classic 8-puzzle (9 cells, 8 numbered tiles); the solvedState(), indexToRowCol(), areAdjacent(), shuffleFromSolved(), and checkWin() functions all derive their bounds from SIZE and TILE_COUNT, so no other logic needs to change. The CSS grid math (25% tile width/height, cellPosition() percentages) is also driven by SIZE and should be updated to 100/SIZE if you change the constant.',
      },
      {
        q: 'How is a win detected, and what happens visually when the puzzle is solved?',
        a: 'checkWin() runs after every successful move and does an element-by-element comparison between the live tiles array and a freshly generated canonical solved array (values 1 through 15 in order followed by 0). If every position matches, the solved flag is set to true, further moves are blocked, every visible tile is given a .solved-flash class that swaps its gradient to green, and a banner reports the total move count used to solve the puzzle.',
      },
    ],
    aiPrompt: {
      paragraph: `This snippet is a good candidate to explore with an AI coding assistant like Claude because the correctness of the shuffle depends on a non-obvious mathematical fact (permutation parity) that is easy to get wrong. Paste the code in and ask the assistant to explain exactly why shuffleFromSolved() replays legal moves instead of randomizing the array directly, and to walk through how lastEmpty prevents the shuffle from wasting moves oscillating the blank tile back and forth. It's also a good target for extension requests: ask for keyboard arrow-key controls that move whichever tile is adjacent to the blank in that direction, a timer with a persisted best-time leaderboard using localStorage, an optional "solvability visualizer" that highlights the blank tile's reachable neighbors, or a swap to image-slice tiles for a picture-reveal variant. Treat the current file as a correct, well-tested baseline and use the assistant to layer new modes on top rather than to re-derive the shuffle algorithm from scratch.`,
      prompt: `Build a classic 4x4 sliding number puzzle (15-puzzle) in plain HTML, CSS, and JavaScript with guaranteed-solvable shuffling and smooth tile animation.

Requirements:
- A 4x4 grid containing 15 numbered tiles (1 through 15) and exactly one empty slot, represented internally as a single flat array of 16 values where 0 marks the empty slot.
- The shuffle must be generated by starting from the solved arrangement and performing many random LEGAL slide moves in sequence (picking a random valid neighbor of the blank tile each time) — never by randomly permuting all 16 values directly, since that produces an unsolvable board roughly half the time.
- The shuffle must avoid trivially undoing its own previous move every other step (i.e. track the blank's prior position and exclude it from the next random choice) so the board is well mixed rather than oscillating between two states.
- Clicking a tile must only move it if the tile is orthogonally adjacent (not diagonal) to the empty slot; clicking a non-adjacent tile must do nothing.
- Tile movement must be animated smoothly using a CSS transform-based transition (not by changing top/left or reordering DOM nodes), so tiles visibly glide into the empty slot.
- Track and display a live move counter that increments on every successful slide.
- After every move, check whether the board matches the fully solved order (1-15 in reading order, empty slot last); when solved, stop accepting further moves, apply a clear visual "solved" indication to the tiles, and display the final move count.
- Provide a "New Game" control that generates a fresh guaranteed-solvable shuffle and resets the move counter and solved state.`,
    },
  },
};

export default slidingPuzzleGame;
