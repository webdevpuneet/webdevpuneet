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
};

export const SECTION_DIFFERENT = [
  { icon: '✎', title: 'Editable, not just copyable', desc: 'Change text, links, images, colours and fonts in the browser before you export, instead of editing someone else’s code by hand.' },
  { icon: '◐', title: 'One theme for every section', desc: 'Colours, fonts, radius and width are shared CSS variables, so every section you combine looks like one website.' },
  { icon: '⇲', title: 'Responsive by container', desc: 'Container queries make each section adapt to its own width, in a full page, a column or a page builder.' },
  { icon: '✦', title: 'GSAP animation built in', desc: 'Every section animates in with GSAP and ScrollTrigger, stays visible without JavaScript and respects reduced motion.' },
  { icon: '</>', title: 'HTML, React and Vue', desc: 'Export a single HTML file, a ZIP with your images, a React component or a Vue component, or fork the code into My Code.' },
  { icon: '◍', title: 'Free, private, saved', desc: 'No account and no watermark. Designs, uploaded images and fonts stay in your browser, with a backup file you can restore anywhere.' },
];
