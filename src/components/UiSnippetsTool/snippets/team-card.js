const teamCard = {
  id: 'team-card',
  title: 'Team Member Cards',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="page">
  <div class="section-header">
    <h2 class="section-title">Meet the Team</h2>
    <p class="section-sub">The people behind webdevpuneet.com</p>
  </div>
  <div class="grid">
    <article class="card">
      <div class="card-top">
        <div class="avatar-wrap">
          <img src="https://picsum.photos/seed/person1/120/120" alt="Sarah Chen" class="avatar" loading="lazy" />
          <span class="status-dot online" aria-label="Online"></span>
        </div>
        <div class="role-badge">Founder</div>
      </div>
      <div class="card-body">
        <h3 class="name">Sarah Chen</h3>
        <p class="role">CEO &amp; Product Lead</p>
        <p class="bio">Building the future of developer tooling. Previously at Stripe and Figma. Obsessed with DX.</p>
        <div class="stats-row">
          <div class="stat"><span class="stat-num">48</span><span class="stat-lbl">Projects</span></div>
          <div class="stat"><span class="stat-num">12k</span><span class="stat-lbl">Followers</span></div>
          <div class="stat"><span class="stat-num">99%</span><span class="stat-lbl">Rating</span></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="socials">
          <a href="#" class="soc" aria-label="X (Twitter)"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" class="soc" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="#" class="soc" aria-label="GitHub"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
        </div>
        <a href="#" class="view-btn">View Profile</a>
      </div>
    </article>

    <article class="card">
      <div class="card-top">
        <div class="avatar-wrap">
          <img src="https://picsum.photos/seed/person2/120/120" alt="Marcus Webb" class="avatar" loading="lazy" />
          <span class="status-dot away" aria-label="Away"></span>
        </div>
        <div class="role-badge design">Design</div>
      </div>
      <div class="card-body">
        <h3 class="name">Marcus Webb</h3>
        <p class="role">Head of Design</p>
        <p class="bio">Pixel-perfect interfaces and design systems. Previously led design at Linear and Vercel.</p>
        <div class="stats-row">
          <div class="stat"><span class="stat-num">62</span><span class="stat-lbl">Designs</span></div>
          <div class="stat"><span class="stat-num">8.4k</span><span class="stat-lbl">Followers</span></div>
          <div class="stat"><span class="stat-num">97%</span><span class="stat-lbl">Rating</span></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="socials">
          <a href="#" class="soc" aria-label="X (Twitter)"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" class="soc" aria-label="Dribbble"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg></a>
          <a href="#" class="soc" aria-label="GitHub"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
        </div>
        <a href="#" class="view-btn">View Profile</a>
      </div>
    </article>

    <article class="card">
      <div class="card-top">
        <div class="avatar-wrap">
          <img src="https://picsum.photos/seed/person3/120/120" alt="Priya Nair" class="avatar" loading="lazy" />
          <span class="status-dot online" aria-label="Online"></span>
        </div>
        <div class="role-badge eng">Engineering</div>
      </div>
      <div class="card-body">
        <h3 class="name">Priya Nair</h3>
        <p class="role">Senior Engineer</p>
        <p class="bio">Full-stack engineer with a focus on performance and accessibility. Open source contributor.</p>
        <div class="stats-row">
          <div class="stat"><span class="stat-num">134</span><span class="stat-lbl">Commits</span></div>
          <div class="stat"><span class="stat-num">5.2k</span><span class="stat-lbl">Stars</span></div>
          <div class="stat"><span class="stat-num">98%</span><span class="stat-lbl">Rating</span></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="socials">
          <a href="#" class="soc" aria-label="X (Twitter)"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" class="soc" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="#" class="soc" aria-label="GitHub"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
        </div>
        <a href="#" class="view-btn">View Profile</a>
      </div>
    </article>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc;min-height:100vh;padding:32px 20px}
.section-header{text-align:center;margin-bottom:28px}
.section-title{font-size:26px;font-weight:800;color:#1e293b;margin-bottom:6px}
.section-sub{font-size:14px;color:#64748b}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:820px;margin:0 auto}

.card{background:#fff;border-radius:20px;border:1px solid #e2e8f0;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s;overflow:hidden}
.card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.08)}

.card-top{position:relative;padding:24px 20px 0;display:flex;align-items:flex-start;justify-content:space-between}
.avatar-wrap{position:relative;display:inline-block}
.avatar{width:64px;height:64px;border-radius:16px;object-fit:cover;border:3px solid #f1f5f9;display:block}
.status-dot{position:absolute;bottom:-2px;right:-2px;width:13px;height:13px;border-radius:50%;border:2.5px solid #fff}
.status-dot.online{background:#10b981}
.status-dot.away{background:#f59e0b}
.status-dot.offline{background:#94a3b8}
.role-badge{font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#ede9fe;color:#7c3aed;border-radius:20px;padding:3px 10px;margin-top:4px}
.role-badge.design{background:#fce7f3;color:#be185d}
.role-badge.eng{background:#dbeafe;color:#1d4ed8}

.card-body{padding:14px 20px 16px;flex:1}
.name{font-size:16px;font-weight:800;color:#1e293b;margin-bottom:2px}
.role{font-size:12px;font-weight:600;color:#6366f1;margin-bottom:10px}
.bio{font-size:12px;color:#64748b;line-height:1.65;margin-bottom:16px}
.stats-row{display:flex;gap:0;border:1px solid #f1f5f9;border-radius:10px;overflow:hidden}
.stat{flex:1;text-align:center;padding:8px 4px;border-right:1px solid #f1f5f9}
.stat:last-child{border-right:none}
.stat-num{display:block;font-size:14px;font-weight:800;color:#1e293b}
.stat-lbl{display:block;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8}

.card-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-top:1px solid #f1f5f9}
.socials{display:flex;gap:6px}
.soc{width:28px;height:28px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#64748b;text-decoration:none;transition:background .15s,color .15s}
.soc:hover{background:#6366f1;color:#fff;border-color:#6366f1}
.view-btn{font-size:11px;font-weight:700;color:#6366f1;text-decoration:none;padding:5px 12px;border:1.5px solid #c7d2fe;border-radius:8px;transition:background .15s,color .15s}
.view-btn:hover{background:#6366f1;color:#fff;border-color:#6366f1}`,

  js: `// Cards animate in on load
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity .4s ease, transform .4s ease';
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  }, 100 + i * 120);
});`,

  seo: {
    title: 'Team Member Cards — Profile Grid with Social Links HTML CSS',
    description: `Team member cards with avatar, status dot, role badge, stats row, and social links. Staggered load animation. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Team Member Cards — Status Indicator, Stats Row Design & Staggered Load Animation`,
      description: `A team section is a trust signal on any company, agency, or product website — it humanises the brand by putting faces and names to the people behind it. This snippet builds a polished three-card team grid: circular-cornered avatar photos with online/away status dots, role badge pills, bio text, a mini statistics row (projects, followers, rating), social link icon buttons, and a "View Profile" CTA — with a staggered fade-in animation on page load.

The design system for team cards involves several decisions that affect perceived quality: how to show presence status, how to communicate role without overwhelming the layout, whether to show metrics, and how to handle social links without cluttering the card.

**Status dot positioning**

The online/away/offline status dot is positioned \`absolute\` at the bottom-right corner of the avatar using \`bottom: -2px; right: -2px\`. A \`border: 2.5px solid #fff\` creates a white gap ring between the dot and the avatar image — the standard visual trick used by LinkedIn, Slack, and Discord to make the status dot visible against any avatar colour. Three status colours are defined: \`#10b981\` (green for online), \`#f59e0b\` (amber for away), \`#94a3b8\` (grey for offline).

**Role badge colour coding**

Each role badge has a distinct colour variant: indigo for Founder/default, pink for Design, blue for Engineering. This colour coding creates a quick visual taxonomy when multiple cards are shown side by side — a design system pattern used in team directories, project management tools, and HR platforms. The badge font is uppercase with letter-spacing to read like a label chip.

**Stats row with divider borders**

The three stats (projects, followers, rating) share a single \`border: 1px solid #f1f5f9\` container. Each stat cell has a right border except the last — creating a natural column separator without explicit divider elements. This "shared border" trick is common in analytics cards and pricing tables.

**Staggered fade-in animation**

On load, JavaScript applies an initial \`opacity: 0; transform: translateY(20px)\` to each card, then removes these styles with increasing \`setTimeout\` delays (100ms, 220ms, 340ms). The CSS \`transition\` handles the interpolation. This lightweight stagger avoids an Intersection Observer while still producing the "cards loading in sequence" effect. Pair with a [skeleton loader](/ui-snippets/skeleton-loader/) to show while real profile data is fetching from an API.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Paste HTML, CSS, and JS',
        text: `Three team cards appear in a responsive grid. Each card fades and slides up with a 120ms stagger — the cards load in sequence from left to right.`,
      },
      {
        title: 'Inspect the status dots',
        text: `Sarah and Priya have green online dots. Marcus has an amber away dot. The white border ring makes each dot visible against the avatar photo.`,
      },
      {
        title: 'Hover over a card',
        text: `The card lifts 4px and a soft shadow appears — a standard hover lift that communicates interactivity without being aggressive.`,
      },
      {
        title: 'Hover over social icons',
        text: `Each social icon button fills with the indigo brand colour on hover. The background, icon colour, and border all transition together.`,
      },
      {
        title: 'Replace with your team',
        text: `Swap the \`<img src>\` with real profile photos. Update names, roles, bios, and stat numbers. Change the role badge class to match your team's departments.`,
      },
      {
        title: 'Add or remove team members',
        text: `Copy an \`<article class="card">\` block for each new member. The CSS Grid uses \`auto-fit\` with \`minmax(240px, 1fr)\` so any number of cards adapts to the container width.`,
      },
    ] },
    features: [
      {
        title: 'Presence status dot',
        text: `Online/away/offline dots positioned at the avatar corner with a white border ring — visible against any photo. Three CSS colour classes for three status states.`,
      },
      {
        title: 'Role badge colour variants',
        text: `Indigo (default), pink (design), blue (engineering) — colour-coded role chips that create visual taxonomy across a team grid at a glance.`,
      },
      {
        title: 'Stats row with shared border',
        text: `Three metrics in a shared-border container using per-cell right borders — a compact stats display that fits within the card's natural width.`,
      },
      {
        title: 'Social icon hover fill',
        text: `Social icons transition from grey-on-white to white-on-indigo on hover — background, icon colour, and border all transition together for a cohesive feel.`,
      },
      {
        title: 'Hover lift animation',
        text: `\`transform: translateY(-4px)\` + \`box-shadow\` on \`:hover\` — a standard card interaction pattern that communicates clickability without JS.`,
      },
      {
        title: 'Staggered load animation',
        text: `JS applies staggered \`setTimeout\` delays (100ms, 220ms, 340ms) with CSS \`transition\` interpolating \`opacity\` and \`translateY\` — sequential card reveal without an Intersection Observer.`,
      },
      {
        title: 'Responsive auto-fit grid',
        text: `\`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))\` — any number of cards wraps naturally. One column on mobile, two on tablet, three or more on desktop.`,
      },
      {
        title: 'Lazy-loaded avatars',
        text: `All \`<img>\` tags use \`loading="lazy"\` — profile photos outside the initial viewport don't load until scrolled into view.`,
      },
    ],
    useCases: [
      {
        title: 'Company and agency About pages',
        text: `The primary use case — a "Meet the Team" section that humanises the company. Use real photos, real bios, and link social profiles to actual accounts.`,
      },
      {
        title: 'SaaS product founder and team pages',
        text: `Founder credibility is a key trust signal in SaaS. Showing the team with bios and previous experience (Stripe, Figma, etc.) increases conversion from pricing pages.`,
      },
      {
        title: 'Freelancer marketplace user profiles',
        text: `Adapt the card for marketplace profiles: show skills instead of role badges, hourly rate instead of stats, and a "Hire" CTA instead of "View Profile".`,
      },
      {
        title: 'Conference and event speaker grids',
        text: `Speaker cards show headshot, session title as the "role", company as the bio intro, and links to their talk topics. The stats row becomes session length and audience count.`,
      },
      {
        title: 'GitHub organisation contributor pages',
        text: `Fetch contributor data from the GitHub API and populate the cards dynamically. Stats become commit count, stars, and repos. Use the GitHub avatar URL.`,
      },
      {
        title: 'Internal company directory',
        text: `Team directory pages in internal tools and intranets use the same card layout. The status dot reflects real-time presence from Slack or Google Workspace status APIs.`,
      },
    ],
    faqs: [
      {
        q: 'How do I make the status dot reflect real-time presence?',
        a: `Fetch presence data from your status API (Slack Web API, custom endpoint) on page load. Map the status value to the CSS class: \`el.className = 'status-dot ' + (status === 'active' ? 'online' : status === 'away' ? 'away' : 'offline')\`.`,
      },
      {
        q: 'How do I populate cards from a JSON array?',
        a: `Define a \`TEAM\` array of objects with \`{name, role, bio, avatar, stats, socials}\`. Map over it to build each card's HTML via \`template literals\` and \`innerHTML\`. This makes adding/removing team members a data change only.`,
      },
      {
        q: 'How do I export this as a React component?',
        a: `Create a \`TeamCard\` component that accepts a prop object. Map a \`team\` array to \`<TeamCard key={member.id} {...member} />\`. The stagger animation can use \`style={{ animationDelay: \`\${index * 120}ms\` }}\` with a CSS \`@keyframes fadeUp\`.`,
      },
      {
        q: 'How do I link "View Profile" to individual profile pages?',
        a: `Set \`href="/team/{slug}"\` on the \`.view-btn\` anchor. In your CMS or backend, create a route that renders the full profile page using the same data. In Next.js: \`/app/team/[slug]/page.js\` with \`generateStaticParams\` for SSG.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stagger timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each card's setTimeout delay is calculated as a base offset plus the card's index times a fixed step, and why the status dot needs a solid white border ring rather than just a colored circle sitting on top of the avatar. The same assistant can help optimize it — for instance whether hardcoded setTimeout delays should be replaced with an IntersectionObserver so cards only animate in once the section actually scrolls into view, or whether the shared-border stats row technique could break visually if a stat number wraps to two lines. It's also useful for extending the cards: ask it to fetch real presence status from a WebSocket instead of a static class, add a flip-to-reveal-more-bio interaction on click, or generate the role-badge color automatically from a department name instead of hardcoded modifier classes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "team member card" grid in plain HTML, CSS, and JavaScript with a staggered load-in animation — no animation library, no framework.

Requirements:
- A responsive CSS grid of cards using auto-fit and minmax so any number of cards wraps naturally at any container width, each card containing: an avatar image with a small presence-status dot positioned at its bottom-right corner (with a solid border the same color as the card background so the dot reads clearly against any photo), a colored role-badge pill, a name, a role line, a short bio, a three-column stats row with shared internal divider borders (not three separate bordered boxes), and a footer with social icon links plus a "View Profile" call-to-action.
- The status dot must support at least three distinct color states (e.g. online, away, offline) applied via a modifier class, and the role badge must support at least three distinct color variants applied the same way.
- The stats row's three cells must share one outer border, with only an internal right-border between adjacent cells (and no right border on the last cell) so it reads as one connected row rather than three separate boxes.
- On page load, every card must start invisible and shifted down slightly (opacity 0 and a translateY offset), then animate to fully visible and untransformed using a CSS transition, with each card's animation delayed by an amount proportional to its position in the grid so the cards visibly reveal in sequence rather than all at once.
- Cards must lift slightly and gain a soft shadow on hover, and social icon buttons must invert from a neutral background to a solid accent-color fill with white icon color on hover.`,
    },
  },
};

export default teamCard;
