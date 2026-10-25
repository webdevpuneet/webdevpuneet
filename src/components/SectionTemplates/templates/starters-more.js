/* The popup, share bar, blog and sign-in sections used inside the website templates (2026-10-25).

   STARTER_MORE_EXTRAS  extra sections on a template's home page, same shape as STARTER_EXTRAS in
                        starters-extras.js (merged there): after / before / replace + section.
   STARTER_PAGES        extra pages for a template's multi-page version, added by addStarterPages()
                        in site.js: { name, slug, inNav, sections } or, to change an existing page,
                        { appendTo: 'Blog', replace: 'blog-cards', sections } (replace swaps that
                        section for the new ones, otherwise they are added at the end).
   Sign-in links such as /login and /register are pointed at the Log in / Sign up pages. */
import { IMG } from './meta.js';

const popup = (fields, toggles = {}) => ['popup-modal', { fields: { days: '7', ...fields }, toggles }];
const share = (networks, fields = {}) => ['floating-social-share', { fields, lists: { networks: networks.map(network => ({ network })) } }];
const av = n => IMG(`avatar-${n}.jpg`);

export const STARTER_MORE_EXTRAS = {
  saas: [
    { before: 'footer-columns', section: popup({ trigger: 'exit', position: 'center', eyebrow: 'Before you go', heading: 'Get the free *quarterly roadmap template*', lead: 'Plan your next quarter in minutes. We will email the template and a short guide to using it.', image: IMG('hero-dashboard.png'), imageAlt: 'The Acme roadmap view', button: 'Send me the template', success: 'Thanks! The template is on its way.' }) },
  ],
  'product-store': [
    { before: 'footer-columns', section: popup({ trigger: 'exit', position: 'center', eyebrow: 'Wait, before you go', heading: 'Take *10% off* your first order', lead: 'Join the Sona list for launch news and a code for your first order. No spam, ever.', image: IMG('tpl-product.jpg'), imageAlt: 'Sona headphones on a desk', button: 'Send my code', success: 'Thanks! Your code is on its way.' }) },
  ],
  'online-course': [
    { before: 'footer-minimal', section: popup({ trigger: 'scroll', scrollPct: '50', position: 'bottom-right', eyebrow: 'Free lesson', heading: 'Try the first *lesson free*', lead: 'Watch lesson one and see how we teach. No payment, no card.', image: IMG('tpl-course.png'), imageAlt: 'A Design Academy lesson on screen', cta1Label: 'Watch the free lesson', cta1Url: '#pricing', cta2Label: 'See the syllabus', cta2Url: '#features' }, { showForm: false, showCta: true }) },
  ],
  restaurant: [
    { before: 'footer-minimal', section: popup({ trigger: 'delay', delay: '12', position: 'bottom-left', eyebrow: 'This week', heading: 'Sunday *roast & wine* for two', lead: 'Three courses and a bottle for £60, every Sunday until the end of the month.', image: IMG('tpl-restaurant.jpg'), imageAlt: 'A table set for Sunday lunch', cta1Label: 'Book a table', cta1Url: '#contact', cta2Label: '' }, { showForm: false, showCta: true }) },
  ],
  salon: [
    { before: 'footer-minimal', section: popup({ trigger: 'delay', delay: '10', position: 'bottom-right', eyebrow: 'New clients', heading: '*20% off* your first visit', lead: 'Book a cut, colour or treatment this month and your first visit is on us.', image: IMG('tpl-salon.jpg'), imageAlt: 'A stylist at work in the salon', cta1Label: 'Book now', cta1Url: '#contact', cta2Label: '' }, { showForm: false, showCta: true }) },
  ],
  fitness: [
    { before: 'footer-minimal', section: popup({ trigger: 'scroll', scrollPct: '40', position: 'center', eyebrow: 'Try us free', heading: 'Get a *free 7-day pass*', lead: 'Train at any IRONHOUSE class or on the gym floor for a week. No contract and no card.', image: IMG('tpl-fitness.jpg'), imageAlt: 'Members training at IRONHOUSE', button: 'Send my pass', success: 'Thanks! Your pass is on its way.' }) },
  ],
  hotel: [
    { before: 'footer-minimal', section: popup({ trigger: 'delay', delay: '15', position: 'bottom-center', eyebrow: 'Book direct', heading: 'Save *10%* when you book direct', lead: 'Best price guaranteed, free breakfast and a late checkout on stays of two nights or more.', image: IMG('tpl-hotel.jpg'), imageAlt: 'The terrace at Casa Mar', cta1Label: 'Check dates', cta1Url: '#contact', cta2Label: '' }, { showForm: false, showCta: true }) },
  ],
  event: [
    { before: 'footer-giant', section: popup({ trigger: 'delay', delay: '10', position: 'bottom-right', eyebrow: 'Early bird', heading: 'Early-bird tickets end *Friday*', lead: 'Save 30% on a full conference pass before prices go up.', image: IMG('tpl-event.jpg'), imageAlt: 'The main stage at FRONTEND/26', cta1Label: 'Get tickets', cta1Url: '#pricing', cta2Label: '' }, { showForm: false, showCta: true }) },
    { before: 'footer-giant', section: share(['x', 'linkedin', 'whatsapp', 'facebook', 'copy'], { side: 'left' }) },
  ],
  nonprofit: [
    { before: 'footer-newsletter', section: popup({ trigger: 'delay', delay: '14', position: 'center', eyebrow: 'Plant a tree', heading: 'Every *£5* plants a tree', lead: 'Join 8,000 supporters helping us restore local woodland this winter.', image: IMG('tpl-nature.jpg'), imageAlt: 'Young trees in a restored woodland', cta1Label: 'Donate now', cta1Url: '#get-started', cta2Label: 'See our impact', cta2Url: '#results' }, { showForm: false, showCta: true }) },
    { before: 'footer-newsletter', section: share(['facebook', 'x', 'whatsapp', 'email', 'copy']) },
  ],
  podcast: [
    { before: 'footer-minimal', section: popup({ trigger: 'scroll', scrollPct: '60', position: 'bottom-right', eyebrow: 'New episodes weekly', heading: 'Never miss *an episode*', lead: 'Get each new episode and the show notes in your inbox every Tuesday.', image: IMG('tpl-podcast.jpg'), imageAlt: 'The Off the Record studio', button: 'Subscribe', success: 'Thanks! See you on Tuesday.' }) },
    { before: 'footer-minimal', section: share(['x', 'whatsapp', 'reddit', 'email', 'copy']) },
  ],
  wedding: [{ before: 'footer-minimal', section: share(['whatsapp', 'facebook', 'email', 'copy'], { side: 'left' }) }],
  photographer: [{ before: 'footer-minimal', section: share(['pinterest', 'facebook', 'x', 'copy'], { side: 'left' }) }],
  portfolio: [{ before: 'footer-minimal', section: share(['linkedin', 'x', 'email', 'copy']) }],
  agency: [{ before: 'footer-giant', section: share(['linkedin', 'x', 'facebook', 'email', 'copy'], { side: 'left' }) }],
  church: [{ before: 'footer-minimal', section: share(['facebook', 'whatsapp', 'email', 'copy']) }],
};

/* ── Blog and article pages ─────────────────────────────────────────────────────── */
const posts = (rows, imgs, avatars) => rows.map(([category, date, readTime, title, excerpt, author], i) => ({
  image: IMG(imgs[i % imgs.length]), category, date, readTime, title, excerpt, author, avatar: av(avatars[i % avatars.length]), url: 'article.html',
}));

const blogGrid = (opts, list) => ({ ...opts, sections: [['blog-grid-pagination', { fields: { eyebrow: opts.eyebrow, heading: opts.heading, lead: opts.lead, perPage: '6', columns: '3' }, lists: { posts: list } }]] });

const article = ({ name = 'Article', slug = 'article', blogName = 'Blog', blogFile = 'blog.html', authorFile = 'index.html', category, title, crumb, excerpt, author, role, avatar, bio, date, dateIso, readTime, cover, coverAlt, sections, related, tags, prev, next }) => ({
  name, slug, inNav: false,
  sections: [['blog-post', {
    fields: {
      crumbHomeUrl: 'index.html', crumbBlog: blogName, crumbBlogUrl: blogFile, crumbCurrent: crumb || title.replace(/\*/g, ''),
      category, categoryUrl: blogFile, title, excerpt, authorName: author, authorRole: role, authorUrl: authorFile, authorAvatar: av(avatar), authorAvatarAlt: author,
      authorBio: bio, date, dateIso, readTime, cover: IMG(cover), coverAlt, tags: tags.join('\n'),
      prevTitle: prev?.[0] || '', prevUrl: prev?.[1] || '', nextTitle: next?.[0] || '', nextUrl: next?.[1] || '',
    },
    lists: { sections, related: related.slice(0, 3).map(p => ({ ...p, url: `${slug}.html` })) },
  }]],
});
const sec = (title, text, extra = {}) => ({ title, text, points: '', quote: '', image: '', imageAlt: '', caption: '', ...extra });

const AGENCY = posts([
  ['Branding', 'Oct 12, 2026', '6 min read', 'Why most rebrands fail in the first year', 'A new logo is the easy part. What the teams that get it right do before, during and after the launch.', 'Priya Nair'],
  ['Design', 'Oct 3, 2026', '5 min read', 'Designing for the first ten seconds', 'What a visitor needs to see, understand and feel before they decide to stay, and how to test it.', 'Tom Hale'],
  ['Strategy', 'Sep 24, 2026', '7 min read', 'The one-page brief that saves a month', 'A short template we ask every client to fill in, and the conversations it starts.', 'Priya Nair'],
  ['Craft', 'Sep 15, 2026', '4 min read', 'Motion that explains, not decorates', 'Three rules for animation in product design, with examples from recent projects.', 'Lena Park'],
  ['Studio', 'Sep 6, 2026', '5 min read', 'What we learned from 50 workshops', 'Patterns from fifty brand workshops, and the questions that always unlock the room.', 'Tom Hale'],
  ['Branding', 'Aug 28, 2026', '6 min read', 'Choosing a typeface without regret', 'A practical way to shortlist, test and commit to the typeface your brand will wear for years.', 'Lena Park'],
], ['blog-1.jpg', 'blog-2.jpg', 'blog-3.jpg', 'blog-4.jpg', 'blog-5.jpg', 'blog-6.jpg'], [2, 4, 6, 1, 3, 5]);
const COURSE = posts([
  ['Learning', 'Oct 10, 2026', '5 min read', 'How to practise design when you have 20 minutes', 'A weekly routine of short, focused exercises that builds skill faster than the occasional weekend binge.', 'Amelia Cruz'],
  ['Portfolio', 'Oct 1, 2026', '7 min read', 'Five portfolio mistakes and how to fix them', 'What hiring managers notice in the first minute, and how to show your thinking, not only your screens.', 'Daniel Kim'],
  ['Career', 'Sep 22, 2026', '6 min read', 'Landing your first design job', 'A step-by-step plan for applications, case studies and interviews, from students who made the leap.', 'Amelia Cruz'],
  ['Tools', 'Sep 13, 2026', '4 min read', 'The only design tools you need to start', 'Skip the shopping list. Here is the small kit our students use for their first projects.', 'Daniel Kim'],
  ['Learning', 'Sep 4, 2026', '5 min read', 'Giving and receiving design feedback', 'How to ask for useful critique, and how to turn tough comments into your next iteration.', 'Amelia Cruz'],
  ['Stories', 'Aug 26, 2026', '8 min read', 'From teacher to product designer in a year', 'Priya shares what she studied, built and wrote on the way to her new career.', 'Daniel Kim'],
], ['blog-3.jpg', 'blog-1.jpg', 'blog-6.jpg', 'blog-2.jpg', 'blog-5.jpg', 'blog-4.jpg'], [5, 7, 2, 1, 6, 3]);
const STORE = posts([
  ['Guides', 'Oct 11, 2026', '6 min read', 'How to choose headphones for your commute', 'Noise cancelling, comfort and battery life: what matters on a train, a bus or a bike, and what does not.', 'Jonas Weber'],
  ['Behind the scenes', 'Oct 2, 2026', '5 min read', 'Inside the Sona sound lab', 'A visit to the room where every pair is tuned by ear before it ships.', 'Aisha Bello'],
  ['Care', 'Sep 23, 2026', '4 min read', 'Making your earbuds last for years', 'Cleaning, storage and charging habits that protect the battery and the sound.', 'Jonas Weber'],
  ['Guides', 'Sep 14, 2026', '5 min read', 'Wired or wireless: which one is for you?', 'An honest look at latency, quality and convenience for music, calls and gaming.', 'Aisha Bello'],
  ['News', 'Sep 5, 2026', '3 min read', 'Introducing the Sona Pocket speaker', 'Small enough for a jacket pocket, loud enough for a picnic. Meet our newest speaker.', 'Jonas Weber'],
  ['Sustainability', 'Aug 27, 2026', '6 min read', 'What we do with old Sona products', 'Our repair, trade-in and recycling programme, and how many devices it has kept in use.', 'Aisha Bello'],
], ['blog-2.jpg', 'blog-4.jpg', 'blog-6.jpg', 'blog-1.jpg', 'blog-3.jpg', 'blog-5.jpg'], [1, 4, 8, 2, 5, 3]);
const COACH = posts([
  ['Clarity', 'Oct 9, 2026', '5 min read', 'The Sunday question that changes your week', 'One reflective question and ten quiet minutes can steer the next seven days. Here is how to use it.', 'Maya Chen'],
  ['Habits', 'Sep 30, 2026', '6 min read', 'Why motivation is the wrong goal', 'Systems beat willpower. A simple way to design your environment so the right action is the easy one.', 'Maya Chen'],
  ['Career', 'Sep 21, 2026', '7 min read', 'Making a career change without burning out', 'A gentle, step-by-step approach to testing a new direction while keeping your current job.', 'Maya Chen'],
  ['Boundaries', 'Sep 12, 2026', '4 min read', 'Saying no without the guilt', 'Language you can use today, and why protecting your time makes you better at everything else.', 'Maya Chen'],
  ['Leadership', 'Sep 3, 2026', '6 min read', 'How to run a one-to-one that matters', 'Five questions that turn a status update into a conversation about growth.', 'Maya Chen'],
  ['Clarity', 'Aug 25, 2026', '5 min read', 'What to do when you feel stuck', 'Four small experiments for the weeks when nothing seems to move.', 'Maya Chen'],
], ['blog-5.jpg', 'blog-3.jpg', 'blog-1.jpg', 'blog-6.jpg', 'blog-2.jpg', 'blog-4.jpg'], [3, 3, 3, 3, 3, 3]);
const FITNESS = posts([
  ['Training', 'Oct 8, 2026', '6 min read', 'A beginner’s guide to your first week in the gym', 'What to do, what to skip and how to get comfortable on the floor from day one.', 'Coach Dre'],
  ['Nutrition', 'Sep 29, 2026', '5 min read', 'Eating for energy, not for a diet', 'Simple meals that fuel your training and keep you full, with no calorie counting.', 'Sofia Reyes'],
  ['Recovery', 'Sep 20, 2026', '4 min read', 'Why rest days are part of the plan', 'How sleep, stretching and easy movement make the hard days count.', 'Coach Dre'],
  ['Training', 'Sep 11, 2026', '7 min read', 'Strength training for everyone', 'Four lifts, three sessions a week and a way to track your progress that actually motivates.', 'Sofia Reyes'],
  ['Members', 'Sep 2, 2026', '5 min read', 'How Mia lost 12 kg and found her community', 'A member’s story of starting small, showing up and joining a class she was afraid to try.', 'Coach Dre'],
  ['Mindset', 'Aug 24, 2026', '5 min read', 'Staying consistent when life gets busy', 'Short sessions, flexible goals and the habits that keep members training through the busiest months.', 'Sofia Reyes'],
], ['blog-4.jpg', 'blog-2.jpg', 'blog-6.jpg', 'blog-1.jpg', 'blog-5.jpg', 'blog-3.jpg'], [1, 2, 6, 5, 4, 7]);
const PHOTO = posts([
  ['Field notes', 'Oct 13, 2026', '5 min read', 'Chasing the last light in the Dolomites', 'Three evenings, one tripod and what I learned about waiting for the right five minutes.', 'Mira Lens'],
  ['Technique', 'Oct 4, 2026', '6 min read', 'Shooting portraits in natural light', 'Where to stand, when to shoot and how to use a window and a white sheet like a studio.', 'Mira Lens'],
  ['Gear', 'Sep 25, 2026', '4 min read', 'The small kit I carry on every shoot', 'Two bodies, three lenses and the unglamorous items that save a day.', 'Mira Lens'],
  ['Stories', 'Sep 16, 2026', '7 min read', 'A wedding in the rain', 'What a washed-out forecast taught me about calm, umbrellas and the best photographs of the day.', 'Mira Lens'],
  ['Editing', 'Sep 7, 2026', '5 min read', 'How I edit: from raw to final in ten minutes', 'A simple, repeatable workflow that keeps colours honest and saves hours.', 'Mira Lens'],
  ['Field notes', 'Aug 29, 2026', '5 min read', 'Street photography without the fear', 'Small habits that make shooting strangers feel friendly, and respectful, for everyone.', 'Mira Lens'],
], ['blog-1.jpg', 'blog-3.jpg', 'blog-5.jpg', 'blog-2.jpg', 'blog-6.jpg', 'blog-4.jpg'], [8, 8, 8, 8, 8, 8]);
const PORTFOLIO = posts([
  ['Case study', 'Oct 7, 2026', '8 min read', 'Redesigning a booking flow in four weeks', 'The research, the sketches and the results behind a flow that cut drop-off by a third.', 'Alex Rivera'],
  ['Process', 'Sep 28, 2026', '5 min read', 'How I run a design critique', 'A format that keeps feedback specific, kind and useful for the person presenting.', 'Alex Rivera'],
  ['Notes', 'Sep 19, 2026', '4 min read', 'What I look for in a design system', 'Tokens, naming and documentation: the unglamorous parts that decide whether a system gets used.', 'Alex Rivera'],
  ['Career', 'Sep 10, 2026', '6 min read', 'Five years freelancing: what I would tell myself', 'Pricing, boundaries and finding the right clients, written for anyone thinking about going solo.', 'Alex Rivera'],
  ['Case study', 'Sep 1, 2026', '7 min read', 'A dashboard people actually enjoy', 'Turning a wall of numbers into three clear questions, and how the team measured the change.', 'Alex Rivera'],
  ['Process', 'Aug 23, 2026', '4 min read', 'Sketching before pixels', 'Why my first hour on a project is always paper, and how it saves days later.', 'Alex Rivera'],
], ['blog-6.jpg', 'blog-2.jpg', 'blog-4.jpg', 'blog-1.jpg', 'blog-5.jpg', 'blog-3.jpg'], [4, 4, 4, 4, 4, 4]);

const SAAS = posts([
  ['Product', 'Oct 2, 2026', '4 min read', 'Introducing the Acme roadmap view', 'See every project on one timeline, drag to re-plan and share a link with stakeholders.', 'Noah Reyes'],
  ['Engineering', 'Oct 14, 2026', '8 min read', 'How we cut page load time in half', 'Lazy hydration, smarter caching and one surprising database index: the story of our performance sprint.', 'Maya Chen'],
  ['Culture', 'Sep 25, 2026', '6 min read', 'What four-day sprints taught us', 'A year of shorter weeks: what changed in our output, our planning and how the team feels.', 'Aisha Bello'],
], ['blog-6.jpg', 'blog-4.jpg', 'blog-1.jpg'], [5, 3, 2]);
const PODCAST = posts([
  ['Episode 41', 'Sep 29, 2026', '52 min listen', 'Why we deleted half our product', 'A founder explains the courage and the spreadsheet behind cutting features.', 'Sam Rivera'],
  ['Episode 40', 'Sep 22, 2026', '44 min listen', 'The hiring mistake everyone makes', 'A hiring manager looks back at ten years of interviews, and what she would change.', 'Sam Rivera'],
  ['Episode 39', 'Sep 15, 2026', '39 min listen', 'Building in public, honestly', 'What sharing your numbers does to a company, good and bad.', 'Sam Rivera'],
], ['blog-3.jpg', 'blog-5.jpg', 'blog-2.jpg'], [7, 7, 7]);

const auth = (mode, { brand, image, alt, quote, by, heading, lead }) => ({
  name: mode === 'login' ? 'Log in' : 'Sign up', slug: mode === 'login' ? 'login' : 'register', inNav: false,
  sections: [[mode === 'login' ? 'login-form' : 'register-form', { fields: { heading, lead, panelImage: image, panelImageAlt: alt, quote, quoteBy: by, switchUrl: mode === 'login' ? '/register/' : '/login/', ...(mode === 'login' ? {} : { termsUrl: '/privacy/' }) }, toggles: { showPanel: true } }]],
}); // brand is only used to keep the call sites readable

export const STARTER_PAGES = {
  saas: [
    auth('login', { brand: 'Acme', image: IMG('hero-dashboard.png'), alt: 'The Acme dashboard', quote: '“Acme gave our team one place to plan, ship and report. We stopped losing work between tools.”', by: 'Amara Okoye, Head of Operations', heading: 'Welcome *back* to Acme', lead: 'Sign in to open your workspace.' }),
    auth('register', { brand: 'Acme', image: IMG('hero-dashboard.png'), alt: 'The Acme dashboard', quote: '“We were set up in an afternoon and the whole team was using it by Monday.”', by: 'Leo Martin, Product Lead', heading: 'Start your *free* Acme workspace', lead: 'No credit card needed. Invite your team when you are ready.' }),
    article({ authorFile: 'about.html', blogName: 'Blog', blogFile: 'blog.html', category: 'Product', title: 'Introducing live reports', crumb: 'Introducing live reports', excerpt: 'Dashboards that update as your team works: no spreadsheets and no Friday afternoon status updates.', author: 'Noah Reyes', role: 'Head of Product', avatar: 5, bio: 'Noah leads product at Acme. He writes about planning, reporting and how teams actually work.', date: 'October 9, 2026', dateIso: '2026-10-09', readTime: '5 min read', cover: 'blog-6.jpg', coverAlt: 'A live report on a screen', tags: ['Product', 'Reports', 'Launch'], sections: [
      sec('Why we built it', 'Every Friday, someone on every team spent an hour copying numbers into a status update. We watched it happen for a month, then decided it should not be a human job.\n\nLive reports read straight from your boards and roadmaps, so the numbers are right whenever you open them.'),
      sec('What it does', 'Pick a team, a time range and the metrics you care about. The report updates as work moves, and you can share a link that always shows the latest.', { points: 'Updates as tasks change\nShare a link or a PDF\nCompare this week with last week' }),
      sec('What is next', 'Next we will add goals and forecasts, so a report can answer the question that actually matters: will we make it on time? Tell us what you would like to see.'),
    ], related: SAAS, prev: ['Introducing the Acme roadmap view', 'article.html'], next: ['How we cut page load time in half', 'article.html'] }),
  ],
  app: [
    auth('login', { brand: 'Pocketly', image: IMG('hero-phone.png'), alt: 'The Pocketly app', quote: '“I check Pocketly every morning. It is the calmest part of my day.”', by: 'Zara Ahmed, designer', heading: 'Welcome *back* to Pocketly', lead: 'Sign in to see your money at a glance.' }),
    auth('register', { brand: 'Pocketly', image: IMG('hero-phone.png'), alt: 'The Pocketly app', quote: '“I connected my accounts in two minutes and finally understood where my money goes.”', by: 'Noah Reyes, teacher', heading: 'Create your *Pocketly* account', lead: 'Free to start. Connect your accounts in under two minutes.' }),
  ],
  'online-course': [
    auth('login', { brand: 'Design Academy', image: IMG('tpl-course.png'), alt: 'A Design Academy lesson', quote: '“The lessons are short and practical. I built a real portfolio piece in the first two weeks.”', by: 'Priya Nair, student', heading: 'Welcome *back* to class', lead: 'Sign in to pick up your next lesson.' }),
    auth('register', { brand: 'Design Academy', image: IMG('tpl-course.png'), alt: 'A Design Academy lesson', quote: '“I went from curious to confident in a month. The feedback from tutors is the best part.”', by: 'Daniel Kim, student', heading: 'Join *Design Academy*', lead: 'Create a free account to try the first lesson.' }),
    blogGrid({ name: 'Journal', slug: 'blog', inNav: true, eyebrow: 'The journal', heading: 'Tips, stories and *design practice*', lead: 'Short reads for people learning design, from our tutors and graduates.' }, COURSE),
    article({ blogName: 'Journal', blogFile: 'blog.html', category: 'Learning', title: 'How to practise design when you have 20 minutes', excerpt: 'A weekly routine of short, focused exercises that builds skill faster than the occasional weekend binge.', author: 'Amelia Cruz', role: 'Lead tutor', avatar: 5, bio: 'Amelia leads the tutor team at Design Academy and has taught design for ten years.', date: 'October 10, 2026', dateIso: '2026-10-10', readTime: '5 min read', cover: 'blog-3.jpg', coverAlt: 'A designer sketching at a desk', tags: ['Learning', 'Practice', 'Beginners'], sections: [
      sec('Small and regular beats big and rare', 'Twenty focused minutes a day will take you further than one long session a month. The trick is to make each session small enough to start without negotiating with yourself.'),
      sec('A simple weekly rhythm', 'Give each day one job so you never have to decide what to do.', { points: 'Monday: redraw an interface you like\nTuesday: type and spacing\nWednesday: colour and contrast\nThursday: a quick layout sketch\nFriday: share one thing and ask for feedback' }),
      sec('Keep a record', 'Save everything in one folder with the date. After a month you will have thirty small pieces, and a visible record of how far you have come.', { quote: '“Progress feels invisible until you line up the work.”' }),
    ], related: COURSE.slice(1, 4) }),
  ],
  'product-store': [
    auth('login', { brand: 'Sona', image: IMG('tpl-product.jpg'), alt: 'Sona headphones', quote: '“Sona makes the best-sounding headphones I have owned, and the account area makes returns painless.”', by: 'Jonas Weber, customer', heading: 'Welcome *back*', lead: 'Sign in to see your orders and manage your devices.' }),
    auth('register', { brand: 'Sona', image: IMG('tpl-product.jpg'), alt: 'Sona headphones', quote: '“Creating an account took a minute, and I had my discount code straight away.”', by: 'Aisha Bello, customer', heading: 'Create your *Sona* account', lead: 'Track orders, register your devices and get early access to new launches.' }),
    blogGrid({ name: 'Journal', slug: 'blog', inNav: true, eyebrow: 'The Sona journal', heading: 'Sound advice, *stories* and news', lead: 'Guides, behind-the-scenes looks and product news from the team.' }, STORE),
    article({ blogName: 'Journal', blogFile: 'blog.html', category: 'Guides', title: 'How to choose headphones for your commute', excerpt: 'Noise cancelling, comfort and battery life: what matters on a train, a bus or a bike, and what does not.', author: 'Jonas Weber', role: 'Audio engineer', avatar: 1, bio: 'Jonas tunes every Sona product by ear and writes about how to get the most from your headphones.', date: 'October 11, 2026', dateIso: '2026-10-11', readTime: '6 min read', cover: 'blog-2.jpg', coverAlt: 'A commuter wearing headphones', tags: ['Guides', 'Headphones', 'Commuting'], sections: [
      sec('Start with where you listen', 'A noisy train needs strong noise cancelling. A quiet bike lane needs awareness of the traffic around you. Decide where you spend most of your time before you compare any specifications.'),
      sec('What to compare', 'Ignore the biggest numbers and look at the ones that change your day.', { points: 'Comfort over a full hour\nBattery life for your week\nMicrophone quality for calls\nA fit that stays put when you move' }),
      sec('Our recommendation', 'For most commuters, over-ear headphones with good noise cancelling and a 30-hour battery are the most comfortable choice. If you walk or cycle, a lighter pair of earbuds with a transparency mode is safer and easier to carry.'),
    ], related: STORE.slice(1, 4) }),
  ],
  fitness: [
    auth('login', { brand: 'IRONHOUSE', image: IMG('tpl-fitness.jpg'), alt: 'Members training', quote: '“Booking classes takes ten seconds, and I never miss a session now.”', by: 'Mia Torres, member', heading: 'Welcome *back*, member', lead: 'Sign in to book classes and manage your membership.' }),
    auth('register', { brand: 'IRONHOUSE', image: IMG('tpl-fitness.jpg'), alt: 'Members training', quote: '“I joined for the free week and stayed for the people.”', by: 'Leo Martin, member', heading: 'Join *IRONHOUSE*', lead: 'Create your account to claim a free 7-day pass.' }),
    blogGrid({ name: 'Blog', slug: 'blog', inNav: true, eyebrow: 'The blog', heading: 'Training, nutrition and *recovery*', lead: 'Practical advice from our coaches, plus stories from members.' }, FITNESS),
    article({ blogName: 'Blog', blogFile: 'blog.html', category: 'Training', title: 'A beginner’s guide to your first week in the gym', excerpt: 'What to do, what to skip and how to get comfortable on the floor from day one.', author: 'Coach Dre', role: 'Head coach', avatar: 1, bio: 'Dre has coached at IRONHOUSE for eight years and loves helping nervous beginners find their feet.', date: 'October 8, 2026', dateIso: '2026-10-08', readTime: '6 min read', cover: 'blog-4.jpg', coverAlt: 'A coach helping a member lift', tags: ['Training', 'Beginners'], sections: [
      sec('Keep the first week simple', 'You do not need a perfect plan. You need to turn up three times, learn a few movements well and leave feeling like you could do it again tomorrow.'),
      sec('Your first three sessions', 'Start with movements you can do with confidence and add weight slowly.', { points: 'Session one: a tour, warm-up and bodyweight basics\nSession two: a full-body workout with a coach\nSession three: a class you have never tried' }),
      sec('Ask for help', 'Every coach on the floor has been the new person. Ask how to set up a machine, how heavy to go or where to start. It is part of the job, and we like being asked.'),
    ], related: FITNESS.slice(1, 4) }),
  ],
  agency: [
    blogGrid({ name: 'Journal', slug: 'journal', inNav: true, eyebrow: 'The journal', heading: 'Notes from the *studio*', lead: 'How we think about brands, products and the work in between.' }, AGENCY),
    article({ authorFile: 'about.html', name: 'Article', blogName: 'Journal', blogFile: 'journal.html', category: 'Branding', title: 'Why most rebrands fail in the first year', excerpt: 'A new logo is the easy part. What the teams that get it right do before, during and after the launch.', author: 'Priya Nair', role: 'Strategy director', avatar: 2, bio: 'Priya leads strategy at Northstar and has guided more than thirty rebrands from first workshop to launch.', date: 'October 12, 2026', dateIso: '2026-10-12', readTime: '6 min read', cover: 'blog-1.jpg', coverAlt: 'Brand materials on a studio table', tags: ['Branding', 'Strategy'], sections: [
      sec('The logo is not the brand', 'A rebrand fails when the new identity is treated as a paint job. The visual change lands on day one; the change in how the company behaves takes a year.'),
      sec('What the best teams do', 'They agree what is changing and why before anyone opens a design file.', { points: 'Write down the three things the brand must say\nBring customer-facing teams in early\nPlan the first ninety days after launch' }),
      sec('Measure what matters', 'Track recognition, consistency and the questions customers ask, not just applause on launch day. A rebrand is finished when the new story is the one people tell.', { quote: '“A brand is a promise you keep, not a logo you launch.”' }),
    ], related: AGENCY.slice(1, 4) }),
  ],
  coach: [
    blogGrid({ name: 'Blog', slug: 'blog', inNav: true, eyebrow: 'The blog', heading: 'Thoughts on *clarity*, habits and change', lead: 'Short, practical reads for people who want to move forward.' }, COACH),
    article({ blogName: 'Blog', blogFile: 'blog.html', category: 'Clarity', title: 'The Sunday question that changes your week', excerpt: 'One reflective question and ten quiet minutes can steer the next seven days. Here is how to use it.', author: 'Maya Chen', role: 'Coach', avatar: 3, bio: 'Maya has coached more than 400 people through career changes, big decisions and busy seasons.', date: 'October 9, 2026', dateIso: '2026-10-09', readTime: '5 min read', cover: 'blog-5.jpg', coverAlt: 'A notebook and a cup of tea', tags: ['Clarity', 'Habits'], sections: [
      sec('Why Sunday', 'Sunday evening is when most of us feel the week approaching. It is also a gentle moment to decide what kind of week you want, before the inbox decides for you.'),
      sec('The question', 'Sit somewhere quiet with a notebook and ask: “If this week went well, what would I be glad I did?” Then write down no more than three answers.'),
      sec('Make it stick', 'Put the three answers where you will see them on Monday morning, and give each one a time in your calendar. By Friday you will know which of them mattered.', { points: 'Ten minutes, once a week\nThree answers at most\nOne calendar slot for each' }),
    ], related: COACH.slice(1, 4), prev: ['', ''], next: ['', ''] }),
  ],
  portfolio: [
    { appendTo: 'Blog', replace: 'blog-cards', ...blogGrid({ eyebrow: 'Writing', heading: 'Notes on *design* and process', lead: 'Case studies and things I have learned along the way.' }, PORTFOLIO) },
    article({ blogName: 'Blog', blogFile: 'blog.html', category: 'Case study', title: 'Redesigning a booking flow in four weeks', excerpt: 'The research, the sketches and the results behind a flow that cut drop-off by a third.', author: 'Alex Rivera', role: 'Product designer', avatar: 4, bio: 'Alex is an independent product designer who works with startups and small teams on apps and websites.', date: 'October 7, 2026', dateIso: '2026-10-07', readTime: '8 min read', cover: 'blog-6.jpg', coverAlt: 'A booking flow on a phone', tags: ['Case study', 'UX'], sections: [
      sec('The problem', 'One in three visitors who started booking left before the last step. The team had theories but no evidence, so we began by watching real people use the flow.'),
      sec('What we found', 'Three patterns explained most of the drop-off.', { points: 'The calendar hid available times behind a second tap\nPrices changed between steps\nThe form asked for information we already had' }),
      sec('The result', 'Four weeks later the new flow was live. Drop-off fell by 34%, support questions about prices nearly disappeared and the team kept the weekly testing habit.'),
    ], related: PORTFOLIO.slice(1, 4) }),
  ],
  photographer: [
    { appendTo: 'Blog', replace: 'blog-cards', ...blogGrid({ eyebrow: 'Journal', heading: 'Field notes and *behind the lens*', lead: 'Stories from shoots, and what I learned on the way.' }, PHOTO) },
    article({ blogName: 'Journal', blogFile: 'blog.html', category: 'Field notes', title: 'Chasing the last light in the Dolomites', excerpt: 'Three evenings, one tripod and what I learned about waiting for the right five minutes.', author: 'Mira Lens', role: 'Photographer', avatar: 8, bio: 'Mira photographs landscapes, people and weddings, and writes about the stories behind the pictures.', date: 'October 13, 2026', dateIso: '2026-10-13', readTime: '5 min read', cover: 'blog-1.jpg', coverAlt: 'Mountains at sunset', tags: ['Landscape', 'Field notes'], sections: [
      sec('Why the last hour', 'The most beautiful light is short. In the mountains it can be a matter of minutes, so you arrive early, choose your spot and wait.'),
      sec('What I packed', 'Less than you would think.', { points: 'One camera body and two lenses\nA light tripod\nWarm layers and a head torch' }),
      sec('The five minutes', 'On the third evening the cloud lifted and the rock turned orange for exactly five minutes. I took forty frames, and the best is the one hanging at the top of this page.', { quote: '“The picture is the five minutes. The rest is patience.”' }),
    ], related: PHOTO.slice(1, 4) }),
  ],
  podcast: [
    article({ authorFile: 'about.html', name: 'Show notes', slug: 'show-notes', blogName: 'Episodes', blogFile: 'episodes.html', category: 'Episode 42', title: 'The redesign that almost sank the company', crumb: 'Episode 42: The redesign that almost sank the company', excerpt: 'A founder tells the story of a rebuild that went wrong, what it cost and the one decision that saved it.', author: 'Sam Rivera', role: 'Host', avatar: 7, bio: 'Sam hosts Off the Record, a weekly conversation with people who build things and tell the truth about it.', date: 'October 6, 2026', dateIso: '2026-10-06', readTime: '48 min listen', cover: 'blog-3.jpg', coverAlt: 'A podcast microphone', tags: ['Founders', 'Product', 'Interview'], sections: [
      sec('About this episode', 'Eighteen months into a full rebuild, the team had spent most of their money and shipped nothing. This week, the founder explains how it happened, how it felt and what they changed.'),
      sec('In this episode', 'We talk about the choices that matter when a project drifts.', { points: 'How a “quick rebuild” became a year and a half\nThe meeting where everything changed\nShipping in small pieces instead of one big launch' }),
      sec('Links and notes', 'Everything mentioned in the show, plus the full transcript, is on this page. Subscribe in your favourite player so you never miss an episode.'),
    ], related: PODCAST }),
  ],
};
