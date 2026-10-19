/* Landing-page content for each email category (/email-templates/category/<id>/).
   Titles 50-60 characters, descriptions 150-160, written around what people search for. */

export const EMAIL_CATEGORY_SEO = {
  onboarding: {
    title: 'Onboarding Email Templates — Free Welcome & Trial Emails',
    description: 'Free onboarding and lifecycle email templates: SaaS welcome emails and trial-ending reminders. Responsive, Outlook-safe and dark mode ready. Copy the HTML.',
    h1: 'Onboarding & Lifecycle Email Templates',
    keywords: ['onboarding email template', 'welcome email template', 'trial ending email template', 'saas lifecycle email', 'html welcome email'],
    intro: `The emails a new user gets in their first weeks decide whether they become a paying customer. A welcome email is opened far more often than a typical campaign, which makes it the best moment to say thank you and point people to the one action that gets them started. A trial-ending reminder, sent a few days before the trial expires, is where engaged users decide to upgrade.

These templates cover both moments with the structure lifecycle teams use: a warm headline, one clear call to action, a few numbered first steps or usage stats, a plan card and a personal note, with your logo, colours and fonts. Every one is built with tables and inline styles, so it holds up in Gmail, Outlook and Apple Mail, and each ships with a dark palette and a plain-text version. Send them from Customer.io, Intercom, HubSpot, Loops, Mailchimp or your own code.`,
    faqs: [
      { q: 'What should a welcome email include?', a: 'A thank-you, one clear next step as a button, a short list of what to do first, a way to get help, and the legal footer. Keep it short: the goal is to get people back into your product, not to tell them everything at once.' },
      { q: 'When should I send a trial ending email?', a: 'Three to seven days before the trial ends, with a final reminder on the last day. Show what the user has achieved, the plan that fits them and what happens to their data if they don\'t upgrade.' },
      { q: 'Are onboarding emails marketing or transactional?', a: 'Usually marketing, since they promote your product, so they should include an unsubscribe link and your postal address. A pure account-confirmation email with no promotion is transactional; use the Verify Email template for that.' },
    ],
  },
  transactional: {
    title: 'Transactional Email Templates — Free Account & Billing HTML',
    description: 'Free transactional email templates: email verification, password reset, magic link sign-in and payment receipts. Responsive, Outlook-safe and dark mode ready.',
    h1: 'Transactional Email Templates',
    keywords: ['transactional email templates', 'password reset email template', 'email verification template', 'magic link email template', 'receipt email template'],
    intro: `Transactional emails are the ones people actually wait for: the link to confirm an account, the code to sign in, the link to reset a password and the receipt for a payment. They are triggered by something the user just did, they are opened almost every time, and when they look broken or suspicious people lose trust in your product.

These templates cover the core account and billing flows, **[Verify Email Address](/email-templates/verify-email/)**, **[Password Reset](/email-templates/password-reset/)**, **[Magic Link Sign-in](/email-templates/magic-link/)** and **[Payment Receipt](/email-templates/receipt/)**, with a shared, consistent look. Each one keeps marketing out, puts the important detail (the button, the code, the amount) first, prints a fallback link for clients that block buttons, and includes request details that help people trust the email. Send them from Postmark, SendGrid, Amazon SES, Resend, Stripe, Auth0, Supabase, Firebase or your own code. Store emails such as order confirmations and shipping updates are in [E-commerce Email Templates](/email-templates/category/ecommerce/).`,
    faqs: [
      { q: 'What is a transactional email?', a: 'An email sent in direct response to something a user did or to their account: password resets, verification codes, sign-in links, receipts and security alerts. Promotional emails, such as newsletters and sales, are marketing email.' },
      { q: 'Do transactional emails need an unsubscribe link?', a: 'No. Under US CAN-SPAM, emails whose main purpose is transactional don\'t need an unsubscribe link. They should still identify the sender, and adding marketing content can turn them into commercial email, so keep promotions out.' },
      { q: 'Which service should I send transactional email from?', a: 'Use a provider built for it, such as Postmark, Amazon SES, SendGrid, Mailgun or Resend, ideally on a separate sending domain or stream from your marketing email. Copy the HTML and the plain-text version from the editor into your provider\'s template.' },
    ],
  },
  ecommerce: {
    title: 'E-commerce Email Templates — Free Shopify & Store HTML',
    description: 'Free e-commerce email templates: abandoned cart, order confirmation, shipping confirmation and review request. Responsive HTML for Shopify, Klaviyo and more.',
    h1: 'E-commerce Email Templates',
    keywords: ['ecommerce email templates', 'shopify email templates', 'abandoned cart email template', 'order confirmation email template', 'shipping confirmation email template'],
    intro: `An online store's automated emails follow the customer from cart to doorstep, and together they earn a large share of email revenue. The abandoned cart email wins back shoppers who left, the order confirmation reassures them the moment they pay, the shipping confirmation answers "where is my order?" before they ask, and the review request turns happy customers into social proof for the next buyer.

These templates cover that whole journey with one consistent look: **[Abandoned Cart](/email-templates/abandoned-cart/)**, **[Order Confirmation](/email-templates/order-confirmation/)**, **[Shipping Confirmation](/email-templates/shipping-confirmation/)** and **[Review Request](/email-templates/review-request/)**. Product rows, prices, a delivery progress bar and clickable star ratings are all built with tables and inline styles, so they line up in Gmail, Apple Mail and Outlook on Windows. Copy the HTML into Shopify notifications, Shopify Email, Klaviyo, Omnisend, WooCommerce or Mailchimp and swap the sample values for your platform's variables.`,
    faqs: [
      { q: 'Which automated emails should every online store send?', a: 'At minimum: an order confirmation, a shipping confirmation and an abandoned cart reminder. A review request after delivery and a welcome email for new subscribers are the next most valuable. Together they cover the full purchase journey.' },
      { q: 'How do I use these templates in Shopify?', a: 'For order and shipping emails, go to Settings, then Notifications in Shopify admin, open the notification, replace the code with this HTML and swap the sample values for Shopify\'s Liquid variables. For abandoned cart and review emails, use Shopify Email, Klaviyo or another app with custom HTML.' },
      { q: 'Do store emails need an unsubscribe link?', a: 'Order and shipping confirmations are transactional and don\'t need one. Abandoned cart and review request emails promote a purchase or your store, so they are treated as marketing and include an unsubscribe link and postal address.' },
    ],
  },
  marketing: {
    title: 'Marketing Email Templates — Free Newsletter, Sale & Webinar',
    description: 'Free marketing email templates: newsletters, product updates, webinar invites, Black Friday and last chance sales. Responsive HTML with CAN-SPAM-ready footers.',
    h1: 'Marketing Email Templates',
    keywords: ['marketing email templates', 'newsletter email template', 'black friday email template', 'product update email template', 'webinar invitation email template'],
    intro: `Marketing emails compete with dozens of others in the same inbox, so they have to communicate in seconds: a clear hierarchy, one main call to action, and design that survives Gmail, Outlook and dark mode. These templates are built around that, with your brand colour and fonts and footers that already meet the US CAN-SPAM rules and the Gmail and Yahoo bulk-sender requirements.

Use the **[Newsletter](/email-templates/newsletter/)** for weekly or monthly digests, the **[Product Update](/email-templates/product-update/)** to announce new features, and the **[Webinar Invitation](/email-templates/webinar-invitation/)** to fill live sessions and demos. For sales, the **[Black Friday Sale](/email-templates/black-friday-sale/)** email launches the offer and the **[Last Chance Sale](/email-templates/last-chance-sale/)** email closes it: Black Friday 2026 is November 27 and Cyber Monday is November 30. Paste the HTML into Mailchimp, Klaviyo, HubSpot, Kit, Beehiiv, Brevo, Omnisend or Shopify Email.`,
    faqs: [
      { q: 'What do marketing emails legally need?', a: 'In the US, CAN-SPAM requires an honest sender and subject line, a working unsubscribe link and a valid postal address. Gmail and Yahoo also require bulk senders to support one-click unsubscribe. Every marketing template here includes an unsubscribe link, a preferences link and an address field.' },
      { q: 'How do I use these templates in Mailchimp or Klaviyo?', a: 'Pick your platform under Merge tags in the editor, then copy the HTML from the Export menu. In Mailchimp choose "Code your own"; in Klaviyo create an HTML template. First names and the unsubscribe link are converted to the platform\'s syntax automatically.' },
      { q: 'How big can a marketing email be?', a: 'Keep the HTML under 102 KB, or Gmail clips the message and hides the rest, including your unsubscribe link. The editor shows the size and warns you when you get close.' },
    ],
  },
  holidays: {
    title: 'Holiday Email Templates — Free Christmas & Gift Guide HTML',
    description: 'Free holiday email templates: a Christmas gift guide with a product grid and a season\'s greetings email with an offer and holiday hours. Responsive HTML.',
    h1: 'Holiday & Seasonal Email Templates',
    keywords: ['holiday email templates', 'christmas email template', 'holiday gift guide email', 'season\'s greetings email template', 'new year email template'],
    intro: `The holiday season is the busiest time of the year for email: shoppers look for gift ideas, brands thank their customers, and everyone needs to know shipping cut-offs and holiday hours. Seasonal emails work best when they feel festive but stay clear, with the important dates and the main button easy to find on a phone.

Use the **[Holiday Gift Guide](/email-templates/holiday-gift-guide/)** to show your best gifts in a 2×2 product grid with tags such as "Under $25" and an "order by" shipping banner, and the **[Holiday Greetings](/email-templates/holiday-greetings/)** email to send a warm season's greetings or happy new year message with an optional thank-you offer and your holiday opening hours. Both work for Christmas, Hanukkah, the New Year and other celebrations by changing the image, colours and words. For sales, see the [Black Friday](/email-templates/black-friday-sale/) and [Last Chance](/email-templates/last-chance-sale/) templates.`,
    faqs: [
      { q: 'When should I send holiday emails in 2026?', a: 'Gift guides work from mid-November, around Black Friday (November 27), through early December. Send shipping cut-off reminders in the second and third weeks of December, and season\'s greetings one to two weeks before Christmas or around New Year.' },
      { q: 'Can I use these templates for holidays other than Christmas?', a: 'Yes. Change the hero image, colours, label and wording for Hanukkah, Diwali, Lunar New Year, Thanksgiving, Valentine\'s Day or Mother\'s Day. The layouts work for any seasonal campaign.' },
      { q: 'Do holiday emails need an unsubscribe link?', a: 'Yes, when you send them to a marketing list. Gift guides and greetings promote your brand, so they count as commercial email under US CAN-SPAM. Both templates include an unsubscribe link and a postal address.' },
    ],
  },
};
