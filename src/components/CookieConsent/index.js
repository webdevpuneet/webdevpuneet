'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { isEmbedRoute } from '@/lib/is-embed-route';

// Notice-only banner: cookies/ads/analytics are always on (Consent Mode
// defaults to 'granted' in the root layout) and continued use of the site
// counts as agreement. This key just records that the notice was seen so
// it never reappears unprompted.
const STORAGE_KEY = 'fwd-cookie-consent';

// While no choice has been recorded, the banner folds itself into a small
// "Cookies" pill after this long. Folding away is NOT a choice - nothing is
// saved, and the pill reopens the banner.
const AUTO_COLLAPSE_MS = 10000;

// Cookie glyph reused by both the banner header and the floating button.
function CookieIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2c.4 0 .8 0 1.2.1-.5.9-.4 2 .3 2.8.6.7 1.6 1 2.5.8-.1.9.2 1.9.9 2.5.7.6 1.7.8 2.6.5.1.4.1.8.1 1.3 0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Z" fill="currentColor"/>
      <circle cx="8.5" cy="10" r="1.1" fill="var(--cc-icon-bg, #eef2ff)"/>
      <circle cx="13" cy="14" r="1.2" fill="var(--cc-icon-bg, #eef2ff)"/>
      <circle cx="10" cy="15.6" r=".9" fill="var(--cc-icon-bg, #eef2ff)"/>
      <circle cx="15" cy="9.4" r=".8" fill="var(--cc-icon-bg, #eef2ff)"/>
    </svg>
  );
}

export default function CookieConsent() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen]       = useState(false); // banner is in the DOM
  const [shown, setShown]     = useState(false); // banner has faded/slid in
  const [pill, setPill]       = useState(false); // collapsed into the small "Cookies" pill
  const [undecided, setUndecided] = useState(false); // no choice recorded yet
  const [paused, setPaused]     = useState(false); // pointer or focus is on the banner

  // On first mount, show the banner only if no choice has been recorded yet.
  // Either way, listen for the sidebar "Cookie settings" button, which lets
  // visitors reopen the banner to review or change consent at any time.
  useEffect(() => {
    setMounted(true);
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (!saved) { setOpen(true); setUndecided(true); }

    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  // Drive the fade-and-slide whenever the banner enters or leaves the DOM.
  useEffect(() => {
    if (!open) { setShown(false); return; }
    const t = setTimeout(() => setShown(true), 30); // next tick, so the transition runs
    return () => clearTimeout(t);
  }, [open]);

  // Undecided visitors: after AUTO_COLLAPSE_MS the banner slides away and a pill
  // stays in the same corner. Hovering or focusing the banner holds it open.
  useEffect(() => {
    if (!open || !shown || !undecided || paused) return;
    const t = setTimeout(() => {
      setShown(false);
      setTimeout(() => { setOpen(false); setPill(true); }, 450);   // after the slide-out
    }, AUTO_COLLAPSE_MS);
    return () => clearTimeout(t);
  }, [open, shown, undecided, paused]);

  const expand = useCallback(() => { setPill(false); setPaused(false); setOpen(true); }, []);

  const acknowledge = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: 'acknowledged', ts: Date.now() }));
      window.dispatchEvent(new CustomEvent('fwd-consent-changed', { detail: { choice: 'acknowledged' } }));
    } catch (_) {}

    setUndecided(false);
    setPill(false);
    setShown(false);
    // Unmount the banner after the slide-out transition finishes.
    setTimeout(() => setOpen(false), 450);
  }, []);

  if (!mounted) return null;
  // The embed route is a bare iframe target — it must show zero site chrome.
  if (isEmbedRoute(pathname)) return null;

  return (
    <>
      {open && (
        <section
          className={`${styles.banner} ${shown ? styles.visible : ''}`}
          role="dialog"
          aria-labelledby="cc-title"
          aria-describedby="cc-desc"
          aria-hidden={!shown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Header: cookie icon + heading */}
          <div className={styles.head}>
            <span className={styles.icon}><CookieIcon /></span>
            <h2 id="cc-title" className={styles.title}>Cookies on webdevpuneet.com</h2>
          </div>

          {/* Notice copy + policy links */}
          <p id="cc-desc" className={styles.desc}>
            We use cookies for analytics and advertising — they keep webdevpuneet.com fast,
            relevant, and free for everyone. By continuing to use this site, you agree
            to our{' '}
            <a className={styles.link} href="/terms/">Terms of Use</a> and{' '}
            <a className={styles.link} href="/privacy-policy/">Privacy Policy</a>.
          </p>

          {/* Single acknowledge action — notice-only banner */}
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.primary}`}
              onClick={acknowledge}
            >
              Got it
            </button>
          </div>
        </section>
      )}

      {/* Collapsed state: still undecided, one click brings the banner back. */}
      {pill && !open && (
        <button type="button" className={styles.pill} onClick={expand} aria-label="Open cookie notice">
          <CookieIcon size={15} />
          <span>Cookies</span>
        </button>
      )}
    </>
  );
}
