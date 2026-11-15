/* SEO page content for the sections added on 2026-11-15: Loyalty Stamp Card, Shop the Look, Collection Tiles (merged into SECTION_SEO in seo-content.js).
   Same shape as every other entry: keywords, about, 8+ features, 3 reasons, 4 use cases (18-42 words), 4-5 FAQs and an AI prompt. */

export const WAVE3_SEO = {
  'loyalty-card': {
    keywords: ['loyalty card html', 'stamp card template', 'coffee shop loyalty card', 'rewards card section', 'punch card website'],
    about: {
      title: 'Loyalty Stamp Card — Free Rewards Card Section',
      description: `**Loyalty Stamp Card** is a "collect eight stamps, get one free" card that visitors can actually play with. A grid of round stamps fills one by one as they press the button, a progress line says how many are left, and the last stamp turns into the reward. Beside it sit a heading, a short explanation and three "how it works" steps, so the scheme is understood in a few seconds.

**A card that remembers**

The card keeps its progress in the visitor's own browser, so the stamps are still there on the next visit. Nothing is sent to a server and there is no sign-up. If the browser blocks storage, for example in a private window, the card simply starts again from the number you chose. When every stamp is filled the message changes, the button is disabled and a "Start a new card" button appears.

**Make it yours**

Choose 6, 8, 10 or 12 stamps, set how many are already collected on a new visitor's card, and pick the symbol: a coffee cup, a scissors emoji, a letter. The last stamp carries its own label such as FREE. Every message uses plain text fields, including the progress line, where {n} and {t} are replaced by the numbers, so the card works in any language.

**Demo or display**

Keep the "Add a stamp" button on for a website where visitors try the card, or turn the demo buttons off to show a fixed card that only illustrates your scheme. The stamps are real list items with screen reader labels, the progress message is announced politely, and the pop animation is skipped for visitors who prefer reduced motion.

**Exporting the card**

The export includes the card, the steps and the small script that stores progress, so it works on any static host. Renaming the card gives visitors a fresh card, because progress is saved under the card’s name. Place it after a [menu or product grid](/website-section-templates/product-grid/) or above a [newsletter sign-up](/website-section-templates/cta-newsletter/), as the Cafe & Coffee Shop website template does.

**Running a scheme people finish**

Keep the goal reachable: eight stamps for a free drink is easier to finish than twenty. Say what counts as a stamp, put the card near the menu, and train staff to mention it when someone orders. A real stamp card at the counter or a loyalty tool should back the page up, because this section is a demonstration and not a customer account system.`,
    },
    features: [
      'Interactive stamp card: press the button to add a stamp',
      '6, 8, 10 or 12 stamps with a reward stamp at the end',
      'Progress saved in the visitor’s browser',
      'Progress message with {n} and {t} placeholders',
      'Card complete message and a "Start a new card" button',
      'Any emoji or letter as the stamp symbol',
      'Three "how it works" steps with icons',
      'Demo buttons can be switched off for a fixed card',
      'Screen reader labels, polite progress announcements and reduced-motion support',
      'Progress kept per card name, so renaming starts a fresh card',
    ],
    why: [
      { icon: '☕', title: 'Rewards in seconds', desc: 'Visitors see how the scheme works by trying the card, which is clearer than a paragraph of rules.' },
      { icon: '🔁', title: 'A reason to return', desc: 'A card that is already part-full makes people want to finish it, and it remembers where they got to.' },
      { icon: '🛠️', title: 'No backend needed', desc: 'It runs in the browser with no account system, so a small café can add a rewards page the same day.' },
    ],
    useCases: [
      { icon: '☕', title: 'Café or coffee shop', desc: 'Show the "eighth drink is free" scheme on your homepage or menu page, with a card that fills as visitors try it and a clear reward at the end.' },
      { icon: '🥐', title: 'Bakery or juice bar', desc: 'Offer a free pastry or smoothie after ten visits, using a pastry or fruit symbol, and explain in three steps how stamps are earned at the counter.' },
      { icon: '💈', title: 'Salon or barber', desc: 'Reward regulars with a free trim after six visits, and place the card beside your booking section so loyalty is part of the first impression.' },
      { icon: '🛍️', title: 'Small shop', desc: 'Describe a simple points-free scheme for your shop, such as every tenth purchase earning a gift, with the card as a friendly illustration.' },
    ],
    faqs: [
      { q: 'Is this a real loyalty system?', a: 'No. It is a front-end demonstration that remembers progress in the visitor’s own browser. Use it to explain your scheme, and back it with real stamp cards or a loyalty tool in your shop.' },
      { q: 'Where is the progress saved?', a: 'In the browser’s local storage, per card name and stamp count. Clearing site data or using a private window starts the card again from the starting number you set.' },
      { q: 'Can I change the number of stamps and the reward?', a: 'Yes. Pick 6, 8, 10 or 12 stamps, change the stamp symbol, the label on the last stamp, the reward line and every message, including the progress text.' },
      { q: 'Can I show the card without the add button?', a: 'Yes. Turn off the demo buttons and the card becomes a fixed illustration showing the number of collected stamps you set, which suits a simple explanation.' },
    ],
    aiPrompt: {
      paragraph: 'Want stamps that follow a customer between devices? An AI assistant can load the stamp count from your own API, add a QR code the staff scan to add a stamp, or email the customer when the card is full.',
      prompt: `Create a loyalty stamp card section in HTML, CSS and JavaScript.

- Two columns: on the left a heading, a short paragraph and three "how it works" steps with icons; on the right a brown gradient card titled "Daily Grind Rewards" with a grid of 8 round stamps (4 per row).
- Empty stamps are dashed circles with a number; collected stamps are solid white circles with a coffee cup; the last stamp is gold and says FREE.
- A progress line "3 of 8 stamps collected" (aria-live polite) and a button "Add a stamp". Each press fills the next stamp with a short pop animation (skip it when prefers-reduced-motion is set).
- When all stamps are full show "Card complete! Show it at the counter for your free drink.", disable the add button and show a "Start a new card" button.
- Save the count in localStorage inside try/catch. Stack into one column on narrow screens.`,
    },
  },
  'shop-the-look': {
    keywords: ['shop the look html', 'lookbook hotspots', 'shoppable image', 'fashion lookbook section', 'product hotspots on photo'],
    about: {
      title: 'Shop the Look — Free Lookbook With Product Hotspots',
      description: `**Shop the Look** turns one styled photograph into a small shop. Dots sit on the garments in the picture; tap or hover one and a card opens with the product photo, name, price and an Add to cart button that fills the same cart as the rest of your store. It is the pattern fashion and interiors brands use on campaign pages, in a section you can edit and export.

**Place the dots with two numbers**

Each hotspot has a "from the left" and a "from the top" value, written as a percentage of the photo, so a dot stays on the jacket however large the picture is shown. The cards open to the left for dots on the right side of the photo and upwards for dots near the bottom, so they never run off the picture.

**Works with the built-in cart**

When the page also has the cart drawer, the Add to bag button adds the item and opens the drawer. Without it, the button is an ordinary link to your product page or payment link. On a phone a tap opens a card and a second tap, a tap elsewhere or Escape closes it; with a mouse the card also opens on hover.

**Accessible by design**

Every dot is a real button with a text label and an expanded state, the cards can be reached with the keyboard, and the pulsing ring around each dot stops for visitors who prefer reduced motion. Add a clear description of the photo as alt text.

**Using it in your own shop**

Exported on its own, the Add to bag buttons work as plain links to your product pages; next to the cart drawer they fill the cart instead. Swap the photo and move the dots in the editor, then add a [Product Strip](/website-section-templates/product-strip/) of best sellers below it, or lead into it from the [Collection Tiles](/website-section-templates/collection-tiles/).

**Choosing the right photo**

Choose a photo where every product is clearly visible, tag no more than four or five items, and only tag things that are in stock. Link each card to the real product page, and keep the heading about the occasion ("the weekend look") rather than the products.`,
    },
    features: [
      'Lookbook photo with up to six tappable hotspots',
      'Dots placed by percent from the left and the top',
      'Product card with photo, name, price and Add to bag',
      'Fills the same cart as the rest of the shop',
      'Cards flip left and upwards near the photo edges',
      'Opens on tap, click or hover; closes with Escape or an outside click',
      'Heading, text and button beside the photo',
      'Pulsing dots stop for reduced motion',
      'Button labels and screen reader text editable',
      'Plain product links when the page has no cart',
    ],
    why: [
      { icon: '👗', title: 'Inspire, then sell', desc: 'Shoppers see the whole outfit first and buy the pieces they like without leaving the photo.' },
      { icon: '🛍️', title: 'Cart included', desc: 'Add to bag fills the same cart as your other product sections, so there is no second checkout to build.' },
      { icon: '📱', title: 'Made for touch', desc: 'Tap to open, tap again to close. The cards stay inside the picture on small screens.' },
    ],
    useCases: [
      { icon: '👗', title: 'Fashion lookbook', desc: 'Tag the jacket, top and shoes in a campaign photo so shoppers can add the full outfit to their bag from one image on your home page.' },
      { icon: '🛋️', title: 'Styled room', desc: 'Tag the sofa, lamp and rug in a photographed living room, with prices on each card, to help shoppers buy a complete look in one visit.' },
      { icon: '💍', title: 'Gift guide', desc: 'Show a set table or a gift flat lay with tags on each item, and link every card to its product page for a quick seasonal gift guide.' },
      { icon: '🏋️', title: 'Sports kit', desc: 'Photograph an athlete in full kit and tag the shoes, top and bag, so visitors can buy the pieces they need for the same sport.' },
    ],
    faqs: [
      { q: 'How do I place the dots on the photo?', a: 'Each hotspot has two numbers: how far it is from the left and from the top, as a percentage of the picture. Start at 50 and 50 for the centre and adjust until the dot sits on the item.' },
      { q: 'Does Add to bag work without the cart drawer?', a: 'With the built-in cart switched on, the item is added to the shared cart. Without it, the button is a normal link, so point it at your product page or payment link.' },
      { q: 'How many products can I tag?', a: 'Up to six. More than four or five makes a photo crowded, so choose the pieces that matter most and send the rest to your shop.' },
      { q: 'Does it work on phones?', a: 'Yes. A tap opens a product card, and a tap elsewhere or on the dot again closes it. With a mouse, the card also opens on hover.' },
    ],
    aiPrompt: {
      paragraph: 'To grow it into a full lookbook, an AI assistant can load looks from your own API, add a "Shop the full look" button that adds every tagged item at once, or switch between several outfits with tabs.',
      prompt: `Create a "shop the look" section in HTML, CSS and JavaScript.

- Two columns: a portrait lookbook photo (4:5) on the left and a heading, short paragraph and button on the right.
- On the photo, add 2 to 6 round white hotspot buttons positioned with data-x and data-y percentages (left and top), each with a "+" icon that rotates to "x" when open and a soft pulsing ring (disabled for prefers-reduced-motion).
- Clicking or tapping a hotspot opens a small card next to it with a product thumbnail, name, price and an "Add to bag" button. Hovering also opens it with a mouse. Clicking elsewhere or pressing Escape closes it. Hotspots in the right half open the card to the left; hotspots in the lower half open upwards.
- Use aria-expanded on the buttons, and stack into one column on narrow screens.`,
    },
  },
  'collection-tiles': {
    keywords: ['shop by category section', 'collection tiles html', 'category cards ecommerce', 'fashion category tiles', 'image tiles with hover zoom'],
    about: {
      title: 'Collection Tiles — Free Shop by Category Section',
      description: `**Collection Tiles** is the row of tall photo tiles that sends shoppers into the right part of your shop: Women, Men, Shoes, Accessories. Each tile is a photograph with the collection name over a soft gradient, a short line such as "44 pairs" and an arrow, and the whole tile is a single link, which makes it easy to hit on a phone.

**Two to six tiles, any layout**

Add between two and six tiles. On a wide screen they sit side by side at a 4 by 5 ratio, and as the screen narrows they wrap, ending as two across on a phone. The photos are cropped to fit, so you can use any portrait picture; use the focus point if a face or product is cut off.

**Calm motion**

On hover or keyboard focus the photograph zooms slowly and the arrow slides a few pixels. Visitors who prefer reduced motion see no movement at all, and every tile has a visible focus outline.

**Links that work with the shop**

Point each tile at a filtered shop view, for example the Shop page with a category in the address, or at a collection page. In the Fashion Boutique website template the tiles link to filtered shop pages in the multi-page version.

**Linking the tiles to your shop**

Each tile is a single link, so it can open a category page, a filtered view such as shop.html?cat=Women, or a landing page for a sale. The export is plain HTML and CSS with no script at all. A [Product Strip](/website-section-templates/product-strip/) of best sellers under the tiles, or a [Shop the Look](/website-section-templates/shop-the-look/) photo above them, turns a home page into a shop window.

**Making the row look like a set**

Use photographs with the same lighting and background so the row feels like a set, keep names to one or two words, and show real item counts that you update. Lead with the collection most visitors want.`,
    },
    features: [
      'Two to six tall photo tiles, 4 by 5',
      'Collection name, short line and arrow over a gradient',
      'The whole tile is one link',
      'Slow photo zoom on hover and keyboard focus',
      'Responsive: wraps down to two across on phones',
      'Visible focus outline for keyboard users',
      'Reduced-motion friendly',
      'Optional heading and intro text',
      'Image focus point for cropped photos',
      'Pure HTML and CSS, no JavaScript needed',
    ],
    why: [
      { icon: '🧭', title: 'Fast navigation', desc: 'Big, clear photographs let shoppers pick a category in one glance, before they use search or the menu.' },
      { icon: '🖼️', title: 'Looks like a campaign', desc: 'Tall photo tiles give a plain category list the feel of a magazine page.' },
      { icon: '📱', title: 'Easy to tap', desc: 'Every tile is one large link, so phone users never have to aim at a tiny word.' },
    ],
    useCases: [
      { icon: '👗', title: 'Fashion store', desc: 'Lead your home page with Women, Men, Shoes and Accessories tiles, each linking to a filtered shop view, so shoppers reach the right range in one tap.' },
      { icon: '🛋️', title: 'Homeware shop', desc: 'Show Living, Bedroom, Kitchen and Garden tiles with room photographs and item counts, so visitors can browse by room instead of product type.' },
      { icon: '🎁', title: 'Gift shop', desc: 'Offer tiles for Birthdays, Weddings, New baby and Thank you, with a warm photograph each, so gift buyers can start from the occasion.' },
      { icon: '🌿', title: 'Plant nursery', desc: 'Split a catalogue into Indoor, Outdoor, Pots and Care with pictures of each, and update the item counts as the season changes.' },
    ],
    faqs: [
      { q: 'How many tiles can I have?', a: 'Between two and six. Four tiles look best on a desktop in a single row, and the grid wraps neatly to two across on phones.' },
      { q: 'What size should the photos be?', a: 'Portrait photos around 800 by 1000 pixels (4 by 5) work best. They are cropped to fit, and you can set a focus point if something important is cut off.' },
      { q: 'Can I link the tiles to filtered shop pages?', a: 'Yes. Each tile has its own link, so point it at a collection page or a shop page that filters by category in the address.' },
      { q: 'Does the zoom effect respect reduced motion?', a: 'Yes. Visitors who ask their device for reduced motion see no zoom or arrow movement. The tiles still show a clear outline when focused by keyboard.' },
    ],
    aiPrompt: {
      paragraph: 'An AI assistant can turn the tiles into a live menu of your catalogue: load collections from your shop’s API, show the current item count on each tile, or add a "New" badge to the latest collection.',
      prompt: `Create a "shop by collection" section in HTML and CSS.

- A heading, then a responsive grid of 4 tall tiles (aspect-ratio 4/5, auto-fit with a 220px minimum, two across on phones).
- Each tile is one link containing a cover photo, a dark gradient from the bottom, the collection name in a serif font, a small count line ("120 pieces") and a white round arrow button at the bottom right.
- On hover or keyboard focus the photo scales to 1.07 over 0.7s and the arrow moves 4px right; disable both under prefers-reduced-motion.
- Show a 3px focus outline on keyboard focus.`,
    },
  },
  'services-booking': {
    keywords: ['services price list html', 'booking services section', 'clinic services and prices', 'appointment price list template', 'service list with book button'],
    about: {
      title: 'Services & Booking List — Free Price List Section',
      description: `**Services & Booking List** is the price list appointment businesses need and rarely have. Each service is a clear row: an icon, the name and a short description, a duration chip such as "30 min", a price such as "from $65" and a Book button that links to your booking form or calendar. Visitors see what you offer, how long it takes and what it costs before they pick up the phone.

**Filter chips from your own categories**

Type a category for each service, for example Check-ups, Vaccines, Dental or Surgery, and the section builds a row of filter chips automatically. A tap shows only that category and a second chip, "All services", brings the full list back. With a single category there are no chips, and without JavaScript every service simply shows.

**Honest prices**

The price field takes a symbol and a number, with an optional word before it such as "from", so you can show a fixed price or a starting price. The same numbers are written into schema.org Service data with an Offer, which helps search engines understand your list. Only publish prices you really charge.

**Made for booking**

Every row has its own link, so Book can open a booking form on the same page, a calendar tool or a phone call. In the Veterinary Clinic template the Book buttons jump to an appointment request form.

**From price list to appointment**

The Book button on each row can open a booking form on the same page, a calendar tool or a phone call, and the structured data travels with the export, so search engines still read your prices. Put live [Opening Hours](/website-section-templates/opening-hours/) next to it and a [booking form](/website-section-templates/booking-form/) below it, as the Veterinary Clinic website template does.

**Writing a price list people trust**

Group services into three to five categories, put the most-booked one first, and keep descriptions to a sentence. Say what is included, and note when the price depends on the pet, the size or the time needed.`,
    },
    features: [
      'Service rows with icon, name, description, duration and price',
      'Filter chips built from the categories you type',
      'Optional word before the price, such as "from"',
      'Book button on every row with its own link',
      'Responsive layout that stacks neatly on phones',
      'schema.org Service data with Offer prices',
      'Chips are real buttons with a pressed state for keyboard users',
      'Up to 24 services in one list',
      'Every label editable, including the "All services" chip',
      'Service structured data included in the export',
    ],
    why: [
      { icon: '💬', title: 'Fewer price calls', desc: 'Clear prices and durations answer the questions people usually phone to ask, so the front desk is busier with real bookings.' },
      { icon: '🏷️', title: 'Easy to scan', desc: 'Categories and chips let visitors reach Dental or Vaccines in one tap instead of reading a long list.' },
      { icon: '📅', title: 'Booking one click away', desc: 'Every service has a Book button, so interest turns into an appointment request without searching the page.' },
    ],
    useCases: [
      { icon: '🐶', title: 'Veterinary clinic', desc: 'List check-ups, vaccines, dental care and surgery with durations and starting prices, and send every Book button to the appointment request form.' },
      { icon: '🦷', title: 'Dental practice', desc: 'Show consultations, hygiene visits, whitening and fillings in categories, with the time each takes and a note when treatment plans vary.' },
      { icon: '✂️', title: 'Hair salon or barber', desc: 'Offer cuts, colour and treatments with timings and "from" prices, so clients can book the right slot without a phone call.' },
      { icon: '🔧', title: 'Repair or fitness studio', desc: 'Publish services, session lengths and prices for bike repairs, personal training or classes, and let visitors book straight from the row.' },
    ],
    faqs: [
      { q: 'How do the filter chips work?', a: 'They are created from the category typed on each service. Choosing a chip shows only that category, and the first chip shows everything again. With only one category no chips are shown.' },
      { q: 'Can I show a starting price?', a: 'Yes. Type a word such as "from" in the field before the price. The price itself should be a symbol and a number, such as $65 or £40, so search engines can read it.' },
      { q: 'Where does the Book button go?', a: 'Wherever you link it: a booking form on the same page, a calendar tool, a phone number or an email. Each service has its own link.' },
      { q: 'Does it write structured data?', a: 'Yes. Each service is written as schema.org Service data with an Offer price and its category, which helps search engines understand your price list.' },
    ],
    aiPrompt: {
      paragraph: 'If your prices live in practice software, an AI assistant can load the list from its API, pre-fill the booking form with the service someone chose, or highlight the most booked service with a badge.',
      prompt: `Create a services and prices section in HTML, CSS and JavaScript.

- A centered heading and intro, then a row of filter chips ("All services" plus one chip per category) and a vertical list of service cards.
- Each card is a grid: a round icon on the left; the service name, a one-sentence description and two small chips (a clock with the duration, and the category) in the middle; and on the right the price ("from $65") with a "Book" button below it.
- The chips are buttons with aria-pressed. Choosing one hides the cards of other categories; the first chip shows all. With a single category show no chips.
- Add JSON-LD with an ItemList of Service items and an Offer for each price. On phones, move the price and button to a full-width row under the text.`,
    },
  },
  'class-timetable': {
    keywords: ['class timetable html', 'weekly schedule template', 'yoga class schedule section', 'studio timetable with booking', 'class schedule with day tabs'],
    about: {
      title: 'Class Timetable — Free Weekly Schedule Section',
      description: `**Class Timetable** is the weekly schedule studios put on their website so people can see what is on and book it. Day tabs run from Monday to Sunday with today marked and opened first, filter chips let visitors narrow the week to Vinyasa, Pilates or Meditation, and every class is a clear row with the start time, name, teacher, length, level, spots left and a Book button.

**Type the classes in any order**

Each class has a day, a start time and a type. The section sorts every day by time for you, accepts 24-hour times such as 18:30 or 12-hour times such as 6:30 pm, and builds the day tabs and type chips from what you typed. A day with no classes simply has no tab, and a chip that matches nothing on a day shows a friendly message.

**Honest availability**

The spots-left field is free text, so you can write "4 spots left" or "Full" when it is true. It is shown beside the Book button and is not connected to a booking system, so keep it up to date or leave it empty. Link each Book button to your booking form, calendar tool or phone number.

**Works without extras**

Tabs and chips are real buttons with a pressed state for keyboard and screen reader users. Without JavaScript, every class shows in the order typed, each with its day.

**Keeping the timetable current**

Classes are one simple list of day, time, name, type and teacher, so a new term is a few minutes of editing, and the export carries the small script that builds the tabs and sorts each day. Point each Book button at a [booking form](/website-section-templates/booking-form/) for class requests, or show memberships and prices beside it with the [Services & Booking List](/website-section-templates/services-booking/).

**Helping a beginner pick a class**

Show only the next few weeks of real classes, mark beginner-friendly sessions clearly, and put your most popular class types first in the list. Keep teacher names consistent, because visitors often choose a class by who teaches it.`,
    },
    features: [
      'Day tabs from Monday to Sunday, today marked and opened first',
      'Class-type filter chips built from your own types',
      'Each class: time, name, teacher, length, level and spots left',
      'Book button on every class with its own link',
      'Each day sorted by start time automatically',
      '24-hour and 12-hour times understood',
      'Friendly message when no class matches',
      'Tabs and chips are real buttons with pressed states',
      'All labels editable for any language',
      'A new term is a quick edit of one list',
    ],
    why: [
      { icon: '📅', title: 'See the week at a glance', desc: 'Visitors pick a day or a class type and find a time that suits them without scrolling a long list.' },
      { icon: '🧘', title: 'Easier first bookings', desc: 'Level labels and spots left help newcomers choose a class they feel comfortable joining.' },
      { icon: '⚡', title: 'Quick to maintain', desc: 'Type the classes in any order. The section sorts them and builds the tabs and filters itself.' },
    ],
    useCases: [
      { icon: '🧘', title: 'Yoga or Pilates studio', desc: 'Publish the weekly timetable with teachers and levels, let visitors filter by style, and link each Book button to a class reservation form.' },
      { icon: '🏋️', title: 'Gym or boxing club', desc: 'Show group classes such as spin, HIIT and boxing with start times and spots left, so members can plan their week before they arrive.' },
      { icon: '🏊', title: 'Swimming school', desc: 'List lessons by day, level and age group with the teacher named, and direct parents to the right enrolment form with one clear button.' },
      { icon: '💃', title: 'Dance school or community centre', desc: 'Share weekly classes for adults and children, filter by style or age, and make it easy to see when beginners are welcome.' },
    ],
    faqs: [
      { q: 'Does it show today’s classes first?', a: 'Yes. The tab for the current weekday is marked "Today" and opened first. If there are no classes today, the first day that has classes is shown instead.' },
      { q: 'Do I have to enter the classes in time order?', a: 'No. Type them in any order. Each day is sorted by start time, and both 24-hour times like 18:30 and 12-hour times like 6:30 pm are understood.' },
      { q: 'Is the spots-left number live?', a: 'No. It is text you type, such as "4 spots left" or "Full", and it is not connected to a booking system. Keep it up to date, or leave it empty.' },
      { q: 'How do the type filters work?', a: 'The chips are made from the class types you enter. Choosing one shows only that type on the selected day, and the first chip shows all types again.' },
    ],
    aiPrompt: {
      paragraph: 'To show live availability, an AI assistant can load classes and spots from your booking system, let visitors save their favourite classes, or add an "Add to calendar" button to each row.',
      prompt: `Create a weekly class timetable section in HTML, CSS and JavaScript.

- A centered heading and intro, then a row of day tabs (Mon to Sun, only days that have classes) with today marked "Today" and selected first, and a row of class-type filter chips ("All classes" plus one per type).
- Below, a list of class rows for the selected day, sorted by start time. Each row is a grid: start time and length on the left; the class name, "with Teacher" and two chips (type and level) in the middle; and on the right a "4 spots left" label and a "Book" button.
- Tabs and chips are buttons with aria-pressed. If no class matches the day and type, show a friendly message.
- Accept 24-hour and 12-hour times, and stack the row on narrow screens with the time and length across the top.`,
    },
  },
  'terminal-hero': {
    keywords: ['developer portfolio hero', 'terminal hero section', 'typing terminal animation html', 'programmer landing page hero', 'dark developer hero'],
    about: {
      title: 'Terminal Hero — Free Developer Portfolio Hero Section',
      description: `**Terminal Hero** is a first screen that looks like the work. On the left sit an availability badge, a large headline, a short introduction, two buttons and social icons; on the right is a terminal window whose lines type themselves out, one after another, with commands, output, success lines and comments in their own colours. It tells visitors who you are before they have scrolled.

**You write every line**

Each terminal line has a type and some text. Commands are typed character by character after a prompt you choose, output and comments appear at once, and a success line turns green. A short script such as "whoami", "cat stack.txt", "git log --oneline" and "npm run hire-me" says who you are, what you use and what you are working on in about ten lines.

**Calm for people who want it**

The typing speed is a choice of slow, normal or fast. Visitors who ask their device for reduced motion, and anyone using the editors, see the finished terminal immediately, with no animation. The window has a text description for screen readers, and the headline is the page's one main heading.

**Dark by default**

The section is designed for a dark theme with a single bright accent, and the terminal itself stays dark on any theme. Social icons use the same icon picker as the rest of the library, so GitHub, LinkedIn and X are one click away.

**Putting it on your portfolio**

The typing effect is a few lines of plain JavaScript in the export, with no libraries, so the hero loads fast on GitHub Pages or any static host. Follow it with [Project Cards](/website-section-templates/project-cards/) for your work and a [Vertical Timeline](/website-section-templates/timeline-vertical/) for your experience, the order used in the Developer Portfolio website template.

**Writing a terminal that sells you**

Keep the terminal to ten lines or fewer, put the most important line first, and end on a call to action. Make the headline about what you do for other people, not about the tools you use.`,
    },
    features: [
      'Headline, introduction, two buttons and social icons beside a terminal',
      'Terminal lines type themselves out, with a blinking cursor',
      'Four line types: command, output, success and comment',
      'Typing speed: slow, normal or fast',
      'Custom prompt and window title',
      'Availability badge with a soft pulsing dot',
      'Reduced motion and the editors show every line at once',
      'The terminal stays dark on any theme',
      'Terminal description for screen readers',
      'Typing effect in plain JavaScript, no libraries',
    ],
    why: [
      { icon: '💻', title: 'Shows, not tells', desc: 'A working terminal tells visitors you are a developer in a second, and the lines you write carry your stack and your story.' },
      { icon: '⌨️', title: 'Memorable first screen', desc: 'The typing animation holds attention for the few seconds that decide whether someone keeps scrolling.' },
      { icon: '♿', title: 'Respects every visitor', desc: 'Reduced-motion visitors get the finished terminal at once, and the text is real text that search engines can read.' },
    ],
    useCases: [
      { icon: '👩‍💻', title: 'Developer portfolio', desc: 'Open with a terminal that introduces you, lists your stack and ends on a hire-me line, then lead visitors to your projects and contact form.' },
      { icon: '📦', title: 'Open-source project', desc: 'Show an install command, a first usage example and a success message in the terminal, so people see how simple the library is.' },
      { icon: '🛠️', title: 'Developer tool or API', desc: 'Demonstrate a command-line tool or a curl request and its response above the fold, with a button to read the documentation.' },
      { icon: '🎓', title: 'Coding bootcamp', desc: 'Use the terminal to run a few friendly commands that spell out the course, the next start date and the button to apply.' },
    ],
    faqs: [
      { q: 'Can I change what the terminal types?', a: 'Yes. Every line is a field with a type and text. Commands are typed after the prompt, and output, success and comment lines appear at once in their own colours.' },
      { q: 'Does it animate for everyone?', a: 'No. Visitors who prefer reduced motion see the finished terminal immediately, and so do people using the editors. The text is real HTML, so search engines can read it.' },
      { q: 'Can I use it on a light theme?', a: 'Yes. The terminal window stays dark on any theme, and the copy beside it follows the theme colours. It looks best with a dark page and one bright accent.' },
      { q: 'Is it the main heading of the page?', a: 'Yes. The headline is the page’s one h1, so place this section first, and use h2 headings in the sections below it.' },
    ],
    aiPrompt: {
      paragraph: 'Make the terminal personal: an AI assistant can type your latest GitHub commit as a line, rotate between several short scripts, or add a "copy email" command that copies your address.',
      prompt: `Create a developer portfolio hero in HTML, CSS and JavaScript.

- Two columns on a dark page: on the left an availability badge with a pulsing dot, a large heading, a short paragraph, two buttons and three social icon links; on the right a terminal window with a title bar (three coloured dots and a title).
- The terminal shows about ten lines in a monospace font: commands start with a coloured "$" prompt and are typed one character at a time, then the next line appears after a short pause. Output lines appear at once, success lines are green and comments are grey. A blinking cursor follows the active line.
- Skip the animation and show all lines when prefers-reduced-motion is set. Stack into one column on narrow screens.`,
    },
  },
  'project-cards': {
    keywords: ['developer projects section html', 'portfolio project cards', 'projects grid with tech tags', 'github projects section', 'portfolio work grid template'],
    about: {
      title: 'Project Cards — Free Developer Portfolio Projects Grid',
      description: `**Project Cards** is the projects grid every developer portfolio needs. Each card shows a screenshot with a year badge, the project name and a one-sentence description, a row of technology tags and two links: a live demo and the source code. The grid adapts from three columns to one, and the screenshot zooms gently on hover.

**Tags are one per line**

Type the technologies for each project one per line, such as React, TypeScript and PostgreSQL, and they become small monospace chips. There is nothing to configure and nothing to keep in sync, and the chips make a project scannable at a glance, which recruiters and clients appreciate.

**Two clear links**

Every card has a primary link, usually a live demo, docs or case study, and a quieter link to the source on GitHub. Either can be left empty, so closed-source client work can show a demo only, and a library can show docs and code.

**Screenshots that fit**

Screenshots are cropped to a 16 by 10 frame and aligned to the top, which suits web pages and dashboards. Use consistent screenshots, with the same browser frame or none, so the grid looks like a set. Add alt text that describes what the screenshot shows.

**Hosting your portfolio**

The grid needs no JavaScript, so the export works on GitHub Pages, Netlify or any static host, and it stays fast with a dozen screenshots because each one loads only when it scrolls near the screen. Open the page with a [Terminal Hero](/website-section-templates/terminal-hero/) and follow the grid with a [Vertical Timeline](/website-section-templates/timeline-vertical/) of your experience.

**Choosing which projects to show**

Show your best six projects rather than everything you have built. Lead with the one you are proudest of, explain the result in the description, and make sure every demo link still works.`,
    },
    features: [
      'Responsive grid of up to twelve project cards',
      'Screenshot with a year badge and a gentle hover zoom',
      'Project name and a short description',
      'Technology tags, one per line, shown as monospace chips',
      'Live demo and source code links on every card',
      'Either link can be left empty',
      'Dark-theme styling with a bright accent border on hover',
      'Reduced-motion friendly',
      'Alt text and visible focus styles for links',
      'Lazy-loaded screenshots and no JavaScript',
    ],
    why: [
      { icon: '🗂️', title: 'Scannable work', desc: 'Screenshot, name, one sentence and tags give a recruiter the picture of a project in a few seconds.' },
      { icon: '🔗', title: 'Proof one click away', desc: 'Every card links to a live demo and the source code, so claims about your work can be checked.' },
      { icon: '📱', title: 'Works on any screen', desc: 'The grid flows from three columns to one without changing the card design.' },
    ],
    useCases: [
      { icon: '👨‍💻', title: 'Developer portfolio', desc: 'List six selected projects with screenshots, the technologies used and links to the demo and GitHub, ordered by how proud you are of them.' },
      { icon: '🎨', title: 'Designer or freelancer', desc: 'Show client work with a screenshot, a one-line result and a link to the live site, and leave the code link empty for private projects.' },
      { icon: '📚', title: 'Open-source maintainer', desc: 'Present your libraries with their docs and repository links and the main technologies, so new contributors can find a project to help with.' },
      { icon: '🏢', title: 'Small agency', desc: 'Share selected case studies with a year, a short description and tags for the services involved, linking each to a longer write-up.' },
    ],
    faqs: [
      { q: 'How do I add technology tags?', a: 'Type them one per line in the Technology tags field of each project. Each line becomes a small chip on the card, so no other setup is needed.' },
      { q: 'Can I hide the source code link?', a: 'Yes. Leave the code link text empty and only the demo link shows, which suits private client work. The same works the other way round for libraries without a demo.' },
      { q: 'What size should the screenshots be?', a: 'About 1200 by 750 pixels (16 by 10). They are cropped to that frame from the top, so put the most important part of the page at the top of the screenshot.' },
      { q: 'How many projects should I show?', a: 'Up to twelve fit, but four to six of your best projects work better. Fewer, stronger cards are easier to judge than a long list.' },
    ],
    aiPrompt: {
      paragraph: 'Rather than editing cards by hand, ask an AI assistant to load your repositories from the GitHub API, add filter chips by category, or open a longer case study in a modal when a card is clicked.',
      prompt: `Create a developer portfolio projects grid in HTML and CSS.

- A heading and intro, then a responsive grid (auto-fit, 320px minimum) of project cards on a dark theme.
- Each card has a 16:10 screenshot cropped from the top with a small year badge in the corner, a title, a one-sentence description, a row of technology tags in a monospace font (small rounded chips in the accent colour) and two links at the bottom: "Live demo →" in bold with an accent underline and a quieter "Source" link.
- On hover the card lifts 4px, its border turns the accent colour and the screenshot zooms to 1.05; disable these for prefers-reduced-motion.
- Show a visible focus outline on the links.`,
    },
  },
  'timeline-vertical': {
    keywords: ['vertical timeline html', 'experience timeline section', 'cv timeline template', 'career timeline css', 'company history timeline vertical'],
    about: {
      title: 'Vertical Timeline — Free Experience & CV Section',
      description: `**Vertical Timeline** reads from top to bottom, so it suits a CV, a company history or the steps of a project as well on a phone as on a desktop. A thin line runs down the left with a glowing dot for each entry, and every entry carries a period, a title, an organisation, a short description and optional tags such as the technologies used.

**Built for the experience section**

Each entry has a period in monospace type ("2023 – now"), a title with the company beside it, a description and tags typed one per line. Add up to twelve entries and put the newest first, the way recruiters read a CV. Everything is optional except the title, so an education entry or a milestone can be as short as one line.

**Easy on small screens**

A horizontal timeline needs width; this one needs none. The line and dots stay on the left and the text wraps naturally, so a long list reads comfortably on a phone, and nothing is hidden in a scrolling strip.

**Quiet by design**

The line fades from the accent colour to nothing, the dots glow softly, and the section uses the same heading and text styles as the rest of the library, so it fits any theme. There is no animation to switch off.

**Where it fits on a page**

The timeline is plain HTML and CSS, so it prints cleanly and doubles as a one-page CV. Place it under [Project Cards](/website-section-templates/project-cards/) on a portfolio, or after an [About us](/website-section-templates/about-story/) section to tell a company’s history.

**Writing entries recruiters read**

Describe results, not duties: what changed because you were there. Keep each description to two sentences, show the last ten years in detail and compress anything older into a single entry.`,
    },
    features: [
      'Vertical line with a glowing dot for every entry',
      'Period, title, organisation and description per entry',
      'Optional technology or topic tags, one per line',
      'Up to twelve entries in any order',
      'Reads well on phones with no horizontal scrolling',
      'Monospace period labels for a technical look',
      'Line fades from the accent colour',
      'Works on light and dark themes',
      'Optional heading and intro text',
      'Prints cleanly as a one-page CV',
    ],
    why: [
      { icon: '📜', title: 'A CV that reads', desc: 'A clear top-to-bottom list is how recruiters scan experience, so the section matches how people already read.' },
      { icon: '📱', title: 'Phone friendly', desc: 'Because it is vertical, long histories read comfortably on a small screen, unlike a sideways scrolling strip.' },
      { icon: '🏷️', title: 'Skills in context', desc: 'Tags on each entry show which technologies you used where, which a plain skills list cannot do.' },
    ],
    useCases: [
      { icon: '👩‍💻', title: 'Developer experience', desc: 'List your last few roles with the company, what you shipped and the technologies you used, newest first, in a calm and scannable layout.' },
      { icon: '🎓', title: 'Education and certificates', desc: 'Show degrees, bootcamps and certifications with their dates and a sentence about what you learned, tagged with the subjects covered.' },
      { icon: '🏢', title: 'Company history', desc: 'Tell the story of a business from its first customer to today, with a year, a headline and a short paragraph for each milestone.' },
      { icon: '🗺️', title: 'Project roadmap', desc: 'Present planned releases from now to next year, with a period, a name and a description, so customers can see where a product is heading.' },
    ],
    faqs: [
      { q: 'What order should I put the entries in?', a: 'Newest first is usual for a CV, and oldest first suits a company history. The section shows the entries in the order you type them.' },
      { q: 'Are the tags required?', a: 'No. Tags are optional and typed one per line. Leave the field empty for an entry such as a degree, and no tag row is shown.' },
      { q: 'How many entries can I add?', a: 'Up to twelve. For a long career, show the last ten years in detail and merge older roles into a single entry, so the list stays easy to read.' },
      { q: 'Does it work on light themes?', a: 'Yes. The line, dots and tags use the theme colours, so the timeline looks right on light and dark pages alike.' },
    ],
    aiPrompt: {
      paragraph: 'For a CV that updates itself, an AI assistant can load the entries from a JSON Resume file, reveal each one as it scrolls into view, or add an expandable "more detail" panel to each role.',
      prompt: `Create a vertical experience timeline in HTML and CSS for a dark developer portfolio.

- A heading and intro, then an ordered list with a 2px vertical line on the left that fades from the accent colour to transparent.
- Each entry has a round dot on the line (accent border and a soft glow), a period in small monospace accent text, a title with the company beside it in muted text, a short description and a row of small monospace tag chips.
- Entries are separated by generous spacing, the list is capped at about 780px wide and centred, and everything wraps cleanly on a phone.`,
    },
  },
  'quote-estimator': {
    keywords: ['price estimator html', 'car service price calculator', 'garage quote calculator', 'service quote widget', 'instant price check section'],
    about: {
      title: 'Price Estimator — Free Service Quote Calculator Section',
      description: `**Price Estimator** is an instant price check for businesses that charge by the size or type of what they work on. Visitors pick what they need, such as an MOT, a full service or new brake pads, and the size of their vehicle, and the estimated price and the time it takes appear straight away, with a note that the final price is confirmed after inspection and a Book button.

**Three prices per service**

Each service has a price for small, medium and large vehicles and a length of time. Each vehicle choice, for example "Small car: Fiesta, Polo, Corsa", is mapped to one of the three prices. Change a service or a vehicle and the estimate updates at once. The first choices are selected when the page loads, so an estimate is visible before anyone clicks.

**Honest by design**

An estimate is not a quote, so the section has a note under the price that you write yourself, such as "We confirm the exact price after a free inspection". The prices are typed as you want them shown, in any currency, so only publish figures you really charge.

**No server, no sign-up**

The estimate is worked out in the browser from the numbers you typed, so there is nothing to host and no personal data is collected. The Book button links wherever you choose: a booking form, a calendar or a phone number.

**Accessible**

The choices are real radio buttons in labelled groups, so they work with the keyboard and screen readers. The estimate sits in a region that announces changes politely.

**Putting prices live**

The estimate is worked out by a short plain-JavaScript script inside the export, so prices change by editing the list, with no rebuild and no plugin. Show the full menu of jobs above it with the [Services & Booking List](/website-section-templates/services-booking/), and let the Book button lead to a [booking form](/website-section-templates/booking-form/) where the visitor names the job.

**Pricing jobs honestly**

Offer the four or five jobs people ask about most, use plain vehicle names with examples, and keep the note honest about what can change the price. Update the prices whenever they change.`,
    },
    features: [
      'Pick a service and a vehicle size for an instant estimate',
      'Three prices per service: small, medium and large',
      'Time the job takes shown beside the price',
      'First choices preselected so an estimate shows at once',
      'Your own note under the price, for honest estimates',
      'Book button with its own link',
      'Real radio buttons in labelled groups',
      'Estimate announced to screen readers',
      'Works with any currency and any wording',
      'Prices change by editing one list, no rebuild',
    ],
    why: [
      { icon: '💷', title: 'Answers the first question', desc: 'Most people want a rough price before they call. Showing it removes the biggest reason not to book.' },
      { icon: '⚡', title: 'Instant and private', desc: 'The estimate appears as soon as someone chooses, with no form, no sign-up and no data collected.' },
      { icon: '📅', title: 'Turns interest into bookings', desc: 'A Book button sits under every estimate, so a price check leads straight to an appointment request.' },
    ],
    useCases: [
      { icon: '🚗', title: 'Garage or MOT centre', desc: 'Let drivers pick an MOT, service or brake job and their car size, see the price and time, and book the slot from the same box.' },
      { icon: '🧼', title: 'Car wash or detailing', desc: 'Offer a valet, a deep clean and paint protection priced for small, medium and large vehicles, with how long each one takes.' },
      { icon: '📦', title: 'Removals or storage', desc: 'Price a move by the size of the home, such as a studio, two bedrooms or three, and show a starting price with a booking link.' },
      { icon: '🏠', title: 'Cleaning service', desc: 'Show a starting price for a regular clean, a deep clean and an end-of-tenancy clean by property size, and let visitors book from the result.' },
    ],
    faqs: [
      { q: 'How does the estimate work?', a: 'Each service has three prices, for small, medium and large. Each vehicle choice is set to one of those bands, and the section shows the price from the chosen service and band.' },
      { q: 'Can I use it for something other than cars?', a: 'Yes. Rename the second group, for example to home size or van size, and set each choice to a price band. It works for any service priced by size.' },
      { q: 'Does it collect any personal data?', a: 'No. The estimate is worked out in the visitor’s browser from the numbers you typed. Nothing is sent anywhere until they use your booking form.' },
      { q: 'Is the estimate a binding quote?', a: 'Not unless you say so. The note under the price is yours to write, so make clear that the final price is confirmed after inspection if that is the case.' },
    ],
    aiPrompt: {
      paragraph: 'For quotes with extras, an AI assistant can add checkboxes such as collection and delivery that add to the price, load your price list from an API, or carry the chosen job into the booking form.',
      prompt: `Create a service price estimator in HTML, CSS and JavaScript.

- A heading and intro, then a card with two columns: on the left two groups of choice chips built from real radio inputs (group 1 "What do you need?" with MOT, Full service, Brake pads, Diagnostics; group 2 "What do you drive?" with Small car, Family car and Large car or van, each with example models in small text); on the right a dark result panel.
- Each service has three prices (small, medium, large) and a duration. Each vehicle maps to one price band. The result panel shows "From" and the price in large accent text, "Takes about 2 hours", a small note saying the price is an estimate confirmed after inspection, and a "Book this service" button.
- Preselect the first option of each group, update the result instantly on change, mark the chosen chip with a coloured border and use aria-live polite on the result. Stack into one column on narrow screens.`,
    },
  },
  'service-area': {
    keywords: ['service area checker', 'postcode checker html', 'do you cover my area widget', 'plumber service area section', 'delivery area checker'],
    about: {
      title: 'Service Area Checker — Free Postcode Coverage Section',
      description: `**Service Area Checker** answers the question every local customer asks before they call: "do you cover my area?". A visitor types their postcode and gets an answer at once, with the area name and how soon you can usually be there, and a Book button when they are covered. Beside the checker, the areas you cover are listed as chips, each with its code, so people can also scan the list.

**Works with UK postcodes and ZIP codes**

In UK mode the checker cuts the postcode before its last three characters and matches the first part exactly, so M20 4BT is checked against M20 and never against M2 or M200. In "starts with" mode a ZIP or other postal code that begins with a code you list is a match, and the longest matching code wins. Spaces, lower case and punctuation are ignored.

**Your words, your promises**

The messages for "covered", "not covered" and "incomplete postcode" are fields you write, with placeholders for the postcode, the area name and the arrival time. Only promise an arrival time you can keep, and use the small print to say that emergencies outside your usual area may take longer.

**Private and fast**

The lookup runs in the visitor's browser against the list you typed, so no postcode is sent or stored. The covered area is highlighted in the chip list, which confirms the answer visually, and the result is announced politely to screen readers.

**Setting up your patch**

Add one chip per postcode district you serve, with an honest arrival time, and the checker uses that same list. The export carries the short checking script, so nothing depends on an outside postcode service. A [Services & Booking List](/website-section-templates/services-booking/) above it and a [booking form](/website-section-templates/booking-form/) below shorten the path from "do you cover me?" to a booked visit.

**Keeping the list clear**

List every outward code you really serve, give honest arrival times, and put the checker near your booking button. If you cover a whole city, a short list of the main districts is clearer than fifty codes.`,
    },
    features: [
      'Type a postcode and get an instant covered or not covered answer',
      'Area name and usual arrival time in the message',
      'UK mode matches the first part of the postcode exactly',
      'Starts-with mode for ZIP codes and other formats',
      'Covered areas listed as chips, with the match highlighted',
      'Book button appears when the area is covered',
      'Your own messages with {p}, {area} and {eta} placeholders',
      'Result announced to screen readers',
      'Runs in the browser, nothing is sent or stored',
      'No postcode service or API key needed',
    ],
    why: [
      { icon: '📍', title: 'Answers before the call', desc: 'Customers learn straight away whether you serve them, so fewer wasted calls reach your phone and more real bookings do.' },
      { icon: '🔒', title: 'Nothing is collected', desc: 'The check happens in the browser with the list you typed, so no postcode is sent anywhere.' },
      { icon: '✅', title: 'A clear next step', desc: 'When the area is covered, a Book button appears beside the result, so interest turns into a request.' },
    ],
    useCases: [
      { icon: '🔧', title: 'Plumber or electrician', desc: 'List the districts you cover with a usual arrival time for each, so a homeowner with a leak knows whether you can come and how fast.' },
      { icon: '🧹', title: 'Cleaning or gardening service', desc: 'Show the postcodes you visit on each weekday, let visitors check theirs and send them straight to the booking form when covered.' },
      { icon: '💐', title: 'Florist or local delivery', desc: 'Check whether a recipient’s postcode is inside your delivery area before the customer fills a basket, and show the delivery time.' },
      { icon: '🔑', title: 'Locksmith or mobile mechanic', desc: 'Reassure someone locked out that you reach their street, with a realistic arrival time and a call button next to the answer.' },
    ],
    faqs: [
      { q: 'How does matching work for UK postcodes?', a: 'The checker removes spaces, cuts the last three characters and compares the first part, such as M20, exactly with the codes you list. So M20 4BT matches M20 but not M2.' },
      { q: 'Can I use it for ZIP codes or other countries?', a: 'Yes. Choose the "starts with" mode and list the beginnings of the codes you serve. The longest listed code that the typed code starts with is the match.' },
      { q: 'Is the postcode stored or sent anywhere?', a: 'No. The check runs in the visitor’s browser against the list you typed, and nothing is sent, stored or tracked by the section.' },
      { q: 'Can I change the messages?', a: 'Yes. The covered, not covered and incomplete messages are text fields, and you can use {p} for the postcode, {area} for the area name and {eta} for the arrival time.' },
    ],
    aiPrompt: {
      paragraph: 'To cover every street exactly, an AI assistant can check postcodes against a real postcode API, draw your area on a map, or collect an email from visitors outside it so you know where demand is.',
      prompt: `Create a service area checker section in HTML, CSS and JavaScript.

- Two columns: on the left a heading, a short paragraph, a postcode field with a "Check my area" button and a result message; on the right a panel titled "Areas we cover" with chips, each showing a code in monospace (M1, M20) and an area name.
- On submit, normalise the postcode (letters and digits only, upper case). Cut off the last three characters and compare the rest exactly with the chip codes. If it matches, highlight the chip and show a green message like "Good news: we cover M20 4BT (Didsbury). We can usually be with you within 45 minutes." and reveal a "Book a visit" button. If not, show an amber message; if the postcode is too short, show a red message.
- Use aria-live polite for the result, keep everything in the browser, and stack into one column on narrow screens.`,
    },
  },
};
