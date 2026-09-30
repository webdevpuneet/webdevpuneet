'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

const SAFETY_TIMEOUT_MS = 8000;

export default function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const pendingRef = useRef(false);
  const timerRef  = useRef(null);

  function show() {
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = true;
    setVisible(true);
    // Safety: auto-hide if navigation never completes (network error, abort, etc.)
    timerRef.current = setTimeout(hide, SAFETY_TIMEOUT_MS);
  }

  function hide() {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    pendingRef.current = false;
    setVisible(false);
  }

  // Show loader when an internal link is clicked
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor || anchor.target || anchor.download) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const isInternal = href.startsWith('/') || href.startsWith(window.location.origin);
      if (!isInternal) return;

      // Don't show if navigating to the same pathname (would never trigger pathname change)
      const hrefPath = href.startsWith('/')
        ? href.split('?')[0].split('#')[0]
        : (() => { try { return new URL(href).pathname; } catch { return null; } })();
      if (!hrefPath || hrefPath === window.location.pathname) return;

      show();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Hide loader when route change completes
  useEffect(() => {
    if (pendingRef.current) hide();
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div />
        <div />
      </div>
    </div>
  );
}
