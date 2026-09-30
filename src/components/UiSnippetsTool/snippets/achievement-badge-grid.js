const achievementBadgeGrid = {
  id: 'achievement-badge-grid',
  title: 'Achievement Badge Collection Grid',
  lastmod: '2026-08-09',
  category: 'cards',
  html: `<div class="badge-panel">
  <div class="panel-header">
    <div>
      <h2 class="panel-title">Achievements</h2>
      <p class="panel-sub" id="progress-summary">6 / 10 unlocked</p>
    </div>
    <button class="btn-simulate" id="btn-simulate">Simulate Unlock</button>
  </div>

  <div class="progress-track">
    <div class="progress-fill" id="progress-fill" style="width: 60%;"></div>
  </div>

  <div class="badge-grid" id="badge-grid">
    <button class="badge unlocked" data-id="1" data-earned="Jan 4, 2026" style="--accent:#f59e0b;">
      <span class="badge-shine"></span>
      <span class="badge-icon">🏆</span>
      <span class="badge-name">First Steps</span>
    </button>
    <button class="badge unlocked" data-id="2" data-earned="Jan 9, 2026" style="--accent:#6366f1;">
      <span class="badge-shine"></span>
      <span class="badge-icon">🔥</span>
      <span class="badge-name">On Fire</span>
    </button>
    <button class="badge unlocked" data-id="3" data-earned="Jan 22, 2026" style="--accent:#10b981;">
      <span class="badge-shine"></span>
      <span class="badge-icon">🎯</span>
      <span class="badge-name">Sharp Shooter</span>
    </button>
    <button class="badge unlocked" data-id="4" data-earned="Feb 3, 2026" style="--accent:#0ea5e9;">
      <span class="badge-shine"></span>
      <span class="badge-icon">⚡</span>
      <span class="badge-name">Speed Runner</span>
    </button>
    <button class="badge unlocked" data-id="5" data-earned="Feb 18, 2026" style="--accent:#ec4899;">
      <span class="badge-shine"></span>
      <span class="badge-icon">💎</span>
      <span class="badge-name">Gem Collector</span>
    </button>
    <button class="badge unlocked" data-id="6" data-earned="Mar 2, 2026" style="--accent:#8b5cf6;">
      <span class="badge-shine"></span>
      <span class="badge-icon">🚀</span>
      <span class="badge-name">Launched</span>
    </button>
    <button class="badge locked" data-id="7" data-requirement="Complete 10 tasks to unlock">
      <span class="lock-overlay">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
      </span>
      <span class="badge-icon">🧭</span>
      <span class="badge-name">Explorer</span>
    </button>
    <button class="badge locked" data-id="8" data-requirement="Reach a 7-day streak to unlock">
      <span class="lock-overlay">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
      </span>
      <span class="badge-icon">🌟</span>
      <span class="badge-name">Superstar</span>
    </button>
    <button class="badge locked" data-id="9" data-requirement="Invite 3 friends to unlock">
      <span class="lock-overlay">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
      </span>
      <span class="badge-icon">🤝</span>
      <span class="badge-name">Connector</span>
    </button>
    <button class="badge locked" data-id="10" data-requirement="Finish all levels to unlock">
      <span class="lock-overlay">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
      </span>
      <span class="badge-icon">👑</span>
      <span class="badge-name">Champion</span>
    </button>
  </div>

  <div class="popover" id="popover"></div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.badge-panel {
  width: 520px; max-width: 100%;
  background: #ffffff; border-radius: 20px;
  padding: 24px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  border: 1px solid #f1f5f9;
  position: relative;
}

.panel-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.panel-title { font-size: 18px; font-weight: 700; color: #0f172a; }
.panel-sub { font-size: 12.5px; font-weight: 600; color: #6366f1; margin-top: 2px; }

.btn-simulate {
  background: #6366f1; color: #fff; border: none; border-radius: 9px;
  padding: 8px 14px; font-size: 12px; font-weight: 600; font-family: inherit;
  cursor: pointer; transition: background 0.15s; flex-shrink: 0;
}
.btn-simulate:hover { background: #4f46e5; }
.btn-simulate:disabled { background: #cbd5e1; cursor: not-allowed; }

.progress-track { height: 6px; background: #eef2ff; border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #818cf8, #6366f1); border-radius: 10px; transition: width 0.5s cubic-bezier(0.34, 1.4, 0.64, 1); }

.badge-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }

.badge {
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 14px;
  padding: 14px 6px 10px; cursor: pointer; font-family: inherit;
  transition: transform 0.15s, box-shadow 0.15s;
}
.badge:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }

.badge-icon {
  width: 46px; height: 46px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--accent, #6366f1) 55%, #fff), var(--accent, #6366f1));
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent, #6366f1) 35%, transparent);
}
.badge-name { font-size: 10.5px; font-weight: 700; color: #475569; text-align: center; line-height: 1.2; }

/* Locked state */
.badge.locked .badge-icon { background: #e2e8f0; filter: grayscale(1); box-shadow: none; }
.badge.locked .badge-name { color: #cbd5e1; }
.badge.locked { background: #fbfcfe; }
.lock-overlay {
  position: absolute; top: 8px; right: 8px;
  width: 20px; height: 20px; border-radius: 50%;
  background: #94a3b8; color: #fff;
  display: flex; align-items: center; justify-content: center;
}

/* Unlocked shine sweep */
.badge-shine {
  position: absolute; top: 0; left: -60%;
  width: 40%; height: 100%;
  background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
  transform: skewX(-20deg);
  animation: shine-sweep 3.2s ease-in-out infinite;
  pointer-events: none;
}
.badge:nth-child(2) .badge-shine { animation-delay: 0.4s; }
.badge:nth-child(3) .badge-shine { animation-delay: 0.8s; }
.badge:nth-child(4) .badge-shine { animation-delay: 1.2s; }
.badge:nth-child(5) .badge-shine { animation-delay: 1.6s; }
.badge:nth-child(6) .badge-shine { animation-delay: 2s; }
@keyframes shine-sweep {
  0% { left: -60%; }
  40%, 100% { left: 130%; }
}

/* Unlock celebration pulse */
@keyframes badge-pulse {
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5); }
  70% { box-shadow: 0 0 0 18px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}
.badge.celebrating { animation: badge-pulse 0.9s ease-out; }
.badge.celebrating .badge-icon { animation: pop-scale 0.5s ease; }
@keyframes pop-scale {
  0% { transform: scale(0.6); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* Confetti-lite burst */
.confetti-piece {
  position: absolute; top: 50%; left: 50%;
  width: 6px; height: 6px; border-radius: 1px;
  pointer-events: none;
  animation: confetti-burst 0.7s ease-out forwards;
}
@keyframes confetti-burst {
  to { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; }
}

/* Popover */
.popover {
  position: absolute; z-index: 20;
  background: #0f172a; color: #f1f5f9;
  font-size: 11.5px; font-weight: 600; line-height: 1.4;
  padding: 8px 12px; border-radius: 8px; max-width: 180px;
  opacity: 0; pointer-events: none; transform: translateY(4px);
  transition: opacity 0.15s, transform 0.15s;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}
.popover.show { opacity: 1; transform: translateY(0); }

@media (max-width: 480px) {
  .badge-grid { grid-template-columns: repeat(3, 1fr); }
}`,

  js: `const grid = document.getElementById('badge-grid');
const popover = document.getElementById('popover');
const progressSummary = document.getElementById('progress-summary');
const progressFill = document.getElementById('progress-fill');
const simulateBtn = document.getElementById('btn-simulate');

const badges = Array.from(grid.querySelectorAll('.badge'));
const total = badges.length;

function countUnlocked() {
  return badges.filter(b => b.classList.contains('unlocked')).length;
}

function updateProgress() {
  const unlocked = countUnlocked();
  progressSummary.textContent = unlocked + ' / ' + total + ' unlocked';
  progressFill.style.width = (unlocked / total * 100) + '%';
  simulateBtn.disabled = unlocked >= total;
  simulateBtn.textContent = unlocked >= total ? 'All Unlocked' : 'Simulate Unlock';
}

function hidePopover() {
  popover.classList.remove('show');
}

function showPopover(target, text) {
  popover.textContent = text;
  const panelRect = target.closest('.badge-panel').getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  popover.style.left = (rect.left - panelRect.left) + 'px';
  popover.style.top = (rect.bottom - panelRect.top + 8) + 'px';
  popover.classList.add('show');
}

function handleBadgeClick(e) {
  const badge = e.currentTarget;
  if (badge.classList.contains('locked')) {
    showPopover(badge, badge.dataset.requirement || 'Locked achievement');
  } else {
    showPopover(badge, 'Earned on ' + badge.dataset.earned);
  }
}

badges.forEach(badge => {
  badge.addEventListener('click', handleBadgeClick);
});

document.addEventListener('click', e => {
  if (!e.target.closest('.badge')) hidePopover();
});

function spawnConfetti(target) {
  const colors = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#0ea5e9'];
  const rect = target.getBoundingClientRect();
  const panelRect = target.closest('.badge-panel').getBoundingClientRect();
  const originX = rect.left - panelRect.left + rect.width / 2;
  const originY = rect.top - panelRect.top + rect.height / 2;

  for (let i = 0; i < 14; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
    const distance = 40 + Math.random() * 30;
    piece.style.left = originX + 'px';
    piece.style.top = originY + 'px';
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    piece.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
    piece.style.setProperty('--rot', (Math.random() * 360) + 'deg');
    target.closest('.badge-panel').appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

function simulateUnlock() {
  const nextLocked = badges.find(b => b.classList.contains('locked'));
  if (!nextLocked) return;
  hidePopover();
  simulateBtn.disabled = true;

  nextLocked.classList.remove('locked');
  nextLocked.classList.add('unlocked', 'celebrating');
  nextLocked.dataset.earned = 'Just now';
  const lockOverlay = nextLocked.querySelector('.lock-overlay');
  if (lockOverlay) lockOverlay.remove();
  const shine = document.createElement('span');
  shine.className = 'badge-shine';
  nextLocked.prepend(shine);

  spawnConfetti(nextLocked);
  updateProgress();

  setTimeout(() => nextLocked.classList.remove('celebrating'), 900);
}

simulateBtn.addEventListener('click', simulateUnlock);

updateProgress();`,

  seo: {
    title: 'Achievement Badge Collection Grid — HTML CSS JS Snippet',
    description: 'Unlockable badge grid with lock overlays, shine-sweep animation, progress tooltip and confetti-lite unlock burst. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Achievement Badge Collection Grid — Locked/Unlocked States, Shine Sweep Animation & Confetti-Lite Unlock Celebration',
      description: `Gamified progress systems — achievement badges, unlockable trophies, skill collections — are one of the most reliable engagement patterns in product design. Duolingo, LinkedIn, Steam, and countless SaaS onboarding flows use a badge grid to visualize accomplishment and create a sense of "one more to go." This snippet builds that pattern as a fully interactive, dependency-free component: a responsive grid of circular icon badges that can be locked (grayscale, dimmed, with a lock overlay) or unlocked (full color, with a subtle looping shine sweep), each clickable to reveal contextual information, plus a "simulate unlock" control that demonstrates the actual unlock animation sequence.

**Locked vs. unlocked visual states**

Every badge shares the same markup — an icon inside a circular frame plus a name label — and the locked/unlocked distinction is expressed entirely through CSS classes. Locked badges get \`filter: grayscale(1)\` on the icon circle, a dimmed neutral background instead of the badge's accent-colored radial gradient, and a small circular lock icon absolutely positioned in the top-right corner via \`.lock-overlay\`. Unlocked badges use \`radial-gradient(circle at 35% 30%, ...)\` with a CSS custom property \`--accent\` set per-badge inline, so each unlocked badge can have its own color (amber for "First Steps," indigo for "On Fire," emerald for "Sharp Shooter") while sharing one shared gradient formula. This custom-property approach means adding a new badge color requires zero new CSS — just a different \`--accent\` value on the button element.

**The shine-sweep animation on unlocked badges**

Unlocked badges include a \`.badge-shine\` element: an absolutely positioned, skewed white gradient strip that sweeps across the badge using a \`left\` keyframe animation from \`-60%\` to \`130%\`, masked by the badge's \`overflow: hidden\`. Because it runs on an infinite loop with staggered \`animation-delay\` values per badge (using \`:nth-child\` selectors), the sweeps ripple across the grid rather than firing in unison, producing a subtle, premium "polished trophy case" feel rather than a distracting flashing effect. The sweep uses \`transform: skewX(-20deg)\` so the highlight reads as a light reflection rather than a flat rectangle sliding across.

**Interactive tooltips for both states**

Clicking any badge — locked or unlocked — opens a small dark popover positioned relative to the badge panel using \`getBoundingClientRect()\` math to compute the offset from the panel's own bounding rect. For locked badges, it reads the requirement from a \`data-requirement\` attribute ("Complete 10 tasks to unlock"). For unlocked badges, it reads a \`data-earned\` attribute and shows "Earned on [date]". This means the demo content is entirely data-driven from HTML attributes — swapping requirement text or earned dates never touches the JavaScript. A document-level click listener closes the popover when clicking outside any badge.

**Simulating an unlock: state transition and confetti-lite burst**

The "Simulate Unlock" button demonstrates the full unlock sequence on the next locked badge in DOM order. \`simulateUnlock()\` finds the first \`.locked\` badge, swaps its classes from \`locked\` to \`unlocked\`, removes the lock overlay element, re-inserts a fresh \`.badge-shine\` element (since the shine sweep only exists on unlocked badges), and adds a temporary \`.celebrating\` class that triggers a CSS \`box-shadow\` pulse ring (\`@keyframes badge-pulse\`) and an icon pop-scale animation. Simultaneously, \`spawnConfetti()\` procedurally generates 14 small colored \`<span>\` elements positioned at the badge's center, each animated outward at a randomized angle and distance using CSS custom properties (\`--dx\`, \`--dy\`, \`--rot\`) consumed by a single shared \`@keyframes confetti-burst\` rule, then removes each piece from the DOM on \`animationend\` to avoid leaking nodes. This is deliberately "confetti-lite" — a dozen tiny squares rather than a full particle library — keeping the celebration snappy and dependency-free.

**Progress summary and grid layout**

A header shows a live "N / Total unlocked" count and a linear progress bar, both recalculated by \`updateProgress()\` after every unlock. The grid uses CSS Grid with \`repeat(5, 1fr)\` columns, collapsing to 3 columns under a mobile media query, so the same markup adapts cleanly from a wide dashboard panel down to a phone-width card.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click any badge to see details',
          text: 'Click an unlocked badge (full color) to see a popover with the date it was earned, read from its data-earned attribute. Click a locked badge (grayscale with a lock icon) to see its unlock requirement, read from data-requirement.',
        },
        {
          title: 'Try the simulate unlock button',
          text: 'Click "Simulate Unlock" in the header to watch the next locked badge transition to unlocked in real time: the grayscale filter lifts, a shine sweep starts, a pulse ring and icon pop-scale animation fire, and a confetti-lite burst scatters outward from spawnConfetti().',
        },
        {
          title: 'Add a new badge',
          text: 'Copy a .badge button in the HTML panel. For an unlocked badge, add class="badge unlocked", set style="--accent:#COLOR", and a data-earned date. For a locked badge, add class="badge locked", a data-requirement string, and the .lock-overlay SVG markup. The total count and progress bar update automatically since they read badges.length from the DOM.',
        },
        {
          title: 'Change badge icons and colors',
          text: 'Replace the emoji inside .badge-icon with any emoji, SVG, or icon font glyph. Change the --accent custom property inline on each unlocked badge to recolor its radial gradient background and glow — no other CSS edits needed since the gradient formula references var(--accent) directly.',
        },
        {
          title: 'Adjust the shine sweep timing',
          text: 'In the CSS panel, edit the shine-sweep keyframes duration (currently 3.2s) or the per-badge animation-delay values on the :nth-child selectors to make the sweep ripple faster, slower, or in a different stagger pattern across the grid.',
        },
        {
          title: 'Wire real unlock events to spawnConfetti()',
          text: 'Call spawnConfetti(badgeElement) and toggle the same locked/unlocked classes whenever your backend confirms a real achievement, for example after an API response inside a fetch().then() callback, so the exact same celebration animation fires for genuine unlocks.',
        },
      ],
    },
    features: [
      'Locked state: grayscale(1) filter, dimmed background, absolutely positioned lock icon overlay',
      'Unlocked state: per-badge --accent custom property drives a radial-gradient icon background and glow',
      'Infinite shine-sweep animation on unlocked badges with staggered nth-child animation-delay values',
      'Click-to-reveal popover reads data-requirement or data-earned attributes, positioned via getBoundingClientRect()',
      'Simulate Unlock button demonstrates the full locked-to-unlocked transition on the next badge in DOM order',
      'Procedural confetti-lite burst: 14 CSS-animated spans using --dx/--dy/--rot custom properties, self-removing on animationend',
      'Live progress summary and animated progress bar recalculated from countUnlocked() after every state change',
      'Responsive CSS Grid: 5 columns on desktop, collapses to 3 columns under a mobile media query',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Gamified onboarding and feature-adoption checklist',
        desc: 'Reward users for completing key setup steps or trying core features by unlocking a badge for each milestone. This taps into the same completion-driven psychology that makes progress bars and checklists effective, giving users a visual collection to build rather than an abstract percentage.',
      },
      {
        icon: 'LEARN',
        title: 'Learning platform course and skill completion tracker',
        desc: 'Award a badge per completed course, quiz streak, or certification, similar to Duolingo\'s achievement system. Locked badges with clear requirement text ("Complete 10 tasks to unlock") give learners a concrete next goal, which research on gamification shows increases course completion rates.',
      },
      {
        icon: 'FORM',
        title: 'Community and forum reputation system',
        desc: 'Display earned badges on a user profile page for community participation milestones — first post, helpful answer, anniversary. The click-to-reveal earned date gives other community members social proof of a user\'s history and tenure without cluttering the profile with a long text list.',
      },
      {
        icon: 'FLOW',
        title: 'Fitness or habit-tracking app streak rewards',
        desc: 'Unlock badges for workout streaks, step-count milestones, or nutrition goals met, with the simulate-unlock celebration pattern adaptable to fire the moment a real streak threshold is crossed server-side. Pairing a badge grid with a [Live Delivery Route Tracker](/ui-snippets/delivery-route-tracker)-style progress visualization gives users multiple reinforcing views of the same underlying progress data.',
      },
      {
        icon: 'DESIGN',
        title: 'Game and app store achievement showcase page',
        desc: 'Mobile and desktop games commonly ship a dedicated achievements screen matching platform conventions (Steam, Xbox, PlayStation trophies). This snippet\'s grid, lock states, and unlock celebration reproduce that familiar pattern in the browser for a web-based game or companion app without needing a platform-specific achievements API.',
      },
      {
        icon: 'CODE',
        title: 'Employee recognition and internal tools gamification',
        desc: 'Internal tools teams increasingly add lightweight gamification to encourage adoption of new features or processes, such as unlocking a badge for completing security training or filing your first support ticket correctly. This component provides a ready-made, on-brand visual reward system that plugs into any internal dashboard\'s existing user-progress data.',
      },
      { icon: 'CODE', title: 'Related: A/B Test Results Card', desc: 'See the [A/B Test Results Card](/ui-snippets/ab-test-results-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Heart Rate Zone Card', desc: 'See the [Heart Rate Zone Card](/ui-snippets/heart-rate-zone-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Parcel Locker Pickup Code Card', desc: 'See the [Parcel Locker Pickup Code Card](/ui-snippets/locker-pickup-code-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the shine sweep animation work without JavaScript?',
        a: 'Each unlocked badge contains a .badge-shine span — a skewed, semi-transparent white gradient strip positioned absolutely inside the badge, which has overflow: hidden. A CSS @keyframes rule animates its left property from -60% to 130% on an infinite loop, so it continuously sweeps across and off the badge, clipped to the badge boundary. Staggered animation-delay values per badge (via :nth-child selectors) prevent every badge from flashing in unison.',
      },
      {
        q: 'How is the confetti-lite burst generated without a particle library?',
        a: 'spawnConfetti() runs a small loop that creates 14 absolutely positioned <span> elements at the badge\'s center, each given randomized CSS custom properties for horizontal distance (--dx), vertical distance (--dy), and rotation (--rot). A single shared @keyframes confetti-burst rule animates transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) with fading opacity. Each piece listens for its own animationend event and removes itself from the DOM, so no elements accumulate after repeated unlocks.',
      },
      {
        q: 'Can I connect the simulate unlock button to a real backend event?',
        a: 'Yes. The simulateUnlock() function is a self-contained example of the state transition — swapping locked/unlocked classes, removing the lock overlay, re-adding a shine element, and calling spawnConfetti(). Call this same sequence of DOM operations from inside your actual achievement-unlocked event handler (a WebSocket message, a fetch response, or a Redux/Zustand state change) instead of the button click listener.',
      },
      {
        q: 'How do I control which badge unlocks next?',
        a: 'simulateUnlock() finds the first element with the .locked class in DOM order using Array.prototype.find(), so badges unlock in the sequence they appear in the HTML. To unlock a specific badge instead, select it directly by its data-id attribute (for example document.querySelector(\'[data-id="7"]\')) and run the same class-swap and celebration logic on that element rather than the DOM-order search.',
      },
      {
        q: 'Is the popover positioning responsive to scrolling and resizing?',
        a: 'The popover position is calculated from getBoundingClientRect() at the moment of the click, relative to the badge panel\'s own bounding rect, so it is correctly placed for the current layout every time it opens. Because it recalculates fresh on each click rather than persisting a cached position, resizing the window or scrolling the page and then clicking a badge again will always produce accurate placement.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the locked and unlocked visual states share the same badge markup but diverge entirely through CSS classes and the --accent custom property, and how spawnConfetti() generates randomized particle trajectories using only CSS custom properties and one shared keyframes rule. It's also a strong candidate for extension — ask the assistant to wire simulateUnlock() to fire automatically when a real achievement condition is met in your app's state, to add a "recently unlocked" sorting mode that moves newly earned badges to the front of the grid, or to add keyboard navigation so badges can be tabbed through and activated with Enter for full accessibility. Because the celebration logic (pulse, shine, confetti) is cleanly separated from the data (locked/unlocked class, data attributes), it's easy to ask for a version driven entirely by an external JSON array of achievements.`,
      prompt: `Build an achievement badge collection grid in plain HTML, CSS, and JavaScript with locked and unlocked states, click-to-reveal details, and an unlock celebration animation — no external libraries.

Requirements:
- Render a responsive grid of at least 8 circular icon badges, each showing an icon and a name label, where each badge can independently be in a locked or unlocked visual state driven by CSS classes rather than duplicated markup.
- Unlocked badges must appear in full color with a subtle continuous shine-sweep animation across the icon; locked badges must appear grayscale/dimmed with a visible lock icon overlay, and the two states must be visually unmistakable at a glance.
- Clicking a locked badge shows a popover or tooltip with a specific unlock requirement string unique to that badge; clicking an unlocked badge shows a popover with the date or context it was earned; clicking outside any badge closes the popover.
- Show a live summary at the top such as "6 / 10 unlocked" plus a proportional progress bar, both recalculating automatically whenever a badge's locked/unlocked state changes.
- Include a "Simulate Unlock" button that transitions the next locked badge (in a well-defined order) to unlocked, playing a celebratory animation — at minimum a brief scale/pulse effect on the badge plus a lightweight procedural confetti burst made of small animated shapes that clean themselves up from the DOM afterward, not a static image or GIF.
- Disable or relabel the simulate button once every badge is unlocked, and handle the edge case where no locked badges remain without throwing an error.
- Keep the grid responsive, collapsing to fewer columns on narrow/mobile viewports while keeping badges legible and tappable.`,
    },
  },
};

export default achievementBadgeGrid;
