(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = G && !reduce;
  document.querySelectorAll('.st').forEach(function (sec) {
    var btn = sec.querySelector('[data-menu-toggle]');
    var panel = sec.querySelector('[data-menu]');
    if (btn && panel) {
      sec.classList.add('has-menu');
      var isOpen = false;
      var mobile = function () { return getComputedStyle(btn).display !== 'none'; };
      // The toggle and the panel's controls, in document order (the toggle may come after the panel)
      var focusables = function () {
        return Array.prototype.filter.call(sec.querySelectorAll('a[href], button'), function (el) { return el === btn || panel.contains(el); });
      };
      var open = function () {
        isOpen = true;
        sec.classList.add('menu-open');
        btn.setAttribute('aria-expanded', 'true');
        if (anim) {
          G.fromTo(panel, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform,opacity' });
          G.fromTo(panel.querySelectorAll('[data-menu-item]'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, delay: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' });
        }
        var first = panel.querySelector('a[href], button');
        if (first) first.focus();
      };
      var close = function (returnFocus) {
        if (!isOpen) return;
        isOpen = false;
        btn.setAttribute('aria-expanded', 'false');
        var done = function () { sec.classList.remove('menu-open'); };
        if (anim) G.to(panel, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in', onComplete: function () { done(); G.set(panel, { clearProps: 'transform,opacity' }); } });
        else done();
        if (returnFocus) btn.focus();
      };
      btn.addEventListener('click', function () { if (isOpen) close(false); else open(); });
      document.addEventListener('keydown', function (e) {
        if (!isOpen) return;
        if (e.key === 'Escape') { close(true); return; }
        if (e.key === 'Tab') {
          var f = focusables(), first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
      document.addEventListener('click', function (e) { if (isOpen && !sec.contains(e.target)) close(false); });
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(false); });
      window.addEventListener('resize', function () { if (isOpen && !mobile()) close(false); });
    }
    sec.querySelectorAll('[data-dismiss]').forEach(function (x) {
      x.addEventListener('click', function () {
        var box = x.closest('[data-dismissable]');
        if (!box) return;
        if (anim) G.to(box, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, duration: 0.35, ease: 'power2.inOut', onComplete: function () { box.remove(); } });
        else box.remove();
      });
    });
    if (sec.querySelector('[data-sticky-flag]')) {
      var hideOn = !!sec.querySelector('[data-hide-flag]');
      var last = window.scrollY, hidden = false;
      var onScroll = function () {
        var y = window.scrollY;
        sec.classList.toggle('is-scrolled', y > 8);
        if (hideOn && !sec.classList.contains('menu-open')) {
          var down = y > last && y > 120;
          if (down !== hidden) {
            hidden = down;
            if (anim) G.to(sec, { yPercent: down ? -100 : 0, duration: 0.35, ease: 'power2.out' });
            else sec.style.transform = down ? 'translateY(-100%)' : '';
          }
        }
        last = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });
})();
(function () {
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || !window.ScrollTrigger || reduce || (window.ST_STILL && !window.ST_SCROLL_FX)) return;
  G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st [data-drawpath]').forEach(function (box) {
    box.classList.add('is-drawing');
    box.querySelectorAll('[data-draw]').forEach(function (p) {
      var len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      G.set(p, { strokeDasharray: len, strokeDashoffset: len });
      G.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: box, start: 'top 65%', end: 'bottom 65%', scrub: 0.5 } });
    });
    box.querySelectorAll('[data-draw-step]').forEach(function (step) {
      // Stays lit once reached (only scrolling back up above it turns it off)
      ScrollTrigger.create({ trigger: step, start: 'top 65%', onEnter: function () { step.classList.add('is-on'); }, onLeaveBack: function () { step.classList.remove('is-on'); } });
    });
  });
})();
(function () {
  var viewer, imgEl, capEl, countEl, items = [], index = 0, opener = null;
  function build() {
    if (viewer) return;
    viewer = document.createElement('div');
    viewer.className = 'stg-lb';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Image viewer');
    viewer.hidden = true;
    viewer.innerHTML = '<button type="button" class="stg-lb-close" aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<button type="button" class="stg-lb-nav stg-lb-prev" aria-label="Previous image"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button>' +
      '<figure class="stg-lb-fig"><img class="stg-lb-img" alt=""><figcaption class="stg-lb-cap"></figcaption></figure>' +
      '<button type="button" class="stg-lb-nav stg-lb-next" aria-label="Next image"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>' +
      '<p class="stg-lb-count" aria-live="polite"></p>';
    document.body.appendChild(viewer);
    imgEl = viewer.querySelector('.stg-lb-img');
    capEl = viewer.querySelector('.stg-lb-cap');
    countEl = viewer.querySelector('.stg-lb-count');
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer || e.target.classList.contains('stg-lb-fig')) close();
    });
    viewer.querySelector('.stg-lb-close').addEventListener('click', close);
    viewer.querySelector('.stg-lb-prev').addEventListener('click', function () { show(index - 1); });
    viewer.querySelector('.stg-lb-next').addEventListener('click', function () { show(index + 1); });
    document.addEventListener('keydown', function (e) {
      if (viewer.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
      else if (e.key === 'Tab') {
        var f = viewer.querySelectorAll('button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    var fig = items[index], img = fig.querySelector('img');
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt || '';
    var cap = fig.querySelector('.gg-cap');
    var parts = cap ? [].slice.call(cap.children).map(function (c) { return c.textContent.trim(); }).filter(Boolean) : [];
    capEl.textContent = parts.join(' — ');
    countEl.textContent = (index + 1) + ' / ' + items.length;
    viewer.classList.toggle('is-single', items.length < 2);
  }
  // In the editor the preview is a tall frame inside a scrolling panel: centre the viewer in the
  // part of the frame you can actually see (a normal page uses the whole window)
  // The part of this frame you can see when it sits inside a scrolling panel of the editor
  // (null on a normal page): { top, bottom } in the frame's own pixels
  function seenRange() {
    var fe = null, pw = null;
    try { fe = window.frameElement; pw = window.parent; } catch (err) { return null; }
    if (!fe || !pw || pw === window) return null;
    try {
      var r = fe.getBoundingClientRect(), k = r.width / (window.innerWidth || r.width) || 1;
      var top = 0, bottom = pw.innerHeight;
      for (var n = fe.parentElement; n; n = n.parentElement) {
        if (/(auto|scroll|hidden|clip)/.test(pw.getComputedStyle(n).overflowY)) {
          var nr = n.getBoundingClientRect();
          top = Math.max(top, nr.top); bottom = Math.min(bottom, nr.bottom);
        }
      }
      return { top: Math.max(0, top - r.top) / k, bottom: (Math.min(bottom, r.bottom) - r.top) / k };
    } catch (err) { return null; }
  }
  function fit() {
    if (!viewer) return;
    var range = window.ST_STILL || window.ST_PREVIEW ? seenRange() : null;
    if (!range || range.bottom - range.top < 120) { viewer.style.top = ''; viewer.style.bottom = ''; viewer.style.removeProperty('--lb-h'); return; }
    viewer.style.top = range.top + 'px';
    viewer.style.bottom = Math.max(0, window.innerHeight - range.bottom) + 'px';
    viewer.style.setProperty('--lb-h', (range.bottom - range.top) + 'px');
  }
  function watch(on) {
    try { var w = window.parent; if (!w || w === window) return; var f = on ? 'addEventListener' : 'removeEventListener'; w[f]('scroll', fit, true); w[f]('resize', fit); } catch (err) { /* cross-origin parent */ }
  }
  function open(list, i, from) {
    build();
    items = list; opener = from;
    show(i);
    viewer.hidden = false;
    fit(); watch(true);
    document.documentElement.classList.add('stg-open');
    viewer.querySelector('.stg-lb-close').focus();
  }
  function close() {
    viewer.hidden = true;
    watch(false);
    document.documentElement.classList.remove('stg-open');
    if (opener) opener.focus();
  }
  document.querySelectorAll('.st').forEach(function (sec) {
    var grid = sec.querySelector('[data-gallery]');
    if (!grid) return;
    var all = [].slice.call(grid.querySelectorAll('.gg-item'));
    var bar = sec.querySelector('[data-gallery-filters]');
    if (bar && !window.ST_STILL) {
      var tags = [];
      all.forEach(function (it) { var t = (it.getAttribute('data-tag') || '').trim(); if (t && tags.indexOf(t) < 0) tags.push(t); });
      if (tags.length > 1) {
        var label = bar.getAttribute('data-all') || 'All';
        var buttons = [];
        [''].concat(tags).forEach(function (t) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'gg-chip';
          b.textContent = t || label;
          b.setAttribute('aria-pressed', t ? 'false' : 'true');
          b.addEventListener('click', function () {
            buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
            all.forEach(function (it) { it.hidden = !!t && (it.getAttribute('data-tag') || '').trim() !== t; });
          });
          buttons.push(b);
          bar.appendChild(b);
        });
        bar.hidden = false;
      }
    }
    var editing = window.ST_STILL || window.ST_PREVIEW;
    all.forEach(function (it) {
      var img = it.querySelector('img');
      if (!img) return;
      function go() {
        var visible = all.filter(function (x) { return !x.hidden; });
        open(visible, visible.indexOf(it), it);
      }
      if (editing) {
        // In the editor the click also selects the photo in the panel (the editor handles that),
        // and the viewer opens on top so you can check it
        it.style.cursor = 'zoom-in';
        it.addEventListener('click', go);
        return;
      }
      it.setAttribute('tabindex', '0');
      it.setAttribute('role', 'button');
      it.setAttribute('aria-label', 'View larger: ' + (img.alt || 'image'));
      it.addEventListener('click', go);
      it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  });
})();
(function () {
  var editing = window.ST_STILL || window.ST_PREVIEW;
  var enc = encodeURIComponent;
  function meta(sel) { var m = document.querySelector(sel); return m ? (m.getAttribute('content') || m.getAttribute('href') || '') : ''; }
  function absolute(u) { try { return new URL(u, location.href).href; } catch (e) { return u; } }
  document.querySelectorAll('.st [data-ss]').forEach(function (root) {
    if (root.getAttribute('data-ss-ready')) return;
    root.setAttribute('data-ss-ready', '1');
    function vars() {
      var url = root.getAttribute('data-url') || location.href.split('#')[0];
      var title = root.getAttribute('data-title') || meta('meta[property="og:title"]') || document.title || '';
      return {
        url: url, title: title, text: (title ? title + ' ' : '') + url,
        image: root.getAttribute('data-pin-image') || meta('meta[property="og:image"]'),
        via: root.getAttribute('data-via') || '', tags: root.getAttribute('data-tags') || ''
      };
    }
    function fill(tpl, v) {
      var out = tpl.replace(/[{]([a-z]+)[}]/g, function (m, k) { return enc(v[k] || ''); });
      var i = out.indexOf('?');
      if (i < 1) return out;
      var q = out.slice(i + 1).split('&').filter(function (p) { var e = p.indexOf('='); return e < 0 || p.slice(e + 1) !== ''; }).join('&');
      return q ? out.slice(0, i) + '?' + q : out.slice(0, i);
    }
    function update() {
      var v = vars();
      root.querySelectorAll('a[data-share]').forEach(function (a) { a.href = fill(a.getAttribute('data-share'), v); });
    }
    update();
    ['pointerenter', 'focusin', 'touchstart'].forEach(function (ev) { root.addEventListener(ev, update, { passive: true }); });

    var live = root.querySelector('.ss-live');
    function flash(btn, msg) {
      var tip = btn.querySelector('.ss-tip');
      if (live) live.textContent = msg;
      if (tip && !btn.classList.contains('is-done')) tip.setAttribute('data-was', tip.textContent);
      btn.classList.add('is-done');
      if (tip) tip.textContent = msg;
      clearTimeout(btn._ssTimer);
      btn._ssTimer = setTimeout(function () {
        btn.classList.remove('is-done');
        if (tip) tip.textContent = tip.getAttribute('data-was') || '';
        if (live) live.textContent = '';
      }, 2000);
    }
    root.querySelectorAll('[data-net="copy"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var u = vars().url;
        var msg = root.getAttribute('data-copied') || 'Link copied';
        function fallback() {
          var t = document.createElement('textarea');
          t.value = u; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
          document.body.appendChild(t); t.select();
          try { if (document.execCommand('copy')) flash(btn, msg); } catch (e) {}
          t.remove();
        }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(function () { flash(btn, msg); }, fallback);
        else fallback();
      });
    });
    var hide = root.querySelector('[data-ss-hide]'), tab = root.querySelector('[data-ss-show]');
    if (!hide || !tab) return;
    var KEY = 'ss-collapsed';
    function store(v) { if (editing) return; try { sessionStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }
    function read() { if (editing) return null; try { return sessionStorage.getItem(KEY); } catch (e) { return null; } }
    function set(collapsed, focus) {
      root.classList.toggle('is-collapsed', collapsed);
      hide.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      tab.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      if (focus) (collapsed ? tab : root.querySelector('.ss-btn')).focus({ preventScroll: true });
    }
    var saved = read();
    set(saved === null ? root.getAttribute('data-start') === 'collapsed' : saved === '1', false);
    hide.addEventListener('click', function () { set(true, true); store(true); });
    tab.addEventListener('click', function () { set(false, true); store(false); });
  });
})();
(function () {
  var inline = window.ST_STILL || window.ST_PREVIEW || window.ST_POPUP_INLINE;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st [data-btt]').forEach(function (root) {
    if (root.getAttribute('data-btt-ready')) return;
    root.setAttribute('data-btt-ready', '1');
    var btn = root.querySelector('.btt-btn');
    var demo = root.querySelector('.btt-demo');
    if (!btn || root.getAttribute('data-enabled') === 'off') { if (demo && !inline) demo.parentNode.removeChild(demo); return; }
    if (!inline && demo) demo.parentNode.removeChild(demo);
    if (inline) {
      root.classList.add('is-preview', 'is-visible');
      btn.addEventListener('click', function (e) { e.preventDefault(); });
      return;
    }
    var dist = parseFloat(root.getAttribute('data-distance')) || 0;
    var secs = parseFloat(root.getAttribute('data-speed'));
    if (isNaN(secs)) secs = 0.8;
    var ticking = false;
    function check() { ticking = false; root.classList.toggle('is-visible', (window.pageYOffset || document.documentElement.scrollTop) > dist); }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
    check();
    var stopped = false;
    ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, function () { stopped = true; }, { passive: true }); });
    btn.addEventListener('click', function () {
      var from = window.pageYOffset || document.documentElement.scrollTop;
      if (reduce || secs <= 0 || from < 2) { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); return; }
      stopped = false;
      var t0 = performance.now(), dur = secs * 1000;
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur);
        var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo({ top: from * (1 - e), left: 0, behavior: 'instant' });
        if (p < 1 && !stopped) requestAnimationFrame(step);
      })(t0);
    });
  });
})();
(function () {
  var inline = window.ST_STILL || window.ST_PREVIEW || window.ST_POPUP_INLINE;
  var btnMode = !!window.ST_POPUP_BUTTON;
  var LEVELS = { text: 3, lineheight: 2, align: 3, font: 1, contrast: 2, gray: 1, images: 1, motion: 1, links: 1, mask: 1 };
  var SIZES = [1, 1.15, 1.3, 1.5];
  var ALIGNS = ['', 'left', 'center', 'right'];
  var KEY = 'st-a11y';
  var CSS = [
    'html[data-a11y-lh="1"] body *:not(.a11y *){line-height:1.7!important}',
    'html[data-a11y-lh="2"] body *:not(.a11y *){line-height:2.1!important}',
    'html[data-a11y-font] body *:not(.a11y *){font-family:Verdana,Tahoma,Arial,sans-serif!important;letter-spacing:.02em!important}',
    'html[data-a11y-align] body *:not(.a11y *){text-align:var(--a11y-align)!important}',
    'html[data-a11y-img] body :is(img,picture,video,canvas):not(.a11y *){visibility:hidden!important}',
    'html[data-a11y-img] body *:not(.a11y *){background-image:none!important}',
    'html[data-a11y-motion] body *:not(.a11y *),html[data-a11y-motion] body *::before,html[data-a11y-motion] body *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}',
    'html[data-a11y-links] body a:not(.a11y a){text-decoration:underline!important;text-underline-offset:3px!important;background:#ffe14d!important;color:#111!important;outline:2px solid #111!important;outline-offset:1px!important}',
    '.a11y-fx{filter:var(--a11y-filter,none)}',
    'html[data-a11y-contrast="2"] .a11y-fx :is(img,video,picture){filter:invert(1) hue-rotate(180deg)}'
  ].join('\n');
  var textBase = new Map();

  function load(remember) {
    if (!remember) return {};
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function save(state, remember) {
    if (!remember) return;
    try {
      var any = Object.keys(LEVELS).some(function (k) { return state[k]; });
      if (any) localStorage.setItem(KEY, JSON.stringify(state)); else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  document.querySelectorAll('.st [data-a11y]').forEach(function (root) {
    if (root.getAttribute('data-a11y-ready')) return;
    root.setAttribute('data-a11y-ready', '1');
    var fab = root.querySelector('.a11y-fab');
    var panel = root.querySelector('.a11y-panel');
    if (!fab || !panel) return;
    var remember = root.getAttribute('data-remember') !== 'off';
    var tiles = root.querySelectorAll('[data-feature]');
    var state = {};
    Object.keys(LEVELS).forEach(function (k) { state[k] = 0; });

    function paint() {
      tiles.forEach(function (t) {
        var f = t.getAttribute('data-feature');
        var lvl = state[f] || 0, max = LEVELS[f] || 1;
        t.setAttribute('aria-pressed', lvl > 0 ? 'true' : 'false');
        var pips = t.querySelector('.a11y-pips');
        if (pips) {
          pips.innerHTML = '';
          if (max > 1) for (var i = 1; i <= max; i++) { var p = document.createElement('span'); p.className = 'a11y-pip' + (i <= lvl ? ' on' : ''); pips.appendChild(p); }
        }
      });
    }

    root.querySelectorAll('[data-a11y-close]').forEach(function (b) { b.addEventListener('click', function (e) { if (inline && !btnMode) { e.preventDefault(); panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); return; } close(true); }); });

    if (inline && !btnMode) {
      root.classList.add('is-preview');
      panel.hidden = false;
      fab.setAttribute('aria-expanded', 'true');
      fab.addEventListener('click', function () { panel.hidden = !panel.hidden; fab.setAttribute('aria-expanded', String(!panel.hidden)); });
      tiles.forEach(function (t) {
        t.addEventListener('click', function () { var f = t.getAttribute('data-feature'); state[f] = ((state[f] || 0) + 1) % ((LEVELS[f] || 1) + 1); paint(); });
      });
      var rs = root.querySelector('[data-a11y-reset]');
      if (rs) rs.addEventListener('click', function () { Object.keys(LEVELS).forEach(function (k) { state[k] = 0; }); paint(); });
      state.text = 1; state.contrast = 0; state.font = 1; // a sample of switched-on options for the preview
      paint();
      return;
    }

    /* ---------- real page ---------- */
    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-a11y-css', '');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);
    var html = document.documentElement;
    var maskTop = null, maskBottom = null, maskY = 140;

    function markFx() {
      (function walk(node) {
        Array.prototype.forEach.call(node.children, function (c) {
          if (c === root) return;
          if (c.contains(root)) { walk(c); return; }
          if (/^(SCRIPT|STYLE|LINK|META|NOSCRIPT|TEMPLATE)$/.test(c.tagName) || c.hasAttribute('data-a11y-css')) return;
          c.classList.add('a11y-fx');
        });
      })(document.body);
    }

    function applyText(level) {
      var els = [];
      document.body.querySelectorAll('*').forEach(function (el) {
        if (el.closest('.a11y') || /^(SCRIPT|STYLE|NOSCRIPT|SVG|PATH|BR|HR|IMG|VIDEO|CANVAS)$/i.test(el.tagName)) return;
        for (var n = el.firstChild; n; n = n.nextSibling) { if (n.nodeType === 3 && n.nodeValue.trim()) { els.push(el); break; } }
      });
      if (level === 0) {
        textBase.forEach(function (info, el) { if (info.inline) el.style.setProperty('font-size', info.inline); else el.style.removeProperty('font-size'); });
        textBase.clear();
        return;
      }
      els.forEach(function (el) { if (!textBase.has(el)) textBase.set(el, { inline: el.style.getPropertyValue('font-size'), px: parseFloat(getComputedStyle(el).fontSize) || 16 }); });
      els.forEach(function (el) { var info = textBase.get(el); el.style.setProperty('font-size', (info.px * SIZES[level]).toFixed(2) + 'px', 'important'); });
    }

    function setMask(on) {
      if (!on) {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onTouch);
        document.removeEventListener('focusin', onFocus);
        if (maskTop) { maskTop.remove(); maskBottom.remove(); maskTop = maskBottom = null; }
        return;
      }
      if (maskTop) return;
      maskTop = document.createElement('div'); maskTop.className = 'a11y-mask'; maskTop.style.top = '0';
      maskBottom = document.createElement('div'); maskBottom.className = 'a11y-mask'; maskBottom.style.bottom = '0';
      document.body.appendChild(maskTop); document.body.appendChild(maskBottom);
      place(maskY);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onTouch, { passive: true });
      document.addEventListener('focusin', onFocus);
    }
    function place(y) {
      maskY = y;
      var half = 55;
      maskTop.style.height = Math.max(0, y - half) + 'px';
      maskBottom.style.height = Math.max(0, window.innerHeight - y - half) + 'px';
    }
    function onMove(e) { place(e.clientY); }
    function onTouch(e) { if (e.touches[0]) place(e.touches[0].clientY); }
    function onFocus(e) { if (e.target && e.target.getBoundingClientRect && !root.contains(e.target)) { var r = e.target.getBoundingClientRect(); place(r.top + r.height / 2); } }

    function apply() {
      var s = state;
      function flag(name, on, val) { if (on) html.setAttribute(name, val === undefined ? '' : val); else html.removeAttribute(name); }
      flag('data-a11y-lh', s.lineheight > 0, String(s.lineheight));
      flag('data-a11y-font', s.font > 0);
      flag('data-a11y-align', s.align > 0);
      if (s.align > 0) html.style.setProperty('--a11y-align', ALIGNS[s.align]); else html.style.removeProperty('--a11y-align');
      flag('data-a11y-img', s.images > 0);
      flag('data-a11y-motion', s.motion > 0);
      flag('data-a11y-links', s.links > 0);
      flag('data-a11y-contrast', s.contrast > 0, String(s.contrast));
      var filters = [];
      if (s.contrast === 1) filters.push('contrast(1.5)');
      if (s.contrast === 2) filters.push('invert(1) hue-rotate(180deg)');
      if (s.gray) filters.push('grayscale(1)');
      if (filters.length) { markFx(); html.style.setProperty('--a11y-filter', filters.join(' ')); } else html.style.removeProperty('--a11y-filter');
      applyText(s.text);
      if (s.motion) {
        document.querySelectorAll('video').forEach(function (v) { try { v.pause(); } catch (e) {} });
        if (window.gsap && gsap.globalTimeline) gsap.globalTimeline.pause();
      } else if (window.gsap && gsap.globalTimeline) gsap.globalTimeline.resume();
      setMask(s.mask > 0);
      paint();
      save(s, remember);
    }

    tiles.forEach(function (t) {
      t.addEventListener('click', function () { var f = t.getAttribute('data-feature'); state[f] = ((state[f] || 0) + 1) % ((LEVELS[f] || 1) + 1); apply(); });
    });
    var reset = root.querySelector('[data-a11y-reset]');
    if (reset) reset.addEventListener('click', function () { Object.keys(LEVELS).forEach(function (k) { state[k] = 0; }); apply(); });

    function open() {
      panel.hidden = false;
      requestAnimationFrame(function () { root.classList.add('is-open'); });
      fab.setAttribute('aria-expanded', 'true');
      panel.focus();
    }
    function close(refocus) {
      root.classList.remove('is-open');
      fab.setAttribute('aria-expanded', 'false');
      setTimeout(function () { if (!root.classList.contains('is-open')) panel.hidden = true; }, 220);
      if (refocus) fab.focus();
    }
    fab.addEventListener('click', function () { if (root.classList.contains('is-open')) close(true); else open(); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-open')) { e.stopPropagation(); close(true); } });
    document.addEventListener('mousedown', function (e) { if (root.classList.contains('is-open') && !root.contains(e.target)) close(false); });

    var saved = load(remember);
    var any = false;
    Object.keys(LEVELS).forEach(function (k) { var v = parseInt(saved[k], 10); if (v > 0 && v <= LEVELS[k]) { state[k] = v; any = true; } });
    paint();
    // Restore after the page has finished loading, so text added below this script is found too
    if (any) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply(); }
  });
})();
(function () {
  if (!window.gsap) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var TEXT = window.SplitText ? {"split":"words","part":"words","mask":"words","vars":{"yPercent":110,"stagger":0.06,"duration":0.8}} : null;
  if (TEXT) gsap.registerPlugin(SplitText);
  function run() {
    document.querySelectorAll('.st:not([data-scroll])').forEach(function (section) {
      var heads = TEXT ? section.querySelectorAll('[data-anim-text]') : [];
      var items = section.querySelectorAll(heads.length ? '[data-anim="item"]:not([data-anim-text])' : '[data-anim="item"]');
      var media = section.querySelectorAll('[data-anim="media"]');
      var tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.80 },
        scrollTrigger: window.ScrollTrigger ? (window.ST_PREVIEW ? { trigger: section, start: 'top 80%', toggleActions: 'play reset play reset' } : { trigger: section, start: 'top 80%', once: true }) : undefined
      });
      Array.prototype.forEach.call(heads, function (el, i) {
        var opts = { type: TEXT.split };
        if (TEXT.mask) opts.mask = TEXT.mask;
        var parts = SplitText.create(el, opts)[TEXT.part];
        // The mask clips each line or word to its line box, which cuts off descenders (g, y, p):
        // give the mask a little room below and take it back with a negative margin
        if (TEXT.mask) Array.prototype.forEach.call(parts, function (p) { var m = p.parentElement; if (m && m !== el) { m.style.paddingBottom = '.22em'; m.style.marginBottom = '-.22em'; } });
        tl.from(parts, Object.assign({}, TEXT.vars), i ? '<0.1' : 0);
      });
      if (items.length) tl.from(items, {"y":28,"opacity":0,"stagger":0.09,"clearProps":"transform,opacity"}, heads.length ? '<0.2' : 0);
      if (media.length) tl.from(media, {"y":40,"opacity":0,"duration":1.1,"clearProps":"transform,opacity"}, items.length || heads.length ? '<0.15' : 0);
    });
  }
  // Split text only after the fonts load, so lines break where they finally will
  if (TEXT && document.fonts && document.fonts.ready) document.fonts.ready.then(run); else run();
})();
(function () {
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || reduce || window.ST_STILL) return;
  if (window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st-art[data-art-anim]').forEach(function (layer) {
    var mode = layer.getAttribute('data-art-anim'), sec = layer.closest('.st'), svg = layer.querySelector('svg');
    if (mode === 'float') layer.querySelectorAll('[data-float]').forEach(function (el, i) {
      G.to(el, { x: (i % 3 - 1) * 24, y: (i % 2 ? -1 : 1) * 22, duration: 5 + (i % 3), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4 });
    });
    if (mode === 'spin') layer.querySelectorAll('[data-spin]').forEach(function (el, i) {
      G.to(el, { rotation: i % 2 ? -360 : 360, duration: 60 + i * 8, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    });
    if (mode === 'draw' && window.ScrollTrigger) layer.querySelectorAll('[data-draw]').forEach(function (p, i) {
      var len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      G.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 90%', end: 'bottom 40%', scrub: 0.6 } });
    });
    if (mode === 'parallax' && window.ScrollTrigger && svg) {
      G.set(svg, { scale: 1.15 });
      G.fromTo(svg, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  });
})();
