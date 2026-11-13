'use client';

/* Global "support the site" modal. After the visitor clicks a Copy / Export / Download button anywhere on the site, the
   Patreon support dialog (the same one as the sidebar bar) opens. If the visitor dismisses it (Not now, Esc, click outside) it waits 10 minutes before it can show again;
   after "Support on Patreon" it waits 24 hours; after "I'm already a supporter" it stays away for 30 days (localStorage).
   One delegated click listener, so every current and future button is covered without wiring each one.
   Never inside an iframe (embeds), and never for clicks inside the dialog itself. */

import { useEffect, useRef, useState } from 'react';
import { PremiumUnlockDialog } from '@/components/PremiumGate';
import { isUnlocked, isMarkedSupporter } from '@/lib/premium';

const KEY = 'wdp_support_prompt_next';   // timestamp: no prompt before this time
const SNOOZE = 10 * 60 * 1000;           // dismissed: ask again after 10 minutes
const DAY = 24 * 60 * 60 * 1000;         // went to Patreon: leave them alone for a day
const DELAY = 900;                       // let the copy / download finish before the dialog appears
// Copy / export / download / fork / embed / save-as style buttons, and the one-click "use this" buttons
const ACTION = /\b(copy|copied|export|download|fork|embed|save (as|to|snippet|design|code|template)|use this|start using|add to page|get the code)\b/i;

function labelOf(el) {
  return `${el.getAttribute('aria-label') || ''} ${el.getAttribute('title') || ''} ${el.textContent || ''}`.trim();
}

/** Is this click on a Copy / Export / Download button (or on a choice inside an Export menu)? */
function isActionClick(target) {
  const el = target.closest?.('button, a, [role="menuitem"]');
  if (!el || el.closest('[role="dialog"]')) return false;
  if (el.getAttribute('aria-haspopup')) return false;          // the Export ▾ trigger only opens a menu
  if (el.closest('[data-no-support-prompt]')) return false;
  const label = labelOf(el);
  if (label.length <= 80 && ACTION.test(label)) return true;
  const menu = el.closest('[role="menu"]');                    // e.g. "React" inside the Export menu
  const trigger = menu?.parentElement?.querySelector('[aria-haspopup]');
  if (trigger) return ACTION.test(labelOf(trigger));
  return !!menu && /export|download|copy|embed/i.test((menu.textContent || '').slice(0, 120));   // menu rendered elsewhere: judged by its heading
}

export default function SupportPrompt() {
  const [open, setOpen] = useState(false);
  const nextAt = useRef(0);        // in-memory copy, so snoozing works even when storage is blocked
  const pending = useRef(false);   // a prompt is already scheduled or showing

  const snooze = ms => {
    nextAt.current = Math.max(nextAt.current, Date.now() + ms);   // never shortens a longer wait (e.g. the day after Patreon)
    try { localStorage.setItem(KEY, String(nextAt.current)); } catch { /* ignore */ }
  };

  useEffect(() => {
    if (window.self !== window.top) return undefined;
    let timer = null;
    const onClick = e => {
      if (pending.current || !isActionClick(e.target)) return;
      let next = nextAt.current;
      try {
        if (isMarkedSupporter() || isUnlocked()) return;   // said "already a supporter" in the last 30 days, or has the passcode
        next = Math.max(next, Number(localStorage.getItem(KEY) || 0));
      } catch { /* storage blocked: the in-memory time still applies */ }
      if (Date.now() < next) return;
      pending.current = true;
      timer = setTimeout(() => setOpen(true), DELAY);
    };
    document.addEventListener('click', onClick, true);
    return () => { document.removeEventListener('click', onClick, true); clearTimeout(timer); };
  }, []);

  const close = () => { setOpen(false); pending.current = false; snooze(SNOOZE); };   // ignored / "Not now"
  const supported = () => snooze(DAY);                                               // clicked "Support on Patreon"
  const alreadySupporter = () => { /* the dialog stores the choice (markSupporter) and shows its thank-you */ };
  return <PremiumUnlockDialog open={open} onClose={close} onSupport={supported} onAlreadySupporter={alreadySupporter} />;
}
