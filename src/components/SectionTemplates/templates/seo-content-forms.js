/* SEO page content for the Forms category (sections added 2026-11-12, merged into SECTION_SEO in seo-content.js).
   Same shape as every other entry: keywords, about, features, why, useCases, faqs and an AI prompt. */

const COMMON_HOW = 'Every form posts to the address you paste into "Form URL" (Formspree, Basin, Getform or your own server), shows a success message, shows an error message when something fails and contains a hidden spam-trap field. Without JavaScript it is an ordinary form post.';

export const FORMS_SECTIONS_SEO = {
  'form-contact-centered': {
    keywords: ['contact form html template', 'contact us section', 'html contact form with formspree', 'contact form with character counter', 'centered contact form'],
    about: {
      title: 'Centered Contact Form — Free HTML Contact Section With Topic Menu',
      description: `**Centered Contact Form** is a free contact section for websites that want one clear way to reach them. A centered heading sits above a soft card with the fields people expect: name and email side by side, an optional phone number, a topic menu, a message box and a consent checkbox. It is plain HTML and CSS, so you can paste it into any page or export it as React or Vue.

**Details that make a form easier to finish**

The topic menu sorts messages before you read them (sales, support, press) and the list is yours to edit. The message box has a live character counter, so people see the limit before they hit it. The phone field and the consent box disappear when you empty their labels, which keeps a short form short. Inputs carry the right \`autocomplete\` and \`type\` values, so phones offer the saved name, email and number, and browsers check the email format for you.

**It really sends**

${COMMON_HOW} Paste your Formspree address once and the form works. The fields sent are name, email, phone, topic, message and consent. For a version with contact details beside the form see the [Contact Form With Details](/website-section-templates/contact-split-form/), and for floating labels try the [Floating Label Form](/website-section-templates/form-floating-labels/).

**Edit and export**

Change every label, the topics, the button, the note under it and the success and error messages in the editor, pick colours, fonts and corner radius, then copy the HTML, download a ZIP, copy a React or Vue component or fork it into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Centered heading above a soft card with name, email, phone, topic, message and consent',
      'Topic menu built from an editable list',
      'Message box with a live character counter and a 600 character limit',
      'Optional phone and consent fields that disappear when their labels are empty',
      'Correct input types and autocomplete values for faster filling on phones',
      'Posts to Formspree, Basin, Getform or your own endpoint, with success and error messages',
      'Hidden spam-trap field and a working normal POST without JavaScript',
      'Theme colours, fonts and corner radius; export as HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '📨', title: 'Messages arrive sorted', desc: 'A topic menu tells you who should read each message before you open it.' },
      { icon: '⚡', title: 'Short and quick to fill', desc: 'Only the fields you keep are shown, with the right keyboard and autofill on phones.' },
      { icon: '🛡', title: 'Spam-resistant', desc: 'A hidden trap field and a consent box keep bots and accidental sends out.' },
    ],
    useCases: [
      { icon: '🏢', title: 'Business contact pages', desc: 'Give agencies, studios and local firms a clean form with a topic menu, so sales, support and press messages reach the right inbox.' },
      { icon: '🧰', title: 'Support and sales enquiries', desc: 'Let visitors pick “Sales and pricing” or “Support” and use the reply-by-email note to set the right expectation about response time.' },
      { icon: '👩‍💻', title: 'Freelancer websites', desc: 'Add a simple form to a portfolio so clients can reach you without opening their email app, with consent for GDPR-friendly contact.' },
      { icon: '🏛', title: 'Associations and clubs', desc: 'Offer one form for membership questions, press and general enquiries, with a character limit that keeps messages focused.' },
    ],
    faqs: [
      { q: 'How do I make the Centered Contact Form send emails?', a: 'Create a free form at Formspree (or Basin or Getform), copy its address into the "Form URL (action)" field and export. Submissions are emailed to you by that service.' },
      { q: 'Can I remove the phone field or the consent checkbox?', a: 'Yes. Empty the phone label or the consent text in the editor and that field is left out of the exported page.' },
      { q: 'What does the character counter do?', a: 'It shows how many characters have been typed out of 600 as the visitor writes. The browser also stops typing at the limit, so long messages are never cut off by the server.' },
      { q: 'Does the form work without JavaScript?', a: 'Yes. It is a normal form post to your endpoint. JavaScript adds the smooth success message, the counter and the busy state on the button.' },
      { q: 'Is the form accessible?', a: 'Every field has a visible label, the error message is announced to screen readers, focus rings are visible, and the success message receives focus when it appears.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Centered Contact Form: add a file upload, post to your own API route, add client-side validation messages or turn it into a React component with controlled inputs.',
      prompt: `Build a centered contact form section in plain HTML and CSS.

- A centered heading and short text above a card.
- Fields: name and email side by side, an optional phone, a select menu of topics, a message textarea with a live character counter (600 maximum) and a required consent checkbox. Use proper type, autocomplete and required attributes and visible labels.
- The form posts to an action URL with fetch, shows a success message and an error message (role="alert"), disables the button while sending and includes a hidden honeypot field named _gotcha.
- Works as a normal POST without JavaScript.
- Responsive: the two-column rows stack below 560 px. Use CSS variables for colours and radius.`,
    },
  },

  'form-floating-labels': {
    keywords: ['floating label form', 'floating label input css', 'html form with floating labels', 'modern contact form', 'material style form css'],
    about: {
      title: 'Floating Label Form — Free HTML & CSS Form Where Labels Glide Up',
      description: `**Floating Label Form** is a free lead and contact section where each label sits inside its field and glides up when you click or type, a pattern popularised by Material Design. Here it is done with CSS only: the input has a blank placeholder, and the label moves with the \`:placeholder-shown\` and \`:focus\` selectors, so there is no script to load and nothing to break.

**Beside the form, a list of promises**

On the left the section has a heading, short text and a checklist for what the visitor can expect (a reply within a day, no sales pressure, a free call). Promises near a form lift completion because they answer “what happens after I press send?”. The list is one line per promise and you can empty it.

**Fields and sending**

The form asks for name, work email, an optional company and phone, a message and an optional opt-in for updates. Empty a label and that field is removed. ${COMMON_HOW} For a classic label-above layout see the [Centered Contact Form](/website-section-templates/form-contact-centered/).

**Accessible floating labels**

Each label is wrapped around its input, so clicking the label focuses the field and screen readers announce it. The floated label is shrunk, not hidden, and the focus ring and error colours follow your theme. Because the label stays visible after typing, people never forget what a field is for.`,
    },
    features: [
      'Floating labels built with CSS only (:placeholder-shown and :focus)',
      'Heading, text and a checklist of promises beside the form',
      'Name, work email, optional company and phone, message and optional opt-in',
      'Fields vanish when their labels are emptied',
      'Visible focus ring, invalid and valid border colours',
      'Posts to Formspree, Basin, Getform or your own endpoint with success and error messages',
      'Hidden spam-trap field; works as a normal POST without JavaScript',
      'Theme colours, fonts and radius; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '✨', title: 'Modern and compact', desc: 'Labels use the space inside the field, so the form is shorter without losing clarity.' },
      { icon: '🧩', title: 'No JavaScript for the effect', desc: 'The animation is pure CSS, so it is light, fast and works everywhere.' },
      { icon: '🤝', title: 'Promises that convert', desc: 'A short checklist beside the form answers what happens next.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS and startup lead forms', desc: 'Ask for a work email and company, add a promise list such as “reply in a working day” and capture demo or trial requests.' },
      { icon: '🎨', title: 'Agency and studio sites', desc: 'Pair the modern floating labels with a brand colour and invite project briefs, with a free call as the first promise.' },
      { icon: '🧑‍🏫', title: 'Coaches and consultants', desc: 'Offer a free discovery call with a short form and a note that spells out what happens after the request is sent.' },
      { icon: '🏗', title: 'Local service businesses', desc: 'Capture phone numbers and short messages from mobile visitors, where big touch-friendly fields and labels that stay visible make filling the form quick and error-free.' },
    ],
    faqs: [
      { q: 'How do floating labels work without JavaScript?', a: 'The input has an empty placeholder (a single space). When the field is focused or not showing that placeholder, a CSS rule moves and shrinks the label that follows it.' },
      { q: 'Are floating labels bad for accessibility?', a: 'They are fine when the label stays visible and readable, as here. The label is a real label element wrapped around the input, it is never replaced by placeholder text and it keeps enough contrast when it floats.' },
      { q: 'Can I add more fields?', a: 'Yes. Export the HTML or fork to My Code, copy one of the field blocks and change its name and label. Each field is a label containing an input and a span.' },
      { q: 'How do I receive the submissions?', a: 'Paste your Formspree, Basin or Getform address into the Form URL field. Fields sent are name, email, company, phone, message and updates.' },
      { q: 'Will it work in React or Vue?', a: 'Yes, use the Copy React component or Copy Vue component export. The CSS and the form behaviour script are included.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Floating Label Form: add inline validation messages, a phone number mask, a multi-line address block or a floating-label select.',
      prompt: `Create a two-column section in plain HTML and CSS: on the left a heading, text and a checklist of promises; on the right a card with a contact form that uses floating labels.

- Each field is <label class="fl"><input placeholder=" " ...><span>Label</span></label>. The span sits inside the input and, when the input is focused or not showing its placeholder, moves up and scales down with a transition. No JavaScript.
- Fields: name, email, company, phone, a textarea message and a checkbox opt-in.
- Add focus rings, :user-invalid red borders and a stacked layout below 860 px.
- The form posts with fetch to an action URL and shows success and error messages.`,
    },
  },

  'form-multi-step': {
    keywords: ['multi step form html', 'form wizard html css javascript', 'multi step form with progress bar', 'step by step form template', 'form with review step'],
    about: {
      title: 'Multi-Step Form — Free HTML Wizard With Progress Bar & Review Step',
      description: `**Multi-Step Form** splits a long form into three short steps: about you, your project and a review. A progress bar shows where you are, each step is checked before you can continue, and the last step lists every answer so people can check them before they send. Splitting a long form into steps feels shorter and usually completes better than one tall page of fields.

**How a step is checked**

When someone presses Continue, the fields on the current step are validated with the browser's own rules (required, email format) and the first problem is explained and focused. Pressing Enter in a field moves to the next step instead of submitting early, and Back never loses what was typed. The review step builds its list from the actual answers: text, the chosen option cards, the budget and the details.

**Built for your project type**

The second step shows option cards for the project type, from a list you edit, a budget menu and a details box. Change the three step names, the labels and the button texts to turn it into a quote request, an onboarding flow or an application. ${COMMON_HOW}

**Works without JavaScript**

If JavaScript is off, all three steps simply show one after another and the form posts normally. With it on, the steps animate in, respect reduced-motion settings and update \`aria-current\` on the progress bar for screen readers. For a single-page version of a quote form see the [Quote Request Form](/website-section-templates/form-quote-request/).`,
    },
    features: [
      'Three steps with a progress bar: about you, your project, review',
      'Each step is validated with the browser rules before moving on',
      'Enter key advances; Back keeps your answers',
      'Review step lists every answer, built from the form',
      'Option cards for the project type and a budget menu, both from editable lists',
      'aria-current on the progress step and reduced-motion support',
      'Posts to Formspree, Basin, Getform or your own endpoint, with success and error messages',
      'Falls back to one long form without JavaScript; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🪜', title: 'Feels shorter', desc: 'Small steps with a visible progress bar lower the effort of a long form.' },
      { icon: '✅', title: 'Fewer mistakes', desc: 'Errors are caught on the step where they happen, and the review step lets people double-check.' },
      { icon: '🧭', title: 'Easy to repurpose', desc: 'Rename the steps and lists to make a quote, onboarding or application flow.' },
    ],
    useCases: [
      { icon: '📋', title: 'Project and quote requests', desc: 'Collect the contact details first, then the project type, budget and brief, and let the client review the answers before sending.' },
      { icon: '👋', title: 'Customer onboarding', desc: 'Welcome new customers with a short sequence that gathers account details, preferences and goals one small step at a time, without overwhelming them or asking for everything at once.' },
      { icon: '🏫', title: 'Course and programme applications', desc: 'Break an application into personal details, background and a final review so applicants can finish in one sitting.' },
      { icon: '🏠', title: 'Service bookings', desc: 'Ask what service, when and where across steps, then show a summary that doubles as a confirmation checklist.' },
    ],
    faqs: [
      { q: 'How does the multi-step form validate each step?', a: 'Before moving on it runs the browser validation (checkValidity and reportValidity) on the fields in the current step. The first invalid field is explained and focused, and the step does not change.' },
      { q: 'Can I add more than three steps?', a: 'Yes. Export the HTML or fork to My Code and copy a step panel and a progress item. The script counts the panels, so no other change is needed.' },
      { q: 'What does the review step show?', a: 'A list of every field with an answer: text fields, the chosen option cards, selects and file names. Empty fields are left out.' },
      { q: 'Is it accessible?', a: 'Steps are marked with aria-hidden, the active progress item has aria-current="step", focus moves to the first field of each new step and animations stop for visitors who prefer reduced motion.' },
      { q: 'What if the visitor has JavaScript disabled?', a: 'All three steps show one after another as a single long form and it posts normally to your endpoint.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Multi-Step Form: save progress in localStorage, add a conditional step, validate with a schema library or post each step to an API.',
      prompt: `Build a three-step form wizard in plain HTML, CSS and JavaScript.

- A progress list with three items (about you, your project, review) whose bars fill as steps complete, with aria-current="step" on the active one.
- Step 1: name, email, company. Step 2: option cards (radio) for the project type, a budget select and a details textarea. Step 3: a review list (dl) built from the answers and a consent checkbox.
- Continue validates the visible step with reportValidity before moving on; Back returns; Enter advances without submitting.
- Only the last step has a Submit button. The form posts with fetch and shows success and error messages.
- Without JavaScript all steps are visible and the form posts normally.`,
    },
  },

  'form-quote-request': {
    keywords: ['quote request form html', 'get a quote form template', 'estimate request form', 'project brief form with file upload', 'service chips form'],
    about: {
      title: 'Quote Request Form — Free HTML Estimate Form With Service Chips',
      description: `**Quote Request Form** helps service businesses collect what they need to price a job in one go. Visitors pick the services they want from pill buttons, choose a budget from option cards, set a timeline, describe the project and attach a brief by dragging a file onto a drop area. A short “what happens next” list beside the form tells them when to expect a reply.

**Choices instead of typing**

Pill buttons and option cards are real checkboxes and radio buttons styled to look like buttons, so they work with the keyboard, screen readers and a plain form post. Services, budgets and timelines are three lists you edit, and each budget can carry a short note such as “Most projects”. People answer faster by choosing than by writing, and you get consistent data.

**A brief you can attach**

The drop area accepts PDF, Word and images, shows the chosen file name and highlights while a file is dragged over it. The form is sent as multipart form data so the file arrives with the other answers. ${COMMON_HOW}

**Make it yours**

Rename the headings, empty the phone and consent labels to remove them, change the colours to match your brand and export. For a stepped version of the same idea use the [Multi-Step Form](/website-section-templates/form-multi-step/); to book a time slot instead of a quote try the [Booking Request Form](/website-section-templates/booking-form/).`,
    },
    features: [
      'Service pill buttons (multi select) from an editable list',
      'Budget option cards, with an optional note on each',
      'Timeline select menu from a list',
      'Project description box and a drag-and-drop brief upload showing the file name',
      'Name, email, optional phone and consent',
      'A what-happens-next list beside the form',
      'Multipart posting so files arrive with the answers',
      'Spam-trap field, success and error messages; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🎯', title: 'Better enquiries', desc: 'Services, budget and timeline arrive already sorted, so you can quote faster.' },
      { icon: '📎', title: 'The brief comes with it', desc: 'A drop area lets clients attach the document they already have.' },
      { icon: '⏱', title: 'Clear next steps', desc: 'The list beside the form sets expectations and reduces follow-up emails.' },
    ],
    useCases: [
      { icon: '🎨', title: 'Design and development studios', desc: 'Let prospects tick design, development or branding, choose a budget band and attach a brief so your first reply can include a real estimate.' },
      { icon: '🔨', title: 'Builders and installers', desc: 'Ask what work is needed, when it should start and let customers upload a photo or plan so you can quote without a site visit first.' },
      { icon: '📸', title: 'Photographers and event vendors', desc: 'Collect the type of event, a budget range and a date range, then follow up with a package and price.' },
      { icon: '🧾', title: 'Agencies and consultants', desc: 'Qualify leads by budget and timeline before you reply, so your time goes to enquiries that fit your prices and your calendar, and polite declines are quick to send.' },
    ],
    faqs: [
      { q: 'How does the file upload work in the Quote Request Form?', a: 'It is a file input inside a drop area. The form is posted as multipart form data, so services that accept files (such as Formspree on paid plans, Basin or your own server) receive the attachment with the answers.' },
      { q: 'Can visitors choose more than one service?', a: 'Yes. The service pills are checkboxes. Budget is a single choice because its cards are radio buttons.' },
      { q: 'How do I change the budgets or services?', a: 'Edit the Services, Budgets and Timelines lists in the editor. Add, remove or reorder items and the form updates.' },
      { q: 'Can I limit the size of uploaded files?', a: 'The accept list restricts the file type in the picker. Size limits are enforced by the service that receives the form, so set them there.' },
      { q: 'Does it work on phones?', a: 'Yes. The layout is one column, the drop area opens the file picker and the pills and cards are large touch targets.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Quote Request Form: calculate an instant price range from the chosen options, validate file size in the browser or send the form to your own API.',
      prompt: `Build a quote request form section in plain HTML and CSS with a short "what happens next" list on the left and a card on the right.

- Pill buttons: a group of checkboxes (name="services[]") styled as chips that fill with the brand colour when checked.
- Budget: radio inputs styled as option cards with a title and a short note.
- A timeline select, a required description textarea and a file drop area (a dashed label around input type=file) that shows the file name and highlights while dragging.
- Name, email, optional phone and a consent checkbox. Use fieldset and legend for the groups.
- Post as multipart/form-data with fetch, show success and error messages, include a hidden honeypot field.`,
    },
  },

  'form-feedback-survey': {
    keywords: ['feedback form html', 'star rating form css', 'nps survey form html', 'customer satisfaction survey form', 'rating and comment form'],
    about: {
      title: 'Feedback Survey Form — Free Star Rating & NPS Scale Section',
      description: `**Feedback Survey Form** asks the questions that matter in under a minute: a five-star rating, a 0 to 10 “how likely are you to recommend us” scale (the net promoter score), topic pills for what went well, a comment box with a counter and an optional email for a reply. The stars and the scale are ordinary radio buttons styled with CSS, so the whole form works with a keyboard, a screen reader and no JavaScript.

**Stars with CSS only**

Hovering or choosing the fourth star fills the first four. That is done with the \`:has()\` selector, which lets a star know whether a later star is checked. Each star has a hidden text label (“4 stars”) for assistive technology, arrow keys move between stars as in any radio group and a visible focus ring appears on the keyboard-focused star.

**Net promoter score**

The 0 to 10 scale follows the standard NPS question. You can edit the question and the two end labels or remove the question entirely. Responses are posted as a number, so your spreadsheet can count promoters (9 to 10), passives (7 to 8) and detractors (0 to 6). ${COMMON_HOW}

**Better answers**

Topic pills turn “what went well?” into one-tap answers, and a counter on the comment box encourages a short, useful sentence. An opt-in to quote the feedback lets you ask permission once. Try the [Reviews Summary](/website-section-templates/reviews-summary/) to show the results after you have collected them.`,
    },
    features: [
      'Five-star rating made with radio buttons and CSS',
      '0 to 10 recommendation scale with editable end labels',
      'Topic pill buttons (multi select) from a list',
      'Comment box with a live character counter',
      'Optional email for a reply and an opt-in to quote the feedback',
      'Keyboard and screen-reader friendly, with visible focus',
      'Posts to Formspree, Basin, Getform or your own endpoint with success and error messages',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '⭐', title: 'Quick to answer', desc: 'Stars, a scale and pills take seconds, which raises the response rate.' },
      { icon: '📊', title: 'Numbers you can use', desc: 'Star and NPS answers arrive as numbers that are easy to average and chart.' },
      { icon: '♿', title: 'Accessible controls', desc: 'Real radio buttons keep keyboard and screen-reader support, even for the stars.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Post-purchase feedback', desc: 'Link the form from the order confirmation email and ask how delivery and the product were, with pills for what went well.' },
      { icon: '🎤', title: 'Events and workshops', desc: 'Send attendees a short survey after the event with a star rating, an NPS question and space for one improvement idea.' },
      { icon: '🧑‍💻', title: 'Product and website feedback', desc: 'Add a feedback page to a SaaS product or documentation site so users can rate the experience and say what to fix.' },
      { icon: '🏥', title: 'Clinics and service providers', desc: 'Collect satisfaction scores after appointments and ask permission before using a comment as a testimonial, so your reviews page grows with consent from real patients and clients.' },
    ],
    faqs: [
      { q: 'How is the star rating made without JavaScript?', a: 'It is five radio buttons with the same name. CSS fills a star when it, or any star after it, is checked, using the :has() selector. The submitted value is the number 1 to 5.' },
      { q: 'What is the 0 to 10 scale for?', a: 'It is the net promoter score question. Answers 9 and 10 are promoters, 7 and 8 passives and 0 to 6 detractors. Empty the question text to remove the scale.' },
      { q: 'Does :has() work in all browsers?', a: 'It works in current Chrome, Edge, Safari and Firefox. In an older browser the chosen star is still submitted and the checked star is highlighted, but lower stars may not fill.' },
      { q: 'Can I collect feedback without asking for an email?', a: 'Yes. The email is optional, and you can empty its label to remove the field completely.' },
      { q: 'How do I see the responses?', a: 'They arrive through your form service (Formspree, Basin, Getform or your own server) as rating, recommend, topics, comment, email and quote fields.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Feedback Survey Form: show a thank-you with a Google review link for 5-star ratings, calculate your NPS, or ask a follow-up question when the score is low.',
      prompt: `Build a customer feedback form in plain HTML, CSS and JavaScript.

- A five-star rating using radio inputs (name="rating", values 1 to 5) with SVG stars, filled with CSS using :has() so that choosing star 4 fills stars 1 to 4; hover previews the fill.
- A 0 to 10 scale of radio buttons styled as squares with "Not likely" and "Very likely" labels.
- Pill buttons (checkboxes) for what went well, a comment textarea with a character counter (500 max), an optional email and an opt-in checkbox.
- fieldset and legend for each group, visible focus rings, a hidden text label for every star.
- Post with fetch to an action URL, show success and error messages.`,
    },
  },

  'form-job-application': {
    keywords: ['job application form html', 'careers page application form', 'resume upload form html', 'html form with file upload and cover letter', 'apply now form template'],
    about: {
      title: 'Job Application Form — Free HTML Careers Form With Resume Upload',
      description: `**Job Application Form** is a careers section for one open role. On the left it shows the job title, a short summary and the key facts (location, type, salary, start date) as a tidy list; on the right is the application itself: name, email, phone, a portfolio or LinkedIn link, a resume drop area, a cover letter box with a counter, a “how did you hear about us” menu and a consent checkbox.

**Make it easy to apply**

The resume area opens the file picker when clicked, accepts a dragged file, shows its name and is limited to PDF and Word files. Fields that candidates tend to skip are optional, and the cover letter counter keeps answers focused. Role facts are a list, so you can add visa support, team size or benefits.

**Data handling**

The consent text tells applicants why you store their data. Empty it if your privacy notice covers this elsewhere. ${COMMON_HOW} The form is posted as multipart form data so the resume arrives with the answers on services that accept files.

**One role or many**

Use one copy per role, or pair it with the [Team Hiring](/website-section-templates/team-hiring/) section that lists open positions and links to each application. Export it as HTML, a ZIP, React or Vue, or fork it into [My Code](/ui-snippets/mycode/).`,
    },
    features: [
      'Role details beside the form: title, summary and a list of key facts',
      'Name, email, optional phone and portfolio or LinkedIn link',
      'Resume drop area limited to PDF and Word, showing the chosen file name',
      'Cover letter with a live character counter (1,200 maximum)',
      'Source menu and consent checkbox, both optional',
      'Multipart posting so the resume is sent with the answers',
      'Success and error messages with a hidden spam-trap field',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '📄', title: 'Resume in one step', desc: 'A clear drop area makes attaching a CV as simple as dragging it in.' },
      { icon: '🧾', title: 'Role facts up front', desc: 'Location, type and pay are shown beside the form, so fewer unsuitable applications arrive.' },
      { icon: '🔒', title: 'Consent included', desc: 'A consent line explains data use at the point of applying.' },
    ],
    useCases: [
      { icon: '💼', title: 'Company careers pages', desc: 'Give each open role its own page with the facts on the left and a short application on the right, sent straight to your hiring inbox.' },
      { icon: '🎓', title: 'Internships and graduate roles', desc: 'Ask for a CV and a short motivation and let students say where they found the post so you can measure your channels.' },
      { icon: '🤝', title: 'Volunteer and community roles', desc: 'Keep the form light, drop the salary line and add availability to the facts list for a friendly application.' },
      { icon: '🧑‍🎨', title: 'Freelance and contractor calls', desc: 'Use the portfolio link and cover letter to see work first, with a clear note on rate and timeline in the facts.' },
    ],
    faqs: [
      { q: 'Does the Job Application Form really accept resumes?', a: 'Yes. It has a file input that accepts PDF and Word files and posts as multipart form data. The receiving service (Formspree, Basin, Getform or your server) must accept file uploads; some plans need to be enabled for that.' },
      { q: 'Can I make the resume optional?', a: 'Export the HTML or fork to My Code and remove the required attribute on the file input. Candidates can then apply with a link only.' },
      { q: 'How do I add more role facts?', a: 'Edit the Role facts list in the editor. Each item has a label and a value, for example Team size and 12 people.' },
      { q: 'Is it GDPR friendly?', a: 'It includes a consent line and an optional note about response time. You are responsible for the privacy notice and for how the received data is stored and deleted.' },
      { q: 'Can I use it for several roles?', a: 'Yes. Use one copy per role page and change the heading and facts. You can send the role name to your endpoint by adding a hidden field in the exported HTML.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Job Application Form: add a hidden role field, validate file size in the browser, show an upload progress bar or send applications to your applicant tracking system.',
      prompt: `Build a job application section in plain HTML and CSS.

- Left column: eyebrow, a job title heading, a summary and a definition list of role facts (location, type, salary, start date).
- Right card with a form: name and email, optional phone and portfolio URL, a resume drop area (a dashed label around input type=file accepting .pdf,.doc,.docx, showing the file name and highlighting on drag over), a cover letter textarea with a counter (1200 max), a "how did you hear about us" select and a consent checkbox.
- Post as multipart/form-data with fetch, show success and error messages, include a honeypot field. Stack the columns below 860 px.`,
    },
  },

  'form-event-rsvp': {
    keywords: ['event registration form html', 'rsvp form template', 'event signup form with tickets', 'guest counter form', 'workshop registration section'],
    about: {
      title: 'Event RSVP Form — Free Registration Form With Guest Counter & Tickets',
      description: `**Event RSVP Form** pairs the facts of an event with the registration itself. On the left are a photo and a tidy list of date, time, place and price; on the right a form takes the name and email, a guest counter with plus and minus buttons, ticket cards, dietary needs as pill buttons and a message. It suits conferences, workshops, weddings and parties.

**A counter that is easy to use**

The guest stepper is a number field between two large buttons (one to ten), so it works with a thumb on a phone, and the number stays editable with the keyboard. Choosing a ticket uses stacked option cards with a title and a short description (“$45 · all talks and lunch”). Dietary needs are pills you can tap more than once.

**Edit the details**

Change the photo, the event facts and the three lists (tickets and dietary options) in the editor. Empty the guests label, the ticket heading, the dietary heading or the message label to remove those fields for a simpler RSVP. ${COMMON_HOW} The form sends the name, email, guests, ticket, dietary needs and message.

**Related sections**

Show who is speaking with the [Team Grid](/website-section-templates/team-grid/), answer common questions in a [FAQ section](/website-section-templates/faq-accordion/) and add a [countdown](/website-section-templates/countdown-banner/) if you have one. Export the form as HTML, a ZIP, React or Vue.`,
    },
    features: [
      'Event photo and a list of facts (date, time, place, price)',
      'Name and email, with correct autocomplete values',
      'Guest counter with plus and minus buttons and a limit of ten',
      'Ticket option cards with titles and short descriptions, from a list',
      'Dietary needs as multi-select pill buttons',
      'Optional message and consent checkbox',
      'Success and error messages, hidden spam-trap field',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🎟', title: 'Facts and sign-up together', desc: 'People see the date, place and price while they register.' },
      { icon: '➕', title: 'Quick guest count', desc: 'Plus and minus buttons beat typing a number on a phone.' },
      { icon: '🥗', title: 'Needs collected up front', desc: 'Dietary pills save follow-up emails before the event.' },
    ],
    useCases: [
      { icon: '🎤', title: 'Conferences and meetups', desc: 'Offer standard, workshop and student tickets, collect dietary needs for lunch and send a confirmation with the details.' },
      { icon: '💍', title: 'Weddings and parties', desc: 'Ask guests to confirm attendance, how many people are coming and any food needs, with a friendly note and a warm theme.' },
      { icon: '🏫', title: 'Workshops and open days', desc: 'Show the time and place beside the form and let families choose how many seats they need, so one booking covers parents and children and you can plan the room.' },
      { icon: '🛍', title: 'Product launches', desc: 'Invite customers to a launch evening with a free ticket and a plus-one counter, and use the dietary pills to plan the food and drinks before the doors open.' },
    ],
    faqs: [
      { q: 'How does the guest counter work?', a: 'It is a number input between two buttons. The buttons change the value by one, never below the minimum or above the maximum (ten), and typing a number also works.' },
      { q: 'Does the form take payment for the tickets?', a: 'No. It collects the choice and posts it to your endpoint. Add a payment link in your confirmation email or connect your own checkout.' },
      { q: 'Can I remove the dietary needs or the guest counter?', a: 'Yes. Empty the label or heading for that part in the editor and it is left out of the exported form.' },
      { q: 'How do I show a different event photo?', a: 'Upload an image in the Photo group, or paste an image link. Add alt text that describes the picture.' },
      { q: 'Can I limit the number of seats?', a: 'Seat limits are enforced by your system. You can lower the counter maximum in the exported HTML, and close the form when the event is full.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Event RSVP Form: show remaining seats from an API, send an iCalendar file in the confirmation or add a waitlist when tickets sell out.',
      prompt: `Build an event registration section in plain HTML and CSS.

- Left: heading, a photo and a definition list of event facts (date, time, place, price).
- Right card: name and email, a guest stepper (number input between minus and plus buttons, 1 to 10, buttons change the value), ticket options as radio inputs styled as stacked cards (title + description), dietary needs as checkbox pills, an optional message and a consent checkbox.
- fieldset and legend for the groups, visible focus rings, large touch targets.
- Post with fetch to an action URL, show success and error messages and use a honeypot field.`,
    },
  },

  'form-support-ticket': {
    keywords: ['support ticket form html', 'help desk request form', 'conditional form fields html', 'bug report form template', 'contact support form with attachment'],
    about: {
      title: 'Support Ticket Form — Free Help Desk Form With Conditional Fields',
      description: `**Support Ticket Form** gathers what a support team needs to answer in one reply. The visitor gives an email, chooses a topic, sets a priority with a segmented control, writes a subject and a description (with a counter) and can drop in a screenshot. If the topic is “Order or billing”, an order number field appears; for other topics it stays hidden.

**Conditional fields**

Showing a field only when it is relevant keeps the form short. Here a small piece of script watches the topic menu: when its value matches, the order number field is shown and required; otherwise it is hidden and disabled, so it never blocks the form or sends an empty value. You can reuse the idea for any field by adding \`data-fk-when="name=value"\` to its wrapper.

**Priority without a dropdown**

The priority control is a row of radio buttons styled as a segmented switch (Low, Normal, Urgent). It is quicker than a menu and is fully keyboard accessible. Edit the topics and priorities in the editor and the form updates.

**Attach and send**

The attachment area accepts PNG, JPG and PDF files and shows the chosen name. ${COMMON_HOW} You receive email, topic, order number, priority, subject, description and the attachment. For a lighter contact form see the [Centered Contact Form](/website-section-templates/form-contact-centered/); to answer common questions before people write, add an [FAQ](/website-section-templates/faq-accordion/) section above this form.`,
    },
    features: [
      'Topic menu from an editable list',
      'Order number field that appears only for the “Order or billing” topic',
      'Segmented priority control (radio buttons) from a list',
      'Subject and description with a live character counter',
      'Screenshot or file attachment drop area with the file name shown',
      'Hidden and disabled fields never block sending',
      'Posts as multipart form data with success and error messages',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🎫', title: 'Complete tickets', desc: 'Topic, priority and a description arrive together, so agents can start helping at once.' },
      { icon: '🙈', title: 'Only relevant fields', desc: 'The order number shows only when it is needed, keeping the form short.' },
      { icon: '📷', title: 'Screenshots attached', desc: 'A drop area makes it easy to show the problem instead of describing it.' },
    ],
    useCases: [
      { icon: '🛒', title: 'Online shops', desc: 'Add a help page where customers choose order or billing, enter an order number and attach a photo of a damaged item.' },
      { icon: '💻', title: 'Software and SaaS help centres', desc: 'Let users report a technical problem with priority and a screenshot, so your team can reproduce it faster.' },
      { icon: '🏦', title: 'Service providers', desc: 'Route account, billing and general requests by topic and let people mark urgent ones, so the team can read the most pressing tickets first and answer them within the hour.' },
      { icon: '🧑‍🎓', title: 'Schools and communities', desc: 'Give students and members one place to ask for help with a topic, a short description and an optional file.' },
    ],
    faqs: [
      { q: 'How does the order number field appear only for some topics?', a: 'The wrapper has data-fk-when="topic=Order or billing". A small script compares the topic value on every change, shows the field when it matches and disables the inputs inside when it does not.' },
      { q: 'Can I show other fields conditionally?', a: 'Yes. In the exported HTML wrap any field in an element with data-fk-when="fieldname=value" and add the hidden attribute. It works with selects, radio buttons and checkboxes.' },
      { q: 'What is the priority control?', a: 'A set of radio buttons styled as a segmented switch. The chosen value is posted as priority. Edit the priorities list to change the options.' },
      { q: 'Does it create tickets in my help desk?', a: 'It posts to the endpoint you provide. Use Formspree or Basin to email the request, or send it to your own API, which can create the ticket in your help desk.' },
      { q: 'Is the form accessible?', a: 'Yes. Every control has a label or legend, errors are announced, focus rings are visible and hidden conditional fields are removed from the tab order.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Support Ticket Form: add a reference number on success, suggest help articles while the visitor types the subject, or post to your help desk API.',
      prompt: `Build a support request form in plain HTML, CSS and JavaScript.

- Fields: email, a topic select, an order number input that is shown and enabled only when the topic is "Order or billing" (use data-fk-when="topic=Order or billing", hidden by default, disabled when hidden), a priority group of radio buttons styled as a segmented control (Low, Normal, Urgent), a subject, a description textarea with a counter (1000 max) and a screenshot drop area (accept png, jpg, pdf) that shows the file name.
- Post as multipart/form-data with fetch, show success and error messages, include a honeypot field.
- Use fieldset and legend, visible focus, and stack fields on small screens.`,
    },
  },

  'form-donation': {
    keywords: ['donation form html', 'donate form template', 'nonprofit donation section', 'one time or monthly donation form', 'donation amount buttons'],
    about: {
      title: 'Donation Form — Free HTML Donate Section With Amount Buttons',
      description: `**Donation Form** is a fundraising section for charities, churches, community groups and creators. A switch chooses one-time or monthly, a row of amount buttons each says what that gift does, a custom amount field covers everything else, and a few details (name, email, an optional dedication) finish the job. A “cover the fees” checkbox is optional.

**Impact notes beat bare numbers**

Each amount button carries a short note: “$25 · school supplies for a child”. People give more, and more confidently, when they can see what a gift does. Edit the amounts and notes in a list. Choosing a button clears the custom amount and typing a custom amount clears the buttons, so there is never a conflicting answer.

**Important: it does not take payments**

This section collects the donor's choices and posts them to Formspree, Basin, Getform or your own server. It does not charge a card. Connect it to your payment provider by sending the visitor to a hosted checkout or payment link after submitting, or by following up with an invoice or direct-debit mandate. ${COMMON_HOW}

**Design**

A photo on the left (optional) gives the appeal a human face; the green theme and rounded cards are editable. Pair it with the [Stats Counters](/website-section-templates/stats-counters/) to show impact and the [Testimonials](/website-section-templates/testimonials-grid/) section for stories from people you have helped.`,
    },
    features: [
      'One-time or monthly switch (a segmented radio control)',
      'Amount buttons with a short impact note each, from an editable list',
      'Custom amount field that clears and is cleared by the buttons',
      'Donor name, email and an optional dedication or message',
      'Optional “cover the processing fees” checkbox',
      'Photo beside the form (optional)',
      'Success and error messages; hidden spam-trap field',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '💚', title: 'Show the impact', desc: 'Notes on each amount connect a gift to a result.' },
      { icon: '🔁', title: 'Monthly giving', desc: 'A one-click switch makes recurring support easy to choose.' },
      { icon: '🧭', title: 'No confusing choices', desc: 'Picking a button and typing a custom amount never conflict.' },
    ],
    useCases: [
      { icon: '🏘', title: 'Charities and community projects', desc: 'Show what $10, $25 and $50 achieve, add a photo of the people you help and collect gift details with a clear thank-you.' },
      { icon: '⛪', title: 'Churches and faith groups', desc: 'Offer weekly or monthly giving with a note on how funds are used, and a dedication box for memorial gifts.' },
      { icon: '🎬', title: 'Creators and open-source projects', desc: 'Ask supporters for a one-time tip or monthly sponsorship, then link to your payment page after they submit.' },
      { icon: '🏫', title: 'School and club fundraisers', desc: 'Run a campaign page with suggested amounts, a clear goal and a personal message from the organisers, so parents and supporters can give in a few taps from a phone.' },
    ],
    faqs: [
      { q: 'Does the Donation Form process credit cards?', a: 'No. It collects the donor’s choices and posts them to your form endpoint. To take payment, redirect to a hosted checkout or payment link, or follow up with an invoice or direct-debit request.' },
      { q: 'How do the amount buttons and custom amount interact?', a: 'Choosing a button clears the custom field, and typing a custom amount unchecks every button, so exactly one amount is sent.' },
      { q: 'What is the monthly switch for?', a: 'It posts frequency=once or frequency=monthly. Your system can use it to set up a recurring donation.' },
      { q: 'Can I change the currency?', a: 'Yes. The amounts are plain text in the list (for example €25 or £25), and the custom field placeholder is editable.' },
      { q: 'Can I add a donation goal or progress bar?', a: 'Add a [Stats Counters](/website-section-templates/stats-counters/) section above the form, or fork this one into My Code and add your own progress element.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Donation Form: send the visitor to your payment provider with the chosen amount, show a progress bar towards a goal or add Gift Aid or tax-receipt fields.',
      prompt: `Build a donation section in plain HTML, CSS and JavaScript.

- A segmented control (two radio inputs, name="frequency", values once and monthly).
- Amount options as radio inputs styled as cards (name="amount") with a title like "$25" and a one-line impact note, plus a number input for a custom amount; choosing a card clears the custom field and typing in the custom field unchecks the cards.
- Name, email, an optional dedication textarea and a "cover the processing fees" checkbox.
- A large primary Donate button, a note about security and cancellation, and success and error messages.
- The form posts with fetch to an action URL (it does not process payments) and includes a honeypot field.`,
    },
  },

  'form-waitlist-inline': {
    keywords: ['waitlist form html', 'early access signup form', 'inline email signup form', 'email capture form with role select', 'coming soon signup form'],
    about: {
      title: 'Waitlist Form — Free Inline Email Sign-Up With Social Proof',
      description: `**Waitlist Form** is the shortest path from interest to sign-up. A single rounded bar holds an email field, an optional “I am a…” menu and the join button, with a consent line below and a row of avatars saying how many people are already on the list. It suits product launches, beta programmes and newsletters.

**One row, one decision**

The fewer the fields, the more people finish. Email is the only required field. The role menu is optional and helps you segment the list later (designer, developer, founder). On narrow screens the bar stacks into three full-width rows so nothing is cramped and every target is large enough to tap.

**Proof beside the button**

“Join 4,200+ people already on the list” with three small avatars gives a reason to trust the page. Swap the avatars for your own and edit the text, or empty it to remove the row. The consent checkbox lets you keep a clean opt-in record for email marketing laws.

**Sending**

${COMMON_HOW} Fields sent: email, role and consent. A waitlist works well after a [Hero](/website-section-templates/centered-gradient-hero/) section and before a [FAQ](/website-section-templates/faq-accordion/); for a full-width banner version see the [Newsletter CTA](/website-section-templates/cta-newsletter/).`,
    },
    features: [
      'One-row pill form: email, optional role menu and a join button',
      'Role menu from an editable list, removable',
      'Consent checkbox and a note line, both optional',
      'Avatars and a sign-up count as social proof, editable',
      'Fields stack into full-width rows on narrow screens',
      'Email placeholder and screen-reader labels editable',
      'Success and error messages; hidden spam-trap field',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '⚡', title: 'Maximum conversion', desc: 'One required field and one button make joining take seconds.' },
      { icon: '🧑‍🤝‍🧑', title: 'Trust built in', desc: 'Avatars and a count show that others have already signed up.' },
      { icon: '📱', title: 'Thumb friendly', desc: 'The bar becomes three large stacked fields on phones.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Product and app launches', desc: 'Collect emails before launch day and use the role menu to decide which invitations to send first, so the earliest users are the people you most want feedback from.' },
      { icon: '🧪', title: 'Beta and early-access programmes', desc: 'Let testers sign up with their role so you can balance feedback from designers, developers and founders, and invite each group in small waves instead of all at once.' },
      { icon: '📰', title: 'Newsletters and communities', desc: 'Invite readers to join with a single field and a consent line that records permission, which keeps your list clean and your newsletter compliant with email marketing rules.' },
      { icon: '🛍', title: 'Pre-orders and drops', desc: 'Capture interest for a limited release or product drop and email everyone on the list the moment stock opens, so your most eager customers get the first chance to buy.' },
    ],
    faqs: [
      { q: 'How do I connect the Waitlist Form to my email service?', a: 'Many email tools (Mailchimp, ConvertKit, MailerLite) give a form action URL; paste it in the Form URL field. Or use Formspree or Basin and connect the submissions to your list with an automation.' },
      { q: 'Can I remove the role menu?', a: 'Yes. Empty the role label in the editor and the menu is left out, leaving an email-only bar.' },
      { q: 'Is the consent checkbox required?', a: 'It is marked required when its text is present. Empty the text to remove the checkbox if you collect consent elsewhere.' },
      { q: 'How do I change the avatars and count?', a: 'Upload three small photos in the Social proof group and edit the line of text, or empty it to remove the whole row.' },
      { q: 'How does it look on a phone?', a: 'Below 640 pixels the pill bar turns into three stacked, full-width fields: email, role and the join button.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Waitlist Form: show the live position on the list, send the role to Mailchimp tags or add a referral link after sign-up.',
      prompt: `Build a waitlist sign-up section in plain HTML and CSS.

- A centered heading and text, then a single rounded bar (a flex row inside a pill with a soft shadow) containing an email input, a role select separated by a thin divider and a primary Join button.
- Below it a consent checkbox and, below that, a row of three overlapping avatar images with a line such as "Join 4,200+ people already on the list".
- Visually hidden labels for the fields; focus rings on each part.
- Below 640 px the bar stacks into three full-width rows.
- The form posts with fetch to an action URL, shows success and error messages and includes a honeypot field.`,
    },
  },

  'form-otp-verify': {
    keywords: ['otp input html css javascript', 'verification code input', '6 digit code input boxes', 'two factor code form', 'check your email code screen'],
    about: {
      title: 'Verification Code Form — Free 6-Digit OTP Input With Resend Timer',
      description: `**Verification Code Form** is the “check your email” screen: six digit boxes that move forward as you type, go back on Backspace and accept a pasted code, a Verify button and a Resend link with a countdown. It is the front end for email confirmation, two-factor sign-in, password reset or checkout verification.

**Boxes that behave**

Typing a digit moves focus to the next box. Backspace on an empty box moves back and clears the previous one. The arrow keys move left and right, a pasted code such as “482 917” is cleaned and spread across the boxes, and the first box has \`autocomplete="one-time-code"\`, so a phone can fill the code that arrives by SMS or email with one tap. The boxes use numeric keyboards on phones.

**One value for your server**

All six digits are also written into one hidden field named \`code\`, so your endpoint receives a single value. When all six are filled the group is marked complete. Show an error message when the code is wrong by replying with an error status to the form post.

**Resend with a countdown**

The Resend button is disabled for thirty seconds and shows the time left, then becomes active. Pressing it clears the boxes, focuses the first one and fires a \`st:resend\` event on the form, which you can listen for to ask your server to send a new code.

**Front end only**

This section does not generate or send codes. Your server does that and checks the answer. Pair it with the [Login](/website-section-templates/auth-login/) or [Register](/website-section-templates/auth-register/) section.`,
    },
    features: [
      'Six digit boxes with auto-advance, Backspace and arrow-key support',
      'Pasting a whole code spreads it over the boxes',
      'autocomplete one-time-code and a numeric keyboard for one-tap SMS and email codes',
      'All digits combined in one hidden field named code',
      'Resend button with a thirty-second countdown and a resend event',
      'Verify button, error message and success message',
      'Icon, heading and help text editable',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🔢', title: 'Feels native', desc: 'Auto-advance, paste and one-tap autofill match what people expect from banking and sign-in screens.' },
      { icon: '🧩', title: 'One clean value', desc: 'Your server receives a single code field to check.' },
      { icon: '⏳', title: 'Resend built in', desc: 'A countdown prevents repeated requests and tells users when to try again.' },
    ],
    useCases: [
      { icon: '📧', title: 'Email confirmation', desc: 'Ask new users to enter the six-digit code you emailed, then continue to their account once your server confirms it.' },
      { icon: '🔐', title: 'Two-factor sign-in', desc: 'Add a second step after the password where users enter a code from SMS or an authenticator app.' },
      { icon: '🔑', title: 'Password reset', desc: 'Verify the owner of an account with a code sent to their email or phone before letting them choose a new password, so a stranger cannot take over the account.' },
      { icon: '🛒', title: 'Checkout and bookings', desc: 'Confirm a phone number or email address with a quick code before completing a booking or a high-value order, which reduces fake sign-ups, mistyped details and chargebacks.' },
    ],
    faqs: [
      { q: 'Does the Verification Code Form send the codes?', a: 'No. It is the front end. Your server generates and sends the code, and checks the value posted in the code field.' },
      { q: 'How does one-tap autofill work?', a: 'The first box has autocomplete="one-time-code". On supported phones the keyboard offers the code from the latest SMS or email message and fills the boxes.' },
      { q: 'Can I change the number of digits?', a: 'Yes. In the exported HTML add or remove input boxes that have the data-fk-digit attribute. The script and hidden field adjust automatically.' },
      { q: 'How do I react to the Resend button?', a: 'Listen for the st:resend event on the form: form.addEventListener("st:resend", () => fetch("/send-code")). The button is disabled for 30 seconds each time.' },
      { q: 'Is it accessible?', a: 'Each box has an aria-label (Digit 1 to 6), the group has a label, focus rings are visible and the error message is announced.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Verification Code Form: submit automatically when the sixth digit is entered, shake the boxes on an error, or connect it to your own verification API.',
      prompt: `Build a verification code section in plain HTML, CSS and JavaScript.

- A card with an icon, a heading, a short text, six single-digit inputs (inputmode numeric, maxlength 1, aria-label "Digit n", autocomplete one-time-code on the first), a hidden input name="code", a Verify button and a "Resend code" button with a 30 second countdown.
- Typing a digit moves to the next box; Backspace on an empty box goes back and clears the previous; arrow keys move; pasting a code fills all boxes (only digits).
- Join the digits into the hidden field and add a class when complete.
- Resend clears the boxes, focuses the first, dispatches a custom event on the form and restarts the countdown.
- Post with fetch, show success and error messages.`,
    },
  },

  'form-settings-kit': {
    keywords: ['profile settings form html', 'preferences form template', 'toggle switch css form', 'html range slider with value', 'form controls style guide'],
    about: {
      title: 'Profile & Preferences Form — Free Settings Page With Every Control',
      description: `**Profile & Preferences Form** shows every common form control in one consistent style, and works as a real settings page. It has an avatar drop area, text and email fields, a select menu, a date picker, a bio box with a counter, theme option cards, three toggle switches with descriptions and a range slider that shows its value.

**Controls that match**

All controls share the same radius, border, focus ring and colours, which come from your theme. The switches are real checkboxes with \`role="switch"\`, so assistive technology announces them as on or off. The option cards are radio buttons, the range slider uses the browser's native control tinted with your brand colour, and the date picker is the native one, which is best on phones.

**Use it three ways**

As a profile page in an account area; as a preferences step in an onboarding flow; or as a reference when you need to style your own forms the same way, since you can copy any control from the exported HTML. For shorter flows use the [Multi-Step Form](/website-section-templates/form-multi-step/).

**Sending**

${COMMON_HOW} Fields sent: avatar, name, email, role, birthday, bio, theme, the notification switches and the text size.`,
    },
    features: [
      'Avatar drop area for images, showing the file name',
      'Name, email, role select, native date picker and a bio with a character counter',
      'Theme option cards (radio buttons) from a list',
      'Three toggle switches with titles and descriptions (role="switch")',
      'Range slider with a live value readout',
      'One consistent set of styles: radius, borders, focus rings and error states',
      'Success and error messages; hidden spam-trap field',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🎛', title: 'Every control, one style', desc: 'Inputs, selects, switches, cards and a slider that look like one family.' },
      { icon: '♿', title: 'Real HTML controls', desc: 'Native inputs keep keyboard and screen-reader behaviour.' },
      { icon: '📋', title: 'Copy what you need', desc: 'Lift any control from the exported code into your own forms.' },
    ],
    useCases: [
      { icon: '👤', title: 'Account and profile pages', desc: 'Let users change their photo, name and bio and choose which notifications they receive, all in one tidy card, with a single Save button and a clear confirmation afterwards.' },
      { icon: '🧭', title: 'Onboarding preferences', desc: 'Ask new users how they want the product to look and what to be notified about on the second or third step.' },
      { icon: '🔔', title: 'Notification centres', desc: 'List the kinds of email you send as switches with a short description each, so people turn off what they do not need.' },
      { icon: '🎨', title: 'Design-system reference', desc: 'Use it to compare spacing, focus states and colours across every control in one place, and keep a product consistent when several people build different screens.' },
    ],
    faqs: [
      { q: 'Are the toggle switches accessible?', a: 'Yes. They are checkboxes with role="switch", so screen readers announce on and off, and they have visible focus rings and large targets.' },
      { q: 'How is the range value shown?', a: 'A small script writes the slider value into the output element next to it, with an optional prefix or suffix set by data-prefix and data-suffix.' },
      { q: 'Can I change the options in the appearance cards?', a: 'Yes, edit the Appearance options list. Each option has a name and a short description.' },
      { q: 'Does it save the settings for me?', a: 'It posts them to your form endpoint. To save them in an account, send the post to your own API and update the user’s record.' },
      { q: 'Can I add more controls?', a: 'Yes. Export the HTML or fork to My Code and copy any block, such as another switch or a select. They all use the same CSS classes.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Profile and Preferences Form: load saved values from an API, show a preview of the chosen text size, or enable the Save button only when something has changed.',
      prompt: `Build a profile and preferences form in plain HTML, CSS and JavaScript.

- Controls in one consistent style (same radius, border, focus ring): an avatar file drop area showing the file name, name and email inputs, a role select, a native date input, a bio textarea with a character counter (240 max).
- Appearance: radio inputs styled as option cards (Light, Dark, System).
- Notifications: three toggle switches built from checkboxes with role="switch" and a title plus description each.
- A range slider (80 to 140, step 5) with an output showing the value and a % suffix.
- A Save button, success and error messages, fetch posting to an action URL and a honeypot field.`,
    },
  },

  'form-split-image': {
    keywords: ['split screen sign up form', 'form with image html', 'signup form with photo background', 'lead form with image', 'registration form with side image'],
    about: {
      title: 'Form With Image — Free Split-Screen Sign-Up Section',
      description: `**Form With Image** is a split-screen sign-up section: a full-height photo with an overlaid quote on one side and a floating-label form on the other. It feels warmer than a bare form, and the photo and testimonial do some of the persuading before the visitor reaches the first field.

**The photo does a job**

Choose a photo of the people, place or result you offer and add a short quote with an author. A soft gradient behind the quote keeps the text readable on any image. A setting puts the photo on the left or the right, and on small screens the photo becomes a short banner above the form so the fields stay within reach.

**A quick, friendly form**

The form uses floating labels for name and email, pill buttons for interests (so a course provider can tailor the first email) and a consent checkbox. Everything except the two fields can be removed by emptying its label. ${COMMON_HOW}

**Good for**

Course and workshop sign-ups, webinar registrations, free-trial pages and lead capture where a brand image matters. Pair it with [Testimonials](/website-section-templates/testimonials-grid/) lower on the page or the [Features](/website-section-templates/features-icon-grid/) section above, and see the [Floating Label Form](/website-section-templates/form-floating-labels/) for a version without a photo.`,
    },
    features: [
      'Full-height photo with an overlaid quote and author',
      'Photo on the left or the right, set in the editor',
      'Floating-label name and email fields',
      'Interest pills (multi select) from an editable list',
      'Consent checkbox and a note under the button',
      'Photo becomes a banner on small screens',
      'Success and error messages; hidden spam-trap field',
      'Theme colours and fonts; export HTML, ZIP, React or Vue',
    ],
    why: [
      { icon: '🖼', title: 'A human touch', desc: 'A real photo and a quote build trust before the first field.' },
      { icon: '🎯', title: 'Tailored sign-ups', desc: 'Interest pills tell you what each person wants to hear about.' },
      { icon: '📱', title: 'Works on phones', desc: 'The layout stacks and keeps the form within reach.' },
    ],
    useCases: [
      { icon: '🎓', title: 'Course and workshop sign-ups', desc: 'Show a student’s quote beside the form and ask which topics they care about so the welcome email fits.' },
      { icon: '🎥', title: 'Webinar registration', desc: 'Put the speaker’s photo and a one-line promise next to a short form with just a name and an email, so the page feels personal and visitors know who they will hear.' },
      { icon: '🆓', title: 'Free trial and demo pages', desc: 'Pair a product photo with a customer quote and a two-field form for a smooth trial start, so the proof and the call to action sit together above the fold.' },
      { icon: '🏡', title: 'Local services and real estate', desc: 'Use a photo of your work or a property and let visitors register interest with a name, email and what they are looking for.' },
    ],
    faqs: [
      { q: 'How do I change which side the photo is on?', a: 'In the Photo & quote group choose Left or Right for “Photo side”. The setting is stored in the HTML, so exports keep it.' },
      { q: 'What kind of photo works best?', a: 'A portrait or square photo about 1000 by 1300 pixels with some quiet space at the bottom for the quote. It is cropped to fill the side.' },
      { q: 'Can I remove the quote?', a: 'Yes. Empty the quote text and the overlay is removed, leaving a clean photo.' },
      { q: 'Are interests required?', a: 'No. The pills are optional, and you can remove them by emptying the interests heading.' },
      { q: 'How is this different from the Floating Label Form?', a: 'This one is a split screen with a full-height photo and a quote, built to feel like a landing page. The Floating Label Form has a promises list beside a form card.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to extend the Form With Image: rotate several quotes over the photo, show a video instead of an image or add social sign-in buttons above the fields.',
      prompt: `Build a split-screen sign-up section in plain HTML and CSS inside one rounded card.

- One half is a figure with a full-bleed image (object-fit: cover, min-height 520px) and a figcaption pinned to the bottom with a gradient behind a quote and its author. A data-side attribute puts the photo on the left or the right.
- The other half has an eyebrow, an h2, a text paragraph and a form with floating-label inputs for name and email (the label sits inside the field and glides up using :placeholder-shown), interest pills (checkboxes styled as chips), a consent checkbox and a primary button.
- Below 820 px the photo becomes a 260 px banner above the form.
- Post with fetch, show success and error messages, include a honeypot field.`,
    },
  },
};
