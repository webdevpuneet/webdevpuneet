const skeletonProfile = {
  id: 'skeleton-profile',
  title: 'Skeleton Profile',
  lastmod: '2026-07-18',
  category: 'loaders',
  html: `<div class="sk-card" id="skCard">
  <div class="sk-cover"></div>
  <div class="sk-body">
    <div class="sk-avatar"></div>
    <div class="sk-line sk-w60"></div>
    <div class="sk-line sk-w40"></div>
    <div class="sk-stats">
      <div class="sk-stat"></div>
      <div class="sk-stat"></div>
      <div class="sk-stat"></div>
    </div>
    <div class="sk-line sk-w90"></div>
    <div class="sk-line sk-w80"></div>
    <div class="sk-actions"><div class="sk-btn"></div><div class="sk-btn sk-ghost"></div></div>
  </div>
</div>
<button type="button" class="sk-toggle" id="skToggle">Load content</button>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0e16;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;gap:18px;padding:24px}

.sk-card{width:300px;background:#141826;border:1px solid #222838;border-radius:18px;overflow:hidden}
.sk-cover{height:80px;background:#1b2030}
.sk-body{padding:0 18px 18px;margin-top:-30px}
.sk-avatar{width:64px;height:64px;border-radius:50%;background:#1b2030;border:4px solid #141826}
.sk-line{height:12px;border-radius:6px;background:#1b2030;margin-top:12px}
.sk-w90{width:90%}.sk-w80{width:80%}.sk-w60{width:60%}.sk-w40{width:40%}
.sk-stats{display:flex;gap:10px;margin-top:16px}
.sk-stat{flex:1;height:44px;border-radius:10px;background:#1b2030}
.sk-actions{display:flex;gap:10px;margin-top:18px}
.sk-btn{flex:1;height:38px;border-radius:10px;background:#1b2030}

/* Shimmer sweep shared by every placeholder block. */
.sk-cover,.sk-avatar,.sk-line,.sk-stat,.sk-btn{position:relative;overflow:hidden}
.sk-cover::after,.sk-avatar::after,.sk-line::after,.sk-stat::after,.sk-btn::after{content:'';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);animation:skShimmer 1.4s infinite}
@keyframes skShimmer{100%{transform:translateX(100%)}}

/* Loaded state: real content fades in, skeleton fades out. */
.sk-card.is-loaded *::after{animation:none;content:none}
.sk-card.is-loaded .sk-cover{background:linear-gradient(120deg,#6366f1,#8b5cf6)}
.sk-card.is-loaded .sk-avatar{background:#0ea5e9}
.sk-card.is-loaded .sk-line,.sk-card.is-loaded .sk-stat,.sk-card.is-loaded .sk-btn{background:#222a3c}
.sk-card.is-loaded .sk-btn{background:#6366f1}
.sk-card.is-loaded .sk-ghost{background:#222a3c}

.sk-toggle{background:#1d2233;border:1px solid #2c3346;color:#cdd3e4;font-family:inherit;font-size:13px;font-weight:600;padding:9px 16px;border-radius:10px;cursor:pointer}
@media(prefers-reduced-motion:reduce){.sk-cover::after,.sk-avatar::after,.sk-line::after,.sk-stat::after,.sk-btn::after{animation:none}}`,

  js: `var card = document.getElementById('skCard');
var toggle = document.getElementById('skToggle');

toggle.addEventListener('click', function () {
  var loaded = card.classList.toggle('is-loaded');
  toggle.textContent = loaded ? 'Show skeleton' : 'Load content';
});

// In a real app you would add 'is-loaded' once your fetch resolves:
// fetch('/api/profile').then(function () { card.classList.add('is-loaded'); });`,

  seo: {
    title: 'Skeleton Profile — Free HTML CSS JS Loading Placeholder Card',
    description: `A profile-card skeleton with a shimmering sweep across every placeholder block and a loaded state, respecting reduced motion. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Skeleton Profile — A Shimmering Profile-Card Placeholder',
      description: `The skeleton profile is the grey, shimmering placeholder a profile card shows while its data loads — the cover, avatar, name, stats, and buttons all rendered as soft pulsing blocks so the layout is visible before the content arrives. This snippet builds it with plain HTML and CSS, plus a tiny toggle to demo the swap to real content.

**Structure mirrors the real card**

The skeleton's blocks are laid out exactly where the finished card's elements will be: an 80px cover band, a 64px round avatar overlapping it with a negative margin, name and subtitle lines of different widths, a three-up stats row, body lines, and two action buttons. Because the placeholder matches the real layout, the content doesn't jump or reflow when it loads — the whole point of a skeleton over a spinner is that the page geometry is already in place.

**The shimmer sweep**

Every placeholder block shares one shimmer: a \`::after\` pseudo-element holds a horizontal \`linear-gradient\` highlight that animates with \`transform: translateX\` from \`-100%\` to \`100%\` on a loop. Using a transform (rather than animating background-position) keeps the sweep on the GPU and perfectly smooth. One \`@keyframes\` and one shared rule drive the cover, avatar, lines, stats, and buttons together, so the entire card shimmers in sync.

**Varying widths sell the realism**

The text lines use utility width classes (\`sk-w90\`, \`sk-w60\`, \`sk-w40\`, etc.) so they look like real lines of differing length rather than identical bars. That small variety is what makes a skeleton read as "content loading" instead of "broken layout" — uniform bars look like an error, staggered widths look like text.

**The loaded swap**

Toggling an \`is-loaded\` class stops the shimmer (\`animation: none\`) and recolours the blocks into a finished-looking card — a gradient cover, a coloured avatar, and a primary button. In a real app you'd add that class the moment your \`fetch\` resolves; here a button toggles it so you can see both states. This models the exact handoff from placeholder to content.

**Respecting reduced motion**

A \`prefers-reduced-motion: reduce\` media query disables the shimmer for users who are sensitive to movement, leaving a static skeleton. Honouring that preference is an accessibility baseline for any looping animation, and it's a one-rule addition here.

**Customizing it**

Match the block sizes to your real card, change the shimmer colour and speed, or add more lines. Drop the loaded-state styles and instead render your actual content over the same skeleton container. Pair it with a [skeleton card grid](/ui-snippets/skeleton-card-grid/), a [skeleton loader](/ui-snippets/skeleton-loader/), or a [skeleton dashboard](/ui-snippets/skeleton-dashboard/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML and CSS', text: `A shimmering profile-card skeleton renders.` },
      { title: 'Watch the sweep', text: `A highlight glides across every block in sync.` },
      { title: 'Click Load content', text: `The shimmer stops and the card colours in.` },
      { title: 'Toggle back', text: `Return to the skeleton state to compare.` },
      { title: 'Wire to a fetch', text: `Add is-loaded when your data resolves.` },
      { title: 'Match your card', text: `Resize the blocks to your real layout.` },
    ] },
    features: [
      { title: 'Layout-matched blocks', text: `Placeholders sit where content will land.` },
      { title: 'GPU shimmer', text: `translateX sweep, not background-position.` },
      { title: 'One shared animation', text: `Every block shimmers in sync.` },
      { title: 'Varied line widths', text: `Utility classes read as real text.` },
      { title: 'Loaded swap', text: `is-loaded stops shimmer and colours in.` },
      { title: 'No layout shift', text: `Geometry is in place before content.` },
      { title: 'Reduced-motion safe', text: `Shimmer disables on user preference.` },
      { title: 'Fetch-ready', text: `Toggle the class when data resolves.` },
    ],
    useCases: [
      { title: 'Profile page loading states', text: 'Show a cover, avatar, name, stats and button placeholders in the exact positions the real [profile card](/ui-snippets/profile-card/) will fill.' },
      { title: 'Card grid placeholders', text: 'Pair with a [skeleton card grid](/ui-snippets/skeleton-card-grid/) so a whole page of cards loads with one consistent shimmer.' },
      { title: 'Generic shimmer reuse', text: 'Borrow the translateX sweep from a [skeleton loader](/ui-snippets/skeleton-loader/), which animates on the GPU rather than shifting background position.' },
      { title: 'Dashboard and list loading', text: 'Match a [skeleton dashboard](/ui-snippets/skeleton-dashboard/) panel or an [avatar status list](/ui-snippets/avatar-status-list/) so every region loads in step.' },
      { title: 'Team page placeholders', text: 'Fill the gap before a [team card](/ui-snippets/team-card/) arrives, using varied line widths that read as real text and respect reduced-motion settings.' },
      { icon: 'CODE', title: 'Related: Optimistic Action Button with Rollback on Failure', desc: 'See the [Optimistic Action Button with Rollback on Failure](/ui-snippets/optimistic-action-rollback-loader/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use a skeleton instead of a spinner?', a: `A skeleton lays its placeholder blocks exactly where the real elements will be — cover, avatar, name, stats, buttons — so the page geometry is already in place and content does not jump or reflow when it loads. A spinner gives no sense of the layout and the page lurches when data arrives.` },
      { q: 'How is the shimmer animated efficiently?', a: `Each block has an ::after holding a horizontal gradient highlight that animates with transform: translateX from -100% to 100% on a loop. Using a transform keeps the sweep on the GPU compositor and perfectly smooth, and one shared keyframes and rule drive every block so the whole card shimmers in sync.` },
      { q: 'Why do the placeholder lines have different widths?', a: `The text lines use utility width classes so they look like real lines of differing length. Uniform bars read as a broken layout, while staggered widths read as text that is loading — that small variety is what sells the skeleton as content arriving rather than an error state.` },
      { q: 'Does it respect reduced motion?', a: `Yes. A prefers-reduced-motion: reduce media query disables the shimmer animation, leaving a static skeleton for users sensitive to movement. Honouring that preference is an accessibility baseline for any looping animation, and here it is a single rule.` },
      { q: 'How do I use this skeleton profile in React, Vue, or Angular?', a: `Render the skeleton while a loading flag is true and the real card when it is false, or keep the same container and add an is-loaded class when your fetch resolves. Tie the flag to your data-fetching state (a loading boolean, React Query's isLoading, a Suspense fallback). The shimmer CSS ports unchanged; in Tailwind use animate utilities or a custom keyframe.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the shimmer geometry or the is-loaded swap by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the shimmer uses a transform: translateX sweep on a shared ::after pseudo-element rather than animating background-position like other skeleton snippets, or why every placeholder block shares one keyframe instead of running independent timers. The same assistant can help optimize it, for instance checking whether the wildcard *::after selector used to kill the shimmer on is-loaded could be scoped more narrowly for large card grids. It is just as useful for extending it: ask it to drive the is-loaded class from a real fetch promise instead of a button, add a skeleton error state for failed loads, or generalize the block sizes into CSS variables so the same skeleton fits multiple card layouts. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a shimmering "skeleton profile card" placeholder in plain HTML, CSS, and a small amount of JavaScript — no libraries.

Requirements:
- A profile-card layout with a cover band, a circular avatar that visually overlaps the cover using a negative top margin, name and subtitle placeholder lines of different widths, a three-column stats row, two body text lines, and two action-button placeholders — every block positioned exactly where the real, loaded card's content will appear.
- Implement the shimmer as a single shared technique: give every placeholder block a ::after pseudo-element containing a horizontal linear-gradient highlight, and animate it purely with a CSS transform (translateX from -100% to 100%), not background-position — so the sweep runs on the compositor and every block animates from the same one keyframe rule in sync.
- The text-line placeholders must use varied width utility classes (not all identical width) so they read as text of differing length rather than a uniform stack of bars.
- A toggle (button click, standing in for a real fetch resolving) must add an is-loaded class to the card that: stops every shimmer animation at once, and recolors the cover, avatar, lines, stats, and buttons into a finished-looking card (gradient cover, colored avatar, solid primary button) — implemented with as few CSS rules as possible by leaning on the shared .is-loaded ancestor selector.
- Respect prefers-reduced-motion by disabling the shimmer animation entirely for users who request reduced motion, leaving a static (non-animated) placeholder instead.`,
    },
  },
};

export default skeletonProfile;
