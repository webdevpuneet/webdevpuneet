const glassCard = {
    id: 'glass-card',
    title: 'Glass Card',
    category: 'cards',
    html: `<div class="scene">
  <div class="card">
    <div class="icon">✦</div>
    <h3>Glassmorphism</h3>
    <p>A frosted glass aesthetic using backdrop-filter and semi-transparent backgrounds.</p>
    <a href="#" class="link">Learn more →</a>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }

.scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.scene::before, .scene::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  opacity: 0.35;
}
.scene::before { width: 280px; height: 280px; background: #a78bfa; top: -60px; right: -60px; }
.scene::after  { width: 200px; height: 200px; background: #f472b6; bottom: -40px; left: -40px; }

.card {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 32px 28px;
  width: 280px;
  color: #fff;
  position: relative;
  z-index: 1;
}

.icon {
  font-size: 28px;
  margin-bottom: 16px;
}

h3 { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
p { font-size: 14px; line-height: 1.65; opacity: 0.85; margin-bottom: 20px; }

.link {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  padding-bottom: 2px;
  transition: border-color 0.15s;
}
.link:hover { border-color: #fff; }`,
    js: '',

  seo: {
    title: 'Glassmorphism Card — Free HTML CSS backdrop-filter Snippet',
    description: 'Frosted glass card with backdrop-filter blur, rgba tint and border, Safari prefix included. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Glassmorphism Card — CSS Frosted Glass Effect with backdrop-filter',
      description: `Glassmorphism is a design trend that simulates frosted or etched glass — a card that appears translucent, blurring and tinting the colourful content visible through it. The style became mainstream around 2020 with Apple's macOS Big Sur and has since spread across fintech apps, crypto dashboards, SaaS landing pages, and design tools — see the [glassmorphism login](/ui-snippets/glassmorphism-login/) for a form example, or the [neumorphism](/ui-snippets/neumorphism-card/) and [claymorphism](/ui-snippets/claymorphism-card/) card trends. It communicates a premium, modern aesthetic with minimal code.

This snippet gives you a complete glassmorphism card in **plain HTML and CSS — no JavaScript required**. The card sits over a purple-to-violet gradient scene with two decorative colour blobs, demonstrating exactly how the effect looks in production.

**Why four CSS properties are required**

Glassmorphism is not a single CSS property — it needs four working together.

First: \`backdrop-filter: blur(16px)\` blurs everything rendered directly behind the element in the browser's compositor. This is the defining property. Without it, the card is just a transparent box with no visual depth.

Second: \`background: rgba(255,255,255,0.15)\` gives the card a 15% white fill. This is the balance point — if the background is fully opaque, the blur is invisible because no content shows through. If it is 0%, the card disappears entirely. Values between 10% and 25% produce the best glass effect over most backgrounds.

Third: \`border: 1px solid rgba(255,255,255,0.3)\` adds a subtle semi-transparent white border. This simulates the way light catches the edge of real glass — a thin bright line around the perimeter that gives the card physical presence.

Fourth: \`border-radius: 20px\` rounds the corners, which is stylistically expected in glassmorphism designs and softens the contrast between the card and its background.

**Why the background scene matters**

\`backdrop-filter\` blurs what is rendered directly behind the element. If the background is a solid colour, blurring it produces that same solid colour — no visible effect. Glassmorphism only works over content with visual variety: gradients, photographs, particle effects, or animated orbs. This snippet provides a gradient scene with two colour blobs via \`::before\` and \`::after\` pseudo-elements on \`.scene\` to demonstrate the full effect. When using in your project, place the card over a hero image, gradient section, or background animation.

**Safari and the -webkit- prefix**

\`backdrop-filter\` requires the \`-webkit-backdrop-filter\` prefix in older Safari versions. This snippet includes both declarations:
\`backdrop-filter: blur(16px);\` and \`-webkit-backdrop-filter: blur(16px);\` — always include both for maximum compatibility.

**Creating a dark glassmorphism variant**

To create a dark glass effect (common in dark-themed dashboards), change \`background: rgba(255,255,255,0.15)\` to \`background: rgba(0,0,0,0.25)\` and \`border: 1px solid rgba(255,255,255,0.3)\` to \`rgba(255,255,255,0.1)\`. Adjust text colour to white. The blur remains the same — only the tint changes.

**Using glassmorphism on a navigation bar**

Apply the same properties to a \`position: fixed\` nav element. As users scroll, the page content blurs beneath the header, creating a live frosted glass effect. The hamburger nav snippet in this library already uses this technique.

**Adjusting blur strength and opacity**

For a subtle effect use \`blur(8px)\` with \`rgba(255,255,255,0.1)\`. For a heavy frosted look use \`blur(24px)\` with \`rgba(255,255,255,0.2)\`. High blur values can impact performance on mobile — test at the 375px preview before shipping.

**Saving your customised version**

After editing, click **"Save as"** in the editor header, type a name, and press Enter. Saves to IndexedDB and appears in the **Saved** tab.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Load the snippet',
          text: 'Click "Glass Card" in the sidebar. The preview shows the card over a purple gradient with colour blobs — the blur and transparency create the frosted glass appearance.',
        },
        {
          title: 'Edit the card content',
          text: 'In the HTML panel, change the icon emoji, h3 title, p description, and link text to your own content.',
        },
        {
          title: 'Adjust blur and opacity',
          text: 'In the CSS panel, change 16px in backdrop-filter: blur(16px) for blur strength, and 0.15 in rgba(255,255,255,0.15) for card opacity. Preview updates live.',
        },
        {
          title: 'Change the background gradient',
          text: 'Update the linear-gradient values on .scene to match your project colours. Or replace the entire .scene background with a CSS image URL.',
        },
        {
          title: 'Extract just the card',
          text: 'Copy only the .card HTML and CSS to use in your project. Remove the .scene and blob pseudo-element styles and place the card over your own background.',
        },
        {
          title: 'Export in your format',
          text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind CSS version.',
        },
      ],
    },
    features: [
      'backdrop-filter: blur(16px) — the core glassmorphism property that blurs content behind the card',
      '-webkit-backdrop-filter prefix included for Safari compatibility',
      'rgba(255,255,255,0.15) semi-transparent fill — balanced for maximum glass effect',
      'rgba(255,255,255,0.3) border that simulates light catching glass edges',
      'Gradient scene with two decorative colour blobs via ::before and ::after pseudo-elements',
      'z-index layering so the card sits above the blob decorations',
      'Graceful degradation — transparent background and border remain without backdrop-filter',
      'Pure HTML and CSS — no JavaScript required',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      {
        icon: 'DESIGN',
        title: 'Hero sections and landing pages',
        desc: 'A glassmorphic card over a gradient hero creates an immediate premium impression. Common in fintech, crypto, and SaaS products targeting a modern aesthetic.',
      },
      {
        icon: 'SAFE',
        title: 'Login and authentication overlays',
        desc: 'Auth forms with a glass card look distinct and modern. Place over a gradient or blurred background image for a polished login experience.',
      },
      {
        icon: 'LEARN',
        title: 'Learn backdrop-filter and rgba layering',
        desc: 'Edit the blur value, opacity, and background colour in the CSS panel to understand how each property contributes to the glass effect.',
      },
      {
        icon: 'APP',
        title: 'Dashboard widgets on gradient backgrounds',
        desc: 'Stats and metric cards placed over colourful backgrounds in analytics dashboards. The blur adds depth without requiring custom imagery.',
      },
      {
        icon: 'NAV',
        title: 'Frosted glass navigation bar',
        desc: 'Apply the same backdrop-filter and rgba background to a fixed nav element. The Hamburger Nav snippet already uses this technique — combine both for a complete header.',
      },
      {
        icon: 'MOBILE',
        title: 'Mobile app-style UI on the web',
        desc: 'Glassmorphism is the defining aesthetic of modern iOS and Android UI. Use it in PWAs or mobile web views to match the native platform feel users expect.',
      },
      { icon: 'CODE', title: 'Related: Product Bundle Builder', desc: 'See the [Product Bundle Builder](/ui-snippets/product-bundle-builder/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'What is glassmorphism in CSS?',
        a: 'Glassmorphism is a UI style that simulates frosted glass using four CSS properties together: backdrop-filter: blur() to blur content behind the element, a semi-transparent rgba background, a subtle rgba border, and border-radius for rounded corners. It requires a colourful or varied background to be visually effective.',
      },
      {
        q: 'Why does the blur effect not show on a solid background?',
        a: 'backdrop-filter blurs what is rendered directly behind the element. Blurring a solid colour produces that same solid colour — there is nothing to blur. The effect is only visible over content with visual variety: gradients, photos, colour blobs, or animations. Always place a glass card over a colourful or varied background.',
      },
      {
        q: 'What is the browser support for backdrop-filter?',
        a: 'backdrop-filter is supported in Chrome 76+, Safari 9+ (with -webkit- prefix), Edge 79+, and Firefox 103+. This snippet includes both -webkit-backdrop-filter and backdrop-filter declarations for maximum compatibility. Without support, the card shows as a semi-transparent box with border — readable but without the blur.',
      },
      {
        q: 'How do I adjust the blur strength and transparency?',
        a: 'Change the pixel value in backdrop-filter: blur(16px) — 8px is subtle, 24px is heavy. Change the alpha in rgba(255,255,255,0.15) — 0.08 to 0.1 is very transparent, 0.3 to 0.4 is more opaque. High blur values can affect rendering performance on mobile, so test at the 375px preview.',
      },
      {
        q: 'How do I create a dark glassmorphism variant?',
        a: 'Change background: rgba(255,255,255,0.15) to rgba(0,0,0,0.25) for a dark tint instead of white. Change the border to rgba(255,255,255,0.1). Set text colour to white. The blur effect works the same way — only the fill colour changes.',
      },
      {
        q: 'Can I apply glassmorphism to a navigation bar?',
        a: 'Yes. Add backdrop-filter: blur(12px), -webkit-backdrop-filter: blur(12px), and background: rgba(255,255,255,0.1) to a position: fixed nav element. As users scroll, the page content blurs behind the header. The Hamburger Nav snippet in this library already uses this technique.',
      },
      {
        q: 'Can I use this glass card in React or Vue?',
        a: 'Yes. Click "JSX" to download a React component or "Tailwind" for a React + Tailwind version. Note that Tailwind uses backdrop-blur-lg for backdrop-filter: blur(16px) and bg-white/15 for the rgba background. The -webkit- prefix is handled automatically by PostCSS autoprefixer in most Tailwind setups.',
      },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why a tweak looks wrong, paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why backdrop-filter produces nothing visible over a flat background but works over the two blurred color blobs behind this card, and how the balance between the blur radius and the rgba alpha value on the card's background changes the strength of the glass illusion. It can also help you optimize the effect, for example weighing whether a heavy blur value is worth the compositor cost on low-end mobile devices versus a lighter, still-convincing setting. For extending it, ask for a dark-tinted variant, a version whose blobs animate slowly behind the card, or a reusable class that applies the same glass treatment to a fixed navigation bar. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a glassmorphism card in plain HTML and CSS only, using no JavaScript, that creates a genuine frosted-glass effect rather than a faked translucent panel.

Requirements:
- A full-height scene container with a diagonal linear-gradient background and two large, softly colored circular blobs positioned with the ::before and ::after pseudo-elements so there is visually rich content for the glass to blur.
- A card element layered above the blobs using position: relative and a higher z-index, styled with background: rgba(255,255,255, an alpha between 0.1 and 0.25), backdrop-filter: blur at roughly 16px, both the unprefixed backdrop-filter and the -webkit-backdrop-filter declaration for Safari, a semi-transparent 1px border around 0.3 alpha white, and a rounded border-radius.
- Confirm the effect is genuinely dependent on the blurred content behind it: describe or comment why the same card over a flat solid color would show no visible frost.
- Include card content (an icon, heading, paragraph, and a text link) styled in white with reduced opacity on the body copy so it reads clearly against the blurred background.
- The card must degrade gracefully in browsers without backdrop-filter support, remaining a readable semi-transparent bordered box.`,
    },
  },
};

export default glassCard;
