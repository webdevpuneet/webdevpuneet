const flapDodgeGame = {
  id: 'flap-dodge-game',
  title: 'Flap & Dodge Obstacle Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="fd-wrap">
  <div class="fd-stage">
    <canvas id="fd-canvas" width="360" height="520"></canvas>
    <div class="fd-hud">
      <span id="fd-score">0</span>
    </div>
    <div class="fd-screen fd-start-screen" id="start-screen">
      <p class="fd-logo">Flap &amp; Dodge</p>
      <p class="fd-sub">Tap, click, or press Space to flap</p>
      <button class="fd-btn" id="start-btn">Start</button>
      <p class="fd-best">Best: <span id="start-best">0</span></p>
    </div>
    <div class="fd-screen fd-over-screen" id="over-screen">
      <p class="fd-logo">Game Over</p>
      <p class="fd-final-score">Score: <span id="final-score">0</span></p>
      <p class="fd-best">Best: <span id="over-best">0</span></p>
      <button class="fd-btn" id="retry-btn">Try Again</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.fd-wrap { display: flex; align-items: center; justify-content: center; }

.fd-stage {
  position: relative;
  width: 360px; height: 520px;
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  cursor: pointer;
}

#fd-canvas { display: block; width: 100%; height: 100%; background: #7dd3fc; }

.fd-hud {
  position: absolute; top: 16px; left: 0; right: 0;
  text-align: center; pointer-events: none;
}
#fd-score {
  font-size: 42px; font-weight: 800; color: #fff;
  text-shadow: 0 2px 0 rgba(0,0,0,0.25);
  font-family: 'Courier New', monospace;
}

.fd-screen {
  position: absolute; inset: 0;
  background: rgba(15,23,42,0.72);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.fd-screen.show { opacity: 1; pointer-events: all; }

.fd-logo { font-size: 26px; font-weight: 800; color: #fff; }
.fd-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 6px; }
.fd-final-score { font-size: 18px; font-weight: 700; color: #f1f5f9; }
.fd-best { font-size: 12px; color: #94a3b8; margin-top: 2px; }

.fd-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 10px 26px; font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s, transform 0.1s;
  margin-top: 4px;
}
.fd-btn:hover { background: #4f46e5; }
.fd-btn:active { transform: scale(0.96); }`,

  js: `const canvas = document.getElementById('fd-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'flap-dodge-best';

const startScreen = document.getElementById('start-screen');
const overScreen = document.getElementById('over-screen');
const scoreEl = document.getElementById('fd-score');
const finalScoreEl = document.getElementById('final-score');
const startBestEl = document.getElementById('start-best');
const overBestEl = document.getElementById('over-best');
const stage = document.querySelector('.fd-stage');

let best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0;
startBestEl.textContent = best;
overBestEl.textContent = best;

const GRAVITY = 1400;        // px/s^2
const FLAP_VELOCITY = -420;  // px/s
const PIPE_SPEED = 150;      // px/s
const PIPE_GAP = 150;        // px
const PIPE_WIDTH = 58;
const PIPE_INTERVAL = 1.5;   // seconds between pipe pairs
const BIRD_RADIUS = 14;
const BIRD_X = 90;

let state = 'idle'; // idle | playing | over
let bird = { y: H / 2, vy: 0 };
let pipes = [];
let score = 0;
let timeSincePipe = 0;
let lastTime = 0;
let rafId = null;

function resetGame() {
  bird = { y: H / 2, vy: 0 };
  pipes = [];
  score = 0;
  timeSincePipe = 0;
  scoreEl.textContent = '0';
}

function startGame() {
  resetGame();
  state = 'playing';
  startScreen.classList.remove('show');
  overScreen.classList.remove('show');
  lastTime = performance.now();
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  state = 'over';
  cancelAnimationFrame(rafId);
  if (score > best) {
    best = score;
    localStorage.setItem(BEST_KEY, String(best));
  }
  finalScoreEl.textContent = score;
  overBestEl.textContent = best;
  overScreen.classList.add('show');
}

function flap() {
  if (state === 'idle') { startGame(); return; }
  if (state === 'over') return;
  bird.vy = FLAP_VELOCITY;
}

function spawnPipe() {
  const margin = 60;
  const gapCenter = margin + Math.random() * (H - margin * 2);
  pipes.push({
    x: W + PIPE_WIDTH,
    gapCenter,
    passed: false,
  });
}

function update(dt) {
  bird.vy += GRAVITY * dt;
  bird.y += bird.vy * dt;

  timeSincePipe += dt;
  if (timeSincePipe >= PIPE_INTERVAL) {
    timeSincePipe = 0;
    spawnPipe();
  }

  for (const pipe of pipes) {
    pipe.x -= PIPE_SPEED * dt;
    if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X - BIRD_RADIUS) {
      pipe.passed = true;
      score++;
      scoreEl.textContent = score;
    }
  }
  pipes = pipes.filter(p => p.x > -PIPE_WIDTH);

  // Collisions: ground / ceiling
  if (bird.y - BIRD_RADIUS < 0 || bird.y + BIRD_RADIUS > H) {
    endGame();
    return;
  }

  // Collisions: pipes
  for (const pipe of pipes) {
    const withinX = BIRD_X + BIRD_RADIUS > pipe.x && BIRD_X - BIRD_RADIUS < pipe.x + PIPE_WIDTH;
    if (withinX) {
      const gapTop = pipe.gapCenter - PIPE_GAP / 2;
      const gapBottom = pipe.gapCenter + PIPE_GAP / 2;
      if (bird.y - BIRD_RADIUS < gapTop || bird.y + BIRD_RADIUS > gapBottom) {
        endGame();
        return;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Sky gradient
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#7dd3fc');
  g.addColorStop(1, '#bae6fd');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Pipes
  ctx.fillStyle = '#22c55e';
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 3;
  for (const pipe of pipes) {
    const gapTop = pipe.gapCenter - PIPE_GAP / 2;
    const gapBottom = pipe.gapCenter + PIPE_GAP / 2;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, gapTop);
    ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, gapTop);
    ctx.fillRect(pipe.x, gapBottom, PIPE_WIDTH, H - gapBottom);
    ctx.strokeRect(pipe.x, gapBottom, PIPE_WIDTH, H - gapBottom);
  }

  // Ground line
  ctx.fillStyle = '#a3e635';
  ctx.fillRect(0, H - 4, W, 4);

  // Bird
  const angle = Math.max(-0.5, Math.min(0.9, bird.vy / 600));
  ctx.save();
  ctx.translate(BIRD_X, bird.y);
  ctx.rotate(angle);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(0, 0, BIRD_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(4, -4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(5, -4, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(BIRD_RADIUS - 2, 0);
  ctx.lineTo(BIRD_RADIUS + 8, -3);
  ctx.lineTo(BIRD_RADIUS + 8, 3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  if (state === 'playing') {
    update(dt);
    draw();
    if (state === 'playing') rafId = requestAnimationFrame(loop);
  }
}

stage.addEventListener('mousedown', (e) => {
  if (e.target.closest('.fd-btn')) return;
  flap();
});
stage.addEventListener('touchstart', (e) => {
  if (e.target.closest('.fd-btn')) return;
  e.preventDefault();
  flap();
}, { passive: false });

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    flap();
  }
});

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('retry-btn').addEventListener('click', startGame);

draw();
startScreen.classList.add('show');

/* wdp-share:start */
(function () {
  var TITLE = 'Flap & Dodge Obstacle Game', URL = 'https://webdevpuneet.com/ui-snippets/flap-dodge-game/';
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
    title: 'Flap & Dodge Obstacle Game — Free HTML CSS JS Snippet',
    description: 'Canvas side-scroller with gravity, tap-to-flap, delta-time obstacle scroll and localStorage best score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Flap & Dodge Obstacle Game — Delta-Time Physics, Canvas Rendering & Gap Collision Detection',
      description: `Side-scrolling flap-and-dodge games look simple on the surface but hinge entirely on one detail most quick clones get wrong: frame-rate independence. If gravity and obstacle speed are applied as a fixed number of pixels per rendered frame, the game runs at wildly different speeds on a 60Hz versus a 144Hz display, or stutters unpredictably when the browser tab is throttled. This snippet uses genuine delta-time physics — every update multiplies velocity and position changes by the elapsed time since the last frame, in seconds, so the character falls, accelerates, and the obstacles scroll at a truly constant real-world speed regardless of the device's refresh rate.

**The game loop and delta time**

The core loop runs through \`requestAnimationFrame(loop)\`, and each call computes \`dt\` as the milliseconds since the previous frame converted to seconds and clamped to a maximum of 0.033 (roughly 30fps) so a dropped frame or tab-switch stall never produces a huge physics jump that teleports the character through an obstacle. Gravity is defined as \`GRAVITY = 1400\` pixels per second squared, applied each frame as \`bird.vy += GRAVITY * dt\`, and the resulting velocity moves the character as \`bird.y += bird.vy * dt\`. A click, tap, or spacebar press calls \`flap()\`, which simply overwrites the vertical velocity to a fixed upward value (\`FLAP_VELOCITY = -420\`) — the same physics integration then naturally arcs the character back down under gravity afterward.

**Obstacle spawning and gap collision**

New obstacle pairs are pushed onto a \`pipes\` array on a fixed real-time interval (\`PIPE_INTERVAL\` seconds, not frame count), each with a randomly chosen \`gapCenter\` kept away from the very top and bottom of the canvas via a margin. Every frame, each pipe's \`x\` decreases by \`PIPE_SPEED * dt\`, and pipes are filtered out of the array once they scroll fully off the left edge, keeping the array small and collision checks cheap. Collision detection is a straightforward two-axis check: a pipe is only a collision candidate while the character's horizontal extent overlaps the pipe's horizontal extent, and within that window the character loses if its vertical extent extends above the gap's top edge or below the gap's bottom edge — exactly the classic "AABB vs gap" test used by every implementation of this genre.

**Scoring and canvas rendering**

A pipe is marked \`passed\` and the score increments the instant the pipe's right edge scrolls behind the character's left edge, so scoring happens exactly once per obstacle regardless of frame rate. Rendering is done entirely on a single 2D canvas context: a vertical sky gradient, filled rectangles for the top and bottom pipe segments (derived directly from each pipe's \`gapCenter\` and \`PIPE_GAP\`), and a hand-drawn circular character with a rotating tilt driven by the current vertical velocity (\`Math.atan\`-free — a simple clamped ratio of \`vy\`) so the character visibly noses down while falling and up while flapping, a small but important readability cue borrowed from the genre's classic feel. Best score persists via \`localStorage\` and is shown on both the start screen and the game-over screen.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start the game', text: 'Click "Start" on the opening screen, or simply click/tap the stage or press Space — any flap input while idle begins the run immediately via startGame().' },
        { title: 'Flap to gain height', text: 'Each click, tap, or spacebar press sets the character\'s vertical velocity to a fixed upward value (FLAP_VELOCITY), instantly interrupting its fall. Gravity then pulls it back down every frame until you flap again.' },
        { title: 'Dodge the gaps', text: 'Obstacle pairs scroll in from the right at a constant real-world speed (PIPE_SPEED, not frame-dependent) with a randomly positioned vertical gap. Keep the character\'s circle within the gap as each pair passes.' },
        { title: 'Watch your score climb', text: 'The score increments by one the instant a pipe pair is fully passed, tracked per-pipe with a passed flag so each obstacle only scores once no matter the frame rate.' },
        { title: 'See your final score on Game Over', text: 'Colliding with a pipe, the ceiling, or the ground ends the run immediately, freezes the loop, and shows the Game Over screen with your final score and your all-time best.' },
        { title: 'Beat your best score', text: 'Your highest score persists across sessions via localStorage. Click "Try Again" to instantly reset the character, obstacles, and score and start a fresh delta-time-driven run.' },
      ],
    },
    features: [
      'Delta-time physics integration: gravity and obstacle speed scale by real elapsed seconds, not frame count',
      'requestAnimationFrame game loop with a clamped dt (max ~33ms) to prevent physics jumps on dropped frames',
      'Randomised obstacle gap position per pipe pair, generated with a safe margin from the canvas edges',
      'Two-axis AABB-vs-gap collision test: horizontal overlap gates a vertical gap-boundary check',
      'Per-pipe passed flag ensures the score increments exactly once per obstacle regardless of frame rate',
      'Canvas-drawn character with velocity-driven tilt rotation for a readable falling/flapping visual cue',
      'Persistent best score via localStorage, shown on both the start screen and the game-over screen',
      'Unified input handling across mousedown, touchstart (with preventDefault), and Space keydown',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching delta-time game physics and canvas fundamentals', desc: 'This snippet is a compact, complete example of the single most important concept in real-time game programming: decoupling simulation speed from rendering frame rate. Students can compare the update() function\'s use of dt against a naive fixed-step version to directly see why frame-rate-dependent physics breaks on variable-refresh-rate hardware.' },
      { icon: 'APP', title: 'Portfolio piece demonstrating canvas game-loop architecture', desc: 'A working obstacle-dodging game with correct delta-time physics, collision detection, and persisted high scores is a strong, self-contained portfolio artifact that goes well beyond a static canvas drawing — it demonstrates real game-loop architecture, state machines (idle/playing/over), and input handling across mouse, touch, and keyboard.' },
      { icon: 'FLOW', title: 'Engaging waiting-screen or loading-state distraction', desc: 'A quick, replayable arcade game like this is a natural fit for a loading screen, an offline/error page, or a "while you wait" panel in a checkout or onboarding flow, giving users something genuinely fun to do rather than staring at a spinner.' },
      { icon: 'DESIGN', title: 'Canvas HUD and overlay-screen pattern reference', desc: 'The layered structure — a canvas for the simulation, an absolutely positioned score HUD, and semi-transparent start/game-over overlay screens that fade in and out — is a reusable pattern for any canvas-based mini-game or interactive demo that needs UI chrome layered on top of a rendering surface.' },
      { icon: 'CODE', title: 'Base for difficulty ramps or alternate obstacle patterns', desc: 'Because GRAVITY, PIPE_SPEED, PIPE_GAP, and PIPE_INTERVAL are top-level constants, this snippet is a practical starting point for a difficulty curve that gradually increases pipe speed or narrows the gap as the score rises, similar in spirit to how the [Rhythm Tap Game](/ui-snippets/rhythm-tap-game) snippet could scale its note frequency over time.' },
      { icon: 'FORM', title: 'One-thumb mobile arcade game', desc: 'The single-tap-to-flap control scheme, combined with preventDefault on touchstart to stop the page from scrolling or zooming during play, makes this comfortable to play one-handed on a phone without any on-screen buttons taking up screen space.' },
      { icon: 'CODE', title: 'Related: Dot Muncher Maze Game', desc: 'See the [Dot Muncher Maze Game](/ui-snippets/dot-muncher-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Flexbox Alignment Game', desc: 'See the [Flexbox Alignment Game](/ui-snippets/flexbox-align-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the game use delta time instead of fixed pixel steps per frame?', a: 'requestAnimationFrame does not guarantee a fixed interval between calls — it can fire at 60fps, 120fps, or drop frames under load. If gravity and obstacle speed were applied as constant pixel amounts per frame, the game would run faster on high-refresh-rate displays and stutter unpredictably under load. By multiplying every physics change by dt (seconds elapsed since the last frame), this snippet keeps gravity acceleration and obstacle scroll speed constant in real-world time regardless of how often the frame callback fires.' },
      { q: 'How does collision detection work against the obstacle gaps?', a: 'For each pipe, the code first checks horizontal overlap: does the character\'s circle extent intersect the pipe\'s x-range? Only if that is true does it check the vertical condition — whether the character\'s top edge is above the gap\'s top boundary or its bottom edge is below the gap\'s bottom boundary. If either is true while horizontally overlapping, it is a collision. This two-stage check is cheap because most pipes are off-screen or far away and get skipped by the horizontal test immediately.' },
      { q: 'Can I make the game harder as the score increases?', a: 'Yes. Add a scaling factor to PIPE_SPEED and/or shrink PIPE_GAP based on the current score inside update(), for example recalculating an effective speed as PIPE_SPEED + score * 3 each frame. Keep the change gradual and test that the gap never shrinks below roughly 2.5x the character\'s diameter, or the game becomes unfairly difficult to react to.' },
      { q: 'Why is the best score still visible after a fresh Start?', a: 'best is read from localStorage once when the script first loads and kept in memory for the whole session, only being overwritten (in memory and in localStorage) when a completed run\'s score exceeds it. Starting a new game resets the current score to 0 but intentionally leaves best untouched so it always reflects your highest-ever run, shown on both the start screen and the game-over screen.' },
      { q: 'How do I add sound effects for flapping, scoring, or crashing?', a: 'Create Audio objects (e.g. const flapSound = new Audio("flap.mp3")) and call .play() inside flap(), inside the score-increment branch in update(), and inside endGame() respectively. Since many browsers block audio playback before any user interaction, the very first flap() call (which also starts the game from idle) is a safe place to "unlock" audio playback for the rest of the session.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the dt clamp in the game loop protects against a physics-breaking jump if the browser tab is backgrounded and then resumed — that single line is doing more work than it looks like. It's also a great snippet to extend with AI assistance: ask it to add a gradual difficulty ramp that increases obstacle speed or narrows the gap as the score rises, add a simple particle burst or screen-shake effect on collision for more satisfying game feedback, or refactor the character's tilt-rotation math into its own small function with comments explaining the velocity-to-angle mapping. Use the assistant to sanity-check the collision math too — walk through a near-miss scenario by hand and confirm the AABB-vs-gap logic agrees with your intuition.`,
      prompt: `Build a canvas-based side-scrolling flap-and-dodge obstacle game in plain HTML, CSS, and JavaScript — no frameworks, no libraries, no external assets. Do not name it after any existing commercial game.

Requirements:
- A character falls under constant gravity and receives an upward velocity boost on each click, tap, or spacebar press.
- A steady stream of gapped obstacle pairs scroll from right to left at a constant speed, each with a randomly chosen vertical gap position, spawned on a fixed real-world time interval.
- Use requestAnimationFrame for the game loop and compute all movement (gravity integration and obstacle scrolling) using delta-time in seconds since the previous frame, not a fixed per-frame pixel amount, so speed stays consistent across different frame rates. Clamp the delta-time value to avoid large physics jumps after a dropped frame or backgrounded tab.
- Colliding with any obstacle, the ceiling, or the ground immediately ends the run.
- The score increases by exactly one each time the character successfully passes through an obstacle gap, counted once per obstacle regardless of frame rate.
- Include a Start screen shown before the first run, and a Game Over screen after a collision showing the final score and a "Try again" button that fully resets the game state.
- Persist the best-ever score across page reloads using localStorage and display it on both the start and game-over screens.`,
    },
  },
};

export default flapDodgeGame;
