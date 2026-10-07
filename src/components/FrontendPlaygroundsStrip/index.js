'use client';

import { LIVE_TOOLS } from '@/lib/tools-registry';
import BlogStrip from '@/components/BlogStrip';
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

// `blogPosts`: latest posts already fetched on the server (home), handed to the blog strip.
// `blogFirst`: blog strip above this one (the default everywhere); false puts it below.
// `after`: extra strip(s) placed right after this one (home: tools).
export default function FrontendPlaygroundsStrip({ blogPosts = null, blogFirst = true, after = null }) {
  const tools = PLAYGROUND_SLUGS
    .map(s => LIVE_TOOLS.find(t => t.slug === s))
    .filter(Boolean);

  if (!tools.length) return null;

  const blog = <BlogStrip initialPosts={blogPosts} first={blogFirst} />;

  return (
    <>
    {blogFirst && blog}
    <ToolCarousel
      title="Learn Coding Visually"
      count="interactive, live-preview playgrounds"
      tools={tools}
      allHref="/learn-to-code/"
      ariaLabel="Learn coding visually"
    />
    {/* Latest blog posts: right after this strip (after any `after` strips) unless blogFirst. */}
    {after}
    {!blogFirst && blog}
    </>
  );
}
