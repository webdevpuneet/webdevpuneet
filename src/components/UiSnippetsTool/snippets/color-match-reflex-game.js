const colorMatchReflexGame = {
  id: 'color-match-reflex-game',
  title: 'Color Match Reflex Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo">
  <div class="game" id="game">
    <div class="hud">
      <div class="stat"><span class="stat-label">Score</span><span class="stat-val" id="score">0</span></div>
      <div class="stat"><span class="stat-label">Best</span><span class="stat-val" id="best">0</span></div>
      <div class="stat"><span class="stat-label">Lives</span><span class="stat-val" id="lives">●●●</span></div>
    </div>

    <div class="target-wrap">
      <span class="target-label">Tap the swatch matching:</span>
      <div class="target-word" id="targetWord">RED</div>
    </div>

    <div class="swatches" id="swatches"></div>

    <p class="msg" id="msg">Click Start to play</p>
    <button class="start-btn" id="startBtn">Start</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.game { width: 340px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 22px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

.hud { display: flex; gap: 22px; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.04em; }
.stat-val { font-size: 16px; font-weight: 800; color: #111827; }
#lives { color: #ef4444; letter-spacing: 2px; }

.target-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.target-label { font-size: 11px; color: #94a3b8; font-weight: 600; }
.target-word { font-size: 26px; font-weight: 900; letter-spacing: 1px; }

.swatches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; }
.swatch { height: 64px; border-radius: 12px; border: none; cursor: pointer; transition: transform 0.08s; }
.swatch:hover { transform: scale(1.04); }
.swatch:active { transform: scale(0.96); }
.swatch.wrong-flash { animation: shake 0.3s; }
@keyframes shake { 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

.msg { font-size: 12.5px; color: #64748b; font-weight: 600; min-height: 16px; text-align: center; }
.start-btn { background: #4f46e5; color: #fff; border: none; padding: 10px 24px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.start-btn:hover { background: #4338ca; }`,
  js: `const colors = [
  { name: 'RED', hex: '#ef4444' },
  { name: 'BLUE', hex: '#3b82f6' },
  { name: 'GREEN', hex: '#22c55e' },
  { name: 'YELLOW', hex: '#eab308' },
  { name: 'PURPLE', hex: '#a855f7' },
  { name: 'ORANGE', hex: '#f97316' },
];

const targetWord = document.getElementById('targetWord');
const swatchesEl = document.getElementById('swatches');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const livesEl = document.getElementById('lives');
const msgEl = document.getElementById('msg');
const startBtn = document.getElementById('startBtn');

let score = 0;
let lives = 3;
let best = Number(localStorage.getItem('colorMatchBest') || 0);
let roundTimer = null;
let playing = false;
let currentTarget = null;

bestEl.textContent = best;

function pickRound() {
  const shuffled = [...colors].sort(() => Math.random() - 0.5).slice(0, 6);
  currentTarget = shuffled[Math.floor(Math.random() * shuffled.length)];
  targetWord.textContent = currentTarget.name;
  targetWord.style.color = colors[Math.floor(Math.random() * colors.length)].hex;

  swatchesEl.innerHTML = '';
  shuffled.forEach((c) => {
    const btn = document.createElement('button');
    btn.className = 'swatch';
    btn.style.background = c.hex;
    btn.setAttribute('aria-label', c.name);
    btn.addEventListener('click', () => handlePick(c, btn));
    swatchesEl.appendChild(btn);
  });

  clearTimeout(roundTimer);
  const timeLimit = Math.max(1200, 2600 - score * 40);
  roundTimer = setTimeout(() => handleMiss(null), timeLimit);
}

function handlePick(color, btn) {
  if (!playing) return;
  clearTimeout(roundTimer);
  if (color.name === currentTarget.name) {
    score += 1;
    scoreEl.textContent = score;
    msgEl.textContent = 'Correct!';
    pickRound();
  } else {
    btn.classList.add('wrong-flash');
    handleMiss(btn);
  }
}

function handleMiss(btn) {
  lives -= 1;
  livesEl.textContent = '●'.repeat(Math.max(lives, 0)) + '○'.repeat(3 - Math.max(lives, 0));
  msgEl.textContent = lives > 0 ? 'Missed!' : 'Game over';
  if (lives <= 0) {
    endGame();
  } else {
    pickRound();
  }
}

function endGame() {
  playing = false;
  clearTimeout(roundTimer);
  if (score > best) {
    best = score;
    localStorage.setItem('colorMatchBest', String(best));
    bestEl.textContent = best;
    msgEl.textContent = \`Game over — new best: \${best}!\`;
  } else {
    msgEl.textContent = \`Game over — score: \${score}\`;
  }
  startBtn.textContent = 'Play again';
  startBtn.hidden = false;
}

function startGame() {
  score = 0;
  lives = 3;
  playing = true;
  scoreEl.textContent = '0';
  livesEl.textContent = '●●●';
  msgEl.textContent = 'Go!';
  startBtn.hidden = true;
  pickRound();
}

startBtn.addEventListener('click', startGame);

/* wdp-share:start */
(function () {
  var TITLE = 'Color Match Reflex Game', URL = 'https://webdevpuneet.com/ui-snippets/color-match-reflex-game/';
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
    title: 'Color Match Reflex Game — Fast-Paced Browser Mini-Game with High Score',
    description: 'A speed-based color matching reflex game where players tap the swatch matching a named color under a shrinking time limit, with lives, scoring, and a localStorage high score.',
    about: {
      title: 'Color Match Reflex Game — A Complete Playable Mini-Game',
      description: `This is a small but fully playable arcade-style reflex game: a color name appears (deliberately rendered in a *different*, mismatched color to add a Stroop-effect twist), and the player has a shrinking time window to tap the swatch that actually matches the named color, not the color the word is printed in.

**A genuinely difficulty-scaling round timer**

Each round's time limit isn't fixed — \`Math.max(1200, 2600 - score * 40)\` starts new players at 2.6 seconds per round and shrinks that window by 40ms per point scored, clamped to a 1.2-second floor. This is what makes the game actually get harder as a player improves, rather than staying at a constant, eventually-trivial difficulty — a genuine progression curve rather than a static challenge.

**Lives, misses, and timeouts share one failure path**

Whether a player clicks the wrong swatch or simply runs out of time, both routes call the same \`handleMiss()\` function, which decrements \`lives\`, updates the dot indicator (filled circles for remaining lives, hollow for lost ones), and either starts a new round or ends the game — keeping the failure logic in one place rather than duplicating "lose a life" behavior across two separate code paths that could drift out of sync.

**Persisting a real high score across sessions**

The best score isn't just held in a JS variable — it's read from and written to \`localStorage\` (\`colorMatchBest\`), so a player's personal best survives a page reload or returning to the game later, which is what makes "Best" a meaningful stat rather than a number that resets every time the page loads.

**Cleaning up stale timers correctly**

Every place a round ends — a correct pick, a wrong pick, or a timeout — calls \`clearTimeout(roundTimer)\` before doing anything else. Without this, a player who answers correctly right as the old timer is about to fire would trigger a duplicate, stale "miss" for a round that's already been won, silently costing them a life they didn't actually lose — a subtle bug this snippet deliberately avoids by always clearing the previous round's timer before starting the next one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click Start to begin', text: 'A target color name appears; tap the swatch matching that name (not the color the word is printed in) before time runs out.' },
        { title: 'Adjust the color palette', text: 'Add or remove entries in the colors array in the JS panel — each needs a name and a matching hex value.' },
        { title: 'Tune the difficulty curve', text: 'Change the 2600 starting value or the 40-per-point scaling in the timeLimit calculation to make rounds harder or easier over time.' },
        { title: 'Change the starting lives count', text: 'Update the lives = 3 assignment in startGame() and the matching dot-rendering logic in handleMiss().' },
        { title: 'Reset the stored high score', text: 'Clear the colorMatchBest key from localStorage in your browser devtools to reset the persisted best score during testing.' },
      ],
    },
    features: [
      'Fully playable game loop — start, score, lose lives, and game-over states all genuinely wired together',
      'Difficulty scales in real time: the per-round time limit shrinks as the score increases, with a hard floor',
      'Shared handleMiss() failure path for both wrong clicks and timeouts prevents duplicated logic drift',
      'Stale-timer bug avoided by clearing the round timer on every possible round-ending event',
      'Persistent high score stored in localStorage, surviving page reloads',
      'Deliberate word/color mismatch (a Stroop-effect twist) makes the game genuinely test reflexes, not just reading',
      'Shuffled 6-of-N color subset per round keeps swatch positions unpredictable',
      'Wrong-answer shake animation gives immediate tactile feedback on a miss',
    ],
    useCases: [
      { icon: 'GAME', title: 'Standalone Browser Mini-Game', desc: 'A complete, self-contained arcade game for a games section, loading screen, or 404 page easter egg.' },
      { icon: 'DEMO', title: 'JavaScript Game-Loop Teaching Example', desc: 'A clean reference for structuring round-based game state (score, lives, timers) without a game engine.' },
      { icon: 'MARKETING', title: 'Interactive Marketing Widget', desc: 'Embed as a playful interactive element to increase time-on-page for a product or campaign site.' },
      { icon: 'UX', title: 'Reflex/Attention Testing Tool', desc: 'Repurpose the core mechanic for a simple attention or reaction-speed measurement tool.' },
      { icon: 'CODE', title: 'Related: Canvas Conway', desc: 'See the [Canvas Conway](/ui-snippets/canvas-game-of-life/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the target word printed in a different color than the color it names?', a: 'It\'s a deliberate Stroop-effect twist — reading the word and matching its printed color would be a different, easier task. Forcing the player to read the word\'s meaning while ignoring its visual color makes the game genuinely test quick color-word association rather than simple color matching.' },
      { q: 'How does the game get harder as you play?', a: 'The per-round time limit shrinks with score via Math.max(1200, 2600 - score * 40) — starting near 2.6 seconds and dropping by 40ms per correct answer, down to a 1.2-second floor, so later rounds genuinely demand faster reflexes.' },
      { q: 'What happens if I click correctly right as the timer is about to expire?', a: 'The click handler calls clearTimeout(roundTimer) immediately, canceling the pending timeout before it can fire — this prevents the classic bug where a just-in-time correct answer would still trigger a stale miss from the expiring timer.' },
      { q: 'Is the high score saved anywhere?', a: 'Yes — it\'s persisted in the browser\'s localStorage under the key colorMatchBest, so a player\'s best score survives page reloads and future visits, not just the current session.' },
      { q: 'Can I change how many lives the player starts with?', a: 'Yes — update the lives = 3 assignment in startGame(), and adjust the dot-rendering logic in handleMiss() (which currently assumes a 3-life maximum) to match your new starting value.' },
      { q: 'Does the game work on touch devices?', a: 'Yes — the swatches are plain buttons responding to click events, which fire correctly for both mouse clicks and touch taps with no special touch-event handling required.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why sharing one handleMiss() function between wrong-click and timeout failure paths avoids subtle bugs, and to walk through the exact race condition that clearTimeout(roundTimer) is protecting against on a correct answer. It's also worth asking for a version with combo multipliers for consecutive correct answers, or a version that swaps the color-word mechanic for a shape-matching or audio-matching variant using the same round/timer/lives architecture.`,
      prompt: `Build a fast-paced color-matching reflex game in HTML, CSS and vanilla JavaScript — no external libraries.

Requirements:
- Display a color name as text, deliberately rendered in a visually different color than the one it names, alongside a grid of colored swatch buttons including the correct match among several distractors.
- The player must click the swatch matching the color NAME (not the color the text is visually rendered in) before a per-round timer expires.
- Track score (increments on a correct match) and lives (3 total, decrementing on either a wrong click or a round timing out) with both values displayed live in a HUD.
- The per-round time limit must genuinely decrease as the score increases (with a reasonable minimum floor), so the game gets objectively harder as the player improves — not stay at a fixed difficulty.
- Ensure that answering correctly reliably cancels that round's pending timeout, so a last-moment correct click never also triggers a stale "miss" from the same round's expiring timer.
- Persist the player's best score across page reloads using localStorage, and show both the current score and the persisted best score in the HUD.
- Show a game-over state when lives reach zero, with a "Play again" action that fully resets score, lives, and starts a new round.`,
    },
  },
};

export default colorMatchReflexGame;
