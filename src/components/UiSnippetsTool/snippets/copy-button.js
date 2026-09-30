const copyButton = {
    id: 'copy-button',
    title: 'Copy to Clipboard Button',
    category: 'buttons',
    html: `<div class="demo">
  <div class="code-block">
    <pre id="code">npm install @webdevpuneet/ui-snippets</pre>
    <button class="copy-btn" id="copy-btn" onclick="copyCode()">
      <svg class="icon-copy" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <svg class="icon-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
    </button>
  </div>

  <div class="tokens">
    <div class="token-row">
      <span class="token-label">API Key</span>
      <code class="token-val">sk-fwd-xxxxxxxxxxxxxxxxxxxx</code>
      <button class="small-copy" onclick="copyText(this,'sk-fwd-xxxxxxxxxxxxxxxxxxxx')">Copy</button>
    </div>
    <div class="token-row">
      <span class="token-label">Webhook URL</span>
      <code class="token-val">https://api.webdevpuneet.com/hook/v1</code>
      <button class="small-copy" onclick="copyText(this,'https://api.webdevpuneet.com/hook/v1')">Copy</button>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.demo { display: flex; flex-direction: column; gap: 16px; width: 380px; }

.code-block { display: flex; align-items: center; justify-content: space-between; background: #1e293b; border-radius: 10px; padding: 14px 16px; gap: 12px; }
pre { font-family: 'Courier New', monospace; font-size: 13px; color: #4ade80; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.copy-btn { width: 32px; height: 32px; border-radius: 7px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.15s, color 0.15s; }
.copy-btn:hover { background: rgba(255,255,255,0.15); color: #f1f5f9; }
.copy-btn.copied { background: rgba(74,222,128,0.15); border-color: rgba(74,222,128,0.3); color: #4ade80; }
.icon-check { display: none; }
.copy-btn.copied .icon-copy  { display: none; }
.copy-btn.copied .icon-check { display: block; }

.tokens { background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
.token-row { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-bottom: 1px solid #f1f5f9; }
.token-row:last-child { border-bottom: none; }
.token-label { font-size: 11px; font-weight: 600; color: #94a3b8; flex-shrink: 0; width: 80px; }
.token-val { flex: 1; font-family: monospace; font-size: 11px; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.small-copy { padding: 4px 10px; font-size: 11px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; color: #64748b; cursor: pointer; font-family: inherit; flex-shrink: 0; transition: all 0.15s; }
.small-copy:hover { border-color: #6366f1; color: #6366f1; }
.small-copy.ok { background: #f0fdf4; border-color: #86efac; color: #16a34a; }`,
    js: `function copyCode() {
  const text = document.getElementById('code').textContent;
  navigator.clipboard.writeText(text).catch(() => {});
  const btn = document.getElementById('copy-btn');
  btn.classList.add('copied');
  setTimeout(() => btn.classList.remove('copied'), 2000);
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).catch(() => {});
  btn.textContent = '✓ Copied'; btn.classList.add('ok');
  setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 2000);
}`,

  seo: {
    title: 'Copy Button — Free HTML CSS JS Clipboard Snippet',
    description: 'Copy-to-clipboard button using the Clipboard API with tick feedback and timeout reset. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Copy Button — Clipboard API, SVG Icon Swap, Timeout Reset & Token Row Pattern",
      description: `A copy to clipboard button is one of the most-used micro-interactions in developer-facing products. Any interface that displays a code snippet, API key, access token, webhook URL, terminal command, or share link needs a one-click copy mechanism — requiring users to manually select and copy text causes unnecessary friction and increases the chance of copying errors. This snippet implements two common copy button patterns: an icon button inside a dark code block, and inline text buttons in a credential list.

**The Clipboard API and async promise handling**

\`navigator.clipboard.writeText(text)\` is the modern Clipboard API. It's asynchronous — it returns a Promise that resolves when the text is successfully written to the clipboard. The \`.catch(() => {})\` handles the case where clipboard access is denied — this happens in non-HTTPS contexts (except localhost), in browser privacy modes, or when the user has denied clipboard permission. For maximum compatibility, a fallback using \`document.execCommand('copy')\` can be placed inside the catch block: create a temporary textarea, set its value, select it, call execCommand, then remove it.

**The SVG icon swap visual feedback**

The copy button contains two SVG icons: a copy icon (\`.icon-copy\`) and a checkmark icon (\`.icon-check\`). In the default state, \`.icon-check { display: none }\`. When \`.copied\` is added: \`.copy-btn.copied .icon-copy { display: none }\` and \`.copy-btn.copied .icon-check { display: block }\`. This pure CSS icon swap requires no DOM manipulation — just a class toggle. Simultaneously, \`.copy-btn.copied\` applies a green background tint (\`rgba(74,222,128,0.15)\`) and a green border, providing a clear colour-coded confirmation state.

**The setTimeout reset cycle**

\`copyCode()\` calls \`btn.classList.add('copied')\` immediately on click, then \`setTimeout(() => btn.classList.remove('copied'), 2000)\` schedules the reset 2 seconds later. The 2-second window gives the user enough time to notice the confirmation feedback while keeping the button ready for repeated copying. If a user clicks copy again within the 2 seconds, the existing timeout is still active — the next call to classList.add adds the class that is already present (no visual change) and sets a new 2-second timeout, effectively extending the confirmation display.

**The token row pattern**

The second part of the demo shows a different copy pattern: small inline text buttons in a credential list. The \`copyText(btn, text)\` function takes the button reference and the text value directly. On click, it sets \`btn.textContent = '✓ Copied'\` and adds the \`.ok\` class for green styling, then resets after 2 seconds. This pattern is used in API key dashboards, environment variable panels, and developer settings pages where multiple copyable values are shown in a list.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Click the copy icon button in the code block", text: "Click the copy icon button in the top-right of the dark code block. The icon immediately swaps from a copy icon to a green checkmark, and the button background changes to a green tint. After 2 seconds, it resets to the default copy icon state ready for the next click." },
      { title: "Click the small Copy text buttons in the token list", text: "Click the Copy button next to the API Key or Webhook URL rows in the credential list below the code block. The button text changes to '✓ Copied' and turns green. After 2 seconds it resets. This demonstrates the inline text-button copy pattern used in API dashboard and credentials pages." },
      { title: "Update the code block content to your own snippet", text: "In the HTML panel, change the text inside the <pre id='code'> element to your own terminal command, code snippet, or configuration text. The copyCode() function reads pre.textContent, so whatever text you put in the pre element is what gets copied to the clipboard." },
      { title: "Change the timeout duration for the Copied state", text: "In the JS panel, find the two setTimeout calls. Change the 2000 millisecond value to adjust how long the confirmation state displays. 1500ms feels snappier, 3000ms gives more time for users to read the confirmation. Use the same value in both setTimeout calls for consistency across both copy patterns." },
      { title: "Add the copy button to multiple code blocks on a page", text: "For multiple independent copy buttons, refactor copyCode() to accept an element ID parameter: function copyCode(id) { const text = document.getElementById(id).textContent; navigator.clipboard.writeText(text).catch(()=>{}); const btn = document.querySelector('[data-target=\"' + id + '\"]'); btn.classList.add('copied'); setTimeout(() => btn.classList.remove('copied'), 2000); }. Each button passes its target ID via onclick='copyCode(\"myCodeId\")'." },
      { title: "Export and integrate into your documentation or dashboard", text: "Click HTML for a standalone file, JSX for a React component with a useCopyButton() hook that manages the copied state, or Tailwind for a styled React version. The JSX export uses useState for the copied boolean and useEffect with a cleanup to handle unmounting during the timeout window." },
    ]},
    features: [
      "navigator.clipboard.writeText() copies code block textContent",
      ".copied class swaps icon SVG and label text immediately on click",
      "setTimeout 2000ms resets .copied state automatically",
      ".catch() handles clipboard permission denial silently",
      "textContent reads raw text without HTML markup",
      "Visual feedback: tick icon + \"Copied!\" label during copied state",
      "Default state: copy icon + \"Copy\" label",
      "Export as HTML file, React JSX, or React + Tailwind CSS",
      "Mobile (375px), Tablet (768px), Desktop device preview buttons",
      "Live split-pane editor — preview updates as you type",
    ],
    useCases: [
      { icon: "CODE", title: "Code snippet viewers and documentation sites", desc: "Add a one-click copy button to every code block in developer documentation, API reference pages, and tutorial sites. Removing the need to manually select code reduces friction and prevents partial selections that cause copy errors. GitHub, MDN, and every major documentation platform now includes a copy button on all code blocks — it's an expected baseline feature for any developer-facing content site." },
      { icon: "APP", title: "API key, token, and credential displays", desc: "Show API keys, access tokens, webhook secrets, and environment variable values alongside a copy button — the [API key manager](/ui-snippets/api-key-manager/) builds on exactly this pattern. The token row layout (label + truncated value + Copy button) is the standard used in GitHub settings, Stripe Dashboard, and Vercel environment variable panels." },
      { icon: "FORM", title: "Share URL and referral link inputs", desc: "Display a shareable URL, referral code, or invitation link with a copy button beside it — as used in the [share modal](/ui-snippets/share-modal/) and [referral card](/ui-snippets/referral-card/). The standard pattern shows a read-only text input displaying the URL and a Copy button that triggers clipboard write. After copying, the button confirms the action for 2 seconds. This pattern is used in every SaaS referral program, file sharing service, and invite system." },
      { icon: "LEARN", title: "Learn the async Clipboard API and promise handling", desc: "navigator.clipboard.writeText(text) is the modern way to write to the clipboard. It's async and returns a Promise, meaning it needs .then() or .catch() error handling. The .catch(() => {}) silently handles permission denial. Study how the feedback cycle works: immediate class addition for instant response, then setTimeout for deferred reset — this same pattern applies to any time-limited UI state like [button loading states](/ui-snippets/loading-button/) or [toast notifications](/ui-snippets/toast-notification/)." },
      { icon: "DESIGN", title: "MDX and Markdown renderer code block enhancements", desc: "Use as the copy button component inside a custom Markdown renderer or MDX component library. In React, create a CodeBlock component wrapping pre and code elements with a copy button overlay in the top-right corner. The component reads the code from its children prop and passes it to navigator.clipboard.writeText. Works with syntax highlighters like Prism.js and Shiki since textContent strips HTML markup." },
      { icon: "FLOW", title: "One-click configuration and infrastructure snippet exports", desc: "Add copy buttons to configuration snippets that users need to paste into their terminal, IDE, or config files: environment variable blocks, Docker Compose sections, nginx config snippets, SSH key outputs, and shell installation commands. One-click copy eliminates the most error-prone step in developer onboarding flows where even a single missed character causes installation failures." },
      { icon: 'CODE', title: 'Related: Fullscreen API Toggle Button', desc: 'See the [Fullscreen API Toggle Button](/ui-snippets/fullscreen-toggle-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does navigator.clipboard.writeText work and when does it fail?", a: "navigator.clipboard.writeText(text) is an asynchronous function that uses the Permissions API to request clipboard write access, then writes the text to the system clipboard. It returns a Promise that resolves with undefined on success. It rejects (and the .catch() fires) in three cases: the page is not served over HTTPS (except localhost), the browser's clipboard permission for the site is denied in browser settings, or the browser doesn't support the Clipboard API (very old browsers). For a fallback, inside the catch block: const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)." },
      { q: "How does the CSS-only icon swap from copy to checkmark work?", a: "The button contains two SVG icons with classes .icon-copy and .icon-check. The default CSS hides the checkmark: .icon-check { display: none }. When .copied is added to the button, two CSS rules fire simultaneously: .copy-btn.copied .icon-copy { display: none } hides the copy icon, and .copy-btn.copied .icon-check { display: block } shows the checkmark. No JavaScript DOM manipulation is needed for the icon swap — just the single classList.add('copied') call, and CSS handles the rest. The button background and border also change via .copy-btn.copied { background: rgba(74,222,128,0.15); border-color: rgba(74,222,128,0.3); color: #4ade80 } for a green confirmation state." },
      { q: "How do I add copy buttons to multiple independent code blocks?", a: "Refactor copyCode() to accept a target element ID: function copyCode(id) { const text = document.getElementById(id).textContent; navigator.clipboard.writeText(text).catch(()=>{}); const btn = event.currentTarget; btn.classList.add('copied'); setTimeout(() => btn.classList.remove('copied'), 2000); }. Pass the code block ID from the onclick: onclick='copyCode(\"example-1\")'. Each code block gets a unique ID, and each copy button targets its own block. For a React implementation, use a ref on the pre element and pass it to the click handler." },
      { q: "Does the Clipboard API require HTTPS?", a: "Yes, in production. navigator.clipboard.writeText() requires either HTTPS or the localhost origin. It will not work on HTTP pages in modern browsers. During development, localhost (including ports like localhost:3000) works without HTTPS. On HTTP production sites, the API throws a NotAllowedError. The document.execCommand('copy') fallback works on HTTP but is deprecated and may be removed from browsers in future. The standard solution is to serve your site over HTTPS — all major hosting platforms (Netlify, Vercel, Cloudflare) provide HTTPS automatically." },
    ],
    aiPrompt: {
      paragraph: `You don't have to dig through the Clipboard API docs to know exactly when writeText can silently fail here. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the catch block is empty rather than showing an error state, and why the icon swap between the copy and check SVGs needs no JavaScript beyond one classList.add call. The same assistant can help optimize it — for instance asking whether repeated rapid clicks correctly extend the two-second confirmation window given how the existing setTimeout is scheduled, or whether that could leave a stale timeout resetting the class early. It's also useful for extending the pattern: ask it to add a real document.execCommand fallback inside the catch block for non-HTTPS contexts, generalize copyCode to accept any target element ID so multiple independent code blocks on one page each get correct behavior, or surface a visible error state when the clipboard write is actually denied instead of failing silently. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a copy-to-clipboard button in plain HTML, CSS, and JavaScript using the async Clipboard API, in two variants (an icon button and an inline text button) — no clipboard library, no frameworks.

Requirements:
- An icon-based copy button placed inside a code block that reads the exact visible text content of the code element (not innerHTML, so no markup leaks into the copied value) and writes it to the clipboard via the Clipboard API's async write method, silently handling the case where that call is rejected (e.g. denied permission or non-secure context).
- The button must contain two SVG icons, a default copy icon and a checkmark icon, where only CSS visibility rules driven by a single toggled class control which one is shown — no direct style manipulation of the icons in JavaScript.
- Clicking the button must add that class immediately (synchronously, not waiting for the clipboard write to resolve) so the user gets instant visual feedback, and a timer must remove the class automatically after a couple of seconds to return to the default state.
- Ensure that clicking the button again while the confirmation state is still showing correctly resets and restarts that timer rather than leaving two competing timers that could reset the class early.
- A second, separate copy pattern: several rows of labeled credential values (like an API key and a webhook URL) each with their own inline "Copy" text button that copies that row's specific value (passed directly to the handler, not read from a shared DOM element) and temporarily swaps its own label text and styling to a confirmed state before reverting.
- Structure the code so that adding the same copy behavior to additional, independent code blocks on the same page requires passing a target identifier rather than duplicating the function.`,
    },
  }
};

export default copyButton;
