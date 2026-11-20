const clickSpeedTest = {
  id: 'click-speed-test',
  title: 'Click Speed Test (CPS Counter)',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="test-panel">
    <div class="duration-select" id="duration-select">
      <button class="dur-btn active" data-dur="5">5s</button>
      <button class="dur-btn" data-dur="10">10s</button>
      <button class="dur-btn" data-dur="30">30s</button>
    </div>

    <div class="stat-row">
      <div class="stat-box">
        <span class="stat-label">Time Left</span>
        <span class="stat-value" id="stat-time">5.0s</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Clicks</span>
        <span class="stat-value" id="stat-clicks">0</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Best CPS</span>
        <span class="stat-value" id="stat-best">0</span>
      </div>
    </div>

    <button class="click-target" id="click-target">
      <span id="target-label">Click to Start</span>
    </button>

    <div class="results hidden" id="results">
      <p class="results-title">Results</p>
      <div class="results-grid">
        <div><span class="res-label">Total Clicks</span><span class="res-value" id="res-clicks">0</span></div>
        <div><span class="res-label">CPS</span><span class="res-value" id="res-cps">0</span></div>
        <div><span class="res-label">Tier</span><span class="res-value" id="res-tier">-</span></div>
      </div>
      <button class="btn-again" id="btn-again">Try Again</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 32px 16px; }

.test-panel {
  width: 100%; max-width: 360px; padding: 24px;
  background: #fff; border-radius: 18px; border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; gap: 18px; align-items: center;
}

.duration-select { display: flex; background: #f1f5f9; border-radius: 10px; padding: 4px; gap: 4px; width: 100%; }
.dur-btn {
  flex: 1; padding: 8px; border: none; background: transparent; border-radius: 7px;
  font-size: 13px; font-weight: 600; color: #64748b; cursor: pointer; font-family: inherit;
  transition: all 0.15s;
}
.dur-btn.active { background: #fff; color: #6366f1; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.dur-btn:disabled { cursor: not-allowed; opacity: 0.5; }

.stat-row { display: flex; gap: 8px; width: 100%; }
.stat-box { flex: 1; text-align: center; padding: 10px 6px; background: #f8fafc; border-radius: 10px; border: 1px solid #f1f5f9; }
.stat-label { display: block; font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
.stat-value { display: block; font-size: 18px; font-weight: 800; color: #1e293b; }

.click-target {
  width: 200px; height: 200px; border-radius: 50%;
  background: linear-gradient(145deg, #6366f1, #4f46e5);
  color: #fff; border: none; cursor: pointer;
  font-size: 16px; font-weight: 700; font-family: inherit;
  display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;
  box-shadow: 0 10px 30px rgba(99,102,241,0.35);
  transition: transform 0.08s;
  user-select: none;
}
.click-target:active { transform: scale(0.96); }
.click-target.disabled { background: #cbd5e1; box-shadow: none; cursor: not-allowed; }
.click-target.counting { animation: pulse 1s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { box-shadow: 0 10px 30px rgba(99,102,241,0.35); }
  50% { box-shadow: 0 10px 40px rgba(99,102,241,0.6); }
}

.results { width: 100%; display: flex; flex-direction: column; gap: 12px; align-items: center; }
.results-title { font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.results-grid { display: flex; gap: 10px; width: 100%; }
.results-grid > div { flex: 1; text-align: center; padding: 12px 6px; background: #eef2ff; border-radius: 10px; }
.res-label { display: block; font-size: 10px; font-weight: 700; color: #6366f1; text-transform: uppercase; margin-bottom: 4px; }
.res-value { display: block; font-size: 17px; font-weight: 800; color: #312e81; }
.btn-again { width: 100%; padding: 11px; border: none; border-radius: 9px; background: #6366f1; color: #fff; font-weight: 600; font-size: 14px; cursor: pointer; font-family: inherit; }
.btn-again:hover { background: #4f46e5; }
.hidden { display: none; }`,

  js: `const STORAGE_PREFIX = 'cps-best-';
let duration = 5;
let clicks = 0;
let running = false;
let startTime = null;
let timerId = null;

function getBest(dur) {
  const raw = localStorage.getItem(STORAGE_PREFIX + dur);
  return raw ? parseFloat(raw) : 0;
}

function setBest(dur, cps) {
  const current = getBest(dur);
  if (cps > current) {
    localStorage.setItem(STORAGE_PREFIX + dur, String(cps));
    return cps;
  }
  return current;
}

function updateBestDisplay() {
  document.getElementById('stat-best').textContent = getBest(duration).toFixed(1);
}

function tierFor(cps) {
  if (cps < 4) return 'Average';
  if (cps < 7) return 'Fast';
  if (cps < 10) return 'Very Fast';
  return 'Superhuman';
}

function resetPanel() {
  clicks = 0;
  running = false;
  startTime = null;
  clearInterval(timerId);
  document.getElementById('stat-clicks').textContent = '0';
  document.getElementById('stat-time').textContent = duration.toFixed(1) + 's';
  document.getElementById('target-label').textContent = 'Click to Start';
  document.getElementById('click-target').classList.remove('disabled', 'counting');
  document.getElementById('results').classList.add('hidden');
  document.querySelectorAll('.dur-btn').forEach(b => b.disabled = false);
  updateBestDisplay();
}

function startTest() {
  running = true;
  clicks = 1; // this click counts as the first click
  startTime = performance.now();
  document.getElementById('stat-clicks').textContent = clicks;
  document.getElementById('target-label').textContent = 'GO!';
  document.getElementById('click-target').classList.add('counting');
  document.querySelectorAll('.dur-btn').forEach(b => b.disabled = true);

  timerId = setInterval(tick, 50);
}

function tick() {
  const elapsed = (performance.now() - startTime) / 1000;
  const remaining = Math.max(0, duration - elapsed);
  document.getElementById('stat-time').textContent = remaining.toFixed(1) + 's';
  if (remaining <= 0) {
    finishTest();
  }
}

function finishTest() {
  clearInterval(timerId);
  running = false;
  document.getElementById('stat-time').textContent = '0.0s';
  document.getElementById('click-target').classList.remove('counting');
  document.getElementById('click-target').classList.add('disabled');
  document.getElementById('target-label').textContent = 'Time\\'s Up';

  const cps = Math.round((clicks / duration) * 100) / 100;
  const best = setBest(duration, cps);

  document.getElementById('res-clicks').textContent = clicks;
  document.getElementById('res-cps').textContent = cps.toFixed(2);
  document.getElementById('res-tier').textContent = tierFor(cps);
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('stat-best').textContent = best.toFixed(1);
}

function handleTargetClick() {
  if (document.getElementById('click-target').classList.contains('disabled')) return;

  if (!running) {
    startTest();
    return;
  }

  clicks++;
  document.getElementById('stat-clicks').textContent = clicks;
}

function selectDuration(dur) {
  if (running) return;
  duration = dur;
  document.querySelectorAll('.dur-btn').forEach(b => {
    b.classList.toggle('active', Number(b.dataset.dur) === dur);
  });
  resetPanel();
}

document.getElementById('click-target').addEventListener('click', handleTargetClick);
document.getElementById('btn-again').addEventListener('click', resetPanel);
document.getElementById('duration-select').addEventListener('click', e => {
  const btn = e.target.closest('.dur-btn');
  if (btn) selectDuration(Number(btn.dataset.dur));
});

resetPanel();

/* wdp-share:start */
(function () {
  var TITLE = 'Click Speed Test (CPS Counter)', URL = 'https://webdevpuneet.com/ui-snippets/click-speed-test/';
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
    title: 'Click Speed Test (CPS Counter) — Free HTML CSS JS Snippet',
    description: 'Timed CPS click-speed test with duration presets, live countdown, skill tiers and localStorage best-score tracking. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Click Speed Test — Timed CPS Counter, Skill Tiers & Persisted Best Score',
      description: `Click-speed tests (often searched as "CPS test" or "clicks per second test") are a small but genuinely popular novelty tool category, and building one correctly involves more timing precision than it first appears. This snippet implements a complete, accurate CPS counter in vanilla JavaScript: a selectable test duration, a live countdown, a running click tally, a calculated clicks-per-second result with a skill tier, and a persisted personal best stored in \`localStorage\`.

**Accurate timing with performance.now(), not setInterval counting**

A naive implementation might count down by decrementing a variable inside a one-second \`setInterval\`, but that approach drifts — \`setInterval\` is not guaranteed to fire at exactly the requested interval under load, and integer-second countdowns cannot express fractional time remaining. This snippet instead records a single \`startTime\` timestamp using \`performance.now()\` (a monotonic, sub-millisecond-precision clock unaffected by system clock adjustments) the instant the test begins, and every 50 milliseconds a lightweight \`tick()\` function recalculates \`remaining = duration - (performance.now() - startTime) / 1000\` from scratch. Because the remaining time is always derived from the actual elapsed wall-clock time rather than accumulated by repeated subtraction, the countdown stays accurate even if a particular \`tick()\` call is delayed by the browser's event loop — the next tick simply recalculates correctly rather than compounding the drift.

**Duration presets as a segmented control**

Three duration presets (5, 10, and 30 seconds) are implemented as a segmented control of \`.dur-btn\` buttons sharing a single \`data-dur\` attribute convention. \`selectDuration()\` updates the shared \`duration\` variable, toggles the \`.active\` class based on a numeric comparison against \`data-dur\`, and calls \`resetPanel()\` to sync every dependent display (the countdown label, the stored best score for that specific duration) to the newly selected duration. Duration selection is locked out with \`b.disabled = true\` while a test is running, preventing a user from changing the test length mid-attempt and corrupting the result.

**First-click-starts, then counts pattern**

The single click target button does double duty: while idle, clicking it calls \`startTest()\`, which records the start timestamp and immediately counts that very click as click number one (\`clicks = 1\`, not zero) since the click that starts the timer is itself a genuine click within the test window. Every subsequent click while \`running\` is true simply increments the counter and updates the live display. Once the countdown reaches zero, \`finishTest()\` disables further clicks by adding a \`.disabled\` class (checked at the top of the click handler, guarding against a click landing in the tiny window between the timer expiring and the disabled class being applied) and calculates the final result.

**CPS calculation and skill tiering**

The final CPS figure is \`clicks / duration\`, rounded to two decimal places via \`Math.round(value * 100) / 100\` to avoid floating-point noise in the display while retaining meaningful precision. \`tierFor()\` then buckets that number into one of four skill labels using simple threshold comparisons: under 4 CPS is "Average", 4 up to 7 is "Fast", 7 up to 10 is "Very Fast", and 10 or above is "Superhuman" — mirroring the informal tiers that click-speed-test sites commonly use, since human click rates rarely exceed roughly 10-14 clicks per second even with practiced techniques like jitter-clicking or butterfly-clicking.

**Persisting a personal best per duration**

Because CPS is duration-dependent (short bursts tend to score higher than sustained 30-second attempts), best scores are stored separately per duration using a composite key, \`cps-best-{duration}\`, in \`localStorage\`. \`setBest()\` only overwrites the stored value if the new score genuinely exceeds it, and \`getBest()\` parses the stored string back to a float for display — together these give each duration preset its own persistent, always-improving personal record across browser sessions.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a test duration', text: 'Use the 5s / 10s / 30s segmented control at the top to choose your test length before starting. Selecting a duration calls resetPanel() and updates the displayed Best CPS to that duration\'s stored personal record.' },
        { title: 'Click the target to start', text: 'The large circular button reads "Click to Start" while idle. Your first click calls startTest(), records a performance.now() timestamp, and immediately counts as click number one — the timer and click counter both begin from that instant.' },
        { title: 'Click as fast as you can', text: 'Every subsequent click while the test is running increments the live Clicks counter. The countdown in Time Left recalculates from the actual elapsed time every 50ms via performance.now(), so it stays accurate even under heavy click load.' },
        { title: 'Read your results', text: 'When the countdown hits zero, the target disables and a results panel shows Total Clicks, calculated CPS (clicks divided by duration in seconds), and a skill Tier label from tierFor() — Average, Fast, Very Fast, or Superhuman.' },
        { title: 'Check your best score', text: 'setBest() compares your new CPS against the localStorage-persisted record for that specific duration and updates it only if you beat it, so Best CPS always reflects your all-time high for the currently selected duration.' },
        { title: 'Try again', text: 'Click "Try Again" to call resetPanel(), which clears the click count, restores the idle target label, re-enables the duration buttons, and re-syncs the Best CPS display for another attempt at the same duration.' },
      ],
    },
    features: [
      'Drift-free countdown using performance.now() timestamp deltas recalculated every tick, not accumulated subtraction',
      'Three selectable duration presets (5s/10s/30s) as a segmented control, locked during an active test',
      'First click both starts the timer and counts as the opening click, matching real click-speed-test UX conventions',
      'Live-updating click counter and countdown timer refreshed on a 50ms interval for smooth visual feedback',
      'CPS calculated as clicks / duration, rounded to two decimals to avoid floating-point display noise',
      'Four-tier skill labeling (Average/Fast/Very Fast/Superhuman) via simple threshold buckets in tierFor()',
      'Per-duration personal best persisted in localStorage under a composite cps-best-{duration} key',
      'Disabled-state guard prevents any click from registering in the gap between test end and UI lockout',
    ],
    useCases: [
      { icon: 'APP', title: 'Standalone CPS test tool or gaming-community feature', desc: 'Click-speed tests are a recurring search query among gamers checking their mouse/clicking technique for competitive games. This component is a complete, ready-to-ship implementation of that exact tool, needing only to be dropped onto a page — no backend, no external timing library, accurate to the millisecond via performance.now().' },
      { icon: 'LEARN', title: 'Teaching accurate JavaScript timing without setInterval drift', desc: 'This snippet is a clean worked example of the "record a start timestamp, recompute elapsed time on every tick" pattern that avoids the classic setInterval countdown-drift bug. It is a genuinely useful reference any time you need an accurate on-screen countdown or stopwatch in a browser context.' },
      { icon: 'FORM', title: 'Reflex or motor-skill self-assessment widget', desc: 'Beyond novelty, a CPS test is a simple, repeatable motor-skill benchmark. Embed it in a typing-test suite, reaction-time toolkit, or ergonomics-awareness page alongside other short self-assessment tools, using the persisted best score to let users track improvement over multiple sessions.' },
      { icon: 'DESIGN', title: 'Circular target button and stat-tile layout reference', desc: 'The large circular gradient click target with an active-state pulse animation, paired with compact stat-box tiles for time/clicks/best, is a reusable layout pattern for any "big primary action plus live stats" widget — swap the accent gradient and reuse the same structure elsewhere in a design system.' },
      { icon: 'CODE', title: 'Per-key localStorage best-score pattern for multi-mode tools', desc: 'Storing best scores under a composite key like cps-best-{duration} rather than a single flat value is the correct approach whenever a tool has multiple independent modes or settings that each deserve their own persisted record — the same technique extends cleanly to per-difficulty high scores in any small browser game.' },
      { icon: 'FLOW', title: 'Waiting-room or loading-screen micro-interaction', desc: 'A short, self-contained, addictive-by-design click challenge works well as an engagement filler during unavoidable waits (matchmaking queues, file uploads, checkout processing) — the fixed short duration presets keep any single attempt brief regardless of how long the actual wait turns out to be.' },
      { icon: 'CODE', title: 'Related: Breakout Brick Breaker', desc: 'See the [Breakout Brick Breaker](/ui-snippets/breakout-brick-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use performance.now() instead of Date.now() or a plain countdown variable?', a: 'performance.now() returns a monotonic, sub-millisecond timestamp that is never affected by system clock changes (daylight saving adjustments, NTP corrections) the way Date.now() can be, and because tick() recalculates remaining time from the delta against a fixed startTime rather than decrementing a counter, the countdown cannot accumulate drift even if individual setInterval callbacks fire slightly late under browser load.' },
      { q: 'Does the first click count towards the total, or only clicks after the timer starts?', a: 'The click that starts the test counts as click number one — startTest() sets clicks = 1 rather than 0, because that click genuinely happened within the test window (at time zero). This matches how most click-speed-test tools behave and avoids under-counting a real click.' },
      { q: 'How is the skill tier threshold decided, and can I change it?', a: 'tierFor() uses four simple numeric bands: below 4 CPS is Average, 4 to under 7 is Fast, 7 to under 10 is Very Fast, and 10 or higher is Superhuman. These thresholds are editable constants in the function body — adjust them if you want stricter or more lenient tiers, for example to calibrate against a specific competitive benchmark.' },
      { q: 'Why is the best score tracked separately for each duration instead of one overall best?', a: 'CPS naturally trends higher on shorter bursts than sustained longer attempts, so comparing a 5-second best against a 30-second best would be misleading. Storing best scores under a duration-specific localStorage key (cps-best-5, cps-best-10, cps-best-30) keeps each duration\'s personal record meaningful and directly comparable only to attempts of the same length.' },
      { q: 'Can I add more duration options or a custom duration input?', a: 'Yes. Add another .dur-btn element with its own data-dur value in the HTML, and the existing selectDuration() click delegation on #duration-select will handle it automatically with no JS changes needed. For a fully custom duration, replace the segmented control with a number input and call selectDuration(Number(input.value)) on change.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain exactly why performance.now() plus delta recalculation avoids the countdown drift that a naive setInterval-decrement approach would introduce — it's a small but genuinely instructive timing pattern worth understanding well. You could also ask it to add a live CPS graph that plots your click rate over the test duration rather than only showing the final average, implement a "consistency score" that measures variance between successive click intervals rather than just raw count, or add keyboard-triggerable clicking (spacebar) as an alternate input method for accessibility testing. Each is a natural extension once the core timing and counting logic is already solid.`,
      prompt: `Build a click-speed test (CPS counter) in plain HTML, CSS, and JavaScript with accurate timing — no frameworks, no libraries.

Requirements:
- A segmented control offering at least three duration presets (e.g. 5s, 10s, 30s) that can only be changed while no test is currently running.
- A large clickable target area that, on its first click while idle, starts a fixed-duration timed test using a monotonic timestamp (performance.now()) rather than a naively decremented counter, so the countdown cannot drift under load.
- A live countdown display and a live running click counter, both updating smoothly (e.g. every 50ms) throughout the test.
- When the timer reaches zero, the target must become disabled immediately with no possibility of a late click still registering, and a results panel must appear showing total clicks, calculated CPS (clicks divided by duration in seconds), and a skill tier label derived from simple CPS thresholds (e.g. under 4 "Average", 4-7 "Fast", 7-10 "Very Fast", 10+ "Superhuman").
- Persist a best CPS score per duration preset (not a single combined best) using localStorage, updating it only when a new attempt genuinely exceeds the stored value.
- A "Try Again" action that fully resets click count, timer display, and target state for a new attempt at the currently selected duration.
- Ensure the very first click that starts the timer is itself counted as a click, not lost.`,
    },
  },
};

export default clickSpeedTest;
