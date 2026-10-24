/* Landing-page content for each section category (/website-section-templates/category/<id>/).
   Titles 50-60 characters, descriptions 150-160, written around what people search for.
   Only categories that have sections get a page (see generateStaticParams). */

import { SCROLL_LISTINGS_CATEGORY_SEO } from './seo-scroll-listings.js';

export const SECTION_CATEGORY_SEO = {
  gallery: {
    title: 'Gallery & Video Section Templates — Free HTML, React & Vue',
    description: 'Free gallery section templates: a photo grid with filters and lightbox, a click-to-play video and a before-after slider. Edit online, export HTML, React or Vue.',
    h1: 'Gallery & Media Section Templates',
    keywords: ['gallery section template', 'image gallery html css', 'video section template', 'before and after slider', 'photo gallery with lightbox'],
    intro: `Visual proof is often what turns a visitor into a customer: the rooms they will sleep in, the dishes they will eat, the work you did for someone like them. These sections present photos and video in ways that load quickly, work on phones and stay accessible.

Use the **[Filterable Image Gallery](/website-section-templates/gallery-grid/)** when you have many photos to organise: visitors filter by category and open each photo in a keyboard-friendly viewer. Use the **[Video Section With Poster](/website-section-templates/video-section/)** for a demo, trailer or customer story that loads only when someone presses play, which keeps the page fast and private. Use the **[Before & After Slider](/website-section-templates/before-after-slider/)** for results that are easier to see than to describe, such as a renovation, a haircut or a clean.

Every section is editable in your browser: upload images, add alt text, change colours and fonts, and export HTML, a ZIP, React or Vue. For scroll-driven galleries with pinned motion, see the [scroll effects](/website-section-templates/category/scroll/) sections.

Write descriptive alt text for every photo, use consistent framing and sizes, and keep the number of photos to what a visitor will actually look at. Fewer, better pictures usually beat a long, unfiltered wall.`,
    faqs: [
      { q: 'How do I add a photo gallery to my website?', a: 'Open the Filterable Image Gallery, upload your photos, give each a category and alt text, and export the HTML or copy it into your page. Visitors can filter by category and open every photo in a viewer.' },
      { q: 'Will a video section slow my page down?', a: 'Not this one. Only the poster image loads at first. The YouTube or Vimeo player is added when the visitor presses play, so the page stays fast and the video host does not track people who never watch.' },
      { q: 'How should I take photos for a before and after slider?', a: 'Use the same angle, distance and lighting for both photos, so the only difference is the result. Export both at the same size, about 1200 by 800 pixels, and write alt text for each.' },
      { q: 'Are the galleries accessible to keyboard and screen-reader users?', a: 'Yes. The gallery viewer opens with Enter and closes with Escape, the slider uses a real range input with arrow-key control, and every image has its own alt text field.' },
      { q: 'Can I use these sections in React or Vue?', a: 'Yes. Each section exports as a React component or a Vue single-file component, with the behaviour script included, or as plain HTML.' },
    ],
  },
  hero: {
    title: 'Hero Section Templates — Free HTML, CSS, React & Vue',
    description: 'Free responsive hero section templates: SaaS, gradient, background image, app and portfolio heroes. Edit online with GSAP animation, export HTML, React or Vue.',
    h1: 'Hero Section Templates',
    keywords: ['hero section templates', 'hero section html css', 'landing page hero', 'website hero section', 'react hero section'],
    intro: `The hero is the first thing every visitor sees, and it decides in a few seconds whether they keep reading. A good hero states what you offer, who it is for and what to do next, with one clear button and an image that backs up the promise.

These hero sections cover the most common patterns: the **[SaaS Split Hero](/website-section-templates/saas-split-hero/)** with a product screenshot, the dark **[Centred Gradient Hero](/website-section-templates/centered-gradient-hero/)**, the full-width **[Image Background Hero](/website-section-templates/image-background-hero/)**, the **[App Product Hero](/website-section-templates/app-product-hero/)** with store buttons and a phone mockup, and the **[Personal Portfolio Hero](/website-section-templates/portfolio-hero/)** for developers and freelancers. Every one is editable in the browser, responsive through container queries, animated with GSAP, and shares one theme with the rest of the library, so features, pricing and footer sections will match. Export a single HTML file, a ZIP with your images, a React component or a Vue component.`,
    faqs: [
      { q: 'What should a hero section include?', a: 'A clear headline that says what you offer, one or two sentences of supporting text, a primary call-to-action button (and optionally a secondary one), and an image, screenshot or photo that supports the message. Social proof such as ratings or customer counts helps too.' },
      { q: 'How tall should a hero section be?', a: 'Tall enough to show the headline, buttons and the start of the image on a laptop screen without scrolling, usually around 600 to 800 px on desktop. On phones it is fine for the hero to be taller than the screen, as long as the headline and main button appear first.' },
      { q: 'Can I use these hero sections in React, Next.js or Vue?', a: 'Yes. Every section exports as a React component (JSX with its CSS) or a Vue single-file component, and the GSAP animation is included. You can also download plain HTML and CSS.' },
    ],
  },
  features: {
    title: 'Features Section Templates — Free HTML, React & Vue',
    description: 'Free features section templates: icon grids, bento grids, zig-zag rows, split image layouts and how-it-works steps. Edit online, animate with GSAP, export code.',
    h1: 'Features Section Templates',
    keywords: ['features section template', 'feature section html css', 'bento grid section', 'how it works section', 'landing page features'],
    intro: `After the hero, the features section does the explaining: what your product does, why it matters and how it works. The right layout depends on how much you need to say.

For a quick overview, the **[Icon Grid Features](/website-section-templates/features-icon-grid/)** puts six benefits in scannable cards, and the **[Bento Grid Features](/website-section-templates/features-bento/)** does the same in a modern mosaic with one large tile for your headline feature. To go deeper, **[Split Features With Image](/website-section-templates/features-split-image/)** pairs a point list with a screenshot, and **[Alternating Feature Rows](/website-section-templates/features-alternating/)** gives every feature its own zig-zag row. To explain a process, **[How It Works Steps](/website-section-templates/features-steps/)** shows numbered steps with a sign-up button.

Cards, rows and steps are editable lists: add, duplicate, reorder and remove them, and pick icons from 60 Lucide line icons. Every section shares the library's theme, adapts with container queries and animates with GSAP (SplitText headline reveals and staggered entrances). Export HTML, a ZIP, React or Vue.`,
    faqs: [
      { q: 'What should a features section include?', a: 'A short heading that states the overall benefit, then three to six features, each with a clear title and one or two sentences about why it matters. Icons or screenshots make each point easier to scan, and a link or button gives interested visitors somewhere to go next.' },
      { q: 'How many features should I show?', a: 'Three to six works best in a grid or bento layout. If you have more, group them, or use alternating rows to cover the most important few in depth and link to a full features page for the rest.' },
      { q: 'Which layout should I choose?', a: 'Use an icon grid or bento grid for an overview, a split section or alternating rows for depth with screenshots, and a numbered steps section to explain how something works. Many pages use two: an overview grid followed by a few detailed rows.' },
    ],
  },
  pricing: {
    title: 'Pricing Section Templates — Free HTML, React & Vue Tables',
    description: 'Free pricing section templates: three-tier tables, dark glowing cards, single-plan pricing and package rows with a GSAP monthly/yearly toggle. Export the code.',
    h1: 'Pricing Section Templates',
    keywords: ['pricing section template', 'pricing table html css', 'monthly yearly toggle', 'saas pricing page', 'pricing cards'],
    intro: `The pricing section is where interest turns into a decision, so it has to be clear: what each option costs, what it includes and which one to pick. These pricing sections cover the common cases.

The **[Three-Tier Pricing](/website-section-templates/pricing-three-tier/)** table is the SaaS standard, with a highlighted "Most popular" plan. **[Dark Glow Pricing](/website-section-templates/pricing-dark-glow/)** does the same on a dark theme with a glowing gradient border for AI and developer products. **[Single Plan Pricing](/website-section-templates/pricing-single-plan/)** presents one price with an everything-included list and a guarantee, and **[Pricing List Rows](/website-section-templates/pricing-rows/)** lays plans and service packages out as rows with room for detail.

Every one has a working monthly/yearly switch: the pill slides with GSAP Flip, the prices roll over, it's accessible and it works in HTML, React and Vue exports. Plans are editable lists with price notes for free, custom and one-off prices, and every section shares the library's theme.

New: the **[Pricing Comparison Table](/website-section-templates/pricing-comparison/)** lays three plans out feature by feature, with ticks, limits and a highlighted plan, for visitors who want to compare before they choose.`,
    faqs: [
      { q: 'How many pricing plans should I show?', a: 'Three is the most common: it gives a clear entry option, a recommended middle plan and a premium tier. Use one plan if your product is simple, and rows if you have five or more packages.' },
      { q: 'Should I offer monthly and yearly pricing?', a: 'If you sell subscriptions, usually yes. A yearly option with a visible saving (such as "Save 20%") improves cash flow and retention; the switch lets visitors compare without doubling the number of cards.' },
      { q: 'Does the monthly/yearly toggle need a framework?', a: 'No. It is a few lines of plain JavaScript that toggle a class and show the right prices, plus an optional GSAP Flip animation. It works in plain HTML, React and Vue exports.' },
    ],
  },
  testimonials: {
    title: 'Testimonials Section Templates — Free HTML, React & Vue',
    description: 'Free testimonials section templates: a masonry review wall, a draggable GSAP carousel, an infinite marquee and a featured quote with stats. Free to use.',
    h1: 'Testimonials Section Templates',
    keywords: ['testimonials section template', 'testimonial slider html css', 'customer reviews section', 'testimonial carousel', 'wall of love'],
    intro: `Testimonials answer the question every visitor has before they sign up or buy: do people like me actually get value from this? The best layout depends on how many quotes you have and how much attention you want them to get.

With lots of short quotes, the **[Testimonial Wall](/website-section-templates/testimonials-grid/)** shows them all at once in a masonry layout, and the **[Testimonial Marquee](/website-section-templates/testimonials-marquee/)** keeps two rows gliding past endlessly. To save space, the **[Testimonial Carousel](/website-section-templates/testimonials-carousel/)** lets visitors drag or swipe through cards with momentum. And when one customer story says it all, the **[Testimonial Spotlight](/website-section-templates/testimonial-spotlight/)** gives it a big animated quote with result stats.

Every section stores testimonials as an editable list with quotes, names, roles, optional photos and star ratings. The interactions are built with GSAP (Draggable, Inertia, ScrollTo and an endless loop) on top of plain scrolling, so they stay accessible and work in HTML, React and Vue exports.

New: the **[Case Study Showcase](/website-section-templates/case-study-showcase/)** gives each project a wide card with a result headline, key numbers and a client quote, for visitors who want proof they can measure.`,
    faqs: [
      { q: 'What makes a good testimonial?', a: 'A specific result in the customer’s own words, their full name, role and company, and ideally a photo. "We cut reporting time by two thirds" persuades far more than "Great product!".' },
      { q: 'How many testimonials should I show?', a: 'Three to six is enough for most landing pages. Use a wall or marquee to show many at once, a carousel when space is tight, or one spotlight quote for a strong case study.' },
      { q: 'Are carousels and marquees accessible?', a: 'These are. Both are built on normal scrollable rows, label their regions, hide duplicated content from screen readers and stop animating for people who prefer reduced motion.' },
    ],
  },
  faq: {
    title: 'FAQ Section Templates — Free Accordion HTML, React & Vue',
    description: 'Free FAQ section templates: an animated accordion, a two-column FAQ with a contact card and an open Q&A grid, all with FAQPage schema. Edit online, export code.',
    h1: 'FAQ Section Templates',
    keywords: ['faq section template', 'faq accordion html css', 'faq schema', 'frequently asked questions section', 'faq page template'],
    intro: `An FAQ section answers the questions that would otherwise stop someone from signing up, buying or getting in touch. It also helps search: clear questions with direct answers are exactly what search engines and AI assistants look for.

The **[FAQ Accordion](/website-section-templates/faq-accordion/)** is a centred list where one answer opens at a time, the most common layout on landing and pricing pages. The **[Split FAQ With Contact Card](/website-section-templates/faq-split/)** puts a sticky support card beside the questions, ideal for help and service pages. The **[FAQ Grid](/website-section-templates/faq-grid/)** shows every short answer at once in a two-column grid.

The accordions are built on native details/summary, so they work without JavaScript and keep every answer in the HTML, with smooth GSAP animation on top. Every FAQ section adds FAQPage structured data (JSON-LD) to its HTML export, generated from your questions.`,
    faqs: [
      { q: 'Does an FAQ section help SEO?', a: 'It can. Clear question headings with direct answers match how people search, the answers give search engines and AI assistants quotable content, and FAQPage structured data describes them explicitly. Keep answers genuinely useful rather than stuffed with keywords.' },
      { q: 'Accordion or open list?', a: 'Use an accordion for longer answers or many questions, so the page stays short. Use an open grid when answers are a sentence or two and you want every one read.' },
      { q: 'Are hidden accordion answers indexed?', a: 'Yes. With details/summary the answers are in the HTML from the start, just collapsed, so search engines can read them.' },
    ],
  },
  cta: {
    title: 'Call to Action Section Templates — Free CTA HTML & React',
    description: 'Free call to action section templates: a gradient banner with a cursor glow, an app download card, a newsletter signup form and a CTA strip. Edit, then export.',
    h1: 'Call to Action Section Templates',
    keywords: ['call to action section', 'cta section template', 'cta banner html css', 'newsletter signup section', 'app download section'],
    intro: `A call-to-action section gives visitors who are ready a clear next step: sign up, download, subscribe or get in touch. It usually sits at the end of a page, and shorter versions work well between sections.

The **[Gradient CTA Banner](/website-section-templates/cta-gradient-banner/)** is a bold closing panel with a glow that follows the cursor and magnetic buttons. The **[Split CTA With Image](/website-section-templates/cta-split-image/)** pairs download buttons with a phone or product image on a dark card. The **[Newsletter Signup CTA](/website-section-templates/cta-newsletter/)** is a working email form that posts to Mailchimp, Kit or any service, and the **[CTA Strip](/website-section-templates/cta-strip/)** is a slim band you can repeat between sections.

Every section shares the library's theme, animates with GSAP (SplitText headings, a pointer spotlight and magnetic buttons on desktop) and exports to HTML, React or Vue with its scripts included.`,
    faqs: [
      { q: 'What makes a good call to action?', a: 'One clear action, a heading that states the benefit, a specific button label such as "Start free trial" rather than "Submit", and a short note that removes risk, like "No credit card required".' },
      { q: 'Where should a CTA section go?', a: 'At the end of every landing page, and as a smaller strip after key sections such as features or testimonials, so people can act as soon as they are convinced.' },
      { q: 'Can the newsletter form send to my email service?', a: 'Yes. Paste your service’s form action URL and field name, and the exported form posts sign-ups directly to it.' },
    ],
  },
  stats: {
    title: 'Stats & Logo Section Templates — Free Counters, Logo Cloud',
    description: 'Free stats and logo section templates: animated number counters, a scrolling "trusted by" logo cloud and a dark stats block with logos. GSAP animated; free.',
    h1: 'Stats & Logo Section Templates',
    keywords: ['stats section template', 'animated counter', 'logo cloud section', 'trusted by logos', 'metrics section'],
    intro: `Numbers and logos are the quickest kind of social proof: "12,000+ teams" and a row of familiar company names tell visitors your product is real and widely used before they read anything else.

**[Animated Stats Counters](/website-section-templates/stats-counters/)** shows up to six key figures that count up as they scroll into view. The **[Scrolling Logo Cloud](/website-section-templates/logo-cloud/)** is a slim "Trusted by" strip of customer logos that loops endlessly and pauses on hover. **[Stats With Logos](/website-section-templates/stats-dark-split/)** combines both on a dark background: a heading and button, four counting stat cards with icons, and a logo row.

The counters keep any format ($2.5M, 99.9%, 4.9/5) and leave the real values in the HTML for search engines. Logos start as icon-and-name wordmarks and can be replaced with uploaded SVG or PNG files. Everything animates with GSAP, respects reduced motion and exports to HTML, React or Vue.`,
    faqs: [
      { q: 'Where should stats and logos go on a page?', a: 'Directly under the hero is the most common place, because it backs up the headline immediately. Stats also work well near pricing, and logos near the final call to action.' },
      { q: 'Are animated counters bad for SEO?', a: 'Not these. The final numbers are in the HTML; the count-up only runs in the browser when the numbers come into view, then restores the exact text.' },
      { q: 'Do I need permission to show customer logos?', a: 'Usually yes. Check your customer agreements or ask before showing a company’s logo. The built-in wordmarks keep the section looking finished in the meantime.' },
    ],
  },
  navbar: {
    title: 'Navbar Templates — Free Responsive Header HTML, React & Vue',
    description: 'Free responsive navbar templates: a sticky header, a floating glass pill and a header with an announcement bar, each with an accessible animated mobile menu.',
    h1: 'Navbar Templates',
    keywords: ['navbar template', 'responsive navbar html css', 'sticky header', 'mobile menu', 'website header'],
    intro: `The navbar is on every page, so it has to be clear, fast and work perfectly on phones. These headers handle the hard parts for you: a mobile menu that's accessible, a sticky bar that can get out of the way, and a layout that adapts to any number of links.

The **[Simple Sticky Navbar](/website-section-templates/navbar-simple/)** is a clean, frosted header with links, log-in and a CTA. The **[Floating Pill Navbar](/website-section-templates/navbar-floating/)** hovers over the page as a dark glass pill and opens a full-screen menu on phones. The **[Navbar With Announcement Bar](/website-section-templates/navbar-announcement/)** adds a dismissible bar on top for sales, launches and news.

Every mobile menu opens with GSAP, closes on Esc, keeps keyboard focus inside while open, announces its state to screen readers and shows the links even without JavaScript. Switch the sticky header and hide-on-scroll options on or off, upload your logo, and export to HTML, React or Vue.`,
    faqs: [
      { q: 'What makes a navbar accessible?', a: 'A real button for the mobile menu with aria-expanded and a label, keyboard support (Tab, Enter, Esc), focus moving into the menu when it opens and back to the button when it closes, and links that still work without JavaScript. These navbars do all of that.' },
      { q: 'Should my header be sticky?', a: 'For most marketing sites, yes: it keeps navigation and the main button in reach. On long reading pages, the hide-on-scroll option gives readers more space and brings the header back when they scroll up.' },
      { q: 'How many links should a navbar have?', a: 'Four to six top-level links is ideal. Put secondary pages in the footer, and keep one clear call-to-action button on the right.' },
    ],
  },
  footer: {
    title: 'Footer Templates — Free Website Footer HTML, React & Vue',
    description: 'Free website footer templates: multi-column sitemap footer, giant wordmark footer, footer with newsletter signup and a minimal one-row footer. Free to use.',
    h1: 'Footer Templates',
    keywords: ['footer template', 'website footer html css', 'footer with newsletter', 'minimal footer', 'responsive footer'],
    intro: `The footer is the last thing on every page: it helps visitors find what they missed, builds trust with legal and contact links, and gives one more chance to sign up or get in touch.

The **[Multi-Column Footer](/website-section-templates/footer-columns/)** is the classic sitemap footer with link columns, social icons and a smooth back-to-top button. The **[Big Wordmark Footer](/website-section-templates/footer-giant/)** ends with a closing call to action and your brand name in giant type, revealed with GSAP SplitText. The **[Footer With Newsletter](/website-section-templates/footer-newsletter/)** adds a working email sign-up form, and the **[Minimal Footer](/website-section-templates/footer-minimal/)** keeps it to one tidy row.

Links are written one per line as "Label | URL", so even big footers are quick to edit, and unsafe URLs are replaced automatically. Social icons cover X, LinkedIn, GitHub, YouTube, Instagram, Facebook, Dribbble and Figma. Every footer shares the theme with the navbars and sections above it and exports to HTML, React or Vue.`,
    faqs: [
      { q: 'What should a website footer include?', a: 'Your logo, the most useful links (product, company, help), contact or social links, the copyright notice and legal links such as privacy and terms. Optionally a newsletter sign-up or a closing call to action.' },
      { q: 'Do footer links help SEO?', a: 'They help visitors and search engines discover your important pages from every page of the site. Keep them focused on genuinely useful pages rather than long lists of keywords.' },
      { q: 'How do I edit footer links quickly?', a: 'In these footers, each links box takes one link per line as Label | URL, for example Pricing | /pricing/. Columns themselves can be added, reordered and removed.' },
    ],
  },
  team: {
    title: 'Team Section Templates — Free Meet the Team HTML & React',
    description: 'Free team section templates: a meet-the-team grid with hover social links, a draggable team carousel and a team section with a hiring card. GSAP animated.',
    h1: 'Team Section Templates',
    keywords: ['team section template', 'meet the team html css', 'team carousel', 'careers section', 'about us team'],
    intro: `People buy from people. A team section puts faces and names to your company, which builds trust with customers, partners and future hires.

The **[Team Grid](/website-section-templates/team-grid/)** shows members as cards with photos, roles, bios and social links that slide in on hover. The **[Team Carousel](/website-section-templates/team-carousel/)** presents tall portrait cards in a row you can drag with momentum, ideal for larger or creative teams. The **[Team With Hiring CTA](/website-section-templates/team-hiring/)** pairs a mosaic of team photos with a "We're hiring" card listing perks and open roles.

Team members are editable lists: add, reorder and remove people, and upload photos (resized in your browser) or start with the illustrated placeholders. Every section shares the library's theme, animates with GSAP and exports to HTML, React or Vue.`,
    faqs: [
      { q: 'What should a team section include?', a: 'A photo, name and role for each person, ideally with a short line about them and a link to their profile. For companies that are hiring, a link to open roles turns interest into applications.' },
      { q: 'Should I show the whole team?', a: 'For small teams, yes. For larger ones, show leadership or a representative group, use a carousel, or link to a full team page.' },
      { q: 'Can I use illustrations instead of photos?', a: 'Yes. The sections ship with illustrated avatars, and any square or portrait image works, including illustrations or brand-styled portraits.' },
    ],
  },
  contact: {
    title: 'Contact Section Templates — Free Contact Form HTML & React',
    description: 'Free contact section templates: a working contact form that sends to Formspree or any endpoint, contact cards for sales and support, and a map of offices.',
    h1: 'Contact Section Templates',
    keywords: ['contact section template', 'contact form html', 'contact us page', 'formspree form', 'contact with map'],
    intro: `A contact section turns interest into conversations. It should make the next step obvious, set expectations about replies, and work reliably.

**[Contact Form With Details](/website-section-templates/contact-split-form/)** pairs your email, phone, address and hours with a working form that sends to Formspree, Basin, Getform or your own endpoint, with animated success and error states. **[Contact Options Cards](/website-section-templates/contact-cards/)** route visitors to sales, support, partnerships or press with response times. **[Contact With Map](/website-section-templates/contact-map/)** shows your locations beside an embedded OpenStreetMap or Google Map, with no API key needed.

Forms send in the background with JavaScript and fall back to a normal post without it; in the editor they simulate success so nothing is sent while you design. Every section shares the library's theme and exports to HTML, React or Vue.

New: the **[Booking Request Form](/website-section-templates/booking-form/)** collects a service, a day and a time for salons, clinics, restaurants and any business that takes appointments, with your opening hours beside it.`,
    faqs: [
      { q: 'How do I make a contact form send emails without a backend?', a: 'Use a form service such as Formspree, Basin or Getform: create a form, copy its endpoint URL into the section’s Form URL, and submissions are emailed to you.' },
      { q: 'Do I need an API key for the map?', a: 'No. OpenStreetMap embeds and Google Maps “Embed a map” links both work without an API key.' },
      { q: 'How do I reduce spam?', a: 'The form includes a hidden honeypot field (_gotcha) that services like Formspree use to discard bots. Most services also offer CAPTCHA or spam filtering.' },
    ],
  },
  blog: {
    title: 'Blog Section Templates — Free Latest Posts HTML & React',
    description: 'Free blog section templates: latest post cards, a magazine-style featured post with list, and an editorial list with a cursor-following cover. With schema.',
    h1: 'Blog Section Templates',
    keywords: ['blog section template', 'latest posts section', 'blog card grid', 'magazine layout', 'editorial blog list'],
    intro: `A blog section brings your latest writing onto the homepage and other pages, showing visitors that the company is active and giving search engines internal links to your articles.

**[Blog Post Cards](/website-section-templates/blog-cards/)** shows recent posts as cards with covers, categories, dates, read times and authors. **[Featured Post With List](/website-section-templates/blog-featured/)** gives one story the front page beside a list of recent posts, like a magazine. The **[Editorial Post List](/website-section-templates/blog-list/)** presents posts as large typographic rows, with a cover image that follows the cursor on hover.

Posts are editable lists with covers (upload your own or use the included abstract artwork), and every blog section adds an ItemList of BlogPosting structured data to its HTML export. Everything shares the library's theme, animates with GSAP and exports to HTML, React or Vue.

New: the **[Legal & Long-Form Text Page](/website-section-templates/article-text/)** is a readable layout for privacy policies, terms and long guides, with numbered sections and an automatic table of contents.`,
    faqs: [
      { q: 'Can these sections pull posts from my CMS?', a: 'They export as static HTML and CSS. To make them dynamic, render the same markup from WordPress, Ghost, Sanity, Markdown or any CMS in your framework of choice.' },
      { q: 'Is structured data included?', a: 'Yes. Each blog section’s HTML export includes an ItemList of BlogPosting JSON-LD with headlines, descriptions, URLs, images and authors.' },
      { q: 'How many posts should a homepage show?', a: 'Three is the most common: enough to show activity without competing with the rest of the page. Link to the full blog for more.' },
    ],
  },
  ...SCROLL_LISTINGS_CATEGORY_SEO, // scroll + listings (seo-scroll-listings.js)
};
