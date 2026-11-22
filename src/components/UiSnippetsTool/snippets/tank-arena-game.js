const tankArenaGame = {
  id: 'tank-arena-game',
  title: 'Tank Arena Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="logo" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="14" height="7" rx="2"/><path d="M7 12V9h6v3M13 10.5h8"/></svg></span>
      <div>
        <h2>Tank Arena</h2>
        <p class="tagline">Top-down tank shooter</p>
      </div>
    </div>
    <div class="head-right">
      <span class="badge">Wave <b id="wave">1</b></span>
      <span class="badge">Best <b id="best-score">0</b></span>
      <button class="icon-btn" id="btn-sound" type="button" aria-pressed="true" aria-label="Sound on" title="Sound (M)">🔊</button>
      <button class="icon-btn" id="btn-pause" type="button" aria-label="Pause" title="Pause (P)">❚❚</button>
    </div>
  </div>

  <div class="canvas-wrap" id="wrap">
    <canvas id="game-canvas" width="400" height="400" aria-label="Tank Arena game canvas"></canvas>
    <div class="hud" aria-live="off">
      <span class="hud-score"><small>SCORE</small><b id="hud-score">0</b></span>
      <span class="hud-combo" id="hud-combo"></span>
      <span class="hud-hp" id="hud-hp" title="Armour"></span>
    </div>
    <div class="hud-power" id="hud-power"></div>
    <div class="banner" id="banner" aria-hidden="true"></div>

    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-kicker">Top-down shooter</p>
        <p class="overlay-title">Tank <span>Arena</span></p>
        <p class="overlay-sub">Hunt down enemy tanks. Your shells <b>ricochet</b> once off steel, and so do theirs. Crack the bricks, grab power-ups, survive the boss.</p>
        <ul class="keys"><li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> drive</li><li>mouse aim · click fire</li><li><kbd>Space</kbd> fire</li><li>or twin sticks</li></ul>
        <button class="btn btn-primary" id="btn-start" type="button">Deploy</button>
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
        <p class="overlay-title over">Destroyed</p>
        <p class="overlay-score" id="final-score">0</p>
        <p class="overlay-sub" id="final-detail"></p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry" type="button">Redeploy</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="stick-box"><div class="stick" id="stick-move" aria-label="Move stick"><i class="knob"></i></div><span>MOVE</span></div>
    <div class="stick-box"><div class="stick aim" id="stick-aim" aria-label="Aim and fire stick"><i class="knob"></i></div><span>AIM · FIRE</span></div>
  </div>
  <p class="hint-text">Keys: WASD / arrows drive · mouse aim · click or Space fire · P pause · M sound</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:radial-gradient(700px 420px at 50% 0%,rgba(249,115,22,.22),transparent 70%),#0b0d12;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;color:#e8eaf0}
.game-card{width:100%;max-width:440px;background:linear-gradient(180deg,#161a24,#0f121a);border-radius:22px;border:1px solid #2a3142;box-shadow:0 24px 60px -24px rgba(249,115,22,.4);padding:16px;user-select:none;-webkit-user-select:none}

.game-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px;flex-wrap:wrap}
.game-title{display:flex;align-items:center;gap:10px}
.logo{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;color:#fdba74;background:linear-gradient(135deg,rgba(249,115,22,.3),rgba(56,189,248,.16));border:1px solid rgba(253,186,116,.4);box-shadow:0 0 16px rgba(249,115,22,.28)}
.game-title h2{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.01em}
.tagline{font-size:11px;color:#8590a8;margin-top:1px}
.head-right{display:flex;align-items:center;gap:6px}
.badge{font-size:11px;font-weight:700;color:#aeb7cc;background:#1b2130;border:1px solid #2a3142;padding:5px 10px;border-radius:999px;white-space:nowrap}
.badge b{color:#fff;font-variant-numeric:tabular-nums}
.icon-btn{width:30px;height:28px;border-radius:9px;border:1px solid #2a3142;background:#1b2130;color:#cbd2e4;font-size:12px;cursor:pointer;transition:background .15s,border-color .15s}
.icon-btn:hover{background:#262e42;border-color:#4c5a7a}
.icon-btn[aria-pressed="false"]{opacity:.55}
.icon-btn:focus-visible,.btn:focus-visible{outline:2px solid #fdba74;outline-offset:2px}

.canvas-wrap{position:relative;border-radius:16px;overflow:hidden;line-height:0;touch-action:none;background:#2b2a26;border:1px solid #3a4258;box-shadow:0 0 0 1px rgba(0,0,0,.6),0 0 30px -10px rgba(249,115,22,.45);cursor:crosshair}
canvas{display:block;width:100%;height:auto}
.canvas-wrap::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 58%,rgba(0,0,0,.5) 100%)}
.hud{position:absolute;inset:10px 14px auto 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;pointer-events:none;z-index:2;line-height:1.2}
.hud-score{display:flex;flex-direction:column}
.hud-score small{font-size:9px;font-weight:800;letter-spacing:.14em;color:#fdba74}
.hud-score b{font-size:22px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 12px rgba(249,115,22,.9)}
.hud-combo{font-size:15px;font-weight:900;color:#fde047;text-shadow:0 0 10px rgba(250,204,21,.8);min-width:40px;text-align:center;margin-top:3px}
.hud-combo.pop{animation:comboPop .25s ease-out}
@keyframes comboPop{from{transform:scale(1.6)}to{transform:scale(1)}}
.hud-hp{display:flex;gap:4px;margin-top:5px}
.hud-hp i{width:14px;height:8px;border-radius:2px;background:#22d3ee;box-shadow:0 0 6px rgba(34,211,238,.8)}
.hud-hp i.off{background:rgba(255,255,255,.18);box-shadow:none}
.hud-hp.low i:not(.off){background:#f43f5e;box-shadow:0 0 6px rgba(244,63,94,.9)}
.hud-power{position:absolute;left:14px;bottom:10px;display:flex;gap:6px;z-index:2;pointer-events:none;line-height:1}
.hud-power span{font-size:10px;font-weight:800;letter-spacing:.06em;padding:4px 8px;border-radius:999px;background:rgba(0,0,0,.55);border:1px solid currentColor}
.banner{position:absolute;left:0;right:0;top:36%;text-align:center;font-size:26px;font-weight:900;letter-spacing:.28em;text-indent:.28em;color:#fff;text-shadow:0 0 18px #f97316;opacity:0;pointer-events:none;z-index:2}
.banner.show{animation:bannerIn 1.6s ease-out both}
@keyframes bannerIn{0%{opacity:0;transform:scale(.7)}18%{opacity:1;transform:scale(1)}70%{opacity:1}100%{opacity:0;transform:scale(1.15)}}

.overlay{position:absolute;inset:0;background:rgba(10,12,18,.66);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:20px;line-height:1.4;z-index:3;cursor:default}
.overlay.hidden{display:none}
.overlay-card{text-align:center;max-width:310px}
.overlay-kicker{font-size:10.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#fdba74;margin-bottom:6px}
.overlay-title{font-size:32px;font-weight:900;letter-spacing:-.02em;color:#fff;margin-bottom:8px}
.overlay-title span{background:linear-gradient(90deg,#fb923c,#38bdf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.overlay-title.over{color:#fb7185;text-shadow:0 0 22px rgba(251,113,133,.6)}
.overlay-sub{font-size:12.5px;color:#c5ccdd;margin:0 auto}
.overlay-sub b{color:#fff}
.overlay-score{font-size:46px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 24px rgba(249,115,22,.8);line-height:1.1}
.overlay-best{font-size:12.5px;color:#fbbf24;font-weight:800;margin-top:6px;min-height:18px}
.keys{list-style:none;display:flex;flex-wrap:wrap;gap:6px 12px;justify-content:center;margin:12px 0 0;font-size:11.5px;color:#9aa4bd}
.keys li{display:flex;align-items:center;gap:3px}
kbd{font:700 11px system-ui;color:#eef1f8;background:#232b3d;border:1px solid #3f4c6b;border-bottom-width:2px;border-radius:5px;padding:1px 6px}
.btn{padding:11px 34px;font-size:14px;font-weight:800;border-radius:12px;cursor:pointer;font-family:inherit;transition:transform .12s,box-shadow .2s;border:none;margin-top:16px}
.btn-primary{background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;box-shadow:0 6px 22px -6px rgba(249,115,22,.9)}
.btn-primary:hover{transform:translateY(-1px)}

.controls{display:flex;align-items:center;justify-content:space-around;gap:10px;margin-top:14px}
.stick-box{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:10px;font-weight:800;letter-spacing:.12em;color:#6f7a96}
.stick{position:relative;width:96px;height:96px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#232b3d,#141925);border:1px solid #34405c;box-shadow:inset 0 0 18px rgba(0,0,0,.6);touch-action:none;cursor:grab}
.stick.aim{border-color:#6b3a1f;box-shadow:inset 0 0 18px rgba(0,0,0,.6),0 0 16px -6px rgba(249,115,22,.6)}
.knob{position:absolute;left:50%;top:50%;width:42px;height:42px;margin:-21px 0 0 -21px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7dd3fc,#0284c7);box-shadow:0 4px 10px rgba(0,0,0,.5);pointer-events:none;transition:transform .08s}
.stick.aim .knob{background:radial-gradient(circle at 35% 30%,#fdba74,#c2410c)}
.stick.active .knob{transition:none}
.hint-text{font-size:11px;color:#6b7590;text-align:center;margin-top:10px}

@media(max-width:400px){.game-card{padding:12px}.overlay-title{font-size:26px}.badge{display:none}}
@media(prefers-reduced-motion:reduce){.banner.show,.hud-combo.pop{animation:none}.banner.show{opacity:1}}`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = 400, H = 400, TS = 25, N = 16;                    // 16 x 16 tiles of 25px
const DPR = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
const ground = document.createElement('canvas'); ground.width = W * DPR; ground.height = H * DPR;
const gx = ground.getContext('2d'); gx.setTransform(DPR, 0, 0, DPR, 0, 0);           // persistent layer: floor, tracks, scorch marks, rubble

const BEST_KEY = 'tank-arena-best', MUTE_KEY = 'tank-arena-muted';
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = id => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function angDiff(a, b) { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; }

// Enemy recipes: radius, hits to kill, speed (px/s), reload (s), shell speed, preferred range, points
const TYPES = {
  scout:  { r: 8,  hp: 1,  speed: 80, reload: 1.5, bullet: 250, range: 105, pts: 100,  body: '#34d399', dark: '#047857' },
  gunner: { r: 9,  hp: 2,  speed: 58, reload: 1.4, bullet: 270, range: 150, pts: 150,  body: '#fb923c', dark: '#c2410c' },
  heavy:  { r: 11, hp: 5,  speed: 40, reload: 2.2, bullet: 250, range: 175, pts: 300,  body: '#a78bfa', dark: '#6d28d9' },
  boss:   { r: 16, hp: 26, speed: 32, reload: 1.1, bullet: 240, range: 170, pts: 1500, body: '#fb7185', dark: '#be123c' },
};
const FLOORS = [['#4b4234', '#40382b'], ['#3a404c', '#2f3540'], ['#30423a', '#273730'], ['#454d5c', '#394150']];   // desert, concrete, moss, snow

let state = 'idle';                                         // idle | play | paused | over
let grid, hpGrid, player, enemies, bullets, parts, pups, popups, spawnQ, spawnT, spawns, flow, flowT;
let wave = 1, score = 0, kills = 0, shake = 0, flash = 0, combo = { n: 0, t: 0 }, lastFrame = 0, waveClear = 0, newBest = false;
const input = { up: false, down: false, left: false, right: false, fire: false, mouse: false, mx: 0, my: 0, mouseSeen: false, move: { x: 0, y: 0 }, aim: { x: 0, y: 0, on: false } };

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

// ── Sound: small WebAudio synth, created on the first click ──
let actx = null, muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch (e) {}
function audio() { if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (actx && actx.state === 'suspended') actx.resume(); return actx; }
function tone(f0, f1, dur, type, vol) {
  if (muted) return; const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur);
}
function noise(dur, vol, cutoff) {
  if (muted) return; const a = audio(); if (!a) return;
  const len = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  s.buffer = buf; f.type = 'lowpass'; f.frequency.value = cutoff; g.gain.value = vol; s.connect(f); f.connect(g); g.connect(a.destination); s.start();
}
const sfx = {
  shoot: () => { noise(0.1, 0.07, 1800); tone(240, 90, 0.12, 'square', 0.04); },
  eshoot: () => { noise(0.1, 0.04, 1200); tone(160, 70, 0.12, 'square', 0.025); },
  bounce: () => tone(1400, 900, 0.05, 'triangle', 0.03),
  brick: () => noise(0.14, 0.07, 1500),
  hit: () => { tone(500, 200, 0.08, 'square', 0.04); },
  boom: big => { noise(big ? 0.7 : 0.4, big ? 0.16 : 0.11, big ? 600 : 900); tone(big ? 120 : 160, 30, big ? 0.6 : 0.35, 'sawtooth', 0.06); },
  hurt: () => { noise(0.3, 0.12, 700); tone(300, 60, 0.3, 'sawtooth', 0.07); },
  pickup: () => { tone(620, 1240, 0.14, 'triangle', 0.06); },
  wave: () => { tone(330, 495, 0.12, 'triangle', 0.06); setTimeout(() => tone(495, 740, 0.18, 'triangle', 0.06), 120); },
};

// ── Arena: a tile grid (0 empty, 1 steel, 2 brick, 3 crate), mirrored left-right so it is fair ──
const idx = (c, r) => r * N + c;
function tileVal(x, y) { const c = Math.floor(x / TS), r = Math.floor(y / TS); return c < 0 || r < 0 || c >= N || r >= N ? 1 : grid[idx(c, r)]; }
function blocked(x, y, rad) {
  for (let c = Math.floor((x - rad) / TS); c <= Math.floor((x + rad) / TS); c++) for (let r = Math.floor((y - rad) / TS); r <= Math.floor((y + rad) / TS); r++) {
    if (c < 0 || r < 0 || c >= N || r >= N) return true;
    if (!grid[idx(c, r)]) continue;
    const cx = clamp(x, c * TS, c * TS + TS), cy = clamp(y, r * TS, r * TS + TS);
    if ((x - cx) * (x - cx) + (y - cy) * (y - cy) < rad * rad) return true;
  }
  return false;
}
function los(x0, y0, x1, y1) { const d = Math.hypot(x1 - x0, y1 - y0), n = Math.ceil(d / 5); for (let i = 1; i < n; i++) if (tileVal(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n)) return false; return true; }
function rayEnd(x, y, a, max) { const dx = Math.cos(a), dy = Math.sin(a); let d = 0; while (d < max && !tileVal(x + dx * d, y + dy * d)) d += 3; return { x: x + dx * d, y: y + dy * d }; }

function reachable(from, targets) {                       // flood fill treating only steel as blocked (bricks can be shot away)
  const seen = new Uint8Array(N * N), q = [from]; seen[from] = 1;
  while (q.length) { const k = q.pop(), c = k % N, r = (k / N) | 0; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => { const nc = c + d[0], nr = r + d[1]; if (nc < 0 || nr < 0 || nc >= N || nr >= N) return; const j = idx(nc, nr); if (!seen[j] && grid[j] !== 1) { seen[j] = 1; q.push(j); } }); }
  return targets.every(t => seen[t]);
}
function genLayout() {
  spawns = [[2, 2], [13, 2], [7, 2], [8, 2]].map(s => ({ x: s[0] * TS + TS / 2, y: s[1] * TS + TS / 2, busy: 0 }));
  const free = (c, r) => !(r <= 3) && !(r >= 11 && c >= 4 && c <= 11);                  // keep spawn rows and the player's start clear
  for (let attempt = 0; attempt < 30; attempt++) {
    grid = new Uint8Array(N * N); hpGrid = new Uint8Array(N * N);
    for (let i = 0; i < N; i++) { grid[idx(i, 0)] = grid[idx(i, N - 1)] = grid[idx(0, i)] = grid[idx(N - 1, i)] = 1; }
    const put = (c, r, v) => { if (c < 1 || r < 1 || c > N / 2 - 1 || r > N - 2 || !free(c, r)) return; [c, N - 1 - c].forEach(cc => { grid[idx(cc, r)] = v; hpGrid[idx(cc, r)] = v === 2 ? 3 : v === 3 ? 1 : 0; }); };
    const steel = Math.min(2 + Math.floor(wave / 3), 5), brick = 5, crate = 3;
    for (let i = 0; i < steel; i++) { const c = 2 + ((Math.random() * 5) | 0), r = 4 + ((Math.random() * 8) | 0), h = Math.random() < 0.5; put(c, r, 1); put(h ? c + 1 : c, h ? r : r + 1, 1); }
    for (let i = 0; i < brick; i++) { const c = 1 + ((Math.random() * 6) | 0), r = 4 + ((Math.random() * 8) | 0), h = Math.random() < 0.5; for (let k = 0; k < 3; k++) if (grid[idx(h ? c + k : c, h ? r : r + k)] === 0) put(h ? c + k : c, h ? r : r + k, 2); }
    for (let i = 0; i < crate; i++) put(1 + ((Math.random() * 6) | 0), 4 + ((Math.random() * 8) | 0), 3);
    if (reachable(idx(8, 13), spawns.map(s => idx(Math.floor(s.x / TS), Math.floor(s.y / TS))))) break;
  }
  paintFloor();
}
function paintFloor() {
  const pal = FLOORS[Math.floor((wave - 1) / 3) % FLOORS.length];
  gx.clearRect(0, 0, W, H);
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { gx.fillStyle = (r + c) % 2 ? pal[0] : pal[1]; gx.fillRect(c * TS, r * TS, TS, TS); }
  gx.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 0; i < 160; i++) gx.fillRect(rand(0, W), rand(0, H), rand(1, 3), rand(1, 3));
  gx.fillStyle = 'rgba(255,255,255,.04)'; for (let i = 0; i < 100; i++) gx.fillRect(rand(0, W), rand(0, H), rand(1, 2), rand(1, 2));
}

// ── Tanks ──
function makeTank(x, y, type) {
  const T = type ? TYPES[type] : null;
  return { x, y, type: type || 'player', r: T ? T.r : 9, hp: T ? T.hp : 5, maxHp: T ? T.hp : 5, hull: -Math.PI / 2, turret: -Math.PI / 2, speed: T ? T.speed : 108,
    cd: T ? rand(0.6, T.reload) : 0, flash: 0, recoil: 0, tread: 0, mark: 0, spawn: 0, strafe: Math.random() < 0.5 ? 1 : -1, strafeT: rand(1, 3), burst: 0, burstT: 0, stuck: 0, lx: x, ly: y, px: x, py: y, jog: 0, jogA: 0 };
}
function moveTank(t, dx, dy) {
  const nx = t.x + dx, ny = t.y + dy;
  if (!blocked(nx, t.y, t.r)) t.x = nx;
  if (!blocked(t.x, ny, t.r)) t.y = ny;
}
function separate(list) {
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const a = list[i], b = list[j], d = Math.hypot(b.x - a.x, b.y - a.y), min = a.r + b.r;
    if (d < min && d > 0.01) { const push = (min - d) / 2, ux = (b.x - a.x) / d, uy = (b.y - a.y) / d; moveTank(a, -ux * push, -uy * push); moveTank(b, ux * push, uy * push); }
  }
}
function trackMarks(t, dist) {                              // tracks are painted onto the persistent ground layer
  t.mark += dist; if (t.mark < 7) return; t.mark = 0;
  gx.save(); gx.translate(t.x, t.y); gx.rotate(t.hull); gx.fillStyle = 'rgba(0,0,0,.2)'; const o = t.r * 0.78;
  gx.fillRect(-3, -o - 1.6, 5, 3.2); gx.fillRect(-3, o - 1.6, 5, 3.2); gx.restore();
}

function shootFrom(t, owner, speed, spread) {
  const a = t.turret + (spread || 0), mz = t.r * 1.45;
  bullets.push({ x: t.x + Math.cos(a) * mz, y: t.y + Math.sin(a) * mz, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, owner, life: 1.7, bounce: 0, trail: [] });
}
function playerFire() {
  if (player.cd > 0 || bullets.filter(b => b.owner === 'p').length > 9) return;
  player.cd = player.rapid > 0 ? 0.17 : 0.36; player.recoil = 1;
  if (player.spread > 0) { shootFrom(player, 'p', 330, -0.2); shootFrom(player, 'p', 330, 0); shootFrom(player, 'p', 330, 0.2); } else shootFrom(player, 'p', 330, 0);
  muzzleFlash(player); sfx.shoot();
}
function muzzleFlash(t) { const a = t.turret, mz = t.r * 1.6; for (let i = 0; i < 6; i++) parts.push({ x: t.x + Math.cos(a) * mz, y: t.y + Math.sin(a) * mz, vx: Math.cos(a + rand(-0.5, 0.5)) * rand(40, 140), vy: Math.sin(a + rand(-0.5, 0.5)) * rand(40, 140), life: 1, decay: 4.5, size: rand(2, 4), color: '#fde68a', kind: 'spark' }); }
function burst(x, y, colors, n, speed, kind) { for (let i = 0; i < n; i++) { const a = rand(0, Math.PI * 2), s = rand(0.2, 1) * speed; parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: rand(1.4, 3.2), size: rand(1.5, 3.5), color: colors[(Math.random() * colors.length) | 0], kind: kind || 'spark' }); } }
function popup(x, y, text, color) { popups.push({ x, y, text, life: 1, color: color || '#fde047' }); }

function killEnemy(e) {
  const i = enemies.indexOf(e); if (i < 0) return; enemies.splice(i, 1);
  const big = e.type === 'boss' || e.type === 'heavy';
  burst(e.x, e.y, ['#fde68a', '#fb923c', '#f87171', '#ffffff'], big ? 36 : 20, big ? 190 : 140);
  for (let k = 0; k < (big ? 10 : 5); k++) parts.push({ x: e.x + rand(-6, 6), y: e.y + rand(-6, 6), vx: rand(-14, 14), vy: rand(-30, -8), life: 1, decay: rand(0.5, 0.9), size: rand(5, 10), color: '#3a3a40', kind: 'smoke' });
  parts.push({ x: e.x, y: e.y, vx: 0, vy: 0, life: 1, decay: 2.6, size: e.r * 3.4, color: '#fff3b0', kind: 'ring' });
  const sg = gx.createRadialGradient(e.x, e.y, 2, e.x, e.y, e.r * 2); sg.addColorStop(0, 'rgba(0,0,0,.6)'); sg.addColorStop(1, 'rgba(0,0,0,0)'); gx.fillStyle = sg; gx.beginPath(); gx.arc(e.x, e.y, e.r * 2, 0, 7); gx.fill();
  combo.n = combo.t > 0 ? Math.min(4, combo.n + 1) : 1; combo.t = 3;
  const pts = TYPES[e.type].pts * combo.n; score += pts; kills++; popup(e.x, e.y - 12, '+' + pts);
  if (combo.n >= 2) { const el = $('hud-combo'); el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  shake = Math.max(shake, big ? 9 : 4); sfx.boom(big);
  if (Math.random() < (e.type === 'boss' ? 1 : 0.24)) dropPowerup(e.x, e.y);
  syncHud();
}
function dropPowerup(x, y) { const r = Math.random(), type = r < 0.3 ? 'repair' : r < 0.55 ? 'rapid' : r < 0.78 ? 'shield' : 'spread'; pups.push({ x, y, type, life: 12, t: 0 }); }
function hurtPlayer() {
  if (player.invuln > 0 || state !== 'play') return;
  if (player.shield) { player.shield = false; player.invuln = 1; ringBurst(player, '#67e8f9'); sfx.hit(); shake = Math.max(shake, 5); syncHud(); return; }
  player.hp--; player.invuln = 1.1; player.flash = 0.2; flash = 0.5; shake = Math.max(shake, 8); burst(player.x, player.y, ['#38bdf8', '#ffffff', '#fb923c'], 14, 120); sfx.hurt(); syncHud();
  if (player.hp <= 0) crashPlayer();
}
function ringBurst(t, color) { burst(t.x, t.y, [color, '#ffffff'], 18, 120); parts.push({ x: t.x, y: t.y, vx: 0, vy: 0, life: 1, decay: 2.2, size: 40, color, kind: 'ring' }); }
function damageWall(c, r) {
  const k = idx(c, r), v = grid[k]; if (v === 1) return;
  if (--hpGrid[k] > 0) { burst(c * TS + TS / 2, r * TS + TS / 2, ['#c2763c', '#7c3f1e'], 6, 90); sfx.brick(); return; }
  grid[k] = 0; sfx.brick(); const x = c * TS, y = r * TS;
  burst(x + TS / 2, y + TS / 2, ['#b45309', '#a16207', '#78350f', '#d6a15a'], 16, 130);
  for (let i = 0; i < 10; i++) { gx.fillStyle = Math.random() < 0.5 ? 'rgba(90,50,25,.7)' : 'rgba(30,25,20,.6)'; gx.fillRect(x + rand(2, TS - 4), y + rand(2, TS - 4), rand(2, 5), rand(2, 4)); }
  if (v === 3 && Math.random() < 0.6) dropPowerup(x + TS / 2, y + TS / 2);
  flow = null;                                            // the map changed: recompute the enemy flow field
}

// Enemy navigation: breadth-first distance map from the player's tile, so tanks route around walls
function buildFlow() {
  flow = new Int16Array(N * N).fill(-1); const pc = clamp(Math.floor(player.x / TS), 0, N - 1), pr = clamp(Math.floor(player.y / TS), 0, N - 1), q = [idx(pc, pr)]; flow[q[0]] = 0;
  for (let h = 0; h < q.length; h++) { const k = q[h], c = k % N, r = (k / N) | 0; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => { const nc = c + d[0], nr = r + d[1]; if (nc < 0 || nr < 0 || nc >= N || nr >= N) return; const j = idx(nc, nr); if (flow[j] < 0 && !grid[j]) { flow[j] = flow[k] + 1; q.push(j); } }); }
}
function flowDir(e) {
  const c = clamp(Math.floor(e.x / TS), 0, N - 1), r = clamp(Math.floor(e.y / TS), 0, N - 1), here = flow[idx(c, r)]; if (here < 0) return null;
  let best = null, bd = here;
  [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => { const nc = c + d[0], nr = r + d[1]; if (nc < 0 || nr < 0 || nc >= N || nr >= N) return; const v = flow[idx(nc, nr)]; if (v >= 0 && v < bd) { bd = v; best = d; } });
  if (!best) return null;
  const tx = (c + best[0]) * TS + TS / 2, ty = (r + best[1]) * TS + TS / 2, m = Math.hypot(tx - e.x, ty - e.y) || 1; return { x: (tx - e.x) / m, y: (ty - e.y) / m };
}

function updateEnemy(e, dt) {
  const T = TYPES[e.type];
  if (e.spawn > 0) { e.spawn -= dt; return; }
  e.cd -= dt; e.flash -= dt; e.recoil = Math.max(0, e.recoil - dt * 5); e.strafeT -= dt; if (e.strafeT <= 0) { e.strafe *= -1; e.strafeT = rand(1.2, 3); }
  const dx = player.x - e.x, dy = player.y - e.y, dist = Math.hypot(dx, dy) || 1, seen = los(e.x, e.y, player.x, player.y), toP = Math.atan2(dy, dx);
  let mx = 0, my = 0;
  if (seen) {                                              // keep the preferred range, circling the player
    const far = dist > T.range + 30, near = dist < T.range - 45;
    if (far) { mx = dx / dist; my = dy / dist; } else if (near) { mx = -dx / dist; my = -dy / dist; } else { mx = -dy / dist * e.strafe; my = dx / dist * e.strafe; }
  } else { const f = flowDir(e); if (f) { mx = f.x; my = f.y; } else { mx = dx / dist; my = dy / dist; } }
  if (e.stuck > 0) { e.stuck -= dt; mx = Math.cos(e.jogA); my = Math.sin(e.jogA); }
  enemies.forEach(o => { if (o !== e) { const ox = e.x - o.x, oy = e.y - o.y, od = Math.hypot(ox, oy); if (od < 30 && od > 0.1) { mx += ox / od * 0.6; my += oy / od * 0.6; } } });
  const m = Math.hypot(mx, my) || 1; mx /= m; my /= m;
  const sp = e.speed * dt; moveTank(e, mx * sp, my * sp);
  const moved = Math.hypot(e.x - e.lx, e.y - e.ly); e.lx = e.x; e.ly = e.y; e.tread += moved; trackMarks(e, moved);
  e.jog += dt; if (e.jog > 0.7) { e.jog = 0; if (Math.hypot(e.x - e.px, e.y - e.py) < 3 && e.stuck <= 0) { e.stuck = 0.7; e.jogA = rand(0, 6.28); } e.px = e.x; e.py = e.y; }
  if (moved > 0.02) e.hull += angDiff(e.hull, Math.atan2(my, mx)) * Math.min(1, dt * 9);
  // aim with lead, then fire when the barrel is on target and the line is clear
  const lead = dist / T.bullet, pvx = player.vx || 0, pvy = player.vy || 0;
  const aim = seen ? Math.atan2(player.y + pvy * lead - e.y, player.x + pvx * lead - e.x) : e.hull;
  e.turret += angDiff(e.turret, aim) * Math.min(1, dt * (e.type === 'scout' ? 8 : 5));
  const reachableTarget = flow && flow[idx(clamp(Math.floor(e.x / TS), 0, N - 1), clamp(Math.floor(e.y / TS), 0, N - 1))] < 0;   // sealed in: shoot walls to get out
  if (e.burst > 0) { e.burstT -= dt; if (e.burstT <= 0) { e.burst--; e.burstT = 0.14; enemyShot(e, T, 0); } }
  else if (e.cd <= 0 && ((seen && Math.abs(angDiff(e.turret, toP)) < 0.35) || reachableTarget)) {
    const err = rand(-0.06, 0.06) * (e.type === 'scout' ? 2 : 1);
    if (e.type === 'boss') { [-0.5, -0.25, 0, 0.25, 0.5].forEach(s => { e.turret += err; enemyShot(e, T, s); e.turret -= err; }); }
    else if (e.type === 'heavy') { e.burst = 1; e.burstT = 0.14; enemyShot(e, T, err); }
    else enemyShot(e, T, err);
    e.cd = T.reload + rand(0, 0.7);
  }
}
function enemyShot(e, T, spread) { shootFrom(e, 'e', T.bullet, spread); e.recoil = 1; muzzleFlash(e); sfx.eshoot(); }

// ── Waves ──
function waveList(n) {
  const l = [], g = Math.min(1 + Math.ceil(n / 2), 5), s = n >= 2 ? Math.min(Math.floor(n / 2), 4) : 0, h = n >= 3 ? Math.min(Math.floor((n - 1) / 3), 3) : 0;
  if (n % 5 === 0) { l.push('boss'); for (let i = 0; i < Math.ceil(g / 2); i++) l.push('gunner'); for (let i = 0; i < Math.floor(s / 2); i++) l.push('scout'); }
  else { for (let i = 0; i < g; i++) l.push('gunner'); for (let i = 0; i < s; i++) l.push('scout'); for (let i = 0; i < h; i++) l.push('heavy'); }
  return l.sort(() => Math.random() - 0.5).sort((a, b) => (a === 'boss') - (b === 'boss'));
}
function startWave(n) {
  wave = n; genLayout(); bullets = []; pups = []; spawnQ = waveList(n); spawnT = 0.8; flow = null;
  player.x = 8 * TS; player.y = 13 * TS + TS / 2; player.vx = player.vy = 0; player.invuln = 1.6; player.hull = player.turret = -Math.PI / 2;
  $('wave').textContent = n; banner(n % 5 === 0 ? 'BOSS WAVE' : 'WAVE ' + n); sfx.wave();
}
function banner(t) { const b = $('banner'); b.textContent = t; b.classList.remove('show'); void b.offsetWidth; b.classList.add('show'); }
function doSpawn() {
  if (!spawnQ.length || enemies.length >= 6) return;
  const free = spawns.filter(s => !enemies.some(e => Math.hypot(e.x - s.x, e.y - s.y) < 26)); if (!free.length) return;
  const s = free[(Math.random() * free.length) | 0], type = spawnQ.shift(), e = makeTank(s.x, s.y, type); e.spawn = 0.9; e.hull = e.turret = Math.PI / 2; enemies.push(e); ringBurst(e, TYPES[type].body);
}

// ── Simulation ──
function updateWorld(dt) {
  parts.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= p.decay * dt; if (p.kind === 'smoke') { p.size += dt * 10; p.vx *= 0.98; } else if (p.kind === 'spark') { p.vx *= 0.96; p.vy *= 0.96; } });
  parts = parts.filter(p => p.life > 0);
  popups.forEach(p => { p.y -= 22 * dt; p.life -= dt * 0.9; }); popups = popups.filter(p => p.life > 0);
  shake *= Math.pow(0.88, dt * 60); flash *= Math.pow(0.9, dt * 60);
}
function update(dt) {
  const p = player; p.cd -= dt; p.flash -= dt; p.recoil = Math.max(0, p.recoil - dt * 5); if (p.invuln > 0) p.invuln -= dt; if (p.rapid > 0) p.rapid -= dt; if (p.spread > 0) p.spread -= dt;
  // drive: WASD / arrows plus the left stick; the hull turns toward travel and the turret follows the aim
  let ix = (input.right ? 1 : 0) - (input.left ? 1 : 0), iy = (input.down ? 1 : 0) - (input.up ? 1 : 0);
  if (Math.hypot(input.move.x, input.move.y) > 0.18) { ix += input.move.x; iy += input.move.y; }
  const mag = Math.min(1, Math.hypot(ix, iy)); p.vx = p.vy = 0;
  if (mag > 0.05) {
    const a = Math.atan2(iy, ix), sp = p.speed * mag * dt, ox = p.x, oy = p.y;
    p.hull += angDiff(p.hull, a) * Math.min(1, dt * 12); moveTank(p, Math.cos(a) * sp, Math.sin(a) * sp);
    const moved = Math.hypot(p.x - ox, p.y - oy); p.tread += moved; trackMarks(p, moved); p.vx = (p.x - ox) / dt; p.vy = (p.y - oy) / dt;
    if (Math.random() < 0.25) parts.push({ x: p.x - Math.cos(p.hull) * 11, y: p.y - Math.sin(p.hull) * 11, vx: rand(-8, 8), vy: rand(-8, 8), life: 1, decay: 2.2, size: rand(2, 4), color: 'rgba(200,190,170,.5)', kind: 'smoke' });
  }
  let aim = null;
  if (input.aim.on) aim = Math.atan2(input.aim.y, input.aim.x); else if (input.mouseSeen) aim = Math.atan2(input.my - p.y, input.mx - p.x); else if (mag > 0.05) aim = p.hull;
  if (aim !== null) p.turret += angDiff(p.turret, aim) * Math.min(1, dt * 22);
  if (input.fire || input.mouse || input.aim.on) playerFire();

  spawnT -= dt; if (spawnT <= 0 && spawnQ.length) { doSpawn(); spawnT = 1.3; }
  flowT -= dt; if (!flow || flowT <= 0) { buildFlow(); flowT = 0.35; }
  enemies.forEach(e => updateEnemy(e, dt));
  separate([p].concat(enemies.filter(e => e.spawn <= 0)));

  // shells: sub-stepped so a fast shell cannot skip through a wall
  bullets.forEach(b => {
    const steps = Math.ceil(Math.hypot(b.vx, b.vy) * dt / 4);
    for (let s = 0; s < steps && !b.dead; s++) {
      const ox = b.x, oy = b.y; b.x += b.vx * dt / steps; b.y += b.vy * dt / steps;
      const t = tileVal(b.x, b.y);
      if (t) {
        const c = Math.floor(b.x / TS), r = Math.floor(b.y / TS);
        if (t === 1 && b.bounce < 1) {   // steel and the arena edge: ricochet once
          const oc = Math.floor(ox / TS), orr = Math.floor(oy / TS);
          if (oc !== c) b.vx = -b.vx; if (orr !== r) b.vy = -b.vy; if (oc === c && orr === r) { b.vx = -b.vx; b.vy = -b.vy; }
          b.x = ox; b.y = oy; b.bounce++; burst(b.x, b.y, ['#fde68a', '#ffffff'], 5, 100); sfx.bounce();
        } else { if (t !== 1 && c > 0 && r > 0 && c < N - 1 && r < N - 1) damageWall(c, r); else burst(b.x, b.y, ['#fde68a', '#9ca3af'], 5, 90); b.dead = true; }
      }
      if (b.dead) break;
      if (b.owner === 'p') { for (const e of enemies) { if (e.spawn <= 0 && Math.hypot(b.x - e.x, b.y - e.y) < e.r + 3) { b.dead = true; e.hp--; e.flash = 0.12; burst(b.x, b.y, ['#ffffff', '#fde68a'], 6, 110); if (e.hp <= 0) killEnemy(e); else sfx.hit(); break; } } }
      else if (Math.hypot(b.x - p.x, b.y - p.y) < p.r + 3) { b.dead = true; hurtPlayer(); }
    }
    b.life -= dt; if (b.life <= 0) b.dead = true;
    b.trail.push({ x: b.x, y: b.y }); if (b.trail.length > 5) b.trail.shift();
  });
  for (let i = 0; i < bullets.length; i++) for (let j = i + 1; j < bullets.length; j++) {               // opposing shells cancel out
    const a = bullets[i], c = bullets[j]; if (a.dead || c.dead || a.owner === c.owner) continue;
    if (Math.hypot(a.x - c.x, a.y - c.y) < 6) { a.dead = c.dead = true; burst((a.x + c.x) / 2, (a.y + c.y) / 2, ['#ffffff', '#fde68a'], 8, 110); }
  }
  bullets = bullets.filter(b => !b.dead);
  pups.forEach(u => { u.life -= dt; u.t += dt; if (Math.hypot(u.x - p.x, u.y - p.y) < 15) { u.life = 0; takePowerup(u.type); } }); pups = pups.filter(u => u.life > 0);
  if (combo.t > 0) { combo.t -= dt; if (combo.t <= 0) { combo.n = 0; syncHud(); } }
  updateWorld(dt);

  if (!spawnQ.length && !enemies.length && state === 'play') {
    if (!waveClear) { waveClear = 1.4; score += 100 * wave; popup(W / 2, H / 2 + 20, 'WAVE CLEAR +' + 100 * wave, '#86efac'); syncHud(); }
    waveClear -= dt; if (waveClear <= 0) { waveClear = 0; startWave(wave + 1); }
  }
}
function takePowerup(type) {
  sfx.pickup(); ringBurst(player, type === 'repair' ? '#86efac' : '#fde047');
  if (type === 'repair') player.hp = Math.min(5, player.hp + 2); else if (type === 'rapid') player.rapid = 9; else if (type === 'spread') player.spread = 9; else player.shield = true;
  popup(player.x, player.y - 16, type.toUpperCase(), '#ffffff'); syncHud();
}
function crashPlayer() {
  state = 'over'; burst(player.x, player.y, ['#fde68a', '#fb923c', '#38bdf8', '#ffffff'], 44, 210); ringBurst(player, '#fb923c'); shake = 16; flash = 0.8; sfx.boom(true);
  const best = getBest(); newBest = score > best; if (newBest) { setBest(score); $('best-score').textContent = score; }
  $('final-score').textContent = score.toLocaleString('en-US'); $('final-detail').textContent = 'Wave ' + wave + ' · ' + kills + ' tanks destroyed'; $('best-msg').textContent = newBest ? '🏆 New high score!' : 'Best ' + best;
  setTimeout(() => { if (state === 'over') $('gameover-overlay').classList.remove('hidden'); }, 800);
}

// ── HUD ──
let lastPow = '';
function syncHud() {
  $('hud-score').textContent = score.toLocaleString('en-US'); $('hud-combo').textContent = combo.n >= 2 ? 'x' + combo.n : '';
  const hp = $('hud-hp'); hp.className = 'hud-hp' + (player.hp <= 1 ? ' low' : ''); hp.innerHTML = [0, 1, 2, 3, 4].map(i => '<i class="' + (i < player.hp ? '' : 'off') + '"></i>').join('');
}
function powerHud() {
  const s = (player.shield ? '<span style="color:#67e8f9">SHIELD</span>' : '') + (player.rapid > 0 ? '<span style="color:#fde047">RAPID ' + Math.ceil(player.rapid) + '</span>' : '') + (player.spread > 0 ? '<span style="color:#f9a8d4">SPREAD ' + Math.ceil(player.spread) + '</span>' : '');
  if (s !== lastPow) { lastPow = s; $('hud-power').innerHTML = s; }
}

// ── Rendering ──
function drawWall(c, r) {
  const v = grid[idx(c, r)], x = c * TS, y = r * TS; if (!v) return;
  if (v === 1) {
    const g = ctx.createLinearGradient(x, y, x + TS, y + TS); g.addColorStop(0, '#8b94a8'); g.addColorStop(1, '#4b5367'); ctx.fillStyle = g; ctx.fillRect(x, y, TS, TS);
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(x, y, TS, 2); ctx.fillRect(x, y, 2, TS); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x, y + TS - 2, TS, 2); ctx.fillRect(x + TS - 2, y, 2, TS);
    ctx.fillStyle = '#2b3140'; [[5, 5], [TS - 7, 5], [5, TS - 7], [TS - 7, TS - 7]].forEach(d => ctx.fillRect(x + d[0], y + d[1], 2.4, 2.4));
  } else if (v === 2) {
    const hp = hpGrid[idx(c, r)]; ctx.fillStyle = hp === 3 ? '#b4582f' : hp === 2 ? '#9c4a28' : '#7e3c20'; ctx.fillRect(x, y, TS, TS);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let k = 1; k < 4; k++) ctx.fillRect(x, y + k * TS / 4 - 0.5, TS, 1); for (let k = 0; k < 4; k++) { const o = k % 2 ? TS / 2 : TS / 4; ctx.fillRect(x + o, y + k * TS / 4, 1, TS / 4); if (k % 2 === 0) ctx.fillRect(x + o + TS / 2, y + k * TS / 4, 1, TS / 4); }
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x, y, TS, 2);
    if (hp < 3) { ctx.strokeStyle = 'rgba(20,10,5,.85)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x + 4, y + 3); ctx.lineTo(x + 11, y + 12); ctx.lineTo(x + 8, y + 20); if (hp < 2) { ctx.moveTo(x + 20, y + 4); ctx.lineTo(x + 14, y + 14); ctx.lineTo(x + 21, y + 21); } ctx.stroke(); }
  } else {
    ctx.fillStyle = '#c1923f'; ctx.fillRect(x + 1, y + 1, TS - 2, TS - 2); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let k = 1; k < 4; k++) ctx.fillRect(x + 1, y + k * 6, TS - 2, 1);
    ctx.strokeStyle = '#7a5520'; ctx.lineWidth = 2; ctx.strokeRect(x + 2, y + 2, TS - 4, TS - 4); ctx.beginPath(); ctx.moveTo(x + 3, y + 3); ctx.lineTo(x + TS - 3, y + TS - 3); ctx.moveTo(x + TS - 3, y + 3); ctx.lineTo(x + 3, y + TS - 3); ctx.stroke();
  }
}
function drawTank(t, isPlayer) {
  const s = t.r / 9, T = isPlayer ? { body: '#38bdf8', dark: '#0369a1' } : TYPES[t.type], spawning = t.spawn > 0;
  ctx.save(); ctx.translate(t.x, t.y); if (spawning) ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t.spawn * 30);
  ctx.fillStyle = 'rgba(0,0,0,.32)'; ctx.beginPath(); ctx.ellipse(3, 4, 12 * s, 9 * s, t.hull, 0, 7); ctx.fill();
  ctx.save(); ctx.rotate(t.hull);
  ctx.fillStyle = '#1b2030'; ctx.fillRect(-12 * s, -9.5 * s, 24 * s, 5 * s); ctx.fillRect(-12 * s, 4.5 * s, 24 * s, 5 * s);             // tracks
  ctx.fillStyle = 'rgba(255,255,255,.22)'; for (let x = -12 * s + (t.tread % (4 * s)); x < 12 * s; x += 4 * s) { ctx.fillRect(x, -9.5 * s, 1.2, 5 * s); ctx.fillRect(x, 4.5 * s, 1.2, 5 * s); }
  const g = ctx.createLinearGradient(0, -7 * s, 0, 7 * s); g.addColorStop(0, T.body); g.addColorStop(1, T.dark); ctx.fillStyle = g;
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-10 * s, -7 * s, 20 * s, 14 * s, 3 * s) : ctx.rect(-10 * s, -7 * s, 20 * s, 14 * s); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-9 * s, -6 * s, 18 * s, 2 * s); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-10 * s, 2 * s, 5 * s, 4 * s);        // highlight + engine vent
  ctx.restore();
  ctx.save(); ctx.rotate(t.turret);
  const len = (14 - t.recoil * 4) * s, bg = ctx.createLinearGradient(0, -2 * s, 0, 2 * s); bg.addColorStop(0, '#4b5563'); bg.addColorStop(1, '#111827'); ctx.fillStyle = bg; ctx.fillRect(2 * s, -2 * s, len, 4 * s); ctx.fillStyle = '#9ca3af'; ctx.fillRect(2 * s + len - 2, -2.6 * s, 2.5, 5.2 * s);
  const tg = ctx.createRadialGradient(-2 * s, -2 * s, 1, 0, 0, 7.5 * s); tg.addColorStop(0, T.body); tg.addColorStop(1, T.dark); ctx.fillStyle = tg; ctx.beginPath(); ctx.arc(0, 0, 6.5 * s, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(-1.5 * s, -1.5 * s, 2 * s, 0, 7); ctx.fill();
  ctx.restore();
  if (t.flash > 0) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(0, 0, 10 * s, 0, 7); ctx.fill(); }
  ctx.restore();
  if (!isPlayer && t.maxHp > 1 && t.spawn <= 0) { ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(t.x - 11, t.y - t.r - 8, 22, 3.5); ctx.fillStyle = T.body; ctx.fillRect(t.x - 10.5, t.y - t.r - 7.5, 21 * (t.hp / t.maxHp), 2.5); }
  if (isPlayer && t.shield) { const pulse = 1 + Math.sin(performance.now() / 140) * 0.05; ctx.save(); ctx.strokeStyle = 'rgba(103,232,249,.9)'; ctx.fillStyle = 'rgba(34,211,238,.14)'; ctx.lineWidth = 2; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(t.x, t.y, 17 * pulse, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
}
function drawPowerup(u) {
  const col = { repair: '#86efac', rapid: '#fde047', shield: '#67e8f9', spread: '#f9a8d4' }[u.type], y = u.y + Math.sin(u.t * 4) * 2;
  if (u.life < 3 && Math.floor(u.life * 6) % 2) return;
  ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 12; ctx.fillStyle = 'rgba(10,12,18,.85)'; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(u.x, y, 10, 0, 7); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0; ctx.fillStyle = col; ctx.font = '800 11px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText({ repair: '+', rapid: '»', shield: '◇', spread: '⋔' }[u.type], u.x, y + 0.5); ctx.restore();
}
function draw(now) {
  ctx.drawImage(ground, 0, 0, W, H);
  ctx.save(); if (shake > 0.4 && !reduce) ctx.translate(rand(-shake, shake) / 2, rand(-shake, shake) / 2);
  ctx.fillStyle = 'rgba(0,0,0,.32)'; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (grid[idx(c, r)]) ctx.fillRect(c * TS + 3, r * TS + 4, TS, TS);   // drop shadows
  pups.forEach(drawPowerup);
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) drawWall(c, r);
  enemies.forEach(e => drawTank(e, false)); if (state !== 'idle' && state !== 'over') drawTank(player, true); else if (state === 'idle') drawTank(player, true);
  if (state === 'play' && !input.aim.on) { const p = player, mz = p.r * 1.5, e = rayEnd(p.x + Math.cos(p.turret) * mz, p.y + Math.sin(p.turret) * mz, p.turret, 260); ctx.save(); ctx.strokeStyle = 'rgba(56,189,248,.28)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.moveTo(p.x + Math.cos(p.turret) * mz, p.y + Math.sin(p.turret) * mz); ctx.lineTo(e.x, e.y); ctx.stroke(); ctx.restore(); }   // laser sight
  bullets.forEach(b => {
    const col = b.owner === 'p' ? '#fde047' : '#fb7185'; ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 8;
    ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.globalAlpha = 0.5; ctx.beginPath(); b.trail.forEach((t, i) => i ? ctx.lineTo(t.x, t.y) : ctx.moveTo(t.x, t.y)); ctx.stroke();
    ctx.globalAlpha = 1; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(b.x, b.y, 2.6, 0, 7); ctx.fill(); ctx.restore();
  });
  parts.forEach(p => {
    ctx.globalAlpha = Math.max(0, p.life) * (p.kind === 'smoke' ? 0.5 : 1);
    if (p.kind === 'ring') { ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 - p.life) + 4, 0, 7); ctx.stroke(); }
    else if (p.kind === 'smoke') { ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, 7); ctx.fill(); }
    else { ctx.fillStyle = p.color; ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size); }
  });
  ctx.globalAlpha = 1;
  ctx.font = '800 12px system-ui'; ctx.textAlign = 'center'; popups.forEach(p => { ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color; ctx.fillText(p.text, p.x, p.y); }); ctx.globalAlpha = 1;
  if (state === 'play' && input.mouseSeen && !input.aim.on) { ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(input.mx, input.my, 7, 0, 7); ctx.moveTo(input.mx - 11, input.my); ctx.lineTo(input.mx - 4, input.my); ctx.moveTo(input.mx + 4, input.my); ctx.lineTo(input.mx + 11, input.my); ctx.moveTo(input.mx, input.my - 11); ctx.lineTo(input.mx, input.my - 4); ctx.moveTo(input.mx, input.my + 4); ctx.lineTo(input.mx, input.my + 11); ctx.stroke(); }
  ctx.restore();
  if (flash > 0.02) { ctx.fillStyle = 'rgba(255,80,60,' + flash * 0.35 + ')'; ctx.fillRect(0, 0, W, H); }
}

// One permanent loop: simulate while playing, animate the scenery otherwise
function frame(ts) {
  requestAnimationFrame(frame);
  if (!lastFrame) lastFrame = ts;
  const dt = Math.min((ts - lastFrame) / 1000, 0.05); lastFrame = ts;
  if (state === 'play') { update(dt); powerHud(); }
  else if (state === 'over') { updateWorld(dt); bullets.forEach(b => { b.x += b.vx * dt; b.y += b.vy * dt; }); }
  else if (state === 'idle') { enemies.forEach(e => { e.turret += dt * 0.6; e.cd = 9; }); player.turret -= dt * 0.5; updateWorld(dt); }
  draw(ts);
}

// ── State ──
function newGame() {
  score = 0; kills = 0; combo = { n: 0, t: 0 }; waveClear = 0; newBest = false; enemies = []; bullets = []; parts = []; popups = []; pups = []; flow = null; flowT = 0; shake = 0; flash = 0;
  player = makeTank(8 * TS, 13 * TS + TS / 2, null); player.vx = player.vy = 0; player.shield = false; player.rapid = 0; player.spread = 0; player.invuln = 0;
}
function startGame() {
  audio(); newGame(); state = 'play'; lastFrame = 0; $('hud-combo').textContent = '';
  ['start-overlay', 'pause-overlay', 'gameover-overlay'].forEach(id => $(id).classList.add('hidden'));
  startWave(1); syncHud();
}
function pauseGame() { if (state !== 'play') return; state = 'paused'; Object.keys(input).forEach(k => { if (typeof input[k] === 'boolean') input[k] = false; }); $('pause-overlay').classList.remove('hidden'); $('btn-pause').setAttribute('aria-label', 'Resume'); }
function resumeGame() { if (state !== 'paused') return; state = 'play'; lastFrame = 0; $('pause-overlay').classList.add('hidden'); $('btn-pause').setAttribute('aria-label', 'Pause'); }
function setupIdle() { newGame(); wave = 1; genLayout(); enemies = [makeTank(3.5 * TS, 3.5 * TS, 'gunner'), makeTank(12.5 * TS, 5.5 * TS, 'heavy'), makeTank(8 * TS, 2.5 * TS, 'scout')]; enemies.forEach(e => { e.hull = Math.PI / 2; e.turret = rand(0, 6.28); }); syncHud(); }

// ── Input ──
const KEYS = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'fire' };
const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown'];
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (SCROLL_KEYS.indexOf(e.code) !== -1) e.preventDefault();                       // arrows and Space must never scroll the page
  if (KEYS[e.code] && state === 'play') input[KEYS[e.code]] = true;
  if (e.repeat) return;
  if (e.code === 'KeyP' || e.code === 'Escape') state === 'play' ? pauseGame() : resumeGame();
  else if (e.code === 'KeyM') toggleSound();
  else if ((e.code === 'Enter' || e.code === 'Space') && (state === 'idle' || state === 'over')) startGame();
  else if (e.code === 'Space' && state === 'paused') resumeGame();
});
document.addEventListener('keyup', e => { if (KEYS[e.code]) input[KEYS[e.code]] = false; });
window.addEventListener('blur', () => { Object.keys(input).forEach(k => { if (typeof input[k] === 'boolean') input[k] = false; }); pauseGame(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });

const wrap = $('wrap');
function toCanvas(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; }
wrap.addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; const p = toCanvas(e); input.mx = p.x; input.my = p.y; input.mouseSeen = true; });
wrap.addEventListener('pointerdown', e => { if (e.pointerType === 'touch' || e.target.closest('.overlay')) return; const p = toCanvas(e); input.mx = p.x; input.my = p.y; input.mouseSeen = true; input.mouse = true; });
document.addEventListener('pointerup', e => { if (e.pointerType !== 'touch') input.mouse = false; });

function makeStick(id, onChange) {                                                  // twin-stick touch controls
  const el = $(id), knob = el.querySelector('.knob'), R = 34; let pid = null;
  function set(e) { const r = el.getBoundingClientRect(); let dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); const m = Math.hypot(dx, dy), k = m > R ? R / m : 1; dx *= k; dy *= k; knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; onChange(dx / R, dy / R); }
  function end() { pid = null; el.classList.remove('active'); knob.style.transform = ''; onChange(0, 0); }
  el.addEventListener('pointerdown', e => { e.preventDefault(); pid = e.pointerId; try { el.setPointerCapture(pid); } catch (err) {} el.classList.add('active'); if (state === 'idle' || state === 'over') startGame(); set(e); });
  el.addEventListener('pointermove', e => { if (e.pointerId === pid) set(e); });
  el.addEventListener('pointerup', e => { if (e.pointerId === pid) end(); }); el.addEventListener('pointercancel', e => { if (e.pointerId === pid) end(); });
}
makeStick('stick-move', (x, y) => { input.move.x = x; input.move.y = y; });
makeStick('stick-aim', (x, y) => { input.aim.x = x; input.aim.y = y; input.aim.on = Math.hypot(x, y) > 0.3; });

function toggleSound() { muted = !muted; try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {} syncSound(); if (!muted) tone(660, 880, 0.08, 'triangle', 0.05); }
function syncSound() { const b = $('btn-sound'); b.textContent = muted ? '🔇' : '🔊'; b.setAttribute('aria-pressed', String(!muted)); b.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on'); }
$('btn-sound').addEventListener('click', toggleSound);
$('btn-pause').addEventListener('click', () => { state === 'play' ? pauseGame() : resumeGame(); });
$('btn-start').addEventListener('click', startGame); $('btn-retry').addEventListener('click', startGame); $('btn-resume').addEventListener('click', resumeGame);

$('best-score').textContent = getBest();
syncSound(); setupIdle();
requestAnimationFrame(frame);

/* wdp-share:start */
(function () {
  var TITLE = 'Tank Arena Game', URL = 'https://webdevpuneet.com/ui-snippets/tank-arena-game/';
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
    title: 'Tank Arena Game — HTML Canvas Top-Down Shooter in JS',
    description: 'Top-down tank shooter in HTML5 canvas and JS: ricochet shells, enemy pathfinding, power-ups, boss waves, mouse and twin-stick touch controls and a saved score.',
    about: {
      title: 'Tank Arena — A Top-Down Tank Shooter with Ricochets, Enemy Pathfinding, Power-Ups and Twin-Stick Controls',
      description: `Top-down tank battles are a classic because the rules are instantly readable: drive, aim, shoot, use cover. This snippet builds a complete, polished one on a single HTML5 \`<canvas>\`: a destructible arena, free 360° aiming, shells that ricochet, four enemy types that navigate around walls and lead their shots, power-ups, a boss every fifth wave, combo scoring, synthesized sound and mouse, keyboard or twin-stick touch input.

**Drive, aim and fire independently**

The tank has a hull and a turret that rotate separately, like a real twin-stick game. WASD or the arrow keys (or the left stick) drive the hull, which turns smoothly toward the direction of travel with \`angDiff\`, a shortest-angle helper that avoids spinning the long way round. The turret eases toward the mouse position, the right stick, or the hull direction if no aim input exists, so the game is playable with a keyboard alone. A dashed laser sight is raycast from the barrel to the first wall, which shows exactly where a ricochet will start.

**A tile arena that is fair and destructible**

The map is a 16×16 grid with steel (indestructible), brick (three hits, with cracks that grow as it takes damage) and crates (one hit, 60% chance of a power-up). Every wave generates a new layout on the left half and mirrors it, so neither side has an advantage, then a flood fill checks that every enemy spawn can still reach the player and regenerates the map if steel has walled anything off. Movement collision is circle-versus-rectangle using the nearest point on each tile, resolved one axis at a time so tanks slide along walls instead of sticking.

**Shells that ricochet, with sub-stepping**

Shells move in sub-steps of about 4 px so a fast bullet can never tunnel through a wall. When a shell enters a solid tile the code compares the previous and current tile coordinates to decide which axis to flip, so it bounces off steel and the arena edge exactly once; hitting a brick damages it and ends the shell. Opposing shells cancel each other on contact, and friendly fire is off. Each shell draws a short fading trail and a glow.

**Enemies that find their way**

Scouts are fast and fragile, gunners are balanced, heavies carry five hits and fire two-shell bursts, and the boss fires a five-shell fan. Every tank runs the same loop. If it has a clear line (a raycast through the grid) it holds a preferred range, closing in when far, backing off when near and strafing in between. If the player is hidden it follows a breadth-first **flow field**, a distance map from the player's tile that is rebuilt every 0.35 seconds or when a wall breaks, always stepping to the neighbour with the lowest distance. Shots lead the target using \`distance / bulletSpeed\` and the player's velocity, fire only when the barrel is within about 20° of the target, and a small stuck detector nudges a tank that stops making progress.

**Waves, power-ups and combos**

Waves are generated from a formula (more gunners, then scouts, then heavies, and a boss on every fifth wave) and enemies are released through a spawn queue with a short warning ring, capped at six alive at a time. Power-ups drop from some kills and crates: repair, rapid fire, shield and triple spread. Kills within three seconds of each other build a combo multiplier up to x4.

**Juice, sound and mobile support**

Tracks, scorch marks and brick rubble are painted onto a persistent off-screen ground canvas instead of being redrawn, so they cost almost nothing. Muzzle flashes, sparks, smoke, shockwave rings, screen shake and a red hit flash sell every impact. Sound effects are synthesized with the Web Audio API, with a saved mute toggle, and the game pauses on blur or a hidden tab. Touch players get two on-screen sticks built from Pointer Events, with the aim stick firing automatically while it is pushed. The canvas is scaled by \`devicePixelRatio\` for sharp lines, and \`prefers-reduced-motion\` disables screen shake. For more canvas games see the [Dodge the falling blocks game](/ui-snippets/dodge-the-blocks-game/) and the [Asteroids Blaster game](/ui-snippets/asteroids-game/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Deploy', text: 'Click "Deploy" (or press Enter or Space). The title screen shows tanks idling in a freshly generated arena. Wave 1 starts with a banner and a short spawn warning for each enemy.' },
        { title: 'Drive and aim', text: 'Drive with WASD or the arrow keys and aim with the mouse. The turret follows the crosshair and a dashed laser shows where your shell will go. On a phone use the left stick to drive and the right stick to aim.' },
        { title: 'Fire and use ricochets', text: 'Hold the mouse button or Space (the right stick fires automatically). Shells bounce once off steel and the arena edge, so you can hit tanks hiding behind cover. Enemy shells ricochet too.' },
        { title: 'Break cover and collect power-ups', text: 'Bricks crack after three hits and crates break in one, sometimes dropping a power-up: repair, rapid fire, shield or triple spread. Drive over them to collect them.' },
        { title: 'Chain kills', text: 'Destroy tanks within three seconds of each other to raise the combo multiplier up to x4. Heavy tanks need five hits, and every fifth wave brings a boss.' },
        { title: 'Pause, mute and beat your best', text: 'P or Esc pauses and M mutes. You have five armour pips. Your best score is saved in localStorage under tank-arena-best.' },
      ],
    },
    features: [
      { title: 'Hull and turret aim', text: 'Independent rotation with shortest-angle easing, driven by keyboard, mouse or twin touch sticks, plus a raycast laser sight.' },
      { title: 'Ricocheting shells', text: 'Sub-stepped bullets bounce once off steel and the edge by comparing tile coordinates, damage bricks, cancel each other and have fading trails.' },
      { title: 'Destructible arena', text: 'Steel, cracking brick and crates, generated as mirrored layouts and validated with a flood fill so every spawn is reachable.' },
      { title: 'Four enemy types with real AI', text: 'Scout, gunner, heavy and boss tanks keep a preferred range, strafe, lead their shots and path around walls with a breadth-first flow field.' },
      { title: 'Power-ups and combos', text: 'Repair, rapid fire, shield and triple spread drops, plus a kill-chain multiplier up to x4 with floating score popups.' },
      { title: 'Waves and bosses', text: 'Formula-driven waves with a spawn queue, warning rings, a cap of six enemies at once and a boss every fifth wave.' },
      { title: 'Persistent ground layer', text: 'Tracks, scorch marks and rubble are painted once onto an off-screen canvas, which keeps the battlefield detailed and cheap to draw.' },
      { title: 'Sound, pause and mobile', text: 'Web Audio effects with a saved mute, auto-pause on blur, scroll-safe keys, devicePixelRatio rendering and a saved high score.' },
    ],
    useCases: [
      { icon: 'APP', title: 'Twin-stick touch control template', desc: 'The two Pointer Event sticks (move and aim-and-fire) are a reusable pattern for any top-down shooter on mobile. Compare with the thumb controls in the [Asteroids Blaster game](/ui-snippets/asteroids-game/).' },
      { icon: 'LEARN', title: 'Teaching game AI basics', desc: 'Line-of-sight raycasts, a breadth-first flow field, preferred-range steering, strafing and target leading are the foundations of simple enemy AI, shown in a small readable codebase.' },
      { icon: 'CODE', title: 'Starting point for a bigger shooter', desc: 'The tile grid, circle-versus-tile collision and wave spawner extend to more enemy types, mines, turrets, upgrades or two-player modes without touching the main loop.' },
      { icon: 'FORM', title: 'Instantly playable arcade demo', desc: 'A self-contained shooter with no assets starts immediately, a strong embeddable demo for a games portal, blog or landing page. For a quieter puzzle try the [Maze runner game](/ui-snippets/maze-runner-game/).' },
      { icon: 'FLOW', title: 'Interactive 404 or loading filler', desc: 'With no network dependency it makes an engaging distraction on an error page, like the [Dodge the falling blocks game](/ui-snippets/dodge-the-blocks-game/).' },
      { icon: 'DESIGN', title: 'Canvas techniques reference', desc: 'A persistent ground layer, glow, particles, screen shake and procedural map generation with mirroring and validation are reusable in any 2D canvas scene.' },
    ],
    faqs: [
      { q: 'How do the enemies find their way around walls?', a: 'A breadth-first search starts from the player\'s tile and gives every reachable tile its distance from the player. Each hidden enemy steps toward the neighbouring tile with the smallest distance. The map is rebuilt every 0.35 seconds, or immediately when a brick breaks, so enemies route around walls and through new gaps.' },
      { q: 'How do ricochets work?', a: 'Shells move in sub-steps of about 4 px. When a step lands inside a steel tile, the code compares the previous and current tile coordinates: if the column changed it flips the horizontal speed, if the row changed it flips the vertical speed. A shell may bounce once, and bricks absorb it instead.' },
      { q: 'How is the arena kept fair and playable?', a: 'The generator builds one half and mirrors it, then runs a flood fill from the player\'s start to every enemy spawn with only steel counted as blocking. If anything is sealed off it throws the layout away and tries again, up to 30 times.' },
      { q: 'How do enemies aim at a moving player?', a: 'They estimate the shell\'s travel time as distance divided by shell speed, add the player\'s current velocity multiplied by that time to the player\'s position, and aim at that point. Each shot also gets a small random error, larger for scouts.' },
      { q: 'How do the touch sticks work?', a: 'Each stick is an element with a knob. On pointerdown it captures the pointer, and on every move it converts the offset from the centre into a vector clamped to the stick radius. The left stick feeds the driving vector, and the right stick sets the aim angle and fires while pushed past 30%.' },
      { q: 'Why are tracks and scorch marks on a separate canvas?', a: 'Drawing them every frame would cost more as they accumulate. Painting each mark once onto an off-screen canvas and copying that canvas under the scene each frame keeps the cost flat, and the layer is cleared when a new wave builds a new map.' },
      { q: 'Does my high score survive a reload?', a: 'Yes. The best score is stored in localStorage under tank-arena-best and read on load, wrapped in try/catch so the game still runs where storage is blocked.' },
      { q: 'How do I use this tank game in React, Vue, or Angular?', a: 'Render the canvas and overlays, create the context in a mount effect and run the requestAnimationFrame loop there, keeping game state in refs. Cancel the loop and remove the key, pointer and visibility listeners in the cleanup. Use the export buttons on this page for the markup and styles.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain how the flow field routes enemies around walls, why shells are sub-stepped, or how target leading is calculated. It is a strong base to extend: ask for mines and laser turrets, a ricochet-kill bonus, player upgrades between waves (armour, reload speed, shell speed), a two-player co-op mode on one keyboard, a minimap, or an online leaderboard. You could also ask it to add gamepad support, replace the drawn tanks with a sprite sheet, or port the loop into a React component using useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a polished, mobile-friendly top-down tank shooter on an HTML5 canvas, as ONE self-contained HTML file (inline CSS and JS, no frameworks, no asset files). Dark card UI with an orange and cyan accent.

ARENA
- A 16x16 tile grid of 25px tiles on a 400x400 canvas (scale the backing store by devicePixelRatio, max 2). Tile types: steel (indestructible, bevelled with rivets), brick (3 hits, cracks appear as it is damaged) and crate (1 hit, 60% chance to drop a power-up). Steel border.
- Generate a new layout per wave on the left half and mirror it left-right; keep the spawn rows and the player's start clear; run a flood fill (only steel blocks) from the player's start to every spawn and regenerate (max 30 tries) if anything is unreachable.
- A persistent off-screen ground canvas holds the checkered floor (palette changes every 3 waves), tank track marks, scorch marks and brick rubble.

TANKS AND CONTROLS
- Separate hull and turret angles. WASD/arrows drive (hull turns toward travel with a shortest-angle ease), the turret follows the mouse, or the right stick, or the hull direction if there is no aim input. Mouse down or Space fires; the right stick fires while pushed past 30%. Reload 0.36s. Circle-vs-tile collision using the nearest point on each tile, resolved per axis so tanks slide along walls; push overlapping tanks apart.
- Draw tanks with canvas shapes: animated treads, gradient hull, rotating turret with a barrel that recoils, drop shadow, hit flash, an enemy health bar and a shield bubble. A dashed laser sight raycast from the barrel to the first wall, and a crosshair at the mouse.
- Two on-screen sticks built with Pointer Events (setPointerCapture, vector clamped to the stick radius): MOVE and AIM-FIRE. Pressing a stick on the title or game-over screen starts the game.

SHELLS
- Sub-step bullets (about 4px per step). On entering a steel tile or the arena edge, compare previous and current tile coordinates to flip vx or vy, and allow one ricochet only. Bricks and crates take damage and absorb the shell. Opposing shells cancel each other. No friendly fire. Fading trails and glow.

ENEMIES (scout fast 1hp, gunner 2hp, heavy 5hp firing two-shell bursts, boss 26hp firing a five-shell fan)
- If the player is in line of sight (raycast through the grid), hold a preferred range: approach when far, retreat when near, strafe in between (flip direction every 1.2 to 3s). If not, follow a breadth-first flow field (distance map from the player's tile, rebuilt every 0.35s or when a wall breaks). Separate from other enemies, and add a stuck detector that picks a random direction for 0.7s.
- Aim with target leading (distance / shell speed times the player's velocity), fire only when the turret is within about 20 degrees and the line is clear, with random aim error. If sealed in by bricks, shoot anyway.
- Waves from a formula (gunners, then scouts, then heavies; a boss every 5th wave), released from a spawn queue with a warning ring and a cap of 6 alive.

PROGRESSION AND FEEL
- 5 armour pips, 1s invulnerability after a hit. Power-ups (repair +2, rapid fire 9s, shield, triple spread 9s) shown as chips. Kills within 3s build a x2 to x4 combo; wave-clear bonus; floating score popups; best score in localStorage with try/catch.
- Muzzle flash, sparks, smoke, shockwave rings, screen shake (disabled for prefers-reduced-motion), red hit flash, a wave banner animation, a vignette overlay.
- Idle state shows tanks with turrets sweeping behind a start overlay. Pause on P, Esc, window blur or a hidden tab. M toggles sound. Arrow keys and Space must never scroll the page.
- Sound synthesized with the Web Audio API (no files): shot, enemy shot, bounce, brick, hit, explosion, hurt, pickup, wave jingle; AudioContext created on the first click; saved mute.

Use one permanent requestAnimationFrame loop with delta-time scaling. Return only the finished single HTML file.`,
    },
  },
};

export default tankArenaGame;
