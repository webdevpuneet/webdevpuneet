const favoriteButton = {
  id: 'favorite-button',
  title: 'Like / Favorite Button',
  lastmod: '2026-06-16',
  category: 'buttons',
  html: `<div class="fav-demo">
  <button class="fav" onclick="toggleFav(this)" aria-pressed="false">
    <span class="fav-icon">
      <svg viewBox="0 0 24 24" width="22" height="22"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/></svg>
    </span>
    <span class="fav-label">Like</span>
    <span class="fav-count" id="favCount">128</span>
  </button>

  <div class="fav-row">
    <button class="fav mini" onclick="toggleFav(this)" aria-pressed="false">
      <span class="fav-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/></svg></span>
      <span class="fav-count">42</span>
    </button>
    <button class="fav mini" onclick="toggleFav(this)" aria-pressed="false">
      <span class="fav-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/></svg></span>
      <span class="fav-count">1.2k</span>
    </button>
    <button class="fav mini liked" onclick="toggleFav(this)" aria-pressed="true">
      <span class="fav-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/></svg></span>
      <span class="fav-count">9</span>
    </button>
  </div>
  <p class="fav-hint">Tap a heart — particles burst, the count rolls up, and the state persists per button.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.fav-demo{text-align:center}

.fav{position:relative;display:inline-flex;align-items:center;gap:9px;background:#1e293b;border:1px solid #334155;color:#cbd5e1;font-family:inherit;font-size:15px;font-weight:700;padding:11px 18px;border-radius:999px;cursor:pointer;transition:border-color .2s,background .2s,transform .1s;-webkit-tap-highlight-color:transparent}
.fav:hover{border-color:#475569}
.fav:active{transform:scale(.95)}
.fav.liked{border-color:#f43f5e;background:rgba(244,63,94,.12);color:#fb7185}

.fav-icon{display:inline-flex;position:relative}
.fav-icon svg{fill:none;stroke:currentColor;stroke-width:2;transition:fill .2s}
.fav.liked .fav-icon svg{fill:#f43f5e;stroke:#f43f5e;animation:heart-pop .42s cubic-bezier(.2,1.6,.4,1)}
@keyframes heart-pop{0%{transform:scale(.2)}45%{transform:scale(1.35)}70%{transform:scale(.9)}100%{transform:scale(1)}}

.fav-label{transition:color .2s}
.fav.liked .fav-label{color:#fb7185}

.fav-count{font-variant-numeric:tabular-nums;min-width:1ch}
.fav-count.bump{animation:count-bump .35s ease}
@keyframes count-bump{0%{transform:translateY(0)}40%{transform:translateY(-7px);opacity:.4}100%{transform:translateY(0)}}

.fav.mini{font-size:13px;padding:8px 13px;gap:6px}

.particle{position:absolute;left:50%;top:50%;width:7px;height:7px;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);animation:burst .6s ease-out forwards}
@keyframes burst{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(.2)}}

.ring{position:absolute;left:50%;top:50%;width:18px;height:18px;border-radius:50%;border:3px solid #f43f5e;transform:translate(-50%,-50%);pointer-events:none;animation:ring .5s ease-out forwards}
@keyframes ring{0%{opacity:.9;width:8px;height:8px}100%{opacity:0;width:54px;height:54px;border-width:1px}}

.fav-row{display:flex;gap:12px;justify-content:center;margin-top:22px}
.fav-hint{color:#64748b;font-size:13px;margin-top:24px;max-width:300px;line-height:1.5}`,

  js: `var COLORS = ['#f43f5e', '#fb7185', '#fbbf24', '#f97316', '#ec4899'];

function toggleFav(btn) {
  var liked = btn.classList.toggle('liked');
  btn.setAttribute('aria-pressed', liked ? 'true' : 'false');

  var countEl = btn.querySelector('.fav-count');
  var raw = countEl.textContent.trim();
  var isK = /k$/i.test(raw);
  var n = parseFloat(raw) * (isK ? 1000 : 1);
  n = Math.round(n) + (liked ? 1 : -1);
  countEl.textContent = n >= 1000 ? (n / 1000).toFixed(1).replace(/\\.0$/, '') + 'k' : n;
  countEl.classList.remove('bump');
  void countEl.offsetWidth;
  countEl.classList.add('bump');

  if (liked) burst(btn);
}

function burst(btn) {
  var icon = btn.querySelector('.fav-icon');

  var ring = document.createElement('span');
  ring.className = 'ring';
  icon.appendChild(ring);
  ring.addEventListener('animationend', function () { ring.remove(); });

  for (var i = 0; i < 12; i++) {
    var p = document.createElement('span');
    p.className = 'particle';
    var angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5);
    var dist = 26 + Math.random() * 18;
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = COLORS[i % COLORS.length];
    p.style.animationDelay = (Math.random() * 0.05) + 's';
    icon.appendChild(p);
    p.addEventListener('animationend', function () { this.remove(); });
  }
}`,

  seo: {
    title: 'Like / Favorite Button — HTML CSS JS Snippet',
    description: `Heart like button with a radial particle burst, expanding ring, spring heart-pop, and a count that rolls to "1.2k". Exports to React, Vue & Tailwind.`,
    about: {
      title: `Like / Favorite Button — Particle Burst, Spring Heart-Pop & Animated Count`,
      description: `The like button is the most-tapped micro-interaction on the web. Social feeds, product galleries, comment threads, and bookmark lists all live or die on how satisfying that single tap feels. A flat heart that simply changes colour feels cheap; a heart that pops with a spring, fires a radial particle burst, and rolls its count upward feels rewarding — and that reward drives engagement. This snippet implements the full delightful version in plain HTML, CSS, and vanilla JavaScript, with no library and no SVG sprite sheet.

The effect is built from four independent layers that fire together on a single \`toggleFav\` call: the heart fill, the spring scale, the particle burst, and the count roll. Keeping them independent means you can drop any one of them without touching the others.

**Spring heart-pop**

When the \`.liked\` class is added, the heart's \`fill\` transitions from transparent to red and a \`heart-pop\` keyframe runs. The keyframe overshoots — \`scale(0.2) → 1.35 → 0.9 → 1\` — using a \`cubic-bezier(.2,1.6,.4,1)\` spring curve. That overshoot is what reads as "bouncy" rather than mechanical. The animation only plays in the liked state, so un-liking is an instant, calm reset.

**Radial particle burst**

The \`burst\` function appends twelve \`.particle\` spans to the icon. Each particle gets a target offset from polar coordinates: the angle is evenly spaced around a circle (\`2π × i / 12\`) with a small random jitter, and the distance is randomised between 26 and 44 pixels. Those offsets are written as \`--tx\` and \`--ty\` custom properties, and the \`burst\` keyframe translates each particle to \`calc(-50% + var(--tx))\` while fading and shrinking it. Colours cycle through a small palette. Crucially, every particle removes itself on \`animationend\`, so the DOM never accumulates dead nodes no matter how many times the user taps.

**Expanding ring**

A single \`.ring\` element expands from 8px to 54px while fading — the shock-wave that anchors the burst. It is the same self-cleaning \`animationend\` pattern.

**Rolling, formatted count**

The count is stored as text and may already be abbreviated ("1.2k"). \`toggleFav\` parses it back to a number (multiplying by 1000 when it ends in "k"), adjusts by ±1 depending on the new state, then re-formats: anything ≥ 1000 becomes \`(n/1000).toFixed(1)\` with a trailing ".0" stripped. A \`bump\` class re-triggers a short translate animation; the class is removed and a forced reflow (\`void offsetWidth\`) restarts it so rapid taps always animate.

**Reusable and stateful per button**

Because all state lives in classes and the count text on each button, the same \`toggleFav\` handler powers the large primary button and every compact button in the row independently — including one that starts pre-liked. Pair it with a [confetti button](/ui-snippets/confetti-button/) for bigger celebrations, a [product card](/ui-snippets/product-card/) wishlist toggle, or a [social post card](/ui-snippets/social-post-card/) feed.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A large "Like 128" pill button appears above a row of three compact heart buttons (one already liked) on a dark background.` },
      { title: 'Tap the big heart', text: `The heart fills red and springs with an overshoot pop, twelve coloured particles fan out, a ring expands, and the count rolls to 129.` },
      { title: 'Tap it again to un-like', text: `The heart instantly resets to its outline state and the count rolls back down — no burst on un-like, keeping the reverse action calm.` },
      { title: 'Try the compact buttons', text: `Each mini button keeps its own count and liked state. The "1.2k" button demonstrates the thousands formatting as it ticks up.` },
      { title: 'Tap rapidly', text: `Spam-tap any button — the count animation restarts every time via a forced reflow, and particles self-clean so nothing piles up in the DOM.` },
      { title: 'Adjust the burst', text: `Change the particle loop count, the distance range, or the \`COLORS\` palette in the JS to tune the burst to your brand.` },
    ] },
    features: [
      { title: 'Spring heart-pop', text: `A \`cubic-bezier(.2,1.6,.4,1)\` keyframe overshoots scale to 1.35 then settles — the bounce that makes the tap feel rewarding instead of mechanical.` },
      { title: 'Radial particle burst', text: `Twelve particles get polar-coordinate targets written as \`--tx\`/\`--ty\` custom properties; one keyframe translates, fades, and shrinks each one.` },
      { title: 'Self-cleaning DOM', text: `Every particle and the ring remove themselves on \`animationend\`, so unlimited taps never leak nodes — critical for long feeds.` },
      { title: 'Expanding shock-wave ring', text: `A single element grows from 8px to 54px while thinning its border and fading, anchoring the burst at the heart's centre.` },
      { title: 'Rolling abbreviated count', text: `Parses "1.2k"-style text back to a number, adjusts by ±1, and re-formats values ≥1000 with a stripped trailing ".0".` },
      { title: 'Reflow-restarted count bump', text: `Removing the \`bump\` class and reading \`offsetWidth\` forces a reflow so the count animation replays on every rapid tap.` },
      { title: 'Per-button independent state', text: `One \`toggleFav\` handler drives the primary and all compact buttons; each tracks its own liked class and count, including a pre-liked example.` },
      { title: 'Accessible toggle semantics', text: `Each button updates \`aria-pressed\` between "true" and "false" so screen readers announce the like state, not just a colour change.` },
    ],
    useCases: [
      { title: 'Social feed reactions', text: `The classic use — like posts, photos, and comments. Drop it into a [social post card](/ui-snippets/social-post-card/) or an [activity feed](/ui-snippets/activity-feed/) row.` },
      { title: 'Product wishlist toggle', text: `Save items to favourites from a catalogue. Wire it into a [product card](/ui-snippets/product-card/) corner so shoppers can heart products without leaving the grid.` },
      { title: 'Article and content bookmarking', text: `Let readers favourite articles or docs. Swap the heart path for a bookmark glyph and reuse the burst and count logic unchanged.` },
      { title: 'Comment and review upvotes', text: `Use it as an upvote control in a [comment thread](/ui-snippets/comment-thread/) — the count roll and burst make voting feel responsive.` },
      { title: 'Gamified achievement taps', text: `Celebrate milestones with the burst. For bigger moments, escalate to a [confetti button](/ui-snippets/confetti-button/) on the final tap.` },
      { title: 'Music and media favourites', text: `Heart tracks or videos in a player UI; the compact variant fits neatly into a [music player](/ui-snippets/music-player/) control bar.` },
      { icon: 'CODE', title: 'Related: Local Font Access Picker', desc: 'See the [Local Font Access Picker](/ui-snippets/local-font-picker/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I persist the liked state across page loads?', a: `In \`toggleFav\`, write the state to \`localStorage\` keyed by an item id (\`localStorage.setItem('fav-' + id, liked)\`). On load, read each key and add the \`.liked\` class plus the correct \`aria-pressed\` value before the user interacts. For logged-in users, sync to your API instead so favourites follow the account across devices.` },
      { q: 'How do I send the like to a backend?', a: `Call your API inside \`toggleFav\` with the new state, and update optimistically: change the UI immediately, then if the request fails, revert the class and count. This optimistic pattern keeps the interaction instant; the network round-trip happens invisibly in the background.` },
      { q: 'Can I reduce motion for users who prefer it?', a: `Wrap the burst and pop keyframes in \`@media (prefers-reduced-motion: no-preference)\` and provide a simple colour change as the fallback. The count still updates and \`aria-pressed\` still toggles, so the button stays fully functional without animation.` },
      { q: 'Why do particles use CSS custom properties instead of inline transforms?', a: `Setting \`--tx\`/\`--ty\` per element lets one shared \`@keyframes burst\` rule compute the final \`translate\` with \`calc()\`. That keeps all the timing and easing in CSS (GPU-friendly and consistent) while JavaScript only supplies the per-particle direction — cleaner than scripting each frame.` },
      { q: 'How do I use this like button in React, Vue, or Angular?', a: `In React, hold \`liked\` and \`count\` in \`useState\`, render the heart fill from \`liked\`, and spawn particles in a small effect or a ref-based helper on click. In Vue, use \`ref\`s and \`:class\` bindings with a method for the burst. In Angular, track state on the component and toggle classes with \`[class.liked]\`. The keyframes and custom-property burst CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the polar-coordinate math for the particle burst yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the burst function computes each particle's angle and distance and turns them into the negative tx and ty custom properties consumed by the keyframe, and why every particle removes itself on animationend rather than being cleaned up some other way. The same assistant can help optimize it — ask whether spawning twelve fresh DOM elements on every single tap is fast enough for a feed where many like buttons could be tapped in quick succession, and whether the count-parsing logic (handling the "1.2k" abbreviated format) covers every value the button might realistically display. It's also useful for extending it: ask it to add a double-tap-to-like gesture matching Instagram's pattern, a reduced-motion fallback that keeps the count and aria-pressed working without any animation, or a small popover showing avatars of other people who liked the same item. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a like/favorite button with a particle burst and animated count in plain HTML, CSS, and JavaScript — no library.

Requirements:
- A toggle button containing a heart icon (built from an inline SVG path, not an icon font), a label, and a count, using aria-pressed to reflect its liked/unliked state.
- When toggled to liked, the heart must fill with color and play a spring-style scale animation that overshoots past its final size before settling (an easing curve with a control point greater than 1), while toggling back to unliked must reset instantly with no animation.
- On liking (not un-liking), programmatically create roughly a dozen small particle elements positioned at the icon's center, each assigned a target x and y offset computed from evenly-spaced polar coordinates around a full circle with some random jitter in both angle and distance, written as CSS custom properties consumed by a single shared keyframe animation that translates, fades, and shrinks each particle outward.
- Also spawn a single expanding ring element on like that grows from a small circle to a larger one while fading and thinning its border, layered behind or alongside the particles as a shockwave.
- Every particle and the ring must remove themselves from the DOM automatically when their animation finishes (via an animationend listener), so tapping the button many times in a row never leaves stray elements behind.
- Parse the displayed count text back into a number even when it's in an abbreviated form like "1.2k", increment or decrement it by exactly one based on the new liked state, then re-format it back into the same abbreviated style when it crosses 1000, and play a small upward bump animation on the count element every time it changes — restarting that animation reliably even on rapid repeated taps by forcing a reflow before re-adding the animation class.
- The same click handler and CSS must work identically for multiple independent buttons on the page, each tracking its own liked state and count without any shared global state.`,
    },
  },
};

export default favoriteButton;
