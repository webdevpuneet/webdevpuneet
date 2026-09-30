const browserWindow = {
  id: 'browser-window',
  title: 'Browser Window Mockup',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<div class="bw-stage">
  <div class="bw-window" id="bwWindow">
    <div class="bw-bar">
      <div class="bw-lights"><span class="r"></span><span class="y"></span><span class="g"></span></div>
      <div class="bw-tabs">
        <div class="bw-tab active"><span class="bw-fav"></span>Dashboard<i class="bw-x">&times;</i></div>
        <div class="bw-tab">Docs<i class="bw-x">&times;</i></div>
        <span class="bw-add">+</span>
      </div>
    </div>
    <div class="bw-toolbar">
      <button class="bw-nav" aria-label="Back">&#8249;</button>
      <button class="bw-nav" aria-label="Forward">&#8250;</button>
      <button class="bw-nav" id="bwReload" aria-label="Reload">&#10227;</button>
      <div class="bw-url"><span class="bw-lock"></span><input id="bwUrl" value="https://acme.app/dashboard" spellcheck="false"></div>
      <button class="bw-nav" aria-label="Menu">&#8942;</button>
    </div>
    <div class="bw-content" id="bwContent">
      <div class="bw-hero">
        <span class="bw-eyebrow">Acme Analytics</span>
        <h1>Ship faster with insight</h1>
        <p>Real-time product metrics in one clean place.</p>
        <div class="bw-row"><button class="bw-cta">Get started</button><button class="bw-ghost">Live demo</button></div>
      </div>
      <div class="bw-grid"><span></span><span></span><span></span></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#cbd5e1;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.bw-window{width:100%;max-width:480px;background:#fff;border-radius:13px;overflow:hidden;box-shadow:0 30px 60px -22px rgba(15,23,42,.5);border:1px solid #cbd5e1}
.bw-bar{display:flex;align-items:flex-end;gap:14px;background:#e2e8f0;padding:10px 12px 0}
.bw-lights{display:flex;gap:7px;padding-bottom:9px}
.bw-lights span{width:12px;height:12px;border-radius:50%}
.bw-lights .r{background:#ff5f57}.bw-lights .y{background:#febc2e}.bw-lights .g{background:#28c840}

.bw-tabs{display:flex;align-items:flex-end;gap:5px}
.bw-tab{display:flex;align-items:center;gap:7px;background:#cbd5e1;color:#475569;font-size:12px;font-weight:600;padding:8px 11px;border-radius:9px 9px 0 0;max-width:130px;white-space:nowrap;cursor:pointer}
.bw-tab.active{background:#fff;color:#0f172a}
.bw-fav{width:12px;height:12px;border-radius:3px;background:linear-gradient(135deg,#6366f1,#22d3ee);flex-shrink:0}
.bw-x{font-style:normal;font-size:14px;color:#94a3b8;line-height:1}
.bw-x:hover{color:#ef4444}
.bw-add{font-size:17px;color:#64748b;padding:4px 6px;cursor:pointer;align-self:center}

.bw-toolbar{display:flex;align-items:center;gap:7px;padding:9px 12px;border-bottom:1px solid #e2e8f0}
.bw-nav{border:none;background:transparent;color:#64748b;font-size:16px;cursor:pointer;width:26px;height:26px;border-radius:7px;line-height:1}
.bw-nav:hover{background:#f1f5f9;color:#0f172a}
.bw-url{flex:1;display:flex;align-items:center;gap:7px;background:#f1f5f9;border-radius:8px;padding:0 10px}
.bw-lock{width:9px;height:8px;border:1.5px solid #16a34a;border-radius:2px;position:relative;flex-shrink:0;margin-top:-3px}
.bw-lock::before{content:'';position:absolute;top:-4px;left:1px;width:5px;height:5px;border:1.5px solid #16a34a;border-bottom:none;border-radius:3px 3px 0 0}
.bw-url input{flex:1;border:none;background:transparent;padding:8px 0;font-size:12.5px;color:#334155;font-family:inherit;outline:none}

.bw-content{height:280px;overflow-y:auto;background:linear-gradient(160deg,#eef2ff,#fff 40%)}
.bw-hero{padding:38px 28px 22px;text-align:center}
.bw-eyebrow{font-size:11px;font-weight:800;color:#6366f1;text-transform:uppercase;letter-spacing:.08em}
.bw-hero h1{font-size:27px;font-weight:800;color:#0f172a;margin:8px 0}
.bw-hero p{font-size:14px;color:#64748b;margin-bottom:18px}
.bw-row{display:flex;gap:10px;justify-content:center}
.bw-cta{background:#6366f1;color:#fff;border:none;border-radius:9px;padding:10px 18px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}
.bw-ghost{background:#fff;color:#4338ca;border:1px solid #e2e8f0;border-radius:9px;padding:10px 18px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}
.bw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 28px 28px}
.bw-grid span{height:64px;border-radius:12px;background:#fff;border:1px solid #e2e8f0;box-shadow:0 8px 18px -12px rgba(0,0,0,.25)}

.bw-content.loading{opacity:.4;transition:opacity .1s}
@keyframes bwSpin{to{transform:rotate(360deg)}}
.bw-nav.spin{animation:bwSpin .6s linear}`,

  js: `var reload = document.getElementById('bwReload');
var content = document.getElementById('bwContent');
var urlInput = document.getElementById('bwUrl');

// Reload: spin the icon and briefly dim the page like a real refresh.
reload.addEventListener('click', function () {
  reload.classList.remove('spin'); void reload.offsetWidth; reload.classList.add('spin');
  content.classList.add('loading');
  setTimeout(function () { content.classList.remove('loading'); content.scrollTop = 0; }, 450);
});

// Pressing Enter in the address bar re-triggers the reload animation.
urlInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') { urlInput.blur(); reload.click(); }
});

// Tab close / switch is purely cosmetic here.
document.querySelectorAll('.bw-tab').forEach(function (tab) {
  tab.addEventListener('click', function (e) {
    if (e.target.classList.contains('bw-x')) { e.stopPropagation(); return; }
    document.querySelectorAll('.bw-tab').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
  });
});`,

  seo: {
    title: 'Browser Window Mockup — Free CSS Browser Frame Snippet',
    description: `A pure-CSS browser window mockup with traffic-light buttons, tabs, an address bar with a lock, and a reload animation. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Browser Window Mockup — CSS Browser Chrome Wrapper',
      description: `A browser window mockup wraps a screenshot or live page in realistic browser chrome — traffic-light buttons, tabs, an address bar — for landing pages, documentation, and product shots. This one is pure HTML and CSS with a few interactive touches (a spinning reload, tab switching, an editable URL), in vanilla JavaScript with no dependency, so you can drop any content inside and present it as if it were running in a browser.

**The chrome, built from scratch**

The window is a rounded card with three stacked regions: a tab strip with the macOS-style traffic lights (three colored circles), a toolbar with navigation buttons and the address bar, and the content area. The tabs use \`border-radius\` only on the top corners and a darker inactive background so the active tab appears to merge into the page below — the classic browser-tab look achieved with plain CSS.

**A convincing address bar**

The URL field is a real \`<input>\` inside a pill, preceded by a CSS-drawn padlock: a small bordered box with a \`::before\` pseudo-element forming the shackle, in green to signal HTTPS. The input is editable, and pressing Enter blurs it and triggers the reload animation, mimicking a navigation. It's a believable detail that most static mockups fake with an image.

**Reload that feels real**

Clicking reload restarts a \`bwSpin\` keyframe on the icon (using the \`void offsetWidth\` reflow trick so it replays every click) and adds a \`.loading\` class that briefly dims the content and resets its scroll — a lightweight imitation of a page refresh. Nothing actually navigates, but the motion sells it.

**Cosmetic tabs**

Clicking a tab moves the \`.active\` class, and the close (\`×\`) and add (\`+\`) controls are present for realism; tab clicks ignore the close button via \`stopPropagation\`. You can wire these to real routes if you embed the mockup in an interactive demo.

**Reusing it as a wrapper**

Replace the \`.bw-content\` markup with your own page or a screenshot and the frame becomes a reusable container. Set the \`value\` of the address input to your URL, and keep the chrome as a component so any [hero section](/ui-snippets/hero-section/) or dashboard can be shown "in a browser" on a marketing page or in docs.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A browser window renders with tabs, a toolbar, and a sample page.` },
      { title: 'Edit the URL', text: `Type in the address bar and press Enter to trigger a reload.` },
      { title: 'Click reload', text: `The icon spins and the page briefly dims like a refresh.` },
      { title: 'Switch tabs', text: `Clicking a tab moves the active highlight.` },
      { title: 'Drop in your content', text: `Replace the content area with your page or screenshot.` },
      { title: 'Reuse as a wrapper', text: `Keep the chrome as a component with a content slot.` },
    ] },
    features: [
      { title: 'Pure-CSS chrome', text: `Traffic lights, tabs, and toolbar with no images.` },
      { title: 'Realistic tabs', text: `Top-rounded tabs that merge into the page.` },
      { title: 'Editable address bar', text: `A real input with a CSS padlock icon.` },
      { title: 'Reload animation', text: `Spinning icon plus a dim-and-reset refresh.` },
      { title: 'Enter to navigate', text: `Pressing Enter in the URL re-triggers the reload.` },
      { title: 'Tab switching', text: `Active highlight moves, close button guarded.` },
      { title: 'Content slot', text: `Swap in any page or screenshot.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS for mockups and docs.` },
    ],
    useCases: [
      { title: 'Landing-page screenshots', text: `Frame a [hero section](/ui-snippets/hero-section/) as a live browser shot.` },
      { title: 'Documentation', text: `Show a UI in context beside a [code block](/ui-snippets/code-block/).` },
      { title: 'Product showcases', text: `Present a [dashboard layout](/ui-snippets/dashboard-layout/) in a window.` },
      { title: 'Responsive demos', text: `Pair with a [phone mockup](/ui-snippets/phone-mockup/) for desktop-and-mobile.` },
      { title: 'Portfolio pieces', text: `Display work in a [bento grid](/ui-snippets/bento-grid/) of mockups.` },
      { title: 'Learning CSS chrome', text: `A reference for tabs, address bars, and reload motion.` },
      { icon: 'CODE', title: 'Related: Code Snippet Tabs', desc: 'See the [Code Snippet Tabs](/ui-snippets/code-snippet-tabs/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the browser window an image?', a: `No, it's pure CSS. The traffic-light buttons are three colored circles, the tabs are top-rounded boxes that merge into the page, the address bar is a styled input with a CSS padlock pseudo-element, and the toolbar buttons are HTML characters. Because nothing is an image, it stays crisp and you can recolor or resize any part.` },
      { q: 'Does the address bar actually do anything?', a: `It's a real, editable input. Typing and pressing Enter blurs it and triggers the same reload animation as the reload button, simulating a navigation. It doesn't load a new page — it's a presentational mockup — but you can wire the Enter handler to real routing if you embed it in an interactive demo.` },
      { q: 'How is the reload animation done?', a: `Clicking reload restarts a CSS spin keyframe on the icon using the void offsetWidth reflow trick so it replays on every click, and adds a loading class that briefly lowers the content's opacity and resets its scroll position. The combination reads as a page refresh without any real network activity.` },
      { q: 'How do I put my own page inside it?', a: `Replace the markup inside .bw-content with your page or an <img> screenshot, and set the address input's value to your URL. The chrome is independent of the content, so your page just fills the content area, which scrolls if it's taller than the frame. Keep the window as a reusable wrapper component.` },
      { q: 'How do I use this browser mockup in React, Vue, or Angular?', a: `Make the window a component with a content slot (children, slot, or ng-content) and props for the URL and tab list. The reload spin and loading dim are class toggles you can drive from state. In Tailwind, build the chrome with flex rows, rounded-t utilities for tabs, and small inline SVGs or characters for the controls.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the reflow trick or the padlock pseudo-element by hand to see how this mockup is put together. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the CSS padlock icon is built from a bordered box plus a ::before shackle, and why void reload.offsetWidth is needed before re-adding the spin class on every reload click. The same assistant can help optimize it — asking whether the tab-click listener's stopPropagation guard against the close button could be simplified, or whether the loading dim's setTimeout duration should be tied to how long real content actually takes to swap in. It's also useful for extending the mockup: ask it to make tabs actually swap different content panels, add a working back/forward history stack, or support a dark browser chrome theme. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a pure-CSS "browser window mockup" in plain HTML, CSS, and a small amount of JavaScript for the interactive touches — no images for any part of the chrome.

Requirements:
- A rounded card containing, top to bottom: a tab strip with three colored circular "traffic light" buttons and one or more tab elements styled with only their top corners rounded and a lighter background than the surrounding bar so the active tab visually appears to merge into the content below it; a toolbar row with back/forward/reload icon buttons and an address bar; and a content area below.
- The address bar must be a real, editable text input (not a styled div) preceded by a padlock icon built entirely from CSS shapes (a bordered box plus a pseudo-element forming the shackle) with no image or icon font.
- Clicking the reload button must restart a CSS rotation keyframe animation on its icon every single time it's clicked, even in immediate succession, which requires forcing a synchronous reflow between removing and re-adding the animation class rather than just toggling the class.
- Reloading must also add a temporary class that dims the content area's opacity and resets its scroll position back to the top, removing that class after a short delay to simulate a real page refresh.
- Pressing Enter inside the address bar input must blur the input and programmatically trigger the same reload behavior as clicking the reload button.
- Clicking a tab must move an active-tab highlight to the clicked tab, but clicking the small close (×) control inside a tab must not also trigger the tab-switch behavior — event handling must correctly distinguish the two targets.`,
    },
  },
};

export default browserWindow;
