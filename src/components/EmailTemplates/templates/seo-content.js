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
      { q: 'How do I use this welcome email template in Mailchimp, Klaviyo or HubSpot?', a: 'Edit the template, click "Copy HTML", then in your email service create a campaign or automation with a "custom HTML" or "code your own" design and paste it in. Replace the unsubscribe link with your platform\'s merge tag (for example *|UNSUB|* in Mailchimp or {{ unsubscribe_link }} in Klaviyo) and use merge tags for the first name.' },
      { q: 'Will it work in Outlook?', a: 'Yes. The layout uses tables and inline styles, the 600 px container and the button have Outlook-only (MSO) versions, and Outlook is forced to Arial because it ignores web fonts. Rounded corners on the card don\'t appear in Outlook for Windows, which is expected and doesn\'t break the layout.' },
      { q: 'Why do my images need a URL?', a: 'Email images must be hosted online: most clients block or strip images embedded in the HTML. Upload your logo and hero image to your website, a CDN or your email service, then paste the https:// links into the template.' },
      { q: 'What should a welcome email include?', a: 'A warm thank-you, one clear next step (the button), a short list of what to do first, a way to get help or reply, and the legal footer. This template includes all of them, and you can hide sections you don\'t need.' },
      { q: 'Does it support dark mode?', a: 'Yes. Apple Mail, iOS Mail and Outlook.com use the dark palette you set. Gmail\'s apps apply their own automatic colour changes, which the template\'s colours are chosen to survive. Switch the preview to Dark to check your colours.' },
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
