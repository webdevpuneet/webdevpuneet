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
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || reduce || window.ST_STILL) return;
  document.querySelectorAll('.st [data-marquee]').forEach(function (track) {
    var items = Array.prototype.slice.call(track.children);
    if (!items.length) return;
    items.forEach(function (el) {
      var c = el.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.querySelectorAll('a, button').forEach(function (a) { a.setAttribute('tabindex', '-1'); });
      track.appendChild(c);
    });
    track.parentElement.classList.add('is-looping');
    var rev = track.getAttribute('data-marquee') === 'reverse';
    var speed = parseFloat(track.getAttribute('data-speed')) || 40; // pixels per second
    var tween = G.fromTo(track, { xPercent: rev ? -50 : 0 }, { xPercent: rev ? 0 : -50, ease: 'none', repeat: -1, duration: (track.scrollWidth / 2) / speed });
    var slow = function (to) { G.to(tween, { timeScale: to, duration: 0.6, ease: 'power2.out', overwrite: true }); };
    var row = track.parentElement;
    row.addEventListener('mouseenter', function () { slow(0); });
    row.addEventListener('mouseleave', function () { slow(1); });
    row.addEventListener('focusin', function () { slow(0); });
    row.addEventListener('focusout', function () { slow(1); });
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
  var editing = window.ST_STILL || window.ST_PREVIEW;
  document.querySelectorAll('.st form[data-auth]').forEach(function (form) {
    var pw = form.querySelector('[data-pw]');
    var cf = form.querySelector('[data-pw-confirm]');
    form.querySelectorAll('[data-pw-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrap = btn.closest('.au-pw');
        var input = wrap && wrap.querySelector('input');
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.setAttribute('aria-pressed', show ? 'true' : 'false');
        btn.classList.toggle('is-on', show);
      });
    });
    if (pw && cf) {
      var same = function () { cf.setCustomValidity(cf.value && cf.value !== pw.value ? (cf.getAttribute('data-mismatch') || 'Passwords do not match') : ''); };
      pw.addEventListener('input', same);
      cf.addEventListener('input', same);
    }
    var meter = form.querySelector('[data-pw-meter]');
    if (pw && meter) {
      var words = (meter.getAttribute('data-levels') || 'Weak,Fair,Good,Strong').split(',');
      var text = meter.querySelector('.au-meter-text');
      pw.addEventListener('input', function () {
        var v = pw.value, s = 0;
        if (v.length >= 8) s++;
        if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
        if (/[0-9]/.test(v)) s++;
        if (/[^A-Za-z0-9]/.test(v) || v.length >= 14) s++;
        var level = v ? Math.max(1, s) : 0;
        meter.setAttribute('data-level', String(level));
        if (text) text.textContent = level ? (words[level - 1] || '') : '';
      });
    }
    form.addEventListener('submit', function (e) { if (editing) e.preventDefault(); });
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
