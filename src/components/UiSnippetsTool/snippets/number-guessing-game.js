const numberGuessingGame = {
  id: 'number-guessing-game',
  title: 'Number Guessing Game (1-100)',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="guess-app">
  <div class="guess-header">
    <h2>Guess the Number</h2>
    <p>I'm thinking of a number between 1 and 100</p>
  </div>

  <div class="stat-row">
    <div class="stat"><span class="stat-label">Attempts</span><span class="stat-val" id="attempts-val">0</span></div>
    <div class="stat"><span class="stat-label">Range</span><span class="stat-val" id="range-val">1 - 100</span></div>
  </div>

  <form class="guess-form" id="guess-form">
    <input type="number" id="guess-input" min="1" max="100" placeholder="Enter a number..." autocomplete="off">
    <button type="submit" class="submit-btn" id="submit-btn">Guess</button>
  </form>

  <p class="feedback" id="feedback">Make your first guess!</p>

  <div class="win-panel" id="win-panel">
    <p class="win-title" id="win-title"></p>
    <p class="win-note">Optimal play (always guessing the midpoint of what's left) solves any 1-100 game in at most 7 guesses — that's binary search in action.</p>
    <button class="play-again-btn" id="play-again-btn">Play again</button>
  </div>

  <div class="history-wrap">
    <p class="history-label">Guess history</p>
    <div class="history" id="history"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.guess-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

.guess-header { text-align: center; }
.guess-header h2 { font-size: 19px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.guess-header p { font-size: 13px; color: #64748b; }

.stat-row { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 7px 16px; min-width: 90px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 16px; font-weight: 800; color: #6366f1; }

.guess-form { display: flex; gap: 8px; width: 100%; }
.guess-form input {
  flex: 1; padding: 11px 14px; font-size: 15px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: inherit; outline: none;
  transition: border-color 0.15s;
}
.guess-form input:focus { border-color: #6366f1; }
.submit-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 11px 20px; font-size: 14px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: background 0.15s;
}
.submit-btn:hover { background: #4f46e5; }
.submit-btn:disabled { background: #cbd5e1; cursor: default; }

.feedback { font-size: 14px; font-weight: 700; text-align: center; min-height: 20px; display: flex; align-items: center; gap: 6px; color: #475569; }
.feedback.high { color: #dc2626; }
.feedback.low { color: #2563eb; }
.feedback.win { color: #16a34a; }

.win-panel {
  display: none;
  width: 100%;
  background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px;
  padding: 18px; text-align: center; flex-direction: column; gap: 10px;
}
.win-panel.show { display: flex; }
.win-title { font-size: 16px; font-weight: 800; color: #15803d; }
.win-note { font-size: 12px; color: #166534; line-height: 1.5; }
.play-again-btn {
  align-self: center;
  background: #16a34a; color: #fff; border: none; border-radius: 10px;
  padding: 9px 20px; font-size: 13px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: background 0.15s;
}
.play-again-btn:hover { background: #15803d; }

.history-wrap { width: 100%; }
.history-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #94a3b8; margin-bottom: 8px; }
.history { display: flex; flex-wrap: wrap; gap: 6px; min-height: 34px; }
.history-chip {
  display: flex; align-items: center; gap: 4px;
  padding: 5px 10px; border-radius: 20px;
  font-size: 12px; font-weight: 700;
  background: #fff; border: 1px solid #e2e8f0; color: #475569;
}
.history-chip.high { border-color: #fecaca; background: #fef2f2; color: #dc2626; }
.history-chip.low { border-color: #bfdbfe; background: #eff6ff; color: #2563eb; }
.history-chip.win { border-color: #bbf7d0; background: #f0fdf4; color: #16a34a; }`,
  js: `let target = 0;
let attempts = 0;
let low = 1, high = 100;
let gameOver = false;

const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const historyEl = document.getElementById('history');
const winPanel = document.getElementById('win-panel');
const winTitle = document.getElementById('win-title');
const submitBtn = document.getElementById('submit-btn');

function newGame() {
  target = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  low = 1;
  high = 100;
  gameOver = false;
  document.getElementById('attempts-val').textContent = '0';
  document.getElementById('range-val').textContent = '1 - 100';
  feedback.textContent = 'Make your first guess!';
  feedback.className = 'feedback';
  historyEl.innerHTML = '';
  winPanel.classList.remove('show');
  input.value = '';
  input.disabled = false;
  submitBtn.disabled = false;
  input.focus();
}

function addHistoryChip(value, type) {
  const chip = document.createElement('span');
  chip.className = 'history-chip ' + type;
  const arrow = type === 'high' ? '&#8595;' : type === 'low' ? '&#8593;' : '&#10003;';
  chip.innerHTML = value + ' ' + arrow;
  historyEl.appendChild(chip);
}

function submitGuess(e) {
  e.preventDefault();
  if (gameOver) return;

  const raw = input.value.trim();
  if (raw === '') return;
  const guess = parseInt(raw, 10);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    feedback.textContent = 'Enter a whole number between 1 and 100';
    feedback.className = 'feedback';
    return;
  }

  attempts++;
  document.getElementById('attempts-val').textContent = attempts;

  if (guess === target) {
    addHistoryChip(guess, 'win');
    feedback.textContent = 'You got it!';
    feedback.className = 'feedback win';
    winTitle.textContent = \`Correct! You found \${target} in \${attempts} attempt\${attempts === 1 ? '' : 's'}.\`;
    winPanel.classList.add('show');
    gameOver = true;
    input.disabled = true;
    submitBtn.disabled = true;
  } else if (guess > target) {
    if (guess < high) high = guess;
    addHistoryChip(guess, 'high');
    feedback.innerHTML = '&#8595; Too high! Try lower.';
    feedback.className = 'feedback high';
    document.getElementById('range-val').textContent = \`\${low} - \${high}\`;
  } else {
    if (guess > low) low = guess;
    addHistoryChip(guess, 'low');
    feedback.innerHTML = '&#8593; Too low! Try higher.';
    feedback.className = 'feedback low';
    document.getElementById('range-val').textContent = \`\${low} - \${high}\`;
  }

  input.value = '';
  input.focus();
}

form.addEventListener('submit', submitGuess);
document.getElementById('play-again-btn').addEventListener('click', newGame);

newGame();

/* wdp-share:start */
(function () {
  var TITLE = 'Number Guessing Game (1-100)', URL = 'https://webdevpuneet.com/ui-snippets/number-guessing-game/';
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
    title: 'Number Guessing Game 1-100 — Free JS Snippet',
    description: 'A higher/lower number guessing game with a live guess history, attempt counter, and a binary-search win tip. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Number Guessing Game (1-100) — Higher/Lower Feedback, Guess History & the Binary Search Connection',
      description: `The classic "guess the number between 1 and 100" game is a staple first project for learning conditional logic, but it's also a surprisingly direct, hands-on demonstration of binary search — one of the most important algorithms in computer science. This snippet builds the full game loop with real input validation, a persistent guess history so players can visually trace their own narrowing strategy, and an explicit callout connecting the gameplay to the underlying algorithm once the player wins.

**The core game loop**

On load, \`newGame()\` picks a secret \`target\` with \`Math.floor(Math.random() * 100) + 1\`, which produces a uniformly random integer from 1 to 100 inclusive (the \`+ 1\` shifts \`Math.random()\`'s natural 0-to-0.999... range up by one so 0 is never a possible target and 100 is reachable). Every submitted guess runs through \`submitGuess()\`, which first validates the input — rejecting empty submissions, non-numeric input via \`isNaN()\`, and anything outside the 1-100 range — before comparing the guess to \`target\` and branching into exactly one of three outcomes: a win, "too high," or "too low." Each guess increments a live \`attempts\` counter displayed at the top of the game, so players always know exactly how many tries they've used.

**Visualising the narrowing range**

Beyond the pass/fail feedback, the game tracks a running \`low\`/\`high\` bound: any guess that comes back "too high" tightens \`high\` down to that guess (since the target must be below it), and any "too low" guess raises \`low\` up to that guess. This bound is rendered live as a "Range" stat (e.g. "34 - 67") that visibly shrinks after every guess, making the search space contraction — the entire idea behind binary search — directly visible rather than something the player has to track mentally.

**The guess history as a strategy mirror**

Every guess, right or wrong, is appended as a small coloured chip to a running history list: red chips with a down arrow for "too high," blue chips with an up arrow for "too low," and a green checkmark chip for the final correct guess. Because the chips accumulate in submission order, a player can look back at their own sequence after finishing and immediately see whether they played efficiently — someone who bounced between 1, 100, 2, 99, 3 played essentially randomly, while someone who went 50, 75, 62, 68 was narrowing the interval in half each time, which is precisely optimal play.

**Why binary search guarantees a win in at most 7 guesses**

Binary search always guesses the midpoint of the remaining possible range, which discards roughly half of the remaining candidates with every single guess regardless of whether the result is "too high" or "too low." Starting from 100 possible values, repeatedly halving gives 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1, which takes \`ceil(log2(100))\` = 7 halvings to guarantee narrowing down to exactly one possible value. This is why the win panel explicitly states that optimal play — always guessing the midpoint of what's left, i.e. \`Math.floor((low + high) / 2)\` on each turn — solves any 1-100 instance of this game in at most 7 guesses, no matter how unlucky the target number is. It's a concrete, playable way to feel why binary search is \`O(log n)\` rather than \`O(n)\`: doubling the range to 1-200 only adds one more guess in the worst case (8, since \`ceil(log2(200))\` = 8), not twice as many.

**Input handling details worth noting**

The number \`<input>\` is cleared and refocused after every guess (\`input.value = ''; input.focus();\`) so players can keep typing rapid guesses without touching the mouse, and both the input and submit button are disabled once the game is won to make it unambiguous that the round has ended and "Play again" is the only next action.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Enter a guess',
          text: 'Type a whole number between 1 and 100 into the input and press Enter or click Guess. submitGuess() validates the input, rejecting empty, non-numeric, or out-of-range values with an inline message before comparing it against the hidden target.',
        },
        {
          title: 'Read the higher/lower feedback',
          text: 'Every valid guess shows an immediate directional message — "Too high! Try lower." in red with a down arrow, or "Too low! Try higher." in blue with an up arrow — and the Attempts counter increments by one on every submission, right or wrong.',
        },
        {
          title: 'Watch the range and history narrow',
          text: 'The Range stat updates after every guess to show the current low-high bounds implied by your guesses so far, and each guess is appended as a colour-coded chip to the guess history below the form so you can review your full sequence at a glance.',
        },
        {
          title: 'Win the round',
          text: 'Guessing the exact target number shows a green success message, disables further input, and opens the win panel with your total attempts and a note on optimal binary-search play, generated dynamically from the attempts variable in submitGuess().',
        },
        {
          title: 'Play again',
          text: 'Click "Play again" to call newGame(), which picks a brand new random target, resets attempts to zero, clears the low/high bounds back to 1-100, empties the guess history, hides the win panel, and re-enables the input.',
        },
        {
          title: 'Export and add to your project',
          text: 'Click HTML to download a standalone file, or JSX for a React component. In React, move target, attempts, low, high, gameOver, and the history array into useState, and derive the range display and history chips from that state rather than direct DOM manipulation.',
        },
      ],
    },
    features: [
      'Math.floor(Math.random() * 100) + 1 generates a uniformly random integer target from 1 to 100 inclusive',
      'Full input validation: rejects empty, non-numeric (isNaN), and out-of-1-100-range guesses before scoring',
      'Live low/high range tracking narrows visibly after every guess, mirroring the binary search search space',
      'Colour-coded guess history chips (red/high, blue/low, green/win) preserve the full guess sequence for review',
      'Attempts counter increments on every valid submission and is reported in the final win message',
      'Win panel explicitly explains the O(log n) binary-search strategy and the guaranteed 7-guess worst case',
      'Input auto-clears and refocuses after each guess for fast, mouse-free repeated guessing',
      'Input and submit button disable on win to make the end-of-round state unambiguous until Play again',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'Teaching binary search as a playable, intuitive exercise',
        desc: 'Rather than presenting binary search as an abstract array-searching algorithm, this game lets a learner feel the halving strategy directly: guess the midpoint, get instant higher/lower feedback, and watch the range collapse from 100 possibilities to 1 in at most 7 tries. The visible Range stat and colour-coded history make the connection between the game and the O(log n) algorithm concrete rather than theoretical.',
      },
      {
        icon: 'FORM',
        title: 'Practicing robust numeric form input validation',
        desc: 'submitGuess() is a clean, small reference for validating a number input against multiple failure modes — empty string, non-numeric text, and out-of-range values — before acting on it, a pattern directly reusable in any form that accepts bounded numeric input, like age, quantity, or rating fields.',
      },
      {
        icon: 'APP',
        title: 'A light engagement loop for a loading screen or empty state',
        desc: 'Embed this as a small distraction while a longer async operation completes elsewhere on the page. The self-contained state (target, attempts, history) and Play again flow make it easy to replay multiple rounds without ever needing a page reload.',
      },
      {
        icon: 'CODE',
        title: 'Boilerplate for building an actual computer-guesses-your-number variant',
        desc: 'Flip the roles: keep the same low/high tracking logic but have the human think of a number and the computer guess Math.floor((low + high) / 2) each turn based on the human\'s higher/lower answers, demonstrating the binary search algorithm from the other side and typically finishing in 7 guesses or fewer live in front of the user.',
      },
      {
        icon: 'DESIGN',
        title: 'A simple onboarding or tutorial interaction for a coding-education product',
        desc: 'Because the code is short, fully commented in structure, and demonstrates validation, state tracking, and a real algorithmic payoff, it works well as a first interactive exercise in a JavaScript course or bootcamp curriculum, paired with a challenge to modify the range or add a hint system, similar in spirit to the multiple-choice format of the [Guess the Hex Color Code Game](/ui-snippets/hex-color-guess-game).',
      },
      { icon: 'CODE', title: 'Related: Robot Loop Programmer Game', desc: 'See the [Robot Loop Programmer Game](/ui-snippets/robot-loop-programmer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why is it mathematically guaranteed that optimal play never needs more than 7 guesses?',
        a: 'With 100 possible target values, always guessing the exact midpoint of the remaining range eliminates roughly half of the remaining candidates on every single guess, regardless of whether the feedback is "too high" or "too low." The number of halvings needed to reduce 100 possibilities down to 1 is ceil(log2(100)), which equals 7 — so no matter how unlucky the target is, a player following the midpoint strategy perfectly will always find it in 7 guesses or fewer, and will often find it sooner.',
      },
      {
        q: 'How does the game validate guesses before scoring them?',
        a: 'submitGuess() first trims the raw input and returns early if it is an empty string, then runs parseInt(raw, 10) and checks isNaN(guess) to catch non-numeric text, and finally checks guess < 1 || guess > 100 to reject out-of-bounds numbers — showing an inline message and not incrementing the attempts counter for any of these invalid cases, so only genuine 1-100 integer guesses count toward your attempt total.',
      },
      {
        q: 'What do the low and high values actually track?',
        a: 'low and high represent the tightest known bounds on where the target must be, based purely on the feedback received so far: any "too high" guess becomes the new high (since the target must be strictly below it), and any "too low" guess becomes the new low (since the target must be strictly above it). They start at 1 and 100 respectively and only ever tighten, never loosen, which is exactly the invariant that makes binary search correct.',
      },
      {
        q: 'Does the guess history remember guesses across multiple rounds?',
        a: 'No — newGame() clears historyEl.innerHTML at the start of every round, so the history list always reflects only the current round\'s guesses. This is intentional: comparing your current round\'s strategy against a clean slate is more useful for self-assessment than an ever-growing list mixing guesses from unrelated rounds with different targets.',
      },
      {
        q: 'Can I change the range from 1-100 to something else, like 1-1000?',
        a: 'Yes — update Math.floor(Math.random() * 100) + 1 to Math.floor(Math.random() * 1000) + 1 in newGame(), change the initial high value from 100 to 1000, update the input\'s max attribute and the range-bound validation check in submitGuess(), and adjust the displayed "1 - 100" text. The worst-case optimal guess count becomes ceil(log2(1000)) = 10, so you may also want to update the win-note copy to reflect the new number.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the low/high bound tracking in submitGuess() mirrors the binary search algorithm, and why ceil(log2(100)) gives the guaranteed 7-guess worst case shown in the win panel. It's also a strong base for extension — ask the assistant to add a "hint" button that reveals whether the optimal next guess (the true midpoint of the current low/high range) would beat your next guess, a difficulty selector that changes the range to 1-1000 or 1-10, or a small results chart comparing your attempts this round against the theoretical optimal. You could also ask it to implement the reverse game mode where the computer guesses a number you're thinking of using the same binary-search midpoint strategy.`,
      prompt: `Build a number guessing game in plain HTML, CSS, and JavaScript where the computer picks a random target between 1 and 100 and the player tries to find it through repeated guesses.

Requirements:
- On game start (and on replay), silently pick a new random integer target between 1 and 100 inclusive.
- Provide a number input and submit control where the player enters a guess; validate that the input is a whole number between 1 and 100 before scoring it, showing an inline message for invalid input without counting it as an attempt.
- After each valid guess, give immediate directional feedback (a clear "too high" or "too low" message, visually distinguished, for example by color and a directional icon) and increment a visible attempts counter.
- Maintain a running low/high bound implied by the guesses so far and display it, so the player can see the possible range narrowing after each guess.
- Keep a visible, ordered history of every guess made this round, each one labeled with whether it was too high, too low, or the final correct guess.
- On a correct guess, show a clear win message including the total number of attempts taken, explain in the UI that always guessing the midpoint of the remaining range (binary search) guarantees solving any 1-100 instance in at most 7 guesses, and disable further guessing until the player chooses to play again.
- Provide a "Play again" control that fully resets all game state (new target, zero attempts, cleared history, reset bounds) without requiring a page reload.`,
    },
  },
};

export default numberGuessingGame;
