'use client';

/* True once the visitor has entered the Patreon supporter passcode (src/lib/premium.js): ads are removed site-wide.
   False on the server and on the first render, then set from the browser, so a normal visit is unchanged. */

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
