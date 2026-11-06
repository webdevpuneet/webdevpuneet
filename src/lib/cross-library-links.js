/* Email templates and social post templates that belong to the same campaign. Each pair is shown on
   both template pages ("promote this email on social", "follow this post up with an email"), so the
   two libraries link to each other. Keys are email template ids; values are social template ids. */
export const EMAIL_SOCIAL_PAIRS = {
  'black-friday-sale': ['holiday-sale', 'cyber-monday', 'discount-badge'],
  'last-chance-sale': ['discount-badge', 'countdown'],
  'holiday-greetings': ['christmas-greeting', 'holiday-hours', 'hanukkah', 'new-year', 'thanksgiving', 'dhanteras'],
  'holiday-gift-guide': ['product-spotlight', 'advent-calendar', 'christmas-greeting'],
  'webinar-invitation': ['webinar-event', 'countdown'],
  'product-update': ['product-launch', 'coming-soon'],
  newsletter: ['tip-of-the-day', 'numbered-list', 'year-in-review'],
  'review-request': ['five-star-review', 'testimonial'],
  'refer-a-friend': ['giveaway'],
  welcome: ['meet-the-team'],
  'back-in-stock': ['product-spotlight'],
  'abandoned-cart': ['discount-badge'],
};

export const socialForEmail = id => EMAIL_SOCIAL_PAIRS[id] || [];
export const emailsForSocial = id => Object.entries(EMAIL_SOCIAL_PAIRS).filter(([, s]) => s.includes(id)).map(([e]) => e);
