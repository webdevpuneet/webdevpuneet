import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { EmailGalleryPage } from '@/components/EmailTemplates';
import { EMAIL_TEMPLATES } from '@/components/EmailTemplates/templates/index.js';
import { EMAIL_DIFFERENT } from '@/components/EmailTemplates/templates/seo-content.js';
import styles from '../tool-page.module.css';

const PAGE_URL = 'https://webdevpuneet.com/email-templates/';
const TITLE = 'Free HTML Email Templates — Responsive & Dark Mode Ready';
// Hand-made social share image for the gallery page (public/images/email-templates.png)
const OG_IMAGES = [{ url: 'https://webdevpuneet.com/images/email-templates.png', width: 1200, height: 630, alt: 'Free responsive HTML email templates with dark mode' }];
const DESC = 'Free responsive HTML email templates that work in Gmail, Outlook and Apple Mail, with dark mode. Edit online, preview mobile, copy the HTML or fork to My Code.';

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: ['html email templates', 'free email templates', 'responsive email template', 'welcome email template', 'outlook compatible email template', 'dark mode email template'],
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
  { q: 'How do I use a template with Mailchimp, Klaviyo, HubSpot or Brevo?', a: 'Edit the template, click "Copy HTML", and paste it into your platform\'s custom-HTML or "code your own" editor. Swap the unsubscribe link and the first name for your platform\'s merge tags. You can also send it from your own code (for example with Nodemailer, Resend, SendGrid or Amazon SES), using the plain-text version as the text part.' },
  { q: 'Do the templates support dark mode?', a: 'Yes. Each template has editable light and dark palettes. Apple Mail, iOS Mail and Outlook.com use your dark colours, and the editor has a dark-mode preview so you can check contrast before sending.' },
  { q: 'What does "Fork to My Code" do?', a: 'It saves an editable copy of the email in My Code, the UI Snippets code editor, with the markup in the HTML panel and the email\'s CSS in the CSS panel. Use it to customise the code further and keep your own versions.' },
  { q: 'Are the templates free?', a: 'Yes, for personal and commercial use, with no account and no watermark. Everything runs in your browser and your edits are saved locally.' },
];

const SECTIONS = [
  {
    type: 'features',
    label: "What's included",
    heading: 'Features',
    items: [
      'Responsive layouts built with tables and inline styles for real inboxes',
      'Outlook-safe "bulletproof" buttons and Outlook font fixes',
      'Editable light and dark palettes with a dark-mode preview',
      'Desktop and mobile previews plus a Gmail-style inbox preview',
      'Hidden preheader text for the inbox preview line',
      'Checks for Gmail clipping, alt text, hosted images and placeholder links',
      'CAN-SPAM-ready footers with unsubscribe link and postal address',
      'Plain-text version generated automatically',
      'Show or hide sections, change copy, links, images, colours and fonts',
      'Copy HTML, download .html, or fork into My Code',
    ],
  },
  {
    type: 'text',
    label: 'About these templates',
    heading: 'Free HTML Email Templates That Work in Real Inboxes',
    quickFacts: false,
    text: `Most "free email templates" look great in a browser and break in Outlook. These are built the hard way, the way email actually requires: nested tables, inline styles, \`role="presentation"\` on layout tables, a fixed 600 px container wrapped in Outlook-only conditional comments, VML buttons for Outlook on Windows, and media queries for phones and dark mode.

**Edit without touching code.** Every template exposes its content as fields: subject, preheader, headline, copy, button text and link, images, social links and footer. Whole sections can be switched on and off. Change the brand colour, light and dark palettes, and heading and body fonts (with safe fallbacks).

**Check before you send.** The editor shows desktop, mobile and dark-mode previews, plus an inbox preview with your sender name, subject and preheader. Live checks warn about Gmail's 102 KB clipping limit, images that aren't hosted online, missing alt text, placeholder links, and the unsubscribe link and postal address required by US CAN-SPAM.

**Take the code anywhere.** Copy the HTML into Mailchimp, Klaviyo, HubSpot, Brevo, Campaign Monitor or your own sending code, download a .html file, copy the plain-text version, or fork it into [My Code](/ui-snippets/mycode/) to keep editing the markup. Designing social images too? Try [Social Post Templates](/social-post-templates/).`,
  },
  { type: 'cards', label: 'How it’s different', heading: 'How These Email Templates Are Different', columns: 3, items: EMAIL_DIFFERENT },
  {
    type: 'steps',
    label: 'Step by step',
    heading: 'How to Use',
    items: [
      { title: 'Pick a template', text: 'Open a template from the gallery. Your edits are saved in your browser as you go.' },
      { title: 'Write the email', text: 'Fill in the subject, preheader, headline, copy and button. Switch sections on or off and paste in your logo and image URLs.' },
      { title: 'Style it', text: 'Set the brand colour and the light and dark palettes, and choose heading and body fonts.' },
      { title: 'Preview and check', text: 'Switch between desktop, mobile and dark mode, and fix anything the pre-send checks flag.' },
      { title: 'Export', text: 'Copy the HTML into your email service, download it, copy the plain-text version, or fork it into My Code.' },
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
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}><EmailGalleryPage /></div>
      <IndexOnly>
        <AdSlot />
        <SeoSection slug="email-templates" title="HTML Email Templates — Free, Responsive, Outlook-Safe" subtitle="Gmail · Outlook · Apple Mail · Dark mode · Copy HTML or fork to My Code" sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
