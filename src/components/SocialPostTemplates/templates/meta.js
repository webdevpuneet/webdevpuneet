/* Shared definitions for the social post templates. Plain data only (no React, no CSS
   imports) so scripts/postbuild.js can import the registry for the sitemap. */

// Post sizes for Instagram, Facebook and X (2026 recommendations).
// --safe-top / --safe-bottom keep text clear of the Story header and reply bar.
export const SIZES = [
  { id: 'portrait',  label: 'Portrait post',  short: '4:5',  w: 1080, h: 1350, note: 'Instagram feed (recommended), Facebook feed, X portrait' },
  { id: 'square',    label: 'Square post',    short: '1:1',  w: 1080, h: 1080, note: 'Instagram, Facebook and X feeds' },
  { id: 'story',     label: 'Story / Reel',   short: '9:16', w: 1080, h: 1920, note: 'Instagram and Facebook Stories, Reel covers', safeTop: 250, safeBottom: 340 },
  { id: 'landscape', label: 'Landscape post', short: '16:9', w: 1600, h: 900,  note: 'X feed image, Facebook landscape' },
];
export const sizeById = id => SIZES.find(z => z.id === id) || SIZES[0];

export const TEMPLATE_CATEGORIES = [
  { id: 'quotes',        label: 'Quotes & Tips',     blurb: 'Quote cards, daily tips and fact posts that people save and share.' },
  { id: 'announcements', label: 'Announcements',     blurb: 'Launches, milestones, hiring posts and "we’re live" moments.' },
  { id: 'promo',         label: 'Promo & Sales',     blurb: 'Discount badges, holiday sales and product spotlights.' },
  { id: 'events',        label: 'Events',            blurb: 'Webinar, meetup and countdown posts with a clear date.' },
  { id: 'social-proof',  label: 'Social Proof',      blurb: 'Customer testimonials and before/after results.' },
  { id: 'carousel',      label: 'Carousel Slides',   blurb: 'Cover, step and final slides for swipeable carousel posts.' },
  { id: 'stories',       label: 'Stories',           blurb: 'Story-first designs: polls, questions and link-in-bio prompts.' },
];
export const categoryById = id => TEMPLATE_CATEGORIES.find(c => c.id === id);

/* Base CSS shared by every template. Sizes use --u (1% of the shorter side), so one
   design scales across all four post sizes. Templates must only use self-contained
   CSS (no external URLs) so the PNG export can embed everything. */
export const BASE_CSS = `
.spt{--pad:calc(var(--u)*8);--pt:calc(var(--pad) + var(--safe-top,0px));--pb:calc(var(--pad) + var(--safe-bottom,0px));position:relative;overflow:hidden;box-sizing:border-box;font-family:var(--font-body);color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;line-height:1.3}
.spt *,.spt *::before,.spt *::after{box-sizing:border-box;margin:0;padding:0}
.spt [data-edit]{white-space:pre-line;overflow-wrap:anywhere;outline:none}
.spt [data-edit]:empty{display:none}
.spt .hl{color:var(--accent)}
.spt [data-image]{background-size:cover;background-position:center;background-repeat:no-repeat}
.spt [data-image][data-image-fit="contain"]{background-size:contain}
.spt [data-image]:not(.has-img){background-image:radial-gradient(circle at 28% 24%,color-mix(in srgb,var(--accent) 55%,#fff) 0%,var(--accent) 42%,color-mix(in srgb,var(--accent) 45%,#000) 100%)}
.spt [data-image][data-optional]:not(.has-img),.spt [data-image][data-image-fit="contain"]:not(.has-img){display:none}
.spt [data-fit-box]{min-height:0;overflow:hidden}
`;

/* Escapes text and turns *words* into accent highlights */
export function richText(text) {
  const esc = String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*([^*\n]+)\*/g, '<span class="hl">$1</span>');
}
