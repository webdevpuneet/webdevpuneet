const activityFeed = {
  id: 'activity-feed',
  title: 'Activity Feed',
  category: 'dashboards',
  html: `<div class="wrap">
  <div class="feed-header">
    <h2 class="feed-title">Activity</h2>
    <div class="filter-tabs">
      <button class="ftab active" onclick="filterFeed(this,'all')">All</button>
      <button class="ftab" onclick="filterFeed(this,'comment')">Comments</button>
      <button class="ftab" onclick="filterFeed(this,'deploy')">Deploys</button>
      <button class="ftab" onclick="filterFeed(this,'alert')">Alerts</button>
    </div>
  </div>

  <div class="feed" id="feed">

    <div class="item" data-type="deploy">
      <div class="spine"></div>
      <div class="icon-wrap deploy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
      <div class="body">
        <div class="item-top"><div class="av" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">AJ</div><span class="name">Alex Johnson</span><span class="action">deployed</span><span class="target">main → production</span></div>
        <div class="item-meta"><span class="time">2 min ago</span><span class="tag green">Success</span></div>
      </div>
    </div>

    <div class="item" data-type="comment">
      <div class="spine"></div>
      <div class="icon-wrap comment"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
      <div class="body">
        <div class="item-top"><div class="av" style="background:linear-gradient(135deg,#ec4899,#f97316)">SM</div><span class="name">Sara Miller</span><span class="action">commented on</span><span class="target">Design review PR #142</span></div>
        <div class="comment-bubble">"Looks great, just one small nit on line 48 — the spacing feels off on mobile."</div>
        <div class="item-meta"><span class="time">18 min ago</span></div>
      </div>
    </div>

    <div class="item" data-type="alert">
      <div class="spine"></div>
      <div class="icon-wrap alert"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
      <div class="body">
        <div class="item-top"><div class="icon-av alert-av">⚠</div><span class="name">System</span><span class="action">triggered alert —</span><span class="target">API p95 latency &gt; 800ms</span></div>
        <div class="item-meta"><span class="time">34 min ago</span><span class="tag red">Critical</span></div>
      </div>
    </div>

    <div class="item" data-type="deploy">
      <div class="spine"></div>
      <div class="icon-wrap deploy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
      <div class="body">
        <div class="item-top"><div class="av" style="background:linear-gradient(135deg,#10b981,#0ea5e9)">RP</div><span class="name">Raj Patel</span><span class="action">deployed</span><span class="target">feature/auth-v2 → staging</span></div>
        <div class="item-meta"><span class="time">1 hr ago</span><span class="tag yellow">Preview</span></div>
      </div>
    </div>

    <div class="item" data-type="comment">
      <div class="spine"></div>
      <div class="icon-wrap comment"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
      <div class="body">
        <div class="item-top"><div class="av" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">MK</div><span class="name">Maya K.</span><span class="action">approved</span><span class="target">PR #139 — Refactor billing module</span></div>
        <div class="item-meta"><span class="time">2 hr ago</span><span class="tag green">Approved</span></div>
      </div>
    </div>

    <div class="item no-spine" data-type="alert">
      <div class="spine hidden"></div>
      <div class="icon-wrap alert"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
      <div class="body">
        <div class="item-top"><div class="icon-av alert-av">⚠</div><span class="name">System</span><span class="action">resolved —</span><span class="target">Disk usage back to normal</span></div>
        <div class="item-meta"><span class="time">3 hr ago</span><span class="tag blue">Resolved</span></div>
      </div>
    </div>

  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px 20px; }

.wrap { max-width: 560px; margin: 0 auto; }

.feed-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.feed-title { font-size: 18px; font-weight: 800; color: #0f172a; }

.filter-tabs { display: flex; gap: 4px; background: #f1f5f9; border-radius: 8px; padding: 3px; }
.ftab { background: transparent; border: none; font-size: 12px; font-weight: 600; color: #64748b; padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
.ftab.active { background: #fff; color: #0f172a; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

.feed { display: flex; flex-direction: column; }

/* Activity item */
.item { display: flex; gap: 0; position: relative; }
.item.hidden { display: none; }

/* Vertical spine connecting items */
.spine { width: 1px; background: #e2e8f0; margin: 0 20px; flex-shrink: 0; position: relative; }
.spine::before { content: ''; position: absolute; top: 4px; left: -3px; width: 7px; height: 7px; border-radius: 50%; background: #e2e8f0; }
.no-spine .spine { background: transparent; }
.hidden { visibility: hidden; }

/* Icon */
.icon-wrap { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 12px; }
.icon-wrap.deploy  { background: rgba(99,102,241,0.1);  color: #6366f1; }
.icon-wrap.comment { background: rgba(14,165,233,0.1);  color: #0ea5e9; }
.icon-wrap.alert   { background: rgba(239,68,68,0.1);   color: #ef4444; }

/* Content body */
.body { flex: 1; padding: 12px 0 20px 12px; border-bottom: 1px solid #f1f5f9; }
.no-spine .body { border-bottom: none; padding-bottom: 8px; }

.item-top { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.av { width: 22px; height: 22px; border-radius: 50%; font-size: 8px; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.icon-av { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; }
.alert-av { background: rgba(239,68,68,0.1); }
.name   { font-size: 13px; font-weight: 700; color: #0f172a; }
.action { font-size: 13px; color: #64748b; }
.target { font-size: 13px; font-weight: 600; color: #475569; }

.comment-bubble { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; margin-top: 8px; font-size: 12px; color: #475569; line-height: 1.6; font-style: italic; }

.item-meta { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.time { font-size: 11px; color: #94a3b8; }
.tag { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.tag.green  { background: rgba(34,197,94,0.1);  color: #16a34a; }
.tag.red    { background: rgba(239,68,68,0.1);  color: #dc2626; }
.tag.yellow { background: rgba(245,158,11,0.1); color: #b45309; }
.tag.blue   { background: rgba(14,165,233,0.1); color: #0369a1; }`,
  js: `function filterFeed(btn, type) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.item').forEach(item => {
    const match = type === 'all' || item.dataset.type === type;
    item.classList.toggle('hidden', !match);
  });
}`,
  seo: {
    title: 'Activity Feed — Free HTML CSS JS Timeline Snippet',
    description: 'Dashboard timeline with event icons, avatars, comment bubbles and filter tabs by event type. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Activity Feed — Vertical Timeline, Event Type Icons, Avatar Actions & Filter Tabs',
      description: `An activity feed is a chronological list of events that communicates what is happening in a system — who did what, when, and with what result. It is a standard component in admin dashboards, project management tools, CI/CD pipelines, team collaboration apps, and audit logs. This snippet provides a complete vertical timeline activity feed with three event types (deploy, comment, alert), a connecting spine with dot nodes, coloured event icons, avatar initials, action text, timestamps, status tags, comment bubbles, and filter tabs.\n\n**The vertical spine and dot nodes**\n\nThe connecting spine between items is a 1px wide div with background: #e2e8f0. A ::before pseudo-element on each spine adds a 7px circle at the top — the timeline dot node. The last item has .no-spine which makes the spine transparent (preserving the layout without the visual line) and hides the dot. This creates the appearance of a timeline that ends cleanly at the last item.\n\n**Three event type icons**\n\nThree event types use coloured icon backgrounds: deploy (indigo, code brackets SVG), comment (cyan, speech bubble SVG), alert (red, warning triangle SVG). Each uses an rgba() tinted background matching the icon colour. All SVG icons are inline — no icon library required. The colour coding lets users scan event types without reading the action text.\n\n**The comment bubble**\n\nComment events include a .comment-bubble div — a quoted text block with a light background, border, and italic style. This is a standard UI pattern for showing preview text without full content expansion, used in GitHub activity feeds and Slack notification previews.\n\n**Filter tabs**\n\nFour filter tabs (All, Comments, Deploys, Alerts) use the same pill tab switcher pattern as the [leaderboard](/ui-snippets/leaderboard-table/). filterFeed() toggles the .hidden class on items whose data-type attribute does not match the selected filter. The filter is client-side — no re-fetch needed for static feeds. For live feeds, trigger an API fetch with the filter parameter on tab click.\n\n**Relative timestamps**\n\nTimestamps use relative format ("2 min ago", "1 hr ago") — the standard for activity feeds. In production, calculate these from ISO timestamps: use the timeAgo() helper or a library like date-fns formatDistanceToNow(). Update timestamps every 60 seconds via setInterval for a live feel.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the filter tabs to filter by event type', text: 'Click Comments, Deploys, or Alerts to filter the feed to that event type. Click All to show everything. The filter toggles the .hidden class on each item matching or not matching the data-type attribute.' },
      { title: 'Add a new event item', text: 'Duplicate one of the .item divs in the HTML. Set data-type to "deploy", "comment", or "alert". Update the avatar initials and gradient, name, action text, target text, timestamp, and tag class and label.' },
      { title: 'Add a new event type', text: 'Add a new .icon-wrap class (e.g., .icon-wrap.merge) with a background and colour. Add a matching filter tab button with onclick="filterFeed(this,\'merge\')". Set data-type="merge" on the relevant items.' },
      { title: 'Update avatar and action content', text: 'Edit each .item-top: change the .av gradient and initials, .name text, .action text (deployed/commented/approved), and .target text. For system events (no user), use .icon-av with a symbol instead of .av.' },
      { title: 'Convert timestamps to relative format', text: 'Replace the hardcoded "2 min ago" strings with a timeAgo() function that computes relative time from an ISO timestamp. Call timeAgo(item.timestamp) and update all .time elements every 60 seconds via setInterval.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component mapping an events array to activity items, or "Tailwind" for a React + Tailwind version.' },
    ]},
    features: ['Vertical spine: 1px div with ::before dot node connecting sequential events','Last item .no-spine: transparent spine + hidden dot for clean list end','3 event type icons: deploy (indigo), comment (cyan), alert (red) inline SVGs','Comment bubble: italic quoted text in bordered rounded box for content preview','Filter tabs: data-type attribute filtering via .hidden class toggle','Status tags: success/critical/preview/approved/resolved with rgba tinted backgrounds','Relative timestamps: "2 min ago", "1 hr ago" format for live feel','Avatar gradient initials for user events, icon-av for system events'],
    useCases: [
      { icon: 'APP', title: 'CI/CD pipeline and deployment activity feeds', desc: 'Deploy events with success/preview/failed tags are the primary use case. Wire to webhook events from GitHub Actions, Vercel, or your CI system. Show branch name, deployer, environment, and result status in each deploy event item.' },
      { icon: 'FLOW', title: 'Project management and code review activity streams', desc: 'Comment events show PR reviews, code comments, and approval actions. The comment bubble displays the first line of the review text. Wire to GitHub webhook events (pull_request_review, issue_comment) for real-time activity from your repositories.' },
      { icon: 'CHART', title: 'System monitoring and alert history dashboards', desc: 'Alert events show infrastructure alerts with critical/warning/resolved tags. The red icon and tag immediately signal urgency. Link each alert item to the full alert detail page or monitoring dashboard. Show resolution time between the alert and resolved events.' },
      { icon: 'DESIGN', title: 'Team collaboration and workspace activity panels', desc: 'Show a team-wide activity feed in a sidebar panel — who is working on what, who left comments, who deployed. The feed provides ambient awareness of team activity without requiring active checking of multiple tools.' },
      { icon: 'LEARN', title: 'Study the CSS timeline spine and dot node pattern', desc: 'The connecting spine between timeline items uses a 1px div and a ::before pseudo-element circle. This pure CSS technique works for any [vertical timeline](/ui-snippets/vertical-timeline/) — project history, [changelog](/ui-snippets/changelog-feed/), onboarding steps, or activity feed. No absolute positioning required.' },
      { icon: 'CODE', title: 'Audit log and compliance event history displays', desc: 'Security events (login, permission change, data export), admin actions (user created, plan changed, billing updated), and compliance events all map to the activity feed pattern. The filter tabs separate event categories for audit review workflows.' },
      { icon: 'CODE', title: 'Related: Live Ops Alert Feed Panel', desc: 'See the [Live Ops Alert Feed Panel](/ui-snippets/alert-feed-panel/) for a related dashboards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Canary Rollout Progress Tile', desc: 'See the [Canary Rollout Progress Tile](/ui-snippets/canary-rollout-progress-tile/) for a related dashboards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: CDN Cache Hit Ratio Widget', desc: 'See the [CDN Cache Hit Ratio Widget](/ui-snippets/cdn-cache-hit-ratio-widget/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the vertical connecting spine and dot node work?', a: 'Each .item has a .spine div that is 1px wide with a grey background colour — this is the vertical line between events. The ::before pseudo-element on .spine adds a 7px circle positioned at the top of the line: position: absolute; top: 4px; left: -3px (half of 7px to centre it on the 1px line); width/height: 7px; border-radius: 50%. The last item has .no-spine which sets the spine background to transparent and hides the dot, stopping the line at the last event.' },
      { q: 'How do I add real-time updates to the activity feed?', a: 'Use Server-Sent Events or WebSocket to push new activity from your server. For SSE: const es = new EventSource("/api/activity-stream"); es.onmessage = e => { const item = JSON.parse(e.data); prependItem(item); }. In prependItem(), create a new .item element from a template string, insert it at the top of .feed with feed.insertBefore(newItem, feed.firstChild), and optionally animate in with a CSS keyframe from opacity: 0 and translateY(-8px).' },
      { q: 'How do I calculate relative timestamps ("2 min ago") from ISO dates?', a: 'function timeAgo(iso) { const s = Math.floor((Date.now() - new Date(iso)) / 1000); if (s < 60) return s + "s ago"; if (s < 3600) return Math.floor(s/60) + " min ago"; if (s < 86400) return Math.floor(s/3600) + " hr ago"; return Math.floor(s/86400) + "d ago"; } Call timeAgo on the timestamp string for each item. To keep timestamps current, call updateTimestamps() every 60 seconds via setInterval — re-compute all .time elements from their stored ISO data attribute.' },
      { q: 'How do I use the activity feed in React?', a: 'Click "JSX" to download. Accept an events prop: an array of {id, type, user, action, target, time, tag, comment} objects. Map events to ActivityItem components. Manage activeFilter in useState. Filter the array with events.filter(e => activeFilter === "all" || e.type === activeFilter). For real-time updates, add new events to the array in a WebSocket onmessage handler and use state update: setEvents(prev => [newEvent, ...prev]).' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the timeline geometry by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the spine's ::before pseudo-element gets centered as a dot node on the 1px line, and why the last item needs a separate no-spine class rather than just deleting its spine div. The same assistant is useful for optimizing it — asking whether filterFeed's approach of toggling a hidden class on every item scales well if the feed grows to hundreds of entries, or whether it should switch to only rendering matching items. It's just as good for extending the feed: ask it to add real-time updates over a WebSocket that prepend new items with an entrance animation, replace the hardcoded "2 min ago" strings with a live-updating timeAgo function, or add a fifth event type with its own icon and filter tab. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a vertical "activity feed" timeline in plain HTML, CSS, and JavaScript — no libraries, filterable by event type via data attributes.

Requirements:
- A list of activity items, each with: a thin vertical "spine" line element connecting it to the next item (with a small circular dot node positioned at its top via a pseudo-element), a colored icon box whose background and icon differ per event type (e.g. deploy, comment, alert), an avatar or system icon, a name, action text, and a target description, a relative timestamp, and an optional colored status tag.
- Comment-type items must additionally render a quoted preview bubble with distinct background and border styling.
- The last item in the list must not show a connecting spine below it (make it transparent or remove it) so the timeline visually terminates cleanly instead of dangling into empty space.
- Each item carries a data-type attribute (e.g. "deploy", "comment", "alert"). A row of filter tab buttons above the feed must, on click, mark itself active and toggle a "hidden" class (display: none) on every feed item whose data-type does not match the selected filter, or show all items when "All" is selected.
- Do not use any charting or animation library — the filtering must work by direct classList manipulation in a single function shared by all tab buttons.
- Style status tags with distinct colors per meaning (e.g. green for success, red for critical, yellow for preview, blue for resolved) using tinted translucent backgrounds.`,
    },
  },
};

export default activityFeed;
