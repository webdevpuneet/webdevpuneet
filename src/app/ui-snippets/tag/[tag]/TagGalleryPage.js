'use client';

import { Suspense } from 'react';
import UiSnippetsTool from '@/components/UiSnippetsTool';

// Renders the tool in gallery mode filtered to one tag — the outer page wrapper
// comes from ui-snippets/layout.js, exactly as the category galleries do.
export default function TagGalleryPage({ tag }) {
  return (
    <Suspense fallback={null}>
      <UiSnippetsTool
        initialSnippetId={null}
        isHome={true}
        initialTag={tag}
      />
    </Suspense>
  );
}
