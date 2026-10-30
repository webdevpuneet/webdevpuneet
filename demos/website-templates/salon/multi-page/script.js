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
  var still = window.ST_STILL && !window.ST_SCROLL_FX;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var SHADOW_ON = '0 30px 80px rgba(0,0,0,0.55)', SHADOW_OFF = '0 30px 80px rgba(0,0,0,0)';
  document.querySelectorAll('.st [data-zs]').forEach(function (root) {
    if (root.getAttribute('data-zs-ready')) return;
    root.setAttribute('data-zs-ready', '1');
    var layers = Array.prototype.slice.call(root.querySelectorAll('.zs-layer'));
    var n = layers.length;
    if (n < 2 || reduce) return;
    var num = function (name, d) { var v = parseFloat(root.getAttribute(name)); return isNaN(v) ? d : v; };
    var zoom = Math.min(100, Math.max(5, num('data-zoom', 45)));
    var s0 = Math.max(0.22, 1 - 0.7 * zoom / 100);           // the size an image starts at, as a share of the stage
    var dir = root.getAttribute('data-dir') === 'out' ? 'out' : 'in';
    var both = root.getAttribute('data-affect') !== 'moving';
    var per = Math.max(30, num('data-per', 100)), smooth = num('data-smooth', 0.6);
    var drift = root.getAttribute('data-drift') !== 'off';
    var imgs = layers.map(function (l) { return l.querySelector('.zs-img'); });
    var caps = layers.map(function (l) { return l.querySelector('.zs-cap'); });
    var RADIUS = 30;
    layers.forEach(function (l, i) { l.style.zIndex = String(dir === 'in' ? i + 1 : n - i); });
    var count = root.querySelector('.zs-count'), bar = root.querySelector('.zs-bar i');
    var label = function (i) { return pad(i + 1) + ' / ' + pad(n); };

    if (still || !G || !window.ScrollTrigger) {
      if (!still) return;
      // A frame from the effect for previews and thumbnails: the back image fills the stage and the next image is a slightly
      // smaller card with a shadow in front of it, part way through its zoom, with the counter and progress bar. No heading, no captions.
      root.classList.add('is-zs', 'is-zs-still');
      layers.forEach(function (l, i) { l.style.zIndex = String(i + 1); if (i > 1) l.style.visibility = 'hidden'; });
      if (layers[1]) {
        layers[1].style.transform = 'scale(0.88)';
        layers[1].style.borderRadius = '24px';
        layers[1].style.boxShadow = SHADOW_ON;
      }
      caps.forEach(function (c) { if (c) c.style.opacity = '0'; });
      if (count) count.textContent = label(1);
      if (bar) bar.style.transform = 'scaleX(' + Math.min(1, 1.45 / (n - 1)).toFixed(3) + ')';
      return;
    }

    G.registerPlugin(ScrollTrigger);
    root.classList.add('is-zs');
    var steps = n - 1, HOLD = 0.3;
    // A sticky header stays on screen, so the stage pins just below it instead of under it
    var head = function () { var h = 0; document.querySelectorAll('.st').forEach(function (s) { if (s.querySelector('[data-sticky-flag]')) h = Math.max(h, s.offsetHeight); }); return h; };
    var tl = G.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: function () { return 'top ' + (head() + 16); },
        end: function () { return '+=' + Math.round(window.innerHeight * per / 100 * (steps + HOLD)); },
        pin: true, scrub: smooth > 0 ? smooth : true, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: function (self) {
          var i = Math.min(n - 1, Math.floor(self.progress * (steps + HOLD) + 0.5));
          if (count) count.textContent = label(i);
          if (bar) bar.style.transform = 'scaleX(' + Math.min(1, self.progress * (steps + HOLD) / steps).toFixed(3) + ')';
        }
      }
    });
    if (count) count.textContent = label(0);
    var kb = 1 + (1 - s0) * 0.2;                              // how far the image beneath drifts closer
    var kbx = drift ? -(kb - 1) * 35 : 0;
    G.set(caps.slice(1), { opacity: 0 });

    if (dir === 'in') {
      layers.forEach(function (layer, i) {
        if (!i) return;
        var t = i - 1;
        G.set(layer, { scale: s0, autoAlpha: 0, borderRadius: RADIUS, boxShadow: SHADOW_ON });
        G.set(imgs[i], { scale: 1.22 });
        tl.to(layer, { autoAlpha: 1, duration: 0.14 }, t);
        tl.to(layer, { scale: 1, borderRadius: 0, boxShadow: SHADOW_OFF, duration: 1, ease: 'power1.inOut' }, t);
        tl.to(imgs[i], { scale: 1, duration: 1, ease: 'power1.inOut' }, t);
        if (both) tl.to(imgs[i - 1], { scale: kb, xPercent: kbx, duration: 1 }, t);
        if (caps[i - 1]) tl.to(caps[i - 1], { opacity: 0, duration: 0.2 }, t);
        if (caps[i]) tl.to(caps[i], { opacity: 1, duration: 0.25 }, t + 0.75);
      });
    } else {
      layers.forEach(function (layer, i) {
        if (i === n - 1) return;
        G.set(layer, { boxShadow: SHADOW_OFF });
        tl.to(layer, { scale: s0, borderRadius: RADIUS, boxShadow: SHADOW_ON, duration: 0.86, ease: 'power1.inOut' }, i);
        tl.to(layer, { autoAlpha: 0, duration: 0.14 }, i + 0.86);
        if (both) tl.fromTo(imgs[i + 1], { scale: kb, xPercent: kbx }, { scale: 1, xPercent: 0, duration: 1 }, i);
        if (caps[i]) tl.to(caps[i], { opacity: 0, duration: 0.2 }, i);
        if (caps[i + 1]) tl.to(caps[i + 1], { opacity: 1, duration: 0.25 }, i + 0.75);
      });
    }
    tl.to({}, { duration: HOLD }, steps);
  });
  window.addEventListener('load', function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
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
  document.querySelectorAll('.st [data-ta]').forEach(function (root) {
    if (root.getAttribute('data-ta-ready')) return;
    root.setAttribute('data-ta-ready', '1');
    var items = Array.prototype.slice.call(root.querySelectorAll('.ta-item'));
    if (!items.length) return;
    function open(i) {
      items.forEach(function (it, k) {
        var on = k === i;
        it.classList.toggle('is-open', on);
        var b = it.querySelector('.ta-trigger');
        if (b) b.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }
    var start = parseInt(root.getAttribute('data-open'), 10);
    open(isNaN(start) ? 0 : Math.min(items.length - 1, Math.max(0, start - 1)));
    items.forEach(function (it, k) {
      var b = it.querySelector('.ta-trigger');
      if (!b) return;
      b.addEventListener('click', function () { open(k); });
      b.addEventListener('keydown', function (e) {
        var to = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (k + 1) % items.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (k - 1 + items.length) % items.length;
        else if (e.key === 'Home') to = 0;
        else if (e.key === 'End') to = items.length - 1;
        if (to < 0) return;
        e.preventDefault();
        var nb = items[to].querySelector('.ta-trigger');
        if (nb) nb.focus();
        open(to);
      });
    });
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
  var inline = window.ST_STILL || window.ST_PREVIEW || window.ST_POPUP_INLINE;
  document.querySelectorAll('.st [data-pu]').forEach(function (root) {
    var dlg = root.querySelector('.pu-dialog');
    var back = root.querySelector('.pu-backdrop');
    if (!dlg || root.getAttribute('data-pu-ready')) return;
    root.setAttribute('data-pu-ready', '1');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelectorAll('[data-pu-carousel]').forEach(function (car) {
      var track = car.querySelector('.pu-track');
      if (!track) return;
      var slides = track.children, n = slides.length;
      if (n < 2) { car.classList.add('is-single'); return; }
      var mk = function (cls, label, svg) { var b = document.createElement('button'); b.type = 'button'; b.className = cls; b.setAttribute('aria-label', label); if (svg) b.innerHTML = svg; return b; };
      var arrow = function (d) { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; };
      var prev = mk('pu-nav pu-prev', 'Previous slide', arrow('m15 18-6-6 6-6'));
      var next = mk('pu-nav pu-next', 'Next slide', arrow('m9 18 6-6-6-6'));
      var dots = document.createElement('div'); dots.className = 'pu-dots';
      var dotEls = [];
      for (var i = 0; i < n; i++) { (function (k) { var d = mk('pu-dot', 'Go to slide ' + (k + 1)); d.addEventListener('click', function () { go(k); stop(); }); dots.appendChild(d); dotEls.push(d); })(i); }
      car.appendChild(prev); car.appendChild(next); car.appendChild(dots);
      var idx = function () { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); };
      var mark = function () { var c = idx(); dotEls.forEach(function (d, k) { d.setAttribute('aria-current', k === c ? 'true' : 'false'); }); };
      var go = function (k) { k = (k + n) % n; track.scrollTo({ left: k * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' }); };
      var ticking = false;
      track.addEventListener('scroll', function () { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; mark(); }); }, { passive: true });
      prev.addEventListener('click', function () { go(idx() - 1); stop(); });
      next.addEventListener('click', function () { go(idx() + 1); stop(); });
      mark();
      var secs = parseFloat(root.getAttribute('data-autoplay')) || 0;
      var timer = 0, paused = false;
      var stop = function () { clearInterval(timer); timer = 0; };
      if (secs > 0 && !reduce) {
        car.addEventListener('mouseenter', function () { paused = true; });
        car.addEventListener('mouseleave', function () { paused = false; });
        car.addEventListener('focusin', function () { paused = true; });
        car.addEventListener('focusout', function () { paused = false; });
        timer = setInterval(function () { var d = root.querySelector('.pu-dialog'); if (!paused && d && !d.hidden && !document.hidden) go(idx() + 1); }, secs * 1000);
      }
    });
    var btnMode = !!window.ST_POPUP_BUTTON; // Website Builder preview: a floating button opens the popup instead of showing it inline
    if (inline && !btnMode) {
      root.classList.add('is-preview');
      dlg.hidden = false;
      if (back) back.hidden = true;
      root.querySelectorAll('[data-pu-close]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); }); });
      return;
    }
    var trigger = root.getAttribute('data-trigger') || 'delay';
    var delay = Math.max(0, parseFloat(root.getAttribute('data-delay')) || 0);
    var pct = Math.min(100, Math.max(1, parseFloat(root.getAttribute('data-scroll')) || 50));
    var days = parseFloat(root.getAttribute('data-days')) || 0;
    var KEY = 'pu-' + (root.getAttribute('data-pu-id') || 'x');
    try {
      var seen = parseInt(localStorage.getItem(KEY), 10);
      if (!btnMode && days > 0 && seen && Date.now() - seen < days * 86400000) return;
    } catch (e) {}
    var modal = (root.getAttribute('data-pos') || 'center') === 'center'; // only the centre popup dims the page and traps focus
    dlg.setAttribute('aria-modal', modal ? 'true' : 'false');
    var shown = false, last = null, undo = [], quiet = btnMode; // in the builder preview the popup never pulls focus out of the side panel
    var setOpenFlag = function (v) { if (!btnMode) return; try { if (v) window.parent.__wbPuOpen = KEY; else if (window.parent.__wbPuOpen === KEY) window.parent.__wbPuOpen = ''; } catch (e) {} };
    var focusables = function () { return Array.prototype.filter.call(dlg.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'), function (el) { return el.offsetParent !== null; }); };
    var onKey = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); hide(); return; }
      if (e.key !== 'Tab' || !modal) return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], end = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); end.focus(); }
      else if (!e.shiftKey && document.activeElement === end) { e.preventDefault(); first.focus(); }
    };
    function show() {
      if (shown) return;
      shown = true;
      undo.forEach(function (fn) { fn(); });
      last = document.activeElement;
      dlg.hidden = false;
      if (back) back.hidden = false;
      void dlg.offsetWidth;
      root.classList.add('is-open');
      setOpenFlag(true);
      if (modal && !quiet) {
        var f = focusables();
        var target = dlg.querySelector('input') || f[1] || f[0] || dlg;
        try { target.focus({ preventScroll: true }); } catch (e) {}
      }
      document.addEventListener('keydown', onKey);
      try { if (days > 0 && !btnMode) localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
    }
    function hide() {
      setOpenFlag(false);
      root.classList.remove('is-open');
      root.querySelectorAll('.vs-embed').forEach(function (v) { var box = v.parentNode; v.remove(); if (box) box.classList.remove('is-playing'); });
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { dlg.hidden = true; if (back) back.hidden = true; }, 320);
      if (last && last.focus) { try { last.focus({ preventScroll: true }); } catch (e) {} }
    }
    root.querySelectorAll('[data-pu-close]').forEach(function (b) { b.addEventListener('click', hide); });
    var on = function (target, ev, fn, opts) { target.addEventListener(ev, fn, opts); undo.push(function () { target.removeEventListener(ev, fn, opts); }); };
    var started = Date.now();
    if (btnMode) {
      // The popup follows its own trigger (delay, exit intent, scroll) exactly like the published page; a floating
      // button also opens and closes it on demand, and it stays open across preview reloads while it is being edited
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wb-pu-btn';
      btn.textContent = 'Popup preview';
      btn.setAttribute('aria-label', 'Open the popup');
      btn.style.cssText = 'position:fixed;left:16px;bottom:' + (16 + document.querySelectorAll('.wb-pu-btn').length * 48) + 'px;z-index:999;padding:0 16px;height:38px;border:0;border-radius:999px;background:#4f46e5;color:#fff;font:700 13px/1 system-ui,sans-serif;box-shadow:0 8px 22px rgba(15,23,42,.35);cursor:pointer';
      btn.addEventListener('click', function () { if (root.classList.contains('is-open')) hide(); else { shown = false; show(); } });
      document.body.appendChild(btn);
      try { if (window.parent.__wbPuOpen === KEY) show(); } catch (e) {}
    }
    if (trigger === 'scroll') {
      var check = function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var p = h > 0 ? (window.scrollY / h) * 100 : 100;
        if (p >= pct) show();
      };
      on(window, 'scroll', check, { passive: true });
    } else if (trigger === 'exit' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      on(document, 'mouseout', function (e) { if (!e.relatedTarget && e.clientY <= 0 && Date.now() - started > 2000) show(); });
    } else {
      var timer = setTimeout(show, Math.max(delay, trigger === 'exit' ? 10 : 0) * 1000);
      undo.push(function () { clearTimeout(timer); });
    }
  });
})();
(function () {
  var editing = window.ST_STILL || window.ST_PREVIEW;
  function embed(url) {
    var m;
    // Character classes instead of backslashes: this code lives inside a template literal
    if ((m = url.match(/(?:youtube[.]com[/](?:watch[?](?:.*&)?v=|embed[/]|shorts[/])|youtu[.]be[/])([A-Za-z0-9_-]{11})/))) return { type: 'iframe', src: 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0' };
    if ((m = url.match(/vimeo[.]com[/](?:video[/])?([0-9]+)/))) return { type: 'iframe', src: 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1&dnt=1' };
    if (/[.](mp4|webm|ogg)([?].*)?$/i.test(url)) return { type: 'video', src: url };
    return null;
  }
  document.querySelectorAll('.st [data-video-box]').forEach(function (box) {
    var btn = box.querySelector('[data-video]');
    if (!btn) return;
    function start(e) {
      var info = embed(btn.getAttribute('data-video') || '');
      if (!info) return;
      e.preventDefault();
      // In the editor the click also selects the section, so the editor still gets it
      if (!editing) e.stopPropagation();
      var title = box.getAttribute('data-title') || 'Video';
      var el;
      if (info.type === 'iframe') {
        el = document.createElement('iframe');
        el.src = info.src;
        el.title = title;
        el.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        el.allowFullscreen = true;
        el.referrerPolicy = 'strict-origin-when-cross-origin';
      } else {
        el = document.createElement('video');
        el.src = info.src;
        el.controls = true;
        el.autoplay = true;
        el.setAttribute('playsinline', '');
        el.setAttribute('aria-label', title);
      }
      el.className = 'vs-embed';
      box.appendChild(el);
      box.classList.add('is-playing');
      if (el.focus) el.focus();
    }
    btn.addEventListener('click', start);
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
        scrollTrigger: window.ScrollTrigger ? (window.ST_PREVIEW ? { trigger: section, start: 'top 80%', end: function () { var pin = ScrollTrigger.getAll().filter(function (t) { return t.pin === section; })[0]; return pin ? pin.end + section.offsetHeight : 'bottom top'; }, toggleActions: 'play reset play reset' } : { trigger: section, start: 'top 80%', once: true }) : undefined
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
