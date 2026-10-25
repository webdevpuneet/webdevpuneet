/* Sections added to the website templates after they were first written (2026-10-24): gallery,
   video, before / after, comparison table, booking form, case studies and a product grid.
   Applied by applyExtras() in starters.js.
     after: the id of a section already in the template (the new one is inserted after its first
            occurrence; the last-but-one position when it is not found)
     before: the same, but inserted in front of it
     replace: the section it takes the place of
   Each section is [id, state] exactly like the template's own `sections`. */
import { IMG } from './meta.js';
import { STARTER_MORE_EXTRAS } from './starters-more.js';

const gallery = (fields, images) => ['gallery-grid', { fields, lists: { images } }];
const img = (file, alt, tag, title, text = '') => ({ image: IMG(file), imageAlt: alt, tag, title, text });
const pair = (before, after, bAlt, aAlt, title, caption) => ({ before: IMG(before), after: IMG(after), beforeAlt: bAlt, afterAlt: aAlt, title, caption });
const hours = list => list.map(([day, time]) => ({ day, time }));
const names = list => list.map(name => ({ name }));

export const STARTER_EXTRAS = {
  saas: [
    { after: 'features-alternating', section: ['video-section', { fields: { eyebrow: 'Product tour', heading: 'See Acme in *two minutes*', lead: 'A quick walk through the roadmap, the task board and the weekly report, using a real team’s workspace.', poster: IMG('hero-dashboard.png'), posterAlt: 'The Acme workspace showing a roadmap and a task board', videoTitle: 'Acme product tour: roadmaps, tasks and reports', duration: '2:05', playLabel: 'Play the product tour' }, lists: { points: [{ title: 'One workspace', text: 'Roadmap, tasks and reports live together, so nothing is copied between tools.' }, { title: 'Ready in minutes', text: 'Import from a spreadsheet or another tool and invite your team the same day.' }, { title: 'Reports that write themselves', text: 'Every Friday a summary of what shipped and what slipped is ready to send.' }] } }] },
    { after: 'pricing-three-tier', section: ['pricing-comparison', { fields: { eyebrow: 'Compare plans', heading: 'Everything in *every Acme plan*', lead: 'Compare what each plan includes, from projects and people to support and security.' } }] },
  ],

  photographer: [
    { after: 'image-background-hero', section: gallery({ eyebrow: 'Selected work', heading: 'Stories from *recent sessions*', lead: 'Weddings, portraits and brand shoots from the last season. Pick a category or tap a photo to see it larger.', allLabel: 'Everything' }, [
      img('tpl-wedding.jpg', 'A wedding scene in soft purple tones', 'Weddings', 'Quinta da Serra', 'A June wedding above Sintra'),
      img('wed-dinner.jpg', 'A long dinner table set with candles', 'Weddings', 'Dinner for sixty', 'Candles, long tables and slow courses'),
      img('wed-party.jpg', 'String lights over a dance floor at night', 'Weddings', 'The last dance', 'Lisbon, an October evening'),
      img('tpl-nature.jpg', 'Green hills at sunrise', 'Portraits', 'Golden hour', 'A family session on the hills at dawn'),
      img('tpl-salon.jpg', 'A bright studio with arched mirrors', 'Portraits', 'Studio light', 'Natural window light, no flash'),
      img('tpl-product.jpg', 'A pair of headphones on a pale background', 'Brands', 'Product day', 'A launch shoot for a small audio brand'),
    ]) },
    { after: 'blog-cards', section: ['product-grid', { fields: { eyebrow: 'Prints & albums', heading: 'Take *the day home*', allLink: 'See all prints', allUrl: '#contact' }, lists: { products: [
      { image: IMG('tpl-nature.jpg'), imageAlt: 'Green hills at sunrise, framed print', badge: 'Best seller', name: 'Golden hour print', text: 'Fine-art paper, 30 × 40 cm', price: '€85', oldPrice: '', rating: '4.9', reviews: '64', button: 'Order a print', url: '#contact' },
      { image: IMG('wed-dinner.jpg'), imageAlt: 'A candlelit wedding dinner table, framed print', badge: '', name: 'Candlelit dinner print', text: 'Fine-art paper, 30 × 40 cm', price: '€85', oldPrice: '', rating: '4.8', reviews: '41', button: 'Order a print', url: '#contact' },
      { image: IMG('tpl-wedding.jpg'), imageAlt: 'A wedding album with a linen cover', badge: 'New', name: 'Wedding album', text: '30 pages, linen cover, lay-flat', price: '€420', oldPrice: '', rating: '5.0', reviews: '27', button: 'Ask about albums', url: '#contact' },
      { image: IMG('wed-party.jpg'), imageAlt: 'A gift voucher for a photo session', badge: '', name: 'Session gift voucher', text: 'A portrait session for two', price: '€150', oldPrice: '', rating: '', reviews: '', button: 'Buy a voucher', url: '#contact' },
    ] } }] },
  ],

  hotel: [
    { after: 'scroll-stack', section: gallery({ eyebrow: 'Gallery', heading: 'A look around *Casa Mar*', lead: 'Rooms, the pool and the evenings on the terrace. Tap any photo to see it larger.', allLabel: 'All' }, [
      img('room-1.jpg', 'A bright double room with tall windows', 'Rooms', 'Garden room', 'Morning light and a quiet view'),
      img('tpl-hotel.jpg', 'The hotel at dusk beside the pool', 'Outdoors', 'The pool at dusk', 'Open until ten every evening'),
      img('tpl-restaurant.jpg', 'Plates of food on a wooden table', 'Dining', 'Breakfast on the terrace', 'Served from 8 until 11'),
      img('room-3.jpg', 'A dark suite with gold details', 'Rooms', 'Night suite', 'Our largest room, with a terrace'),
      img('tpl-nature.jpg', 'Green hills at sunrise', 'Outdoors', 'The coast path', 'Two minutes from the door'),
      img('wed-dinner.jpg', 'A long table set with candles', 'Dining', 'Dinner by candlelight', 'Long tables on summer evenings'),
    ]) },
    { before: 'contact-map', section: ['booking-form', { fields: { eyebrow: 'Book a stay', heading: 'Request *your stay*', lead: 'Tell us the room, the day you arrive and roughly when. We reply within a few hours with availability and the best rate.', hoursHeading: 'Reception', expectHeading: 'Good to know', expect: 'Check-in from 3 pm, check-out until 11 am\nBreakfast included in every rate\nFree cancellation up to 7 days before arrival', serviceLabel: 'Room', dateLabel: 'Arrival date', timeLabel: 'Expected arrival', notesLabel: 'Anything we should know?', submit: 'Request this stay', note: 'This is a request, not a confirmed booking. We reply with availability.', successTitle: 'Request received', successText: 'Thank you. We will email you availability and the rate shortly.' }, lists: {
      hours: hours([['Reception', '7:00 am – 11:00 pm'], ['Check-in', 'from 3:00 pm'], ['Check-out', 'until 11:00 am']]),
      services: names(['Garden room', 'Sea room', 'Night suite', 'Family suite']),
      times: names(['Before 2 pm', 'Afternoon (2 pm – 6 pm)', 'Evening (6 pm – 9 pm)', 'Late (after 9 pm)']),
    } }] },
  ],

  wedding: [
    { after: 'scroll-path', section: gallery({ eyebrow: 'Gallery', heading: 'A few *places and moments*', lead: 'The venue, the dinner and the party, so you know what to expect. Tap a photo to see it larger.', allLabel: 'All' }, [
      img('tpl-wedding.jpg', 'The ceremony space in soft purple light', 'Ceremony', 'The ceremony', 'Under the old cork oaks'),
      img('tpl-church.jpg', 'The chapel at the edge of the garden', 'Ceremony', 'The chapel', 'Where we say our vows'),
      img('wed-dinner.jpg', 'A long dinner table set with candles', 'Dinner', 'Dinner for sixty', 'One long table, lots of candles'),
      img('tpl-restaurant.jpg', 'Plates of food on a wooden table', 'Dinner', 'The menu', 'Local fish, vegetables and wine'),
      img('wed-party.jpg', 'String lights over a dance floor', 'Party', 'The dance floor', 'Lights, music and good shoes'),
      img('tpl-event.jpg', 'A stage with spotlights', 'Party', 'The band', 'Live music until midnight'),
    ]) },
  ],

  restaurant: [
    { after: 'restaurant-menu', section: gallery({ eyebrow: 'Gallery', heading: 'From *the kitchen and the room*', lead: 'Plates from the wood-fired oven and the dining room in the evening. Tap a photo to see it larger.', allLabel: 'All' }, [
      img('tpl-restaurant.jpg', 'Plates of food on a wooden table', 'Dishes', 'Wood-fired octopus', 'With smoked paprika and lemon'),
      img('wed-dinner.jpg', 'A long candlelit table', 'The room', 'The long table', 'Shared dinners for up to twelve'),
      img('tpl-salon.jpg', 'Arched mirrors in a warm room', 'The room', 'The front room', 'Arched mirrors and warm light'),
      img('tpl-hotel.jpg', 'A building lit at dusk beside a pool', 'The room', 'The terrace at dusk', 'Drinks outside from May'),
      img('tpl-nature.jpg', 'Green hills at sunrise', 'The room', 'Views from the terrace', 'Open for lunch in summer'),
    ]) },
    { before: 'contact-map', section: ['booking-form', { fields: { eyebrow: 'Reserve', heading: 'Request *a table*', lead: 'Choose lunch or dinner, the day and a time. We confirm every request by email.', hoursHeading: 'Opening hours', expectHeading: 'Good to know', expect: 'Tables are held for 15 minutes\nParties of 8 or more: please ask about our set menu\nTell us about any allergies in the notes', serviceLabel: 'Service', dateLabel: 'Day', timeLabel: 'Time', notesLabel: 'Party size and allergies', submit: 'Request a table', note: 'We reply within a few hours to confirm your table.', successTitle: 'Request received', successText: 'Thank you. We will email you to confirm your table.' }, lists: {
      hours: hours([['Tuesday – Thursday', '6:00 pm – 11:00 pm'], ['Friday – Saturday', '12:30 pm – 3:00 pm, 6:00 pm – 11:30 pm'], ['Sunday', '12:30 pm – 4:00 pm'], ['Monday', 'Closed']]),
      services: names(['Dinner', 'Lunch', 'Private dining', 'Wine tasting']),
      times: names(['12:30 pm', '2:00 pm', '6:30 pm', '8:00 pm', '9:30 pm']),
    } }] },
  ],

  salon: [
    { after: 'restaurant-menu', section: ['before-after-slider', { fields: { eyebrow: 'Results', heading: 'Colour and cut, *before and after*', lead: 'Drag the handle to see what a consultation, a colour and a cut can do. Shared with our clients’ permission.', beforeLabel: 'Before', afterLabel: 'After' }, lists: { pairs: [
      pair('room-2.jpg', 'room-4.jpg', 'Before photo (sample image)', 'After photo (sample image)', 'Warm balayage refresh', 'Three hours with Amara, including a gloss and a blow-dry.'),
      pair('tpl-restaurant.jpg', 'wed-dinner.jpg', 'Before photo (sample image)', 'After photo (sample image)', 'Layered cut with movement', 'A restyle with soft layers that dries well at home.'),
    ] } }] },
    { replace: 'contact-split-form', section: ['booking-form', { fields: { eyebrow: 'Book', heading: 'Request *your appointment*', lead: 'Choose the service, the day and a time that suits you. We confirm every request by text or email.', hoursHeading: 'Opening hours', expectHeading: 'Before you come', expect: 'Every visit starts with a free consultation\nPatch tests are done 48 hours before colour\nFree cancellation up to 24 hours before', note: 'This is a request, not a confirmed booking. We reply to confirm.' }, lists: {
      hours: hours([['Tuesday – Wednesday', '9:30 am – 6:00 pm'], ['Thursday – Friday', '9:30 am – 8:00 pm'], ['Saturday', '9:00 am – 5:00 pm'], ['Sunday – Monday', 'Closed']]),
      services: names(['Consultation', 'Cut and blow-dry', 'Colour', 'Balayage', 'Treatment']),
    } }] },
  ],

  dental: [
    { after: 'features-steps', section: ['before-after-slider', { fields: { eyebrow: 'Smile results', heading: 'Real *smile makeovers*', lead: 'Drag the handle to compare. Shown with each patient’s permission; results vary from person to person.', beforeLabel: 'Before', afterLabel: 'After' }, lists: { pairs: [
      pair('room-2.jpg', 'room-4.jpg', 'Before photo (sample image)', 'After photo (sample image)', 'Whitening and gentle reshaping', 'Two visits over three weeks.'),
    ] } }] },
    { before: 'contact-map', section: ['booking-form', { fields: { eyebrow: 'Book online', heading: 'Request *your first visit*', lead: 'Choose a treatment, a day and a time. We confirm by email, and we are happy to talk through any worries first.', hoursHeading: 'Opening hours', expectHeading: 'Your first visit', expect: 'A gentle check-up and a clear, written plan\nNo treatment without your say-so\nEvening and Saturday appointments available', serviceLabel: 'Treatment', note: 'This is a request, not a confirmed appointment. We reply to confirm.', successText: 'Thank you. We will email you to confirm your appointment.' }, lists: {
      hours: hours([['Monday – Thursday', '8:00 am – 7:00 pm'], ['Friday', '8:00 am – 5:00 pm'], ['Saturday', '9:00 am – 2:00 pm'], ['Sunday', 'Closed']]),
      services: names(['New patient check-up', 'Hygiene appointment', 'Whitening consultation', 'Emergency appointment', 'Children’s check-up']),
    } }] },
  ],

  'local-service': [
    { after: 'features-steps', section: ['before-after-slider', { fields: { eyebrow: 'The difference', heading: 'Spotless, *every time*', lead: 'Drag the handle to see the same room before and after one of our visits.', beforeLabel: 'Before', afterLabel: 'After' }, lists: { pairs: [
      pair('room-2.jpg', 'room-1.jpg', 'Before photo (sample image)', 'After photo (sample image)', 'Kitchen deep clean', 'Four hours, two cleaners and an oven made new.'),
      pair('tpl-restaurant.jpg', 'tpl-salon.jpg', 'Before photo (sample image)', 'After photo (sample image)', 'Office, weekly clean', 'Desks, floors and kitchenette ready for Monday.'),
    ] } }] },
  ],

  fitness: [
    { after: 'testimonials-marquee', section: ['before-after-slider', { fields: { eyebrow: 'Member progress', heading: 'Twelve weeks, *real change*', lead: 'Drag the handle to compare week one and week twelve. Shared with each member’s permission.', beforeLabel: 'Week 1', afterLabel: 'Week 12' }, lists: { pairs: [
      pair('room-3.jpg', 'room-1.jpg', 'Week one photo (sample image)', 'Week twelve photo (sample image)', 'Dan: strength block', 'Three sessions a week with the IRONHOUSE barbell club.'),
    ] } }] },
  ],

  agency: [
    { after: 'stats-counters', section: ['case-study-showcase', { fields: { eyebrow: 'Selected work', heading: 'Work that *moved the numbers*', lead: 'Two recent projects, from the first workshop to the results.' }, lists: { cases: [
      { image: IMG('hero-dashboard.png'), imageAlt: 'The new Lumen website and dashboard on a laptop', client: 'Lumen Analytics', tag: 'Brand · Website · Product', headline: 'A new brand and site that *doubled demo requests*', summary: 'We rebuilt the identity, the website and the product tour for a data company that was hard to explain in a sentence.', stat1: '+118%', label1: 'demo requests', stat2: '2.4×', label2: 'time on site', stat3: '9 wks', label3: 'from kick-off to launch', quote: 'Northstar made us look like the company we had become.', person: 'Priya Raman', role: 'Head of Growth, Lumen', linkText: 'Read the Lumen story', url: '#' },
      { image: IMG('tpl-product.jpg'), imageAlt: 'The Sona Audio product page on a pale blue background', client: 'Sona Audio', tag: 'E-commerce · Campaign', headline: 'A launch campaign that *sold out in nine days*', summary: 'Positioning, photography and a one-page store for the first product from a new audio brand.', stat1: '9 days', label1: 'to sell out', stat2: '$1.2M', label2: 'first-year revenue', stat3: '', label3: '', quote: 'We had a waiting list before the first ad ran.', person: 'Daniel Okoye', role: 'Founder, Sona', linkText: 'Read the Sona story', url: '#' },
    ] } }] },
  ],

  portfolio: [
    { after: 'features-icon-grid', section: ['case-study-showcase', { fields: { eyebrow: 'Case studies', heading: 'Projects *and their results*', lead: 'Two recent projects with the numbers that mattered to the client.' }, lists: { cases: [
      { image: IMG('hero-dashboard.png'), imageAlt: 'A redesigned analytics dashboard on a laptop', client: 'Fieldnote', tag: 'Product design', headline: 'Redesigning onboarding to *cut drop-off by a third*', summary: 'Six weeks of research, prototypes and tests to make a notes app’s first ten minutes clearer.', stat1: '-34%', label1: 'drop-off', stat2: '+22%', label2: 'week-one activation', stat3: '', label3: '', quote: 'Alex asked better questions than anyone else we had worked with.', person: 'Mina Park', role: 'CEO, Fieldnote', linkText: 'Read the case study', url: '#' },
      { image: IMG('tpl-course.png'), imageAlt: 'A course website with a lesson list', client: 'Design Academy', tag: 'Website', headline: 'A course site that *tripled enrolments*', summary: 'A new structure, clearer pricing and a lighter page for a design school’s main course.', stat1: '3×', label1: 'enrolments', stat2: '-1.4 s', label2: 'load time', stat3: '', label3: '', quote: '', person: '', role: '', linkText: 'Read the case study', url: '#' },
    ] } }] },
  ],

  'online-course': [
    { after: 'features-icon-grid', section: ['video-section', { fields: { eyebrow: 'Course preview', heading: 'Watch *the first lesson*', lead: 'Sit in on lesson one: how a good interface starts as a sketch, and what you will build in week one.', poster: IMG('tpl-course.png'), posterAlt: 'A course lesson on screen with a list of modules', videoTitle: 'Design Academy preview lesson: from sketch to interface', duration: '6:40', playLabel: 'Play the preview lesson' }, lists: { points: [{ title: 'Learn by building', text: 'Every module ends with a real project for your portfolio.' }, { title: 'Feedback from a pro', text: 'Submit work every week and get notes from your tutor.' }, { title: 'Learn at your pace', text: 'Lessons are short, with lifetime access to replay them.' }] } }] },
  ],

  coach: [
    { replace: 'contact-split-form', section: ['booking-form', { fields: { eyebrow: 'Book', heading: 'Book your *free discovery call*', lead: 'Choose the kind of session, a day and a time of day. I will reply with the exact times I have free.', hoursHeading: 'Call times', expectHeading: 'What happens on the call', expect: 'A relaxed 30-minute conversation\nNo pressure and no sales script\nA clear next step, whether or not we work together', serviceLabel: 'Type of call', dateLabel: 'Preferred day', timeLabel: 'Time of day', notesLabel: 'Where are you now, and where would you like to be?', submit: 'Request a call', note: 'I reply within one working day with times.', successTitle: 'Request received', successText: 'Thank you. I will email you with times shortly.' }, lists: {
      hours: hours([['Monday – Thursday', '9:00 am – 5:00 pm'], ['Friday', '9:00 am – 1:00 pm'], ['Weekends', 'Closed']]),
      services: names(['Free discovery call', 'Career strategy session', 'Interview coaching']),
      times: names(['Morning', 'Lunchtime', 'Afternoon', 'Early evening']),
    } }] },
  ],

  'product-store': [
    { after: 'features-alternating', section: ['video-section', { fields: { eyebrow: 'See it in action', heading: 'Sona One, *in two minutes*', lead: 'Noise cancelling on a train, calls in a café and a full day of battery, shown on camera.', poster: IMG('hero-landscape.jpg'), posterAlt: 'A sunrise over a quiet valley', videoTitle: 'Sona One in two minutes: noise cancelling, calls and battery', duration: '2:10', playLabel: 'Watch the film' }, lists: { points: [{ title: 'Quiet on demand', text: 'Six microphones listen to the room and adapt 50,000 times a second.' }, { title: 'A full week of battery', text: 'Forty hours per charge, with a five-minute boost for three hours more.' }, { title: 'Made to last', text: 'Replaceable ear pads and a two-year warranty.' }] } }] },
    { after: 'testimonials-grid', section: ['product-grid', { fields: { eyebrow: 'Complete the set', heading: 'Pairs well *with Sona One*', allLink: 'Shop all Sona', allUrl: '#pricing' } }] },
  ],

  podcast: [
    { after: 'blog-list', section: ['video-section', { fields: { eyebrow: 'Watch', heading: 'See *the show*', lead: 'Every episode is recorded on video. Start with the trailer, then pick a guest.', poster: IMG('tpl-podcast.jpg'), posterAlt: 'The Off the Record studio with two microphones', videoTitle: 'Off the Record trailer: founders on what really happened', duration: '1:30', playLabel: 'Play the trailer' }, lists: { points: [{ title: 'New every Tuesday', text: 'A fresh conversation with a founder, designer or maker.' }, { title: 'Full video and audio', text: 'Watch here or listen in your favourite podcast app.' }, { title: 'Show notes and links', text: 'Every episode has the books, tools and people mentioned.' }] } }] },
  ],

  church: [
    { after: 'features-icon-grid', section: gallery({ eyebrow: 'Gallery', heading: 'Life at *Grace Chapel*', lead: 'Sundays, midweek groups and community events. Tap a photo to see it larger.', allLabel: 'All' }, [
      img('tpl-church.jpg', 'The chapel in the evening light', 'Sundays', 'The chapel', 'Where we meet on Sundays'),
      img('tpl-event.jpg', 'A stage with soft lighting', 'Sundays', 'Worship', 'Live music at the 11:30 service'),
      img('wed-dinner.jpg', 'A long table set for a shared meal', 'Community', 'Community lunch', 'First Sunday of every month'),
      img('tpl-nature.jpg', 'Green hills at sunrise', 'Community', 'Walking group', 'Wednesdays at 10 am'),
      img('wed-party.jpg', 'String lights outdoors at night', 'Events', 'Summer evening', 'Food, music and games in the garden'),
      img('tpl-school.jpg', 'A classroom with colourful shapes', 'Events', 'Children’s club', 'Fridays after school'),
    ]) },
  ],

  school: [
    { after: 'features-icon-grid', section: gallery({ eyebrow: 'Gallery', heading: 'Life at *Brookfield*', lead: 'Classrooms, the garden and school events. Tap a photo to see it larger.', allLabel: 'All' }, [
      img('tpl-school.jpg', 'A bright classroom with colourful shapes', 'Classrooms', 'Year 2 classroom', 'Small classes, big tables'),
      img('tpl-nature.jpg', 'Green hills at sunrise', 'Outdoors', 'Outdoor learning', 'Every class goes outside each week'),
      img('tpl-course.png', 'A lesson on a screen', 'Classrooms', 'Computing lab', 'Coding from Year 3'),
      img('wed-party.jpg', 'String lights over a playground at dusk', 'Events', 'Summer fair', 'Run by parents and pupils'),
      img('tpl-event.jpg', 'A stage with spotlights', 'Events', 'The school play', 'Year 6 leavers’ performance'),
    ]) },
  ],
};

/** The templates with the extra sections placed in (sections not found fall back to just before the footer) */
// Popups and share bars (starters-more.js) come after the sections added above
for (const [id, more] of Object.entries(STARTER_MORE_EXTRAS)) STARTER_EXTRAS[id] = [...(STARTER_EXTRAS[id] || []), ...more];

export function applyExtras(list) {
  return list.map(t => {
    const extras = STARTER_EXTRAS[t.id];
    if (!extras) return t;
    const sections = [...t.sections];
    for (const e of extras) {
      if (e.replace) {
        const i = sections.findIndex(s => s[0] === e.replace);
        if (i >= 0) { sections[i] = e.section; continue; }
      }
      const key = e.after || e.before;
      let i = sections.findIndex(s => s[0] === key);
      if (i < 0) i = sections.length - 2;
      sections.splice(e.before ? Math.max(i, 0) : i + 1, 0, e.section);
    }
    return { ...t, sections };
  });
}
