const connectFourGame = {
  id: 'connect-four-game',
  title: 'Connect Four vs Computer',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="c4-wrap">
  <div class="c4-header">
    <h2>Connect Four</h2>
    <div class="c4-status" id="c4-status">Your turn — drop a red disc</div>
  </div>

  <div class="c4-scoreboard">
    <div class="score-pill red">
      <span class="score-label">You</span>
      <span class="score-value" id="score-human">0</span>
    </div>
    <div class="score-pill draw">
      <span class="score-label">Draws</span>
      <span class="score-value" id="score-draw">0</span>
    </div>
    <div class="score-pill yellow">
      <span class="score-label">Computer</span>
      <span class="score-value" id="score-computer">0</span>
    </div>
  </div>

  <div class="c4-board" id="c4-board" role="grid" aria-label="Connect Four board"></div>

  <button class="c4-new-btn" id="c4-new-btn">New Game</button>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.c4-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%; max-width: 480px; }

.c4-header { text-align: center; }
.c4-header h2 { color: #f1f5f9; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
.c4-status { color: #94a3b8; font-size: 13px; font-weight: 600; margin-top: 4px; min-height: 18px; }
.c4-status.win { color: #22c55e; }
.c4-status.lose { color: #f87171; }
.c4-status.draw { color: #fbbf24; }

.c4-scoreboard { display: flex; gap: 10px; width: 100%; }
.score-pill { flex: 1; background: #1e293b; border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1.5px solid #334155; }
.score-pill.red { border-color: rgba(239,68,68,0.35); }
.score-pill.yellow { border-color: rgba(250,204,21,0.35); }
.score-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; }
.score-value { font-size: 18px; font-weight: 800; color: #f1f5f9; }
.score-pill.red .score-value { color: #f87171; }
.score-pill.yellow .score-value { color: #fbbf24; }

.c4-board {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  background: #1d4ed8;
  padding: 10px;
  border-radius: 14px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1);
}

.c4-col {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
  cursor: pointer;
  border-radius: 8px;
  padding: 2px;
  transition: background 0.15s;
}
.c4-col:hover { background: rgba(255,255,255,0.08); }
.c4-col.disabled { cursor: not-allowed; }

.c4-cell {
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 50%;
  background: #0f172a;
  position: relative;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
}

.c4-disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform: scale(0);
  animation: dropIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.c4-disc.red { background: radial-gradient(circle at 35% 30%, #fca5a5, #ef4444 60%, #b91c1c); }
.c4-disc.yellow { background: radial-gradient(circle at 35% 30%, #fef08a, #facc15 60%, #ca8a04); }
.c4-disc.win-cell { box-shadow: 0 0 0 3px #22c55e, 0 0 16px 4px rgba(34,197,94,0.7); animation: dropIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, pulseWin 0.9s ease-in-out infinite 0.35s; }

@keyframes dropIn {
  from { transform: scale(0) translateY(-140%); }
  to { transform: scale(1) translateY(0); }
}
@keyframes pulseWin {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
}

.c4-new-btn {
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 9px;
  border: none;
  background: #6366f1;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, transform 0.1s;
}
.c4-new-btn:hover { background: #4f46e5; }
.c4-new-btn:active { transform: scale(0.97); }

@media (max-width: 420px) {
  .c4-board { gap: 4px; padding: 6px; }
  .c4-col { gap: 4px; }
}`,

  js: `const ROWS = 6;
const COLS = 7;
const HUMAN = 'red';
const COMPUTER = 'yellow';

let board = [];
let gameOver = false;
let scores = { human: 0, computer: 0, draw: 0 };

const boardEl = document.getElementById('c4-board');
const statusEl = document.getElementById('c4-status');
const newBtn = document.getElementById('c4-new-btn');

function createBoard() {
  board = Array.from({ length: COLS }, () => Array(ROWS).fill(null));
  gameOver = false;
  boardEl.innerHTML = '';
  statusEl.textContent = 'Your turn — drop a red disc';
  statusEl.className = 'c4-status';

  for (let c = 0; c < COLS; c++) {
    const colEl = document.createElement('div');
    colEl.className = 'c4-col';
    colEl.dataset.col = c;
    for (let r = 0; r < ROWS; r++) {
      const cellEl = document.createElement('div');
      cellEl.className = 'c4-cell';
      cellEl.dataset.row = r;
      cellEl.dataset.col = c;
      colEl.appendChild(cellEl);
    }
    colEl.addEventListener('click', () => handleColumnClick(c));
    boardEl.appendChild(colEl);
  }
}

function lowestEmptyRow(col) {
  for (let r = 0; r < ROWS; r++) {
    if (!board[col][r]) return r;
  }
  return -1;
}

function handleColumnClick(col) {
  if (gameOver) return;
  const row = lowestEmptyRow(col);
  if (row === -1) return;

  placeDisc(col, row, HUMAN);
  const winLine = checkWin(col, row, HUMAN);
  if (winLine) {
    endGame('win', winLine);
    return;
  }
  if (isBoardFull()) {
    endGame('draw');
    return;
  }

  statusEl.textContent = 'Computer is thinking...';
  setTimeout(computerMove, 450);
}

function placeDisc(col, row, player) {
  board[col][row] = player;
  const cellEl = boardEl.querySelector('.c4-cell[data-col="' + col + '"][data-row="' + row + '"]');
  const disc = document.createElement('div');
  disc.className = 'c4-disc ' + player;
  cellEl.appendChild(disc);
}

function isBoardFull() {
  return board.every(col => col[ROWS - 1] !== null);
}

const DIRECTIONS = [
  [1, 0], [0, 1], [1, 1], [1, -1],
];

function checkWin(col, row, player) {
  for (const [dc, dr] of DIRECTIONS) {
    const line = [[col, row]];
    for (let step = 1; step < 4; step++) {
      const c = col + dc * step, r = row + dr * step;
      if (c < 0 || c >= COLS || r < 0 || r >= ROWS || board[c][r] !== player) break;
      line.push([c, r]);
    }
    for (let step = 1; step < 4; step++) {
      const c = col - dc * step, r = row - dr * step;
      if (c < 0 || c >= COLS || r < 0 || r >= ROWS || board[c][r] !== player) break;
      line.push([c, r]);
    }
    if (line.length >= 4) return line.slice(0, 4);
  }
  return null;
}

function wouldWin(col, player) {
  const row = lowestEmptyRow(col);
  if (row === -1) return null;
  board[col][row] = player;
  const line = checkWin(col, row, player);
  board[col][row] = null;
  return line ? row : null;
}

function computerMove() {
  if (gameOver) return;
  const validCols = [];
  for (let c = 0; c < COLS; c++) if (lowestEmptyRow(c) !== -1) validCols.push(c);
  if (validCols.length === 0) return;

  let chosenCol = null;

  for (const c of validCols) {
    if (wouldWin(c, COMPUTER) !== null) { chosenCol = c; break; }
  }
  if (chosenCol === null) {
    for (const c of validCols) {
      if (wouldWin(c, HUMAN) !== null) { chosenCol = c; break; }
    }
  }
  if (chosenCol === null) {
    const centerOrder = [3, 2, 4, 1, 5, 0, 6];
    for (const c of centerOrder) {
      if (validCols.includes(c)) { chosenCol = c; break; }
    }
  }

  const row = lowestEmptyRow(chosenCol);
  placeDisc(chosenCol, row, COMPUTER);
  const winLine = checkWin(chosenCol, row, COMPUTER);
  if (winLine) {
    endGame('lose', winLine);
    return;
  }
  if (isBoardFull()) {
    endGame('draw');
    return;
  }
  statusEl.textContent = 'Your turn — drop a red disc';
}

function endGame(result, winLine) {
  gameOver = true;
  if (winLine) {
    for (const [c, r] of winLine) {
      const cellEl = boardEl.querySelector('.c4-cell[data-col="' + c + '"][data-row="' + r + '"]');
      const disc = cellEl.querySelector('.c4-disc');
      if (disc) disc.classList.add('win-cell');
    }
  }
  if (result === 'win') {
    scores.human++;
    statusEl.textContent = 'You win! Four in a row.';
    statusEl.className = 'c4-status win';
  } else if (result === 'lose') {
    scores.computer++;
    statusEl.textContent = 'Computer wins this round.';
    statusEl.className = 'c4-status lose';
  } else {
    scores.draw++;
    statusEl.textContent = "It's a draw — board is full.";
    statusEl.className = 'c4-status draw';
  }
  updateScoreboard();
}

function updateScoreboard() {
  document.getElementById('score-human').textContent = scores.human;
  document.getElementById('score-computer').textContent = scores.computer;
  document.getElementById('score-draw').textContent = scores.draw;
}

newBtn.addEventListener('click', createBoard);

createBoard();

/* wdp-share:start */
(function () {
  var TITLE = 'Connect Four vs Computer', URL = 'https://webdevpuneet.com/ui-snippets/connect-four-game/';
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
    title: 'Connect Four vs Computer — Free HTML CSS JS Snippet',
    description: 'Playable 7x6 Connect Four with gravity drops, win detection in 4 directions and a heuristic AI opponent. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Connect Four vs Computer — Grid Gravity Drop, 4-Direction Win Detection & Heuristic AI Opponent',
      description: `Connect Four is a two-player strategy game built on a deceptively simple mechanic: discs fall under gravity into one of seven columns, stacking on top of whatever is already there, and the first player to line up four discs of their own colour horizontally, vertically, or diagonally wins. This snippet implements the full game as a genuine playable board — not a static mockup — complete with real gravity simulation, four-direction win checking, and a heuristic computer opponent that plays a credible game rather than moving randomly.

**The gravity model: a 2D array, not pixel maths**

The board is represented as a 7-column array of 6-row arrays, \`board[col][row]\`, where \`row 0\` is the bottom of the column. Instead of placing a disc exactly where the user clicked, \`lowestEmptyRow(col)\` scans the column from the bottom upward and returns the first \`null\` slot — that index is where the disc actually lands. This is the real mechanic behind Connect Four's gravity: clicking anywhere in a column always drops into the lowest available cell, and the CSS reinforces it visually by laying each column out with \`flex-direction: column-reverse\` so cell index 0 renders at the bottom. The falling animation itself is pure CSS — a \`.c4-disc\` starts at \`transform: scale(0) translateY(-140%)\` and animates to \`scale(1) translateY(0)\` with a bouncy \`cubic-bezier(0.34, 1.56, 0.64, 1)\` easing curve that gives the drop a satisfying overshoot.

**Four-direction win detection**

After every move, \`checkWin(col, row, player)\` walks outward from the just-placed disc along four axis pairs: horizontal \`[1, 0]\`, vertical \`[0, 1]\`, and both diagonals \`[1, 1]\` and \`[1, -1]\`. For each direction it counts matching discs going forward and then counts again going backward along the same axis, because a winning line can extend on either side of the disc that completed it. If the combined run reaches four or more, the coordinates of that line are returned and each winning cell gets a \`.win-cell\` class that adds a glowing green ring and a slow pulsing \`brightness\` animation, making the winning line immediately obvious.

**The heuristic AI: three priorities, no brute force**

The computer opponent does not use minimax or a deep search tree — it applies three ordered heuristics that are exactly how a competent human casual player thinks about the game. First, \`wouldWin(col, COMPUTER)\` temporarily drops a yellow disc into every legal column and re-runs \`checkWin\` to see whether that move produces an immediate four-in-a-row; if any column does, the computer takes it and wins on the spot. Second, if no winning move exists, the same check runs with \`HUMAN\` as the hypothetical player — if the human could win next turn by dropping into some column, the computer occupies that column itself to block it. Third, if neither an immediate win nor a necessary block exists, the computer falls back to positional strategy: it prefers columns in \`centerOrder = [3, 2, 4, 1, 5, 0, 6]\`, trying the centre column first and working outward. This reflects real Connect Four theory — the centre column participates in more possible four-in-a-row lines (horizontal, vertical, and both diagonals) than any edge column, so occupying it early creates more future winning threats.

**Session scoring and disc rendering**

A running tally of wins, losses, and draws persists across rounds in a \`scores\` object and renders in three coloured score pills above the board. Each disc is a separate absolutely-positioned \`<div>\` layered on top of an empty circular cell rather than a background-colour change, which is what makes the drop-in scale animation possible — the disc element itself animates in, rather than a colour simply appearing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drop a disc', text: 'Click anywhere in a column to drop a red disc into the lowest empty cell of that column. The disc animates in with a bouncy fall — you cannot click a specific row, only a column, exactly like the physical game.' },
        { title: 'Watch the computer respond', text: 'After your move, the status line reads "Computer is thinking..." for a short 450ms delay before computerMove() runs. This pause exists purely for pacing — the AI itself resolves instantly via the three-tier heuristic in wouldWin() and centerOrder.' },
        { title: 'Read the win highlight', text: 'When four discs connect in any of the four directions, checkWin() returns the exact winning coordinates and each of those four discs gets the .win-cell class, adding a glowing green ring and pulsing brightness so the winning line is unmistakable.' },
        { title: 'Track the session tally', text: 'The three score pills above the board (You / Draws / Computer) increment automatically via updateScoreboard() at the end of every round and persist in memory across "New Game" clicks within the same page load.' },
        { title: 'Start a fresh board', text: 'Click "New Game" to call createBoard(), which resets the board array to a 7x6 grid of nulls, clears all disc elements, and re-enables column clicks without touching the session score tally.' },
        { title: 'Customise the AI difficulty', text: 'To make the computer weaker, remove the wouldWin(c, HUMAN) blocking check so it only takes immediate wins. To make it stronger, extend wouldWin() to look two moves ahead, or add a check for moves that create a double-threat (two simultaneous three-in-a-rows).' },
      ],
    },
    features: [
      'Gravity drop physics: lowestEmptyRow() scans board[col] bottom-up to find the real landing cell',
      '2D array board state: board[col][row] with column-reverse flex layout matching the data model',
      'Four-direction win scan: checkWin() walks [1,0] [0,1] [1,1] [1,-1] forward and backward from the last move',
      'Heuristic AI: wouldWin() checks immediate win, then immediate block, then centerOrder positional preference',
      'CSS drop-in animation: scale(0) translateY(-140%) to scale(1) translateY(0) with bouncy cubic-bezier easing',
      'Winning-line highlight: glowing green ring plus pulseWin brightness animation on all four connected discs',
      'Session scoreboard: three coloured pills tracking wins, losses and draws across New Game resets',
      'Radial-gradient discs: red and yellow discs use radial-gradient for a glossy 3D piece appearance',
    ],
    useCases: [
      { icon: 'APP', title: 'Casual single-player board game for a portfolio or arcade section', desc: 'Connect Four is instantly recognisable and quick to play, making it an ideal casual-games addition to a personal site, portfolio, or product arcade page. This snippet is fully self-contained with no dependencies, so it drops into any page and runs a complete game loop against a genuinely competitive AI opponent, not a random-move placeholder.' },
      { icon: 'LEARN', title: 'Teaching 2D array game state and grid-based win detection', desc: 'The board[col][row] representation and the four-direction checkWin() scan are a clean, minimal example of how grid-based games track state and detect win conditions without a physics engine. This is directly transferable to teaching Tic-Tac-Toe, Gomoku, or Othello logic, where the same forward-and-backward line-walking pattern applies with different win lengths.' },
      { icon: 'CODE', title: 'Reference implementation for a lightweight heuristic game AI', desc: 'Developers building their own turn-based game AI can study the three-tier priority pattern here — win now, block now, else prefer strong positions — as a lightweight alternative to minimax or Monte Carlo tree search. It runs in constant time per move (7 columns times 4 directions), making it suitable for instant-response opponents on low-powered devices.' },
      { icon: 'FLOW', title: 'Interview or coding-challenge reference for grid game logic', desc: 'Connect Four win-checking is a common technical interview question. This snippet demonstrates a clean, tested solution to the four-direction adjacency problem plus an AI decision function, useful as a study reference or as the starting point for a take-home coding exercise involving 2D grid traversal.' },
      { icon: 'DESIGN', title: 'Reskinning for a branded promotional mini-game', desc: 'Swap the red and yellow disc gradients and the blue board background for two brand colours to turn this into a promotional mini-game embedded in a marketing landing page or email campaign follow-up page, similar in spirit to a [Memory Match Game](/ui-snippets/memory-match-game) used for engagement campaigns.' },
      { icon: 'APP', title: 'Two-tab hot-seat variant starting point', desc: 'Because the human-move and computer-move code paths are cleanly separated (handleColumnClick vs computerMove), this snippet is a straightforward base for converting into a local two-human hot-seat game — simply replace the setTimeout(computerMove) call with a second handleColumnClick-style listener bound to the alternate player colour.' },
      { icon: 'CODE', title: 'Related: Cave Flyer Game', desc: 'See the [Cave Flyer Game](/ui-snippets/cave-flyer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the computer opponent ever lose on purpose or play randomly?', a: 'No — the AI always follows the same three-tier priority: take an immediate winning move if one exists, otherwise block the human\'s immediate winning move if one exists, otherwise pick the most central available column. It never makes a deliberately weak or random move, so it plays a consistent, fair, moderately challenging game every round.' },
      { q: 'How does the win detection handle diagonal lines in both directions?', a: 'checkWin() iterates over four direction vectors: [1,0] for horizontal, [0,1] for vertical, [1,1] for the rising diagonal, and [1,-1] for the falling diagonal. For each vector it counts matching discs both forward and backward from the placed disc along that same axis, so a diagonal line that extends on either side of the new disc is still correctly detected as connected.' },
      { q: 'Can I make the AI harder by having it look further ahead?', a: 'Yes. The current wouldWin() helper only simulates one move ahead. To add lookahead, extend it into a minimax function that recursively simulates the human\'s best response to each computer move and scores the resulting position, then picks the column with the best worst-case outcome. A depth of 4-6 plies is typically enough to make Connect Four very difficult to beat for a casual player.' },
      { q: 'Why is the board represented as board[col][row] instead of board[row][col]?', a: 'Column-first indexing matches how the player actually interacts with the game — clicking a column and letting gravity decide the row. lowestEmptyRow(col) can then simply scan board[col] from index 0 upward without needing to transpose coordinates, which keeps both the drop logic and the CSS column-reverse layout consistent with the same mental model.' },
      { q: 'Does this snippet support two human players instead of vs computer?', a: 'Not out of the box, but it is a small change: remove the setTimeout(computerMove) call inside handleColumnClick and instead track whose turn it is with a currentPlayer variable that toggles between red and yellow after every successful drop, calling placeDisc and checkWin identically for both players.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's full HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how lowestEmptyRow() and the column-reverse CSS layout work together to simulate gravity, since that combination is the trickiest part of the whole implementation to reason about from code alone. It's also a great candidate for AI-assisted extension: ask it to add a minimax search with alpha-beta pruning to the computer opponent so it can look several moves ahead instead of only checking immediate wins and blocks, or ask it to implement a local two-player hot-seat mode by removing the setTimeout(computerMove) call. You could also ask the assistant to explain why centerOrder prioritises the middle columns from a game-theory perspective, or to add a move-undo feature that pops the last disc off both the board array and the DOM. Treat this as a working reference to interrogate and build on, not a finished black box.`,
      prompt: `Build a playable Connect Four game in plain HTML, CSS, and JavaScript against a heuristic computer opponent — no frameworks, no build step.

Requirements:
- A 7-column by 6-row grid where clicking a column drops a disc into the lowest currently-empty cell of that column via real gravity simulation (an internal 2D array, not pixel-position placement), animated with a bouncy CSS drop-in transition.
- Win detection that checks all four directions (horizontal, vertical, both diagonals) from the most recently placed disc, correctly counting matches in both directions along each axis so a line completed on either side of the new disc is detected.
- A computer opponent that, on each of its turns, first checks every legal column for an immediate winning move and takes it if one exists; otherwise checks whether the human has an immediate winning move available and blocks it; otherwise chooses the most central available column, since central columns participate in more potential four-in-a-row lines.
- A clear visual highlight (for example a glowing outline) applied specifically to the four discs that form a winning line, distinguishing a win from a normal board state at a glance.
- A running scoreboard tracking wins, losses, and draws across multiple rounds within the same session, updated automatically at the end of each game.
- A "New Game" control that resets the board state and all disc elements without resetting the session scoreboard.
- Prevent any interaction with full columns or with the board after a game has ended, and clearly communicate the game state (whose turn it is, thinking, win, loss, draw) via a status message.`,
    },
  },
};

export default connectFourGame;
