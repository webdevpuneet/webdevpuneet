'use client';

import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { isEmbedRoute } from '@/lib/is-embed-route';

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (isEmbedRoute(pathname)) return null;

  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>&copy; {year} webdevpuneet.com - All rights reserved</span>
      <nav className={styles.links} aria-label="Footer">
        <a href="/about/" className={styles.link}>About</a>
        <span className={styles.sep}>|</span>
        <a href="/contact/" className={styles.link}>Contact</a>
        <span className={styles.sep}>|</span>
        <a href="https://www.webdevpuneet.com/" className={styles.link} target="_blank" rel="noopener noreferrer">Blog</a>
        <span className={styles.sep}>|</span>
        <a href="/privacy-policy/" className={styles.link}>Privacy Policy</a>
        <span className={styles.sep}>|</span>
        <a href="/terms/" className={styles.link}>Terms</a>
        <span className={styles.sep}>|</span>
        <span className={styles.disclaimer}>
          Disclaimer
          <span className={styles.tooltip}>All tools run entirely in your browser. No data is uploaded to any server.</span>
        </span>
      </nav>
    </footer>
  );
}
