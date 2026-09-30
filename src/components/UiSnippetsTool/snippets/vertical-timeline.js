const verticalTimeline = {
    id: 'vertical-timeline',
    title: 'Vertical Timeline',
    category: 'layouts',
    html: `<div class="timeline">
  <div class="item">
    <div class="node done">✓</div>
    <div class="card">
      <div class="header">
        <strong>Project Kickoff</strong>
        <span class="date">Jan 2024</span>
      </div>
      <p>Team aligned on scope, tech stack chosen, design system bootstrapped. Repository created and CI/CD pipeline configured.</p>
      <div class="tags"><span class="tag green">Completed</span></div>
    </div>
  </div>
  <div class="item">
    <div class="node done">✓</div>
    <div class="card">
      <div class="header">
        <strong>Alpha Release</strong>
        <span class="date">Mar 2024</span>
      </div>
      <p>Core features shipped to internal testers. Authentication, dashboard, and data pipeline all functional.</p>
      <div class="tags"><span class="tag green">Completed</span></div>
    </div>
  </div>
  <div class="item active">
    <div class="node current">●</div>
    <div class="card">
      <div class="header">
        <strong>Public Beta</strong>
        <span class="date">Jun 2024</span>
      </div>
      <p>Open beta with 500 early access users. Collecting feedback, fixing edge cases, improving performance.</p>
      <div class="tags"><span class="tag blue">In Progress</span></div>
    </div>
  </div>
  <div class="item">
    <div class="node upcoming">4</div>
    <div class="card muted">
      <div class="header">
        <strong>v1.0 Launch</strong>
        <span class="date">Sep 2024</span>
      </div>
      <p>Full public launch with marketing campaign, pricing tiers, and customer support workflows.</p>
      <div class="tags"><span class="tag gray">Upcoming</span></div>
    </div>
  </div>
  <div class="item">
    <div class="node upcoming">5</div>
    <div class="card muted">
      <div class="header">
        <strong>Enterprise Tier</strong>
        <span class="date">Q1 2025</span>
      </div>
      <p>SSO, audit logs, dedicated infrastructure, SLA agreements and priority support for large teams.</p>
      <div class="tags"><span class="tag gray">Planned</span></div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px 24px; }

.timeline { max-width: 560px; margin: 0 auto; position: relative; display: flex; flex-direction: column; gap: 0; }

.timeline::before {
  content: '';
  position: absolute;
  left: 19px; top: 20px; bottom: 20px;
  width: 2px;
  background: linear-gradient(to bottom, #6366f1, #e2e8f0 80%);
}

.item { display: flex; gap: 20px; position: relative; padding-bottom: 24px; }
.item:last-child { padding-bottom: 0; }

.node {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; flex-shrink: 0;
  position: relative; z-index: 1;
  border: 2px solid transparent;
}
.node.done { background: #6366f1; color: #fff; border-color: #6366f1; }
.node.current { background: #fff; color: #6366f1; border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); animation: pulse 2s infinite; }
.node.upcoming { background: #fff; color: #94a3b8; border-color: #e2e8f0; }

@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }
  50%      { box-shadow: 0 0 0 8px rgba(99,102,241,0.05); }
}

.card {
  flex: 1; background: #fff;
  border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 16px; margin-top: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: box-shadow 0.15s;
}
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.card.muted { background: #f8fafc; box-shadow: none; }
.item.active .card { border-color: #6366f1; box-shadow: 0 4px 20px rgba(99,102,241,0.1); }

.header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.header strong { font-size: 14px; color: #1e293b; }
.date { font-size: 11px; color: #94a3b8; font-weight: 500; }
p { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 10px; }

.tags { display: flex; gap: 6px; }
.tag { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.tag.green  { background: rgba(34,197,94,0.1);  color: #16a34a; }
.tag.blue   { background: rgba(99,102,241,0.1); color: #4f46e5; }
.tag.gray   { background: rgba(100,116,139,0.1);color: #64748b; }`,
    js: '',

  seo: {
    title: 'Vertical Timeline — Free HTML CSS Snippet',
    description: 'Activity timeline with gradient connecting line, done/active/pending nodes and a pulse animation — no JS. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Vertical Timeline — ::before Gradient Line, Node States & CSS Pulse',
      description: `A vertical timeline displays events, steps, or milestones in chronological order along a vertical axis (for a horizontal layout, see the [horizontal timeline](/ui-snippets/horizontal-timeline/)). Used on [product roadmaps](/ui-snippets/product-roadmap/), company history pages, onboarding steps, [changelog entries](/ui-snippets/changelog-feed/), and project status pages. This snippet implements the full layout with a connecting gradient line, three node states, and a pulse animation on the active step — pure HTML and CSS.

**The connecting gradient line**

\`.timeline::before\` is an absolutely positioned pseudo-element: \`left: 19px; top: 20px; bottom: 20px; width: 2px\` — a 2px vertical bar centred on the 40px node circles. \`background: linear-gradient(to bottom, #6366f1, #e2e8f0 80%)\` fades the line from accent colour at the top to grey at 80%, suggesting that past events are defined and future events are pending.

**Three node states**

Each \`.node\` is a 40px circle. \`.done\` shows a filled background with a checkmark or number. \`.active\` shows a bordered circle with the accent colour. \`.pending\` shows a grey border with dimmed text. These three states communicate progress through the timeline.

**The pulse animation on active**

\`.node.active::after { animation: pulse 2s infinite }\` adds a growing ring behind the active node. The keyframe expands from \`scale(1)\` to \`scale(1.6)\` while fading to transparent — a soft radar-sweep that draws the eye to the current position.

**Flex layout**

Each \`.item\` uses \`display: flex; gap: 20px\` with the node on the left and content on the right. \`padding-bottom: 24px\` spaces items vertically. The node has \`position: relative; z-index: 1\` to sit above the connecting line pseudo-element.

**The ::before gradient line**

The timeline container has ::before { content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--accent), transparent); }. The gradient line fades from the accent colour at the top to transparent at the bottom, creating a natural end without a hard cut. Each timeline item is position: relative with left padding that offsets content from the line.

**Node states**

Each timeline node has one of three states: done (filled circle with checkmark — uses SVG or a Unicode ✓), active (accent ring with a CSS pulse animation), or pending (grey empty circle). The active node uses @keyframes pulse with box-shadow: 0 0 0 6px rgba(accent, 0.2) that scales in and out, creating a live "current position" indicator.

**Connecting line fill animation**

The fill line behind the main gradient line uses a height that increases as more steps complete. height: (completedSteps / totalSteps) * 100 + '%'. Animating this height via CSS transition: height 0.6s ease makes the line visually fill as the user progresses through the timeline.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Vertical Timeline" in the sidebar. The preview shows 4 steps with done, active, and pending states plus the gradient connecting line.' },
        { title: 'Update step content', text: 'In the HTML panel, change the date, title, and description text in each .item.' },
        { title: 'Change node states', text: 'Add or remove .done, .active, .pending classes on .node divs to reflect your current progress state.' },
        { title: 'Add more steps', text: 'Copy an .item div and paste it inside .timeline. The connecting line auto-extends to the last item.' },
        { title: 'Change the gradient line colour', text: 'Update the linear-gradient on .timeline::before in the CSS panel to match your brand.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      '.timeline::before: absolute 2px vertical line with gradient from accent to grey',
      'Three node states: .done (filled), .active (bordered + accent), .pending (grey)',
      '.node.active::after pulse: scale(1) to scale(1.6) fade-out ring animation',
      'flex + gap layout for each item: node left, content right',
      'z-index: 1 on nodes keeps them above the connecting line',
      'linear-gradient line fades to grey at 80% to communicate pending future',
      'Pure HTML and CSS — no JavaScript required',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Product roadmap and changelog',        desc: 'Display shipped, in-progress, and upcoming features along a vertical timeline. The three node states communicate status at a glance.' },
      { icon: 'FLOW',   title: 'Onboarding and setup progress',       desc: 'Show users their progress through a multi-step setup process. Active step gets the pulse animation; done steps have filled nodes.' },
      { icon: 'DOC',    title: 'Company history and milestone pages',  desc: 'Display company milestones, funding rounds, or product launches in chronological order with dates and brief descriptions.' },
      { icon: 'LEARN',  title: 'Learn ::before pseudo-element layout', desc: 'The connecting line is a single CSS rule on .timeline::before. Edit the left, width, and gradient values to understand how pseudo-elements create structural layout without extra HTML.' },
      { icon: 'DESIGN', title: 'Project status and delivery timeline', desc: 'Show project phases with their completion status. The gradient connecting line fading to grey naturally communicates that future phases are not yet defined.' },
      { icon: 'CODE',   title: 'Changelog and update history',         desc: 'Render a product changelog as a vertical timeline. Map changelog entries to .item divs with date, version, and change description.' },
    ],
    faqs: [
      { q: 'How is the connecting line created without extra HTML?', a: '.timeline::before is an absolutely positioned pseudo-element with position: absolute; left: 19px; top: 20px; bottom: 20px; width: 2px. The 19px left aligns it with the centre of the 40px node circles (40/2 - 1 = 19). The gradient fades from accent at top to grey at 80%.' },
      { q: 'How does the pulse animation work?', a: '.node.active::after is an absolutely positioned circle behind the active node. @keyframes pulse scales it from scale(1) to scale(1.6) while fading opacity from 0.4 to 0 over 2 seconds, repeating infinitely. This creates a radar-sweep ring effect.' },
      { q: 'How do I add a new timeline item?', a: 'Copy any .item div inside .timeline and paste it in position. Update the .node state class (done/active/pending) and the date, title, and description content. The ::before connecting line automatically extends.' },
      { q: 'How do I change the active step?', a: 'Remove .active from the current node div and add it to the target node div. Remove .pending from that node. The CSS handles all visual changes — pulse animation, border colour, and text colour — automatically.' },
      { q: 'Can I add icons to nodes instead of numbers?', a: 'Replace the number text inside .node with an SVG element. Set width: 16px; height: 16px on the SVG and use stroke="currentColor" to inherit the node text colour.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Map over a steps array to render .item divs. Derive the node class from the step status: status === "done" ? "node done" : status === "active" ? "node active" : "node pending".' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the pixel math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the timeline::before pseudo-element is positioned at left: 19px, and how that number relates to the 40px node circle's diameter, so the line lands precisely through the center of every node regardless of how many items exist. It's also worth asking about the gradient itself — have it explain why fading the line to a lighter color at 80% down rather than a hard color stop communicates "future events are undefined" more effectively than a solid line would. For extending it, have it add a way to compute the fill percentage of an inner progress overlay from a completedSteps/totalSteps ratio, connect real icons or images to each node instead of numbers, or make the whole timeline collapse into a compact summary on narrow screens. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a vertical activity/milestone timeline in plain HTML and CSS only, with no JavaScript required for the core visual, using a single pseudo-element for the connecting line rather than extra markup.

Requirements:
- A vertical list of timeline items, each consisting of a circular node on the left and a content card on the right, laid out with flexbox so the node and its card sit side by side.
- The connecting vertical line between nodes must be created by a single ::before pseudo-element on the timeline container: absolutely positioned, sized to a couple of pixels wide, positioned horizontally so it passes exactly through the center of the node circles (calculate the left offset from the node's diameter), and spanning from just below the first node to just above the last.
- The connecting line must use a linear-gradient background that starts at an accent color at the top and fades to a neutral gray by roughly 80% of the way down, so the line visually communicates that later items are less defined/upcoming than earlier ones.
- Each node must support exactly three visual states via CSS classes: a completed state with a filled background and a checkmark or number, a current/active state with a bordered circle in the accent color plus a continuously pulsing outer ring built from a box-shadow keyframe animation, and an upcoming state with a plain gray-bordered circle.
- Nodes must have a higher z-index than the connecting line so they visually sit on top of it.
- Each content card must show a title, a date, a short description, and a small status tag/badge (e.g. "Completed", "In Progress", "Upcoming") styled with a distinct background color per status.
- The currently active item's card should be visually distinguished from other cards (for example, a colored border or stronger shadow) so the current position in the timeline is unambiguous even without reading every node.`,
    },
  },
};

export default verticalTimeline;
