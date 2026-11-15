const whackAMoleGame = {
  id: 'whack-a-mole-game',
  title: 'Whack-a-Mole Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="game-wrap">
  <div class="topbar">
    <div class="stat">
      <span class="stat-label">Score</span>
      <span class="stat-value" id="score">0</span>
    </div>
    <div class="stat">
      <span class="stat-label">Time</span>
      <span class="stat-value" id="time">30</span>
    </div>
    <div class="stat">
      <span class="stat-label">Best</span>
      <span class="stat-value" id="best">0</span>
    </div>
  </div>

  <div class="board" id="board">
    <button class="hole" data-index="0" aria-label="Hole 1"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="1" aria-label="Hole 2"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="2" aria-label="Hole 3"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="3" aria-label="Hole 4"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="4" aria-label="Hole 5"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="5" aria-label="Hole 6"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="6" aria-label="Hole 7"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="7" aria-label="Hole 8"><span class="mound"></span><span class="mole">🐹</span></button>
    <button class="hole" data-index="8" aria-label="Hole 9"><span class="mound"></span><span class="mole">🐹</span></button>

    <div class="overlay-screen" id="start-screen">
      <h2>Whack-a-Mole</h2>
      <p>Click the moles as fast as you can before the 30 second timer runs out.</p>
      <button class="btn-primary" id="btn-start">Start Game</button>
    </div>

    <div class="overlay-screen hidden" id="end-screen">
      <h2>Time's Up!</h2>
      <p>Final score: <span id="final-score">0</span></p>
      <p class="new-best hidden" id="new-best-msg">New best score!</p>
      <button class="btn-primary" id="btn-again">Play Again</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f0fdf4; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-wrap { width: 100%; max-width: 420px; }

.topbar {
  display: flex; justify-content: space-between;
  background: #14532d; border-radius: 14px 14px 0 0;
  padding: 14px 22px;
}
.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #86efac; }
.stat-value { font-size: 22px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; }

.board {
  position: relative;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
  background: #15803d;
  padding: 22px; border-radius: 0 0 14px 14px;
  box-shadow: 0 20px 50px rgba(21,128,61,0.25);
}

.hole {
  position: relative;
  aspect-ratio: 1 / 1; width: 100%;
  border: none; border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, #3f2412 0%, #291708 65%, #180d04 100%);
  box-shadow: inset 0 6px 10px rgba(0,0,0,0.55), 0 3px 0 rgba(255,255,255,0.08);
  overflow: hidden; cursor: pointer; padding: 0;
}
.mound {
  position: absolute; inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 -10px 14px rgba(70,40,15,0.5);
  pointer-events: none;
}
.mole {
  position: absolute; left: 50%; bottom: -10%;
  transform: translate(-50%, 100%);
  font-size: 44px; line-height: 1;
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
  will-change: transform;
}
.hole.up .mole { transform: translate(-50%, 8%); }
.hole.whacked .mole { animation: squash 0.28s ease; }

@keyframes squash {
  0% { transform: translate(-50%, 8%) scale(1); }
  40% { transform: translate(-50%, 35%) scaleX(1.3) scaleY(0.7); }
  100% { transform: translate(-50%, 100%) scale(0.9); }
}

.overlay-screen {
  position: absolute; inset: 22px;
  background: rgba(6, 30, 14, 0.92);
  border-radius: 10px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; text-align: center; padding: 24px;
  z-index: 10;
  transition: opacity 0.2s;
}
.overlay-screen.hidden { display: none; }
.overlay-screen h2 { color: #fff; font-size: 22px; font-weight: 800; }
.overlay-screen p { color: #bbf7d0; font-size: 13px; max-width: 260px; line-height: 1.6; }
.new-best { color: #fde047 !important; font-weight: 700; }

.btn-primary {
  background: #6366f1; color: #fff; border: none;
  padding: 11px 26px; border-radius: 9px;
  font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s, transform 0.1s;
  margin-top: 4px;
}
.btn-primary:hover { background: #4f46e5; }
.btn-primary:active { transform: scale(0.96); }`,

  js: `const GAME_DURATION = 30;
const BEST_KEY = 'whack-a-mole-best';

const holes = Array.from(document.querySelectorAll('.hole'));
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const newBestMsg = document.getElementById('new-best-msg');
const btnStart = document.getElementById('btn-start');
const btnAgain = document.getElementById('btn-again');

let score = 0;
let timeLeft = GAME_DURATION;
let gameActive = false;
let timerInterval = null;
let moleTimeout = null;
let hideTimeout = null;
let activeHole = null;

function getBest() {
  const raw = localStorage.getItem(BEST_KEY);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

function renderBest() {
  bestEl.textContent = getBest();
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function popRandomMole() {
  if (!gameActive) return;

  // Retract any currently visible mole before showing a new one
  if (activeHole) {
    activeHole.classList.remove('up');
    activeHole = null;
  }

  const hole = holes[randomBetween(0, holes.length - 1)];
  hole.classList.add('up');
  activeHole = hole;

  const upDuration = randomBetween(650, 950);
  hideTimeout = setTimeout(() => {
    if (hole === activeHole) {
      hole.classList.remove('up');
      activeHole = null;
    }
  }, upDuration);

  const nextDelay = randomBetween(800, 1200);
  moleTimeout = setTimeout(popRandomMole, nextDelay);
}

function whack(hole) {
  if (!gameActive) return;
  if (hole !== activeHole || !hole.classList.contains('up')) return;

  score++;
  scoreEl.textContent = score;
  hole.classList.remove('up');
  hole.classList.add('whacked');
  setTimeout(() => hole.classList.remove('whacked'), 280);
  activeHole = null;
}

function tick() {
  timeLeft--;
  timeEl.textContent = Math.max(timeLeft, 0);
  if (timeLeft <= 0) endGame();
}

function startGame() {
  score = 0;
  timeLeft = GAME_DURATION;
  scoreEl.textContent = '0';
  timeEl.textContent = String(GAME_DURATION);
  gameActive = true;
  activeHole = null;
  holes.forEach(h => h.classList.remove('up', 'whacked'));

  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');

  clearInterval(timerInterval);
  clearTimeout(moleTimeout);
  clearTimeout(hideTimeout);

  timerInterval = setInterval(tick, 1000);
  moleTimeout = setTimeout(popRandomMole, 500);
}

function endGame() {
  gameActive = false;
  clearInterval(timerInterval);
  clearTimeout(moleTimeout);
  clearTimeout(hideTimeout);
  holes.forEach(h => h.classList.remove('up', 'whacked'));
  activeHole = null;

  const best = getBest();
  const isNewBest = score > best;
  if (isNewBest) localStorage.setItem(BEST_KEY, String(score));

  finalScoreEl.textContent = score;
  newBestMsg.classList.toggle('hidden', !isNewBest);
  renderBest();
  endScreen.classList.remove('hidden');
}

holes.forEach(hole => {
  hole.addEventListener('click', () => whack(hole));
});

btnStart.addEventListener('click', startGame);
btnAgain.addEventListener('click', startGame);

renderBest();

/* wdp-share:start */
(function () {
  var TITLE = 'Whack-a-Mole Game', URL = 'https://webdevpuneet.com/ui-snippets/whack-a-mole-game/';
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
    title: 'Whack-a-Mole Game — Free HTML CSS JS Snippet',
    description: 'Playable whack-a-mole with randomized pop timing, squash-hit animation, 30s countdown and localStorage best score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Whack-a-Mole Game — Randomized Timers, Hit Detection, Countdown & Best-Score Persistence',
      description: `Whack-a-Mole is a classic reflex game, and building a working version teaches a genuinely useful pattern: coordinating randomized, self-rescheduling timers with real-time user input while keeping a single source of truth for "what is clickable right now." This snippet implements the full loop in vanilla JavaScript — a 3x3 grid of holes, a mole that pops up at unpredictable intervals, a squash-hit animation on a successful click, a 30-second countdown, and a best score persisted with \`localStorage\`.

**The self-rescheduling timer pattern**

Rather than using \`setInterval\` on a fixed cadence, the game uses a recursive \`setTimeout\` chain via \`popRandomMole()\`. Each time a mole appears, two timers are scheduled: a \`hideTimeout\` that retracts the mole after a random 650-950ms "up" duration if it isn't clicked, and a \`moleTimeout\` that calls \`popRandomMole()\` again after a random 800-1200ms delay to bring up the next mole. This recursive-timeout approach is deliberately chosen over \`setInterval\` because each call can pick a fresh random delay — producing the unpredictable, non-metronomic rhythm that makes whack-a-mole feel alive rather than mechanical. Every timer handle (\`moleTimeout\`, \`hideTimeout\`, \`timerInterval\`) is stored in module-level variables specifically so \`endGame()\` can call \`clearTimeout\`/\`clearInterval\` on all three and guarantee no stray callback fires a mole after the round has ended.

**Tracking "the one clickable mole" with a single reference**

The game keeps exactly one variable, \`activeHole\`, pointing at the DOM element of whichever hole currently has its mole up. This is the crux of correct hit detection: \`whack(hole)\` only awards a point if the clicked hole strictly equals \`activeHole\` and that hole still carries the \`up\` class. Clicking an empty hole, clicking a hole whose mole already retracted, or clicking a stale reference after a new mole has appeared all fail this check safely. Before showing a new mole, \`popRandomMole()\` first retracts whatever \`activeHole\` currently is, so at most one mole is ever visible at a time, keeping the difficulty consistent and the click target unambiguous.

**CSS-driven pop and squash animations**

Each hole is a circular button with \`overflow: hidden\` and a radial-gradient dirt texture drawn purely in CSS — no image assets. The mole itself is an emoji positioned absolutely at the bottom of the hole with \`transform: translate(-50%, 100%)\` (fully hidden below the rim) by default. Adding the \`.up\` class transitions it to \`translate(-50%, 8%)\` using a bouncy \`cubic-bezier(0.34, 1.56, 0.64, 1)\` easing curve, which overshoots slightly for a satisfying spring-pop feel. A successful whack adds a \`.whacked\` class that triggers a \`squash\` keyframe animation — the mole briefly scales wide and flat (\`scaleX(1.3) scaleY(0.7)\`) at its midpoint before retracting, mimicking a comic "squash" impact frame.

**Countdown, scoring, and persistent best score**

A single \`setInterval\` ticking once per second drives the 30-second countdown, decrementing \`timeLeft\` and updating the DOM directly. When \`timeLeft\` reaches zero, \`endGame()\` stops all timers, hides any visible mole, and reveals the end screen with the final score. The best score is read from and written to \`localStorage\` under the key \`whack-a-mole-best\` — \`getBest()\` parses the stored string with a fallback to \`0\`, and \`endGame()\` compares the current run's score against it, writing a new value and flashing a "New best score!" message only when the record is actually broken. This mirrors the persistence pattern used in the [Word Guess Game](/ui-snippets/word-guess-game), where session state is layered on top of a small localStorage-backed record.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Start the round',
          text: 'Click "Start Game" to reset the score to 0, set the countdown to 30, and call popRandomMole() for the first time. The overlay screens are toggled with the .hidden class rather than being removed from the DOM, so restarting is instant.',
        },
        {
          title: 'Whack the moles',
          text: 'Click a hole while its mole is up (the .up class is present) to score a point. The whack() function checks that the clicked hole strictly equals the activeHole reference before awarding points, so clicking an empty or already-retracted hole is a safe no-op.',
        },
        {
          title: 'Watch the timing get unpredictable',
          text: 'Each mole stays up for a random 650-950ms (hideTimeout) and the next mole appears after a random 800-1200ms delay (moleTimeout). Both durations are recomputed on every call to popRandomMole(), so no two rounds feel identical.',
        },
        {
          title: 'React to the countdown',
          text: 'The topbar time value decrements once per second via setInterval(tick, 1000). When it hits zero, endGame() clears every timer, hides any visible mole, and shows the end screen automatically — no player action needed.',
        },
        {
          title: 'Check your best score',
          text: 'After each round, your score is compared against the value stored under the whack-a-mole-best localStorage key. If you beat it, a "New best score!" message appears on the end screen and the stored value updates immediately.',
        },
        {
          title: 'Export and restyle',
          text: 'Click HTML or JSX to export. Swap the dirt-hole radial-gradient colors or replace the 🐹 emoji with an SVG/sprite for a different theme (whack-a-frog, whack-a-gopher). Change GAME_DURATION in the JS panel to adjust round length.',
        },
      ],
    },
    features: [
      'Recursive setTimeout chain (popRandomMole) produces non-metronomic, unpredictable mole timing',
      'Single activeHole reference guarantees exactly one clickable mole and correct stale-click rejection',
      'Randomized 650-950ms up-time and 800-1200ms spawn interval via randomBetween()',
      'CSS transform: translate(-50%, 8%) with cubic-bezier(0.34, 1.56, 0.64, 1) bounce for the pop-up motion',
      '.whacked squash keyframe animation (scaleX/scaleY distortion) on successful hits',
      '30-second countdown via setInterval(tick, 1000) with automatic endGame() at zero',
      'Best score persisted via localStorage under the whack-a-mole-best key, compared and updated each round',
      'All timers (timerInterval, moleTimeout, hideTimeout) explicitly cleared on both startGame() and endGame() to prevent leaks',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Reflex-training mini-game for a game portal or landing page',
        desc: 'Drop this into a "games" section of a portfolio or product site as a lightweight, dependency-free interactive break. Because scoring and best-score tracking are self-contained, it works as a standalone widget without any backend — just embed the component and the localStorage-backed best score persists across visits on the same device.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching example for coordinating multiple JavaScript timers',
        desc: 'This snippet is a compact, real-world demonstration of managing three concurrent timers (a repeating interval and two chained timeouts) without race conditions. It is a strong teaching artifact for explaining why setTimeout chains are sometimes preferable to setInterval when each iteration needs a different delay, and why storing timer handles in named variables is essential for reliable cleanup.',
      },
      {
        icon: 'DESIGN',
        title: 'Themeable arcade-style component for seasonal promotions',
        desc: 'Swap the mole emoji for a branded icon and change the accent colors to build a seasonal "whack the deal" promo game — e.g. click a popping icon to reveal a discount code. The squash-hit animation and countdown timer already provide the game feel; only the visual assets and the win-condition messaging need to change for a promotional reskin.',
      },
      {
        icon: 'FLOW',
        title: 'Micro-interaction case study for hit-detection state management',
        desc: 'The activeHole pattern — a single mutable reference that gates whether a click counts — is a reusable technique for any UI where only one of many similar elements should be interactive at a time, such as a single active tooltip, a single expanded accordion panel, or a single "armed" button in a toolbar.',
      },
      {
        icon: 'CODE',
        title: 'Starter for a difficulty-scaling or multiplayer variant',
        desc: 'Because the spawn interval and up-time are both parameterized through randomBetween(), it is straightforward to make the game progressively harder by narrowing those ranges as the score increases, or to fork the scoring logic into a two-player local pass-and-play mode by adding a second score counter and alternating whose turn it is between hits.',
      },
      {
        icon: 'FORM',
        title: 'Onboarding or loading-screen distraction game',
        desc: 'Embed a short, fixed-duration version (reduce GAME_DURATION to 10-15 seconds) as an engaging distraction during a slow onboarding step, file upload, or app loading screen, similar in spirit to a [Memory Match Game](/ui-snippets/memory-match-game), giving users something interactive to do instead of staring at a spinner.',
      },
    ],
    faqs: [
      {
        q: 'How does the game guarantee only one mole is clickable at a time?',
        a: 'A single module-level variable, activeHole, always points at the one hole element whose mole is currently up. Before showing a new mole, popRandomMole() first retracts whatever activeHole currently references. The whack() function only awards a point when the clicked hole is strictly equal to activeHole and still has the .up class, so clicks on any other hole — including one whose mole just retracted milliseconds earlier — are safely ignored.',
      },
      {
        q: 'Why use chained setTimeout calls instead of setInterval for spawning moles?',
        a: 'setInterval fires at a fixed, unchanging cadence, which quickly becomes predictable and easy to game. This snippet instead has popRandomMole() schedule its own next call with setTimeout(popRandomMole, randomBetween(800, 1200)) — a fresh random delay is chosen every single time, so the rhythm never repeats. The same randomBetween() helper independently randomizes how long each mole stays up before auto-retracting.',
      },
      {
        q: 'How is the best score persisted between visits?',
        a: 'The score is stored as a plain string in localStorage under the key whack-a-mole-best. getBest() reads and parses it (defaulting to 0 if nothing is stored yet), and endGame() compares the just-finished score against it, calling localStorage.setItem() only when the new score is strictly higher. Because localStorage is scoped per-origin and persists indefinitely, the best score survives page reloads and browser restarts on the same device and browser.',
      },
      {
        q: 'Can I make the game harder or change the round length?',
        a: 'Yes. Change the GAME_DURATION constant at the top of the JS panel to lengthen or shorten the countdown. To increase difficulty, narrow the ranges passed to randomBetween() inside popRandomMole() — for example reducing the up-time range from 650-950ms to 400-600ms makes moles disappear faster, and reducing the spawn-delay range makes moles appear more frequently.',
      },
      {
        q: 'Does clicking rapidly or double-clicking a mole score extra points?',
        a: 'No. The moment whack() awards a point it immediately sets activeHole to null and removes the .up class from that hole, so a second click on the same hole in the same frame fails the equality check in whack() and is a no-op. Only one point can be scored per mole appearance.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to trace exactly how the three timers — timerInterval, moleTimeout, and hideTimeout — interact, and why each one gets explicitly cleared in both startGame() and endGame() rather than just left to fire naturally. It's also worth asking the assistant to explain why activeHole is used instead of just checking the .up class alone, since that distinction is what prevents a subtle double-scoring bug. Beyond understanding, use the assistant to extend the game: ask for a difficulty curve that narrows the random timing ranges as the score climbs, a combo/streak multiplier for consecutive hits without a miss, sound effects triggered via the Web Audio API on each successful whack, or a two-player local mode. Treat the current implementation as a solid, bug-free foundation rather than a finished product — there is plenty of room to extend the scoring and difficulty systems.`,
      prompt: `Build a playable whack-a-mole game in plain HTML, CSS, and JavaScript with a 3x3 grid of holes, randomized mole timing, and a countdown timer.

Requirements:
- A 3x3 grid of circular "holes"; each hole can independently show or hide a "mole" (an emoji or CSS shape) using a CSS transform-based slide-up animation, not a display toggle, so the motion is smoothly animated.
- Moles must appear at unpredictable, randomized intervals (not a fixed metronomic cadence) and each mole must automatically retract on its own after a randomized short duration if the player does not click it in time.
- Clicking a hole while its mole is visible must score a point and trigger a distinct "hit" animation (e.g. a squash/scale effect) before the mole retracts; clicking an empty hole, or a hole whose mole already retracted, must do nothing and must never score.
- At any given moment, exactly one mole should be poppable/clickable across the whole grid — showing a new mole must retract any mole that is still up elsewhere.
- Implement a 30-second visible countdown timer that starts when the player clicks "Start Game"; when it reaches zero, stop all mole spawning immediately, hide any visible mole, and show a game-over screen with the final score.
- Persist the player's best score across page reloads using localStorage, display it at all times, and clearly indicate when the just-finished round set a new best.
- Provide a "Play Again" action that fully resets score, timer, and all timers/animation state with no leftover scheduled callbacks from the previous round.
- Ensure all JavaScript timers are properly cleared when a round ends or restarts so no mole can pop up after the game has stopped.`,
    },
  },
};

export default whackAMoleGame;
