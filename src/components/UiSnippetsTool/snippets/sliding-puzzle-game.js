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
      { icon: 'CODE', title: 'Related: Tower Stack Timing Game', desc: 'See the [Tower Stack Timing Game](/ui-snippets/tower-stack-timing-game/) for a related games pattern worth pairing with this one.' },
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
