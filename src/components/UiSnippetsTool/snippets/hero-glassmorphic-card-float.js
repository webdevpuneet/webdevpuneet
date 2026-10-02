const heroGlassmorphicCardFloat = {
  id: 'hero-glassmorphic-card-float',
  title: 'Hero with Floating Glassmorphic Cards',
  lastmod: '2026-08-23',
  category: 'heroes',
  html: `<section class="gcf-hero">
  <div class="gcf-blob gcf-blob1"></div>
  <div class="gcf-blob gcf-blob2"></div>
  <div class="gcf-blob gcf-blob3"></div>

  <div class="gcf-inner">
    <span class="gcf-badge">Design system, reimagined</span>
    <h1 class="gcf-title">Interfaces that feel <span>weightless.</span></h1>
    <p class="gcf-sub">A component library built around depth, light, and motion — so every screen you ship looks like it's floating above the page.</p>
    <div class="gcf-cta-row">
      <a href="#" class="gcf-btn-primary">Start building</a>
      <a href="#" class="gcf-btn-secondary">View components</a>
    </div>
  </div>

  <div class="gcf-card gcf-card1">
    <div class="gcf-card-icon">☀</div>
    <strong>Live weather</strong>
    <small>72°F · Clear skies</small>
  </div>
  <div class="gcf-card gcf-card2">
    <div class="gcf-card-icon">♪</div>
    <strong>Now playing</strong>
    <small>Ambient — Drift Vol. 2</small>
  </div>
  <div class="gcf-card gcf-card3">
    <div class="gcf-card-icon">✓</div>
    <strong>Focus session</strong>
    <small>25:00 remaining</small>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; }

.gcf-hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 40px 24px; background: linear-gradient(160deg, #1e1b4b, #0f172a 60%); }

.gcf-blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.55; }
.gcf-blob1 { width: 420px; height: 420px; top: -10%; left: -8%; background: radial-gradient(circle, #f472b6, transparent 70%); animation: gcfDrift1 14s ease-in-out infinite; }
.gcf-blob2 { width: 460px; height: 460px; bottom: -15%; right: -10%; background: radial-gradient(circle, #22d3ee, transparent 70%); animation: gcfDrift2 18s ease-in-out infinite; }
.gcf-blob3 { width: 320px; height: 320px; top: 30%; right: 15%; background: radial-gradient(circle, #a78bfa, transparent 70%); animation: gcfDrift1 20s ease-in-out infinite reverse; }
@keyframes gcfDrift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.08); } }
@keyframes gcfDrift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,25px) scale(1.05); } }

.gcf-inner { position: relative; z-index: 2; max-width: 560px; text-align: center; }
.gcf-badge { display: inline-block; padding: 6px 14px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.16); border-radius: 999px; color: #e0e7ff; font-size: 12.5px; font-weight: 700; }
.gcf-title { margin-top: 20px; font-size: 46px; font-weight: 800; line-height: 1.12; letter-spacing: -0.02em; color: #f8fafc; }
.gcf-title span { background: linear-gradient(135deg, #f472b6, #a78bfa); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.gcf-sub { margin: 16px auto 0; max-width: 440px; font-size: 15.5px; line-height: 1.65; color: #cbd5e1; }
.gcf-cta-row { display: flex; gap: 12px; justify-content: center; margin-top: 28px; flex-wrap: wrap; }
.gcf-btn-primary { padding: 13px 24px; background: #fff; color: #1e1b4b; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 800; transition: transform .15s; }
.gcf-btn-primary:hover { transform: translateY(-1px); }
.gcf-btn-secondary { padding: 13px 24px; background: rgba(255,255,255,0.06); backdrop-filter: blur(8px); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.16); border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 700; transition: border-color .15s; }
.gcf-btn-secondary:hover { border-color: rgba(255,255,255,0.4); }

.gcf-card { position: absolute; z-index: 2; display: flex; flex-direction: column; gap: 3px; padding: 16px 18px; background: rgba(255,255,255,0.1); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.22); border-radius: 16px; box-shadow: 0 12px 30px rgba(0,0,0,0.2); color: #f1f5f9; min-width: 168px; }
.gcf-card strong { font-size: 13.5px; }
.gcf-card small { font-size: 11.5px; color: #cbd5e1; }
.gcf-card-icon { font-size: 18px; margin-bottom: 4px; }

.gcf-card1 { top: 14%; left: 8%; animation: gcfFloat1 6s ease-in-out infinite; }
.gcf-card2 { bottom: 18%; left: 12%; animation: gcfFloat2 7.5s ease-in-out infinite; }
.gcf-card3 { top: 20%; right: 8%; animation: gcfFloat3 5.2s ease-in-out infinite; }
@keyframes gcfFloat1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@keyframes gcfFloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
@keyframes gcfFloat3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

@media (max-width: 900px) {
  .gcf-card1, .gcf-card2, .gcf-card3 { display: none; }
  .gcf-title { font-size: 32px; }
}`,
  js: '',
  seo: {
    title: 'Hero with Floating Glassmorphic Cards — Free HTML CSS Snippet',
    description: 'A hero with an animated gradient blob backdrop and frosted-glass cards floating at different depths, each drifting on its own independent timing. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hero with Floating Glassmorphic Cards — Frosted Panels Drifting Over an Animated Blob Backdrop',
      description: `Glassmorphism reads as flat and lifeless the moment every frosted panel sits perfectly still. This hero fixes that with three floating glass cards drifting gently at different speeds and offsets over a slowly moving gradient-blob backdrop — pure HTML and CSS, no JavaScript, no canvas.

**The blob backdrop**

Three large, heavily blurred radial-gradient circles (\`.gcf-blob1/2/3\`) sit behind the content, each with its own drift keyframe animation moving it a short distance and gently scaling it up and down over 14–20 seconds. Because the durations differ and one runs in \`reverse\`, the blobs never fall into a synchronized rhythm — the backdrop keeps subtly reshaping itself instead of visibly looping. \`filter: blur(60px)\` turns hard-edged circles into soft, colorful light without a single image asset.

**Frosted glass, done properly**

Each \`.gcf-card\` uses \`background: rgba(255,255,255,0.1)\` plus \`backdrop-filter: blur(16px)\` (with the \`-webkit-\` prefix for Safari) and a faint \`border\` — the combination that makes glassmorphism actually read as glass rather than a semi-transparent box. Content sitting behind the card visibly blurs through it, so the moving blobs are essential set dressing, not decoration: without something behind the cards to distort, the blur effect is invisible.

**Independent float timing is the whole trick**

The three cards each get a distinct \`translateY\` oscillation keyframe (\`gcfFloat1/2/3\`) at different durations (6s, 7.5s, 5.2s) and different amplitudes and directions. This is the detail that separates a convincing "floating in space" effect from an obviously synced, robotic one — in real fluid dynamics nothing this size moves in perfect unison, and neither should these cards. Keep each card's duration and offset distinct any time you add more.

**Cards with a purpose, not just shapes**

Rather than empty frosted rectangles, each card shows a small piece of plausible live data — a weather reading, a now-playing track, a focus-timer countdown — reinforcing the "ambient interface" positioning of the hero's copy. Swap these for whatever mini-widgets are relevant to your product.

**Customizing it**

Change the blob and gradient-text colors to your palette — the gradient text on the emphasized headline word reuses the \`background-clip: text\` technique from other heroes in this library. Add or remove floating cards, keeping each one's float keyframe duration and direction distinct. On narrow screens the cards hide by default since there usually isn't room for them without crowding the headline — reposition rather than hide if your layout has space.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML and CSS', text: `A dark hero renders with drifting gradient blobs and three floating glass cards.` },
      { title: 'Watch the blobs and cards move', text: `Each blob and each card runs its own independent animation timing, so nothing moves in sync.` },
      { title: 'Resize below 900px', text: `The floating cards hide to keep the headline readable on small screens.` },
      { title: 'Edit the card content', text: `Change the icon, title, and detail text in each .gcf-card to match your product.` },
      { title: 'Retheme the colors', text: `Swap the blob gradients and the headline's gradient-text colors for your brand.` },
      { title: 'Add more cards', text: `Give each new card its own float keyframe with a distinct duration and direction.` },
    ] },
    features: [
      { title: 'Independently timed float', text: `Each card oscillates on its own duration and amplitude so nothing syncs up.` },
      { title: 'True frosted glass', text: `backdrop-filter: blur plus translucent background makes content behind cards visibly distort.` },
      { title: 'Animated blob backdrop', text: `Three blurred gradient circles drift and scale slowly to keep the scene alive.` },
      { title: 'Gradient headline text', text: `background-clip: text paints a gradient through the emphasized word.` },
      { title: 'Glass CTA button', text: `The secondary button reuses the frosted-glass treatment for visual consistency.` },
      { title: 'Purposeful card content', text: `Cards show plausible mini-widgets instead of empty shapes.` },
      { title: 'Pure CSS animation', text: `No JavaScript, no canvas — every motion is a CSS keyframe.` },
      { title: 'Responsive fallback', text: `Cards hide below 900px to protect headline readability.` },
    ],
    useCases: [
      { title: 'Design system homepages', text: 'Showcase a component library with three frosted cards floating at different depths, each on its own duration and amplitude.' },
      { title: 'Productivity and ambient apps', text: 'Pair floating mini panels with a drifting blob backdrop, keeping glass from looking flat and lifeless.' },
      { title: 'Creative agency sites', text: 'Use as a distinctive opener for a creative agency, with `backdrop-filter: blur` over translucent backgrounds making genuine frosted glass.' },
      { title: 'AI and generative launches', text: 'Convey a floating, weightless feel with three blurred gradient circles that drift and scale slowly behind the cards.' },
      { title: 'Wellness and lifestyle apps', text: 'Swap card content for mood or routine summaries, with a gradient headline painted through `background-clip: text`, and compare with a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/).' },
      { icon: 'CODE', title: 'Related: Product Launch Countdown Hero', desc: 'See the [Product Launch Countdown Hero](/ui-snippets/hero-countdown-launch/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do the cards need something moving behind them?', a: `backdrop-filter: blur only has a visible effect on whatever is actually behind the element. Without the animated gradient blobs, the frosted cards would look like plain semi-transparent boxes with no distortion to reveal. The blobs are essential set dressing for the glass effect to read as glass.` },
      { q: 'Why give each floating card a different animation duration?', a: `If every card floated on the same timing, they'd rise and fall in perfect unison, which reads as an obviously mechanical loop. Distinct durations (6s, 7.5s, 5.2s), amplitudes, and directions mean the cards drift independently, the way objects of different size and weight would in real fluid motion, and the scene never looks like a repeating cycle at a glance.` },
      { q: 'Does backdrop-filter work in every browser?', a: `It's supported in all current major browsers, but Safari historically needed the -webkit-backdrop-filter prefix, which this snippet includes. If you need to support very old browsers without backdrop-filter support, the cards fall back to a plain translucent background — still readable, just without the blur-through effect.` },
      { q: 'How do I add a fourth floating card?', a: `Duplicate a .gcf-card element with a new position (top/left/right/bottom) and add a new @keyframes rule with a distinct name, duration, and translateY range, then reference it in that card's animation property. Keep the timing different from the existing three cards to preserve the unsynced feel.` },
      { q: 'How do I use this hero in React, Vue, or Angular?', a: `Since there's no JavaScript, this is a direct markup and CSS conversion — click JSX, Vue, or Angular in the export panel. The keyframe animations and backdrop-filter properties carry over unchanged as they're pure CSS.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to eyeball the float timing until it looks natural. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain why the frosted glass cards need the animated blob backdrop behind them for backdrop-filter to have any visible effect, and why giving each card's float keyframe a distinct duration and amplitude avoids the synchronized, mechanical look that identical timings would produce. The same assistant can help you tune it further — ask whether the blur radius and opacity values should change for a lighter or heavier glass effect, or whether performance suffers with backdrop-filter on lower-end devices and what a graceful fallback should look like. It's also useful for extending the scene: ask it to add mouse-parallax so the cards shift slightly toward the cursor in addition to their float animation, or to make the blob colors respond to a light/dark theme toggle. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML and CSS only (no JavaScript, no canvas) featuring floating glassmorphic cards over an animated gradient blob backdrop.

Requirements:
- A dark hero background with three large, heavily blurred radial-gradient circles ("blobs") in different colors positioned behind the content, each with its own CSS keyframe animation that gently translates and scales it over a long duration (roughly 14-20 seconds), with at least one blob's animation running in reverse direction so the blobs never move in visible sync with each other.
- Centered hero copy (badge, headline with one word rendered as gradient text via background-clip: text, subheading, two CTA buttons) sitting above the blobs in stacking order.
- Three small "glass" cards positioned absolutely at different points around the hero, each styled with a semi-transparent white background, backdrop-filter: blur (with the -webkit- prefixed version too), a faint light border, and a soft box-shadow, so that the blurred blobs behind them are visibly distorted through the glass.
- Each of the three cards must have its own distinct CSS keyframe float animation — a gentle vertical oscillation via translateY — with a different duration, amplitude, and vertical direction per card, so the three cards drift independently and never appear to move in unison.
- Give each card a small icon, a bold title, and a short detail line representing a plausible piece of live data (for example a weather reading, a currently-playing track, or a countdown timer) rather than leaving the cards empty.
- Make it responsive: hide the floating cards on narrow screens below roughly 900px so the headline stays readable, and scale down the headline font size at that breakpoint too.`,
    },
  },
};

export default heroGlassmorphicCardFloat;
