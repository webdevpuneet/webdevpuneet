/* SEO page content for the sections added on 2026-10-24 (merged into SECTION_SEO in seo-content.js).
   Same shape as every other entry: keywords, about, 8+ features, 3 reasons, 4 use cases (18-42
   words), 4-5 FAQs and an AI prompt. */

export const NEW_SECTIONS_SEO = {
  'gallery-grid': {
    keywords: ['image gallery html template', 'photo gallery with lightbox', 'filterable gallery html css', 'portfolio gallery section', 'responsive image grid'],
    about: {
      title: 'Filterable Image Gallery — Free Photo Grid With Lightbox',
      description: `**Filterable Image Gallery** is a free photo gallery section for websites that need to show their work, rooms, products or events. A heading sits above a responsive grid of uniform thumbnails; each photo zooms gently on hover, a caption slides up and clicking opens a full-screen viewer. Optional filter buttons let visitors narrow the grid to one category.

**Filters from your own tags**

Give every photo a category and the filter buttons are built for you, with an "All" button first. The buttons appear when the page loads, so a site without JavaScript simply shows every photo. In the editor the filters stay off, so you always see the whole grid while you work, and the label of the "All" button is editable.

**A viewer that works with the keyboard**

Click or press Enter on a photo and it opens large, with the caption, a counter, previous and next buttons and a close button. Escape closes it, the arrow keys move between photos, focus stays inside the viewer while it is open and returns to the photo you opened. Only the photos in the current filter are in the slideshow.

**Responsive and fast**

The grid fills the available width with tiles at least 260 pixels wide and drops to two columns on phones. Photos are cropped to a 4:3 tile, are lazy-loaded and carry alt text you write for each one, which helps accessibility and image search. Add up to 24 photos, uploaded from your device and resized in your browser or pasted as links.

**Export it**

Copy one HTML file, download a ZIP with your images, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). To show a few projects with scroll motion instead, try the [Horizontal Scroll Gallery](/website-section-templates/scroll-gallery/), and to show results use the [Before & After Slider](/website-section-templates/before-after-slider/).`,
    },
    features: [
      'Responsive photo grid with uniform 4:3 tiles and a gentle hover zoom',
      'Filter buttons built from each photo\'s category, with an editable "All" label',
      'Full-screen viewer with captions, a counter, previous and next buttons',
      'Keyboard support: Enter opens, Escape closes, arrow keys move, focus is kept',
      'Caption title and text on hover, switchable on or off',
      'Up to 24 photos with individual alt text for accessibility and image search',
      'Lazy-loaded images; shows every photo when JavaScript is off',
      'Upload photos (resized in your browser) or paste image links',
      'GSAP entrance animation with reduced-motion support',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🖼', title: 'Show more in less space', desc: 'A grid and a viewer let one section hold two dozen photos without a page-long scroll.' },
      { icon: '🎛', title: 'Visitors find what they want', desc: 'Category filters help people jump straight to rooms, events or a type of work.' },
      { icon: '♿', title: 'Accessible by default', desc: 'Alt text per photo, keyboard control and visible focus come built in.' },
    ],
    useCases: [
      { icon: '📷', title: 'Photographer portfolios', desc: 'Group shoots by weddings, portraits and brands, add the location in the caption and let clients browse each category.' },
      { icon: '🏨', title: 'Hotels and venues', desc: 'Show rooms, the pool, dining and events in one filterable gallery so guests can see exactly what they are booking.' },
      { icon: '🍽', title: 'Restaurants and cafés', desc: 'Present dishes, the dining room and the team, with captions naming signature plates and the story behind them.' },
      { icon: '🏗', title: 'Project showcases', desc: 'Build trust with before-shot, in-progress and finished photos of renovation, landscaping or design work, grouped by project type.' },
    ],
    faqs: [
      { q: 'How do the filter buttons work in the Filterable Image Gallery?', a: 'Each photo has a category field. The buttons are created from the different categories you use and hide the photos from other categories. If JavaScript is off, all photos are visible.' },
      { q: 'Can visitors open photos in a larger view?', a: 'Yes. Clicking a photo opens a full-screen viewer with the caption, a counter and arrows, and it can be controlled from the keyboard. In the editor, clicking a photo edits it instead.' },
      { q: 'How many photos can I add to the gallery?', a: 'Up to 24. For a larger archive, use the gallery for your best work and link to a full album or portfolio page.' },
      { q: 'Will the gallery slow my page down?', a: 'Photos are lazy-loaded, and uploaded images are resized in your browser before export. Use photos about 1200 pixels wide for a good balance of sharpness and size.' },
      { q: 'Does the gallery help my images show up in search?', a: 'Descriptive alt text for each photo and a clear caption give search engines context. Write alt text that describes what is in the photo rather than repeating keywords.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Filterable Image Gallery HTML and CSS: connect it to a CMS or JSON list of photos, add pagination, or turn it into a React component that takes an images array.',
      prompt: `Create a responsive filterable image gallery in plain HTML, CSS and JavaScript.

- A heading, then filter buttons built from the data-tag attributes on the photos, with an "All" button first and aria-pressed on the active one.
- A grid using repeat(auto-fill, minmax(260px, 1fr)) with 4:3 tiles, object-fit cover and a hover zoom.
- A caption that slides up on hover.
- A lightbox opened by clicking or pressing Enter on a photo, with previous and next buttons, a counter, Escape to close, arrow-key navigation, a focus trap and focus returned to the opened photo.
- Photos hidden by a filter must be skipped by the lightbox.`,
    },
  },

  'video-section': {
    keywords: ['video section template', 'youtube embed section html', 'click to play video html', 'privacy friendly video embed', 'video poster play button'],
    about: {
      title: 'Video Section With Poster — Free Click-to-Play Embed Template',
      description: `**Video Section With Poster** is a free website section for a product demo, trailer, explainer or customer story. It shows a heading, a large 16:9 poster image with a play button and optional running time, and a row of key points underneath. The video itself is not loaded until the visitor presses play.

**Fast and private by design**

A normal YouTube or Vimeo embed loads scripts, cookies and trackers as soon as the page opens, even if nobody watches. Here only the poster loads. When the visitor presses play, the poster is replaced in place by the player, using YouTube's privacy-enhanced domain or Vimeo's do-not-track mode. That keeps your page quick and your visitors' data to themselves.

**Works with the links you already have**

Paste a YouTube or Vimeo link, or a direct link to an MP4, WebM or Ogg file and the section picks the right player; files play in the browser's own player with controls. Without JavaScript the play button is a normal link that opens the video in a new tab, so it never breaks.

**Structured data for search**

The section writes VideoObject structured data from what you enter: the title, description, poster, running time, publishing date and the embed or file address. Search engines can use it to understand the video. Add the date in year-month-day form, as Google asks for it before it will show video results.

**Key points and style**

Add up to four short points under the video and change the colours, fonts and corner radius to match your brand. Export HTML, a ZIP with images, React or Vue, or fork into [My Code](/ui-snippets/mycode/). To pair it with a call to action, use a [Gradient CTA Banner](/website-section-templates/cta-gradient-banner/).`,
    },
    features: [
      'Large 16:9 poster with a play button and optional running time',
      'Nothing from YouTube or Vimeo loads until the visitor presses play',
      'YouTube privacy-enhanced and Vimeo do-not-track players',
      'Direct MP4, WebM and Ogg files play in the browser player',
      'Play button is a normal link when JavaScript is off',
      'VideoObject structured data built from your fields',
      'Up to four key points under the video',
      'Upload a poster (resized in your browser) or paste an image link',
      'Pulsing play button that respects reduced motion',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '⚡', title: 'Faster pages', desc: 'No third-party scripts until someone presses play, which helps loading speed and Core Web Vitals.' },
      { icon: '🔒', title: 'More private', desc: 'Visitors are not tracked by a video host unless they choose to watch.' },
      { icon: '🔎', title: 'Search-ready', desc: 'Video structured data and a descriptive title help search engines understand the clip.' },
    ],
    useCases: [
      { icon: '🎬', title: 'Product demos', desc: 'Put a two-minute walkthrough under your hero, with three key points that sum up what the visitor will see.' },
      { icon: '🎓', title: 'Course trailers', desc: 'Show a preview lesson or an instructor introduction on a course page, with the length shown on the play button.' },
      { icon: '🎙', title: 'Podcast and webinar pages', desc: 'Offer a highlights clip or a full recording, with the date published and a short summary beside it.' },
      { icon: '🏢', title: 'Agency reels', desc: 'Show a showreel or a customer story with a poster designed to match your brand colours, and the key results listed underneath.' },
    ],
    faqs: [
      { q: 'Which video links does the Video Section support?', a: 'YouTube links (watch, short and embed), Vimeo links and direct .mp4, .webm or .ogg files. Other links still work as a normal link that opens in a new tab.' },
      { q: 'Does the video load before the visitor clicks play?', a: 'No. Only the poster image loads. The player is added to the page when the visitor presses play, which keeps the page fast and avoids tracking by the video host.' },
      { q: 'What happens if JavaScript is turned off?', a: 'The play button is an ordinary link to the video, so visitors can still watch it on the video site. The poster, text and key points are always in the page.' },
      { q: 'Does the section add video structured data?', a: 'Yes. It writes VideoObject JSON-LD from the title, description, poster, length, date and link you enter. Fill in the publishing date so search engines have everything they ask for.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Video Section HTML and CSS: add chapters, support another video host, autoplay muted on scroll, or turn the click-to-play logic into a React component.',
      prompt: `Create a click-to-play video section in plain HTML, CSS and JavaScript.

- A 16:9 box with a poster image and a large circular play button (an anchor with a real video URL as its fallback href).
- On click, prevent the default and replace the poster with an iframe (YouTube via youtube-nocookie.com, Vimeo with dnt=1) or a native video element for mp4/webm files, with autoplay and an accessible title.
- Nothing from the video host may load before the click.
- Below the video, a row of three short key points.
- Include VideoObject JSON-LD with name, description, thumbnailUrl, uploadDate, duration and embedUrl.`,
    },
  },

  'before-after-slider': {
    keywords: ['before and after slider html', 'image comparison slider', 'before after image section', 'compare two images slider', 'transformation results section'],
    about: {
      title: 'Before & After Slider — Free Image Comparison Template',
      description: `**Before & After Slider** is a free results section that lets visitors drag a divider to compare two photos. It is the clearest way to show a haircut, a renovation, a cleaning job, a retouched photograph or any change that is easier to see than to describe. Add up to four comparisons, each with a title and a short caption.

**Simple to build**

Upload a before photo and an after photo with the same size and framing, add alt text for each and write a title and caption. The two images sit on top of each other; the divider reveals more of one or the other as it moves. Before and After labels sit in the corners and you can rename them, for example to "Day 1" and "Day 30".

**Works with mouse, touch and keyboard**

The divider is driven by a real range input, so it works with the mouse, a finger and the arrow keys, announces its value to screen readers and shows a visible focus ring. The label read to assistive technology is editable. Without JavaScript the slider shows a fixed 50% split, so both photos are always visible.

**Layout and motion**

Comparisons sit in a grid that fits two across on wide screens and one on phones. Each card has a rounded frame and a soft shadow, a round handle with arrows, and a heading and caption underneath. The cards stagger in with a GSAP entrance animation, which switches off for visitors who prefer reduced motion.

**Export it**

Copy one HTML file, download a ZIP with the images, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). Show more photos with the [Filterable Image Gallery](/website-section-templates/gallery-grid/), or add proof with a [Case Study Showcase](/website-section-templates/case-study-showcase/).`,
    },
    features: [
      'Draggable divider that reveals the before or the after image',
      'Up to four comparisons in a responsive grid',
      'Works with mouse, touch and the arrow keys through a real range input',
      'Editable Before and After labels and screen-reader label',
      'Alt text for both photos, a title and a caption for each comparison',
      'Shows a fixed 50% split when JavaScript is off',
      'Upload photos (resized in your browser) or paste image links',
      'Rounded frames, soft shadows and a round arrow handle',
      'GSAP entrance animation with reduced-motion support',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '👀', title: 'Show, do not tell', desc: 'People trust results they can drag and compare for themselves.' },
      { icon: '⌨', title: 'Accessible control', desc: 'A native range input gives keyboard support and screen-reader labels with no extra work.' },
      { icon: '🧱', title: 'Safe without scripts', desc: 'The default split keeps both photos visible, so the section never looks broken.' },
    ],
    useCases: [
      { icon: '💇', title: 'Salons and beauty', desc: 'Show a cut, colour or treatment result with consent from the client, and add the stylist and the time it took to the caption.' },
      { icon: '🏠', title: 'Renovation and design', desc: 'Compare a room before and after the work, with a caption listing what changed, the timescale and the materials used.' },
      { icon: '🧼', title: 'Cleaning and restoration', desc: 'Prove the difference your service makes on carpets, kitchens, exteriors or vehicles with matching photos from the same angle.' },
      { icon: '🏋', title: 'Fitness and coaching', desc: 'Share progress over time with day-one and day-ninety photos, labelled with the programme name, wherever the client has agreed to it.' },
    ],
    faqs: [
      { q: 'How do I make a before and after slider work well?', a: 'Use two photos with the same size, framing and lighting, so the only difference is the result. Aim for about 1200 by 800 pixels and write alt text that describes each photo.' },
      { q: 'Does the Before & After Slider work on phones?', a: 'Yes. The divider can be dragged with a finger, and the grid moves from two comparisons across to one. Vertical scrolling still works when you swipe outside the handle.' },
      { q: 'Can I change the labels from Before and After?', a: 'Yes. Edit both labels, for example to "Day 1" and "Day 30" or "Old" and "New", and edit the screen-reader label for the slider as well.' },
      { q: 'Can I show more than one comparison?', a: 'Yes, up to four. Each has its own pair of photos, title and caption, and they sit in a grid that stacks on narrow screens.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Before & After Slider HTML and CSS: add touch-only dragging with pointer events, a vertical divider, auto-play on scroll or a React component with props.',
      prompt: `Create a before and after image comparison slider in plain HTML, CSS and JavaScript.

- Two stacked images of the same size; the "before" image is clipped with clip-path: inset(0 calc(100% - var(--pos)) 0 0).
- A visible handle at left: var(--pos) with a round knob and arrow icon.
- A transparent input type=range covering the area, with an aria-label, that updates --pos on input so mouse, touch and keyboard all work.
- Before and After labels in the corners.
- Without JavaScript the default is a 50% split. Respect prefers-reduced-motion.`,
    },
  },

  'pricing-comparison': {
    keywords: ['pricing comparison table html', 'plan comparison table template', 'saas pricing table with features', 'feature comparison matrix', 'compare plans section'],
    about: {
      title: 'Pricing Comparison Table — Free Plan Matrix Template',
      description: `**Pricing Comparison Table** is a free section for the question every pricing page gets: what exactly is the difference between the plans? Three plans sit side by side at the top with their name, price and button, and below them the features are listed row by row with a tick, a dash or a short limit for each plan.

**Built for scanning**

One plan can be highlighted with a badge such as "Most popular", which gives it a tinted column and a brand-coloured top edge. Feature rows are grouped under small sub-headings, such as Core, Features and Support, and each row lights up gently on hover so the eye can follow it across. The first column holds the feature names and stays in view on small screens.

**Plain text cells**

Each cell is a text field, so you are not limited to ticks. Use a tick (✓) for included, a dash (—) for not included, or a limit such as "10 GB", "Unlimited" or "Advanced + export". To make a heading row, fill in the group heading; to remove a row, delete it. There is room for up to thirty rows.

**Accessible and responsive**

The table uses table, row, column header and cell roles so screen readers announce the plan for every value. On narrow screens the table scrolls sideways inside a keyboard-focusable region instead of squashing. Each plan has its own button with its own link.

**Export it**

Copy one HTML file, download a ZIP, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). Put it under the plan cards of [Three-Tier Pricing](/website-section-templates/pricing-three-tier/), or beside [Pricing List Rows](/website-section-templates/pricing-rows/) for services.`,
    },
    features: [
      'Three plans in a header row with name, price, price note and a button',
      'One plan highlighted with a badge, a tinted column and a brand edge',
      'Feature rows with ticks, dashes or short limits in every cell',
      'Group headings to organise up to thirty rows',
      'First column stays in view while the table scrolls sideways on phones',
      'Row hover highlight that follows across the plans',
      'Accessible table, row, column header and cell roles',
      'Keyboard-focusable scroll region on narrow screens',
      'Editable heading, intro, first-column heading and footnote',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '⚖', title: 'Answers the real question', desc: 'Buyers compare features before they choose a plan; a matrix does it for them.' },
      { icon: '📱', title: 'Readable on phones', desc: 'A sticky first column and sideways scroll keep a wide table usable on a small screen.' },
      { icon: '✍', title: 'Any kind of cell', desc: 'Ticks, dashes, numbers and short text all work, so it fits any product.' },
    ],
    useCases: [
      { icon: '💻', title: 'SaaS pricing pages', desc: 'List limits for projects, seats and storage, then the features that unlock on each plan, with the popular plan highlighted.' },
      { icon: '🌐', title: 'Hosting and domains', desc: 'Compare storage, bandwidth, sites and support across plans, so customers can pick the right one without opening a support ticket first.' },
      { icon: '🎟', title: 'Memberships', desc: 'Show what basic, plus and premium members get, from event access to discounts and priority booking, in one clear matrix.' },
      { icon: '📚', title: 'Courses and training', desc: 'Compare self-paced, cohort and one-to-one options by number of lessons, live sessions, personal feedback and certificates, side by side.' },
    ],
    faqs: [
      { q: 'How many plans can the Pricing Comparison Table show?', a: 'Three plans side by side, which keeps every column readable. For more options, use Pricing List Rows or split the plans across two tables.' },
      { q: 'Can I show ticks, crosses and numbers in the cells?', a: 'Yes. Every cell is plain text, so type a tick (✓), a dash (—), or a limit such as "50 GB" or "Unlimited".' },
      { q: 'How do I add group headings like Features and Support?', a: 'Add a row and fill in its group heading field. That row becomes a full-width heading and its other fields are ignored.' },
      { q: 'Does the table work on small screens?', a: 'Yes. On narrow screens the table scrolls sideways inside a region you can reach with the keyboard, and the feature names stay fixed on the left while you scroll.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Pricing Comparison Table HTML and CSS: add a monthly and yearly toggle, a fourth plan, collapsible groups or a React component fed by a plans array.',
      prompt: `Create a pricing comparison table in plain HTML and CSS with three plans.

- A header row: an empty first cell labelled "Features", then three plan cells each with a name, price, price note and a button; the middle plan has a "Most popular" badge, a tinted background and a coloured top edge.
- Feature rows below, with group heading rows spanning the table, and cells containing a tick, a dash or a short limit.
- Use role=table, row, columnheader, rowheader and cell, a sticky first column and a horizontally scrollable wrapper with tabindex=0 under 720px.`,
    },
  },

  'booking-form': {
    keywords: ['booking form html template', 'appointment request form', 'book an appointment section', 'reservation form with date and time', 'contact form with service select'],
    about: {
      title: 'Booking Request Form — Free Appointment Section Template',
      description: `**Booking Request Form** is a free section for businesses that take appointments: salons, clinics, dentists, therapists, restaurants, tutors and consultants. Visitors choose a service, a preferred day and a time slot, add their details and a note, and you receive the request by email through your form service.

**Everything a request needs**

The form has name, email and optional phone fields, a menu of your services, a date picker, a menu of time slots and a notes box. Services and time slots are editable lists, so you can offer "First consultation", "Colour" or "Table for two" and time slots such as Morning or 6:00 pm. The date picker cannot be set to a day in the past.

**Opening hours and reassurance**

Beside the form, a heading, a short opening-hours list and a "what to expect" list answer the questions people have before they book: when you are open, what the first visit involves and your cancellation terms. Both lists are editable and can be left empty.

**A request, not a live calendar**

This section collects requests; it does not check availability or hold a slot. Say so in the note under the button, as the template does, and confirm by email or phone. For a live calendar, link a button to a booking tool instead. The form posts to Formspree, Basin, Getform or any endpoint you set, and shows a friendly success or error message without leaving the page.

**Export it**

Copy one HTML file, download a ZIP, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For a general enquiry form, use [Contact Form With Details](/website-section-templates/contact-split-form/), and add directions with [Contact With Map](/website-section-templates/contact-map/).`,
    },
    features: [
      'Appointment request form with name, email, optional phone and notes',
      'Service menu built from an editable list',
      'Date picker that blocks days in the past',
      'Time-slot menu built from an editable list',
      'Opening hours list and a "what to expect" checklist beside the form',
      'Sends to Formspree, Basin, Getform or any form endpoint',
      'Animated success and error messages, with a hidden spam trap field',
      'Every label, button and message is editable',
      'Two-column layout that stacks on tablets and phones',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '📅', title: 'Fewer back-and-forth emails', desc: 'Collecting the service, day and time up front saves the first round of questions.' },
      { icon: '🧩', title: 'Fits any appointment business', desc: 'Services and time slots are lists you rename, so it suits salons, clinics, restaurants and tutors alike.' },
      { icon: '🔌', title: 'No backend needed', desc: 'The form posts to a form service you already use, so there is nothing to host.' },
    ],
    useCases: [
      { icon: '💈', title: 'Salons and barbers', desc: 'Let clients request a service and a morning or evening slot, with the opening hours and cancellation terms in view.' },
      { icon: '🦷', title: 'Clinics and therapists', desc: 'Collect a first appointment request with a service type and notes, then confirm the time by phone or email and send reminders.' },
      { icon: '🍝', title: 'Restaurants and venues', desc: 'Take table, tasting or tour requests with a preferred day and time, then reply to confirm the booking and note any dietary needs.' },
      { icon: '🎓', title: 'Tutors and consultants', desc: 'Offer trial lessons or discovery calls and let people choose a time that suits them before you follow up.' },
    ],
    faqs: [
      { q: 'Does the Booking Request Form check availability?', a: 'No. It sends you a request with the visitor\'s preferred day and time, and you confirm by email or phone. For live availability, link a button to a booking tool such as Calendly.' },
      { q: 'Where do the booking requests go?', a: 'To the form service you set in the Form URL field, such as Formspree, Basin or Getform. They email you each request with every field the visitor filled in.' },
      { q: 'Can I change the services and time slots?', a: 'Yes. Both are editable lists: add, rename, reorder or remove items, and the menus in the form update to match.' },
      { q: 'Can I stop people choosing a past date?', a: 'The date picker is limited to today and later automatically, in the exported page, using the visitor\'s own date.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Booking Request Form HTML and CSS: add available-slot logic, a multi-step flow, a calendar widget or a React component with controlled fields.',
      prompt: `Create an appointment request section in plain HTML, CSS and JavaScript.

- Left column: heading, intro, a definition list of opening hours and a short checklist of what to expect.
- Right column: a card with a form that has name, email, optional phone, a service select, a date input (min set to today in JavaScript), a time-slot select and a notes textarea.
- Submit with fetch to the form action as JSON, disable the button while sending, then show a success message or an error message.
- Include a hidden honeypot field and clear labels on every input.`,
    },
  },

  'case-study-showcase': {
    keywords: ['case study section template', 'results section with metrics', 'customer story section html', 'project showcase section', 'case study cards html'],
    about: {
      title: 'Case Study Showcase — Free Results & Metrics Template',
      description: `**Case Study Showcase** is a free section for showing proof rather than claiming it. Each case study is a wide card with a project image beside the client name, an industry tag, a headline that states the result, a short summary, up to three headline numbers, a client quote and a link to the full story.

**Lead with the result**

The headline field supports a highlight, so "How a new website *doubled trial sign-ups*" colours the outcome with your brand colour. Under it, three large metrics, such as +118% sign-ups or $1.2M extra revenue, give the evidence at a glance. Leave a metric empty and it disappears, so a case study with one strong number looks as intended.

**A real voice**

The optional quote block shows the client's words, their name and their role in a quiet side-bar style. A quote from a named person at the client carries far more weight than a general testimonial, and it works as social proof for the visitor who only reads the card.

**Layout for one or several**

Add up to four case studies. The image and text swap sides on every other card, so a longer list feels varied, and on tablets and phones each card stacks with the image on top. Each case study has its own image, alt text and link, which you can point at a full write-up on your site.

**Export it**

Copy one HTML file, download a ZIP with your images, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For short quotes use [Testimonials Grid](/website-section-templates/testimonials-grid/), and add numbers with [Animated Stats Counters](/website-section-templates/stats-counters/).`,
    },
    features: [
      'Wide case-study card with a project image, client and industry tag',
      'Result headline with a brand-colour highlight',
      'Short summary and up to three large key metrics',
      'Optional client quote with name and role',
      'Link to the full case study on every card',
      'Up to four case studies, alternating image sides',
      'Stacks cleanly on tablets and phones',
      'Upload images (resized in your browser) or paste links',
      'GSAP entrance animation with reduced-motion support',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '📈', title: 'Proof beats promises', desc: 'Specific numbers from named clients are more convincing than adjectives about your work.' },
      { icon: '🔗', title: 'Feeds your deeper pages', desc: 'Each card links to the full story, which gives your best content more visits.' },
      { icon: '🎯', title: 'Easy to scan', desc: 'Headline, numbers and quote give three ways in for visitors who skim.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Agencies and studios', desc: 'Showcase three flagship projects with the brief, the result and a quote from the person who hired you.' },
      { icon: '💼', title: 'Consultants and coaches', desc: 'Show how clients changed, with before and after numbers and a short quote, and link each story to a longer write-up on your site.' },
      { icon: '☁', title: 'SaaS customer stories', desc: 'Turn customer wins into cards with time saved, revenue gained or tickets reduced, ready for your homepage or pricing page.' },
      { icon: '🏗', title: 'Builders and installers', desc: 'Present finished projects with the size, the timescale and the homeowner’s comment, linked to a photo gallery of the completed work.' },
    ],
    faqs: [
      { q: 'What should I put in a case study card?', a: 'The client, the result in the headline, a two-sentence summary, one to three real numbers and a short quote. Link to the full story for readers who want the detail.' },
      { q: 'Do I have to include three metrics?', a: 'No. Fill in as many as you have, from one to three. Empty metrics are hidden, so the card never shows blank gaps.' },
      { q: 'Can I show several case studies in one section?', a: 'Yes, up to four. The image swaps sides on every other card, and you can add, duplicate and reorder them.' },
      { q: 'Is the client quote required?', a: 'No. Leave the quote empty and the quote block disappears. If you add one, include the person\'s name and role so it reads as genuine.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Case Study Showcase HTML and CSS: load cases from a CMS, add filters by industry, animate the numbers counting up, or build a React component from a cases array.',
      prompt: `Create a case study section in plain HTML and CSS.

- A list of wide cards in a two-column grid: a cover image on one side and content on the other, swapping sides on every second card, stacking under 860px.
- Content: client name and an industry pill, an h3 headline with one highlighted phrase, a short paragraph, a definition list of up to three large metrics, an optional blockquote with a caption, and a "read the full case study" link.
- Hide any metric or quote that has no content.`,
    },
  },

  'privacy-policy': {
    keywords: ['privacy policy page template', 'terms and conditions page html', 'legal page template with table of contents', 'long text page template', 'cookie policy page html'],
    about: {
      title: 'Legal & Long-Form Text Page — Free Policy Template',
      description: `**Legal & Long-Form Text Page** is a free layout for the pages every website needs and nobody enjoys building: privacy policy, terms of service, cookie policy, accessibility statement, help articles and long guides. It focuses on one thing, being easy to read.

**Readable by design**

A large title, a last-updated date and an introduction open the page. The body is a column of numbered sections about 760 pixels wide, with generous line height, clear headings and optional bullet lists. Each section has a heading, paragraphs (leave a blank line between them) and an optional list of points, one per line.

**An automatic table of contents**

On wide screens a contents list sticks to the left and highlights the section you are reading; click a heading to jump to it. The list is built in the browser from your section headings, and each section gets a link-friendly address, so you never maintain it by hand. On tablets and phones it moves above the text, and without JavaScript the page still reads as numbered sections.

**A contact box and your wording**

A box at the end invites questions, with a heading and text you control, and it can be switched off. Replace the sample text with your own: this is a layout, not legal advice, and a policy must describe what your business actually does, so have a qualified person check it before you publish.

**Export it**

Copy one HTML file, download a ZIP, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). In the Website Builder, add it as a Privacy or Terms page and link it from the [footer](/website-section-templates/category/footer/) of every page.`,
    },
    features: [
      'Large title with an optional last-updated date and introduction',
      'Numbered sections with a heading, paragraphs and an optional bullet list',
      'Table of contents built automatically from the section headings',
      'Sticky contents list that highlights the section being read',
      'Comfortable reading width of about 760 pixels',
      'Contact box at the end, switchable on or off',
      'Contents move above the text on tablets and phones',
      'Plain numbered sections when JavaScript is off',
      'Up to twenty sections, with add, duplicate and reorder',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '📖', title: 'Easy to read', desc: 'A narrow column, clear numbering and generous spacing make long text approachable.' },
      { icon: '🧭', title: 'Easy to navigate', desc: 'The automatic contents list helps readers find the section they came for.' },
      { icon: '🏁', title: 'Completes your site', desc: 'Every multi-page site needs privacy and terms pages; this is a ready layout for them.' },
    ],
    useCases: [
      { icon: '🔐', title: 'Privacy and cookie policies', desc: 'Set out what you collect, why and how people can exercise their rights, in numbered sections linked from your footer.' },
      { icon: '📄', title: 'Terms of service', desc: 'Lay out your rules, payments and refunds in clear sections so customers and your own team can find the answer quickly.' },
      { icon: '🛟', title: 'Help and policy pages', desc: 'Publish delivery, returns, accessibility and security statements in a consistent format across your whole site, linked from the footer.' },
      { icon: '📝', title: 'Long articles and guides', desc: 'Present an in-depth guide with a table of contents and numbered sections that readers can bookmark, share and come back to later.' },
    ],
    faqs: [
      { q: 'Is this template legal advice or a ready-made privacy policy?', a: 'No. It is a page layout with sample wording. A policy has to describe what your business does with data, so replace the text and have a qualified person review it before you publish.' },
      { q: 'How does the table of contents work?', a: 'It is created in the browser from your section headings, with a link and an address for each section. It highlights the section being read, and without JavaScript the page still shows the sections in order.' },
      { q: 'How do I add paragraphs and bullet lists to a section?', a: 'Type paragraphs in the text field with a blank line between them, and put list items one per line in the bullet list field. Select text to make it bold or add a link.' },
      { q: 'Can I use it for articles as well as legal pages?', a: 'Yes. Rename the sections, remove the contact box if you do not need it and use the intro for a summary. It suits help articles, guides and long-form write-ups.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Legal & Long-Form Text Page HTML and CSS: draft the sections for your product (then have a lawyer review them), add a print stylesheet, or build a React component from a sections array.',
      prompt: `Create a long-form text page layout in plain HTML, CSS and JavaScript.

- A two-column layout: a sticky table of contents on the left and an article column (max 760px) on the right; stack under 860px.
- The article has an h1, a last-updated line, an intro and numbered sections (CSS counters) each with an h2, paragraphs and an optional bullet list, then a contact box.
- JavaScript builds the contents list from the h2 elements, gives each section a unique id, and marks the section in view with an IntersectionObserver.
- Content must be fully readable without JavaScript.`,
    },
  },

  'product-grid': {
    keywords: ['product grid html template', 'ecommerce product cards', 'product listing section', 'shop section template', 'product card with sale price'],
    about: {
      title: 'Product Grid — Free E-commerce Product Cards Template',
      description: `**Product Grid** is a free section for showing products on a landing page, a shop front or any site that sells something. A heading with a "shop everything" link sits above a grid of cards; each card has a product photo, an optional badge, the name, a short line, the price, an optional old price crossed out, a star rating and a button.

**Cards that sell**

The photo is a 4:5 portrait frame that zooms gently on hover, with a badge such as "New", "Best seller" or "-20%" in the corner. Under it the name links to the product page, the price is large and clear, and the old price sits beside it crossed out when an item is on sale. A rating with the number of reviews adds trust, and a button sends people to your product page or checkout.

**Built for search**

The section writes Product structured data for every card: name, description, image, price, currency, availability and, when you enter a rating and a review count, an aggregate rating. Write prices with a symbol and a number, such as $49 or £35.50, so the currency can be read. The structured data helps search engines understand your catalogue; whether rich results appear is up to them.

**A showcase, not a shopping cart**

This section displays products and links out. Point each button at a checkout link from Shopify, Stripe, Gumroad or your own store. Add up to twelve products, and the grid goes from four columns to three, two and one as the space gets narrower.

**Export it**

Copy one HTML file, download a ZIP with your product photos, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). Pair it with a [Pricing Comparison Table](/website-section-templates/pricing-comparison/) for subscription plans, or add proof with [Testimonials Grid](/website-section-templates/testimonials-grid/).`,
    },
    features: [
      'Responsive grid of up to twelve product cards, four columns down to one',
      '4:5 product photo with hover zoom and an optional corner badge',
      'Name, short description, price and crossed-out old price',
      'Star rating with a review count',
      'Buy or view button linking to your own checkout or product page',
      'Product structured data with price, currency, availability and ratings',
      'Heading with a "shop everything" link',
      'Upload product photos (resized in your browser) or paste image links',
      'GSAP entrance animation with reduced-motion support',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🛍', title: 'Shop window for any site', desc: 'Show best sellers, new arrivals or merchandise without building a whole store.' },
      { icon: '🔗', title: 'Works with your checkout', desc: 'Every card links to the product page or payment link you already use.' },
      { icon: '🔎', title: 'Search-ready', desc: 'Product data for each card gives search engines the price, rating and availability.' },
    ],
    useCases: [
      { icon: '🏬', title: 'Online store homepages', desc: 'Feature this season\'s best sellers and new arrivals under the hero, with sale prices and badges that show what is on offer.' },
      { icon: '🎧', title: 'Product launch pages', desc: 'Show the main product and its accessories side by side, each with a price and a button to the checkout.' },
      { icon: '🖼', title: 'Prints, books and merchandise', desc: 'Let photographers, authors, podcasters and creators sell prints, books or merch from their own site with links to a store.' },
      { icon: '💈', title: 'Salons, cafés and studios', desc: 'Display the retail products you stock, such as shampoo, coffee beans or gift cards, with prices and a reserve link.' },
    ],
    faqs: [
      { q: 'Can I take payments with the Product Grid?', a: 'No. It displays products and links out. Point each button at a checkout or payment link from a store platform such as Shopify, Stripe or Gumroad, which handles payment securely.' },
      { q: 'How do I show a sale price in the Product Grid?', a: 'Enter the sale price in the Price field and the original price in Old price. The old price appears crossed out beside it, and you can add a badge such as -20%.' },
      { q: 'Does the Product Grid add product structured data?', a: 'Yes. It writes Product data for each card with the name, image, description, price, currency and availability, plus a rating when you enter one with a review count.' },
      { q: 'How many products can I show?', a: 'Up to twelve. For a bigger catalogue, show your best sellers here and link to your full shop with the heading link.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Product Grid HTML and CSS: add a quick-view modal, a size or colour selector, a wishlist heart or a React component that renders cards from a products array.',
      prompt: `Create a responsive product grid in plain HTML and CSS.

- A heading row with a title and a "Shop everything" link, then a list of product cards in a four-column grid that becomes 3, 2 and 1 columns as the container narrows.
- Each card: a 4:5 image with hover zoom and an optional badge, a linked product name, a one-line description, a star rating with review count, the price with an optional crossed-out old price, and a full-width button.
- Add Product JSON-LD (name, image, description, offers with price and priceCurrency, aggregateRating) for each card.`,
    },
  },

  'custom-section': {
    keywords: ['custom section builder', 'multi column layout builder', 'html css section builder', 'custom html section template', 'website section layout editor'],
    about: {
      title: 'Custom Section Builder — Free Rows, Columns and HTML Editor',
      description: `**Custom Section** is a free section builder for the layouts the ready-made templates do not cover. You start with an empty canvas of rows and columns, add blocks to each column, and see the result as you type, at desktop, tablet and phone widths. There is no code to write unless you want to, and no account to create.

**Rows and columns**

Each row has one to four columns, with nine layouts to choose from: equal columns, a narrow column beside a wide one, a wide middle, and a left or right sidebar. Set the gap, how the columns line up (top, middle, bottom or stretched), and whether they stack on tablets, on phones only, or never. Reverse the order when stacked so an image can come first on small screens.

**Blocks for everything**

Fill a column with a small label, a heading (H1 to H4, so your page outline stays correct), a paragraph, an image, a button, a list, a spacer, a divider or an HTML embed for forms, maps and widgets. Click any text in the preview to edit it in place. Left, centre or right alignment can be set for the whole section, a column or a single block, with margins and padding in pixels.

**Your theme, your code**

Colours, fonts and corner radius follow the theme you share with every other section, and the same entrance animations and scroll effects apply. When you need more, add custom CSS scoped to this section only and your own JavaScript, which run in the exported page.

**Save, reuse and export**

Save a layout to My designs, add it to any page in the [Website Builder](/website-builder/), or export HTML, a ZIP with your images, React or Vue. For ready-made starting points, browse the [hero sections](/website-section-templates/category/hero/) and [feature sections](/website-section-templates/category/features/).`,
    },
    features: [
      'Rows of one to four columns with nine layouts, including sidebars',
      'Blocks for labels, headings, paragraphs, images, buttons, lists, spacers, dividers and HTML',
      'Left, centre or right alignment for the section, each column and each block',
      'Margins, padding, row gaps and column gaps set in pixels',
      'Control when columns stack, and reverse their order on small screens',
      'Headings with a choice of H1 to H4 tags and four sizes',
      'Click any text in the preview to edit it in place',
      'HTML embed blocks for forms, maps, videos and third-party widgets',
      'Custom CSS scoped to this section and your own JavaScript',
      'Uses your theme and animations, saves to My designs and exports HTML, React or Vue',
    ],
    why: [
      { icon: '🧩', title: 'Fits any layout', desc: 'Combine rows, columns and blocks to build the exact section you have in mind, instead of bending a template to fit.' },
      { icon: '🎯', title: 'No code needed', desc: 'Build visually with controls for alignment and spacing, and reach for HTML, CSS or JavaScript only when you want to.' },
      { icon: '🔁', title: 'Consistent and reusable', desc: 'The section follows your theme and animations, can be saved, and drops into any page or export.' },
    ],
    useCases: [
      { icon: '🗂', title: 'Unusual page layouts', desc: 'Build a section with a sidebar, a wide middle column or an image that sits beside a list and two buttons, when no template matches.' },
      { icon: '🔌', title: 'Forms, maps and widgets', desc: 'Drop an HTML embed into a column for a booking form, a map or a review widget, and style the space around it.' },
      { icon: '📝', title: 'Simple content pages', desc: 'Assemble about, terms or announcement pages from headings, paragraphs, lists and images, then publish them on any host without touching a code editor.' },
      { icon: '🎨', title: 'Landing page experiments', desc: 'Try a new arrangement of copy, proof and a call to action, then save the layout and reuse it across your pages.' },
    ],
    faqs: [
      { q: 'What is a custom section?', a: 'A section you lay out yourself. You add rows with one to four columns, put blocks such as headings, text, images and buttons in each column, and set alignment and spacing.' },
      { q: 'Can I add my own HTML, CSS and JavaScript?', a: 'Yes. HTML embed blocks take any markup, custom CSS is scoped to this section, and custom JavaScript runs in your exported page. Scripts do not run in the editor preview, for safety.' },
      { q: 'How do I align content left, centre or right?', a: 'Set an alignment for the whole section, then override it for a column or a single block. Buttons placed together in a column line up as a group.' },
      { q: 'Will my layout work on phones?', a: 'Yes. Columns stack on tablets and phones by default, you can choose when they stack, and you can reverse their order so an image appears first on small screens.' },
      { q: 'Can I reuse a custom section on other pages?', a: 'Yes. Save it to My designs, then add it to any page from the Website Builder, where it appears in the Add a section dialog next to the ready-made sections.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Custom Section HTML and CSS: add a new column layout, a tabs block, a sticky sidebar or a different stacking breakpoint, or turn it into a React component.',
      prompt: `Create a flexible content section in plain HTML and CSS.

- A centred container with a maximum width and responsive side padding, holding several rows.
- Each row is a CSS grid with one to four columns set by a variable such as --cs-cols: 1fr 2fr, a configurable gap, and vertical alignment options (start, center, end, stretch).
- Columns stack into a single column below 900px, with an option to reverse the order when stacked.
- Inside columns: an eyebrow label, headings (h2 and h3), paragraphs, images with alt text, button links in a row, a list with check marks, a spacer and a divider.
- Support left, centre and right alignment at section, column and block level.
- Use CSS custom properties for colours, fonts and radius, and respect prefers-reduced-motion.`,
    },
  },

  'popup-modal': {
    keywords: ['popup builder html', 'exit intent popup', 'timed popup html css', 'promo modal template', 'newsletter popup with email form'],
    about: {
      title: 'Popup & Promo Modal — Free Exit-Intent and Timed Popup Template',
      description: `**Popup & Promo Modal** is a free popup for websites that need to make an offer at the right moment. It opens by itself after a delay you choose, when a visitor moves to leave the page (exit intent) or after they scroll part of the way down, and it takes no space in your layout.

**Centre modal or quiet promo card**

Show it in the middle of the screen with a dimmed page for a sign-up or an offer you really want seen, or as a small card in the bottom right, bottom left, bottom centre, top right or top left with no overlay. Visitors keep browsing around the card and close it with the × button. On phones the card stretches neatly across the screen.

**Everything a promotion needs**

Add a label, a heading and a short text, then an image, an image carousel with arrows and dots, or a click-to-play video that loads nothing from YouTube or Vimeo until it is played. Add an email form that posts to Mailchimp, Kit or any service, up to two call-to-action buttons, a "no thanks" link, or your own HTML for anything else.

**Polite by design**

A visitor who closes it is left alone for the number of days you set, or you can show it on every visit. The popup closes with Esc, keeps keyboard focus inside when it dims the page, announces itself to screen readers and respects reduced motion.

**Edit, save and export**

Click any text or image in the preview to change it, then match the colours, fonts and corner radius to your brand. Export HTML, a ZIP with your images, React or Vue, or add it to a page in the [Website Builder](/website-builder/). For the form it works with, see the [Newsletter Signup CTA](/website-section-templates/cta-newsletter/).`,
    },
    features: [
      'Opens after a delay, on exit intent or after scrolling part of the page',
      'Centre modal with a dimmed page, or a promo card in any corner or along the bottom or top edge',
      'Small cards have no overlay, so visitors keep browsing and close them with ×',
      'Image, image carousel or a click-to-play video that loads only when played',
      'Email form that posts to Mailchimp, Kit or any service, with success and error messages',
      'Up to two call-to-action buttons and an optional "no thanks" link',
      'Custom HTML area for embeds, badges or anything else',
      'Shows again only after the number of days you set, or on every visit',
      'Closes with ×, Esc or a click outside, with keyboard focus kept inside the dimmed modal',
      'Takes no space in the layout; export HTML, React or Vue',
    ],
    why: [
      { icon: '🎯', title: 'Right moment, right place', desc: 'Pick the trigger that fits the offer, such as a delay for a promotion or exit intent for a last chance.' },
      { icon: '🙂', title: 'Visitor friendly', desc: 'Corner cards never block the page, a closed popup stays away for days, and everything works from the keyboard.' },
      { icon: '⚡', title: 'Light and private', desc: 'No third-party popup script, and a video loads nothing from its host until someone presses play.' },
    ],
    useCases: [
      { icon: '✉️', title: 'Newsletter and discount sign-ups', desc: 'Offer a first-order discount or a free guide in return for an email address, shown after a short delay or as the visitor leaves.' },
      { icon: '🛒', title: 'Shop and sale promotions', desc: 'Announce a sale or a new range with a corner card and a carousel of products, with two buttons to shop or learn more.' },
      { icon: '🎥', title: 'Webinar and event invites', desc: 'Invite readers to a workshop with a short video and a sign-up button, shown after they have scrolled halfway down an article.' },
      { icon: '📢', title: 'Announcements and notices', desc: 'Tell visitors about opening hours, a launch or a policy change in a quiet card that they can dismiss and not see again for a week.' },
    ],
    faqs: [
      { q: 'What is an exit-intent popup?', a: 'A popup that opens when a visitor moves the mouse towards the top of the window, as if to leave. It is a last chance to make an offer. Phones have no mouse, so it opens after a delay there.' },
      { q: 'Can the popup open after a few seconds?', a: 'Yes. Choose "After some time" and set the delay in seconds. You can also open it after the visitor scrolls a share of the page, for example halfway down an article.' },
      { q: 'Will a popup annoy visitors or hurt SEO?', a: 'Keep it relevant and easy to close. This one has a clear × button, stays away for the days you set once shown, and takes no space in the layout. Corner cards do not cover the page at all.' },
      { q: 'Can I put a video or my own HTML in the popup?', a: 'Yes. Add a click-to-play video that loads nothing until it is played, an image carousel, or your own HTML for embeds and extra content.' },
      { q: 'Does the email form work with Mailchimp or Kit?', a: 'Yes. Paste the form action URL and the field name from your email service. The visitor sees a success message, or an error message if the sending fails.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Popup HTML, CSS and JavaScript: add a countdown, a cookie-style remember rule, another trigger such as inactivity, or turn it into a React component.',
      prompt: `Create a promotional popup in plain HTML, CSS and JavaScript.

- A fixed dialog with role="dialog", a close button, an image on the left, a heading, a short text, an email form and a "no thanks" link.
- A data-trigger setting with three options: after N seconds, exit intent (mouseout with clientY <= 0 and no relatedTarget, desktop only), and after scrolling a given percentage of the page.
- A data-pos setting: centre with a dimmed backdrop, or a small card in the bottom right with no backdrop.
- Close with the button, Esc and a click on the backdrop; for the centre popup trap focus inside and return it on close.
- Remember a close in localStorage and do not show again for 7 days, wrapped in try/catch.
- Fade and slide in with CSS transitions and respect prefers-reduced-motion.`,
    },
  },

  'floating-social-share': {
    keywords: ['social share buttons html', 'floating social share bar', 'sticky social share sidebar', 'social media share buttons css', 'share buttons without plugin'],
    about: {
      title: 'Floating Social Share Bar — Free Sticky Share Buttons Template',
      description: `**Floating Social Share Bar** is a free set of social share buttons that float at the edge of the screen and take no space in your layout. The buttons stack in a column on the left or right, centred or at any height you choose, and each one opens the network's own share window in a new tab with your page address and title already filled in.

**Share the right page, every time**

You do not have to type an address for each page. Leave the address empty and the bar reads the page the visitor is on, and the page title for the post. Fill them in to always share one fixed page. The Pinterest button picks up your social image, and the X button can add your username and hashtags.

**Popular networks, one list**

Add or remove buttons from a list of fourteen: Facebook, X, LinkedIn, WhatsApp, Telegram, Pinterest, Reddit, Threads, Bluesky, Tumblr, Hacker News, LINE, email and copy link. Reorder or rename them and pick network colours, your brand colour or a subtle style.

**Out of the way when wanted**

Visitors can collapse the bar into a small tab on the edge and bring it back with one click, and you can start it collapsed. On phones it becomes a bottom bar, or a small side stack if you prefer, so it never covers your text.

**Accessible and fast**

Every button is a real link or button with a label that says what it does and that it opens a new tab. The bar works with a keyboard and respects reduced motion. Export HTML, a ZIP, React or Vue, or fork it into [My Code](/ui-snippets/mycode/). To invite readers further, pair it with a [Newsletter CTA](/website-section-templates/cta-newsletter/).`,
    },
    features: [
      'Floats on the left or right edge and takes no space in the layout',
      'Stacked buttons centred on the screen or at any distance from the top',
      'Fourteen networks: Facebook, X, WhatsApp, LinkedIn, Telegram, Pinterest and more',
      'Add, remove, reorder and rename buttons from a simple list',
      'Shares the current page address and title automatically',
      'Every share link opens in a new tab with safe link settings',
      'Copy-link button with a confirmation',
      'Collapses to a small tab and comes back with one click, with an option to start collapsed',
      'Bottom bar or small side stack on phones, smaller buttons on tablets',
      'Network colours, theme colour or subtle style in attached, rounded or round shapes',
    ],
    why: [
      { icon: '🪶', title: 'No layout cost', desc: 'The bar floats above the page, so adding it never moves your content or changes your spacing.' },
      { icon: '🔐', title: 'No tracking', desc: 'Plain links to each network, with no third-party share script, cookies or counters loading on your page.' },
      { icon: '📲', title: 'Works on every screen', desc: 'A side stack on desktop, a compact one on tablets and a bottom bar on phones, all reachable by touch and keyboard.' },
    ],
    useCases: [
      { icon: '📰', title: 'Blogs and news sites', desc: 'Keep share buttons beside a long article so readers can post it the moment they finish, without scrolling back to the top.' },
      { icon: '🛍', title: 'Product and landing pages', desc: 'Let visitors send a product or offer to a friend on WhatsApp or by email, while the buttons stay out of the design.' },
      { icon: '🎓', title: 'Courses and resources', desc: 'Make guides, templates and lesson pages easy to share with a team or class, with copy link for chat and email.' },
      { icon: '📅', title: 'Events and campaigns', desc: 'Encourage guests to spread the word about a launch, webinar or fundraiser with the networks your audience uses most.' },
    ],
    faqs: [
      { q: 'Do share buttons slow my website down?', a: 'Not these. They are plain links and one small script. There are no network widgets, tracking scripts or extra images, so the page loads as fast as before.' },
      { q: 'How do the buttons know which page to share?', a: 'The bar reads the address of the page the visitor is on, and the page title. You can enter a fixed address and text instead.' },
      { q: 'Can visitors hide the share bar?', a: 'Yes. A small arrow collapses the bar into a tab on the edge of the screen, and one click on the tab brings it back. You can also make it start collapsed.' },
      { q: 'How do the share buttons behave on phones?', a: 'By default the buttons become a bar along the bottom of the screen, with a small pill to bring it back after hiding. You can keep a compact side stack instead.' },
      { q: 'Which social networks can I add?', a: 'Facebook, X, LinkedIn, WhatsApp, Telegram, Pinterest, Reddit, Threads, Bluesky, Tumblr, Hacker News, LINE, email and copy link.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Social Share Bar HTML, CSS and JavaScript: add a share counter, hide it after the footer, add another network, or turn it into a React component.',
      prompt: `Create a floating social share bar in plain HTML, CSS and JavaScript.

- A fixed column of square icon buttons on the left edge, vertically centred, with the outer corners rounded.
- Each button is a link that opens in a new tab (target="_blank" with rel="noopener noreferrer") to the network's share URL for Facebook, X, LinkedIn and WhatsApp, plus an email link and a copy-link button.
- JavaScript fills each link with the current page URL (location.href) and the page title, and the copy button uses navigator.clipboard with a short "Link copied" message.
- A small arrow button collapses the bar into a vertical tab; clicking the tab restores it. Keep aria-expanded and visible focus styles.
- On screens under 640px turn it into a horizontal bar fixed to the bottom of the screen, and hide it for printing.`,
    },
  },
  'accessibility-toolbar': {
    keywords: ['accessibility widget html', 'accessibility toolbar for website', 'free accessibility widget', 'ally accessibility widget alternative', 'bigger text high contrast widget'],
    about: {
      title: 'Accessibility Toolbar Widget: Free Floating Accessibility Panel for Any Website',
      description: `**Accessibility Toolbar Widget** is a free floating button that opens a panel of display options visitors can switch on for themselves, in the style of the Ally and UserWay widgets. It takes no space in your layout: the round button sits in the bottom corner of the screen, and one click or key press opens the panel. Everything is plain HTML, CSS and a little JavaScript, with no account, no tracking and no monthly fee.

**What visitors can change**

Ten options are built in. **Bigger text** steps the page text through three larger sizes, **line height** adds more space between lines and **text align** switches the page to left, centre or right aligned text. **Readable font** swaps the typeface for a plain, widely installed one. **Contrast** offers a high-contrast mode and a dark inverted mode, **grayscale** removes colour, **hide images** clears pictures and background images, and **pause animations** stops CSS animations, videos and GSAP timelines. **Highlight links** underlines every link on a bright background, and the **reading mask** darkens the page except a strip that follows the pointer or the focused element, which helps people who lose their place when reading.

**It remembers each visitor**

Choices are saved in the visitor's browser (localStorage) and applied again on the next page and the next visit, so a visitor sets things once. A reset button clears everything, and you can switch memory off for a site that should never store anything on the visitor's device.

**Built to be usable itself**

The button and the panel are real buttons with labels, visible focus rings and Esc to close, and focus returns to the button afterwards. The panel stays out of every filter and style it applies, so it never becomes unreadable. Reduced-motion preferences are respected.

**Customise it**

Choose the button corner, switch individual options on or off, rename every label for your language, and set the brand colour and corner radius in the theme. Export HTML, a ZIP, React or Vue, or fork it into [My Code](/ui-snippets/mycode/). To pair it with an exit offer or promo, see the [Popup & Promo Modal](/website-section-templates/popup-modal/).

**An honest note**

A toolbar like this helps visitors adjust how a page looks, but it does not make a website compliant on its own. Real accessibility starts in the page itself: headings in order, alt text, labelled forms, enough contrast and keyboard access. Use the toolbar as a friendly extra, not a replacement, and test your pages with a keyboard and a screen reader.`,
    },
    features: [
      'Floating round button that takes no space in your layout, bottom left or bottom right',
      'Bigger text in three steps, applied to the text on the whole page',
      'Line height and text alignment options for easier reading',
      'Readable font option that swaps to a plain, widely installed typeface',
      'High-contrast and dark inverted modes, with images kept natural in dark mode',
      'Grayscale, hide images and pause animations (CSS, video and GSAP)',
      'Highlight links with a bright underlined style',
      'Reading mask that follows the pointer, touch or keyboard focus',
      'Remembers each visitor\'s choices on their device, with a reset button',
      'Keyboard friendly: Esc closes, focus returns to the button, every option is a labelled button',
    ],
    why: [
      { icon: '🧩', title: 'One snippet, no subscription', desc: 'Add one section and get the main display options without a paid widget, an account or a third-party script on your pages.' },
      { icon: '🔐', title: 'Nothing leaves the browser', desc: 'The options run on the visitor\'s device and only a small setting is stored locally, so there is no tracking and no data sent anywhere.' },
      { icon: '🎛', title: 'Yours to edit', desc: 'Rename every label, hide options you do not need, move the button and match your brand colours, in the editor or in the exported code.' },
    ],
    useCases: [
      { icon: '🏫', title: 'Schools, colleges and councils', desc: 'Give students and residents a visible way to enlarge text and raise contrast on information-heavy sites, alongside properly built pages.' },
      { icon: '🏥', title: 'Clinics and care services', desc: 'Help older visitors read opening hours and booking details with bigger text, a readable font and a reading mask that keeps their place.' },
      { icon: '🛍', title: 'Shops and landing pages', desc: 'Show customers you care about usability with a toolbar that lets them hide busy images or pause moving banners while they compare products.' },
      { icon: '🎓', title: 'Learning how it works', desc: 'Study how page-wide display options work: attributes on the root element, injected styles, filters on siblings and a pointer-following mask.' },
    ],
    faqs: [
      { q: 'Does an accessibility widget make my website compliant?', a: 'No. A toolbar helps visitors change how a page looks, but compliance depends on the page itself: heading order, alt text, labelled forms, colour contrast and keyboard access. Use the widget as an extra and test your pages.' },
      { q: 'How do I add the accessibility toolbar to my website?', a: 'Edit the labels and colours, then export the HTML and paste it into your page, or add it as a section in the Website Builder. It appears as a floating button on every page that includes it.' },
      { q: 'Do the visitor\'s settings stay on the next page?', a: 'Yes. Choices are saved in the browser with localStorage and applied again on later pages and visits. The reset button clears them, and you can turn memory off in the settings.' },
      { q: 'Does it slow my website down or track visitors?', a: 'No. It is a small script with no external requests and no analytics, and the only thing stored is a short setting on the visitor\'s own device.' },
      { q: 'Can I show only some of the options?', a: 'Yes. Each of the ten options has a switch, and every label can be renamed, so you can show just bigger text and contrast, or translate the panel into your own language.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Accessibility Toolbar HTML, CSS and JavaScript: add a dyslexia-friendly font, a stronger dark mode, a keyboard shortcut to open the panel, or turn it into a React component.',
      prompt: `Create a floating accessibility toolbar in plain HTML, CSS and JavaScript.

- A fixed round button in the bottom-right corner (aria-expanded, aria-label) that opens a non-modal panel; Esc and a close button close it and return focus to the button.
- The panel has tiles you click to step through levels, each a real button with aria-pressed and small level dots: bigger text (3 steps, scaling the font size of every text element), line height (2 steps), text align (left, centre, right), readable font, contrast (high contrast, then inverted dark mode), grayscale, hide images, pause animations, highlight links and a reading mask.
- Apply options with attributes on the html element and one injected style element. Exclude the widget itself from every rule. Put filters (contrast, grayscale) on the page's top-level blocks, not on html, so the fixed button and panel are not filtered.
- The reading mask is two dark fixed bars with a clear strip that follows the pointer, touch and focused element.
- Save the choices in localStorage inside try/catch, restore them on load, and add a reset button.
- Respect prefers-reduced-motion and hide the widget when printing.`,
    },
  },
};
