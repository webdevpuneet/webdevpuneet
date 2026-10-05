import { fetchLatestBlogPosts } from '@/lib/blog-feed';

// /blog-posts.json — the latest blog posts, captured at build time and served from this
// site. BlogStrip falls back to it when the live WordPress API can't be reached from the
// browser, so the "Latest from the Blog" strip never silently disappears.
export const dynamic = 'force-static';

export async function GET() {
  const posts = await fetchLatestBlogPosts(6);
  return Response.json(posts);
}
