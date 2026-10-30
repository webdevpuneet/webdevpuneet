/* Sections added to the existing website templates on 2026-10-30, in the same shape as STARTER_EXTRAS in
   starters-extras.js (merged there): after / before / replace / atEnd + section (or a function of the section it
   replaces).

   - back-to-top, accessibility-toolbar and cursor-follower go at the end (after the footer), which makes them part of
     the shared footer, so they work on every page of the multi-page version (see FOOTER_LIKE in site.js).
   - timeline-horizontal, scroll-zoom and team-accordion are normal sections with content written for each template.

   WIDGET_ROLES: the phrase that describes each added section in the landing-page snippets
   (scripts/generate-landing-page-snippets.mjs), by 'templateId:sectionId' or just 'sectionId'. */
import { IMG } from './meta.js';

const BACK_TO_TOP = () => ['back-to-top', { fields: { distance: '500' } }];
const A11Y = () => ['accessibility-toolbar', { fields: { position: 'left' } }];
const CURSOR = () => ['cursor-follower', { fields: { size: '80', smooth: 'smooth' } }];
const end = section => ({ atEnd: true, section });

const events = list => list.map(([date, title, text, icon]) => ({ date, title, text, icon }));
const zoomImages = list => list.map(([file, imageAlt, title, caption]) => ({ image: IMG(file), imageAlt, title, caption }));

/* A team-grid section turned into the interactive accordion, keeping its members */
const toAccordion = fields => old => ['team-accordion', {
  fields: { defaultOpen: '1', ...fields },
  lists: {
    members: (old?.[1]?.lists?.members || []).map(m => ({
      photo: m.photo, photoAlt: m.photoAlt || m.name, name: m.name, role: m.role, bio: m.bio || '',
      s1Icon: 'linkedin', s1Url: m.linkedin || '', s1Label: 'LinkedIn',
      s2Icon: 'twitter', s2Url: m.x || '', s2Label: 'X (Twitter)',
      s3Icon: 'instagram', s3Url: m.instagram || '', s3Label: 'Instagram',
    })),
  },
}];

const TIMELINE = (fields, list) => ['timeline-horizontal', { fields: { scrollMode: 'pin', layout: 'alternate', marker: 'icon', ...fields }, lists: { events: events(list) } }];
const ZOOM = (fields, list) => ['scroll-zoom', { fields: { zoom: '45', direction: 'in', affect: 'both', perImage: '100', ...fields }, lists: { images: zoomImages(list) } }];

export const STARTER_WIDGET_EXTRAS = {
  saas: [end(BACK_TO_TOP())],
  app: [end(BACK_TO_TOP())],
  launch: [
    { after: 'features-bento', section: TIMELINE({ eyebrow: 'Roadmap', heading: 'Where Lumina is *heading next*', lead: 'We ship in small steps and share the plan. Keep scrolling to follow the roadmap from the beta to launch day.', startAt: '1' }, [
      ['Now', 'Private beta', 'Notes, links and voice memos in one place, with an assistant that reads everything you save.', 'sparkles'],
      ['Next month', 'Shared spaces', 'Invite a friend or a team into a notebook and think together in real time.', 'users'],
      ['Spring', 'Mobile apps', 'iOS and Android apps with offline notes and quick capture from the lock screen.', 'smartphone'],
      ['Summer', 'Public launch', 'Lumina opens to everyone, with a free plan and a Pro plan for heavy users.', 'rocket'],
      ['Autumn', 'Integrations', 'Send notes to Slack, Notion and your calendar without leaving Lumina.', 'plug'],
    ]) },
  ],
  agency: [end(BACK_TO_TOP()), end(CURSOR())],
  portfolio: [end(BACK_TO_TOP()), end(CURSOR())],
  photographer: [end(BACK_TO_TOP()), end(CURSOR())],
  restaurant: [
    { after: 'restaurant-menu', section: ZOOM({ eyebrow: 'From the farm', heading: 'Slow food, *seen up close*', lead: 'Long tables, small plates and produce from the hills behind the restaurant. Keep scrolling: each photograph arrives small, then zooms up to fill the screen before the next one appears.' }, [
      ['tpl-restaurant.jpg', 'A table of seasonal dishes', 'The plates', 'Seasonal dishes that change every week'],
      ['wed-dinner.jpg', 'A long dinner table set with candles', 'The long table', 'Shared dinners every Friday'],
      ['tpl-nature.jpg', 'Green hills at sunrise where the produce is grown', 'The farm', 'Vegetables picked that morning'],
      ['hero-landscape.jpg', 'Hills above the farm at dawn', 'The hills', 'Where the lamb and herbs come from'],
    ]) },
    end(BACK_TO_TOP()),
  ],
  'real-estate': [
    { after: 'property-listings', section: ZOOM({ eyebrow: 'Featured homes', heading: 'Homes that *reward a closer look*', lead: 'Keep scrolling: each home arrives as a small photograph and zooms up to fill the screen, then the next one follows.' }, [
      ['tpl-realestate.jpg', 'A modern house with large windows by the coast', 'The house by the coast', 'Three bedrooms, steps from the harbour'],
      ['room-1.jpg', 'A bright living room with tall windows', 'Harbour apartment', 'Two bedrooms with a sea view'],
      ['room-2.jpg', 'A calm bedroom with soft natural light', 'Garden house', 'Three bedrooms and a private garden'],
      ['room-4.jpg', 'An open-plan room with warm wooden floors', 'Old town loft', 'One bedroom in a restored building'],
    ]) },
    end(BACK_TO_TOP()),
  ],
  fitness: [end(BACK_TO_TOP())],
  dental: [end(BACK_TO_TOP()), end(A11Y())],
  'local-service': [end(BACK_TO_TOP()), end(A11Y())],
  'online-course': [
    { after: 'features-alternating', section: TIMELINE({ eyebrow: 'The syllabus', heading: 'Your 8-week *learning path*', lead: 'Keep scrolling to follow the course from your first layout to a finished portfolio project.', startAt: '1' }, [
      ['Week 1', 'Visual design basics', 'Colour, type, spacing and hierarchy, practised on real screens from day one.', 'palette'],
      ['Week 2', 'Figma mastery', 'Components, auto layout and variants, so your files stay tidy and fast.', 'pen-tool'],
      ['Weeks 3 and 4', 'UI patterns', 'Navigation, forms, cards and dashboards that work for real users.', 'layout-dashboard'],
      ['Week 5', 'Responsive design', 'Designs that hold up from the smallest phone to a wide desktop.', 'smartphone'],
      ['Week 6', 'User research', 'Interviews and quick tests that turn opinions into decisions.', 'users'],
      ['Weeks 7 and 8', 'Portfolio and job prep', 'Finish a case study, polish your portfolio and practise the interview.', 'briefcase'],
    ]) },
    end(BACK_TO_TOP()),
  ],
  event: [
    { after: 'team-carousel', section: TIMELINE({ eyebrow: 'The schedule', heading: 'Two days, *hour by hour*', lead: 'Keep scrolling to walk through both days, from the opening keynote to the evening party.', startAt: '1' }, [
      ['Day 1 · 09:00', 'Doors and coffee', 'Collect your badge, meet the speakers and find a seat before the opening keynote.', 'coffee'],
      ['Day 1 · 10:00', 'Opening keynote', 'Where the web is heading in 2026, and what it means for the way your team builds.', 'star'],
      ['Day 1 · 11:30', 'Three talk tracks', 'Twenty talks on performance, design systems, AI and the browser platform.', 'users'],
      ['Day 1 · 19:00', 'Evening party', 'Food, music and a rooftop view to finish the first day with the community.', 'heart'],
      ['Day 2 · 10:00', 'Hands-on workshops', 'Twelve small-group workshops of up to 25 people, from CSS to GSAP animation.', 'code'],
      ['Day 2 · 16:30', 'Closing session', 'The best ideas of the two days, announcements and a look at next year.', 'award'],
    ]) },
    end(BACK_TO_TOP()),
  ],
  nonprofit: [
    { after: 'features-steps', section: TIMELINE({ eyebrow: 'Our story', heading: 'Ten years of *planting forests*', lead: 'Keep scrolling to follow GreenRoots from a single village nursery to millions of trees.', startAt: '1' }, [
      ['2016', 'The first nursery', 'One village, one nursery and a thousand native seedlings planted by neighbours.', 'leaf'],
      ['2018', 'Local teams grow', 'Women-led planting teams are paid fairly to grow and protect every tree.', 'users'],
      ['2020', 'A million trees in sight', 'Ten villages and the first 100,000 trees, with survival checked every season.', 'trending-up'],
      ['2022', 'Schools join in', 'Pupils plant and track trees near their schools, learning how forests return.', 'graduation-cap'],
      ['2024', 'Four countries', 'The programme reaches 38 villages in 4 countries, with 1,100 local jobs.', 'globe'],
      ['2026', '2.4 million trees', 'A decade on, forests are returning and 92% of every donation goes to projects.', 'heart'],
    ]) },
    end(BACK_TO_TOP()), end(A11Y()),
  ],
  wedding: [end(BACK_TO_TOP())],
  hotel: [end(BACK_TO_TOP()), end(A11Y())],
  salon: [
    { replace: 'team-grid', section: toAccordion({ eyebrow: 'The team', heading: 'Meet the *hands behind Bloom*', lead: 'Click a stylist to read about their speciality and how they like to work.' }) },
    { after: 'restaurant-menu', section: ZOOM({ eyebrow: 'The studio', heading: 'A calm place *to take your time*', lead: 'Soft light, arched mirrors and chairs by the window. Keep scrolling: each room arrives as a small photograph and zooms up to fill the screen, one after another.' }, [
      ['tpl-salon.jpg', 'A bright salon with arched mirrors', 'Inside Bloom Studio', 'Soft light and arched mirrors'],
      ['room-1.jpg', 'A bright room with tall windows and soft light', 'The colour bar', 'Where every colour starts with a chat'],
      ['room-2.jpg', 'A calm room with natural light', 'The quiet room', 'Treatments without the noise'],
      ['room-4.jpg', 'A warm room with wooden floors', 'The window seats', 'Tea while the colour sets'],
    ]) },
    end(BACK_TO_TOP()),
  ],
  'law-firm': [
    { replace: 'team-grid', section: toAccordion({ eyebrow: 'Our lawyers', heading: 'The *people* you will work with', lead: 'Click a name to read about their practice area and background.' }) },
    end(BACK_TO_TOP()), end(A11Y()),
  ],
  podcast: [
    { replace: 'team-grid', section: toAccordion({ eyebrow: 'Who is talking', heading: 'The *voices* behind the mic', lead: 'Click a face to read a little about each host.' }) },
    end(BACK_TO_TOP()),
  ],
  'product-store': [end(BACK_TO_TOP())],
  school: [
    { after: 'features-icon-grid', section: TIMELINE({ eyebrow: 'The school year', heading: 'A year at *Brookfield*', lead: 'Keep scrolling to see the moments every child looks forward to, from the first day to the summer fair.', startAt: '1' }, [
      ['September', 'Welcome week', 'New children settle in with buddies, and families meet their teachers over coffee.', 'house'],
      ['October', 'Harvest festival', 'Pupils bring food they have grown and share songs with the whole school.', 'leaf'],
      ['December', 'Winter concert', 'Every class performs, from the youngest singers to the school orchestra.', 'star'],
      ['February', 'Science week', 'Experiments, a visiting scientist and a school-wide invention challenge.', 'lightbulb'],
      ['May', 'Sports day', 'Races, relays and team games, with parents cheering from the field.', 'award'],
      ['July', 'Summer fair', 'Stalls, music and a leavers assembly to close the year together.', 'gift'],
    ]) },
    end(BACK_TO_TOP()), end(A11Y()),
  ],
  church: [end(BACK_TO_TOP()), end(A11Y())],
  music: [end(BACK_TO_TOP()), end(CURSOR())],
};

/* Landing-page snippet wording for each added section (see scripts/generate-landing-page-snippets.mjs) */
export const WIDGET_ROLES = {
  'back-to-top': 'a floating back to top button that appears after the visitor scrolls, so a long page is easy to leave and return',
  'accessibility-toolbar': 'a floating accessibility toolbar where visitors can enlarge text, raise contrast, hide images and pause animations',
  'cursor-follower': 'a circle that follows the cursor and inverts the page beneath it with a blend mode, adding a bold, playful touch',
  'launch:timeline-horizontal': 'a pinned horizontal roadmap that slides along as you scroll, from the beta to launch day',
  'event:timeline-horizontal': 'a pinned horizontal schedule that moves through both days of the conference as you scroll',
  'online-course:timeline-horizontal': 'a pinned horizontal syllabus that walks through the eight weeks of the course',
  'nonprofit:timeline-horizontal': 'a pinned horizontal timeline of the charity\'s decade of planting, from the first nursery to millions of trees',
  'school:timeline-horizontal': 'a pinned horizontal timeline of the school year, from welcome week to the summer fair',
  'restaurant:scroll-zoom': 'a pinned stack of four photographs that each arrive small and zoom up to fill the screen as you scroll, from the plates to the farm and the hills',
  'real-estate:scroll-zoom': 'a pinned stack of home photographs that each arrive small and zoom up to fill the screen as you scroll, one home at a time',
  'salon:scroll-zoom': 'a pinned stack of studio photographs that each arrive small and zoom up to fill the screen as you scroll, room by room',
  'salon:team-accordion': 'an interactive team accordion where each stylist is a grayscale strip that opens on click',
  'law-firm:team-accordion': 'an interactive team accordion where each lawyer is a grayscale strip that opens on click',
  'podcast:team-accordion': 'an interactive team accordion where each host is a grayscale strip that opens on click',
};

/* The sections added on 2026-10-30, described for SEO text: name and page of the section template, a short phrase for
   sentences and FAQs, and a phrase for the gallery blurb. */
export const ADDED_TYPES = {
  'back-to-top': { name: 'Back to Top Button', short: 'a floating back to top button', blurb: 'a back to top button' },
  'accessibility-toolbar': { name: 'Accessibility Toolbar Widget', short: 'an accessibility toolbar', blurb: 'an accessibility toolbar' },
  'cursor-follower': { name: 'Cursor Follower', short: 'a cursor follower circle', blurb: 'a cursor follower' },
  'timeline-horizontal': { name: 'Horizontal Timeline', short: 'a pinned horizontal timeline', blurb: 'a pinned timeline' },
  'scroll-zoom': { name: 'Scroll Zoom Image Stack', short: 'a scroll zoom image stack', blurb: 'a scroll zoom image stack' },
  'team-accordion': { name: 'Interactive Team Accordion', short: 'an interactive team accordion', blurb: 'an interactive team accordion' },
};

/** The added sections a website template uses, once each, in page order, with the template-specific wording */
export const addedSectionsOf = t => {
  const seen = new Set();
  return t.sections.map(s => s[0]).filter(id => ADDED_TYPES[id] && !seen.has(id) && seen.add(id)).map(id => ({
    id, ...ADDED_TYPES[id], url: '/website-section-templates/' + id + '/', role: WIDGET_ROLES[t.id + ':' + id] || WIDGET_ROLES[id] || ADDED_TYPES[id].short,
  }));
};
export const joinList = items => (items.length < 2 ? items.join('') : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1]);
