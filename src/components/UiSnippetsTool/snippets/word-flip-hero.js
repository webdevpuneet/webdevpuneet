const wordFlipHero = {
  id: 'word-flip-hero',
  title: 'Word Flip Hero',
  lastmod: '2026-06-13',
  category: 'heroes',
  html: `<div class="hero">
  <div class="hero-noise"></div>
  <div class="hero-content">
    <div class="eyebrow">
      <span class="eyebrow-dot"></span>
      Launching 2026 · Free Forever
    </div>
    <h1 class="headline">
      Build&nbsp;<span class="flip-wrap" aria-live="polite" aria-label="cycling words">
        <span class="flip-track" id="flipTrack">
          <span class="flip-word">Faster</span>
          <span class="flip-word">Smarter</span>
          <span class="flip-word">Better</span>
          <span class="flip-word">Together</span>
          <span class="flip-word">Faster</span>
        </span>
      </span>
    </h1>
    <p class="sub">Ship production-ready UIs in minutes — not days. 175+ copy-paste components, zero dependencies.</p>
    <div class="cta-row">
      <a href="#" class="btn btn-primary">
        Get started free
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
      </a>
      <a href="#" class="btn btn-ghost">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
        Watch demo
      </a>
    </div>
    <div class="social-proof">
      <div class="avatars">
        <div class="av" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">A</div>
        <div class="av" style="background:linear-gradient(135deg,#0ea5e9,#06b6d4)">B</div>
        <div class="av" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">C</div>
        <div class="av" style="background:linear-gradient(135deg,#10b981,#059669)">D</div>
      </div>
      <p class="proof-text"><strong>12,000+</strong> developers use webdevpuneet.com</p>
    </div>
  </div>
  <div class="hero-visual">
    <div class="code-window">
      <div class="win-bar">
        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
        <span class="win-title">component.html</span>
      </div>
      <pre class="code-body"><code><span class="c-tag">&lt;div</span> <span class="c-attr">class</span>=<span class="c-val">"card"</span><span class="c-tag">&gt;</span>
  <span class="c-tag">&lt;h2</span> <span class="c-attr">class</span>=<span class="c-val">"title"</span><span class="c-tag">&gt;</span>Hello World<span class="c-tag">&lt;/h2&gt;</span>
  <span class="c-tag">&lt;p</span> <span class="c-attr">class</span>=<span class="c-val">"desc"</span><span class="c-tag">&gt;</span>
    Copy. Paste. Ship.
  <span class="c-tag">&lt;/p&gt;</span>
  <span class="c-tag">&lt;button</span> <span class="c-attr">class</span>=<span class="c-val">"btn"</span><span class="c-tag">&gt;</span>
    Get Started
  <span class="c-tag">&lt;/button&gt;</span>
<span class="c-tag">&lt;/div&gt;</span></code></pre>
      <div class="copy-tag">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        Copied to clipboard
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#030712;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero{position:relative;width:100%;min-height:100vh;display:flex;align-items:center;justify-content:center;gap:48px;padding:40px 32px;flex-wrap:wrap}
.hero-noise{position:absolute;inset:0;background-image:radial-gradient(circle at 30% 50%,rgba(99,102,241,.18) 0%,transparent 55%),radial-gradient(circle at 75% 30%,rgba(139,92,246,.12) 0%,transparent 50%);pointer-events:none}

/* Content */
.hero-content{position:relative;flex:1;min-width:280px;max-width:540px;z-index:2}
.eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:600;letter-spacing:.06em;color:#94a3b8;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:5px 14px;margin-bottom:24px}
.eyebrow-dot{width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,.4)}50%{opacity:.8;box-shadow:0 0 0 5px rgba(16,185,129,0)}}
.headline{font-size:clamp(36px,6vw,64px);font-weight:900;color:#f8fafc;line-height:1.05;letter-spacing:-.02em;margin-bottom:20px;white-space:nowrap}

/* Word flip */
.flip-wrap{display:inline-block;overflow:hidden;height:1.1em;vertical-align:bottom;position:relative}
.flip-track{display:flex;flex-direction:column;transition:transform .55s cubic-bezier(0.77,0,0.18,1)}
.flip-word{display:block;line-height:1.1;background:linear-gradient(90deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.sub{font-size:16px;color:#94a3b8;line-height:1.65;margin-bottom:28px;max-width:440px}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.btn{display:inline-flex;align-items:center;gap:7px;padding:13px 24px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;cursor:pointer;transition:transform .15s,box-shadow .15s}
.btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 20px rgba(99,102,241,.4)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(99,102,241,.55)}
.btn-ghost{background:rgba(255,255,255,.04);color:#e2e8f0;border:1px solid rgba(255,255,255,.1)}
.btn-ghost:hover{background:rgba(255,255,255,.08);transform:translateY(-2px)}

.social-proof{display:flex;align-items:center;gap:12px}
.avatars{display:flex}
.av{width:28px;height:28px;border-radius:50%;border:2px solid #030712;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;margin-left:-6px}
.av:first-child{margin-left:0}
.proof-text{font-size:12px;color:#64748b}
.proof-text strong{color:#e2e8f0}

/* Code window */
.hero-visual{position:relative;flex:0 0 auto;width:min(100%,380px);z-index:2}
.code-window{background:#0f172a;border:1px solid #1e293b;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.win-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid #1e293b;background:#1e293b}
.dot{width:10px;height:10px;border-radius:50%}
.dot.red{background:#ef4444}.dot.yellow{background:#f59e0b}.dot.green{background:#10b981}
.win-title{margin-left:auto;font-size:10px;color:#64748b;font-family:monospace}
.code-body{padding:16px 18px;font-family:'Fira Code',monospace;font-size:12px;line-height:1.8;overflow:hidden;color:#e2e8f0}
.c-tag{color:#f472b6}.c-attr{color:#818cf8}.c-val{color:#34d399}
.copy-tag{display:flex;align-items:center;gap:5px;padding:8px 14px;border-top:1px solid #1e293b;font-size:10px;color:#10b981;font-weight:600}`,

  js: `const track = document.getElementById('flipTrack');
const WORDS = ['Faster','Smarter','Better','Together'];
const DURATION = 2200;
let idx = 0;

// Height = one word height
function getWordHeight(){
  const w = track.querySelector('.flip-word');
  return w ? w.offsetHeight : 0;
}

setInterval(() => {
  idx = (idx + 1) % WORDS.length;
  const h = getWordHeight();
  track.style.transform = \`translateY(-\${idx * h}px)\`;
}, DURATION);`,

  seo: {
    title: 'Word Flip Hero — Animated Cycling Headline HTML CSS JS',
    description: `Hero section with animated word-flip headline, gradient text, social proof avatars, and gradient CTA buttons. Exports to React, Vue & Angular.`,
    about: {
      title: `Word Flip Hero — CSS Transform Word Cycling, Gradient Text Clip & Social Proof Layout`,
      description: `The word-flip hero is one of the most recognisable patterns in modern SaaS and startup landing pages — a headline where a single key word cycles through several alternatives, demonstrating the product's versatility without needing multiple pages. This snippet builds a production-quality word-flip hero: a stacked flex column of words animating vertically with \`translateY\`, gradient text clipping on the cycled words, a dual-CTA button row, social proof avatars, and a decorative code window — all in pure HTML, CSS, and minimal JavaScript.

The animated headline technique communicates product breadth in a single sentence: "Build Faster / Smarter / Better / Together" — each word reframes the same value proposition for a different user persona. The visual variety keeps the hero from feeling static while the core message stays readable between transitions.

**The word column slide mechanism**

All words are stacked in a vertical flex column (\`flex-direction: column\`) inside a \`overflow: hidden\` container sized to exactly one word's line height (\`1.1em\`). JavaScript measures one word's actual pixel height and sets \`translateY(-idx * height)\` on the column — shifting the visible window to show the current word. The CSS \`transition: transform .55s cubic-bezier(0.77,0,0.18,1)\` gives the slide an aggressive ease-in / smooth-out feel that matches the hero's energetic tone.

Unlike CSS \`@keyframes\` cycling approaches, this method works with variable-length words because the height is measured at runtime. Adding a new word to the cycle is a pure HTML change — no CSS or JS constants to update.

**Gradient text clipping**

The cycling words use \`background: linear-gradient(90deg, #818cf8, #c084fc)\` clipped to the text via \`-webkit-background-clip: text\` and \`-webkit-text-fill-color: transparent\`. This is the standard CSS technique for gradient typography — supported in all modern browsers. The gradient sweeps left-to-right from indigo to violet, matching the CTA button gradient for visual coherence.

**Social proof avatar stack**

Four overlapping avatar circles use negative \`margin-left: -6px\` to create the stacked overlap effect. Each avatar is a colour-coded \`<div>\` with a letter initial — a practical pattern for user-generated or developer-tool contexts where actual profile photos are rarely available at build time.

**Decorative code window**

The right side of the hero shows a dark code editor window with syntax-coloured HTML spans, a macOS-style traffic-light dot bar, and a "Copied to clipboard" success indicator. This communicates the product's developer focus without needing a screenshot and remains crisp at all screen densities. Pair with a [parallax hero](/ui-snippets/parallax-hero/) for a more visually dynamic full-screen background effect.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Paste the three blocks',
        text: `A dark hero renders with the cycling headline "Build Faster / Smarter / Better / Together", a subheading, two CTA buttons, social proof avatars, and a code window decoration.`,
      },
      {
        title: 'Watch the word cycle',
        text: `Every 2.2 seconds the highlighted word slides up and the next one appears with a smooth cubic-bezier transition. The gradient text colour adds visual contrast against the white headline.`,
      },
      {
        title: 'Change the word list',
        text: `Edit the \`WORDS\` array in JS and the corresponding \`.flip-word\` spans in HTML. Add or remove words freely — the height measurement adapts automatically.`,
      },
      {
        title: 'Update the headline text',
        text: `Change "Build" to any verb that matches your product ("Design", "Deploy", "Automate"). The \`<span class="flip-wrap">\` sits inline so the static and dynamic parts flow together.`,
      },
      {
        title: 'Customise CTAs',
        text: `Update the button text, \`href\` values, and gradient colours to match your brand. The primary button uses an indigo-violet gradient — change via CSS \`background\` on \`.btn-primary\`.`,
      },
      {
        title: 'Replace the code window',
        text: `Swap the \`.code-body\` content with a screenshot, illustration, or product UI preview. The window frame (traffic-light dots, dark background, border) works as a generic content container.`,
      },
    ] },
    features: [
      {
        title: 'Vertical column word cycling',
        text: `Words stack in a flex column inside an \`overflow:hidden\` clip window. JS sets \`translateY(-idx * wordHeight)\` — runtime height measurement means variable word lengths work with zero config.`,
      },
      {
        title: 'Gradient text clip',
        text: `Cycling words use \`background-clip: text\` + \`-webkit-text-fill-color: transparent\` for an indigo-to-violet gradient sweep — the standard cross-browser gradient typography technique.`,
      },
      {
        title: 'Smooth cubic-bezier transition',
        text: `\`cubic-bezier(0.77,0,0.18,1)\` gives the slide an aggressive start and smooth landing — cinematic feel without being distracting during reading.`,
      },
      {
        title: 'Pulsing live indicator',
        text: `A green dot in the eyebrow badge pulses with a \`box-shadow\` keyframe animation — a standard "live" or "status" indicator communicating product activity.`,
      },
      {
        title: 'Social proof avatar stack',
        text: `Four overlapping avatar circles with negative margin overlap and a count label — communicates community adoption without requiring actual profile photos.`,
      },
      {
        title: 'ARIA live region',
        text: `The \`.flip-wrap\` has \`aria-live="polite"\` so screen readers announce each new word after it transitions in — accessible cycling animation.`,
      },
      {
        title: 'Gradient CTA buttons',
        text: `Primary button uses an indigo-violet gradient with \`box-shadow\` glow that intensifies on hover. Ghost button uses a glass-style background for hierarchy differentiation.`,
      },
      {
        title: 'Responsive flex layout',
        text: `Content and code window use \`flex-wrap: wrap\` and \`min-width\` — on narrow screens they stack vertically. The headline uses \`clamp(36px,6vw,64px)\` for fluid font sizing.`,
      },
    ],
    useCases: [
      {
        title: 'SaaS and startup landing pages',
        text: `The primary use case — "Build [Faster/Smarter/Better]" communicates product versatility to multiple personas in one headline. Common in developer tools, productivity apps, and platforms.`,
      },
      {
        title: 'Portfolio hero sections',
        text: `"I design [Interfaces/Experiences/Products]" or "I build [Websites/Apps/APIs]" — the cycling words let freelancers address multiple client types with a single headline.`,
      },
      {
        title: 'Agency and studio homepages',
        text: `"We craft [Brands/Products/Campaigns]" positions the agency across service verticals without separate landing pages per service.`,
      },
      {
        title: 'Product feature showcases',
        text: `Cycle through product benefits: "Automate [Reporting/Billing/Onboarding]". Each word links to a feature section below. Pair with a [scroll progress](/ui-snippets/scroll-progress/) indicator.`,
      },
      {
        title: 'Job posting and HR platforms',
        text: `"Find [Developers/Designers/Marketers]" on a talent platform homepage — cycling words cover all candidate types without separate hero sections per category.`,
      },
      {
        title: 'App store and download pages',
        text: `Mobile app landing pages use word-flip heroes to cycle through user benefits above the download button, covering diverse app store search intents.`,
      },
      { icon: 'CODE', title: 'Related: Hero with Video Testimonial Player', desc: 'See the [Hero with Video Testimonial Player](/ui-snippets/hero-video-testimonial-embed/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I change the cycling speed?',
        a: `Change the \`DURATION\` constant in the JS (default 2200ms). Also update the CSS transition duration on \`.flip-track\` to something shorter than DURATION so the animation completes before the next word arrives.`,
      },
      {
        q: 'How do I make the words fade instead of slide?',
        a: `Replace the translateY approach with CSS animations: set each word to \`position: absolute\` in the container, \`opacity: 0\`, and apply a \`@keyframes\` that fades in, pauses, and fades out. Use \`animation-delay\` to stagger each word. The container height should be set to match one word's height.`,
      },
      {
        q: 'How do I export this to React?',
        a: `Store the current index in \`const [idx, setIdx] = useState(0)\`. The interval becomes \`useEffect(() => { const t = setInterval(() => setIdx(i => (i+1) % WORDS.length), 2200); return () => clearInterval(t); }, [])\`. Apply \`style={{ transform: \`translateY(-\${idx * wordHeight}px)\` }}\` to the track ref.`,
      },
      {
        q: 'How do I pause the animation when the tab is not visible?',
        a: `Use the Page Visibility API: \`document.addEventListener('visibilitychange', () => { if (document.hidden) clearInterval(timer); else startCycle(); })\`. This saves CPU when the user switches tabs.`,
      },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain why getWordHeight() measures a live word's offsetHeight at runtime rather than the code just hardcoding a pixel value for translateY, and why that runtime measurement is exactly what lets you add a much longer word to the WORDS array with zero CSS changes. It's also worth asking about the setInterval driving the cycle — since it never gets cleared, ask what happens to it if this component were unmounted in a single-page app, and how you'd fix that leak. For extending it, ask for a version that pauses when the tab is hidden using the Page Visibility API, one where the flip direction reverses on the last word to loop backward instead of jumping, or a variant that syncs the word change to a typing-sound effect. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "word flip" cycling headline for a hero section in plain HTML, CSS, and JavaScript, where one word in a sentence cycles through alternatives via a vertical slide — no animation library, no CSS-only keyframe cycling.

Requirements:
- Stack all the cycling words vertically inside a fixed-height container (sized to exactly one line of text) with overflow hidden, using flex-direction: column so only one word is visible at a time inside the clipped window.
- On an interval, measure one word's actual rendered pixel height at runtime (not a hardcoded constant) and translate the whole stacked column upward by that height times the current word index, so the visible window slides to reveal the next word — this must work correctly even if words have different rendered widths, since only height matters for the vertical slide.
- Apply a CSS transition on the transform property using an aggressive ease-in, smooth ease-out cubic-bezier curve so the slide has energy without feeling jarring, and keep the transition duration shorter than the interval so each slide fully completes before the next one begins.
- Style the cycling word with a gradient text effect using background-clip: text so it visually stands out from the surrounding static headline text.
- Mark the cycling word's wrapping container with aria-live="polite" so screen readers announce each new word after it slides into view, without announcing it disruptively on every partial transition frame.
- Structure the word list as a plain array that the interval logic reads by index with modulo wrap-around, so adding or removing words from the rotation requires no changes to the interval or measurement logic.`,
    },
  },
};

export default wordFlipHero;
