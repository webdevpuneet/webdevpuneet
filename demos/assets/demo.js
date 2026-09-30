/* ──────────────────────────────────────────────────────────────────────────
   demo.js — shared engine for every page under demos/<bucket>/<topic>/.

   A demo page holds nothing but raw source. Copy demos/_template/topic/ to
   demos/<bucket>/<topic>/ and fill in four blocks:

     <script type="text/plain" id="cdn">  one URL per line (optional)
     <script type="text/plain" id="html"> markup, pasted as-is
     <script type="text/plain" id="css">  styles, pasted as-is
     <script type="text/plain" id="js">   script, pasted as-is

   type="text/plain" means the browser neither runs nor parses those blocks —
   so nothing needs escaping. The single exception: if your JS contains the
   literal text </script>, write it as <\/script>.

   From those blocks this file assembles the live preview document, fills the
   HTML / CSS / JS tabs, and lists the CDN files each tab depends on. Panes are
   re-indented and syntax-highlighted at runtime by js-beautify and
   highlight.js from cdnjs; both are optional — if the CDN is blocked or you
   are offline, the page still shows plain readable source.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var HLJS_VER = '11.9.0';
  var BEAUTIFY_VER = '1.15.1';
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';

  var LIBS = [
    { type: 'css', url: CDN + 'highlight.js/' + HLJS_VER + '/styles/github-dark.min.css' },
    { type: 'js',  url: CDN + 'highlight.js/' + HLJS_VER + '/highlight.min.js' },
    { type: 'js',  url: CDN + 'js-beautify/' + BEAUTIFY_VER + '/beautify.min.js' },
    { type: 'js',  url: CDN + 'js-beautify/' + BEAUTIFY_VER + '/beautify-css.min.js' },
    { type: 'js',  url: CDN + 'js-beautify/' + BEAUTIFY_VER + '/beautify-html.min.js' }
  ];

  var TABS = ['html', 'css', 'js'];
  var HLJS_LANG = { html: 'xml', css: 'css', js: 'javascript' };

  // Where "Fork & Edit" sends the reader. Override per page with
  // <body data-fork-base="http://localhost:3000"> when developing locally.
  var FORK_BASE = 'https://fwdtools.com';
  var FORK_PATH = '/ui-snippets/mycode/';

  // Baseline the preview starts from, so a demo's own CSS only has to say what
  // is interesting about it.
  var BASE_CSS = '*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#fff}';

  /* ── Reading the authored blocks ──────────────────────────────────────── */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Pulls one block's text and removes the indentation it was authored with,
     so code can sit nested in the page and still read flush in the pane. */
  function block(id) {
    var el = document.getElementById(id);
    if (!el) return '';
    var lines = el.textContent.replace(/\t/g, '  ').split('\n');
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    var indent = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      indent = Math.min(indent, l.length - l.replace(/^ +/, '').length);
    });
    if (!isFinite(indent) || indent === 0) return lines.join('\n');
    return lines.map(function (l) { return l.slice(indent); }).join('\n');
  }

  /* The #cdn block, one URL per line. Anything ending .css is a stylesheet and
     belongs to the CSS tab; everything else is a script and belongs to the JS
     tab. Lines starting with # are comments. */
  function readCdn() {
    return block('cdn').split('\n').map(function (l) { return l.trim(); })
      .filter(function (l) { return l && l.charAt(0) !== '#'; })
      .map(function (url) {
        return { url: url, tab: /\.css(\?|$)/i.test(url.split('#')[0]) ? 'css' : 'js' };
      });
  }

  var code = { html: block('html'), css: block('css'), js: block('js') };
  var deps = readCdn();
  var title = (document.body && document.body.getAttribute('data-title')) ||
    document.title.replace(/\s+[—-]\s+Demo\s*$/, '');

  /* ── The live preview document ────────────────────────────────────────────
     CDN stylesheets and scripts land in <head> ahead of the demo's own code,
     so a library is always defined by the time the demo's JS runs. ── */

  function buildSrcdoc() {
    var head = '';
    deps.forEach(function (d) {
      head += d.tab === 'css'
        ? '<link rel="stylesheet" href="' + esc(d.url) + '">'
        : '<script src="' + esc(d.url) + '"><\/script>';
    });
    return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      head +
      '<style>' + BASE_CSS + '\n' + code.css + '<\/style></head><body>' +
      code.html +
      '<script>' + code.js + '<\/script>' +
      '</body></html>';
  }

  /* ── Fork & Edit ──────────────────────────────────────────────────────────
     Demos and My Code are the same origin (fwdtools.com/demos/… and
     fwdtools.com/ui-snippets/mycode/), so the snippet is handed over through
     localStorage under a one-shot key, and the link carries only that key.

     The fragment still holds the whole snippet as a fallback, because the
     handover has two ways to miss: storage can be unavailable (private mode,
     blocked site data, quota), and a demo embedded in a third-party iframe
     writes into a partitioned bucket that the top-level My Code tab cannot
     read. So the button starts out pointing at the self-contained long URL and
     is only shortened once a write has actually succeeded in a top-level tab.
     Either way a fragment never reaches the server. ── */

  var FORK_PREFIX = 'uis_fork_';
  var FORK_TTL = 24 * 60 * 60 * 1000; // discard handoffs never picked up

  function b64url(str) {
    // unescape/encodeURIComponent is the ES5 way to get UTF-8 through btoa,
    // and unlike String.fromCharCode.apply it has no argument-count ceiling.
    var b64 = btoa(unescape(encodeURIComponent(str)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Same origin in production; data-fork-base covers a split dev setup, and
  // location.origin is "null" on file:// where only the constant will do.
  function forkBase() {
    var attr = document.body && document.body.getAttribute('data-fork-base');
    if (attr) return attr.replace(/\/+$/, '');
    if (location.origin && location.origin !== 'null') return location.origin;
    return FORK_BASE;
  }

  function forkPayload() {
    return {
      v: 1,
      name: title,
      html: code.html,
      css: code.css,
      js: code.js,
      cdnUrls: deps.map(function (d) { return d.url; })
    };
  }

  /* The always-works link: the snippet itself, in the fragment. */
  function forkUrl() {
    try {
      return forkBase() + FORK_PATH + '#fork=' + b64url(JSON.stringify(forkPayload()));
    } catch (e) {
      return null; // encoding failed — the button stays out of the bar
    }
  }

  /* Drop handoffs that were written but never claimed, so a reader who clicks
     Fork on ten demos and imports two does not keep the other eight forever. */
  function sweepForks() {
    var now = Date.now();
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var key = localStorage.key(i);
      if (!key || key.indexOf(FORK_PREFIX) !== 0) continue;
      var stale = true;
      try {
        var rec = JSON.parse(localStorage.getItem(key));
        stale = !rec || !rec.t || now - rec.t > FORK_TTL;
      } catch (e) { /* unparseable — treat as stale */ }
      if (stale) localStorage.removeItem(key);
    }
  }

  /* Writes the snippet to localStorage and returns the short link, or null if
     the handoff cannot be trusted — the caller then keeps the long URL. */
  function stashFork() {
    // A partitioned iframe would write somewhere My Code cannot read.
    if (window.top !== window.self) return null;
    try {
      sweepForks();
      var token = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      var key = FORK_PREFIX + token;
      localStorage.setItem(key, JSON.stringify({ t: Date.now(), payload: forkPayload() }));
      if (!localStorage.getItem(key)) return null; // wrote nowhere
      return forkBase() + FORK_PATH + '#fork=ls:' + token;
    } catch (e) {
      return null; // no storage, or over quota
    }
  }

  /* ── Shell markup ─────────────────────────────────────────────────────── */

  function build() {
    var root = document.createElement('div');
    root.className = 'embedWrap';
    root.innerHTML =
      '<div class="topBar">' +
        '<span class="embedTitle" title="' + esc(title) + '">' + esc(title) + '</span>' +
        '<div class="tabGroup">' +
          '<button class="tabBtn" data-tab="html">HTML</button>' +
          '<button class="tabBtn" data-tab="css">CSS</button>' +
          '<button class="tabBtn" data-tab="js">JS</button>' +
          '<button class="tabBtn tabBtnActive" data-tab="result">Result</button>' +
        '</div>' +
        '<a class="forkBtn" id="forkBtn" target="_blank" rel="noopener" hidden ' +
          'title="Open a copy in My Code and edit it">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<circle cx="6" cy="5" r="2.5" /><circle cx="18" cy="5" r="2.5" /><circle cx="12" cy="19" r="2.5" />' +
            '<path d="M6 7.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" /><line x1="12" y1="11.5" x2="12" y2="16.5" />' +
          '</svg>' +
          '<span class="forkLabel">Fork &amp; Edit</span>' +
        '</a>' +
        '<button class="popOutBtn" id="popOut" aria-label="Open full screen in a new tab" title="Open full screen in a new tab">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />' +
            '<polyline points="15 3 21 3 21 9" />' +
            '<line x1="10" y1="14" x2="21" y2="3" />' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div class="body">' +
        '<div class="resultPane" id="resultPane">' +
          '<iframe class="embedFrame" id="previewFrame" sandbox="allow-scripts allow-forms" ' +
            'title="' + esc(title) + ' — live preview"></iframe>' +
        '</div>' +
        '<div class="codePane" id="codePane" hidden>' +
          '<div class="cdnStrip" id="cdnStrip" hidden>' +
            '<span class="cdnStripLabel">CDN</span><div class="cdnChips" id="cdnChips"></div>' +
          '</div>' +
          '<button class="copyBtn" id="copyBtn">Copy</button>' +
          '<div class="codePre" id="codeHtml" hidden><pre><code></code></pre></div>' +
          '<div class="codePre" id="codeCss" hidden><pre><code></code></pre></div>' +
          '<div class="codePre" id="codeJs" hidden><pre><code></code></pre></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);
  }

  /* A chip reads "cdnjs.cloudflare.com / gsap.min.js" — enough to recognise the
     library, with the full URL on hover and one click to open it. */
  function chipLabel(url) {
    var parts = url.replace(/^https?:\/\//, '').split(/[?#]/)[0].split('/').filter(Boolean);
    return parts.length > 1 ? parts[0] + ' / ' + parts[parts.length - 1] : parts.join('');
  }

  /* ── Wire-up ──────────────────────────────────────────────────────────── */

  function init() {
    build();

    var srcdoc = buildSrcdoc();
    var frame = document.getElementById('previewFrame');
    var resultEl = document.getElementById('resultPane');
    var codePane = document.getElementById('codePane');
    var copyBtn = document.getElementById('copyBtn');
    var cdnStrip = document.getElementById('cdnStrip');
    var cdnChips = document.getElementById('cdnChips');
    var panes = {
      html: document.getElementById('codeHtml'),
      css: document.getElementById('codeCss'),
      js: document.getElementById('codeJs')
    };
    var active = 'result';

    // What Copy hands over — replaced by the beautified text once js-beautify
    // lands, so the clipboard always matches what is on screen.
    var shown = { html: code.html, css: code.css, js: code.js };

    frame.srcdoc = srcdoc;

    // A real href, not a click handler, so the reader can middle-click it,
    // copy the link, or open it in a background tab like any other link.
    var forkBtn = document.getElementById('forkBtn');
    var forkHref = forkUrl();
    if (forkHref) {
      forkBtn.href = forkHref;
      forkBtn.hidden = false;

      // Swap in the short link at the last moment before the navigation, so
      // the snippet is only written to storage for a reader who actually
      // forks. pointerdown and keydown both land before activation, and the
      // href reverts on the way out so a copied link is always the
      // self-contained one — a stashed key is single-use and would be gone by
      // the time anyone opened a link they saved.
      var shorten = function () {
        var short = stashFork();
        forkBtn.href = short || forkHref;
      };
      forkBtn.addEventListener('pointerdown', function (e) {
        // Left click and middle click open the link; right click is on its way
        // to "Copy link address", which must get the self-contained URL.
        if (e.button === 0 || e.button === 1) shorten();
      });
      forkBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') shorten();
      });
      forkBtn.addEventListener('blur', function () { forkBtn.href = forkHref; });
    }

    function paint(tab, text) {
      var el = panes[tab] && panes[tab].querySelector('code');
      if (!el) return;
      el.className = 'language-' + HLJS_LANG[tab];
      el.textContent = text;
    }

    TABS.forEach(function (t) { paint(t, shown[t]); });

    function renderDeps(tab) {
      var list = deps.filter(function (d) { return d.tab === tab; });
      cdnStrip.hidden = list.length === 0;
      if (!list.length) return;
      cdnChips.innerHTML = list.map(function (d) {
        return '<a class="cdnChip" href="' + esc(d.url) + '" title="' + esc(d.url) +
          '" target="_blank" rel="noopener noreferrer">' + esc(chipLabel(d.url)) + '</a>';
      }).join('');
    }

    function show(tab) {
      active = tab;
      Array.prototype.forEach.call(document.querySelectorAll('.tabBtn'), function (b) {
        b.classList.toggle('tabBtnActive', b.getAttribute('data-tab') === tab);
      });
      // The iframe is only ever hidden, never torn down, so already-loaded
      // images, animations and scroll position survive a trip through the tabs.
      resultEl.className = tab === 'result' ? 'resultPane' : 'resultPaneHidden';
      codePane.hidden = tab === 'result';
      TABS.forEach(function (k) { panes[k].hidden = k !== tab; });
      if (tab !== 'result') { renderDeps(tab); codePane.scrollTop = 0; }
      copyBtn.textContent = 'Copy';
    }

    Array.prototype.forEach.call(document.querySelectorAll('.tabBtn'), function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-tab')); });
    });

    // Opened from a file:// URL there is no clipboard API and no secure
    // context, so fall back to execCommand and finally to selecting the code.
    function selectCode() {
      var el = panes[active];
      if (!el || !window.getSelection) return;
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function flash(text) {
      copyBtn.textContent = text;
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1500);
    }

    function legacyCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) { flash('Copied!'); } else { selectCode(); flash('Press Ctrl+C'); }
    }

    copyBtn.addEventListener('click', function () {
      var text = shown[active];
      if (!text) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () { flash('Copied!'); },
          function () { legacyCopy(text); }
        );
      } else {
        legacyCopy(text);
      }
    });

    // A Blob URL rather than a data: URL so the popped-out window gets a real
    // document that can run its scripts.
    document.getElementById('popOut').addEventListener('click', function () {
      var url = URL.createObjectURL(new Blob([srcdoc], { type: 'text/html' }));
      var win = window.open(url, '_blank', 'width=' + screen.width + ',height=' + screen.height);
      if (win) win.addEventListener('load', function () { URL.revokeObjectURL(url); });
    });

    injectLibs(function () { upgrade(paint, shown, panes); });
  }

  /* ── Beautify + highlight, once the CDN libraries are in ──────────────── */

  function upgrade(paint, shown, panes) {
    var beautifiers = { html: window.html_beautify, css: window.css_beautify, js: window.js_beautify };
    var opts = {
      indent_size: 2,
      end_with_newline: false,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      wrap_line_length: 0
    };

    TABS.forEach(function (tab) {
      if (!shown[tab]) return;
      var fn = beautifiers[tab];
      if (typeof fn === 'function') {
        // Never let a beautifier failure cost the reader the source itself.
        try { shown[tab] = fn(shown[tab], opts); } catch (e) { /* keep as authored */ }
        paint(tab, shown[tab]);
      }
      var el = panes[tab].querySelector('code');
      if (window.hljs && el) {
        try { window.hljs.highlightElement(el); } catch (e) { /* keep plain */ }
      }
    });
  }

  /* Loads the CDN libraries and calls back once they have all settled —
     resolved or failed, so a blocked CDN degrades to plain unstyled source
     rather than leaving the panes stuck mid-render. */
  function injectLibs(done) {
    var pending = 0;
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      done();
    }

    function settle() {
      if (--pending <= 0) finish();
    }

    LIBS.forEach(function (lib) {
      var el;
      if (lib.type === 'css') {
        el = document.createElement('link');
        el.rel = 'stylesheet';
        el.href = lib.url;
      } else {
        el = document.createElement('script');
        el.src = lib.url;
        el.defer = true;
      }
      pending++;
      el.addEventListener('load', settle);
      el.addEventListener('error', settle);
      document.head.appendChild(el);
    });

    if (!pending) finish();
    // Whatever has arrived after 5s is what the reader gets.
    setTimeout(finish, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
