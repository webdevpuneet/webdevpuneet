'use client';

// Replaces the "Source Code" block on a game's snippet page (src/app/ui-snippets/[slug]/page.js) while the games are
// Patreon-only (LOCK_GAME_CODE in src/lib/patreon-settings.js). The page sends no code to the browser for a game, so
// nothing about it is in the static HTML. A supporter is pointed to the editor above, which shows the code once unlocked.

import { useState } from 'react';
import { usePremiumUnlocked, PremiumUnlockDialog } from '@/components/PremiumGate';

export default function LockedGameCode() {
  const unlocked = usePremiumUnlocked();
  const [open, setOpen] = useState(false);
  const box = { display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', padding: '18px 20px', border: '1px dashed rgba(99,102,241,.5)', borderRadius: 14, background: 'rgba(99,102,241,.06)' };
  return (
    <div style={box}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
      {unlocked ? (
        <p style={{ margin: 0, flex: 1, minWidth: 220, lineHeight: 1.5 }}>Thanks for supporting the site: the HTML, CSS and JS of this game are in the code panels of the editor at the top of the page, with Copy, Export and Fork.</p>
      ) : (
        <>
          <p style={{ margin: 0, flex: 1, minWidth: 220, lineHeight: 1.5 }}>The game is free to play. Its HTML, CSS and JS, the exports (HTML, React, Vue, Angular, Tailwind) and Fork are for Patreon supporters.</p>
          <button type="button" onClick={() => setOpen(true)} style={{ border: 0, borderRadius: 10, background: '#6366f1', color: '#fff', font: '700 13px system-ui', padding: '10px 16px', cursor: 'pointer' }}>Unlock with passcode</button>
          <PremiumUnlockDialog open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </div>
  );
}
