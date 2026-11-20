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
