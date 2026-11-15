const precisionAimTrainerGame = {
  id: 'precision-aim-trainer-game',
  title: 'Precision Aim Trainer Game',
  category: 'games',
  html: `<div class="aim-app">
  <div class="aim-header">
    <h2>Aim Trainer</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Score</span><span class="stat-val" id="stat-score">0</span></div>
      <div class="stat"><span class="stat-label">Combo</span><span class="stat-val" id="stat-combo">x1</span></div>
      <div class="stat"><span class="stat-label">Time</span><span class="stat-val" id="stat-time">30</span></div>
    </div>
  </div>

  <div class="arena" id="arena">
    <div class="overlay" id="overlay">
      <p class="overlay-title">Precision Aim Trainer</p>
      <p class="overlay-text">Targets shrink as they age — hit them dead-center, early, for the most points. Miss the ring entirely and your combo resets.</p>
      <button class="primary-btn" id="start-btn">Start (30s)</button>
    </div>
  </div>

  <p class="result" id="result"></p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.aim-app { max-width: 520px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }

.aim-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.aim-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 8px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px 12px; min-width: 56px; text-align: center; }
.stat-label { display: block; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 15px; font-weight: 800; color: #6366f1; }

.arena {
  position: relative; width: 100%; height: 380px;
  background: #0f172a; border-radius: 18px; overflow: hidden;
  cursor: crosshair;
  box-shadow: 0 12px 30px rgba(15,23,42,0.25);
}

.overlay {
  position: absolute; inset: 0; z-index: 5;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 24px; text-align: center;
  background: rgba(15,23,42,0.92);
}
.overlay-title { color: #f8fafc; font-size: 18px; font-weight: 800; }
.overlay-text { color: #94a3b8; font-size: 13px; line-height: 1.6; max-width: 340px; }
.primary-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 10px 22px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
  transition: background 0.15s;
}
.primary-btn:hover { background: #4f46e5; }

.target {
  position: absolute; border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex; align-items: center; justify-content: center;
  pointer-events: auto;
}
.target-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle, #fca5a5 0%, #ef4444 55%, #b91c1c 100%);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.15);
}
.target-core {
  position: absolute; width: 30%; height: 30%; border-radius: 50%;
  background: #fef2f2;
}

.popup {
  position: absolute; font-weight: 800; font-size: 15px; color: #4ade80;
  pointer-events: none; transform: translate(-50%, -50%);
  animation: pop-fade 0.6s ease forwards;
}
.popup.miss { color: #f87171; }
@keyframes pop-fade {
  0% { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
  100% { opacity: 0; transform: translate(-50%, -50%) translateY(-30px); }
}

.result { font-size: 13.5px; font-weight: 700; color: #475569; text-align: center; min-height: 18px; }`,
  js: `const arena = document.getElementById('arena');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('stat-score');
const comboEl = document.getElementById('stat-combo');
const timeEl = document.getElementById('stat-time');
const resultEl = document.getElementById('result');

const DURATION = 30;
const MIN_LIFE = 900;
const MAX_LIFE = 1600;
const MIN_SIZE = 34;
const MAX_SIZE = 64;

let score = 0;
let combo = 1;
let timeLeft = DURATION;
let running = false;
let spawnTimer = null;
let countdownTimer = null;
let activeTargets = new Set();

function rand(min, max) { return Math.random() * (max - min) + min; }

function spawnTarget() {
  if (!running) return;
  const rect = arena.getBoundingClientRect();
  const size = rand(MIN_SIZE, MAX_SIZE);
  const x = rand(size / 2 + 6, rect.width - size / 2 - 6);
  const y = rand(size / 2 + 6, rect.height - size / 2 - 6);
  const life = rand(MIN_LIFE, MAX_LIFE);

  const target = document.createElement('div');
  target.className = 'target';
  target.style.left = x + 'px';
  target.style.top = y + 'px';
  target.style.width = size + 'px';
  target.style.height = size + 'px';

  const ring = document.createElement('div');
  ring.className = 'target-ring';
  const core = document.createElement('div');
  core.className = 'target-core';
  target.appendChild(ring);
  target.appendChild(core);

  const born = performance.now();
  activeTargets.add(target);

  target.addEventListener('click', e => {
    e.stopPropagation();
    if (!activeTargets.has(target)) return;
    const age = performance.now() - born;
    const lifeFrac = Math.max(0, 1 - age / life);
    const points = Math.max(5, Math.round(10 + lifeFrac * 40));
    const earned = points * combo;
    score += earned;
    combo = Math.min(8, combo + 1);
    scoreEl.textContent = String(score);
    comboEl.textContent = 'x' + combo;
    showPopup(x, y, '+' + earned, false);
    removeTarget(target);
  });

  target.style.animation = \`target-shrink \${life}ms linear forwards\`;
  const styleTag = document.createElement('style');
  styleTag.textContent = \`@keyframes target-shrink { from { transform: translate(-50%,-50%) scale(1); opacity: 1; } to { transform: translate(-50%,-50%) scale(0.3); opacity: 0; } }\`;
  target.appendChild(styleTag);

  const timeout = setTimeout(() => {
    if (activeTargets.has(target)) {
      combo = 1;
      comboEl.textContent = 'x1';
      removeTarget(target);
    }
  }, life);
  target._timeout = timeout;

  arena.appendChild(target);
  scheduleNextSpawn();
}

function removeTarget(target) {
  activeTargets.delete(target);
  clearTimeout(target._timeout);
  if (target.parentNode) target.parentNode.removeChild(target);
}

function scheduleNextSpawn() {
  if (!running) return;
  const delay = rand(280, 620);
  spawnTimer = setTimeout(spawnTarget, delay);
}

function showPopup(x, y, text, isMiss) {
  const p = document.createElement('div');
  p.className = 'popup' + (isMiss ? ' miss' : '');
  p.style.left = x + 'px';
  p.style.top = y + 'px';
  p.textContent = text;
  arena.appendChild(p);
  setTimeout(() => p.remove(), 600);
}

function onArenaMiss(e) {
  if (!running) return;
  if (e.target !== arena) return;
  const rect = arena.getBoundingClientRect();
  combo = 1;
  comboEl.textContent = 'x1';
  showPopup(e.clientX - rect.left, e.clientY - rect.top, 'miss', true);
}

function tickTimer() {
  timeLeft--;
  timeEl.textContent = String(Math.max(0, timeLeft));
  if (timeLeft <= 0) endGame();
}

function startGame() {
  score = 0; combo = 1; timeLeft = DURATION; running = true;
  scoreEl.textContent = '0';
  comboEl.textContent = 'x1';
  timeEl.textContent = String(DURATION);
  resultEl.textContent = '';
  overlay.style.display = 'none';
  activeTargets.forEach(removeTarget);
  spawnTarget();
  countdownTimer = setInterval(tickTimer, 1000);
}

function endGame() {
  running = false;
  clearTimeout(spawnTimer);
  clearInterval(countdownTimer);
  activeTargets.forEach(removeTarget);
  overlay.style.display = 'flex';
  overlay.innerHTML = '';
  const title = document.createElement('p');
  title.className = 'overlay-title';
  title.textContent = \`Final score: \${score}\`;
  const text = document.createElement('p');
  text.className = 'overlay-text';
  text.textContent = 'Targets shrink as they age — hit them dead-center, early, for the most points. Miss the ring entirely and your combo resets.';
  const btn = document.createElement('button');
  btn.className = 'primary-btn';
  btn.id = 'start-btn';
  btn.textContent = 'Play again (30s)';
  btn.addEventListener('click', startGame);
  overlay.appendChild(title);
  overlay.appendChild(text);
  overlay.appendChild(btn);
  resultEl.textContent = \`You scored \${score} points this run.\`;
}

startBtn.addEventListener('click', startGame);
arena.addEventListener('click', onArenaMiss);

/* wdp-share:start */
(function () {
  var TITLE = 'Precision Aim Trainer Game', URL = 'https://webdevpuneet.com/ui-snippets/precision-aim-trainer-game/';
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
    title: 'Precision Aim Trainer Game — Free HTML CSS JS Snippet',
    description: 'A 30-second click-precision game with shrinking, time-decaying targets, combo multipliers and score popups rendered with plain DOM elements. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Precision Aim Trainer Game — Time-Decaying Targets, Combo Multipliers and DOM-Based Hit Detection',
      description: `An aim trainer is a genre of reflex game built around clicking small, often moving or shrinking targets as quickly and accurately as possible. This implementation spawns one target at a time inside a fixed arena, each shrinking visibly as it ages via a CSS keyframe animation, and rewards clicks that land early in a target's lifespan — while a stray click anywhere the target used to be, once it has fully shrunk away, resets a combo multiplier instead of scoring.

**Why this differs from a reaction-time or click-speed test**

A pure reaction-time tester measures a single interval between a stimulus and one click; a click-speed test measures raw clicks per second against no target at all. This game instead measures *spatial precision under a decaying time budget*: every target has a randomized lifespan (\`MIN_LIFE\` to \`MAX_LIFE\` milliseconds) during which it visually shrinks from full size to nearly nothing via an injected \`@keyframes target-shrink\` animation, and the score for a hit is directly proportional to how early — i.e., how large the target still was — when the click landed. This combines timing pressure with genuine point-and-click accuracy in a way neither a reaction tester nor a click-speed counter does.

**Scoring: proportional to remaining life, multiplied by a combo streak**

On a target click, \`performance.now() - born\` gives the target's exact age in milliseconds, converted to \`lifeFrac\`, the fraction of its lifespan remaining (1 for an instant hit, approaching 0 as it's about to expire). Base points scale from that fraction — \`Math.max(5, Math.round(10 + lifeFrac * 40))\` — so a target hit the instant it spawns is worth up to five times more than one hit right before it disappears. Every successful hit also increments a \`combo\` multiplier (capped at 8x) that multiplies the base points for that hit and every subsequent one, so a run of consecutive successful hits compounds quickly, while any miss — clicking empty arena space, or a target expiring unclicked — resets \`combo\` back to 1x, punishing sloppy or panicked clicking.

**Continuous spawning without overlap bugs**

Rather than a fixed grid of possible positions, \`spawnTarget()\` picks a fully random \`x\`/\`y\` within the arena bounds (inset by half the target's own size so it never renders partially off-screen) and calls \`scheduleNextSpawn()\` at the end of every spawn, which queues the next target after a random 280-620ms delay — creating an unpredictable, continuously-refreshing stream of targets rather than a static pattern a player could memorize. An \`activeTargets\` Set tracks every currently-live target DOM node so that a click on a target already removed (e.g. by its own expiry timeout firing in the same tick as a click) is safely ignored via the \`activeTargets.has(target)\` guard, preventing double-scoring or errors from a race between the expiry timer and a click handler.

**Score popups and a 30-second countdown**

Every hit or miss spawns a small floating \`.popup\` element showing the exact points earned (green) or the word "miss" (red), animated upward and fading out via a CSS \`@keyframes pop-fade\`, giving immediate, readable feedback without interrupting play. A \`setInterval\`-driven countdown ticks \`timeLeft\` down from 30 seconds; when it reaches zero, \`endGame()\` clears all pending timers, removes any live targets, and rebuilds the overlay to show the final score with a "Play again" button, so a full round is always exactly 30 seconds regardless of how many targets were spawned or missed during it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click Start to begin a 30-second run', text: 'startGame() resets score, combo, and the countdown, then calls spawnTarget() to place the first shrinking target in the arena.' },
        { title: 'Click targets as early as possible', text: 'Each target shrinks continuously from full size toward nothing over its randomized lifespan. Points scale with how much of that lifespan remains when you click — earlier hits score far more.' },
        { title: 'Build and protect your combo', text: 'Consecutive successful hits raise a combo multiplier up to x8, multiplying every subsequent hit\'s points. Any miss — clicking empty space or letting a target expire — resets the combo to x1.' },
        { title: 'Watch the score popups', text: 'Every click spawns a floating green "+points" or red "miss" label at the click location so you can read exactly how each hit scored without checking the header stats.' },
        { title: 'Play until the timer hits zero', text: 'A live countdown in the header ticks down from 30. When it reaches 0, endGame() stops spawning, clears the arena, and shows your final score with a Play again button.' },
        { title: 'Tune the difficulty', text: 'Adjust MIN_LIFE/MAX_LIFE for how long targets last, MIN_SIZE/MAX_SIZE for their size range, and the 280-620ms range in scheduleNextSpawn() for how densely targets appear.' },
      ],
    },
    features: [
      'Targets shrink continuously via an injected CSS @keyframes animation tied to a randomized per-target lifespan',
      'Hit scoring is proportional to remaining target life at click time — early hits are worth far more than late ones',
      'Combo multiplier (up to x8) rewards consecutive hits and resets hard to x1 on any miss or expiry',
      'activeTargets Set guards against race conditions between a target\'s expiry timeout and a click event',
      'Continuous unpredictable spawning via randomized 280-620ms delays rather than a fixed grid or pattern',
      'Floating score popups show exact points or a miss label at the precise click location',
      'Fixed 30-second round enforced by setInterval, independent of how many targets were spawned',
      'Bounds-aware random placement keeps every target fully inside the arena regardless of its randomized size',
    ],
    useCases: [
      { icon: 'GAME', title: 'Standalone reflex and precision practice tool', desc: 'A focused practice loop for click precision and timing under pressure, distinct from a pure [reaction time tester](/ui-snippets/reaction-time-tester/) or [click speed test](/ui-snippets/click-speed-test/) that do not require spatial targeting.' },
      { icon: 'APP', title: 'Warm-up mini-game for a gaming or esports-adjacent site', desc: 'Embed as a quick skill-check widget before a competitive game session, similar in spirit to dedicated aim-trainer tools used by first-person-shooter players to warm up.' },
      { icon: 'LEARN', title: 'Teaching example for timing-based DOM animation and race conditions', desc: 'The interplay between a CSS keyframe animation, a JS expiry timeout, and a click handler racing against both is a compact, realistic example of coordinating animation state with event handling.' },
      { icon: 'DESIGN', title: 'Score popup and combo-multiplier UI pattern reference', desc: 'The floating, auto-fading popup technique and the combo-multiplier scoring display are directly reusable in other arcade-style mini-games or gamified interaction patterns.' },
      { icon: 'CODE', title: 'Loading-screen or empty-state engagement filler', desc: 'Small and fully self-contained with no backend or external assets, this drops cleanly into an idle moment in a product as an optional, skippable distraction.' },
    ],
    faqs: [
      { q: 'How exactly is the score for a single hit calculated?', a: 'On click, the code computes the target\'s age in milliseconds since it spawned (via performance.now() - born), converts that into a 0-to-1 remaining-life fraction, and derives base points as Math.max(5, Math.round(10 + lifeFrac * 40)) — so a near-instant hit can score close to 50 base points while a last-moment hit scores closer to the 5-point floor. That base amount is then multiplied by the current combo.' },
      { q: 'What causes the combo multiplier to reset?', a: 'Two things reset combo to 1: clicking anywhere in the arena that is not an active target (handled by onArenaMiss, which checks e.target === arena), and letting any spawned target\'s expiry setTimeout fire because it was never clicked in time.' },
      { q: 'Why does the code track an activeTargets Set instead of just querying the DOM?', a: 'A target can be removed by two independent triggers — a user click or its own expiry timeout — that could both fire in quick succession. Checking activeTargets.has(target) before processing a click guarantees a target already removed by its expiry timer is never double-processed or scored after the fact.' },
      { q: 'How is target placement kept fully inside the arena regardless of size?', a: 'spawnTarget() insets the random x/y range by half of that specific target\'s randomized size (plus a small margin) on every side, using rand(size / 2 + 6, rect.width - size / 2 - 6) and the equivalent for y, so even the largest possible target never renders partially outside the arena bounds.' },
      { q: 'How would I make the game harder or easier?', a: 'Lower MIN_LIFE and MAX_LIFE to make targets shrink and expire faster, reduce MIN_SIZE and MAX_SIZE for smaller, harder-to-hit targets, or tighten the random delay range inside scheduleNextSpawn() (currently 280-620ms) to spawn targets more densely and force faster target-switching.' },
      { q: 'Does the game support touch devices?', a: 'Yes — target and arena click handlers respond to standard click events, which fire on tap for touch devices without any additional touch-specific event listeners needed, though very fast successive taps may benefit from adding pointerdown handling for lower input latency.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the score formula turns a target's remaining-life fraction into points, and why the activeTargets Set is necessary to prevent a race condition between a target's expiry timeout and a click event landing in the same animation frame. It is also a good candidate for extension — ask the assistant to add multiple simultaneous targets instead of one at a time for a harder mode, a moving-target variant where targets drift across the arena instead of staying fixed once spawned, or persistent high-score tracking via localStorage so a returning player has a personal best to beat.`,
      prompt: `Build a precision aim-trainer mini-game in plain HTML, CSS, and JavaScript — no libraries, no canvas, using plain DOM elements positioned absolutely inside a fixed arena.

Requirements:
- Spawn one circular target at a time at a random position fully inside the arena bounds (accounting for its own randomized size so it never renders partially outside), and animate it shrinking continuously from full size toward nearly nothing over a randomized lifespan using a CSS keyframe animation.
- On clicking a target, compute how much of its lifespan remains at the moment of the click and award points proportional to that remaining fraction, so an early hit scores substantially more than a late one; also increment a combo multiplier (capped at a reasonable maximum) that multiplies every hit's points while it is active.
- If a spawned target's lifespan expires without being clicked, or the player clicks empty arena space where no target currently exists, reset the combo multiplier back to its base value of 1.
- Guard against a target being processed twice if its expiry timer and a click event could both fire around the same time — track currently-live targets in a data structure and check membership before awarding points or removing a target a second time.
- Continuously schedule the next target spawn after a short randomized delay following each spawn, so targets appear in an unpredictable but roughly steady stream rather than a fixed pattern.
- Show a brief floating score or "miss" label at the exact click location that fades out, run the whole game on a fixed 30-second countdown, and show a final-score summary with a replay button once the timer reaches zero.`,
    },
  },
};

export default precisionAimTrainerGame;
