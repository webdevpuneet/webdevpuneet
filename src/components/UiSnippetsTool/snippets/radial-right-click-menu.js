const radialRightClickMenu = {
  id: 'radial-right-click-menu',
  title: 'Radial Right-Click Menu',
  lastmod: '2026-08-23',
  category: 'navigation',
  cdnUrls: [],
  html: `<div class="rrc-stage" id="rrcStage">
  <p class="rrc-hint">Right-click anywhere in this area</p>
</div>
<div class="rrc-menu" id="rrcMenu"></div>
<p class="rrc-log" id="rrcLog"></p>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0f16;color:#e7e9f3;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px;gap:14px}

.rrc-stage{width:100%;max-width:560px;height:320px;border-radius:16px;border:1.5px dashed #262b3b;background:#12141f;display:flex;align-items:center;justify-content:center;user-select:none;-webkit-user-select:none}
.rrc-hint{color:#5b6079;font-size:13.5px;font-weight:600}

.rrc-menu{position:fixed;top:0;left:0;width:0;height:0;z-index:999;pointer-events:none}
.rrc-center{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#7c3aed;box-shadow:0 0 0 4px rgba(124,58,237,.25);opacity:0;transform:scale(.5);transition:opacity .18s,transform .18s}
.rrc-menu.open .rrc-center{opacity:1;transform:scale(1)}

.rrc-item{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;border:1px solid #2c3148;background:#1a1d2b;color:#c9cee3;display:flex;align-items:center;justify-content:center;font-size:19px;cursor:pointer;pointer-events:none;opacity:0;transform:translate(0,0) scale(.3);transition:transform .3s cubic-bezier(.34,1.4,.5,1),opacity .2s,background .15s;box-shadow:0 8px 20px -10px rgba(0,0,0,.7)}
.rrc-menu.open .rrc-item{pointer-events:auto;opacity:1}
.rrc-item:hover{background:#7c3aed;color:#fff}
.rrc-item .rrc-label{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);font-size:10.5px;white-space:nowrap;background:#000;color:#fff;padding:2px 6px;border-radius:5px;opacity:0;transition:opacity .15s;pointer-events:none}
.rrc-item:hover .rrc-label{opacity:1}

.rrc-log{font-size:12px;color:#6b7190;min-height:16px}`,

  js: `var stage = document.getElementById('rrcStage');
var menu = document.getElementById('rrcMenu');
var log = document.getElementById('rrcLog');

var ACTIONS = [
  { icon: '\\u270E', label: 'Edit' },
  { icon: '\\u2398', label: 'Copy' },
  { icon: '\\u21C4', label: 'Move' },
  { icon: '\\u2605', label: 'Star' },
  { icon: '\\uD83D\\uDDD1', label: 'Delete' },
  { icon: '\\u2197', label: 'Open' },
];
var RADIUS = 84;

var center = document.createElement('div');
center.className = 'rrc-center';
menu.appendChild(center);

// Build item elements once; their (x, y) offsets are computed fresh on every
// open, since the radial layout is always centered on the current click point.
var items = ACTIONS.map(function (a) {
  var el = document.createElement('div');
  el.className = 'rrc-item';
  el.innerHTML = a.icon + '<span class="rrc-label">' + a.label + '</span>';
  el.addEventListener('click', function (e) {
    e.stopPropagation();
    log.textContent = a.label + ' selected';
    close();
  });
  menu.appendChild(el);
  return el;
});

var open = false;
var originX = 0, originY = 0;

function layout() {
  // Even angular spacing around a full circle, standard polar-to-Cartesian
  // placement identical in spirit to a click-triggered radial menu, but here
  // it is built from a real contextmenu event's coordinates each time.
  var n = items.length;
  items.forEach(function (el, i) {
    var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    var x = originX + Math.cos(angle) * RADIUS;
    var y = originY + Math.sin(angle) * RADIUS;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  });
  center.style.left = originX + 'px';
  center.style.top = originY + 'px';
}

function openAt(x, y) {
  originX = x;
  originY = y;
  layout();
  open = true;
  menu.classList.add('open');
}

function close() {
  open = false;
  menu.classList.remove('open');
}

stage.addEventListener('contextmenu', function (e) {
  e.preventDefault(); // suppress the native browser context menu
  openAt(e.clientX, e.clientY);
});

document.addEventListener('click', function () { if (open) close(); });
document.addEventListener('contextmenu', function (e) {
  if (open && !stage.contains(e.target)) close();
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) close(); });
window.addEventListener('scroll', function () { if (open) close(); }, true);`,

  seo: {
    title: 'Radial Right-Click Menu — Free Circular Context Menu Snippet',
    description: `A real contextmenu event opens a circular action menu centered on the exact right-click point, with items placed by polar-to-Cartesian trigonometry. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Radial Right-Click Menu — Circular Actions Around the Click Point',
      description: `This replaces the familiar rectangular right-click list — see [context menu](/ui-snippets/context-menu/) for that version — with a circular fan of actions centered exactly where you right-clicked, closer in spirit to a game's radial wheel menu than a desktop app's dropdown. It listens for the real \`contextmenu\` event and suppresses the browser's own menu, then places each action around the click point using the same polar coordinate math behind a click-triggered [radial menu](/ui-snippets/radial-menu/).

**A real contextmenu event, not a click substitute**

The stage listens for \`contextmenu\` (which fires on an actual right-click or a platform's equivalent gesture) and immediately calls \`e.preventDefault()\` — without that line, the browser's native menu would appear layered on top of the custom one. \`e.clientX\`/\`e.clientY\` from that event become the menu's origin, so the wheel always opens exactly where the cursor was, not at a fixed screen position.

**Items placed by polar-to-Cartesian math**

For six actions arranged around a full circle, each item's angle is \`(i / 6) * 2π - π/2\` — evenly spaced around 360°, with the \`- π/2\` offset rotating the first item to 12 o'clock instead of 3 o'clock. Converting that angle to an \`(x, y)\` offset via \`cos(angle) * RADIUS\`/\`sin(angle) * RADIUS\` and adding it to the click origin places every item at an identical distance from the center, evenly spaced — this is recomputed on every open, so the wheel always centers correctly no matter where on the stage you right-click.

**Spring-out animation from the center**

Every item starts scaled to \`0.3\` and stacked at the menu's own \`(0,0)\` transform origin with \`opacity: 0\`; opening sets each item's absolute \`left\`/\`top\` to its precomputed offset and toggles the \`.open\` class, which is what triggers the CSS transition on \`transform\`/\`opacity\` — combined with an overshooting \`cubic-bezier\`, items visibly spring outward from the exact point you clicked, reinforcing that the menu is anchored to your cursor rather than the page.

**Closing from every direction**

The menu closes on a plain click anywhere, a *second* right-click outside the stage (so context-menuing elsewhere doesn't leave two menus open), Escape, and on scroll — since a radial menu anchored to fixed pixel coordinates would otherwise visually detach from whatever it was opened over if the page moved underneath it.

**Customizing it**

Change \`RADIUS\`, the action list, or the starting angle offset; make the menu open only over specific elements with \`e.target.closest()\`; or combine it with a [table row context menu](/ui-snippets/table-row-context-menu/) pattern for per-row circular actions in a data grid.`,
    },
    howToUse: { type: 'steps', items: [
      { title: `Paste HTML, CSS, and JS`, text: `An empty stage renders with a right-click hint.` },
      { title: `Right-click inside the stage`, text: `The native menu is suppressed; a circular menu opens there.` },
      { title: `Move toward or click an icon`, text: `Six actions are evenly spaced around the click point.` },
      { title: `Select an action`, text: `A log line confirms the selection and the menu closes.` },
      { title: `Click elsewhere, scroll, or press Escape`, text: `Any of these dismiss the open menu.` },
      { title: `Reshape the wheel`, text: `Edit RADIUS, ACTIONS, or the starting angle.` },
    ] },
    features: [
      { title: `Real contextmenu event`, text: `preventDefault suppresses the native browser menu.` },
      { title: `Cursor-anchored origin`, text: `The wheel centers on the exact right-click point.` },
      { title: `Even polar spacing`, text: `cos/sin placement spaces items around a full circle.` },
      { title: `Spring-out animation`, text: `An overshooting easing pops items from the center.` },
      { title: `Multiple close paths`, text: `Click-away, second right-click, Escape, and scroll.` },
      { title: `Hover labels`, text: `Tooltips name each icon-only action.` },
      { title: `Recomputed per open`, text: `Layout math reruns fresh at every click point.` },
      { title: `No dependency`, text: `Pure HTML/CSS/JS — no context-menu library.` },
    ],
    useCases: [
      { title: 'Canvas and design tools', text: 'Provide a circular alternative to a [context menu](/ui-snippets/context-menu/), centred on the exact point of a real `contextmenu` event.' },
      { title: 'Game-style interfaces', text: 'Use the radial wheel pattern familiar from games, with items placed around a full circle through `cos` and `sin`.' },
      { title: 'Map and diagram editors', text: 'Fan actions out around a right-click point in map and diagram editors, with `preventDefault` suppressing the native browser menu entirely.' },
      { title: 'Whiteboard and node editors', text: 'Right-click a node in a whiteboard or node editor for circular actions, using a spring-out animation from the centre of the wheel.' },
      { title: 'Data grid pairings', text: 'Pair with a [table row context menu](/ui-snippets/table-row-context-menu/) for per-row actions, and learn polar to Cartesian placement.' },
      { icon: 'CODE', title: 'Related: Tabs with URL Sync', desc: 'See the [Tabs with URL Sync](/ui-snippets/tabs-url-sync/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How is the native browser menu suppressed?`, a: `The stage listens for the real contextmenu event, which fires on an actual right-click, and immediately calls e.preventDefault() inside the handler. Without that call, the browser's own context menu would render on top of the custom radial menu; with it, only the circular menu appears, positioned at the event's clientX/clientY.` },
      { q: `How are the six items spaced evenly around the circle?`, a: `Each item's angle is (index / total) * 2 * Math.PI, offset by -Math.PI/2 so the first item lands at 12 o'clock instead of 3 o'clock. That angle is converted to an x/y offset with cos(angle) * RADIUS and sin(angle) * RADIUS — standard polar-to-Cartesian conversion — and added to the click origin, placing every item at an identical distance from the center with even angular spacing. This recomputes on every open based on the current click coordinates.` },
      { q: `Can I select an action by moving toward it instead of clicking directly?`, a: `Each item is a real element with its own click handler and a generous 52px circular hit area, so moving the cursor near an icon and clicking it works the same as clicking any button — the polar layout keeps every item an equal, predictable distance from the center, which is what makes moving toward one by feel practical once you're familiar with the wheel's arrangement.` },
      { q: `Why does the menu also close on scroll?`, a: `The menu is positioned with fixed-position, viewport-relative coordinates captured at the moment it opened. If the page scrolled while the menu stayed open, its circle would visually detach from whatever element it was originally opened over. Closing on scroll (using a capturing listener so it catches scroll on any nested scrollable ancestor) avoids that mismatch.` },
      { q: `How do I use this radial right-click menu in React, Vue, or Angular?`, a: `Keep an open boolean and an { x, y } origin in state, and compute each item's angle/offset from that origin in render (or via a small memoized helper). Attach the contextmenu listener to your target element's ref, call preventDefault, and set the origin from the event. Handle click-away, Escape, and scroll dismissal in a mount effect with cleanup.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the contextmenu wiring and polar placement math from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why e.preventDefault() inside the contextmenu handler is what suppresses the browser's native right-click menu, and how the angle formula (index / total) * 2 * Math.PI, offset by -Math.PI / 2, spaces every item evenly around a full circle starting from 12 o'clock instead of 3 o'clock. The same assistant can help you optimize it — for instance asking whether the menu should detect when RADIUS would push items off-screen near a viewport edge and shrink or reposition itself accordingly, similar to the edge-clamping in a standard rectangular context menu. It's also useful for extending the menu: ask it to support a partial arc instead of a full circle for edge-anchored triggers, add keyboard arrow-key navigation that moves focus between items in angular order, or make different right-clicked elements open different action sets via event delegation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "radial right-click menu" in plain HTML, CSS, and JavaScript — a circular context menu that opens centered on the real right-click point, replacing the browser's native menu entirely.

Requirements:
- Listen for the actual contextmenu event on a target area (not a click substitute), call e.preventDefault() inside the handler so the browser's native context menu never appears, and use the event's clientX/clientY as the menu's center origin.
- Render a fixed set of circular action items (e.g. six), each placed around the click origin using polar-to-Cartesian math: for item index i out of N total items, compute an angle of (i / N) * 2 * Math.PI (optionally offset so the first item starts at a specific clock position), then convert to an offset with Math.cos(angle) * RADIUS and Math.sin(angle) * RADIUS, and add that offset to the click origin's x/y to get each item's absolute position — this layout must be recalculated fresh every time the menu opens at a new coordinate, not hardcoded.
- Items must be hidden and scaled down at rest, becoming visible and springing out to their computed positions when the menu opens, using a CSS transition with an overshooting easing curve so they visibly pop outward from the exact right-click point rather than just fading in.
- Each item must be independently clickable/selectable (a real click target, not purely decorative), closing the menu and reporting which action was selected.
- Implement multiple ways to close the menu: clicking anywhere outside it, right-clicking outside the original target area, pressing Escape, and scrolling the page (since the menu is positioned at fixed viewport coordinates and would otherwise visually detach from its anchor point if the page scrolled while it stayed open).
- Show a small tooltip label on hover for each icon-only item so the action is identifiable without requiring prior memorization of the icon set.`,
    },
  },
};

export default radialRightClickMenu;
