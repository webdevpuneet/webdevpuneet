const statusDashboard = {
  id: 'status-dashboard',
  title: 'System Status Dashboard Widget',
  lastmod: '2026-06-13',
  category: 'dashboards',
  html: `<div class="page">
  <div class="status-header">
    <div class="header-top">
      <div class="overall-dot operational"></div>
      <div>
        <h2 class="overall-title">All Systems Operational</h2>
        <p class="overall-sub">Last checked: just now &nbsp;·&nbsp; <span class="uptime-global">99.97% uptime</span></p>
      </div>
    </div>
  </div>

  <div class="services-list">
    <div class="service-row">
      <div class="svc-left">
        <span class="svc-dot op"></span>
        <div>
          <div class="svc-name">API Gateway</div>
          <div class="svc-latency">42ms avg</div>
        </div>
      </div>
      <div class="uptime-bars" id="bars-api"></div>
      <div class="svc-right"><span class="svc-badge op-badge">Operational</span><span class="svc-pct">99.98%</span></div>
    </div>

    <div class="service-row">
      <div class="svc-left">
        <span class="svc-dot op"></span>
        <div>
          <div class="svc-name">Web Dashboard</div>
          <div class="svc-latency">88ms avg</div>
        </div>
      </div>
      <div class="uptime-bars" id="bars-web"></div>
      <div class="svc-right"><span class="svc-badge op-badge">Operational</span><span class="svc-pct">99.95%</span></div>
    </div>

    <div class="service-row">
      <div class="svc-left">
        <span class="svc-dot deg"></span>
        <div>
          <div class="svc-name">CDN / Edge Network</div>
          <div class="svc-latency">210ms avg</div>
        </div>
      </div>
      <div class="uptime-bars" id="bars-cdn"></div>
      <div class="svc-right"><span class="svc-badge deg-badge">Degraded</span><span class="svc-pct">98.40%</span></div>
    </div>

    <div class="service-row">
      <div class="svc-left">
        <span class="svc-dot op"></span>
        <div>
          <div class="svc-name">Database Cluster</div>
          <div class="svc-latency">12ms avg</div>
        </div>
      </div>
      <div class="uptime-bars" id="bars-db"></div>
      <div class="svc-right"><span class="svc-badge op-badge">Operational</span><span class="svc-pct">100%</span></div>
    </div>

    <div class="service-row">
      <div class="svc-left">
        <span class="svc-dot op"></span>
        <div>
          <div class="svc-name">Auth Service</div>
          <div class="svc-latency">31ms avg</div>
        </div>
      </div>
      <div class="uptime-bars" id="bars-auth"></div>
      <div class="svc-right"><span class="svc-badge op-badge">Operational</span><span class="svc-pct">99.99%</span></div>
    </div>

    <div class="service-row">
      <div class="svc-left">
        <span class="svc-dot out"></span>
        <div>
          <div class="svc-name">Webhooks</div>
          <div class="svc-latency">— </div>
        </div>
      </div>
      <div class="uptime-bars" id="bars-wh"></div>
      <div class="svc-right"><span class="svc-badge out-badge">Outage</span><span class="svc-pct">95.10%</span></div>
    </div>
  </div>

  <div class="incident-box">
    <div class="inc-title">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      Active Incident
    </div>
    <p class="inc-body">Webhooks experiencing elevated failure rates. Engineering team investigating. CDN latency elevated in EU-West region.</p>
    <div class="inc-meta">Started 14 min ago &nbsp;·&nbsp; Monitoring</div>
  </div>

  <div class="status-footer">
    <span class="legend-item"><span class="leg-dot op"></span>Operational</span>
    <span class="legend-item"><span class="leg-dot deg"></span>Degraded</span>
    <span class="legend-item"><span class="leg-dot out"></span>Outage</span>
    <span class="legend-item legend-right">90-day uptime</span>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 24px 16px; }
.page { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

.status-header { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; }
.header-top { display: flex; align-items: center; gap: 14px; }
.overall-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
.overall-dot.operational { background: #22c55e; box-shadow: 0 0 0 4px #dcfce7; }
.overall-dot.degraded { background: #f59e0b; box-shadow: 0 0 0 4px #fef9c3; }
.overall-dot.outage { background: #ef4444; box-shadow: 0 0 0 4px #fee2e2; }
.overall-title { font-size: 16px; font-weight: 800; color: #111827; margin-bottom: 2px; }
.overall-sub { font-size: 12px; color: #6b7280; }
.uptime-global { color: #16a34a; font-weight: 600; }

.services-list { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; }
.service-row { display: flex; align-items: center; gap: 12px; padding: 13px 18px; border-bottom: 1px solid #f3f4f6; }
.service-row:last-child { border-bottom: none; }
.svc-left { display: flex; align-items: center; gap: 10px; min-width: 150px; }
.svc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.svc-dot.op { background: #22c55e; }
.svc-dot.deg { background: #f59e0b; }
.svc-dot.out { background: #ef4444; animation: pulse 1.2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.svc-name { font-size: 13px; font-weight: 600; color: #111827; }
.svc-latency { font-size: 10px; color: #9ca3af; }
.uptime-bars { flex: 1; display: flex; gap: 2px; align-items: flex-end; height: 24px; }
.uptime-bars .bar { flex: 1; border-radius: 2px; background: #22c55e; max-height: 24px; min-height: 8px; }
.uptime-bars .bar.out { background: #ef4444; }
.uptime-bars .bar.deg { background: #f59e0b; }
.svc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; min-width: 88px; }
.svc-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.op-badge { background: #dcfce7; color: #15803d; }
.deg-badge { background: #fef9c3; color: #a16207; }
.out-badge { background: #fee2e2; color: #dc2626; }
.svc-pct { font-size: 11px; font-weight: 600; color: #374151; }

.incident-box { background: #fff7ed; border: 1.5px solid #fed7aa; border-radius: 14px; padding: 14px 18px; }
.inc-title { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; color: #c2410c; margin-bottom: 7px; }
.inc-body { font-size: 12px; color: #7c2d12; line-height: 1.6; margin-bottom: 6px; }
.inc-meta { font-size: 11px; color: #9a3412; }

.status-footer { display: flex; align-items: center; gap: 16px; padding: 4px 0; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #6b7280; }
.leg-dot { width: 7px; height: 7px; border-radius: 50%; }
.leg-dot.op { background: #22c55e; }
.leg-dot.deg { background: #f59e0b; }
.leg-dot.out { background: #ef4444; }
.legend-right { margin-left: auto; }`,

  js: `const DATA = {
  'bars-api': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.6,1],
  'bars-web': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.7,1,1,1,1,1],
  'bars-cdn': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,0.4,0.3,0.3,0.3],
  'bars-db': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  'bars-auth':[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  'bars-wh':  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.8,1,1,1,0.6,1,1,1,1,0.2,0.1,0,0,0,0]
};
Object.entries(DATA).forEach(([id, vals]) => {
  const el = document.getElementById(id);
  if (!el) return;
  vals.forEach(v => {
    const b = document.createElement('div');
    b.className = 'bar' + (v === 0 ? ' out' : v < 0.5 ? ' deg' : '');
    b.style.height = Math.max(8, Math.round(v * 24)) + 'px';
    b.title = v === 1 ? 'Operational' : v === 0 ? 'Outage' : 'Degraded';
    el.appendChild(b);
  });
});`,

  seo: {
    title: 'System Status Dashboard — Uptime Widget HTML CSS JS',
    description: 'Service status dashboard with 90-day uptime bars, operational/degraded/outage badges, and an incident box. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `System Status Dashboard — 90-Day Uptime Bars, Status Badges & Incident Callout`,
      description: `A system status dashboard communicates service health to end users, support teams, and stakeholders. It answers three questions instantly: is everything working right now, which services have had issues recently, and is there an active incident being worked on? This snippet implements a complete status page widget with six service rows, 30-bar uptime histograms, colour-coded status badges, an active incident callout box, and an animated pulsing dot for live outages.\n\n**Uptime bar chart generation**\n\nThe 30 uptime bars are generated programmatically from a DATA object mapping service IDs to arrays of 30 values (0–1). A value of 1 means fully operational, 0 means outage, and intermediate values represent degraded performance. JavaScript creates one \`<div class="bar">\` per value, sets its height proportionally (\`Math.max(8, Math.round(v * 24))\`px), and adds class \`out\` or \`deg\` for colouring. The minimum height of 8px ensures that even zero-uptime days are visible as a thin red bar rather than disappearing entirely.\n\n**Status colour system**\n\nThree states use a consistent colour system across the entire component: green (\`#22c55e\`) for operational, amber (\`#f59e0b\`) for degraded, red (\`#ef4444\`) for outage. Each state has a badge variant (light background tint + dark text), a dot variant (solid circle), and a bar variant (coloured fill). By using the same three colours throughout, users can instantly scan the entire page and understand the pattern without reading every label.\n\n**Animated outage pulse**\n\nThe outage dot uses a CSS \`@keyframes pulse\` animation that cycles opacity between 1 and 0.4 every 1.2 seconds. This mimics the "live" indicator pattern used in broadcast media and emergency dashboards — the motion attracts attention to the one service that needs immediate focus. Only the outage dot pulses; operational and degraded dots are static, so the animation carries signal rather than noise.\n\n**Incident callout box**\n\nWhen an incident is active, an amber callout box below the service list provides human-readable context: what is affected, the current status (investigating/monitoring/resolved), and time since the incident started. The warm orange palette (\`#fff7ed\` background, \`#fed7aa\` border) visually connects to the amber degraded state but is distinct from the red outage badges — it signals "something is being worked on" rather than "everything is broken".\n\n**Service row layout**\n\nEach service row is a flex container with three zones: left (dot + service name + latency), center (uptime bar chart), right (badge + percentage). The center zone has \`flex: 1\` so it expands to fill available space. The right zone has \`min-width: 88px\` and \`text-align: right\` to keep badges and percentages aligned across rows. The left zone has \`min-width: 150px\` to prevent service names from wrapping.\n\n**React integration**\n\nDefine a \`SERVICES\` array where each entry has \`id\`, \`name\`, \`latency\`, \`status\`, \`uptime\` (percentage string), and \`bars\` (30-element array). Map over it to render \`<ServiceRow />\` components. The uptime bars render inside a \`useEffect\` or directly as JSX with \`.map()\` — prefer JSX mapping over imperative DOM manipulation in React. The active incident can be a separate \`incident\` prop on the parent \`StatusDashboard\` component.\n\n**Real-world integration**\n\nIn production, replace the hardcoded DATA object with API responses from a status monitoring service (Betterstack, PagerDuty, or your own health-check endpoints). Poll every 30 seconds with \`setInterval\` and update the bars array. Store historical uptime in a time-series database and query the last 90 days on page load. The visual component stays identical — only the data source changes.\n\nSee also the [metric card grid snippet](/ui-snippets/metric-card-grid/) for KPI dashboards, the [line chart widget snippet](/ui-snippets/line-chart-widget/) for time-series data visualization, and the [activity heatmap snippet](/ui-snippets/activity-heatmap/) for calendar-based uptime visualization.`
    },
    howToUse: [
      { title: 'Copy the full HTML structure', text: 'The status page needs all sections: .status-header, .services-list, .incident-box, and .status-footer. The JS targets elements by ID so keep all IDs intact.' },
      { title: 'Update service names and data', text: 'Edit the service names in .svc-name spans and update the DATA object in JS. Each entry maps a bars-{id} element ID to a 30-element array of 0–1 values.' },
      { title: 'Set the overall status', text: 'Change .overall-dot class between operational, degraded, and outage. Update the .overall-title text and .uptime-global percentage to match current reality.' },
      { title: 'Manage the incident box', text: 'Show or hide .incident-box based on whether an active incident exists. Update the .inc-body text and .inc-meta timestamp when incidents occur.' },
      { title: 'Connect to a real monitoring API', text: 'Replace the hardcoded DATA with a fetch to your health-check API. Poll every 30 seconds with setInterval and re-render bars to reflect live uptime data.' }
    ],
    features: [
      '30-bar 90-day uptime histogram generated from data array',
      'Three-state colour system: green/amber/red across all elements',
      'Animated pulsing dot on active outage services',
      'Status badges with tinted backgrounds per state',
      'Active incident callout box with amber warning palette',
      'Latency display per service row',
      'Legend and global uptime percentage in footer',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: '📊', title: 'Public SaaS status pages', desc: 'Publish API, web app and database health to customers, with operational, degraded and outage badges and a 90-day uptime histogram that builds trust through transparency.' },
      { icon: '🛠️', title: 'Internal engineering dashboards', desc: 'Give DevOps teams a single glanceable panel of service health, where the pulsing dot on an outage row draws the eye before anyone reads a label.' },
      { icon: '🎧', title: 'Support team sidebar widget', desc: 'Let support agents see current incidents while answering tickets, so they can tell customers about a known outage instead of debugging a problem that is not theirs.' },
      { icon: '🧭', title: 'Admin panel health overview', desc: 'Show platform administrators the state of every connected service in one list, with each uptime bar generated from a plain data array you can swap for real figures.' },
    ],
    faqs: [
      { q: 'How do I use this status dashboard in React?', a: 'Define a SERVICES array with name, status, latency, uptime, and bars props. Map over it to render ServiceRow components. Render bars as JSX map instead of imperative DOM creation.' },
      { q: 'How do I connect this to a real monitoring API?', a: 'Replace the DATA object with a fetch call to your health-check endpoint. Use setInterval to poll every 30 seconds and update the bars array and status badges dynamically.' },
      { q: 'How do I show resolved incidents differently from active ones?', a: 'Add a status field to the incident data (active/monitoring/resolved). Use conditional CSS classes: green border for resolved, amber for monitoring, red for active.' },
      { q: 'Can I make the bars represent hours instead of days?', a: 'Yes — just change the data granularity. Use 24 values for 24-hour view or 168 for 7-day hourly. Adjust the bar width by changing the gap and removing flex:1 for fixed pixel widths.' },
      { q: 'How do I export this status dashboard to Vue, Angular, or Tailwind?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the row, badge, and bar styles become utility classes, a Vue 3 single-file component, and an Angular standalone component. Each converter preserves the markup, the uptime-bar layout, and the outage-pulse animation, so the dashboard renders identically across React, Vue, and Angular. For production, drive the SERVICES array from your health-check API and poll it inside the framework lifecycle (useEffect, onMounted, or ngOnInit) instead of the hardcoded DATA object.' },
      { q: 'How do I compute the overall uptime percentage in the footer?', a: 'Average each service uptime, or weight by request volume if you have it, then format to two decimals such as 99.97%. For the 90-day bars, derive the figure from the count of operational versus degraded or outage segments so the headline number always matches the visual history users can see in the chart.' }
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the bar-generation and color-mapping logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the DATA object's 0 to 1 values get converted into bar heights and out or deg classes in that Object.entries loop, or why every zero-uptime bar still gets a minimum 8px height instead of collapsing to nothing. The same assistant can help optimize it, for example checking whether rebuilding every service's 30 bars from scratch on each poll (rather than diffing and updating only changed days) matters once this is wired to a live health-check API on a 30-second interval. It's also useful for extending the feature: ask it to add a per-bar hover tooltip showing the actual date and incident detail instead of just the status word, add a toggle between 30-day and 90-day views, or wire the overall status dot and incident box to update automatically whenever any individual service degrades. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a system status dashboard with uptime history bars in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- An overall status header showing one large status dot (colored by an operational, degraded, or outage class) next to a headline and a global uptime percentage.
- A list of individual service rows, each showing a small status dot, the service name, its average latency, an uptime bar-history chart, a colored status badge, and an individual uptime percentage — laid out so the left label section, the center bar chart, and the right badge section stay column-aligned across every row regardless of content length.
- Generate each service's uptime bar history entirely from a data object mapping each service's element id to an array of numeric values between 0 and 1 (1 meaning fully operational, 0 meaning full outage, values in between meaning degraded), looping through that data to create one bar element per value.
- Each generated bar's height must scale proportionally to its value within a fixed maximum pixel height, but must never shrink below a small minimum height (so a full outage day is still visible as a thin bar, not invisible), and its color/class must be assigned based on threshold ranges of that same value (full color for 1, a degraded color for a mid-range, an outage color for 0).
- Reuse exactly the same three-color system (green, amber, red) consistently across the overall status dot, every per-service dot, every bar, and every badge, so a user can scan the whole page by color alone without reading labels.
- Add a pulsing opacity animation to the status dot only for services currently in an outage state, leaving operational and degraded dots static so the animation signals urgency rather than being decorative noise.
- Include a conditionally-shown incident callout box with a distinct warm warning color palette (different from the outage red) containing a description of the affected services, current investigation status, and how long ago the incident started.`,
    },
  }
};

export default statusDashboard;
