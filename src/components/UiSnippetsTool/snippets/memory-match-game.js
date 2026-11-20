const memoryMatchGame = {
  id: 'memory-match-game',
  title: 'Memory Match Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="wrap">
  <div class="hud">
    <div class="hud-stat"><span class="hud-label">Moves</span><span class="hud-value" id="moves">0</span></div>
    <div class="hud-stat"><span class="hud-label">Time</span><span class="hud-value" id="timer">0:00</span></div>
    <button class="reset-btn" id="reset-btn">Restart</button>
  </div>
  <div class="grid" id="grid"></div>
  <div class="win-banner" id="win-banner">
    <div class="win-title">All matched!</div>
    <div class="win-sub" id="win-sub"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 380px; position: relative; }

.hud { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.hud-stat { display: flex; flex-direction: column; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px 14px; min-width: 68px; }
.hud-label { font-size: 10px; font-weight: 700; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; }
.hud-value { font-size: 16px; font-weight: 800; color: #0f172a; }
.reset-btn { margin-left: auto; background: #6366f1; color: #fff; border: none; border-radius: 9px; padding: 9px 16px; font-size: 12px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.reset-btn:hover { background: #4f46e5; }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; perspective: 900px; position: relative; }

.card-scene { aspect-ratio: 1; }
.card { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.4,0.2,0.2,1); cursor: pointer; }
.card.flipped { transform: rotateY(180deg); }
.card.matched { animation: pulse-glow 0.6s ease; }
@keyframes pulse-glow { 0% { transform: rotateY(180deg) scale(1); } 40% { transform: rotateY(180deg) scale(1.12); } 100% { transform: rotateY(180deg) scale(1); } }

.face { position: absolute; inset: 0; border-radius: 12px; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; font-size: 26px; }
.face-back { background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 2px 6px rgba(99,102,241,0.25); }
.face-back::after { content: '?'; color: rgba(255,255,255,0.7); font-size: 20px; font-weight: 800; }
.face-front { background: #fff; border: 1.5px solid #e2e8f0; transform: rotateY(180deg); }
.card.matched .face-front { border-color: #34d399; box-shadow: 0 0 0 2px rgba(52,211,153,0.35), 0 0 18px rgba(52,211,153,0.35); }

.win-banner { position: absolute; inset: 0; top: -6px; background: rgba(255,255,255,0.96); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s; text-align: center; padding: 20px; }
.win-banner.show { opacity: 1; pointer-events: all; }
.win-title { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
.win-sub { font-size: 13px; color: #64748b; }

.confetti-bit { position: fixed; width: 7px; height: 7px; border-radius: 2px; pointer-events: none; z-index: 999; }`,
  js: `const ICONS = ['🎈','🍀','🎧','🚀','🍉','⭐','🎲','🔥'];
const HUD_MOVES = document.getElementById('moves');
const HUD_TIMER = document.getElementById('timer');
const grid = document.getElementById('grid');
const winBanner = document.getElementById('win-banner');
const winSub = document.getElementById('win-sub');

let deck = [];
let flippedCards = [];
let locked = false;
let moves = 0;
let matchedPairs = 0;
let startTime = null;
let timerInterval = null;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  deck = shuffle([...ICONS, ...ICONS]);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ':' + String(s).padStart(2, '0');
}

function startTimerIfNeeded() {
  if (startTime !== null) return;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const sec = Math.floor((Date.now() - startTime) / 1000);
    HUD_TIMER.textContent = formatTime(sec);
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function render() {
  grid.innerHTML = '';
  deck.forEach((icon, i) => {
    const scene = document.createElement('div');
    scene.className = 'card-scene';

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    card.dataset.icon = icon;

    const back = document.createElement('div');
    back.className = 'face face-back';

    const front = document.createElement('div');
    front.className = 'face face-front';
    front.textContent = icon;

    card.appendChild(back);
    card.appendChild(front);
    scene.appendChild(card);
    grid.appendChild(scene);

    card.addEventListener('click', () => onCardClick(card));
  });
}

/*
 * The lock flag exists to prevent a classic race condition: two mismatched
 * cards are shown flipped for a short pause before flipping back so the
 * player can memorize them. If clicks were not disabled during that pause,
 * a fast third click could flip another card while two mismatched cards are
 * still showing, corrupting flippedCards (which assumes at most two entries)
 * and letting the player see a third card face before the mismatch has
 * even resolved. Setting locked = true the moment a second card is flipped,
 * and only clearing it after the compare/resolve step completes, makes the
 * "exactly two cards visible while judging a match" invariant impossible
 * to violate no matter how fast the player clicks.
 */
function onCardClick(card) {
  if (locked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  startTimerIfNeeded();
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    locked = true;
    moves++;
    HUD_MOVES.textContent = moves;
    const [a, b] = flippedCards;
    if (a.dataset.icon === b.dataset.icon) {
      setTimeout(() => resolveMatch(a, b), 320);
    } else {
      setTimeout(() => resolveMismatch(a, b), 850);
    }
  }
}

function resolveMatch(a, b) {
  a.classList.add('matched');
  b.classList.add('matched');
  burstConfetti(a);
  burstConfetti(b);
  flippedCards = [];
  locked = false;
  matchedPairs++;
  if (matchedPairs === ICONS.length) {
    stopTimer();
    const sec = Math.floor((Date.now() - startTime) / 1000);
    winSub.textContent = moves + ' moves \\u2022 ' + formatTime(sec);
    setTimeout(() => winBanner.classList.add('show'), 400);
    bigConfettiBurst();
  }
}

function resolveMismatch(a, b) {
  a.classList.remove('flipped');
  b.classList.remove('flipped');
  flippedCards = [];
  locked = false;
}

function burstConfetti(cardEl) {
  const rect = cardEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#6366f1', '#f472b6', '#34d399', '#f59e0b'];
  for (let i = 0; i < 10; i++) {
    spawnBit(cx, cy, colors[i % colors.length]);
  }
}

function bigConfettiBurst() {
  const wrapRect = grid.getBoundingClientRect();
  const cx = wrapRect.left + wrapRect.width / 2;
  const cy = wrapRect.top + wrapRect.height / 2;
  const colors = ['#6366f1', '#f472b6', '#34d399', '#f59e0b', '#38bdf8'];
  for (let i = 0; i < 40; i++) {
    spawnBit(cx, cy, colors[i % colors.length], true);
  }
}

function spawnBit(cx, cy, color, big) {
  const bit = document.createElement('div');
  bit.className = 'confetti-bit';
  bit.style.left = cx + 'px';
  bit.style.top = cy + 'px';
  bit.style.background = color;
  document.body.appendChild(bit);

  const angle = Math.random() * Math.PI * 2;
  const dist = (big ? 90 : 45) + Math.random() * (big ? 100 : 40);
  const dx = Math.cos(angle) * dist;
  const dy = Math.sin(angle) * dist - (big ? 20 : 0);
  const rot = (Math.random() - 0.5) * 720;

  const anim = bit.animate([
    { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
    { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rot + 'deg)', opacity: 0 },
  ], { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(0.2,0.8,0.3,1)' });

  anim.onfinish = () => bit.remove();
}

function resetGame() {
  stopTimer();
  buildDeck();
  flippedCards = [];
  locked = false;
  moves = 0;
  matchedPairs = 0;
  startTime = null;
  HUD_MOVES.textContent = '0';
  HUD_TIMER.textContent = '0:00';
  winBanner.classList.remove('show');
  render();
}

document.getElementById('reset-btn').addEventListener('click', resetGame);

resetGame();

/* wdp-share:start */
(function () {
  var TITLE = 'Memory Match Game', URL = 'https://webdevpuneet.com/ui-snippets/memory-match-game/';
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
    title: 'Memory Match Game — Free HTML CSS JS Snippet',
    description: '3D flip-card memory game with rotateY flips, match pulse-glow, lightweight confetti burst and a move/time-locked click guard. Exports to React.',
    about: {
      title: 'Memory Match Game — 3D Card Flip, Match-Lock State Machine & Lightweight Confetti Burst in Vanilla JS',
      description: `A memory-matching game looks simple — flip two cards, check if they match, repeat — but a naive click handler breaks almost immediately under fast, real-world clicking. This snippet implements the classic game using the same 3D CSS flip mechanics as the site\'s [3D flip card](/ui-snippets/3d-flip-card/) and [flip card modal](/ui-snippets/flip-card-modal/) snippets, paired with a small but essential game-state guard, a move counter, a live elapsed timer, and a hand-rolled particle-burst celebration effect using the Web Animations API rather than a canvas confetti library.

**The 3D flip: perspective, preserve-3d, backface-visibility**

Each card lives inside a .card-scene wrapper; the grid container itself carries perspective: 900px, establishing the 3D viewing context all cards share. Each .card has transform-style: preserve-3d so its two face children are rendered in that same 3D space rather than flattened. The .face-front is pre-rotated to rotateY(180deg) at rest and both faces use backface-visibility: hidden, so only one face is ever visible at a given rotation — exactly the same four-property combination documented in this library\'s other 3D flip snippets. Toggling .flipped on the card rotates it 180 degrees on the Y axis, simultaneously turning the back (question-mark) face away from the viewer and bringing the pre-rotated front face around to face them.

**Why a lock flag is required, not optional**

Without a guard, the click handler has an obvious race condition: a player flips two mismatched cards, sees they do not match, and — before the short "let me memorize this" pause finishes and the mismatched pair auto-flips back — clicks a third card. At that moment flippedCards already holds two entries; a naive implementation would push a third, and either the match-comparison logic silently breaks (comparing the wrong pair, or leaving a card permanently flipped) or the player briefly sees a card face they should not have access to yet, undermining the entire point of the memory challenge. This snippet\'s onCardClick() defends against exactly that: the moment a second card is flipped, locked is set to true and moves is incremented immediately, before any setTimeout fires. Every subsequent click, no matter how fast, hits the if (locked) return; guard at the very top of onCardClick() and is silently ignored until resolveMatch() or resolveMismatch() finishes and explicitly sets locked = false again. This makes "exactly zero or two cards are ever flipped-and-unresolved at once" a true invariant instead of a hopeful assumption.

**Two different pauses for two different outcomes**

A match is confirmed after a short 320ms pause (long enough to register visually, short enough not to feel like a stall) before resolveMatch() runs. A mismatch uses a longer 850ms pause before resolveMismatch() flips both cards back — deliberately longer, because the entire point of that pause is giving the player time to actually memorize which icon was where before the cards hide it again. Both pauses funnel through the same locked flag, so the length of the delay never affects correctness, only pacing.

**The match pulse-glow and lightweight confetti**

A successful match adds .matched, which triggers a pulse-glow keyframe animation (a brief scale-up-and-back on the already-flipped card) and a persistent green glow via box-shadow on the front face. Independently, burstConfetti() reads the card\'s live getBoundingClientRect() to find its screen-space center, then spawns ten small colored divs positioned at that point and animates each one with the native Element.animate() Web Animations API — no requestAnimationFrame loop, no external confetti library, no canvas. Each bit gets a random angle and distance and animates from its spawn point to that offset with fading opacity and a random rotation, and removes itself from the DOM in the animation\'s onfinish callback so nothing lingers. Finishing the last pair triggers a larger 40-piece burst from the grid\'s center as a bigger celebration moment, layered under the win banner that fades in with the final move count and elapsed time.

**Move counter and live timer**

moves increments once per pair-attempt (not per single card click), matching how memory games conventionally score. The timer starts lazily — startTimerIfNeeded() only fires Date.now() and starts a setInterval on the very first card flip of a game, not on page load — so idle time before a player\'s first move is never counted, and it is stopped precisely once the final pair matches by reading the same startTime reference used to display the running clock, guaranteeing the final recorded time matches what was on-screen the moment the game ended.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click any face-down card to flip it', text: 'The card rotates 180 degrees around the Y axis using a real 3D transform, revealing its icon. The move timer starts counting from this first click.' },
      { title: 'Click a second card to attempt a match', text: 'Once two cards are flipped, further clicks are briefly ignored while the game checks the pair — this prevents a fast third click from interrupting the comparison.' },
      { title: 'Watch a matched pair pulse and glow', text: 'Matching icons trigger a quick scale-up pulse plus a green glow on both cards, and a small burst of colored particles fires from each card\'s position.' },
      { title: 'Watch a mismatched pair flip back', text: 'Non-matching cards stay visible slightly longer than a match (to give you time to memorize them) before automatically flipping face-down again.' },
      { title: 'Track your move count and elapsed time in the HUD', text: 'Both counters update live above the grid — moves increases once per pair attempt, and the timer keeps running until the very last pair is matched.' },
      { title: 'Clear the board to trigger the win celebration', text: 'Matching all pairs stops the timer, fires a larger confetti burst from the center of the grid, and shows a banner with your final move count and time.' },
    ]},
    features: [
      'Real 3D CSS flip: perspective + preserve-3d + backface-visibility, matching the site\'s other flip-card snippets',
      'Lock flag prevents a fast third click from corrupting an in-progress match comparison',
      'Different pause durations for match (320ms) vs mismatch (850ms) resolution',
      'Fisher-Yates shuffle reruns on every restart for a genuinely random layout',
      'Live move counter incrementing once per pair attempt, not per single card click',
      'Lazily-started elapsed timer that only begins on the first card flip, not on page load',
      'Lightweight confetti burst built on the native Element.animate() Web Animations API, no canvas or library',
      'Match pulse-glow keyframe animation plus a persistent green accent glow on solved pairs',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Kids\' learning apps and educational games', desc: 'A ready-made memory game shell for teaching apps — swap the emoji deck for vocabulary words, country flags, or math facts, and pair with a [confetti celebration card](/ui-snippets/confetti-celebration-card/) styled banner for extra reward feedback.' },
      { icon: 'APP', title: 'Marketing mini-games and engagement widgets', desc: 'Embed as a lightweight branded mini-game on a landing page or email campaign, swapping icons for product images or logo variants to drive time-on-page.' },
      { icon: 'CODE', title: 'Reference implementation for 3D flip-card mechanics', desc: 'Study the perspective/preserve-3d/backface-visibility trio alongside the [3D flip card](/ui-snippets/3d-flip-card/) and [3D card tilt](/ui-snippets/3d-card-tilt/) snippets to build your own card-flip interaction from a consistent, understood pattern.' },
      { icon: 'LEARN', title: 'Teaching race-condition-safe UI state machines', desc: 'A concrete, small example of why a "lock" flag is needed around asynchronous UI transitions — directly applicable to any interaction involving a timed pause between two user actions, not just games.' },
      { icon: 'DESIGN', title: 'Onboarding and micro-interaction showcases', desc: 'Use the pulse-glow and lightweight confetti burst as a template for celebratory micro-interactions elsewhere in a product, such as a completed checklist item or a finished onboarding step.' },
      { icon: 'CODE', title: 'Related: Logic Gate Puzzle Game', desc: 'See the [Logic Gate Puzzle Game](/ui-snippets/logic-gate-puzzle-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pixel Platformer Game', desc: 'See the [Pixel Platformer Game](/ui-snippets/pixel-platformer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do I need a "lock" flag instead of just checking if two cards are already flipped?', a: 'Checking flippedCards.length === 2 alone is not enough, because that check happens synchronously on click while the mismatch-resolution setTimeout is still pending in the background. A player who clicks fast enough could flip a third card during the window after two mismatched cards are shown but before their flip-back timeout has fired, at which point flippedCards briefly holds an invalid third entry. Setting locked = true the instant the second card of a pair is flipped, checked at the very top of every click handler call, closes that window completely regardless of timing.' },
      { q: 'Why is the pause before a mismatch longer than the pause before a match?', a: 'A match pause (320ms) only needs to be long enough to visually confirm the pair before the pulse-glow plays — the cards are staying flipped anyway. A mismatch pause (850ms) has to give the player enough real time to actually study and memorize both revealed icons before they flip back and hide again, since remembering card positions is the entire point of the game; a too-short mismatch pause makes the game frustrating rather than challenging.' },
      { q: 'How do I change the number of cards or the icon set?', a: 'Edit the ICONS array at the top of the script — each entry becomes one matched pair, so an 8-item array produces a 16-card (4x8 grid works well up to 6 pairs; adjust grid-template-columns in the CSS for larger sets) grid. buildDeck() automatically duplicates and shuffles whatever list you provide, so no other code needs to change.' },
      { q: 'Can I use this memory game in React, Vue, or Angular?', a: 'Yes. In React, replace the module-level deck/flippedCards/locked variables with useState, and move startTimerIfNeeded\'s setInterval into a useEffect, storing the interval id in a ref and calling clearInterval on it in the cleanup function so a mid-game unmount does not leave a stray timer running. In Vue, hold the same state in ref()/reactive() and start/stop the interval in onMounted/onUnmounted. In Angular, manage it as component fields and clear the interval in ngOnDestroy. The Web Animations API confetti burst (Element.animate()) needs no cleanup in any framework since each animation removes its own DOM node in its onfinish callback.' },
      { q: 'Why use Element.animate() for confetti instead of a canvas or requestAnimationFrame loop?', a: 'The Web Animations API lets the browser\'s compositor drive each particle\'s transform and opacity animation independently and efficiently, without a JavaScript frame loop tracking dozens of particles\' positions manually. Each confetti-bit is a tiny absolutely-positioned div whose entire animation (translate, rotate, fade) is described once as keyframes and handed to the browser; the onfinish callback removing the element from the DOM is the only JS involvement after spawn, keeping the effect cheap even when many bursts fire in quick succession.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI assistant like Claude and ask it to walk through the exact sequence of events that would go wrong if the locked flag were removed — specifically what a fast third click does to the flippedCards array and why that breaks match detection. It is also worth asking whether resolveMismatch and resolveMatch could be merged into one function with a single "isMatch" branch to reduce duplication, or whether keeping them separate is clearer given their different pause durations. For extending the game, ask for a difficulty selector that changes the grid size and icon count, a best-time leaderboard using localStorage, or a two-player alternating-turns mode where a mismatch passes the turn to the other player.`,
      prompt: `Build a memory-matching card game in plain HTML, CSS, and JavaScript using a real 3D CSS card flip — no canvas, no animation library.

Requirements:
- A grid of face-down cards, each built from a perspective-contained wrapper and a card element using transform-style: preserve-3d, with a back face (question mark) and a front face (icon) both using backface-visibility: hidden, the front face pre-rotated to rotateY(180deg) so toggling a single "flipped" class on the card performs the actual flip.
- Clicking a face-down, non-matched card flips it and adds it to a small "currently flipped" list; clicking a second card triggers a comparison after a short delay.
- A "lock" boolean flag that gets set to true the instant a second card is flipped (before any comparison delay runs) and is only cleared after the match or mismatch has fully resolved, with the click handler ignoring all clicks while locked is true. Explain in a comment the exact race condition this prevents: a fast third click landing while two mismatched cards are still shown, before their automatic flip-back has happened.
- Use a noticeably longer pause before flipping mismatched cards back down than before confirming a match, since the mismatch pause is what gives the player time to memorize the two revealed cards.
- On a successful match, play a pulse/glow animation on both matched cards and spawn a small lightweight confetti-style particle burst (a handful of small colored elements animating outward and fading, built with the native Element.animate() Web Animations API rather than a canvas or external library) from the matched cards' position.
- Track and display a move counter (incremented once per pair attempt) and an elapsed timer that starts on the first card flip (not on page load) and stops the moment all pairs are matched.
- When every pair is matched, show a win banner with the final move count and time, plus a larger confetti burst from the center of the board.`,
    },
  },
};

export default memoryMatchGame;
