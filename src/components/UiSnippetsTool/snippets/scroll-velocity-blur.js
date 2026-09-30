const scrollVelocityBlur = {
  id: 'scroll-velocity-blur',
  title: 'Scroll Velocity Motion Blur',
  lastmod: '2026-08-23',
  category: 'scroll',
  cdnUrls: [],
  html: `<section class="vb-intro"><h1>Scroll fast ↓</h1><p>Content genuinely blurs in proportion to how fast you're scrolling, then sharpens as you slow down.</p></section>
<section class="vb-list" id="vbList">
  <article class="vb-card"><span>01</span><h3>Momentum</h3><p>Blur amount tracks real pixels-per-frame.</p></article>
  <article class="vb-card"><span>02</span><h3>Inertia</h3><p>Fling the page and watch it smear.</p></article>
  <article class="vb-card"><span>03</span><h3>Friction</h3><p>Slow down and it sharpens back to zero.</p></article>
  <article class="vb-card"><span>04</span><h3>Drift</h3><p>No fixed blur toggle — it's computed live.</p></article>
  <article class="vb-card"><span>05</span><h3>Glide</h3><p>Stop scrolling and blur decays to nothing.</p></article>
  <article class="vb-card"><span>06</span><h3>Coast</h3><p>Try a slow, deliberate scroll versus a flick.</p></article>
</section>
<section class="vb-outro"><p>The blur amount is a live measurement, not a preset.</p></section>
<div class="vb-meter"><span class="vb-meter-label">px/frame</span><span class="vb-meter-value" id="vbMeterValue">0</span></div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.vb-intro,.vb-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.vb-intro h1{font-size:clamp(34px,7vw,64px);letter-spacing:-.02em}
.vb-intro p,.vb-outro p{color:#9aa0b8;font-size:16px;max-width:480px}
.vb-list{max-width:600px;margin:0 auto;padding:10vh 24px;display:flex;flex-direction:column;gap:20px;will-change:filter}
.vb-card{padding:26px 26px;border-radius:20px;background:linear-gradient(150deg,#181e34,#11131f);border:1px solid #252c40}
.vb-card span{font-size:13px;font-weight:800;letter-spacing:.14em;color:#7c8cff}
.vb-card h3{font-size:24px;letter-spacing:-.01em;margin:8px 0 6px}
.vb-card p{color:#a7adc4;font-size:14.5px;line-height:1.55}
.vb-meter{position:fixed;bottom:20px;right:20px;display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:rgba(13,15,28,.85);backdrop-filter:blur(8px);border:1px solid #262d44;font-size:12.5px;z-index:5}
.vb-meter-label{color:#8a90a8;letter-spacing:.04em}
.vb-meter-value{font-variant-numeric:tabular-nums;font-weight:800;color:#22d3ee;min-width:2.4em;text-align:right}`,

  js: `(function () {
  var list = document.getElementById('vbList');
  var meterValue = document.getElementById('vbMeterValue');

  var lastScrollY = window.scrollY;
  var lastTime = performance.now();
  var velocity = 0; // measured pixels-per-frame
  var currentBlur = 0;
  var MAX_BLUR = 14;

  // Smoothing/decay factors: velocity eases toward its freshly-measured
  // value, and the applied blur eases toward the velocity-derived target,
  // so both ramp up and settle down smoothly instead of snapping.
  var VELOCITY_SMOOTHING = 0.35;
  var BLUR_SMOOTHING = 0.18;
  var DECAY_PER_FRAME = 0.9; // velocity decays toward 0 when no scroll event fires

  var lastEventTime = performance.now();

  window.addEventListener('scroll', function () {
    var now = performance.now();
    var dt = now - lastTime;
    if (dt <= 0) return;
    var dy = window.scrollY - lastScrollY;
    // Normalize to a ~60fps frame so velocity reads as "pixels per frame"
    // regardless of actual event timing.
    var instVelocity = Math.abs(dy) / (dt / 16.67);
    velocity += (instVelocity - velocity) * VELOCITY_SMOOTHING;
    lastScrollY = window.scrollY;
    lastTime = now;
    lastEventTime = now;
  }, { passive: true });

  function loop() {
    var now = performance.now();
    // If no scroll event has fired recently, decay velocity toward zero so
    // blur clears even if the scroll simply stops without a final event.
    if (now - lastEventTime > 32) {
      velocity *= DECAY_PER_FRAME;
      if (velocity < 0.05) velocity = 0;
    }

    var targetBlur = Math.min(MAX_BLUR, velocity * 0.9);
    currentBlur += (targetBlur - currentBlur) * BLUR_SMOOTHING;
    if (currentBlur < 0.05) currentBlur = 0;

    list.style.filter = currentBlur > 0 ? 'blur(' + currentBlur.toFixed(2) + 'px)' : 'none';
    meterValue.textContent = velocity.toFixed(1);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();`,

  seo: {
    title: 'Scroll Velocity Motion Blur — Free Real Velocity-Based CSS Blur Effect',
    description: `Content blurs by an amount computed from actual scroll speed (pixels per frame between events), and sharpens back to zero as scrolling slows — vanilla JS, no library.`,
    about: {
      title: 'Scroll Velocity Motion Blur — Blur That Tracks Real Scroll Speed',
      description: `This isn't a fixed "blur while scrolling, sharp when still" toggle — the blur amount is a genuine, continuously computed function of how fast the page is actually moving. Scroll slowly and the content stays crisp; flick the page hard and it visibly smears with \`filter: blur()\`, then eases back to zero as your scroll speed drops. Built entirely with vanilla JavaScript and \`requestAnimationFrame\`, no animation library required.

**Measuring real velocity, not just "is scrolling"**

Every \`scroll\` event records the current \`window.scrollY\`, compares it against the value from the previous event, and divides by the elapsed time — normalized to a 16.67ms (60fps) frame so the result reads as "pixels moved per frame" regardless of how often the browser actually fires scroll events. That raw instantaneous velocity is smoothed with a simple exponential-moving-average step (\`velocity += (instVelocity - velocity) * 0.35\`) so a single noisy event doesn't spike the blur.

**A second smoothing pass for the visual blur**

The blur amount applied to the content doesn't jump straight to the velocity-derived target either — a \`requestAnimationFrame\` loop eases \`currentBlur\` toward \`targetBlur\` every frame with its own smoothing factor. Two smoothing stages (velocity, then blur) is what gives the effect a soft ramp-up and a soft settle rather than a jittery on/off flicker, while the underlying number driving it all is still a real speed measurement.

**Decay when scrolling stops**

Because \`scroll\` events stop firing entirely once the page is still, the rAF loop separately checks how long it's been since the last event and decays the velocity toward zero if none has arrived in the last couple of frames. Without this, a scroll that stops abruptly (rather than decelerating smoothly, as happens with certain trackpads or a scrollbar drag) would leave the blur stuck at its last value with nothing to bring it back down.

**Live velocity readout**

A small fixed meter in the corner displays the raw pixels-per-frame velocity number in real time, which makes the relationship between scroll speed and blur amount directly observable rather than something you have to take on faith — useful for tuning \`MAX_BLUR\` and the smoothing constants to taste.

**Customizing it**

Raise \`MAX_BLUR\` for a more dramatic smear, tighten \`BLUR_SMOOTHING\` for a snappier response, or apply the blur to individual cards instead of the whole list for a more localized effect. Pair it with [scroll skew velocity](/ui-snippets/scroll-skew-velocity/) for a combined blur-and-skew treatment, or contrast it with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for a calmer entrance.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a card list, a meter, and an outro render.` },
      { title: 'Scroll slowly', text: `The meter stays low and the cards remain sharp.` },
      { title: 'Flick-scroll fast', text: `The meter spikes and the cards visibly blur.` },
      { title: 'Stop suddenly', text: `Blur eases back to zero even without a final scroll event.` },
      { title: 'Watch the meter', text: `It shows the live pixels-per-frame value driving the blur.` },
      { title: 'Tune the response', text: `Adjust MAX_BLUR and the smoothing constants to taste.` },
    ] },
    features: [
      { title: 'Real velocity measurement', text: `Pixels-per-frame computed from actual scroll deltas.` },
      { title: 'Two-stage smoothing', text: `Velocity and blur each ease, avoiding jitter.` },
      { title: 'Decays on stop', text: `An rAF loop clears blur even with no final scroll event.` },
      { title: 'Live velocity meter', text: `A visible readout of the number driving the effect.` },
      { title: 'GPU-friendly filter', text: `Only the CSS filter property animates.` },
      { title: 'Frame-normalized speed', text: `Consistent readings regardless of event timing.` },
      { title: 'No dependencies', text: `Pure vanilla JS and requestAnimationFrame.` },
      { title: 'Tunable intensity', text: `MAX_BLUR and smoothing factors are simple constants.` },
    ],
    useCases: [
      { title: 'Long-scroll editorial', text: `Add kinetic feel to fast reader scrolling.` },
      { title: 'Portfolio sites', text: `Pair with [scroll skew velocity](/ui-snippets/scroll-skew-velocity/) cards.` },
      { title: 'Product galleries', text: `Blur thumbnails during fast flicks, sharpen on settle.` },
      { title: 'Marketing pages', text: `Add a tactile, physical feel to a long scroll.` },
      { title: 'Image-heavy feeds', text: `Contrast with a calmer [scroll reveal grid](/ui-snippets/scroll-reveal-grid/).` },
      { title: 'Interactive demos', text: `Show the live velocity meter as a teaching tool.` },
      { icon: 'CODE', title: 'Related: Three.js Scroll Shatter & Assemble', desc: 'See the [Three.js Scroll Shatter & Assemble](/ui-snippets/three-scroll-shatter-assemble/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the blur amount actually tied to scroll speed?', a: `Yes. Each scroll event computes the pixel distance moved since the previous event divided by elapsed time, normalized to a 60fps frame, producing a real "pixels per frame" velocity number. That number (after smoothing) directly sets the blur target in pixels, so a fast flick produces measurably more blur than a slow scroll — verifiable by watching the live meter track both.` },
      { q: 'Why smooth the velocity and the blur separately?', a: `Raw scroll events are noisy and irregularly timed, so smoothing the velocity first with an exponential moving average avoids a single jumpy event spiking the number. Then easing the applied blur toward that smoothed velocity target, rather than snapping to it every frame, is what gives the blur a soft ramp instead of a flicker — two lightweight smoothing passes instead of one heavier one.` },
      { q: 'How does the blur clear when scrolling stops abruptly?', a: `Scroll events simply stop firing once the page is still, so a separate requestAnimationFrame loop tracks how long it has been since the last scroll event and decays the velocity toward zero if none has arrived within about two frames. Without this check, a scroll that stops instantly (rather than decelerating) would leave the last measured blur amount stuck on screen indefinitely.` },
      { q: 'Will this hurt scroll performance?', a: `The scroll listener is passive and does only cheap arithmetic — no DOM reads that trigger layout. The actual style write (filter) happens once per animation frame in the rAF loop rather than once per scroll event, and filter/blur is GPU-composited, so it stays smooth even during a fast, sustained scroll.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Attach the scroll listener and start the rAF loop in a mount effect, storing velocity and currentBlur in refs rather than plain variables so they persist across renders without triggering re-renders themselves; apply the computed blur directly via a ref's style property. Return a cleanup that removes the scroll listener and cancels the animation frame.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI coding assistant like Claude and ask it to walk through the two-stage smoothing pipeline — why the raw per-event velocity is smoothed once with an exponential moving average before becoming a "target," and why the actual applied CSS blur value is then smoothed a second time toward that target inside the requestAnimationFrame loop, rather than either value being applied directly and instantly. It's also useful for tuning: ask it whether MAX_BLUR of 14px and a BLUR_SMOOTHING of 0.18 feel right for a hero section versus a dense card list, or to add a floor so a very slow, deliberate scroll never triggers even a hint of blur. It can also help extend the idea — applying directional blur (only horizontal or only vertical) based on scroll direction, or scaling blur per-element based on each element's distance from viewport center.`,
      prompt: `Build a "scroll velocity motion blur" effect in plain HTML, CSS, and vanilla JavaScript (no libraries).

Requirements:
- A scrollable content area (a list of cards or similar) that gets a CSS filter: blur() applied, with the blur amount computed from real, measured scroll velocity — not a fixed value toggled on/off based on whether scrolling is happening.
- On each scroll event, compute an instantaneous velocity as the pixel distance scrolled since the previous scroll event divided by the elapsed time in milliseconds, normalized to a 60fps frame (i.e. treat 16.67ms as one frame) so the result reads as "pixels moved per frame."
- Smooth that raw per-event velocity with an exponential moving average (e.g. velocity += (instantVelocity - velocity) * 0.35) so a single noisy event doesn't spike the result.
- Run a separate requestAnimationFrame loop that: (a) if no scroll event has fired in roughly the last 2 frames, decays the velocity toward zero so the blur clears even if scrolling stops abruptly with no final low-velocity event; (b) computes a target blur amount in pixels proportional to the smoothed velocity, clamped to a maximum (e.g. 14px); (c) eases the actually-applied blur value toward that target with its own smoothing factor; (d) writes the result to the element's filter style only when it changes meaningfully.
- Add a small fixed-position readout on screen showing the live numeric velocity value so the relationship between scroll speed and blur amount is directly observable.
- Confirm behavior by testing: scrolling slowly should produce little to no blur, flicking the page fast should produce a clearly visible blur that scales with how hard you flick, and stopping (even abruptly) should bring the blur back to exactly zero within a few frames — not leave it stuck.`,
    },
  },
};

export default scrollVelocityBlur;
