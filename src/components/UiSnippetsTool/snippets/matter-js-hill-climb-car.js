const matterJsHillClimbCar = {
  id: 'matter-js-hill-climb-car',
  title: 'Matter.js Hill Climb Car Game',
  lastmod: '2026-11-10',
  category: 'games',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js',
  ],
  html: `<div class="hc">
  <div class="hc-hud">
    <div><span>Distance</span><b id="hcDist">0 m</b></div>
    <div><span>Coins</span><b id="hcCoins">0</b></div>
    <div><span>Score</span><b id="hcScore">0</b></div>
    <div><span>Best</span><b id="hcBest">0</b></div>
    <div class="hc-meter"><span>Fuel</span><i><em id="hcFuel"></em></i></div>
    <div class="hc-meter boost"><span>Boost</span><i><em id="hcBoost"></em></i></div>
    <div class="hc-btns">
      <button type="button" id="hcSound" aria-pressed="false">Sound off</button>
      <button type="button" id="hcReset">Restart</button>
    </div>
  </div>
  <div class="hc-stage" id="hcStage">
    <div class="hc-prog" aria-hidden="true"><i id="hcProg"></i></div>
    <div class="hc-over" id="hcOver">
      <strong id="hcOverTitle">Hill Climb</strong>
      <span id="hcOverText">Reach the 500 m summit. Collect coins and fuel, pull off flips, and keep your head off the ground.</span>
      <div class="hc-stats" id="hcStats" hidden></div>
      <button type="button" id="hcAgain">Start driving</button>
    </div>
    <div class="hc-pedals">
      <button type="button" class="hc-pedal" id="hcBrake" aria-label="Brake / reverse">&#9664; Brake</button>
      <button type="button" class="hc-pedal boost" id="hcBoostBtn" aria-label="Boost"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg> Boost</button>
      <button type="button" class="hc-pedal gas" id="hcGas" aria-label="Accelerate">Gas &#9654;</button>
    </div>
  </div>
  <p class="hc-hint"><kbd>&rarr;</kbd>/<kbd>D</kbd> gas &middot; <kbd>&larr;</kbd>/<kbd>A</kbd> brake &middot; <kbd>&uarr;</kbd>/<kbd>Space</kbd> boost &middot; <kbd>R</kbd> restart. Rotate in the air for flip bonuses.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c1222;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:18px}
.hc{width:100%;max-width:960px}
.hc-hud{display:flex;align-items:center;gap:18px;margin-bottom:10px;flex-wrap:wrap}
.hc-hud>div{display:flex;flex-direction:column;gap:2px}
.hc-hud span{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;font-weight:700}
.hc-hud b{font:800 19px ui-monospace,monospace;color:#fde047;font-variant-numeric:tabular-nums}
.hc-meter i{display:block;width:110px;height:11px;border-radius:99px;background:#1e293b;overflow:hidden;margin-top:6px}
.hc-meter em{display:block;height:100%;width:100%;background:linear-gradient(90deg,#ef4444,#f59e0b 35%,#22c55e);transition:width .15s}
.hc-meter.boost em{background:linear-gradient(90deg,#6366f1,#38bdf8)}
.hc-btns{margin-left:auto;display:flex!important;flex-direction:row!important;gap:8px}
.hc-hud button,.hc-over button{border:0;border-radius:10px;background:#f59e0b;color:#1c1917;font:800 12.5px system-ui;padding:9px 16px;cursor:pointer}
.hc-hud #hcSound{background:#1e293b;color:#cbd5e1}
.hc-hud #hcSound[aria-pressed="true"]{background:#22c55e;color:#052e16}
.hc :focus-visible{outline:2px solid #fde047;outline-offset:2px}
.hc-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid #1e293b}
.hc-stage canvas{display:block;width:100%;height:auto}
.hc-prog{position:absolute;left:0;right:0;top:0;height:4px;background:rgba(15,23,42,.35);z-index:2}
.hc-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,#fde047,#f97316)}
.hc-over{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px;background:rgba(12,18,34,.5);backdrop-filter:blur(2px);text-align:center}
.hc-over[hidden]{display:none}
.hc-over strong{font-size:36px;color:#fde047;letter-spacing:-.01em;text-shadow:0 3px 0 rgba(0,0,0,.35)}
.hc-over>span{font-size:14px;color:#e2e8f0;max-width:380px;line-height:1.5}
.hc-stats{display:flex;gap:10px}
.hc-stats[hidden]{display:none}
.hc-stats div{background:rgba(15,23,42,.7);border-radius:12px;padding:8px 14px}
.hc-stats small{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;font-weight:700}
.hc-stats b{font:800 18px ui-monospace,monospace;color:#fde047}
.hc-over button{margin-top:4px;padding:11px 22px;font-size:14px}
.hc-pedals{position:absolute;left:12px;right:12px;bottom:12px;display:flex;justify-content:space-between;gap:10px;pointer-events:none;z-index:2}
.hc-pedal{pointer-events:auto;border:0;border-radius:14px;background:rgba(15,23,42,.72);color:#fff;font:800 14px system-ui;padding:16px 22px;cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:none;display:inline-flex;align-items:center;gap:6px}
.hc-pedal.gas{background:rgba(22,163,74,.85)}
.hc-pedal.boost{background:rgba(79,70,229,.85);margin:0 auto}
.hc-pedal.on{transform:scale(.95);filter:brightness(1.25)}
.hc-hint{font-size:12px;color:#94a3b8;margin-top:8px;text-align:center}
.hc kbd{font:700 11px ui-monospace,monospace;background:#1e293b;border:1px solid #334155;border-radius:5px;padding:1px 5px}`,

  js: `var M = Matter, Engine = M.Engine, Render = M.Render, Runner = M.Runner, Bodies = M.Bodies, Body = M.Body,
    Composite = M.Composite, Constraint = M.Constraint, Events = M.Events;

var W = 960, H = 480;
var PX_PER_M = 40;
var FINISH_M = 500;
var engine = Engine.create();
engine.gravity.y = 1;
engine.positionIterations = 10;
engine.velocityIterations = 8;
var render = Render.create({
  element: document.getElementById('hcStage'),
  engine: engine,
  options: { width: W, height: H, wireframes: false, background: 'transparent', pixelRatio: window.devicePixelRatio || 1, hasBounds: true },
});
document.getElementById('hcStage').prepend(render.canvas);
var $ = function (id) { return document.getElementById(id); };

// ---------- Terrain ----------
// Rolling hills from summed sine waves that get steeper with distance. The ground is a chain of thin
// static rectangles, each rotated to match the slope between two sample points (no poly-decomp needed).
var SEG = 40, SEGMENTS = 520;
function groundY(x) {
  var d = Math.max(0, x - 500) / 4000;
  var amp = Math.min(1, d) * 1.6 + 0.25;
  return 360
    - Math.sin(x / 260) * 45 * amp
    - Math.sin(x / 97 + 1.3) * 16 * amp
    - Math.sin(x / 610 + 0.4) * 70 * amp;
}
var terrain = [], groundPts = [];
function buildTerrain() {
  groundPts = [];
  for (var i = 0; i <= SEGMENTS; i++) groundPts.push({ x: i * SEG - 200, y: groundY(i * SEG - 200) });
  for (i = 0; i < SEGMENTS; i++) {
    var a = groundPts[i], b = groundPts[i + 1];
    var len = Math.hypot(b.x - a.x, b.y - a.y);
    var ang = Math.atan2(b.y - a.y, b.x - a.x);
    var cx = (a.x + b.x) / 2 - Math.sin(ang) * -10, cy = (a.y + b.y) / 2 + Math.cos(ang) * 10;
    terrain.push(Bodies.rectangle(cx, cy, len + 2, 20, { isStatic: true, angle: ang, friction: 1, label: 'ground', render: { visible: false } }));
  }
  terrain.push(Bodies.rectangle(-220, 200, 40, 600, { isStatic: true, render: { visible: false } }));
  Composite.add(engine.world, terrain);
}

// ---------- Car ----------
// A chassis, a head and two wheels joined by springy constraints (the suspension). All parts share a negative
// collision group. Driving = easing the wheels' angular velocity; wheel friction does the rest.
var car, chassis, wheelA, wheelB, head;
function buildCar(x, y) {
  var group = Body.nextGroup(true);
  chassis = Bodies.rectangle(x, y, 120, 26, { collisionFilter: { group: group }, density: 0.002, chamfer: { radius: 8 }, label: 'chassis', render: { visible: false } });
  head = Bodies.circle(x - 6, y - 30, 12, { collisionFilter: { group: group }, density: 0.0005, label: 'head', render: { visible: false } });
  wheelA = Bodies.circle(x - 42, y + 24, 21, { collisionFilter: { group: group }, friction: 1, frictionStatic: 10, density: 0.0016, restitution: 0.1, render: { visible: false } });
  wheelB = Bodies.circle(x + 42, y + 24, 21, { collisionFilter: { group: group }, friction: 1, frictionStatic: 10, density: 0.0016, restitution: 0.1, render: { visible: false } });
  function axle(wheel, offX) {
    return [
      Constraint.create({ bodyA: chassis, pointA: { x: offX, y: 10 }, bodyB: wheel, stiffness: 0.3, damping: 0.12, length: 16, render: { visible: false } }),
      Constraint.create({ bodyA: chassis, pointA: { x: offX + (offX < 0 ? 30 : -30), y: 0 }, bodyB: wheel, stiffness: 0.25, damping: 0.1, render: { visible: false } }),
    ];
  }
  var neck = Constraint.create({ bodyA: chassis, pointA: { x: -6, y: -14 }, bodyB: head, stiffness: 0.9, length: 16, render: { visible: false } });
  var neck2 = Constraint.create({ bodyA: chassis, pointA: { x: 14, y: -10 }, bodyB: head, stiffness: 0.9, render: { visible: false } });
  car = Composite.create({ label: 'car' });
  Composite.add(car, [chassis, head, wheelA, wheelB, neck, neck2].concat(axle(wheelA, -42), axle(wheelB, 42)));
  Composite.add(engine.world, car);
}

// ---------- Pickups ----------
var cans = [], coins = [];
function buildPickups() {
  cans = []; coins = [];
  var END = SEGMENTS * SEG - 400;
  for (var x = 1400; x < END; x += 1100 + Math.random() * 500) {
    cans.push(Bodies.rectangle(x, groundY(x) - 34, 24, 30, { isStatic: true, isSensor: true, label: 'fuel', render: { visible: false } }));
  }
  Composite.add(engine.world, cans);
  // Arcs of coins that follow the hills, the middle of each arc floating higher (worth a jump)
  for (var s = 700, id = 0; s < END; s += 520 + Math.random() * 320) {
    var n = 5 + Math.floor(Math.random() * 3);
    for (var j = 0; j < n; j++) {
      var cx = s + j * 38;
      coins.push({ x: cx, y: groundY(cx) - 46 - Math.sin(j / (n - 1) * Math.PI) * 38, taken: false, i: id++ });
    }
  }
}

// ---------- Effects: particles, floating text, screen shake ----------
var particles = [], texts = [], shake = 0;
function burst(x, y, color, n, speed, life, grav) {
  for (var i = 0; i < n && particles.length < 320; i++) {
    var a = Math.random() * Math.PI * 2, v = Math.random() * speed;
    particles.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.6, g: grav, life: life * (0.6 + Math.random() * 0.4), max: life, r: 2 + Math.random() * 2.5, c: color });
  }
}
function floatText(x, y, text, color) { texts.push({ x: x, y: y, text: text, color: color, life: 70 }); }

// ---------- Sound (off until you press the button) ----------
var audio = null, engOsc = null, engGain = null, soundOn = false;
function setSound(on) {
  soundOn = on;
  if (on && !audio) {
    try {
      audio = new (window.AudioContext || window.webkitAudioContext)();
      engOsc = audio.createOscillator(); engOsc.type = 'sawtooth';
      var lp = audio.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
      engGain = audio.createGain(); engGain.gain.value = 0;
      engOsc.connect(lp); lp.connect(engGain); engGain.connect(audio.destination); engOsc.start();
    } catch (e) { audio = null; soundOn = false; }
  }
  if (audio) soundOn ? audio.resume() : engGain.gain.setTargetAtTime(0, audio.currentTime, 0.05);
  $('hcSound').textContent = soundOn ? 'Sound on' : 'Sound off';
  $('hcSound').setAttribute('aria-pressed', String(soundOn));
}
function beep(freq, ms, type, vol) {
  if (!soundOn || !audio) return;
  var o = audio.createOscillator(), g = audio.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(vol || 0.08, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + ms / 1000);
  o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + ms / 1000);
}
function engineSound(drive, boosting) {
  if (!audio || !soundOn) return;
  var t = audio.currentTime;
  engOsc.frequency.setTargetAtTime(48 + Math.abs(chassis.velocity.x) * 13 + (drive ? 28 : 0) + (boosting ? 45 : 0), t, 0.05);
  engGain.gain.setTargetAtTime(over ? 0 : drive ? 0.05 : 0.02, t, 0.08);
}

// ---------- State ----------
var input = { gas: false, brake: false, boost: false };
var fuel, boost, coinCount, bonus, best = 0, over, ready, startX, flippedFor, airSpin, lastAngle, wasAir;
try { best = +localStorage.getItem('hc-best') || 0; } catch (e) {}

function score() { return Math.max(0, Math.round((chassis.position.x - startX) / PX_PER_M)) + coinCount * 10 + bonus; }

function reset(intro) {
  Composite.clear(engine.world, false);
  terrain = []; particles = []; texts = [];
  buildTerrain();
  buildCar(120, groundY(120) - 60);
  buildPickups();
  fuel = 1; boost = 1; coinCount = 0; bonus = 0; shake = 0;
  startX = chassis.position.x; flippedFor = 0; airSpin = 0; lastAngle = 0; wasAir = false;
  over = !!intro; ready = !!intro;
  var ov = $('hcOver');
  if (intro) {
    $('hcOverTitle').textContent = 'Hill Climb';
    $('hcOverText').textContent = 'Reach the ' + FINISH_M + ' m summit. Collect coins and fuel, pull off flips in the air, and keep your head off the ground.';
    $('hcStats').hidden = true;
    $('hcAgain').textContent = 'Start driving';
  }
  ov.hidden = !intro;
}

function gameOver(title, text, win) {
  if (over) return;
  over = true;
  var sc = score(), isBest = sc > best;
  if (isBest) { best = sc; try { localStorage.setItem('hc-best', String(best)); } catch (e) {} }
  if (!win) { shake = 16; burst(chassis.position.x, chassis.position.y, '#f97316', 40, 7, 40, 0.18); burst(chassis.position.x, chassis.position.y, '#fde047', 20, 5, 30, 0.15); beep(110, 450, 'square', 0.1); }
  else { for (var i = 0; i < 4; i++) burst(chassis.position.x + (i - 1.5) * 40, chassis.position.y - 60, ['#fde047', '#f97316', '#38bdf8', '#4ade80'][i], 25, 6, 50, 0.12); beep(660, 300, 'triangle', 0.1); }
  $('hcOverTitle').textContent = title;
  $('hcOverText').textContent = text + (isBest ? ' New best score!' : '');
  var d = Math.max(0, Math.round((chassis.position.x - startX) / PX_PER_M));
  $('hcStats').innerHTML = '<div><small>Distance</small><b>' + d + ' m</b></div><div><small>Coins</small><b>' + coinCount + '</b></div><div><small>Score</small><b>' + sc + '</b></div>';
  $('hcStats').hidden = false;
  $('hcAgain').textContent = 'Drive again';
  setTimeout(function () { $('hcOver').hidden = false; }, win ? 400 : 650);
}
function go() {
  if (ready) { ready = false; over = false; startX = chassis.position.x; $('hcOver').hidden = true; }
  else reset(false);
}

Events.on(engine, 'collisionStart', function (e) {
  e.pairs.forEach(function (p) {
    var labels = [p.bodyA.label, p.bodyB.label];
    var can = p.bodyA.label === 'fuel' ? p.bodyA : p.bodyB.label === 'fuel' ? p.bodyB : null;
    if (can && !can.taken) {
      can.taken = true; fuel = 1; Composite.remove(engine.world, can);
      burst(can.position.x, can.position.y, '#facc15', 18, 4, 30, 0.1);
      floatText(can.position.x, can.position.y - 20, 'Fuel full', '#fde047'); beep(520, 160, 'triangle');
    }
    if (!over && labels.indexOf('head') > -1 && labels.indexOf('ground') > -1) gameOver('Ouch!', 'Your head hit the ground.');
  });
});

function touching(w) { return M.Query.collides(w, terrain).length > 0; }
function landed() {
  if (Math.cos(chassis.angle) > 0 && Math.abs(airSpin) > 5.4) {
    var n = Math.max(1, Math.floor(Math.abs(airSpin) / (Math.PI * 2) + 0.25)), pts = n * 100;
    bonus += pts;
    floatText(chassis.position.x, chassis.position.y - 70, (airSpin > 0 ? 'Front flip' : 'Back flip') + (n > 1 ? ' x' + n : '') + '  +' + pts, '#38bdf8');
    burst(chassis.position.x, chassis.position.y, '#38bdf8', 22, 5, 35, 0.1); beep(740, 220, 'triangle');
  }
}

var MAX_SPIN = 0.42;
Events.on(engine, 'beforeUpdate', function () {
  // Particles and floating text keep moving even after a crash
  for (var i = particles.length - 1; i >= 0; i--) {
    var p = particles[i]; p.x += p.vx; p.y += p.vy; p.vy += p.g; if (--p.life <= 0) particles.splice(i, 1);
  }
  for (i = texts.length - 1; i >= 0; i--) { texts[i].y -= 0.7; if (--texts[i].life <= 0) texts.splice(i, 1); }
  if (over) { engineSound(0, false); return; }

  var drive = fuel > 0 ? (input.gas ? 1 : input.brake ? -1 : 0) : 0;
  var boosting = input.boost && boost > 0 && fuel > 0;
  if (boosting && drive === 0) drive = 1;
  var target = drive * MAX_SPIN * (boosting ? 1.7 : 1);
  var gA = touching(wheelA), gB = touching(wheelB), airborne = !gA && !gB;
  [wheelA, wheelB].forEach(function (w, k) {
    if (drive !== 0) Body.setAngularVelocity(w, w.angularVelocity + (target - w.angularVelocity) * 0.12);
    // dust kicked up by a driven wheel on the ground
    if (drive !== 0 && (k ? gB : gA) && Math.abs(w.angularVelocity) > 0.12 && Math.random() < 0.5) {
      burst(w.position.x - drive * 14, w.position.y + 18, 'rgba(214,186,140,.7)', 1, 1.6, 22, -0.01);
    }
  });
  // In the air the pedals tilt the car, the classic hill-climb trick
  var tilt = fuel > 0 ? (input.gas ? 1 : input.brake ? -1 : 0) : 0;
  if (airborne && tilt !== 0) Body.setAngularVelocity(chassis, chassis.angularVelocity - tilt * 0.006);
  if (boosting) {
    Body.applyForce(chassis, chassis.position, { x: Math.cos(chassis.angle) * 0.006, y: Math.sin(chassis.angle) * 0.006 });
    boost = Math.max(0, boost - 0.0055);
    var bx = chassis.position.x - Math.cos(chassis.angle) * 64, by = chassis.position.y - Math.sin(chassis.angle) * 64 + 6;
    burst(bx, by, Math.random() < 0.5 ? '#fb923c' : '#fde047', 2, 2.2, 16, 0);
  } else boost = Math.min(1, boost + 0.0012);
  if (drive !== 0) fuel = Math.max(0, fuel - (boosting ? 0.0016 : 0.0009));

  // Flip tracking: add up the rotation while both wheels are off the ground
  if (airborne) airSpin += chassis.angle - lastAngle;
  else { if (wasAir) landed(); airSpin = 0; }
  lastAngle = chassis.angle; wasAir = airborne;

  // Coins
  coins.forEach(function (c) {
    if (c.taken || Math.abs(c.x - chassis.position.x) > 90) return;
    var hit = Math.hypot(c.x - chassis.position.x, c.y - chassis.position.y) < 42 ||
      Math.hypot(c.x - wheelA.position.x, c.y - wheelA.position.y) < 34 || Math.hypot(c.x - wheelB.position.x, c.y - wheelB.position.y) < 34;
    if (hit) { c.taken = true; coinCount++; boost = Math.min(1, boost + 0.04); burst(c.x, c.y, '#fde047', 8, 3, 22, 0.05); beep(880 + (coinCount % 5) * 60, 90, 'square', 0.04); }
  });

  var up = Math.cos(chassis.angle);
  flippedFor = up < -0.2 ? flippedFor + 1 : 0;
  if (flippedFor > 90) gameOver('Flipped!', 'Keep the car upright on steep hills.');
  else if (fuel <= 0 && Math.abs(chassis.velocity.x) < 0.05) gameOver('Out of fuel', 'Grab the yellow cans to refuel.');
  else if ((chassis.position.x - startX) / PX_PER_M >= FINISH_M) gameOver('Summit reached!', 'You drove all ' + FINISH_M + ' m.', true);
  engineSound(drive, boosting);
});

// ---------- Camera (eased render.bounds) with screen shake ----------
var cam = { x: 0, y: 0 };
Events.on(render, 'beforeRender', function () {
  var tx = chassis.position.x - W * 0.33 + Math.max(0, chassis.velocity.x) * 6, ty = chassis.position.y - H * 0.6;
  cam.x += (tx - cam.x) * 0.12;
  cam.y += (ty - cam.y) * 0.08;
  shake *= 0.9;
  var sx = (Math.random() - 0.5) * shake, sy = (Math.random() - 0.5) * shake;
  render.bounds.min.x = cam.x + sx; render.bounds.max.x = cam.x + sx + W;
  render.bounds.min.y = cam.y + sy; render.bounds.max.y = cam.y + sy + H;
});

function drawWheel(ctx, w) {
  ctx.save();
  ctx.translate(w.position.x, w.position.y); ctx.rotate(w.angle);
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(0, 0, 21, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 3;
  for (var t = 0; t < 12; t++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(17, 0); ctx.lineTo(21, 0); ctx.stroke(); }
  ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(0, 0, 11, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
  for (var i = 0; i < 3; i++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.stroke(); }
  ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function drawCar(ctx) {
  ctx.save();
  ctx.translate(chassis.position.x, chassis.position.y); ctx.rotate(chassis.angle);
  var g = ctx.createLinearGradient(0, -13, 0, 13); g.addColorStop(0, '#f87171'); g.addColorStop(1, '#b91c1c');
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-60, -13, 120, 26, 8); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(-60, 6, 120, 7);
  ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.roundRect(52, -9, 8, 8, 2); ctx.fill();
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(56, 5, 6, 5);                       // bumper
  ctx.fillStyle = '#334155'; ctx.fillRect(-66, 3, 10, 5);                      // exhaust
  ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(-52, -10, 64, 3);      // shine line
  ctx.fillStyle = '#1f2937'; ctx.fillRect(18, -30, 6, 18);                     // windshield post
  ctx.restore();
  ctx.save();
  ctx.translate(head.position.x, head.position.y); ctx.rotate(chassis.angle);
  ctx.fillStyle = '#fcd34d'; ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(0, -3, 12.5, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#93c5fd'; ctx.fillRect(2, -4, 10, 4);
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(5, 2, 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function hillLayer(ctx, color, par, base, a1, w1, a2, w2, bx) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, H);
  for (var x = 0; x <= W; x += 16) ctx.lineTo(x, base - Math.sin((x + bx * par) / w1) * a1 - Math.sin((x + bx * par) / w2) * a2);
  ctx.lineTo(W, H); ctx.fill();
}

Events.on(render, 'afterRender', function () {
  var ctx = render.context, pr = render.options.pixelRatio, b = render.bounds;
  ctx.save();
  ctx.setTransform(pr, 0, 0, pr, -b.min.x * pr, -b.min.y * pr);
  // Ground fill, a darker lip under the grass, and the grass edge
  var i0 = Math.max(0, Math.floor((b.min.x + 200) / SEG) - 1), i1 = Math.min(groundPts.length - 1, i0 + Math.ceil(W / SEG) + 3);
  ctx.beginPath(); ctx.moveTo(groundPts[i0].x, b.max.y + 50);
  for (var i = i0; i <= i1; i++) ctx.lineTo(groundPts[i].x, groundPts[i].y);
  ctx.lineTo(groundPts[i1].x, b.max.y + 50); ctx.closePath();
  var g = ctx.createLinearGradient(0, b.min.y, 0, b.max.y + 50);
  g.addColorStop(0, '#7c4a1f'); g.addColorStop(1, '#3f2410');
  ctx.fillStyle = g; ctx.fill();
  ctx.beginPath();
  for (i = i0; i <= i1; i++) ctx[i === i0 ? 'moveTo' : 'lineTo'](groundPts[i].x, groundPts[i].y + 11);
  ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath();
  for (i = i0; i <= i1; i++) ctx[i === i0 ? 'moveTo' : 'lineTo'](groundPts[i].x, groundPts[i].y);
  ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 8; ctx.stroke();
  // Distance markers every 50 m, and the finish flag
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = '700 12px system-ui'; ctx.textAlign = 'center';
  for (var m = 50; m < FINISH_M; m += 50) {
    var mx = startX + m * PX_PER_M;
    if (mx < b.min.x - 40 || mx > b.max.x + 40) continue;
    var my = groundY(mx);
    ctx.fillRect(mx - 1.5, my - 44, 3, 44);
    ctx.fillText(m + ' m', mx, my - 50);
  }
  var fx = startX + FINISH_M * PX_PER_M;
  if (fx > b.min.x - 80 && fx < b.max.x + 80) {
    var fy = groundY(fx);
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(fx - 2, fy - 120, 4, 120);
    for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) { ctx.fillStyle = (r + c) % 2 ? '#0f172a' : '#fff'; ctx.fillRect(fx + c * 9, fy - 120 + r * 9, 9, 9); }
  }
  // Fuel cans and spinning coins
  cans.forEach(function (cn) {
    if (cn.taken) return;
    ctx.save(); ctx.translate(cn.position.x, cn.position.y + Math.sin(Date.now() / 250) * 3);
    ctx.fillStyle = '#facc15'; ctx.fillRect(-12, -15, 24, 30);
    ctx.fillStyle = '#b91c1c'; ctx.fillRect(-12, -4, 24, 8);
    ctx.fillStyle = '#facc15'; ctx.fillRect(-4, -21, 8, 6);
    ctx.restore();
  });
  var t = Date.now();
  coins.forEach(function (cn) {
    if (cn.taken || cn.x < b.min.x - 20 || cn.x > b.max.x + 20) return;
    var w = 2 + 8 * Math.abs(Math.cos(t / 260 + cn.i * 0.7));
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.ellipse(cn.x, cn.y, w + 1.5, 10.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.ellipse(cn.x, cn.y, w, 8.5, 0, 0, Math.PI * 2); ctx.fill();
  });
  // Particles (dust, flames, sparks) behind the car, then the car
  particles.forEach(function (p) {
    ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.c;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
  drawWheel(ctx, wheelA); drawWheel(ctx, wheelB); drawCar(ctx);
  // Floating texts
  ctx.font = '800 15px system-ui'; ctx.textAlign = 'center';
  texts.forEach(function (tx) {
    ctx.globalAlpha = Math.min(1, tx.life / 25); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillText(tx.text, tx.x + 1, tx.y + 2);
    ctx.fillStyle = tx.color; ctx.fillText(tx.text, tx.x, tx.y);
  });
  ctx.restore();

  // Background, painted behind everything drawn so far (nearest layer first)
  ctx.save();
  ctx.setTransform(pr, 0, 0, pr, 0, 0);
  ctx.globalCompositeOperation = 'destination-over';
  hillLayer(ctx, '#3f7d5a', 0.5, 305, 24, 150, 9, 47, b.min.x);
  hillLayer(ctx, '#6f9bc2', 0.22, 235, 55, 210, 18, 90, b.min.x);
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  for (var k = 0; k < 5; k++) {
    var cx = (((k * 300 - b.min.x * 0.12) % (W + 300)) + (W + 300)) % (W + 300) - 150, cy = 55 + (k * 37) % 70;
    ctx.beginPath(); ctx.ellipse(cx, cy, 46, 14, 0, 0, Math.PI * 2); ctx.ellipse(cx + 28, cy - 9, 30, 13, 0, 0, Math.PI * 2); ctx.ellipse(cx - 26, cy - 5, 26, 11, 0, 0, Math.PI * 2); ctx.fill();
  }
  var sun = ctx.createRadialGradient(W * 0.78, 90, 4, W * 0.78, 90, 120);
  sun.addColorStop(0, 'rgba(255,251,190,1)'); sun.addColorStop(0.25, 'rgba(254,240,138,.85)'); sun.addColorStop(1, 'rgba(254,240,138,0)');
  ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);
  var sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#0ea5e9'); sky.addColorStop(1, '#bae6fd');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // HUD
  var dist = Math.max(0, Math.round((chassis.position.x - startX) / PX_PER_M)), sc = score();
  if (!over && sc > best) best = sc;
  $('hcDist').textContent = dist + ' m';
  $('hcCoins').textContent = coinCount;
  $('hcScore').textContent = sc;
  $('hcBest').textContent = best;
  $('hcFuel').style.width = (fuel * 100).toFixed(1) + '%';
  $('hcBoost').style.width = (boost * 100).toFixed(1) + '%';
  $('hcProg').style.width = Math.min(100, dist / FINISH_M * 100).toFixed(1) + '%';
});

// ---------- Input ----------
function syncPedals() {
  $('hcGas').classList.toggle('on', input.gas);
  $('hcBrake').classList.toggle('on', input.brake);
  $('hcBoostBtn').classList.toggle('on', input.boost);
}
function key(e, down) {
  var k = e.key.toLowerCase(), hit = false;
  if (k === 'arrowright' || k === 'd') { input.gas = down; hit = true; }
  if (k === 'arrowleft' || k === 'a') { input.brake = down; hit = true; }
  if (k === 'arrowup' || k === 'w' || k === ' ' || k === 'shift') { input.boost = down; hit = true; }
  if (down && k === 'r') { reset(false); hit = true; }
  if (down && ready && (k === 'enter' || k === ' ' || k === 'arrowright' || k === 'd')) go();
  if (hit) e.preventDefault();
  syncPedals();
}
document.addEventListener('keydown', function (e) { key(e, true); });
document.addEventListener('keyup', function (e) { key(e, false); });
window.addEventListener('blur', function () { input.gas = input.brake = input.boost = false; syncPedals(); });
[['hcGas', 'gas'], ['hcBrake', 'brake'], ['hcBoostBtn', 'boost']].forEach(function (p) {
  var el = $(p[0]);
  el.addEventListener('pointerdown', function (e) { input[p[1]] = true; el.setPointerCapture(e.pointerId); syncPedals(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { el.addEventListener(t, function () { input[p[1]] = false; syncPedals(); }); });
});
$('hcReset').addEventListener('click', function () { reset(false); });
$('hcAgain').addEventListener('click', go);
$('hcSound').addEventListener('click', function () { setSound(!soundOn); });

reset(true);
Render.run(render);
Runner.run(Runner.create(), engine);`,

  seo: {
    title: 'Matter.js Hill Climb Car Game — Boost, Coins and Flips',
    description: `Play a Hill Climb Racing-style game in Matter.js: sprung car, nitro boost, coins, flip bonuses, fuel cans, a 500 m summit and engine sound. Plain JavaScript.`,
    about: {
      title: 'Matter.js Hill Climb Car — Suspension, Boost, Coins, Flip Tricks and a Parallax World',
      description: `Hill Climb Racing's charm is pure physics: a floppy little car, bumpy hills and a driver whose head must never touch the ground. This snippet rebuilds that loop with Matter.js and turns it into a complete game with a start screen, a 500 m summit to reach, coins, a nitro boost, flip bonuses, dust and flame particles, screen shake, a parallax landscape and optional engine sound. Everything is plain JavaScript on one canvas.

**The car: three bodies and some springs**

The chassis is a chamfered rectangle; each wheel is a circle joined to it by **two constraints**, a soft short spring from above (the suspension) and a diagonal one that stops the wheel sliding along the body. A small head body sits on a stiff neck. All parts share a negative collision group from \`Body.nextGroup(true)\`, so wheels never collide with their own chassis. The car is drawn by hand each frame from the bodies' positions and angles.

**Driving by spinning wheels, and boost**

The engine never pushes the car. While a pedal is held, the wheels' angular velocity is eased toward a maximum with \`Body.setAngularVelocity\`, and wheel friction turns that spin into motion. Boost raises the target spin by 70% and adds a forward force along the chassis. It drains its own meter in about three seconds and refills slowly; collecting a coin gives a little back. Flame particles stream from the exhaust while it burns.

**Air control and flip bonuses**

When neither wheel touches the terrain (\`Query.collides\`), the pedals tilt the chassis instead of driving. While airborne, the game adds up the chassis rotation each step; if you land upright after turning roughly a full revolution, you earn 100 points per flip with a "Front flip" or "Back flip" popup. Landing upside down just counts as a crash.

**Coins, fuel and the finish**

Coin arcs follow the hills, and the middle of each arc floats high enough to reward a jump. Coins are plain objects checked by distance, so there are no extra physics bodies; the fuel cans are static sensors. Fuel drains while a pedal is held, a can refills it, and the run ends when your head hits the ground, you are upside down for 1.5 seconds, you stop with an empty tank, or you pass 500 m and reach the checkered flag. The score is distance plus 10 per coin plus flip bonuses, and your best is saved in localStorage.

**Terrain without poly-decomp**

Hills are summed sine waves whose amplitude grows with distance. Instead of one huge concave body, the ground is 520 thin static rectangles, each rotated to the slope between two sample points. The visible ground is drawn separately as a filled path with a dark lip and a grass stroke.

**Camera, parallax and feel**

With \`hasBounds: true\`, the renderer only draws what is inside \`render.bounds\`. Each frame the bounds ease toward the car, leading slightly in the direction of travel, and crashes add a decaying shake. The sun, clouds and two hill layers are painted last with \`destination-over\` at different scroll speeds, so they sit behind the world and give depth.

**Sound and controls**

Sound is off until you press the button, which is also what lets browsers start audio. An oscillator through a low-pass filter follows the car's speed and throttle, and short beeps mark coins, fuel, flips and crashes. Keyboard, on-screen touch pedals and a restart key are all supported.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Press Start driving', text: `The start card lists the goal: reach the 500 m summit. Press the button, Enter or → to begin.` },
      { title: 'Gas, brake and boost', text: `Hold → or D for gas, ← or A to brake and reverse, and ↑, W or Space for nitro. On a phone use the three on-screen pedals.` },
      { title: 'Lean in the air', text: `With both wheels off the ground the pedals tilt the car. Rotate a full turn and land upright for +100 flip points.` },
      { title: 'Collect coins and fuel', text: `Coins add 10 points each and a little boost. Yellow cans refill the tank, so plan your throttle between them.` },
      { title: 'Watch the progress bar', text: `The bar along the top of the stage shows how far you are from the checkered flag at 500 m.` },
      { title: 'Beat your best', text: `Press R to restart at any time. Your best score is remembered, and the Sound button adds engine noise and effects.` },
    ] },
    features: [
      { title: 'Sprung suspension', text: `Two constraints per wheel give a soft spring and a diagonal locator.` },
      { title: 'Nitro boost with a meter', text: `Boost raises wheel spin and adds a forward force, drains in about 3 seconds and recharges slowly.` },
      { title: 'Flip bonuses', text: `Rotation is summed while airborne and rewarded on an upright landing with floating popups.` },
      { title: 'Coins and fuel cans', text: `Distance-checked coin arcs follow the hills, and sensor fuel cans refill the tank.` },
      { title: '500 m summit', text: `A progress bar, distance markers every 50 m and a checkered flag give the run a goal.` },
      { title: 'Particles and shake', text: `Dust, exhaust flames, sparkles, crash debris and a decaying screen shake add feel.` },
      { title: 'Parallax world', text: `Sun, clouds and two hill layers scroll at different speeds behind the ground.` },
      { title: 'Sound, touch and saved best', text: `Optional engine audio, three pointer-captured pedals and a best score kept in localStorage.` },
    ],
    useCases: [
      { title: 'Weekend game-jam starter', text: 'Reskin the car, hills and pickups to ship a full driving game quickly. The start screen, fuel, coins, boost and game-over flow are already wired together.' },
      { title: 'Vehicle physics lesson', text: 'Teach suspension, traction and torque with a car students can poke at. Changing a constraint\'s stiffness, the wheel friction or the boost force shows its effect immediately.' },
      { title: 'Game-feel reference', text: 'Study how particles, screen shake, a leading camera, floating text and sound turn a physics demo into something satisfying to play.' },
      { title: 'Procedural terrain experiments', text: 'Swap the summed-sine height function for craters, deserts or an endless climb, and see how the rotated-segment ground handles any curve.' },
      { title: 'Playable portfolio demo', text: 'Show interactive physics skill with a game people can actually drive, then walk through the constraints, flip detection and camera code in an interview.' },
    ],
    faqs: [
      { q: 'How do I build a car in Matter.js?', a: `Make a chassis body and two circle wheels, connect each wheel with Constraints (a soft spring for suspension plus one to hold its position) and put all parts in one negative collision group. Drive by easing the wheels' angular velocity toward a target.` },
      { q: 'How do the flip bonuses work?', a: `While both wheels are off the terrain, the game adds the change in chassis angle each step into airSpin. When a wheel touches down, if the car is upright and the total passed about 5.4 radians (almost a full turn), it awards 100 points per revolution and shows a popup. The sign of airSpin decides between front and back flip.` },
      { q: 'How is the boost implemented?', a: `While the boost key is held and the meter has charge, the target wheel spin is multiplied by 1.7 and Body.applyForce pushes the chassis along its heading. The meter drains a little each step and recharges when you release, so it works as a short burst you spend on hills.` },
      { q: 'How do I make a camera follow a body?', a: `Create the renderer with hasBounds: true and update render.bounds.min and max every frame in beforeRender to centre on the body. Easing toward the target keeps it smooth, and adding a little velocity-based lead shows more of what is ahead.` },
      { q: 'Why is the sound off by default?', a: `Browsers only allow audio to start after a user gesture, so the Sound button creates the AudioContext when pressed. An oscillator through a low-pass filter plays the engine, and its pitch follows speed and throttle.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain how the two constraints per wheel make the suspension, or how airSpin and landed() turn rotation into flip bonuses. Since boost, coins, fuel, a finish line, particles, shake, parallax and sound already exist, ask for what is missing: an upgrade shop that spends coins on engine, tyres and fuel tank, new vehicles such as a bike or a monster truck, terrain generated in chunks so it never ends, a ghost of your best run, a combo multiplier for chained flips, or a day-to-night cycle with headlights. It can also help retune the handling for steeper maps.`,
      prompt: `Build a Hill Climb Racing-style game with Matter.js 0.20 (from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Terrain: a height function of summed sine waves that steepens with distance, built from thin static rectangles rotated to each segment's slope, drawn as a filled brown path with a darker lip and a green grass edge. A 500 m finish with a checkered flag, distance markers every 50 m and a progress bar.
- Car: a rounded chassis, two high-friction circle wheels each joined by a soft suspension spring and a diagonal locating constraint, and a head body on a stiff neck, all in one negative collision group. Draw the car, wheels and driver by hand from the bodies each frame.
- Driving by easing the wheels' angular velocity toward a target (gas, brake/reverse). Nitro boost on Up/W/Space: multiply the target by 1.7 and apply a forward force along the chassis, with its own meter that drains in about 3 seconds and recharges slowly. When both wheels are airborne (Query.collides), gas and brake tilt the chassis instead.
- Flip tracking: sum the chassis rotation while airborne and, on an upright landing after nearly a full turn, award 100 points per revolution with a floating "Front flip"/"Back flip" popup.
- Pickups: coin arcs that follow the hills (checked by distance, no bodies; each gives 10 points and a bit of boost) and static sensor fuel cans that refill the tank. Fuel drains while driving.
- Effects: dust from driven wheels, exhaust flames while boosting, sparkles on pickups, crash debris and a decaying screen shake. A follow camera using hasBounds and render.bounds that leads slightly ahead, with a parallax sun, clouds and two hill layers painted with destination-over.
- Game flow: a start card, game over when the head hits the ground, the car is upside down for 1.5 s or it stops with no fuel, and a win at 500 m. A results card shows distance, coins and score; the best score is saved in localStorage with try/catch.
- HUD for distance, coins, score, best, fuel and boost. Keyboard (arrows/A/D, Up/W/Space, R) and three on-screen touch pedals using pointer capture.
- An optional sound toggle (off by default): an oscillator through a low-pass filter for the engine, with pitch following speed and throttle, plus short beeps for coins, fuel, flips and crashes.`,
    },
  },
};

export default matterJsHillClimbCar;
