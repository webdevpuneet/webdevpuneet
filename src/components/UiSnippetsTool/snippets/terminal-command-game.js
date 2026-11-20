const terminalCommandGame = {
  id: 'terminal-command-game',
  title: 'Terminal Command Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="tc-game">
    <div class="tc-head">
      <div class="tc-meta"><span class="tc-label">Task</span><span class="tc-value" id="tcNum">1 / 8</span></div>
      <div class="tc-meta tc-right"><span class="tc-label">Solved</span><span class="tc-value" id="tcScore">0</span></div>
    </div>

    <p class="tc-task" id="tcTask">List every file in this folder, including hidden ones.</p>

    <div class="tc-term" id="tcTerm">
      <div class="tc-bar"><span class="tc-dot r"></span><span class="tc-dot y"></span><span class="tc-dot g"></span><span class="tc-title">bash — project</span></div>
      <div class="tc-scroll" id="tcScroll">
        <div class="tc-out" id="tcOut"></div>
        <div class="tc-line">
          <span class="tc-prompt">~/project $</span>
          <input class="tc-input" id="tcInput" type="text" spellcheck="false" autocomplete="off" autocapitalize="off">
        </div>
      </div>
    </div>

    <p class="tc-status" id="tcStatus">Type the command and press Enter.</p>
    <div class="tc-actions">
      <button class="tc-link" id="tcHint">Show hint</button>
      <button class="tc-link" id="tcSkip">Skip task</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0b0f14; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 26px 16px; }

.tc-game {
  width: 100%; max-width: 460px; padding: 20px;
  background: #131a22; border: 1px solid #1f2933; border-radius: 16px;
  display: flex; flex-direction: column; gap: 13px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

.tc-head { display: flex; justify-content: space-between; }
.tc-meta { display: flex; flex-direction: column; gap: 2px; }
.tc-right { align-items: flex-end; }
.tc-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.tc-value { font-size: 16px; font-weight: 800; color: #e6edf3; }

.tc-task {
  font-size: 13.5px; font-weight: 600; color: #e6edf3; line-height: 1.5;
  background: #0b0f14; border-left: 3px solid #22c55e; border-radius: 0 8px 8px 0; padding: 10px 12px;
}

.tc-term { border-radius: 11px; overflow: hidden; border: 1px solid #1f2933; background: #05080b; }
.tc-bar { display: flex; align-items: center; gap: 6px; padding: 8px 11px; background: #0b0f14; border-bottom: 1px solid #1f2933; }
.tc-dot { width: 9px; height: 9px; border-radius: 50%; }
.tc-dot.r { background: #f87171; } .tc-dot.y { background: #fbbf24; } .tc-dot.g { background: #4ade80; }
.tc-title { margin-left: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: #64748b; }

.tc-scroll { max-height: 190px; overflow-y: auto; padding: 11px 12px; }
.tc-out { display: flex; flex-direction: column; gap: 2px; margin-bottom: 4px; }
.tc-out div {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.6;
  color: #9fb3c8; white-space: pre-wrap; word-break: break-word;
}
.tc-out .echo { color: #e6edf3; }
.tc-out .ok { color: #4ade80; }
.tc-out .err { color: #f87171; }

.tc-line { display: flex; align-items: center; gap: 7px; }
.tc-prompt { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; font-weight: 700; color: #22c55e; flex: 0 0 auto; }
.tc-input {
  flex: 1; min-width: 0; border: none; outline: none; background: transparent; color: #e6edf3;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; caret-color: #22c55e;
}

.tc-status { font-size: 12px; font-weight: 600; color: #64748b; min-height: 17px; }
.tc-status.ok { color: #4ade80; }
.tc-status.err { color: #f87171; }

.tc-actions { display: flex; gap: 14px; }
.tc-link {
  background: none; border: none; padding: 0; cursor: pointer; font-family: inherit;
  font-size: 12px; font-weight: 600; color: #64748b; text-decoration: underline;
}
.tc-link:hover { color: #86efac; }`,

  js: `var TASKS = [
  {
    task: 'List every file in this folder, including hidden ones.',
    // Accepted as regex so flag order and combined flags all pass.
    accept: ['^ls\\\\s+-(?=[al]*a)[al]+$'],
    output: ['.  ..  .env  .git  package.json  src  README.md'],
    hint: 'ls hides dotfiles by default. The -a flag means "all".',
    why: 'ls -a (or -la for the long listing) includes entries starting with a dot, which is how hidden files are marked on Unix systems.',
  },
  {
    task: 'Print the full path of the folder you are standing in.',
    accept: ['^pwd$'],
    output: ['/home/dev/project'],
    hint: 'Three letters. "Print working directory".',
    why: 'pwd prints the absolute path of the current working directory — useful in scripts where a relative path would be ambiguous.',
  },
  {
    task: 'Create a new folder called notes.',
    accept: ['^mkdir\\\\s+(-p\\\\s+)?notes/?$'],
    output: [''],
    hint: 'Make directory. The folder name goes after the command.',
    why: 'mkdir notes creates one directory. Adding -p creates any missing parent folders too, and does not error if the folder already exists.',
  },
  {
    task: 'Search every file under this folder for the text TODO.',
    accept: ['^grep\\\\s+-[rRni]*r[rRni]*\\\\s+["\\']?TODO["\\']?\\\\s+\\\\.?$'],
    output: ['src/app.js:42:  // TODO: handle empty cart', 'src/api.js:8:  // TODO: retry on 429'],
    hint: 'grep searches text. The -r flag makes it recurse into subfolders.',
    why: 'grep -r "TODO" . walks the directory tree from the current folder. Without -r, grep only reads the files you name explicitly.',
  },
  {
    task: 'Show the last 20 lines of app.log.',
    accept: ['^tail\\\\s+(-n\\\\s*20|-20)\\\\s+app\\\\.log$'],
    output: ['[12:04:11] GET /api/cart 200', '[12:04:12] GET /api/user 200', '… 18 more lines'],
    hint: 'tail reads the end of a file. -n sets how many lines.',
    why: 'tail -n 20 app.log prints the final 20 lines. Add -f to follow the file live as new lines are appended — the standard way to watch a log.',
  },
  {
    task: 'Make the script deploy.sh executable.',
    accept: ['^chmod\\\\s+\\\\+x\\\\s+(\\\\./)?deploy\\\\.sh$', '^chmod\\\\s+7[0-9][0-9]\\\\s+(\\\\./)?deploy\\\\.sh$'],
    output: [''],
    hint: 'chmod changes permissions. +x adds the execute bit.',
    why: 'chmod +x deploy.sh adds execute permission for everyone who already has read access. The numeric form (chmod 755) sets all permission bits at once instead of adding one.',
  },
  {
    task: 'Copy the whole src folder to a folder called backup.',
    accept: ['^cp\\\\s+-[rRa]+\\\\s+src/?\\\\s+backup/?$'],
    output: [''],
    hint: 'cp copies. Copying a folder needs the recursive flag.',
    why: 'cp -r src backup copies the directory and everything inside it. Without -r, cp refuses to copy a directory at all.',
  },
  {
    task: 'Find every .log file anywhere under this folder.',
    accept: ['^find\\\\s+\\\\.\\\\s+-name\\\\s+["\\']?\\\\*\\\\.log["\\']?$'],
    output: ['./app.log', './tmp/debug.log', './src/old/build.log'],
    hint: 'find takes a starting path, then -name with a quoted pattern.',
    why: 'find . -name "*.log" searches recursively from the current folder. Quoting the pattern stops the shell expanding the * before find ever sees it — the mistake that makes this command behave differently in a folder that happens to contain a .log file.',
  },
];

var outEl = document.getElementById('tcOut');
var input = document.getElementById('tcInput');
var scrollEl = document.getElementById('tcScroll');
var taskEl = document.getElementById('tcTask');
var statusEl = document.getElementById('tcStatus');
var numEl = document.getElementById('tcNum');
var scoreEl = document.getElementById('tcScore');

var pos = 0;
var solved = 0;
var locked = false;

function task() { return TASKS[pos]; }

function print(text, cls) {
  var line = document.createElement('div');
  if (cls) line.className = cls;
  line.textContent = text;
  outEl.appendChild(line);
  scrollEl.scrollTop = scrollEl.scrollHeight;
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'tc-status' + (kind ? ' ' + kind : '');
}

// Collapse runs of whitespace so "ls   -a" and "ls -a" are the same command.
function normalise(value) {
  return value.trim().replace(/\\s+/g, ' ');
}

function matches(value) {
  var cmd = normalise(value);
  return task().accept.some(function (pattern) {
    return new RegExp(pattern).test(cmd);
  });
}

function submit() {
  if (locked) return;
  var raw = input.value;
  if (!normalise(raw)) return;

  print('~/project $ ' + raw, 'echo');
  input.value = '';

  if (matches(raw)) {
    locked = true;
    solved++;
    scoreEl.textContent = solved;
    task().output.forEach(function (line) { if (line) print(line); });
    print(task().why, 'ok');
    setStatus('Correct.', 'ok');
    setTimeout(next, 1500);
  } else {
    print('command did not do what the task asked', 'err');
    setStatus('Not quite — try again, or take a hint.', 'err');
  }
}

function next() {
  if (pos === TASKS.length - 1) {
    print('— all ' + TASKS.length + ' tasks complete, resetting —', 'ok');
    pos = 0;
    solved = 0;
    setTimeout(function () { outEl.innerHTML = ''; load(); }, 1200);
    return;
  }
  pos++;
  load();
}

function load() {
  locked = false;
  taskEl.textContent = task().task;
  numEl.textContent = (pos + 1) + ' / ' + TASKS.length;
  scoreEl.textContent = solved;
  setStatus('Type the command and press Enter.', '');
  input.focus();
}

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') submit();
});
document.getElementById('tcTerm').addEventListener('click', function () { input.focus(); });
document.getElementById('tcHint').addEventListener('click', function () {
  print(task().hint);
  setStatus('Hint printed to the terminal.', '');
});
document.getElementById('tcSkip').addEventListener('click', function () {
  if (locked) return;
  print('skipped — ' + task().why);
  next();
});

load();

/* wdp-share:start */
(function () {
  var TITLE = 'Terminal Command Game', URL = 'https://webdevpuneet.com/ui-snippets/terminal-command-game/';
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
    title: 'Terminal Command Game — Free HTML CSS JS Snippet',
    description: 'Type real shell commands to complete eight tasks in a simulated terminal, graded by regex so flag order and variants all pass. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Terminal Command Game — Regex-Graded Shell Tasks, Simulated Output & An Explanation After Every Solve',
      description: `Command-line fluency is built from a few dozen commands used often enough to become muscle memory, and the fastest way to build it is to be given a goal rather than a command to copy. This snippet is a playable terminal trainer: each task states an outcome in plain English — list hidden files, search a tree for TODO, make a script executable — and the player types the command they think does it into a working terminal UI, which echoes the input, prints plausible output, and explains what the command actually did.

**Grading with regular expressions, not string equality**

Real shell usage does not have one canonical spelling. \`ls -a\` and \`ls -la\` both list hidden files; \`tail -n 20 app.log\` and \`tail -20 app.log\` are equivalent; \`grep -rn "TODO" .\` is as valid as \`grep -r TODO .\`. Each task therefore carries an \`accept\` array of regex patterns rather than a literal answer, and the patterns are written to tolerate flag order, combined short flags, optional quoting, and trailing slashes on directory names. A lookahead such as \`-(?=[al]*a)[al]+\` accepts any combination of \`a\` and \`l\` flags as long as \`a\` is present, which is exactly the rule the task actually cares about.

**Normalising before matching**

\`normalise()\` trims the input and collapses every run of whitespace to a single space before any pattern runs, so \`ls   -a\` with stray spacing grades identically to \`ls -a\`. Doing this once, in one place, keeps every regex simpler — no pattern needs to litter itself with \`\\s+\` alternatives for spacing the player might have typed. It is also the correct order of operations: normalise the input, then test it, rather than trying to write patterns tolerant of arbitrary formatting.

**A terminal that behaves like a terminal**

Submitted commands are echoed after the prompt exactly as typed, output lines print beneath, and the scroll container is pinned to the bottom on every write so the newest line is always visible. Clicking anywhere in the terminal focuses the input, which is the small affordance that makes a simulated terminal feel real rather than like a form field with a monospace font. Output is written with \`textContent\` on generated elements rather than by concatenating HTML, so a player who types something containing angle brackets sees their own text rather than injecting markup.

**Explanations that generalise past the answer**

Every solved task prints a \`why\` line explaining not just what the command did but the rule behind it — that \`-a\` reveals dot-prefixed entries because that is how hidden files are marked on Unix, that \`cp\` refuses directories without \`-r\`, that quoting \`"*.log"\` stops the shell expanding the glob before \`find\` ever receives it. That last one is the kind of detail that turns a command someone copied into a command they understand, and it is the reason the same command sometimes behaves differently in a different folder.

**Task data drives everything**

Each task is a single object with the plain-English goal, the accept patterns, the simulated output lines, a hint, and the explanation. Adding a task is one array entry — the counter in the header, the end-of-round reset, and the skip and hint buttons all derive from the array — and no command is ever executed anywhere, since the "output" is authored text chosen to look like the real thing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the task, not a command', text: 'Each task states an outcome in plain English — list hidden files, show the last 20 lines of a log, make a script executable — so you have to recall the command rather than copy one.' },
        { title: 'Type into the terminal and press Enter', text: 'Clicking anywhere in the terminal window focuses the input. Your command is echoed after the prompt exactly as typed, the way a real shell does.' },
        { title: 'Get credit for any valid form', text: 'Answers are graded with regular expressions, so ls -a and ls -la both pass, tail -n 20 and tail -20 are equivalent, and quoting or a trailing slash on a directory name does not matter.' },
        { title: 'Read the explanation after a solve', text: 'A correct command prints plausible output followed by a green explanation of the rule behind it — why cp needs -r for directories, why the glob in find should be quoted, what -a actually means on a Unix filesystem.' },
        { title: 'Take a hint if you are stuck', text: 'Show hint prints a nudge into the terminal itself rather than a popup, describing the command\'s purpose without giving the exact syntax away.' },
        { title: 'Work through all eight tasks', text: 'Tasks cover ls, pwd, mkdir, grep, tail, chmod, cp and find — the core of everyday shell work. Completing the last one resets the terminal for another pass.' },
      ],
    },
    features: [
      'Eight tasks covering ls, pwd, mkdir, grep, tail, chmod, cp and find, stated as outcomes rather than commands',
      'Regex-based grading with an accept array per task, tolerating flag order, combined short flags, optional quoting and trailing slashes',
      'Input normalised once (trimmed, whitespace collapsed) before any pattern runs, keeping every regex simple',
      'Authored simulated output per task — nothing is ever executed',
      'An explanation printed after every solve covering the rule behind the command, not just the answer',
      'Terminal-accurate behaviour: prompt echo of the raw input, auto-scroll to the newest line, click-anywhere-to-focus',
      'Output written with textContent on generated elements, so typed angle brackets cannot inject markup',
      'Hints printed into the terminal stream rather than into a separate popup',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching the command line to beginners or bootcamp students', desc: 'Stating the goal instead of the command is what builds recall, and the per-solve explanations mean students learn the rule rather than a string to paste. It pairs well with a [bug hunt game](/ui-snippets/bug-hunt-game/) when moving from tooling to reading code.' },
      { icon: 'CODE', title: 'Interactive onboarding for a CLI product', desc: 'Swap the TASKS array for your own tool\'s commands and the game becomes a guided first-run tutorial that lets people practise your syntax without touching a real system — no sandbox infrastructure, no risk of a destructive command.' },
      { icon: 'APP', title: 'Developer marketing pages, careers sites and booth screens', desc: 'A terminal that responds to real commands reads as credible to a technical audience instantly, and a task or two makes a memorable interactive moment on an otherwise static page.' },
      { icon: 'DESIGN', title: 'Terminal UI pattern for docs, demos and product tours', desc: 'The window chrome, prompt line, echo-and-output stream, auto-scroll and click-to-focus behaviour together form a reusable simulated-terminal component for any docs page that wants a playable console instead of a screenshot.' },
      { icon: 'FLOW', title: 'Reference for tolerant answer matching', desc: 'Normalise once, then test against an array of accepting patterns, is the right shape for grading any free-text input with multiple valid forms — quiz apps, search-syntax trainers, and command palettes with alias support all need exactly this.' },
      { icon: 'FORM', title: 'Safe practice environment for destructive commands', desc: 'Because nothing is executed and the output is authored, tasks can safely cover commands you would never let a learner run for real — the simulation teaches the syntax without any possibility of touching a filesystem.' },
      { icon: 'CODE', title: 'Related: Word Search Puzzle Grid', desc: 'See the [Word Search Puzzle Grid](/ui-snippets/word-search-puzzle/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the game actually run the commands I type?', a: 'No. Nothing is executed anywhere — each task carries authored output lines chosen to look like real shell output, and grading is a regex test against the typed string. That is what makes it safe to practise commands you would not want a learner running against a real filesystem.' },
      { q: 'Why are answers graded with regular expressions?', a: 'Because most shell tasks have several correct spellings. ls -a and ls -la both list hidden files, tail -n 20 and tail -20 are the same request, and quoting a glob is optional in some shells. Each task holds an array of accept patterns written to tolerate flag order, combined short flags, optional quotes and trailing slashes, so a valid command is not rejected on formatting.' },
      { q: 'What does the normalise() step do before matching?', a: 'It trims the input and collapses every run of whitespace to a single space, so "ls   -a" grades identically to "ls -a". Doing that once means no accept pattern has to account for arbitrary spacing, which keeps the patterns readable and stops them from quietly disagreeing with each other about whitespace.' },
      { q: 'How do I add my own tasks or use my own CLI?', a: 'Push an object onto TASKS with five keys: task (the plain-English goal), accept (an array of regex source strings), output (an array of lines to print on success), hint (a nudge that stops short of the syntax), and why (the explanation printed after a solve). Write accept patterns anchored with ^ and $, and remember the input has already been whitespace-normalised.' },
      { q: 'Can I use this terminal game in React, Vue, or Angular?', a: 'Yes. Keep TASKS and the normalise/matches helpers in a plain module, hold the line history and current task index in component state, and render history lines from that array instead of appending DOM nodes — that also removes the manual scroll management if you keep a ref and scroll to the bottom in an effect after each append. The post-solve setTimeout should be cleared on unmount (useEffect cleanup, onUnmounted, ngOnDestroy) so a task advance cannot fire after the component is gone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add command history navigation with the up and down arrow keys plus a simple tab-completion for the file names mentioned in the current task — both are things a real shell does that players immediately reach for, and both are small, self-contained state problems. Other good extensions: add a simulated filesystem object that commands actually mutate so mkdir and cp change what a later ls prints, add a piping task set (grep piped into wc -l) with patterns that accept either order of equivalent pipelines, track per-command accuracy in localStorage to surface which commands need practice, or fork the task list into a git edition covering branch, rebase and reset.`,
      prompt: `Build a playable terminal command training game in plain HTML, CSS, and JavaScript — no frameworks or libraries, and without executing anything.

Requirements:
- A TASKS array where each entry has a plain-English goal (state the OUTCOME, never the command), an accept array of regex source strings, an array of authored output lines to print on success, a hint, and an explanation of the rule behind the command.
- Cover the core of everyday shell work: listing hidden files, printing the working directory, creating a directory, recursively searching for text, tailing the last N lines of a log, making a script executable, recursively copying a folder, and finding files by glob.
- Grade with regular expressions rather than string equality so every valid form passes — ls -a and ls -la, tail -n 20 and tail -20, quoted and unquoted globs, optional trailing slashes on directory arguments, and any order of combined short flags.
- Normalise the input once before matching (trim, collapse runs of whitespace to a single space) so no accept pattern has to handle arbitrary spacing.
- Render a terminal window with title-bar chrome, a prompt line with an inline input, an output stream that echoes the raw typed command, auto-scroll to the newest line, and click-anywhere-in-the-terminal to focus the input.
- Write all output with textContent on generated elements so typed angle brackets cannot inject markup.
- After a correct answer, print the simulated output followed by an explanation of the underlying rule — why cp needs -r, why a find glob should be quoted, what -a means on a Unix filesystem — then advance. Include hint and skip actions that print into the terminal stream rather than into a popup, plus task and solved counters.`,
    },
  },
};

export default terminalCommandGame;
