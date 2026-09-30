const xpLevelProgressBar = {
  id: 'xp-level-progress-bar',
  title: 'XP Level-Up Progress Bar',
  lastmod: '2026-08-09',
  category: 'loaders',
  html: `<div class="xp-app">
  <div class="xp-card">
    <div class="xp-top">
      <div class="level-badge" id="level-badge">
        <span class="level-num" id="level-num">1</span>
      </div>
      <div class="xp-info">
        <div class="xp-title-row">
          <span class="xp-title">Level <span id="level-inline">1</span></span>
          <span class="xp-count" id="xp-count">0 / 100 XP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" id="bar-fill"></div>
          <div class="bar-flash" id="bar-flash"></div>
        </div>
      </div>
    </div>

    <button class="xp-btn" id="xp-btn">+50 XP</button>
  </div>

  <div class="level-toast" id="level-toast">
    <span class="toast-star">&#9733;</span> LEVEL UP!
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; }

.xp-app { position: relative; width: 100%; max-width: 400px; padding: 24px; }

.xp-card {
  background: #1e293b; border-radius: 18px; padding: 24px;
  border: 1px solid #334155;
  display: flex; flex-direction: column; gap: 20px;
}

.xp-top { display: flex; align-items: center; gap: 16px; }

.level-badge {
  width: 56px; height: 56px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(145deg, #fbbf24, #f59e0b);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 3px #1e293b, 0 0 0 5px #fbbf24, 0 4px 14px rgba(245,158,11,0.4);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.level-badge.pop { animation: badge-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes badge-pop {
  0% { transform: scale(1) rotate(0deg); }
  35% { transform: scale(1.35) rotate(-8deg); }
  60% { transform: scale(0.92) rotate(4deg); }
  100% { transform: scale(1) rotate(0deg); }
}
.level-num { font-size: 22px; font-weight: 800; color: #451a03; }

.xp-info { flex: 1; min-width: 0; }
.xp-title-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 8px; }
.xp-title { font-size: 15px; font-weight: 700; color: #f1f5f9; }
.xp-count { font-size: 12px; font-weight: 600; color: #94a3b8; font-variant-numeric: tabular-nums; }

.bar-track {
  position: relative; height: 16px; border-radius: 10px;
  background: #0f172a; overflow: hidden;
  border: 1px solid #334155;
}
.bar-fill {
  height: 100%; width: 0%; border-radius: 10px;
  background: linear-gradient(90deg, #6366f1, #818cf8);
  transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  position: relative;
}
.bar-fill::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  width: 40%;
  animation: shimmer 2.2s linear infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(340%); }
}

.bar-flash {
  position: absolute; inset: 0; border-radius: 10px;
  background: #fff; opacity: 0; pointer-events: none;
}
.bar-flash.burst { animation: flash-burst 0.55s ease-out; }
@keyframes flash-burst {
  0% { opacity: 0.85; box-shadow: 0 0 24px 6px rgba(251,191,36,0.9); }
  100% { opacity: 0; box-shadow: 0 0 0 0 rgba(251,191,36,0); }
}

.xp-btn {
  align-self: flex-start;
  background: #6366f1; color: #fff; border: none;
  font-size: 13.5px; font-weight: 700; font-family: inherit;
  padding: 10px 20px; border-radius: 10px; cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.xp-btn:hover { background: #4f46e5; }
.xp-btn:active { transform: scale(0.96); }

.level-toast {
  position: absolute; top: -6px; left: 50%;
  transform: translate(-50%, -12px) scale(0.85);
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #451a03; font-size: 13px; font-weight: 800;
  padding: 8px 18px; border-radius: 999px;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 8px 24px rgba(245,158,11,0.45);
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s, transform 0.3s;
  letter-spacing: 0.03em;
}
.level-toast.show {
  opacity: 1; transform: translate(-50%, -46px) scale(1);
}
.toast-star { font-size: 13px; }`,

  js: `const XP_PER_LEVEL = 100;
const XP_PER_CLICK = 50;

let level = 1;
let xp = 0;

const barFill    = document.getElementById('bar-fill');
const barFlash    = document.getElementById('bar-flash');
const xpCount     = document.getElementById('xp-count');
const levelNum    = document.getElementById('level-num');
const levelInline = document.getElementById('level-inline');
const levelBadge  = document.getElementById('level-badge');
const levelToast  = document.getElementById('level-toast');
const xpBtn       = document.getElementById('xp-btn');

let toastTimer = null;

function render() {
  const pct = Math.min(100, (xp / XP_PER_LEVEL) * 100);
  barFill.style.width = pct + '%';
  xpCount.textContent = xp + ' / ' + XP_PER_LEVEL + ' XP';
  levelNum.textContent = level;
  levelInline.textContent = level;
}

function showLevelUpToast() {
  clearTimeout(toastTimer);
  levelToast.classList.add('show');
  toastTimer = setTimeout(() => levelToast.classList.remove('show'), 1400);
}

function flashBurst() {
  barFlash.classList.remove('burst');
  // Force reflow so the animation can be retriggered on consecutive level-ups
  void barFlash.offsetWidth;
  barFlash.classList.add('burst');
}

function popBadge() {
  levelBadge.classList.remove('pop');
  void levelBadge.offsetWidth;
  levelBadge.classList.add('pop');
}

function addXp(amount) {
  xp += amount;

  if (xp >= XP_PER_LEVEL) {
    // Fill the bar to 100% first so the overflow reads as a real level-up,
    // then carry the remainder into the next level rather than discarding it.
    const remainder = xp - XP_PER_LEVEL;
    xp = XP_PER_LEVEL;
    render();

    setTimeout(() => {
      level += 1;
      xp = remainder;
      flashBurst();
      popBadge();
      showLevelUpToast();
      // Reset bar to the carried-over remainder without a backwards sweep animation
      barFill.style.transition = 'none';
      barFill.style.width = '0%';
      void barFill.offsetWidth;
      barFill.style.transition = '';
      render();
    }, 420);
  } else {
    render();
  }
}

xpBtn.addEventListener('click', () => addXp(XP_PER_CLICK));

render();`,

  seo: {
    title: 'XP Level-Up Progress Bar — Free HTML CSS JS Snippet',
    description: 'Game-style XP progress bar with correct overflow carry-over, a level-up flash burst, badge pop, and toast animation. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'XP Level-Up Progress Bar — Overflow Carry-Over, Flash Burst & Badge Pop Animation',
      description: `Gamified progress bars are one of the most effective retention patterns borrowed from video games — Duolingo streaks, LinkedIn profile completeness, and countless SaaS onboarding checklists all lean on the same psychological hook an XP bar delivers natively: visible, incremental progress toward a rewarding threshold. This snippet builds a genuine game-style level-up bar, not just a static progress indicator — clicking the "+50 XP" button animates the fill, and crossing 100% triggers a real level-up sequence with a flash burst, a scale-pop on the level badge, and a toast notification, all while correctly carrying the XP remainder forward instead of losing it.

**The core bug most XP bar implementations get wrong**

The naive implementation of an XP bar resets to \`0\` the instant XP crosses the threshold, silently discarding whatever XP was earned past 100%. This snippet's \`addXp()\` function does the arithmetic correctly: when \`xp >= XP_PER_LEVEL\`, it computes \`const remainder = xp - XP_PER_LEVEL\` *before* resetting anything, temporarily clamps the visible bar to exactly \`100\` so the viewer sees the bar genuinely fill and overflow, and only after the level-up animation sequence completes does it set \`xp = remainder\` and \`level += 1\`. If a player earns 50 XP twice in a row starting from 70/100, the sequence correctly ends at Level 2 with 20/100 XP (70 + 50 + 50 = 170, minus 100 for the level gained), never at Level 2 with 0/100.

**Sequencing the level-up animation with setTimeout**

The level-up isn't a single CSS transition — it's a short choreographed sequence, and the JavaScript uses a \`setTimeout\` to stage it in two beats. First, \`render()\` is called immediately with \`xp\` clamped to \`100\`, so the bar's existing \`transition: width 0.5s\` visibly finishes filling to the edge. After a \`420ms\` delay (timed to land just after that fill transition completes), the actual level increment happens: \`flashBurst()\` retriggers a CSS animation on a \`.bar-flash\` overlay element by removing and re-adding its \`.burst\` class (with a \`void element.offsetWidth\` forced-reflow trick in between, which is necessary because browsers batch class changes and won't restart an already-playing CSS animation without a synchronous style read forcing the browser to acknowledge the removal first), \`popBadge()\` does the identical retrigger trick on the level number badge for its squash-and-pop \`@keyframes\`, and \`showLevelUpToast()\` adds a \`.show\` class to slide the "LEVEL UP!" toast into view before auto-hiding it after 1.4 seconds.

**Resetting the bar without a backwards sweep**

After the level increments, the bar needs to visually reset to the carried-over remainder — but simply setting \`width\` to the new lower percentage would trigger the existing CSS transition and animate the fill sweeping *backwards*, which reads as a bug, not a level-up. The fix is a classic instant-reset pattern: set \`barFill.style.transition = 'none'\`, set the width to \`0%\`, force a synchronous reflow with \`void barFill.offsetWidth\`, then clear the inline \`transition\` override so the *next* fill (on the following click) animates normally again. This three-step dance — disable transition, mutate the property, force reflow, re-enable transition — is the standard technique whenever you need to jump a CSS-transitioned property to a new value without animating the jump itself.

**Visual polish: shimmer, badge glow, and toast**

The bar fill has a continuous diagonal \`shimmer\` animation layered on top via a \`::after\` pseudo-element with a translucent gradient sweeping left to right on a 2.2s loop, giving the bar a subtle "energized" look even at rest. The level badge uses a radial gold gradient (\`#fbbf24\` to \`#f59e0b\`) with a layered \`box-shadow\` ring effect to separate it from the dark card background, reserving the richer gold palette specifically for this gamification element per the visual convention that XP and level indicators read as more premium in warm colors, while the fill bar itself stays on the neutral indigo accent used throughout the rest of the interface.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click +50 XP to add experience',
          text: 'Each click calls addXp(50), which adds to the xp variable and calls render() to animate bar-fill\'s width via its existing CSS transition. The xp-count label updates to show the new "X / 100 XP" value with tabular-nums so digits do not jitter horizontally.',
        },
        {
          title: 'Watch the level-up sequence trigger on overflow',
          text: 'When xp reaches or exceeds 100, the bar first animates to a full 100% fill, then after a 420ms delay the level increments, a gold flash-burst plays across the bar, the level badge does a squash-pop animation, and a "LEVEL UP!" toast slides in above the card before auto-hiding.',
        },
        {
          title: 'Verify the remainder carries forward correctly',
          text: 'Click +50 XP repeatedly from a fresh 0/100 state — after the third click (150 total), the bar should land on Level 2 at 50/100 XP, not 0/100. The remainder = xp - XP_PER_LEVEL calculation in addXp() is what preserves that overflow instead of discarding it.',
        },
        {
          title: 'Change the XP-per-level curve',
          text: 'Edit the XP_PER_LEVEL constant to change how much XP is required per level, or make it scale with level by replacing the constant with a function like getXpForLevel(level) that returns e.g. 100 + (level - 1) * 25 for a classic RPG-style increasing curve, then use that return value everywhere XP_PER_LEVEL currently appears.',
        },
        {
          title: 'Wire addXp() to real user actions',
          text: 'Call addXp(amount) from any real event in your app — completing a task, finishing a quiz question, hitting a daily streak — instead of only the demo button. Pass different amounts for different actions to reward bigger accomplishments with bigger XP gains.',
        },
        {
          title: 'Export and persist progress across sessions',
          text: 'Click JSX to export a React component, replace the module-level level/xp variables with useState, and persist them to localStorage or your backend on every addXp call so a returning user resumes at their actual level and XP instead of restarting at Level 1.',
        },
      ],
    },
    features: [
      'Correct XP overflow handling: remainder = xp - XP_PER_LEVEL carries forward, never discards earned XP',
      'Two-beat setTimeout sequencing: bar fills to 100% first, then level-up effects fire after the fill transition lands',
      'Retriggerable CSS animations via class removal + void element.offsetWidth forced-reflow pattern',
      'Instant transition-free bar reset: disables CSS transition, jumps width, forces reflow, re-enables transition',
      'Gold radial-gradient level badge with layered box-shadow ring, separate palette from the neutral indigo bar',
      'Continuous shimmer sweep on the fill bar via an animated ::after gradient overlay, independent of level-up state',
      'Auto-dismissing "LEVEL UP!" toast with slide + scale entrance, cleared and restarted via clearTimeout on rapid clicks',
      'tabular-nums on the XP counter prevents digit-width jitter as the number changes during rapid clicking',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Gamified onboarding and profile-completion progress',
        desc: 'Products like LinkedIn and job-board profile builders use XP-style progress to nudge users toward completing more fields. Map each completed field or onboarding step to an addXp() call with a point value proportional to its importance, and let the level-up sequence celebrate meaningful completion milestones (e.g. "Level 3: Profile Verified") rather than showing a flat percentage bar that offers no sense of accomplishment.',
      },
      {
        icon: 'LEARN',
        title: 'Learning platforms and quiz/course completion rewards',
        desc: 'Course platforms and coding-practice sites (Duolingo, Codewars-style XP systems) reward correct answers or completed lessons with XP. Wire addXp() to a quiz-correct-answer handler with variable point values for difficulty, and consider pairing this bar with the [Skill Tree Progress Map](/ui-snippets/skill-tree-progress-map) snippet so learners see both cumulative effort (XP level) and structural curriculum progress (skill tree) at once.',
      },
      {
        icon: 'CODE',
        title: 'Internal tools and employee training gamification',
        desc: 'Corporate training and compliance modules use XP-style bars to make otherwise dry completion tracking feel more engaging, improving completion rates for mandatory training. The overflow-carry logic matters especially here — employees completing several modules in one sitting should see their progress accumulate correctly across level boundaries rather than losing partial credit.',
      },
      {
        icon: 'FLOW',
        title: 'Loyalty programs and customer reward tier progress',
        desc: 'E-commerce and subscription apps use points-to-next-tier bars (e.g. "250 / 500 points to Gold status") that behave identically to an XP bar under the hood. This snippet\'s overflow arithmetic directly maps to that use case: a purchase that pushes a customer past a tier threshold should correctly credit the excess points toward progress on the next tier, not reset to zero.',
      },
      {
        icon: 'DESIGN',
        title: 'Design system reference for animated threshold-crossing UI',
        desc: 'Beyond literal XP bars, the flash-burst-on-threshold and instant-reset-without-backwards-sweep techniques generalize to any UI where a value crosses a meaningful boundary — a budget bar hitting its limit, a battery indicator crossing into a warning zone, a quota bar resetting at the start of a billing cycle. Study the transition-disable/reflow/re-enable pattern here as a reusable recipe for any "jump without animating the jump" requirement.',
      },
    ],
    faqs: [
      {
        q: 'Why does the bar briefly show 100% before the level increments, instead of jumping straight to the new level?',
        a: 'The addXp() function deliberately clamps the visible xp to XP_PER_LEVEL and calls render() immediately so the existing 0.5s CSS width transition plays out and visually fills the bar completely — this reads as "you filled the bar" before the level-up effects (flash, badge pop, toast) fire 420ms later. Skipping this step and jumping straight to the new lower percentage would make the overflow invisible and the level-up feel abrupt rather than earned.',
      },
      {
        q: 'How does the code avoid losing XP earned past the 100% threshold?',
        a: 'Before resetting anything, addXp() computes const remainder = xp - XP_PER_LEVEL while xp still holds the full overflowed total. That remainder value — not zero — is what gets assigned to xp once the level increments, so any XP earned beyond the threshold correctly becomes the starting XP for the new level. A naive implementation that just sets xp = 0 on overflow silently discards that excess.',
      },
      {
        q: 'What is the void element.offsetWidth line doing, and why is it needed?',
        a: 'Browsers batch CSS class and style changes and will not restart a CSS animation that is still (or was just) applied to an element — removing and immediately re-adding the same class in the same synchronous JavaScript task gets coalesced into a no-op. Reading element.offsetWidth (or any layout-triggering property) between the removal and the re-addition forces the browser to synchronously flush pending style changes and recompute layout, which "commits" the removal before the class is re-added, allowing the @keyframes animation to genuinely restart from frame zero.',
      },
      {
        q: 'How do I make each level require more XP than the last, like a real RPG?',
        a: 'Replace the flat XP_PER_LEVEL constant with a function, e.g. function xpForLevel(lvl) { return Math.round(100 * Math.pow(1.15, lvl - 1)); }, which returns a growing threshold per level. Use xpForLevel(level) everywhere the code currently references XP_PER_LEVEL — in the percentage calculation in render(), the overflow check in addXp(), and the remainder calculation — so the bar\'s denominator scales correctly as the player levels up.',
      },
      {
        q: 'Can multiple rapid clicks trigger overlapping level-ups correctly?',
        a: 'Yes, within reason — each click calls addXp() synchronously and the remainder math correctly accumulates across calls since xp is a shared module-level variable. However, if a click lands during the 420ms level-up delay window from a previous click, the two setTimeout callbacks could interleave; for production use with very rapid or bulk XP grants, batch the additions (sum them, then call addXp once) or add a small isLevelingUp guard flag that queues additional XP until the current level-up sequence finishes.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why the remainder = xp - XP_PER_LEVEL calculation has to happen before the level increments — that overflow-carry arithmetic is the one detail that's easy to get subtly wrong. It's also worth asking the assistant to explain the void barFill.offsetWidth forced-reflow trick used both for retriggering the flash/badge animations and for resetting the bar without a backwards sweep — it's a genuinely non-obvious browser behavior worth understanding rather than just copying. For extension, ask it to add a scaling XP-per-level curve, a queue system so rapid consecutive addXp() calls during an in-progress level-up don't visually collide, or a multi-level jump (e.g. one huge XP grant that should level up twice in a row with two toasts in sequence).`,
      prompt: `Build a game-style XP level-up progress bar in plain HTML, CSS, and JavaScript with a level badge, a fill bar, and a button that adds XP.

Requirements:
- Display the current level number in a badge and the current XP as "current / required" text next to an animated horizontal fill bar.
- A button that adds a fixed amount of XP per click, animating the bar's fill width smoothly via a CSS transition rather than snapping instantly.
- When added XP would push the total past the required threshold for the current level, correctly carry the overflow amount forward as the starting XP for the new level — never discard XP earned past the threshold, and never silently reset to a smaller amount than was actually earned.
- On level-up, play a short choreographed sequence: the bar should first visibly finish filling to 100%, then (after a brief delay so the fill reads clearly) trigger a flash or glow burst effect, increment the level number with a scale-pop animation on the badge, and show a temporary "LEVEL UP!" toast notification that appears and then auto-dismisses after roughly 1-1.5 seconds.
- After the level increments, the bar must reset to display the carried-over remainder without animating a visible backwards sweep from the old fill position — explain the specific CSS/JS technique you use to jump the width instantly while keeping the transition intact for subsequent normal fills.
- Ensure CSS animations that need to play again on a second consecutive level-up (the flash burst, the badge pop) actually restart each time rather than silently not playing because the class was never removed, or was removed and re-added in the same synchronous tick.`,
    },
  },
};

export default xpLevelProgressBar;
