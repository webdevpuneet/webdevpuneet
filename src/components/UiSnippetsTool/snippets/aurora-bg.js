const auroraBg = {
    id: 'aurora-bg',
    title: 'Aurora Background',
    category: 'animations',
    html: `<div class="aurora-scene">
  <div class="aurora">
    <div class="orb o1"></div>
    <div class="orb o2"></div>
    <div class="orb o3"></div>
    <div class="orb o4"></div>
  </div>
  <div class="content">
    <p class="eyebrow">Welcome</p>
    <h1>Something<br>beautiful awaits</h1>
    <p class="sub">Crafted with pure CSS animations — no canvas, no WebGL, no libraries.</p>
    <button class="cta">Explore →</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }

.aurora-scene {
  position: relative;
  min-height: 100vh;
  background: #030712;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

.aurora {
  position: absolute; inset: 0;
  filter: blur(80px);
  opacity: 0.65;
}

.orb {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  animation: drift linear infinite;
}

.o1 { width: 600px; height: 600px; background: radial-gradient(circle, #6366f1, transparent 70%); top: -200px; left: -100px; animation-duration: 14s; animation-delay: 0s; }
.o2 { width: 500px; height: 500px; background: radial-gradient(circle, #ec4899, transparent 70%); bottom: -150px; right: -100px; animation-duration: 18s; animation-delay: -6s; }
.o3 { width: 400px; height: 400px; background: radial-gradient(circle, #0ea5e9, transparent 70%); top: 30%; left: 40%; animation-duration: 22s; animation-delay: -4s; }
.o4 { width: 350px; height: 350px; background: radial-gradient(circle, #10b981, transparent 70%); bottom: 10%; left: 10%; animation-duration: 20s; animation-delay: -10s; }

@keyframes drift {
  0%   { transform: translate(0, 0)    scale(1);    }
  25%  { transform: translate(60px, -40px) scale(1.1); }
  50%  { transform: translate(30px, 60px)  scale(0.95); }
  75%  { transform: translate(-50px, 20px) scale(1.05); }
  100% { transform: translate(0, 0)    scale(1);    }
}

.content {
  position: relative; z-index: 1;
  text-align: center; padding: 40px 24px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}

.eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #6366f1; }
h1 { font-size: clamp(36px, 8vw, 64px); font-weight: 800; color: #f1f5f9; line-height: 1.1; letter-spacing: -1px; }
.sub { font-size: 15px; color: #475569; max-width: 460px; line-height: 1.7; }
.cta { padding: 12px 28px; background: rgba(255,255,255,0.1); color: #f1f5f9; border: 1px solid rgba(255,255,255,0.15); border-radius: 50px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; backdrop-filter: blur(10px); transition: background 0.15s, border-color 0.15s; }
.cta:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.3); }`,
    js: '',

  seo: {
    title: 'Aurora Background — Free HTML CSS Snippet',
    description: 'Northern-lights background from blurred radial-gradient orbs with mix-blend-mode screen and drift keyframes. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Aurora Background — Blurred Radial Orbs, mix-blend-mode: screen & Drift Animation',
      description: `The aurora background simulates the appearance of the Northern Lights — large, softly glowing colour fields that shift and blend against a near-black sky. Used on AI product landing pages, SaaS hero sections, and dark premium interfaces to create depth and motion without images or video — see also the [gradient mesh hero](/ui-snippets/gradient-mesh-hero/), [floating particles](/ui-snippets/floating-particles/), and [liquid blob](/ui-snippets/liquid-blob/) backgrounds.

**The four-property technique**

Each orb (\`.orb\`) is an absolutely-positioned div with four properties working together: \`border-radius: 50%\` makes it circular. \`background: radial-gradient(circle, #colour, transparent 70%)\` makes it fade from solid at the centre to transparent at the edges. \`filter: blur(80px)\` softens the entire orb into a diffuse glow. \`mix-blend-mode: screen\` makes overlapping orbs additively blend — wherever two orb colours overlap, their brightnesses combine rather than occluding each other.

**Why mix-blend-mode: screen creates the aurora**

\`screen\` blending mode works like projecting coloured light onto a wall — two beams add brightness rather than subtracting. On a near-black background (\`#030712\`), the orbs' colours appear in full saturation. Where an indigo orb and a pink orb overlap, the result is a bright magenta. This additive blending is what gives the aurora its characteristic shifting colour mixing.

**The drift animation**

\`@keyframes drift\` animates \`translateX\` and \`translateY\` across three keyframes: \`0%\` → \`33%\` → \`66%\` → \`100%\`. Each orb has a different \`animation-duration\` (14s, 18s, 22s) and the last orb uses \`animation-direction: reverse\`, so all orbs move at different speeds and directions — creating the organic, non-repeating flow of real aurora.

**The blurred container**

All orbs sit inside \`.aurora { position: absolute; inset: 0; filter: blur(80px); opacity: 0.65 }\` — a second layer of blur softens the orbs further. The \`opacity: 0.65\` prevents the aurora from overpowering content placed above it.

**The mix-blend-mode: screen effect**

Each aurora orb uses mix-blend-mode: screen. Screen blending adds pixel colour values together — where two orbs overlap, their colours combine additively, creating brighter, more saturated intersection zones. This is why overlapping a purple orb and a pink orb creates a bright white-pink centre. Without mix-blend-mode, the orbs would simply overlap with the top layer obscuring the bottom one.

**The drift animation**

Each orb uses a @keyframes drift animation that moves via translate(x,y) and scale(). Three orbs have different animation-duration values (14s, 18s, 22s) and animation-delay values (-6s, -12s). Because they move at different rates and phases, they never synchronise — the pattern is always unique and organic-looking. Using translate (not left/top) keeps the animation on the GPU compositor.

**Colour temperature variation**

The three default colours (indigo, pink, cyan) were chosen to represent warm, cool, and neutral tones that blend well in screen mode. For a warmer aurora, shift toward amber and red. For a cooler aurora, shift toward blue and teal. Avoid very dark or very light colours — screen blending works best with mid-range saturated hues.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the aurora drift', text: 'The preview shows three coloured orbs drifting at different speeds in different directions, blending at overlaps via mix-blend-mode: screen.' },
        { title: 'Change orb colours', text: 'In the CSS panel, update the radial-gradient colour on each .o1, .o2, .o3 rule to change the aurora palette.' },
        { title: 'Add a fourth orb', text: 'Add a new .orb.o4 div to the HTML and CSS with a different colour, size, position, and animation-duration.' },
        { title: 'Change animation speed', text: 'Update the animation-duration values on each .o1, .o2, .o3 class for faster or slower drift.' },
        { title: 'Add foreground content', text: 'Place your hero content (headline, CTA buttons) inside a .hero-content div with position: relative; z-index: 1 to sit above the aurora.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'radial-gradient(circle, colour, transparent 70%) on each orb — fade from centre to edge',
      'filter: blur(80px) diffuses each orb into a soft glow',
      'mix-blend-mode: screen additively blends overlapping orb colours',
      '.aurora container has filter: blur(80px) + opacity: 0.65 for second softening pass',
      '@keyframes drift: three-point translate path with different duration per orb',
      'animation-direction: reverse on last orb for organic non-repeating motion',
      'Near-black #030712 background maximises colour saturation of screen-blended orbs',
      'Pure HTML and CSS — no JavaScript required',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'AI and SaaS hero section backgrounds', desc: 'The aurora background is the defining aesthetic of modern AI product pages. Place your headline and CTA above the aurora with position: relative; z-index: 1.' },
      { icon: 'DESIGN', title: 'Dark landing page depth without images', desc: 'Add visual depth and motion to any dark landing page without using video, images, or canvas. The CSS animation handles motion with zero performance cost.' },
      { icon: 'LEARN',  title: 'Learn mix-blend-mode: screen',         desc: 'Edit the orb colours in the CSS panel to see how screen blending combines them. Try purple and orange — they blend to white where they overlap on a dark background.' },
      { icon: 'FLOW',   title: 'Loading and splash screen backgrounds', desc: 'Use the aurora as an animated splash screen background while content loads. The slow drift creates a calming, premium atmosphere.' },
      { icon: 'STAR',   title: 'Crypto and Web3 product interfaces',   desc: 'Aurora backgrounds are standard on Web3 product pages. The colour mixing and slow drift communicate innovation and energy.' },
      { icon: 'CODE',   title: 'Layer above a glassmorphism card',      desc: 'Combine with the Glass Card snippet — the aurora provides the colourful background required for the backdrop-filter: blur effect to be visible.' },
      { icon: 'CODE', title: 'Related: Canvas ASCII Art Converter', desc: 'See the [Canvas ASCII Art Converter](/ui-snippets/canvas-ascii-art-converter/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cursor Spotlight Text Fill', desc: 'See the [Cursor Spotlight Text Fill](/ui-snippets/cursor-spotlight-text-fill/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does mix-blend-mode: screen create colour mixing?', a: 'Screen blending mode adds brightness values rather than mixing pigments. On a dark background, each orb colour appears at full saturation. Where two orbs overlap, their brightness values add — an indigo and a pink orb overlap to produce bright magenta. The effect simulates coloured light beams on a dark surface.' },
      { q: 'Why are there two blur layers?', a: 'Each orb has its own blur applied via the .aurora container filter: blur(80px). The .aurora element also has filter: blur(80px). This double blur creates the extremely soft, diffuse quality of real aurora borealis light.' },
      { q: 'How does the drift animation create organic motion?', a: 'Each orb has a different animation-duration (14s, 18s, 22s) and the third orb uses animation-direction: reverse. Since the durations are not simple multiples of each other, the orbs never perfectly synchronise and the pattern never exactly repeats.' },
      { q: 'How do I place content on top of the aurora?', a: 'The aurora container uses position: absolute; inset: 0 to fill its parent. Give the parent position: relative; overflow: hidden. Place your content inside a sibling div with position: relative; z-index: 1 to sit above the aurora layer.' },
      { q: 'Can I use this aurora as a navigation bar backdrop?', a: 'Yes. Apply the same technique to a fixed nav: give the nav position: fixed; overflow: hidden. Add an absolutely-positioned aurora container inside and give the nav content position: relative; z-index: 1. The Hamburger Nav snippet uses a similar backdrop-filter approach.' },
      { q: 'Can I use this aurora background in React?', a: 'Yes. Click "JSX" for a React component. The CSS animations and blend modes work identically in React. Import the CSS as a module or inline the styles as a styled component.' },
    ],
    aiPrompt: {
      paragraph: `There's no JavaScript to trace here, so the interesting part is understanding why the CSS choices combine the way they do. Paste the HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why mix-blend-mode: screen produces additive color mixing on this near-black background, or why the orbs need both an individual radial-gradient fade and a second blur pass on the shared .aurora container rather than just one blur. The same assistant can help you optimize it — ask whether animating four separately-blurred, screen-blended orbs is expensive to composite on lower-end GPUs, and whether reducing blur radius or orb count would help without losing the effect. It's also useful for extending the background: ask it to make the orb colors reactive to scroll position, add a subtle parallax tilt on mouse move, or generate the orb positions and durations procedurally instead of hardcoding four fixed divs. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated "aurora background" in plain HTML and CSS only — no JavaScript, no canvas, no WebGL, no images.

Requirements:
- Several absolutely positioned circular divs ("orbs"), each filled with a radial-gradient that fades from a saturated color at the center to fully transparent by about 70 percent of the radius.
- Every orb must use mix-blend-mode: screen so that overlapping orbs additively blend their colors (e.g. an indigo orb and a pink orb overlapping should visually produce a brighter magenta), against a near-black page background so the additive blending is clearly visible.
- Apply a heavy blur filter (e.g. 80px) both to each orb's shared container and rely on the radial gradient's own softness, so the orbs read as diffuse glowing light rather than hard-edged circles.
- Animate each orb with a keyframe animation that moves it through at least three translate/scale waypoints and loops infinitely, giving every orb a different animation-duration and a different animation-delay (or direction) so no two orbs are ever in sync — the combined motion must never look like a simple repeating loop.
- Keep all animated properties limited to transform (translate and scale) rather than left/top/width/height, so the motion stays on the GPU compositor.
- Place real foreground content (a heading, subtext, and a button) in a layer with position: relative and a higher z-index so it stays legible on top of the moving, blurred orbs.`,
    },
  },
};

export default auroraBg;
