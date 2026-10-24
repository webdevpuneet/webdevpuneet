/* Extra landing-page content for the email category pages, merged into EMAIL_CATEGORY_SEO by
   seo-categories.js: one more paragraph for the intro and two more FAQs per category. */

export const EMAIL_CATEGORY_MORE = {
  onboarding: {
    intro: `Plan these as a sequence, not as one-off sends. A common pattern is a welcome email straight after sign-up, a short tip a day or two later, a reminder before a trial ends, and a win-back message for people who go quiet. Give every email one job and one button, keep the subject line honest about what is inside, and let the next email pick up where the last one stopped. Each template shows a live preview on desktop, mobile and in dark mode, so you can check the whole journey before it goes live.`,
    faqs: [
      { q: 'How many emails should a welcome series have?', a: 'Three to five emails over the first one to two weeks is a good starting point: a welcome, a how-to-get-started message, a proof or tips message and a gentle nudge. Give each one a single goal and stop the series as soon as the person takes the action you want.' },
      { q: 'Can I personalise lifecycle emails with a name or plan?', a: 'Yes. Choose Mailchimp, Klaviyo, HubSpot or Brevo under Merge tags and first names, emails and the unsubscribe link are written in that platform\'s syntax. Add a fallback in your platform for people without a name, so the greeting never reads "Hi ,".' },
    ],
  },
  transactional: {
    intro: `A transactional email is judged by whether the customer can act on it in seconds: the code is easy to copy, the button is big enough to tap and the next step is obvious. Keep the layout plain, put the one important thing first and keep the rest in short lines. Mention the account or order it relates to and a way to reach support, because people open these emails when something matters to them. Send them from a dedicated address and domain set up for authentication, so they reach the inbox quickly.`,
    faqs: [
      { q: 'How do I test a transactional email before I send it?', a: 'Use the desktop, mobile and dark-mode previews in the editor and fix anything the pre-send checks flag, such as placeholder links or missing alt text. Then send a real test through your provider to Gmail, Outlook and Apple Mail accounts and confirm the links and code work.' },
      { q: 'Should a transactional email include marketing content?', a: 'Keep it focused on the transaction. A short, relevant line such as a link to help content is fine, but mixing in promotions can change how some providers and laws classify the message, so check your provider\'s rules before adding offers.' },
    ],
  },
  ecommerce: {
    intro: `Store emails are some of the most opened messages a shop sends, because customers are waiting for them. Send an order confirmation straight away with the items, total and delivery estimate, a shipping email with the tracking link and a clear contact route, and a review request a few days after delivery. For lost sales, an abandoned cart reminder works best when it shows the product, keeps one button and arrives while the customer still remembers the visit. Replace the placeholders with your store's order variables and send yourself a test order to check every field.`,
    faqs: [
      { q: 'Can I use these templates with WooCommerce or other stores?', a: 'Yes. Export the HTML and paste it into your store or email platform\'s custom HTML editor, then replace the placeholders for name, items, totals and tracking with that platform\'s order variables. The layout uses tables and inline styles, so it holds up in the major email clients.' },
      { q: 'How soon should an abandoned cart email go out?', a: 'Many stores send the first reminder within an hour or so, a second after about a day and an optional last one after two to three days. Test the timing with your own audience, and stop the sequence once the customer completes the order.' },
    ],
  },
  marketing: {
    intro: `Marketing emails work when they are specific: one offer, one audience and one button. Write the subject line and the first sentence for the person who will open it, give the sale or announcement a clear deadline and repeat the main button at the end for people who read to the bottom. Keep the width to about 600 pixels, include a plain-text version and always add an unsubscribe link and your business address. Every template here is built with tables and inline styles, so it renders the same in Gmail, Outlook and Apple Mail.`,
    faqs: [
      { q: 'How often should I send a marketing email?', a: 'Choose a rhythm you can keep, such as weekly or every two weeks for a newsletter, and add promotional emails around real events. Consistency matters more than volume, and your unsubscribe and reply rates tell you when you are sending too often.' },
      { q: 'How do I keep marketing emails out of the spam folder?', a: 'Set up SPF, DKIM and DMARC for your sending domain, send only to people who asked for your emails, include a plain-text version and an unsubscribe link, and avoid misleading subject lines. A clean, well-coded template also helps because it avoids broken layouts that look suspicious.' },
    ],
  },
  holidays: {
    intro: `Holiday emails are most effective when they arrive early and add something useful. A gift guide published a few weeks ahead helps people plan, and a warm greeting at the right moment strengthens the relationship without asking for anything. Use a short, personal message, one clear link, and a dark-mode palette that keeps festive colours readable. Schedule the sends in your email platform in advance so you are not editing on the day, and keep a plain-text version for clients that do not display images.`,
    faqs: [
      { q: 'How far ahead should I schedule holiday emails?', a: 'Plan the whole run of campaigns a few weeks before the season, build and test each email in good time and schedule them in your email platform. Gift guides do well two to three weeks before the date, while greetings are best sent a day or two before.' },
      { q: 'Can I add a promo code or a deadline to a holiday email?', a: 'Yes. Put the code in the body text or the button label, state the deadline clearly and use the extra sections to add a short offer block. Avoid putting the code only inside an image, because some email clients block images by default.' },
    ],
  },
};
