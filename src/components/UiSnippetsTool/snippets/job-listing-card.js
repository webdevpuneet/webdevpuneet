const jobListingCard = {
  id: 'job-listing-card',
  title: 'Job Listing Card',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="page">
  <div class="page-header">
    <h1 class="page-title">Open Positions <span class="count-badge">12</span></h1>
    <div class="filter-row">
      <button class="filter-btn active" onclick="setFilter(this,'all')">All</button>
      <button class="filter-btn" onclick="setFilter(this,'remote')">Remote</button>
      <button class="filter-btn" onclick="setFilter(this,'full-time')">Full-time</button>
      <button class="filter-btn" onclick="setFilter(this,'contract')">Contract</button>
    </div>
  </div>

  <div class="jobs-list">
    <article class="job-card" data-type="remote full-time">
      <div class="job-main">
        <div class="company-logo" style="--bg:#6366f1;--fg:#fff">FW</div>
        <div class="job-info">
          <div class="job-meta-row">
            <span class="company-name">webdevpuneet.com</span>
            <span class="job-type remote">Remote</span>
          </div>
          <h2 class="job-title">Senior Frontend Engineer</h2>
          <div class="job-details">
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Worldwide</span>
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Full-time</span>
            <span class="detail salary"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>$120k – $160k</span>
          </div>
          <div class="tags">
            <span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">CSS</span><span class="tag">Next.js</span>
          </div>
        </div>
      </div>
      <div class="job-actions">
        <span class="posted-time">2d ago</span>
        <button class="save-btn" onclick="toggleSave(this)" aria-label="Save job">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <a href="#" class="apply-btn">Apply Now</a>
      </div>
    </article>

    <article class="job-card" data-type="full-time">
      <div class="job-main">
        <div class="company-logo" style="--bg:#0ea5e9;--fg:#fff">ST</div>
        <div class="job-info">
          <div class="job-meta-row">
            <span class="company-name">Stackify</span>
            <span class="job-type onsite">On-site</span>
          </div>
          <h2 class="job-title">Product Designer</h2>
          <div class="job-details">
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>San Francisco, CA</span>
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Full-time</span>
            <span class="detail salary"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>$95k – $130k</span>
          </div>
          <div class="tags">
            <span class="tag">Figma</span><span class="tag">Design Systems</span><span class="tag">Prototyping</span>
          </div>
        </div>
      </div>
      <div class="job-actions">
        <span class="posted-time">5d ago</span>
        <button class="save-btn" onclick="toggleSave(this)" aria-label="Save job">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <a href="#" class="apply-btn">Apply Now</a>
      </div>
    </article>

    <article class="job-card featured" data-type="remote contract">
      <div class="featured-badge">🔥 Featured</div>
      <div class="job-main">
        <div class="company-logo" style="--bg:#f59e0b;--fg:#fff">NX</div>
        <div class="job-info">
          <div class="job-meta-row">
            <span class="company-name">Nexus Labs</span>
            <span class="job-type contract">Contract</span>
          </div>
          <h2 class="job-title">Full-Stack Developer</h2>
          <div class="job-details">
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Remote (EU)</span>
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>6-month contract</span>
            <span class="detail salary"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>$800–$1,200/day</span>
          </div>
          <div class="tags">
            <span class="tag">Node.js</span><span class="tag">React</span><span class="tag">PostgreSQL</span><span class="tag">AWS</span>
          </div>
        </div>
      </div>
      <div class="job-actions">
        <span class="posted-time">1d ago</span>
        <button class="save-btn" onclick="toggleSave(this)" aria-label="Save job">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <a href="#" class="apply-btn">Apply Now</a>
      </div>
    </article>

    <article class="job-card" data-type="remote full-time">
      <div class="job-main">
        <div class="company-logo" style="--bg:#10b981;--fg:#fff">GR</div>
        <div class="job-info">
          <div class="job-meta-row">
            <span class="company-name">GrowthRocket</span>
            <span class="job-type remote">Remote</span>
          </div>
          <h2 class="job-title">DevOps Engineer</h2>
          <div class="job-details">
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>US / Canada</span>
            <span class="detail"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Full-time</span>
            <span class="detail salary"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>$110k – $145k</span>
          </div>
          <div class="tags">
            <span class="tag">Docker</span><span class="tag">Kubernetes</span><span class="tag">CI/CD</span>
          </div>
        </div>
      </div>
      <div class="job-actions">
        <span class="posted-time">1w ago</span>
        <button class="save-btn" onclick="toggleSave(this)" aria-label="Save job">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <a href="#" class="apply-btn">Apply Now</a>
      </div>
    </article>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc;min-height:100vh;padding:28px 20px}
.page{max-width:720px;margin:0 auto}
.page-header{margin-bottom:20px}
.page-title{font-size:20px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;margin-bottom:14px}
.count-badge{font-size:12px;font-weight:700;background:#6366f1;color:#fff;border-radius:20px;padding:2px 9px}

.filter-row{display:flex;gap:6px;flex-wrap:wrap}
.filter-btn{font-size:12px;font-weight:600;padding:5px 14px;border-radius:20px;border:1.5px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;transition:all .15s;font-family:inherit}
.filter-btn.active,.filter-btn:hover{background:#6366f1;border-color:#6366f1;color:#fff}

.jobs-list{display:flex;flex-direction:column;gap:12px}
.job-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;padding:18px 20px;transition:box-shadow .2s,border-color .2s;cursor:pointer;position:relative}
.job-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.07);border-color:#c7d2fe}
.job-card.featured{border-color:#fde68a;background:linear-gradient(145deg,#fffbeb,#fff)}

.featured-badge{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;color:#b45309;background:#fef3c7;border-radius:6px;padding:2px 8px;margin-bottom:10px}

.job-main{display:flex;gap:14px}
.company-logo{width:44px;height:44px;border-radius:12px;background:var(--bg);color:var(--fg);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0}
.job-info{flex:1;min-width:0}

.job-meta-row{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.company-name{font-size:12px;font-weight:600;color:#64748b}
.job-type{font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px}
.job-type.remote{background:#d1fae5;color:#065f46}
.job-type.onsite{background:#dbeafe;color:#1e40af}
.job-type.contract{background:#fef3c7;color:#92400e}

.job-title{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.job-details{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:10px}
.detail{display:flex;align-items:center;gap:4px;font-size:11.5px;color:#64748b}
.detail.salary{color:#059669;font-weight:600}
.detail svg{flex-shrink:0;opacity:.7}

.tags{display:flex;flex-wrap:wrap;gap:5px}
.tag{font-size:10px;font-weight:600;color:#475569;background:#f1f5f9;border-radius:6px;padding:2px 8px}

.job-actions{display:flex;align-items:center;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid #f1f5f9}
.posted-time{font-size:11px;color:#94a3b8;margin-right:auto}
.save-btn{width:32px;height:32px;border-radius:8px;border:1.5px solid #e2e8f0;background:#fff;color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s}
.save-btn:hover,.save-btn.saved{border-color:#6366f1;color:#6366f1;background:#eef2ff}
.save-btn.saved svg{fill:#6366f1}
.apply-btn{display:inline-flex;align-items:center;padding:7px 18px;background:#6366f1;color:#fff;font-size:12px;font-weight:700;border-radius:8px;text-decoration:none;transition:background .15s;font-family:inherit}
.apply-btn:hover{background:#4f46e5}

@media(max-width:500px){.job-details{gap:8px}.job-title{white-space:normal}}`,

  js: `function toggleSave(btn) {
  btn.classList.toggle('saved');
}

function setFilter(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.job-card').forEach(card => {
    if (type === 'all') {
      card.style.display = '';
    } else {
      card.style.display = card.dataset.type.includes(type) ? '' : 'none';
    }
  });
}`,

  seo: {
    title: 'Job Listing Card — Job Board UI HTML CSS JS Snippet',
    description: `Job listing card with company logo, salary, job-type badge, skill tags, save toggle, and filter bar. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Job Listing Card — Job Board UI, Filter Bar, Save Toggle & Featured Card Pattern`,
      description: `Job listing cards are the core UI unit of job boards, career pages, and recruitment platforms. Every listing card must communicate role identity (title, company, location), compensation (salary range), work arrangement (remote/on-site/contract), required skills (tag chips), and actions (apply, save) — all within a compact scannable card that works at mobile widths. This snippet builds a complete job listings page with filter bar, four listing cards, featured card variant, save-to-bookmarks toggle, and job-type colour-coded badges.

Job board UI appears across dedicated job platforms (LinkedIn Jobs, Indeed, Greenhouse), company career pages, aggregator sites, and freelance marketplaces. The UX challenge is giving candidates enough information to qualify the role without overwhelming the card — salary and work arrangement are the first filters candidates apply, so they must be prominent.

**Company logo with CSS custom property colour**

Each listing's company logo uses initials with \`--bg\` and \`--fg\` CSS custom properties for background and text colour. This gives each company a distinct colour identity without loading images. In a real application, you'd use an \`<img>\` with a fallback to the initials \`<div>\` via an \`onerror\` handler. The same CSS custom property colour pattern appears in [team cards](/ui-snippets/team-card/) and [review cards](/ui-snippets/review-card/).

**Job type badge colour system**

Three badge variants handle the most common work arrangements: \`.remote\` (green — positive signal for remote workers), \`.onsite\` (blue — neutral office work), and \`.contract\` (amber — time-limited engagement). Each uses a light tinted background with a dark matching text colour — the same tonal badge pattern as status indicators in [activity feeds](/ui-snippets/activity-feed/).

**Filter bar with data attribute matching**

The filter buttons use \`data-type\` attributes on each card containing space-separated type tokens (e.g. \`"remote full-time"\`). The \`setFilter\` function checks \`card.dataset.type.includes(type)\` and shows/hides cards accordingly. This approach scales to any number of filter values and any number of types per card — a job can be both \`remote\` and \`full-time\` and appear under either filter.

**Save/bookmark toggle**

The bookmark button uses a \`saved\` class toggle with CSS fill state — \`fill: #6366f1\` on the SVG path fills the bookmark icon when saved. No JavaScript state persistence is shown here (you'd use localStorage or a backend), but the visual affordance is clear. The same bookmark save pattern appears in [product cards](/ui-snippets/product-card/).

**Featured card variant**

The \`.featured\` card uses an amber border and warm background tint — the standard "promoted listing" pattern on job boards. A \`🔥 Featured\` badge appears above the job main content using a dedicated \`.featured-badge\` element. In a real implementation, featured cards come from paid job promotions.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Four job cards appear in a vertical list below a filter bar. Cards show company logo, job title, location, salary, job type badge, tags, save button, and Apply Now CTA.` },
      { title: 'Click filter buttons', text: `"Remote" shows only remote listings. "Full-time" shows full-time roles. "Contract" shows the featured Nexus Labs listing. "All" restores all cards.` },
      { title: 'Click the bookmark icon', text: `The bookmark SVG fills with indigo and the button gets an indigo border — indicates the job is saved. Click again to un-save.` },
      { title: 'Identify the featured card', text: `The Nexus Labs card has an amber border, warm background, and a "🔥 Featured" badge — the promoted listing pattern used by job boards.` },
      { title: 'Update job details', text: `Change the company initials, \`--bg\` colour, job title, location, salary, and skill tags. Update \`data-type\` on each card to include the correct filter tokens.` },
      { title: 'Add more jobs', text: `Duplicate any \`.job-card\` article. Set \`data-type\` to space-separated values from: \`remote\`, \`full-time\`, \`contract\`. The filter function matches these automatically.` },
    ] },
    features: [
      { title: 'Job-type colour badges', text: `\`.remote\` (green), \`.onsite\` (blue), \`.contract\` (amber) — colour-coded work arrangement badges that candidates scan first when filtering listings.` },
      { title: 'Data-attribute filter bar', text: `\`data-type\` on each card with space-separated tokens. Filter function shows/hides with \`dataset.type.includes(type)\` — scales to any number of filter values.` },
      { title: 'Save/bookmark toggle', text: `\`saved\` class fills the SVG bookmark icon with indigo. Toggle is instant — no server call needed for the visual state.` },
      { title: 'Salary prominence', text: `Salary \`.detail.salary\` uses green \`#059669\` — the highest-contrast detail to make compensation immediately visible when scanning listings.` },
      { title: 'Featured listing variant', text: `\`.featured\` with amber border, warm background, and \`🔥 Featured\` badge — the promoted listing pattern used by LinkedIn, Indeed, and Glassdoor.` },
      { title: 'CSS custom property company logos', text: `\`--bg\` and \`--fg\` on each \`.company-logo\` — one inline style attribute per card sets the entire logo colour scheme.` },
      { title: 'Skill tag chips', text: `\`.tags\` with wrapping chip elements show required technologies per role — first-pass filter for candidates checking technical stack fit.` },
      { title: 'Apply CTA button', text: `\`.apply-btn\` is an \`<a>\` tag (not a button) so it navigates directly to the application URL without JavaScript.` },
    ],
    useCases: [
      { title: 'Company career pages', text: `The primary use case — list open roles with department filter, location, and salary range. The featured variant highlights priority hires.` },
      { title: 'Freelance marketplace listings', text: `Project listings on platforms like Toptal or Upwork use the same card pattern: client name, project type, budget, required skills, and a proposal CTA.` },
      { title: 'Tech job aggregator sites', text: `Aggregators scraping jobs from multiple sources use this card pattern to present normalised listing data — company, role, location, salary, and tags.` },
      { title: 'Internal talent marketplace', text: `Large enterprises use internal job boards for lateral moves and internal transfers — same card pattern but with department and level information.` },
      { title: 'Hackathon and event team-building', text: `Hackathon team-finder boards use listing cards to match participants: role needed, skills required, project description, and a join/apply button.` },
      { title: 'Remote work community boards', text: `Remote-first communities like Remote OK, We Work Remotely, and Remotive use this exact card pattern — \`.remote\` badge is the most important filter.` },
      { icon: 'CODE', title: 'Related: Text Selection Highlight & Comment', desc: 'See the [Text Selection Highlight & Comment](/ui-snippets/text-selection-annotation/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add multiple filter dimensions (location AND type)?', a: `Store active filters in a Set: \`const active = new Set()\`. Toggle filters in/out of the set on button click. Show a card only if all active filters are present in \`card.dataset.type\`. This gives AND-logic filtering (Remote AND Full-time).` },
      { q: 'How do I persist saved jobs across page reloads?', a: `On save toggle, read/write to localStorage: \`const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]')\`. Add/remove the job ID. On page load, restore saved state by checking each card's ID against the saved array and applying \`.saved\` class.` },
      { q: 'How do I add a job detail drawer or modal?', a: `Add a \`click\` listener to each \`.job-card\`. On click, populate a side [drawer](/ui-snippets/drawer/) or [modal](/ui-snippets/modal/) with the full job description, requirements, and benefits. Pass the job data as a JS object and render it into the panel's innerHTML.` },
      { q: 'How do I export this as a React component?', a: `Create a \`JobCard\` component with props: \`{company, logoColor, title, type, location, salary, tags, featured, posted}\`. The filter bar is a parent component with \`const [filter, setFilter] = useState('all')\`. Filter the jobs array before mapping to \`JobCard\` components: \`jobs.filter(j => filter === 'all' || j.type.includes(filter))\`.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer the filter matching by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why setFilter checks card.dataset.type.includes(type) against a space-separated string instead of an array, and what edge case that string-includes check could silently break on (think a type value that is a substring of another, like "remote" matching inside a longer token). The same assistant can help optimize it, for instance suggesting how the approach should change once the four hardcoded cards become fifty or a hundred fetched from an API, or whether re-querying all .job-card elements on every filter click is worth caching. It is just as useful for extending the pattern, such as adding a combined AND-filter for both location and job type at once, persisting the save toggle to localStorage, or turning the amber featured-card styling into a data-driven flag from a real listings API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "job listing card" board in plain HTML, CSS, and JavaScript using only DOM APIs and CSS custom properties for per-company colors — no framework, no icon library beyond inline SVG.

Requirements:
- A filter bar of pill buttons (All, Remote, Full-time, Contract) where clicking one marks it active and shows or hides job cards based on a data-type attribute on each card containing space-separated tokens (e.g. "remote full-time"). The filter must work by checking whether the clicked filter's token is included in that space-separated string, so a card can match multiple filters.
- Each job card must show a company logo rendered as initials inside a div whose background and text colors come from CSS custom properties (--bg and --fg) set inline per card, a company name, a color-coded job-type badge (distinct colors for remote, on-site, and contract), a job title, a row of detail items with inline SVG icons (location, employment duration, salary), a wrapping row of skill tag chips, a relative "posted X ago" timestamp, a bookmark/save icon button, and an Apply Now link styled as a button.
- The save button must toggle a "saved" class on click that changes its border color and fills the bookmark SVG icon, with no page reload or navigation.
- Include at least one "featured" card variant with a distinct border color, a tinted gradient background, and a small badge element above its content to mark it as a promoted listing.
- Keep the Apply action as a real anchor tag (not a JavaScript button) so it works without any script running, and keep the save toggle and filter logic as small, independent functions attached via plain addEventListener or inline handlers.`,
    },
  },
};

export default jobListingCard;
