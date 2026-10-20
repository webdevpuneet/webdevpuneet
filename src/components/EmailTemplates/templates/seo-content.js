/* Hand-written SEO content per email template, keyed by id, plus the shared
   "how it's different" list. Use cases follow the library rules (4 x 18-42 words). */

export const EMAIL_SEO = {
  welcome: {
    keywords: ['welcome email template', 'html welcome email', 'saas onboarding email template', 'responsive email template', 'free html email template'],
    about: {
      title: 'Welcome Email — Free Responsive HTML Welcome Email Template',
      description: `**Welcome Email** is a free, responsive HTML welcome email template for SaaS products, apps, online stores and newsletters. It follows the structure that onboarding teams use: a logo header, a hero image, a warm headline, a short intro, one clear call-to-action button, three numbered getting-started steps, a personal note from the founder, social links and a compliant footer.

**Built the way email has to be built**

Email clients are not browsers. Outlook for Windows renders with Microsoft Word's engine, Gmail strips many styles, and every client handles images differently. This template uses nested tables for layout, inline styles on every element, \`role="presentation"\` on layout tables for screen readers, and a fixed 600 px container wrapped in Outlook-only conditional comments, so it holds its shape from Apple Mail to Outlook 2019.

**A button that works in Outlook**

The call to action is a "bulletproof" button: a VML rounded rectangle for Outlook on Windows and a styled link everywhere else, so it stays clickable with rounded corners even when images are blocked. On phones it stretches to the full width for an easy tap.

**Dark mode included**

The template declares \`color-scheme: light dark\` and ships a dark palette for Apple Mail, iOS Mail and Outlook (using \`prefers-color-scheme\` and Outlook.com's \`[data-ogsc]\` selector). You can edit both palettes and switch the preview to dark to check contrast.

**Inbox details handled**

A hidden preheader sets the preview text next to your subject line, padded so clients don't pull in body copy. Web fonts load where supported, with safe fallbacks, and Outlook is forced to Arial instead of Times New Roman. The footer has the unsubscribe link and postal address that US CAN-SPAM requires for commercial email, and a plain-text version is generated alongside the HTML.

Edit everything in the browser, then copy the HTML into Mailchimp, Klaviyo, HubSpot, Brevo or your own sending code, or fork it into [My Code](/ui-snippets/mycode/) to keep working on the markup. Need images for your social posts too? See [Social Post Templates](/social-post-templates/).`,
    },
    features: [
      'Responsive 600 px layout built with nested tables and inline styles',
      'Bulletproof call-to-action button: VML for Outlook, styled link elsewhere',
      'Dark mode palette for Apple Mail, iOS and Outlook.com, editable',
      'Hidden preheader with filler, so the inbox preview shows your text',
      'Three numbered getting-started steps and a personal note from the founder',
      'CAN-SPAM-ready footer: postal address, reason for the email, unsubscribe link',
      'Web fonts with safe fallbacks, and an Outlook Arial override',
      'Plain-text version generated automatically',
      'Show or hide the hero, steps, note and social sections',
      'Copy the HTML, download a .html file, or fork it to My Code',
    ],
    why: [
      { icon: '✉', title: 'Your most-opened email', desc: 'A welcome email is opened far more often than a typical marketing email, so it is the best moment to show new users their first step.' },
      { icon: '⚙', title: 'Works where it matters', desc: 'Tables, inline styles and Outlook-only fixes mean the layout and button hold up in Gmail, Apple Mail, Outlook and Yahoo, not just in a browser preview.' },
      { icon: '◐', title: 'Ready for dark mode', desc: 'Many people read email in dark mode. A built-in dark palette keeps your text readable instead of leaving it to each client to guess.' },
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS sign-up welcome', desc: 'Greet new users by name, link to their dashboard, and list the three actions that predict a user who stays, such as creating a project and inviting the team.' },
      { icon: '🛍', title: 'Online store welcome', desc: 'Welcome new customers or subscribers, use the button for a first-order discount, and turn the steps into "shop the bestsellers", "join rewards" and "follow us".' },
      { icon: '📰', title: 'Newsletter subscription confirmation', desc: 'Thank new subscribers, tell them what they will get and how often, and use the founder note to set a personal tone from the first email.' },
      { icon: '🎓', title: 'Course or community onboarding', desc: 'Point new members to the first lesson or the community space, with steps for completing their profile, joining a channel and attending the next live session.' },
    ],
    faqs: [
      { q: 'How do I use this welcome email template in Mailchimp, Klaviyo or HubSpot?', a: 'Edit the template, open the HTML tab and click "Copy", then in your email service create a campaign or automation with a "custom HTML" or "code your own" design and paste it in. Replace the unsubscribe link with your platform\'s merge tag (for example *|UNSUB|* in Mailchimp or {{ unsubscribe_link }} in Klaviyo) and use merge tags for the first name.' },
      { q: 'Will it work in Outlook?', a: 'Yes. The layout uses tables and inline styles, the 600 px container and the button have Outlook-only (MSO) versions, and Outlook is forced to Arial because it ignores web fonts. Rounded corners on the card don\'t appear in Outlook for Windows, which is expected and doesn\'t break the layout.' },
      { q: 'Why do my images need a URL?', a: 'Email images must be hosted online: most clients block or strip images embedded in the HTML. Upload your logo and hero image to your website, a CDN or your email service, then paste the https:// links into the template.' },
      { q: 'What should a welcome email include?', a: 'A warm thank-you, one clear next step (the button), a short list of what to do first, a way to get help or reply, and the legal footer. This template includes all of them, and you can hide sections you don\'t need.' },
      { q: 'Does it support dark mode?', a: 'Yes. Apple Mail, iOS Mail and Outlook.com use the dark palette you set. Gmail\'s apps apply their own automatic colour changes, which the template\'s colours are chosen to survive. Switch the preview to Dark to check your colours.' },
    ],
  },

  'verify-email': {
    keywords: ['email verification template', 'verify email template html', 'confirm email address template', 'otp email template', 'double opt-in email template', 'sign up confirmation email'],
    about: {
      title: 'Verify Email Address — Free HTML Email Verification Template',
      description: `**Verify Email Address** is a free, responsive HTML email verification template for sign-up flows, double opt-in lists and account security. It gives people two ways to confirm: a large "Verify email address" button, and an optional one-time code (like **482 913**) shown in a big monospace box they can type into your app.

**Why verification emails need their own design**

A verification email is the gate between a sign-up and an active user. If it is slow to understand, lands in spam or the button breaks in Outlook, the user never comes back. This template keeps one job in focus: an envelope badge, a clear headline, one sentence of context, the button, and an expiry note so people know to act now.

**Button or code, your choice**

Turn the one-time code section on for apps where people verify on another device, or for passwordless sign-in, and off when a link is all you need. The code uses a monospace font with letter spacing, so characters like 0 and O are easy to tell apart. A fallback link is printed under the button for anyone whose email client blocks buttons.

**Coded for real inboxes**

Like every template here it uses nested tables, inline styles and a "bulletproof" VML button that stays clickable with rounded corners in Outlook for Windows. A dark palette for Apple Mail, iOS Mail and Outlook.com is included, along with a hidden preheader and an automatically generated plain-text version, which helps transactional email get delivered.

**Transactional, so no unsubscribe link**

Verification emails are transactional: they are sent because of something the user just did, so US CAN-SPAM doesn't require an unsubscribe link. The footer still shows why the email was sent and your address, which helps people trust it.

Edit the text and colours in the browser, then send it from Postmark, SendGrid, Amazon SES, Resend, Auth0, Supabase or Firebase, or fork it into [My Code](/ui-snippets/mycode/). Building the rest of the flow? Pair it with the [Password Reset](/email-templates/password-reset/) and [Welcome](/email-templates/welcome/) emails.`,
    },
    features: [
      'Large, Outlook-safe "Verify email address" button (VML for Outlook on Windows)',
      'Optional one-time code in a big monospace box, toggled on or off',
      'Expiry note so people know how long the link or code works',
      'Fallback link printed under the button for clients that block buttons',
      '"Didn\'t sign up?" note that reassures people who got it by mistake',
      'Centred, single-purpose layout that reads well on phones',
      'Light and dark palettes, both editable, with a dark preview',
      'Hidden preheader and a plain-text version for better delivery',
      'Works with Postmark, SendGrid, SES, Resend, Auth0, Supabase and Firebase',
      'Copy the HTML, download a .html or ZIP file, or fork it to My Code',
    ],
    why: [
      { icon: '✓', title: 'Fewer abandoned sign-ups', desc: 'A clear, single-button email that loads fast gets more people through verification and into your product.' },
      { icon: '#', title: 'Link or code', desc: 'Support people who sign up on a laptop but check email on their phone, with a code they can type in instead.' },
      { icon: '⚙', title: 'Reliable in Outlook', desc: 'The VML button and table layout keep the call to action clickable where many HTML templates break.' },
    ],
    useCases: [
      { icon: '🔐', title: 'SaaS sign-up verification', desc: 'Confirm a new user\'s email before they can invite teammates or start a trial, using a tokenised link your backend generates and an expiry of 24 hours.' },
      { icon: '📲', title: 'One-time code for mobile apps', desc: 'Send a six-digit code that people type into your iOS or Android app, and hide the button when your app has no web verification page.' },
      { icon: '📨', title: 'Newsletter double opt-in', desc: 'Ask new subscribers to confirm before you add them to your list, which keeps bounce rates low and gives you proof of consent under GDPR.' },
      { icon: '✉', title: 'Email address change', desc: 'When someone changes the email on their account, send this to the new address so they prove they own it before the change takes effect.' },
    ],
    faqs: [
      { q: 'How do I add the verification link or code?', a: 'Your backend creates a unique token or code for each sign-up. Paste the link format into the "Verification link" field with a merge tag in place of the token, for example https://yourapp.com/verify?token={{token}}, and use a merge tag such as {{code}} for the code. Your email provider fills them in for every email.' },
      { q: 'Should I use a link, a code, or both?', a: 'Links are the fastest for most people. Codes help when people read email on a different device from the one they signed up on, and for apps without a web page. Showing both, as this template does by default, covers everyone.' },
      { q: 'Does a verification email need an unsubscribe link?', a: 'No. Verification emails are transactional, sent in direct response to something the user did, so US CAN-SPAM\'s unsubscribe rule doesn\'t apply. Keep marketing content out of it so it stays transactional.' },
      { q: 'How long should a verification link stay valid?', a: 'Common choices are 24 to 72 hours for sign-up links and 10 to 15 minutes for one-time codes. Whatever you choose, say it in the email, which is what the expiry note is for.' },
      { q: 'Can I use it with Supabase, Firebase or Auth0?', a: 'Yes. All three let you replace the default verification email with your own HTML. Copy the HTML from this editor and swap the link for the provider\'s variable, such as {{ .ConfirmationURL }} in Supabase.' },
    ],
  },

  'password-reset': {
    keywords: ['password reset email template', 'forgot password email template', 'reset password email html', 'transactional email template', 'account security email'],
    about: {
      title: 'Password Reset Email — Free HTML Forgot Password Template',
      description: `**Password Reset Email** is a free, responsive HTML "forgot password" email template for SaaS apps, online stores and any product with user accounts. It has everything a secure reset email should have: a lock badge, a clear headline, the account the request is for, an Outlook-safe **Reset password** button, a one-time-use expiry note, a fallback link, optional request details and a "didn't request this?" message.

**Designed to be trusted**

Password reset emails are a favourite target for phishing, so people are right to be suspicious of them. This template is built to look legitimate: it names the account, says exactly when the link expires, shows the device, location and time of the request, and gives a calm "you can ignore this" message plus a link to your security team. It contains no marketing, which also keeps it out of the Promotions tab.

**Request details, when you have them**

Turn on the request details box to show the browser, approximate location and time of the request. It helps people spot attempts they didn't make. Turn it off if your system doesn't collect that information.

**Works in every client**

The layout uses nested tables and inline styles, the button is a VML "bulletproof" button for Outlook on Windows, and the full reset link is printed as text under it so people can copy it if buttons are blocked. A dark palette for Apple Mail, iOS Mail and Outlook.com, a hidden preheader and a plain-text version are included.

**No unsubscribe link needed**

Reset emails are transactional: the user asked for them. US CAN-SPAM doesn't require an unsubscribe link, so the footer shows the reason for the email, your address and a help link instead.

Edit it in your browser, then paste the HTML into Postmark, SendGrid, Amazon SES, Resend, Auth0, Supabase, Firebase or Laravel and Rails mailers. Building the full account flow? See the [Verify Email](/email-templates/verify-email/) and [Welcome](/email-templates/welcome/) templates.`,
    },
    features: [
      'Lock badge, headline and the account email the reset is for',
      'Outlook-safe "Reset password" button with a VML version for Windows Outlook',
      'Expiry and one-time-use note so people act quickly',
      'Full reset link printed as copyable text under the button',
      'Optional request details: device, location and time',
      '"Didn\'t request this?" note and a link to your security or support team',
      'No marketing content, so it reads as a genuine security email',
      'Editable light and dark palettes, hidden preheader and plain-text version',
      'Works with Postmark, SendGrid, SES, Auth0, Supabase, Firebase and app mailers',
      'Copy the HTML, download a .html or ZIP file, or fork it to My Code',
    ],
    why: [
      { icon: '🔒', title: 'Looks legitimate', desc: 'Naming the account, the expiry and the request details helps people trust the email and spot reset attempts that weren\'t theirs.' },
      { icon: '⏱', title: 'Clear expiry', desc: 'Saying how long the link lasts cuts support tickets from people who click an expired link days later.' },
      { icon: '⚙', title: 'Never a dead button', desc: 'A VML button for Outlook plus a copyable fallback link means nobody gets stuck unable to reset.' },
    ],
    useCases: [
      { icon: '🔑', title: 'Forgot password in a web app', desc: 'Send it when someone clicks "Forgot password", with a tokenised link that expires in 60 minutes and the request details your auth service logs.' },
      { icon: '🛒', title: 'Store customer accounts', desc: 'Let shoppers reset the password for their order history and saved addresses, with your store brand colour on the button and a link to customer support.' },
      { icon: '🛡', title: 'Admin-forced password reset', desc: 'After a security incident or a policy change, ask users to choose a new password, and change the intro to explain why the reset is required.' },
      { icon: '🏢', title: 'Internal tools and portals', desc: 'Use it for employee portals, client dashboards or school systems where the IT team needs a clean, trustworthy reset email instead of a plain-text default.' },
    ],
    faqs: [
      { q: 'What should a password reset email include?', a: 'The account it applies to, one clear reset button, how long the link is valid, a copyable fallback link, a note that people can ignore it if they didn\'t ask for it, and a way to contact support. This template includes all of them, plus optional request details.' },
      { q: 'How do I put the reset token in the link?', a: 'Use your email provider\'s or framework\'s variable in the "Reset link" field, for example https://yourapp.com/reset?token={{token}}. The fallback link under the button uses the same value automatically.' },
      { q: 'How long should a password reset link last?', a: 'Short is safer. Many apps use 15 to 60 minutes, and the link should stop working after one use. Put the same time in the expiry note.' },
      { q: 'Does a password reset email need an unsubscribe link?', a: 'No. It\'s a transactional email the user asked for, so CAN-SPAM\'s unsubscribe requirement doesn\'t apply, and people shouldn\'t be able to opt out of security emails anyway.' },
      { q: 'Why show the device and location?', a: 'It helps people notice reset requests they didn\'t make, which is often the first sign of someone trying to break into an account. Turn the section off if you don\'t collect that data.' },
    ],
  },

  'order-confirmation': {
    keywords: ['order confirmation email template', 'ecommerce email template', 'order receipt email html', 'shopify order confirmation template', 'thank you for your order email'],
    about: {
      title: 'Order Confirmation Email — Free HTML Ecommerce Template',
      description: `**Order Confirmation Email** is a free, responsive HTML order confirmation template for online stores, Shopify and WooCommerce shops, marketplaces and DTC brands. It thanks the customer, shows the order number and date, lists up to three items with details, quantity and price, adds subtotal, discount, shipping, tax and total, shows the payment method, the shipping address and an estimated delivery window, and links to the order with an Outlook-safe button.

**The most-read email a store sends**

Customers open order confirmations almost every time, often more than once while they wait for a parcel. A clear confirmation cuts "where is my order?" emails and builds trust right after someone has paid. This template puts the information people look for first, the order number, what they bought and when it arrives, at the top.

**Line items that hold together**

Each item has a name, a details line (size, colour, variant), quantity and price, set in a two-column table that keeps prices aligned on the right in every client, including Outlook. Leave an item name empty to hide that row. The order number and date sit in a soft summary box, and the shipping and delivery columns stack on phones.

**Coded for real inboxes**

Nested tables, inline styles, a VML button for Outlook on Windows, a dark palette for Apple Mail, iOS and Outlook.com, a hidden preheader and a plain-text version are all built in. The total is set in bold so it is easy to find.

**Transactional, not marketing**

Order confirmations are transactional email, so an unsubscribe link isn't required. Keep promotions out of the main content so it stays that way, and use the closing note for your returns policy and a "just reply" support line.

Edit the sample data in the browser, then replace it with your platform's variables (Shopify Liquid, Klaviyo, WooCommerce or your own code). Next in the flow, send a [Payment Receipt](/email-templates/receipt/), or welcome first-time buyers with the [Welcome Email](/email-templates/welcome/).`,
    },
    features: [
      'Order number and date in a summary box at the top',
      'Up to three line items with details, quantity and right-aligned price',
      'Subtotal, discount, shipping, tax and a bold total',
      '"Paid with" line for the payment method',
      'Shipping address, shipping method and estimated delivery, stacking on phones',
      'Outlook-safe "View your order" button',
      'Closing note for returns policy and support',
      'Editable light and dark palettes, hidden preheader and plain-text version',
      'Easy to map to Shopify Liquid, WooCommerce, Klaviyo or your own code',
      'Copy the HTML, download a .html or ZIP file, or fork it to My Code',
    ],
    why: [
      { icon: '📦', title: 'Fewer "where\'s my order?" emails', desc: 'Showing the order number, items and delivery window up front answers the questions customers would otherwise email you.' },
      { icon: '🧾', title: 'Totals that line up', desc: 'Table-based line items keep prices aligned in Gmail, Apple Mail and Outlook, so the order looks as professional as your store.' },
      { icon: '◐', title: 'Your brand, not the platform\'s', desc: 'Replace the plain default confirmation from your store platform with one in your colours, fonts and tone.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Shopify or WooCommerce store', desc: 'Replace the default order confirmation with your own design, then swap the sample items and totals for your platform\'s order variables and loop over every line item.' },
      { icon: '🍽', title: 'Food and meal-kit orders', desc: 'Confirm what is in the box, show the delivery day instead of a shipping window, and use the closing note for allergy information and how to skip a week.' },
      { icon: '🎟', title: 'Event tickets and bookings', desc: 'List ticket types and quantities as items, use the shipping section for the venue and date, and link the button to the tickets in the customer\'s account.' },
      { icon: '💻', title: 'Digital products and downloads', desc: 'Hide the shipping section, list the files or licences purchased, and point the button to the download page so customers can get their product straight away.' },
    ],
    faqs: [
      { q: 'How do I show more than three items?', a: 'In your store platform or sending code, repeat the item row once per product. Fork the template to My Code or copy the HTML and wrap one item row in your platform\'s loop, for example {% for line in order.line_items %} in Shopify Liquid.' },
      { q: 'Can I use this template in Shopify?', a: 'Yes. In Shopify admin go to Settings > Notifications > Order confirmation, then replace the code with this HTML and swap the sample values for Liquid variables such as {{ order_name }}, {{ line.title }} and {{ total_price | money }}.' },
      { q: 'Is an order confirmation email transactional?', a: 'Yes. It\'s sent because the customer placed an order, so it doesn\'t need an unsubscribe link under US CAN-SPAM. Adding a small product recommendation is common, but the main purpose must stay the order.' },
      { q: 'What should an order confirmation include?', a: 'The order number and date, what was bought with prices, the total and payment method, where it is shipping, when it should arrive, how to see the order and how to get help. This template has every one.' },
      { q: 'Will product prices line up in Outlook?', a: 'Yes. Items and totals are table cells with right-aligned prices and no-wrap, which Outlook\'s Word-based renderer handles reliably.' },
    ],
  },

  receipt: {
    keywords: ['receipt email template', 'invoice email template html', 'payment confirmation email template', 'saas billing email template', 'subscription receipt email'],
    about: {
      title: 'Payment Receipt Email — Free HTML Receipt & Invoice Template',
      description: `**Payment Receipt Email** is a free, responsive HTML receipt and invoice email template for SaaS subscriptions, memberships, agencies and one-off payments. It opens with the amount paid in large type and a green "Paid" badge, then shows the payment date, invoice number and card used, an itemised summary with tax and total, the billing details, a **Download invoice** button and the date of the next payment.

**What people need from a receipt**

Receipts get forwarded to accounting, searched for at tax time and checked against card statements. This template puts the amount, the date and the invoice number where people look first, and keeps everything in real text (not images) so it is searchable and copyable in every inbox.

**Built for subscriptions**

The line items fit plan names with billing periods ("Pro plan, monthly, Oct 17 to Nov 16"), extra seats and add-ons. The closing note tells people when the next charge is and where to manage their plan, which cuts surprise-charge complaints and chargebacks. Leave a line description empty to hide it.

**Coded for real inboxes**

Nested tables, inline styles, a VML button for Outlook on Windows, editable light and dark palettes for Apple Mail, iOS and Outlook.com, a hidden preheader and a plain-text version are all included.

**Pair it with a PDF**

Link the button to your PDF invoice from Stripe, Paddle, Chargebee or your billing system, so customers who need a formal invoice can download it, while everyone else sees the essentials right in the email.

Receipts are transactional email, so no unsubscribe link is needed. Edit it in the browser, then send it from Postmark, SendGrid, Amazon SES, Resend or your billing platform's custom email settings. Selling physical products? See the [Order Confirmation](/email-templates/order-confirmation/) template.`,
    },
    features: [
      'Large amount-paid header with a green "Paid" badge',
      'Payment date, invoice number and card used in a summary row',
      'Up to three line items, a tax line and a bold total',
      '"Billed to" block with name, company, billing email and address',
      'Outlook-safe "Download invoice (PDF)" button',
      'Next-payment note and a billing-support line',
      'All real text, so receipts stay searchable and copyable',
      'Editable light and dark palettes, hidden preheader and plain-text version',
      'Works with Stripe, Paddle, Chargebee, Postmark, SendGrid and SES',
      'Copy the HTML, download a .html or ZIP file, or fork it to My Code',
    ],
    why: [
      { icon: '💳', title: 'Fewer chargebacks', desc: 'A clear receipt with the amount, date and next charge helps customers recognise the payment on their statement instead of disputing it.' },
      { icon: '🔎', title: 'Easy to find later', desc: 'Real text for the amount and invoice number means people can search their inbox for it at tax time.' },
      { icon: '🧾', title: 'Ready for accounting', desc: 'Invoice number, billing details and a PDF link give finance teams what they need without another support request.' },
    ],
    useCases: [
      { icon: '🔁', title: 'SaaS subscription renewals', desc: 'Send it every billing cycle with the plan name and period, seats and tax, plus the next renewal date and a link to billing settings.' },
      { icon: '🏋', title: 'Memberships and classes', desc: 'Confirm gym, studio or club membership payments, list the plan and any add-ons, and use the closing note to remind members how to pause or cancel.' },
      { icon: '🧑‍💼', title: 'Freelancers and agencies', desc: 'Email clients a branded receipt when an invoice is paid, list the project milestones as lines, and link the button to the formal PDF invoice.' },
      { icon: '❤', title: 'Donations and nonprofits', desc: 'Thank donors with a receipt showing the amount and date, change the summary to the campaign, and use the note for tax-deductibility details.' },
    ],
    faqs: [
      { q: 'What is the difference between a receipt and an invoice email?', a: 'An invoice asks for payment; a receipt confirms that payment was made. This template is a receipt, and its button links to the formal invoice PDF for customers who need it for accounting.' },
      { q: 'Can I use it with Stripe?', a: 'Yes. Stripe can send its own receipts, but many teams turn those off and send their own from a webhook (for example invoice.paid). Fill the template with values from the Stripe invoice object and link the button to the invoice\'s hosted PDF URL.' },
      { q: 'Does a receipt email need an unsubscribe link?', a: 'No. Receipts are transactional, so US CAN-SPAM doesn\'t require one. Keep promotions out so it stays transactional.' },
      { q: 'How do I add more line items?', a: 'Copy the HTML or fork it to My Code and repeat the line-item row inside your template engine\'s loop, one row per item.' },
      { q: 'Should the receipt include tax?', a: 'If you charge sales tax, VAT or GST, show it as its own line, as this template does. Some countries require the tax amount and your tax ID on invoices, which you can add to the summary or the PDF.' },
    ],
  },

  newsletter: {
    keywords: ['newsletter email template', 'html newsletter template', 'free email newsletter template', 'weekly newsletter template', 'blog digest email template', 'substack style newsletter'],
    about: {
      title: 'Newsletter Email — Free Responsive HTML Newsletter Template',
      description: `**Newsletter Email** is a free, responsive HTML newsletter template for weekly and monthly emails, blog digests, product updates and creator newsletters. It has a masthead with the issue number, date and a "View in browser" link, a featured story with a large image and button, an editor's intro, three story summaries with "Read more" links, a highlighted tip box, a sign-off, social links and a CAN-SPAM-ready footer.

**A layout people can skim**

Most newsletter readers skim, so the structure does the work: one big featured story to grab attention, a short personal intro, then three summaries with a coloured rule, small tag, headline and one or two lines each. The tip box gives regular readers a reason to scroll to the end. Leave a story title empty to hide it, or switch whole sections off.

**Editorial typography**

Headlines default to Playfair Display, a serif with a magazine feel, over a clean system font for body text, with Georgia as the fallback where web fonts don't load. Change the fonts and the accent colour to match your brand in seconds.

**Coded for real inboxes**

Nested tables and inline styles hold the layout together in Gmail, Apple Mail, Yahoo and Outlook, and the featured button is a VML "bulletproof" button for Outlook on Windows. A dark palette, a hidden preheader and a plain-text version are included, and the editor warns you if the email grows close to Gmail's 102 KB clipping limit.

**Compliant by default**

Newsletters are commercial email, so the footer includes the reason people are receiving it, your postal address, an unsubscribe link and an email-preferences link, as US CAN-SPAM and the Gmail and Yahoo bulk-sender rules require.

Write your issue in the browser, then paste the HTML into Mailchimp, Kit (ConvertKit), Beehiiv, Brevo, MailerLite or Klaviyo, or fork it into [My Code](/ui-snippets/mycode/). New subscriber? Greet them first with the [Welcome Email](/email-templates/welcome/).`,
    },
    features: [
      'Masthead with issue number, date and "View in browser" link',
      'Featured story with a large image, tag, headline, summary and button',
      'Editor\'s intro and personal sign-off',
      'Three story summaries with tags and "Read more" links',
      'Highlighted tip-of-the-week box',
      'Social links and a CAN-SPAM footer with unsubscribe and preferences links',
      'Serif headlines (Playfair Display) with Georgia fallback',
      'Show or hide the featured story, tip box and social links',
      'Editable light and dark palettes, hidden preheader and plain-text version',
      'Copy the HTML, download a .html or ZIP file, or fork it to My Code',
    ],
    why: [
      { icon: '👀', title: 'Built for skimming', desc: 'One featured story, short summaries and clear "Read more" links match how people actually read newsletters, and drive more clicks.' },
      { icon: '✍', title: 'Feels editorial', desc: 'Serif headlines, an issue number and a personal intro make it feel like a publication, not an ad.' },
      { icon: '⚖', title: 'Compliant footer', desc: 'Unsubscribe link, preferences link and postal address are already in place for CAN-SPAM and the Gmail and Yahoo sender rules.' },
    ],
    useCases: [
      { icon: '📰', title: 'Weekly blog digest', desc: 'Feature your best new post with its cover image, summarise three more articles, and use the tip box for a quick how-to that rewards loyal readers.' },
      { icon: '🚀', title: 'Monthly product update', desc: 'Lead with the biggest release, list smaller improvements as stories tagged Product, Guide or Changelog, and link each one to its announcement or help article.' },
      { icon: '🎙', title: 'Creator or podcast newsletter', desc: 'Feature this week\'s episode or video, link to past favourites and community picks, and sign off personally so subscribers feel they are hearing from you.' },
      { icon: '🏘', title: 'Community or nonprofit update', desc: 'Share a featured story from the field, upcoming events and a volunteer spotlight, and use the tip box for a call for donations or helpers.' },
    ],
    faqs: [
      { q: 'How do I use this newsletter template in Mailchimp, Kit or Beehiiv?', a: 'Edit the template and open the HTML tab and click "Copy". In Mailchimp choose "Code your own" and paste it; in Kit (ConvertKit) and MailerLite create a custom HTML template; in Beehiiv use an HTML block. Then replace the unsubscribe link with the platform\'s merge tag, such as *|UNSUB|* in Mailchimp.' },
      { q: 'How many stories should a newsletter have?', a: 'Three to five is a good range for a weekly email. This template has one featured story plus three summaries, and you can hide any of them by leaving the title empty.' },
      { q: 'Does a newsletter need an unsubscribe link?', a: 'Yes. Newsletters are commercial email under US CAN-SPAM, and Gmail and Yahoo require bulk senders to offer easy unsubscribe. The footer includes an unsubscribe link, a preferences link and your postal address.' },
      { q: 'What size should the featured image be?', a: '1200 × 600 px, shown at 600 px wide, stays sharp on retina screens. Keep the file under about 200 KB, host it online or upload it here, and always fill in the alt text.' },
      { q: 'Will the serif font show in Outlook?', a: 'Outlook for Windows ignores web fonts, so headlines fall back to Georgia, and the template forces a safe font instead of Times New Roman. Apple Mail, iOS Mail and some Android clients show Playfair Display.' },
    ],
  },

  'black-friday-sale': {
    keywords: ['black friday email template', 'cyber monday email template', 'sale email template html', 'promo code email template', 'discount email template', 'holiday sale email'],
    about: {
      title: 'Black Friday Sale Email — Free HTML Cyber Monday Template',
      description: `**Black Friday Sale Email** is a free, responsive HTML promo email template for Black Friday, Cyber Monday, holiday sales and flash sales. It uses a bold black-and-yellow design: a hero image, a "40% off everything" headline, a dashed promo-code box, a deadline line, a big **Shop the sale** button, two product picks with crossed-out and sale prices, the fine print, and a CAN-SPAM footer with unsubscribe.

**Built to stand out in a crowded inbox**

Black Friday week is the busiest of the year for email. Inboxes fill with sale emails, so yours has to say the offer in a second. This template leads with the discount, repeats it in the code box and the hero image, and gives people a clear deadline (Black Friday 2026 is November 27 and Cyber Monday is November 30) so they act now instead of later.

**Promo code people can copy**

The code is set in large monospace type inside a dashed "coupon" border, so it's easy to read and copy. Turn the code section off for automatic discounts, or reuse the template for any sale by changing the eyebrow, headline and hero.

**Product picks with was and now prices**

Two product cards show the regular price struck through next to the sale price, with "Shop now" links. They sit side by side on desktop and stack on phones. Leave a pick name empty, or hide the section, if you'd rather send people straight to the sale page.

**Dark by design, compliant by default**

The card is dark in both light and dark mode, so it looks the same in Apple Mail, Gmail and Outlook.com, while the header and footer stay readable on the light page. The button is a VML "bulletproof" button for Outlook on Windows. Because this is marketing email, the footer includes an unsubscribe link, a preferences link and your postal address, as US CAN-SPAM and the Gmail and Yahoo sender rules require.

Edit everything in the browser, then paste the HTML into Klaviyo, Mailchimp, Shopify Email, Omnisend or Brevo, or fork it into [My Code](/ui-snippets/mycode/). Promoting the sale on social too? See the [Holiday Sale](/social-post-templates/holiday-sale/) social post template.`,
    },
    features: [
      'Bold dark card with a yellow accent, the same in light and dark mode',
      'Hero image with a ready-made "Black Friday 40% off" default',
      'Large discount headline and short intro',
      'Dashed promo-code box in monospace type, easy to read and copy',
      'Deadline line and a big Outlook-safe "Shop the sale" button',
      'Two product picks with struck-through regular price and sale price',
      'Fine print section for offer terms',
      'CAN-SPAM footer with unsubscribe link, preferences link and address',
      'Show or hide the hero, code and product picks',
      'Copy the HTML, download a .html or ZIP file, or fork it to My Code',
    ],
    why: [
      { icon: '⚡', title: 'Offer in one glance', desc: 'The discount appears in the hero, the headline and the code box, so nobody has to read a paragraph to know what\'s on.' },
      { icon: '⏰', title: 'Urgency built in', desc: 'A clear end date and time gives people a reason to buy now, one of the most effective parts of any sale email.' },
      { icon: '⚖', title: 'Ready to send', desc: 'The unsubscribe link, preferences link and postal address that marketing email needs are already in the footer.' },
    ],
    useCases: [
      { icon: '🖤', title: 'Black Friday launch email', desc: 'Announce the sale the morning it starts with your discount in the hero and headline, the promo code, and your two bestsellers as product picks.' },
      { icon: '💻', title: 'Cyber Monday last chance', desc: 'Resend on November 30 with a "Last chance" eyebrow, a deadline of midnight tonight and a subject line that leads with the hours left.' },
      { icon: '🎁', title: 'Holiday gift guide sale', desc: 'Change the headline to "Gifts they\'ll love, 30% off", swap the picks for top gifts under $50, and add the shipping cut-off date to the deadline line.' },
      { icon: '⚡', title: 'Flash sale or anniversary sale', desc: 'Reuse the layout for any short sale by changing the eyebrow, colours and hero image, and keep the promo code box for tracking which email drove sales.' },
    ],
    faqs: [
      { q: 'When should I send Black Friday emails in 2026?', a: 'Black Friday is November 27, 2026 and Cyber Monday is November 30. Many brands send a teaser the week before, a launch email on Thursday evening or Friday morning, a reminder over the weekend and a last-chance email on Cyber Monday.' },
      { q: 'How do I use it in Klaviyo, Mailchimp or Shopify Email?', a: 'Edit the template and open the HTML tab and click "Copy". In Klaviyo and Mailchimp create a custom HTML template and paste it; in Shopify Email use a custom HTML section. Replace the unsubscribe link with the platform\'s merge tag, such as {% unsubscribe %} in Klaviyo.' },
      { q: 'Can I change the colours from black and yellow?', a: 'Yes. Change the card, accent and text colours under Colours, or apply your brand kit. Keep strong contrast between the text and the card, and check the button text against the accent colour.' },
      { q: 'Should the discount be in an image or in text?', a: 'Both. The hero image catches the eye, but many people have images turned off, so the headline and promo code are real text that always shows, and the hero has alt text.' },
      { q: 'Does a sale email need an unsubscribe link?', a: 'Yes. Sale and promotional emails are commercial email, so US CAN-SPAM requires a working unsubscribe link and your postal address, and Gmail and Yahoo require one-click unsubscribe for bulk senders.' },
    ],
  },

  'abandoned-cart': {
    keywords: ['abandoned cart email template', 'cart abandonment email', 'abandoned cart email example', 'shopify abandoned cart email', 'cart recovery email template'],
    about: {
      title: 'Abandoned Cart Email — Free HTML Cart Recovery Email Template',
      description: `**Abandoned Cart Email** is a free, responsive HTML template for winning back shoppers who added products to their cart and left without paying. Around seven in ten online carts are abandoned, and a well-timed reminder is one of the highest-earning emails an online store can send, often recovering a meaningful share of those sales automatically.

**What's in the email**

A friendly "you left something behind" headline with the shopper's first name, a short reassuring intro, up to three cart items with product photos, details and prices, and a bold "Return to your cart" button. Below it you can add a discount code in a dashed coupon box, three reassurance points such as free shipping, free returns and secure checkout, and a help line that invites a reply.

**Built for real inboxes**

The layout uses nested tables and inline styles, so product rows, photos and prices line up in Gmail, Apple Mail and Outlook on Windows. The button is a "bulletproof" VML button for Outlook and a styled link everywhere else, and it stretches to full width on phones, where most cart reminders are opened. A dark palette, a hidden preheader and a plain-text version are included.

**Use it with any store**

Copy the HTML into Shopify Email, Klaviyo, Omnisend, Mailchimp or WooCommerce and replace the sample items with your platform's cart variables, or loop over the item row in your own code. Pick your platform under Merge tags and first names and the unsubscribe link convert automatically. Need the follow-up emails too? Pair it with the [Order Confirmation](/email-templates/order-confirmation/) and [Shipping Confirmation](/email-templates/shipping-confirmation/) templates.`,
    },
    features: [
      'Up to three cart items with product photo, details and price',
      'Bulletproof "Return to your cart" button that works in Outlook',
      'Optional discount code in a dashed coupon box with an expiry note',
      'Three reassurance points: shipping, returns and secure checkout',
      'Personalised headline with a first-name merge tag',
      'Responsive layout: full-width button and tidy rows on phones',
      'Light and dark palettes, both editable',
      'Unsubscribe link and postal address for CAN-SPAM',
      'Plain-text version generated automatically',
      'Upload product photos or paste your store image URLs',
    ],
    why: [
      { icon: '💸', title: 'Recover lost sales', desc: 'Most shoppers who abandon a cart were interested. A reminder with their actual items brings a share of them back without any extra ad spend.' },
      { icon: '🛒', title: 'Shows exactly what they left', desc: 'Product photos and prices remind people why they wanted the item in the first place, which works far better than a generic "come back" message.' },
      { icon: '⚙', title: 'Coded for every inbox', desc: 'Tables, inline styles and an Outlook-safe button keep the product rows and the call to action intact in Gmail, Apple Mail and Outlook.' },
    ],
    useCases: [
      { icon: '⏱', title: 'First reminder after one hour', desc: 'Send the template without the discount about an hour after checkout is abandoned, so the reminder arrives while the shopper still remembers browsing your store.' },
      { icon: '🏷', title: 'Second email with a discount', desc: 'Switch on the discount box for a follow-up the next day, with a code such as COMEBACK10 that expires in 48 hours to give hesitant shoppers a nudge.' },
      { icon: '🎁', title: 'Holiday season cart reminders', desc: 'During Black Friday and December, change the intro to mention low stock and shipping cut-offs, since shoppers compare stores and leave carts more often then.' },
      { icon: '📦', title: 'Browse abandonment emails', desc: 'Reuse the layout for shoppers who viewed products without adding them to the cart: change the headline to "Still thinking about these?" and link to the product pages.' },
    ],
    faqs: [
      { q: 'When should I send an abandoned cart email?', a: 'A common sequence is three emails: the first about one hour after the cart is abandoned, a second around 24 hours later, and a third after 48 to 72 hours. Many stores add a discount only in the second or third email so they don\'t train shoppers to abandon carts on purpose.' },
      { q: 'Should an abandoned cart email include a discount?', a: 'Not always. The first reminder often works without one. Use the optional discount box in a later email, keep the code short-lived, and test whether the extra sales are worth the margin you give away.' },
      { q: 'How do I use this template in Shopify or Klaviyo?', a: 'Edit the template, open the Export menu and copy the HTML. In Klaviyo, create an HTML template and use it in your abandoned cart flow, replacing the sample items with the event\'s product variables. In Shopify, paste it into the abandoned checkout notification and swap the items for Liquid variables.' },
      { q: 'Does an abandoned cart email need an unsubscribe link?', a: 'Yes. Cart reminders promote a purchase, so they are treated as commercial email under US CAN-SPAM and need a working unsubscribe link and your postal address. Both are already in the footer.' },
      { q: 'Can I show more than three products?', a: 'The editor shows up to three, which covers most carts. To list every item, fork the template to My Code or copy the HTML and repeat the product row inside your platform\'s loop.' },
    ],
  },

  'shipping-confirmation': {
    keywords: ['shipping confirmation email template', 'order shipped email template', 'shipping notification email', 'tracking email template', 'shopify shipping confirmation email'],
    about: {
      title: 'Shipping Confirmation Email — Free HTML Order Shipped Template',
      description: `**Shipping Confirmation Email** is a free, responsive HTML template for telling customers their order is on its way. After the order confirmation, the "your order has shipped" email is the one customers look for most, and they often open it several times while they wait, which makes clear tracking information essential.

**What's in the email**

A cheerful headline with the customer's first name, a short intro, and a four-step delivery progress bar (ordered, shipped, out for delivery, delivered) that you set to the current step. A details box shows the order number, carrier, tracking number and estimated delivery date, followed by a "Track your package" button, the items in the parcel with quantities and the shipping address. Each section can be switched off.

**A progress bar that works in email**

Email clients don't support modern CSS, so the progress bar is built from table cells with background colours, which display reliably in Gmail, Apple Mail, Yahoo and Outlook on Windows. The tracking button is an Outlook-safe "bulletproof" button that goes full width on phones. A dark palette, hidden preheader and plain-text version are included.

**Send it from your store**

Copy the HTML into Shopify's shipping confirmation notification, WooCommerce, Klaviyo, Postmark or your own code and swap the sample values for your platform's variables. Use the same template for "out for delivery" and "delivered" updates by changing the step and the headline. It pairs with the [Order Confirmation](/email-templates/order-confirmation/) and [Review Request](/email-templates/review-request/) templates for a complete post-purchase flow.`,
    },
    features: [
      'Four-step delivery progress bar built with email-safe tables',
      'Order number, carrier, tracking number and delivery date box',
      'Bulletproof "Track your package" button for Outlook and Gmail',
      'Items in the shipment with quantities',
      'Shipping address with name and multi-line address',
      'Set the current step from 1 (ordered) to 4 (delivered)',
      'Show or hide the progress bar, items and address',
      'Light and dark palettes, both editable',
      'Transactional footer without marketing content',
      'Plain-text version with the tracking link',
    ],
    why: [
      { icon: '📦', title: 'Fewer "where is my order?" emails', desc: 'Clear tracking details and a progress bar answer the question before customers contact support, which saves your team time every day.' },
      { icon: '👀', title: 'One of your most-opened emails', desc: 'Customers check shipping emails again and again. A branded, tidy email builds trust at the moment they are waiting for your product.' },
      { icon: '⚙', title: 'Works in every inbox', desc: 'The progress bar and button use tables and inline styles, so they hold up in Outlook on Windows as well as Gmail and Apple Mail.' },
    ],
    useCases: [
      { icon: '🚚', title: 'Order shipped notification', desc: 'Send it the moment a shipping label is created, with the carrier, tracking number and a button that opens the carrier\'s tracking page or your own branded tracking page.' },
      { icon: '🏠', title: 'Out for delivery update', desc: 'Set the progress bar to step 3, change the headline to "Arriving today" and remind the customer that someone may need to be home to sign for the parcel.' },
      { icon: '✅', title: 'Delivered confirmation', desc: 'Set the progress bar to step 4, thank the customer and link to your returns page or the Review Request email, so the post-purchase flow keeps going.' },
      { icon: '✂', title: 'Split shipments', desc: 'When an order ships in several parcels, send one email per package and use the items section to list only the products that are in that parcel.' },
    ],
    faqs: [
      { q: 'What should a shipping confirmation email include?', a: 'The order number, the carrier, the tracking number with a tracking link, the estimated delivery date, what is in the package and where it is going. This template includes all of them, plus a progress bar showing how far the order has got.' },
      { q: 'How do I use it in Shopify?', a: 'In Shopify admin go to Settings, then Notifications, then Shipping confirmation, replace the code with this HTML and swap the sample values for Shopify\'s Liquid variables, such as the tracking number and tracking URL of the fulfillment.' },
      { q: 'Is a shipping confirmation email transactional?', a: 'Yes. It is sent because of a purchase the customer made, so under US CAN-SPAM it doesn\'t need an unsubscribe link. Keep promotions out, or keep them very small, so it stays transactional.' },
      { q: 'How does the progress bar work in Outlook?', a: 'It is four table cells with background colours and labels, not CSS gradients or flexbox, so Outlook\'s Word-based renderer shows it correctly. Set the current step in the Delivery progress section.' },
      { q: 'Can I link to my own tracking page?', a: 'Yes. Paste any https:// link into the tracking link field: the carrier\'s page, a branded tracking page from AfterShip or Route, or your own order page.' },
    ],
  },

  'last-chance-sale': {
    keywords: ['last chance email template', 'cyber monday email template', 'final hours sale email', 'sale ending email template', 'urgency email template'],
    about: {
      title: 'Last Chance Sale Email — Free Cyber Monday & Final Hours Template',
      description: `**Last Chance Sale Email** is a free, responsive HTML template for the final hours of a sale: Cyber Monday, the end of a Black Friday weekend, a flash sale or the last day of a seasonal promotion. "Last chance" emails are often among the highest-earning sends of a campaign, because they reach the people who meant to buy and simply hadn't yet.

**What's in the email**

An urgent coloured banner across the top ("Final hours · Sale ends tonight"), a bold headline, a short personal intro, and three countdown-style boxes for the numbers that matter, such as hours left, the discount and free shipping. Below them sit a promo code in a dashed box, a large "Shop before it ends" button, three reasons to buy today and the fine print. Every section can be switched off.

**Urgency without broken images**

The countdown boxes are real text in table cells, so they show even when images are blocked, and they work in Outlook, Gmail and Apple Mail. If you want a live ticking timer, replace a box with an image from a countdown timer service. The button is Outlook-safe and full width on phones, and the template includes a dark palette and a plain-text version.

**Part of a sale sequence**

Send it after the [Black Friday Sale](/email-templates/black-friday-sale/) email as the final reminder: Black Friday 2026 is November 27 and Cyber Monday is November 30. Copy the HTML into Klaviyo, Mailchimp, Shopify Email or Omnisend, and the unsubscribe link converts to your platform's tag automatically.`,
    },
    features: [
      'Urgent top banner with the deadline',
      'Three countdown-style boxes for hours left, discount or perks',
      'Promo code in a dashed coupon box',
      'Large bulletproof "Shop before it ends" button',
      'Three "why shop today" reasons with check marks',
      'Fine print for offer terms and exclusions',
      'Show or hide the banner, boxes, code and reasons',
      'Light and dark palettes, both editable',
      'Unsubscribe link and postal address for CAN-SPAM',
      'Plain-text version generated automatically',
    ],
    why: [
      { icon: '⏰', title: 'Urgency that converts', desc: 'A clear deadline gives people who were "going to buy later" a reason to act now, which is why final-hours emails often outperform launch emails.' },
      { icon: '🔢', title: 'Numbers people scan first', desc: 'Big countdown boxes put the hours left and the discount where the eye lands first, so the message gets through even in a quick glance.' },
      { icon: '🖼', title: 'No images required', desc: 'The banner, boxes and code are real text, so the urgency still shows when images are off, and nothing breaks in Outlook.' },
    ],
    useCases: [
      { icon: '💻', title: 'Cyber Monday last call', desc: 'Send on the afternoon of Cyber Monday, November 30, 2026, with "Ends at midnight" in the banner, the hours left in the first box and your Cyber Monday code.' },
      { icon: '🖤', title: 'End of a Black Friday weekend', desc: 'Close out a Black Friday sale on Sunday evening, reminding subscribers who opened the launch email but didn\'t buy that prices go back up tomorrow.' },
      { icon: '⚡', title: 'Flash sale reminder', desc: 'For a 24 or 48-hour flash sale, send the launch email in the morning and this template a few hours before the end, with stock levels in one of the boxes.' },
      { icon: '🎟', title: 'Early-bird pricing deadline', desc: 'Use it for conferences, courses or software launches: show the days left at the early-bird price, the saving and the number of seats remaining.' },
    ],
    faqs: [
      { q: 'When should I send a last chance email?', a: 'On the last day of the sale, usually in the afternoon or early evening of the deadline day, so people still have hours to act. For Cyber Monday 2026 that means Monday, November 30. Many brands send a second, shorter reminder a few hours before midnight.' },
      { q: 'Can I add a live countdown timer?', a: 'Yes. Live timers are animated images generated by a countdown service. Create one for your deadline, then add it with an Image section or replace a countdown box. The text boxes in this template are a reliable fallback because they always show.' },
      { q: 'How is this different from the Black Friday template?', a: 'The Black Friday template is built for the launch, with a hero image and product picks. This one is built for the deadline, with an urgent banner, countdown boxes and reasons to buy today. Use them together as a sequence.' },
      { q: 'Does a last chance email need an unsubscribe link?', a: 'Yes. Sale emails are commercial email, so US CAN-SPAM requires a working unsubscribe link and your postal address, and Gmail and Yahoo require one-click unsubscribe for bulk senders. Both are already in the footer.' },
      { q: 'How do I use it in Klaviyo or Mailchimp?', a: 'Pick your platform under Merge tags, then copy the HTML from the Export menu. In Klaviyo or Mailchimp create a custom HTML template and paste it in. First names and the unsubscribe link are converted to the platform\'s syntax automatically.' },
    ],
  },

  'holiday-gift-guide': {
    keywords: ['holiday gift guide email template', 'christmas email template', 'gift guide email', 'holiday product email template', 'christmas newsletter template'],
    about: {
      title: 'Holiday Gift Guide Email — Free Christmas Product Grid Template',
      description: `**Holiday Gift Guide Email** is a free, responsive HTML template for showing off your best gifts during the holiday shopping season. Gift guides are among the most clicked emails of December, because shoppers actively want ideas, and a well-organised grid of products helps them choose quickly.

**What's in the email**

A festive hero image, a warm headline and intro, then a 2×2 grid of gifts, each with a photo, a short tag such as "Bestseller" or "Under $25", the product name and price, all linked to the product page. A shipping cut-off banner tells shoppers the last day to order for delivery before Christmas, followed by a "Shop all gifts" button and social links.

**A product grid that holds together**

Two-column layouts are where many email templates break. This grid is built with nested tables, so it stays aligned in Outlook on Windows and Gmail, and it stacks into one column on phones so photos stay large and easy to tap. Images are real https links with alt text, so the product names and prices still show when images are off. A dark palette and a plain-text version are included.

**Make it yours**

Upload your own product photos or paste the image URLs from your store, change the tags, prices and links, and swap the colours for your brand. Copy the HTML into Klaviyo, Mailchimp, Shopify Email or Omnisend. Pair it with the [Holiday Greetings](/email-templates/holiday-greetings/) email for the end of the season and the [Last Chance Sale](/email-templates/last-chance-sale/) template for shipping deadlines.`,
    },
    features: [
      'Festive hero image with a link to the gift guide',
      '2×2 product grid with photos, tags, names and prices',
      'Grid stacks to one column on phones',
      'Shipping cut-off banner for "order by" dates',
      'Bulletproof "Shop all gifts" button',
      'Upload product photos or paste hosted image URLs',
      'Social links in the footer',
      'Warm holiday palette plus an editable dark palette',
      'Unsubscribe link and postal address for CAN-SPAM',
      'Plain-text version listing every gift and link',
    ],
    why: [
      { icon: '🎁', title: 'Shoppers want ideas', desc: 'In December people actively look for gift inspiration. A curated guide answers "what should I buy?" and sends them straight to product pages.' },
      { icon: '🗂', title: 'Easy to scan', desc: 'Tags like "Under $25" and "For coffee lovers" let readers jump to the right gift for each person on their list in seconds.' },
      { icon: '📱', title: 'Built for phones', desc: 'The grid stacks into one column on small screens, so product photos stay big and buttons stay easy to tap.' },
    ],
    useCases: [
      { icon: '🎄', title: 'Christmas gift guide', desc: 'Send in late November or early December with your four best gifts, a "Bestseller" tag on the top product and the shipping cut-off date for delivery before Christmas.' },
      { icon: '💲', title: 'Gifts by budget', desc: 'Send a series of guides such as "Gifts under $25" and "Gifts under $50", using the tags for price bands and linking the button to a filtered collection page.' },
      { icon: '👥', title: 'Gifts by recipient', desc: 'Create versions for "For her", "For him", "For the host" or "For coffee lovers", each with four hand-picked products and a matching collection link.' },
      { icon: '💝', title: 'Valentine\'s and Mother\'s Day', desc: 'Reuse the layout after the holidays by changing the hero, colours and products for Valentine\'s Day, Mother\'s Day or Father\'s Day gift guides.' },
    ],
    faqs: [
      { q: 'When should I send a holiday gift guide email?', a: 'Many stores send the first gift guide in mid to late November, around Black Friday, and follow up in early December. Always include your shipping cut-off date, because it creates urgency and reduces "will it arrive in time?" questions.' },
      { q: 'What size should the product images be?', a: 'Square images of at least 480 × 480 px look sharp on retina screens; they are shown at about 244 px wide. Keep each file small, under about 100 KB, so the email loads quickly. You can upload photos here and the tool resizes them.' },
      { q: 'Will the 2×2 grid work in Outlook?', a: 'Yes. The grid uses nested tables and fixed widths instead of CSS grid or flexbox, which Outlook ignores. On phones a media query stacks the products into one column.' },
      { q: 'Can I show more than four products?', a: 'Use Extra sections to add images and text below the grid, or fork the template to My Code and repeat the grid row for as many products as you like.' },
      { q: 'Does a gift guide email need an unsubscribe link?', a: 'Yes. It promotes products, so it is commercial email under US CAN-SPAM and needs a working unsubscribe link and your postal address. Both are already in the footer.' },
    ],
  },

  'holiday-greetings': {
    keywords: ['holiday greetings email template', 'christmas email template', 'season\'s greetings email', 'happy new year email template', 'holiday card email template'],
    about: {
      title: 'Holiday Greetings Email — Free Christmas & New Year Email Template',
      description: `**Holiday Greetings Email** is a free, responsive HTML template for sending season's greetings to your customers, clients and subscribers at Christmas, over the holidays or for the New Year. It's the warmest email many brands send all year: a thank-you that strengthens relationships without the hard sell.

**What's in the email**

A festive hero image (or your own team photo), a "Season's greetings" label, a personal headline with the recipient's first name, and a heartfelt message with a signed sign-off from your team. You can add an optional thank-you offer in a dashed box with its own button, and your holiday opening hours, so customers know when you're closed and when orders will ship. Social links sit in the footer.

**Elegant on every screen**

A serif heading and body font give the email a classic, card-like feel, with safe Georgia fallbacks for Gmail and Outlook. The layout uses tables and inline styles, so it looks the same in Outlook on Windows, Gmail and Apple Mail, and the button is Outlook-safe. A deep green dark palette is included, along with a plain-text version.

**More than Christmas**

Change the image, colours and wording for Hanukkah, Diwali, Lunar New Year, Thanksgiving or a "happy new year" message. Copy the HTML into Mailchimp, Klaviyo, HubSpot or Brevo. For holiday sales, pair it with the [Holiday Gift Guide](/email-templates/holiday-gift-guide/) template.`,
    },
    features: [
      'Festive hero image, or upload your own team photo',
      'Personal headline with a first-name merge tag',
      'Heartfelt message with a signed team sign-off',
      'Optional thank-you offer with its own button',
      'Holiday opening hours section',
      'Classic serif fonts with safe Georgia fallbacks',
      'Social links in the footer',
      'Green holiday palette plus an editable dark palette',
      'Unsubscribe link and postal address for CAN-SPAM',
      'Plain-text version generated automatically',
    ],
    why: [
      { icon: '💌', title: 'Strengthens relationships', desc: 'A sincere thank-you at the end of the year reminds customers there are real people behind your brand, which builds loyalty for the year ahead.' },
      { icon: '📅', title: 'Answers practical questions', desc: 'Holiday hours and shipping dates in the same email cut down on support questions during your busiest, most short-staffed weeks.' },
      { icon: '🎨', title: 'Looks like a card, works like email', desc: 'A classic serif design feels like a greeting card, while tables and inline styles keep it intact in Outlook, Gmail and Apple Mail.' },
    ],
    useCases: [
      { icon: '🎄', title: 'Christmas card to customers', desc: 'Send a warm thank-you a week before Christmas with a team photo as the hero, a message about your year and a signed sign-off from the founders or the whole team.' },
      { icon: '🎆', title: 'Happy New Year email', desc: 'Change the headline to "Happy New Year", look back at a highlight of the year in the message, and share what is coming next in a sentence or two.' },
      { icon: '🙏', title: 'Thank-you offer for loyal customers', desc: 'Switch on the offer box with a code valid until early January, so the greeting doubles as a gentle reason to come back after the holidays.' },
      { icon: '🏢', title: 'Agency or B2B client greetings', desc: 'Turn the offer off, add your office closure dates in the holiday hours, and send a professional season\'s greetings to clients and partners.' },
    ],
    faqs: [
      { q: 'When should I send a holiday greetings email?', a: 'One to two weeks before Christmas works well, before inboxes fill with last-minute sales. A New Year version can go out on December 31 or in the first days of January.' },
      { q: 'Should a holiday greeting include a discount?', a: 'It is optional. Many brands keep the greeting purely as a thank-you; others add a small gift code. Use the Thank-you offer switch to add or remove it without changing the rest of the email.' },
      { q: 'Can I use it for other holidays?', a: 'Yes. Change the hero image, colours, label and message for Hanukkah, Diwali, Lunar New Year, Eid, Thanksgiving or any celebration that matters to your audience.' },
      { q: 'Will the serif fonts show in Gmail and Outlook?', a: 'Playfair Display loads in Apple Mail and iOS Mail. Gmail and Outlook use Georgia instead, which is a classic serif installed on almost every computer, so the card-like look is kept.' },
      { q: 'Does a greetings email need an unsubscribe link?', a: 'Yes, if you send it to a marketing list. It promotes your brand, so it counts as commercial email under US CAN-SPAM. The unsubscribe link and postal address are already in the footer.' },
    ],
  },

  'review-request': {
    keywords: ['review request email template', 'product review email template', 'customer feedback email template', 'ask for review email', 'star rating email template'],
    about: {
      title: 'Review Request Email — Free HTML Product Review & Star Rating Template',
      description: `**Review Request Email** is a free, responsive HTML template for asking customers to review a product after it arrives. Reviews are some of the strongest sales tools a store has, and most customers are happy to leave one when they're asked at the right moment and it takes only a tap.

**What's in the email**

The product photo, name and delivery date at the top, so customers instantly know which order you mean, then a friendly "How are you liking it?" headline with their first name and a short intro. A row of five clickable stars lets them rate in one tap: each star links to your review page with its rating added to the link. Below that sit a "Write a review" button, an optional thank-you reward and a note inviting them to reply if something went wrong.

**One-tap stars that work in email**

Email can't run JavaScript, so interactive rating widgets don't work. Instead each star is a normal link, such as \`…&rating=4\`, which your review page or platform reads to pre-select the rating. The stars are text characters, not images, so they show even when images are off, and they work in Gmail, Apple Mail and Outlook. The button is Outlook-safe, and a dark palette and plain-text version are included.

**Use it with your review platform**

Point the links at Judge.me, Yotpo, Okendo, Trustpilot, Google reviews or your own review form, then copy the HTML into Klaviyo, Shopify Email or Mailchimp. Send it after the [Shipping Confirmation](/email-templates/shipping-confirmation/) email once the order has been delivered.`,
    },
    features: [
      'Product photo, name and delivery details at the top',
      'Five one-tap star links that pass the rating to your review page',
      'Text-based stars that show even when images are off',
      'Bulletproof "Write a review" button for Outlook',
      'Optional thank-you reward line',
      'Reply-to-us note for unhappy customers',
      'Editable star colour plus light and dark palettes',
      'Responsive, centred layout for phones',
      'Unsubscribe link and postal address',
      'Plain-text version with a link for each rating',
    ],
    why: [
      { icon: '⭐', title: 'More reviews, less effort', desc: 'A one-tap star row removes friction: customers rate with a single click, and your review page opens with the rating already chosen.' },
      { icon: '🛍', title: 'Reviews sell products', desc: 'Shoppers trust other customers. More reviews on your product pages mean more confidence for the next buyer and better conversion.' },
      { icon: '🛟', title: 'Catch problems early', desc: 'The note invites unhappy customers to reply first, so you can fix an issue privately before it turns into a public one-star review.' },
    ],
    useCases: [
      { icon: '📦', title: 'Post-delivery review request', desc: 'Send it five to ten days after delivery, once the customer has had time to use the product, with the product photo and the date it arrived.' },
      { icon: '🔁', title: 'Review reminder', desc: 'Send a shorter follow-up a week later to customers who did not leave a review, with the reward switched on to give them an extra reason.' },
      { icon: '🧑‍💼', title: 'Service or course feedback', desc: 'For services, apps or courses, replace the product with your logo or course image and ask how the experience was, linking the stars to a feedback form.' },
      { icon: '📍', title: 'Google review request', desc: 'Local businesses can point every star at their Google review link, asking happy customers for a public review after a visit or appointment.' },
    ],
    faqs: [
      { q: 'When should I ask for a review?', a: 'After the customer has had time to use the product, usually five to fourteen days after delivery depending on what you sell. Asking too early, before the parcel arrives, is one of the most common reasons review emails are ignored.' },
      { q: 'How do the clickable stars work?', a: 'Each star is a link made from the rating link you enter plus its number, for example https://yoursite.com/review?order=10482&rating=5. Your review page or platform reads the rating from the link and pre-selects it.' },
      { q: 'Can I offer a discount for a review?', a: 'You can thank customers with a reward, but rules on incentivised reviews differ by platform and country. Many platforms require you to reward any honest review, not only positive ones, and some require the review to be marked as incentivised. Check your platform\'s policy.' },
      { q: 'Which review platforms does it work with?', a: 'Any platform that gives you a review link: Judge.me, Yotpo, Okendo, Stamped, Trustpilot, Google reviews or your own form. Paste the link into the rating link and button fields.' },
      { q: 'Does a review request need an unsubscribe link?', a: 'It is safest to include one. Review requests can be seen as commercial email, especially with a reward, so the footer includes an unsubscribe link and your postal address.' },
    ],
  },

  'magic-link': {
    keywords: ['magic link email template', 'passwordless login email', 'login code email template', 'sign in email template', 'otp email template'],
    about: {
      title: 'Magic Link Email — Free Passwordless Sign-in & Login Code Template',
      description: `**Magic Link Sign-in Email** is a free, responsive HTML template for passwordless login. Instead of typing a password, users enter their email address and receive a link that signs them in with one click, often with a short one-time code for signing in on a different device. It's the login method behind Slack, Notion, Medium and many modern apps.

**What's in the email**

A key badge, a clear "Your sign-in link is here" headline, an intro that names the account the link is for, and a large "Sign in" button. Under it, a short expiry note, an optional six-digit login code in a large monospace box, optional request details (device, location and time), a copyable fallback link and a security note telling people what to do if they didn't ask to sign in.

**Designed for trust and deliverability**

Sign-in emails have to arrive fast and look legitimate. This template keeps marketing out, shows exactly which address and device the request came from, and prints the full link as text for clients that block buttons. The layout uses tables and inline styles, the button is Outlook-safe, and a dark palette and plain-text version are included, which also helps spam filters.

**Works with your auth provider**

Copy the HTML into Supabase, Firebase Authentication, Auth0, Clerk, Stytch, Magic or your own Node, Laravel or Django code, and swap the link and code for your provider's variables. For account setup and recovery, see the [Verify Email](/email-templates/verify-email/) and [Password Reset](/email-templates/password-reset/) templates.`,
    },
    features: [
      'One-click "Sign in" button that works in Outlook',
      'Optional six-digit login code in a large monospace box',
      'Short expiry note: one use, minutes not days',
      'Optional request details: device, location and time',
      'Copyable fallback link for clients that block buttons',
      'Security note for requests the user didn\'t make',
      'Shows the account email with a merge tag',
      'Light and dark palettes, both editable',
      'Transactional footer without marketing content',
      'Plain-text version with the link and code',
    ],
    why: [
      { icon: '🔑', title: 'No passwords to forget', desc: 'Magic links remove password resets and weak passwords. Users sign in with the inbox they already trust, which is simpler and often safer.' },
      { icon: '📱', title: 'Works across devices', desc: 'The optional code lets people who read email on their phone sign in on a laptop, which a link alone can\'t do.' },
      { icon: '🛡', title: 'Looks legitimate', desc: 'Request details and a clear security note help users trust real sign-in emails and spot suspicious ones they didn\'t request.' },
    ],
    useCases: [
      { icon: '🚀', title: 'Passwordless SaaS login', desc: 'Use it as the only sign-in method for your app: users enter their email, get the link and land in their dashboard without ever creating a password.' },
      { icon: '🔢', title: 'Email one-time code (OTP)', desc: 'Turn the button off and keep the code to send a six-digit verification code for two-step login, checkout confirmation or sensitive account changes.' },
      { icon: '🧪', title: 'Supabase or Firebase custom template', desc: 'Replace the default magic link email in Supabase or Firebase with this branded version, swapping in the provider\'s confirmation URL and token variables.' },
      { icon: '🛒', title: 'Guest checkout sign-in', desc: 'Let returning shoppers access their orders without an account by emailing a magic link to their order history, valid for a few minutes.' },
    ],
    faqs: [
      { q: 'What is a magic link email?', a: 'A sign-in email containing a unique, short-lived link. Clicking it proves the user owns the email address and signs them in without a password. Most providers also offer a one-time code as an alternative.' },
      { q: 'How long should a magic link stay valid?', a: 'Keep it short: 10 to 15 minutes is common, and the link should stop working after one use. Put the same time in the expiry note so users know to act quickly.' },
      { q: 'How do I use it with Supabase?', a: 'In the Supabase dashboard open Authentication, then Email Templates, then Magic Link, and paste the HTML. Replace the sign-in link with {{ .ConfirmationURL }} and the code with {{ .Token }}. Other providers have similar variables.' },
      { q: 'Should I include both a link and a code?', a: 'Including both covers more situations. The link is fastest on the same device; the code helps when someone opens the email on their phone but is signing in on a computer. Switch the code off if your provider only sends links.' },
      { q: 'Does a sign-in email need an unsubscribe link?', a: 'No. It is a transactional email the user requested, so US CAN-SPAM\'s unsubscribe rule doesn\'t apply, and users should always receive it. Keep promotions out so it stays transactional.' },
    ],
  },

  'trial-ending': {
    keywords: ['trial ending email template', 'trial expiration email', 'free trial ending email', 'saas upgrade email template', 'trial conversion email'],
    about: {
      title: 'Trial Ending Email — Free SaaS Trial Expiration & Upgrade Template',
      description: `**Trial Ending Email** is a free, responsive HTML template for the most important email in a SaaS trial: the reminder that it's about to end. Sent a few days before expiry, it turns engaged trial users into paying customers by showing what they've already built and making the upgrade one click away.

**What's in the email**

A "Your trial ends in 3 days" pill, a headline about keeping everything they've built, and a short intro with the end date. Three usage stats show the value they've already got (projects created, teammates invited, hours saved), followed by a plan card with the plan name, price, billing period and four key features with check marks. An "Upgrade" button, a "Compare all plans" link and a reassuring note about what happens to their data finish the email, signed by a real person.

**Built to convert, coded for inboxes**

Personal usage numbers are more persuasive than a generic feature list, and a reassuring "your data is safe" note lowers the pressure that makes people walk away. The stats, plan card and button are built with tables and inline styles, so they hold their shape in Outlook on Windows, Gmail and Apple Mail, and the button goes full width on phones. A dark palette and plain-text version are included.

**Part of your lifecycle emails**

Fill the stats from your product data with merge tags in Customer.io, Intercom, HubSpot, Loops or your own code. It follows the [Welcome Email](/email-templates/welcome/) in an onboarding sequence; after upgrade, send a [Payment Receipt](/email-templates/receipt/).`,
    },
    features: [
      '"Trial ends in X days" pill to set the deadline',
      'Three usage stats showing the value already delivered',
      'Plan card with name, price, billing period and four features',
      'Bulletproof "Upgrade" button plus a compare-plans link',
      'Reassuring note about data and the free plan',
      'Founder or team sign-off for a personal touch',
      'Show or hide the stats and plan card',
      'Light and dark palettes, both editable',
      'Unsubscribe link and postal address',
      'Plain-text version generated automatically',
    ],
    why: [
      { icon: '📈', title: 'Your biggest conversion moment', desc: 'The days before a trial ends are when users decide whether to pay. A clear, personal reminder at that moment can make a real difference to trial conversion.' },
      { icon: '📊', title: 'Shows value, not features', desc: 'Usage stats remind people what they\'ve already achieved, which is more persuasive than a list of features they may never use.' },
      { icon: '🤝', title: 'Lowers the pressure', desc: 'Explaining what happens to their data and offering a free plan removes the fear of losing work, which keeps users around even if they don\'t upgrade today.' },
    ],
    useCases: [
      { icon: '⏳', title: 'Three days before the trial ends', desc: 'Send the main reminder three days before expiry with the user\'s real stats, the plan that matches their usage and a direct link to the upgrade page.' },
      { icon: '🔚', title: 'Trial ends today', desc: 'Send a shorter final reminder on the last day: change the pill to "Your trial ends today", keep the plan card and remove the stats to focus on the button.' },
      { icon: '🔁', title: 'Trial ended win-back', desc: 'A week after the trial ends, change the headline to "Your projects are still here" and offer a limited discount or a trial extension in the plan card.' },
      { icon: '⬆', title: 'Free to paid upgrade nudge', desc: 'Send it to free-plan users who reach a usage limit, using the stats to show how close they are and the plan card to show what upgrading unlocks.' },
    ],
    faqs: [
      { q: 'When should I send a trial ending email?', a: 'Most SaaS teams send one reminder three to seven days before the trial ends and a final one on the last day. If your trial needs a card up front, also tell users when they will be charged.' },
      { q: 'How do I fill in the usage stats automatically?', a: 'Replace the sample numbers with your email platform\'s variables, such as {{ customer.projects_count }} in Customer.io or a property in HubSpot or Intercom. If you send from your own code, insert the values when you build the email.' },
      { q: 'What should a trial ending email include?', a: 'The end date, what the user has achieved, the plan and price that fits them, one clear upgrade button, and what happens if they don\'t upgrade. This template includes all of them.' },
      { q: 'Is a trial ending email transactional or marketing?', a: 'It is usually treated as marketing, because its main purpose is to sell a subscription, so it includes an unsubscribe link. A pure billing notice, such as "your card will be charged on Friday", is transactional.' },
      { q: 'Will the plan card look right in Outlook?', a: 'Yes. The card is a table with a coloured border, and the features are simple paragraphs with check marks, which Outlook\'s Word-based renderer handles reliably. Rounded corners are square in Outlook for Windows, which doesn\'t affect the layout.' },
    ],
  },

  'product-update': {
    keywords: ['product update email template', 'feature announcement email template', 'new feature email', 'saas product update email', 'changelog email template'],
    about: {
      title: 'Product Update Email — Free Feature Announcement Email Template',
      description: `**Product Update Email** is a free, responsive HTML template for announcing new features, releases and improvements to your users. Good product update emails bring people back into your app to try what's new, and they show that your product keeps getting better, which helps retention.

**What's in the email**

A header with your logo and a "Product update · October 2026" label, a feature image or screenshot, a "New" badge and headline, and a short intro that explains the problem the feature solves. Three highlights with icons, titles and one-line descriptions explain what it does, followed by a "Try it" button. An "Also new this month" box lists smaller improvements and links to your full changelog, and social links sit in the footer.

**Clear hierarchy that survives every inbox**

One big feature, three highlights and one button keep readers focused on a single action, while the changelog box covers the rest without clutter. The layout is built with tables and inline styles, the button is Outlook-safe, and the feature image has alt text for readers with images off. A dark palette and plain-text version are included.

**Send it from anywhere**

Copy the HTML into Mailchimp, HubSpot, Brevo, Customer.io, Loops or Intercom, or send it from your own code. Use it monthly as a release roundup, or for a single big launch. For regular content, see the [Newsletter](/email-templates/newsletter/) template, and for live demos of a new feature, the [Webinar Invitation](/email-templates/webinar-invitation/).`,
    },
    features: [
      'Header label for the update name and month',
      'Feature image or screenshot with alt text',
      '"New" badge and headline for the main feature',
      'Three highlights with emoji icons, titles and text',
      'Bulletproof "Try it" button for Outlook',
      '"Also new" changelog box with a full changelog link',
      'Social links in the footer',
      'Light and dark palettes, both editable',
      'Unsubscribe link and postal address',
      'Plain-text version generated automatically',
    ],
    why: [
      { icon: '🚀', title: 'Drives feature adoption', desc: 'Users can\'t benefit from features they don\'t know about. A focused announcement with one button brings people back to try what you built.' },
      { icon: '🔄', title: 'Shows momentum', desc: 'Regular updates prove the product is actively improving, which reassures paying customers and makes free users more likely to upgrade.' },
      { icon: '🧭', title: 'One clear action', desc: 'One headline feature, three highlights and one button keep the email skimmable, while smaller changes go in a tidy changelog box.' },
    ],
    useCases: [
      { icon: '✨', title: 'Major feature launch', desc: 'Announce a big new feature with a screenshot, three highlights explaining what it does and a button that opens it directly inside the app.' },
      { icon: '🗓', title: 'Monthly release roundup', desc: 'Send a "What\'s new in October" email with the biggest change as the headline and three or four smaller improvements in the "Also new" box.' },
      { icon: '🛠', title: 'Feature requested by customers', desc: 'Tell users "You asked, we built it" in the intro, credit the feedback that shaped the feature and link to a short help article or video.' },
      { icon: '📱', title: 'New app or integration', desc: 'Announce a mobile app or integration with a store badge or partner logo as the image and highlights for setup, sync and notifications.' },
    ],
    faqs: [
      { q: 'How often should I send product update emails?', a: 'Monthly works for most SaaS products, with a separate email for major launches. Too many updates train users to ignore them, so combine small changes into a roundup.' },
      { q: 'What makes a good feature announcement email?', a: 'Lead with the problem the feature solves, show it in an image, explain it in three short points and give one button to try it. Keep everything else in a short changelog list.' },
      { q: 'Should product updates go to all users?', a: 'Send them to users who opted in to product news. Updates promote your product, so they count as marketing email and need an unsubscribe link, which is already in the footer.' },
      { q: 'Can I use a GIF instead of a still image?', a: 'Yes. Upload an animated GIF or paste its URL in the feature image field. Keep it under about 1 MB, and remember Outlook on Windows shows only the first frame, so make that frame meaningful.' },
      { q: 'How do I send it from HubSpot or Mailchimp?', a: 'Pick your platform under Merge tags, then copy the HTML from the Export menu. In HubSpot create a custom-coded email or template; in Mailchimp choose "Code your own" and paste it in.' },
    ],
  },

  'webinar-invitation': {
    keywords: ['webinar invitation email template', 'event invitation email template', 'webinar email template', 'virtual event invite email', 'webinar registration email'],
    about: {
      title: 'Webinar Invitation Email — Free HTML Event Invite Template',
      description: `**Webinar Invitation Email** is a free, responsive HTML template for inviting people to a webinar, live demo, workshop or virtual event. A good invitation tells readers in seconds what they'll learn, when it happens and how to register, and makes saving the date effortless.

**What's in the email**

A "Free live webinar" label, the session title as the headline and a short promise of what people will take away. A details box lists the date, time (with time zones), length and where it happens, followed by a "Save my seat" button and an "Add to Google Calendar" link. A numbered three-point agenda, two hosts with initials avatars and roles, and a note that the recording will be sent to everyone who registers finish the email.

**No images needed**

Avatars are initials in coloured circles and every detail is real text, so the invitation looks complete even with images turned off and stays light, well under Gmail's clipping limit. The layout uses tables and inline styles, the button is Outlook-safe, and the hosts stack on phones. A dark palette and plain-text version are included.

**Promote it everywhere**

Link the button to Zoom, Livestorm, GoTo Webinar, Riverside or your own landing page, and copy the HTML into HubSpot, Mailchimp, Brevo or Customer.io. Use it for the invitation, then resend it as a reminder the day before. For launch announcements, pair it with the [Product Update](/email-templates/product-update/) template.`,
    },
    features: [
      'Details box with date, time zones, length and platform',
      'Bulletproof "Save my seat" registration button',
      '"Add to Google Calendar" link (or a hosted .ics file)',
      'Numbered three-point agenda',
      'Two hosts with initials avatars and roles',
      'Recording note for people who can\'t attend live',
      'No images required: everything is real text',
      'Light and dark palettes, both editable',
      'Unsubscribe link and postal address',
      'Plain-text version with every detail and link',
    ],
    why: [
      { icon: '📅', title: 'Answers "when?" instantly', desc: 'Date, time zones and length sit in one box near the top, so readers can decide in seconds whether they can attend.' },
      { icon: '🎯', title: 'Sells the outcome', desc: 'A headline promise and a three-point agenda explain what people will learn, which is what persuades them to register.' },
      { icon: '🎥', title: 'Wins registrations from no-shows', desc: 'The recording note gets busy people to register anyway, growing your list and giving you a reason to follow up.' },
    ],
    useCases: [
      { icon: '🎓', title: 'Educational webinar', desc: 'Invite your list to a practical session, list three things attendees will learn in the agenda, and link the button to your Zoom or Livestorm registration page.' },
      { icon: '🖥', title: 'Live product demo', desc: 'Invite trial users and leads to a live demo of a new feature, with a product manager and a customer as the two hosts and a live Q&A in the length line.' },
      { icon: '🔔', title: 'Reminder the day before', desc: 'Resend to registrants with the subject "Tomorrow:", the button changed to "Join the webinar" and the calendar link kept, so they don\'t forget.' },
      { icon: '🏢', title: 'In-person event or meetup', desc: 'Change "Where" to the venue address, swap the calendar link for a map link and use the agenda for the evening\'s schedule.' },
    ],
    faqs: [
      { q: 'When should I send a webinar invitation?', a: 'Send the first invitation one to two weeks before the event, a reminder a few days before, and a final reminder on the day or an hour before. Registrations often peak in the last few days.' },
      { q: 'How do I create an "Add to calendar" link?', a: 'For Google Calendar, use a link like https://calendar.google.com/calendar/render?action=TEMPLATE&text=Title&dates=20261112T160000Z/20261112T164500Z, with times in UTC. For Outlook and Apple Calendar, host an .ics file and link to it instead.' },
      { q: 'Should I list times in several time zones?', a: 'Yes, if your audience is international. Give the time in your main audience\'s zone first and one or two others, such as "11:00 AM ET · 4:00 PM GMT".' },
      { q: 'Can I add speaker photos?', a: 'The template uses initials avatars so it works without images. To use photos, fork it to My Code and replace the initials cell with an image tag, or add an Image section with a photo of your hosts.' },
      { q: 'Does a webinar invitation need an unsubscribe link?', a: 'Yes. Event invitations sent to a marketing list are commercial email under US CAN-SPAM, so they need an unsubscribe link and your postal address. Both are already in the footer.' },
    ],
  },

  'payment-reminder': {
    keywords: ['payment reminder email template', 'invoice reminder email', 'overdue invoice email template', 'friendly payment reminder email', 'invoice due email template'],
    about: {
      title: 'Payment Reminder Email — Free Invoice Reminder Email Template',
      description: `**Payment Reminder Email** is a free, responsive HTML template for politely chasing an unpaid invoice. It's built for freelancers, agencies, consultants and SaaS billing teams who want to get paid on time without sounding pushy: a status pill such as "Due in 3 days" or "Overdue by 7 days", a clear headline, the amount due in large type, the invoice details, a "Pay invoice" button, a link to the PDF, optional bank-transfer details and an "already paid?" note.

**Polite, clear and easy to pay**

Most late payments aren't refusals: the invoice got buried or the client couldn't find how to pay. That's why this template puts the amount and due date first and makes paying one click. A friendly tone works best for the first reminders, so the default copy is warm and the closing note offers help if anything on the invoice looks wrong. For later reminders, change the status pill and headline to be firmer while keeping the same layout.

**Everything the client needs in one place**

A details box lists the invoice number, what it's for, the issue date and the due date. The amount sits above it at 38 px so it's impossible to miss. If clients pay by bank transfer, switch on the bank details section, set in a monospaced font so account numbers are easy to copy correctly. The invoice PDF link sits under the button.

**Works with your invoicing tool**

Copy the HTML into Stripe, QuickBooks, FreshBooks, Xero, Zoho Invoice or your own billing code and replace the sample values with your tool's invoice variables. It's transactional, so it doesn't need an unsubscribe link. Send it a few days before the due date, on the due date and after it, and pair it with the [Payment Receipt](/email-templates/receipt/) once the money arrives.`,
    },
    features: [
      'Status pill for "due soon" or "overdue" reminders',
      'Amount due in large type above the invoice details',
      'Invoice number, project, issue date and due date box',
      'Bulletproof "Pay invoice" button for Outlook and Gmail',
      'Link to the invoice PDF',
      'Optional bank-transfer details in a copy-friendly monospaced font',
      '"Already paid?" note and a signed closing line',
      'Light and dark palettes, both editable',
      'Transactional footer without marketing content',
      'Plain-text version with the amount and payment link',
    ],
    why: [
      { icon: '💵', title: 'Get paid faster', desc: 'A clear amount, due date and one-click payment link remove the most common reasons invoices are paid late.' },
      { icon: '🤝', title: 'Firm but friendly', desc: 'Warm default copy keeps the client relationship intact, while the status pill makes the deadline unmistakable.' },
      { icon: '🔁', title: 'One layout for every reminder', desc: 'Change the pill and headline for the before, on and after due-date emails without redesigning anything.' },
    ],
    useCases: [
      { icon: '📅', title: 'Reminder before the due date', desc: 'Send it three to five days before an invoice is due with "Due in 3 days" in the pill, so clients can schedule the payment before it becomes late.' },
      { icon: '⚠️', title: 'Overdue invoice follow-up', desc: 'Change the pill to "Overdue by 7 days" and the headline to a firmer but polite line, and keep the payment link and bank details front and centre.' },
      { icon: '🧑‍💻', title: 'Freelancer and agency invoices', desc: 'Sign it with your own name and studio, mention the project in the details box, and offer to resend the invoice if the client cannot find it.' },
      { icon: '☁️', title: 'SaaS failed or upcoming payment', desc: 'Use it for annual renewals or failed card payments, with the button linking to the billing page where customers can update their card.' },
    ],
    faqs: [
      { q: 'How do I write a polite payment reminder email?', a: 'Lead with a friendly greeting, name the invoice, amount and due date, make paying one click, and offer help if anything looks wrong. Avoid blame: most late payments are simply forgotten. This template follows that structure, and the copy is fully editable.' },
      { q: 'When should I send payment reminders?', a: 'A common schedule is a reminder a few days before the due date, one on the due date, and follow-ups at 7, 14 and 30 days overdue, getting gradually firmer. Change the status pill and headline for each stage.' },
      { q: 'What subject line should I use?', a: 'Be clear and specific, for example "Reminder: invoice INV-1042 is due on October 23" or "Invoice INV-1042 is now 7 days overdue". Clear subjects get opened and are easy to find later.' },
      { q: 'Does a payment reminder need an unsubscribe link?', a: 'No. It concerns an existing transaction, so it is transactional email under US CAN-SPAM. Keep promotions out so it stays transactional.' },
      { q: 'Can I use it with Stripe, QuickBooks or FreshBooks?', a: 'Yes. Copy the HTML from the Export menu into your invoicing tool\'s custom email template, or send it from your own code, and replace the sample amount, dates and links with your tool\'s invoice variables.' },
    ],
  },

  're-engagement': {
    keywords: ['re-engagement email template', 'we miss you email template', 'win back email template', 'inactive customer email', 'reactivation email template'],
    about: {
      title: 'Re-engagement Email — Free "We Miss You" Win-Back Email Template',
      description: `**Re-engagement Email (We Miss You)** is a free, responsive HTML template for winning back inactive customers and subscribers. It combines the three things that make win-back emails work: a warm "We miss you" headline, a short list of what's new since their last visit, and a reason to return now, here a comeback discount code. One clear button brings them back.

**Honest list hygiene built in**

Re-engagement emails do two jobs: they win some people back, and they find the people who will never return. Sending to inactive addresses hurts your sender reputation and deliverability with Gmail and Yahoo, so the template ends with an honest "stay or go" section: people can click "Yes, keep me subscribed", and you can stop emailing anyone who doesn't. That keeps your list healthy and your open rates honest.

**What's new, not just "come back"**

A plain "we miss you" rarely works on its own. Three short items with icons show what has changed (new features, new products, new content), which gives lapsed users a genuine reason to look again. The optional comeback code in a dashed box adds a time-limited incentive for customers who need a nudge.

**Ready for your email platform**

Built with tables and inline styles, an Outlook-safe button, a dark palette and a plain-text version. Copy it into Klaviyo, Mailchimp, HubSpot, Customer.io or Braze and trigger it for people who haven't opened, clicked, logged in or bought in 60 to 180 days, depending on your business. It's marketing email, so the footer has an unsubscribe link and postal address. For subscribers who stay, follow up with your [Newsletter](/email-templates/newsletter/) or a [Product Update](/email-templates/product-update/).`,
    },
    features: [
      'Warm "We miss you" headline with a first-name merge tag',
      'Three "what\'s new" items with icons, titles and text',
      'Optional comeback discount code in a dashed box',
      'One centred, bulletproof call-to-action button',
      '"Stay or go" section with a keep-me-subscribed link',
      'Helps you clean inactive contacts from your list',
      'Light and dark palettes, both editable',
      'Unsubscribe link and postal address for CAN-SPAM',
      'Plain-text version generated automatically',
      'Show or hide the offer and the stay-or-go section',
    ],
    why: [
      { icon: '💌', title: 'Cheaper than finding new customers', desc: 'Winning back someone who already knows you usually costs far less than acquiring a new customer, and a single email can do it.' },
      { icon: '🧹', title: 'Keeps your list healthy', desc: 'The stay-or-go choice shows who still wants your emails, so you can remove inactive contacts and protect your deliverability.' },
      { icon: '✨', title: 'Gives a real reason to return', desc: 'Showing what\'s new since their last visit works better than a plain "come back", and the optional code adds urgency.' },
    ],
    useCases: [
      { icon: '😴', title: 'Inactive SaaS users', desc: 'Send it to users who have not logged in for 60 days, listing the features shipped since they left and linking straight to the dashboard.' },
      { icon: '🛍', title: 'Lapsed shoppers', desc: 'Win back customers who have not ordered in six months with new arrivals in the "what\'s new" list and a 20% comeback code valid for two weeks.' },
      { icon: '📭', title: 'Unengaged newsletter subscribers', desc: 'Ask subscribers who have not opened in 90 days whether they still want your emails, and remove anyone who does not click "keep me subscribed".' },
      { icon: '🏋️', title: 'Memberships and subscriptions', desc: 'Gyms, apps and clubs can invite cancelled or paused members back with what has improved and a free week or discounted first month.' },
    ],
    faqs: [
      { q: 'What is a re-engagement email?', a: 'An email sent to customers or subscribers who have stopped opening, clicking, logging in or buying, aimed at winning them back or confirming they no longer want your emails. It is also called a win-back or "we miss you" email.' },
      { q: 'When should I send a re-engagement email?', a: 'It depends on your buying cycle. Many SaaS products use 30 to 60 days without a login, stores 90 to 180 days without a purchase, and newsletters 90 days without an open. Send a short sequence of two or three emails, then remove people who do not respond.' },
      { q: 'What should a win-back email include?', a: 'A personal headline, what has changed since they left, an optional incentive, one clear button, and an easy way to stay subscribed or leave. This template includes all of them.' },
      { q: 'Should I remove people who don\'t re-engage?', a: 'Usually yes. Continuing to email inactive addresses lowers your engagement rates and can hurt deliverability with Gmail and Yahoo. Removing or suppressing them keeps your sender reputation healthy.' },
      { q: 'Does a re-engagement email need an unsubscribe link?', a: 'Yes. It is a marketing email under US CAN-SPAM, so it needs a working unsubscribe link and your postal address. Both are already in the footer.' },
    ],
  },

  'appointment-reminder': {
    keywords: ['appointment reminder email template', 'appointment confirmation email', 'booking reminder email template', 'patient appointment reminder email', 'reduce no-shows email'],
    about: {
      title: 'Appointment Reminder Email — Free Booking Reminder Email Template',
      description: `**Appointment Reminder Email** is a free, responsive HTML template for reminding clients and patients about upcoming bookings. It's designed for clinics, dentists, salons, spas, consultants, coaches, tutors and any service business that loses money when people don't show up. Reminders are one of the simplest ways to reduce no-shows, and making it easy to confirm or reschedule is what makes them work.

**Every detail at a glance**

A personal headline ("See you tomorrow, Jordan") sits above a details box with the service, who the appointment is with, the date, the time and length, and the address, plus a "Get directions" link to Google Maps. The details use small icons and a two-column layout, so people can scan them on a phone while they're on the way.

**Confirm, reschedule or cancel in one tap**

A large "Confirm appointment" button sits under the details, with "Reschedule", "Cancel" and "Add to calendar" links beside it. Letting people reschedule easily is better than a no-show: you can offer the time slot to someone else. A short "Before your visit" checklist covers arrival time and what to bring, and the cancellation policy closes the email.

**Works with your booking system**

The template is built with tables and inline styles, with an Outlook-safe button, a dark palette and a plain-text version. Copy it into your booking or practice-management software (Acuity, Calendly, SimplePractice, Square Appointments, Mindbody or your own system) and replace the sample values with its booking variables. It's transactional, so no unsubscribe link is needed. Send it 24 to 48 hours before the appointment, and use the [Webinar Invitation](/email-templates/webinar-invitation/) template for online events.`,
    },
    features: [
      'Personal headline with the client\'s first name',
      'Details box with service, provider, date, time and address',
      '"Get directions" link to Google Maps',
      'Bulletproof "Confirm appointment" button',
      'Reschedule, Cancel and Add to calendar links',
      '"Before your visit" checklist with check marks',
      'Cancellation policy and phone number',
      'Light and dark palettes, both editable',
      'Transactional footer without marketing content',
      'Plain-text version with every detail and link',
    ],
    why: [
      { icon: '📉', title: 'Fewer no-shows', desc: 'A timely reminder with one-tap confirm and reschedule links is one of the simplest, most effective ways to cut missed appointments.' },
      { icon: '🗓', title: 'Easy to act on', desc: 'Confirm, reschedule, cancel and add-to-calendar are all in one place, so clients do not need to call you.' },
      { icon: '🧾', title: 'Arrive prepared', desc: 'The checklist and directions mean clients arrive on time with what they need, which keeps your schedule running smoothly.' },
    ],
    useCases: [
      { icon: '🦷', title: 'Dental and medical practices', desc: 'Remind patients 48 hours ahead with the dentist\'s name, the clinic address and a checklist to bring insurance details and arrive ten minutes early.' },
      { icon: '💇', title: 'Salons, spas and beauty', desc: 'Confirm hair, nail or massage bookings with the stylist\'s name, the service length and a cancellation policy that protects your time slots.' },
      { icon: '💼', title: 'Consultants and coaches', desc: 'Remind clients of calls or sessions, change the location to a video link and use the checklist for what to prepare before the meeting.' },
      { icon: '🔧', title: 'Home services and repairs', desc: 'Tell customers when a technician will arrive, with the time window in the time field and the address shown so they can check it is correct.' },
    ],
    faqs: [
      { q: 'When should I send an appointment reminder email?', a: 'Most businesses send one 24 to 48 hours before the appointment, and some add a second reminder two hours before by SMS. For appointments booked weeks ahead, a reminder a week before also helps.' },
      { q: 'What should an appointment reminder include?', a: 'The service, who it is with, the date, time and length, the address or video link, a way to confirm, reschedule or cancel, and your cancellation policy. This template includes all of them.' },
      { q: 'Do appointment reminders reduce no-shows?', a: 'Yes. Reminders are one of the most widely recommended ways to reduce missed appointments, especially when they make confirming or rescheduling easy, so the slot can be reused instead of left empty.' },
      { q: 'Is an appointment reminder a transactional email?', a: 'Yes. It relates to a booking the customer made, so it does not need an unsubscribe link under US CAN-SPAM. Keep marketing out so it stays transactional.' },
      { q: 'Can I add the appointment to Google Calendar?', a: 'Yes. Paste a Google Calendar "TEMPLATE" link with the date and time, or a link to a hosted .ics file for Outlook and Apple Calendar, into the add-to-calendar field.' },
    ],
  },

  'birthday-email': {
    keywords: ['birthday email template', 'happy birthday email to customers', 'birthday coupon email', 'birthday discount email template', 'birthday email marketing'],
    about: {
      title: 'Birthday Email — Free Birthday Coupon Email Template for Customers',
      description: `**Birthday Email** is a free, responsive HTML template for wishing customers, members and subscribers a happy birthday, with a gift that brings them back. Birthday emails are one of the best-performing automated emails in email marketing because they're personal, expected and genuinely welcome, so they tend to see much higher opens and clicks than ordinary campaigns.

**Festive without being cluttered**

A confetti-and-cake hero image sets the mood, followed by an "It's your day" label, a big "Happy birthday, Jordan!" headline with a first-name merge tag and a short, warm message. The gift sits in its own bordered box: a label, the offer as a headline ("20% off anything"), the code in a dashed coupon and an expiry note. A "Claim your gift" button and a signed note finish the email.

**A gift that drives action**

A birthday discount or free gift gives the email a reason to act on, and a limited validity, such as 14 days or the birthday month, creates gentle urgency without feeling pushy. Switch the gift section off to send a pure greeting, or replace the code with a free item, double loyalty points or a free month.

**Set it and forget it**

Collect birthdays at sign-up, then set up a date-based automation in Klaviyo, Mailchimp, Shopify Email, HubSpot, Brevo or Omnisend that sends this email on the birthday or a few days before. The template is built with tables and inline styles, with an Outlook-safe button, a dark palette and a plain-text version. It's marketing email, so the footer includes an unsubscribe link and postal address. For seasonal greetings, see [Holiday Greetings](/email-templates/holiday-greetings/).`,
    },
    features: [
      'Confetti, balloons and cake hero image, or upload your own',
      '"Happy birthday" headline with a first-name merge tag',
      'Gift box with label, offer headline, code and expiry',
      'Bulletproof "Claim your gift" button',
      'Signed closing note from your team',
      'Social links in the footer',
      'Pink celebration palette plus an editable dark palette',
      'Unsubscribe link and postal address for CAN-SPAM',
      'Plain-text version generated automatically',
      'Show or hide the hero, gift and social sections',
    ],
    why: [
      { icon: '🎂', title: 'One of the best-performing automations', desc: 'Birthday emails are personal and welcome, so they get far more attention than regular campaigns and earn revenue on autopilot.' },
      { icon: '🎁', title: 'A reason to come back', desc: 'A time-limited gift turns a nice greeting into a visit or purchase, while still feeling like a present, not an ad.' },
      { icon: '♾', title: 'Set up once', desc: 'Connect it to a date-based automation and it sends itself to every customer on their birthday, every year.' },
    ],
    useCases: [
      { icon: '🛍', title: 'Online store birthday discount', desc: 'Send customers 20% off anything on their birthday, valid for 14 days, with the code in the gift box and the button linking to your bestsellers.' },
      { icon: '☕', title: 'Restaurant or café birthday treat', desc: 'Offer a free dessert or drink on their birthday week, replacing the code with "Show this email in store" in the gift box.' },
      { icon: '⭐', title: 'Loyalty programme reward', desc: 'Give members double points or a free item for their birthday month, with the gift headline describing the reward and a link to their account.' },
      { icon: '💻', title: 'SaaS and app birthday greeting', desc: 'Wish users a happy birthday with a free month or upgrade, a simple way to make a software product feel more personal.' },
    ],
    faqs: [
      { q: 'What should a birthday email to customers say?', a: 'Keep it short and personal: use their name, wish them a happy birthday, thank them for being a customer and offer a gift with a clear way to claim it. This template follows that structure.' },
      { q: 'When should I send a birthday email?', a: 'On the morning of their birthday works well, or a few days before if the gift is meant to be used on the day. Give the gift a validity of one to two weeks or the whole birthday month.' },
      { q: 'How do I collect customer birthdays?', a: 'Add an optional birthday field (month and day are enough) to your sign-up form, account page or loyalty programme, and explain that it is for a birthday gift. Store it in your email platform as a date property.' },
      { q: 'How do I automate birthday emails in Klaviyo or Mailchimp?', a: 'Copy the HTML from the Export menu into a custom HTML template, then create a date-based flow or automation triggered by the birthday property. Pick your platform under Merge tags so the first name converts automatically.' },
      { q: 'Does a birthday email need an unsubscribe link?', a: 'Yes. It promotes your business with an offer, so it is commercial email under US CAN-SPAM and needs an unsubscribe link and your postal address. Both are in the footer.' },
    ],
  },

  'nps-survey': {
    keywords: ['nps survey email template', 'customer feedback email template', 'net promoter score email', 'survey email template', 'customer satisfaction survey email'],
    about: {
      title: 'NPS Survey Email — Free Net Promoter Score Feedback Email Template',
      description: `**NPS Survey Email** is a free, responsive HTML template for measuring Net Promoter Score (NPS) right inside the inbox. It asks the classic question, "How likely are you to recommend us to a friend or colleague?", with a row of eleven clickable scores from 0 to 10. One click records the answer, which is why one-question, in-email surveys get far more responses than a link to a long form.

**One click from the inbox**

Email can't run forms reliably, so each number is a normal link: the score is added to the end of your survey link, for example \`…&score=9\`, and your survey tool or landing page records it and can ask a follow-up question. Scores 0 to 6 have a light red tint, 7 and 8 amber and 9 and 10 green, a subtle nod to how NPS groups detractors, passives and promoters, with "Not at all likely" and "Extremely likely" labels under the ends of the scale.

**How NPS works**

Net Promoter Score is the percentage of promoters (9–10) minus the percentage of detractors (0–6), giving a number from −100 to 100. It's one of the most widely used customer loyalty metrics, and tracking it over time shows whether customer experience is improving. The optional "Share detailed feedback" button lets people who want to say more go straight to a longer form.

**Works with your survey tool**

Use it with Delighted, Typeform, SurveyMonkey, Hotjar, Qualtrics, Google Forms or your own endpoint, and send it from Customer.io, HubSpot, Intercom, Klaviyo or your own code. Built with tables and inline styles, an Outlook-safe button, a dark palette and a plain-text version that lists a link for each score. Send it after a customer has had time to experience your product, for example 30 to 90 days after sign-up, and use the [Review Request](/email-templates/review-request/) template for product reviews.`,
    },
    features: [
      'Classic NPS question as the headline',
      'Eleven one-click scores from 0 to 10',
      'Score added to your survey link automatically',
      'Subtle detractor, passive and promoter tints',
      '"Not at all likely" and "Extremely likely" labels',
      'Time estimate to boost response rates',
      'Optional "Share detailed feedback" button',
      'Signed thank-you note from a real person',
      'Light and dark palettes, both editable',
      'Plain-text version with a link for every score',
    ],
    why: [
      { icon: '☝', title: 'Answer in one click', desc: 'People can respond without leaving their inbox, which gets far more answers than asking them to open a long survey.' },
      { icon: '📈', title: 'Track loyalty over time', desc: 'NPS is a widely used loyalty metric, so regular surveys show whether your product and service are getting better.' },
      { icon: '🔎', title: 'Find problems early', desc: 'Low scores flag unhappy customers before they leave, and the reply-to note gives them an easy way to tell you why.' },
    ],
    useCases: [
      { icon: '☁️', title: 'SaaS relationship NPS', desc: 'Survey active users every quarter to track loyalty over time, linking the scores to your survey tool and following up personally with detractors.' },
      { icon: '📦', title: 'Post-purchase satisfaction', desc: 'Ask customers how likely they are to recommend your store a week after delivery, then send promoters a review request or referral offer.' },
      { icon: '🎧', title: 'After a support conversation', desc: 'Change the question to "How satisfied were you with our support?" and send it when a ticket closes to measure your support quality.' },
      { icon: '🎓', title: 'Courses, events and memberships', desc: 'Survey attendees after a course or event to learn what to improve, with the detailed feedback button linking to a short form.' },
    ],
    faqs: [
      { q: 'What is an NPS survey email?', a: 'An email that asks one question, how likely the customer is to recommend you on a scale of 0 to 10, so you can calculate your Net Promoter Score. The best NPS emails let people answer with one click from the inbox.' },
      { q: 'How is NPS calculated?', a: 'Subtract the percentage of detractors (scores 0 to 6) from the percentage of promoters (scores 9 and 10). Passives (7 and 8) count toward the total responses but not either group. The result ranges from −100 to 100.' },
      { q: 'How do the clickable scores work?', a: 'Each number links to your survey link with the score added at the end, for example https://yoursite.com/survey?score=9. Your survey tool or landing page reads the score, records it and can ask an optional follow-up question.' },
      { q: 'When should I send an NPS survey?', a: 'After customers have had enough time to form an opinion, such as 30 to 90 days after sign-up or a week after delivery, and then every few months. Avoid surveying the same person too often.' },
      { q: 'Does an NPS survey email need an unsubscribe link?', a: 'It is safest to include one, especially if you survey customers regularly, so the footer has an unsubscribe link and your postal address.' },
    ],
  },
};

export const EMAIL_DIFFERENT = [
  { icon: '</>', title: 'Real email HTML you own', desc: 'Not a locked design inside a sending platform. Copy production-ready HTML, download a .html file or fork it into My Code, and use it with any email service or your own code.' },
  { icon: '⚙', title: 'Coded for real inboxes', desc: 'Tables, inline styles, Outlook conditional comments, a VML button and Outlook font fixes. Many free templates only look right in a browser.' },
  { icon: '◐', title: 'Dark mode built in', desc: 'Separate, editable light and dark palettes, with a dark preview, instead of leaving dark mode to each email client.' },
  { icon: '✓', title: 'Checks before you send', desc: 'Warnings for Gmail clipping, missing alt text, placeholder links, images that aren\'t hosted online, and a missing unsubscribe link or postal address.' },
  { icon: '¶', title: 'Plain-text version included', desc: 'A matching plain-text version is generated as you edit, ready for multipart emails and the clients and filters that read text.' },
  { icon: '◍', title: 'Free and private', desc: 'No account, no watermark and no limits. Everything runs in your browser, and your edits are saved locally for next time.' },
];
