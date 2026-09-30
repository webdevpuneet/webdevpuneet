const statusBarFooter = {
  id: 'status-bar-footer',
  title: 'Status Bar Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<footer class="stf">
  <div class="stf-status">
    <div class="stf-status-inner">
      <span class="stf-dot" id="stfDot"></span>
      <span class="stf-status-text" id="stfText">All systems operational</span>
      <span class="stf-uptime">99.98% uptime — last 90 days</span>
      <a href="#" class="stf-status-link">Status page →</a>
    </div>
  </div>

  <div class="stf-inner">
    <div class="stf-col">
      <span class="stf-brand">◆ Fluxly</span>
      <p>Build, ship, and monitor without leaving one tab.</p>
    </div>
    <div class="stf-col">
      <h4>Platform</h4>
      <a href="#">API</a><a href="#">Uptime</a><a href="#">Changelog</a>
    </div>
    <div class="stf-col">
      <h4>Support</h4>
      <a href="#">Docs</a><a href="#">Contact</a><a href="#">Incident history</a>
    </div>
  </div>

  <div class="stf-bottom">
    <span>© 2026 Fluxly, Inc.</span>
    <button class="stf-sim" id="stfSim" type="button">Simulate incident</button>
  </div>
</footer>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f1e}

.stf{border-top:1px solid rgba(255,255,255,0.08)}

.stf-status{background:rgba(34,197,94,0.08);border-bottom:1px solid rgba(34,197,94,0.18);transition:background .3s,border-color .3s}
.stf-status.stf-down{background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.25)}
.stf-status-inner{max-width:900px;margin:0 auto;padding:11px 24px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13px}

.stf-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,0.25);animation:stfPulse 2s ease infinite;flex-shrink:0}
.stf-down .stf-dot{background:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,0.25)}
@keyframes stfPulse{0%,100%{opacity:1}50%{opacity:.45}}

.stf-status-text{color:#4ade80;font-weight:700}
.stf-down .stf-status-text{color:#f87171}
.stf-uptime{color:#64748b;margin-left:auto}
.stf-status-link{color:#94a3b8;text-decoration:none;font-weight:600;transition:color .15s}
.stf-status-link:hover{color:#f1f5f9}

.stf-inner{max-width:900px;margin:0 auto;padding:44px 24px 30px;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:32px}
.stf-col{display:flex;flex-direction:column;gap:9px}
.stf-brand{font-weight:800;color:#f1f5f9;font-size:15px}
.stf-col p{font-size:13px;color:#64748b;line-height:1.6;margin-top:2px}
.stf-col h4{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748b;margin-bottom:2px}
.stf-col a{font-size:13.5px;color:#94a3b8;text-decoration:none;transition:color .15s}
.stf-col a:hover{color:#f1f5f9}

.stf-bottom{max-width:900px;margin:0 auto;padding:18px 24px 28px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.06);gap:16px;flex-wrap:wrap}
.stf-bottom span{font-size:12px;color:#475569}
.stf-sim{background:none;border:1px solid rgba(255,255,255,0.12);color:#64748b;font-size:11.5px;padding:6px 12px;border-radius:7px;cursor:pointer;transition:border-color .15s,color .15s}
.stf-sim:hover{border-color:rgba(255,255,255,0.25);color:#94a3b8}

@media (max-width:640px){
  .stf-inner{grid-template-columns:1fr 1fr;gap:26px 16px}
  .stf-uptime{margin-left:0;order:3;width:100%}
}
@media (prefers-reduced-motion: reduce){
  .stf-dot{animation:none}
}`,
  js: `var statusBar = document.querySelector('.stf-status');
var dot  = document.getElementById('stfDot');
var text = document.getElementById('stfText');
var btn  = document.getElementById('stfSim');
var down = false;

btn.addEventListener('click', function () {
  down = !down;
  statusBar.classList.toggle('stf-down', down);
  text.textContent = down ? 'Investigating a partial outage' : 'All systems operational';
  btn.textContent = down ? 'Resolve incident' : 'Simulate incident';
});`,
  seo: {
    title: 'Status Bar Footer — Free HTML CSS JS SaaS Status Strip Footer',
    description: 'A footer topped with a live-looking pulsing status strip — "All systems operational," uptime, a status page link — the pattern every dev-tool site uses. Toggleable demo state included.',
    about: {
      title: 'Status Bar Footer — The Reassurance Strip Every Dev Tool Site Has',
      description: `Developer-tool and infrastructure products almost universally put a status indicator somewhere a prospective customer can see it before they sign up — because "is this thing actually up right now" is a real, reasonable question before trusting a service with production traffic. This snippet builds that status strip as the top band of the footer, with a working (if simulated) state toggle so you can see both the healthy and incident states without wiring up a real status API first.

**A pulsing dot is a claim, so it needs to look alive**

\`.stf-dot\` is a small filled circle with a \`box-shadow\` halo and a \`@keyframes stfPulse\` animation cycling its opacity between 1 and .45 every two seconds. A static green dot reads as decoration; a gently pulsing one reads as "this is a live signal, not a screenshot" — the same visual grammar as a recording indicator or an online-presence dot in a chat app. The colour and the pulse both flip to red together when the \`.stf-down\` class is present, so the whole strip communicates state through colour, motion, and text simultaneously rather than relying on any single cue.

**One class toggle drives three coordinated changes**

Clicking "Simulate incident" toggles a single \`.stf-down\` class on the status bar's container. CSS handles everything visual from there — the background tint, the border colour, the dot colour, and the status text colour all key off that one class via descendant selectors (\`.stf-down .stf-dot\`, \`.stf-down .stf-status-text\`) — while the JS only swaps the status text content and the button label. This is the same "one class, many coordinated CSS changes" pattern used throughout the snippet library: state lives in one boolean, not in five different style properties set by hand.

**Real footer content sits below, unaffected by the status state**

Below the status strip, a conventional footer — brand blurb, platform links, support links, copyright — continues regardless of the simulated incident, because in a real product the footer's navigational job doesn't change when something's down; if anything, the support and status-history links matter more in that moment; keeping them visually separate and stable is deliberate.

**Wiring this to a real status feed**

In production, replace the click-toggled demo state with a fetch to your actual status provider (Statuspage, Better Stack, Instatus, or a custom endpoint) on page load, and set the \`.stf-down\` class and text based on the real response — the CSS and markup here don't need to change at all, only the source of truth for the boolean.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A green, pulsing "All systems operational" strip renders above a standard footer.' },
        { title: 'Click "Simulate incident"', text: 'The strip flips to a red "Investigating a partial outage" state — colour, dot, and text all update together.' },
        { title: 'Click again to resolve', text: 'The strip returns to the healthy green state, demonstrating both directions of the toggle.' },
        { title: 'Connect to a real status source', text: 'Replace the click handler with a fetch to your actual uptime/status API on page load, and toggle the same .stf-down class based on the response.' },
        { title: 'Update the footer content', text: 'Replace the brand blurb, link columns, and copyright with your own.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'Pulsing status dot with a coordinated colour, background, and text state driven by one CSS class',
      'Built-in demo toggle to preview both the healthy and incident states without a real API',
      'Status strip sits visually separate from, and independent of, the standard footer content beneath it',
      'A direct link out to a full status/incident-history page',
      'Uptime percentage displayed inline for immediate reassurance',
      'prefers-reduced-motion aware — the dot stops pulsing but keeps its colour-coded state',
    ],
    useCases: [
      { icon: 'APP', title: 'Developer tools and infrastructure products', desc: 'Reassure a technical buyer that the service is monitored and currently healthy, right where they\'re already deciding whether to trust it with production traffic.' },
      { icon: 'CODE', title: 'API and platform provider sites', desc: 'A status strip is close to expected UI for any product selling uptime as part of its value proposition — its absence can itself read as a red flag to experienced buyers.' },
      { icon: 'FLOW', title: 'SaaS pricing and sign-up pages', desc: 'Placed near the bottom of a page a prospect is about to convert on, a visible "all systems operational" signal removes one small source of last-minute hesitation.' },
      { icon: 'DESIGN', title: 'Internal admin dashboards', desc: 'The same pulsing-dot pattern works for an internal tool\'s own footer, surfacing the health of a dependency or the current deployment status to a team.' },
      { icon: 'LEARN', title: 'Studying single-class state coordination', desc: 'A compact example of driving several coordinated visual changes — background, border, dot colour, text colour — from one toggled class rather than several independent style updates.' },
      { icon: 'GLOBAL', title: 'Multi-service status aggregation', desc: 'Extend the pattern to show several independent dots for different services (API, dashboard, webhooks) inside the same strip when a single overall status isn\'t granular enough.' },
      { icon: 'CODE', title: 'Related: Marquee Footer', desc: 'See the [Marquee Footer](/ui-snippets/marquee-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this connected to a real status API?', a: 'No — the "Simulate incident" button toggles a demo state purely in the browser so you can see both the healthy and incident visual states immediately. Wire the same .stf-down class toggle to a real status provider (Statuspage, Better Stack, Instatus, or your own API) on page load for production use.' },
      { q: 'How do I connect this to my actual uptime monitoring?', a: 'Fetch your status provider\'s API on page load, check whether the response indicates a full or partial outage, and call statusBar.classList.toggle(\'stf-down\', isDown) with the real boolean instead of the click handler\'s toggled state. Update the status text and uptime percentage from the same response.' },
      { q: 'Why does the dot pulse instead of staying static?', a: 'A static dot reads as decoration; a gently pulsing one signals that it represents a live, currently-checked value rather than a frozen screenshot — the same visual convention used by recording indicators and online-presence dots elsewhere on the web.' },
      { q: 'Does the pulsing animation respect reduced-motion preferences?', a: 'Yes — a prefers-reduced-motion: reduce media query removes the animation entirely, leaving the dot as a static, still colour-coded (green or red) indicator so the state remains fully readable without motion.' },
      { q: 'Can I show status for multiple services instead of one overall indicator?', a: 'Yes — duplicate the dot-and-label pattern for each service you want to report on individually, and drive each one\'s .stf-down-equivalent class from that service\'s own status rather than a single shared boolean.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Replace the click-toggled demo boolean with state fetched from your status API inside the component\'s data-fetching lifecycle (useEffect in React, onMounted in Vue), and drive the same conditional class from that fetched value.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to help you replace the simulated click-toggle with a real integration against whichever status provider you use — Statuspage, Better Stack, Instatus, or a custom internal endpoint — including how to poll it periodically so the footer reflects an incident within a reasonable delay of it actually starting. It's also a good candidate for a resilience discussion: ask what the status strip should show if the status-check request itself fails (a third "unknown" state is often the right answer, rather than silently defaulting to "operational"). For extending it, ask for a version that shows per-service status dots (API, dashboard, webhooks) instead of one aggregate indicator, or one that displays a small incident timeline/history list when the status page link is clicked, inline, without a full page navigation.`,
      prompt: `Build a website footer topped with a "status strip" in plain HTML, CSS, and vanilla JavaScript — no library, no real API integration (demo-only state toggle).

Requirements:
- A slim status strip above the main footer content: a small pulsing coloured dot, a status text label ("All systems operational"), an uptime percentage, and a link to a full status page — laid out in one row that wraps sensibly on narrow screens.
- The dot should have a soft box-shadow halo and a CSS keyframe animation gently pulsing its opacity, styled green by default.
- Add a single toggleable "down" state (e.g. a class on the strip's container) that, when active, switches the strip's background tint, border colour, dot colour, and status text colour all to a red/danger palette and changes the status text to something like "Investigating a partial outage" — driven by one class toggle in CSS via descendant selectors, not by setting each style individually in JavaScript.
- Include a demo button (e.g. "Simulate incident") that toggles this state on click, so both the healthy and incident visuals can be seen without a real backend, and updates its own label to reflect the current state ("Simulate incident" / "Resolve incident").
- Below the status strip, add a standard footer: a brand name with short description, two columns of links, and a bottom row with a copyright line — all visually distinct from and unaffected by the status strip's state.
- Add a prefers-reduced-motion media query that stops the dot's pulse animation while keeping its colour state intact.`,
    },
  },
};

export default statusBarFooter;
