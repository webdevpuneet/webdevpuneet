/* Interactive behaviours shared by sections (billing toggle now; accordion, menu and tabs
   next). A template lists the ones it uses in `behaviors: ['billing']`; the page then gets
   one small script per behaviour plus the GSAP plugins it animates with.

   Rules (see TEMPLATES-ROADMAP.html → Motion & JS libraries):
   - Work without GSAP: the plain state change always happens; GSAP only animates it.
   - Skip animation for prefers-reduced-motion.
   - Scope everything to each `.st` section; never use ids.
   - Autonomous animations (counter, marquee) also stop when window.ST_STILL is set:
     static renders (previews, thumbnails, the editor while editing) set it, while
     interactions (billing, accordion, carousel, spotlight, magnetic) keep working. */

export const BEHAVIORS = {
  /* Monthly / yearly switch for pricing sections.
     Markup: buttons [data-billing="monthly|yearly"] with aria-pressed, one .st-bill-pill
     inside the active button, prices in .st-pm (monthly) and .st-py (yearly).
     The section gets .is-yearly; CSS shows the right prices. GSAP Flip slides the pill
     to the clicked button and the new prices roll in. */
  billing: {
    plugins: ['Flip'],
    js: `(function () {
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
})();`,
  },
};

BEHAVIORS.carousel = {
  /* Horizontal slider. Markup: a scrolling track [data-carousel] whose children are the
     slides, optional [data-carousel-prev] / [data-carousel-next] buttons.
     Base: native overflow scrolling with CSS scroll-snap (touch, trackpad, keyboard).
     With GSAP: mouse drag with momentum (Draggable + Inertia, snapping to slides) and
     eased arrow scrolling (ScrollToPlugin). Arrows disable at either end. */
  plugins: ['Draggable', 'InertiaPlugin', 'ScrollToPlugin'],
  js: `(function () {
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
})();`,
};

BEHAVIORS.marquee = {
  /* Endless scrolling rows. Markup: [data-marquee] tracks (add data-marquee="reverse" to
     run the other way). The script clones the items once (clones are aria-hidden) and
     loops the track by half its width; hovering or focusing a row slows it to a stop.
     Without GSAP or with reduced motion the row simply scrolls by hand. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.accordion = {
  /* Expanding questions. Markup: a [data-accordion] list of <details class="st-acc"> with a
     <summary> and an answer in .st-acc-a. Base: native details/summary (works without JS,
     find-in-page opens answers, all text stays in the HTML for search engines).
     With GSAP: answers open and close with a height tween. data-accordion="single" keeps
     one open at a time; add "first" to open the first question on load. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.spotlight = {
  /* A soft glow that follows the pointer. Elements with [data-spotlight] get the CSS
     variables --mx / --my (percent), eased with GSAP; CSS draws the glow with them
     (default 50% 50%, so it simply sits in the middle without JS or on touch screens). */
  plugins: [],
  js: `(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!G || reduce || !fine) return;
  document.querySelectorAll('.st [data-spotlight]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      G.to(el, { '--mx': ((e.clientX - r.left) / r.width * 100) + '%', '--my': ((e.clientY - r.top) / r.height * 100) + '%', duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    });
    el.addEventListener('pointerleave', function () {
      G.to(el, { '--mx': '50%', '--my': '50%', duration: 1, ease: 'power3.out', overwrite: 'auto' });
    });
  });
})();`,
};

BEHAVIORS.magnetic = {
  /* Buttons marked [data-magnetic] drift a little toward the pointer and spring back
     (GSAP quickTo). Desktop pointers only; off for reduced motion. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.counter = {
  /* Numbers that count up once when they scroll into view. Markup: [data-count] elements
     whose text is the final value, e.g. "12,000+", "$2.5M", "99.9%", "4.9/5". The first
     number is animated from 0 and its prefix, suffix, thousands commas and decimals are
     kept. The HTML always holds the final value (search engines, no JS, reduced motion). */
  plugins: [],
  js: `(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || reduce || window.ST_STILL) return;
  if (window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st [data-count]').forEach(function (el) {
    var host = el.closest('.st');
    if (host && /"count":true/.test(host.getAttribute('data-scroll') || '')) return; // counted by its scroll animation
    var text = el.textContent;
    var m = text.match(/\\d[\\d,]*(\\.\\d+)?/);
    if (!m) return;
    var raw = m[0];
    var dec = m[1] ? m[1].length - 1 : 0;
    var commas = raw.indexOf(',') > -1;
    var target = parseFloat(raw.replace(/,/g, ''));
    var pre = text.slice(0, m.index), post = text.slice(m.index + raw.length);
    var fmt = function (v) {
      var s = v.toFixed(dec);
      if (commas) { var p = s.split('.'); p[0] = p[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ','); s = p.join('.'); }
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
})();`,
};

BEHAVIORS.menu = {
  /* Navigation bars.
     Mobile menu: a [data-menu-toggle] button (aria-expanded) opens the [data-menu] panel.
     The script adds .has-menu to the section (CSS only hides the panel on small widths
     once JS is running, so without JS the links simply show). Open/close animate with
     GSAP; [data-menu-item] children stagger in. Esc closes and returns focus to the
     button, Tab is kept inside the open menu, clicking outside or on a link closes it.
     Sticky header: a [data-sticky-flag] element (switched by a toggle) makes the section
     sticky via CSS; .is-scrolled is added after 8px. With [data-hide-flag] too, the bar
     slides away on scroll down and comes back on scroll up.
     Dismiss: [data-dismiss] collapses its closest [data-dismissable] (announcement bars). */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.totop = {
  /* "Back to top" links: [data-totop] scrolls smoothly to the top with GSAP ScrollToPlugin
     (native smooth scrolling without it, an instant jump for reduced motion). The link's
     href="#" means it still works without JavaScript. */
  plugins: ['ScrollToPlugin'],
  js: `(function () {
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
})();`,
};

BEHAVIORS.form = {
  /* Contact forms. Markup: <form data-form> with an action URL (Formspree, Basin,
     Getform or your own endpoint), a [data-form-success] message and a [data-form-error]
     message (both hidden). With JavaScript the form is sent with fetch (Accept: JSON);
     on success the fields fade out and the success message animates in, on failure the
     error message shows. Without JavaScript it is a normal form post. In the editor
     preview (window.ST_PREVIEW) nothing is sent: success is simulated. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.hoverpreview = {
  /* Editorial lists: hovering a [data-preview] row shows its image ([data-preview-img]
     inside the row) in a floating card that follows the cursor (GSAP quickTo). Desktop
     pointers only; the image stays hidden (and the list stays a plain list) otherwise. */
  plugins: [],
  js: `(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!G || reduce || !fine) return;
  document.querySelectorAll('.st').forEach(function (sec) {
    var rows = sec.querySelectorAll('[data-preview]');
    if (!rows.length) return;
    var card = document.createElement('div');
    card.className = 'st-hover-card';
    card.setAttribute('aria-hidden', 'true');
    sec.appendChild(card);
    G.set(card, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
    var x = G.quickTo(card, 'x', { duration: 0.45, ease: 'power3.out' });
    var y = G.quickTo(card, 'y', { duration: 0.45, ease: 'power3.out' });
    sec.addEventListener('pointermove', function (e) { var r = sec.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); });
    Array.prototype.forEach.call(rows, function (row) {
      var img = row.querySelector('[data-preview-img]');
      row.addEventListener('pointerenter', function () {
        if (!img || !img.getAttribute('src')) return;
        card.style.backgroundImage = 'url("' + img.getAttribute('src').replace(/"/g, '%22') + '")';
        G.to(card, { opacity: 1, scale: 1, rotate: -4, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
      });
      row.addEventListener('pointerleave', function () { G.to(card, { opacity: 0, scale: 0.6, rotate: 0, duration: 0.3, ease: 'power2.in', overwrite: 'auto' }); });
    });
  });
})();`,
};

/** GSAP plugins a template's behaviours need */
/* ── Scroll experiences (Scroll effects category) ─────────────────────────────────
   All three are layouts first: without JavaScript, with reduced motion, while editing
   (window.ST_STILL) and on small screens they show a plain, complete layout. With GSAP +
   ScrollTrigger on larger screens the section pins and scrolling drives the motion.
   The Website Builder's page preview scrolls like a real page, so it sets
   window.ST_SCROLL_FX to keep these running there while editing (the section editor's
   preview grows to full height and never scrolls, so it stays still). */

BEHAVIORS.hscroll = {
  /* Horizontal scroll gallery. Markup: a [data-hscroll] row inside the section.
     Base: a swipeable row with scroll-snap. With GSAP (768px+): the section pins and the
     row slides left as the page scrolls down, for as long as the row is wide. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.story = {
  /* Pinned scroll story. Markup: [data-story] holding [data-story-step] items, each with an
     image ([data-story-img]) and text. Base: each step shows its own image above its text.
     With GSAP (900px+): the images move into one stage beside the steps; the stage pins
     while the steps scroll past, and the image of the step in the middle of the screen
     fades in. The active step is marked .is-active. */
  plugins: [],
  js: `(function () {
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || !window.ScrollTrigger || reduce || (window.ST_STILL && !window.ST_SCROLL_FX)) return;
  G.registerPlugin(ScrollTrigger);
  G.matchMedia().add('(min-width: 900px)', function () {
    var made = [];
    document.querySelectorAll('.st [data-story]').forEach(function (story) {
      var steps = Array.prototype.slice.call(story.querySelectorAll('[data-story-step]'));
      if (!steps.length) return;
      var stage = document.createElement('div');
      stage.className = 'ps-stage';
      stage.setAttribute('aria-hidden', 'true');
      var imgs = steps.map(function (s) { var i = s.querySelector('[data-story-img]'); var c = i ? i.cloneNode(true) : document.createElement('div'); stage.appendChild(c); return c; });
      story.appendChild(stage);
      story.classList.add('is-story');
      G.set(imgs, { autoAlpha: 0 }); G.set(imgs[0], { autoAlpha: 1 });
      var show = function (n) {
        steps.forEach(function (s, i) { s.classList.toggle('is-active', i === n); });
        imgs.forEach(function (im, i) { G.to(im, { autoAlpha: i === n ? 1 : 0, scale: i === n ? 1 : 1.04, duration: 0.5, overwrite: true }); });
      };
      show(0);
      var pin = ScrollTrigger.create({ trigger: story, start: 'top 12%', end: 'bottom 88%', pin: stage, pinSpacing: false });
      var ts = steps.map(function (s, i) { return ScrollTrigger.create({ trigger: s, start: 'top 55%', end: 'bottom 55%', onToggle: function (e) { if (e.isActive) show(i); } }); });
      made.push(function () { pin.kill(); ts.forEach(function (t) { t.kill(); }); stage.remove(); story.classList.remove('is-story'); steps.forEach(function (s) { s.classList.remove('is-active'); }); });
    });
    return function () { made.forEach(function (f) { f(); }); };
  });
})();`,
};

BEHAVIORS.stack = {
  /* Stacking cards. Markup: a [data-stack] list of cards. Base: a normal column of cards.
     With GSAP (768px+): each card pins a little below the one before, so later cards slide
     over earlier ones, which shrink and dim as they are covered. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.drawpath = {
  /* SVG line drawn by scrolling. Markup: [data-drawpath] holding <path data-draw> elements
     and [data-draw-step] items. Base: the line is fully drawn and every step is shown. With
     GSAP: the box gets .is-drawing, each path's stroke is dashed to its own length and
     scrubbed from hidden to drawn while the box crosses the screen, and each step gets
     .is-on as the line reaches it. No plugin needed (stroke-dashoffset). */
  plugins: [],
  js: `(function () {
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || !window.ScrollTrigger || reduce || (window.ST_STILL && !window.ST_SCROLL_FX)) return;
  G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st [data-drawpath]').forEach(function (box) {
    box.classList.add('is-drawing');
    box.querySelectorAll('[data-draw]').forEach(function (p) {
      var len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      G.set(p, { strokeDasharray: len, strokeDashoffset: len });
      G.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: box, start: 'top 65%', end: 'bottom 65%', scrub: 0.5 } });
    });
    box.querySelectorAll('[data-draw-step]').forEach(function (step) {
      // Stays lit once reached (only scrolling back up above it turns it off)
      ScrollTrigger.create({ trigger: step, start: 'top 65%', onEnter: function () { step.classList.add('is-on'); }, onLeaveBack: function () { step.classList.remove('is-on'); } });
    });
  });
})();`,
};

BEHAVIORS.gallery = {
  /* Filterable image gallery with a lightbox. Markup: [data-gallery] holding .gg-item figures
     (each with data-tag and an <img>), an optional [data-gallery-filters] bar (data-all = the
     label of the "show all" button). Base: every image is shown, nothing needs JavaScript.
     With JavaScript: filter buttons are built from the items' tags and hide the others, and
     each image opens in a full-screen viewer (Esc closes, arrow keys move, focus is kept).
     Both stay off in the editor and its previews (window.ST_STILL / window.ST_PREVIEW), where
     clicking an image edits it. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.video = {
  /* Click-to-play video with no third-party requests until the visitor presses play.
     Markup: [data-video-box] holding a poster image and an <a class="vs-play" data-video="URL">.
     Base: the play button is a normal link to the video. With JavaScript the click swaps the
     poster for a YouTube or Vimeo player (privacy mode / do-not-track embeds) or a native
     <video> for .mp4 / .webm / .ogg files. Stays off in the editor and its previews. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.compare = {
  /* Before / after slider. Markup: [data-compare] holding the "after" image, the "before" image
     (clipped by --pos) and a range input .ba-range. Base: a fixed 50% split, so both photos are
     visible without JavaScript. With JavaScript the range input (mouse, touch and arrow keys)
     moves the divider. In the editor and its previews the input is switched off, so clicking an
     image edits it. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.toc = {
  /* Table of contents for long text pages. Markup: [data-toc] holding an <ol data-toc-list>,
     and a [data-toc-source] holding the sections, each with an <h2>. The script gives every
     h2's section an id (made from the heading), fills the list with links and, outside the
     editor, marks the section being read. Without JavaScript the contents box stays hidden
     and the page reads as plain numbered sections. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.booking = {
  /* Booking request forms: the date picker cannot be set to a day in the past. Markup:
     <input type="date" data-booking-date>. Works alongside the form behaviour. */
  plugins: [],
  js: `(function () {
  var d = new Date();
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var today = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  document.querySelectorAll('.st [data-booking-date]').forEach(function (input) { input.min = today; });
})();`,
};

export const behaviorPlugins = t => [...new Set((t.behaviors || []).flatMap(b => BEHAVIORS[b]?.plugins || []))];
/** The behaviours' scripts for a template ('' when it has none) */
export const behaviorScript = t => (t.behaviors || []).map(b => BEHAVIORS[b]?.js).filter(Boolean).join('\n');

/* Shared markup and CSS for the billing switch, used by every pricing section.
   Fields it reads: billMonthly, billYearly, billSave (optional); toggle: showBilling. */
export const BILLING_HTML = `<div class="st-billing" data-anim="item" data-show="showBilling" role="group" aria-label="Billing period">
      <button type="button" class="st-bill-btn" data-billing="monthly" aria-pressed="true"><span class="st-bill-pill" aria-hidden="true"></span><span data-edit="billMonthly"></span></button>
      <button type="button" class="st-bill-btn" data-billing="yearly" aria-pressed="false"><span data-edit="billYearly"></span><span class="st-save" data-show-if="billSave" data-edit="billSave"></span></button>
    </div>`;

export const BILLING_CSS = `.st-billing{display:inline-flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:color-mix(in srgb,var(--st-text) 7%,transparent);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.st-bill-btn{position:relative;z-index:0;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 18px;border:0;border-radius:999px;background:none;color:var(--st-muted);font:700 14.5px/1 var(--st-font-body);cursor:pointer;transition:color .2s ease}
.st-bill-btn[aria-pressed="true"]{color:var(--st-btn-text)}
.st-bill-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px}
.st-bill-pill{position:absolute;inset:0;z-index:-1;border-radius:999px;background:var(--st-brand);box-shadow:0 6px 16px -6px color-mix(in srgb,var(--st-brand) 70%,transparent)}
.st-save{padding:3px 8px;border-radius:999px;background:color-mix(in srgb,#16a34a 16%,transparent);color:#15803d;font-size:12px;font-weight:800}
.st-bill-btn[aria-pressed="true"] .st-save{background:color-mix(in srgb,var(--st-btn-text) 22%,transparent);color:inherit}
.st-pm,.st-py{display:inline-flex;align-items:baseline;flex-wrap:wrap;gap:6px}
.st-py,.st.is-yearly .st-pm{display:none}
.st.is-yearly .st-py{display:inline-flex}`;

/* Fields every pricing section has for the switch and price labels */
export const billingFields = (group = 'billing') => [
  { key: 'billMonthly', group, label: 'Monthly label', type: 'text', value: 'Monthly' },
  { key: 'billYearly', group, label: 'Yearly label', type: 'text', value: 'Yearly' },
  { key: 'billSave', group, label: 'Yearly saving badge (optional)', type: 'text', value: 'Save 20%' },
  { key: 'perMonth', group, label: 'Price suffix (monthly)', type: 'text', value: '/month' },
  { key: 'perYear', group, label: 'Price suffix (yearly)', type: 'text', value: '/month, billed yearly' },
];
