const robotLoopProgrammerGame = {
  id: 'robot-loop-programmer-game',
  title: 'Robot Loop Programmer Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="rb-game">
    <div class="rb-head">
      <div class="rb-meta"><span class="rb-label">Level</span><span class="rb-value" id="rbLevel">1 / 5</span></div>
      <div class="rb-meta rb-right"><span class="rb-label">Blocks / par</span><span class="rb-value"><span id="rbCount">0</span> / <span id="rbPar">4</span></span></div>
    </div>

    <p class="rb-goal" id="rbGoal">Drive the robot to the flag.</p>

    <div class="rb-board" id="rbBoard">
      <div class="rb-grid" id="rbGrid"></div>
      <div class="rb-robot" id="rbRobot">▲</div>
    </div>

    <div class="rb-palette">
      <button class="rb-cmd" data-cmd="F">Forward</button>
      <button class="rb-cmd" data-cmd="L">Turn ↺</button>
      <button class="rb-cmd" data-cmd="R">Turn ↻</button>
    </div>

    <div class="rb-program" id="rbProgram"></div>
    <p class="rb-tip">Click a block in your program to raise its repeat count. Right-click removes it.</p>

    <div class="rb-controls">
      <button class="rb-btn rb-run" id="rbRun">Run</button>
      <button class="rb-btn rb-ghost" id="rbClear">Clear</button>
    </div>

    <p class="rb-status" id="rbStatus">Build a program, then press Run.</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 26px 16px; }

.rb-game {
  width: 100%; max-width: 420px; padding: 20px;
  background: #1e293b; border: 1px solid #334155; border-radius: 16px;
  display: flex; flex-direction: column; gap: 12px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.4);
}

.rb-head { display: flex; justify-content: space-between; }
.rb-meta { display: flex; flex-direction: column; gap: 2px; }
.rb-right { align-items: flex-end; }
.rb-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.rb-value { font-size: 16px; font-weight: 800; color: #f1f5f9; }

.rb-goal {
  font-size: 13px; font-weight: 600; color: #e2e8f0; line-height: 1.5;
  background: #0f172a; border-left: 3px solid #a855f7; border-radius: 0 8px 8px 0; padding: 9px 12px;
}

.rb-board { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 12px; overflow: hidden; border: 2px solid #334155; }
.rb-grid { display: grid; width: 100%; height: 100%; }
.rb-cell { border: 1px solid rgba(148,163,184,0.14); background: #0b1120; }
.rb-cell.wall { background: #334155; border-color: #475569; }
.rb-cell.goal { background: rgba(168,85,247,0.18); }
.rb-cell.goal::after { content: '⚑'; display: flex; align-items: center; justify-content: center; height: 100%; font-size: 18px; color: #d8b4fe; }

.rb-robot {
  position: absolute; display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: #38bdf8; pointer-events: none;
  transition: left 0.28s ease, top 0.28s ease, transform 0.22s ease;
}
.rb-robot.crash { color: #f87171; }
.rb-robot.win { color: #4ade80; }

.rb-palette { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.rb-cmd {
  padding: 10px 0; border-radius: 9px; border: 1.5px solid #334155; background: #0f172a;
  color: #e2e8f0; font-size: 12.5px; font-weight: 700; font-family: inherit; cursor: pointer; transition: all 0.12s;
}
.rb-cmd:hover { border-color: #a855f7; color: #d8b4fe; }

.rb-program {
  display: flex; flex-wrap: wrap; gap: 5px; min-height: 44px; padding: 8px;
  border-radius: 10px; background: #0f172a; border: 1.5px dashed #334155;
}
.rb-program:empty::after { content: 'your program appears here'; font-size: 11.5px; color: #475569; }
.rb-block {
  display: inline-flex; align-items: center; gap: 5px; padding: 6px 9px; border-radius: 7px;
  background: #312e81; border: 1.5px solid #4f46e5; color: #e0e7ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; font-weight: 700;
  cursor: pointer; user-select: none;
}
.rb-block .times { color: #a5b4fc; }
.rb-block.active { background: #4f46e5; border-color: #a5b4fc; }
.rb-block.failed { background: #7f1d1d; border-color: #ef4444; color: #fecaca; }

.rb-tip { font-size: 11px; color: #64748b; }

.rb-controls { display: grid; grid-template-columns: 2fr 1fr; gap: 6px; }
.rb-btn { padding: 10px 0; border: none; border-radius: 9px; font-size: 13px; font-weight: 800; font-family: inherit; cursor: pointer; }
.rb-run { background: #a855f7; color: #fff; }
.rb-run:hover { background: #9333ea; }
.rb-ghost { background: #0f172a; color: #94a3b8; border: 1.5px solid #334155; }
.rb-ghost:hover { color: #e2e8f0; }

.rb-status { font-size: 12px; font-weight: 600; color: #94a3b8; min-height: 17px; }
.rb-status.ok { color: #4ade80; }
.rb-status.err { color: #f87171; }`,

  js: `var LEVELS = [
  {
    goal: 'Straight line — one block can do it.',
    par: 1,
    map: [
      '.....',
      '.....',
      'S...G',
      '.....',
      '.....',
    ],
  },
  {
    goal: 'Turn the corner, then climb.',
    par: 3,
    map: [
      '....G',
      '.....',
      '.....',
      '.....',
      'S....',
    ],
  },
  {
    goal: 'Walls block the direct route — go around.',
    par: 6,
    map: [
      '.....',
      '.###.',
      'S.#.G',
      '.##..',
      '.....',
    ],
  },
  {
    goal: 'A spiral. Repeat counts keep this short.',
    par: 7,
    map: [
      'S....',
      '####.',
      '.....',
      '.####',
      'G....',
    ],
  },
  {
    goal: 'Zig-zag through the gaps.',
    par: 6,
    map: [
      'S.#..',
      '..#..',
      '.....',
      '..#..',
      '..#.G',
    ],
  },
];

var DIRS = [
  { dr: -1, dc: 0 },  // 0 = up
  { dr: 0, dc: 1 },   // 1 = right
  { dr: 1, dc: 0 },   // 2 = down
  { dr: 0, dc: -1 },  // 3 = left
];
var STEP_MS = 300;
var MAX_STEPS = 60;   // guards against a program that loops the robot forever

var gridEl = document.getElementById('rbGrid');
var robotEl = document.getElementById('rbRobot');
var programEl = document.getElementById('rbProgram');
var statusEl = document.getElementById('rbStatus');
var goalEl = document.getElementById('rbGoal');
var levelEl = document.getElementById('rbLevel');
var countEl = document.getElementById('rbCount');
var parEl = document.getElementById('rbPar');

var levelIndex = 0;
var size = 5;
var grid = [];
var start = { r: 0, c: 0 };
var goal = { r: 0, c: 0 };
var program = [];      // [{ cmd: 'F'|'L'|'R', times: n }]
var robot = { r: 0, c: 0, dir: 1 };
var running = false;

function level() { return LEVELS[levelIndex]; }

function parseMap(map) {
  grid = [];
  size = map.length;
  map.forEach(function (row, r) {
    var cells = row.split('');
    cells.forEach(function (ch, c) {
      if (ch === 'S') start = { r: r, c: c };
      if (ch === 'G') goal = { r: r, c: c };
    });
    grid.push(cells);
  });
}

function isWall(r, c) { return grid[r][c] === '#'; }
function inBounds(r, c) { return r >= 0 && c >= 0 && r < size && c < grid[r].length; }

function renderGrid() {
  gridEl.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
  gridEl.innerHTML = '';
  for (var r = 0; r < size; r++) {
    for (var c = 0; c < grid[r].length; c++) {
      var cell = document.createElement('div');
      cell.className = 'rb-cell';
      if (grid[r][c] === '#') cell.classList.add('wall');
      if (r === goal.r && c === goal.c) cell.classList.add('goal');
      gridEl.appendChild(cell);
    }
  }
}

function placeRobot() {
  var pct = 100 / size;
  robotEl.style.width = pct + '%';
  robotEl.style.height = pct + '%';
  robotEl.style.left = (robot.c * pct) + '%';
  robotEl.style.top = (robot.r * pct) + '%';
  robotEl.style.transform = 'rotate(' + (robot.dir * 90) + 'deg)';
}

function renderProgram() {
  programEl.innerHTML = '';
  program.forEach(function (block, i) {
    var el = document.createElement('div');
    el.className = 'rb-block';
    el.dataset.index = i;
    el.innerHTML = block.cmd + (block.times > 1 ? ' <span class="times">×' + block.times + '</span>' : '');
    programEl.appendChild(el);
  });
  countEl.textContent = program.length;
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'rb-status' + (kind ? ' ' + kind : '');
}

// Flatten { cmd, times } blocks into a list of single steps, each remembering
// which block it came from so the UI can highlight the running block.
function expand() {
  var steps = [];
  program.forEach(function (block, i) {
    for (var n = 0; n < block.times; n++) steps.push({ cmd: block.cmd, block: i });
  });
  return steps;
}

function applyStep(step) {
  if (step.cmd === 'L') { robot.dir = (robot.dir + 3) % 4; return { ok: true }; }
  if (step.cmd === 'R') { robot.dir = (robot.dir + 1) % 4; return { ok: true }; }
  var d = DIRS[robot.dir];
  var nr = robot.r + d.dr;
  var nc = robot.c + d.dc;
  if (!inBounds(nr, nc)) return { ok: false, why: 'Drove off the edge' };
  if (isWall(nr, nc)) return { ok: false, why: 'Hit a wall' };
  robot.r = nr; robot.c = nc;
  return { ok: true };
}

function highlight(blockIndex, cls) {
  Array.prototype.forEach.call(programEl.children, function (el, i) {
    el.classList.toggle(cls, i === blockIndex);
  });
}

function clearHighlights() {
  Array.prototype.forEach.call(programEl.children, function (el) {
    el.classList.remove('active', 'failed');
  });
}

function run() {
  if (running) return;
  if (!program.length) { setStatus('Add some blocks first.', 'err'); return; }

  running = true;
  clearHighlights();
  robotEl.classList.remove('crash', 'win');
  resetRobot();

  var steps = expand();
  if (steps.length > MAX_STEPS) {
    running = false;
    setStatus('That program runs more than ' + MAX_STEPS + ' steps — trim it.', 'err');
    return;
  }

  var i = 0;
  var timer = setInterval(function () {
    if (i >= steps.length) {
      clearInterval(timer);
      finish();
      return;
    }
    var step = steps[i];
    highlight(step.block, 'active');
    var result = applyStep(step);
    placeRobot();
    if (!result.ok) {
      clearInterval(timer);
      running = false;
      robotEl.classList.add('crash');
      highlight(step.block, 'failed');
      setStatus(result.why + ' on block ' + (step.block + 1) + '.', 'err');
      return;
    }
    i++;
  }, STEP_MS);
}

function finish() {
  running = false;
  clearHighlights();
  if (robot.r === goal.r && robot.c === goal.c) {
    robotEl.classList.add('win');
    var blocks = program.length;
    var par = level().par;
    var note = blocks <= par ? ' At or under par!' : ' Par is ' + par + ' — try repeat counts.';
    if (levelIndex === LEVELS.length - 1) {
      setStatus('Solved in ' + blocks + ' blocks.' + note + ' All levels cleared!', 'ok');
      setTimeout(function () { levelIndex = 0; loadLevel(); }, 2000);
    } else {
      setStatus('Solved in ' + blocks + ' blocks.' + note, 'ok');
      setTimeout(function () { levelIndex++; loadLevel(); }, 1600);
    }
  } else {
    setStatus('Program finished, but not on the flag. Adjust and run again.', 'err');
  }
}

function resetRobot() {
  robot = { r: start.r, c: start.c, dir: 1 };
  placeRobot();
}

function loadLevel() {
  var lv = level();
  program = [];
  running = false;
  parseMap(lv.map);
  renderGrid();
  resetRobot();
  renderProgram();
  robotEl.classList.remove('crash', 'win');
  goalEl.textContent = lv.goal;
  levelEl.textContent = (levelIndex + 1) + ' / ' + LEVELS.length;
  parEl.textContent = lv.par;
  setStatus('Build a program, then press Run.', '');
}

document.querySelector('.rb-palette').addEventListener('click', function (e) {
  var btn = e.target.closest('.rb-cmd');
  if (!btn || running) return;
  program.push({ cmd: btn.dataset.cmd, times: 1 });
  renderProgram();
});

programEl.addEventListener('click', function (e) {
  var block = e.target.closest('.rb-block');
  if (!block || running) return;
  var i = Number(block.dataset.index);
  program[i].times = program[i].times >= 9 ? 1 : program[i].times + 1;
  renderProgram();
});

programEl.addEventListener('contextmenu', function (e) {
  var block = e.target.closest('.rb-block');
  if (!block || running) return;
  e.preventDefault();
  program.splice(Number(block.dataset.index), 1);
  renderProgram();
});

document.getElementById('rbRun').addEventListener('click', run);
document.getElementById('rbClear').addEventListener('click', function () {
  if (running) return;
  program = [];
  renderProgram();
  resetRobot();
  robotEl.classList.remove('crash', 'win');
  setStatus('Cleared. Build a new program.', '');
});

loadLevel();

/* wdp-share:start */
(function () {
  var TITLE = 'Robot Loop Programmer Game', URL = 'https://webdevpuneet.com/ui-snippets/robot-loop-programmer-game/';
  if (window.__wdpShare) return;
  window.__wdpShare = true;
  var blob = null, file = null, lastInfo = null;

  /* ---- UI ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-in{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:11px 22px;font:800 15px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 0 #11793a;pointer-events:auto;position:relative;z-index:5}' +
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
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        g.fillText(line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines - 1) { line = words.slice(i).join(' '); break; }
      } else line = tst;
    }
    if (line) {
      while (line.length > 3 && g.measureText(line).width > maxW) line = line.slice(0, -2);
      g.fillText(line, x, y); y += lh;
    }
    return y;
  }
  function makeCard(info, cb) {
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
  pill.addEventListener('click', onShare);
  inl.addEventListener('click', function (e) { e.stopPropagation(); onShare(); });
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
    title: 'Robot Loop Programmer Game — Free HTML CSS JS Snippet',
    description: 'Build a block program with repeat counts and watch a robot run it step by step, with crash reporting. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Robot Loop Programmer Game — Block Programs With Repeat Counts, Stepped Interpretation & Crash Reporting',
      description: `Sequencing, loops, and debugging are the first three ideas in programming, and all three are far easier to feel than to read about. This snippet is a small visual programming game built around exactly those ideas: the player assembles a program from Forward, Turn-left and Turn-right blocks, raises the repeat count on any block, presses Run, and watches a robot execute the program one step at a time across a grid of walls toward a flag. When the robot crashes, the block that was executing is highlighted — which is the whole debugging loop in miniature.

**Repeat counts instead of a repeat block**

Rather than a nested loop construct, each block carries a \`times\` count that the player raises by clicking it. \`F ×4\` is a loop, expressed in the way beginners meet loops first: "do this thing four times". It also creates a genuine optimisation pressure, because every level shows a par block count — solving a spiral with eight separate Forward blocks works but misses par, while four blocks with counts clears it. That gap between "it works" and "it is concise" is the loop lesson, made visible without any syntax to learn.

**Expansion, then interpretation**

\`expand()\` flattens the block list into a list of single steps, each remembering the index of the block it came from. The interpreter then walks that flat list on a \`setInterval\`, applying one step per tick — which is what makes the execution watchable rather than instantaneous, and is also how a real stepping debugger works. Because each step retains its source block index, the UI can highlight the currently executing block and, on a crash, mark the exact block that failed. Separating expansion from execution keeps both halves simple: the interpreter never has to think about repeat counts, and the expander never has to think about walls.

**Direction as modular arithmetic**

Heading is stored as an integer 0-3 indexed into a \`DIRS\` table of row/column deltas. Turning right is \`(dir + 1) % 4\` and turning left is \`(dir + 3) % 4\` — adding three rather than subtracting one, which avoids the negative-modulo trap where \`(0 - 1) % 4\` evaluates to \`-1\` in JavaScript rather than \`3\`. The robot's on-screen rotation comes from the same integer via \`rotate(dir * 90deg)\`, so the sprite can never point somewhere the model disagrees with.

**Failure that names the cause and the culprit**

\`applyStep()\` returns a result object rather than a boolean: \`{ ok: false, why: 'Hit a wall' }\` or \`'Drove off the edge'\`. The runner stops the interval immediately on a failure, adds a crash class to the robot, marks the offending block red, and prints both the reason and the block number. Distinguishing the two failure modes matters pedagogically — driving off the edge means the program went too far, hitting a wall means it turned too late, and those are different fixes.

**A step ceiling as a runaway guard**

Because repeat counts can reach nine per block, a program can easily describe hundreds of steps. \`MAX_STEPS\` rejects any program whose expanded length exceeds the ceiling before execution begins, which is both a practical guard against a several-minute animation and an honest introduction to the idea that a loop needs a bound. Levels are plain ASCII maps — \`.\` floor, \`#\` wall, \`S\` start, \`G\` goal — parsed at load, so adding a level means drawing one, not writing coordinates.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the level and find the flag', text: 'The purple-bordered line describes the challenge and the board shows walls in grey, the flag in purple, and the robot as an arrow pointing in its current heading — it always starts facing right.' },
        { title: 'Add blocks from the palette', text: 'Forward, Turn ↺ and Turn ↻ append a block to your program. The program strip below shows the sequence you have built and the block count against the level\'s par.' },
        { title: 'Click a block to raise its repeat count', text: 'Clicking a block in the program cycles its count from 1 up to 9 and back around, so F ×4 replaces four separate Forward blocks. Right-clicking a block removes it.' },
        { title: 'Press Run and watch it execute', text: 'The program is flattened into single steps and executed one every 300ms, with the currently running block highlighted — the same stepped execution a debugger gives you, which is what makes a mistake visible rather than mysterious.' },
        { title: 'Read the crash report', text: 'If the robot hits a wall or drives off the edge, execution stops immediately, the robot turns red, and the block that was executing is marked — along with whether the cause was a wall or the edge, which point to different fixes.' },
        { title: 'Beat par to advance well', text: 'Reaching the flag clears the level and reports your block count against par. Levels four and five are built so that solving at par genuinely requires repeat counts rather than repetition.' },
      ],
    },
    features: [
      'Block programs with per-block repeat counts, introducing loops without any syntax to learn',
      'Par block count per level, creating real pressure to use counts instead of repeated blocks',
      'Two-phase execution: blocks expanded into flat steps, then interpreted one step per interval tick',
      'Each expanded step remembers its source block, so the running block highlights and the failing block is marked',
      'Direction stored as an integer indexed into a delta table, with (dir + 3) % 4 avoiding JavaScript\'s negative-modulo trap',
      'Distinct crash reasons for hitting a wall versus driving off the edge, each pointing to a different fix',
      'MAX_STEPS ceiling rejecting runaway programs before execution starts',
      'Levels authored as plain ASCII maps (. floor, # wall, S start, G goal) parsed at load time',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching sequencing, loops and debugging to beginners', desc: 'Block programming with a visible execution pointer is the standard first-programming format for a reason — the program, the state and the failure are all on screen at once. Follow it with a [stack and queue visualizer](/ui-snippets/stack-queue-visualizer/) when moving from control flow to data structures.' },
      { icon: 'APP', title: 'Kids\' coding club, STEM outreach or museum kiosk', desc: 'The game needs no typing, no account and no build step, which makes it well suited to a shared screen or an event laptop where visitors play for a minute and move on.' },
      { icon: 'CODE', title: 'Reference implementation of a tiny interpreter', desc: 'Expansion, a step list, an execution pointer, per-step result objects and a step ceiling are the bones of every interpreter. Studying this one is a gentle route into how program execution is modelled before tackling parsers or bytecode.' },
      { icon: 'FLOW', title: 'Stepped-execution UI pattern for workflow and automation tools', desc: 'Automation builders, CI pipeline views and rule engines all need to show a sequence executing with the current step highlighted and the failing step marked. This snippet is a compact model of that interaction, independent of the domain.' },
      { icon: 'DESIGN', title: 'Grid-and-sprite movement without a game engine', desc: 'Positioning the robot with percentage offsets over a CSS grid, animating with transitions on left/top, and rotating from the same integer that drives the model is a dependency-free approach that works for any turn-based grid movement UI.' },
      { icon: 'FORM', title: 'Onboarding puzzle for developer-tool products', desc: 'Products that involve composing steps — data pipelines, macro recorders, robotic process automation — can use a level or two of this as a playful introduction to their own composition model before the real editor appears.' },
      { icon: 'CODE', title: 'Related: Tank Arena Game', desc: 'See the [Tank Arena Game](/ui-snippets/tank-arena-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why repeat counts on blocks instead of a proper loop block?', a: 'A count on a block is how beginners first meet iteration — "do this four times" — and it needs no nesting UI, no drag targets, and no block-scope rules. It still creates the real lesson: every level has a par block count, and the later levels only reach par if you use counts instead of repeating blocks, which is exactly the trade a loop exists to make.' },
      { q: 'How does the game know which block to blame for a crash?', a: 'expand() flattens the blocks into a flat list of single steps, and each step stores the index of the block it came from. The interpreter walks that list one step per tick, so when applyStep() returns a failure the runner already knows which block produced the failing step and can mark it red while reporting the reason.' },
      { q: 'Why is turning left written as (dir + 3) % 4?', a: 'Because JavaScript\'s % operator returns a negative result for negative operands: (0 - 1) % 4 is -1, not 3, which would index outside the direction table. Adding 3 is congruent to subtracting 1 modulo 4 and always stays non-negative, so the heading integer remains a valid index without any extra branching.' },
      { q: 'How do I add my own levels?', a: 'Push an object onto LEVELS with a goal string, a par block count, and a map: an array of equal-length strings where . is floor, # is a wall, S is the start and G is the flag. parseMap() reads the start and goal positions out of the characters at load time, so no coordinates need to be written by hand and the grid size is derived from the map length.' },
      { q: 'Can I use this robot game in React, Vue, or Angular?', a: 'Yes. Keep LEVELS, DIRS, expand() and applyStep() in a plain module — they are all pure data and pure functions. Hold the program array, robot position and running flag in component state, and render the grid, program strip and robot position from that state. The one thing to get right is the interval: start it in an effect when running turns true and clear it in the cleanup (useEffect return, onUnmounted, ngOnDestroy) so a level change or unmount cannot leave the interpreter ticking.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a step-through debugger — a Step button that advances the interpreter one instruction at a time with the robot state visible between steps — which turns the game into a genuine introduction to how debugging works. Other natural extensions: add a nested repeat block that wraps a sub-sequence so the loop concept generalises beyond a per-block count, add collectibles the program must gather in order before reaching the flag, add a "function" block that stores a reusable sub-program to introduce procedures, or add an undo stack for program edits. The expansion-then-interpretation split makes each of these easier than it sounds.`,
      prompt: `Build a playable block-programming robot game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Levels authored as plain ASCII maps (an array of equal-length strings using . for floor, # for wall, S for start, G for goal), parsed at load time so start and goal coordinates are never written by hand. Each level also carries a plain-English goal and a par block count.
- A palette of Forward, Turn-left and Turn-right blocks that append to a program strip. Clicking a block in the program cycles its repeat count from 1 to 9 and back; right-clicking removes it.
- Two-phase execution: first expand the blocks into a flat list of single steps where each step remembers the index of the block it came from, then interpret that list one step per interval tick so the run is watchable.
- Highlight the currently executing block during the run, and on a crash stop immediately, mark the failing block, and report a distinct reason for hitting a wall versus driving off the edge.
- Store the robot's heading as an integer 0-3 indexed into a table of row/column deltas. Turn right with (dir + 1) % 4 and turn left with (dir + 3) % 4 — never (dir - 1) % 4, which returns a negative index in JavaScript. Drive the on-screen rotation from the same integer.
- Reject programs whose expanded step count exceeds a MAX_STEPS ceiling before execution begins, as a runaway guard.
- On finishing, win only if the robot is standing on the goal cell, and report the block count against the level's par so players are pushed toward repeat counts rather than repetition. Include at least five levels, with the later ones only reaching par if counts are used.`,
    },
  },
};

export default robotLoopProgrammerGame;
