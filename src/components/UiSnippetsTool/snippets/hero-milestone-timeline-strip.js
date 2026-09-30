const heroMilestoneTimelineStrip = {
  id: 'hero-milestone-timeline-strip',
  title: 'Hero with Company Milestone Timeline Strip',
  lastmod: '2026-08-31',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="mts-hero">
  <span class="mts-eyebrow">Our story so far</span>
  <h1 class="mts-h1">Six years, one obsession: making invoicing invisible</h1>
  <p class="mts-sub">From two founders in a co-working space to the billing layer behind 40,000 businesses. Here's how we got here.</p>

  <div class="mts-timeline" id="mtsTimeline">
    <div class="mts-track"><div class="mts-track-fill" id="mtsTrackFill"></div></div>

    <div class="mts-point mts-point-active" data-index="0">
      <span class="mts-dot"></span>
      <span class="mts-year">2020</span>
    </div>
    <div class="mts-point" data-index="1">
      <span class="mts-dot"></span>
      <span class="mts-year">2021</span>
    </div>
    <div class="mts-point" data-index="2">
      <span class="mts-dot"></span>
      <span class="mts-year">2023</span>
    </div>
    <div class="mts-point" data-index="3">
      <span class="mts-dot"></span>
      <span class="mts-year">2024</span>
    </div>
    <div class="mts-point" data-index="4">
      <span class="mts-dot"></span>
      <span class="mts-year">2026</span>
    </div>
  </div>

  <div class="mts-detail" id="mtsDetail">
    <h3 id="mtsDetailTitle">Founded in a co-working space</h3>
    <p id="mtsDetailText">Two engineers, tired of chasing late invoices manually, write the first line of code that would become the product.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fbfaf8;color:#201d18}
.mts-hero{max-width:760px;margin:0 auto;padding:72px 24px;text-align:center}

.mts-eyebrow{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#b3541e;margin-bottom:16px}
.mts-h1{font-size:clamp(28px,4vw,40px);font-weight:800;line-height:1.15;letter-spacing:-.02em;margin-bottom:14px}
.mts-sub{font-size:15px;color:#6b6558;line-height:1.6;max-width:520px;margin:0 auto 48px}

.mts-timeline{position:relative;display:flex;justify-content:space-between;align-items:center;margin-bottom:36px;padding:0 4px}
.mts-track{position:absolute;left:0;right:0;top:6px;height:2px;background:#e7e0d3;z-index:0}
.mts-track-fill{height:100%;background:#b3541e;width:0%;transition:width .35s cubic-bezier(.4,0,.2,1)}

.mts-point{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;background:none;border:none;padding:0}
.mts-dot{width:13px;height:13px;border-radius:50%;background:#fbfaf8;border:2.5px solid #d8cfbc;transition:border-color .2s,background .2s,transform .2s}
.mts-point-active .mts-dot{border-color:#b3541e;background:#b3541e;transform:scale(1.15)}
.mts-year{font-size:12.5px;font-weight:700;color:#a39a87;transition:color .2s}
.mts-point-active .mts-year{color:#201d18}
.mts-point:hover .mts-dot{border-color:#b3541e}

.mts-detail{background:#fff;border:1px solid #ece5d6;border-radius:16px;padding:26px 30px;min-height:108px;transition:opacity .2s}
.mts-detail h3{font-size:16.5px;font-weight:800;margin-bottom:8px}
.mts-detail p{font-size:13.5px;color:#6b6558;line-height:1.6;max-width:480px;margin:0 auto}

@media(max-width:560px){
  .mts-timeline{padding:0}
  .mts-year{font-size:10.5px}
  .mts-detail{padding:20px}
}`,

  js: `// A horizontal milestone timeline where clicking any year point updates a
// detail card below it and fills the connecting track up to that point —
// like a tiny progress-bar-driven story rather than a plain bullet list.
var milestones = [
  { year: '2020', title: 'Founded in a co-working space', text: "Two engineers, tired of chasing late invoices manually, write the first line of code that would become the product." },
  { year: '2021', title: 'First 100 paying customers', text: 'Word of mouth alone gets the product to its first 100 small businesses, all before any paid marketing spend.' },
  { year: '2023', title: 'Series A and the finance team is born', text: 'A $12M raise lets us hire our first dedicated finance and compliance engineers, and ship bank-grade reconciliation.' },
  { year: '2024', title: 'Crossed 10,000 businesses', text: 'The platform processes its first $1B in invoices, and the mobile app ships to keep up with demand.' },
  { year: '2026', title: '40,000 businesses and counting', text: "Today the product is the billing layer behind teams in 30 countries, still built by people who once chased their own late invoices." }
];

var points = Array.prototype.slice.call(document.querySelectorAll('.mts-point'));
var trackFill = document.getElementById('mtsTrackFill');
var detailTitle = document.getElementById('mtsDetailTitle');
var detailText = document.getElementById('mtsDetailText');
var detailCard = document.getElementById('mtsDetail');
var activeIndex = 0;

function selectMilestone(index) {
  activeIndex = index;
  var milestone = milestones[index];

  points.forEach(function (point, i) {
    point.classList.toggle('mts-point-active', i === index);
  });

  var fillPercent = points.length > 1 ? (index / (points.length - 1)) * 100 : 0;
  trackFill.style.width = fillPercent + '%';

  detailCard.style.opacity = '0';
  setTimeout(function () {
    detailTitle.textContent = milestone.title;
    detailText.textContent = milestone.text;
    detailCard.style.opacity = '1';
  }, 120);
}

points.forEach(function (point) {
  point.addEventListener('click', function () {
    selectMilestone(parseInt(point.getAttribute('data-index'), 10));
  });
});

selectMilestone(0);`,

  seo: {
    title: 'Hero with Company Milestone Timeline Strip — Free HTML CSS JS Snippet',
    description: 'A story-driven hero section with a clickable horizontal year timeline whose progress track fills as you jump between company milestones and their detail card. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Milestone Timeline Hero — Clickable Year Strip with a Filling Progress Track',
      description: `An "About us" page timeline usually means scrolling past a wall of dates. This hero condenses the whole company story into one interactive strip — a row of clickable year points connected by a track that visually fills up to whichever year is selected, with a detail card below narrating that specific milestone.

**One \`selectMilestone(index)\` function drives three moving parts**

Clicking any \`.mts-point\` calls \`selectMilestone(index)\`, which updates the active dot styling, the track's fill width, and the detail card's title and text — all from a single \`milestones[index]\` entry. Centralizing the update in one function is what keeps a visitor from ever seeing, say, the 2024 dot highlighted while the detail card still shows 2021's story; there is exactly one code path that can change any of the three, and it always changes all three together.

**The track fill is a real percentage, not a fixed-width decoration**

\`fillPercent = (index / (points.length - 1)) * 100\` computes the fill width proportionally to the milestone's position among all milestones, not a hardcoded per-step value. This means adding a sixth milestone doesn't require recalculating any percentages by hand — the formula automatically redistributes the fill points evenly across however many milestones exist, and the last milestone always fills the track to exactly 100%.

**A brief fade instead of an instant content swap**

Rather than replacing \`detailTitle\` and \`detailText\` immediately, \`selectMilestone()\` first fades \`.mts-detail\` to \`opacity: 0\`, swaps the text content inside a \`120ms\` \`setTimeout\`, then fades it back in. Without this, the old story's text would visibly flash straight to the new one with no transition, which reads as an abrupt content jump rather than a deliberate story progression.

**Active state and CSS transitions do the visual heavy lifting**

The dot's border color, fill color, and a slight \`scale\` transform are all handled by a single \`.mts-point-active\` class toggle plus CSS \`transition\` — no JavaScript animates the dot directly. This keeps \`selectMilestone()\`'s job purely about *which* index is active, while CSS handles *how* that state change looks, which is the cleaner separation for anything that's a simple two-state visual toggle.

**Customizing it**

Add a sixth milestone by adding a new object (\`year\`, \`title\`, \`text\`) to the \`milestones\` array and a matching \`.mts-point\` div with \`data-index="5"\` in the HTML — the fill-percentage formula and the click-binding loop both work generically off the array and DOM length, so no other JavaScript needs to change. Auto-advance through milestones on a timer (similar to a testimonial rotator) by wrapping \`selectMilestone\` in a \`setInterval\` call if you want the story to play itself on load.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a year on the timeline', text: 'The dot activates, the track fills up to that point, and the detail card below updates.' },
        { title: 'Notice the fade transition', text: 'The detail card briefly fades before showing the new milestone\'s title and text.' },
        { title: 'Add a new milestone', text: 'Add an entry to the milestones array in the JS panel and a matching .mts-point div with the next data-index in the HTML panel.' },
        { title: 'Change the accent color', text: 'Update the #b3541e color values in the CSS panel to match your brand.' },
        { title: 'Adjust the fade timing', text: 'Change the 120 millisecond setTimeout delay in selectMilestone() for a faster or slower transition.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Clickable horizontal timeline of company milestones with a proportionally filling track',
      'Single selectMilestone() function keeps the active dot, track fill, and detail card in sync',
      'Fill percentage computed from milestone position, so adding entries needs no manual recalculation',
      'Detail card briefly fades between milestones instead of jump-cutting the text',
      'Active-dot styling handled entirely by CSS transitions off one class toggle',
      'Hover state on inactive points previews the accent color before clicking',
      'No timeline or scrollytelling library — plain click handlers and class toggling',
      'Works as a self-contained hero without requiring scroll-linked animation',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'About and company story pages', desc: 'Compress a multi-year company history into one scannable, interactive strip instead of a long scrolling page.' },
      { icon: 'FLOW', title: 'Fundraising and press kit pages', desc: 'Pair with a [press mentions and founder quote hero](/ui-snippets/hero-press-mentions-founder-quote/) for a fuller credibility-building narrative.' },
      { icon: 'FORM', title: 'Careers and culture pages', desc: 'Show prospective hires how the company has grown and what stage it is at right now.' },
      { icon: 'LEARN', title: 'Learn centralized-state UI update patterns', desc: 'Study how one selectMilestone() function avoids the three-moving-parts-out-of-sync bug common in hand-rolled interactive timelines.' },
      { icon: 'DESIGN', title: 'Product roadmap and changelog intro sections', desc: 'Reuse the same clickable-strip pattern for past release milestones instead of company history.' },
      { icon: 'CODE', title: 'Related: Stats Counter Row Hero', desc: 'See the [Stats Counter Row Hero](/ui-snippets/hero-stats-counter-row/) for a complementary numbers-first way to open a company story.' },
    ],
    faqs: [
      { q: 'How is the timeline track fill percentage calculated?', a: 'fillPercent = (index / (points.length - 1)) * 100, where index is the selected milestone\'s position and points.length is the total number of milestones. This proportional formula means the fill always reaches exactly 100% at the last milestone regardless of how many milestones exist, with no hardcoded per-step percentage values to maintain.' },
      { q: 'Why does the detail card fade instead of updating instantly?', a: 'selectMilestone() sets the card\'s opacity to 0, waits 120 milliseconds via setTimeout, swaps in the new title and text, then restores opacity to 1. Updating the text immediately would show an abrupt jump-cut between two unrelated stories; the brief fade signals a transition between chapters instead.' },
      { q: 'What keeps the active dot, the track fill, and the detail card from getting out of sync?', a: 'All three are updated inside the same selectMilestone(index) function call, driven from the same milestones[index] data entry. There is no separate code path that could update, say, the dot styling without also updating the detail text, so the three visual pieces cannot independently drift apart.' },
      { q: 'How do I add a sixth milestone to the timeline?', a: 'Add a new object with year, title, and text fields to the milestones array in the JS panel, and add a matching div with class mts-point and data-index="5" inside #mtsTimeline in the HTML panel. The fill-percentage formula and the click-handler binding loop both read from the array and DOM length dynamically, so no other code needs to change.' },
      { q: 'Can the timeline auto-advance instead of requiring a click?', a: 'Not by default, but it is straightforward to add: wrap a call to selectMilestone((activeIndex + 1) % milestones.length) in a setInterval, similar to how a testimonial rotator auto-advances, and clear the interval on manual click if you want a click to pause the auto-play.' },
      { q: 'Does this require a timeline or scrollytelling library?', a: 'No — it is plain click event listeners, one shared JavaScript function, and CSS transitions triggered by class toggling. There is no scroll-position tracking or third-party animation dependency involved.' },
    ],
    aiPrompt: {
      paragraph: `Rather than reasoning through the sync logic alone, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how selectMilestone() keeps the active dot, the proportional track fill, and the detail card's fade transition all driven from one function call and one shared milestones array, and why the fill percentage is computed as a ratio rather than a fixed per-step value. The same assistant can help you extend it — ask it to add auto-play that advances through milestones on a timer and pauses on manual interaction, animate the track fill with a slight overshoot easing instead of a linear transition, or make the timeline keyboard-navigable with arrow keys for accessibility. It's also useful for a content review: ask whether five milestones is the right number for your company's actual history, or whether grouping into "eras" with a milestone sub-list per era would read better for a longer story. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML, CSS, and vanilla JavaScript centered on a clickable horizontal company-milestone timeline — no timeline or scrollytelling library.

Requirements:
- A row of at least five clickable "point" elements, each showing a year label and a small dot, evenly spaced along a horizontal track line that sits behind them.
- Store each milestone's year, title, and descriptive text in a single JavaScript array. Below the timeline, render a detail card showing the currently selected milestone's title and text.
- Clicking any point must, through one single shared function: mark that point's dot as visually active (distinct border/fill color and a slight scale-up), update the detail card below to that milestone's title and text, and update a progress track fill behind the points so it visually fills from the start up to the clicked point's position.
- Calculate the track fill as a percentage proportional to the clicked point's index divided by the total number of points minus one — not a fixed width per step — so the fill formula automatically adapts if more milestone points are added later without needing per-step values recalculated by hand.
- When switching between milestones, fade the detail card's opacity down, swap its text content, then fade it back up, rather than replacing the text instantly with no transition.
- The first milestone should be selected and its detail shown by default when the page loads.`,
    },
  },
};

export default heroMilestoneTimelineStrip;
