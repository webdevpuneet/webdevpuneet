const tagCloud = {
  id: 'tag-cloud',
  title: 'Tag Cloud',
  lastmod: '2026-06-24',
  category: 'navigation',
  html: `<div class="tc-card">
  <h3>Popular topics</h3>
  <div class="tc-cloud" id="tcCloud"></div>
  <p class="tc-note" id="tcNote">Click a topic to filter.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tc-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:440px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.tc-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:16px}

.tc-cloud{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;line-height:1}
.tc-tag{border:none;background:none;cursor:pointer;font-family:inherit;font-weight:700;padding:4px 6px;border-radius:8px;
  line-height:1.1;transition:transform .12s,background .15s,color .15s}
.tc-tag:hover{transform:scale(1.12)}
.tc-tag.tc-active{background:#eef2ff}

.tc-note{margin-top:16px;font-size:12.5px;color:#94a3b8;font-weight:600}
.tc-note b{color:#4f46e5;font-weight:800}`,

  js: `var TAGS = [
  { label: 'JavaScript', count: 320 }, { label: 'CSS', count: 280 }, { label: 'React', count: 240 },
  { label: 'HTML', count: 210 }, { label: 'Design', count: 120 }, { label: 'Vue', count: 95 },
  { label: 'Accessibility', count: 88 }, { label: 'Performance', count: 76 }, { label: 'TypeScript', count: 160 },
  { label: 'Animation', count: 64 }, { label: 'SEO', count: 52 }, { label: 'Tailwind', count: 140 },
  { label: 'Node', count: 110 }, { label: 'Testing', count: 40 }, { label: 'Git', count: 70 },
];

var cloud = document.getElementById('tcCloud');
var note = document.getElementById('tcNote');
var active = null;

// Map each count into a font-size and colour band between the min and max counts,
// so weight is encoded by both size and hue.
var counts = TAGS.map(function (t) { return t.count; });
var min = Math.min.apply(null, counts), max = Math.max.apply(null, counts);
var MIN_PX = 13, MAX_PX = 32;
var COLORS = ['#94a3b8', '#818cf8', '#6366f1', '#4f46e5'];

function band(count) { return (count - min) / (max - min || 1); }   // 0..1

cloud.innerHTML = TAGS.slice()
  // Optional: shuffle so size, not order, carries the weight (here keep source order).
  .map(function (t) {
    var f = band(t.count);
    var size = (MIN_PX + f * (MAX_PX - MIN_PX)).toFixed(1);
    var color = COLORS[Math.min(COLORS.length - 1, Math.floor(f * COLORS.length))];
    return '<button type="button" class="tc-tag" data-label="' + t.label + '" ' +
      'style="font-size:' + size + 'px;color:' + color + '" title="' + t.count + ' posts">' + t.label + '</button>';
  }).join('');

cloud.addEventListener('click', function (e) {
  var tag = e.target.closest('.tc-tag');
  if (!tag) return;
  var label = tag.dataset.label;
  if (active === label) {
    active = null;
    note.innerHTML = 'Click a topic to filter.';
  } else {
    active = label;
    note.innerHTML = 'Filtering by <b>' + label + '</b>';
  }
  cloud.querySelectorAll('.tc-tag').forEach(function (el) {
    el.classList.toggle('tc-active', el.dataset.label === active);
  });
  // In a real app: filter your list/results by the active tag here.
});`,

  seo: {
    title: 'Tag Cloud — Weighted Tag Cloud HTML CSS JS',
    description: `A weighted tag cloud that sizes and colours each tag by its count, with hover scale and click-to-filter. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Tag Cloud — Tags Sized and Coloured by Weight, with Click-to-Filter',
      description: `A tag cloud (or word cloud) shows a set of tags with the most frequent ones rendered larger, so popularity is visible at a glance. It is a compact way to surface topics, skills, or keywords and let users jump to one. This snippet builds a weighted, clickable tag cloud in plain HTML, CSS, and vanilla JavaScript — sizing and colouring each tag by its count — with no library.

**Weight mapped to size and colour**

Each tag has a count, and the snippet maps that count onto a font-size between a min and max, and onto a colour band, by normalising it against the smallest and largest counts in the set (\`band()\` returns 0–1). So the busiest tag is the biggest and boldest-coloured, the rarest the smallest and faintest, and everything scales in between. Encoding weight two ways — size *and* hue — makes the relative popularity readable even for users who find size-only clouds hard to compare, and it degrades gracefully whatever the actual count range is because it is relative, not absolute.

**Real buttons, not styled text**

Each tag is a \`<button>\`, so it is keyboard-focusable and announces as actionable to assistive tech — important because a tag cloud is navigation, not decoration. They wrap naturally with flexbox (\`flex-wrap\`) and align to a common baseline despite their different sizes, and each scales up slightly on hover for a tactile, clearly-clickable feel. A \`title\` shows the exact count on hover.

**Click to filter**

Clicking a tag marks it active (highlighted) and updates a status line; clicking it again clears the filter — a toggle. In a real app this is where you would filter your list or results by the selected tag; the snippet centralises that so wiring real filtering is a one-line addition in the click handler. Single-active toggling is the common tag-cloud interaction: pick a topic to narrow, click again to reset.

**Relative, robust scaling**

Because sizing is relative to the data's own min and max, the cloud looks right whether counts range 5–50 or 500–50,000 — you never have to retune the pixel sizes for a new dataset. The min/max font sizes and the colour palette are the two knobs you adjust for your design.

**Data-driven and drop-in**

The whole cloud renders from a \`TAGS\` array of \`{ label, count }\`. Swap in your tags — blog topics, product categories, skills, search keywords — and it sizes, colours, and lays them out. It is a clear, dependency-free reference for weighted typographic scaling and accessible tag navigation. The code comment about shuffling is worth acting on for a real cloud: rendering tags in their source order (as this demo does, sorted roughly by count) makes the size gradient look deliberate and orderly, while a genuine word-cloud feel — where size, not position, carries the meaning — comes from shuffling the array before rendering so big and small tags interleave throughout the layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A tag cloud renders with each tag sized and coloured by its count.` },
      { title: 'Read the weights', text: `Bigger, bolder-coloured tags are more popular; hover shows the exact count.` },
      { title: 'Click to filter', text: `Click a tag to mark it active; click again to clear. The status line updates.` },
      { title: 'Wire real filtering', text: `In the click handler, filter your list or results by the active tag.` },
      { title: 'Swap in your data', text: `Replace the TAGS array with your own { label, count } items.` },
      { title: 'Tune the scale', text: `Adjust MIN_PX/MAX_PX and the COLORS palette to fit your design.` },
    ] },
    features: [
      { title: 'Weight to size and colour', text: `Each count maps to a font-size and colour band, normalised to the data range.` },
      { title: 'Relative scaling', text: `Sizing is relative to the set's min/max, so any count range looks right with no retuning.` },
      { title: 'Accessible buttons', text: `Tags are real <button>s — keyboard-focusable and announced as actionable.` },
      { title: 'Flex-wrap layout', text: `Tags wrap and baseline-align despite different sizes.` },
      { title: 'Hover scale + count', text: `Tags scale up on hover and show the exact count via title.` },
      { title: 'Click-to-filter toggle', text: `Selecting a tag highlights it and updates a status line; re-click clears it.` },
      { title: 'Central filter hook', text: `One place to wire real list/result filtering by the active tag.` },
      { title: 'Data-driven & no library', text: `Renders from a TAGS array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Blog and topic navigation', text: `Surface popular topics to filter posts — pair with a [chip filter](/ui-snippets/chip-filter/) for compact equal-weight filters.` },
      { title: 'Search keyword clouds', text: `Show trending search terms as clickable jumps, alongside an [expandable search](/ui-snippets/expandable-search/).` },
      { title: 'Skill and tech showcases', text: `Weight skills by experience on a portfolio or [profile card](/ui-snippets/profile-card/).` },
      { title: 'Product category browsing', text: `Let shoppers jump to popular categories.` },
      { title: 'Analytics term frequency', text: `Visualise word or tag frequency from data.` },
      { title: 'Learning weighted typography', text: `A reference for relative size/colour scaling — compare with a [badge chips](/ui-snippets/badge-chips/) set.` },
    ],
    faqs: [
      { q: 'How is each tag sized?', a: `Every tag's count is normalised to 0-1 against the smallest and largest counts in the set (band() = (count − min) / (max − min)), then mapped to a font-size between MIN_PX and MAX_PX and to a colour band. So the most frequent tag is the largest and most saturated, the least frequent the smallest and faintest, scaled relative to your data — not to fixed thresholds.` },
      { q: 'Why scale relative to the data instead of absolute counts?', a: `Relative scaling means the cloud looks balanced for any dataset — counts of 5 to 50 or 500 to 50,000 both span the full size range — so you never have to retune pixel sizes when the data changes. Absolute thresholds would make a low-count set all tiny or a high-count set all huge. The min/max normalisation adapts automatically.` },
      { q: 'Why are the tags buttons?', a: `A tag cloud is interactive navigation, not decorative text, so each tag is a real <button>: it is keyboard-focusable, works with Enter/Space, and is announced as a control by screen readers. Styling spans would look the same but lose all of that. Using buttons keeps the cloud accessible while still letting CSS make them look like sized text.` },
      { q: 'How do I make clicking a tag actually filter content?', a: `The click handler already tracks the active tag and toggles it. Add your filtering where noted: filter your list/results array by the active label (or null for no filter) and re-render. Because the active state is centralised, you can also drive it from the URL (e.g. ?tag=react) so filters are shareable and survive reloads.` },
      { q: 'How do I use this tag cloud in React, Vue, or Angular?', a: `Compute the size and colour for each tag from the data (a useMemo in React, computed in Vue, a getter in Angular) and render buttons from the TAGS array. Hold the active tag in state, toggle it on click, and derive your filtered content from it. The band()/scaling math is framework-agnostic — only the active state and rendering move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the normalization formula by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the band function maps a raw count into a 0-to-1 value against the dataset's own min and max, and why that makes the font-size and color-band math work identically whether counts range from 5 to 50 or 500 to 50,000. The same assistant can help optimize it — for instance whether rendering tags in strict count order (as this demo does) undermines the classic word-cloud feel compared to shuffling them before render, or whether the four-color COLORS band is coarse enough to make visually similar-weight tags indistinguishable. It's also useful for extending the cloud: ask it to support multi-tag selection instead of a single active toggle, animate tags resizing when the underlying counts update live, or add a search box that filters the visible tags. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a weighted, clickable "tag cloud" in plain HTML, CSS, and JavaScript using relative min/max normalization — no charting library, no framework.

Requirements:
- A data array of tag objects, each with a label and a numeric count, with no fixed or hardcoded size/color values anywhere in the data itself.
- Compute the minimum and maximum count across the entire dataset once, then write a normalization function that maps any single tag's count to a value between 0 and 1 relative to that min and max (not relative to any fixed absolute scale).
- Use that normalized value to interpolate each tag's font-size between a minimum and maximum pixel size, and separately to pick a color from a small ordered palette array (so the least frequent tags get the first/faintest color and the most frequent get the last/boldest).
- Render every tag as a real button element (not a styled span or div) so each is keyboard-focusable and accessible, laid out with flex-wrap so tags of wildly different sizes still wrap and roughly baseline-align.
- Give every tag button a hover state that scales it up slightly for tactile feedback, and a native title/tooltip attribute showing its exact underlying count.
- Clicking a tag must toggle it as the single active filter: clicking an already-active tag clears the filter, clicking a different tag makes it the new active one, and exactly one status line of text must update to reflect either "no filter" or "filtering by X" — with the active tag visually highlighted and every other tag's highlight removed.`,
    },
  },
};

export default tagCloud;
