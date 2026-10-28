/* AI prompts for the four seasonal templates whose SEO entry has no aiPrompt yet (the other 30 are in
   seo-content.js). Used by app/social-post-templates/[id]/page.js. */
export const SOCIAL_EXTRA_PROMPTS = {
  'halloween-sale': {
    paragraph: 'Ask an AI assistant to adapt the Halloween Sale HTML and CSS: change the deal and dates for your own promotion, swap the bats for pumpkins or ghosts, or generate a three-post countdown (announce, 24 hours left, last chance) from the same layout.',
    prompt: `Create a 1080×1350 Halloween sale social post in plain HTML and CSS.

- A midnight-purple sky (a vertical gradient from #1a0b2e to #4c1d95) with a large glowing orange moon (radial gradient and a soft box-shadow glow) near the top.
- A few bat silhouettes drawn as inline SVG paths flying across the moon.
- A small uppercase kicker (“Happy Halloween”), then a huge two-line headline “Spooky Sale” in a creepy display font (Creepster) with the second word in orange and a dripping text-shadow effect.
- Under the headline, the deal in bold (“31% off everything”), the sale dates and a promo code in a dashed-border pill.
- Size everything with a CSS variable --u equal to 1% of the shorter side, so the post also works at 1080×1080, 1080×1920 and 1600×900.
- Colours as CSS custom properties: background #1a0b2e, accent #fb923c, text #fff7ed.`,
  },
  thanksgiving: {
    paragraph: 'Ask an AI assistant to adapt the Thanksgiving Thank You HTML and CSS: write the message in your brand voice, change the leaf colours, or produce a matching set for Instagram, LinkedIn and email from the same layout.',
    prompt: `Create a 1080×1350 Thanksgiving thank-you social post in plain HTML and CSS.

- A warm cream background (#fdf6ec) with a soft vignette.
- Eight to ten autumn leaves in burnt orange, amber and brown, drawn as CSS shapes or inline SVG, drifting down with a gentle CSS animation (rotate and translateY) that is switched off by prefers-reduced-motion.
- A small uppercase kicker (“Happy Thanksgiving”), a large serif headline “Grateful for you” (Playfair Display 700) with “you” in the accent colour, and a two-line thank-you message below.
- A footer with a thin rule and the brand handle (“@yourbrand”).
- Size everything with a CSS variable --u equal to 1% of the shorter side so the post also works at 1080×1080 and 1080×1920.
- Colours as CSS custom properties: text #3b2414, accent #c2410c, second accent #d97706.`,
  },
  'christmas-greeting': {
    paragraph: 'Ask an AI assistant to adapt the Christmas Greeting HTML and CSS: change the holiday message and offer line, swap the gold ornaments for stars or candles, or create a matching New Year post from the same layout.',
    prompt: `Create a 1080×1350 Christmas greeting social post in plain HTML and CSS.

- A deep evergreen background (#0f3d2e) with soft falling snow made from 30 small white circles animated with CSS (translateY and a slight sway), disabled with prefers-reduced-motion.
- Three gold ornaments hanging from thin lines at the top, drawn as circles with radial gradients and a small cap, swinging gently.
- A small kicker (“Season’s greetings”), a large script headline “Merry Christmas” (Great Vibes) in warm white with “Christmas” in gold (#fbbf24), and a short holiday message.
- An optional offer line in a rounded pill (“Free shipping until Dec 20”) and the brand handle at the bottom.
- Size everything with a CSS variable --u equal to 1% of the shorter side so the post also works at 1080×1080 and 1080×1920.
- Colours as CSS custom properties: background #0f3d2e, text #fffbeb, gold #fbbf24, red accent #dc2626.`,
  },
  'new-year': {
    paragraph: 'Ask an AI assistant to adapt the Happy New Year HTML and CSS: change the year and message, add a countdown line, or generate a set of posts for the last week of December from the same layout.',
    prompt: `Create a 1080×1350 “Happy New Year” social post in plain HTML and CSS.

- A midnight-blue background (#0b1026) with a few CSS fireworks (expanding radial-gradient bursts) and gold and violet confetti pieces made from small rotated rectangles.
- A small kicker (“Happy New Year”), then a giant year (for example “2027”) in Montserrat 800 with an outlined stroke and a gold gradient fill (background-clip: text).
- A two-line thank-you message below the year and the brand handle at the bottom.
- Animations (burst, confetti float) use CSS only and are switched off with prefers-reduced-motion.
- Size everything with a CSS variable --u equal to 1% of the shorter side so the post also works at 1080×1080 and 1080×1920.
- Colours as CSS custom properties: background #0b1026, text #ffffff, gold #f5c451, violet #a78bfa.`,
  },
};
