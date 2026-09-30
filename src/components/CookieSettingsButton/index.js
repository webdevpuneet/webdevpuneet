'use client';

import styles from './styles.module.css';

// Sits in the sidebar bottom next to the theme toggle. Clicking it asks the
// CookieConsent notice (rendered in the root layout) to reopen so visitors can
// re-read the cookie/terms notice at any time.
export default function CookieSettingsButton() {
  function open() {
    try { window.dispatchEvent(new Event('open-cookie-settings')); } catch {}
  }

  return (
    <button
      className={`${styles.toggle} ${styles.iconOnly}`}
      onClick={open}
      title="View cookie notice"
      aria-label="Cookie notice"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/>
        <path d="M8.5 8.5h.01"/><path d="M15 9.5h.01"/>
        <path d="M9.5 14.5h.01"/><path d="M13.5 14h.01"/>
      </svg>
    </button>
  );
}
