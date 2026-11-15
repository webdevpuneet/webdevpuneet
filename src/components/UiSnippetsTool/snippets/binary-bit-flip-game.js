const binaryBitFlipGame = {
  id: 'binary-bit-flip-game',
  title: 'Binary Bit Flip Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="bb-game">
    <div class="bb-head">
      <div class="bb-meta"><span class="bb-label">Round</span><span class="bb-value" id="bbRound">1</span></div>
      <div class="bb-meta bb-center"><span class="bb-label">Streak</span><span class="bb-value" id="bbStreak">0</span></div>
      <div class="bb-meta bb-right"><span class="bb-label">Best</span><span class="bb-value" id="bbBest">0</span></div>
    </div>

    <div class="bb-target">
      <span class="bb-target-label">Build this number</span>
      <span class="bb-target-value" id="bbTarget">0</span>
    </div>

    <div class="bb-bits" id="bbBits"></div>

    <div class="bb-readout">
      <div class="bb-read"><span class="bb-read-label">binary</span><span class="bb-read-value" id="bbBinary">00000000</span></div>
      <div class="bb-read"><span class="bb-read-label">decimal</span><span class="bb-read-value bb-dec" id="bbDecimal">0</span></div>
      <div class="bb-read"><span class="bb-read-label">hex</span><span class="bb-read-value" id="bbHex">0x00</span></div>
    </div>

    <p class="bb-sum" id="bbSum">Flip bits to add their place values together.</p>
    <p class="bb-status" id="bbStatus">Tip: press keys 1-8 to flip bits from the left.</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 28px 16px; }

.bb-game {
  width: 100%; max-width: 440px; padding: 22px;
  background: #111827; border: 1px solid #1f2937; border-radius: 16px;
  display: flex; flex-direction: column; gap: 16px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.4);
}

.bb-head { display: flex; justify-content: space-between; }
.bb-meta { display: flex; flex-direction: column; gap: 2px; }
.bb-center { align-items: center; }
.bb-right { align-items: flex-end; }
.bb-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
.bb-value { font-size: 16px; font-weight: 800; color: #f9fafb; }

.bb-target {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 14px; border-radius: 12px; background: #0b1120; border: 1px solid #1f2937;
}
.bb-target-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
.bb-target-value { font-size: 38px; font-weight: 900; color: #38bdf8; line-height: 1.1; font-variant-numeric: tabular-nums; }
.bb-game.won .bb-target-value { color: #4ade80; }

.bb-bits { display: grid; grid-template-columns: repeat(8, 1fr); gap: 5px; }
.bb-bit {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 9px 0 7px; border-radius: 9px; cursor: pointer; font-family: inherit;
  background: #0b1120; border: 1.5px solid #1f2937; transition: all 0.14s;
}
.bb-bit:hover { border-color: #38bdf8; }
.bb-bit .digit { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 19px; font-weight: 800; color: #4b5563; }
.bb-bit .place { font-size: 9px; font-weight: 700; color: #4b5563; }
.bb-bit.on { background: rgba(56,189,248,0.14); border-color: #38bdf8; }
.bb-bit.on .digit { color: #38bdf8; }
.bb-bit.on .place { color: #7dd3fc; }

.bb-readout { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 6px; }
.bb-read {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 8px 4px; border-radius: 9px; background: #0b1120; border: 1px solid #1f2937;
}
.bb-read-label { font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #6b7280; }
.bb-read-value {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px; font-weight: 700; color: #e5e7eb;
}
.bb-dec { color: #38bdf8; }
.bb-game.won .bb-dec { color: #4ade80; }

.bb-sum {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px;
  color: #9ca3af; text-align: center; min-height: 17px; line-height: 1.5;
}
.bb-status { font-size: 12px; font-weight: 600; color: #6b7280; text-align: center; min-height: 17px; }
.bb-status.ok { color: #4ade80; }`,

  js: `var BITS = 8;
var BEST_KEY = 'binary-bit-flip-best';

var game = document.querySelector('.bb-game');
var bitsEl = document.getElementById('bbBits');
var targetEl = document.getElementById('bbTarget');
var binaryEl = document.getElementById('bbBinary');
var decimalEl = document.getElementById('bbDecimal');
var hexEl = document.getElementById('bbHex');
var sumEl = document.getElementById('bbSum');
var statusEl = document.getElementById('bbStatus');
var roundEl = document.getElementById('bbRound');
var streakEl = document.getElementById('bbStreak');
var bestEl = document.getElementById('bbBest');

var value = 0;          // the number currently built, 0-255
var target = 0;
var round = 1;
var streak = 0;
// localStorage throws in sandboxed/opaque-origin frames, so both reads and
// writes are guarded — the game still runs, it just cannot remember a record.
function readBest() {
  try { return Number(localStorage.getItem(BEST_KEY) || 0); } catch (err) { return 0; }
}
function writeBest(n) {
  try { localStorage.setItem(BEST_KEY, String(n)); } catch (err) { /* storage unavailable */ }
}

var best = readBest();
var locked = false;

// Bit i (left to right) is worth 2^(BITS-1-i) — the place value of that column.
function placeValue(i) { return Math.pow(2, BITS - 1 - i); }

function bitOn(i) { return (value & placeValue(i)) !== 0; }

function buildBits() {
  bitsEl.innerHTML = '';
  for (var i = 0; i < BITS; i++) {
    var btn = document.createElement('button');
    btn.className = 'bb-bit';
    btn.dataset.index = i;
    btn.innerHTML = '<span class="digit">0</span><span class="place">' + placeValue(i) + '</span>';
    bitsEl.appendChild(btn);
  }
}

function toggleBit(i) {
  if (locked) return;
  value ^= placeValue(i);   // XOR flips exactly that one bit, leaving the rest alone
  render();
  if (value === target) win();
}

function render() {
  var children = bitsEl.children;
  for (var i = 0; i < BITS; i++) {
    var on = bitOn(i);
    children[i].classList.toggle('on', on);
    children[i].querySelector('.digit').textContent = on ? '1' : '0';
  }

  binaryEl.textContent = value.toString(2).padStart(BITS, '0');
  decimalEl.textContent = value;
  hexEl.textContent = '0x' + value.toString(16).toUpperCase().padStart(2, '0');

  var parts = [];
  for (var j = 0; j < BITS; j++) { if (bitOn(j)) parts.push(placeValue(j)); }
  sumEl.textContent = parts.length ? parts.join(' + ') + ' = ' + value : 'All bits off — every place value contributes 0.';
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'bb-status' + (kind ? ' ' + kind : '');
}

function win() {
  locked = true;
  game.classList.add('won');
  streak++;
  if (streak > best) {
    best = streak;
    writeBest(best);
  }
  streakEl.textContent = streak;
  bestEl.textContent = best;
  setStatus('Correct! ' + value.toString(2).padStart(BITS, '0') + ' = ' + value, 'ok');
  setTimeout(nextRound, 1100);
}

function newTarget() {
  var next;
  do { next = Math.floor(Math.random() * 255) + 1; } while (next === target);
  return next;
}

function nextRound() {
  round++;
  roundEl.textContent = round;
  startRound();
}

function startRound() {
  locked = false;
  game.classList.remove('won');
  value = 0;
  target = newTarget();
  targetEl.textContent = target;
  render();
  setStatus('Tip: press keys 1-8 to flip bits from the left.', '');
}

document.addEventListener('keydown', function (e) {
  if (e.key >= '1' && e.key <= String(BITS)) toggleBit(Number(e.key) - 1);
});

bitsEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.bb-bit');
  if (btn) toggleBit(Number(btn.dataset.index));
});

buildBits();
bestEl.textContent = best;
startRound();

/* wdp-share:start */
(function () {
  var TITLE = 'Binary Bit Flip Game', URL = 'https://webdevpuneet.com/ui-snippets/binary-bit-flip-game/';
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
    title: 'Binary Bit Flip Game — Free HTML CSS JS Snippet',
    description: 'Flip eight bits to hit a target number, with live binary, decimal and hex readouts and XOR toggling. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Binary Bit Flip Game — XOR Toggling, Place-Value Sums & Live Binary, Decimal and Hex Readouts',
      description: `Binary is one of those topics that stays abstract for as long as it is taught on paper and becomes obvious the moment you can flip a bit and watch a number change. This snippet is a small, genuinely playable number-building game: a random target between 1 and 255 appears, eight bit buttons sit below it labelled with their place values, and the player toggles bits until the running total equals the target. Every representation the player might meet in real code — the binary string, the decimal value, the hex byte, and the place-value sum — updates on every flip, so the relationship between them is visible rather than described.

**Toggling a single bit with XOR**

Flipping bit \`i\` is a single expression: \`value ^= placeValue(i)\`. Exclusive-or with a mask that has exactly one set bit inverts that bit and leaves every other bit untouched, which is precisely what a toggle means at the bit level — and it is meaningfully better than the alternatives a beginner reaches for first. Tracking eight separate boolean variables and recomputing a sum keeps two sources of truth that can drift; adding or subtracting the place value works only if you first check the current state, which is the check XOR makes unnecessary. The whole game state is one integer between 0 and 255.

**Deriving the display from the number, never the other way around**

\`render()\` reads the single \`value\` integer and regenerates everything: each button's on/off class and its 0-or-1 digit come from \`(value & placeValue(i)) !== 0\`, the binary string from \`value.toString(2).padStart(8, '0')\`, the hex byte from \`value.toString(16)\` uppercased and padded, and the arithmetic line from collecting the place values of the set bits and joining them with plus signs. Because every visual element is derived from the same integer on every render, the display cannot disagree with the state — the same one-way data flow a framework enforces, done here in a dozen lines.

**Place values as first-class UI**

Each bit button shows its weight — 128, 64, 32, 16, 8, 4, 2, 1 — under the digit, computed as \`Math.pow(2, BITS - 1 - i)\` rather than hardcoded, so changing \`BITS\` to 4 or 16 rebuilds the whole board correctly. The running line beneath the readouts spells out the arithmetic in full ("64 + 32 + 8 = 104"), which is the step that converts pattern-matching into actual understanding: the player sees that a binary number is nothing more than a sum of the powers of two whose bits are set.

**Keyboard and pointer paths through one function**

Number keys 1 through 8 flip the corresponding bit from the left, and clicking a button does the same, because both paths call \`toggleBit(i)\` — a delegated click listener on the container resolves the index from a \`data-index\` attribute rather than binding eight separate handlers. Win detection lives inside that one function too: after every flip it compares \`value === target\`, so there is no separate check step and no way for the two input methods to behave differently.

**Streaks that survive a refresh**

Consecutive solves build a streak, and the best streak is written to \`localStorage\` under a single clearly named key, read back on load, and only rewritten when the record actually breaks. A short lock after a win prevents further flips from registering during the celebration delay before the next target appears, which is the small guard that stops a fast player from accidentally scoring the next round with a stale click.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the target number', text: 'A random value between 1 and 255 appears at the top of the card — that is the number you have to build out of place values. A new target is guaranteed to differ from the previous one, so no round repeats back to back.' },
        { title: 'Flip bits by clicking or with the keyboard', text: 'Click any of the eight bit buttons, or press keys 1 through 8 to flip bits from the left. Both routes call the same toggleBit() function, which XORs the bit\'s place value into the running number.' },
        { title: 'Watch all four representations update', text: 'Every flip re-renders the binary string, the decimal value, the hex byte, and a plain-arithmetic line showing the place values being added — for example "64 + 32 + 8 = 104".' },
        { title: 'Match the target exactly to score', text: 'The win check runs inside the toggle itself, so the round ends the instant the running value equals the target. The target and decimal readout both turn green and the binary equation is echoed in the status line.' },
        { title: 'Build a streak', text: 'Consecutive correct rounds increase your streak, and the best streak persists in localStorage under the binary-bit-flip-best key so it survives a page reload.' },
        { title: 'Use the place labels as a crib sheet', text: 'Each button shows its weight (128, 64, 32, 16, 8, 4, 2, 1) computed from Math.pow(2, BITS - 1 - i). Working from the largest place value down is the standard technique for converting decimal to binary by hand.' },
      ],
    },
    features: [
      'Single-integer game state with bit toggling via XOR against a one-bit mask',
      'Bit on/off state read with a bitwise AND rather than tracked separately, so display and state cannot drift',
      'Live binary (toString(2) padded), decimal, and hex (toString(16) padded) readouts on every flip',
      'Plain-arithmetic place-value line spelling out the sum that produces the current number',
      'Place values computed from Math.pow(2, BITS - 1 - i), so changing the BITS constant rebuilds the board',
      'Click and keyboard (1-8) input paths routed through one toggle function with delegated event handling',
      'Win check embedded in the toggle, ending the round the moment the target is reached',
      'Streak tracking with a best-streak record persisted to localStorage under a single named key, with guarded reads and writes for sandboxed frames',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching binary and place value in a CS fundamentals course', desc: 'The arithmetic line turns the abstract "binary is base two" statement into a visible sum the student assembles themselves. It pairs naturally with a [hash table visualizer](/ui-snippets/hash-table-visualizer/) when moving from number representation to how those numbers get used as indexes.' },
      { icon: 'CODE', title: 'Explaining bitwise operators and flag masks in documentation', desc: 'Permission flags, feature bitmasks and protocol headers all rely on the same AND-to-read, XOR-to-toggle pattern this game is built on. Embedding it beside a bitmask API reference gives readers a hands-on way to see why masking works before they read the field table.' },
      { icon: 'APP', title: 'Warm-up game on a developer education or interview-prep site', desc: 'Rounds last a few seconds, so it works as a quick daily drill rather than a time sink, and the streak counter gives repeat visitors a reason to come back to the page.' },
      { icon: 'FLOW', title: 'Reference for derived-render state management without a framework', desc: 'One integer as the entire state, with every DOM element regenerated from it on each change, is a compact demonstration of unidirectional data flow — useful as a teaching example before introducing a framework that formalises the same idea.' },
      { icon: 'DESIGN', title: 'Toggle-grid UI pattern for settings and permission editors', desc: 'The eight-button grid with active states, weights, and a live summary line transfers directly to permission matrices and feature-flag panels where users toggle options and need to see the combined result immediately.' },
      { icon: 'FORM', title: 'Interactive explainer for colour, IP or Unicode byte values', desc: 'Because the readouts already show hex alongside decimal and binary, the same component is a good starting point for explaining hex colour channels, IPv4 octets, or byte-level character encodings, where the value being built has a concrete real-world meaning.' },
      { icon: 'CODE', title: 'Related: Asteroids Blaster Game', desc: 'See the [Asteroids Blaster Game](/ui-snippets/asteroids-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Precision Aim Trainer Game', desc: 'See the [Precision Aim Trainer Game](/ui-snippets/precision-aim-trainer-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mastermind Code Breaker Game', desc: 'See the [Mastermind Code Breaker Game](/ui-snippets/mastermind-code-breaker-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Dots and Boxes Game', desc: 'See the [Dots and Boxes Game](/ui-snippets/dots-and-boxes-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why toggle bits with XOR instead of tracking eight booleans?', a: 'value ^= placeValue(i) inverts exactly the target bit and leaves the other seven untouched, which is what a toggle means at the bit level. Keeping eight separate booleans plus a derived total creates two sources of truth that can drift out of sync, and add/subtract approaches need a conditional to check the current state first — XOR needs none, and keeps the entire game state in one integer.' },
      { q: 'How is each bit\'s on/off state determined for rendering?', a: 'With a bitwise AND: (value & placeValue(i)) !== 0. The mask has exactly one set bit, so the AND is non-zero only when that bit is set in the current value. Every rendered element — the digit, the highlight class, the arithmetic line — is derived from the value integer this way, so nothing can display a state the number does not actually have.' },
      { q: 'Can I change the game to 4 bits or 16 bits?', a: 'Yes. The BITS constant drives the button count, each place value via Math.pow(2, BITS - 1 - i), the zero-padding of the binary string, and the keyboard range. For 16 bits you would also want to widen the hex padding beyond two characters and reduce the target range accordingly, and the eight-column CSS grid needs its column count updated to match.' },
      { q: 'Where is the best streak stored, and how do I reset it?', a: 'In localStorage under the key binary-bit-flip-best, written only when the current streak exceeds the stored record. Clear it with localStorage.removeItem(\'binary-bit-flip-best\') from the console, or change the BEST_KEY constant if you embed several instances and want them scored separately.' },
      { q: 'Can I use this binary game in React, Vue, or Angular?', a: 'Yes, and it ports unusually cleanly because the state is a single integer. Hold value, target and streak in component state, derive the bit array, binary string, hex string and sum line during render rather than mutating the DOM, and dispatch toggles with a setValue(v => v ^ mask) style updater. Attach the document keydown listener in useEffect / onMounted / ngAfterViewInit and remove it on cleanup, and clear the post-win setTimeout on unmount so the next round cannot fire after the component is gone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a bitwise-operator mode where the player is shown two bytes and an operator (AND, OR, XOR, NOT, or a shift) and has to build the result — the natural next lesson once place value is understood. Other extensions worth asking for: a signed two's-complement mode that shows how -1 becomes 11111111, a timed challenge with a par number of flips per target so players learn to work from the largest place value down, a hex-target mode where the goal is given as 0x6C rather than 108, or an RGB mode where three of these byte builders drive a live colour swatch.`,
      prompt: `Build a playable binary bit-flipping game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Keep the entire game state in ONE integer between 0 and 255. Flip a bit with XOR against a single-bit mask (value ^= 2 ** (BITS - 1 - i)) rather than tracking separate booleans or adding/subtracting with a conditional.
- Render eight bit buttons, each showing its current digit (0 or 1) and its place value (128 down to 1) computed from the BITS constant, not hardcoded — changing BITS must rebuild the board correctly.
- Read each bit's state for rendering with a bitwise AND against the same mask, so every displayed element is derived from the state integer and cannot drift from it.
- Show live readouts of the binary string (toString(2) zero-padded to BITS), the decimal value, and the hex byte (toString(16) uppercased and padded), plus a plain-arithmetic line listing the place values of the set bits joined with plus signs and equalling the total.
- Generate a random target between 1 and 255 each round, guaranteed different from the previous target, and detect the win inside the toggle function itself so the round ends the instant the value matches.
- Support both clicking a bit and pressing number keys 1-8, routed through the same toggle function, using event delegation with a data-index attribute rather than eight individual listeners.
- Track a streak of consecutive solves and persist the best streak to localStorage under one clearly named key, rewriting it only when the record actually breaks, and lock input briefly after a win so a fast click cannot leak into the next round.`,
    },
  },
};

export default binaryBitFlipGame;
