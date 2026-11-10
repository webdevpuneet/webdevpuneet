const dodgeTheBlocksGame = {
  id: 'dodge-the-blocks-game',
  title: 'Dodge the Falling Blocks Game',
  lastmod: '2026-11-10',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🟪</span>
      <h2>Dodge the Blocks</h2>
    </div>
    <div class="best-badge">Best: <span id="best-score">0</span></div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="480"></canvas>
    <div class="hud">
      <span id="hud-score">0</span>
      <span id="hud-time">0.0s</span>
    </div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Dodge the Blocks</p>
        <p class="overlay-sub">Steer your hover-car through falling neon. Every 20 seconds a new stage adds zig-zags, walls and lasers. Skim past blocks for combo points, and DASH to slip through gaps.</p>
        <button class="btn btn-primary" id="btn-start">Start</button>
      </div>
    </div>
    <div class="overlay hidden" id="pause-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Paused</p>
        <button class="btn btn-primary" id="btn-resume">Resume</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Game Over</p>
        <p class="overlay-sub" id="final-score">Survived 0.0s</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Try again</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="ctrl-btn" id="btn-left" aria-label="Move left">◀</button>
    <button class="dash-btn" id="btn-dash" aria-label="Dash">DASH</button>
    <button class="ctrl-btn" id="btn-right" aria-label="Move right">▶</button>
    <div class="mini-col">
      <button class="mini-btn" id="btn-pause" type="button" aria-label="Pause">⏸</button>
      <button class="mini-btn" id="btn-mute" type="button" aria-label="Sound on" aria-pressed="false">🔊</button>
    </div>
  </div>

  <p class="hint-text">← → / A D or drag to move · Space or Shift to dash · P to pause</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card { width: 100%; max-width: 400px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.08); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.best-badge { font-size: 12px; font-weight: 700; color: #db2777; background: #fdf2f8; padding: 5px 10px; border-radius: 20px; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #12052b; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; inset: 8px 12px auto 12px; display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.7); pointer-events: none; }

.overlay { position: absolute; inset: 0; background: rgba(18,5,43,0.86); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #f5d0fe; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #db2777; color: #fff; }
.btn-primary:hover { background: #be185d; }

.controls { display: flex; align-items: center; gap: 8px; margin-top: 14px; }
.ctrl-btn, .dash-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; transition: transform 0.06s, background 0.12s; height: 56px; border-radius: 14px; }
.ctrl-btn { width: 64px; background: #f8fafc; color: #334155; font-size: 22px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #fce7f3; }
.dash-btn { flex: 1; background: #db2777; color: #fff; font-size: 15px; font-weight: 800; letter-spacing: 1.5px; border-color: #db2777; box-shadow: 0 3px 0 #9d174d; }
.dash-btn:active { transform: translateY(3px); box-shadow: none; }
.mini-col { display: flex; flex-direction: column; gap: 6px; }
.mini-btn { width: 34px; height: 25px; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; font-size: 12px; line-height: 1; cursor: pointer; }
.mini-btn[aria-pressed="true"] { opacity: 0.55; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const $ = id => document.getElementById(id);
const canvas = $('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'dodge-blocks-best-score';

const PY = H - 54, PW = 34, PH = 16;               // player car: y, width, height
const STAGE_LEN = 20, DASH_TIME = 0.18, DASH_CD = 1.6;
const NEON = ['#f472b6', '#22d3ee', '#a78bfa', '#fb923c', '#4ade80', '#facc15'];
const STAGES = ['', 'Falling blocks', 'NEW: zig-zag blocks', 'NEW: walls with a gap', 'NEW: lasers', 'Everything, faster'];

let player, hazards, items, parts, pops, bgCanvas;
let running = false, paused = false, rafId, lastFrame, phase = 'play', phaseT = 0;
let elapsed, spawnT, bonus, combo, comboT, stage, banner, breather, shield, slowT, shrinkT, shake, time = 0;
let keys = { left: false, right: false }, dragX = null, muted = false, ac = null;

const startOverlay = $('start-overlay'), pauseOverlay = $('pause-overlay'), gameoverOverlay = $('gameover-overlay');
const hudTime = $('hud-time'), hudScore = $('hud-score'), finalScoreEl = $('final-score'), bestMsgEl = $('best-msg'), bestScoreEl = $('best-score'), muteBtn = $('btn-mute');

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }
const score = () => Math.floor(elapsed * 10) + bonus;

// ── Sound ──
function tone(f, dur, type, to, vol, delay) {
  if (muted) return;
  try {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const t0 = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(vol || 0.04, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch (e) {}
}
const sfx = {
  dash: () => tone(300, 0.15, 'sawtooth', 1200, 0.035),
  near: c => tone(700 + c * 90, 0.08, 'triangle', 0, 0.045),
  star: () => [988, 1318].forEach((f, i) => tone(f, 0.08, 'square', 0, 0.035, i * 0.06)),
  power: () => [523, 784, 1046].forEach((f, i) => tone(f, 0.1, 'triangle', 0, 0.05, i * 0.07)),
  warn: () => tone(1500, 0.05, 'square', 0, 0.02),
  laser: () => tone(220, 0.3, 'sawtooth', 110, 0.04),
  crash: () => { tone(200, 0.6, 'sawtooth', 40, 0.08); tone(110, 0.5, 'square', 30, 0.05); },
  shieldHit: () => tone(400, 0.25, 'triangle', 120, 0.06),
  stage: () => [392, 523, 659, 784].forEach((f, i) => tone(f, 0.13, 'square', 0, 0.035, i * 0.09)),
};

// ── Synthwave backdrop painted once: sky, striped sun, mountains ──
function buildBackground() {
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const sky = g.createLinearGradient(0, 0, 0, H * 0.72); sky.addColorStop(0, '#12052b'); sky.addColorStop(0.6, '#3b0764'); sky.addColorStop(1, '#9d174d');
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 70; i++) { g.fillStyle = 'rgba(255,255,255,' + (0.3 + (i % 5) * 0.12).toFixed(2) + ')'; g.fillRect((i * 97.3) % W, (i * 41.7) % (H * 0.55), i % 7 ? 1 : 2, i % 7 ? 1 : 2); }
  const cy = H * 0.6, r = 62, sun = g.createLinearGradient(0, cy - r, 0, cy + r); sun.addColorStop(0, '#fde047'); sun.addColorStop(1, '#f472b6');
  g.save(); g.beginPath(); g.arc(W / 2, cy, r, 0, 6.3); g.clip(); g.fillStyle = sun; g.fillRect(W / 2 - r, cy - r, r * 2, r * 2);
  g.fillStyle = '#3b0764'; for (let k = 0; k < 6; k++) g.fillRect(W / 2 - r, cy + 6 + k * 9, r * 2, 2 + k * 0.8); g.restore();
  g.fillStyle = '#1e0b3d'; g.beginPath(); g.moveTo(0, H * 0.72);
  [[0, 0.62], [0.12, 0.57], [0.22, 0.64], [0.34, 0.55], [0.46, 0.66], [0.6, 0.6], [0.72, 0.53], [0.84, 0.63], [1, 0.58]].forEach(p => g.lineTo(p[0] * W, p[1] * H));
  g.lineTo(W, H * 0.72); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(244,114,182,0.5)'; g.lineWidth = 1; g.stroke();
  return cv;
}

function drawGrid() {
  const top = H * 0.72;
  ctx.fillStyle = '#12052b'; ctx.fillRect(0, top, W, H - top);
  ctx.strokeStyle = 'rgba(236,72,153,0.55)'; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -8; i <= 8; i++) { ctx.moveTo(W / 2 + i * 12, top); ctx.lineTo(W / 2 + i * 70, H); }
  const off = (time * (1.2 + elapsed * 0.03)) % 1;
  for (let k = 0; k < 9; k++) { const t = (k + off) / 9, y = top + (H - top) * t * t; ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
  ctx.fillStyle = 'rgba(244,114,182,0.7)'; ctx.fillRect(0, top - 1, W, 2);
}

// ── Hazards ──
const fallSpeed = () => Math.min(8, 2.4 + elapsed * 0.05);
function spawn() {
  const sp = fallSpeed(), r = Math.random();
  if (stage >= 4 && r < 0.14) {                      // laser: a warning line, then a beam
    hazards.push({ type: 'laser', x: 20 + Math.random() * (W - 40), w: 14, warn: 0.95, on: 0.38, warned: false });
  } else if (stage >= 3 && r < 0.3) {               // wall with a gap
    const gw = Math.max(70, 112 - elapsed * 0.4), gx = 14 + Math.random() * (W - gw - 28);
    hazards.push({ type: 'wall', y: -20, h: 16, gx, gw, vy: sp * 0.75, col: NEON[(Math.random() * NEON.length) | 0], minD: 99, done: false });
  } else if (stage >= 2 && r < 0.48) {               // zig-zag block
    const w = 26 + Math.random() * 24;
    hazards.push({ type: 'zig', x0: 30 + Math.random() * (W - 60 - w), x: 0, y: -20, w, h: 18, vy: sp * 0.9, amp: 30 + Math.random() * 40, ph: Math.random() * 6, col: NEON[(Math.random() * NEON.length) | 0], minD: 99, done: false });
  } else {
    const w = 26 + Math.random() * 54;
    hazards.push({ type: 'block', x: Math.random() * (W - w), y: -20, w, h: 18, vy: sp * (0.8 + Math.random() * 0.45), col: NEON[(Math.random() * NEON.length) | 0], minD: 99, done: false });
  }
  const p = Math.random();
  if (p < 0.1) items.push({ type: 'star', x: 20 + Math.random() * (W - 40), y: -16, vy: sp * 0.8 });
  else if (p < 0.135) items.push({ type: ['shield', 'slow', 'shrink'][(Math.random() * 3) | 0], x: 20 + Math.random() * (W - 40), y: -16, vy: sp * 0.7 });
}

function rectsOf(h) {   // the collision rectangles of a hazard
  if (h.type === 'wall') return [{ x: -10, y: h.y, w: h.gx + 10, h: h.h }, { x: h.gx + h.gw, y: h.y, w: W - h.gx - h.gw + 10, h: h.h }];
  if (h.type === 'laser') return h.warn <= 0 && h.on > 0 ? [{ x: h.x - h.w / 2, y: -10, w: h.w, h: H + 20 }] : [];
  return [{ x: h.x, y: h.y, w: h.w, h: h.h }];
}

function resetState() {
  player = { x: W / 2, vx: 0, dir: 1, dashT: 0, dashCd: 0, tilt: 0 };
  hazards = []; items = []; parts = []; pops = [];
  elapsed = 0; spawnT = 0.6; bonus = 0; combo = 0; comboT = 0; stage = 1; breather = 0;
  shield = false; slowT = 0; shrinkT = 0; shake = 0; phase = 'play';
  banner = { text: 'STAGE 1', sub: STAGES[1], t: 1.8 };
  syncHud();
}

function syncHud() { hudTime.textContent = elapsed.toFixed(1) + 's'; hudScore.textContent = score(); }

function burst(x, y, n, colors, spd) {
  for (let i = 0; i < n && parts.length < 450; i++) {
    const a = Math.random() * 6.283, v = (0.3 + Math.random()) * (spd || 3);
    parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 20 + Math.random() * 22, max: 42, c: colors[(Math.random() * colors.length) | 0], s: 1.5 + Math.random() * 2.5 });
  }
}
function popup(x, y, text, color) { pops.push({ x, y, text, color: color || '#fde68a', t: 0.9 }); }

function dash() {
  if (!running || phase !== 'play' || player.dashCd > 0) return;
  player.dashT = DASH_TIME; player.dashCd = DASH_CD; player.vx = player.dir * 15; sfx.dash();
}

const pw = () => PW * (shrinkT > 0 ? 0.6 : 1), ph = () => PH * (shrinkT > 0 ? 0.6 : 1);

function crash(hz) {
  if (player.dashT > 0) return false;               // dashing makes you untouchable
  if (shield) { shield = false; sfx.shieldHit(); burst(player.x, PY, 20, ['#67e8f9', '#fff'], 3); hz.dead = true; return false; }
  phase = 'dying'; phaseT = 1.0; shake = 14; sfx.crash();
  burst(player.x, PY, 60, ['#22d3ee', '#f472b6', '#fde047', '#ffffff'], 4.5);
  return true;
}

// ── Frame update ──
function update(dt) {
  time += dt;
  const step = dt * 60;
  parts.forEach(p => { p.x += p.vx * step; p.y += p.vy * step; p.vx *= 0.96; p.vy *= 0.96; p.life -= step; });
  parts = parts.filter(p => p.life > 0);
  pops.forEach(p => { p.t -= dt; p.y -= 0.6 * step; }); pops = pops.filter(p => p.t > 0);
  if (banner) { banner.t -= dt; if (banner.t <= 0) banner = null; }
  if (shake > 0.3) shake *= Math.pow(0.86, step); else shake = 0;
  if (phase === 'dying') { phaseT -= dt; if (phaseT <= 0) endGame(); return; }

  elapsed += dt;
  const ws = slowT > 0 ? 0.5 : 1;                     // slow-mo slows the world, not you
  if (slowT > 0) slowT -= dt;
  if (shrinkT > 0) shrinkT -= dt;
  if (comboT > 0) { comboT -= dt; if (comboT <= 0) combo = 0; }

  // Stages: every 20 seconds, with a short breather and a banner
  const st = 1 + Math.floor(elapsed / STAGE_LEN);
  if (st !== stage) { stage = st; breather = 1.6; banner = { text: 'STAGE ' + st, sub: STAGES[Math.min(st, 5)], t: 2 }; sfx.stage(); bonus += 100 * (st - 1); popup(W / 2, H / 2 + 30, '+' + 100 * (st - 1), '#fde047'); }

  // Player: acceleration and drag for keys, a spring toward your finger for touch
  const p = player, dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  if (dir) p.dir = dir;
  if (p.dashT > 0) { p.dashT -= dt; parts.push({ x: p.x, y: PY + 4, vx: -p.dir * 0.5, vy: 0, life: 14, max: 14, c: '#f472b6', s: 6 }); }
  else if (dragX !== null) { p.vx = (dragX - p.x) * 0.3; if (Math.abs(dragX - p.x) > 2) p.dir = Math.sign(dragX - p.x); }
  else { p.vx += dir * 1.2 * step; p.vx *= Math.pow(0.8, step); }
  if (p.dashCd > 0) p.dashCd -= dt;
  p.x = clamp(p.x + p.vx * step, pw() / 2 + 2, W - pw() / 2 - 2);
  p.tilt += (clamp(p.vx * 0.05, -0.4, 0.4) - p.tilt) * 0.25;
  if (Math.random() < 0.6) parts.push({ x: p.x + (Math.random() - 0.5) * pw() * 0.6, y: PY + ph() / 2, vx: 0, vy: 1.2 + Math.random(), life: 12, max: 12, c: Math.random() < 0.5 ? '#22d3ee' : '#a78bfa', s: 2 });

  // Spawning
  if (breather > 0) breather -= dt;
  else {
    spawnT -= dt * ws;
    if (spawnT <= 0) { spawn(); spawnT = Math.max(0.26, 1.0 - elapsed * 0.012) * (0.75 + Math.random() * 0.5); }
  }

  // Hazards
  const pr = { x: p.x - pw() / 2 + 2, y: PY - ph() / 2 + 2, w: pw() - 4, h: ph() - 4 };
  for (const h of hazards) {
    if (h.type === 'laser') {
      if (h.warn > 0) { h.warn -= dt * ws; if (Math.floor(h.warn * 10) % 3 === 0 && !h.beeped) { h.beeped = true; sfx.warn(); } if (h.warn <= 0) sfx.laser(); }
      else h.on -= dt * ws;
      if (h.on <= -0.2) h.dead = true;
    } else {
      h.y += h.vy * ws * step;
      if (h.type === 'zig') h.x = h.x0 + Math.sin(h.ph + h.y * 0.03) * h.amp;
      if (h.y > H + 30) h.dead = true;
    }
    for (const r of rectsOf(h)) {
      if (pr.x < r.x + r.w && pr.x + pr.w > r.x && pr.y < r.y + r.h && pr.y + pr.h > r.y) { if (crash(h)) return; }
      // near miss: the horizontal gap while the hazard passes your row
      else if (h.type !== 'laser' && r.y + r.h > pr.y && r.y < pr.y + pr.h) { const d = Math.max(r.x - (pr.x + pr.w), pr.x - (r.x + r.w)); if (d >= 0 && d < h.minD) h.minD = d; }
    }
    if (h.type !== 'laser' && !h.done && h.y > PY + 14) {
      h.done = true;
      if (h.minD < 9) { combo = Math.min(5, combo + 1); comboT = 2; const pts = 10 * combo; bonus += pts; sfx.near(combo); popup(p.x, PY - 22, 'CLOSE! +' + pts, '#fde047'); }
    }
  }
  hazards = hazards.filter(h => !h.dead);

  // Pickups
  for (const it of items) {
    it.y += it.vy * ws * step;
    if (Math.hypot(it.x - p.x, it.y - PY) < 18) {
      it.dead = true;
      if (it.type === 'star') { const pts = 50 * Math.max(1, combo); bonus += pts; sfx.star(); popup(it.x, it.y - 10, '+' + pts, '#fde047'); burst(it.x, it.y, 10, ['#fde047', '#fff'], 2); }
      else {
        sfx.power(); burst(it.x, it.y, 14, ['#67e8f9', '#f0abfc', '#fff'], 2.5);
        if (it.type === 'shield') { shield = true; popup(it.x, it.y - 10, 'SHIELD!', '#67e8f9'); }
        else if (it.type === 'slow') { slowT = 5; popup(it.x, it.y - 10, 'SLOW-MO!', '#c4b5fd'); }
        else { shrinkT = 6; popup(it.x, it.y - 10, 'SHRINK!', '#86efac'); }
      }
    }
    if (it.y > H + 20) it.dead = true;
  }
  items = items.filter(i => !i.dead);
  syncHud();
}

// ── Drawing ──
function neonRect(x, y, w, h, col) {
  ctx.fillStyle = col; ctx.globalAlpha = 0.18; ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
  ctx.globalAlpha = 0.85; ctx.fillStyle = '#1a0838'; ctx.fillRect(x, y, w, h);
  ctx.globalAlpha = 1; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
  ctx.fillStyle = col; ctx.globalAlpha = 0.35; ctx.fillRect(x + 3, y + 3, w - 6, 3); ctx.globalAlpha = 1;
}

function drawPlayer() {
  if (phase === 'dying') return;
  const p = player, s = shrinkT > 0 ? 0.6 : 1;
  ctx.save(); ctx.translate(p.x, PY); ctx.rotate(p.tilt); ctx.scale(s, s);
  const glow = ctx.createRadialGradient(0, 10, 2, 0, 10, 34); glow.addColorStop(0, 'rgba(236,72,153,0.6)'); glow.addColorStop(1, 'rgba(236,72,153,0)');
  ctx.fillStyle = glow; ctx.fillRect(-34, -10, 68, 50);
  ctx.fillStyle = p.dashT > 0 ? '#ffffff' : '#0e7490';
  ctx.beginPath(); ctx.moveTo(-17, 7); ctx.lineTo(-12, -6); ctx.lineTo(12, -6); ctx.lineTo(17, 7); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#a5f3fc'; ctx.beginPath(); ctx.moveTo(-7, -6); ctx.lineTo(-4, -11); ctx.lineTo(4, -11); ctx.lineTo(7, -6); ctx.fill();
  ctx.fillStyle = '#f472b6'; ctx.fillRect(-16, 4, 5, 3); ctx.fillRect(11, 4, 5, 3);
  ctx.restore();
  if (shield) { ctx.strokeStyle = 'rgba(103,232,249,' + (0.6 + Math.sin(time * 6) * 0.25).toFixed(2) + ')'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, PY, 22 * s, 0, 6.3); ctx.stroke(); }
}

function draw() {
  ctx.drawImage(bgCanvas, 0, 0);
  drawGrid();
  // speed streaks
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  for (let i = 0; i < 12; i++) { const x = (i * 71.3) % W, len = 10 + fallSpeed() * 3, y = ((time * 160 * (1 + i % 3) + i * 97) % (H + len)) - len; ctx.fillRect(x, y, 1, len); }
  ctx.save();
  if (shake) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  hazards.forEach(h => {
    if (h.type === 'laser') {
      if (h.warn > 0) {
        if (Math.floor(h.warn * 12) % 2) { ctx.strokeStyle = 'rgba(248,113,113,0.8)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(h.x, 0); ctx.lineTo(h.x, H); ctx.stroke(); ctx.setLineDash([]); }
        ctx.fillStyle = '#f87171'; ctx.font = 'bold 14px system-ui'; ctx.textAlign = 'center'; ctx.fillText('!', h.x, 46);
      } else if (h.on > 0) {
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createLinearGradient(h.x - h.w, 0, h.x + h.w, 0); g.addColorStop(0, 'rgba(239,68,68,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(239,68,68,0)');
        ctx.fillStyle = 'rgba(239,68,68,0.45)'; ctx.fillRect(h.x - h.w, 0, h.w * 2, H);
        ctx.fillStyle = g; ctx.fillRect(h.x - h.w / 2, 0, h.w, H);
        ctx.globalCompositeOperation = 'source-over';
      }
      return;
    }
    if (h.type === 'wall') { rectsOf(h).forEach(r => neonRect(Math.max(0, r.x), r.y, Math.min(W, r.x + r.w) - Math.max(0, r.x), r.h, h.col)); return; }
    neonRect(h.x, h.y, h.w, h.h, h.col);
  });
  items.forEach(it => {
    const bob = Math.sin(time * 6 + it.x) * 2;
    if (it.type === 'star') {
      ctx.fillStyle = '#fde047'; ctx.beginPath();
      for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5 + time * 2, r = k % 2 ? 4 : 9; ctx.lineTo(it.x + Math.cos(a) * r, it.y + bob + Math.sin(a) * r); }
      ctx.fill();
    } else {
      const c = it.type === 'shield' ? '#67e8f9' : it.type === 'slow' ? '#c4b5fd' : '#86efac';
      ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.fillStyle = 'rgba(18,5,43,0.85)';
      ctx.beginPath(); ctx.arc(it.x, it.y + bob, 10, 0, 6.3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = c; ctx.font = 'bold 11px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(it.type === 'shield' ? 'S' : it.type === 'slow' ? 'T' : 'M', it.x, it.y + bob + 1);
    }
  });
  ctx.globalCompositeOperation = 'lighter';
  parts.forEach(q => { ctx.globalAlpha = clamp(q.life / q.max, 0, 1); ctx.fillStyle = q.c; ctx.fillRect(q.x - q.s / 2, q.y - q.s / 2, q.s, q.s); });
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  drawPlayer();
  ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  pops.forEach(q => { ctx.globalAlpha = clamp(q.t * 2, 0, 1); ctx.fillStyle = q.color; ctx.fillText(q.text, q.x, q.y); });
  ctx.globalAlpha = 1;
  ctx.restore();

  // Dash meter, power-up timers, combo, stage
  const ready = player.dashCd <= 0;
  ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(10, H - 10, 60, 4);
  ctx.fillStyle = ready ? '#f472b6' : '#9d174d'; ctx.fillRect(10, H - 10, 60 * (1 - clamp(player.dashCd / DASH_CD, 0, 1)), 4);
  ctx.font = 'bold 9px system-ui'; ctx.textAlign = 'left'; ctx.fillStyle = ready ? '#fbcfe8' : '#9d174d'; ctx.fillText(ready ? 'DASH READY' : 'DASH', 10, H - 17);
  const tags = [];
  if (shield) tags.push('SHIELD'); if (slowT > 0) tags.push('SLOW ' + Math.ceil(slowT)); if (shrinkT > 0) tags.push('SHRINK ' + Math.ceil(shrinkT));
  if (tags.length) { ctx.textAlign = 'center'; ctx.fillStyle = '#e9d5ff'; ctx.fillText(tags.join(' · '), W / 2, H - 12); }
  ctx.textAlign = 'right'; ctx.font = '800 12px system-ui';
  ctx.fillStyle = '#e9d5ff'; ctx.fillText('STAGE ' + stage, W - 10, H - 24);
  if (combo > 1) { ctx.fillStyle = '#fde047'; ctx.fillText('x' + combo, W - 10, H - 10); }
  if (banner) {
    ctx.globalAlpha = clamp(banner.t * 2, 0, 1); ctx.textAlign = 'center';
    ctx.font = '900 30px system-ui, sans-serif'; ctx.fillStyle = '#fdf4ff'; ctx.fillText(banner.text, W / 2, H * 0.36);
    ctx.font = '700 13px system-ui, sans-serif'; ctx.fillStyle = '#f9a8d4'; ctx.fillText(banner.sub, W / 2, H * 0.36 + 26);
    ctx.globalAlpha = 1;
  }
}

// ── Game flow ──
function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  const dt = Math.min((ts - lastFrame) / 1000, 1 / 30);
  lastFrame = ts;
  update(dt);
  if (running) { draw(); rafId = requestAnimationFrame(loop); }
}

function startGame() {
  resetState(); running = true; paused = false; lastFrame = 0;
  startOverlay.classList.add('hidden'); pauseOverlay.classList.add('hidden'); gameoverOverlay.classList.add('hidden');
  rafId = requestAnimationFrame(loop);
}

function setPaused(pz) {
  if (!running && !paused) return;
  if (pz === paused) return;
  paused = pz;
  if (pz) { running = false; cancelAnimationFrame(rafId); keys = { left: false, right: false }; dragX = null; draw(); pauseOverlay.classList.remove('hidden'); }
  else { pauseOverlay.classList.add('hidden'); running = true; lastFrame = 0; rafId = requestAnimationFrame(loop); }
}

function endGame() {
  running = false; cancelAnimationFrame(rafId); draw();
  const best = getBest(), sc = score();
  finalScoreEl.textContent = 'Score ' + sc + ' · survived ' + elapsed.toFixed(1) + 's · stage ' + stage;
  if (sc > best) { setBest(sc); bestScoreEl.textContent = sc; bestMsgEl.textContent = '🏆 New best score!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input ──
document.addEventListener('keydown', e => {
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') { if (running || paused) setPaused(!paused); return; }
  if (!running) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (paused) setPaused(false); else if (!startOverlay.classList.contains('hidden') || !gameoverOverlay.classList.contains('hidden')) startGame(); }
    return;
  }
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.left = true; e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.right = true; e.preventDefault(); }
  if ((e.key === ' ' || e.key === 'Shift' || e.key === 'ArrowUp') && !e.repeat) { e.preventDefault(); dash(); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
});
document.addEventListener('visibilitychange', () => { if (document.hidden && running) setPaused(true); });

function hold(id, on, off) {
  const el = $(id);
  el.addEventListener('pointerdown', e => { e.preventDefault(); on(); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); off(); }));
  el.addEventListener('contextmenu', e => e.preventDefault());
}
hold('btn-left', () => { keys.left = true; }, () => { keys.left = false; });
hold('btn-right', () => { keys.right = true; }, () => { keys.right = false; });
$('btn-dash').addEventListener('pointerdown', e => { e.preventDefault(); dash(); });

const toX = e => { const r = canvas.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * W; };
canvas.addEventListener('pointerdown', e => { dragX = toX(e); });
canvas.addEventListener('pointermove', e => { if (e.buttons > 0 || e.pointerType === 'touch') dragX = toX(e); });
['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => canvas.addEventListener(ev, () => { dragX = null; }));

$('btn-start').addEventListener('click', startGame);
$('btn-retry').addEventListener('click', startGame);
$('btn-resume').addEventListener('click', () => setPaused(false));
$('btn-pause').addEventListener('click', () => { if (running || paused) setPaused(!paused); });
muteBtn.addEventListener('click', () => {
  muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', String(muted)); muteBtn.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
});

bgCanvas = buildBackground();
bestScoreEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Dodge the Blocks Game: Neon Stages, Lasers and Dash',
    description: 'A free synthwave dodging game on canvas: steer a hover-car through falling blocks, zig-zags, gap walls and lasers, dash through gaps, chain near misses.',
    about: {
      title: 'Dodge the Blocks: Stage-Based Difficulty, Near-Miss Combos and a Synthwave Look',
      description: `Dodge the Blocks is a one-axis survival game: hazards fall from the top and you steer a hover-car left and right at the bottom to avoid them for as long as you can. This snippet turns that simple idea into a full game on one HTML5 \`<canvas>\`, with no libraries and no image files. It has a synthwave look (a striped sun, mountains and a scrolling perspective grid), new hazard types introduced stage by stage, a dash move, near-miss combos, collectible stars and three power-ups. It plays with the arrow keys or A and D, on-screen buttons, or by dragging on the game.

**Stages that teach one hazard at a time**

Every 20 seconds a new stage begins, announced with a banner, a 1.6-second breather with no spawns, and a bonus. Stage 1 is plain falling blocks; stage 2 adds zig-zag blocks that swing side to side as they fall; stage 3 adds walls that span the whole width except for one gap; stage 4 adds lasers that flash a dashed warning line for almost a second before firing a full-height beam; stage 5 and beyond mixes everything. Fall speed and spawn rate rise continuously, and the gaps in walls slowly narrow, so the difficulty keeps climbing between stage changes too.

**Movement that feels responsive**

With keys or buttons the car accelerates and glides to a stop instead of moving a fixed step per frame, and it tilts with its speed. Dragging on the canvas pulls the car toward your finger like a spring. The dash fires the car sideways at high speed for 0.18 seconds, during which it cannot be hit, which makes it the tool for squeezing through a closing wall gap or escaping a laser warning; it then needs 1.6 seconds to recharge, shown by a meter.

**Near misses, stars and power-ups**

While a hazard passes the car's row, the game tracks the smallest horizontal gap between them. If it was under 9 pixels when the hazard leaves, you get a "CLOSE!" bonus, and consecutive near misses within two seconds build a combo up to x5 that also multiplies stars. Stars are worth 50 points. Power-ups are a shield (absorbs one hit and destroys the hazard), slow motion (the world runs at half speed for five seconds but your car does not) and shrink (a smaller car for six seconds). The score is ten points per second survived plus all bonuses, and the best score is saved in \`localStorage\`.

**Neon rendering**

Hazards are drawn as dark slabs with a bright outline, a soft outer glow and a highlight strip, in a random colour from a neon palette. The backdrop is painted once into an off-screen canvas; the grid floor scrolls faster as the game speeds up, speed streaks fall through the scene, and particles use additive blending so engine sparks, dash trails and the crash explosion glow. Sound effects come from the Web Audio API, with a mute button, and the game pauses on P, a button or a tab switch.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start and steer', text: 'Press Start. Move with the arrow keys or A and D, the ◀ ▶ buttons, or by dragging on the game. The car accelerates and glides, so tap for small moves.' },
        { title: 'Survive the stages', text: 'Every 20 seconds a new stage adds a hazard: zig-zag blocks, then walls with a single gap, then lasers. A banner names the new hazard and you get a short breather.' },
        { title: 'Dash through trouble', text: 'Press Space, Shift, the up arrow or DASH to shoot sideways for a split second; you cannot be hit while dashing. The meter at the bottom left shows when it is ready again.' },
        { title: 'Watch for laser warnings', text: 'A blinking dashed red line with a ! means a laser will fire there in under a second. Move away or dash across it before the beam appears.' },
        { title: 'Skim for combos', text: 'Pass a block with less than 9 pixels to spare for a CLOSE! bonus. Near misses in quick succession build a combo up to x5, which also multiplies stars.' },
        { title: 'Grab stars and power-ups', text: 'Stars are 50 points. S is a shield, T is slow motion for the world and M shrinks your car. Your best score is saved in your browser.' },
      ],
    },
    features: [
      'Five stage types introduced every 20 seconds: blocks, zig-zag blocks, walls with a gap, telegraphed lasers, then everything',
      'Continuously rising fall speed and spawn rate, narrowing wall gaps, and a breather with a banner at each stage',
      'Acceleration-based steering with tilt, drag-to-move for touch, and an invulnerable dash with a cooldown meter',
      'Near-miss detection with a combo multiplier up to x5',
      'Stars plus shield, slow-motion and shrink power-ups',
      'A synthwave backdrop painted once, a scrolling perspective grid, speed streaks and neon hazards',
      'Additive particles for engine sparks, dash trails and the crash, plus screen shake',
      'On-screen ◀ DASH ▶ buttons, keyboard and drag controls, pause and mute',
      'Web Audio sound effects and a best score in localStorage with try/catch',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Learning difficulty design', desc: 'Introducing one hazard per stage with a breather in between is a clear example of teaching players new mechanics gradually.' },
      { icon: 'APP', title: 'A one-thumb mobile game template', desc: 'Drag-to-move, a big DASH button and simple rules make it comfortable on a phone and easy to adapt.' },
      { icon: 'DESIGN', title: 'A synthwave canvas style', desc: 'The striped sun, perspective grid and neon outlines show how to get a strong retro look from a few gradients and lines.' },
      { icon: 'FLOW', title: 'An interactive 404 page or loading screen', desc: 'A quick survival game works as a distraction while something loads, like the [Space Blaster Arcade Game](/ui-snippets/space-blaster-game/).' },
      { icon: 'CODE', title: 'A base for an endless dodger', desc: 'Hazard types are small objects with their own update and collision rectangles, so new patterns slot into spawn() easily.' },
    ],
    faqs: [
      { q: 'How are near misses detected?', a: 'While a falling hazard overlaps the car\'s row vertically, the game measures the horizontal gap between the two rectangles and keeps the smallest one. When the hazard has passed below the car, a gap under 9 pixels counts as a near miss, adds 10 points times the current combo and raises the combo by one (up to x5).' },
      { q: 'How do the lasers work?', a: 'A laser first spends about 0.95 seconds as a blinking dashed warning line with an exclamation mark, then fires a full-height beam for about 0.38 seconds. It only collides while the beam is active, so you always have time to move or dash away.' },
      { q: 'What does dash do?', a: 'Dash launches the car sideways in the direction you last moved at high speed for 0.18 seconds. During a dash the car cannot be hit, so you can pass through a wall edge or a laser beam. It then recharges for 1.6 seconds.' },
      { q: 'How is the score calculated?', a: 'Ten points per second survived, plus near-miss bonuses, stars (50 times the combo), and a stage bonus of 100 times the stage number reached minus one. The best score is stored in localStorage.' },
      { q: 'How do I make it easier or harder?', a: 'fallSpeed() sets how fast hazards fall over time, the spawn interval in update() sets how often they appear, STAGE_LEN sets how long each stage lasts, and spawn() holds the chance of each hazard type. Larger wall gaps and a shorter DASH_CD make it easier.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the stage system, the near-miss tracking, the dash invulnerability and the hazard collision rectangles. It is a good base to extend: ask for boss stages with patterns, a daily seeded run, unlockable car skins, a ghost replay of your best run, gamepad support, or a port to a React component with the game state in a ref. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a complete synthwave dodging game on an HTML5 canvas in plain HTML, CSS and JavaScript, with no libraries and no image files.

Requirements:
- A hover-car at the bottom that moves left and right with acceleration and drag (arrow keys, A and D, on-screen buttons) or follows the finger when dragging on the canvas, and tilts with its speed.
- A dash (Space, Shift or a button) that launches the car sideways for 0.18 s with invulnerability, then a 1.6 s cooldown shown by a meter.
- Stages every 20 seconds, each with a banner and a short breather: falling blocks, then zig-zag blocks, then full-width walls with one gap, then lasers that show a blinking warning line before firing a full-height beam, then everything. Fall speed and spawn rate rise continuously and wall gaps narrow.
- Near-miss detection (smallest horizontal gap while a hazard passes the car's row) with a combo up to x5; stars worth 50 times the combo; shield, slow-motion (world only) and shrink power-ups.
- A synthwave look: a backdrop with a striped sun and mountains painted once to an off-screen canvas, a scrolling perspective grid, speed streaks, neon hazards with glow, additive particles, a crash explosion and screen shake.
- Score = 10 points per second + bonuses, best score in localStorage (with try/catch), Web Audio sound with mute, and pause on P, a button and tab switch.`,
    },
  },
};

export default dodgeTheBlocksGame;
