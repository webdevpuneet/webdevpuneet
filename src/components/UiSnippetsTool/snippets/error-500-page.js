const error500Page = {
  id: 'error-500-page',
  title: '500 Internal Server Error Page',
  category: 'layouts',
  html: `<div class="error-page">
  <div class="illustration">
    <svg viewBox="0 0 200 160" width="220" height="176">
      <circle cx="100" cy="80" r="70" fill="#eef2ff"/>
      <rect x="55" y="55" width="90" height="60" rx="8" fill="#fff" stroke="#c7d2fe" stroke-width="2"/>
      <rect x="55" y="55" width="90" height="16" rx="8" fill="#6366f1"/>
      <circle cx="63" cy="63" r="2.5" fill="#fff"/>
      <circle cx="70" cy="63" r="2.5" fill="#fff"/>
      <circle cx="77" cy="63" r="2.5" fill="#fff"/>
      <path d="M75 88l12 12 12-16" stroke="#fca5a5" stroke-width="0" fill="none"/>
      <path d="M95 78l16 16M111 78l-16 16" stroke="#f87171" stroke-width="4" stroke-linecap="round"/>
      <circle cx="103" cy="86" r="20" fill="none" stroke="#f87171" stroke-width="2" stroke-dasharray="3 4"/>
    </svg>
  </div>
  <div class="code">500</div>
  <h1>Something went wrong on our end</h1>
  <p>Our server hit an unexpected error while handling your request. It's not something you did — our team has already been notified and is looking into it.</p>
  <div class="actions">
    <button class="btn primary" onclick="location.reload()">Try again</button>
    <a class="btn secondary" href="#">Go home</a>
  </div>
  <p class="ref">Error reference: <code>ERR-500-8F2A1C</code></p>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; }

.error-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
}

.illustration { margin-bottom: 8px; }

.code {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #f87171;
  background: #fef2f2;
  padding: 4px 14px;
  border-radius: 999px;
  margin-bottom: 18px;
}

.error-page h1 {
  font-size: 24px;
  color: #1e293b;
  margin: 0 0 10px;
  max-width: 420px;
}

.error-page p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  max-width: 420px;
  margin: 0 0 24px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  padding: 11px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: background 0.15s, transform 0.1s, border-color 0.15s;
}
.btn:active { transform: scale(0.97); }

.btn.primary { background: #6366f1; color: #fff; }
.btn.primary:hover { background: #4f46e5; }

.btn.secondary {
  background: #fff;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  display: inline-flex;
  align-items: center;
}
.btn.secondary:hover { background: #f1f5f9; }

.ref { font-size: 12px !important; color: #94a3b8 !important; margin: 0 !important; }
.ref code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ui-monospace, monospace;
}`,
  js: `// "Try again" reloads the current page, which is the most common
// recovery action for a transient 500 error. In a real app, replace
// this with a retry of the specific failed request instead of a full
// page reload, and generate the error reference id from your logging
// backend so support can look up the exact incident.
document.querySelector('.btn.primary')?.addEventListener('click', () => {
  // location.reload() is already wired via the inline onclick above;
  // this listener is a placeholder for adding analytics tracking, e.g.:
  // analytics.track('error_page_retry_clicked');
});`,

  seo: {
    title: '500 Internal Server Error Page — Free HTML CSS JS Full-Page Snippet',
    description: 'A friendly full-page 500 error state with an inline SVG illustration, message, retry and go-home actions, and an error reference code.',
    about: {
      title: '500 Internal Server Error Page — HTML, CSS & JavaScript Snippet',
      description: `A 500 error means something broke on the server, not something the visitor did wrong — but a bare "Internal Server Error" text page still feels alarming and offers no path forward. A good error page acknowledges the problem in plain language, gives the user something to do next, and provides a reference they (or your support team) can use to trace the specific incident.

This snippet builds that full-page state in **plain HTML, CSS, and vanilla JavaScript**, with a self-contained inline SVG illustration and no external image assets.

**The illustration**

The graphic is a single inline \`<svg>\` — a rounded browser-window shape with a red X and a dashed circle overlaid to suggest "broken," all drawn with basic shapes (\`circle\`, \`rect\`, \`path\`). Because it's inline SVG rather than a \`<img>\` pointing at a hosted file, it has zero network requests, scales crisply at any size, and its colors can be restyled directly in the CSS panel by targeting its \`fill\`/\`stroke\` attributes if you convert them to CSS custom properties.

**The two-action pattern**

Two buttons cover the two realistic outcomes: "Try again" calls \`location.reload()\` for the common case where the error was transient (a dropped connection, a momentary server hiccup), and "Go home" is a plain link back to a safe, known-good page. Keeping to exactly two clear actions avoids overwhelming someone who just hit an error with a long list of options.

**Why show an error reference code**

The \`ERR-500-8F2A1C\`-style reference at the bottom gives users something concrete to quote to support, and gives your team something to grep for in server logs. In production, generate this from your actual error-tracking system (like a Sentry event id or a request id from your logging middleware) rather than hardcoding it — it should uniquely identify the specific failed request.

**Tone matters**

The copy deliberately avoids technical jargon and blame — "Something went wrong on our end" plus "it's not something you did" reassures the visitor the issue is on your side, which measurably reduces frustration and abandonment on error pages compared to a raw stack trace or HTTP status text.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "500 Internal Server Error Page" in the sidebar Library tab to see the full-page error state in the preview.' },
        { title: 'Wire it to your server framework', text: 'Configure your backend or hosting platform (e.g. a custom error page route, or a Next.js pages/500.js file) to render this markup when a 500 status occurs.' },
        { title: 'Connect the retry button', text: 'In the JS panel, replace or extend the click handler to retry the specific failed request or API call instead of a full location.reload().' },
        { title: 'Generate a real error reference', text: 'Replace the hardcoded ERR-500-8F2A1C text with a real event or request id from your error-tracking or logging system.' },
        { title: 'Restyle the illustration', text: 'Edit the inline SVG\'s fill and stroke colors in the HTML panel to match your brand palette.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Self-contained inline SVG illustration — zero external image requests',
      'Two clear recovery actions: retry the current action or navigate to a safe page',
      'Reassuring, non-technical copy that avoids blaming the visitor for a server-side failure',
      'Error reference code gives users something concrete to report to support',
      'location.reload() wired as a sensible default for the retry action',
      'Full-viewport centered layout works identically at any screen size',
      'Easy to restyle the illustration\'s colors directly via SVG fill/stroke attributes',
      'No dependency on any specific backend framework — pure static markup',
      'Ready to drop into any custom error page route (Express, Next.js, Rails, etc.)',
      'No framework, no illustration library, no build step required',
    ],
    useCases: [
      { icon: 'ERROR', title: 'Custom 500 error pages', desc: 'Replace a bare server-generated error page with a branded, reassuring full-page state across any backend or hosting platform.' },
      { icon: 'LEARN', title: 'Learn to build inline SVG illustrations', desc: 'Study how a handful of basic SVG shapes combine into a recognizable "broken" icon without needing an external illustration asset.' },
      { icon: 'FLOW', title: 'Prototype a full error-handling flow', desc: 'Use this alongside a matching 404 page to prototype a consistent error-state design language across your entire product.' },
      { icon: 'DESIGN', title: 'Match your brand\'s error-state tone', desc: 'Adjust the copy, illustration colors, and button styles to fit how your product wants to communicate failure to users.' },
      { icon: 'ACCESS', title: 'Keep error pages navigable', desc: 'The explicit "Go home" link ensures users are never stranded on a dead-end page with no way back into the product.' },
      { icon: 'CODE', title: 'Wire retry to a real API call', desc: 'Replace the location.reload() call with logic that retries the specific request that failed, giving a smoother recovery than a full page reload.' },
      { icon: 'CODE', title: 'Related: Link in Bio Page', desc: 'See the [Link in Bio Page](/ui-snippets/link-in-bio/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What triggers a 500 Internal Server Error, and does this page fix it?', a: 'A 500 error means the server encountered an unexpected condition it could not handle — this page is only the user-facing display for that state; it does not fix the underlying server issue, which needs to be diagnosed from your server logs.' },
      { q: 'How do I make my server actually show this page on a 500 error?', a: 'This depends on your framework: Express apps typically use an error-handling middleware that renders a custom template on error; Next.js looks for a pages/500.js (or app/error.tsx) file; most static hosts and reverse proxies (Nginx, Apache) let you configure a custom error_page for 5xx responses.' },
      { q: 'Where does the error reference code come from?', a: 'In this snippet it is hardcoded as a placeholder. In production, generate it from your actual error-tracking tool (such as a Sentry event id) or your server\'s request-id middleware, so support staff can look up the exact failed request that produced the page.' },
      { q: 'What does the "Try again" button actually do?', a: 'By default it calls location.reload(), which re-requests the current page — a reasonable default recovery action for transient errors. For a single-page app, you may want to instead retry just the specific API call that failed rather than reloading the whole page.' },
      { q: 'Is the illustration an image file I need to host?', a: 'No. It is inline SVG markup directly in the HTML, so there is no image file to host, no extra network request, and it scales sharply at any size or screen density.' },
      { q: 'How is this different from a 404 Not Found page?', a: 'A 404 means the requested resource does not exist (a broken link, wrong URL), which is often something the user or a link author caused. A 500 means the server itself failed while trying to fulfill a valid request — the copy and framing here specifically make clear the fault is server-side, not the user\'s.' },
      { q: 'Can I customize the illustration colors to match my brand?', a: 'Yes. The SVG uses plain fill and stroke attributes on its shapes — edit those hex values directly in the HTML panel, or convert them to CSS custom properties if you want to theme the illustration from the stylesheet instead.' },
      { q: 'Should I show a stack trace or technical error details on this page?', a: 'Generally no for production/customer-facing environments — showing internal error details can leak sensitive information and is unhelpful to most users. Keep detailed technical information in your logging/monitoring system, and show only a safe, opaque reference code on the page itself.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to help you wire the page into your specific backend framework's error-handling flow — for example, generating the exact Express middleware, Next.js pages/500.js file, or Nginx error_page directive needed to serve this markup whenever a real 500 occurs, and how to safely pass through a real error reference id without leaking sensitive stack trace details to the end user. It's also worth asking the assistant to review the inline SVG and suggest how to convert its hardcoded fill/stroke colors into CSS custom properties so the illustration can be themed from the stylesheet instead of edited inline.`,
      prompt: `Build a full-page 500 Internal Server Error state in plain HTML, CSS, and JavaScript — no external image assets, no illustration library.

Requirements:
- A self-contained inline SVG illustration (not an <img> tag) built from basic SVG shapes that visually communicates "something is broken," such as a browser-window shape with an X or warning mark overlaid.
- A short, non-technical heading and a one-sentence explanation that clearly communicates the failure is on the server side, not something the visitor did wrong, and reassures them the team has been notified.
- Exactly two action buttons: a primary "Try again" button that reloads the current page (or, ideally, retries the specific failed request), and a secondary "Go home" link back to a safe page — do not present more than these two options.
- A small, visually de-emphasized error reference code near the bottom of the page (e.g. a monospace-styled string) that a user could quote to support, generated dynamically from a real error id in a production setting rather than hardcoded.
- The entire page must be centered vertically and horizontally in the viewport at any screen size, with no dependency on any specific backend framework in the markup itself.`,
    },
  },
};

export default error500Page;
