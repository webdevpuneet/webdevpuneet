import styles from './styles.module.css';

/* Home page: the four template libraries (website sections, website templates, social posts,
   emails) as light text cards: name, count, what it is, category links and a button. No
   preview images and no carousel, so the page loads fast and ships no per-template data.
   `libs`: [{ id, title, count, blurb, href, cta, chips: [{ label, href, n? }], moreLabel, accent }] */
const CHIPS_SHOWN = 8;

export default function HomeTemplateLibraries({ libs }) {
  return (
    <section className={styles.section} aria-labelledby="home-template-libraries">
      <div className={styles.header}>
        <h2 id="home-template-libraries" className={styles.title}>Free Templates</h2>
        <span className={styles.headCount}>Edit in your browser, export HTML, React or Vue</span>
      </div>
      <div className={styles.grid}>
        {libs.map(l => (
          <article key={l.id} className={styles.card} style={{ '--lib-accent': l.accent }}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}><a href={l.href}>{l.title}</a></h3>
              <span className={styles.count}>{l.count}</span>
            </div>
            <p className={styles.blurb}>{l.blurb}</p>
            <ul className={styles.chips} aria-label={`${l.title} by ${l.chipsLabel || 'category'}`}>
              {l.chips.slice(0, CHIPS_SHOWN).map(c => (
                <li key={c.href}><a href={c.href} className={styles.chip}>{c.label}{c.n ? <em>{c.n}</em> : null}</a></li>
              ))}
              {l.chips.length > CHIPS_SHOWN && <li><a href={l.href} className={`${styles.chip} ${styles.chipMore}`}>+{l.chips.length - CHIPS_SHOWN} more</a></li>}
            </ul>
            <a href={l.href} className={styles.cta}>{l.cta} <span aria-hidden="true">&rarr;</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}
