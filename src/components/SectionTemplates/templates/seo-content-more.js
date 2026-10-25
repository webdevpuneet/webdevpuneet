/* SEO page content for the sections added on 2026-10-25 (merged into SECTION_SEO in seo-content.js)
   plus the Login & Sign up category (merged into SECTION_CATEGORY_SEO). Same shape as every other
   entry: keywords, about, 10 features, 3 reasons, 4 use cases (18-42 words), 5 FAQs, an AI prompt. */

export const MORE_SECTIONS_SEO = {
  'login-form': {
    keywords: ['login form html template', 'sign in page template', 'login page html css', 'login form with social buttons', 'responsive login page'],
    about: {
      title: 'Login Form — Free Sign In Page Template',
      description: `**Login Form** is a free sign-in page template for websites, web apps and members' areas. It has a clear heading, an email and password form and, if you want them, buttons to continue with Google, GitHub or other services. Choose a centred card, or a split layout with a photo and a customer quote beside the form. It fits a stand-alone login page, a members' area or the sign-in step of a web app, and the split version gives a portal a more finished, branded look.

**Everything a sign-in page needs**

The password field has a show-password button, so people can check what they typed. A remember-me box, a forgot-password link and a link to your [Register Form](/website-section-templates/register-form/) are one switch each, and you can rename every label. The page works on phones, tablets and desktops.

**Built for password managers and screen readers**

Every field has a real label and the right autocomplete setting, so browsers and password managers fill it correctly. Focus rings are visible, buttons are real buttons and links are real links, and all of it works with a keyboard.

**Connect it to your own sign-in**

The form posts to the address you enter, with the field names you choose, so it works with your own server or with services such as Firebase, Supabase, Auth0 or Netlify Identity. This template is the front end only: checking passwords and starting sessions must happen on your server over HTTPS.

**Make it yours**

Colours, fonts and corner radius come from your theme. Click any text in the preview to change it, upload the panel photo, then export HTML, a ZIP with your images, React or Vue, or add the section to a page in the [Website Builder](/website-builder/).`,
    },
    features: [
      'Centred card or split layout with an image panel and a customer quote',
      'Email and password form with real labels and autocomplete for password managers',
      'Show and hide password button',
      'Remember-me checkbox and forgot-password link, each on or off',
      'Social sign-in buttons for Google, GitHub, Apple, Microsoft and Facebook',
      'Link to your register page and an optional note under the form',
      'Posts to any address, with the field names you choose',
      'Keyboard friendly, with visible focus and screen-reader labels',
      'Follows your theme colours, fonts and corner radius',
      'Export HTML, a ZIP with images, React or Vue',
    ],
    why: [
      { icon: '🔐', title: 'Ready for your backend', desc: 'The form posts to any address with the field names you set, so it fits Firebase, Supabase, Auth0 or your own server.' },
      { icon: '🧑‍🦯', title: 'Accessible and password-manager friendly', desc: 'Labels, autocomplete settings and focus styles are built in, so people can sign in with a keyboard or autofill.' },
      { icon: '🎨', title: 'Matches your brand', desc: 'Pick a card or split layout, then set colours, fonts and corners once and every section follows.' },
    ],
    useCases: [
      { icon: '🏢', title: 'Customer and member portals', desc: 'Give customers a branded sign-in page for their account area, with a forgot-password link and a link to create an account.' },
      { icon: '🛠', title: 'Admin and dashboard logins', desc: 'Put a simple, trustworthy sign-in in front of an admin area or internal tool, with the split layout for a professional look.' },
      { icon: '🔒', title: 'Gated content and courses', desc: 'Ask students and subscribers to sign in before they reach lessons, downloads or members-only articles, with social buttons for speed.' },
      { icon: '📱', title: 'Web app sign-in screens', desc: 'Start a new web app with a ready sign-in page that already works on phones, then connect it to your authentication service.' },
    ],
    faqs: [
      { q: 'How do I connect the login form to my backend?', a: 'Enter the address your sign-in endpoint expects in the Form URL field and set the email and password field names. The form then posts to it like any ordinary HTML form.' },
      { q: 'Does this template check passwords or log people in?', a: 'No. It is the front end only. Checking passwords, starting a session and protecting pages must be done by your server or an authentication service over HTTPS.' },
      { q: 'How do the Google and GitHub buttons work?', a: 'Each button is a link. Paste the sign-in address that your authentication service gives you for that provider, and the button sends the visitor there.' },
      { q: 'Can I remove the remember-me and forgot-password options?', a: 'Yes. Both are switches in the Form group, as are the social buttons and the image panel, so the page can be as plain or as complete as you like.' },
      { q: 'Is the login page good for password managers?', a: 'Yes. Fields use real labels and the right autocomplete values, such as username and current-password, so browsers and password managers can fill them in.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Login Form HTML and CSS: add magic-link sign-in, a two-factor code step, an error message area, or turn it into a React component with validation.',
      prompt: `Create a responsive login page in plain HTML and CSS.

- A centred card, maximum width 460px, with an icon, a heading, a short text and two social sign-in link buttons (Google and GitHub) above an "or sign in with email" divider.
- A form with a labelled email input (type=email, autocomplete="username") and a labelled password input (autocomplete="current-password") with a show and hide password button.
- A row with a "Keep me signed in" checkbox and a "Forgot password?" link, a full-width Sign in button and a "New here? Create an account" link.
- Visible focus styles, native validation, and a layout that works from 320px up.
- Use CSS custom properties for the brand colour, text colour and corner radius.`,
    },
  },

  'register-form': {
    keywords: ['register form html template', 'sign up page template', 'create account form html css', 'signup form with password strength', 'responsive registration page'],
    about: {
      title: 'Register Form — Free Sign Up Page Template',
      description: `**Register Form** is a free sign-up page template for trials, free plans, memberships and communities. It asks for a name, an email address and a password, shows how strong the password is as it is typed, checks that the two passwords match and asks the visitor to agree to your terms. Choose a centred card or a split layout with a photo and a customer quote. It fits free trials, memberships, course sign-ups and shop accounts, and the split version gives your sign-up page a friendly, branded look.

**Fewer mistakes, more finished sign-ups**

A live strength meter with four steps and plain words, from Weak to Strong, helps people choose a good password. The confirm field tells them straight away if the two entries differ, and a show-password button lets them check what they typed. Each of these can be switched off to keep the form short.

**Social sign-up and clear terms**

Add buttons for Google, GitHub, Apple, Microsoft or Facebook above the form. A terms checkbox with a link to your terms and privacy pages keeps you covered. A link to your [Login Form](/website-section-templates/login-form/) is ready for people who already have an account.

**Works with your own backend**

The form posts to the address you enter, with the field names you choose, so it fits your own server, Firebase, Supabase, Auth0 or a newsletter service. This is the front end only: creating the account and sending a confirmation email must happen on your server.

**Your brand, your words**

Edit every label, placeholder and message by clicking it in the preview, set your colours, fonts and corners once, then export HTML, a ZIP, React or Vue, or add it to a page in the [Website Builder](/website-builder/).`,
    },
    features: [
      'Name, email, password and confirm-password fields, each with a real label',
      'Live password strength meter with four steps and words you can change',
      'Password mismatch message from the browser',
      'Show and hide password button',
      'Terms checkbox with a link to your terms and privacy pages',
      'Social sign-up buttons for Google, GitHub, Apple, Microsoft and Facebook',
      'Centred card or split layout with an image panel and a quote',
      'Posts to any address, with the field names you choose',
      'Keyboard friendly, with autocomplete values for password managers',
      'Export HTML, a ZIP with images, React or Vue',
    ],
    why: [
      { icon: '✅', title: 'Fewer weak passwords', desc: 'A live strength meter and a clear hint nudge people towards a password they will not have to reset next week.' },
      { icon: '🧩', title: 'As short or as long as you like', desc: 'Switch the name, confirm field, strength meter, terms box and social buttons on or off to fit your sign-up flow.' },
      { icon: '🔌', title: 'Plugs into your backend', desc: 'The form posts to any address with your field names, so it works with your own server or an authentication service.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Free trial and free plan sign-ups', desc: 'Let visitors create an account in under a minute, with social buttons for speed and a short form with a clear password hint.' },
      { icon: '👥', title: 'Membership and community join pages', desc: 'Welcome new members with a friendly page that includes your terms checkbox, a customer quote beside the form and a link to sign in.' },
      { icon: '🎓', title: 'Course and app registration', desc: 'Collect a name, email and password before students reach their lessons, then send them straight to a confirmation or onboarding page.' },
      { icon: '🛒', title: 'Customer accounts for shops', desc: 'Offer shoppers an account to track orders and save details, with a simple card layout that matches the rest of your shop.' },
    ],
    faqs: [
      { q: 'How do I connect the register form to my backend?', a: 'Enter the address your sign-up endpoint expects in the Form URL field and set the name, email, password and confirmation field names. The form then posts to it like any HTML form.' },
      { q: 'Does the form create the account by itself?', a: 'No. It is the front end. Creating the account, storing the password safely and sending a confirmation email must be handled by your server or an authentication service.' },
      { q: 'How does the password strength meter work?', a: 'It scores the password as it is typed, using its length and a mix of letters, numbers and symbols, and shows four steps with words you can rename.' },
      { q: 'Can I make the sign-up form shorter?', a: 'Yes. Switch off the name field, the confirm-password field, the strength meter, the terms checkbox or the social buttons to leave only the fields you need.' },
      { q: 'How do I make people agree to the terms?', a: 'Leave the terms checkbox on. It is required, so the form cannot be sent until it is ticked, and the link text and address are yours to set.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Register Form HTML, CSS and JavaScript: add email availability checking, a username field, a password rules checklist, or a React version with validation.',
      prompt: `Create a responsive sign-up page in plain HTML, CSS and JavaScript.

- A centred card, maximum width 460px, with a heading, a short text, two social sign-up link buttons and an "or sign up with email" divider.
- A form with labelled inputs for full name, email, password (minlength 8, autocomplete="new-password", with a show and hide button) and confirm password.
- A password strength meter with four bars that updates as the user types (length, upper and lower case, a number, a symbol) and a word such as Weak, Fair, Good or Strong.
- A check that the confirm password matches, using setCustomValidity with a clear message.
- A required terms checkbox with a link, a full-width Create account button and an "Already have an account? Sign in" link.
- Use CSS custom properties for colours and corner radius, with visible focus styles.`,
    },
  },

  'blog-post': {
    keywords: ['blog post template html', 'single post page template', 'article page html css', 'blog post layout with table of contents', 'blog post template with author box'],
    about: {
      title: 'Blog Post Page — Free Single Article Template',
      description: `**Blog Post Page** is a free template for the page a single article lives on: the permalink view of a blog post. It gives you a breadcrumb, a category, a large headline, a standfirst, the author with the date and read time, a cover image and then the article itself, laid out for comfortable reading. It works for company news, tutorials, guides, case studies and personal blogs, and it is built so that a long article stays easy to read on a phone as well as on a desktop.

**Structure that readers and search engines like**

The article is a list of sections, each with its own H2 heading, text, optional bullet list, pull quote and image. A table of contents is built from those headings, so long articles are easy to scan and each section can be linked to directly. The page has a single H1, and the date is marked up as a real time element.

**Structured data included**

The template writes BlogPosting and breadcrumb structured data from what you enter, including the headline, standfirst, cover image, dates, author, category, tags and word count. Add the full address of the post and the structured data includes it too.

**Keep readers on your site**

Below the article are tags, share buttons for X, LinkedIn, Facebook and WhatsApp plus a copy-link button, an author box with a short bio, previous and next links and a row of related posts. Each part is a switch, so a short post can stay simple.

**Edit, then export**

Click any text in the preview to edit it, set your colours and fonts once, then export HTML, a ZIP, React or Vue. Pair it with the [Blog Grid with Pagination](/website-section-templates/blog-grid-pagination/) for your blog index.`,
    },
    features: [
      'Breadcrumb, category, H1 headline, standfirst, author, date and read time',
      'Cover image with an optional caption',
      'Article as sections with H2 headings, text, bullet lists, pull quotes and images',
      'Table of contents built from the headings',
      'Tags and share buttons for X, LinkedIn, Facebook, WhatsApp and copy link',
      'Author box with photo, name and short bio',
      'Previous and next post links',
      'Related posts as cards with covers, categories and dates',
      'BlogPosting and breadcrumb structured data from your entries',
      'Export HTML, a ZIP with images, React or Vue',
    ],
    why: [
      { icon: '🔎', title: 'Search-ready markup', desc: 'One H1, H2 section headings, a time element and BlogPosting data help search engines understand the article.' },
      { icon: '📖', title: 'Comfortable to read', desc: 'A narrow text column, generous line spacing and a table of contents make long articles easy to follow.' },
      { icon: '↩️', title: 'Keeps readers moving', desc: 'Share buttons, an author box, previous and next links and related posts give every reader a next step.' },
    ],
    useCases: [
      { icon: '📰', title: 'Company and news blogs', desc: 'Give every announcement, story and update a consistent page with the author, date and category clearly shown at the top.' },
      { icon: '🧭', title: 'Guides and tutorials', desc: 'Use the table of contents, numbered sections and bullet lists to lay out step-by-step guides that people can scan and return to.' },
      { icon: '✍️', title: 'Personal blogs and magazines', desc: 'Publish essays with pull quotes, images and captions, a bio box with your photo and a row of related reading below.' },
      { icon: '🧪', title: 'Case studies and reports', desc: 'Present results in sections with images and key points, then link to the next study with previous and next buttons.' },
    ],
    faqs: [
      { q: 'What is a blog post permalink page?', a: 'It is the page with its own web address where one article lives. It holds the full text, the author and date, and links to related posts, as opposed to a blog index that lists many posts.' },
      { q: 'Does the blog post template add schema markup?', a: 'Yes. It writes BlogPosting and breadcrumb structured data from your headline, image, dates, author, category and tags. Add the full post address to include it too.' },
      { q: 'How is the table of contents created?', a: 'It is built from the H2 headings of your sections when the page loads, and each entry links to its section. Without JavaScript the article still reads as normal.' },
      { q: 'How many headings should a blog post have?', a: 'Use one H1 for the title and an H2 for each main section. Short, descriptive headings help readers scan and help search engines understand the article.' },
      { q: 'Can I turn off the share buttons or the author box?', a: 'Yes. The breadcrumb, cover image, table of contents, share row, author box, previous and next links and related posts each have their own switch.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Blog Post HTML, CSS and JavaScript: add a reading progress bar, a comments area, an estimated read-time calculator or a React component.',
      prompt: `Create a blog post page in plain HTML and CSS.

- A breadcrumb nav (Home / Blog / current post), a category pill, one H1 headline, a standfirst paragraph, and an author row with a round photo, name, role, a time element with a datetime attribute and a read time.
- A 16:9 cover image, then a narrow reading column (about 720px) with a table of contents box and several sections, each with an H2 heading, paragraphs, an optional bullet list, a pull quote with a left border and an optional figure with a caption.
- Under the article: tag pills, share buttons (X, LinkedIn, Facebook, WhatsApp, copy link), an author box, previous and next links and three related post cards.
- Include BlogPosting JSON-LD (headline, description, image, datePublished, dateModified, author) and use CSS custom properties for colours and radius.`,
    },
  },

  'blog-grid-pagination': {
    keywords: ['blog grid with pagination', 'blog index page template', 'blog archive html css', 'blog cards pagination html', 'load more posts template'],
    about: {
      title: 'Blog Grid with Pagination — Free Blog Index Template',
      description: `**Blog Grid with Pagination** is a free template for a blog index or archive page. A heading and intro sit above a grid of post cards, each with a cover image, category, date, read time, title, excerpt and author. When there are more posts than fit on one page, visitors move through them with numbered pagination or a "Show more posts" button. It works for blog indexes, news pages, guide libraries and portfolios, and it keeps a long archive tidy on phones, tablets and desktops without sending visitors to a new page for every click.

**Every post stays in the page**

All posts are written into the page itself. Search engines and visitors without JavaScript see the full list, and with JavaScript the grid shows one page at a time. A status line, such as "Showing 1–6 of 12 posts", is announced to screen readers when the page changes, and focus stays on the page buttons.

**You choose how it pages**

Set how many posts appear per page, from 1 to 24, and how many columns the grid has, from two to four, with fewer on tablets and phones. Pick numbered pages with Previous and Next, which collapse long lists with ellipses, or a single load-more button that reveals the next batch and then disappears.

**Structured data and speed**

The template writes BlogPosting list structured data from your posts, and cover images are lazy-loaded so the first page opens fast. Card titles and covers are real links, so every post can be reached with a keyboard.

**Edit and export**

Add, reorder and remove posts in the list, upload covers and author photos, change every label, then export HTML, a ZIP, React or Vue. Pair it with the [Blog Post Page](/website-section-templates/blog-post/) for the article view.`,
    },
    features: [
      'Grid of post cards with cover, category, date, read time, title, excerpt and author',
      'Numbered pagination with Previous, Next and ellipses for long lists',
      'Or a "Show more posts" button that reveals the next batch',
      'Choose 1 to 24 posts per page and two, three or four columns',
      'Status line such as "Showing 1–6 of 12 posts", with labels you can change',
      'All posts stay in the HTML for search engines and visitors without JavaScript',
      'Keyboard friendly, with focus kept on the page buttons',
      'BlogPosting list structured data',
      'Add, reorder and remove up to 48 posts, with image uploads',
      'Export HTML, a ZIP with images, React or Vue',
    ],
    why: [
      { icon: '🔍', title: 'Crawlable by design', desc: 'Every post is in the page, so search engines can find them all and visitors without scripts still see the full list.' },
      { icon: '🧭', title: 'Easy to browse', desc: 'Numbered pages, a status line and a load-more option let readers move through a long archive at their own pace.' },
      { icon: '⚙️', title: 'Flexible layout', desc: 'Set the page size and the number of columns to match your content and your design.' },
    ],
    useCases: [
      { icon: '📚', title: 'Blog index and archive pages', desc: 'List every article on one page and let readers page through them, with categories and dates visible on each card.' },
      { icon: '🗞', title: 'News and update listings', desc: 'Show the latest announcements first, then older ones on later pages, with a short excerpt for each item.' },
      { icon: '🧰', title: 'Guides and resource libraries', desc: 'Organise tutorials, templates and downloads in a grid, with a load-more button for visitors who like to keep scrolling.' },
      { icon: '💼', title: 'Portfolio and case study lists', desc: 'Present past projects as cards with a cover and a short summary, with pagination once the list grows past a screen or two.' },
    ],
    faqs: [
      { q: 'Does pagination hurt SEO on a blog page?', a: 'Not here. All posts are in the page itself, so search engines can read every post and link without needing to follow page buttons. The buttons are for visitors.' },
      { q: 'Should I use numbered pages or a load more button?', a: 'Numbered pages suit archives people return to, because they can tell where they are. A load-more button suits shorter lists and mobile visitors who like to keep scrolling.' },
      { q: 'How many posts can the blog grid hold?', a: 'Up to 48 posts in the list, shown from 1 to 24 per page. For a larger archive, link to separate archive pages from the heading.' },
      { q: 'Does the blog pagination work without JavaScript?', a: 'Yes. Without JavaScript every post is shown and the page buttons are hidden, so nothing is lost, and visitors can still scroll through the whole list.' },
      { q: 'Can I change the pagination button text?', a: 'Yes. The Previous, Next and show-more labels, the status line and the navigation label for screen readers are all fields you can edit.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Blog Grid HTML, CSS and JavaScript: add category filters, a search box, page numbers in the address bar or a React component with server-side paging.',
      prompt: `Create a blog index grid with client-side pagination in plain HTML, CSS and JavaScript.

- A heading and intro, then a CSS grid of 12 post cards (cover image with 16:10 ratio, category pill, date, read time, title link, excerpt, author with avatar), three columns on desktop, two on tablets and one on phones.
- All 12 cards are in the HTML. JavaScript shows 6 per page by setting the hidden attribute on the others.
- Buttons: Previous, page numbers (with ellipses when there are many pages) and Next, with aria-current="page" on the active number and disabled states at the ends.
- A status line "Showing 7–12 of 12 posts" in an aria-live region; on page change, scroll to the grid and keep focus on the current page button.
- A second mode with a single "Show more posts" button that reveals the next 6 and removes itself at the end.`,
    },
  },
};

export const MORE_CATEGORY_SEO = {
  auth: {
    title: 'Login & Register Page Templates — Free Sign In and Sign Up',
    description: 'Free login and register page templates with email and password forms, social sign-in, show password and a strength meter. Export HTML, React or Vue code.',
    h1: 'Login & Register Page Templates',
    keywords: ['login page template', 'register form html', 'sign in page html css', 'sign up page template', 'login form with social buttons'],
    intro: `A sign-in or sign-up page is where a visitor becomes a customer or a member, so it should be quick, clear and easy to trust. These templates give you the screens without the busywork: labelled fields, a show-password button and a layout that works from small phones up.

Use the **[Login Form](/website-section-templates/login-form/)** for returning visitors: email, password, remember me, a forgot-password link and optional buttons for Google, GitHub and other services. Use the **[Register Form](/website-section-templates/register-form/)** for new accounts: a name, email and password with a live strength meter, a confirm field and a terms checkbox. Each comes as a centred card or as a split layout with a photo and a customer quote.

The forms post to the address you enter, with the field names you choose, so they connect to your own server or an authentication service such as Firebase, Supabase or Auth0. They are the front end only: checking passwords and creating accounts must happen on your server over HTTPS. Edit them in your browser and export HTML, a ZIP, React or Vue.

Keep the form short, ask only for what you need and give people a clear way to recover a password. For the page that follows, see the [call-to-action sections](/website-section-templates/category/cta/).`,
    faqs: [
      { q: 'How do I make a login page for my website?', a: 'Open the Login Form, set your form address and field names, edit the text and export the HTML. The page then posts to your own sign-in endpoint or service.' },
      { q: 'Can I use these login and register forms with Firebase or Auth0?', a: 'Yes. They are plain forms and links, so they connect to any service that accepts a form post or gives you a sign-in address, including Firebase, Supabase and Auth0.' },
      { q: 'Are the sign-in templates accessible?', a: 'Yes. Every field has a real label and the right autocomplete setting, buttons are real buttons, focus is visible and the whole page works with a keyboard.' },
    ],
  },
};
