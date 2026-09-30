const skillTreeProgressMap = {
  id: 'skill-tree-progress-map',
  title: 'Skill Tree Progress Map',
  lastmod: '2026-08-09',
  category: 'dashboards',
  html: `<div class="tree-app">
  <div class="tree-header">
    <div>
      <h2>Frontend Skill Tree</h2>
      <p class="tree-sub">Click a glowing node to master it and unlock what comes next.</p>
    </div>
    <button class="reset-btn" id="reset-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
      Reset
    </button>
  </div>

  <div class="tree-canvas">
    <svg class="tree-svg" viewBox="0 0 500 420" preserveAspectRatio="xMidYMid meet">
      <line class="edge-base" x1="250" y1="40" x2="125" y2="160"/>
      <line class="edge-fill" id="fill-n1-n2" pathLength="1" x1="250" y1="40" x2="125" y2="160"/>

      <line class="edge-base" x1="250" y1="40" x2="375" y2="160"/>
      <line class="edge-fill" id="fill-n1-n3" pathLength="1" x1="250" y1="40" x2="375" y2="160"/>

      <line class="edge-base" x1="125" y1="160" x2="75" y2="280"/>
      <line class="edge-fill" id="fill-n2-n4" pathLength="1" x1="125" y1="160" x2="75" y2="280"/>

      <line class="edge-base" x1="125" y1="160" x2="175" y2="280"/>
      <line class="edge-fill" id="fill-n2-n5" pathLength="1" x1="125" y1="160" x2="175" y2="280"/>

      <line class="edge-base" x1="375" y1="160" x2="375" y2="280"/>
      <line class="edge-fill" id="fill-n3-n6" pathLength="1" x1="375" y1="160" x2="375" y2="280"/>

      <line class="edge-base" x1="375" y1="280" x2="375" y2="400"/>
      <line class="edge-fill" id="fill-n6-n7" pathLength="1" x1="375" y1="280" x2="375" y2="400"/>
    </svg>

    <button class="skill-node" data-node="n1" style="left:50%;top:9.52%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">HTML Basics</span>
    </button>

    <button class="skill-node" data-node="n2" style="left:25%;top:38.1%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">CSS Layout</span>
    </button>

    <button class="skill-node" data-node="n3" style="left:75%;top:38.1%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">JS Fundamentals</span>
    </button>

    <button class="skill-node" data-node="n4" style="left:15%;top:66.7%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">Flexbox</span>
    </button>

    <button class="skill-node" data-node="n5" style="left:35%;top:66.7%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">Grid</span>
    </button>

    <button class="skill-node" data-node="n6" style="left:75%;top:66.7%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">Async / APIs</span>
    </button>

    <button class="skill-node" data-node="n7" style="left:75%;top:95.2%;">
      <span class="node-icon">
        <svg class="icon-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="node-label">React</span>
    </button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.tree-app { max-width: 640px; margin: 0 auto; padding: 28px 20px 40px; }

.tree-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 8px; }
.tree-header h2 { font-size: 19px; font-weight: 700; color: #0f172a; }
.tree-sub { font-size: 12.5px; color: #64748b; margin-top: 4px; max-width: 320px; line-height: 1.5; }

.reset-btn {
  display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  background: #fff; border: 1.5px solid #e2e8f0; color: #475569;
  font-size: 12.5px; font-weight: 600; font-family: inherit;
  padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: all 0.15s;
}
.reset-btn:hover { border-color: #6366f1; color: #6366f1; }

.tree-canvas { position: relative; width: 100%; aspect-ratio: 500 / 420; margin-top: 12px; }

.tree-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.edge-base { stroke: #e2e8f0; stroke-width: 4; stroke-linecap: round; }
.edge-fill {
  stroke: #6366f1; stroke-width: 4; stroke-linecap: round;
  stroke-dasharray: 1; stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}
.edge-fill.filled { stroke-dashoffset: 0; }

.skill-node {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; font-family: inherit;
  width: 92px; padding: 0;
}

.node-icon {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #e2e8f0; color: #94a3b8;
  border: 3px solid #e2e8f0;
  transition: all 0.2s;
  position: relative;
}
.icon-check { display: none; }

.node-label {
  font-size: 11px; font-weight: 600; color: #94a3b8; text-align: center; line-height: 1.3;
  transition: color 0.2s;
}

/* Locked */
.skill-node.locked { cursor: not-allowed; filter: grayscale(1); }
.skill-node.locked .node-icon { background: #f1f5f9; border-color: #e2e8f0; color: #cbd5e1; }

/* Unlocked, not yet completed */
.skill-node.unlocked .node-icon {
  background: #eef2ff; border-color: #a5b4fc; color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
  animation: pulse-glow 1.8s ease-in-out infinite;
}
.skill-node.unlocked .icon-lock { display: none; }
.skill-node.unlocked .node-label { color: #4338ca; }
.skill-node.unlocked:hover .node-icon { transform: scale(1.08); }

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 4px rgba(99,102,241,0.12); }
  50% { box-shadow: 0 0 0 9px rgba(99,102,241,0.05); }
}

/* Completed */
.skill-node.completed { cursor: default; filter: none; }
.skill-node.completed .node-icon {
  background: #6366f1; border-color: #6366f1; color: #fff;
  box-shadow: 0 4px 14px rgba(99,102,241,0.35);
}
.skill-node.completed .icon-lock { display: none; }
.skill-node.completed .icon-check { display: block; }
.skill-node.completed .node-label { color: #1e293b; }

.skill-node.just-completed .node-icon { animation: pop-glow 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-glow {
  0% { transform: scale(1); }
  40% { transform: scale(1.35); box-shadow: 0 0 0 14px rgba(99,102,241,0.22); }
  100% { transform: scale(1); }
}

@media (max-width: 480px) {
  .node-label { font-size: 9.5px; }
  .node-icon { width: 42px; height: 42px; }
}`,

  js: `const PARENTS = { n2: ['n1'], n3: ['n1'], n4: ['n2'], n5: ['n2'], n6: ['n3'], n7: ['n6'] };
const EDGES = [
  ['n1', 'n2'], ['n1', 'n3'], ['n2', 'n4'], ['n2', 'n5'], ['n3', 'n6'], ['n6', 'n7'],
];
const ALL_NODES = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7'];

function initialState() {
  const state = {};
  ALL_NODES.forEach(id => { state[id] = id === 'n1' ? 'unlocked' : 'locked'; });
  return state;
}

let state = initialState();

function childrenOf(id) {
  return Object.keys(PARENTS).filter(child => PARENTS[child].includes(id));
}

function nodeEl(id) {
  return document.querySelector('[data-node="' + id + '"]');
}

function render() {
  ALL_NODES.forEach(id => {
    const el = nodeEl(id);
    el.classList.remove('locked', 'unlocked', 'completed');
    el.classList.add(state[id]);
    el.disabled = state[id] === 'locked';
  });

  EDGES.forEach(([from, to]) => {
    const line = document.getElementById('fill-' + from + '-' + to);
    if (state[to] === 'unlocked' || state[to] === 'completed') {
      line.classList.add('filled');
    } else {
      line.classList.remove('filled');
    }
  });
}

function completeNode(id) {
  if (state[id] !== 'unlocked') return;

  state[id] = 'completed';
  render();

  const el = nodeEl(id);
  el.classList.add('just-completed');
  el.addEventListener('animationend', () => el.classList.remove('just-completed'), { once: true });

  // Unlock children after a short beat so the fill line animates first
  setTimeout(() => {
    childrenOf(id).forEach(childId => {
      if (state[childId] === 'locked') state[childId] = 'unlocked';
    });
    render();
  }, 120);
}

ALL_NODES.forEach(id => {
  nodeEl(id).addEventListener('click', () => completeNode(id));
});

document.getElementById('reset-btn').addEventListener('click', () => {
  state = initialState();
  render();
});

render();`,

  seo: {
    title: 'Skill Tree Progress Map — Free HTML CSS JS Snippet',
    description: 'Branching node-graph skill tree with locked/unlocked/completed states and animated SVG unlock lines. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Skill Tree Progress Map — Branching Node Graph with SVG Unlock Lines and Sequential Progression',
      description: `Skill trees are one of the most satisfying progress patterns borrowed from RPGs and strategy games, and they map cleanly onto real product problems: onboarding checklists that unlock in order, course curricula with prerequisites, certification paths, or feature-gated app tiers. This snippet builds a genuinely interactive, branching skill tree — seven nodes connected by lines in a tree shape, where completing a node visibly unlocks the nodes connected beneath it — using nothing but an SVG overlay, absolutely positioned buttons, and a small state machine in vanilla JavaScript.

**The three-state node model**

Every node lives in one of three states: \`locked\`, \`unlocked\`, or \`completed\`. A \`locked\` node is desaturated with \`filter: grayscale(1)\`, shows a padlock icon, and its \`<button>\` element has the native \`disabled\` attribute set so it cannot be clicked or focused — this gets you free keyboard-accessibility semantics instead of hand-rolling \`aria-disabled\` and manual event blocking. An \`unlocked\` node is the only interactive, clickable state: it gets an indigo ring, a soft \`box-shadow\` pulse animation (\`@keyframes pulse-glow\`) to draw the eye, and the lock icon is hidden. A \`completed\` node fills solid with the accent colour, swaps in a checkmark icon, and plays a one-shot squash-and-glow pop animation the moment it finishes. The whole UI is driven by one plain JavaScript object, \`state\`, mapping node id to one of those three strings — the \`render()\` function is the single place that reads state and reconciles the DOM, so there's never a risk of the visuals drifting out of sync with the underlying data.

**Drawing branch lines that actually fill with the \`pathLength\` trick**

The connecting lines between nodes are real SVG \`<line>\` elements layered in a \`<svg>\` positioned absolutely behind the node buttons, using a fixed \`viewBox="0 0 500 420"\` so the coordinate system stays predictable regardless of how the container is resized on screen. Each connection is actually two overlapping lines: a permanent light-grey \`.edge-base\` line, and a coloured \`.edge-fill\` line on top of it that starts fully hidden. The fill trick is the \`pathLength="1"\` SVG attribute — setting it forces the browser to treat the line's total length as exactly \`1\` unit regardless of its real pixel length, so \`stroke-dasharray: 1; stroke-dashoffset: 1\` reliably hides the entire line and animating \`stroke-dashoffset\` to \`0\` via a CSS \`transition\` reliably reveals the entire line, no matter whether that particular edge is short or long. Without \`pathLength\`, you'd have to calculate each line's real length in JavaScript with \`getTotalLength()\` to get the dash values right — \`pathLength\` sidesteps that arithmetic entirely and is the technique production dashboards use for progress-line animations.

**Sequencing the unlock cascade**

The tree topology is described with a tiny \`PARENTS\` lookup object (each child node lists its parent ids) and an \`EDGES\` array pairing every connected node id for line rendering. \`childrenOf(id)\` derives the reverse relationship on the fly. When a click lands on an \`unlocked\` node, \`completeNode()\` flips its state to \`completed\`, re-renders (which fills in its own icon and any inbound line), fires the pop animation via a temporary \`.just-completed\` class removed on \`animationend\`, and then — after a short \`setTimeout\` beat so the completion animation reads clearly before the next thing happens — walks \`childrenOf(id)\` and promotes any still-\`locked\` children to \`unlocked\`, which simultaneously fills their inbound edge line and starts their pulse glow. That deliberate two-step timing (complete now, unlock a beat later) is what makes the cascade feel like a real chain reaction instead of everything popping at once.

**Reset and extension**

The reset button calls \`initialState()\` again and re-renders, instantly returning every node to its starting locked/unlocked configuration — useful for demos, and for any real onboarding flow where a user might want to redo a track. To extend the tree with more nodes, add an entry to \`PARENTS\`, an edge pair to \`EDGES\`, a positioned \`<button data-node>\` in the HTML, and a matching SVG line pair — the render logic needs no changes because it iterates the data structures generically.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click a glowing node to complete it',
          text: 'Only nodes in the "unlocked" state (indigo ring, pulsing glow) are clickable. Clicking one calls completeNode(), which flips its state to completed, plays the pop-glow animation via the .just-completed class, and fills its checkmark icon.',
        },
        {
          title: 'Watch the unlock cascade',
          text: 'After a short delay, childrenOf(id) is used to find every node connected beneath the one you just completed. Any locked child flips to unlocked, its inbound SVG line fills with colour via the pathLength stroke-dashoffset transition, and it starts pulsing to invite the next click.',
        },
        {
          title: 'Reset the whole tree',
          text: 'Click the Reset button to call initialState() again, which sets n1 back to unlocked and every other node back to locked, then re-renders. Useful for demoing the cascade repeatedly or letting a user restart a learning track.',
        },
        {
          title: 'Change the tree shape',
          text: 'Edit the PARENTS object to redefine which node unlocks which — for example n8: ["n4", "n5"] would make a node require two prerequisites completed before it unlocks. Add the matching entry to EDGES and a positioned button plus SVG line pair in the HTML.',
        },
        {
          title: 'Reposition nodes for a different layout',
          text: 'Node position is just inline left/top percentages against the 500x420 viewBox coordinate system, matched by the SVG line x1/y1/x2/y2 values. Change both together to redraw the tree as a horizontal path, a diamond, or a wide fan instead of the default top-down branch.',
        },
        {
          title: 'Export and wire to real progress data',
          text: 'Click JSX to export a React component, then replace the in-memory state object with data fetched from your backend (e.g. a user\'s completed lesson ids) and persist completeNode changes with an API call or localStorage instead of only local state.',
        },
      ],
    },
    features: [
      'Three-state node model: locked (disabled, grayscale), unlocked (pulsing, clickable), completed (filled, checkmark)',
      'SVG pathLength="1" trick: stroke-dasharray/stroke-dashoffset animate any line length uniformly, no getTotalLength() math',
      'Data-driven topology: PARENTS lookup + EDGES array drive both render() and the unlock cascade generically',
      'Native <button disabled> for locked nodes: free keyboard accessibility, no manual aria-disabled wiring',
      'Two-beat unlock sequencing: complete animation plays first, then setTimeout cascades the unlock to children',
      'CSS pop-glow keyframe animation on completion, removed automatically via animationend listener',
      'Single render() reconciler keeps DOM in sync with one plain state object — no drift possible',
      'One-click reset button restores the tree to its initial locked/unlocked configuration',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Onboarding checklists with sequential dependencies',
        desc: 'Many SaaS products gate advanced features behind earlier setup steps — connect a data source before building a dashboard, verify an email before inviting teammates. Model each onboarding step as a node with PARENTS dependencies and completeNode as the checklist-item click handler, so users get a visual sense of what unlocks next instead of a flat linear list. The pulsing glow on newly unlocked steps naturally draws attention to the very next action.',
      },
      {
        icon: 'LEARN',
        title: 'Course curricula and certification learning paths',
        desc: 'Online course platforms often have prerequisite structures — "CSS Layout" before "Flexbox" and "Grid", both before "React" — exactly like this demo tree. Replace the placeholder labels with real lesson or module names, and swap completeNode\'s state mutation for an API call that marks a lesson complete server-side, keeping the visual cascade as immediate client-side feedback while the request resolves in the background.',
      },
      {
        icon: 'DASHBOARDS',
        title: 'Gamified achievement or badge unlock maps for internal tools',
        desc: 'Internal admin tools and employee training dashboards increasingly borrow game-like progress visuals to improve completion rates. This node-graph pattern works well next to a plain [XP Level-Up Progress Bar](/ui-snippets/xp-level-progress-bar) for a combined "level + skill tree" gamification layer — the tree shows structural progress through a curriculum while the XP bar shows cumulative effort.',
      },
      {
        icon: 'FLOW',
        title: 'Feature-gated pricing tiers or unlockable app modules',
        desc: 'Product-led growth apps sometimes unlock advanced modules only after a user demonstrates activation in a simpler module first. Represent each module as a node, gate premium modules behind free-tier completion, and use the locked/unlocked visual language to make the unlock path for a trial user obvious at a glance rather than hidden in settings copy.',
      },
      {
        icon: 'DESIGN',
        title: 'Visualizing dependency graphs and prerequisite chains generally',
        desc: 'Beyond gamification, the same locked/unlocked/completed node-and-edge pattern is a legitimate way to render any small directed acyclic graph of prerequisites — a project task board where later tasks depend on earlier ones, a compliance checklist with ordered steps, or a build pipeline stage viewer. The SVG line-fill technique communicates directional flow more intuitively than a plain list with indentation.',
      },
      {
        icon: 'CODE',
        title: 'Teaching the SVG pathLength stroke-dashoffset animation technique',
        desc: 'The pathLength="1" normalization trick used here for the branch lines is broadly useful any time you need to animate a "drawing" or "filling" effect along an SVG line or path without manually computing getTotalLength() — it also underlies circular progress rings and animated underline effects, making this snippet a good reference implementation to study and reuse elsewhere in a codebase.',
      },
    ],
    faqs: [
      {
        q: 'How does the connecting line "fill with color" animation actually work?',
        a: 'Each edge is two stacked SVG <line> elements sharing identical coordinates: a static grey base line and a colored fill line with the pathLength="1" attribute set. That attribute tells the browser to treat the line\'s length as exactly 1 unit no matter its real pixel length, so stroke-dasharray: 1 and stroke-dashoffset: 1 reliably hide the whole line as one dash segment. Adding the .filled class transitions stroke-dashoffset to 0 over 0.7s with a CSS transition, which visually draws the colored line across its full length regardless of whether it is short or long — no JavaScript length calculation needed.',
      },
      {
        q: 'Why use disabled buttons instead of just adding a "locked" CSS class?',
        a: 'Setting the native disabled attribute on locked node <button> elements automatically removes them from the tab order, prevents click and keydown activation, and is announced correctly by screen readers without any manual aria-disabled or event.preventDefault() wiring. Combining disabled with the .locked CSS class (which adds the grayscale filter and lock icon) gives both the correct assistive-technology behavior and the correct visual treatment from a single state, which is the standard robust pattern for interactive-but-conditionally-disabled controls.',
      },
      {
        q: 'How do I make a node require two prerequisites instead of one?',
        a: 'The PARENTS object already supports an array of multiple parent ids per node, e.g. n8: ["n4", "n5"]. You just need to change the unlock check: instead of unconditionally unlocking a child when any one parent completes, add a helper that checks PARENTS[childId].every(p => state[p] === "completed") before flipping the child to unlocked, and call that check inside completeNode() after any node completes (not just the direct parent) since the last-needed prerequisite could be either parent.',
      },
      {
        q: 'Can I persist progress so it survives a page reload?',
        a: 'Yes — replace the in-memory state object\'s initial value with a value read from localStorage.getItem() (JSON-parsed) if present, falling back to initialState() otherwise, and call localStorage.setItem() at the end of render() so every state change is saved automatically. For multi-device or multi-user persistence, swap the localStorage calls for a fetch() to your backend, optimistically updating the UI in completeNode() and rolling back on request failure.',
      },
      {
        q: 'How do I lay the tree out horizontally instead of top-to-bottom?',
        a: 'Every node\'s position is just an inline left/top percentage computed against the SVG\'s 500x420 viewBox coordinate system, and each edge line\'s x1/y1/x2/y2 attributes must match those same node center coordinates. To go horizontal, swap the x and y values consistently for every node and every line — for example a node at x:250,y:40 (top-center) becomes x:40,y:210 (left-center) — and adjust the viewBox and container aspect-ratio in the CSS to a wide rather than tall rectangle.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how the PARENTS object, the EDGES array, and the render() function stay in sync — that's the core mental model for extending the tree safely. It's also a good snippet to ask an assistant to optimize: request a version where prerequisites can require ALL parents complete (not just any one), or one that persists state to localStorage or a backend API so progress survives a reload. A third useful ask is converting the fixed 7-node layout into a data-driven generator that lays out an arbitrary tree shape automatically from just the PARENTS relationships, rather than hand-placed x/y percentages, which is a genuinely interesting small graph-layout problem to work through with an assistant.`,
      prompt: `Build an interactive branching skill-tree progress map in plain HTML, CSS, and JavaScript — a small directed graph of nodes connected by lines, where completing a node unlocks the nodes connected beneath it.

Requirements:
- At least 6-7 nodes arranged in a branching (non-linear) tree shape, connected by lines drawn in an SVG overlay positioned behind the nodes, using a fixed viewBox coordinate system so layout stays consistent.
- Each node has exactly one of three visual/interactive states: locked (dimmed/grayscale, shows a lock icon, not clickable or focusable), unlocked (clearly highlighted and clickable, inviting interaction), and completed (distinct filled color, shows a checkmark icon).
- Clicking an unlocked node marks it completed with a satisfying pop or glow animation, and this must immediately unlock every node connected directly beneath it that was previously locked — including animating the connecting line so it visibly fills with color from parent to child rather than snapping instantly.
- The unlock cascade should feel sequenced (the completing node's own animation should read clearly before its children's lines start filling), not all fire in the exact same instant.
- A single plain JavaScript state object should be the one source of truth for every node's status, with one render function that reconciles all DOM classes and disabled attributes from that state — no state duplicated in the DOM.
- Locked nodes must be genuinely non-interactive (not just visually dimmed) — use a real disabled attribute or equivalent so they are unreachable by keyboard and unclickable by mouse.
- Include a reset control that returns the entire tree to its initial state (only the root node unlocked, everything else locked) and re-renders correctly.`,
    },
  },
};

export default skillTreeProgressMap;
