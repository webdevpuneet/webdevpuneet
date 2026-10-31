/* Hand-written SEO content for the website templates (part 2 of 3). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_2 = {
  restaurant: {
    about: `Most people look up a restaurant on their phone, standing on a street, so this template puts what they need first: an image hero with a booking button, the menu with prices, set menus or tasting options in a clean rows layout, guest reviews and a map with opening hours. The multi-page version adds Menu, About and Visit pages, so each has its own address and can rank for searches like "wood-fired restaurant Alfama".

Replace the sample dishes with yours and keep prices as text rather than inside images, which keeps the menu readable on small screens and searchable. Use the opening hours and location section for the address, hours and parking (it shows a live Open now badge, and tells search engines your hours), and link the booking buttons to your reservation system or a phone number. Photograph a handful of signature dishes rather than the whole menu, and use the About page for the story of the kitchen. A filterable gallery shows dishes and the dining room, and a table request form with service, day and time sits before the opening hours.`,
    checklist: [
      'Opening hours, address and a booking link without scrolling',
      'The menu as text with prices, not as a PDF or an image',
      'Photos of three or four signature dishes',
      'Reviews from guests, with the source if it is a known site',
      'A map and directions, including parking or the nearest station',
    ],
    faqs: [
      { q: 'Should a restaurant website have the menu as a PDF?', a: 'Better as text on the page. Text loads fast on phones, can be read by search engines and is easy to update. This template shows the menu in a restaurant menu section with names, descriptions and prices you edit in the panel.' },
      { q: 'How do I take table bookings?', a: 'Use the table request form before the map to collect the service, day and time, and reply to confirm, or link the booking buttons to your reservation platform or a phone number. Every button has a link field, so you can use a tel: link, a booking widget page or an email address.' },
      { q: 'Can I show opening hours and the location?', a: 'Yes. The Opening Hours & Location section shows a weekly table with lunch and dinner service, a live Open now badge in the restaurant\'s time zone, the address, a map and call and directions buttons. It also writes your hours as LocalBusiness data for search engines. Paste a Google Maps embed URL if you prefer it to the default OpenStreetMap map.' },
      { q: 'Is this restaurant template suitable for a cafe, bar or bakery?', a: 'Yes. Change the headline, photos and menu items and it works for cafes, bars, bakeries and food trucks. Use the pricing rows for set menus, brunch deals or catering packages.' },
    ],
  },

  'real-estate': {
    about: `An estate agency website has two audiences: people with a home to sell and people looking for one. This template serves both on one page. A hero invites sellers to book a free valuation, a listings section shows featured homes with price, bedrooms and area, a services grid explains buying, selling and letting, and a three-step section shows how a sale works. Counters, local agent profiles, reviews and an FAQ build trust, and a valuation form closes the page.

Replace the sample homes with real listings and link each card to the full property page or your listings portal. Use the counters for results you can prove, such as homes sold or days to offer, and give each agent a short bio with the areas they know best, which supports local search. The multi-page version adds About, FAQ and Contact pages.`,
    checklist: [
      'A clear route for sellers: free valuation, in the hero and again at the end',
      'Featured listings with price, bedrooms and neighbourhood',
      'Agent profiles with the areas each person covers',
      'Proof: results, years in the area and verified reviews',
      'An FAQ on fees, timelines and how a sale works',
    ],
    faqs: [
      { q: 'Can I show property listings on this template?', a: 'Yes. The listings section has editable cards with an image, price, address, bedrooms, bathrooms and size, and each card has its own link. It suits a handful of featured homes; for hundreds of listings, link to your property portal.' },
      { q: 'Does it support a free valuation form?', a: 'Yes. The contact section holds a valuation form that can send to Formspree or any form endpoint. Ask for the address, property type and a good time for a visit so you can follow up quickly.' },
      { q: 'How do I make an estate agent website show up in local search?', a: 'Name the town and neighbourhoods in headings and listings, give each agent a profile with their areas, and add the address and phone number in the footer. The FAQ section also includes structured data that search engines can read.' },
      { q: 'Can I use it for lettings as well as sales?', a: 'Yes. The services section covers buying, selling and letting, and you can add a separate lettings page in the Pages tab. Duplicate the listings section and rename it for rentals.' },
    ],
    home: {
      title: 'Harbor Homes: Local Estate Agents for Buying and Selling',
      description: 'Harbor Homes helps you buy, sell and let with local agents, honest advice and a smooth move. Browse homes ready to view and book a free valuation today.',
    },
  },

  fitness: {
    about: `A gym site is judged on one thing: does it get people through the door for a free trial. This template opens with a full-bleed image and a first-week-free offer, then shows classes, a weekly timetable, simple membership plans, coach profiles, member reviews and an FAQ for the questions beginners ask. A bold call-to-action banner ends the page.

Use your real class names and times in the timetable, since it is the section people check first, and write plans in plain terms with no joining fee, notice period and what a freeze costs. Coaches' qualifications and a line on who each one trains help beginners choose. The multi-page version adds Pricing, About and FAQ pages, which suits a gym that wants to rank for membership and class searches in its town. A before-and-after slider shows member progress over twelve weeks, shared with each member’s permission.`,
    checklist: [
      'A free trial or first-week offer in the hero and in the final banner',
      'A timetable with class names, times and coaches',
      'Membership plans with notice period, freezes and any joining fee',
      'Coach profiles with qualifications and specialities',
      'An FAQ for beginners: what to wear, what to expect, how to cancel',
    ],
    faqs: [
      { q: 'How do I show my class timetable?', a: 'Use the timetable section: add one row per class with the day, time, class name, coach and level, and reorder the rows as the schedule changes. It stays readable on phones, where most members check it.' },
      { q: 'Can I add a free trial sign-up form?', a: 'Yes. Link the trial buttons to your booking tool, or add the contact section with a form that sends to Formspree or any endpoint. Say what happens next, for example that you reply the same day with a time.' },
      { q: 'What membership information should a gym publish?', a: 'Prices, what each plan includes, any joining fee, the notice period and whether memberships can be frozen. Clear terms reduce enquiries and build trust, and the three-tier pricing section is designed for exactly this.' },
      { q: 'Does the template work for yoga studios or personal trainers?', a: 'Yes. Rename the classes, swap the images and adjust the plans. A personal trainer can drop the timetable and use the Coach & Consultant template, which is built around one-to-one programmes.' },
    ],
    home: {
      title: 'IRONHOUSE: Strength and Conditioning Gym, First Week Free',
      description: 'IRONHOUSE is a coached strength and conditioning gym with classes from 6:30am, open gym access and no joining fee. View the timetable and start a free trial.',
    },
  },

  dental: {
    about: `Patients choose a dentist on trust and convenience, so this template leads with reassurance: a clear promise, the treatments you offer, a three-step explanation of what a first visit involves, and photos and short bios of the dentists and hygienists. Reviews and an FAQ answer the worries that stop people booking, such as cost, pain and emergency appointments, and a contact section with a map makes finding the practice easy.

Write for nervous patients: say plainly that you offer gentle care, list prices or price ranges where you can, and make the booking button obvious on every screen. Add the practice address, phone number and opening hours in the opening hours and location section so they are consistent everywhere, which helps local search. A live Open now badge tells patients at a glance whether the clinic is open, and a reviews summary shows the 4.9 rating with a star breakdown that filters the patient reviews. The multi-page version adds Treatments, Our team and Book online pages, so each can rank for the treatments you want to be found for. A before-and-after slider shows smile results with patients’ permission, and a booking request form lets patients choose a treatment, a day and a time.`,
    checklist: [
      'A booking button and phone number visible on every screen',
      'A treatments list in plain language, with prices where possible',
      'Photos and short bios for each dentist and hygienist',
      'Emergency and evening appointments, if you offer them',
      'Reviews, registrations and an FAQ on cost and anxiety',
    ],
    faqs: [
      { q: 'What should a dental website include?', a: 'Treatments, prices or price ranges, the team, how to book, opening hours and emergency contact details. Reviews and a short FAQ about cost and anxious patients help people decide to call.' },
      { q: 'Can patients book online with this template?', a: 'Link the booking buttons to your online booking system, or use the Book online page in the multi-page version as the place that explains how to book. Add a phone number for patients who prefer to call.' },
      { q: 'How do I show the practice location?', a: 'Use the Opening Hours & Location section for the address, phone, opening hours and a map, and add the same details in the footer. It writes your hours and address as LocalBusiness (Dentist) data for search engines. Consistent contact details across the site and your listings help local search.' },
      { q: 'Is the template suitable for orthodontists and other clinics?', a: 'Yes. Rename the treatments, replace the photos and change the colour preset. It works for orthodontists, physiotherapists, opticians, vets and similar clinics.' },
    ],
  },

  'local-service': {
    about: `A local service site such as cleaning, plumbing or gardening wins on speed and trust: a quick route to a price, proof that other local people use you and clear answers to the questions customers ask before they call. This template opens with a hero and a free-quote button, then lists services, explains booking in three easy steps, shows years in business and customer numbers, and adds local reviews, an FAQ and a quote form.

Replace the sample cleaning company with your trade, name the area you cover in the headline and services, and put your real years in business and review count in the counters. Mention insurance, vetting or guarantees in the hero badge, since these remove the biggest worry. The multi-page version adds FAQ and Contact pages, and you can add a page per service area from the Pages tab. A before-and-after slider shows the difference one visit makes, which is the strongest proof a cleaning or restoration business can show.`,
    checklist: [
      'A free quote button and phone number at the top of the page',
      'The area you cover, named in the headline and services',
      'Trust signals: insurance, vetting, guarantees and years in business',
      'A simple booking process explained in three steps',
      'Reviews from local customers and an FAQ on pricing and cancellations',
    ],
    faqs: [
      { q: 'How do I get more local enquiries from my website?', a: 'Name your area in headings, add your address and phone number in the footer and contact section, and ask customers for reviews. A quick quote form with a promised reply time converts more visitors into enquiries.' },
      { q: 'Can I use it for trades like plumbers and electricians?', a: 'Yes. Rename the services, change the images and badge and update the steps. The structure of quote, proof and answers works for any local service business.' },
      { q: 'Does the quote form work without a backend?', a: 'Yes. The contact section can send to Formspree or any form endpoint you paste in, with animated success and error messages. You can also link to a phone number or email.' },
      { q: 'How do I add several service areas?', a: 'Add a page for each area in the multi-page version, for example "Cleaners in Hackney", with the services and local details. Each page gets its own title, description and address.' },
    ],
    home: {
      title: 'Sparkle & Co: Trusted Home and Office Cleaning, Free Quote',
      description: 'Sparkle & Co offers insured, background-checked home and office cleaners across the city. Book in 60 seconds and get a free fixed-price quote within the hour.',
    },
  },

  'online-course': {
    about: `A course page has to sell a transformation, not a syllabus. This template opens with a badge for the next start date and a clear promise, lists the skills students gain, walks through the curriculum week by week, adds a featured student story and then shows a single price with everything included. An FAQ handles refunds, time commitment and access, which is where most last-minute doubts sit.

Write the headline as the outcome, such as the portfolio piece or job skill students leave with, and show the real project from each module. Keep one price and one enrol button to avoid choice paralysis, and state the start date and the guarantee clearly. The multi-page version adds Pricing and FAQ pages if you want separate addresses for them. Connect the enrol button to your checkout page on Stripe, Gumroad or your platform. A preview-lesson video section sits after the benefits, so prospective students can see the teaching style before they enrol.`,
    checklist: [
      'The outcome in the headline and the start date in a badge',
      'A week-by-week curriculum with a project for each module',
      'A student story with a before-and-after result',
      'One clear price, what it includes and the refund policy',
      'An FAQ on time commitment, access and prerequisites',
    ],
    faqs: [
      { q: 'What should a course landing page include?', a: 'The result students get, who the course is for, the curriculum, proof from past students, the price and an FAQ on refunds and time commitment. Keep one enrol button repeated down the page.' },
      { q: 'Can I connect the enrol button to checkout?', a: 'Yes. Each button has a link field: paste your checkout URL from Stripe, Gumroad, Teachable or any platform. The page itself does not process payments.' },
      { q: 'How do I show the curriculum?', a: 'The alternating features section works well for modules: one row per week with a heading, text and an image, which you can reorder or extend. Add the project students complete at the end of each module.' },
      { q: 'Is it suitable for a cohort-based course or a self-paced course?', a: 'Both. For a cohort, use the start-date badge and a deadline in the call to action. For a self-paced course, remove the date and lead with lifetime access and a refund guarantee.' },
    ],
    home: {
      title: 'Design Academy: Learn UI Design in Eight Practical Weeks',
      description: 'Design Academy is a project-based UI design course that takes you from first sketch to a portfolio-ready app in eight weeks. Next cohort starts 4 November.',
    },
  },

  coach: {
    about: `Coaching is a trust purchase, so this template puts the coach in front: a personal hero with who you help and a free discovery call, a short section on how you work, programmes with clear prices, client stories that show where people ended up and a newsletter signup for readers who are not ready to book. A discovery-call form closes the page.

Write in your own voice, use a real photo and describe the change clients get rather than the techniques you use. Keep two or three programmes at most, with who each is for and what is included, and offer the free call as the lowest-risk first step. The newsletter section is useful for building an audience, and the multi-page version adds Pricing and Contact pages. Connect the forms to your calendar tool or email service. A booking request form replaces the plain contact form, with the type of call, a preferred day and a time of day, and your call times beside it.`,
    checklist: [
      'A photo, a clear description of who you help and a free first call',
      'Two or three programmes with who each is for and the price',
      'Client stories that describe where people are now',
      'A newsletter signup for visitors who are not ready to book',
      'A short form or booking link for the discovery call',
    ],
    faqs: [
      { q: 'What should a coaching website say?', a: 'Who you help, the change they get, how you work and what it costs, with stories from clients as proof. Offer a free discovery call as the first step so booking feels low-risk.' },
      { q: 'Can I add a booking calendar?', a: 'Yes. Link the call-to-action buttons to a Calendly, Cal.com or similar booking page, or use the booking request form, which collects the type of call, a day and a time of day, and reply with exact times.' },
      { q: 'Is this good for consultants and freelancers too?', a: 'Yes. Rename the programmes to packages or retainers and change the text. It works for consultants, trainers, therapists and advisors who sell their time and expertise.' },
      { q: 'How do I build an email list from the site?', a: 'The newsletter section takes a form URL from your email service, such as Mailchimp or Kit (ConvertKit). Describe what subscribers get and how often, as the sample does with a weekly insight.' },
    ],
    home: {
      title: 'Maya Chen Coaching: Career Coaching for Mid-Career Change',
      description: 'Maya Chen helps mid-career professionals get unstuck, change direction and build careers they are proud of. Book a free 30-minute discovery call today.',
    },
  },

  event: {
    about: `An event site needs to answer four questions in seconds: what is it, when and where, who is speaking, and how much is a ticket. This template leads with the date, city and a ticket button, then shows the schedule, a speaker carousel, ticket tiers with early-bird pricing, a sponsor strip and a practical FAQ. A large closing footer repeats the date and the ticket call to action.

Use the announcement bar for urgency, such as the price rise date, and update the schedule as sessions are confirmed. Add your real speakers with a photo and one line on their talk, since these are the strongest draw for a conference, and list tiers by what each includes rather than only by name. The multi-page version adds About, Pricing and FAQ pages. Link the ticket buttons to your ticketing platform.`,
    checklist: [
      'Date, city and a ticket button in the first screen',
      'A schedule that is easy to scan, with times and tracks',
      'Speakers with a photo and a line on their talk',
      'Ticket tiers with what each includes and when prices rise',
      'Practical information: venue, travel, accessibility and refunds',
    ],
    faqs: [
      { q: 'How do I sell tickets from the event page?', a: 'Link the ticket buttons to your ticketing platform, such as Eventbrite, Tito or Stripe Checkout. The page shows the tiers and prices, and the platform handles payment.' },
      { q: 'Can I add a schedule with several days and tracks?', a: 'Yes. The schedule uses alternating feature blocks that you can add to, reorder and rename by day or track. For a long programme, add a Schedule page in the multi-page version.' },
      { q: 'Is it suitable for webinars, meetups and workshops?', a: 'Yes. Replace the city with "online", shorten the schedule and use the pricing section for free and paid places. It works for meetups, workshops, launches and online summits.' },
      { q: 'How do I show sponsors?', a: 'Use the logo strip for sponsors, and say how many places or perks each tier receives in the About page. Upload transparent PNG or SVG logos for the cleanest result.' },
    ],
    home: {
      title: 'FRONTEND/26: Web Development Conference, Amsterdam 14–15 May',
      description: 'FRONTEND/26 is a two-day web conference in Amsterdam on 14–15 May 2026 with talks, workshops and parties. See the schedule, speakers and get your ticket.',
    },
  },
};
