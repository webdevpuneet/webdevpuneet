'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Preview from './Preview';
import { defaultState } from './render';
import { templateById } from './templates/index.js';

/* Live, read-only preview of a template's default design (used beside the About text). */
export default function TemplateShot({ id, maxH = 560 }) {
  const t = templateById(id);
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const state = useMemo(() => defaultState(t), [t]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {w > 0 && <Preview template={t} state={state} maxW={w} maxH={maxH} />}
    </div>
  );
}
