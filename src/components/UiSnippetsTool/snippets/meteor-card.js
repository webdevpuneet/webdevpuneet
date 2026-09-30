const meteorCard = {
  id: 'meteor-card',
  title: 'Meteor Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="mc-stage">
  <article class="mc-card" id="mcCard">
    <div class="mc-meteors" id="mcMeteors" aria-hidden="true"></div>
    <div class="mc-body">
      <div class="mc-icon">✦</div>
      <h3>Cosmic plan</h3>
      <p>Unlimited projects, priority support, and a sky full of shooting stars streaking across the card.</p>
      <button type="button" class="mc-btn">Launch</button>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05050d;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.mc-stage{padding:30px}
.mc-card{position:relative;width:300px;border-radius:20px;padding:26px;background:radial-gradient(circle at 50% 0,#1a1a33,#0a0a18);border:1px solid #23233f;overflow:hidden;box-shadow:0 30px 70px -30px rgba(99,102,241,.5)}

.mc-meteors{position:absolute;inset:0;pointer-events:none}
.mc-meteor{position:absolute;top:-10%;width:2px;height:2px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.1)}
.mc-meteor::before{content:'';position:absolute;top:50%;right:1px;width:60px;height:1px;background:linear-gradient(90deg,#a5b4fc,transparent);transform:translateY(-50%)}
.mc-meteor{animation:mcFall linear infinite}
@keyframes mcFall{
  from{transform:translate(0,0) rotate(-45deg);opacity:1}
  70%{opacity:1}
  to{transform:translate(-340px,340px) rotate(-45deg);opacity:0}
}

.mc-body{position:relative;z-index:1}
.mc-icon{width:46px;height:46px;border-radius:12px;background:rgba(99,102,241,.18);border:1px solid rgba(99,102,241,.4);display:flex;align-items:center;justify-content:center;font-size:22px;color:#c7d2fe;margin-bottom:16px}
.mc-card h3{font-size:21px;font-weight:800;margin-bottom:9px}
.mc-card p{font-size:13.5px;color:#a3a3c2;line-height:1.6;margin-bottom:20px}
.mc-btn{width:100%;background:#6366f1;color:#fff;border:none;border-radius:11px;padding:12px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;transition:background .2s,transform .15s}
.mc-btn:hover{background:#4f46e5;transform:translateY(-1px)}`,

  js: `var host = document.getElementById('mcMeteors');
var COUNT = 14;

// Generate meteors with staggered start times and varied speed/position so the
// shower never looks like a synchronized grid of identical streaks.
for (var i = 0; i < COUNT; i++) {
  var m = document.createElement('span');
  m.className = 'mc-meteor';
  var left = Math.random() * 130;          // start beyond the right edge sometimes
  var delay = (Math.random() * 6).toFixed(2);
  var dur = (3 + Math.random() * 4).toFixed(2);
  m.style.cssText = 'left:' + left + '%;animation-delay:' + delay +
    's;animation-duration:' + dur + 's';
  host.appendChild(m);
}

// Pause the shower when the card scrolls out of view to save cycles.
var card = document.getElementById('mcCard');
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    host.style.animationPlayState = '';
    host.querySelectorAll('.mc-meteor').forEach(function (m) {
      m.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
    });
  });
}, { threshold: 0 });
io.observe(card);`,

  seo: {
    title: 'Meteor Card — Free HTML CSS JS Shooting Star Snippet',
    description: `A card with a shower of meteors streaking diagonally across it on staggered, randomized timing, paused when off-screen. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Meteor Card — Shooting Stars Streaking Across a Card',
      description: `The meteor card is the atmospheric effect where thin shooting stars streak diagonally across a dark card, each with a glowing trailing tail — turning a plain pricing or feature card into a tiny night sky. This snippet builds it with plain HTML, CSS, and a small vanilla JavaScript generator, with randomized timing so the shower looks natural and an IntersectionObserver to pause it when off-screen.

**A meteor is a dot with a tail**

Each meteor is a tiny 2px dot, and its glowing trail is a \`::before\` pseudo-element: a 60px-wide horizontal gradient that fades from light indigo to transparent, attached to the dot's trailing side. The whole thing is rotated -45° so it travels and points diagonally. This two-part construction — a head plus a gradient tail — is what reads as a shooting star rather than a moving dot, and it's pure CSS with no images.

**The falling animation**

The \`mcFall\` keyframe translates each meteor from the top toward the bottom-left by \`translate(-340px, 340px)\` while keeping the -45° rotation, and fades it out near the end of its travel. Because the card has \`overflow: hidden\`, meteors are clipped to the card's rounded bounds, so they appear and disappear at the edges like real streaks crossing a window. The animation is \`linear infinite\`, so each meteor loops forever.

**Randomization is the whole trick**

If every meteor shared the same start position, delay, and speed, you'd see an obvious grid of synchronized lines. The JavaScript generates 14 meteors, each with a random horizontal start (some beginning beyond the right edge), a random \`animation-delay\` up to 6 seconds, and a random \`animation-duration\` between 3 and 7 seconds. Those three randomized values mean meteors enter at different times, places, and speeds, so the shower looks scattered and organic — the single most important detail for selling the effect.

**Pausing off-screen**

A continuously animating shower wastes CPU and battery when nobody's looking at it, so an \`IntersectionObserver\` watches the card and toggles each meteor's \`animationPlayState\` between \`running\` and \`paused\` as the card enters and leaves the viewport. With \`threshold: 0\` it switches the moment any part of the card is visible. This is a lightweight, scroll-listener-free way to keep decorative animations efficient.

**Layering over content**

The meteors live in an absolutely positioned layer behind the card body (which sits at a higher \`z-index\`), so the streaks pass behind the icon, heading, and button without obscuring them. The card's radial-gradient background and indigo glow shadow complete the cosmic look, and the content remains fully readable.

**Customizing it**

Change \`COUNT\` for a denser or sparser shower, widen the random duration range for more speed variety, lengthen the tail by editing the \`::before\` width, or recolor the trail gradient to match your theme. Adjust the travel distance in \`mcFall\` if you resize the card. Pair it with a [pin card](/ui-snippets/pin-card/) or a [focus cards](/ui-snippets/focus-cards/) grid for a striking set of cards, or use it as a premium [pricing card](/ui-snippets/pricing-card/) tier.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark card renders with meteors streaking diagonally across it.` },
      { title: 'Watch the shower', text: `Thin shooting stars cross the card at scattered times and speeds.` },
      { title: 'Note the clipping', text: `Meteors appear and vanish at the card's rounded edges.` },
      { title: 'Scroll it off-screen', text: `The shower pauses automatically to save cycles.` },
      { title: 'Change the density', text: `Edit COUNT for more or fewer meteors.` },
      { title: 'Recolor the trails', text: `Adjust the tail gradient and length to your theme.` },
    ] },
    features: [
      { title: 'Dot-plus-tail meteors', text: `A head and a gradient ::before trail, no images.` },
      { title: 'Diagonal fall keyframe', text: `Meteors travel and fade across the card.` },
      { title: 'Randomized timing', text: `Per-meteor start, delay, and duration.` },
      { title: 'Clipped to the card', text: `overflow hidden frames the streaks.` },
      { title: 'Off-screen pause', text: `IntersectionObserver stops the shower when hidden.` },
      { title: 'Content stays readable', text: `Meteors sit behind the body layer.` },
      { title: 'Cosmic styling', text: `Radial background and indigo glow shadow.` },
      { title: 'Tunable density', text: `One COUNT constant controls the shower.` },
    ],
    useCases: [
      { title: 'Premium pricing tiers', text: `A flashy upgrade to a [pricing card](/ui-snippets/pricing-card/).` },
      { title: 'Feature highlights', text: `Pair with a [pin card](/ui-snippets/pin-card/) in a grid.` },
      { title: 'Launch announcements', text: `Set a cosmic mood near a [lamp header](/ui-snippets/lamp-header/).` },
      { title: 'Reward screens', text: `Echo the sky with a [confetti button](/ui-snippets/confetti-button/).` },
      { title: 'Space-themed sites', text: `Combine with a [starfield](/ui-snippets/starfield/) background.` },
      { title: 'CSS effect demos', text: `A reference for randomized meteor showers.` },
      { icon: 'CODE', title: 'Related: Virtual Tour Badge', desc: 'See the [Virtual Tour Badge](/ui-snippets/virtual-tour-badge/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is a meteor drawn?', a: `Each meteor is a tiny 2px dot with a ::before pseudo-element that is a 60px horizontal gradient fading to transparent — the glowing tail. The whole element is rotated -45 degrees so it travels and points diagonally. The head-plus-tail construction is what makes it read as a shooting star, and it's entirely CSS with no image assets.` },
      { q: 'Why does the shower look natural instead of synchronized?', a: `The JavaScript gives each of the 14 meteors a random horizontal start, a random animation-delay up to 6 seconds, and a random duration between 3 and 7 seconds. Because they enter at different times, positions, and speeds, the shower looks scattered and organic rather than a grid of identical lines firing together.` },
      { q: 'How does it avoid wasting CPU when off-screen?', a: `An IntersectionObserver with threshold 0 watches the card and toggles each meteor's animationPlayState between running and paused as the card enters or leaves the viewport. That stops the continuous animation work whenever the card isn't visible, without needing a scroll listener.` },
      { q: 'Why do the meteors not cover the text?', a: `The meteors live in an absolutely positioned layer, and the card body sits above them at a higher z-index. So the streaks pass behind the icon, heading, and button. The card's overflow: hidden also clips them to its rounded bounds so they enter and exit cleanly at the edges.` },
      { q: 'How do I use this meteor card in React, Vue, or Angular?', a: `Generate the meteor elements from an array in render, applying the random left, delay, and duration as inline styles computed once. Keep the IntersectionObserver in a mount effect with cleanup on unmount, using a ref to the card. The CSS keyframe and tail port directly; in Tailwind, define mcFall in the config and render the meteors with arbitrary inline animation styles.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to eyeball the timing math to know why this shower looks natural. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the randomized left position, animation-delay, and animation-duration together prevent the meteors from ever looking like a synchronized grid, or why the mcFall keyframe's translate distance has to match the card's actual dimensions to keep streaks clipped cleanly at the rounded corners. The same assistant is useful for optimizing it — asking whether animating transform and opacity only (rather than any layout-affecting property) is what keeps 14 looping meteors cheap, or whether the IntersectionObserver threshold should change for a card that scrolls partially into view. It's also a quick way to extend the effect: ask it to vary meteor color by size for a parallax feel, add an occasional larger "bright" meteor, or drive the COUNT constant responsively so denser showers only render on larger cards. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "meteor shower card" in plain HTML, CSS, and a small vanilla JavaScript generator using only CSS keyframe animations and an IntersectionObserver — no canvas, no libraries.

Requirements:
- A card with overflow: hidden and a dark radial-gradient background, containing an absolutely positioned layer for the meteors that sits behind the card's actual content (icon, heading, paragraph, button), which must stay on top via z-index.
- Each meteor is a single small element: a tiny circular "head" plus a glowing tail built from a ::before pseudo-element that is a horizontal linear-gradient fading from a light color to transparent, with the whole element rotated -45 degrees so the head-and-tail reads as a diagonal shooting star.
- Define one CSS @keyframes rule that translates a meteor from its start position diagonally down-and-left by a fixed pixel distance while keeping the same rotation, and fades its opacity to 0 near the end of the travel, running linear and infinite.
- In JavaScript, generate a fixed number of meteor elements (a constant, e.g. 14) and for each one set three independently randomized inline values: a random horizontal starting position (allow some to start beyond the right edge of the card), a random animation-delay (e.g. 0 to 6 seconds), and a random animation-duration (e.g. 3 to 7 seconds) — the randomization across all three is what must prevent the shower from ever looking like a synchronized grid of identical streaks.
- Add an IntersectionObserver (threshold 0) watching the card element that sets every meteor's animationPlayState to "running" when the card is intersecting the viewport and "paused" when it is not, so the shower stops consuming animation frames while off-screen.
- Do not use JavaScript to move the meteors frame by frame — all motion must come from the CSS animation; JavaScript only creates the elements, randomizes their timing, and toggles play state.`,
    },
  },
};

export default meteorCard;
