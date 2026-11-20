const wordUnscrambleGame = {
  id: 'word-unscramble-game',
  title: 'Word Unscramble Puzzle Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🔤</span>
      <h2>Word Unscramble</h2>
    </div>
    <button class="btn btn-ghost" id="btn-new-game">New game</button>
  </div>

  <div class="stat-row">
    <div class="stat-box">
      <span class="stat-label">Score</span>
      <span class="stat-value" id="stat-score">0</span>
    </div>
    <div class="stat-box">
      <span class="stat-label">Round</span>
      <span class="stat-value" id="stat-round">1</span>
    </div>
    <div class="stat-box">
      <span class="stat-label">Hints used</span>
      <span class="stat-value" id="stat-hints">0</span>
    </div>
  </div>

  <p class="clue-label" id="clue-label">Unscramble the letters below</p>

  <div class="letter-row" id="letter-row"></div>

  <div class="hint-row" id="hint-row"></div>

  <form class="guess-form" id="guess-form" autocomplete="off">
    <input type="text" id="guess-input" class="guess-input" placeholder="Type your guess..." maxlength="20" />
    <button type="submit" class="btn btn-primary" id="btn-submit">Submit</button>
  </form>

  <div class="action-row">
    <button class="btn btn-outline" id="btn-shuffle">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
      Shuffle
    </button>
    <button class="btn btn-outline" id="btn-hint">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>
      Hint
    </button>
    <button class="btn btn-primary" id="btn-next" disabled>Next word →</button>
  </div>

  <p class="feedback" id="feedback" aria-live="polite"></p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card {
  width: 100%; max-width: 460px;
  background: #fff; border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 40px rgba(15,23,42,0.08);
  padding: 24px;
}

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }

.stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
.stat-box { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 10px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; }
.stat-value { display: block; font-size: 18px; font-weight: 800; color: #6366f1; }

.clue-label { font-size: 12px; color: #64748b; text-align: center; margin-bottom: 12px; }

.letter-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 16px; min-height: 52px; }
.letter-tile {
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  background: #eef2ff; border: 1.5px solid #c7d2fe;
  border-radius: 10px;
  font-size: 19px; font-weight: 800; color: #4338ca;
  text-transform: uppercase;
  animation: pop 0.25s ease;
}
@keyframes pop { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.hint-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-bottom: 16px; }
.hint-box {
  width: 26px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  border-bottom: 2.5px solid #cbd5e1;
  font-size: 15px; font-weight: 700; color: #1e293b;
  text-transform: uppercase;
}
.hint-box.revealed { border-bottom-color: #6366f1; color: #6366f1; }

.guess-form { display: flex; gap: 8px; margin-bottom: 14px; }
.guess-input {
  flex: 1; padding: 11px 14px; font-size: 14px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: inherit; outline: none; transition: border-color 0.15s;
}
.guess-input:focus { border-color: #6366f1; }
.guess-input.shake { animation: shake 0.35s; border-color: #ef4444; }
.guess-input.correct { border-color: #22c55e; background: #f0fdf4; }
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}

.btn { padding: 10px 16px; font-size: 13px; font-weight: 600; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; justify-content: center; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #4f46e5; }
.btn-primary:disabled { background: #c7d2fe; cursor: not-allowed; }
.btn-outline { background: #fff; color: #475569; border: 1.5px solid #e2e8f0; flex: 1; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }
.btn-ghost { background: transparent; color: #6366f1; text-decoration: underline; font-size: 12px; padding: 4px 8px; }

.action-row { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.action-row .btn-primary { flex: 1; }

.feedback { min-height: 20px; text-align: center; font-size: 13px; font-weight: 600; }
.feedback.success { color: #16a34a; }
.feedback.error { color: #ef4444; }`,

  js: `const WORDS = [
  'planet', 'garden', 'bridge', 'window', 'castle', 'rocket',
  'pencil', 'jungle', 'guitar', 'wallet', 'mirror', 'candle',
  'silver', 'orange', 'puzzle',
];

let pool = [];
let poolIndex = 0;
let currentWord = '';
let scrambledLetters = [];
let hintedPositions = new Set();
let score = 0;
let round = 1;
let solved = false;

const letterRow = document.getElementById('letter-row');
const hintRow = document.getElementById('hint-row');
const guessInput = document.getElementById('guess-input');
const guessForm = document.getElementById('guess-form');
const feedback = document.getElementById('feedback');
const btnNext = document.getElementById('btn-next');
const btnHint = document.getElementById('btn-hint');
const btnSubmit = document.getElementById('btn-submit');
const statScore = document.getElementById('stat-score');
const statRound = document.getElementById('stat-round');
const statHints = document.getElementById('stat-hints');

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function refillPool() {
  pool = shuffleArray(WORDS);
  poolIndex = 0;
}

function scrambleWord(word) {
  const letters = word.split('');
  let attempt = shuffleArray(letters);
  let tries = 0;
  while (attempt.join('') === word && tries < 10) {
    attempt = shuffleArray(letters);
    tries++;
  }
  return attempt;
}

function renderLetters() {
  letterRow.innerHTML = '';
  scrambledLetters.forEach(letter => {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';
    tile.textContent = letter;
    letterRow.appendChild(tile);
  });
}

function renderHints() {
  hintRow.innerHTML = '';
  currentWord.split('').forEach((letter, i) => {
    const box = document.createElement('div');
    const revealed = hintedPositions.has(i);
    box.className = 'hint-box' + (revealed ? ' revealed' : '');
    box.textContent = revealed ? letter : '';
    hintRow.appendChild(box);
  });
}

function pickWord() {
  if (poolIndex >= pool.length) refillPool();
  currentWord = pool[poolIndex++];
  scrambledLetters = scrambleWord(currentWord);
  hintedPositions = new Set();
  solved = false;
  guessInput.value = '';
  guessInput.classList.remove('correct', 'shake');
  guessInput.disabled = false;
  btnSubmit.disabled = false;
  btnHint.disabled = false;
  btnNext.disabled = true;
  feedback.textContent = '';
  feedback.className = 'feedback';
  renderLetters();
  renderHints();
  guessInput.focus();
}

function updateStats() {
  statScore.textContent = score;
  statRound.textContent = round;
  statHints.textContent = hintedPositions.size;
}

function handleSubmit(e) {
  e.preventDefault();
  if (solved) return;
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) return;
  if (guess === currentWord) {
    solved = true;
    const hintsUsed = hintedPositions.size;
    const points = Math.max(100 - hintsUsed * 25, 25);
    score += points;
    round++;
    guessInput.classList.add('correct');
    guessInput.disabled = true;
    btnSubmit.disabled = true;
    btnHint.disabled = true;
    btnNext.disabled = false;
    feedback.textContent = 'Correct! +' + points + ' points';
    feedback.className = 'feedback success';
    hintedPositions = new Set(currentWord.split('').map((_, i) => i));
    renderHints();
    updateStats();
  } else {
    guessInput.classList.remove('shake');
    void guessInput.offsetWidth;
    guessInput.classList.add('shake');
    feedback.textContent = 'Not quite — try again';
    feedback.className = 'feedback error';
  }
}

function giveHint() {
  if (solved) return;
  const unrevealed = [];
  for (let i = 0; i < currentWord.length; i++) {
    if (!hintedPositions.has(i)) unrevealed.push(i);
  }
  if (unrevealed.length <= 1) {
    btnHint.disabled = true;
    if (unrevealed.length === 0) return;
  }
  const pos = unrevealed[Math.floor(Math.random() * unrevealed.length)];
  hintedPositions.add(pos);
  renderHints();
  updateStats();
}

function shuffleDisplay() {
  scrambledLetters = scrambleWord(currentWord);
  renderLetters();
}

function newGame() {
  score = 0;
  round = 1;
  refillPool();
  pickWord();
  updateStats();
}

guessForm.addEventListener('submit', handleSubmit);
document.getElementById('btn-hint').addEventListener('click', giveHint);
document.getElementById('btn-shuffle').addEventListener('click', shuffleDisplay);
document.getElementById('btn-next').addEventListener('click', pickWord);
document.getElementById('btn-new-game').addEventListener('click', newGame);

newGame();

/* wdp-share:start */
(function () {
  var TITLE = 'Word Unscramble Puzzle Game', URL = 'https://webdevpuneet.com/ui-snippets/word-unscramble-game/';
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
    title: 'Word Unscramble Puzzle Game — Free HTML CSS JS Snippet',
    description: 'A playable letter-unscramble game with scoring, hints and shuffle built in vanilla JS. Exports to React, Vue, Angular & Tailwind for any project.',
    about: {
      title: 'Word Unscramble Puzzle Game — Letter Tiles, Scoring, Hints & Vanilla JS Word Logic',
      description: `Word unscramble puzzles are one of the oldest and most durable casual game formats because the core loop is instantly understandable — look at a jumble of letters, rearrange them mentally, type the word you see. This snippet implements a complete, replayable version of that loop entirely in vanilla JavaScript: a hardcoded word list, a real Fisher-Yates shuffle algorithm, a scoring system that rewards unaided solves, and a hint mechanic that trades points for help. There is no backend and no dependency — everything runs client-side against a plain JavaScript array.

**How the scrambling actually works**

The word pool is a flat array of 15 lowercase words of varying length (six to seven letters each, chosen so the puzzle is neither trivially short nor frustratingly long). \`scrambleWord()\` splits the target word into a character array and runs the classic Fisher-Yates shuffle: iterate from the last index down to the first, swapping each element with a randomly chosen earlier (or equal) element. This produces a mathematically uniform random permutation, unlike naive \`sort(() => Math.random() - 0.5)\` shuffles which are provably biased. Because a truly random shuffle can occasionally return the original word unchanged, the function retries up to ten times if the scrambled result matches the source word exactly.

**Rounds, the word pool, and avoiding repeats**

Rather than picking a random word from the full list on every round (which can repeat the same word twice in a row), the game shuffles the entire word list once per pass and walks through it sequentially with a \`poolIndex\` pointer. When the pointer reaches the end of the shuffled pool, \`refillPool()\` reshuffles the same 15 words into a fresh random order and resets the index to zero, so the game stays endlessly replayable while guaranteeing every word is seen once before any repeats.

**The hint system and its effect on scoring**

Clicking **Hint** does not spoil the puzzle outright — it reveals exactly one additional letter in its correct position, tracked in a \`hintedPositions\` Set keyed by character index. A separate row of boxes beneath the scrambled tiles mirrors the target word's length; unrevealed boxes stay blank while hinted ones display the letter with an accent-coloured underline. Crucially, the scrambled letter tiles themselves are never reordered by a hint — hints only affect the answer-key row, so the player still has to do the unscrambling work for the remaining letters. Because \`hintedPositions.size\` is read directly when a correct guess is submitted, scoring naturally and transparently reflects how much help was used.

**Scoring formula and the shuffle button**

A correct guess awards \`Math.max(100 - hintsUsed * 25, 25)\` points — a flawless, no-hint solve is worth 100 points, each hint costs 25, and the score floors at 25 so no correct answer is ever worth zero. The separate **Shuffle** button is purely cosmetic: it re-runs \`scrambleWord()\` on the same target word and re-renders the letter tiles in a new random order, giving players who feel visually "stuck" on one arrangement a fresh look at the same letters without changing the underlying answer or resetting any hint progress.

**Feedback, state resets, and accessibility**

Submitting the form (via the Submit button or pressing Enter) compares the trimmed, lowercased input against \`currentWord\`. A correct match adds a green \`.correct\` class to the input, disables further guessing, and reveals the full hint row as confirmation; an incorrect guess triggers a CSS \`shake\` keyframe animation on the input by removing and re-adding the class (forcing a reflow with \`void guessInput.offsetWidth\` so the animation restarts on consecutive wrong guesses) alongside a red error message. The \`aria-live="polite"\` attribute on the feedback paragraph means screen readers announce the result without needing focus to move. **New game** fully resets score, round count, and the word pool for a clean restart at any time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Unscramble and submit a guess',
          text: 'Read the scrambled letter tiles at the top of the card, type the word you think they spell into the input, and press Enter or click Submit. handleSubmit() compares your trimmed, lowercased guess against currentWord and shows a green success state or a red shake animation.',
        },
        {
          title: 'Use Shuffle for a fresh look',
          text: 'Click "Shuffle" to re-run scrambleWord() on the same target word, producing a new random letter order with a pop-in tile animation. This is purely visual — it never changes the answer or affects your score, it just gives you a different arrangement to look at if you feel stuck.',
        },
        {
          title: 'Reveal letters with Hint',
          text: 'Click "Hint" to reveal one additional random letter in its correct position within the answer-key boxes beneath the tiles, tracked in the hintedPositions Set. Each hint reduces the points you can earn for that round from a maximum of 100 down to a floor of 25, so use them sparingly for a higher score.',
        },
        {
          title: 'Advance rounds and track your score',
          text: 'After a correct guess, click "Next word →" to call pickWord() again, which pulls the next word from the shuffled pool, resets hints, and generates a new scramble. The Score, Round, and Hints used counters in the stat row update live via updateStats().',
        },
        {
          title: 'Start a clean run with New game',
          text: 'Click "New game" in the header to reset score to 0, round to 1, and reshuffle the entire 15-word pool via refillPool() before picking the first word — useful for demoing the game from a fresh state or starting a new competitive round.',
        },
        {
          title: 'Customise the word list and difficulty',
          text: 'Edit the WORDS array in the JS panel to add your own theme (countries, animals, tech terms). Adjust the scoring formula in handleSubmit() — Math.max(100 - hintsUsed * 25, 25) — to change how steeply hints reduce points, or add difficulty tiers by filtering WORDS by length.',
        },
      ],
    },
    features: [
      'Fisher-Yates shuffle: scrambleWord() produces a uniformly random letter permutation, retried if it matches the original word',
      'Sequential word pool: shuffled once per pass via refillPool() so no word repeats until the full list has been seen',
      'Hint system: hintedPositions Set reveals one letter at a time in a dedicated answer-key row without reordering the puzzle tiles',
      'Dynamic scoring: Math.max(100 - hintsUsed * 25, 25) rewards hint-free solves while flooring the minimum per-round score',
      'Cosmetic Shuffle button: re-scrambles the same target word for a fresh visual arrangement without affecting score or hints',
      'CSS shake animation on incorrect guesses, forced reflow via offsetWidth so the animation restarts on repeated wrong answers',
      'aria-live="polite" feedback region so screen readers announce correct/incorrect results automatically',
      'New game control fully resets score, round count, and word pool for unlimited replayability',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Vocabulary and spelling practice for language learning apps',
        desc: 'Unscramble games are a proven format for reinforcing spelling and vocabulary recall because the player must actively reconstruct the word rather than passively recognise it. Swap the WORDS array for vocabulary from a specific language course or spelling curriculum, and the hint system doubles as a built-in scaffolding mechanism for learners who need partial support without giving away the full answer.',
      },
      {
        icon: 'APP',
        title: 'Daily mini-game or engagement feature on a content site',
        desc: 'Embed this as a lightweight daily puzzle on a blog, newsletter landing page, or community site to increase time-on-page and repeat visits. Because the word pool reshuffles endlessly via refillPool(), the same component works as a bottomless casual game or, with a date-seeded random function, a shareable "word of the day" challenge similar to Wordle-style daily puzzles.',
      },
      {
        icon: 'FLOW',
        title: 'Onboarding or loading-screen filler for productivity tools',
        desc: 'Drop this into an app loading state, empty dashboard, or "nothing to show yet" screen to give users something engaging to interact with instead of a static spinner. The self-contained scoring and round system means it needs no backend or account system to feel like a real, complete mini-game.',
      },
      {
        icon: 'DESIGN',
        title: 'Teaching UI feedback states: success, error, and progressive reveal',
        desc: 'The correct/shake/hint states make this a compact reference for building clear, immediate input feedback — a pattern also useful in form validation, quiz interfaces, and the [Quick Math Arithmetic Game](/ui-snippets/quick-math-game). Swap the accent colour #6366f1 and tile styling to match your design system while keeping the underlying interaction logic intact.',
      },
      {
        icon: 'LEARN',
        title: 'Learn the Fisher-Yates shuffle and Set-based state tracking',
        desc: 'This snippet is a clean, real-world example of implementing an unbiased shuffle algorithm from scratch instead of relying on a library, plus using a native JavaScript Set to track sparse, order-independent state (which letter positions have been hinted) rather than a boolean array. Both patterns generalise well beyond games — the shuffle applies to any randomised list, and Set-based tracking applies to any "which items are unlocked/visited/selected" UI state.',
      },
      {
        icon: 'CODE',
        title: 'Portfolio or interview demo of vanilla JS game-state management',
        desc: 'The snippet manages several interdependent pieces of state — current word, scrambled order, hinted positions, score, round, and solved flag — using nothing but plain variables and DOM APIs, no framework or state library. It is a compact, readable demonstration of manual state management discipline, useful as a code sample when discussing vanilla JS architecture in interviews or portfolio reviews.',
      },
    ],
    faqs: [
      {
        q: 'Why does the shuffled word occasionally look almost like the original word?',
        a: 'Fisher-Yates produces a genuinely uniform random permutation, so for short words there is a real (if reduced) chance that only two or three letters swap position, making the scramble look deceptively close to the answer. The scrambleWord() function retries up to ten times only when the shuffle produces an exact match to the original word — near-misses are intentionally left alone, since eliminating them would bias the randomness and make the puzzle less fair.',
      },
      {
        q: 'Can I make the hint system reveal letters in a fixed order instead of randomly?',
        a: 'Yes — in giveHint(), the unrevealed positions are currently chosen with Math.floor(Math.random() * unrevealed.length). Replace that line with unrevealed[0] to always reveal the leftmost unrevealed letter first, which some players find more intuitive since it lets them build the word left-to-right rather than getting scattered hints.',
      },
      {
        q: 'How do I add a difficulty setting based on word length?',
        a: 'Add a difficulty selector that filters the WORDS array by string length before calling refillPool() — for example const easyWords = WORDS.filter(w => w.length <= 5) for an easy mode and a longer-word filter for hard mode. You could also maintain three separate arrays (easy/medium/hard) and swap which one populates the pool when the difficulty control changes.',
      },
      {
        q: 'Does the score or round persist if I reload the page?',
        a: 'No, this snippet keeps score, round, and the word pool entirely in memory via plain JavaScript variables, so a page reload resets everything. To persist a best score across sessions, add a localStorage.getItem/setItem call similar to the pattern used in the Quick Math Arithmetic Game snippet, storing the highest score achieved in a single New game run.',
      },
      {
        q: 'Can this run as a timed challenge instead of untimed rounds?',
        a: 'Yes — add a countdown timer using setInterval alongside the existing round logic, similar to the timer pattern in the Quick Math Arithmetic Game snippet, and call a game-over routine when it reaches zero instead of waiting indefinitely for the next correct guess. You would disable the guess form and hint/shuffle buttons on timeout and show a final score summary.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how scrambleWord(), pickWord(), and the hintedPositions Set work together across a full round — from generating the scramble to scoring a correct guess. It's a good candidate for extension: ask the assistant to add a countdown timer per round for a speed-run mode, persist the best score to localStorage the way a high-score table would, or replace the flat hardcoded WORDS array with categorised word lists (animals, countries, tech terms) selectable from a dropdown. You could also ask it to review whether the Fisher-Yates shuffle implementation is correctly unbiased, or to add a "reveal answer" button that ends the round without awarding points, which is a common feature in commercial word-game apps. Treat the code as a working starting point to interrogate and reshape, not a finished, untouchable artifact — the assistant can explain any part of the state management or propose a cleaner structure if you plan to port it into a React component with hooks instead of plain DOM manipulation.`,
      prompt: `Build a word unscramble puzzle game in plain HTML, CSS, and JavaScript with scoring, hints, and a shuffle-only-cosmetic control — no frameworks or libraries.

Requirements:
- A hardcoded array of 10-15 target words of varying length, with a genuinely unbiased shuffle algorithm (Fisher-Yates, not a naive sort-based shuffle) used both to scramble each word's letters and to randomize the order words are presented in across a full pass of the list before any repeats occur.
- A text input where the player types their guess, submitted via a form (both Enter key and a Submit button must work), compared case-insensitively and with whitespace trimmed against the current target word.
- Correct guesses must show clear visual success feedback (e.g. a color change) and reveal a "Next word" control; incorrect guesses must show a distinct, re-triggerable visual error state (e.g. a shake animation that restarts even on consecutive wrong guesses).
- A "Hint" button that reveals exactly one additional letter of the target word in its correct position each time it's clicked (not the same letter twice), displayed separately from the scrambled letters so the puzzle itself isn't spoiled, and tracks how many hints were used this round.
- A scoring system where each correct answer awards points that decrease as more hints are used for that round, with a sensible minimum floor so no correct answer is ever worth zero, plus a running total score and round counter displayed live.
- A "Shuffle" button that re-randomizes only the displayed order of the scrambled letters for the current word, without changing the answer, resetting hints, or affecting score.
- A "New game" control that resets score, round count, and hint tracking, and starts a fresh pass through a reshuffled word pool.
- Accessible feedback: use aria-live for the correct/incorrect status message so screen reader users get the result announced automatically.`,
    },
  },
};

export default wordUnscrambleGame;
