'use client';

/* Global "support the site" modal. After the visitor clicks a Copy / Export / Download button anywhere on the site, the
   Patreon support dialog (the same one as the sidebar bar) opens. If the visitor closes it (outside click, Not now, Esc) it shows again on the next click;
   after "Support on Patreon" it waits 24 hours; after "I'm already a supporter" it stays away for 30 days (localStorage).
   One delegated click listener, so every current and future button is covered without wiring each one.
   Never inside an iframe (embeds), and never for clicks inside the dialog itself.

   Exit intent (desktop with a mouse only): when the pointer leaves through the top of the window after the visitor has been on the
   page for a while, the same dialog opens once per page view. Closing it in any way (cross, Not now, Esc, outside click) keeps the
   exit-intent trigger away for 24 hours (its own localStorage key); the Copy / Export trigger above is not affected. It also stays
   away for supporters, people with the passcode, and while the Copy / Export snooze (24 hours after "Support on Patreon") applies. */

import { useEffect, useRef, useState } from 'react';
import { PremiumUnlockDialog } from '@/components/PremiumGate';
import { isUnlocked, isMarkedSupporter } from '@/lib/premium';

const KEY = 'wdp_support_prompt_next';   // timestamp: no prompt before this time
const DAY = 24 * 60 * 60 * 1000;         // went to Patreon: leave them alone for a day
const EXIT_KEY = 'wdp_support_exit_next'; // timestamp: no exit-intent prompt before this time (set when the visitor closes it)
const EXIT_MIN_TIME = 10 * 1000;         // the visitor must have been on the page this long before leaving counts as "exit intent"
const DELAY = 900;                       // let the copy / download finish before the dialog appears
// Copy / export / download / fork / embed / save-as style buttons, the one-click "use this" buttons and the website template "Live demo" links
const ACTION = /\b(copy|copied|export|download|fork|embed|save (as|to|snippet|design|code|template)|use this|start using|get the code|live demo)\b/i;

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
  const openedBy = useRef('');     // 'exit' when the exit-intent trigger opened the dialog
  const exitNext = useRef(0);      // in-memory copy of the exit-intent cooldown

  const snooze = ms => {
    nextAt.current = Math.max(nextAt.current, Date.now() + ms);   // never shortens a longer wait (e.g. the day after Patreon)
    try { localStorage.setItem(KEY, String(nextAt.current)); } catch { /* ignore */ }
  };

  useEffect(() => {
    if (window.self !== window.top) return undefined;
    let timer = null;
    const trigger = () => {
      if (pending.current) return;
      let next = nextAt.current;
      try {
        if (isMarkedSupporter() || isUnlocked()) return;   // said "already a supporter" in the last 30 days, or has the passcode
        next = Math.max(next, Number(localStorage.getItem(KEY) || 0));
      } catch { /* storage blocked: the in-memory time still applies */ }
      if (Date.now() < next) return;
      pending.current = true;
      timer = setTimeout(() => setOpen(true), DELAY);
    };
    const onClick = e => { if (isActionClick(e.target)) trigger(); };
    document.addEventListener('click', onClick, true);
    // A download that starts without a click on this page (e.g. an export run on arrival from a template page): window.dispatchEvent(new Event('wdp-support-prompt'))
    window.addEventListener('wdp-support-prompt', trigger);

    // Exit intent: the pointer leaves through the top edge of the window (towards the tabs, address bar or the close button)
    const mouse = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const arrived = Date.now();
    let shownThisVisit = false;
    const onLeave = e => {
      if (!mouse || shownThisVisit || pending.current) return;
      if (e.relatedTarget !== null || e.clientY > 0) return;          // only a move out of the window through the top
      if (Date.now() - arrived < EXIT_MIN_TIME) return;
      if (document.querySelector('[role="dialog"]')) return;          // another dialog is already open
      let next = Math.max(nextAt.current, exitNext.current);
      try {
        if (isMarkedSupporter() || isUnlocked()) return;
        next = Math.max(next, Number(localStorage.getItem(KEY) || 0), Number(localStorage.getItem(EXIT_KEY) || 0));
      } catch { /* storage blocked: the in-memory times still apply */ }
      if (Date.now() < next) return;
      shownThisVisit = true;
      pending.current = true;
      openedBy.current = 'exit';
      setOpen(true);
    };
    document.addEventListener('mouseout', onLeave);
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener('wdp-support-prompt', trigger); document.removeEventListener('mouseout', onLeave); clearTimeout(timer); };
  }, []);

  // Closing the modal any other way (outside click, Not now, Esc) does not snooze the Copy / Export trigger: it shows again on the next Copy / Export click.
  // Only "Support on Patreon" (24 hours) and "I'm already a supporter" (30 days) keep it away.
  const close = () => {
    setOpen(false);
    pending.current = false;
    if (openedBy.current === 'exit') {            // closed after an exit-intent prompt: leave that trigger alone for 24 hours
      exitNext.current = Date.now() + DAY;
      try { localStorage.setItem(EXIT_KEY, String(exitNext.current)); } catch { /* ignore */ }
    }
    openedBy.current = '';
  };
  const supported = () => snooze(DAY);                                               // clicked "Support on Patreon"
  const alreadySupporter = () => { /* the dialog stores the choice (markSupporter) and shows its thank-you */ };
  return <PremiumUnlockDialog open={open} onClose={close} onSupport={supported} onAlreadySupporter={alreadySupporter} />;
}
