import styles from '../privacy-policy/styles.module.css';

export const metadata = {
  title: 'Contact webdevpuneet.com — Get in Touch | webdevpuneet.com',
  description: 'Contact webdevpuneet.com with a bug report, a tool suggestion, feedback, or an advertising inquiry. Email puneet438@gmail.com — usually a reply within a day or two.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/contact/' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/contact/',
    siteName: 'webdevpuneet.com',
    title: 'Contact webdevpuneet.com',
    description: 'Contact webdevpuneet.com with a bug report, a tool suggestion, feedback, or an advertising inquiry.',
    images: [{ url: 'https://webdevpuneet.com/images/dev-tools.png', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Contact webdevpuneet.com',
    description: 'Contact webdevpuneet.com with a bug report, a tool suggestion, feedback, or an advertising inquiry.',
    images: ['https://webdevpuneet.com/images/dev-tools.png'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://webdevpuneet.com/contact/' },
  ],
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact webdevpuneet.com',
  url: 'https://webdevpuneet.com/contact/',
  about: { '@type': 'Organization', name: 'webdevpuneet.com', url: 'https://webdevpuneet.com' },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.updated}>Bugs · tool suggestions · feedback · advertising</p>

          <section className={styles.section}>
            <h2>Get in Touch</h2>
            <p>webdevpuneet.com is a solo project — there's no support team or ticketing system, just a real inbox that gets checked daily. Whatever the reason, the fastest way to reach out is by email at <a href="mailto:puneet438@gmail.com">puneet438@gmail.com</a>. Most messages get a reply within a day or two.</p>
          </section>

          <section className={styles.section}>
            <h2>Found a Bug?</h2>
            <p>Include which tool or snippet it was, what you did right before it happened, and your browser if you can — that's usually enough to reproduce and fix it. Screenshots help but aren't required.</p>
          </section>

          <section className={styles.section}>
            <h2>Want a New Tool or Feature?</h2>
            <p>Most of the 183+ tools on this site exist because someone (often just me) needed them for a real project. If there's a utility, snippet, or playground you keep wishing existed, say so — it's genuinely how new additions get prioritized.</p>
          </section>

          <section className={styles.section}>
            <h2>Advertising on webdevpuneet.com</h2>
            <p>webdevpuneet.com gets regular traffic from frontend developers, freelancers, and people learning to code — visitors actively looking for tools, components, and resources to use in real projects. If that audience is a fit for what you're offering, email <a href="mailto:puneet438@gmail.com">puneet438@gmail.com</a> with a bit about what you'd like to advertise, and rates and available placements (including the sidebar spot shown across every tool and snippet page) will be sent back directly.</p>
          </section>

          <section className={styles.section}>
            <h2>Other Ways to Reach Out</h2>
            <p>On X: <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a>. More about the project and who builds it is on the <a href="/about/">About page</a>.</p>
          </section>

          <div className={styles.footer}>
            Built with care by <a href="https://www.webdevpuneet.com/" target="_blank" rel="noopener noreferrer">Puneet Sharma</a> · <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a>
          </div>
        </div>
      </div>
    </>
  );
}
