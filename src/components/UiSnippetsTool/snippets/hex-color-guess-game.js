const hexColorGuessGame = {
  id: 'hex-color-guess-game',
  title: 'Guess the Hex Color Code Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="hex-app">
  <div class="hex-header">
    <h2>Guess the Hex Code</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Score</span><span class="stat-val" id="stat-score">0 / 0</span></div>
      <div class="stat"><span class="stat-label">Streak</span><span class="stat-val" id="stat-streak">0</span></div>
    </div>
  </div>

  <div class="swatch" id="swatch"></div>
  <p class="feedback" id="feedback">Which hex code matches this color?</p>

  <div class="options" id="options"></div>

  <button class="next-btn" id="next-btn">Next round</button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.hex-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

.hex-header { width: 100%; text-align: center; }
.hex-header h2 { font-size: 19px; font-weight: 700; color: #1e293b; margin-bottom: 10px; }

.stats { display: flex; justify-content: center; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 7px 16px; min-width: 80px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 16px; font-weight: 800; color: #6366f1; }

.swatch {
  width: 100%; height: 150px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 10px 26px rgba(30,41,59,0.14);
  transition: background 0.15s;
}

.feedback { font-size: 13px; font-weight: 600; color: #64748b; text-align: center; min-height: 18px; }
.feedback.correct { color: #16a34a; }
.feedback.wrong { color: #dc2626; }

.options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
.opt-btn {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px; font-weight: 700; letter-spacing: 0.02em;
  padding: 14px 10px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px;
  color: #334155; cursor: pointer;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
}
.opt-btn:hover:not(:disabled) { border-color: #6366f1; transform: translateY(-1px); }
.opt-btn:disabled { cursor: default; }
.opt-btn.correct-flash { background: #dcfce7; border-color: #16a34a; color: #15803d; }
.opt-btn.wrong-flash { background: #fee2e2; border-color: #dc2626; color: #b91c1c; }

.next-btn {
  background: #1e293b; color: #f1f5f9;
  border: none; border-radius: 10px;
  padding: 10px 22px; font-size: 13px; font-weight: 600;
  font-family: inherit; cursor: pointer;
  transition: background 0.15s;
}
.next-btn:hover { background: #334155; }`,
  js: `let score = 0, rounds = 0, streak = 0;
let currentHex = '';
let answered = false;

const swatch = document.getElementById('swatch');
const optionsEl = document.getElementById('options');
const feedback = document.getElementById('feedback');

function toHexPart(n) {
  return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0').toUpperCase();
}

function randomHex() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return '#' + toHexPart(r) + toHexPart(g) + toHexPart(b);
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  return '#' + toHexPart(r) + toHexPart(g) + toHexPart(b);
}

function makeDecoy(correctHex, usedHexes) {
  const { r, g, b } = hexToRgb(correctHex);
  let hex;
  let attempts = 0;
  do {
    const channel = Math.floor(Math.random() * 3);
    const delta = (Math.random() < 0.5 ? -1 : 1) * (18 + Math.floor(Math.random() * 30));
    const parts = [r, g, b];
    parts[channel] = Math.max(0, Math.min(255, parts[channel] + delta));
    hex = rgbToHex(parts[0], parts[1], parts[2]);
    attempts++;
  } while ((usedHexes.has(hex) || hex === correctHex) && attempts < 30);
  return hex;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newRound() {
  answered = false;
  currentHex = randomHex();
  swatch.style.background = currentHex;
  feedback.textContent = 'Which hex code matches this color?';
  feedback.className = 'feedback';

  const usedHexes = new Set([currentHex]);
  const decoys = [];
  for (let i = 0; i < 3; i++) {
    const d = makeDecoy(currentHex, usedHexes);
    usedHexes.add(d);
    decoys.push(d);
  }

  const options = shuffle([currentHex, ...decoys]);
  optionsEl.innerHTML = '';
  options.forEach(hex => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.textContent = hex;
    btn.dataset.hex = hex;
    btn.addEventListener('click', () => onAnswer(btn));
    optionsEl.appendChild(btn);
  });
}

function onAnswer(btn) {
  if (answered) return;
  answered = true;
  rounds++;

  const chosenHex = btn.dataset.hex;
  const allBtns = Array.from(optionsEl.children);
  allBtns.forEach(b => (b.disabled = true));

  if (chosenHex === currentHex) {
    score++;
    streak++;
    btn.classList.add('correct-flash');
    feedback.textContent = \`Correct! That's \${currentHex}\`;
    feedback.className = 'feedback correct';
  } else {
    streak = 0;
    btn.classList.add('wrong-flash');
    const correctBtn = allBtns.find(b => b.dataset.hex === currentHex);
    if (correctBtn) correctBtn.classList.add('correct-flash');
    feedback.textContent = \`Not quite — the correct code was \${currentHex}\`;
    feedback.className = 'feedback wrong';
  }

  document.getElementById('stat-score').textContent = \`\${score} / \${rounds}\`;
  document.getElementById('stat-streak').textContent = streak;
}

document.getElementById('next-btn').addEventListener('click', newRound);

newRound();

/* wdp-share:start */
(function () {
  var TITLE = 'Guess the Hex Color Code Game', URL = 'https://webdevpuneet.com/ui-snippets/hex-color-guess-game/';
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
    title: 'Guess the Hex Color Code Game — Free JS Snippet',
    description: 'Match a color swatch to its real hex code among close decoys, with score and streak tracking. Exports to React, Vue, Angular & Tailwind for free.',
    about: {
      title: 'Guess the Hex Color Code Game — RGB-to-Hex Math, Near-Miss Decoy Generation & Streak Tracking',
      description: `Reading hex colour codes fluently — glancing at \`#3B82F6\` and having a rough sense it's a mid-blue — is a skill most front-end developers pick up slowly through repetition. This snippet turns that repetition into a genuine quiz: a random colour swatch is shown, and the player must pick its exact hex code from four options, three of which are deliberately close, plausible near-misses rather than obviously wrong colours.

**How hex codes encode RGB values**

A CSS hex colour like \`#3B82F6\` is three two-digit hexadecimal numbers packed together, one each for red, green, and blue: \`3B\`, \`82\`, and \`F6\`. Each pair ranges from \`00\` (0 in decimal, no intensity on that channel) to \`FF\` (255 in decimal, full intensity), because two hex digits give exactly 16 x 16 = 256 possible values (0-15 per digit, 0-255 combined). \`randomHex()\` generates a colour by picking three independent random integers in the 0-255 range with \`Math.floor(Math.random() * 256)\` and converting each to a two-digit uppercase hex string with \`toHexPart()\`, which calls \`.toString(16)\` (base-16 conversion) and \`.padStart(2, '0')\` to guarantee a leading zero for values below 16 (so decimal 5 becomes \`05\`, not just \`5\`, keeping every channel exactly two characters).

**Generating decoys that actually test color literacy**

A multiple-choice quiz is trivial if the wrong answers are wildly different colours — anyone can spot that \`#3B82F6\` (blue) doesn't match a red swatch without reading a single digit. The real test is distinguishing \`#3B82F6\` from \`#3B82D8\` or \`#2E82F6\`. \`makeDecoy()\` builds each wrong answer by taking the correct colour's actual RGB channels (extracted with \`hexToRgb()\`, which slices the hex string into three two-character substrings and \`parseInt(..., 16)\`s each one back to a 0-255 integer), picking one of the three channels at random, and nudging it by a random signed offset between 18 and 47 (\`(Math.random() < 0.5 ? -1 : 1) * (18 + Math.floor(Math.random() * 30))\`), clamped back into the valid 0-255 range. That offset range is deliberately tuned: large enough that the resulting swatch really is a distinguishably different colour if you looked at it side-by-side, but small enough that its hex string looks superficially similar to the real one, forcing genuine digit-by-digit comparison rather than colour memory alone. A dedup loop guards against ever generating a decoy that collides with the real answer or another decoy.

**Fisher-Yates shuffling for fair answer positions**

Once the correct hex and three decoys exist, \`shuffle()\` runs a standard Fisher-Yates shuffle (iterating from the last index down to 1, swapping each element with a random earlier one) so the correct answer's position among the four buttons is different every round — without this, a player could learn to always click the same button position rather than actually reading the colour.

**Scoring, streaks, and immediate feedback**

Every answer immediately disables all four option buttons to prevent double-clicking, then flashes the clicked button green (\`.correct-flash\`) or red (\`.wrong-flash\`); on a wrong answer, the actual correct button is also highlighted green so the player learns the real value regardless of outcome. \`score\` and \`rounds\` track a running "X / N correct" ratio, while a separate \`streak\` counter increments on consecutive correct answers and resets hard to zero on any miss — rewarding sustained accuracy rather than just overall percentage, and giving players a reason to keep playing to beat their own best run.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Study the swatch and pick a hex code',
          text: 'A random colour fills the swatch box, and four hex code buttons appear below it in monospace font. Click the one you believe exactly matches the swatch — one is always correct and three are close decoys generated by makeDecoy() from the real value.',
        },
        {
          title: 'Read the feedback',
          text: 'A correct guess flashes your button green and confirms the exact hex value in the feedback text. A wrong guess flashes your button red and highlights the actual correct button in green so you can see how close (or far) your answer was, via the correctBtn lookup in onAnswer().',
        },
        {
          title: 'Track your score and streak',
          text: 'The Score stat shows a running "X / N correct" ratio across every round played this session. The Streak stat counts consecutive correct answers and resets to 0 immediately on any wrong guess, tracked in the streak variable inside onAnswer().',
        },
        {
          title: 'Start a new round',
          text: 'Click "Next round" to call newRound(), which generates a fresh random hex colour, three new decoys, re-shuffles all four options into new button positions, and re-enables the buttons for a fresh guess.',
        },
        {
          title: 'Adjust the decoy difficulty',
          text: 'In makeDecoy(), change the offset range 18 + Math.floor(Math.random() * 30) (currently 18-47) to a smaller range like 8-20 for a harder, more subtle quiz, or a larger range like 40-80 for an easier one where decoys are more visually distinguishable from the correct swatch.',
        },
        {
          title: 'Export and add to your project',
          text: 'Click HTML to download a standalone file, or JSX for a React component. In React, move currentHex, score, streak, and the options array into useState, and regenerate them together inside a single newRound() callback wrapped in useCallback so the swatch and buttons always update atomically.',
        },
      ],
    },
    features: [
      'randomHex() generates a true random RGB triple and converts it to a two-digit-per-channel hex string',
      'hexToRgb()/rgbToHex() round-trip conversion functions demonstrate parseInt base-16 and toString(16)',
      'makeDecoy() perturbs one real RGB channel by a tuned 18-47 offset for genuinely close, plausible wrong answers',
      'Dedup loop in makeDecoy() guarantees no duplicate hex values ever appear among the four options',
      'Fisher-Yates shuffle() randomizes answer button position every round to prevent position-memorization',
      'Immediate color-coded feedback: correct-flash and wrong-flash classes plus reveal of the true correct button',
      'Running score (X / N) and consecutive-answer streak tracked and reset independently',
      'toHexPart() uses padStart(2, "0") to correctly zero-pad single-digit hex values (5 -> "05" not "5")',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'Practicing hex-to-RGB literacy for front-end developers',
        desc: 'Developers who work with CSS colours daily but always reach for a picker tool can use this to build genuine intuition for how hex digits map to intensity per channel. Repeated rounds train pattern recognition — noticing that a higher first pair means more red, a higher third pair means more blue — the same skill used when eyeballing a design system\'s colour tokens.',
      },
      {
        icon: 'APP',
        title: 'A bite-sized quiz widget for a design-tools or CSS learning site',
        desc: 'Embed this as a standalone practice page or daily-challenge widget on a front-end learning platform, alongside reference material on the CSS color system. The self-contained score and streak tracking gives it enough game-loop structure to keep learners coming back for another round.',
      },
      {
        icon: 'FORM',
        title: 'Warm-up exercise before a design-handoff or CSS audit session',
        desc: 'Teams doing regular design-to-code handoff work can use a few rounds of this as a quick warm-up to sharpen attention to exact colour values before reviewing a Figma file or auditing CSS custom properties for near-duplicate brand colours that should be consolidated.',
      },
      {
        icon: 'DESIGN',
        title: 'Colour-matching accessibility or vision-difference awareness exercise',
        desc: 'Because the decoys are intentionally close in value, this can double as a light demonstration of how subtle colour differences can be, useful in design-team discussions about sufficient contrast and the risk of near-identical brand colours being confused, especially relevant alongside conversations about the [Color Contrast Checker](/ui-snippets/color-contrast-checker/) type of tooling.',
      },
      {
        icon: 'CODE',
        title: 'Reference implementation for hex/RGB conversion utilities',
        desc: 'The hexToRgb(), rgbToHex(), and toHexPart() functions are small, dependency-free, and copy-pasteable into any project that needs to convert between hex strings and RGB integer triples, such as a colour picker, theme generator, or palette-extraction tool.',
      },
      { icon: 'CODE', title: 'Related: Frog Crossing Game', desc: 'See the [Frog Crossing Game](/ui-snippets/frog-crossing-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How exactly does a hex code like #3B82F6 map to a colour?',
        a: 'The six characters after the # split into three pairs: 3B for red, 82 for green, F6 for blue. Each pair is a base-16 (hexadecimal) number from 00 to FF, which equals 0 to 255 in decimal — so 3B converts to 59, 82 to 130, and F6 to 246, giving the RGB triple (59, 130, 246), a mid-tone blue. Two hex digits per channel exist because 16 x 16 = 256, exactly matching the 0-255 range that 8-bit colour channels use.',
      },
      {
        q: 'How are the three wrong answers generated so they are actually plausible?',
        a: 'makeDecoy() starts from the real colour\'s exact RGB values, picks one of the three channels at random, and shifts it by a random amount between 18 and 47 (in either direction, clamped to the valid 0-255 range), then converts back to hex. This produces a colour that is visibly different if compared side-by-side but numerically close enough in its hex digits that you cannot tell it apart from the real answer without actually reading and comparing the digits carefully.',
      },
      {
        q: 'Why does the streak reset to zero on a single wrong answer but the score does not?',
        a: 'Score is a lifetime accuracy ratio (score / rounds) meant to reflect overall performance across a whole session, so it simply stops incrementing on a miss rather than decreasing. Streak specifically measures consecutive correct answers as a separate, more demanding metric — resetting it hard to zero on any miss is what makes maintaining a long streak meaningfully harder than just having a good overall score, encouraging more careful attention on every single round.',
      },
      {
        q: 'Can two of the four options ever end up identical?',
        a: 'No — makeDecoy() takes a usedHexes Set containing the real answer and any decoys already generated, and loops (up to 30 attempts) until it produces a hex value not already in that set, guaranteeing all four displayed options are unique. This prevents the degenerate case where two buttons show the same hex code, which would make one of them unambiguously guessable as wrong by elimination even without understanding the colour.',
      },
      {
        q: 'Why use a Fisher-Yates shuffle instead of Math.random() sort?',
        a: 'Array.sort(() => Math.random() - 0.5) is a commonly used but statistically biased shuffle — it does not give every permutation equal probability because comparison-based sorts make an inconsistent, unequal number of comparisons per element. The Fisher-Yates algorithm used here (iterating backward and swapping each element with a uniformly random earlier index) is the standard, provably unbiased way to shuffle an array in place, ensuring the correct answer\'s button position is genuinely random every round.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how makeDecoy() perturbs a single RGB channel to build a plausible-but-wrong hex option, and why the Fisher-Yates shuffle() is preferred over a naive Math.random()-based sort for randomizing the answer positions. It's a good candidate for extension too — ask the assistant to add difficulty levels that tighten or loosen the decoy offset range, a timer that scores faster correct answers higher, or a "reveal RGB sliders" mode that lets a player build the guessed colour manually with three 0-255 range inputs instead of picking from multiple choice. You could also ask it to persist the best streak across sessions using localStorage so returning players have a personal record to beat.`,
      prompt: `Build a hex color code guessing game in plain HTML, CSS, and JavaScript — a random color swatch, four multiple-choice hex code buttons, and score/streak tracking.

Requirements:
- Generate a random RGB color, convert it to a properly zero-padded six-digit uppercase hex string, and display it as a large solid color swatch.
- Generate exactly three wrong-answer hex codes that are close in numeric value to the real one (by nudging one RGB channel of the real color by a moderate random amount) rather than obviously different colors, so the game genuinely tests hex-reading skill; guarantee no duplicate values appear among the four options.
- Randomize the position of the correct answer among the four buttons every round using an unbiased shuffle algorithm.
- On a correct click, flash that button with clear success styling and reveal the exact matching hex value in a feedback message; on a wrong click, flash that button with error styling AND highlight which button was actually correct.
- Disable all four option buttons immediately after the first click each round so a user cannot submit multiple guesses on the same round.
- Track and display a running "X / N correct" score across rounds, plus a separate consecutive-correct-answers streak counter that resets to zero on any wrong guess.
- Provide a "Next round" control that generates a brand new color, a fresh set of decoys, and a freshly shuffled button order, and re-enables input.`,
    },
  },
};

export default hexColorGuessGame;
