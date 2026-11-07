const laneRunnerGame = {
  id: 'lane-runner-game',
  title: 'Lane Runner Endless Game',
  lastmod: '2026-11-07',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="logo" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20 9 4h6l6 16"/><path d="M12 8v3M12 14v3"/></svg></span>
      <div>
        <h2>Lane Runner</h2>
        <p class="tagline">Neon endless runner</p>
      </div>
    </div>
    <div class="head-right">
      <span class="badge">Best <b id="best-score">0</b></span>
      <button class="icon-btn" id="btn-sound" type="button" aria-pressed="true" aria-label="Sound on" title="Sound (M)">🔊</button>
      <button class="icon-btn" id="btn-pause" type="button" aria-label="Pause" title="Pause (P)">❚❚</button>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="480" aria-label="Lane Runner game canvas"></canvas>
    <div class="hud" aria-live="off">
      <span class="hud-score"><small>SCORE</small><b id="hud-score">0</b></span>
      <span class="hud-coins"><i></i><b id="hud-coins">0</b></span>
      <span class="hud-speed" title="Speed"><em id="hud-speed"></em></span>
    </div>

    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-kicker">Endless runner</p>
        <p class="overlay-title">Lane <span>Runner</span></p>
        <p class="overlay-sub">Switch lanes, <b>jump</b> the green barriers, <b>slide</b> under the amber gates and dodge the red blocks. Grab coins and shields. It never stops speeding up.</p>
        <ul class="keys"><li><kbd>←</kbd><kbd>→</kbd> lanes</li><li><kbd>↑</kbd> jump</li><li><kbd>↓</kbd> slide</li><li>or swipe / tap</li></ul>
        <button class="btn btn-primary" id="btn-start" type="button">Run</button>
      </div>
    </div>
    <div class="overlay hidden" id="pause-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Paused</p>
        <button class="btn btn-primary" id="btn-resume" type="button">Resume</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title over">Crashed!</p>
        <p class="overlay-score" id="final-score">0</p>
        <p class="overlay-sub" id="final-detail"></p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry" type="button">Run again</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="dpad">
      <button class="ctrl-btn" id="btn-left" type="button" aria-label="Move left">◀</button>
      <button class="ctrl-btn" id="btn-right" type="button" aria-label="Move right">▶</button>
    </div>
    <div class="actions">
      <button class="act-btn jump" id="btn-jump" type="button" aria-label="Jump">JUMP</button>
      <button class="act-btn slide" id="btn-slide" type="button" aria-label="Slide">SLIDE</button>
    </div>
  </div>
  <p class="hint-text">Keys: ← → lanes · ↑ / Space jump · ↓ slide · P pause · M sound — or swipe on the track</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:radial-gradient(700px 420px at 50% 0%,rgba(236,72,153,.28),transparent 70%),#08031a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;color:#e9e4ff}
.game-card{width:100%;max-width:400px;background:linear-gradient(180deg,#171036,#0d0824);border-radius:22px;border:1px solid #2e2260;box-shadow:0 24px 60px -20px rgba(236,72,153,.4);padding:16px;user-select:none;-webkit-user-select:none}

.game-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px;flex-wrap:wrap}
.game-title{display:flex;align-items:center;gap:10px}
.logo{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;color:#67e8f9;background:linear-gradient(135deg,rgba(236,72,153,.3),rgba(34,211,238,.2));border:1px solid rgba(103,232,249,.4);box-shadow:0 0 16px rgba(34,211,238,.3)}
.game-title h2{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.01em}
.tagline{font-size:11px;color:#8f84c4;margin-top:1px}
.head-right{display:flex;align-items:center;gap:6px}
.badge{font-size:11px;font-weight:700;color:#b6abe6;background:#1b1342;border:1px solid #2e2260;padding:5px 10px;border-radius:999px;white-space:nowrap}
.badge b{color:#fff;font-variant-numeric:tabular-nums}
.icon-btn{width:30px;height:28px;border-radius:9px;border:1px solid #2e2260;background:#1b1342;color:#d4ccff;font-size:12px;cursor:pointer;transition:background .15s,border-color .15s}
.icon-btn:hover{background:#271b5c;border-color:#5b47b8}
.icon-btn[aria-pressed="false"]{opacity:.55}
.icon-btn:focus-visible,.btn:focus-visible,.ctrl-btn:focus-visible,.act-btn:focus-visible{outline:2px solid #67e8f9;outline-offset:2px}

.canvas-wrap{position:relative;border-radius:16px;overflow:hidden;line-height:0;touch-action:none;background:#08031a;border:1px solid #3b2b7a;box-shadow:0 0 0 1px rgba(0,0,0,.6),0 0 30px -8px rgba(236,72,153,.55)}
canvas{display:block;width:100%;height:auto}
.hud{position:absolute;inset:10px 14px auto 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;pointer-events:none;z-index:2;line-height:1.2}
.hud-score{display:flex;flex-direction:column}
.hud-score small{font-size:9px;font-weight:800;letter-spacing:.14em;color:#c4b5fd}
.hud-score b{font-size:22px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 12px rgba(236,72,153,.9)}
.hud-coins{display:flex;align-items:center;gap:6px;font-size:15px;font-weight:900;color:#fde047;font-variant-numeric:tabular-nums;text-shadow:0 0 10px rgba(250,204,21,.7)}
.hud-coins i{width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7c2,#facc15 60%,#b45309);box-shadow:0 0 8px rgba(250,204,21,.8)}
.hud-speed{width:56px;height:6px;border-radius:9px;background:rgba(255,255,255,.14);overflow:hidden}
.hud-speed em{display:block;height:100%;width:0;border-radius:9px;background:linear-gradient(90deg,#22d3ee,#ec4899)}

.overlay{position:absolute;inset:0;background:rgba(8,3,26,.62);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:20px;line-height:1.4;z-index:3}
.overlay.hidden{display:none}
.overlay-card{text-align:center;max-width:300px}
.overlay-kicker{font-size:10.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#67e8f9;margin-bottom:6px}
.overlay-title{font-size:32px;font-weight:900;letter-spacing:-.02em;color:#fff;margin-bottom:8px}
.overlay-title span{background:linear-gradient(90deg,#f472b6,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.overlay-title.over{color:#fb7185;text-shadow:0 0 22px rgba(251,113,133,.6)}
.overlay-sub{font-size:12.5px;color:#c9c1ee;margin:0 auto}
.overlay-sub b{color:#fff}
.overlay-score{font-size:46px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 24px rgba(236,72,153,.8);line-height:1.1}
.overlay-best{font-size:12.5px;color:#fbbf24;font-weight:800;margin-top:6px;min-height:18px}
.keys{list-style:none;display:flex;flex-wrap:wrap;gap:6px 12px;justify-content:center;margin:12px 0 0;font-size:11.5px;color:#a79cd6}
.keys li{display:flex;align-items:center;gap:4px}
kbd{font:700 11px system-ui;color:#efeaff;background:#241a55;border:1px solid #4a3a9c;border-bottom-width:2px;border-radius:5px;padding:1px 6px}
.btn{padding:11px 34px;font-size:14px;font-weight:800;border-radius:12px;cursor:pointer;font-family:inherit;transition:transform .12s,box-shadow .2s;border:none;margin-top:16px}
.btn-primary{background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;box-shadow:0 6px 22px -6px rgba(236,72,153,.9)}
.btn-primary:hover{transform:translateY(-1px)}

.controls{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px}
.dpad,.actions{display:flex;gap:10px}
.ctrl-btn,.act-btn{-webkit-tap-highlight-color:transparent;touch-action:none;cursor:pointer;font-family:inherit;border:1px solid #3a2c80;transition:transform .06s,background .12s,box-shadow .12s}
.ctrl-btn{width:58px;height:60px;border-radius:15px;background:#1b1342;color:#d4ccff;font-size:20px;font-weight:700;box-shadow:0 3px 0 #0b0720}
.ctrl-btn:active{transform:translateY(3px);box-shadow:none;background:#2e2268}
.act-btn{width:78px;height:60px;border-radius:15px;color:#fff;font-size:12.5px;font-weight:900;letter-spacing:.08em}
.act-btn.jump{background:linear-gradient(180deg,#22c55e,#16a34a);box-shadow:0 3px 0 #14532d,0 0 18px -4px rgba(34,197,94,.6);border-color:#4ade80}
.act-btn.slide{background:linear-gradient(180deg,#f59e0b,#d97706);box-shadow:0 3px 0 #78350f,0 0 18px -4px rgba(245,158,11,.6);border-color:#fbbf24}
.act-btn:active{transform:translateY(3px);box-shadow:none}
.hint-text{font-size:11px;color:#7466ad;text-align:center;margin-top:10px}

@media(max-width:400px){.game-card{padding:12px}.overlay-title{font-size:26px}.badge{display:none}}`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = 360, H = 480, DPR = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);   // logic stays 360x480, pixels stay sharp

const BEST_KEY = 'lane-runner-best', MUTE_KEY = 'lane-runner-muted';
const LANES = 3;
const HORIZON = 176, BASE_Y = H - 86, SPACING = 98, FOCAL = 22, SPAWN_D = 150;   // pseudo-3D camera: d = distance ahead of the runner
const JUMP_MS = 640, SLIDE_MS = 560;
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Perspective: depth d -> scale t (1 at the runner, ~0 at the horizon) -> screen y and x
function proj(d) { const t = FOCAL / (FOCAL + d); return { t: t, y: HORIZON + (BASE_Y - HORIZON) * t }; }
function sx(laneF, t) { return W / 2 + (laneF - 1) * SPACING * t; }

const $ = id => document.getElementById(id);
let state = 'idle';                        // idle (autopilot demo) | play | paused | over
let laneF, lane, jumpT, slideT, obstacles, coinsList, pickups, particles, streaks = [], stars = [], skyline = [];
let distance, speedU, score, coinCount, shield, invuln, shake = 0, spawnAcc, nextGap, lastFrame = 0, runClock = 0, flash = 0, streak = 0;

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }
function rand(a, b) { return a + Math.random() * (b - a); }

// ── Sound: small WebAudio synth, created on the first click ──
let actx = null, muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch (e) {}
function audio() {
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (actx && actx.state === 'suspended') actx.resume();
  return actx;
}
function tone(f0, f1, dur, type, vol) {
  if (muted) return; const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur);
}
function noise(dur, vol, cutoff) {
  if (muted) return; const a = audio(); if (!a) return;
  const len = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  s.buffer = buf; f.type = 'lowpass'; f.frequency.value = cutoff; g.gain.value = vol; s.connect(f); f.connect(g); g.connect(a.destination); s.start();
}
const sfx = {
  jump: () => tone(300, 760, 0.16, 'sine', 0.07),
  slide: () => noise(0.22, 0.06, 2400),
  lane: () => tone(520, 380, 0.06, 'triangle', 0.035),
  coin: n => { tone(880 + Math.min(n, 8) * 70, 1320 + Math.min(n, 8) * 70, 0.1, 'square', 0.03); },
  shield: () => { tone(420, 1100, 0.3, 'sawtooth', 0.045); },
  crash: () => { noise(0.5, 0.14, 800); tone(220, 40, 0.5, 'sawtooth', 0.08); },
  pop: () => { noise(0.25, 0.1, 3000); tone(900, 200, 0.25, 'triangle', 0.05); },
};

// ── World setup ──
function makeScenery() {
  stars = []; for (let i = 0; i < 46; i++) stars.push({ x: rand(0, W), y: rand(0, HORIZON - 30), r: rand(0.5, 1.5), p: rand(0, 6) });
  skyline = []; for (let x = -30; x < W + 60; x += 0) { const w = rand(16, 34), h = rand(18, 76); skyline.push({ x, w, h, win: Math.random() }); x += w + rand(0, 4); }
  streaks = []; for (let i = 0; i < 16; i++) streaks.push({ a: rand(0, Math.PI * 2), r: rand(40, 400), len: rand(20, 60) });
}
function resetState() {
  lane = 1; laneF = 1; jumpT = 0; slideT = 0; obstacles = []; coinsList = []; pickups = []; particles = [];
  distance = 0; speedU = 34; score = 0; coinCount = 0; shield = 0; invuln = 0; spawnAcc = 0; nextGap = 40; streak = 0; flash = 0;
  syncHud();
}
function syncHud() { $('hud-score').textContent = score.toLocaleString('en-US'); $('hud-coins').textContent = coinCount; $('hud-speed').style.width = Math.round(((speedU - 34) / 72) * 100) + '%'; }

// ── Spawning: rows of obstacles, coin lines and shield pickups ──
function addCoins(l, n, d0) { for (let i = 0; i < n; i++) coinsList.push({ lane: l, d: d0 + i * 6, phase: rand(0, 6), taken: false }); }
function spawnRow() {
  const r = Math.random(), d = SPAWN_D;
  if (r < 0.3) {                                   // one barrier or gate, coins in the other lanes
    const l = (Math.random() * LANES) | 0, type = Math.random() < 0.5 ? 'barrier' : 'gate';
    obstacles.push({ lane: l, d, type }); addCoins((l + 1 + ((Math.random() * 2) | 0)) % LANES, 4, d - 4);
  } else if (r < 0.58) {                           // two solid blocks, one lane left open (with coins in it)
    const open = (Math.random() * LANES) | 0;
    for (let i = 0; i < LANES; i++) if (i !== open) obstacles.push({ lane: i, d, type: 'block' });
    addCoins(open, 5, d - 6);
  } else if (r < 0.72) {                           // a wall across every lane: jump it or slide it
    const type = Math.random() < 0.5 ? 'barrier' : 'gate';
    for (let i = 0; i < LANES; i++) obstacles.push({ lane: i, d, type });
  } else if (r < 0.9) {                            // a clean coin line to reward lane choice
    addCoins((Math.random() * LANES) | 0, 7, d);
  } else if (!shield) {
    pickups.push({ lane: (Math.random() * LANES) | 0, d, type: 'shield' });
  } else {
    addCoins((Math.random() * LANES) | 0, 5, d);
  }
  nextGap = Math.max(30, speedU * 0.62) + rand(0, 14);    // the gap grows with speed so there is always time to react
}

// ── Actions: all one-shot taps ──
function moveLane(dir) { const n = Math.max(0, Math.min(LANES - 1, lane + dir)); if (n !== lane) { lane = n; if (state === 'play') sfx.lane(); } }
function doJump() { if (state !== 'play' || jumpT > 0) return; slideT = 0; jumpT = JUMP_MS; sfx.jump(); }
function doSlide() { if (state !== 'play' || slideT > 0) return; jumpT = 0; slideT = SLIDE_MS; sfx.slide(); }   // sliding in mid-air drops you straight down

function burst(x, y, color, n, speed) { for (let i = 0; i < n; i++) { const a = rand(0, Math.PI * 2), s = rand(0.3, 1) * (speed || 3); particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: rand(0.02, 0.05), color }); } }

// Demo autopilot: dodges so the title screen shows a live, playing scene
function autopilot() {
  let near = null;
  obstacles.forEach(o => { if (o.d > 0 && o.d < 30 && Math.abs(o.lane - lane) < 0.5 && (!near || o.d < near.d)) near = o; });
  if (!near) return;
  if (near.type === 'block') {
    const free = [0, 1, 2].filter(l => !obstacles.some(o => o.type === 'block' && Math.abs(o.d - near.d) < 8 && o.lane === l));
    if (free.length) { const target = free.reduce((a, b) => Math.abs(b - lane) < Math.abs(a - lane) ? b : a); lane += Math.sign(target - lane); }
  } else if (near.d < 11) { near.type === 'barrier' ? (jumpT <= 0 && (jumpT = JUMP_MS)) : (slideT <= 0 && (slideT = SLIDE_MS)); }
}

function crash() {
  burst(sx(laneF, 1), BASE_Y - 30, '#f472b6', 30, 5); burst(sx(laneF, 1), BASE_Y - 30, '#22d3ee', 16, 3);
  shake = 14; flash = 1; sfx.crash(); endGame();
}

// ── Simulation ──
function update(dt) {
  const ms = dt * 1000, demo = state === 'idle';
  speedU = Math.min(106, 34 + distance * 0.012);
  distance += speedU * dt; runClock += dt * (0.7 + speedU / 60);
  if (!demo) { score = Math.floor(distance / 10) + coinCount * 10; }
  laneF += (lane - laneF) * Math.min(1, dt * 16);
  if (demo) autopilot();
  if (jumpT > 0) jumpT -= ms; if (slideT > 0) slideT -= ms; if (invuln > 0) invuln -= dt;

  spawnAcc += speedU * dt; if (spawnAcc >= nextGap) { spawnAcc = 0; spawnRow(); }
  const mv = speedU * dt;
  obstacles.forEach(o => o.d -= mv); coinsList.forEach(c => c.d -= mv); pickups.forEach(p => p.d -= mv);
  const jumping = jumpT > 0 && Math.sin((1 - jumpT / JUMP_MS) * Math.PI) > 0.28, sliding = slideT > 0;

  // obstacles: same lane and passing through the runner's depth
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const o = obstacles[i];
    if (o.d < -1.3 || o.d > 1.3 || Math.abs(o.lane - laneF) > 0.55) continue;
    if (o.type === 'barrier' && jumping) continue;
    if (o.type === 'gate' && sliding) continue;
    if (demo || invuln > 0) continue;
    if (shield) { shield = 0; invuln = 1.3; burst(sx(o.lane, 1), BASE_Y - 24, '#67e8f9', 24, 4); burst(sx(o.lane, 1), BASE_Y - 24, '#ffffff', 10, 2.5); obstacles.splice(i, 1); shake = 7; sfx.pop(); continue; }
    crash(); return;
  }
  // coins and pickups
  coinsList.forEach(c => {
    if (c.taken || c.d > 2.5 || c.d < -1.5 || Math.abs(c.lane - laneF) > 0.6) return;
    c.taken = true; if (demo) return;
    coinCount++; streak++; score = Math.floor(distance / 10) + coinCount * 10; sfx.coin(streak);
    const p = proj(0); burst(sx(c.lane, 1), p.y - 28, '#fde047', 7, 2.4);
  });
  pickups.forEach(p => { if (!p.taken && p.d < 2.5 && p.d > -1.5 && Math.abs(p.lane - laneF) < 0.6) { p.taken = true; if (!demo) { shield = 1; sfx.shield(); burst(sx(p.lane, 1), BASE_Y - 30, '#67e8f9', 18, 3.4); } } });
  coinsList.forEach(c => { if (!c.taken && c.d < -1.5) streak = 0; });
  obstacles = obstacles.filter(o => o.d > -6); coinsList = coinsList.filter(c => c.d > -6 && !c.taken); pickups = pickups.filter(p => p.d > -6 && !p.taken);
  if (!demo) syncHud();
}
function moveVisuals(dt) {
  particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= p.decay; }); particles = particles.filter(p => p.life > 0);
  const k = Math.min(1, (speedU - 34) / 72 + 0.15);
  streaks.forEach(s => { s.r += (120 + 520 * k) * dt; if (s.r > 430) { s.r = rand(30, 90); s.a = rand(0, Math.PI * 2); } });
  shake *= Math.pow(0.88, dt * 60); flash *= Math.pow(0.9, dt * 60);
}

// ── Rendering ──
const SKY = '#2a0a55';
function drawSky(now) {
  const g = ctx.createLinearGradient(0, 0, 0, HORIZON); g.addColorStop(0, '#07031a'); g.addColorStop(.55, SKY); g.addColorStop(1, '#c0266d');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, HORIZON + 1);
  ctx.fillStyle = '#fff'; stars.forEach(s => { ctx.globalAlpha = 0.35 + 0.4 * Math.sin(now / 700 + s.p); ctx.fillRect(s.x, s.y, s.r, s.r); }); ctx.globalAlpha = 1;
  const cx = W / 2, cy = HORIZON - 36, r = 60;                                  // retro sun with cut stripes
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
  const sg = ctx.createLinearGradient(0, cy - r, 0, cy + r); sg.addColorStop(0, '#ffe36b'); sg.addColorStop(.55, '#ff7a59'); sg.addColorStop(1, '#ff2d95');
  ctx.fillStyle = sg; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.fillStyle = '#3a0c5f'; for (let i = 0; i < 6; i++) ctx.fillRect(cx - r, cy + 4 + i * 11 + ((now / 120) % 1) * 2, r * 2, 2 + i * 1.6);
  ctx.restore();
  const off = (laneF - 1) * -8;                                                  // skyline parallax follows the lane
  ctx.fillStyle = '#12072e'; skyline.forEach(b => ctx.fillRect(b.x + off, HORIZON - b.h, b.w, b.h + 1));
  ctx.fillStyle = 'rgba(255,184,107,.55)'; skyline.forEach((b, i) => { if (b.win > 0.45) for (let k = 0; k < 3; k++) ctx.fillRect(b.x + off + 4 + k * 8, HORIZON - b.h + 6 + ((i + k) % 4) * 9, 3, 3); });
}
function drawGround() {
  const g = ctx.createLinearGradient(0, HORIZON, 0, H); g.addColorStop(0, '#2a0f55'); g.addColorStop(1, '#0d0624');
  ctx.fillStyle = g; ctx.fillRect(0, HORIZON, W, H - HORIZON);
  const yb = HORIZON + (BASE_Y - HORIZON) * 1.4;                                 // the grid outside the track
  ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(255,70,200,.2)';
  for (let m = -9; m <= 9; m++) { ctx.beginPath(); ctx.moveTo(W / 2, HORIZON); ctx.lineTo(W / 2 + m * SPACING * 1.4 * 1.5, yb); ctx.stroke(); }
  const L = 10, base = Math.floor(distance / L);                                 // scrolling bands: alternate shade, dashes on every other one
  for (let k = 0; k < 34; k++) {
    const dN = k * L - (distance % L), dF = dN + L, pN = proj(Math.max(dN, -8)), pF = proj(dF), par = (base + k) % 2;
    const hwN = 1.5 * SPACING * pN.t, hwF = 1.5 * SPACING * pF.t;
    ctx.fillStyle = par ? '#1c1247' : '#251a5c'; ctx.beginPath(); ctx.moveTo(W / 2 - hwF, pF.y); ctx.lineTo(W / 2 + hwF, pF.y); ctx.lineTo(W / 2 + hwN, pN.y); ctx.lineTo(W / 2 - hwN, pN.y); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(255,70,200,.14)'; ctx.beginPath(); ctx.moveTo(0, pN.y); ctx.lineTo(W, pN.y); ctx.stroke();
    if (!par) { ctx.fillStyle = 'rgba(180,200,255,.5)'; [0.5, 1.5].forEach(lf => { const wN = 1.6 * pN.t, wF = 1.6 * pF.t; ctx.beginPath(); ctx.moveTo(sx(lf, pF.t) - wF, pF.y); ctx.lineTo(sx(lf, pF.t) + wF, pF.y); ctx.lineTo(sx(lf, pN.t) + wN, pN.y); ctx.lineTo(sx(lf, pN.t) - wN, pN.y); ctx.closePath(); ctx.fill(); }); }
  }
  ctx.save(); ctx.lineWidth = 3; ctx.shadowBlur = 12;                            // glowing track edges
  [[-0.5, '#22d3ee'], [2.5, '#ec4899']].forEach(e => { ctx.strokeStyle = e[1]; ctx.shadowColor = e[1]; ctx.beginPath(); ctx.moveTo(sx(e[0], 0.02), HORIZON + 1); ctx.lineTo(sx(e[0], 1.4), yb); ctx.stroke(); });
  ctx.restore();
}
function drawSpeedLines() {
  const k = (speedU - 34) / 72; if (k < 0.2) return;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(255,255,255,' + (0.1 + k * 0.28) + ')';
  streaks.forEach(s => { const x0 = W / 2 + Math.cos(s.a) * s.r, y0 = HORIZON + Math.sin(s.a) * s.r * 0.6, x1 = W / 2 + Math.cos(s.a) * (s.r + s.len * k), y1 = HORIZON + Math.sin(s.a) * (s.r + s.len * k) * 0.6; if (y0 > HORIZON) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); } });
  ctx.restore();
}
function shadow(x, y, w, a) { ctx.fillStyle = 'rgba(0,0,0,' + a + ')'; ctx.beginPath(); ctx.ellipse(x, y, w, w * 0.22, 0, 0, 7); ctx.fill(); }
function drawObstacle(o) {
  const p = proj(o.d), t = p.t, x = sx(o.lane, t), y = p.y, w = SPACING * 0.8 * t; if (t < 0.03) return;
  ctx.save(); ctx.globalAlpha = Math.min(1, t * 5 + 0.15); shadow(x, y, w * 0.55, 0.35);
  if (o.type === 'barrier') {                                                    // low wall: jump
    const h = 30 * t, g = ctx.createLinearGradient(0, y - h, 0, y); g.addColorStop(0, '#4ade80'); g.addColorStop(1, '#15803d');
    ctx.shadowColor = '#22c55e'; ctx.shadowBlur = 12 * t; ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h, w, h); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(5,46,22,.85)'; for (let i = 0; i < 5; i++) { ctx.beginPath(); const bx = x - w / 2 + i * w / 5; ctx.moveTo(bx, y); ctx.lineTo(bx + w / 10, y - h); ctx.lineTo(bx + w / 5 - w / 10 + 0.1, y - h); ctx.lineTo(bx + w / 10, y); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - w / 2, y - h, w, 2 * t + 0.5);
  } else if (o.type === 'gate') {                                                // overhead beam: slide under
    const ph = 84 * t, bh = 15 * t, pw = 8 * t;
    ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 12 * t; ctx.fillStyle = '#b45309'; ctx.fillRect(x - w / 2, y - ph, pw, ph); ctx.fillRect(x + w / 2 - pw, y - ph, pw, ph);
    const g = ctx.createLinearGradient(0, y - ph, 0, y - ph + bh); g.addColorStop(0, '#fcd34d'); g.addColorStop(1, '#d97706'); ctx.fillStyle = g; ctx.fillRect(x - w / 2 - 3 * t, y - ph, w + 6 * t, bh); ctx.shadowBlur = 0;
    ctx.fillStyle = '#451a03'; for (let i = 0; i < 6; i++) ctx.fillRect(x - w / 2 + i * (w / 6) + 1 * t, y - ph + 2 * t, 7 * t, bh - 4 * t);
  } else {                                                                       // solid block: change lane
    const h = 60 * t, g = ctx.createLinearGradient(0, y - h, 0, y); g.addColorStop(0, '#fb7185'); g.addColorStop(1, '#be123c');
    ctx.shadowColor = '#f43f5e'; ctx.shadowBlur = 14 * t; ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h, w, h); ctx.shadowBlur = 0;
    ctx.fillStyle = '#fda4af'; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x + w / 2, y - h); ctx.lineTo(x + w / 2 * 0.86, y - h - 7 * t); ctx.lineTo(x - w / 2 * 0.86, y - h - 7 * t); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, 3 * t); ctx.beginPath(); ctx.moveTo(x - w * 0.3, y - h * 0.8); ctx.lineTo(x + w * 0.3, y - h * 0.2); ctx.moveTo(x + w * 0.3, y - h * 0.8); ctx.lineTo(x - w * 0.3, y - h * 0.2); ctx.stroke();
  }
  ctx.restore();
}
function drawCoin(c, now) {
  const p = proj(c.d), t = p.t, x = sx(c.lane, t), y = p.y - 26 * t, r = 9 * t, sq = Math.abs(Math.cos(now / 240 + c.phase)); if (t < 0.04) return;
  ctx.save(); ctx.globalAlpha = Math.min(1, t * 5); ctx.shadowColor = '#facc15'; ctx.shadowBlur = 10 * t;
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r); g.addColorStop(0, '#fff7c2'); g.addColorStop(.6, '#facc15'); g.addColorStop(1, '#b45309');
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, Math.max(1, r * (0.25 + 0.75 * sq)), r, 0, 0, 7); ctx.fill(); ctx.restore();
}
function drawPickup(pk, now) {
  const p = proj(pk.d), t = p.t, x = sx(pk.lane, t), y = p.y - 30 * t - Math.sin(now / 300) * 4 * t, r = 14 * t; if (t < 0.04) return;
  ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 16 * t; ctx.fillStyle = 'rgba(34,211,238,.25)'; ctx.strokeStyle = '#67e8f9'; ctx.lineWidth = Math.max(1, 2 * t);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - r * 0.6); ctx.lineTo(x + r * 0.5, y - r * 0.3); ctx.lineTo(x + r * 0.4, y + r * 0.3); ctx.lineTo(x, y + r * 0.6); ctx.lineTo(x - r * 0.4, y + r * 0.3); ctx.lineTo(x - r * 0.5, y - r * 0.3); ctx.closePath(); ctx.fillStyle = '#e0faff'; ctx.fill(); ctx.restore();
}
function drawRunner(now) {
  const x = sx(laneF, 1), jp = jumpT > 0 ? Math.sin((1 - jumpT / JUMP_MS) * Math.PI) : 0, lift = jp * 52, y0 = BASE_Y - lift;
  const sliding = slideT > 0, ph = runClock * 14, show = !(invuln > 0 && Math.floor(invuln * 12) % 2);
  shadow(x, BASE_Y + 1, 17 - jp * 6, 0.45 - jp * 0.15);
  if (!show) return;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 10;
  if (sliding) {                                                                 // low slide pose
    ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 8, y0 - 6); ctx.lineTo(x - 15, y0 + 1); ctx.moveTo(x + 8, y0 - 6); ctx.lineTo(x + 15, y0 + 1); ctx.stroke();
    const g = ctx.createLinearGradient(0, y0 - 24, 0, y0 - 6); g.addColorStop(0, '#38bdf8'); g.addColorStop(1, '#2563eb'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - 19, y0 - 24, 38, 18, 8) : ctx.rect(x - 19, y0 - 24, 38, 18); ctx.fill();
    ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); ctx.arc(x, y0 - 29, 8, 0, 7); ctx.fill(); ctx.fillStyle = '#ec4899'; ctx.fillRect(x - 3, y0 - 32, 6, 2.5);
  } else {
    const swing = jp > 0 ? 0 : Math.sin(ph), l1 = jp > 0 ? 7 : Math.max(0, swing) * 10, l2 = jp > 0 ? 7 : Math.max(0, -swing) * 10, bob = jp > 0 ? 0 : Math.abs(Math.sin(ph)) * 2;
    const hipY = y0 - 25 - bob;
    ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 8;                              // legs
    ctx.beginPath(); ctx.moveTo(x - 5, hipY); ctx.lineTo(x - 6 - (jp > 0 ? 3 : 0), y0 - l1); ctx.moveTo(x + 5, hipY); ctx.lineTo(x + 6 + (jp > 0 ? 3 : 0), y0 - l2); ctx.stroke();
    ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x - 6, y0 - l1 - 1); ctx.lineTo(x - 6 - (jp > 0 ? 3 : 0), y0 - l1); ctx.moveTo(x + 6, y0 - l2 - 1); ctx.lineTo(x + 6 + (jp > 0 ? 3 : 0), y0 - l2); ctx.stroke();
    const ay = jp > 0 ? -7 : Math.sin(ph + Math.PI) * 6;                         // arms
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 11, y0 - 48 - bob); ctx.lineTo(x - 17, y0 - 36 - bob + ay); ctx.moveTo(x + 11, y0 - 48 - bob); ctx.lineTo(x + 17, y0 - 36 - bob - ay); ctx.stroke();
    const g = ctx.createLinearGradient(0, y0 - 54, 0, y0 - 24); g.addColorStop(0, '#38bdf8'); g.addColorStop(1, '#2563eb'); ctx.fillStyle = g;   // torso
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - 12, y0 - 54 - bob, 24, 30, 9) : ctx.rect(x - 12, y0 - 54 - bob, 24, 30); ctx.fill();
    ctx.fillStyle = '#ec4899'; ctx.fillRect(x - 2, y0 - 52 - bob, 4, 24);       // jacket stripe
    ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); ctx.arc(x, y0 - 63 - bob, 9, 0, 7); ctx.fill();                                  // helmet seen from behind
    ctx.fillStyle = '#22d3ee'; ctx.fillRect(x - 5, y0 - 65 - bob, 10, 2.5); ctx.fillStyle = '#f472b6'; ctx.fillRect(x - 2, y0 - 72 - bob, 4, 5);
  }
  ctx.restore();
  if (shield) { ctx.save(); const pulse = 1 + Math.sin(now / 160) * 0.05; ctx.strokeStyle = 'rgba(103,232,249,.9)'; ctx.fillStyle = 'rgba(34,211,238,.14)'; ctx.lineWidth = 2; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(x, y0 - 34, 36 * pulse, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
}
function draw(now) {
  ctx.fillStyle = '#08031a'; ctx.fillRect(0, 0, W, H);
  ctx.save(); if (shake > 0.4 && !reduce) ctx.translate(rand(-shake, shake) / 2, rand(-shake, shake) / 2);
  drawSky(now); drawGround(); drawSpeedLines();
  const far = [], near = [];
  obstacles.forEach(o => (o.d > 0 ? far : near).push({ d: o.d, f: () => drawObstacle(o) }));
  coinsList.forEach(c => (c.d > 0 ? far : near).push({ d: c.d, f: () => drawCoin(c, now) }));
  pickups.forEach(p => (p.d > 0 ? far : near).push({ d: p.d, f: () => drawPickup(p, now) }));
  far.sort((a, b) => b.d - a.d).forEach(e => e.f());
  if (state !== 'idle') drawRunner(now);
  near.sort((a, b) => b.d - a.d).forEach(e => e.f());                          // things already behind the runner's line draw on top
  particles.forEach(p => { ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color; ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3); }); ctx.globalAlpha = 1;
  ctx.restore();
  if (flash > 0.02) { ctx.fillStyle = 'rgba(255,255,255,' + flash * 0.5 + ')'; ctx.fillRect(0, 0, W, H); }
}

// One permanent loop: simulate while playing (or as the idle demo), otherwise only draw
function frame(ts) {
  requestAnimationFrame(frame);
  if (!lastFrame) lastFrame = ts;
  const dt = Math.min((ts - lastFrame) / 1000, 0.05); lastFrame = ts;
  if (state === 'play' || state === 'idle') update(dt);
  if (state !== 'paused') moveVisuals(dt);
  draw(ts);
}

// ── State changes ──
function startGame() {
  audio(); resetState(); state = 'play'; lastFrame = 0;
  ['start-overlay', 'pause-overlay', 'gameover-overlay'].forEach(id => $(id).classList.add('hidden'));
}
function pauseGame() { if (state !== 'play') return; state = 'paused'; $('pause-overlay').classList.remove('hidden'); $('btn-pause').setAttribute('aria-label', 'Resume'); }
function resumeGame() { if (state !== 'paused') return; state = 'play'; lastFrame = 0; $('pause-overlay').classList.add('hidden'); $('btn-pause').setAttribute('aria-label', 'Pause'); }
function endGame() {
  state = 'over'; score = Math.floor(distance / 10) + coinCount * 10; syncHud();
  const best = getBest();
  $('final-score').textContent = score.toLocaleString('en-US');
  $('final-detail').textContent = Math.floor(distance / 10) + ' m · ' + coinCount + ' coins';
  if (score > best) { setBest(score); $('best-score').textContent = score; $('best-msg').textContent = '🏆 New high score!'; } else $('best-msg').textContent = 'Best ' + best;
  setTimeout(() => { if (state === 'over') $('gameover-overlay').classList.remove('hidden'); }, 450);   // let the crash play out first
}

// ── Input ──
const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown'];
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (SCROLL_KEYS.indexOf(e.code) !== -1) e.preventDefault();                       // arrows and Space must never scroll the page
  if (e.repeat) return;
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') moveLane(-1);
  else if (e.code === 'ArrowRight' || e.code === 'KeyD') moveLane(1);
  else if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') { if (state === 'idle' || state === 'over') startGame(); else if (state === 'paused') resumeGame(); else doJump(); }
  else if (e.code === 'ArrowDown' || e.code === 'KeyS') doSlide();
  else if (e.code === 'KeyP' || e.code === 'Escape') state === 'play' ? pauseGame() : resumeGame();
  else if (e.code === 'KeyM') toggleSound();
  else if (e.code === 'Enter' && (state === 'idle' || state === 'over')) startGame();
});
window.addEventListener('blur', pauseGame);
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });

function tap(id, fn) { const el = $(id); el.addEventListener('pointerdown', e => { e.preventDefault(); fn(); }); el.addEventListener('contextmenu', e => e.preventDefault()); }
tap('btn-left', () => moveLane(-1)); tap('btn-right', () => moveLane(1)); tap('btn-jump', doJump); tap('btn-slide', doSlide);

// Swipe on the track: left / right = lane, up = jump, down = slide, a short tap = jump
let sw = null;
const wrapEl = document.querySelector('.canvas-wrap');
wrapEl.addEventListener('pointerdown', e => { if (e.target.closest('.overlay,.hud') && state !== 'play') return; sw = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
wrapEl.addEventListener('pointerup', e => {
  if (!sw || sw.id !== e.pointerId || state !== 'play') { sw = null; return; }
  const dx = e.clientX - sw.x, dy = e.clientY - sw.y; sw = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) doJump();
  else if (Math.abs(dx) > Math.abs(dy)) moveLane(dx > 0 ? 1 : -1);
  else dy < 0 ? doJump() : doSlide();
});

function toggleSound() { muted = !muted; try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {} syncSound(); if (!muted) tone(660, 880, 0.08, 'triangle', 0.05); }
function syncSound() { const b = $('btn-sound'); b.textContent = muted ? '🔇' : '🔊'; b.setAttribute('aria-pressed', String(!muted)); b.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on'); }
$('btn-sound').addEventListener('click', toggleSound);
$('btn-pause').addEventListener('click', () => { state === 'play' ? pauseGame() : resumeGame(); });
$('btn-start').addEventListener('click', startGame); $('btn-retry').addEventListener('click', startGame); $('btn-resume').addEventListener('click', resumeGame);

$('best-score').textContent = getBest();
syncSound(); makeScenery(); resetState();
requestAnimationFrame(frame);`,

  seo: {
    title: 'Lane Runner Endless Game — HTML Canvas Neon 3D Runner',
    description: 'Neon pseudo-3D endless runner in HTML5 canvas and JS: lane switching, jump and slide, coins, shields, swipe and tap controls, sound and a saved high score.',
    about: {
      title: 'Lane Runner — A Pseudo-3D Endless Runner with Perspective Track, Coins, Shields and Swipe Controls',
      description: `Endless runners are the most touch-native game genre there is: the whole game is a handful of instant decisions — left, right, jump, slide — against an obstacle stream that never stops speeding up. This snippet builds a complete, polished one on a single HTML5 \`<canvas>\`: a synthwave track in perspective, a runner with a real run cycle, three obstacle types that each demand a different move, coins, a shield power-up, swipe and tap controls, synthesized sound, pause and a saved high score.

**Pseudo-3D from one formula**

There is no 3D engine. Every object has a distance \`d\` ahead of the runner, and one function turns it into a scale: \`t = FOCAL / (FOCAL + d)\`. At the runner \`t\` is 1; far away it shrinks toward 0 at the horizon. Screen y is \`HORIZON + (BASE_Y − HORIZON) × t\` and screen x is the lane offset multiplied by \`t\`, so lanes converge on the vanishing point and objects accelerate toward you naturally. The track is drawn as scrolling quads between depth slices, alternating two shades with dashed lane markers, and a magenta grid, a glowing edge, a retro striped sun and a parallax skyline complete the scene.

**Three obstacles, three verbs**

A green **barrier** must be jumped, an amber overhead **gate** must be slid under, and red **blocks** fill every lane but one, so you must switch lanes. Some rows span all three lanes and force a jump or slide. Collisions are simple depth checks: an obstacle only matters when its \`d\` is within about ±1.3 of the runner and its lane is within 0.55 of the runner's smoothed lane position. Jump and slide are timed windows, and sliding in mid-air cancels the jump so the runner drops immediately, which makes the controls feel responsive.

**Controls built for thumbs**

Every action is a one-shot event, not a held key. The on-screen buttons fire on \`pointerdown\`, the keyboard uses ← → ↑ ↓ plus WASD and Space, and the track itself accepts swipes: a horizontal swipe changes lane, up jumps, down slides, and a short tap jumps. The lane is an integer used for logic while the drawn position eases toward it, so lane changes slide instead of snapping. Arrow and Space keys call \`preventDefault\` so the page never scrolls while you play.

**Coins, shield and fair spawning**

Rows are chosen from patterns: single obstacles with coins in the free lanes, double blocks with coins in the open lane, full-width walls, pure coin lines and an occasional shield. The gap between rows is tied to speed (\`speed × 0.62\` plus a little randomness), so there is always time to react at high speed. A shield absorbs one hit, gives 1.3 seconds of blink-invulnerability and pops with a particle ring. Score is distance in metres plus ten per coin, and speed ramps smoothly with distance up to a cap, shown as a bar in the HUD.

**An autopilot demo behind the title screen**

While you are on the start screen the game plays itself: a few lines of autopilot look ahead at the next obstacle in the current lane, jump a barrier, slide a gate or pick the nearest free lane for a block. The same update code runs with crashes disabled, so the title screen shows a live scene instead of a static image.

**Juice, sound and accessibility**

Coins spin by squashing their width with a cosine, speed lines streak from the vanishing point as you accelerate, crashes flash, shake and burst into particles, and dust and a shadow ground the runner. Sound is synthesized with the Web Audio API (jump, slide, lane tick, coin pitch that rises with your streak, shield, crash) with a saved mute toggle, created on the first click. The canvas is scaled by \`devicePixelRatio\` for sharp lines, the game pauses on blur or a hidden tab, and \`prefers-reduced-motion\` disables screen shake. For related canvas games see the [Dodge the falling blocks game](/ui-snippets/dodge-the-blocks-game/) and the [Frog crossing game](/ui-snippets/frog-crossing-game/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start running', text: 'Click "Run" (or press Enter, Space or ↑). The title screen already shows an autopilot demo of the game. The runner auto-advances, you only steer and dodge.' },
        { title: 'Switch lanes', text: 'Press ← → (or A and D), tap ◀ ▶, or swipe left or right on the track. The runner eases smoothly into the new lane.' },
        { title: 'Jump the green barriers', text: 'Press ↑, Space or JUMP, tap the track or swipe up. Timing matters: the jump is a fixed window, so clear the barrier before you land.' },
        { title: 'Slide under the amber gates', text: 'Press ↓ or S, tap SLIDE, or swipe down. If you are in the air a slide drops you straight down, which helps you chain moves quickly.' },
        { title: 'Dodge blocks, grab coins and shields', text: 'Red blocks fill all lanes but one. Collect coins for 10 points each and the cyan shield to survive one crash. Your coin streak raises the pitch of the pickup sound.' },
        { title: 'Beat your best', text: 'Score is metres plus coins. The speed bar in the corner fills as you accelerate. P or Esc pauses, M mutes, and your best is saved in localStorage under lane-runner-best.' },
      ],
    },
    features: [
      { title: 'Perspective track from one formula', text: 'Depth d becomes scale t = FOCAL / (FOCAL + d), which drives screen position and size, so lanes converge on a vanishing point with no 3D engine.' },
      { title: 'Synthwave scenery', text: 'Scrolling banded track, perspective grid, glowing edges, a striped retro sun, twinkling stars, a parallax skyline and speed lines.' },
      { title: 'Animated runner character', text: 'A run cycle with swinging legs and arms, a tucked jump pose, a low slide pose, shadow, dust and a shield bubble.' },
      { title: 'Three obstacles plus walls', text: 'Jump a barrier, slide under a gate, change lane around blocks, or jump or slide a full-width wall.' },
      { title: 'Coins and shield power-up', text: 'Spinning coins with a pitch-rising streak sound and a shield that absorbs one crash with blink invulnerability.' },
      { title: 'Swipe, tap, keys and buttons', text: 'Every action is a one-shot event: on-screen buttons, swipe gestures, a tap-to-jump and keyboard, with scrolling keys blocked.' },
      { title: 'Autopilot title screen', text: 'The idle state runs the real game with a tiny autopilot so the start screen is a live demo.' },
      { title: 'Sound, pause and saved best', text: 'Web Audio effects with a saved mute toggle, auto-pause on blur, crisp devicePixelRatio rendering and a localStorage high score.' },
    ],
    useCases: [
      { icon: 'APP', title: 'Discrete-tap touch control template', desc: 'Lane nudges plus timed jump and slide, fired on pointerdown and swipes, are a reusable pattern for any endless runner or rhythm-style touch game.' },
      { icon: 'FORM', title: 'Instantly playable casual game', desc: 'An endless runner is learnable in seconds and endlessly replayable, a strong embeddable demo for a games portal, blog or app landing page. For a calmer one try the [Frog crossing game](/ui-snippets/frog-crossing-game/).' },
      { icon: 'FLOW', title: 'Engaging 404 or loading distraction', desc: 'With no network dependency it starts instantly, a lively filler for an error page, like the [Dodge the falling blocks game](/ui-snippets/dodge-the-blocks-game/).' },
      { icon: 'LEARN', title: 'Teaching pseudo-3D projection', desc: 'The single t = FOCAL / (FOCAL + d) formula, depth-sorted drawing and scrolling bands are a compact lesson in how classic arcade racers fake 3D.' },
      { icon: 'CODE', title: 'Starting point for a fuller runner', desc: 'The row spawner, speed curve and autopilot generalise to magnets, missions, character skins, curves and bosses without touching the loop.' },
      { icon: 'DESIGN', title: 'Canvas effects reference', desc: 'Glow with shadowBlur, particle bursts, screen shake, parallax and devicePixelRatio scaling are reusable in any 2D canvas scene.' },
    ],
    faqs: [
      { q: 'How is the 3D effect made without WebGL?', a: 'Every object stores its distance ahead of the runner. The scale is t = FOCAL / (FOCAL + d), screen y is HORIZON + (BASE_Y - HORIZON) * t and screen x is the lane offset times t. Objects therefore shrink toward a vanishing point and speed up as they approach, exactly like old arcade racers.' },
      { q: 'Why are all the controls single taps instead of press-and-hold?', a: 'Every action is instantaneous: a lane change nudges an index, and jump and slide start fixed-length timers. Nothing depends on a key staying pressed, so buttons, swipes and keys all share the same handlers.' },
      { q: 'How does the runner move smoothly between lanes?', a: 'The lane is an integer used for collision, and the drawn lane position eases toward it with laneF += (lane - laneF) * k each frame. Collision uses the smoothed value, so a runner halfway between lanes is only hit by an obstacle that is close enough.' },
      { q: 'Why can I slide in mid-air?', a: 'Pressing slide while jumping cancels the jump so the runner drops immediately, then starts the slide. It makes the game more responsive than forcing the player to wait until landing.' },
      { q: 'How does the difficulty increase and stay fair?', a: 'Speed rises with distance up to a cap, and the gap between obstacle rows is set from the current speed, so the time to react never collapses. Rows always leave at least one safe move.' },
      { q: 'How does the title-screen demo work?', a: 'In the idle state the normal update runs with crashes and scoring disabled and a small autopilot looks at the nearest obstacle in the runner\'s lane. It jumps barriers, slides gates and steers to a free lane around blocks.' },
      { q: 'Does my high score survive a reload?', a: 'Yes. The best score is stored in localStorage under lane-runner-best and read on load, wrapped in try/catch so the game still runs where storage is blocked.' },
      { q: 'How do I use this runner in React, Vue, or Angular?', a: 'Render the canvas and overlays, create the context in a mount effect and run the requestAnimationFrame loop there, keeping game state in refs. Cancel the loop and remove the key, pointer and visibility listeners in the cleanup. Use the export buttons on this page for the markup and styles.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain how one formula, t = FOCAL / (FOCAL + d), produces the perspective track, why the gap between obstacle rows scales with speed, or how the autopilot picks a free lane around a block row. It is a strong base to extend: ask for a magnet or double-coin power-up, daily missions, curved road sections, character skins, a boss wall every 1000 metres, or an online leaderboard. You could also ask it to add gamepad support, replace the drawn runner with a sprite sheet, or port the loop into a React component using useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a polished, mobile-friendly pseudo-3D endless runner on an HTML5 canvas, as ONE self-contained HTML file (inline CSS and JS, no frameworks, no asset files). Dark neon synthwave look.

CAMERA AND TRACK
- Logic in a 360x480 space, canvas backing store scaled by devicePixelRatio (max 2). Pseudo-3D: every object has a distance d ahead of the runner; t = FOCAL / (FOCAL + d); screen y = HORIZON + (BASE_Y - HORIZON) * t; screen x = centre + (lane - 1) * SPACING * t. Three lanes converge on a vanishing point.
- Draw: a sky gradient with twinkling stars, a retro striped sun and a parallax skyline; a track made of scrolling quads between depth slices (two alternating shades, dashed lane markers on every other slice); a magenta perspective grid outside the track; glowing cyan and magenta track edges; and speed lines radiating from the vanishing point that grow with speed.

GAMEPLAY
- Fixed pool of one-shot actions: moveLane(-1/+1), jump (about 640ms window, clears barriers only near the top of the arc), slide (about 560ms). Sliding during a jump cancels the jump. Lane is an integer for logic, with a smoothed float used for drawing and collisions.
- Obstacles: a low green barrier (jump), an overhead amber gate with posts (slide), a tall red block with a lit top face and X mark (change lane). Row patterns: single barrier or gate with coins in other lanes; two blocks leaving one open lane with coins in it; a full-width wall of barriers or gates; coin lines; and an occasional cyan shield pickup. Row gap = max(30, speed * 0.62) + random.
- Speed = min(106, 34 + distance * 0.012). Collision when an obstacle's d is within +-1.3 and its lane is within 0.55 of the runner's lane. A shield absorbs one hit (pop particles, 1.3s blinking invulnerability). Coins give 10 points, with a streak that raises the pickup pitch. Score = metres + 10 per coin. Best score in localStorage with try/catch.
- Draw order far to near; objects behind the runner's line draw over it. Obstacles fade in with distance and have contact shadows.
- The runner is drawn from behind with a run cycle (alternating legs and arms), a tucked jump pose, a low slide pose, a shadow, a helmet with a glowing visor and a shield bubble. Coins spin by scaling their width with |cos|.
- Crashes: screen shake (off for prefers-reduced-motion), a white flash and particle bursts, then the game-over screen after about 450ms.

STATES AND INPUT
- Idle: the real game runs as a demo with a small autopilot (look ahead at the nearest obstacle in the runner's lane: jump barriers, slide gates, steer to the nearest free lane for blocks) with crashes and scoring disabled, behind a start overlay. Then play, paused (P, Esc, window blur, hidden tab) and game over (score, metres, coins, best).
- Controls: arrow keys or WASD and Space (preventDefault on arrows and Space so the page never scrolls), on-screen buttons firing on pointerdown, swipe gestures on the canvas (left/right lane, up jump, down slide, short tap jump). M toggles sound.
- Sound synthesized with the Web Audio API (no files): jump sweep, slide noise, lane tick, coin ping with rising pitch, shield sweep, crash noise plus saw drop, shield pop. AudioContext created on the first click; mute saved to localStorage.

Use one permanent requestAnimationFrame loop with delta-time scaling. HUD: score, coin count and a speed bar. Return only the finished single HTML file.`,
    },
  },
};

export default laneRunnerGame;
