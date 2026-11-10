import { notFound } from 'next/navigation';
import { SNIPPETS } from '@/components/UiSnippetsTool/snippets';
import { buildPreviewSrcdoc } from '@/lib/snippet-preview';
import { highlightCode } from '@/lib/shiki-highlight';
import { buildSnippetMetadata } from '@/lib/snippet-seo';
import { isPatreonGame } from '@/lib/patreon-settings';
import EmbedShell from './EmbedShell';

// Static-export only: every embeddable slug is known at build time, same as
// the canonical /ui-snippets/[slug]/ page. No dynamic/runtime slugs.
export const dynamicParams = false;

export function generateStaticParams() {
  return SNIPPETS.map(s => ({ slug: s.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sn = SNIPPETS.find(s => s.id === slug);
  if (!sn) return { title: 'Embed', robots: { index: false, follow: false } };

  // Same title/description/og:image the canonical page advertises, so pasting an
  // /embed/ URL into Slack, X, WhatsApp or Discord unfurls exactly like the real
  // page instead of a bare "… — Embed" with no card.
  //
  // buildSnippetMetadata still points og:url AND the canonical link at
  // /ui-snippets/[slug]/, and still marks the embed noindex — the social tags are
  // shared, the indexable URL is not.
  return buildSnippetMetadata(sn, { embed: true });
}

export default async function SnippetEmbedPage({ params }) {
  const { slug } = await params;
  const sn = SNIPPETS.find(s => s.id === slug);
  if (!sn) notFound();

  const srcDoc = buildPreviewSrcdoc(sn.html, sn.css, sn.js, false, sn.cdnUrls || []);
  // Root-relative on purpose: this link is followed FROM the embed page itself
  // (same origin it was served from), so it resolves correctly on localhost,
  // a staging domain, or production without any hardcoded host.
  const canonicalUrl = `/ui-snippets/${slug}/`;

  // Games are Patreon-only code (LOCK_GAME_CODE): the embed still plays the game, but the code is not sent to the
  // page at all (no code props, no highlighted HTML), and the code tabs show a lock note instead.
  const codeLocked = isPatreonGame(sn.id);

  // Highlighted at build time (dark theme to match the embed shell's dark
  // top bar / code pane), same shiki setup the canonical snippet page uses.
  const [htmlHl, cssHl, jsHl] = codeLocked ? ['', '', ''] : await Promise.all([
    highlightCode(sn.html, 'html', 'github-dark'),
    highlightCode(sn.css, 'css', 'github-dark'),
    sn.js ? highlightCode(sn.js, 'javascript', 'github-dark') : Promise.resolve(''),
  ]);

  return (
    <EmbedShell
      title={sn.title}
      html={codeLocked ? '' : sn.html}
      css={codeLocked ? '' : sn.css}
      js={codeLocked ? '' : (sn.js || '')}
      hasJs={!!sn.js}
      codeLocked={codeLocked}
      htmlHl={htmlHl}
      cssHl={cssHl}
      jsHl={jsHl}
      srcDoc={srcDoc}
      canonicalUrl={canonicalUrl}
      cdnUrls={codeLocked ? [] : (sn.cdnUrls || [])}
    />
  );
}
