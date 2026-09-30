const offCanvasMenu = {
  id: 'off-canvas-menu',
  title: 'Off-Canvas Push Menu',
  category: 'navigation',
  html: `<div class="app" id="app">
  <nav class="off-canvas" id="offCanvas" aria-hidden="true">
    <div class="oc-header">
      <span class="oc-brand">Acme Inc.</span>
      <button class="oc-close" onclick="closeMenu()" aria-label="Close menu">&times;</button>
    </div>
    <a href="#" class="oc-link">Home</a>
    <a href="#" class="oc-link">Products</a>
    <a href="#" class="oc-link">Pricing</a>
    <a href="#" class="oc-link">About</a>
    <a href="#" class="oc-link">Contact</a>
  </nav>
  <div class="page-wrap" id="pageWrap">
    <header class="topbar">
      <button class="hamburger" id="hamburger" onclick="toggleMenu()" aria-label="Open menu" aria-expanded="false" aria-controls="offCanvas">
        <span></span><span></span><span></span>
      </button>
      <span class="brand">Acme Inc.</span>
    </header>
    <main class="content">
      <h1>Welcome back</h1>
      <p>This is the page content. When the menu opens, this entire wrapper slides sideways on the X axis instead of a drawer sliding over it — a push-style off-canvas layout.</p>
      <div class="card">Some page content block</div>
      <div class="card">Another content block</div>
    </main>
  </div>
  <div class="scrim" id="scrim" onclick="closeMenu()"></div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; margin: 0; }

.app {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background: #0f172a;
}

.off-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  background: #0f172a;
  color: #e2e8f0;
  padding: 20px 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1;
}

.oc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 16px;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 12px;
}
.oc-brand { font-weight: 700; font-size: 15px; }
.oc-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.oc-link {
  display: block;
  padding: 12px 20px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}
.oc-link:hover { background: #1e293b; color: #fff; }

.page-wrap {
  position: relative;
  background: #f8fafc;
  min-height: 100vh;
  transition: transform 0.3s ease;
  z-index: 2;
}
.page-wrap.shifted { transform: translateX(240px); }

.topbar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.hamburger {
  width: 34px;
  height: 34px;
  border: none;
  background: #f1f5f9;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.hamburger span {
  width: 16px;
  height: 2px;
  background: #1e293b;
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}
.hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.brand { font-weight: 700; font-size: 15px; color: #1e293b; }

.content { padding: 28px 20px; max-width: 480px; }
.content h1 { font-size: 22px; color: #1e293b; margin: 0 0 10px; }
.content p { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0 0 16px; }
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #475569;
}

.scrim {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
}
.scrim.visible { opacity: 1; pointer-events: auto; }`,
  js: `function toggleMenu() {
  const menu = document.getElementById('offCanvas');
  const wrap = document.getElementById('pageWrap');
  const hamburger = document.getElementById('hamburger');
  const scrim = document.getElementById('scrim');
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    menu.classList.add('open');
    menu.style.transform = 'translateX(0)';
    wrap.classList.add('shifted');
    scrim.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  }
}

function closeMenu() {
  const menu = document.getElementById('offCanvas');
  const wrap = document.getElementById('pageWrap');
  const hamburger = document.getElementById('hamburger');
  const scrim = document.getElementById('scrim');
  menu.classList.remove('open');
  menu.style.transform = 'translateX(-100%)';
  wrap.classList.remove('shifted');
  scrim.classList.remove('visible');
  hamburger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}`,

  seo: {
    title: 'Off-Canvas Push Menu — Free HTML CSS JS Sliding Navigation Snippet',
    description: 'A push-style off-canvas menu that slides the entire page sideways to reveal a full-height side nav, built with a single CSS transform. Copy-paste or export to React & Tailwind.',
    about: {
      title: 'Off-Canvas Push Menu — HTML, CSS & JavaScript Sliding Page Navigation',
      description: `Most mobile navigation drawers are overlays: a panel slides in on top of the page while the page itself stays put. A push-style off-canvas menu is different — the entire visible page shifts sideways on the X axis to reveal a hidden sidebar underneath it. It's the pattern used by older Facebook and many native-feeling mobile web apps because it makes the menu feel like a physical layer beneath the content rather than a modal floating above it.

This snippet builds that effect with **plain HTML, CSS, and vanilla JavaScript**. There are three sibling elements inside \`.app\`: the \`.off-canvas\` sidebar positioned absolutely at the left edge, the \`.page-wrap\` that contains the topbar and all page content, and a \`.scrim\` overlay used only to catch outside clicks. No layout library, no drawer component, no npm package.

**How the push effect works**

The trick is that \`.off-canvas\` starts at \`transform: translateX(-100%)\` — fully hidden off the left edge of the viewport — while \`.page-wrap\` sits on top of it at \`transform: translateX(0)\`. When the menu opens, two things happen at once: the off-canvas panel animates to \`translateX(0)\` to slide into view, and \`.page-wrap\` gets a \`.shifted\` class that animates it to \`transform: translateX(240px)\` — the exact width of the sidebar. Because both elements share the same 0.3s ease transition, the page appears to be *pushed* to the right by the menu sliding in underneath it, rather than the menu sliding on top of the page. The parent \`.app\` has \`overflow-x: hidden\` so the page-wrap's rightward shift never creates a horizontal scrollbar.

**How the hamburger-to-X animation works**

The hamburger icon is three \`<span>\` bars inside a button. When \`aria-expanded="true"\` is set on the button, three sibling selectors kick in: the top bar translates down 7px and rotates 45deg, the middle bar fades to \`opacity: 0\`, and the bottom bar translates up 7px and rotates -45deg. Together the two remaining bars form an X. Driving this off the \`aria-expanded\` attribute rather than a separate class means the visual state and the accessibility state can never drift out of sync.

**Closing the menu**

Three things close the menu: clicking the close button inside the panel, clicking the semi-transparent scrim that covers the page while the menu is open, or clicking the hamburger again. All three call the same \`closeMenu()\` function, which resets the transforms, removes the \`.shifted\` and \`.visible\` classes, and flips \`aria-expanded\` and \`aria-hidden\` back.

**Changing the sidebar width**

The sidebar width is set in exactly two places that must match: \`.off-canvas { width: 240px }\` and \`.page-wrap.shifted { transform: translateX(240px) }\`. Change both values together — if they diverge, the page will either overshoot the sidebar's edge or leave a gap.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Off-Canvas Push Menu" in the sidebar Library tab to load the HTML, CSS, and JS panels and see the closed state in the preview.' },
        { title: 'Open the menu', text: 'Click the hamburger icon in the preview. Watch the page content shift right as the dark sidebar slides in from underneath it, and the hamburger morph into an X.' },
        { title: 'Close it three ways', text: 'Click the X inside the sidebar, click the dimmed scrim area, or click the hamburger again — all three should close the menu identically.' },
        { title: 'Resize the sidebar', text: 'In the CSS panel, change both the width on .off-canvas and the translateX value on .page-wrap.shifted to the same new value, then reopen the menu to confirm the page shifts exactly that far.' },
        { title: 'Add or edit links', text: 'In the HTML panel, add more .oc-link anchors inside the nav — the flex layout and hover states apply automatically to any number of links.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for a React + Tailwind version. "Copy all" copies everything to the clipboard.' },
      ],
    },
    features: [
      'True push effect — the whole page shifts via transform, the menu is not an overlay drawer',
      'Single shared 0.3s transition keeps the sidebar and page perfectly in sync while animating',
      'Hamburger-to-X animation driven by the aria-expanded attribute, not a separate class',
      'Scrim overlay catches outside clicks to close the menu without extra event listener setup',
      'overflow-x: hidden on the app wrapper prevents any horizontal scrollbar during the shift',
      'aria-hidden and aria-expanded toggled in JS keep assistive tech in sync with the visual state',
      'Sidebar width is controlled from two matching CSS values — easy to resize consistently',
      'Any number of nav links can be added with no JS or layout changes required',
      'Works with three independent close triggers: close button, scrim click, and hamburger toggle',
      'No framework, no drawer library, no build step required',
    ],
    useCases: [
      { icon: 'NAV', title: 'Mobile-first app navigation', desc: 'Use the push menu as the primary navigation for a mobile web app where a floating overlay drawer would feel disconnected from the page underneath it.' },
      { icon: 'LEARN', title: 'Learn the transform-based push technique', desc: 'Study how two sibling elements animate in lockstep with matching transform values and a shared transition to produce the illusion of one panel pushing another.' },
      { icon: 'FLOW', title: 'Prototype a native-feeling web app shell', desc: 'Drop this into a prototype where you want the navigation to feel like a physical layer of the interface rather than a modal floating above the content.' },
      { icon: 'DESIGN', title: 'Match your brand palette', desc: 'Restyle the dark sidebar and topbar colors to your brand, then save the customized version under its own name for reuse across projects.' },
      { icon: 'ACCESS', title: 'Practice accessible disclosure patterns', desc: 'The aria-expanded and aria-hidden wiring here is a good reference for building your own accessible toggle-based disclosure widgets elsewhere on a site.' },
      { icon: 'CODE', title: 'Convert to a React component', desc: 'Use the JSX export as a base — replace the toggleMenu/closeMenu functions with a single isOpen state variable and derive both the sidebar and page-wrap classes from it.' },
      { icon: 'CODE', title: 'Related: Radial Right-Click Menu', desc: 'See the [Radial Right-Click Menu](/ui-snippets/radial-right-click-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is a push-style off-canvas menu?', a: 'It is a navigation pattern where opening the menu shifts the entire visible page sideways to reveal a hidden sidebar underneath it, instead of sliding a drawer on top of the page. Both the sidebar and the page move using CSS transforms so they appear physically connected.' },
      { q: 'How is this different from a normal slide-in drawer?', a: 'A normal drawer is an overlay: it slides in above the page using a higher z-index while the page stays fixed in place and is often dimmed with a scrim. Here, the page itself moves via transform: translateX, so the menu feels like it lives beneath the content and pushes it aside rather than covering it.' },
      { q: 'How do I change the sidebar width?', a: 'Update the width value on .off-canvas and the translateX distance on .page-wrap.shifted to the same new number — for example 280px in both places. They must match exactly or the page will either overshoot the sidebar edge or leave a visible gap.' },
      { q: 'Why does the page not get a horizontal scrollbar when it shifts?', a: 'The outer .app container has overflow-x: hidden, which clips anything that extends past the viewport width during the transform animation, including the momentary overhang while the page-wrap is sliding.' },
      { q: 'How does the hamburger turn into an X?', a: 'The three bars are span elements targeted with nth-child selectors that key off the button\'s aria-expanded attribute. When it is true, the top and bottom bars rotate 45 and -45 degrees and translate toward the center, and the middle bar fades out, forming an X shape purely with CSS transitions.' },
      { q: 'Can I open the menu from the right side instead of the left?', a: 'Yes. Move .off-canvas to right: 0 instead of left: 0, change its initial transform to translateX(100%), and change .page-wrap.shifted to translateX(-240px) so the page shifts left instead of right.' },
      { q: 'Does this work well on desktop, or only mobile?', a: 'It works at any viewport width, but the push effect is most natural on narrower screens where a permanent sidebar would not fit. On wide desktop layouts you may prefer a permanently visible sidebar instead of a toggled one.' },
      { q: 'Can I add nested submenus inside the sidebar?', a: 'Yes. Add a details/summary element or a small accordion pattern in place of an .oc-link anchor. The sidebar\'s fixed width and vertical layout accommodate nested content as long as you manage its own expand/collapse state separately from the outer menu.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why the sidebar's translateX(-100%) and the page-wrap's translateX(240px) have to be driven by the same transition duration for the push illusion to hold together — and what visibly breaks if only one of the two elements animates. It's also a good snippet to hand over when you want to extend the pattern safely: ask it to add a right-edge variant, wire in swipe-to-open touch gestures, or convert the toggle/close functions into a single boolean state so the component ports cleanly to React or Vue. Because the accessibility wiring (aria-expanded, aria-hidden) is intentionally minimal here, it's also worth asking the assistant to check whether focus is being trapped correctly inside the open menu and to suggest the missing keyboard handling (Escape to close, focus returning to the hamburger) before shipping it to production.`,
      prompt: `Build a "push-style" off-canvas navigation menu in plain HTML, CSS, and JavaScript — no framework, no drawer library.

Requirements:
- Three sibling elements inside one relatively positioned, overflow-x:hidden wrapper: a fixed-width sidebar panel positioned absolutely off-screen to the left via transform: translateX(-100%), a page-wrap div containing a topbar and page content sitting on top of it, and a full-screen scrim overlay for outside clicks.
- Opening the menu must animate the sidebar to translateX(0) AND the page-wrap to translateX(<sidebar-width>) at the same time, using the same transition duration on both elements, so the page visibly gets pushed aside by the sidebar sliding in underneath it — this must NOT look like an overlay drawer sliding on top of a static page.
- A hamburger button with three span bars that morphs into an X purely via CSS, driven off the button's own aria-expanded attribute (not a separate class) — top and bottom bars rotate and converge, the middle bar fades out.
- Three independent ways to close the menu that all call the same close function: a close button inside the sidebar, clicking the scrim, and clicking the hamburger again.
- Keep aria-hidden on the sidebar and aria-expanded on the hamburger in sync with the open/closed state at all times.
- The sidebar width must be controlled by exactly two coordinated values (the sidebar's own width and the page-wrap's shifted translateX distance) so resizing the menu only requires updating both to match.`,
    },
  },
};

export default offCanvasMenu;
