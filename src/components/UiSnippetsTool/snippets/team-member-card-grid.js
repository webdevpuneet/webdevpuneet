const teamMemberCardGrid = {
  id: 'team-member-card-grid',
  title: 'Team Member Card Grid',
  category: 'cards',
  html: `<div class="team-grid">
  <div class="member-card">
    <div class="avatar" style="background: #6366f1;">MC</div>
    <h3>Maria Chen</h3>
    <p class="role">Co-Founder &amp; CEO</p>
    <div class="socials">
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
      <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4 4 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg></a>
    </div>
  </div>
  <div class="member-card">
    <div class="avatar" style="background: #f97316;">JO</div>
    <h3>James Okafor</h3>
    <p class="role">Head of Product Design</p>
    <div class="socials">
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
      <a href="#" aria-label="Dribbble"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.5 4.6a8.4 8.4 0 0 1 1.9 5.2c-.3-.06-3-.6-5.7-.26-.06-.14-.11-.29-.18-.44-.17-.4-.36-.8-.55-1.18 3-1.23 4.37-2.98 4.5-3.32zM12 3.6c1.9 0 3.63.7 4.96 1.85-.1.15-1.28 1.75-4.17 2.8-1.3-2.4-2.75-4.36-2.97-4.66.72-.13 1.44-.2 2.18-.2v.01zm-3.36.62c.2.28 1.63 2.24 2.94 4.6-3.7 1-6.97.98-7.3.98A8.44 8.44 0 0 1 8.64 4.22zM3.6 12v-.28c.32 0 4.13.06 8.07-1.12.23.43.44.87.64 1.3-.1.03-.2.06-.3.1-4.08 1.32-6.25 4.93-6.44 5.24A8.4 8.4 0 0 1 3.6 12zm8.4 8.4a8.37 8.37 0 0 1-5.02-1.67c.15-.3 1.83-3.55 6.3-5.1l.1-.03c1.13 3.1 1.6 5.7 1.72 6.44a8.37 8.37 0 0 1-3.1.36zm4.9-1.14c-.08-.5-.5-2.9-1.55-5.96 2.5-.4 4.7.26 4.98.35a8.44 8.44 0 0 1-3.43 5.6z"/></svg></a>
    </div>
  </div>
  <div class="member-card">
    <div class="avatar" style="background: #10b981;">PN</div>
    <h3>Priya Nair</h3>
    <p class="role">Growth Marketing Lead</p>
    <div class="socials">
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
      <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4 4 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg></a>
    </div>
  </div>
  <div class="member-card">
    <div class="avatar" style="background: #ec4899;">TF</div>
    <h3>Tom Fischer</h3>
    <p class="role">Senior Backend Engineer</p>
    <div class="socials">
      <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg></a>
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; margin: 0; display: flex; align-items: center; flex-direction: column; gap: 20px; }

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.member-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 26px 20px;
  text-align: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.member-card h3 { font-size: 15px; color: #1e293b; margin: 0 0 4px; }
.role { font-size: 12.5px; color: #64748b; margin: 0 0 14px; }

.socials {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.socials a {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}
.socials a:hover { background: #6366f1; color: #fff; }`,
  js: `// This grid is fully static — no JavaScript required. If avatar initials
// or social links come from a CMS or API, generate the same markup
// structure dynamically instead of hardcoding it, for example:
//
// function renderMember(m) {
//   return \`<div class="member-card">
//     <div class="avatar" style="background: \${m.color}">\${m.initials}</div>
//     <h3>\${m.name}</h3>
//     <p class="role">\${m.role}</p>
//   </div>\`;
// }`,

  seo: {
    title: 'Team Member Card Grid — Free HTML CSS Responsive About Page Snippet',
    description: 'A responsive grid of team member cards with colored initials avatars, name, role, and social icon row — pure HTML and CSS, no image assets needed.',
    about: {
      title: 'Team Member Card Grid — HTML & CSS About Page Snippet',
      description: `Every "About" or "Team" page needs a way to show who's behind the company, but real headshot photography isn't always available at build time — especially for placeholders, prototypes, or early-stage products. A colored circular avatar with the person's initials is a clean, widely-used substitute that requires zero image assets.

This snippet builds a fully responsive team grid in **plain HTML and CSS**, with no JavaScript needed for the static version.

**How the initials avatar works**

Each \`.avatar\` div is just a fixed-size circle (\`border-radius: 50%\`) with flexbox centering its text content — the person's two initials, set directly in the HTML. The background color is set inline per card via \`style="background: #6366f1"\` (or any hex value), giving each team member a distinct, recognizable color without needing a photo. Swapping in a real \`<img>\` later is a drop-in replacement: just replace the avatar div's content and background with an image tag sized to the same 64px circle.

**How the responsive grid works**

The grid container uses \`grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))\`. \`auto-fit\` tells the grid to fit as many 180px-or-wider columns as will comfortably fit in the available width, and \`1fr\` lets those columns stretch to fill any remaining space evenly. This single line handles every screen size — four columns on a wide desktop, two on a tablet, one on a narrow phone — with no media queries needed at all.

**The hover lift effect**

Each card lifts slightly (\`translateY(-4px)\`) and gains a deeper shadow on \`:hover\`, a small bit of tactile feedback that also subtly implies the card is interactive (useful if you later make the card link to a full bio page).

**The social icon row**

Each card ends with a row of small circular icon links using inline SVG logos (LinkedIn, Twitter, GitHub, Dribbble) — no icon font or external request. Hovering an icon fills its circle with the brand accent color, and every link carries an \`aria-label\` describing which platform it goes to, since the icon alone isn't machine-readable text.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Team Member Card Grid" in the sidebar Library tab to see four team cards laid out in a responsive grid.' },
        { title: 'Resize the preview', text: 'Switch between Desktop, Tablet, and Mobile device previews to see the grid reflow from four columns down to one with no extra CSS.' },
        { title: 'Add a team member', text: 'In the HTML panel, copy an existing .member-card block, update the initials, name, role, and background color, and add or remove social links.' },
        { title: 'Swap in real photos', text: 'Replace an .avatar div\'s text content and background with an <img> tag sized to fill the same 64px circle for a real headshot.' },
        { title: 'Adjust the grid density', text: 'In the CSS panel, change the minmax(180px, 1fr) value to control the minimum card width before the grid wraps to fewer columns.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Colored initials avatars need zero image assets — perfect for prototypes or placeholder content',
      'Responsive grid via auto-fit and minmax handles any screen size with no media queries',
      'Drop-in upgrade path from initials avatar to a real photo with no layout changes',
      'Inline SVG social icons for LinkedIn, Twitter, GitHub, and Dribbble — no icon font needed',
      'Hover lift and shadow on each card adds tactile, interactive-feeling polish',
      'aria-label on every icon-only social link keeps them accessible to screen readers',
      'Each card\'s accent color is set independently, giving the grid visual variety',
      'Works with any number of team members — the grid reflows automatically',
      'Easy to template from a CMS or API by generating the same markup structure per member',
      'No framework, no avatar/image library, no build step required',
    ],
    useCases: [
      { icon: 'TEAM', title: 'About and team pages', desc: 'Showcase your team on a company website without needing professional headshots ready at launch time.' },
      { icon: 'LEARN', title: 'Learn auto-fit responsive grids', desc: 'Study how repeat(auto-fit, minmax()) creates a fully responsive card grid without writing a single media query.' },
      { icon: 'FLOW', title: 'Prototype a hiring or careers page', desc: 'Drop this into a careers page prototype to represent hiring managers or team leads before final photography is available.' },
      { icon: 'DESIGN', title: 'Match your brand color palette', desc: 'Assign each avatar a color from your brand palette to keep the grid cohesive while still visually distinguishing each person.' },
      { icon: 'ACCESS', title: 'Keep social links screen-reader friendly', desc: 'The aria-label pattern on each icon-only link is a good reference for any other icon-based navigation elsewhere on your site.' },
      { icon: 'CODE', title: 'Generate cards from a CMS or API', desc: 'Template the same card markup from a headless CMS\'s team collection or a JSON API response instead of hardcoding each member.' },
    ],
    faqs: [
      { q: 'How are the colored avatars generated without an image?', a: 'Each avatar is a plain div styled as a circle with flexbox centering, displaying the person\'s initials as text, with a background color set per card. No image file, canvas, or generation library is involved.' },
      { q: 'How does the grid become responsive without media queries?', a: 'The grid-template-columns value is repeat(auto-fit, minmax(180px, 1fr)) — this tells the browser to fit as many columns of at least 180px as the available width allows, stretching them evenly to fill any leftover space, automatically producing fewer columns on narrower screens.' },
      { q: 'How do I replace an initials avatar with a real photo?', a: 'Replace the avatar div\'s text content and remove its background color, then add an img tag inside it sized to fill the same width and height (64px by default) with object-fit: cover and the same border-radius: 50% to keep it circular.' },
      { q: 'Can I add more social platforms per person?', a: 'Yes. Add another anchor tag inside the .socials div with its own inline SVG icon and a descriptive aria-label — the flex layout accommodates any number of icons per card.' },
      { q: 'How do I control how many columns appear on a wide screen?', a: 'Adjust the minmax(180px, 1fr) minimum width value — a larger minimum (e.g. 220px) results in fewer, wider columns fitting per row; a smaller minimum allows more columns to fit.' },
      { q: 'Is this grid accessible?', a: 'The structure uses semantic headings for names and paragraph text for roles, and every icon-only social link has an aria-label describing its destination platform, so screen readers announce meaningful information rather than just "link."' },
      { q: 'Can I make the whole card link to a full team member bio page?', a: 'Yes. Wrap the card\'s content in an anchor tag (keeping the nested social links as separate, stoppable click targets using event.stopPropagation() in JavaScript if needed) or make the name itself a link to the bio page.' },
      { q: 'How do I generate this grid from a CMS or database instead of hardcoding it?', a: 'Write a small template function that takes a member object (name, role, initials, color, social links) and returns the same card markup structure, then map it over your CMS collection or API response to render the full grid dynamically.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML and CSS to an AI coding assistant like Claude and ask it to explain exactly how repeat(auto-fit, minmax(180px, 1fr)) decides how many columns to render at a given viewport width, and how that differs from the similar-looking auto-fill keyword, since the choice between the two matters once you have fewer team members than would fill a row. It's also worth asking the assistant to help you template this card structure from your actual data source — describe your CMS schema or API response shape for team members and ask it to generate the JavaScript template function that maps your real data onto this exact markup, including a sensible way to pick each avatar's background color deterministically from the person's name.`,
      prompt: `Build a responsive grid of team member cards in plain HTML and CSS — no JavaScript required for the static version, no external avatar image service.

Requirements:
- A CSS grid container using repeat(auto-fit, minmax(<min-width>, 1fr)) for grid-template-columns so the layout reflows from multiple columns on desktop down to a single column on mobile with no media queries at all.
- Each card contains a circular colored avatar showing the person's initials as text (no image file), a name, a role/title, and a row of small circular social icon links using inline SVG logos (at least two different platforms across the set of cards).
- Each avatar's background color must be set independently per card so the grid has visual variety even though every card shares the same layout structure.
- Every icon-only social link must have a descriptive aria-label since the SVG icon alone conveys no accessible text.
- Add a hover state on each card that lifts it slightly and deepens its shadow, to suggest the card could be interactive (e.g. link to a full bio).
- The markup structure for one card must be simple and repeatable enough that it could be trivially generated from a CMS collection or API response by a small template function.`,
    },
  },
};

export default teamMemberCardGrid;
