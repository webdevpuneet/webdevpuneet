'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Site-wide standard: the long about/features/use-cases/FAQ block only
// belongs on a tool's bare, canonical URL. The moment the URL carries any
// query string — added by the tool's own JS (a saved view, a page number, a
// loaded id) or typed straight into the address bar — that content unmounts,
// so it never repeats under a non-canonical view. The Suspense fallback
// renders it: static export has no query string at build time, so the
// canonical (query-free) URL always ships the full content in its HTML.
function Gate({ children }) {
  const searchParams = useSearchParams();
  if (searchParams.toString()) return null;
  return children;
}

export default function IndexOnly({ children }) {
  return (
    <Suspense fallback={children}>
      <Gate>{children}</Gate>
    </Suspense>
  );
}
