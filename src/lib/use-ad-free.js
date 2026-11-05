'use client';

/* Supporters (the Patreon passcode, src/lib/premium.js) see no ads.

   useAdFree()        live: true as soon as the passcode is accepted, in this tab or another. For labels and for the
                      class on <html> that hides every ad box (AdSenseScript).
   useAdFreeOnLoad()  decided once, when the page loads (the head script puts html.ad-free there before the first paint
                      for a supporter). The ad components use this one: a supporter's page never mounts an ad, and a
                      passcode entered later does NOT unmount ads that are already showing. AdSense rewrites the DOM
                      inside its <ins> boxes, so React removing them mid-session can throw and blank the whole page;
                      the html.ad-free CSS hides them instead. */

import { useEffect, useState } from 'react';
import { isUnlocked, onUnlockChange } from '@/lib/premium';

export function useAdFree() {
  const [free, setFree] = useState(false);
  useEffect(() => {
    const sync = () => setFree(isUnlocked());
    sync();
    return onUnlockChange(sync);
  }, []);
  return free;
}

export function useAdFreeOnLoad() {
  const [free, setFree] = useState(false);
  useEffect(() => { setFree(document.documentElement.classList.contains('ad-free')); }, []);
  return free;
}
