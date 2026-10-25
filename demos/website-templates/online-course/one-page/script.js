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
    if (inline) {
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
      if (days > 0 && seen && Date.now() - seen < days * 86400000) return;
    } catch (e) {}
    var modal = (root.getAttribute('data-pos') || 'center') === 'center'; // only the centre popup dims the page and traps focus
    dlg.setAttribute('aria-modal', modal ? 'true' : 'false');
    var shown = false, last = null, undo = [];
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
      if (modal) {
        var f = focusables();
        var target = dlg.querySelector('input') || f[1] || f[0] || dlg;
        try { target.focus({ preventScroll: true }); } catch (e) {}
      }
      document.addEventListener('keydown', onKey);
      try { if (days > 0) localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
    }
    function hide() {
      root.classList.remove('is-open');
      root.querySelectorAll('.vs-embed').forEach(function (v) { var box = v.parentNode; v.remove(); if (box) box.classList.remove('is-playing'); });
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { dlg.hidden = true; if (back) back.hidden = true; }, 320);
      if (last && last.focus) { try { last.focus({ preventScroll: true }); } catch (e) {} }
    }
    root.querySelectorAll('[data-pu-close]').forEach(function (b) { b.addEventListener('click', hide); });
    var on = function (target, ev, fn, opts) { target.addEventListener(ev, fn, opts); undo.push(function () { target.removeEventListener(ev, fn, opts); }); };
    var started = Date.now();
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
