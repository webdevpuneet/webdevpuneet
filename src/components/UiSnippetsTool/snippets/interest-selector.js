const interestSelector = {
  id: 'interest-selector',
  title: 'Interest Selector',
  category: 'forms',
  html: `<div class="wrap">
  <div class="card">
    <div class="head">
      <div class="badge">Step 2 of 4</div>
      <h1 class="title">What are you interested in?</h1>
      <p class="subtitle">Pick at least 3 topics to personalise your experience.</p>
    </div>
    <div class="grid" id="grid">
      <button class="chip" onclick="toggle(this)" data-id="design">
        <span class="chip-icon">🎨</span><span class="chip-label">UI Design</span>
      </button>
      <button class="chip selected" onclick="toggle(this)" data-id="dev">
        <span class="chip-icon">💻</span><span class="chip-label">Development</span>
      </button>
      <button class="chip selected" onclick="toggle(this)" data-id="react">
        <span class="chip-icon">⚛️</span><span class="chip-label">React</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="ai">
        <span class="chip-icon">🤖</span><span class="chip-label">AI &amp; ML</span>
      </button>
      <button class="chip selected" onclick="toggle(this)" data-id="ux">
        <span class="chip-icon">🧭</span><span class="chip-label">UX Research</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="startup">
        <span class="chip-icon">🚀</span><span class="chip-label">Startups</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="mobile">
        <span class="chip-icon">📱</span><span class="chip-label">Mobile</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="cloud">
        <span class="chip-icon">☁️</span><span class="chip-label">Cloud &amp; DevOps</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="security">
        <span class="chip-icon">🔐</span><span class="chip-label">Security</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="data">
        <span class="chip-icon">📊</span><span class="chip-label">Data Science</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="product">
        <span class="chip-icon">🗂️</span><span class="chip-label">Product</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="freelance">
        <span class="chip-icon">💼</span><span class="chip-label">Freelancing</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="open">
        <span class="chip-icon">🌐</span><span class="chip-label">Open Source</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="accessibility">
        <span class="chip-icon">♿</span><span class="chip-label">Accessibility</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="performance">
        <span class="chip-icon">⚡</span><span class="chip-label">Performance</span>
      </button>
      <button class="chip" onclick="toggle(this)" data-id="web3">
        <span class="chip-icon">🔗</span><span class="chip-label">Web3</span>
      </button>
    </div>
    <div class="footer">
      <div class="count-wrap">
        <span id="countText">3 selected</span>
        <div class="min-note" id="minNote" style="display:none">Select at least 3 to continue</div>
      </div>
      <button class="continue-btn" id="continueBtn" onclick="onContinue()">Continue</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 560px; }
.card { background: #fff; border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); padding: 36px 32px 28px; }
.head { text-align: center; margin-bottom: 28px; }
.badge { display: inline-block; background: rgba(99,102,241,0.08); color: #6366f1; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 14px; letter-spacing: 0.3px; }
.title { font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 8px; line-height: 1.2; }
.subtitle { font-size: 14px; color: #64748b; }
.grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; justify-content: center; }
.chip { display: flex; align-items: center; gap: 6px; padding: 9px 16px; border: 2px solid #e2e8f0; border-radius: 40px; background: #fff; color: #475569; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; user-select: none; }
.chip:hover { border-color: #c7d2fe; background: #f5f3ff; color: #6366f1; }
.chip.selected { border-color: #6366f1; background: rgba(99,102,241,0.06); color: #4f46e5; }
.chip-icon { font-size: 16px; line-height: 1; }
.footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 20px; }
.count-wrap { font-size: 13px; }
#countText { font-weight: 700; color: #1e293b; }
.min-note { font-size: 11px; color: #ef4444; margin-top: 3px; }
.continue-btn { background: #6366f1; color: #fff; border: none; padding: 11px 28px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
.continue-btn:hover { background: #4f46e5; transform: translateY(-1px); }
.continue-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; transform: none; }`,
  js: `var MIN = 3;

function toggle(chip) {
  chip.classList.toggle('selected');
  update();
}

function update() {
  var count = document.querySelectorAll('.chip.selected').length;
  var enough = count >= MIN;
  document.getElementById('countText').textContent = count === 0 ? 'None selected' : count + ' selected';
  document.getElementById('continueBtn').disabled = !enough;
  document.getElementById('minNote').style.display = !enough ? '' : 'none';
}

function onContinue() {
  var selected = Array.from(document.querySelectorAll('.chip.selected')).map(function(c) { return c.dataset.id; });
  alert('Selected: ' + selected.join(', ') + '\\n\\nIn production, this navigates to the next onboarding step.');
}

update();`,
  seo: {
    title: 'Interest Selector — Free HTML CSS JS Snippet',
    description: 'Onboarding interest/topic multi-selector with pill chips, minimum selection validation, and live count. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Interest Selector — Pill Chip Multi-Select for Onboarding and Personalisation',
      description: `An interest selector is a multi-select chip grid — related to the [chip filter](/ui-snippets/chip-filter/) and [tag input](/ui-snippets/tag-input/) — used in onboarding flows, newsletter preference centres, and content personalisation screens to learn what a user cares about. This snippet provides 16 topic chips in a flex-wrap grid, a minimum selection validation (3 required), a live count display, a disabled Continue button that enables on reaching the minimum, and a "Select at least 3" hint that hides once the minimum is met.\n\n**The pill chip toggle pattern**\n\nEach .chip is a button element styled as a rounded pill. toggle(chip) adds or removes the .selected class, which switches the border from grey (#e2e8f0) to indigo (#6366f1) and applies a light indigo background tint. Using button elements (not divs or inputs) gives keyboard focus, Enter/Space activation, and correct ARIA semantics for free.\n\n**Minimum selection validation**\n\nupdate() counts .chip.selected elements and compares against MIN = 3. If below minimum, the Continue button is disabled via disabled attribute (which CSS styles as grey with not-allowed cursor). The "Select at least 3" note appears below the count text. Once the minimum is met, both the button enables and the note hides. This pattern is cleaner than showing a validation error on submit — it gives real-time visual guidance.\n\n**The live count display**\n\n#countText shows "0 selected", "1 selected", "3 selected" etc. A zero state shows "None selected". This gives immediate feedback on each chip click, making the requirement clear and progress visible — particularly important on mobile where users may not see the minimum count hint.\n\n**Emoji icons in chip buttons**\n\nThe emoji inside each chip uses a span with font-size: 16px. Emoji render as colored icons across all platforms without any icon library. The chip layout is flex with a 6px gap between the emoji and the label text, keeping them tightly coupled as a single visual unit.\n\n**Collecting the selected values**\n\nTo read which topics are selected, query all .chip.selected elements and extract their data-id attributes: const selected = [...document.querySelectorAll(".chip.selected")].map(el => el.dataset.id). This gives an array like ["design", "react", "devtools"]. On Continue, POST this array to your API: fetch("/api/onboarding/interests", { method: "POST", body: JSON.stringify({ interests: selected }), headers: { "Content-Type": "application/json" } }). On the server, store the array in the user\'s profile and use it to seed the personalised content feed.\n\n**Search and filtering for large topic lists**\n\nWhen the topic list grows beyond 20–30 chips, add a [search box](/ui-snippets/search-box/) above the grid. On each keystroke, filter visible chips by checking if the chip\'s label text includes the search query (case-insensitive): chips.forEach(chip => { chip.style.display = chip.querySelector(".chip-label").textContent.toLowerCase().includes(q) ? "" : "none"; }). This keeps the underlying selection state intact while narrowing the visible choices. For very large lists (100+ topics), consider grouping chips into collapsible category sections with a "Show more" toggle per group.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click chips to select or deselect topics', text: 'Click any topic chip to toggle it selected (indigo border and tint). Click again to deselect. The count updates immediately and the Continue button enables when 3 or more are selected.' },
      { title: 'Change the minimum requirement', text: 'Edit var MIN = 3 in the JS to any number. The count display and validation update accordingly.' },
      { title: 'Add or remove topics', text: 'Duplicate a .chip button in the HTML. Update the emoji in .chip-icon and the label in .chip-label. Set a unique data-id for the selected values array.' },
      { title: 'Pre-select topics for returning users', text: 'On page load, read the user\'s saved interests and add the .selected class to matching chips: savedInterests.forEach(id => document.querySelector(\'.chip[data-id="\' + id + \'"]\').classList.add("selected")). Then call update().' },
      { title: 'Handle the Continue action', text: 'Replace the alert() in onContinue() with your navigation logic: save the selected array to an API endpoint (POST /api/onboarding/interests) and advance to the next step.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component with useState for selected set and useMemo for count. Click "Vue" for a Vue 3 SFC with reactive Set.' },
    ]},
    features: ['Pill chip toggle: .selected class switches border to indigo + tint background','button elements: native keyboard focus, Enter/Space, and ARIA semantics for free','MIN = 3 configurable minimum: disable/enable Continue button in real time','Live count text: "0 selected" → "3 selected" updates on every chip click','"Select at least 3" hint: shows below count when minimum not met','Continue button disabled attribute: grey styling + not-allowed cursor via CSS','Emoji icons in chips: colored icons without any icon library','flex-wrap grid: chips reflow naturally at any container width'],
    useCases: [
      { icon: 'APP', title: 'Onboarding flow topic preference step', desc: 'Use as step 2 or 3 in an onboarding wizard. On Continue, POST the selected interests array to your API (e.g., POST /api/users/preferences with { interests: ["dev", "react", "ux"] }). Use the array to personalise the home feed, recommended courses, or initial content filters.' },
      { icon: 'DESIGN', title: 'Newsletter preference centre category selection', desc: 'Let subscribers choose which content categories they want to receive. Each chip maps to an email list segment. On continue, update the subscriber\'s list memberships in Mailchimp, ConvertKit, or your ESP via their segment API.' },
      { icon: 'FLOW', title: 'Job board skill tag multi-selector for profiles', desc: 'Use in a developer profile creation flow to select tech skills, tools, and domains. Each chip maps to a skill tag stored in the user profile. The selected array drives job recommendation matching and search filter defaults.' },
      { icon: 'CODE', title: 'E-commerce product category preference onboarding', desc: 'Let new shoppers pick categories they are interested in (Electronics, Fashion, Home, Sports). Use the selection to show a personalised homepage product grid. Persist in a cookie for anonymous users or in the user profile for logged-in users.' },
      { icon: 'LEARN', title: 'Study minimum-selection form validation without a library', desc: 'The snippet demonstrates real-time form validation using a disabled attribute toggle — no validation library, form library, or error message system needed. The button\'s disabled state and the hint text provide dual feedback signals, reducing the need for intrusive error messages on submit.' },
      { icon: 'CHART', title: 'Survey question multi-select with configurable minimum', desc: 'Adapt for multi-answer survey questions: "Which features do you use most?" (min 2) or "Which tools do you use?" (min 1). Change the MIN variable and the minimum note text. The selected values feed into your survey results API.' },
      { icon: 'CODE', title: 'Related: Resend OTP Cooldown Timer', desc: 'See the [Resend OTP Cooldown Timer](/ui-snippets/resend-otp-timer/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I enforce a maximum selection limit?', a: 'In toggle(chip), check the count before adding .selected: if (!chip.classList.contains("selected") && document.querySelectorAll(".chip.selected").length >= MAX) return; This prevents selection above the cap. Show a "Max N selected" note below the count when the limit is hit.' },
      { q: 'How do I pre-select topics for a returning user?', a: 'After loading the page, fetch the user\'s saved interests and apply: savedInterests.forEach(id => { const chip = document.querySelector(\'.chip[data-id="\' + id + \'"]\'); if (chip) chip.classList.add("selected"); }); call update() after to refresh the count and button state.' },
      { q: 'How do I build this in React?', a: 'Use const [selected, setSelected] = useState(new Set(["dev", "react", "ux"])). Toggle: setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; }). Derive count: selected.size. Disable continue: selected.size < 3. Render each chip as a button with an onClick that calls the toggle function, and apply a conditional className that adds the active/selected styles when selected.has(chip.id) is true. Pass the selected set to the Continue handler as Array.from(selected) to convert it to a plain array for API serialisation. For animation, add a short CSS scale transform on the .selected class toggle so chips visually "pop" when selected — a 100ms scale(1.05) then back to scale(1) via a CSS transition creates a satisfying tactile feel that encourages engagement in onboarding flows.' },
      { q: 'How do I change the minimum required selections?', a: 'A single MIN variable drives the whole gate. update() counts document.querySelectorAll(".chip.selected").length, writes the live "N selected" counter, disables #continueBtn while count < MIN, and shows the #minNote hint. Change MIN to 1 for an optional-feeling picker or 5 for a stronger personalisation signal, and update the subtitle copy ("Pick at least 3 topics…") to match — the enforcement and the promise should always agree.' },
      { q: 'How do I read the selected topics on submit?', a: 'Every chip carries its machine value in data-id, so onContinue() collects them with Array.from(document.querySelectorAll(".chip.selected")).map(c => c.dataset.id) — giving you a clean array like ["design", "dev", "ai"] regardless of the visible labels or emoji. Replace the demo alert with a fetch POST to your onboarding endpoint or stash the array in localStorage for the next step. Keeping display labels separate from data-id values means you can rename or translate chips without breaking stored preferences.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the toggle and validation logic by hand to know exactly what it is doing. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why update() re-queries document.querySelectorAll(".chip.selected") on every single click instead of maintaining a running counter, and whether that matters at 16 chips versus 200. The same assistant is useful for optimizing it, for example suggesting a Set-based selection model that avoids a full DOM query on every toggle, or profiling whether a large topic grid should be virtualized. It is just as good for extending the pattern, such as adding a configurable MAX alongside the existing MIN, grouping chips into collapsible categories for a much longer topic list, or persisting selections to localStorage so a returning user's chips are pre-selected. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "interest selector" onboarding step in plain HTML, CSS, and JavaScript using only DOM APIs and CSS class toggles — no state library, no framework.

Requirements:
- A grid of pill-shaped chip buttons (flex-wrap, not CSS grid) that reflows naturally at any container width, each button carrying a machine-readable identifier in a data attribute separate from its visible emoji-plus-label content.
- Clicking a chip toggles a "selected" class on that chip via classList.toggle, which restyles its border and background — no other chip's state is affected.
- A MIN constant (e.g. 3) defines the minimum number of chips that must be selected. After every toggle, recompute the count of selected chips, update a live "N selected" text element, enable or disable a Continue button's disabled attribute based on whether the count meets MIN, and show or hide a "select at least N" hint element to match.
- The Continue button must use the native disabled attribute (styled distinctly via CSS, e.g. grey background and not-allowed cursor) rather than just a visual-only disabled look, so it is genuinely non-interactive below the minimum.
- On Continue, collect the data attribute values of every currently selected chip into a plain array (not the display text) so the result is stable even if labels are renamed or translated later.
- Use real button elements for the chips so they are keyboard-focusable and activate on Enter and Space without extra JavaScript.`,
    },
  },
};

export default interestSelector;
