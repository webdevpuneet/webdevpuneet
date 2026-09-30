const hamburgerNav = {
    id: 'hamburger-nav',
    title: 'Hamburger Nav',
    category: 'navigation',
    html: `<nav class="nav">
  <div class="brand">Brand</div>
  <button class="burger" id="burger" onclick="document.getElementById('menu').classList.toggle('open');this.classList.toggle('active')">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ul class="menu" id="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Work</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<div class="hero">
  <div class="aurora">
    <div class="orb o1"></div>
    <div class="orb o2"></div>
    <div class="orb o3"></div>
  </div>
  <div class="hero-content">
    <span class="badge">✦ 65+ snippets ready to use</span>
    <h1>Copy-paste <span class="grad">UI components</span><br>that just work</h1>
    <p>Navigation, cards, buttons, forms, layouts, and animations — all in plain HTML, CSS & vanilla JS.</p>
    <div class="cats">
      <span class="cat" style="--c:#f97316">Navigation</span>
      <span class="cat" style="--c:#6366f1">Cards</span>
      <span class="cat" style="--c:#ec4899">Buttons</span>
      <span class="cat" style="--c:#10b981">Forms</span>
      <span class="cat" style="--c:#0ea5e9">Layouts</span>
      <span class="cat" style="--c:#8b5cf6">Animations</span>
    </div>
    <div class="cards">
      <div class="card">⌨️<span>Command Palette</span></div>
      <div class="card">🎭<span>3D Card Tilt</span></div>
      <div class="card">🧲<span>Magnetic Button</span></div>
      <div class="card">🌈<span>Aurora Background</span></div>
      <div class="card">🔦<span>Spotlight Effect</span></div>
      <div class="card">🎵<span>Music Player</span></div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; }

/* ── Nav ── */
.nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; height: 60px;
  background: rgba(15,23,42,0.85); backdrop-filter: blur(12px);
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.brand { font-size: 18px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.5px; }
.menu { display: flex; gap: 4px; list-style: none; }
.menu a { display: block; padding: 6px 14px; color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px; transition: background 0.15s, color 0.15s; }
.menu a:hover { background: #334155; color: #f1f5f9; }
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
.burger span { display: block; width: 22px; height: 2px; background: #94a3b8; border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
.burger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.active span:nth-child(2) { opacity: 0; }
.burger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
@media (max-width: 600px) {
  .burger { display: flex; }
  .menu { display: none; flex-direction: column; position: fixed; top: 60px; left: 0; right: 0; background: #1e293b; padding: 8px; border-top: 1px solid #334155; gap: 2px; }
  .menu.open { display: flex; }
}

/* ── Hero ── */
.hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 80px 24px 40px; position: relative; overflow: hidden; }
.aurora { position: absolute; inset: 0; filter: blur(80px); opacity: 0.35; pointer-events: none; }
.orb { position: absolute; border-radius: 50%; mix-blend-mode: screen; }
.o1 { width: 400px; height: 400px; background: radial-gradient(circle,#6366f1,transparent 70%); top: -80px; left: -80px; animation: drift 14s ease infinite; }
.o2 { width: 300px; height: 300px; background: radial-gradient(circle,#ec4899,transparent 70%); bottom: -60px; right: -60px; animation: drift 18s ease infinite reverse; }
.o3 { width: 260px; height: 260px; background: radial-gradient(circle,#0ea5e9,transparent 70%); top: 50%; left: 55%; animation: drift 22s ease infinite; }
@keyframes drift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(40px,-30px)} 66%{transform:translate(-30px,40px)} }

.hero-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 22px; text-align: center; max-width: 520px; }

.badge { font-size: 11px; font-weight: 700; color: #a78bfa; background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.25); padding: 5px 14px; border-radius: 20px; letter-spacing: 0.3px; }

h1 { font-size: clamp(26px,5vw,44px); font-weight: 800; color: #f1f5f9; line-height: 1.15; letter-spacing: -0.5px; }
.grad { background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

p { font-size: 14px; color: #475569; line-height: 1.7; max-width: 400px; }

.cats { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.cat { padding: 5px 13px; border-radius: 7px; background: #1e293b; border: 1px solid #334155; font-size: 11px; font-weight: 600; color: var(--c); }

.cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; width: 100%; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; gap: 7px; font-size: 20px; transition: border-color 0.15s; cursor: default; }
.card:hover { border-color: #6366f1; }
.card span { font-size: 11px; font-weight: 600; color: #64748b; }`,
    js: '',

  seo: {
    title: 'Hamburger Menu — Free HTML CSS Animated Nav Snippet',
    description: 'Animated hamburger nav — three lines morph to an X and a full-width mobile menu slides open over a blurred header. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hamburger Navigation Menu — HTML & CSS with Animated Toggle',
      description: `A hamburger navigation menu is the three-line (☰) icon that hides and reveals a site's navigation links on small screens. It is one of the most searched-for UI patterns in web development — every mobile website, app, portfolio, and SaaS product eventually needs one (or a [bottom nav](/ui-snippets/bottom-nav/) bar instead).

This snippet gives you a complete, production-ready hamburger nav in **plain HTML and CSS**. There is no JavaScript library, no framework, no npm install. Paste it into any project — static site, WordPress theme, HTML template, or web app — and it works immediately.

**What this hamburger nav includes**

The component has three parts: a fixed top bar with a brand name and hamburger button, a horizontal desktop menu, and a vertical mobile dropdown that slides open when the icon is tapped. The header uses \`backdrop-filter: blur(12px)\` over a semi-transparent dark background, giving it a frosted-glass effect similar to macOS navigation bars.

The hamburger icon is built from three \`<span>\` elements styled as horizontal bars (the standalone [animated hamburger](/ui-snippets/animated-hamburger/) covers just this icon morph). When the \`.active\` class is toggled, the first bar rotates 45° and shifts down, the middle bar fades out with \`opacity: 0\`, and the third bar rotates −45° and shifts up — together forming a clean X. All three transforms happen simultaneously with a 300ms CSS \`transition\`, so the animation is smooth and requires zero JavaScript beyond a single \`classList.toggle\` call inline in the HTML.

**How the responsive behaviour works**

On screens wider than 600px the hamburger button is hidden (\`display: none\`) and the menu links sit in a horizontal flex row in the header. Below 600px the horizontal menu is hidden and the hamburger button appears. Tapping the button adds the \`.open\` class to the \`<ul>\`, switching it from \`display: none\` to \`display: flex\` with a vertical column layout — creating a full-width dropdown below the header bar. For an off-canvas panel instead, swap in the [side drawer](/ui-snippets/side-drawer/).

To change the breakpoint, find \`@media (max-width: 600px)\` in the CSS panel and update the pixel value to match your project's grid system.

**Customising colours and fonts**

Open the CSS panel and update the colour values directly. The nav background is \`rgba(15,23,42,0.85)\` — change the alpha to make it more or less transparent. The link colour is \`#94a3b8\`; hover state switches to \`#f1f5f9\` on a \`#334155\` background pill. Font size is \`14px\` with \`font-weight: 500\`. All of these are easily updated to match your design tokens or brand palette. Every edit refreshes the preview in real time — no save or run step needed.

**Fixed positioning and z-index**

The nav uses \`position: fixed\` with \`top: 0\`, \`left: 0\`, \`right: 0\` and \`z-index: 100\`. This keeps it pinned to the top of the viewport as the user scrolls. If your layout already has a fixed element at a higher z-index, increase the nav's z-index value accordingly. The page content should have \`padding-top: 60px\` (the nav height) to prevent overlap — add that to your \`body\` or main wrapper CSS.

**Accessibility notes**

The hamburger \`<button>\` element is keyboard-focusable by default. For a production site, add \`aria-expanded\` and \`aria-controls\` attributes to the button and an \`id\` on the menu \`<ul>\` so screen readers can announce the open/closed state. You can also add \`aria-label="Toggle navigation"\` to the button so it has a meaningful accessible name. These additions take under two minutes and significantly improve usability for assistive technology users.

**Saving your customised version**

After editing the snippet to match your project, click **"Save as"** in the editor header, type a name like "My Site Nav", and press Enter. The version saves to your browser's IndexedDB and appears in the **Saved** tab in the sidebar. Connect GitHub Gist via the GitHub button in the header to back it up and restore it on any device.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Open the snippet',
          text: 'Click "Hamburger Nav" in the sidebar Library tab. The HTML and CSS panels load instantly and the preview shows the nav at desktop width.',
        },
        {
          title: 'Test the mobile toggle',
          text: 'Click the phone icon (375px) in the preview header. The hamburger button appears. Click it in the preview to see the X animation and dropdown open.',
        },
        {
          title: 'Edit colours and breakpoint',
          text: 'In the CSS panel, update the background colour, link colours, and the max-width: 600px media query value to match your project. The preview refreshes as you type.',
        },
        {
          title: 'Update the nav links',
          text: 'In the HTML panel, change the <li><a href="#">…</a></li> items to your actual page names and URLs. Add or remove list items as needed.',
        },
        {
          title: 'Copy or download',
          text: 'Click "Copy all" in the header to copy HTML + CSS as a single block for pasting into your project, or "Download" to save a standalone HTML file.',
        },
        {
          title: 'Save your version',
          text: 'Click "Save as", type a name, and press Enter. Your edited nav saves to IndexedDB and appears in the Saved tab for future sessions.',
        },
      ],
    },
    features: [
      'Three-line hamburger icon animates to an X on click — pure CSS transforms',
      'Fixed header with backdrop-filter: blur(12px) frosted-glass effect',
      'Horizontal desktop menu collapses to full-width vertical dropdown on mobile',
      'Responsive breakpoint at 600px — change one CSS value to adjust',
      'No JavaScript library — one inline classList.toggle call does it all',
      'Live split-pane editor — preview updates as you type, no run button',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Reset per panel, Copy all, and Download as standalone HTML file',
      'Save custom versions to IndexedDB with a name via "Save as"',
      'GitHub Gist sync — restore saved snippets on any device',
      'Works in any project — no framework, no npm, no build step',
    ],
    useCases: [
      {
        icon: 'NAV',
        title: 'Drop into any HTML project',
        desc: 'Copy the code and paste it at the top of your HTML file. No dependencies, no configuration — the nav works immediately in any browser.',
      },
      {
        icon: 'LEARN',
        title: 'Learn CSS transforms and transitions',
        desc: 'The X animation uses translateY and rotate on :nth-child selectors. Edit the values and watch the preview to understand exactly how each transform works.',
      },
      {
        icon: 'MOBILE',
        title: 'Prototype a mobile layout',
        desc: 'Use the snippet as a starting point for any mobile-first prototype. Switch to the 375px preview, test the toggle, and iterate on the layout in minutes.',
      },
      {
        icon: 'DESIGN',
        title: 'Match your brand',
        desc: 'Update the background colour, blur amount, link colours, font, and spacing in the CSS panel to align the nav with your design system. Save under a custom name.',
      },
      {
        icon: 'ACCESS',
        title: 'Add accessibility attributes',
        desc: 'Practice adding aria-expanded, aria-controls, and aria-label to the burger button. Edit the HTML in the panel and verify the structure with screen reader tools.',
      },
      {
        icon: 'CODE',
        title: 'Migrate to React or Vue',
        desc: 'Use the JSX or Tailwind export to get a framework-ready starting point. Replace the inline onclick with a useState toggle and the CSS with Tailwind utility classes.',
      },
      { icon: 'CODE', title: 'Related: Liquid Glass Navbar', desc: 'See the [Liquid Glass Navbar](/ui-snippets/liquid-glass-navbar/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'What is a hamburger navigation menu?',
        a: 'A hamburger navigation menu is a UI pattern where the site\'s navigation links are hidden behind a three-line (☰) icon on small screens. Tapping the icon reveals the links in a dropdown or slide-in panel. It saves screen space on mobile without removing navigation from the page.',
      },
      {
        q: 'Does this hamburger nav use JavaScript?',
        a: 'Barely — just one classList.toggle call inline in the HTML button\'s onclick attribute. There is no external JS file, no library, and no framework. If you want zero JavaScript, you can replicate the toggle using a hidden checkbox and the CSS :checked selector instead.',
      },
      {
        q: 'How does the hamburger-to-X animation work?',
        a: 'The three span bars inside the button each have a CSS transition on transform and opacity. When the .active class is added, the first span rotates 45° and moves down 7px, the middle span fades to opacity: 0, and the third span rotates −45° and moves up 7px — forming an X shape. Removing .active reverses all three transitions.',
      },
      {
        q: 'How do I change the mobile breakpoint?',
        a: 'Find @media (max-width: 600px) in the CSS panel and change 600px to your preferred breakpoint — for example 768px for tablet or 480px for small phones only. The burger button and dropdown are hidden on wider screens via the matching display: none rules outside the media query.',
      },
      {
        q: 'How do I add more nav links?',
        a: 'In the HTML panel, add a new list item inside the ul.menu element — for example: li > a href="/your-page/" > Page Name. Each item inherits the existing link styles automatically. Remove items the same way — just delete the li line.',
      },
      {
        q: 'What is the backdrop-filter blur on the header?',
        a: 'backdrop-filter: blur(12px) blurs the content behind the nav bar, creating a frosted-glass effect. It requires the nav background to have an alpha value below 1 — here it\'s rgba(15,23,42,0.85). The effect is supported in all modern browsers. For older browsers, the nav falls back to a solid dark background.',
      },
      {
        q: 'Can I use this in React or Vue?',
        a: 'Yes. The HTML panel shows JSX-ready code via the "React / JSX" block at the bottom of the page. For Vue or Svelte, the HTML and CSS paste directly into a .vue or .svelte component file. Move the inline onclick to a component method and the CSS to a style block.',
      },
      {
        q: 'How do I make this hamburger nav accessible?',
        a: 'Add aria-expanded="false" to the button element and toggle it to "true" when the menu opens. Add aria-controls="menu" to point to the ul with id="menu". Add aria-label="Toggle navigation" so screen readers announce the button\'s purpose. These attributes make the nav fully usable for keyboard and screen reader users.',
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out every selector interaction by hand. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how the three nth-child span selectors combine with the single classList.toggle call to turn the hamburger into an X, or why the mobile menu relies on toggling display between none and flex instead of an animated height or transform. The same assistant is useful for optimizing it — ask whether the inline onclick attribute should move to an addEventListener call for cleaner separation of concerns, and whether the blur-heavy backdrop-filter header could cost paint performance on lower-end devices while scrolling. It's just as useful for extending the nav: ask it to add aria-expanded state syncing for accessibility, animate the dropdown open with a max-height transition instead of a hard display swap, or add a scroll-triggered background opacity change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a responsive hamburger navigation bar in plain HTML and CSS, with at most one line of JavaScript — no framework, no external icon library.

Requirements:
- A fixed-position top nav bar with a brand name on the left and a horizontal list of links on the right, visible above a 600px breakpoint.
- Below 600px, hide the horizontal link list and show a hamburger button built from exactly three stacked span elements styled as horizontal bars via CSS (no image, no icon font).
- Clicking the button must toggle an "active" class on the button and an "open" class on the menu list using nothing more than classList.toggle calls.
- When the button has the active class, use CSS transforms and nth-child selectors so the first bar rotates 45 degrees and translates down to meet the third bar (which rotates -45 degrees and translates up), and the middle bar fades to opacity 0 — forming a clean X, all animated with a shared CSS transition on transform and opacity.
- When the menu has the open class, switch its display from none to a full-width vertical flex column positioned directly below the fixed header, so it reads as a dropdown panel.
- Give the header a translucent dark background with backdrop-filter blur so content scrolling underneath it is visibly frosted.
- Keep the whole toggle mechanism to a single inline classList.toggle call (or an equivalent one-line handler) rather than a larger script file.`,
    },
  },
};

export default hamburgerNav;
