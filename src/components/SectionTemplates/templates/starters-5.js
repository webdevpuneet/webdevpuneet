/* Website templates, part 5: Corporate (a consulting, technology or professional-services group). Same shape as
   starters.js: home `sections`, hand-written `pages` for the multi-page version, `multiLinks` and home SEO.
   Appended to WEBSITE_TEMPLATES in starters.js. SEO text: seo-website-templates-5.js. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const cov = n => IMG(`blog-${n}.jpg`);
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));
const nav = (logoText, logoIcon, cta, list, extra = {}) => ({ fields: { logoText, logoIcon, cta, ctaUrl: '#contact', ...extra }, lists: { links: list } });

const LOGOS = ['logo-cloud', { fields: { heading: 'Trusted by *leaders in 40 countries*' }, lists: { logos: [
  { name: 'Northwind', icon: 'globe' }, { name: 'Halden Bank', icon: 'building-2' }, { name: 'Vantor', icon: 'rocket' },
  { name: 'Arcline', icon: 'layers' }, { name: 'Solace Health', icon: 'heart' }, { name: 'Kestrel Air', icon: 'zap' },
  { name: 'Orbit Retail', icon: 'target' }, { name: 'Fernhill', icon: 'leaf' },
] } }];

const SERVICES = ['features-bento', { anchor: 'services', fields: { eyebrow: 'What we do', heading: 'Strategy, technology and *the people to land it*', lead: 'Four practices that work as one team, so the plan you sign off is the plan that ships.' }, lists: { cards: [
  { icon: 'trending-up', title: 'Strategy & growth', text: 'Market entry, portfolio reviews and growth plans built on your own numbers, not a template deck.', image: IMG('feature-analytics.png'), imageAlt: 'A dashboard with a rising revenue chart' },
  { icon: 'cpu', title: 'Digital & technology', text: 'Platforms, data and AI delivered in small releases your teams can run.', image: '', imageAlt: '' },
  { icon: 'users', title: 'People & change', text: 'Operating models, leadership programmes and change that sticks after we leave.', image: '', imageAlt: '' },
  { icon: 'shield-check', title: 'Risk & compliance', text: 'Cyber, regulatory and supply-chain resilience, tested before a crisis tests it for you.', image: '', imageAlt: '' },
  { icon: 'leaf', title: 'Sustainability', text: 'Credible net-zero roadmaps with the finance behind them.', image: '', imageAlt: '' },
] } }];

const RESULTS = ['stats-dark-split', { anchor: 'results', style: { scheme: 'inverted' }, fields: { eyebrow: 'Results', heading: 'Numbers our clients *put in their annual report*', lead: 'We are paid on outcomes we can measure, and we publish them.', cta: 'See our work', ctaUrl: '#work', logosTitle: 'Selected clients' }, lists: { stats: [
  { icon: 'globe', value: '40+', label: 'Countries served' },
  { icon: 'briefcase', value: '1,200', label: 'Projects delivered' },
  { icon: 'trending-up', value: '€3.4B', label: 'Value created for clients' },
  { icon: 'thumbs-up', value: '94%', label: 'Clients who come back' },
] } }];

const CASES = ['case-study-showcase', { anchor: 'work', fields: { eyebrow: 'Our work', heading: 'Change you can *measure*', lead: 'Three recent engagements, with the numbers the client signed off.' }, lists: { cases: [
  { image: IMG('hero-dashboard.png'), imageAlt: 'An analytics dashboard on a laptop', client: 'Halden Bank', tag: 'Digital', headline: 'Moving 2 million customers to one mobile app', summary: 'Five legacy apps became one, released market by market with no downtime and a calmer contact centre.', stat1: '+38%', label1: 'Active users', stat2: '-52%', label2: 'Support calls', stat3: '14', label3: 'Months, on budget', quote: 'The team felt like part of ours from the first week.', person: 'Ingrid Solberg', role: 'Chief Digital Officer', linkText: 'Read the case study', url: '#' },
  { image: IMG('feature-automation.png'), imageAlt: 'A workflow diagram connecting warehouse and store systems', client: 'Orbit Retail', tag: 'Operations', headline: 'Cutting delivery times across 600 stores', summary: 'A new stock model and a single order system took two days off delivery and freed up cash held in inventory.', stat1: '-2 days', label1: 'Delivery time', stat2: '€46M', label2: 'Cash released', stat3: '600', label3: 'Stores live', quote: 'Our store teams noticed the change within a month.', person: 'Marcus Webb', role: 'COO', linkText: 'Read the case study', url: '#' },
  { image: IMG('hero-landscape.jpg'), imageAlt: 'Wind turbines on a hillside at sunrise', client: 'Vantor Energy', tag: 'Sustainability', headline: 'A net-zero plan the board could fund', summary: 'We priced every step of the route to 2040 and found a path that pays for itself by year six.', stat1: '-61%', label1: 'Emissions by 2035', stat2: 'Year 6', label2: 'Payback', stat3: '€180M', label3: 'Green bond raised', quote: 'The first plan we have seen where the numbers survived the CFO.', person: 'Dr. Amara Okafor', role: 'Chair, Sustainability Committee', linkText: 'Read the case study', url: '#' },
] } }];

const LEADERS = ['team-accordion', { anchor: 'team', fields: { eyebrow: 'Leadership', heading: 'The partners *you will work with*', lead: 'Every engagement is led by a partner who stays on it from the pitch to the final report.', defaultOpen: '1' }, lists: { members: [
  { photo: av(4), photoAlt: 'Portrait of Helena Voss', name: 'Helena Voss', role: 'Managing partner', bio: 'Twenty years advising boards on growth and turnarounds. Chairs our global practice committee.', s1Icon: 'linkedin', s1Url: 'https://www.linkedin.com/', s1Label: 'LinkedIn', s2Icon: 'twitter', s2Url: 'https://x.com/', s2Label: 'X', s3Icon: '', s3Url: '', s3Label: '' },
  { photo: av(1), photoAlt: 'Portrait of David Mensah', name: 'David Mensah', role: 'Head of digital & technology', bio: 'Former CTO of a European bank. Leads the platform, data and AI teams.', s1Icon: 'linkedin', s1Url: 'https://www.linkedin.com/', s1Label: 'LinkedIn', s2Icon: '', s2Url: '', s2Label: '', s3Icon: '', s3Url: '', s3Label: '' },
  { photo: av(5), photoAlt: 'Portrait of Priya Raman', name: 'Priya Raman', role: 'Head of risk & compliance', bio: 'Built regulatory programmes in three continents. Leads our cyber and resilience work.', s1Icon: 'linkedin', s1Url: 'https://www.linkedin.com/', s1Label: 'LinkedIn', s2Icon: '', s2Url: '', s2Label: '', s3Icon: '', s3Url: '', s3Label: '' },
  { photo: av(2), photoAlt: 'Portrait of Tomás Duarte', name: 'Tomás Duarte', role: 'Head of sustainability', bio: 'Climate economist who helped three governments write their net-zero plans.', s1Icon: 'linkedin', s1Url: 'https://www.linkedin.com/', s1Label: 'LinkedIn', s2Icon: '', s2Url: '', s2Label: '', s3Icon: '', s3Url: '', s3Label: '' },
] } }];

const QUOTE = ['testimonial-spotlight', { anchor: 'customers', fields: { company: 'Halden Bank', quote: 'Meridian did not hand us a report and leave. They stayed until the app was in our customers’ hands and our own people could run it.', photo: av(3), photoAlt: 'Portrait of Ingrid Solberg', name: 'Ingrid Solberg', role: 'Chief Digital Officer, Halden Bank', link: 'Read the Halden story', linkUrl: '#work' }, lists: { stats: [{ value: '+38%', label: 'Active users' }, { value: '-52%', label: 'Support calls' }, { value: '14 mo', label: 'Start to finish' }] } }];

const INSIGHTS = ['blog-cards', { anchor: 'insights', fields: { eyebrow: 'Insights', heading: 'Ideas for *the next decision*', allLink: 'All insights', allUrl: '#insights' }, lists: { posts: [
  { image: cov(1), imageAlt: 'A boardroom table with laptops and notes', category: 'Strategy', date: '12 Oct 2026', readTime: '7 min read', title: 'Why most growth plans stall in year two', excerpt: 'The pattern we see across 80 plans, and the three checks that catch it early.', author: 'Helena Voss', avatar: av(4), avatarAlt: 'Helena Voss', url: '#' },
  { image: cov(2), imageAlt: 'Abstract data lines over a city skyline', category: 'Technology', date: '3 Oct 2026', readTime: '6 min read', title: 'AI in the back office: where it pays back first', excerpt: 'Five places finance, HR and procurement are getting real returns today.', author: 'David Mensah', avatar: av(1), avatarAlt: 'David Mensah', url: '#' },
  { image: cov(3), imageAlt: 'A wind farm over green hills', category: 'Sustainability', date: '24 Sep 2026', readTime: '8 min read', title: 'Pricing the route to net zero', excerpt: 'How to turn a target into a budget your board will actually approve.', author: 'Tomás Duarte', avatar: av(2), avatarAlt: 'Tomás Duarte', url: '#' },
] } }];

const BANNER = ['cta-gradient-banner', { anchor: 'get-started', fields: { heading: 'Let’s talk about *what comes next*', lead: 'A 30-minute call with a partner, no slides and no obligation. Tell us the decision in front of you.', cta1: 'Book a conversation', cta1Url: '#contact', cta2: 'Download our approach', cta2Url: '#', note: 'We reply within one working day.' } }];

const CONTACT = ['contact-split-form', { anchor: 'contact', fields: { eyebrow: 'Contact', heading: 'Start *a conversation*', lead: 'Tell us about the challenge and a partner will reply within one working day. Everything you share is covered by our standard NDA.', submit: 'Send message', note: 'We never share your details.' }, lists: { methods: [
  { icon: 'mail', label: 'New business', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
  { icon: 'phone', label: 'Call us', value: '+44 20 7946 0000', url: 'tel:+442079460000' },
  { icon: 'map-pin', label: 'Head office', value: '1 Bishopsgate, London EC2N 3AQ', url: '' },
] } }];

const FOOTER = ['footer-columns', { fields: { logoText: 'Meridian', logoIcon: 'globe', tagline: 'Strategy, technology and change for organisations that plan to be around in fifty years.', copyright: '© 2026 Meridian Group Ltd.' }, lists: { socials: [
  { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' }, { icon: 'twitter', label: 'X', url: 'https://x.com/' }, { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' },
], columns: [
  { title: 'Services', links: 'Strategy & growth | #services\nDigital & technology | #services\nPeople & change | #services\nRisk & compliance | #services' },
  { title: 'Firm', links: 'Our work | #work\nLeadership | #team\nInsights | #insights\nCareers | #team' },
  { title: 'Contact', links: 'Start a conversation | #contact\nPress | #contact\nPrivacy | #\nTerms | #' },
] } }];

export const CORPORATE_WEBSITE_TEMPLATES = [
  {
    id: 'corporate', name: 'Corporate & Consulting Website', industry: 'Business',
    blurb: 'Floating navbar, split hero, client logos, bento services, dark results, case studies, leadership, quote, insights and contact.',
    theme: { brand: '#2f5bff', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f5fb', text: '#0b1530', muted: '#5a6785', radius: '16', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Corporate Website Template — Free Business HTML Template',
    seoDescription: 'Free corporate website template: split hero, client logos, bento services, results counters, case studies, leadership team, insights and contact. Export HTML.',
    keywords: ['corporate website template', 'business website template', 'consulting website template', 'company website html', 'professional services website template', 'b2b website template'],
    intro: 'A confident, modern home for a consultancy, agency group or professional-services firm: a clear promise with a product shot above the fold, client logos, a bento grid of services, headline results on a dark band, case studies with real numbers, the partners behind the work, a client quote, fresh insights and a simple way to start a conversation.',
    bestFor: ['Consulting and advisory firms', 'Technology and IT services companies', 'Law, finance and other professional services'],
    sections: [
      ['navbar-floating', nav('Meridian', 'globe', 'Talk to us', links(['Services', '#services'], ['Work', '#work'], ['Leadership', '#team'], ['Insights', '#insights'], ['Contact', '#contact']), { ctaUrl: '#contact' })],
      ['saas-split-hero', { fields: { badge: 'Named a top 10 digital consultancy 2026', badgeUrl: '#results', headline: 'Strategy that *ships*. Change that *lasts*.', lead: 'Meridian helps leadership teams decide what to do next, then stays to make it work: strategy, technology and people, delivered as one team.', cta1: 'Book a conversation', cta1Url: '#contact', cta2: 'See our work', cta2Url: '#work', proof: 'Trusted by 300+ organisations in 40 countries', image: IMG('hero-dashboard.png'), imageAlt: 'A performance dashboard on a laptop screen' } }],
      LOGOS, SERVICES, RESULTS, CASES, LEADERS, QUOTE, INSIGHTS, BANNER, CONTACT, FOOTER,
    ],
    multiLinks: { '#services': 'services.html', '#work': 'work.html', '#team': 'about.html', '#insights': 'insights.html', '#contact': 'contact.html' },
    homeTitle: 'Meridian: Strategy, Technology and Change Consultancy',
    homeDescription: 'Meridian is a global consultancy that helps leadership teams decide what to do next and then makes it work. See our services, case studies and results.',
    pages: [
      {
        name: 'Services', slug: 'services',
        title: 'Services: Strategy, Digital, People and Risk | Meridian',
        description: 'Meridian services: strategy and growth, digital and technology, people and change, risk and compliance, and sustainability, delivered by one joined-up team.',
        sections: [SERVICES, LOGOS, QUOTE, BANNER],
      },
      {
        name: 'Work', slug: 'work',
        title: 'Our Work: Case Studies With Measured Results | Meridian',
        description: 'Case studies from Meridian: a bank app for two million customers, faster deliveries across 600 stores and a funded net-zero plan, each with the numbers.',
        sections: [CASES, RESULTS, ['cta-gradient-banner', { fields: { heading: 'Want *results like these?*', lead: 'Tell us the decision in front of you and a partner will call within one working day.', cta1: 'Book a conversation', cta1Url: 'contact.html', cta2: '', cta2Url: '', note: '' } }]],
      },
      {
        name: 'Insights', slug: 'insights',
        title: 'Insights: Strategy, Technology and Net Zero | Meridian',
        description: 'Practical articles from Meridian partners on growth plans, AI in the back office and pricing the route to net zero, written for people who make the decisions.',
        sections: [['blog-featured'], INSIGHTS, ['cta-newsletter', { fields: { heading: 'The *Monday brief*', lead: 'One idea for your next decision, every Monday morning. Read by 18,000 leaders.', proof: '18,000 readers', button: 'Subscribe' } }]],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Meridian: Our Partners, Values and Careers Team',
        description: 'Meet the Meridian partners and see how we work: an employee-owned global team of 2,400 people advising on strategy, technology and change. Careers open.',
        sections: [
          ['stats-counters', { fields: { eyebrow: 'About Meridian', heading: 'Built *to last*', lead: 'Founded in London in 1998 and still owned by the people who work here.' }, lists: { stats: [
            { value: '2,400', label: 'People', note: 'in 28 offices' }, { value: '1998', label: 'Founded', note: 'in London' }, { value: '40+', label: 'Countries', note: 'served' }, { value: '100%', label: 'Employee-owned', note: 'no outside investors' },
          ] } }],
          LEADERS,
          ['team-hiring', { fields: { eyebrow: 'Careers', heading: 'Do the best work *of your career*', lead: 'We hire curious people and give them real clients early.', ctaUrl: 'contact.html' } }],
        ],
      },
      {
        name: 'Contact', slug: 'contact',
        title: 'Contact Meridian: Start a Conversation With a Partner',
        description: 'Contact Meridian for new business, press or careers. Send a short note about your challenge and a partner will reply personally within one working day.',
        sections: [['contact-cards'], ['contact-split-form', { fields: { eyebrow: 'Contact', heading: 'Start *a conversation*', lead: 'Tell us about the challenge and a partner will reply within one working day.' }, lists: { methods: [
          { icon: 'mail', label: 'New business', value: 'hello@webdevpuneet.com', url: 'mailto:hello@webdevpuneet.com' },
          { icon: 'map-pin', label: 'Head office', value: '1 Bishopsgate, London EC2N 3AQ', url: '' },
        ] } }]],
      },
    ],
  },
];
