const filterReactiveCarousel = {
  id: 'filter-reactive-carousel',
  title: 'Filter-Reactive Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="frc-wrap">
  <div class="frc-chips" id="frcChips">
    <button class="frc-chip frc-chip-active" data-cat="all">All</button>
    <button class="frc-chip" data-cat="audio">Audio</button>
    <button class="frc-chip" data-cat="wear">Wearables</button>
    <button class="frc-chip" data-cat="play">Gaming</button>
    <button class="frc-chip" data-cat="home">Home</button>
  </div>
  <div class="frc-track" id="frcTrack"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.frc-wrap{width:100%;max-width:560px}
.frc-chips{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.frc-chip{font:600 12px system-ui,sans-serif;padding:7px 14px;border-radius:20px;border:1.5px solid #e3e5ea;background:#fff;color:#4b5563;cursor:pointer;transition:border-color .15s,color .15s,background .15s}
.frc-chip:hover{border-color:#6366f1;color:#6366f1}
.frc-chip-active{background:#6366f1;border-color:#6366f1;color:#fff}
.frc-track{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;min-height:150px}
.frc-card{flex:0 0 130px;height:140px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#fff;box-shadow:0 8px 20px rgba(15,23,42,.16);opacity:0;transform:scale(.85) translateY(6px);animation:frcIn .35s cubic-bezier(.25,.8,.3,1) forwards}
.frc-card span{font-size:30px}
.frc-card em{font-style:normal;font-size:12px;font-weight:700}
@keyframes frcIn{to{opacity:1;transform:scale(1) translateY(0)}}
.frc-empty{color:#9ca3af;font-size:13px;padding:40px 0;width:100%;text-align:center}`,

  js: `var ITEMS = [
  { icon: '🎧', label: 'Headphones', cat: 'audio', bg: '#6366f1,#4338ca' },
  { icon: '🔊', label: 'Speaker', cat: 'audio', bg: '#0ea5e9,#0369a1' },
  { icon: '⌚', label: 'Smartwatch', cat: 'wear', bg: '#ec4899,#9d174d' },
  { icon: '🕶️', label: 'Smart Glasses', cat: 'wear', bg: '#8b5cf6,#5b21b6' },
  { icon: '🎮', label: 'Controller', cat: 'play', bg: '#10b981,#047857' },
  { icon: '🕹️', label: 'Console', cat: 'play', bg: '#f59e0b,#b45309' },
  { icon: '💡', label: 'Smart Bulb', cat: 'home', bg: '#14b8a6,#0f766e' },
  { icon: '🌡️', label: 'Thermostat', cat: 'home', bg: '#ef4444,#991b1b' },
];

var track = document.getElementById('frcTrack');
var chips = document.querySelectorAll('.frc-chip');
var activeCat = 'all';

function render() {
  track.innerHTML = '';
  var filtered = ITEMS.filter(function (it) { return activeCat === 'all' || it.cat === activeCat; });
  if (!filtered.length) {
    var empty = document.createElement('div');
    empty.className = 'frc-empty';
    empty.textContent = 'No items in this category yet.';
    track.appendChild(empty);
    return;
  }
  filtered.forEach(function (it, i) {
    var card = document.createElement('div');
    card.className = 'frc-card';
    card.style.background = 'linear-gradient(160deg,' + it.bg + ')';
    card.style.animationDelay = (i * 45) + 'ms';
    card.innerHTML = '<span>' + it.icon + '</span><em>' + it.label + '</em>';
    track.appendChild(card);
  });
}

chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    chips.forEach(function (c) { c.classList.remove('frc-chip-active'); });
    chip.classList.add('frc-chip-active');
    activeCat = chip.dataset.cat;
    render();
  });
});

render();`,

  seo: {
    title: 'Filter-Reactive Carousel — HTML CSS JS Snippet',
    description: 'A carousel whose cards animate in fresh every time a category chip changes the filter — each surviving card gets a staggered scale-and-fade entrance instead of an instant swap. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Filter-Reactive Carousel — Rebuilding the Track on Every Filter Change',
      description: `A filterable grid usually just hides non-matching items in place — this carousel instead *rebuilds the track from scratch* on every filter change, which is what makes the staggered entrance animation possible: every surviving card is a genuinely new DOM element, so its \`animation: frcIn .35s ... forwards\` runs fresh every single time, not just the first time it appears.\n\n**Data, chips, and cards kept separate on purpose**\n\nThe items live in one plain \`ITEMS\` array — each with a \`cat\` field — completely separate from the chip buttons and the rendering logic. \`render()\` doesn't know or care how many categories exist; it just filters \`ITEMS\` by whatever \`activeCat\` currently is and rebuilds the track. That separation is what makes adding an eighth product or a sixth category a one-line data change, never a rendering-logic change.\n\n**The stagger is just an index multiplied by a delay**\n\nEach surviving card gets \`animationDelay = (i * 45) + 'ms'\` where \`i\` is its position in the *filtered* result, not its original position in \`ITEMS\`. That's the detail that makes the stagger always look clean regardless of which filter is active — card 1 of a 3-item filtered result always starts before card 2, with the exact same 45ms rhythm every time, even though card 2 might have been item 6 in the full unfiltered list.\n\n**A real empty state, not a blank track**\n\nWhen a filter matches nothing, \`render()\` doesn't just leave the track empty — it explicitly inserts a labeled empty-state message, because a silently blank carousel reads as broken, not as "no results."`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'All eight cards appear with a staggered scale-in entrance under the "All" filter.' },
        { title: 'Click a category chip', text: 'The track rebuilds — matching cards animate in fresh, non-matching ones disappear instantly.' },
        { title: 'Click back to "All"', text: 'Every card re-enters with the same staggered animation, since it\'s a brand-new render.' },
        { title: 'Add a ninth item', text: 'Add one object to the ITEMS array with an icon, label, category, and gradient — it appears automatically under the right filter.' },
        { title: 'Add a sixth category', text: 'Add one more chip button with a matching data-cat value; no JS changes needed.' },
      ],
    },
    features: [
      'Track rebuilt from scratch on every filter change, so the entrance animation replays every time, not just once',
      'Items, categories, and rendering logic kept fully separate — adding a product is a one-line data change',
      'Staggered scale-and-fade entrance driven by each card\'s position within the filtered results, not the full list',
      'A real, labeled empty state instead of a silently blank track when a filter matches nothing',
      'Filter chips are plain data-driven buttons — highlighting the active one needs no separate state variable',
      'Horizontally scrollable track works at any item count without a layout redesign',
    ],
    useCases: [
      { icon: 'CODE',   title: 'Product category browsers', desc: 'Filter a featured-products carousel by category with a satisfying re-entrance animation each time.' },
      { icon: 'DESIGN', title: 'Portfolio filtering by skill or type', desc: 'Let visitors filter project cards by discipline — design, code, writing — with fresh animated results.' },
      { icon: 'FLOW',   title: 'Content hubs filtered by topic', desc: 'Show blog posts, videos, or resources filtered by tag in a scrollable, animated strip.' },
      { icon: 'STAR',   title: 'Event or session schedule filters', desc: 'Filter a conference schedule carousel by track or time slot with clear visual feedback per change.' },
    ],
    faqs: [
      { q: 'How do I add a new category?', a: 'Add a new .frc-chip button with a matching data-cat value in the HTML, and give at least one ITEMS entry that same cat value — the filtering logic works generically off whatever categories actually appear in the data.' },
      { q: 'Why rebuild the whole track instead of just hiding non-matching cards?', a: 'Hiding cards in place would mean a card that was already visible under the previous filter never re-triggers its CSS animation, since the element never left the DOM. Rebuilding from scratch guarantees every visible card is a fresh element, so the entrance animation always plays.' },
      { q: 'Can multiple categories be active at once?', a: 'The current logic supports one active category at a time (single-select chips). For multi-select, track activeCat as a Set instead of a string, toggle membership on chip click, and change the filter test to check whether the item\'s category is in that set.' },
      { q: 'How do I control the stagger speed?', a: 'Change the 45 in animationDelay = (i * 45) + \'ms\' — a larger number spreads the entrance out more, a smaller one makes it feel closer to simultaneous.' },
      { q: 'Is it accessible?', a: 'Chips are real <button> elements, and the active one is visually distinguished — for full accessibility, add aria-pressed reflecting each chip\'s active state and consider an aria-live region announcing the result count after each filter change.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why rebuilding the entire track from scratch on every filter change (rather than toggling a hidden class on existing cards) is necessary for the staggered entrance animation to replay every single time. It's also worth asking the assistant to convert the single-select category chips into multi-select filters using a Set, or to add a result-count aria-live announcement so screen reader users know how many items matched after each filter change.`,
      prompt: `Build a filterable, animated carousel in plain HTML, CSS, and vanilla JavaScript where clicking a category chip re-filters a horizontally scrollable row of cards with a staggered entrance animation — no library.

Requirements:
- A plain JavaScript array of item objects, each with at minimum an icon/label and a category field, kept completely separate from any DOM markup — no items hardcoded directly in the HTML.
- A row of category filter chip buttons (including an "All" option) above the card track.
- A single render function that filters the items array by whichever category is currently active, completely clears and rebuilds the card track's DOM contents from that filtered result (not merely hiding/showing existing elements), and appends one newly-created card element per matching item.
- Each newly-created card must play a CSS keyframe entrance animation (a combination of scale and opacity, ending at full size and full opacity) every single time it is created, including when re-filtering back to a category that was shown before — this requires that re-filtering literally recreates the DOM elements rather than reusing them.
- Cards must animate in with a staggered delay based on their position within the CURRENT filtered results (not their original position in the full unfiltered array), so the stagger timing always looks correct regardless of which filter produced the current set.
- Clicking a chip must visually mark it as the active filter (and unmark the previously active one) and trigger a re-render.
- If a filter produces zero matching items, display a clear, explicitly-labeled empty state message in the track rather than leaving it silently blank.`,
    },
  },
};

export default filterReactiveCarousel;
