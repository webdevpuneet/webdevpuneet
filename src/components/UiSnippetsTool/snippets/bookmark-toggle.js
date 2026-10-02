const bookmarkToggle = {
  id: 'bookmark-toggle',
  title: 'Bookmark Toggle',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="bk-list" id="bkList"></div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a;display:flex;justify-content:center;padding:28px 18px}

.bk-list{width:100%;max-width:380px;display:flex;flex-direction:column;gap:10px}
.bk-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;box-shadow:0 10px 28px -22px rgba(0,0,0,.3)}
.bk-meta{min-width:0;flex:1}
.bk-title{font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bk-sub{font-size:11.5px;color:#94a3b8;margin-top:2px}

.bk-btn{flex-shrink:0;width:38px;height:38px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#94a3b8;transition:background .15s,color .15s,border-color .15s}
.bk-btn:hover{background:#f1f5f9;color:#64748b}
.bk-btn svg{width:19px;height:19px;transition:transform .25s cubic-bezier(.34,1.56,.64,1)}
.bk-btn .bk-flag{fill:none;stroke:currentColor;stroke-width:2;transition:fill .2s}
.bk-btn.on{color:#f59e0b;border-color:#fde68a;background:#fffbeb}
.bk-btn.on .bk-flag{fill:#f59e0b}
.bk-btn.pop svg{animation:bkPop .4s ease}
@keyframes bkPop{30%{transform:scale(1.35)}60%{transform:scale(.9)}}

.bk-count{font-size:11px;font-weight:700;color:#94a3b8;min-width:30px;text-align:left}`,

  js: `var DATA = [
  { id: 1, title: 'Designing for accessibility', sub: 'a11y-weekly.com', saves: 1240, saved: false },
  { id: 2, title: 'The cost of abstraction', sub: 'engineering blog', saves: 884, saved: true },
  { id: 3, title: 'CSS container queries in depth', sub: 'web.dev', saves: 2310, saved: false },
  { id: 4, title: 'Writing better commit messages', sub: 'github guide', saves: 567, saved: false }
];

var list = document.getElementById('bkList');

var FLAG = '<svg viewBox="0 0 24 24"><path class="bk-flag" d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"></path></svg>';

function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : String(n); }

DATA.forEach(function (item) {
  var row = document.createElement('div');
  row.className = 'bk-item';

  var meta = document.createElement('div');
  meta.className = 'bk-meta';
  meta.innerHTML = '<div class="bk-title">' + item.title + '</div><div class="bk-sub">' + item.sub + '</div>';

  var count = document.createElement('span');
  count.className = 'bk-count';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bk-btn';
  btn.innerHTML = FLAG;
  btn.setAttribute('aria-label', 'Bookmark');

  function paint(animate) {
    btn.classList.toggle('on', item.saved);
    btn.setAttribute('aria-pressed', item.saved ? 'true' : 'false');
    count.textContent = fmt(item.saves);
    if (animate && item.saved) {
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
    }
  }

  btn.addEventListener('click', function () {
    item.saved = !item.saved;
    item.saves += item.saved ? 1 : -1; // optimistic count update
    paint(true);
  });

  row.appendChild(meta); row.appendChild(count); row.appendChild(btn);
  list.appendChild(row);
  paint(false);
});`,

  seo: {
    title: 'Bookmark Toggle — Free Save Button HTML CSS JS Snippet',
    description: `A bookmark / save toggle button with a fill animation, optimistic save count, and accessible pressed state. Copy-paste or export to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Bookmark Toggle — Animated Save Button with Count',
      description: `A bookmark toggle is the save-for-later button beside an article, product, or post — the flag or ribbon that fills when you tap it and tracks how many people saved the item. This snippet builds a polished, accessible one in plain HTML, CSS, and vanilla JavaScript: an outline-to-filled icon with a springy pop animation and an optimistic save count, all with no dependency.

**Outline-to-filled with one SVG path**

The icon is a single \`<path>\` whose \`fill\` is \`none\` by default and switches to the accent color when saved — toggled purely by an \`.on\` class on the button. There's no icon swap or second graphic: the same flag morphs from outline to solid via CSS, which keeps the markup tiny and the transition (\`fill .2s\`) clean.

**A spring "pop" on save**

When you bookmark an item the icon plays a \`bkPop\` keyframe — scaling up past 1 then settling — using a \`cubic-bezier(.34,1.56,.64,1)\` overshoot ease that gives it a tactile, rewarding snap. The animation is restarted reliably with the \`void btn.offsetWidth\` reflow trick so it replays on every save, and it only fires on the save direction (not un-save) to reinforce the positive action.

**Optimistic count updates**

Clicking flips \`item.saved\` and immediately adjusts \`item.saves\` by ±1, then re-renders — the count moves the instant you tap rather than waiting for a server round-trip. This optimistic pattern is what makes save buttons feel responsive; in production you'd POST the change and only roll back if the request fails. A \`fmt()\` helper abbreviates large counts (\`1240 → 1.2k\`) the way social UIs do.

**Accessible toggle semantics**

Each button is a real \`<button>\` with \`aria-label\` and an \`aria-pressed\` that reflects the saved state, so screen readers announce "Bookmark, pressed" and keyboard users can Tab and toggle with Enter or Space — no roles or key handling to wire up.

**Per-item encapsulation**

Each row builds its own \`paint()\` closure over its data, so state stays local to the item and there's no shared lookup or re-render of the whole list on every click. That structure scales to long feeds and maps directly onto a component model where each card owns its saved state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A list of items renders, each with a save count and a bookmark button.` },
      { title: 'Click the bookmark', text: `The flag fills with color and pops with a springy animation.` },
      { title: 'Watch the count', text: `The save count increments immediately as an optimistic update.` },
      { title: 'Click again to un-save', text: `The flag returns to an outline and the count decrements.` },
      { title: 'Tab and press Enter', text: `The button is keyboard operable with an aria-pressed state.` },
      { title: 'Wire to your API', text: `POST the change inside the click handler and roll back on error.` },
    ] },
    features: [
      { title: 'Outline-to-filled icon', text: `One SVG path morphs via an .on class — no icon swap.` },
      { title: 'Spring pop', text: `An overshoot cubic-bezier gives a tactile save snap.` },
      { title: 'Reliable replay', text: `The reflow trick restarts the animation every save.` },
      { title: 'Optimistic count', text: `The number updates instantly on tap, ±1.` },
      { title: 'Abbreviated counts', text: `fmt() shows 1.2k-style figures for large numbers.` },
      { title: 'Accessible toggle', text: `Real button with aria-pressed and aria-label.` },
      { title: 'Per-item state', text: `Each row owns its data in a local closure.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — no icon library.` },
    ],
    useCases: [
      { title: 'Save for later reading lists', text: 'Let readers bookmark articles beside an [article card](/ui-snippets/article-card/), with an outline flag that fills through an `.on` class on the same SVG path.' },
      { title: 'Wishlist alternatives', text: 'Offer a flag-style option instead of a heart like a [favorite button](/ui-snippets/favorite-button/), with an optimistic saved count that updates instantly.' },
      { title: 'Feeds and content lists', text: 'Save posts in a [social post card](/ui-snippets/social-post-card/), with a spring pop from an overshooting cubic-bezier giving a tactile save snap.' },
      { title: 'Product saves', text: 'Let shoppers save items from a [product card](/ui-snippets/product-card/), with a reflow trick restarting the animation on every save.' },
      { title: 'Optimistic state learning', text: 'Study a reference for optimistic toggle buttons, where `aria-pressed` conveys state and the displayed number moves plus or minus one.' },
      { icon: 'CODE', title: 'Related: Contact Picker Button', desc: 'See the [Contact Picker Button](/ui-snippets/contact-picker-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the icon fill without swapping graphics?', a: `The bookmark is a single SVG path with fill: none. Adding an .on class to the button sets fill to the accent color with a short CSS transition, so the same outline shape becomes solid. There's no second icon or image — one path handles both states.` },
      { q: 'What is the optimistic count update?', a: `Clicking immediately flips the saved flag and adjusts the count by plus or minus one before any network call, so the number reacts the instant you tap. In production you'd send the change to your server in the same handler and only revert if the request fails, which keeps the UI feeling instant.` },
      { q: 'Why does the pop animation only play when saving?', a: `The pop is a positive reinforcement for the save action, so paint() triggers it only when the new state is saved, not when un-saving. It's restarted with the void offsetWidth reflow trick so it replays reliably on every save rather than only the first time.` },
      { q: 'Is it accessible?', a: `Yes. Each control is a native button with an aria-label and an aria-pressed attribute that mirrors the saved state, so assistive tech announces it as a pressed or unpressed toggle. Being a real button, it's focusable and operable with Enter or Space without any extra key handling.` },
      { q: 'How do I use this bookmark toggle in React, Vue, or Angular?', a: `Hold the saved flag and count in state per item and bind the .on class and aria-pressed to it. Do the optimistic ±1 in the click handler alongside your API call. For the pop, toggle an animation class with a key change or by removing and re-adding it. In Tailwind, switch the path fill with a conditional class on the saved state.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the reflow trick or the per-item closures by hand to see how this holds together. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why "void btn.offsetWidth" is needed before re-adding the pop class, and how each row's paint function closes over its own item object instead of sharing state across the list. The same assistant can help optimize it — asking whether building each row with createElement and innerHTML on every load is the cheapest approach for a long list, or whether the fmt() thousands-abbreviation function handles negative or fractional counts correctly. It's also a good way to extend the widget: ask it to persist saved state to localStorage, animate the count number rolling up and down instead of snapping, or add an undo toast after unsaving. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a list of "bookmark/save toggle" buttons in plain HTML, CSS, and JavaScript using a single SVG path per button and optimistic local state — no icon library, no framework.

Requirements:
- Render a list of items from a plain JavaScript array of objects (each with a title, subtitle, a save count, and a boolean saved flag), building the DOM for each row with document.createElement rather than a big innerHTML string for the whole list.
- Each row's bookmark control must be a single SVG path whose fill is none by default; toggling a CSS class on the parent button (not swapping to a second icon) must switch the fill to a solid accent color, so the outline-to-filled effect comes from exactly one path element.
- Clicking the button must flip that item's saved boolean and adjust its save count by exactly plus or minus one in the same handler, before any network call, so the displayed count updates optimistically and instantly.
- When (and only when) an item transitions to saved, play a scale-based "pop" keyframe animation on the icon that overshoots past full size before settling, and make sure the animation reliably replays on every single save click even if the previous animation already finished — including forcing a reflow between removing and re-adding the animation class so the browser doesn't skip a repeat.
- Abbreviate large save counts (e.g. 1240 becomes "1.2k") with a small formatting helper function.
- Each button must be a real button element with an aria-label and an aria-pressed attribute that reflects the current saved state, so it is fully keyboard operable and correctly announced by assistive tech.`,
    },
  },
};

export default bookmarkToggle;
