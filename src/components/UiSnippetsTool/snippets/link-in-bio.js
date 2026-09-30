const linkInBio = {
  id: 'link-in-bio',
  title: 'Link in Bio Page',
  lastmod: '2026-07-23',
  category: 'layouts',
  html: `<div class="bio">
  <div class="bio-card">
    <!-- Profile -->
    <div class="bio-avatar">
      <span>MJ</span>
      <i class="bio-ring"></i>
    </div>
    <h1 class="bio-name">Mia Jensen</h1>
    <p class="bio-tag">Product designer · maker of tiny tools</p>

    <!-- Social row -->
    <div class="bio-social">
      <a href="#" onclick="return false" aria-label="Twitter / X">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L2.7 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.7H5.2L17.8 20z"/></svg>
      </a>
      <a href="#" onclick="return false" aria-label="Instagram">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="#" onclick="return false" aria-label="YouTube">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.8 3.3-5.8 3.3z"/></svg>
      </a>
      <a href="#" onclick="return false" aria-label="Email">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 6L22 7"/></svg>
      </a>
    </div>

    <!-- Featured link -->
    <a class="bio-link featured" href="#" onclick="return false">
      <span class="link-emoji">🚀</span>
      <span class="link-body">
        <span class="link-title">New: Iconsmith 2.0 is out</span>
        <span class="link-sub">The tiny icon editor — now with export presets</span>
      </span>
      <span class="link-arrow">→</span>
    </a>

    <!-- Links -->
    <a class="bio-link" href="#" onclick="return false">
      <span class="link-emoji">✍️</span>
      <span class="link-body"><span class="link-title">Design notes — my weekly letter</span></span>
      <span class="link-arrow">→</span>
    </a>
    <a class="bio-link" href="#" onclick="return false">
      <span class="link-emoji">🎨</span>
      <span class="link-body"><span class="link-title">Portfolio &amp; case studies</span></span>
      <span class="link-arrow">→</span>
    </a>
    <a class="bio-link" href="#" onclick="return false">
      <span class="link-emoji">🎙️</span>
      <span class="link-body"><span class="link-title">Podcast: Pixels &amp; Coffee</span></span>
      <span class="link-arrow">→</span>
    </a>
    <a class="bio-link" href="#" onclick="return false">
      <span class="link-emoji">💼</span>
      <span class="link-body"><span class="link-title">Book a 1:1 portfolio review</span></span>
      <span class="link-arrow">→</span>
    </a>

    <p class="bio-foot">© 2026 · Made with webdevpuneet.com</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif; min-height: 100vh;
  background:
    radial-gradient(ellipse 70% 50% at 80% 10%, rgba(168,85,247,0.35), transparent 55%),
    radial-gradient(ellipse 60% 50% at 15% 90%, rgba(14,165,233,0.3), transparent 55%),
    #0f172a;
  display: flex; justify-content: center; padding: 40px 18px;
}

.bio { width: 100%; max-width: 400px; }
.bio-card { text-align: center; }

/* — Profile — */
.bio-avatar {
  position: relative; width: 86px; height: 86px;
  margin: 0 auto 14px;
}
.bio-avatar span {
  position: absolute; inset: 5px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff; font-size: 26px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}
.bio-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(#0f172a, #0f172a) padding-box,
              conic-gradient(#6366f1, #a855f7, #f472b6, #6366f1) border-box;
  animation: ring-spin 6s linear infinite;
}
@keyframes ring-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .bio-ring { animation: none; } }

.bio-name { font-size: 21px; font-weight: 800; color: #f8fafc; }
.bio-tag { font-size: 13px; color: #94a3b8; margin-top: 4px; }

/* — Social — */
.bio-social { display: flex; justify-content: center; gap: 8px; margin: 16px 0 22px; }
.bio-social a {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #94a3b8; background: rgba(148,163,184,0.08);
  border: 1px solid rgba(148,163,184,0.15);
  transition: all 0.18s;
}
.bio-social a:hover { color: #fff; border-color: #6366f1; background: rgba(99,102,241,0.2); transform: translateY(-2px); }

/* — Links — */
.bio-link {
  display: flex; align-items: center; gap: 12px;
  background: rgba(30,41,59,0.75); backdrop-filter: blur(6px);
  border: 1px solid #334155; border-radius: 14px;
  padding: 14px 16px; margin-bottom: 11px;
  text-decoration: none; text-align: left;
  transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
  animation: link-in 0.5s backwards;
}
.bio-link:hover {
  transform: translateY(-2px) scale(1.015);
  border-color: #6366f1;
  box-shadow: 0 10px 26px rgba(99,102,241,0.18);
}
.bio-link:active { transform: scale(0.985); }

/* staggered entrance */
.bio-link:nth-of-type(1) { animation-delay: 0.05s; }
.bio-link:nth-of-type(2) { animation-delay: 0.12s; }
.bio-link:nth-of-type(3) { animation-delay: 0.19s; }
.bio-link:nth-of-type(4) { animation-delay: 0.26s; }
.bio-link:nth-of-type(5) { animation-delay: 0.33s; }
@keyframes link-in { from { opacity: 0; transform: translateY(12px); } }
@media (prefers-reduced-motion: reduce) { .bio-link { animation: none; } }

.link-emoji { font-size: 19px; flex-shrink: 0; }
.link-body { flex: 1; min-width: 0; }
.link-title { display: block; font-size: 13.5px; font-weight: 700; color: #e2e8f0; }
.link-sub { display: block; font-size: 11.5px; color: #94a3b8; margin-top: 2px; }
.link-arrow { color: #475569; font-size: 15px; transition: transform 0.18s, color 0.18s; }
.bio-link:hover .link-arrow { transform: translateX(3px); color: #a5b4fc; }

/* featured link */
.bio-link.featured {
  background: linear-gradient(135deg, rgba(99,102,241,0.28), rgba(168,85,247,0.22));
  border-color: rgba(129,140,248,0.6);
  position: relative; overflow: hidden;
}
.bio-link.featured::after {
  content: '';
  position: absolute; top: 0; bottom: 0; width: 60px;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.14), transparent);
  animation: sheen 3.2s ease-in-out infinite;
}
@keyframes sheen { 0%, 60% { left: -80px; } 100% { left: 120%; } }
@media (prefers-reduced-motion: reduce) { .bio-link.featured::after { animation: none; } }

.bio-foot { font-size: 10.5px; color: #475569; margin-top: 20px; }`,

  js: `// The page is fully functional with zero JS. This adds the one behaviour
// link-in-bio services always ship: click analytics you can send anywhere.
document.querySelectorAll('.bio-link').forEach(link => {
  link.addEventListener('click', () => {
    const title = link.querySelector('.link-title').textContent;
    // Swap for your analytics call:
    // gtag('event', 'bio_link_click', { link_title: title });
    // fetch('/api/click', { method: 'POST', body: JSON.stringify({ title }) });
    console.log('clicked:', title);
  });
});`,

  seo: {
    title: 'Link in Bio Page — Free HTML CSS Template Snippet',
    description: 'Linktree-style profile page: conic-gradient avatar ring, glassy link cards with staggered entrances, a sheen-animated featured link and socials. React & Tailwind.',
    about: {
      title: 'Link in Bio Page — Conic-Gradient Avatar Ring, Glassy Link Cards, Staggered Entrances & a Sheen-Highlighted Featured Link',
      description: `"Link in bio" pages are one of the most-created page types on the internet — every creator, freelancer, and small brand needs the one-URL hub that Instagram and TikTok bios demand, and "linktree clone HTML CSS" is a perennially high-volume search precisely because the page is so buildable: it's a column of links, styled with intent. This snippet is a complete, self-hostable bio page in pure HTML and CSS (the only JavaScript is an optional click-analytics hook): animated gradient avatar ring, name and tagline, a social icon row, a featured link with a moving sheen, four standard link cards with staggered entrances, and the ambient two-tone background glow.

**The avatar ring: an animated conic gradient border**

The profile ring uses the double-background border technique — the modern way to get gradient borders on rounded elements: the ring element paints \`linear-gradient(#0f172a, #0f172a) padding-box\` (a solid fill covering the inner area) over \`conic-gradient(#6366f1, #a855f7, #f472b6, #6366f1) border-box\` (the gradient, visible only through the 2px transparent border). Because the conic gradient starts and ends on the same colour, rotating the whole ring with a 6s linear spin is seamless — the Instagram-story-ring effect with no SVG and no extra elements. The initials avatar sits inset inside it; swap the \`<span>\` for an \`<img>\` with \`border-radius: 50%; object-fit: cover\` for a real photo.

**Link cards: the anatomy that converts**

Each link is a real \`<a>\` styled as a card: emoji icon, title (plus an optional subtitle on the featured link), and an arrow that nudges right on hover. The cards are translucent slate with \`backdrop-filter: blur\` so the background glow bleeds through — the glassy treatment that separates a designed bio page from default Linktree. Hover lifts the card 2px with a scale to 1.015 and an indigo-tinted shadow; \`:active\` compresses to 0.985 for tactile press feedback. Entrances are staggered with pure CSS: a shared \`link-in\` keyframe with \`animation: … backwards\` (so cards hold their pre-animation state during the delay) and per-card \`nth-of-type\` delays stepping 70ms — the cascade that makes the page feel alive on load without a line of JavaScript.

**The featured link and its sheen**

Creators always have one link that matters most right now — the launch, the drop, the new video — and bio tools converged on pinning it in a highlighted card. The featured card gets a gradient fill and stronger border, plus the attention detail: a periodic sheen — a skewed white gradient stripe (\`::after\`) that sweeps across every 3.2 seconds via a left-position keyframe with a long idle phase (0–60% parked off-canvas), so it glints rather than strobes. \`overflow: hidden\` clips the stripe to the card. All three animations on the page (ring, entrances, sheen) sit behind \`prefers-reduced-motion\` guards.

**Structure, sharing, and the analytics hook**

The page is a single centred 400px column — the width bio pages settled on because they're consumed inside in-app browsers on phones — over an ambient background of two radial colour washes on deep slate. Every interactive element is semantic (\`<a>\` links with \`aria-label\`s on the icon-only socials), so the page is fully functional as static HTML: host it on GitHub Pages or Netlify for free, and it *is* your Linktree replacement with no subscription and full design control. The only JS included is the hook those services charge for: a delegated click listener with commented one-liners for gtag or a fetch beacon, logging which link was clicked — swap in your analytics and you have click-through stats too.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Make it yours',
          text: 'Replace the initials (or swap the avatar span for <img src="you.jpg" style="border-radius:50%;object-fit:cover">), name, tagline, and footer. Point each bio-link\'s href at your real destinations and edit titles/emojis. Fill the social row\'s hrefs — the four icons (X, Instagram, YouTube, email) cover most creators; copy a wrapper <a> and paste any SVG icon for more.',
        },
        {
          title: 'Choose the featured link',
          text: 'Move the featured class (and its subtitle line) to whichever card matters most right now — launches, latest video, active campaign. One featured card is the rule: the sheen and gradient lose all meaning when two cards carry them. When nothing is launching, remove the class entirely; an all-equal list reads more honest than a permanently "featured" newsletter.',
        },
        {
          title: 'Retheme in four values',
          text: 'The identity colours live in four spots: the avatar gradient, the ring conic-gradient, the featured card gradient/border, and the two body-background radial washes. Swap the indigo/violet/pink trio for your palette and everything else (slate cards, greys) is neutral. For light mode, invert the base (#f8fafc body, white cards with rgba(15,23,42,0.06) borders) — the structure is theme-agnostic.',
        },
        {
          title: 'Wire the click analytics',
          text: 'The delegated listener already fires per link with its title. Uncomment the gtag line if you run Google Analytics, or point the fetch at a tiny endpoint (a Cloudflare Worker writing to KV is the classic free stack) to own your stats. For UTM tracking instead, append ?utm_source=bio&utm_medium=link to each href and skip the JS entirely — the page then needs zero JavaScript.',
        },
        {
          title: 'Deploy it free',
          text: 'This is a single static page: export the HTML, drop it in a GitHub repo with Pages enabled (or Netlify/Vercel drag-and-drop), and put your custom domain on it. Add <meta> OG tags (title, description, og:image of your avatar) so the link unfurls nicely when shared, and a <title> — in-app browsers show it. Total cost: the domain.',
        },
        {
          title: 'Extend and compose',
          text: 'Natural additions from this library: an embedded [Newsletter Signup](/ui-snippets/newsletter-signup) card between links, the [Social Proof Popup](/ui-snippets/social-proof-popup) for live activity, a [QR Code Generator](/ui-snippets/qr-code-generator) card for offline-to-online, [Video Testimonial Card](/ui-snippets/video-testimonial-card) for coaches, and the [Noise Background](/ui-snippets/noise-background) grain layer over the ambient glow for extra texture. Click JSX to export a React version where links render from a data array.',
        },
      ],
    },
    features: [
      'Animated gradient avatar ring via the padding-box/border-box double-background technique — no SVG, seamless conic loop',
      'Glassy link cards: translucent slate, backdrop-blur, hover lift with indigo shadow, active press compression',
      'Pure-CSS staggered entrances: shared keyframe, backwards fill, nth-of-type delays stepping 70ms',
      'Featured link with gradient fill and a periodic sheen sweep (long-idle keyframe so it glints, not strobes)',
      'Arrow nudge on hover, emoji icon slots, optional subtitle line on the featured card',
      'Icon-only social row with aria-labels, hover lift, and inline SVG marks (X, Instagram, YouTube, email)',
      'Ambient two-wash radial background; fully functional as static HTML — JS is only the analytics hook',
      'All three animations behind prefers-reduced-motion; 400px column tuned for in-app mobile browsers',
    ],
    useCases: [
      {
        icon: 'WEB',
        title: 'Your actual Linktree replacement',
        desc: 'The direct use: personalise, deploy to GitHub Pages or Netlify free, put your domain on it, and paste the URL into every social bio. You get what the paid tiers of bio services sell — custom design, no branding badge, featured-link highlighting, click analytics via the included hook — with no subscription and no platform risk. The 400px column and semantic links are tuned for exactly where these pages are viewed: in-app browsers opened from Instagram and TikTok.',
      },
      {
        icon: 'DESIGN',
        title: 'Client work: bio pages as a productised service',
        desc: 'Freelancers sell custom bio pages to creators and local businesses precisely because the templated services all look alike. This is the starter you retheme per client in the four colour spots, swap fonts, and deploy in an hour — the conic ring, glass cards, and sheen read as bespoke against default Linktree. The data-array React export makes multi-client maintenance sane, and the analytics hook wires to whatever the client already uses.',
      },
      {
        icon: 'APP',
        title: 'Campaign and event hub pages',
        desc: 'The pattern generalises to any "one URL, several destinations" need: conference speaker pages (slides, repo, socials, calendar link), product-launch hubs (demo, docs, Discord, press kit), wedding or event pages (RSVP, registry, directions). The featured card carries the primary action, the sheen earns its attention for time-boxed campaigns, and the whole thing ships as one static file — no CMS for a page that changes twice a year.',
      },
      {
        icon: 'CSS',
        title: 'Learning the gradient-border ring technique',
        desc: 'The avatar ring demonstrates the canonical answer to "gradient border on a rounded element": two backgrounds — solid gradient clipped to padding-box over the gradient clipped to border-box — visible only through the transparent border, spinnable because conic gradients that close their colour loop rotate seamlessly. The same recipe powers gradient-bordered buttons and cards ([Gradient Border Card](/ui-snippets/gradient-border-card)) and the Instagram story ring everyone asks about; here it is in isolation with the rotation included.',
      },
      {
        icon: 'LEARN',
        title: 'Pure-CSS stagger and sheen patterns to reuse',
        desc: 'Two load-bearing micro-patterns ship in this page. The stagger — one keyframe, animation-fill-mode: backwards, per-item nth-of-type delays — is the zero-JS list entrance you can lift onto any card grid or menu (backwards being the piece most people miss: without it, delayed items flash visible before animating). The long-idle sheen — parking the stripe off-canvas for 60% of the cycle — is how you make periodic attention effects glint instead of strobe, applicable to badges, CTAs, and the [Shimmer Button](/ui-snippets/shimmer-button) family.',
      },
      {
        icon: 'FORM',
        title: 'The link-list pattern inside products',
        desc: 'Strip the profile header and the link-card anatomy (icon, title/subtitle, arrow, hover lift, featured variant) is a general navigation-list component: settings hubs, resource centres, help-topic indexes, onboarding "what next" screens. The featured treatment maps to "recommended next step", and the analytics hook to feature-discovery tracking. Same markup, product context — pair with the [Feature List](/ui-snippets/feature-list) and [Onboarding Checklist Widget](/ui-snippets/onboarding-checklist-widget).',
      },
      { icon: 'CODE', title: 'Related: Sticky Sidebar', desc: 'See the [Sticky Sidebar](/ui-snippets/sticky-sidebar/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the gradient avatar ring work, and why two backgrounds?',
        a: 'It exploits background-clip. The ring element has a 2px transparent border and two stacked backgrounds: the top layer is a "gradient" from the page colour to itself — effectively a solid fill — clipped to padding-box, so it covers everything inside the border; the bottom layer is the conic gradient clipped to border-box, covering the full element including the border area. Result: the conic gradient is visible only through the 2px transparent border strip — a gradient border that respects border-radius: 50%, which plain border-image cannot do (border-image ignores radius). The spin works because the conic gradient\'s colour stops start and end on the same indigo, so the seam at 0°/360° is invisible and a linear rotate loops seamlessly. Two practical notes: the inner solid layer must match the page background (change both together when retheming), and if you need the avatar image itself to sit flush against the ring, an alternative single-element version puts the conic gradient on the avatar\'s own border with the photo as a third background layer — the two-element version here is simpler to reason about and lets the ring spin independently of the content.',
      },
      {
        q: 'Why animation-fill-mode: backwards on the staggered entrances?',
        a: 'Because of what delayed elements show before their animation starts. The stagger gives card 5 a 0.33s delay — but by default, an element with a pending animation renders in its normal styled state during the delay, so all five cards would appear instantly and then card-by-card jump back to invisible and animate in: a visible flash of the end state that ruins the cascade. fill-mode: backwards makes each element adopt its animation\'s from-state (opacity 0, translateY 12px) for the duration of its delay, so cards are genuinely hidden until their turn arrives. The shorthand animation: link-in 0.5s backwards encodes it. The alternative approaches each cost more: setting initial opacity: 0 in the base styles works but leaves the page permanently blank if CSS animations are disabled or fail (the fill-mode version degrades to visible content); JS-driven staggering (IntersectionObserver + class toggling) is warranted only when items enter on scroll rather than on load. The 70ms step is the sweet spot for a five-item list — perceptible as a cascade, finished in under half a second.',
      },
      {
        q: 'What do I need for this to work as a real hosted bio page?',
        a: 'Four additions to the exported HTML, all in the head. A <title> ("Mia Jensen — links") since in-app browsers display it; Open Graph tags so the URL unfurls when shared — og:title, og:description, og:image (a square version of your avatar works; 1200×630 for the full card), and twitter:card summary; a viewport meta (width=device-width, initial-scale=1) which any export already includes; and a favicon. Then deploy: GitHub Pages (push, enable Pages), Netlify/Vercel (drag the folder in), or Cloudflare Pages all host static files free with HTTPS, and each supports custom domains — the domain is the only cost. Replace the onclick="return false" demo guards with real hrefs, and add rel="noopener" to external links along with target="_blank" if you want them opening outside the in-app browser (opinions differ: same-tab keeps the back-button flow Instagram users expect). For analytics without a backend, the UTM-parameter approach in the how-to needs nothing; for owned click counts, a Cloudflare Worker + KV endpoint receiving the fetch beacon is the standard free stack.',
      },
      {
        q: 'How would I build this in React with links as data, or style it with Tailwind?',
        a: 'React: the page becomes two small components over data — const LINKS = [{ emoji, title, sub?, href, featured? }] mapped to <BioLink> cards, and a profile object for the header; the stagger translates to style={{ animationDelay: i * 70 + "ms" }} on each card (nth-of-type can\'t see array order, so inline delays replace it), and the analytics hook becomes an onClick handler receiving the link object — which is also where a bio-page builder product would swap in editable state. Tailwind: cards are flex items-center gap-3 bg-slate-800/75 backdrop-blur-md border border-slate-700 rounded-2xl px-4 py-3.5 mb-3 transition hover:-translate-y-0.5 hover:scale-[1.015] hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.985]; the featured variant adds bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border-indigo-400/60 relative overflow-hidden with the sheen as a custom keyframe in the config (arbitrary keyframes don\'t inline); the ring needs its double-background as an arbitrary value or a small CSS snippet — [background:linear-gradient(#0f172a,#0f172a)padding-box,conic-gradient(#6366f1,#a855f7,#f472b6,#6366f1)border-box] border-2 border-transparent rounded-full animate-[spin_6s_linear_infinite] — and the entrance stagger uses animate-[link-in_0.5s_backwards] with inline delays as in React.',
      },
    ],
    aiPrompt: {
      paragraph: `A bio page is the rare snippet you'll actually deploy as-is, so point an AI assistant at the deployment seams first: paste this into Claude with your name, links, and colours and ask for the personalised version plus the head section a real hosted page needs — title, OG tags, favicon — and the two-minute GitHub Pages walkthrough; that conversation ends with a live URL. Then improve what the services can't: ask for a light/dark auto theme via prefers-color-scheme keeping the four identity colours, a scheduled featured link (JS that swaps the featured class based on date ranges, so launches promote themselves), and the Cloudflare Worker + KV click-counter endpoint for the analytics hook if you want owned stats. The two CSS techniques are worth interrogating separately — have it explain why the ring's inner gradient must match the page background and what breaks visually when it doesn't, and why removing the animation-fill-mode backwards from the entrance animation makes cards flash — both answers transfer to every gradient border and staggered list you'll build after this one.`,
      prompt: `Build a complete link-in-bio profile page in pure HTML and CSS (JavaScript only as an optional click-analytics hook) — a self-hostable Linktree replacement. No libraries.

Requirements:
- A centred ~400px column over a deep slate body with two soft radial colour washes (violet top-right, cyan bottom-left) as ambient glow.
- Profile header: an initials avatar inside an animated gradient ring built with the double-background technique — a solid padding-box layer over a conic-gradient border-box layer showing through a 2px transparent border, the conic gradient closing its colour loop so a 6s linear rotation is seamless (comment why both parts matter); then name, one-line tagline, and an icon-only social row (X, Instagram, YouTube, email as inline SVGs) with aria-labels and hover lift.
- Link cards as real anchors: emoji slot, bold title, right arrow that nudges 3px on hover; translucent slate background with backdrop-blur, hover lifting 2px with slight scale and an indigo-tinted shadow, :active compressing for press feedback.
- One FEATURED card variant with a subtitle line, gradient fill, stronger border, and a periodic sheen: a skewed white gradient stripe ::after sweeping across on a ~3.2s keyframe whose first 60% parks it off-canvas so it glints rather than strobes, clipped by overflow: hidden.
- Staggered pure-CSS entrances: one shared fade-and-rise keyframe applied with animation-fill-mode: backwards and per-card nth-of-type delays stepping ~70ms (comment why backwards prevents the pre-delay flash).
- Guard all three animations (ring, entrances, sheen) with prefers-reduced-motion, and end with a small muted footer line.
- Include a delegated click listener that logs each clicked link's title with commented one-line swaps for gtag and a fetch beacon — and comment that with UTM parameters on the hrefs instead, the page runs with zero JavaScript.`,
    },
  },
};

export default linkInBio;
