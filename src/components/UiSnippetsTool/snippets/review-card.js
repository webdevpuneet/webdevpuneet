const reviewCard = {
  id: 'review-card',
  title: 'Customer Review Card',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="page">
  <div class="section-head">
    <div class="rating-summary">
      <span class="big-score">4.8</span>
      <div>
        <div class="stars-row">★★★★★</div>
        <div class="rating-count">Based on 2,847 reviews</div>
      </div>
    </div>
  </div>

  <div class="reviews-grid">
    <article class="review-card featured">
      <div class="review-top">
        <div class="reviewer">
          <div class="avatar" style="--av:#f59e0b">JD</div>
          <div class="reviewer-info">
            <span class="reviewer-name">James Donovan</span>
            <span class="reviewer-meta">June 2026 · <span class="verified">✓ Verified</span></span>
          </div>
        </div>
        <div class="stars">★★★★★</div>
      </div>
      <h3 class="review-title">Game-changing for my workflow</h3>
      <p class="review-body">Been using this for 3 months and I can't imagine going back. The components are clean, well-documented, and genuinely production-ready. Saved me at least 40 hours on my last project alone.</p>
      <div class="tags-row">
        <span class="tag">Quality</span><span class="tag">Value</span><span class="tag">Support</span>
      </div>
      <div class="review-footer">
        <button class="helpful-btn" onclick="vote(this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 9V5a3 3 0 0 0-6 0v4H4a2 2 0 0 0-2 2l1 11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l1-11a2 2 0 0 0-2-2h-4z"/></svg>
          Helpful <span class="vote-count">34</span>
        </button>
        <button class="report-btn">Report</button>
      </div>
    </article>

    <article class="review-card">
      <div class="review-top">
        <div class="reviewer">
          <div class="avatar" style="--av:#8b5cf6">SR</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Sophia Reed</span>
            <span class="reviewer-meta">May 2026 · <span class="verified">✓ Verified</span></span>
          </div>
        </div>
        <div class="stars stars-4">★★★★<span class="star-empty">★</span></div>
      </div>
      <h3 class="review-title">Solid components, great documentation</h3>
      <p class="review-body">Really impressed with the quality of each snippet. Minor CSS tweaks needed for my design system but the base code is excellent — saved days of work.</p>
      <div class="review-footer">
        <button class="helpful-btn" onclick="vote(this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 9V5a3 3 0 0 0-6 0v4H4a2 2 0 0 0-2 2l1 11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l1-11a2 2 0 0 0-2-2h-4z"/></svg>
          Helpful <span class="vote-count">18</span>
        </button>
        <button class="report-btn">Report</button>
      </div>
    </article>

    <article class="review-card">
      <div class="review-top">
        <div class="reviewer">
          <div class="avatar" style="--av:#10b981">MK</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Marcus Kim</span>
            <span class="reviewer-meta">May 2026 · <span class="verified">✓ Verified</span></span>
          </div>
        </div>
        <div class="stars">★★★★★</div>
      </div>
      <h3 class="review-title">Worth every penny — actually free!</h3>
      <p class="review-body">I kept waiting for the catch. There isn't one. Every single snippet is free, fully functional, and exports to React cleanly. This is genuinely the best frontend resource I've found.</p>
      <div class="review-footer">
        <button class="helpful-btn" onclick="vote(this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 9V5a3 3 0 0 0-6 0v4H4a2 2 0 0 0-2 2l1 11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l1-11a2 2 0 0 0-2-2h-4z"/></svg>
          Helpful <span class="vote-count">52</span>
        </button>
        <button class="report-btn">Report</button>
      </div>
    </article>

    <article class="review-card negative">
      <div class="review-top">
        <div class="reviewer">
          <div class="avatar" style="--av:#ef4444">AL</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Aria Lowe</span>
            <span class="reviewer-meta">April 2026</span>
          </div>
        </div>
        <div class="stars stars-3">★★★<span class="star-empty">★★</span></div>
      </div>
      <h3 class="review-title">Great concept, some rough edges</h3>
      <p class="review-body">The variety is impressive and most components are high quality. A few of the older ones need updating for modern browsers. Overall still a great time-saver.</p>
      <div class="review-footer">
        <button class="helpful-btn" onclick="vote(this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 9V5a3 3 0 0 0-6 0v4H4a2 2 0 0 0-2 2l1 11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2l1-11a2 2 0 0 0-2-2h-4z"/></svg>
          Helpful <span class="vote-count">9</span>
        </button>
        <button class="report-btn">Report</button>
      </div>
    </article>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc;min-height:100vh;padding:32px 20px}
.page{max-width:860px;margin:0 auto}
.section-head{margin-bottom:28px}
.rating-summary{display:flex;align-items:center;gap:16px;background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px 24px;width:fit-content}
.big-score{font-size:44px;font-weight:900;color:#1e293b;line-height:1}
.stars-row{color:#f59e0b;font-size:20px;letter-spacing:2px;margin-bottom:4px}
.rating-count{font-size:13px;color:#64748b}

.reviews-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.review-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px;transition:box-shadow .2s,transform .2s}
.review-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.08);transform:translateY(-2px)}
.review-card.featured{border-color:#c7d2fe;background:linear-gradient(145deg,#fafafe,#fff)}
.review-card.negative{border-color:#fecaca}

.review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.reviewer{display:flex;align-items:center;gap:10px}
.avatar{width:36px;height:36px;border-radius:10px;background:var(--av);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0}
.reviewer-info{display:flex;flex-direction:column;gap:2px}
.reviewer-name{font-size:13px;font-weight:700;color:#1e293b}
.reviewer-meta{font-size:11px;color:#94a3b8}
.verified{color:#10b981;font-weight:600}

.stars{color:#f59e0b;font-size:15px;letter-spacing:1px;white-space:nowrap}
.stars-4 .star-empty,.stars-3 .star-empty{color:#e2e8f0}

.review-title{font-size:14px;font-weight:700;color:#1e293b;line-height:1.3}
.review-body{font-size:13px;color:#475569;line-height:1.65;flex:1}
.tags-row{display:flex;gap:6px;flex-wrap:wrap}
.tag{font-size:10px;font-weight:600;color:#6366f1;background:#eef2ff;border-radius:6px;padding:2px 8px}

.review-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:8px;border-top:1px solid #f1f5f9}
.helpful-btn{display:flex;align-items:center;gap:5px;font-size:12px;color:#64748b;background:none;border:1px solid #e2e8f0;border-radius:6px;padding:4px 10px;cursor:pointer;transition:all .15s;font-family:inherit}
.helpful-btn:hover,.helpful-btn.voted{background:#f0fdf4;border-color:#86efac;color:#16a34a}
.helpful-btn.voted svg{stroke:#16a34a}
.report-btn{font-size:11px;color:#94a3b8;background:none;border:none;cursor:pointer;font-family:inherit;transition:color .15s}
.report-btn:hover{color:#ef4444}

@media(max-width:600px){.reviews-grid{grid-template-columns:1fr}}`,

  js: `function vote(btn) {
  if (btn.classList.contains('voted')) {
    btn.classList.remove('voted');
    btn.querySelector('.vote-count').textContent = parseInt(btn.querySelector('.vote-count').textContent) - 1;
  } else {
    btn.classList.add('voted');
    btn.querySelector('.vote-count').textContent = parseInt(btn.querySelector('.vote-count').textContent) + 1;
  }
}`,

  seo: {
    title: 'Customer Review Card — Star Rating HTML CSS JS Snippet',
    description: `Customer review card with star ratings, verified badge, helpful vote toggle, tag chips, and featured variants. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Customer Review Card — Star Rating System, Helpful Vote Toggle & Verified Badge Pattern`,
      description: `Customer review cards are a trust-building cornerstone of e-commerce, SaaS, and marketplace UIs. A well-designed review card communicates credibility — reviewer identity, star score, verification status, review content, and community validation (helpful votes) — in a compact, scannable format. This snippet builds a full review card grid with rating summary, avatar initials, star rating (full and partial), verified purchase badge, tag chips, togglable helpful vote button, and featured/negative card variants.

Review cards appear on product pages, SaaS pricing pages, testimonials sections, and marketplace listings. The design challenge is fitting reviewer identity, rating, content, and social proof signals into a card that works at both desktop (two-column grid) and mobile (single column) without feeling cramped.

**Avatar initials with CSS custom property colour**

Each avatar uses a two-letter initials abbreviation with a background colour set via \`--av\` CSS custom property. This approach avoids the complexity of loading user profile images while maintaining visual variety across reviewers. The gradient background uses \`background: var(--av)\` which accepts any CSS colour value — so you can pass hex, RGB, or gradient strings. The avatar is a fixed 36×36px rounded square (border-radius: 10px), matching the icon badge pattern from [feature cards](/ui-snippets/feature-cards/).

**Star rating with partial fill**

The full star rating uses HTML entity ★ (U+2605) styled with \`color: #f59e0b\` (amber). Partial ratings — 4-star and 3-star variants — use a \`.star-empty\` span for the unfilled portion styled in \`#e2e8f0\` (light grey). This CSS-only approach requires no SVG masking or JavaScript calculations — just split the star characters at the rating boundary. For a more precise half-star or percentage fill, the [svg-progress-ring](/ui-snippets/svg-progress-ring/) technique applies.

**Helpful vote toggle with optimistic UI**

The "Helpful" button uses a \`voted\` class toggled by the \`vote(btn)\` function. On click, the count increments immediately (optimistic UI) and the button changes to green — no server round-trip required for the visual state. A second click reverses the vote. This pattern matches Amazon, Yelp, and Trustpilot's helpful vote interaction. The \`voted\` state uses \`background: #f0fdf4\` with a green border — a clear confirmation state that doesn't require a modal or toast notification.

**Featured and negative card variants**

The \`.featured\` card uses a subtle indigo border (\`#c7d2fe\`) and light gradient background to elevate the highest-quality review. The \`.negative\` card uses a red border (\`#fecaca\`) — critical for authenticity; showing mixed reviews builds more trust than showing only five-star reviews. Both variants are pure CSS class additions requiring no structural HTML changes.

**Rating summary bar**

The section header shows the overall score as a large number (44px, weight 900) alongside star icons and review count. This "above-the-fold trust signal" pattern matches the approach used by Amazon's product pages and App Store listings. Pair this with a [stats card](/ui-snippets/stats-card/) for numeric KPI displays in dashboard contexts.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A two-column review grid appears with a rating summary above. Four review cards show — featured (indigo border), standard, and negative (red border) variants.` },
      { title: 'Click any Helpful button', text: `The button turns green, the count increments by one. Click again to un-vote and decrement. Each button tracks its own vote state independently.` },
      { title: 'Change the avatar colour', text: `Each \`.avatar\` has an inline \`style="--av:#colour"\` attribute. Pass any CSS colour — hex, hsl, or even a gradient string — to customise each reviewer's avatar.` },
      { title: 'Set the star rating', text: `Use full ★ characters for filled stars and wrap empty stars in \`<span class="star-empty">★</span>\`. Add \`.stars-4\` or \`.stars-3\` to the parent for the right grey styling.` },
      { title: 'Add a featured review', text: `Add \`class="review-card featured"\` for the indigo-bordered highlight card. Add \`class="review-card negative"\` for a red-bordered lower-rated review.` },
      { title: 'Swap review content', text: `Replace reviewer name, date, title, body, and tag chips. Add or remove \`<span class="tag">\` elements inside \`.tags-row\` for category labels.` },
    ] },
    features: [
      { title: 'Togglable helpful vote', text: `\`voted\` class toggles on click — count increments/decrements optimistically. Green state confirms the vote without a toast or page reload.` },
      { title: 'CSS custom property avatars', text: `\`--av\` on each \`.avatar\` sets the background colour inline — one attribute per reviewer, supports any CSS colour value.` },
      { title: 'Partial star rating', text: `\`.star-empty\` span on trailing stars + a variant class (\`.stars-4\`, \`.stars-3\`) on the parent renders 4-star and 3-star ratings with grey unfilled stars.` },
      { title: 'Featured card variant', text: `\`.featured\` adds an indigo border and subtle gradient background — highlights the editor's pick or most helpful review.` },
      { title: 'Negative review variant', text: `\`.negative\` adds a red border — shows authenticity by surfacing lower-rated reviews alongside five-star ones.` },
      { title: 'Verified badge', text: `\`<span class="verified">✓ Verified</span>\` inside reviewer-meta renders a green checkmark badge inline with the review date.` },
      { title: 'Tag chip row', text: `\`.tags-row\` with \`.tag\` spans categorises review aspects (Quality, Value, Support). Easy to remove — just delete the tags-row div.` },
      { title: 'Responsive two-column grid', text: `CSS Grid \`repeat(2, 1fr)\` on desktop, single column on mobile via \`@media(max-width:600px)\`. Cards adapt without layout shifts.` },
    ],
    useCases: [
      { title: 'E-commerce product pages', text: `The primary use case — display customer reviews below the product description with star ratings, verified purchase badges, and helpful vote counts.` },
      { title: 'SaaS pricing and landing pages', text: `Customer testimonials with star ratings build trust on pricing pages. Use the featured variant to highlight the most compelling review above the CTA.` },
      { title: 'App store listing pages', text: `Mobile app landing pages display user reviews with star ratings and review dates. The two-column grid fits naturally in a marketing page layout.` },
      { title: 'Marketplace seller profiles', text: `Seller rating pages on freelance or marketplace platforms show buyer reviews with star scores and verification status per transaction.` },
      { title: 'Agency and portfolio sites', text: `Client testimonials styled as review cards — with initials avatars and star ratings — feel more authentic than plain pull-quote blocks.` },
      { title: 'Course and tutorial platforms', text: `Student reviews on online learning platforms use this pattern: star rating, verified enrolment badge, and a tag row for course aspects (Content, Instructor, Value).` },
    ],
    faqs: [
      { q: 'How do I show a star rating bar chart (1–5 star breakdown)?', a: `Add a \`.rating-bars\` section to the rating summary. Each bar is a \`<div class="bar-row">\` containing the star label, a \`<div class="bar-fill"\` with a percentage width, and a count. Use CSS transition on \`width\` for an animated fill on page load.` },
      { q: 'How do I paginate or load more reviews?', a: `Add a "Load more" button below the grid. On click, fetch more reviews via API, create card elements from a template, and append them to \`.reviews-grid\`. For infinite scroll, use an \`IntersectionObserver\` on a sentinel element below the last card. See the [infinite scroll](/ui-snippets/infinite-scroll/) snippet.` },
      { q: 'How do I sort reviews (Most Helpful, Most Recent)?', a: `Add a \`<select>\` sort control above the grid. On change, read the sort value, sort the review data array, and re-render the cards. Store review objects in a JS array with \`date\`, \`helpful\`, and \`rating\` fields for easy sorting.` },
      { q: 'How do I export this as a React component?', a: `Create a \`ReviewCard\` component accepting \`{name, date, rating, title, body, tags, helpfulCount, verified, variant}\` props. The helpful vote state becomes \`const [voted, setVoted] = useState(false)\` and \`const [count, setCount] = useState(helpfulCount)\`. The parent \`ReviewGrid\` maps a \`reviews\` array to \`ReviewCard\` instances.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the partial-star technique by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how splitting literal star characters into a filled run followed by a separate star-empty span, combined with a stars-4 or stars-3 modifier class on the parent, produces a 4-star or 3-star display with no SVG or JavaScript math involved. The same assistant can help you optimize it — ask whether the vote function's approach of parsing textContent back into an integer on every click is fragile compared to tracking the count as actual JavaScript state per card. It's also useful for extending the card grid: ask it to add sorting controls (most helpful, most recent, highest rated), wire the report button to an actual moderation flow with a confirmation step, or add pagination or infinite scroll once the review count grows large. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a customer review card grid in plain HTML, CSS, and JavaScript with no library.

Requirements:
- Render a rating summary header showing a large aggregate numeric score next to a row of star characters and a review count, all in plain text and CSS (no images, no SVG stars).
- Render each review as a card containing a colored initials avatar (the background color must be set via a CSS custom property assigned inline per card, not a hardcoded class per color), a reviewer name, a date, an optional verified badge, a star rating, a title, a body paragraph, and an optional row of category tag chips.
- Implement partial star ratings (e.g. exactly 4 out of 5, or 3 out of 5) using only literal star characters: render the filled stars as plain text in an accent color, then wrap the remaining unfilled stars in a separate span with a distinct modifier class that renders them in a muted gray color — no SVG masking, no percentage-based clipping.
- Add a "Helpful" vote button on every card that toggles between an unvoted and voted visual state on click, incrementing a visible numeric count when voted and decrementing it back when un-voted, with each button's state tracked completely independently of every other card's button.
- Support at least two special card variants purely through CSS class additions with no structural HTML differences: a "featured" variant with a distinct accent border and background tint, and a "negative" (lower-rated) variant with a distinct warning-colored border, since showing some critical reviews alongside positive ones is itself a trust signal.
- Lay the cards out in a responsive CSS grid: two columns on wider viewports collapsing to a single column below a set breakpoint.`,
    },
  },
};

export default reviewCard;
