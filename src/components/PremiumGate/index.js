'use client';

/* The Patreon lock (see src/lib/premium.js): a hook for the unlock state, the passcode dialog and the locked toolbar button. */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import us from '../UiSnippetsTool/styles.module.css';
import { PATREON_URL, PATREON_PRICE, isUnlocked, tryUnlock, onUnlockChange } from '@/lib/premium';
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

const LOCK = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);

/** The small "Patreon" lock tag on template cards and pages */
export function PremiumBadge({ corner = false }) {
  return <span className={`${s.badge} ${corner ? s.corner : ''}`} title="Patreon supporter template: preview and edit freely, export with the supporter passcode">{LOCK} Patreon</span>;
}

/** Passcode dialog: opens the Patreon page to get the code, or checks the one typed in */
export function PremiumUnlockDialog({ open, onClose, name = '', onUnlocked, reload = true }) {
  const [code, setCode] = useState('');
  const [state, setState] = useState(''); // '', 'checking', 'wrong', 'done'
  const input = useRef(null);
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
        <span className={s.lockIcon}>{LOCK}</span>
        <h2 id="prem-title" className={s.title}>Patreon supporters: no ads, plus premium exports</h2>
        <p className={s.text}>Supporters ({PATREON_PRICE}) see no ads anywhere on the site and can export and fork the templates with a Patreon badge (website, email and social post) and single sections from the Section Templates page (HTML, ZIP, React, Vue, Next.js). Everything else on the site stays free, including building websites from every section. {name ? `You can preview and edit ${name} freely without it. ` : ''}Patrons find the passcode in the latest supporter post on Patreon; it is remembered in this browser.</p>
        <a className={s.patreon} href={PATREON_URL} target="_blank" rel="noopener noreferrer">Get the passcode on Patreon</a>
        <label className={s.label} htmlFor="prem-code">Already a supporter? Enter the passcode</label>
        <div className={s.row}>
          <input id="prem-code" ref={input} className={s.input} value={code} onChange={e => { setCode(e.target.value); setState(''); }} placeholder="Passcode" autoComplete="off" spellCheck={false} aria-invalid={state === 'wrong'} />
          <button type="submit" className={s.go} disabled={!code.trim() || state === 'checking' || state === 'done'}>{state === 'checking' ? 'Checking…' : 'Unlock'}</button>
        </div>
        {state === 'done' && <p className={s.ok} role="status">Unlocked. Thank you for supporting the site! Refreshing the page…</p>}
        {state === 'wrong' && <p className={s.error} role="alert">That passcode is not right. Copy it from the latest supporter post on Patreon.</p>}
        <button type="button" className={s.close} onClick={onClose}>Not now</button>
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
export function LockedExportButton({ onClick }) {
  return (
    <button type="button" className={`${us.iconBtn} ${us.iconBtnAccent}`} onClick={onClick} title="Export and Fork are for Patreon supporters: click to enter the passcode">
      {LOCK}
      Unlock export
    </button>
  );
}
