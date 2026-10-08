'use client';

import { LIVE_TOOLS } from '@/lib/tools-registry';
import ToolCarousel from '@/components/ToolCarousel';

const PLAYGROUND_SLUGS = [
  'html-playground',
  'css-playground',
  'js-playground',
  'react-playground',
  'gsap-playground',
  'svg-playground',
  'scss-playground',
  'tailwind-playground',
  'bootstrap5-playground',
  'typescript-playground',
  'jquery-playground',
  'angular-playground',
  'vue-playground',
  'nextjs-playground',
];

// `after`: extra strip(s) placed right after this one (home: tools).
export default function FrontendPlaygroundsStrip({ after = null }) {
  const tools = PLAYGROUND_SLUGS
    .map(s => LIVE_TOOLS.find(t => t.slug === s))
    .filter(Boolean);

  if (!tools.length) return null;

  return (
    <>
    <ToolCarousel
      title="Learn Coding Visually"
      count="interactive, live-preview playgrounds"
      tools={tools}
      allHref="/learn-to-code/"
      ariaLabel="Learn coding visually"
    />
    {after}
    </>
  );
}
