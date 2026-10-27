/* Website templates, part 4: Music (a band or solo artist). Same shape as starters.js: home `sections`,
   hand-written `pages` for the multi-page version, `multiLinks` and home SEO. Appended to WEBSITE_TEMPLATES
   in starters.js. Art and demo audio: scripts/make-template-art-4.cjs. */
import { IMG } from './meta.js';

const av = n => IMG(`avatar-${n}.jpg`);
const links = (...pairs) => pairs.map(([label, url]) => ({ label, url }));
const nav = (logoText, logoIcon, cta, list, extra = {}) => ({ fields: { logoText, logoIcon, cta, ctaUrl: '#contact', ...extra }, lists: { links: list } });
const hours = list => list.map(([day, time]) => ({ day, time }));
const names = list => list.map(name => ({ name }));

const STREAMING = { fields: { eyebrow: 'Stream everywhere', heading: 'Listen *wherever you listen*', lead: 'Every song, every album and the live sessions, on your favourite platform.' }, lists: { platforms: [
  { small: 'Listen on', name: 'Spotify', url: '#' }, { small: 'Listen on', name: 'Apple Music', url: '#' }, { small: 'Watch on', name: 'YouTube', url: '#' }, { small: 'Buy on', name: 'Bandcamp', url: '#' },
] } };

const SHOWS = [
  { month: 'NOV', day: '14', city: 'Lisbon, PT', venue: 'LX Factory', status: 'Sold out', button: 'Sold out', url: '#', iso: '2026-11-14T21:00' },
  { month: 'NOV', day: '16', city: 'Madrid, ES', venue: 'Sala Mon', status: 'Few left', button: 'Get tickets', url: '#', iso: '2026-11-16T21:00' },
  { month: 'NOV', day: '19', city: 'Barcelona, ES', venue: 'Razzmatazz 2', status: 'Tickets', button: 'Get tickets', url: '#', iso: '2026-11-19T20:30' },
  { month: 'NOV', day: '22', city: 'Paris, FR', venue: 'La Maroquinerie', status: 'Tickets', button: 'Get tickets', url: '#', iso: '2026-11-22T20:00' },
  { month: 'NOV', day: '27', city: 'Berlin, DE', venue: 'Lido', status: 'Tickets', button: 'Get tickets', url: '#', iso: '2026-11-27T20:00' },
  { month: 'DEC', day: '03', city: 'London, UK', venue: 'Electric Ballroom', status: 'Free', button: 'RSVP free', url: '#', iso: '2026-12-03T19:30' },
];

const RELEASES = [
  { cover: IMG('mus-cover-1.jpg'), coverAlt: 'Album cover with a pink sun rising over dark water', tag: 'Album', title: 'Static Hearts', year: '2026', info: '11 tracks', button: 'Listen', url: '#' },
  { cover: IMG('mus-cover-2.jpg'), coverAlt: 'Single cover with a glowing cyan circle on black', tag: 'Single', title: 'Lights Out in Lisbon', year: '2026', info: '3:42', button: 'Listen', url: '#' },
  { cover: IMG('mus-cover-3.jpg'), coverAlt: 'EP cover with overlapping violet and orange waves', tag: 'EP', title: 'Night Tram', year: '2025', info: '5 tracks', button: 'Listen', url: '#' },
  { cover: IMG('mus-cover-4.jpg'), coverAlt: 'Album cover with a grid of golden dots on deep blue', tag: 'Album', title: 'Paper Skies', year: '2024', info: '10 tracks', button: 'Listen', url: '#' },
  { cover: IMG('mus-cover-5.jpg'), coverAlt: 'Live album cover with stage lights above a crowd silhouette', tag: 'Live', title: 'Live at Coliseu', year: '2023', info: '14 tracks', button: 'Listen', url: '#' },
  { cover: IMG('mus-cover-3.jpg'), coverAlt: 'Single cover with overlapping violet and orange waves', tag: 'Single', title: 'Slow Fire', year: '2023', info: '3:18', button: 'Listen', url: '#' },
];

const VIDEO = ['video-section', { anchor: 'videos', fields: { eyebrow: 'Live session', heading: 'Lights Out in Lisbon, *live in the church*', lead: 'Recorded in one take with the whole band in the converted church where the album was made.', poster: IMG('mus-crowd.jpg'), posterAlt: 'A crowd with hands in the air in front of coloured stage lights', videoTitle: 'Velvet Static: Lights Out in Lisbon (live session)', duration: '4:12', playLabel: 'Play the live session' }, lists: { points: [
  { title: 'One take', text: 'No overdubs and no click track, just five people in a room.' },
  { title: 'Shot on film', text: 'Filmed on 16mm by Marta Leal in a single afternoon.' },
  { title: 'Full album live', text: 'Watch all eleven songs from Static Hearts on our channel.' },
] } }];

const GALLERY = ['gallery-grid', { fields: { eyebrow: 'Gallery', heading: 'On stage *and in the studio*', lead: 'Shows, rehearsals and the church where we recorded the album. Pick a category or tap a photo to see it larger.', allLabel: 'All' }, lists: { images: [
  { image: IMG('tpl-music.jpg'), imageAlt: 'The singer at the microphone under cyan and pink stage lights', tag: 'Live', title: 'Coliseu dos Recreios', text: 'The last night of the Paper Skies tour' },
  { image: IMG('mus-crowd.jpg'), imageAlt: 'A crowd with hands raised in front of coloured lights', tag: 'Crowd', title: 'Lisbon, sold out', text: 'Two thousand voices on the last chorus' },
  { image: IMG('mus-band.jpg'), imageAlt: 'The four band members as silhouettes against a glowing backdrop', tag: 'Band', title: 'The band', text: 'Before the sound check in Madrid' },
  { image: IMG('mus-studio.jpg'), imageAlt: 'A mixing desk with glowing faders under a warm lamp', tag: 'Studio', title: 'The church studio', text: 'Where Static Hearts was recorded to tape' },
  { image: IMG('tpl-event.jpg'), imageAlt: 'A stage lit by spotlights in front of an audience', tag: 'Live', title: 'Festival main stage', text: 'Sunset set, Vilar de Mouros' },
  { image: IMG('wed-party.jpg'), imageAlt: 'String lights over a dance floor at night', tag: 'Crowd', title: 'After the show', text: 'Meeting fans at the merch table' },
] } }];

const PRESS = ['testimonials-carousel', { fields: { eyebrow: 'In the press', heading: 'What they are *saying*', lead: 'Reviews of Static Hearts and the live show.' }, lists: { quotes: [
  { quote: 'Big drums, shimmering synths and choruses you will be humming all week. Static Hearts is the best dream-pop record of the year.', name: 'The Wire Report', role: 'Album review, 5 stars', avatar: av(2), avatarAlt: 'Portrait of a reviewer' },
  { quote: 'Seeing Velvet Static live is a reminder of why we go to gigs. Two thousand people sang every word.', name: 'Lisbon Nights', role: 'Live review', avatar: av(5), avatarAlt: 'Portrait of a writer' },
  { quote: 'A band that sounds enormous and intimate at the same time. One to watch.', name: 'Indie Radar', role: 'Artists to watch 2027', avatar: av(3), avatarAlt: 'Portrait of a critic' },
] } }];

const MERCH = ['product-grid', { anchor: 'merch', fields: { eyebrow: 'Merch', heading: 'Take *the music home*', allLink: 'See everything', allUrl: '#merch' }, lists: { products: [
  { image: IMG('mus-cover-1.jpg'), imageAlt: 'Static Hearts on vinyl', badge: 'New', name: 'Static Hearts, vinyl LP', text: '180 g, gatefold, with a download code', price: '€28', oldPrice: '', rating: '5.0', reviews: '112', button: 'Add to cart', url: '#' },
  { image: IMG('mus-cover-3.jpg'), imageAlt: 'Night Tram cassette', badge: '', name: 'Night Tram, cassette', text: 'Limited run of 300, numbered', price: '€12', oldPrice: '', rating: '4.9', reviews: '41', button: 'Add to cart', url: '#' },
  { image: IMG('mus-cover-5.jpg'), imageAlt: 'Tour poster with stage lights', badge: 'Tour', name: 'Static Hearts tour poster', text: 'A2 print, signed by the band', price: '€15', oldPrice: '', rating: '4.8', reviews: '58', button: 'Add to cart', url: '#' },
  { image: IMG('mus-cover-4.jpg'), imageAlt: 'Paper Skies compact disc', badge: '', name: 'Paper Skies, signed CD', text: 'Digipak with a 12-page booklet', price: '€14', oldPrice: '€18', rating: '4.9', reviews: '73', button: 'Add to cart', url: '#' },
] } }];

const BOOKING = ['booking-form', { fields: { eyebrow: 'Get in touch', heading: 'Bookings, *press and licensing*', lead: 'Tell us what you have in mind: a show, an interview or a song for your film. Our manager replies within two working days.', hoursHeading: 'Contacts', expectHeading: 'Good to know', expect: 'Festival and club bookings go through our agent\nPress kit with photos and logos is free to download\nWe license songs for film, TV and advertising', serviceLabel: 'What is this about?', dateLabel: 'Date (if it is for a show)', timeLabel: 'Best time to reach you', notesLabel: 'Tell us more', submit: 'Send the message', note: 'We reply within two working days.', successTitle: 'Message received', successText: 'Thank you. Our manager will be in touch shortly.' }, lists: {
  hours: hours([['Bookings', 'bookings@velvetstatic.example'], ['Press', 'press@velvetstatic.example'], ['Licensing', 'sync@velvetstatic.example']]),
  services: names(['Booking a show', 'Press and interviews', 'Licensing a song', 'Something else']),
  times: names(['Morning', 'Afternoon', 'Evening']),
} }];

const NEWSLETTER = ['cta-newsletter', { fields: { icon: 'mail', heading: 'Be first to *hear what is next*', lead: 'New songs, tour dates and presales a day before everyone else, once or twice a month.', proof: 'Join 24,000 fans', button: 'Sign me up', note: 'No spam. Unsubscribe any time.' } }];

const FOOTER = ['footer-minimal', { fields: { logoText: 'Velvet Static', logoIcon: 'headphones', links: 'Music | #music\nTour | #tour\nVideos | #videos\nMerch | #merch\nContact | #contact', copyright: '© 2026 Velvet Static' }, lists: { socials: [
  { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' }, { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' }, { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' }, { icon: 'twitter', label: 'X', url: 'https://x.com/' },
] } }];

const heroState = { fields: { image: IMG('tpl-music.jpg'), imageAlt: 'The singer at the microphone under cyan and pink stage lights', pill: 'New album · Out 14 November', name: 'Velvet\n*Static*', tagline: 'Dream-pop from Lisbon with big drums, late-night synths and songs made to be sung back.', cta1: 'Listen now', cta1Url: '#listen', cta2: 'Tour dates', cta2Url: '#tour' }, lists: { links: [{ label: 'Spotify', url: '#' }, { label: 'Apple Music', url: '#' }, { label: 'YouTube', url: '#' }, { label: 'Bandcamp', url: '#' }] } };
const spotlightState = { fields: { eyebrow: 'New album', heading: 'Static *Hearts*', text: 'Eleven songs about leaving, arriving and everything in between, recorded live to tape in a converted church in Porto.', cover: IMG('mus-cover-1.jpg'), coverAlt: 'Album cover with a pink sun rising over dark water', releaseAt: '2026-11-14T00:00', cta1: 'Pre-save the album', cta1Url: '#', cta1Out: 'Listen now', cta2: 'Watch the teaser', cta2Url: '#videos' } };

export const MUSIC_WEBSITE_TEMPLATES = [
  {
    id: 'music', name: 'Music Artist & Band Website', industry: 'Music',
    blurb: 'Stage hero with listen links, release countdown, audio player, tour dates, discography, live video, merch and bookings.',
    theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '14', maxWidth: '1200' }, fonts: { heading: 'space', body: 'inter' },
    seoTitle: 'Music Artist & Band Website Template — Free HTML Template',
    seoDescription: 'Free band and artist website template: stage hero, release countdown, audio player, tour dates with tickets, discography, live video, merch and booking form.',
    keywords: ['band website template', 'musician website template', 'artist website template', 'music website html', 'dj website template', 'album release landing page'],
    intro: 'A dark, stage-lit home for a band or solo artist: a hero with listen links, a countdown to the new album, an audio player with song previews, tour dates with ticket buttons, your whole discography, a live video, merch and a booking and press form, ready to export.',
    bestFor: ['Bands, solo artists and singer-songwriters', 'DJs, producers and electronic acts', 'Album and single launch pages'],
    sections: [
      ['navbar-floating', nav('Velvet Static', 'headphones', 'Listen now', links(['Music', '#music'], ['Tour', '#tour'], ['Videos', '#videos'], ['Merch', '#merch'], ['Contact', '#contact']), { ctaUrl: '#listen' })],
      ['music-hero', heroState],
      ['release-spotlight', spotlightState],
      ['audio-player', { fields: { eyebrow: 'Listen', heading: 'Press play on *the new songs*', lead: 'Short previews of the new album. Tap a track to play it, or stream the full song with the link beside it.' } }],
      ['tour-dates', { fields: { eyebrow: 'On tour', heading: 'See us *live*', lead: 'The Static Hearts tour: eleven shows across Europe this winter. Tickets go fast, so grab yours early.', artist: 'Velvet Static' }, lists: { shows: SHOWS } }],
      ['discography', { fields: { eyebrow: 'Discography', heading: 'Albums, EPs *and singles*', lead: 'Everything we have released so far, newest first. Pick a type or tap any cover to listen.' }, lists: { releases: RELEASES } }],
      VIDEO, GALLERY, PRESS, MERCH, BOOKING, NEWSLETTER, FOOTER,
    ],
    multiLinks: { '#music': 'music.html', '#tour': 'tour.html', '#videos': 'videos.html', '#merch': 'merch.html', '#contact': 'contact.html' },
    homeTitle: 'Velvet Static: Dream-Pop Band From Lisbon. New Album, Tour',
    homeDescription: 'Velvet Static is a dream-pop band from Lisbon. Hear the new album Static Hearts, watch the live session, see tour dates and get tickets, vinyl and merch.',
    pages: [
      {
        name: 'Music', slug: 'music',
        title: 'Music: Albums, EPs and Singles by Velvet Static Band',
        description: 'Every Velvet Static release in one place: the new album Static Hearts, the Night Tram EP, singles and the live album, with links to listen on every platform.',
        sections: [
          ['scroll-ring', { fields: { eyebrow: 'The records', heading: 'Five covers, *one catalogue*', lead: 'Drag or scroll through the album art, then tap a cover to listen.', style: 'coverflow', details: 'below', ctaLabel: 'Listen now', tilt: 'on', reflect: 'on' }, lists: { cards: [
            { image: IMG('mus-cover-1.jpg'), imageAlt: 'Static Hearts album cover', tag: 'Album · 2026', title: 'Static Hearts', text: 'Eleven songs recorded live to tape in a church in Porto.', url: '#' },
            { image: IMG('mus-cover-2.jpg'), imageAlt: 'Lights Out in Lisbon single cover', tag: 'Single · 2026', title: 'Lights Out in Lisbon', text: 'The song that opened every show this year.', url: '#' },
            { image: IMG('mus-cover-3.jpg'), imageAlt: 'Night Tram EP cover', tag: 'EP · 2025', title: 'Night Tram', text: 'Five late-night songs written on the last tram home.', url: '#' },
            { image: IMG('mus-cover-4.jpg'), imageAlt: 'Paper Skies album cover', tag: 'Album · 2024', title: 'Paper Skies', text: 'Our breakthrough record, ten songs about growing up.', url: '#' },
            { image: IMG('mus-cover-5.jpg'), imageAlt: 'Live at Coliseu album cover', tag: 'Live · 2023', title: 'Live at Coliseu', text: 'Recorded in front of two thousand people in Lisbon.', url: '#' },
          ] } }],
          ['discography', { fields: { eyebrow: 'Discography', heading: 'Every *release*', lead: 'Filter by type or tap a cover to listen.' }, lists: { releases: RELEASES } }],
          ['streaming-links', STREAMING],
          NEWSLETTER,
        ],
      },
      {
        name: 'Tour', slug: 'tour',
        title: 'Velvet Static Tour Dates 2026: Concerts and Tickets',
        description: 'See every Velvet Static concert on the Static Hearts tour in Europe, with dates, venues, ticket links and answers to questions about age limits and refunds.',
        sections: [
          ['tour-dates', { fields: { eyebrow: 'On tour', heading: 'Tour dates *and tickets*', lead: 'Eleven shows across Europe this winter. Sold-out dates may get a second night, so check back.', artist: 'Velvet Static' }, lists: { shows: SHOWS } }],
          ['faq-accordion', { fields: { eyebrow: 'Good to know', heading: 'Gig *questions*', lead: 'The things people ask us before a show.', contactText: 'Still have a question?', contactLink: 'Ask the team', contactUrl: 'contact.html' }, lists: { faqs: [
            { q: 'What time do doors open?', a: 'Doors open one hour before the listed start time. Support starts about 30 minutes later, and Velvet Static go on stage around 90 minutes after doors.' },
            { q: 'Can children come to the shows?', a: 'Most shows are all ages, but some venues have their own age limits. Under-16s must be with an adult. The age limit is shown on each ticket page.' },
            { q: 'Can I get a refund if I cannot go?', a: 'Tickets are refundable through the ticket seller up to 14 days before the show. After that you can transfer your ticket to a friend for free.' },
            { q: 'Will there be a show in my city?', a: 'We add dates all the time. Join the newsletter for presale access, or ask your local promoter to get in touch with our booking agent.' },
          ] } }],
          NEWSLETTER,
        ],
      },
      {
        name: 'Videos', slug: 'videos',
        title: 'Videos and Live Sessions by Velvet Static | Watch Online',
        description: 'Watch Velvet Static live: the church session filmed on 16mm, concert highlights and photos from the tour and the studio where Static Hearts was recorded.',
        sections: [VIDEO, GALLERY, ['streaming-links', STREAMING]],
      },
      {
        name: 'Merch', slug: 'merch',
        title: 'Velvet Static Merch: Vinyl, Cassettes, CDs and Posters',
        description: 'Buy Velvet Static vinyl, cassettes, signed CDs and tour posters from the official store. Limited runs, and every record comes with a free download code.',
        sections: [MERCH, ['cta-newsletter', { fields: { icon: 'mail', heading: 'Get *first dibs* on drops', lead: 'Limited runs sell out fast. Join the list and we will email you the day a new record or poster goes on sale.', proof: 'Join 24,000 fans', button: 'Notify me', note: 'No spam. Unsubscribe any time.' } }]],
      },
      {
        name: 'About', slug: 'about',
        title: 'About Velvet Static: The Band, the Story and Reviews',
        description: 'Meet the four members of Velvet Static, read how a rehearsal-room friendship became a Lisbon dream-pop band, and see what the press says about the new album.',
        sections: [
          ['team-grid', { fields: { eyebrow: 'The band', heading: 'Four friends, *one sound*', lead: 'We met in a rehearsal room in Lisbon in 2019 and have not stopped since.' }, lists: { members: [
            { photo: av(4), photoAlt: 'Inês Duarte', name: 'Inês Duarte', role: 'Vocals and synths', bio: 'Writes the songs on a battered keyboard on the last tram home.', linkedin: 'https://www.instagram.com/', x: 'https://x.com/' },
            { photo: av(1), photoAlt: 'Tomás Reis', name: 'Tomás Reis', role: 'Guitar', bio: 'Builds walls of sound from three pedals and a vintage amp.', linkedin: 'https://www.instagram.com/', x: 'https://x.com/' },
            { photo: av(3), photoAlt: 'Rui Almeida', name: 'Rui Almeida', role: 'Bass', bio: 'The calm one. Plays the same two-note groove for eight minutes and makes it work.', linkedin: 'https://www.instagram.com/', x: 'https://x.com/' },
            { photo: av(5), photoAlt: 'Carla Mendes', name: 'Carla Mendes', role: 'Drums', bio: 'Hits harder than anyone in the building and smiles through all of it.', linkedin: 'https://www.instagram.com/', x: 'https://x.com/' },
          ] } }],
          PRESS,
          NEWSLETTER,
        ],
      },
      {
        name: 'Contact', slug: 'contact',
        title: 'Contact Velvet Static: Bookings, Press and Licensing',
        description: 'Contact Velvet Static for bookings, press interviews and song licensing. Send a message with the details and our manager replies within two working days.',
        sections: [BOOKING],
      },
    ],
  },
];
