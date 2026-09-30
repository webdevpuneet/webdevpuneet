const environmentBadge = {
  id: 'environment-badge',
  title: 'Environment Badge',
  category: 'buttons',
  html: `<div class="demo-page">
  <div class="env-badge env-dev">DEV</div>
  <div class="app-mock">
    <h3>Internal Admin Tool</h3>
    <p>This ribbon sits fixed in the corner of every non-production build so nobody mistakes a staging session for live data.</p>
  </div>
</div>
<div class="switcher">
  <button onclick="setEnv('dev')">DEV</button>
  <button onclick="setEnv('staging')">STAGING</button>
  <button onclick="setEnv('prod')">PRODUCTION</button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.demo-page {
  position: relative;
  height: 220px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.app-mock { padding: 24px; }
.app-mock h3 { font-size: 16px; color: #1e293b; margin-bottom: 8px; }
.app-mock p { font-size: 13px; color: #64748b; line-height: 1.6; max-width: 420px; }

.env-badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 36px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #fff;
  transform: translate(29%, -1%) rotate(45deg);
  transform-origin: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 10;
  transition: background 0.2s;
}

.env-dev { background: #f59e0b; }
.env-staging { background: #6366f1; }
.env-prod { background: #ef4444; }

.switcher { display: flex; gap: 8px; }
.switcher button {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  border-radius: 8px;
  cursor: pointer;
}
.switcher button:hover { border-color: #94a3b8; }`,
  js: `function setEnv(env) {
  const badge = document.querySelector('.env-badge');
  badge.classList.remove('env-dev', 'env-staging', 'env-prod');

  const labels = { dev: 'DEV', staging: 'STAGING', prod: 'PRODUCTION' };
  badge.textContent = labels[env];
  badge.classList.add('env-' + env);
}`,

  seo: {
    title: 'Environment Badge — Free HTML CSS JS DEV/STAGING/PROD Ribbon Snippet',
    description: 'A fixed-corner color-coded ribbon badge showing DEV, STAGING, or PRODUCTION, for internal admin tools where mixing up environments is costly. Pure CSS ribbon, no libraries.',
    about: {
      title: 'Environment Badge — HTML & CSS Corner Ribbon for Non-Production Builds',
      description: `Internal tools that talk to real customer data are dangerous to confuse with a staging or dev copy — one wrong click in the wrong environment can send a real email, refund a real order, or delete real rows. This snippet is a small but high-value safety net: a diagonal corner ribbon, color-coded by environment, that's impossible to miss no matter what page of the admin tool you're on.

**How the diagonal ribbon is built**

The badge is a single \`div\` positioned with \`position: absolute; top: 0; right: 0\` inside a \`position: relative\` container (your app shell, in a real integration). Rather than being a straight horizontal bar, it's rotated 45 degrees with \`transform: rotate(45deg)\`, and nudged into place with \`translate(29%, -1%)\` so the rotated rectangle's diagonal spans neatly across the corner rather than floating off it. Generous horizontal padding (\`padding: 5px 36px\`) makes the ribbon wide enough that the rotated shape still fully covers the corner even though its unrotated width looks oversized.

**How the color coding works**

Each environment maps to one modifier class — \`.env-dev\` (amber), \`.env-staging\` (indigo), \`.env-prod\` (red) — each just setting a different \`background\`. The demo's \`setEnv(env)\` function removes all three classes and re-adds the correct one, and swaps the label text via a small lookup object. In a real app, you'd set this class once at boot time based on an environment variable or hostname check, not via a manual switcher — the buttons here exist purely so you can preview all three states in the live editor.

**Why production is red and included at all**

It might seem odd to show a badge in production, but many teams intentionally render a (very subtle, or fully hidden) production indicator too, so the *absence* of a dev/staging color is a positive confirmation rather than an assumption. Some teams choose to render nothing at all in prod — that's a one-line change: skip rendering the badge component entirely when \`env === 'prod'\`.

**Wiring it to a real environment variable**

In a real app, replace the manual \`setEnv\` calls with a single line at startup, e.g. \`setEnv(process.env.NEXT_PUBLIC_ENV || 'dev')\`, so the ribbon always reflects the actual deployed environment without any manual step.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Environment Badge" in the sidebar Library tab to see the ribbon overlaying the mock app corner.' },
        { title: 'Switch environments', text: 'Click DEV, STAGING, or PRODUCTION below the demo to see the ribbon change color and label instantly.' },
        { title: 'Adjust the ribbon angle or size', text: 'Tweak the rotate(45deg) and translate values in the CSS panel if your corner container has different proportions.' },
        { title: 'Add or rename environments', text: 'Add a new .env-* class with a background color and extend the labels object in the JS panel.' },
        { title: 'Wire to a real environment variable', text: 'Replace the manual switcher buttons with a single setEnv() call driven by your build\'s environment variable at app startup.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to keep this in your personal snippet library.' },
      ],
    },
    features: [
      'Diagonal corner ribbon built with a single rotated div — no image assets',
      'Color-coded per environment: amber for dev, indigo for staging, red for production',
      'One setEnv() function swaps both the class and the label text together',
      'Positioned absolutely against a relative container so it overlays any page content',
      'Easily extended with additional environments by adding one CSS class and one label entry',
      'Designed to be wired to a real environment variable at app boot instead of manual toggling',
      'Zero layout impact on the underlying page — purely an overlay',
      'Subtle drop shadow keeps the ribbon legible against light or dark backgrounds',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Internal admin and ops tools', desc: 'Prevent costly mistakes by making it visually obvious which environment a support or ops team member is currently working in.' },
      { icon: 'FLOW', title: 'QA and staging review builds', desc: 'Give QA testers and stakeholders an unmissable visual cue when reviewing a staging deploy versus production.' },
      { icon: 'DASH', title: 'Multi-tenant or multi-region dashboards', desc: 'Adapt the same ribbon pattern to flag which tenant, region, or data source a dashboard is currently pointed at.' },
      { icon: 'DESIGN', title: 'Learn the CSS diagonal ribbon technique', desc: 'Study how rotate + translate on an absolutely positioned element produces a clean diagonal banner without an SVG or image.' },
      { icon: 'CODE', title: 'Environment-aware component libraries', desc: 'Bundle this badge into a shared internal component library so every project automatically shows its environment.' },
      { icon: 'CODE', title: 'Related: Connection Quality Indicator — Signal Bars from Real Network Signals', desc: 'See the [Connection Quality Indicator — Signal Bars from Real Network Signals](/ui-snippets/connection-quality-indicator/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Product Image Magnify Lens', desc: 'See the [Product Image Magnify Lens](/ui-snippets/product-image-magnify-lens/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Text Case Converter', desc: 'See the [Text Case Converter](/ui-snippets/text-case-converter/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Unit Price / Best Value Calculator', desc: 'See the [Unit Price / Best Value Calculator](/ui-snippets/unit-price-calculator/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use a diagonal ribbon instead of a straight bar?', a: 'A diagonal ribbon in the exact corner draws the eye without stealing significant screen real estate or covering important UI, while still being large and bold enough to notice immediately.' },
      { q: 'How is the diagonal shape achieved without an image?', a: 'A plain div is positioned in the top-right corner and rotated 45 degrees with a CSS transform, then nudged with translate so the rotated rectangle spans the corner cleanly. Padding controls how wide the visible ribbon band is.' },
      { q: 'Should I show this badge in production too?', a: 'Some teams do, using a muted or hidden style, so the badge\'s state is always explicit rather than assumed. Others render nothing in production — that\'s a simple conditional: skip rendering the component when env is "prod".' },
      { q: 'How do I wire this to my actual build environment?', a: 'Call setEnv() once at app startup with a value derived from an environment variable, e.g. process.env.NEXT_PUBLIC_ENV, instead of using the manual switcher buttons included in this demo.' },
      { q: 'Can I add more environments, like "QA" or "SANDBOX"?', a: 'Yes — add a new CSS class (e.g. .env-qa) with its own background color, and add a matching entry to the labels lookup object in the JavaScript.' },
      { q: 'Will the ribbon interfere with clicks on the page underneath it?', a: 'The ribbon only covers a small triangular area in the corner. If that area overlaps an interactive element in your real layout, add pointer-events: none to the badge, or nudge its position so it clears critical controls.' },
      { q: 'Does this affect page layout or scroll position?', a: 'No — it is absolutely positioned and has no impact on the flow of surrounding content. It only requires the parent container to have position: relative (or fixed, for a viewport-anchored version).' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain the transform math behind the ribbon — why 45 degrees plus a small translate offset produces a diagonal band that sits flush across a square corner container of a given size, and how you'd need to adjust the translate percentages if the container's corner radius or size changes. It's also a good prompt for making the badge environment-aware automatically: ask the assistant to write the one-line integration that reads an environment variable at build or runtime and calls setEnv accordingly, for your specific framework (Next.js, Vite, plain static site, etc.).`,
      prompt: `Build an "environment badge" corner ribbon in plain HTML, CSS, and JavaScript for flagging non-production builds of an internal tool.

Requirements:
- A single diagonal ribbon element positioned absolutely in the top-right corner of a relatively-positioned container, built using CSS rotate and translate transforms on a plain div — no image assets or SVG.
- Three color-coded environment states — DEV (amber/orange), STAGING (blue/indigo), PRODUCTION (red) — each defined as a separate CSS class that only changes the background color.
- One JavaScript function, setEnv(envName), that removes any existing environment class, adds the correct one, and updates the ribbon's label text from a small lookup object, so the badge can be driven by a single call at app startup.
- The ribbon must not affect the layout or click targets of the underlying page content — pure overlay, absolutely positioned, with a subtle drop shadow for legibility over any background.
- Include a way to preview all three states, such as demo buttons, but make clear in comments that a real integration should call setEnv() once based on a real environment variable rather than manual buttons.`,
    },
  },
};

export default environmentBadge;
