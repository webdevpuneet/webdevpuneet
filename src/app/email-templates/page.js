import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { EmailGalleryPage } from '@/components/EmailTemplates';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES } from '@/components/EmailTemplates/templates/index.js';
import { EMAIL_DIFFERENT } from '@/components/EmailTemplates/templates/seo-content.js';
import { emailPreviewIds } from '@/components/EmailTemplates/assets';
import styles from '../tool-page.module.css';

const PAGE_URL = 'https://webdevpuneet.com/email-templates/';
const TITLE = 'Free HTML Email Templates — Responsive & Dark Mode Ready';
// Hand-made social share image for the gallery page (public/images/email-templates.png)
const OG_IMAGES = [{ url: 'https://webdevpuneet.com/images/email-templates.png', width: 1200, height: 630, alt: 'Free responsive HTML email templates with dark mode' }];
const DESC = 'Free responsive HTML email templates for Gmail, Outlook and Apple Mail, with dark mode. Add merge tags, extra sections and your brand, then export the HTML.';

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: ['html email templates', 'free email templates', 'responsive email template', 'welcome email template', 'password reset email template', 'order confirmation email template', 'newsletter email template', 'black friday email template', 'outlook compatible email template', 'dark mode email template'],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  icons: { icon: '/icons/email-templates.svg', shortcut: '/icons/email-templates.svg' },
  openGraph: { type: 'website', url: PAGE_URL, siteName: 'webdevpuneet.com', title: TITLE, description: DESC, locale: 'en_US', images: OG_IMAGES },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: TITLE, description: DESC, images: [OG_IMAGES[0].url] },
};

const faqs = [
  { q: 'What makes an HTML email template different from a web page?', a: 'Email clients render HTML very differently from browsers. Outlook for Windows uses Microsoft Word\'s engine and ignores flexbox, grid and most modern CSS, and Gmail removes many styles. Reliable email HTML uses nested tables for layout, inline styles, absolute image URLs and Outlook-only fixes. Every template here is built that way.' },
  { q: 'Will these templates work in Outlook and Gmail?', a: 'Yes. They use a table layout, inline styles, a 600 px container with Outlook conditional comments, a VML "bulletproof" button for Outlook and an Arial override so Outlook doesn\'t fall back to Times New Roman. They are also kept well under Gmail\'s 102 KB clipping limit, and the editor warns you if you go over.' },
  { q: 'How do I use a template with Mailchimp, Klaviyo, HubSpot or Brevo?', a: 'Pick your platform under Merge tags first. First names, last names, emails and the unsubscribe and preferences links are then written in that platform\'s syntax, for example *|FNAME|* for Mailchimp or {{ contact.firstname }} for HubSpot. Then open Export in the toolbar, copy the HTML and paste it into your platform\'s custom-HTML or "code your own" editor. To send it from your own code (Nodemailer, Resend, SendGrid, Amazon SES), keep the plain {{first_name}} tokens and use the plain-text version as the text part.' },
  { q: 'Can I add my own sections to a template?', a: 'Yes. Under Extra sections you can add headings, text, buttons, images, two-column blocks, dividers and spacing. Drop them between any of the template\'s own sections from the Position menu, or drag them in the preview. Image sections take a URL or an upload. Extra sections are saved with your design and included in the HTML, the plain-text version and every export.' },
  { q: 'Can I use bold text, links or my own HTML?', a: 'Yes. Select text in a field and a small toolbar offers bold, italic, underline and links, with a button to remove a link. You can also type simple inline HTML (b, strong, i, em, u, br and a href). Anything else is stripped and unclosed tags are closed, so the email stays valid in every client.' },
  { q: 'Can I save several versions of an email?', a: 'Yes. Save keeps your design under a name in My designs, Save as makes a copy, and the My designs tab lets you search, reopen, rename and delete them. Saved designs also appear live at the top of this gallery. Everything is stored in your browser\'s IndexedDB, and the Import / Export tab downloads a backup file you can restore on another browser or computer, including uploaded images and your brand kit.' },
  { q: 'Do the templates support dark mode?', a: 'Yes. Each template has editable light and dark palettes. Apple Mail, iOS Mail and Outlook.com use your dark colours, and the editor has a dark-mode preview so you can check contrast before sending.' },
  { q: 'What does "Fork to My Code" do?', a: 'It saves an editable copy of the email in My Code, the UI Snippets code editor, with the markup in the HTML panel and the email\'s CSS in the CSS panel. Uploaded images are embedded so the copy works on its own. Use it to customise the code further and keep your own versions.' },
  { q: 'Are the templates free?', a: 'Yes, for personal and commercial use, with no account and no watermark. Everything runs in your browser: your edits, designs and uploaded images stay on your device.' },
];

const SECTIONS = [
  {
    type: 'features',
    label: "What's included",
    heading: 'Features',
    items: [
      'Responsive layouts built with tables and inline styles for real inboxes',
      'Outlook-safe "bulletproof" buttons and Outlook font fixes',
      'Merge tags in one click for Mailchimp, Klaviyo, HubSpot and Brevo, including unsubscribe links',
      'Extra sections (headings, text, buttons, images, two columns, dividers, spacing) you can drag anywhere',
      'Bold, italic, underline and links from a selection toolbar, plus safe inline HTML',
      'Optional inbox preview text (hidden preheader) for the line after the subject',
      'Desktop, mobile and dark-mode previews; click any text to jump to its field',
      'Editable light and dark palettes, a brand colour and every Google Font, with safe fallbacks',
      'Upload images (kept in your browser) and download a ZIP with an images folder',
      'Pre-send checks for Gmail clipping, alt text, hosted images, placeholder links and unsubscribe links',
      'CAN-SPAM-ready footers with unsubscribe link and postal address',
      'Plain-text version generated automatically, extra sections included',
      'My designs: Save, Save as, rename and search your saved emails, shown live in the gallery',
      'Import / Export backup file with your designs, uploaded images and brand kit',
      'Apply your saved brand kit (colours, logo and fonts) when you choose to',
      'Export menu: copy colour-coded HTML or plain text, download .html or ZIP, or fork into My Code',
      'Works on phones: the editor opens as a bottom sheet over the preview',
    ],
  },
  {
    type: 'text',
    label: 'Browse by category',
    heading: 'Email Templates for Every Stage of the Customer Journey',
    quickFacts: false,
    text: EMAIL_CATEGORIES.filter(c => EMAIL_TEMPLATES.some(t => t.category === c.id)).map(c => {
      const list = EMAIL_TEMPLATES.filter(t => t.category === c.id);
      return `**[${c.label} email templates](/email-templates/category/${c.id}/)**: ${c.blurb} Includes ${list.map(t => `[${t.name}](/email-templates/${t.id}/)`).join(', ')}.`;
    }).join('\n\n'),
  },
  {
    type: 'text',
    label: 'About these templates',
    heading: 'Free HTML Email Templates That Work in Real Inboxes',
    quickFacts: false,
    text: `Most "free email templates" look great in a browser and break in Outlook. These are built the hard way, the way email actually requires: nested tables, inline styles, \`role="presentation"\` on layout tables, a fixed 600 px container wrapped in Outlook-only conditional comments, VML buttons for Outlook on Windows, and media queries for phones and dark mode.

**One library for every email you send.** Start with a [welcome email](/email-templates/welcome/) for new sign-ups and a [trial ending](/email-templates/trial-ending/) reminder before the trial expires, then keep customers close with a [birthday email](/email-templates/birthday-email/), an [NPS survey](/email-templates/nps-survey/) a [re-engagement](/email-templates/re-engagement/) email for anyone who drifts away, and a graceful [cancellation](/email-templates/subscription-cancelled/) email when someone leaves. Send [email verification](/email-templates/verify-email/), [password reset](/email-templates/password-reset/) [magic link sign-in](/email-templates/magic-link/) and [new sign-in security alert](/email-templates/security-alert/) emails from your app, a [payment receipt](/email-templates/receipt/) after every charge and a [payment reminder](/email-templates/payment-reminder/) for unpaid invoices. Service businesses can cut no-shows with an [appointment reminder](/email-templates/appointment-reminder/). Online stores can win back shoppers with an [abandoned cart](/email-templates/abandoned-cart/) email, alert waitlists with [back in stock](/email-templates/back-in-stock/) emails, then send an [order confirmation](/email-templates/order-confirmation/), a [shipping confirmation](/email-templates/shipping-confirmation/) a [refund confirmation](/email-templates/refund-confirmation/) and a [review request](/email-templates/review-request/). Keep customers engaged with a [newsletter](/email-templates/newsletter/), a [product update](/email-templates/product-update/) a [webinar invitation](/email-templates/webinar-invitation/) and a [refer a friend](/email-templates/refer-a-friend/) email, run sales with the [Black Friday](/email-templates/black-friday-sale/) and [last chance](/email-templates/last-chance-sale/) emails, and celebrate the season with a [holiday gift guide](/email-templates/holiday-gift-guide/) and [holiday greetings](/email-templates/holiday-greetings/). They share the same structure, so your emails look consistent.

**Edit without touching code.** Every template exposes its content as fields: headline, copy, button text and link, images, line items, social links and footer. Click any text in the preview to jump to its field, select words to make them bold, italic, underlined or a link, and switch whole sections on and off. Change the brand colour, the light and dark palettes, and the heading and body fonts, chosen from the full Google Fonts library with safe fallbacks.

**Make it yours.** Add extra sections (headings, text, buttons, images, two-column blocks, dividers and spacing) and place them between any of the template's own sections, or drag them in the preview. Upload your logo and images: they stay in your browser and export as a ZIP with an images folder, or point to your own image host. An optional inbox preview text sets the grey line that follows the subject in most inboxes.

**Ready for your email platform.** Pick Mailchimp, Klaviyo, HubSpot or Brevo and first names, emails and the unsubscribe and preferences links are written in that platform's merge-tag syntax. Keep the plain tokens if you send from your own code.

**Check before you send.** The editor shows desktop, mobile and dark-mode previews. Live checks warn about Gmail's 102 KB clipping limit, images that aren't hosted online, missing alt text, placeholder links, and, for marketing emails, the unsubscribe link and postal address required by US CAN-SPAM.

**Save, back up and reuse.** Save designs under a name, make copies with Save as, and find them again in the My designs tab or live at the top of this gallery. They are kept in your browser's IndexedDB, and the Import / Export tab downloads a backup with your images and brand kit that you can restore anywhere.

**Take the code anywhere.** From the Export menu, copy the HTML into Mailchimp, Klaviyo, HubSpot, Brevo, Campaign Monitor or your own sending code, download a .html file or a ZIP, copy the plain-text version, or fork it into [My Code](/ui-snippets/mycode/) to keep editing the markup. Designing social images too? Try [Social Post Templates](/social-post-templates/).`,
  },
  { type: 'cards', label: 'How it’s different', heading: 'How These Email Templates Are Different', columns: 3, items: EMAIL_DIFFERENT },
  {
    type: 'steps',
    label: 'Step by step',
    heading: 'How to Use',
    items: [
      { title: 'Pick a template and platform', text: 'Open a template from the gallery and choose your email platform under Merge tags. Your edits autosave in your browser as you go.' },
      { title: 'Write the email', text: 'Fill in the headline, copy and button, or click text in the preview. Select words to format them, switch sections on or off, and add extra sections where you need them.' },
      { title: 'Style it', text: 'Upload your logo and images, set the brand colour and the light and dark palettes, choose fonts, or apply your brand kit.' },
      { title: 'Preview and check', text: 'Switch between desktop, mobile and dark mode, and fix anything the pre-send checks flag.' },
      { title: 'Save and export', text: 'Save it to My designs, then use Export to copy the HTML or plain text, download a .html file or ZIP, or fork it into My Code.' },
    ],
  },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'HTML Email Templates',
  url: PAGE_URL,
  description: DESC,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: EMAIL_TEMPLATES.length,
    itemListElement: EMAIL_TEMPLATES.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${PAGE_URL}${t.id}/` })),
  },
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Email Templates', item: PAGE_URL },
  ],
};

export default function EmailTemplatesPage() {
  return (
    <div className={styles.page}>
      {[collectionSchema, faqSchema, breadcrumbSchema].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}><EmailGalleryPage previews={emailPreviewIds()} /></div>
      <AdSlot related={false} />
      <IndexOnly>
        <SeoSection slug="email-templates" title="HTML Email Templates — Free, Responsive, Outlook-Safe" subtitle="Gmail · Outlook · Apple Mail · Dark mode · Merge tags · Extra sections · Export HTML" sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
