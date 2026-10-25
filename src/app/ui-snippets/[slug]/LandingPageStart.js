import styles from './styles.module.css';

/* Landing-page template snippets: the website section templates the page is built from (each linked
   to its own page) plus a button that opens the template in the Website Builder. It replaces the
   "Build with AI" block that other snippets show. */
export function StartTemplateButtons({ start }) {
  return (
    <div className={styles.startActions}>
      <a className={styles.startBtn} href={start.url} target="_blank" rel="noopener">Start using this template</a>
      <a className={styles.startLink} href={start.templateUrl}>About the {start.name} template</a>
      <a className={styles.startLink} href="/website-section-templates/">All website section templates</a>
    </div>
  );
}

export default function LandingPageStart({ start, sections }) {
  return (
    <div className={styles.startCard}>
      <p className={styles.startLabel}>Built from website section templates</p>
      <h2 className={styles.startTitle}>The {sections.length} Sections Behind This {start.name} Page</h2>
      <p className={styles.startIntro}>This page is not one big block of code: it is stacked from ready-made sections in the free Website Section Templates library, in this order. Open any of them to edit it on its own, or start with the whole page.</p>
      <ol className={styles.startList}>
        {sections.map(s => (
          <li key={s.id}>
            <a href={s.url}>{s.name}</a>
            <span>{s.role}</span>
          </li>
        ))}
      </ol>
      <StartTemplateButtons start={start} />
    </div>
  );
}
