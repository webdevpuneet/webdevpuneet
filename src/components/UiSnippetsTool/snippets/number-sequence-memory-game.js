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
