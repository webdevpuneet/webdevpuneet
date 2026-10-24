/* SEO page content for the Scroll effects and Menus & listings sections (merged into
   SECTION_SEO in seo-content.js). Same shape as every other entry: keywords, about, 8
   features, 3 reasons, 4 use cases (18–42 words), 4 FAQs and an AI prompt. */

export const SCROLL_LISTINGS_SEO = {
  'scroll-gallery': {
    keywords: ['horizontal scroll section', 'gsap horizontal scroll', 'scroll gallery html', 'pinned horizontal scroll', 'scroll sideways on scroll down'],
    about: {
      title: 'Horizontal Scroll Gallery — Free GSAP Pinned Section',
      description: `**Horizontal Scroll Gallery** turns vertical scrolling into sideways movement. On laptops and desktops the section pins to the screen and its row of tall image cards slides left as visitors keep scrolling down; when the last card arrives, the page carries on as normal.

**Built with GSAP ScrollTrigger**

The row is pinned and scrubbed with ScrollTrigger, and the scroll distance is measured from the row itself, so it always matches the number and width of your cards, including after a resize.

**A real layout without JavaScript**

The section is a swipeable row with CSS scroll snapping first. On phones, without JavaScript, with reduced motion and while you edit it, that is exactly what visitors get, so nothing is ever hidden.

**Edit every card**

Cards are an editable list of 2 to 12, each with an image, tag, title, text and link. Export HTML, a ZIP, React or Vue, or fork it into [My Code](/ui-snippets/mycode/). Pair it with the [Pinned Scroll Story](/website-section-templates/scroll-story/) for a page full of scroll moments.

**Getting the most from it**

Choose images with the same aspect ratio so the row feels even, and give each card a short tag, such as the room type or the category, so visitors can tell the cards apart as they scroll sideways. Six to eight cards are enough for most pages. Make each title descriptive, since it also becomes the text search engines read, and link every card to its own page. Remember that on a phone the gallery is a normal vertical list, so check that the first card is strong on its own.`,
    },
    features: [
      'Pins and scrolls sideways as visitors scroll down',
      'Scroll distance measured from your cards, resize-safe',
      'Swipeable scroll-snap row on phones and without JS',
      '2 to 12 cards with image, tag, title, text and link',
      'Tall 4:5 images with a gentle hover lift',
      'Dark gallery theme by default; any preset or brand kit',
      'Reduced motion respected; plain layout while editing',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '↔', title: 'A memorable moment', desc: 'Sideways motion in a vertical page stops the scroll and makes a portfolio or collection feel curated.' },
      { icon: '⇣', title: 'No new gesture to learn', desc: 'Visitors keep scrolling as usual; the page decides when the row moves, then hands control back.' },
      { icon: '✓', title: 'Never hides content', desc: 'Every card is in the HTML and reachable by swiping, keyboard and screen readers, with or without motion.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Studio portfolio', desc: 'Show six recent projects as tall cards with a client tag, title and one line each, linking to full case studies, so visitors browse your work without leaving the page.' },
      { icon: '🛍️', title: 'Product collection', desc: 'Present a seasonal collection or lookbook as a sideways row of product photos, each card linking straight to its product page with the price in the text line.' },
      { icon: '🏨', title: 'Rooms and destinations', desc: 'Let hotels and travel sites slide through rooms, villas or destinations with a photo, a short description and a booking link on every card.' },
      { icon: '🍽️', title: 'Signature dishes', desc: 'Restaurants can scroll through signature dishes with mouth-watering photos and a one-line description, ending with a link to the full menu and bookings.' },
    ],
    faqs: [
      { q: 'How does the horizontal scrolling work?', a: 'GSAP ScrollTrigger pins the section and moves the row of cards left in step with your vertical scrolling. The scroll length equals how far the row overflows, so it always ends exactly at the last card.' },
      { q: 'What happens on phones?', a: 'Below 768px the row stays a native swipeable row with scroll snapping, which feels more natural on touch screens than a pinned section.' },
      { q: 'Is it accessible?', a: 'Yes. All cards are ordinary links in the HTML, reachable with the keyboard and screen readers. People who prefer reduced motion get the swipeable row instead of the pinned animation.' },
      { q: 'Can I use it in React or Next.js?', a: 'Yes. Export it as a React or Vue component; the ScrollTrigger script is included and runs on the client. Load GSAP and ScrollTrigger from the CDN links in the export or from npm.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the gallery: add a progress bar under the row, snap to each card at the end of the scroll, or reveal each card’s text as it enters the centre.',
      prompt: `Create a horizontal scroll gallery section in HTML, CSS and GSAP.

- A header with eyebrow, heading and intro text.
- A row of tall 4:5 image cards (tag, title, text), as a flex row with overflow-x auto and scroll-snap as the base.
- With GSAP ScrollTrigger on screens 768px and wider: pin the section and tween the row's x to minus its overflow width, scrubbed, with end = "+=" + overflow and invalidateOnRefresh.
- Use gsap.matchMedia so phones keep the swipeable row; respect prefers-reduced-motion.
- Theme colours as CSS custom properties.`,
    },
  },

  'scroll-story': {
    keywords: ['scrollytelling section', 'sticky scroll section', 'scroll story template', 'pinned image scroll gsap', 'product tour section html'],
    about: {
      title: 'Pinned Scroll Story — Free Scrollytelling Section',
      description: `**Pinned Scroll Story** walks visitors through a sequence, one step at a time. On larger screens the steps scroll up on the left while an image stage on the right stays pinned and crossfades to the picture for the step in view; the active step is highlighted and the others fade back.

**Scrollytelling made editable**

Steps are a list of 2 to 6, each with an image, a label such as "01 · Plan", a title and text. Change the order and the story follows, because every step carries its own image.

**Works everywhere**

On phones, without JavaScript and while editing, each step simply shows its image above its text, so the content is complete in every situation. The pinned layout switches on from 900px with GSAP ScrollTrigger and respects reduced motion.

**Pairs well**

Use it after a hero for a product tour, or follow it with a [Stacking Cards](/website-section-templates/scroll-stack/) section for features. Export HTML, a ZIP, React or Vue.

**Getting the most from it**

Treat each scene as one sentence of your story: a clear heading, two or three lines of text and an image that shows the point. Three to five scenes keep the pinned section short enough to enjoy rather than endure. Order the scenes the way you would explain the idea to a friend, from the problem to the result, and end on a scene that leads naturally into your call to action. Use images with a similar crop so the transitions stay smooth.`,
    },
    features: [
      'Steps scroll while the image stage stays pinned',
      'Crossfade to each step’s image as it reaches the middle',
      'Active step highlighted, others gently faded',
      '2 to 6 steps with image, label, title and text',
      'Stacks into image-and-text steps on phones',
      'Complete without JavaScript and while editing',
      'GSAP ScrollTrigger, reduced motion respected',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🎬', title: 'Tells a story in order', desc: 'One idea at a time, with the right picture beside it, is easier to follow than a wall of features.' },
      { icon: '📌', title: 'The picture stays put', desc: 'The pinned stage keeps the visual in view while the words change, so readers never lose context.' },
      { icon: '📱', title: 'Graceful on phones', desc: 'Small screens get a clean sequence of image and text steps instead of a cramped pinned layout.' },
    ],
    useCases: [
      { icon: '🧭', title: 'Product tour', desc: 'Walk new visitors through plan, collaborate, automate and report with a screenshot for each step, so they understand the product before they ever sign up.' },
      { icon: '📖', title: 'Brand story', desc: 'Tell how the company started, what it believes and where it is going, with a photo for each chapter that changes as readers scroll through the story.' },
      { icon: '🏗️', title: 'Case study', desc: 'Show the brief, the process and the result of a client project, swapping between before, work-in-progress and final images beside each part of the story.' },
      { icon: '🧪', title: 'How it is made', desc: 'Explain how a product is sourced, made and delivered, with a pinned photo for each stage so customers can see the craft behind what they buy.' },
    ],
    faqs: [
      { q: 'What is a scroll story?', a: 'Also called scrollytelling: content that changes as you scroll. Here, text steps scroll past while a pinned image beside them switches to match the step in view.' },
      { q: 'How many steps work best?', a: 'Three to five. Each step takes most of a screen height on desktop, so more than six makes the section long; split longer stories into two sections.' },
      { q: 'What does the Pinned Scroll Story section look like on mobile?', a: 'Below 900px each step shows its own image above its title and text, in a simple vertical sequence with no pinning.' },
      { q: 'Can I use video instead of images?', a: 'The export uses images, but you can replace an image with a muted, looping video in the exported HTML; the crossfade works on any element in the stage.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to add a progress indicator to the stage, play a short video per step, or animate each step’s title with SplitText as it becomes active.',
      prompt: `Create a scrollytelling section in HTML, CSS and GSAP.

- A header, then an ordered list of steps; each step has an image, a label, a title and text.
- Base layout: each step shows its image above its text.
- From 900px with GSAP ScrollTrigger: build a stage beside the steps containing a copy of every step image, pin it while the steps scroll (pinSpacing false), and crossfade to the image of the step crossing the middle of the screen; mark the active step with a class.
- Use gsap.matchMedia and respect prefers-reduced-motion; theme colours as CSS custom properties.`,
    },
  },

  'scroll-stack': {
    keywords: ['stacking cards on scroll', 'sticky cards section', 'gsap stacking cards', 'cards stack scroll effect', 'card stack html css'],
    about: {
      title: 'Stacking Cards on Scroll — Free GSAP Section Template',
      description: `**Stacking Cards** deals your features or services like a deck. As visitors scroll, each card pins a little below the one before, the next card slides over it, and the covered cards shrink and dim, building a neat stack that reads one card at a time.

**Four cards, or six**

Cards are an editable list of 2 to 6, each with an icon, label, title, text and an optional image. Cards cycle through three looks (light, tinted and dark) so the stack stays easy to tell apart.

**Solid foundations**

Without JavaScript, on phones and while editing, the cards form a normal column, so nothing depends on the animation. The effect uses GSAP ScrollTrigger pins with stepped offsets and scrubbed scale, and respects reduced motion.

Follow it with a [Gradient CTA Banner](/website-section-templates/cta-gradient-banner/) to turn interest into sign-ups. Export HTML, a ZIP, React or Vue.

**Getting the most from it**

Keep each card to a single idea, a short title and two lines of text, because stacked cards cover each other as you scroll and the previous card is only half visible. Four to six cards is the sweet spot: fewer feels thin, more makes the page long. Put the strongest point first and the call to action in the last card, and link every card to a deeper page so the section also feeds your internal links.`,
    },
    features: [
      'Cards pin and stack as visitors scroll',
      'Covered cards shrink and dim for depth',
      'Light, tinted and dark card looks in rotation',
      '2 to 6 cards with icon, label, title, text and image',
      'Image optional: text-only cards fill the width',
      'Normal column on phones and without JavaScript',
      'GSAP ScrollTrigger pins with scrubbed scaling',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🂠', title: 'One message at a time', desc: 'Each card gets the full screen for a moment, so every feature or service is actually read.' },
      { icon: '⧉', title: 'Depth without clutter', desc: 'The stack shows how much you offer while keeping the current card in focus.' },
      { icon: '✓', title: 'Safe by default', desc: 'Pins only switch on with GSAP on larger screens; everywhere else it is a plain list of cards.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Feature highlights', desc: 'Give a SaaS product’s four biggest features a card each, with a screenshot, so visitors absorb them one by one before reaching pricing.' },
      { icon: '🧰', title: 'Agency services', desc: 'Present brand, web, product and growth services as stacked cards with a short pitch and an example image for each discipline.' },
      { icon: '💡', title: 'Values or principles', desc: 'Share the principles behind a company or nonprofit as text-only cards with an icon, letting each value land before the next slides over it.' },
      { icon: '🏋️', title: 'Programmes or plans', desc: 'Stack training programmes, courses or packages with what each includes, so people compare them in order before choosing one to book.' },
    ],
    faqs: [
      { q: 'How does the stacking work?', a: 'GSAP ScrollTrigger pins each card a little lower than the one before until the last card arrives. While the next card slides over, the covered card scales down and dims, scrubbed to the scroll.' },
      { q: 'Does the Stacking Cards section work on phones?', a: 'Below 768px the cards are a normal column without pinning, which is easier to read on small screens.' },
      { q: 'Do the cards need images?', a: 'No. Leave the image empty and that card becomes text-only and spans the full width.' },
      { q: 'Why is the inner card scaled rather than the card itself?', a: 'The pinned card is positioned by ScrollTrigger, so the scale is applied to its inner wrapper to keep the pin and the shrink effect from interfering.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to rotate each covered card slightly, add a counter like "2 / 4", or change the stacking to fan out sideways on wide screens.',
      prompt: `Create a stacking cards section in HTML, CSS and GSAP.

- A header, then a column of cards; each card has an inner wrapper with icon, label, title, text and an optional image.
- From 768px with GSAP ScrollTrigger: pin every card at an increasing top offset (90px + 22px per card) until the last card arrives (pinSpacing false), and scrub the inner wrapper of each covered card to a smaller scale and lower brightness as the next card slides over.
- Use gsap.matchMedia and respect prefers-reduced-motion; theme colours as CSS custom properties.`,
    },
  },

  'scroll-path': {
    keywords: ['timeline section html', 'draw svg on scroll', 'gsap timeline scroll', 'company history timeline', 'animated timeline css'],
    about: {
      title: 'Scroll Path Timeline — Free SVG Draw-on-Scroll Section',
      description: `**Scroll Path Timeline** connects milestones with a hand-drawn SVG line that draws itself as visitors scroll. Each milestone lights up the moment the line reaches it, so the page feels like it is telling the story in real time.

**SVG that follows your theme**

The line is inline SVG coloured with the theme's brand colour, and the milestone dots use your icons, so it matches any preset or brand kit with no image files.

**Milestones you can edit**

Add 2 to 10 milestones, each with a date or label, an icon, a title and text. On wide screens they alternate left and right of the line; on narrow screens they line up on one side.

**Visible without JavaScript**

Without JavaScript or with reduced motion the line is fully drawn and every milestone is shown. With GSAP the stroke is scrubbed from hidden to drawn using its own length, no plugin needed. Export HTML, a ZIP, React or Vue.

**Getting the most from it**

Use it for a sequence that really has an order, such as a company history, a project roadmap, an onboarding journey or a wedding day schedule. Keep milestone titles short and put the year or step number in the label so the path reads as a timeline even at a glance. Six to eight milestones work best; past that, the line becomes long and visitors skim. Add a short sentence under each title that says what changed, not just what happened.`,
    },
    features: [
      'SVG line that draws itself as you scroll',
      'Milestones light up when the line reaches them',
      'Alternating left and right on wide screens',
      '2 to 10 milestones with date, icon, title and text',
      'Inline SVG in your theme colours, no image files',
      'Fully drawn and readable without JavaScript',
      'GSAP ScrollTrigger scrub, reduced motion respected',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '〰', title: 'Momentum on the page', desc: 'A line that grows as you scroll pulls readers forward through the story.' },
      { icon: '🎨', title: 'Always on brand', desc: 'The SVG takes your theme colours, so it fits any palette without new artwork.' },
      { icon: '✓', title: 'Content first', desc: 'All milestones are real HTML text; the drawing is a bonus layered on top.' },
    ],
    useCases: [
      { icon: '🏢', title: 'Company history', desc: 'Show the founding year, first customers, big launches and today’s numbers on an About page, with the line drawing the company’s journey as visitors read.' },
      { icon: '🗺️', title: 'Product roadmap', desc: 'Share what shipped, what is in progress and what comes next, with dates as labels, so customers see momentum and know what to expect.' },
      { icon: '🎟️', title: 'Event agenda', desc: 'Lay out the schedule of a conference or wedding day as milestones with times, so guests follow the day from arrival to the last dance.' },
      { icon: '🎓', title: 'Learning path', desc: 'Guide students through the modules of a course in order, each milestone describing what they will learn and build at that stage.' },
    ],
    faqs: [
      { q: 'How is the line drawn?', a: 'The path’s stroke is dashed to its own length and GSAP scrubs the dash offset from hidden to fully drawn while the timeline crosses the screen. No DrawSVG plugin is needed.' },
      { q: 'Can I change the shape of the line?', a: 'Yes. The path is a plain SVG path in the HTML; replace its d attribute in the exported code with any curve and the drawing still works because it measures the path’s length.' },
      { q: 'What do milestones look like before the line reaches them?', a: 'They are dimmed and slightly lowered, then fade in fully as the line arrives. Without JavaScript they are all shown normally.' },
      { q: 'Is it responsive?', a: 'Yes. From 900px wide the milestones alternate on both sides of a centred line; below that the line runs down the left with all milestones on the right.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to make the line wander more, add a moving dot at the tip of the drawn line, or draw small illustrations next to each milestone with the same technique.',
      prompt: `Create a vertical timeline section in HTML, CSS, SVG and GSAP.

- A header, then an SVG path running down the timeline (a faint track path and a brand-coloured path on top), and an ordered list of milestones with a round icon dot, date, title and text.
- From 900px, milestones alternate left and right of a centred line; below, the line runs down the left.
- With GSAP ScrollTrigger: set the top path's stroke-dasharray and stroke-dashoffset to its getTotalLength(), scrub the offset to 0 while the timeline crosses the screen, and toggle an "is-on" class on each milestone as it reaches 65% of the viewport.
- Without JavaScript the line is fully drawn; respect prefers-reduced-motion.`,
    },
  },

  'restaurant-menu': {
    keywords: ['restaurant menu html', 'menu section template', 'food menu with prices html', 'cafe menu website', 'restaurant menu css'],
    about: {
      title: 'Restaurant Menu — Free HTML Menu Section With Prices',
      description: `**Restaurant Menu** brings the look of a printed menu to your website. Dishes sit in two tidy columns with the name, a dotted leader running to the price, a short description and an optional tag such as "V", "GF" or "Chef’s pick".

**One section per course**

Use the eyebrow for the course name and add a section for starters, mains, desserts or drinks. Each holds 1 to 24 dishes in an editable list you can reorder in seconds.

**Practical details**

A note under the dishes covers allergens, dietary symbols or service charges, and an optional button links to bookings or ordering. On phones the columns become one, with leaders that still line up.

**Warm by default**

It ships with a warm palette and a serif heading font that suit restaurants, cafés and bars; switch to any preset or your brand kit. Pair it with the [Contact With Map](/website-section-templates/contact-map/) section for opening hours and directions. Export HTML, a ZIP, React or Vue.

**Getting the most from it**

Write each dish with its main ingredients in a single line and a price, and keep the descriptions short enough to scan on a phone. Mark dietary information, such as vegetarian or gluten-free, in the description text so it is searchable. Group items into the courses guests expect, starters, mains and desserts, and put the dishes you most want to sell first in each group. The same menu layout works for a spa treatment list, a salon price list or a catering package list.`,
    },
    features: [
      'Two columns of dishes, one on phones',
      'Dotted leaders from each dish to its price',
      'Description and optional tag for every dish',
      '1 to 24 dishes per section; one section per course',
      'Note for allergens, symbols or service',
      'Optional button to bookings or ordering',
      'Warm serif theme by default; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '📜', title: 'Feels like a real menu', desc: 'Leaders and serif type give the familiar, appetising look of a printed menu.' },
      { icon: '🔎', title: 'Readable by search engines', desc: 'Dishes and prices are real text, unlike a PDF or photo of a menu, so they can be found and read on any device.' },
      { icon: '✏️', title: 'Easy to update', desc: 'Change a price or swap a dish in seconds when the market or season changes.' },
    ],
    useCases: [
      { icon: '🍝', title: 'Restaurant website', desc: 'Add a section each for starters, mains and desserts with prices and dietary tags, followed by a booking button, so diners decide before they arrive.' },
      { icon: '☕', title: 'Café and bakery', desc: 'List coffees, teas and pastries with short descriptions and prices, and use the note for oat milk, gluten-free options and opening hours.' },
      { icon: '🍸', title: 'Bar and wine list', desc: 'Present cocktails or wines by the glass with tasting notes and prices, tagging house specials and new additions to the list.' },
      { icon: '🚚', title: 'Food truck or caterer', desc: 'Show a compact menu of best sellers with prices, and link the button to pre-orders, catering enquiries or where the truck is parked this week.' },
    ],
    faqs: [
      { q: 'How do I make a menu with several courses?', a: 'Add one Restaurant Menu section per course and set the eyebrow to the course name, such as Starters, Mains or Desserts. Sections share one theme, so they look like one menu.' },
      { q: 'How do the dotted leaders work?', a: 'A flexible element between the dish name and the price fills the space with a dotted border, so the dots always reach the price whatever the name’s length.' },
      { q: 'Can I show dietary symbols?', a: 'Yes. Use each dish’s tag for V, VG or GF, and explain the symbols in the note under the menu.' },
      { q: 'Is a web menu better than a PDF?', a: 'Usually. Text menus load faster, read well on phones, can be found by search engines and are easier to keep up to date than a PDF or image.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to add small photos to signature dishes, mark sold-out items, or generate Menu structured data from the dishes for search engines.',
      prompt: `Create a restaurant menu section in HTML and CSS.

- A centred header with a course name eyebrow, heading and intro.
- A two-column list of dishes; each dish has a line with the name, an optional pill tag, a dotted leader (a flex-grow element with a dotted bottom border) and the price, then a short description.
- A note and a button under the list.
- Container queries switch to one column below 720px; serif headings and warm theme colours as CSS custom properties.`,
    },
  },

  'property-listings': {
    keywords: ['property listings html', 'real estate cards template', 'house listing card css', 'real estate website section', 'property card design'],
    about: {
      title: 'Property Listings — Free Real Estate Cards Section',
      description: `**Property Listings** shows homes as clear, clickable cards: a photo with a status badge, the price, a short title, the address and the key facts buyers scan for, such as bedrooms, bathrooms and floor area.

**Themed SVG art until you add photos**

Every card starts with an inline SVG house illustration drawn in your theme colours, in three variations (day, sunset and night with lit windows). Upload a photo and it replaces the illustration on that card only, so the section looks finished from the start with any preset.

**Built for browsing**

Cards sit in a responsive grid of up to twelve, lift on hover and link to each full listing, with a "See all listings" link in the header. Leave any fact empty and it disappears.

Use it with the [Contact Split Form](/website-section-templates/contact-split-form/) for viewings and valuations. Export HTML, a ZIP, React or Vue.

**Getting the most from it**

Write the title as what makes the home special, such as "Corner house with a garden", and keep the address to the street and area so it reads quickly. Show the same facts on every card, price, bedrooms and size, so visitors can compare at a glance, and use the status badge for "For sale", "To let" or "Under offer". If you have more than a dozen homes, show your best six to twelve here and link "See all listings" to your property portal.`,
    },
    features: [
      'Cards with photo, status badge, price, title and address',
      'Bedrooms, bathrooms and area, each optional',
      'Themed SVG house art until you upload photos',
      'Day, sunset and night illustration variations',
      'Responsive grid of 1 to 12 homes with hover lift',
      '"See all listings" link in the header',
      'Fresh teal theme by default; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🏠', title: 'Scannable at a glance', desc: 'Price first, then location and key facts: the order buyers and renters actually read in.' },
      { icon: '🎨', title: 'Looks finished on day one', desc: 'The SVG houses follow your colours, so the page never shows grey placeholders.' },
      { icon: '🔗', title: 'Every card is a link', desc: 'The whole card opens the listing, which is easier to tap on phones than a small button.' },
    ],
    useCases: [
      { icon: '🏡', title: 'Estate agent homepage', desc: 'Feature the newest homes for sale with photos, prices and bedroom counts, linking each card to its listing and the header link to all properties.' },
      { icon: '🔑', title: 'Lettings and rentals', desc: 'Show rental homes with a "To rent" badge, the monthly price and the area, so renters can shortlist places before booking viewings.' },
      { icon: '🏗️', title: 'New-build development', desc: 'Present the house types on a new development with "New" badges, floor areas and starting prices, each linking to its floor plan.' },
      { icon: '🏖️', title: 'Holiday homes', desc: 'List villas and cottages with nightly prices, guest and bedroom counts and a photo, linking each card to its booking page.' },
    ],
    faqs: [
      { q: 'Do I need photos to use it?', a: 'No. Each card shows a themed SVG house illustration until you upload a photo, so the section looks complete straight away.' },
      { q: 'Can I connect it to a property feed?', a: 'The export is static HTML. To make it dynamic, render the same card markup from your property feed or CMS; the CSS works with any number of cards.' },
      { q: 'Can I change the facts shown?', a: 'Yes. Bedrooms, bathrooms and area are free text, so you can write "2 guests", "EPC B" or "Garage" instead, and empty facts are hidden.' },
      { q: 'Can the illustrations be animated?', a: 'Yes. The houses are inline SVG with named parts, such as windows and roofs, so you can animate them with GSAP, for example in the Website Builder’s scroll animations.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to add a filter bar for price and bedrooms, a favourite heart on each card, or a map view that highlights the hovered listing.',
      prompt: `Create a property listings section in HTML and CSS.

- A header with eyebrow, heading and a "See all listings" link.
- A responsive grid (auto-fill, min 300px) of link cards; each has a 3:2 media area with a photo or an inline SVG house illustration coloured with CSS custom properties, a status pill, then price, title, address and a row of facts (beds, baths, area).
- Hover lift and focus-visible outline; theme colours as CSS custom properties.`,
    },
  },

  'class-timetable': {
    keywords: ['class timetable html', 'gym schedule template', 'timetable section css', 'class schedule website', 'responsive timetable table'],
    about: {
      title: 'Class Timetable — Free HTML Schedule Section Template',
      description: `**Class Timetable** puts your weekly schedule on the page in a format people can actually use. On larger screens it is an accessible table with the day, time, class, coach and level; on phones each row becomes a labelled card that is easy to read with one thumb.

**Works for any schedule**

Column headings are editable, so the same section serves gyms and yoga studios, dance and music schools, language courses, workshops and conference agendas. Rows are an editable list of up to 40 classes, and level badges make suitable sessions easy to spot.

**Book from the timetable**

A note covers first visits or changes, and an optional button links to bookings or a free trial. The bold dark theme with a lime accent suits fitness brands; switch to any preset for a calmer look.

Pair it with the [Team Grid](/website-section-templates/team-grid/) to introduce the coaches. Export HTML, a ZIP, React or Vue.

**Getting the most from it**

Keep class names short and consistent, and put the level in its own column so beginners can spot where they belong. Order the rows by day and time, and name the coach, since people often choose a class for the person leading it. If the timetable changes by term, add the dates in the note rather than keeping out-of-date rows. The same layout works for yoga studios, dance schools, tutoring centres and clubs: rename the columns in the panel to suit.`,
    },
    features: [
      'Accessible table: day, time, class, coach, level',
      'Turns into labelled cards on phones',
      'Editable column headings for any kind of schedule',
      'Up to 40 rows in an editable list',
      'Level badges, tabular times and row hover',
      'Note and optional booking button',
      'Bold dark fitness theme; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '📅', title: 'Answers "when?"', desc: 'The schedule is the most visited page of most gyms and schools; this puts it in clear, searchable text.' },
      { icon: '📱', title: 'Made for phones', desc: 'Rows become cards with labels, so nobody has to scroll a wide table sideways.' },
      { icon: '♿', title: 'Real table markup', desc: 'Column and row headers help screen readers announce each class with its day and time.' },
    ],
    useCases: [
      { icon: '🏋️', title: 'Gym class schedule', desc: 'List the week’s HIIT, strength and mobility classes with times, coaches and levels, and link the button to a free trial so newcomers can book straight away.' },
      { icon: '🧘', title: 'Yoga or Pilates studio', desc: 'Show daily flows, restorative sessions and workshops with the teacher and level, plus a note asking students to arrive early and bring a mat.' },
      { icon: '🎵', title: 'Music or dance school', desc: 'Rename the columns to Day, Time, Lesson, Teacher and Age to publish weekly lessons for children and adults, with enrolment on the button.' },
      { icon: '🎤', title: 'Conference agenda', desc: 'Use the columns for Day, Time, Session, Speaker and Track to publish an event programme that attendees can check on their phones.' },
    ],
    faqs: [
      { q: 'Can I rename the columns?', a: 'Yes. Every column heading is an editable field, and the phone layout uses the same labels, so it stays consistent.' },
      { q: 'How does it look on mobile?', a: 'Below 720px the header row is hidden visually and each class becomes a card where every value has its label, such as Day or Coach.' },
      { q: 'Is the table accessible?', a: 'Yes. It uses a real table with column headers and a row header for each class name, which screen readers use to announce the context of every cell.' },
      { q: 'Can I hide the coach or level?', a: 'Leave a class’s coach or level empty and that cell stays blank; empty levels show no badge.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to add day filter buttons, highlight today’s classes automatically, or show spots left with a small progress bar on each row.',
      prompt: `Create a class timetable section in HTML and CSS.

- A header, then a table with columns Day, Time, Class, Coach and Level; the class name is a row header and the level is a pill badge.
- On screens narrower than 720px (container query), hide the header row visually and turn each row into a card grid where every cell shows its column label from a data-label attribute via ::before.
- A note and a booking button under the table; dark theme colours as CSS custom properties.`,
    },
  },
};

/* Category landing pages for the two new categories (merged into SECTION_CATEGORY_SEO) */
export const SCROLL_LISTINGS_CATEGORY_SEO = {
  scroll: {
    title: 'Scroll Effect Section Templates — Free GSAP Scroll Sections',
    description: 'Free scroll effect sections built with GSAP ScrollTrigger: horizontal scroll gallery, pinned scroll story, stacking cards and a timeline drawn on scroll.',
    h1: 'Scroll Effect Section Templates',
    keywords: ['scroll animation sections', 'gsap scroll templates', 'horizontal scroll section', 'scrollytelling template', 'stacking cards scroll'],
    intro: `Scroll effects turn a long page into an experience. These sections use GSAP ScrollTrigger to pin, scrub and reveal content as visitors scroll, while staying complete, readable layouts on phones, without JavaScript and for people who prefer reduced motion.

The **[Horizontal Scroll Gallery](/website-section-templates/scroll-gallery/)** pins and slides a row of cards sideways as you scroll down. The **[Pinned Scroll Story](/website-section-templates/scroll-story/)** keeps an image stage in view while steps scroll past and crossfades to each step's picture. **[Stacking Cards](/website-section-templates/scroll-stack/)** pins features one over another like a deck being dealt. The **[Scroll Path Timeline](/website-section-templates/scroll-path/)** draws an SVG line through your milestones as you read.

Every section is editable in the browser and shares one theme with the rest of the library. In the [Website Builder](/website-builder/) you can add scroll animations to any section too: pin, scrub, keyframes and effects, without writing code.`,
    faqs: [
      { q: 'Do scroll effects hurt performance?', a: 'Not when done well. These sections animate transforms and opacity with GSAP, which the browser handles efficiently, and they skip the effects entirely on small screens where pinning is awkward.' },
      { q: 'What happens without JavaScript?', a: 'Each section is a complete layout first: a swipeable row, a list of steps with images, a column of cards or a fully drawn timeline. The scroll effects are layered on top.' },
      { q: 'Are they accessible?', a: 'Content stays in the HTML in reading order, links work with the keyboard, and everyone who sets prefers-reduced-motion gets the static layout.' },
    ],
  },
  listings: {
    title: 'Menu, Listing & Timetable Sections — Free HTML Templates',
    description: 'Free industry sections: a restaurant menu with prices, property listing cards with themed SVG art and a responsive class timetable. Edit online, export HTML.',
    h1: 'Menus, Listings & Timetables',
    keywords: ['restaurant menu template', 'property listings template', 'class timetable template', 'industry website sections', 'menu with prices html'],
    intro: `Some businesses need sections that general landing-page kits don't have. These templates cover the content customers look for first in three common industries.

The **[Restaurant Menu](/website-section-templates/restaurant-menu/)** lists dishes with dotted leaders to the price, descriptions and dietary tags, one section per course. **[Property Listings](/website-section-templates/property-listings/)** shows homes as cards with price, status, address and key facts, with themed SVG house illustrations until you add photos. The **[Class Timetable](/website-section-templates/class-timetable/)** publishes a weekly schedule as an accessible table that becomes labelled cards on phones.

Each one is editable in the browser, matches the rest of the library's theme and exports as HTML, a ZIP, React or Vue. Combine them with heroes, galleries and contact sections in the [Website Builder](/website-builder/) to build a restaurant, agency or gym website in minutes.

New: the **[Product Grid](/website-section-templates/product-grid/)** shows products with photos, badges, prices, sale prices and ratings, and links each one to your own checkout.`,
    faqs: [
      { q: 'Are these better than a PDF menu or an image timetable?', a: 'Yes for most sites: real text loads faster, reads well on phones, works with screen readers and can be found by search engines.' },
      { q: 'Can I use them for other industries?', a: 'Yes. The menu works for services with prices, the listings for any catalogue of cards, and the timetable for courses, events and conferences, since every label is editable.' },
      { q: 'Can I add more items?', a: 'Menus hold up to 24 dishes per section, listings up to 12 homes and timetables up to 40 classes; add another section when you need more.' },
    ],
  },
};
