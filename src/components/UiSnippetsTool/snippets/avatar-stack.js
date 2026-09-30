const avatarStack = {
  id: 'avatar-stack',
  title: 'Overlapping Avatar Stack with Overflow Count',
  lastmod: '2026-08-17',
  category: 'cards',
  html: `<div class="demo">
  <div class="row">
    <div class="stack" id="stackA"></div>
    <span class="row-label">Reviewers</span>
  </div>
  <div class="row">
    <div class="stack stack-lg" id="stackB"></div>
    <span class="row-label">Team members</span>
  </div>
  <div class="controls">
    <label>Max visible: <span id="maxLabel">4</span></label>
    <input type="range" id="maxSlider" min="1" max="8" value="4">
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 22px; }
.row { display: flex; align-items: center; gap: 14px; }
.row-label { font-size: 13px; color: #6b7280; font-weight: 500; }
.stack { display: flex; }
.avatar-item { width: 32px; height: 32px; border-radius: 50%; border: 2.5px solid #fff; margin-left: -10px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; transition: transform 0.15s, z-index 0s; cursor: default; position: relative; }
.stack .avatar-item:first-child { margin-left: 0; }
.avatar-item:hover { transform: translateY(-4px); z-index: 10; }
.stack-lg .avatar-item { width: 40px; height: 40px; font-size: 13px; margin-left: -12px; }
.avatar-more { background: #e5e7eb; color: #4b5563; }
.controls { text-align: center; }
.controls label { display: block; font-size: 13px; color: #4b5563; margin-bottom: 8px; font-weight: 600; }
.controls input { width: 100%; }`,
  js: `var PEOPLE = [
  { name: 'Ava Chen', initials: 'AC', color: '#2563eb' },
  { name: 'Marcus Reed', initials: 'MR', color: '#16a34a' },
  { name: 'Priya Sharma', initials: 'PS', color: '#d97706' },
  { name: 'Diego Alvarez', initials: 'DA', color: '#dc2626' },
  { name: 'Sofia Marin', initials: 'SM', color: '#7c3aed' },
  { name: 'Liam O\\'Brien', initials: 'LO', color: '#0891b2' },
  { name: 'Noor Haddad', initials: 'NH', color: '#db2777' }
];

function renderStack(containerId, people, max) {
  var container = document.getElementById(containerId);
  var visible = people.slice(0, max);
  var overflow = people.length - visible.length;
  var html = visible.map(function(p) {
    return '<div class="avatar-item" style="background:' + p.color + '" title="' + p.name + '">' + p.initials + '</div>';
  }).join('');
  if (overflow > 0) {
    html += '<div class="avatar-item avatar-more" title="' + overflow + ' more">+' + overflow + '</div>';
  }
  container.innerHTML = html;
}

var maxSlider = document.getElementById('maxSlider');
var maxLabel = document.getElementById('maxLabel');

function update() {
  var max = Number(maxSlider.value);
  maxLabel.textContent = max;
  renderStack('stackA', PEOPLE, max);
  renderStack('stackB', PEOPLE, max);
}

maxSlider.addEventListener('input', update);
update();`,
  seo: {
    title: 'Avatar Stack — Overlapping Avatars with Overflow Count',
    description: 'Overlapping avatar stack with negative margin layering, hover lift, and a "+N" overflow badge for long lists. Exports to React, Vue & Angular.',
    about: {
      title: 'Avatar Stack — Overlapping Circles with a "+N" Overflow Badge',
      description: `An avatar stack shows a small preview of a longer list of people — reviewers on a pull request, members of a team, attendees of an event — using overlapping circles so a handful of faces fit in the space of one. This snippet covers the overlap layout, the hover interaction, and the overflow count that appears once the list is longer than the space allows.\n\n**Overlap via negative margin, not absolute positioning**\n\nEach \`.avatar-item\` is a flex child with \`margin-left: -10px\`, pulling every avatar after the first partially behind its predecessor. This is simpler than absolutely positioning each avatar with calculated \`left\` offsets, and it means adding or removing people from the list requires no coordinate recalculation — flexbox handles the layout automatically regardless of how many avatars are present.\n\n**Stacking order and the white border**\n\nBecause each avatar sits later in the DOM and overlaps the one before it, later avatars naturally render on top in normal stacking order. A \`2.5px solid #fff\` border around every avatar is what visually separates overlapping circles from each other — without it, adjacent avatars of similar colors would blend into an indistinct blob at the overlap edge.\n\n**The hover lift**\n\n\`.avatar-item:hover { transform: translateY(-4px); z-index: 10 }\` lifts a hovered avatar up and above its neighbors. The \`z-index: 10\` matters as much as the transform: without it, a raised avatar could still render underneath a later sibling in the stack, since normal DOM order would otherwise win. This small interaction is what makes a static stack feel like individual, distinguishable people rather than a flat decorative graphic.\n\n**The overflow badge**\n\n\`renderStack()\` slices the full people array to \`max\` visible avatars and, if any remain, appends one more circle styled as \`.avatar-more\` showing \`+N\`. This is the detail that lets a stack represent a list of any length in constant visual space — five avatars or five hundred people render in the same footprint, with the overflow badge doing the work of "and N others."\n\n**Native tooltips via the title attribute**\n\nEach avatar carries a \`title\` attribute with the person's full name (or, for the overflow badge, "N more"), which gives every avatar a free native browser tooltip on hover with zero extra markup or JavaScript. For richer tooltips — an avatar image, a role, an online-status dot — swap the \`title\` attribute for the [tooltip snippet](/ui-snippets/tooltip/)'s positioned hover panel instead.\n\n**Color-coded initials as a fallback**\n\nEach person carries a fixed \`color\` alongside their \`initials\`, used as the avatar's background when no profile photo is available. Assigning a stable, deterministic color per person (rather than a random one on every render) matters for recognizability — the same person should always render in the same color across the app, which typically means deriving the color from a hash of the user's id rather than array position.\n\n**Sizing variants**\n\nThe \`.stack-lg\` modifier scales up both the avatar size and the overlap amount (\`margin-left: -12px\` instead of \`-10px\`) together — the overlap should scale roughly proportionally with avatar size, or a larger stack either looks too spread out (overlap too small) or too cramped (overlap unchanged while avatars grew).\n\n**Real profile photos**\n\nSwap the colored initials \`div\` for an \`<img>\` with the same sizing and border rules, and add \`object-fit: cover\` so photos of varying aspect ratios crop consistently to the circle rather than stretching.\n\nSee also the [avatar stack with tooltip](/ui-snippets/avatar-stack-tooltip/) for a variant using positioned custom tooltips instead of the native title attribute, and the [avatar status list](/ui-snippets/avatar-status-list/) for a vertical list layout with online/away indicators.`,
    },
    howToUse: [
      { title: 'Copy the stack container', text: 'A .stack div holds one .avatar-item per person, rendered by JavaScript from a people array — copy the container and the renderStack function together.' },
      { title: 'Replace the PEOPLE array', text: 'Swap PEOPLE for your real user list — each entry needs a display name, initials (or a photo URL), and a stable color for the initials fallback.' },
      { title: 'Set the max visible count', text: 'Call renderStack(containerId, people, max) with however many avatars should show before the rest collapse into a "+N" badge — 3 to 5 is typical for compact UI.' },
      { title: 'Add the CSS', text: 'Paste the CSS once. The negative margin-left value controls overlap tightness — reduce it for less overlap, increase it (more negative) for tighter stacking.' },
      { title: 'Swap initials for real photos', text: 'Replace the colored-background div with an <img src="..."> using the same width/height/border-radius/border rules, plus object-fit: cover.' },
    ],
    features: [
      'Overlap achieved with simple negative margin-left — no manual coordinate math, works with any list length',
      'White border separates overlapping circles of similar color from blending together',
      'Hover lift with z-index raises an individual avatar above its neighbors for a moment of focus',
      '"+N" overflow badge collapses any remaining count into constant visual space',
      'Native title-attribute tooltips give every avatar a name label with zero extra markup',
      'Deterministic per-person color for consistent recognizability across renders',
      'Size variant (.stack-lg) scaling both avatar size and overlap amount together',
      'Zero dependencies — pure HTML, CSS, and JavaScript',
    ],
    useCases: [
      { icon: 'CODE', title: 'Pull Request Reviewers', desc: 'Showing assigned reviewers on a PR card, paired with a [comment thread](/ui-snippets/comment-thread/) below' },
      { icon: 'PEOPLE', title: 'Team & Project Members', desc: 'Compact member previews on project cards or workspace headers' },
      { icon: 'FLOW', title: 'Event Attendees', desc: 'RSVP or attendee previews on an event page, paired with a [leaderboard podium](/ui-snippets/leaderboard-podium/) for top contributors' },
      { icon: 'APP', title: 'Real-Time Presence', desc: 'Showing who else is currently viewing or editing a document, similar to Figma or Google Docs collaborator avatars' },
      { icon: 'CODE', title: 'Related: Credential Expiry Warning Card — Color-Escalating Countdown', desc: 'See the [Credential Expiry Warning Card — Color-Escalating Countdown](/ui-snippets/credential-expiry-warning-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I show real profile photos instead of colored initials?', a: 'Replace the colored .avatar-item div\'s background/text with an <img src="photo.jpg"> keeping the same width, height, border-radius, and white border, and add object-fit: cover so photos of different aspect ratios crop consistently.' },
      { q: 'How do I control how many avatars show before the "+N" badge appears?', a: 'Change the max argument passed to renderStack() — everything beyond that count collapses into a single "+N" badge showing how many are hidden.' },
      { q: 'Why does hovering lift the avatar above its neighbors?', a: 'The hover rule combines a small translateY with z-index: 10, both required together — the transform alone would visually raise the avatar but a later sibling could still render on top of it without the z-index change, since normal stacking order follows DOM order by default.' },
      { q: 'How do I add an online/offline status indicator to each avatar?', a: 'Add a small absolutely-positioned dot inside each .avatar-item, colored per that person\'s status (green for online, gray for offline), positioned at the bottom-right corner with its own white border — the same technique used in the avatar status list snippet.' },
      { q: 'How do I use this avatar stack in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component that maps over a people array as a prop with a max prop for the overflow threshold, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component with @Input() bindings — all preserve the overlap and overflow-badge logic.' },
    ],
    aiPrompt: {
      paragraph: `Paste this avatar stack's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why negative margins are used for the overlap instead of absolute positioning, and why the hover-lift interaction needs both a transform and a z-index change to work correctly. It's a good snippet to extend — ask the assistant to add a real profile-photo fallback chain (photo URL first, colored initials if the photo fails to load or is missing), or to add a small online-status dot to each avatar positioned at its bottom-right corner. Beyond that, ask it to replace the native title-attribute tooltips with the richer positioned tooltip pattern from this library's tooltip snippet, so hovering shows more than just a name.`,
      prompt: `Build an overlapping avatar stack with an overflow count badge in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Render a horizontal row of circular avatars from a JavaScript array of at least five people (each with a display name, initials, and an assigned background color), where each avatar after the first overlaps the previous one using a negative left margin rather than manual absolute positioning, so the layout works correctly regardless of how many people are in the array.
- Every avatar circle must have a solid white border so overlapping avatars of similar colors remain visually distinct from each other at the overlap edge.
- Hovering an individual avatar must lift it slightly upward and bring it visually above all of its neighboring avatars, requiring both a transform and an explicit stacking-order change to work correctly regardless of the avatar's position in the row.
- Accept a maximum-visible-count parameter. Any people beyond that count must not render as individual avatars; instead, a final circle styled distinctly from the regular avatars must display a "+N" badge showing exactly how many additional people are hidden.
- Every avatar, including the overflow badge, must expose the full name (or hidden count) as a native browser tooltip with no extra JavaScript required beyond a standard HTML attribute.
- Demonstrate the component working at two different sizes on the page, where the size variant scales both the avatar diameter and the overlap amount together so the visual density stays proportional. Include a live control (such as a slider) that changes the maximum-visible-count in real time and re-renders both stacks to demonstrate the overflow badge updating dynamically.`,
    },
  },
};

export default avatarStack;
