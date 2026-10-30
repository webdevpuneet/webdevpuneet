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
  document.querySelectorAll('.st [data-compare]').forEach(function (box) {
    var input = box.querySelector('.ba-range');
    if (!input) return;
    if (window.ST_STILL || window.ST_PREVIEW) {
      // The editor: clicking a photo edits it, so the full-size input is off; the handle itself
      // can still be dragged to try the slider
      box.classList.add('is-static');
      var handle = box.querySelector('.ba-handle');
      if (handle) handle.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rect = box.getBoundingClientRect();
        var move = function (ev) {
          var p = Math.max(0, Math.min(100, (ev.clientX - rect.left) / rect.width * 100));
          box.style.setProperty('--pos', p + '%');
        };
        var up = function () { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        move(e);
      });
      return;
    }
    function set() { box.style.setProperty('--pos', input.value + '%'); }
    input.addEventListener('input', set);
    set();
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = G && !reduce;
  document.querySelectorAll('.st [data-accordion]').forEach(function (list) {
    var mode = list.getAttribute('data-accordion') || '';
    var items = Array.prototype.slice.call(list.querySelectorAll('details'));
    var body = function (d) { return d.querySelector('.st-acc-a'); };
    var close = function (d) {
      if (!d.open || d.classList.contains('is-closing')) return;
      if (!anim) { d.open = false; return; }
      d.classList.add('is-closing');
      G.to(body(d), { height: 0, duration: 0.32, ease: 'power2.inOut', onComplete: function () {
        d.open = false; d.classList.remove('is-closing'); G.set(body(d), { clearProps: 'height' });
      } });
    };
    var open = function (d) {
      d.open = true;
      if (!anim) return;
      var b = body(d);
      G.fromTo(b, { height: 0 }, { height: 'auto', duration: 0.4, ease: 'power2.out', clearProps: 'height' });
      G.fromTo(b.children, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, delay: 0.06, ease: 'power2.out', clearProps: 'transform,opacity' });
    };
    items.forEach(function (d) {
      d.querySelector('summary').addEventListener('click', function (e) {
        e.preventDefault();
        if (d.open && !d.classList.contains('is-closing')) { close(d); return; }
        if (/single/.test(mode)) items.forEach(function (o) { if (o !== d) close(o); });
        open(d);
      });
    });
    if (/first/.test(mode) && items[0]) items[0].open = true;
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st form[data-form]').forEach(function (form) {
    var ok = form.querySelector('[data-form-success]');
    var bad = form.querySelector('[data-form-error]');
    var btn = form.querySelector('[type="submit"]');
    var done = function () {
      var fields = form.querySelectorAll('[data-form-fields]');
      var show = function () {
        Array.prototype.forEach.call(fields, function (f) { f.hidden = true; });
        if (ok) { ok.hidden = false; ok.focus && ok.focus(); if (G && !reduce) G.from(ok, { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' }); }
      };
      if (G && !reduce && fields.length) G.to(fields, { opacity: 0, y: -10, duration: 0.25, onComplete: show }); else show();
    };
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      if (bad) bad.hidden = true;
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      var finish = function () { if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); } };
      if (window.ST_PREVIEW) { setTimeout(function () { finish(); done(); }, 600); return; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { finish(); if (r.ok) done(); else if (bad) bad.hidden = false; })
        .catch(function () { finish(); if (bad) bad.hidden = false; });
    });
  });
})();
(function () {
  var d = new Date();
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var today = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  document.querySelectorAll('.st [data-booking-date]').forEach(function (input) { input.min = today; });
})();
(function () {
  if (window.gsap && window.Flip) gsap.registerPlugin(Flip);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st').forEach(function (sec) {
    var btns = sec.querySelectorAll('[data-billing]');
    if (!btns.length) return;
    var pill = sec.querySelector('.st-bill-pill');
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        var yearly = b.getAttribute('data-billing') === 'yearly';
        if (sec.classList.contains('is-yearly') === yearly) return;
        var state = !reduce && window.Flip && pill ? Flip.getState(pill) : null;
        if (pill) b.appendChild(pill);
        sec.classList.toggle('is-yearly', yearly);
        Array.prototype.forEach.call(btns, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        if (reduce || !window.gsap) return;
        if (state) Flip.from(state, { duration: 0.45, ease: 'power3.inOut' });
        gsap.fromTo(sec.querySelectorAll(yearly ? '.st-py' : '.st-pm'),
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity' });
      });
    });
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!G || reduce || !fine) return;
  document.querySelectorAll('.st [data-magnetic]').forEach(function (el) {
    var x = G.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    var y = G.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener('pointerleave', function () { x(0); y(0); });
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || reduce || window.ST_STILL) return;
  if (window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st [data-count]').forEach(function (el) {
    var host = el.closest('.st');
    if (host && /"count":true/.test(host.getAttribute('data-scroll') || '')) return; // counted by its scroll animation
    var text = el.textContent;
    var m = text.match(/\d[\d,]*(\.\d+)?/);
    if (!m) return;
    var raw = m[0];
    var dec = m[1] ? m[1].length - 1 : 0;
    var commas = raw.indexOf(',') > -1;
    var target = parseFloat(raw.replace(/,/g, ''));
    var pre = text.slice(0, m.index), post = text.slice(m.index + raw.length);
    var fmt = function (v) {
      var s = v.toFixed(dec);
      if (commas) { var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); s = p.join('.'); }
      return pre + s + post;
    };
    el.setAttribute('aria-label', text.trim());
    var o = { v: 0 };
    // The real value stays in place until the count starts (it starts from 0 on enter)
    G.fromTo(o, { v: 0 }, {
      v: target, duration: 2, ease: 'power2.out', immediateRender: false,
      scrollTrigger: window.ScrollTrigger ? { trigger: el, start: 'top 90%', once: true } : undefined,
      onUpdate: function () { el.textContent = fmt(o.v); },
      onComplete: function () { el.textContent = text; }
    });
  });
})();
(function () {
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
  // Scrolls to a section. Inside the editor's preview frame, scrollIntoView would also scroll
  // containers the user cannot scroll back (overflow: hidden), so the panel that really
  // scrolls is moved instead
  function goTo(block, behavior) {
    var fe = null, pw = null;
    try { fe = window.frameElement; pw = window.parent; } catch (err) { fe = null; }
    if (fe && pw && pw !== window && (window.ST_STILL || window.ST_PREVIEW)) {
      try {
        var fr = fe.getBoundingClientRect(), k = fr.width / (window.innerWidth || fr.width) || 1;
        var y = fr.top + block.getBoundingClientRect().top * k;
        var gap = (parseFloat(block.style.scrollMarginTop) || 24) * k;
        var sc = null;
        for (var n = fe.parentElement; n; n = n.parentElement) {
          if (/(auto|scroll)/.test(pw.getComputedStyle(n).overflowY) && n.scrollHeight > n.clientHeight + 1) { sc = n; break; }
        }
        if (sc) sc.scrollTo({ top: sc.scrollTop + (y - sc.getBoundingClientRect().top - gap), behavior: behavior });
        else pw.scrollTo({ top: pw.scrollY + y - gap, behavior: behavior });
        return;
      } catch (err) { /* fall back to scrollIntoView */ }
    }
    block.scrollIntoView({ behavior: behavior, block: 'start' });
  }
  document.querySelectorAll('.st [data-toc]').forEach(function (toc) {
    var list = toc.querySelector('[data-toc-list]');
    var sec = toc.closest('.st');
    var source = sec && sec.querySelector('[data-toc-source]');
    if (!list || !source) return;
    var used = {}, links = [], blocks = [];
    source.querySelectorAll('h2').forEach(function (h) {
      var block = h.closest('section') || h.parentNode;
      var text = h.textContent.trim();
      if (!text) return;
      var slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
      var id = slug, n = 2;
      while (used[id] || document.getElementById(id)) { id = slug + '-' + n++; }
      used[id] = true;
      block.id = id;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = text;
      // Slide to the section (the editor keeps links from navigating, so the script does it)
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        goTo(block, reduce ? 'auto' : 'smooth');
        if (!window.ST_STILL && !window.ST_PREVIEW && window.history && history.replaceState) history.replaceState(null, '', '#' + id);
      });
      li.appendChild(a);
      list.appendChild(li);
      links.push(a); blocks.push(block);
    });
    if (!links.length) return;
    toc.hidden = false;
    // A sticky header above this section (a sticky navbar): the contents list and the
    // sections' scroll position sit below it, whatever its height is at the moment
    var lastGap = -1;
    function clearHeader() {
      var h = 0;
      document.querySelectorAll('.st').forEach(function (el) {
        if (el === sec) return;
        var cs = getComputedStyle(el);
        if (cs.position !== 'sticky') return;
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top <= (parseFloat(cs.top) || 0) + 1) h = Math.max(h, r.bottom);
      });
      return Math.round(h);
    }
    function place() {
      var gap = clearHeader() + 24;
      if (gap === lastGap) return;
      lastGap = gap;
      toc.style.top = gap + 'px';
      blocks.forEach(function (b) { b.style.scrollMarginTop = gap + 'px'; });
    }
    place();
    var queued = false;
    function queue() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; place(); }); }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    // In the editor the preview is a tall frame inside a scrolling panel, so CSS sticky has
    // nothing to stick to: follow the panel's scroll by hand
    if (window.ST_STILL || window.ST_PREVIEW) {
      var parentWin = null;
      try { parentWin = window.parent !== window && window.frameElement ? window.parent : null; } catch (err) { parentWin = null; }
      if (parentWin) {
        var follow = function () {
          if (getComputedStyle(toc).position !== 'sticky') { toc.style.transform = ''; return; }
          var range = seenRange();
          if (!range) return;
          var box = toc.parentNode;
          toc.style.transform = '';
          var base = box.getBoundingClientRect().top;
          var max = Math.max(0, box.offsetHeight - toc.offsetHeight);
          toc.style.transform = 'translateY(' + Math.round(Math.min(max, Math.max(0, range.top + lastGap - base))) + 'px)';
        };
        try { parentWin.addEventListener('scroll', follow, true); parentWin.addEventListener('resize', follow); } catch (err) { /* cross-origin parent */ }
        follow();
      }
    }
    if (window.ST_STILL || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = blocks.indexOf(en.target);
        links.forEach(function (l, k) { l.classList.toggle('is-current', k === i); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    blocks.forEach(function (b) { io.observe(b); });
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
