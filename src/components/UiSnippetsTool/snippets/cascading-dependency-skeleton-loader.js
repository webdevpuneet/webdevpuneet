const cascadingDependencySkeletonLoader = {
  id: 'cascading-dependency-skeleton-loader',
  title: 'Cascading Dependency Skeleton Loader — Parent Then Children, Honestly',
  lastmod: '2026-08-28',
  category: 'loaders',
  html: `<div class="demo">
  <div class="profile-card" id="profileCard">
    <div class="skeleton-row">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-col">
        <div class="skeleton skeleton-line" style="width: 60%"></div>
        <div class="skeleton skeleton-line" style="width: 40%"></div>
      </div>
    </div>

    <div class="posts-section" id="postsSection">
      <div class="posts-placeholder" id="postsPlaceholder">
        <span class="posts-placeholder-text">Waiting for profile before loading posts…</span>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 360px; max-width: 100%; }

.profile-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; display: flex; flex-direction: column; gap: 16px; }

.skeleton-row { display: flex; align-items: center; gap: 12px; }
.skeleton-col { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.skeleton { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: shimmer 1.4s ease infinite; border-radius: 6px; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.skeleton-avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
.skeleton-line { height: 11px; }

.real-avatar { width: 48px; height: 48px; border-radius: 50%; background: #eef2ff; color: #4338ca; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.real-name { font-size: 14px; font-weight: 800; color: #111827; }
.real-role { font-size: 12px; color: #64748b; }

.posts-section { border-top: 1px solid #f1f5f9; padding-top: 14px; }
.posts-placeholder { display: flex; align-items: center; justify-content: center; padding: 20px 0; }
.posts-placeholder-text { font-size: 11.5px; color: #cbd5e1; text-align: center; }

.post-skeleton { display: flex; flex-direction: column; gap: 6px; padding: 10px 0; border-bottom: 1px solid #f8fafc; }
.post-skeleton:last-child { border-bottom: none; }

.real-post { padding: 10px 0; border-bottom: 1px solid #f8fafc; }
.real-post:last-child { border-bottom: none; }
.real-post-title { font-size: 12.5px; font-weight: 700; color: #111827; margin-bottom: 3px; }
.real-post-meta { font-size: 11px; color: #94a3b8; }

.section-fade-in { animation: fadeIn 0.25s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
  js: `const profileCard = document.getElementById('profileCard');
const postsSection = document.getElementById('postsSection');

// This models a real, common data-fetching shape: posts genuinely CANNOT be
// requested until the profile response returns an author id — the two
// requests are not independent, they're a real dependency chain. The
// skeleton UI is built to honestly reflect that: posts show a distinct
// "waiting on profile" placeholder, not a generic skeleton implying their
// own request is already in flight when it structurally can't be yet.
function fetchProfile() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 42, name: 'Dana Whitfield', role: 'Product Designer' }), 1100);
  });
}

function fetchPosts(authorId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { title: 'Redesigning the onboarding flow', meta: '3 days ago · ' + authorId },
      { title: 'Notes from our design system audit', meta: '1 week ago · ' + authorId },
      { title: 'Why we moved to a token-based color system', meta: '2 weeks ago · ' + authorId },
    ]), 900);
  });
}

function renderProfileSkeleton() {
  profileCard.querySelector('.skeleton-row').innerHTML = \`
    <div class="skeleton skeleton-avatar"></div>
    <div class="skeleton-col">
      <div class="skeleton skeleton-line" style="width: 60%"></div>
      <div class="skeleton skeleton-line" style="width: 40%"></div>
    </div>
  \`;
}

function renderProfile(profile) {
  const initials = profile.name.split(' ').map((p) => p[0]).join('');
  profileCard.querySelector('.skeleton-row').innerHTML = \`
    <div class="real-avatar">\${initials}</div>
    <div>
      <div class="real-name">\${profile.name}</div>
      <div class="real-role">\${profile.role}</div>
    </div>
  \`;
  profileCard.querySelector('.skeleton-row').classList.add('section-fade-in');
}

// Once the profile resolves, the "waiting" placeholder is replaced with a
// REAL skeleton for posts — this second skeleton is meaningfully different
// from the first: it represents a request that has now actually started,
// whereas the initial placeholder represented a request that structurally
// couldn't start yet at all.
function renderPostsSkeleton() {
  postsSection.innerHTML = Array.from({ length: 3 }, () => \`
    <div class="post-skeleton">
      <div class="skeleton skeleton-line" style="width: 75%; height: 12px;"></div>
      <div class="skeleton skeleton-line" style="width: 45%; height: 10px;"></div>
    </div>
  \`).join('');
}

function renderPosts(posts) {
  postsSection.innerHTML = posts.map((post) => \`
    <div class="real-post">
      <div class="real-post-title">\${post.title}</div>
      <div class="real-post-meta">\${post.meta}</div>
    </div>
  \`).join('');
  postsSection.classList.add('section-fade-in');
}

async function load() {
  renderProfileSkeleton();
  const profile = await fetchProfile();
  renderProfile(profile);

  // Only now, with a real author id in hand, does the posts request
  // actually become possible to make — so only now does its skeleton
  // switch from "waiting" to "in flight."
  renderPostsSkeleton();
  const posts = await fetchPosts(profile.id);
  renderPosts(posts);
}

load();`,
  seo: {
    title: 'Cascading Dependency Skeleton Loader — Honest Loading States for Sequential Requests',
    description: 'A skeleton loading pattern for genuinely sequential (parent-then-child) data fetching, where a dependent section shows a distinct "waiting on parent" state rather than a misleading generic skeleton implying its own request is already in flight.',
    about: {
      title: 'Cascading Dependency Skeletons — Being Honest About What\'s Actually Loading',
      description: `Most skeleton-loading implementations assume every section of a page can start fetching its data independently and simultaneously — but that's not always true. Sometimes a section's request genuinely cannot begin until an earlier request returns something it depends on (a classic example: you can't fetch a user's posts until you know the user's ID, which itself comes from a profile request). This snippet models that real dependency correctly, and — more importantly — makes the loading UI honestly reflect it.

**Two visually distinct "not ready yet" states, for two different reasons**

Before the profile loads, the posts section shows a plain, muted "waiting for profile before loading posts…" text placeholder — deliberately *not* a shimmering skeleton block. Once the profile resolves and the posts request actually begins, the posts section switches to a real animated skeleton. This distinction matters: a shimmering skeleton visually implies "a request for this content is currently in flight," which would be **false** during the waiting period — no posts request has been made yet, because it structurally cannot be made until the author id from the profile response exists. Showing the same shimmering skeleton for both states would be a small but real UI lie.

**The dependency is enforced by the actual code structure, not just visually implied**

\`load()\`'s \`await fetchProfile()\` is followed by \`renderPostsSkeleton()\` and *then* \`await fetchPosts(profile.id)\` — the posts request literally cannot be constructed before this point, since it requires \`profile.id\` as an argument. This isn't a UI-only distinction layered on top of two independent, already-parallel requests; the sequential dependency is real at the code level, and the loading UI is simply being honest about that existing structure rather than manufacturing an artificial-looking staged reveal.

**Why this differs from a page that could fetch everything in parallel**

If posts could genuinely be fetched independently of the profile (for example, if the posts endpoint took a URL slug rather than a numeric author id derived from the profile response), the correct pattern would be firing both requests simultaneously with \`Promise.all\` and showing two independent skeletons from the start — no "waiting" placeholder needed, since there'd be no real reason for one section to wait on the other. This pattern specifically models the case where a true data dependency exists, and is exactly the wrong pattern to reach for when sections genuinely can load in parallel.

**A fade-in on each section once its real content replaces its skeleton**

Both \`renderProfile()\` and \`renderPosts()\` add a \`section-fade-in\` class the moment they replace skeleton markup with real content — a small transition that softens the visual "pop" of content suddenly appearing, applied consistently to both the profile and posts sections despite them completing their loading at different, sequential times.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Observe the initial state', text: 'The profile section shows a shimmering skeleton; the posts section shows a plain muted "waiting for profile" message — not a shimmering skeleton, since no posts request is in flight yet.' },
        { title: 'Watch the profile resolve', text: 'Real profile content fades in, replacing its skeleton.' },
        { title: 'Watch the posts section change state', text: 'The moment the profile resolves, the posts section switches from its "waiting" placeholder to a REAL shimmering skeleton — because only now has the posts request actually started.' },
        { title: 'Watch the posts resolve', text: 'Real post content fades in, replacing the posts skeleton, completing the cascade.' },
        { title: 'Adapt fetchProfile()/fetchPosts() to real requests', text: 'Replace both with real API calls, keeping fetchPosts() requiring the resolved profile\'s id as its argument to preserve the genuine dependency structure.' },
      ],
    },
    features: [
      'Models a genuine sequential data dependency (posts request requires the profile\'s resolved id) rather than an artificial staged reveal',
      'Distinct "waiting on parent" placeholder for a not-yet-startable request, visually different from an actual in-flight skeleton',
      'The dependent section\'s skeleton only appears once its request has genuinely begun, keeping the UI honest about request state',
      'Sequential awaits in the loading function structurally enforce the same dependency the UI visually communicates',
      'Shimmering skeleton animation clearly distinguishes "content is being fetched" from both "not started yet" and "loaded"',
      'Fade-in transition softens the visual replacement of skeleton markup with real content in both sections',
      'Clear separation of concerns between skeleton-rendering functions and real-content-rendering functions for each section',
    ],
    useCases: [
      { icon: 'PROFILE', title: 'Profile pages with dependent content sections', desc: 'A user profile where posts, activity, or stats genuinely require the profile\'s resolved id before they can be requested.' },
      { icon: 'DASHBOARD', title: 'Dashboards with hierarchical data dependencies', desc: 'A dashboard where a selected account or workspace must resolve before its child resources (projects, members) can be fetched.' },
      { icon: 'DETAIL', title: 'Master-detail views', desc: 'Any UI where selecting or loading a parent record is a genuine prerequisite for fetching its related child records.' },
      { icon: 'API', title: 'APIs with resource-dependent endpoints', desc: 'Backend structures where a child resource\'s endpoint requires an id only available from a parent resource\'s response.' },
      { icon: 'CODE', title: 'Related: 3D Rotating Cube Loader', desc: 'See the [3D Rotating Cube Loader](/ui-snippets/loader-3d-cube-spinner/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Skeleton Shape Morph Reveal', desc: 'See the [Skeleton Shape Morph Reveal](/ui-snippets/skeleton-shape-morph-reveal/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the posts section show plain text instead of a skeleton before the profile loads?', a: 'A shimmering skeleton visually communicates "a request for this content is currently in flight" — which would be false during that waiting period, since the posts request cannot even be constructed yet without the profile\'s resolved id. The plain, muted placeholder honestly communicates a different state: waiting on a prerequisite, not actively loading.' },
      { q: 'Is the dependency between profile and posts just a UI convention, or is it enforced in the code?', a: 'It\'s a real, enforced dependency — fetchPosts() requires profile.id as an argument, and that argument literally does not exist until fetchProfile()\'s promise has resolved. The sequential await structure in load() is not just a visual staging trick; the posts request genuinely cannot be made any earlier.' },
      { q: 'When should I NOT use this cascading pattern?', a: 'When two pieces of content can genuinely be fetched independently and in parallel (neither requires data from the other\'s response), you should fire both requests simultaneously (e.g. with Promise.all) and show two independent skeletons from the start — introducing an artificial "waiting" state for content that could have loaded in parallel would only slow down the perceived loading time for no real reason.' },
      { q: 'What happens to the posts section the instant the profile resolves?', a: 'It immediately switches from its "waiting for profile" placeholder to a real shimmering skeleton, because the posts request genuinely begins at that exact moment (with profile.id now available) — the skeleton\'s appearance is tied to the request actually starting, not to an arbitrary timer.' },
      { q: 'How would I adapt this to a real API instead of the simulated delays?', a: 'Replace fetchProfile() and fetchPosts() with real requests to your backend, keeping fetchPosts() accepting the resolved profile\'s id (or whichever identifier your posts endpoint genuinely requires) as its parameter, preserving the real sequential dependency between the two calls.' },
      { q: 'Why is there a fade-in transition when real content replaces a skeleton?', a: 'It softens the visual "pop" of content suddenly appearing in place of a skeleton, applied consistently to both sections even though they complete their loading at different points in the sequence — a small polish detail that makes each transition feel more intentional than an abrupt content swap.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain the difference between a genuine sequential data dependency (where one request's parameters come from another's response) and content sections that merely happen to be rendered one after another, and why the loading UI should differ between the two cases. It's also worth asking for a version that handles a THREE-level cascade (e.g. profile, then posts, then comments on the first post), or one that shows an appropriate error state for the dependent section if the parent request succeeds but the child request subsequently fails.`,
      prompt: `Build a cascading (parent-then-child) skeleton loading UI in HTML, CSS, and vanilla JavaScript — no external library.

Requirements:
- A profile section and a posts section on the same card, where fetching the posts genuinely requires an identifier that only becomes available from the resolved profile response (simulate both requests with a delayed Promise, with the posts fetch function accepting the profile's resolved id as a required parameter).
- Before the profile has loaded, the posts section must show a plain, visually distinct placeholder (NOT a shimmering skeleton) indicating it is waiting on the profile to resolve first — since no posts request can have started yet at that point.
- The profile section shows a shimmering skeleton animation while its own request is in flight, then replaces it with real rendered content once resolved.
- The exact moment the profile request resolves, the posts section must switch from its "waiting" placeholder to a genuine shimmering skeleton animation — because only at that point does the posts request actually begin (now that the required id is available) — then replace that skeleton with real rendered post content once its own request resolves.
- Structure the loading logic (the sequence of awaited async calls) so the dependency between the two requests is enforced by the actual code, not merely implied visually — the posts-fetching function must require the profile's resolved id as an argument.
- Apply a brief fade-in transition when skeleton markup in either section is replaced with real content.`,
    },
  },
};

export default cascadingDependencySkeletonLoader;
