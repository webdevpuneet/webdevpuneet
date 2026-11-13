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
    <div className={s.backdrop} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <form className={s.dialog} role="dialog" aria-modal="true" aria-labelledby="prem-title" onSubmit={submit}>
        <img className={s.hero} src="/images/patreon-supporter.webp" alt="Puneet at his desk building webdevpuneet.com" width="880" height="880" loading="lazy" />
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
            <button type="button" className={s.close} onClick={onClose}>Not now</button>
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
