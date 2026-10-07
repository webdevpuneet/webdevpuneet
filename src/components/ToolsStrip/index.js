'use client';

import ToolCarousel from '@/components/ToolCarousel';
import { LIVE_TOOLS } from '@/lib/tools-registry';

// Every live tool that isn't a playground (CSS tools first, then the rest).
const TOOLS = LIVE_TOOLS
  .filter(t => t.slug !== 'ui-snippets' && !t.slug.endsWith('-playground'))
  .sort((a, b) => (a.category === 'css' ? 0 : 1) - (b.category === 'css' ? 0 : 1));

// Tools strip: image cards, six at a time, arrows page through the rest — the same look as
// the "Latest UI Snippets" carousel. Rendered inside AdSlot's .relatedFull.
export default function ToolsStrip() {
  return (
    <ToolCarousel
      title="Free Developer Tools"
      count={`${TOOLS.length} tools`}
      tools={TOOLS}
      allHref="/tools/"
      ariaLabel="Free developer tools"
    />
  );
}
