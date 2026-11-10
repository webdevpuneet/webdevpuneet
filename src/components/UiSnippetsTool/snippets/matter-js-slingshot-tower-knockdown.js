const matterJsSlingshotTowerKnockdown = {
  id: 'matter-js-slingshot-tower-knockdown',
  title: 'Matter.js Slingshot Tower Knockdown Game',
  lastmod: '2026-11-10',
  category: 'games',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js',
  ],
  html: `<div class="sl">
  <div class="sl-hud">
    <div><span>Level</span><b id="slLevel">1 / 3</b></div>
    <div><span>Critters</span><b id="slTargets">0</b></div>
    <div><span>Stones</span><i class="sl-stones" id="slStones"></i></div>
    <div><span>Score</span><b id="slScore">0</b></div>
    <div class="sl-btns"><button type="button" id="slRetry">Retry level</button></div>
  </div>
  <div class="sl-stage" id="slStage">
    <div class="sl-over" id="slOver">
      <strong id="slOverTitle">Slingshot Tower</strong>
      <div class="sl-stars" id="slStars" hidden></div>
      <span id="slOverText">Pop every green critter before you run out of stones. Drag the stone back, follow the dotted line, then let go.</span>
      <button type="button" id="slGo">Play</button>
    </div>
  </div>
  <p class="sl-hint">Pull back up to 130 px. The dotted line shows the exact path. Glass shatters, stone is heavy, wood is in between.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:linear-gradient(#bae6fd,#e0f2fe);color:#0c4a6e;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:18px}
.sl{width:100%;max-width:1000px}
.sl-hud{display:flex;align-items:center;gap:20px;margin-bottom:10px;flex-wrap:wrap}
.sl-hud>div{display:flex;flex-direction:column;gap:3px}
.sl-hud span{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:#0369a1}
.sl-hud b{font:800 20px ui-monospace,monospace;font-variant-numeric:tabular-nums;color:#0c4a6e}
.sl-stones{display:flex;gap:5px;height:20px;align-items:center}
.sl-stones u{width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#a8a29e,#44403c);transition:opacity .25s,transform .25s}
.sl-stones u.used{opacity:.18;transform:scale(.7)}
.sl-btns{margin-left:auto;display:flex!important;flex-direction:row!important}
.sl button{border:0;border-radius:10px;background:#0c4a6e;color:#fff;font:700 13px system-ui;padding:9px 14px;cursor:pointer}
.sl button:hover{background:#075985}
.sl button:focus-visible{outline:2px solid #f59e0b;outline-offset:2px}
.sl-stage{position:relative;border-radius:18px;overflow:hidden;background:#7dd3fc;border:1px solid #7dd3fc;box-shadow:0 12px 30px rgba(12,74,110,.18)}
.sl-stage canvas{display:block;width:100%;height:auto;cursor:grab;touch-action:none}
.sl-stage canvas:active{cursor:grabbing}
.sl-over{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:24px;text-align:center;background:rgba(12,74,110,.38);backdrop-filter:blur(2px)}
.sl-over[hidden]{display:none}
.sl-over strong{font-size:36px;color:#fff;letter-spacing:-.01em;text-shadow:0 3px 0 rgba(12,74,110,.5)}
.sl-over>span{font-size:14px;color:#f0f9ff;max-width:400px;line-height:1.5}
.sl-stars{font-size:38px;letter-spacing:6px;color:#fbbf24;text-shadow:0 2px 0 rgba(120,53,15,.5)}
.sl-stars[hidden]{display:none}
.sl-stars s{text-decoration:none;color:rgba(255,255,255,.35)}
.sl-over button{margin-top:4px;padding:11px 24px;font-size:14px;background:#f59e0b;color:#1c1917}
.sl-over button:hover{background:#fbbf24}
.sl-hint{font-size:12.5px;margin-top:8px;text-align:center;color:#0369a1}`,

  js: `var M = Matter, Engine = M.Engine, Render = M.Render, Runner = M.Runner, Bodies = M.Bodies, Body = M.Body,
    Composite = M.Composite, Composites = M.Composites, Constraint = M.Constraint, Mouse = M.Mouse, MouseConstraint = M.MouseConstraint, Events = M.Events;
var $ = function (id) { return document.getElementById(id); };

var W = 1000, H = 540, GROUND = H - 30;
var ANCHOR = { x: 190, y: 360 };
var PLAT = { x: 720, w: 300 }, PT = 371;        // platform centre x / width, and the y of its top surface
var MAX_PULL = 130, POWER = 0.12;               // launch speed = pull distance * POWER (pixels per physics step)
var GRAV = 0.2778, AIR = 0.004;                 // what Matter applies per step: used for the dotted preview

var engine = Engine.create();
var render = Render.create({
  element: $('slStage'), engine: engine,
  options: { width: W, height: H, wireframes: false, background: 'transparent', pixelRatio: window.devicePixelRatio || 1 },
});
$('slStage').prepend(render.canvas);

// Every body is drawn by hand (afterRender), so Matter's own drawing is switched off via render.visible = false.
var hide = { visible: false };
Composite.add(engine.world, [
  Bodies.rectangle(W / 2, GROUND + 60, W * 3, 120, { isStatic: true, render: hide, plugin: { kind: 'ground' } }),
  Bodies.rectangle(PLAT.x, PT + 9, PLAT.w, 18, { isStatic: true, render: hide, plugin: { kind: 'platform' } }),
  Bodies.rectangle(PLAT.x, PT + 9 + 79, 28, 140, { isStatic: true, render: hide, plugin: { kind: 'post' } }),
]);

// ---------- Materials: wood, stone and glass differ in weight and fragility ----------
var MAT = { wood: { density: 0.0016, friction: 0.6 }, stone: { density: 0.004, friction: 0.7 }, glass: { density: 0.0009, friction: 0.4 } };
function block(kind, dx, bottom, w, h) {
  return Bodies.rectangle(PLAT.x + dx, PT - bottom - h / 2, w, h, { density: MAT[kind].density, friction: MAT[kind].friction, restitution: 0.05, render: hide, plugin: { kind: kind, w: w, h: h } });
}
function critter(dx, bottom) {
  return Bodies.circle(PLAT.x + dx, PT - bottom - 16, 16, { density: 0.001, friction: 0.5, restitution: 0.2, render: hide, plugin: { kind: 'target', blink: Math.random() * 200 } });
}

// ---------- Levels ----------
var LEVELS = [
  { stones: 4, build: function () { return [
    block('wood', -52, 0, 16, 64), block('wood', 52, 0, 16, 64), block('wood', 0, 64, 132, 16),
    critter(0, 0), critter(0, 80),
  ]; } },
  { stones: 5, build: function () { return [
    block('wood', -110, 0, 16, 60), block('wood', -50, 0, 16, 60), block('stone', -80, 60, 84, 14),
    block('glass', -95, 74, 12, 42), block('glass', -65, 74, 12, 42), block('wood', -80, 116, 70, 12),
    critter(-80, 0), critter(-80, 128),
    block('wood', 50, 0, 16, 84), block('wood', 110, 0, 16, 84), block('wood', 80, 84, 90, 14),
    critter(80, 0), critter(80, 98),
  ]; } },
  { stones: 5, build: function () {
    var pyr = Composites.pyramid(PLAT.x - 112, PT - 128, 7, 4, 0, 0, function (x, y, col, row) {
      var kind = row === 3 ? 'stone' : row === 2 ? 'wood' : 'glass';
      return Bodies.rectangle(x, y, 32, 32, { density: MAT[kind].density, friction: MAT[kind].friction, restitution: 0.05, render: hide, plugin: { kind: kind, w: 32, h: 32 } });
    });
    return Composite.allBodies(pyr).concat([critter(0, 128), critter(-134, 0), critter(134, 0)]);
  } },
];

// ---------- State ----------
var stone = null, elastic, level = 0, score = 0, levelStartScore = 0, stonesLeft = 0, targetsLeft = 0;
var state = 'intro', lastShotAt = 0, particles = [], texts = [], shake = 0;

// The sling band is drawn by hand; the spring only holds the stone at rest between shots.
elastic = Constraint.create({ pointA: ANCHOR, pointB: { x: 0, y: 0 }, length: 0.01, damping: 0.01, stiffness: 0.05, render: hide });
Composite.add(engine.world, elastic);

var mouse = Mouse.create(render.canvas);
var mc = MouseConstraint.create(engine, { mouse: mouse, constraint: { stiffness: 0.9, damping: 0.1, render: hide } });
['mousewheel', 'DOMMouseScroll', 'wheel'].forEach(function (t) { mouse.element.removeEventListener(t, mouse.mousewheel); });
Composite.add(engine.world, mc);
render.mouse = mouse;

function hud() {
  $('slLevel').textContent = (level + 1) + ' / ' + LEVELS.length;
  $('slTargets').textContent = targetsLeft;
  $('slScore').textContent = score;
  var total = LEVELS[level].stones, html = '';
  for (var i = 0; i < total; i++) html += '<u class="' + (i < total - stonesLeft ? 'used' : '') + '"></u>';
  $('slStones').innerHTML = html;
}

function loadStone() {
  if (stonesLeft <= 0) { stone = null; return; }
  stone = Bodies.circle(ANCHOR.x, ANCHOR.y, 20, { density: 0.004, restitution: 0.2, frictionAir: AIR, render: hide, plugin: { kind: 'ammo', born: performance.now() } });
  Composite.add(engine.world, stone);
  elastic.bodyB = stone; elastic.pointB = { x: 0, y: 0 }; elastic.angleB = stone.angle;   // a spring created without a body needs its angle set when one is attached
}

function loadLevel(n) {
  level = n; levelStartScore = score;
  Composite.allBodies(engine.world).forEach(function (b) { if (!b.isStatic) Composite.remove(engine.world, b); });
  elastic.bodyB = null; stone = null; particles = []; texts = [];
  var bodies = LEVELS[n].build();
  Composite.add(engine.world, bodies);
  targetsLeft = bodies.filter(function (b) { return b.plugin.kind === 'target'; }).length;
  stonesLeft = LEVELS[n].stones;
  lastShotAt = 0;
  loadStone(); hud();
}

// ---------- Effects ----------
function burst(x, y, colors, n, speed, life, grav, size) {
  for (var i = 0; i < n && particles.length < 260; i++) {
    var a = Math.random() * Math.PI * 2, v = 1 + Math.random() * speed;
    particles.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, g: grav, life: life * (0.6 + Math.random() * 0.4), max: life, r: (size || 3) * (0.6 + Math.random() * 0.7), c: colors[i % colors.length], rot: Math.random() * 6 });
  }
}
function floatText(x, y, text) { texts.push({ x: x, y: y, text: text, life: 60 }); }

function pop(t) {
  if (t.dead) return; t.dead = true;
  Composite.remove(engine.world, t);
  targetsLeft--; score += 500;
  burst(t.position.x, t.position.y, ['#86efac', '#22c55e', '#ffffff', '#bbf7d0'], 22, 5, 36, 0.12, 4);
  floatText(t.position.x, t.position.y - 24, '+500');
  shake = Math.max(shake, 7);
  hud();
}
function shatter(g) {
  if (g.dead) return; g.dead = true;
  Composite.remove(engine.world, g);
  score += 50;
  burst(g.position.x, g.position.y, ['#bfdbfe', '#e0f2fe', '#ffffff', '#93c5fd'], 16, 6, 34, 0.2, 3);
  hud();
}

Events.on(engine, 'collisionStart', function (ev) {
  ev.pairs.forEach(function (p) {
    var a = p.bodyA, b = p.bodyB;
    var sp = Math.hypot(a.velocity.x - b.velocity.x, a.velocity.y - b.velocity.y);
    [[a, b], [b, a]].forEach(function (pr) {
      var me = pr[0], other = pr[1];
      if (me.plugin.kind === 'target' && sp > (other.isStatic ? 7.5 : 3.6)) pop(me);
      else if (me.plugin.kind === 'glass' && sp > (other.isStatic ? 6.5 : 4.2)) shatter(me);
    });
    if (sp > 6) { shake = Math.max(shake, Math.min(10, sp * 0.45)); if (a.isStatic || b.isStatic) burst((a.position.x + b.position.x) / 2, Math.min(a.position.y, b.position.y), ['#d6c4a1', '#a8946a'], 4, 2, 22, 0.02, 3); }
  });
});

// ---------- Aiming and launching ----------
// Dragging the stone back stretches the band. On release the velocity is set straight from the pull
// (launch speed = distance * POWER), which is what makes the dotted preview exactly right.
Events.on(mc, 'startdrag', function (e) {
  if (e.body !== stone) { mc.body = null; mc.constraint.bodyB = null; }
});
Events.on(mc, 'enddrag', function (e) {
  if (e.body !== stone || !stone || state !== 'play') return;
  var dx = ANCHOR.x - stone.position.x, dy = ANCHOR.y - stone.position.y, d = Math.hypot(dx, dy);
  if (d < 28) return;                                   // barely pulled: let the spring take it back
  elastic.bodyB = null;
  Body.setVelocity(stone, { x: dx * POWER, y: dy * POWER });
  stone = null; stonesLeft--; lastShotAt = performance.now();
  burst(ANCHOR.x, ANCHOR.y, ['#fde68a', '#ffffff'], 6, 2, 14, 0, 2);
  hud();
  setTimeout(loadStone, 900);
});

Events.on(engine, 'beforeUpdate', function () {
  // keep the pull inside MAX_PULL
  if (stone && mc.body === stone) {
    var dx = stone.position.x - ANCHOR.x, dy = stone.position.y - ANCHOR.y, d = Math.hypot(dx, dy);
    if (d > MAX_PULL) Body.setPosition(stone, { x: ANCHOR.x + dx / d * MAX_PULL, y: ANCHOR.y + dy / d * MAX_PULL });
  }
  for (var i = particles.length - 1; i >= 0; i--) {
    var p = particles[i]; p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += 0.2; if (--p.life <= 0) particles.splice(i, 1);
  }
  for (i = texts.length - 1; i >= 0; i--) { texts[i].y -= 0.8; if (--texts[i].life <= 0) texts.splice(i, 1); }
});

// ---------- Win / lose ----------
function finish(won) {
  state = won ? 'won' : 'lost';
  if (won) {
    var bonus = stonesLeft * 300; score += bonus;
    var stars = stonesLeft >= 2 ? 3 : stonesLeft === 1 ? 2 : 1;
    $('slStars').innerHTML = [1, 2, 3].map(function (n) { return n <= stars ? '&#9733;' : '<s>&#9733;</s>'; }).join('');
    $('slStars').hidden = false;
    $('slOverTitle').textContent = level === LEVELS.length - 1 ? 'Tower conquered!' : 'Level cleared!';
    $('slOverText').textContent = stonesLeft ? 'Bonus +' + bonus + ' for ' + stonesLeft + ' unused stone' + (stonesLeft > 1 ? 's' : '') + '. Score ' + score + '.' : 'Score ' + score + '.';
    $('slGo').textContent = level === LEVELS.length - 1 ? 'Play again' : 'Next level';
    for (var i = 0; i < 5; i++) burst(300 + i * 130, 120, ['#fde047', '#f97316', '#38bdf8', '#4ade80'], 24, 6, 60, 0.12, 4);
    hud();
  } else {
    $('slStars').hidden = true;
    $('slOverTitle').textContent = 'Out of stones';
    $('slOverText').textContent = targetsLeft + ' critter' + (targetsLeft > 1 ? 's' : '') + ' left. Try a different angle.';
    $('slGo').textContent = 'Try again';
  }
  setTimeout(function () { $('slOver').hidden = false; }, won ? 900 : 500);
}
function settled() {
  return Composite.allBodies(engine.world).every(function (b) { return b.isStatic || Math.hypot(b.velocity.x, b.velocity.y) < 0.25; });
}
Events.on(engine, 'afterUpdate', function () {
  var now = performance.now();
  if (state === 'play') {
    if (targetsLeft <= 0) finish(true);
    else if (stonesLeft <= 0 && !stone && lastShotAt && now - lastShotAt > 2200 && (settled() || now - lastShotAt > 7000)) finish(false);
  }
  // remove stones that left the scene or have been lying around for a while
  Composite.allBodies(engine.world).forEach(function (b) {
    if (b.plugin.kind === 'ammo' && b !== stone && (b.position.x > W + 200 || b.position.y > H + 200 || now - b.plugin.born > 9000)) Composite.remove(engine.world, b);
  });
});

function go() {
  $('slOver').hidden = true;
  if (state === 'intro') { state = 'play'; return; }
  if (state === 'won') {
    if (level === LEVELS.length - 1) { score = 0; loadLevel(0); } else loadLevel(level + 1);
  } else { score = levelStartScore; loadLevel(level); }
  state = 'play';
}
$('slGo').addEventListener('click', go);
$('slRetry').addEventListener('click', function () { score = levelStartScore; loadLevel(level); state = 'play'; $('slOver').hidden = true; });

// ---------- Drawing ----------
function poly(ctx, b) {
  ctx.beginPath();
  b.vertices.forEach(function (v, i) { ctx[i ? 'lineTo' : 'moveTo'](v.x, v.y); });
  ctx.closePath();
}
function drawBody(ctx, b) {
  var k = b.plugin.kind;
  if (k === 'wood') {
    poly(ctx, b); ctx.fillStyle = '#e8962f'; ctx.fill(); ctx.strokeStyle = '#8a4b0f'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.save(); ctx.translate(b.position.x, b.position.y); ctx.rotate(b.angle);
    ctx.strokeStyle = 'rgba(138,75,15,.35)'; ctx.lineWidth = 1; ctx.beginPath();
    if (b.plugin.w >= b.plugin.h) { ctx.moveTo(-b.plugin.w / 2 + 4, 0); ctx.lineTo(b.plugin.w / 2 - 4, 0); } else { ctx.moveTo(0, -b.plugin.h / 2 + 4); ctx.lineTo(0, b.plugin.h / 2 - 4); }
    ctx.stroke(); ctx.restore();
  } else if (k === 'stone') {
    poly(ctx, b); ctx.fillStyle = '#94a3b8'; ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
    ctx.save(); ctx.translate(b.position.x, b.position.y); ctx.rotate(b.angle);
    ctx.strokeStyle = 'rgba(71,85,105,.45)'; ctx.lineWidth = 1.2; ctx.beginPath();
    ctx.moveTo(-b.plugin.w * 0.25, -b.plugin.h * 0.2); ctx.lineTo(-b.plugin.w * 0.05, b.plugin.h * 0.1); ctx.lineTo(b.plugin.w * 0.2, -b.plugin.h * 0.05); ctx.stroke(); ctx.restore();
  } else if (k === 'glass') {
    poly(ctx, b); ctx.fillStyle = 'rgba(186,230,253,.7)'; ctx.fill(); ctx.strokeStyle = '#f0f9ff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(b.vertices[0].x + 3, b.vertices[0].y + 6); ctx.lineTo(b.vertices[0].x + 8, b.vertices[0].y + 2); ctx.stroke();
  } else if (k === 'platform' || k === 'post') {
    poly(ctx, b); ctx.fillStyle = k === 'post' ? '#92400e' : '#a8641a'; ctx.fill(); ctx.strokeStyle = '#5b3410'; ctx.lineWidth = 2; ctx.stroke();
  } else if (k === 'target') {
    var p = b.position, blink = ((performance.now() / 16 + b.plugin.blink) % 220) < 6;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(b.angle);
    var g = ctx.createRadialGradient(-5, -6, 2, 0, 0, 17); g.addColorStop(0, '#bbf7d0'); g.addColorStop(1, '#16a34a');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#14532d'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(-5.5, -3, 4, blink ? 0.8 : 4.4, 0, 0, Math.PI * 2); ctx.ellipse(5.5, -3, 4, blink ? 0.8 : 4.4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#052e16'; if (!blink) { ctx.beginPath(); ctx.arc(-5, -2.5, 1.8, 0, Math.PI * 2); ctx.arc(6, -2.5, 1.8, 0, Math.PI * 2); ctx.fill(); }
    ctx.strokeStyle = '#14532d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-9, -9); ctx.lineTo(-2, -7); ctx.moveTo(9, -9); ctx.lineTo(2, -7); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 6, 4, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
    ctx.restore();
  }
}
function drawStone(ctx, s) {
  var r = 20 * Math.min(1, (performance.now() - s.plugin.born) / 220 + 0.2);
  ctx.save(); ctx.translate(s.position.x, s.position.y); ctx.rotate(s.angle);
  var g = ctx.createRadialGradient(-6, -7, 2, 0, 0, r); g.addColorStop(0, '#a8a29e'); g.addColorStop(1, '#44403c');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-r * 0.5, r * 0.1); ctx.lineTo(0, -r * 0.2); ctx.lineTo(r * 0.4, r * 0.3); ctx.stroke();
  ctx.restore();
}
function band(ctx, from, to) {
  ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
}
// Painted with destination-over, so each layer goes BEHIND the previous one: nearest first, sky last
function background(ctx, t) {
  var gr = ctx.createLinearGradient(0, GROUND, 0, H); gr.addColorStop(0, '#65a30d'); gr.addColorStop(0.18, '#4d7c0f'); gr.addColorStop(0.2, '#7c4a1f'); gr.addColorStop(1, '#5b3410');
  ctx.fillStyle = gr; ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.fillStyle = '#6aa57c'; ctx.beginPath(); ctx.moveTo(0, GROUND);
  for (var x = 0; x <= W; x += 20) ctx.lineTo(x, 445 - Math.sin(x / 90 + 3) * 22 - Math.sin(x / 37) * 7);
  ctx.lineTo(W, GROUND); ctx.fill();
  ctx.fillStyle = '#86b9a1'; ctx.beginPath(); ctx.moveTo(0, GROUND);
  for (x = 0; x <= W; x += 20) ctx.lineTo(x, 400 - Math.sin(x / 150 + 1) * 40 - Math.sin(x / 61) * 12);
  ctx.lineTo(W, GROUND); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.9)';
  for (var k = 0; k < 4; k++) {
    var cx = ((k * 320 + t * 0.012) % (W + 240)) - 120, cy = 60 + (k * 41) % 80;
    ctx.beginPath(); ctx.ellipse(cx, cy, 48, 14, 0, 0, Math.PI * 2); ctx.ellipse(cx + 30, cy - 9, 30, 13, 0, 0, Math.PI * 2); ctx.ellipse(cx - 28, cy - 5, 26, 11, 0, 0, Math.PI * 2); ctx.fill();
  }
  var sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#7dd3fc'); sky.addColorStop(0.7, '#e0f2fe');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
}

Events.on(render, 'afterRender', function () {
  var ctx = render.context, pr = render.options.pixelRatio, now = performance.now();
  ctx.save(); ctx.scale(pr, pr);
  shake *= 0.9;
  if (shake > 0.3) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  // The canvas is cleared by Matter first, so the background is drawn with destination-over below
  ctx.globalCompositeOperation = 'source-over';
  // fork trunk
  ctx.fillStyle = '#78350f'; ctx.fillRect(ANCHOR.x - 6, ANCHOR.y + 12, 12, GROUND - ANCHOR.y - 12 + 6);
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(ANCHOR.x, ANCHOR.y + 16); ctx.lineTo(ANCHOR.x - 14, ANCHOR.y - 12); ctx.moveTo(ANCHOR.x, ANCHOR.y + 16); ctx.lineTo(ANCHOR.x + 14, ANCHOR.y - 12); ctx.stroke();
  var tipF = { x: ANCHOR.x - 14, y: ANCHOR.y - 12 }, tipB = { x: ANCHOR.x + 14, y: ANCHOR.y - 12 };
  var pouch = stone ? stone.position : { x: ANCHOR.x, y: ANCHOR.y + 2 };
  band(ctx, tipB, pouch);
  Composite.allBodies(engine.world).forEach(function (b) { if (b.plugin.kind !== 'ammo' && b.plugin.kind !== 'ground') drawBody(ctx, b); });
  Composite.allBodies(engine.world).forEach(function (b) { if (b.plugin.kind === 'ammo') drawStone(ctx, b); });
  band(ctx, tipF, pouch);
  // dotted preview of the exact path while aiming
  if (stone && mc.body === stone && state === 'play') {
    var dx = ANCHOR.x - stone.position.x, dy = ANCHOR.y - stone.position.y;
    if (Math.hypot(dx, dy) >= 28) {
      var x = stone.position.x, y = stone.position.y, vx = dx * POWER, vy = dy * POWER;
      for (var i = 0; i < 90; i++) {
        vx *= 1 - AIR; vy = vy * (1 - AIR) + GRAV; x += vx; y += vy;
        if (y > GROUND - 4) break;
        if (i % 4 === 3) { ctx.globalAlpha = 1 - i / 120; ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(12,74,110,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 3.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.globalAlpha = 1; }
      }
    }
  }
  particles.forEach(function (p) {
    ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.c;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.r, -p.r * 0.6, p.r * 2, p.r * 1.2); ctx.restore();
  });
  ctx.globalAlpha = 1;
  ctx.font = '800 17px system-ui'; ctx.textAlign = 'center';
  texts.forEach(function (t) { ctx.globalAlpha = Math.min(1, t.life / 20); ctx.fillStyle = 'rgba(12,74,110,.45)'; ctx.fillText(t.text, t.x + 1, t.y + 2); ctx.fillStyle = '#fff'; ctx.fillText(t.text, t.x, t.y); });
  ctx.globalAlpha = 1;
  // everything above is on a cleared canvas, so the scenery goes behind it
  ctx.globalCompositeOperation = 'destination-over';
  background(ctx, now);
  ctx.restore();
});

loadLevel(0);
Render.run(render);
Runner.run(Runner.create(), engine);`,

  seo: {
    title: 'Matter.js Slingshot Game — Levels, Critters and Aim Preview',
    description: `Play a slingshot tower game built with Matter.js: exact dotted aim preview, wood, stone and glass blocks, critters to pop, three levels and star ratings.`,
    about: {
      title: 'A Slingshot Game in Matter.js — Exact Aim Preview, Fragile Glass and Critters to Pop',
      description: `Pull back, let go, watch a tower collapse: slingshot games are the classic physics-engine showcase. This version turns the mechanics into a small game with three levels, a limited number of stones, green critters to pop, blocks of wood, stone and glass, a dotted aim preview that matches the shot exactly, star ratings and particle effects, all on one canvas with plain JavaScript and Matter.js.

**An aim preview that is actually accurate**

Instead of letting a spring fling the stone and guessing where it goes, the launch is computed. While you drag, the stone is held at your pointer up to 130px from the anchor. On release, \`Body.setVelocity\` gives it a speed of pull distance times a constant (\`POWER\`). Because that speed is known, the preview can replay the engine's own per-step maths: multiply by the air friction (1 minus 0.004), add gravity (0.2778 per step), move, and draw a dot every fourth step until the path meets the ground. The dots land where the stone will.

**Release detection with enddrag**

\`MouseConstraint\` fires an \`enddrag\` event when you let go. If the dragged body is the stone, the state is "play" and the pull is at least 28px, the spring is detached, the velocity is set and one stone is spent. A smaller pull just lets the spring return it. A new stone is loaded 900ms later with a short grow-in, and \`startdrag\` rejects every body that is not the loaded stone.

**Three materials**

Wood, stone and glass differ in density and fragility. Stone is four times heavier than glass, so it barely moves when hit. Glass shatters when it collides above a speed threshold (lower for another body, higher for the ground), spraying blue shards and giving 50 points, which makes glass floors a way to bring a structure down.

**Critters that pop on impact**

Each green critter is a circle that pops when something hits it hard enough: the relative speed from \`collisionStart\` must exceed 3.6 for a moving body or 7.5 for the ground, so a gentle landing is safe but a falling block is not. A pop gives 500 points, a burst of confetti and a short screen shake. The faces blink, and are drawn along with every other body by hand in \`afterRender\`.

**Levels, stones and stars**

Each level is a function that returns bodies placed relative to the platform: a pillar frame, a two-tower fort with glass and stone floors, and a stepped pyramid built with \`Composites.pyramid\`. A level is won when no critters remain and lost when the stones run out and the scene settles. Finishing with two or more stones left earns three stars, and every unused stone is worth 300 bonus points.

**Housekeeping**

Spent stones are removed once they leave the scene or have lain around for nine seconds, particles and floating text are capped, and the background, clouds and hills are painted last with \`destination-over\`.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Press Play', text: `A card explains the goal: pop every green critter before the stones run out. The stones left are shown as dots in the HUD.` },
      { title: 'Drag the stone back', text: `Pull it back from the sling, up to 130px. A dotted line shows the exact path the stone will take.` },
      { title: 'Release', text: `The stone launches at a speed proportional to the pull. Pull further for more power and change the angle for a different arc.` },
      { title: 'Use the materials', text: `Glass shatters at a touch, wood holds, and stone is heavy. Knock out supports so the structure drops onto the critters.` },
      { title: 'Clear the level', text: `Pop all critters to win, earning 500 each, 300 per unused stone, and up to three stars. Next level changes the structure.` },
      { title: 'Retry', text: `Retry level resets the structure and restores the score from the start of that level.` },
    ] },
    features: [
      { title: 'Exact aim preview', text: `Velocity is set from the pull, so the dotted path replays the engine's gravity and air friction and matches the shot.` },
      { title: 'enddrag release', text: `A release with at least 28px of pull launches the stone; smaller pulls return it to the sling.` },
      { title: 'Wood, stone and glass', text: `Three densities and frictions, with glass shattering above an impact-speed threshold.` },
      { title: 'Critters that pop', text: `Impact speed from collisionStart decides whether a critter pops, worth 500 points with confetti and shake.` },
      { title: 'Three levels', text: `A pillar frame, a two-tower fort and a stepped pyramid, each a function that returns bodies.` },
      { title: 'Stones and stars', text: `A limited ammo supply, a 300-point bonus per unused stone and a three-star rating.` },
      { title: 'Hand-drawn scene', text: `Bodies, band, fork, parallax hills and drifting clouds are painted in afterRender.` },
      { title: 'Clean-up and caps', text: `Spent stones are removed and particles are capped so the world stays light.` },
    ],
    useCases: [
      { title: 'Complete mini-game', text: 'Start from a full game with levels, ammo, scoring and a results card, then reskin the critters, blocks and background for your own theme.' },
      { title: 'Teaching projectile motion', text: 'Because the dotted path replays the same gravity and drag the engine uses, students can see launch speed, angle and distance connected before they release.' },
      { title: 'Promotional microsites', text: 'Turn a campaign into a shareable game by swapping the critters for your mascot or product, and the results card for a discount or sign-up prompt.' },
      { title: 'Level design prototyping', text: 'Add a level as a function placing blocks relative to the platform, then test how materials and layout change the difficulty in seconds.' },
      { title: 'Learning Matter.js events', text: 'A compact reference for startdrag and enddrag, collisionStart with relative speed, custom rendering in afterRender and destination-over backgrounds.' },
    ],
    faqs: [
      { q: 'How is the dotted aim preview calculated?', a: `The launch velocity is set directly from the pull (distance times POWER), so the preview repeats Matter's own per-step update: multiply the velocity by one minus the air friction, add 0.2778 of gravity, then move. Plotting every fourth position until it reaches the ground gives a path that matches the real flight.` },
      { q: 'Why set the velocity instead of letting the spring launch the stone?', a: `A spring's launch speed depends on stiffness, damping, mass and frame timing, which makes a trajectory impossible to predict exactly. Computing velocity from the pull gives predictable shots and an accurate preview, while the spring only holds the stone at rest.` },
      { q: 'How do I add another level?', a: `Add an object to LEVELS with a stones count and a build function that returns bodies, using block(kind, dx, bottom, w, h) and critter(dx, bottom) to place things relative to the platform. The HUD, win check and star rating pick it up automatically.` },
      { q: 'How do critters and glass decide when to break?', a: `In collisionStart the relative speed between the two bodies is measured. A critter pops above 3.6 against a moving body or 7.5 against the ground, and glass shatters above 4.2 or 6.5. Raise the numbers for sturdier objects.` },
      { q: 'Why are all bodies drawn by hand?', a: `Setting render.visible to false on each body and painting them in afterRender gives full control: faces on critters, grain on wood, cracks on stone and shine on glass. The polygon vertices from Matter are used for the shapes, so collisions and visuals stay in sync.` },
    ],
    aiPrompt: {
      paragraph: `Paste this game into an AI assistant like Claude and ask it to explain how POWER, GRAV and AIR make the dotted preview match the real flight, or how enddrag decides between launching and returning the stone. Since levels, materials, critters, stars and particles already exist, ask for what is missing: different ammo such as a splitting stone or a bomb, a level editor that saves layouts as JSON, a wind setting that the preview also respects, sound effects for launches and pops, a combo multiplier for chain reactions, or a mobile layout with a larger grab area around the stone.`,
      prompt: `Build a slingshot tower-knockdown game with Matter.js 0.20 (from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- A ground, a static wooden platform on a post and a stone held at a fixed anchor by a weak spring constraint. Draw every body, the sling fork and the band by hand in afterRender (set render.visible = false on all bodies), with clouds, two hill layers and grass painted last using destination-over.
- Drag only the loaded stone (reject other bodies in startdrag), clamp the pull to 130 px from the anchor, and on enddrag with a pull of at least 28 px detach the spring and call Body.setVelocity with (anchor minus stone position) times 0.12. Spend one stone and load the next after 900 ms.
- While dragging, draw a dotted preview by replaying the engine's step: v = v * (1 - frictionAir) + gravity * 0.2778, position += v, dotted every fourth step until the ground.
- Materials: wood, stone (about 2.5x denser) and glass (lighter and fragile). Glass shatters into shards and gives 50 points when the relative impact speed in collisionStart is over 4.2 (6.5 against static bodies).
- Green critter targets (circles with blinking faces) pop when hit at relative speed over 3.6 (7.5 against the ground): 500 points, confetti and a short screen shake.
- Three levels defined as functions returning bodies placed relative to the platform: a pillar frame, a two-tower fort with glass and stone floors and a pyramid from Composites.pyramid with critters on the platform.
- HUD with level, critters left, stones as dots and score. A start card, a level-cleared card with 1 to 3 stars (3 stars with two or more stones left) and +300 per unused stone, and an out-of-stones card with Try again. Retry button restores the score from the start of the level.
- Remove stones that leave the scene or are older than nine seconds, and cap the particle count.`,
    },
  },
};

export default matterJsSlingshotTowerKnockdown;
