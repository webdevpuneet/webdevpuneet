const towerStackTimingGame = {
  id: 'tower-stack-timing-game',
  title: 'Tower Stack Timing Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo">
  <div class="game" id="game">
    <div class="hud">
      <span class="hud-label">Height</span>
      <span class="hud-val" id="heightVal">0</span>
      <span class="hud-label">Best</span>
      <span class="hud-val" id="bestVal">0</span>
    </div>
    <div class="tower-viewport" id="viewport">
      <div class="tower" id="tower"></div>
      <div class="moving-block" id="movingBlock"></div>
    </div>
    <p class="msg" id="msg">Click Start, then click/tap to drop each block</p>
    <button class="start-btn" id="startBtn">Start</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.game { width: 280px; background: #fff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 12px; }

.hud { display: flex; align-items: baseline; gap: 6px; align-self: stretch; justify-content: center; }
.hud-label { font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: #94a3b8; }
.hud-val { font-size: 16px; font-weight: 800; color: #111827; margin-right: 14px; }

.tower-viewport { position: relative; width: 240px; height: 300px; background: linear-gradient(180deg,#eef2ff,#f8fafc); border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
.tower { position: absolute; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column-reverse; align-items: center; transition: transform 0.15s; }
.block { height: 22px; border-radius: 3px; box-shadow: 0 1px 2px rgba(0,0,0,0.15); }
.moving-block { position: absolute; height: 22px; border-radius: 3px; box-shadow: 0 1px 2px rgba(0,0,0,0.15); display: none; }

.msg { font-size: 12px; color: #64748b; font-weight: 600; text-align: center; min-height: 16px; }
.start-btn { background: #4f46e5; color: #fff; border: none; padding: 9px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.start-btn:hover { background: #4338ca; }`,
  js: `const viewport = document.getElementById('viewport');
const tower = document.getElementById('tower');
const movingBlock = document.getElementById('movingBlock');
const heightVal = document.getElementById('heightVal');
const bestVal = document.getElementById('bestVal');
const msg = document.getElementById('msg');
const startBtn = document.getElementById('startBtn');

const VIEWPORT_W = 240;
const BLOCK_H = 22;
const START_W = 120;
const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f97316', '#eab308'];

let best = Number(localStorage.getItem('towerStackBest') || 0);
bestVal.textContent = best;

let stack = []; // { x, width } for each placed block, bottom to top
let currentX = 0;
let direction = 1;
let speed = 2.2;
let currentWidth = START_W;
let playing = false;
let rafId = null;

function render() {
  tower.innerHTML = '';
  stack.forEach((b, i) => {
    const el = document.createElement('div');
    el.className = 'block';
    el.style.width = b.width + 'px';
    el.style.marginLeft = b.x + 'px';
    el.style.marginRight = (VIEWPORT_W - b.x - b.width) + 'px';
    el.style.background = colors[i % colors.length];
    tower.appendChild(el);
  });

  // Scroll the "camera" once the tower gets tall enough to approach the top.
  const towerHeightPx = stack.length * BLOCK_H;
  const maxVisible = viewport.clientHeight - 40;
  if (towerHeightPx > maxVisible) {
    tower.style.transform = \`translateY(\${maxVisible - towerHeightPx}px)\`;
    movingBlock.style.bottom = maxVisible + 'px';
  } else {
    tower.style.transform = 'translateY(0)';
    movingBlock.style.bottom = towerHeightPx + 'px';
  }
}

function animate() {
  currentX += direction * speed;
  if (currentX <= 0 || currentX + currentWidth >= VIEWPORT_W) {
    direction *= -1;
    currentX = Math.max(0, Math.min(currentX, VIEWPORT_W - currentWidth));
  }
  movingBlock.style.left = currentX + 'px';
  movingBlock.style.width = currentWidth + 'px';
  rafId = requestAnimationFrame(animate);
}

function placeBlock() {
  if (!playing) return;

  const prev = stack[stack.length - 1] || { x: (VIEWPORT_W - START_W) / 2, width: START_W };
  const left = Math.max(currentX, prev.x);
  const right = Math.min(currentX + currentWidth, prev.x + prev.width);
  const overlap = right - left;

  if (overlap <= 4) {
    endGame();
    return;
  }

  stack.push({ x: left, width: overlap });
  currentWidth = overlap;
  heightVal.textContent = stack.length;

  cancelAnimationFrame(rafId);
  currentX = direction > 0 ? 0 : VIEWPORT_W - currentWidth;
  speed = Math.min(6, 2.2 + stack.length * 0.15);
  animate();

  render();
}

function endGame() {
  playing = false;
  cancelAnimationFrame(rafId);
  movingBlock.style.display = 'none';

  if (stack.length > best) {
    best = stack.length;
    localStorage.setItem('towerStackBest', String(best));
    bestVal.textContent = best;
    msg.textContent = \`Missed! New best height: \${best}\`;
  } else {
    msg.textContent = \`Missed! Height: \${stack.length}\`;
  }
  startBtn.hidden = false;
  startBtn.textContent = 'Play again';
}

function startGame() {
  stack = [];
  currentWidth = START_W;
  currentX = 0;
  direction = 1;
  speed = 2.2;
  playing = true;
  heightVal.textContent = '0';
  msg.textContent = 'Click/tap the board to drop a block!';
  startBtn.hidden = true;
  movingBlock.style.display = 'block';
  movingBlock.style.background = colors[0];
  render();
  cancelAnimationFrame(rafId);
  animate();
}

viewport.addEventListener('click', () => {
  movingBlock.style.background = colors[stack.length % colors.length];
  placeBlock();
});
startBtn.addEventListener('click', startGame);

/* wdp-share:start */
(function () {
  var TITLE = 'Tower Stack Timing Game', URL = 'https://webdevpuneet.com/ui-snippets/tower-stack-timing-game/';
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
    title: 'Tower Stack Timing Game — Click-to-Drop Block Stacker with Real Overlap Physics',
    description: 'A playable tower-stacking timing game where each block\'s placement is computed by real overlap math against the block below it, shrinking the stack and ending the game on a total miss.',
    about: {
      title: 'Tower Stack Timing Game — Real Overlap Math, Not a Scripted Sequence',
      description: `This is a complete implementation of the classic "stack the moving block" timing game: a block slides back and forth, the player taps to drop it, and it locks into place based on how much it actually overlaps the block beneath it — narrowing the tower with every imperfect placement, exactly like the real mechanic this genre is built on.

**Overlap is computed geometrically, not guessed**

\`placeBlock()\` computes the actual intersecting region between the moving block's current position and the block directly below it: \`left = Math.max(currentX, prev.x)\`, \`right = Math.min(currentX + currentWidth, prev.x + prev.width)\`, and \`overlap = right - left\`. This is real interval-intersection math — the same logic used to detect whether two 1D ranges overlap and by how much — not a simplified "close enough" heuristic. If \`overlap\` comes out at or below a small tolerance (4px, accounting for the player landing an essentially perfect but not pixel-exact hit), the game ends immediately.

**Every successful placement narrows what's possible next**

The block that gets placed isn't the full-width moving block — it's a new block sized to exactly the \`overlap\` region, and \`currentWidth\` for the *next* moving block is set to that same shrunken width. This is what creates the genre's core difficulty curve: a series of imperfect-but-passable placements compounds, making each subsequent block progressively harder to land, purely as an emergent consequence of the overlap math rather than a separately scripted difficulty ramp.

**Speed scales with height, within a capped range**

\`speed = Math.min(6, 2.2 + stack.length * 0.15)\` increases the moving block's horizontal speed as the tower gets taller, but caps out at 6 — so the game gets meaningfully harder as a player progresses without becoming literally unplayable at very tall heights, a deliberate balance between "there is a real difficulty curve" and "the game doesn't become impossible."

**The camera scroll only activates once it's actually needed**

\`render()\` checks whether the tower's total pixel height exceeds the visible viewport area, and only applies a \`translateY\` "camera scroll" transform once it does — short towers render with no scroll offset at all, and the scroll amount is computed exactly from how far the tower has grown past the visible boundary, so the currently-moving block and the top of the tower remain visible together throughout play, not just for the first several blocks.

**Persistent best height, not just a session high score**

Same as this library's other playable games, the best height achieved is read from and written to \`localStorage\` (\`towerStackBest\`), so a player's personal best is meaningful across page reloads rather than resetting every time the page loads.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click Start, then click/tap to drop each block', text: 'A block slides side to side; each click places it based on real overlap with the block below.' },
        { title: 'Land the block precisely to avoid narrowing the tower', text: 'A perfect placement keeps the current width; an imperfect one shrinks the next block to the overlapping region.' },
        { title: 'Adjust the starting block width and speed', text: 'Change the START_W constant and the base speed value in startGame() to tune initial difficulty.' },
        { title: 'Adjust the speed scaling and cap', text: 'Change the multiplier and Math.min ceiling in the speed calculation inside placeBlock() to adjust how quickly and how far the game speeds up.' },
        { title: 'Adjust the miss tolerance', text: 'Change the overlap <= 4 threshold in placeBlock() to make near-misses more or less forgiving.' },
      ],
    },
    features: [
      'Real geometric overlap calculation between the moving block and the block below determines each placement outcome',
      'Stack genuinely narrows over successive imperfect placements, an emergent difficulty curve rather than a scripted one',
      'Speed scales up with tower height but is capped, keeping the late game hard without becoming unplayable',
      'Camera scroll activates only once the tower actually exceeds the visible viewport height, computed exactly',
      'Persistent best-height high score stored in localStorage across page reloads',
      'requestAnimationFrame-driven smooth block movement, restarted fresh after every successful placement',
      'Direction correctly reverses at both viewport edges, clamped so the block never visually overshoots the boundary',
      'Fully self-contained — no game engine or canvas library, just DOM elements and real-time positioning math',
    ],
    useCases: [
      { icon: 'GAME', title: 'Standalone Browser Mini-Game', desc: 'A complete, playable arcade-style game for a games section, loading screen, or interactive easter egg.' },
      { icon: 'DEMO', title: 'Timing-Game Mechanics Reference', desc: 'A clean example of implementing precise, physics-grounded interval-overlap game logic in vanilla JS.' },
      { icon: 'MARKETING', title: 'Interactive Engagement Widget', desc: 'Embed as a playful, skill-based interactive element to increase time-on-page.' },
      { icon: 'EDUCATION', title: 'Teaching Interval Intersection Math', desc: 'A practical, visual demonstration of computing the overlap between two numeric ranges.' },
    ],
    faqs: [
      { q: 'How is a block\'s placement outcome actually determined?', a: 'By computing the real geometric overlap between the moving block\'s current horizontal position/width and the block directly beneath it in the stack — using interval intersection math (left = max of both left edges, right = min of both right edges, overlap = right minus left), not an approximation or a scripted outcome.' },
      { q: 'What happens if I land a block with very little overlap?', a: 'If the computed overlap falls at or below a small tolerance (4px), the game ends immediately — this models the real "you missed almost entirely" failure case in the genre, distinct from a partial but survivable overlap that simply narrows the next block.' },
      { q: 'Why does the tower get progressively harder to build?', a: 'Every placement other than a perfect one shrinks the effective width available for the next placement, since the newly placed block is sized to exactly the overlapping region — this creates a naturally compounding difficulty curve purely from the overlap math, without any separate difficulty scripting.' },
      { q: 'Does the game speed keep increasing forever?', a: 'No — the moving block\'s speed scales up with the current tower height but is explicitly capped at a maximum value (via Math.min), so the game continues to get harder as height increases without eventually becoming impossible to react to.' },
      { q: 'How does the "camera" keep the tower visible as it grows tall?', a: 'render() compares the tower\'s total height in pixels against the visible viewport height, and only once the tower exceeds that does it apply a translateY offset scrolling the tower (and the moving block\'s position) down by exactly the amount needed to keep the top of the tower in view.' },
      { q: 'Is the best height saved anywhere?', a: 'Yes — it\'s persisted in the browser\'s localStorage under the key towerStackBest, so a player\'s best height survives page reloads and future visits, not just the current play session.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to walk through the interval-overlap calculation in placeBlock() step by step with a couple of worked numeric examples, and to explain why clamping currentX at the viewport edges (rather than just reversing direction) prevents the moving block from visually overshooting the boundary. It's also worth asking for a version with combo scoring for consecutive perfect placements, or one where overhanging (non-overlapping) portions of a placed block visually break off and fall, matching the classic genre's visual flourish.`,
      prompt: `Build a tower-stacking timing game in HTML, CSS and vanilla JavaScript where a block slides back and forth and the player clicks/taps to drop it onto the block below, with the placement outcome determined by real overlap math — no external libraries, no canvas required.

Requirements:
- A moving block that slides horizontally back and forth within a bounded play area using requestAnimationFrame, reversing direction (and clamping its position) correctly at both edges of the play area.
- On click/tap, compute the actual geometric overlap between the moving block's current horizontal position and width and the block directly beneath it in the stack (using interval intersection: the overlapping region's left edge is the greater of the two left edges, its right edge is the lesser of the two right edges).
- If the computed overlap is at or below a small tolerance, end the game immediately as a miss. Otherwise, place a new block sized to exactly that overlapping region on top of the stack, and make that overlap width the width of the next moving block — so imperfect placements compound into a narrower tower over time.
- Increase the moving block's speed as the tower grows taller, but cap it at a reasonable maximum so the game doesn't become unplayable at very tall heights.
- Once the tower's total height exceeds the visible play area, scroll the visual stack down by exactly the amount needed to keep the top of the tower and the currently moving block visible together.
- Track the current height (number of successfully placed blocks) and persist the best height ever achieved using localStorage, showing both live in a HUD.`,
    },
  },
};

export default towerStackTimingGame;
