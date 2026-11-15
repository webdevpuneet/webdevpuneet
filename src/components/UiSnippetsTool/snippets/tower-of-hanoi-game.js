const towerOfHanoiGame = {
  id: 'tower-of-hanoi-game',
  title: 'Tower of Hanoi Game',
  category: 'games',
  html: `<div class="th-app">
  <div class="th-header">
    <h2>Tower of Hanoi</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Moves</span><span class="stat-val" id="th-moves">0</span></div>
      <div class="stat"><span class="stat-label">Minimum</span><span class="stat-val" id="th-min">7</span></div>
    </div>
  </div>

  <p class="th-goal">Move the whole stack to the last peg. A larger disk can never sit on a smaller one.</p>

  <div class="th-board" id="th-board"></div>

  <p class="th-feedback" id="th-feedback">Click a peg to pick up its top disk, then click another peg to drop it.</p>

  <div class="th-actions">
    <label class="th-select-wrap">
      Disks
      <select id="th-disks">
        <option value="3">3</option>
        <option value="4" selected>4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </label>
    <button class="ghost-btn" id="th-reset">Reset</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.th-app { max-width: 460px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.th-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.th-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 60px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 15px; font-weight: 800; color: #6366f1; }

.th-goal { font-size: 12.5px; color: #475569; text-align: center; line-height: 1.6; }

.th-board { width: 100%; display: flex; justify-content: space-around; align-items: flex-end; height: 200px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 12px 0; }
.th-peg { position: relative; width: 30%; height: 100%; display: flex; flex-direction: column-reverse; align-items: center; cursor: pointer; padding-bottom: 10px; }
.th-peg::before { content: ''; position: absolute; bottom: 10px; left: 50%; width: 6px; height: 160px; background: #cbd5e1; border-radius: 4px; transform: translateX(-50%); z-index: 0; }
.th-peg.selected::before { background: #6366f1; }
.th-base { position: absolute; bottom: 0; left: 8%; right: 8%; height: 8px; background: #e2e8f0; border-radius: 4px; }

.th-disk { position: relative; z-index: 1; height: 20px; border-radius: 6px; margin-bottom: 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: transform 0.1s; }
.th-peg.selected .th-disk:last-child { transform: translateY(-6px); }

.th-feedback { font-size: 12.5px; font-weight: 600; color: #64748b; text-align: center; min-height: 16px; }
.th-feedback.bad { color: #dc2626; }
.th-feedback.win { color: #16a34a; font-weight: 800; }

.th-actions { display: flex; gap: 10px; align-items: center; }
.th-select-wrap { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #475569; }
.th-select-wrap select { padding: 6px 8px; border-radius: 8px; border: 1.5px solid #e2e8f0; font-family: inherit; font-size: 12px; }
.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `const DISK_COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a78bfa'];

let numDisks = 4;
let pegs = [[], [], []];
let selectedPeg = null;
let moves = 0;
let won = false;

const boardEl = document.getElementById('th-board');
const movesEl = document.getElementById('th-moves');
const minEl = document.getElementById('th-min');
const feedback = document.getElementById('th-feedback');
const disksSelect = document.getElementById('th-disks');

function buildBoard() {
  boardEl.innerHTML = '';
  for (let p = 0; p < 3; p++) {
    const pegEl = document.createElement('div');
    pegEl.className = 'th-peg';
    pegEl.dataset.peg = String(p);
    pegEl.addEventListener('click', () => onPegClick(p));
    const base = document.createElement('div');
    base.className = 'th-base';
    pegEl.appendChild(base);
    boardEl.appendChild(pegEl);
  }
}

function renderPegs() {
  const pegEls = boardEl.querySelectorAll('.th-peg');
  pegEls.forEach((pegEl, p) => {
    pegEl.querySelectorAll('.th-disk').forEach((d) => d.remove());
    pegEl.classList.toggle('selected', selectedPeg === p);
    pegs[p].forEach((size) => {
      const disk = document.createElement('div');
      disk.className = 'th-disk';
      const widthPct = 30 + (size / numDisks) * 65;
      disk.style.width = widthPct + '%';
      disk.style.background = DISK_COLORS[(size - 1) % DISK_COLORS.length];
      pegEl.appendChild(disk);
    });
  });
}

function onPegClick(p) {
  if (won) return;
  if (selectedPeg === null) {
    if (pegs[p].length === 0) {
      feedback.textContent = 'That peg is empty — pick a peg with a disk.';
      feedback.className = 'th-feedback bad';
      return;
    }
    selectedPeg = p;
    feedback.textContent = 'Now click the peg to drop it on.';
    feedback.className = 'th-feedback';
    renderPegs();
    return;
  }

  if (selectedPeg === p) {
    selectedPeg = null;
    feedback.textContent = 'Selection cleared.';
    feedback.className = 'th-feedback';
    renderPegs();
    return;
  }

  const fromStack = pegs[selectedPeg];
  const toStack = pegs[p];
  const moving = fromStack[fromStack.length - 1];
  const target = toStack[toStack.length - 1];

  if (target !== undefined && moving > target) {
    feedback.textContent = 'A larger disk cannot sit on a smaller one.';
    feedback.className = 'th-feedback bad';
    selectedPeg = null;
    renderPegs();
    return;
  }

  toStack.push(fromStack.pop());
  selectedPeg = null;
  moves++;
  movesEl.textContent = String(moves);
  feedback.textContent = 'Nice move.';
  feedback.className = 'th-feedback';
  renderPegs();
  checkWin();
}

function checkWin() {
  if (pegs[2].length === numDisks) {
    won = true;
    feedback.textContent = 'Solved in ' + moves + ' moves! Minimum possible was ' + minMoves(numDisks) + '.';
    feedback.className = 'th-feedback win';
  }
}

function minMoves(n) {
  return Math.pow(2, n) - 1;
}

function reset() {
  numDisks = parseInt(disksSelect.value, 10);
  pegs = [[], [], []];
  for (let size = numDisks; size >= 1; size--) pegs[0].push(size);
  selectedPeg = null;
  moves = 0;
  won = false;
  movesEl.textContent = '0';
  minEl.textContent = String(minMoves(numDisks));
  feedback.textContent = 'Click a peg to pick up its top disk, then click another peg to drop it.';
  feedback.className = 'th-feedback';
  renderPegs();
}

disksSelect.addEventListener('change', reset);
document.getElementById('th-reset').addEventListener('click', reset);

buildBoard();
reset();

/* wdp-share:start */
(function () {
  var TITLE = 'Tower of Hanoi Game', URL = 'https://webdevpuneet.com/ui-snippets/tower-of-hanoi-game/';
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
    title: 'Tower of Hanoi Game — Free HTML CSS JS Snippet',
    description: 'A playable click-to-move Tower of Hanoi puzzle with a live move counter, minimum-moves formula and configurable disk count. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Tower of Hanoi Game — Click-to-Move Peg Puzzle with 2^n - 1 Minimum-Moves Tracking',
      description: `Tower of Hanoi is one of the most famous puzzles in computer science: move an entire stack of differently-sized disks from one peg to another, using a spare peg, moving one disk at a time and never placing a larger disk on top of a smaller one. It is the canonical example used to teach recursion, and its minimum solution length follows the exact formula \`2^n - 1\` for \`n\` disks. This snippet implements the puzzle as a click-to-select, click-to-drop interaction — no drag-and-drop required — along with move counting and a live minimum-moves reference for whatever disk count is selected.

**Representing the board as three stacks**

The board state lives in a \`pegs\` array of three arrays, \`pegs[0]\`, \`pegs[1]\`, \`pegs[2]\`, each holding disk sizes from bottom to top. \`reset()\` populates the first peg with every size from \`numDisks\` down to \`1\`, pushed in descending order so the largest disk ends up at index 0 (the visual bottom) and the smallest ends up last (the visual top) — matching how \`Array.push\`/\`pop\` naturally model a stack where the "top" is always the last element.

**Click-to-select instead of drag-and-drop**

\`onPegClick(p)\` implements a two-click interaction: the first click on a non-empty peg sets \`selectedPeg\` and highlights it; a second click on a *different* peg attempts the move, while clicking the *same* peg again deselects it. This avoids the complexity and touch-device inconsistency of implementing real drag-and-drop for stacked, differently-sized elements, while still feeling direct and immediate to use.

**The one rule that defines the entire puzzle**

Before completing a move, the code compares \`moving\` (the top disk size of the source peg) against \`target\` (the top disk size of the destination peg, or \`undefined\` if empty). The move is rejected with visible feedback if \`target !== undefined && moving > target\` — in plain terms, if the destination isn't empty and the disk being placed is bigger than what's already there. This single comparison is the entire legality rule of Tower of Hanoi; every other mechanic in the game exists just to support it.

**Live minimum-moves reference via 2^n - 1**

\`minMoves(n)\` returns \`Math.pow(2, n) - 1\`, the proven-optimal number of moves required to solve an \`n\`-disk Hanoi puzzle (3 disks: 7 moves, 4 disks: 15 moves, and so on, growing exponentially). This value is shown live in the header stats and again in the win message, so the player has a concrete, mathematically exact benchmark to compare their own move count against — turning an abstract recursive result into something tangible during play.

**Disk-count difficulty and rendering**

The disk-count \`<select>\` lets the player choose between 3 and 6 disks, calling \`reset()\` on change to rebuild the stacks, recompute the minimum-moves target, and clear all game state. Disk widths are rendered proportionally (\`30 + (size / numDisks) * 65\` percent) so larger disk counts still render a clearly readable size gradient across the stack.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a peg to pick up its top disk', text: 'Clicking a peg with disks on it sets selectedPeg and highlights the peg and its top disk.' },
        { title: 'Click a different peg to drop it', text: 'The move only succeeds if the destination peg is empty or its top disk is larger than the one you are moving — enforced by the moving > target check.' },
        { title: 'Move the whole stack to the last peg', text: 'checkWin() watches pegs[2].length === numDisks, so the puzzle is solved the instant every disk sits on the rightmost peg.' },
        { title: 'Compare against the minimum', text: 'The header shows the proven-optimal move count from minMoves(n) = 2^n - 1 for the current disk count, so you can measure your own efficiency.' },
        { title: 'Change the disk count', text: 'Use the Disks dropdown to pick 3 to 6 disks — this calls reset() and recalculates the minimum-moves target automatically.' },
        { title: 'Reset at any time', text: 'Click Reset to rebuild the starting stack on the first peg and clear the move counter without changing the disk count.' },
      ],
    },
    features: [
      'Board state modeled as three stack arrays with disk sizes from bottom to top',
      'Click-to-select, click-to-drop interaction — no drag-and-drop required, fully touch-friendly',
      'A single comparison (moving > target) enforces the entire no-larger-on-smaller legality rule',
      'Live move counter alongside the mathematically exact minimum-moves value via 2^n - 1',
      'Configurable disk count from 3 to 6 via a dropdown, rebuilding the board and target on change',
      'Proportional disk-width rendering keeps size differences readable at any disk count',
      'Clear inline feedback messages for illegal moves, empty-peg clicks, and win state',
      'Selected-peg highlighting shows exactly which disk is currently picked up',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching recursion and algorithmic complexity', desc: 'Tower of Hanoi is the textbook recursion example. Pair this playable version with a recursive solver walkthrough to make the 2^n - 1 growth rate concrete rather than abstract.' },
      { icon: 'GAME', title: 'Logic puzzle collections', desc: 'A structurally different puzzle from stacking or matching games — this one rewards planning several moves ahead, similar in spirit to the [maze runner game](/ui-snippets/maze-runner-game/) but with a stack-based constraint instead of pathfinding.' },
      { icon: 'CODE', title: 'Reference implementation of stack-based state', desc: 'The pegs array of three stacks, manipulated purely with push and pop, is a clean, minimal example of modeling constrained state transitions in vanilla JavaScript.' },
      { icon: 'APP', title: 'Interview and CS-education demo widget', desc: 'Embed this in a coding-interview prep site or CS course page as an interactive companion to a Tower of Hanoi recursion lesson.' },
      { icon: 'DESIGN', title: 'Peg-and-stack visual pattern reference', desc: 'The tapered disk stack rendering is reusable for any UI that needs to visualize ordered, size-constrained stacking, such as a priority queue or z-index layering demo.' },
    ],
    faqs: [
      { q: 'What is the one rule that determines whether a move is legal?', a: 'A move is illegal only if the destination peg is not empty and its top disk is smaller than the disk being moved. This is checked with a single comparison: target !== undefined && moving > target, where moving and target are the top disk sizes of the source and destination pegs.' },
      { q: 'How is the minimum number of moves calculated?', a: 'minMoves(n) returns Math.pow(2, n) - 1, the proven-optimal solution length for an n-disk Tower of Hanoi puzzle. For 4 disks (the default), that is 15 moves; for 6 disks, 63 moves.' },
      { q: 'Why click-to-select instead of drag-and-drop?', a: 'Click-to-select (pick a source peg, then a destination peg) is simpler to implement correctly across mouse and touch devices than drag-and-drop with stacked, variably-sized elements, while still feeling direct — click once to pick up, click again to place.' },
      { q: 'How do I change the number of disks?', a: 'Use the Disks dropdown in the actions row. Selecting a new value calls reset(), which rebuilds all three peg stacks from scratch on the first peg and recalculates the minimum-moves target for that disk count.' },
      { q: 'Can I add an auto-solve or hint feature?', a: 'Yes — implement the classic recursive Hanoi algorithm (move n-1 disks to the spare peg, move the largest disk to the target, move the n-1 disks from the spare peg to the target) and step through the resulting move list, calling the same peg-to-peg move logic used by onPegClick.' },
      { q: 'What happens if I click an already-selected peg again?', a: 'Clicking the currently selected peg a second time deselects it (selectedPeg is set back to null) instead of attempting an invalid same-peg move, and the feedback message confirms the selection was cleared.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why moving > target is sufficient to enforce every rule of Tower of Hanoi, and how the pegs array of three stacks models the board state so cleanly with just push and pop. It's also a great candidate for extension — ask the assistant to implement the classic recursive solver and animate it move-by-move as an auto-solve demonstration, add a step-by-step hint system based on that same recursive algorithm, or add keyboard controls (arrow keys plus Enter) as an alternative to clicking pegs.`,
      prompt: `Build a Tower of Hanoi puzzle game in plain HTML, CSS, and JavaScript — no libraries, no drag-and-drop, click-to-select interaction only.

Requirements:
- Model the board as three stacks (arrays) of disk sizes, with the puzzle starting fully stacked in descending size order (largest at the bottom) on the first peg, and the goal being to move the entire stack onto the third peg.
- Clicking a peg with at least one disk selects it as the source and visually highlights it; clicking the same peg again deselects it; clicking a different peg attempts to move the top disk from the selected source peg onto it.
- A move must be rejected with a clear inline message if the destination peg is not empty and its top disk is smaller than the disk being moved — this is the one rule of the game and must be enforced by a simple comparison between the two top disk sizes.
- Track and display a live move counter that increments only on legal, completed moves.
- Compute and display the mathematically optimal minimum number of moves for the current number of disks using the formula 2^n - 1, and show it next to the live move counter for comparison.
- Add a disk-count selector (e.g. 3 to 6 disks) that rebuilds the board, resets the move counter, and recalculates the minimum-moves value when changed, plus a separate Reset button that restarts the current disk count without changing it.
- Detect the win condition the instant all disks are stacked correctly on the third peg, and show a message confirming the puzzle was solved along with how many moves it took compared to the optimal count.`,
    },
  },
};

export default towerOfHanoiGame;
