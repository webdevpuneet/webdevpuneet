const featureTabsShowcase = {
  id: 'feature-tabs-showcase',
  title: 'Feature Tabs Showcase',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<section class="ft-wrap">
  <div class="ft-tabs" role="tablist" id="ftTabs">
    <button class="ft-tab active" role="tab" aria-selected="true" data-i="0">Analytics</button>
    <button class="ft-tab" role="tab" aria-selected="false" data-i="1">Automation</button>
    <button class="ft-tab" role="tab" aria-selected="false" data-i="2">Collaboration</button>
    <span class="ft-ink" id="ftInk"></span>
  </div>

  <div class="ft-panels" id="ftPanels">
    <div class="ft-panel active" role="tabpanel">
      <div class="ft-copy"><h3>Real-time analytics</h3><p>Watch every metric update live with charts that never need a refresh.</p><ul><li>Live event stream</li><li>Custom dashboards</li><li>Export to CSV</li></ul></div>
      <div class="ft-art ft-art-0"><div class="ft-bar" style="--h:40%"></div><div class="ft-bar" style="--h:70%"></div><div class="ft-bar" style="--h:55%"></div><div class="ft-bar" style="--h:90%"></div><div class="ft-bar" style="--h:65%"></div></div>
    </div>
    <div class="ft-panel" role="tabpanel" hidden>
      <div class="ft-copy"><h3>Workflow automation</h3><p>Chain triggers and actions so repetitive work runs itself.</p><ul><li>Visual rule builder</li><li>200+ integrations</li><li>Error retries</li></ul></div>
      <div class="ft-art ft-art-1"><div class="ft-node">⚡</div><div class="ft-wire"></div><div class="ft-node">⚙</div><div class="ft-wire"></div><div class="ft-node">✓</div></div>
    </div>
    <div class="ft-panel" role="tabpanel" hidden>
      <div class="ft-copy"><h3>Team collaboration</h3><p>Comment, mention, and resolve right where the work happens.</p><ul><li>Inline threads</li><li>Live presence</li><li>Role permissions</li></ul></div>
      <div class="ft-art ft-art-2"><div class="ft-chip">@maya</div><div class="ft-chip">@devon</div><div class="ft-chip">@priya</div><div class="ft-chip ft-chip-add">+4</div></div>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;color:#e2e8f0;padding:40px 18px;display:flex;justify-content:center}

.ft-wrap{width:100%;max-width:760px}
.ft-tabs{position:relative;display:flex;gap:4px;background:#111827;border:1px solid #1f2937;border-radius:12px;padding:5px;margin:0 auto 22px;width:fit-content}
.ft-tab{position:relative;z-index:1;border:none;background:none;font-family:inherit;font-size:13.5px;font-weight:600;color:#94a3b8;padding:9px 18px;border-radius:8px;cursor:pointer;transition:color .2s;white-space:nowrap}
.ft-tab.active{color:#fff}
.ft-ink{position:absolute;top:5px;height:calc(100% - 10px);border-radius:8px;background:linear-gradient(120deg,#6366f1,#8b5cf6);transition:transform .32s cubic-bezier(.4,0,.2,1),width .32s;z-index:0}

.ft-panels{position:relative;background:#111827;border:1px solid #1f2937;border-radius:16px;overflow:hidden;min-height:260px}
.ft-panel{display:grid;grid-template-columns:1fr 1fr;gap:22px;padding:26px;opacity:0;transform:translateY(10px);transition:opacity .3s,transform .3s}
.ft-panel.active{opacity:1;transform:none}
.ft-panel[hidden]{display:none}

.ft-copy h3{font-size:20px;font-weight:800;margin-bottom:8px}
.ft-copy p{font-size:13.5px;color:#94a3b8;line-height:1.55;margin-bottom:14px}
.ft-copy ul{list-style:none;display:flex;flex-direction:column;gap:8px}
.ft-copy li{font-size:13px;color:#cbd5e1;padding-left:22px;position:relative}
.ft-copy li::before{content:'✓';position:absolute;left:0;color:#8b5cf6;font-weight:900}

.ft-art{border-radius:12px;background:#0b1120;border:1px solid #1f2937;display:flex;align-items:center;justify-content:center;gap:10px;padding:18px;min-height:180px}
.ft-art-0{align-items:flex-end}
.ft-bar{flex:1;height:var(--h);background:linear-gradient(180deg,#8b5cf6,#6366f1);border-radius:6px 6px 0 0;animation:ftGrow .5s ease both}
@keyframes ftGrow{from{height:0}}
.ft-node{width:46px;height:46px;border-radius:12px;background:#1e293b;border:1px solid #334155;display:flex;align-items:center;justify-content:center;font-size:20px}
.ft-wire{width:26px;height:2px;background:linear-gradient(90deg,#6366f1,#8b5cf6)}
.ft-chip{background:#1e293b;border:1px solid #334155;border-radius:999px;padding:8px 14px;font-size:13px;font-weight:600;color:#c4b5fd}
.ft-chip-add{background:#6366f1;color:#fff;border-color:#6366f1}

@media(max-width:560px){.ft-panel{grid-template-columns:1fr}.ft-tabs{width:100%}.ft-tab{flex:1}}`,

  js: `var tabsWrap = document.getElementById('ftTabs');
var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('.ft-tab'));
var ink = document.getElementById('ftInk');
var panels = Array.prototype.slice.call(document.querySelectorAll('.ft-panel'));

function moveInk(tab) {
  ink.style.width = tab.offsetWidth + 'px';
  ink.style.transform = 'translateX(' + (tab.offsetLeft - 5) + 'px)';
}

function activate(i) {
  tabs.forEach(function (t, j) {
    var on = j === i;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  panels.forEach(function (p, j) {
    if (j === i) { p.hidden = false; requestAnimationFrame(function () { p.classList.add('active'); }); }
    else { p.classList.remove('active'); p.hidden = true; }
  });
  moveInk(tabs[i]);
}

tabs.forEach(function (tab, i) {
  tab.addEventListener('click', function () { activate(i); });
  // Arrow-key navigation between tabs for accessibility.
  tab.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); tabs[(i + 1) % tabs.length].focus(); activate((i + 1) % tabs.length); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); var p = (i - 1 + tabs.length) % tabs.length; tabs[p].focus(); activate(p); }
  });
});

requestAnimationFrame(function () { moveInk(tabs[0]); });
window.addEventListener('resize', function () {
  var active = tabs.filter(function (t) { return t.classList.contains('active'); })[0];
  moveInk(active);
});`,

  seo: {
    title: 'Feature Tabs Showcase — Free HTML CSS JS Tabs Snippet',
    description: `A tabbed feature section with a sliding gradient indicator, animated panel swaps, and arrow-key navigation. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Feature Tabs Showcase — Sliding Indicator and Animated Panels',
      description: `The feature-tabs showcase is the product-marketing pattern where one section presents several capabilities behind a row of tabs — click a tab and the copy plus an illustrative graphic swap in. This snippet builds the complete interaction in plain HTML, CSS, and vanilla JavaScript: a sliding gradient indicator that glides under the active tab, panels that fade and lift as they enter, distinct artwork per feature, and full keyboard support.

**The sliding gradient indicator**

The tab strip contains the three buttons plus a single \`.ft-ink\` element absolutely positioned behind them. On every activation, \`moveInk\` reads the chosen tab's \`offsetLeft\` and \`offsetWidth\` and writes them as a \`translateX\` and \`width\`, so the gradient pill slides to sit exactly under the active tab. Because it animates \`transform\` and \`width\` with a \`cubic-bezier\` ease, the indicator glides smoothly between tabs of different widths instead of snapping. The active tab's text turns white while inactive labels stay muted, reinforcing the selection.

**Panel swaps that animate in**

Each panel is laid out as a two-column grid: descriptive copy with a checkmarked feature list on one side, a custom illustration on the other. Switching panels is a two-step dance that makes the entrance animate. The outgoing panel loses its \`.active\` class and gets the \`hidden\` attribute; the incoming panel has \`hidden\` removed first, then — inside a \`requestAnimationFrame\` so the browser registers the visible state — gets \`.active\` added, which transitions it from \`opacity:0\` and \`translateY(10px)\` to fully visible. Without that rAF gap, the browser would batch the changes and skip the transition.

**Bespoke artwork per feature**

Rather than placeholder images, each panel ships a tiny CSS illustration: the Analytics tab animates a row of bars that grow from zero with a \`ftGrow\` keyframe; the Automation tab draws nodes connected by gradient wires; the Collaboration tab shows a cluster of mention chips with an overflow "+4". These are pure HTML and CSS, so they stay crisp at any size and weigh nothing. Swap them for real screenshots by replacing the \`.ft-art\` contents.

**Keyboard and ARIA**

The strip is a \`role="tablist"\` of \`role="tab"\` buttons, each with \`aria-selected\` that flips on change, and each panel is a \`role="tabpanel"\`. Arrow keys move focus and selection: \`ArrowRight\` and \`ArrowLeft\` wrap around the tab list and activate the newly focused tab, matching the WAI-ARIA tabs pattern so keyboard and screen-reader users get the same experience as mouse users.

**Staying aligned**

Tab widths depend on their text and the viewport, so a \`resize\` listener re-measures and repositions the indicator under the current active tab. On first paint the indicator is placed inside a \`requestAnimationFrame\` to ensure the tabs have been laid out before \`offsetLeft\` is read.

**Customizing it**

Add a fourth tab by copying a button and a panel and the logic adapts automatically — \`tabs\` and \`panels\` are read from the DOM. Recolor the indicator gradient to match your brand, replace the CSS artwork with product screenshots, or change the panel grid to stack copy above art. On screens under 560px the tabs stretch full width and the panels collapse to a single column. Pair it with a [testimonial wall](/ui-snippets/testimonial-wall/) below or a [pricing toggle](/ui-snippets/pricing-toggle/) to round out a feature page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-tab feature section renders with the first tab active.` },
      { title: 'Click a tab', text: `The gradient indicator slides under it and the panel swaps in.` },
      { title: 'Watch the entrance', text: `The new panel fades and lifts into place; bars or wires animate.` },
      { title: 'Use arrow keys', text: `Left and right move focus and selection between tabs.` },
      { title: 'Resize the window', text: `The indicator re-measures to stay under the active tab.` },
      { title: 'Swap in real art', text: `Replace the CSS illustrations with product screenshots.` },
    ] },
    features: [
      { title: 'Sliding gradient indicator', text: `An ink pill glides under the active tab via transform.` },
      { title: 'Animated panel entrance', text: `A double-rAF swap fades and lifts each panel in.` },
      { title: 'CSS-only artwork', text: `Bars, node wires, and chips need no images.` },
      { title: 'Growing bar chart', text: `The analytics art animates from zero height.` },
      { title: 'Full ARIA tabs', text: `tablist, tab, tabpanel, and aria-selected.` },
      { title: 'Arrow-key navigation', text: `Left and right wrap around and activate tabs.` },
      { title: 'Resize-aware indicator', text: `Re-measures so it never drifts off the tab.` },
      { title: 'Auto-adapting logic', text: `Tabs and panels are read from the DOM.` },
    ],
    useCases: [
      { title: 'Product feature pages', text: 'Headline capabilities above a [testimonial wall](/ui-snippets/testimonial-wall/), with each tab swapping in copy and an illustrative graphic through a double-rAF entrance.' },
      { title: 'SaaS pricing flows', text: 'Pair with a [pricing toggle](/ui-snippets/pricing-toggle/) section after the feature tour, with a sliding gradient indicator gliding beneath the active tab.' },
      { title: 'App marketing screens', text: 'Show app screens beside a [phone mockup](/ui-snippets/phone-mockup/), where CSS-only artwork of bars, node wires and chips avoids any image files.' },
      { title: 'Documentation overviews', text: 'Group capability documentation like [animated tabs](/ui-snippets/animated-tabs/) in an overview, with arrow-key navigation following the WAI-ARIA tabs pattern for accessibility.' },
      { title: 'Plan comparison lead-ins', text: 'Lead into a [comparison table](/ui-snippets/comparison-table/) of plans after presenting capabilities, with the analytics bar chart animating up from zero.' },
      { icon: 'CODE', title: 'Related: Magazine Asymmetric Grid Layout', desc: 'See the [Magazine Asymmetric Grid Layout](/ui-snippets/magazine-asymmetric-grid-layout/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the indicator slide under the active tab?', a: `A single absolutely-positioned ink element sits behind the buttons. moveInk reads the active tab's offsetLeft and offsetWidth and applies them as translateX and width, animating transform and width with a cubic-bezier ease so the gradient pill glides between tabs of different widths rather than snapping.` },
      { q: 'Why does swapping panels use requestAnimationFrame?', a: `The incoming panel starts hidden at opacity:0 and translateY(10px). If you removed hidden and added the active class in the same tick, the browser would batch both and skip the transition. Removing hidden first, then adding active inside a requestAnimationFrame, lets the browser paint the hidden-but-visible start state so the fade-and-lift actually animates.` },
      { q: 'Are the illustrations images?', a: `No — each panel's art is pure HTML and CSS. The analytics bars grow from zero with a keyframe, the automation nodes connect via gradient wire divs, and the collaboration chips are styled spans. They stay sharp at any resolution and add no network weight. Replace the .ft-art contents with screenshots if you prefer real imagery.` },
      { q: 'Can keyboard users operate the tabs?', a: `Yes. The strip uses the WAI-ARIA tabs pattern: a tablist of tab buttons with aria-selected and tabpanels. ArrowRight and ArrowLeft move focus and activate the next or previous tab, wrapping around the ends, so keyboard and screen-reader users get the same behavior as mouse users.` },
      { q: 'How do I use this feature tabs showcase in React, Vue, or Angular?', a: `Keep an activeIndex in state and render tabs and panels from arrays. Compute the indicator position from a ref to the active tab in a layout effect (useLayoutEffect / onMounted / ngAfterViewInit) and recompute on resize. Conditionally render or toggle a CSS class for the active panel instead of the hidden attribute. In Tailwind, build the indicator with an absolute gradient element and transition-transform.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the double requestAnimationFrame trick from first principles. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the incoming panel needs its hidden attribute removed before the active class is added inside a requestAnimationFrame, and what would happen visually if both changes were applied in the same synchronous tick. The same assistant can help optimize it — ask whether reading offsetLeft and offsetWidth on every single activation and resize is expensive enough to matter with many tabs, and whether the resize listener should be debounced. It's also useful for extending the showcase: ask it to make the sliding indicator also animate its height for a vertical tab variant, replace the CSS-only bar-chart and node-wire illustrations with real animated SVG artwork, or add swipe gesture support so the panels can be paged through on touch devices. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a tabbed feature showcase in plain HTML, CSS, and JavaScript with a sliding indicator and animated panel transitions — no library.

Requirements:
- A row of tab buttons inside a role tablist container, with a single absolutely-positioned "ink" element behind them that represents the currently active tab.
- On every tab activation (including the very first paint), measure the newly active tab's offsetLeft and offsetWidth and apply them to the ink element as a translateX transform and a width value, with a CSS transition on both transform and width using an easing curve, so the indicator visibly glides between tabs of different widths rather than snapping.
- Each tab must correspond to a content panel; switching tabs must hide the previously active panel and reveal the new one using a combination of the native hidden attribute (to remove it from layout and accessibility trees) and an opacity/transform CSS transition for the visual fade-and-lift entrance.
- The fade-and-lift entrance must only play correctly by removing the hidden attribute first, then adding the class that triggers the transition inside a requestAnimationFrame callback — explain why doing both in the same synchronous step would cause the browser to skip the animation entirely.
- Include at least one small CSS-only illustration per panel built from plain divs (for example animated bars growing from zero height via a keyframe, or a chain of connected node elements) rather than image assets, so each panel has distinct bespoke artwork with zero network weight.
- Wire full keyboard support: ArrowRight and ArrowLeft must move focus and activate the next or previous tab, wrapping around at both ends of the tab list, matching the WAI-ARIA tabs authoring pattern with aria-selected kept in sync on every tab button.
- Add a window resize listener that re-measures and repositions the indicator under whichever tab is currently active, since tab widths may depend on viewport size or font rendering.`,
    },
  },
};

export default featureTabsShowcase;
