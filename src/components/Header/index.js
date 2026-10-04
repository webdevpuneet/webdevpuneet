import styles from './styles.module.css';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <div className={styles.logoIcon}>⚡</div>
          <span className={styles.logoText}>
            Dev<strong>Tools</strong>
          </span>
        </a>
        <nav className={styles.nav}>
          <a href="/json-formatter/" className={styles.navLink}>JSON Formatter</a>
          <a href="/flexbox-builder/" className={styles.navLink}>Flexbox Builder</a>
        </nav>
      </header>
    </>
  );
}
