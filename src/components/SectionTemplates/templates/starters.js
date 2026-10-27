/* Website templates: complete pages for the Website Builder, each a stack of sections with
   its own theme, font pair and real content for its industry. Every template also has an
   SEO landing page at /website-builder/templates/<id>/ (title 50-60, description 150-160).

   sections: [templateId, { fields, lists, toggles }]: overrides on top of the section's
   default state. A list given here replaces that list's default items. */
import { IMG } from './meta.js';
import { MORE_WEBSITE_TEMPLATES } from './starters-2.js';
import { EVEN_MORE_WEBSITE_TEMPLATES } from './starters-3.js';
import { MUSIC_WEBSITE_TEMPLATES } from './starters-4.js';
import { applyExtras } from './starters-extras.js';

const av = n => IMG(`avatar-${n}.jpg`);
const cov = n => IMG(`blog-${n}.jpg`);
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));
const nav = (logoText, logoIcon, cta, list, extra = {}) => ({ fields: { logoText, logoIcon, cta, ctaUrl: '#contact', ...extra }, lists: { links: list } });

/* Oldest first: add new templates at the END of this list. The /website-builder/ gallery shows
   the list reversed, so the newest templates come first. */
const BASE_TEMPLATES = [
  /* ── Software & startups ───────────────────────────────────────────────── */
  {
    id: 'saas', name: 'SaaS Landing Page', industry: 'Software',
    blurb: 'Navbar, split hero, logos, features, testimonials, pricing, FAQ, CTA and footer.',
    preset: 'indigo', fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'SaaS Landing Page Template — Free HTML Website Template',
    seoDescription: 'Free SaaS landing page template with a split hero, logos, features, testimonials, pricing toggle, FAQ and CTA. Customize it in the builder and export the HTML.',
    keywords: ['saas landing page template', 'saas website template', 'startup landing page html', 'software website template'],
    intro: 'Everything a software product needs on one page: a clear promise above the fold, proof from customers, the features that matter, transparent pricing with a monthly/yearly switch, answers to common questions and a final call to action.',
    bestFor: ['B2B and B2C software products', 'Startups launching their first site', 'Product pages for new features'],
    sections: [['navbar-simple'], ['saas-split-hero'], ['logo-cloud'], ['features-icon-grid'], ['features-alternating'], ['testimonials-grid'], ['pricing-three-tier'], ['faq-accordion'], ['cta-gradient-banner'], ['footer-columns']],
    // Multi-page version: where the home page's links should point instead
    multiLinks: { '/features/': 'index.html#features', '/pricing/': 'pricing.html', '/customers/': 'index.html#customers', '/about/': 'about.html', '/blog/': 'blog.html', '/contact/': 'contact.html', '/careers/': 'about.html' },
    homeTitle: 'Acme: Roadmaps, Tasks and Reports in One Calm Workspace',
    homeDescription: 'Acme brings your roadmap, tasks and reports into one calm workspace. See the features, read what customers say and start your free 14-day trial today.',
    pages: [
      {
        name: 'Pricing', slug: 'pricing',
        title: 'Acme Pricing: Free Starter, Pro and Business Plans',
        description: 'Acme pricing: a free Starter plan for small teams, Pro and Business plans with monthly or yearly billing, and clear answers to billing and trial questions.',
        sections: [
          ['pricing-three-tier'],
          ['logo-cloud'],
          ['faq-accordion', { fields: { contactUrl: 'contact.html' } }],
          ['cta-strip', { fields: { cta1Url: 'contact.html', cta2Url: 'contact.html' } }],
        ],
      },
      {
        name: 'Blog', slug: 'blog',
        title: 'The Acme Blog: Product Updates, Guides and Stories',
        description: 'The Acme blog: product updates, practical guides on planning and shipping work, and stories from teams who run their whole roadmap in one calm workspace.',
        sections: [['blog-featured'], ['blog-cards', { fields: { eyebrow: 'Latest', heading: 'More from *the blog*', allLink: '' } }], ['cta-newsletter']],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Acme: Meet the Team Behind One Calm Workspace',
        description: 'About Acme: why we built one calm workspace for roadmaps, tasks and reports, the team behind it, our numbers so far and the open roles we are hiring for.',
        sections: [
          ['stats-counters', { fields: { eyebrow: 'About Acme', heading: 'Built for *calmer teams*', lead: 'We started Acme in 2021 because planning tools had become the busiest part of everyone’s day.' } }],
          ['team-grid'],
          ['team-hiring', { fields: { ctaUrl: 'contact.html' } }],
        ],
      },
      {
        name: 'Contact', slug: 'contact',
        title: 'Contact Acme: Sales, Support and Free Product Demos',
        description: 'Contact Acme: talk to sales about plans and security, get help from our support team, book a product demo or send a message. We reply within one working day.',
        sections: [['contact-cards'], ['contact-split-form', { fields: { eyebrow: 'Contact', heading: 'Send us *a message*', lead: 'Questions about Acme, a demo for your team or feedback on the product. We reply within one working day.' }, lists: { methods: [
          { icon: 'mail', label: 'Email us', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
          { icon: 'map-pin', label: 'Office', value: 'Remote-first, HQ in Berlin', url: '' },
        ] } }]],
      },
    ],
  },
  {
    id: 'app', name: 'Mobile App Landing Page', industry: 'Software',
    blurb: 'App hero with store buttons, features with phone, how it works, reviews, download CTA and FAQ.',
    preset: 'ocean', fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Mobile App Landing Page Template — Free HTML Template',
    seoDescription: 'Free mobile app landing page template: App Store and Google Play hero, features, how it works, scrolling reviews, download CTA and FAQ. Export clean HTML.',
    keywords: ['app landing page template', 'mobile app website template', 'app download page html', 'ios android app landing page'],
    intro: 'A dark, modern page that sells an app in a few scrolls: phone mockup and store buttons up top, the features people care about, three simple steps to get started, a wall of moving reviews and a download prompt at the end.',
    bestFor: ['iOS and Android apps', 'Fintech, health and productivity apps', 'App launches and pre-registration'],
    sections: [['navbar-simple', nav('Pocketly', 'smartphone', 'Get the app', links(['Features', '#features'], ['How it works', '#how-it-works'], ['Reviews', '#customers'], ['FAQ', '#faq']), { ctaUrl: '#get-started' })], ['app-product-hero'], ['features-split-image', { fields: { eyebrow: 'Smart budgets', heading: 'See where your money *really goes*', lead: 'Pocketly sorts every payment for you and shows exactly what you can still spend this month.', cta: 'Download free' } }], ['features-steps', { fields: { heading: 'Set up in *two minutes*', lead: 'Connect your bank, set your goals and let Pocketly do the rest.' } }], ['testimonials-marquee'], ['cta-split-image'], ['faq-split'], ['footer-minimal', { fields: { logoText: 'Pocketly', links: 'Features | #features\nHow it works | #how-it-works\nReviews | #customers\nFAQ | #faq', logoIcon: 'smartphone', copyright: '© 2026 Pocketly Ltd.' } }]],
  },
  {
    id: 'launch', name: 'Startup Launch & Waitlist', industry: 'Software',
    blurb: 'Announcement bar, gradient hero, bento features, newsletter sign-up and footer.',
    preset: 'rose', fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Waitlist Landing Page Template — Free Launch Page HTML',
    seoDescription: 'Free waitlist and launch page template: announcement bar, glowing hero, bento features and a working email sign-up form for Mailchimp or Kit. Export the HTML.',
    keywords: ['waitlist landing page template', 'coming soon page template', 'product launch page html', 'startup waitlist page'],
    intro: 'A short, punchy page for collecting sign-ups before launch: an announcement bar with the launch date, a bold hero, a bento grid of what is coming and a newsletter form that sends straight to your email tool.',
    bestFor: ['Pre-launch waitlists', 'Beta sign-ups', 'Product Hunt launches'],
    sections: [['navbar-announcement', { fields: { barText: '🚀 Launching on Product Hunt, 12 November', barLink: 'Get notified', barUrl: '#get-started', logoText: 'Lumina', logoIcon: 'sparkles', cta: 'Join the waitlist', ctaUrl: '#get-started' }, lists: { links: links(['Features', '#features'], ['Join', '#get-started']) } }], ['centered-gradient-hero', { fields: { eyebrow: 'Coming soon', headline: 'Your notes, *finally thinking with you*', lead: 'Lumina turns scattered notes into answers, summaries and next steps. Join the waitlist for early access.', cta1: 'Join the waitlist', cta1Url: '#get-started', cta2: 'See what’s coming', cta2Url: '#features', note: '2,400 people already on the list' } }], ['features-bento', { fields: { eyebrow: 'What’s inside', heading: 'Built for *how you actually think*' } }], ['cta-newsletter', { fields: { heading: 'Be first in line for *early access*', lead: 'We’re letting people in weekly, in the order they joined. No spam, just your invite.', proof: '2,400+ on the waitlist', button: 'Join the waitlist' } }], ['footer-newsletter', { fields: { logoText: 'Lumina', logoIcon: 'sparkles', nlTitle: 'Launch updates', copyright: '© 2026 Lumina Labs' } }]],
    homeTitle: 'Lumina: The Notebook That Thinks With You. Join Early Access',
    homeDescription: 'Lumina turns scattered notes into answers, summaries and next steps. Join the waitlist for early access before our public launch on Product Hunt on 12 November.',
    // Multi-page version: a waitlist page has nothing to split, so it gets its own FAQ and About pages
    pages: [
      {
        name: 'FAQ', slug: 'faq',
        title: 'Lumina FAQ: Early Access, Pricing and Your Privacy',
        description: 'Answers about Lumina before launch: how the waitlist and early access work, what it will cost, which apps it connects to and how your notes stay private.',
        sections: [
          ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Before you *join*', lead: 'Everything people ask us about early access.', contactText: 'Still curious?', contactLink: 'Email the team', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
            { q: 'When do I get access?', a: 'We invite people every week in the order they joined. Most people on the list today will be in before the public launch on 12 November.' },
            { q: 'Will Lumina be free?', a: 'There will be a free plan for personal notes. Early access members get the paid plan free for their first six months.' },
            { q: 'Which apps does it work with?', a: 'At launch Lumina imports from Notion, Apple Notes, Google Docs and Markdown files, with more to follow.' },
            { q: 'Are my notes private?', a: 'Yes. Notes are encrypted, never used to train AI models and can be exported or deleted at any time.' },
          ] } }],
          ['cta-newsletter', { fields: { heading: 'Ready to *join?*', lead: 'Add your email and we’ll send your invite as soon as it’s your turn.', proof: '2,400+ on the waitlist', button: 'Join the waitlist' } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Lumina: The Small Team Building a Smarter Notebook',
        description: 'Meet the small team building Lumina, the notebook that turns scattered notes into answers, summaries and next steps, and join the waitlist for early access.',
        sections: [
          ['team-grid', { fields: { eyebrow: 'The team', heading: 'Built by people who *take a lot of notes*', lead: 'We are a small team of designers and engineers from Berlin and Lisbon.' }, lists: { members: [
            { photo: av(2), name: 'Lena Fischer', role: 'Co-founder & CEO', bio: 'Former product lead at a writing app.' },
            { photo: av(4), name: 'Marco Diaz', role: 'Co-founder & CTO', bio: 'Builds search and AI tools.' },
            { photo: av(5), name: 'Sofia Reis', role: 'Design', bio: 'Obsessed with calm interfaces.' },
          ] } }],
          ['cta-newsletter', { fields: { heading: 'Be first in line for *early access*', lead: 'We’re letting people in weekly, in the order they joined. No spam, just your invite.', proof: '2,400+ on the waitlist', button: 'Join the waitlist' } }],
        ],
      },
    ],
  },

  /* ── Creative & personal ─────────────────────────────────────────────────── */
  {
    id: 'agency', name: 'Creative Agency Website', industry: 'Creative',
    blurb: 'Floating navbar, dark hero, bento services, results, team carousel, case study, journal and big footer.',
    preset: 'midnight', fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Creative Agency Website Template — Free Dark HTML Template',
    seoDescription: 'Free creative agency website template: dark glowing hero, bento services, counters, team carousel, case study quote, journal and a giant wordmark footer.',
    keywords: ['agency website template', 'creative agency template html', 'design studio website template', 'digital agency landing page'],
    intro: 'A dark, confident studio site: a glowing hero, services in a bento grid, numbers that count up, a draggable team carousel, a featured client story, an editorial journal and a giant wordmark footer that ends with "Let’s talk".',
    bestFor: ['Design and branding studios', 'Digital and marketing agencies', 'Development shops'],
    sections: [['navbar-floating', nav('Northstar', 'pen-tool', 'Start a project', links(['Services', '#features'], ['Work', '#results'], ['Team', '#team'], ['Journal', '#blog']))], ['centered-gradient-hero', { fields: { eyebrow: 'Brand, web & product design', headline: 'We design brands people *remember*', lead: 'Northstar is an independent studio helping ambitious companies launch websites, products and brands that stand out.', cta1: 'Start a project', cta1Url: '#contact', cta2: 'See our work', cta2Url: '#results', note: 'Trusted by 120+ teams since 2015' } }], ['features-bento', { fields: { eyebrow: 'Services', heading: 'Everything you need to *launch*' } }], ['stats-counters', { fields: { eyebrow: 'Results', heading: 'Work that *moves the numbers*' } }], ['team-carousel'], ['testimonial-spotlight'], ['blog-list'], ['footer-giant']],
    // Multi-page version: where the home page's links should point instead
    multiLinks: { '#contact': 'contact.html', '#results': 'work.html', '#features': 'services.html', '#team': 'about.html', '/work/': 'work.html', '/services/': 'services.html', '/about/': 'about.html', '/contact/': 'contact.html', '/journal/': 'work.html' },
    homeTitle: 'Northstar: Independent Brand, Web and Product Design Studio',
    homeDescription: 'Northstar is an independent design studio for brands, websites and digital products. See our work, services and the people behind them, then start a project.',
    pages: [
      {
        name: 'Services', slug: 'services',
        title: 'Services: Brand, Websites and Product Design | Northstar',
        description: 'Brand identity, websites, product design and development from Northstar. See how a project runs from discovery to launch and the engagements we offer clients.',
        sections: [
          ['features-icon-grid', { fields: { eyebrow: 'Services', heading: 'What we *do best*', lead: 'Small senior teams, from first workshop to launch day and beyond.' }, lists: { features: [
            { icon: 'palette', title: 'Brand identity', text: 'Naming, logos, type and colour systems that scale.' },
            { icon: 'globe', title: 'Websites', text: 'Fast, accessible marketing sites your team can edit.' },
            { icon: 'pen-tool', title: 'Product design', text: 'Research, UX and UI for web and mobile apps.' },
            { icon: 'code', title: 'Development', text: 'Front-end and CMS builds with modern tools.' },
            { icon: 'trending-up', title: 'Growth', text: 'Landing pages, A/B tests and conversion work.' },
            { icon: 'sparkles', title: 'Motion', text: 'Animation that gives brands and products life.' },
          ] } }],
          ['features-steps', { fields: { eyebrow: 'Process', heading: 'How a project *runs*', lead: 'Clear phases, weekly demos and no surprises on scope or budget.', cta: 'Start a project', ctaUrl: 'contact.html' }, lists: { steps: [
            { icon: 'search', title: 'Discover', text: 'Workshops, research and a sharp brief in two weeks.' },
            { icon: 'pen-tool', title: 'Design', text: 'Concepts, prototypes and a design system, reviewed weekly.' },
            { icon: 'rocket', title: 'Build & launch', text: 'Development, testing and a calm launch, with handover.' },
          ] } }],
          ['pricing-rows', { fields: { eyebrow: 'Engagements', heading: 'Ways to *work together*', lead: 'Fixed-price projects or a monthly retainer for ongoing work.' } }],
          ['cta-gradient-banner', { fields: { heading: 'Have a project *in mind?*', lead: 'Tell us about it. We reply within one working day with next steps.', cta1: 'Start a project', cta1Url: 'contact.html', cta2: 'See our work', cta2Url: 'work.html', note: 'Booking projects from January' } }],
        ],
      },
      {
        name: 'Work', slug: 'work',
        title: 'Our Work: Case Studies and Client Results | Northstar',
        description: 'Selected work from the Northstar studio: brand, website and product projects with measurable results, kind words from clients and in-depth case studies to read.',
        sections: [
          ['stats-dark-split', { fields: { eyebrow: 'Results', heading: 'Design that *pays for itself*', cta: 'Start a project', ctaUrl: 'contact.html' } }],
          ['blog-cards', { fields: { eyebrow: 'Case studies', heading: 'Selected *projects*', allLink: '' }, lists: { posts: [
            { image: cov(1), category: 'Brand & web', date: '2026', readTime: '6 min read', title: 'Rebranding a fintech for its Series B', excerpt: 'A new identity and website that doubled demo requests in three months.', author: 'Northstar team', avatar: av(1), url: 'contact.html' },
            { image: cov(2), category: 'Product', date: '2026', readTime: '8 min read', title: 'Redesigning a health app for older patients', excerpt: 'Larger type, simpler flows and 40% fewer support calls.', author: 'Northstar team', avatar: av(5), url: 'contact.html' },
            { image: cov(3), category: 'E-commerce', date: '2025', readTime: '5 min read', title: 'A faster shop for a coffee roaster', excerpt: 'A new storefront that loads in under a second and sells more subscriptions.', author: 'Northstar team', avatar: av(4), url: 'contact.html' },
          ] } }],
          ['testimonials-carousel', { fields: { eyebrow: 'Clients', heading: 'What clients *say*' } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Northstar: An Independent Design Studio Since 2015',
        description: 'Northstar is an independent studio of designers and developers, founded in Lisbon in 2015. Meet the team, see the clients we work with and join us as we grow.',
        sections: [
          ['stats-counters', { fields: { eyebrow: 'The studio', heading: 'Independent *since 2015*', lead: 'A senior team of designers and developers, fully remote across Europe.' }, lists: { stats: [
            { value: '2015', label: 'Founded', note: 'in Lisbon' }, { value: '24', label: 'People', note: 'in 7 countries' }, { value: '120+', label: 'Clients', note: 'from startups to banks' }, { value: '18', label: 'Awards', note: 'for brand and web' },
          ] } }],
          ['logo-cloud', { fields: { heading: 'Trusted by teams at' } }],
          ['team-hiring', { fields: { ctaUrl: 'contact.html' } }],
        ],
      },
      {
        name: 'Contact', slug: 'contact',
        title: 'Start a Project with Northstar Design Studio Today',
        description: 'Start a project with Northstar. Tell us about your brand, website or product, timeline and budget, and we reply within one working day with next steps.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'Start a project', heading: 'Let’s make something *great*', lead: 'Share a few lines about your project, timeline and budget. We reply within one working day.' } }],
          ['contact-cards', { fields: { eyebrow: 'Other ways to reach us', heading: 'Not a project? *Say hello*' }, lists: { options: [
            { icon: 'briefcase', title: 'Careers', text: 'We hire designers and developers through the year.', meta: 'Open roles on the About page', cta: 'See roles', url: 'about.html' },
            { icon: 'mail', title: 'Press', text: 'Interviews, talks and award entries.', meta: 'press@northstar.studio', cta: 'Email press', url: 'mailto:press@northstar.studio' },
            { icon: 'map-pin', title: 'Studio', text: 'Rua Nova do Carvalho 12, Lisbon.', meta: 'Visits by appointment', cta: 'Get directions', url: 'https://www.openstreetmap.org/' },
          ] } }],
        ],
      },
    ],
  },
  {
    id: 'portfolio', name: 'Personal Portfolio Website', industry: 'Creative',
    blurb: 'Portfolio hero, services, client reviews, journal and a working contact form.',
    preset: 'sand', fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Personal Portfolio Website Template — Free HTML Template',
    seoDescription: 'Free personal portfolio template for designers and developers: an intro hero with photo, services, client reviews, articles and a working contact form.',
    keywords: ['portfolio website template', 'personal website template html', 'developer portfolio template', 'designer portfolio website'],
    intro: 'A warm, personal one-page site for freelancers: say who you are with a photo and an availability badge, list what you do, let clients vouch for you, share your writing and make it easy to get in touch.',
    bestFor: ['Freelance designers and developers', 'Writers and consultants', 'Job seekers who want a personal site'],
    sections: [['navbar-floating', nav('Alex Rivera', 'user-round', 'Hire me', links(['Services', '#features'], ['Reviews', '#customers'], ['Writing', '#blog'], ['Contact', '#contact']))], ['portfolio-hero', { fields: { cta1Url: '#blog' } }], ['features-icon-grid', { fields: { eyebrow: 'Services', heading: 'How I can *help*', lead: 'From the first sketch to launch day, I work with small teams who care about the details.' }, lists: { features: [{ icon: 'palette', title: 'Brand & UI design', text: 'Logos, design systems and interfaces that feel like you.' }, { icon: 'code', title: 'Web development', text: 'Fast, accessible websites built with modern tools.' }, { icon: 'rocket', title: 'Launch support', text: 'Analytics, SEO basics and a smooth go-live.' }] } }], ['testimonials-carousel', { fields: { eyebrow: 'Kind words', heading: 'What clients *say*' } }], ['blog-cards', { fields: { eyebrow: 'Writing', heading: 'Notes on *design and code*' } }], ['contact-split-form', { fields: { eyebrow: 'Contact', heading: 'Let’s work *together*', lead: 'Tell me about your project and timeline. I reply within one working day.' } }], ['footer-minimal', { fields: { logoText: 'Alex Rivera', links: 'Services | #features\nReviews | #customers\nWriting | #blog\nContact | #contact', logoIcon: 'user-round', copyright: '© 2026 Alex Rivera' } }]],
  },
  {
    id: 'photographer', name: 'Photographer Website', industry: 'Creative',
    blurb: 'Full-bleed photo hero, services and packages, client love, journal and booking form.',
    theme: { brand: '#e2e8f0', brandText: '#0b0b0d', bg: '#0b0b0d', surface: '#16161a', text: '#f5f5f4', muted: '#a8a29e', radius: '4', maxWidth: '1320' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Photographer Website Template — Free Portfolio HTML Template',
    seoDescription: 'Free photographer website template: full-bleed photo hero, sessions and packages, client reviews, journal and a booking form, in an elegant dark style.',
    keywords: ['photographer website template', 'photography portfolio template', 'wedding photographer website html', 'photo studio website template'],
    intro: 'An elegant, dark site that lets the photos lead: a full-bleed hero image, your sessions with clear package prices, kind words from couples and clients, your latest stories and a booking form.',
    bestFor: ['Wedding and portrait photographers', 'Photo studios', 'Videographers'],
    sections: [['navbar-simple', nav('Mira Lens', 'camera', 'Book a session', links(['Sessions', '#pricing'], ['Stories', '#blog'], ['Reviews', '#customers'], ['Contact', '#contact']), { login: '' })], ['image-background-hero', { fields: { eyebrow: 'Wedding & portrait photography', headline: 'Honest photos of *your best days*', lead: 'Natural, unposed photography across Portugal and beyond, for couples, families and brands.', cta1: 'Check availability', cta1Url: '#contact', cta2: 'View packages', cta2Url: '#pricing', s1Value: '400+', s1Label: 'weddings', s2Value: '12', s2Label: 'years', s3Value: '5.0', s3Label: 'average rating' } }], ['pricing-rows', { fields: { eyebrow: 'Sessions', heading: 'Packages for *every story*', lead: 'Every package includes an online gallery and full-resolution downloads.' }, toggles: { showBilling: false }, lists: { plans: [{ name: 'Portrait session', desc: 'One hour, one location, perfect for families and headshots.', chips: '1 hour\n40+ edited photos\nOnline gallery', monthly: '€350', priceNote: 'per session', cta: 'Book' }, { badge: 'Most booked', name: 'Wedding day', desc: 'Full-day coverage from getting ready to the first dance.', chips: '10 hours\n600+ photos\nSecond shooter\nPrinted album', monthly: '€2,900', priceNote: 'per wedding', cta: 'Check dates' }, { name: 'Brand shoot', desc: 'Lifestyle and product photos for your website and socials.', chips: 'Half day\n80+ photos\nCommercial licence', monthly: '€1,200', priceNote: 'per shoot', cta: 'Enquire' }] } }], ['testimonials-carousel', { fields: { eyebrow: 'Client love', heading: 'Moments they’ll *keep forever*' } }], ['blog-cards', { fields: { eyebrow: 'Stories', heading: 'Recent *weddings and shoots*' } }], ['contact-split-form', { fields: { eyebrow: 'Contact', heading: 'Tell me about *your day*', lead: 'Share your date, place and a little about you. I’ll reply with availability within 24 hours.', submit: 'Check availability' } }], ['footer-minimal', { fields: { logoText: 'Mira Lens', links: 'Sessions | #pricing\nReviews | #customers\nStories | #blog\nContact | #contact', logoIcon: 'camera', copyright: '© 2026 Mira Lens Photography' } }]],
  },

  /* ── Local business ──────────────────────────────────────────────────────── */
  {
    id: 'restaurant', name: 'Restaurant Website', industry: 'Food & drink',
    blurb: 'Photo hero with booking button, menu highlights, set menus, reviews, opening hours with map and footer.',
    theme: { brand: '#b45309', brandText: '#ffffff', bg: '#fffaf3', surface: '#f6ecdf', text: '#2a1a10', muted: '#6b5444', radius: '10', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'dmsans' },
    seoTitle: 'Restaurant Website Template — Free HTML Restaurant Template',
    seoDescription: 'Free restaurant website template: photo hero with table booking, menu highlights, set menus, guest reviews, opening hours and a map. Export clean HTML.',
    keywords: ['restaurant website template', 'restaurant landing page html', 'cafe website template', 'bistro website template free'],
    intro: 'A warm, appetising page for a restaurant, café or bistro: a moody photo hero with a "Book a table" button, the dishes you are known for, set menus with prices, glowing guest reviews, and your opening hours and location on a map.',
    bestFor: ['Restaurants and bistros', 'Cafés and bakeries', 'Wine bars and pop-ups'],
    sections: [
      ['navbar-simple', nav('Olive & Ember', 'coffee', 'Book a table', links(['Menu', '#menu'], ['Set menus', '#pricing'], ['Reviews', '#customers'], ['Visit', '#contact']), { login: '' })],
      ['image-background-hero', { fields: { image: IMG('tpl-restaurant.jpg'), eyebrow: 'Wood-fired kitchen · Lisbon', headline: 'Seasonal plates, *slow evenings*', lead: 'Small plates, wood-fired mains and natural wines in the heart of Alfama. Open for dinner, Tuesday to Sunday.', cta1: 'Book a table', cta1Url: '#contact', cta2: 'See the menu', cta2Url: '#menu', s1Value: '4.8★', s1Label: 'Google reviews', s2Value: '120', s2Label: 'natural wines', s3Value: 'Since 2014', s3Label: 'family run' } }],
      ['restaurant-menu', { fields: { eyebrow: 'From the kitchen', heading: 'Dishes guests *come back for*', lead: 'Our menu follows the market. A few favourites are always on it.', note: 'V vegetarian · GF gluten free. Tell us about any allergies when you book.', cta: 'Book a table', ctaUrl: '#contact' }, lists: { dishes: [{ name: 'Charred greens', price: '€12', desc: 'Market vegetables over oak embers, whipped feta and lemon.', tag: 'V' }, { name: 'Slow-cooked octopus', price: '€24', desc: 'Twelve-hour octopus, smoked paprika potatoes, salsa verde.', tag: 'Chef’s pick' }, { name: 'Ember-roasted chicken', price: '€21', desc: 'Free-range chicken, garlic confit and our house piri-piri.' }, { name: 'Whole sea bream', price: '€26', desc: 'Grilled over oak, fennel salad, brown butter capers.', tag: 'GF' }, { name: 'Pastel de nata', price: '€4', desc: 'Baked every afternoon, served warm with cinnamon.' }, { name: 'Natural wine by the glass', price: 'from €7', desc: '120 bottles from small Portuguese producers.' }] } }],
      ['pricing-rows', { fields: { eyebrow: 'Set menus', heading: 'Let the kitchen *choose for you*', lead: 'Available every evening for the whole table. Dietary needs welcome.' }, toggles: { showBilling: false }, lists: { plans: [{ name: 'Tasting menu', desc: 'Five courses of the season’s best.', chips: '5 courses\nVegetarian option', monthly: '€55', priceNote: 'per guest', cta: 'Book' }, { badge: 'Most loved', name: 'Tasting + wine', desc: 'Five courses with natural wine pairings.', chips: '5 courses\n4 wines\nSommelier notes', monthly: '€85', priceNote: 'per guest', cta: 'Book' }, { name: 'Private table', desc: 'The long table for groups of 10–18.', chips: 'Up to 18 guests\nCustom menu', monthly: '€70', priceNote: 'per guest', cta: 'Enquire' }] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Guest reviews', heading: 'Loved by *locals and travellers*', lead: '★ 4.8 from 1,900+ Google reviews' }, lists: { quotes: [{ quote: 'The octopus alone is worth the trip. Warm service and a wine list full of surprises.', name: 'Sophie L.', role: 'Visited in September', avatar: av(5) }, { quote: 'Our favourite dinner in Lisbon.', name: 'Marco D.', role: 'Visited in July', avatar: av(4) }, { quote: 'We booked the long table for a birthday and the team made the night unforgettable. Every course was a highlight.', name: 'Inês R.', role: 'Private dining', avatar: av(2) }] } }],
      ['contact-map', { fields: { eyebrow: 'Visit us', heading: 'Find *our table*', lead: 'Walk-ins welcome at the bar. For dinner, booking is recommended.', mapTitle: 'Map showing Olive & Ember in Lisbon' }, lists: { offices: [{ city: 'Olive & Ember', address: 'Rua de São Miguel 24\n1100-544 Lisbon', hours: 'Tue–Sun, 6pm–11pm', phone: '+351 21 000 1234', phoneUrl: 'tel:+351210001234', email: 'hello@oliveandember.pt', emailUrl: 'mailto:hello@oliveandember.pt' }] } }],
      ['footer-minimal', { fields: { logoText: 'Olive & Ember', logoIcon: 'coffee', links: 'Menu | #menu\nSet menus | #pricing\nReviews | #customers\nVisit | #contact', copyright: '© 2026 Olive & Ember' } }],
    ],
    // Multi-page version: where the home page's links should point instead
    multiLinks: { '#menu': 'menu.html', '#pricing': 'menu.html', '#contact': 'visit.html#contact' },
    homeTitle: 'Olive & Ember: Wood-Fired Restaurant in Alfama, Lisbon',
    homeDescription: 'Olive & Ember is a family-run, wood-fired restaurant in Alfama, Lisbon: seasonal small plates, slow-cooked mains and 120 natural wines. Book your table online.',
    pages: [
      {
        name: 'Menu', slug: 'menu',
        title: 'Menu: Small Plates, Wood-Fired Mains | Olive & Ember',
        description: 'This week’s menu at Olive & Ember in Lisbon: small plates, wood-fired mains, desserts baked in house, and set menus with natural wine pairings for the table.',
        sections: [
          ['restaurant-menu', { fields: { eyebrow: 'Small plates', heading: 'To share, *or not*', lead: 'The menu follows the market and changes every week. These are this week’s plates.', note: '', cta: '' }, lists: { dishes: [{ name: 'Charred greens', price: '€12', desc: 'Market vegetables over oak embers, whipped feta, lemon.', tag: 'V' }, { name: 'Grilled sardines on toast', price: '€11', desc: 'Sourdough, tomato, roasted peppers, parsley.' }, { name: 'Padrón peppers', price: '€8', desc: 'Blistered over the fire with sea salt.', tag: 'VG' }, { name: 'Cured ham and melon', price: '€14', desc: 'Alentejo ham aged 24 months, honeydew, mint.' }] } }],
          ['restaurant-menu', { fields: { eyebrow: 'Mains', heading: 'From *the fire*', lead: 'Wood-fired mains for one or two, with seasonal sides.', note: '', cta: '' }, lists: { dishes: [{ name: 'Slow-cooked octopus', price: '€24', desc: 'Smoked paprika potatoes, salsa verde, lemon.', tag: 'Chef’s pick' }, { name: 'Ember-roasted chicken', price: '€21', desc: 'Free-range half chicken, garlic confit, house piri-piri.' }, { name: 'Whole sea bream', price: '€26', desc: 'Fennel salad, brown butter capers.', tag: 'GF' }, { name: 'Aged beef rib for two', price: '€58', desc: '40-day aged rib, bone marrow gravy, crispy potatoes.' }] } }],
          ['restaurant-menu', { fields: { eyebrow: 'Desserts', heading: 'Something *sweet*', lead: 'Baked in house every afternoon.', note: 'V vegetarian · VG vegan · GF gluten free. Please tell us about any allergies when you book.', cta: 'Book a table', ctaUrl: 'visit.html#contact' }, lists: { dishes: [{ name: 'Pastel de nata', price: '€4', desc: 'Warm, with cinnamon and powdered sugar.', tag: 'V' }, { name: 'Olive oil cake', price: '€7', desc: 'Orange, yoghurt cream, toasted almonds.', tag: 'V' }, { name: 'Dark chocolate mousse', price: '€8', desc: 'Sea salt, olive oil, crunchy praline.', tag: 'GF' }] } }],
          ['pricing-rows', { fields: { eyebrow: 'Set menus', heading: 'Let the kitchen *choose for you*', lead: 'Available every evening for the whole table. Dietary needs welcome.' }, toggles: { showBilling: false }, lists: { plans: [
            { name: 'Tasting menu', desc: 'Five courses of the season’s best.', chips: '5 courses\nVegetarian option', monthly: '€55', priceNote: 'per guest', cta: 'Book', ctaUrl: 'visit.html#contact' },
            { badge: 'Most loved', name: 'Tasting + wine', desc: 'Five courses with natural wine pairings.', chips: '5 courses\n4 wines\nSommelier notes', monthly: '€85', priceNote: 'per guest', cta: 'Book', ctaUrl: 'visit.html#contact' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Allergies, diets *and more*', lead: 'Tell us when you book and the kitchen will plan around you.' }, toggles: { showContact: false }, lists: { faqs: [
            { q: 'Do you cater for vegetarians and vegans?', a: 'Yes. Around half the small plates are vegetarian, and the tasting menu has a vegetarian version. Vegan dishes are available on request.' },
            { q: 'Can you handle allergies?', a: 'We can adapt most dishes for common allergies. Please mention them when you book so the kitchen can prepare.' },
            { q: 'Are children welcome?', a: 'Of course. We have high chairs and a small children’s plate of grilled chicken and potatoes.' },
            { q: 'Do you change the menu often?', a: 'Every week, following what the market and our farmers have at their best.' },
          ] } }],
          ['cta-strip', { fields: { icon: 'calendar', heading: 'Hungry yet?', lead: 'Tables for tonight usually go by 5pm.', cta1: 'Book a table', cta1Url: 'visit.html#contact', cta2: 'Call us', cta2Url: 'tel:+351210001234' } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'Our Story: A Family Kitchen Since 2014 | Olive & Ember',
        description: 'The story of Olive & Ember: a family-run Lisbon restaurant cooking over oak embers since 2014, our kitchen team and the farmers and fishermen we buy from.',
        sections: [
          ['features-split-image', { fields: { eyebrow: 'Our story', heading: 'A family kitchen *since 2014*', lead: 'Rita and Tomás opened Olive & Ember in a former bakery in Alfama, with one wood oven and twelve seats. The oven is still the heart of the kitchen.', image: IMG('tpl-restaurant.jpg'), imageAlt: 'Candle-lit dining room at Olive & Ember', cta: 'See the menu', ctaUrl: 'menu.html' }, lists: { points: [
            { icon: 'leaf', title: 'Local first', text: 'Vegetables, fish and meat from small producers within 100 km.' },
            { icon: 'heart', title: 'Cooked over fire', text: 'Almost everything passes over oak embers before it reaches you.' },
            { icon: 'users', title: 'Family run', text: 'Three generations work in the kitchen and on the floor.' },
          ] } }],
          ['team-grid', { fields: { eyebrow: 'The team', heading: 'The people *behind the plates*', lead: 'A small team that cooks, pours and welcomes you every night.' }, lists: { members: [
            { photo: av(2), name: 'Rita Almeida', role: 'Chef & co-founder', bio: 'Trained in Porto and San Sebastián.' },
            { photo: av(4), name: 'Tomás Almeida', role: 'Front of house & co-founder', bio: 'Runs the floor and the wine list.' },
            { photo: av(5), name: 'Beatriz Costa', role: 'Pastry chef', bio: 'Bakes the natas every afternoon.' },
            { photo: av(7), name: 'Hugo Silva', role: 'Sommelier', bio: 'Knows every producer on the list.' },
          ] } }],
          ['stats-counters', { fields: { eyebrow: 'In numbers', heading: 'Ten years *by the fire*' }, lists: { stats: [
            { value: '2014', label: 'Opened', note: 'in Alfama' }, { value: '120', label: 'Natural wines', note: 'from Portugal' }, { value: '14', label: 'Local farmers', note: 'and fishermen' }, { value: '4.8★', label: 'Google rating', note: '1,900+ reviews' },
          ] } }],
        ],
      },
      {
        name: 'Visit', slug: 'visit',
        title: 'Book a Table and Find Us in Lisbon | Olive & Ember',
        description: 'Book a table at Olive & Ember in Alfama, Lisbon. Find our opening hours, address, phone number and a map, and ask about private dining for up to 18 guests.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'Reservations', heading: 'Book *a table*', lead: 'Tell us the date, time and number of guests. We confirm every booking by email within a few hours.', messageLabel: 'Date, time, guests and any allergies', submit: 'Request a table', successTitle: 'Thank you!', successText: 'We’ll confirm your table by email shortly.' }, lists: { methods: [
            { icon: 'phone', label: 'Call us', value: '+351 21 000 1234', url: 'tel:+351210001234' },
            { icon: 'mail', label: 'Email', value: 'hello@oliveandember.pt', url: 'mailto:hello@oliveandember.pt' },
          ] } }],
          ['contact-map', { fields: { eyebrow: 'Visit us', heading: 'Find *our table*', lead: 'Walk-ins welcome at the bar. For dinner, booking is recommended.', mapTitle: 'Map showing Olive & Ember in Lisbon' }, lists: { offices: [{ city: 'Olive & Ember', address: 'Rua de São Miguel 24\n1100-544 Lisbon', hours: 'Tue–Sun, 6pm–11pm', phone: '+351 21 000 1234', phoneUrl: 'tel:+351210001234', email: 'hello@oliveandember.pt', emailUrl: 'mailto:hello@oliveandember.pt' }] } }],
        ],
      },
    ],
  },
  {
    id: 'real-estate', name: 'Real Estate Agency Website', industry: 'Real estate',
    blurb: 'House hero, featured property listings, services, how buying works, results, agent team, reviews, FAQ and contact.',
    theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f7f5', text: '#0f1f1c', muted: '#4b5f5a', radius: '12', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Real Estate Website Template — Free HTML Agency Template',
    seoDescription: 'Free real estate website template: property hero, services for buyers and sellers, how it works, results, agent team, reviews and FAQ. Export clean HTML.',
    keywords: ['real estate website template', 'realtor website template html', 'property agency landing page', 'estate agent website template'],
    intro: 'A trustworthy page for an estate agency or independent realtor: a striking home at dusk, what you do for buyers and sellers, a simple three-step process, results that count up, the agents behind them and answers to the questions every client asks.',
    bestFor: ['Estate agencies and realtors', 'Property developers', 'Rental and letting agents'],
    sections: [
      ['navbar-simple', nav('Harbor Homes', 'house', 'Book a valuation', links(['Homes', '#listings'], ['Services', '#features'], ['How it works', '#how-it-works'], ['Agents', '#team'], ['FAQ', '#faq']), { login: '' })],
      ['image-background-hero', { fields: { image: IMG('tpl-realestate.jpg'), eyebrow: 'Buying · Selling · Letting', headline: 'Find the home that *fits your life*', lead: 'Local agents, honest advice and a smooth move from first viewing to keys in hand.', cta1: 'Book a free valuation', cta1Url: '#contact', cta2: 'How it works', cta2Url: '#how-it-works', s1Value: '1,200+', s1Label: 'homes sold', s2Value: '21 days', s2Label: 'average sale', s3Value: '98%', s3Label: 'of asking price' } }],
      ['property-listings', { fields: { eyebrow: 'Featured homes', heading: 'Homes *ready to view*', allLink: 'See all homes', allUrl: '#contact' }, lists: { homes: [{ status: 'For sale', price: '£485,000', title: 'Bright family home with garden', address: 'Harbour View', beds: '4 beds', baths: '2 baths', area: '148 m²', url: '#contact' }, { status: 'New', price: '£325,000', title: 'Modern townhouse near the park', address: 'Old Town', beds: '3 beds', baths: '2 baths', area: '112 m²', url: '#contact' }, { status: 'Under offer', price: '£610,000', title: 'Detached house with sea views', address: 'Cliff Road', beds: '5 beds', baths: '3 baths', area: '196 m²', url: '#contact' }] } }],
      ['features-icon-grid', { fields: { eyebrow: 'Services', heading: 'Everything for *your next move*', lead: 'Whether you’re buying, selling or letting, one local team handles it all.' }, lists: { features: [{ icon: 'house', title: 'Sell your home', text: 'Pro photos, a 3D tour and marketing that reaches serious buyers.' }, { icon: 'search', title: 'Find a home', text: 'Early access to new listings that match what you need.' }, { icon: 'wallet', title: 'Mortgage advice', text: 'Independent advisers who find the best rate for you.' }, { icon: 'file-text', title: 'Lettings', text: 'Tenant finding, contracts and full property management.' }, { icon: 'map-pin', title: 'Local experts', text: 'Agents who live in the neighbourhoods they sell.' }, { icon: 'shield-check', title: 'Fixed fees', text: 'Clear pricing from day one, with no hidden extras.' }] } }],
      ['features-steps', { fields: { eyebrow: 'How it works', heading: 'Selling in *three simple steps*', lead: 'Most of our homes are under offer within three weeks.', cta: 'Book a free valuation' }, lists: { steps: [{ icon: 'calendar', title: 'Free valuation', text: 'We visit, price your home and plan the marketing.' }, { icon: 'camera', title: 'Launch & viewings', text: 'Pro photos, listing on all portals and accompanied viewings.' }, { icon: 'circle-check', title: 'Offer to completion', text: 'We negotiate the best offer and manage the sale to the end.' }] } }],
      ['stats-counters', { fields: { eyebrow: 'Our results', heading: 'Numbers that *speak for us*' }, lists: { stats: [{ value: '1,200+', label: 'Homes sold', note: 'since 2012' }, { value: '21', label: 'Days to sell', note: 'on average' }, { value: '98%', label: 'Of asking price', note: 'achieved' }, { value: '4.9/5', label: 'Client rating', note: 'from 640 reviews' }] } }],
      ['team-grid', { fields: { eyebrow: 'Our agents', heading: 'Local people, *local knowledge*', lead: 'Every agent specialises in a few neighbourhoods, so you get real insight.' }, lists: { members: [{ photo: av(6), name: 'Grace Okafor', role: 'Founder & Director', bio: '15 years selling homes on the coast.' }, { photo: av(1), name: 'Daniel Moore', role: 'Senior Sales Agent', bio: 'Specialist in family homes and new builds.' }, { photo: av(5), name: 'Emma Clarke', role: 'Lettings Manager', bio: 'Looks after 300+ rental homes.' }, { photo: av(4), name: 'Raj Patel', role: 'Mortgage Adviser', bio: 'Finds the right mortgage, fast.' }] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Reviews', heading: 'Happy *homeowners*', lead: '★ 4.9 from 640+ reviews' }, lists: { quotes: [{ quote: 'Sold in nine days and above asking. Grace kept us updated at every step.', name: 'The Thompsons', role: 'Sold in Harbour View', avatar: av(3) }, { quote: 'They found us a home before it even hit the portals.', name: 'Priya & Sam', role: 'First-time buyers', avatar: av(8) }, { quote: 'Honest valuation, great photos and no pressure. Exactly what we hoped for.', name: 'Martin H.', role: 'Sold in Old Town', avatar: av(7) }] } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Questions *answered*', lead: 'Everything you need to know before you sell or buy.' }, lists: { faqs: [{ q: 'How much does a valuation cost?', a: 'It’s free and comes with no obligation. We visit your home and give you a written price range within 48 hours.' }, { q: 'What are your fees?', a: 'A fixed fee agreed up front, payable only when your sale completes. No sale, no fee.' }, { q: 'How long does it take to sell?', a: 'Our homes are under offer in 21 days on average, and most sales complete within 12 weeks.' }, { q: 'Do you help with mortgages?', a: 'Yes. Our independent mortgage adviser compares the whole market to find the best deal for you.' }] } }],
      ['contact-split-form', { lists: { methods: [{ icon: 'phone', label: 'Call the office', value: '0117 496 0321', url: 'tel:+441174960321' }, { icon: 'mail', label: 'Email', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' }, { icon: 'map-pin', label: 'Office', value: '8 Harbour Walk, Bristol', url: 'https://www.openstreetmap.org/' }] }, fields: { eyebrow: 'Contact', heading: 'Book your *free valuation*', lead: 'Tell us about your home and we’ll arrange a visit at a time that suits you.', submit: 'Request a valuation' } }],
      ['footer-columns', { fields: { logoText: 'Harbor Homes', logoIcon: 'house', tagline: 'Independent estate agents helping families move since 2012.', copyright: '© 2026 Harbor Homes Ltd.' }, lists: { columns: [{ title: 'Services', links: 'Sell | #features\nBuy | #features\nLettings | #features\nMortgages | #features' }, { title: 'Company', links: 'Our agents | #team\nReviews | #customers\nContact | #contact' }] } }],
    ],
  },
  {
    id: 'fitness', name: 'Gym & Fitness Website', industry: 'Health & fitness',
    blurb: 'Bold hero, classes, a weekly class timetable, memberships with yearly switch, coaches, member reviews, FAQ and sign-up CTA.',
    theme: { brand: '#a3e635', brandText: '#0a0a0a', bg: '#0a0a0a', surface: '#161616', text: '#fafafa', muted: '#a3a3a3', radius: '8', maxWidth: '1200' }, fonts: { heading: 'oswald', body: 'inter' },
    seoTitle: 'Gym Website Template — Free Fitness Studio HTML Template',
    seoDescription: 'Free gym and fitness website template: bold hero, classes, membership pricing with a monthly/yearly toggle, coaches, member reviews, FAQ and a free trial CTA.',
    keywords: ['gym website template', 'fitness website template html', 'personal trainer website', 'crossfit gym landing page'],
    intro: 'A loud, energetic page for a gym or fitness studio: a bold black-and-lime hero, the classes you run, memberships with a monthly/yearly switch, the coaches behind them, reviews from members and a free-trial call to action.',
    bestFor: ['Gyms and fitness studios', 'CrossFit boxes and bootcamps', 'Personal trainers'],
    sections: [
      ['navbar-simple', nav('IRONHOUSE', 'zap', 'Free trial', links(['Classes', '#features'], ['Timetable', '#timetable'], ['Membership', '#pricing'], ['Coaches', '#team'], ['FAQ', '#faq']), { login: 'Member login', ctaUrl: '#pricing' })],
      ['image-background-hero', { fields: { image: IMG('tpl-fitness.jpg'), eyebrow: 'Strength · Conditioning · Community', headline: 'Stronger every *single week*', lead: 'Coached classes, open gym and a community that shows up. Your first week is on us.', cta1: 'Start free trial', cta1Url: '#pricing', cta2: 'See classes', cta2Url: '#features', s1Value: '60+', s1Label: 'classes a week', s2Value: '24/7', s2Label: 'open gym', s3Value: '900', s3Label: 'members' } }],
      ['features-icon-grid', { fields: { eyebrow: 'Classes', heading: 'Find *your training*', lead: 'Every class is coached and scaled to your level.' }, lists: { features: [{ icon: 'zap', title: 'HIIT', text: '45 minutes of intervals that leave you buzzing.' }, { icon: 'trending-up', title: 'Strength', text: 'Barbell programming with progress tracked every week.' }, { icon: 'heart', title: 'Conditioning', text: 'Rowing, bikes and sleds for a stronger engine.' }, { icon: 'users', title: 'Bootcamp', text: 'Outdoor group sessions, rain or shine.' }, { icon: 'leaf', title: 'Mobility', text: 'Stretch, recover and move better.' }, { icon: 'target', title: 'Personal training', text: 'One-to-one coaching built around your goals.' }] } }],
      ['class-timetable', { fields: { eyebrow: 'Timetable', heading: 'This week at *IRONHOUSE*', lead: 'Coached classes from 6:30am to 8pm. Book your spot in the app or at the front desk.', cta: 'Start free trial', ctaUrl: '#pricing' } }],
      ['pricing-three-tier', { fields: { eyebrow: 'Membership', heading: 'Simple, *flexible* plans', lead: 'No joining fee. Cancel any time with 30 days’ notice.', note: 'Students and NHS staff get 20% off. Prices include VAT.' }, lists: { plans: [{ name: 'Open Gym', desc: 'Train on your own schedule.', monthly: '£39', yearly: '£32', features: '24/7 gym access\nFree induction\nApp workouts' }, { badge: 'Most popular', name: 'Unlimited', desc: 'All classes and open gym.', monthly: '£79', yearly: '£65', cta: 'Start free trial', features: 'Unlimited classes\n24/7 gym access\nMonthly progress check\nMember events' }, { name: 'Coached', desc: 'Unlimited plus personal training.', monthly: '£149', yearly: '£125', cta: 'Book a consult', features: 'Everything in Unlimited\n4 PT sessions a month\nNutrition plan' }] } }],
      ['team-grid', { fields: { eyebrow: 'Coaches', heading: 'Coaches who *care*', lead: 'Qualified, experienced and genuinely invested in your progress.' }, lists: { members: [{ photo: av(4), name: 'Marcus Webb', role: 'Head Coach', bio: 'Strength & conditioning, 10 years coaching.' }, { photo: av(2), name: 'Zara Ahmed', role: 'HIIT & Bootcamp', bio: 'Brings the energy at 6am.' }, { photo: av(7), name: 'Ben Carter', role: 'Personal Trainer', bio: 'Specialist in fat loss and rehab.' }, { photo: av(3), name: 'Lena Fischer', role: 'Mobility Coach', bio: 'Yoga and movement teacher.' }] } }],
      ['testimonials-marquee', { fields: { eyebrow: 'Members', heading: 'Results that *speak*', lead: '★ 4.9 from 900+ member reviews' }, lists: { row1: [{ quote: 'Down 9 kg and deadlifting twice my body weight. The coaches actually know your name.', name: 'Priya S.', role: 'Member for 2 years', avatar: av(5) }, { quote: 'The 6:30am HIIT crew is the best start to my day.', name: 'Callum R.', role: 'Unlimited member', avatar: av(4) }, { quote: 'Came in nervous as a total beginner, now I never miss a week.', name: 'Jade M.', role: 'Member since 2025', avatar: av(2) }], row2: [{ quote: 'Physio-friendly coaching got me back to running after my knee injury.', name: 'Tom W.', role: 'Coached plan', avatar: av(7) }, { quote: 'Clean, friendly and open when I need it. Worth every penny.', name: 'Aisha K.', role: 'Open Gym member', avatar: av(6) }, { quote: 'The community events turned training into the best part of my week.', name: 'Sam L.', role: 'Member for 3 years', avatar: av(1) }] } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Before you *start*', lead: 'Free trials, beginners, freezing your membership and the changing rooms.' }, lists: { faqs: [{ q: 'Is the free trial really free?', a: 'Yes. Seven days of unlimited classes and open gym, no card needed.' }, { q: 'I’m a complete beginner. Is that OK?', a: 'Absolutely. Every class is scaled, and your first session starts with an induction.' }, { q: 'Can I freeze my membership?', a: 'Yes, for up to three months a year, for holidays or injury.' }, { q: 'Do you have showers and lockers?', a: 'Yes, with towels, lockers and hair dryers included.' }] } }],
      ['cta-gradient-banner', { fields: { heading: 'Your first week is *on us*', lead: 'Seven days of unlimited classes and open gym. No card, no commitment.', cta1: 'Start free trial', cta2: 'Talk to a coach', note: 'Join 900 members training this week' } }],
      ['footer-minimal', { fields: { logoText: 'IRONHOUSE', logoIcon: 'zap', copyright: '© 2026 Ironhouse Fitness' } }],
    ],
  },
  {
    id: 'dental', name: 'Dental Clinic Website', industry: 'Health & fitness',
    blurb: 'Calm hero, treatments, online booking, how a visit works, dentists, reviews, FAQ and location.',
    theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f8fd', text: '#0c1f2e', muted: '#4b6275', radius: '16', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Dental Clinic Website Template — Free HTML Clinic Template',
    seoDescription: 'Free dental clinic website template: calm hero, treatments, online booking, how a visit works, your dentists, patient reviews, FAQ and a map. Export clean HTML.',
    keywords: ['dental clinic website template', 'dentist website template html', 'medical clinic landing page', 'healthcare website template'],
    intro: 'A calm, reassuring page for a dental or medical practice: friendly hero copy with an appointment button, the treatments you offer, a booking preview, what happens at a first visit, the clinicians, reviews from patients and how to find you.',
    bestFor: ['Dental practices', 'Clinics and physiotherapists', 'Veterinary and wellness practices'],
    sections: [
      ['navbar-simple', nav('Brightsmile Dental', 'heart', 'Book appointment', links(['Treatments', '#features'], ['Our team', '#team'], ['Reviews', '#customers'], ['FAQ', '#faq']), { login: 'Patient login' })],
      ['saas-split-hero', { fields: { badge: 'Now welcoming new patients', badgeUrl: '#contact', headline: 'Gentle dentistry for *the whole family*', lead: 'Modern, relaxed care in the centre of town, with evening and Saturday appointments and online booking.', cta1: 'Book online', cta1Url: '#contact', cta2: 'Our treatments', cta2Url: '#features', proof: '★★★★★ 4.9 from 1,100+ patients', image: IMG('tpl-booking.png'), imageAlt: 'Online booking calendar with available appointment times' } }],
      ['features-icon-grid', { fields: { eyebrow: 'Treatments', heading: 'Care for *every smile*', lead: 'From check-ups to complete smile makeovers, all under one roof.' }, lists: { features: [{ icon: 'shield-check', title: 'Check-ups & hygiene', text: 'Thorough exams and gentle cleaning every six months.' }, { icon: 'sparkles', title: 'Teeth whitening', text: 'Safe, professional whitening at the clinic or at home.' }, { icon: 'star', title: 'Invisible aligners', text: 'Straighter teeth without metal braces.' }, { icon: 'heart', title: 'Children’s dentistry', text: 'Friendly visits that make kids look forward to coming back.' }, { icon: 'zap', title: 'Emergency care', text: 'Same-day appointments for toothache and accidents.' }, { icon: 'award', title: 'Implants', text: 'Permanent, natural-looking tooth replacement.' }] } }],
      ['features-steps', { fields: { eyebrow: 'Your first visit', heading: 'What to *expect*', lead: 'No surprises: a relaxed first visit with a clear plan and prices.', cta: 'Book your first visit' }, lists: { steps: [{ icon: 'calendar', title: 'Book online', text: 'Pick a time that suits you, including evenings and Saturdays.' }, { icon: 'search', title: 'Check-up & X-rays', text: 'A gentle exam and digital X-rays if you need them.' }, { icon: 'file-text', title: 'Your plan', text: 'A clear treatment plan and costs, with no pressure.' }] } }],
      ['team-grid', { fields: { eyebrow: 'Our team', heading: 'Meet *your dentists*', lead: 'Experienced clinicians who put comfort first.' }, lists: { members: [{ photo: av(6), name: 'Dr Aisha Bello', role: 'Principal Dentist', bio: '18 years in general and cosmetic dentistry.' }, { photo: av(1), name: 'Dr Leo Martins', role: 'Orthodontist', bio: 'Aligner and braces specialist.' }, { photo: av(5), name: 'Nora Quinn', role: 'Hygienist', bio: 'Gentle cleans and great advice.' }, { photo: av(8), name: 'Hana Sato', role: 'Practice Manager', bio: 'Here to help with bookings and plans.' }] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Patient reviews', heading: 'Smiles *say it best*', lead: '★ 4.9 from 1,100+ patients' }, lists: { quotes: [{ quote: 'I’ve been nervous of dentists all my life. Dr Bello was so patient that I actually look forward to check-ups now.', name: 'Claire W.', role: 'Patient since 2021', avatar: av(3) }, { quote: 'Booked online at 9am, seen by lunchtime for an emergency.', name: 'James P.', role: 'Emergency patient', avatar: av(7) }, { quote: 'My kids love coming here. The team makes it fun.', name: 'Omar H.', role: 'Family plan', avatar: av(4) }] } }],
      ['faq-split', { fields: { eyebrow: 'FAQ', heading: 'Questions *patients ask*', cardTitle: 'Need help now?', cardText: 'Call us for same-day emergency appointments.', cardCta: 'Call 020 7946 0123', cardUrl: 'tel:+442079460123' }, lists: { faqs: [{ q: 'Are you accepting new patients?', a: 'Yes, adults and children. You can book your first appointment online.' }, { q: 'Do you offer payment plans?', a: 'Yes. Spread the cost of treatment over 6–24 months with 0% finance.' }, { q: 'What if I’m nervous?', a: 'Tell us when you book. We’ll take extra time, explain every step and can offer sedation.' }, { q: 'Do you see emergencies?', a: 'Yes, with same-day emergency slots every weekday.' }] } }],
      ['contact-map', { fields: { eyebrow: 'Visit us', heading: 'Find *the clinic*', lead: 'Two minutes from the station, with step-free access and parking nearby.', mapTitle: 'Map showing Brightsmile Dental' }, lists: { offices: [{ city: 'Brightsmile Dental', address: '8 Market Street\nLondon EC1M 5PQ', hours: 'Mon–Fri 8am–8pm · Sat 9am–2pm', phone: '020 7946 0123', phoneUrl: 'tel:+442079460123', email: 'hello@brightsmile.co.uk', emailUrl: 'mailto:hello@brightsmile.co.uk' }] } }],
      ['footer-minimal', { fields: { logoText: 'Brightsmile Dental', links: 'Treatments | #features\nOur team | #team\nReviews | #customers\nFAQ | #faq\nContact | #contact', logoIcon: 'heart', copyright: '© 2026 Brightsmile Dental Clinic' } }],
    ],
    // Multi-page version: where the home page's links should point instead
    multiLinks: { '#contact': 'book.html', '#features': 'treatments.html', '#team': 'team.html' },
    homeTitle: 'Brightsmile Dental: Gentle Family Dentist in Central London',
    homeDescription: 'Brightsmile Dental is a family dental clinic in central London with evening and Saturday appointments, gentle care for nervous patients and online booking.',
    pages: [
      {
        name: 'Treatments', slug: 'treatments',
        title: 'Treatments and Prices | Brightsmile Dental, London',
        description: 'Treatments and prices at Brightsmile Dental in London: check-ups, hygiene, teeth whitening, invisible aligners, implants and same-day emergency appointments.',
        sections: [
          ['pricing-rows', { fields: { eyebrow: 'Treatments & prices', heading: 'Clear prices, *no surprises*', lead: 'You always get a written plan and price before any treatment starts. 0% finance available.' }, toggles: { showBilling: false }, lists: { plans: [
            { name: 'Check-up', desc: 'Full exam, oral cancer screening and advice.', chips: '30 minutes\nDigital X-rays if needed', monthly: '£65', priceNote: 'per visit', cta: 'Book', ctaUrl: 'book.html' },
            { name: 'Hygiene clean', desc: 'Gentle scale and polish with our hygienist.', chips: '45 minutes\nAir polishing', monthly: '£75', priceNote: 'per visit', cta: 'Book', ctaUrl: 'book.html' },
            { badge: 'Popular', name: 'Teeth whitening', desc: 'Custom trays and professional gel for home use.', chips: 'Up to 8 shades\nTop-up gel included', monthly: '£395', priceNote: 'complete', cta: 'Book a consult', ctaUrl: 'book.html' },
            { name: 'Invisible aligners', desc: 'Straighter teeth without metal braces.', chips: 'Free 3D scan\n6–18 months\n0% finance', monthly: 'from £2,400', priceNote: 'complete', cta: 'Free consult', ctaUrl: 'book.html' },
            { name: 'Dental implant', desc: 'A permanent, natural-looking new tooth.', chips: 'Implant + crown\n10-year guarantee', monthly: 'from £2,200', priceNote: 'per tooth', cta: 'Book a consult', ctaUrl: 'book.html' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'Treatment FAQ', heading: 'Before your *treatment*' }, toggles: { showContact: false }, lists: { faqs: [
            { q: 'Does whitening damage teeth?', a: 'No. Professional whitening with custom trays is safe for enamel. Some people feel short-term sensitivity, which fades within days.' },
            { q: 'Am I suitable for aligners?', a: 'Most adults with crowding or gaps are. A free 3D scan shows your result before you decide.' },
            { q: 'Do implants hurt?', a: 'The procedure is done under local anaesthetic, and most patients say it is easier than an extraction.' },
            { q: 'Can I spread the cost?', a: 'Yes. Treatments over £500 can be spread over 6–24 months with 0% finance.' },
          ] } }],
          ['cta-strip', { fields: { icon: 'calendar', heading: 'Ready to book?', lead: 'Evening and Saturday appointments available.', cta1: 'Book online', cta1Url: 'book.html', cta2: 'Call the clinic', cta2Url: 'tel:+442079460123' } }],
        ],
      },
      {
        name: 'Our team', slug: 'team',
        title: 'Meet Our Dentists and Hygienists | Brightsmile Dental',
        description: 'Meet the dentists, orthodontist and hygienist at Brightsmile Dental in central London: experienced clinicians who put your comfort and honest advice first.',
        sections: [
          ['team-grid', { fields: { eyebrow: 'Our team', heading: 'Meet *your dentists*', lead: 'Experienced clinicians who put comfort first.' }, lists: { members: [
            { photo: av(6), name: 'Dr Aisha Bello', role: 'Principal Dentist', bio: '18 years in general and cosmetic dentistry.' },
            { photo: av(1), name: 'Dr Leo Martins', role: 'Orthodontist', bio: 'Aligner and braces specialist.' },
            { photo: av(5), name: 'Nora Quinn', role: 'Hygienist', bio: 'Gentle cleans and great advice.' },
            { photo: av(8), name: 'Hana Sato', role: 'Practice Manager', bio: 'Here to help with bookings and plans.' },
          ] } }],
          ['stats-counters', { fields: { eyebrow: 'The clinic', heading: 'Caring for London *since 2009*' }, lists: { stats: [
            { value: '2009', label: 'Opened', note: 'on Market Street' }, { value: '11,000+', label: 'Patients', note: 'of all ages' }, { value: '4.9/5', label: 'Patient rating', note: '1,100+ reviews' }, { value: '6', label: 'Days a week', note: 'including Saturdays' },
          ] } }],
          ['testimonials-grid', { fields: { eyebrow: 'Patient reviews', heading: 'Smiles *say it best*', lead: '★ 4.9 from 1,100+ patients' }, lists: { quotes: [
            { quote: 'I’ve been nervous of dentists all my life. Dr Bello was so patient that I actually look forward to check-ups now.', name: 'Claire W.', role: 'Patient since 2021', avatar: av(3) },
            { quote: 'Dr Martins explained every step of my aligner treatment. Worth every penny.', name: 'Sam T.', role: 'Aligner patient', avatar: av(7) },
            { quote: 'My kids love coming here. The team makes it fun.', name: 'Omar H.', role: 'Family plan', avatar: av(4) },
          ] } }],
        ],
      },
      {
        name: 'Book online', slug: 'book',
        title: 'Book a Dental Appointment Online | Brightsmile Dental',
        description: 'Book a dental appointment at Brightsmile Dental in London online: check-ups, hygiene visits and emergency slots, with evening and Saturday times available.',
        sections: [
          ['contact-split-form', { fields: { eyebrow: 'Appointments', heading: 'Book your *appointment*', lead: 'Tell us what you need and when suits you. We confirm by phone or email the same day.', messageLabel: 'Treatment, preferred days and times', submit: 'Request appointment', successTitle: 'Request received', successText: 'We’ll be in touch today to confirm your time.' }, lists: { methods: [
            { icon: 'phone', label: 'Call the clinic', value: '020 7946 0123', url: 'tel:+442079460123' },
            { icon: 'mail', label: 'Email', value: 'hello@brightsmile.co.uk', url: 'mailto:hello@brightsmile.co.uk' },
          ] } }],
          ['contact-map', { fields: { eyebrow: 'Visit us', heading: 'Find *the clinic*', lead: 'Two minutes from the station, with step-free access and parking nearby.', mapTitle: 'Map showing Brightsmile Dental' }, lists: { offices: [{ city: 'Brightsmile Dental', address: '8 Market Street\nLondon EC1M 5PQ', hours: 'Mon–Fri 8am–8pm · Sat 9am–2pm', phone: '020 7946 0123', phoneUrl: 'tel:+442079460123', email: 'hello@brightsmile.co.uk', emailUrl: 'mailto:hello@brightsmile.co.uk' }] } }],
        ],
      },
    ],
  },
  {
    id: 'local-service', name: 'Local Service Business Website', industry: 'Local business',
    blurb: 'Trust-first hero, services, how it works, results, reviews, service area FAQ and quote form.',
    theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#ffffff', surface: '#fff6ef', text: '#1c1917', muted: '#57534e', radius: '12', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Local Business Website Template — Free HTML Service Template',
    seoDescription: 'Free local business website template for cleaners, plumbers and trades: trust hero, services, how it works, reviews, FAQ and a free quote request form.',
    keywords: ['local business website template', 'cleaning service website template', 'plumber website template html', 'service business landing page'],
    intro: 'A trust-first page for cleaners, plumbers, electricians, gardeners and other local services: a clear promise with a quote button, what you offer, how booking works, proof in numbers and reviews, the questions customers ask and a quote request form.',
    bestFor: ['Cleaning companies', 'Plumbers, electricians and trades', 'Gardeners, movers and handymen'],
    sections: [
      ['navbar-simple', nav('Sparkle & Co', 'sparkles', 'Get a quote', links(['Services', '#features'], ['How it works', '#how-it-works'], ['Reviews', '#customers'], ['FAQ', '#faq']), { login: '' })],
      ['saas-split-hero', { fields: { badge: 'Insured & background-checked cleaners', badgeUrl: '#features', headline: 'A spotless home, *without lifting a finger*', lead: 'Trusted home and office cleaning across the city. Book in 60 seconds and love the result, or we’ll come back for free.', cta1: 'Get a free quote', cta1Url: '#contact', cta2: 'See services', cta2Url: '#features', proof: '★★★★★ 4.9 from 2,300+ local customers', image: IMG('tpl-booking.png'), imageAlt: 'Booking calendar with an available slot selected' } }],
      ['features-icon-grid', { fields: { eyebrow: 'Services', heading: 'Cleaning for *every space*', lead: 'Regular or one-off, homes or offices, always by the same friendly team.' }, lists: { features: [{ icon: 'house', title: 'Regular home cleaning', text: 'Weekly or fortnightly visits from your own cleaner.' }, { icon: 'sparkles', title: 'Deep cleaning', text: 'Top-to-bottom cleans for spring or special occasions.' }, { icon: 'truck', title: 'Move in / move out', text: 'Get your deposit back with an end-of-tenancy clean.' }, { icon: 'building-2', title: 'Office cleaning', text: 'Early-morning or evening cleans that fit your hours.' }, { icon: 'leaf', title: 'Eco products', text: 'Non-toxic products, safe for kids and pets.' }, { icon: 'shield-check', title: 'Happiness guarantee', text: 'Not perfect? We’ll return within 24 hours, free.' }] } }],
      ['features-steps', { fields: { eyebrow: 'How it works', heading: 'Booked in *three easy steps*', lead: 'No phone calls needed, unless you’d like one.', cta: 'Get a free quote' }, lists: { steps: [{ icon: 'file-text', title: 'Get a quote', text: 'Tell us about your space and get a fixed price instantly.' }, { icon: 'calendar', title: 'Pick a time', text: 'Choose a day and time that suits you, even weekends.' }, { icon: 'sparkles', title: 'Relax', text: 'Your vetted cleaner arrives with everything needed.' }] } }],
      ['stats-counters', { fields: { eyebrow: 'Trusted locally', heading: 'Cleaning homes *since 2015*' }, lists: { stats: [{ value: '18,000+', label: 'Cleans completed', note: 'and counting' }, { value: '4.9/5', label: 'Average rating', note: '2,300+ reviews' }, { value: '60 sec', label: 'To book online', note: 'fixed prices' }, { value: '100%', label: 'Insured', note: 'and vetted staff' }] } }],
      ['testimonials-carousel', { fields: { eyebrow: 'Reviews', heading: 'Loved by *local families*' } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Good to *know*' }, lists: { faqs: [{ q: 'Which areas do you cover?', a: 'The whole city and surrounding towns within 15 miles. Enter your postcode in the quote form to check.' }, { q: 'Do I need to provide supplies?', a: 'No. Your cleaner brings eco-friendly products and equipment.' }, { q: 'Are your cleaners insured?', a: 'Yes. Every cleaner is background-checked, trained and fully insured.' }, { q: 'Can I cancel or reschedule?', a: 'Yes, free of charge with 24 hours’ notice.' }] } }],
      ['contact-split-form', { fields: { eyebrow: 'Free quote', heading: 'Get your *fixed price*', lead: 'Tell us about your home or office and we’ll reply with a fixed quote within the hour.', messageLabel: 'Your address and what needs cleaning', submit: 'Get my quote' } }],
      ['footer-columns', { fields: { logoText: 'Sparkle & Co', logoIcon: 'sparkles', tagline: 'Friendly, reliable cleaning for homes and offices since 2015.', copyright: '© 2026 Sparkle & Co Cleaning Ltd.' }, lists: { columns: [{ title: 'Services', links: 'Home cleaning | #features\nDeep cleaning | #features\nOffice cleaning | #features' }, { title: 'Company', links: 'How it works | #how-it-works\nReviews | #customers\nContact | #contact' }] } }],
    ],
  },

  /* ── Education, coaching & community ─────────────────────────────────────── */
  {
    id: 'online-course', name: 'Online Course Website', industry: 'Education',
    blurb: 'Course hero, what you’ll learn, curriculum, instructor, student results, one-price pricing and FAQ.',
    theme: { brand: '#f97316', brandText: '#ffffff', bg: '#fffcf8', surface: '#fff1e6', text: '#1c1917', muted: '#57534e', radius: '14', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'dmsans' },
    seoTitle: 'Online Course Landing Page Template — Free HTML Template',
    seoDescription: 'Free online course landing page template: course hero, what you’ll learn, curriculum, instructor, student reviews, single-price pricing with guarantee and FAQ.',
    keywords: ['online course landing page template', 'course sales page template', 'course website template html', 'ebook landing page template'],
    intro: 'A sales page that turns visitors into students: a clear course promise with a lesson preview, what students will be able to do, the curriculum module by module, who teaches it, results from past students, one simple price with a money-back guarantee, and answers to the usual questions.',
    bestFor: ['Online courses and cohorts', 'Workshops and bootcamps', 'Ebooks and digital products'],
    sections: [
      ['navbar-simple', nav('Design Academy', 'graduation-cap', 'Enrol now', links(['Curriculum', '#features'], ['Reviews', '#customers'], ['Pricing', '#pricing'], ['FAQ', '#faq']), { login: 'Student login', ctaUrl: '#pricing' })],
      ['saas-split-hero', { fields: { badge: 'New cohort starts 4 November', badgeUrl: '#pricing', headline: 'Learn UI design *in 8 weeks*', lead: 'A practical, project-based course that takes you from first sketch to a portfolio-ready app design, with feedback from working designers.', cta1: 'Enrol now', cta1Url: '#pricing', cta2: 'Watch a free lesson', cta2Url: '#features', proof: '★★★★★ 4.9 from 3,200+ students', image: IMG('tpl-course.png'), imageAlt: 'Course lesson player with a list of lessons' } }],
      ['features-icon-grid', { fields: { eyebrow: 'What you’ll learn', heading: 'Skills you’ll *actually use*', lead: 'Every module ends with a real project for your portfolio.' }, lists: { features: [{ icon: 'palette', title: 'Visual design', text: 'Colour, type, spacing and hierarchy that look professional.' }, { icon: 'layout-dashboard', title: 'UI patterns', text: 'Navigation, forms, cards and dashboards that work.' }, { icon: 'pen-tool', title: 'Figma mastery', text: 'Components, auto layout and variants like a pro.' }, { icon: 'users', title: 'User research', text: 'Interviews and tests that shape better decisions.' }, { icon: 'smartphone', title: 'Responsive design', text: 'Designs that work from phone to desktop.' }, { icon: 'briefcase', title: 'Portfolio & job prep', text: 'Case studies and interview practice to get hired.' }] } }],
      ['features-alternating', { fields: { eyebrow: 'Curriculum', heading: 'Eight weeks, *step by step*' }, lists: { rows: [{ label: 'Weeks 1–2', title: 'Foundations of *visual design*', text: 'Learn the principles that make interfaces feel clear and calm.', bullets: '12 video lessons\n2 design exercises\nWeekly live Q&A', image: IMG('tpl-course.png'), imageAlt: 'Lesson player' }, { label: 'Weeks 3–5', title: 'Design a *real app*', text: 'Plan, wireframe and design a complete mobile app with feedback at every step.', bullets: 'Project brief\nMentor reviews\nComponent library', image: IMG('feature-collab.png'), imageAlt: 'Project board' }, { label: 'Weeks 6–8', title: 'Portfolio and *job ready*', text: 'Turn your project into a case study and prepare for interviews.', bullets: 'Case study template\nPortfolio review\nMock interviews', image: IMG('feature-analytics.png'), imageAlt: 'Progress dashboard' }] } }],
      ['testimonial-spotlight', { fields: { company: 'COHORT 12', quote: 'Three months after the course I landed my first design job. The feedback from mentors *changed how I work*.', name: 'Priya Raman', role: 'Product Designer, Orbit', photo: av(5) }, lists: { stats: [{ value: '3,200+', label: 'students' }, { value: '74%', label: 'changed careers' }, { value: '4.9/5', label: 'average rating' }] } }],
      ['pricing-single-plan', { fields: { eyebrow: 'Enrol', heading: 'One price, *everything included*', lead: 'Lifetime access to all lessons, projects and community.', included: '48 video lessons\n6 portfolio projects\nMentor feedback\nWeekly live Q&A\nPrivate community\nCertificate\nLifetime updates\nCareer guidance', plan: 'UI Design Course', planNote: 'Next cohort: 4 November', monthly: '$497', yearly: '$397', cta: 'Enrol now', guarantee: '30-day money-back guarantee', perMonth: 'one-time', perYear: 'early-bird price' }, toggles: { showBilling: true } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Questions about *the course*' }, lists: { faqs: [{ q: 'Do I need any experience?', a: 'No. The course starts from the basics; all you need is a computer and the free version of Figma.' }, { q: 'How much time does it take?', a: 'Around 6–8 hours a week for eight weeks. Lessons are recorded, so you can learn at your own pace.' }, { q: 'What if it’s not for me?', a: 'You’re covered by a 30-day money-back guarantee, no questions asked.' }, { q: 'Do I get a certificate?', a: 'Yes, a certificate of completion you can add to LinkedIn.' }] } }],
      ['footer-minimal', { fields: { logoText: 'Design Academy', logoIcon: 'graduation-cap', copyright: '© 2026 Design Academy' } }],
    ],
  },
  {
    id: 'coach', name: 'Coach & Consultant Website', industry: 'Education',
    blurb: 'Personal hero, how you help, programmes, client results, spotlight story, newsletter and booking.',
    preset: 'sand', fonts: { heading: 'lora', body: 'dmsans' },
    seoTitle: 'Coach Website Template — Free Coaching & Consultant HTML',
    seoDescription: 'Free coach and consultant website template: personal hero, how you help, coaching programmes, client results, a featured story, newsletter and a booking form.',
    keywords: ['coach website template', 'life coach website template', 'consultant website template html', 'coaching landing page'],
    intro: 'A warm, personal page for coaches, therapists and consultants: introduce yourself with a photo, explain who you help and how, present your programmes with clear prices, share client stories and invite people to book a free discovery call.',
    bestFor: ['Life and career coaches', 'Business consultants', 'Therapists and wellness practitioners'],
    sections: [
      ['navbar-floating', nav('Maya Chen Coaching', 'lightbulb', 'Book a call', links(['How I help', '#features'], ['Programmes', '#pricing'], ['Stories', '#customers'], ['Contact', '#contact']))],
      ['portfolio-hero', { fields: { status: 'Taking new clients for January', hello: 'Hi, I’m Maya 👋', headline: 'Find work that *feels like yours*', lead: 'I help mid-career professionals get unstuck, change direction and build careers they’re proud of.', cta1: 'Book a free call', cta1Url: '#contact', cta2: 'See programmes', cta2Url: '#pricing', link1: 'LinkedIn', link2: 'Podcast', link3: 'Newsletter', image: av(6), imageAlt: 'Portrait of Maya Chen' } }],
      ['features-icon-grid', { fields: { eyebrow: 'How I help', heading: 'Coaching for *real change*', lead: 'Practical tools, honest conversations and steady accountability.' }, lists: { features: [{ icon: 'target', title: 'Career clarity', text: 'Work out what you want next and why.' }, { icon: 'trending-up', title: 'Career change', text: 'A step-by-step plan to move into a new field.' }, { icon: 'message-circle', title: 'Confidence & voice', text: 'Speak up, negotiate and lead with confidence.' }] } }],
      ['pricing-three-tier', { fields: { eyebrow: 'Programmes', heading: 'Ways to *work together*', lead: 'Every programme starts with a free 30-minute discovery call.', note: 'Payment plans available for all programmes.' }, toggles: { showBilling: false }, lists: { plans: [{ name: 'Single session', desc: 'A focused session on one question.', monthly: '$180', priceNote: 'per session', cta: 'Book a session', features: '75-minute call\nSession notes\nOne follow-up email' }, { badge: 'Most chosen', name: '3-month programme', desc: 'Deep work on your next career move.', monthly: '$1,450', priceNote: 'total', cta: 'Book a free call', features: '6 coaching sessions\nWorkbook and exercises\nMessage support\nCareer plan' }, { name: 'Team workshops', desc: 'For companies investing in their people.', monthly: 'Custom', priceNote: 'per workshop', cta: 'Enquire', features: 'Half or full day\nUp to 20 people\nFollow-up resources' }] } }],
      ['testimonials-carousel', { fields: { eyebrow: 'Client stories', heading: 'Where clients *are now*' } }],
      ['cta-newsletter', { fields: { heading: 'One *career insight* every Sunday', lead: 'Short, practical notes on careers, confidence and change. Read by 9,000 professionals.', proof: 'Join 9,000+ readers', button: 'Subscribe' } }],
      ['contact-split-form', { fields: { eyebrow: 'Contact', heading: 'Book your *free discovery call*', lead: 'Tell me a little about where you are and where you’d like to be. I’ll reply with times for a 30-minute call.', submit: 'Request a call' } }],
      ['footer-minimal', { fields: { logoText: 'Maya Chen Coaching', links: 'Services | #features\nPrograms | #pricing\nResults | #customers\nContact | #contact', logoIcon: 'lightbulb', copyright: '© 2026 Maya Chen Coaching' } }],
    ],
  },
  {
    id: 'event', name: 'Event & Conference Website', industry: 'Events',
    blurb: 'Stage hero with dates, why attend, speakers, schedule, ticket tiers, sponsors and FAQ.',
    theme: { brand: '#e879f9', brandText: '#1a0420', bg: '#0f0a1f', surface: '#1a1430', text: '#f5f3ff', muted: '#b7aed1', radius: '14', maxWidth: '1200' }, fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Event Website Template — Free Conference Landing Page HTML',
    seoDescription: 'Free event and conference website template: stage hero with dates and countdown stats, why attend, speakers, schedule, ticket tiers, sponsor logos and FAQ.',
    keywords: ['event website template', 'conference landing page template', 'event registration page html', 'summit website template'],
    intro: 'A high-energy page for conferences, meetups and festivals: a stage hero with the date and city, reasons to attend, the speaker line-up, the day’s schedule, ticket tiers that sell out, sponsor logos and the practical questions answered.',
    bestFor: ['Conferences and summits', 'Meetups and workshops', 'Festivals and launches'],
    sections: [
      ['navbar-announcement', { fields: { barText: '🎟️ Early-bird tickets end 30 September', barLink: 'Save 40%', barUrl: '#pricing', logoText: 'FRONTEND/26', logoIcon: 'code', login: '', cta: 'Get tickets', ctaUrl: '#pricing' }, lists: { links: links(['Speakers', '#team'], ['Schedule', '#features'], ['Tickets', '#pricing'], ['FAQ', '#faq']) } }],
      ['image-background-hero', { fields: { image: IMG('tpl-event.jpg'), eyebrow: '14–15 May 2026 · Amsterdam', headline: 'Two days of *the future of the web*', lead: 'Talks, workshops and parties with the people building the next generation of the web.', cta1: 'Get your ticket', cta1Url: '#pricing', cta2: 'See speakers', cta2Url: '#team', s1Value: '40', s1Label: 'speakers', s2Value: '1,500', s2Label: 'attendees', s3Value: '2', s3Label: 'days' } }],
      ['features-alternating', { fields: { eyebrow: 'Schedule', heading: 'What’s *on stage*' }, lists: { rows: [{ label: 'Day 1', title: 'Talks & *keynotes*', text: 'Twenty talks on performance, design systems, AI and the browser platform.', bullets: 'Opening keynote\n3 talk tracks\nEvening party', image: IMG('tpl-event.jpg'), imageAlt: 'Conference stage' }, { label: 'Day 2', title: 'Hands-on *workshops*', text: 'Small-group workshops with the speakers, from CSS to GSAP animation.', bullets: '12 workshops\nMax 25 people each\nLunch included', image: IMG('feature-collab.png'), imageAlt: 'Workshop board' }] } }],
      ['team-carousel', { fields: { eyebrow: 'Speakers', heading: 'Learn from *the best*', lead: 'Engineers, designers and leaders from the teams behind tools you use every day.' } }],
      ['pricing-three-tier', { fields: { eyebrow: 'Tickets', heading: 'Get your *ticket*', lead: 'Prices rise as tiers sell out. Group discounts for 5+.', note: 'All prices exclude VAT. Tickets are transferable.' }, toggles: { showBilling: false }, lists: { plans: [{ name: 'Conference', desc: 'Day 1 talks and party.', monthly: '€399', priceNote: 'early bird', cta: 'Buy ticket', features: 'All talks\nEvening party\nRecordings' }, { badge: 'Best value', name: 'Full pass', desc: 'Talks, workshops and everything else.', monthly: '€699', priceNote: 'early bird', cta: 'Buy full pass', features: 'All talks\n2 workshops\nParty and lunch\nRecordings' }, { name: 'Online', desc: 'Watch live from anywhere.', monthly: '€99', priceNote: 'per person', cta: 'Get online pass', features: 'Live stream\nChat Q&A\nRecordings' }] } }],
      ['logo-cloud', { fields: { heading: 'Proudly supported by *our sponsors*' } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Practical *info*' }, lists: { faqs: [{ q: 'Where is the venue?', a: 'At the Kromhout Hall in Amsterdam Noord, ten minutes by free ferry from Central Station.' }, { q: 'Can I transfer my ticket?', a: 'Yes, free of charge until one week before the event.' }, { q: 'Will talks be recorded?', a: 'Yes. Every ticket includes access to all recordings after the event.' }, { q: 'Is there a code of conduct?', a: 'Yes. We’re committed to a safe, welcoming event for everyone; read it on our website.' }] } }],
      ['footer-giant', { fields: { heading: 'See you in *Amsterdam*', cta: 'Get your ticket', ctaUrl: '#pricing', email: 'hello@frontend26.dev', links: 'Speakers | #team\nSchedule | #features\nTickets | #pricing\nFAQ | #faq', wordmark: 'FRONTEND/26', copyright: '© 2026 Frontend Conference' } }],
    ],
  },
  {
    id: 'nonprofit', name: 'Nonprofit & Charity Website', industry: 'Community',
    blurb: 'Mission hero, impact numbers, how donations help, programmes, stories, team, newsletter and donate CTA.',
    theme: { brand: '#15803d', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f8f2', text: '#0f1f14', muted: '#4b5f52', radius: '14', maxWidth: '1200' }, fonts: { heading: 'merriweather', body: 'inter' },
    seoTitle: 'Nonprofit Website Template — Free Charity HTML Template',
    seoDescription: 'Free nonprofit and charity website template: a mission hero, impact counters, how donations help, programmes, stories, team, newsletter and donate CTA.',
    keywords: ['nonprofit website template', 'charity website template html', 'ngo website template', 'donation landing page template'],
    intro: 'A hopeful, transparent page for charities and community groups: a clear mission over a sunrise landscape, the impact you have made so far, exactly how donations help, your programmes, stories from the people you support and an easy way to give.',
    bestFor: ['Charities and NGOs', 'Community groups and foundations', 'Fundraising campaigns'],
    sections: [
      ['navbar-simple', nav('GreenRoots', 'leaf', 'Donate', links(['Our work', '#features'], ['Impact', '#results'], ['Stories', '#customers'], ['Team', '#team']), { login: '', ctaUrl: '#get-started' })],
      ['image-background-hero', { fields: { image: IMG('tpl-nature.jpg'), eyebrow: 'Planting trees, growing communities', headline: 'Every tree is *a fresh start*', lead: 'We restore forests with the communities who live beside them, creating jobs, clean water and hope.', cta1: 'Donate today', cta1Url: '#get-started', cta2: 'See our impact', cta2Url: '#results', s1Value: '2.4M', s1Label: 'trees planted', s2Value: '38', s2Label: 'villages', s3Value: '1,100', s3Label: 'local jobs' } }],
      ['stats-counters', { fields: { eyebrow: 'Our impact', heading: 'What your support *has done*' }, lists: { stats: [{ value: '2.4M', label: 'Trees planted', note: 'since 2016' }, { value: '38', label: 'Villages', note: 'in 4 countries' }, { value: '1,100', label: 'Local jobs', note: 'mostly for women' }, { value: '92%', label: 'Of every donation', note: 'goes to projects' }] } }],
      ['features-steps', { fields: { eyebrow: 'How your gift helps', heading: 'From donation to *forest*', lead: 'Transparent from start to finish. Every tree is tracked and reported.', cta: 'Plant trees today' }, lists: { steps: [{ icon: 'heart', title: 'You give', text: '£10 plants and protects ten native trees.' }, { icon: 'users', title: 'Communities plant', text: 'Local teams grow, plant and care for every tree.' }, { icon: 'leaf', title: 'Forests return', text: 'Healthy forests bring back water, wildlife and income.' }] } }],
      ['features-icon-grid', { fields: { eyebrow: 'Our work', heading: 'Programmes that *last*', lead: 'We stay for at least ten years in every place we work.' }, lists: { features: [{ icon: 'leaf', title: 'Reforestation', text: 'Native trees planted and protected for a decade.' }, { icon: 'graduation-cap', title: 'Education', text: 'Environmental classes in 60 local schools.' }, { icon: 'briefcase', title: 'Livelihoods', text: 'Fair jobs and training for local families.' }] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Stories', heading: 'Voices from *the field*', lead: '' }, lists: { quotes: [{ quote: 'The forest brought the stream back. Our children can drink clean water again.', name: 'Amina K.', role: 'Community leader, Kenya', avatar: av(6) }, { quote: 'I trained as a nursery manager and now support my whole family.', name: 'Joseph M.', role: 'Tree nursery manager', avatar: av(2) }, { quote: 'Transparent reports every quarter. I know exactly what my donation did.', name: 'Laura S.', role: 'Monthly donor', avatar: av(3) }] } }],
      ['team-grid', { fields: { eyebrow: 'Our team', heading: 'The people *behind the trees*', lead: 'A small team in London and Nairobi, working with local partners.' } }],
      ['cta-gradient-banner', { fields: { heading: 'Plant trees *today*', lead: '£10 plants and protects ten native trees. Gift Aid adds 25% at no cost to you.', cta1: 'Donate now', cta2: 'Give monthly', note: 'Registered charity no. 1170000' } }],
      ['footer-newsletter', { fields: { logoText: 'GreenRoots', logoIcon: 'leaf', nlTitle: 'News from the field', nlText: 'Stories and impact updates, once a month.', copyright: '© 2026 GreenRoots Foundation · Registered charity no. 1170000' } }],
    ],
  },
  // Wedding, hotel, salon and law firm (starters-2.js)
  ...MORE_WEBSITE_TEMPLATES,
  // Podcast, product store, school and church (starters-3.js)
  ...EVEN_MORE_WEBSITE_TEMPLATES,
  ...MUSIC_WEBSITE_TEMPLATES,
];

// The sections added later (gallery, video, before / after, booking form, case studies, product grid)
export const WEBSITE_TEMPLATES = applyExtras(BASE_TEMPLATES);

export const websiteTemplateById = id => WEBSITE_TEMPLATES.find(x => x.id === id);
export const TEMPLATE_INDUSTRIES = [...new Set(WEBSITE_TEMPLATES.map(x => x.industry))];
