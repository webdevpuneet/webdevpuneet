/* Website templates, part 11: the Developer Portfolio. Same shape as starters-6 to 10.js: home `sections`, hand-written `pages` for
   the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in starters.js. SEO text:
   seo-website-templates-11.js.

   A dark, code-forward page that looks nothing like the warm freelancer "portfolio" template. It uses three sections made for it:
   Terminal Hero (terminal-hero.js), Project Cards (project-cards.js) and Vertical Timeline (timeline-vertical.js), plus a tech
   stack grid, an About story, reviews and a contact form. Project screenshots are the website-template thumbnails
   (public/images/website-templates/thumb); photos are dev-*.jpg in public/images/section-templates (royalty-free Pexels photos).
   Every internal link is a "#page" token, resolved by fixSiteLinks() like the other starters. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const SHOT = id => `https://webdevpuneet.com/images/website-templates/thumb/${id}.jpg`;
const DEMO = id => `https://webdevpuneet.com/demos/website-templates/${id}/one-page/`;
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));

const PROJECTS = [
  { image: SHOT('saas'), imageAlt: 'A SaaS analytics landing page with a dashboard preview', year: '2026', title: 'Orbit Analytics', text: 'A real-time analytics dashboard for product teams, with shareable reports, alerts and CSV export.', tags: 'React\nTypeScript\nPostgreSQL\nAWS', demoLabel: 'Live demo', demoUrl: DEMO('saas'), codeLabel: 'Source', codeUrl: 'https://github.com/' },
  { image: SHOT('cafe'), imageAlt: 'A coffee shop website with an order online button', year: '2026', title: 'Bean & Bloom Ordering', text: 'A café website with a working cart, online ordering for pickup and a loyalty stamp card kept in the browser.', tags: 'JavaScript\nlocalStorage\nAccessibility', demoLabel: 'Live demo', demoUrl: DEMO('cafe'), codeLabel: 'Source', codeUrl: 'https://github.com/' },
  { image: SHOT('fashion'), imageAlt: 'A fashion boutique website with a bold headline', year: '2026', title: 'Ora Studio Storefront', text: 'A clothing store with filters, a shop-the-look lookbook and a checkout that sends orders to WhatsApp.', tags: 'Next.js\nTailwind\nStripe', demoLabel: 'Live demo', demoUrl: DEMO('fashion'), codeLabel: 'Source', codeUrl: 'https://github.com/' },
  { image: SHOT('vet'), imageAlt: 'A veterinary clinic website with a book a visit button', year: '2025', title: 'Willow & Paw Booking', text: 'A clinic website with a filterable price list, an appointment request form and live opening hours.', tags: 'Node.js\nPostgreSQL\nForms', demoLabel: 'Live demo', demoUrl: DEMO('vet'), codeLabel: 'Source', codeUrl: 'https://github.com/' },
  { image: SHOT('yoga'), imageAlt: 'A yoga studio website with a class timetable', year: '2025', title: 'Stillwater Timetable', text: 'A studio site with a weekly class timetable, day tabs and filters, built with no framework at all.', tags: 'Vanilla JS\nCSS\nA11y', demoLabel: 'Live demo', demoUrl: DEMO('yoga'), codeLabel: 'Source', codeUrl: 'https://github.com/' },
  { image: SHOT('online-store'), imageAlt: 'An online store with headphones and home products', year: '2024', title: 'Sona Home Shop', text: 'A complete small shop with search, a product page, cart drawer and order history for a design brand.', tags: 'React\nNode.js\nRedis', demoLabel: 'Live demo', demoUrl: DEMO('online-store'), codeLabel: 'Source', codeUrl: 'https://github.com/' },
];

const NAV = ['navbar-simple', {
  fields: { logoText: 'arjun.dev', logoIcon: 'code', cta: 'Hire me', ctaUrl: '#contact', login: '' },
  lists: { links: links(['Projects', '#projects'], ['Experience', '#experience'], ['About', '#about'], ['Contact', '#contact']) },
}];

const HERO = ['terminal-hero', {
  anchor: 'top',
  fields: {
    badge: 'Available for new projects from January',
    headline: 'I build fast, *reliable* web apps',
    lead: 'Full-stack developer with eight years of experience in React, Node and cloud infrastructure. I turn complicated ideas into products people enjoy using.',
    cta1: 'See my projects', cta1Url: '#projects', cta2: 'Get in touch', cta2Url: '#contact',
    windowTitle: 'arjun@dev: ~/portfolio', prompt: '$', speed: 'normal', termLabel: 'A terminal window showing a few commands that describe Arjun Mehta, a full-stack developer',
  },
  lists: {
    lines: [
      { kind: 'cmd', text: 'whoami' },
      { kind: 'out', text: 'Arjun Mehta, full-stack developer' },
      { kind: 'cmd', text: 'cat stack.txt' },
      { kind: 'out', text: 'TypeScript · React · Next.js · Node · PostgreSQL · AWS' },
      { kind: 'cmd', text: 'git log --oneline -3' },
      { kind: 'dim', text: 'a1f3c9e Ship the checkout redesign' },
      { kind: 'dim', text: '7b20de4 Cut API latency by 40%' },
      { kind: 'dim', text: 'c55a018 Add dark mode everywhere' },
      { kind: 'cmd', text: 'npm run hire-me' },
      { kind: 'ok', text: '✓ Ready for your next project' },
    ],
    socials: [
      { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
      { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
      { icon: 'twitter', label: 'X (Twitter)', url: 'https://x.com/' },
    ],
  },
}];

const STACK = ['features-icon-grid', {
  anchor: 'stack',
  fields: { eyebrow: 'What I work with', heading: 'A stack I know *well*', lead: 'Tools I use every week, chosen for speed, stability and a good developer experience.' },
  lists: { features: [
    { icon: 'monitor', title: 'Front end', text: 'React, Next.js, TypeScript, Tailwind and accessible, well-tested components.', link: '', url: '#' },
    { icon: 'database', title: 'Back end', text: 'Node.js, Express, PostgreSQL and Redis, with clean APIs and sensible schemas.', link: '', url: '#' },
    { icon: 'cloud', title: 'Cloud and DevOps', text: 'AWS, Docker and CI/CD pipelines that deploy small changes safely and often.', link: '', url: '#' },
    { icon: 'gauge', title: 'Performance', text: 'Core Web Vitals, profiling and caching. I measure first, then make it faster.', link: '', url: '#' },
    { icon: 'shield-check', title: 'Quality', text: 'Unit and end-to-end tests with Vitest and Cypress, plus code reviews that teach.', link: '', url: '#' },
    { icon: 'palette', title: 'Design systems', text: 'Storybook libraries and tokens that keep a product consistent as it grows.', link: '', url: '#' },
  ] },
}];

const PROJECTS_SECTION = (anchor, fields = {}) => ['project-cards', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Selected work', heading: 'Projects I am *proud of*', lead: 'A mix of client work and side projects. Each one has a live demo, and most have the code on GitHub.', ...fields },
  lists: { projects: PROJECTS },
}];

const TIMELINE = (anchor) => ['timeline-vertical', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Experience', heading: 'Where I have *worked*', lead: 'Eight years of building products, from early-stage startups to teams of hundreds.' },
  lists: { entries: [
    { period: '2023 – now', title: 'Senior full-stack developer', org: 'Northwind Labs', text: 'Lead the checkout team. Rebuilt the payment flow in React and Node, cutting drop-off by 18% and API latency by 40%.', tags: 'React\nNode.js\nAWS' },
    { period: '2020 – 2023', title: 'Full-stack developer', org: 'Brightside', text: 'Built the customer dashboard and the public API for a SaaS used by 30,000 teams. Introduced end-to-end testing.', tags: 'TypeScript\nPostgreSQL\nCypress' },
    { period: '2017 – 2020', title: 'Front-end developer', org: 'Studio Kite', text: 'Delivered 40+ websites and web apps for clients, with a focus on performance and accessibility.', tags: 'JavaScript\nSass\nWordPress' },
    { period: '2015 – 2017', title: 'BSc Computer Science', org: 'University of Bristol', text: 'First-class honours. Final project: a collaborative code editor that worked offline.', tags: '' },
  ] },
}];

const ABOUT = (anchor) => ['about-story', {
  ...(anchor && { anchor }),
  fields: {
    eyebrow: 'About me', heading: 'Developer, *teacher* and tinkerer',
    story: 'I am Arjun, a full-stack developer based in Berlin. I like small teams, clear writing and software that is still pleasant to maintain in five years.',
    story2: 'Outside work I mentor junior developers, maintain a few open-source libraries and cycle too far on weekends. If you have a product that needs building, I would love to hear about it.',
    image: IMG('dev-portrait.jpg'), imageAlt: 'Arjun Mehta, a developer with glasses and curly hair, smiling at his laptop',
    badgeNumber: '8', badgeLabel: 'years of shipping',
    founderPhoto: '', founderPhotoAlt: '', founder: '', founderRole: '', quote: '',
    primaryLabel: 'Get in touch', primaryUrl: '#contact', secondaryLabel: 'See my work', secondaryUrl: '#projects',
    orgName: 'Arjun Mehta', foundedYear: '',
  },
  toggles: { showFounder: false },
  lists: {
    facts: [{ number: '60+', label: 'projects shipped' }, { number: '12k', label: 'GitHub stars' }, { number: '40', label: 'developers mentored' }],
    values: [
      { icon: 'rocket', title: 'Ship small, often', text: 'Small changes are easier to review, safer to release and quicker to learn from.' },
      { icon: 'code', title: 'Write it down', text: 'Clear docs and honest commit messages save the next developer, who is often me.' },
      { icon: 'shield-check', title: 'Accessible by default', text: 'If it only works with a mouse and good eyesight, it is not finished.' },
    ],
  },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Kind words', heading: 'What people *say*', lead: '' },
  lists: { quotes: [
    { quote: 'Arjun rebuilt our checkout in six weeks and conversion went up 18%. He explained every decision and left the codebase better than he found it.', name: 'Sophie L.', role: 'Head of Product, Northwind Labs', avatar: av(2) },
    { quote: 'The calmest developer I have worked with. He turns vague requests into clear plans and ships when he says he will.', name: 'Tom B.', role: 'CTO, Brightside', avatar: av(3) },
    { quote: 'He mentored me through my first year as a developer. I would not be where I am without his code reviews.', name: 'Priya N.', role: 'Junior developer', avatar: av(5) },
  ] },
}];

const CONTACT = (anchor) => ['contact-split-form', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Contact', heading: 'Let’s build *something good*', lead: 'Tell me about your project, your timeline and your budget. I reply within one working day.' },
  lists: { methods: [
    { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
    { icon: 'github', label: 'GitHub', value: 'github.com/arjun', url: 'https://github.com/' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/arjun', url: 'https://www.linkedin.com/' },
  ] },
}];

const FOOTER = ['footer-minimal', {
  fields: { logoText: 'arjun.dev', logoIcon: 'code', links: 'Projects | #projects\nExperience | #experience\nAbout | #about\nContact | #contact', copyright: '© 2026 Arjun Mehta. Built with care.' },
  lists: { socials: [
    { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
    { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { icon: 'twitter', label: 'X (Twitter)', url: 'https://x.com/' },
  ] },
}];

export const DEVELOPER_WEBSITE_TEMPLATES = [
  {
    id: 'developer', name: 'Developer Portfolio Website (Dark)', industry: 'Software',
    blurb: 'A dark developer portfolio: typing terminal hero, tech stack, project cards with tags and links, experience timeline, about, reviews and contact form.',
    theme: { brand: '#5eead4', brandText: '#06201c', bg: '#0a0f1c', surface: '#131b2e', text: '#e8edf7', muted: '#97a6c0', radius: '14', maxWidth: '1200' }, fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Developer Portfolio Website Template — Dark Free HTML',
    seoDescription: 'Free dark developer portfolio website template: typing terminal hero, tech stack, project cards with tags, experience timeline and contact form. Export HTML.',
    keywords: ['developer portfolio website template', 'software engineer portfolio template', 'dark portfolio website template', 'programmer portfolio html template', 'terminal hero portfolio', 'portfolio website for developers'],
    intro: 'A dark, code-forward portfolio for software developers and engineers. A terminal window types out who you are while the headline and buttons sit beside it, a tech stack grid says what you work with, project cards show screenshots with technology tags and links to the demo and the code, and a vertical timeline walks through your experience. An about section, kind words from colleagues and a contact form finish the page.',
    bestFor: ['Software developers and engineers', 'Freelance programmers and consultants', 'Bootcamp graduates and job seekers'],
    sections: [NAV, HERO, STACK, PROJECTS_SECTION('projects'), TIMELINE('experience'), ABOUT('about'), REVIEWS, CONTACT('contact'), FOOTER],
    multiLinks: { '#experience': 'about.html#experience', '#stack': 'index.html#stack' },
    homeTitle: 'Arjun Mehta: Full-Stack Developer in Berlin, React and Node',
    homeDescription: 'Arjun Mehta is a full-stack developer in Berlin building fast, reliable web apps with React, Node and AWS. See selected projects and get in touch about yours.',
    pages: [
      {
        name: 'Projects', slug: 'projects',
        title: 'Projects: Web Apps, Shops and Open Source | Arjun Mehta',
        description: 'Selected projects by full-stack developer Arjun Mehta: analytics dashboards, online shops, booking sites and libraries, each with a live demo and its code.',
        sections: [
          PROJECTS_SECTION(undefined, { heading: 'Things I have *built*', lead: 'Client work and side projects, with the technologies used and links to the demo and the source.' }),
          ['cta-gradient-banner', { fields: { heading: 'Have a project *in mind?*', lead: 'I take on a small number of projects each year. Tell me what you are building and when you need it.', cta1: 'Start a conversation', cta1Url: '#contact', cta2: '', cta2Url: '', note: 'Replies within one working day.' } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Arjun: Developer, Mentor and Open-Source Fan',
        description: 'Learn about Arjun Mehta, a Berlin full-stack developer with eight years of experience, from startups to large teams, and read the story of the work so far.',
        sections: [
          ABOUT(),
          TIMELINE('experience'),
          ['features-split-image', {
            fields: {
              eyebrow: 'My setup', heading: 'Tools I use *every day*',
              lead: 'A quiet desk, a fast machine and a short list of tools I trust. I keep my setup simple so the work stays the focus.',
              cta: 'Say hello', ctaUrl: '#contact',
              image: IMG('dev-code.jpg'), imageAlt: 'Colourful code on a dark monitor beside a backlit keyboard',
            },
            lists: { points: [
              { icon: 'code', title: 'Editor and terminal', text: 'VS Code with a minimal setup, and a terminal for almost everything else.' },
              { icon: 'zap', title: 'Fast feedback', text: 'Hot reload, instant tests and small pull requests that merge the same day.' },
              { icon: 'layers', title: 'Boring technology', text: 'Mature tools I can debug at 2 am, chosen on purpose and documented.' },
            ] },
          }],
        ],
      },
      {
        name: 'Contact', slug: 'contact',
        title: 'Contact Arjun: Hire a Full-Stack Developer in Berlin',
        description: 'Get in touch with Arjun Mehta about a web app, a rebuild or a contract. Share your timeline and budget and you will get a reply within one working day.',
        sections: [
          CONTACT(),
          ['faq-accordion', { fields: { eyebrow: 'Working together', heading: 'Before you *get in touch*', lead: 'A few answers to save us both some time.', contactText: 'Another question?', contactLink: 'Email me', contactUrl: 'mailto:hello@webdevpuneet.com' }, toggles: {}, lists: { faqs: [
            { q: 'What kind of projects do you take on?', a: 'Web apps, shops, dashboards and APIs, from a first prototype to rebuilding something that has outgrown its code. I work best with teams of two to twenty people.' },
            { q: 'Are you available for new work?', a: 'I have space from January. Tell me what you are building and when you need it, and I will say honestly whether it fits.' },
            { q: 'How do you work and charge?', a: 'Fixed-scope projects get a fixed price after a short discovery call. Longer work is billed by the week, with a clear plan and a demo at the end of each one.' },
            { q: 'Do you work with teams in other time zones?', a: 'Yes. I am based in Berlin and overlap comfortably with Europe and the Americas, and I write things down so asynchronous work stays smooth.' },
            { q: 'Can you join an existing codebase?', a: 'Often, yes. I start by reading the code, running the tests and writing down what I find, so we agree on a plan before anything changes.' },
          ] } }],
        ],
      },
    ],
  },
];
