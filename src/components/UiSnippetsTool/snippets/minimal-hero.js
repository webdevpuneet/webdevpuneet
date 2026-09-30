const minimalHero = {
  id: 'minimal-hero',
  title: 'Minimal Hero',
  category: 'heroes',
  html: `<section class="hero">
  <nav class="nav">
    <span class="nav-brand">Brand</span>
    <div class="nav-links">
      <a href="#">Product</a>
      <a href="#">Pricing</a>
      <a href="#">Docs</a>
    </div>
    <a href="#" class="nav-cta">Get started</a>
  </nav>

  <div class="content">
    <div class="kicker">For professional teams</div>
    <h1 class="headline">
      The clarity your<br>workflow deserves.
    </h1>
    <p class="sub">Stop juggling tools. One focused workspace for every team — designed to reduce noise and surface what matters.</p>
    <div class="cta-row">
      <a href="#" class="btn-fill">Start for free</a>
      <a href="#" class="btn-text">See how it works →</a>
    </div>
  </div>

  <div class="rule"></div>

  <div class="proof-row">
    <div class="proof-item"><strong>12k+</strong><span>Teams</span></div>
    <div class="proof-div"></div>
    <div class="proof-item"><strong>4.9 ★</strong><span>Rating</span></div>
    <div class="proof-div"></div>
    <div class="proof-item"><strong>99.9%</strong><span>Uptime</span></div>
    <div class="proof-div"></div>
    <div class="proof-item"><strong>SOC 2</strong><span>Compliant</span></div>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #fff; min-height: 100vh; }

.hero { min-height: 100vh; display: flex; flex-direction: column; max-width: 860px; margin: 0 auto; padding: 0 32px; }

.nav { display: flex; align-items: center; gap: 24px; padding: 20px 0; border-bottom: 1px solid #f1f5f9; }
.nav-brand { font-size: 16px; font-weight: 900; color: #0f172a; letter-spacing: -0.3px; }
.nav-links { display: flex; gap: 20px; flex: 1; }
.nav-links a { font-size: 13px; color: #64748b; text-decoration: none; font-weight: 500; transition: color 0.12s; }
.nav-links a:hover { color: #0f172a; }
.nav-cta { font-size: 13px; font-weight: 700; color: #fff; background: #0f172a; padding: 8px 18px; border-radius: 8px; text-decoration: none; transition: opacity 0.12s; }
.nav-cta:hover { opacity: 0.85; }

.content { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 80px 0 40px; gap: 20px; max-width: 620px; }

.kicker { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6366f1; }

.headline { font-size: clamp(36px, 6vw, 64px); font-weight: 900; color: #0f172a; line-height: 1.1; letter-spacing: -1.5px; }

.sub { font-size: 16px; color: #64748b; line-height: 1.75; max-width: 460px; }

.cta-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; padding-top: 4px; }
.btn-fill { background: #0f172a; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px; text-decoration: none; transition: opacity 0.12s; }
.btn-fill:hover { opacity: 0.85; }
.btn-text { font-size: 14px; font-weight: 600; color: #475569; text-decoration: none; transition: color 0.12s; }
.btn-text:hover { color: #0f172a; }

.rule { width: 100%; height: 1px; background: #f1f5f9; }

.proof-row { display: flex; align-items: center; gap: 24px; padding: 24px 0; flex-wrap: wrap; }
.proof-item { display: flex; flex-direction: column; gap: 2px; }
.proof-item strong { font-size: 16px; font-weight: 800; color: #0f172a; }
.proof-item span { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
.proof-div { width: 1px; height: 28px; background: #e2e8f0; }`,
  js: '',
  seo: {
    title: 'Minimal Hero — Free HTML CSS Clean Landing Snippet',
    description: 'Typography-first hero with inline nav, kicker label, large headline and proof stats on white — no JS. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Minimal Hero — Clean White Layout with Inline Nav, Kicker, Large Headline & Proof Stats',
      description: `The minimal hero is the counter-movement to flashy [gradient and mesh backgrounds](/ui-snippets/gradient-mesh-hero/). When your product speaks for itself, a clean white layout with strong typography communicates confidence and professionalism — the same approach used by Notion, Linear, Vercel, and Stripe at different points in their positioning. This snippet provides a complete minimal hero with an inline navigation bar, a kicker label, a large fluid headline, a subtitle, dual CTAs, and a proof stats row — all in plain HTML and CSS with zero JavaScript required.\n\n**The inline navigation**\n\nThe nav sits at the top of the hero column with display: flex and a bottom border that separates it from the main content. Brand name on the left, navigation links in the centre (using flex: 1 to push them away from the brand), and a dark CTA button on the right. The nav links use colour #64748b in resting state and transition to #0f172a on hover — a subtle depth cue that does not distract from the primary CTAs.\n\n**Typography-first headline**\n\nThe headline uses font-size: clamp(36px, 6vw, 64px) for fluid scaling and letter-spacing: -1.5px for the tight display type look used on premium SaaS homepages. The kicker label above uses uppercase, wide letter-spacing, and the accent colour — a three-layer hierarchy: kicker (context) → headline (value prop) → subtitle (explanation).\n\n**The dual CTA pattern**\n\nTwo CTAs offer different commitment levels: the filled button ("Start for free") for users ready to sign up, and the text link ("See how it works →") for users who need more information first. The arrow on the text link signals navigation rather than action. This two-CTA pattern consistently outperforms single-CTA layouts for products with a non-trivial onboarding flow.\n\n**The proof stats row**\n\nBelow a horizontal rule (signalling the end of the hero and start of social proof), four stats (12k+ Teams, 4.9 ★, 99.9% Uptime, SOC 2) are separated by 1px dividers. Each stat has a bold large number and a small uppercase label. This row addresses four common objections (adoption, quality, reliability, security) in one compact strip.\n\n**Why no background colour or image**\n\nThe white background makes the page feel faster and cleaner. It also maximises contrast for the dark headline and grey subtitle. When combined with a product screenshot or illustration section below, the hero white acts as negative space that makes the demo section feel like it is floating above the page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Update the brand name and nav links', text: 'Replace "Brand" in the .nav-brand span with your product name. Edit the three .nav-links anchor texts (Product, Pricing, Docs) and their href values to match your site structure.' },
      { title: 'Update the kicker, headline, and subtitle', text: 'Change the .kicker text to your audience or positioning ("For indie developers", "For design teams"). Rewrite the h1 headline to your value proposition. Update the .sub paragraph with your benefit statement.' },
      { title: 'Wire the CTA buttons', text: 'Set href="#" on .btn-fill to your signup URL and on .btn-text to your demo, video, or docs page. Change the button labels to match your primary action ("Get started", "Try free for 14 days", "Book a demo").' },
      { title: 'Update the proof stats', text: 'Replace the four .proof-item values (12k+, 4.9 ★, 99.9%, SOC 2) with your actual metrics. Choose stats that address common purchase objections: team size, rating, uptime, compliance certification, or years in business.' },
      { title: 'Change the accent colour', text: 'Replace #6366f1 in the CSS (used for the .kicker text) with your brand accent colour. Also update #0f172a (headline, dark button, nav CTA) if your brand uses a non-black primary.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file to paste into your site, "JSX" for a React component, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Inline nav: brand left, links centre (flex:1), CTA button right — no separate nav bar','Nav link hover: colour transition #64748b→#0f172a for subtle depth cue','kicker label: uppercase, letter-spacing:1.5px, accent colour — context layer above headline','Fluid headline: clamp(36px,6vw,64px) + letter-spacing:-1.5px — no media query needed','Dual CTA: filled dark button (convert) + text link with arrow (explore)','Horizontal rule: thin 1px separator between hero content and proof stats','Proof stats: 4 metrics with 1px dividers — adoption, quality, reliability, compliance','Pure HTML and CSS — no JavaScript, no background colour, typography-first'],
    useCases: [
      { icon: 'DESIGN', title: 'Premium SaaS and productivity tool homepages', desc: 'The clean white, tight typography, and proof stats row is the standard layout for premium B2B SaaS products — for a product-screenshot variant, see the [product hero](/ui-snippets/product-hero/). Linear, Notion, and Vercel all use this pattern: let the headline carry the weight, prove with numbers, convert with two CTAs.' },
      { icon: 'APP', title: 'Developer tool and API product landing pages', desc: 'Developer audiences distrust heavy marketing pages. The minimal white layout signals that the product is confident enough not to need visual tricks. Add a [terminal window](/ui-snippets/terminal-window/) or code snippet section directly below this hero for a developer-first impression.' },
      { icon: 'FLOW', title: 'Consulting firm and professional services homepage heroes', desc: 'Strategy, legal, financial, and HR services use minimal typographic heroes to communicate trustworthiness and clarity. Replace product stats with case study stats (40+ clients, 8 years experience, $2B+ managed). The professional tone matches high-ACV services.' },
      { icon: 'STAR', title: 'Rebranding and product pivot announcement pages', desc: 'A clean hero with a new headline is the fastest way to communicate a repositioning. The minimal layout draws full attention to the new value proposition without visual noise. Pair with a "Previously known as..." note for existing users.' },
      { icon: 'LEARN', title: 'Study three-layer typographic hierarchy and dual CTA pattern', desc: 'The kicker → headline → subtitle three-layer hierarchy is one of the most studied copywriting structures in landing page design. This snippet lets you practice the HTML structure and CSS implementation. The dual CTA (filled + text link) pattern teaches the principle of offering two commitment levels simultaneously.' },
      { icon: 'CODE', title: 'E-commerce and DTC brand homepage hero sections', desc: 'Direct-to-consumer brands increasingly use minimal white heroes to differentiate from cluttered competitor pages. The headline-forward layout puts the brand story first, the proof stats provide social credibility, and the clean nav drives focused exploration.' },
      { icon: 'CODE', title: 'Related: Search-Engine-Style Hero', desc: 'See the [Search-Engine-Style Hero](/ui-snippets/hero-search-bar-centerpiece/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add a product screenshot below this hero section?', a: 'After the .proof-row div, add a new section with a shadowed screenshot: <div style="padding: 40px 0;"><img src="screenshot.png" alt="Product screenshot" style="width:100%; border-radius:16px; box-shadow: 0 24px 80px rgba(0,0,0,0.12); border: 1px solid #e2e8f0;" /></div>. The white hero background creates a clean negative space that makes the screenshot appear to float.' },
      { q: 'How do I make the inline nav sticky as the user scrolls?', a: 'Add position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); to the .nav CSS rule. The sticky positioning keeps it visible on scroll. The backdrop-filter creates a frosted glass effect as content scrolls behind the nav bar. Remove border-bottom and add box-shadow: 0 1px 0 rgba(0,0,0,0.06) for a cleaner sticky state.' },
      { q: 'How do I add a mobile hamburger menu to the inline nav?', a: 'See the Hamburger Nav snippet in the Navigation category for a complete implementation. Add a hamburger button that appears on mobile via @media (max-width: 640px) { .nav-links { display: none } .burger { display: flex } }. The existing nav-brand and nav-cta stay visible. The hamburger toggles a mobile dropdown menu.' },
      { q: 'How do I use this minimal hero in a Next.js project?', a: 'Click "JSX" to download. Use it as a server component in app/page.tsx — no "use client" needed since there is no JavaScript. For the nav CTA, use Next.js <Link href="/signup"> instead of <a>. For the proof stats, fetch real metrics from your database in an async server component and pass them as props: <MinimalHero teams={totalTeams} rating={avgRating} />.' },
    ],
    aiPrompt: {
      paragraph: `You don't need to eyeball the type sizing alone to understand why it holds up across screen widths. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how the clamp function on the headline's font-size picks a value between its floor and ceiling based on viewport width, or why the proof-row dividers are separate 1px elements rather than a border on each stat. The same assistant is useful for optimizing it — asking whether the fluid clamp sizing removes the need for any font-size media queries elsewhere on the page, or whether the nav's flex:1 spacer approach holds up if a fourth or fifth nav link is added. It's just as useful for extending the layout: ask it to make the nav sticky with a backdrop blur on scroll, add a product screenshot section below the proof row, or convert the fixed proof stats into ones pulled from a live API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "minimal typographic hero" section in plain HTML and CSS only — no JavaScript, no background images or gradients, pure white background with strong typography.

Requirements:
- An inline navigation row using flexbox: a brand name on the left, a set of nav links given flex: 1 so they sit centered and push a filled call-to-action button to the far right, with a thin bottom border separating the nav from the rest of the hero.
- A three-layer content hierarchy stacked above the fold: a small uppercase "kicker" label in an accent color with wide letter-spacing, a large headline whose font-size is set with the CSS clamp function (a minimum size, a viewport-relative preferred size, and a maximum size) so it scales fluidly with zero media queries, and a subtitle paragraph capped at a readable max-width.
- Two calls to action side by side: one filled/solid button for the primary conversion action, and one plain text link with a trailing arrow character for a lower-commitment secondary action.
- A thin 1px horizontal rule separating the hero content from a proof-stats row underneath.
- A proof-stats row of at least four stat items (e.g. a customer count, a rating, an uptime percentage, a compliance badge), each showing a bold number/label pair, with thin 1px vertical divider elements placed between each stat item (not CSS borders on the items themselves).
- The whole layout must be achievable with flexbox alone, contained in a max-width column centered on the page, and must not require any JavaScript to function or resize correctly.`,
    },
  },
};

export default minimalHero;
