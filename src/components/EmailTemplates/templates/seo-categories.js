/* Landing-page content for each email category (/email-templates/category/<id>/).
   Titles 50-60 characters, descriptions 150-160, written around what people search for. */

import { EMAIL_CATEGORY_MORE } from './seo-categories-more.js';

export const EMAIL_CATEGORY_SEO = {
  onboarding: {
    title: 'Lifecycle Email Templates — Welcome, Win-Back & Birthday',
    description: 'Free lifecycle email templates: welcome, trial ending, re-engagement, birthday, NPS survey and cancellation emails. Responsive, Outlook-safe, dark mode HTML.',
    h1: 'Onboarding & Lifecycle Email Templates',
    keywords: ['lifecycle email templates', 'welcome email template', 're-engagement email template', 'birthday email template', 'nps survey email template'],
    intro: `Lifecycle emails follow a customer from the day they sign up to the day they become a fan, and they quietly earn more than most campaigns because each one arrives at exactly the right moment. A welcome email is the most-opened message you will ever send, a trial-ending reminder is where engaged users decide to pay, a birthday email gives loyal customers a reason to come back, a re-engagement email wins back people who drifted away, and an NPS survey tells you how all of it is working.

This category covers that whole journey: the **[Welcome Email](/email-templates/welcome/)**, **[Trial Ending](/email-templates/trial-ending/)**, **[Re-engagement (We Miss You)](/email-templates/re-engagement/)**, **[Birthday Email](/email-templates/birthday-email/)** and **[NPS Survey](/email-templates/nps-survey/)** and **[Subscription Cancellation](/email-templates/subscription-cancelled/)** templates. Every one is built with tables and inline styles, so it holds up in Gmail, Outlook and Apple Mail, ships with a dark palette and a plain-text version, and converts first names and unsubscribe links for Mailchimp, Klaviyo, HubSpot or Brevo. Trigger them from Customer.io, Intercom, Loops, Klaviyo or your own code.`,
    faqs: [
      { q: 'What are lifecycle emails?', a: 'Automated emails triggered by where a customer is in their relationship with you: welcome and onboarding emails after sign-up, trial and upgrade reminders, birthday and loyalty emails, win-back emails for inactive customers, and feedback surveys. They usually perform better than one-off campaigns because they are timely and relevant.' },
      { q: 'When should I send a re-engagement email?', a: 'When someone has stopped engaging for longer than your normal buying or usage cycle, for example 60 days without a login for SaaS or 90 to 180 days without a purchase for a store. Send two or three emails, then remove people who do not respond to protect your deliverability.' },
      { q: 'Are onboarding and lifecycle emails marketing or transactional?', a: 'Most are marketing, since they promote your product, so they should include an unsubscribe link and your postal address. Pure account messages, such as verifying an email address, are transactional; use the Verify Email template for those.' },
    ],
  },
  transactional: {
    title: 'Transactional Email Templates — Free Account & Billing HTML',
    description: 'Free transactional email templates: verification, password reset, magic link, security alert, receipt, payment and appointment reminders. Outlook-safe.',
    h1: 'Transactional Email Templates',
    keywords: ['transactional email templates', 'password reset email template', 'email verification template', 'payment reminder email template', 'appointment reminder email template'],
    intro: `Transactional emails are the ones people actually wait for: the link to confirm an account, the code to sign in, the link to reset a password and the receipt for a payment. They are triggered by something the user just did, they are opened almost every time, and when they look broken or suspicious people lose trust in your product.

These templates cover the core account and billing flows, **[Verify Email Address](/email-templates/verify-email/)**, **[Password Reset](/email-templates/password-reset/)**, **[Magic Link Sign-in](/email-templates/magic-link/)**, **[New Sign-in Security Alert](/email-templates/security-alert/)**, **[Payment Receipt](/email-templates/receipt/)**, **[Payment Reminder](/email-templates/payment-reminder/)** for unpaid invoices and **[Appointment Reminder](/email-templates/appointment-reminder/)** for bookings, with a shared, consistent look. Each one keeps marketing out, puts the important detail (the button, the code, the amount) first, prints a fallback link for clients that block buttons, and includes request details that help people trust the email. Send them from Postmark, SendGrid, Amazon SES, Resend, Stripe, Auth0, Supabase, Firebase or your own code. Store emails such as order confirmations and shipping updates are in [E-commerce Email Templates](/email-templates/category/ecommerce/).`,
    faqs: [
      { q: 'What is a transactional email?', a: 'An email sent in direct response to something a user did or to their account: password resets, verification codes, sign-in links, receipts and security alerts. Promotional emails, such as newsletters and sales, are marketing email.' },
      { q: 'Do transactional emails need an unsubscribe link?', a: 'No. Under US CAN-SPAM, emails whose main purpose is transactional don\'t need an unsubscribe link. They should still identify the sender, and adding marketing content can turn them into commercial email, so keep promotions out.' },
      { q: 'Which service should I send transactional email from?', a: 'Use a provider built for it, such as Postmark, Amazon SES, SendGrid, Mailgun or Resend, ideally on a separate sending domain or stream from your marketing email. Copy the HTML and the plain-text version from the editor into your provider\'s template.' },
    ],
  },
  ecommerce: {
    title: 'E-commerce Email Templates — Free Shopify & Store HTML',
    description: 'Free e-commerce email templates: abandoned cart, back in stock, order and shipping confirmation, refund and review request emails for Shopify and Klaviyo.',
    h1: 'E-commerce Email Templates',
    keywords: ['ecommerce email templates', 'shopify email templates', 'abandoned cart email template', 'back in stock email template', 'refund confirmation email template'],
    intro: `An online store's automated emails follow the customer from cart to doorstep, and together they earn a large share of email revenue. The abandoned cart email wins back shoppers who left, the order confirmation reassures them the moment they pay, the shipping confirmation answers "where is my order?" before they ask, and the review request turns happy customers into social proof for the next buyer.

These templates cover that whole journey with one consistent look: **[Abandoned Cart](/email-templates/abandoned-cart/)**, **[Back in Stock](/email-templates/back-in-stock/)**, **[Order Confirmation](/email-templates/order-confirmation/)**, **[Shipping Confirmation](/email-templates/shipping-confirmation/)**, **[Refund Confirmation](/email-templates/refund-confirmation/)** and **[Review Request](/email-templates/review-request/)**. Product rows, prices, a delivery progress bar and clickable star ratings are all built with tables and inline styles, so they line up in Gmail, Apple Mail and Outlook on Windows. Copy the HTML into Shopify notifications, Shopify Email, Klaviyo, Omnisend, WooCommerce or Mailchimp and swap the sample values for your platform's variables.`,
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
    keywords: ['marketing email templates', 'newsletter email template', 'black friday email template', 'product update email template', 'referral email template'],
    intro: `Marketing emails compete with dozens of others in the same inbox, so they have to communicate in seconds: a clear hierarchy, one main call to action, and design that survives Gmail, Outlook and dark mode. These templates are built around that, with your brand colour and fonts and footers that already meet the US CAN-SPAM rules and the Gmail and Yahoo bulk-sender requirements.

Use the **[Newsletter](/email-templates/newsletter/)** for weekly or monthly digests, the **[Product Update](/email-templates/product-update/)** to announce new features, and the **[Webinar Invitation](/email-templates/webinar-invitation/)** to fill live sessions and demos, and the **[Refer a Friend](/email-templates/refer-a-friend/)** email to grow through your happiest customers. For sales, the **[Black Friday Sale](/email-templates/black-friday-sale/)** email launches the offer and the **[Last Chance Sale](/email-templates/last-chance-sale/)** email closes it: Black Friday 2026 is November 27 and Cyber Monday is November 30. Paste the HTML into Mailchimp, Klaviyo, HubSpot, Kit, Beehiiv, Brevo, Omnisend or Shopify Email.`,
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

// More intro text and FAQs per category (seo-categories-more.js)
for (const [id, more] of Object.entries(EMAIL_CATEGORY_MORE)) {
  const c = EMAIL_CATEGORY_SEO[id];
  if (c) { c.intro = `${c.intro}

${more.intro}`; c.faqs = [...c.faqs, ...more.faqs]; }
}
