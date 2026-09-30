export const CHAPTERS = [
  {
    id: 'foundations',
    title: 'Foundations',
    emoji: '🏗️',
    lessons: [
      {
        id: 'utility-first',
        title: 'Utility-First CSS',
        concept: `Tailwind is a utility-first CSS framework — instead of writing CSS classes like \`.card { padding: 1rem; border-radius: 8px; }\`, you apply small single-purpose classes directly in your HTML: \`class="p-4 rounded-lg"\`.\n\nEach class does exactly one thing. \`p-4\` adds padding. \`rounded-lg\` adds border-radius. \`bg-white\` sets background white. You build components by composing these utilities — no CSS file needed.`,
        html: `<!-- Without Tailwind: you'd write custom CSS for each element -->
<!-- With Tailwind: everything is right here in the HTML -->

<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
  <h2 class="text-xl font-bold text-gray-800 mb-2">Utility-First</h2>
  <p class="text-gray-500 text-sm leading-relaxed">
    This card is built entirely with Tailwind utility classes —
    no custom CSS file needed.
  </p>
  <button class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
    Get Started
  </button>
</div>`,
        challenge: {
          question: 'Which Tailwind class adds padding of 1rem (4 × 0.25rem) on all sides?',
          options: ['padding-4', 'p-4', 'pad-4', 'space-4'],
          correct: 'p-4',
        },
      },
      {
        id: 'color-system',
        title: 'Color System',
        concept: `Tailwind includes a comprehensive colour palette with shades from 50 (lightest) to 950 (darkest). Apply colours with prefix + colour + shade: \`text-blue-600\`, \`bg-emerald-100\`, \`border-rose-400\`.\n\nThe most common prefixes: \`text-\` (text colour), \`bg-\` (background), \`border-\` (border colour), \`ring-\` (focus ring), \`from-\`/\`to-\` (gradient stops). The same colour names work with all prefixes.`,
        html: `<div class="p-6 space-y-4">

  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Blue Scale</p>
    <div class="flex gap-1">
      <div class="w-8 h-8 rounded bg-blue-50"></div>
      <div class="w-8 h-8 rounded bg-blue-100"></div>
      <div class="w-8 h-8 rounded bg-blue-200"></div>
      <div class="w-8 h-8 rounded bg-blue-300"></div>
      <div class="w-8 h-8 rounded bg-blue-400"></div>
      <div class="w-8 h-8 rounded bg-blue-500"></div>
      <div class="w-8 h-8 rounded bg-blue-600"></div>
      <div class="w-8 h-8 rounded bg-blue-700"></div>
      <div class="w-8 h-8 rounded bg-blue-800"></div>
      <div class="w-8 h-8 rounded bg-blue-900"></div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-3">
    <div class="p-3 bg-emerald-100 border border-emerald-300 rounded-lg">
      <p class="text-emerald-800 font-semibold text-sm">Success</p>
      <p class="text-emerald-600 text-xs">bg-emerald-100 · text-emerald-800</p>
    </div>
    <div class="p-3 bg-rose-100 border border-rose-300 rounded-lg">
      <p class="text-rose-800 font-semibold text-sm">Error</p>
      <p class="text-rose-600 text-xs">bg-rose-100 · text-rose-800</p>
    </div>
    <div class="p-3 bg-amber-100 border border-amber-300 rounded-lg">
      <p class="text-amber-800 font-semibold text-sm">Warning</p>
      <p class="text-amber-600 text-xs">bg-amber-100 · text-amber-800</p>
    </div>
    <div class="p-3 bg-violet-100 border border-violet-300 rounded-lg">
      <p class="text-violet-800 font-semibold text-sm">Info</p>
      <p class="text-violet-600 text-xs">bg-violet-100 · text-violet-800</p>
    </div>
  </div>

</div>`,
        challenge: {
          question: 'Which class sets the text colour to a mid-level blue?',
          options: ['color-blue-500', 'text-blue-500', 'font-blue-500', 'blue-500'],
          correct: 'text-blue-500',
        },
      },
      {
        id: 'hover-focus-states',
        title: 'Hover & Focus States',
        concept: `Tailwind's state modifiers let you apply utilities conditionally. Prefix any utility with \`hover:\` to apply it on hover, \`focus:\` on keyboard focus, \`active:\` on click, \`disabled:\` when disabled.\n\nCombine with \`transition\` and \`duration-\` for smooth animations: \`hover:bg-blue-700 transition-colors duration-200\`. You can stack modifiers: \`hover:focus:ring-2\` applies a ring when the element is both hovered and focused.`,
        html: `<div class="p-6 space-y-4 max-w-sm">

  <button class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg
    hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 cursor-pointer">
    Hover & Click me
  </button>

  <button class="w-full px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300
    hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150">
    Ghost button
  </button>

  <input
    type="text"
    placeholder="Focus me..."
    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none
      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
  />

  <button disabled class="w-full px-4 py-2 bg-gray-200 text-gray-400 font-semibold rounded-lg
    cursor-not-allowed opacity-60">
    Disabled button
  </button>

</div>`,
      },
    ],
  },

  {
    id: 'typography',
    title: 'Typography',
    emoji: '🔤',
    lessons: [
      {
        id: 'text-size',
        title: 'Text Size & Line Height',
        concept: `Tailwind's type scale goes from \`text-xs\` (12px) to \`text-9xl\` (128px). Each step has a built-in line height. Override it with \`leading-\`: \`leading-tight\` (1.25), \`leading-normal\` (1.5), \`leading-relaxed\` (1.625), \`leading-loose\` (2).\n\nFor tracking (letter-spacing): \`tracking-tight\` (-0.025em), \`tracking-normal\` (0), \`tracking-wide\` (0.025em), \`tracking-widest\` (0.1em).`,
        html: `<div class="p-6 space-y-3">
  <p class="text-xs text-gray-500">text-xs — 12px, xs caption</p>
  <p class="text-sm text-gray-600">text-sm — 14px, secondary text</p>
  <p class="text-base text-gray-700">text-base — 16px, body text</p>
  <p class="text-lg text-gray-800">text-lg — 18px, lead paragraph</p>
  <p class="text-xl font-semibold text-gray-900">text-xl — 20px</p>
  <p class="text-2xl font-bold text-gray-900">text-2xl — 24px</p>
  <p class="text-4xl font-extrabold text-gray-900">text-4xl — 36px</p>
  <p class="text-6xl font-black text-blue-600 tracking-tight">text-6xl</p>

  <hr class="border-gray-200 my-4">

  <p class="text-sm leading-tight text-gray-600 max-w-xs">leading-tight (1.25) — Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.</p>
  <p class="text-sm leading-relaxed text-gray-600 max-w-xs">leading-relaxed (1.625) — Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.</p>
</div>`,
      },
      {
        id: 'font-weight-style',
        title: 'Font Weight & Style',
        concept: `Font weight utilities map to standard CSS weights: \`font-thin\` (100), \`font-light\` (300), \`font-normal\` (400), \`font-medium\` (500), \`font-semibold\` (600), \`font-bold\` (700), \`font-extrabold\` (800), \`font-black\` (900).\n\nStyle utilities: \`italic\` / \`not-italic\`. Transform utilities: \`uppercase\`, \`lowercase\`, \`capitalize\`, \`normal-case\`. Decoration: \`underline\`, \`line-through\`, \`no-underline\`.`,
        html: `<div class="p-6 space-y-2">
  <p class="font-thin text-lg">font-thin (100)</p>
  <p class="font-light text-lg">font-light (300)</p>
  <p class="font-normal text-lg">font-normal (400)</p>
  <p class="font-medium text-lg">font-medium (500)</p>
  <p class="font-semibold text-lg">font-semibold (600)</p>
  <p class="font-bold text-lg">font-bold (700)</p>
  <p class="font-extrabold text-lg">font-extrabold (800)</p>
  <p class="font-black text-lg">font-black (900)</p>

  <hr class="border-gray-200 my-3">

  <p class="italic text-gray-600">italic text</p>
  <p class="uppercase tracking-widest text-sm font-bold text-gray-500">uppercase + tracking-widest</p>
  <p class="capitalize text-gray-700">capitalize every word here</p>
  <p class="underline decoration-blue-500 decoration-2 underline-offset-2 text-blue-600">underline with offset</p>
  <p class="line-through text-gray-400">line-through text</p>
</div>`,
        challenge: {
          question: 'Which class makes text bold (font-weight: 700)?',
          options: ['font-heavy', 'text-bold', 'font-bold', 'bold'],
          correct: 'font-bold',
        },
      },
      {
        id: 'text-align-color',
        title: 'Text Alignment & Color',
        concept: `Text alignment: \`text-left\`, \`text-center\`, \`text-right\`, \`text-justify\`. These are utilities you'll use on almost every heading and paragraph.\n\nTailwind's text colour utilities cover the full colour palette: \`text-gray-900\` for primary text, \`text-gray-600\` for secondary, \`text-gray-400\` for muted/placeholder. For brand colours use \`text-blue-600\` etc. Special: \`text-transparent\` combined with \`bg-clip-text\` for gradient text.`,
        html: `<div class="p-6 space-y-4 max-w-md">
  <p class="text-left text-gray-700">text-left — default alignment</p>
  <p class="text-center text-gray-700">text-center — centered</p>
  <p class="text-right text-gray-700">text-right — right aligned</p>

  <hr class="border-gray-200">

  <p class="text-gray-900 font-semibold">text-gray-900 — primary text</p>
  <p class="text-gray-600">text-gray-600 — secondary text</p>
  <p class="text-gray-400">text-gray-400 — muted / placeholder</p>
  <p class="text-blue-600 font-medium">text-blue-600 — brand / link</p>
  <p class="text-emerald-600 font-medium">text-emerald-600 — success</p>
  <p class="text-rose-600 font-medium">text-rose-600 — error</p>

  <hr class="border-gray-200">

  <h2 class="text-3xl font-black text-center
    text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">
    Gradient Text
  </h2>
</div>`,
      },
    ],
  },

  {
    id: 'spacing',
    title: 'Spacing',
    emoji: '📏',
    lessons: [
      {
        id: 'padding',
        title: 'Padding',
        concept: `Tailwind's spacing scale is based on 0.25rem (4px) increments. \`p-1\` = 4px, \`p-4\` = 16px, \`p-8\` = 32px.\n\nDirectional variants: \`px-\` (horizontal), \`py-\` (vertical), \`pt-\` (top), \`pr-\` (right), \`pb-\` (bottom), \`pl-\` (left). You can mix them: \`px-6 py-3\` is a common button padding. Use \`p-0\` to remove padding.`,
        html: `<div class="p-6 space-y-3 font-mono text-sm">

  <div class="bg-blue-100 border border-blue-300 rounded">
    <div class="p-1 bg-blue-500 text-white text-center">p-1 (4px)</div>
  </div>

  <div class="bg-blue-100 border border-blue-300 rounded">
    <div class="p-4 bg-blue-500 text-white text-center">p-4 (16px)</div>
  </div>

  <div class="bg-blue-100 border border-blue-300 rounded">
    <div class="p-8 bg-blue-500 text-white text-center">p-8 (32px)</div>
  </div>

  <div class="bg-emerald-100 border border-emerald-300 rounded">
    <div class="px-8 py-2 bg-emerald-500 text-white text-center">px-8 py-2 — asymmetric</div>
  </div>

  <div class="flex gap-3 mt-2">
    <button class="px-3 py-1 bg-gray-800 text-white rounded text-xs">px-3 py-1 — sm button</button>
    <button class="px-5 py-2 bg-gray-800 text-white rounded text-sm">px-5 py-2 — md button</button>
    <button class="px-7 py-3 bg-gray-800 text-white rounded">px-7 py-3 — lg button</button>
  </div>

</div>`,
      },
      {
        id: 'margin',
        title: 'Margin & Auto',
        concept: `Margin utilities follow the same scale as padding: \`m-\`, \`mx-\`, \`my-\`, \`mt-\`, \`mr-\`, \`mb-\`, \`ml-\`. Use \`m-auto\` to let the browser calculate equal margins.\n\n\`mx-auto\` is the Tailwind way to horizontally centre a block element — it sets left and right margins to auto. Combine with \`max-w-\` for centred page containers. Negative margins are also available: \`-mt-4\` pulls an element 16px upward.`,
        html: `<div class="p-6 bg-gray-50 min-h-screen">

  <!-- mx-auto centers the block -->
  <div class="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-6 text-center">
    <p class="text-sm font-semibold text-gray-700">max-w-xs mx-auto</p>
    <p class="text-xs text-gray-400">centered card</p>
  </div>

  <!-- Different margin sides -->
  <div class="bg-blue-500 text-white text-sm font-semibold rounded p-2 text-center mt-2 mb-6">
    mt-2 mb-6
  </div>
  <div class="bg-violet-500 text-white text-sm font-semibold rounded p-2 text-center ml-8">
    ml-8 — pushed right
  </div>

  <!-- Negative margin -->
  <div class="bg-emerald-100 rounded-lg p-4 mt-8">
    <div class="bg-emerald-500 text-white text-sm font-bold rounded p-2 text-center -mt-8 mx-4 shadow-md">
      -mt-8 negative margin
    </div>
    <p class="text-emerald-700 text-sm mt-4">Negative margins pull elements outside their parent.</p>
  </div>

</div>`,
      },
      {
        id: 'gap-space',
        title: 'Gap & Space Between',
        concept: `\`gap-\` sets spacing between grid or flex children — cleaner than adding margin to each item. \`gap-x-\` controls horizontal gap, \`gap-y-\` vertical.\n\n\`space-x-\` and \`space-y-\` add margin between consecutive siblings without affecting the first child. Use \`space-x-reverse\` when your flex direction is reversed.`,
        html: `<div class="p-6 space-y-6">

  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">gap-4 (flex)</p>
    <div class="flex gap-4">
      <div class="bg-blue-500 text-white rounded px-4 py-2 text-sm font-semibold">A</div>
      <div class="bg-blue-500 text-white rounded px-4 py-2 text-sm font-semibold">B</div>
      <div class="bg-blue-500 text-white rounded px-4 py-2 text-sm font-semibold">C</div>
    </div>
  </div>

  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">gap-3 (grid)</p>
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-violet-500 text-white rounded p-3 text-sm font-bold text-center">1</div>
      <div class="bg-violet-500 text-white rounded p-3 text-sm font-bold text-center">2</div>
      <div class="bg-violet-500 text-white rounded p-3 text-sm font-bold text-center">3</div>
      <div class="bg-violet-500 text-white rounded p-3 text-sm font-bold text-center">4</div>
      <div class="bg-violet-500 text-white rounded p-3 text-sm font-bold text-center">5</div>
      <div class="bg-violet-500 text-white rounded p-3 text-sm font-bold text-center">6</div>
    </div>
  </div>

  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">space-y-3</p>
    <div class="space-y-3">
      <div class="bg-emerald-100 border border-emerald-300 rounded p-3 text-sm text-emerald-800">Item one</div>
      <div class="bg-emerald-100 border border-emerald-300 rounded p-3 text-sm text-emerald-800">Item two</div>
      <div class="bg-emerald-100 border border-emerald-300 rounded p-3 text-sm text-emerald-800">Item three</div>
    </div>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'sizing',
    title: 'Sizing',
    emoji: '📐',
    lessons: [
      {
        id: 'width',
        title: 'Width & Max Width',
        concept: `Width utilities: \`w-full\` (100%), \`w-screen\` (100vw), \`w-auto\`, fractional widths like \`w-1/2\`, \`w-1/3\`, \`w-2/3\`. Fixed sizes follow the spacing scale: \`w-16\` = 64px.\n\n\`max-w-\` constrains the maximum width: \`max-w-xs\` (320px), \`max-w-sm\` (384px), \`max-w-md\` (448px), \`max-w-lg\` (512px), \`max-w-xl\` (576px), \`max-w-2xl\` (672px), \`max-w-screen-lg\` (1024px). Combine with \`mx-auto\` for centred layouts.`,
        html: `<div class="p-4 bg-gray-50 space-y-2 text-sm font-mono">
  <div class="bg-blue-500 text-white rounded px-2 py-1 w-full">w-full (100%)</div>
  <div class="bg-blue-400 text-white rounded px-2 py-1 w-3/4">w-3/4 (75%)</div>
  <div class="bg-blue-300 text-gray-800 rounded px-2 py-1 w-1/2">w-1/2 (50%)</div>
  <div class="bg-blue-200 text-gray-800 rounded px-2 py-1 w-1/3">w-1/3 (33%)</div>
  <div class="bg-blue-100 text-gray-700 rounded px-2 py-1 w-1/4">w-1/4</div>

  <hr class="border-gray-200 my-3">

  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">max-w containers</p>
  <div class="max-w-xs mx-auto bg-white border rounded p-2 text-center text-xs">max-w-xs</div>
  <div class="max-w-sm mx-auto bg-white border rounded p-2 text-center text-xs">max-w-sm</div>
  <div class="max-w-md mx-auto bg-white border rounded p-2 text-center text-xs">max-w-md</div>
</div>`,
        challenge: {
          question: 'Which class sets an element to take up 50% of its parent\'s width?',
          options: ['w-50', 'w-half', 'w-1/2', 'width-50'],
          correct: 'w-1/2',
        },
      },
      {
        id: 'height',
        title: 'Height & Aspect Ratio',
        concept: `Height utilities: \`h-full\` (100% of parent), \`h-screen\` (100vh), \`h-auto\`, fixed sizes like \`h-16\` (64px). \`min-h-screen\` is commonly used on page wrappers to make them at least full viewport height.\n\n\`aspect-ratio\` utilities maintain proportions: \`aspect-square\` (1:1), \`aspect-video\` (16:9). These are great for image placeholders, video embeds, and avatar thumbnails without fixed dimensions.`,
        html: `<div class="p-4 space-y-4">

  <div class="flex items-end gap-3">
    <div class="w-12 h-8  bg-blue-300 rounded text-center text-xs pt-2">h-8</div>
    <div class="w-12 h-16 bg-blue-400 rounded text-center text-xs pt-2">h-16</div>
    <div class="w-12 h-24 bg-blue-500 rounded text-center text-xs pt-2 text-white">h-24</div>
    <div class="w-12 h-32 bg-blue-600 rounded text-center text-xs pt-2 text-white">h-32</div>
    <div class="w-12 h-48 bg-blue-700 rounded text-center text-xs pt-2 text-white">h-48</div>
  </div>

  <hr class="border-gray-200">

  <div class="grid grid-cols-3 gap-3">
    <div class="aspect-square bg-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
      aspect-square
    </div>
    <div class="aspect-video bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-bold col-span-2">
      aspect-video (16:9)
    </div>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'flexbox',
    title: 'Flexbox',
    emoji: '↔️',
    lessons: [
      {
        id: 'flex-basics',
        title: 'Flex Container',
        concept: `Apply \`flex\` to a container to make its children flex items. By default items arrange horizontally (\`flex-row\`). \`flex-col\` stacks them vertically. \`flex-wrap\` allows items to wrap onto the next line when there isn't enough space.\n\nInline flex: \`inline-flex\` is like \`flex\` but the container itself stays inline. Use it for buttons with icons — the container doesn't stretch to full width.`,
        html: `<div class="p-4 space-y-4 text-sm font-semibold">

  <div>
    <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">flex (row, default)</p>
    <div class="flex bg-gray-100 rounded p-2 gap-2">
      <div class="bg-blue-500 text-white rounded px-3 py-2">A</div>
      <div class="bg-blue-500 text-white rounded px-3 py-2">B</div>
      <div class="bg-blue-500 text-white rounded px-3 py-2">C</div>
    </div>
  </div>

  <div>
    <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">flex-col</p>
    <div class="flex flex-col bg-gray-100 rounded p-2 gap-2">
      <div class="bg-violet-500 text-white rounded px-3 py-2">A</div>
      <div class="bg-violet-500 text-white rounded px-3 py-2">B</div>
      <div class="bg-violet-500 text-white rounded px-3 py-2">C</div>
    </div>
  </div>

  <div>
    <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">flex-wrap</p>
    <div class="flex flex-wrap bg-gray-100 rounded p-2 gap-2">
      <div class="bg-emerald-500 text-white rounded px-4 py-2">One</div>
      <div class="bg-emerald-500 text-white rounded px-4 py-2">Two</div>
      <div class="bg-emerald-500 text-white rounded px-4 py-2">Three</div>
      <div class="bg-emerald-500 text-white rounded px-4 py-2">Four</div>
      <div class="bg-emerald-500 text-white rounded px-4 py-2">Five</div>
    </div>
  </div>

</div>`,
      },
      {
        id: 'justify-align',
        title: 'Justify & Align',
        concept: `**\`justify-content\`** distributes items along the main axis: \`justify-start\`, \`justify-center\`, \`justify-end\`, \`justify-between\`, \`justify-around\`, \`justify-evenly\`.\n\n**\`align-items\`** aligns items on the cross axis: \`items-start\`, \`items-center\`, \`items-end\`, \`items-stretch\` (default), \`items-baseline\`. The most common combination is \`flex items-center justify-center\` to perfectly centre content.`,
        html: `<div class="p-4 space-y-3 text-xs font-bold">

  <div class="flex justify-start  gap-2 bg-gray-100 rounded p-2 h-12 items-center">
    <div class="bg-blue-500 text-white rounded px-2 py-1">A</div>
    <div class="bg-blue-500 text-white rounded px-2 py-1">B</div>
    <span class="ml-auto text-gray-400 font-normal">justify-start</span>
  </div>

  <div class="flex justify-center  gap-2 bg-gray-100 rounded p-2 h-12 items-center">
    <div class="bg-violet-500 text-white rounded px-2 py-1">A</div>
    <div class="bg-violet-500 text-white rounded px-2 py-1">B</div>
    <span class="ml-auto text-gray-400 font-normal">justify-center</span>
  </div>

  <div class="flex justify-between gap-2 bg-gray-100 rounded p-2 h-12 items-center">
    <div class="bg-emerald-500 text-white rounded px-2 py-1">A</div>
    <div class="bg-emerald-500 text-white rounded px-2 py-1">B</div>
    <span class="text-gray-400 font-normal">justify-between</span>
  </div>

  <div class="flex justify-evenly  gap-2 bg-gray-100 rounded p-2 h-12 items-center">
    <div class="bg-rose-500 text-white rounded px-2 py-1">A</div>
    <div class="bg-rose-500 text-white rounded px-2 py-1">B</div>
    <span class="text-gray-400 font-normal">justify-evenly</span>
  </div>

  <hr class="border-gray-200">

  <div class="flex gap-2 bg-blue-50 rounded p-4 h-24 items-center justify-center border-2 border-dashed border-blue-300">
    <div class="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold text-sm">
      items-center + justify-center
    </div>
  </div>

</div>`,
        challenge: {
          question: 'Which class centres flex children on the main axis with equal space between?',
          options: ['justify-center', 'items-center', 'justify-between', 'justify-evenly'],
          correct: 'justify-evenly',
        },
      },
      {
        id: 'flex-items',
        title: 'Flex Items',
        concept: `Control individual flex item behaviour. \`flex-1\` makes an item grow and shrink equally to fill available space. \`flex-auto\` grows/shrinks respecting its natural size. \`flex-none\` prevents the item from growing or shrinking.\n\n\`grow\` / \`grow-0\` and \`shrink\` / \`shrink-0\` control each behaviour separately. \`order-\` changes the visual order without changing the DOM order.`,
        html: `<div class="p-4 space-y-4 text-xs font-bold">

  <div>
    <p class="text-gray-400 uppercase tracking-widest mb-1">flex-1 — equal distribution</p>
    <div class="flex gap-2 bg-gray-100 rounded p-2">
      <div class="flex-1 bg-blue-500 text-white rounded p-2 text-center">flex-1</div>
      <div class="flex-1 bg-blue-600 text-white rounded p-2 text-center">flex-1</div>
      <div class="flex-1 bg-blue-700 text-white rounded p-2 text-center">flex-1</div>
    </div>
  </div>

  <div>
    <p class="text-gray-400 uppercase tracking-widest mb-1">fixed + flex-1 + fixed</p>
    <div class="flex gap-2 bg-gray-100 rounded p-2">
      <div class="flex-none w-16 bg-gray-400 text-white rounded p-2 text-center">fixed</div>
      <div class="flex-1 bg-violet-500 text-white rounded p-2 text-center">flex-1 fills rest</div>
      <div class="flex-none w-16 bg-gray-400 text-white rounded p-2 text-center">fixed</div>
    </div>
  </div>

  <div>
    <p class="text-gray-400 uppercase tracking-widest mb-1">order- — visual reordering</p>
    <div class="flex gap-2 bg-gray-100 rounded p-2">
      <div class="order-3 bg-rose-400 text-white rounded px-3 py-2">DOM 1 → visual 3</div>
      <div class="order-1 bg-rose-600 text-white rounded px-3 py-2">DOM 2 → visual 1</div>
      <div class="order-2 bg-rose-500 text-white rounded px-3 py-2">DOM 3 → visual 2</div>
    </div>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'grid',
    title: 'CSS Grid',
    emoji: '🔲',
    lessons: [
      {
        id: 'grid-basics',
        title: 'Grid Basics',
        concept: `Apply \`grid\` to a container, then \`grid-cols-{n}\` to define columns. \`grid-cols-2\` creates two equal columns. \`grid-cols-3\` creates three. Tailwind supports up to \`grid-cols-12\`.\n\nCombine with \`gap-\` for spacing. For irregular layouts use \`grid-cols-none\` and control items with \`col-span-\`.`,
        html: `<div class="p-4 space-y-4 text-sm font-bold text-center">

  <div>
    <p class="text-xs text-gray-400 uppercase tracking-widest mb-2 text-left">grid-cols-2 gap-3</p>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-blue-500 text-white rounded p-3">1</div>
      <div class="bg-blue-500 text-white rounded p-3">2</div>
      <div class="bg-blue-500 text-white rounded p-3">3</div>
      <div class="bg-blue-500 text-white rounded p-3">4</div>
    </div>
  </div>

  <div>
    <p class="text-xs text-gray-400 uppercase tracking-widest mb-2 text-left">grid-cols-3 gap-3</p>
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-violet-500 text-white rounded p-3">1</div>
      <div class="bg-violet-500 text-white rounded p-3">2</div>
      <div class="bg-violet-500 text-white rounded p-3">3</div>
      <div class="bg-violet-500 text-white rounded p-3">4</div>
      <div class="bg-violet-500 text-white rounded p-3">5</div>
      <div class="bg-violet-500 text-white rounded p-3">6</div>
    </div>
  </div>

  <div>
    <p class="text-xs text-gray-400 uppercase tracking-widest mb-2 text-left">grid-cols-4 gap-2</p>
    <div class="grid grid-cols-4 gap-2">
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">A</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">B</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">C</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">D</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">E</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">F</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">G</div>
      <div class="bg-emerald-500 text-white rounded p-2 text-xs">H</div>
    </div>
  </div>

</div>`,
        challenge: {
          question: 'Which class creates a 3-column CSS Grid?',
          options: ['columns-3', 'grid-3', 'grid-cols-3', 'col-3'],
          correct: 'grid-cols-3',
        },
      },
      {
        id: 'grid-span',
        title: 'Column Span & Areas',
        concept: `\`col-span-{n}\` makes a grid item span multiple columns. \`col-span-2\` spans 2, \`col-span-full\` spans all columns. Similarly, \`row-span-{n}\` spans rows.\n\n\`col-start-{n}\` and \`col-end-{n}\` place an item at a specific grid line. Combined with \`col-span-\`, you can create complex dashboard layouts without any custom CSS.`,
        html: `<div class="p-4">
  <div class="grid grid-cols-3 gap-3 text-center text-sm font-bold text-white">

    <div class="col-span-3 bg-blue-600 rounded-lg p-3">col-span-3 (header)</div>

    <div class="col-span-2 bg-blue-500 rounded-lg p-6">col-span-2 (main)</div>
    <div class="bg-violet-500 rounded-lg p-6">sidebar</div>

    <div class="bg-emerald-500 rounded-lg p-4">1/3</div>
    <div class="bg-emerald-500 rounded-lg p-4">1/3</div>
    <div class="bg-emerald-500 rounded-lg p-4">1/3</div>

    <div class="col-span-3 bg-gray-500 rounded-lg p-3">col-span-3 (footer)</div>

  </div>
</div>`,
      },
      {
        id: 'grid-auto',
        title: 'Auto-placement & minmax',
        concept: `\`grid-cols-none\` with \`grid-flow-col\` auto-fills columns. The most powerful responsive pattern uses \`repeat(auto-fill, minmax())\` — but in Tailwind you get this with \`grid-cols-[repeat(auto-fill,minmax(200px,1fr))]\` using arbitrary values.\n\n\`auto-rows-\` sets the size of implicitly created rows. \`auto-cols-\` for columns. These are useful when you don't know how many items you'll have.`,
        html: `<div class="p-4 space-y-4">

  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Responsive auto-fill grid</p>

  <!-- Arbitrary value: repeat(auto-fill, minmax(120px,1fr)) -->
  <div class="grid gap-3 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
    <div class="bg-blue-500 text-white rounded p-3 text-center text-sm font-bold">Card 1</div>
    <div class="bg-blue-500 text-white rounded p-3 text-center text-sm font-bold">Card 2</div>
    <div class="bg-blue-500 text-white rounded p-3 text-center text-sm font-bold">Card 3</div>
    <div class="bg-blue-500 text-white rounded p-3 text-center text-sm font-bold">Card 4</div>
    <div class="bg-blue-500 text-white rounded p-3 text-center text-sm font-bold">Card 5</div>
    <div class="bg-blue-500 text-white rounded p-3 text-center text-sm font-bold">Card 6</div>
  </div>

  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">auto-rows-fr with row spanning</p>
  <div class="grid grid-cols-4 auto-rows-[80px] gap-3">
    <div class="bg-violet-500 row-span-2 rounded-lg flex items-center justify-center text-white font-bold text-sm">row-span-2</div>
    <div class="bg-emerald-500 col-span-3 rounded-lg flex items-center justify-center text-white font-bold text-sm">col-span-3</div>
    <div class="bg-rose-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">3</div>
    <div class="bg-rose-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">4</div>
    <div class="bg-rose-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">5</div>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'borders-effects',
    title: 'Borders & Effects',
    emoji: '✨',
    lessons: [
      {
        id: 'borders-radius',
        title: 'Borders & Border Radius',
        concept: `Border utilities: \`border\` (1px), \`border-2\` (2px), \`border-4\` (4px), \`border-8\` (8px). Combine with \`border-{color}\` and \`border-{side}\` (border-t, border-r, border-b, border-l) for partial borders.\n\nBorder radius: \`rounded-sm\` (2px), \`rounded\` (4px), \`rounded-md\` (6px), \`rounded-lg\` (8px), \`rounded-xl\` (12px), \`rounded-2xl\` (16px), \`rounded-3xl\` (24px), \`rounded-full\` (9999px — circle/pill).`,
        html: `<div class="p-4 grid grid-cols-2 gap-4 text-center text-xs font-bold">

  <div class="border border-gray-300 rounded-sm p-4 text-gray-600">border rounded-sm</div>
  <div class="border-2 border-blue-400 rounded-md p-4 text-blue-600">border-2 rounded-md</div>
  <div class="border-4 border-violet-500 rounded-xl p-4 text-violet-700">border-4 rounded-xl</div>
  <div class="border-4 border-emerald-500 rounded-full p-4 text-emerald-700">border-4 rounded-full</div>

  <div class="border-t-4 border-rose-500 bg-rose-50 p-4 text-rose-700 rounded">border-t-4 only</div>
  <div class="border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-700 rounded">border-l-4 only</div>

  <div class="border-2 border-dashed border-gray-400 rounded-xl p-4 text-gray-500">border-dashed</div>
  <div class="border-2 border-dotted border-blue-400 rounded-xl p-4 text-blue-500">border-dotted</div>

</div>`,
        challenge: {
          question: 'Which class creates a fully circular border radius (e.g. for avatars)?',
          options: ['rounded-xl', 'rounded-circle', 'rounded-full', 'rounded-max'],
          correct: 'rounded-full',
        },
      },
      {
        id: 'shadows',
        title: 'Shadows & Ring',
        concept: `Box shadow: \`shadow-sm\`, \`shadow\`, \`shadow-md\`, \`shadow-lg\`, \`shadow-xl\`, \`shadow-2xl\`, \`shadow-inner\` (inward), \`shadow-none\`.\n\nRing utilities create outlines using box-shadow (doesn't affect layout): \`ring\` (3px), \`ring-1\`, \`ring-2\`, \`ring-4\`. Combine with \`ring-{color}\` and \`ring-offset-\` for focus indicators. \`focus:ring-2\` is the standard way to add visible keyboard focus styles.`,
        html: `<div class="p-6 bg-gray-100 grid grid-cols-2 gap-4">

  <div class="bg-white rounded-lg p-4 shadow-sm text-center text-sm font-semibold">shadow-sm</div>
  <div class="bg-white rounded-lg p-4 shadow text-center text-sm font-semibold">shadow</div>
  <div class="bg-white rounded-lg p-4 shadow-md text-center text-sm font-semibold">shadow-md</div>
  <div class="bg-white rounded-lg p-4 shadow-lg text-center text-sm font-semibold">shadow-lg</div>
  <div class="bg-white rounded-lg p-4 shadow-xl text-center text-sm font-semibold">shadow-xl</div>
  <div class="bg-white rounded-lg p-4 shadow-2xl text-center text-sm font-semibold">shadow-2xl</div>

  <div class="bg-white rounded-lg p-4 shadow-inner text-center text-sm text-gray-500">shadow-inner</div>
  <div class="bg-white rounded-lg p-4 ring-2 ring-blue-500 text-center text-sm font-semibold text-blue-600">ring-2</div>
  <div class="bg-white rounded-lg p-4 ring-2 ring-violet-500 ring-offset-2 ring-offset-gray-100 text-center text-sm text-violet-600 font-semibold col-span-2">
    ring-2 ring-offset-2
  </div>

</div>`,
      },
      {
        id: 'opacity-backdrop',
        title: 'Opacity & Backdrop',
        concept: `\`opacity-{amount}\` sets element opacity: \`opacity-0\` (invisible) through \`opacity-100\` (fully visible). Hover variants are common: \`hover:opacity-80\`.\n\n\`backdrop-blur-{size}\` blurs the background behind an element (requires the element to have a semi-transparent background). Combines beautifully with \`bg-white/70\` (white at 70% opacity) for glassmorphism effects.`,
        html: `<div class="p-4 space-y-4">

  <div class="flex gap-3 items-center">
    <div class="w-12 h-12 rounded-lg bg-blue-600 opacity-100 flex items-center justify-center text-white text-xs font-bold">100</div>
    <div class="w-12 h-12 rounded-lg bg-blue-600 opacity-75  flex items-center justify-center text-white text-xs font-bold">75</div>
    <div class="w-12 h-12 rounded-lg bg-blue-600 opacity-50  flex items-center justify-center text-white text-xs font-bold">50</div>
    <div class="w-12 h-12 rounded-lg bg-blue-600 opacity-25  flex items-center justify-center text-white text-xs font-bold">25</div>
    <div class="w-12 h-12 rounded-lg bg-blue-600 opacity-10  flex items-center justify-center text-blue-800 text-xs font-bold">10</div>
    <span class="text-xs text-gray-500 font-mono">opacity-{n}</span>
  </div>

  <!-- Glassmorphism with backdrop-blur -->
  <div class="relative rounded-2xl overflow-hidden h-32">
    <div class="absolute inset-0 bg-gradient-to-br from-violet-500 to-blue-600"></div>
    <div class="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center">
      <p class="text-white font-bold text-sm">bg-white/20 backdrop-blur-sm</p>
    </div>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'animations',
    title: 'Transitions & Animation',
    emoji: '🎬',
    lessons: [
      {
        id: 'transitions',
        title: 'Transitions',
        concept: `\`transition\` enables smooth CSS transitions on property changes. Pair it with hover/focus state changes. \`transition-all\` transitions every property, \`transition-colors\` only colours, \`transition-transform\` only transforms.\n\nControl speed with \`duration-\`: \`duration-75\`, \`duration-100\`, \`duration-150\`, \`duration-200\`, \`duration-300\`, \`duration-500\`. Easing: \`ease-linear\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\` (default).`,
        html: `<div class="p-6 space-y-3 max-w-xs">

  <button class="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg
    hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
    transition-colors 300ms
  </button>

  <button class="w-full px-4 py-2 bg-violet-500 text-white font-bold rounded-lg
    hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
    hover:scale-105 + shadow
  </button>

  <button class="w-full px-4 py-2 bg-white text-gray-700 font-bold rounded-lg border-2 border-gray-300
    hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50
    transition-all duration-150 cursor-pointer">
    multi-property transition
  </button>

  <button class="w-full px-4 py-2 bg-rose-500 text-white font-bold rounded-lg
    hover:rounded-full transition-all duration-500 cursor-pointer">
    hover:rounded-full 500ms
  </button>

  <a href="#" class="block text-blue-500 font-semibold underline-offset-2
    hover:underline hover:text-blue-700 transition-colors duration-150">
    hover underline link
  </a>

</div>`,
        challenge: {
          question: 'Which duration class creates a 300ms transition?',
          options: ['transition-300', 'duration-300', 'speed-300', 'time-300'],
          correct: 'duration-300',
        },
      },
      {
        id: 'transforms',
        title: 'Transforms',
        concept: `Transform utilities apply without touching layout. \`scale-{n}\`: \`scale-90\` (90%), \`scale-110\` (110%). \`rotate-{deg}\`: \`rotate-45\`, \`rotate-90\`, \`rotate-180\`, \`-rotate-12\` (negative). \`translate-x-{n}\` and \`translate-y-{n}\` move elements. \`skew-x-{n}\` shears.\n\nCombine with \`hover:\` and \`transition-transform\` for interactive effects. Use \`origin-\` to change the transform origin: \`origin-top-left\`, \`origin-center\`.`,
        html: `<div class="p-6 grid grid-cols-2 gap-6 text-center text-xs font-bold">

  <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 bg-blue-500 rounded-lg scale-75 flex items-center justify-center text-white">75</div>
    <span class="text-gray-500">scale-75</span>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 bg-blue-500 rounded-lg scale-125 flex items-center justify-center text-white">125</div>
    <span class="text-gray-500">scale-125</span>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 bg-violet-500 rounded-lg rotate-45 flex items-center justify-center text-white">45°</div>
    <span class="text-gray-500">rotate-45</span>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 bg-violet-500 rounded-lg -rotate-12 flex items-center justify-center text-white">-12°</div>
    <span class="text-gray-500">-rotate-12</span>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 bg-emerald-500 rounded-lg translate-x-4 flex items-center justify-center text-white">→</div>
    <span class="text-gray-500">translate-x-4</span>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 bg-emerald-500 rounded-lg skew-x-12 flex items-center justify-center text-white">/</div>
    <span class="text-gray-500">skew-x-12</span>
  </div>

</div>`,
      },
      {
        id: 'keyframes',
        title: 'Built-in Animations',
        concept: `Tailwind ships four keyframe animations out of the box.\n\n\`animate-spin\` — continuous 360° rotation (loading spinners). \`animate-ping\` — scale + fade out, great for notification badges. \`animate-pulse\` — opacity oscillation for skeleton loaders. \`animate-bounce\` — vertical bounce for scroll indicators.\n\nPair with \`animation-delay\` if needed using arbitrary values: \`[animation-delay:200ms]\`.`,
        html: `<div class="p-8 grid grid-cols-2 gap-8 text-center text-sm font-semibold text-gray-700">

  <div class="flex flex-col items-center gap-3">
    <div class="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    <span>animate-spin</span>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="relative">
      <div class="w-4 h-4 bg-rose-500 rounded-full"></div>
      <div class="absolute top-0 left-0 w-4 h-4 bg-rose-400 rounded-full animate-ping"></div>
    </div>
    <span>animate-ping</span>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="w-32 h-4 bg-gray-200 rounded-full animate-pulse"></div>
    <div class="w-24 h-4 bg-gray-200 rounded-full animate-pulse [animation-delay:150ms]"></div>
    <span>animate-pulse (skeleton)</span>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="text-2xl animate-bounce">↓</div>
    <span>animate-bounce</span>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'responsive',
    title: 'Responsive Design',
    emoji: '📱',
    lessons: [
      {
        id: 'breakpoints',
        title: 'Breakpoints',
        concept: `Tailwind is mobile-first. Unprefixed utilities apply to all screen sizes. Add a breakpoint prefix to apply the utility only at that size and above: \`sm:\` (640px+), \`md:\` (768px+), \`lg:\` (1024px+), \`xl:\` (1280px+), \`2xl:\` (1536px+).\n\n\`sm:flex\` means: \`display: flex\` at 640px and above. On mobile it's not applied. Stack modifiers: \`hover:md:bg-blue-600\` applies the hover colour change only on md+ screens.`,
        html: `<div class="p-4">

  <!-- Text size responsive -->
  <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
    Responsive Heading
  </h1>

  <!-- Layout: stack on mobile, row on sm+ -->
  <div class="flex flex-col sm:flex-row gap-3 mb-4">
    <div class="flex-1 bg-blue-500 text-white rounded-lg p-4 text-center font-semibold text-sm">
      Stacks on mobile
    </div>
    <div class="flex-1 bg-blue-600 text-white rounded-lg p-4 text-center font-semibold text-sm">
      Row on sm+
    </div>
    <div class="flex-1 bg-blue-700 text-white rounded-lg p-4 text-center font-semibold text-sm">
      (Resize preview!)
    </div>
  </div>

  <!-- Grid columns responsive -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    <div class="bg-violet-100 rounded p-3 text-center text-sm font-semibold text-violet-700">Card</div>
    <div class="bg-violet-100 rounded p-3 text-center text-sm font-semibold text-violet-700">Card</div>
    <div class="bg-violet-100 rounded p-3 text-center text-sm font-semibold text-violet-700">Card</div>
    <div class="bg-violet-100 rounded p-3 text-center text-sm font-semibold text-violet-700">Card</div>
  </div>

</div>`,
        challenge: {
          question: 'Which prefix applies a utility at 768px and above?',
          options: ['sm:', 'tablet:', 'md:', 'lg:'],
          correct: 'md:',
        },
      },
      {
        id: 'container',
        title: 'Container & Layout',
        concept: `\`container\` sets the max-width to match the current breakpoint, but doesn't centre by default — add \`mx-auto\` for that. By default the container has no horizontal padding — add \`px-4\` or \`px-6\`.\n\nCommon page wrapper pattern: \`class="container mx-auto px-4"\`. For a full-page layout: header (fixed height), main (flex-1), footer — using \`min-h-screen flex flex-col\` on the page wrapper.`,
        html: `<div class="min-h-screen flex flex-col bg-gray-50">

  <!-- Header -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <span class="font-black text-blue-600 text-lg">Logo</span>
      <nav class="flex gap-4 text-sm font-semibold text-gray-600">
        <a href="#" class="hover:text-blue-600 transition-colors">Home</a>
        <a href="#" class="hover:text-blue-600 transition-colors">About</a>
        <a href="#" class="hover:text-blue-600 transition-colors">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main -->
  <main class="flex-1 container mx-auto px-4 py-8">
    <h1 class="text-2xl font-black text-gray-900 mb-2">Page Title</h1>
    <p class="text-gray-500 mb-6">container mx-auto px-4 — centred with horizontal padding.</p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">Card 1</div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">Card 2</div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">Card 3</div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200">
    <div class="container mx-auto px-4 py-4 text-center text-sm text-gray-400">
      © 2026 My Site
    </div>
  </footer>

</div>`,
      },
      {
        id: 'dark-mode',
        title: 'Dark Mode',
        concept: `Tailwind's \`dark:\` modifier applies utilities only when dark mode is active. The playground uses \`class\` strategy — the \`dark\` class on \`<html>\` enables it.\n\nThe dark mode button in the preview header lets you toggle it. Common pattern: \`class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"\`. Build once, support both modes with simple prefixes.`,
        html: `<div class="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">

  <div class="max-w-sm mx-auto">

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Dark Mode Card</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
        This card adapts to both light and dark themes using dark: modifiers.
        Toggle dark mode with the 🌙 button above.
      </p>

      <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">U</div>
        <div>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">User Name</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
        </div>
      </div>

      <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
        Action Button
      </button>
    </div>

  </div>
</div>`,
        challenge: {
          question: 'Which modifier applies a class only in dark mode?',
          options: ['night:', 'theme-dark:', 'dark:', '@dark:'],
          correct: 'dark:',
        },
      },
    ],
  },
  {
    id: 'group-peer',
    title: 'Group & Peer',
    emoji: '🔗',
    lessons: [
      {
        id: 'group-hover',
        title: 'group-hover:',
        concept: `The \`group\` modifier lets a parent element's state drive styles on its children. Add \`group\` to the parent and \`group-hover:\` to any descendant — when the parent is hovered, the child styles activate.\n\nThis solves a common problem: highlighting an icon, arrow, or subtitle when the user hovers a card, without JavaScript. You can also use \`group-focus:\`, \`group-active:\`, and \`group-checked:\` the same way.`,
        html: `<div class="space-y-4 p-6 max-w-sm">

  <!-- Basic group-hover -->
  <div class="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm
    hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        Hover this card
      </h3>
      <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
    <p class="text-sm text-gray-500 group-hover:text-gray-700 mt-1 transition-colors">
      The arrow moves and colours change on parent hover.
    </p>
  </div>

  <!-- group with image overlay -->
  <div class="group relative overflow-hidden rounded-xl cursor-pointer">
    <div class="h-32 bg-gradient-to-br from-violet-500 to-blue-600"></div>
    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300
      flex items-center justify-center">
      <span class="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300
        translate-y-2 group-hover:translate-y-0">
        View Project
      </span>
    </div>
  </div>

</div>`,
        challenge: {
          question: 'Which class do you add to a parent to enable group-hover: on its children?',
          options: ['parent', 'group', 'hover-group', 'group-parent'],
          correct: 'group',
        },
      },
      {
        id: 'named-groups',
        title: 'Named Groups',
        concept: `When you nest groups, Tailwind can't tell which parent's hover to respond to. Named groups solve this: \`group/card\` names the parent, and \`group-hover/card:\` targets it specifically.\n\nThis is essential for complex UI like a list where each row has a nested interactive element — you can respond to row hover and item hover independently.`,
        html: `<div class="p-6 space-y-3 max-w-md">

  <div class="group/row bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50
    transition-colors cursor-pointer flex items-center gap-4">

    <!-- Avatar with its own nested group -->
    <div class="group/avatar relative flex-shrink-0">
      <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center
        text-white font-bold text-sm group-hover/avatar:ring-4 group-hover/avatar:ring-blue-200 transition-all">
        A
      </div>
      <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
    </div>

    <div class="flex-1 min-w-0">
      <p class="font-semibold text-gray-800 group-hover/row:text-blue-600 transition-colors">
        Alex Rivera
      </p>
      <p class="text-sm text-gray-500 truncate">
        Senior Designer · Online
      </p>
    </div>

    <!-- Action button — only visible on row hover -->
    <button class="opacity-0 group-hover/row:opacity-100 transition-opacity
      px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Message
    </button>

  </div>

  <p class="text-xs text-gray-400 text-center">
    Hover the row → Message appears. Hover the avatar → ring appears.
  </p>

</div>`,
      },
      {
        id: 'peer',
        title: 'peer & peer-checked:',
        concept: `The \`peer\` modifier works between siblings. Mark an element \`peer\`, then use \`peer-checked:\`, \`peer-focus:\`, or \`peer-invalid:\` on a following sibling to style it based on the peer's state.\n\nThe most common use: styling a custom checkbox or toggle label based on the checkbox state — pure CSS, no JavaScript. The peer must come before the sibling in the DOM.`,
        html: `<div class="p-6 space-y-6 max-w-sm">

  <!-- Custom checkbox with peer -->
  <label class="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" class="peer sr-only" />
    <div class="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center
      peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex-shrink-0">
      <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <span class="text-gray-700 peer-checked:text-blue-600 peer-checked:font-semibold transition-colors">
      Accept terms and conditions
    </span>
  </label>

  <!-- Toggle switch with peer -->
  <label class="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" class="peer sr-only" />
    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors">
      <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
        peer-checked:translate-x-5 transition-transform"></div>
    </div>
    <span class="text-gray-700 peer-checked:font-semibold">Enable notifications</span>
  </label>

  <!-- peer-focus on input -->
  <div>
    <input type="email" placeholder="Email address" class="peer w-full px-3 py-2 border border-gray-300
      rounded-lg outline-none focus:border-blue-500 text-sm" />
    <p class="mt-1 text-xs text-gray-400 opacity-0 peer-focus:opacity-100 transition-opacity">
      We'll never share your email with anyone.
    </p>
  </div>

</div>`,
        challenge: {
          question: 'Which modifier styles a sibling based on a peer input being checked?',
          options: ['sibling-checked:', 'group-checked:', 'peer-checked:', 'parent-checked:'],
          correct: 'peer-checked:',
        },
      },
    ],
  },

  {
    id: 'apply-config',
    title: '@apply & Config',
    emoji: '⚙️',
    lessons: [
      {
        id: 'apply-directive',
        title: 'The @apply Directive',
        concept: `\`@apply\` extracts repeated Tailwind class lists into a single CSS class. Write it in a \`<style>\` tag or your CSS file: \`.btn { @apply px-4 py-2 rounded-lg font-semibold; }\`.\n\nUse \`@apply\` when you repeat the same combination of 5+ classes on many elements — buttons, badges, form inputs. Don't overuse it: it defeats Tailwind's purpose. The rule of thumb is: if you're writing a loop or component, use the utility classes directly. Only \`@apply\` for truly global patterns.`,
        html: `<style>
  .btn        { @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors; }
  .btn-blue   { @apply bg-blue-600 text-white hover:bg-blue-700; }
  .btn-white  { @apply bg-white text-gray-700 border border-gray-300 hover:bg-gray-50; }
  .btn-danger { @apply bg-red-600 text-white hover:bg-red-700; }

  .badge      { @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold; }
  .badge-blue { @apply bg-blue-100 text-blue-800; }
  .badge-green { @apply bg-green-100 text-green-800; }
  .badge-red  { @apply bg-red-100 text-red-800; }

  .card       { @apply bg-white rounded-xl border border-gray-200 shadow-sm p-5; }
</style>

<div class="p-6 space-y-4">

  <div class="flex gap-3 flex-wrap">
    <button class="btn btn-blue">Primary action</button>
    <button class="btn btn-white">Secondary</button>
    <button class="btn btn-danger">Delete</button>
  </div>

  <div class="flex gap-2">
    <span class="badge badge-blue">In progress</span>
    <span class="badge badge-green">Completed</span>
    <span class="badge badge-red">Overdue</span>
  </div>

  <div class="card">
    <h3 class="font-bold text-gray-800 mb-1">Card using @apply</h3>
    <p class="text-sm text-gray-500">Same styles, much less repetition in the HTML.</p>
  </div>

</div>`,
      },
      {
        id: 'custom-config',
        title: 'Custom Tailwind Config',
        concept: `The \`tailwind.config\` object in a \`<script>\` tag customises Tailwind's theme without a build step. Add custom colours, fonts, spacing, or breakpoints under \`theme.extend\` to add on top of the defaults. Replace \`theme\` (without \`extend\`) to override entirely.\n\nCommon uses: adding your brand colours so \`text-brand-500\` works, adding a custom font as \`font-display\`, or extending the spacing scale.`,
        html: `<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            50:  '#f0f9ff',
            100: '#e0f2fe',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
          },
          accent: '#f59e0b',
        },
        fontFamily: {
          display: ['Georgia', 'serif'],
        },
        borderRadius: {
          'xl-2': '1.25rem',
        },
      },
    },
  }
</script>

<div class="p-6 space-y-4 max-w-sm">

  <div class="bg-brand-50 border border-brand-100 rounded-xl-2 p-5">
    <h2 class="font-display text-2xl font-bold text-brand-700 mb-1">
      Custom Theme
    </h2>
    <p class="text-brand-600 text-sm">
      Using custom brand colours and font-display defined in tailwind.config.
    </p>
  </div>

  <div class="flex gap-2">
    <button class="px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors">
      Brand button
    </button>
    <button class="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
      Accent button
    </button>
  </div>

  <p class="text-xs text-brand-400">text-brand-400 — custom colour shade</p>

</div>`,
        challenge: {
          question: 'Which key do you use inside theme to ADD to the defaults without replacing them?',
          options: ['add', 'merge', 'extend', 'append'],
          correct: 'extend',
        },
      },
    ],
  },

  {
    id: 'components',
    title: 'Component Patterns',
    emoji: '🧩',
    lessons: [
      {
        id: 'card-patterns',
        title: 'Card Patterns',
        concept: `Cards are the most common UI component — a container for content with a visual boundary. Tailwind makes it easy to build several card variants without leaving your HTML.\n\nKey utilities: \`rounded-xl\` for corners, \`shadow-sm\`/\`shadow-md\` for depth, \`border border-gray-200\` for definition, \`overflow-hidden\` when the card has an image that should respect the border-radius.`,
        html: `<div class="p-4 grid grid-cols-1 gap-4 max-w-sm">

  <!-- Basic card -->
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <h3 class="font-bold text-gray-900 mb-1">Basic card</h3>
    <p class="text-sm text-gray-500">border + rounded-xl + shadow-sm + padding</p>
  </div>

  <!-- Image card -->
  <div class="bg-white rounded-xl overflow-hidden shadow-md">
    <div class="h-32 bg-gradient-to-br from-blue-500 to-violet-600"></div>
    <div class="p-4">
      <h3 class="font-bold text-gray-900">Image card</h3>
      <p class="text-sm text-gray-500 mt-1">overflow-hidden clips image to border-radius</p>
      <button class="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700">
        Read more →
      </button>
    </div>
  </div>

  <!-- Horizontal card -->
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex overflow-hidden">
    <div class="w-24 bg-emerald-500 flex-shrink-0"></div>
    <div class="p-4">
      <h3 class="font-bold text-gray-900 text-sm">Horizontal card</h3>
      <p class="text-xs text-gray-500 mt-1">flex + fixed-width colour bar</p>
    </div>
  </div>

  <!-- Interactive card -->
  <div class="group bg-white rounded-xl border border-gray-200 shadow-sm p-5
    hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Interactive</h3>
        <p class="text-sm text-gray-500 mt-1">hover changes border + shadow</p>
      </div>
      <span class="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">→</span>
    </div>
  </div>

</div>`,
      },
      {
        id: 'navbar-pattern',
        title: 'Navigation Bar',
        concept: `A navigation bar typically needs: a logo on the left, nav links in the centre or right, and a CTA button. On mobile it collapses — Tailwind handles this with responsive \`hidden\` / \`flex\` utilities.\n\nCommon patterns: \`sticky top-0 z-50\` for a fixed header, \`backdrop-blur-sm bg-white/80\` for a glassmorphism effect, \`border-b\` for a subtle separator.`,
        html: `<div class="min-h-screen bg-gray-50">

  <!-- Standard navbar -->
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="#" class="font-black text-xl text-blue-600">Logo</a>
      <div class="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
        <a href="#" class="hover:text-gray-900 transition-colors">Home</a>
        <a href="#" class="hover:text-gray-900 transition-colors">Features</a>
        <a href="#" class="hover:text-gray-900 transition-colors">Pricing</a>
        <a href="#" class="hover:text-gray-900 transition-colors">About</a>
      </div>
      <button class="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
        Sign up
      </button>
    </div>
  </nav>

  <!-- Glassmorphism variant -->
  <nav class="mx-4 mt-4 bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-sm">
    <div class="px-5 h-12 flex items-center justify-between">
      <span class="font-bold text-gray-900">Glassy Nav</span>
      <div class="flex items-center gap-4 text-sm font-medium text-gray-600">
        <a href="#" class="hover:text-blue-600">Docs</a>
        <a href="#" class="hover:text-blue-600">Blog</a>
        <a href="#" class="px-3 py-1 bg-gray-900 text-white rounded-lg text-xs font-bold">Get started</a>
      </div>
    </div>
  </nav>

  <div class="max-w-5xl mx-auto px-4 py-8 text-gray-400 text-sm">Page content here…</div>
</div>`,
      },
      {
        id: 'form-patterns',
        title: 'Form Patterns',
        concept: `Forms in Tailwind use a consistent pattern: \`block w-full\` input, \`border border-gray-300 rounded-lg\` for the field, \`focus:ring-2 focus:ring-blue-500 focus:border-blue-500\` for focus state, and \`outline-none\` to remove the browser default.\n\nLabel + input stacked: \`flex flex-col gap-1\`. Error state: swap border colour to \`border-red-500\` and add \`text-red-600\` for the error message.`,
        html: `<div class="p-6 max-w-sm">
  <form class="space-y-4">

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Full name</label>
      <input type="text" placeholder="Alex Rivera"
        class="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
      <input type="email" value="bad-email"
        class="block w-full px-3 py-2 border border-red-400 rounded-lg text-sm outline-none
          bg-red-50 text-red-900 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-shadow" />
      <p class="mt-1 text-xs text-red-600">Please enter a valid email address.</p>
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Role</label>
      <select class="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none
        bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option>Designer</option>
        <option>Developer</option>
        <option>Product Manager</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
      <textarea rows="3" placeholder="Tell us about yourself…"
        class="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none
          resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"></textarea>
    </div>

    <button type="submit"
      class="w-full py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg
        hover:bg-blue-700 active:bg-blue-800 transition-colors">
      Save changes
    </button>

  </form>
</div>`,
      },
      {
        id: 'badge-chip-patterns',
        title: 'Badge, Tag & Alert',
        concept: `Small UI elements — badges, tags, pills, chips, and alerts — are built with the same few utilities. A badge: \`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold\`. An alert: \`flex items-start gap-3 p-4 rounded-lg border\` with colour variants.\n\nThese are also great candidates for \`@apply\` if you use them heavily.`,
        html: `<div class="p-5 space-y-5">

  <!-- Status badges -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status badges</p>
    <div class="flex flex-wrap gap-2">
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Active
      </span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Pending</span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">Cancelled</span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Draft</span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white">Featured</span>
    </div>
  </div>

  <!-- Tags with remove -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tags</p>
    <div class="flex flex-wrap gap-2">
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
        React <button class="text-gray-400 hover:text-gray-700 ml-1">×</button>
      </span>
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
        Tailwind <button class="text-blue-400 hover:text-blue-700 ml-1">×</button>
      </span>
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium">
        TypeScript <button class="text-violet-400 hover:text-violet-700 ml-1">×</button>
      </span>
    </div>
  </div>

  <!-- Alerts -->
  <div class="space-y-2">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Alerts</p>
    <div class="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <span class="text-blue-500 mt-0.5">ℹ</span>
      <p class="text-sm text-blue-700">Your account has been updated successfully.</p>
    </div>
    <div class="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <span class="text-red-500 mt-0.5">⚠</span>
      <p class="text-sm text-red-700">Failed to save changes. Please try again.</p>
    </div>
    <div class="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
      <span class="text-green-500 mt-0.5">✓</span>
      <p class="text-sm text-green-700">Payment confirmed. Receipt sent to your email.</p>
    </div>
  </div>

</div>`,
      },
    ],
  },

  {
    id: 'accessibility',
    title: 'Accessibility',
    emoji: '♿',
    lessons: [
      {
        id: 'sr-only',
        title: 'sr-only & Screen Readers',
        concept: `\`sr-only\` visually hides an element while keeping it accessible to screen readers — it sets \`position: absolute; width: 1px; height: 1px; overflow: hidden\` etc. Use it to add descriptive labels to icon-only buttons.\n\n\`not-sr-only\` reverses \`sr-only\` — useful to toggle visibility at a breakpoint. Add \`sr-only\` labels to every interactive element that has no visible text.`,
        html: `<div class="p-6 space-y-6 max-w-sm">

  <!-- Icon button with sr-only label -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Icon buttons with sr-only labels</p>
    <div class="flex gap-2">
      <button class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Share">
        <span class="sr-only">Share this page</span>
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
      </button>
      <button class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
        <span class="sr-only">Save to bookmarks</span>
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </button>
    </div>
    <p class="text-xs text-gray-400 mt-2">Screen readers announce "Share this page" and "Save to bookmarks"</p>
  </div>

  <!-- Skip link (visible on focus) -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Skip navigation link</p>
    <div class="relative border border-dashed border-gray-300 rounded-lg p-4">
      <a href="#main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
          focus:px-3 focus:py-1 focus:bg-blue-600 focus:text-white focus:rounded focus:text-sm focus:font-semibold">
        Skip to main content
      </a>
      <p class="text-sm text-gray-500">Tab into this box to reveal the skip link above.</p>
    </div>
  </div>

</div>`,
        challenge: {
          question: 'Which class hides an element visually but keeps it accessible to screen readers?',
          options: ['hidden', 'invisible', 'sr-only', 'opacity-0'],
          correct: 'sr-only',
        },
      },
      {
        id: 'focus-visible',
        title: 'focus-visible: & Keyboard Nav',
        concept: `\`focus-visible:\` applies styles only when an element is focused via keyboard — not on mouse click. This lets you show clear focus rings for keyboard users without a visible ring on every mouse click.\n\nPattern: \`outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2\`. This is the modern accessible alternative to \`outline: none\` without a replacement.`,
        html: `<div class="p-6 space-y-5 max-w-sm">

  <p class="text-sm text-gray-600">
    Tab through the elements below. Focus rings appear only on keyboard focus,
    not on mouse click — that's <code class="text-xs bg-gray-100 px-1 py-0.5 rounded">focus-visible:</code>
  </p>

  <!-- Buttons -->
  <div class="space-y-2">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Buttons</p>
    <div class="flex gap-3">
      <button class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg
        outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition">
        Primary
      </button>
      <button class="px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300
        outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 transition">
        Secondary
      </button>
    </div>
  </div>

  <!-- Links -->
  <div class="space-y-2">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Links</p>
    <a href="#" class="text-blue-600 underline-offset-2 hover:underline rounded
      outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1">
      Accessible link
    </a>
  </div>

  <!-- Input -->
  <div class="space-y-2">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Input</p>
    <input type="text" placeholder="Type something…"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
        outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition" />
  </div>

  <!-- Custom focusable card -->
  <div tabindex="0" class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer
    outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition">
    <p class="font-semibold text-gray-800">Focusable card</p>
    <p class="text-sm text-gray-500">tabindex="0" makes non-interactive elements keyboard-focusable</p>
  </div>

</div>`,
      },
      {
        id: 'aria-modifiers',
        title: 'aria- Modifiers',
        concept: `Tailwind supports \`aria-\` modifiers that apply styles based on ARIA attributes: \`aria-checked:\`, \`aria-disabled:\`, \`aria-expanded:\`, \`aria-selected:\`, \`aria-hidden:\`.\n\nThese let you drive visual state from the ARIA state you're already setting for accessibility — single source of truth. \`aria-expanded:rotate-180\` rotates a chevron when a section is open. \`aria-selected:bg-blue-100\` highlights an active tab.`,
        html: `<div class="p-6 space-y-5 max-w-sm">

  <!-- Accordion with aria-expanded -->
  <div class="border border-gray-200 rounded-xl overflow-hidden">
    <button
      aria-expanded="true"
      class="w-full flex items-center justify-between px-4 py-3 font-semibold text-gray-800
        hover:bg-gray-50 transition-colors">
      <span>What is Tailwind CSS?</span>
      <svg class="w-4 h-4 text-gray-400 transition-transform aria-expanded:rotate-180"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div class="px-4 pb-4 text-sm text-gray-500 border-t border-gray-100">
      A utility-first CSS framework that lets you build designs directly in your HTML.
    </div>
  </div>

  <!-- Tab list with aria-selected -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tabs</p>
    <div class="flex border-b border-gray-200">
      <button aria-selected="true"
        class="px-4 py-2 text-sm font-semibold text-gray-500 border-b-2 border-transparent
          aria-selected:text-blue-600 aria-selected:border-blue-600 transition-colors">
        Overview
      </button>
      <button aria-selected="false"
        class="px-4 py-2 text-sm font-semibold text-gray-500 border-b-2 border-transparent
          aria-selected:text-blue-600 aria-selected:border-blue-600 transition-colors">
        Details
      </button>
      <button aria-selected="false"
        class="px-4 py-2 text-sm font-semibold text-gray-500 border-b-2 border-transparent
          aria-selected:text-blue-600 aria-selected:border-blue-600 transition-colors">
        Reviews
      </button>
    </div>
  </div>

  <!-- aria-disabled -->
  <div class="flex gap-3">
    <button aria-disabled="false"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm
        aria-disabled:opacity-50 aria-disabled:cursor-not-allowed transition-opacity">
      Enabled
    </button>
    <button aria-disabled="true"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm
        aria-disabled:opacity-50 aria-disabled:cursor-not-allowed transition-opacity">
      Disabled
    </button>
  </div>

</div>`,
        challenge: {
          question: 'Which Tailwind modifier applies styles when aria-expanded="true"?',
          options: ['open:', 'expanded:', 'aria-open:', 'aria-expanded:'],
          correct: 'aria-expanded:',
        },
      },
    ],
  },

  // ── Advanced Patterns ────────────────────────────────────────────────────
  {
    id: 'advanced-patterns',
    title: 'Advanced Patterns',
    emoji: '🧩',
    lessons: [
      {
        id: 'arbitrary-variants',
        title: 'Arbitrary Variants',
        concept: `Tailwind's arbitrary variant syntax \`[&>li]:\`, \`[&:nth-child(2)]:\`, \`[&_span]:\` lets you write any CSS selector as a modifier. This covers child selectors, nth-child, and descendant selectors without touching a CSS file.\n\nThe \`&\` is a placeholder for the element itself — exactly like CSS nesting. \`[&>li]:text-blue-600\` becomes \`selector > li { color: ... }\`. Pair with \`group-[.is-active]:\` for class-based state.`,
        html: `<div class="p-6 space-y-6 max-w-md">

  <!-- Child selector [&>li]: -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Child combinator</p>
    <ul class="[&>li]:py-2 [&>li]:border-b [&>li]:border-gray-100 [&>li]:text-gray-700 [&>li:last-child]:border-0">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item — no border</li>
    </ul>
  </div>

  <!-- nth-child -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">nth-child</p>
    <ul class="space-y-1 [&>li:nth-child(odd)]:bg-gray-50 [&>li:nth-child(even)]:bg-blue-50 [&>li]:px-3 [&>li]:py-2 [&>li]:rounded">
      <li>Row 1 — odd</li>
      <li>Row 2 — even</li>
      <li>Row 3 — odd</li>
      <li>Row 4 — even</li>
    </ul>
  </div>

  <!-- Descendant [&_span]: -->
  <div class="[&_span]:font-semibold [&_span]:text-indigo-600">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descendant selector</p>
    <p class="text-sm text-gray-600">This paragraph has a <span>highlighted</span> word and another <span>styled span</span> — no extra classes on the spans.</p>
  </div>

</div>`,
        challenge: {
          question: 'Which arbitrary variant targets direct children <li> elements?',
          options: ['[&li]:', '[&>li]:', '[li]:', '[_li]:'],
          correct: '[&>li]:',
        },
      },
      {
        id: 'has-modifier',
        title: 'has-* Modifier',
        concept: `The \`has-[selector]:\` modifier applies styles when an element *contains* a matching descendant — CSS \`:has()\` as a Tailwind modifier.\n\n\`has-[:checked]:bg-blue-50\` turns a label blue when its checkbox is checked. \`has-[input:focus]:ring-2\` adds a focus ring to a wrapper div when any input inside is focused. This replaces JavaScript-driven class toggling for many interaction patterns.`,
        html: `<div class="p-6 space-y-5 max-w-sm">

  <!-- Label lights up when checkbox is checked -->
  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Check to activate</p>
  <label class="flex items-center gap-3 p-4 rounded-xl border border-gray-200
    has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-300 transition-colors cursor-pointer">
    <input type="checkbox" class="w-4 h-4 accent-indigo-600" />
    <span class="text-sm font-medium text-gray-700
      has-[:checked]:text-indigo-700">Enable notifications</span>
  </label>

  <!-- Wrapper gets focus ring when inner input is focused -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Focus wrapper</p>
    <div class="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg
      has-[input:focus]:ring-2 has-[input:focus]:ring-blue-500 has-[input:focus]:border-blue-500 transition-all">
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input type="text" placeholder="Search…" class="flex-1 outline-none text-sm bg-transparent" />
    </div>
  </div>

  <!-- Card variant when it has an img -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">has-[img] card</p>
    <div class="rounded-xl border border-gray-200 overflow-hidden has-[img]:shadow-md transition-shadow">
      <img src="https://picsum.photos/seed/tw/400/120" alt="" class="w-full h-24 object-cover" />
      <div class="p-3 text-sm text-gray-700">Card with image — shadow added by has-[img]</div>
    </div>
  </div>

</div>`,
        challenge: {
          question: 'What does has-[:checked]: do on a label element?',
          options: [
            'Styles the checked input inside',
            'Styles the label when it contains a checked input',
            'Only works on inputs directly',
            'Requires JavaScript to activate',
          ],
          correct: 'Styles the label when it contains a checked input',
        },
      },
      {
        id: 'layer-utilities',
        title: '@layer with Tailwind',
        concept: `Tailwind is built on three cascade layers: \`base\` (reset & defaults), \`components\` (reusable class combos), and \`utilities\` (one-off helpers). When you write custom CSS with \`@layer components { ... }\` or \`@layer utilities { ... }\`, it sits in the correct specificity bucket — utilities always win over components, and both beat base.\n\nThis lets you add custom classes that behave exactly like Tailwind's built-ins, including responsive and state variants.`,
        html: `<style>
  /* Custom component in the components layer */
  @layer components {
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.15s;
      cursor: pointer;
      border: none;
    }
    .btn-primary {
      background: #4f46e5;
      color: white;
    }
    .btn-primary:hover {
      background: #4338ca;
    }
    .card-base {
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      padding: 1.25rem;
    }
  }

  /* Custom utility — overrides component if both applied */
  @layer utilities {
    .text-balance {
      text-wrap: balance;
    }
  }
</style>

<div class="p-6 space-y-4 max-w-sm">
  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">@layer components</p>

  <div class="flex gap-3">
    <button class="btn btn-primary">Save changes</button>
    <!-- Tailwind utilities override component styles — p-1 wins over btn's padding -->
    <button class="btn btn-primary p-1 text-xs">Compact</button>
  </div>

  <div class="card-base shadow-sm">
    <p class="font-semibold text-gray-800 text-balance">Custom card component with balanced text wrapping</p>
    <p class="text-sm text-gray-500 mt-1">Defined in @layer components — Tailwind utilities still override.</p>
  </div>
</div>`,
        challenge: {
          question: 'Which @layer wins when both apply to the same element?',
          options: ['base', 'components', 'utilities', 'Last one written'],
          correct: 'utilities',
        },
      },
      {
        id: 'motion-safe',
        title: 'motion-safe & motion-reduce',
        concept: `\`motion-safe:\` applies styles only when the user has NOT requested reduced motion. \`motion-reduce:\` applies styles only when they HAVE. Use \`motion-safe:animate-bounce\` instead of just \`animate-bounce\` so animations are skipped for users with vestibular disorders or motion sensitivity.\n\nThis is a one-class accessibility fix that respects the OS-level "Reduce Motion" setting.`,
        html: `<div class="p-6 space-y-6 max-w-sm">

  <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
    Toggle "Reduce motion" in your OS Accessibility settings to see the difference.
  </div>

  <!-- Bounce only when motion is safe -->
  <div class="flex items-center gap-4">
    <div class="w-10 h-10 bg-indigo-500 rounded-full motion-safe:animate-bounce"></div>
    <p class="text-sm text-gray-600">motion-safe:animate-bounce — stops if reduce-motion is on</p>
  </div>

  <!-- Spin only when motion is safe -->
  <div class="flex items-center gap-4">
    <div class="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full motion-safe:animate-spin"></div>
    <p class="text-sm text-gray-600">motion-safe:animate-spin loading spinner</p>
  </div>

  <!-- Alternative static style for reduced motion users -->
  <div class="flex items-center gap-4">
    <div class="w-10 h-10 bg-green-500 rounded-full
      motion-safe:animate-ping
      motion-reduce:opacity-60 motion-reduce:scale-90">
    </div>
    <p class="text-sm text-gray-600">Ping when safe, dimmed when reduced</p>
  </div>

  <!-- Transition only when safe -->
  <button class="px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold text-sm
    motion-safe:transition-transform motion-safe:hover:scale-105
    motion-reduce:hover:bg-violet-700">
    Hover me — scale or colour depending on preference
  </button>

</div>`,
        challenge: {
          question: 'When does motion-safe: apply its styles?',
          options: [
            'Always, regardless of OS setting',
            'When the user prefers reduced motion',
            'When the user has NOT requested reduced motion',
            'Only on mobile devices',
          ],
          correct: 'When the user has NOT requested reduced motion',
        },
      },
      {
        id: 'print-styles',
        title: 'Print Styles',
        concept: `The \`print:\` modifier applies styles only when the page is printed. Use \`print:hidden\` to hide navigation and UI chrome, \`print:block\` to show hidden print-only content, and \`print:text-black print:bg-white\` to strip dark themes for clean printouts.\n\nCombine with \`screen:\` to apply utilities only on-screen — the opposite of print.`,
        html: `<div class="p-6 max-w-lg space-y-4">

  <!-- Navigation — hidden when printing -->
  <nav class="flex gap-4 p-3 bg-gray-800 rounded-lg print:hidden">
    <a href="#" class="text-white text-sm font-semibold">Home</a>
    <a href="#" class="text-gray-300 text-sm">About</a>
    <a href="#" class="text-gray-300 text-sm">Contact</a>
  </nav>

  <!-- Receipt / invoice — good for print -->
  <div class="border border-gray-200 rounded-xl p-5 print:border-0 print:p-0">
    <div class="flex justify-between items-start mb-4">
      <div>
        <p class="font-bold text-lg text-gray-900">Invoice #1042</p>
        <p class="text-sm text-gray-500">May 2025</p>
      </div>
      <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded print:hidden">
        Paid
      </span>
      <!-- Print-only status text -->
      <span class="hidden print:inline text-sm font-semibold">PAID</span>
    </div>

    <table class="w-full text-sm">
      <tr class="border-b border-gray-100">
        <td class="py-2 text-gray-600">Web design</td>
        <td class="py-2 text-right font-semibold">$1,200</td>
      </tr>
      <tr class="border-b border-gray-100">
        <td class="py-2 text-gray-600">Hosting setup</td>
        <td class="py-2 text-right font-semibold">$200</td>
      </tr>
      <tr>
        <td class="py-2 font-bold">Total</td>
        <td class="py-2 text-right font-bold text-indigo-600 print:text-black">$1,400</td>
      </tr>
    </table>
  </div>

  <!-- Print button -->
  <button onclick="window.print()"
    class="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg print:hidden">
    Print this page
  </button>

</div>`,
        challenge: {
          question: 'How do you hide an element when the page is printed?',
          options: ['hidden-print', 'print:hidden', 'no-print', 'print-none'],
          correct: 'print:hidden',
        },
      },
      {
        id: 'skeleton-loading',
        title: 'Skeleton Loading',
        concept: `A skeleton screen shows the shape of content before it loads — better UX than a spinner because it reduces perceived wait time. Build skeletons with \`animate-pulse\` on grey placeholder shapes that mirror the real layout.\n\nCombine with \`rounded\` and \`bg-gray-200\` to create text, image, and avatar placeholders. Toggle between skeleton and real content with JavaScript or a data attribute.`,
        html: `<div class="p-6 max-w-sm space-y-5">

  <!-- Skeleton card -->
  <div class="space-y-3">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading…</p>
    <div class="border border-gray-100 rounded-xl p-4 space-y-3 animate-pulse">
      <!-- Avatar + name row -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-200"></div>
        <div class="flex-1 space-y-1.5">
          <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          <div class="h-2.5 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <!-- Image placeholder -->
      <div class="h-32 bg-gray-200 rounded-lg"></div>
      <!-- Text lines -->
      <div class="space-y-2">
        <div class="h-2.5 bg-gray-200 rounded"></div>
        <div class="h-2.5 bg-gray-200 rounded w-5/6"></div>
        <div class="h-2.5 bg-gray-200 rounded w-4/6"></div>
      </div>
      <!-- Action row -->
      <div class="flex gap-2 pt-1">
        <div class="h-7 bg-gray-200 rounded-lg w-20"></div>
        <div class="h-7 bg-gray-200 rounded-lg w-16"></div>
      </div>
    </div>
  </div>

  <!-- Loaded card (what it becomes) -->
  <div class="space-y-3">
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Loaded</p>
    <div class="border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm">
      <div class="flex items-center gap-3">
        <img src="https://i.pravatar.cc/40?img=5" class="w-10 h-10 rounded-full" alt="Avatar" />
        <div>
          <p class="text-sm font-semibold text-gray-800">Sarah Chen</p>
          <p class="text-xs text-gray-400">2 hours ago</p>
        </div>
      </div>
      <img src="https://picsum.photos/seed/sk/400/128" alt="Post" class="w-full h-32 object-cover rounded-lg" />
      <p class="text-sm text-gray-600 leading-relaxed">Just shipped the new dashboard. The skeleton loading makes it feel so much snappier!</p>
      <div class="flex gap-2 pt-1">
        <button class="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg">Like</button>
        <button class="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg">Share</button>
      </div>
    </div>
  </div>

</div>`,
        challenge: {
          question: 'Which Tailwind class creates the pulsing skeleton animation?',
          options: ['animate-skeleton', 'pulse', 'animate-pulse', 'loading-pulse'],
          correct: 'animate-pulse',
        },
      },
      {
        id: 'dialog-popover',
        title: 'Dialog & Popover',
        concept: `The native \`<dialog>\` and \`popover\` API give you modals and tooltips with built-in accessibility and keyboard handling — no JavaScript library needed. Style them with Tailwind and use the \`open:\` modifier to style the open state.\n\n\`popover="auto"\` creates a dismissable popover on any element. \`<dialog>\` opened with \`.showModal()\` traps focus and handles Escape automatically.`,
        html: `<div class="p-6 space-y-5 max-w-sm">

  <!-- Native dialog -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Native &lt;dialog&gt;</p>
    <button
      onclick="document.getElementById('myDialog').showModal()"
      class="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
      Open Dialog
    </button>

    <dialog id="myDialog"
      class="rounded-2xl shadow-xl border border-gray-100 p-6 w-80 backdrop:bg-black/40
        open:animate-[fadeIn_.2s_ease]">
      <h2 class="text-lg font-bold text-gray-900 mb-2">Confirm action</h2>
      <p class="text-sm text-gray-500 mb-5">Are you sure you want to continue? This cannot be undone.</p>
      <div class="flex justify-end gap-3">
        <button
          onclick="document.getElementById('myDialog').close()"
          class="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onclick="document.getElementById('myDialog').close()"
          class="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
          Delete
        </button>
      </div>
    </dialog>
  </div>

  <!-- Native popover API -->
  <div>
    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Native popover</p>
    <button
      popovertarget="myPopover"
      class="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors">
      Show Tooltip
    </button>

    <div
      id="myPopover"
      popover="auto"
      class="m-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg border-0 w-48
        [&:popover-open]:block">
      Popover content — click outside or press Escape to close. No JS needed.
    </div>
  </div>

</div>`,
        challenge: {
          question: 'What does the open: modifier in Tailwind target?',
          options: [
            'Elements with class="open"',
            'Elements with the HTML open attribute or :open state',
            'Only <details> elements',
            'Requires JavaScript to set',
          ],
          correct: 'Elements with the HTML open attribute or :open state',
        },
      },
    ],
  },

  // ── Tailwind v4 ────────────────────────────────────────────────────────────
  {
    id: 'tailwind-v4',
    title: 'Tailwind v4',
    emoji: '🚀',
    lessons: [
      {
        id: 'v4-css-config',
        title: 'CSS-first config',
        concept: `Tailwind v4 removes \`tailwind.config.js\` and moves configuration into CSS using the \`@theme\` directive. Import Tailwind with a single \`@import\` and define your design tokens directly in CSS — no build tool config required.\n\nAll tokens defined in \`@theme\` are automatically available as CSS custom properties (e.g., \`--color-brand-500\`) and generate corresponding utility classes (e.g., \`bg-brand-500\`).`,
        html: `<!-- No tailwind.config.js needed in v4 -->
<!-- Your CSS file does everything: -->

<!--
@import "tailwindcss";

@theme {
  --color-brand-50:  oklch(0.97 0.03 265);
  --color-brand-500: oklch(0.55 0.22 265);
  --color-brand-900: oklch(0.25 0.18 265);

  --font-family-display: "Cal Sans", sans-serif;
  --spacing-18: 4.5rem;
  --border-radius-4xl: 2rem;
}
-->

<div class="demo">
  <h3>Auto-generated from @theme tokens:</h3>
  <div class="grid">
    <div class="chip" style="background:#eff1fd;color:#4f52b5">bg-brand-50</div>
    <div class="chip" style="background:#6366f1;color:white">bg-brand-500</div>
    <div class="chip" style="background:#1e2072;color:white">bg-brand-900</div>
  </div>

  <div class="property-list">
    <div class="property">
      <span class="key">--color-brand-500</span>
      <span class="val">oklch(0.55 0.22 265)</span>
    </div>
    <div class="property">
      <span class="key">--spacing-18</span>
      <span class="val">4.5rem → p-18, m-18, gap-18…</span>
    </div>
    <div class="property">
      <span class="key">--border-radius-4xl</span>
      <span class="val">2rem → rounded-4xl</span>
    </div>
    <div class="property">
      <span class="key">--font-family-display</span>
      <span class="val">"Cal Sans" → font-display</span>
    </div>
  </div>
</div>`,
        challenge: {
          question: 'In Tailwind v4, where do you define custom tokens instead of tailwind.config.js?',
          options: ['@config directive', '@theme directive in CSS', 'theme.extend in JSON', 'A separate tokens.css file'],
          correct: '@theme directive in CSS',
        },
      },
      {
        id: 'v4-new-variants',
        title: 'New v4 variants',
        concept: `Tailwind v4 adds several new variants:\n\n**\`not-\`** — applies when the condition is NOT true: \`not-hover:opacity-50\`, \`not-disabled:cursor-pointer\`.\n\n**\`in-\`** — applies when the element is inside a parent matching a selector: \`in-[.dark]:text-white\`.\n\n**\`nth-\`** — \`nth-2:bg-gray-50\`, \`nth-last-3:font-bold\`, \`nth-of-type-[3n+1]:text-blue-600\`.\n\n**\`starting\`** — uses \`@starting-style\` for enter animations without JavaScript.`,
        html: `<div class="demo">

  <section>
    <h3>not- variant</h3>
    <div class="btn-row">
      <button class="btn active-btn">Active (hover me)</button>
      <button class="btn inactive-btn">Inactive</button>
    </div>
    <code>.not-hover:opacity-60 — dimmed until hovered</code>
  </section>

  <section>
    <h3>nth- variant</h3>
    <ul class="nth-list">
      <li>Item 1 (odd — highlighted)</li>
      <li>Item 2</li>
      <li>Item 3 (odd — highlighted)</li>
      <li>Item 4</li>
      <li>Item 5 (odd — highlighted)</li>
    </ul>
    <code>.nth-[odd]:bg-indigo-50 — every odd item</code>
  </section>

  <section>
    <h3>starting — entry animation (no JS)</h3>
    <div class="starting-demo">
      <div class="entry-box">Animates in on load</div>
    </div>
    <code>@starting-style { opacity: 0; translate: 0 20px }</code>
  </section>

</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.demo { display: flex; flex-direction: column; gap: 20px; }
section { display: flex; flex-direction: column; gap: 8px; }
h3 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #6b7280; margin: 0; }
code { font-size: 11px; color: #6b7280; }

.btn-row { display: flex; gap: 8px; }
.btn { padding: 8px 16px; border-radius: 8px; border: none; font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .2s; }
.active-btn { background: #6366f1; color: white; opacity: 0.6; }
.active-btn:hover { opacity: 1; }
.inactive-btn { background: #f3f4f6; color: #6b7280; opacity: 0.6; }
.inactive-btn:hover { opacity: 1; }

.nth-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.nth-list li { padding: 6px 10px; font-size: 13px; border-radius: 6px; }
.nth-list li:nth-child(odd) { background: #eef2ff; color: #4338ca; font-weight: 600; }

.entry-box {
  background: #6366f1; color: white; padding: 12px 18px;
  border-radius: 8px; font-weight: 600; font-size: 13px;
  opacity: 1; translate: 0 0;
  transition: opacity .4s ease, translate .4s ease;
}
@starting-style {
  .entry-box { opacity: 0; translate: 0 20px; }
}`,
      },
      {
        id: 'v4-composing',
        title: 'Variant composing & field sizing',
        concept: `Two smaller but practical v4 features:\n\n**Composing variants** — \`@variant\` lets you create named combinations: \`@variant hocus { &:hover, &:focus { @slot; } }\`. Use it like any built-in modifier: \`hocus:bg-blue-600\`.\n\n**\`field-sizing: content\`** — a new CSS property (surfaced via Tailwind v4's \`field-sizing-content\` class) makes textareas auto-resize to fit their content with no JavaScript.`,
        html: `<div class="demo">

  <section>
    <h3>field-sizing-content — auto-resize textarea</h3>
    <textarea class="auto-textarea" placeholder="Type here — the textarea grows with content…" rows="2"></textarea>
    <code>field-sizing: content — no JS resize listener needed</code>
  </section>

  <section>
    <h3>Logical properties (v4 default)</h3>
    <div class="logical-demo">
      <div class="box">ms-4 me-2 ps-6 pe-4</div>
    </div>
    <p class="note">
      v4 uses logical properties by default: <code>ms-</code> / <code>me-</code> instead of
      <code>ml-</code> / <code>mr-</code>. These automatically flip for RTL layouts.
    </p>
  </section>

  <section>
    <h3>inert variant</h3>
    <div class="panel" inert>
      <button style="padding:8px 14px;background:#6366f1;color:white;border:none;border-radius:6px">
        Button inside inert panel
      </button>
    </div>
    <code>.inert:opacity-50 .inert:pointer-events-none — applied to inert children</code>
  </section>

</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.demo { display: flex; flex-direction: column; gap: 20px; }
section { display: flex; flex-direction: column; gap: 8px; }
h3 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #6b7280; margin: 0; }
code { font-size: 11px; color: #6b7280; }
.note { font-size: 12px; color: #6b7280; margin: 0; }

.auto-textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13px;
  resize: none;
  field-sizing: content;
  min-height: 2.5em;
}

.box {
  display: inline-block;
  background: #eef2ff;
  color: #4338ca;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-inline-start: 1rem;
  margin-inline-end: 0.5rem;
  padding-inline-start: 1.5rem;
  padding-inline-end: 1rem;
}

.panel[inert] {
  opacity: 0.4;
  pointer-events: none;
  user-select: none;
  padding: 12px;
  background: #f3f4f6;
  border-radius: 8px;
}`,
      },
    ],
  },
];
