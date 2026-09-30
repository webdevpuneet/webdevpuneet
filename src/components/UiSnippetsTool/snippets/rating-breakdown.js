const ratingBreakdown = {
  id: 'rating-breakdown',
  title: 'Star Rating Breakdown Card',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="card">
  <div class="card-header">
    <div class="score-block">
      <div class="score-big">4.7</div>
      <div class="stars-row">
        <span class="star full">★</span><span class="star full">★</span><span class="star full">★</span><span class="star full">★</span><span class="star half">★</span>
      </div>
      <div class="review-count">2,847 reviews</div>
    </div>
    <div class="bars-block">
      <div class="bar-row"><span class="bar-label">5 ★</span><div class="bar-track"><div class="bar-fill" data-pct="72"></div></div><span class="bar-pct">72%</span></div>
      <div class="bar-row"><span class="bar-label">4 ★</span><div class="bar-track"><div class="bar-fill" data-pct="18"></div></div><span class="bar-pct">18%</span></div>
      <div class="bar-row"><span class="bar-label">3 ★</span><div class="bar-track"><div class="bar-fill" data-pct="6"></div></div><span class="bar-pct">6%</span></div>
      <div class="bar-row"><span class="bar-label">2 ★</span><div class="bar-track"><div class="bar-fill" data-pct="2"></div></div><span class="bar-pct">2%</span></div>
      <div class="bar-row"><span class="bar-label">1 ★</span><div class="bar-track"><div class="bar-fill" data-pct="2"></div></div><span class="bar-pct">2%</span></div>
    </div>
  </div>
  <div class="sentiments">
    <span class="badge badge-green">✓ Great value</span>
    <span class="badge badge-green">✓ Easy to use</span>
    <span class="badge badge-yellow">~ Mixed support</span>
  </div>
  <div class="divider"></div>
  <div class="review-snippet">
    <div class="reviewer-row">
      <div class="avatar">JM</div>
      <div>
        <div class="reviewer-name">James M.</div>
        <div class="reviewer-stars">★★★★★ <span class="rev-date">June 2026</span></div>
      </div>
    </div>
    <p class="review-text">"Absolutely love it. Clean interface, fast, and the support team responded within hours. Would recommend to any developer."</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 24px; width: 100%; max-width: 420px; }
.card-header { display: flex; gap: 24px; align-items: flex-start; }
.score-block { display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0; min-width: 80px; }
.score-big { font-size: 48px; font-weight: 800; color: #111827; line-height: 1; }
.stars-row { display: flex; gap: 2px; }
.star { font-size: 18px; color: #f59e0b; }
.star.half { position: relative; color: #d1d5db; }
.star.half::before { content: "★"; position: absolute; left: 0; width: 55%; overflow: hidden; color: #f59e0b; }
.review-count { font-size: 11px; color: #6b7280; }
.bars-block { flex: 1; display: flex; flex-direction: column; gap: 7px; }
.bar-row { display: flex; align-items: center; gap: 8px; }
.bar-label { font-size: 11px; color: #374151; font-weight: 500; width: 28px; flex-shrink: 0; }
.bar-track { flex: 1; height: 7px; background: #f3f4f6; border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; background: #f59e0b; border-radius: 4px; width: 0; transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.bar-pct { font-size: 11px; color: #6b7280; width: 30px; text-align: right; flex-shrink: 0; }
.sentiments { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
.badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
.badge-green { background: #dcfce7; color: #15803d; }
.badge-yellow { background: #fef9c3; color: #a16207; }
.divider { height: 1px; background: #f3f4f6; margin: 16px 0; }
.reviewer-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.avatar { width: 34px; height: 34px; border-radius: 50%; background: #dbeafe; color: #1d4ed8; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.reviewer-name { font-size: 13px; font-weight: 600; color: #111827; }
.reviewer-stars { font-size: 12px; color: #f59e0b; }
.rev-date { color: #9ca3af; font-size: 11px; }
.review-text { font-size: 13px; color: #4b5563; line-height: 1.6; font-style: italic; }`,

  js: `document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          const pct = bar.getAttribute('data-pct');
          bar.style.width = pct + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const card = document.querySelector('.card');
  if (card) observer.observe(card);
});`,

  seo: {
    title: 'Star Rating Breakdown Card — HTML CSS JS Snippet',
    description: 'Amazon-style rating breakdown card with an animated bar chart, sentiment badges, and a review snippet. Pure CSS bars — exports to React, Vue & Angular.',
    about: {
      title: `Star Rating Breakdown Card — Animated Bar Chart, Sentiment Badges & IntersectionObserver Reveal`,
      description: `A rating breakdown card communicates product or service quality at a glance by displaying a numeric aggregate score alongside a distribution histogram of individual star ratings. Amazon pioneered this pattern and it has become standard across e-commerce, SaaS review pages, and app stores. The key insight is that the distribution often tells a more nuanced story than the average — a product with a 4.2 average but a large spike of 1-star reviews signals a quality consistency problem that the average hides.\n\n**HTML structure**\n\nThe card uses a two-column flex layout inside \`.card-header\`: the left \`.score-block\` holds the large numeric score, star icons, and review count; the right \`.bars-block\` holds the five distribution rows. Each \`.bar-row\` is a flex container with a label, a track div containing the fill div, and a percentage label. The fill div's actual width starts at zero and animates to its target value on page entry.\n\n**Half-star CSS technique**\n\nThe half-star is implemented with a pure CSS trick: the star character (★) is displayed in gray as its base color, then a \`::before\` pseudo-element is positioned absolutely over it with the same character in yellow (\`#f59e0b\`). The pseudo-element has \`width: 55%; overflow: hidden\`, which clips it to just over half width, creating a convincing half-fill. No JavaScript or SVG required — just two layered characters.\n\n**Bar animation via IntersectionObserver**\n\nRather than animating on page load (which wastes CPU if the card is below the fold), the bars animate when the card enters the viewport. An \`IntersectionObserver\` with \`threshold: 0.3\` fires when 30% of the card is visible. The callback iterates over all \`.bar-fill\` elements, reads their \`data-pct\` attribute, and sets \`element.style.width = pct + '%'\`. Because the CSS already defines \`transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1)\`, setting the inline style triggers the smooth easing animation. After triggering, \`observer.unobserve()\` prevents re-animation on scroll.\n\n**Color coding the bars**\n\nAll five bars share the same amber fill (\`#f59e0b\`) in this implementation. An alternative approach colors them by star level: 5★ green, 4★ lime, 3★ yellow, 2★ orange, 1★ red. This can be done with \`:nth-child(n)\` selectors on \`.bar-row\` or with individual \`data-color\` attributes read in JavaScript.\n\n**Sentiment badges**\n\nThe badge row uses flex-wrap so badges reflow on narrow viewports. Green badges (\`background: #dcfce7; color: #15803d\`) indicate positive sentiment patterns derived from review text analysis. Yellow-tinted badges signal mixed signals. This badge system is common in Google Play Store and Trustpilot product summaries.\n\n**The reviewer snippet section**\n\nA featured review below the histogram adds social proof specificity. The avatar uses initials (generated from the reviewer name) with a blue background — this is the standard fallback when profile photos are unavailable. The star row uses plain HTML star characters sized to 12px rather than SVG icons, keeping the markup simple.\n\n**Accessibility considerations**\n\nThe numeric score and review count are visible text so no aria labels are needed there. The star elements should have \`aria-hidden="true"\` since the score is already conveyed by the adjacent "4.7" text. The bar chart is decorative — the percentage labels next to each bar already convey the data to screen readers, so no additional ARIA roles are required.\n\n**React integration**\n\nAccept a \`rating\` prop (number), a \`reviews\` prop (total count), a \`distribution\` prop (object mapping star count to percentage), and a \`sentiments\` array. Render bars with inline \`style={{ width: '0%' }}\` initially and use \`useEffect\` with an IntersectionObserver ref to trigger animation on mount. The featured review can be passed as a \`featuredReview\` prop object.\n\n**Use cases beyond products**\n\nThis component adapts well to service ratings (restaurants, hotels), employee survey results (Net Promoter Score distribution), course ratings on learning platforms, and app store quality breakdowns. The bar chart pattern is universally understood and builds immediate credibility compared to a simple star average. See also the [star rating snippet](/ui-snippets/star-rating/) for the interactive input version, the [review card snippet](/ui-snippets/review-card/) for individual testimonials, and the [testimonial masonry snippet](/ui-snippets/testimonial-masonry/) for grid layouts of multiple reviews.`
    },
    howToUse: [
      { title: 'Copy the HTML card structure', text: 'Include the .card-header with both .score-block and .bars-block. Each .bar-row needs a .bar-fill with a data-pct attribute set to the percentage (0–100).' },
      { title: 'Add your rating data', text: 'Change the score-big text, adjust data-pct values on each .bar-fill, and update the .bar-pct text labels to match your real distribution data.' },
      { title: 'Paste the CSS', text: 'The CSS is self-contained. Adjust #f59e0b for your brand color. The .bar-fill transition handles the animation — no changes needed.' },
      { title: 'Add the IntersectionObserver JS', text: 'The script fires when the card scrolls 30% into view and sets each bar width from data-pct. It unobserves after the first trigger to prevent re-animation.' },
      { title: 'Customise sentiment badges', text: 'Edit the .badge elements inside .sentiments. Use badge-green for positive and badge-yellow for mixed. Add badge-red for common negative feedback themes.' }
    ],
    features: [
      'Large score with half-star pure CSS technique',
      'Bar chart animates on IntersectionObserver viewport entry',
      'Percentages driven by data-pct attributes — no JS changes needed',
      'Sentiment badge row with green and yellow variants',
      'Featured review with initials avatar fallback',
      'Fully responsive flex layout',
      'Zero dependencies — vanilla HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: 'APP', title: 'Product Pages', desc: 'E-commerce rating breakdown to build purchase confidence' },
      { icon: 'LEARN', title: 'Course Platforms', desc: 'Show student satisfaction distribution on course listings' },
      { icon: 'DOC', title: 'App Stores', desc: 'Mobile app or SaaS review distribution widget' },
      { icon: 'FLOW', title: 'Service Businesses', desc: 'Hotel, restaurant, or agency quality distribution display' }
    ],
    faqs: [
      { q: 'How do I use this rating card in React?', a: 'Accept a distribution prop (object mapping 1–5 to percentages) and use useEffect with an IntersectionObserver ref to trigger bar width animation after mount.' },
      { q: 'Can I colour each bar differently by star level?', a: 'Yes — use :nth-child CSS selectors on .bar-row .bar-fill or set data-color attributes and read them in the JS to apply different background colors per row.' },
      { q: 'How do I make the stars interactive for user input?', a: 'See the interactive star rating snippet at /ui-snippets/star-rating/ for a click-and-hover input version.' },
      { q: 'Can I fetch real rating data from an API?', a: 'Yes — replace the hardcoded data-pct values by reading your API response and setting element.style.width directly in JS, then trigger the transition with a requestAnimationFrame.' },
      { q: 'How do I export this rating card to Vue, Angular, or Tailwind?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the bar and badge styles become utility classes, a Vue 3 single-file component with the IntersectionObserver logic in script setup, and an Angular standalone component. Each converter preserves the markup, CSS bar animation, and behaviour — the observer that triggers the bar fill is deferred to the framework mount lifecycle (useEffect, onMounted, or ngAfterViewInit), so the card animates the same way in React, Vue, and Angular. For production, pass the distribution in as a component prop or input instead of reading data-pct attributes.' }
    ],
    aiPrompt: {
      paragraph: `You do not need to piece together the half-star trick or the reveal timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the half-star's before pseudo-element, clipped to 55% width with overflow hidden, sits layered over the gray base star to fake a partial fill with no SVG or JavaScript involved, and why the bar-fill animation is triggered by an IntersectionObserver rather than firing immediately on page load. The same assistant can help you optimize it — ask whether observing the whole .card element and calling unobserve once is the right granularity, or whether it should observe each .bar-row individually for a staggered reveal. It's also useful for extending the card: ask it to color-code each star-level bar differently, add a filter that shows only reviews matching the clicked bar's star level, or wire the sentiment badges to real keyword-extraction results from review text. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a star rating breakdown card in plain HTML, CSS, and JavaScript with no library — a big aggregate score, a 5-to-1-star distribution bar chart, sentiment badges, and a featured review snippet.

Requirements:
- Render a large numeric average score next to a row of star characters, where a fractional star (e.g. .7) is achieved with pure CSS: display a base star character in gray, then layer a before pseudo-element containing the same character in the accent color, absolutely positioned over it and clipped with a percentage width and overflow hidden matching the fractional amount — no SVG, no JavaScript-driven partial fill.
- Render five distribution rows (5 star down to 1 star), each with a label, a track bar, and a percentage caption, where every bar-fill element starts at 0% width in its inline style and carries its target percentage in a data attribute.
- Do not animate the bars on page load. Instead, use an IntersectionObserver watching the card container with a partial visibility threshold (e.g. 0.3): only when the card scrolls into view should the code read each bar's data-percentage attribute and set its actual width, letting the existing CSS width transition animate it in. Call unobserve once triggered so it never re-animates on repeated scrolling.
- Add a row of small sentiment badges with at least two visual variants (e.g. a positive/green style and a mixed/yellow style) reflecting short extracted phrases.
- Add a featured single review below a divider, including an initials-based avatar (derived from the reviewer's name, not an image) as the fallback for a missing profile photo.`,
    },
  },
};

export default ratingBreakdown;
