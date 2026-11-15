/* Website templates, part 10: the Yoga & Wellness Studio. Same shape as starters-6 to 9.js: home `sections`, hand-written `pages`
   for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES in starters.js. SEO text:
   seo-website-templates-10.js.

   It uses the Class Timetable section (class-timetable.js, new with this template) with Collection Tiles (class styles), a first
   class free banner, memberships (pricing rows), teachers, reviews, the booking form (a class reservation request) and
   Opening Hours & Location. Photos are yoga-*.jpg in public/images/section-templates (royalty-free Pexels photos, resized and
   compressed). Every internal link is a "#page" token, resolved by fixSiteLinks() like the other starters. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const OSM = (lon, lat, d = 0.005) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));

/* classes: [day, time, name, type, teacher, duration, level, spots] */
const C = (day, time, name, type, teacher, duration, level, spots = '') => ({ day, time, name, type, teacher, duration, level, spots, button: 'Book', url: '#book' });
const CLASSES = [
  C('Mon', '07:00', 'Sunrise vinyasa', 'Vinyasa', 'Maya', '60 min', 'All levels', '6 spots left'),
  C('Mon', '12:15', 'Lunchtime stretch', 'Gentle', 'Sam', '45 min', 'All levels'),
  C('Mon', '18:30', 'Reformer pilates', 'Pilates', 'Ines', '55 min', 'Beginner', 'Full'),
  C('Tue', '09:30', 'Hatha basics', 'Hatha', 'Maya', '75 min', 'Beginner', '4 spots left'),
  C('Tue', '18:00', 'Power vinyasa', 'Vinyasa', 'Leo', '60 min', 'Intermediate'),
  C('Tue', '19:30', 'Evening meditation', 'Meditation', 'Sam', '45 min', 'All levels'),
  C('Wed', '07:00', 'Reformer pilates', 'Pilates', 'Ines', '55 min', 'All levels', '3 spots left'),
  C('Wed', '12:15', 'Restorative yoga', 'Restorative', 'Sam', '60 min', 'All levels'),
  C('Wed', '18:30', 'Vinyasa flow', 'Vinyasa', 'Maya', '60 min', 'All levels'),
  C('Thu', '09:30', 'Gentle morning', 'Gentle', 'Sam', '60 min', 'All levels'),
  C('Thu', '18:00', 'Hatha flow', 'Hatha', 'Leo', '75 min', 'Intermediate'),
  C('Thu', '19:30', 'Yin and restore', 'Restorative', 'Ines', '75 min', 'All levels', '5 spots left'),
  C('Fri', '07:00', 'Sunrise vinyasa', 'Vinyasa', 'Maya', '60 min', 'All levels'),
  C('Fri', '12:15', 'Core pilates', 'Pilates', 'Ines', '45 min', 'All levels'),
  C('Fri', '17:30', 'Friday unwind', 'Restorative', 'Sam', '60 min', 'All levels'),
  C('Sat', '09:00', 'Weekend flow', 'Vinyasa', 'Maya', '75 min', 'All levels', '8 spots left'),
  C('Sat', '10:45', 'Aerial yoga', 'Aerial', 'Leo', '60 min', 'Beginner', '3 spots left'),
  C('Sat', '17:00', 'Meditation and sound bath', 'Meditation', 'Sam', '60 min', 'All levels'),
  C('Sun', '09:30', 'Slow flow', 'Gentle', 'Maya', '75 min', 'All levels'),
  C('Sun', '11:00', 'Beginners’ workshop', 'Hatha', 'Leo', '90 min', 'Beginner', '10 spots left'),
  C('Sun', '17:00', 'Restorative yoga', 'Restorative', 'Ines', '60 min', 'All levels'),
];

const NAV = ['navbar-simple', {
  fields: { logoText: 'Stillwater', logoIcon: 'leaf', cta: 'Book a class', ctaUrl: '#book', login: '' },
  lists: { links: links(['Classes', '#schedule'], ['Memberships', '#pricing'], ['Teachers', '#teachers'], ['Visit', '#contact']) },
}];

const HERO = ['image-background-hero', {
  anchor: 'top',
  fields: {
    image: IMG('yoga-hero.jpg'), eyebrow: 'Yoga and Pilates · Bristol',
    headline: 'Slow down. *Breathe.*',
    lead: 'Daily yoga, Pilates and meditation classes in a calm, sunlit studio, for every body and every level. Your first class is free.',
    cta1: 'Book your free class', cta1Url: '#book', cta2: 'See the timetable', cta2Url: '#schedule',
    s1Value: '40+', s1Label: 'classes every week', s2Value: '4.9 ★', s2Label: 'from 860 reviews', s3Value: 'All levels', s3Label: 'beginners welcome',
  },
}];

const STYLES = (anchor) => ['collection-tiles', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Our classes', heading: 'Find *your practice*', lead: 'Four ways to move, from energising flows to deep rest.' },
  lists: { tiles: [
    { image: IMG('yoga-vinyasa.jpg'), imageAlt: 'Two women in a flowing side plank on yoga mats', title: 'Vinyasa', text: 'Flowing and energising', url: '#schedule' },
    { image: IMG('yoga-pilates.jpg'), imageAlt: 'A woman stretching on a Pilates reformer', title: 'Pilates', text: 'Strong and steady', url: '#schedule' },
    { image: IMG('yoga-meditation.jpg'), imageAlt: 'A woman meditating in a sunlit room', title: 'Meditation', text: 'Quiet and clear', url: '#schedule' },
    { image: IMG('yoga-restorative.jpg'), imageAlt: 'A smiling woman sitting on a mat among plants', title: 'Restorative', text: 'Slow and soothing', url: '#schedule' },
  ] },
}];

const TIMETABLE = (anchor, fields = {}) => ['class-timetable', {
  ...(anchor && { anchor }),
  fields: {
    eyebrow: 'Weekly timetable', heading: 'Find *your class*',
    lead: 'Pick a day, or filter by the kind of class you like. All levels are welcome, and your first class is free.',
    allTypes: 'All classes', typeLabel: 'Class types', dayLabel: 'Days of the week', todayLabel: 'Today',
    emptyText: 'No classes on this day for that class type. Try another day or choose all classes.', ...fields,
  },
  lists: { classes: CLASSES },
}];

const STUDIO = ['features-split-image', {
  fields: {
    eyebrow: 'The studio', heading: 'A space designed *for calm*',
    lead: 'Natural light, warm wooden floors and plants in every corner. We keep classes small so every student gets attention.',
    cta: 'Visit the studio', ctaUrl: '#contact',
    image: IMG('yoga-studio.jpg'), imageAlt: 'A bright studio corner with a wooden frame, hanging plants and rolled mats',
  },
  lists: { points: [
    { icon: 'users', title: 'Small classes', text: 'No more than 16 students, so teachers can offer hands-on adjustments.' },
    { icon: 'leaf', title: 'Everything provided', text: 'Mats, blocks, straps and blankets are included, along with filtered water and tea.' },
    { icon: 'heart', title: 'Showers and lockers', text: 'Warm showers, towels to hire and lockers, so you can come straight from work.' },
  ] },
}];

const BANNER = ['cta-gradient-banner', { fields: {
  heading: 'Your first class is *on us*', lead: 'Try any class in the first two weeks, free. No contract and no pressure, just bring yourself.',
  cta1: 'Book a free class', cta1Url: '#book', cta2: 'See memberships', cta2Url: '#pricing', note: 'New students only. Mats and props provided.',
} }];

const PRICING = (anchor) => ['pricing-rows', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Memberships', heading: 'Choose *how you practise*', lead: 'Pay per class, or save with a pass or unlimited membership. Pause or cancel any time.' },
  toggles: { showBilling: false },
  lists: { plans: [
    { name: 'Drop-in', desc: 'A single class, whenever you like.', chips: 'Any class\nMat and props included', monthly: '$22', priceNote: 'per class', cta: 'Book', ctaUrl: '#book' },
    { name: '10-class pass', desc: 'Ten classes to use over six months.', chips: 'Any class\nShare with a friend\nValid 6 months', monthly: '$180', priceNote: 'one-off', cta: 'Buy a pass', ctaUrl: '#book' },
    { badge: 'Most popular', name: 'Unlimited', desc: 'Every class on the timetable, every week.', chips: 'Unlimited classes\nBring a friend monthly\nPause any time', monthly: '$89', priceNote: 'per month', cta: 'Join', ctaUrl: '#book' },
  ] },
}];

const TEACHERS = (anchor) => ['team-grid', {
  ...(anchor && { anchor }),
  fields: { eyebrow: 'Our teachers', heading: 'Guided by *people who care*', lead: 'Four teachers with more than forty years of practice between them.' },
  lists: { members: [
    { photo: av(6), name: 'Maya Lindqvist', role: 'Founder, vinyasa and hatha', bio: 'Teaching since 2011. Loves a slow Sunday flow.' },
    { photo: av(7), name: 'Leo Navarro', role: 'Power vinyasa and aerial', bio: 'A former dancer who makes strength feel playful.' },
    { photo: av(2), name: 'Ines Duarte', role: 'Pilates and yin', bio: 'Reformer specialist with a physio background.' },
    { photo: av(3), name: 'Sam Okoye', role: 'Meditation and restorative', bio: 'Brings calm to even the busiest week.' },
  ] },
}];

const REVIEWS = ['testimonials-grid', {
  fields: { eyebrow: 'Reviews', heading: 'Loved by *our community*', lead: '★ 4.9 from 860+ Google reviews' },
  lists: { quotes: [
    { quote: 'I walked in as a complete beginner, nervous and stiff. The teachers were so kind that I have not missed a week since.', name: 'Hannah W.', role: 'Member for two years', avatar: av(2) },
    { quote: 'Small classes, beautiful light and teachers who really notice you. The Sunday slow flow is the best part of my week.', name: 'Marcus B.', role: 'Unlimited member', avatar: av(3) },
    { quote: 'The reformer pilates classes fixed my back pain. I wish I had found Stillwater years ago.', name: 'Priya N.', role: 'Pilates student', avatar: av(5) },
  ] },
}];

const BOOKING = ['booking-form', {
  anchor: 'book',
  fields: {
    eyebrow: 'Reserve your spot', heading: 'Book *a class*',
    lead: 'Tell us which class you would like and when. We reserve your spot and confirm by email within a few hours.',
    hoursHeading: 'Studio hours', expectHeading: 'Before your first class',
    expect: 'Arrive ten minutes early and we will show you around\nWear comfortable clothes you can stretch in\nMats, blocks and blankets are provided',
    serviceLabel: 'Class', dateLabel: 'Preferred day', timeLabel: 'Preferred time', notesLabel: 'Anything we should know? (injuries, pregnancy, first class)',
    submit: 'Reserve my spot', note: 'This is a request, not a confirmed booking. We reply with your spot or the nearest alternative.',
    successTitle: 'Request received', successText: 'Thank you. We will confirm your spot by email shortly.',
  },
  lists: {
    hours: [{ day: 'Monday – Friday', time: '6:30 am – 8:30 pm' }, { day: 'Saturday', time: '8:00 am – 6:00 pm' }, { day: 'Sunday', time: '8:30 am – 6:00 pm' }],
    services: ['Sunrise vinyasa', 'Hatha basics', 'Reformer pilates', 'Restorative yoga', 'Aerial yoga', 'Meditation and sound bath', 'Beginners’ workshop', 'Not sure yet'].map(name => ({ name })),
    times: ['7:00 am', '9:30 am', '12:15 pm', '5:30 pm', '6:30 pm', '7:30 pm'].map(name => ({ name })),
  },
}];

const HOURS = (fields = {}) => ['opening-hours', {
  anchor: 'contact',
  fields: {
    eyebrow: 'Visit us', heading: 'Come and *find us*', lead: 'We are a five-minute walk from the harbour, with bike storage and a quiet courtyard to arrive in.',
    businessName: 'Stillwater Yoga and Wellness', businessType: 'HealthClub', timezone: 'Europe/London', hoursTitle: 'Studio hours',
    special: 'Reception opens 30 minutes before the first class of the day.',
    street: '9 Quayside Lane', city: 'Bristol', postcode: 'BS1 4RB', country: 'United Kingdom',
    mapUrl: OSM(-2.5995, 51.4505), mapTitle: 'Map showing Stillwater Yoga and Wellness on Quayside Lane, Bristol',
    phone: '+44 117 496 0120', phoneUrl: 'tel:+441174960120', email: 'hello@webdevpuneet.com', emailUrl: 'mailto:hello@webdevpuneet.com',
    directionsLabel: 'Get directions', directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9%20Quayside%20Lane%2C%20Bristol%20BS1', callLabel: 'Call the studio',
    ...fields,
  },
  lists: { hours: [
    ['Monday', '06:30', '20:30'], ['Tuesday', '06:30', '20:30'], ['Wednesday', '06:30', '20:30'], ['Thursday', '06:30', '20:30'],
    ['Friday', '06:30', '19:30'], ['Saturday', '08:00', '18:00', 'Weekend classes'], ['Sunday', '08:30', '18:00', 'Slow flow and workshops'],
  ].map(([day, opens, closes, note = '']) => ({ day, opens, closes, note, closed: '' })) },
}];

const FOOTER = ['footer-columns', {
  fields: { logoText: 'Stillwater', logoIcon: 'leaf', tagline: 'Yoga, Pilates and meditation in the heart of Bristol.', copyright: '© 2026 Stillwater Yoga and Wellness. All rights reserved.', legal: 'Privacy | /privacy/\nTerms | #pricing' },
  lists: {
    columns: [
      { title: 'Classes', links: 'Timetable | #schedule\nMemberships | #pricing\nBook a class | #book' },
      { title: 'Studio', links: 'Our teachers | #teachers\nOpening hours | #contact\nOur story | #story' },
      { title: 'Contact', links: 'Call +44 117 496 0120 | tel:+441174960120\n9 Quayside Lane | #contact\nEmail us | mailto:hello@webdevpuneet.com' },
    ],
    socials: [
      { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
      { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
      { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' },
    ],
  },
}];

export const YOGA_WEBSITE_TEMPLATES = [
  {
    id: 'yoga', name: 'Yoga & Wellness Studio Website', industry: 'Health & fitness',
    blurb: 'A calm yoga and Pilates studio: weekly class timetable with day tabs and filters, class styles, memberships, teachers, class booking and opening hours with a map.',
    theme: { brand: '#4a6b5a', brandText: '#ffffff', bg: '#fbf9f4', surface: '#eef2ec', text: '#1f2f27', muted: '#586a60', radius: '16', maxWidth: '1200' }, fonts: { heading: 'lora', body: 'dmsans' },
    seoTitle: 'Yoga Studio Website Template — Free Class Schedule HTML',
    seoDescription: 'Free yoga studio website template: weekly class timetable with day tabs and filters, memberships, teachers, class booking form and opening hours. Export HTML.',
    keywords: ['yoga studio website template', 'yoga website template', 'pilates studio website template', 'class schedule website template', 'wellness website template html', 'yoga landing page html'],
    intro: 'A calm, airy website for a yoga, Pilates or meditation studio. A sunlit photo hero invites a free first class, and the weekly timetable lets visitors pick a day and filter by class type, with teachers, levels and spots left on every row. Class style tiles, a studio story, memberships, teachers, reviews, a class reservation form and live opening hours with a map complete the page.',
    bestFor: ['Yoga and Pilates studios', 'Dance, barre and fitness studios', 'Wellness centres and meditation groups'],
    sections: [NAV, HERO, STYLES('styles'), TIMETABLE('schedule'), STUDIO, BANNER, PRICING('pricing'), TEACHERS('teachers'), REVIEWS, BOOKING, HOURS(), FOOTER],
    multiLinks: { '#book': 'visit.html#book', '#contact': 'visit.html#contact', '#story': 'teachers.html#story' },
    homeTitle: 'Stillwater Yoga Studio in Bristol: Classes for All Levels',
    homeDescription: 'Stillwater is a calm Bristol studio with daily yoga, Pilates and meditation for every level. See the weekly timetable and book your first class free today.',
    pages: [
      {
        name: 'Classes', slug: 'schedule',
        title: 'Class Timetable: Yoga, Pilates and Meditation | Stillwater',
        description: 'See the weekly Stillwater timetable in Bristol: yoga, Pilates and meditation classes by day and style, with teachers, levels, spots left and online booking.',
        sections: [
          TIMETABLE(),
          STYLES(),
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Your first *class*', lead: 'The questions beginners ask most.', contactText: 'Still unsure?', contactLink: 'Email us', contactUrl: 'mailto:hello@webdevpuneet.com' }, toggles: {}, lists: { faqs: [
            { q: 'I have never done yoga. Which class should I start with?', a: 'Try Hatha basics, Gentle morning or the Sunday beginners’ workshop. Tell the teacher it is your first class and they will guide you through every pose.' },
            { q: 'What should I wear and bring?', a: 'Comfortable clothes you can stretch in. We provide mats, blocks, straps and blankets, and there is filtered water and tea in the studio.' },
            { q: 'Do I need to book?', a: 'Yes, booking is needed for every class so we can keep numbers small. You can cancel up to four hours before without a charge.' },
            { q: 'Can I come if I am pregnant or have an injury?', a: 'Yes. Mention it when you book and your teacher will offer safe options. For pregnancy, we recommend the Gentle and Restorative classes.' },
            { q: 'What is reformer Pilates?', a: 'A low-impact workout on a spring-loaded machine that builds core strength and control. Our beginner classes are small, so the teacher can set the machine up for you.' },
          ] } }],
        ],
      },
      {
        name: 'Memberships', slug: 'pricing',
        title: 'Memberships and Prices: Drop-in and Unlimited | Stillwater',
        description: 'Stillwater yoga and Pilates prices in Bristol: drop-in classes, a 10-class pass and unlimited membership, with your first class free and no contract at all.',
        sections: [PRICING(), BANNER],
      },
      {
        name: 'Teachers', slug: 'teachers',
        title: 'Meet Our Yoga and Pilates Teachers in Bristol | Stillwater',
        description: 'Meet the Stillwater yoga, Pilates and meditation teachers in Bristol, and read the story of our small, sunlit studio and the community who practise there.',
        sections: [
          TEACHERS(),
          ['about-story', {
            anchor: 'story',
            fields: {
              eyebrow: 'Our story', heading: 'A studio built *for slowing down*',
              story: 'Maya Lindqvist opened Stillwater in 2015 in a former printing workshop, with fourteen mats and a belief that yoga should feel welcoming, not intimidating.',
              story2: 'Today the studio runs over forty classes a week with four teachers, still keeps classes small, and still has a pot of tea waiting after every session.',
              image: IMG('yoga-about.jpg'), imageAlt: 'A woman sitting in a calm cross-legged pose with hands at her chest',
              badgeNumber: '9', badgeLabel: 'years of practice together',
              founderPhoto: av(6), founderPhotoAlt: 'Maya Lindqvist, founder', founder: 'Maya Lindqvist', founderRole: 'Founder and lead teacher',
              quote: '“Come as you are. The practice meets you where you are.”',
              primaryLabel: 'Book a class', primaryUrl: '#book', secondaryLabel: 'See the timetable', secondaryUrl: '#schedule',
              orgName: 'Stillwater Yoga and Wellness', foundedYear: '2015',
            },
            lists: {
              facts: [{ number: '40+', label: 'classes a week' }, { number: '16', label: 'students at most' }, { number: '4.9', label: 'average review' }],
              values: [
                { icon: 'heart', title: 'Welcome first', text: 'Every level and every body is welcome, and no one is ever pushed into a pose.' },
                { icon: 'users', title: 'Small classes', text: 'Sixteen students at most, so teachers can see and help everyone.' },
                { icon: 'leaf', title: 'Calm by design', text: 'Natural light, warm floors and quiet music: a place to put the day down.' },
              ],
            },
          }],
        ],
      },
      {
        name: 'Visit', slug: 'visit',
        title: 'Book a Class and Find the Studio in Bristol | Stillwater',
        description: 'Book a Stillwater class in Bristol, see the studio opening hours with a live open-now badge, find the map and directions, and what to bring to your first class.',
        sections: [BOOKING, HOURS({ heading: 'Find *the studio*' })],
      },
    ],
  },
];
