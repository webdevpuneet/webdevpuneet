const logicGatePuzzleGame = {
  id: 'logic-gate-puzzle-game',
  title: 'Logic Gate Puzzle Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="lg-game">
    <div class="lg-head">
      <div class="lg-meta"><span class="lg-label">Puzzle</span><span class="lg-value" id="lgLevel">1 / 5</span></div>
      <div class="lg-meta lg-right"><span class="lg-label">Rows correct</span><span class="lg-value"><span id="lgRows">0</span> / 8</span></div>
    </div>

    <p class="lg-goal" id="lgGoal">Make the output light up only when all three switches are on.</p>

    <div class="lg-circuit">
      <div class="lg-inputs">
        <button class="lg-sw" data-input="0">A<span class="lg-bit">0</span></button>
        <button class="lg-sw" data-input="1">B<span class="lg-bit">0</span></button>
        <button class="lg-sw" data-input="2">C<span class="lg-bit">0</span></button>
      </div>

      <div class="lg-wires">
        <div class="lg-gate" id="lgGate0">
          <span class="lg-gate-name">AND</span>
          <span class="lg-gate-hint">A · B</span>
        </div>
        <div class="lg-gate" id="lgGate1">
          <span class="lg-gate-name">AND</span>
          <span class="lg-gate-hint">· C</span>
        </div>
        <div class="lg-out" id="lgOut">OUT<span class="lg-bit">0</span></div>
      </div>
    </div>

    <div class="lg-picker" id="lgPicker"></div>

    <div class="lg-table">
      <div class="lg-tr lg-th"><span>A</span><span>B</span><span>C</span><span>want</span><span>got</span></div>
      <div id="lgRowsBody"></div>
    </div>

    <p class="lg-status" id="lgStatus">Pick a gate type for each slot, then flip the switches to test.</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f1729; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 26px 16px; }

.lg-game {
  width: 100%; max-width: 430px; padding: 20px;
  background: #16203a; border: 1px solid #26314f; border-radius: 16px;
  display: flex; flex-direction: column; gap: 13px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

.lg-head { display: flex; justify-content: space-between; }
.lg-meta { display: flex; flex-direction: column; gap: 2px; }
.lg-right { align-items: flex-end; }
.lg-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #7c8bb0; }
.lg-value { font-size: 16px; font-weight: 800; color: #e8edf9; }

.lg-goal {
  font-size: 13px; font-weight: 600; color: #dbe3f5; line-height: 1.5;
  background: #0f1729; border-left: 3px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 9px 12px;
}

.lg-circuit { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; padding: 12px; border-radius: 12px; background: #0f1729; border: 1px solid #26314f; }
.lg-inputs { display: flex; flex-direction: column; gap: 7px; }
.lg-sw {
  display: flex; flex-direction: column; align-items: center; gap: 1px;
  width: 46px; padding: 7px 0; border-radius: 9px; cursor: pointer; font-family: inherit;
  background: #16203a; border: 1.5px solid #26314f; color: #7c8bb0; font-size: 11px; font-weight: 800;
  transition: all 0.14s;
}
.lg-sw .lg-bit { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }
.lg-sw.on { background: rgba(245,158,11,0.16); border-color: #f59e0b; color: #fbbf24; }

.lg-wires { display: flex; align-items: center; gap: 8px; }
.lg-gate {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px;
  padding: 10px 4px; border-radius: 10px; background: #16203a; border: 1.5px solid #3b82f6; color: #93c5fd;
}
.lg-gate.live { background: rgba(59,130,246,0.18); }
.lg-gate-name { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; font-weight: 800; }
.lg-gate-hint { font-size: 9.5px; color: #64748b; }
.lg-gate.picking { border-color: #f59e0b; color: #fbbf24; }

.lg-out {
  display: flex; flex-direction: column; align-items: center; gap: 1px; width: 52px; padding: 10px 0;
  border-radius: 10px; background: #16203a; border: 1.5px solid #26314f; color: #7c8bb0;
  font-size: 10px; font-weight: 800;
}
.lg-out .lg-bit { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; }
.lg-out.on { background: rgba(74,222,128,0.16); border-color: #4ade80; color: #86efac; }

.lg-picker { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
.lg-pick {
  padding: 8px 0; border-radius: 8px; border: 1.5px solid #26314f; background: #0f1729; color: #dbe3f5;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; font-weight: 700;
  cursor: pointer; transition: all 0.12s;
}
.lg-pick:hover { border-color: #3b82f6; color: #93c5fd; }

.lg-table { border-radius: 10px; overflow: hidden; border: 1px solid #26314f; }
.lg-tr {
  display: grid; grid-template-columns: repeat(5, 1fr); text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; color: #dbe3f5;
}
.lg-tr span { padding: 4px 0; }
.lg-th { background: #0f1729; color: #7c8bb0; font-size: 10px; font-weight: 800; text-transform: uppercase; }
.lg-tr.row-ok { background: rgba(74,222,128,0.10); }
.lg-tr.row-bad { background: rgba(248,113,113,0.12); }
.lg-tr.current { box-shadow: inset 3px 0 0 #f59e0b; }

.lg-status { font-size: 12px; font-weight: 600; color: #7c8bb0; min-height: 17px; }
.lg-status.ok { color: #4ade80; }`,

  js: `var GATES = {
  AND:  function (a, b) { return a & b; },
  OR:   function (a, b) { return a | b; },
  XOR:  function (a, b) { return a ^ b; },
  NAND: function (a, b) { return a & b ? 0 : 1; },
  NOR:  function (a, b) { return a | b ? 0 : 1; },
};
var GATE_NAMES = Object.keys(GATES);

// Circuit shape is fixed: out = gate1( gate0(A, B), C )
var LEVELS = [
  { goal: 'Light the output only when all three switches are on.', want: function (a, b, c) { return a & b & c; } },
  { goal: 'Light it when C is on AND at least one of A or B is on.', want: function (a, b, c) { return (a | b) & c; } },
  { goal: 'Light it when A and B differ, or when C is on.', want: function (a, b, c) { return (a ^ b) | c; } },
  { goal: 'Light it when an ODD number of switches are on (a parity check).', want: function (a, b, c) { return a ^ b ^ c; } },
  { goal: 'Light it only when C is on and A and B are NOT both on.', want: function (a, b, c) { return (a & b ? 0 : 1) & c; } },
];

var ROWS = [];
for (var i = 0; i < 8; i++) ROWS.push([(i >> 2) & 1, (i >> 1) & 1, i & 1]);

var levelIndex = 0;
var choice = ['OR', 'OR'];   // never a solution to any level, so nothing starts solved
var slot = 0;
var inputs = [0, 0, 0];
var solvedFlag = false;

var pickerEl = document.getElementById('lgPicker');
var rowsBody = document.getElementById('lgRowsBody');
var statusEl = document.getElementById('lgStatus');
var goalEl = document.getElementById('lgGoal');
var levelEl = document.getElementById('lgLevel');
var rowsEl = document.getElementById('lgRows');
var outEl = document.getElementById('lgOut');
var gateEls = [document.getElementById('lgGate0'), document.getElementById('lgGate1')];

function level() { return LEVELS[levelIndex]; }

// Evaluate the whole circuit for one input triple.
function evaluate(a, b, c, gates) {
  var first = GATES[gates[0]](a, b);
  return { first: first, out: GATES[gates[1]](first, c) };
}

function buildPicker() {
  pickerEl.innerHTML = '';
  GATE_NAMES.forEach(function (name) {
    var btn = document.createElement('button');
    btn.className = 'lg-pick';
    btn.textContent = name;
    btn.dataset.gate = name;
    pickerEl.appendChild(btn);
  });
}

function renderTable() {
  rowsBody.innerHTML = '';
  var correct = 0;
  ROWS.forEach(function (row) {
    var want = level().want(row[0], row[1], row[2]);
    var got = evaluate(row[0], row[1], row[2], choice).out;
    var ok = want === got;
    if (ok) correct++;

    var tr = document.createElement('div');
    tr.className = 'lg-tr ' + (ok ? 'row-ok' : 'row-bad');
    if (row[0] === inputs[0] && row[1] === inputs[1] && row[2] === inputs[2]) tr.classList.add('current');
    tr.innerHTML = '<span>' + row[0] + '</span><span>' + row[1] + '</span><span>' + row[2] +
      '</span><span>' + want + '</span><span>' + got + '</span>';
    rowsBody.appendChild(tr);
  });
  rowsEl.textContent = correct;
  return correct;
}

function render() {
  var live = evaluate(inputs[0], inputs[1], inputs[2], choice);

  Array.prototype.forEach.call(document.querySelectorAll('.lg-sw'), function (btn, i) {
    btn.classList.toggle('on', inputs[i] === 1);
    btn.querySelector('.lg-bit').textContent = inputs[i];
  });

  gateEls.forEach(function (el, i) {
    el.querySelector('.lg-gate-name').textContent = choice[i];
    el.classList.toggle('picking', slot === i && !solvedFlag);
    el.classList.toggle('live', (i === 0 ? live.first : live.out) === 1);
  });

  outEl.classList.toggle('on', live.out === 1);
  outEl.querySelector('.lg-bit').textContent = live.out;

  var correct = renderTable();
  if (correct === ROWS.length && !solvedFlag) win();
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'lg-status' + (kind ? ' ' + kind : '');
}

function win() {
  solvedFlag = true;
  var expression = '(A ' + choice[0] + ' B) ' + choice[1] + ' C';
  if (levelIndex === LEVELS.length - 1) {
    setStatus('All 8 rows match with ' + expression + '. Every puzzle solved!', 'ok');
    setTimeout(function () { levelIndex = 0; loadLevel(); }, 2000);
  } else {
    setStatus('All 8 rows match with ' + expression + '. Next puzzle…', 'ok');
    setTimeout(function () { levelIndex++; loadLevel(); }, 1600);
  }
}

function loadLevel() {
  solvedFlag = false;
  choice = ['OR', 'OR'];
  slot = 0;
  inputs = [0, 0, 0];
  goalEl.textContent = level().goal;
  levelEl.textContent = (levelIndex + 1) + ' / ' + LEVELS.length;
  setStatus('Pick a gate type for each slot, then flip the switches to test.', '');
  render();
}

pickerEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.lg-pick');
  if (!btn || solvedFlag) return;
  choice[slot] = btn.dataset.gate;
  slot = slot === 0 ? 1 : 0;      // fill the first slot, then the second, then wrap
  render();
});

gateEls.forEach(function (el, i) {
  el.addEventListener('click', function () {
    if (solvedFlag) return;
    slot = i;
    render();
  });
});

document.querySelector('.lg-inputs').addEventListener('click', function (e) {
  var btn = e.target.closest('.lg-sw');
  if (!btn) return;
  var i = Number(btn.dataset.input);
  inputs[i] = inputs[i] ? 0 : 1;
  render();
});

buildPicker();
loadLevel();

/* wdp-share:start */
(function () {
  var TITLE = 'Logic Gate Puzzle Game', URL = 'https://webdevpuneet.com/ui-snippets/logic-gate-puzzle-game/';
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
    title: 'Logic Gate Puzzle Game — Free HTML CSS JS Snippet',
    description: 'Pick gates to match a target truth table, graded across all eight input rows with live wire states. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Logic Gate Puzzle Game — Full Truth-Table Grading, Live Circuit State & Behavioural Equivalence',
      description: `Boolean logic is the substrate under every conditional anyone ever writes, and it clicks the moment you can flip a switch and watch a wire light up. This snippet is a playable circuit puzzle: a fixed two-gate circuit wired as \`gate1(gate0(A, B), C)\`, five gate types to choose from, three input switches, and a target described in plain English. The player picks gates until the circuit's behaviour matches the target across every possible input — not just the case currently on screen.

**Graded on the whole truth table, not the visible state**

The critical design decision is that the win condition evaluates all eight input combinations, not the three switches as they currently stand. \`ROWS\` is generated by extracting bits from the numbers 0-7 with \`(i >> 2) & 1\`, \`(i >> 1) & 1\` and \`i & 1\`, which produces the canonical truth-table ordering without a hand-written table. Every render re-evaluates the circuit for all eight rows and shows want versus got side by side, so a circuit that happens to be right for the switches you are looking at but wrong elsewhere is visibly, specifically wrong — which is exactly the bug that hides in real conditional logic.

**Behavioural equivalence, not a stored answer**

Levels define their target as a JavaScript function of \`(a, b, c)\` rather than as a required pair of gate names. Any gate combination producing the same output column clears the puzzle, so a player who reaches the answer by a route the author did not anticipate is rewarded — and several of these targets genuinely have more than one solution, since \`NAND\` and \`NOR\` can substitute for combinations of the others. Grading behaviour rather than structure is what makes the game teach Boolean equivalence instead of gate trivia.

**Gates as a lookup table of pure functions**

\`GATES\` is an object mapping each name to a two-argument function built on JavaScript's bitwise operators — \`a & b\`, \`a | b\`, \`a ^ b\`, and the negated forms for \`NAND\` and \`NOR\`. The picker buttons are generated from \`Object.keys(GATES)\`, so adding \`XNOR\` means adding one entry and nothing else: the picker, the evaluation, and the truth table all pick it up automatically. Using bitwise operators on 0/1 integers rather than booleans keeps the whole model in the same representation the truth table displays.

**Live state shown on the wires**

\`evaluate()\` returns both the intermediate value out of the first gate and the final output, which lets the UI light each gate independently — so a player flipping switches can see where a signal dies. That intermediate readout is the difference between a puzzle and an explanation: when the output is dark, you can tell at a glance whether the first gate produced a 0 or the second gate consumed a 1 and produced nothing. The row of the truth table matching the current switch positions is marked, tying the interactive view and the exhaustive view together.

**Puzzles that build toward parity**

The five targets run from a three-way AND, through an OR feeding an AND, an XOR feeding an OR, a three-input parity check (output high when an odd number of inputs are on — the basis of parity bits and checksums), and finally a NAND-based condition. Parity is the one that repays study: it is the standard example of a function that cannot be expressed without XOR-like behaviour, and building it by hand is more convincing than reading that fact.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the target in plain English', text: 'Each puzzle describes the behaviour you have to build — "light the output when an odd number of switches are on" — rather than naming the gates, so you have to reason about the logic instead of following instructions.' },
        { title: 'Pick a gate for each slot', text: 'The five buttons set the gate type for the currently highlighted slot, then move the highlight to the other slot automatically. Clicking a gate in the circuit selects it directly if you want to change just one.' },
        { title: 'Flip the switches to test', text: 'A, B and C toggle between 0 and 1. Both gates light independently, so you can see whether a dark output is because the first gate produced 0 or the second consumed a 1 and produced nothing.' },
        { title: 'Watch the full truth table', text: 'All eight input combinations are evaluated on every change and shown as want versus got. A circuit that is right for the switches you are looking at but wrong elsewhere shows exactly which rows disagree.' },
        { title: 'Match all eight rows to solve', text: 'The puzzle clears when every row matches — not when the current switch state happens to look right. Any gate combination producing the correct output column is accepted, and several puzzles have more than one valid answer.' },
        { title: 'Work up to the parity puzzle', text: 'The five targets progress from a three-way AND to a parity check that lights when an odd number of switches are on — the logic behind parity bits and simple checksums.' },
      ],
    },
    features: [
      'Win condition evaluated across all eight input combinations, not just the current switch state',
      'Truth table rows generated by bit extraction from 0-7 rather than a hand-written table',
      'Targets defined as JavaScript functions, so any behaviourally equivalent gate combination is accepted',
      'Five gate types as a lookup table of pure functions built on bitwise operators, with the picker generated from its keys',
      'Intermediate gate output exposed alongside the final result, so a dead signal can be located visually',
      'Want-versus-got columns per row, showing exactly which input combinations still disagree',
      'The truth-table row matching the current switch positions highlighted, linking the interactive and exhaustive views',
      'Five puzzles progressing to a three-input parity check, the basis of parity bits and checksums',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching Boolean logic, truth tables and digital fundamentals', desc: 'Grading against the full truth table teaches the habit of checking all cases rather than the visible one — the same discipline that prevents conditional bugs in ordinary code. It sits well beside a [binary bit flip game](/ui-snippets/binary-bit-flip-game/) in a computer-fundamentals sequence.' },
      { icon: 'CODE', title: 'Explaining complex conditionals in code review or docs', desc: 'A nested condition with three variables has eight cases, and most bugs live in the two nobody considered. Presenting the same want-versus-got table for a real conditional is a directly transferable technique from this snippet.' },
      { icon: 'APP', title: 'STEM outreach, electronics courses, and museum kiosks', desc: 'Switches, wires and a lamp are a familiar physical metaphor, so the puzzle works for visitors with no programming background at all — no typing required and a round takes under a minute.' },
      { icon: 'FLOW', title: 'Reference for exhaustive-case evaluation in a UI', desc: 'Generating every input combination by bit extraction and evaluating a pure function against each is a compact pattern for any interface that needs to show behaviour across a whole input space — feature-flag matrices, permission combinations, or pricing rule testers.' },
      { icon: 'DESIGN', title: 'Circuit-diagram UI without a diagramming library', desc: 'The whole circuit is flex containers with border and background states, which makes it a lightweight approach for schematic-style interfaces that would otherwise pull in an SVG diagramming dependency.' },
      { icon: 'FORM', title: 'Rule-builder interfaces with live evaluation', desc: 'Products that let users assemble conditions — automation triggers, audience segments, alert rules — can borrow the pattern of showing the assembled rule\'s result across a table of sample cases rather than asking the user to trust it.' },
      { icon: 'CODE', title: 'Related: Hangman Word Guessing Game', desc: 'See the [Hangman Word Guessing Game](/ui-snippets/hangman-word-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the puzzle check the switches I am looking at, or every possible input?', a: 'Every possible input. All eight combinations of A, B and C are evaluated on every change and shown as want versus got, and the puzzle only clears when all eight rows match. A circuit that happens to be correct for the current switch positions but wrong elsewhere is explicitly shown as wrong — which is the same failure mode as a conditional tested on only one case.' },
      { q: 'Is there one correct pair of gates per puzzle?', a: 'Not necessarily. Levels define their target as a function of (a, b, c), and any gate combination producing the same output column is accepted. Because NAND and NOR are functionally complete, several puzzles have more than one valid answer — grading behaviour rather than structure is what makes the game teach Boolean equivalence.' },
      { q: 'How are the eight truth-table rows generated?', a: 'By extracting bits from the numbers 0 through 7: (i >> 2) & 1 for A, (i >> 1) & 1 for B, and i & 1 for C. That produces the canonical truth-table ordering automatically, with no hand-written table to get out of sync, and the same technique scales to four or more inputs by widening the loop.' },
      { q: 'How do I add another gate type or another puzzle?', a: 'Add an entry to the GATES object — for example XNOR as (a, b) => (a ^ b) ? 0 : 1 — and the picker, the evaluation and the truth table all pick it up, since the buttons are generated from Object.keys(GATES). For a new puzzle, push an object onto LEVELS with a plain-English goal and a want function of (a, b, c) returning 0 or 1.' },
      { q: 'Can I use this logic gate game in React, Vue, or Angular?', a: 'Yes, and it maps unusually well because evaluate() and every gate are pure functions. Hold the two gate choices, the three input bits and the active slot in component state; derive the live wire values, the output, and the entire truth table during render rather than mutating classes. The only side effect is the advance timeout after a solve, which should be cleared on unmount (useEffect cleanup, onUnmounted, ngOnDestroy) so a level change cannot fire after the component is gone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a NAND-only mode where every slot is forced to NAND and the circuit grows to four or five gates — building AND, OR and XOR out of nothing but NAND is the classic demonstration of functional completeness, and it is genuinely satisfying to solve. Other extensions worth requesting: let the player add and remove gate slots so the circuit shape is part of the puzzle, add a fourth input with a sixteen-row truth table, add a score based on gate count so simpler solutions win, or generate the plain-English goal automatically from the target function so new puzzles need only a Boolean expression.`,
      prompt: `Build a playable logic gate puzzle game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A fixed two-gate circuit wired as gate1(gate0(A, B), C), with three input switches that toggle between 0 and 1 and an output indicator.
- A GATES lookup object mapping names (AND, OR, XOR, NAND, NOR) to two-argument pure functions built on bitwise operators, with the gate picker buttons generated from Object.keys(GATES) so adding a gate type requires only a new entry.
- Levels that define their target as a JavaScript function of (a, b, c) returning 0 or 1 — never as a required pair of gate names — so ANY behaviourally equivalent gate combination clears the puzzle.
- Generate the eight truth-table rows by bit extraction from the numbers 0-7 ((i >> 2) & 1, (i >> 1) & 1, i & 1) rather than hand-writing a table.
- Evaluate the circuit against ALL eight input combinations on every change and display want versus got per row, colouring each row. The puzzle clears only when all eight rows match — never merely when the current switch state looks right.
- Expose the intermediate value out of the first gate as well as the final output, and light each gate independently so a player can see where a signal dies. Highlight the truth-table row matching the current switch positions.
- Include at least five puzzles described in plain English, progressing to a three-input parity check (output high when an odd number of inputs are on), and report the solved expression in the success message.`,
    },
  },
};

export default logicGatePuzzleGame;
