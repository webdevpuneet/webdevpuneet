// Hand-written SEO content for the landing-page snippets (batch 1 of 3).
// `roles` is one phrase per section, in the same order as the template's `sections` list:
// why THAT section sits at THAT point of THIS page. The generator checks the lengths match.
export const BATCH_1 = {
  saas: {
    title: 'SaaS Landing Page HTML Template — Free CSS & JS Snippet',
    description: `A complete SaaS landing page in plain HTML, CSS and JS: split hero, logo strip, feature rows, pricing toggle, FAQ and CTA. Edit it live, then export it.`,
    headline: 'Anatomy of a SaaS Landing Page That Converts: Why Each Section Sits Where It Does',
    about: `A software visitor decides in seconds whether your product is for them, so this page is ordered by the doubts a stranger has, in the order they have them. First "what is this?" (the split hero with a product screenshot), then "do other people trust it?" (the logo strip), then "what does it do for me?" (an icon grid for skimmers and alternating rows for readers), then "who else uses it?" (the testimonial wall), and finally "what will it cost, and what if I change my mind?" (pricing, comparison table and FAQ).

Two details are easy to miss. The pricing toggle and the comparison table sit on the same page on purpose: the cards answer "which plan?" in five seconds and the table answers "does the middle plan include SSO?" for the buyer who needs to justify it to someone else. And the call to action is repeated three times (hero, mid-page, closing banner) with the same wording, so a visitor never has to scroll back to act.

To make it yours, keep the order and replace the content: write the hero headline as the outcome your customer gets, put real customer logos in the strip, and name the plans exactly as your app does. This is the same page as the [SaaS Landing Page website template](/website-builder/templates/saas/); open it in the [Website Builder](/website-builder/) to change colours, fonts and copy with forms, add the Pricing, Blog, About and Contact pages, and export the site.`,
    roles: [
      'a sticky bar that keeps the sign-up button one click away at every scroll depth',
      'states the outcome in the headline and shows the product in a glowing frame, with a social-proof line under the buttons',
      'a quiet strip of customer logos that borrows trust before the visitor has read a word',
      'the skim layer: six short benefits a visitor can absorb in ten seconds',
      'the read layer: three features given a screenshot and a paragraph each for people who want detail',
      'a poster-frame product tour for visitors who would rather watch than read',
      'a 3D carousel that lets visitors scroll or drag through five product screens, a hands-on tour between the explainer video and the proof',
      'real customer quotes in a wall, placed just before the price so the cost lands with proof behind it',
      'monthly/yearly toggle with a highlighted default plan so the choice is made in five seconds',
      'the table for buyers who must justify the purchase: every plan limit side by side',
      'answers security, billing and cancellation worries right where they would stop a sign-up',
      'a gradient banner that repeats the one action after the last objection is answered',
      'an optional promo modal for a launch offer or webinar, triggered once and dismissable',
      'the sitemap in miniature: product, company and legal links for visitors and for search engines',
    ],
    steps: [
      { title: 'Rewrite the hero around one outcome', text: 'Replace the headline with the result a customer gets in numbers or time ("Ship the report in minutes, not Mondays"), swap the screenshot for a real one of your product, and keep the badge above it for news or a launch.' },
      { title: 'Match the pricing to your real plans', text: 'Edit the three tiers and the comparison table so the plan names, limits and prices match your billing system exactly, and set the highlighted plan to the one you want most people to pick.' },
      { title: 'Replace the proof with real proof', text: 'Put your own customer logos in the strip, use real names, roles and photos in the testimonial wall, and add a real FAQ about the objections your sales emails hear most.' },
    ],
    useCases: [
      { icon: 'APP', title: 'Launch a new product or feature', desc: 'Use the page as the home for a product launch: the hero announces it, the feature rows explain it and the pricing section turns interest into trials on day one.' },
      { icon: 'DESIGN', title: 'Pitch a SaaS idea before you build it', desc: 'Validate demand with a real-looking page and a sign-up button before writing a line of product code, then measure how many visitors click through.' },
      { icon: 'LEARN', title: 'Study the structure of a converting B2B page', desc: 'Read how container queries keep every section responsive, how the pricing toggle swaps values with a few lines of JS and how GSAP reveals are scoped to each section.' },
    ],
    faqs: [
      { q: 'What order should the sections of a SaaS landing page go in?', a: 'Follow the visitor\'s questions: what is it (hero), can I trust it (logos), what does it do (features), who uses it (testimonials), what does it cost (pricing), what if (FAQ), then one last call to action. This page uses exactly that order.' },
      { q: 'Why does the page have both pricing cards and a comparison table?', a: 'They answer different readers. The cards let a quick decision-maker pick a plan in seconds; the table lets someone who has to justify the purchase check every limit side by side.' },
      { q: 'How do I connect the sign-up buttons to my app?', a: 'Every button is a plain link. Point the hero, pricing and banner buttons at your sign-up or checkout URL; no script change is needed.' },
    ],
  },

  app: {
    title: 'Mobile App Landing Page HTML Template — Free Snippet',
    description: `A dark mobile app landing page in HTML, CSS and JS: phone-mockup hero, store buttons, how-it-works steps, review marquee and a download CTA. Edit it live.`,
    headline: 'A Mobile App Landing Page in Eight Sections: From Store Badge to Download',
    about: `An app page has a different job from a SaaS page: it has to move a visitor, usually on a phone, from curiosity to the App Store or Google Play in a few scrolls. That is why this layout is short. The hero puts the phone mockup and both store buttons above the fold, the features sit beside a real screenshot, three numbered steps remove the fear that the app is hard to start, and the reviews scroll past in a marquee so social proof is moving rather than something to read.

The dark theme is a deliberate choice for apps: screenshots of a dark UI blend into the page, which makes the product look like part of the site instead of a picture pasted on it. If your app is light, switch the theme in the builder and the whole page, including the glow behind the mockup, follows from one set of colour variables.

Swap in your own screenshots and store links and the page is done. It is the code behind the [Mobile App Landing Page template](/website-builder/templates/app/), so you can also open it in the [Website Builder](/website-builder/), restyle it with the theme panel and export clean HTML.`,
    roles: [
      'a slim sticky bar with a Download button, which matters most on a phone where the hero scrolls away fast',
      'the phone mockup with App Store and Google Play buttons, above the fold where installs are won',
      'beside a real screenshot, the single feature that sets the app apart from the others',
      'a swipeable 3D carousel of app screens so visitors can browse the product the way they will use it, before the how-it-works steps',
      'three numbered steps that answer "is it hard to get started?" before anyone has to ask',
      'reviews that keep moving, so social proof is seen even by visitors who never stop to read',
      'a closing prompt with the store badges again, for visitors who scrolled all the way down',
      'questions about price, privacy and device support, beside a contact card for anything else',
      'a quiet footer with the legal links the app stores require you to have',
    ],
    steps: [
      { title: 'Put your real screenshots in the mockup', text: 'Upload a screenshot of your app in the hero and the split sections. Use the actual first screen a new user sees, because that is what the download will deliver.' },
      { title: 'Link the store buttons', text: 'Point the App Store and Google Play buttons at your listing URLs. If you only ship on one platform, remove the other button so nobody taps a dead end.' },
      { title: 'Write the three steps from your onboarding', text: 'Rewrite the how-it-works steps to match your real first-run flow (for example "Sign up, connect your account, see your first result") so the page promises exactly what the app does.' },
    ],
    useCases: [
      { icon: 'APP', title: 'A home page for an app store listing', desc: 'Give your App Store and Google Play listing a destination of your own, with a URL you control for ads, QR codes and social bios.' },
      { icon: 'DESIGN', title: 'Pre-launch interest page', desc: 'Show the mockup and features before the app is live, and swap the store buttons for a waitlist link until release day.' },
      { icon: 'LEARN', title: 'Learn a marquee and a device mockup in CSS', desc: 'Study the looping review marquee and the CSS-only phone frame to reuse in your own pages.' },
    ],
    faqs: [
      { q: 'What should an app landing page show above the fold?', a: 'The app on a phone, one sentence on what it does and the store buttons. Anything that is not helping a visitor reach the download should wait lower down.' },
      { q: 'Do I need to use the dark theme?', a: 'No. The dark look suits dark UIs, but the colours are variables, so you can switch to any preset or your own palette without touching the markup.' },
      { q: 'How do I add a QR code for desktop visitors?', a: 'Add an image to the hero or download banner pointing at your store listing; desktop visitors can scan it with their phone to install straight away.' },
    ],
  },

  launch: {
    title: 'Startup Launch & Waitlist Page Template — Free Snippet',
    description: `A startup waitlist landing page in HTML, CSS and JS: announcement bar with a launch date, gradient hero, bento feature grid and an email signup form. Edit live.`,
    headline: 'A Waitlist Page That Builds an Audience Before You Launch',
    about: `A waitlist page has one metric: how many visitors leave an email address. Everything else on the page exists to remove a reason not to. The announcement bar puts the launch date in front of people, so the wait feels finite. The centred gradient hero asks for one thing and nothing else. The bento grid shows what is coming in a layout that is easy to skim and looks intentional even when you only have four ideas to show. And the newsletter form appears twice, once in the main call to action and once in the footer, because some people only decide on the way out.

The form sends to your email tool, not to this page, so the real work of the snippet is hooking it up: point the form's action at Mailchimp, ConvertKit, Buttondown or any endpoint that accepts a POST. Keep the success message short and tell people what happens next ("We will email you once, on launch day").

This is the layout of the [Startup Launch & Waitlist template](/website-builder/templates/launch/). Open it in the [Website Builder](/website-builder/) to change the colours, rewrite the copy, add the FAQ and About pages from the multi-page version and export the site.`,
    roles: [
      'an announcement bar with the launch date, so the wait feels short and real',
      'a centred hero that asks for one thing: an email address',
      'a bento grid of what is coming, which looks intentional even with only a few features',
      'the main sign-up form, repeated lower down for visitors who needed the whole pitch first',
      'a footer with a second sign-up form, for the visitor who decides on the way out',
    ],
    steps: [
      { title: 'Set the launch date and the promise', text: 'Edit the announcement bar with your real date, then rewrite the hero headline as the single benefit of joining the list (early access, a founding price, a free month).' },
      { title: 'Connect the form to your email tool', text: 'Set the newsletter form action to your provider\'s form endpoint and change the success message to say exactly what subscribers will receive and when.' },
      { title: 'Fill the bento grid with real teasers', text: 'Use each tile for a feature, a screenshot or a number you can honestly show. Remove tiles you cannot back up; four strong tiles beat eight vague ones.' },
    ],
    useCases: [
      { icon: 'APP', title: 'Build a list before a product launch', desc: 'Collect emails for weeks before release and turn the list into your first customers on launch day.' },
      { icon: 'DESIGN', title: 'Test an idea with a landing page', desc: 'Publish the page, send a little traffic and count sign-ups to learn whether a product is worth building at all.' },
      { icon: 'LEARN', title: 'Learn bento grids and form handling', desc: 'See how a responsive bento grid is built with CSS grid and how a plain HTML form can post to a third-party email service.' },
    ],
    faqs: [
      { q: 'What should a waitlist landing page include?', a: 'A single promise, a launch date, one or two proof points of what is coming and one sign-up form. More than that gives visitors reasons to leave without subscribing.' },
      { q: 'How do I send the form to Mailchimp or ConvertKit?', a: 'Copy the form action URL from your provider and set it as the form\'s action in the snippet, keeping the email field name your provider expects.' },
      { q: 'Should the waitlist form ask for more than an email?', a: 'Rarely. Every extra field lowers sign-ups. Ask for the email now and learn more about subscribers later, in the welcome email.' },
    ],
  },

  agency: {
    title: 'Creative Agency Website HTML Template — Free Snippet',
    description: `A dark creative agency website in HTML, CSS and JS: glowing hero, bento services, counting stats, team carousel, case study and a giant wordmark footer.`,
    headline: 'A Creative Agency Website Built Around Proof: Services, Numbers, People and One Case Study',
    about: `Agency sites fail in one of two ways: they look like every other agency, or they say nothing a buyer can check. This layout sidesteps both by pairing confident visuals with evidence. The centred hero sets the tone, the bento grid explains the services without a wall of text, the animated counters turn "we are experienced" into numbers, and the case study shows one real piece of work end to end, which persuades a prospect more than a gallery of ten thumbnails.

The people matter too. A draggable team carousel puts faces to the studio, and the editorial journal shows how the team thinks, which is what a buyer is really hiring. The footer ends with a giant wordmark and a single line, "Let's talk", so the last thing a visitor sees is the action you want.

Replace the sample studio with yours and keep the proportions: one hero, one case study, real numbers. It is the layout of the [Creative Agency Website template](/website-builder/templates/agency/); open it in the [Website Builder](/website-builder/) to add the Services, Work, About and Contact pages that share one navbar and theme, then export.`,
    roles: [
      'a floating pill navbar that feels like part of the design instead of a bar bolted on top',
      'a glowing centred hero that states what the studio does and for whom',
      'services laid out as a bento grid, so a buyer scans capabilities instead of reading a list',
      'numbers that count up on scroll: years, projects and clients, so "experienced" becomes checkable',
      'one featured client story with the problem, the work and the result, more persuasive than ten thumbnails',
      'a coverflow-style carousel of more projects, so visitors can keep browsing work after the featured case study without leaving the page',
      'a draggable carousel of the people a client will actually work with',
      'a single large client quote placed after the work, where it carries the most weight',
      'an editorial journal that shows how the team thinks, which is what buyers are really hiring',
      'a floating share bar for the journal, which keeps articles easy to pass around',
      'a giant wordmark footer that ends on one line and one action: "Let\'s talk"',
    ],
    steps: [
      { title: 'Choose your featured case study', text: 'Replace the sample story with your strongest project and write it as problem, work, result. One result with a real number beats a long description.' },
      { title: 'Set honest counters', text: 'Edit the animated stats to numbers you can defend: years in business, projects shipped, clients kept. The count-up animation makes them memorable, so they should be true.' },
      { title: 'Introduce the real team', text: 'Add your own team photos and roles to the carousel, and write the journal posts that show how you think about the work.' },
    ],
    useCases: [
      { icon: 'DESIGN', title: 'A studio or freelancer collective site', desc: 'Launch a credible agency site quickly and spend the time on the case study and the copy rather than the layout.' },
      { icon: 'APP', title: 'A site for a design, web or marketing agency', desc: 'Use the services grid and counters to explain what you sell to non-technical buyers.' },
      { icon: 'LEARN', title: 'Study dark UI and GSAP scroll effects', desc: 'See how counters, carousels and reveals are built on a dark theme with container queries and reduced-motion support.' },
    ],
    faqs: [
      { q: 'What does an agency website need to win clients?', a: 'A clear statement of what you do, proof in the form of a real case study and numbers, the people involved and an easy way to start a conversation.' },
      { q: 'Why one case study instead of a portfolio grid?', a: 'A single detailed story shows how you think and what you deliver, which is what buyers evaluate. A grid of thumbnails shows only that you made things.' },
      { q: 'Can I add more pages?', a: 'Yes. The multi-page version in the Website Builder adds Services, Work, About and Contact pages sharing one navbar, footer and theme.' },
    ],
  },

  portfolio: {
    title: 'Personal Portfolio Website HTML Template — Free Snippet',
    description: `A warm one-page portfolio in HTML, CSS and JS for freelancers: photo hero with availability badge, services, case studies, testimonials, blog and contact form.`,
    headline: 'A One-Page Freelancer Portfolio That Answers the Client\'s Questions in Order',
    about: `A prospective client scanning a freelancer's site wants three answers fast: who are you, can you do my job, and are you free? This layout is arranged around those. The hero has a real photo and an availability badge, so the "are you free" question is answered before it is asked. Services come next in a short icon grid, then a case study with a result, which is stronger proof than a gallery of screenshots.

Testimonials come after the work, where they confirm what the client has just seen. Writing and contact finish the page: blog cards show you think about your craft in public, and the contact form with details (email, location, response time) makes the final step easy. A floating share bar keeps the page easy to pass between people, which is how freelance work often spreads.

Swap the sample details for yours and keep the order. It is the one-page layout from the [Personal Portfolio Website template](/website-builder/templates/portfolio/); open it in the [Website Builder](/website-builder/) to change the theme, add your own images and export.`,
    roles: [
      'a floating pill navbar with short anchor links, enough for a one-page site',
      'a real photo, one sentence on what you do and a badge showing whether you are taking work',
      'what you do in six short blocks, so a client can see at once whether you cover their need',
      'one project told with its result, the strongest proof a freelancer can show',
      'an extra row of recent projects as a draggable carousel, so a client can browse more work after the two featured case studies',
      'client quotes in a carousel, placed after the work they are vouching for',
      'recent writing as cards, which shows you think about your craft outside paid work',
      'a contact form beside your email, location and usual response time, so reaching out is easy',
      'a floating bar that makes the page easy to share between clients and collaborators',
      'a minimal footer with your social links and a copyright line',
    ],
    steps: [
      { title: 'Set your availability honestly', text: 'Edit the badge in the hero to your real status, such as "Booking for March" or "Fully booked, join the waitlist", and update it as it changes.' },
      { title: 'Pick one case study with a result', text: 'Rewrite the case study around a single project and one measurable outcome: sales up, time saved, launch on schedule.' },
      { title: 'Make contact effortless', text: 'Point the form at your email handler or Formspree, and fill in your real email, timezone and typical reply time beside it.' },
    ],
    useCases: [
      { icon: 'DESIGN', title: 'A freelancer\'s home on the web', desc: 'Give clients one link that shows who you are, what you do, proof and how to reach you.' },
      { icon: 'APP', title: 'A job-hunting portfolio', desc: 'Present selected projects and writing to employers with a hero that states your role and availability.' },
      { icon: 'LEARN', title: 'Learn container queries in a real layout', desc: 'See how each section adapts to its own width, so the page works inside any container.' },
    ],
    faqs: [
      { q: 'What should a freelancer portfolio include?', a: 'Who you are, what you do, one or two projects with results, quotes from clients and a clear way to get in touch, with your availability stated.' },
      { q: 'How many projects should I show?', a: 'One or two well-told ones beat a long list. Tell each as problem, work and result so a client can picture working with you.' },
      { q: 'Can I add a blog?', a: 'The page already shows blog cards. Link each card to your own posts, or to articles you have published elsewhere.' },
    ],
  },

  photographer: {
    title: 'Photographer Website HTML Template — Free CSS & JS Snippet',
    description: `A dark photographer website in HTML, CSS and JS: full-bleed hero, filterable gallery, session prices, testimonials, stories, shop grid and a booking form.`,
    headline: 'A Photographer Website That Lets the Photos Lead and the Packages Close the Booking',
    about: `For a photographer the work is the pitch, so this layout gets out of its way. A full-bleed image hero, a dark palette that makes photographs glow, and a filterable gallery where a visitor can look only at weddings, portraits or landscapes. What a gallery alone does not do is answer "how much?", so the page follows with session packages as clean price rows, followed by quotes from couples and clients that speak to the experience of being photographed, which is often what people are most nervous about.

Stories (blog cards) give search engines text to read and prospective clients a deeper look at a shoot. A small product grid lets you sell prints or presets. The booking form closes the page with the details a photographer needs: date, type of session and location.

Replace the sample images with your own best work and keep the gallery tight. It is the layout of the [Photographer Website template](/website-builder/templates/photographer/); open it in the [Website Builder](/website-builder/) to change fonts and colours, upload your images and export.`,
    roles: [
      'a simple sticky bar so the booking link is always close while visitors browse the work',
      'a full-bleed photograph as the hero: the first impression is the product itself',
      'a filterable gallery so a wedding couple sees weddings and a brand sees commercial work',
      'session packages as price rows, so the cost question is answered without a phone call',
      'quotes from clients about the experience of being photographed, which is what people worry about',
      'stories from recent shoots, giving search engines text to read and clients a deeper look',
      'a print and preset grid for selling work beyond the shoot itself',
      'a booking form that asks for the date, session type and location you need to give a quote',
      'a floating share bar so a favourite gallery is easy to send to a partner or family',
      'a minimal footer with your socials and copyright',
    ],
    steps: [
      { title: 'Curate the gallery to your best twelve', text: 'Upload only the images you want more of, tag each with its filter category, and let the strongest set the tone in the first row.' },
      { title: 'Write your packages as real prices', text: 'Edit the price rows to your actual sessions, with what is included (hours, edited images, delivery time) so enquiries arrive qualified.' },
      { title: 'Ask the booking questions you need', text: 'Adjust the form fields to the details you need for a quote, and route submissions to your email through Formspree or your own endpoint.' },
    ],
    useCases: [
      { icon: 'DESIGN', title: 'A portfolio and booking site in one', desc: 'Show the work, list the packages and take bookings from a single page with no platform fees.' },
      { icon: 'APP', title: 'Wedding, portrait and brand photographers', desc: 'Use the gallery filter to give each client type their own corner of the work.' },
      { icon: 'LEARN', title: 'Learn filterable galleries', desc: 'See how a gallery filters with small amounts of JavaScript while the images stay lazy-loaded and responsive.' },
    ],
    faqs: [
      { q: 'How many photos should a photography website show?', a: 'Fewer than you think. A tight set of your best work, grouped by category, persuades more than an exhaustive archive.' },
      { q: 'Should I show prices on a photographer website?', a: 'Showing starting prices pre-qualifies enquiries and saves time on both sides. List what is included in each package so it is easy to compare.' },
      { q: 'Will large images slow the page down?', a: 'Resize and compress images before uploading, and keep the hero image to a sensible width. The builder resizes uploaded images in the browser.' },
    ],
  },

  restaurant: {
    title: 'Restaurant Website HTML Template — Free CSS & JS Snippet',
    description: `A restaurant website in HTML, CSS and JS: photo hero with Book a table, menu, gallery, set menus, reviews, booking form, map and opening hours. Edit live.`,
    headline: 'A Restaurant Website That Fills Tables: Menu, Booking and Directions in One Page',
    about: `People search for a restaurant to answer four questions: what do you serve, what does it cost, can I get a table, and where are you? This layout answers them in that order. A moody photo hero with a "Book a table" button, then the menu itself on the page rather than behind a PDF link (readable by search engines and by customers on slow phones), then a filterable gallery that sells the atmosphere, set menus with prices, and reviews that confirm the experience.

The bottom of the page is where bookings happen. A booking request form collects the date, party size and any dietary notes, and the contact section pairs a map with your opening hours so there is no reason to leave the page to find either. A promo modal can announce a seasonal menu or a special evening without redesigning anything.

Swap in your dishes, hours and photographs. It is the layout of the [Restaurant Website template](/website-builder/templates/restaurant/), which also comes as a multi-page site with Menu, About and Visit pages; open it in the [Website Builder](/website-builder/) to edit and export.`,
    roles: [
      'a sticky bar that keeps "Book a table" within reach while visitors read the menu',
      'a moody photograph with your best dish and a Book a table button',
      'the menu itself on the page, as text, instead of a PDF that search engines and slow phones skip',
      'a filterable gallery that sells the room, the food and the people',
      'set menus as price rows, so the cost of an evening is clear before anyone enquires',
      'guest reviews in a wall, the proof a stranger looks for before reserving',
      'a booking request form with date, party size and dietary notes',
      'a map beside your address and opening hours, so nobody has to leave the page for directions',
      'an optional promo modal for a seasonal menu or a special evening',
      'a minimal footer with socials and legal links',
    ],
    steps: [
      { title: 'Type your real menu into the page', text: 'Replace the sample dishes with your menu as text, with prices and allergen notes, and keep it updated here instead of in a PDF.' },
      { title: 'Set your booking and opening hours', text: 'Point the booking form at your email or booking tool, and edit the opening hours and map to your address, including holiday closures.' },
      { title: 'Use the promo modal for the week\'s news', text: 'Use the popup for a seasonal menu, a tasting evening or a closure, and switch it off when it is no longer relevant.' },
    ],
    useCases: [
      { icon: 'APP', title: 'A website for a restaurant, café or bistro', desc: 'Show the menu, take booking requests and give directions without paying for a platform.' },
      { icon: 'DESIGN', title: 'A pop-up or supper club page', desc: 'Use the hero, set menu and booking form to sell tickets for a short-run event.' },
      { icon: 'LEARN', title: 'Learn a menu layout and a map embed', desc: 'See how menu sections, filterable galleries and an embedded map fit into one responsive page.' },
    ],
    faqs: [
      { q: 'Should a restaurant menu be a PDF or on the page?', a: 'On the page. Text is readable on any phone, indexable by search engines and easy to update, while a PDF is slow to open and often unreadable on mobile.' },
      { q: 'How do customers book a table from this page?', a: 'The booking form sends a request to your email or booking service. For live availability, link the button to your booking provider instead.' },
      { q: 'What does a restaurant need for local search?', a: 'An accurate address, opening hours, a menu in text and consistent business details across your site and listings.' },
    ],
  },

  'real-estate': {
    title: 'Real Estate Agency Website HTML Template — Free Snippet',
    description: `A real estate agency website in HTML, CSS and JS: hero, property listings, services, three-step process, counting stats, agent team, reviews and FAQ. Edit live.`,
    headline: 'A Real Estate Website Built on Trust: Listings, Process, Results and the People Behind Them',
    about: `Choosing an agent is a trust decision, so this page leads with something tangible: a striking home at dusk and the listings themselves, not a slogan. Property cards give visitors something to do immediately, while the services grid and three-step process explain what you do for buyers and sellers in plain terms, so the unknown becomes manageable. Moving counters (homes sold, years in the area, average days to sell) turn "experienced" into evidence.

The people come next. A team grid with real agent photos gives a nervous seller a face, and the testimonial wall and FAQ answer the questions every client asks before they pick up the phone: fees, timelines, how valuations work. The contact form at the end is built for a valuation request, which is the conversation most agents want to start.

Replace the sample listings and agents with yours. It is the layout of the [Real Estate Agency Website template](/website-builder/templates/real-estate/); open it in the [Website Builder](/website-builder/) to edit copy, theme and images and export.`,
    roles: [
      'a sticky bar with a valuation button, since seller enquiries are the most valuable ones',
      'a home at dusk as the hero, which sells the feeling of the product before a single listing',
      'live-looking property cards with price, beds and location, giving visitors something to browse at once',
      'what you do for buyers, sellers and landlords, in plain language',
      'three steps that make selling or buying feel manageable instead of unknown',
      'counters for homes sold, years in the area and days to sell: proof a seller can compare',
      'the agents behind the listings, with photos, because people choose a person before a company',
      'reviews from recent buyers and sellers, placed right after the team they praise',
      'fees, timelines and how valuations work, answered before the first call',
      'a form built for the conversation you want most: a free valuation request',
      'a multi-column footer with areas covered, services and legal links',
    ],
    steps: [
      { title: 'Load in your real listings', text: 'Replace the sample property cards with your current listings: photo, price, bedrooms and location, and link each card to its full listing page.' },
      { title: 'Use true numbers in the counters', text: 'Edit the stats to figures you can back up, such as homes sold last year and average days on market, so sellers can compare you with other agents.' },
      { title: 'Turn the form into a valuation funnel', text: 'Rename the contact form as a free valuation request, add the property address field and send submissions to the agent responsible for that area.' },
    ],
    useCases: [
      { icon: 'APP', title: 'An independent agent or small agency site', desc: 'Show listings, explain your process and win valuation enquiries without a portal.' },
      { icon: 'DESIGN', title: 'A neighbourhood specialist page', desc: 'Focus the page on one area and use the counters and team to prove local expertise.' },
      { icon: 'LEARN', title: 'Learn listing cards and animated counters', desc: 'See how property cards, count-up numbers and container queries fit one responsive layout.' },
    ],
    faqs: [
      { q: 'What should an estate agent website include?', a: 'Current listings, a clear explanation of how you work with buyers and sellers, proof of results, the people involved and an easy way to ask for a valuation.' },
      { q: 'How do I show my own listings?', a: 'Edit the property cards with your listing details and link each to its page or your listings system. Remove the ones you do not have.' },
      { q: 'Why include a three-step process?', a: 'Buying or selling is unfamiliar and stressful. Three clear steps show what happens next and make contacting you feel low-risk.' },
    ],
  },
};
