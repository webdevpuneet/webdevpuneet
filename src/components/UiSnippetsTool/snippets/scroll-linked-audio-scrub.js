const scrollLinkedAudioScrub = {
  id: 'scroll-linked-audio-scrub',
  title: 'Scroll-Linked Audio Waveform Scrub',
  lastmod: '2026-08-23',
  category: 'scroll',
  cdnUrls: [],
  html: `<section class="as-intro"><h1>Scroll ↓</h1><p>Scrolling scrubs the playhead across the waveform — the reverse of a normal player.</p></section>
<section class="as-wrap" id="asWrap">
  <div class="as-panel">
    <div class="as-meta"><span class="as-track-name">Interview — Take 4</span><span class="as-time" id="asTime">0:00 / 3:24</span></div>
    <div class="as-scope">
      <div class="as-bars" id="asBars"></div>
      <div class="as-played" id="asPlayed"></div>
      <div class="as-playhead" id="asPlayhead"></div>
    </div>
    <div class="as-progress-track"><div class="as-progress-fill" id="asProgressFill"></div></div>
  </div>
</section>
<section class="as-outro"><p>Scroll back up — the playhead reverses exactly.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.as-intro,.as-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.as-intro h1{font-size:clamp(34px,7vw,64px);letter-spacing:-.02em}
.as-intro p,.as-outro p{color:#9aa0b8;font-size:16px;max-width:480px}
.as-wrap{height:340vh;position:relative}
.as-panel{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;gap:18px;max-width:780px;margin:0 auto;padding:24px}
.as-meta{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#9aa0b8}
.as-track-name{font-weight:700;color:#e6e8f4;letter-spacing:-.01em}
.as-time{font-variant-numeric:tabular-nums;color:#7c8cff;font-weight:700}
.as-scope{position:relative;height:180px;border-radius:18px;background:#0d0f1c;border:1px solid #232a3d;overflow:hidden;padding:0 4px}
.as-bars{position:absolute;inset:0;display:flex;align-items:center;gap:2px;padding:0 4px}
.as-bars span{flex:1;min-width:2px;border-radius:2px;background:#2c3349;transition:background .15s}
.as-bars span.is-played{background:#4c56a8}
.as-played{position:absolute;top:0;left:0;bottom:0;width:0%;background:linear-gradient(90deg,rgba(124,140,255,.12),rgba(124,140,255,.02));pointer-events:none}
.as-playhead{position:absolute;top:6px;bottom:6px;left:0;width:2px;background:#22d3ee;box-shadow:0 0 14px rgba(34,211,238,.8);border-radius:2px}
.as-playhead::before{content:'';position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:10px;height:10px;border-radius:50%;background:#22d3ee;box-shadow:0 0 10px rgba(34,211,238,.9)}
.as-progress-track{height:4px;border-radius:999px;background:#1b2032;overflow:hidden}
.as-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#6366f1,#22d3ee)}`,

  js: `(function () {
  var wrap = document.getElementById('asWrap');
  var barsEl = document.getElementById('asBars');
  var playedEl = document.getElementById('asPlayed');
  var playhead = document.getElementById('asPlayhead');
  var timeEl = document.getElementById('asTime');
  var progressFill = document.getElementById('asProgressFill');
  var totalSeconds = 204; // 3:24, purely for the displayed time label

  // Build a deterministic pseudo-waveform (no audio file needed — this is a
  // visual stand-in). A sum of a few sine waves plus a stable pseudo-random
  // jitter gives it a natural, non-repeating look.
  var BAR_COUNT = 140;
  var seed = 42;
  function rand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  var bars = [];
  for (var i = 0; i < BAR_COUNT; i++) {
    var t = i / BAR_COUNT;
    var h = 18 + Math.abs(Math.sin(t * 22) * 40) + Math.abs(Math.sin(t * 5.3) * 30) + rand() * 18;
    h = Math.min(96, h);
    var bar = document.createElement('span');
    bar.style.height = h.toFixed(1) + '%';
    barsEl.appendChild(bar);
    bars.push(bar);
  }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  var ticking = false;
  function update() {
    ticking = false;
    var rect = wrap.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;
    // Scroll position drives playhead position directly — this is the
    // inverse of a normal audio player, where time drives the playhead.
    var progress = scrollable > 0 ? (-rect.top) / scrollable : 0;
    progress = Math.max(0, Math.min(1, progress));

    playhead.style.left = (progress * 100) + '%';
    playedEl.style.width = (progress * 100) + '%';
    progressFill.style.width = (progress * 100) + '%';
    timeEl.textContent = formatTime(progress * totalSeconds) + ' / ' + formatTime(totalSeconds);

    var playedCount = Math.round(progress * BAR_COUNT);
    for (var i = 0; i < bars.length; i++) {
      if (i < playedCount) bars[i].classList.add('is-played');
      else bars[i].classList.remove('is-played');
    }
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();`,

  seo: {
    title: 'Scroll-Linked Audio Waveform Scrub — Free Reverse-Scrub Player Effect',
    description: `A waveform whose playhead position is driven directly by scroll progress — scroll instead of time scrubs through the track. Plain vanilla JS. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll-Linked Audio Waveform Scrub — Scroll Position Drives the Playhead',
      description: `Most audio players work one way: time advances, and the playhead moves to match it. This snippet inverts that relationship — there's no clock running at all. The playhead's horizontal position is a direct, continuous function of how far you've scrolled through the section, so scrolling *is* scrubbing. It's built with plain vanilla JavaScript reading \`getBoundingClientRect()\` on scroll, no GSAP or audio library required.

**A visual waveform, not an audio file**

The bars are drawn once on load from a small deterministic formula — a sum of sine waves plus a stable pseudo-random jitter seeded with a fixed number — so the shape looks like a real recording's amplitude but never needs an actual audio asset to fetch or decode. If you do want real playback, the same progress value can drive \`audio.currentTime = progress * audio.duration\` on an \`HTMLAudioElement\` instead of just moving a marker.

**Scroll position as the single source of truth**

A tall wrapper section (\`340vh\`) gives the page room to scroll while a sticky inner panel stays pinned in the viewport. On every scroll event (throttled to one calculation per animation frame with a \`requestAnimationFrame\` guard flag), the code measures the wrapper's \`getBoundingClientRect()\` and divides the distance already scrolled by the total scrollable distance, clamped to 0–1. That single \`progress\` number positions the playhead, sizes the "played" overlay, updates the displayed time label, and marks which bars are already "played" — all four effects derive from the same measurement, so they never drift out of sync with each other.

**Fully reversible, no state to reset**

Because the playhead position is recalculated fresh from the current scroll offset on every frame rather than accumulated or eased toward a target, scrolling back up moves it back exactly, instantly, with no springy catch-up and no need to detect "reverse" as a special case. Whatever fraction of the section is scrolled is exactly the fraction of the track that's "played."

**Cheap enough for a plain scroll listener**

The update touches only \`style.left\`, \`style.width\`, and \`textContent\` — no layout-triggering reads inside the loop beyond the one \`getBoundingClientRect()\` call — so a passive scroll listener gated by \`requestAnimationFrame\` keeps this smooth without needing IntersectionObserver or a scroll-linked animation library.

**Customizing it**

Swap the synthetic waveform for real amplitude data decoded from an actual audio file via the Web Audio API's \`AnalyserNode\`, wire the same \`progress\` value to \`audio.currentTime\`, or change the wrapper height to make the scrub longer or shorter relative to scroll distance. Pair it with a [scroll-driven progress bar](/ui-snippets/css-scroll-driven-progress/) or a [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) for other position-linked reveals.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a sticky waveform panel, and an outro render — no dependencies.` },
      { title: 'Scroll into the waveform section', text: `The playhead moves across the bars in direct proportion to scroll.` },
      { title: 'Scroll slowly, then fast', text: `The playhead tracks scroll position exactly either way — it never eases.` },
      { title: 'Scroll back up', text: `The playhead and time label reverse precisely, with no reset needed.` },
      { title: 'Wire real audio (optional)', text: `Use the same progress value to set audio.currentTime on an <audio> element.` },
      { title: 'Adjust the scrub length', text: `Change .as-wrap's height to make the scroll distance longer or shorter.` },
    ] },
    features: [
      { title: 'Scroll drives playhead', text: `Position is a direct function of scroll, not a timer.` },
      { title: 'Synthetic waveform', text: `Deterministic sine-based bars need no audio asset.` },
      { title: 'Single progress value', text: `One rect measurement drives four synced visuals.` },
      { title: 'Exact reversal', text: `Recalculated fresh each frame — no easing lag.` },
      { title: 'rAF-gated scroll listener', text: `One calculation per frame, no missed or doubled updates.` },
      { title: 'Sticky scrub panel', text: `Pinned via CSS position: sticky, no JS pinning needed.` },
      { title: 'Played-bar highlighting', text: `Bars behind the playhead visually mark as played.` },
      { title: 'Real audio ready', text: `Swap the marker-only demo for audio.currentTime control.` },
    ],
    useCases: [
      { title: 'Podcast page previews', text: 'Let scrolling scrub a synthetic waveform playhead, with no clock running and no audio asset needed.' },
      { title: 'Music portfolio pages', text: 'Pair with [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) reveals so a track and an illustration both respond to scroll position.' },
      { title: 'Interactive articles', text: 'Scrub through archival audio alongside the text of an interactive article, with one rect measurement driving four synchronised visuals at once.' },
      { title: 'Sound design showcases', text: 'Visualise a track without autoplay, using deterministic sine-based bars so the waveform looks the same every visit.' },
      { title: 'Progress indicator companions', text: 'Complement a [CSS scroll-driven progress](/ui-snippets/css-scroll-driven-progress/) bar, recalculating fresh each frame so reversal has no easing lag.' },
      { icon: 'CODE', title: 'Related: Scroll Milestone Confetti', desc: 'See the [Scroll Milestone Confetti](/ui-snippets/scroll-milestone-confetti/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this play actual audio?', a: `Not by default — the waveform is a visual stand-in drawn from a deterministic formula, so no audio file needs to be fetched or decoded. If you want real playback, use the same progress value calculated on scroll to set audio.currentTime = progress * audio.duration on an HTMLAudioElement; the playhead marker logic stays identical.` },
      { q: 'How is this different from a normal audio player?', a: `A normal player has a clock: time advances and the playhead follows. This snippet has no clock at all — scroll position is the only input, and the playhead's location is recalculated directly from it on every scroll event. Scrolling up moves the playhead back exactly, since there's no elapsed time to account for, only current scroll offset.` },
      { q: 'Why measure getBoundingClientRect instead of using an IntersectionObserver?', a: `IntersectionObserver reports discrete threshold crossings, which is great for one-time reveals but too coarse for a continuous 0–1 scrub value. getBoundingClientRect gives an exact pixel position every time it is read, so dividing scrolled distance by scrollable distance produces a smooth, precise progress fraction suitable for driving the playhead every frame.` },
      { q: 'Will this cause scroll jank on a long page?', a: `The scroll handler is gated by a requestAnimationFrame flag so the expensive work (one rect read, a few style writes) runs at most once per frame regardless of how many scroll events fire. The style writes touch only left, width, and textContent — no properties that trigger layout thrashing — so it stays smooth even on lower-end devices.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Render the markup, then in a mount effect attach the passive scroll and resize listeners and run the same rAF-gated update function, reading refs instead of getElementById. Return a cleanup that removes both listeners. Because the effect is purely a function of the current scroll position, no component state needs to track "is playing" or elapsed time.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why dividing the scrolled distance by the total scrollable distance from getBoundingClientRect produces a value that behaves identically whether the user is scrolling up or down — there's no separate "reverse" code path because the position is recalculated from scratch every time, not accumulated. It's also useful for extending this into a real audio scrubber: ask it to replace the synthetic sine-based waveform with actual decoded amplitude data from the Web Audio API's AnalyserNode, or to wire the computed progress value to audio.currentTime so scrolling genuinely seeks through a real track rather than just moving a marker over a static shape.`,
      prompt: `Build a "scroll-linked audio waveform scrub" effect in plain HTML, CSS, and vanilla JavaScript (no libraries, no audio file required — a visual demo only).

Requirements:
- A tall wrapper section (e.g. 300vh+) containing a sticky inner panel (position: sticky) that stays pinned in the viewport while the wrapper scrolls past, so there's room to scroll through the effect.
- Inside the sticky panel, a waveform made of many thin bar elements with varying heights generated on load from a deterministic formula (e.g. a sum of sine waves plus a fixed-seed pseudo-random jitter) so it looks like a real audio waveform without needing an actual audio file.
- A vertical playhead marker whose horizontal position (as a percentage) is calculated directly from scroll progress: on scroll, measure the wrapper's getBoundingClientRect, compute (scrolled distance) / (total scrollable distance) clamped to 0–1, and set the playhead's left position to that percentage. This is the inverse of a normal audio player — scroll position drives the playhead, not elapsed time.
- Gate the scroll handler with a requestAnimationFrame flag so the position only recalculates once per frame no matter how many scroll events fire, and use a passive scroll listener.
- A time label (e.g. "1:12 / 3:24") that updates from the same progress value multiplied by a fixed total duration, and an overlay showing which portion of the waveform is "played" behind the playhead.
- Confirm scrolling back up reverses the playhead exactly, with no lag or spring-back, because the position is recomputed fresh from the current scroll offset every time rather than eased or accumulated.`,
    },
  },
};

export default scrollLinkedAudioScrub;
