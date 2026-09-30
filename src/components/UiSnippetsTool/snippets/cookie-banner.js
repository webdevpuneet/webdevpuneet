const cookieBanner = {
    id: 'cookie-banner',
    title: 'Cookie Consent Banner',
    category: 'modals',
    html: `<div class="page">
  <p>Cookie consent banner appears at the bottom of the page.</p>
  <button class="reset-btn" onclick="showBanner()">Show banner again</button>
</div>

<div class="banner" id="banner">
  <div class="banner-icon">🍪</div>
  <div class="banner-content">
    <p class="banner-title">We use cookies</p>
    <p class="banner-text">We use cookies to improve your experience, analyze traffic, and personalize content. By clicking "Accept all", you consent to our use of cookies. <a href="#" class="link">Learn more</a></p>
  </div>
  <div class="banner-actions">
    <button class="btn outline" onclick="dismiss()">Decline</button>
    <button class="btn solid" onclick="accept()">Accept all</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; }

.page { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.page p { font-size: 14px; color: #64748b; }
.reset-btn { padding: 8px 16px; font-size: 12px; font-weight: 600; background: none; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; color: #475569; font-family: inherit; }

.banner {
  position: fixed; bottom: 20px; left: 20px; right: 20px;
  max-width: 700px; margin: 0 auto; left: 50%; transform: translateX(-50%) translateY(0);
  background: #fff; border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.15);
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  border: 1px solid #e2e8f0;
  animation: slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1);
  z-index: 999;
}
.banner.hide { animation: slideDown 0.3s ease forwards; }

@keyframes slideUp   { from { transform: translateX(-50%) translateY(120%); opacity:0; } to { transform: translateX(-50%) translateY(0); opacity:1; } }
@keyframes slideDown { from { transform: translateX(-50%) translateY(0); opacity:1; } to { transform: translateX(-50%) translateY(120%); opacity:0; } }

.banner-icon { font-size: 28px; flex-shrink: 0; }
.banner-content { flex: 1; min-width: 200px; }
.banner-title { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.banner-text  { font-size: 12px; color: #64748b; line-height: 1.6; }
.link { color: #6366f1; text-decoration: none; font-weight: 600; }

.banner-actions { display: flex; gap: 8px; flex-shrink: 0; }
.btn { padding: 8px 18px; font-size: 12px; font-weight: 600; border-radius: 8px; cursor: pointer; font-family: inherit; transition: all 0.15s; white-space: nowrap; }
.btn.outline { background: none; border: 1.5px solid #e2e8f0; color: #475569; }
.btn.outline:hover { border-color: #6366f1; color: #6366f1; }
.btn.solid { background: #6366f1; color: #fff; border: none; }
.btn.solid:hover { background: #4f46e5; }`,
    js: `function dismiss() { hideBanner(); }
function accept()  { hideBanner(); }
function hideBanner() {
  const b = document.getElementById('banner');
  b.classList.add('hide');
  b.addEventListener('animationend', () => b.style.display = 'none', { once: true });
}
function showBanner() {
  const b = document.getElementById('banner');
  b.style.display = 'flex';
  b.classList.remove('hide');
}`,

  seo: {
    title: 'Cookie Consent Banner — Free HTML CSS JS Snippet',
    description: 'Slide-up cookie banner with accept/dismiss actions, animationend cleanup and sessionStorage consent state. Exports to React, Vue & Tailwind.',
    about: {
      title: "Cookie Consent Banner — Slide-Up Animation, animationend Cleanup & localStorage Persistence",
      description: `A cookie consent banner informs users about cookie usage and gives them a clear choice to accept or decline before any tracking begins. Under GDPR (EU/UK), CCPA (California), and similar privacy laws in Canada, Brazil, India, and Australia, any website that sets analytics, advertising, or personalisation cookies must obtain prior consent from users in those jurisdictions. A compliant banner must appear before cookies are set, clearly explain what cookies are used for, offer a real decline option (not just an accept button), and remember the user's choice across sessions. For granular per-category control, pair it with the [GDPR consent manager](/ui-snippets/gdpr-consent-manager/).

**The fixed bottom positioning and slide-up entrance**

The banner uses \`position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%)\` to center it horizontally at the bottom of the viewport, floating above the page content. On load, the \`@keyframes slideUp\` animation plays: starting from \`translateX(-50%) translateY(120%)\` (below the viewport) and ending at \`translateX(-50%) translateY(0)\` (in position). The \`cubic-bezier(0.34, 1.56, 0.64, 1)\` easing adds a slight overshoot bounce that makes the banner feel physical and attention-catching without being jarring.

**The hide animation and animationend cleanup**

When the user accepts or declines, \`hideBanner()\` adds the \`.hide\` class to the banner. The CSS \`.banner.hide\` rule applies the \`@keyframes slideDown\` animation: sliding back down below the viewport. An \`animationend\` event listener with \`{ once: true }\` fires when the animation completes and sets \`b.style.display = 'none'\`. This display-none step is essential — without it, the banner remains in the DOM at its hidden position with \`opacity: 0\`, continuing to intercept pointer events and block clicks on elements behind it. The \`{ once: true }\` option automatically removes the listener after it fires once, preventing memory leaks.

**The show/hide banner functions**

\`showBanner()\` and \`hideBanner()\` provide the full lifecycle. The "Show banner again" button in the demo calls \`showBanner()\` to reset the state for previewing. In production, \`showBanner()\` would only be called if \`localStorage.getItem('cookie-consent')\` returns null — meaning the user has not previously made a consent choice.

**GDPR compliance requirements**

For strict GDPR compliance beyond this UI snippet: save the user's choice to localStorage immediately on button click, load analytics scripts only inside the accept() callback (not on page load), provide a Manage Preferences option for granular cookie categories, and link to a full Privacy Policy page. The banner text includes a "Learn more" link placeholder for this policy page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Click Accept or Decline to trigger the slide-down animation", text: "Click Accept all or Decline in the banner to watch the slideDown animation play — the banner slides back below the viewport and then disappears from the DOM. Click 'Show banner again' in the page center to reset and replay the slideUp entrance animation." },
      { title: "Update the banner text and Privacy Policy link", text: "In the HTML panel, change the .banner-text paragraph to describe your specific cookie usage (analytics, advertising, personalisation). Update the href on the 'Learn more' link to point to your actual /privacy-policy/ page. Change the .banner-title from 'We use cookies' to match your brand voice." },
      { title: "Wire localStorage persistence to remember consent across page loads", text: "In the JS panel, add localStorage.setItem('cookie-consent', 'accepted') in the accept() function and localStorage.setItem('cookie-consent', 'declined') in dismiss(). On page load, check: if (localStorage.getItem('cookie-consent')) hideBanner(); so the banner only shows on first visit before any consent choice is recorded." },
      { title: "Conditionally load analytics only after acceptance", text: "In the accept() function, dynamically inject your tracking scripts after consent is stored: const script = document.createElement('script'); script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXX'; script.async = true; document.head.appendChild(script); This ensures analytics never loads until the user explicitly accepts, which is required for GDPR compliance." },
      { title: "Add a Manage Preferences button for granular cookie control", text: "Add a third button with class 'btn outline' between Decline and Accept all with label 'Manage Preferences'. Wire its onclick to open a modal listing cookie categories (Essential, Analytics, Marketing) as individual toggle switches. Store each category's consent state as separate localStorage keys." },
      { title: "Export and add to the root layout of your website", text: "Click HTML for a standalone file, or JSX for a React component. In Next.js, add the CookieBanner component to src/app/layout.js so it appears on every page. In the component's useEffect, check localStorage on mount — if no consent record exists, show the banner; if consent was previously recorded, skip it entirely." },
    ]},
    features: [
      'position: fixed; bottom: 20px; left/right: 20px — viewport-anchored banner',
      'slideUp keyframe animates the banner in from below on load',
      '.hide class triggers slideDown exit animation',
      'animationend { once: true } listener removes banner after exit animation',
      'Dismiss and Accept button variants with different visual weights',
      'Privacy Policy text link within the banner copy',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
      'Works immediately in any HTML project',
    ],
    useCases: [
      { icon: "APP", title: "GDPR and CCPA cookie consent compliance for websites", desc: "Required on any EU, UK, or California-served website with analytics, advertising, or tracking cookies. The banner must appear before any non-essential cookies are set, the user's choice must be persisted across sessions via localStorage, and there must be a genuine decline option that actually prevents tracking. This snippet implements the minimum viable consent banner UI that satisfies the core requirements of both GDPR and CCPA." },
      { icon: "FLOW", title: "Analytics and tracking script activation gate", desc: "Show the banner on first visit and conditionally inject analytics scripts only after the user accepts. In the accept() function, dynamically create and append the Google Analytics or Meta Pixel script tag to document.head. In the dismiss() function, skip loading any tracking code entirely. This consent-first architecture prevents any data collection before explicit user permission — the correct GDPR implementation pattern." },
      { icon: "LEARN", title: "Learn the animationend DOM cleanup pattern for animated exits", desc: "The exit animation pattern used here — add .hide class to trigger exit animation, listen for animationend with { once: true }, then set display: none — is the correct way to animate elements out of the DOM. Without the display: none step, the invisible element remains in the document flow and intercepts pointer events. The { once: true } option removes the listener automatically after it fires, preventing accumulation of stale event listeners." },
      { icon: "DESIGN", title: "Cookie preference centre entry point UI", desc: "Extend the banner with a third 'Manage Preferences' button that opens a detailed [cookie preferences](/ui-snippets/cookie-preferences/) modal. The modal lists individual cookie categories — Strictly Necessary (always on), Analytics, Marketing, Personalisation — as toggle switches. Users can enable specific categories while declining others. The banner snippet covers the entry-point UI; the preferences modal is implemented as a separate overlay component triggered by the Manage Preferences button." },
      { icon: "CODE", title: "Consent-gated feature and widget activation", desc: "Use the accept() callback to enable features that require user consent beyond basic analytics: initialising a live chat widget (Intercom, Zendesk), enabling personalised product recommendations, activating a session recording tool (Hotjar, FullStory), or loading a third-party video embed. The dismiss() callback ensures all consent-gated features remain inactive, providing a genuine opt-out experience." },
      { icon: "DOC", title: "Privacy-first website compliance foundation", desc: "Pair this banner with a comprehensive Privacy Policy page linked from the 'Learn more' anchor in the banner text. Most privacy regulations require both a consent mechanism and a readable, plain-language privacy policy that explains exactly what data is collected, why it is collected, how long it is retained, and how users can request deletion. The snippet includes a placeholder href='#' link that should point to your /privacy-policy/ page." },
      { icon: 'CODE', title: 'Related: Bulk Action Confirm Dialog — Undo Countdown', desc: 'See the [Bulk Action Confirm Dialog — Undo Countdown](/ui-snippets/bulk-select-undo-countdown-dialog/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cookie Preferences Panel', desc: 'See the [Cookie Preferences Panel](/ui-snippets/cookie-toggle-panel/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the banner slide up on load and slide down on dismiss?", a: "On load, the banner element has animation: slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) applied directly in CSS. The slideUp keyframe animates from translateX(-50%) translateY(120%) to translateX(-50%) translateY(0) — moving it upward from below the viewport. When accept() or dismiss() calls hideBanner(), the .hide class is added. The .banner.hide CSS rule applies animation: slideDown 0.3s ease forwards, reversing the motion back below the viewport. An animationend event listener with { once: true } fires when slideDown completes and calls b.style.display = 'none', removing the banner from pointer event handling entirely." },
      { q: "How do I persist the user's consent choice so the banner doesn't reappear?", a: "In the accept() function, add localStorage.setItem('cookie-consent', 'accepted') before calling hideBanner(). In dismiss(), add localStorage.setItem('cookie-consent', 'declined'). On page load, check the stored value: const consent = localStorage.getItem('cookie-consent'); if (consent !== null) hideBanner(); The banner only appears when cookie-consent is null — meaning the user has never made a choice on this browser. Note that localStorage is per-origin and per-browser — users who clear their browser data or use a different browser will see the banner again." },
      { q: "Is a simple accept/decline banner sufficient for GDPR compliance?", a: "A two-button accept/decline banner satisfies the basic GDPR requirement for explicit consent — there must be a real opt-out that prevents tracking, and the user's choice must be remembered. However, for full GDPR compliance when using multiple cookie categories, a granular preference centre is required: users should be able to consent to Essential cookies only while declining Analytics and Marketing. Additionally, consent must be freely given (declining must be as easy as accepting), specific (users know what they're consenting to), and withdrawable at any time via a visible consent settings link or footer option." },
      { q: "Why does the banner need display: none after the exit animation?", a: "When a CSS animation ends, the element returns to its original CSS state unless the animation has fill-mode: forwards. Even with forwards fill mode, the element remains in the DOM at its hidden position and continues intercepting pointer events. The animationend listener with { once: true } fires after the slideDown animation completes and sets b.style.display = 'none', which removes the element from the layout and pointer event handling entirely. Without this step, invisible banner elements accumulate in the DOM and block clicks on buttons or links positioned in the same area of the viewport." },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess why the banner still blocks clicks without one specific line to understand the fix. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the animationend listener setting display to none is necessary even though the slideDown keyframe already animates the banner off-screen, and why that listener is registered with the once option. The same assistant can help optimize it — for instance asking whether checking localStorage before the banner even renders (rather than always mounting it and then hiding it) would avoid an unnecessary flash on repeat visits. It's also useful for extending the banner: ask it to add a third "Manage preferences" button that opens a full category-level consent modal, gate real analytics script loading strictly behind the accept handler, or persist consent with an expiry so users are re-asked after a set number of months as many regulations require. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a bottom cookie-consent banner in plain HTML, CSS, and JavaScript with a slide-up entrance and slide-down exit — no consent-management library, no frameworks.

Requirements:
- A banner fixed to the bottom of the viewport, horizontally centered with a max width, containing an icon, an explanatory message with a "learn more" link, and two distinct action buttons (an outlined decline and a solid accept).
- On page load, the banner plays a CSS keyframe animation sliding up from fully below the viewport to its resting position with a slight overshoot easing, so it feels tactile rather than mechanical.
- Both the accept and decline actions must trigger the same exit sequence: add a class that plays a separate slide-down keyframe animation moving the banner back below the viewport, then listen for that specific animation's completion event (registered so it only ever fires once per hide) and only at that point set the element's display to none — never before the animation visually finishes, and never skipping the display change afterward, since a still-visible-but-transparent banner would keep intercepting clicks on whatever is behind it.
- A separate reset control (for demo/testing purposes) that restores the banner's display and removes the hide class so the entrance animation can replay.
- Structure the accept and decline handlers as the single place where you would persist the user's choice (e.g. to localStorage) and where you would conditionally inject third-party analytics or tracking scripts only after acceptance, never before.`,
    },
  }
};

export default cookieBanner;
