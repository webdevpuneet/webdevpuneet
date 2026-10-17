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
};

export const EMAIL_DIFFERENT = [
  { icon: '</>', title: 'Real email HTML you own', desc: 'Not a locked design inside a sending platform. Copy production-ready HTML, download a .html file or fork it into My Code, and use it with any email service or your own code.' },
  { icon: '⚙', title: 'Coded for real inboxes', desc: 'Tables, inline styles, Outlook conditional comments, a VML button and Outlook font fixes. Many free templates only look right in a browser.' },
  { icon: '◐', title: 'Dark mode built in', desc: 'Separate, editable light and dark palettes, with a dark preview, instead of leaving dark mode to each email client.' },
  { icon: '✓', title: 'Checks before you send', desc: 'Warnings for Gmail clipping, missing alt text, placeholder links, images that aren\'t hosted online, and a missing unsubscribe link or postal address.' },
  { icon: '¶', title: 'Plain-text version included', desc: 'A matching plain-text version is generated as you edit, ready for multipart emails and the clients and filters that read text.' },
  { icon: '◍', title: 'Free and private', desc: 'No account, no watermark and no limits. Everything runs in your browser, and your edits are saved locally for next time.' },
];
