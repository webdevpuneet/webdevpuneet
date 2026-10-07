'use client';

import ToolCarousel from '@/components/ToolCarousel';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { RELATED_TOOLS } from '@/lib/related-tools';

export default function RelatedStrip({ slug }) {
  const relatedSlugs = RELATED_TOOLS[slug] || [];
  const tools = relatedSlugs
    .map(s => LIVE_TOOLS.find(t => t.slug === s))
    .filter(Boolean)
    .slice(0, 8);

  if (!tools.length) return null;

  return (
    <ToolCarousel
      title="Related Tools"
      count={`${tools.length} tools`}
      tools={tools}
      allHref="/tools/"
      ariaLabel="Related tools"
    />
  );
}
