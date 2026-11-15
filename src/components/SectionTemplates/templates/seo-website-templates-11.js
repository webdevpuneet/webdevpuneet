/* Hand-written SEO content for the website templates (part 11: Developer Portfolio). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_11 = {
  developer: {
    about: `A developer portfolio has to answer three questions fast: who is this, what can they build, and how do I reach them. This template answers them in that order. The home page opens with a terminal window that types out who you are, with the headline, an availability badge, two buttons and social icons beside it, then a tech stack grid, a grid of project cards, a vertical experience timeline, an about section, kind words from colleagues and a contact form.

Three sections were made for this template. The Terminal Hero types your lines one at a time, with commands, output, success lines and comments in their own colours, and shows the finished terminal at once to visitors who prefer reduced motion. Project Cards show a screenshot, a year, a one-sentence description, technology tags and links to the live demo and the source code. The Vertical Timeline lists your experience and education from top to bottom, with a period, a title, a company, a description and tags for each entry.

As separate pages, the portfolio becomes easier to share: Projects lists every piece of work with a call to action, About holds your story, the timeline and a short section about your tools, and Contact pairs the form with straight answers about availability, pricing and how you work.

Messages from the contact form go to a form service, so the site is nothing but static files that GitHub Pages or Netlify can host for free. What you will not find is a blog engine, a CMS or analytics, and the screenshots are images you swap for your own. If you write articles, keep them on a platform you already use and link to them from here.

Your name and role are written as Person data, project screenshots carry descriptions, and each page has a single main heading, so a recruiter who searches your name finds a page that reads cleanly.`,
    checklist: [
      'A clear one-line statement of what you build and for whom, visible before any scrolling',
      'Four to six projects, each with a screenshot, the technologies used and links to the demo and the code',
      'Your recent experience in a scannable list, with results rather than duties',
      'A photo and a short, human story, so people know who they would be working with',
      'A contact form and an email address that work, plus your GitHub and LinkedIn',
      'Fast loading and an accessible layout, because visitors judge those as well as the design',
    ],
    faqs: [
      { q: 'Is this different from the Personal Portfolio template?', a: 'Yes. The Personal Portfolio is a warm, light freelancer page. This one is a dark, code-forward developer portfolio with a typing terminal hero, a tech stack grid, project cards with tags and an experience timeline.' },
      { q: 'Does the terminal animation work for everyone?', a: 'The lines type themselves out, but visitors who prefer reduced motion see the finished terminal at once. The text is real HTML, so search engines and screen readers can read it.' },
      { q: 'How do I add my own projects?', a: 'Edit the Project Cards list: a screenshot, a name, a description, tags typed one per line and links to the demo and the source. Leave a link empty to hide it, which suits private client work.' },
      { q: 'Can I send recruiters straight to my projects?', a: 'Yes. The multi-page version gives Projects, About and Contact their own pages beside Home, so you can share projects.html directly. The navigation and footer are shared.' },
      { q: 'Can I use the example projects?', a: 'No. Arjun Mehta, his employers, the reviews and the project names are invented, and the screenshots show other templates from this site. Put your own work in before anyone sees the page.' },
    ],
  },
};
