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
  document.querySelectorAll('.st [data-kb]').forEach(function (root) {
    if (root.getAttribute('data-kb-ready')) return;
    root.setAttribute('data-kb-ready', '1');
    var num = function (name, d) { var v = parseFloat(root.getAttribute(name)); return isNaN(v) ? d : v; };
    var zoom = num('data-zoom', 30) / 100, dir = root.getAttribute('data-dir') === 'out' ? 'out' : 'in';
    var affect = root.getAttribute('data-affect') || 'both';
    var startPct = num('data-start', 100), endPct = num('data-end', 0), smooth = num('data-smooth', 0.6);
    var drift = root.getAttribute('data-drift') !== 'off';
    root.querySelectorAll('[data-kb-img]').forEach(function (img) {
      var kind = img.getAttribute('data-kb-img');
      if (affect !== 'both' && affect !== kind) return;
      var frame = img.parentNode;
      var s0 = dir === 'in' ? 1 : 1 + zoom, s1 = dir === 'in' ? 1 + zoom : 1;
      var x0 = drift ? -(s0 - 1) * 40 : 0, x1 = drift ? -(s1 - 1) * 40 : 0;
      var startPos = function () { return Math.max(0, frame.getBoundingClientRect().top + window.pageYOffset - window.innerHeight * startPct / 100); };
      var endPos = function () { return Math.max(startPos() + 120, frame.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight * endPct / 100); };
      G.fromTo(img, { scale: s0, xPercent: x0 }, {
        scale: s1, xPercent: x1, ease: 'none', force3D: true,
        scrollTrigger: { trigger: frame, start: startPos, end: endPos, scrub: smooth > 0 ? smooth : true, invalidateOnRefresh: true }
      });
    });
    root.setAttribute('data-kb-active', '1');
  });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
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
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (G && window.ScrollToPlugin) G.registerPlugin(ScrollToPlugin);
  document.querySelectorAll('.st [data-totop]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (G && window.ScrollToPlugin && !reduce) G.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' });
      else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
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
