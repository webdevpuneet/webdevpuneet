'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isEmbedRoute } from '@/lib/is-embed-route';
import styles from './styles.module.css';

/* Site-wide "Design your website" button. Bottom right as a pill with a cross; the cross folds it
   into a slim vertical tab on the right edge of the screen, which stays on every page. After a click
   the pill is not shown again for 24 hours (remembered in localStorage; the page works without storage).
   Hidden on the website builder itself. */
const KEY = 'dwb-collapsed-at';
const DAY = 24 * 60 * 60 * 1000;

export default function DesignWebsiteButton() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try { setCollapsed(Date.now() - Number(localStorage.getItem(KEY) || 0) < DAY); } catch {}
  }, []);

  if (isEmbedRoute(pathname) || /^\/website-builder(\/|$)/.test(pathname || '')) return null;

  const collapse = () => {
    setCollapsed(true);
    try { localStorage.setItem(KEY, String(Date.now())); } catch {}
  };

  if (collapsed) {
    return <a className={styles.tab} href="/website-builder/">Design your website</a>;
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.close} onClick={collapse} aria-label="Minimise to the side">×</button>
      <a className={styles.btn} href="/website-builder/">Design your website</a>
    </div>
  );
}
