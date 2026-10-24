/* More website templates (podcast, product store, school, church). Same shape as starters.js:
   home `sections`, hand-written `pages` for the multi-page version, `multiLinks` and home SEO.
   Appended to WEBSITE_TEMPLATES in starters.js. Art: scripts/make-template-art-3.cjs. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));
const nav = (logoText, logoIcon, cta, list, extra = {}) => ({ fields: { logoText, logoIcon, cta, ctaUrl: '#contact', ...extra }, lists: { links: list } });

export const EVEN_MORE_WEBSITE_TEMPLATES = [
  /* ── Podcast ──────────────────────────────────────────────────────────── */
  {
    id: 'podcast', name: 'Podcast Website', industry: 'Creative',
    blurb: 'Studio hero with listen links, the latest episodes, where to listen, your hosts, listener reviews and a newsletter.',
    theme: { brand: '#f97316', brandText: '#ffffff', bg: '#0f0a1a', surface: '#1c1430', text: '#f5f3ff', muted: '#b4aac8', radius: '16', maxWidth: '1200' }, fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Podcast Website Template — Free Show & Episodes HTML',
    seoDescription: 'Free podcast website template: a studio hero with listen links, the latest episodes, where to listen, meet the hosts, listener reviews and a newsletter sign-up.',
    keywords: ['podcast website template', 'podcast landing page', 'free podcast website html', 'podcast episodes page', 'show website template'],
    intro: 'A dark, studio-lit home for your show: a hero with the next episode and listen links, the latest episodes with show notes, every app people can listen on, the hosts behind the mic, reviews from listeners and a newsletter so fans never miss a drop.',
    bestFor: ['Interview and conversation podcasts', 'Indie and company podcasts', 'Hosts building a mailing list'],
    sections: [
      ['navbar-simple', nav('Off the Record', 'headphones', 'Subscribe', links(['Episodes', '#blog'], ['Listen', '#features'], ['Hosts', '#team'], ['Reviews', '#customers']), { login: '', ctaUrl: '#get-started' })],
      ['image-background-hero', { fields: { image: IMG('tpl-podcast.jpg'), eyebrow: 'New episode every Tuesday', headline: 'Honest talks with *people who build things*', lead: 'Founders, designers and makers on what really happened: the near misses, the lucky breaks and what they would do differently.', cta1: 'Play the latest', cta1Url: '#blog', cta2: 'All episodes', cta2Url: '#blog', s1Value: '142', s1Label: 'episodes', s2Value: '4.9★', s2Label: 'on Apple Podcasts', s3Value: '60k', s3Label: 'monthly listeners' } }],
      ['blog-list', { fields: { eyebrow: 'Latest episodes', heading: 'Fresh from *the studio*', allLink: 'All episodes', allUrl: '#blog' }, lists: { posts: [
        { image: IMG('blog-1.jpg'), imageAlt: 'Episode artwork with a laptop on a desk', category: 'Ep. 142', date: 'Oct 21, 2026', readTime: '54 min', title: 'Shipping a product with three people and no investors', excerpt: 'Lena Ortiz on staying small on purpose, pricing from day one and the feature she is glad she never built.', author: 'Lena Ortiz', avatar: av(2), avatarAlt: 'Lena Ortiz', url: '#' },
        { image: IMG('blog-2.jpg'), imageAlt: 'Episode artwork with sticky notes on a wall', category: 'Ep. 141', date: 'Oct 14, 2026', readTime: '47 min', title: 'The redesign that almost sank the company', excerpt: 'A design lead on a launch that went wrong, the week that followed and how they won their users back.', author: 'Sam Rivera', avatar: av(3), avatarAlt: 'Sam Rivera', url: '#' },
        { image: IMG('blog-3.jpg'), imageAlt: 'Episode artwork with a coffee cup and notebook', category: 'Ep. 140', date: 'Oct 7, 2026', readTime: '61 min', title: 'From side project to 40 employees', excerpt: 'How a weekend tool became a real business, and the moment the founder realised it was time to hire.', author: 'Priya Nair', avatar: av(5), avatarAlt: 'Priya Nair', url: '#' },
      ] } }],
      ['features-icon-grid', { fields: { eyebrow: 'Listen anywhere', heading: 'Find us on *your favourite app*', lead: 'Free on every major platform. Follow the show and new episodes arrive on Tuesday morning.' }, lists: { features: [
        { icon: 'headphones', title: 'Apple Podcasts', text: 'Follow and rate the show on iPhone, iPad and Mac.', link: 'Listen', url: '#' },
        { icon: 'youtube', title: 'YouTube', text: 'Full video episodes, plus short clips of the best moments.', link: 'Watch', url: '#' },
        { icon: 'smartphone', title: 'Spotify', text: 'Every episode, with chapters and comments.', link: 'Listen', url: '#' },
        { icon: 'globe', title: 'RSS', text: 'Paste our feed into any podcast app you like.', link: 'Copy the feed', url: '#' },
      ] } }],
      ['team-grid', { fields: { eyebrow: 'Your hosts', heading: 'The voices *behind the mic*', lead: 'Two friends who have built, broken and rebuilt products for fifteen years.' }, lists: { members: [
        { photo: av(1), photoAlt: 'Jordan Blake', name: 'Jordan Blake', role: 'Host', bio: 'Former startup founder who now asks the questions he wished someone had asked him.', linkedin: 'https://www.linkedin.com/', x: 'https://x.com/' },
        { photo: av(4), photoAlt: 'Maya Chen', name: 'Maya Chen', role: 'Co-host & producer', bio: 'Product designer, editor and the reason every episode sounds this good.', linkedin: 'https://www.linkedin.com/', x: 'https://x.com/' },
      ] } }],
      ['testimonials-marquee', { fields: { eyebrow: 'Listener reviews', heading: 'What listeners *say*', lead: 'Over 2,000 five-star ratings on Apple Podcasts.' }, lists: {
        row1: [
          { quote: 'The only show I listen to on the day it comes out. Honest, funny and genuinely useful.', name: 'Nora Quinn', role: 'Product manager', avatar: av(2) },
          { quote: 'Episode 120 changed how I price my product. I went back and listened to it twice.', name: 'Leo Martins', role: 'Indie founder', avatar: av(3) },
          { quote: 'Finally a business podcast that talks about the failures, not just the wins.', name: 'Zara Ahmed', role: 'Designer', avatar: av(5) },
          { quote: 'Perfect length for my commute, and the show notes are full of links I actually use.', name: 'Ben Cole', role: 'Engineer', avatar: av(6) },
        ],
        row2: [
          { quote: 'Jordan asks the follow-up question every other host forgets to ask.', name: 'Hana Sato', role: 'Startup founder', avatar: av(7) },
          { quote: 'I recommend it to every new hire on my team.', name: 'Omar Haddad', role: 'Head of design', avatar: av(8) },
          { quote: 'Warm, curious and never boring. My favourite part of Tuesday.', name: 'Chloe Dubois', role: 'Writer', avatar: av(4) },
          { quote: 'The burnout episode came at exactly the right time for me. Thank you.', name: 'Ravi Shah', role: 'Agency owner', avatar: av(1) },
        ],
      } }],
      ['cta-newsletter', { fields: { icon: 'mail', heading: 'Never miss *an episode*', lead: 'Show notes, links and one extra story from the guest, every Tuesday.', proof: 'Join 18,000 listeners', button: 'Subscribe', note: 'Free. Unsubscribe any time.' } }],
      ['footer-minimal', { fields: { logoText: 'Off the Record', logoIcon: 'headphones', links: 'Episodes | #blog\nListen | #features\nHosts | #team\nReviews | #customers', copyright: '© 2026 Off the Record Podcast' } }],
    ],
    multiLinks: { '#blog': 'episodes.html', '#team': 'about.html' },
    homeTitle: 'Off the Record: A Weekly Podcast About Building Products',
    homeDescription: 'Off the Record is a weekly show with founders, designers and makers on what really happened. New episodes each Tuesday on Apple Podcasts, Spotify and YouTube.',
    pages: [
      {
        name: 'Episodes', slug: 'episodes',
        title: 'All Episodes of Off the Record, the Product Podcast',
        description: 'Every episode of Off the Record: long conversations with founders, designers and makers about shipping, hiring, pricing and the mistakes they learned from.',
        sections: [
          ['blog-cards', { fields: { eyebrow: 'Episodes', heading: 'Every *conversation*', allLink: '', allUrl: '#' }, lists: { posts: [
            { image: IMG('blog-1.jpg'), imageAlt: 'Episode artwork with a laptop on a desk', category: 'Ep. 142', date: 'Oct 21, 2026', readTime: '54 min', title: 'Shipping a product with three people and no investors', excerpt: 'Lena Ortiz on staying small on purpose and pricing from day one.', author: 'Lena Ortiz', avatar: av(2), avatarAlt: 'Lena Ortiz', url: '#' },
            { image: IMG('blog-2.jpg'), imageAlt: 'Episode artwork with sticky notes on a wall', category: 'Ep. 141', date: 'Oct 14, 2026', readTime: '47 min', title: 'The redesign that almost sank the company', excerpt: 'A launch that went wrong and how they won their users back.', author: 'Sam Rivera', avatar: av(3), avatarAlt: 'Sam Rivera', url: '#' },
            { image: IMG('blog-3.jpg'), imageAlt: 'Episode artwork with a coffee cup and notebook', category: 'Ep. 140', date: 'Oct 7, 2026', readTime: '61 min', title: 'From side project to 40 employees', excerpt: 'How a weekend tool became a real business.', author: 'Priya Nair', avatar: av(5), avatarAlt: 'Priya Nair', url: '#' },
            { image: IMG('blog-4.jpg'), imageAlt: 'Episode artwork with a city skyline', category: 'Ep. 139', date: 'Sep 30, 2026', readTime: '50 min', title: 'Hiring your first ten people', excerpt: 'What to look for, what to skip and the interview question that never fails.', author: 'Tom Okafor', avatar: av(6), avatarAlt: 'Tom Okafor', url: '#' },
            { image: IMG('blog-5.jpg'), imageAlt: 'Episode artwork with a mountain trail', category: 'Ep. 138', date: 'Sep 23, 2026', readTime: '44 min', title: 'Burnout, rest and running a company', excerpt: 'An honest talk about pace, and the habits that saved one founder’s health.', author: 'Ana Silva', avatar: av(7), avatarAlt: 'Ana Silva', url: '#' },
            { image: IMG('blog-6.jpg'), imageAlt: 'Episode artwork with a sketchbook', category: 'Ep. 137', date: 'Sep 16, 2026', readTime: '58 min', title: 'Designing for people who hate software', excerpt: 'Making complex tools feel simple for farmers, nurses and builders.', author: 'Kai Müller', avatar: av(8), avatarAlt: 'Kai Müller', url: '#' },
          ] } }],
          ['cta-newsletter', { fields: { icon: 'mail', heading: 'Get every *new episode*', lead: 'Show notes and links in your inbox every Tuesday.', proof: 'Join 18,000 listeners', button: 'Subscribe', note: 'Free. Unsubscribe any time.' } }],
        ],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Off the Record: Meet the Hosts Jordan & Maya',
        description: 'Meet Jordan Blake and Maya Chen, the hosts of Off the Record. Learn why we started the show, how we choose guests and how to pitch a story or sponsor the show.',
        sections: [
          ['team-grid', { fields: { eyebrow: 'Your hosts', heading: 'The voices *behind the mic*', lead: 'Two friends who have built, broken and rebuilt products for fifteen years.' }, lists: { members: [
            { photo: av(1), photoAlt: 'Jordan Blake', name: 'Jordan Blake', role: 'Host', bio: 'Former startup founder who now asks the questions he wished someone had asked him.', linkedin: 'https://www.linkedin.com/', x: 'https://x.com/' },
            { photo: av(4), photoAlt: 'Maya Chen', name: 'Maya Chen', role: 'Co-host & producer', bio: 'Product designer, editor and the reason every episode sounds this good.', linkedin: 'https://www.linkedin.com/', x: 'https://x.com/' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'Questions', heading: 'Be a guest, *or a sponsor*', lead: 'How we pick guests and work with brands.', contactText: 'Have a story to tell?', contactLink: 'Email the show', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
            { q: 'How do you choose guests?', a: 'We look for people who built something real and will talk honestly about the hard parts, not just the wins.' },
            { q: 'Can I pitch myself or a client?', a: 'Yes. Send a short note with the story you want to tell and why our listeners would care.' },
            { q: 'Do you take sponsors?', a: 'One sponsor per episode, read by the hosts, and only for products we would use ourselves.' },
            { q: 'How long is an episode?', a: 'Usually 45 to 60 minutes, with chapters so you can jump to the part you want.' },
          ] } }],
        ],
      },
    ],
  },

  /* ── Product store ────────────────────────────────────────────────────── */
  {
    id: 'product-store', name: 'Product Landing Page Store', industry: 'Retail',
    blurb: 'One product sold well: a product hero, features in detail, specs, reviews, a buy box with a guarantee, FAQ and a final CTA.',
    theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f9ff', text: '#0f172a', muted: '#475569', radius: '18', maxWidth: '1200' }, fonts: { heading: 'jakarta', body: 'inter' },
    seoTitle: 'Product Landing Page Template — Free E-commerce HTML',
    seoDescription: 'Free landing page template for selling one product: a product hero, features in detail, customer reviews, a buy box with a guarantee, FAQ and a final CTA.',
    keywords: ['product landing page template', 'single product website template', 'e-commerce landing page html', 'product page template free', 'shopify product page alternative'],
    intro: 'Everything a single-product store needs to turn visitors into buyers: a clean product hero with price and rating, the features that matter explained with images, real customer reviews, a buy box with shipping and a money-back guarantee, answers to the usual questions and a final push to order.',
    bestFor: ['Brands selling one hero product', 'Kickstarter and pre-order launches', 'Shopify or Gumroad product pages'],
    sections: [
      ['navbar-announcement', nav('Sona', 'headphones', 'Buy now', links(['Features', '#features'], ['Reviews', '#customers'], ['Pricing', '#pricing'], ['FAQ', '#faq']), { login: '', ctaUrl: '#pricing', barText: 'Free shipping and 30-day returns on every order', barLink: 'Learn more', barUrl: '#faq' })],
      ['app-product-hero', { fields: { eyebrow: 'Sona One · wireless headphones', headline: 'Quiet the world. *Hear everything.*', lead: 'Adaptive noise cancelling, 40-hour battery and a sound that stays clear at any volume. Designed to be worn all day.', iosLabel: 'Buy now · $199', iosUrl: '#pricing', androidLabel: 'See features', androidUrl: '#features', rating: '4.8 from 3,200 reviews', image: IMG('tpl-product.jpg'), imageAlt: 'Sona One wireless headphones on a white stand', card1Title: '40 h', card1Text: 'battery life', card2Title: '−35 dB', card2Text: 'noise cancelling' } }],
      ['features-alternating', { fields: { eyebrow: 'Features', heading: 'Made for *long days*', lead: 'Every detail tested on flights, commutes and eight-hour work days.' }, lists: { rows: [
        { label: 'Noise cancelling', title: 'Silence that adapts to you', text: 'Six microphones listen to the room and adjust 50,000 times a second, from a quiet office to a jet engine.', bullets: 'Adaptive and transparency modes\nWind noise reduction\nClear calls in busy streets', link: '', url: '#', image: IMG('tpl-product.jpg'), imageAlt: 'Sona One headphones close up' },
        { label: 'Comfort', title: 'Light enough to forget', text: 'At 250 g with memory-foam cushions and a padded band, Sona One stays comfortable all day.', bullets: 'Memory-foam ear cushions\nFolds flat into the case\nReplaceable cushions', link: '', url: '#', image: IMG('hero-phone.png'), imageAlt: 'The Sona companion app on a phone' },
        { label: 'Battery', title: '40 hours, and 5 more in 5 minutes', text: 'A full week of commuting on one charge. Forgot to charge? Five minutes on USB-C gives five hours.', bullets: 'USB-C fast charging\nAuto pause when removed\nWorks wired with the battery flat', link: '', url: '#', image: IMG('feature-analytics.png'), imageAlt: 'Battery life chart in the app' },
      ] } }],
      ['stats-counters', { fields: { eyebrow: 'Why people switch', heading: 'Numbers that *speak*' }, lists: { stats: [{ value: '40 h', label: 'Battery life', note: 'with noise cancelling on' }, { value: '250 g', label: 'Weight', note: 'lighter than most' }, { value: '4.8★', label: 'Average rating', note: 'from 3,200 reviews' }, { value: '30 days', label: 'Free returns', note: 'no questions asked' }] } }],
      ['testimonials-grid', { fields: { eyebrow: 'Reviews', heading: 'Loved by *3,200 listeners*', lead: '' }, lists: { quotes: [
        { quote: 'I wore them on a 14-hour flight and only took them off to eat. The noise cancelling is unreal.', name: 'Hannah L.', role: 'Verified buyer', avatar: av(2) },
        { quote: 'Calls sound clear even on a windy street. My team stopped asking me to repeat myself.', name: 'Marcus T.', role: 'Verified buyer', avatar: av(3) },
        { quote: 'Comfortable all day with glasses, which I could never say about my old pair.', name: 'Ines R.', role: 'Verified buyer', avatar: av(5) },
      ] } }],
      ['pricing-single-plan', { fields: { eyebrow: 'Order', heading: 'Get *Sona One*', lead: 'Free shipping, free returns and a two-year warranty.', includedTitle: 'In the box', included: 'Sona One headphones\nHard carry case\nUSB-C cable and 3.5 mm audio cable\nTwo-year warranty', plan: 'Sona One', planNote: 'Midnight black or cloud white', monthly: '$199', yearly: '$179', cta: 'Add to cart', ctaUrl: '#', guarantee: '30-day money-back guarantee', billMonthly: 'One pair', billYearly: 'Two pairs', billSave: 'Save 10%', perMonth: '', perYear: 'each' } }],
      ['faq-accordion', { fields: { eyebrow: 'FAQ', heading: 'Questions, *answered*', lead: 'Shipping, returns and compatibility.', contactText: 'Still unsure?', contactLink: 'Chat with us', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
        { q: 'How fast is shipping?', a: 'Orders ship within one business day. Delivery takes 2 to 5 days in the US and EU, and it is free.' },
        { q: 'Can I return them?', a: 'Yes. Send them back within 30 days for a full refund, even if you have used them.' },
        { q: 'Do they work with my phone?', a: 'Sona One works with any Bluetooth device, and connects to two at once, like your phone and laptop.' },
        { q: 'What does the warranty cover?', a: 'Two years against any defect. We repair or replace them, and we pay for shipping both ways.' },
      ] } }],
      ['cta-gradient-banner', { fields: { heading: 'Hear the difference *today*', lead: 'Try Sona One for 30 days. If you don’t love them, send them back for free.', cta1: 'Buy now · $199', cta1Url: '#pricing', cta2: 'Compare models', cta2Url: '#features', note: 'Free shipping · 2-year warranty' } }],
      ['footer-columns', { fields: { logoText: 'Sona', logoIcon: 'headphones', tagline: 'Headphones designed for long days and quiet minds.', copyright: '© 2026 Sona Audio' } }],
    ],
    multiLinks: { '#faq': 'support.html' },
    homeTitle: 'Sona One Wireless Headphones: 40-Hour Noise Cancelling',
    homeDescription: 'Sona One wireless headphones with adaptive noise cancelling, a 40-hour battery and all-day comfort. Free shipping, 30-day returns and a two-year warranty.',
    pages: [
      {
        name: 'Support', slug: 'support',
        title: 'Sona Support: Shipping, Returns, Warranty and Setup',
        description: 'Help with your Sona One headphones: shipping times, free 30-day returns, the two-year warranty, pairing with two devices and how to contact our support team.',
        sections: [
          ['faq-grid', { fields: { eyebrow: 'Support', heading: 'How can *we help?*', lead: 'Answers to the questions we get most.' }, lists: { faqs: [
            { q: 'How do I pair a second device?', a: 'Hold the power button for three seconds until the light flashes blue, then choose Sona One on the new device.' },
            { q: 'How do I reset my headphones?', a: 'Hold the power and noise buttons together for ten seconds. The light flashes white when the reset is done.' },
            { q: 'Where is my order?', a: 'Your tracking link is in your confirmation email. Orders ship within one business day.' },
            { q: 'How do I start a return?', a: 'Email us your order number. We send a free return label within a day.' },
            { q: 'Can I replace the ear cushions?', a: 'Yes. They clip on and off, and a spare pair costs $19.' },
            { q: 'Do you ship worldwide?', a: 'We ship to the US, Canada, the UK, the EU and Australia.' },
          ] } }],
          ['contact-cards', { fields: { eyebrow: 'Contact', heading: 'Talk to *a person*', lead: 'Our support team replies within a few hours, seven days a week.' } }],
        ],
      },
    ],
  },

  /* ── School ───────────────────────────────────────────────────────────── */
  {
    id: 'school', name: 'School Website', industry: 'Education',
    blurb: 'Welcoming school hero, key numbers, what pupils learn, a weekly timetable, staff, parent FAQ and how to visit.',
    theme: { brand: '#1d4ed8', brandText: '#ffffff', bg: '#ffffff', surface: '#eff6ff', text: '#0f172a', muted: '#475569', radius: '14', maxWidth: '1200' }, fonts: { heading: 'lora', body: 'dmsans' },
    seoTitle: 'School Website Template — Free Primary School HTML',
    seoDescription: 'Free school website template: a welcoming hero, key numbers, what pupils learn, a weekly timetable, meet the staff, answers for parents and a map to visit us.',
    keywords: ['school website template', 'primary school website html', 'free school website template', 'academy website template', 'kindergarten website template'],
    intro: 'A warm, clear site that answers what parents ask first: who you are, how pupils do, what they learn each day, who teaches them, how admissions and the school day work, and where to find you. Built for primary schools, academies and nurseries.',
    bestFor: ['Primary and secondary schools', 'Nurseries and kindergartens', 'Tutoring centres and academies'],
    sections: [
      ['navbar-simple', nav('Brookfield Primary', 'graduation-cap', 'Book a visit', links(['About', '#features'], ['Timetable', '#timetable'], ['Staff', '#team'], ['Parents', '#faq']), { login: 'Parent portal', loginUrl: '#' })],
      ['image-background-hero', { fields: { image: IMG('tpl-school.jpg'), eyebrow: 'Admissions open for September 2027', headline: 'A school where *every child is known*', lead: 'Small classes, outdoor learning every week and teachers who know each pupil by name. Come and see us in action.', cta1: 'Book a visit', cta1Url: '#contact', cta2: 'Admissions', cta2Url: '#faq', s1Value: '24', s1Label: 'pupils per class', s2Value: 'Good', s2Label: 'latest inspection', s3Value: '1932', s3Label: 'founded' } }],
      ['stats-counters', { fields: { eyebrow: 'Brookfield in numbers', heading: 'Small school, *big results*' }, lists: { stats: [{ value: '420', label: 'Pupils', note: 'ages 4 to 11' }, { value: '96%', label: 'Reading at age 11', note: 'at or above expected' }, { value: '30+', label: 'Clubs', note: 'before and after school' }, { value: '1:12', label: 'Adult to pupil', note: 'in every classroom' }] } }],
      ['features-icon-grid', { fields: { eyebrow: 'Learning', heading: 'What our pupils *learn*', lead: 'A broad curriculum with time for curiosity, creativity and fresh air.' }, lists: { features: [
        { icon: 'file-text', title: 'Reading & writing', text: 'Daily phonics and a library visit every week.', link: '', url: '#' },
        { icon: 'chart-column', title: 'Maths', text: 'Hands-on lessons that build real confidence with numbers.', link: '', url: '#' },
        { icon: 'leaf', title: 'Forest school', text: 'A morning outdoors every week, whatever the weather.', link: '', url: '#' },
        { icon: 'palette', title: 'Art & music', text: 'Every child learns an instrument from Year 3.', link: '', url: '#' },
        { icon: 'globe', title: 'Languages', text: 'French and Spanish from Reception upward.', link: '', url: '#' },
        { icon: 'heart', title: 'Wellbeing', text: 'A school counsellor and calm spaces in every corridor.', link: '', url: '#' },
      ] } }],
      ['class-timetable', { fields: { eyebrow: 'The school day', heading: 'A week at *Brookfield*', lead: 'A typical week in Year 4. Every class has its own timetable on the parent portal.', colDay: 'Day', colTime: 'Time', colName: 'Lesson', colCoach: 'Teacher', colLevel: 'Where', note: 'Breakfast club from 7:45 am. After-school clubs until 5:30 pm.', cta: 'Download all timetables', ctaUrl: '#' }, lists: { classes: [
        { day: 'Mon', time: '9:00', name: 'Maths', coach: 'Mrs Patel', level: 'Classroom' },
        { day: 'Mon', time: '13:15', name: 'Science', coach: 'Mr Owusu', level: 'Lab' },
        { day: 'Tue', time: '9:00', name: 'Forest school', coach: 'Ms Green', level: 'Outdoors' },
        { day: 'Wed', time: '10:45', name: 'Music', coach: 'Mr Lewis', level: 'Music room' },
        { day: 'Thu', time: '9:00', name: 'Writing', coach: 'Mrs Patel', level: 'Classroom' },
        { day: 'Fri', time: '14:00', name: 'PE', coach: 'Coach Dunn', level: 'Hall' },
      ] } }],
      ['team-grid', { fields: { eyebrow: 'Our staff', heading: 'Meet the *team*', lead: 'Experienced teachers and support staff who love what they do.' }, lists: { members: [
        { photo: av(2), photoAlt: 'Mrs Helen Carter', name: 'Mrs Helen Carter', role: 'Headteacher', bio: 'Twenty years in primary education and a passion for outdoor learning.', linkedin: '', x: '' },
        { photo: av(3), photoAlt: 'Mr David Owusu', name: 'Mr David Owusu', role: 'Deputy head · Science', bio: 'Runs the science club and the annual rocket day.', linkedin: '', x: '' },
        { photo: av(5), photoAlt: 'Mrs Asha Patel', name: 'Mrs Asha Patel', role: 'Year 4 teacher', bio: 'Maths lead, chess club coach and keen gardener.', linkedin: '', x: '' },
        { photo: av(7), photoAlt: 'Ms Laura Green', name: 'Ms Laura Green', role: 'Forest school leader', bio: 'Qualified forest school practitioner and wildlife lover.', linkedin: '', x: '' },
      ] } }],
      ['faq-grid', { fields: { eyebrow: 'For parents', heading: 'Admissions & *the school day*', lead: 'The questions parents ask us most.' }, lists: { faqs: [
        { q: 'How do I apply for a place?', a: 'Apply through your local council for Reception. For other year groups, contact the school office about spaces.' },
        { q: 'What are the school hours?', a: 'Doors open at 8:40 am and the day ends at 3:15 pm. Breakfast and after-school clubs run from 7:45 am to 5:30 pm.' },
        { q: 'Do you provide lunches?', a: 'Yes. Hot lunches are cooked on site every day, with vegetarian and allergy-friendly options.' },
        { q: 'How do you support children with SEND?', a: 'Our SENCo works with families and teachers on a plan for every child who needs extra support.' },
        { q: 'Is there a uniform?', a: 'Yes, a simple navy uniform. Pre-loved items are free from our parent association.' },
        { q: 'Can we visit before applying?', a: 'Of course. We run tours most Tuesday and Thursday mornings. Book a place below.' },
      ] } }],
      ['contact-map', { fields: { eyebrow: 'Visit us', heading: 'Come and *say hello*', lead: 'Tours on Tuesday and Thursday mornings at 9:30 am. Please book ahead.' }, lists: { offices: [
        { city: 'Brookfield Primary School', address: '12 Mill Lane, Brookfield, BR1 4AB', hours: 'Office open 8:00 am – 4:30 pm, Mon to Fri', phone: '+44 20 7946 0100', phoneUrl: 'tel:+442079460100', email: 'office@webdevpuneet.com', emailUrl: 'mailto:office@webdevpuneet.com' },
      ] } }],
      ['footer-columns', { fields: { logoText: 'Brookfield Primary', logoIcon: 'graduation-cap', tagline: 'A school where every child is known.', copyright: '© 2026 Brookfield Primary School' } }],
    ],
    multiLinks: { '#faq': 'admissions.html', '#contact': 'visit.html' },
    homeTitle: 'Brookfield Primary School: Small Classes, Big Hearts',
    homeDescription: 'Brookfield Primary is a friendly school for ages 4 to 11 with small classes, weekly forest school and over 30 clubs. Admissions are open for September 2027.',
    pages: [
      {
        name: 'Admissions', slug: 'admissions',
        title: 'Admissions at Brookfield Primary School: How to Apply',
        description: 'How to apply for a place at Brookfield Primary School: Reception applications, in-year places, key dates, the school day, lunches, uniform and support for SEND.',
        sections: [
          ['features-steps', { fields: { eyebrow: 'Admissions', heading: 'Joining *Brookfield*', lead: 'Four simple steps from first visit to first day.', cta: 'Book a visit' }, lists: { steps: [
            { icon: 'calendar', title: 'Visit us', text: 'Join a tour on a Tuesday or Thursday morning.' },
            { icon: 'file-text', title: 'Apply', text: 'Apply through the council by 15 January for Reception.' },
            { icon: 'mail', title: 'Hear back', text: 'Offers are sent on 16 April each year.' },
            { icon: 'house', title: 'Settle in', text: 'Home visits and stay-and-play sessions in July.' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'For parents', heading: 'Common *questions*', lead: 'Admissions and the school day.', contactText: 'Anything else?', contactLink: 'Email the office', contactUrl: 'mailto:office@webdevpuneet.com' }, lists: { faqs: [
            { q: 'Which area do you take pupils from?', a: 'Most places go to children living closest to the school, after siblings and looked-after children.' },
            { q: 'Can my child join mid-year?', a: 'Yes, if a year group has space. Contact the office to check.' },
            { q: 'How do you support children with SEND?', a: 'Our SENCo works with families and teachers on a plan for every child who needs extra support.' },
            { q: 'Do you offer wraparound care?', a: 'Breakfast club from 7:45 am and after-school clubs until 5:30 pm.' },
          ] } }],
        ],
      },
      {
        name: 'Visit', slug: 'visit',
        title: 'Visit Brookfield Primary School: Tours and Directions',
        description: 'Book a tour of Brookfield Primary School on a Tuesday or Thursday morning. Find our address, office hours, phone number, parking and public transport.',
        sections: [
          ['contact-map', { fields: { eyebrow: 'Visit us', heading: 'Come and *say hello*', lead: 'Tours on Tuesday and Thursday mornings at 9:30 am. Please book ahead.' }, lists: { offices: [
            { city: 'Brookfield Primary School', address: '12 Mill Lane, Brookfield, BR1 4AB', hours: 'Office open 8:00 am – 4:30 pm, Mon to Fri', phone: '+44 20 7946 0100', phoneUrl: 'tel:+442079460100', email: 'office@webdevpuneet.com', emailUrl: 'mailto:office@webdevpuneet.com' },
          ] } }],
          ['contact-split-form', { fields: { eyebrow: 'Book a tour', heading: 'Choose *a morning*', lead: 'Tell us your child’s age and which morning suits you. We confirm within a day.', submit: 'Request a tour' } }],
        ],
      },
    ],
  },

  /* ── Church ───────────────────────────────────────────────────────────── */
  {
    id: 'church', name: 'Church Website', industry: 'Community',
    blurb: 'Chapel hero with service times, what to expect, a Sunday schedule that draws itself, groups, leaders, events and how to find us.',
    theme: { brand: '#7c3aed', brandText: '#ffffff', bg: '#fdfcff', surface: '#f5f3ff', text: '#1e1b2e', muted: '#5b5670', radius: '16', maxWidth: '1200' }, fonts: { heading: 'playfair', body: 'inter' },
    seoTitle: 'Church Website Template — Free Church & Ministry HTML',
    seoDescription: 'Free church website template: a chapel hero with service times, what to expect, a schedule that draws itself, groups, leaders, events and a map to find us.',
    keywords: ['church website template', 'free church website html', 'ministry website template', 'parish website template', 'church landing page'],
    intro: 'A welcoming site for churches, parishes and ministries: service times right in the hero, what a first visit is like, a Sunday schedule that draws itself as you scroll, groups for every age, the people who lead them, upcoming events and directions to the door.',
    bestFor: ['Churches and parishes', 'Ministries and faith communities', 'Church plants welcoming new visitors'],
    sections: [
      ['navbar-floating', nav('Grace Chapel', 'heart', 'Plan a visit', links(['Sundays', '#journey'], ['Groups', '#features'], ['Events', '#blog'], ['Find us', '#contact']))],
      ['image-background-hero', { fields: { image: IMG('tpl-church.jpg'), eyebrow: 'Sundays at 9:30 am and 11:30 am', headline: 'You are *welcome here*', lead: 'A friendly church in the heart of Riverside. Come as you are, bring your questions and stay for coffee.', cta1: 'Plan a visit', cta1Url: '#contact', cta2: 'What to expect', cta2Url: '#journey', s1Value: '9:30', s1Label: 'family service', s2Value: '11:30', s2Label: 'morning worship', s3Value: '6 pm', s3Label: 'youth on Fridays' } }],
      ['scroll-path', { art: { id: 'sparkles', color: 'brand', strength: '25', anim: 'float' }, fields: { eyebrow: 'Your first Sunday', heading: 'What to *expect*', lead: 'Services last about an hour. Children are welcome in every service.' }, lists: { milestones: [
        { date: '9:15 am', icon: 'coffee', title: 'Coffee and a welcome', text: 'Our welcome team meets you at the door with coffee and answers to any questions.' },
        { date: '9:30 am', icon: 'heart', title: 'Worship together', text: 'Songs, a reading and a short talk about life and faith, in plain language.' },
        { date: '10:00 am', icon: 'users', title: 'Kids’ church', text: 'Children aged 3 to 11 go to their own groups with our checked leaders.' },
        { date: '10:30 am', icon: 'message-circle', title: 'Stay and chat', text: 'Tea, cake and time to meet people. No pressure, ever.' },
      ] } }],
      ['features-icon-grid', { fields: { eyebrow: 'Get involved', heading: 'A place *for everyone*', lead: 'Groups meet through the week, in homes and at the chapel.' }, lists: { features: [
        { icon: 'users', title: 'Small groups', text: 'Eight to twelve people meeting weekly in homes across town.', link: 'Find a group', url: '#' },
        { icon: 'star', title: 'Youth', text: 'Friday nights for ages 11 to 18, with games, food and honest talk.', link: 'Youth nights', url: '#' },
        { icon: 'heart', title: 'Care & prayer', text: 'A team ready to listen, visit and pray with you.', link: 'Ask for prayer', url: '#' },
        { icon: 'gift', title: 'Food bank', text: 'Serving 200 local families every week. Volunteers welcome.', link: 'Volunteer', url: '#' },
      ] } }],
      ['team-grid', { fields: { eyebrow: 'Our leaders', heading: 'The people *who serve*', lead: 'Our pastoral team is here for you through the week.' }, lists: { members: [
        { photo: av(1), photoAlt: 'Rev. Daniel Hughes', name: 'Rev. Daniel Hughes', role: 'Lead pastor', bio: 'Pastor at Grace Chapel for twelve years, and a terrible but enthusiastic gardener.', linkedin: '', x: '' },
        { photo: av(4), photoAlt: 'Ruth Adeyemi', name: 'Ruth Adeyemi', role: 'Families & children', bio: 'Leads kids’ church and our parenting courses.', linkedin: '', x: '' },
        { photo: av(6), photoAlt: 'Ben Carter', name: 'Ben Carter', role: 'Youth leader', bio: 'Runs Friday youth nights and the summer camp.', linkedin: '', x: '' },
        { photo: av(3), photoAlt: 'Grace Okafor', name: 'Grace Okafor', role: 'Worship leader', bio: 'Leads the Sunday band and the midweek choir.', linkedin: '', x: '' },
      ] } }],
      ['blog-cards', { fields: { eyebrow: 'Coming up', heading: 'Events & *gatherings*', allLink: 'All events', allUrl: '#blog' }, lists: { posts: [
        { image: IMG('wed-dinner.jpg'), imageAlt: 'A long dinner table with candles', category: 'Community', date: 'Nov 8, 2026', readTime: '6 pm', title: 'Harvest community dinner', excerpt: 'A free three-course meal for anyone in Riverside. Bring a friend.', author: 'Welcome team', avatar: av(7), avatarAlt: 'Welcome team', url: '#' },
        { image: IMG('tpl-nature.jpg'), imageAlt: 'Hills at sunrise', category: 'Course', date: 'Nov 12, 2026', readTime: '7:30 pm', title: 'Alpha: life’s big questions', excerpt: 'Ten relaxed evenings exploring faith over dinner. Everyone welcome.', author: 'Rev. Daniel Hughes', avatar: av(1), avatarAlt: 'Rev. Daniel Hughes', url: '#' },
        { image: IMG('wed-party.jpg'), imageAlt: 'String lights glowing at night', category: 'Christmas', date: 'Dec 20, 2026', readTime: '6 pm', title: 'Carols by candlelight', excerpt: 'Our favourite night of the year, with mince pies after.', author: 'Worship team', avatar: av(8), avatarAlt: 'Worship team', url: '#' },
      ] } }],
      ['contact-map', { fields: { eyebrow: 'Find us', heading: 'Plan *your visit*', lead: 'Free parking behind the chapel and step-free access at the side door.' }, lists: { offices: [
        { city: 'Grace Chapel', address: '45 River Road, Riverside, RV2 7CD', hours: 'Sundays 9:30 am and 11:30 am · Office Tue to Fri, 9 am – 3 pm', phone: '+44 20 7946 0200', phoneUrl: 'tel:+442079460200', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' },
      ] } }],
      ['footer-minimal', { fields: { logoText: 'Grace Chapel', logoIcon: 'heart', links: 'Sundays | #journey\nGroups | #features\nEvents | #blog\nFind us | #contact', copyright: '© 2026 Grace Chapel Riverside · Registered charity no. 1100000' } }],
    ],
    multiLinks: { '#blog': 'events.html', '#contact': 'visit.html' },
    homeTitle: 'Grace Chapel Riverside: Sunday Services at 9:30 and 11:30',
    homeDescription: 'Grace Chapel is a friendly church in Riverside. Join us Sundays at 9:30 or 11:30 am, find a small group, bring the kids and stay for coffee. All are welcome.',
    pages: [
      {
        name: 'Events', slug: 'events',
        title: 'Events at Grace Chapel Riverside: Dinners and Courses',
        description: 'Upcoming events at Grace Chapel: community dinners, the Alpha course, youth nights, carols by candlelight and how to volunteer at our weekly food bank.',
        sections: [
          ['blog-cards', { fields: { eyebrow: 'Coming up', heading: 'Events & *gatherings*', allLink: '', allUrl: '#' }, lists: { posts: [
            { image: IMG('wed-dinner.jpg'), imageAlt: 'A long dinner table with candles', category: 'Community', date: 'Nov 8, 2026', readTime: '6 pm', title: 'Harvest community dinner', excerpt: 'A free three-course meal for anyone in Riverside.', author: 'Welcome team', avatar: av(7), avatarAlt: 'Welcome team', url: '#' },
            { image: IMG('tpl-nature.jpg'), imageAlt: 'Hills at sunrise', category: 'Course', date: 'Nov 12, 2026', readTime: '7:30 pm', title: 'Alpha: life’s big questions', excerpt: 'Ten relaxed evenings exploring faith over dinner.', author: 'Rev. Daniel Hughes', avatar: av(1), avatarAlt: 'Rev. Daniel Hughes', url: '#' },
            { image: IMG('wed-party.jpg'), imageAlt: 'String lights glowing at night', category: 'Christmas', date: 'Dec 20, 2026', readTime: '6 pm', title: 'Carols by candlelight', excerpt: 'Our favourite night of the year, with mince pies after.', author: 'Worship team', avatar: av(8), avatarAlt: 'Worship team', url: '#' },
          ] } }],
          ['cta-strip', { fields: { icon: 'gift', heading: 'Help at the food bank', lead: 'Volunteers needed on Wednesday and Saturday mornings.', cta1: 'Volunteer', cta1Url: 'visit.html', cta2: 'Give food', cta2Url: 'visit.html' } }],
        ],
      },
      {
        name: 'Visit', slug: 'visit',
        title: 'Visit Grace Chapel: Service Times, Parking and Access',
        description: 'Plan your first visit to Grace Chapel in Riverside: Sunday service times, what happens for children, free parking, step-free access and how to contact us.',
        sections: [
          ['contact-map', { fields: { eyebrow: 'Find us', heading: 'Plan *your visit*', lead: 'Free parking behind the chapel and step-free access at the side door.' }, lists: { offices: [
            { city: 'Grace Chapel', address: '45 River Road, Riverside, RV2 7CD', hours: 'Sundays 9:30 am and 11:30 am · Office Tue to Fri, 9 am – 3 pm', phone: '+44 20 7946 0200', phoneUrl: 'tel:+442079460200', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com' },
          ] } }],
          ['faq-accordion', { fields: { eyebrow: 'First visit', heading: 'Good to *know*', lead: 'What people often ask before their first Sunday.', contactText: 'Another question?', contactLink: 'Email us', contactUrl: 'mailto:hello@webdevpuneet.com' }, lists: { faqs: [
            { q: 'What should I wear?', a: 'Whatever you are comfortable in. You will see jeans and suits.' },
            { q: 'What happens for my children?', a: 'Children start in the service, then go to kids’ church with checked leaders. You collect them at the end.' },
            { q: 'Will I be asked to give money?', a: 'No. Giving is for regular members; guests are our guests.' },
            { q: 'Is the building accessible?', a: 'Yes. There is step-free access at the side door, an accessible toilet and a hearing loop.' },
          ] } }],
        ],
      },
    ],
  },
];
