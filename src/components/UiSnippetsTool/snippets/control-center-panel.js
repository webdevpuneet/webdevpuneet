const controlCenterPanel = {
  id: 'control-center-panel',
  title: 'Control Center Panel',
  lastmod: '2026-08-08',
  category: 'mobile',
  html: `<div class="wrap">
  <div class="cc-panel" id="cc-panel">
    <div class="tile-grid">
      <button class="tile" id="tile-wifi" data-on="true">
        <div class="tile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
        </div>
        <div class="tile-label">Wi-Fi</div>
      </button>
      <button class="tile" id="tile-bt" data-on="true">
        <div class="tile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/></svg>
        </div>
        <div class="tile-label">Bluetooth</div>
      </button>
      <button class="tile" id="tile-airplane" data-on="false">
        <div class="tile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.4.4c-.4.4-.3 1 .2 1.3l5.7 3.4-2 2H3.5l-1.2 1.2c-.3.3-.3.7 0 1l2.2 2.2 2.2 2.2c.3.3.7.3 1 0L9 19.5v-3.5l2-2 3.4 5.7c.3.5.9.6 1.3.2l.4-.4c.4-.3.6-.8.5-1.3Z"/></svg>
        </div>
        <div class="tile-label">Airplane</div>
      </button>
      <button class="tile" id="tile-focus" data-on="false">
        <div class="tile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </div>
        <div class="tile-label">Focus</div>
      </button>
    </div>

    <div class="sliders-row">
      <div class="v-slider" id="slider-brightness" data-value="70">
        <div class="v-track" id="track-brightness">
          <div class="v-fill" id="fill-brightness" style="height:70%"></div>
          <div class="v-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          </div>
        </div>
        <div class="v-caption">Brightness</div>
      </div>
      <div class="v-slider" id="slider-volume" data-value="45">
        <div class="v-track" id="track-volume">
          <div class="v-fill" id="fill-volume" style="height:45%"></div>
          <div class="v-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>
          </div>
        </div>
        <div class="v-caption">Volume</div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef1f8; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 300px; }

.cc-panel { background: rgba(255,255,255,0.75); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.6); border-radius: 26px; padding: 18px; box-shadow: 0 24px 60px rgba(30,41,59,0.16); opacity: 0; transform: scale(0.82); }
.cc-panel.mounted { animation: panelIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes panelIn { 0% { opacity: 0; transform: scale(0.8); } 60% { opacity: 1; transform: scale(1.03); } 100% { opacity: 1; transform: scale(1); } }

.tile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }

.tile { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 16px; border: none; background: #e2e6f0; color: #94a3b8; cursor: pointer; transition: background 0.22s, color 0.22s; }
.tile-icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; background: rgba(148,163,184,0.18); transition: background 0.22s; }
.tile-label { font-size: 11.5px; font-weight: 600; }

.tile[data-on="true"] { background: #6366f1; color: #fff; }
.tile[data-on="true"] .tile-icon { background: rgba(255,255,255,0.22); }
.tile[data-on="true"] .tile-icon svg { color: #fff; }
.tile#tile-airplane[data-on="true"] { background: #f97316; }
.tile#tile-focus[data-on="true"] { background: #4338ca; }

.tile.bounce { animation: tileBounce 0.32s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes tileBounce { 0% { transform: scale(1); } 45% { transform: scale(0.9); } 100% { transform: scale(1); } }

.sliders-row { display: flex; gap: 12px; justify-content: center; }
.v-slider { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.v-track { position: relative; width: 46px; height: 120px; border-radius: 16px; background: #e2e6f0; overflow: hidden; cursor: pointer; touch-action: none; }
.v-fill { position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, #a5b4fc, #6366f1); border-radius: 16px 16px 0 0; }
#track-volume .v-fill { background: linear-gradient(180deg, #86efac, #22c55e); }
.v-icon { position: absolute; left: 0; right: 0; bottom: 8px; display: flex; align-items: center; justify-content: center; color: #fff; pointer-events: none; }
.v-caption { font-size: 10.5px; font-weight: 600; color: #64748b; }`,
  js: `var panel = document.getElementById('cc-panel');
requestAnimationFrame(function () {
  requestAnimationFrame(function () { panel.classList.add('mounted'); });
});

['tile-wifi', 'tile-bt', 'tile-airplane', 'tile-focus'].forEach(function (id) {
  var tile = document.getElementById(id);
  tile.addEventListener('click', function () {
    var on = tile.getAttribute('data-on') === 'true';
    tile.setAttribute('data-on', on ? 'false' : 'true');
    tile.classList.remove('bounce');
    void tile.offsetWidth;
    tile.classList.add('bounce');
  });
});

function setupVerticalSlider(trackId, fillId, initial, onChange) {
  var track = document.getElementById(trackId);
  var fill = document.getElementById(fillId);
  var value = initial;
  var dragging = false;

  function applyValue(v) {
    value = Math.max(0, Math.min(100, v));
    fill.style.height = value + '%';
    if (onChange) onChange(value);
  }

  function valueFromClientY(clientY) {
    var rect = track.getBoundingClientRect();
    var relY = clientY - rect.top;
    var pct = 1 - (relY / rect.height);
    return Math.round(pct * 100);
  }

  track.addEventListener('pointerdown', function (e) {
    dragging = true;
    track.setPointerCapture(e.pointerId);
    applyValue(valueFromClientY(e.clientY));
  });
  track.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    applyValue(valueFromClientY(e.clientY));
  });
  track.addEventListener('pointerup', function () { dragging = false; });
  track.addEventListener('pointercancel', function () { dragging = false; });

  return { get: function () { return value; }, set: applyValue };
}

var brightness = setupVerticalSlider('track-brightness', 'fill-brightness', 70);
var volume = setupVerticalSlider('track-volume', 'fill-volume', 45);`,
  seo: {
    title: 'Control Center Panel — Free HTML CSS JS Snippet',
    description: 'iOS-style Control Center with animated toggle tiles and a pointer-driven vertical fill slider you cannot build with input type=range. Exports to React & Vue.',
    about: {
      title: 'Control Center Panel — iOS-Style Toggle Tiles & Custom Vertical Sliders in Vanilla JS',
      description: `iOS Control Center is one of the most recognizable pieces of mobile UI in existence: a frosted-glass card of square toggle tiles for Wi-Fi, Bluetooth, Airplane Mode and Focus, sitting alongside vertical sliders for brightness and volume that fill from the bottom as you drag. None of that is achievable with native HTML form controls — a checkbox does not bounce or recolor on toggle, and \`<input type="range">\` is permanently horizontal with no supported way to rotate it into a bottom-up vertical fill bar without breaking its hit-testing and accessibility semantics. This snippet rebuilds the whole panel from primitive \`<button>\` elements and raw Pointer Events, giving full control over the visual state machine and letting the entrance, toggle, and drag interactions all be tuned independently.

**Toggle tiles: a data attribute as the single source of truth**

Each tile is a plain \`<button>\` with a \`data-on="true"\` or \`data-on="false"\` attribute — that attribute is the entire state model, and CSS attribute selectors (\`.tile[data-on="true"]\`) handle all the visual differences: background color, icon color, and icon-well opacity. Clicking a tile simply flips the attribute string and lets CSS transitions animate the background-color and color changes over 220ms. Airplane Mode and Focus get their own override colors (orange and indigo) when active, matching how iOS visually distinguishes different toggle categories rather than using one blanket "on" color for everything.

**The bounce: retriggering a CSS animation from JavaScript**

A naive \`classList.add('bounce')\` on a class that is already present does nothing, because the browser has no new animation to start. The fix used here is the classic reflow trick: \`classList.remove('bounce')\`, then read \`tile.offsetWidth\` (a layout property, forcing the browser to flush pending style changes synchronously), then \`classList.add('bounce')\` again. That forced read is what makes the browser treat the second \`add\` as a genuinely new animation start rather than a no-op, so every single click gets its own fresh scale-down-then-spring-back bounce, even multiple rapid clicks in a row.

**The vertical slider: translating pointer Y into a 0-100% fill**

This is the part a native \`<input type="range">\` fundamentally cannot do cleanly. \`setupVerticalSlider()\` attaches \`pointerdown\`/\`pointermove\`/\`pointerup\` listeners to a track \`div\`, and on every relevant pointer event calls \`valueFromClientY(clientY)\`, which does three things: reads the track's \`getBoundingClientRect()\` to get its position and height, subtracts the rect's top from the pointer's \`clientY\` to get a relative offset inside the track, and then computes \`1 - (relY / rect.height)\` — the *inversion* is the key detail, since a lower relative Y (near the top of the track) should mean a higher value, and a relative Y near the track's bottom should mean a value near zero, the opposite of how Y coordinates normally increase downward. The result is multiplied by 100 and rounded to a clean percentage, then clamped between 0 and 100 in \`applyValue()\` before being written directly to the fill element's \`height\` style, so the colored bar visually grows from the bottom exactly where the pointer is.

**Why Pointer Events and setPointerCapture, not mousedown/touchstart**

Using the unified Pointer Events API means one set of listeners handles mouse, touch, and stylus input identically — no separate touch handler branch is needed. \`track.setPointerCapture(e.pointerId)\` on \`pointerdown\` is what keeps \`pointermove\` firing on the track element even if the user's finger or cursor drifts outside the narrow 46px-wide track mid-drag; without it, a fast or imprecise drag would stop updating the slider the instant the pointer left the element's bounding box, which feels broken on a control this narrow.

**Entrance animation: double rAF to guarantee the transition fires**

The panel starts at \`opacity: 0; transform: scale(0.82)\` in its base CSS, and the \`.mounted\` class (which triggers the spring keyframe animation) is added inside a nested pair of \`requestAnimationFrame\` calls rather than immediately on script load. A single rAF is sometimes not enough — the browser can still batch the class addition into the same style-calculation pass as the initial render, skipping the "from" state entirely and causing the animation to appear to snap instead of transition. Nesting two rAF calls guarantees the initial styles have been painted at least once before the animation-triggering class is applied, which is a reliable, dependency-free way to force an entrance animation to actually run from its starting state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the panel spring open on load', text: 'The whole card scales up from slightly smaller than full size with a gentle overshoot and fades in, mimicking the swipe-down reveal of the real iOS Control Center.' },
      { title: 'Click the Wi-Fi or Bluetooth tile to toggle it off', text: 'The tile background fades from solid indigo back to a dim neutral gray, the icon dims to match, and the tile plays a quick squash-and-spring bounce on every click.' },
      { title: 'Click Airplane Mode or Focus to turn them on', text: 'Airplane Mode turns orange and Focus turns deep indigo when active, each with the same bounce feedback, showing how different toggle categories get distinct active colors.' },
      { title: 'Press and drag inside the Brightness slider', text: 'The blue fill bar grows or shrinks from the bottom of the track, following your pointer position continuously as you drag up or down — not jumping in fixed steps.' },
      { title: 'Click anywhere in the Volume track to jump directly to that level', text: 'A single click (without dragging) instantly sets the fill height to match the vertical position you clicked, exactly like adjusting brightness in Control Center with a tap.' },
      { title: 'Drag past the top or bottom edge of a slider', text: 'The fill value clamps cleanly at 0% or 100% instead of erroring or overshooting visually, even if your pointer moves outside the track while dragging thanks to pointer capture.' },
    ]},
    features: [
      'Toggle tiles driven entirely by a data-on attribute, styled purely with CSS attribute selectors — no class-juggling logic',
      'Per-tile bounce animation retriggered on every click via a forced offsetWidth reflow, even on rapid repeated clicks',
      'Distinct active colors per toggle category (indigo default, orange for Airplane Mode, deep indigo for Focus)',
      'Custom vertical slider built on raw Pointer Events — impossible to achieve with a rotated input type=range',
      'valueFromClientY() inverts the Y-axis math so up means more and down means less, matching real-world slider expectations',
      'setPointerCapture keeps drags tracking smoothly even when the pointer leaves the narrow 46px track',
      'Double-rAF entrance trick guarantees the spring scale+fade animation reliably plays from its starting state on mount',
      'Frosted-glass backdrop-filter blur card styling matching the real iOS Control Center aesthetic',
    ],
    useCases: [
      { icon: 'APP', title: 'Mobile web app quick-settings panels', desc: 'Use as a real quick-settings drawer in a PWA or mobile-first web app, wiring each tile\'s data-on state to actual device or app settings (theme, notifications, connectivity mocks) instead of purely visual state.' },
      { icon: 'DESIGN', title: 'iOS-style design system component reference', desc: 'A faithful base for any product that wants an Apple-esque settings surface — pair with [brightness-slider](/ui-snippets/brightness-slider) or [multi-range-slider](/ui-snippets/multi-range-slider) if you need a single reusable slider component extracted out.' },
      { icon: 'LEARN', title: 'Learn custom slider math without a UI library', desc: 'The valueFromClientY() function is a self-contained, copy-paste-able lesson in translating pointer coordinates into a percentage value — the same core technique used in color pickers, custom scrubbers, and rating widgets.' },
      { icon: 'APP', title: 'Kiosk, dashboard, or smart-home control surfaces', desc: 'Repurpose the tile grid and vertical sliders for a smart-home dashboard controlling real lights, thermostats, or media volume, since the interaction model already matches what users expect from a physical control panel.' },
      { icon: 'CODE', title: 'Onboarding and demo screenshots for connectivity apps', desc: 'Drop this into marketing pages or app screenshots for VPN, network utility, or system-monitor apps that want to visually reference the familiar Control Center metaphor without shipping real OS-level toggles.' },
      { icon: 'CODE', title: 'Related: Swipe-to-Reveal List Item Actions (Archive / Delete)', desc: 'See the [Swipe-to-Reveal List Item Actions (Archive / Delete)](/ui-snippets/swipe-to-reveal-list-actions/) for a related mobile pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mobile Empty Cart Screen', desc: 'See the [Mobile Empty Cart Screen](/ui-snippets/mobile-empty-cart-screen/) for a related mobile pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mobile Medication Reminder Screen', desc: 'See the [Mobile Medication Reminder Screen](/ui-snippets/mobile-medication-reminder-screen/) for a related mobile pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mobile Settings Screen with Live Search', desc: 'See the [Mobile Settings Screen with Live Search](/ui-snippets/mobile-settings-search-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why not just use a rotated <input type="range"> for the vertical sliders?', a: 'Rotating a native range input with CSS transform: rotate(-90deg) is a common workaround, but it breaks the input\'s hit-testing box (clicks land in the wrong place relative to what is visually shown), makes styling the fill-from-bottom track nearly impossible across browsers, and creates accessibility inconsistencies between screen readers reading the rotated versus visual orientation. Building the slider from a plain div and Pointer Events, as this snippet does, gives full control over the fill direction, hit area, and visual styling at the cost of manually implementing keyboard accessibility if you need it.' },
      { q: 'How do I read the current brightness or volume value in my own code?', a: 'setupVerticalSlider() returns an object with get() and set(value) methods. The two slider instances are stored in the brightness and volume variables, so call brightness.get() to read the current 0-100 value at any time, or brightness.set(30) to programmatically move the slider (for example, syncing it to a real system brightness API).' },
      { q: 'How do I add a third or fourth vertical slider?', a: 'Duplicate one .v-slider block in the HTML with new track/fill element IDs, add a matching CSS gradient rule if you want a distinct color, and call setupVerticalSlider("track-yourid", "fill-yourid", initialValue) in the script — the function is fully reusable and does not assume there are only two sliders on the page.' },
      { q: 'Can I use this control center panel in React, Vue, or Angular?', a: 'Yes. Model each tile\'s on/off state and each slider\'s value as component state (React useState, Vue ref, Angular component properties) rather than reading data-on attributes directly, and drive the pointer listeners from useEffect / onMounted / ngAfterViewInit, attaching them to a ref instead of getElementById. Remove the pointerdown/pointermove/pointerup listeners in the effect cleanup (React\'s returned cleanup function, onUnmounted, or ngOnDestroy) to avoid leaking listeners if the panel is conditionally unmounted while a drag is in progress.' },
      { q: 'Why does the entrance animation use two nested requestAnimationFrame calls instead of one?', a: 'A single rAF call can still land in the same style-calculation batch as the element\'s very first paint, so the browser never registers a distinct "before" state and the animation appears to snap instantly to its end state instead of transitioning. Nesting a second rAF inside the first guarantees at least one full frame has been painted with the initial (pre-animation) styles before the class that triggers the keyframe animation is applied, which reliably forces the transition to run from its starting values every time.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's code to an AI assistant like Claude and ask it to walk through why valueFromClientY() inverts the percentage calculation (1 minus the ratio, not just the ratio) — it's a small line that is easy to get backwards and worth understanding fully. Then try asking for a horizontal-lock so slider drags ignore horizontal pointer movement, a double-tap-to-mute gesture on the volume tile, or a version where toggling Airplane Mode also visually disables the Wi-Fi and Bluetooth tiles, the way real iOS behaves.`,
      prompt: `Build an iOS-style Control Center panel in plain HTML, CSS, and JavaScript — no frameworks, no native input type="range".

Requirements:
- A rounded, frosted-glass-styled card containing a 2x2 grid of toggle tiles for Wi-Fi, Bluetooth, Airplane Mode, and Focus/Do Not Disturb, each with a distinct SVG icon.
- Each tile's on/off state should be tracked with a single data attribute (not multiple classes), and clicking a tile should flip that attribute and transition its background color and icon color smoothly, with a couple of the tiles (like Airplane Mode) using a different accent color than the default when active.
- Every tile click must also play a quick squash-and-spring bounce animation, and it must replay correctly even on rapid repeated clicks on the same tile (hint: you cannot just re-add a class that's already present — you need to force a reflow between removing and re-adding it).
- Build at least one custom vertical slider (brightness or volume) as a div-based track with a fill element that grows from the bottom, NOT using input type="range", implemented with Pointer Events (pointerdown/pointermove/pointerup) and setPointerCapture so dragging keeps working even if the pointer strays outside the narrow track.
- The vertical slider's core math must convert a pointer's clientY position into a 0-100% value using the track's bounding rect, correctly inverting the axis so higher on the track means a higher percentage.
- Give the whole panel a spring-like scale-and-fade entrance animation when it first mounts, using a technique that reliably triggers the CSS transition from its starting state rather than snapping instantly (a double requestAnimationFrame is one valid approach).`,
    },
  },
};

export default controlCenterPanel;
