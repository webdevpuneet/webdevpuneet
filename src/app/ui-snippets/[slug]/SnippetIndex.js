import styles from './styles.module.css';

/* Every snippet in a category as a plain list of links, A to Z, under the category page's text. The gallery above shows
   the snippets a screen at a time with a script, so without this list most of a category's snippet pages had no link a
   crawler could follow (they showed up as "orphan pages" in site audits). This puts all of them one click from the
   category page. It is a closed <details>, so readers see one line; the links are in the page either way. */
export default function SnippetIndex({ label, items }) {
  const list = [...items].sort((a, b) => a.title.localeCompare(b.title));
  if (!list.length) return null;
  return (
    <details className={styles.snippetIndex}>
      <summary className={styles.snippetIndexSummary}>All {list.length} {label} snippets, A to Z</summary>
      <ul className={styles.snippetIndexList}>
        {list.map(s => <li key={s.id}><a href={`/ui-snippets/${s.id}/`}>{s.title}</a></li>)}
      </ul>
    </details>
  );
}
