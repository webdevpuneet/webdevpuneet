/* Scroll animations for sections on a page (roadmap Phase 3b): scroll-driven GSAP timelines
   designed without code, on top of the entrance presets.

   A page section may carry
     scroll: { preset, start, mode, pin, pinLength, tracks: [{ target, stagger, keys: [{ at, ease, ...props }] }] }
   preset     the effect it started from (SCROLL_PRESETS); tracks are what actually runs
   start      when the animation starts: ScrollTrigger "start" (SCROLL_STARTS)
   mode       'scrub' (follows the scroll bar) | 'once' (plays once) | 'reverse' (plays, reverses on the way back)
   pin        hold the section in place while it animates, for pinLength % of the screen height
   desktopOnly  off on screens narrower than 768px (the section shows as designed there)
   tracks     per target, keyframes on a 0–100% progress line; each key may set x, y, xPercent,
              yPercent, scale, rotate, opacity, blur (px) and clip (inset("…") values), and the
              ease into the next key
   Targets are roles every section already has: the section itself, its heading, its items
   ([data-anim="item"]), its media ([data-anim="media"]) and its background photo ([data-bg]).

   It renders as data-scroll='{json}' on the <section>; one generic runtime (SCROLL_RUNTIME)
   turns that into a ScrollTrigger timeline. Content is static without JavaScript, and the
   runtime does nothing for people who prefer reduced motion. Sections with a scroll
   animation skip the entrance animation. */

export const SCROLL_TARGETS = [
  { id: 'section', label: 'Whole section' },
  { id: 'heading', label: 'Heading' },
  { id: 'items', label: 'Text & buttons' },
  { id: 'media', label: 'Image / media' },
  { id: 'background', label: 'Background photo' },
  { id: 'numbers', label: 'Numbers' },          // [data-count] stats (count with the scroll)
  { id: 'el', label: 'Picked element' },        // one element (or all like it) clicked in the preview
];
/* count: how far a number has counted, 0 (zero) to 1 (its real value); numbers tracks only */
export const SCROLL_PROPS = ['x', 'y', 'xPercent', 'yPercent', 'scale', 'rotate', 'opacity', 'blur', 'clip', 'count'];
const SEL = /^\.[A-Za-z_][\w-]{0,60}$/; // a picked element: one class, matched inside the section
export const SCROLL_STARTS = [
  ['top bottom', 'As soon as it shows'],
  ['top 85%', 'Entering the screen'],
  ['top 60%', 'Near the middle'],
  ['top top', 'At the top'],
];
export const SCROLL_MODES = [['scrub', 'Follow scroll'], ['once', 'Play once'], ['reverse', 'Play & reverse']];
export const SCROLL_PIN_LENGTHS = [['50', 'Short'], ['100', 'Medium'], ['200', 'Long']];
export const SCROLL_EASES = ['none', 'power1.out', 'power2.out', 'power3.out', 'power2.inOut', 'back.out(1.6)', 'expo.out', 'sine.inOut'];

const k = (at, props = {}, ease) => ({ at, ...props, ...(ease ? { ease } : {}) });

/* Effect presets: each sets the timing and creates editable tracks */
export const SCROLL_PRESETS = [
  { id: 'rise', label: 'Rise into view', note: 'Text and media rise and fade in as you scroll.', start: 'top 85%', end: 'top 35%', mode: 'scrub', tracks: [
    { target: 'items', stagger: 0.08, keys: [k(0, { y: 60, opacity: 0 }), k(100, { y: 0, opacity: 1 })] },
    { target: 'media', keys: [k(0, { y: 90, scale: 0.92, opacity: 0 }), k(100, { y: 0, scale: 1, opacity: 1 })] },
  ] },
  { id: 'parallax-media', label: 'Parallax image', note: 'The image drifts against the scroll.', start: 'top bottom', end: 'bottom top', mode: 'scrub', tracks: [
    { target: 'media', keys: [k(0, { yPercent: 14 }), k(100, { yPercent: -14 })] },
    { target: 'background', keys: [k(0, { yPercent: -8, scale: 1.2 }), k(100, { yPercent: 8, scale: 1.2 })] },
  ] },
  { id: 'zoom-media', label: 'Zoom image in', note: 'The image grows to full size as it scrolls in.', start: 'top 90%', end: 'top 25%', mode: 'scrub', tracks: [
    { target: 'media', keys: [k(0, { scale: 0.75, opacity: 0.3, rotate: -3 }), k(100, { scale: 1, opacity: 1, rotate: 0 })] },
  ] },
  { id: 'pin-zoom', label: 'Pinned zoom', note: 'The section holds still while the image zooms and the text fades.', start: 'top top', mode: 'scrub', pin: true, pinLength: '100', tracks: [
    { target: 'media', keys: [k(0, { scale: 1 }), k(100, { scale: 1.35 })] },
    { target: 'items', stagger: 0.04, keys: [k(0, { opacity: 1, y: 0 }), k(60, { opacity: 1, y: 0 }), k(100, { opacity: 0, y: -40 })] },
  ] },
  { id: 'heading-wipe', label: 'Headline wipe', note: 'The headline is revealed left to right, then the rest follows.', start: 'top 85%', end: 'top 30%', mode: 'scrub', tracks: [
    { target: 'heading', keys: [k(0, { clip: '0% 100% 0% 0%' }), k(60, { clip: '0% 0% 0% 0%' })] },
    { target: 'items', stagger: 0.05, keys: [k(30, { opacity: 0, y: 30 }), k(100, { opacity: 1, y: 0 })] },
  ] },
  { id: 'blur-in', label: 'Blur in', note: 'Everything comes into focus as it scrolls in.', start: 'top 90%', end: 'top 40%', mode: 'scrub', tracks: [
    { target: 'items', stagger: 0.06, keys: [k(0, { blur: 14, opacity: 0 }), k(100, { blur: 0, opacity: 1 })] },
    { target: 'media', keys: [k(0, { blur: 20, opacity: 0, scale: 1.06 }), k(100, { blur: 0, opacity: 1, scale: 1 })] },
  ] },
  { id: 'pop', label: 'Pop in', note: 'Cards and text pop in one after another, once.', start: 'top 80%', mode: 'once', tracks: [
    { target: 'items', stagger: 0.07, keys: [k(0, { scale: 0.8, opacity: 0, y: 20 }, 'back.out(1.6)'), k(100, { scale: 1, opacity: 1, y: 0 })] },
    { target: 'media', keys: [k(0, { scale: 0.85, opacity: 0 }, 'back.out(1.4)'), k(100, { scale: 1, opacity: 1 })] },
  ] },
  { id: 'counters', label: 'Count up with scroll', note: 'Numbers count up as you scroll and down again on the way back (stats sections).', start: 'top 85%', end: 'top 25%', mode: 'scrub', needs: 'numbers', tracks: [
    { target: 'numbers', keys: [k(0, { count: 0 }), k(100, { count: 1 })] },
    { target: 'items', stagger: 0.05, keys: [k(0, { opacity: 0, y: 30 }), k(40, { opacity: 1, y: 0 })] },
  ] },
  { id: 'sticky-media', label: 'Sticky image', note: 'The image stays in place while the text scrolls past it (split layouts).', start: 'top top', mode: 'scrub', stickMedia: true, needs: 'media', tracks: [
    { target: 'items', stagger: 0.1, keys: [k(0, { opacity: 0.25 }), k(30, { opacity: 1 })] },
  ] },
  { id: 'story', label: 'Step-by-step story', note: 'The section pins and its parts appear one at a time as you scroll.', start: 'top top', mode: 'scrub', pin: true, pinLength: '200', tracks: [
    { target: 'items', stagger: 0.6, keys: [k(0, { opacity: 0, y: 50 }), k(100, { opacity: 1, y: 0 })] },
    { target: 'media', keys: [k(0, { opacity: 0, scale: 0.9 }), k(100, { opacity: 1, scale: 1 })] },
  ] },
  { id: 'fade-out', label: 'Fade out on leave', note: 'The section shrinks and fades as it scrolls away.', start: 'bottom 75%', end: 'bottom top', mode: 'scrub', tracks: [
    { target: 'section', keys: [k(0, { opacity: 1, scale: 1 }), k(100, { opacity: 0.15, scale: 0.94 })] },
  ] },
];
export const scrollPresetById = id => SCROLL_PRESETS.find(p => p.id === id);

/** A scroll animation started from a preset (or null for none) */
export function scrollFromPreset(id) {
  const p = scrollPresetById(id);
  if (!p) return null;
  return cleanScroll({ preset: p.id, start: p.start, end: p.end, mode: p.mode, pin: !!p.pin, pinLength: p.pinLength || '100', stickMedia: !!p.stickMedia, tracks: p.tracks });
}

const num = (v, min, max) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : undefined; };
const LIMITS = { x: [-2000, 2000], y: [-2000, 2000], xPercent: [-300, 300], yPercent: [-300, 300], scale: [0, 5], rotate: [-720, 720], opacity: [0, 1], blur: [0, 60], count: [0, 1] };
const UID = /^[\w-]{1,40}$/;
const CLIP = /^-?\d{1,3}(\.\d+)?%?( -?\d{1,3}(\.\d+)?%?){3}$/; // inset() values, e.g. "0 100% 0 0"
const START = /^(top|center|bottom) (top|center|bottom|\d{1,3}%)$/;

function cleanKey(key) {
  const out = { at: num(key?.at, 0, 100) ?? 0 };
  for (const p of SCROLL_PROPS) {
    if (key?.[p] === undefined) continue;
    if (p === 'clip') { if (CLIP.test(String(key.clip))) out.clip = String(key.clip); continue; }
    const v = num(key[p], ...LIMITS[p]);
    if (v !== undefined) out[p] = v;
  }
  if (SCROLL_EASES.includes(key?.ease)) out.ease = key.ease;
  return out;
}

/** A saved scroll animation made safe (only known targets, props, eases and positions), or
    undefined when it has no usable track */
export function cleanScroll(sc) {
  if (!sc || typeof sc !== 'object') return undefined;
  const tracks = (Array.isArray(sc.tracks) ? sc.tracks : []).slice(0, 8).map(t => {
    if (!SCROLL_TARGETS.some(x => x.id === t?.target)) return null;
    if (t.target === 'el' && !SEL.test(String(t.sel))) return null;
    const keys = (Array.isArray(t.keys) ? t.keys : []).slice(0, 12).map(cleanKey).sort((a, b) => a.at - b.at);
    if (keys.length < 2) return null;
    const stagger = num(t.stagger, 0, 1);
    const count = t.target === 'numbers' || (t.target === 'el' && !!t.count);
    return {
      target: t.target,
      ...(t.target === 'el' ? { sel: t.sel, i: Math.round(num(t.i, -1, 99) ?? -1) } : {}),
      ...(count ? { count: true } : {}),
      ...(stagger ? { stagger } : {}),
      keys,
    };
  }).filter(Boolean);
  const stickMedia = !!sc.stickMedia; // the media column stays put while the text scrolls past
  if (!tracks.length && !stickMedia) return undefined;
  const mode = SCROLL_MODES.some(([v]) => v === sc.mode) ? sc.mode : 'scrub';
  return {
    ...(scrollPresetById(sc.preset) ? { preset: sc.preset } : {}),
    start: START.test(String(sc.start)) ? String(sc.start) : 'top 85%',
    ...(START.test(String(sc.end)) ? { end: String(sc.end) } : {}),
    mode,
    pin: !!sc.pin,
    pinLength: SCROLL_PIN_LENGTHS.some(([v]) => v === String(sc.pinLength)) ? String(sc.pinLength) : '100',
    ...(sc.desktopOnly ? { desktopOnly: true } : {}), // off below 768px wide (the section shows as designed)
    ...(stickMedia ? { stickMedia: true } : {}),
    // Spanning sections: the animation lasts until the end of a later section (its uid); with
    // a pin, overlap lets the following sections scroll over the pinned one
    ...(UID.test(String(sc.until || '')) ? { until: String(sc.until), ...(sc.overlap ? { overlap: true } : {}) } : {}),
    tracks,
  };
}

/* ── Editing (keyframe editor in the Website Builder) ──────────────────────────────
   Pure helpers: each returns a new, sanitised scroll animation. Any edit makes it Custom. */

/** Editable properties, in the order the keyframe editor shows them */
export const KEY_FIELDS = [
  { prop: 'x', label: 'Move X', unit: 'px', step: 10 },
  { prop: 'y', label: 'Move Y', unit: 'px', step: 10 },
  { prop: 'xPercent', label: 'Move X', unit: '%', step: 5 },
  { prop: 'yPercent', label: 'Move Y', unit: '%', step: 5 },
  { prop: 'scale', label: 'Scale', unit: '×', step: 0.05 },
  { prop: 'rotate', label: 'Rotate', unit: '°', step: 5 },
  { prop: 'opacity', label: 'Opacity', unit: '0–1', step: 0.1 },
  { prop: 'blur', label: 'Blur', unit: 'px', step: 2 },
];
/** Reveal (clip-path inset) choices: always four % values so any two interpolate */
export const REVEALS = [
  ['', 'No reveal'],
  ['0% 0% 0% 0%', 'Fully shown'],
  ['0% 100% 0% 0%', 'Hidden (wipe from left)'],
  ['0% 0% 0% 100%', 'Hidden (wipe from right)'],
  ['100% 0% 0% 0%', 'Hidden (wipe from bottom)'],
  ['0% 0% 100% 0%', 'Hidden (wipe from top)'],
  ['0% 50% 0% 50%', 'Hidden (open from centre)'],
];

const edit = (sc, fn) => { const next = JSON.parse(JSON.stringify(sc)); delete next.preset; fn(next); return cleanScroll(next) || sc; };

/** Add a track for a target with two keys: numbers count up, anything else fades and rises in.
    extra = { sel, i } for a picked element */
export const addTrack = (sc, target, extra = {}) => edit(sc, n => {
  const counting = target === 'numbers';
  n.tracks.push({ target, ...extra, keys: counting ? [{ at: 0, count: 0 }, { at: 100, count: 1 }] : [{ at: 0, opacity: 0, y: 40 }, { at: 100, opacity: 1, y: 0 }] });
});
/** Plain label for a track's target ("Picked: .sh-title (2nd)") */
export function trackLabel(t) {
  if (t.target !== 'el') return SCROLL_TARGETS.find(x => x.id === t.target)?.label || t.target;
  const nth = n => `${n}${['th', 'st', 'nd', 'rd'][(n % 100 > 10 && n % 100 < 14) || n % 10 > 3 ? 0 : n % 10]}`;
  return `Picked ${t.sel}${t.i >= 0 ? ` (${nth(t.i + 1)})` : ' (all)'}`;
}
/** Remove a track (the last one removes the animation: returns null) */
export const removeTrack = (sc, ti) => (sc.tracks.length < 2 ? null : edit(sc, n => { n.tracks.splice(ti, 1); }));
/** Change a track's target or stagger */
export const setTrack = (sc, ti, patch) => edit(sc, n => { Object.assign(n.tracks[ti], patch); if (!patch.stagger && 'stagger' in patch) delete n.tracks[ti].stagger; });
/** Add a key in the middle of the track's largest gap, copying the key before it; returns
    { scroll, key } with the new key's index */
export function addKey(sc, ti) {
  const keys = sc.tracks[ti].keys;
  let gap = 0, at = 50, from = 0;
  for (let i = 0; i < keys.length - 1; i++) if (keys[i + 1].at - keys[i].at > gap) { gap = keys[i + 1].at - keys[i].at; at = Math.round((keys[i].at + keys[i + 1].at) / 2); from = i; }
  const scroll = edit(sc, n => { n.tracks[ti].keys.push({ ...keys[from], at }); });
  return { scroll, key: scroll.tracks[ti].keys.findIndex(x => x.at === at) };
}
/** Remove a key (a track keeps at least two) */
export const removeKey = (sc, ti, ki) => (sc.tracks[ti].keys.length < 3 ? sc : edit(sc, n => { n.tracks[ti].keys.splice(ki, 1); }));
/** Set a key's values: { at, ease, [prop]: number | '' (removes it), clip: '' removes } */
export function setKey(sc, ti, ki, patch) {
  return edit(sc, n => {
    const key = n.tracks[ti].keys[ki];
    for (const [p, v] of Object.entries(patch)) {
      if (v === '' || v === null || v === undefined) delete key[p];
      else key[p] = p === 'clip' || p === 'ease' ? v : Number(v);
    }
  });
}

/** The data-scroll attribute value for a section ('' when it has no scroll animation) */
export const scrollAttr = s => (s?.scroll ? JSON.stringify(s.scroll) : '');

/** Plain-language summary of what a scroll animation moves */
export function scrollSummary(sc) {
  if (!sc) return '';
  const names = { blur: 'blur', clip: 'reveal', opacity: 'fade', scale: 'scale', rotate: 'rotate', count: 'count' };
  return [
    ...(sc.stickMedia ? ['Image stays in place'] : []),
    ...sc.tracks.map(t => {
      const props = [...new Set(t.keys.flatMap(key => Object.keys(key).filter(p => SCROLL_PROPS.includes(p)).map(p => names[p] || 'move')))];
      return `${trackLabel(t)}: ${props.join(', ')}`;
    }),
  ].join(' · ');
}

/* The runtime, included once in any page with scroll animations */
export const SCROLL_RUNTIME = `(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  var pick = {
    section: function (s) { return [s]; },
    heading: function (s) { var h = s.querySelector('[data-anim-text]') || s.querySelector('h1, h2'); return h ? [h] : []; },
    items: function (s) { return s.querySelectorAll('[data-anim="item"]'); },
    media: function (s) { return s.querySelectorAll('[data-anim="media"]'); },
    background: function (s) { return s.querySelectorAll('[data-bg]'); },
    numbers: function (s) { return s.querySelectorAll('[data-count]'); },
    el: function (s, t) { var all = s.querySelectorAll(t.sel); return t.i >= 0 ? (all[t.i] ? [all[t.i]] : []) : all; }
  };
  /* A number's text split around its first number, so it can count while keeping prefix,
     suffix, commas and decimals ("$2.5M", "12,000+") */
  function counter(el) {
    var text = el.textContent, m = text.match(/\\d[\\d,]*(\\.\\d+)?/);
    if (!m) return null;
    var raw = m[0], dec = m[1] ? m[1].length - 1 : 0, commas = raw.indexOf(',') > -1;
    var to = parseFloat(raw.replace(/,/g, '')), pre = text.slice(0, m.index), post = text.slice(m.index + raw.length);
    el.setAttribute('aria-label', text.trim());
    return function (p) {
      var s = (to * p).toFixed(dec);
      if (commas) { var q = s.split('.'); q[0] = q[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ','); s = q.join('.'); }
      el.textContent = p >= 1 ? text : pre + s + post;
    };
  }
  var stickyTop = function () {
    var h = 0;
    document.querySelectorAll('.st').forEach(function (s) { if (s.querySelector('[data-sticky-flag]')) h = Math.max(h, s.offsetHeight); });
    return h + 24;
  };
  var PROPS = ['x', 'y', 'xPercent', 'yPercent', 'scale', 'rotate', 'opacity', 'blur', 'clip'];
  function vars(key) {
    var o = {};
    PROPS.forEach(function (p) {
      if (key[p] === undefined) return;
      if (p === 'blur') o.filter = 'blur(' + key[p] + 'px)';
      else if (p === 'clip') o.clipPath = 'inset(' + key[p] + ')';
      else o[p] = key[p];
    });
    return o;
  }
  document.querySelectorAll('.st[data-scroll]').forEach(function (sec) {
    var c;
    try { c = JSON.parse(sec.getAttribute('data-scroll')); } catch (e) { return; }
    if (c.desktopOnly && window.innerWidth < 768) return;
    var scrub = c.mode === 'scrub';
    var st = { trigger: sec, start: c.start || 'top 85%', end: c.pin ? '+=' + (c.pinLength || 100) + '%' : (c.end || 'bottom top'), markers: !!window.ST_SCROLL_MARKERS };
    if (scrub) st.scrub = 0.6; else st.toggleActions = c.mode === 'reverse' ? 'play reverse play reverse' : (window.ST_PREVIEW ? 'play reset play reset' : 'play none none none'); // the editor preview replays "once" animations each time they come into view
    if (c.pin) { st.pin = true; st.anticipatePin = 1; }
    // Spanning sections: run until a later section's bottom reaches the bottom of the screen
    var until = c.until && document.querySelector('[data-uid="' + c.until + '"]');
    if (until) { st.endTrigger = until; st.end = 'bottom bottom'; if (c.pin && c.overlap) st.pinSpacing = false; }
    // Sticky image: the media column holds still while the text scrolls past (no extra space)
    if (c.stickMedia) {
      var m = sec.querySelector('[data-anim="media"]');
      if (m && m.offsetHeight < sec.offsetHeight - 120) ScrollTrigger.create({ trigger: m, start: 'top ' + stickyTop(), endTrigger: sec, end: 'bottom bottom', pin: m, pinSpacing: false, markers: st.markers });
    }
    if (!(c.tracks || []).length) return;
    var tl = gsap.timeline({ scrollTrigger: st });
    (c.tracks || []).forEach(function (t) {
      var els = pick[t.target] ? pick[t.target](sec, t) : [];
      if (!els.length) return;
      var keys = (t.keys || []).slice().sort(function (a, b) { return a.at - b.at; });
      if (t.count) {
        // Numbers: a proxy value 0–1 per element drives its text
        Array.prototype.forEach.call(els, function (el) {
          var set = counter(el);
          if (!set) return;
          var o = { p: keys[0].count || 0 };
          set(o.p);
          for (var j = 0; j < keys.length - 1; j++) {
            var d1 = (keys[j + 1].at - keys[j].at) / 100;
            if (d1 > 0) tl.fromTo(o, { p: keys[j].count || 0 }, { p: keys[j + 1].count || 0, duration: d1, ease: keys[j].ease || (scrub ? 'none' : 'power2.out'), immediateRender: j === 0, onUpdate: function () { set(o.p); } }, keys[j].at / 100);
          }
        });
        return;
      }
      for (var i = 0; i < keys.length - 1; i++) {
        var a = keys[i], b = keys[i + 1], d = (b.at - a.at) / 100;
        if (d <= 0) continue;
        var to = vars(b);
        to.duration = d;
        to.ease = a.ease || (scrub ? 'none' : 'power2.out');
        if (t.stagger) to.stagger = t.stagger;
        if (i > 0) to.immediateRender = false;
        tl.fromTo(els, vars(a), to, a.at / 100);
      }
    });
    if (!scrub) tl.timeScale(0.9);
    sec.__stScroll = tl; // the builder's timeline scrubber drives this
  });
})();`;
