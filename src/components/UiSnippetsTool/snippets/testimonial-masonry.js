const testimonialMasonry = {
  id: 'testimonial-masonry',
  title: 'Testimonial Masonry Wall',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="page">
  <div class="section-head">
    <p class="eyebrow">What developers say</p>
    <h2 class="section-title">Loved by 12,000+ frontend developers</h2>
  </div>

  <div class="masonry">
    <div class="masonry-col">
      <blockquote class="tcard featured">
        <div class="stars">★★★★★</div>
        <p class="tcard-body">"I've tried every UI library out there. Nothing comes close to the quality-to-time-saved ratio of webdevpuneet.com. I ship features in hours that used to take days."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#6366f1,#8b5cf6)">AM</div>
          <div>
            <div class="tcard-name">Alex Martinez</div>
            <div class="tcard-role">Senior Engineer · Shopify</div>
          </div>
          <div class="tcard-logo">
            <svg width="80" height="16" viewBox="0 0 80 16" fill="none"><text x="0" y="13" font-family="system-ui" font-size="13" font-weight="800" fill="#96bf48">shopify</text></svg>
          </div>
        </footer>
      </blockquote>

      <blockquote class="tcard">
        <div class="stars">★★★★★</div>
        <p class="tcard-body">"The React exports are surprisingly clean — no bloat, no dead props. Our design system onboarding time dropped by 60%."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#0ea5e9,#06b6d4)">LP</div>
          <div>
            <div class="tcard-name">Layla Park</div>
            <div class="tcard-role">UI Lead · Stripe</div>
          </div>
        </footer>
      </blockquote>

      <blockquote class="tcard tcard-dark">
        <div class="stars stars-light">★★★★★</div>
        <p class="tcard-body tcard-body-light">"Every snippet just works. No broken imports, no missing dependencies. Copy → paste → ship."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:rgba(255,255,255,.15)">TK</div>
          <div>
            <div class="tcard-name tcard-name-light">Tom Keller</div>
            <div class="tcard-role tcard-role-light">Freelance Developer</div>
          </div>
        </footer>
      </blockquote>
    </div>

    <div class="masonry-col">
      <blockquote class="tcard">
        <div class="stars">★★★★★</div>
        <p class="tcard-body">"Our whole team switched to webdevpuneet.com for prototyping. The Figma-to-code gap disappeared practically overnight. Genuinely impressive work."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#f59e0b,#ef4444)">RB</div>
          <div>
            <div class="tcard-name">Rachel Burns</div>
            <div class="tcard-role">Product Manager · Linear</div>
          </div>
        </footer>
      </blockquote>

      <blockquote class="tcard">
        <div class="stars stars-4">★★★★<span class="se">★</span></div>
        <p class="tcard-body">"Great collection. The dark mode snippets are particularly well thought through. Would love more data visualisation components but what's here is excellent."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#10b981,#059669)">NW</div>
          <div>
            <div class="tcard-name">Noah Wilson</div>
            <div class="tcard-role">Frontend Dev · Vercel</div>
          </div>
        </footer>
      </blockquote>
    </div>

    <div class="masonry-col">
      <blockquote class="tcard">
        <div class="stars stars-4">★★★★<span class="se">★</span></div>
        <p class="tcard-body">"Saved my startup literally thousands in design hours. The pricing page components alone are worth it — and it's free?"</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#ec4899,#f43f5e)">SW</div>
          <div>
            <div class="tcard-name">Sarah Wong</div>
            <div class="tcard-role">Founder · Notion template co.</div>
          </div>
        </footer>
      </blockquote>

      <blockquote class="tcard featured">
        <div class="stars">★★★★★</div>
        <p class="tcard-body">"The GitHub Gist sync is a killer feature. My custom snippets are available on every machine, every project. This is how developer tools should work."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#6366f1,#4f46e5)">DH</div>
          <div>
            <div class="tcard-name">Dev Huang</div>
            <div class="tcard-role">Staff Engineer · Atlassian</div>
          </div>
        </footer>
      </blockquote>

      <blockquote class="tcard">
        <div class="stars">★★★★★</div>
        <p class="tcard-body">"Used the kanban board and data table snippets for an internal tool. Client was blown away. Both deployed in an afternoon."</p>
        <footer class="tcard-footer">
          <div class="avatar" style="--av:linear-gradient(135deg,#f59e0b,#d97706)">MR</div>
          <div>
            <div class="tcard-name">Maria Reyes</div>
            <div class="tcard-role">Web Developer · Agency</div>
          </div>
        </footer>
      </blockquote>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc;min-height:100vh;padding:32px 20px}
.page{max-width:960px;margin:0 auto}

.section-head{text-align:center;margin-bottom:32px}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6366f1;margin-bottom:8px}
.section-title{font-size:clamp(20px,3vw,30px);font-weight:800;color:#1e293b;line-height:1.2}

.masonry{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:start}
.masonry-col{display:flex;flex-direction:column;gap:16px}

.tcard{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px;transition:box-shadow .2s,transform .2s;break-inside:avoid}
.tcard:hover{box-shadow:0 8px 28px rgba(0,0,0,.08);transform:translateY(-2px)}
.tcard.featured{border-color:#c7d2fe;box-shadow:0 4px 20px rgba(99,102,241,.1)}
.tcard-dark{background:linear-gradient(145deg,#1e1b4b,#312e81);border-color:transparent}

.stars{color:#f59e0b;font-size:14px;letter-spacing:1.5px}
.stars-light{color:#fcd34d}
.stars-4 .se{color:#e2e8f0}
.tcard-dark .stars-4 .se{color:rgba(255,255,255,.2)}

.tcard-body{font-size:13.5px;color:#334155;line-height:1.7;flex:1;font-style:italic}
.tcard-body-light{color:rgba(255,255,255,.85)}

.tcard-footer{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px}
.avatar{width:34px;height:34px;border-radius:10px;background:var(--av);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#fff;flex-shrink:0}
.tcard-name{font-size:12px;font-weight:700;color:#1e293b}
.tcard-name-light{color:#f1f5f9}
.tcard-role{font-size:11px;color:#64748b}
.tcard-role-light{color:rgba(255,255,255,.5)}
.tcard-logo{margin-left:auto;opacity:.6}

@media(max-width:700px){.masonry{grid-template-columns:1fr}}
@media(min-width:701px) and (max-width:900px){.masonry{grid-template-columns:repeat(2,1fr)}}`,

  js: ``,

  seo: {
    title: 'Testimonial Masonry Wall — Review Grid HTML CSS Snippet',
    description: `Three-column testimonial masonry grid with star ratings, gradient avatars, featured card, dark card variant, and partial star. Free HTML CSS, exports to React & Vue.`,
    about: {
      title: `Testimonial Masonry Wall — CSS Grid Column Alignment, Avatar Gradient System & Featured Card`,
      description: `Testimonial walls are one of the most persuasive trust-building elements on SaaS and product landing pages — a dense grid of authentic customer quotes that communicates social proof at scale. A wall of 7–8 testimonials signals "many people use this" far more convincingly than a three-quote slider. This snippet builds a three-column masonry-style testimonial grid with gradient avatars, star ratings, featured card highlight, dark card variant, company attribution, and responsive column stacking.

Testimonial walls appear on the pricing pages of Notion, Linear, Stripe, Vercel, and virtually every high-converting SaaS product. The design challenge is making a dense grid of quotes feel readable rather than overwhelming — varied card heights, subtle hover lifts, featured card highlighting, and the dark card variant all create visual rhythm across the grid.

**CSS Grid masonry column layout**

True CSS masonry (using \`grid-template-rows: masonry\`) has limited browser support, so this implementation uses three explicit column divs with \`align-items: start\` on the grid. Each column is a flex column, and cards stack naturally within their column. Cards in different columns that have different text lengths will sit at different heights — this is the intentional "masonry" effect achieved without JavaScript. The approach is pure CSS and works in all modern browsers.

**Gradient avatar system**

Each testimonial uses an initials-based avatar with a \`--av\` CSS custom property accepting any CSS background value — solid colours, gradients, or even \`rgba\` for the dark card's translucent avatar. The gradient pairs (indigo/violet, sky/cyan, amber/red, emerald/green, pink/rose) are drawn from the Tailwind CSS palette and create enough visual variety that no two adjacent avatars look the same.

**Featured card elevation**

The \`.featured\` class applies an indigo border (\`#c7d2fe\`) and a subtle indigo box-shadow (\`rgba(99,102,241,.1)\`) — lifting the most impactful quotes slightly above the others. Featured cards are placed first in their column for maximum above-the-fold visibility. This pattern is used by Stripe's testimonial sections.

**Dark card for visual rhythm**

The dark card (\`.tcard-dark\`) breaks the all-white grid with a deep indigo gradient — the same technique used in pricing cards to make one option stand out. It requires careful colour handling: avatar, text, stars, and role label all need light variants. The approach uses modifier classes (\`.tcard-body-light\`, \`.tcard-name-light\`, \`.tcard-role-light\`, \`.stars-light\`) rather than descendant selectors, so the dark card is self-contained and portable.

Pair with a [carousel](/ui-snippets/carousel/) for a testimonial slider variant that shows one quote at a time on mobile.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML and CSS', text: `A three-column masonry testimonial grid appears with 7 quotes. Card heights vary naturally based on quote length, creating the masonry staggered look.` },
      { title: 'Identify the featured cards', text: `Alex Martinez's and Dev Huang's cards have an indigo border and subtle shadow — the featured highlight for the most compelling quotes.` },
      { title: 'Find the dark card', text: `Tom Keller's card uses a deep indigo gradient — a visual break that adds rhythm to the all-white grid.` },
      { title: 'Hover over any card', text: `Cards lift with a gentle \`translateY(-2px)\` and box-shadow on hover — a consistent interactive affordance across the grid.` },
      { title: 'Swap the testimonials', text: `Replace the \`<p class="tcard-body">\` text, update the initials in \`.avatar\`, change \`--av\` to any CSS gradient, and update name and role.` },
      { title: 'Adjust the column layout', text: `Move \`<blockquote>\` elements between the three \`.masonry-col\` divs to balance column heights. Longer quotes should be distributed evenly.` },
    ] },
    features: [
      { title: 'CSS Grid masonry columns', text: `Three explicit column divs with \`align-items: start\` on the grid — cards stack by natural height within each column, no JavaScript required.` },
      { title: 'Gradient avatar system', text: `\`--av\` CSS custom property on each avatar accepts any background value — solid colour, gradient, or rgba. One attribute per testimonial.` },
      { title: 'Featured card variant', text: `\`.featured\` adds indigo border + subtle indigo shadow — elevates the most impactful quotes without structural changes.` },
      { title: 'Dark card variant', text: `\`.tcard-dark\` with deep indigo gradient — breaks visual monotony in the white grid. Light modifier classes handle text and star colours inside it.` },
      { title: 'Partial star rating', text: `\`.stars-4\` with \`.se\` (star-empty) class on the trailing star — 4-star ratings that feel more authentic than all five-star reviews.` },
      { title: 'Company role attribution', text: `Each testimonial shows name, role, and company — "Maria Reyes · Web Developer · Agency" — the attribution format that maximises credibility.` },
      { title: 'Hover lift animation', text: `\`translateY(-2px)\` + \`box-shadow\` transition on hover — consistent interactive feel across all card variants.` },
      { title: 'Responsive breakpoints', text: `Three columns on desktop, two on tablet (≤900px), one on mobile (≤700px). Column count adjusts, no layout reflow or content reorder.` },
    ],
    useCases: [
      { title: 'SaaS pricing and landing pages', text: `The primary use case — a social proof wall above or below the pricing table. 7+ testimonials with company names from recognisable brands convert significantly better than 2–3 quotes.` },
      { title: 'Agency and portfolio home pages', text: `Client testimonials in a masonry grid on an agency's homepage — varied quote lengths create a natural wall effect that static grids can't achieve.` },
      { title: 'Product launch pages', text: `Early adopter quotes displayed in a masonry wall on a Product Hunt launch page or landing page validate the product before the public sees it.` },
      { title: 'Developer tool marketing sites', text: `"Loved by engineers at Stripe, Vercel, Linear" — testimonials with company logos and roles from recognisable companies are the strongest trust signal for developer tools.` },
      { title: 'Course and community platforms', text: `Student success stories in a testimonial wall communicate outcomes better than statistics. Quote length variation creates the masonry visual effect naturally.` },
      { title: 'Marketplace seller credibility sections', text: `Marketplace sellers use review grids to build credibility with new buyers — similar structure to this component but driven by real database data.` },
    ],
    faqs: [
      { q: 'How do I balance column heights automatically?', a: `Use JavaScript to sort testimonials by character count and distribute them to columns in a round-robin order starting with the longest quote in column 1. Alternatively, use the CSS \`column-count: 3\` + \`column-gap: 16px\` approach with \`break-inside: avoid\` on each card — this gives true masonry but can reorder cards reading top-to-bottom per column.` },
      { q: 'How do I animate cards into view on scroll?', a: `Add an \`IntersectionObserver\` that adds an \`.visible\` class when cards enter the viewport. In CSS: \`.tcard { opacity: 0; transform: translateY(16px); transition: opacity .5s, transform .5s }\` and \`.tcard.visible { opacity: 1; transform: none }\`. Add staggered \`transition-delay\` based on the card's column index for a wave effect.` },
      { q: 'How do I add company logos instead of initials avatars?', a: `Replace the \`.avatar\` div with \`<img src="logo.png" alt="Company" class="logo-img">\`. Add \`.logo-img { width: 80px; height: 30px; object-fit: contain; opacity: .7 }\`. Place the logo in the \`.tcard-footer\` alongside the reviewer name and role.` },
      { q: 'How do I export this as a React component?', a: `Create a \`TestimonialCard\` component with \`{body, name, role, rating, featured, dark, avatarGradient}\` props. The masonry grid renders three column arrays split from a \`testimonials\` data array: \`[col1, col2, col3] = [0,3,6].map(i => testimonials.slice(i, i+3))\`. Each column renders a \`<div class="masonry-col">\` mapping to \`TestimonialCard\` components.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the column-based masonry trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why this layout uses three explicit flex columns with align-items start on the parent grid instead of a real CSS masonry value, and how the avatar's dash-av custom property lets one CSS rule accept solid colors, gradients, and translucent rgba values without any extra classes. The same assistant can help optimize it — for instance whether manually distributing testimonials into three hardcoded columns in the markup will visibly unbalance column heights as more are added, or whether the dark-card modifier classes duplicating every text-color rule could be consolidated with CSS custom properties instead. It's also useful for extending the wall: ask it to add a JavaScript-based column-balancing pass that assigns each new testimonial to the currently shortest column, animate cards in with an IntersectionObserver as they scroll into view, or swap initials avatars for real photos with a graceful fallback. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a three-column "testimonial masonry wall" in plain HTML and CSS (no JavaScript required for the base layout) using explicit column divs rather than native CSS masonry.

Requirements:
- A CSS grid with exactly three explicit column child elements, each column itself a flex column with a vertical gap, and align-items start set on the parent grid so columns are only as tall as their own content, allowing cards of different heights to create a staggered "masonry" look purely through natural stacking.
- Each testimonial card must contain a star-rating row, an italicized quote paragraph, and a footer with an avatar, name, and role/company line, wrapped in a semantically appropriate blockquote element.
- The avatar's background must be driven by a single CSS custom property set inline per card so the same avatar rule can accept a solid color, a gradient, or a translucent rgba value without needing separate modifier classes for each case.
- Support a "featured" card variant (a distinct border color and a soft colored box-shadow that elevates specific testimonials without changing their structure) and a "dark" card variant (an inverted color scheme requiring light-text modifier classes on every text element inside it, kept self-contained so the dark card doesn't rely on any parent context).
- Support a partial star rating (e.g. 4 out of 5) by styling one trailing star character with a distinct muted color class rather than removing it from the markup, so the row always renders five star glyphs.
- Cards must lift slightly with a transform and gain a stronger shadow on hover, and the grid must collapse from three columns to two and then to one at defined breakpoints for tablet and mobile widths.`,
    },
  },
};

export default testimonialMasonry;
