const autoplayProgressCarousel = {
  id: 'autoplay-progress-carousel',
  title: 'Autoplay Progress-Bar Carousel',
  lastmod: '2026-10-29',
  category: 'carousels',
  html: `<div class="apc-hero" id="apcHero">
  <div class="apc-bars" id="apcBars"></div>
  <div class="apc-track">
    <div class="apc-slide" style="--a:#6366f1;--b:#312e81">
      <div class="apc-copy">
        <span class="apc-eyebrow">New</span>
        <h1>Build faster with free web tools</h1>
        <p>183+ browser tools for developers and designers. No signup, no install.</p>
        <a class="apc-cta" href="#">Explore tools <span aria-hidden="true">&rarr;</span></a>
      </div>
      <div class="apc-art" aria-hidden="true"><b>183+</b><small>free tools</small></div>
    </div>
    <div class="apc-slide" style="--a:#0ea5e9;--b:#075985">
      <div class="apc-copy">
        <span class="apc-eyebrow">Popular</span>
        <h1>1788+ copy-paste UI snippets</h1>
        <p>Clean HTML, CSS &amp; JS you can preview, tweak and export in seconds.</p>
        <a class="apc-cta" href="#">Browse snippets <span aria-hidden="true">&rarr;</span></a>
      </div>
      <div class="apc-art" aria-hidden="true"><b>1788+</b><small>UI snippets</small></div>
    </div>
    <div class="apc-slide" style="--a:#ec4899;--b:#831843">
      <div class="apc-copy">
        <span class="apc-eyebrow">Free</span>
        <h1>Learn to code, visually</h1>
        <p>Interactive playgrounds for every language. Type, see it run, repeat.</p>
        <a class="apc-cta" href="#">Start learning <span aria-hidden="true">&rarr;</span></a>
      </div>
      <div class="apc-art" aria-hidden="true"><b>14</b><small>playgrounds</small></div>
    </div>
  </div>
  <div class="apc-count" id="apcCount">01 / 03</div>
  <div class="apc-pause-hint" id="apcHint">Paused</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#eef0f5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.apc-hero{position:relative;width:100%;max-width:760px;height:380px;border-radius:22px;overflow:hidden;background:#111;box-shadow:0 24px 60px rgba(15,23,42,.28),0 2px 6px rgba(15,23,42,.12)}
.apc-bars{position:absolute;top:10px;left:22px;right:22px;display:flex;gap:8px;z-index:4}
.apc-bar{flex:1;height:18px;display:flex;align-items:center;background:none;border:0;padding:0;cursor:pointer}
.apc-bar-track{width:100%;height:4px;border-radius:4px;background:rgba(255,255,255,.28);overflow:hidden}
.apc-bar-fill{display:block;height:100%;width:0%;background:#fff;border-radius:4px}
.apc-bar:hover .apc-bar-track{background:rgba(255,255,255,.42)}
.apc-track{position:relative;width:100%;height:100%}
.apc-slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:56px 52px 40px;background:radial-gradient(circle at 85% 20%,var(--a),transparent 55%),linear-gradient(135deg,var(--a),var(--b));opacity:0;visibility:hidden;transition:opacity .6s ease,visibility .6s}
.apc-slide::before,.apc-slide::after{content:"";position:absolute;border-radius:50%;background:rgba(255,255,255,.08)}
.apc-slide::before{width:340px;height:340px;right:-90px;top:-110px}
.apc-slide::after{width:200px;height:200px;right:150px;bottom:-110px}
.apc-slide.active{opacity:1;visibility:visible;z-index:1}
.apc-copy{position:relative;z-index:1;max-width:380px}
.apc-copy>*{opacity:0;transform:translateY(14px)}
.apc-slide.active .apc-copy>*{animation:apcUp .6s cubic-bezier(.2,.7,.2,1) forwards}
.apc-slide.active .apc-copy>:nth-child(2){animation-delay:.08s}
.apc-slide.active .apc-copy>:nth-child(3){animation-delay:.16s}
.apc-slide.active .apc-copy>:nth-child(4){animation-delay:.24s}
@keyframes apcUp{to{opacity:1;transform:none}}
.apc-eyebrow{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);padding:4px 12px;border-radius:20px;margin-bottom:16px}
.apc-slide h1{color:#fff;font-size:34px;line-height:1.12;font-weight:800;letter-spacing:-.02em;margin-bottom:12px}
.apc-slide p{color:rgba(255,255,255,.88);font-size:15.5px;line-height:1.55;margin-bottom:24px}
.apc-cta{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#111827;font-weight:700;font-size:14px;text-decoration:none;padding:11px 20px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,.2);transition:transform .2s,box-shadow .2s}
.apc-cta:hover{transform:translateY(-2px);box-shadow:0 12px 26px rgba(0,0,0,.28)}
.apc-art{position:relative;z-index:1;flex:none;width:190px;height:190px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);backdrop-filter:blur(6px);box-shadow:inset 0 0 0 14px rgba(255,255,255,.06)}
.apc-art b{font-size:40px;font-weight:800;letter-spacing:-.02em}
.apc-art small{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;opacity:.85}
.apc-count{position:absolute;left:52px;bottom:18px;z-index:4;font:700 12px/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:rgba(255,255,255,.75)}
.apc-pause-hint{position:absolute;bottom:14px;right:20px;z-index:4;font:700 11px system-ui,sans-serif;letter-spacing:.04em;color:#fff;background:rgba(0,0,0,.4);padding:5px 12px;border-radius:20px;opacity:0;transition:opacity .2s}
.apc-pause-hint.show{opacity:1}
@media (max-width:600px){
  .apc-hero{height:340px}
  .apc-art{display:none}
  .apc-slide{padding:52px 28px 40px}
  .apc-slide h1{font-size:26px}
  .apc-count{left:28px}
}
@media (prefers-reduced-motion:reduce){
  .apc-slide.active .apc-copy>*{animation:none;opacity:1;transform:none}
}`,

  js: `var slides = document.querySelectorAll('.apc-slide');
var barsWrap = document.getElementById('apcBars');
var hero = document.getElementById('apcHero');
var hint = document.getElementById('apcHint');
var count = document.getElementById('apcCount');
var DURATION = 4500;
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var current = 0;
var paused = false;
var timer = null;

function pad(n) { return (n < 10 ? '0' : '') + n; }

slides.forEach(function (s, i) {
  var bar = document.createElement('button');
  bar.type = 'button';
  bar.className = 'apc-bar';
  bar.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  bar.innerHTML = '<span class="apc-bar-track"><span class="apc-bar-fill"></span></span>';
  bar.addEventListener('click', function () { current = i; render(); restart(); });
  barsWrap.appendChild(bar);
});
var bars = document.querySelectorAll('.apc-bar');

function render() {
  slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
  count.textContent = pad(current + 1) + ' / ' + pad(slides.length);
  bars.forEach(function (b, i) {
    var fill = b.querySelector('.apc-bar-fill');
    fill.style.transition = 'none';
    if (i < current || (reduce && i === current)) { fill.style.width = '100%'; }
    else if (i > current) { fill.style.width = '0%'; }
    else {
      fill.style.width = '0%';
      void fill.offsetWidth;
      if (!paused) {
        fill.style.transition = 'width ' + DURATION + 'ms linear';
        requestAnimationFrame(function () { fill.style.width = '100%'; });
      }
    }
  });
}

function next() { current = (current + 1) % slides.length; render(); restart(); }

function restart() {
  clearTimeout(timer);
  if (paused || reduce) return;
  timer = setTimeout(next, DURATION);
}

hero.addEventListener('mouseenter', function () {
  paused = true;
  clearTimeout(timer);
  hint.classList.add('show');
  var activeFill = bars[current].querySelector('.apc-bar-fill');
  var computed = getComputedStyle(activeFill).width;
  activeFill.style.transition = 'none';
  activeFill.style.width = computed;
});

hero.addEventListener('mouseleave', function () {
  paused = false;
  hint.classList.remove('show');
  if (reduce) return;
  var activeFill = bars[current].querySelector('.apc-bar-fill');
  var currentWidth = parseFloat(getComputedStyle(activeFill).width);
  var trackWidth = parseFloat(getComputedStyle(activeFill.parentNode).width);
  var remainingMs = DURATION * (1 - currentWidth / trackWidth);
  void activeFill.offsetWidth;
  activeFill.style.transition = 'width ' + remainingMs + 'ms linear';
  activeFill.style.width = '100%';
  clearTimeout(timer);
  timer = setTimeout(next, remainingMs);
});

render();
restart();`,

  seo: {
    title: 'Autoplay Progress-Bar Carousel — HTML CSS JS Snippet',
    description: 'Autoplay hero carousel with Stories-style progress bars. Hover pauses the fill in place and resumes from that point; click a bar to jump. HTML, CSS & JS.',
    about: {
      title: 'Autoplay Progress-Bar Carousel — Pause-in-Place, Not Pause-and-Restart',
      description: `A plain autoplaying carousel is annoying to read because it never waits for you. This one borrows the segmented top progress bars from Instagram/YouTube Shorts — so a visitor can *see* how much time is left on the current slide — and, more importantly, it pauses exactly where the fill stopped on hover and resumes from that same point on mouse-out, rather than restarting the slide's timer from zero.\n\n**Reading the fill back out of the DOM**\n\nThe hard part of "resume from where it paused" is that the fill's width was mid-transition when the mouse entered — there's no JS variable holding "73% filled." The fix: on \`mouseenter\`, read the *live computed width* of the fill (\`getComputedStyle(activeFill).width\`) at that exact instant, immediately cancel the transition, and lock the fill at that literal pixel value. On \`mouseleave\`, the same computed width is compared against the bar's total width to work out what fraction is left, which becomes both the remaining transition duration and the \`setTimeout\` delay for auto-advancing — so the bar and the actual advance timer never drift apart.\n\n**Why every animation start forces a reflow**\n\nEach time a bar's fill needs to (re)start filling, the code sets its width to 0%, calls \`void fill.offsetWidth\` (reading a layout property forces the browser to apply the 0% *before* anything else happens), and only then re-applies the transition and sets the target width. Skip that forced reflow and the browser can coalesce the "reset to 0" and "animate to 100%" into one no-op change, since both happened in the same JavaScript tick.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A gradient hero carousel starts autoplaying, its first progress bar filling across the top.' },
        { title: 'Watch it advance', text: 'When a bar finishes filling, the hero crossfades to the next slide and its text animates in.' },
        { title: 'Hover over the hero', text: 'The fill freezes exactly where it is, and a "Paused" hint appears in the corner.' },
        { title: 'Move the mouse away', text: 'The fill resumes from the exact point it paused — not from zero — and advancing continues on schedule.' },
        { title: 'Click a progress bar', text: 'Jump straight to that slide; its fill restarts and autoplay carries on from there.' },
        { title: 'Add a fourth slide', text: 'Add one more .apc-slide — a matching progress segment and the "01 / 04" counter update automatically.' },
      ],
    },
    features: [
      'Polished hero layout: gradient slides, decorative shapes, stat badge, CTA button and a staggered text entrance',
      'Clickable progress bars (real buttons with aria-labels) to jump to any slide',
      'Slide counter ("01 / 03") that stays in sync with the active slide',
      'Honors prefers-reduced-motion: autoplay stops and the entrance animation is skipped',
      'Segmented top progress bars, one per slide, matching the Stories/Shorts autoplay pattern',
      'Hover-to-pause freezes the fill at its exact current position, read live from computed styles',
      'Resuming continues the fill (and the advance timer) from that same paused point, not from zero',
      'Forced-reflow reset pattern ensures every bar animation restarts cleanly on repeated viewings',
      'A visible "Paused" hint confirms the pause state to the visitor, avoiding silent, confusing autoplay',
      'Crossfade transition between slides, generated bars scale automatically with slide count',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Marketing site hero carousels', desc: 'Autoplay through 3-4 key messages while remaining genuinely readable — it waits for a visitor who is reading.' },
      { icon: 'FLOW',   title: 'Product announcement rotators', desc: 'Cycle through recent updates or launches with clear, glanceable pacing feedback.' },
      { icon: 'APP',    title: 'Dashboard highlight banners', desc: 'Rotate through alerts or KPIs with autoplay that respects a user who stops to read one.' },
      { icon: 'STAR',   title: 'Testimonial or social-proof rotators', desc: 'Auto-advance customer quotes without ever cutting one off mid-read on hover.' },
    ],
    faqs: [
      { q: 'How do I change the autoplay speed?', a: 'Change the DURATION constant (milliseconds). It drives both the visible fill speed and the actual auto-advance timer, so they always stay in sync regardless of the value.' },
      { q: 'Why not just pause with animation-play-state: paused?', a: 'That would work for a simple pause, but resuming afterward needs to know exactly how much time is left to set a matching setTimeout for the next slide — reading the live computed width and doing the remaining-time math is what keeps the visible bar and the actual advance timer in agreement.' },
      { q: 'Does it pause on touch devices without a mouse?', a: 'Not out of the box — mouseenter/mouseleave don\'t fire reliably on touch. Add a touchstart handler that calls the same pause logic and a tap-elsewhere or timeout to resume, mirroring the desktop pattern.' },
      { q: 'Can visitors jump to a specific slide?', a: 'Yes — each progress bar is a button. Clicking one sets current, then calls render() and restart(), so the new slide\'s fill starts from zero.' },
      { q: 'Is it accessible?', a: 'Partly built in: bars are labeled buttons and prefers-reduced-motion stops autoplay. For full coverage, also pause on keyboard focus (focusin/focusout), since the hover pause only helps mouse users.' },
      { q: 'How do I change the slide content?', a: 'Edit the .apc-slide blocks. Set the --a and --b custom properties for the gradient colors, then change the eyebrow, heading, text, CTA link and the .apc-art stat badge (or remove it).' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how getComputedStyle is used to capture the fill's exact paused position, and why that value has to be read before the transition is cancelled rather than after. It's also worth asking the assistant to add prefers-reduced-motion support that disables autoplay for users who've requested it, or to add previous/next arrows and a keyboard-focus pause alongside the existing hover-pause behavior, since the hover pause only helps mouse users.`,
      prompt: `Build a polished autoplaying hero carousel in plain HTML, CSS, and vanilla JavaScript with Stories/Shorts-style segmented progress bars across the top — no library.

Requirements:
- Several full-bleed hero slides (about 760x380, rounded, with a soft shadow) stacked on top of each other, crossfading via an opacity transition, with only one visible (active) at a time. Give each slide a gradient from two CSS custom properties (--a, --b), faint decorative circles, an eyebrow pill, a heading, a short paragraph, a white CTA button, and a circular stat badge on the right (hidden below 600px). The slide's text elements fade up one after another when the slide becomes active.
- A zero-padded slide counter ("01 / 03") in the bottom-left that updates with the active slide.
- A row of thin progress bar segments above the slides, each a real <button> with an aria-label ("Go to slide N") that jumps to that slide when clicked, generated dynamically from the slide count — the segment for the current slide fills from empty to full over a fixed duration using a CSS width transition, segments for already-shown slides display fully filled, and upcoming ones display empty.
- When the active segment finishes filling, automatically advance to the next slide (wrapping back to the first after the last) and begin filling the new segment.
- On mouse hover over the whole carousel, the currently-filling segment must freeze at its exact current fill position — read the actual live rendered width at that moment rather than estimating or resetting to a fixed value — and the auto-advance timer must be cancelled.
- On mouse leave, the segment must resume filling smoothly from that exact frozen position (not restart from zero) toward 100%, and a new auto-advance timer must be set for only the remaining time needed to finish that fill, calculated from how much of the bar was already filled when the pause began.
- Display a small visible text indicator confirming to the user that autoplay is currently paused, shown only while hovering.
- Respect prefers-reduced-motion: when set, do not autoplay (bars stay clickable, the active bar shows full) and skip the text entrance animation.
- Every time a segment needs to start (or restart) its fill animation, force a layout reflow between resetting its width to zero and applying the new transition, so the reset is guaranteed to render before the fill animation begins.`,
    },
  },
};

export default autoplayProgressCarousel;
