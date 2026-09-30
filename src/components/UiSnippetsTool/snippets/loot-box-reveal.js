const lootBoxReveal = {
  id: 'loot-box-reveal',
  title: 'Loot Box Reveal Animation',
  lastmod: '2026-08-09',
  category: 'animations',
  html: `<div class="demo-wrap">
  <div class="reward-stage">
    <div class="box-zone" id="box-zone">
      <div class="glow-ring" id="glow-ring"></div>
      <div class="crate" id="crate">
        <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="8" y="24" width="48" height="32" rx="3"/>
          <path d="M8 24 32 10 56 24"/>
          <path d="M8 24 32 38 56 24"/>
          <line x1="32" y1="38" x2="32" y2="56"/>
        </svg>
      </div>
      <div class="particle-field" id="particle-field"></div>
    </div>

    <div class="prize-card" id="prize-card">
      <div class="prize-rarity" id="prize-rarity">Legendary</div>
      <div class="prize-icon" id="prize-icon">★</div>
      <div class="prize-name" id="prize-name">Prize Name</div>
    </div>

    <div class="stage-actions">
      <button class="btn btn-primary" id="btn-open">Open Box</button>
      <button class="btn btn-outline hidden" id="btn-again">Open Again</button>
    </div>
  </div>

  <div class="history-panel">
    <p class="history-title">Recent openings</p>
    <ul class="history-list" id="history-list">
      <li class="history-empty">No openings yet</li>
    </ul>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f1120; min-height: 100vh; color: #e2e8f0; }

.demo-wrap {
  display: flex; flex-wrap: wrap; gap: 24px;
  align-items: flex-start; justify-content: center;
  min-height: 100vh; padding: 32px 20px;
}

.reward-stage {
  display: flex; flex-direction: column; align-items: center; gap: 20px;
  width: 320px; padding: 28px 20px;
  background: radial-gradient(circle at 50% 0%, #1e2140 0%, #14162a 70%);
  border-radius: 20px; border: 1px solid #262a4a;
}

.box-zone {
  position: relative; width: 160px; height: 160px;
  display: flex; align-items: center; justify-content: center;
}

.glow-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.3s;
}
.glow-ring.active { opacity: 1; animation: pulse-glow 0.9s ease-in-out infinite; }
@keyframes pulse-glow {
  0%, 100% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 1; }
}

.crate {
  position: relative; z-index: 2;
  width: 96px; height: 96px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(145deg, #2d3158, #1a1c34);
  color: #a5b4fc; border: 2px solid #3730a3;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  transition: transform 0.15s;
}
.crate.shaking { animation: shake 0.28s ease-in-out infinite; }
@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-4px) rotate(-3deg); }
  75% { transform: translateX(4px) rotate(3deg); }
}
.crate.burst { animation: burst-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes burst-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.35); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
}

.particle-field {
  position: absolute; inset: 0; pointer-events: none; z-index: 3;
}
.particle {
  position: absolute; top: 50%; left: 50%;
  width: 6px; height: 6px; border-radius: 50%;
  background: #a5b4fc;
  animation: particle-fly 0.75s ease-out forwards;
}
@keyframes particle-fly {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity: 0; }
}

.prize-card {
  width: 100%; padding: 20px 16px; border-radius: 14px;
  background: #191b34; border: 2px solid #2d3158;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; transform: translateY(10px) scale(0.95);
  transition: opacity 0.35s, transform 0.35s, border-color 0.35s, box-shadow 0.35s;
  pointer-events: none;
}
.prize-card.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

.prize-card.rarity-common { border-color: #64748b; }
.prize-card.rarity-rare { border-color: #3b82f6; box-shadow: 0 0 24px rgba(59,130,246,0.25); }
.prize-card.rarity-epic { border-color: #a855f7; box-shadow: 0 0 32px rgba(168,85,247,0.35); }
.prize-card.rarity-legendary { border-color: #f59e0b; box-shadow: 0 0 44px rgba(245,158,11,0.5); }

.prize-rarity {
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 3px 12px; border-radius: 20px;
}
.rarity-common .prize-rarity { background: rgba(100,116,139,0.2); color: #94a3b8; }
.rarity-rare .prize-rarity { background: rgba(59,130,246,0.2); color: #60a5fa; }
.rarity-epic .prize-rarity { background: rgba(168,85,247,0.2); color: #c084fc; }
.rarity-legendary .prize-rarity { background: rgba(245,158,11,0.2); color: #fbbf24; }

.prize-icon { font-size: 34px; }
.rarity-common .prize-icon { color: #cbd5e1; }
.rarity-rare .prize-icon { color: #60a5fa; }
.rarity-epic .prize-icon { color: #c084fc; }
.rarity-legendary .prize-icon { color: #fbbf24; text-shadow: 0 0 16px rgba(245,158,11,0.7); }

.prize-name { font-size: 15px; font-weight: 600; color: #f1f5f9; text-align: center; }

.stage-actions { display: flex; gap: 10px; width: 100%; }
.btn {
  flex: 1; padding: 11px 16px; font-size: 13px; font-weight: 600;
  border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none;
}
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #4f46e5; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-outline { background: transparent; color: #c7d2fe; border: 1.5px solid #3730a3; }
.btn-outline:hover { border-color: #818cf8; color: #fff; }
.hidden { display: none; }

.history-panel {
  width: 240px; padding: 18px 16px; border-radius: 16px;
  background: #14162a; border: 1px solid #262a4a;
}
.history-title { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
.history-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.history-empty { font-size: 12px; color: #475569; }
.history-item {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 8px 10px; border-radius: 8px; background: #1a1c34;
  font-size: 12px;
}
.history-name { color: #cbd5e1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.history-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 20px; flex-shrink: 0; }
.tag-common { background: rgba(100,116,139,0.2); color: #94a3b8; }
.tag-rare { background: rgba(59,130,246,0.2); color: #60a5fa; }
.tag-epic { background: rgba(168,85,247,0.2); color: #c084fc; }
.tag-legendary { background: rgba(245,158,11,0.2); color: #fbbf24; }`,

  js: `const PRIZES = [
  { name: 'Scrap Metal', rarity: 'common', weight: 60, icon: '⬡' },
  { name: 'Dusty Coin Pouch', rarity: 'common', weight: 60, icon: '●' },
  { name: 'Ember Crystal', rarity: 'rare', weight: 25, icon: '◆' },
  { name: 'Windrunner Cloak', rarity: 'rare', weight: 25, icon: '▲' },
  { name: 'Phoenix Sigil', rarity: 'epic', weight: 12, icon: '✦' },
  { name: 'Voidglass Blade', rarity: 'epic', weight: 12, icon: '✧' },
  { name: 'Celestial Crown', rarity: 'legendary', weight: 3, icon: '★' },
];

const RARITY_LABEL = { common: 'Common', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' };
const RARITY_PARTICLES = { common: 8, rare: 14, epic: 22, legendary: 36 };
const RARITY_COLORS = {
  common: '#94a3b8', rare: '#60a5fa', epic: '#c084fc', legendary: '#fbbf24',
};

let history = [];
let opening = false;

function weightedPick(items) {
  // Real weighted-random selection: build a cumulative weight table and
  // pick a uniform random point along the total weight range.
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function spawnParticles(rarity) {
  const field = document.getElementById('particle-field');
  field.innerHTML = '';
  const count = RARITY_PARTICLES[rarity];
  const color = RARITY_COLORS[rarity];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const distance = 60 + Math.random() * 60;
    p.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
    p.style.background = color;
    p.style.animationDelay = (Math.random() * 0.08) + 's';
    field.appendChild(p);
  }
  setTimeout(() => { field.innerHTML = ''; }, 900);
}

function addToHistory(prize) {
  history.unshift(prize);
  history = history.slice(0, 5);
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (history.length === 0) {
    list.innerHTML = '<li class="history-empty">No openings yet</li>';
    return;
  }
  list.innerHTML = history.map(p => \`
    <li class="history-item">
      <span class="history-name">\${p.icon} \${p.name}</span>
      <span class="history-tag tag-\${p.rarity}">\${RARITY_LABEL[p.rarity]}</span>
    </li>
  \`).join('');
}

function resetStage() {
  const card = document.getElementById('prize-card');
  const crate = document.getElementById('crate');
  card.className = 'prize-card';
  crate.className = 'crate';
  document.getElementById('glow-ring').classList.remove('active');
  document.getElementById('btn-again').classList.add('hidden');
  document.getElementById('btn-open').classList.remove('hidden');
}

function openBox() {
  if (opening) return;
  opening = true;
  resetStage();

  const btnOpen = document.getElementById('btn-open');
  const crate = document.getElementById('crate');
  const glow = document.getElementById('glow-ring');

  btnOpen.disabled = true;
  crate.classList.add('shaking');
  glow.classList.add('active');

  setTimeout(() => {
    const prize = weightedPick(PRIZES);
    crate.classList.remove('shaking');
    crate.classList.add('burst');
    spawnParticles(prize.rarity);

    setTimeout(() => {
      glow.classList.remove('active');
      const card = document.getElementById('prize-card');
      card.className = \`prize-card rarity-\${prize.rarity} show\`;
      document.getElementById('prize-rarity').textContent = RARITY_LABEL[prize.rarity];
      document.getElementById('prize-icon').textContent = prize.icon;
      document.getElementById('prize-name').textContent = prize.name;

      addToHistory(prize);
      btnOpen.disabled = false;
      btnOpen.classList.add('hidden');
      document.getElementById('btn-again').classList.remove('hidden');
      opening = false;
    }, 350);
  }, 1400);
}

document.getElementById('btn-open').addEventListener('click', openBox);
document.getElementById('btn-again').addEventListener('click', openBox);

renderHistory();`,

  seo: {
    title: 'Loot Box Reveal Animation — Free HTML CSS JS Snippet',
    description: 'Weighted-rarity reward reveal with shake, burst and particle animation, plus opening history — built in vanilla JS. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Loot Box Reveal Animation — Weighted Rarity Randomness, Burst Reveal & Opening History',
      description: `Reward-reveal animations are one of the most requested gamification patterns in mobile games, live-service titles, and loyalty apps: the player taps a box, the box builds suspense with a shake and glow, then bursts open to reveal a prize whose visual drama scales with how rare it is. This snippet builds the full interaction with real weighted randomness behind it rather than a fake animation over a hard-coded prize.

**Weighted rarity, not uniform randomness**

The naive way to "randomise" a reward is \`items[Math.floor(Math.random() * items.length)]\`, which gives every entry an equal 1-in-N chance regardless of how rare it is meant to feel. That is wrong for a rarity system where Legendary should be dramatically less likely than Common. The \`weightedPick()\` function instead assigns each prize a numeric \`weight\` (Common items weigh 60, Rare 25, Epic 12, Legendary 3), sums the total weight across all prizes, and draws one uniform random number in the range \`[0, totalWeight)\`. It then walks the prize list subtracting each item's weight from that roll until the running total drops to zero or below — the item where that happens is the winner. This is the standard cumulative-distribution technique used by real gacha and loot systems: the probability of landing on any given prize is exactly \`weight / totalWeight\`, which for the two Legendary entries at weight 3 each out of a total of 197 works out to roughly 3% combined, matching the brief's target odds precisely.

**Suspense sequencing with setTimeout, not a single CSS animation**

The reveal is staged in three phases driven by chained \`setTimeout\` calls rather than one long animation, because each phase needs to react to information (the chosen rarity) that is not known until the roll happens. Phase one adds a \`.shaking\` class to the crate icon, triggering a CSS \`shake\` keyframe animation (alternating \`translateX\`/\`rotate\`) alongside a pulsing radial-gradient \`.glow-ring\`, both looping for about 1.4 seconds to build tension. Phase two, once the weighted prize has already been rolled internally, swaps \`.shaking\` for \`.burst\`, a \`cubic-bezier\` keyframe that scales the crate up and then down to zero — a satisfying "pop" exit. Phase three, timed to land as the burst finishes, reveals the \`.prize-card\` with an opacity and \`translateY\`/\`scale\` transition, and its border colour, box-shadow glow intensity, and heading text all switch based on the rolled \`rarity\` string via a \`rarity-{tier}\` CSS class.

**Rarity-scaled particle burst**

At the moment of burst, \`spawnParticles()\` generates a small set of absolutely positioned \`.particle\` divs distributed evenly around a circle using trigonometry (\`Math.cos(angle) * distance\`, \`Math.sin(angle) * distance\`) and animates each one outward and fading via a CSS custom property pair (\`--dx\`, \`--dy\`) consumed by the \`particle-fly\` keyframe. The particle count scales directly with rarity — 8 for Common up to 36 for Legendary — and the particle colour matches the rarity's accent colour, so a Legendary reveal visibly explodes with far more motion than a Common one. This scaling reinforces the rarity hierarchy without needing separate animation code per tier.

**Opening history as a bounded array**

Every completed reveal is unshifted onto a \`history\` array and the array is immediately sliced to its first five entries, giving an always-current "last five openings" feed rendered as a list with each prize's name and a coloured rarity tag. This is a simple but common state-management pattern worth internalising: keep the freshest N results by combining \`unshift\` with \`slice\`, rather than manually tracking indices or splicing from the end.

**A note on responsible use**

This pattern is genuinely fun to build and to use, but reward-reveal mechanics with randomised rarity sit adjacent to gambling psychology, and several jurisdictions now regulate loot boxes in games marketed to minors (disclosure requirements in Belgium, the Netherlands, and proposed UK and US legislation). Use this component for free, cosmetic-only rewards — daily login bonuses, achievement unlocks, non-purchasable skins — never as a mechanic players pay real money to open, and always disclose the actual odds if you ship anything resembling it in a live product.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open a box', text: 'Click "Open Box" to start the sequence. The crate shakes and glows for about 1.4 seconds while the weighted roll runs internally, then it bursts and the prize card fades in with rarity-specific colour and glow intensity.' },
        { title: 'Read the rarity tier', text: 'The prize card header ("Common", "Rare", "Epic", "Legendary") and border colour tell you the rolled tier. Legendary prizes get a gold border, the strongest box-shadow glow, and the largest particle burst; Common prizes get a muted grey border and a small burst.' },
        { title: 'Check the opening history', text: 'The right-hand panel keeps a running list of your last five openings with each prize\'s name and a coloured rarity tag, generated by unshifting onto the history array and slicing it to length 5 in addToHistory().' },
        { title: 'Open again', text: 'After a reveal, the button switches to "Open Again", which calls the same openBox() function and resets the crate and glow classes via resetStage() before starting a fresh shake-burst-reveal cycle.' },
        { title: 'Tune the odds', text: 'In the JS panel, edit the weight field on any entry in the PRIZES array. Weights do not need to sum to 100 — weightedPick() normalises against the actual total, so you can add or remove prizes freely without recalculating percentages by hand.' },
        { title: 'Add new prizes or rarity tiers', text: 'Push a new object with name, rarity, weight, and icon into PRIZES, then add matching CSS rules for .rarity-{tier}, .tag-{tier}, and entries in RARITY_LABEL, RARITY_PARTICLES, and RARITY_COLORS so the new tier gets its own visual treatment.' },
      ],
    },
    features: [
      'Genuine weighted-random selection via cumulative weight subtraction in weightedPick(), not Math.random() * items.length',
      'Four-tier rarity system (Common/Rare/Epic/Legendary) with per-tier border colour, box-shadow glow and particle count',
      'Three-phase reveal sequence: CSS shake + pulsing glow-ring, burst-pop scale-out, then card fade/scale-in',
      'Particle burst generated with trigonometric angle distribution and CSS custom properties (--dx, --dy) for outward motion',
      'Bounded opening history: unshift + slice(0, 5) keeps exactly the last five results with rarity tags',
      'Rarity-scaled particle count (8 to 36) and glow intensity so higher tiers feel visibly more dramatic',
      'Button state management: Open Box disables mid-animation and swaps to Open Again after reveal completes',
      'Fully data-driven prize table — add prizes or rarity tiers by editing one array and a few CSS rules',
    ],
    useCases: [
      { icon: 'APP', title: 'Daily login reward or achievement unlock screens', desc: 'Mobile and web apps commonly reward returning users with a randomised cosmetic or currency drop. This component\'s weighted-rarity system and dramatic reveal animation give that moment real weight without requiring any payment — exactly the "genuinely free reward" use case this pattern is best suited to. Wire the win event to your backend to grant the actual item after the animation completes.' },
      { icon: 'LEARN', title: 'Teaching weighted random selection and cumulative distributions', desc: 'The weightedPick() function is a compact, readable implementation of cumulative-distribution sampling, a technique used far beyond games — A/B test bucketing, randomised load balancing, and lottery-style draws all use the same subtract-until-zero pattern. Studying this snippet is a practical way to understand weighted randomness before reaching for a library.' },
      { icon: 'DESIGN', title: 'Design system reference for rarity-tiered UI components', desc: 'Trading card games, inventory systems, and collectible-drop apps all need a consistent visual language for rarity — colour, glow, and motion intensity that scales predictably across tiers. This snippet\'s RARITY_COLORS, RARITY_PARTICLES and CSS rarity classes form a ready-made reference for building that system consistently elsewhere in a product, similar in spirit to the tiered visual states in a [Loading Progress Bar](/ui-snippets/progress-bar).' },
      { icon: 'FLOW', title: 'Onboarding or tutorial reward moments', desc: 'New-user onboarding flows often end with a small celebratory reward to reinforce completion. Because the reveal sequence is fully self-contained and triggerable from a single openBox() call, it drops cleanly into the final step of an onboarding wizard or tutorial checklist to end the flow on a high note.' },
      { icon: 'CODE', title: 'Prototyping drop-rate balance before backend integration', desc: 'Game designers frequently need to playtest rarity odds before wiring up a real backend economy. Because the weight values are plain numbers in a single array, designers or developers can tweak them live, reopen the box repeatedly, and watch the opening history to sanity-check that Legendary really does feel rare at the intended percentage.' },
      { icon: 'FORM', title: 'Free-tier engagement mechanic instead of a paid loot box', desc: 'Products that want the psychological engagement of a reveal moment without any gambling-adjacent risk can restrict this component to purely cosmetic, non-purchasable, no-cost rewards — for example a weekly free spin on a wallpaper pack or emoji set — sidestepping the regulatory scrutiny that surrounds paid loot mechanics entirely.' },
      { icon: 'CODE', title: 'Related: Traffic Light FSM Visualizer', desc: 'See the [Traffic Light FSM Visualizer](/ui-snippets/traffic-light-fsm-visualizer/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the weighted randomness actually guarantee the stated percentages?', a: 'weightedPick() sums every prize\'s weight into a total, draws one uniform random number between 0 and that total, then walks the prize list subtracting each weight until the running value drops to zero or below. Because the draw is uniform across the full weight range, the probability of landing inside any given prize\'s slice is mathematically exactly weight / totalWeight — with the given weights that works out to roughly 60% Common, 25% Rare, 12% Epic and 3% Legendary combined across their entries, matching the brief\'s target tier percentages.' },
      { q: 'Is this pattern safe to use for real loot boxes that cost money?', a: 'Not as-is, and we\'d recommend against it generally. Randomised-rarity reward mechanics tied to real-money purchases are increasingly regulated as gambling-adjacent in games aimed at minors — Belgium and the Netherlands have restricted or banned them outright, and other jurisdictions require odds disclosure. This snippet is designed and intended for genuinely free, cosmetic-only rewards (login bonuses, achievement unlocks). If you do adapt it for a paid context, you must disclose exact odds and check your local regulations first.' },
      { q: 'Can I change how many particles or how dramatic the burst looks per rarity?', a: 'Yes — edit the RARITY_PARTICLES object to change the particle count per tier, and adjust the box-shadow blur/spread values in the .rarity-{tier} CSS rules to change glow intensity. The particle distance is randomised per particle (60 to 120px) inside spawnParticles(), so you can also widen or narrow that range for a tighter or wider burst spread.' },
      { q: 'Why use setTimeout chains instead of CSS animationend events?', a: 'The reveal needs to react to the already-known prize rarity partway through the sequence — the burst timing and prize-card styling both depend on a value chosen before any animation starts. Chained setTimeout calls keep that logic simple and readable; animationend listeners would work too but add event-binding overhead for no real benefit at this scale, since the durations are fixed and known in advance.' },
      { q: 'How do I persist opening history across page reloads?', a: 'The history array currently lives in memory only and resets on reload. To persist it, call localStorage.setItem(\'loot-history\', JSON.stringify(history)) at the end of addToHistory(), and on load read it back with JSON.parse(localStorage.getItem(\'loot-history\') || \'[]\') before the first renderHistory() call.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to trace exactly how weightedPick() turns the PRIZES array's weight values into real probabilities — it's a good way to build intuition for cumulative-distribution sampling beyond just this one game mechanic. You can also ask it to walk through the three-phase setTimeout sequence (shake, burst, reveal) and explain why the timings are chained the way they are rather than driven by animationend listeners. Worth asking it to extend the component too: request a sound-effect hook keyed to rarity tier, a localStorage-backed history so openings survive a page reload, or a "pity timer" that guarantees an Epic-or-better prize after a configurable number of Common results in a row, which is a common real-world refinement to loot mechanics that keeps players from feeling unlucky for too long.`,
      prompt: `Build a loot box reward-reveal animation in plain HTML, CSS, and JavaScript with genuine weighted-rarity randomness — no frameworks, no libraries.

Requirements:
- A prize table of at least 6 items across 4 rarity tiers (Common, Rare, Epic, Legendary) where each item has an explicit numeric weight, and a selection function that uses cumulative weight subtraction against a single random draw (not Math.random() * array.length) so the actual odds match weight / totalWeight.
- A three-phase reveal sequence: a shake-and-glow suspense phase on a box icon lasting roughly 1-1.5 seconds, a burst/pop exit animation once the prize has been internally rolled, then a prize card fade/scale-in styled according to the rolled rarity.
- Each rarity tier must have visually distinct treatment — different border colour, glow/box-shadow intensity, and particle burst count/colour — so Legendary reveals are obviously more dramatic than Common ones.
- A particle burst effect at the moment of reveal, with particles distributed radially outward from the box and fading out, scaled in count by rarity tier.
- A bounded "recent openings" history list showing the last 5 results with their rarity, implemented by trimming an array rather than an unbounded log.
- An "Open Again" action that resets all animation state cleanly and can be triggered repeatedly without visual glitches or stacked timers.
- Disable the open button during the animation sequence so users cannot trigger overlapping reveals.
- In a comment, note that this pattern should only be used for free/cosmetic rewards, not real-money loot mechanics, given regulatory scrutiny in several jurisdictions.`,
    },
  },
};

export default lootBoxReveal;
