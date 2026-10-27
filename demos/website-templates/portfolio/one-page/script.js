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
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || reduce) return;
  if (window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
  var still = window.ST_STILL && !window.ST_SCROLL_FX;
  var hover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  function build(row, pinned) {
    var sec = row.closest('.st');
    var cards = Array.prototype.slice.call(row.children).filter(function (c) { return c.classList.contains('rg-card'); });
    var n = cards.length;
    if (n < 3) return null;
    var style = row.getAttribute('data-style') || 'ring';
    var tiltOn = hover && row.getAttribute('data-tilt') !== 'off';
    var reflect = row.getAttribute('data-reflect') !== 'off';
    var below = row.getAttribute('data-details') === 'below';
    var ctaText = row.getAttribute('data-cta') || 'View details';
    var imgs = cards.map(function (c) { return c.querySelector('.rg-img'); });
    var step = Math.min(48, 360 / n), rad = Math.PI / 180, R = 300, W = 300, active = -1, st = null;
    var obj = { pos: pinned ? 0 : Math.floor((n - 1) / 2) }; // free mode: a middle card in front, cards on both sides
    var T = { nx: 0, ny: 0 };
    sec.classList.add('is-ring');
    sec.classList.toggle('is-pin', pinned);
    sec.classList.toggle('rg-reflect', reflect);
    sec.classList.toggle('rg-below', below);

    var nav = document.createElement('div');
    nav.className = 'rg-nav';
    var prev = document.createElement('button'), next = document.createElement('button'), dots = document.createElement('div');
    prev.type = next.type = 'button';
    prev.className = next.className = 'rg-arrow';
    prev.textContent = String.fromCharCode(8592); next.textContent = String.fromCharCode(8594);
    prev.setAttribute('aria-label', 'Previous card'); next.setAttribute('aria-label', 'Next card');
    dots.className = 'rg-dots';
    var dotEls = cards.map(function (c, i) {
      var d = document.createElement('button');
      d.type = 'button'; d.className = 'rg-dot'; d.setAttribute('aria-label', 'Show card ' + (i + 1) + ' of ' + n);
      d.addEventListener('click', function () { go(i); });
      dots.appendChild(d);
      return d;
    });
    nav.appendChild(prev); nav.appendChild(dots); nav.appendChild(next);
    var bar = document.createElement('div');
    bar.className = 'rg-progress'; bar.setAttribute('aria-hidden', 'true');
    var fill = document.createElement('i');
    bar.appendChild(fill);
    var extra = [nav, bar], cap = null, capTag, capTitle, capText, capBtn;
    if (below) {
      cap = document.createElement('div');
      cap.className = 'rg-cap';
      cap.setAttribute('aria-live', 'polite');
      capTag = document.createElement('span'); capTag.className = 'rg-cap-tag';
      capTitle = document.createElement('span'); capTitle.className = 'rg-cap-title';
      capText = document.createElement('span'); capText.className = 'rg-cap-text';
      capBtn = document.createElement('a'); capBtn.className = 'rg-cap-btn';
      cap.appendChild(capTag); cap.appendChild(capTitle); cap.appendChild(capText); cap.appendChild(capBtn);
      extra.unshift(cap);
    }
    var anchor = row;
    extra.forEach(function (el) { anchor.insertAdjacentElement('afterend', el); anchor = el; });

    var go = function (i) {
      i = clamp(i, 0, n - 1);
      if (pinned) { if (st) window.scrollTo({ top: st.start + (i / (n - 1)) * (st.end - st.start), behavior: 'smooth' }); }
      else G.to(obj, { pos: i, duration: 0.6, ease: 'power2.inOut', overwrite: true, onUpdate: render });
    };
    prev.addEventListener('click', function () { go(Math.max(0, active) - 1); });
    next.addEventListener('click', function () { go(Math.max(0, active) + 1); });
    var onClick = [], onFocus = [];
    if (!still) cards.forEach(function (c, i) {
      var click = function (e) { if (i !== active) { e.preventDefault(); go(i); } };
      var focus = function () { if (i !== active) go(i); };
      c.addEventListener('click', click); c.addEventListener('focus', focus);
      onClick.push(click); onFocus.push(focus);
    });

    var measure = function () {
      W = cards[0].offsetWidth || 300;
      R = (W * 1.1) / (2 * Math.sin(step * rad / 2));
    };
    // Where a card sits when it is "off" places from the front (negative = left)
    var place = function (off) {
      var abs = Math.abs(off), sg = off < 0 ? -1 : 1, c = Math.min(abs, 1), p;
      if (style === 'coverflow') {
        p = { x: sg * (c * W * 0.62 + Math.max(0, abs - 1) * W * 0.3), y: 0, z: -c * W * 0.55 - Math.max(0, abs - 1) * W * 0.12, ry: sg * c * 52, rz: 0, o: 1 - Math.max(0, abs - 1.1) * 0.5, s: 1 - Math.min(abs, 2) * 0.05 };
      } else if (style === 'stack') {
        if (off >= 0) p = { x: off * W * 0.13, y: -off * 12, z: -off * W * 0.35, ry: -Math.min(off, 3) * 5, rz: 0, o: 1 - off * 0.24, s: 1 - off * 0.04 };
        else p = { x: off * W * 0.7, y: 0, z: 0, ry: off * 40, rz: off * 4, o: 1 + off * 1.3, s: 1 };
      } else if (style === 'arc') {
        p = { x: off * W * 0.95, y: off * off * W * 0.07, z: -off * off * W * 0.2, ry: off * 22, rz: off * 2.5, o: 1 - Math.max(0, abs - 1.2) * 0.6, s: 1 - Math.min(abs, 2) * 0.04 };
      } else {
        var a = off * step, aa = Math.abs(a);
        p = { x: Math.sin(a * rad) * R, y: 0, z: Math.cos(a * rad) * R - R, ry: a, rz: 0, o: 1 - Math.max(0, aa - 30) / 75, s: 1 - Math.min(aa, 90) / 450 };
      }
      p.abs = abs;
      return p;
    };
    var showCaption = function (c) {
      var t = function (sel) { var e = c.querySelector(sel); return e ? e.textContent : ''; };
      capTag.textContent = t('.rg-tag'); capTitle.textContent = t('.rg-title'); capText.textContent = t('.rg-text');
      capBtn.textContent = ctaText; capBtn.setAttribute('href', c.getAttribute('href') || '#');
      capBtn.setAttribute('aria-label', ctaText + ': ' + t('.rg-title'));
      G.fromTo(cap.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out', overwrite: true });
    };
    var render = function () {
      var pos = obj.pos, near = Math.round(pos);
      cards.forEach(function (c, i) {
        var p = place(i - pos), w = Math.max(0, 1 - p.abs * 1.6);
        var o = clamp(p.o, 0, 1);
        G.set(c, {
          xPercent: -50, yPercent: reflect ? -58 : -50,
          x: p.x, y: p.y, z: p.z,
          rotationY: p.ry + (tiltOn ? T.nx * 9 * w : 0), rotationX: tiltOn ? T.ny * -7 * w : 0, rotationZ: p.rz,
          scale: p.s,
          autoAlpha: o < 0.04 ? 0 : o,
          filter: p.abs < 0.17 ? 'none' : 'blur(' + Math.min(3, p.abs * 2 - 0.3).toFixed(2) + 'px)',
          zIndex: 100 - Math.round(p.abs * 10)
        });
        if (tiltOn && imgs[i]) G.set(imgs[i], { x: -T.nx * 10 * w, y: -T.ny * 7 * w, scale: 1 + 0.06 * w });
      });
      G.set(fill, { scaleX: n > 1 ? clamp(pos / (n - 1), 0, 1) : 1 });
      if (near !== active) {
        active = near;
        cards.forEach(function (c, i) { c.classList.toggle('is-active', i === near); });
        dotEls.forEach(function (d, i) { if (i === near) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
        if (cap) showCaption(cards[near]);
      }
    };

    // Mouse tilt
    var onMove, onLeave;
    if (tiltOn) {
      var aim = function (nx, ny) { G.to(T, { nx: nx, ny: ny, duration: 0.6, ease: 'power3.out', overwrite: 'auto', onUpdate: render }); };
      onMove = function (e) { var r = row.getBoundingClientRect(); aim(clamp((e.clientX - r.left - r.width / 2) / (r.width / 2), -1, 1), clamp((e.clientY - r.top - r.height / 2) / (r.height / 2), -1, 1)); };
      onLeave = function () { aim(0, 0); };
      sec.addEventListener('pointermove', onMove); sec.addEventListener('pointerleave', onLeave);
    }

    // Drag or swipe: free mode follows the finger and settles on a card; pinned mode moves one card per swipe
    var drag = null, suppress = false;
    var onDown = function (e) { if (e.button > 0) return; drag = { x: e.clientX, y: e.clientY, pos: obj.pos, on: false }; };
    var onDrag = function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (!drag.on) {
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(e.clientY - drag.y)) return;
        drag.on = true;
        try { row.setPointerCapture(e.pointerId); } catch (err) { /* not supported */ }
        row.classList.add('is-drag');
        if (!pinned) G.killTweensOf(obj);
      }
      if (!pinned) { obj.pos = clamp(drag.pos - dx / (W * 0.6), 0, n - 1); render(); }
    };
    var onUp = function (e) {
      var d = drag; drag = null;
      if (!d || !d.on) return;
      row.classList.remove('is-drag');
      suppress = true; setTimeout(function () { suppress = false; }, 60);
      var dx = e.clientX - d.x;
      if (pinned) { if (Math.abs(dx) > 50) go(Math.max(0, active) + (dx < 0 ? 1 : -1)); return; }
      var target = Math.round(d.pos - dx / (W * 0.6));
      if (target === Math.round(d.pos) && Math.abs(dx) > 40) target += dx < 0 ? 1 : -1;
      go(target);
    };
    var onSwallow = function (e) { if (suppress) { e.preventDefault(); e.stopPropagation(); } };
    row.addEventListener('pointerdown', onDown); row.addEventListener('pointermove', onDrag);
    row.addEventListener('pointerup', onUp); row.addEventListener('pointercancel', onUp);
    row.addEventListener('click', onSwallow, true);

    var cleanup = function () {
      if (onMove) { sec.removeEventListener('pointermove', onMove); sec.removeEventListener('pointerleave', onLeave); }
      row.removeEventListener('pointerdown', onDown); row.removeEventListener('pointermove', onDrag);
      row.removeEventListener('pointerup', onUp); row.removeEventListener('pointercancel', onUp);
      row.removeEventListener('click', onSwallow, true);
      G.killTweensOf(T); G.killTweensOf(obj);
      cards.forEach(function (c, i) { c.removeEventListener('click', onClick[i]); c.removeEventListener('focus', onFocus[i]); c.classList.remove('is-active'); G.set(c, { clearProps: 'all' }); if (imgs[i]) G.set(imgs[i], { clearProps: 'all' }); });
      extra.forEach(function (el) { el.remove(); });
      row.classList.remove('is-drag');
      sec.style.removeProperty('--rg-head');
      sec.classList.remove('is-ring', 'is-pin', 'rg-reflect', 'rg-below');
    };
    // A sticky header stays on screen, so the section pins just below it and is that much shorter
    var head = function () { var h = 0; document.querySelectorAll('.st').forEach(function (m) { if (m !== sec && m.querySelector('[data-sticky-flag]')) h = Math.max(h, m.offsetHeight); }); return h; };
    var setHead = function () { sec.style.setProperty('--rg-head', (pinned ? head() : 0) + 'px'); };
    setHead(); measure(); render();
    if (!pinned) return cleanup;

    var tw = G.to(obj, {
      pos: n - 1, ease: 'none', onUpdate: render,
      scrollTrigger: {
        trigger: sec, start: function () { return 'top ' + head(); }, end: function () { return '+=' + Math.round((n - 1) * window.innerHeight * 0.55); },
        pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true,
        snap: { snapTo: 1 / (n - 1), inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
        onRefresh: function () { setHead(); measure(); render(); }
      }
    });
    st = tw.scrollTrigger;
    return function () { st.kill(); tw.kill(); cleanup(); };
  }

  var mm = G.matchMedia();
  var run = function (pinned) {
    return function () {
      var made = [];
      document.querySelectorAll('.st [data-ring]').forEach(function (row) { var c = build(row, pinned); if (c) made.push(c); });
      return function () { made.forEach(function (f) { f(); }); };
    };
  };
  mm.add('(min-width: 900px)', run(!still && !!window.ScrollTrigger));
  mm.add('(max-width: 899px)', run(false));
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
