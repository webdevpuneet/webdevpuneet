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
  document.querySelectorAll('.st [data-svc]').forEach(function (root) {
    var box = root.querySelector('[data-svc-filters]');
    var rows = root.querySelectorAll('.sb-item');
    if (!box || !rows.length) return;
    var cats = [];
    Array.prototype.forEach.call(rows, function (r) {
      var c = (r.getAttribute('data-cat') || '').trim();
      if (c && cats.indexOf(c) < 0) cats.push(c);
    });
    if (cats.length < 2) { box.hidden = true; return; }
    box.hidden = false;
    var group = root.getAttribute('data-group');
    if (group) box.setAttribute('aria-label', group);
    var current = '';
    function make(label, value) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sb-chipbtn';
      b.textContent = label;
      b.setAttribute('data-value', value);
      b.setAttribute('aria-pressed', value === current ? 'true' : 'false');
      b.addEventListener('click', function () { apply(value); });
      return b;
    }
    function apply(value) {
      current = value;
      Array.prototype.forEach.call(rows, function (r) {
        r.hidden = !!value && (r.getAttribute('data-cat') || '').trim() !== value;
      });
      Array.prototype.forEach.call(box.children, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-value') === value ? 'true' : 'false');
      });
    }
    box.innerHTML = '';
    box.appendChild(make(root.getAttribute('data-all') || 'All', ''));
    cats.forEach(function (c) { box.appendChild(make(c, c)); });
    apply('');
  });
})();
(function () {
  var uid = 0;
  document.querySelectorAll('.st [data-qe]').forEach(function (root) {
    var services = Array.prototype.slice.call(root.querySelectorAll('.qe-opt:not(.qe-opt--car)'));
    var vehicles = Array.prototype.slice.call(root.querySelectorAll('.qe-opt--car'));
    var from = root.querySelector('.qe-from');
    var amount = root.querySelector('.qe-amount');
    var time = root.querySelector('.qe-time');
    if (!services.length || !vehicles.length || !amount) return;
    uid++;
    var sName = 'qe-service-' + uid, vName = 'qe-vehicle-' + uid;
    var sIdx = 0, vIdx = 0;
    function sync(list, idx) {
      list.forEach(function (el, i) {
        el.classList.toggle('is-on', i === idx);
        var input = el.querySelector('input');
        if (input) input.checked = i === idx;
      });
    }
    function update() {
      var s = services[sIdx], v = vehicles[vIdx];
      var size = (v.getAttribute('data-size') || 's').toLowerCase();
      var price = s.getAttribute('data-' + size) || s.getAttribute('data-s') || '';
      amount.textContent = price || '-';
      if (from) from.textContent = root.getAttribute('data-from') || '';
      var t = s.getAttribute('data-time') || '';
      if (time) time.textContent = t ? ((root.getAttribute('data-time') || '') + ' ' + t).trim() : '';
      sync(services, sIdx);
      sync(vehicles, vIdx);
    }
    services.forEach(function (el, i) {
      var input = el.querySelector('input');
      if (input) { input.name = sName; input.addEventListener('change', function () { sIdx = i; update(); }); }
    });
    vehicles.forEach(function (el, i) {
      var input = el.querySelector('input');
      if (input) { input.name = vName; input.addEventListener('change', function () { vIdx = i; update(); }); }
    });
    update();
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
  var KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  function mins(v) {
    var m = String(v || '').trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
    if (!m) return null;
    var h = +m[1], mi = +(m[2] || 0);
    if (m[3] === 'pm' && h < 12) h += 12;
    if (m[3] === 'am' && h === 12) h = 0;
    return h > 24 || mi > 59 ? null : h * 60 + mi;
  }
  function clock(total) {
    var h = Math.floor(total / 60) % 24, mi = total % 60;
    return (h < 10 ? '0' : '') + h + ':' + (mi < 10 ? '0' : '') + mi;
  }
  function nowIn(tz) {
    var o = { weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };
    if (tz) o.timeZone = tz;
    var parts;
    try { parts = new Intl.DateTimeFormat('en-GB', o).formatToParts(new Date()); }
    catch (e) { delete o.timeZone; parts = new Intl.DateTimeFormat('en-GB', o).formatToParts(new Date()); }
    var p = {};
    parts.forEach(function (x) { p[x.type] = x.value; });
    return { day: KEYS.indexOf(String(p.weekday).slice(0, 3).toLowerCase()), min: (parseInt(p.hour, 10) % 24) * 60 + parseInt(p.minute, 10) };
  }
  document.querySelectorAll('.st').forEach(function (sec) {
    var root = sec.querySelector('[data-opennow]');
    if (!root) return;
    var badge = root.querySelector('[data-open-badge]');
    var text = badge && badge.querySelector('.oh-badge-text');
    var rows = Array.prototype.map.call(root.querySelectorAll('[data-hours-row]'), function (r) {
      var d = KEYS.indexOf(String(r.getAttribute('data-day') || '').slice(0, 3).toLowerCase());
      var o = mins(r.getAttribute('data-open')), c = mins(r.getAttribute('data-close'));
      var label = r.querySelector('.oh-day');
      return { el: r, day: d, open: o, close: c, shut: r.getAttribute('data-closed') === 'closed' || o === null || c === null, name: label ? label.textContent : '' };
    });
    if (!rows.length) return;
    var tz = root.getAttribute('data-tz') || '';
    function attr(n, d) { return root.getAttribute(n) || d; }
    function update() {
      var n = nowIn(tz), prev = (n.day + 6) % 7, open = null;
      rows.forEach(function (r) {
        r.el.classList.toggle('is-today', r.day === n.day);
        if (r.day === n.day) r.el.setAttribute('aria-current', 'date'); else r.el.removeAttribute('aria-current');
        if (r.shut) return;
        var over = r.close <= r.open;
        if (r.day === n.day && n.min >= r.open && (over || n.min < r.close)) open = open || r;
        if (r.day === prev && over && n.min < r.close) open = open || r;
      });
      if (!badge || !text) return;
      badge.hidden = false;
      badge.classList.toggle('is-open', !!open);
      badge.classList.toggle('is-shut', !open);
      if (open) { text.textContent = attr('data-open-label', 'Open now') + ' \u00b7 ' + attr('data-closes-label', 'closes at') + ' ' + clock(open.close); return; }
      var next = null;
      for (var i = 0; i < 8 && !next; i++) {
        var dd = (n.day + i) % 7;
        rows.forEach(function (r) {
          if (r.shut || r.day !== dd || (i === 0 && r.open <= n.min)) return;
          if (!next || r.open < next.open) next = r;
        });
        if (next) next.when = i === 0 ? '' : next.name + ' ';
      }
      text.textContent = attr('data-shut-label', 'Closed now') + (next ? ' \u00b7 ' + attr('data-opens-label', 'opens') + ' ' + next.when + clock(next.open) : '');
    }
    update();
    setInterval(update, 60000);
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
