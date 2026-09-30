'use client';
import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('[webdevpuneet.com error]', error);
  }, [error]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.icon}>⚠</div>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.sub}>
          This tool ran into an unexpected error. Your data is safe — nothing was uploaded to any server.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => reset()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
            </svg>
            Try again
          </button>
          <a href="/" className={styles.btnSecondary}>← Back to all tools</a>
        </div>
        {error?.message && (
          <details className={styles.details}>
            <summary>Error details</summary>
            <code>{error.message}</code>
          </details>
        )}
      </div>
    </div>
  );
}
