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
};

export const SECTION_DIFFERENT = [
  { icon: '✎', title: 'Editable, not just copyable', desc: 'Change text, links, images, colours and fonts in the browser before you export, instead of editing someone else’s code by hand.' },
  { icon: '◐', title: 'One theme for every section', desc: 'Colours, fonts, radius and width are shared CSS variables, so every section you combine looks like one website.' },
  { icon: '⇲', title: 'Responsive by container', desc: 'Container queries make each section adapt to its own width, in a full page, a column or a page builder.' },
  { icon: '✦', title: 'GSAP animation built in', desc: 'Every section animates in with GSAP and ScrollTrigger, stays visible without JavaScript and respects reduced motion.' },
  { icon: '</>', title: 'HTML, React and Vue', desc: 'Export a single HTML file, a ZIP with your images, a React component or a Vue component, or fork the code into My Code.' },
  { icon: '◍', title: 'Free, private, saved', desc: 'No account and no watermark. Designs, uploaded images and fonts stay in your browser, with a backup file you can restore anywhere.' },
];
