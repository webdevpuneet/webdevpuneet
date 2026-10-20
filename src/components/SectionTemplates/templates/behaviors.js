/* Interactive behaviours shared by sections (billing toggle now; accordion, menu and tabs
   next). A template lists the ones it uses in `behaviors: ['billing']`; the page then gets
   one small script per behaviour plus the GSAP plugins it animates with.

   Rules (see TEMPLATES-ROADMAP.html → Motion & JS libraries):
   - Work without GSAP: the plain state change always happens; GSAP only animates it.
   - Skip animation for prefers-reduced-motion.
   - Scope everything to each `.st` section; never use ids. */

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
  if (!G || reduce) return;
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

/** GSAP plugins a template's behaviours need */
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
