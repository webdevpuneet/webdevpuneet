const upgradeBanner = {
  id: 'upgrade-banner',
  title: 'Upgrade Banner',
  category: 'pricing',
  html: `<div class="app-shell">
  <!-- Simulated app bar -->
  <nav class="app-nav">
    <span class="nav-brand">MyApp</span>
    <span class="plan-chip">Free plan</span>
  </nav>

  <!-- App content area -->
  <main class="app-content">
    <div class="content-block"></div>
    <div class="content-block short"></div>

    <!-- Upgrade banner — shows at the top of the content area -->
    <div class="upgrade-banner" id="upgrade-banner">
      <div class="banner-left">
        <div class="banner-icon">⚡</div>
        <div class="banner-text">
          <strong>You're on the Free plan.</strong>
          <span>Unlock unlimited exports, API access, and priority support.</span>
        </div>
      </div>
      <div class="banner-right">
        <a href="#" class="upgrade-btn">Upgrade to Pro</a>
        <button class="dismiss-btn" onclick="dismiss()" aria-label="Dismiss">✕</button>
      </div>
    </div>

    <!-- Paywall gate for locked features -->
    <div class="feature-gate">
      <div class="gate-inner">
        <div class="gate-icon">🔒</div>
        <div class="gate-title">Team collaboration is a Pro feature</div>
        <p class="gate-desc">Invite your team, share workspaces, and collaborate in real time. Available on Pro and Team plans.</p>
        <a href="#" class="gate-cta">Upgrade to unlock</a>
        <a href="#" class="gate-link">See all Pro features →</a>
      </div>
    </div>

    <div class="content-block short"></div>
  </main>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; padding: 0; }

.app-shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

/* Simulated app nav */
.app-nav { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 24px; height: 52px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.nav-brand { font-weight: 800; font-size: 16px; color: #1e293b; }
.plan-chip { font-size: 11px; font-weight: 600; background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; padding: 3px 10px; border-radius: 20px; }

.app-content { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 16px; }

/* Fake content blocks */
.content-block { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; height: 80px; }
.content-block.short { height: 52px; }

/* Upgrade banner */
.upgrade-banner { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%); border: 1px solid #c4b5fd; border-radius: 14px; padding: 14px 16px; flex-wrap: wrap; }

.banner-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.banner-icon { font-size: 20px; flex-shrink: 0; }
.banner-text { font-size: 13px; color: #3730a3; }
.banner-text strong { font-weight: 700; margin-right: 4px; }
.banner-text span { opacity: 0.85; }

.banner-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.upgrade-btn { background: #6366f1; color: #fff; font-size: 13px; font-weight: 700; padding: 8px 18px; border-radius: 8px; text-decoration: none; white-space: nowrap; transition: background 0.15s; }
.upgrade-btn:hover { background: #4f46e5; }
.dismiss-btn { background: transparent; border: none; cursor: pointer; font-size: 14px; color: #7c3aed; padding: 4px 6px; border-radius: 6px; transition: background 0.15s; }
.dismiss-btn:hover { background: rgba(124,58,237,0.1); }

/* Paywall gate */
.feature-gate { background: #fff; border: 1.5px dashed #c4b5fd; border-radius: 20px; padding: 40px 24px; display: flex; align-items: center; justify-content: center; }
.gate-inner { text-align: center; max-width: 340px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.gate-icon  { font-size: 32px; }
.gate-title { font-size: 17px; font-weight: 800; color: #1e293b; }
.gate-desc  { font-size: 13px; color: #64748b; line-height: 1.6; }
.gate-cta { display: inline-block; margin-top: 4px; background: #6366f1; color: #fff; font-size: 14px; font-weight: 700; padding: 10px 24px; border-radius: 10px; text-decoration: none; transition: background 0.15s; }
.gate-cta:hover { background: #4f46e5; }
.gate-link  { font-size: 12px; color: #6366f1; text-decoration: none; }
.gate-link:hover { text-decoration: underline; }

/* Dismiss animation */
@keyframes slideUp { to { opacity: 0; max-height: 0; padding: 0; margin: 0; overflow: hidden; } }
.upgrade-banner.dismissed { animation: slideUp 0.3s ease forwards; }`,
  js: `function dismiss() {
  const banner = document.getElementById('upgrade-banner');
  banner.classList.add('dismissed');
  banner.addEventListener('animationend', () => banner.remove());
}`,

  seo: {
    title: 'Upgrade Banner — Free HTML CSS JS Paywall Snippet',
    description: 'Dismissible gradient upsell banner plus a locked feature gate with unlock CTA for in-app upgrades. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Upgrade Banner & Paywall Gate — Dismissible In-App Freemium Upsell Components',
      description: `If you are building a freemium SaaS product and need an in-app upgrade prompt that does not annoy users but does convert them, this snippet gives you two components: a dismissible upgrade banner for persistent plan awareness and a locked feature gate for blocking and explaining premium functionality.

**The upgrade banner — how it works**

The banner sits at the top of the content area and uses a CSS linear-gradient background from violet to blue with a matching border-color. The left side shows a lightning bolt icon, the current plan name in bold, and a short benefit description. The right side has an "Upgrade to Pro" button and a dismiss ✕ button.

The dismiss animation works entirely in CSS: clicking ✕ calls dismiss(), which adds the .dismissed class to the banner. That class triggers a @keyframes animation that animates max-height from the current value to 0 and opacity from 1 to 0 simultaneously. The animationend event listener fires when the animation completes and calls banner.remove() to clean up the DOM. No JavaScript height calculation, no getBoundingClientRect — just CSS driving the collapse and JS handling the cleanup.

**The paywall feature gate — how it works**

The feature gate replaces the actual content area of a locked feature. It uses a 1.5px dashed border in a violet tint — this dashed border is a well-established visual signal for "placeholder" or "locked" content. Inside, a lock icon, a title explaining which specific feature is gated, a description of the value the user would get, a primary "Upgrade to unlock" CTA, and a secondary "See all Pro features" text link.

This approach — showing the locked area with an explanation rather than hiding it entirely — is a deliberate conversion pattern. Users who see what they are missing have stronger upgrade intent than users who never encounter the feature. The dashed border communicates "this could be yours" rather than "this does not exist."

**Persisting dismiss state across page loads**

By default, the banner reappears on every page load. To persist the dismiss for N days, add localStorage.setItem("upgrade_dismissed", Date.now()) inside the dismiss() function. On page load, read the key: if the stored timestamp is within the TTL (e.g. Date.now() - stored < 7 * 24 * 60 * 60 * 1000), skip rendering the banner. For a server-rendered app, set a cookie instead so the server can skip the banner HTML entirely.

**When to show each component**

The banner is best for persistent but low-priority awareness — show it across all pages to free users but make it easy to dismiss. The feature gate is best at the point of intent — when a free user tries to use a specific premium feature. Combining both is the standard freemium pattern: banner for awareness, gate for conversion at the moment of need.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the ✕ dismiss button', text: 'The banner collapses upward and fades out via a CSS @keyframes animation. The animationend event removes it from the DOM. Clicking the banner area itself does nothing — only the ✕ button triggers the dismiss.' },
      { title: 'Update the banner text', text: 'In the HTML, edit the strong tag inside .banner-text to show your plan name ("You\'re on the Free plan"). Edit the span text to list the top 2-3 benefits of upgrading — keep it under one line.' },
      { title: 'Update the feature gate text', text: 'Change .gate-title to name the specific locked feature (e.g. "API access is a Pro feature"). Update .gate-desc to explain what the user gets and which plan unlocks it.' },
      { title: 'Wire the CTA buttons to your billing page', text: 'Replace href="#" on .upgrade-btn (banner) and .gate-cta (gate) with your Stripe checkout URL or billing portal link. Both can point to the same URL or to plan-specific checkout sessions.' },
      { title: 'Persist dismiss with localStorage', text: 'Inside dismiss() in the JS panel, add localStorage.setItem("upgrade_dismissed", Date.now()). On page load, check if the key exists and is within your TTL. If yes, set banner.style.display = "none" before the user sees it.' },
      { title: 'Export in your format', text: 'Click "JSX" to download a React component using useState for dismissed and conditional rendering. Click "Tailwind" for a Tailwind CSS version. Click "HTML" for a standalone file.' },
    ]},
    features: ['Dismissible banner: CSS @keyframes max-height + opacity collapse to 0','animationend event removes element from DOM — no layout height JS needed','Gradient banner background: linear-gradient(violet → blue) with matching border','Locked feature gate: 1.5px dashed violet border signals locked/placeholder content','Feature gate: primary upgrade CTA + secondary text link pattern','Plan badge chip in simulated app nav bar showing current plan','Responsive flex layout: banner wraps to two rows on narrow screens','Both components self-contained — no shared wrapper dependencies','Export as HTML file, React JSX component, or React + Tailwind CSS'],
    useCases: [
      { icon: 'MONEY', title: 'Persistent freemium upgrade awareness banner', desc: 'Show the banner across all pages for free-tier users. Make it easy to dismiss but keep it visible enough that users encounter the upgrade message regularly without feeling harassed.' },
      { icon: 'FLOW', title: 'Feature-level paywall gate for premium functionality', desc: 'Block the actual content area of premium features with the dashed-border gate. Research consistently shows users who see what they are missing convert at a higher rate than users for whom the feature simply does not appear.' },
      { icon: 'DESIGN', title: 'Context-triggered limit-reached prompts', desc: 'Trigger the banner dynamically when a user hits a free plan limit — for example, "You have used 4 of 5 free exports this month." Contextual prompts at the moment of intent convert significantly better than passive top-of-page banners.' },
      { icon: 'CODE', title: 'Learn CSS @keyframes height collapse animation', desc: 'The dismiss animation technique — animating max-height and opacity to 0 in @keyframes, then removing the element on animationend — applies to any dismissible notification, [cookie banner](/ui-snippets/cookie-banner/), or [alert banner](/ui-snippets/alert-banner/) in any project.' },
      { icon: 'STAR', title: 'Trial expiry and plan renewal notifications', desc: 'Replace the banner text with a [trial countdown](/ui-snippets/trial-countdown/) — "Your trial ends in 3 days." Store the trial start date in localStorage, compute the remaining days on load, and inject the count into the banner text dynamically.' },
      { icon: 'LEARN', title: 'Combine with usage calculator for conversion flow', desc: 'Link the gate upgrade CTA to the [usage calculator](/ui-snippets/usage-calculator/) snippet. Let the user see their personalised cost estimate before they commit — this single step reduces pricing objection and increases checkout completion rates.' },
      { icon: 'CODE', title: 'Related: Student & Nonprofit Discount Card', desc: 'See the [Student & Nonprofit Discount Card](/ui-snippets/pricing-student-discount-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the CSS dismiss animation work without JavaScript height calculation?', a: 'The @keyframes animation targets max-height (animating to 0) and opacity (animating to 0) simultaneously. max-height: 0 collapses the element\'s space in the layout without needing to know the actual pixel height. padding: 0 and margin: 0 are also set in the final keyframe so no spacing remains. The animationend event fires once the animation completes and calls banner.remove() to fully remove the element from the DOM.' },
      { q: 'How do I persist the dismiss state so the banner does not reappear on every page load?', a: 'In dismiss(), add localStorage.setItem("upgrade_dismissed", Date.now()) before the animation code. On every page load, check the stored timestamp: const dismissed = localStorage.getItem("upgrade_dismissed"); if (dismissed && Date.now() - dismissed < TTL_MS) banner.style.display = "none"; where TTL_MS is your desired duration in milliseconds (e.g. 604800000 for 7 days). Set TTL_MS to 0 to always show the banner until dismissed once.' },
      { q: 'How do I use this in a React application?', a: 'Click "JSX" to download. In React, replace the dismissed DOM manipulation with useState(false). Conditionally render the banner with {!dismissed && <div className="upgrade-banner">...</div>}. Call setDismissed(true) in the dismiss handler. For persistence, add localStorage logic inside a useEffect that runs on mount to check the stored dismiss timestamp.' },
      { q: 'How do I show the upgrade banner only for free-plan users?', a: 'In a backend-rendered app, check the user plan server-side and only include the banner HTML when plan === "free". In a React SPA, read the plan from your auth context: {user.plan === "free" && <UpgradeBanner />}. In vanilla JS with a global, check window.USER_PLAN === "free" at the top of the script and skip the banner if not free.' },
    ],
    aiPrompt: {
      paragraph: `Instead of reasoning through the CSS animation by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the dismiss() function waits for the animationend event before calling banner.remove(), rather than removing the element immediately when the keyframe starts. It's a good target for a UX-and-performance question too — ask whether animating max-height in the @keyframes rule (rather than height) has any downsides worth knowing about for banners with dynamically wrapping text. For extending it, have it add the commented-out localStorage persistence so the dismiss survives a page reload with an expiry window, wire the feature gate's "Upgrade to unlock" button to actually reveal the gated content in a demo mode, or turn the banner into a reusable component that swaps its message based on which plan limit was hit. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a dismissible in-app "upgrade to Pro" banner plus a separate locked feature gate, in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- A banner element with a gradient background, an icon, bold plan-name text, a short benefit description, an "Upgrade to Pro" link, and a dismiss button.
- Dismissing must not remove the element instantly. Clicking dismiss must add a class that triggers a CSS @keyframes animation collapsing the banner's max-height, opacity, padding, and margin all to zero over a short duration; only after the browser fires the animationend event on the banner should JavaScript actually remove it from the DOM.
- Do not use any JavaScript height measurement (no getBoundingClientRect, no scrollHeight reads) to drive the collapse — the animation must be pure CSS from a fixed starting size to zero.
- Separately, build a "feature gate" block that visually replaces a locked feature's content: a container with a dashed border (signaling "placeholder/locked" rather than "broken"), a lock icon, a title naming the specific gated feature, a short description of its value, a primary "Upgrade to unlock" call-to-action, and a secondary text link to see all plan features.
- Include commented-out code showing how you would persist the dismiss state in localStorage with a timestamp so the banner does not reappear on every subsequent page load within a set number of days.`,
    },
  },
};

export default upgradeBanner;
