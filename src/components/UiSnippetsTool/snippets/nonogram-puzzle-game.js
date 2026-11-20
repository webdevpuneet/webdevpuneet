const nonogramPuzzleGame = {
  id: 'nonogram-puzzle-game',
  title: 'Nonogram Puzzle Game',
  category: 'games',
  html: `<div class="ng-app">
  <div class="ng-header">
    <h2>Nonogram</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Filled</span><span class="stat-val" id="ng-filled">0</span></div>
      <div class="stat"><span class="stat-label">Mistakes</span><span class="stat-val" id="ng-mistakes">0</span></div>
    </div>
  </div>

  <p class="ng-goal" id="ng-goal">Left-click to fill a cell, right-click (or long-press) to mark it empty. Match the row and column clue numbers.</p>

  <div class="ng-board" id="ng-board"></div>

  <div class="ng-actions">
    <button class="ghost-btn" id="ng-new">New Puzzle</button>
    <button class="ghost-btn" id="ng-clear">Clear Marks</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.ng-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.ng-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.ng-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 60px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 15px; font-weight: 800; color: #6366f1; }

.ng-goal { font-size: 12px; color: #475569; text-align: center; line-height: 1.6; }
.ng-goal.win { color: #16a34a; font-weight: 800; font-size: 13px; }

.ng-board {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; gap: 4px;
  user-select: none; -webkit-user-select: none;
}
.ng-corner { }
.ng-col-clues { display: flex; }
.ng-row-clues { display: flex; flex-direction: column; }
.ng-grid { display: grid; }

.ng-col-clue, .ng-row-clue {
  display: flex; align-items: flex-end; justify-content: center;
  font-size: 10px; font-weight: 700; color: #475569; line-height: 1.1;
  flex-direction: column; text-align: center;
}
.ng-row-clue { align-items: center; justify-content: flex-end; flex-direction: row; gap: 3px; padding-right: 4px; }

.ng-cell {
  border: 1px solid #e2e8f0; background: #fff; cursor: pointer;
  transition: background 0.08s;
}
.ng-cell:hover { background: #eef2ff; }
.ng-cell.filled { background: #6366f1; border-color: #6366f1; }
.ng-cell.marked { background: #f1f5f9; position: relative; }
.ng-cell.marked::after {
  content: '\\2715'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 10px;
}
.ng-cell.block-r { border-right-width: 2px; border-right-color: #94a3b8; }
.ng-cell.block-b { border-bottom-width: 2px; border-bottom-color: #94a3b8; }

.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `const SIZE = 6;
const CELL = 34;

// A small library of hand-picked 6x6 solutions (true = filled). Each solve
// draws the next puzzle from this pool, so the game genuinely varies while
// every puzzle is guaranteed to have a valid, unique-looking picture.
const PUZZLES = [
  [
    [0,0,1,1,0,0],
    [0,1,1,1,1,0],
    [1,1,0,0,1,1],
    [1,1,1,1,1,1],
    [0,1,0,0,1,0],
    [0,1,0,0,1,0],
  ],
  [
    [0,1,1,1,1,0],
    [1,0,0,0,0,1],
    [1,0,1,1,0,1],
    [1,0,0,0,0,1],
    [1,0,1,0,1,1],
    [0,1,1,1,1,0],
  ],
  [
    [1,1,0,0,1,1],
    [1,1,0,0,1,1],
    [0,0,1,1,0,0],
    [0,0,1,1,0,0],
    [1,1,0,0,1,1],
    [1,1,0,0,1,1],
  ],
  [
    [0,0,0,1,0,0],
    [0,0,1,1,1,0],
    [0,1,1,1,1,1],
    [0,0,1,1,1,0],
    [0,1,1,1,1,1],
    [1,1,0,1,0,1],
  ],
];

let solution = [];
let state = []; // 0 = empty, 1 = filled, 2 = marked-empty
let mistakes = 0;
let won = false;

const boardEl = document.getElementById('ng-board');
const filledEl = document.getElementById('ng-filled');
const mistakesEl = document.getElementById('ng-mistakes');
const goalEl = document.getElementById('ng-goal');

function runsFor(line) {
  const runs = [];
  let count = 0;
  for (const v of line) {
    if (v === 1) count++;
    else { if (count) runs.push(count); count = 0; }
  }
  if (count) runs.push(count);
  return runs.length ? runs : [0];
}

function rowClue(r) { return runsFor(solution[r]); }
function colClue(c) { return runsFor(solution.map(row => row[c])); }

function buildBoard() {
  boardEl.innerHTML = '';
  boardEl.style.gridTemplateColumns = 'auto ' + (SIZE * CELL) + 'px';

  const corner = document.createElement('div');
  corner.className = 'ng-corner';
  boardEl.appendChild(corner);

  const colCluesWrap = document.createElement('div');
  colCluesWrap.className = 'ng-col-clues';
  for (let c = 0; c < SIZE; c++) {
    const cell = document.createElement('div');
    cell.className = 'ng-col-clue';
    cell.style.width = CELL + 'px';
    cell.style.height = '38px';
    colClue(c).forEach(n => {
      const line = document.createElement('span');
      line.textContent = n;
      cell.appendChild(line);
    });
    colCluesWrap.appendChild(cell);
  }
  boardEl.appendChild(colCluesWrap);

  const rowCluesWrap = document.createElement('div');
  rowCluesWrap.className = 'ng-row-clues';
  for (let r = 0; r < SIZE; r++) {
    const cell = document.createElement('div');
    cell.className = 'ng-row-clue';
    cell.style.height = CELL + 'px';
    cell.style.width = '46px';
    cell.textContent = rowClue(r).join(' ');
    rowCluesWrap.appendChild(cell);
  }
  boardEl.appendChild(rowCluesWrap);

  const grid = document.createElement('div');
  grid.className = 'ng-grid';
  grid.style.gridTemplateColumns = 'repeat(' + SIZE + ', ' + CELL + 'px)';
  grid.style.gridTemplateRows = 'repeat(' + SIZE + ', ' + CELL + 'px)';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'ng-cell';
      if ((c + 1) % 3 === 0 && c !== SIZE - 1) cell.classList.add('block-r');
      if ((r + 1) % 3 === 0 && r !== SIZE - 1) cell.classList.add('block-b');
      cell.addEventListener('click', () => onCellClick(r, c));
      cell.addEventListener('contextmenu', (e) => { e.preventDefault(); onCellRightClick(r, c); });
      grid.appendChild(cell);
    }
  }
  boardEl.appendChild(grid);
}

function renderCells() {
  const cells = boardEl.querySelectorAll('.ng-grid .ng-cell');
  cells.forEach((cell, i) => {
    const r = Math.floor(i / SIZE), c = i % SIZE;
    cell.classList.toggle('filled', state[r][c] === 1);
    cell.classList.toggle('marked', state[r][c] === 2);
  });
}

function onCellClick(r, c) {
  if (won || state[r][c] !== 0) return;
  if (solution[r][c] === 1) {
    state[r][c] = 1;
  } else {
    state[r][c] = 2;
    mistakes++;
    mistakesEl.textContent = String(mistakes);
  }
  afterMove();
}

function onCellRightClick(r, c) {
  if (won) return;
  if (state[r][c] === 0) state[r][c] = 2;
  else if (state[r][c] === 2) state[r][c] = 0;
  afterMove();
}

function afterMove() {
  renderCells();
  const filledCount = state.flat().filter(v => v === 1).length;
  filledEl.textContent = String(filledCount);
  checkWin();
}

function checkWin() {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const shouldBeFilled = solution[r][c] === 1;
      const isFilled = state[r][c] === 1;
      if (shouldBeFilled !== isFilled) return;
    }
  }
  won = true;
  goalEl.textContent = 'Solved! Every filled cell matches the picture, with ' + mistakes + ' mistake' + (mistakes === 1 ? '' : 's') + '.';
  goalEl.className = 'ng-goal win';
}

function newPuzzle() {
  solution = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
  state = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  mistakes = 0;
  won = false;
  filledEl.textContent = '0';
  mistakesEl.textContent = '0';
  goalEl.textContent = 'Left-click to fill a cell, right-click (or long-press) to mark it empty. Match the row and column clue numbers.';
  goalEl.className = 'ng-goal';
  buildBoard();
  renderCells();
}

function clearMarks() {
  if (won) return;
  state = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  mistakes = 0;
  mistakesEl.textContent = '0';
  filledEl.textContent = '0';
  renderCells();
}

document.getElementById('ng-new').addEventListener('click', newPuzzle);
document.getElementById('ng-clear').addEventListener('click', clearMarks);

newPuzzle();

/* wdp-share:start */
(function () {
  var TITLE = 'Nonogram Puzzle Game', URL = 'https://webdevpuneet.com/ui-snippets/nonogram-puzzle-game/';
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
    title: 'Nonogram Puzzle Game — Free HTML CSS JS Snippet',
    description: 'A playable 6x6 nonogram (picross) picture logic puzzle with auto-generated row/column clues, right-click empty marking, and live win detection. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Nonogram Puzzle Game — Picross Picture Logic Puzzle with Auto-Generated Clues',
      description: `A nonogram (also called picross or griddler) is a picture logic puzzle: every row and column is labeled with a sequence of numbers representing the lengths of consecutive filled-cell runs in that line, and the solver must deduce which cells to fill purely from those numbers until a hidden picture emerges. This snippet implements a real, playable 6x6 nonogram — clues are computed programmatically from an actual solution grid, not hand-typed, and the win condition checks the full grid against that solution.

**Clues are derived from the solution, not authored separately**

Rather than storing clue numbers as separate data (which risks the clues and the picture disagreeing), \`runsFor(line)\` computes them directly from a boolean row or column: it walks the line counting consecutive \`1\`s, pushing each run's length to an array whenever a \`0\` (or the line's end) breaks a run. \`rowClue(r)\` calls this on \`solution[r]\` directly; \`colClue(c)\` first transposes a column out of the row-based \`solution\` array with \`solution.map(row => row[c])\` and runs the identical function. This guarantees the displayed clues are always exactly correct for whichever solution grid is loaded — there is no possibility of the clues and the actual picture drifting out of sync.

**Two-state cell interaction: fill and mark-empty**

A cell has three possible states — \`0\` (untouched), \`1\` (filled), \`2\` (marked empty, shown as an X). Left-click (\`onCellClick\`) fills a cell if the solution says it should be filled, or marks it empty (and increments the mistake counter) if it shouldn't — giving immediate right/wrong feedback rather than letting an error sit undetected until the final check. Right-click (\`onCellRightClick\`, with \`preventDefault()\` to suppress the browser context menu) toggles a manual empty-mark independently of correctness, which is how experienced nonogram solvers cross off cells they've logically eliminated without committing to filling them.

**A small pool of hand-authored solutions**

\`PUZZLES\` holds several complete 6x6 boolean solution grids, each hand-drawn to form a recognizable simple shape. \`newPuzzle()\` picks one at random, so replaying the game produces genuinely different puzzles rather than the same picture every time, while every puzzle in the pool is guaranteed solvable and correctly clued since the clues are always derived live from whichever grid was picked.

**3x3 block dividers for readability**

Standard nonograms mark every third row and column with a slightly heavier grid line so the eye can count cells in groups instead of one at a time — this snippet reproduces that with \`.block-r\`/\`.block-b\` classes applied every third cell, purely a readability aid with no effect on game logic.

**Win detection against the true solution**

\`checkWin()\` compares every cell's \`state\` against \`solution\` directly — a cell counts as solved only if \`state[r][c] === 1\` exactly matches \`solution[r][c] === 1\`; marked-empty cells (\`state === 2\`) are correct as long as the solution agrees they should be empty. The moment every cell matches, the puzzle is marked won and a message reports the player's total mistake count.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the row and column clue numbers', text: 'Each number sequence tells you the length of consecutive filled-cell runs in that row or column, in order.' },
        { title: 'Left-click to fill a cell', text: 'If the cell should be filled, it turns indigo. If not, it is marked with an X and counts as a mistake.' },
        { title: 'Right-click to mark a cell empty', text: 'Cross off cells you have logically ruled out without risking a mistake — this toggle does not affect your mistake count.' },
        { title: 'Watch the filled and mistake counters', text: 'The header tracks how many cells are currently filled and how many incorrect fills you have made this puzzle.' },
        { title: 'Solve to reveal the picture', text: 'The puzzle is automatically detected as solved the instant every cell matches the hidden solution grid.' },
        { title: 'Load a new puzzle', text: 'Click "New Puzzle" to draw a different random solution from the built-in pool, or "Clear Marks" to reset the current puzzle\'s cells without changing the picture.' },
      ],
    },
    features: [
      'Row and column clues computed live from the solution grid via a run-length function — never hand-typed or able to drift out of sync',
      'Three-state cells: untouched, filled, and marked-empty, each with distinct styling',
      'Left-click fill gives immediate right/wrong feedback and increments a live mistake counter on an incorrect fill',
      'Right-click (or long-press) toggles a mistake-free empty mark for logically eliminated cells',
      'A small pool of hand-authored 6x6 solution grids selected at random for real replay variety',
      '3x3 heavier grid-line dividers matching standard nonogram readability conventions',
      'Win detection compares the full grid against the true solution, not just the filled-cell count',
      'Context menu suppressed on right-click so marking works cleanly without an unwanted browser menu',
    ],
    useCases: [
      { icon: 'GAME', title: 'Logic puzzle game collections', desc: 'A picture-deduction puzzle structurally different from stacking or matching games, pairing well with the [Mini Sudoku Game](/ui-snippets/mini-sudoku-game/) or [Lights Out Puzzle Game](/ui-snippets/lights-out-puzzle-game/) in a puzzle games section.' },
      { icon: 'LEARN', title: 'Teaching run-length encoding', desc: 'runsFor() is a compact, readable real-world example of run-length encoding applied to a boolean sequence — a useful concept well beyond nonograms alone.' },
      { icon: 'APP', title: 'Daily puzzle or brain-training apps', desc: 'The random-pick-from-a-pool pattern in newPuzzle() is a direct starting point for a "puzzle of the day" feature once expanded with a larger authored puzzle set.' },
      { icon: 'CODE', title: 'Reference for solution-derived UI', desc: 'Deriving displayed clues from the underlying data (rather than storing them redundantly) is a broadly useful pattern for any UI that must never let its labels drift out of sync with its source data.' },
      { icon: 'DESIGN', title: 'Grid-with-margin-labels layout reference', desc: 'The corner/column-clues/row-clues/grid four-quadrant CSS grid layout is reusable for any spreadsheet-like UI needing synchronized row and column headers.' },
    ],
    faqs: [
      { q: 'How are the row and column clue numbers generated?', a: 'runsFor(line) walks a boolean array counting consecutive filled (1) cells, pushing each run\'s length to a results array whenever a 0 or the end of the line breaks the run. rowClue() calls this directly on a solution row; colClue() first builds a column array with solution.map(row => row[c]) and runs the identical function, so clues are always computed live from the true solution rather than authored by hand.' },
      { q: 'What is the difference between left-click and right-click?', a: 'Left-click attempts to fill a cell: if the solution agrees it should be filled, it fills correctly; if not, it is marked with an X and counts as a mistake. Right-click toggles a manual empty-mark (also shown as an X) that never counts as a mistake, regardless of whether the cell should actually be filled — this is the standard nonogram technique for crossing off cells you have deduced must be empty.' },
      { q: 'How does the game know when the puzzle is solved?', a: 'checkWin() compares every cell in state against the true solution grid: a cell counts as correctly solved if being filled (state === 1) exactly matches whether the solution says that cell should be filled. The instant every cell in the grid agrees, the puzzle is marked won.' },
      { q: 'How do I add more puzzles?', a: 'Add another 6x6 array of 0s and 1s to the PUZZLES array in the JS panel — no separate clue data is needed, since rowClue() and colClue() compute clues automatically from whatever solution grid is loaded.' },
      { q: 'Can I make a larger grid?', a: 'Yes — change the SIZE constant and add correspondingly larger (SIZE x SIZE) solution grids to PUZZLES. The clue-generation, rendering, and win-check logic are all written generically against SIZE rather than hardcoded to 6.' },
      { q: 'Why is there a separate mistake counter from the filled counter?', a: 'The filled counter (from state.flat().filter(v => v === 1).length) shows raw progress, while mistakes only increments on an incorrect left-click fill — separating "how much have I done" from "how accurately am I solving it" gives more useful feedback than either number alone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how runsFor() turns a boolean row or column into the clue numbers shown in the header, and why deriving clues from the solution at render time instead of storing them separately eliminates an entire class of "clues don't match the picture" bugs. It's also a good candidate for extension — ask it to add a solvability checker that verifies each new puzzle has a logically deducible (not just guessable) solution, add a hint button that reveals one correct cell, or generate a much larger pool of solution grids algorithmically instead of hand-authoring each one.`,
      prompt: `Build a playable nonogram (picross) picture logic puzzle in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Store one or more complete boolean solution grids (e.g. 6x6 arrays of 0/1) representing hidden pictures, and pick one at random each new game.
- Compute every row's and every column's clue numbers programmatically from the solution grid itself using run-length logic (consecutive filled-cell run lengths, in order) — do not hand-author or separately store the clue numbers, since they must always exactly match whichever solution is loaded.
- Render the row clues to the left of the grid and the column clues above it, in a layout where the clue labels stay aligned with their corresponding grid row or column.
- Support three cell states: untouched, filled, and marked-empty. Left-clicking an untouched cell fills it if the solution says it should be filled, or marks it empty (with a visible X) and increments a mistake counter if the solution says it should not be filled. Right-clicking (with the browser's default context menu suppressed) toggles a manual empty-mark on any untouched or marked cell without ever counting as a mistake.
- Detect the win condition by comparing every cell's current state against the true solution grid, and the instant every cell agrees, show a clear "solved" message including the total mistake count for that puzzle.
- Add a heavier grid line every third row and every third column purely for visual grouping, matching standard nonogram readability conventions.
- Include a "New Puzzle" control that picks a new random solution and fully resets the board, and a separate "Clear Marks" control that resets only the current puzzle's cell states without changing which solution is loaded.`,
    },
  },
};

export default nonogramPuzzleGame;
