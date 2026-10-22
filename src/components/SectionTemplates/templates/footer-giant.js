import { SOCIAL_HTML, SOCIAL_CSS, socialFields, DEMO_SOCIALS } from './parts.js';

export default {
  id: 'footer-giant',
  name: 'Big Wordmark Footer',
  version: '1.0.0',
  category: 'footer',
  anchor: 'contact', // the big "Let's talk" footer is the site's contact block
  tags: ['footer', 'wordmark', 'big-text', 'cta', 'dark', 'agency', 'splittext'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Big Text Footer Template — Free Giant Wordmark Footer HTML',
  seoDescription: 'Free dark footer with a closing call to action, links and social icons, ending in a giant brand wordmark revealed with GSAP SplitText. Export HTML or React.',
  description: 'A bold, modern footer: a closing call to action with a button at the top, a row of links and social icons in the middle, and your brand name as a giant wordmark across the full width at the bottom, revealed letter by letter with GSAP SplitText. A favourite of agencies, studios and design-led startups.',
  bestFor: ['Agency, studio and portfolio sites', 'Design-led startups and product launches', 'Dark-themed websites'],

  groups: [
    { id: 'cta', label: 'Call to action' },
    { id: 'links', label: 'Links' },
    { id: 'social', label: 'Social links', toggle: 'showSocials' },
    { id: 'bottom', label: 'Wordmark & copyright' },
  ],
  fields: [
    { key: 'heading', group: 'cta', label: 'Heading', type: 'textarea', value: 'Have a project in mind? *Let’s talk.*' },
    { key: 'cta', group: 'cta', label: 'Button text (optional)', type: 'text', value: 'Start a project' },
    { key: 'ctaUrl', group: 'cta', label: 'Button link', type: 'url', value: 'mailto:hello@yourstudio.com' },
    { key: 'email', group: 'cta', label: 'Email line (optional)', type: 'text', value: 'hello@yourstudio.com' },
    { key: 'links', group: 'links', label: 'Links', type: 'links', value: 'Work | /work/\nServices | /services/\nAbout | /about/\nJournal | /journal/\nContact | /contact/' },
    { key: 'wordmark', group: 'bottom', label: 'Wordmark', type: 'text', value: 'NORTHSTAR', hint: 'Short names (up to about 10 letters) fill the width best.' },
    { key: 'copyright', group: 'bottom', label: 'Copyright', type: 'text', value: '© 2026 Northstar Studio' },
    { key: 'legal', group: 'bottom', label: 'Legal links (optional)', type: 'links', value: 'Privacy | /privacy/\nImprint | /imprint/' },
  ],
  lists: [
    { key: 'socials', group: 'social', label: 'Social links', itemLabel: 'Social link', titleKey: 'label', min: 1, max: 8, fields: socialFields(), value: [{ icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' }, { icon: 'dribbble', label: 'Dribbble', url: 'https://dribbble.com/' }, { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' }] },
  ],
  toggles: [{ key: 'showSocials', label: 'Social links', value: true }],
  theme: { brand: '#fb923c', brandText: '#1a0d04', bg: '#0c0a09', surface: '#1c1917', text: '#fafaf9', muted: '#a8a29e', radius: '999' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<footer class="fgi">
  <div class="st-wrap">
    <div class="fgi-cta">
      <h2 class="st-h2 fgi-title" data-anim="item" data-edit="heading"></h2>
      <div class="fgi-cta-side" data-anim="item">
        <a class="st-btn" data-href="ctaUrl" data-show-if="cta"><span data-edit="cta"></span> <span aria-hidden="true">→</span></a>
        <p class="fgi-email" data-edit="email"></p>
      </div>
    </div>
    <div class="fgi-mid" data-anim="item">
      <nav aria-label="Footer"><ul class="fgi-links" data-links="links"></ul></nav>
      <div data-show="showSocials">${SOCIAL_HTML}</div>
    </div>
    <p class="fgi-word" data-anim-text data-edit="wordmark" aria-hidden="true"></p>
    <div class="fgi-bottom">
      <p data-edit="copyright"></p>
      <ul class="fgi-legal" data-show-if="legal" data-links="legal"></ul>
    </div>
  </div>
</footer>`,
  css: `.st-footer-giant{padding:clamp(64px,8cqi,112px) 0 28px}
${SOCIAL_CSS}
.fgi-cta{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:28px;padding-bottom:clamp(36px,5cqi,64px);border-bottom:1px solid color-mix(in srgb,var(--st-text) 12%,transparent)}
.fgi .fgi-title{max-width:14em;font-size:clamp(32px,3.6cqi + 12px,60px)}
.fgi-cta-side{display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.fgi-email{color:var(--st-muted);font-size:15px}
.fgi-email:empty{display:none}
.fgi-mid{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;padding:28px 0}
.fgi-links{list-style:none;display:flex;flex-wrap:wrap;gap:8px 28px}
.fgi-links a{color:var(--st-text);font-weight:600;font-size:16px;text-decoration:none}
.fgi-links a:hover{color:var(--st-brand)}
.fgi .st-social{background:color-mix(in srgb,var(--st-text) 9%,transparent);border-radius:50%}
.fgi-word{margin:clamp(8px,2cqi,24px) 0 0;font:800 clamp(34px,14.6cqi,236px)/.82 var(--st-font-heading);letter-spacing:-.06em;text-align:center;white-space:nowrap;color:var(--st-text);-webkit-mask:linear-gradient(180deg,#000 35%,rgba(0,0,0,.08));mask:linear-gradient(180deg,#000 35%,rgba(0,0,0,.08));user-select:none}
.fgi-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px 24px;margin-top:24px;color:var(--st-muted);font-size:14px}
.fgi-legal{list-style:none;display:flex;gap:20px}
.fgi-legal a{color:var(--st-muted);text-decoration:none}
.fgi-legal a:hover{color:var(--st-text)}`,
};
