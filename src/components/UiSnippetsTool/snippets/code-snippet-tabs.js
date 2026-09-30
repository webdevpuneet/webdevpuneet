const codeSnippetTabs = {
  id: 'code-snippet-tabs',
  title: 'Code Snippet Tabs',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<div class="cst-card">
  <div class="cst-head">
    <div class="cst-tabs" id="cstTabs" role="tablist" aria-label="Install command">
      <button class="cst-tab active" role="tab" aria-selected="true" data-i="0" type="button">npm</button>
      <button class="cst-tab" role="tab" aria-selected="false" data-i="1" type="button">pnpm</button>
      <button class="cst-tab" role="tab" aria-selected="false" data-i="2" type="button">yarn</button>
      <button class="cst-tab" role="tab" aria-selected="false" data-i="3" type="button">bun</button>
      <span class="cst-ink" id="cstInk"></span>
    </div>
    <button class="cst-copy" id="cstCopy" type="button" aria-label="Copy command">
      <svg class="cst-ico-copy" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
      <svg class="cst-ico-ok" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
    </button>
  </div>
  <pre class="cst-code"><span class="cst-prompt">$</span> <code id="cstCode">npm install fwd-tools</code></pre>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0b1020; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.cst-card { width: 100%; max-width: 440px; background: #11182b; border: 1px solid #1e293b; border-radius: 13px; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4); }

.cst-head { display: flex; align-items: center; justify-content: space-between; padding: 0 8px 0 0; border-bottom: 1px solid #1e293b; }

.cst-tabs { position: relative; display: flex; }
.cst-tab {
  position: relative; z-index: 1;
  padding: 12px 16px;
  background: none; border: none; cursor: pointer;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 13px; font-weight: 600;
  color: #64748b;
  transition: color 0.2s;
}
.cst-tab:hover { color: #cbd5e1; }
.cst-tab.active { color: #fff; }
.cst-ink {
  position: absolute; bottom: 0; left: 0; height: 2px;
  background: #818cf8; border-radius: 2px;
  transition: transform 0.28s cubic-bezier(0.4, 0.2, 0.2, 1), width 0.28s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.cst-copy {
  width: 32px; height: 32px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #1e293b; border: none; border-radius: 8px; cursor: pointer;
  transition: background 0.15s;
}
.cst-copy:hover { background: #334155; }
.cst-copy svg { width: 15px; height: 15px; fill: none; stroke: #94a3b8; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.cst-ico-ok { display: none; }
.cst-copy.copied { background: #064e3b; }
.cst-copy.copied .cst-ico-copy { display: none; }
.cst-copy.copied .cst-ico-ok { display: block; stroke: #34d399; }

.cst-code {
  padding: 16px 18px;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 13.5px; line-height: 1.5;
  color: #e2e8f0;
  overflow-x: auto;
}
.cst-prompt { color: #475569; user-select: none; margin-right: 8px; }
.cst-code code { color: #a5b4fc; }`,
  js: `const COMMANDS = [
  'npm install fwd-tools',
  'pnpm add fwd-tools',
  'yarn add fwd-tools',
  'bun add fwd-tools',
];

const tabsWrap = document.getElementById('cstTabs');
const tabs = [...tabsWrap.querySelectorAll('.cst-tab')];
const ink = document.getElementById('cstInk');
const code = document.getElementById('cstCode');
const copyBtn = document.getElementById('cstCopy');
let active = 0;
let resetTimer = null;

function moveInk() {
  const tab = tabs[active];
  ink.style.width = tab.offsetWidth + 'px';
  ink.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
}

function select(i) {
  active = i;
  tabs.forEach((t, ti) => {
    t.classList.toggle('active', ti === i);
    t.setAttribute('aria-selected', ti === i);
  });
  code.textContent = COMMANDS[i];
  moveInk();
}

tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));

tabsWrap.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  e.preventDefault();
  const dir = e.key === 'ArrowRight' ? 1 : -1;
  const next = (active + dir + tabs.length) % tabs.length;
  select(next);
  tabs[next].focus();
});

copyBtn.addEventListener('click', async () => {
  const text = COMMANDS[active];
  try { await navigator.clipboard.writeText(text); }
  catch (err) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
  }
  copyBtn.classList.add('copied');
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => copyBtn.classList.remove('copied'), 1700);
});

// Position the ink under the first tab, and keep it aligned on resize
moveInk();
window.addEventListener('resize', moveInk);`,
  seo: {
    title: 'Code Snippet Tabs — Free HTML CSS JS Install Snippet',
    description: 'A package-manager command block with npm/pnpm/yarn/bun tabs, a sliding ink underline, copy button and keyboard nav. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Code Snippet Tabs — Package-Manager Command Block with Sliding Ink and Copy',
      description: `Every library's README and docs page shows the install command, and the polished version offers it for each package manager — npm, pnpm, yarn, bun — behind tabs, with a one-click copy button. This component is that block: a dark terminal-style card with a sliding "ink" underline that animates between tabs, a copy button with success feedback, keyboard navigation, and a monospace command line with a shell prompt. It is built in HTML, CSS, and vanilla JavaScript, and it is the snippet you put at the top of a docs page or component example.

**The sliding ink underline**

Instead of giving each tab its own static underline, a single \`.cst-ink\` element slides beneath the active tab. \`moveInk()\` reads the active tab's \`offsetLeft\` and \`offsetWidth\` and sets the ink's \`transform: translateX()\` and \`width\` to match. Because both properties are CSS-transitioned, the underline glides and resizes from one tab to the next — the signature animated-tabs effect from Vercel, Stripe, and shadcn/ui docs. Measuring from the live DOM means the ink is always correct regardless of tab label widths (npm and pnpm are different lengths), and a \`resize\` listener re-aligns it if the layout reflows.

**Swapping the command**

The four commands live in a \`COMMANDS\` array. Selecting a tab sets the \`<code>\` element's \`textContent\` to the matching command, toggles the \`.active\` class and \`aria-selected\` across the tabs, and moves the ink. Using \`textContent\` (not \`innerHTML\`) means the command is inserted as plain text — safe and correct, with no HTML parsing — which matters when a command could contain characters like \`&\` or quotes.

**Copy with clipboard fallback**

The copy button writes the active command to the clipboard with \`navigator.clipboard.writeText()\`, wrapped in a \`try/catch\` that falls back to a hidden-textarea \`document.execCommand('copy')\` for insecure contexts or sandboxed iframes. On success it adds a \`.copied\` class that swaps the copy icon for a green checkmark via pure CSS, and a debounced \`setTimeout\` reverts it after 1.7 seconds. Crucially, copy always reads from the \`COMMANDS\` array for the current tab, so you copy exactly what is shown — switch to yarn, hit copy, and you get the yarn command.

**Keyboard-navigable tablist**

The tabs are \`role="tab"\` inside a \`role="tablist"\`, and the active tab carries \`aria-selected="true"\`. Arrow Left and Arrow Right move the selection (with wrap-around via modulo) and shift focus to the next tab, the keyboard pattern expected of a tablist. Every tab is a real \`<button>\`, so the whole control is operable without a mouse.

**The terminal aesthetic**

The card uses a deep navy background, a monospace font stack (\`ui-monospace, 'SF Mono', Menlo\`), a dimmed \`$\` shell prompt that is \`user-select: none\` so it is not copied when a user selects the line by hand, and an indigo-tinted command colour. The whole thing reads as a real terminal snippet, which is the visual language developers expect for install instructions.

**Customisation**

Edit the tab labels and the \`COMMANDS\` array together (keep them in the same order). You are not limited to install commands — use it for any set of equivalent snippets (cURL vs fetch vs axios, or SQL dialects). For multi-line code, swap the single \`<code>\` for a block and the same select/copy logic applies. Swap the \`#818cf8\` ink and \`#a5b4fc\` command colour for your palette, and adjust the ink transition duration to taste.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A dark command card renders with npm/pnpm/yarn/bun tabs, an ink underline under npm, and a copy button.` },
      { title: 'Click a package-manager tab', text: `The ink underline slides and resizes to the new tab and the command line updates to that manager's install command.` },
      { title: 'Use arrow keys', text: `Focus a tab and press Left/Right to move between managers with wrap-around; focus follows the selection.` },
      { title: 'Click copy', text: `The current command is copied to the clipboard and the icon turns into a green checkmark for ~1.7 seconds.` },
      { title: 'Set your commands', text: `Edit the tab labels and the COMMANDS array (same order) to your package name or any equivalent snippet set.` },
      { title: 'Theme it', text: `Swap the ink and command colours and adjust the ink transition duration to match your docs.` },
    ]},
    features: [
      { title: 'Sliding ink underline', text: `One underline element transitions translateX and width between tabs by measuring offsetLeft/offsetWidth from the DOM.` },
      { title: 'Width-aware alignment', text: `The ink fits each tab's real label width and re-aligns on window resize, so different-length labels always look right.` },
      { title: 'Copy the shown command', text: `Copy always reads the active tab's command from the COMMANDS array, so you get exactly what is displayed.` },
      { title: 'Clipboard with fallback', text: `Async Clipboard API plus a hidden-textarea execCommand fallback for insecure contexts, with a CSS icon swap to a check.` },
      { title: 'Safe text insertion', text: `Commands are set via textContent, so special characters render literally with no HTML parsing.` },
      { title: 'Keyboard tablist', text: `role=tab/tablist with aria-selected and Arrow Left/Right navigation plus wrap-around.` },
      { title: 'Terminal aesthetic', text: `Monospace stack, a non-selectable $ prompt, and an indigo command colour give an authentic terminal look.` },
      { title: 'Debounced feedback', text: `The copied state auto-resets on a cleared timer so rapid copies never leave it stuck.` },
    ],
    useCases: [
      { title: 'Library and package docs', text: `Show install commands for every package manager at the top of a README or docs page — pair with a [code block](/ui-snippets/code-block/) for usage examples below.` },
      { title: 'Component and design-system sites', text: `Offer the install snippet behind tabs the way shadcn/ui and Radix docs do; complements [code block tabs](/ui-snippets/code-block-tabs/) for multi-file examples.` },
      { title: 'API and SDK quickstarts', text: `Switch between language or client snippets (cURL, fetch, axios) using the same tabbed copy pattern.` },
      { title: 'Tutorials and onboarding', text: `Give learners a copy-ready command for their tool of choice without cluttering the page with all four.` },
      { title: 'CLI and tooling landing pages', text: `Lead with a slick install block as the hero CTA for a developer tool.` },
      { title: 'Learning animated tabs', text: `A reference for the sliding-ink technique and clipboard copy; compare with [animated tabs](/ui-snippets/animated-tabs/) for content panels.` },
      { icon: 'CODE', title: 'Related: CSS light-dark() Theme Demo', desc: 'See the [CSS light-dark() Theme Demo](/ui-snippets/css-light-dark-theme-demo/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the underline know how wide to be for each tab?', a: `moveInk() reads the active tab's offsetWidth and offsetLeft directly from the rendered DOM and sets the ink's width and translateX to match. Because it measures live, the underline fits labels of any length (npm vs pnpm vs yarn) exactly, and a window resize listener re-runs it so the ink stays aligned if the layout changes. Both width and transform are CSS-transitioned, which produces the glide-and-resize effect.` },
      { q: 'Does the copy button copy the command for the tab I am on?', a: `Yes. The copy handler reads COMMANDS[active] — the command for the currently selected tab — rather than scraping the DOM, so it always copies exactly what is shown. Switch to yarn and copy, and you get the yarn command. The async Clipboard API does the copy, with a hidden-textarea execCommand fallback for environments where the Clipboard API is blocked.` },
      { q: 'Can I use this for multi-line code, not just one-line commands?', a: `Yes. Replace the single <code> line with a multi-line <pre><code> block and set its textContent per tab from the COMMANDS array (each entry can contain newlines). The tab switching, ink animation, keyboard nav, and copy logic are unchanged — only the content area grows. For syntax highlighting, run a highlighter over the code after each select().` },
      { q: 'Why is the $ prompt not copied when I select the line manually?', a: `The prompt span has user-select: none, so a manual text selection skips it — you select only the command, not the shell prefix. The copy button is even safer because it copies from the COMMANDS array, which never includes the prompt at all. Both paths give you a clean, paste-ready command.` },
      { q: 'How do I use these tabs in React, Vue, or Angular?', a: `Hold the active index in state and render the command from a COMMANDS array. For the sliding ink, use a ref to the active tab and an effect that, when the index changes, reads its offsetLeft/offsetWidth and sets the ink style — re-run it on resize too. The copy handler copies COMMANDS[active] with the same fallback. Bind .active/aria-selected to index comparisons; the keyboard handler attaches to the tablist's onKeyDown.` },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming the sliding underline is just a CSS transition, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why moveInk() reads offsetLeft and offsetWidth live from the DOM instead of hardcoding pixel positions per tab, and why that specific approach handles tabs of different label lengths (npm versus pnpm) correctly. The same assistant can help you stress-test it — ask what happens to the ink's position if the window is resized while a tab other than the first is active, and confirm the resize listener actually recomputes from the currently active tab rather than resetting to the first one. It's also a good partner for extending the block: ask it to persist the last-selected package manager in localStorage so returning visitors see their preferred tab, add a fifth tab for a different tool, or generalize the component so COMMANDS could hold multi-line snippets instead of single install commands. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "package manager install command" tab block with a sliding underline in plain HTML, CSS, and JavaScript — no animation library.

Requirements:
- A row of tab buttons (e.g. npm, pnpm, yarn, bun) inside a proper ARIA tablist (role="tablist" on the container, role="tab" and aria-selected on each button), with a single shared underline element positioned absolutely beneath the tabs rather than each tab having its own border.
- On selecting a tab, measure that specific tab's offsetLeft and offsetWidth directly from the live DOM and set the shared underline's transform (translateX) and width to match those exact values, with both properties CSS-transitioned so the underline visibly glides and resizes between tabs of different label lengths.
- Re-run that same measurement on window resize so the underline stays correctly aligned under the currently active tab if the layout reflows, not just on initial load.
- Store the actual commands in a plain array indexed to match the tab order, and when a tab is selected, set the displayed command via textContent (not innerHTML) so special characters in a command render literally with no HTML parsing risk.
- Support Left and Right arrow key navigation while focus is inside the tablist: pressing an arrow key must move the selection with wrap-around at both ends, update the displayed command and underline, and move keyboard focus to the newly selected tab.
- A copy button that always copies the array entry corresponding to the currently active tab (not scraped text from the page) via the Clipboard API with a hidden-textarea execCommand fallback, swapping its icon to a checkmark for roughly 1.5-2 seconds using a debounced timer that's cleared and restarted on rapid repeated clicks.
- Style a shell-prompt character before the command as non-selectable (so manually selecting the command text with a mouse never includes the prompt).`,
    },
  },
};

export default codeSnippetTabs;
