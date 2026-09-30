const liveCursorNameTags = {
  id: 'live-cursor-name-tags',
  title: 'Live Cursor Name Tags',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="lcn-card">
  <div class="lcn-head">
    <div>
      <h2>Product spec draft</h2>
      <p>3 people editing</p>
    </div>
    <div class="lcn-avatars">
      <span class="lcn-avatar" style="background:#f97316">JM</span>
      <span class="lcn-avatar" style="background:#22d3ee">RS</span>
      <span class="lcn-avatar" style="background:#a78bfa">TN</span>
    </div>
  </div>

  <div class="lcn-doc" id="lcnDoc">
    <div class="lcn-line w1"></div>
    <div class="lcn-line w2"></div>
    <div class="lcn-line w3"></div>
    <div class="lcn-block"></div>
    <div class="lcn-line w2"></div>
    <div class="lcn-line w4"></div>
    <div class="lcn-line w1"></div>
    <div class="lcn-line w3"></div>

    <div class="lcn-cursor" id="cursor1" style="--c:#f97316"><svg viewBox="0 0 24 24" fill="#f97316"><path d="M4 2l14 8-6 2-2 6z"/></svg><span class="lcn-tag" style="background:#f97316">Jamie</span></div>
    <div class="lcn-cursor" id="cursor2" style="--c:#22d3ee"><svg viewBox="0 0 24 24" fill="#22d3ee"><path d="M4 2l14 8-6 2-2 6z"/></svg><span class="lcn-tag" style="background:#22d3ee">Rosa</span></div>
    <div class="lcn-cursor" id="cursor3" style="--c:#a78bfa"><svg viewBox="0 0 24 24" fill="#a78bfa"><path d="M4 2l14 8-6 2-2 6z"/></svg><span class="lcn-tag" style="background:#a78bfa">Theo</span></div>
  </div>
  <p class="lcn-note">Simulated cursors for demo purposes — no live connection.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f17;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.lcn-card{background:#12151f;border:1px solid #232838;border-radius:18px;padding:20px;width:100%;max-width:520px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.lcn-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.lcn-head h2{font-size:15.5px;font-weight:800;color:#f1f5f9}
.lcn-head p{font-size:11.5px;color:#64748b;margin-top:2px}
.lcn-avatars{display:flex}
.lcn-avatar{width:26px;height:26px;border-radius:50%;color:#0c0f17;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-left:-7px;border:2px solid #12151f}
.lcn-avatar:first-child{margin-left:0}

.lcn-doc{position:relative;background:#0e1119;border:1px solid #1e2331;border-radius:12px;height:300px;padding:22px 26px;overflow:hidden}
.lcn-line{height:9px;border-radius:5px;background:#1e2431;margin-bottom:14px}
.lcn-line.w1{width:88%}
.lcn-line.w2{width:65%}
.lcn-line.w3{width:76%}
.lcn-line.w4{width:52%}
.lcn-block{height:52px;border-radius:8px;background:#171c28;border:1px dashed #2a3140;margin-bottom:14px}

.lcn-cursor{position:absolute;top:0;left:0;display:flex;align-items:flex-start;pointer-events:none;will-change:transform;transition:transform .05s linear}
.lcn-cursor svg{width:18px;height:18px;flex-shrink:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))}
.lcn-tag{margin-left:2px;margin-top:14px;font-size:10.5px;font-weight:800;color:#0c0f17;padding:2px 7px;border-radius:6px 6px 6px 2px;white-space:nowrap;box-shadow:0 3px 8px rgba(0,0,0,.35)}

.lcn-note{font-size:11px;color:#4b5566;text-align:center;margin-top:12px}`,

  js: `// Pre-scripted paths (percentages of the doc area) that each simulated cursor loops through.
var PATHS = [
  { el: document.getElementById('cursor1'), points: [[10,15],[55,10],[70,40],[30,55],[15,80],[50,85],[10,15]], speed: 0.00035, offset: 0 },
  { el: document.getElementById('cursor2'), points: [[85,20],[60,45],[80,65],[92,30],[85,20]], speed: 0.0005, offset: 0.3 },
  { el: document.getElementById('cursor3'), points: [[30,25],[45,60],[20,70],[8,40],[30,25]], speed: 0.00042, offset: 0.6 },
];

var doc = document.getElementById('lcnDoc');

function pointAt(points, t) {
  var n = points.length - 1;
  var scaled = t * n;
  var i = Math.min(Math.floor(scaled), n - 1);
  var localT = scaled - i;
  var a = points[i], b = points[i + 1];
  return [a[0] + (b[0] - a[0]) * localT, a[1] + (b[1] - a[1]) * localT];
}

function tick(now) {
  var rect = doc.getBoundingClientRect();
  PATHS.forEach(function (p) {
    var t = ((now * p.speed) + p.offset) % 1;
    var pos = pointAt(p.points, t);
    var x = (pos[0] / 100) * rect.width;
    var y = (pos[1] / 100) * rect.height;
    p.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
  });
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);`,

  seo: {
    title: 'Live Cursor Name Tags — Free HTML CSS JS Snippet',
    description: `Simulated remote collaborator cursors with colored pointers and name tags gliding around a shared document, built with requestAnimationFrame. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Cursor Name Tags — Simulated Multiplayer Cursors on a Shared Document',
      description: `Figma, Google Docs, and Notion all share a visual signature: colored cursors with floating name tags drifting around the canvas as collaborators work. This snippet recreates that visual pattern — not a real multiplayer backend, but the exact look and motion — using plain CSS and \`requestAnimationFrame\`, so you can see and reuse the animation technique without standing up WebSockets or a presence server. Pair it with [multiplayer cursors](/ui-snippets/multiplayer-cursors/) for a closer look at cursor rendering, or [collaborator presence bar](/ui-snippets/collaborator-presence-bar/) for who's-online UI.

**Pre-scripted paths, not random motion**

Each cursor follows a small array of waypoint percentages (\`points\`) that loop back to the start, rather than random jitter. Random motion reads as noisy and unrealistic; a handful of deliberate waypoints reads as a person actually scrolling and clicking through a document, which is closer to what real presence cursors look like in practice.

**One time-based interpolation function**

\`pointAt()\` takes the array of waypoints and a progress value \`t\` between 0 and 1, finds which segment \`t\` falls into, and linearly interpolates between that segment's two points. Because position is a pure function of time rather than accumulated per-frame movement, the animation can never drift, stutter, or accumulate floating-point error — reloading or resizing the page just re-samples the same path at the current time.

**Driven by requestAnimationFrame, not setInterval**

A single \`tick()\` loop reads the current timestamp, computes each cursor's position along its path, and sets a CSS \`transform: translate()\` — the one property that animates without triggering layout or paint of surrounding content. \`requestAnimationFrame\` syncs the loop to the browser's repaint cycle, so motion stays smooth and automatically pauses when the tab isn't visible, unlike a fixed-interval timer.

**Staggered offsets keep it readable**

Each cursor's \`offset\` shifts where it starts along its loop and each has a different \`speed\`, so the three cursors never move in lockstep or cross paths predictably — mirroring how real collaborators work at different paces in different parts of a document, which keeps the scene visually interesting rather than looking like one animation copy-pasted three times.

**Reusing this for real presence**

To make this real, replace the pre-scripted paths with actual cursor coordinates broadcast over a WebSocket or a service like Liveblocks/Pusher — the rendering half (the \`.lcn-cursor\` markup, the transform-based positioning, and the name tag styling) stays exactly the same; only the source of \`x\`/\`y\` changes from a scripted path to a network message.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A document mockup renders with three colored cursors already gliding around it.` },
      { title: 'Watch the paths', text: `Each cursor loops through its own waypoints at a different speed and offset.` },
      { title: 'Resize the window', text: `Cursor positions are read as percentages of the doc area, so they stay correctly placed.` },
      { title: 'Adjust a path', text: `Edit a cursor's points array to change its route around the document.` },
      { title: 'Change the pace', text: `Tune each cursor's speed value to make it drift faster or slower.` },
      { title: 'Wire to real data', text: `Swap pointAt()'s scripted lookup for live x/y coordinates from your presence backend.` },
    ] },
    features: [
      { title: 'Pre-scripted waypoint paths', text: `Each cursor loops through a small array of points instead of moving randomly.` },
      { title: 'Time-based interpolation', text: `pointAt() derives position purely from elapsed time — no drift or accumulation error.` },
      { title: 'requestAnimationFrame loop', text: `Syncs to the browser's repaint cycle and pauses automatically on hidden tabs.` },
      { title: 'Transform-only movement', text: `Cursors move via translate(), never triggering layout or paint of the document.` },
      { title: 'Staggered speeds and offsets', text: `Three cursors move independently so the scene never looks synchronized or repetitive.` },
      { title: 'Percentage-based coordinates', text: `Paths are defined as percentages of the doc area, so they stay correct at any size.` },
      { title: 'Color-coded name tags', text: `Each cursor's tag color matches its pointer and the collaborator's avatar.` },
      { title: 'Honest demo labeling', text: `A visible note clarifies these are simulated cursors, not a live connection.` },
    ],
    useCases: [
      { title: 'Collaborative editor demos', text: `Show the multiplayer feel of a docs or whiteboard product in marketing pages.` },
      { title: 'Design tool marketing', text: `Pair with [multiplayer cursors](/ui-snippets/multiplayer-cursors/) to showcase real-time editing visuals.` },
      { title: 'Onboarding illustrations', text: `Demonstrate what "live collaboration" looks like before a user invites teammates.` },
      { title: 'Presence feature previews', text: `Combine with a [team presence list](/ui-snippets/team-presence-list/) to show both cursors and avatars.` },
      { title: 'Loading/empty states', text: `Animate cursors on an empty document as a playful placeholder while data loads.` },
      { title: 'Learning animation timing', text: `A reference for path interpolation and requestAnimationFrame-driven motion.` },
      { icon: 'CODE', title: 'Related: User Role Card with Conditional Permission Checkboxes', desc: 'See the [User Role Card with Conditional Permission Checkboxes](/ui-snippets/user-role-permission-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are these real multiplayer cursors from other users?', a: `No — this snippet simulates the visual pattern with pre-scripted paths and requestAnimationFrame, with no network connection or backend. It's meant to demonstrate and let you reuse the rendering and motion technique. For real presence, you'd broadcast actual cursor coordinates over a WebSocket or a service like Liveblocks and feed them into the same transform-based rendering.` },
      { q: 'Why use waypoints instead of random movement?', a: `Random per-frame jitter looks noisy and mechanical. A small loop of deliberate waypoints, interpolated smoothly between them, reads as a person actually navigating a document — closer to the motion real presence cursors exhibit in tools like Figma and Google Docs, which is the visual effect this snippet is recreating.` },
      { q: 'Why compute position from time instead of accumulating movement per frame?', a: `pointAt() derives each cursor's position as a pure function of the current timestamp and its path, rather than adding a small delta every frame. That means there's nothing to accumulate or drift — the animation is always correct no matter how much time passed since the last frame, and it can't stutter if a frame is dropped.` },
      { q: 'Does this work if the browser tab loses focus?', a: `requestAnimationFrame automatically throttles or pauses when a tab is backgrounded, which is the correct, battery-friendly behavior. Because position is computed from the current timestamp rather than accumulated increments, the cursors resume smoothly at the correct position when the tab regains focus instead of jumping or catching up.` },
      { q: 'How do I turn this into real multiplayer cursors?', a: `Keep the .lcn-cursor markup and its transform-based positioning exactly as is, but replace the pointAt()/PATHS logic with a handler that receives real x/y coordinates from your backend (WebSocket, Liveblocks, Pusher, etc.), converts them to the same percentage-of-container or pixel space, and sets the same translate() transform. Add and remove cursor elements dynamically as collaborators join and leave.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the path-interpolation math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how pointAt() converts a 0-to-1 progress value into a position along a multi-point path, and why deriving that position from the current timestamp rather than accumulating per-frame deltas prevents drift over a long-running animation. The same assistant can help you optimize it — ask whether getBoundingClientRect() should be cached instead of called every single frame for a document that doesn't resize often. It's also useful for extending the demo: ask it to add a fourth simulated cursor, make a cursor pause briefly at certain waypoints to mimic someone reading, or wire the whole thing to real WebSocket-delivered coordinates for actual multiplayer presence. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "live cursor name tags" demo in plain HTML, CSS, and JavaScript that simulates the multiplayer-cursor visual pattern used by tools like Figma and Google Docs — no real backend or network connection, no frameworks or animation libraries.

Requirements:
- Render a mock document area (placeholder text lines and a content block) and 2-3 colored cursor elements, each a small pointer shape plus an attached name-tag label in a matching color.
- Define each cursor's motion as a small array of waypoint positions (expressed as percentages of the document container's width/height, not fixed pixels) that the cursor loops through continuously, rather than moving randomly or jittering.
- Write a single pure interpolation function that takes a path's waypoints and a progress value between 0 and 1, determines which segment of the path that progress falls into, and linearly interpolates the position within that segment — position must be a deterministic function of progress, not something accumulated frame by frame.
- Drive all cursor motion from one requestAnimationFrame loop that computes each cursor's current progress from the frame timestamp (using a different speed and starting offset per cursor so they move independently and never look synchronized), converts each cursor's interpolated percentage position into real pixels based on the document container's current size, and applies it via a CSS transform: translate() (never top/left, to avoid layout thrash).
- Make sure resizing the browser window keeps every cursor correctly positioned relative to the document container, since positions are recalculated from percentages against the container's live bounding rect.
- Include a small, honest caption noting that the cursors are simulated for demonstration and not a live multiplayer connection.`,
    },
  },
};

export default liveCursorNameTags;
