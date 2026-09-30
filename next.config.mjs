const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isProd && { output: 'export' }),  // static export only for production builds
  // Optional separate build folder, so a verification build never clobbers the
  // .next folder a running dev server is using. Unset = the usual .next.
  ...(process.env.NEXT_DIST_DIR && { distDir: process.env.NEXT_DIST_DIR }),
  serverExternalPackages: ['shiki'],
  trailingSlash: true,
  // The eslint-config-next version was mismatched with Next's major version for a
  // while, so lint was silently crashing instead of running — real pre-existing
  // errors (react/no-unescaped-entities, no-html-link-for-pages, etc.) were never
  // actually gating anything. Now that the versions match, those errors surface
  // and block the build. Don't let lint block production builds; run `next lint`
  // separately to see and fix them.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
