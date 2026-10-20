/* Hand-written SEO content for each website section template, keyed by id, plus the
   shared "how it's different" list. Use cases follow the library rules (4 × 18-42 words). */

export const SECTION_SEO = {
  'saas-split-hero': {
    keywords: ['saas hero section template', 'hero section html css', 'split hero section', 'landing page hero template', 'startup hero section'],
    about: {
      title: 'SaaS Split Hero — Free Two-Column Hero Section Template',
      description: `**SaaS Split Hero** is a free, responsive hero section for SaaS and startup landing pages. Text sits on the left (an announcement badge, a bold headline with a highlighted phrase, supporting copy, primary and secondary buttons and a social-proof line) and a product screenshot sits on the right in a soft, glowing frame. It's the most common hero layout on software websites because it explains the product and shows it in the same glance.

**Edit everything in the browser**

Change every word, link and image from the panel: the badge text and link, the headline (wrap words in *asterisks* to colour them with your brand colour), the supporting text, both buttons and the social-proof line. Upload your own screenshot, which is resized in your browser and never uploaded, or paste an image URL. Switch the badge and social proof on or off, and leave the second button empty to hide it.

**Your brand, one theme**

Colours, fonts, corner radius and content width are theme settings shared by every section in the library, so this hero matches the features, pricing and footer sections you add next. Pick a preset or set exact colours, choose any Google Font or upload your own, and apply your saved brand kit in one click.

**Responsive and animated**

The layout uses CSS container queries, so it responds to the width of its container, not the browser window: two columns on desktop, stacked and centred on tablets and phones. It also includes a GSAP entrance animation (text staggers in, the screenshot rises) that plays once when the section scrolls into view, keeps content visible without JavaScript and turns off for people who prefer reduced motion.

**Export the way you build**

Copy a single HTML file with the CSS included, download a ZIP with your images, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/) to keep editing the code. Looking for individual components instead? Browse the [UI Snippets](/ui-snippets/) library.`,
    },
    features: [
      'Two-column layout: copy on the left, framed product screenshot on the right',
      'Announcement badge with its own link, switchable on or off',
      'Headline with *asterisk* brand-colour highlights',
      'Primary and secondary buttons; empty secondary button hides itself',
      'Social-proof line for ratings, customer counts or trial terms',
      'Upload a screenshot (resized in your browser) or paste a URL',
      'Container-query responsive layout that stacks on narrow widths',
      'GSAP + ScrollTrigger entrance animation with reduced-motion support',
      'Shared theme tokens: colours, fonts, radius and width as CSS variables',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '⇆', title: 'Explain and show at once', desc: 'Words on one side and the product on the other answer "what is it?" and "what does it look like?" in a single glance.' },
      { icon: '◐', title: 'Matches every other section', desc: 'Shared theme tokens mean the hero, features, pricing and footer you add later all use the same colours and fonts.' },
      { icon: '⇲', title: 'Responsive where it lives', desc: 'Container queries adapt the layout to its own width, so it works in a full page, a sidebar layout or a page builder.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS homepage hero', desc: 'Lead your homepage with a clear promise, a free-trial button, a demo link and a real dashboard screenshot so visitors understand the product before they scroll.' },
      { icon: '📣', title: 'Feature or launch landing page', desc: 'Use the badge to point to your changelog or launch post, and swap the screenshot for the new feature so returning visitors see what changed.' },
      { icon: '📝', title: 'Waitlist or beta sign-up page', desc: 'Change the primary button to "Join the waitlist", remove the second button and use the social-proof line for the number of people already signed up.' },
      { icon: '🧩', title: 'Agency or template demo', desc: 'Agencies and developers can drop it into client prototypes, export React or Vue code and restyle it with the client’s brand kit in seconds.' },
    ],
    faqs: [
      { q: 'How do I add this hero section to my website?', a: 'Edit the text, images and colours, then open Export. Download a ZIP or .html file and copy the <section class="st …"> element and its CSS into your page, or copy the React or Vue component into your app. Every colour and font is a CSS variable you can change later.' },
      { q: 'Is the hero section responsive?', a: 'Yes. It uses CSS container queries, so it adapts to the width of the element it sits in: two columns on wide screens, stacked and centred on tablets and phones. Preview desktop, tablet and mobile in the editor before exporting.' },
      { q: 'Can I use it with React, Next.js or Vue?', a: 'Yes. The Export menu copies a React component (JSX with the CSS included) or a Vue single-file component. The animation runtime loads GSAP from a CDN and runs after the component mounts.' },
      { q: 'How does the animation work?', a: 'The text and screenshot animate in with GSAP and ScrollTrigger once the section scrolls into view. Content is visible without JavaScript, and the animation is skipped for visitors who prefer reduced motion. You can change the effect and speed, or turn it off.' },
      { q: 'Where are my images and designs saved?', a: 'In your browser’s IndexedDB storage. Nothing is uploaded to a server. Use Save to keep named designs, and the Import / Export tab to download a backup file with your designs, images, uploaded fonts and brand kit.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the SaaS Split Hero code: turn it into a Next.js component with props, swap the screenshot for a video, or write five headline variations for A/B testing.',
      prompt: `Create a responsive SaaS hero section in plain HTML and CSS.

- Two columns: on the left a small pill badge link, a large bold headline with one highlighted phrase in the brand colour, a supporting paragraph, a filled primary button and an outlined secondary button, and a small social-proof line; on the right a product screenshot in a rounded frame with a soft brand-coloured glow behind it.
- Use CSS custom properties for every colour, the fonts, the corner radius and the max content width.
- Make it responsive with container queries (container-type: inline-size on the section): stack and centre the columns below 820px.
- Add a GSAP + ScrollTrigger entrance animation that staggers the text and raises the screenshot once, keeps content visible without JavaScript and respects prefers-reduced-motion.`,
    },
  },

  'centered-gradient-hero': {
    keywords: ['centered hero section', 'gradient hero section', 'dark hero section template', 'hero section with background gradient', 'landing page hero html'],
    about: {
      title: 'Centred Gradient Hero — Free Dark Hero Section Template With Glow',
      description: `**Centred Gradient Hero** is a free, dark landing-page hero with soft glowing gradients drawn entirely in CSS. A small pill eyebrow, a large centred headline, supporting text, two buttons and a short reassurance note sit above a wide product screenshot that rises from the bottom edge of the section, the layout made popular by modern developer tools and AI products.

**Glow without images**

The background is three layered radial gradients (your brand colour at the top, with pink and cyan accents on the sides), so it looks rich without loading a background image and recolours instantly when you change the brand colour. The screenshot frame picks up a matching glow along its top edge.

**Built to convert**

Centred heroes put all attention on one message and one action. The note under the buttons ("Free forever for small teams · Set up in 2 minutes") answers the two most common sign-up objections, and the screenshot gives visitors a reason to keep scrolling. Turn the screenshot off for a compact text-only hero; the section adds bottom padding automatically.

**Theme, motion and exports**

Pick a theme preset (the Midnight look is the default) or set exact colours, choose fonts from Google Fonts or upload your own, and set the corner radius and content width shared by every section. The GSAP entrance animation staggers the text and fades the screenshot up once on scroll, with reduced-motion support. Export a single HTML file, a ZIP with your images, a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Centred headline, eyebrow pill, supporting text and two buttons',
      'Glowing background built from layered CSS radial gradients',
      'Wide product screenshot rising from the bottom edge, switchable',
      'Reassurance note under the buttons for trial or pricing terms',
      'Dark Midnight theme by default; any preset or exact colours',
      'Container-query responsive with no fixed breakpoints to manage',
      'GSAP + ScrollTrigger entrance animation with speed control',
      'Upload your own screenshot or paste a hosted image URL',
      'Shared theme tokens as CSS custom properties',
      'Export HTML, a ZIP with images, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '◎', title: 'One message, one action', desc: 'A centred layout removes distractions, so visitors read the promise and see the main button straight away.' },
      { icon: '✦', title: 'Rich look, no heavy images', desc: 'CSS gradients create the glow, keeping the section fast to load and easy to recolour with your brand.' },
      { icon: '▭', title: 'Screenshot that pulls you down', desc: 'The product image rising from the bottom edge invites visitors to scroll into the rest of the page.' },
    ],
    useCases: [
      { icon: '🤖', title: 'AI and developer tool launches', desc: 'Lead with a bold promise on a dark gradient, a "Get started free" button and a screenshot of the app, the style visitors expect from modern tech products.' },
      { icon: '🧪', title: 'Public beta announcement', desc: 'Use the eyebrow for "Now in public beta", the note for "Free during beta" and the secondary button to link to a short product tour.' },
      { icon: '📄', title: 'Text-only hero for inner pages', desc: 'Switch the screenshot off for a compact centred hero on pricing, about or documentation pages that still matches your homepage.' },
      { icon: '🎨', title: 'Portfolio of a product designer', desc: 'Show a case-study screenshot under a centred headline about the project, with buttons for the live site and the full case study.' },
    ],
    faqs: [
      { q: 'How is the gradient glow made?', a: 'With three layered CSS radial gradients behind the content: one in your brand colour at the top and two accent glows on the sides. No background image is loaded, and the glow recolours when you change the brand colour.' },
      { q: 'Can I use it without the screenshot?', a: 'Yes. Switch off "Product image" and the hero becomes a compact centred text section, with extra bottom padding added automatically.' },
      { q: 'Does it work in light mode?', a: 'Yes. Pick a light preset such as Indigo or Mono, or set the background and text colours yourself. The glow uses your brand colour, so it suits light and dark themes.' },
      { q: 'How do I export it to React or Vue?', a: 'Open Export and choose Copy React component or Copy Vue component. The CSS, including the theme variables and the Google Fonts import, comes with the component, and the GSAP animation is included.' },
      { q: 'Is it free for commercial projects?', a: 'Yes. All section templates are free for personal and commercial websites, with no account and no attribution required.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Centred Gradient Hero: animate the glow slowly, add a logo strip under the buttons, or turn it into a reusable Next.js hero component.',
      prompt: `Create a dark, centred landing page hero in plain HTML and CSS.

- A glowing background made from three layered radial gradients: the brand colour at the top centre, pink on the left and cyan on the right, over a near-black background.
- Centred content: a small outlined pill eyebrow, a very large headline with a highlighted phrase in the brand colour, a muted supporting paragraph, two buttons (filled and outlined) and a small reassurance note.
- A wide product screenshot in a rounded frame that sits at the bottom of the section with a brand-coloured glow on its top edge.
- Use CSS custom properties for the theme and container queries for responsiveness, and add a GSAP + ScrollTrigger staggered entrance animation with prefers-reduced-motion support.`,
    },
  },

  'image-background-hero': {
    keywords: ['hero section with background image', 'full width hero image html css', 'hero image with text overlay', 'background image hero template', 'hero banner with stats'],
    about: {
      title: 'Image Background Hero — Free Full-Width Photo Hero Section Template',
      description: `**Image Background Hero** is a free, full-width hero section with your photo as the background. A dark gradient overlay keeps the text readable on any image, and a large headline, supporting text and two buttons sit on the left, with an optional row of three stats along the bottom. It's the classic hero for travel, hospitality, real estate, events, agencies and local businesses, where a great photo does most of the selling.

**Readable on any photo**

Text over images is often hard to read. This template layers two gradients over the photo: a horizontal one that is darkest behind the text and fades toward the right, and a vertical one that grounds the stats row. On phones the overlay becomes even, so the text stays legible when the layout stacks. The overlay uses your background colour, so it always matches your theme.

**Your photo, kept private**

Upload a wide, high-resolution photo straight from your computer. It's resized in your browser (up to 2400 px wide), saved locally in IndexedDB and never uploaded to a server. When you export a ZIP, the photo is placed in an images folder next to the page; the single-file HTML export embeds it.

**Stats that build trust**

The optional stats row shows three numbers with labels, such as routes, ratings and group size, which add credibility without another section. Turn it off for a cleaner hero. Like every section, it uses the shared theme (colours, fonts, radius, width), animates in with GSAP on scroll and exports as HTML, a ZIP, React or Vue.`,
    },
    features: [
      'Full-width background photo with a two-layer readability overlay',
      'Large headline with *asterisk* highlights in the brand colour',
      'Primary and frosted-glass secondary buttons',
      'Optional row of three stats with labels',
      'Upload photos up to 2400 px wide, resized in your browser',
      'Overlay colour follows your theme background',
      'Stacked, evenly shaded layout on phones via container queries',
      'GSAP entrance animation for the text and stats',
      'Elegant serif heading by default; any Google or uploaded font',
      'Export HTML, a ZIP with your photo, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '🖼', title: 'Let the photo sell', desc: 'For places, events and experiences, a strong image communicates more than any headline, and this layout gives it the whole screen.' },
      { icon: 'Aa', title: 'Text stays readable', desc: 'A tuned gradient overlay keeps white text legible on bright and busy photos alike, on every screen size.' },
      { icon: '📊', title: 'Proof built in', desc: 'Three stats along the bottom add credibility right in the hero, without making visitors scroll for it.' },
    ],
    useCases: [
      { icon: '🏔', title: 'Travel and tour operators', desc: 'Show your most beautiful destination photo with a headline about the experience, buttons for trips and a film, and stats for routes, reviews and group size.' },
      { icon: '🏨', title: 'Hotels, restaurants and venues', desc: 'Use a photo of the space or the food, a "Book a table" or "Check availability" button and stats such as rating, rooms or years open.' },
      { icon: '🏡', title: 'Real estate and architecture', desc: 'Feature a property or project photo with a headline about the lifestyle, a button to view listings and stats for homes sold or projects completed.' },
      { icon: '🎟', title: 'Events and conferences', desc: 'Use a crowd or venue photo, the event date in the eyebrow, a "Get tickets" button and stats for speakers, attendees and days.' },
    ],
    faqs: [
      { q: 'What size should the background image be?', a: 'A landscape photo at least 1920 × 1080 px works best. The editor resizes uploads to a maximum of 2400 px wide in your browser to keep the page fast. Choose a photo with calmer areas on the left, where the text sits.' },
      { q: 'How do I keep text readable on a bright photo?', a: 'The overlay already darkens the area behind the text. For very bright photos, set a darker background colour in the Colours section, since the overlay is built from the background colour.' },
      { q: 'Can I remove the stats row?', a: 'Yes. Switch off "Stats row" in the panel. The hero keeps its height and the content stays vertically balanced.' },
      { q: 'Is the image uploaded anywhere?', a: 'No. Your photo is stored in your browser’s IndexedDB and only leaves your device when you export or back up your designs.' },
      { q: 'Does it work with React or Vue?', a: 'Yes. Copy the React or Vue component from the Export menu. Uploaded images point to an images folder, so download the ZIP to get the files, or use a hosted image URL.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Image Background Hero: add a slow Ken Burns zoom with GSAP, swap the photo for a background video, or add a booking search bar.',
      prompt: `Create a full-width hero section with a background photo in plain HTML and CSS.

- The photo covers the section (background-size: cover) with two gradient overlays: a horizontal one darkest on the left behind the text and a vertical one darkest at the bottom.
- Left-aligned content: a small coloured eyebrow, a large serif headline with a highlighted phrase, a light supporting paragraph, a filled pill button and a frosted-glass outlined button.
- A row of three stats (big number and small label) along the bottom, separated from the content by a thin line.
- Use CSS custom properties, container queries (stack the stats and even out the overlay below 640px) and a GSAP + ScrollTrigger entrance animation with reduced-motion support.`,
    },
  },

  'app-product-hero': {
    keywords: ['app landing page hero', 'mobile app hero section', 'app store download section', 'phone mockup hero html', 'app landing page template'],
    about: {
      title: 'App Product Hero — Free Mobile App Landing Page Hero Section',
      description: `**App Product Hero** is a free hero section for mobile app landing pages. A headline and supporting text sit next to App Store and Google Play download buttons and a star-rating line, while a phone screenshot stands on a soft brand-coloured blob with two floating highlight cards, such as "+$420 saved this month", that make the app's benefits visible at a glance.

**Download buttons that look right**

The store buttons are real, accessible links with the Apple and Google Play icons drawn as inline SVG, styled in your text colour so they work on light and dark themes. Paste your App Store and Google Play URLs, change the labels for other languages, or point them to a pre-registration page before launch.

**A phone that sells the app**

Upload your own app screenshot or a phone mockup with a transparent background (PNG, up to 900 px wide, resized in your browser). The blob behind it uses your brand colour, and the floating cards are editable text, so you can highlight savings, streaks, ratings or any other key result. Switch the cards or the rating line off when you don't need them.

**Theme, motion and exports**

Choose a theme preset or exact colours, pick any Google Font or upload your own, and set the corner radius shared by every section. On phones the copy centres above the phone, and the GSAP entrance animation staggers the text and lifts the phone and cards in once on scroll. Export a single HTML file, a ZIP, a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'App Store and Google Play buttons with inline SVG icons',
      'Star-rating line for reviews and downloads',
      'Phone screenshot on a brand-coloured blob',
      'Two editable floating highlight cards, switchable',
      'Upload a transparent phone mockup or screenshot',
      'Copy centres above the phone on narrow screens',
      'GSAP entrance animation for text, phone and cards',
      'Accessible links with visible focus styles',
      'Shared theme tokens: colours, fonts, radius and width',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '📲', title: 'One tap to download', desc: 'Both store buttons sit right under the headline, so mobile visitors can install the app without scrolling.' },
      { icon: '💬', title: 'Benefits you can see', desc: 'Floating cards turn abstract features into concrete results, such as money saved or tasks done, next to the real app.' },
      { icon: '★', title: 'Trust in the first screen', desc: 'A rating line with your review count gives visitors social proof before they reach the app store page.' },
    ],
    useCases: [
      { icon: '💰', title: 'Fintech and budgeting apps', desc: 'Show the home screen with cards for money saved and bills split, link both store buttons and display your App Store rating under them.' },
      { icon: '🏃', title: 'Health and fitness apps', desc: 'Feature a workout or progress screen with cards for streaks and calories burned, and a rating line from your most popular store.' },
      { icon: '🗓', title: 'Productivity and habit apps', desc: 'Use a task or calendar screenshot with cards for "3 hours saved" and "Daily streak", and a headline about the result users get.' },
      { icon: '🔜', title: 'Pre-launch app pages', desc: 'Before launch, point both buttons to a pre-registration form, change the labels to "Join the iPhone beta" and remove the rating line.' },
    ],
    faqs: [
      { q: 'Can I use the official App Store and Google Play badges?', a: 'The template uses simple text buttons with store icons, which are easy to restyle. If you prefer the official badges, fork the section to My Code and replace the buttons with the badge images, following Apple’s and Google’s badge guidelines.' },
      { q: 'What screenshot works best?', a: 'A phone mockup or screenshot with a transparent background, about 720 × 1440 px. Upload a PNG to keep the transparency; the editor resizes it in your browser.' },
      { q: 'Can I change the floating cards?', a: 'Yes. Each card has a title and a short line of text. Use them for your app’s key results, or switch "Floating cards" off for a cleaner look.' },
      { q: 'Is it responsive?', a: 'Yes. On wide screens the copy and phone sit side by side; on tablets and phones the copy centres above the phone, using container queries.' },
      { q: 'Can I export it as a React component?', a: 'Yes. Copy React component from the Export menu. The CSS, theme variables and GSAP animation are included; uploaded images point to an images folder you get from the ZIP.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the App Product Hero: add a QR code that links to the store on desktop, animate the floating cards on a loop, or localise the store buttons.',
      prompt: `Create a mobile app landing page hero in plain HTML and CSS.

- Two columns: on the left an eyebrow, a large headline with a highlighted phrase, a supporting paragraph, two dark store buttons (App Store and Google Play, with inline SVG icons) and a star-rating line; on the right a phone screenshot standing on a large brand-coloured organic blob, with two small white floating cards (bold title + short text) overlapping the phone.
- A soft radial brand-colour glow on the section background.
- Use CSS custom properties for the theme, container queries to stack and centre below 820px, and a GSAP + ScrollTrigger entrance animation with reduced-motion support.`,
    },
  },

  'portfolio-hero': {
    keywords: ['portfolio hero section', 'personal website hero template', 'developer portfolio hero html', 'freelancer website hero', 'about me hero section'],
    about: {
      title: 'Personal Portfolio Hero — Free Hero Section for Developers & Designers',
      description: `**Personal Portfolio Hero** is a free hero section for developers, designers, freelancers and creators. It opens with an "available for work" badge and a live green dot, a friendly "Hi, I'm Alex" greeting, a headline about what you do, a short bio, buttons for your work and contact, social links, and your photo in an organic blob frame with a dashed outline.

**Made for people, not products**

A personal site has to answer three questions quickly: who you are, what you do and how to work with you. The greeting, headline and bio answer the first two; the "See my work" and "Get in touch" buttons and the availability badge answer the third. Switch the badge off when you're fully booked, and link the contact button to an email address, a booking page or a contact form.

**Your photo, your links**

Upload a portrait (resized in your browser, never uploaded) and it's cropped to the blob shape automatically. Add up to three social links, such as GitHub, LinkedIn and Dribbble, or swap in X, YouTube or Behance; empty links hide themselves.

**Theme, motion and exports**

Pick a warm preset or your own colours, choose any Google Font or upload your personal brand font, and set the corner radius. On phones the photo moves above the text. The GSAP entrance animation staggers the introduction and fades your photo in once on scroll. Export a single HTML file for a one-page site, a ZIP with your photo, a React or Vue component for your Next.js or Nuxt portfolio, or fork it into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      '"Available for work" badge with a live green dot, switchable',
      'Greeting, headline, short bio and two buttons',
      'Up to three social links that hide when empty',
      'Portrait photo cropped to an organic blob with a dashed outline',
      'Upload your photo; it stays in your browser',
      'Photo moves above the text on phones',
      'GSAP entrance animation with reduced-motion support',
      'Any Google Font, or upload your own brand font',
      'Shared theme tokens for colours, fonts, radius and width',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '👋', title: 'Personal from the first line', desc: 'A greeting and your photo make visitors feel they are meeting a person, which matters when they are choosing who to hire.' },
      { icon: '🟢', title: 'Shows you are available', desc: 'The live availability badge tells clients you are taking work right now, one of the first things they want to know.' },
      { icon: '🔗', title: 'Every next step in one place', desc: 'Your work, your contact details and your social profiles are all one click away from the first screen.' },
    ],
    useCases: [
      { icon: '💻', title: 'Developer portfolio', desc: 'Introduce yourself with your stack in the bio, link the first button to your projects section and add GitHub and LinkedIn as social links.' },
      { icon: '🎨', title: 'Designer or illustrator website', desc: 'Lead with a headline about the kind of work you love, link Dribbble or Behance, and use the button to open your case studies.' },
      { icon: '🧑‍💼', title: 'Freelancer or consultant homepage', desc: 'Keep the availability badge on, link "Get in touch" to a booking page and describe the outcomes you deliver in the headline.' },
      { icon: '🎥', title: 'Creator and personal brand page', desc: 'Creators can link YouTube, Instagram and a newsletter in the social links and use the main button for their latest video or course.' },
    ],
    faqs: [
      { q: 'How do I make a personal portfolio website with this?', a: 'Edit the greeting, headline, bio, buttons and links, upload your photo and pick your colours and fonts. Then download the .html file for a one-page site, or copy the React or Vue component into your Next.js, Nuxt or Astro portfolio and add more sections below it.' },
      { q: 'What photo works best?', a: 'A portrait-oriented photo (around 900 × 1000 px) with your face in the upper middle. It is cropped to the blob shape automatically and resized in your browser.' },
      { q: 'Can I change the social links?', a: 'Yes. Each of the three links has a text and a URL, so you can use GitHub, LinkedIn, X, Dribbble, Behance, YouTube or anything else. Leave a link empty to hide it.' },
      { q: 'How do I hide the "available for work" badge?', a: 'Switch off "Availability badge" in the panel, or change its text to something like "Booked until March".' },
      { q: 'Can I host it on GitHub Pages or Netlify?', a: 'Yes. Download the ZIP, rename index.html if needed, and upload the folder to GitHub Pages, Netlify, Vercel or any static host. The images folder comes with it.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Personal Portfolio Hero: add a typing effect to the headline with GSAP, write a better bio from your CV, or extend it into a full one-page portfolio.',
      prompt: `Create a personal portfolio hero section in plain HTML and CSS.

- Two columns: on the left a small "Available for work" pill with a green dot, a coloured greeting ("Hi, I'm Alex 👋"), a large headline with a highlighted phrase, a short bio, a filled and an outlined button, and three underlined social links; on the right a portrait photo cropped to an organic blob shape with a dashed blob outline around it.
- Use CSS custom properties for the theme, container queries to move the photo above the text below 760px, and a GSAP + ScrollTrigger entrance animation with reduced-motion support.`,
    },
  },

  'features-icon-grid': {
    keywords: ['features section template', 'feature grid html css', 'features section with icons', 'saas features section', 'landing page features block'],
    about: {
      title: 'Icon Grid Features — Free Features Section Template With Icons',
      description: `**Icon Grid Features** is the features section almost every landing page needs: a short eyebrow, a centred heading and intro, then a grid of cards that each pair an icon with a title, a sentence of detail and an optional "learn more" link. It turns a long list of capabilities into something visitors can scan in seconds.

**Add, remove and reorder cards**

Cards are a list, not fixed slots. Add as many as you need (up to twelve), duplicate one to start the next, move cards up or down, and remove the ones you don't need. Each card has its own icon, chosen from 60 clean line icons from the open-source Lucide set, its own text and its own optional link, which hides itself when you leave it empty.

**One theme, every section**

Colours, fonts, corner radius and content width come from the theme shared by every section in the library, so this grid matches the hero above it and the pricing below. Icons take the brand colour automatically on a soft tinted tile.

**Responsive and animated**

Three columns on wide screens, two on tablets and one on phones, using CSS container queries, so the grid responds to the space it actually has. With GSAP, the heading can reveal word by word (SplitText) and the cards stagger in once as the section scrolls into view; content stays visible without JavaScript and motion turns off for people who prefer it.

**Export anywhere**

Copy one HTML file, download a ZIP, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). Need single cards instead of a whole section? Browse the [UI Snippets](/ui-snippets/) library.`,
    },
    features: [
      'Eyebrow, centred heading with *brand highlights* and intro text',
      'Feature cards as a list: add, duplicate, reorder and remove (up to 12)',
      'Choose each card’s icon from 60 Lucide line icons',
      'Optional per-card link that hides itself when empty',
      'Three, two or one columns via container queries',
      'Soft hover lift on cards; icons tinted in the brand colour',
      'GSAP SplitText headline reveal plus staggered card entrance',
      'Shared theme tokens: colours, fonts, radius and width',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '▦', title: 'Scannable in seconds', desc: 'Icons and short titles let visitors find the benefit they care about without reading every word.' },
      { icon: '±', title: 'As many cards as you need', desc: 'Three, six or nine features: the list grows and shrinks and the grid reflows to fit.' },
      { icon: '◐', title: 'On-brand automatically', desc: 'Icons, links and highlights take your brand colour, and fonts follow the shared theme.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS feature overview', desc: 'Place it under your hero to summarise the six things your product does best, with a link from integrations or security to deeper pages.' },
      { icon: '🏢', title: 'Agency services list', desc: 'List services such as design, development, SEO and support as cards, each linking to its own service page, so prospects see the full offer at a glance.' },
      { icon: '🛍️', title: 'Store benefits strip', desc: 'Use three cards for free delivery, easy returns and secure payment with truck, refresh and lock icons to reassure shoppers before they buy.' },
      { icon: '🎓', title: 'Course or event highlights', desc: 'Show what attendees get, such as live sessions, certificates and community access, with icons that make each benefit easy to remember.' },
    ],
    faqs: [
      { q: 'How many feature cards can I add?', a: 'Up to twelve. Use + Add card to add one, the duplicate button to copy an existing card, the arrows to reorder and the cross to remove. The grid shows three per row on desktop, two on tablets and one on phones.' },
      { q: 'Can I use my own icons?', a: 'In the editor you can pick from 60 Lucide line icons. After exporting, each icon is an inline SVG, so you can replace it with any SVG icon, an emoji or an image in the HTML, React or Vue code.' },
      { q: 'Is it responsive?', a: 'Yes. It uses CSS container queries, so the grid adapts to the width of the element it sits in: three columns when there is room, then two, then one.' },
      { q: 'How does the animation work?', a: 'With GSAP: the heading reveals word by word using SplitText, then the cards stagger in once when the section scrolls into view. You can change the text effect, the entrance effect and the speed, or turn animation off.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt this section: rewrite the six features for your product, turn the cards into a Next.js component that maps over an array, or add a "compare plans" link to each card.',
      prompt: `Create a responsive features section in plain HTML and CSS.

- A centred header: small uppercase eyebrow, a large heading with one highlighted phrase in the brand colour, and an intro paragraph.
- Below it a grid of six cards; each card has a 48px rounded icon tile tinted with the brand colour (inline SVG line icon), a title, one or two sentences of text and an optional "learn more" link.
- CSS custom properties for colours, fonts, radius and max width; container queries for 3, 2 and 1 columns.
- A GSAP animation: SplitText reveals the heading word by word, then the cards stagger in once with ScrollTrigger; respect prefers-reduced-motion and keep content visible without JavaScript.`,
    },
  },

  'features-split-image': {
    keywords: ['feature section with image', 'split feature section', 'image and text section html', 'product feature section', 'feature list with screenshot'],
    about: {
      title: 'Split Features With Image — Free Feature Section Template',
      description: `**Split Features With Image** explains one part of your product properly: a heading and intro, a short list of icon-led points and a button on one side, and a framed screenshot on the other. Where an icon grid gives the overview, this layout goes deep on a single topic, such as reporting, automation or security.

**Points you can rearrange**

The feature list is editable: up to six points, each with its own icon, title and sentence of detail. Add, duplicate, reorder or remove points, switch the button on or off, and upload your own screenshot, which is resized in your browser and never sent to a server.

**Designed to stack**

On wide screens the copy and image sit side by side; on tablets and phones the image moves above the text so visitors see the product first. It responds to its own width through container queries, so it also works inside narrower page layouts.

**Animated with GSAP**

The heading reveals with a SplitText effect, the points stagger in and the screenshot rises into place once as the section scrolls into view, with reduced-motion support built in.

**Pairs with the rest of the library**

The shared theme means it matches the heroes and other feature sections. Use several of them in a row, one per product area, or try the [Alternating Feature Rows](/website-section-templates/features-alternating/) for a ready-made zig-zag. Export HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Two-column layout: heading, points and button beside a framed screenshot',
      'Up to 6 feature points, each with an icon, title and text',
      'Add, duplicate, reorder and remove points',
      'Button with its own link, switchable on or off',
      'Upload a screenshot or paste an image URL',
      'Image moves above the text on narrow widths',
      'GSAP headline text effect, staggered points and rising image',
      'Shared theme tokens; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '⇆', title: 'Explain one thing well', desc: 'A focused heading, three to five points and a screenshot sell a single feature better than a long list.' },
      { icon: '▤', title: 'Easy to repeat', desc: 'Stack several, one per product area, with different screenshots and colours from the same theme.' },
      { icon: '📱', title: 'Image first on phones', desc: 'On narrow screens the screenshot moves on top, so mobile visitors see the product before the copy.' },
    ],
    useCases: [
      { icon: '📊', title: 'Product area deep dive', desc: 'Give reporting, automation or security its own section with a real screenshot and three concrete benefits, linking to the full feature page.' },
      { icon: '🧭', title: 'Feature landing page', desc: 'Use it as the main body of a page built for one search term, such as "project reporting software", with a sign-up button below the points.' },
      { icon: '📱', title: 'Mobile app showcase', desc: 'Swap the screenshot for an app screen, list the three things the app does best and point the button to your App Store page.' },
      { icon: '🧑‍💼', title: 'Service explainer', desc: 'Agencies and consultants can show a deliverable, like a dashboard or report, next to the steps included in the service.' },
    ],
    faqs: [
      { q: 'Can I put the image on the left?', a: 'In the editor the image sits on the right on desktop and on top on phones. After exporting, add order:-1 to .fs-media in the CSS to move it to the left, or use the Alternating Feature Rows section, which alternates sides for you.' },
      { q: 'What image size works best?', a: 'About 1200×900 px. Uploads are resized in your browser to a maximum of 1600 px wide and PNG transparency is kept, so screenshots stay sharp.' },
      { q: 'How many points can I add?', a: 'Up to six. Three to four usually reads best; use the arrows to put your strongest point first.' },
      { q: 'Does it work in React or Vue?', a: 'Yes. Export a React component (JSX with its CSS) or a Vue single-file component; the GSAP animation runs after the component mounts.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the split feature section: change the copy for your product, add a tabbed version with three screenshots, or convert it to a reusable component with an image-side prop.',
      prompt: `Create a two-column feature section in HTML and CSS.

- Left: eyebrow, heading with a highlighted phrase, intro paragraph, a list of three feature points (icon tile, bold title, one sentence), and a button.
- Right: a product screenshot in a rounded white frame with a soft brand-tinted panel behind it.
- CSS custom properties for the theme; container queries stack the columns below 860px with the image first.
- GSAP: SplitText heading reveal, staggered points and a rising image once with ScrollTrigger, respecting prefers-reduced-motion.`,
    },
  },

  'features-bento': {
    keywords: ['bento grid section', 'bento grid html css', 'bento box layout template', 'bento features section', 'dark features section'],
    about: {
      title: 'Bento Grid Features — Free Bento Box Section Template',
      description: `**Bento Grid Features** brings the bento box layout, made famous by Apple and now everywhere in AI and developer products, to your landing page. Cards of different sizes fit together in a tidy mosaic on a dark background with a soft brand glow: a large card for your headline feature with a screenshot, and smaller cards for the supporting ones.

**A grid that arranges itself**

You never place cards by hand. The layout follows a five-card pattern (one wide, two small, two medium) that repeats as you add more, and a card with an image stretches taller automatically. Add up to ten cards, give each an icon, title, text and optional image, and reorder them to change which one gets the big tile.

**Dark by default, any theme you like**

It ships in a deep violet-on-black theme, but every colour is a theme token: switch to a light preset, use your brand kit, or set exact colours. Card backgrounds blend the surface and brand colours, so they always match.

**Responsive and animated**

On tablets the first card spans the full width and the rest sit two by two; on phones every card stacks. With GSAP, the heading reveals word by word and the cards stagger in once on scroll.

**Export it**

Download HTML or a ZIP with your images, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). For a lighter, uniform layout, see [Icon Grid Features](/website-section-templates/features-icon-grid/).`,
    },
    features: [
      'Bento mosaic: a five-card pattern that repeats as you add cards',
      'Up to 10 cards, each with an icon, title, text and optional image',
      'Cards with an image stretch taller automatically',
      'Dark theme with a brand-coloured glow; switch to any preset',
      'Reorder cards to choose which gets the large tile',
      'Two columns on tablets, one on phones (container queries)',
      'GSAP SplitText heading and staggered card entrance',
      'Export HTML, a ZIP with images, React or Vue',
    ],
    why: [
      { icon: '▣', title: 'Modern at a glance', desc: 'The bento layout instantly signals a current, well-designed product, especially for AI and developer tools.' },
      { icon: '⚖', title: 'Hierarchy built in', desc: 'One large tile for the headline feature and smaller tiles for the rest guide the eye without extra copy.' },
      { icon: '⇲', title: 'No manual placement', desc: 'The grid pattern handles sizes and positions, so adding or reordering cards never breaks the layout.' },
    ],
    useCases: [
      { icon: '🤖', title: 'AI product homepage', desc: 'Lead with your main capability and a screenshot in the large tile, then show speed, security, integrations and platforms in the small cards.' },
      { icon: '🧑‍💻', title: 'Developer tool features', desc: 'Show the CLI, API, dashboard and integrations as a bento grid on a dark theme that suits a developer audience.' },
      { icon: '📦', title: 'Product launch highlights', desc: 'Summarise what is new in a release, with the biggest change in the wide tile and the smaller improvements around it.' },
      { icon: '🎨', title: 'Portfolio or studio skills', desc: 'Designers and studios can show their main service with a project image and their other skills in the smaller tiles.' },
    ],
    faqs: [
      { q: 'What is a bento grid?', a: 'A layout of cards in different sizes that fit together like the compartments of a Japanese bento box. It shows a clear hierarchy (one big feature, several smaller ones) and has become a popular way to present product features.' },
      { q: 'How do I make a card bigger?', a: 'The first card of every five gets the wide tile, and adding an image to it makes it taller. Move a card to the top with the arrows to give it the big tile.' },
      { q: 'Can I use a light background?', a: 'Yes. Pick a light colour preset in Colours or apply your brand kit. Card backgrounds are mixed from the surface and brand colours, so they adapt to any theme.' },
      { q: 'Is the bento grid responsive?', a: 'Yes. It uses CSS grid with container queries: six columns on desktop, two on tablets with the first card full width, and one column on phones.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the bento grid: add a video tile, make one card a live stats counter, or convert it into a React component that takes an array of cards.',
      prompt: `Create a bento grid features section in HTML and CSS on a dark background.

- A centred header with an eyebrow and a heading with one highlighted phrase.
- A 6-column CSS grid of cards following a repeating five-card pattern: first card spans 4 columns (and 2 rows if it has an image), next two span 2, last two span 3.
- Each card: icon tile, title, short text, optional screenshot that bleeds to the card's bottom-right corner.
- Container queries: 2 columns (first card full width) below 900px, 1 column below 560px.
- GSAP: SplitText heading reveal and staggered card entrance with ScrollTrigger, respecting prefers-reduced-motion.`,
    },
  },

  'features-alternating': {
    keywords: ['alternating features section', 'zig zag layout template', 'image text alternating section', 'feature rows html css', 'zigzag section design'],
    about: {
      title: 'Alternating Feature Rows — Free Zig-Zag Section Template',
      description: `**Alternating Feature Rows** is the zig-zag layout used on countless product pages: rows of text and image that swap sides as you scroll, so a long page keeps its rhythm. Each row has a small label, a heading, a paragraph, a checklist of benefits, an optional link and its own image.

**Rows you control**

Add up to eight rows, duplicate a row to start the next, and reorder them with the arrows; the sides alternate automatically, so you never have to set them. Bullet points are typed one per line and get brand-coloured check marks. Leave the label, bullets or link empty and they hide themselves.

**Your screenshots**

Upload a screenshot for every row (resized in your browser and saved on your device) or paste image URLs. Images sit on a soft tinted panel with a gentle shadow that works with any screenshot.

**Responsive and animated**

On tablets and phones each row stacks with the image on top. With GSAP, the section heading reveals word by word, the text in each row staggers in and the images rise into place once on scroll.

**Fits with the rest**

The shared theme keeps colours and fonts consistent with your hero and other sections. For a single topic with a point list, use [Split Features With Image](/website-section-templates/features-split-image/). Export HTML, a ZIP with all your images, React or Vue, or fork into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Zig-zag rows that alternate image left and right automatically',
      'Up to 8 rows: add, duplicate, reorder and remove',
      'Each row: label, heading, text, bullet list, link and image',
      'Bullets typed one per line, with brand-coloured check marks',
      'Optional parts hide themselves when left empty',
      'Section heading can be switched off',
      'Rows stack with the image on top on narrow widths',
      'GSAP heading effect, staggered copy and rising images',
    ],
    why: [
      { icon: '⇄', title: 'Keeps long pages moving', desc: 'Alternating sides give a long page rhythm, so visitors keep scrolling through every feature.' },
      { icon: '🖼', title: 'One picture per point', desc: 'Every row has its own screenshot, so each claim is backed by what the product actually looks like.' },
      { icon: '✔', title: 'Benefits, not just features', desc: 'The checklist under each heading turns a feature into three concrete reasons to care.' },
    ],
    useCases: [
      { icon: '🧭', title: 'Product tour page', desc: 'Walk visitors through plan, build and report in three rows, each with a screenshot and a link to the full feature page.' },
      { icon: '🏠', title: 'Homepage body', desc: 'Follow your hero with two or three alternating rows that cover the main jobs your product does, then add pricing and a call to action.' },
      { icon: '🛠️', title: 'Service process', desc: 'Agencies can describe discovery, design and launch as rows with project images and the deliverables of each phase as bullets.' },
      { icon: '🏫', title: 'Course curriculum', desc: 'Show each module as a row with a preview image and the lessons it covers as bullet points.' },
    ],
    faqs: [
      { q: 'How do the rows alternate?', a: 'Every second row puts its image on the left, automatically, with the CSS selector :nth-child(even). Reordering or adding rows keeps the pattern without any settings.' },
      { q: 'How do I add bullet points?', a: 'Type them in the Bullet points box, one per line. Each line becomes a list item with a check mark in your brand colour. Leave the box empty to hide the list.' },
      { q: 'What happens on mobile?', a: 'Each row stacks into one column with the image above the text, using container queries, so the section adapts to the width it has.' },
      { q: 'Are my images included in the export?', a: 'Yes. The single HTML file embeds uploaded images, and the ZIP puts them in an images folder next to index.html.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the zig-zag section: write the three rows for your product, add a video to one row, or turn the rows into a data-driven React component.',
      prompt: `Create an alternating (zig-zag) feature section in HTML and CSS.

- A centred header with eyebrow and heading, then rows with two columns: text (pill label, heading with a highlighted phrase, paragraph, a checklist with brand-coloured check icons, a "learn more" link) and an image on a soft tinted panel.
- Every even row swaps sides with :nth-child(even); container queries stack rows below 860px with the image first.
- CSS custom properties for the theme.
- GSAP + ScrollTrigger: heading SplitText reveal, staggered text and rising images, respecting prefers-reduced-motion.`,
    },
  },

  'features-steps': {
    keywords: ['how it works section', 'how it works template', 'process steps section html', 'numbered steps css', '3 step process section'],
    about: {
      title: 'How It Works Steps — Free Process Section Template',
      description: `**How It Works Steps** explains a process in a few numbered steps, so visitors know exactly what happens after they click sign up. Each step has a number badge, an icon, a title and a short description; dashed connector lines join the steps, and a button with a reassurance note invites people to begin.

**Steps that number themselves**

Steps are an editable list of two to six. Add, duplicate, reorder or remove them and the numbers update automatically (they come from a CSS counter, not typed text). Choose each step's icon from 60 Lucide line icons.

**Clear on every screen**

On desktop the steps sit in a row with horizontal connectors; on phones they stack with short vertical connectors between them. The layout uses container queries, so it adapts to the space it's given.

**Animated with GSAP**

The heading reveals with a SplitText effect and the steps stagger in from left to right once the section scrolls into view, which reinforces the idea of moving through a sequence.

**Ready to convert**

Switch the button and note on or off, link the button to your sign-up page and use the note for reassurance like "No credit card required". Export HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a broader overview, pair it with [Icon Grid Features](/website-section-templates/features-icon-grid/).`,
    },
    features: [
      '2 to 6 numbered steps that renumber themselves',
      'Number badge, icon, title and text for every step',
      'Dashed connectors: horizontal on desktop, vertical on phones',
      'Button and reassurance note, switchable on or off',
      'Pick each step’s icon from 60 Lucide icons',
      'Warm cream theme by default; any preset or brand kit',
      'GSAP SplitText heading and left-to-right step entrance',
      'Export HTML, a ZIP, React or Vue, or fork to My Code',
    ],
    why: [
      { icon: '①', title: 'Removes uncertainty', desc: 'Showing the steps ahead lowers the effort people expect, which makes signing up feel easier.' },
      { icon: '#', title: 'Numbers stay correct', desc: 'A CSS counter numbers the steps, so reordering or adding steps never leaves a wrong number behind.' },
      { icon: '→', title: 'Ends with an action', desc: 'The button and note right under the steps turn understanding into a sign-up.' },
    ],
    useCases: [
      { icon: '🆕', title: 'SaaS onboarding', desc: 'Show create account, connect tools and invite your team as three steps, with a free sign-up button and a "no credit card" note.' },
      { icon: '🧑‍🔧', title: 'Service booking', desc: 'Explain book a call, get a quote and we do the work for agencies, cleaners, tradespeople or consultants, with a booking link on the button.' },
      { icon: '🛒', title: 'Marketplace or delivery app', desc: 'Show browse, order and receive with icons for search, cart and delivery so first-time customers know what to expect.' },
      { icon: '🎟️', title: 'Event registration', desc: 'Walk attendees through register, get your ticket and join on the day, with the button linking to the registration form.' },
    ],
    faqs: [
      { q: 'How many steps can I have?', a: 'Between two and six. Three is the most common and reads best in one row; with five or six, consider shorter text so each column stays balanced.' },
      { q: 'How are the steps numbered?', a: 'With a CSS counter on the ordered list, so numbers are always correct after you add, remove or reorder steps. The list is a real <ol>, which also helps screen readers.' },
      { q: 'What does it look like on mobile?', a: 'Steps stack vertically and the dashed connector becomes a short vertical line between them, using container queries.' },
      { q: 'Can I remove the button?', a: 'Yes. Switch the Button group off in the panel and the button and note disappear; leave the note empty to show the button alone.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the steps: write steps for your onboarding, add a screenshot under each step, or animate the connector line drawing itself with GSAP DrawSVG.',
      prompt: `Create a "How it works" section in HTML and CSS.

- A centred header with eyebrow, heading with a highlighted phrase and intro.
- An ordered list of three steps in a row; each step has a 72px rounded badge with an icon and a small circular number badge (from a CSS counter), a title and short text, with dashed connector lines between steps.
- A centred button with a small note under it.
- Container queries stack the steps below 760px with vertical connectors; CSS custom properties for the theme.
- GSAP: SplitText heading reveal and staggered step entrance with ScrollTrigger, respecting prefers-reduced-motion.`,
    },
  },

  'pricing-three-tier': {
    keywords: ['pricing section template', 'pricing table html css', 'saas pricing page template', 'monthly yearly pricing toggle', '3 tier pricing table'],
    about: {
      title: 'Three-Tier Pricing — Free Pricing Table Template With Toggle',
      description: `**Three-Tier Pricing** is the pricing layout most SaaS products use: three plan cards side by side, the middle one highlighted with a "Most popular" badge, and a monthly/yearly switch above them. Each card has a plan name, a line about who it's for, the price, a button and a checklist of what's included.

**A billing switch that feels good**

Click Yearly and every price changes at once. The highlight pill slides across with GSAP Flip, and the new prices roll into place. It's built for real use: the buttons say which option is selected (aria-pressed), it works without GSAP (prices still switch instantly) and the animation is skipped for people who prefer reduced motion. Turn the switch off for one-price plans.

**Plans you can edit**

Plans are a list: add a fourth, remove one, reorder or duplicate them. Type the monthly and yearly price for each, its features one per line, and its button text and link. Any plan with a badge gets the highlighted border and the filled button; the others get outline buttons. A price note such as "free forever" or "tailored to your team" replaces the /month suffix for free and custom plans.

**Theme, motion and exports**

Colours, fonts and corner radius come from the shared theme, so the table matches your hero and features. The heading reveals with SplitText and the cards stagger in on scroll. Export a single HTML file, a ZIP, a React or Vue component (the switch and its animation included), or fork into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Three plan cards with a highlighted "Most popular" plan',
      'Monthly/yearly switch: GSAP Flip pill and rolling price change',
      'Accessible switch (aria-pressed) that works without JavaScript animation',
      'Plans as a list: add up to 4, duplicate, reorder, remove',
      'Monthly and yearly price per plan, features one per line',
      'Price note replaces the suffix for free or custom plans',
      'Optional note under the plans for trials, currency or taxes',
      'Container-query layout: three columns down to one',
      'Export HTML, a ZIP, React or Vue with the switch included',
    ],
    why: [
      { icon: '★', title: 'Guides the choice', desc: 'A highlighted middle plan anchors the decision, which is why three tiers with a "Most popular" badge is the SaaS standard.' },
      { icon: '⇄', title: 'Yearly savings, visible', desc: 'The switch and its "Save 20%" badge show the yearly discount without cluttering the cards.' },
      { icon: '✓', title: 'Works for real', desc: 'The switch ships as tiny, dependency-light JavaScript that works in HTML, React and Vue exports.' },
    ],
    useCases: [
      { icon: '💳', title: 'SaaS pricing page', desc: 'Show Free, Pro and Business plans with monthly and yearly prices, the trial terms in the note and a "Contact sales" button on the top tier.' },
      { icon: '🎓', title: 'Course or membership tiers', desc: 'Offer basic, plus and premium access with the lessons, community and coaching each includes listed as features.' },
      { icon: '🧰', title: 'Service packages', desc: 'Freelancers can turn the plans into starter, standard and premium packages and switch the billing toggle off for one-off prices.' },
      { icon: '📱', title: 'App subscription screen', desc: 'Use it on an app’s website to compare free and paid tiers, highlighting the plan you most want people to choose.' },
    ],
    faqs: [
      { q: 'How does the monthly/yearly toggle work?', a: 'Clicking Yearly adds an is-yearly class to the section, and CSS shows the yearly prices instead of the monthly ones. GSAP Flip slides the highlight pill to the clicked option and the new prices roll in. Without GSAP the prices still switch, just without animation.' },
      { q: 'Can I have only monthly prices?', a: 'Yes. Switch off the Monthly / yearly switch group and only the monthly price and suffix are shown.' },
      { q: 'How do I highlight a plan?', a: 'Type anything in a plan’s Highlight badge field, such as "Most popular" or "Best value". That plan gets the brand border, the badge and a filled button.' },
      { q: 'Does the toggle work in React and Vue?', a: 'Yes. The exported component includes the switch script and loads GSAP and the Flip plugin from a CDN after it mounts.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the pricing table: connect the buttons to Stripe Checkout, add a currency selector, or show the yearly total under each yearly price.',
      prompt: `Create a responsive three-tier pricing section in HTML, CSS and JavaScript.

- Centred header with eyebrow, heading and intro, then a pill-shaped Monthly / Yearly switch (two buttons with aria-pressed and a "Save 20%" badge).
- Three plan cards: name, description, price with a suffix, a full-width button and a checklist of features; the middle card is highlighted with a "Most popular" badge and a brand border.
- Each price has monthly and yearly versions; clicking the switch toggles an is-yearly class and CSS shows the right one.
- Animate the switch with GSAP Flip (move the highlight pill into the clicked button) and roll the new prices in; respect prefers-reduced-motion and work without GSAP.`,
    },
  },

  'pricing-dark-glow': {
    keywords: ['dark pricing section', 'pricing cards dark theme', 'gradient border pricing card', 'ai pricing page template', 'pricing section html css dark'],
    about: {
      title: 'Dark Glow Pricing — Free Dark Pricing Section Template',
      description: `**Dark Glow Pricing** is a pricing section for products with a dark, modern look, such as AI tools, developer platforms and creative apps. Plan cards sit on a deep background with a soft brand-coloured halo, and the recommended plan is wrapped in a glowing gradient border that draws the eye straight to it.

**Up to four plans**

Start with Hobby, Pro and Enterprise and add a fourth if you need it. Each plan has its own icon, name, description, monthly and yearly price, button and feature list. "Custom" pricing works too: add a price note such as "tailored to your team" and it replaces the /month suffix.

**The glow, in pure CSS**

The gradient border mixes your brand colour with cyan and pink, so it adapts when you change the theme. No images are involved, and switching to a light preset turns it into a bright, colourful border instead.

**Billing switch with GSAP Flip**

The monthly/yearly switch slides its pill with GSAP Flip and rolls the prices in. It's accessible, works without the animation and respects reduced-motion settings. Turn it off if your prices are monthly only.

**Animated and exportable**

The heading reveals with SplitText and the cards stagger in on scroll. Export HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a light version, see [Three-Tier Pricing](/website-section-templates/pricing-three-tier/).`,
    },
    features: [
      'Dark theme with a brand-coloured halo behind the plans',
      'Recommended plan wrapped in a glowing gradient border',
      'Up to 4 plans, each with icon, price, button and features',
      'Price notes for free and custom plans',
      'Monthly/yearly switch animated with GSAP Flip',
      'Gradient adapts to your brand colour and any theme preset',
      'SplitText heading and staggered card entrance',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '✦', title: 'Matches modern products', desc: 'Dark backgrounds and glowing accents are the visual language of AI and developer tools, and this section speaks it.' },
      { icon: '◎', title: 'Points to one plan', desc: 'The gradient border and halo make the recommended plan unmissable without shouting.' },
      { icon: '⚙', title: 'Handles "Custom"', desc: 'Enterprise plans with custom pricing show a note instead of a fake monthly figure.' },
    ],
    useCases: [
      { icon: '🤖', title: 'AI tool pricing', desc: 'Show credit-based tiers such as free, pro and enterprise, with credits per month as the first feature on each plan.' },
      { icon: '🧑‍💻', title: 'Developer platform', desc: 'Compare hobby, pro and team plans by projects, API limits and support level on a dark theme that suits a technical audience.' },
      { icon: '🎮', title: 'Creative or gaming app', desc: 'Use the glow and a vivid brand colour for subscription tiers of a design, music or gaming product.' },
      { icon: '🏢', title: 'Enterprise upsell', desc: 'Keep a "Custom" enterprise card with a "Talk to sales" button next to self-serve plans to capture larger customers.' },
    ],
    faqs: [
      { q: 'How is the glowing border made?', a: 'The card has 1px of padding over a linear gradient background mixed from your brand colour, and the inner panel sits on top, so only a thin gradient edge shows. A box-shadow in the brand colour adds the glow. It is all CSS.' },
      { q: 'Can I show "Custom" instead of a price?', a: 'Yes. Type Custom (or "Contact us") as the price and add a price note such as "tailored to your team"; the note replaces the /month suffix.' },
      { q: 'Can I use it on a light background?', a: 'Yes. Pick a light colour preset or apply your brand kit. The gradient border and halo use your brand colour, so they still work on light themes.' },
      { q: 'How many plans can I show?', a: 'Up to four. The grid fits them in one row on wide screens and wraps to fewer columns on smaller ones.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the dark pricing section: add a usage slider that updates the price, a feature comparison table below, or annual totals under each price.',
      prompt: `Create a dark pricing section in HTML, CSS and JavaScript.

- Near-black background with a soft radial glow in the brand colour behind the cards.
- Header with eyebrow, heading and a Monthly / Yearly pill switch.
- Three plan cards (icon tile, name, description, price with suffix or a note for custom pricing, button, feature checklist); the recommended card has a 1px gradient border (brand → cyan → pink) and a glowing shadow.
- The switch toggles an is-yearly class to swap prices; animate the pill with GSAP Flip and roll in the prices, respecting prefers-reduced-motion.`,
    },
  },

  'pricing-single-plan': {
    keywords: ['single plan pricing section', 'one price pricing page', 'simple pricing section html', 'pricing card with guarantee', 'course pricing section'],
    about: {
      title: 'Single Plan Pricing — Free One-Price Section Template',
      description: `**Single Plan Pricing** is for products that don't need tiers. Instead of three cards that make visitors compare, it puts everything that's included in a two-column checklist on the left and one confident price card on the right, with the plan name, a monthly/yearly switch, the price, a large button and a money-back guarantee.

**Built to convert**

One price removes the "which plan?" hesitation. The checklist shows the full value at a glance, the guarantee line lowers the risk and the large button makes the next step obvious. Leave the guarantee empty to hide it, or switch off the billing toggle for a single price.

**Edit in seconds**

Type the included items one per line and they flow into two columns (one on phones). Set the plan name, the line under it, both prices, the button text and its link to your checkout page. The monthly/yearly switch slides with GSAP Flip and the price rolls over when it changes.

**Theme and motion**

It ships in a calm teal theme; switch presets, set exact colours or apply your brand kit. The heading reveals with SplitText, the checklist fades up and the price card rises in on scroll.

**Export it**

Download HTML or a ZIP, copy a React or Vue component with the switch included, or fork it into [My Code](/ui-snippets/mycode/). Need tiers after all? Try [Three-Tier Pricing](/website-section-templates/pricing-three-tier/).`,
    },
    features: [
      'Two columns: everything-included checklist and one price card',
      'Included items typed one per line, shown in two columns',
      'Plan name, sub-line, price, big button and guarantee line',
      'Monthly/yearly switch with GSAP Flip, or switch it off',
      'Shield icon guarantee line that hides when empty',
      'Stacks into one column on narrow widths',
      'SplitText heading, fading checklist and rising price card',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '1', title: 'No comparison needed', desc: 'One plan removes decision fatigue, so visitors focus on whether they want it, not which version.' },
      { icon: '☑', title: 'Shows the full value', desc: 'A long, scannable list of what is included makes a single price feel generous.' },
      { icon: '🛡', title: 'Lowers the risk', desc: 'The guarantee line right under the button answers the last objection before checkout.' },
    ],
    useCases: [
      { icon: '🛠️', title: 'Indie product or tool', desc: 'Solo founders with one plan can list every feature, show the monthly and yearly price and link straight to checkout.' },
      { icon: '🎓', title: 'Online course', desc: 'List the modules, bonuses and community access as included items and use the guarantee line for your refund policy.' },
      { icon: '👥', title: 'Community or membership', desc: 'Show what members get, such as events, resources and a private forum, with monthly or yearly membership pricing.' },
      { icon: '🚀', title: 'Launch or lifetime deal', desc: 'Turn off the billing switch, set a one-off price and use the sub-line for "Launch price, ends Friday".' },
    ],
    faqs: [
      { q: 'Can I show a one-off price?', a: 'Yes. Switch off the Monthly / yearly switch group, set the monthly price to your one-off price and change the price suffix to something like "one-time payment".' },
      { q: 'How many included items can I list?', a: 'As many as you like; type one per line. Eight items fill two balanced columns, and the list drops to one column on phones.' },
      { q: 'Where should the button link?', a: 'Usually to your checkout page, such as Stripe Checkout, Lemon Squeezy, Gumroad or Paddle, or to your sign-up page for a free trial.' },
      { q: 'Does the price switch work in exports?', a: 'Yes. HTML, ZIP, React and Vue exports all include the small switch script, and GSAP with the Flip plugin loads from a CDN for the animation.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the single-plan section: add a countdown for a launch price, a testimonial under the card, or a Stripe Checkout button.',
      prompt: `Create a single-plan pricing section in HTML, CSS and JavaScript.

- Left: eyebrow, heading with a highlighted phrase, intro paragraph and an "Everything included" checklist in two columns.
- Right: a centred price card with plan name, a sub-line, a Monthly / Yearly pill switch, a large price, a full-width button and a guarantee line with a shield icon.
- The switch toggles an is-yearly class to swap prices; animate it with GSAP Flip and roll the price in; respect prefers-reduced-motion.
- Container queries stack the columns below 860px.`,
    },
  },

  'pricing-rows': {
    keywords: ['pricing list section', 'horizontal pricing table', 'service packages pricing html', 'agency pricing section', 'pricing rows template'],
    about: {
      title: 'Pricing List Rows — Free Horizontal Pricing Section Template',
      description: `**Pricing List Rows** lays plans out as horizontal rows instead of side-by-side cards. Each row has the plan name and description, a few highlight chips, the price and a button, so there's room for longer names, bigger prices and more plans than a card grid can hold comfortably. One featured row gets a badge and a brand border.

**Made for packages**

It suits agencies, freelancers and service businesses particularly well: one-off packages like "Launch" and "Growth" can show "one-off" instead of "/month", while a retainer or care plan uses the monthly/yearly switch. Highlights are typed one per line and appear as chips.

**Up to six rows**

Add, duplicate, reorder or remove rows. Columns line up from row to row on desktop; on tablets the chips and button move below the name and price, and on phones everything stacks.

**Billing switch and motion**

The switch sits beside the left-aligned heading and slides with GSAP Flip, rolling in the yearly prices. The heading reveals with SplitText and the rows stagger in on scroll. Switch the toggle off if every price is one-off.

**Export it**

Download HTML or a ZIP, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For product plans as cards, see [Three-Tier Pricing](/website-section-templates/pricing-three-tier/).`,
    },
    features: [
      'Plans as horizontal rows: name, chips, price and button',
      'Featured row with a badge and brand border',
      'Highlights typed one per line, shown as chips',
      'Price notes such as "one-off" or "per project"',
      'Up to 6 rows: add, duplicate, reorder and remove',
      'Monthly/yearly switch beside the heading, animated with GSAP Flip',
      'Aligned columns on desktop; stacks on tablets and phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '☰', title: 'Room for detail', desc: 'Rows give long names, large prices and highlight chips space that narrow cards can’t.' },
      { icon: '↕', title: 'Scales to more plans', desc: 'Five or six packages read comfortably as a list, where five cards would be cramped.' },
      { icon: '🧾', title: 'One-off and recurring', desc: 'Mix fixed-price packages and monthly plans in one list with price notes.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Agency packages', desc: 'List launch, growth and care-plan packages with what each includes as chips and a "Book a call" button on every row.' },
      { icon: '🧑‍🏫', title: 'Coaching or consulting', desc: 'Offer a single session, a monthly programme and a VIP day as rows, with session counts and extras as highlights.' },
      { icon: '🔌', title: 'Add-ons and extras', desc: 'Show optional add-ons such as extra storage, seats or priority support as rows under your main plans.' },
      { icon: '📸', title: 'Photography or events', desc: 'Price half-day, full-day and wedding packages with hours, photos delivered and extras shown as chips.' },
    ],
    faqs: [
      { q: 'When should I use rows instead of cards?', a: 'When plans have long names or prices, when you have more than four options, or when you sell packages and services rather than software tiers. Rows also read well on phones.' },
      { q: 'Can a row have a one-off price?', a: 'Yes. Add a price note such as "one-off" or "per project" and it replaces the /month suffix for that row, in both monthly and yearly views.' },
      { q: 'How do I highlight a row?', a: 'Type text such as "Best value" in the row’s Highlight badge field; the row gets the badge, a brand border and a filled button.' },
      { q: 'How does it look on mobile?', a: 'Each row becomes a card with the name and description, then the price, the highlight chips and a full-width button.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the pricing rows: add an add-ons table below, a "compare" checkbox per row, or an enquiry form that opens from each button.',
      prompt: `Create a pricing section with plans as horizontal rows in HTML, CSS and JavaScript.

- Top: a left-aligned header (eyebrow, heading, intro) with a Monthly / Yearly pill switch on the right.
- Rows with four aligned columns: plan name (with an optional badge) and description, highlight chips, price with a suffix or a note like "one-off", and a button; the featured row has a brand border and filled button.
- Container queries: two columns below 980px (chips and button below), one column below 560px.
- The switch toggles an is-yearly class; animate it with GSAP Flip and roll in the prices; respect prefers-reduced-motion.`,
    },
  },

  'testimonials-grid': {
    keywords: ['testimonials section template', 'testimonial grid html css', 'wall of love section', 'customer reviews section', 'masonry testimonials'],
    about: {
      title: 'Testimonial Wall — Free Masonry Testimonials Section Template',
      description: `**Testimonial Wall** is the "wall of love" layout that SaaS and creator products use to show lots of social proof at once. A heading and a rating summary pill sit above a masonry wall of quote cards: short quotes and long ones fit together without gaps, so every testimonial reads naturally at its real length.

**Quotes of any length**

The wall uses CSS columns, so a one-line quote and a five-line story sit side by side without awkward empty space. Every few cards get a faint brand tint, which keeps a big wall from looking repetitive.

**Up to twelve testimonials**

Each card has the quote, the person's name, their role and company, an optional photo and optional five-star rating (switch stars off for the whole section). Add, duplicate, reorder and remove testimonials; upload real customer photos, which are resized in your browser and kept on your device, or leave the photo empty to hide it.

**Responsive and animated**

Three columns on desktop, two on tablets and one on phones. The heading reveals with GSAP SplitText and the cards stagger in as the section scrolls into view.

**Export it**

Download HTML or a ZIP with your photos, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). For a slider instead of a wall, use the [Testimonial Carousel](/website-section-templates/testimonials-carousel/).`,
    },
    features: [
      'Masonry "wall of love" that fits quotes of any length',
      'Heading with a rating summary pill',
      'Up to 12 testimonials: add, duplicate, reorder, remove',
      'Quote, name, role, optional photo and five-star rating',
      'Upload customer photos or leave them out',
      'Three, two or one columns depending on width',
      'GSAP SplitText heading and staggered card entrance',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '❤', title: 'Volume builds trust', desc: 'Many voices at once tell visitors that lots of real people use and like the product.' },
      { icon: '▥', title: 'No awkward gaps', desc: 'The masonry layout lets short and long quotes sit together naturally, without trimming them.' },
      { icon: '★', title: 'Scannable proof', desc: 'Stars, faces and job titles let visitors spot people like themselves in seconds.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS homepage proof', desc: 'Place it before your pricing so visitors see six real customers, with job titles, just before they decide on a plan.' },
      { icon: '🎓', title: 'Course or cohort reviews', desc: 'Collect student quotes after each cohort and show the best twelve with their photos and what they do now.' },
      { icon: '🧑‍💼', title: 'Freelancer client feedback', desc: 'Show what clients said about working with you, with their company names, on your portfolio or services page.' },
      { icon: '🛍️', title: 'Product reviews page', desc: 'Use the rating summary for your average score and the wall for a selection of detailed customer reviews.' },
    ],
    faqs: [
      { q: 'How does the masonry layout work?', a: 'It uses CSS multi-column layout (columns: 3 300px) with break-inside: avoid on each card, so cards flow down each column and pack tightly whatever their length. No JavaScript is needed.' },
      { q: 'Can I hide the photos or stars?', a: 'Yes. Leave a testimonial’s photo empty to hide it, and switch Star ratings off to remove the stars from every card.' },
      { q: 'How many testimonials should I show?', a: 'Six to nine works well on a homepage. Up to twelve fit; for more, link to a dedicated reviews page.' },
      { q: 'Are photos included in the export?', a: 'Yes. The single HTML file embeds uploaded photos and the ZIP puts them in an images folder.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the testimonial wall: load testimonials from a JSON file, add a "Load more" button, or link each card to the original tweet or review.',
      prompt: `Create a "wall of love" testimonials section in HTML and CSS.

- Centred header: eyebrow, heading with a highlighted phrase and a small pill with the average rating.
- A masonry wall using CSS columns (3 columns, min 300px) of cards: five gold stars, the quote in a blockquote, and a figcaption with a round photo, name and role.
- Every third card gets a faint brand-coloured tint; CSS custom properties for the theme.
- GSAP: SplitText heading reveal and staggered card entrance with ScrollTrigger, respecting prefers-reduced-motion.`,
    },
  },

  'testimonials-carousel': {
    keywords: ['testimonial slider html css', 'testimonial carousel template', 'draggable carousel gsap', 'reviews slider section', 'swipe testimonials'],
    about: {
      title: 'Testimonial Carousel — Free Draggable Testimonial Slider Template',
      description: `**Testimonial Carousel** shows your best quotes in a row that visitors can drag, swipe or step through. A left-aligned heading sits beside round arrow buttons, and the quote cards run off the edge of the section, hinting that there's more to see.

**Feels great to use**

On desktop, drag with the mouse and the row glides with momentum and settles on the nearest card, powered by GSAP Draggable and InertiaPlugin. The arrows ease from card to card with GSAP ScrollToPlugin and disable themselves at either end. On phones and tablets it uses native touch scrolling with CSS scroll-snap, so it feels like any other app.

**Built on real scrolling**

Underneath it's an ordinary scrollable row, so it works without JavaScript, with a trackpad and with the keyboard (the row is focusable and labelled for screen readers). GSAP adds the drag and easing on top; with reduced motion turned on, the arrows jump without animating.

**Edit and export**

Add up to twelve testimonials with quotes, names, roles, photos and optional stars, and reorder them so the strongest comes first. The heading reveals with SplitText and the cards stagger in on scroll. Export HTML, a ZIP, React or Vue (the carousel script and GSAP plugins included), or fork into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Draggable row with momentum and snap (GSAP Draggable + Inertia)',
      'Arrow buttons that ease card to card (ScrollToPlugin) and disable at the ends',
      'Native touch scrolling with CSS scroll-snap on phones',
      'Works without JavaScript; keyboard and screen-reader friendly',
      'Up to 12 testimonials with photo, name, role and stars',
      'Left-aligned heading beside the arrows; stacks on phones',
      'SplitText heading and staggered card entrance',
      'Export HTML, a ZIP, React or Vue with the carousel included',
    ],
    why: [
      { icon: '⇆', title: 'Many quotes, little space', desc: 'A row that scrolls sideways holds a dozen testimonials in the height of one.' },
      { icon: '✋', title: 'Satisfying to drag', desc: 'Momentum and snapping make dragging the row feel natural, which invites visitors to keep reading.' },
      { icon: '♿', title: 'Progressive enhancement', desc: 'It is a real scrolling list first, so it works everywhere; GSAP only makes it smoother.' },
    ],
    useCases: [
      { icon: '📱', title: 'Mobile-first landing page', desc: 'On phones visitors swipe through quotes just like stories, instead of scrolling past a long column of cards.' },
      { icon: '🏢', title: 'B2B customer quotes', desc: 'Feature quotes from recognisable companies with job titles, and put the most impressive customer first.' },
      { icon: '📰', title: 'Press and media quotes', desc: 'Swap testimonials for short press quotes, using the role line for the publication name.' },
      { icon: '🎉', title: 'Event or launch feedback', desc: 'Collect attendee or beta-user feedback after a launch and show it as a swipeable row on the follow-up page.' },
    ],
    faqs: [
      { q: 'How does dragging work?', a: 'On devices with a mouse, GSAP Draggable tracks the drag on an invisible proxy and moves the row’s native scroll position; InertiaPlugin adds momentum and the row snaps to the nearest card. Touch devices use normal swiping with CSS scroll-snap.' },
      { q: 'Does it work without JavaScript?', a: 'Yes. The cards sit in a horizontally scrollable row with scroll-snap, so visitors can still scroll through them; only the drag momentum and arrow buttons need the script.' },
      { q: 'Is it accessible?', a: 'The row is a labelled, focusable region that can be scrolled with the keyboard, the arrow buttons have screen-reader labels you can edit, and animations are skipped for people who prefer reduced motion.' },
      { q: 'Which GSAP plugins does it load?', a: 'GSAP core with Draggable, InertiaPlugin and ScrollToPlugin (plus ScrollTrigger and SplitText for the entrance), all free and loaded from cdnjs.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the carousel: add autoplay that pauses on hover, pagination dots, or video testimonials that play inside the cards.',
      prompt: `Create a testimonial carousel in HTML, CSS and JavaScript.

- Header with eyebrow, heading and intro on the left and two round arrow buttons on the right.
- A horizontally scrollable row of quote cards (stars, quote, photo, name, role) with CSS scroll-snap and hidden scrollbar.
- With GSAP: drag the row with the mouse using Draggable on an invisible proxy mapped to scrollLeft, InertiaPlugin for momentum and snapping to the nearest card; arrow buttons scroll card by card with ScrollToPlugin and disable at the ends.
- Respect prefers-reduced-motion and keep native scrolling for touch.`,
    },
  },

  'testimonials-marquee': {
    keywords: ['testimonial marquee', 'infinite scrolling testimonials', 'marquee reviews html css', 'scrolling testimonials section', 'gsap marquee'],
    about: {
      title: 'Testimonial Marquee — Free Infinite Scrolling Reviews Section',
      description: `**Testimonial Marquee** fills a section with movement: two rows of review cards glide endlessly in opposite directions under a centred heading, with soft fades at both edges. It's the eye-catching social proof you see on creator tools and AI product launches, and it shows a lot of reviews without asking visitors to do anything.

**Seamless, readable loop**

The script duplicates each row once and loops it with GSAP at a steady pixels-per-second speed, so there's never a jump or a gap. Hover over a row (or tab into it) and it eases smoothly to a stop so the quote can be read, then picks up again when you move away. Each row runs on its own.

**Accessible by design**

The duplicated cards are hidden from screen readers, so every review is read once. For people who prefer reduced motion, or if GSAP doesn't load, there's no animation at all: each row becomes a normal horizontal list they can scroll by hand.

**Two editable rows**

Each row is its own list of up to ten reviews with a quote, name, role, photo and optional stars. Switch the bottom row off for a single marquee. The dark theme with a pink accent is easy to recolour with any preset or your brand kit.

**Export it**

Download HTML or a ZIP, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). For a static layout, see the [Testimonial Wall](/website-section-templates/testimonials-grid/).`,
    },
    features: [
      'Two rows of review cards scrolling in opposite directions',
      'Seamless GSAP loop with no jumps or gaps',
      'Hover or focus a row to ease it to a stop',
      'Soft edge fades with a CSS mask',
      'Duplicates hidden from screen readers',
      'Reduced motion: no animation, rows scroll by hand',
      'Two editable lists of up to 10 reviews; bottom row optional',
      'Export HTML, a ZIP, React or Vue with the marquee included',
    ],
    why: [
      { icon: '∞', title: 'Lots of proof, no effort', desc: 'Visitors see a stream of reviews without clicking or scrolling sideways.' },
      { icon: '✦', title: 'Adds life to the page', desc: 'Gentle, constant movement makes a page feel active and popular, especially on launches.' },
      { icon: '⏸', title: 'Stops when you read', desc: 'Hover-to-pause and the reduced-motion fallback keep it readable and respectful.' },
    ],
    useCases: [
      { icon: '🎬', title: 'Creator tool homepage', desc: 'Show what creators say about your app in two moving rows between the hero and the pricing.' },
      { icon: '🚀', title: 'Product Hunt style launch', desc: 'Pull quotes from launch-day comments and run them as a marquee to show momentum and excitement.' },
      { icon: '🎓', title: 'Course sales page', desc: 'Fill the page with short student wins, such as "landed a job in 3 months", scrolling past in two rows.' },
      { icon: '🧩', title: 'Community or Discord server', desc: 'Show member shout-outs as a lively marquee on the community’s join page.' },
    ],
    faqs: [
      { q: 'How is the loop made seamless?', a: 'The script clones each row’s cards once, then GSAP moves the row by exactly half its width on repeat. Because the second half is an identical copy, the end lines up with the start and the loop never jumps.' },
      { q: 'Can visitors stop it to read?', a: 'Yes. Hovering or focusing a row eases its speed to zero with GSAP, and moving away eases it back. Each row stops on its own.' },
      { q: 'What about reduced motion?', a: 'If the visitor prefers reduced motion (or GSAP fails to load), nothing animates and no clones are made; each row becomes a horizontally scrollable list.' },
      { q: 'Can I change the speed?', a: 'In exported code, set data-speed on each track (pixels per second; the defaults are 38 and 32). Lower numbers scroll more slowly.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the marquee: add a third row, show company logos instead of quotes, or make the speed follow scroll velocity with ScrollTrigger.',
      prompt: `Create a testimonial marquee section in HTML, CSS and JavaScript.

- Dark theme, centred header with eyebrow and heading.
- Two full-width rows of review cards (stars, quote, photo, name, role) with faded edges using a CSS mask.
- JavaScript: clone each row’s cards once (aria-hidden, tabindex -1 on links), then loop with GSAP (xPercent 0 → -50, ease none, repeat -1; the second row reversed). Hover or focus eases timeScale to 0.
- With prefers-reduced-motion, skip the animation and let rows scroll horizontally.`,
    },
  },

  'testimonial-spotlight': {
    keywords: ['featured testimonial section', 'big quote section html', 'case study testimonial', 'single testimonial template', 'customer quote with stats'],
    about: {
      title: 'Testimonial Spotlight — Free Featured Quote Section Template',
      description: `**Testimonial Spotlight** gives one great customer story the whole stage. A large quote sits in the centre of a card under a bold quote mark and the company name, followed by the customer's photo, name and role, a row of results (like "3× faster reporting") and a link to the full case study.

**One voice, real numbers**

A single specific quote from a named person, backed by measurable results, is often more persuasive than a dozen short ones. The results row is an editable list of up to four numbers with labels; switch it off for a quote on its own.

**A quote that reveals itself**

The quote is marked for the GSAP text effect, so it can rise in word by word, line by line or letter by letter as the section scrolls into view; pick the effect in the Animation panel. Wrap key words in *asterisks* to colour them with your brand colour.

**Edit and export**

Upload the customer's photo (resized in your browser), set the company name, and link to the case study, or leave the link empty to hide it. On phones the results stack. Export HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Want many quotes instead? See the [Testimonial Wall](/website-section-templates/testimonials-grid/).`,
    },
    features: [
      'Large centred quote with a bold quote mark and company name',
      'Customer photo, name and role',
      'Up to 4 result stats (number + label), switchable',
      'Case-study link that hides when empty',
      'Quote animates with GSAP SplitText (words, lines, letters or blur)',
      'Brand-colour highlights with *asterisks*',
      'Results stack on phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🎯', title: 'Specific beats general', desc: 'A named customer with concrete results is more credible than many vague compliments.' },
      { icon: '📈', title: 'Proof in numbers', desc: 'The results row turns the story into measurable outcomes visitors can picture for themselves.' },
      { icon: '✦', title: 'A moment of focus', desc: 'One big animated quote creates a pause in the page that draws full attention.' },
    ],
    useCases: [
      { icon: '🏢', title: 'Homepage case-study teaser', desc: 'Feature your best-known customer between features and pricing, with three results and a link to the full story.' },
      { icon: '🤝', title: 'B2B landing page', desc: 'Pick a customer from the same industry as the page’s audience, so visitors see a company like theirs succeeding.' },
      { icon: '🎨', title: 'Agency client highlight', desc: 'Show a client’s quote about a project with the results you delivered, like conversion uplift or launch time.' },
      { icon: '🎓', title: 'Course success story', desc: 'Share one graduate’s story with outcomes such as salary increase or time to first job.' },
    ],
    faqs: [
      { q: 'Can I animate the quote differently?', a: 'Yes. Open Animation and pick a headline text effect: Words rise, Line reveal, Letters or Blur in. The quote uses the same GSAP SplitText effect as section headings.' },
      { q: 'How many results can I show?', a: 'Up to four. Three usually reads best in one row; on phones they stack vertically.' },
      { q: 'Can I hide the results or the link?', a: 'Yes. Switch the Results group off, and leave the link text empty to hide the case-study link.' },
      { q: 'Is the markup semantic?', a: 'Yes. The quote is a blockquote inside a figure with a figcaption for the person, and the results are a description list (dt for the label, dd for the number).' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the spotlight: add a company logo, turn it into a rotating set of three spotlights, or animate the stats counting up with GSAP.',
      prompt: `Create a featured testimonial section in HTML and CSS.

- A centred white card with a round brand-coloured quote mark overlapping its top edge, a spaced-out company name, a large quote (blockquote) with one highlighted phrase, and a figcaption with a round photo, name and role.
- Below, a row of three result stats (large brand-coloured number, small label) separated by thin dividers, then a "Read the case study" link.
- Container queries stack the stats on narrow widths; CSS custom properties for the theme.
- GSAP: SplitText line reveal on the quote and staggered entrance with ScrollTrigger, respecting prefers-reduced-motion.`,
    },
  },

  'faq-accordion': {
    keywords: ['faq section template', 'faq accordion html css', 'accordion faq javascript', 'faq section with schema', 'details summary accordion'],
    about: {
      title: 'FAQ Accordion — Free Animated FAQ Section Template',
      description: `**FAQ Accordion** is the FAQ section most websites need: a centred heading and intro, a single column of questions that expand to show their answers, and a contact line for anyone still unsure. The first question starts open, and opening another closes the previous one, so the list always stays tidy.

**Built on native HTML**

Every question is a real \`<details>\` and \`<summary>\` element. That means it works with no JavaScript at all, keyboard users can tab through and press Enter or Space, the browser's find-in-page opens matching answers, and every answer is in the HTML, where search engines can read it.

**Smooth with GSAP**

With GSAP loaded, answers open with a smooth height animation and their text slides in, while the plus icon rotates into a minus. Closing animates too. People who prefer reduced motion get instant open and close.

**FAQPage schema included**

The exported HTML page includes FAQPage structured data (JSON-LD) built from your questions and answers, ready for Google's FAQ rich results and for AI assistants that read structured data.

**Edit and export**

Add up to fifteen questions, reorder them so the most common come first, and edit or switch off the contact line. Export HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Single-column accordion on native details/summary',
      'One question open at a time; the first opens on load',
      'GSAP height animation and rotating plus/minus icon',
      'Works without JavaScript; keyboard and find-in-page friendly',
      'FAQPage JSON-LD built from your questions in the HTML export',
      'Up to 15 questions: add, duplicate, reorder, remove',
      'Contact line with its own link, switchable',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '?', title: 'Answers objections', desc: 'A good FAQ handles the doubts that stop people signing up, right where they have them.' },
      { icon: '⌘', title: 'Accessible by default', desc: 'Native details/summary gives keyboard support, screen-reader semantics and find-in-page for free.' },
      { icon: '⭐', title: 'Search-friendly', desc: 'All answers stay in the HTML, and FAQPage schema helps search engines and AI understand them.' },
    ],
    useCases: [
      { icon: '💳', title: 'Under a pricing table', desc: 'Answer questions about trials, plan changes, refunds and discounts right below your plans, where hesitation is highest.' },
      { icon: '🚀', title: 'Landing page closer', desc: 'End a landing page with the six questions prospects ask most, followed by a link to talk to your team.' },
      { icon: '🛟', title: 'Help-centre topic page', desc: 'Group questions about one topic, such as billing or accounts, on its own help page with the schema included.' },
      { icon: '🎟️', title: 'Event or course page', desc: 'Cover dates, refunds, recordings and certificates so attendees don’t need to email you before registering.' },
    ],
    faqs: [
      { q: 'Does the accordion work without JavaScript?', a: 'Yes. Each question is a native details/summary element, so it opens and closes in every browser without any script. GSAP only adds the smooth animation and the one-at-a-time behaviour.' },
      { q: 'Is FAQ schema included?', a: 'Yes. The exported HTML page includes FAQPage JSON-LD generated from your questions and answers. For React or Vue, add the same JSON-LD to your page head with your framework’s head manager.' },
      { q: 'Can several answers be open at once?', a: 'In this section, opening a question closes the previous one. For multiple open answers, use the Split FAQ With Contact Card, or remove "single" from the data-accordion attribute in the exported code.' },
      { q: 'Is it accessible?', a: 'Yes. Summary elements are focusable and toggle with Enter or Space, screen readers announce them as expandable, and animation is skipped for people who prefer reduced motion.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the FAQ: add a search box that filters questions, group questions under category tabs, or generate questions from your support tickets.',
      prompt: `Create an FAQ section in HTML, CSS and JavaScript.

- Centred header with eyebrow, heading with a highlighted phrase and intro.
- A single column (max 820px) of native <details> elements; each <summary> holds the question and a round plus icon that becomes a minus when open; answers in a div below.
- JavaScript with GSAP: intercept summary clicks to animate the answer height from 0 to auto and back, keep one question open at a time and open the first on load; skip animation for prefers-reduced-motion and work without GSAP.
- Add FAQPage JSON-LD generated from the questions, and a contact line with a link under the list.`,
    },
  },

  'faq-split': {
    keywords: ['faq section with contact', 'two column faq section', 'faq page template html', 'support faq section', 'sticky faq sidebar'],
    about: {
      title: 'Split FAQ With Contact Card — Free Two-Column FAQ Template',
      description: `**Split FAQ With Contact Card** pairs your questions with a clear way to get help. On the left, a heading, intro and a support card with an icon, a short message and a contact button stay in view as visitors scroll; on the right, an accordion of questions opens smoothly, and several answers can be open at once.

**Turns questions into conversations**

Visitors who can't find their answer are one click from your support team, without scrolling back up. Point the button to a contact form, a chat, an email address or a booking page, and switch the card off if you don't need it.

**Native, animated, indexable**

Questions use native details/summary, so they work without JavaScript and every answer stays in the HTML. GSAP animates the height of each answer and rotates the plus icon; reduced-motion users get instant changes. The exported HTML page includes FAQPage schema built from your questions.

**Responsive layout**

On wide screens the left column is sticky; on tablets and phones the columns stack, with the support card moving below the heading. Choose the card's icon from 60 Lucide icons.

**Export it**

Download HTML or a ZIP, copy a React or Vue component, or fork it into [My Code](/ui-snippets/mycode/). For a centred layout, see the [FAQ Accordion](/website-section-templates/faq-accordion/).`,
    },
    features: [
      'Two columns: sticky heading and support card beside the questions',
      'Support card with icon, title, text and button (switchable)',
      'Accordion where several answers can be open at once',
      'Native details/summary with GSAP height animation',
      'FAQPage JSON-LD in the HTML export',
      'Up to 15 questions: add, duplicate, reorder, remove',
      'Stacks on tablets and phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '☎', title: 'Help is always visible', desc: 'The sticky support card stays beside the questions, so the next step is never out of reach.' },
      { icon: '⇆', title: 'Reads like a help page', desc: 'Two columns separate "who to ask" from "what people ask", which suits support and service pages.' },
      { icon: '⭐', title: 'Rich-result ready', desc: 'FAQPage schema in the export helps search engines show your answers directly.' },
    ],
    useCases: [
      { icon: '🛒', title: 'Shop shipping and returns', desc: 'Answer delivery, returns and payment questions on product or checkout pages, with a button to contact customer service.' },
      { icon: '🛟', title: 'Support page', desc: 'Put the most common support questions on the right and a "Chat with us" card on the left that opens your help desk.' },
      { icon: '🏠', title: 'Service business', desc: 'Plumbers, clinics or studios can answer pricing, availability and process questions with a "Book a call" card.' },
      { icon: '🧑‍💻', title: 'SaaS onboarding help', desc: 'Cover account setup, integrations and billing, with the card linking to your documentation or a live chat.' },
    ],
    faqs: [
      { q: 'Can I keep several answers open?', a: 'Yes. In this section each question opens and closes on its own, so visitors can compare answers. The FAQ Accordion section opens one at a time instead.' },
      { q: 'Does the left column stay on screen?', a: 'On wide screens, yes: it uses position: sticky so the heading and support card stay visible while the questions scroll. On narrow screens the columns stack normally.' },
      { q: 'Where can the contact button link?', a: 'Anywhere: a contact page, a mailto: address, a tel: number, a chat widget page or a booking tool such as Calendly.' },
      { q: 'Is FAQ schema included?', a: 'Yes. The exported HTML page includes FAQPage JSON-LD built from your questions and answers.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the split FAQ: add a search field above the questions, show question categories as tabs, or embed a contact form in the card.',
      prompt: `Create a two-column FAQ section in HTML, CSS and JavaScript.

- Left (sticky): eyebrow, heading, intro and a support card with an icon tile, title, text and a button.
- Right: native <details>/<summary> questions with a round plus/minus icon; answers animate open and closed with GSAP (height 0 ↔ auto), several can be open at once; no animation for prefers-reduced-motion.
- Container queries stack the columns below 860px.
- Include FAQPage JSON-LD built from the questions.`,
    },
  },

  'faq-grid': {
    keywords: ['faq grid section', 'faq two column grid', 'faq cards html css', 'questions and answers section', 'faq section dark'],
    about: {
      title: 'FAQ Grid — Free Two-Column Questions and Answers Section',
      description: `**FAQ Grid** shows every answer at once. Questions and answers sit in a two-column grid of cards, each with a small question-mark badge, the question in bold and a short answer underneath, so visitors scan the whole page without clicking anything. It works best when answers are a sentence or two.

**Nothing hidden**

Unlike an accordion, a grid puts every answer in front of the reader, which suits short, important facts such as limits, pricing details, data location or compatibility. The markup is a description list (dt for questions, dd for answers), which is the semantic HTML for question-and-answer pairs.

**Ready for search**

All answers are visible on the page, and the exported HTML includes FAQPage JSON-LD generated from them, so search engines and AI assistants can understand and quote your answers.

**Edit and animate**

Add up to twelve questions and reorder them. It ships in a dark navy and sky-blue theme that suits developer products, and you can switch to any preset or your brand kit. The heading reveals with SplitText and the cards stagger in on scroll; the grid becomes one column on phones.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For longer answers, use the [FAQ Accordion](/website-section-templates/faq-accordion/).`,
    },
    features: [
      'Questions and answers always visible in a two-column grid',
      'Question-mark badge and bold question on every card',
      'Semantic description list (dt / dd)',
      'FAQPage JSON-LD in the HTML export',
      'Up to 12 questions: add, duplicate, reorder, remove',
      'Dark developer-style theme; any preset or brand kit',
      'One column on phones; GSAP heading and card entrance',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '👀', title: 'Every answer seen', desc: 'No clicks needed, so important details like limits and pricing are read by everyone.' },
      { icon: '⚡', title: 'Fast to scan', desc: 'Short answers in a grid let visitors find what they need in seconds.' },
      { icon: '⭐', title: 'Great for search', desc: 'Visible answers plus FAQPage schema give search engines and AI clear, quotable content.' },
    ],
    useCases: [
      { icon: '🧑‍💻', title: 'API and developer docs', desc: 'Answer questions about rate limits, SDKs, regions and self-hosting on your developer landing page.' },
      { icon: '💳', title: 'Pricing details', desc: 'Show billing facts such as currencies, invoices, taxes and cancellations beside your pricing table.' },
      { icon: '📦', title: 'Product specifications', desc: 'Cover compatibility, warranty, dimensions and delivery as short question-and-answer cards on a product page.' },
      { icon: '🏫', title: 'Admissions or enrolment', desc: 'List key facts about deadlines, fees, requirements and start dates for a course or school page.' },
    ],
    faqs: [
      { q: 'When should I use a grid instead of an accordion?', a: 'Use a grid when answers are short (one or two sentences) and you want all of them read. Use an accordion when answers are longer or you have many questions.' },
      { q: 'Is the markup semantic?', a: 'Yes. Questions and answers are a description list, with dt for each question and dd for each answer, which screen readers and search engines understand as pairs.' },
      { q: 'Is FAQ schema included?', a: 'Yes. The exported HTML page includes FAQPage JSON-LD generated from your questions and answers.' },
      { q: 'Can I use a light theme?', a: 'Yes. Pick a light colour preset or apply your brand kit; the cards, badges and text colours all follow the theme.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the FAQ grid: add category headings, link answers to documentation pages, or generate the questions from your product docs.',
      prompt: `Create an FAQ grid section in HTML and CSS.

- Dark navy background, centred header with eyebrow and a heading with one highlighted phrase.
- A two-column grid built as a description list: each card holds a dt with a small "?" badge and the question in bold, and a dd with a short answer.
- Container queries switch to one column below 720px; CSS custom properties for the theme.
- Include FAQPage JSON-LD and a GSAP entrance (SplitText heading, staggered cards) that respects prefers-reduced-motion.`,
    },
  },

  'cta-gradient-banner': {
    keywords: ['call to action section', 'cta banner html css', 'cta section template', 'gradient cta', 'magnetic button gsap'],
    about: {
      title: 'Gradient CTA Banner — Free Call to Action Section Template',
      description: `**Gradient CTA Banner** is a closing call to action that's hard to scroll past: a rounded panel in a rich brand gradient with a faint grid texture, a big centred heading, a line of supporting text, two buttons and a reassurance note such as "No credit card required".

**Small details that feel alive**

A soft glow inside the panel follows the visitor's cursor, eased with GSAP, and the buttons are magnetic: they drift slightly toward the pointer and spring back when it leaves. Both effects run only on devices with a mouse and switch off for people who prefer reduced motion. On touch screens the glow simply sits in the middle.

**Your brand, automatically**

The gradient, glow and buttons are all mixed from your brand colour, so the banner matches any theme preset or brand kit. The primary button is inverted (white on brand) so it stands out, and leaving the second button empty hides it.

**Animated entrance**

The heading reveals with GSAP SplitText and the text and buttons follow as the banner scrolls into view.

**Export it**

Download HTML or a ZIP, copy a React or Vue component (the spotlight and magnetic scripts included), or fork into [My Code](/ui-snippets/mycode/). For a smaller prompt between sections, see the [CTA Strip](/website-section-templates/cta-strip/).`,
    },
    features: [
      'Rounded gradient banner mixed from your brand colour',
      'Cursor-following glow (GSAP spotlight) and grid texture',
      'Magnetic buttons that drift toward the pointer',
      'Centred heading, supporting text and reassurance note',
      'Optional second button that hides when empty',
      'Effects off on touch screens and for reduced motion',
      'SplitText heading reveal on scroll',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '◎', title: 'A clear final step', desc: 'A big, focused banner gives visitors who scrolled to the end one obvious thing to do next.' },
      { icon: '✦', title: 'Delightful, not distracting', desc: 'A gentle glow and magnetic buttons reward attention without competing with the message.' },
      { icon: '◐', title: 'Always on brand', desc: 'Every colour is derived from your brand, so it fits any theme without manual tweaking.' },
    ],
    useCases: [
      { icon: '🏁', title: 'End of a landing page', desc: 'Repeat your main offer just above the footer, with a free-trial button and a "Talk to sales" option.' },
      { icon: '🚀', title: 'Launch announcement', desc: 'Promote a new product or feature with a bold heading and a button to the launch page or waitlist.' },
      { icon: '📚', title: 'After a blog post', desc: 'Turn readers into users with a short pitch and a sign-up button at the end of your best articles.' },
      { icon: '🎟️', title: 'Event registration', desc: 'Close an event page with the date in the note and a "Reserve your seat" button.' },
    ],
    faqs: [
      { q: 'How does the cursor glow work?', a: 'The banner draws a radial gradient positioned with two CSS variables. A small script updates them from the pointer position and GSAP eases the change, so the glow trails the cursor smoothly.' },
      { q: 'What are magnetic buttons?', a: 'Buttons that move slightly toward the pointer while it is over them, using GSAP quickTo, and spring back when it leaves. It makes the main action feel responsive and inviting.' },
      { q: 'Do the effects work on phones?', a: 'They are desktop-only on purpose: on touch screens the glow stays centred and the buttons stay still. Everything else, including the entrance animation, works everywhere.' },
      { q: 'Can I change the gradient?', a: 'The gradient runs from your brand colour to a darker mix of it. Change the brand colour in Colours, or edit the .cb background in the exported CSS for a custom gradient.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the CTA banner: add an email field instead of buttons, show customer logos under the note, or add a countdown for a launch offer.',
      prompt: `Create a call-to-action banner section in HTML, CSS and JavaScript.

- A rounded panel with a gradient from the brand colour to a darker shade, a faint grid texture masked to the centre and a radial glow positioned by CSS variables --mx and --my.
- Centred white heading, supporting text, a white primary button, an outlined secondary button and a small note.
- JavaScript with GSAP: update --mx/--my from the pointer with eased tweens, and make the buttons magnetic with gsap.quickTo (x/y toward the pointer, back to 0 on leave). Desktop pointers only; respect prefers-reduced-motion.`,
    },
  },

  'cta-split-image': {
    keywords: ['app download cta section', 'cta with image html css', 'split call to action', 'mobile app promo section', 'dark cta section'],
    about: {
      title: 'Split CTA With Image — Free App Download Call to Action Template',
      description: `**Split CTA With Image** is a dark call-to-action card built for app downloads and product sign-ups. On the left: an eyebrow, a heading with a highlighted phrase, a short checklist of benefits and two buttons. On the right: a phone screen or product shot that rises from the bottom edge of the card, under a soft glow in your brand colour.

**Show the product, then ask**

Seeing the app right next to the download buttons makes the decision easier. Upload your own screenshot (PNGs keep their transparency) and it's resized in your browser; the drop shadow and edge-cropping work with any phone or product image.

**Store-ready buttons**

The two buttons default to "Download for iPhone" and "Get it on Android", so you can link them straight to your App Store and Google Play pages, or change them to "Start free" and "Book a demo" for a web product. Both buttons are magnetic on desktop.

**Responsive and animated**

On phones the image moves under the text and shrinks to fit. With GSAP, the heading reveals word by word, the checklist and buttons follow, and the image rises in as the card scrolls into view.

**Export it**

Download HTML or a ZIP with your image, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For a hero-sized app layout, see the [App Product Hero](/website-section-templates/app-product-hero/).`,
    },
    features: [
      'Dark card with copy on the left and an image rising from the edge',
      'Heading with *highlight*, eyebrow and benefits checklist',
      'Two buttons for App Store / Google Play or any links',
      'Upload a phone screen or product shot (transparency kept)',
      'Brand-coloured glow; magnetic buttons on desktop',
      'Stacks on phones with the image below the text',
      'SplitText heading and rising image on scroll',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '📱', title: 'Product beside the ask', desc: 'Visitors see what they are getting right next to the button that gets it.' },
      { icon: '☑', title: 'Reasons in a glance', desc: 'Three short checklist benefits answer "why download?" before the click.' },
      { icon: '◐', title: 'Stands out on light pages', desc: 'A dark card with a glowing accent breaks the rhythm of a light page and draws the eye.' },
    ],
    useCases: [
      { icon: '📲', title: 'App download prompt', desc: 'Place it at the end of your app’s website with iPhone and Android buttons and a screenshot of the home screen.' },
      { icon: '💻', title: 'SaaS sign-up', desc: 'Swap the phone for a dashboard screenshot and the buttons for "Start free trial" and "Book a demo".' },
      { icon: '🆕', title: 'New feature promo', desc: 'Announce a feature with its screenshot, three benefits and a button to try it.' },
      { icon: '🎧', title: 'Podcast or newsletter app', desc: 'Show your listening or reading app with links to the stores and a checklist of what subscribers get.' },
    ],
    faqs: [
      { q: 'What image works best?', a: 'A tall PNG with a transparent background, such as a phone mockup, about 720×1440 px. The image is cropped at the bottom edge of the card, which looks natural for phones.' },
      { q: 'Can I use official App Store badges?', a: 'Yes. After exporting, replace the two buttons with Apple’s and Google’s official badge images and links, following their brand guidelines.' },
      { q: 'How does it look on mobile?', a: 'The card stacks: copy and buttons first, then the image, shrunk to about 70% of the width and still rising from the bottom edge.' },
      { q: 'Can I use a light theme?', a: 'The card uses the theme’s surface colour as its background, so choosing a light preset gives a light card; adjust the text colours in the exported CSS if needed.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the split CTA: add a QR code for downloading on desktop, show app ratings under the buttons, or swap the image for an autoplaying demo video.',
      prompt: `Create an app download call-to-action section in HTML and CSS.

- A dark rounded card in two columns: left with an eyebrow, a heading with one highlighted phrase in a lime brand colour, a three-item checklist and two buttons (filled and outlined); right with a phone screenshot aligned to the bottom edge, overflowing it slightly, with a drop shadow.
- A soft radial glow in the brand colour in the top-right corner.
- Container queries stack the columns below 760px.
- GSAP: SplitText heading, staggered copy and a rising image with ScrollTrigger; magnetic buttons on desktop; respect prefers-reduced-motion.`,
    },
  },

  'cta-newsletter': {
    keywords: ['newsletter signup section', 'email subscribe form html css', 'newsletter cta template', 'mailchimp signup form html', 'email capture section'],
    about: {
      title: 'Newsletter Signup CTA — Free Email Subscribe Section Template',
      description: `**Newsletter Signup CTA** turns readers into subscribers. A centred card holds an icon, a heading about what subscribers get, a short pitch, an email field and subscribe button side by side, and a line of social proof with a privacy note.

**A real, working form**

Unlike many templates, this isn't just a picture of a form. Paste the form action URL from your email service (Mailchimp, Kit/ConvertKit, Buttondown, Brevo or your own endpoint), set the field name it expects (for example EMAIL for Mailchimp), and the exported page posts sign-ups straight to it. The URL is checked before it's used, and the email field has proper type, autocomplete and required attributes.

**Friendly on every screen**

On desktop the input and button share one rounded bar that glows in your brand colour when focused. On phones they stack into a full-width field and button that are easy to tap.

**Edit and animate**

Change the icon, heading, pitch, placeholder, button text, subscriber count and note. The heading reveals with GSAP SplitText as the card scrolls into view. In the editor the form never submits, so you can try it safely.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with an email from the [Email Templates](/email-templates/) library, such as the welcome email.`,
    },
    features: [
      'Working email form that posts to any service’s form URL',
      'Configurable field name for Mailchimp, Kit, Buttondown and others',
      'Input and button in one bar with a brand-coloured focus glow',
      'Stacks into full-width field and button on phones',
      'Icon, heading, pitch, subscriber count and privacy note',
      'Proper email type, autocomplete and required attributes',
      'URLs checked before use; forms never submit in the editor',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '✉', title: 'Own your audience', desc: 'An email list is the one channel you control, and this section makes joining it effortless.' },
      { icon: '⚙', title: 'Works with your provider', desc: 'Post to any email service by pasting its form URL and field name; no plugin needed.' },
      { icon: '👥', title: 'Proof builds sign-ups', desc: 'A subscriber count next to the form reassures people that the newsletter is worth it.' },
    ],
    useCases: [
      { icon: '📝', title: 'Blog and newsletter', desc: 'Place it after articles and on your homepage to grow your list, with your weekly topic in the heading.' },
      { icon: '⏳', title: 'Product waitlist', desc: 'Change the button to "Join the waitlist" and post sign-ups to your waitlist tool before launch.' },
      { icon: '🎓', title: 'Free course or lead magnet', desc: 'Offer a free email course or download in exchange for an email address, delivered by your email service.' },
      { icon: '🛍️', title: 'Store discount sign-up', desc: 'Promise 10% off the first order to new subscribers and connect the form to your shop’s email platform.' },
    ],
    faqs: [
      { q: 'How do I connect the form to Mailchimp?', a: 'In Mailchimp, open your audience’s embedded form code and copy the form’s action URL into Form URL, and set Email field name to EMAIL. Sign-ups will go straight to your audience.' },
      { q: 'Does it work with Kit (ConvertKit) or Buttondown?', a: 'Yes. Copy the action URL from the service’s HTML form embed and use the field name it expects, such as email_address for Kit or email for Buttondown.' },
      { q: 'Will the form submit while I edit?', a: 'No. In the editor preview submissions are blocked so you can try the form safely. The exported page submits normally.' },
      { q: 'Is it accessible?', a: 'The email input has a label from the placeholder (aria-label), type="email", autocomplete="email" and required, and the button is a real submit button.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the newsletter section: submit with fetch and show a thank-you message, add a first-name field, or add a hidden honeypot field against spam.',
      prompt: `Create a newsletter signup section in HTML and CSS.

- A centred card with a round icon, a heading with a highlighted phrase, a short pitch, a form with an email input and subscribe button inside one rounded bar (with a brand-coloured focus ring), and a line with the subscriber count and a privacy note.
- The form posts to a configurable action URL; the input has type="email", required, autocomplete="email" and an aria-label.
- Container queries stack the input and button below 520px.
- CSS custom properties for the theme and a GSAP SplitText heading reveal that respects prefers-reduced-motion.`,
    },
  },

  'cta-strip': {
    keywords: ['cta strip', 'inline call to action', 'cta bar html css', 'small cta section', 'call to action band'],
    about: {
      title: 'CTA Strip — Free Inline Call to Action Section Template',
      description: `**CTA Strip** is a compact call to action for the middle of a page: a softly tinted band with a bold icon, a one-line heading and a short sentence on the left, and two buttons on the right. It invites action without the full-screen interruption of a big banner, so you can use it between sections, above the footer or at the end of articles.

**Quick to adapt**

Pick the icon from 60 Lucide line icons, write a heading such as "Start your free 14-day trial", and link the two buttons. Leave the second button empty to show only one. The border and background are tinted from your brand colour.

**Feels responsive**

On desktop the buttons are magnetic, drifting slightly toward the cursor (GSAP quickTo). The heading and buttons fade in as the strip scrolls into view. On phones the content stacks and the buttons share the full width.

**Use it often**

Because it's small, you can repeat it on long pages and documentation without overwhelming readers; every instance shares the same theme as the rest of your sections.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a bigger closing moment, use the [Gradient CTA Banner](/website-section-templates/cta-gradient-banner/).`,
    },
    features: [
      'Slim tinted band: icon, heading and text beside two buttons',
      'Pick the icon from 60 Lucide line icons',
      'Optional second button that hides when empty',
      'Magnetic buttons on desktop (GSAP quickTo)',
      'Fade-in entrance on scroll',
      'Stacks on phones with full-width buttons',
      'Brand-tinted border and background from the theme',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '➖', title: 'Light-touch prompt', desc: 'Asks for action without breaking the flow of the page around it.' },
      { icon: '↺', title: 'Repeatable', desc: 'Small enough to use several times on long pages, docs and blog posts.' },
      { icon: '◐', title: 'Consistent', desc: 'Shares the theme with every other section, so it always looks like part of the page.' },
    ],
    useCases: [
      { icon: '📄', title: 'Between landing page sections', desc: 'Place it after features or testimonials to give convinced visitors an early way to sign up.' },
      { icon: '📚', title: 'Documentation pages', desc: 'Add "Ready to try it? Get an API key" at the end of each guide, linking to sign-up and the dashboard.' },
      { icon: '✍️', title: 'Blog posts', desc: 'End articles with a relevant offer, like a free template or trial, in one tidy band.' },
      { icon: '🦶', title: 'Above the footer', desc: 'Put it at the bottom of every page as a consistent last call to action.' },
    ],
    faqs: [
      { q: 'When should I use a strip instead of a banner?', a: 'Use the strip between sections or on content pages where a big banner would interrupt reading, and a banner as the main closing CTA of a landing page.' },
      { q: 'Can I show just one button?', a: 'Yes. Leave the secondary button text empty and it is removed.' },
      { q: 'What does "magnetic" mean?', a: 'On devices with a mouse, the buttons move slightly toward the cursor and spring back when it leaves, using GSAP. It is off on touch screens and for reduced motion.' },
      { q: 'How does it look on phones?', a: 'The icon, heading and text stack, and the two buttons sit side by side across the full width.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the CTA strip: make it dismissible and remember that with localStorage, turn it into a sticky bottom bar, or add an email field.',
      prompt: `Create a compact call-to-action strip in HTML, CSS and JavaScript.

- A rounded band with a pale brand-tinted background and border: on the left a 54px icon tile in the brand colour, a one-line heading and a short sentence; on the right a filled and an outlined button.
- Container queries stack it below 640px with full-width buttons.
- GSAP: fade the content in on scroll and make the buttons magnetic with quickTo on desktop pointers; respect prefers-reduced-motion.`,
    },
  },

  'stats-counters': {
    keywords: ['stats section template', 'animated counter html css', 'number counter on scroll', 'statistics section', 'count up animation gsap'],
    about: {
      title: 'Animated Stats Counters — Free Stats Section Template',
      description: `**Animated Stats Counters** turns your key numbers into a moment: a row of big figures that count up from zero as the section scrolls into view, each with a label and a short note, under an optional centred heading. Numbers like "12,000+ teams" and "99.99% uptime" are some of the fastest ways to show scale and reliability.

**Counts any format**

Type the number exactly as you want it shown, such as $2.5M, 12,000+, 99.99%, 4.9/5 or 3.4×, and the counter keeps the prefix, suffix, thousands commas and decimal places while it counts. When it finishes, the original text is restored exactly.

**Real numbers for everyone**

The HTML always contains the final values, so search engines, screen readers and visitors without JavaScript see the real figures. The count runs once with GSAP and ScrollTrigger, only when each number scrolls into view, and never for people who prefer reduced motion.

**Edit and style**

Add up to six stats, reorder them and add optional notes. The numbers use a subtle text gradient from your text colour to your brand colour, with tabular figures so they don't jiggle while counting. On phones the stats sit in a two-by-two grid.

**Export it**

Download HTML or a ZIP, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For stats with icons and logos on a dark background, see [Stats With Logos](/website-section-templates/stats-dark-split/).`,
    },
    features: [
      'Numbers count up from zero when scrolled into view (GSAP + ScrollTrigger)',
      'Keeps prefixes, suffixes, commas and decimals: $2.5M, 12,000+, 99.9%',
      'Final values always in the HTML for SEO, screen readers and no-JS',
      'Up to 6 stats with label and optional note',
      'Gradient number styling with tabular figures',
      'Two-by-two grid on phones; heading can be switched off',
      'No animation for reduced motion',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '#', title: 'Numbers persuade', desc: 'Concrete figures show scale and results faster than any paragraph of copy.' },
      { icon: '↗', title: 'Motion draws the eye', desc: 'Counting up as the section appears makes visitors stop and read the numbers.' },
      { icon: '✓', title: 'Honest HTML', desc: 'The real values are always in the page, so nothing depends on the animation.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Under the hero', desc: 'Back up your headline with customers, countries and uptime right below the hero section.' },
      { icon: '🏢', title: 'About page milestones', desc: 'Show founding year, team size, customers served and offices as a "by the numbers" row.' },
      { icon: '🌱', title: 'Impact report', desc: 'Non-profits and B2B brands can show trees planted, money raised or hours saved with notes for context.' },
      { icon: '📈', title: 'Investor or press page', desc: 'Highlight revenue growth, users and retention in a clean row of figures.' },
    ],
    faqs: [
      { q: 'Which number formats are supported?', a: 'Any text with a number in it: prefixes like $ or €, suffixes like +, %, M, k, × or /5, thousands separators with commas and any number of decimal places. The first number in the text is animated and everything around it stays.' },
      { q: 'Will search engines see the real numbers?', a: 'Yes. The HTML contains the final values; the count-up only changes them briefly in the browser when the section scrolls into view, then restores the exact original text.' },
      { q: 'Does it count every time I scroll past?', a: 'No, once per page load, when each number first comes into view. It never runs for people who prefer reduced motion.' },
      { q: 'How many stats can I show?', a: 'Up to six. Three or four read best in one row; on phones they wrap into two columns.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the stats section: pull live numbers from an API, add small trend arrows, or add an icon above each number.',
      prompt: `Create an animated stats section in HTML, CSS and JavaScript.

- Optional centred header, then a row of four stats in a rounded panel with thin dividers; each has a big number, a bold label and a small note, built as a description list.
- The HTML contains the final values (e.g. "12,000+", "$2.5M", "99.99%", "4.9/5").
- JavaScript with GSAP + ScrollTrigger: when each number enters the viewport, count the first number in its text from 0 to its value, keeping prefix, suffix, commas and decimals; restore the exact text at the end; skip for prefers-reduced-motion.
- Container queries: two columns below 720px.`,
    },
  },

  'logo-cloud': {
    keywords: ['logo cloud section', 'trusted by logos section', 'logo marquee html css', 'customer logos strip', 'scrolling logos'],
    about: {
      title: 'Scrolling Logo Cloud — Free Trusted By Logo Strip Template',
      description: `**Scrolling Logo Cloud** is the "Trusted by" strip you see under almost every SaaS hero: a short line of text above a row of customer logos that scrolls endlessly, with soft fades at both edges. Hovering slows it to a stop, and logos change from grey to full colour on hover.

**Looks finished before you have logos**

Every logo starts as a clean wordmark (one of 60 icons plus the company name in your heading font), so the section looks right while you collect real logos. Upload an SVG or transparent PNG for any company and it replaces the wordmark automatically.

**Seamless and respectful**

The strip loops with GSAP without jumps, duplicate logos are hidden from screen readers, and visitors who prefer reduced motion get a still row they can scroll by hand. Up to sixteen logos fit in the loop.

**Edit and theme**

Write your own line above the logos (wrap the number in *asterisks* to highlight it) and reorder logos to put your best-known customers first. Colours come from the shared theme, so it sits naturally under any hero in the library.

**Export it**

Download HTML or a ZIP with your logo files, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For a static logo row with numbers, see [Stats With Logos](/website-section-templates/stats-dark-split/).`,
    },
    features: [
      'Endless scrolling logo strip with faded edges (GSAP)',
      'Hover or focus eases the strip to a stop',
      'Grey logos that turn full colour on hover',
      'Icon + name wordmarks until you upload real logos',
      'Upload SVG or PNG logos (resized in your browser)',
      'Up to 16 logos; duplicates hidden from screen readers',
      'Reduced motion: a still, hand-scrollable row',
      'Export HTML, a ZIP with logos, React or Vue',
    ],
    why: [
      { icon: '🏢', title: 'Borrowed credibility', desc: 'Recognisable customer logos tell visitors that companies like theirs already trust you.' },
      { icon: '∞', title: 'Fits many logos', desc: 'A moving strip shows a dozen or more logos in one slim row.' },
      { icon: '✎', title: 'Ready before your logos are', desc: 'Built-in wordmarks keep the design finished while you gather permission and files.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Under a SaaS hero', desc: 'Place it straight after the hero with "Trusted by 2,000+ teams" and your best-known customer logos.' },
      { icon: '🔌', title: 'Integrations strip', desc: 'Change the line to "Works with your favourite tools" and show the apps you integrate with.' },
      { icon: '📰', title: 'As seen in', desc: 'Show press and podcast logos with "As featured in" to borrow media credibility.' },
      { icon: '🤝', title: 'Partners and sponsors', desc: 'Event and community sites can thank sponsors with a moving strip of their logos.' },
    ],
    faqs: [
      { q: 'Can I use my customers’ logos?', a: 'Only with permission. Many companies allow logo use for customers, but check your contracts or ask; until then, the built-in wordmarks keep the section looking finished.' },
      { q: 'What logo files work best?', a: 'SVG or transparent PNG files of the one-colour logo, about 30 px tall when displayed. The section shows them in grey and in full colour on hover.' },
      { q: 'Can I stop it scrolling?', a: 'Visitors can hover or focus the strip to stop it. People who prefer reduced motion get a still row. In exported code you can also change the data-speed value.' },
      { q: 'How many logos can I add?', a: 'Between three and sixteen. Eight to twelve gives the smoothest-looking loop.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the logo cloud: add a second row in the opposite direction, link each logo to a case study, or show a tooltip with the customer’s quote on hover.',
      prompt: `Create a "Trusted by" logo strip in HTML, CSS and JavaScript.

- A centred line of muted text with one highlighted phrase, then a full-width row of grey logos (img, or an inline SVG icon + company name wordmark) with faded edges using a CSS mask; logos turn full colour on hover.
- JavaScript with GSAP: clone the logos once (aria-hidden), loop the row by -50% with ease none and repeat -1, and ease timeScale to 0 on hover/focus. Skip for prefers-reduced-motion and let the row scroll by hand.`,
    },
  },

  'stats-dark-split': {
    keywords: ['stats section dark', 'metrics section with logos', 'results section html css', 'stat cards with icons', 'counter section template'],
    about: {
      title: 'Stats With Logos (Dark) — Free Results Section Template',
      description: `**Stats With Logos** packs your strongest proof into one dark section: a heading, short text and a button on the left; four stat cards with icons on the right whose numbers count up as they scroll into view; and a row of customer logos underneath. It answers "does this work?" and "who uses it?" at the same time.

**Counting stat cards**

Each card has an icon (from 60 Lucide icons), a big number and a label. Numbers count from zero with GSAP when they appear, keeping formats like $2.5M, 3.4× or 96%, and the real values are always in the HTML. Below-the-fold cards keep their real values until they're reached.

**Logos that work without files**

Customer logos start as clean icon-and-name wordmarks and can be replaced with uploaded SVG or PNG logos at any time; uploaded logos are lightened to suit the dark background. Switch the logo row off, or change its "Powering teams at" title.

**Dark, glowing, on brand**

A navy background with a cyan glow suits enterprise and technical products, and every colour is a theme token, so presets and your brand kit restyle it instantly. On tablets the columns stack; on small phones the cards go single-column.

**Export it**

Download HTML or a ZIP, copy a React or Vue component, or fork into [My Code](/ui-snippets/mycode/). For a light, minimal version, see [Animated Stats Counters](/website-section-templates/stats-counters/).`,
    },
    features: [
      'Heading, text and button beside four stat cards',
      'Stat cards with icons and count-up numbers (GSAP + ScrollTrigger)',
      'Formats kept while counting: $2.5M, 3.4×, 96%',
      'Customer logo row with wordmarks or uploaded logos',
      'Logo row and button can be switched off',
      'Dark theme with a brand-coloured glow',
      'Stacks on tablets; single-column cards on small phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '📊', title: 'Proof and scale together', desc: 'Results and recognisable customers in one block make a convincing case quickly.' },
      { icon: '↗', title: 'Numbers that land', desc: 'Count-up animation draws attention to each figure as it appears.' },
      { icon: '🌙', title: 'Enterprise feel', desc: 'A dark, glowing section adds weight and contrast to a light landing page.' },
    ],
    useCases: [
      { icon: '🏢', title: 'B2B landing page', desc: 'Show time saved, cost reduced and adoption rate next to the logos of well-known customers.' },
      { icon: '💼', title: 'Sales and enterprise page', desc: 'Pair hard ROI numbers with a "Read customer stories" button for buyers who need evidence.' },
      { icon: '📣', title: 'Annual results', desc: 'Present a year in numbers with four headline figures and the partners who made it happen.' },
      { icon: '🧑‍💻', title: 'Developer platform', desc: 'Show API calls served, uptime, response time and the companies building on your platform.' },
    ],
    faqs: [
      { q: 'Do the numbers count on every device?', a: 'Yes, on any device with JavaScript, once per page load as they come into view. People who prefer reduced motion see the final values straight away.' },
      { q: 'Can I add my real customer logos?', a: 'Yes. Upload an SVG or transparent PNG for each logo; it replaces the icon-and-name wordmark and is shown in a light grey that suits the dark background.' },
      { q: 'Can I use a light theme?', a: 'Yes. Choose a light colour preset or apply your brand kit; the cards, glow and text all follow the theme colours.' },
      { q: 'How many stats can I show?', a: 'Up to four, in a two-by-two grid. For more, use Animated Stats Counters, which fits six.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the dark stats section: add sparkline charts to each card, link stats to case studies, or switch the logos for a scrolling marquee.',
      prompt: `Create a dark results section in HTML, CSS and JavaScript.

- Navy background with a soft cyan radial glow; left column with eyebrow, heading with a highlighted phrase, text and a button; right column with a 2×2 grid of stat cards (icon tile, big number, label).
- Below, a divider, a small uppercase title and a centred, wrapping row of grey logo wordmarks.
- GSAP + ScrollTrigger: count each number up from 0 when it enters the viewport, keeping prefixes and suffixes, without changing the HTML values until it starts; respect prefers-reduced-motion.
- Container queries stack the columns below 860px.`,
    },
  },

  'navbar-simple': {
    keywords: ['responsive navbar html css', 'navbar template', 'sticky header css', 'mobile menu hamburger javascript', 'website header template'],
    about: {
      title: 'Simple Sticky Navbar — Free Responsive Header Template',
      description: `**Simple Sticky Navbar** is a clean, dependable site header: your logo on the left, navigation links in the middle, and a log-in link with a call-to-action button on the right. It sticks to the top of the page with a frosted-glass blur, picks up a soft shadow once the visitor scrolls, and on small screens folds the links into a hamburger menu.

**A mobile menu done properly**

The hamburger turns into an X and opens a dropdown card where the links slide in one after another (GSAP). Pressing Esc closes it and returns focus to the button, Tab stays inside the open menu, and tapping outside or on a link closes it. Screen readers get the menu state (aria-expanded) and labels you can edit. Without JavaScript, the links simply show under the logo.

**Sticky, or hide on scroll**

Two switches control the behaviour: Sticky header keeps the bar at the top, and Hide on scroll down slides it away while reading and brings it back as soon as the visitor scrolls up, giving more room on small screens.

**Your logo and links**

Use the built-in icon-and-name mark or upload your logo (SVG or PNG). Links are an editable list of up to eight; reorder them and point them at page anchors or other pages. Leave the log-in text empty to hide it.

**Export it**

Download HTML, a ZIP, React or Vue (the menu script included), or fork into [My Code](/ui-snippets/mycode/). Put it above any [hero section](/website-section-templates/category/hero/) in the library and they share one theme.`,
    },
    features: [
      'Logo, links, log-in link and CTA button in one bar',
      'Sticky with a frosted-glass blur and a shadow on scroll',
      'Optional hide-on-scroll-down, show-on-scroll-up',
      'Hamburger menu that animates open with GSAP',
      'Esc to close, focus trap, aria-expanded and editable labels',
      'Links show without JavaScript',
      'Upload a logo or use the icon + name mark',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '☰', title: 'Accessible menu', desc: 'Keyboard, screen-reader and focus handling are built in, which most navbar snippets skip.' },
      { icon: '📌', title: 'Always within reach', desc: 'A sticky header keeps your main call to action one click away on long pages.' },
      { icon: '↕', title: 'Gets out of the way', desc: 'Hide-on-scroll gives readers the whole screen and brings the menu back when they need it.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS website header', desc: 'Link to Product, Features, Pricing and Blog, with "Log in" for customers and "Start free trial" for everyone else.' },
      { icon: '🏢', title: 'Business or agency site', desc: 'Use Services, Work, About and Contact as links, and point the button to a booking page.' },
      { icon: '📄', title: 'Single-page landing site', desc: 'Point links at section anchors (#features, #pricing) so the menu scrolls visitors around one long page.' },
      { icon: '📚', title: 'Docs or blog', desc: 'Turn on hide-on-scroll so long articles get the full screen while the menu stays one scroll-up away.' },
    ],
    faqs: [
      { q: 'Is the mobile menu accessible?', a: 'Yes. The toggle is a real button with aria-expanded and an editable label, Esc closes the menu and returns focus to the button, Tab is kept inside the open menu, and the links work without JavaScript.' },
      { q: 'How do I make the navbar sticky?', a: 'Switch on Sticky header. The section uses position: sticky at the top of the page and gets a shadow after you scroll. Turn on Hide on scroll down as well to slide it away while scrolling down.' },
      { q: 'Can I use my own logo?', a: 'Yes. Upload an SVG or transparent PNG in the Logo group; it replaces the icon-and-name mark. Keep it around 32 px tall.' },
      { q: 'Where should I put the navbar in my page?', a: 'At the very top of the body, before your hero. Because it is sticky, it should be a direct child of the body (not inside another wrapper with overflow hidden).' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the navbar: add dropdown sub-menus, highlight the current page, or add a dark-mode toggle button.',
      prompt: `Create a responsive sticky navbar in HTML, CSS and JavaScript.

- Logo on the left, links in the middle, a "Log in" link and a filled CTA button on the right; translucent background with backdrop-filter blur and a bottom border; sticky at the top with a shadow after scrolling.
- Below 900px (container query), hide the links behind a hamburger button that turns into an X; the menu opens as a dropdown card with links stacked and the CTA full width.
- JavaScript: toggle aria-expanded, animate open/close and stagger the links with GSAP, close on Esc (return focus), outside click and link click, trap Tab inside the open menu, and close on resize to desktop. Without JS the links stay visible.
- Optional hide-on-scroll-down / show-on-scroll-up.`,
    },
  },

  'navbar-floating': {
    keywords: ['floating navbar css', 'pill navbar template', 'glassmorphism navbar', 'fullscreen mobile menu', 'modern navbar html css'],
    about: {
      title: 'Floating Pill Navbar — Free Glass Header With Full-Screen Menu',
      description: `**Floating Pill Navbar** is the modern header you see on AI, design and developer product sites: a dark, frosted-glass pill that floats a little below the top of the page, with your logo, centred links and a bright button. It looks especially good over dark or image-heavy hero sections.

**A full-screen mobile menu**

On small screens the hamburger opens a full-screen overlay with large, bold links that stagger in with GSAP, plus a big call-to-action button. Esc closes it and returns focus, Tab stays inside, and tapping a link closes it, so it behaves like a native app menu.

**Glass, in pure CSS**

The pill uses backdrop-filter blur over a translucent surface colour from your theme, with a soft shadow. Change the surface and brand colours, or apply your brand kit, and the pill, links and button all follow. Upload your logo or use the icon-and-name mark.

**Sticky by default**

The bar stays in view as visitors scroll, and you can switch on hide-on-scroll-down for long pages. Without JavaScript, the links simply show inside the pill.

**Export it**

Download HTML, a ZIP, React or Vue with the menu script included, or fork into [My Code](/ui-snippets/mycode/). Pair it with the dark [Centred Gradient Hero](/website-section-templates/centered-gradient-hero/) for a complete AI-product header.`,
    },
    features: [
      'Floating dark glass pill with logo, centred links and CTA',
      'Full-screen mobile menu with large staggered links (GSAP)',
      'Esc to close, focus trap and aria-expanded',
      'Backdrop-filter blur over a theme-coloured surface',
      'Sticky by default; optional hide on scroll down',
      'Upload a logo or use the icon + name mark',
      'Links show without JavaScript',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '◍', title: 'Feels premium', desc: 'A floating glass pill instantly reads as modern and polished, especially over dark heroes.' },
      { icon: '⛶', title: 'App-like mobile menu', desc: 'A full-screen menu with big links is easy to tap and makes small screens feel spacious.' },
      { icon: '⌨', title: 'Accessible', desc: 'The overlay menu handles focus, Esc and screen readers, not just the animation.' },
    ],
    useCases: [
      { icon: '🤖', title: 'AI product website', desc: 'Float it over a dark gradient hero with links to Product, Features, Pricing and Docs and a "Get started" button.' },
      { icon: '🎨', title: 'Design studio or portfolio', desc: 'Use Work, Services, About and Contact links, with the full-screen menu showcasing your bold typography on phones.' },
      { icon: '🧑‍💻', title: 'Developer tool', desc: 'Link to Docs, Changelog, Pricing and GitHub, and send the button to sign-up.' },
      { icon: '🎟️', title: 'Event or launch page', desc: 'Keep a floating "Get tickets" button visible as visitors scroll through the agenda and speakers.' },
    ],
    faqs: [
      { q: 'How is the glass effect made?', a: 'With backdrop-filter: blur() on a translucent background mixed from the theme’s surface colour, plus a thin border and a soft shadow. Browsers without backdrop-filter show the solid colour.' },
      { q: 'How does the full-screen menu work?', a: 'On small widths the navigation becomes a fixed overlay covering the screen. The menu script toggles it, GSAP fades it in and staggers the links, and Esc, link clicks or the X close it.' },
      { q: 'Will it work on a light page?', a: 'Yes. It is designed to float over any page; on light pages the dark pill stands out, or switch to a light surface colour for a lighter pill.' },
      { q: 'Can I add more links?', a: 'Up to six fit comfortably in the pill on desktop. The full-screen mobile menu can hold all of them easily.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the floating navbar: add a search command palette, show the current section while scrolling, or make the pill shrink on scroll.',
      prompt: `Create a floating pill navbar in HTML, CSS and JavaScript.

- A sticky section with a centred, max 1040px rounded pill: dark translucent background with backdrop-filter blur, thin border and shadow; logo left, links centred, a rounded CTA button right.
- Below 860px: hide links behind a round hamburger; open a full-screen fixed overlay with large bold links and a big CTA, links staggered in with GSAP.
- Menu script: aria-expanded, Esc to close (return focus), trap Tab, close on link click and on resize to desktop; links visible without JS.
- Note: remove backdrop-filter on the pill while the overlay is open so the fixed overlay covers the viewport.`,
    },
  },

  'navbar-announcement': {
    keywords: ['announcement bar html css', 'navbar with announcement bar', 'top banner header template', 'dismissible banner', 'ecommerce header template'],
    about: {
      title: 'Navbar With Announcement Bar — Free Header Template',
      description: `**Navbar With Announcement Bar** combines the two things most store and SaaS headers need: a slim bar across the top for news, offers and launches, and a full navigation bar underneath. The announcement has its own link and a close button that collapses it smoothly with GSAP, and the navbar has your logo and links on the left with sign-in and a call to action on the right.

**Announce anything**

Use the bar for a sale ("30% off yearly plans until 31 May"), a launch, a webinar or a changelog update. Emoji work fine. Switch the whole bar off when there's nothing to announce, or let visitors dismiss it themselves.

**Navbar that adapts**

On desktop, links sit next to the logo for a compact, store-style layout. On phones they fold into an animated hamburger menu with the sign-in link and a full-width button at the bottom, with Esc to close, a focus trap and aria-expanded built in. Without JavaScript the links simply show.

**Sticky options**

Keep the header stuck to the top, and optionally hide it while scrolling down and show it on the way back up. The warm cream theme with a raspberry accent suits fashion and lifestyle shops; switch presets or apply your brand kit.

**Export it**

Download HTML, a ZIP, React or Vue with the menu and dismiss scripts included, or fork into [My Code](/ui-snippets/mycode/). For a simpler header, see the [Simple Sticky Navbar](/website-section-templates/navbar-simple/).`,
    },
    features: [
      'Announcement bar with text, link and close button',
      'Dismiss collapses the bar smoothly (GSAP); bar can be switched off',
      'Navbar with logo and links left, sign-in and CTA right',
      'Animated hamburger menu with Esc, focus trap and aria-expanded',
      'Sticky header with optional hide on scroll down',
      'Upload a logo or use the icon + name mark',
      'Links show without JavaScript',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '📣', title: 'Prime real estate', desc: 'The very top of the page is the first thing every visitor sees, which makes it perfect for offers and news.' },
      { icon: '✕', title: 'Respectful', desc: 'Visitors can dismiss the announcement, and it collapses smoothly instead of jumping.' },
      { icon: '🛍', title: 'Store-ready layout', desc: 'Links beside the logo and a strong button suit shops with several categories.' },
    ],
    useCases: [
      { icon: '🏷️', title: 'Sale or discount', desc: 'Announce "Free shipping this weekend" or a seasonal sale with a link straight to the offer.' },
      { icon: '🚀', title: 'Product launch', desc: 'Point the bar to your launch post or Product Hunt page while the launch is live.' },
      { icon: '🎙️', title: 'Webinar or event', desc: 'Promote an upcoming webinar with the date in the text and a registration link.' },
      { icon: '🛠️', title: 'Status or changelog', desc: 'Share a new release or scheduled maintenance notice with a link to details.' },
    ],
    faqs: [
      { q: 'Can visitors close the announcement?', a: 'Yes. The × button collapses the bar with a smooth GSAP animation and removes it. It reappears on the next page load; to remember the choice, store it in localStorage in your exported code.' },
      { q: 'Can I turn the announcement bar off?', a: 'Yes. Switch the Announcement bar group off and only the navbar remains.' },
      { q: 'Is the close button accessible?', a: 'Yes. It is a real button with an editable screen-reader label such as "Dismiss announcement".' },
      { q: 'How does it look on phones?', a: 'The announcement text wraps to the left of the close button, and the navbar shows the logo and a hamburger that opens the links, sign-in link and button.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the header: remember dismissal in localStorage, rotate several announcements, or add a cart icon with an item count.',
      prompt: `Create a site header with an announcement bar in HTML, CSS and JavaScript.

- Top: a dark slim bar with centred announcement text, an underlined link and a close button on the right; clicking close animates the bar's height to 0 with GSAP and removes it.
- Below: a navbar with logo and links on the left, a "Sign in" link and filled button on the right.
- Below 900px: links, sign-in and button move into a hamburger dropdown with aria-expanded, Esc to close, focus trap and staggered GSAP entrance; links visible without JS.
- Optional sticky header with hide-on-scroll-down.`,
    },
  },

  'footer-columns': {
    keywords: ['footer template html css', 'website footer template', 'multi column footer', 'footer with social icons', 'responsive footer'],
    about: {
      title: 'Multi-Column Footer — Free Website Footer Template',
      description: `**Multi-Column Footer** is the classic footer that tidily holds everything a site needs at the bottom of every page: your logo with a one-line description and social icons on the left, up to five columns of links on the right, and a bottom bar with the copyright notice, legal links and a back-to-top button.

**Columns that are easy to edit**

Each column is an item in a list with a title and its links, written one per line as \`Label | URL\` (for example \`Pricing | /pricing/\`). Add, reorder or remove whole columns, and the grid reflows from four columns to two on phones. Links are checked before use, so unsafe URLs never make it into the page.

**Social icons included**

Pick icons for X (Twitter), LinkedIn, GitHub, YouTube, Instagram, Facebook, Dribbble or Figma, each with a screen-reader label and link, or switch the social row off.

**Smooth back to top**

The back-to-top button scrolls smoothly to the top of the page with GSAP's ScrollToPlugin; without JavaScript it's still a normal link to the top, and for reduced-motion users it jumps instantly. Leave its text empty to hide it.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). It shares the theme with the [navbars](/website-section-templates/category/navbar/) and every other section, so a whole page looks consistent.`,
    },
    features: [
      'Logo, tagline and social icons beside link columns',
      'Up to 5 link columns, each written as "Label | URL" lines',
      'Social icons: X, LinkedIn, GitHub, YouTube, Instagram and more',
      'Bottom bar with copyright, legal links and back to top',
      'Back to top scrolls smoothly with GSAP ScrollToPlugin',
      'Unsafe link URLs replaced automatically',
      'Columns reflow to two on phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🗺', title: 'A sitemap for people', desc: 'Grouped link columns help visitors (and search engines) find every important page.' },
      { icon: '✎', title: 'Fast to edit', desc: 'Writing links as "Label | URL" lines is quicker than filling in dozens of separate fields.' },
      { icon: '↑', title: 'Small touches', desc: 'A smooth back-to-top button and hover states make the footer feel finished.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS website', desc: 'Organise Product, Company and Resources columns with links to features, pricing, careers, docs and status.' },
      { icon: '🏢', title: 'Company site', desc: 'List services, locations, about and contact pages, with legal links for privacy and terms.' },
      { icon: '🛍️', title: 'Online store', desc: 'Use Shop, Help and About columns for categories, shipping, returns and your story.' },
      { icon: '📚', title: 'Documentation or blog', desc: 'Link to popular guides, categories and community pages from every article.' },
    ],
    faqs: [
      { q: 'How do I add links to a column?', a: 'Write one link per line as Label | URL, for example Pricing | /pricing/. A line without a URL links to #. Add whole columns with + Add column.' },
      { q: 'Can I add more social networks?', a: 'Yes. Add a social link and choose its icon: X (Twitter), LinkedIn, GitHub, YouTube, Instagram, Facebook, Dribbble or Figma. Each has a label for screen readers.' },
      { q: 'How does back to top work?', a: 'It is a link to the top of the page. With JavaScript, GSAP ScrollToPlugin scrolls there smoothly; with reduced motion it jumps instantly.' },
      { q: 'Is the footer accessible?', a: 'Yes. It uses a footer element, each column is a labelled nav, social icon links have text labels, and all links are real anchors.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the footer: add a language selector, a newsletter field, or app store badges under the logo.',
      prompt: `Create a responsive multi-column website footer in HTML, CSS and JavaScript.

- Left: logo, a one-line tagline and a row of square social icon links (with aria-labels).
- Right: three or four link columns, each a nav with an uppercase title and a list of links.
- Bottom bar under a divider: copyright on the left, legal links and a pill "Back to top ↑" button on the right.
- Container queries: stack the two halves below 820px and use two link columns below 520px.
- JavaScript: the back-to-top link scrolls smoothly with GSAP ScrollToPlugin (instant for reduced motion).`,
    },
  },

  'footer-giant': {
    keywords: ['big text footer', 'giant wordmark footer', 'agency footer template', 'dark footer html css', 'footer call to action'],
    about: {
      title: 'Big Wordmark Footer — Free Giant Text Footer Template',
      description: `**Big Wordmark Footer** ends your site with a statement. At the top, a closing call to action ("Have a project in mind? Let's talk.") with a button and your email; in the middle, a row of links and round social icons; and at the bottom, your brand name set as a giant wordmark across the full width of the page, fading softly toward the bottom.

**A reveal to remember**

The wordmark is animated with GSAP SplitText: as the footer scrolls into view it rises in word by word, line by line, letter by letter or with a blur, depending on the text effect you pick in the Animation panel. It's also hidden from screen readers (it repeats your brand name), so it never gets in the way.

**Sized to fit**

The wordmark scales with the width of the section using container query units, so it fills the footer on any screen without overflowing. Short names of up to about ten letters work best.

**Dark and bold**

It ships in near-black with an orange accent, a favourite for studios and agencies, and every colour comes from the shared theme. Write links one per line as \`Label | URL\`, add social icons for Instagram, Dribbble, LinkedIn and more, and set the copyright and legal links.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a conventional sitemap footer, see the [Multi-Column Footer](/website-section-templates/footer-columns/).`,
    },
    features: [
      'Closing call to action with button and email line',
      'Links row and round social icons',
      'Giant full-width brand wordmark with a soft fade',
      'Wordmark revealed with GSAP SplitText (pick the text effect)',
      'Wordmark scales with container query units, no overflow',
      'Copyright and legal links bar',
      'Dark theme; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: 'A', title: 'Memorable ending', desc: 'A huge wordmark leaves a strong brand impression just as visitors decide what to do next.' },
      { icon: '✦', title: 'Motion with purpose', desc: 'The SplitText reveal rewards scrolling to the end without distracting from the call to action.' },
      { icon: '→', title: 'One last ask', desc: 'The closing heading and button catch visitors who scrolled the whole page.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Design studio', desc: 'End your portfolio with "Have a project in mind?", a start-a-project button and your studio name in giant type.' },
      { icon: '🧑‍💻', title: 'Freelancer or creator', desc: 'Use your own name as the wordmark and link to your work, writing and socials.' },
      { icon: '🚀', title: 'Product launch site', desc: 'Close the launch page with a sign-up call to action and the product name as a bold sign-off.' },
      { icon: '🎟️', title: 'Event website', desc: 'Show the event name huge at the bottom with a "Get tickets" button above it.' },
    ],
    faqs: [
      { q: 'How big is the wordmark?', a: 'It scales with the width of the section (about 15% of it per character height) so it fills the width without overflowing. Shorter names, up to about ten letters, look best.' },
      { q: 'How is the wordmark animated?', a: 'With GSAP SplitText: it is marked for the headline text effect, so it rises in by words, lines or letters, or blurs in, when the footer scrolls into view. Pick the effect in the Animation panel.' },
      { q: 'Is the giant text read by screen readers?', a: 'No. It is decorative and hidden with aria-hidden, because it repeats the brand name that is already in the page.' },
      { q: 'Can I use a light theme?', a: 'Yes. Pick a light colour preset or your brand kit; the wordmark uses the text colour with a fade, so it works on light backgrounds too.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the big footer: make the wordmark react to the mouse, use an outlined text style, or add a live local time for your studio.',
      prompt: `Create a dark footer with a giant wordmark in HTML, CSS and JavaScript.

- Top: a large heading with one highlighted phrase and a pill button with an email line beside it; a divider.
- Middle: a row of links and round social icon buttons.
- Bottom: the brand name as a huge single-line wordmark (font-size in cqi so it fills the width), faded toward the bottom with a CSS mask, aria-hidden; then copyright and legal links.
- GSAP SplitText reveals the wordmark by characters when it scrolls into view; respect prefers-reduced-motion.`,
    },
  },

  'footer-newsletter': {
    keywords: ['footer with newsletter', 'newsletter footer template', 'footer email signup html', 'footer subscribe form', 'dark footer template'],
    about: {
      title: 'Footer With Newsletter — Free Footer Signup Template',
      description: `**Footer With Newsletter** turns the bottom of every page into a sign-up opportunity. On the left: your logo, a short title and pitch ("Get the weekly digest") and an email form; on the right: columns of links; underneath: social icons, the copyright notice and legal links.

**A working sign-up form**

The form posts directly to your email service. Paste the form action URL from Mailchimp, Kit (ConvertKit), Buttondown, Brevo or your own endpoint, and set the email field name your service expects. The URL is checked before use, and the input has the right email type, autocomplete and required attributes. In the editor the form never submits, so you can try it safely.

**Links and socials**

Up to four link columns, each written one link per line as \`Label | URL\`, plus social icons for X, LinkedIn, GitHub, YouTube, Instagram and more. On phones the form stacks and the link columns sit two by two.

**Deep navy theme**

It ships in a deep navy with a sky-blue accent, which works for media sites, SaaS and stores, and every colour is a theme token you can change with presets or your brand kit.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a full-width sign-up section elsewhere on the page, see the [Newsletter Signup CTA](/website-section-templates/cta-newsletter/).`,
    },
    features: [
      'Newsletter title, pitch and email form beside link columns',
      'Form posts to Mailchimp, Kit, Buttondown or any form URL',
      'Configurable email field name; URLs checked before use',
      'Up to 4 link columns as "Label | URL" lines',
      'Social icons, copyright and legal links',
      'Form stacks and columns go two by two on phones',
      'Deep navy theme; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '✉', title: 'Sign-ups on every page', desc: 'The footer appears everywhere, so every reader who reaches the end can join your list.' },
      { icon: '⚙', title: 'Works with your provider', desc: 'Paste a form URL and field name; no plugin or script is needed to collect emails.' },
      { icon: '🗂', title: 'Everything in one place', desc: 'Newsletter, navigation, socials and legal links in one tidy footer.' },
    ],
    useCases: [
      { icon: '📰', title: 'Blog or media site', desc: 'Grow your newsletter from every article with a weekly digest sign-up in the footer.' },
      { icon: '🛍️', title: 'Online store', desc: 'Offer early access to sales for subscribers, with Shop, Help and About link columns.' },
      { icon: '🚀', title: 'SaaS product updates', desc: 'Let customers and prospects subscribe to product news and changelog emails.' },
      { icon: '🎙️', title: 'Podcast website', desc: 'Collect listener emails for new-episode alerts alongside links to episodes and platforms.' },
    ],
    faqs: [
      { q: 'How do I connect the form?', a: 'Copy the form action URL from your email service’s embed code into Form URL and set Email field name (for example EMAIL for Mailchimp, email_address for Kit). The exported form posts sign-ups straight to your list.' },
      { q: 'Will the form submit in the editor?', a: 'No. Submissions are blocked in the preview so you can test the layout. The exported page submits normally.' },
      { q: 'How do I edit the link columns?', a: 'Each column has a title and a links box where you write one link per line as Label | URL. Add, reorder or remove columns in the panel.' },
      { q: 'Is it responsive?', a: 'Yes. On narrow widths the newsletter block sits above the links, the form stacks with a full-width button, and link columns go two by two.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the footer: submit the form with fetch and show a thank-you message, add a cookie settings link, or add a currency and language picker.',
      prompt: `Create a dark website footer with a newsletter form in HTML and CSS.

- Left: logo, a small heading, a short pitch and an email form (input type="email" required autocomplete="email" with aria-label, and a button) that posts to a configurable action URL.
- Right: three link columns, each a nav with an uppercase title and a list of links.
- Bottom bar under a divider: social icon links, copyright and legal links.
- Container queries stack the halves below 820px and stack the form below 520px; CSS custom properties for the theme.`,
    },
  },

  'footer-minimal': {
    keywords: ['minimal footer template', 'simple footer html css', 'one line footer', 'small website footer', 'landing page footer'],
    about: {
      title: 'Minimal Footer — Free Simple One-Row Footer Template',
      description: `**Minimal Footer** is a small, tidy footer for sites that don't need a sitemap at the bottom: your logo on the left, a single row of links in the middle, social icons on the right, and a thin divider with the copyright line underneath. It's ideal for landing pages, portfolios and apps with only a few pages.

**Quick to set up**

Write the links one per line as \`Label | URL\`. Page anchors such as #features and #pricing work well on one-page sites. Add up to six social icons (X, LinkedIn, GitHub, YouTube, Instagram, Dribbble and more) or switch them off, and upload your logo or use the icon-and-name mark.

**Centred on phones**

On narrow screens the logo, links and icons stack and centre, so the footer stays balanced on every device. Link URLs are checked before use, and social links carry labels for screen readers.

**Light and calm**

A white background with a teal accent keeps it unobtrusive; switch the colours with any preset or your brand kit to match the rest of your page.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For more links and a back-to-top button, use the [Multi-Column Footer](/website-section-templates/footer-columns/).`,
    },
    features: [
      'Logo, a row of links and social icons on one line',
      'Copyright line under a thin divider',
      'Links written as "Label | URL" lines (anchors work)',
      'Up to 6 social icons with screen-reader labels',
      'Stacks and centres on phones',
      'Upload a logo or use the icon + name mark',
      'Light theme; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '➖', title: 'Just enough', desc: 'Small sites only need a few links; a compact footer ends the page cleanly.' },
      { icon: '⚓', title: 'Great for one-pagers', desc: 'Anchor links let visitors jump back to any section of a single long page.' },
      { icon: '◐', title: 'Matches the page', desc: 'Shares the theme with every section, so it never looks bolted on.' },
    ],
    useCases: [
      { icon: '📄', title: 'Landing page', desc: 'Link to #features, #pricing and #faq plus your privacy policy at the bottom of a single-page site.' },
      { icon: '🧑‍🎨', title: 'Portfolio', desc: 'Show your name, links to work and contact, and icons for Dribbble, Instagram and LinkedIn.' },
      { icon: '📱', title: 'App website', desc: 'Add support, privacy and terms links required by app stores, in a tidy single row.' },
      { icon: '⏳', title: 'Coming-soon page', desc: 'Keep a minimal footer with social links while the full site is being built.' },
    ],
    faqs: [
      { q: 'How many links fit?', a: 'Five or six fit comfortably in one row on desktop; more will wrap neatly. For many links, use the Multi-Column Footer.' },
      { q: 'Can I link to sections on the same page?', a: 'Yes. Use anchors like Features | #features; the matching section needs an id of features.' },
      { q: 'How does it look on mobile?', a: 'The logo, links and icons stack and centre, with the copyright line below.' },
      { q: 'Can I remove the social icons?', a: 'Yes. Switch the Social links group off.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the minimal footer: add a theme toggle, a "made with" badge, or a tiny email sign-up field.',
      prompt: `Create a minimal one-row website footer in HTML and CSS.

- One row: logo on the left, a list of 5 inline links in the middle, social icon links (with aria-labels) on the right, then a thin divider and a centred copyright line.
- Container queries: below 760px stack and centre everything.
- CSS custom properties for colours, fonts and radius.`,
    },
  },

  'team-grid': {
    keywords: ['team section template', 'meet the team html css', 'team members grid', 'about us team section', 'team cards with social links'],
    about: {
      title: 'Team Grid — Free Meet the Team Section Template',
      description: `**Team Grid** introduces the people behind your company: a centred heading and intro, then a grid of cards with each person's photo, name, role and a one-line bio. Hover a card and its photo zooms gently while LinkedIn and X icons slide up over it; on touch screens the icons are always visible.

**People as a list**

Add up to twelve team members, reorder them (founders first, or alphabetical) and duplicate a card to add the next person quickly. Leave a bio or social link empty and it disappears. Upload real photos, which are resized in your browser and kept on your device, or start with the illustrated placeholders.

**Responsive grid**

Four columns on desktop, three on small laptops and two on phones, using container queries so the grid fits wherever you place it. Photos are cropped to neat squares with your theme's corner radius.

**Animated with GSAP**

The heading reveals with a SplitText effect and the cards stagger in as the section scrolls into view, with reduced-motion support.

**Export it**

Download HTML, a ZIP with your photos, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a larger team, try the [Team Carousel](/website-section-templates/team-carousel/).`,
    },
    features: [
      'Grid of member cards: photo, name, role and short bio',
      'LinkedIn and X icons slide over the photo on hover',
      'Icons always visible on touch screens',
      'Up to 12 members: add, duplicate, reorder, remove',
      'Upload photos or use illustrated placeholders',
      'Four, three or two columns by width',
      'SplitText heading and staggered card entrance',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🙂', title: 'Faces build trust', desc: 'Seeing the real people behind a product makes a company feel approachable and credible.' },
      { icon: '🔗', title: 'Easy to connect', desc: 'Social links on each card let partners and candidates reach the right person.' },
      { icon: '✦', title: 'Small delights', desc: 'Photo zoom and sliding icons make browsing the team feel polished.' },
    ],
    useCases: [
      { icon: '🏢', title: 'About page', desc: 'Introduce founders and key team members with roles and a line about what each of them cares about.' },
      { icon: '🎨', title: 'Agency team page', desc: 'Show the designers, developers and strategists clients will work with, with links to their profiles.' },
      { icon: '🚀', title: 'Startup homepage', desc: 'Build trust with investors and early users by showing the small team behind the product.' },
      { icon: '🏫', title: 'School or course staff', desc: 'Present instructors with their subjects and short bios so students know who will teach them.' },
    ],
    faqs: [
      { q: 'How many team members can I show?', a: 'Up to twelve. The grid shows four per row on desktop and two on phones; for larger teams, the Team Carousel holds sixteen in one scrolling row.' },
      { q: 'Can I add other social links?', a: 'The cards include LinkedIn and X. After exporting you can add more links in the same style, such as GitHub or Dribbble, using any SVG icon.' },
      { q: 'What photo size should I use?', a: 'Square photos of at least 400×400 px. Uploads are resized in your browser and cropped to squares automatically.' },
      { q: 'Do the social icons work on phones?', a: 'Yes. On touch screens, where hover isn’t available, the icons are always visible on the photo.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the team grid: add a click-to-open bio modal, filter by department, or pull members from a JSON file.',
      prompt: `Create a "Meet the team" section in HTML and CSS.

- Centred header with eyebrow, heading and intro, then a 4-column grid of member cards: square photo with rounded corners, name, role in the brand colour and a short bio.
- On hover the photo zooms slightly and round LinkedIn and X icon buttons slide up from the bottom-left of the photo; on touch devices (hover: none) they are always visible.
- Container queries: 3 columns below 960px, 2 below 700px. CSS custom properties for the theme.`,
    },
  },

  'team-carousel': {
    keywords: ['team carousel html css', 'team slider template', 'draggable team section', 'portrait cards slider', 'creative team section'],
    about: {
      title: 'Team Carousel — Free Draggable Team Slider Template',
      description: `**Team Carousel** shows your people as tall portrait cards in a row you can drag, swipe or step through. Each card has a full-bleed photo with the person's name and role over a soft gradient, and a heading with round arrow buttons sits above the row. It suits creative teams, studios and larger teams that don't fit one grid row.

**Drag with momentum**

On desktop, drag the row with the mouse and it glides and snaps to the nearest card (GSAP Draggable on a proxy plus InertiaPlugin); the arrows ease from card to card with ScrollToPlugin and disable at the ends. On phones it's native swiping with scroll-snap, and without JavaScript it's still a scrollable row.

**Up to sixteen people**

Add, reorder and remove people, upload portrait photos (cropped to tall 3:4 cards), and optionally link each name to a profile page. The dark theme with a yellow accent is easy to restyle with presets or your brand kit.

**Accessible and animated**

The row is a labelled, focusable region and the arrows have screen-reader labels you can edit. The heading reveals with SplitText and the cards stagger in on scroll.

**Export it**

Download HTML, a ZIP, React or Vue with the carousel script, or fork into [My Code](/ui-snippets/mycode/). For a static layout, see the [Team Grid](/website-section-templates/team-grid/).`,
    },
    features: [
      'Tall portrait cards with name and role over a gradient',
      'Drag with momentum and snap (GSAP Draggable + Inertia)',
      'Arrow buttons with eased scrolling; disabled at the ends',
      'Native swipe and scroll-snap on touch; works without JS',
      'Up to 16 people, with optional profile links',
      'Labelled, focusable row and editable arrow labels',
      'Dark theme with a bright accent',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '⇆', title: 'Fits bigger teams', desc: 'A scrolling row shows many people without a long grid pushing the page down.' },
      { icon: '🖼', title: 'Portrait-first', desc: 'Tall, full-bleed photos give each person presence, ideal for creative teams.' },
      { icon: '✋', title: 'Fun to explore', desc: 'Momentum dragging invites visitors to browse the whole team.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Studio or agency', desc: 'Showcase the creative team with striking portraits and link each name to a personal profile or portfolio.' },
      { icon: '🎤', title: 'Conference speakers', desc: 'Use it as a speaker line-up with names and talk topics in the role line.' },
      { icon: '🎓', title: 'Instructors or coaches', desc: 'Present mentors in a row that visitors can swipe through on their phones.' },
      { icon: '🏢', title: 'Leadership team', desc: 'Show department heads with their titles, linking to longer bios.' },
    ],
    faqs: [
      { q: 'How does dragging work?', a: 'On devices with a mouse, GSAP Draggable tracks an invisible proxy and moves the row’s native scroll position, with InertiaPlugin momentum and snapping to cards. Touch devices use normal swiping with CSS scroll-snap.' },
      { q: 'What photo shape works best?', a: 'Portrait photos; cards are cropped to 3:4. Faces near the top or centre of the image work best because the name sits over the bottom.' },
      { q: 'Can names link to profile pages?', a: 'Yes. Add a profile link to a person and their name becomes a link; leave it empty for plain text.' },
      { q: 'Does it work without JavaScript?', a: 'Yes. The cards sit in a horizontally scrollable row, so visitors can still scroll through them.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the team carousel: flip cards to show a bio on click, add an autoplay mode, or show each person’s favourite tool.',
      prompt: `Create a team carousel section in HTML, CSS and JavaScript.

- Header with eyebrow, heading and intro on the left and two round arrow buttons on the right.
- A horizontally scrollable list of tall 3:4 portrait cards; each card has a full-bleed photo with the name and role over a dark gradient at the bottom.
- JavaScript with GSAP: drag the row with Draggable on an invisible proxy mapped to scrollLeft, InertiaPlugin momentum, snap to cards; arrows scroll card by card with ScrollToPlugin and disable at the ends.
- Native scroll-snap for touch; respect prefers-reduced-motion.`,
    },
  },

  'team-hiring': {
    keywords: ['careers section template', 'we are hiring section', 'jobs section html css', 'team and culture section', 'open positions list'],
    about: {
      title: 'Team With Hiring CTA — Free Careers Section Template',
      description: `**Team With Hiring CTA** combines culture and recruiting in one section. On the left: a heading, a few lines about how your team works and a playful mosaic of round team photos ending with a "+32" bubble. On the right: a "We're hiring" card with a pulsing dot, a short list of perks, your open roles (each linking to its job page) and a button to the full careers page.

**Roles in seconds**

Write open roles one per line as \`Role · Location | URL\`, for example \`Backend Engineer · Europe | /careers/backend/\`. Each becomes a row with a sliding arrow. Perks are typed one per line with check marks. Switch the whole hiring card off when you're not recruiting.

**Faces of the team**

Add up to twelve photos; each person's name becomes the photo's alt text. The "more" bubble shows how many others are on the team, or leave it empty to hide it.

**Responsive and animated**

On tablets and phones the hiring card moves below the team. The heading reveals with GSAP SplitText, the faces fade in and the card rises into place on scroll.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with the [Team Grid](/website-section-templates/team-grid/) on your about page.`,
    },
    features: [
      'Team photo mosaic with a “+ more” bubble',
      '“We’re hiring” card with pulsing dot, perks and open roles',
      'Roles written as “Role · Location | URL” lines',
      'Perks as a checklist; hiring card can be switched off',
      'Names used as photo alt text',
      'Card moves below the team on narrow widths',
      'SplitText heading and rising card on scroll',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🤝', title: 'Culture plus action', desc: 'Candidates see the people they would work with and the jobs they can apply for in one place.' },
      { icon: '⚡', title: 'Quick to update', desc: 'Adding or closing a role is a one-line change.' },
      { icon: '●', title: 'Signals momentum', desc: 'A live “we’re hiring” card tells every visitor the company is growing.' },
    ],
    useCases: [
      { icon: '💼', title: 'Careers page header', desc: 'Open your careers page with the team mosaic, your best perks and links to every open role.' },
      { icon: '🏢', title: 'About page', desc: 'End the about page with a recruiting card so interested readers can apply straight away.' },
      { icon: '🚀', title: 'Startup homepage', desc: 'Recruit early hires by showing the founding team and two or three key roles.' },
      { icon: '🌍', title: 'Remote company', desc: 'Highlight remote-friendly perks and list roles by region or time zone.' },
    ],
    faqs: [
      { q: 'How do I add open roles?', a: 'Write one role per line as Role · Location | URL, for example Product Designer · Remote | /careers/designer/. Each line becomes a linked row with an arrow.' },
      { q: 'Can I hide the hiring card?', a: 'Yes. Switch the Hiring card group off and only the team section remains.' },
      { q: 'How many photos can I show?', a: 'Up to twelve, plus an optional “+N” bubble for the rest of the team.' },
      { q: 'Should I link to a jobs board?', a: 'Any URL works: your own careers pages, or job posts on Ashby, Greenhouse, Lever, Workable or LinkedIn.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the careers section: load roles from your ATS API, filter by department, or add salary ranges to each role.',
      prompt: `Create a team and careers section in HTML and CSS.

- Left: eyebrow, heading with a highlighted phrase, short text and a wrapping row of round team photos (with white rings) ending in a "+32" bubble.
- Right: a "We're hiring" card with a pulsing green dot, a checklist of perks, a list of open roles as full-width links with arrows that slide on hover, and a button.
- Container queries stack the columns below 860px.
- GSAP: SplitText heading, faces fading in and the card rising on scroll, respecting prefers-reduced-motion.`,
    },
  },

  'contact-split-form': {
    keywords: ['contact form section', 'contact us template html', 'formspree contact form', 'contact page template', 'contact form with details'],
    about: {
      title: 'Contact Form With Details — Free Contact Us Section Template',
      description: `**Contact Form With Details** is a complete "Contact us" section: on the left, a heading, a short message and the ways people can reach you (email, phone, address and office hours, each with an icon and link); on the right, a contact form in a card with name, email and message fields.

**A form that actually sends**

Paste your form endpoint from Formspree, Basin, Getform or your own server, and the exported form works immediately. With JavaScript it sends in the background, the fields fade away and an animated thank-you message appears; if sending fails, an error message asks the visitor to try again, and their message is kept. Without JavaScript it's a normal form post. A hidden honeypot field helps block spam bots.

**Safe to try in the editor**

In the preview the form never sends anything: submitting simulates success so you can see the whole flow. Every label, the button, the note and the success and error messages are editable.

**Contact details as a list**

Add up to six contact methods with icons from the built-in set, and link them with mailto:, tel: or a map link. Leave the link empty for plain text such as opening hours.

**Export it**

Download HTML, a ZIP, React or Vue with the form script, or fork into [My Code](/ui-snippets/mycode/). For a location-focused page, see [Contact With Map](/website-section-templates/contact-map/).`,
    },
    features: [
      'Contact details with icons beside a form card',
      'Working form: Formspree, Basin, Getform or any endpoint',
      'Sends in the background with animated success and error states',
      'Normal form post without JavaScript; honeypot anti-spam field',
      'Preview simulates success; nothing is sent from the editor',
      'Editable labels, button, note and messages',
      'Proper autocomplete, required fields and accessible labels',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '✉', title: 'Real enquiries', desc: 'Visitors can reach you without leaving the page or opening an email app.' },
      { icon: '✔', title: 'Clear feedback', desc: 'An animated thank-you message confirms the message arrived, and errors never lose what was typed.' },
      { icon: '☎', title: 'Every channel', desc: 'Email, phone, address and hours sit beside the form for people who prefer them.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Agency enquiries', desc: 'Collect project briefs with a form that goes straight to your inbox through Formspree.' },
      { icon: '🏢', title: 'Business contact page', desc: 'List phone, email and opening hours next to a form for general questions.' },
      { icon: '🧑‍💻', title: 'Freelancer website', desc: 'Let potential clients describe their project and promise a reply within a day.' },
      { icon: '🛟', title: 'Support requests', desc: 'Change the labels to collect support questions and route them to your help desk email.' },
    ],
    faqs: [
      { q: 'How do I make the form send emails?', a: 'Create a free form on Formspree, Basin or Getform, copy its endpoint URL into Form URL, and export. Submissions are emailed to you. Your own server endpoint works too; the fields are name, email and message.' },
      { q: 'What happens after someone submits?', a: 'With JavaScript, the form is sent in the background; on success the fields fade out and the thank-you message animates in, and on failure an error message appears with the typed message intact.' },
      { q: 'Will submissions be sent while I edit?', a: 'No. In the editor preview the form simulates success and nothing is sent.' },
      { q: 'Does it protect against spam?', a: 'It includes a hidden honeypot field named _gotcha, which Formspree and similar services use to discard bot submissions. Add a CAPTCHA from your provider for extra protection.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the contact form: add a budget dropdown, a file upload, or route messages to different emails by topic.',
      prompt: `Create a contact section with a working form in HTML, CSS and JavaScript.

- Left: eyebrow, heading, intro and a list of contact methods (icon tile, small label, linked value).
- Right: a card with a form posting to a Formspree URL: name and email side by side, message textarea, hidden _gotcha honeypot, submit button and a note; plus hidden success and error messages.
- JavaScript: on submit, send with fetch (FormData, Accept: application/json), show an animated success state with GSAP or an error message; keep a normal form post as the fallback.
- Container queries stack the columns below 860px.`,
    },
  },

  'contact-cards': {
    keywords: ['contact options section', 'sales and support contact', 'contact cards html css', 'help center contact section', 'contact us page design'],
    about: {
      title: 'Contact Options Cards — Free Sales and Support Section Template',
      description: `**Contact Options Cards** sends each visitor to the right team. Under a "How can we help?" heading, cards for sales, support, partnerships and press each have an icon, a short description, a response-time note with a green "online" dot and a link, such as a booking page, help centre or email address.

**Fewer misrouted messages**

Separating sales from support means prospects reach someone who can talk pricing and customers reach someone who can fix problems, and both know how quickly they'll hear back.

**Flexible options**

Add up to six cards and reorder them. Each card's link can be a page, a mailto: address or a chat link, and long email addresses wrap neatly. Leave the note empty to hide it. Choose icons from the built-in set.

**Dark and calm**

It ships in a deep teal-black with a mint accent; cards lift and highlight on hover. Switch presets or apply your brand kit to match your site. The heading reveals with GSAP SplitText and the cards stagger in on scroll.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Pair it with a form from [Contact Form With Details](/website-section-templates/contact-split-form/).`,
    },
    features: [
      'Cards for sales, support, partnerships, press or any team',
      'Icon, description, response-time note and link per card',
      'Links to pages, mailto: or chat; long emails wrap',
      'Up to 6 cards: add, duplicate, reorder, remove',
      'Green “online” dot on response-time notes',
      'Cards lift and highlight on hover',
      'Dark theme; any preset or brand kit',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '🧭', title: 'Right team, first time', desc: 'Visitors choose the team that fits, so they get the right answer faster.' },
      { icon: '⏱', title: 'Sets expectations', desc: 'Response-time notes tell people when to expect a reply.' },
      { icon: '⚙', title: 'No form needed', desc: 'Each card links to the tool that team already uses: a booking page, help centre or inbox.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS contact page', desc: 'Offer "Book a demo" for sales, "Open help centre" for support and a partnerships email.' },
      { icon: '🏢', title: 'Company with departments', desc: 'Route visitors to HR, sales, billing and media relations from one page.' },
      { icon: '📰', title: 'Press and media', desc: 'Give journalists a direct press contact and a link to your press kit.' },
      { icon: '🛟', title: 'Help page header', desc: 'Start a help page with options for docs, community forum, email support and status.' },
    ],
    faqs: [
      { q: 'Can each card link somewhere different?', a: 'Yes. Each card has its own link text and URL: a page, a mailto: address, a tel: number or a chat link.' },
      { q: 'How many options can I show?', a: 'Up to six. Three or four usually works best; the grid wraps automatically.' },
      { q: 'Can I remove the response-time note?', a: 'Yes. Leave the note empty and it disappears, including the green dot.' },
      { q: 'Can I use a light theme?', a: 'Yes. Choose a light colour preset or apply your brand kit; the cards and accents follow the theme.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the contact cards: show live support status from an API, open a chat widget from the support card, or add office time zones.',
      prompt: `Create a "How can we help?" contact options section in HTML and CSS.

- Dark background, centred header with eyebrow, heading and intro.
- A responsive grid of cards (auto-fit, min 230px): icon tile, title, description, a small note with a green dot (e.g. "Replies within 2 hours") and a link with an arrow at the bottom separated by a thin border.
- Cards lift and get a brand-coloured border on hover. CSS custom properties for the theme.`,
    },
  },

  'contact-map': {
    keywords: ['contact section with map', 'location section html', 'embed map website template', 'office locations section', 'openstreetmap embed'],
    about: {
      title: 'Contact With Map — Free Location and Offices Section Template',
      description: `**Contact With Map** helps people find you in person: a heading and short message, a set of location cards with the name, address, opening hours, phone and email, and a large embedded map beside them. It suits shops, restaurants, clinics, studios and companies with offices.

**Any map, no API key**

By default it uses an OpenStreetMap embed, which needs no account or key. To show your own location, use Share → HTML on openstreetmap.org, or Share → Embed a map in Google Maps, and paste the link from the src attribute. The map has an editable title for screen readers and loads lazily, so it doesn't slow the page down.

**Up to four locations**

Each location has a name, a multi-line address (marked up with the address element), optional opening hours, and phone and email with their own tel: and mailto: links. Leave any of them empty to hide it.

**Responsive and animated**

On tablets and phones the map moves below the locations at a comfortable height. The heading reveals with GSAP SplitText, the location cards stagger in and the map rises into view.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). Add a form with [Contact Form With Details](/website-section-templates/contact-split-form/).`,
    },
    features: [
      'Embedded map beside location cards',
      'OpenStreetMap by default (no API key); Google Maps embeds work too',
      'Up to 4 locations: address, hours, phone and email',
      'Semantic address element; tel: and mailto: links',
      'Lazy-loaded map with a screen-reader title',
      'Map moves below the locations on phones',
      'SplitText heading, staggered cards and rising map',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '📍', title: 'Easy to find', desc: 'A map next to the address answers “where exactly are you?” instantly.' },
      { icon: '🔑', title: 'No API key', desc: 'OpenStreetMap embeds work out of the box, with no account or billing.' },
      { icon: '🏢', title: 'Multiple locations', desc: 'Show several offices or branches side by side with their own details.' },
    ],
    useCases: [
      { icon: '☕', title: 'Café or restaurant', desc: 'Show your address, opening hours and phone number for bookings next to a map.' },
      { icon: '🏥', title: 'Clinic or practice', desc: 'Help patients find the entrance with the address, hours and phone in one place.' },
      { icon: '🛍️', title: 'Shop with branches', desc: 'List each store with its hours, phone and email, and centre the map on your main shop.' },
      { icon: '🏢', title: 'Company offices', desc: 'Show headquarters and regional offices with local contact details.' },
    ],
    faqs: [
      { q: 'How do I show my own location on the map?', a: 'On openstreetmap.org, find your address, click Share, choose HTML and copy the link inside src="…". In Google Maps use Share → Embed a map and copy the src link. Paste it into Map embed URL.' },
      { q: 'Do I need a Google Maps API key?', a: 'No. Both the OpenStreetMap embed and Google’s “Embed a map” links work without an API key.' },
      { q: 'How many locations can I list?', a: 'Up to four. The map shows one area, so centre it on your main location and list the others with their addresses.' },
      { q: 'Is the map accessible?', a: 'The map iframe has an editable title for screen readers, and every address, phone number and email is also written out as text.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the location section: switch the map when a location card is clicked, add directions links, or show live opening status.',
      prompt: `Create a contact section with a map in HTML and CSS.

- Left: eyebrow, heading, intro and a grid of location cards (name, multi-line address in an address element, opening hours, phone and email links).
- Right: a large rounded embedded map (iframe with an OpenStreetMap embed URL, title, loading="lazy").
- Container queries stack the columns below 860px with the map at 320px tall.
- GSAP: SplitText heading, staggered cards and a rising map with ScrollTrigger, respecting prefers-reduced-motion.`,
    },
  },

  'blog-cards': {
    keywords: ['blog section template', 'latest posts section html', 'blog card grid css', 'blog post cards', 'news section template'],
    about: {
      title: 'Blog Post Cards — Free Latest Posts Section Template',
      description: `**Blog Post Cards** is the "Latest from the blog" section for homepages and blog index pages: a heading with a "View all posts" link, then a grid of cards with a cover image, category tag, date and read time, title, short excerpt and the author's photo and name.

**Feels alive**

Covers zoom gently and titles get an animated underline when you hover a card. The heading reveals with GSAP SplitText and the cards stagger in as they scroll into view, with reduced-motion support.

**Posts as a list**

Add up to nine posts, reorder them and duplicate one to start the next. Upload cover images (resized in your browser) or use the included abstract covers, and leave the category, date, read time, excerpt or author empty to hide them.

**Search-friendly**

The exported page includes an ItemList of BlogPosting structured data (JSON-LD) built from your posts, so search engines and AI assistants understand the list of articles.

**Export it**

Download HTML, a ZIP with your covers, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For a magazine layout with one big story, see [Featured Post With List](/website-section-templates/blog-featured/).`,
    },
    features: [
      'Post cards: cover, category, date, read time, title, excerpt, author',
      'View-all link beside the heading',
      'Cover zoom and animated title underline on hover',
      'Up to 9 posts: add, duplicate, reorder, remove',
      'BlogPosting ItemList JSON-LD in the export',
      'Three, two or one columns by width',
      'SplitText heading and staggered entrance',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '📰', title: 'Shows you’re active', desc: 'Fresh posts on the homepage prove the company is alive and shipping.' },
      { icon: '🔍', title: 'Helps SEO', desc: 'Internal links to articles plus BlogPosting schema help search engines discover your content.' },
      { icon: '👀', title: 'Scannable', desc: 'Covers, categories and read times let readers pick what interests them.' },
    ],
    useCases: [
      { icon: '🏠', title: 'Homepage latest posts', desc: 'Show the three newest articles near the end of your homepage with a link to the full blog.' },
      { icon: '📚', title: 'Resource hub', desc: 'Present guides, case studies and templates as cards with category tags.' },
      { icon: '📣', title: 'Company news', desc: 'Share announcements, product updates and press with dates and authors.' },
      { icon: '🎓', title: 'Course or learning site', desc: 'List recent lessons or tutorials with read times and instructors.' },
    ],
    faqs: [
      { q: 'Can I connect it to my blog automatically?', a: 'The section is static HTML. After exporting, you can render the cards from your CMS (WordPress, Ghost, Sanity, Markdown) by looping over posts in your framework, using the same markup and CSS.' },
      { q: 'Is structured data included?', a: 'Yes. The exported HTML includes an ItemList of BlogPosting JSON-LD with each post’s headline, description, URL, image and author.' },
      { q: 'What cover size should I use?', a: 'About 1200×750 px (16:10). Covers are cropped to that shape in the cards.' },
      { q: 'How many posts can I show?', a: 'Up to nine. Three is typical for a homepage; six or nine work for a blog index.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the blog cards: render them from a WordPress or Ghost API, add pagination, or add category filter buttons.',
      prompt: `Create a "Latest from the blog" section in HTML and CSS.

- Header with eyebrow and heading on the left and a "View all posts →" link on the right.
- A 3-column grid of post cards: 16:10 cover image (zooms on hover), a meta line with a category pill, date and read time, a title with an animated underline on hover, an excerpt and an author row with a round photo.
- Container queries: 2 columns below 960px, 1 below 620px.
- Include an ItemList of BlogPosting JSON-LD for the posts.`,
    },
  },

  'blog-featured': {
    keywords: ['featured post section', 'magazine layout html css', 'blog homepage template', 'featured article layout', 'news layout template'],
    about: {
      title: 'Featured Post With List — Free Magazine Blog Section Template',
      description: `**Featured Post With List** gives your blog a magazine front page. One featured story takes the left side with a large cover, a category label, date, big headline, excerpt, author and a "Read the report →" link; the right side lists recent posts with small thumbnails, categories, dates and read times.

**Hierarchy that guides readers**

The big story gets attention first, while the list shows there's plenty more to read. Hovering zooms covers and turns titles to your brand colour.

**Edit the featured story and the list**

The featured post has its own fields: cover, category, date, title, excerpt, author, link and link text. The recent posts are a list of up to six that you can reorder. Upload covers or use the included abstract artwork.

**Structured data included**

The exported page includes an ItemList of BlogPosting JSON-LD covering the featured post and the recent posts.

**Responsive and animated**

On tablets and phones the list moves below the featured story. The heading reveals with SplitText, the featured story rises into view and the list items stagger in.

**Export it**

Download HTML, a ZIP, React or Vue, or fork into [My Code](/ui-snippets/mycode/). For an even grid, use [Blog Post Cards](/website-section-templates/blog-cards/).`,
    },
    features: [
      'Large featured post beside a list of recent posts',
      'Featured: cover, category, date, title, excerpt, author, link',
      'Recent posts with thumbnails, categories, dates and read times',
      'Up to 6 recent posts: add, duplicate, reorder, remove',
      'Hover zoom on covers and brand-coloured titles',
      'BlogPosting ItemList JSON-LD in the export',
      'Stacks on tablets and phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '📰', title: 'Front-page feel', desc: 'A lead story with a list beside it reads like a magazine and keeps readers exploring.' },
      { icon: '⭐', title: 'Promote what matters', desc: 'Put your best report, launch or guide in the featured spot.' },
      { icon: '🔍', title: 'Search-friendly', desc: 'BlogPosting schema and internal links help your articles get found.' },
    ],
    useCases: [
      { icon: '📊', title: 'Report or research launch', desc: 'Feature a new industry report with recent articles alongside it.' },
      { icon: '🗞️', title: 'Newsroom', desc: 'Lead with the biggest announcement and list recent press releases.' },
      { icon: '✍️', title: 'Blog front page', desc: 'Highlight an editor’s pick above the latest posts.' },
      { icon: '📬', title: 'Newsletter archive', desc: 'Feature the latest issue and list previous issues with dates.' },
    ],
    faqs: [
      { q: 'How do I change the featured post?', a: 'Edit the Featured post group: cover, category, date, title, excerpt, author, link and the read-link text. It is separate from the recent posts list.' },
      { q: 'Is structured data included?', a: 'Yes. The exported HTML includes an ItemList of BlogPosting JSON-LD with the featured post first, then the recent posts.' },
      { q: 'How many recent posts can I list?', a: 'Up to six. Four balances well with the featured story on desktop.' },
      { q: 'How does it look on mobile?', a: 'The featured story comes first at full width, followed by the list of recent posts with small thumbnails.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the magazine layout: rotate featured posts automatically, add a category navigation bar, or load posts from your CMS.',
      prompt: `Create a magazine-style blog section in HTML and CSS.

- Left-aligned header with eyebrow and heading.
- Two columns: a featured article (large 16:10 cover, uppercase category in the brand colour, date, big headline, excerpt, author and a "Read →" link) and a list of four recent posts (120px thumbnail, category, date, title, read time) separated by thin lines.
- Covers zoom on hover; container queries stack the columns below 860px.
- Include an ItemList of BlogPosting JSON-LD.`,
    },
  },

  'blog-list': {
    keywords: ['blog list template', 'editorial post list', 'hover image follow cursor', 'minimal blog section', 'gsap hover preview'],
    about: {
      title: 'Editorial Post List — Free Blog List With Hover Image Template',
      description: `**Editorial Post List** presents articles the way design studios and writers do: a clean list of wide rows with the date, category, a large title and a round arrow. On desktop, hovering a row reveals that post's cover in a tilted card that follows the cursor, a signature interaction built with GSAP quickTo.

**Interaction with restraint**

Rows slide slightly and their titles turn your brand colour on hover, the arrow rotates and fills, and the floating cover eases in and out. The effect only runs on devices with a mouse and is skipped for reduced motion; on phones it's a fast, clean list with no images to download until needed.

**Posts as a list**

Add up to twelve posts and reorder them. Each post's cover powers its hover preview (leave it empty for no preview), and the date, category and title are all editable. A "View all" link sits beside the heading.

**Structured data included**

The exported page includes an ItemList of BlogPosting JSON-LD built from your posts, helping search engines understand the list.

**Dark and editorial**

It ships in near-black with a lime accent; switch presets or apply your brand kit.

**Export it**

Download HTML, a ZIP, React or Vue with the hover script, or fork into [My Code](/ui-snippets/mycode/). For image-first cards, see [Blog Post Cards](/website-section-templates/blog-cards/).`,
    },
    features: [
      'Wide rows with date, category, large title and arrow',
      'Cover image follows the cursor on hover (GSAP quickTo)',
      'Row slide, colour change and rotating arrow on hover',
      'Desktop-only effect; off for reduced motion',
      'Up to 12 posts: add, duplicate, reorder, remove',
      'BlogPosting ItemList JSON-LD in the export',
      'Compact stacked rows on phones',
      'Export HTML, a ZIP, React or Vue',
    ],
    why: [
      { icon: '✦', title: 'Memorable interaction', desc: 'The cursor-following cover is a signature detail of award-winning studio sites.' },
      { icon: '📖', title: 'Typography first', desc: 'Large titles in a clean list put the writing, not the thumbnails, in front.' },
      { icon: '⚡', title: 'Light on phones', desc: 'Covers only load for the hover preview, so the mobile list stays fast.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Studio journal', desc: 'List case studies and articles with a cover preview that follows the cursor.' },
      { icon: '✍️', title: 'Personal blog', desc: 'Present essays as large titles with dates and topics for a timeless, editorial feel.' },
      { icon: '📰', title: 'Press list', desc: 'Show press coverage with the publication as the category and the outlet’s image as the preview.' },
      { icon: '🛠️', title: 'Changelog', desc: 'List releases by date with a screenshot that previews each update on hover.' },
    ],
    faqs: [
      { q: 'How does the hover image work?', a: 'A small script creates one floating card in the section. When you hover a row, it shows that post’s cover and GSAP quickTo smoothly moves the card to follow the cursor; it fades out when you leave the row.' },
      { q: 'Does it work on phones?', a: 'Yes, as a clean list. The hover preview only runs on devices with a mouse, so phones get a fast list without the effect.' },
      { q: 'Can I turn off the preview for a post?', a: 'Yes. Leave that post’s cover image empty and no preview appears for it.' },
      { q: 'Is structured data included?', a: 'Yes. The exported HTML includes an ItemList of BlogPosting JSON-LD for the posts.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the editorial list: use a video preview instead of an image, add year groupings, or filter by category.',
      prompt: `Create an editorial blog list in HTML, CSS and JavaScript.

- Dark background; header with eyebrow, heading and a "View all" link.
- A list of wide rows separated by thin lines; each row is a link with date, uppercase category, a large title and a round arrow button; on hover the row slides right, the title turns the brand colour and the arrow rotates and fills.
- JavaScript with GSAP: create one floating 16:10 card in the section; on row hover set its background to the row's cover image, fade/scale it in with a slight rotation and follow the cursor with gsap.quickTo. Desktop pointers only; respect prefers-reduced-motion.
- Include an ItemList of BlogPosting JSON-LD.`,
    },
  },
};

export const SECTION_DIFFERENT = [
  { icon: '✎', title: 'Editable, not just copyable', desc: 'Change text, links, images, colours and fonts in the browser before you export, instead of editing someone else’s code by hand.' },
  { icon: '◐', title: 'One theme for every section', desc: 'Colours, fonts, radius and width are shared CSS variables, so every section you combine looks like one website.' },
  { icon: '⇲', title: 'Responsive by container', desc: 'Container queries make each section adapt to its own width, in a full page, a column or a page builder.' },
  { icon: '✦', title: 'GSAP animation built in', desc: 'Every section animates in with GSAP and ScrollTrigger, stays visible without JavaScript and respects reduced motion.' },
  { icon: '</>', title: 'HTML, React and Vue', desc: 'Export a single HTML file, a ZIP with your images, a React component or a Vue component, or fork the code into My Code.' },
  { icon: '◍', title: 'Free, private, saved', desc: 'No account and no watermark. Designs, uploaded images and fonts stay in your browser, with a backup file you can restore anywhere.' },
];
