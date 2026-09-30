'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const SHORTNAME = 'fwdtools';

export default function DisqusComments({ pageUrl, pageIdentifier, autoLoad = false, fullWidth = false }) {
  const [loaded, setLoaded] = useState(autoLoad);

  function loadScript() {
    window.disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
    };

    if (window.DISQUS) {
      window.DISQUS.reset({ reload: true, config: window.disqus_config });
      return;
    }

    const script = document.createElement('script');
    script.id = 'dsq-embed-scr';
    script.src = `https://${SHORTNAME}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', String(+new Date()));
    script.async = true;
    document.body.appendChild(script);
  }

  useEffect(() => {
    if (autoLoad) loadScript();
  }, []);

  function handleClick() {
    setLoaded(true);
    setTimeout(loadScript, 0);
  }

  return (
    <div className={fullWidth ? styles.wrapFull : styles.wrap}>
      {!loaded && (
        <div className={styles.card}>
          <div className={styles.cardRow}>
            <div className={styles.cardOption}>
              <span className={styles.cardEmoji}>👍</span>
              <span className={styles.cardOptionTitle}>Love this tool?</span>
              <span className={styles.cardOptionDesc}>Leave a quick comment and let us know what you think.</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardOption}>
              <span className={styles.cardEmoji}>🐛</span>
              <span className={styles.cardOptionTitle}>Found an issue?</span>
              <span className={styles.cardOptionDesc}>Tell us what's broken and we'll fix it fast.</span>
            </div>
          </div>
          <button className={styles.loadBtn} onClick={handleClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Load comments
          </button>
        </div>
      )}
      {loaded && (
        <>
          <div id="disqus_thread" className={styles.thread} />
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" rel="nofollow noopener noreferrer">
              comments powered by Disqus.
            </a>
          </noscript>
        </>
      )}
    </div>
  );
}
