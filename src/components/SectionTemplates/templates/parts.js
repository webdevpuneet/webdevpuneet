/* Markup and CSS shared by several sections (testimonials now). Item fields they read:
   quote, name, role, avatar (+ avatarAlt); toggle: showStars. */
import { IMG } from './meta.js';

export const STARS_HTML = `<p class="st-stars" data-show="showStars" role="img" aria-label="Rated 5 out of 5"><span aria-hidden="true">★★★★★</span></p>`;

export const PERSON_HTML = `<div class="st-person">
        <img class="st-avatar" data-image="avatar" data-optional alt="" width="96" height="96" loading="lazy">
        <div><p class="st-person-name" data-edit="name"></p><p class="st-person-role" data-edit="role"></p></div>
      </div>`;

export const PERSON_CSS = `.st-stars{color:#f59e0b;font-size:16px;letter-spacing:2px;line-height:1}
.st-person{display:flex;align-items:center;gap:12px}
.st-avatar{width:44px;height:44px;flex:none;border-radius:50%;object-fit:cover;background:var(--st-surface)}
.st-person-name{font-weight:700;font-size:15.5px;line-height:1.3}
.st-person-role{color:var(--st-muted);font-size:14px;line-height:1.4}
.st-person-role:empty{display:none}`;

/** List fields for one testimonial */
export const quoteFields = ({ avatar = true } = {}) => [
  { key: 'quote', label: 'Quote', type: 'textarea', value: 'What this customer said about you.' },
  { key: 'name', label: 'Name', type: 'text', value: 'Customer name' },
  { key: 'role', label: 'Role and company (optional)', type: 'text', value: '' },
  ...(avatar ? [
    { key: 'avatar', label: 'Photo (optional)', type: 'image', value: '', hint: 'A square photo, at least 96×96 px. Leave empty to hide.', upload: { name: 'avatar', maxW: 240 } },
    { key: 'avatarAlt', label: 'Photo alt text', type: 'text', value: '' },
  ] : []),
];

export const avatar = n => IMG(`avatar-${n}.jpg`);

/* ── Navigation ────────────────────────────────────────────────────────────── */
/* Brand: an uploaded logo image, or an icon + name mark */
export const BRAND_HTML = `<a class="st-brand" data-href="logoUrl">
      <img class="st-brand-img" data-image="logoImage" data-optional alt="" height="32">
      <span class="st-brand-mark" data-hide-if="logoImage"><span class="st-brand-icon" data-icon="logoIcon"></span><span data-edit="logoText"></span></span>
    </a>`;

export const brandFields = (group = 'brand') => [
  { key: 'logoText', group, label: 'Brand name', type: 'text', value: 'Acme' },
  { key: 'logoIcon', group, label: 'Brand icon (used without a logo image)', type: 'icon', value: 'layers' },
  { key: 'logoImage', group, label: 'Logo image (optional)', type: 'image', value: '', hint: 'An SVG or transparent PNG about 32 px tall. Replaces the icon + name.', upload: { name: 'logo', maxW: 480, mime: 'image/png' } },
  { key: 'logoImageAlt', group, label: 'Logo alt text', type: 'text', value: '' },
  { key: 'logoUrl', group, label: 'Logo link', type: 'url', value: '/' },
];

/* Hamburger button (turns into an X when open) */
export const BURGER_HTML = `<button type="button" class="st-burger" data-menu-toggle aria-expanded="false" data-set="aria-label:menuLabel"><span></span><span></span><span></span></button>`;

/* Toggle markers read by CSS (sticky) and the menu behaviour (hide on scroll) */
export const STICKY_FLAGS_HTML = `<i hidden data-sticky-flag data-show="sticky"></i><i hidden data-hide-flag data-show="hideOnScroll"></i>`;

export const navToggles = () => [
  { key: 'sticky', label: 'Sticky header', value: true },
  { key: 'hideOnScroll', label: 'Hide on scroll down', value: false },
];

export const BRAND_CSS = `.st-brand{display:inline-flex;align-items:center;flex:none;text-decoration:none;color:var(--st-text)}
.st-brand-img{height:32px;width:auto;max-width:180px;object-fit:contain}
.st-brand-mark{display:inline-flex;align-items:center;gap:10px;font:800 21px/1 var(--st-font-heading);letter-spacing:-.03em}
.st-brand-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:calc(var(--st-radius) * .7px);background:var(--st-brand);color:var(--st-btn-text)}
.st-brand-icon svg{width:19px;height:19px}`;

export const NAV_CSS = `${BRAND_CSS}
.st:has([data-sticky-flag]){position:sticky;top:0;z-index:50;transition:box-shadow .3s ease}
.st.is-scrolled{box-shadow:0 10px 30px -18px rgba(15,23,42,.35)}
.st-burger{display:none;position:relative;flex:none;width:44px;height:44px;border:0;border-radius:calc(var(--st-radius) * .7px);background:color-mix(in srgb,var(--st-text) 7%,transparent);color:var(--st-text);cursor:pointer}
.st-burger span{position:absolute;left:12px;right:12px;height:2px;border-radius:2px;background:currentColor;transition:transform .3s ease,opacity .2s ease}
.st-burger span:nth-child(1){top:15px}.st-burger span:nth-child(2){top:21px}.st-burger span:nth-child(3){top:27px}
.st-burger[aria-expanded="true"] span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.st-burger[aria-expanded="true"] span:nth-child(2){opacity:0}
.st-burger[aria-expanded="true"] span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
.st-burger:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px}`;

export const navLinkFields = () => [
  { key: 'label', label: 'Link text', type: 'text', value: 'Page' },
  { key: 'url', label: 'Link', type: 'url', value: '#' },
];

export const DEMO_LINKS = [
  // Anchors match the Website Builder's default section ids (features, pricing, customers, faq)
  { label: 'Features', url: '#features' }, { label: 'Pricing', url: '#pricing' },
  { label: 'Customers', url: '#customers' }, { label: 'FAQ', url: '#faq' }, { label: 'Blog', url: '/blog/' },
];

/* ── Footer ────────────────────────────────────────────────────────────────── */
/* Social icon links (a list: icon + label for screen readers + URL) */
export const SOCIAL_HTML = `<ul class="st-socials" data-list="socials">
      <li><a class="st-social" data-href="url" data-set="aria-label:label"><span data-icon="icon"></span></a></li>
    </ul>`;

export const SOCIAL_CSS = `.st-socials{list-style:none;display:flex;flex-wrap:wrap;gap:8px}
.st-social{display:grid;place-items:center;width:40px;height:40px;border-radius:calc(var(--st-radius) * .7px);color:var(--st-muted);background:color-mix(in srgb,var(--st-text) 6%,transparent);transition:color .2s ease,background .2s ease,transform .2s ease}
.st-social:hover{color:var(--st-btn-text);background:var(--st-brand);transform:translateY(-2px)}
.st-social svg{width:19px;height:19px}`;

export const socialFields = () => [
  { key: 'icon', label: 'Icon', type: 'icon', value: 'github' },
  { key: 'label', label: 'Name (for screen readers)', type: 'text', value: 'GitHub' },
  { key: 'url', label: 'Link', type: 'url', value: 'https://github.com/' },
];

export const DEMO_SOCIALS = [
  { icon: 'twitter', label: 'X (Twitter)', url: 'https://x.com/' },
  { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
  { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
  { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' },
];

/* A link column: title + "Label | URL" lines */
export const columnFields = () => [
  { key: 'title', label: 'Column title', type: 'text', value: 'Links' },
  { key: 'links', label: 'Links', type: 'links', value: 'First link | /\nSecond link | /' },
];

export const DEMO_COLUMNS = [
  { title: 'Product', links: 'Features | /features/\nPricing | /pricing/\nIntegrations | /integrations/\nChangelog | /changelog/' },
  { title: 'Company', links: 'About | /about/\nCareers | /careers/\nCustomers | /customers/\nContact | /contact/' },
  { title: 'Resources', links: 'Blog | /blog/\nGuides | /guides/\nHelp centre | /help/\nStatus | https://status.webdevpuneet.com' },
];

/* ── Contact form ──────────────────────────────────────────────────────────── */
/* A working contact form (form behaviour): name, email, message, a honeypot field
   (_gotcha, the Formspree convention) and success / error messages. */
export const CONTACT_FORM_HTML = `<form class="st-form" method="post" data-form data-set="action:formAction">
      <div class="st-form-fields" data-form-fields>
        <div class="st-form-row">
          <label class="st-field"><span data-edit="nameLabel"></span><input name="name" type="text" required autocomplete="name"></label>
          <label class="st-field"><span data-edit="emailLabel"></span><input name="email" type="email" required autocomplete="email"></label>
        </div>
        <label class="st-field"><span data-edit="messageLabel"></span><textarea name="message" rows="5" required></textarea></label>
        <input class="st-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="st-btn st-form-btn" type="submit"><span data-edit="submit"></span></button>
        <p class="st-form-note" data-edit="note"></p>
        <p class="st-form-error" data-form-error hidden role="alert" data-edit="errorText"></p>
      </div>
      <div class="st-form-success" data-form-success hidden tabindex="-1" role="status">
        <span class="st-icon">${'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'}</span>
        <h3 data-edit="successTitle"></h3>
        <p data-edit="successText"></p>
      </div>
    </form>`;

export const FORM_CSS = `.st-form{display:block}
.st-form-fields{display:flex;flex-direction:column;gap:16px}
.st-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.st-field{display:flex;flex-direction:column;gap:7px;font-size:14.5px;font-weight:600;color:var(--st-text)}
.st-field input,.st-field textarea{width:100%;padding:13px 15px;border-radius:calc(var(--st-radius) * .8px);border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);background:var(--st-bg);color:var(--st-text);font:400 16px/1.5 var(--st-font-body);outline:none;transition:border-color .2s ease,box-shadow .2s ease;resize:vertical}
.st-field input:focus,.st-field textarea:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.st-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.st-form-btn{align-self:flex-start;min-width:180px}
.st-form-btn[aria-busy="true"]{opacity:.7;cursor:progress}
.st-form-note{font-size:13.5px;color:var(--st-muted)}
.st-form-error{padding:12px 14px;border-radius:calc(var(--st-radius) * .8px);background:#fef2f2;color:#b91c1c;font-size:14.5px}
.st-form-success{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:8px 0;outline:none}
.st-form-success[hidden],.st-form-error[hidden]{display:none}
.st-form-success h3{font-size:22px}
.st-form-success p{color:var(--st-muted)}
@container st (max-width:560px){.st-form-row{grid-template-columns:1fr}.st-form-btn{width:100%}}`;

export const contactFormFields = (group = 'form') => [
  { key: 'formAction', group, label: 'Form URL (action)', type: 'url', value: 'https://formspree.io/f/your-form-id', hint: 'Paste your form endpoint from Formspree, Basin, Getform or your own server. Fields sent: name, email, message.' },
  { key: 'nameLabel', group, label: 'Name label', type: 'text', value: 'Your name' },
  { key: 'emailLabel', group, label: 'Email label', type: 'text', value: 'Email' },
  { key: 'messageLabel', group, label: 'Message label', type: 'text', value: 'How can we help?' },
  { key: 'submit', group, label: 'Button text', type: 'text', value: 'Send message' },
  { key: 'note', group, label: 'Note under the button (optional)', type: 'text', value: 'We reply within one business day.' },
  { key: 'successTitle', group, label: 'Success title', type: 'text', value: 'Thanks, message sent!' },
  { key: 'successText', group, label: 'Success text', type: 'text', value: 'We’ll get back to you within one business day.' },
  { key: 'errorText', group, label: 'Error text', type: 'text', value: 'Sorry, something went wrong. Please try again or email us directly.' },
];

/* ── Blog ──────────────────────────────────────────────────────────────────── */
export const cover = n => IMG(`blog-${n}.jpg`);

export const postFields = () => [
  { key: 'image', label: 'Cover image', type: 'image', value: '', hint: 'About 1200×750 px.', upload: { name: 'cover', maxW: 1400 } },
  { key: 'imageAlt', label: 'Cover alt text', type: 'text', value: '' },
  { key: 'category', label: 'Category (optional)', type: 'text', value: 'Guides' },
  { key: 'date', label: 'Date (optional)', type: 'text', value: 'Oct 20, 2026' },
  { key: 'readTime', label: 'Read time (optional)', type: 'text', value: '5 min read' },
  { key: 'title', label: 'Title', type: 'text', value: 'A new blog post' },
  { key: 'excerpt', label: 'Excerpt (optional)', type: 'textarea', value: 'A sentence or two about the post.' },
  { key: 'author', label: 'Author (optional)', type: 'text', value: '' },
  { key: 'avatar', label: 'Author photo (optional)', type: 'image', value: '', upload: { name: 'author', maxW: 160 } },
  { key: 'avatarAlt', label: 'Author photo alt text', type: 'text', value: '' },
  { key: 'url', label: 'Post link', type: 'url', value: '/blog/' },
];

export const DEMO_POSTS = [
  { image: IMG('blog-4.jpg'), category: 'Engineering', date: 'Oct 14, 2026', readTime: '8 min read', title: 'How we cut page load time in half', excerpt: 'Lazy hydration, smarter caching and one surprising database index: the full story of our performance sprint.', author: 'Leo Martins', avatar: IMG('avatar-1.jpg'), url: '/blog/faster-pages/' },
  { image: IMG('blog-6.jpg'), category: 'Product', date: 'Oct 9, 2026', readTime: '5 min read', title: 'Introducing live reports', excerpt: 'Dashboards that update as your team works, with no spreadsheets and no Friday afternoon status updates.', author: 'Nora Quinn', avatar: IMG('avatar-5.jpg'), url: '/blog/live-reports/' },
  { image: IMG('blog-1.jpg'), category: 'Culture', date: 'Oct 2, 2026', readTime: '6 min read', title: 'What four-day sprints taught us', excerpt: 'A year of shorter weeks: what changed in our output, our planning and how the team feels.', author: 'Aisha Bello', avatar: IMG('avatar-6.jpg'), url: '/blog/four-day-sprints/' },
  { image: IMG('blog-2.jpg'), category: 'Design', date: 'Sep 25, 2026', readTime: '4 min read', title: 'Designing calm interfaces', excerpt: 'Fewer colours, more space and motion that explains: the principles behind our redesign.', author: 'Zara Ahmed', avatar: IMG('avatar-2.jpg'), url: '/blog/calm-interfaces/' },
];

const plainText = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
/** ItemList of BlogPosting for a section's post list (exported pages get it in <head>) */
export const blogSchema = listKey => state => {
  const posts = (state.lists?.[listKey] || []).filter(p => plainText(p.title));
  return posts.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'BlogPosting',
        headline: plainText(p.title),
        ...(plainText(p.excerpt) && { description: plainText(p.excerpt) }),
        ...(/^https?:/.test(p.url || '') && { url: p.url }),
        ...(/^https?:/.test(p.image || '') && { image: p.image }),
        ...(plainText(p.author) && { author: { '@type': 'Person', name: plainText(p.author) } }),
      },
    })),
  } : null;
};

/* ── Logos ─────────────────────────────────────────────────────────────────── */
/* A customer logo: an uploaded logo image, or (when there is none) an icon + name
   wordmark, so the section looks finished before real logos are added. */
export const LOGO_HTML = `<li class="st-logo">
        <img class="st-logo-img" data-image="logo" data-optional alt="" loading="lazy">
        <span class="st-logo-mark" data-hide-if="logo"><span class="st-logo-icon" data-icon="icon"></span><span data-edit="name"></span></span>
      </li>`;

export const LOGO_CSS = `.st-logo{display:flex;align-items:center;justify-content:center;flex:none}
.st-logo-img{height:30px;width:auto;max-width:150px;object-fit:contain;filter:grayscale(1);opacity:.7;transition:filter .3s ease,opacity .3s ease}
.st-logo:hover .st-logo-img{filter:none;opacity:1}
.st-logo-mark{display:inline-flex;align-items:center;gap:8px;color:var(--st-muted);font:800 21px/1 var(--st-font-heading);letter-spacing:-.03em;white-space:nowrap;opacity:.8;transition:color .3s ease,opacity .3s ease}
.st-logo:hover .st-logo-mark{color:var(--st-text);opacity:1}
.st-logo-icon svg{width:24px;height:24px;display:block}`;

export const logoFields = () => [
  { key: 'name', label: 'Company name', type: 'text', value: 'Company' },
  { key: 'icon', label: 'Icon (used without a logo image)', type: 'icon', value: 'sparkles' },
  { key: 'logo', label: 'Logo image (optional)', type: 'image', value: '', hint: 'An SVG or transparent PNG, ideally one colour. Replaces the icon + name.', upload: { name: 'logo', maxW: 400, mime: 'image/png' } },
  { key: 'logoAlt', label: 'Logo alt text', type: 'text', value: '' },
];

export const DEMO_LOGOS = [
  { name: 'Northwind', icon: 'globe' }, { name: 'Lumen', icon: 'lightbulb' }, { name: 'Quill', icon: 'pen-tool' },
  { name: 'Brightpath', icon: 'rocket' }, { name: 'Kestrel', icon: 'zap' }, { name: 'Orbit', icon: 'target' },
  { name: 'Tidewater', icon: 'leaf' }, { name: 'Fernhill', icon: 'layers' },
];

/* ── FAQ ───────────────────────────────────────────────────────────────────── */
/* One question as native details/summary (the accordion behaviour animates it) */
export const ACC_ITEM_HTML = `<details class="st-acc" data-anim="item">
      <summary class="st-acc-q"><span data-edit="q"></span><span class="st-acc-icon" aria-hidden="true"></span></summary>
      <div class="st-acc-a"><p data-edit="a"></p></div>
    </details>`;

export const ACC_CSS = `.st-acc{border-bottom:1px solid color-mix(in srgb,var(--st-text) 11%,transparent)}
.st-acc-q{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 2px;cursor:pointer;list-style:none;font:700 clamp(17px,.6cqi + 14px,19px)/1.4 var(--st-font-heading);letter-spacing:-.01em}
.st-acc-q::-webkit-details-marker{display:none}
.st-acc-q:hover{color:var(--st-brand)}
.st-acc-q:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px;border-radius:6px}
.st-acc-icon{position:relative;flex:none;width:28px;height:28px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 11%,transparent);transition:transform .3s ease,background .3s ease}
.st-acc-icon::before,.st-acc-icon::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;border-radius:2px;background:var(--st-brand);transform:translate(-50%,-50%)}
.st-acc-icon::after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .3s ease}
.st-acc[open]:not(.is-closing) .st-acc-icon{transform:rotate(180deg);background:var(--st-brand)}
.st-acc[open]:not(.is-closing) .st-acc-icon::before,.st-acc[open]:not(.is-closing) .st-acc-icon::after{background:var(--st-btn-text)}
.st-acc[open]:not(.is-closing) .st-acc-icon::after{transform:translate(-50%,-50%) rotate(0deg)}
.st-acc-a{overflow:hidden}
.st-acc-a p{padding:0 48px 24px 2px;color:var(--st-muted);font-size:16.5px;line-height:1.7}`;

/** List fields for one FAQ */
export const faqFields = () => [
  { key: 'q', label: 'Question', type: 'text', value: 'A new question?' },
  { key: 'a', label: 'Answer', type: 'textarea', value: 'The answer, in one to three sentences.' },
];

/* Plain text for structured data: no *highlights*, tags or line breaks */
const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** FAQPage JSON-LD for a section's FAQ list (exported pages get it in <head>) */
export const faqSchema = listKey => state => {
  const items = (state.lists?.[listKey] || []).filter(it => plain(it.q) && plain(it.a));
  return items.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({ '@type': 'Question', name: plain(it.q), acceptedAnswer: { '@type': 'Answer', text: plain(it.a) } })),
  } : null;
};
