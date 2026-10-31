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
  var canPin = !!(G && window.ScrollTrigger && !reduce && !(window.ST_STILL && !window.ST_SCROLL_FX));
  if (canPin) G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st [data-tlh]').forEach(function (root) {
    if (root.getAttribute('data-tlh-ready')) return;
    root.setAttribute('data-tlh-ready', '1');
    var track = root.querySelector('[data-tlh-track]');
    var list = root.querySelector('.tlh-list');
    var prev = root.querySelector('[data-tlh-prev]'), next = root.querySelector('[data-tlh-next]');
    if (!track || !list) return;
    var sec = root.closest('.st');
    var items = Array.prototype.slice.call(list.children).filter(function (c) { return c.classList.contains('tlh-item'); });
    var active = -1, pinned = false, smooth = reduce ? 'auto' : 'smooth';
    var mid = function (it) { return it.offsetLeft + it.offsetWidth / 2; };
    function mark(i) {
      active = i;
      items.forEach(function (it, k) {
        it.classList.toggle('is-active', k === i);
        var d = it.querySelector('[data-tlh-dot]');
        if (d) { if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); }
      });
    }
    function centre(i, behavior) {
      var it = items[i]; if (!it) return;
      track.scrollTo({ left: Math.max(0, mid(it) - track.clientWidth / 2), behavior: behavior || smooth });
    }
    function setActive(i, scroll) {
      if (!items[i]) return;
      mark(i);
      list.style.setProperty('--tl-fill', mid(items[i]) + 'px');
      if (scroll) centre(i);
    }
    function update() {
      if (pinned) return;
      var max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max - 2;
      root.classList.toggle('is-fit', max <= 2);
      if (active > -1) list.style.setProperty('--tl-fill', mid(items[active]) + 'px');
    }
    var ticking = false;
    track.addEventListener('scroll', function () { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; update(); }); }, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(update).observe(track); else window.addEventListener('resize', update);
    var step = function () { var w = items[0] ? items[0].offsetWidth : 240; return Math.max(w, Math.floor(track.clientWidth * 0.8 / w) * w); };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: smooth }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: smooth }); });
    var trigger = null;
    items.forEach(function (it, k) {
      var d = it.querySelector('[data-tlh-dot]');
      if (!d) return;
      d.addEventListener('click', function () {
        if (root.getAttribute('data-moved')) return;
        if (pinned && trigger) {
          var p = items.length > 1 ? k / (items.length - 1) : 0;
          window.scrollTo({ top: trigger.start + p * (trigger.end - trigger.start), behavior: smooth });
        } else setActive(k, true);
      });
    });
    track.addEventListener('keydown', function (e) {
      if (pinned) return;
      var w = items[0] ? items[0].offsetWidth : 240;
      if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: w, behavior: smooth }); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -w, behavior: smooth }); }
      else if (e.key === 'Home') { e.preventDefault(); track.scrollTo({ left: 0, behavior: smooth }); }
      else if (e.key === 'End') { e.preventDefault(); track.scrollTo({ left: track.scrollWidth, behavior: smooth }); }
    });
    var down = false, sx = 0, sl = 0, moved = 0;
    track.addEventListener('pointerdown', function (e) {
      if (pinned || e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft; root.removeAttribute('data-moved');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) { track.classList.add('is-dragging'); track.scrollLeft = sl - dx; }
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false; track.classList.remove('is-dragging');
      if (moved > 5) { root.setAttribute('data-moved', '1'); setTimeout(function () { root.removeAttribute('data-moved'); }, 0); }
    });
    var start = parseInt(root.getAttribute('data-start'), 10);
    setActive(isNaN(start) ? 0 : Math.min(items.length - 1, Math.max(0, start - 1)), false);
    update();

    if (canPin && root.getAttribute('data-mode') !== 'free' && sec) {
      G.matchMedia().add('(min-width: 768px)', function () {
        var dist = function () { return Math.max(0, list.scrollWidth - track.clientWidth); };
        if (dist() < 24) return;
        // A sticky header stays on screen, so the section pins just below it instead of under it
        var head = function () { var h = 0; document.querySelectorAll('.st').forEach(function (n) { if (n !== sec && n.querySelector('[data-sticky-flag]')) h = Math.max(h, n.offsetHeight); }); return h; };
        pinned = true;
        sec.classList.add('is-tl-pinned');
        track.scrollLeft = 0;
        var first = function () { return mid(items[0]); }, last = function () { return mid(items[items.length - 1]); };
        var tw = G.timeline({
          scrollTrigger: {
            trigger: sec, start: function () { return 'top ' + head(); }, end: function () { return '+=' + Math.round(Math.max(dist() * 1.1, items.length * 170)); },
            pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: function (self) {
              trigger = self;
              var p = Math.min(1, self.progress / 0.91);
              var f = first() + (last() - first()) * p;
              list.style.setProperty('--tl-fill', f + 'px');
              var idx = 0;
              for (var k = 0; k < items.length; k++) { if (mid(items[k]) <= f + 2) idx = k; }
              if (idx !== active) mark(idx);
            }
          }
        });
        // The row travels for 91% of the scroll, then rests on the last event for the last 9%
        tw.to(list, { x: function () { return -dist(); }, ease: 'none', duration: 0.91 }).to({}, { duration: 0.09 });
        trigger = tw.scrollTrigger;
        return function () {
          pinned = false; trigger = null;
          if (tw.scrollTrigger) tw.scrollTrigger.kill(); tw.kill();
          G.set(list, { clearProps: 'transform' });
          sec.classList.remove('is-tl-pinned');
          setActive(active > -1 ? active : 0, false);
          update();
        };
      });
    }
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
