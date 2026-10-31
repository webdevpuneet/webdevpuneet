/* SEO page content for the sections added on 2026-10-31: Opening Hours & Location, About us & Our story,
   Reviews summary (merged into SECTION_SEO in seo-content.js). Same shape as every other entry: keywords,
   about, 8+ features, 3 reasons, 4 use cases (18-42 words), 4-5 FAQs and an AI prompt. */

export const WAVE2_SEO = {
  'opening-hours': {
    keywords: ['opening hours section', 'business hours html template', 'open now badge', 'opening hours with map', 'localbusiness schema opening hours'],
    about: {
      title: 'Opening Hours & Location — Free Business Hours Section',
      description: `**Opening Hours & Location** answers the two questions every local visitor has: "are you open?" and "where are you?". A weekly hours table sits beside an embedded map, with the address, phone number and email below and buttons to get directions or call. A live badge says **Open now · closes at 17:00** or **Closed now · opens Tuesday 08:00**, worked out in the business's own time zone, so someone planning a trip from another country still sees the right answer.

**Built for real opening hours**

Every day is its own row. Mark a day as closed, add a note such as "Brunch until 2 pm", or list a day twice for a lunch break. A closing time earlier than the opening time means the place closes after midnight, which suits bars and late-night kitchens. Today's row is highlighted automatically.

**Made for search engines**

The hours, address, phone number and map link are also written into the page as schema.org [LocalBusiness](https://schema.org/LocalBusiness) data with **OpeningHoursSpecification**. You choose the closest business type, from cafe, restaurant and bakery to dentist, doctor, vet, salon and garage, so search engines can read the details instead of guessing them from the text. Structured data helps search engines understand the page but does not guarantee how your listing appears.

**Editable and fast**

The map is an OpenStreetMap embed by default (no key needed); paste a Google Maps embed link to use that instead, or switch the map off. The "Open now" badge needs no account and no server: it is a few lines of JavaScript, and without JavaScript the table still shows every day.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with [Contact With Map](/website-section-templates/contact-map/) for several locations, the [Booking Form](/website-section-templates/booking-form/) for appointments, or the [Restaurant Menu](/website-section-templates/restaurant-menu/).

**Getting the most from it**

Keep the hours identical to your Google Business Profile, because a mismatch confuses both customers and search engines. Use 24-hour times or 9:00 AM style, and set the time zone name (for example Europe/London or Asia/Kolkata) once so the badge is right for every visitor. Put a note about bank holidays under the table, and update it before the holidays.`,
    },
    features: [
      'Weekly hours table with today highlighted',
      'Live Open now / Closed now badge in the business time zone',
      'Next opening time when closed (for example opens Tuesday 08:00)',
      'Closed days, notes and split shifts; late hours past midnight',
      'Address, phone and email with icons you can change',
      'OpenStreetMap or Google Maps embed, or no map',
      'Get directions and Call buttons',
      'schema.org LocalBusiness data with OpeningHoursSpecification',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🕒', title: 'The answer at a glance', desc: 'Visitors see at once whether you are open now and when you next open, without reading a table.' },
      { icon: '📍', title: 'Hours and map together', desc: 'Address, directions, phone and map sit in one place, so people can visit or call in a tap.' },
      { icon: '🔎', title: 'Readable by search engines', desc: 'LocalBusiness data states your hours, address and phone clearly for search engines.' },
    ],
    useCases: [
      { icon: '☕', title: 'Cafe or restaurant', desc: 'Show opening hours with brunch notes, a closed day and a map, so guests know when to come and how to find the door.' },
      { icon: '🦷', title: 'Clinic, dentist or vet', desc: 'List surgery hours, add the emergency number as a call button and show the address with directions for new patients.' },
      { icon: '💈', title: 'Salon or barber shop', desc: 'Publish late-night openings and Sunday hours clearly, and send people straight to your online booking page with the main button.' },
      { icon: '🔧', title: 'Garage or local service', desc: 'Give weekday and Saturday hours, a note about emergency call-outs and a map to the workshop for walk-in customers.' },
    ],
    faqs: [
      { q: 'How does the Open now badge know the time?', a: 'It reads the visitor\'s clock but converts it to the time zone you set, such as Europe/London, so someone in another country still sees whether the business is open there right now.' },
      { q: 'Can I show a lunch break or two shifts in a day?', a: 'Yes. Add the same day twice, for example 09:00 to 12:30 and 14:00 to 18:00. The badge and the structured data treat each row as a separate opening period.' },
      { q: 'What if we close after midnight?', a: 'Set a closing time earlier than the opening time, for example 18:00 to 02:00. The badge keeps showing Open now after midnight until it closes.' },
      { q: 'Does this help me appear on Google?', a: 'It writes your hours, address and phone as schema.org LocalBusiness data, which helps search engines understand the page. Listings and rich results are decided by the search engine, so also keep your Google Business Profile up to date.' },
      { q: 'Can I use Google Maps instead of OpenStreetMap?', a: 'Yes. In Google Maps choose Share, then Embed a map, and paste the iframe\'s src link into the map field. Leave the field empty to hide the map.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the hours: add a holiday calendar that overrides the table on certain dates, show wait times from your booking system, or support two languages.',
      prompt: `Create an "Opening hours and location" section in HTML, CSS and JavaScript.

- Centred header with eyebrow, heading and intro text.
- Two columns: a card with a table of the seven days (day left, times right, a "Closed" label for closed days, a small note under a day) and a live badge, and a column with an embedded map and a card with the address, phone and email and two buttons (Get directions, Call us).
- JavaScript: highlight today's row and show a badge "Open now · closes at 17:00" or "Closed now · opens Tuesday 08:00". Use Intl.DateTimeFormat with a time zone name, support closing times past midnight, and refresh every minute.
- Add JSON-LD for LocalBusiness with OpeningHoursSpecification (dayOfWeek, opens, closes), PostalAddress and telephone.
- Stack into one column on narrow screens. Use CSS custom properties for the colours.`,
    },
  },

  'about-story': {
    keywords: ['about us section template', 'our story section html', 'about page design', 'company values section', 'about us section with founder'],
    about: {
      title: 'About Us & Our Story — Free About Section Template',
      description: `**About Us & Our Story** is the section most websites need and few templates include. A tall picture with a floating badge such as "10 years of craft" sits beside your heading and story, followed by three headline facts, the person behind the business and a row of values. It tells visitors who you are, what you believe and why they can trust you, which is what the About page is for.

**A story in two short paragraphs**

The text area is deliberately small: a first paragraph for how it began and a second for how you work. Short paragraphs are read; long ones are skipped. A facts row (projects, countries, rating, years) gives proof at a glance, and an optional quote from the founder adds a human voice.

**Every part is optional**

Switch off the founder, the facts or the values, drop the badge, or hide the second paragraph. It works for a one-person studio, a clinic, a restaurant or a small company. The picture is yours to upload, and the focus point keeps the important part visible when it is cropped.

**Search engines learn who you are**

The organization name, founding year and founder are also written into the page as schema.org [Organization](https://schema.org/Organization) data. That gives search engines a clear statement of who is behind the site, and it never replaces the visible text.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with the [Team Grid](/website-section-templates/team-grid/) to introduce everyone, the [Horizontal Timeline](/website-section-templates/timeline-horizontal/) for your history, or [Stats Counters](/website-section-templates/stats-counters/) for bigger numbers.

**Getting the most from it**

Write the first paragraph about the people you help, not about yourself. Use real numbers in the facts, and a real photograph of your workplace or team. Choose three values you can prove with a story, and end with a clear next step such as "Meet the team" or "Book a call".`,
    },
    features: [
      'Large picture with a floating badge such as "Since 2014"',
      'Heading and two short story paragraphs',
      'Founder block with photo, name, role and a quote',
      'Up to four key facts with big numbers',
      'Values grid with icons you can change',
      'Two buttons with their own links',
      'Switch off the founder, facts or values',
      'schema.org Organization data with name, year and founder',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🤝', title: 'Builds trust fast', desc: 'A real story, a named founder and proof in numbers answer "who are these people?" in seconds.' },
      { icon: '✂️', title: 'Short on purpose', desc: 'Two paragraphs, three facts and three values keep an About page readable instead of a wall of text.' },
      { icon: '🔎', title: 'Clear to search engines', desc: 'Organization data names the business, its founding year and founder in a form search engines read.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Agency or studio', desc: 'Tell how the studio began, show the founder and the number of projects delivered, and link to the team and the work.' },
      { icon: '🍽️', title: 'Restaurant or cafe', desc: 'Share the family story behind the kitchen, add the year you opened and list what you cook with: local, seasonal, made fresh.' },
      { icon: '🏥', title: 'Clinic or practice', desc: 'Introduce the doctor with a photo and credentials, add years of practice and patients treated, and state your approach to care.' },
      { icon: '🛍️', title: 'Small shop or maker', desc: 'Explain why you started making your products, show the person behind the brand and list your promises on materials and delivery.' },
    ],
    faqs: [
      { q: 'What should an About page include?', a: 'Who you are, why you started, who you help, a few proof points and a next step. Add a real photograph and the name of a real person; it is what visitors look for first.' },
      { q: 'Can I hide the founder or the facts?', a: 'Yes. Each of the founder, facts and values blocks has its own switch, and the badge and second paragraph disappear when left empty.' },
      { q: 'What picture size works best?', a: 'A portrait picture around 1200 by 1500 pixels, shown at a 4 to 5 ratio on wide screens and 5 to 4 on phones. Use the focus point to keep faces or products in view when it is cropped.' },
      { q: 'Does this section add structured data?', a: 'Yes. When you fill in the organization name it writes schema.org Organization data with the founding year and founder. It describes your text; it does not replace it.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the About section: write the story from your own notes, add a timeline of milestones, or turn the values into expandable cards.',
      prompt: `Create an "About us" section in HTML and CSS.

- Two columns on wide screens: a tall rounded picture (4:5) with a floating brand-coloured badge ("10 years of craft") on the left, and on the right an eyebrow, a heading with one highlighted phrase, two short paragraphs, a row of three facts (big number, small label) between thin rules, a founder block (round photo, name, role, an italic quote with a left border) and two buttons.
- Below, a grid of three value cards with an icon tile, a title and a sentence (auto-fit, min 240px).
- Stack into one column on narrow screens. Use CSS custom properties for the theme and add Organization JSON-LD with name, foundingDate and founder.`,
    },
  },

  'reviews-summary': {
    keywords: ['reviews section html', 'star rating breakdown', 'customer reviews template', 'product reviews section', 'aggregate rating schema'],
    about: {
      title: 'Reviews Summary & Rating — Free Star Reviews Section',
      description: `**Reviews Summary & Rating** is the trust block shops, apps and local businesses put near the buy button. A large average rating with stars and "based on 1,284 verified reviews" sits beside review cards, and a five-bar breakdown shows how many people gave five, four, three, two and one star. **Click a bar and only the reviews with that rating stay on screen**, which is how shoppers look for the honest middle of the scale.

**Type five numbers, get everything else**

You enter how many reviews each star level has. The average rating, the total, the bar lengths and the star display are worked out from those five numbers, so the summary can never disagree with its own bars. Each review card has the stars, a date, an optional title, the text, the reviewer with an optional photo, and a label such as "Verified purchase".

**Accessible by design**

Every star rating has a text description for screen readers ("Rated 4 out of 5"), the bars are real buttons with a pressed state that works with the keyboard, and the filter announces how many reviews are showing. All the wording, including the filter message, can be changed, so it works in any language.

**Data for search engines**

When you name what is rated, the section writes schema.org [AggregateRating](https://schema.org/AggregateRating) and [Review](https://schema.org/Review) data for it. Search engines may show star ratings for products, apps, books and courses; they usually ignore reviews that a business writes about itself, so use it mainly for products. Only publish real reviews: invented ones break the rules of search engines and the trust of customers.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with the [Product Grid](/website-section-templates/product-grid/), the [Testimonials Grid](/website-section-templates/testimonials-grid/) or an [FAQ](/website-section-templates/faq-accordion/) section.

**Getting the most from it**

Show the real distribution, including the middle ratings; a perfect score looks less believable than a 4.7. Reply to reviews on your own channels, keep the dates fresh, and link the "Write a review" button to a real review form.`,
    },
    features: [
      'Average rating with large stars, worked out from the counts',
      'Five-bar breakdown by stars with review counts',
      'Click a bar to filter the reviews; click again to clear',
      'Review cards with stars, date, title, text, photo and label',
      'Half-star ratings supported',
      'Screen reader descriptions and keyboard-friendly bars',
      'All wording editable, including the filter message',
      'schema.org AggregateRating and Review data',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '⭐', title: 'Honest at a glance', desc: 'The distribution of ratings, not just a score, shows shoppers what to expect.' },
      { icon: '🔍', title: 'Filter by stars', desc: 'One click on a bar shows only the reviews at that level, so people find the ones they trust.' },
      { icon: '🧮', title: 'Always consistent', desc: 'The average, total and bars are calculated from five numbers, so the summary never contradicts itself.' },
    ],
    useCases: [
      { icon: '🛒', title: 'Product page', desc: 'Place the rating and filterable reviews under the product description so shoppers can check the details before they add to cart.' },
      { icon: '📱', title: 'App or software', desc: 'Show your store rating and recent reviews on the landing page, with a link to leave a review in the store.' },
      { icon: '🍝', title: 'Restaurant or clinic', desc: 'Share genuine customer feedback with its rating breakdown and date, and invite new reviews with a link to your listing.' },
      { icon: '🎓', title: 'Course or book', desc: 'Display learner or reader ratings with the distribution, so prospective students see how the course really performs before they enrol.' },
    ],
    faqs: [
      { q: 'How is the average rating calculated?', a: 'From the five review counts you type in: each count is multiplied by its stars, added up and divided by the total number of reviews. The result is shown with one decimal place.' },
      { q: 'How does the star filter work?', a: 'Each bar is a button. Clicking it shows only the review cards whose rating rounds to that number of stars, and a message says how many are showing. Clicking again, or the clear button, shows them all.' },
      { q: 'Will Google show stars for my reviews?', a: 'The section writes AggregateRating and Review data for the item you name. Search engines decide what to show: stars are common for products, apps, books and courses, and usually ignored for a business rating itself. Use real reviews only.' },
      { q: 'Can I change the language?', a: 'Yes. Every label, the screen reader text and the filter message are editable fields, and the star rating text uses {n} as a placeholder for the number.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the reviews: load the reviews from your own API, add a sort menu (newest, highest, lowest), or add a helpful-vote button to each review.',
      prompt: `Create a reviews summary section in HTML, CSS and JavaScript.

- Two columns: a sticky summary card on the left (big average like 4.7 with "/5", gold stars, "1,284 verified reviews", five rows each with "5★", a thin gold bar and the count, and a "Write a review" button) and a list of review cards on the right (stars, date, title, text, round photo, name, a green "Verified purchase" label).
- The rows are buttons: clicking one shows only the review cards with that rating, shows a message "Showing 4 of 6 reviews rated 5 stars" with a "Show all reviews" button, and sets aria-pressed.
- Compute the average, the total and the bar widths from the five counts. Stars are drawn with a CSS gradient clipped to text and a --r custom property.
- Add JSON-LD for the Product with AggregateRating and Review. Stack into one column on narrow screens.`,
    },
  },
};
