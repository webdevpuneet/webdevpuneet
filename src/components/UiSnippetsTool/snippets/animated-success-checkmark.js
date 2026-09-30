const animatedSuccessCheckmark = {
  id: 'animated-success-checkmark',
  title: 'Animated Success Checkmark',
  lastmod: '2026-06-22',
  category: 'animations',
  html: `<div class="asc-stage">
  <div class="asc-card" id="ascCard">
    <svg class="asc-mark" viewBox="0 0 52 52" id="ascMark">
      <circle class="asc-circle" cx="26" cy="26" r="24" fill="none"/>
      <path class="asc-check" fill="none" d="M14 27l8 8 16-16"/>
    </svg>
    <h3>Payment successful</h3>
    <p>Your order is confirmed — a receipt is on its way to your inbox.</p>
  </div>

  <button type="button" class="asc-replay" id="ascReplay">↻ Replay animation</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.asc-stage{display:flex;flex-direction:column;align-items:center;gap:20px}
.asc-card{background:#fff;border-radius:18px;padding:34px 30px;width:300px;text-align:center;box-shadow:0 18px 44px rgba(15,23,42,.12)}
.asc-card h3{font-size:18px;font-weight:800;color:#0f172a;margin:18px 0 8px;opacity:0;transform:translateY(8px);animation:ascText .4s ease .5s forwards}
.asc-card p{font-size:13px;color:#64748b;line-height:1.55;opacity:0;transform:translateY(8px);animation:ascText .4s ease .62s forwards}
@keyframes ascText{to{opacity:1;transform:translateY(0)}}

.asc-mark{width:84px;height:84px;display:block;margin:0 auto}
.asc-circle{stroke:#22c55e;stroke-width:3;stroke-dasharray:151;stroke-dashoffset:151;
  animation:ascCircle .55s cubic-bezier(.65,0,.45,1) forwards}
.asc-check{stroke:#22c55e;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:40;stroke-dashoffset:40;
  animation:ascCheck .35s cubic-bezier(.65,0,.45,1) .5s forwards}
@keyframes ascCircle{to{stroke-dashoffset:0}}
@keyframes ascCheck{to{stroke-dashoffset:0}}

/* Soft expanding ring that pulses once when the check lands */
.asc-card{position:relative}
.asc-pulse{position:absolute;top:34px;left:50%;width:84px;height:84px;margin-left:-42px;border-radius:50%;border:2px solid #22c55e;opacity:0;pointer-events:none}
.asc-pulse.go{animation:ascPulse .6s ease-out .62s}
@keyframes ascPulse{0%{opacity:.5;transform:scale(.6)}100%{opacity:0;transform:scale(1.5)}}

.asc-replay{background:#fff;border:1.5px solid #e2e8f0;border-radius:9px;padding:9px 16px;font-size:12.5px;font-weight:700;color:#475569;cursor:pointer;transition:border-color .15s}
.asc-replay:hover{border-color:#cbd5e1}`,

  js: `var card = document.getElementById('ascCard');

// Add the one-shot pulse ring element (kept out of HTML so replay is a clean reset).
var pulse = document.createElement('span');
pulse.className = 'asc-pulse';
card.appendChild(pulse);

function play() {
  // Cloning the SVG gives the browser a fresh element, which restarts its
  // stroke-draw animations from scratch (CSS animations only run once per load).
  var mark = document.getElementById('ascMark');
  mark.parentNode.replaceChild(mark.cloneNode(true), mark);
  // Re-trigger the pulse ring with the forced-reflow restart pattern.
  pulse.classList.remove('go');
  void pulse.offsetWidth;
  pulse.classList.add('go');
}

document.getElementById('ascReplay').addEventListener('click', play);

// Kick the pulse on first load to sync with the CSS animation.
requestAnimationFrame(function () { pulse.classList.add('go'); });`,

  seo: {
    title: 'Animated Success Checkmark — SVG Draw HTML CSS',
    description: `An SVG success checkmark that draws its circle and tick with stroke animation, plus a pulse ring and replay. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Animated Success Checkmark — Stroke-Drawn SVG Tick with Pulse Ring',
      description: `The animated green checkmark that draws itself after a successful payment, signup, or save is a tiny moment of delight that makes a confirmation feel earned rather than abrupt. This snippet builds that effect with pure SVG and CSS — no library, no images — using the classic stroke-dash drawing technique, plus a soft pulse ring and staggered text reveal, wrapped in a confirmation card with a replay button.

**How the draw-on effect works**

The checkmark is a single SVG with two shapes: a \`<circle>\` and a \`<path>\` for the tick. Both are animated with the \`stroke-dasharray\` / \`stroke-dashoffset\` technique — the foundation of every "self-drawing" SVG. \`stroke-dasharray\` is set to the shape's total length (151 for the circle's circumference, ~40 for the tick path), which turns the stroke into a single dash exactly as long as the line. \`stroke-dashoffset\` starts equal to that length, pushing the entire dash out of view, and animates to zero — which slides the dash into place, making the line appear to draw itself from start to end. The circle draws first; the tick starts at a 0.5s delay so it lands *after* the circle completes, reading as "outline, then confirm."

**Easing that feels physical**

Both animations use \`cubic-bezier(.65,0,.45,1)\` — a smooth ease that accelerates into the draw and settles at the end, which feels more deliberate than a linear sweep. The tick uses \`stroke-linecap: round\` and \`stroke-linejoin: round\` so the drawn line has soft ends, matching the rounded aesthetic of modern confirmation UIs.

**The pulse ring and text stagger**

When the tick lands, a faint green ring scales up and fades out once (\`ascPulse\`), giving the checkmark a subtle "pop" of emphasis at exactly the moment of completion. The heading and description fade and rise in just after (\`ascText\` at 0.5s and 0.62s delays), so the eye follows the sequence: circle draws → tick draws → ring pulses → text appears. This choreography is what separates a polished confirmation from a static green icon.

**Replaying a CSS animation cleanly**

CSS animations only run once on load, so re-triggering them is the tricky part. The replay button clones the SVG and replaces the original — a fresh element restarts its animations from scratch — and re-triggers the pulse and text with the forced-reflow pattern (\`void element.offsetWidth\` between removing and re-adding the class), which flushes the style change so the browser treats the re-added animation as new. This is the standard, reliable way to restart a CSS animation on demand.

**Why SVG stroke animation over a GIF or Lottie**

A stroke-animated SVG is a few lines of markup, scales crisply to any size, inherits color from CSS, weighs nothing, and needs no runtime library — unlike a GIF (fixed resolution, large file, no transparency control) or a Lottie JSON (requires a player library). For a simple checkmark, the native technique is the right tool, and it's trivial to recolor (swap the green) or resize (the \`viewBox\` keeps it sharp) for any brand.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A confirmation card renders and immediately plays: the circle draws, the tick draws, a ring pulses, and the text fades in.` },
      { title: 'Watch the sequence', text: `Note the choreography — circle outline first, then the checkmark, then the pulse and staggered heading/description.` },
      { title: 'Replay it', text: `Click "Replay animation" to restart the whole sequence cleanly from the beginning.` },
      { title: 'Recolor it', text: `Change the green (#22c55e) on the circle, check, and pulse to match your brand's success color.` },
      { title: 'Resize it', text: `Adjust the .asc-mark width/height — the SVG viewBox keeps the stroke crisp at any size.` },
      { title: 'Trigger it on a real event', text: `Show the card (or call the play() function) after a successful API response — a payment, signup, or save.` },
    ] },
    features: [
      { title: 'Pure SVG stroke-draw animation', text: `The circle and tick draw themselves via stroke-dasharray/dashoffset — no images, GIFs, or animation library.` },
      { title: 'Sequenced choreography', text: `Circle draws first, the tick lands after it completes, then a pulse ring and staggered text — a deliberate sequence.` },
      { title: 'Physical easing', text: `A cubic-bezier ease accelerates into each draw and settles at the end, feeling intentional rather than mechanical.` },
      { title: 'One-shot pulse ring', text: `A faint ring scales and fades once when the tick lands, emphasizing the moment of completion.` },
      { title: 'Staggered text reveal', text: `The heading and description fade and rise in just after the check, guiding the eye through the confirmation.` },
      { title: 'Clean replay', text: `Clones the SVG and uses the forced-reflow pattern to restart CSS animations reliably on demand.` },
      { title: 'Crisp and recolorable', text: `The SVG scales sharply to any size via its viewBox and inherits the success color from CSS.` },
      { title: 'Zero dependencies, tiny footprint', text: `A few lines of SVG and CSS replace a heavy GIF or Lottie player for a simple success state.` },
    ],
    useCases: [
      { title: 'Payment and checkout confirmation', text: `Confirm a successful order or payment — pair with a [confetti celebration card](/ui-snippets/confetti-celebration-card/) for a bigger moment.` },
      { title: 'Form submission success', text: `Replace a plain "Thanks!" with a drawn checkmark after a contact or signup form submits.` },
      { title: 'Save and sync indicators', text: `Show a quick checkmark when a document saves or settings sync, reinforcing a [form autosave indicator](/ui-snippets/form-autosave-indicator/).` },
      { title: 'Onboarding step completion', text: `Mark a completed onboarding step or task with a satisfying draw-on tick.` },
      { title: 'Email and subscription confirmation', text: `Confirm a verified email or completed subscription with an animated success state.` },
      { title: 'Learning SVG stroke animation', text: `A clear reference for the stroke-dasharray draw technique and CSS animation restart — compare with an [SVG progress ring](/ui-snippets/svg-progress-ring/) for the gauge variant.` },
      { icon: 'CODE', title: 'Related: Anime.js Stagger Grid', desc: 'See the [Anime.js Stagger Grid](/ui-snippets/anime-js-stagger-grid/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Circular Reveal Theme Toggle (View Transitions API)', desc: 'See the [Circular Reveal Theme Toggle (View Transitions API)](/ui-snippets/circular-reveal-theme-toggle/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the self-drawing SVG effect actually work?', a: `Each shape's stroke-dasharray is set to its total length, turning the outline into one dash exactly as long as the line. stroke-dashoffset starts at that same length (pushing the dash out of sight) and animates to 0, which slides the dash into view so the line appears to draw itself. The circle's length is its circumference (2πr ≈ 151 for r=24) and the tick's is its path length (~40).` },
      { q: 'How do I trigger the animation on a real success event?', a: `Hide the card initially, then reveal it (or mount the component) when your success event fires — a successful fetch response, a completed payment webhook, a saved form. Because CSS animations run on element insertion/load, showing the card plays the sequence; to replay without remounting, call the play() function which restarts the animations.` },
      { q: 'Why clone the SVG to replay instead of just toggling a class?', a: `CSS animations only run once per element load and don't restart on a class toggle alone. Replacing the element with a fresh clone gives the browser a new element that runs its animations from scratch. For the non-SVG parts (pulse, text) the forced-reflow trick — remove class, read offsetWidth, re-add class — flushes styles so the re-added animation is treated as new.` },
      { q: 'How do I change the color or size?', a: `Recolor by changing #22c55e on the .asc-circle, .asc-check, and .asc-pulse to your success color. Resize via the .asc-mark width/height — the SVG viewBox ("0 0 52 52") keeps the stroke crisp at any scale. If you change the circle radius, recompute its dasharray to the new circumference (2πr).` },
      { q: 'How do I use this success checkmark in React, Vue, or Angular?', a: `In React, render the SVG in JSX and key it on a success counter so a new key remounts and replays the animation; in Vue, use a :key bound to a trigger ref; in Angular, use *ngIf to mount on success or a key-like trick. The CSS and stroke-dash technique are framework-agnostic — only the replay/remount mechanism uses each framework's reconciliation.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stroke-length math by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the circle's stroke-dasharray is set to roughly 151 while the check path's is around 40, and how those specific numbers relate to the actual geometry (the circle's circumference versus the check path's drawn length) rather than being arbitrary. The same assistant is useful for optimizing it — asking whether the clone-and-replace technique used to replay the SVG has any downsides versus using the Web Animations API's own restart capabilities. It's just as good for extending it: ask it to add a subtle confetti burst timed to the pulse ring, generalize the component so the same choreography works for an error or warning variant with a different icon path, or wire the replay trigger to fire automatically whenever a real async success event resolves instead of only via the manual button. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "animated success checkmark" confirmation card in plain HTML, CSS, and JavaScript — no libraries, using SVG stroke-drawing, a one-shot pulse ring, and a clean replay mechanism.

Requirements:
- A card containing an SVG success mark made of a circle and a checkmark path, plus a heading and description text, and a separate "replay" button outside the card.
- Set each SVG shape's stroke-dasharray to match its own real length (the circle's circumference for the circle, the path's drawn length for the check) and its stroke-dashoffset to start at that same value so the shape is fully hidden, then animate stroke-dashoffset to zero via CSS keyframes so each shape appears to draw itself on. The circle must finish drawing before the checkmark path begins, using a deliberate animation-delay on the check so the sequence reads as outline-then-tick, not both at once.
- Add a separate ring element, initially invisible, positioned concentrically around the mark, that plays a single keyframe animation scaling up from a slightly-shrunk state to a slightly-enlarged state while fading its opacity from partial to zero, timed to start right as the checkmark finishes drawing, giving a one-time "pulse" effect. This ring must be created and appended via JavaScript (not present in the initial HTML) so that replaying the sequence is a clean reset.
- Fade and slide the heading and description into view with their own staggered delays, timed to happen just after the pulse starts, so the full sequence is: circle draws, checkmark draws, pulse ring plays, then text settles in.
- Implement a replay function that: clones the SVG element and replaces the original in the DOM (since CSS animations do not restart merely by toggling a class) to restart the stroke-drawing keyframes from scratch, and separately restarts the pulse ring's animation using the forced-reflow pattern (remove its trigger class, read a layout property like offsetWidth to force a reflow, then re-add the class).
- Trigger the pulse (but not a full replay) automatically once via requestAnimationFrame right after the page loads, so the first playthrough is synced correctly with the CSS keyframes without needing a manual click.`,
    },
  },
};

export default animatedSuccessCheckmark;
