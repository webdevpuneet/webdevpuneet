'use client';

/* An <img> that starts downloading only when it reaches the viewport (100px ahead, so it
   doesn't visibly pop in). Native loading="lazy" fetches far earlier: Chrome loads images
   1250–2500px before they scroll into view, which on the home page means nearly all of them.
   Without JavaScript (and for crawlers that don't run it) the <noscript> copy loads as normal.
   Takes the same props as <img>. */

import { useEffect, useRef, useState } from 'react';

export default function InViewImg({ src, alt = '', ...rest }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return undefined; }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setShow(true); io.disconnect(); }
    }, { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img ref={ref} src={show ? src : undefined} alt={show ? alt : ''} decoding="async" {...rest} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!show && <noscript><img src={src} alt={alt} {...rest} /></noscript>}
    </>
  );
}
