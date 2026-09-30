const loaderBrandLogoDraw = {
  id: 'loader-brand-logo-draw',
  title: 'SVG Logo Draw-In Loader',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="ld-stage">
  <svg class="ld-svg" viewBox="0 0 200 200" fill="none">
    <!-- Abstract geometric mark: an interlocking triangle + diamond outline,
         a stand-in for a real brand wordmark/logo. -->
    <path class="ld-path ld-outer" d="M100 20 L172 70 L146 158 L54 158 L28 70 Z" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="ld-path ld-inner" d="M100 62 L134 116 L66 116 Z" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <div class="ld-label" id="ldLabel">Loading</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center}

.ld-stage{display:flex;flex-direction:column;align-items:center;gap:18px}
.ld-svg{width:140px;height:140px}

.ld-path{stroke:#818cf8;stroke-width:3}
.ld-outer{stroke-dasharray:420;stroke-dashoffset:420;animation:ldDrawOuter 3.6s cubic-bezier(.65,0,.35,1) infinite}
.ld-inner{stroke:#22d3ee;stroke-dasharray:180;stroke-dashoffset:180;animation:ldDrawInner 3.6s cubic-bezier(.65,0,.35,1) infinite}

/* Draw in over the first ~40% of the loop, hold fully drawn, then draw back
   out (reverse) over the final ~30% before resetting to start the loop again
   — the stroke itself IS the loading animation, not a spinner layered on top
   of a static logo. */
@keyframes ldDrawOuter{
  0%{stroke-dashoffset:420}
  38%{stroke-dashoffset:0}
  62%{stroke-dashoffset:0}
  100%{stroke-dashoffset:-420}
}
@keyframes ldDrawInner{
  0%,10%{stroke-dashoffset:180}
  48%{stroke-dashoffset:0}
  62%{stroke-dashoffset:0}
  100%{stroke-dashoffset:-180}
}

.ld-label{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#6b7591}
.ld-label::after{content:'';display:inline-block;width:0;overflow:hidden;vertical-align:bottom;animation:ldDots 1.4s steps(4) infinite}
@keyframes ldDots{to{width:1.4em}}
@media (prefers-reduced-motion:reduce){.ld-path,.ld-label::after{animation:none;stroke-dashoffset:0}}`,

  js: '',

  seo: {
    title: 'SVG Logo Draw-In Loader — Stroke-Dashoffset Wordmark Loading Animation',
    description: `A loading indicator built from an SVG mark whose outline draws itself in via stroke-dashoffset, holds, then draws back out in a continuous loop — the stroke is the loader. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'SVG Logo Draw-In Loader — The Outline Itself Is the Loading Animation',
      description: `Most loading indicators are generic — a spinner or bar that could belong to any product. A logo draw-in loader instead uses the brand's own mark as the animation: its outline draws itself stroke by stroke, holds fully formed for a beat, then draws back out and repeats, so the wait itself reinforces the brand rather than showing an interchangeable spinner borrowed from any other site. This snippet builds the technique with an abstract geometric mark (a triangle-and-diamond outline, standing in for a real logo shape) in plain HTML, CSS, and SVG — no JavaScript required, the whole animation is \`stroke-dashoffset\` keyframes.

**The stroke-dasharray / stroke-dashoffset trick**

Each \`<path>\` is given a \`stroke-dasharray\` equal to its own total path length (measured by inspecting the rendered path, or approximated), which turns the stroke into one dash exactly as long as the path with no gap. Setting \`stroke-dashoffset\` to that same length shifts the entire dash out of view, so nothing is visible — the path is present in the DOM but invisible. Animating \`stroke-dashoffset\` from that full length down to \`0\` slides the dash back into view along the path, which reads as the line drawing itself in real time, tip to tail. This is the same fundamental technique used for animated SVG checkmarks and signature effects, applied here as a continuously looping loader instead of a one-shot reveal.

**Draw in, hold, draw out — not just a fade**

The keyframes don't stop at a drawn-in state; \`ldDrawOuter\` and \`ldDrawInner\` animate to \`stroke-dashoffset: 0\` by roughly 40% of the loop, hold there until about 60%, and then continue past \`0\` to a negative offset equal to the path length — which slides the dash back out the far end, undrawing the line in the same direction it was drawn, rather than reversing the draw motion backward. That three-phase shape (draw in, hold, draw out) is what makes the loop read as a deliberate, repeating gesture instead of a shape that merely fades or flickers.

**Two paths, gently offset**

The inner diamond's keyframes are nudged so it begins drawing slightly after the outer shape and finishes its hold slightly earlier, giving the two strokes a small independent rhythm rather than animating in perfect lockstep — a subtlety that keeps a two-part mark from reading as one flat, single-timed animation.

**Why an abstract mark here**

The shape in this snippet is a simple interlocking geometric outline, deliberately generic so the pattern is obviously a demonstrable technique rather than tied to any specific company. Swap the \`<path>\` data for your own logo's outline (most vector logo files export as SVG path data directly, or can be traced from one), recompute \`stroke-dasharray\` to match the new path's length, and the draw-in mechanics carry over unchanged.

**A no-JavaScript, CSS-only loader**

Because the entire effect is expressed as CSS \`@keyframes\` on \`stroke-dashoffset\`, there's no JavaScript driving the animation at all — it's as lightweight and dependency-free as a spinner, but branded. Pair it with a [top loading bar](/ui-snippets/top-loading-bar/) for a route transition underneath, or an [orbit loader](/ui-snippets/orbit-loader/) as a non-branded fallback where a wordmark doesn't fit.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The outline mark begins invisible and starts drawing itself in immediately.` },
      { title: 'Watch the full cycle', text: `It draws in, holds fully formed for a moment, then draws back out and repeats.` },
      { title: 'Swap in your own logo', text: `Replace the path "d" data with your logo's outline (export as SVG path data).` },
      { title: 'Recompute the dash length', text: `Set stroke-dasharray/stroke-dashoffset to match your new path's total length.` },
      { title: 'Tune the timing', text: `Adjust the keyframe percentages to change how long it holds versus draws.` },
      { title: 'Restyle it', text: `Change the stroke colors and width to match your brand.` },
    ] },
    features: [
      { title: 'Stroke-dashoffset draw-in', text: `The path outline itself draws in over time — no separate spinner overlay.` },
      { title: 'Three-phase loop', text: `Draw in, hold fully formed, then draw back out before resetting.` },
      { title: 'Directional undraw', text: `The line retracts the same direction it drew, not a reversed animation.` },
      { title: 'Two independently-timed paths', text: `The inner and outer shapes draw with a subtle offset rhythm.` },
      { title: 'Zero JavaScript', text: `The entire animation is CSS @keyframes on stroke-dashoffset.` },
      { title: 'Brand-mark friendly', text: `Swap the path data for any real logo outline with the same mechanics.` },
      { title: 'Animated ellipsis label', text: `A steps() keyframe grows a "…" beneath the mark without extra markup.` },
      { title: 'Reduced-motion safe', text: `Paths render fully drawn and static under prefers-reduced-motion.` },
    ],
    useCases: [
      { title: 'Branded splash and boot screens', text: `A first-paint loader that reinforces identity instead of a generic spinner.` },
      { title: 'App and site preloaders', text: `Show while initial assets or auth resolve, alongside a [loading overlay](/ui-snippets/loading-overlay/).` },
      { title: 'Login and auth transitions', text: `A polished wait during sign-in before redirecting.` },
      { title: 'Marketing and agency sites', text: `A signature loading moment for portfolio or landing pages.` },
      { title: 'Print-to-digital brand systems', text: `Reuse a logo's existing vector outline with no new asset needed.` },
      { title: 'Learning SVG stroke animation', text: `A clean reference for stroke-dasharray/dashoffset draw effects.` },
      { icon: 'CODE', title: 'Related: Multi-File Upload Queue', desc: 'See the [Multi-File Upload Queue](/ui-snippets/loader-file-upload-multi-queue/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the draw-in effect actually work?', a: `Each path's stroke-dasharray is set to its own total length, turning the stroke into one dash exactly as long as the path with no visible gap. Setting stroke-dashoffset to that same length shifts the dash entirely out of view. Animating dashoffset down to 0 slides the dash back into view along the path, which reads as the line drawing itself in from start to end.` },
      { q: 'How do I get the correct stroke-dasharray value for my own logo?', a: `Render the path in a browser and read its length via the DOM API: document.querySelector('path').getTotalLength(). Use that number for both stroke-dasharray and the starting stroke-dashoffset. Since this snippet is CSS-only, you would either hardcode the measured value or add a small script that sets it from getTotalLength() once on load.` },
      { q: 'Why does it draw back out instead of just fading away?', a: `The keyframes continue past stroke-dashoffset: 0 to a negative value equal to the path length, which slides the dash out the far end in the same direction it drew in, undrawing the line rather than reversing the draw motion. This keeps the loop reading as one continuous directional gesture rather than a draw-then-fade that would look like two different effects stitched together.` },
      { q: 'Can I use my real company logo with this technique?', a: `Yes — export your logo as an SVG and use its path data directly in the path d attribute (most vector logo files, including ones from Illustrator or Figma, export cleanly to SVG paths). This snippet uses an abstract geometric mark specifically so the pattern reads as a demonstrable technique rather than being tied to any one company's branding.` },
      { q: 'How do I use this logo draw-in loader in React, Vue, or Angular?', a: `Render the SVG markup as-is inside a component — the animation is pure CSS with no JavaScript dependency, so it needs no lifecycle hooks or state. If your logo path length varies per instance, compute it once with getTotalLength() in a mount effect and set the dasharray/dashoffset as inline styles or CSS custom properties instead of hardcoding them.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how setting stroke-dasharray to a path's own length and animating stroke-dashoffset from that length down to 0 makes the stroke appear to draw itself in, and why the keyframes continue past 0 into negative dashoffset values to undraw the line in the same direction rather than reversing the animation. It's worth asking for help adapting it too: how to correctly measure a real logo's path length with getTotalLength() so the dasharray value isn't just approximated, and how the outer and inner shapes' slightly offset keyframe percentages create a subtle two-part rhythm instead of both paths moving in perfect lockstep. For extending it, ask for a one-shot (non-looping) version suitable for a page's first paint only, a variant where the stroke color shifts partway through the draw, or a script that swaps in a real uploaded SVG's path data and computes its dasharray automatically. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a looping "logo draw-in" loading animation using an SVG outline shape in plain HTML and CSS only — no JavaScript, no spinner element layered on top of the shape.

Requirements:
- An SVG containing at least one path element forming a simple abstract geometric outline (not a real company logo), with stroke-dasharray set to a value matching that path's total rendered length so the stroke forms exactly one dash equal to the whole path with no visible gap.
- Animate stroke-dashoffset via a CSS keyframe from a starting value equal to the full dash length (the path fully hidden) down to 0 (the path fully drawn and visible), so the stroke visibly draws itself in along the path from one end to the other.
- The keyframe must not stop at the fully-drawn state: after holding briefly at stroke-dashoffset: 0, continue animating dashoffset to a negative value equal to the path's length, so the stroke appears to retract and undraw itself out the same end it finished drawing toward, before the loop resets to fully hidden and repeats continuously.
- If the SVG contains more than one path (for example an outer and an inner shape), give each path's keyframe animation a slightly different timing offset so the two shapes don't draw and undraw in perfect synchrony, producing a subtle layered rhythm.
- No JavaScript may drive any part of the drawing animation — it must be achievable purely with CSS keyframes on stroke-dasharray and stroke-dashoffset.
- Add a prefers-reduced-motion media query that disables the draw animation and leaves the path rendered fully visible (dashoffset at 0) for users who have that preference set.`,
    },
  },
};

export default loaderBrandLogoDraw;
