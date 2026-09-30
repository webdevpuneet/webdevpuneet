const svgLiquidTextWave = {
    id: 'svg-liquid-text-wave',
    title: 'SVG Liquid Text Wave',
    category: 'animations',
    html: `<div class="scene">
  <svg viewBox="0 0 800 220" class="liquid-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="liquidFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence id="turb" type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="7" result="noise">
          <animate attributeName="baseFrequency" dur="9s" values="0.012 0.04;0.02 0.06;0.012 0.04" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22d3ee" />
        <stop offset="50%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#a855f7" />
      </linearGradient>
    </defs>
    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" class="liquid-text" filter="url(#liquidFilter)">FLUID</text>
  </svg>
  <p class="hint">Distortion powered by an animated SVG feTurbulence + feDisplacementMap filter</p>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #050914; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.scene { text-align: center; max-width: 820px; width: 100%; }
.liquid-svg { width: 100%; height: auto; }

.liquid-text {
  font-size: 130px;
  font-weight: 900;
  letter-spacing: 6px;
  fill: url(#liquidGradient);
}

.hint { font-size: 12px; color: #475569; margin-top: 6px; }`,
    js: '',

  seo: {
    title: 'SVG Liquid Text Wave — feTurbulence Distortion Effect',
    description: 'Animated liquid text distortion built with SVG feTurbulence and feDisplacementMap filters warping a gradient headline in a continuous wave. Exports to React, Vue & Tailwind.',
    about: {
      title: 'SVG Liquid Text Wave — feTurbulence + feDisplacementMap CSS-Free Distortion',
      description: `A liquid text wave warps the outline of a headline continuously, as if it were printed on a rippling water surface, using only SVG filter primitives — no canvas, no WebGL, no JavaScript animation loop. The whole effect is declarative: an animated \`<feTurbulence>\` noise field displaces an \`<feDisplacementMap>\`-driven copy of the text, and the SVG's own native \`<animate>\` element handles the timing. It sits in different territory from a CSS-only [wave text](/ui-snippets/wave-text/) letter bounce, because the distortion here warps the actual glyph outlines rather than moving whole letters up and down — closer to a heat-haze or underwater refraction than a bounce.

**feTurbulence generates the noise field**

\`<feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="7" result="noise">\` procedurally generates a Perlin-like noise texture directly in the browser's rendering pipeline — no image asset needed. \`baseFrequency\` controls how fine or coarse the noise pattern is (two values set separate X and Y frequencies, which is what gives the ripple its horizontally-stretched, water-like character rather than uniform blobs). \`numOctaves="2"\` layers two frequencies of noise together for more organic detail than a single octave produces, and \`seed="7"\` fixes the pattern so it is reproducible rather than different on every page load.

**feDisplacementMap uses that noise to warp the text**

\`<feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G">\` takes the actual text (\`SourceGraphic\`) and displaces each pixel horizontally and vertically based on the red and green channel values of the noise texture at that same pixel location. \`scale="26"\` sets how many pixels of maximum displacement the noise can cause — larger values produce a more extreme, melting distortion; smaller values produce a subtle shimmer.

**Animating the filter natively with SVG \`<animate>\`**

Rather than driving the distortion from JavaScript, a native \`<animate attributeName="baseFrequency" dur="9s" values="0.012 0.04;0.02 0.06;0.012 0.04" repeatCount="indefinite">\` element nested inside \`<feTurbulence>\` interpolates the \`baseFrequency\` attribute through a sequence of values and back again, looping indefinitely. This makes the noise pattern itself slowly shift character over a 9-second cycle, so the ripple never looks like it is repeating a fixed loop even though the SVG markup itself has no JavaScript animation code at all — the browser's own SMIL animation engine handles everything.

**Gradient fill via a linearGradient reference**

The text's \`fill\` is set to \`url(#liquidGradient)\`, referencing an SVG \`<linearGradient>\` defined in \`<defs>\` with three color stops — the same visual effect as CSS \`background-clip: text\` gradients (see [animated gradient text](/ui-snippets/gradient-text/)), but expressed natively as an SVG paint server since the text itself is an SVG \`<text>\` element rather than HTML.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the distortion loop', text: 'The text continuously ripples as the native SVG <animate> element cycles feTurbulence\'s baseFrequency through a 9-second loop — no JavaScript is running.' },
        { title: 'Change the headline text', text: 'Edit the text content inside the SVG <text> element in the HTML panel.' },
        { title: 'Adjust the distortion strength', text: 'In the HTML panel, change scale="26" on <feDisplacementMap> — higher values produce a more melted, extreme warp.' },
        { title: 'Change the ripple texture', text: 'Adjust baseFrequency on <feTurbulence> (and inside its <animate> values) — smaller numbers create broader, slower-feeling waves; larger numbers create tighter, busier ripples.' },
        { title: 'Change the gradient colors', text: 'Edit the <stop> color-color values inside <linearGradient id="liquidGradient"> in the HTML panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Pure SVG filter effect — no canvas, no WebGL, no JavaScript animation loop',
      'feTurbulence procedurally generates a Perlin-like noise field with zero image assets',
      'feDisplacementMap warps the actual text glyph outlines using that noise as a heightmap',
      'Native SVG <animate> element drives the loop via the browser\'s own SMIL engine',
      'Two-value baseFrequency (X and Y) creates a horizontally-stretched, water-like ripple',
      'numOctaves layers multiple noise frequencies for organic, non-uniform distortion',
      'Gradient fill applied natively via SVG linearGradient, not CSS background-clip',
      'seed attribute keeps the noise pattern deterministic and reproducible',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Aquatic, organic, and beverage brand headlines', desc: 'The liquid ripple fits water, beverage, wellness, and other organic-themed brands whose products literally involve fluid — the effect is a direct visual metaphor.' },
      { icon: 'APP', title: 'Art direction and experimental portfolio hero text', desc: 'Design portfolios and experimental studio sites use SVG filter distortion to signal technical craft and visual experimentation beyond standard CSS effects.' },
      { icon: 'LEARN', title: 'Learn SVG filter primitives feTurbulence and feDisplacementMap', desc: 'Edit baseFrequency, numOctaves, seed, and scale directly in the HTML panel to build an intuition for how each SVG filter primitive independently shapes the final distortion.' },
      { icon: 'FLOW', title: 'Loading and idle-state hero animation with zero JS cost', desc: 'Because the entire animation runs through native SVG SMIL rather than a requestAnimationFrame loop, it costs no JavaScript execution time and keeps running even if the main thread is briefly busy.' },
      { icon: 'CODE', title: 'Pair with a liquid blob or wave background', desc: 'Combine with the [liquid blob](/ui-snippets/liquid-blob/) shape or [canvas wave background](/ui-snippets/canvas-wave-background/) for a consistent fluid visual language across text and background.' },
      { icon: 'STAR', title: 'Music, audio, and sound-reactive brand headlines', desc: 'The organic ripple also reads well as a stand-in for sound waves or audio distortion, useful for music streaming, podcast, or audio product headlines.' },
    ],
    faqs: [
      { q: 'How does feTurbulence generate noise without an image file?', a: 'feTurbulence is a procedural SVG filter primitive that implements Perlin-style noise generation directly in the browser\'s rendering engine, computed on the fly from its baseFrequency, numOctaves, and seed attributes — no bitmap or texture asset is downloaded or referenced.' },
      { q: 'What do the two baseFrequency values do?', a: 'feTurbulence accepts separate X and Y frequency values. A lower X frequency with a higher Y frequency (as used here) stretches the noise pattern horizontally, producing ripples that look like they are flowing sideways across the text rather than uniform blobby noise in every direction.' },
      { q: 'How does feDisplacementMap actually distort the text?', a: 'It reads the noise texture generated by feTurbulence as a heightmap: for every pixel of the source text, it looks up the corresponding red and green channel values in the noise (set via xChannelSelector and yChannelSelector) and shifts that pixel horizontally and vertically by an amount proportional to those values and the scale attribute.' },
      { q: 'Why is this animated with SVG <animate> instead of JavaScript?', a: 'SVG supports native declarative animation (SMIL) via elements like <animate>, which can interpolate filter attributes such as baseFrequency directly without any script. This keeps the effect running smoothly even under main-thread JavaScript load and removes the need for a requestAnimationFrame loop entirely.' },
      { q: 'Why does the distortion look different at different scale values?', a: 'scale on feDisplacementMap sets the maximum pixel displacement the noise can cause. A small scale (a few pixels) produces a subtle shimmer; a large scale (30+) can distort the text enough that individual letters become hard to read, so it is worth tuning per headline length and font size.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. SVG filter elements including feTurbulence, feDisplacementMap, and animate can be written directly as JSX (camelCased where React requires it, such as baseFrequency staying as-is since it is already valid) inside a returned <svg> tree with no additional JavaScript needed to drive the animation.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML into an AI coding assistant like Claude and ask it to explain exactly how feTurbulence's baseFrequency and numOctaves attributes shape the noise pattern, and how feDisplacementMap's xChannelSelector and yChannelSelector turn that noise's red and green color channels into actual pixel displacement — try changing baseFrequency's two values independently and predicting how the ripple direction will change before testing it. It's also worth a performance conversation: ask whether feTurbulence-based filters are expensive to composite on lower-powered devices at large sizes, and how you'd add a prefers-reduced-motion fallback that disables the <animate> element entirely. For extending it, ask for a version where the displacement scale itself responds to cursor proximity, one that combines this filter with a background-clip gradient sweep for a doubly-animated headline, or one where multiple independently-seeded feTurbulence filters blend for a more chaotic liquid effect. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a continuously rippling "liquid" text distortion effect using only SVG filter primitives — no canvas, no WebGL, and no JavaScript animation loop; the animation must run entirely through native SVG declarative animation.

Requirements:
- Define an SVG filter containing a feTurbulence primitive generating fractal noise, with separate X and Y baseFrequency values chosen so the resulting ripple looks horizontally stretched rather than uniformly blobby, and a fixed seed so the pattern is reproducible.
- Nest a native SVG <animate> element inside the feTurbulence primitive that interpolates its baseFrequency attribute through a short sequence of different values and back to the start, looping indefinitely with a multi-second duration, so the noise pattern itself slowly evolves over time without any script driving it.
- Chain a feDisplacementMap primitive after the turbulence that uses the noise as a displacement source for the actual SourceGraphic (the text), with a tunable scale attribute controlling how many pixels of maximum warp are applied, and appropriate channel selectors mapping the noise's color channels to horizontal and vertical displacement.
- Apply the filter to an SVG <text> element containing a large, bold headline, and fill that text with a multi-stop linear gradient defined as an SVG paint server (not a CSS background-clip trick), so the text is both gradient-colored and continuously liquid-distorted at the same time.
- The entire effect must work with zero lines of custom JavaScript — everything driving the animation should be expressible in the SVG markup itself.`,
    },
  },
};

export default svgLiquidTextWave;
