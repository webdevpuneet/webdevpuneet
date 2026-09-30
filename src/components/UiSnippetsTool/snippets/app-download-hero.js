const appDownloadHero = {
  id: 'app-download-hero',
  title: 'App Download Hero',
  lastmod: '2026-06-13',
  category: 'heroes',
  html: `<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-inner">
    <div class="hero-content">
      <div class="badge-row">
        <span class="hero-badge">✦ New Release</span>
        <span class="version">v2.0</span>
      </div>
      <h1 class="hero-title">Your finances,<br><span class="gradient-word">beautifully simple.</span></h1>
      <p class="hero-desc">Track spending, set budgets, and hit your savings goals — all in one elegant app. Available on iOS and Android.</p>

      <div class="rating-row">
        <div class="stars-wrap">★★★★★</div>
        <span class="rating-text"><strong>4.9</strong> from 28,000+ ratings</span>
      </div>

      <div class="store-btns">
        <a href="#" class="store-btn">
          <svg class="store-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          <div class="store-text">
            <span class="store-sub">Download on the</span>
            <span class="store-name">App Store</span>
          </div>
        </a>
        <a href="#" class="store-btn">
          <svg class="store-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.28.16.62.17.96-.02l13.2-7.57-2.88-2.9-11.28 10.49zM.54 1.26C.2 1.62 0 2.17 0 2.88v18.24c0 .71.2 1.26.54 1.62l.08.08 10.2-10.2v-.24L.62 1.18l-.08.08zM20.66 10.38l-2.87-1.64-3.22 3.22 3.22 3.22 2.9-1.66c.83-.47.83-1.24-.03-1.14zM3.18.24L16.38 7.8l-2.88 2.88L3.22.32 3.18.24z"/></svg>
          <div class="store-text">
            <span class="store-sub">Get it on</span>
            <span class="store-name">Google Play</span>
          </div>
        </a>
      </div>

      <div class="social-proof">
        <div class="avatars">
          <div class="av" style="--c:#6366f1">A</div>
          <div class="av" style="--c:#0ea5e9">B</div>
          <div class="av" style="--c:#10b981">C</div>
          <div class="av" style="--c:#f59e0b">D</div>
          <div class="av" style="--c:#ec4899">E</div>
        </div>
        <span class="proof-text">Join <strong>50,000+</strong> users managing money smarter</span>
      </div>
    </div>

    <div class="hero-phone">
      <div class="phone-wrap">
        <div class="phone-frame">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="app-header">
              <span class="app-greeting">Good morning ☀</span>
              <div class="app-avatar">JD</div>
            </div>
            <div class="balance-card">
              <span class="balance-label">Total Balance</span>
              <span class="balance-amt">$12,847.50</span>
              <div class="balance-change up">↑ +2.4% this month</div>
            </div>
            <div class="app-chart">
              <div class="chart-bar" style="height:40%"></div>
              <div class="chart-bar" style="height:65%"></div>
              <div class="chart-bar" style="height:45%"></div>
              <div class="chart-bar" style="height:80%"></div>
              <div class="chart-bar active" style="height:60%"></div>
              <div class="chart-bar" style="height:90%"></div>
              <div class="chart-bar" style="height:55%"></div>
            </div>
            <div class="app-txns">
              <div class="txn"><span class="txn-icon" style="background:#eef2ff;color:#6366f1">🛒</span><span class="txn-name">Groceries</span><span class="txn-amt neg">−$84</span></div>
              <div class="txn"><span class="txn-icon" style="background:#f0fdf4;color:#10b981">💼</span><span class="txn-name">Salary</span><span class="txn-amt pos">+$3,200</span></div>
              <div class="txn"><span class="txn-icon" style="background:#fef3c7;color:#f59e0b">☕</span><span class="txn-name">Coffee</span><span class="txn-amt neg">−$6</span></div>
            </div>
          </div>
        </div>
        <div class="phone-glow"></div>
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;min-height:100vh}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:#020817}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 60% 50%,rgba(99,102,241,.15) 0%,transparent 70%)}
.hero-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 50% at 20% 80%,rgba(139,92,246,.1) 0%,transparent 60%)}

.hero-inner{max-width:1000px;margin:0 auto;padding:60px 24px;display:grid;grid-template-columns:1fr auto;gap:48px;align-items:center;width:100%}

.hero-content{max-width:480px}
.badge-row{display:flex;align-items:center;gap:8px;margin-bottom:20px}
.hero-badge{font-size:11px;font-weight:700;color:#818cf8;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.3);border-radius:20px;padding:4px 12px}
.version{font-size:11px;font-weight:700;color:#475569;background:#1e293b;border-radius:6px;padding:2px 8px}

.hero-title{font-size:clamp(28px,4vw,46px);font-weight:900;color:#f1f5f9;line-height:1.1;margin-bottom:16px}
.gradient-word{background:linear-gradient(90deg,#818cf8,#c084fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.hero-desc{font-size:15px;color:#94a3b8;line-height:1.65;margin-bottom:22px}

.rating-row{display:flex;align-items:center;gap:8px;margin-bottom:24px}
.stars-wrap{color:#f59e0b;font-size:14px;letter-spacing:1px}
.rating-text{font-size:13px;color:#64748b}
.rating-text strong{color:#e2e8f0}

.store-btns{display:flex;gap:12px;margin-bottom:28px;flex-wrap:wrap}
.store-btn{display:flex;align-items:center;gap:10px;padding:10px 18px;background:#1e293b;border:1.5px solid #334155;border-radius:12px;text-decoration:none;transition:all .2s;color:#f1f5f9}
.store-btn:hover{background:#334155;border-color:#475569;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
.store-icon{width:22px;height:22px;flex-shrink:0}
.store-sub{display:block;font-size:9px;color:#94a3b8;font-weight:500}
.store-name{display:block;font-size:14px;font-weight:700;color:#f1f5f9}

.social-proof{display:flex;align-items:center;gap:10px}
.avatars{display:flex}
.av{width:26px;height:26px;border-radius:50%;background:var(--c);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;border:2px solid #020817;margin-right:-6px}
.proof-text{font-size:12px;color:#64748b;margin-left:10px}
.proof-text strong{color:#e2e8f0}

/* Phone mockup */
.hero-phone{display:flex;align-items:center;justify-content:center}
.phone-wrap{position:relative}
.phone-frame{width:200px;background:#0f172a;border:2px solid #334155;border-radius:36px;overflow:hidden;box-shadow:0 0 0 1px #1e293b, 0 40px 80px rgba(0,0,0,.6);position:relative;z-index:1}
.phone-notch{width:60px;height:16px;background:#020817;border-radius:0 0 12px 12px;margin:0 auto}
.phone-screen{padding:10px;display:flex;flex-direction:column;gap:8px}
.app-header{display:flex;align-items:center;justify-content:space-between;padding:4px 0}
.app-greeting{font-size:9px;color:#94a3b8;font-weight:500}
.app-avatar{width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:800;color:#fff}

.balance-card{background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px;padding:12px;color:#fff}
.balance-label{display:block;font-size:8px;opacity:.8;margin-bottom:4px;font-weight:600}
.balance-amt{display:block;font-size:16px;font-weight:900;margin-bottom:4px}
.balance-change{font-size:8px;font-weight:600;opacity:.9}
.balance-change.up::before{color:#86efac}

.app-chart{display:flex;align-items:flex-end;gap:4px;height:40px}
.chart-bar{flex:1;background:#1e293b;border-radius:4px 4px 0 0;transition:height .3s}
.chart-bar.active{background:linear-gradient(180deg,#6366f1,#8b5cf6)}

.app-txns{display:flex;flex-direction:column;gap:6px;padding-bottom:6px}
.txn{display:flex;align-items:center;gap:6px}
.txn-icon{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0}
.txn-name{font-size:8.5px;color:#e2e8f0;font-weight:500;flex:1}
.txn-amt{font-size:8.5px;font-weight:700}
.txn-amt.neg{color:#f87171}
.txn-amt.pos{color:#4ade80}

.phone-glow{position:absolute;width:160px;height:160px;background:radial-gradient(circle,rgba(99,102,241,.4),transparent 70%);border-radius:50%;bottom:-60px;left:50%;transform:translateX(-50%);filter:blur(30px);z-index:0}

@media(max-width:700px){.hero-inner{grid-template-columns:1fr;text-align:center}.store-btns{justify-content:center}.social-proof{justify-content:center}.hero-phone{display:none}}`,

  js: ``,

  seo: {
    title: 'App Download Hero — iOS Android Store Buttons HTML CSS',
    description: `App download hero with App Store and Google Play buttons, phone mockup, star rating, and social proof. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `App Download Hero — Phone Mockup, Store Buttons, Gradient Text & Social Proof Row`,
      description: `The app download hero is the most critical section of any mobile app landing page — it must communicate the app's value proposition, show what the app looks like, and drive users to download in under 5 seconds. This snippet builds a complete dark-theme app download hero: animated gradient text headline, App Store and Google Play buttons, a CSS phone frame mockup with a realistic app UI inside, star rating with review count, overlapping social proof avatars, and a radial glow background effect.

App landing pages from Notion, Linear, Robinhood, and Revolut all use this hero layout — left-side text and CTAs, right-side phone mockup showing the actual app UI. The phone mockup removes the need for actual screenshots and loads instantly, while the social proof row (overlapping avatars + user count) provides the "this is popular" signal that drives downloads.

**CSS phone frame mockup**

The phone frame is built entirely in CSS — no images, no SVGs. A dark rounded rectangle (\`border-radius: 36px\`) with a double border (inner border via \`box-shadow: 0 0 0 1px #1e293b\`) simulates a phone bezel. The notch is a centred dark rectangle at the top. The screen content is a flex column of app UI elements: header, balance card, bar chart, and transaction list.

The balance card uses an actual gradient (\`linear-gradient(135deg, #6366f1, #8b5cf6)\`) matching the hero's accent colour — this creates visual cohesion between the phone mockup and the surrounding hero content. The bar chart uses flex-aligned divs of varying heights — the active bar gets the gradient fill, all others remain dark.

**Gradient text headline**

The "beautifully simple." gradient uses \`background: linear-gradient(90deg, #818cf8, #c084fc, #f472b6)\` with \`-webkit-background-clip: text\` and \`-webkit-text-fill-color: transparent\`. The cross-browser approach uses both \`-webkit-background-clip: text\` (Safari/Chrome) and the standard \`background-clip: text\` (Firefox). The gradient runs from indigo through purple to pink — a colour story that complements the dark navy hero background.

**Store buttons**

Both store buttons use the same \`.store-btn\` base class with the native platform icon SVG. The layout is icon + two-line text block: a small "Download on the" / "Get it on" label and a larger platform name. This matches the exact layout of the official Apple and Google store badge design guidelines. Pair with a [floating dock](/ui-snippets/floating-dock/) for a mobile navigation pattern that complements the app download theme.

**Radial glow background**

The hero background combines two radial gradients on the \`.hero-bg\` element and its \`::before\` pseudo-element. The main glow is centred toward the phone side of the layout; the secondary glow appears at the bottom-left for depth. The phone itself has a separate \`.phone-glow\` div with a blurred radial gradient beneath it — simulating the ambient light effect used in Apple's product photography.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML and CSS', text: `A full-screen dark hero appears with text content on the left and a phone mockup on the right. The phone shows a finance app UI with balance, chart, and transactions.` },
      { title: 'Read the app UI in the phone', text: `The phone mockup contains a greeting, a gradient balance card showing $12,847.50, a bar chart with one highlighted bar, and three transaction rows.` },
      { title: 'Hover the store buttons', text: `App Store and Google Play buttons lift with a subtle shadow on hover — identical to native platform badge interaction patterns.` },
      { title: 'Check the social proof row', text: `Five overlapping avatar initials plus "Join 50,000+ users managing money smarter" — the social proof row sits below the store buttons.` },
      { title: 'Customise the headline', text: `Change the main title text. The second line (\`.gradient-word\`) has the purple-to-pink gradient — swap it to any text or add your own gradient colours.` },
      { title: 'Update the phone UI content', text: `Change the balance amount, chart bar heights (via inline \`style="height:X%"\`), and transaction rows. Update colours and emoji icons to match your app's brand.` },
    ] },
    features: [
      { title: 'CSS phone frame mockup', text: `Pure CSS phone bezel with double border simulation, centred notch, and a full app UI (header, balance card, chart, transactions) — no images needed.` },
      { title: 'Gradient text headline', text: `\`background-clip: text\` with an indigo-to-pink gradient — the CSS gradient text technique used by Linear, Vercel, and Stripe for hero headings.` },
      { title: 'App Store + Google Play buttons', text: `Both store buttons use official platform icon SVGs with the correct two-line label/name layout — matching the official Apple and Google badge design.` },
      { title: 'Dual radial glow background', text: `Two CSS radial gradients — one on \`.hero-bg\` and one on \`::before\` — create depth without images. The phone has its own blurred glow beneath it.` },
      { title: 'Social proof avatar row', text: `Five overlapping circular avatars with negative margin (\`margin-right: -6px\`) — the "people are using this" social proof pattern.` },
      { title: 'Star rating with review count', text: `Amber stars + rating score + review count — the app store rating pattern that communicates quality and adoption simultaneously.` },
      { title: 'App UI balance card', text: `Gradient balance card inside the phone mockup matches the hero accent colour — visual cohesion between the hero and the phone content.` },
      { title: 'Responsive: phone hides on mobile', text: `The phone mockup hides on screens under 700px — the content column centres with store buttons and social proof remaining fully visible.` },
    ],
    useCases: [
      { title: 'Mobile app landing pages', text: `The primary use case — fintech, productivity, health, and lifestyle apps use this layout to drive App Store and Google Play downloads.` },
      { title: 'SaaS with mobile companion apps', text: `B2B SaaS products that have mobile apps use this hero to cross-promote the mobile experience to desktop web users.` },
      { title: 'Product Hunt launch pages', text: `Launch day landing pages for mobile apps use the phone mockup hero to show the product immediately — before users decide to click through to the store.` },
      { title: 'Coming soon pages for apps', text: `Pre-launch landing pages collect email subscribers with this hero — "Join 50,000+ on the waitlist" variant of the social proof row.` },
      { title: 'App feature showcase pages', text: `Multi-section landing pages use this hero as the first section, with feature cards, testimonials, and pricing sections below.` },
      { title: 'Developer portfolio for mobile apps', text: `Freelance mobile developers and app studios use this hero to showcase their apps — the phone mockup shows the UI without requiring actual App Store screenshots.` },
      { icon: 'CODE', title: 'Related: Hero with Announcement Ticker Bar', desc: 'See the [Hero with Announcement Ticker Bar](/ui-snippets/hero-announcement-ticker/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Waitlist Hero with Live Position Counter', desc: 'See the [Waitlist Hero with Live Position Counter](/ui-snippets/hero-waitlist-position-counter/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Live Slug Generator Demo', desc: 'See the [Hero with Live Slug Generator Demo](/ui-snippets/hero-live-demo-input/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Interactive Product Configurator', desc: 'See the [Hero with Interactive Product Configurator](/ui-snippets/hero-product-configurator/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Integration Ecosystem Grid', desc: 'See the [Hero with Integration Ecosystem Grid](/ui-snippets/hero-integration-ecosystem-grid/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add a real screenshot inside the phone instead of the CSS UI?', a: `Replace \`.phone-screen\` content with an \`<img>\` element: \`<img src="screenshot.png" style="width:100%;display:block;">\`. Set the phone-frame height to match the image aspect ratio. Use \`object-fit: cover\` if the screenshot doesn't exactly match the phone dimensions.` },
      { q: 'How do I add a QR code for direct app store download?', a: `Add a \`<canvas id="qr">\` or \`<img src="qr.svg">\` element below the store buttons. For a real QR code, use the [qr-code-generator](/ui-snippets/qr-code-generator/) snippet — generate the QR targeting your app store deep link URL.` },
      { q: 'How do I animate the phone UI elements on load?', a: `Add \`opacity: 0; transform: translateY(10px)\` to each phone UI section and a CSS animation that fades/slides them in with staggered delays. The balance card at 0.2s, chart at 0.4s, transactions at 0.6s — creating a "loading" reveal effect inside the phone.` },
      { q: 'How do I export this as a React component?', a: `Create an \`AppHero\` component with props: \`{title, gradientText, description, appName, rating, reviewCount, userCount, balance, transactions}\`. The store buttons are always present. The phone mockup renders from the \`balance\` and \`transactions\` arrays. The gradient text headline uses a \`<span style={{background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>\`.` },
    ],
    aiPrompt: {
      paragraph: `This one has no JavaScript at all, so the interesting questions are all about the CSS. Paste the HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why the gradient headline needs both the -webkit-background-clip and standard background-clip declarations, or how the two stacked radial gradients on hero-bg and its pseudo-element combine with the separate phone-glow blur to build depth without a single image file. The same assistant can help optimize it too — ask whether the grid-template-columns 1fr auto layout could reflow more gracefully at in-between viewport widths than the current single breakpoint, or whether the balance card gradient and chart bar colors could be pulled into CSS custom properties so a brand recolor touches one place instead of a dozen. It's also worth using to extend the hero: ask it to swap the static chart bars for an animated fill-in on scroll, add a second phone screen state that cross-fades in on an interval, or wire the phone content to real props for a component library. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a dark-theme "app download hero" in plain HTML and CSS only — no JavaScript, no images, no external icon libraries.

Requirements:
- A two-column layout using CSS grid (grid-template-columns: 1fr auto) with left-side copy (badge, headline, description, star rating, store buttons, social proof avatars) and a right-side CSS-only phone mockup, collapsing to a single centered column with the phone hidden below a defined breakpoint.
- The headline's accent phrase must use a multi-stop linear-gradient clipped to the text using both the -webkit-background-clip: text and standard background-clip: text properties with a transparent text fill, not an image or SVG.
- Build the phone entirely from nested divs: an outer frame with border-radius and a border simulating the bezel, a small notch element, and an inner screen containing a greeting row, a gradient balance card, a row of flex-aligned bars of varying heights forming a simple bar chart, and a short transaction list — no screenshot images anywhere.
- The background must combine at least two radial-gradient layers (one on the hero container, one on a pseudo-element) at different positions and sizes to create a layered ambient glow, plus a separate blurred radial-gradient glow positioned directly behind the phone mockup.
- App Store and Google Play buttons must use inline SVG brand icons (not image files or icon fonts) with a two-line text label (small "Download on the / Get it on" line above a bold store name line), with a hover state that lifts the button with translateY and adds a shadow.
- Social proof must show several overlapping circular avatars using negative margins, next to a user-count sentence with a bolded number.`,
    },
  },
};

export default appDownloadHero;
