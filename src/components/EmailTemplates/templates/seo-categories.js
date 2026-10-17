/* Landing-page content for each email category (/email-templates/category/<id>/).
   Titles 50-60 characters, descriptions 150-160, written around what people search for. */

export const EMAIL_CATEGORY_SEO = {
  onboarding: {
    title: 'Welcome & Onboarding Email Templates — Free HTML Emails',
    description: 'Free welcome and onboarding email templates for SaaS, apps and stores. Responsive, Outlook-safe and dark mode ready. Edit online, then copy the HTML or fork it.',
    h1: 'Welcome & Onboarding Email Templates',
    keywords: ['welcome email template', 'onboarding email template', 'saas welcome email', 'new user email template', 'html welcome email'],
    intro: `The first emails a new user gets decide whether they come back. A welcome email is opened far more often than a typical campaign, which makes it the best moment to say thank you, set expectations and point people to the one action that gets them started. Onboarding emails then keep that momentum going over the first days and weeks.

These templates follow the structure that onboarding teams use: a warm headline, a short intro, one clear call to action, a few numbered first steps and a personal note, with your logo, colours and fonts. Every one is built with tables and inline styles, so it holds up in Gmail, Outlook and Apple Mail, and each ships with a dark palette and a plain-text version.`,
    faqs: [
      { q: 'What should a welcome email include?', a: 'A thank-you, one clear next step as a button, a short list of what to do first, a way to get help, and the legal footer. Keep it short: the goal is to get people back into your product, not to tell them everything at once.' },
      { q: 'When should I send a welcome email?', a: 'Immediately after sign-up, triggered by your app or email platform. People are most engaged in the first minutes, and a delay makes the email feel disconnected from what they just did.' },
      { q: 'Is a welcome email marketing or transactional?', a: 'Usually marketing, since it promotes your product, so it should include an unsubscribe link and your postal address. A pure account-confirmation email with no promotion is transactional; use the Verify Email template for that.' },
    ],
  },
  transactional: {
    title: 'Transactional Email Templates — Free HTML Receipts & More',
    description: 'Free transactional email templates: password reset, email verification, order confirmation and receipts. Responsive, Outlook-safe and dark mode. Copy the HTML.',
    h1: 'Transactional Email Templates',
    keywords: ['transactional email templates', 'password reset email template', 'email verification template', 'order confirmation email template', 'receipt email template'],
    intro: `Transactional emails are the ones people actually wait for: the code to log in, the link to reset a password, the confirmation that an order went through and the receipt for a payment. They are triggered by something the user just did, they are opened almost every time, and when they look broken or suspicious people lose trust in your product.

These templates cover the core flows, **[Verify Email Address](/email-templates/verify-email/)**, **[Password Reset](/email-templates/password-reset/)**, **[Order Confirmation](/email-templates/order-confirmation/)** and **[Payment Receipt](/email-templates/receipt/)**, with a shared, consistent look. Each one keeps marketing out, puts the important detail (the button, the code, the order number, the amount) first, prints a fallback link for clients that block buttons, and includes request details or summaries that help people trust the email. Send them from Postmark, SendGrid, Amazon SES, Resend, Stripe, Shopify, Auth0, Supabase or your own code.`,
    faqs: [
      { q: 'What is a transactional email?', a: 'An email sent in direct response to something a user did or to their account: password resets, verification codes, order confirmations, receipts, shipping updates and security alerts. Promotional emails, such as newsletters and sales, are marketing email.' },
      { q: 'Do transactional emails need an unsubscribe link?', a: 'No. Under US CAN-SPAM, emails whose main purpose is transactional don\'t need an unsubscribe link. They should still identify the sender, and adding marketing content can turn them into commercial email, so keep promotions out.' },
      { q: 'Which service should I send transactional email from?', a: 'Use a provider built for it, such as Postmark, Amazon SES, SendGrid, Mailgun or Resend, ideally on a separate sending domain or stream from your marketing email. Copy the HTML and the plain-text version from the editor into your provider\'s template.' },
    ],
  },
  marketing: {
    title: 'Marketing Email Templates — Free HTML Newsletter & Sale',
    description: 'Free marketing email templates: newsletters, Black Friday and Cyber Monday sales and promos. Responsive, dark mode and CAN-SPAM-ready footers. Copy the HTML.',
    h1: 'Marketing Email Templates',
    keywords: ['marketing email templates', 'newsletter email template', 'black friday email template', 'promotional email template', 'free html email templates'],
    intro: `Marketing emails compete with dozens of others in the same inbox, so they have to communicate in seconds: a clear hierarchy, one main call to action, and design that survives Gmail, Outlook and dark mode. These templates are built around that, with your brand colour and fonts and footers that already meet the US CAN-SPAM rules and the Gmail and Yahoo bulk-sender requirements.

Use the **[Newsletter](/email-templates/newsletter/)** for weekly or monthly digests, product updates and creator letters, with a featured story, three summaries and a tip box. Use the **[Black Friday Sale](/email-templates/black-friday-sale/)** email for Black Friday (November 27, 2026), Cyber Monday (November 30, 2026) and any flash sale, with a bold hero, a promo-code box, a deadline and product picks. Paste the HTML into Mailchimp, Klaviyo, Kit, Beehiiv, Brevo, Omnisend or Shopify Email.`,
    faqs: [
      { q: 'What do marketing emails legally need?', a: 'In the US, CAN-SPAM requires an honest sender and subject line, a working unsubscribe link and a valid postal address. Gmail and Yahoo also require bulk senders to support one-click unsubscribe. Every marketing template here includes an unsubscribe link, a preferences link and an address field.' },
      { q: 'How do I use these templates in Mailchimp or Klaviyo?', a: 'Edit the template, click "Copy HTML", then create a custom-HTML or "code your own" template in your platform and paste it in. Replace the unsubscribe link with the platform\'s merge tag, such as *|UNSUB|* in Mailchimp or {% unsubscribe %} in Klaviyo.' },
      { q: 'How big can a marketing email be?', a: 'Keep the HTML under 102 KB, or Gmail clips the message and hides the rest, including your unsubscribe link. The editor shows the size and warns you when you get close.' },
    ],
  },
};
