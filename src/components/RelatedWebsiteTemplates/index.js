'use client';

import { useEffect, useState } from 'react';
import ToolCarousel from '@/components/ToolCarousel';
import TEMPLATES from '@/data/website-templates-nav.json';

/* "Related website templates" strip under the Website Builder editor, in place of the related-tools
   strip. The template being edited (?starter=<id>) is left out and its industry comes first. */
export default function RelatedWebsiteTemplates() {
  const [current, setCurrent] = useState('');
  useEffect(() => {
    try { setCurrent(new URLSearchParams(window.location.search).get('starter') || ''); } catch (_) {}
  }, []);

  const industry = TEMPLATES.find(t => t.id === current)?.industry;
  const list = TEMPLATES
    .filter(t => t.id !== current)
    .sort((a, b) => (b.industry === industry) - (a.industry === industry))
    .slice(0, 12)
    .map(t => ({ slug: t.id, name: t.name, href: `/website-builder/templates/${t.id}/`, image: `/images/website-templates/full/${t.id}.jpg`, scrollImage: true }));

  return (
    <ToolCarousel
      title="Related Website Templates"
      count={`${list.length} templates`}
      tools={list}
      allHref="/website-builder/"
      ariaLabel="Related website templates"
    />
  );
}
