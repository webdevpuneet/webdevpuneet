const segmentedControl = {
    id: 'segmented-control',
    title: 'Segmented Control',
    category: 'forms',
    html: `<div class="demo">
  <div class="group">
    <div class="seg" id="s1">
      <button class="seg-btn active" onclick="pick(this,'s1')">Monthly</button>
      <button class="seg-btn"        onclick="pick(this,'s1')">Quarterly</button>
      <button class="seg-btn"        onclick="pick(this,'s1')">Yearly</button>
      <div class="indicator" id="ind-s1"></div>
    </div>
  </div>

  <div class="group">
    <label class="group-label">View mode</label>
    <div class="seg seg-icons" id="s2">
      <button class="seg-btn active" onclick="pick(this,'s2')" title="Grid">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      </button>
      <button class="seg-btn" onclick="pick(this,'s2')" title="List">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      </button>
      <button class="seg-btn" onclick="pick(this,'s2')" title="Columns">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="4" height="18" rx="1"/><rect x="10" y="3" width="4" height="18" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>
      </button>
      <div class="indicator" id="ind-s2"></div>
    </div>
  </div>

  <div class="group">
    <label class="group-label">Size</label>
    <div class="seg seg-sm" id="s3">
      <button class="seg-btn active" onclick="pick(this,'s3')">XS</button>
      <button class="seg-btn" onclick="pick(this,'s3')">SM</button>
      <button class="seg-btn" onclick="pick(this,'s3')">MD</button>
      <button class="seg-btn" onclick="pick(this,'s3')">LG</button>
      <button class="seg-btn" onclick="pick(this,'s3')">XL</button>
      <div class="indicator" id="ind-s3"></div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.demo { display: flex; flex-direction: column; gap: 20px; }
.group { display: flex; flex-direction: column; gap: 8px; }
.group-label { font-size: 12px; font-weight: 600; color: #64748b; }

.seg {
  display: inline-flex; position: relative;
  background: #e2e8f0; border-radius: 10px;
  padding: 3px; gap: 0;
}

.seg-btn {
  position: relative; z-index: 1;
  padding: 7px 18px; font-size: 13px; font-weight: 600;
  color: #64748b; background: none; border: none;
  cursor: pointer; border-radius: 7px;
  transition: color 0.2s; font-family: inherit;
  white-space: nowrap;
}
.seg-btn.active { color: #1e293b; }
.seg-icons .seg-btn { padding: 8px 12px; }
.seg-sm .seg-btn { padding: 5px 12px; font-size: 11px; }

.indicator {
  position: absolute; top: 3px; bottom: 3px;
  background: #fff; border-radius: 7px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  transition: left 0.22s cubic-bezier(0.4,0,0.2,1), width 0.22s cubic-bezier(0.4,0,0.2,1);
  pointer-events: none;
}`,
    js: `function pick(btn, segId) {
  const seg = document.getElementById(segId);
  seg.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const ind = document.getElementById('ind-' + segId);
  const segRect = seg.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  ind.style.left  = (btnRect.left - segRect.left) + 'px';
  ind.style.width = btnRect.width + 'px';
}

['s1','s2','s3'].forEach(id => {
  const active = document.querySelector('#' + id + ' .seg-btn.active');
  if (active) pick(active, id);
});
window.addEventListener('resize', () => {
  ['s1','s2','s3'].forEach(id => {
    const active = document.querySelector('#' + id + ' .seg-btn.active');
    if (active) pick(active, id);
  });
});`,

  seo: {
    title: 'Segmented Control — Free HTML CSS JS Snippet',
    description: 'iOS-style segmented control with sliding pill indicator, supporting multiple independent instances. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: "Segmented Control — Sliding Pill Indicator & Multiple Independent Instances",
      description: `A segmented control is an iOS-style button group where one option is always selected and the active option is indicated by a sliding pill background. Used in view toggles (compare the [tab bar](/ui-snippets/tab-bar/)), [filter selectors](/ui-snippets/chip-filter/), and settings groups.

**The sliding pill**

The same technique as the [Animated Tabs](/ui-snippets/animated-tabs/) snippet: \`pick(btn, segId)\` reads \`btn.offsetLeft\` and \`btn.offsetWidth\` and applies them to the indicator element's \`style.left\` and \`style.width\`. CSS \`transition: left 0.2s, width 0.2s\` animates the slide. The pill correctly adapts to different button label lengths.

**Multiple independent instances**

The \`segId\` parameter scopes the operation to a specific segmented control element. This allows multiple independent controls on the same page without event conflicts — each has its own indicator and active state.

**Data binding**

Each button has a \`data-value\` attribute that can be read after selection: \`document.querySelector('#my-seg .seg-btn.active').dataset.value\` returns the selected option.

**The sliding pill indicator**

The active indicator is a .pill div using position: absolute. On each button click, moveIndicator(btn) reads btn.offsetLeft and btn.offsetWidth — the actual pixel position and size of the clicked segment from the DOM. It then sets pill.style.left and pill.style.width to these values. CSS transition: left 0.2s, width 0.2s animates the pill sliding and resizing between segments. Since values are read at click time, the control handles any segment label length automatically with no CSS configuration.

**Keyboard accessibility**

The buttons are standard button elements — keyboard-accessible by default. For arrow key navigation matching native iOS segmented control behaviour, add a keydown listener: ArrowRight focuses and clicks the next segment; ArrowLeft focuses and clicks the previous. Tab moves between control groups; arrow keys move within a group.

**Common production use cases**

The segmented control works best for 2–4 mutually exclusive options that fit on one line. Common uses: List/Grid view toggle, Day/Week/Month time range picker, Bar/Line/Pie chart switcher, Ascending/Descending sort direction. Wire the active segment to a state variable and conditionally render the matching view component below.

**The sliding pill indicator**

The active indicator is a .pill div using position: absolute. On each button click, moveIndicator(btn) reads btn.offsetLeft and btn.offsetWidth — the actual pixel position and size of the clicked segment from the DOM. It then sets pill.style.left and pill.style.width to these values. CSS transition: left 0.2s, width 0.2s animates the pill sliding and resizing between segments. Since values are read at click time, the control handles any segment label length automatically with no CSS configuration.

**Keyboard accessibility**

The buttons are standard button elements — keyboard-accessible by default. For arrow key navigation matching native iOS segmented control behaviour, add a keydown listener: ArrowRight focuses and clicks the next segment; ArrowLeft focuses and clicks the previous. Tab moves between control groups; arrow keys move within a group.

**Common production use cases**

The segmented control works best for 2–4 mutually exclusive options that fit on one line. Common uses: List/Grid view toggle, Day/Week/Month time range picker, Bar/Line/Pie chart switcher, Ascending/Descending sort direction. Wire the active segment to a state variable and conditionally render the matching view component below.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Click each segment option", text: "Click any option in each of the three demo controls. The pill indicator slides smoothly to the clicked option." },
      { title: "Update option labels", text: "In the HTML panel, change the button text inside each .seg-btn. The indicator auto-adapts to different label widths." },
      { title: "Add a fourth option", text: "Add another .seg-btn button inside the .seg-wrap. The JS picks it up via querySelectorAll automatically." },
      { title: "Read the selected value", text: "Add data-value attributes to each button. Read the selection: document.querySelector(\"#seg1 .seg-btn.active\").dataset.value." },
      { title: "Change indicator colour", text: "Update background: #fff on .seg-indicator in the CSS panel to match your brand." },
      { title: "Export in your format", text: "Click \"HTML\" for a standalone file, \"JSX\" for a React component, or \"Tailwind\" for a React + Tailwind version." },
    ]},
    features: [
      "Sliding pill indicator via offsetLeft/offsetWidth — same as Animated Tabs snippet",
      "Multiple independent instances via segId parameter scoping",
      "pick() removes .active from all buttons in the segment then adds to clicked",
      "CSS transition: left 0.2s, width 0.2s on .seg-indicator",
      "data-value attribute on each button for reading selected option",
      "Three demo instances: view modes, size selector, theme picker",
      "Pill auto-adapts to different button label lengths via offsetWidth",
      "Export as HTML, JSX, or Tailwind CSS",
      "Mobile/Tablet/Desktop preview",
      "Live editor — preview updates as you type",
    ],
    useCases: [
      { icon: "APP", title: "View mode toggles", desc: "Grid/List/Map view switching in a listing page. The active view is always selected; the pill communicates the current mode." },
      { icon: "DESIGN", title: "Size and variant selectors", desc: "Product size (S/M/L/XL) or variant selection in an e-commerce product page. More compact than radio buttons." },
      { icon: "TABS", title: "Settings and preference toggles", desc: "Theme (Light/Dark/System), language, or region selectors in a settings panel where one option is always active." },
      { icon: "LEARN", title: "Learn offsetLeft-based pill positioning", desc: "The same technique as Animated Tabs but in a pill-based control. Edit the pick() function to understand how offsetLeft and offsetWidth drive the indicator." },
      { icon: "FLOW", title: "Dashboard time range selectors", desc: "1D / 1W / 1M / 1Y time range selectors on analytics charts. The selected range drives the data query." },
      { icon: "CODE", title: "Read the selected value", desc: "After selection: document.querySelector(\"#my-seg .seg-btn.active\").dataset.value returns the active option for form submission or API calls." },
    ],
    faqs: [
      { q: "How does the pill slide to the correct position?", a: "pick() reads btn.offsetLeft (position within the container) and btn.offsetWidth (button size). It sets indicator.style.left and .width to these pixel values. CSS transition: left 0.2s, width 0.2s animates between positions." },
      { q: "How does segId support multiple instances?", a: "pick(btn, segId) scopes querySelectorAll and getElementById to document.getElementById(segId). This limits the active state changes to one control without affecting others on the same page." },
      { q: "How do I read the selected value?", a: "After selection: const value = document.querySelector(\"#\" + segId + \" .seg-btn.active\").dataset.value. Set a data-value attribute on each button matching the option value." },
      { q: "How do I make this keyboard accessible?", a: "Add tabindex=\"0\" to each button and a keydown handler that activates on Enter or Space. Add role=\"radiogroup\" to the container and role=\"radio\" aria-checked to each button." },
      { q: "Can I use this in React?", a: "Yes. Click \"JSX\" for a React component. Use useState for the active value. Apply active class based on value comparison. Use useRef on the indicator and active button to update indicator position in useEffect after value changes." },
      { q: "How is this different from tabs?", a: "Segmented controls always show all options inline and are used for mutually exclusive choices within the same context. Tabs switch between different content panels. Segmented controls are more compact and suited for 2-5 options." },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the pill-positioning math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how pick() turns a clicked button's getBoundingClientRect into the indicator's left and width styles, or why segId scoping is what lets three independent segmented controls share one pick() function without interfering with each other. The same assistant is useful for optimizing it too, for instance checking whether recalculating getBoundingClientRect on every resize event across all three controls could be debounced for a page with many segmented controls. It's just as handy for extending the behavior: ask it to add arrow-key navigation between segments, persist the selected segment per control in localStorage, or animate the indicator with a slight overshoot easing instead of the current cubic-bezier. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an iOS-style segmented control with a sliding pill indicator in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Support multiple independent segmented control instances on the same page, each identified by its own container id, without any control's state leaking into another's.
- Each control must have exactly one absolutely-positioned indicator element that visually sits behind the buttons and slides beneath whichever one is active.
- On click, read the clicked button's position and width relative to its own container using getBoundingClientRect (comparing the button's rect to its container's rect, not offsetLeft alone), and set the indicator's left and width inline styles to those values.
- Animate the indicator's left and width changes with a CSS transition (not a JS animation loop), so the pill glides and resizes smoothly between segments of different label widths.
- On page load, initialize each control's indicator position to match whichever button already has the active class, without requiring a click first.
- Add a window resize listener that recalculates and re-applies every control's indicator position, so the pill does not drift out of alignment if the layout reflows.
- Support at least three variations of the same control on one page: a plain text segmented control, an icon-only segmented control, and a small-size segmented control with five options, all driven by the same reusable function.`,
    },
  }
};

export default segmentedControl;
