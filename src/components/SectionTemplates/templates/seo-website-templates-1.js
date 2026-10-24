/* Hand-written SEO content for the website templates (part 1 of 3), keyed by template id.
   about: two short paragraphs (markdown, 80–130 words each) · checklist: what a site like this needs
   faqs: four questions that are specific to this kind of site · home: title 50–60 / description
   150–160 chars for the multi-page home page when the template has none of its own. */

export const WEBSITE_TEMPLATE_SEO_1 = {
  saas: {
    about: `A SaaS landing page has one job: turn a visitor who has ten seconds into a trial sign-up. This template follows the order that usually works for software: a split hero with the promise and a product shot, a logo strip for instant credibility, icon features for the quick scan, alternating feature blocks for the detail, customer quotes, a pricing table with a monthly and yearly switch, an FAQ for objections and a final call to action.

Replace the placeholder product with yours and keep the structure. Write the hero headline as the outcome your customer gets, put your real customer logos in the strip, and make the pricing plan names match what your app calls them. The multi-page version adds Pricing, Blog, About and Contact pages that share the navbar, footer and theme, so you can launch a small marketing site rather than a single page. A product-tour video section sits after the features and a plan comparison table follows the pricing cards, for visitors who want to see the product or compare plans in detail.`,
    checklist: [
      'A headline that states the outcome, not the feature list',
      'Social proof above the fold: customer logos, a rating or a user count',
      'Pricing that is easy to compare, with a clear default plan',
      'An FAQ that answers security, billing and cancellation questions',
      'One primary call to action repeated at the top, middle and end of the page',
    ],
    faqs: [
      { q: 'How should I structure a SaaS landing page?', a: 'Lead with the outcome and one call to action, then prove it: logos, features, customer quotes and pricing, then answer objections in an FAQ. This template already follows that order, so you mostly swap in your copy.' },
      { q: 'Does the pricing section support monthly and yearly billing?', a: 'Yes. The pricing section has a monthly and yearly switch that updates the prices, and you can edit plan names, features and the highlighted plan. The switch works in the exported HTML without a framework.' },
      { q: 'Can I use this SaaS template for a startup that is still pre-launch?', a: 'Yes. Remove the logo strip and pricing if you do not have customers or plans yet, keep the hero and features, and point the call to action at a waitlist or demo form. The Startup Launch & Waitlist template is built for that case.' },
      { q: 'Can I connect the sign-up button to my app?', a: 'Yes. Every button has a link field. Point it at your sign-up URL, a checkout link or a booking page, and the exported HTML uses that link as it is.' },
    ],
  },

  app: {
    about: `People decide whether to download an app in a few scrolls, so this template puts the phone mockup and the App Store and Google Play buttons at the very top, then answers the questions that follow: what does it do, how do I start, and do other people like it. The features section pairs a screenshot with the benefit it shows, a three-step section explains setup, a moving wall of reviews adds proof without a long testimonial block, and a download call to action closes the page.

Swap the sample finance app for your own: use real screenshots, copy the review text from your store listing, and link both store buttons to your app pages. The dark theme suits fintech, health and productivity apps, and you can change the colour preset or set your exact brand colour in one click. A short FAQ at the end handles the questions that stop installs, such as price, privacy and device support.`,
    checklist: [
      'App Store and Google Play buttons that are visible without scrolling',
      'Screenshots that show real screens, with a one-line benefit for each',
      'A three-step explanation of how to get started',
      'Store ratings and review quotes as social proof',
      'A privacy and pricing answer before the visitor has to ask',
    ],
    faqs: [
      { q: 'Can I add real App Store and Google Play badges?', a: 'The hero has two store buttons with editable labels and links. Point them at your listings. If you want the official badge artwork, upload it as an image in the hero and link it to the same URLs.' },
      { q: 'Is this template good for pre-registration pages?', a: 'Yes. Replace the store buttons with a single sign-up link, keep the features and how-it-works sections, and use the FAQ to say when the app launches. Switch the buttons to the store links on launch day.' },
      { q: 'How do I show my own screenshots in the phone mockup?', a: 'Open the hero and the feature section, upload your screenshots in the image fields and they are placed inside the phone frame. Images are resized in your browser and included in the exported ZIP.' },
      { q: 'Does the page work well on phones?', a: 'Yes. The layout is built with container queries, so the hero text and mockup stack on narrow screens. Because most app visitors arrive on a phone, check the mobile preview in the toolbar before you export.' },
    ],
    home: {
      title: 'Pocketly: The Budgeting App That Shows Where Money Goes',
      description: 'Pocketly sorts every payment automatically and shows what you can still spend this month. See how it works, read the reviews and download the free app today.',
    },
  },

  launch: {
    about: `A launch page is judged on one number: how many visitors leave their email. This template removes everything that competes with that. A thin announcement bar sets the date, a gradient hero carries the promise and the sign-up field, bento-style feature cards show what is coming in a quick scan, and a newsletter section repeats the call to action for people who scrolled to the end.

Use it for a waitlist before launch, a Product Hunt day or a new feature release. Write the headline as the problem you remove, give people a reason to join now (early access, a founder discount, a launch date) and connect the form to your mailing tool. The newsletter form takes the form URL from your mailing tool, so you do not need a backend to collect addresses.`,
    checklist: [
      'One goal: the email field, with no competing links in the hero',
      'A launch date or early-access offer that explains why to sign up now',
      'Three to six benefit cards, not a full feature list',
      'A repeated sign-up form after the features for people who read on',
      'A confirmation message and a plan for the first email',
    ],
    faqs: [
      { q: 'How do I collect emails with this waitlist template?', a: 'The newsletter section has a Form URL field: paste the form action URL from Mailchimp, Kit (ConvertKit) or any other service and the exported page sends sign-ups there, with an animated success and error message.' },
      { q: 'Can I use it for a Product Hunt launch?', a: 'Yes. Put the launch date in the announcement bar, link the bar to your Product Hunt page and keep the sign-up form as the main action. After launch day, change the bar text and keep the page as a product page.' },
      { q: 'Should a waitlist page have more than one page?', a: 'Usually no. A single focused page converts best. The multi-page version adds an FAQ and About page for products that need more explanation, but start with one page.' },
      { q: 'Can I show a countdown to launch?', a: 'There is no countdown timer in the template. State the date clearly in the announcement bar and the hero, which works for search and for visitors, and add a timer from a script if you need one.' },
    ],
  },

  agency: {
    about: `A creative agency website sells taste before it sells services, so this dark template lets the visuals lead. A bold gradient hero introduces the studio, a bento grid of cards shows services and standout work at different sizes, a row of counters backs it with numbers, a team carousel shows the people, one large client quote adds proof and a latest-articles list keeps the site fresh. The multi-page version adds Services, Work, About and Contact pages so each has its own address for search.

Swap in your own work and write each card as a result, such as the brand, the audience and the outcome, rather than only a client name. Keep the services to what you want to be hired for, use the counters for numbers you can stand behind, and make the contact page ask for scope, budget and timeline so the enquiries you get are ones you can answer. The dark theme suits design, motion and development studios; change the preset if your brand is lighter. A case-study showcase gives two flagship projects their own cards with the result, three key numbers and a client quote.`,
    checklist: [
      'Your best work first, with the result each project delivered',
      'A services list that matches the projects you want to win',
      'One or two named client quotes, not a wall of logos',
      'Numbers you can prove, such as years, projects or clients',
      'A contact page that asks for scope, budget and timeline',
    ],
    faqs: [
      { q: 'What should an agency website show first?', a: 'Your best work and a one-line description of who you help. Visitors decide in seconds whether the studio is right for them, so lead with a strong project and make the contact button easy to find.' },
      { q: 'Can I add more work or services?', a: 'Yes. The bento grid, team carousel and article list are repeatable: add, duplicate and reorder items and upload an image for each. In the multi-page version you can also add pages from the Pages tab, for example one per case study.' },
      { q: 'Does the agency template work for freelancers?', a: 'Yes. Change the studio name to your own, shorten the services list and use the personal tone in the About page. If you want a page built around one person, the Personal Portfolio template is a closer fit.' },
      { q: 'How many pages does the multi-page agency site have?', a: 'Six: Home, Services, Work, About, Contact and a Privacy page. They share one navbar, footer and theme, and the exported ZIP has one HTML file per page with a shared stylesheet.' },
    ],
  },

  portfolio: {
    about: `A portfolio is a sales page for one person, and its best feature is fast proof. This template opens with a clear statement of what you do and a call to hire you, then shows services, client quotes, writing and a contact form on one clean page. A floating pill navbar keeps the navigation light so the work stays the focus.

Make it yours by replacing the sample designer with your name, role and city, adding three to six of your best projects and writing each service as a problem you solve. The blog cards section is useful for case-study write-ups and notes, which also give search engines something to index beyond your name. Add the contact form endpoint so enquiries reach your inbox. The multi-page version adds a Blog and a Contact page. A case-study section gives two projects the space to show the result, the numbers and a client quote.`,
    checklist: [
      'A one-sentence description of what you do and for whom',
      'Your best three to six projects, each with the outcome',
      'A short list of services, written as problems you solve',
      'Two or three quotes from named clients',
      'A contact form or email link in reach at every scroll point',
    ],
    faqs: [
      { q: 'What should I put on a personal portfolio website?', a: 'Your name and what you do, a handful of strong projects with the result, a short services list, a few client quotes and an easy way to contact you. Quality matters more than the number of projects.' },
      { q: 'Is this portfolio template suitable for developers and designers?', a: 'Yes. The sample content is a designer, but the sections are generic: replace the text and images with your own and it works for developers, writers, illustrators and consultants.' },
      { q: 'Can I add a blog to my portfolio?', a: 'Yes. The blog cards section shows your latest writing, and the multi-page version includes a Blog page. Posts link to wherever you publish them, so you can link to a CMS, Medium or your own pages.' },
      { q: 'How do I get a custom domain for the portfolio?', a: 'Download the ZIP and upload it to a static host such as Netlify, Vercel or GitHub Pages. They let you connect your own domain. Set your site address in the builder so the sitemap and canonical links use it.' },
    ],
    home: {
      title: 'Alex Rivera: Freelance Product Designer for Small Teams',
      description: 'Alex Rivera is a freelance product designer who works with small teams from first sketch to launch. See selected projects, client reviews and get in touch.',
    },
  },

  photographer: {
    about: `A photographer's site has to load fast, look like the photographs and make booking simple. This template opens on a full-width image hero, adds clear package pricing in a rows layout that is easy to compare, shows recent shoots as story cards and ends with a contact form that asks for the date and the place. The multi-page version gives Pricing, Blog and Contact their own pages.

Use your strongest image for the hero, keep the pricing honest and list what every package includes, and write each blog card as a short story of a real day with a few photographs, which also helps you appear in search for the place and type of shoot. Ask for the date, location and a few details in the form so you can reply with availability. Photographs are resized in your browser, so use the original files and let the builder handle sizes. A filterable gallery follows the hero so clients can browse weddings, portraits and brand work, and a prints and albums grid lets you sell prints and vouchers with links to your checkout.`,
    checklist: [
      'A hero image that shows your style in the first second',
      'Packages with a price, what is included and how to book',
      'Recent shoots with the location and the story, for local search',
      'A form that asks for the date, place and type of session',
      'Reviews from clients, ideally with the venue or session type',
    ],
    faqs: [
      { q: 'How should a photographer present pricing online?', a: 'Show packages with a starting price and a clear list of what is included. Pricing filters out poor-fit enquiries and builds trust. This template uses a rows layout that makes packages easy to compare.' },
      { q: 'Will my photos look sharp on this template?', a: 'Upload full-resolution images: they are resized in your browser and the exported ZIP includes them in an assets folder. The hero and story cards use cover cropping, so choose images that still work when cropped.' },
      { q: 'Can I use it as a wedding photography website?', a: 'Yes. The sample text covers weddings and portraits, so you only need to replace the images and details. Add a story card for each wedding with the venue name to help local search.' },
      { q: 'How do clients contact me or check my availability?', a: 'The contact form takes a date, place and message and can send to Formspree or any endpoint. You can also add phone and email links beside the form, with the response time you promise.' },
    ],
    home: {
      title: 'Mira Lens: Natural Wedding and Portrait Photography',
      description: 'Mira Lens photographs weddings, families and brands across Portugal with a natural, unposed style. See recent stories, session packages and check availability.',
    },
  },
};
