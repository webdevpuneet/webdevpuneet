const liquidButton = {
  id: 'liquid-button',
  title: 'Liquid Button',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="lq-stage">
  <svg width="0" height="0" class="lq-defs"><filter id="lqGoo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo"/><feBlend in="SourceGraphic" in2="goo"/></filter></svg>

  <button type="button" class="lq-btn" id="lqBtn">
    <span class="lq-blobs" id="lqBlobs"></span>
    <span class="lq-label">Subscribe</span>
  </button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;display:flex;justify-content:center;align-items:center;min-height:100vh}

.lq-stage{padding:40px}
.lq-btn{position:relative;border:none;background:none;padding:16px 36px;border-radius:999px;cursor:pointer;font-family:inherit;font-size:16px;font-weight:800;color:#fff;isolation:isolate}
.lq-label{position:relative;z-index:2;pointer-events:none}

.lq-blobs{position:absolute;inset:0;z-index:1;border-radius:inherit;filter:url(#lqGoo);overflow:visible}
.lq-blobs::before{content:'';position:absolute;inset:0;border-radius:inherit;background:#6366f1}
.lq-blob{position:absolute;top:50%;width:34px;height:34px;border-radius:50%;background:#6366f1;transform:translate(-50%,-50%) scale(0)}`,

  js: `var btn = document.getElementById('lqBtn');
var host = document.getElementById('lqBlobs');

// On hover, fire a series of gooey blobs that rise from the bottom edge. The SVG
// goo filter merges any overlapping circles into one organic liquid mass.
var timers = [];
function fluidIn() {
  clear();
  var r = btn.getBoundingClientRect();
  var n = 9;
  for (var i = 0; i < n; i++) {
    (function (i) {
      timers.push(setTimeout(function () {
        var b = document.createElement('span');
        b.className = 'lq-blob';
        var x = (i + 0.5) / n * 100;
        b.style.left = x + '%';
        host.appendChild(b);
        b.animate(
          [{ transform: 'translate(-50%,40px) scale(0)' },
           { transform: 'translate(-50%,-50%) scale(1.5)', offset: .6 },
           { transform: 'translate(-50%,-50%) scale(1.5)' }],
          { duration: 600, easing: 'cubic-bezier(.34,1.4,.5,1)', fill: 'forwards' }
        );
      }, i * 35));
    })(i);
  }
}
function fluidOut() {
  clear();
  Array.prototype.slice.call(host.querySelectorAll('.lq-blob')).forEach(function (b, i) {
    setTimeout(function () {
      b.animate([{ transform: getComputedStyle(b).transform },
                 { transform: 'translate(-50%,40px) scale(0)' }],
        { duration: 400, easing: 'ease-in', fill: 'forwards' }).onfinish = function () { b.remove(); };
    }, i * 25);
  });
}
function clear() { timers.forEach(clearTimeout); timers = []; }

btn.addEventListener('pointerenter', fluidIn);
btn.addEventListener('pointerleave', fluidOut);
btn.addEventListener('click', function () {
  var l = btn.querySelector('.lq-label');
  l.textContent = 'Subscribed ✓';
  setTimeout(function () { l.textContent = 'Subscribe'; }, 1400);
});`,

  seo: {
    title: 'Liquid Button — Free HTML CSS JS Gooey Hover Snippet',
    description: `A button whose fill rises as gooey metaballs that merge into one liquid mass on hover, using an SVG goo filter. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Liquid Button — Gooey Metaball Fill With an SVG Goo Filter',
      description: `The liquid button is the gooey hover effect where the button's fill rises from the bottom as a cluster of blobs that merge into one organic liquid surface — the classic "metaball" look. This snippet builds it with plain HTML, an SVG filter for the goo, CSS, and vanilla JavaScript using the Web Animations API to launch the blobs.

**The SVG goo filter**

The magic is a reusable SVG filter, \`#lqGoo\`. It blurs the source graphic with \`feGaussianBlur\`, then runs the blurred result through a \`feColorMatrix\` that cranks the alpha channel's contrast (\`0 0 0 20 -9\` on the alpha row). The high alpha multiply plus the negative bias turns the soft blurred edges into a hard threshold: anywhere the blur is dense enough becomes fully opaque, anywhere it's faint becomes transparent. The effect is that separate blurred circles which overlap fuse into a single smooth blob with organic necks between them — exactly how liquid metaballs merge. Applying \`filter: url(#lqGoo)\` to the blob container makes every circle inside it gooey.

**Blobs that rise and merge**

On \`pointerenter\`, the script fires nine blobs in quick succession (35ms apart), each positioned at an even horizontal slot across the button. Each blob animates with the Web Animations API from below the button (\`translateY(40px) scale(0)\`) up into place at \`scale(1.5)\`, using a springy \`cubic-bezier(.34, 1.4, .5, 1)\` that overshoots. Because the blobs are large and adjacent, they overlap as they rise — and the goo filter fuses them into one wobbling liquid fill that climbs the button. A solid base fill (the \`::before\`) sits under them so the final state is a clean filled pill.

**Draining on exit**

On \`pointerleave\`, each existing blob animates back down and shrinks to zero on a slight stagger, then removes itself in the \`onfinish\` callback. The staggered drain makes the liquid appear to recede and drip away rather than vanishing instantly. Pending entrance timers are cleared first so a quick hover-in-hover-out doesn't leave orphaned blobs mid-flight.

**Label above the goo**

The text label sits at \`z-index: 2\` with \`pointer-events: none\`, above the gooey fill layer, so it stays crisp and readable while the liquid animates behind it. \`isolation: isolate\` on the button contains the filter's compositing to the button itself. Clicking swaps the label to a "Subscribed ✓" confirmation for a moment.

**Why the Web Animations API**

Each blob needs its own timed, self-cleaning animation, and \`element.animate()\` returns a handle with an \`onfinish\` hook — perfect for fire-and-forget blobs that remove themselves when done. It avoids juggling CSS animation classes and \`animationend\` listeners across nine short-lived elements.

**Customizing it**

Change the blob count and size for a chunkier or finer liquid, tune the \`stdDeviation\` and the alpha matrix for more or less gooeyness, recolor the blobs and base fill, or adjust the spring easing. Make it a link by swapping the element. Pair it with a [shimmer button](/ui-snippets/shimmer-button/) or place it in an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) for a lively call to action.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A rounded button renders with a label.` },
      { title: 'Hover the button', text: `Gooey blobs rise from the bottom and merge into a liquid fill.` },
      { title: 'Leave the button', text: `The liquid drains and drips away on a stagger.` },
      { title: 'Click it', text: `The label flips to a Subscribed confirmation briefly.` },
      { title: 'Tune the goo', text: `Adjust the blur and alpha matrix for more or less merge.` },
      { title: 'Recolor it', text: `Change the blob and base fill colors.` },
    ] },
    features: [
      { title: 'SVG goo filter', text: `Blur plus alpha contrast fuses overlapping blobs.` },
      { title: 'Rising metaballs', text: `Nine blobs climb and merge into liquid.` },
      { title: 'Springy entrance', text: `An overshooting cubic-bezier sells the wobble.` },
      { title: 'Staggered drain', text: `Blobs recede and drip on exit.` },
      { title: 'Self-cleaning blobs', text: `Each removes itself on finish.` },
      { title: 'Crisp label', text: `Text stays above the goo, pointer-events none.` },
      { title: 'Contained compositing', text: `isolation keeps the filter to the button.` },
      { title: 'Click confirmation', text: `Label swaps to a success state.` },
    ],
    useCases: [
      { title: 'Playful calls to action', text: 'Pair with an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) for a lively button whose fill rises as nine blobs merging into one liquid surface.' },
      { title: 'Newsletter signups', text: 'Use inside a [newsletter signup](/ui-snippets/newsletter-signup/) form, with an overshooting cubic-bezier giving the fill a springy entrance.' },
      { title: 'Landing heroes', text: 'Place under a [lamp header](/ui-snippets/lamp-header/) title, with blobs receding and dripping away in a staggered drain on exit.' },
      { title: 'Creative portfolios', text: 'Match a [shimmer button](/ui-snippets/shimmer-button/) elsewhere on a creative site, or use as the action on a [pricing card](/ui-snippets/pricing-card/).' },
      { title: 'SVG goo filter reference', text: 'Learn how blur followed by an alpha contrast fuses overlapping blobs into a single organic shape through SVG metaball merging.' },
      { icon: 'CODE', title: 'Related: Screen Orientation Lock Toggle', desc: 'See the [Screen Orientation Lock Toggle](/ui-snippets/screen-orientation-lock-toggle/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do separate blobs merge into one liquid shape?', a: `The blob container has an SVG goo filter applied: feGaussianBlur softens the circles, then feColorMatrix sharply increases the alpha channel's contrast (multiply 20, bias -9). That thresholds the blur so dense overlaps become fully opaque and faint edges vanish, fusing overlapping circles into a single smooth blob with organic necks — the metaball effect.` },
      { q: 'How do the blobs rise and wobble?', a: `On hover, nine blobs are launched 35ms apart at even horizontal slots. Each animates with the Web Animations API from below the button at scale 0 up to scale 1.5 using a springy cubic-bezier(.34,1.4,.5,1) that overshoots. Being large and adjacent, they overlap as they climb, and the goo filter fuses them into one liquid fill.` },
      { q: 'Why use the Web Animations API instead of CSS?', a: `Each blob is a short-lived element that needs its own timed animation and must remove itself when done. element.animate() returns a handle with an onfinish callback, perfect for fire-and-forget blobs, and avoids managing CSS animation classes and animationend listeners across nine elements that come and go.` },
      { q: 'Does the label stay readable during the animation?', a: `Yes. The label sits at z-index 2 with pointer-events: none, above the gooey fill layer, so it remains crisp while the liquid animates behind it. isolation: isolate on the button keeps the filter's compositing contained so it doesn't affect surrounding content.` },
      { q: 'How do I use this liquid button in React, Vue, or Angular?', a: `Include the SVG filter once in your app (it can live in a shared layout). Render the button as a component and trigger the blob animations from pointerenter/pointerleave handlers that append blobs to a ref'd container with element.animate, cleaning them up on finish and clearing timers on unmount. In Tailwind, style the pill with utilities and keep the goo filter and blob logic in the component.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to decode the feColorMatrix values from memory. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the alpha row "0 0 0 20 -9" in the feColorMatrix turns a soft feGaussianBlur into the hard-edged metaball threshold that fuses overlapping circles, and why isolation: isolate on the button matters for where that filter's compositing is contained. The same assistant can help optimize it, for instance asking whether firing nine separate element.animate() calls with staggered setTimeout delays on every pointerenter could be simplified without losing the springy stagger, or how to guard against orphaned blobs if a user hovers in and out rapidly. It is also useful for extending the effect: ask it to make the blob color shift on click, add a second goo layer with a different blur radius for a thicker liquid look, or adapt the same filter technique to a gooey navigation menu. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "liquid button" with a gooey metaball hover fill in plain HTML, CSS, and JavaScript, using an SVG filter for the goo effect and the Web Animations API for the blobs — no canvas, no libraries.

Requirements:
- A single reusable SVG filter (referenced once via filter: url(#id)) built from a feGaussianBlur with a noticeable stdDeviation, feeding into a feColorMatrix whose alpha row sharply increases contrast (a large positive multiplier and a negative bias) so that overlapping blurred shapes fuse into one hard-edged blob instead of staying soft and translucent.
- A button containing a text label positioned above the gooey layer with a higher z-index and pointer-events: none, so the goo animation never intercepts clicks or blurs the text, and isolation: isolate on the button so the filter's compositing does not leak onto surrounding elements.
- On pointerenter, launch a fixed number of circular blob elements (e.g. nine) at staggered short delays across evenly spaced horizontal positions along the button, each animated with element.animate() from below the button at scale 0 up to an overshooting scale using a springy cubic-bezier easing, so they rise and overlap into the gooey fill layer.
- On pointerleave, animate each currently-present blob back down and to scale 0 on a staggered delay (not all at once), removing each blob element from the DOM in its animation's onfinish callback so nothing accumulates.
- Any pending entrance timers must be cancelled if the pointer leaves before all blobs have launched, so a fast hover-in-hover-out never leaves orphaned blobs mid-animation.
- Clicking the button must not interrupt or reset the goo animation; it should only swap the label text to a temporary confirmation state for a couple of seconds before reverting.`,
    },
  },
};

export default liquidButton;
