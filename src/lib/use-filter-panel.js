'use client';

import { useEffect, useState } from 'react';

/* Open / closed state of a gallery's filter panel (Email, Social Post, Section and Website Builder
   galleries, UI snippets gallery). Open by default on wide screens, closed by default on phones and
   small tablets (900px and below, where the panel stacks above the results and would push them off
   the screen). Once the visitor taps Filters / Done, their choice wins until they reload.

   `auto` is true until then: the panel gets the `panelAuto` CSS class, which hides it at 900px and
   below. That keeps it out of the first paint on a phone: the server cannot know the screen width, so
   without it the open panel flashes and then jumps away once this effect runs. */
export default function useFilterPanel() {
  const [pref, setPref] = useState(null); // null = untouched: follow the screen
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const open = pref ?? !narrow;
  return { open, auto: pref === null, toggle: () => setPref(!open), close: () => setPref(false) };
}
