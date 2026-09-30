const scrambleTextLinks = {
  id: 'scramble-text-links',
  title: 'Scramble Text Links',
  lastmod: '2026-07-18',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrambleTextPlugin.min.js',
  ],
  html: `<div class="stl-wrap">
  <h2 class="stl-head">We are <span class="stl-role" id="stlRole">ENGINEERS</span></h2>
  <nav class="stl-nav">
    <a href="#" class="stl-link" data-text="WORK">WORK</a>
    <a href="#" class="stl-link" data-text="STUDIO">STUDIO</a>
    <a href="#" class="stl-link" data-text="JOURNAL">JOURNAL</a>
    <a href="#" class="stl-link" data-text="CONTACT">CONTACT</a>
  </nav>
  <p class="stl-hint">Hover a link — the headline scrambles on its own.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.stl-wrap{display:flex;flex-direction:column;align-items:center;gap:34px;text-align:center}
.stl-head{font-size:clamp(24px,4.6vw,40px);font-weight:700;letter-spacing:.02em}
.stl-role{color:#22d3ee;display:inline-block;min-width:9ch;text-align:left}
.stl-nav{display:flex;gap:clamp(16px,4vw,40px);flex-wrap:wrap;justify-content:center}
.stl-link{color:#8a90a8;text-decoration:none;font-size:15px;letter-spacing:.14em;padding:6px 2px;border-bottom:1px solid transparent;transition:color .25s,border-color .25s}
.stl-link:hover{color:#fff;border-color:#22d3ee}
.stl-hint{color:#5f6782;font-size:12px;letter-spacing:.05em}`,

  js: `gsap.registerPlugin(ScrambleTextPlugin);

// Nav links: scramble to their own text on hover. The plugin cycles
// random glyphs and locks in correct characters left to right.
document.querySelectorAll('.stl-link').forEach(function (link) {
  link.addEventListener('mouseenter', function () {
    gsap.to(link, {
      duration: 0.8,
      scrambleText: {
        text: link.getAttribute('data-text'),
        chars: 'upperCase',
        speed: 1.4
      }
    });
  });
});

// Headline: auto-cycle roles with a scramble transition.
var ROLES = ['ENGINEERS', 'DESIGNERS', 'DREAMERS', 'BUILDERS'];
var idx = 0;

function nextRole() {
  idx = (idx + 1) % ROLES.length;
  gsap.to('#stlRole', {
    duration: 1.1,
    scrambleText: {
      text: ROLES[idx],
      chars: 'upperAndLowerCase',
      revealDelay: 0.25,
      speed: 1
    },
    onComplete: function () { gsap.delayedCall(1.4, nextRole); }
  });
}
gsap.delayedCall(1.4, nextRole);`,

  seo: {
    title: 'Scramble Text Links — Free GSAP ScrambleText Snippet',
    description: `Hacker-style nav links that scramble on hover plus a headline cycling roles through glyph noise via ScrambleTextPlugin. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scramble Text Links — Decode-Style Hovers With ScrambleTextPlugin',
      description: `The scramble effect — text dissolving into random glyphs and resolving into a new word, like a terminal decrypting itself — is a staple of studio portfolios and cyberpunk UIs. This snippet applies GSAP's ScrambleTextPlugin (free on the CDN since 3.13) in its two canonical roles: nav links that scramble-in-place on hover, and a headline that auto-cycles through roles by way of glyph noise.

**How the plugin resolves text**

\`scrambleText\` doesn't just flash random characters: it locks in correct characters progressively from left to right while the not-yet-resolved remainder keeps cycling through the \`chars\` set. That left-to-right lock is what reads as "decoding" rather than noise — at 50% progress, the first half of the word is legible and stable while the tail still churns. \`speed\` controls how fast the churn cycles glyphs (1.4 on the links makes short words feel electric), independent of the tween's duration, which controls how fast the lock-in front advances.

**Hover scrambling targets the link's own text**

Each link stores its label in \`data-text\` and scrambles *to itself* on mouseenter. That's the trick for hover effects: the element's current text is the destination, so the animation is pure transition with no content change — and repeated hovers restart cleanly because the target equals the resting state. Locking width matters less here since each link resolves to its original length, but the monospace font guarantees the churn never shifts siblings.

**revealDelay makes the headline cycle read as replacement**

The role cycler uses \`revealDelay: 0.25\`: for the first quarter second the *entire* word churns before the lock-in front starts advancing. Without it, the first letters of the new word would appear almost instantly and the transition would read as a fast edit; with it, there's a beat of full chaos that sells "the old word is being destroyed" before the new one assembles. \`chars: 'upperAndLowerCase'\` adds case noise to the churn, contrasting with the links' cleaner \`'upperCase'\` set.

**min-width in ch units prevents layout pumping**

Cycling between ENGINEERS and DREAMERS changes string length, and mid-scramble the displayed text length fluctuates too. The \`.stl-role\` span reserves \`min-width: 9ch\` (the longest role) so the headline's layout never pumps as words churn — in a monospace font, \`ch\` units map exactly to character counts, making the reservation precise.

**The loop is delayedCall, not setInterval**

Each cycle schedules the next via \`gsap.delayedCall(1.4, nextRole)\` from its own \`onComplete\`. Chaining beats a fixed interval because the dwell time is measured *after* the scramble finishes — change the duration and the rhythm adapts — and delayedCalls live in GSAP's ticker, so they pause correctly if you ever pause the global timeline.

**Monospace is doing quiet work**

Proportional fonts make scrambles shimmer in width as wide and narrow glyphs swap — distracting at nav size, unacceptable in a headline. The mono stack keeps every churning frame the same width, which is why terminal aesthetics and scramble effects are natural partners.

**Customizing it**

Swap the \`chars\` set (the plugin accepts any custom string, e.g. Japanese kana or binary), scramble on scroll-into-view instead of hover, or slow \`speed\` for a lazier churn. Related text effects: the vanilla [text scramble](/ui-snippets/text-scramble/), typed cycling in [gsap text rotator](/ui-snippets/gsap-text-rotator/), glitching in [glitch text](/ui-snippets/glitch-text/), and character entrances in [gsap split text](/ui-snippets/gsap-split-text/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrambleTextPlugin from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The headline begins cycling roles through glyph noise.` },
      { title: 'Hover a nav link', text: `It scrambles and decodes back to its own label.` },
      { title: 'Watch the lock-in', text: `Characters resolve left to right while the tail churns.` },
      { title: 'Adjust revealDelay', text: `More delay means more full-chaos before resolving.` },
      { title: 'Change the glyph set', text: `chars accepts presets or any custom string.` },
    ] },
    features: [
      { title: 'Left-to-right decode', text: `Correct characters lock in progressively.` },
      { title: 'Self-target hovers', text: `Links scramble to their own data-text.` },
      { title: 'Chaos beat', text: `revealDelay holds full churn before resolving.` },
      { title: 'Independent speed', text: `Churn rate is separate from duration.` },
      { title: 'Stable layout', text: `ch-unit min-width stops headline pumping.` },
      { title: 'Chained cycling', text: `delayedCall rhythm adapts to duration.` },
      { title: 'Custom glyph sets', text: `Presets or any character string.` },
      { title: 'Mono-optimized', text: `Fixed-width churn never shifts siblings.` },
    ],
    useCases: [
      { title: 'Studio navs', text: `Signature hover identity for portfolios; pair with a [floating pill nav](/ui-snippets/floating-pill-nav/).` },
      { title: 'Role headlines', text: `"We are X" cyclers; a smoother cousin of the [scroll word wheel](/ui-snippets/scroll-word-wheel/).` },
      { title: 'Terminal aesthetics', text: `Decode reveals inside a [terminal window](/ui-snippets/terminal-window/).` },
      { title: 'Security products', text: `Encryption metaphors made visible, near a [password strength](/ui-snippets/password-strength/) meter.` },
      { title: 'Sci-fi campaign sites', text: `Glyph noise plus [glitch text](/ui-snippets/glitch-text/) for full cyberpunk.` },
      { title: 'Stat reveals', text: `Scramble numbers into place instead of [count up](/ui-snippets/count-up/).` },
    ],
    faqs: [
      { q: 'How does ScrambleText differ from just showing random characters?', a: `It resolves progressively: correct characters lock in from left to right while only the unresolved remainder keeps cycling through the chars set. That advancing "decode front" is what reads as decryption rather than noise. The speed option controls how fast unresolved glyphs churn, independently of the tween duration that moves the front.` },
      { q: 'Why do the links scramble to their own text?', a: `Storing the label in data-text and targeting it makes hover a pure transition — the destination equals the resting state, so repeated hovers restart cleanly with no content management, and mouseleave needs no handler because the text always ends correct. It's the simplest possible integration: one tween per hover, zero state.` },
      { q: 'What does revealDelay change about the feel?', a: `It holds the entire string in full churn for that many seconds before the lock-in front starts advancing. Without it, the first characters of the new word appear almost immediately and a word swap reads like a quick edit; with 0.25s of total chaos first, the transition reads as the old word being destroyed and the new one assembling — much stronger for headline cycling.` },
      { q: 'How do I stop the layout shifting while text scrambles?', a: `Two measures: a monospace font, so every churning glyph occupies identical width, and min-width: 9ch on the cycling span, reserving the longest role's width so shorter words don't let the headline contract. In monospace, ch units correspond exactly to character counts, making the reservation precise rather than approximate.` },
      { q: 'Can I use custom characters, like binary or katakana?', a: `Yes — chars accepts the presets ('upperCase', 'lowerCase', 'upperAndLowerCase') or any literal string of glyphs to cycle through, so '01' gives binary rain vibes and a kana string gives Matrix-style churn. Pick glyphs of similar width if you're not in monospace, or the scramble will visibly breathe.` },
      { q: 'How do I use ScrambleText in React, Vue, or Angular?', a: `Register the plugin at module scope; hover tweens can fire straight from event handlers (onMouseEnter and friends) against refs, while the auto-cycler belongs in a mount effect — useEffect, onMounted, or ngAfterViewInit — with its delayedCall killed in the cleanup so the loop dies on unmount. Keep the cycling text out of framework state; the plugin mutates the node directly. The nav itself is trivially Tailwind.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to puzzle out the timing relationships between GSAP's scrambleText options by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how revealDelay interacts with the tween's duration to control how long a word churns before the left-to-right lock-in front starts advancing, and why the nav links scramble to their own data-text attribute instead of some other target string. The same assistant is useful for optimizing it — ask whether chaining gsap.delayedCall from onComplete is the right pattern if you want the role cycler to also pause when the tab is backgrounded, or whether registering one mouseenter listener per link versus a single delegated listener matters at this scale. It is just as useful for extending the effect — ask it to scramble in a custom glyph set like katakana or binary, trigger the headline cycle on scroll-into-view instead of on a timer, or add a click handler that scrambles a link to a "loading" label before navigating. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scramble text" hover and auto-cycling headline effect in plain HTML, CSS, and JavaScript using GSAP and its ScrambleTextPlugin (load both from a CDN, no build step).

Requirements:
- A headline containing a span that automatically cycles through an array of role words (for example ENGINEERS, DESIGNERS, DREAMERS, BUILDERS), and a row of navigation links, each storing its own label text in a data-text attribute.
- Register ScrambleTextPlugin, then on mouseenter of each nav link, run a scrambleText tween that targets the link's own data-text value as the destination — so hovering scrambles the link's text into itself, making repeated hovers restart cleanly with no separate state tracking.
- Give the nav link scramble a distinct chars preset (such as upperCase) and a distinct speed value from the headline cycle, so the two scrambles feel different in churn rate.
- For the headline, write a self-chaining cycle function that advances an index into the roles array, runs a scrambleText tween with a chars preset that includes both cases, uses a revealDelay so the entire word churns in full chaos for a beat before the left-to-right lock-in begins, and schedules the next cycle via gsap.delayedCall from the tween's onComplete rather than a fixed setInterval.
- Use a monospace font for both the nav and the headline, and reserve the headline span's width with a min-width in ch units sized to the longest role word, so the layout never shifts or pumps in width as words of different lengths cycle through.
- Do not implement any manual character-by-character randomization logic yourself — all scrambling and progressive character lock-in must come from the ScrambleTextPlugin's own tween options (chars, speed, revealDelay), not custom setInterval-driven glyph swapping.`,
    },
  },
};

export default scrambleTextLinks;
