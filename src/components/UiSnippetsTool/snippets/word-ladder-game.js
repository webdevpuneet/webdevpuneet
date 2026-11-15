const wordLadderGame = {
  id: 'word-ladder-game',
  title: 'Word Ladder Game',
  category: 'games',
  html: `<div class="ladder-app">
  <div class="ladder-header">
    <h2>Word Ladder</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Moves</span><span class="stat-val" id="stat-moves">0</span></div>
      <div class="stat"><span class="stat-label">Best</span><span class="stat-val" id="stat-best">--</span></div>
    </div>
  </div>

  <p class="goal">Turn <strong id="start-word">COLD</strong> into <strong id="end-word">WARM</strong>, one letter at a time. Every step must be a real word.</p>

  <div class="trail" id="trail"></div>

  <form id="guess-form" class="guess-form" autocomplete="off">
    <input type="text" id="guess-input" maxlength="4" placeholder="Type the next word" spellcheck="false" />
    <button type="submit">Add step</button>
  </form>

  <p class="feedback" id="feedback">Change exactly one letter to start.</p>

  <div class="actions">
    <button class="ghost-btn" id="hint-btn">Reveal a hint</button>
    <button class="ghost-btn" id="new-btn">New puzzle</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.ladder-app { max-width: 440px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.ladder-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.ladder-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 60px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 15px; font-weight: 800; color: #6366f1; }

.goal { font-size: 13.5px; color: #475569; text-align: center; line-height: 1.6; }
.goal strong { color: #1e293b; letter-spacing: 0.06em; font-family: 'SFMono-Regular', Consolas, monospace; }

.trail { width: 100%; display: flex; flex-direction: column; gap: 6px; }
.trail-word {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 14px; border-radius: 10px;
  background: #fff; border: 1.5px solid #e2e8f0;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 15px; font-weight: 700; letter-spacing: 0.08em; color: #1e293b;
}
.trail-word.start { border-color: #6366f1; background: #eef2ff; }
.trail-word.end { border-color: #16a34a; background: #f0fdf4; color: #15803d; }
.trail-word .idx { font-size: 10px; font-weight: 700; color: #94a3b8; min-width: 16px; }
.trail-word .diff-letter { color: #6366f1; }
.trail-word.end .diff-letter { color: #16a34a; }

.guess-form { width: 100%; display: flex; gap: 8px; }
#guess-input {
  flex: 1; padding: 11px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0;
  font-family: 'SFMono-Regular', Consolas, monospace; font-size: 15px; letter-spacing: 0.08em;
  text-transform: uppercase; color: #1e293b; outline: none;
}
#guess-input:focus { border-color: #6366f1; }
.guess-form button[type="submit"] {
  background: #1e293b; color: #f1f5f9; border: none; border-radius: 10px;
  padding: 0 18px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
}
.guess-form button[type="submit"]:hover { background: #334155; }

.feedback { font-size: 12.5px; font-weight: 600; color: #64748b; text-align: center; min-height: 16px; }
.feedback.good { color: #16a34a; }
.feedback.bad { color: #dc2626; }
.feedback.win { color: #6366f1; font-weight: 800; }

.actions { display: flex; gap: 10px; }
.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `// A small dictionary of connected four-letter word ladders.
// Each puzzle is a known solvable chain from start to end.
const PUZZLES = [
  { chain: ['COLD','CORD','WORD','WARD','WARM'], dict: ['COLD','CORD','WORD','WARD','WARM','CARD','BOLD','BORD','WARE','WORE','CORE','GOLD','FOLD','HOLD','BARD','YARD'] },
  { chain: ['CAT','COT','COG','DOG'], dict: ['CAT','COT','COG','DOG','CAR','CAP','CUT','COP','DOT','BOG','BAT','BAG','BOB'] },
  { chain: ['HEAD','HEAL','TEAL','TALL','TAIL'], dict: ['HEAD','HEAL','TEAL','TALL','TAIL','HEAT','HEAR','TEAR','TELL','TILL','TALE','HEAP'] },
  { chain: ['LEAD','LEAP','HEAP','HEAT','HEAR'], dict: ['LEAD','LEAP','HEAP','HEAT','HEAR','READ','REAP','LEAN','MEAN','MEAT'] },
  { chain: ['PORT','SORT','SORE','CORE','CARE'], dict: ['PORT','SORT','SORE','CORE','CARE','PART','PARK','SORE','SORT','CART','BORE','BARE'] },
];

let puzzleIndex = 0;
let chain = [];
let dict = new Set();
let trail = [];
let moves = 0;
let best = null;
let solved = false;

const trailEl = document.getElementById('trail');
const feedback = document.getElementById('feedback');
const input = document.getElementById('guess-input');
const form = document.getElementById('guess-form');
const movesEl = document.getElementById('stat-moves');
const bestEl = document.getElementById('stat-best');
const startWordEl = document.getElementById('start-word');
const endWordEl = document.getElementById('end-word');

function diffCount(a, b) {
  if (a.length !== b.length) return Infinity;
  let n = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
  return n;
}

function renderTrail() {
  trailEl.innerHTML = '';
  trail.forEach((word, i) => {
    const row = document.createElement('div');
    row.className = 'trail-word';
    if (i === 0) row.classList.add('start');
    if (solved && i === trail.length - 1) row.classList.add('end');

    const idx = document.createElement('span');
    idx.className = 'idx';
    idx.textContent = i + 1;
    row.appendChild(idx);

    const prev = i > 0 ? trail[i - 1] : null;
    const letters = document.createElement('span');
    word.split('').forEach((ch, ci) => {
      const span = document.createElement('span');
      if (prev && prev[ci] !== ch) span.className = 'diff-letter';
      span.textContent = ch;
      letters.appendChild(span);
    });
    row.appendChild(letters);
    trailEl.appendChild(row);
  });
}

function loadPuzzle(idx) {
  const p = PUZZLES[idx % PUZZLES.length];
  chain = p.chain;
  dict = new Set(p.dict.map(w => w.toUpperCase()));
  trail = [chain[0]];
  moves = 0;
  solved = false;
  startWordEl.textContent = chain[0];
  endWordEl.textContent = chain[chain.length - 1];
  input.maxLength = chain[0].length;
  input.value = '';
  input.disabled = false;
  feedback.textContent = 'Change exactly one letter to start.';
  feedback.className = 'feedback';
  movesEl.textContent = '0';
  renderTrail();
}

function submitGuess(raw) {
  if (solved) return;
  const word = raw.trim().toUpperCase();
  const current = trail[trail.length - 1];
  const target = chain[chain.length - 1];

  if (!word) return;
  if (word.length !== current.length) {
    feedback.textContent = \`Must be \${current.length} letters long.\`;
    feedback.className = 'feedback bad';
    return;
  }
  if (word === current) {
    feedback.textContent = 'That is the same word — change one letter.';
    feedback.className = 'feedback bad';
    return;
  }
  const d = diffCount(current, word);
  if (d !== 1) {
    feedback.textContent = \`Exactly one letter must change (you changed \${d}).\`;
    feedback.className = 'feedback bad';
    return;
  }
  if (!dict.has(word)) {
    feedback.textContent = \`"\${word}" is not in the accepted word list for this puzzle.\`;
    feedback.className = 'feedback bad';
    return;
  }
  if (trail.includes(word)) {
    feedback.textContent = 'You already used that word in this ladder.';
    feedback.className = 'feedback bad';
    return;
  }

  trail.push(word);
  moves++;
  movesEl.textContent = String(moves);
  input.value = '';

  if (word === target) {
    solved = true;
    input.disabled = true;
    feedback.textContent = \`Solved in \${moves} moves!\`;
    feedback.className = 'feedback win';
    if (best === null || moves < best) {
      best = moves;
      bestEl.textContent = String(best);
    }
  } else {
    feedback.textContent = 'Good step — keep going.';
    feedback.className = 'feedback good';
  }
  renderTrail();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  submitGuess(input.value);
});

document.getElementById('hint-btn').addEventListener('click', () => {
  if (solved) return;
  const stepIdx = trail.length;
  if (stepIdx < chain.length) {
    feedback.textContent = \`Hint: one valid next word is "\${chain[stepIdx]}".\`;
    feedback.className = 'feedback';
  }
});

document.getElementById('new-btn').addEventListener('click', () => {
  puzzleIndex = (puzzleIndex + 1) % PUZZLES.length;
  loadPuzzle(puzzleIndex);
});

loadPuzzle(puzzleIndex);

/* wdp-share:start */
(function () {
  var TITLE = 'Word Ladder Game', URL = 'https://webdevpuneet.com/ui-snippets/word-ladder-game/';
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
    title: 'Word Ladder Game — Free HTML CSS JS Snippet',
    description: 'A one-letter-at-a-time word transformation puzzle with move counting, per-letter diff highlighting and a built-in dictionary validator. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Word Ladder Game — One-Letter Transformation Puzzle with Diff Highlighting and Dictionary Validation',
      description: `A word ladder (also called a doublet or word golf) is a classic word puzzle invented by Lewis Carroll: transform a start word into an end word by changing exactly one letter at a time, with every intermediate step required to be a real word of the same length. This snippet implements a fully playable version — an input form, a running trail of accepted steps, per-letter diff highlighting, move counting, and a small built-in dictionary used to validate every guess — without any backend or external word-list API.

**Representing a puzzle as a chain plus an accepted dictionary**

Each entry in the \`PUZZLES\` array bundles two things: a known-solvable \`chain\` from the start word to the end word (used only to know the target and to power the hint button), and a small \`dict\` array of every word the puzzle will accept as a valid intermediate step, including the chain words themselves. Keeping the dictionary intentionally small and puzzle-specific — rather than shipping a full English word list — keeps the snippet self-contained while still letting players find alternate valid ladders beyond the exact one baked into \`chain\`, since any accepted word from \`dict\` that satisfies the one-letter rule is a legal move.

**Validating a guess: length, single-letter diff, dictionary membership, no repeats**

\`submitGuess()\` runs a guess through four checks in order before accepting it. First, the guessed word's length must match the current word's length — a word ladder never changes word length mid-chain. Second, \`diffCount()\` compares the guess to the current word character-by-character and counts how many positions differ; the guess is rejected unless exactly one letter changed, which is the entire rule that makes the puzzle a "ladder" rather than free-form guessing. Third, the guess must appear in the puzzle's \`dict\` Set (uppercased for case-insensitive matching) — this stops nonsense strings that happen to differ by one letter from being accepted as real words. Fourth, a repeat check via \`trail.includes(word)\` prevents padding the ladder by bouncing back and forth between two words already used.

**The diff-highlighting trail**

\`renderTrail()\` rebuilds the visible list of accepted words after every successful move. For every word after the first, it compares each character position against the previous word in the trail and wraps any differing character in a \`.diff-letter\` span, which is styled in the accent color. This turns an otherwise flat list of words into a readable record of exactly which letter changed at each step, reinforcing the puzzle's core mechanic visually rather than just verbally.

**Move counting and a persisted best score**

A \`moves\` counter increments on every accepted step and is shown live in the stats header. When the current word matches the puzzle's final target word, \`solved\` is set to true, the input is disabled, and if this run's \`moves\` total is lower than any previous \`best\` for the session, \`best\` updates — giving returning players on the same puzzle set a concrete number to beat, purely from in-memory state (no localStorage is used, so best resets on page reload).

**Hints without giving away the whole solution**

The hint button does not reveal the full \`chain\` at once. It looks at \`trail.length\` — the number of words already accepted, including the start word — and reveals only \`chain[trail.length]\`, i.e. the next single step in the reference solution. Because players can legally deviate from the reference chain (any dictionary word satisfying the one-letter rule is accepted), the hint is best read as "a valid next word," not "the only correct next word."`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the goal words', text: 'The header shows a start word and an end word, e.g. COLD to WARM. Every step in between must change exactly one letter and be a real word.' },
        { title: 'Type your next word', text: 'Type a word into the input and submit it. submitGuess() checks it changes exactly one letter from the current last word in the trail, via diffCount().' },
        { title: 'Watch the diff highlighting', text: 'Each accepted word in the trail highlights the letter that changed from the previous word, so you can trace exactly how the chain evolved.' },
        { title: 'Reach the end word to win', text: 'Once your guess exactly matches the target end word, the puzzle is marked solved, the input disables, and your move count is compared against the best score for that puzzle.' },
        { title: 'Ask for a hint if stuck', text: 'Click "Reveal a hint" to see chain[trail.length] — one valid next word from the reference solution, without spoiling the rest of the ladder.' },
        { title: 'Load a new puzzle', text: 'Click "New puzzle" to cycle to the next entry in the PUZZLES array and reset moves, trail and best-score tracking for that puzzle.' },
      ],
    },
    features: [
      'diffCount() enforces the core word-ladder rule: exactly one letter may change per step',
      'Per-puzzle dictionary Set validates that every intermediate word is a real accepted word',
      'Repeat-word guard via trail.includes() prevents bouncing between two already-used words',
      'renderTrail() highlights the specific changed letter in each accepted step for visual clarity',
      'Live move counter plus a best-moves-to-solve record tracked per session',
      'Hint button reveals only the next reference step, not the full solution chain',
      'Multiple bundled puzzles of varying word length, cycled with the New puzzle button',
      'Case-insensitive input handling via uppercasing before every comparison',
      'Fully keyboard-driven: type and press Enter to submit via native form submission',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Vocabulary and spelling practice for classrooms', desc: 'The one-letter-at-a-time constraint forces close attention to spelling and word structure, making this a genuinely educational warm-up exercise distinct from a simple word-guessing game like the [word unscramble game](/ui-snippets/word-unscramble-game/).' },
      { icon: 'APP', title: 'Daily puzzle widget for a games or brain-training site', desc: 'Ship one curated puzzle per day by rotating the PUZZLES array on a schedule, giving a lightweight daily-challenge loop similar in spirit to popular daily word games.' },
      { icon: 'GAME', title: 'Break-time brain teaser embedded in a product', desc: 'Drop this into an empty state, loading screen, or waiting-room area of an app as a small, self-contained distraction that does not require any backend.' },
      { icon: 'CODE', title: 'Reference implementation of Levenshtein-style diff logic', desc: 'diffCount() is a minimal, readable example of counting positional differences between equal-length strings, useful as a teaching example before introducing full edit-distance algorithms.' },
      { icon: 'DESIGN', title: 'Showcase for text-diff highlighting UI', desc: 'The per-letter .diff-letter highlighting technique is directly reusable anywhere a UI needs to visually call out what changed between two similar strings, such as a version history or changelog view.' },
    ],
    faqs: [
      { q: 'What exactly counts as a valid move?', a: 'The guessed word must be the same length as the current word, differ from it in exactly one letter position (checked by diffCount()), appear in the puzzle\'s built-in dict Set, and not already appear earlier in the trail. All four conditions must pass for the move to be accepted.' },
      { q: 'Do I have to follow the exact reference chain to win?', a: 'No. Any sequence of accepted dictionary words that satisfies the one-letter-change rule at every step and eventually reaches the exact end word counts as solved — the reference chain array is only used to determine the target word and to power the hint button, not to restrict your path.' },
      { q: 'Why is the dictionary so small instead of a full English word list?', a: 'Keeping dict scoped to each puzzle keeps the snippet fully self-contained with no external word-list API or large bundled file, while still allowing several valid alternate routes through the puzzle beyond the single baked-in chain.' },
      { q: 'How does the hint system avoid spoiling the whole puzzle?', a: 'The hint button looks up chain[trail.length] — using how many words you have accepted so far as an index — and reveals only that one next reference word, never the full remaining chain in one click.' },
      { q: 'Can I add my own word ladder puzzles?', a: 'Yes. Add an object to the PUZZLES array with a chain array (a known valid start-to-end sequence) and a dict array containing every word you want accepted as valid for that puzzle, including all words in chain.' },
      { q: 'Does the best-moves score persist after a page reload?', a: 'No, best is held in a plain JavaScript variable for the current session only. To persist it across visits, read and write the value to localStorage inside loadPuzzle() and after a puzzle is solved.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how diffCount() and the trail.includes() repeat-guard work together to enforce a legal word ladder move, and why the dictionary is scoped per-puzzle rather than global. It is also a good candidate for extension — ask the assistant to load a real English word list via an API and validate arbitrary five-letter ladders instead of a fixed puzzle set, add a shortest-path solver using breadth-first search over the dictionary graph to show the true minimum move count, or persist the best score per puzzle in localStorage so it survives a page reload.`,
      prompt: `Build a word ladder puzzle game in plain HTML, CSS, and JavaScript — no libraries, no backend.

Requirements:
- Show a start word and an end word of the same length, and let the player type a new word into a text input to add a step to a growing "trail" list.
- A submitted word is only accepted as a valid next step if: it is the same length as the current last word in the trail, it differs from that word in exactly one letter position, it appears in a small built-in accepted-word list for the current puzzle, and it has not already been used earlier in the trail. Reject the guess with a specific, clear feedback message for whichever check failed.
- Render the trail as a list of accepted words, and for every word after the first, visually highlight (e.g. a different color span) the single letter that changed from the previous word in the trail.
- Track and display a live move counter, and once the player's word exactly matches the target end word, mark the puzzle solved, disable further input, and compare this run's move count against a best-score value held in memory, updating it if this run was better.
- Add a hint button that reveals only the single next word from a reference solution chain (based on how many steps have been accepted so far), never the entire remaining solution at once.
- Support multiple bundled puzzles that can be cycled with a "New puzzle" button, each resetting the trail, move counter, and input state.`,
    },
  },
};

export default wordLadderGame;
