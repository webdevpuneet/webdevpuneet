/* Registry of social post templates (gallery order). Each template lives in its own file
   with its name, version, category, tags and dates. Plain JS so the build can import it. */
import beforeAfter from './before-after.js';
import bigQuote from './big-quote.js';
import christmasGreeting from './christmas-greeting.js';
import halloweenSale from './halloween-sale.js';
import newYear from './new-year.js';
import thanksgiving from './thanksgiving.js';
import carouselCover from './carousel-cover.js';
import carouselSave from './carousel-save.js';
import carouselStep from './carousel-step.js';
import codeTip from './code-tip.js';
import countdown from './countdown.js';
import didYouKnow from './did-you-know.js';
import discountBadge from './discount-badge.js';
import hiring from './hiring.js';
import holidaySale from './holiday-sale.js';
import milestone from './milestone.js';
import productLaunch from './product-launch.js';
import productSpotlight from './product-spotlight.js';
import storyLink from './story-link.js';
import storyPoll from './story-poll.js';
import testimonial from './testimonial.js';
import tipOfTheDay from './tip-of-the-day.js';
import weAreLive from './we-are-live.js';
import webinarEvent from './webinar-event.js';
export { SIZES, sizeById, TEMPLATE_CATEGORIES, categoryById, BASE_CSS, richText } from './meta.js';

const ORDER = [
  bigQuote,
  tipOfTheDay,
  didYouKnow,
  codeTip,
  productLaunch,
  milestone,
  hiring,
  weAreLive,
  discountBadge,
  holidaySale,
  productSpotlight,
  webinarEvent,
  countdown,
  testimonial,
  beforeAfter,
  carouselCover,
  carouselStep,
  carouselSave,
  storyPoll,
  storyLink,
  halloweenSale,
  thanksgiving,
  christmasGreeting,
  newYear,
];

export const TEMPLATES = ORDER;
export const templateById = id => ORDER.find(t => t.id === id);
