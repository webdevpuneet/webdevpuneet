/* Scroll animations for sections on a page (roadmap Phase 3b): scroll-driven GSAP timelines
   designed without code, on top of the entrance presets.

   A page section may carry
     scroll: { preset, start, mode, pin, pinLength, tracks: [{ target, stagger, keys: [{ at, ease, ...props }] }] }
   preset     the effect it started from (SCROLL_PRESETS); tracks are what actually runs
   start      when the animation starts: ScrollTrigger "start" (SCROLL_STARTS)
   mode       'scrub' (follows the scroll bar) | 'once' (plays once) | 'reverse' (plays, reverses on the way back)
   pin        hold the section in place while it animates, for pinLength % of the screen height
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
];
export const SCROLL_PROPS = ['x', 'y', 'xPercent', 'yPercent', 'scale', 'rotate', 'opacity', 'blur', 'clip'];
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
    { target: 'heading', keys: [k(0, { clip: '0 100% 0 0' }), k(60, { clip: '0 0% 0 0' })] },
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
  { id: 'fade-out', label: 'Fade out on leave', note: 'The section shrinks and fades as it scrolls away.', start: 'bottom 75%', end: 'bottom top', mode: 'scrub', tracks: [
    { target: 'section', keys: [k(0, { opacity: 1, scale: 1 }), k(100, { opacity: 0.15, scale: 0.94 })] },
  ] },
];
export const scrollPresetById = id => SCROLL_PRESETS.find(p => p.id === id);

/** A scroll animation started from a preset (or null for none) */
export function scrollFromPreset(id) {
  const p = scrollPresetById(id);
  if (!p) return null;
  return cleanScroll({ preset: p.id, start: p.start, end: p.end, mode: p.mode, pin: !!p.pin, pinLength: p.pinLength || '100', tracks: p.tracks });
}

const num = (v, min, max) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : undefined; };
const LIMITS = { x: [-2000, 2000], y: [-2000, 2000], xPercent: [-300, 300], yPercent: [-300, 300], scale: [0, 5], rotate: [-720, 720], opacity: [0, 1], blur: [0, 60] };
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
    const keys = (Array.isArray(t.keys) ? t.keys : []).slice(0, 12).map(cleanKey).sort((a, b) => a.at - b.at);
    if (keys.length < 2) return null;
    const stagger = num(t.stagger, 0, 1);
    return { target: t.target, ...(stagger ? { stagger } : {}), keys };
  }).filter(Boolean);
  if (!tracks.length) return undefined;
  const mode = SCROLL_MODES.some(([v]) => v === sc.mode) ? sc.mode : 'scrub';
  return {
    ...(scrollPresetById(sc.preset) ? { preset: sc.preset } : {}),
    start: START.test(String(sc.start)) ? String(sc.start) : 'top 85%',
    ...(START.test(String(sc.end)) ? { end: String(sc.end) } : {}),
    mode,
    pin: !!sc.pin,
    pinLength: SCROLL_PIN_LENGTHS.some(([v]) => v === String(sc.pinLength)) ? String(sc.pinLength) : '100',
    tracks,
  };
}

/** The data-scroll attribute value for a section ('' when it has no scroll animation) */
export const scrollAttr = s => (s?.scroll ? JSON.stringify(s.scroll) : '');

/** Plain-language summary of what a scroll animation moves */
export function scrollSummary(sc) {
  if (!sc) return '';
  const names = { blur: 'blur', clip: 'reveal', opacity: 'fade', scale: 'scale', rotate: 'rotate' };
  return sc.tracks.map(t => {
    const props = [...new Set(t.keys.flatMap(key => Object.keys(key).filter(p => SCROLL_PROPS.includes(p)).map(p => names[p] || 'move')))];
    return `${SCROLL_TARGETS.find(x => x.id === t.target)?.label}: ${props.join(', ')}`;
  }).join(' · ');
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
    background: function (s) { return s.querySelectorAll('[data-bg]'); }
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
    var scrub = c.mode === 'scrub';
    var st = { trigger: sec, start: c.start || 'top 85%', end: c.pin ? '+=' + (c.pinLength || 100) + '%' : (c.end || 'bottom top') };
    if (scrub) st.scrub = 0.6; else st.toggleActions = c.mode === 'reverse' ? 'play reverse play reverse' : 'play none none none';
    if (c.pin) { st.pin = true; st.anticipatePin = 1; }
    var tl = gsap.timeline({ scrollTrigger: st });
    (c.tracks || []).forEach(function (t) {
      var els = pick[t.target] ? pick[t.target](sec) : [];
      if (!els.length) return;
      var keys = (t.keys || []).slice().sort(function (a, b) { return a.at - b.at; });
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
  });
})();`;
