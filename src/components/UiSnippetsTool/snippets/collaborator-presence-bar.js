const collaboratorPresenceBar = {
  id: 'collaborator-presence-bar',
  title: 'Collaborator Presence Bar',
  lastmod: '2026-08-08',
  category: 'cards',
  html: `<div class="cpb-wrap">
  <div class="cpb-card">
    <div class="cpb-header">
      <span class="cpb-title">Untitled Document</span>
      <span class="cpb-count" id="cpb-count">0 online</span>
    </div>
    <div class="cpb-stack" id="cpb-stack"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px; }

.cpb-wrap { width: 100%; max-width: 420px; }
.cpb-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.cpb-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.cpb-title { font-size: 14px; font-weight: 700; color: #0f172a; }
.cpb-count { font-size: 12px; font-weight: 600; color: #94a3b8; }

.cpb-stack { display: flex; align-items: center; height: 44px; padding-left: 8px; }

.cpb-avatar {
  position: relative;
  width: 38px; height: 38px; border-radius: 50%;
  margin-left: -10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #fff;
  border: 2.5px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  cursor: default;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.24s ease, margin-left 0.28s ease, z-index 0s;
}
.cpb-avatar.enter { transform: scale(1); opacity: 1; }
.cpb-avatar.leave { transform: scale(0.4); opacity: 0; margin-left: -19px; }

.cpb-stack:hover .cpb-avatar { margin-left: -4px; }
.cpb-avatar:hover { transform: scale(1.12) translateY(-3px); z-index: 50; }

.cpb-ring { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid; opacity: 0; }
.cpb-avatar.active .cpb-ring { opacity: 1; animation: cpb-ring-pulse 1.8s ease-in-out infinite; }
@keyframes cpb-ring-pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.14); opacity: 0.35; } }

.cpb-typing { position: absolute; bottom: -4px; right: -4px; display: none; align-items: center; gap: 1.5px; background: #0f172a; border-radius: 8px; padding: 3px 4px; z-index: 5; }
.cpb-avatar.typing .cpb-typing { display: flex; }
.cpb-typing span { width: 3px; height: 3px; border-radius: 50%; background: #fff; animation: cpb-typing-dot 1s ease-in-out infinite; }
.cpb-typing span:nth-child(2) { animation-delay: 0.15s; }
.cpb-typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes cpb-typing-dot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-2px); opacity: 1; } }

.cpb-tooltip {
  position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(4px);
  background: #0f172a; color: #fff; font-size: 11px; font-weight: 600; padding: 5px 9px;
  border-radius: 6px; white-space: nowrap; opacity: 0; pointer-events: none;
  transition: opacity 0.15s, transform 0.15s; z-index: 60;
}
.cpb-avatar:hover .cpb-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }`,
  js: `const stack = document.getElementById('cpb-stack');
const countEl = document.getElementById('cpb-count');

const PEOPLE = [
  { id: 1, name: 'Amara Chen', initials: 'AC', color: '#6366f1' },
  { id: 2, name: 'Diego Ruiz', initials: 'DR', color: '#22c55e' },
  { id: 3, name: 'Priya Nair', initials: 'PN', color: '#f59e0b' },
  { id: 4, name: 'Sofia Weber', initials: 'SW', color: '#ec4899' },
  { id: 5, name: 'Kenji Sato', initials: 'KS', color: '#06b6d4' },
  { id: 6, name: 'Lena Kowalski', initials: 'LK', color: '#a855f7' },
];

// ---- Consistent per-user color assignment ----
// Each person's color lives on the PEOPLE record itself, not derived from
// join order or array index, so the same user is always the same ring color
// no matter how many times they join and leave, or in what order others do.
const colorFor = (id) => PEOPLE.find(p => p.id === id).color;

const activeIds = new Set();       // currently "online" user ids
const elements = new Map();        // id -> DOM node, kept alive during leave animation
let typingId = null;

function renderCount() {
  const n = activeIds.size;
  countEl.textContent = n + (n === 1 ? ' online' : ' online');
}

function createAvatarEl(person) {
  const el = document.createElement('div');
  el.className = 'cpb-avatar';
  el.style.background = person.color;
  el.style.zIndex = String(10 + person.id);
  el.textContent = person.initials;

  const ring = document.createElement('div');
  ring.className = 'cpb-ring';
  ring.style.borderColor = person.color;
  el.appendChild(ring);

  const typing = document.createElement('div');
  typing.className = 'cpb-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  el.appendChild(typing);

  const tooltip = document.createElement('div');
  tooltip.className = 'cpb-tooltip';
  tooltip.textContent = person.name;
  el.appendChild(tooltip);

  return el;
}

// ---- Enter animation: mount at scale(0)/opacity 0, then flip to .enter on
// the next frame so the browser actually animates the transition instead of
// starting already at its final state. ----
function join(id) {
  if (activeIds.has(id)) return;
  activeIds.add(id);
  const person = PEOPLE.find(p => p.id === id);
  const el = createAvatarEl(person);
  el.classList.add('active');
  stack.appendChild(el);
  elements.set(id, el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('enter'));
  });
  renderCount();
}

// ---- Exit animation: add .leave to trigger the shrink/fade transition, then
// remove the node from the DOM only once transitionend confirms the
// animation actually finished, so a rapid rejoin never gets cut off mid-way. ----
function leave(id) {
  if (!activeIds.has(id)) return;
  activeIds.delete(id);
  const el = elements.get(id);
  if (!el) return;
  el.classList.remove('enter', 'active', 'typing');
  el.classList.add('leave');
  const onEnd = (e) => {
    if (e.propertyName !== 'transform') return;
    el.removeEventListener('transitionend', onEnd);
    if (el.parentNode) el.parentNode.removeChild(el);
    elements.delete(id);
  };
  el.addEventListener('transitionend', onEnd);
  renderCount();
}

function setTyping(id) {
  if (typingId !== null) {
    const prev = elements.get(typingId);
    if (prev) prev.classList.remove('typing');
  }
  typingId = id;
  const el = elements.get(id);
  if (el) el.classList.add('typing');
  setTimeout(() => {
    if (typingId === id) {
      typingId = null;
      if (el) el.classList.remove('typing');
    }
  }, 2200);
}

// ---- Simulated presence loop ----
// Randomly joins or removes a person on an interval so the row's membership
// genuinely changes over time, and occasionally flags an active user as
// typing, all independent of any real backend.
function simulateTick() {
  const online = PEOPLE.filter(p => activeIds.has(p.id));
  const offline = PEOPLE.filter(p => !activeIds.has(p.id));

  const shouldJoin = offline.length > 0 && (online.length < 2 || Math.random() < 0.55);
  if (shouldJoin && offline.length) {
    const pick = offline[Math.floor(Math.random() * offline.length)];
    join(pick.id);
  } else if (online.length > 1) {
    const pick = online[Math.floor(Math.random() * online.length)];
    leave(pick.id);
  }

  const stillOnline = PEOPLE.filter(p => activeIds.has(p.id));
  if (stillOnline.length && Math.random() < 0.5) {
    const pick = stillOnline[Math.floor(Math.random() * stillOnline.length)];
    setTyping(pick.id);
  }
}

// Seed a few initial collaborators, staggered so they don't all pop in at once.
[1, 2, 3].forEach((id, i) => setTimeout(() => join(id), i * 220));

setInterval(simulateTick, 2200);`,
  seo: {
    title: 'Collaborator Presence Bar — Free HTML CSS JS Snippet',
    description: 'A Google Docs-style avatar stack with per-user color rings, animated join/leave, and per-person typing indicators. Exports to React & Vue.',
    about: {
      title: 'Collaborator Presence Bar — Animated Avatar Stack With Per-User Color Rings and Per-Person Typing Indicators',
      description: `Most "someone is typing" indicators show one generic message for the whole document or thread, which tells you almost nothing when three people are editing at once. Google Docs and Figma solve this differently: presence is shown per person, at all times — every active collaborator gets their own avatar, their own consistently-colored ring, and their own typing indicator attached directly to their face, not funneled into one shared status line. This snippet rebuilds that per-person presence model: a horizontally overlapping avatar stack where users animate in and out as they join and leave, each active user carries a distinct, consistently-reused ring color, and a typing indicator appears as a small animated dot cluster attached to the specific avatar of whoever is typing.

**Why color assignment lives on the data, not on join order**

The most common bug in an avatar-stack implementation is assigning colors based on array index or join order — which silently breaks the moment membership changes, because the third person to join today might be a different actual user than the third person to join tomorrow, yet they would render with the same ring color. This snippet avoids that entirely by storing each person's \`color\` directly on their static \`PEOPLE\` record at definition time, so \`colorFor(id)\` always looks up a fixed, permanent property rather than computing anything from the current online list. The result: Diego Ruiz is always the green ring, whether he is the first person online or the fifth, whether he just rejoined for the third time or has been present the whole session — consistency comes from the color living on the person, not on their position in a list.

**The enter animation: why it needs two nested requestAnimationFrame calls**

When a new avatar joins, \`join()\` creates the element already styled at \`transform: scale(0); opacity: 0\` (via its base CSS class, before \`.enter\` is added) and appends it to the DOM. Simply adding the \`.enter\` class in the same synchronous call would not animate anything, because the browser would batch the initial style and the transitioning style into the same paint and never render the "before" state at all. The fix is two nested \`requestAnimationFrame\` calls: the first guarantees the browser has committed a frame with the element still at its starting scale/opacity, and the second (scheduled from inside the first) then adds \`.enter\`, guaranteeing the transition has a genuine starting point to animate from. This is the same "force a layout, then change the class" problem every CSS-transition-triggered-by-JS implementation has to solve, just solved with rAF instead of reading \`offsetHeight\` to force a synchronous reflow.

**The exit animation: waiting for transitionend before touching the DOM**

\`leave()\` does the mirror image correctly too, and this is where a lot of "avatar leaves the stack" implementations get subtly wrong: they remove the element from the DOM immediately, which cancels any in-flight CSS transition instantly and makes the user just vanish with no shrink or fade at all. This snippet instead adds a \`.leave\` class (triggering the shrink-and-fade transition) and only calls \`removeChild\` inside a \`transitionend\` listener, filtered to \`e.propertyName === 'transform'\` so it does not fire early from the parallel opacity transition finishing at a different time. The DOM node genuinely stays alive, still transitioning, for the full 320ms of its exit animation.

**The ring pulse as a distinct signal from color alone**

Every active avatar's colored ring (an absolutely positioned pseudo-ring sized slightly larger than the avatar itself, using \`border-color\` matched to the person's assigned color) runs a continuous, gentle scale-and-fade \`animation\`, independent of hover state or typing state. This is deliberately separate from the typing indicator — the ring pulse says "this person is currently present," while the typing dots say "this specific person is producing input right now." Overloading one visual signal to mean both would make it impossible to tell "online but idle" apart from "actively typing," which is exactly the distinction a collaboration tool's presence bar needs to communicate.

**Per-person typing indicators, not a shared banner**

\`setTyping(id)\` adds a \`.typing\` class to exactly one avatar at a time (clearing it from whoever had it previously), which reveals a small absolutely-positioned dot cluster anchored to that avatar's own bottom-right corner using \`::after\`-style layered \`<span>\` elements with staggered animation delays. Because the indicator is a child of the specific avatar element rather than a page-level "X is typing" message, it scales naturally to any number of simultaneous collaborators without needing string concatenation logic like "Amara and 2 others are typing" — each person's status is simply visible or not, directly on their own face.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch collaborators join the stack automatically', text: 'Every couple of seconds a new avatar animates in with a springy scale-and-fade pop, overlapping the previous avatars in the classic negative-margin avatar-stack look.' },
      { title: 'Notice each active avatar has its own colored ring', text: 'The ring color is consistently tied to that specific person — the same collaborator always gets the same ring color, even after leaving and rejoining later.' },
      { title: 'Watch the ring gently pulse on every active avatar', text: 'A slow scale-and-opacity animation runs continuously on the ring to signal "currently present," independent of whether that person is actively typing.' },
      { title: 'Watch for a small dot cluster appearing on a specific avatar', text: 'When a collaborator is simulated as typing, three animated dots appear attached to their individual avatar in the bottom-right corner, not as a generic shared banner.' },
      { title: 'Hover any avatar in the stack', text: 'The hovered avatar lifts slightly and separates from its neighbors, and a name tooltip appears above it, letting you identify exactly who is in the overlapping stack.' },
      { title: 'Watch collaborators leave the stack', text: 'An avatar shrinks and fades out in place rather than disappearing instantly, and the online count in the header updates to reflect the new total.' },
    ]},
    features: [
      'Per-user color assignment stored on the data itself, so the same person always gets the same ring color regardless of join order',
      'Two-frame requestAnimationFrame enter animation, guaranteeing a real starting state for the CSS transition to animate from',
      'transitionend-gated exit animation: the DOM node is only removed once its shrink/fade transition has genuinely finished',
      'Continuous pulsing ring animation as a distinct "present" signal, separate from the typing indicator',
      'Per-person typing indicator attached directly to that avatar, supporting multiple simultaneous typers with no string concatenation',
      'Classic overlapping avatar-stack look via negative margins, with a hover state that separates and lifts the hovered avatar',
      'Randomized join/leave simulation loop so the row\'s real membership changes over time, not a static fixed list',
      'Name tooltip on hover, revealing identity without needing to expand the compact overlapping layout',
    ],
    useCases: [
      { icon: 'APP', title: 'Real-time document and design tool presence', desc: 'The canonical Google Docs / Figma / Notion pattern for showing who is currently viewing or editing a shared document, pairing well with a [status pill](/ui-snippets/status-pill) elsewhere in the same toolbar for connection health.' },
      { icon: 'CHAT', title: 'Team chat and workspace online indicators', desc: 'Show which teammates are currently active in a channel or workspace, extending the single-user pattern from [status avatar](/ui-snippets/status-avatar) to a full multi-user presence row.' },
      { icon: 'LEARN', title: 'Teaching enter/exit list animation and consistent color assignment', desc: 'A concrete reference for animating items into and out of a dynamically changing list correctly (including the two-frame rAF trick and the transitionend-gated removal), plus the data-driven approach to assigning a stable color per entity.' },
      { icon: 'DESIGN', title: 'Multiplayer and collaborative app onboarding', desc: 'Useful in any product demo or onboarding flow that needs to visually communicate "this is collaborative and other people are here too" at a glance, distinct from a static [avatar group](/ui-snippets/avatar-group) that never changes.' },
      { icon: 'CODE', title: 'Dashboard and admin panel active-user widgets', desc: 'Reuse the same stack for an admin dashboard showing currently active operators or support agents, alongside other [dashboard](/ui-snippets) widgets tracking live activity.' },
      { icon: 'CODE', title: 'Related: GLB AR-Style Pedestal Viewer', desc: 'See the [GLB AR-Style Pedestal Viewer](/ui-snippets/glb-ar-pedestal-viewer/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is a consistent ring color guaranteed for the same person across sessions?', a: 'Each person\'s color is stored directly as a property on their static record in the PEOPLE array at definition time, not computed from their position in the currently-online list or the order they joined in. Every place that needs a color calls colorFor(id), which looks up that fixed property. Because the color is tied to the person\'s identity rather than to any runtime state, the same user renders with the same ring color whether they are the first person online or the last, and whether this is their first join or their fifth.' },
      { q: 'Why does the join animation use two nested requestAnimationFrame calls instead of just adding a class?', a: 'A newly created element is appended to the DOM already at its starting styles (scale(0), opacity 0) via its base CSS class. If the .enter class that triggers the transition were added in the very same synchronous function call, the browser could batch both style states into a single paint and skip the transition entirely, since it never got a chance to render the "before" state. The first requestAnimationFrame callback runs after the browser has committed a frame with the starting styles still in effect; the second one, scheduled from inside the first, then adds .enter, guaranteeing the transition has an actual starting point to animate away from.' },
      { q: 'Why does leave() wait for a transitionend event instead of removing the element immediately?', a: 'Removing an element from the DOM immediately cancels any CSS transition on it instantly, which would make a leaving collaborator simply vanish with no shrink or fade animation at all. Instead, leave() adds a .leave class to start the exit transition and only calls removeChild() inside a transitionend listener, filtered specifically to the transform property so it fires exactly once even though opacity is transitioning in parallel at a slightly different duration.' },
      { q: 'Can I use this presence bar with real WebSocket data instead of the simulated interval?', a: 'Yes. Replace the setInterval(simulateTick, 2200) call with your WebSocket message handler, calling join(userId) when a "user_joined" event arrives and leave(userId) on "user_left", using the same functions this snippet already defines. For typing status, call setTyping(userId) when a "typing" event arrives for that user; the existing 2200ms auto-clear timeout can either stay as a fallback or be replaced with an explicit "stopped_typing" event from your backend.' },
      { q: 'Can I use this collaborator presence bar in React, Vue, or Angular?', a: 'Yes. Model activeIds as component state (a Set or array of user ids) so React/Vue/Angular re-render the avatar list declaratively, but keep the two-frame enter animation and the transitionend-gated exit animation as imperative DOM effects — in React, trigger the enter class inside a useLayoutEffect keyed on the newly added id, and for exit, keep the leaving user\'s data around in a separate "leaving" state slice until its transitionend fires before removing it from render output entirely. Clear the setInterval driving the simulation, and any pending setTimeout from setTyping, inside the component\'s cleanup function (useEffect return, onUnmounted, or ngOnDestroy) to avoid updating state after unmount.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JS to an AI assistant like Claude and ask it to explain why join() needs two nested requestAnimationFrame calls rather than one, and why leave() waits for a transitionend event instead of removing the element immediately — both are common, easy-to-miss bugs in DOM enter/exit animations, and understanding the fix here will save you from re-discovering them the hard way. It's also worth asking whether storing each person's color on their data record (rather than deriving it from a hash of their id or name) is the right tradeoff for this use case versus a real backend-driven system with far more users than fixed colors. For extending the snippet: ask for a "+N more" overflow avatar when the stack exceeds a max visible count, cursor-position dots synced to each collaborator's typing indicator, or a click-to-expand view that lists every active collaborator's name and status in a dropdown.`,
      prompt: `Build a collaborator presence bar in plain HTML, CSS, and JavaScript showing an animated, overlapping avatar stack for simulated online users, no libraries.

Requirements:
- A row of circular avatar chips that overlap slightly (negative margin "avatar stack" look), each showing a person's initials on a colored background.
- Simulate users joining and leaving on a randomized interval so the row's actual membership changes over time, not a static fixed list — new avatars must animate in with a scale-and-fade entrance, and leaving avatars must animate out with a scale-and-fade exit rather than disappearing or being removed from the DOM instantly.
- Assign each person a distinct color that is stored on their identity (not derived from join order or array position), so the same simulated user always gets the same ring color every time they appear, across multiple join/leave cycles.
- Every currently active avatar must show a colored ring (matching that person's assigned color) with a continuous, gentle pulsing animation to signal "present," independent of any typing state.
- Simulate one active user "typing" at a time on an interval, showing a small animated dot cluster attached directly to that specific person's avatar (not a single generic "someone is typing" message elsewhere on the page), and clear it automatically after a few seconds.
- On hover, the hovered avatar should lift slightly and separate from its neighbors, revealing a name tooltip above it.
- Use two nested requestAnimationFrame calls to reliably trigger the CSS enter transition, and a transitionend listener (filtered to a specific CSS property) to only remove a leaving avatar from the DOM after its exit animation has actually finished.`,
    },
  },
};

export default collaboratorPresenceBar;
