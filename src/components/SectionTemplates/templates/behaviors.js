/* Interactive behaviours shared by sections (billing toggle now; accordion, menu and tabs
   next). A template lists the ones it uses in `behaviors: ['billing']`; the page then gets
   one small script per behaviour plus the GSAP plugins it animates with.

   Rules (see __directions/roadmaps/TEMPLATES-ROADMAP.html → Motion & JS libraries):
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

BEHAVIORS.ring = {
  /* 3D scroll carousel. Markup: a [data-ring] row of card links with data-style (ring,
     coverflow, stack, arc), data-tilt, data-reflect (on/off), data-details (cards/below) and
     data-cta (button label). Base: a swipeable row with scroll-snap. With GSAP the cards are
     placed in perspective by the chosen style from one position value; the card at the front
     is .is-active, the others fade, shrink and blur. Two modes:
       pinned (900px+ with ScrollTrigger, not while editing): the section pins and scrolling
         moves the position (snapping to each card); a swipe or drag moves one card.
       free (phones, tablets, editing): no pinning; dragging or swiping moves the carousel
         with the finger or mouse and settles on a card; arrows and dots tween it.
     The front card tilts toward the mouse (mouse devices only). Arrows, dots, a click on a
     side card and focus on a card go to that card. With data-details="below" a caption with
     the card's tag, title, text and a button follows the front card. */
  plugins: [],
  js: `(function () {
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

BEHAVIORS.paginate = {
  /* Paging for a list of cards: [data-pager] holds [data-pager-items] (an ul of li cards, ALL in
     the HTML), a [data-pager-status] line and a [data-pager-nav]. Settings are data attributes
     (data-per, data-style numbers | more, data-label-*). Without JavaScript every card shows.
     With it, one page shows at a time with Previous / numbers / Next, or a show-more button. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.auth = {
  /* Login and register forms (form[data-auth]): show / hide password buttons ([data-pw-toggle]
     inside .au-pw), a strength hint ([data-pw-meter] with data-levels words) for the password
     field ([data-pw]), a matching check for [data-pw-confirm], and nothing is submitted from
     the editor previews. Without JavaScript the form is an ordinary POST. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.popup = {
  /* Popup & Promo Modal (popup-modal): opens by itself after a delay, on exit intent (the mouse leaving the top
     of the window) or after scrolling part of the page; closes with ×, Esc, the backdrop (centre only) or any
     [data-pu-close]. Settings are data attributes on [data-pu] (written by the template's
     finalize). It remembers that it was shown for data-days days (localStorage, safely wrapped).
     In the editors (ST_STILL / ST_PREVIEW) and in the Add a section preview (ST_POPUP_INLINE) it
     is shown inline as a normal card so its content can be edited and judged. An image carousel
     ([data-pu-carousel]: scroll-snap track, arrows, dots, optional autoplay) works with or without JS. */
  plugins: [],
  js: `(function () {
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
})();`,
};

BEHAVIORS.share = {
  /* Floating social share bar. Each [data-share] link holds a URL template ({url} {title}
     {text} {image} {via} {tags}); the real page address is filled in here, so the buttons
     share the page the visitor is on (or the address the editor entered). Also: copy link,
     and collapse / expand with a tab. */
  plugins: [],
  js: `(function () {
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
})();`,
};

/* ── Music sections (Music category) ───────────────────────────────────────────── */

BEHAVIORS.player = {
  /* Audio player. Markup: a [data-player] box holding a now-playing panel ([data-ap-*] parts) and a
     list of .ap-track items, each with a button (.ap-row), .ap-name, .ap-by, .ap-len, .ap-thumb and a
     data-src audio link. Plain HTML audio, no library. Only one player on a page plays at a time;
     a track that ends starts the next one. Tracks without a file only show their stream link. */
  plugins: [],
  js: `(function () {
  var current = null;
  var fmt = function (s) { if (!isFinite(s) || s < 0) s = 0; var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ':' + (r < 10 ? '0' : '') + r; };
  document.querySelectorAll('.st [data-player]').forEach(function (box) {
    var rows = Array.prototype.slice.call(box.querySelectorAll('.ap-track'));
    if (!rows.length) return;
    var q = function (a) { return box.querySelector('[' + a + ']'); };
    var cover = q('data-ap-cover'), title = q('data-ap-title'), meta = q('data-ap-meta'), cur = q('data-ap-cur'), dur = q('data-ap-dur');
    var seek = q('data-ap-seek'), play = q('data-ap-play'), prev = q('data-ap-prev'), next = q('data-ap-next'), msg = q('data-ap-msg');
    var audio = new Audio();
    audio.preload = 'none';
    var idx = -1, loaded = -1, tried = false;
    var setSeek = function (p) { seek.value = String(Math.round(p * 1000)); seek.style.setProperty('--p', (p * 100) + '%'); };
    var mark = function () {
      rows.forEach(function (r, i) { r.classList.toggle('is-current', i === idx); r.classList.toggle('is-playing', i === idx && !audio.paused); });
      box.classList.toggle('is-playing', !audio.paused);
      play.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
    };
    var show = function (i) {
      idx = i;
      var r = rows[i], img = r.querySelector('.ap-thumb'), by = r.querySelector('.ap-by'), len = r.querySelector('.ap-len');
      title.textContent = r.querySelector('.ap-name').textContent;
      meta.textContent = by ? by.textContent : '';
      if (img && img.getAttribute('src')) { cover.src = img.getAttribute('src'); cover.style.visibility = ''; } else { cover.removeAttribute('src'); cover.style.visibility = 'hidden'; }
      cur.textContent = '0:00'; dur.textContent = len && len.textContent ? len.textContent : '0:00'; setSeek(0);
      msg.textContent = r.getAttribute('data-src') ? '' : 'No audio file for this track yet. Use its stream link.';
      mark();
    };
    var select = function (i) {
      if (i === loaded) return;
      audio.pause();
      show(i);
      var src = rows[i].getAttribute('data-src') || '';
      if (src) audio.src = src; else audio.removeAttribute('src');
      audio.load();
      loaded = i;
    };
    var playAt = function (i) {
      select(i);
      if (!rows[i].getAttribute('data-src')) { mark(); return; }
      tried = true;
      if (current && current !== audio) current.pause();
      current = audio;
      var p = audio.play();
      if (p && p.catch) p.catch(function () { msg.textContent = 'This audio file could not be played.'; mark(); });
    };
    var go = function (t) { t = Math.max(0, Math.min(rows.length - 1, t)); if (!audio.paused) playAt(t); else select(t); };
    rows.forEach(function (r, i) {
      r.querySelector('[data-ap-row]').addEventListener('click', function () {
        if (i === idx && rows[i].getAttribute('data-src')) { if (audio.paused) playAt(i); else audio.pause(); } else playAt(i);
      });
    });
    play.addEventListener('click', function () { if (idx < 0) select(0); if (audio.paused) playAt(idx); else audio.pause(); });
    prev.addEventListener('click', function () { if (audio.currentTime > 3) audio.currentTime = 0; else go(idx - 1); });
    next.addEventListener('click', function () { go(idx + 1); });
    seek.addEventListener('input', function () { var p = seek.value / 1000; seek.style.setProperty('--p', (p * 100) + '%'); if (isFinite(audio.duration) && audio.duration > 0) audio.currentTime = p * audio.duration; });
    audio.addEventListener('play', mark); audio.addEventListener('pause', mark);
    audio.addEventListener('timeupdate', function () { cur.textContent = fmt(audio.currentTime); if (isFinite(audio.duration) && audio.duration > 0) setSeek(audio.currentTime / audio.duration); });
    audio.addEventListener('loadedmetadata', function () {
      dur.textContent = fmt(audio.duration);
      var len = rows[idx] && rows[idx].querySelector('.ap-len');
      if (len && isFinite(audio.duration)) len.textContent = fmt(audio.duration);
    });
    audio.addEventListener('ended', function () { if (idx < rows.length - 1) playAt(idx + 1); else { setSeek(0); cur.textContent = '0:00'; mark(); } });
    audio.addEventListener('error', function () { if (tried && audio.getAttribute('src')) { msg.textContent = 'This audio file could not be loaded.'; mark(); } });
    select(0);
  });
})();`,
};

BEHAVIORS.chips = {
  /* Filter chips built from the items' data-tag values. Markup: a [data-chips] list of items (each with
     data-tag) and a [data-chips-bar] container next to it. Without JavaScript the bar stays hidden and
     every item is shown. */
  plugins: [],
  js: `(function () {
  document.querySelectorAll('.st [data-chips]').forEach(function (grid) {
    var bar = grid.parentNode.querySelector('[data-chips-bar]');
    if (!bar) return;
    var items = Array.prototype.slice.call(grid.children), tags = [];
    items.forEach(function (it) { var t = (it.getAttribute('data-tag') || '').trim(); if (t && tags.indexOf(t) < 0) tags.push(t); });
    if (tags.length < 2) return;
    var all = bar.getAttribute('data-all') || 'All';
    bar.textContent = '';
    [''].concat(tags).forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'dg-chip'; b.textContent = t || all; b.setAttribute('aria-pressed', t ? 'false' : 'true');
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(bar.children, function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
        items.forEach(function (it) { it.hidden = !!t && (it.getAttribute('data-tag') || '').trim() !== t; });
      });
      bar.appendChild(b);
    });
    bar.hidden = false;
  });
})();`,
};

BEHAVIORS.countdown = {
  /* Countdown to a release date. Markup: [data-countdown] with data-at (date and time, visitor's local
     time), data-out (message) and data-cta-out (button text once it is out) and four [data-u] numbers
     (d, h, m, s). When the time passes the countdown hides, the [data-out] message shows and the main
     button [data-cta-main] changes its text. */
  plugins: [],
  js: `(function () {
  document.querySelectorAll('.st [data-countdown]').forEach(function (box) {
    var at = Date.parse(box.getAttribute('data-at') || '');
    if (isNaN(at)) return;
    var sec = box.closest('.st'), out = sec.querySelector('[data-out]'), main = sec.querySelector('[data-cta-main]'), cells = {}, timer;
    box.querySelectorAll('[data-u]').forEach(function (b) { cells[b.getAttribute('data-u')] = b; });
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var finish = function () {
      box.hidden = true;
      if (out) { out.textContent = box.getAttribute('data-out') || ''; out.hidden = !out.textContent; }
      var o = box.getAttribute('data-cta-out'), sp = main && main.querySelector('span');
      if (sp && o) sp.textContent = o;
    };
    var tick = function () {
      var ms = at - Date.now();
      if (ms <= 0) { finish(); clearInterval(timer); return; }
      var s = Math.floor(ms / 1000);
      cells.d.textContent = pad(Math.floor(s / 86400)); cells.h.textContent = pad(Math.floor(s % 86400 / 3600));
      cells.m.textContent = pad(Math.floor(s % 3600 / 60)); cells.s.textContent = pad(s % 60);
    };
    tick(); timer = setInterval(tick, 1000);
  });
})();`,
};

BEHAVIORS.a11y = {
  /* Accessibility Toolbar (accessibility-toolbar): a floating button opens a panel of display options the
     visitor switches on for themselves. Each option is a [data-feature] tile that steps through its
     levels (off, 1, 2 ...); the choice is applied to the whole page and, when data-remember is on, saved in
     localStorage (safely wrapped). Page-wide effects use attributes on <html> plus one injected <style>;
     the widget itself is always excluded (.a11y), and the filters (contrast, grayscale) are put on the
     page's other top-level blocks instead of <html>, so the fixed button and panel are never filtered.
     In the editors (ST_STILL / ST_PREVIEW / ST_POPUP_INLINE) the panel is shown inline as a card and the tiles
     only change their own state: nothing is applied to the page. */
  plugins: [],
  js: `(function () {
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
  ].join('\\n');
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

    root.querySelectorAll('[data-a11y-close]').forEach(function (b) { b.addEventListener('click', function (e) { if (inline && !btnMode) { e.preventDefault(); return; } close(true); }); });

    if (inline && !btnMode) {
      root.classList.add('is-preview');
      panel.hidden = false;
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
