import WebsiteBuilder from '@/components/WebsiteBuilder';
import styles from '../../tool-page.module.css';

/* The builder itself. /website-builder/ is the landing page (templates first) and carries
   the SEO content, so this page's canonical is /website-builder/ (links to the editor, including
   ?starter= and ?page= URLs, consolidate there). No noindex: it would contradict the canonical. Opened with ?starter=<id|blank>, ?page=<id> or ?add=1.
   Nothing below the editor: no ad and no related-templates strip. */
const CANONICAL = 'https://webdevpuneet.com/website-builder/';
const TITLE = 'Website Builder Editor — Build From Sections, Export HTML';
const DESC = 'Build a web page from navbars, heroes, pricing, FAQ and footers with one theme and GSAP animation. Edit in place, preview on any device and export clean HTML.';
const OG = 'https://webdevpuneet.com/images/website-builder.png';

export const metadata = {
  title: TITLE,
  description: DESC,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  icons: { icon: '/icons/website-builder.svg', shortcut: '/icons/website-builder.svg' },
  openGraph: { type: 'website', url: CANONICAL, siteName: 'webdevpuneet.com', title: TITLE, description: DESC, locale: 'en_US', images: [{ url: OG, width: 1200, height: 630, alt: 'Website Builder: a landing page built from sections' }] },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: TITLE, description: DESC, images: [OG] },
};

export default function WebsiteBuilderEditorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.toolSection}><WebsiteBuilder /></div>
    </div>
  );
}
