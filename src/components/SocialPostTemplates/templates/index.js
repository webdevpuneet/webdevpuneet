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
import giveaway from './giveaway.js';
import giveawayWinners from './giveaway-winners.js';
import winnerReveal from './winner-reveal.js';
import giveawayTime from './giveaway-time.js';
import giveawayRules from './giveaway-rules.js';
import raffleTicket from './raffle-ticket.js';
import meetTheTeam from './meet-the-team.js';
import mythVsFact from './myth-vs-fact.js';
import bigStat from './big-stat.js';
import comingSoon from './coming-soon.js';
import numberedList from './numbered-list.js';
import qaPost from './qa-post.js';
import usVsThem from './us-vs-them.js';
import justListed from './just-listed.js';
import eventRecap from './event-recap.js';
import checklist from './checklist.js';
import howToSteps from './how-to-steps.js';
import mistakesToAvoid from './mistakes-to-avoid.js';
import thisOrThat from './this-or-that.js';
import hotTake from './hot-take.js';
import pricingCard from './pricing-card.js';
import newBlogArticle from './new-blog-article.js';
import saveTheDate from './save-the-date.js';
import thankYou from './thank-you.js';
import valentinesDay from './valentines-day.js';
import diwali from './diwali.js';
import cyberMonday from './cyber-monday.js';
import givingTuesday from './giving-tuesday.js';
import adventCalendar from './advent-calendar.js';
import hanukkah from './hanukkah.js';
import dhanteras from './dhanteras.js';
import holidayHours from './holiday-hours.js';
import yearInReview from './year-in-review.js';
import lunarNewYear from './lunar-new-year.js';
import ramadanEid from './ramadan-eid.js';
import nationalDay from './national-day.js';
import fiveStarReview from './five-star-review.js';
export { SIZES, sizeById, TEMPLATE_CATEGORIES, categoryById, BASE_CSS, richText } from './meta.js';

const ORDER = [
  bigQuote,
  tipOfTheDay,
  didYouKnow,
  codeTip,
  mythVsFact,
  bigStat,
  numberedList,
  qaPost,
  checklist,
  howToSteps,
  mistakesToAvoid,
  thisOrThat,
  hotTake,
  productLaunch,
  milestone,
  yearInReview,
  newBlogArticle,
  thankYou,
  hiring,
  weAreLive,
  meetTheTeam,
  comingSoon,
  holidayHours,
  discountBadge,
  pricingCard,
  holidaySale,
  cyberMonday,
  adventCalendar,
  productSpotlight,
  giveaway,
  giveawayWinners,
  winnerReveal,
  giveawayTime,
  giveawayRules,
  raffleTicket,
  usVsThem,
  justListed,
  webinarEvent,
  saveTheDate,
  countdown,
  eventRecap,
  testimonial,
  fiveStarReview,
  beforeAfter,
  carouselCover,
  carouselStep,
  carouselSave,
  storyPoll,
  storyLink,
  halloweenSale,
  dhanteras,
  diwali,
  ramadanEid,
  thanksgiving,
  givingTuesday,
  hanukkah,
  christmasGreeting,
  valentinesDay,
  newYear,
  lunarNewYear,
  nationalDay,
];

export const TEMPLATES = ORDER;
export const templateById = id => ORDER.find(t => t.id === id);
