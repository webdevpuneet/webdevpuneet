const sparklesText = {
  id: 'sparkles-text',
  title: 'Sparkles Text',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="sk-stage">
  <h1 class="sk-text" id="skText">Magic, on demand</h1>
  <p class="sk-sub">Sparkles spawn and twinkle around the headline, then fade.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0312;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;text-align:center}

.sk-stage{position:relative;padding:30px}
.sk-text{position:relative;display:inline-block;font-size:clamp(34px,8vw,72px);font-weight:900;letter-spacing:-.03em;background:linear-gradient(120deg,#f0abfc,#818cf8,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;z-index:1}
.sk-sub{margin-top:18px;color:#9a8bb5;font-size:15px}

.sk-spark{position:absolute;pointer-events:none;z-index:2;animation:skTwinkle var(--life) ease-in-out forwards}
.sk-spark svg{display:block;width:100%;height:100%}
@keyframes skTwinkle{
  0%{opacity:0;transform:scale(0) rotate(0deg)}
  35%{opacity:1;transform:scale(1) rotate(90deg)}
  100%{opacity:0;transform:scale(0) rotate(180deg)}
}`,

  js: `var text = document.getElementById('skText');
var stage = document.querySelector('.sk-stage');
var COLORS = ['#f0abfc', '#818cf8', '#22d3ee', '#fde047', '#fff'];

function spark() {
  var rect = text.getBoundingClientRect();
  var host = stage.getBoundingClientRect();
  // Spawn within the headline's bounding box, padded outward a little.
  var pad = 14;
  var x = rect.left - host.left - pad + Math.random() * (rect.width + pad * 2);
  var y = rect.top - host.top - pad + Math.random() * (rect.height + pad * 2);
  var size = 8 + Math.random() * 14;
  var color = COLORS[Math.floor(Math.random() * COLORS.length)];
  var life = (0.7 + Math.random() * 0.8).toFixed(2);

  var s = document.createElement('span');
  s.className = 'sk-spark';
  s.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:' + size + 'px;--life:' + life + 's';
  s.innerHTML = '<svg viewBox="0 0 24 24" fill="' + color + '"><path d="M12 0c.7 5.5 5.8 10.6 12 12-6.2 1.4-11.3 6.5-12 12-.7-5.5-5.8-10.6-12-12C6.2 10.6 11.3 5.5 12 0z"/></svg>';
  stage.appendChild(s);
  // Remove after its life so nodes never accumulate.
  setTimeout(function () { s.remove(); }, life * 1000 + 50);
}

// Respect users who prefer reduced motion.
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  setInterval(spark, 220);
  for (var k = 0; k < 6; k++) setTimeout(spark, k * 90);
}`,

  seo: {
    title: 'Sparkles Text — Free HTML CSS JS Twinkle Effect Snippet',
    description: `A gradient headline ringed by four-point sparkles that spawn at random, twinkle, rotate, and fade, with reduced-motion support. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Sparkles Text — Twinkling Four-Point Stars Around a Headline',
      description: `Sparkles text is the delightful headline treatment where tiny four-point stars continuously appear, twinkle, and fade around a gradient title — adding a sense of magic or premium polish to a hero. This snippet builds it in plain HTML, CSS, and vanilla JavaScript, spawning lightweight SVG sparkles at random positions within the headline's bounds and cleaning them up automatically.

**Spawning within the headline's box**

Each sparkle is positioned relative to the live headline. \`spark()\` reads the title's \`getBoundingClientRect\` and the stage's rect, then picks a random point inside the title's area padded outward by 14px, so sparkles cluster on and just around the letters rather than scattering across the whole page. Because the position is measured each spawn, the effect stays correctly placed even if the headline reflows or the viewport changes — there are no hard-coded coordinates.

**Randomized per-sparkle properties**

Variety is what sells a twinkle. Every sparkle gets a random size (8–22px), a random color from a small palette, and a random lifetime (0.7–1.5s) passed into CSS as a \`--life\` custom property. The randomness means no two sparkles look or behave identically, so the field feels organic rather than like a repeating pattern. The four-point star shape is a single inline SVG path, so it's crisp at any size and weighs almost nothing.

**The twinkle animation**

Each sparkle runs the \`skTwinkle\` keyframe once: it scales up from 0 while rotating to 90°, holds briefly at full size and opacity, then scales back down to 0 while continuing to rotate to 180° and fading out. The scale-from-zero-and-back is what makes it "pop and vanish" like a real sparkle, and the rotation adds life. The keyframe duration is the per-sparkle \`--life\`, so different sparkles twinkle at different speeds.

**Self-cleaning DOM**

Sparkles are created on a 220ms interval, which would pile up thousands of nodes over time. To prevent that, each sparkle removes itself with a \`setTimeout\` matched to its own lifetime (plus a small buffer), so the DOM only ever holds the handful currently visible. A short burst of six sparkles is also spawned on load so the effect is alive immediately rather than building up gradually.

**Respecting reduced motion**

Continuous motion can be uncomfortable or distracting for some users, so the script checks \`prefers-reduced-motion\` via \`matchMedia\` and skips the interval and the burst entirely when the user has requested reduced motion. The headline still renders with its gradient; it just doesn't twinkle. This is the accessible default for any decorative animation.

**The gradient headline**

The title itself uses a three-stop \`background-clip: text\` gradient (fuchsia to indigo to cyan) so it already shimmers in color, and the sparkles layer on top at a higher \`z-index\` to enhance it. The two work together: colorful type plus animated highlights.

**Customizing it**

Change the spawn interval for a denser or sparser field, adjust the size and lifetime ranges, swap the palette to match your brand, or widen the padding to throw sparkles further from the text. Replace the star path with a different glyph for a snow or confetti variant. Pair it with a [text generate](/ui-snippets/text-generate/) reveal or a [shimmer button](/ui-snippets/shimmer-button/) for a magical hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A gradient headline renders with sparkles twinkling around it.` },
      { title: 'Watch the twinkle', text: `Stars pop in, rotate, and fade at random sizes and colors.` },
      { title: 'Note the placement', text: `Sparkles cluster on and just around the letters.` },
      { title: 'Edit the palette', text: `Swap the COLORS array to match your brand.` },
      { title: 'Tune the density', text: `Change the spawn interval and lifetime ranges.` },
      { title: 'Check reduced motion', text: `Enable the OS setting and the twinkle turns off.` },
    ] },
    features: [
      { title: 'Bounds-aware spawning', text: `Sparkles appear within the measured headline box.` },
      { title: 'Randomized properties', text: `Per-sparkle size, color, and lifetime.` },
      { title: 'Pop-and-vanish keyframe', text: `Scale from zero, rotate, then fade out.` },
      { title: 'Inline SVG stars', text: `Crisp four-point shapes, no images.` },
      { title: 'Self-cleaning DOM', text: `Each sparkle removes itself after its life.` },
      { title: 'Load burst', text: `Six sparkles spawn immediately on load.` },
      { title: 'Reduced-motion safe', text: `Skips animation when the user prefers it.` },
      { title: 'Gradient headline', text: `Three-stop background-clip text underneath.` },
    ],
    useCases: [
      { title: 'Magical hero headlines', text: `Pair with a [shimmer button](/ui-snippets/shimmer-button/) CTA.` },
      { title: 'AI product titles', text: `Layer over a [text generate](/ui-snippets/text-generate/) reveal.` },
      { title: 'Seasonal landing pages', text: `Swap stars for snow above a [hero section](/ui-snippets/hero-section/).` },
      { title: 'Reward moments', text: `Echo the sparkle near a [confetti button](/ui-snippets/confetti-button/).` },
      { title: 'Premium upsells', text: `Highlight a feature on a [pricing card](/ui-snippets/pricing-card/).` },
      { title: 'Particle effect demos', text: `A reference for self-cleaning spawned elements.` },
    ],
    faqs: [
      { q: 'How do sparkles stay positioned on the headline?', a: `Each spawn reads the headline's getBoundingClientRect and the stage's rect, then picks a random point inside the title's area padded outward by 14px. Because the box is measured every time, sparkles stay correctly clustered on and around the letters even if the headline reflows or the viewport resizes — no coordinates are hard-coded.` },
      { q: 'Why does each sparkle look different?', a: `Every sparkle gets a random size from 8 to 22px, a random color from a small palette, and a random lifetime from 0.7 to 1.5s passed to CSS as a --life custom property used as the animation duration. That per-sparkle variation makes the field feel organic instead of a repeating, uniform pattern.` },
      { q: 'Does it leak DOM nodes over time?', a: `No. Sparkles spawn on a 220ms interval, but each one removes itself with a setTimeout matched to its own lifetime plus a small buffer. So the DOM only ever contains the few sparkles currently visible, not the thousands that would accumulate if they were never cleaned up.` },
      { q: 'Is the effect accessible?', a: `It checks prefers-reduced-motion with matchMedia and skips the spawning interval and the load burst entirely when the user has requested reduced motion, so the headline renders statically with its gradient and no twinkle. Honoring that media query is the accessible default for purely decorative motion.` },
      { q: 'How do I use this sparkles text in React, Vue, or Angular?', a: `Wrap the headline in a relatively-positioned container ref and spawn sparkles in a mount effect that sets up the interval and clears it on unmount. Append sparkle elements to the ref (or render a managed array in state and prune finished ones). Read prefers-reduced-motion before starting. The CSS keyframe ports directly; in Tailwind define skTwinkle in the config and drive the duration with an inline --life style.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the spawn-and-cleanup lifecycle by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how spark() converts the headline's getBoundingClientRect into a random spawn point relative to the stage container, or why each sparkle schedules its own removal with a setTimeout matched to its --life custom property instead of relying on a shared cleanup pass. The same assistant can help optimize it, for instance checking whether spawning a new DOM element and full inline SVG string every 220 milliseconds could be replaced with a small pool of reused elements for lower garbage collection pressure. It is just as useful for extending the effect: ask it to make sparkles react to mouse position instead of spawning purely at random, swap the four-point star path for a different shape to build a confetti or snow variant, or add a denser burst triggered on click instead of only continuous ambient sparkles. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "sparkles text" twinkling effect around a headline in plain HTML, CSS, and JavaScript — no canvas, no libraries.

Requirements:
- A headline styled with a multi-stop gradient using background-clip: text so the text itself is colorful, positioned inside a relatively-positioned stage container.
- A spawn function that, each time it runs, measures the headline's current bounding box with getBoundingClientRect (not hardcoded coordinates), picks a random x and y position within that box padded outward by a small margin, and creates a small absolutely-positioned element containing an inline SVG four-point star path filled with a randomly chosen color from a small fixed palette.
- Each spawned sparkle must receive a random size within a defined range and a random lifetime within a defined range (e.g. 0.7 to 1.5 seconds), passed to CSS as a custom property, and used as the duration of a single (non-looping) keyframe animation that scales the sparkle up from zero while rotating to 90 degrees, holds briefly, then scales back down to zero while continuing to rotate to 180 degrees and fading out.
- Every sparkle must remove itself from the DOM via a JavaScript setTimeout scheduled to match its own randomly assigned lifetime (plus a small buffer) — never rely on a separate periodic cleanup sweep, so the DOM never accumulates stale nodes no matter how long the effect runs.
- Spawn sparkles continuously on a fixed interval (e.g. every 200 to 250 milliseconds) plus an initial burst of several sparkles fired in quick succession on page load so the effect is immediately visible rather than building up gradually.
- Check the prefers-reduced-motion media query via matchMedia on load and skip starting the spawn interval and the initial burst entirely if the user has requested reduced motion, leaving the gradient headline static.`,
    },
  },
};

export default sparklesText;
