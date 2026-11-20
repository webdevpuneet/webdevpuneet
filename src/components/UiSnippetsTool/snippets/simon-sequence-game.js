const simonSequenceGame = {
  id: 'simon-sequence-game',
  title: 'Simon Says Color Sequence Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="simon-card">
  <div class="card-header">
    <h2 class="card-title">Simon Says</h2>
    <p class="card-sub" id="card-sub">Watch the sequence, then repeat it back.</p>
  </div>

  <div class="stat-row">
    <div class="stat">
      <span class="stat-value" id="stat-round">0</span>
      <span class="stat-label">Round</span>
    </div>
    <div class="stat">
      <span class="stat-value" id="stat-best">0</span>
      <span class="stat-label">Best Score</span>
    </div>
  </div>

  <div class="simon-board">
    <button class="pad pad-red" id="pad-red" data-color="red" aria-label="Red"></button>
    <button class="pad pad-green" id="pad-green" data-color="green" aria-label="Green"></button>
    <button class="pad pad-blue" id="pad-blue" data-color="blue" aria-label="Blue"></button>
    <button class="pad pad-yellow" id="pad-yellow" data-color="yellow" aria-label="Yellow"></button>
    <div class="simon-center">
      <button class="btn-start" id="btn-start">Start</button>
    </div>
  </div>

  <div class="game-over-banner" id="game-over-banner">
    <p class="banner-title" id="banner-title">Game Over — Score: 0</p>
    <button class="btn-restart" id="btn-restart">Play Again</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.simon-card {
  width: 400px; max-width: 100%;
  background: #ffffff; border-radius: 20px;
  padding: 24px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  border: 1px solid #f1f5f9;
}

.card-header { text-align: center; margin-bottom: 16px; }
.card-title { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.card-sub { font-size: 13px; color: #64748b; }

.stat-row { display: flex; gap: 10px; margin-bottom: 20px; }
.stat { flex: 1; background: #f8fafc; border-radius: 12px; padding: 10px; text-align: center; border: 1px solid #f1f5f9; }
.stat-value { display: block; font-size: 20px; font-weight: 800; color: #4338ca; font-variant-numeric: tabular-nums; }
.stat-label { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #94a3b8; margin-top: 2px; }

.simon-board {
  position: relative;
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  gap: 10px; aspect-ratio: 1; border-radius: 50%;
  overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  padding: 10px; background: #0f172a;
}

.pad { border: none; cursor: pointer; opacity: 0.65; transition: opacity 0.1s, filter 0.1s; }
.pad-red { background: #ef4444; border-radius: 100% 0 0 0; }
.pad-green { background: #22c55e; border-radius: 0 100% 0 0; }
.pad-blue { background: #3b82f6; border-radius: 0 0 0 100%; }
.pad-yellow { background: #eab308; border-radius: 0 0 100% 0; }

.pad.lit { opacity: 1; filter: brightness(1.35) saturate(1.2); box-shadow: 0 0 24px currentColor inset; }
.pad-red.lit { color: #ef4444; }
.pad-green.lit { color: #22c55e; }
.pad-blue.lit { color: #3b82f6; }
.pad-yellow.lit { color: #eab308; }

.pad:disabled { cursor: default; }

.simon-center {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 34%; aspect-ratio: 1; border-radius: 50%;
  background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  display: flex; align-items: center; justify-content: center;
}

.btn-start {
  width: 100%; height: 100%; border-radius: 50%; border: none;
  background: #6366f1; color: #fff; font-weight: 700; font-size: 12px;
  cursor: pointer; font-family: inherit; transition: background 0.15s;
}
.btn-start:hover { background: #4f46e5; }
.btn-start:disabled { background: #cbd5e1; cursor: default; }

.game-over-banner {
  margin-top: 16px; text-align: center;
  max-height: 0; overflow: hidden; opacity: 0;
  transition: max-height 0.25s ease, opacity 0.25s ease;
}
.game-over-banner.show { max-height: 100px; opacity: 1; margin-top: 16px; }
.banner-title { font-size: 14px; font-weight: 700; color: #ef4444; margin-bottom: 10px; }
.btn-restart {
  background: #6366f1; color: #fff; border: none; border-radius: 9px;
  padding: 9px 18px; font-size: 12.5px; font-weight: 600; font-family: inherit;
  cursor: pointer; transition: background 0.15s;
}
.btn-restart:hover { background: #4f46e5; }`,

  js: `const COLORS = ['red', 'green', 'blue', 'yellow'];
const BEST_KEY = 'simon-best-score';

const pads = {
  red: document.getElementById('pad-red'),
  green: document.getElementById('pad-green'),
  blue: document.getElementById('pad-blue'),
  yellow: document.getElementById('pad-yellow'),
};
const startBtn = document.getElementById('btn-start');
const restartBtn = document.getElementById('btn-restart');
const cardSub = document.getElementById('card-sub');
const statRound = document.getElementById('stat-round');
const statBest = document.getElementById('stat-best');
const gameOverBanner = document.getElementById('game-over-banner');
const bannerTitle = document.getElementById('banner-title');

let sequence = [];
let playerIndex = 0;
let round = 0;
let bestScore = 0;
let acceptingInput = false;
let playingBack = false;

function loadBest() {
  // localStorage throws (not just fails) in a sandboxed iframe without
  // allow-same-origin, in Safari private browsing, and under some strict
  // CSPs -- catch it so the game still runs, just without persistence there.
  try {
    const stored = localStorage.getItem(BEST_KEY);
    bestScore = stored ? parseInt(stored, 10) || 0 : 0;
  } catch (e) {
    bestScore = 0;
  }
  statBest.textContent = bestScore;
}

function saveBest() {
  try {
    localStorage.setItem(BEST_KEY, String(bestScore));
  } catch (e) {
    // Storage unavailable -- bestScore still updates for this session below.
  }
  statBest.textContent = bestScore;
}

function lightPad(color, duration) {
  return new Promise(resolve => {
    const pad = pads[color];
    pad.classList.add('lit');
    setTimeout(() => {
      pad.classList.remove('lit');
      setTimeout(resolve, 150);
    }, duration);
  });
}

async function playSequence() {
  playingBack = true;
  acceptingInput = false;
  setPadsEnabled(false);
  cardSub.textContent = 'Watch carefully...';

  await wait(500);
  for (let i = 0; i < sequence.length; i++) {
    await lightPad(sequence[i], 480);
  }
  playingBack = false;
  acceptingInput = true;
  playerIndex = 0;
  setPadsEnabled(true);
  cardSub.textContent = 'Your turn — repeat the sequence';
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setPadsEnabled(enabled) {
  Object.values(pads).forEach(pad => { pad.disabled = !enabled; });
}

function nextRound() {
  round += 1;
  statRound.textContent = round;
  sequence.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
  playSequence();
}

function handlePadClick(color) {
  if (!acceptingInput || playingBack) return;

  const pad = pads[color];
  pad.classList.add('lit');
  setTimeout(() => pad.classList.remove('lit'), 220);

  if (color !== sequence[playerIndex]) {
    endGame();
    return;
  }

  playerIndex += 1;
  if (playerIndex === sequence.length) {
    acceptingInput = false;
    setPadsEnabled(false);
    setTimeout(nextRound, 700);
  }
}

function endGame() {
  acceptingInput = false;
  setPadsEnabled(false);
  const score = Math.max(0, sequence.length - 1);
  if (score > bestScore) {
    bestScore = score;
    saveBest();
  }
  bannerTitle.textContent = 'Game Over — Score: ' + score;
  gameOverBanner.classList.add('show');
  cardSub.textContent = 'Watch the sequence, then repeat it back.';
  startBtn.disabled = false;
  startBtn.textContent = 'Start';
}

function startGame() {
  sequence = [];
  round = 0;
  playerIndex = 0;
  gameOverBanner.classList.remove('show');
  statRound.textContent = '0';
  startBtn.disabled = true;
  startBtn.textContent = '...';
  nextRound();
}

Object.entries(pads).forEach(([color, pad]) => {
  pad.addEventListener('click', () => handlePadClick(color));
});
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

setPadsEnabled(false);
loadBest();

/* wdp-share:start */
(function () {
  var TITLE = 'Simon Says Color Sequence Game', URL = 'https://webdevpuneet.com/ui-snippets/simon-sequence-game/';
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
    title: 'Simon Says Color Sequence Game — HTML CSS JS Snippet',
    description: 'Classic 4-color memory game with growing sequences, async playback animation and localStorage best score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Simon Says Color Sequence Game — Async Sequence Playback, Growing Memory Pattern & localStorage High Score',
      description: `Simon is one of the most enduring memory-game formats in consumer electronics history, and rebuilding it in the browser is a genuinely useful exercise in managing asynchronous timing, game state, and user input validation together. This snippet implements the complete classic loop with four colored quadrant pads: the game plays back a growing sequence of color flashes, the player must repeat it back exactly, a correct repeat extends the sequence by one more random color, and a wrong input ends the game immediately with a final score. The best score persists across browser sessions using \`localStorage\`, so returning players always see their personal record.

**Modeling the sequence as an array and driving playback with async/await**

The entire game state lives in one growing array, \`sequence\`, which starts empty and gains one new random color (chosen from \`COLORS = ['red', 'green', 'blue', 'yellow']\` via \`Math.floor(Math.random() * COLORS.length)\`) every round. Rather than chaining \`setTimeout\` callbacks — which quickly becomes unreadable once you need to flash four, five, or ten pads in order — the snippet wraps each pad flash in a Promise-returning helper, \`lightPad(color, duration)\`, and awaits them one at a time inside an \`async function playSequence()\`. This means the playback logic reads top-to-bottom like synchronous code (\`for (let i = 0; i < sequence.length; i++) { await lightPad(sequence[i], 480); }\`) while still being fully non-blocking, and it is trivial to insert a pause between flashes or before the sequence starts by awaiting a small \`wait(ms)\` promise-timeout helper.

**Locking input during playback**

A critical correctness detail is that the four pad buttons must be genuinely unclickable while the sequence is animating — otherwise a fast or accidental click during playback could be misread as the player's first move. The snippet handles this with a combination of a \`playingBack\` boolean guard checked at the top of \`handlePadClick()\` and setting the actual \`disabled\` attribute on every pad button via \`setPadsEnabled(false)\` for the duration of \`playSequence()\`. Only after the full sequence has finished flashing does \`acceptingInput\` flip to \`true\`, \`playerIndex\` reset to 0, and the pads re-enable, ensuring player input can only ever be interpreted against a sequence that has fully finished displaying.

**Validating player input against the sequence**

As the player clicks pads, \`handlePadClick(color)\` compares the clicked color against \`sequence[playerIndex]\` — the expected next color in the sequence. A match increments \`playerIndex\`; a mismatch immediately calls \`endGame()\`, ending the round on the very first wrong click rather than waiting for the player to finish an incorrect attempt. If \`playerIndex\` reaches \`sequence.length\`, the player has correctly repeated the entire sequence, so the pads disable again and, after a brief pause, \`nextRound()\` pushes one more random color onto the sequence and replays the whole extended sequence from the beginning — the defining "growing memory pattern" mechanic that makes Simon progressively harder.

**Best score persistence with localStorage**

On page load, \`loadBest()\` reads a stored value from \`localStorage.getItem('simon-best-score')\`, parses it as an integer (defaulting to 0 if nothing is stored or the value is invalid), and displays it in the Best Score stat tile. Whenever a game ends with a score higher than the currently stored best, \`saveBest()\` writes the new value back to \`localStorage\` immediately, so the record persists across page refreshes and future browser sessions without needing any backend. The score itself is calculated as \`sequence.length - 1\`, since a wrong click on round N means the player successfully completed N-1 full rounds before failing.

**Visual feedback: quadrant layout and lit-pad glow**

The four pads are arranged as CSS-rounded quadrants of a circle using \`border-radius\` set independently on each corner (\`100% 0 0 0\` for the top-left pad, and so on), recreating the classic circular Simon console shape entirely with CSS, no image assets required. A center circle houses the Start button. When a pad is part of an active flash — whether during automated playback or as instant feedback on a player click — it gains a \`.lit\` class that boosts \`opacity\`, applies a \`filter: brightness(1.35) saturate(1.2)\`, and adds an inset glow using \`box-shadow: 0 0 24px currentColor inset\`, giving each color pad a distinct colored glow that matches its own hue.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click Start to begin',
          text: 'Clicking the center Start button calls startGame(), which resets the sequence array, round counter, and player index, then immediately calls nextRound() to add the first random color and begin playback.',
        },
        {
          title: 'Watch the sequence play',
          text: 'playSequence() disables all pads and lights each color in sequence order using async/await over the lightPad() promise helper, with a short pause between flashes so each color is clearly distinguishable before the next one lights up.',
        },
        {
          title: 'Repeat the sequence back',
          text: 'Once playback finishes, the pads re-enable and cardSub changes to "Your turn". Click the pads in the same order they flashed — handlePadClick() checks each click against sequence[playerIndex] and advances only on a correct match.',
        },
        {
          title: 'Advance to the next round',
          text: 'Completing the full sequence correctly triggers nextRound() after a short delay, which appends one more random color and replays the entire extended sequence from the start — this is what makes each round strictly harder than the last.',
        },
        {
          title: 'See your score on a wrong click',
          text: 'Clicking the wrong pad at any point immediately ends the game via endGame(), which shows a "Game Over — Score: N" banner where N is the number of rounds successfully completed, and updates the Best Score tile if this run set a new personal record.',
        },
        {
          title: 'Restart and check your persisted best score',
          text: 'Click "Play Again" on the game-over banner to call startGame() again. The Best Score tile is read from localStorage on page load via loadBest(), so your personal record survives page refreshes and future visits to the page.',
        },
      ],
    },
    features: [
      'Async/await sequence playback using a Promise-based lightPad() helper instead of nested setTimeout callbacks',
      'Growing memory pattern: sequence.push() adds one new random color per completed round',
      'Input locking during playback via a playingBack guard and disabled pad buttons, preventing premature clicks',
      'Immediate-fail validation: a single wrong click at any point ends the game on that exact click',
      'localStorage-persisted best score that survives page refreshes and future browser sessions',
      'CSS-only quadrant circle layout using independent per-corner border-radius values, no image assets',
      'Distinct per-color glow on lit pads via filter brightness/saturate and a currentColor inset box-shadow',
      'Round and score tracked and displayed live, decoupled cleanly from the sequence array\'s own length',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Standalone memory game or arcade-style mini-game feature',
        desc: 'Ship this as a nostalgic, dependency-free memory game for a games portal, a loading-screen distraction, or a standalone page targeting search traffic for "Simon says game online". The async playback and immediate-fail validation reproduce the exact feel of the original electronic toy.',
      },
      {
        icon: 'LEARN',
        title: 'Cognitive training and working-memory practice tool',
        desc: 'Simon-style sequence games are a well-established simple test of short-term working memory and sequential recall. Educational or brain-training platforms can embed this component as a quick daily memory exercise, tracking the persisted best score as a rough proxy for improvement over time.',
      },
      {
        icon: 'FLOW',
        title: 'Gamified waiting-room or engagement filler during idle time',
        desc: 'Apps with unavoidable idle moments — matchmaking queues, onboarding tutorials, checkout confirmations — can drop in a quick game like this to keep users engaged, similar to how the [Reaction Time Tester Game](/ui-snippets/reaction-time-tester) turns dead time into a moment of light interaction rather than a blank spinner.',
      },
      {
        icon: 'DESIGN',
        title: 'Teaching example for async/await sequencing in UI animation',
        desc: 'This snippet is a clean, self-contained demonstration of replacing nested setTimeout callback chains with async/await over small Promise-returning helper functions, a pattern broadly useful anywhere a UI needs to play a timed sequence of visual states in strict order.',
      },
      {
        icon: 'FORM',
        title: 'Onboarding tutorial pattern reused for feature walkthroughs',
        desc: 'The core "highlight one element at a time in sequence, then require the user to interact with them in the same order" mechanic generalizes beyond games — product tours and interactive tutorials can borrow the same playSequence()-style async highlighting pattern to walk new users through a series of UI elements one at a time.',
      },
      {
        icon: 'CODE',
        title: 'Portfolio piece demonstrating state machine and timing discipline',
        desc: 'Because correctness here depends entirely on precise state management (playingBack, acceptingInput, playerIndex) rather than visual polish alone, this snippet is a strong portfolio piece to show a potential employer careful handling of asynchronous UI state, distinct from more decorative snippets.',
      },
      { icon: 'CODE', title: 'Related: Terminal Command Game', desc: 'See the [Terminal Command Game](/ui-snippets/terminal-command-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the game prevent clicks from registering during sequence playback?',
        a: 'Two mechanisms work together: a playingBack boolean is checked at the very start of handlePadClick() and immediately exits if true, and every pad button also has its disabled attribute set to true via setPadsEnabled(false) for the full duration of playSequence(). Because the pads are genuinely disabled at the DOM level, even rapid or accidental clicks during playback produce no click event at all, not just an ignored one.',
      },
      {
        q: 'Why use async/await instead of setTimeout for the flashing sequence?',
        a: 'Chaining multiple setTimeout calls to flash colors in order quickly becomes deeply nested and hard to follow, especially once you want to insert consistent pauses between each flash. By wrapping a single flash in a function that returns a Promise (lightPad()), the playback loop can use a normal for loop with await, so the code reads sequentially top to bottom while still remaining fully non-blocking for the rest of the page.',
      },
      {
        q: 'How is the score calculated when the game ends?',
        a: 'The score equals sequence.length - 1 at the moment of a wrong click. This is because sequence.length reflects the round currently being attempted (including the new color just added for that round), and the player failed to complete it, so they successfully finished sequence.length - 1 full rounds before the mistake. This value is what appears in the "Game Over — Score: N" banner and is compared against the stored best score.',
      },
      {
        q: 'Does the best score work across different devices or browsers?',
        a: 'No. The best score is stored using localStorage, which is scoped to the specific browser and device it was set in — it does not sync across devices or browsers automatically. To share a best score across devices, you would need to sync the value to a backend database keyed to a logged-in user account instead of relying solely on localStorage.',
      },
      {
        q: 'Can I add more colors or pads to make the game harder?',
        a: 'Yes. Add a new entry to the COLORS array, a corresponding pad button in the HTML with a matching id and data-color attribute, an entry in the pads object in the JS panel, and CSS rules for its background color and quadrant border-radius shape. You will likely also want to adjust the CSS grid layout from a 2x2 arrangement to accommodate additional pads, for example a hexagonal or circular arrangement for six colors.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the playingBack and acceptingInput flags together prevent race conditions between the automated sequence playback and player clicks, and how the async/await pattern in playSequence() replaces what would otherwise be deeply nested setTimeout callbacks. It's also a good snippet to extend with an assistant's help — ask for a difficulty setting that speeds up the flash duration as rounds increase, a strict mode where a single mistake resets the whole game rather than just ending the current run, or a sound-based version using the Web Audio API to play a distinct tone per color alongside the visual flash, closer to the original electronic toy. Because the game state is fully contained in a handful of well-named variables, it is also straightforward to ask for a version refactored into a reusable class or React hook.`,
      prompt: `Build a Simon Says style color sequence memory game in plain HTML, CSS, and JavaScript with four colored pads, growing sequences, and a persisted best score — no external libraries or sound files required.

Requirements:
- Four distinct colored pad buttons arranged as quadrants (for example in a circle or 2x2 grid), plus a Start control that begins a new game.
- On starting a game, generate a sequence of one random color, then play it back by visually lighting each pad in order (using a class toggle or similar, not opacity 0 tricks that break click targets) with a brief pause between each flash, during which all pads must be genuinely unclickable/disabled.
- After playback finishes, allow the player to click the pads to repeat the sequence; each click must be checked immediately against the expected next color, ending the game right away on the first incorrect click rather than waiting for the full attempt to finish.
- On a fully correct repeat of the current sequence, append one additional random color to the sequence and replay the entire new, longer sequence from the beginning, so each round is strictly one step harder than the last.
- Track and display the current round or score during play, and on game over show a clear "Game Over — Score: N" message along with a way to immediately start a new game.
- Persist the best score achieved across sessions using localStorage, loading it on page start and updating it only when a new run's score exceeds the previously stored best.
- Ensure rapid or mistimed clicks never cause the game state (sequence position, playback lock) to desync, even if the player clicks a pad the instant before or after playback finishes.`,
    },
  },
};

export default simonSequenceGame;
