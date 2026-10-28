'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Author card for the home hero — a quiet, flat card (no photo) so it does not compete
// with the hero title and search. "Email me" opens a small popover with the
// address and a copy button instead of a mailto: link.
const EMAIL = 'puneet438@gmail.com';
const UPWORK = 'https://www.upwork.com/freelancers/~017de423dd2d0e2767';

export default function ProfileHeroCard() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailRef = useRef(null);

  // Close the email popover on an outside click or Escape.
  useEffect(() => {
    if (!emailOpen) return;
    const onDown = e => { if (!emailRef.current?.contains(e.target)) setEmailOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setEmailOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [emailOpen]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch (_) {}
  }

  return (
    <section className={styles.card} aria-label="About Puneet Sharma">
      <div className={styles.head}>
        <span className={styles.avatar} aria-hidden="true">PS</span>
        <div className={styles.who}>
          <p className={styles.name}>Puneet Sharma</p>
          <p className={styles.role}>Frontend Dev &amp; UI Engineer</p>
        </div>
        <span className={styles.available}><i aria-hidden="true" /> Open to freelance work</span>
      </div>
      <p className={styles.tagline}><strong>Need it built for you?</strong> I make the templates on this site and take on client projects: Figma to HTML, React and WordPress.</p>
      <div className={styles.buttons}>
        <a className={styles.primary} href="/puneet/">Hire me</a>
        <a className={styles.secondary} href={UPWORK} target="_blank" rel="noopener noreferrer">
          <span className={styles.upDot} aria-hidden="true" /> Available on Upwork
        </a>
        <div className={styles.emailWrap} ref={emailRef}>
          <button
            type="button"
            className={styles.secondary}
            aria-expanded={emailOpen}
            onClick={() => setEmailOpen(v => !v)}
          >
            &#9993; Email me
          </button>
          {emailOpen && (
            <div className={styles.emailPop}>
              <span className={styles.emailAddr}>{EMAIL}</span>
              <button type="button" className={`${styles.copy} ${copied ? styles.copied : ''}`} onClick={copyEmail}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
