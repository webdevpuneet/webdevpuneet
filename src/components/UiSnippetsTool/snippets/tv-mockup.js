const tvMockup = {
  id: 'tv-mockup',
  title: 'Smart TV Mockup',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<div class="tv-stage">
  <div class="tv-set">
    <div class="tv-screen">
      <div class="tv-ui" id="tvUi" tabindex="0">
        <div class="tv-hero">
          <span class="tv-tag">SERIES</span>
          <h2>Nightfall</h2>
          <p>A detective unravels a city-wide conspiracy across one endless night.</p>
          <div class="tv-actions"><span class="tv-play" data-f>▶ Play</span><span class="tv-more" data-f>+ My List</span></div>
        </div>
        <div class="tv-row">
          <h3>Trending now</h3>
          <div class="tv-tiles">
            <span class="t1" data-f></span><span class="t2" data-f></span><span class="t3" data-f></span><span class="t4" data-f></span><span class="t5" data-f></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="tv-stand"></div><div class="tv-foot"></div>
  <p class="tv-hint">Click the screen, then use arrow keys to move focus</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#e2e8f0;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.tv-set{width:480px;max-width:90vw;background:#0b0f17;border-radius:14px;padding:10px;box-shadow:0 26px 50px -22px rgba(15,23,42,.6),inset 0 0 0 2px #1e293b}
.tv-screen{aspect-ratio:16/9;border-radius:6px;overflow:hidden;background:#000}
.tv-ui{width:100%;height:100%;overflow:hidden;background:linear-gradient(120deg,#1e1b4b,#0f172a 60%);color:#fff;outline:none;position:relative}

.tv-hero{padding:26px 28px 14px;max-width:70%}
.tv-tag{font-size:9px;font-weight:800;letter-spacing:2px;color:#a5b4fc}
.tv-hero h2{font-size:30px;font-weight:800;margin:5px 0 7px}
.tv-hero p{font-size:12px;color:#cbd5e1;line-height:1.45;margin-bottom:14px}
.tv-actions{display:flex;gap:10px}
.tv-actions span{font-size:12px;font-weight:700;padding:7px 16px;border-radius:7px;background:rgba(255,255,255,.16);cursor:pointer}
.tv-play{background:#fff!important;color:#0f172a}

.tv-row{padding:6px 28px 20px}
.tv-row h3{font-size:13px;font-weight:700;margin-bottom:9px;color:#e2e8f0}
.tv-tiles{display:flex;gap:11px}
.tv-tiles span{flex:1;height:74px;border-radius:8px;cursor:pointer}
.t1{background:linear-gradient(135deg,#6366f1,#22d3ee)}.t2{background:linear-gradient(135deg,#ec4899,#f59e0b)}.t3{background:linear-gradient(135deg,#10b981,#14b8a6)}.t4{background:linear-gradient(135deg,#8b5cf6,#ec4899)}.t5{background:linear-gradient(135deg,#f43f5e,#fb923c)}

[data-f]{transition:transform .18s,box-shadow .18s;position:relative}
[data-f].focus{transform:scale(1.07);box-shadow:0 0 0 3px #fff,0 10px 24px -8px rgba(0,0,0,.6);z-index:3}

.tv-stand{width:90px;height:30px;background:linear-gradient(#1e293b,#0b0f17);margin-top:-2px;clip-path:polygon(28% 0,72% 0,100% 100%,0 100%)}
.tv-foot{width:170px;height:9px;background:#94a3b8;border-radius:6px}
.tv-hint{margin-top:16px;font-size:12px;color:#475569;font-weight:600}`,

  js: `var ui = document.getElementById('tvUi');
var items = Array.prototype.slice.call(ui.querySelectorAll('[data-f]'));
var focusIndex = 0;

function setFocus(i) {
  focusIndex = Math.max(0, Math.min(items.length - 1, i));
  items.forEach(function (el, idx) { el.classList.toggle('focus', idx === focusIndex); });
  items[focusIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

// D-pad style navigation. Group 0-1 are the hero buttons; 2-6 the tiles.
ui.addEventListener('keydown', function (e) {
  var heroCount = 2;
  if (e.key === 'ArrowRight') { setFocus(focusIndex + 1); e.preventDefault(); }
  else if (e.key === 'ArrowLeft') { setFocus(focusIndex - 1); e.preventDefault(); }
  else if (e.key === 'ArrowDown' && focusIndex < heroCount) { setFocus(heroCount); e.preventDefault(); }
  else if (e.key === 'ArrowUp' && focusIndex >= heroCount) { setFocus(0); e.preventDefault(); }
  else if (e.key === 'Enter') { items[focusIndex].style.transform = 'scale(.96)'; setTimeout(function () { setFocus(focusIndex); }, 120); }
});

items.forEach(function (el, idx) { el.addEventListener('click', function () { ui.focus(); setFocus(idx); }); });
ui.addEventListener('focus', function () { setFocus(focusIndex); });
setFocus(0);`,

  seo: {
    title: 'Smart TV Mockup — Free CSS TV Screen UI Snippet',
    description: `A pure-CSS smart TV mockup with a stand, a streaming home screen, and D-pad arrow-key focus navigation between tiles. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Smart TV Mockup — CSS TV Frame with D-Pad Focus',
      description: `A smart TV mockup frames a streaming or app interface inside a television, complete with the focus-based navigation that remote-driven TV UIs rely on. This snippet builds a flat-screen TV in pure HTML and CSS — bezel, stand, foot — with a sample streaming home screen and real D-pad arrow-key navigation, in vanilla JavaScript with no dependency. It's a strong reference for the "10-foot UI" focus model that web TV apps (and devices like Apple TV or Android TV) use.

**The TV body and stand**

The set is a near-black rounded box with a thin \`inset\` bezel and a soft shadow, wrapping a \`16/9\` \`aspect-ratio\` screen so it keeps TV proportions at any width. Below it, a \`clip-path\` trapezoid forms the angled neck of the stand and a rounded bar is the foot — a recognizable TV silhouette built entirely from CSS shapes.

**Focus-driven navigation, not a cursor**

TV interfaces don't have a pointer; users move a *focus highlight* with a remote's directional pad. This mockup implements exactly that: every focusable element is tagged \`[data-f]\`, and a \`setFocus(i)\` function moves a \`.focus\` class that scales the element and draws a white ring. Arrow keys drive it — Left/Right move within a group, Down jumps from the hero buttons into the tile row, Up returns — with the index clamped so focus never falls off the ends.

**Spatial groups**

The handler models two rows: the hero actions (indices 0–1) and the content tiles (2–6). Down from the hero lands on the first tile; Up from any tile returns to the first action. This is a simplified version of the spatial-navigation logic TV frameworks implement, and it shows the core idea — mapping directional input to the nearest focusable item — without a library.

**Visible focus and Enter**

The focus ring is deliberately bold (a white outline plus a lift), because on a TV viewed from across the room the focused item must be unmistakable. Pressing Enter gives a quick press animation, standing in for selecting a title. \`scrollIntoView({ block: 'nearest' })\` keeps the focused tile in view if the row scrolls.

**Reusing it**

Replace the rows with your real content and tag focusable items with \`data-f\`; the navigation adapts to however many you add. Use it to prototype a streaming app, a kiosk, or any [carousel](/ui-snippets/carousel/)-driven TV interface, and pair it with a [laptop mockup](/ui-snippets/laptop-mockup/) to show a cross-device product.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A CSS smart TV renders a streaming home screen.` },
      { title: 'Click the screen', text: `Focus the UI so it can receive key input.` },
      { title: 'Press arrow keys', text: `A focus ring moves between the hero buttons and tiles.` },
      { title: 'Go down then across', text: `Down enters the tile row; Left/Right move along it.` },
      { title: 'Press Enter', text: `The focused item gives a quick select animation.` },
      { title: 'Add your content', text: `Tag focusable items with data-f and the nav adapts.` },
    ] },
    features: [
      { title: 'Pure-CSS TV', text: `Bezel, stand, and foot from CSS shapes — no image.` },
      { title: '16:9 screen', text: `aspect-ratio keeps TV proportions responsively.` },
      { title: 'D-pad navigation', text: `Arrow keys move a focus highlight, not a cursor.` },
      { title: 'Spatial groups', text: `Down/Up jump between the hero and tile rows.` },
      { title: 'Bold focus ring', text: `A scale and white outline for 10-foot legibility.` },
      { title: 'Clamped focus', text: `Focus never falls off the ends.` },
      { title: 'data-f tagging', text: `Add focusable items and the nav adapts.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS for TV interfaces.` },
    ],
    useCases: [
      { title: 'Streaming app prototypes', text: 'Mock a TV home screen of poster tiles inside a 16:9 flat panel with bezel, stand and foot drawn from CSS shapes alone.' },
      { title: 'Cross-device showcases', text: 'Pair with a [laptop mockup](/ui-snippets/laptop-mockup/) and [phone mockup](/ui-snippets/phone-mockup/) to present a media app across screens, as part of a [carousel](/ui-snippets/carousel/) of device shots.' },
      { title: 'Kiosk and signage prototypes', text: 'Prototype focus-driven interfaces beside a [sidebar nav](/ui-snippets/sidebar-nav/), with D-pad arrow keys moving a focus highlight rather than a cursor.' },
      { title: 'Marketing shots', text: 'Frame a media app in a [bento grid](/ui-snippets/bento-grid/), with spatial groups letting Down and Up jump between a hero row and tile rows.' },
      { title: 'Game and console interfaces', text: 'Reuse the focus model for a [leaderboard podium](/ui-snippets/leaderboard-podium/) or menu screens, and study D-pad navigation as a spatial focus reference.' },
    ],
    faqs: [
      { q: 'How does the arrow-key navigation work?', a: `Every focusable element is tagged with a data-f attribute and collected into an array. A setFocus(index) function toggles a focus class — scaling the item and drawing a white ring — and arrow keys change the index: Left/Right move within a row, Down jumps from the hero buttons into the tiles, and Up returns. The index is clamped so focus stays on a valid item.` },
      { q: 'Why focus instead of a mouse cursor?', a: `TV interfaces are driven by a remote's directional pad, not a pointer, so navigation moves a visible focus highlight between elements. This mockup models that "10-foot UI" pattern, which is how Apple TV, Android TV, and web TV apps work. The bold focus ring exists because the focused item must be obvious from across a room.` },
      { q: 'Is the TV an image?', a: `No. The set is a rounded near-black box with an inset bezel, the screen uses a 16/9 aspect-ratio, and the stand is a clip-path trapezoid with a rounded foot bar. Everything is CSS, so it scales crisply and you can recolor or resize the frame freely.` },
      { q: 'How do I add my own content?', a: `Put your rows and tiles in the screen and add the data-f attribute to anything that should be focusable. The script collects all data-f elements automatically, so the navigation works with however many you add. You can extend the keydown handler to model more rows for richer spatial movement.` },
      { q: 'How do I use this TV mockup in React, Vue, or Angular?', a: `Render the rows from data and keep the focused index in state, applying the focus class conditionally. Handle arrow keys in a keydown listener on the container ref and update the index. For production TV apps, consider a spatial-navigation library, but this shows the core mapping of directional input to the nearest focusable item. Tailwind styles the frame and tiles with utilities.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the keydown handler by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the heroCount constant partitions focus into the hero row versus the tile row, and why ArrowDown and ArrowUp only fire their jump when focusIndex crosses that boundary rather than always moving by one. It's also worth asking about scaling the model — the current setFocus clamps against a single flat items array, so ask what changes if you add a third row of tiles, or many rows, and need up/down movement to land in the same column rather than always jumping to index heroCount. For extending it, have it add multi-row spatial navigation that remembers the last column per row, a back/exit key that leaves the tv-ui element, or a live "Now Playing" overlay that fades in on the currently focused tile. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a smart TV UI mockup in plain HTML, CSS, and vanilla JavaScript with no libraries, using CSS shapes for the physical TV frame and keyboard-driven focus navigation instead of mouse hover for the on-screen UI.

Requirements:
- A TV body built entirely from CSS: a dark rounded rectangle with an inset border for the bezel, a screen area locked to a 16:9 aspect-ratio, a stand neck built with clip-path as an angled trapezoid, and a separate rounded foot bar underneath — no raster images.
- Inside the screen, a hero section with a title, description, and two action elements, plus a horizontal row of several content tiles below it.
- Tag every element that should be focusable with a shared data attribute, and collect them into a single ordered array on load.
- Write a setFocus(index) function that clamps the index within the valid range, toggles a "focus" class on exactly the one element at that index (removing it from all others), and scrolls that element into view.
- Handle arrow keys on the screen container: Left/Right must move the focus index by one within the current array; Down must jump from anywhere in the hero group directly to the first tile; Up must jump from anywhere in the tile group back to the first hero action — model this as two distinct groups (a hero group and a tile group), not just a flat left/right list.
- The focused element must visibly scale up and gain a bold white outline/ring so it reads clearly as focused from a distance, matching how real TV remote-driven interfaces work.
- Pressing Enter must play a brief press/scale-down animation on the currently focused element before returning it to its focused state.
- Clicking any tile or hero action directly with a mouse must also update setFocus to that element's index, keeping mouse and keyboard focus in sync.`,
    },
  },
};

export default tvMockup;
