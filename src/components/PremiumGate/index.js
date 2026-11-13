'use client';

/* The Patreon lock (see src/lib/premium.js): a hook for the unlock state, the passcode dialog and the locked toolbar button. */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import us from '../UiSnippetsTool/styles.module.css';
import { PATREON_URL, PATREON_PRICE, isUnlocked, tryUnlock, onUnlockChange, markSupporter, isMarkedSupporter } from '@/lib/premium';
import s from './styles.module.css';

export function usePremiumUnlocked() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(isUnlocked());
    sync();
    return onUnlockChange(sync);
  }, []);
  return on;
}

/** True once the visitor said "I'm already a supporter" (or entered the passcode): the sidebar bar then shows the thank-you */
export function useSupporterThanks() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(isMarkedSupporter() || isUnlocked());
    sync();
    return onUnlockChange(sync);
  }, []);
  return on;
}

const LOCK = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);

/** The small "Patreon" lock tag on template cards and pages */
export function PremiumBadge({ corner = false, kind = 'template' }) {
  const title = kind === 'game'
    ? 'Patreon supporter game: play it free, the code, export and fork need the supporter passcode'
    : 'Patreon supporter template: preview and edit freely, export with the supporter passcode';
  return <span className={`${s.badge} ${corner ? s.corner : ''}`} title={title}>{LOCK} Patreon</span>;
}

/** Passcode dialog: opens the Patreon page to get the code, or checks the one typed in */
export function PremiumUnlockDialog({ open, onClose, name = '', onUnlocked, reload = true, onAlreadySupporter, onSupport }) {
  const [code, setCode] = useState('');
  const [state, setState] = useState(''); // '', 'checking', 'wrong', 'done'
  const input = useRef(null);
  const thanked = useSupporterThanks(); // already said so (or has the passcode): no need to ask again
  useEffect(() => { if (open) { setCode(''); setState(''); setTimeout(() => input.current?.focus(), 50); } }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open || typeof document === 'undefined') return null;
  const submit = async e => {
    e.preventDefault();
    setState('checking');
    if (await tryUnlock(code, { notify: !reload })) {
      onUnlocked?.();
      // The page reloads, so every ad already on it is gone. The unlock is stored without notifying the page, so nothing
      // re-renders (or unmounts a live ad) in the moment before the reload. The Website Builder restores its autosave.
      if (reload) { setState('done'); setTimeout(() => window.location.reload(), 700); } else { setState(''); onClose(); }
    } else setState('wrong');
  };
  return createPortal(
    <div className={s.backdrop}>{/* clicking outside does not close it: only Not now, Esc or the buttons do */}
      <form className={s.dialog} role="dialog" aria-modal="true" aria-labelledby="prem-title" onSubmit={submit}>
        <div className={s.xWrap}><button type="button" className={s.xClose} onClick={() => onClose('x')} aria-label="Close">×</button></div>
        <img className={s.hero} src="/images/patreon-supporter.webp" alt="Puneet at his desk building webdevpuneet.com" width="880" height="880" loading="lazy" />
        <div className={s.follow}>
          <span className={s.followLabel}>Follow</span>
          <a className={`${s.followBtn} ${s.followFb}`} href="https://www.facebook.com/profile.php?id=61595046687403" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
            Follow on Facebook
          </a>
          <a className={`${s.followBtn} ${s.followX}`} href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            Follow on X
          </a>
        </div>
        <div className={s.story}>
          <strong>Built with passion. Shared with everyone.</strong>
          <p>WebDevPuneet is an independent project made with countless hours of work. <b>If it has helped you or saved you time, please consider becoming a supporter</b> and help keep it alive and growing.</p>
        </div>
        <div className={s.head}>
          <span className={s.lockIcon}>♥</span>
          <h2 id="prem-title" className={s.title}>Support the site: $1/month</h2>
        </div>
        <ul className={s.list}>
          <li>Everything stays free for everyone: every tool, template, snippet, game, export and fork</li>
          <li>Your support pays for hosting and keeps new tools, templates and games coming</li>
        </ul>
        {state === 'thanks' ? (
          <p className={s.ok} role="status" style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, margin: '8px 0 4px' }}>♥ Thank you for supporting WebDevPuneet! It means a lot.</p>
        ) : (
          <>
            <a className={s.patreon} href={PATREON_URL} target="_blank" rel="noopener noreferrer" onClick={() => onSupport?.()}>Support on Patreon</a>
            <button type="button" className={s.close} onClick={() => onClose('notnow')}>Not now, will think about it later on...</button>
            {!thanked && <button type="button" className={s.close} onClick={() => { markSupporter(); onAlreadySupporter?.(); setState('thanks'); setTimeout(onClose, 2200); }}>I'm already a supporter</button>}
          </>
        )}
      </form>
    </div>,
    document.body
  );
}

/** The note on a premium template's page: what is free and what needs the passcode */
export function PremiumNotice({ name }) {
  return (
    <div className={s.notice}>
      <PremiumBadge />
      <p>{name} is a Patreon supporter template. Preview it and edit everything for free. Exporting it (HTML, ZIP and the other formats) and forking it to My Code need the supporter passcode, posted for patrons on Patreon. Supporters ({PATREON_PRICE}) also get a site with no ads.</p>
      <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">Get the passcode on Patreon →</a>
    </div>
  );
}

/** Replaces the Fork and Export buttons while a premium site is locked */
export function LockedExportButton({ onClick, title = 'Export and Fork are for Patreon supporters: click to enter the passcode' }) {
  return (
    <button type="button" className={`${us.iconBtn} ${us.iconBtnAccent}`} onClick={onClick} title={title}>
      {LOCK}
      Unlock export
    </button>
  );
}
