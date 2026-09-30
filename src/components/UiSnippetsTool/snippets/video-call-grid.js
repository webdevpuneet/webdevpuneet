const videoCallGrid = {
  id: 'video-call-grid',
  title: 'Video Call Grid',
  lastmod: '2026-07-18',
  category: 'dashboards',
  html: `<div class="vcg" id="vcg">
  <div class="vcg-grid" id="vcgGrid"></div>
  <div class="vcg-bar">
    <button class="vcg-ctl" id="vcgMic" type="button" aria-pressed="false" title="Toggle microphone">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
    </button>
    <button class="vcg-ctl" id="vcgCam" type="button" aria-pressed="false" title="Toggle camera">
      <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
    </button>
    <button class="vcg-ctl vcg-end" type="button" title="Leave call">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.72 2.78a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.88.35 1.82.6 2.78.72A2 2 0 0 1 22 16.92z"/></svg>
    </button>
    <span class="vcg-hint" id="vcgHint">Click a tile to pin it</span>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0b1020; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.vcg { width: min(680px, 100%); background: #101528; border: 1px solid #1e2745; border-radius: 18px; padding: 14px; }

.vcg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.vcg-grid.spotlight { grid-template-columns: 1fr; }
.vcg-grid.spotlight .vcg-tile:not(.pinned) { display: none; }
.vcg-grid.spotlight .vcg-strip { display: flex; }

.vcg-strip { display: none; gap: 8px; overflow-x: auto; padding-top: 10px; }
.vcg-strip .vcg-mini {
  flex: 0 0 auto; width: 92px; aspect-ratio: 4/3; border-radius: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #e2e8f0; border: 1px solid #26304f;
}

.vcg-tile {
  position: relative; aspect-ratio: 4/3; border-radius: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid transparent; overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.vcg-tile.pinned { aspect-ratio: 16/9; }
.vcg-tile.speaking { border-color: #34d399; box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25); }

.vcg-avatar {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 800; color: #fff;
}
.vcg-tile.pinned .vcg-avatar { width: 84px; height: 84px; font-size: 28px; }

.vcg-name {
  position: absolute; left: 8px; bottom: 8px;
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; background: rgba(8, 12, 26, 0.72); backdrop-filter: blur(4px);
  border-radius: 999px; font-size: 11px; font-weight: 600; color: #e2e8f0;
}
.vcg-name svg { width: 11px; height: 11px; stroke: #f87171; fill: none; stroke-width: 2.4; stroke-linecap: round; }
.vcg-name .vcg-mic-on { stroke: #34d399; }

.vcg-bars { position: absolute; right: 10px; top: 10px; display: none; align-items: flex-end; gap: 2px; height: 14px; }
.vcg-tile.speaking .vcg-bars { display: flex; }
.vcg-bars i { width: 3px; background: #34d399; border-radius: 2px; animation: vcgEq 0.7s ease-in-out infinite alternate; }
.vcg-bars i:nth-child(1) { height: 40%; animation-delay: 0s; }
.vcg-bars i:nth-child(2) { height: 90%; animation-delay: 0.15s; }
.vcg-bars i:nth-child(3) { height: 60%; animation-delay: 0.3s; }
@keyframes vcgEq { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }

.vcg-bar { display: flex; align-items: center; justify-content: center; gap: 10px; padding-top: 14px; }
.vcg-ctl {
  width: 44px; height: 44px; border-radius: 50%; border: 1px solid #26304f;
  background: #182038; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.15s;
}
.vcg-ctl svg { width: 18px; height: 18px; fill: none; stroke: #cbd5e1; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vcg-ctl:hover { transform: translateY(-2px); }
.vcg-ctl.off { background: #7f1d1d; border-color: #b91c1c; }
.vcg-ctl.off svg { stroke: #fecaca; }
.vcg-end { background: #dc2626; border-color: #ef4444; }
.vcg-end svg { stroke: #fff; transform: rotate(135deg); }
.vcg-hint { margin-left: 8px; font-size: 11.5px; color: #64748b; }`,
  js: `const PEOPLE = [
  { name: 'Ava Chen',      color: '#6366f1', muted: false },
  { name: 'Liam Ortiz',    color: '#0ea5e9', muted: true  },
  { name: 'Maya Patel',    color: '#f59e0b', muted: false },
  { name: 'Noah Kim',      color: '#10b981', muted: false },
  { name: 'Zoe Dubois',    color: '#ec4899', muted: true  },
  { name: 'You',           color: '#8b5cf6', muted: false },
];

const grid = document.getElementById('vcgGrid');
const hint = document.getElementById('vcgHint');
let pinnedIndex = -1;
let speakingIndex = 0;

const MIC_ON  = '<svg viewBox="0 0 24 24" class="vcg-mic-on"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>';
const MIC_OFF = '<svg viewBox="0 0 24 24"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2"/></svg>';

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function render() {
  grid.className = 'vcg-grid' + (pinnedIndex >= 0 ? ' spotlight' : '');
  let tiles = '';
  PEOPLE.forEach((p, i) => {
    tiles += '<div class="vcg-tile' + (i === pinnedIndex ? ' pinned' : '') + (i === speakingIndex && !p.muted ? ' speaking' : '') + '"'
      + ' data-i="' + i + '" style="background: linear-gradient(135deg, ' + p.color + '22, #0d1224)">'
      + '<div class="vcg-avatar" style="background:' + p.color + '">' + initials(p.name) + '</div>'
      + '<span class="vcg-name">' + (p.muted ? MIC_OFF : MIC_ON) + p.name + '</span>'
      + '<span class="vcg-bars"><i></i><i></i><i></i></span>'
      + '</div>';
  });
  // Filmstrip of the other participants while one tile is pinned
  let strip = '';
  if (pinnedIndex >= 0) {
    strip = '<div class="vcg-strip">' + PEOPLE.map((p, i) =>
      i === pinnedIndex ? '' :
      '<div class="vcg-mini" data-i="' + i + '" style="background: linear-gradient(135deg, ' + p.color + '33, #0d1224)">' + initials(p.name) + '</div>'
    ).join('') + '</div>';
  }
  grid.innerHTML = tiles + strip;
}

grid.addEventListener('click', (e) => {
  const el = e.target.closest('[data-i]');
  if (!el) return;
  const i = Number(el.dataset.i);
  pinnedIndex = (pinnedIndex === i && el.classList.contains('pinned')) ? -1 : i;
  hint.textContent = pinnedIndex >= 0 ? 'Click the big tile to unpin' : 'Click a tile to pin it';
  render();
});

// Simulate the active-speaker changing every couple of seconds
setInterval(() => {
  const unmuted = PEOPLE.map((p, i) => (!p.muted ? i : -1)).filter(i => i >= 0);
  let next;
  do { next = unmuted[Math.floor(Math.random() * unmuted.length)]; } while (next === speakingIndex && unmuted.length > 1);
  speakingIndex = next;
  render();
}, 2200);

// Mic / camera buttons toggle your own state
const micBtn = document.getElementById('vcgMic');
micBtn.addEventListener('click', () => {
  const me = PEOPLE[PEOPLE.length - 1];
  me.muted = !me.muted;
  micBtn.classList.toggle('off', me.muted);
  micBtn.setAttribute('aria-pressed', me.muted);
  render();
});
document.getElementById('vcgCam').addEventListener('click', function () {
  this.classList.toggle('off');
  this.setAttribute('aria-pressed', this.classList.contains('off'));
});

render();`,
  seo: {
    title: 'Video Call Grid — Free HTML CSS JS UI Snippet',
    description: 'A Zoom-style video call grid with active-speaker glow, pin-to-spotlight layout, mute badges and a control bar. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Video Call Grid — Zoom-Style Participant Grid with Active Speaker and Spotlight Pinning',
      description: `Every video conferencing product — Zoom, Google Meet, Teams, Discord — converges on the same two layouts: an equal-sized participant grid, and a spotlight view where one tile dominates while the rest collapse into a filmstrip. This component recreates that pattern in plain HTML, CSS, and vanilla JavaScript: a responsive tile grid with animated active-speaker highlighting, per-participant mute badges, click-to-pin spotlight switching, and a Meet-style control bar with mic, camera, and leave buttons.

**The auto-fit grid**

The participant layout is a single CSS rule: \`grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))\`. With six participants in a 680px container this naturally produces rows of three or four tiles, and as the container narrows it reflows to two columns and then one — no media queries and no JavaScript layout math. Each tile keeps a stable shape with \`aspect-ratio: 4/3\`, which is how real call UIs keep camera-off tiles from collapsing to zero height.

**Spotlight mode with one class**

Clicking a tile sets \`pinnedIndex\` and re-renders with a \`spotlight\` class on the grid. That class does three things in pure CSS: switches the grid to a single \`1fr\` column, hides every tile except the \`.pinned\` one, and reveals the \`.vcg-strip\` filmstrip of miniature tiles for the other participants. The pinned tile also widens to \`aspect-ratio: 16/9\`, matching how Meet enlarges a presented feed. Because layout switching is class-driven, the JavaScript stays tiny — it only tracks which index is pinned and rebuilds the markup.

**Active-speaker simulation**

A \`setInterval\` picks a random unmuted participant every 2.2 seconds and marks their tile \`.speaking\`, which lights a green border, an outer glow via \`box-shadow\`, and a three-bar equalizer in the corner. The equalizer is three \`<i>\` elements animated with a staggered \`scaleY\` keyframe (\`animation-delay: 0s / 0.15s / 0.3s\`), the same trick used in the [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/). In a real app you would replace the interval with the \`audioLevel\` events your WebRTC SDK (LiveKit, Twilio, Agora, Daily) already emits — the rendering layer stays identical.

**Mute badges and the control bar**

Each name pill overlays the tile bottom-left with \`position: absolute\`, a translucent \`rgba\` background, and \`backdrop-filter: blur(4px)\` so it stays readable over any tile colour. The mic icon inside swaps between an "on" and a slashed "off" SVG based on each participant's \`muted\` flag. The control bar's mic button toggles *your* participant's flag and re-renders, so your own tile's badge and speaking eligibility update instantly; buttons expose their state through \`aria-pressed\` so screen readers announce mute correctly.

**Avatars without images**

Tiles show initials avatars generated from each name — \`initials()\` splits on spaces and takes the first letter of the first two words — over a per-person gradient built from their accent colour plus a dark base. This is exactly how production call UIs render camera-off participants, and it keeps the snippet dependency-free. To show real video, replace the avatar div with a \`<video>\` element fed by a \`MediaStream\`; every other part of the component (grid, pinning, speaking ring, badges) works unchanged.

**Customisation**

Add or remove entries in the \`PEOPLE\` array — the auto-fit grid absorbs any count. Swap the accent colours, wire the leave button to your session teardown, and drive \`speakingIndex\` and \`muted\` from your SDK's events instead of the demo interval. The whole UI is one render function, so porting it onto live data is a matter of replacing the simulated state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A six-person call grid renders with initials avatars, name pills with mic badges, and a control bar with mic, camera, and leave buttons.` },
      { title: 'Watch the active speaker', text: `Every 2.2 seconds a random unmuted participant gets the green speaking ring and an animated three-bar equalizer in their tile corner.` },
      { title: 'Click a tile to pin it', text: `The grid switches to spotlight mode — the pinned tile expands to 16:9 and the other participants collapse into a scrollable filmstrip below.` },
      { title: 'Click the big tile to unpin', text: `Spotlight mode toggles off and the equal grid returns; the hint text under the control bar tells you which mode you are in.` },
      { title: 'Toggle your mic and camera', text: `The mic button mutes the "You" participant — the badge on your tile swaps to a slashed mic and you stop receiving the speaking ring.` },
      { title: 'Wire it to real data', text: `Replace the PEOPLE array and the demo interval with your WebRTC SDK's participant list and audioLevel events; swap avatars for video elements.` },
    ]},
    features: [
      { title: 'Auto-fit responsive grid', text: `repeat(auto-fit, minmax(150px, 1fr)) reflows any participant count from four columns down to one with zero media queries.` },
      { title: 'Click-to-pin spotlight', text: `One class switch turns the grid into a 16:9 spotlight with a scrollable filmstrip of the remaining participants.` },
      { title: 'Active-speaker ring', text: `The speaking tile gets a green border, box-shadow glow, and a staggered scaleY equalizer animation.` },
      { title: 'Per-participant mute badges', text: `Name pills overlay each tile with an on/off mic SVG driven by each participant's muted flag.` },
      { title: 'Initials avatars', text: `Camera-off tiles render generated initials over per-person gradients — no image assets required.` },
      { title: 'Working control bar', text: `Mic and camera buttons toggle state with aria-pressed; mute updates your tile badge and speaking eligibility live.` },
      { title: 'Stable tile shapes', text: `aspect-ratio keeps 4:3 tiles (16:9 when pinned) so the layout never collapses regardless of content.` },
      { title: 'SDK-ready structure', text: `One render function over a participants array maps directly onto LiveKit, Twilio, Agora, or Daily participant events.` },
    ],
    useCases: [
      { title: 'Video conferencing apps', text: `The participant layout for a WebRTC call — pair it with a [floating chat widget](/ui-snippets/floating-chat-widget/) for in-call messaging.` },
      { title: 'Virtual classroom UIs', text: `Pin the teacher in spotlight while students sit in the filmstrip; combine with a [poll widget](/ui-snippets/poll-widget/) for live questions.` },
      { title: 'Team standup tools', text: `Show who is talking during async or live standups next to a [team presence list](/ui-snippets/team-presence-list/).` },
      { title: 'Webinar and livestream studios', text: `Use spotlight mode as the "program view" of the current presenter with co-hosts in miniatures.` },
      { title: 'Product landing pages', text: `Drop the animated grid into a hero as a believable in-product screenshot alternative — see the [app hero](/ui-snippets/app-hero/).` },
      { title: 'Learning the layout pattern', text: `A compact reference for auto-fit grids, class-driven layout switching, and active-speaker rendering.` },
    ],
    faqs: [
      { q: 'How does the grid adapt to different participant counts?', a: `The container uses grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)), so the browser packs as many 150px-minimum columns as fit and stretches them evenly. Six people become a 3×2 grid on desktop and a single column on narrow screens automatically. Add a seventh entry to the PEOPLE array and it just flows in — there is no per-count layout code, which is why real call UIs use the same technique.` },
      { q: 'How does spotlight pinning work without duplicating markup?', a: `Clicking a tile stores its index in pinnedIndex and re-renders with a spotlight class on the grid. CSS does the rest: the grid becomes one column, .vcg-tile:not(.pinned) is hidden, and the filmstrip strip is revealed with miniature tiles for everyone else. Clicking the pinned tile resets pinnedIndex to -1. Keeping the mode in a class means the layouts live entirely in the stylesheet.` },
      { q: 'How do I connect this to a real WebRTC service?', a: `Replace the PEOPLE array with the participant list from your SDK (LiveKit, Twilio Video, Agora, Daily) and call render() on join/leave events. Drive speakingIndex from the SDK's active-speaker or audioLevel events instead of the demo setInterval, and set each participant's muted flag from track-mute events. For live video, render a <video> element bound to the participant's MediaStream in place of the initials avatar.` },
      { q: 'Why simulate the speaking indicator with setInterval?', a: `The snippet has no microphone access, so an interval that promotes a random unmuted participant every 2.2 seconds stands in for real audio levels. The important part is the rendering contract: whoever holds speakingIndex gets the ring and equalizer. In production you keep that contract and just change who writes the value — typically a threshold over the audioLevel your SDK reports per participant.` },
      { q: 'Can I use this video call grid in React, Vue, or Angular?', a: `Yes — it maps cleanly onto components. Hold participants, pinnedIndex, and speakingIndex in state (useState / ref() / component fields), render tiles with a map instead of innerHTML strings, and attach the pin handler per tile. The demo speaker interval belongs in useEffect / onMounted / ngOnInit with a cleanup that clears it. All the CSS — auto-fit grid, spotlight class, equalizer keyframes — ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the layout logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) reflows six tiles into different row counts as the container narrows without any media query, and how the single "spotlight" class toggle on the grid cascades through CSS to hide tiles, resize the pinned one, and reveal the filmstrip all at once. It's a good optimization target too — ask whether rebuilding the entire grid's innerHTML string on every render() call (including every 2.2-second speaker change) is wasteful compared to updating only the classes that actually changed. For extending it, have it wire the demo setInterval speaker simulation to real WebRTC audioLevel events, add a raise-hand indicator per tile, or support dragging tiles to reorder them. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Zoom-style video call participant grid with pin-to-spotlight support, in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- A responsive grid of participant tiles using grid-template-columns: repeat(auto-fit, minmax(Npx, 1fr)) so the number of columns automatically adapts to container width and participant count with zero media queries; each tile keeps a fixed aspect-ratio so tiles never collapse to zero height.
- Each tile shows an initials avatar generated from the participant's name (not an image), rendered over a per-person colored gradient background, plus a name pill overlaid at the bottom-left with a translucent, blurred background and a mic icon that switches between an "on" and a slashed "off" SVG based on that participant's muted state.
- A single boolean-like "pinned index" state: clicking a tile toggles whether it's pinned. When something is pinned, the grid must switch to a single-column spotlight layout (the pinned tile enlarges to a widescreen aspect ratio), all other tiles must hide from the main grid, and a horizontally-scrollable filmstrip of small thumbnail tiles for the remaining participants must appear below it. Clicking the pinned tile again returns to the normal equal-sized grid.
- A simulated "active speaker" mechanism: on an interval, randomly select one currently-unmuted participant and give their tile a distinct glowing border plus a small multi-bar equalizer animation in the corner, built from a few bars with staggered animation-delay values on a shared scaleY keyframe.
- A control bar with mic and camera toggle buttons that reflect their pressed/off state via aria-pressed and a distinct visual style, plus a "leave call" button styled in a warning color; toggling your own mic must update your own tile's mute badge and remove your tile from active-speaker eligibility while muted.`,
    },
  },
};

export default videoCallGrid;
