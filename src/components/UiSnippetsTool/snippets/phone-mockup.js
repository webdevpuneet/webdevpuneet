const phoneMockup = {
  id: 'phone-mockup',
  title: 'Phone Mockup',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<div class="pm-stage">
  <div class="pm-phone" id="pmPhone">
    <span class="pm-island"></span>
    <span class="pm-btn pm-vol-up"></span>
    <span class="pm-btn pm-vol-dn"></span>
    <span class="pm-btn pm-power"></span>
    <div class="pm-screen">
      <div class="pm-status">
        <span id="pmTime">9:41</span>
        <span class="pm-status-r">
          <svg viewBox="0 0 18 12" width="17"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4" y="5" width="3" height="7" rx="1"/><rect x="8" y="3" width="3" height="9" rx="1"/><rect x="12" y="1" width="3" height="11" rx="1" opacity=".35"/></svg>
          <svg viewBox="0 0 16 12" width="15"><path d="M8 11.5 1 4.5a10 10 0 0 1 14 0z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="9.4" r="1.3"/></svg>
          <span class="pm-batt"><i></i></span>
        </span>
      </div>
      <div class="pm-app">
        <header class="pm-head">
          <div><small>Good morning</small><h2>Alex</h2></div>
          <div class="pm-ava">A</div>
        </header>
        <div class="pm-balance">
          <small>Total balance</small>
          <strong>$12,480.55</strong>
          <span class="pm-up">+2.4% this week</span>
        </div>
        <div class="pm-actions">
          <button>Send</button><button>Request</button><button>Top up</button>
        </div>
        <div class="pm-list">
          <div class="pm-tx"><span class="pm-ic" style="background:#6366f1">N</span><div><b>Netflix</b><small>Subscription</small></div><em>-$15.99</em></div>
          <div class="pm-tx"><span class="pm-ic" style="background:#22c55e">S</span><div><b>Salary</b><small>Acme Inc</small></div><em class="pos">+$4,200</em></div>
          <div class="pm-tx"><span class="pm-ic" style="background:#f59e0b">U</span><div><b>Uber</b><small>Transport</small></div><em>-$8.40</em></div>
          <div class="pm-tx"><span class="pm-ic" style="background:#ec4899">D</span><div><b>Dribbble</b><small>Pro plan</small></div><em>-$60.00</em></div>
        </div>
      </div>
    </div>
  </div>
  <button type="button" class="pm-toggle" id="pmToggle">Toggle dark screen</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}
.pm-stage{text-align:center}

.pm-phone{position:relative;width:270px;height:560px;background:#0b1220;border-radius:46px;padding:13px;box-shadow:0 30px 60px -20px rgba(15,23,42,.5),inset 0 0 0 2px #1e293b}
.pm-island{position:absolute;top:24px;left:50%;transform:translateX(-50%);width:88px;height:26px;background:#000;border-radius:14px;z-index:5}
.pm-btn{position:absolute;background:#0b1220;border-radius:3px}
.pm-vol-up{left:-3px;top:130px;width:3px;height:34px}
.pm-vol-dn{left:-3px;top:176px;width:3px;height:34px}
.pm-power{right:-3px;top:150px;width:3px;height:54px}

.pm-screen{position:relative;width:100%;height:100%;border-radius:34px;overflow:hidden;background:#f1f5f9;color:#0f172a;transition:background .3s,color .3s}
.pm-status{display:flex;justify-content:space-between;align-items:center;padding:14px 22px 4px;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
.pm-status-r{display:flex;align-items:center;gap:5px;fill:currentColor}
.pm-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block;opacity:.9}
.pm-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.pm-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:62%;background:currentColor;border-radius:1px}

.pm-app{padding:8px 18px 18px;height:calc(100% - 36px);overflow-y:auto}
.pm-head{display:flex;align-items:center;justify-content:space-between;margin:8px 0 16px}
.pm-head small{font-size:12px;color:#94a3b8;font-weight:600}
.pm-head h2{font-size:20px;font-weight:800}
.pm-ava{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#22d3ee);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800}

.pm-balance{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border-radius:18px;padding:18px;text-align:left;margin-bottom:14px}
.pm-balance small{opacity:.8;font-size:12px}
.pm-balance strong{display:block;font-size:27px;font-weight:800;margin:3px 0}
.pm-up{font-size:12px;background:rgba(255,255,255,.2);padding:2px 8px;border-radius:99px}

.pm-actions{display:flex;gap:8px;margin-bottom:18px}
.pm-actions button{flex:1;border:none;background:#fff;color:#4338ca;border-radius:12px;padding:10px;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;box-shadow:0 4px 12px -6px rgba(0,0,0,.3)}

.pm-list{display:flex;flex-direction:column;gap:13px}
.pm-tx{display:flex;align-items:center;gap:11px}
.pm-ic{width:38px;height:38px;border-radius:11px;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pm-tx div{flex:1;text-align:left;min-width:0}
.pm-tx b{font-size:13.5px;font-weight:700}
.pm-tx small{display:block;font-size:11px;color:#94a3b8}
.pm-tx em{font-style:normal;font-weight:800;font-size:13px}
.pm-tx em.pos{color:#16a34a}

.pm-screen.dark{background:#0f172a;color:#e2e8f0}
.pm-screen.dark .pm-actions button{background:#1e293b;color:#a5b4fc}
.pm-screen.dark .pm-tx small,.pm-screen.dark .pm-head small{color:#64748b}

.pm-toggle{margin-top:22px;background:#0f172a;color:#fff;border:none;border-radius:9px;padding:9px 16px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit}
.pm-toggle:hover{background:#1e293b}`,

  js: `var screen = document.querySelector('.pm-screen');
var timeEl = document.getElementById('pmTime');

// Live status-bar clock so the mockup feels real.
function tick() {
  var d = new Date();
  var h = d.getHours() % 12 || 12;
  timeEl.textContent = h + ':' + ('0' + d.getMinutes()).slice(-2);
}
tick();
setInterval(tick, 10000);

document.getElementById('pmToggle').addEventListener('click', function () {
  screen.classList.toggle('dark');
});`,

  seo: {
    title: 'Phone Mockup — Free CSS iPhone Device Frame Snippet',
    description: `A pure-CSS phone mockup with a dynamic-island notch, side buttons, a live status bar, and a scrollable app screen. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Phone Mockup — Pure-CSS Device Frame for App Screens',
      description: `A phone mockup is a device frame you drop a screen design into — for landing pages, app-store shots, portfolio pieces, and design presentations. This one is built entirely in HTML and CSS (no image of a phone), so it's crisp at any size, theme-able, and you can put live, scrolling, interactive content inside it. It ships with a sample finance app screen and a live status-bar clock, in vanilla JavaScript with no dependency.

**The frame from nested rounded rectangles**

The body is a dark rounded box with heavy \`padding\`, and the screen is an inner rounded box — the gap between their \`border-radius\` values creates the realistic bezel curve where a smaller radius nested inside a larger one reads as a uniform-width rim. An \`inset box-shadow\` adds a subtle metal edge, and a large soft drop shadow lifts the whole device off the page. No device photo is involved, so it scales losslessly.

**Dynamic island and hardware buttons**

The notch is a single absolutely-positioned pill (\`.pm-island\`) centered at the top with a high \`z-index\` so it floats over the screen content. The volume and power buttons are thin absolutely-positioned slivers hanging off the frame's left and right edges — tiny details that sell the realism for the cost of three empty spans.

**A real, scrollable screen — not a picture**

Because the screen is live DOM, the app inside it actually works: \`overflow-y:auto\` makes the transaction list scroll within the device, the status bar shows a CSS-drawn battery and signal bars, and a toggle switches the screen to dark mode by swapping one class. This is the advantage of a CSS mockup over an image — you can demo genuine interaction, dark mode, and responsive content in context.

**The CSS-drawn status bar**

The signal bars are four \`<rect>\`s of increasing height in a tiny inline SVG, the wifi glyph is a stroked arc, and the battery is a bordered box with a nub pseudo-element (\`::after\`) and a percentage fill — all currentColor, so they invert automatically in dark mode. A live clock updates the time so it never looks frozen.

**Reusing it as a wrapper**

Replace the \`.pm-app\` contents with your own screen and the frame becomes a reusable container for any mobile UI. Keep the device markup as a component and pass children into the screen slot — ideal for showcasing a [mobile login screen](/ui-snippets/mobile-login-screen/) or onboarding flow on a marketing page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A CSS phone renders with a sample app screen inside it.` },
      { title: 'Scroll the screen', text: `The transaction list scrolls inside the device frame.` },
      { title: 'Watch the clock', text: `The status-bar time updates live like a real phone.` },
      { title: 'Toggle dark mode', text: `One class swaps the screen between light and dark.` },
      { title: 'Drop in your screen', text: `Replace the app contents with your own mobile UI.` },
      { title: 'Reuse as a wrapper', text: `Keep the frame as a component with a screen slot.` },
    ] },
    features: [
      { title: 'Pure-CSS frame', text: `No phone image — crisp at any size and theme-able.` },
      { title: 'Nested-radius bezel', text: `Inner and outer radii create a realistic rim.` },
      { title: 'Dynamic island', text: `A single positioned pill floats over the screen.` },
      { title: 'Hardware buttons', text: `Volume and power slivers on the frame edges.` },
      { title: 'Live, scrollable screen', text: `Real DOM content, not a static picture.` },
      { title: 'CSS status bar', text: `SVG signal, wifi, and a battery with a fill.` },
      { title: 'Dark-mode toggle', text: `Swap the screen theme with one class.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS for mockups and showcases.` },
    ],
    useCases: [
      { title: 'App landing pages', text: 'Showcase an app screen beside a [product hero](/ui-snippets/product-hero/), with a dynamic island pill and hardware buttons drawn entirely in CSS.' },
      { title: 'Mobile case study frames', text: 'Frame mobile work next to a [bento grid](/ui-snippets/bento-grid/), with nested border radii on the bezel creating a realistic rim at any size.' },
      { title: 'Design presentations', text: 'Present a [mobile login screen](/ui-snippets/mobile-login-screen/) in context, with a live status bar and scrollable app screen inside the frame.' },
      { title: 'Feature showcases', text: 'Pair with a [tablet mockup](/ui-snippets/tablet-mockup/) for responsive demonstrations, and swap content freely since no phone image is involved.' },
      { title: 'Store-style marketing shots', text: 'Wrap a [music player](/ui-snippets/music-player/) screen for app-store style marketing, and learn nested-radius bezels as a CSS device art reference.' },
      { icon: 'CODE', title: 'Related: CSS text-wrap: balance Demo', desc: 'See the [CSS text-wrap: balance Demo](/ui-snippets/text-wrap-balance-demo/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the phone an image or pure CSS?', a: `Pure CSS. The device is a dark rounded box with padding, the screen is a nested rounded box, and the gap between their border-radius values forms the bezel. The notch and side buttons are positioned spans. Because there's no photo, it stays sharp at any zoom and you can recolor or resize it freely.` },
      { q: 'Can I put real interactive content inside it?', a: `Yes — that's the main advantage over a screenshot. The screen is live DOM, so content scrolls with overflow-y:auto, the status-bar clock ticks, and a class toggle switches the screen to dark mode. You can embed forms, lists, animations, or any other snippet and it behaves normally within the frame.` },
      { q: 'How is the realistic bezel created?', a: `By nesting two rounded rectangles. The outer frame has a large border-radius and padding; the inner screen has a slightly smaller radius. The constant-width gap between them, plus an inset box-shadow for a metal edge, reads as a uniform bezel — a standard trick for CSS device frames that avoids any images.` },
      { q: 'How do I swap in my own screen design?', a: `Replace everything inside the .pm-app element with your markup. The frame, status bar, and scrolling are independent of the content, so your screen just needs to fit the screen width. Keeping the device portion as a reusable component lets you pass different screens in as children.` },
      { q: 'How do I use this phone mockup in React, Vue, or Angular?', a: `Make the device frame a component that renders a screen slot (children, a slot, or ng-content) so you can wrap any screen. Move the live-clock interval into a mount effect with cleanup. Toggle dark mode via a state-bound class. In Tailwind, build the frame with rounded-[46px], padding, and shadow utilities, and the status-bar icons with small inline SVGs.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the bezel geometry by trial and error. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why nesting two rounded rectangles with different border-radius values and a fixed padding gap produces a convincing uniform-width bezel, and how the currentColor-based status bar icons automatically invert when the .dark class is toggled on the screen. The same assistant can help optimize it, for example checking whether the setInterval-driven clock should instead sync to the top of the next minute rather than polling every 10 seconds, or whether the absolutely-positioned notch and side buttons hold up correctly at different frame sizes. It's also useful for extending the effect: ask it to add a second device variant (a tablet or a different phone notch style), make the frame a reusable component with a content slot, or add a subtle screen-on animation when swapping app screens. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a pure-CSS iPhone-style device mockup frame in plain HTML, CSS, and vanilla JavaScript, with no image of a phone anywhere — the entire device must be drawn from CSS shapes.

Requirements:
- An outer rounded rectangle representing the phone body with a large border-radius and enough padding that an inner rounded rectangle (the screen) sits inset from it, with a slightly smaller border-radius than the outer shape, so the constant-width gap between the two reads as a realistic bezel. Add an inset box-shadow for a metal-edge highlight and a large soft drop shadow beneath the whole device.
- An absolutely-positioned pill-shaped "dynamic island" notch centered near the top of the screen, above the rest of the screen content in stacking order.
- Thin absolutely-positioned slivers along the left and right edges of the phone body representing volume and power hardware buttons.
- Inside the screen, a status bar row showing a live clock (updating at least once a minute) alongside CSS/SVG-drawn signal-strength bars, a wifi icon, and a battery indicator (a bordered box with a small nub and a fill amount), all using currentColor so they automatically restyle when a theme class changes.
- Below the status bar, a real scrollable app UI (not a static image) so the mockup demonstrates genuine interactive content — include at least one interactive control, such as a button that toggles the screen between a light and dark theme by adding or removing a single CSS class.
- Structure the markup so the device frame could be reused as a wrapper component around arbitrary app content, keeping the frame, notch, buttons, and status bar independent from whatever is placed inside the scrollable app area.`,
    },
  },
};

export default phoneMockup;
