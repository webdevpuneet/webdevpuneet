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
  var editing = window.ST_STILL || window.ST_PREVIEW;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st [data-pager]').forEach(function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-pager-items] > li'));
    var nav = root.querySelector('[data-pager-nav]');
    var status = root.querySelector('[data-pager-status]');
    var per = Math.max(1, parseInt(root.getAttribute('data-per'), 10) || 6);
    var style = root.getAttribute('data-style') || 'numbers';
    var tpl = root.getAttribute('data-label-status') || '';
    var total = items.length;
    var pages = Math.ceil(total / per);
    var say = function (from, to) {
      if (status) status.textContent = tpl ? tpl.replace('{from}', from).replace('{to}', to).replace('{total}', total) : '';
    };
    if (!nav || total <= per) { say(total ? 1 : 0, total); return; }
    nav.setAttribute('aria-label', root.getAttribute('data-label-nav') || 'Pagination');
    nav.hidden = false;
    var btn = function (cls, text, label) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = cls; b.textContent = text;
      if (label) b.setAttribute('aria-label', label);
      return b;
    };
    var page = 1, shown = per;
    var top = function () { if (!editing) root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); };

    function numbers(focus) {
      items.forEach(function (li, i) { li.hidden = !(i >= (page - 1) * per && i < page * per); });
      say((page - 1) * per + 1, Math.min(total, page * per));
      nav.textContent = '';
      var prev = btn('bg-pbtn', root.getAttribute('data-label-prev') || 'Previous');
      prev.disabled = page === 1;
      prev.addEventListener('click', function () { go(page - 1); });
      nav.appendChild(prev);
      var last = 0;
      for (var p = 1; p <= pages; p++) {
        if (p !== 1 && p !== pages && Math.abs(p - page) > 1) continue;
        if (last && p - last > 1) { var gap = document.createElement('span'); gap.className = 'bg-gap'; gap.setAttribute('aria-hidden', 'true'); gap.textContent = '…'; nav.appendChild(gap); }
        var n = btn('bg-pbtn', String(p), 'Page ' + p + ' of ' + pages);
        if (p === page) n.setAttribute('aria-current', 'page');
        (function (target) { n.addEventListener('click', function () { go(target); }); })(p);
        nav.appendChild(n);
        last = p;
      }
      var next = btn('bg-pbtn', root.getAttribute('data-label-next') || 'Next');
      next.disabled = page === pages;
      next.addEventListener('click', function () { go(page + 1); });
      nav.appendChild(next);
      if (focus) { var cur = nav.querySelector('[aria-current]'); if (cur) cur.focus({ preventScroll: true }); }
    }
    function go(p) { page = Math.min(pages, Math.max(1, p)); numbers(true); top(); }

    function more() {
      items.forEach(function (li, i) { li.hidden = i >= shown; });
      say(1, Math.min(total, shown));
      nav.textContent = '';
      if (shown < total) {
        var b = btn('bg-more', root.getAttribute('data-label-more') || 'Show more posts');
        b.addEventListener('click', function () {
          var first = shown;
          shown = Math.min(total, shown + per);
          more();
          var a = items[first] && items[first].querySelector('a[href]:not([tabindex="-1"])');
          if (a) a.focus({ preventScroll: true });
        });
        nav.appendChild(b);
      } else nav.hidden = true;
    }
    if (style === 'more') more(); else numbers(false);
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
