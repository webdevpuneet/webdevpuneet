const scrollTestimonialSequence = {
  id: 'scroll-testimonial-sequence',
  title: 'Scroll Testimonial Sequence',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [],
  html: `<section class="tss-intro"><p>Scroll ↓</p><h1>What Teams Actually Say</h1></section>
<section class="tss-wrap">
  <div class="tss-steps">
    <div class="tss-step" data-index="0">
      <p class="tss-context">Engineering lead, 40-person startup</p>
    </div>
    <div class="tss-step" data-index="1">
      <p class="tss-context">Support manager, e-commerce platform</p>
    </div>
    <div class="tss-step" data-index="2">
      <p class="tss-context">Founder, two-person agency</p>
    </div>
    <div class="tss-step" data-index="3">
      <p class="tss-context">VP Operations, logistics company</p>
    </div>
  </div>
  <div class="tss-sticky">
    <div class="tss-card">
      <div class="tss-quote-mark">&ldquo;</div>
      <p class="tss-quote" id="tssQuote">We cut our deploy time from forty minutes to under four. That alone paid for the migration in the first month.</p>
      <div class="tss-stars" id="tssStars">★★★★★</div>
      <div class="tss-person">
        <div class="tss-avatar" id="tssAvatar">JM</div>
        <div>
          <div class="tss-name" id="tssName">Jordan Mensah</div>
          <div class="tss-role" id="tssRole">Engineering Lead</div>
        </div>
      </div>
      <div class="tss-dots" id="tssDots"></div>
    </div>
  </div>
</section>
<section class="tss-outro"><p>Four teams, four problems, one platform.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0e13;color:#fff;min-height:100vh}
.tss-intro,.tss-outro{min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.tss-intro p{color:#6b7280;font-size:13px;letter-spacing:.14em;text-transform:uppercase}
.tss-intro h1{font-size:clamp(28px,6vw,50px);letter-spacing:-.02em}
.tss-outro p{color:#8b90a8;font-size:15px}
.tss-wrap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,4vw,60px);max-width:1080px;margin:0 auto;padding:0 22px}
.tss-step{min-height:90vh;display:flex;align-items:center}
.tss-context{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4b5060;opacity:.4;transition:opacity .3s}
.tss-step.is-active .tss-context{opacity:1;color:#a78bfa}
.tss-sticky{position:relative}
.tss-card{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;gap:16px;max-width:440px}
.tss-quote-mark{font-size:64px;line-height:1;color:#a78bfa;font-family:Georgia,serif;opacity:.5}
.tss-quote{font-size:clamp(20px,3vw,26px);line-height:1.5;letter-spacing:-.01em;min-height:150px;transition:opacity .3s;font-weight:500}
.tss-stars{color:#facc15;font-size:16px;letter-spacing:2px}
.tss-person{display:flex;align-items:center;gap:12px;margin-top:6px}
.tss-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#22d3ee);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;color:#0d0e13;flex-shrink:0}
.tss-name{font-weight:700;font-size:15px}
.tss-role{font-size:13px;color:#8b90a8}
.tss-dots{display:flex;gap:8px;margin-top:14px}
.tss-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.18);transition:background .25s,transform .25s}
.tss-dot.is-active{background:#a78bfa;transform:scale(1.4)}
@media (max-width:760px){.tss-wrap{grid-template-columns:1fr}.tss-sticky{display:none}.tss-step{min-height:40vh}.tss-context{opacity:1}}`,

  js: `// All testimonial content lives in one array, indexed the same way the
// .tss-step elements are indexed via data-index — a fade-swap on the
// sticky card, driven purely by which step is centered in the viewport.
const TESTIMONIALS = [
  { quote: 'We cut our deploy time from forty minutes to under four. That alone paid for the migration in the first month.', stars: 5, name: 'Jordan Mensah', role: 'Engineering Lead', initials: 'JM' },
  { quote: 'Ticket backlog dropped by half in six weeks. Our customers noticed before our own team did.', stars: 5, name: 'Priya Raman', role: 'Support Manager', initials: 'PR' },
  { quote: 'I run this agency alone. Automations like this are the only reason I can take on enterprise clients at all.', stars: 5, name: 'Theo Alvarez', role: 'Founder', initials: 'TA' },
  { quote: 'Rollout across three warehouses in a single weekend, with zero downtime during peak shipping season.', stars: 4, name: 'Naomi Cole', role: 'VP Operations', initials: 'NC' },
];

const quoteEl = document.getElementById('tssQuote');
const starsEl = document.getElementById('tssStars');
const nameEl = document.getElementById('tssName');
const roleEl = document.getElementById('tssRole');
const avatarEl = document.getElementById('tssAvatar');
const dotsWrap = document.getElementById('tssDots');
const steps = document.querySelectorAll('.tss-step');

TESTIMONIALS.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'tss-dot' + (i === 0 ? ' is-active' : '');
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.children;

function applyTestimonial(index) {
  const t = TESTIMONIALS[index];
  const card = quoteEl.closest('.tss-card');
  // A quick opacity dip-and-restore on the whole card gives the swap a
  // deliberate "next quote" beat instead of an instant text pop, without
  // needing a second element or a crossfade of two stacked cards.
  card.style.opacity = '0';
  window.setTimeout(() => {
    quoteEl.textContent = t.quote;
    starsEl.textContent = '★★★★★☆☆☆☆☆'.slice(5 - t.stars, 10 - t.stars);
    nameEl.textContent = t.name;
    roleEl.textContent = t.role;
    avatarEl.textContent = t.initials;
    card.style.opacity = '1';
  }, 160);
  for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('is-active', i === index);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-active', entry.isIntersecting);
    if (entry.isIntersecting) {
      applyTestimonial(Number(entry.target.getAttribute('data-index')));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

steps.forEach((step) => observer.observe(step));`,

  seo: {
    title: 'Scroll Testimonial Sequence — Free Sticky Quote Story (No Library)',
    description: `A sticky testimonial card that swaps quotes, ratings, and names as narrative context steps scroll past beside it, built with a middle-band IntersectionObserver and zero dependencies.`,
    about: {
      title: 'Scroll Testimonial Sequence — A Sticky Quote Card Narrated by Scroll Position',
      description: `A testimonial carousel needs a visitor to click through it. This snippet instead applies the scrollytelling pattern to social proof: a sticky quote card stays pinned on one side while short context labels scroll past on the other, and the card's content swaps automatically the moment each context label reaches the reader's eye-line — no click, no autoplay timer, no dependency.

**One sticky card, swapped by index, not four separate cards**

Rather than stacking four full testimonial cards and cross-fading between them, there is exactly one \`.tss-card\` in the DOM. \`applyTestimonial(index)\` rewrites its quote, star rating, name, role, and avatar initials in place from a single \`TESTIMONIALS\` array. This keeps the sticky element's height and position completely stable across every swap — nothing resizes or reflows, which matters because \`position: sticky\` elements can visually jump if their own height changes mid-scroll.

**A brief opacity dip gives the swap a beat**

Text is not simply overwritten instantly; \`applyTestimonial\` first fades the whole card to \`opacity: 0\`, waits 160ms, rewrites every field, then fades back to \`1\`. That deliberate pause is what makes the swap read as "the next testimonial" rather than a jarring instant text replacement — a small but important detail for content that's meant to feel like distinct voices, not a single scrolling paragraph.

**Middle-band detection drives both text and the active dot**

The same \`IntersectionObserver\` pattern used elsewhere in this library's scrollytelling snippets — \`rootMargin: '-45% 0px -45% 0px'\` — watches the four narrow \`.tss-step\` context labels. Whichever one is centered in the viewport both triggers \`applyTestimonial\` and toggles that label's own \`is-active\` styling, so the context text on the left and the swapped quote on the right always change at the exact same scroll moment.

**Star ratings render from a single template string**

\`starsEl.textContent\` is built by slicing a ten-character string of five filled and five empty stars at an offset derived from the rating — a compact way to render "4 out of 5 stars" or "5 out of 5 stars" as plain text glyphs with no icon font, SVG, or conditional loop needed.

**Customizing it**

Add a fifth testimonial and a matching \`.tss-step\` with the next \`data-index\` — the observer and dot generator both read the list length dynamically. Swap the star-glyph rendering for real SVG icons if a heavier visual is wanted, or pair with a [scroll stat reveal story](/ui-snippets/scroll-stat-reveal-story/) as a metrics-first companion section right before the testimonials.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `No CDN scripts needed — everything runs on native browser APIs.` },
      { title: 'Scroll into the testimonial section', text: `The sticky card shows the first testimonial while its context label is active.` },
      { title: 'Keep scrolling', text: `Each new context label swaps the card's quote, rating, and person in place.` },
      { title: 'Watch the dot indicator', text: `It tracks which testimonial is currently showing.` },
      { title: 'Scroll back up', text: `Earlier testimonials swap back in as their context label re-enters the middle band.` },
      { title: 'Edit the TESTIMONIALS array', text: `Quotes, ratings, names, and roles all drive from one array.` },
    ] },
    features: [
      { title: 'Zero dependencies', text: `Built entirely on native IntersectionObserver, no carousel or animation library.` },
      { title: 'Single stable card', text: `One sticky element is rewritten in place, so its position never jumps between swaps.` },
      { title: 'Deliberate swap timing', text: `A brief opacity dip gives each testimonial its own distinct beat.` },
      { title: 'Middle-band trigger', text: `Swaps fire when a context label is centered in the viewport, not just visible.` },
      { title: 'Synchronized dot indicator', text: `Tracks the active testimonial from the same observer callback.` },
      { title: 'Text-based star ratings', text: `Renders any rating from a single sliced string, no icon assets.` },
      { title: 'Fully reversible', text: `Scrolling up swaps testimonials back in the correct reverse order.` },
      { title: 'Responsive fallback', text: `Sticky card hides and context labels read as a plain list on narrow viewports.` },
    ],
    useCases: [
      { title: 'SaaS marketing and pricing pages', text: `Narrate multiple customer voices without a click-driven carousel.` },
      { title: 'Case study landing pages', text: `Pair each testimonial with a specific outcome or metric as scroll context.` },
      { title: 'Sales enablement microsites', text: `Walk prospects through varied customer profiles who solved similar problems.` },
      { title: 'Agency or consultancy portfolios', text: `Show client feedback tied to distinct project types.` },
      { title: 'App store or product landing pages', text: `Reveal reviews from different user segments as visitors scroll features.` },
      { title: 'Investor or partner-facing pages', text: `Present customer validation as a paced narrative rather than a static grid.` },
      { icon: 'CODE', title: 'Related: Three.js Scroll Fold Cards', desc: 'See the [Three.js Scroll Fold Cards](/ui-snippets/three-scroll-fold-cards/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why is there only one testimonial card in the DOM instead of four stacked ones?`, a: `Rewriting one card's content in place, rather than cross-fading between four separately sized cards, guarantees the sticky element's height and position never shift between testimonials. Since position: sticky elements can visibly jump if their own box size changes mid-scroll, keeping a single fixed-layout card and only swapping its text content avoids that entirely.` },
      { q: `Why does the card briefly fade out before showing the next testimonial instead of updating instantly?`, a: `applyTestimonial sets the card's opacity to 0, waits 160 milliseconds, rewrites every text field, then restores opacity to 1. That short, deliberate pause is what makes each testimonial swap read as a distinct new voice rather than a jarring instant text replacement — an instant overwrite would make four different people's quotes feel like one continuously mutating paragraph.` },
      { q: `How does the sticky card know which testimonial to show?`, a: `A single IntersectionObserver watches all four narrow .tss-step context labels using a rootMargin of '-45% 0px -45% 0px', which narrows its detection zone to the vertical middle band of the viewport. Whichever context label is centered there triggers applyTestimonial with that label's data-index, so the swap always happens right as the reader's eyes reach that label — the same middle-band technique used across this library's other scrollytelling snippets.` },
      { q: `How do I add a fifth testimonial?`, a: `Add a new entry to the TESTIMONIALS array with a quote, stars, name, role, and initials, and add a matching .tss-step element in the HTML with data-index="4". The dot generator and the IntersectionObserver both derive their behavior from the TESTIMONIALS array length and the live set of .tss-step elements respectively, so no other JavaScript needs to change.` },
      { q: `How do I build this scroll testimonial sequence in React, Vue, or Angular?`, a: `Create the IntersectionObserver inside a mount effect after the step elements have rendered, and store the active testimonial index in component state rather than writing to the DOM directly — render the quote, stars, name, and role from that state so the framework's own re-render handles the swap, and apply the fade timing with a CSS transition on opacity tied to a "swapping" state flag. Disconnect the observer in the cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the testimonial card rewrites a single element's content in place instead of cross-fading between multiple stacked cards, and why the brief opacity dip before each swap matters for making four different testimonials read as distinct voices rather than one continuously changing paragraph. The same assistant can help extend the pattern — ask it to add a small company-logo badge that swaps alongside each testimonial, sync a background color or accent shift per testimonial the way scroll color sections do, or add autoplay-on-idle behavior that advances the sequence if the visitor stops scrolling for a while. Treat it as a working, dependency-free base for your own scroll-driven social proof section.`,
      prompt: `Build a "scroll testimonial sequence" in plain HTML, CSS, and JavaScript using only the native IntersectionObserver API — no external library, no GSAP, no bundler, no carousel plugin.

Requirements:
- A two-column layout: a left column of several short, minimal context labels (one per testimonial, describing the person's role and company), each with a data-index attribute matching its position in a testimonials array; and a right column containing a single sticky card (position: sticky, top: 0, height: 100vh) showing a quote, a star rating, an avatar with initials, a name, and a role.
- Store all testimonial content — quote text, star rating, name, role, and avatar initials — in a single JavaScript array, and write a function that rewrites the one sticky card's content in place from whichever array entry is currently active, rather than creating or toggling between multiple separate card elements.
- Before rewriting the card's content on each swap, briefly fade the card's opacity to 0, wait a short delay (around 150-200 milliseconds), then rewrite the text fields and fade the opacity back to 1, so each testimonial swap has a deliberate visual beat rather than an instant text replacement.
- Render the star rating as plain text star glyphs (filled versus empty) derived directly from a numeric rating value, without using an icon font, SVG icons, or external image assets.
- Use a single IntersectionObserver with a rootMargin that narrows its detection zone to a band across the vertical middle of the viewport (such as -45% top and bottom) watching all the context label elements, and call the card-update function with the intersecting label's index whenever a label becomes active in that middle band.
- Add a row of small dot indicators, one per testimonial, and keep exactly one marked active at all times, synchronized from the same IntersectionObserver callback that swaps the card content.
- Ensure scrolling back up through the context labels re-triggers earlier testimonials in the correct reverse order, with the same fade-swap behavior, entirely from the observer's own bidirectional intersection tracking.`,
    },
  },
};

export default scrollTestimonialSequence;
