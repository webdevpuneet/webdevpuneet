const mobileStatusBar = {
  id: 'mobile-status-bar',
  title: 'Mobile Status Bar',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="sb-wrap">
  <div class="sb-demo" id="sbDemo">
    <div class="sb-bar">
      <div class="sb-left">
        <span class="sb-time" id="sbTime">9:41</span>
      </div>
      <div class="sb-notch"></div>
      <div class="sb-right">
        <svg class="sb-signal" viewBox="0 0 20 12" width="18"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
        <svg class="sb-wifi" viewBox="0 0 18 14" width="17"><path d="M9 13.2 1.4 5.6a11 11 0 0 1 15.2 0z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10.6" r="1.5"/></svg>
        <span class="sb-pct" id="sbPct">84%</span>
        <span class="sb-batt"><i id="sbFill"></i></span>
      </div>
    </div>
    <div class="sb-page">
      <h3>Screen content</h3>
      <p>The status bar sits flush at the top of any screen. Toggle the theme to see it adapt.</p>
    </div>
  </div>
  <div class="sb-controls">
    <button type="button" id="sbTheme">Toggle dark</button>
    <button type="button" id="sbNotch">Toggle notch</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#475569;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}
.sb-wrap{text-align:center;width:100%;max-width:300px}

.sb-demo{border-radius:30px;overflow:hidden;background:#fff;color:#0f172a;box-shadow:0 24px 50px -20px rgba(0,0,0,.5);transition:background .3s,color .3s}
.sb-bar{display:flex;align-items:center;justify-content:space-between;padding:11px 26px 9px;font-weight:700;position:relative}
.sb-left,.sb-right{display:flex;align-items:center;gap:6px;flex:1}
.sb-right{justify-content:flex-end;fill:currentColor}
.sb-time{font-size:15px;font-variant-numeric:tabular-nums}
.sb-pct{font-size:12px;font-weight:700;font-variant-numeric:tabular-nums}
.sb-batt{width:24px;height:12px;border:1.5px solid currentColor;border-radius:3px;position:relative;display:inline-block;opacity:.9}
.sb-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:6px;background:currentColor;border-radius:0 1px 1px 0}
.sb-batt i{position:absolute;left:1.5px;top:1.5px;bottom:1.5px;width:84%;background:currentColor;border-radius:1px;transition:width .3s}
.sb-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:120px;height:26px;background:#000;border-radius:0 0 18px 18px;transition:opacity .25s,transform .25s}
.sb-demo.no-notch .sb-notch{opacity:0;transform:translateX(-50%) translateY(-26px)}

.sb-page{padding:24px;text-align:left;min-height:130px;background:linear-gradient(160deg,#eef2ff,#fff 60%)}
.sb-page h3{font-size:16px;font-weight:800}
.sb-page p{font-size:13px;color:#64748b;margin-top:6px;line-height:1.5}

.sb-demo.dark{background:#0f172a;color:#e2e8f0}
.sb-demo.dark .sb-page{background:linear-gradient(160deg,#1e293b,#0f172a 60%)}
.sb-demo.dark .sb-page h3{color:#f1f5f9}

.sb-controls{display:flex;gap:8px;margin-top:20px}
.sb-controls button{flex:1;background:#0f172a;color:#fff;border:none;border-radius:9px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
.sb-controls button:hover{background:#1e293b}`,

  js: `var demo = document.getElementById('sbDemo');
var timeEl = document.getElementById('sbTime');
var fill = document.getElementById('sbFill');
var pct = document.getElementById('sbPct');

function tick() {
  var d = new Date();
  var h = d.getHours() % 12 || 12;
  timeEl.textContent = h + ':' + ('0' + d.getMinutes()).slice(-2);
}
tick();
setInterval(tick, 10000);

// Read the real battery level when the API is available.
if (navigator.getBattery) {
  navigator.getBattery().then(function (b) {
    function show() { var p = Math.round(b.level * 100); pct.textContent = p + '%'; fill.style.width = Math.max(6, p) + '%'; }
    show(); b.addEventListener('levelchange', show);
  });
}

document.getElementById('sbTheme').addEventListener('click', function () { demo.classList.toggle('dark'); });
document.getElementById('sbNotch').addEventListener('click', function () { demo.classList.toggle('no-notch'); });`,

  seo: {
    title: 'Mobile Status Bar — Free iOS Status Bar UI Snippet',
    description: `A reusable mobile status bar with a live clock, CSS signal, wifi and battery icons, a notch, and light/dark themes. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Mobile Status Bar — Reusable iOS-Style Top Bar',
      description: `A mobile status bar is the thin strip at the top of every phone screen — time on the left; signal, wifi, and battery on the right — that app mockups and design systems need to look authentic. This snippet is a reusable, themeable status bar drawn entirely in HTML and CSS, with a live clock, real battery reading, an optional notch, and light/dark modes, in vanilla JavaScript with no dependency.

**Icons drawn in CSS and SVG, not a font**

The signal is four \`<rect>\`s of rising height in a tiny inline SVG; the wifi is a stroked arc with a dot; the battery is a bordered box with a nub \`::after\` and an inner fill bar. Every glyph uses \`currentColor\`, so the whole bar inverts automatically when the theme flips — no separate dark-mode icon set. Building them inline keeps the component self-contained with no icon dependency.

**A live clock and real battery**

A \`tick()\` interval keeps the time current in 12-hour format. Where the browser supports it, \`navigator.getBattery()\` reads the actual device charge and updates the percentage and fill on \`levelchange\`, so the mockup reflects reality; it degrades gracefully to the default value where the API is unavailable.

**The notch as a toggle**

The notch is a single black pill anchored to the top center with bottom-rounded corners. A \`.no-notch\` class slides it up and fades it out via transitions, letting you switch between notched and flat-top devices — useful when one design system targets multiple phones. Because it's absolutely positioned, it overlays the bar without affecting layout.

**Theming with one class**

Light and dark are a single \`.dark\` class on the container; since text and icons are \`currentColor\` and backgrounds use the theme, flipping the class restyles the entire bar and the demo page beneath it. This mirrors how you'd drive a real app's status-bar style from the active theme.

**Reusing it as a header**

The status bar is built to sit flush atop any screen. Drop it above your content (or inside a [phone mockup](/ui-snippets/phone-mockup/)) and it provides the device chrome for free. Keep it as a component and pass a theme prop, and every screen in your design — login, onboarding, dashboard — gets a consistent, live top bar.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A status bar renders flush above a demo screen.` },
      { title: 'Watch the clock', text: `The time updates live in 12-hour format.` },
      { title: 'See the battery', text: `Where supported, it reads the real device charge.` },
      { title: 'Toggle dark mode', text: `One class flips the bar and page to a dark theme.` },
      { title: 'Toggle the notch', text: `Switch between notched and flat-top devices.` },
      { title: 'Reuse it', text: `Place it atop any screen as device chrome.` },
    ] },
    features: [
      { title: 'CSS/SVG icons', text: `Signal, wifi, and battery with no icon font.` },
      { title: 'currentColor theming', text: `Icons invert automatically with the theme.` },
      { title: 'Live clock', text: `12-hour time updated on an interval.` },
      { title: 'Real battery', text: `Reads device charge via the Battery API.` },
      { title: 'Toggleable notch', text: `Slide-and-fade between notch and flat top.` },
      { title: 'Light/dark', text: `A single class restyles the whole bar.` },
      { title: 'Flush header', text: `Designed to sit atop any screen.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS, self-contained.` },
    ],
    useCases: [
      { title: 'App mockup chrome', text: `Top off a screen inside a [phone mockup](/ui-snippets/phone-mockup/).` },
      { title: 'Design systems', text: `A shared bar across a [mobile login screen](/ui-snippets/mobile-login-screen/) and more.` },
      { title: 'Onboarding and lock screens', text: `Reuse atop a [mobile lock screen](/ui-snippets/mobile-lock-screen/).` },
      { title: 'Theme demos', text: `Show light/dark beside a [color mode toggle](/ui-snippets/color-mode-toggle/).` },
      { title: 'Device indicators', text: `Pair the battery with a [battery indicator](/ui-snippets/battery-indicator/).` },
      { title: 'Learning CSS icons', text: `A reference for SVG signal and battery glyphs.` },
      { icon: 'CODE', title: 'Related: Mobile Notifications Screen', desc: 'See the [Mobile Notifications Screen](/ui-snippets/mobile-notifications-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are the status icons an icon font?', a: `No — they're inline SVG and CSS. The signal is four rising rects, the wifi is a stroked arc with a dot, and the battery is a bordered box with a nub pseudo-element and a fill bar. All use currentColor, so they recolor with the text and invert in dark mode without a separate icon set.` },
      { q: 'Does it show the real battery level?', a: `Where the browser supports navigator.getBattery(), yes — it reads the actual charge, sets the percentage and fill width, and listens for levelchange to stay current. In contexts without the API it simply keeps the default value, so it never breaks; it just falls back to a static level.` },
      { q: 'How does the notch toggle work?', a: `The notch is one black pill positioned at the top center with bottom-rounded corners and a high stacking order, so it overlays the bar without affecting layout. A no-notch class translates it up and fades it via CSS transitions, letting you switch between notched and flat-top device styles instantly.` },
      { q: 'How is dark mode handled?', a: `A single dark class on the container. Because the icons and text use currentColor and the backgrounds reference the theme, toggling that one class restyles the entire bar and the demo page beneath it — the same way you'd switch a real app's status-bar appearance based on the active theme.` },
      { q: 'How do I use this status bar in React, Vue, or Angular?', a: `Make it a component with a theme prop that sets the dark class and a notch boolean. Put the clock interval and the getBattery subscription in a mount effect with cleanup. Render it at the top of each screen as shared chrome. In Tailwind, lay out the bar with flex justify-between and build the icons as small inline SVGs using currentColor.` },
    ],
    aiPrompt: {
      paragraph: `Rather than puzzling out the icon markup by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why every glyph is drawn with currentColor instead of a fixed hex value, and what would break in dark mode if even one icon lost that property, or to walk through the navigator.getBattery() promise chain and its levelchange listener. The same assistant can help you optimize it, for example asking whether a ten-second clock interval is the right tradeoff between battery use and displayed accuracy, or whether the notch's opacity-and-transform toggle could be replaced with a single CSS custom property. It is also useful for extending the bar: ask it to add carrier signal-strength tiers driven by a real Network Information API reading, support a Dynamic-Island-style pill instead of a notch, or expose the whole thing as a themeable web component. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a reusable "mobile status bar" component in plain HTML, CSS, and JavaScript using only inline SVG and CSS shapes for icons — no icon font, no image assets.

Requirements:
- A thin bar with a live clock on the left showing 12-hour time updated at a low-cost interval (a few seconds is fine, not every second), and on the right a signal-strength icon (a small set of ascending bars), a wifi icon (a stroked arc plus a dot), a battery percentage number, and a battery glyph (a bordered rectangle with a small nub and an inner fill bar).
- Every icon and the battery fill must use currentColor (or a CSS variable derived from it) rather than a hardcoded color, so that toggling a single theme class on the container recolors every icon and the text together with no per-icon overrides.
- If the Battery Status API (navigator.getBattery) is available in the browser, the battery percentage and fill width must reflect the real device battery level and update live on the API's levelchange event; if the API is unavailable, it must fall back gracefully to a fixed placeholder value with no errors thrown.
- An optional notch element, absolutely positioned at the top center as a rounded-bottom pill, that can be toggled off with a class that both fades its opacity to zero and slides it upward via a transform, rather than just toggling display so the change animates.
- A single boolean class on the outer container must be all that's needed to switch the whole bar and an example content area beneath it between a light and a dark theme.
- The bar must be built so it can sit flush at the very top of an arbitrary screen of content below it, with no dependency on that content's structure.`,
    },
  },
};

export default mobileStatusBar;
