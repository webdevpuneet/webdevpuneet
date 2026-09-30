const avatarStackTooltip = {
  id: 'avatar-stack-tooltip',
  title: 'Avatar Stack with Tooltip',
  lastmod: '2026-06-22',
  category: 'cards',
  html: `<div class="ast-card">
  <p class="ast-label">On this project</p>
  <div class="ast-stack" id="astStack"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ast-card{background:#fff;border-radius:16px;padding:26px 30px;box-shadow:0 12px 30px rgba(15,23,42,.08);text-align:center}
.ast-label{font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:16px}

.ast-stack{display:flex;justify-content:center;padding-top:8px}
.ast-item{position:relative;margin-left:-12px;transition:transform .2s}
.ast-item:first-child{margin-left:0}
.ast-item:hover{transform:translateY(-6px);z-index:5}
.ast-avatar{width:48px;height:48px;border-radius:50%;border:3px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 2px 6px rgba(15,23,42,.12)}
.ast-more .ast-avatar{background:#e2e8f0;color:#64748b}

.ast-tip{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%) translateY(6px) scale(.92);
  background:#0f172a;color:#fff;border-radius:10px;padding:9px 13px;width:170px;text-align:left;
  opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;transform-origin:bottom center;z-index:10;box-shadow:0 10px 28px rgba(15,23,42,.3)}
.ast-item:hover .ast-tip{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
.ast-tip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#0f172a}
.ast-tip-name{font-size:13px;font-weight:800;display:block}
.ast-tip-role{font-size:11.5px;color:#94a3b8;display:block;margin-top:1px}
.ast-tip-meta{display:flex;align-items:center;gap:5px;margin-top:7px;font-size:11px;color:#cbd5e1}
.ast-dot{width:7px;height:7px;border-radius:50%}
.ast-dot.online{background:#22c55e}.ast-dot.away{background:#f59e0b}.ast-dot.offline{background:#64748b}`,

  js: `var PEOPLE = [
  { name: 'Priya Nair',  role: 'Lead Engineer',    status: 'online',  c1: '#6366f1', c2: '#8b5cf6' },
  { name: 'Marcus Webb', role: 'Product Designer',  status: 'online',  c1: '#22c55e', c2: '#10b981' },
  { name: 'Yuki Tanaka', role: 'Product Manager',   status: 'away',    c1: '#f59e0b', c2: '#f97316' },
  { name: 'Elena Cruz',  role: 'Backend Engineer',  status: 'online',  c1: '#ec4899', c2: '#db2777' },
  { name: 'Tom Rivera',  role: 'QA Engineer',       status: 'offline', c1: '#0ea5e9', c2: '#0284c7' },
  { name: 'Sara Kim',    role: 'Data Scientist',    status: 'online',  c1: '#a855f7', c2: '#9333ea' },
  { name: 'Liam Patel',  role: 'DevOps Engineer',   status: 'away',    c1: '#14b8a6', c2: '#0d9488' },
];
var MAX = 5;   // show this many, then a "+N" bubble

function initials(name) { return name.split(' ').map(function (p) { return p[0]; }).slice(0, 2).join(''); }

var stack = document.getElementById('astStack');
var shown = PEOPLE.slice(0, MAX);
var extra = PEOPLE.length - MAX;

var html = shown.map(function (p) {
  var label = { online: 'Online', away: 'Away', offline: 'Offline' }[p.status];
  return '<div class="ast-item">' +
    '<div class="ast-avatar" style="background:linear-gradient(135deg,' + p.c1 + ',' + p.c2 + ')">' + initials(p.name) + '</div>' +
    '<div class="ast-tip">' +
      '<span class="ast-tip-name">' + p.name + '</span>' +
      '<span class="ast-tip-role">' + p.role + '</span>' +
      '<span class="ast-tip-meta"><span class="ast-dot ' + p.status + '"></span>' + label + '</span>' +
    '</div>' +
  '</div>';
}).join('');

if (extra > 0) {
  html += '<div class="ast-item ast-more">' +
    '<div class="ast-avatar">+' + extra + '</div>' +
    '<div class="ast-tip"><span class="ast-tip-name">' + extra + ' more</span>' +
    '<span class="ast-tip-role">' + PEOPLE.slice(MAX).map(function (p) { return p.name; }).join(', ') + '</span></div>' +
  '</div>';
}

stack.innerHTML = html;`,

  seo: {
    title: 'Avatar Stack with Tooltip — Team Avatars HTML CSS',
    description: `An overlapping avatar stack where each avatar lifts and reveals a name/role/status tooltip on hover, with a "+N more" overflow. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Avatar Stack with Tooltip — Overlapping Team Avatars with Hover Cards',
      description: `The overlapping row of avatars — used to show who's on a project, in a call, or assigned to a task — is everywhere, but the polished version does more than stack faces: each avatar lifts on hover and reveals a small card with the person's name, role, and status. This animated-tooltip avatar stack (popularized by Aceternity and seen across modern apps) is built here in plain HTML, CSS, and vanilla JavaScript, with a "+N more" overflow bubble for large groups.

**Overlapping avatars with a lift on hover**

The avatars overlap via a negative left margin so a group reads as a compact cluster rather than a long row — the standard "these people are together" motif. On hover, the hovered avatar lifts up (\`translateY(-6px)\`) and raises its z-index so it comes forward above its neighbors, giving a tactile sense of picking one out of the stack. Each avatar is an initials-on-gradient circle with a white ring, so no profile images are needed and the cluster stays visually distinct.

**A hover card, not a bare tooltip**

Instead of a one-line title attribute, each avatar reveals a styled tooltip card above it on hover — name in bold, role beneath, and a status line with a colored presence dot (online/away/offline). This richer hover content is what makes the pattern useful beyond decoration: hovering a face answers "who is this and are they around?" without leaving the page. The card animates in with \`opacity\` and \`transform\` (a slight rise and scale from its bottom origin) and has a little pointer arrow aimed at its avatar, so it reads as attached to the face it describes.

**The "+N more" overflow**

Showing twenty overlapping avatars is a mess, so the stack caps at a configurable \`MAX\` and collapses the rest into a gray "+N" bubble at the end — the universal overflow affordance. Hovering *that* bubble reveals a tooltip listing the names of everyone not shown, so the hidden members are still discoverable. This cap-and-overflow keeps the cluster compact for any group size while never fully hiding who's included.

**Pure CSS hover, no JavaScript for the interaction**

The lift and the tooltip reveal are entirely CSS \`:hover\` — the JavaScript only renders the stack from data. This means the interaction is instant, has no event-listener overhead, and degrades gracefully. The tooltip is positioned absolutely relative to each avatar and centered with a transform, so it stays anchored above its face regardless of the avatar's position in the row.

**Data-driven and reusable**

The stack renders from a \`PEOPLE\` array (name, role, status, gradient colors), with \`MAX\` controlling how many show before overflow — so it adapts to any group with a data edit. Swap the initials-gradient avatars for real photos by replacing the avatar background with an \`<img>\`, and the same component works for project members, call participants, task assignees, or any "these people are involved" display. The presence dot makes it double as a lightweight team-status indicator.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A row of overlapping team avatars renders with a "+N more" bubble at the end.` },
      { title: 'Hover an avatar', text: `The avatar lifts and a tooltip card appears with the person's name, role, and presence status.` },
      { title: 'Hover the overflow bubble', text: `Hovering "+N" reveals a tooltip listing everyone not shown in the stack.` },
      { title: 'Change the cap', text: `Adjust MAX to show more or fewer avatars before the overflow bubble.` },
      { title: 'Edit the people', text: `Replace the PEOPLE array (name, role, status, colors) with your team or participants.` },
      { title: 'Use real photos', text: `Swap the initials-gradient avatar for an <img> with the person's profile picture.` },
    ] },
    features: [
      { title: 'Overlapping avatar cluster', text: `Negative margins stack the avatars into a compact "these people are together" group.` },
      { title: 'Lift-on-hover', text: `The hovered avatar rises and comes forward above its neighbors for a tactile pick-out effect.` },
      { title: 'Rich hover card', text: `Each avatar reveals a tooltip with name, role, and a colored presence dot — not a bare title.` },
      { title: '"+N more" overflow', text: `The stack caps at MAX and collapses the rest into a bubble whose tooltip lists the hidden names.` },
      { title: 'Pure-CSS interaction', text: `Lift and tooltip reveal are CSS :hover — JavaScript only renders from data, so the interaction is instant.` },
      { title: 'Anchored, animation-safe tooltip', text: `Opacity/transform-only reveal with a pointer arrow, anchored above each avatar regardless of position.` },
      { title: 'Initials gradient avatars', text: `Distinct gradient-and-initials circles need no images and stay visually separable in the cluster.` },
      { title: 'Data-driven and reusable', text: `Renders from a PEOPLE array with a MAX cap — adapts to any group and any "people involved" context.` },
    ],
    useCases: [
      { title: 'Project and task members', text: `Show who's assigned to a project or task with hover details — pair with a [team presence list](/ui-snippets/team-presence-list/) for the full roster.` },
      { title: 'Call and meeting participants', text: `Display who's in a call as a compact stack with names on hover.` },
      { title: 'Document collaborators', text: `Show who's viewing or editing, complementing [multiplayer cursors](/ui-snippets/multiplayer-cursors/) for live presence.` },
      { title: 'Reviewers and approvers', text: `Indicate who needs to review a change, with each person's role and status shown on hover.` },
      { title: 'Social proof and attendee lists', text: `Show "247 people joined" with a few faces and an overflow count.` },
      { title: 'Learning hover-card patterns', text: `A reference for overlapping avatars and rich CSS tooltips — compare with an [avatar group](/ui-snippets/avatar-group/) for a static stack.` },
      { icon: 'CODE', title: 'Related: Credential Expiry Warning Card — Color-Escalating Countdown', desc: 'See the [Credential Expiry Warning Card — Color-Escalating Countdown](/ui-snippets/credential-expiry-warning-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I show real profile photos instead of initials?', a: `Replace the avatar div's gradient background with an <img src="..." class="ast-avatar"> (object-fit: cover), keeping the white ring and overflow behavior. Keep the initials version as a fallback for people without a photo — render the <img> when a photo URL exists, otherwise the initials circle, so the cluster degrades gracefully for missing images.` },
      { q: 'How do I change how many avatars show before the "+N"?', a: `Adjust the MAX constant — the stack slices PEOPLE to that many and collapses the remainder into the "+N" bubble, whose tooltip lists the hidden names. Pick a MAX that fits your layout width (3–5 is common); the overflow handles any group size beyond it without breaking the compact cluster.` },
      { q: 'Why use CSS hover instead of JavaScript for the tooltips?', a: `The lift and tooltip reveal are presentational hover effects, which CSS :hover handles instantly with zero event-listener overhead and no risk of the tooltip getting stuck open from a missed mouseout. JavaScript only renders the markup from data. This keeps the component lightweight and the interaction snappy; you'd only add JS interaction for click-to-open behavior on touch devices.` },
      { q: 'How does this work on touch devices with no hover?', a: `Touch devices don't hover, so the tooltips won't appear on tap by default — the avatars still render as a clean stack. To support touch, add a click/tap handler that toggles a tooltip's visibility (and closes others), since tap is the touch equivalent of hover. Keep the stack itself useful without tooltips, treating the hover cards as a desktop enhancement.` },
      { q: 'How do I use this avatar stack in React, Vue, or Angular?', a: `In React, render the sliced PEOPLE array with .map() plus the overflow bubble, computing initials inline; in Vue, use v-for with a computed shown/extra split; in Angular, use *ngFor with a getter. The overlap, lift, and tooltip are pure CSS that ports unchanged — only the data rendering and the MAX-based overflow split move into the framework's templating.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the string-building by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the MAX slice and the extra-count bubble are generated from the same PEOPLE array, or why the tooltip's transform-origin is set to bottom center rather than center. The same assistant can help optimize it — ask whether building the entire stack's HTML as one big joined string and setting it via innerHTML is the best approach compared to creating DOM nodes individually, especially if the stack needs to update frequently from live presence data. It's also useful for extending the component: ask it to add click-to-toggle tooltips for touch devices, animate new people fading into the stack as they join a call, or wire the status dots to a real presence websocket instead of static data. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "avatar stack with hover tooltip cards" component in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- Render a row of overlapping circular avatars (initials on a gradient background) from a JavaScript array of person objects, where each object has a name, role, presence status, and two gradient colors, capping the visible avatars at a configurable maximum and collapsing everyone else into a single "+N" overflow avatar at the end of the row.
- Each avatar must overlap the previous one using a negative left margin, and must lift upward and rise above its neighbors (via CSS transform and z-index) on hover.
- Each avatar (including the overflow bubble) must reveal an absolutely positioned card above it on hover, showing the person's name, role, and a status line with a colored dot (a distinct color for online, away, and offline) — with a small triangular pointer connecting the card visually to the avatar below it.
- The overflow "+N" avatar's hover card must list the names of everyone not individually shown, not just a repeat of the count.
- The hover card's reveal animation must use only opacity and transform (translate plus a slight scale from the bottom edge), driven purely by a CSS :hover selector on the avatar's container — no JavaScript mouseenter/mouseleave listeners for showing or hiding the card.
- Compute each person's two-letter initials from their full name in JavaScript rather than hardcoding them in the data.`,
    },
  },
};

export default avatarStackTooltip;
