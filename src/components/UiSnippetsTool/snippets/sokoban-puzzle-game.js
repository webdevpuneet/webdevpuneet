const sokobanPuzzleGame = {
  id: 'sokoban-puzzle-game',
  title: 'Sokoban Box Pushing Game',
  category: 'games',
  html: `<div class="sk-app">
  <div class="sk-header">
    <h2>Sokoban</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Level</span><span class="stat-val" id="sk-level">1/3</span></div>
      <div class="stat"><span class="stat-label">Moves</span><span class="stat-val" id="sk-moves">0</span></div>
    </div>
  </div>

  <p class="sk-goal">Push every crate onto a target. Use arrow keys or the on-screen pad. You can push but never pull.</p>

  <div class="sk-board" id="sk-board" tabindex="0"></div>

  <p class="sk-feedback" id="sk-feedback">Click the board, then use arrow keys.</p>

  <div class="sk-pad" id="sk-pad">
    <button class="pad-btn pad-up" data-dir="up" aria-label="Up">▲</button>
    <button class="pad-btn pad-left" data-dir="left" aria-label="Left">◀</button>
    <button class="pad-btn pad-down" data-dir="down" aria-label="Down">▼</button>
    <button class="pad-btn pad-right" data-dir="right" aria-label="Right">▶</button>
  </div>

  <div class="sk-actions">
    <button class="ghost-btn" id="sk-undo">Undo</button>
    <button class="ghost-btn" id="sk-reset">Reset level</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.sk-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }

.sk-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.sk-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 56px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 14px; font-weight: 800; color: #6366f1; }

.sk-goal { font-size: 12.5px; color: #475569; text-align: center; line-height: 1.6; }

.sk-board { display: grid; gap: 2px; background: #1e293b; padding: 6px; border-radius: 12px; outline: none; }
.sk-board:focus { box-shadow: 0 0 0 3px rgba(99,102,241,0.35); }

.sk-cell { width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.sk-wall { background: #475569; }
.sk-floor { background: #f1f5f9; }
.sk-target { background: #e0e7ff; }
.sk-box { background: #f1f5f9; }
.sk-box .icon { width: 22px; height: 22px; border-radius: 4px; background: #b45309; box-shadow: inset 0 0 0 2px #92400e; }
.sk-box-on-target .icon { background: #16a34a; box-shadow: inset 0 0 0 2px #15803d; }
.sk-player .icon { width: 18px; height: 18px; border-radius: 50%; background: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.25); }

.sk-feedback { font-size: 12px; font-weight: 600; color: #64748b; text-align: center; min-height: 16px; }
.sk-feedback.win { color: #16a34a; font-weight: 800; }

.sk-pad { display: grid; grid-template-columns: repeat(3, 40px); grid-template-rows: repeat(2, 40px); gap: 4px; justify-content: center; }
.pad-btn { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; cursor: pointer; color: #475569; }
.pad-btn:hover { border-color: #6366f1; color: #6366f1; }
.pad-up { grid-column: 2; grid-row: 1; }
.pad-left { grid-column: 1; grid-row: 2; }
.pad-down { grid-column: 2; grid-row: 2; }
.pad-right { grid-column: 3; grid-row: 2; }

.sk-actions { display: flex; gap: 10px; }
.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `// Level format: # wall, space floor, . target, $ box, * box-on-target, @ player, + player-on-target
const LEVELS = [
  [
    '#######',
    '#     #',
    '#  $  #',
    '# .@. #',
    '#  $  #',
    '#  .  #',
    '#######',
  ],
  [
    '########',
    '#  .   #',
    '# $$   #',
    '#  @.  #',
    '#   $  #',
    '#   .  #',
    '########',
  ],
  [
    '#########',
    '#   .   #',
    '#  $$$  #',
    '# ..@.. #',
    '#  $ $  #',
    '#   .   #',
    '#########',
  ],
];

let levelIndex = 0;
let grid = [];
let player = { r: 0, c: 0 };
let boxes = [];
let targets = [];
let walls = [];
let moves = 0;
let history = [];
let won = false;

const boardEl = document.getElementById('sk-board');
const feedback = document.getElementById('sk-feedback');
const levelEl = document.getElementById('sk-level');
const movesEl = document.getElementById('sk-moves');

function key(r, c) { return r + ',' + c; }

function parseLevel(idx) {
  const rows = LEVELS[idx];
  walls = new Set();
  targets = new Set();
  boxes = new Set();
  let rowCount = rows.length;
  let colCount = Math.max(...rows.map((row) => row.length));

  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === '#') walls.add(key(r, c));
      if (ch === '.' || ch === '*' || ch === '+') targets.add(key(r, c));
      if (ch === '$' || ch === '*') boxes.add(key(r, c));
      if (ch === '@' || ch === '+') player = { r, c };
    }
  });

  return { rowCount, colCount };
}

function isWall(r, c) { return walls.has(key(r, c)); }
function isBox(r, c) { return boxes.has(key(r, c)); }
function isTarget(r, c) { return targets.has(key(r, c)); }

function render(dims) {
  boardEl.style.gridTemplateColumns = 'repeat(' + dims.colCount + ', 30px)';
  boardEl.innerHTML = '';
  for (let r = 0; r < dims.rowCount; r++) {
    for (let c = 0; c < dims.colCount; c++) {
      const cell = document.createElement('div');
      if (isWall(r, c)) {
        cell.className = 'sk-cell sk-wall';
      } else {
        cell.className = 'sk-cell ' + (isTarget(r, c) ? 'sk-target' : 'sk-floor');
        if (isBox(r, c)) {
          cell.classList.add(isTarget(r, c) ? 'sk-box-on-target' : 'sk-box');
          const icon = document.createElement('div');
          icon.className = 'icon';
          cell.appendChild(icon);
        } else if (player.r === r && player.c === c) {
          cell.classList.add('sk-player');
          const icon = document.createElement('div');
          icon.className = 'icon';
          cell.appendChild(icon);
        }
      }
      boardEl.appendChild(cell);
    }
  }
}

const DIRS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

function attemptMove(dir) {
  if (won) return;
  const [dr, dc] = DIRS[dir];
  const nr = player.r + dr;
  const nc = player.c + dc;

  if (isWall(nr, nc)) return;

  let pushedBoxFrom = null;
  let pushedBoxTo = null;

  if (isBox(nr, nc)) {
    const br = nr + dr;
    const bc = nc + dc;
    if (isWall(br, bc) || isBox(br, bc)) {
      feedback.textContent = 'Nowhere to push that crate.';
      feedback.className = 'sk-feedback';
      return;
    }
    pushedBoxFrom = key(nr, nc);
    pushedBoxTo = key(br, bc);
    boxes.delete(pushedBoxFrom);
    boxes.add(pushedBoxTo);
  }

  history.push({ player: { ...player }, pushedBoxFrom, pushedBoxTo });
  player = { r: nr, c: nc };
  moves++;
  movesEl.textContent = String(moves);
  feedback.textContent = 'Keep going.';
  feedback.className = 'sk-feedback';

  render(currentDims);
  checkWin();
}

function undo() {
  if (won || history.length === 0) return;
  const last = history.pop();
  player = last.player;
  if (last.pushedBoxFrom) {
    boxes.delete(last.pushedBoxTo);
    boxes.add(last.pushedBoxFrom);
  }
  moves = Math.max(0, moves - 1);
  movesEl.textContent = String(moves);
  render(currentDims);
}

function checkWin() {
  const allOnTarget = [...boxes].every((b) => targets.has(b));
  if (allOnTarget) {
    won = true;
    feedback.textContent = 'Level cleared in ' + moves + ' moves!';
    feedback.className = 'sk-feedback win';
    setTimeout(() => {
      if (levelIndex < LEVELS.length - 1) {
        levelIndex++;
        loadLevel();
      }
    }, 1100);
  }
}

let currentDims = null;

function loadLevel() {
  currentDims = parseLevel(levelIndex);
  moves = 0;
  history = [];
  won = false;
  levelEl.textContent = (levelIndex + 1) + '/' + LEVELS.length;
  movesEl.textContent = '0';
  feedback.textContent = 'Click the board, then use arrow keys.';
  feedback.className = 'sk-feedback';
  render(currentDims);
}

boardEl.addEventListener('keydown', (e) => {
  const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
  if (map[e.key]) {
    e.preventDefault();
    attemptMove(map[e.key]);
  }
});

document.getElementById('sk-pad').addEventListener('click', (e) => {
  const btn = e.target.closest('.pad-btn');
  if (btn) attemptMove(btn.dataset.dir);
  boardEl.focus();
});

document.getElementById('sk-undo').addEventListener('click', undo);
document.getElementById('sk-reset').addEventListener('click', loadLevel);

loadLevel();

/* wdp-share:start */
(function () {
  var TITLE = 'Sokoban Box Pushing Game', URL = 'https://webdevpuneet.com/ui-snippets/sokoban-puzzle-game/';
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
    title: 'Sokoban Box Pushing Game — Free HTML CSS JS Snippet',
    description: 'A grid-based warehouse crate-pushing puzzle with push-only physics, undo history, multi-level progression and keyboard controls. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Sokoban Box Pushing Game — Grid Puzzle with Push-Only Physics and Undo History',
      description: `Sokoban ("warehouse keeper" in Japanese) is a classic grid-based puzzle: push crates onto target squares by walking into them, one at a time, in a warehouse full of walls. The core constraint that makes it a genuine puzzle rather than a maze is that crates can only ever be pushed, never pulled — a bad push can permanently trap a crate against a wall. This snippet implements a complete playable version in vanilla JavaScript: level parsing from plain text grids, push physics with full collision checking, an undo stack, and automatic progression through multiple bundled levels.

**Levels as plain text grids**

Each entry in \`LEVELS\` is an array of equal-purpose strings using standard Sokoban notation: \`#\` for a wall, a space for open floor, \`.\` for a target square, \`$\` for a crate, \`*\` for a crate already on a target, \`@\` for the player, and \`+\` for the player standing on a target. \`parseLevel()\` walks every character of every row once and sorts each symbol into a \`Set\` — \`walls\`, \`targets\`, or \`boxes\` — keyed by a \`"r,c"\` string, plus the player's starting \`{ r, c }\` position. Using plain text for level data means new levels can be authored by just typing a grid, with no separate level editor or JSON schema required.

**Push physics: the collision chain**

\`attemptMove(dir)\` is the entire physics engine. It first checks whether the player's destination cell is a wall — if so, the move is silently rejected. If the destination holds a crate, it computes where *that* crate would land one more step in the same direction, and rejects the whole move if that landing cell is a wall or already holds another crate (\`isWall(br, bc) || isBox(br, bc)\`) — this is what prevents pushing a crate into another crate or into a wall. Only after both checks pass does the function actually mutate state: the crate's key moves from its old position to its new one in the \`boxes\` Set, and the player advances into the crate's old cell.

**An undo stack instead of a full board-state history**

Rather than snapshotting the entire board after every move, \`history\` stores only the minimal delta needed to reverse one step: the player's previous position, plus \`pushedBoxFrom\`/\`pushedBoxTo\` keys if a crate moved on that turn (both \`null\` if it didn't). \`undo()\` pops the most recent entry, restores the player position, and — if a crate was involved — deletes it from its new key and re-adds it at its old key. This keeps undo cheap regardless of board size and trivially supports unlimited undo depth since every entry is small and independent.

**Win detection and auto-advance**

\`checkWin()\` runs after every completed move and checks whether every key currently in the \`boxes\` Set also exists in the \`targets\` Set — the moment that's true, every crate is correctly placed regardless of which specific crate sits on which specific target. On a win, the game shows the final move count and, after a short delay, automatically advances to the next bundled level via \`levelIndex++\` and a fresh \`loadLevel()\` call, or stays on the final level if none remain.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the board to focus it', text: 'The board is a focusable div; clicking it (or an on-screen pad button) lets arrow-key input register via the keydown listener.' },
        { title: 'Push crates onto targets', text: 'Move with arrow keys or the on-screen directional pad. Walking into a crate pushes it one cell further in the same direction, if that cell is open.' },
        { title: 'Watch for dead-end pushes', text: 'A push is rejected outright if the crate would land on a wall or another crate — attemptMove() checks this before allowing the move at all, so you cannot lock a crate in place by accident from the push itself.' },
        { title: 'Undo a bad move', text: 'Click Undo to pop the last entry off the history stack, restoring the player position and reversing any crate push from that turn.' },
        { title: 'Clear the level', text: 'checkWin() watches whether every crate key also exists in the targets set. Getting every crate onto a target completes the level and auto-advances to the next one.' },
        { title: 'Add your own levels', text: 'Append a new grid of equal-length strings to the LEVELS array using #, space, ., $, *, @, and + — no additional configuration is needed.' },
      ],
    },
    features: [
      'Levels authored as plain-text grids using standard Sokoban notation (#, ., $, @, *, +)',
      'Full push-physics collision chain: rejects pushes into walls or other crates before mutating state',
      'Delta-based undo stack stores only the player move and any crate push per turn, not full board snapshots',
      'checkWin() via Set membership — every crate key must also be a target key, order-independent',
      'Automatic progression to the next bundled level a short delay after clearing the current one',
      'Both keyboard arrow-key controls and an on-screen directional pad for touch devices',
      'Distinct visual states for crate-on-floor versus crate-on-target for at-a-glance progress',
      'Reset button reloads the current level from its original text grid at any time',
    ],
    useCases: [
      { icon: 'GAME', title: 'Spatial-reasoning puzzle collections', desc: 'A genuinely different mechanic from pathfinding games like the [maze runner game](/ui-snippets/maze-runner-game/) — Sokoban rewards planning a full push sequence in advance, since bad pushes can be irreversible without undo.' },
      { icon: 'LEARN', title: 'Teaching grid-based collision detection', desc: 'The chained wall/crate collision check in attemptMove() is a compact, readable example of validating a multi-object move before committing any state change.' },
      { icon: 'CODE', title: 'Reference implementation of delta-based undo', desc: 'Storing only the minimal reversible change per action, instead of full state snapshots, is a broadly useful pattern for any undo/redo system beyond games.' },
      { icon: 'APP', title: 'Level-based puzzle widget for a games hub', desc: 'The plain-text level format makes it trivial to bundle dozens of hand-authored levels without a level editor, ideal for a puzzle-of-the-day style feature.' },
      { icon: 'DESIGN', title: 'Grid-cell state visualization reference', desc: 'The layered cell classes (floor, target, box, box-on-target, player) demonstrate a clean way to represent multiple overlapping states per grid cell in CSS.' },
    ],
    faqs: [
      { q: 'Can crates be pulled as well as pushed?', a: 'No. The player can only walk into a crate to push it one cell further in the same direction; there is no pull mechanic, matching the classic Sokoban rule set. This means a poorly planned push can trap a crate against a wall or corner with no way to free it except undo.' },
      { q: 'What stops a crate from being pushed into a wall or another crate?', a: 'attemptMove() computes the crate\'s would-be landing cell one step past its current position and checks isWall(br, bc) || isBox(br, bc) before allowing the move. If either is true, the entire move (including the player\'s own step) is rejected and neither the player nor the crate moves.' },
      { q: 'How does undo work without storing the whole board each turn?', a: 'Each history entry stores only the player\'s previous position and, if a crate was pushed that turn, its previous and new key. undo() reverses exactly that delta: it restores the player position and moves the pushed crate\'s key back to its previous position in the boxes Set.' },
      { q: 'How is a win detected?', a: 'checkWin() checks that every key in the boxes Set also exists in the targets Set, using [...boxes].every(b => targets.has(b)). This is true regardless of which specific crate ends up on which specific target, as long as every crate is on some target.' },
      { q: 'How do I add a new level?', a: 'Append a new array of equal-length strings to the LEVELS array using # for walls, space for floor, . for targets, $ for crates, * for a crate already on a target, and @ (or + for on a target) for the player start position. No other code changes are required.' },
      { q: 'Why does the game auto-advance to the next level after a win?', a: 'checkWin() calls loadLevel() again with an incremented levelIndex inside a short setTimeout after showing the "Level cleared" message, so players can chain through the bundled level set without clicking a manual next-level button — it simply stays on the final level if none remain.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how attemptMove() chains its wall and crate collision checks before mutating any state, and why the undo stack only needs to store a small delta per move rather than a full board snapshot. It's also a strong candidate for extension — ask the assistant to add a level editor that lets you paint walls, crates, and targets directly on the grid and export the resulting text-grid level string, add a move-counter-based star rating per level, or implement a breadth-first-search solvability checker that validates a hand-authored level can actually be won before it ships.`,
      prompt: `Build a Sokoban-style box-pushing puzzle game in plain HTML, CSS, and JavaScript — no libraries, no backend.

Requirements:
- Represent each level as a plain-text grid using standard Sokoban notation: a wall character, a floor character (or space), a target character, a crate character, a crate-on-target character, and player-start characters for on-floor and on-target. Parse this text grid into wall, target, and crate coordinate sets plus a starting player position.
- Support arrow-key movement (with a focusable board element) and an on-screen directional pad for touch devices, both routed through one shared move function.
- Implement full push physics: moving into an empty floor cell just moves the player; moving into a crate must check whether the cell one further step in the same direction is free (not a wall and not another crate) before allowing the push, and must reject the entire move (player included) if that check fails — crates can only ever be pushed, never pulled.
- Implement an undo stack that stores, for each completed move, only the player's previous position and (if a crate was pushed) that crate's previous and new position — not a full board snapshot — and can reverse any number of moves in sequence.
- Detect a win the moment every crate coordinate is also a target coordinate, regardless of which specific crate ended up on which target, and show a completion message with the total move count.
- Bundle at least three levels of increasing difficulty as separate text grids in an array, and automatically advance to the next level a short moment after the current one is cleared.
- Add a Reset button that reloads the current level from its original text grid, discarding all progress and undo history for that attempt.`,
    },
  },
};

export default sokobanPuzzleGame;
