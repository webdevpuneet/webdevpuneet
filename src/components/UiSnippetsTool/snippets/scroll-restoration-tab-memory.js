const scrollRestorationTabMemory = {
  id: 'scroll-restoration-tab-memory',
  title: 'Scroll Position Memory Across Tab Switches',
  lastmod: '2026-08-28',
  category: 'scroll',
  html: `<div class="demo">
  <div class="tabs" role="tablist">
    <button class="tab-btn active" role="tab" aria-selected="true" data-tab="feed">Feed</button>
    <button class="tab-btn" role="tab" aria-selected="false" data-tab="following">Following</button>
    <button class="tab-btn" role="tab" aria-selected="false" data-tab="saved">Saved</button>
  </div>

  <div class="panel-wrap">
    <div class="panel" id="panel-feed" role="tabpanel" data-panel="feed"></div>
    <div class="panel" id="panel-following" role="tabpanel" data-panel="following" hidden></div>
    <div class="panel" id="panel-saved" role="tabpanel" data-panel="saved" hidden></div>
  </div>
  <p class="hint">Scroll down in Feed, switch to Following, then switch back — Feed remembers exactly where you left off instead of resetting to the top.</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 380px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }

.tabs { display: flex; gap: 2px; background: #f1f5f9; padding: 3px; border-radius: 10px; }
.tab-btn { flex: 1; padding: 8px; border: none; background: transparent; border-radius: 7px; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; font-family: inherit; }
.tab-btn:hover { color: #334155; }
.tab-btn.active { background: #fff; color: #4338ca; box-shadow: 0 1px 3px rgba(15,23,42,0.1); }
.tab-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 1px; }

.panel-wrap { height: 300px; border: 1px solid #e2e8f0; border-radius: 14px; background: #fff; overflow: hidden; }
.panel { height: 100%; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
.feed-item { padding: 12px; border-radius: 10px; background: #f8fafc; font-size: 12px; color: #334155; }
.feed-item strong { display: block; font-size: 12.5px; color: #111827; margin-bottom: 3px; }

.hint { font-size: 11px; color: #94a3b8; line-height: 1.5; }`,
  js: `const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
const panels = Array.from(document.querySelectorAll('.panel'));

// Every panel's scroll position is stored independently, keyed by its own
// tab name — this is the entire mechanism. Nothing clever is needed beyond
// "remember a number per panel, restore it when that panel becomes visible
// again" — the trick is doing the SAVE at the right moment (just before
// switching away) and the RESTORE at the right moment (just after the
// panel becomes visible again, not before, since scrollTop can't be set
// meaningfully on a hidden element).
const scrollMemory = {};

function populatePanel(name, count) {
  const panel = document.getElementById('panel-' + name);
  panel.innerHTML = Array.from({ length: count }, (_, i) => \`
    <div class="feed-item">
      <strong>\${name === 'feed' ? 'Post' : name === 'following' ? 'Update' : 'Saved item'} #\${i + 1}</strong>
      Some representative content for this list item, long enough to make each panel genuinely scrollable so the memory effect is clearly visible.
    </div>
  \`).join('');
}

populatePanel('feed', 24);
populatePanel('following', 18);
populatePanel('saved', 12);

let activeTab = 'feed';

function switchTab(nextTab) {
  if (nextTab === activeTab) return;

  const activePanel = document.getElementById('panel-' + activeTab);
  // Save happens HERE — the very last moment the outgoing panel is still
  // visible and its scrollTop is still meaningful — not on some earlier
  // debounced scroll listener, and not after it's already hidden (a hidden
  // element's scrollTop is frozen at whatever it last was, which happens to
  // still work here, but relying on that rather than saving explicitly at
  // the moment of switching is fragile and less obviously correct).
  scrollMemory[activeTab] = activePanel.scrollTop;
  activePanel.hidden = true;

  const nextPanel = document.getElementById('panel-' + nextTab);
  nextPanel.hidden = false;
  // Restore happens only AFTER the panel is unhidden — setting scrollTop on
  // a display:none element does nothing (or is unreliable across browsers),
  // so the restore step must happen strictly after visibility is restored.
  nextPanel.scrollTop = scrollMemory[nextTab] || 0;

  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === nextTab;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  activeTab = nextTab;
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});`,
  seo: {
    title: 'Scroll Position Memory Across Tab Switches — Each Panel Remembers Where You Left Off',
    description: 'A tabbed interface where each panel independently remembers its own scroll position, restored exactly when switching back — saved at the precise moment a panel is hidden and restored only after it becomes visible again.',
    about: {
      title: 'Scroll Position Memory Across Tabs — Getting the Timing Right',
      description: `Switching tabs and finding your scroll position reset to the top is a small but genuinely annoying UX papercut — you were fifteen posts deep in a feed, glanced at another tab, and now you're scrolling back down from scratch. The fix is conceptually simple (remember a number, restore it later) but has exactly one timing detail that determines whether it actually works: *when* you save and *when* you restore.

**One scroll position per panel, stored independently**

\`scrollMemory\` is a plain object keyed by tab name, holding each panel's last known \`scrollTop\` value. There's no shared or global scroll state — each panel's memory is entirely independent of the others, which is what allows switching between three, five, or any number of tabs to correctly preserve each one's own distinct scroll position simultaneously, not just "the last tab you were on before this one."

**Saving happens at the exact moment a panel is about to be hidden, not earlier**

\`switchTab()\` reads \`activePanel.scrollTop\` and writes it into \`scrollMemory\` as the very first thing it does — *before* hiding that panel. This is deliberate: it would be tempting to instead save scroll position continuously via a debounced \`scroll\` event listener, but that adds unnecessary complexity and a class of subtle staleness bugs (what if the debounce hasn't fired yet at the exact moment of a fast tab switch?) for zero actual benefit — the only moment that genuinely matters is the last one before the panel disappears, so that's the only moment the code reads it.

**Restoring happens only after the panel becomes visible again, not before**

Setting \`scrollTop\` on an element while it's still \`hidden\` (or \`display: none\`) is unreliable — a hidden element generally has no meaningful scrollable viewport to apply a scroll position to yet. \`switchTab()\` unhides the incoming panel (\`nextPanel.hidden = false\`) *before* setting its \`scrollTop\`, guaranteeing the browser has a genuinely visible, laid-out scrollable element to apply the restored position to at the moment it's set, rather than trying to restore scroll on an element that isn't rendered yet.

**Why this is simpler than it might first seem**

There's no scroll-tracking library, no requestAnimationFrame loop, no MutationObserver — the entire mechanism is two lines: read \`scrollTop\` right before hiding, write \`scrollTop\` right after showing. The apparent complexity of "remembering scroll position" mostly comes from getting these two moments right, not from the storage mechanism itself, which is intentionally as plain as possible.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll down in the Feed tab', text: 'Scroll partway through the list of feed items.' },
        { title: 'Switch to the Following tab', text: 'It opens at its own top (or wherever it was last left, on a subsequent visit) — Feed\'s scroll position is saved the instant you switch away from it.' },
        { title: 'Switch back to Feed', text: 'It restores to exactly the scroll position you left it at, rather than resetting to the top.' },
        { title: 'Scroll in Following, then check Saved, then return to Following', text: 'Each panel maintains its own independent scroll memory simultaneously — switching through multiple tabs doesn\'t interfere with any of their individually remembered positions.' },
        { title: 'Adapt scrollMemory for your own tabbed content', text: 'Apply the same save-on-hide, restore-after-show pattern to any tabbed or panel-swapping UI where scroll position should persist per panel.' },
      ],
    },
    features: [
      'Each panel remembers its own scroll position completely independently of every other panel',
      'Scroll position is saved at the precise last moment a panel is still visible, right before it\'s hidden',
      'Scroll position is restored only after a panel becomes visible again, avoiding unreliable scrollTop writes on a hidden element',
      'No debounced scroll listener, requestAnimationFrame loop, or external library — the entire mechanism is two well-timed lines',
      'Works correctly regardless of how many tabs exist or how many times a user switches back and forth between them',
      'Tab buttons maintain proper ARIA state (aria-selected) in sync with which panel is actually visible',
      'Each panel is populated with enough content to be genuinely scrollable, making the memory effect clearly demonstrable',
    ],
    useCases: [
      { icon: 'FEED', title: 'Social feed and content tabs', desc: 'Feed, Following, and Saved-style tabbed content views where users frequently switch tabs and expect their reading position preserved.' },
      { icon: 'SETTINGS', title: 'Multi-tab settings or dashboard panels', desc: 'Any tabbed interface with independently scrollable panel content benefits from per-panel scroll memory.' },
      { icon: 'INBOX', title: 'Inbox category tabs', desc: 'Email or notification inboxes with category tabs (Primary, Social, Promotions) where scroll position loss between tabs is a common frustration.' },
      { icon: 'DOCS', title: 'Multi-section documentation viewers', desc: 'Tabbed documentation or help content where users bounce between related sections and expect to return to where they left off.' },
      { icon: 'CODE', title: 'Related: Scroll Transformation Story', desc: 'See the [Scroll Transformation Story](/ui-snippets/scroll-transformation-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why save the scroll position right before hiding a panel instead of tracking it continuously?', a: 'Continuously tracking scroll via a debounced listener adds unnecessary complexity and a class of subtle staleness bugs if a fast tab switch happens before the debounce fires. Since the only moment that actually matters is the very last one before the panel disappears, reading scrollTop at exactly that moment is simpler and strictly correct — there\'s no benefit to tracking it any earlier or more frequently.' },
      { q: 'Why does the panel need to be unhidden BEFORE setting its scrollTop, not after?', a: 'Setting scrollTop on a hidden (or display:none) element is unreliable, since the element generally has no meaningful scrollable viewport at that point. Unhiding the panel first guarantees the browser has a genuinely visible, laid-out element to apply the restored scroll position to.' },
      { q: 'Does each tab maintain its own independent scroll memory, or is there just one shared "last scroll position"?', a: 'Each tab\'s scroll position is stored independently in the scrollMemory object, keyed by that tab\'s own name. Switching through several tabs in any order preserves every one of their individual scroll positions simultaneously — there is no single shared value that gets overwritten by whichever tab was visited most recently.' },
      { q: 'What happens the first time a panel is opened, before it has ever been scrolled?', a: 'scrollMemory[nextTab] is undefined the first time, and the code falls back to 0 (the top) via the || 0 default — so a panel with no prior recorded scroll position simply opens at its natural starting point.' },
      { q: 'Would this pattern work for more than three tabs?', a: 'Yes — the scrollMemory object and the save/restore logic are entirely generic and keyed by tab name, so the same mechanism scales to any number of tabs without any structural changes.' },
      { q: 'How would I persist scroll memory across a full page reload, not just tab switches within the same session?', a: 'Serialize the scrollMemory object to sessionStorage (or localStorage, depending on how long you want it to persist) whenever it changes, and read it back to initialize scrollMemory on page load — the save/restore timing logic itself would remain unchanged.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain precisely why setting scrollTop on a hidden element is unreliable across browsers, and why saving scroll position at the moment of switching (rather than via a continuously-running scroll listener) is both simpler and avoids a real staleness edge case. It's also worth asking for a version that persists scroll memory across full page reloads using sessionStorage, or one that also handles a dynamically added/removed set of tabs rather than a fixed, known set of three.`,
      prompt: `Build a tabbed interface where each panel independently remembers and restores its own scroll position when switching between tabs, using HTML, CSS, and vanilla JavaScript — no external library.

Requirements:
- At least three tabs, each with its own scrollable panel containing enough list content to require scrolling to see it all.
- Store each panel's scroll position independently, keyed by its own tab identifier, in a plain in-memory object — not a single shared "last scroll position" value.
- When switching tabs, save the outgoing panel's current scroll position at the exact moment just before hiding it (not via a continuously running or debounced scroll listener), then hide it.
- Show the incoming panel, and only AFTER it becomes visible, restore its previously saved scroll position (defaulting to the top if it has never been visited before) — do not attempt to set scroll position while the panel is still hidden.
- Verify the pattern works correctly regardless of the order tabs are switched in, and that each tab's scroll memory remains independently correct even after switching through several other tabs in between visits to it.
- Keep tab button ARIA state (aria-selected) correctly in sync with whichever panel is currently visible.`,
    },
  },
};

export default scrollRestorationTabMemory;
