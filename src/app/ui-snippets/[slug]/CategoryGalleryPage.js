'use client';

import { Suspense } from 'react';
import UiSnippetsTool from '@/components/UiSnippetsTool';

// Renders just the tool in gallery mode — the outer page wrapper comes from layout.js
export default function CategoryGalleryPage({ slug }) {
  return (
    <Suspense fallback={null}>
      <UiSnippetsTool
        initialSnippetId={null}
        isHome={true}
        initialCategory={slug}
      />
    </Suspense>
  );
}
