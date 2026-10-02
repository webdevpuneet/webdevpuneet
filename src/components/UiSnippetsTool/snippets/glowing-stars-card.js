const glowingStarsCard = {
  id: 'glowing-stars-card',
  title: 'Glowing Stars Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="gs-stage">
  <article class="gs-card" id="gsCard">
    <div class="gs-sky" id="gsSky" aria-hidden="true"></div>
    <div class="gs-body">
      <div class="gs-glyph">✦</div>
      <h3>Reach the stars</h3>
      <p>Hover the card — the constellation brightens and twinkles to life.</p>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05050d;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.gs-card{position:relative;width:300px;height:340px;border-radius:20px;background:linear-gradient(180deg,#0c0c1c,#06060f);border:1px solid #1d1d33;overflow:hidden;cursor:pointer}
.gs-sky{position:absolute;inset:0;display:grid;padding:14px}
.gs-star{position:relative;display:flex;align-items:center;justify-content:center}
.gs-star i{width:2px;height:2px;border-radius:50%;background:#3a3a55;transition:background .4s,box-shadow .4s,transform .4s}
.gs-card:hover .gs-star.on i{background:#fff;box-shadow:0 0 6px 1px rgba(255,255,255,.8);transform:scale(1.6)}
.gs-star.on i{animation:gsTwinkle var(--tw) ease-in-out infinite;animation-play-state:paused}
.gs-card:hover .gs-star.on i{animation-play-state:running}
@keyframes gsTwinkle{0%,100%{opacity:1}50%{opacity:.35}}

.gs-body{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;padding:24px;background:linear-gradient(0deg,rgba(6,6,15,.85),transparent 55%)}
.gs-glyph{width:46px;height:46px;border-radius:12px;background:rgba(129,140,248,.16);border:1px solid rgba(129,140,248,.4);display:flex;align-items:center;justify-content:center;font-size:22px;color:#c7d2fe;margin-bottom:14px}
.gs-body h3{font-size:21px;font-weight:800}
.gs-body p{font-size:13px;color:#9a9ab8;line-height:1.55;margin-top:6px}`,

  js: `var sky = document.getElementById('gsSky');
var COLS = 18, ROWS = 14;
sky.style.gridTemplateColumns = 'repeat(' + COLS + ',1fr)';
sky.style.gridTemplateRows = 'repeat(' + ROWS + ',1fr)';

// Build a field of cells; mark ~16% of them as "stars" that light on hover.
for (var i = 0; i < COLS * ROWS; i++) {
  var cell = document.createElement('div');
  cell.className = 'gs-star';
  if (Math.random() < 0.16) {
    cell.classList.add('on');
    cell.style.setProperty('--tw', (1.4 + Math.random() * 2).toFixed(2) + 's');
    cell.firstChild; // noop
  }
  cell.innerHTML = '<i></i>';
  sky.appendChild(cell);
}

// Periodically reshuffle which stars are lit so the constellation drifts.
var stars = Array.prototype.slice.call(sky.querySelectorAll('.gs-star'));
setInterval(function () {
  // turn a few on/off to make the sky feel alive even while hovering
  var pick = stars[Math.floor(Math.random() * stars.length)];
  pick.classList.toggle('on');
  if (pick.classList.contains('on')) {
    pick.style.setProperty('--tw', (1.4 + Math.random() * 2).toFixed(2) + 's');
  }
}, 900);`,

  seo: {
    title: 'Glowing Stars Card — Free HTML CSS JS Constellation Snippet',
    description: `A card with a dim dot field that brightens into a twinkling constellation on hover, with stars that drift on and off over time. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Glowing Stars Card — A Constellation That Wakes on Hover',
      description: `The glowing stars card hides a night sky in plain sight: at rest it shows a faint grid of dim dots, but hovering brings a scattered constellation to life — selected stars brighten, scale up, glow, and twinkle, while the field slowly reshuffles which stars are lit so the sky always feels alive. This snippet builds it with plain HTML, CSS, and a little vanilla JavaScript.

**A grid of cells, some marked as stars**

JavaScript builds an 18 × 14 grid of cells, each containing a tiny 2px dot. As each cell is created, there's a 16% chance it's flagged with an \`.on\` class, designating it a star. The rest stay as the dim background dots that give the sky texture. Generating the field in code keeps the markup minimal and makes the density a single tweakable probability.

**Brighten and twinkle on hover**

By default even the \`.on\` stars are dim. When the card is hovered, a CSS rule turns those stars white, adds a glowing \`box-shadow\` halo, and scales them up 1.6× — so the constellation pops out of the background. Each star also carries an infinite \`gsTwinkle\` keyframe (fading between full and 35% opacity) that is \`paused\` at rest and set to \`running\` only on hover. Pausing rather than removing the animation means each star resumes its own twinkle phase instantly when you hover, with no restart flicker.

**Per-star twinkle speed**

Every star gets a random \`--tw\` duration between 1.4 and 3.4 seconds, used as its twinkle animation length. Because each star pulses at its own rate, the constellation shimmers asynchronously instead of blinking in unison — the key to a believable starfield. The speed lives in a CSS variable so the shared keyframe can animate every star at a different tempo.

**A drifting sky**

To keep the card alive even while you hold a hover, a \`setInterval\` every 900ms toggles the \`.on\` state of one random cell, occasionally promoting a background dot to a star or retiring one, and assigns a fresh twinkle speed when it lights up. Over time this makes the constellation slowly rearrange itself, so the sky is never static and two views of the card are never identical.

**Readable content over the sky**

The heading and description sit in a \`.gs-body\` layer above the stars, with a bottom-up gradient scrim so the text stays legible against the brightest part of the field. The glyph badge and copy are unaffected by the star animation, keeping the card usable as a real feature or product tile.

**Customizing it**

Change \`COLS\`/\`ROWS\` for a finer or coarser sky, adjust the 16% probability for more or fewer stars, tune the twinkle duration range, change the hover glow color, or slow the 900ms reshuffle interval. Make the stars colored instead of white for a nebula feel. Pair it with a [meteor card](/ui-snippets/meteor-card/) or a [sparkles text](/ui-snippets/sparkles-text/) headline for a cosmic section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A card shows a faint field of dim dots at rest.` },
      { title: 'Hover the card', text: `Scattered stars brighten, glow, scale up, and twinkle.` },
      { title: 'Hold the hover', text: `Stars pulse asynchronously at their own speeds.` },
      { title: 'Watch it drift', text: `The constellation slowly reshuffles over time.` },
      { title: 'Change the density', text: `Adjust the star probability and grid size.` },
      { title: 'Recolor the glow', text: `Swap white stars for a colored nebula look.` },
    ] },
    features: [
      { title: 'Code-built star field', text: `A grid with a probability-based star flag.` },
      { title: 'Hover brighten', text: `Stars glow, scale, and pop on hover.` },
      { title: 'Paused twinkle', text: `Animations resume in-phase with no flicker.` },
      { title: 'Per-star speed', text: `Random --tw durations shimmer asynchronously.` },
      { title: 'Drifting sky', text: `An interval reshuffles lit stars over time.` },
      { title: 'Legible content', text: `A gradient scrim keeps text readable.` },
      { title: 'Tunable density', text: `One probability controls the star count.` },
      { title: 'Pure CSS twinkle', text: `Keyframes do the pulsing, JS only toggles.` },
    ],
    useCases: [
      { title: 'Cosmic feature cards', text: 'Place a dim dot field that brightens into a twinkling constellation on hover, in a grid beside a [meteor card](/ui-snippets/meteor-card/).' },
      { title: 'Premium pricing tiers', text: 'Give a dreamy variant of a [pricing card](/ui-snippets/pricing-card/) a hovering constellation, with stars that drift on and off over time.' },
      { title: 'Launch section headings', text: 'Match a [sparkles text](/ui-snippets/sparkles-text/) headline in a launch section with a card that twinkles to the same cosmic theme.' },
      { title: 'Space-themed sites', text: 'Echo a [starfield](/ui-snippets/starfield/) background with a hover-reactive card, building the field in code with a probability-based star flag.' },
      { title: 'Aspirational call to action wrappers', text: 'Wrap a [shimmer button](/ui-snippets/shimmer-button/) in a sky of stars, with per-star random `--tw` durations making the twinkle asynchronous.' },
      { icon: 'CODE', title: 'Related: ResizeObserver Live Card', desc: 'See the [ResizeObserver Live Card](/ui-snippets/resize-observer-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the stars chosen from the grid?', a: `JavaScript builds an 18 by 14 grid of cells, each holding a tiny dot, and flags about 16% of them with an on class as it creates them. Those become stars; the rest stay as dim background dots. The density is a single probability, so you can make the sky sparser or denser with one number.` },
      { q: 'Why pause the twinkle animation instead of removing it?', a: `Each star carries an infinite twinkle keyframe that is paused at rest and set to running only on hover. Pausing keeps each star's animation phase intact, so when you hover they resume their own pulsing instantly with no restart flicker — which removing and re-adding the animation would cause.` },
      { q: 'How does the constellation shimmer believably?', a: `Every star gets a random twinkle duration between 1.4 and 3.4 seconds stored in a --tw CSS variable. Because each star pulses at its own tempo, they fade in and out asynchronously rather than blinking in unison, which is what makes a starfield look real instead of mechanical.` },
      { q: 'What keeps the card alive while I hold a hover?', a: `A setInterval every 900ms toggles the on state of one random cell, occasionally promoting a background dot to a star or retiring one and giving it a fresh twinkle speed. Over time the constellation slowly rearranges, so the sky never looks static even during a sustained hover.` },
      { q: 'How do I use this glowing stars card in React, Vue, or Angular?', a: `Render the grid from an array, precomputing which cells are stars and their twinkle speeds so renders are stable. Put the reshuffle interval in a mount effect with cleanup on unmount. The hover brighten and twinkle are pure CSS. In Tailwind, build the grid with grid utilities and drive the per-star duration via an inline --tw variable.` },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why the sky never repeats itself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why toggling animation-play-state between paused and running (rather than adding and removing the animation) is what lets each star resume twinkling in its own phase without a restart flicker, and how the per-star --tw custom property makes 18 by 14 grid cells shimmer asynchronously instead of in unison. It's also a good candidate for optimization questions, like whether the 900ms setInterval reshuffle should pause when the card scrolls out of view to save cycles on a long dashboard page. For extending it, ask it to make the reshuffle rate react to hover duration, add a shooting-star animation across the grid occasionally, or theme the stars into a colored nebula. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a card with a hidden constellation that brightens on hover, in plain HTML, CSS, and JavaScript, using a JS-generated CSS grid of star cells and pure-CSS twinkle animation — no canvas, no images, no libraries.

Requirements:
- On load, JavaScript must build a CSS grid of a fixed number of columns and rows (for example 18 by 14) by creating one small div per cell and appending it into a grid container whose gridTemplateColumns and gridTemplateRows are set to match.
- As each cell is created, give it roughly a 16 percent random chance of being flagged as a star with a distinguishing class; unflagged cells remain dim background dots at all times.
- Only flagged star cells should carry an infinite CSS twinkle keyframe animation (opacity oscillating between 1 and a lower value like 0.35); that animation must start in a paused state via animation-play-state: paused and switch to running only while the parent card is hovered, so hovering resumes each star's own animation phase instantly with no restart flicker.
- Each star must be assigned its own random twinkle duration (for example between 1.4 and 3.4 seconds) via a CSS custom property, read by the shared keyframe, so stars pulse asynchronously rather than in lockstep.
- On hover, star cells (and only star cells, not background dots) must visibly brighten: turn a bright color, gain a glowing box-shadow halo, and scale up.
- A setInterval running independently of hover state must periodically (roughly every 900ms) toggle a random cell's star flag on or off, so the constellation slowly rearranges itself over time even during a sustained hover, assigning a fresh random twinkle duration whenever a cell newly becomes a star.
- Card content (heading and description) must sit in its own layer above the star grid with a gradient scrim so it stays legible regardless of star brightness.`,
    },
  },
};

export default glowingStarsCard;
