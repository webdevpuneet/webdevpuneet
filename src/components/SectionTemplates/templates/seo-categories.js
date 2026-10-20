/* Landing-page content for each section category (/website-section-templates/category/<id>/).
   Titles 50-60 characters, descriptions 150-160, written around what people search for.
   Only categories that have sections get a page (see generateStaticParams). */

export const SECTION_CATEGORY_SEO = {
  hero: {
    title: 'Hero Section Templates — Free HTML, CSS, React & Vue',
    description: 'Free responsive hero section templates: SaaS, gradient, background image, app and portfolio heroes. Edit online with GSAP animation, export HTML, React or Vue.',
    h1: 'Hero Section Templates',
    keywords: ['hero section templates', 'hero section html css', 'landing page hero', 'website hero section', 'react hero section'],
    intro: `The hero is the first thing every visitor sees, and it decides in a few seconds whether they keep reading. A good hero states what you offer, who it is for and what to do next, with one clear button and an image that backs up the promise.

These hero sections cover the most common patterns: the **[SaaS Split Hero](/website-section-templates/saas-split-hero/)** with a product screenshot, the dark **[Centred Gradient Hero](/website-section-templates/centered-gradient-hero/)**, the full-width **[Image Background Hero](/website-section-templates/image-background-hero/)**, the **[App Product Hero](/website-section-templates/app-product-hero/)** with store buttons and a phone mockup, and the **[Personal Portfolio Hero](/website-section-templates/portfolio-hero/)** for developers and freelancers. Every one is editable in the browser, responsive through container queries, animated with GSAP, and shares one theme with the rest of the library, so features, pricing and footer sections will match. Export a single HTML file, a ZIP with your images, a React component or a Vue component.`,
    faqs: [
      { q: 'What should a hero section include?', a: 'A clear headline that says what you offer, one or two sentences of supporting text, a primary call-to-action button (and optionally a secondary one), and an image, screenshot or photo that supports the message. Social proof such as ratings or customer counts helps too.' },
      { q: 'How tall should a hero section be?', a: 'Tall enough to show the headline, buttons and the start of the image on a laptop screen without scrolling, usually around 600 to 800 px on desktop. On phones it is fine for the hero to be taller than the screen, as long as the headline and main button appear first.' },
      { q: 'Can I use these hero sections in React, Next.js or Vue?', a: 'Yes. Every section exports as a React component (JSX with its CSS) or a Vue single-file component, and the GSAP animation is included. You can also download plain HTML and CSS.' },
    ],
  },
};
