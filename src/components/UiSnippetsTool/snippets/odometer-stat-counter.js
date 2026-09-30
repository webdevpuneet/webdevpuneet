const odometerStatCounter = {
  id: 'odometer-stat-counter',
  title: 'Odometer Rolling Stat Counters',
  lastmod: '2026-08-21',
  category: 'dashboards',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.8/themes/odometer-theme-minimal.css',
    'https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.8/odometer.min.js',
  ],
  html: `<section class="ost-wrap">
  <header class="ost-head"><h1>Quarter in Numbers</h1><p>Numbers roll like a mechanical odometer instead of just changing instantly — scroll into view or click the button below.</p></header>
  <div class="ost-grid">
    <div class="ost-tile"><div class="odometer" id="ostRevenue">0</div><span class="ost-label">Revenue ($k)</span></div>
    <div class="ost-tile"><div class="odometer" id="ostUsers">0</div><span class="ost-label">Active Users</span></div>
    <div class="ost-tile"><div class="odometer" id="ostDeploys">0</div><span class="ost-label">Deploys</span></div>
    <div class="ost-tile"><div class="odometer" id="ostUptime">0</div><span class="ost-label">Uptime %</span></div>
  </div>
  <button class="ost-btn" id="ostReplay">Roll again ↻</button>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#160a12;color:#fce7f3}
.ost-wrap{max-width:840px;margin:0 auto;padding:64px 24px}
.ost-head{text-align:center;margin-bottom:44px}
.ost-head h1{font-size:clamp(28px,5vw,42px);letter-spacing:-.02em;margin-bottom:10px;background:linear-gradient(135deg,#fff,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ost-head p{color:#c98aa8;font-size:15px;max-width:460px;margin:0 auto;line-height:1.6}
.ost-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:18px;margin-bottom:32px}
.ost-tile{background:linear-gradient(160deg,#2a0f20,#180a13);border:1px solid #401a30;border-radius:18px;padding:26px 18px;text-align:center}
.odometer{font-size:38px;font-weight:800;color:#f9a8d4;letter-spacing:-.01em}
.ost-label{display:block;margin-top:10px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#c98aa8}
.ost-btn{display:block;margin:0 auto;padding:11px 22px;border-radius:10px;border:1px solid #401a30;background:#220f1a;color:#fbcfe8;font-size:14px;font-weight:600;cursor:pointer}
.ost-btn:hover{background:#331526}
/* odometer.js renders each digit as an absolutely positioned span inside
   .odometer — the theme CSS above handles the sliding-digit visuals, this
   just makes sure the digits inherit our color and weight. */
.odometer-inside .odometer-digit-inner{color:inherit}`,

  js: `// Odometer replaces an element's innerHTML with a fake "rolling digit"
// structure the moment it's constructed. Any subsequent change to
// .innerHTML (or el.innerHTML = newValue) triggers the roll animation —
// there is no separate "play" call, the animation *is* the value change.
Odometer.options = { duration: 1400, animation: 'count' };

const targets = {
  ostRevenue: 482,
  ostUsers: 15230,
  ostDeploys: 964,
  ostUptime: 99,
};

const odometers = {};
Object.keys(targets).forEach(id => {
  odometers[id] = new Odometer({ el: document.getElementById(id), value: 0 });
});

function rollIn() {
  // Setting .innerHTML on the wrapped element is odometer.js's own API
  // for triggering a roll to a new value.
  Object.entries(targets).forEach(([id, value]) => {
    odometers[id].update(value);
  });
}

// Roll in once the stat grid scrolls into view.
const grid = document.querySelector('.ost-grid');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      rollIn();
      observer.disconnect();
    }
  });
}, { threshold: 0.4 });
observer.observe(grid);

// Also allow replaying manually via the button (resets to 0 first).
document.getElementById('ostReplay').addEventListener('click', () => {
  Object.keys(targets).forEach(id => odometers[id].update(0));
  setTimeout(rollIn, 250);
});`,

  seo: {
    title: 'Odometer Rolling Stat Counters — Free odometer.js Dashboard Snippet',
    description: `Stat tiles whose numbers roll like a mechanical odometer when they scroll into view or on click, built with the odometer.js library. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Odometer Rolling Stat Counters — Mechanical Digit Rolls with odometer.js',
      description: `Odometer.js recreates the physical odometer effect — each digit spins independently on its own vertical reel until it lands on the new value — for arbitrary numbers on a web page. This snippet uses it to build a row of dashboard stat tiles that roll from zero to their real value the moment the grid scrolls into view, with a replay button to trigger the animation again on demand.

**Odometer's API is the value itself**

Unlike a typical animation library where you call something like \`.play()\` or \`.animate()\`, odometer.js works by intercepting how you update the element's value: once an element is wrapped with \`new Odometer({ el, value: 0 })\`, calling \`.update(newValue)\` — or, in odometer's classic usage, simply assigning to the underlying element's \`innerHTML\` — triggers the roll. The library replaces the element's content with a structure of individually-positioned digit reels, so setting a new value doesn't just swap text, it animates each digit to its new position on its own reel.

**Triggering the roll on scroll**

Rather than rolling on page load (which the visitor might miss if the stats are below the fold), this snippet wraps the four tiles in a single \`IntersectionObserver\` watching the \`.ost-grid\` container. Once it's roughly 40% visible, \`rollIn()\` fires once for all four odometers and the observer disconnects — this is the same "reveal once, on scroll" pattern used by [Count Up](/ui-snippets/count-up/) and [Number Ticker](/ui-snippets/number-ticker/), just with odometer.js handling the actual digit animation instead of a manual \`requestAnimationFrame\` tween.

**Independent digit reels**

Because each digit rolls on its own reel rather than the whole number counting up as one unit, larger numbers (like the 15,230 active-users stat) look visually distinct from a typical linear count-up — the ones digit might cycle through several values while the ten-thousands digit only moves once. This is odometer.js's signature visual character and the reason to reach for it specifically over a generic number-tweening approach.

**Theme CSS handles the visuals**

The CDN's \`odometer-theme-minimal.css\` supplies the actual sliding/rolling visual mechanics (each digit as a small vertically-scrolling strip) — this snippet's own CSS only sets color, size, and weight so the digits match the surrounding dashboard palette. Odometer ships several built-in themes (minimal, car, digital, plaza, slot machine, train station) that can be swapped by simply linking a different theme CSS file.

**Customizing it**

Change \`Odometer.options.duration\` for a faster or slower roll, swap the theme stylesheet for a different visual style, or feed live values from an API instead of hardcoded targets. Pair this with [Dashboard Widget Grid](/ui-snippets/dashboard-widget-grid/) or [Stats Card](/ui-snippets/stats-card/) for a full metrics panel.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Odometer CDN CSS and JS', text: `Include the odometer-theme-minimal.css and odometer.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Four stat tiles and a replay button render, starting at 0.` },
      { title: 'Scroll the tiles into view', text: `Each digit rolls independently up to its target value.` },
      { title: 'Click Roll again', text: `Values reset to 0, then roll back in after a short delay.` },
      { title: 'Change the target values', text: `Edit the targets object in the JS panel with your real numbers.` },
      { title: 'Swap the theme', text: `Link a different odometer theme CSS file for a new visual style.` },
    ] },
    features: [
      { title: 'Independent digit reels', text: `Each digit animates on its own vertical strip, not one linear count.` },
      { title: 'Update-driven API', text: `.update(value) both sets and animates to the new number.` },
      { title: 'Scroll-triggered roll', text: `An IntersectionObserver fires the roll once tiles are visible.` },
      { title: 'Replay button', text: `Resets to 0 and rolls back in on demand.` },
      { title: 'Configurable duration', text: `Odometer.options.duration controls roll speed globally.` },
      { title: 'Swappable themes', text: `Six built-in CSS themes ship with the library.` },
      { title: 'Dashboard-ready tiles', text: `A four-stat grid layout suited to admin panels.` },
      { title: 'One observer, four odometers', text: `A single scroll trigger drives every tile together.` },
    ],
    useCases: [
      { title: 'Admin dashboards', text: `Pair with [Dashboard Widget Grid](/ui-snippets/dashboard-widget-grid/) panels.` },
      { title: 'SaaS metrics pages', text: `Roll in usage stats alongside a [Stats Card](/ui-snippets/stats-card/) layout.` },
      { title: 'Investor / pitch decks (web)', text: `Give key figures a memorable mechanical roll-in.` },
      { title: 'Marketing landing pages', text: `An alternative to [Count Up](/ui-snippets/count-up/) with a distinct visual style.` },
      { title: 'Live event dashboards', text: `Roll updated ticket or attendee counts as data refreshes.` },
      { title: 'Annual report pages', text: `Reveal yearly figures with a physical, tactile feel.` },
      { icon: 'CODE', title: 'Related: Restaurant Order Status Tracker', desc: 'See the [Restaurant Order Status Tracker](/ui-snippets/restaurant-order-status/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does calling .update() trigger the roll animation?', a: `Odometer wraps the target element and, on construction, replaces its content with a set of digit-reel elements. Calling .update(newValue) tells Odometer to compute the difference between the current and new digits and animate each reel to its new resting position — the animation is inherent to how the value change is applied, not a separate method you call afterward.` },
      { q: 'Why use an IntersectionObserver instead of rolling on page load?', a: `Rolling immediately on load risks the animation finishing before a visitor scrolls the stats into view, especially if the tiles sit below the fold. Watching the grid with an IntersectionObserver and rolling once it's roughly 40% visible ensures the visitor actually sees the digits animate, which is the entire point of using odometer.js instead of just rendering the final numbers.` },
      { q: 'Can I feed live or streaming data into the odometers?', a: `Yes — call odometers[id].update(newValue) any time you receive fresh data, for example from a polling interval or a websocket message. Each call re-triggers the roll from the current displayed value to the new one, which is exactly the same mechanism used for the initial scroll-triggered roll-in.` },
      { q: 'How do I change the visual style of the digits?', a: `Odometer ships several themes as separate CSS files (minimal, car, digital, plaza, slot machine, train station) — swap the odometer-theme-minimal.css CDN link for a different theme file's URL and the digit rendering changes without any JavaScript or HTML changes, since the theme purely controls the reel's visual presentation.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Install the odometer.js npm package (or keep the CDN scripts), and construct new Odometer({ el, value }) inside a mount effect (useEffect, onMounted, or ngAfterViewInit) targeting a ref to the digit container element. Call .update() whenever your component's underlying stat data changes, and keep the IntersectionObserver setup in the same effect with a matching cleanup that disconnects it on unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to dig through odometer.js's internals to understand how it animates. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what happens when odometers[id].update(value) is called — how the library computes per-digit differences and animates each reel independently — and why that produces a visually different effect than a single number counting up linearly. The same assistant can help you extend the demo — asking it to feed the odometers from a real API endpoint on an interval instead of static target values, add a currency prefix or percent suffix that doesn't itself roll, or stagger the four tiles' roll-in start times slightly instead of firing all four simultaneously. It's also useful for comparing approaches: ask when odometer.js's mechanical-digit visual is a better fit than a simpler count-up tween like the one used in Count Up. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a row of dashboard stat tiles whose numbers roll like a mechanical odometer using the odometer.js library (both its theme CSS and JS) loaded from a CDN — the rolling digit animation must come from the library itself, not a custom requestAnimationFrame count-up.

Requirements:
- A responsive grid of at least four stat tiles, each containing an element that will become an Odometer instance (starting at 0) and a label describing the metric (for example revenue, active users, deploys, uptime percentage).
- In JavaScript, construct a new Odometer instance for each tile's element with an initial value of 0, and set a shared Odometer.options.duration controlling roll speed for all instances.
- Do not roll the numbers to their real target values immediately on page load. Instead, use an IntersectionObserver watching the stat grid container, and only trigger every odometer's .update(targetValue) call once the grid is meaningfully visible (for example at a 0.4 intersection threshold), then disconnect the observer so it only fires once.
- Add a "replay" button that resets every odometer back to 0 via .update(0) and then, after a short delay, calls .update(targetValue) again so the roll-in animation can be watched repeatedly on demand.
- Style the tiles as dark-themed dashboard cards with the digits colored to match a cohesive palette, relying on the odometer theme CSS for the actual digit-rolling visual mechanics.`,
    },
  },
};

export default odometerStatCounter;
