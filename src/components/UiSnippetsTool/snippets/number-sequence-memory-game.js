const numberSequenceMemoryGame = {
  id: 'number-sequence-memory-game',
  title: 'Number Sequence Memory Game',
  category: 'games',
  html: `<div class="span-app">
  <div class="span-header">
    <h2>Digit Span</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Level</span><span class="stat-val" id="stat-level">1</span></div>
      <div class="stat"><span class="stat-label">Lives</span><span class="stat-val" id="stat-lives">&#9679;&#9679;&#9679;</span></div>
      <div class="stat"><span class="stat-label">Best</span><span class="stat-val" id="stat-best">--</span></div>
    </div>
  </div>

  <div class="stage">
    <div class="display" id="display">Watch</div>
  </div>

  <p class="status" id="status">Memorize the sequence as it appears, one digit at a time.</p>

  <div class="entry" id="entry-wrap" hidden>
    <div class="typed" id="typed"></div>
    <div class="keypad" id="keypad"></div>
    <div class="entry-actions">
      <button id="clear-btn" class="ghost-btn">Clear</button>
      <button id="submit-btn" class="primary-btn">Submit</button>
    </div>
  </div>

  <button class="primary-btn" id="start-btn">Start game</button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; }

.span-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

.span-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.span-header h2 { font-size: 19px; font-weight: 800; color: #f1f5f9; }

.stats { display: flex; gap: 8px; }
.stat { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 5px 11px; min-width: 52px; text-align: center; }
.stat-label { display: block; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b; }
.stat-val { display: block; font-size: 14px; font-weight: 800; color: #a5b4fc; letter-spacing: 2px; }

.stage {
  width: 100%; height: 130px;
  background: #1e293b; border: 1px solid #334155; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
}
.display {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 56px; font-weight: 800; color: #a5b4fc;
  transition: opacity 0.1s, transform 0.1s;
}
.display.flash { color: #f8fafc; transform: scale(1.15); }
.display.idle { font-size: 18px; color: #475569; font-weight: 600; font-family: system-ui, sans-serif; }

.status { font-size: 13px; color: #94a3b8; text-align: center; min-height: 18px; }
.status.bad { color: #f87171; }
.status.good { color: #4ade80; }

.entry { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.typed {
  min-height: 30px; font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 22px; font-weight: 700; letter-spacing: 6px; color: #f1f5f9;
}
.keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; max-width: 260px; }
.key {
  background: #1e293b; border: 1px solid #334155; border-radius: 10px;
  padding: 14px 0; font-size: 18px; font-weight: 700; color: #e2e8f0;
  cursor: pointer; font-family: inherit; transition: background 0.1s, transform 0.1s;
}
.key:hover { background: #334155; }
.key:active { transform: scale(0.95); }

.entry-actions { display: flex; gap: 10px; }
.ghost-btn {
  background: none; border: 1.5px solid #334155; border-radius: 10px;
  padding: 9px 18px; font-size: 12.5px; font-weight: 700; color: #cbd5e1;
  cursor: pointer; font-family: inherit;
}
.ghost-btn:hover { border-color: #64748b; }
.primary-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 9px 22px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
  transition: background 0.15s;
}
.primary-btn:hover { background: #4f46e5; }
.primary-btn:disabled { opacity: 0.5; cursor: default; }`,
  js: `let level = 1;
let lives = 3;
let best = null;
let sequence = [];
let typed = '';
let playing = false;
let showing = false;

const displayEl = document.getElementById('display');
const statusEl = document.getElementById('status');
const entryWrap = document.getElementById('entry-wrap');
const typedEl = document.getElementById('typed');
const keypadEl = document.getElementById('keypad');
const levelEl = document.getElementById('stat-level');
const livesEl = document.getElementById('stat-lives');
const bestEl = document.getElementById('stat-best');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');

function buildKeypad() {
  keypadEl.innerHTML = '';
  '1234567890'.split('').forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'key';
    btn.textContent = d;
    btn.type = 'button';
    btn.addEventListener('click', () => onDigit(d));
    keypadEl.appendChild(btn);
  });
}

function onDigit(d) {
  if (!playing || showing) return;
  if (typed.length >= sequence.length) return;
  typed += d;
  renderTyped();
}

function renderTyped() {
  typedEl.textContent = typed.split('').join(' ') || '\\u00b7';
}

function renderLives() {
  livesEl.textContent = '\\u25cf'.repeat(lives) + '\\u25cb'.repeat(Math.max(0, 3 - lives));
}

function randomDigit() {
  return String(Math.floor(Math.random() * 10));
}

async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function showSequence() {
  showing = true;
  entryWrap.hidden = true;
  displayEl.classList.remove('idle');
  statusEl.textContent = 'Watch closely...';
  statusEl.className = 'status';
  await sleep(500);

  const speed = Math.max(430, 900 - level * 35);
  for (let i = 0; i < sequence.length; i++) {
    displayEl.textContent = sequence[i];
    displayEl.classList.add('flash');
    await sleep(speed * 0.55);
    displayEl.classList.remove('flash');
    await sleep(speed * 0.45);
    displayEl.textContent = '';
    await sleep(90);
  }

  displayEl.textContent = '?';
  showing = false;
  typed = '';
  renderTyped();
  entryWrap.hidden = false;
  statusEl.textContent = \`Enter all \${sequence.length} digits in order.\`;
}

function nextRound() {
  sequence = Array.from({ length: level + 2 }, randomDigit);
  showSequence();
}

function onSubmit() {
  if (!playing || showing) return;
  if (typed.length !== sequence.length) {
    statusEl.textContent = \`Enter all \${sequence.length} digits before submitting.\`;
    statusEl.className = 'status bad';
    return;
  }
  if (typed === sequence.join('')) {
    statusEl.textContent = 'Correct! Level up.';
    statusEl.className = 'status good';
    level++;
    levelEl.textContent = String(level);
    if (best === null || level - 1 > best) {
      best = level - 1;
      bestEl.textContent = String(best);
    }
    entryWrap.hidden = true;
    displayEl.textContent = String(level);
    setTimeout(nextRound, 850);
  } else {
    lives--;
    renderLives();
    if (lives <= 0) {
      endGame();
    } else {
      statusEl.textContent = \`Not quite. The sequence was \${sequence.join('')}. \${lives} lives left.\`;
      statusEl.className = 'status bad';
      entryWrap.hidden = true;
      setTimeout(nextRound, 1600);
    }
  }
}

function endGame() {
  playing = false;
  entryWrap.hidden = true;
  displayEl.classList.add('idle');
  displayEl.textContent = 'Game over';
  statusEl.textContent = \`You reached level \${level} with a max span of \${level + 1} digits. Best cleared level: \${best || 0}.\`;
  statusEl.className = 'status bad';
  startBtn.hidden = false;
  startBtn.textContent = 'Play again';
}

function startGame() {
  level = 1;
  lives = 3;
  playing = true;
  renderLives();
  levelEl.textContent = '1';
  startBtn.hidden = true;
  displayEl.classList.remove('idle');
  nextRound();
}

buildKeypad();
renderLives();
submitBtn.addEventListener('click', onSubmit);
clearBtn.addEventListener('click', () => { typed = ''; renderTyped(); });
startBtn.addEventListener('click', startGame);
window.addEventListener('keydown', e => {
  if (!playing || showing) return;
  if (/^[0-9]$/.test(e.key)) onDigit(e.key);
  else if (e.key === 'Enter') onSubmit();
  else if (e.key === 'Backspace') { typed = typed.slice(0, -1); renderTyped(); }
});

/* wdp-share:start */
(function () {
  var TITLE = 'Number Sequence Memory Game', URL = 'https://webdevpuneet.com/ui-snippets/number-sequence-memory-game/';
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
    title: 'Number Sequence Memory Game — Free JS Snippet',
    description: 'A digit-span recall game that flashes a growing number sequence one digit at a time and has you type it back, with levels, lives and a best score. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Number Sequence Memory Game — Digit-Span Recall with Adaptive Speed and Lives',
      description: `A digit span test measures short-term working memory by showing a sequence of digits and asking the subject to recall it in order — the length of sequence someone can reliably reproduce is a well-known memory benchmark. This snippet turns that test into a small game: digits flash one at a time in a display panel, the sequence grows by one digit every level, playback speeds up as levels rise, and the player has three lives before the run ends.

**Why this is a distinct mechanic from a color-pattern game**

A game like Simon shows a spatial or color-coded pattern that the player reproduces by clicking the same colored panels back — recall there is tied to spatial/visual position memory. This game instead shows abstract digits in a single fixed location, one after another, with no spatial cues to lean on at all — the only information available is the digit's identity and its position in the sequence, which is a purer test of sequential working memory (the same skill exercised by remembering a phone number or a one-time verification code).

**Building and revealing a sequence**

\`nextRound()\` generates a fresh sequence of \`level + 2\` random digits via \`randomDigit()\`, so level 1 starts at three digits and each subsequent level adds one more, following the same escalating-difficulty structure classic digit-span tests use. \`showSequence()\` is an \`async\` function that reveals the sequence one character at a time: each digit is written into \`displayEl.textContent\`, briefly gets a \`.flash\` class (scaling and brightening it for a beat), then clears before the next digit appears, all paced by \`await sleep(ms)\` calls built on a small Promise-wrapped \`setTimeout\`. The pacing itself is adaptive: \`Math.max(430, 900 - level * 35)\` shortens the per-digit reveal time as level increases, so later levels are not only longer but genuinely faster, compounding the difficulty the way real digit-span protocols do.

**Numeric keypad and keyboard input working together**

Once the sequence finishes playing, an on-screen numeric keypad (\`buildKeypad()\` generates ten \`.key\` buttons) and physical keyboard digit keys both feed the same \`onDigit()\` handler, which appends to a \`typed\` string only while \`playing\` is true and \`showing\` is false — guarding against accidental input while the sequence is still animating. A \`window.addEventListener('keydown', ...)\` listener mirrors every keypad action for number keys, Enter (submit), and Backspace (delete last digit), so the game is equally playable by mouse/touch or keyboard alone.

**Scoring: levels, a hard three-life limit, and a persisted best**

Every correct submission increments \`level\` and immediately starts the next, longer round; an incorrect submission decrements \`lives\`, reveals the correct sequence briefly in the status text so the player learns what they missed, and continues if lives remain. When \`lives\` reaches zero, \`endGame()\` stops the loop, reports the level reached, and updates \`best\` — the highest fully-cleared level — only if this run beat the previous record, giving a simple, comparable score across sessions of the same page load.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click Start game', text: 'startGame() resets level to 1, lives to 3, and immediately calls nextRound() to generate and reveal the first sequence.' },
        { title: 'Watch the sequence', text: 'Digits flash one at a time in the display panel via showSequence(). No input is accepted while showing is true, so just watch until a "?" appears.' },
        { title: 'Type the sequence back', text: 'Use the on-screen keypad or your physical number keys to re-enter the digits in the exact order shown. Backspace or the Clear button lets you correct a mistake before submitting.' },
        { title: 'Submit and check the result', text: 'Press Submit or hit Enter. A correct match advances you to a longer, faster sequence at the next level; a wrong answer costs one life and reveals the correct sequence.' },
        { title: 'Track lives and best level', text: 'The Lives stat shows filled/empty dots for your three lives. The Best stat records the highest level you have fully cleared this session.' },
        { title: 'Tune the difficulty curve', text: 'Adjust level + 2 in nextRound() to change the starting sequence length, or the 900 - level * 35 formula in showSequence() to change how quickly playback speeds up per level.' },
      ],
    },
    features: [
      'Sequence length grows by one digit every level, following classic digit-span test structure',
      'Adaptive playback speed: Math.max(430, 900 - level * 35) speeds up reveal timing as levels rise',
      'Async/await-based reveal loop built on a Promise-wrapped setTimeout sleep() helper',
      'Dual input: an on-screen numeric keypad and physical keyboard digit keys both feed the same handler',
      'Input guarded against accidental entry while the sequence is still animating (showing flag)',
      'Three-life system with dot indicators; a wrong answer reveals the correct sequence before continuing',
      'Best-level tracking compares each completed run against the session high score',
      'Backspace and Clear controls let players fix a mistyped digit before submitting',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Working memory training and cognitive warm-ups', desc: 'Digit-span recall is a standard, research-backed way to exercise short-term working memory, useful as a quick brain-training exercise distinct from spatial games like the [Simon sequence game](/ui-snippets/simon-sequence-game/).' },
      { icon: 'APP', title: 'Daily brain-training or puzzle app widget', desc: 'The level/lives/best structure gives this enough of a game loop to serve as a standalone daily challenge or mini-game inside a larger puzzle or brain-training product.' },
      { icon: 'GAME', title: 'Loading-screen or waiting-room distraction', desc: 'Small, self-contained and dependency-free, this drops cleanly into an idle moment in a product — a queue screen, a matchmaking wait, or an empty state — without needing a backend.' },
      { icon: 'CODE', title: 'Reference for async/await-paced UI animation sequences', desc: 'showSequence() is a clean, readable example of using async/await with a Promise-based sleep() helper to pace a multi-step visual reveal, reusable anywhere a UI needs a timed step-by-step animation.' },
      { icon: 'DESIGN', title: 'Accessible dual-input pattern showcase', desc: 'The shared onDigit() handler wired to both an on-screen keypad and physical keyboard events is a good reference pattern for any numeric-entry widget that needs to support touch, mouse, and keyboard equally.' },
    ],
    faqs: [
      { q: 'How is this different from the Simon sequence game?', a: 'Simon-style games test spatial and color-pattern memory by having the player click the same colored panels back in order. This game shows abstract digits in a single fixed location with no spatial cues, testing pure sequential working memory instead — closer to a real digit-span cognitive test.' },
      { q: 'How does the difficulty increase over levels?', a: 'Two things scale together: the sequence itself grows by one digit every level (level + 2 digits), and the reveal speed accelerates via Math.max(430, 900 - level * 35), so higher levels are both longer to remember and shown to you more quickly.' },
      { q: 'What happens when I run out of lives?', a: 'endGame() is called once lives reaches zero. It stops accepting input, shows a game-over message reporting the level you reached and your best fully-cleared level for the session, and reveals the Play again button.' },
      { q: 'Can I use the keyboard instead of clicking the on-screen keypad?', a: 'Yes. A window keydown listener accepts digit keys 0-9, Enter to submit, and Backspace to delete the last typed digit, mirroring every action available through the on-screen keypad.' },
      { q: 'Does the best level persist after I close the page?', a: 'No, best is stored in a plain JavaScript variable that resets on reload. To persist it across visits, read and write its value to localStorage inside startGame() and wherever best is updated in onSubmit().' },
      { q: 'Why use async/await with a sleep() helper instead of setInterval?', a: 'Async/await with a Promise-wrapped setTimeout makes the multi-step reveal (show digit, flash, clear, pause, repeat) read as straightforward sequential code rather than a chain of nested callbacks or a manually tracked interval index, and makes it easy to change per-step timing based on the current level.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the async showSequence() function paces the digit reveal using the sleep() helper, and why the playback speed formula caps at a minimum of 430ms per digit rather than continuing to accelerate indefinitely. It is also a good candidate for extension — ask the assistant to add a difficulty mode using letters or a mix of letters and digits instead of only 0-9, a visual-only "flash the digit's position on a grid" variant that also tests spatial memory, or persistent best-score tracking via localStorage so a returning player has a personal record to beat across sessions.`,
      prompt: `Build a digit-span memory recall game in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- On starting a level, generate a random sequence of digits whose length increases by one on every level (e.g. level 1 shows 3 digits, level 2 shows 4, and so on), and reveal it one digit at a time in a single display area using async/await-paced timing (not setInterval), with the reveal speed for each digit becoming faster at higher levels down to some reasonable minimum floor.
- After the sequence finishes revealing, present both an on-screen numeric keypad (0-9 buttons) and support physical keyboard digit key presses, both feeding into the same input-handling function, to let the player re-enter the digits in the exact order shown.
- Provide a Submit action (also triggerable with the Enter key) that compares the typed digits to the actual sequence: an exact match advances to a longer, faster next level; any mismatch consumes one of three lives and reveals what the correct sequence actually was.
- Add a Backspace/Clear way to correct mistyped digits before submitting, and disable all input while the sequence is actively being revealed so it cannot be typed over.
- Track and display the current level, remaining lives as a simple indicator, and the highest level fully cleared so far during the session. When lives reach zero, stop the game, show a game-over summary of the level reached, and offer a Play again control that resets state and starts a fresh run.`,
    },
  },
};

export default numberSequenceMemoryGame;
