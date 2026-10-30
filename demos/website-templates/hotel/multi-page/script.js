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
  G.matchMedia().add('(min-width: 768px)', function () {
    var made = [];
    document.querySelectorAll('.st [data-hscroll]').forEach(function (row) {
      var sec = row.closest('.st');
      sec.classList.add('is-hscroll');
      var dist = function () { return Math.max(0, row.scrollWidth - row.clientWidth); };
      // A sticky header stays on screen, so the section pins just below it instead of under it
      var head = function () { var h = 0; document.querySelectorAll('.st').forEach(function (n) { if (n !== sec && n.querySelector('[data-sticky-flag]')) h = Math.max(h, n.offsetHeight); }); return h; };
      var tw = G.to(row, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: sec, start: function () { return 'top ' + head(); }, end: function () { return '+=' + dist(); }, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true } });
      made.push(function () { tw.scrollTrigger.kill(); tw.kill(); G.set(row, { clearProps: 'transform' }); sec.classList.remove('is-hscroll'); });
    });
    return function () { made.forEach(function (f) { f(); }); };
  });
})();
(function () {
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || !window.ScrollTrigger || reduce || (window.ST_STILL && !window.ST_SCROLL_FX)) return;
  G.registerPlugin(ScrollTrigger);
  G.matchMedia().add('(min-width: 768px)', function () {
    var made = [];
    document.querySelectorAll('.st [data-stack]').forEach(function (list) {
      var cards = Array.prototype.slice.call(list.children);
      if (cards.length < 2) return;
      var last = cards[cards.length - 1];
      cards.forEach(function (card, i) {
        var top = 90 + i * 22;
        var pin = ScrollTrigger.create({ trigger: card, start: 'top ' + top, endTrigger: last, end: 'top ' + (90 + (cards.length - 1) * 22), pin: true, pinSpacing: false });
        made.push(function () { pin.kill(); });
        if (card === last) return;
        // Scale the card's inner wrapper: the card itself is positioned by its pin
        var inner = card.firstElementChild || card;
        // fromTo: GSAP can't tween a filter from "none" (it would start at brightness 0)
        var tw = G.fromTo(inner, { scale: 1, filter: 'brightness(1)' }, { scale: 1 - (cards.length - 1 - i) * 0.04, filter: 'brightness(.82)', ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top ' + top, scrub: true } });
        made.push(function () { tw.scrollTrigger.kill(); tw.kill(); G.set(inner, { clearProps: 'transform,filter' }); });
      });
    });
    return function () { made.forEach(function (f) { f(); }); };
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
  var G = window.gsap;
  if (G && window.Draggable) G.registerPlugin(Draggable);
  if (G && window.InertiaPlugin) G.registerPlugin(InertiaPlugin);
  if (G && window.ScrollToPlugin) G.registerPlugin(ScrollToPlugin);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  document.querySelectorAll('.st').forEach(function (sec) {
    var track = sec.querySelector('[data-carousel]');
    if (!track) return;
    var prev = sec.querySelector('[data-carousel-prev]');
    var next = sec.querySelector('[data-carousel-next]');
    var max = function () { return Math.max(0, track.scrollWidth - track.clientWidth); };
    var points = function () {
      var first = track.children[0];
      if (!first) return [0];
      return Array.prototype.map.call(track.children, function (c) { return Math.min(max(), c.offsetLeft - first.offsetLeft); });
    };
    var nearest = function (x) { return points().reduce(function (a, p) { return Math.abs(p - x) < Math.abs(a - x) ? p : a; }, 0); };
    var update = function () {
      var x = track.scrollLeft;
      if (prev) prev.disabled = x <= 2;
      if (next) next.disabled = x >= max() - 2;
    };
    var go = function (dir) {
      var ps = points(), x = track.scrollLeft, target = x;
      if (dir > 0) { for (var i = 0; i < ps.length; i++) if (ps[i] > x + 4) { target = ps[i]; break; } }
      else { for (var j = ps.length - 1; j >= 0; j--) if (ps[j] < x - 4) { target = ps[j]; break; } }
      if (G && window.ScrollToPlugin && !reduce) G.to(track, { scrollTo: { x: target }, duration: 0.6, ease: 'power3.out', onUpdate: update });
      else track.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' });
    };
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    // Mouse drag with momentum on desktop; touch keeps native scrolling and snap.
    // An invisible proxy is dragged and its x is mapped onto the track's native scrollLeft,
    // so the slides' markup and layout never change.
    if (G && window.Draggable && fine) {
      track.classList.add('is-draggable');
      var proxy = document.createElement('div');
      var start = 0;
      var apply = function () { track.scrollLeft = start - this.x; update(); };
      Draggable.create(proxy, {
        type: 'x',
        trigger: track,
        inertia: !!window.InertiaPlugin && !reduce,
        dragClickables: false,
        onPress: function () { G.killTweensOf(track); start = track.scrollLeft; G.set(proxy, { x: 0 }); this.update(); },
        onDrag: apply,
        onThrowUpdate: apply,
        snap: { x: function (v) { return start - nearest(Math.max(0, Math.min(max(), start - v))); } },
        onRelease: function () { if (!this.tween) { G.to(track, { scrollTo: window.ScrollToPlugin ? { x: nearest(track.scrollLeft) } : undefined, duration: 0.4, ease: 'power3.out', onUpdate: update }); } }
      });
    }
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
