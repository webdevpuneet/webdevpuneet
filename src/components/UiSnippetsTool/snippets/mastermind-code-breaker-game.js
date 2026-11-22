const mastermindCodeBreakerGame = {
  id: 'mastermind-code-breaker-game',
  title: 'Mastermind Code Breaker Game',
  category: 'games',
  html: `<div class="mm-app">
  <div class="mm-header">
    <h2>Code Breaker</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Guess</span><span class="stat-val" id="mm-turn">1/10</span></div>
    </div>
  </div>

  <p class="mm-goal">Crack the 4-peg secret code. Black pegs mean right color, right spot. White pegs mean right color, wrong spot.</p>

  <div class="mm-current" id="mm-current"></div>

  <div class="mm-palette" id="mm-palette"></div>

  <div class="mm-row-actions">
    <button class="ghost-btn" id="mm-clear">Clear</button>
    <button class="solid-btn" id="mm-submit">Submit guess</button>
  </div>

  <p class="mm-feedback" id="mm-feedback">Pick 4 colors, then submit.</p>

  <div class="mm-board" id="mm-board"></div>

  <div class="mm-actions">
    <button class="ghost-btn" id="mm-new">New code</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.mm-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }

.mm-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.mm-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 56px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 14px; font-weight: 800; color: #6366f1; }

.mm-goal { font-size: 12.5px; color: #475569; text-align: center; line-height: 1.6; }

.mm-current { display: flex; gap: 8px; }
.mm-slot { width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; border: 2px dashed #cbd5e1; }
.mm-slot.filled { border-style: solid; }

.mm-palette { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.mm-swatch { width: 32px; height: 32px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.08); cursor: pointer; transition: transform 0.1s; }
.mm-swatch:hover { transform: scale(1.12); }

.mm-row-actions { display: flex; gap: 8px; }
.solid-btn {
  background: #1e293b; color: #f1f5f9; border: none; border-radius: 10px;
  padding: 9px 18px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit;
}
.solid-btn:hover { background: #334155; }
.solid-btn:disabled { opacity: 0.45; cursor: not-allowed; }

.mm-feedback { font-size: 12.5px; font-weight: 600; color: #64748b; text-align: center; min-height: 16px; }
.mm-feedback.win { color: #16a34a; font-weight: 800; }
.mm-feedback.lose { color: #dc2626; font-weight: 800; }

.mm-board { width: 100%; display: flex; flex-direction: column-reverse; gap: 6px; max-height: 260px; overflow-y: auto; }
.mm-guess-row { display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 12px; }
.mm-guess-pegs { display: flex; gap: 6px; }
.mm-peg { width: 20px; height: 20px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.08); }
.mm-feedback-pegs { display: grid; grid-template-columns: repeat(2, 8px); gap: 4px; }
.mm-fpeg { width: 8px; height: 8px; border-radius: 50%; }
.mm-fpeg.black { background: #1e293b; }
.mm-fpeg.white { background: #fff; border: 1px solid #94a3b8; }
.mm-fpeg.none { background: transparent; }

.mm-actions { display: flex; gap: 10px; }
.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `const COLORS = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
const CODE_LENGTH = 4;
const MAX_TURNS = 10;

let secret = [];
let currentGuess = [];
let turn = 1;
let over = false;

const currentEl = document.getElementById('mm-current');
const paletteEl = document.getElementById('mm-palette');
const boardEl = document.getElementById('mm-board');
const feedback = document.getElementById('mm-feedback');
const turnEl = document.getElementById('mm-turn');
const submitBtn = document.getElementById('mm-submit');

function randomSecret() {
  const code = [];
  for (let i = 0; i < CODE_LENGTH; i++) {
    code.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }
  return code;
}

function buildPalette() {
  paletteEl.innerHTML = '';
  COLORS.forEach((color) => {
    const sw = document.createElement('button');
    sw.type = 'button';
    sw.className = 'mm-swatch';
    sw.style.background = color;
    sw.addEventListener('click', () => addPeg(color));
    paletteEl.appendChild(sw);
  });
}

function renderCurrent() {
  currentEl.innerHTML = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    const slot = document.createElement('div');
    slot.className = 'mm-slot';
    if (currentGuess[i]) {
      slot.classList.add('filled');
      slot.style.background = currentGuess[i];
    }
    currentEl.appendChild(slot);
  }
  submitBtn.disabled = currentGuess.length !== CODE_LENGTH || over;
}

function addPeg(color) {
  if (over || currentGuess.length >= CODE_LENGTH) return;
  currentGuess.push(color);
  renderCurrent();
}

// Black pegs: correct color in the correct position.
// White pegs: correct color present elsewhere, matched one-for-one so a color
// already accounted for by a black or white peg cannot be reused.
function scoreGuess(guess) {
  const secretLeft = [];
  const guessLeft = [];
  let black = 0;

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guess[i] === secret[i]) {
      black++;
    } else {
      secretLeft.push(secret[i]);
      guessLeft.push(guess[i]);
    }
  }

  let white = 0;
  guessLeft.forEach((color) => {
    const pos = secretLeft.indexOf(color);
    if (pos !== -1) {
      white++;
      secretLeft.splice(pos, 1);
    }
  });

  return { black, white };
}

function renderRow(guess, score) {
  const row = document.createElement('div');
  row.className = 'mm-guess-row';

  const pegs = document.createElement('div');
  pegs.className = 'mm-guess-pegs';
  guess.forEach((color) => {
    const peg = document.createElement('span');
    peg.className = 'mm-peg';
    peg.style.background = color;
    pegs.appendChild(peg);
  });

  const fpegs = document.createElement('div');
  fpegs.className = 'mm-feedback-pegs';
  const total = [];
  for (let i = 0; i < score.black; i++) total.push('black');
  for (let i = 0; i < score.white; i++) total.push('white');
  while (total.length < CODE_LENGTH) total.push('none');
  total.forEach((kind) => {
    const f = document.createElement('span');
    f.className = 'mm-fpeg ' + kind;
    fpegs.appendChild(f);
  });

  row.appendChild(pegs);
  row.appendChild(fpegs);
  boardEl.appendChild(row);
}

function submitGuess() {
  if (over || currentGuess.length !== CODE_LENGTH) return;
  const score = scoreGuess(currentGuess);
  renderRow(currentGuess, score);

  if (score.black === CODE_LENGTH) {
    over = true;
    feedback.textContent = 'Code broken in ' + turn + ' guess' + (turn === 1 ? '' : 'es') + '!';
    feedback.className = 'mm-feedback win';
  } else if (turn >= MAX_TURNS) {
    over = true;
    feedback.textContent = 'Out of guesses. Click "New code" to try again.';
    feedback.className = 'mm-feedback lose';
  } else {
    turn++;
    turnEl.textContent = turn + '/' + MAX_TURNS;
    feedback.textContent = score.black + ' black, ' + score.white + ' white. Keep guessing.';
    feedback.className = 'mm-feedback';
  }

  currentGuess = [];
  renderCurrent();
}

function newGame() {
  secret = randomSecret();
  currentGuess = [];
  turn = 1;
  over = false;
  turnEl.textContent = turn + '/' + MAX_TURNS;
  feedback.textContent = 'Pick 4 colors, then submit.';
  feedback.className = 'mm-feedback';
  boardEl.innerHTML = '';
  renderCurrent();
}

document.getElementById('mm-submit').addEventListener('click', submitGuess);
document.getElementById('mm-clear').addEventListener('click', () => { currentGuess = []; renderCurrent(); });
document.getElementById('mm-new').addEventListener('click', newGame);

buildPalette();
newGame();

/* wdp-share:start */
(function () {
  var TITLE = 'Mastermind Code Breaker Game', URL = 'https://webdevpuneet.com/ui-snippets/mastermind-code-breaker-game/';
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
    title: 'Mastermind Code Breaker Game — Free HTML CSS JS Snippet',
    description: 'A playable color-peg deduction game with black/white peg scoring, a 10-guess limit and no external word or code libraries. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Mastermind Code Breaker Game — Black/White Peg Deduction Logic in Vanilla JS',
      description: `Mastermind is a classic code-breaking deduction game: the computer picks a hidden sequence of colored pegs, and the player tries to guess it within a limited number of attempts, receiving black and white peg feedback after every guess. Black means a color is in the exact right position; white means a color exists in the code but in the wrong position. This snippet implements the complete game loop — secret generation, guess building from a color palette, correct peg-counting logic (the trickiest part to get right), a scrollable guess history, and win/lose states — entirely in vanilla JavaScript.

**Generating the secret code**

\`randomSecret()\` picks \`CODE_LENGTH\` (4) colors independently at random from the \`COLORS\` palette, with repeats allowed — a real Mastermind code can and often does repeat a color, which is part of what makes deduction interesting. The secret is stored in a closured \`secret\` array and never rendered to the DOM, so it can't be read from the page source while playing.

**The peg-counting algorithm: why a naive comparison is wrong**

The subtle part of Mastermind is scoring white pegs correctly when colors repeat. A naive approach that just checks "does this guessed color exist anywhere in the secret" over-counts: if the secret has one red and the guess has three reds, only one white or black peg should be awarded for red, not three. \`scoreGuess()\` solves this with a two-pass approach. The first pass counts \`black\` pegs (exact position matches) and, for everything else, pushes the *unmatched* secret and guess colors into \`secretLeft\` and \`guessLeft\` arrays — removing already-matched positions from consideration entirely. The second pass walks \`guessLeft\` and, for each color, looks it up in \`secretLeft\` with \`indexOf\`; if found, it counts a white peg and \`splice\`s that specific slot out of \`secretLeft\` so the same secret peg can never be claimed twice. This splice-on-match step is exactly what keeps repeated colors from being over-counted.

**Building a guess from a palette, not a text input**

Instead of typing colors, the player clicks swatches in \`.mm-palette\` to push colors onto a \`currentGuess\` array, rendered live into four \`.mm-slot\` circles. This keeps the interaction fast and mirrors the physical board-game experience of placing pegs, and it structurally prevents invalid input (typos, wrong color names) since only real palette colors can ever enter \`currentGuess\`.

**Feedback pegs and turn limits**

After each submitted guess, \`renderRow()\` appends a row to the guess history containing the guessed colors and up to four small feedback pegs — black pegs first, then white, then empty placeholders — matching the classic physical presentation. \`turn\` increments on every non-winning guess and the game ends in a loss once it reaches \`MAX_TURNS\` (10) without four black pegs, or ends in a win the instant \`score.black === CODE_LENGTH\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click colors to build a guess', text: 'Click swatches in the palette to fill the four current-guess slots. Click Clear to start the row over.' },
        { title: 'Submit the guess', text: 'Once all four slots are filled, click "Submit guess" to score it against the hidden secret via scoreGuess().' },
        { title: 'Read the feedback pegs', text: 'Black pegs mean a color is in the exact right position; white pegs mean a color is in the code but the wrong position. Each color can only be claimed once per row.' },
        { title: 'Keep guessing until solved or out of turns', text: 'You get 10 guesses (MAX_TURNS). Getting four black pegs wins immediately; running out of turns ends the round.' },
        { title: 'Review the guess history', text: 'The scrollable board below the input keeps every previous guess and its feedback pegs visible, newest at the top.' },
        { title: 'Start a new code', text: 'Click "New code" at any time to generate a fresh random secret via randomSecret() and reset the turn counter.' },
      ],
    },
    features: [
      'scoreGuess() correctly handles repeated colors using a splice-based two-pass matching algorithm',
      'randomSecret() allows color repeats in the hidden code, matching real Mastermind rules',
      'Palette-based guess building prevents invalid input entirely — no typing or typos possible',
      'Live current-guess slots update as colors are picked, with a filled-state border style',
      'Scrollable guess history shows every past guess with its black/white feedback pegs',
      'Configurable CODE_LENGTH, MAX_TURNS, and COLORS constants for difficulty tuning',
      'Win detection the instant a guess earns a full set of black pegs',
      'Turn-limit loss state with a clear "out of guesses" message',
    ],
    useCases: [
      { icon: 'GAME', title: 'Logic and deduction puzzle collections', desc: 'A genuinely different deduction mechanic from pattern-recall games like [Simon](/ui-snippets/simon-sequence-game/) — this rewards elimination reasoning across multiple turns rather than memory.' },
      { icon: 'LEARN', title: 'Teaching combinatorics and information theory', desc: 'Mastermind is a standard teaching example for minimax guessing strategies and information-gain reasoning — this snippet gives students something concrete to reason about immediately.' },
      { icon: 'CODE', title: 'Reference implementation of multiset matching', desc: 'scoreGuess() is a clean, readable example of matching two multisets without double-counting shared elements, a pattern that generalizes well beyond games.' },
      { icon: 'APP', title: 'Break-time brain teaser in a product', desc: 'Drop this into an idle dashboard state or waiting screen as a self-contained puzzle with no backend or external dictionary required.' },
      { icon: 'DESIGN', title: 'Peg-and-palette UI pattern reference', desc: 'The circular swatch palette and peg-slot layout is reusable anywhere a UI needs discrete, colorful multi-slot input, such as a theme picker or tag builder.' },
    ],
    faqs: [
      { q: 'How does the scoring avoid over-counting repeated colors?', a: 'scoreGuess() first counts exact-position matches as black pegs and removes those positions from consideration. It then matches remaining guessed colors against remaining secret colors one at a time using indexOf, and splices each matched secret color out immediately so it cannot be claimed by a second white peg.' },
      { q: 'Can the secret code contain the same color more than once?', a: 'Yes. randomSecret() picks each of the four positions independently, so repeats are allowed, exactly like the physical Mastermind board game.' },
      { q: 'How many guesses do I get?', a: 'MAX_TURNS is set to 10. If you have not scored a full row of black pegs by your tenth submitted guess, the round ends in a loss and you can start a new code.' },
      { q: 'Can I read the secret code by inspecting the page?', a: 'No, the secret array is not rendered into the DOM at any point during play, so it cannot be read from the rendered HTML — only from the JavaScript source itself if you inspect the code (as with any client-side game).' },
      { q: 'How do I make the game harder or easier?', a: 'Increase CODE_LENGTH for a longer secret, add more entries to the COLORS array for more possible colors per slot, or lower MAX_TURNS to reduce the number of allowed guesses.' },
      { q: 'Can two colors ever both score as black and white for the same guess position?', a: 'No. Each guessed position is classified as black, white, or neither exactly once. A position that scores black is removed from both the secret-left and guess-left pools before white pegs are counted, so it can never also contribute a white peg.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace through scoreGuess() with a guess and secret that share a repeated color, to see exactly why the splice-based two-pass approach avoids over-counting white pegs. It is also a strong candidate for extension — ask the assistant to add a computer-opponent mode using the classic Knuth five-guess minimax algorithm, add difficulty presets that change CODE_LENGTH and the palette size together, or persist win/loss statistics across sessions with localStorage.`,
      prompt: `Build a Mastermind-style code breaker game in plain HTML, CSS, and JavaScript — no libraries, no backend.

Requirements:
- Generate a hidden secret sequence of 4 colors chosen independently at random from a palette of 6 colors, allowing repeats, and never expose it in the rendered DOM.
- Let the player build a guess by clicking color swatches, filling four visible guess slots one at a time, with a way to clear the current guess before submitting.
- On submit, score the guess against the secret using correct Mastermind rules: count a black peg for every position where the guessed color exactly matches the secret color at that position, and count a white peg for every remaining guessed color that exists somewhere else in the remaining (non-black-matched) secret positions — making sure a single secret peg can never be counted toward more than one feedback peg, even when colors repeat.
- Append each submitted guess and its resulting black/white feedback pegs to a scrollable guess history list, most recent guess at the top.
- Limit the game to 10 total guesses. Detect a win the instant a guess scores 4 black pegs, and detect a loss if the guess limit is reached without a win, disabling further input in both cases.
- Add a "New code" button that generates a fresh random secret and resets the turn counter and guess history.`,
    },
  },
};

export default mastermindCodeBreakerGame;
