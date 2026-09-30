const floatingShareDock = {
  id: 'floating-share-dock',
  title: 'Floating Share Dock',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<article class="fsd-page">
  <div class="fsd-dock" id="fsdDock" aria-label="Share this article">
    <button class="fsd-btn" data-net="twitter" type="button" aria-label="Share on X" style="--c:#0f172a">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 3h3.3l-7.2 8.2L22.8 21h-6.6l-5.2-6.8L4.9 21H1.6l7.7-8.8L1.2 3h6.8l4.7 6.2L18.2 3zm-1.2 16h1.8L7.1 4.9H5.2L17 19z"/></svg>
    </button>
    <button class="fsd-btn" data-net="facebook" type="button" aria-label="Share on Facebook" style="--c:#1877f2">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
    </button>
    <button class="fsd-btn" data-net="linkedin" type="button" aria-label="Share on LinkedIn" style="--c:#0a66c2">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.5v11H3.5v-11h3.4zM5.2 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM20.5 19.5h-3.4v-5.8c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8v6.1H9.2s.1-9.9 0-11h3.4v1.6c.5-.7 1.3-1.7 3.1-1.7 2.3 0 4 1.5 4 4.7v6.4z"/></svg>
    </button>
    <button class="fsd-btn" data-net="copy" type="button" aria-label="Copy link" style="--c:#6366f1">
      <svg class="fsd-ico-link" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
      <svg class="fsd-ico-ok" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
    </button>
    <span class="fsd-count" id="fsdCount">128</span>
  </div>

  <div class="fsd-content">
    <h1>The quiet power of small interfaces</h1>
    <p>Share buttons that follow the reader down the page keep sharing one tap away without interrupting the content. Hover any button to see its label and brand colour; tap copy to grab the link.</p>
    <p>This dock stays pinned to the left edge on desktop and drops to a horizontal bar on mobile.</p>
  </div>

  <div class="fsd-toast" id="fsdToast" role="status" aria-live="polite">Link copied</div>
</article>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 40px; }

.fsd-page { position: relative; max-width: 640px; margin: 0 auto; }

.fsd-dock {
  position: fixed;
  left: 28px; top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 10px; align-items: center;
  padding: 12px 8px;
  background: #fff;
  border: 1px solid #e8edf3;
  border-radius: 16px;
  box-shadow: 0 10px 36px rgba(15, 23, 42, 0.1);
}

.fsd-btn {
  position: relative;
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  background: #f1f5f9; border: none; border-radius: 11px;
  color: #64748b; cursor: pointer;
  transition: background 0.18s, color 0.18s, transform 0.15s;
}
.fsd-btn svg { width: 19px; height: 19px; }
.fsd-btn[data-net="copy"] svg { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.fsd-btn:not([data-net="copy"]) svg { fill: currentColor; }
.fsd-btn:hover { background: var(--c); color: #fff; transform: translateY(-2px); }

.fsd-btn[data-net="copy"] .fsd-ico-ok { display: none; }
.fsd-btn.copied { background: #059669; color: #fff; }
.fsd-btn.copied .fsd-ico-link { display: none; }
.fsd-btn.copied .fsd-ico-ok { display: block; }

/* Tooltip label on hover */
.fsd-btn::after {
  content: attr(aria-label);
  position: absolute; left: calc(100% + 10px); top: 50%;
  transform: translateY(-50%) scale(0.9);
  transform-origin: left center;
  padding: 5px 9px;
  background: #0f172a; color: #fff;
  font-size: 11.5px; font-weight: 600; white-space: nowrap;
  border-radius: 6px;
  opacity: 0; pointer-events: none;
  transition: opacity 0.15s, transform 0.15s;
}
.fsd-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }

.fsd-count { font-size: 12px; font-weight: 700; color: #94a3b8; margin-top: 2px; padding-top: 8px; border-top: 1px solid #eef2f7; width: 100%; text-align: center; }

.fsd-content { padding-left: 40px; }
.fsd-content h1 { font-size: 30px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1.2; }
.fsd-content p { font-size: 16px; line-height: 1.7; color: #475569; margin-top: 18px; }

.fsd-toast {
  position: fixed; left: 50%; bottom: 28px;
  transform: translate(-50%, 80px);
  padding: 10px 18px;
  background: #0f172a; color: #fff;
  font-size: 13px; font-weight: 600;
  border-radius: 999px;
  opacity: 0; pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s;
}
.fsd-toast.show { transform: translate(-50%, 0); opacity: 1; }

@media (max-width: 720px) {
  .fsd-dock { flex-direction: row; left: 50%; top: auto; bottom: 20px; transform: translateX(-50%); padding: 8px 12px; }
  .fsd-btn::after { left: 50%; top: auto; bottom: calc(100% + 8px); transform: translateX(-50%) scale(0.9); transform-origin: center bottom; }
  .fsd-btn:hover::after { transform: translateX(-50%) scale(1); }
  .fsd-count { width: auto; border-top: none; border-left: 1px solid #eef2f7; padding-top: 0; padding-left: 10px; margin-top: 0; }
  .fsd-content { padding-left: 0; padding-bottom: 70px; }
}`,
  js: `const dock = document.getElementById('fsdDock');
const toast = document.getElementById('fsdToast');
const countEl = document.getElementById('fsdCount');
let toastTimer = null;

const SHARE_URL = window.location.href;
const SHARE_TEXT = document.querySelector('.fsd-content h1').textContent;

const INTENTS = {
  twitter:  u => 'https://twitter.com/intent/tweet?url=' + u + '&text=' + encodeURIComponent(SHARE_TEXT),
  facebook: u => 'https://www.facebook.com/sharer/sharer.php?u=' + u,
  linkedin: u => 'https://www.linkedin.com/sharing/share-offsite/?url=' + u,
};

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

dock.addEventListener('click', async (e) => {
  const btn = e.target.closest('.fsd-btn');
  if (!btn) return;
  const net = btn.dataset.net;
  const url = encodeURIComponent(SHARE_URL);

  if (net === 'copy') {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = SHARE_URL; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    btn.classList.add('copied');
    showToast('Link copied');
    setTimeout(() => btn.classList.remove('copied'), 1800);
    return;
  }

  // Optimistically bump the share count
  countEl.textContent = parseInt(countEl.textContent, 10) + 1;
  window.open(INTENTS[net](url), '_blank', 'noopener,width=600,height=520');
});`,
  seo: {
    title: 'Floating Share Dock — Free HTML CSS JS Social Snippet',
    description: 'A sticky vertical social share dock with X, Facebook, LinkedIn, copy-link and hover labels that drops to a bar on mobile. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Floating Share Dock — Sticky Vertical Social Share Bar with Copy Link and Tooltips',
      description: `Readers share what is easy to share. A floating share dock — a small vertical bar pinned to the side of an article that scrolls with the reader — keeps sharing one tap away at every point in the content, without a clunky row of buttons interrupting the text. This component is a complete share dock with X (Twitter), Facebook, and LinkedIn intent links, a copy-link button with a clipboard fallback, hover tooltips, an optimistic share count, and a responsive layout that drops from a left-edge vertical column to a bottom horizontal bar on mobile. It is built in HTML, CSS, and vanilla JavaScript.

**Fixed positioning that follows the reader**

The dock uses \`position: fixed\` with \`left: 28px; top: 50%\` and \`transform: translateY(-50%)\` to centre it vertically against the viewport. Because it is fixed rather than absolute, it stays in place as the article scrolls — always reachable without hunting for it. The article content is given left padding so the text never collides with the dock. This is the pattern used by Medium, news sites, and most long-form blogs.

**Share intent links, not SDKs**

Each network button opens a share "intent" URL — the official endpoint each platform provides for pre-filled sharing (\`twitter.com/intent/tweet\`, \`facebook.com/sharer\`, \`linkedin.com/sharing/share-offsite\`). The script builds these from the current page URL and title with \`encodeURIComponent\` and opens them in a sized popup window via \`window.open(..., 'noopener,width=600,height=520')\`. This approach needs no third-party SDK, loads no tracking scripts, and adds zero weight to the page — a deliberate contrast to the heavy official share widgets that slow sites down.

**Copy link with clipboard fallback**

The copy button writes the page URL to the clipboard with the async \`navigator.clipboard.writeText()\` API, wrapped in a \`try/catch\` that falls back to a hidden-textarea \`document.execCommand('copy')\` for insecure contexts. On success the button swaps its link icon for a green checkmark (a pure-CSS icon toggle via the \`.copied\` class) and a toast slides up confirming "Link copied." Both the icon and the toast reset on timers that are cleared on repeat clicks.

**CSS tooltips from aria-label**

Each button reveals its label on hover using a \`::after\` pseudo-element whose content is \`attr(aria-label)\` — so the accessible label and the visible tooltip are the same single source of truth, and there is no duplicated text to keep in sync. The tooltip fades and scales in beside the button. On hover the network buttons also fill with their real brand colour (X black, Facebook blue, LinkedIn blue), passed in via a \`--c\` CSS custom property on each button, so theming a button is a one-attribute change.

**Optimistic share count**

A small count sits at the bottom of the dock. Clicking a network button optimistically increments it immediately with \`parseInt\` + 1, rather than waiting for a server round-trip — the responsive feedback that makes the interaction feel instant. In production you would reconcile this with a real count from your analytics or a share-count API, but the optimistic bump is what users perceive.

**Responsive vertical-to-horizontal flip**

A media query at 720px transforms the dock from a vertical left-edge column into a horizontal bar fixed to the bottom-centre of the screen — the mobile-friendly placement within thumb reach. The tooltips re-orient to appear above the buttons instead of beside them, and the share count's divider switches from a top border to a left border. The same component serves desktop and mobile with only CSS changes.

**Customisation**

Set \`SHARE_URL\` and \`SHARE_TEXT\` (they default to the live page URL and the H1) to control what gets shared. Add or remove network buttons by editing the markup and the \`INTENTS\` map. Change each button's \`--c\` brand colour, swap the \`#6366f1\` copy accent and \`#059669\` success green, and adjust the dock offset and radius to match your layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A vertical share dock pins to the left edge beside the article, with X, Facebook, LinkedIn, copy, and a share count.` },
      { title: 'Hover a button', text: `A tooltip with the network name fades in beside it and the button fills with that network's brand colour.` },
      { title: 'Click a network', text: `A sized share popup opens pre-filled with the page URL and title, and the share count bumps up by one.` },
      { title: 'Click copy', text: `The page link is copied, the icon turns into a green check, and a toast slides up confirming "Link copied."` },
      { title: 'Resize to mobile', text: `Below 720px the dock becomes a horizontal bar fixed to the bottom-center with tooltips flipping above the buttons.` },
      { title: 'Set the share target', text: `Edit SHARE_URL and SHARE_TEXT, and add or remove buttons via the markup and the INTENTS map.` },
    ]},
    features: [
      { title: 'Sticky fixed dock', text: `position: fixed keeps the bar reachable as the article scrolls, the way long-form blogs place share controls.` },
      { title: 'SDK-free intent links', text: `Opens official X, Facebook, and LinkedIn share endpoints in a sized popup — no third-party scripts or tracking weight.` },
      { title: 'Copy link with fallback', text: `Async Clipboard API with a hidden-textarea execCommand fallback, plus a CSS icon swap to a green check on success.` },
      { title: 'aria-label tooltips', text: `Hover labels are drawn from attr(aria-label) so the accessible name and the visible tooltip stay one source of truth.` },
      { title: 'Brand-colour hover', text: `Each button fills with its real network colour via a --c custom property on hover for instant recognisability.` },
      { title: 'Optimistic share count', text: `Clicks bump the count immediately for instant feedback rather than waiting on a network round-trip.` },
      { title: 'Vertical-to-horizontal responsive', text: `A single media query flips the dock to a bottom bar and re-orients tooltips for mobile thumb reach.` },
      { title: 'Configurable targets', text: `SHARE_URL and SHARE_TEXT plus an INTENTS map make the networks and shared content easy to change.` },
    ],
    useCases: [
      { title: 'Blog and article pages', text: `Keep sharing one tap away as readers move down a long post — pair with a [reading progress bar](/ui-snippets/scroll-progress/) and a [pull quote](/ui-snippets/pull-quote/).` },
      { title: 'Documentation and guides', text: `Let readers share a specific guide quickly; complements a [table of contents](/ui-snippets/table-of-contents/) for navigation.` },
      { title: 'News and magazine layouts', text: `The pinned side dock matches the pattern readers already expect from major publishers.` },
      { title: 'Product and landing pages', text: `Encourage organic sharing of a launch or campaign page with low-friction buttons.` },
      { title: 'Portfolio case studies', text: `Make it easy for visitors to pass along your work; for a horizontal in-content row use a [social share bar](/ui-snippets/social-share-bar/) instead.` },
      { title: 'Learning share-intent patterns', text: `A reference for SDK-free social sharing, clipboard copy with fallback, and aria-label-driven tooltips.` },
      { icon: 'CODE', title: 'Related: Liquid Glass Navbar', desc: 'See the [Liquid Glass Navbar](/ui-snippets/liquid-glass-navbar/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Do the share buttons work without any third-party script?', a: `Yes. Each button opens that platform's official share-intent URL (twitter.com/intent/tweet, facebook.com/sharer, linkedin.com/sharing/share-offsite) in a popup window. There is no Facebook SDK, no Twitter widget script, and no tracking pixel — just a link with the page URL and title encoded into it. This keeps the page fast and avoids loading the platforms' heavy official widgets.` },
      { q: 'How do I control what URL and text get shared?', a: `Edit the SHARE_URL and SHARE_TEXT constants at the top of the script. They default to window.location.href and the page's H1, but you can set them to a canonical URL and a custom share message. The values are encoded with encodeURIComponent before being inserted into the intent links, so special characters are handled safely.` },
      { q: 'How do I add or remove a network?', a: `Add a button with a data-net attribute and a --c brand colour in the markup, then add a matching entry to the INTENTS map that returns the share URL for that network. To remove one, delete its button and its INTENTS entry. The copy button is handled separately in the click logic, so it is independent of the network list.` },
      { q: 'Why bump the count before the share completes?', a: `It is an optimistic update — the count increments immediately so the interaction feels instant, rather than waiting for a popup to open and a server to confirm. In production you would fetch the real count from a share-count API or your analytics on load and reconcile, but the instant local bump is what users perceive as responsiveness.` },
      { q: 'How do I use this share dock in React, Vue, or Angular?', a: `Render the buttons from a config array of { net, label, color, intent }. The click handler stays nearly identical — open the intent URL or copy the link — but read the URL/title from props or the router rather than the DOM. Hold the copied and count state in the framework and bind them to the .copied class and the count text; clear the copy/toast timeouts in a cleanup hook. The fixed positioning, tooltips, and brand-colour hover are all CSS and port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the clipboard fallback or the tooltip trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the tooltip's content comes from attr(aria-label) instead of a separate data attribute, and why the copy button's try/catch falls back to a hidden textarea with execCommand rather than just failing silently when navigator.clipboard is unavailable. The same assistant can help optimize it — ask whether the share count increment should be reconciled against a real share-count API instead of staying purely optimistic forever, or whether opening three separate share-intent popups needs any additional focus-management for accessibility. It's also useful for extending the dock: have it add more networks (Reddit, WhatsApp, email) using the same INTENTS map pattern, a native Web Share API branch for mobile that replaces the popup on supporting devices, or a "shared" celebration animation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a sticky vertical social share dock for an article page in plain HTML, CSS, and JavaScript — no third-party SDKs, no tracking scripts, only official share-intent URLs opened in popups.

Requirements:
- A fixed-position dock pinned to the left edge of the viewport, vertically centered, containing icon buttons for at least three social networks plus a copy-link button and a small share count, all inside a card-styled container with a shadow.
- Each network button must open that platform's official share-intent URL (built from the current page's URL and title, properly encoded) in a new popup window sized roughly 600x520 with noopener, rather than loading any SDK or widget script. Store the network-to-intent-URL mapping in a single lookup object keyed by network name so adding a network is a one-line addition.
- Each button's hover tooltip must be a CSS ::after pseudo-element whose text content comes directly from that button's aria-label attribute (using the attr() CSS function), so the accessible label and the visible tooltip can never drift out of sync. Each button must also visually fill with its own real brand color on hover, driven by a per-button CSS custom property rather than a hardcoded per-button CSS rule.
- The copy-link button must attempt navigator.clipboard.writeText first, and only if that throws (e.g. an insecure context), fall back to creating a temporary off-screen textarea, selecting its text, and calling document.execCommand('copy'), then removing the textarea. On success, swap the button's icon from a link icon to a checkmark icon using a CSS class (not by replacing DOM nodes) and show a toast notification that fades in and back out on a timer.
- Clicking any social network button must optimistically increment the visible share count immediately, without waiting for the popup or any network confirmation.
- Add a media query that, below a reasonable breakpoint, converts the dock from a vertical left-edge column into a horizontal bar fixed to the bottom-center of the screen, with the tooltips reorienting to appear above the buttons instead of beside them.`,
    },
  },
};

export default floatingShareDock;
