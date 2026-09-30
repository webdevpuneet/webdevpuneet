export const CHAPTERS = [
  'Getting Started',
  'Selectors',
  'Events',
  'Hide & Show',
  'Fading',
  'Sliding',
  'Animation',
  'Chaining',
  'DOM Get & Set',
  'DOM Add & Remove',
  'CSS Manipulation',
  'Traversing',
  'AJAX',
  'Utilities',
  'Deferred & Promises',
  'Plugin Basics',
];

export const LESSONS = [

  // ── Chapter 1: Getting Started ───────────────────────────────────────────────
  {
    id: 'jq-hello',
    chapter: 'Getting Started',
    title: 'Hello jQuery',
    concept: '**jQuery** is a fast, lightweight JavaScript library that simplifies HTML DOM manipulation, event handling, animations, and AJAX. It is included via a `<script>` tag — no build tools needed. The `$` symbol is jQuery\'s global function and namespace. Almost everything you do with jQuery starts with `$()`.',
    challenge: {
      question: 'What does the $ symbol represent in jQuery?',
      options: ['A CSS class selector', 'jQuery\'s main function', 'A JavaScript variable', 'An HTML attribute'],
      correct: 1,
    },
    code: `<h2 id="title">Hello World</h2>
<p id="msg">jQuery is ready — click the button!</p>
<button id="btn">Run jQuery</button>

<script>
$(document).ready(function() {
  $('#btn').click(function() {
    $('#title').text('Hello, jQuery! 🎉');
    $('#msg').css('color', '#0769ad');
  });
});
</script>`,
  },

  {
    id: 'jq-ready',
    chapter: 'Getting Started',
    title: '$(document).ready()',
    concept: 'jQuery code should run only after the DOM is fully loaded. `$(document).ready(function(){})` guarantees this. The short form `$(function(){})` is identical and preferred. Never place jQuery code directly in `<script>` tags at the top of the page without `ready()` — the elements you want to select may not exist yet.',
    challenge: {
      question: 'What is the shorthand for $(document).ready(function(){})?',
      options: ['$(init, function(){})', '$(function(){})', '$.ready(function(){})', 'jQuery.start(function(){})'],
      correct: 1,
    },
    code: `<p id="status">Waiting...</p>
<p id="short">Waiting...</p>

<script>
// Long form
$(document).ready(function() {
  $('#status').text('Long form ready fired ✓')
              .css('color', '#059669');
});

// Short form — identical behavior
$(function() {
  $('#short').text('Short form ready fired ✓')
             .css('color', '#0769ad');
});
</script>`,
  },

  {
    id: 'jq-syntax',
    chapter: 'Getting Started',
    title: 'jQuery Syntax',
    concept: 'The jQuery syntax pattern is `$(selector).action()`. The selector targets HTML elements — same as CSS selectors. The action is a jQuery method. You can chain multiple actions: `$(selector).action1().action2()`. jQuery methods return the jQuery object so you can keep chaining.',
    code: `<p class="item">First item</p>
<p class="item">Second item</p>
<p class="item">Third item</p>
<button id="btn">Apply jQuery</button>

<script>
$(function() {
  // $(selector).action() pattern
  // Selector: all .item elements
  // Actions: hide, then show with fade
  $('#btn').click(function() {
    $('.item')        // select all .item paragraphs
      .css('background', '#dbeafe')   // action 1
      .css('padding', '8px 12px')     // action 2
      .css('border-radius', '6px')    // action 3
      .css('margin', '4px 0');        // action 4
  });
});
</script>`,
  },

  // ── Chapter 2: Selectors ─────────────────────────────────────────────────────
  {
    id: 'jq-sel-element',
    chapter: 'Selectors',
    title: 'Element Selector',
    concept: 'The **element selector** targets all elements of a given tag name: `$("p")` selects every `<p>`, `$("h2")` every `<h2>`. It works exactly like CSS element selectors. If multiple elements match, jQuery acts on all of them at once.',
    challenge: {
      question: 'What does $("p") select?',
      options: ['The first <p> only', 'All <p> elements', 'A <p> with id="p"', 'Nothing — invalid syntax'],
      correct: 1,
    },
    code: `<h3>Fruits</h3>
<p>Apple</p>
<p>Banana</p>
<p>Cherry</p>
<button id="btn">Highlight all &lt;p&gt;</button>

<script>
$(function() {
  $('#btn').click(function() {
    // Selects ALL <p> elements on the page
    $('p').css({
      background: '#dbeafe',
      padding: '6px 10px',
      borderRadius: '4px',
      marginBottom: '4px'
    });
  });
});
</script>`,
  },

  {
    id: 'jq-sel-id',
    chapter: 'Selectors',
    title: 'ID Selector',
    concept: 'The **ID selector** `$("#myId")` targets the single element with that `id` attribute. IDs must be unique per page. The `#` prefix matches CSS id selectors. If you need one specific element, the ID selector is the most precise and fastest.',
    challenge: {
      question: 'How do you select an element with id="header" in jQuery?',
      options: ['$(".header")', '$("header")', '$("#header")', '$("[id=header]")'],
      correct: 2,
    },
    code: `<div id="box1">Box 1 — I have id="box1"</div>
<div id="box2">Box 2 — I have id="box2"</div>
<div id="box3">Box 3 — I have id="box3"</div>
<br>
<button id="b1">Select #box1</button>
<button id="b2">Select #box2</button>
<button id="b3">Select #box3</button>

<script>
$(function() {
  function highlight(id, color) {
    $('div').css('background', '');  // reset all
    $('#' + id).css({ background: color, padding: '8px', borderRadius: '4px' });
  }
  $('#b1').click(function() { highlight('box1', '#fde68a'); });
  $('#b2').click(function() { highlight('box2', '#a7f3d0'); });
  $('#b3').click(function() { highlight('box3', '#bfdbfe'); });
});
</script>`,
  },

  {
    id: 'jq-sel-class',
    chapter: 'Selectors',
    title: 'Class Selector',
    concept: 'The **class selector** `$(".myClass")` targets all elements with that CSS class. An element can have multiple classes, and jQuery will match any element that has the specified class among its classes. The `.` prefix matches CSS class selectors.',
    code: `<p class="highlight">This has class "highlight"</p>
<p>This has no class</p>
<p class="highlight">This also has class "highlight"</p>
<p class="other">This has class "other"</p>
<button id="btn">Select .highlight</button>

<script>
$(function() {
  $('#btn').click(function() {
    // Only elements with class="highlight" are affected
    $('.highlight').css({
      background: '#fef9c3',
      border: '2px solid #eab308',
      padding: '6px 10px',
      borderRadius: '4px'
    });
  });
});
</script>`,
  },

  {
    id: 'jq-sel-attribute',
    chapter: 'Selectors',
    title: 'Attribute Selectors',
    concept: 'jQuery supports CSS attribute selectors: `$("[attr]")` selects elements that have the attribute, `$("[attr=\'val\']")` matches exact value, `$("[attr^=\'val\']")` starts-with, `$("[attr$=\'val\']")` ends-with, `$("[attr*=\'val\']")` contains. These are useful for selecting inputs by type or links by href pattern.',
    code: `<input type="text" placeholder="Text input">
<input type="password" placeholder="Password">
<input type="email" placeholder="Email">
<input type="checkbox"> Remember me
<br><br>
<a href="https://jquery.com">jQuery.com</a><br>
<a href="/local-page">Local link</a><br>
<button id="btn1">Highlight text inputs</button>
<button id="btn2">Highlight external links</button>

<script>
$(function() {
  $('#btn1').click(function() {
    $('[type="text"]').css({ border: '2px solid #0769ad', borderRadius: '4px' });
  });
  $('#btn2').click(function() {
    // href starts with "https"
    $('[href^="https"]').css({ color: '#dc2626', fontWeight: 'bold' });
  });
});
</script>`,
  },

  {
    id: 'jq-sel-filter',
    chapter: 'Selectors',
    title: 'Multiple & Filtering Selectors',
    concept: 'Combine selectors with a comma: `$("h1, p, .note")` selects all three. Filter selectors narrow a set: `:first`, `:last`, `:even`, `:odd` (0-indexed), `:eq(n)` (nth), `:lt(n)` (less than n), `:gt(n)` (greater than n). These are jQuery-specific — not standard CSS.',
    code: `<ul>
  <li>Item 0 (even)</li>
  <li>Item 1 (odd)</li>
  <li>Item 2 (even)</li>
  <li>Item 3 (odd)</li>
  <li>Item 4 (even)</li>
</ul>
<button id="b1">Stripe even rows</button>
<button id="b2">Highlight first &amp; last</button>
<button id="b3">Select li:eq(2)</button>

<script>
$(function() {
  $('#b1').click(function() {
    $('li').css('background', '');
    $('li:even').css('background', '#e0f2fe');
    $('li:odd').css('background', '#fef9c3');
  });
  $('#b2').click(function() {
    $('li').css('background', '');
    $('li:first').css('background', '#a7f3d0');
    $('li:last').css('background', '#fca5a5');
  });
  $('#b3').click(function() {
    $('li').css('background', '');
    $('li:eq(2)').css({ background: '#c4b5fd', fontWeight: 'bold' });
  });
});
</script>`,
  },

  // ── Chapter 3: Events ────────────────────────────────────────────────────────
  {
    id: 'jq-ev-click',
    chapter: 'Events',
    title: 'click() and dblclick()',
    concept: '`click(handler)` fires when an element is clicked once. `dblclick(handler)` fires on a double-click. The handler receives an `event` object. You can call `event.preventDefault()` to stop the default browser action (like following a link). Use `$(this)` inside a handler to refer to the clicked element.',
    challenge: {
      question: 'What does $(this) refer to inside a click handler?',
      options: ['The document', 'The window', 'The element that was clicked', 'The jQuery object'],
      correct: 2,
    },
    code: `<button id="click-btn">Click me</button>
<button id="dbl-btn">Double-click me</button>
<p id="result">No clicks yet.</p>
<p id="count">Click count: 0</p>

<script>
$(function() {
  var clicks = 0;

  $('#click-btn').click(function() {
    clicks++;
    $('#count').text('Click count: ' + clicks);
    $(this).css('background', '#a7f3d0');
  });

  $('#dbl-btn').dblclick(function() {
    $('#result').text('Double-clicked! 🎉')
                .css('color', '#dc2626');
  });
});
</script>`,
  },

  {
    id: 'jq-ev-mouse',
    chapter: 'Events',
    title: 'Mouse Events',
    concept: '`mouseenter()` fires when the mouse pointer enters an element (does not bubble). `mouseleave()` fires when it leaves. `hover(enterFn, leaveFn)` is a convenient shorthand that binds both. `mousemove(fn)` fires continuously as the mouse moves over an element.',
    code: `<div id="box" style="width:200px;height:100px;background:#e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:600;cursor:pointer;">
  Hover over me
</div>
<p id="status">Status: idle</p>

<script>
$(function() {
  $('#box').hover(
    function() {
      // mouseenter
      $(this).css('background', '#bfdbfe');
      $('#status').text('Status: mouse entered');
    },
    function() {
      // mouseleave
      $(this).css('background', '#e2e8f0');
      $('#status').text('Status: mouse left');
    }
  );

  $('#box').mousemove(function(e) {
    $('#status').text('Mouse at: x=' + e.offsetX + ', y=' + e.offsetY);
  });
});
</script>`,
  },

  {
    id: 'jq-ev-keyboard',
    chapter: 'Events',
    title: 'Keyboard Events',
    concept: '`keydown(fn)` fires when a key is pressed down (fires repeatedly if held). `keyup(fn)` fires when the key is released. `keypress(fn)` is similar to keydown but only for printable characters (deprecated in modern browsers — prefer `keydown`). The event object has `e.key` (key name) and `e.which` (key code).',
    code: `<input id="inp" type="text" placeholder="Type something..." style="width:100%;padding:8px;font-size:14px;">
<p id="key-info">Key info appears here.</p>
<p id="live">Live value: </p>

<script>
$(function() {
  $('#inp').keydown(function(e) {
    $('#key-info').text(
      'keydown: key="' + e.key + '" code=' + e.which
    );
  });

  $('#inp').keyup(function() {
    $('#live').text('Live value: ' + $(this).val());
  });
});
</script>`,
  },

  {
    id: 'jq-ev-form',
    chapter: 'Events',
    title: 'Form Events',
    concept: '`focus(fn)` fires when an input gains focus (clicked or tabbed into). `blur(fn)` fires when it loses focus. `change(fn)` fires when the value changes and the element loses focus (or immediately for checkboxes/selects). `submit(fn)` on a `<form>` fires on form submission — call `e.preventDefault()` to stop the page reload.',
    code: `<form id="myForm">
  <input id="name" type="text" placeholder="Your name" style="display:block;width:100%;padding:7px;margin-bottom:8px;">
  <select id="color" style="display:block;width:100%;padding:7px;margin-bottom:8px;">
    <option value="">Choose a color</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="red">Red</option>
  </select>
  <button type="submit">Submit</button>
</form>
<p id="output">Output appears here.</p>

<script>
$(function() {
  $('#name')
    .focus(function() { $(this).css('border', '2px solid #0769ad'); })
    .blur(function()  { $(this).css('border', ''); });

  $('#color').change(function() {
    $('#output').text('Color changed to: ' + $(this).val());
  });

  $('#myForm').submit(function(e) {
    e.preventDefault();  // stop page reload
    $('#output').text('Submitted! Name: ' + $('#name').val());
  });
});
</script>`,
  },

  {
    id: 'jq-ev-on',
    chapter: 'Events',
    title: 'on() Method',
    concept: '`on(event, handler)` is the universal event binding method. It supports multiple events in one call: `on("click dblclick", fn)`. For **event delegation**, pass a selector as the second argument: `$(parent).on("click", ".child", fn)` — this handles events even for elements added to the DOM after the listener was attached.',
    challenge: {
      question: 'Which on() pattern handles events for dynamically added elements?',
      options: ['$(".btn").on("click", fn)', '$(document).on("click", ".btn", fn)', '$(".btn").click(fn)', 'Both A and C'],
      correct: 1,
    },
    code: `<div id="container">
  <button class="item-btn">Button 1 (original)</button>
</div>
<button id="add">Add new button</button>
<p id="log">Click a button to see output.</p>

<script>
$(function() {
  var count = 2;

  // Event delegation: handles clicks on .item-btn
  // even for buttons added later
  $('#container').on('click', '.item-btn', function() {
    $('#log').text('Clicked: ' + $(this).text());
  });

  $('#add').click(function() {
    $('#container').append(
      '<button class="item-btn" style="margin:4px;">Button ' + count++ + ' (added)</button>'
    );
  });
});
</script>`,
  },

  {
    id: 'jq-ev-off',
    chapter: 'Events',
    title: 'off() — Remove Handlers',
    concept: '`off()` removes event handlers added with `on()`. `off("click")` removes all click handlers from matched elements. `off("click", namedFn)` removes only that specific function — you need a **named** function (not anonymous) to target it precisely. `off()` with no arguments strips every handler from the element.',
    code: `<button id="btn">Click me (events attached)</button>
<button id="detach-click">off("click")</button>
<button id="detach-all">off() — remove all</button>
<p id="log">No events yet.</p>
<p id="count">Click count: 0</p>

<script>
$(function() {
  var clicks = 0;

  function handleClick() {
    clicks++;
    $('#count').text('Click count: ' + clicks);
    $(this).css('background', '#a7f3d0');
  }

  function handleMouseenter() {
    $('#log').text('Mouse entered!');
  }

  $('#btn').on('click', handleClick);
  $('#btn').on('mouseenter', handleMouseenter);

  $('#detach-click').click(function() {
    $('#btn').off('click', handleClick);
    $('#log').text('click handler removed — hover still works');
  });

  $('#detach-all').click(function() {
    $('#btn').off();
    $('#log').text('ALL handlers removed from #btn');
  });
});
</script>`,
  },

  {
    id: 'jq-ev-one',
    chapter: 'Events',
    title: 'one() — Fire Once',
    concept: '`one(event, handler)` binds a handler that fires **exactly once** — jQuery removes it automatically after the first trigger. Useful for one-time initializations, first-visit tooltips, or confirm dialogs that must only appear once per session.',
    code: `<button id="once-btn">Click me (fires once only)</button>
<button id="normal-btn">Normal click (fires every time)</button>
<p id="once-log">Once handler: not fired yet</p>
<p id="normal-log">Normal handler: 0 clicks</p>

<script>
$(function() {
  var normalClicks = 0;

  // Handler fires only the first time — auto-removed after
  $('#once-btn').one('click', function() {
    $('#once-log').text('Once handler fired! (will not fire again)');
    $(this).text('Already clicked').prop('disabled', true);
  });

  $('#normal-btn').on('click', function() {
    normalClicks++;
    $('#normal-log').text('Normal handler: ' + normalClicks + ' clicks');
  });
});
</script>`,
  },

  {
    id: 'jq-ev-trigger',
    chapter: 'Events',
    title: 'trigger() and triggerHandler()',
    concept: '`trigger("event")` programmatically fires an event — as if the user performed it. It also bubbles up the DOM. `triggerHandler("event")` fires only the jQuery handler: it does **not** trigger the browser\'s default action (like form submit) and does **not** bubble. Pass extra data: `trigger("click", [arg1, arg2])`.',
    challenge: {
      question: 'What is the key difference between trigger() and triggerHandler()?',
      options: [
        'trigger() is faster',
        'triggerHandler() does not bubble and skips browser default actions',
        'triggerHandler() works on all elements',
        'They are identical',
      ],
      correct: 1,
    },
    code: `<input id="inp" type="text" placeholder="Focus triggered programmatically">
<br><br>
<button id="focus-btn">trigger("focus") on input</button>
<button id="click-target">I receive programmatic clicks</button>
<div id="log" style="margin-top:10px;font-size:13px;"></div>

<script>
$(function() {
  function addLog(msg) {
    $('#log').append('<div>' + msg + '</div>');
  }

  $('#inp').on('focus', function() { addLog('→ Input focus event fired'); });

  $('#click-target').on('click', function() {
    addLog('→ Button click fired (real or triggered)');
  });

  $('#focus-btn').click(function() {
    $('#inp').trigger('focus');
  });

  // Auto-trigger the button after 1.5s
  setTimeout(function() {
    addLog('--- auto-triggering button after 1.5s ---');
    $('#click-target').trigger('click');
  }, 1500);
});
</script>`,
  },

  {
    id: 'jq-ev-namespace',
    chapter: 'Events',
    title: 'Event Namespacing',
    concept: 'Event namespaces label handlers so they can be removed selectively: `on("click.myPlugin", fn)`. Remove with `off("click.myPlugin")` — only that namespace\'s click handler is removed; other click handlers remain. Essential for plugin authors so plugin handlers can be cleaned up without touching user-defined handlers.',
    code: `<div id="box" style="width:220px;height:60px;background:#dbeafe;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:600;">
  Click this box
</div>
<br>
<button id="remove-a">off("click.a")</button>
<button id="remove-b">off("click.b")</button>
<button id="remove-all">off("click") — all</button>
<div id="log" style="margin-top:10px;font-size:13px;"></div>

<script>
$(function() {
  $('#box').on('click.a', function() {
    $('#log').append('<div style="color:#0769ad">Handler A fired (namespace .a)</div>');
  });

  $('#box').on('click.b', function() {
    $('#log').append('<div style="color:#dc2626">Handler B fired (namespace .b)</div>');
  });

  $('#remove-a').click(function() {
    $('#box').off('click.a');
    $('#log').append('<div style="color:#64748b">--- Removed .a (B still fires) ---</div>');
  });

  $('#remove-b').click(function() {
    $('#box').off('click.b');
    $('#log').append('<div style="color:#64748b">--- Removed .b (A still fires) ---</div>');
  });

  $('#remove-all').click(function() {
    $('#box').off('click');
    $('#log').append('<div style="color:#64748b">--- Removed ALL click handlers ---</div>');
  });
});
</script>`,
  },

  // ── Chapter 4: Hide & Show ───────────────────────────────────────────────────
  {
    id: 'jq-hide-show',
    chapter: 'Hide & Show',
    title: 'hide() and show()',
    concept: '`hide()` sets `display:none` on the element. `show()` restores it. Both accept an optional speed parameter (`"slow"`, `"fast"`, or milliseconds) which adds an animation. Without a speed, it is instant. These affect layout — a hidden element takes up no space.',
    challenge: {
      question: 'What CSS property does jQuery\'s hide() actually set?',
      options: ['visibility: hidden', 'opacity: 0', 'display: none', 'z-index: -1'],
      correct: 2,
    },
    code: `<div id="panel" style="background:#dbeafe;padding:20px;border-radius:8px;margin-bottom:12px;">
  This panel can be hidden and shown.
</div>
<button id="hide-btn">hide()</button>
<button id="show-btn">show()</button>
<button id="hide-slow">hide("slow")</button>
<button id="show-fast">show("fast")</button>

<script>
$(function() {
  $('#hide-btn').click(function()  { $('#panel').hide(); });
  $('#show-btn').click(function()  { $('#panel').show(); });
  $('#hide-slow').click(function() { $('#panel').hide('slow'); });
  $('#show-fast').click(function() { $('#panel').show('fast'); });
});
</script>`,
  },

  {
    id: 'jq-toggle',
    chapter: 'Hide & Show',
    title: 'toggle()',
    concept: '`toggle()` switches between `hide()` and `show()` — it hides visible elements and shows hidden ones. This is perfect for collapsible panels. Like hide/show, it accepts speed and callback parameters.',
    code: `<button id="toggle-btn">Toggle panel</button>
<div id="panel" style="background:#e0f2fe;padding:20px;border-radius:8px;margin-top:12px;">
  <h3 style="margin:0 0 8px;">Collapsible Panel</h3>
  <p style="margin:0;">Click the button to show and hide me.</p>
</div>
<p id="state">Panel is: visible</p>

<script>
$(function() {
  $('#toggle-btn').click(function() {
    $('#panel').toggle('slow', function() {
      var visible = $(this).is(':visible');
      $('#state').text('Panel is: ' + (visible ? 'visible' : 'hidden'));
    });
  });
});
</script>`,
  },

  {
    id: 'jq-hide-callback',
    chapter: 'Hide & Show',
    title: 'Speed & Callback',
    concept: 'All hide/show methods accept `(speed, callback)`. Speed can be `"slow"` (600ms), `"fast"` (200ms), or a number in milliseconds. The **callback** function runs after the animation completes — useful for chaining actions that depend on the animation finishing.',
    code: `<div id="box" style="width:120px;height:120px;background:#818cf8;border-radius:8px;"></div>
<br>
<button id="hide-btn">Hide (1000ms)</button>
<button id="show-btn">Show (500ms)</button>
<p id="status">Status: visible</p>

<script>
$(function() {
  $('#hide-btn').click(function() {
    $('#status').text('Status: hiding...');
    $('#box').hide(1000, function() {
      // callback runs after animation finishes
      $('#status').text('Status: hidden ✓');
    });
  });

  $('#show-btn').click(function() {
    $('#status').text('Status: showing...');
    $('#box').show(500, function() {
      $('#status').text('Status: visible ✓');
    });
  });
});
</script>`,
  },

  // ── Chapter 5: Fading ────────────────────────────────────────────────────────
  {
    id: 'jq-fadein-out',
    chapter: 'Fading',
    title: 'fadeIn() and fadeOut()',
    concept: '`fadeIn(speed)` animates opacity from 0 to 1 and also changes `display` from `none` to its original value. `fadeOut(speed)` animates opacity from 1 to 0 then sets `display:none`. Both accept speed and callback. The element must be hidden (`display:none`) for `fadeIn()` to work.',
    code: `<div id="box" style="display:none;width:160px;height:80px;background:#34d399;border-radius:8px;line-height:80px;text-align:center;color:#fff;font-weight:bold;">
  Fading box
</div>
<br>
<button id="in">fadeIn()</button>
<button id="out">fadeOut()</button>
<button id="in-slow">fadeIn("slow")</button>
<button id="out-fast">fadeOut(300)</button>

<script>
$(function() {
  $('#in').click(function()      { $('#box').fadeIn(); });
  $('#out').click(function()     { $('#box').fadeOut(); });
  $('#in-slow').click(function() { $('#box').fadeIn('slow'); });
  $('#out-fast').click(function(){ $('#box').fadeOut(300); });
});
</script>`,
  },

  {
    id: 'jq-fadetoggle',
    chapter: 'Fading',
    title: 'fadeToggle()',
    concept: '`fadeToggle(speed)` switches between `fadeIn()` and `fadeOut()` based on the current visibility state. If the element is visible, it fades out. If hidden, it fades in. More elegant than a manual if/else visibility check.',
    code: `<div id="box" style="width:160px;height:80px;background:#f472b6;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;">
  Toggle me!
</div>
<br>
<button id="toggle-btn">fadeToggle("slow")</button>
<p id="status">Status: visible</p>

<script>
$(function() {
  $('#toggle-btn').click(function() {
    $('#box').fadeToggle('slow', function() {
      $('#status').text('Status: ' + ($(this).is(':visible') ? 'visible' : 'hidden'));
    });
  });
});
</script>`,
  },

  {
    id: 'jq-fadeto',
    chapter: 'Fading',
    title: 'fadeTo()',
    concept: '`fadeTo(speed, opacity)` fades to a **specific opacity** value between 0.0 and 1.0. Unlike `fadeOut()`, it does not set `display:none` even at opacity 0 — the element still occupies space. Useful for dimming elements without fully hiding them.',
    code: `<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <div class="card" style="background:#60a5fa;padding:16px;border-radius:8px;color:#fff;">Card A</div>
  <div class="card" style="background:#34d399;padding:16px;border-radius:8px;color:#fff;">Card B</div>
  <div class="card" style="background:#f472b6;padding:16px;border-radius:8px;color:#fff;">Card C</div>
</div>
<br>
<button id="dim">Dim to 25%</button>
<button id="half">Fade to 50%</button>
<button id="full">Restore to 100%</button>

<script>
$(function() {
  $('#dim').click(function()  { $('.card').fadeTo('slow', 0.25); });
  $('#half').click(function() { $('.card').fadeTo(400, 0.5); });
  $('#full').click(function() { $('.card').fadeTo('fast', 1); });
});
</script>`,
  },

  // ── Chapter 6: Sliding ───────────────────────────────────────────────────────
  {
    id: 'jq-slide-updown',
    chapter: 'Sliding',
    title: 'slideDown() and slideUp()',
    concept: '`slideDown(speed)` reveals a hidden element with a downward slide animation (expanding height). `slideUp(speed)` hides a visible element by collapsing its height to zero. These look natural for accordion and menu animations.',
    code: `<button id="down-btn">slideDown()</button>
<button id="up-btn">slideUp()</button>
<div id="panel" style="display:none;background:#dbeafe;padding:20px;border-radius:8px;margin-top:10px;">
  <p><strong>Slide panel content</strong></p>
  <p>This panel slides down to reveal and slides up to hide.</p>
</div>

<script>
$(function() {
  $('#down-btn').click(function() {
    $('#panel').slideDown('slow');
  });
  $('#up-btn').click(function() {
    $('#panel').slideUp(400);
  });
});
</script>`,
  },

  {
    id: 'jq-slidetoggle',
    chapter: 'Sliding',
    title: 'slideToggle()',
    concept: '`slideToggle(speed)` toggles between `slideDown()` and `slideUp()`. It is the standard jQuery method for accordion-style show/hide. The speed argument is optional; the default is 400ms.',
    code: `<style>
.accordion-header {
  background: #0769ad; color: #fff; padding: 12px 16px;
  border-radius: 6px; cursor: pointer; margin-bottom: 4px;
  user-select: none;
}
.accordion-body {
  display: none; background: #dbeafe; padding: 16px;
  border-radius: 0 0 6px 6px; margin-bottom: 8px;
}
</style>

<div class="accordion-header">Section 1 — click to open</div>
<div class="accordion-body"><p>Content for section 1. jQuery makes accordions easy!</p></div>

<div class="accordion-header">Section 2 — click to open</div>
<div class="accordion-body"><p>Content for section 2. Use slideToggle for smooth animation.</p></div>

<script>
$(function() {
  $('.accordion-header').click(function() {
    $(this).next('.accordion-body').slideToggle(300);
  });
});
</script>`,
  },

  {
    id: 'jq-slide-speed',
    chapter: 'Sliding',
    title: 'Slide Speed & Easing',
    concept: 'All slide methods accept a speed as `"slow"` (600ms), `"fast"` (200ms), or an integer in milliseconds. jQuery\'s built-in easing is `"swing"` (accelerate then decelerate). You can also pass `"linear"` for constant speed. The callback function runs after the slide animation finishes.',
    code: `<div id="panel" style="background:#fef9c3;padding:20px;border-radius:8px;">
  Watch the different speed animations.
</div>
<br>
<button id="b1">slideUp("fast")</button>
<button id="b2">slideDown("slow")</button>
<button id="b3">slideToggle(1500)</button>
<p id="status"></p>

<script>
$(function() {
  $('#b1').click(function() {
    $('#panel').slideUp('fast', function() {
      $('#status').text('Slide up complete! ✓');
    });
  });
  $('#b2').click(function() {
    $('#panel').slideDown('slow', function() {
      $('#status').text('Slide down complete! ✓');
    });
  });
  $('#b3').click(function() {
    $('#status').text('Animating...');
    $('#panel').slideToggle(1500, function() {
      $('#status').text('Toggle complete! ✓');
    });
  });
});
</script>`,
  },

  // ── Chapter 7: Animation ─────────────────────────────────────────────────────
  {
    id: 'jq-animate-basic',
    chapter: 'Animation',
    title: 'animate() Basics',
    concept: '`animate(properties, speed, callback)` animates CSS numeric properties. Pass an object of CSS properties and their target values. Only numeric CSS properties can be animated (width, height, opacity, margin, padding, fontSize, etc.). Color animation requires the jQuery UI library.',
    challenge: {
      question: 'Which CSS property CANNOT be animated with jQuery\'s animate() alone?',
      options: ['opacity', 'width', 'background-color', 'margin-left'],
      correct: 2,
    },
    code: `<div id="box" style="width:80px;height:80px;background:#818cf8;border-radius:8px;"></div>
<br>
<button id="animate-btn">Animate</button>
<button id="reset-btn">Reset</button>

<script>
$(function() {
  $('#animate-btn').click(function() {
    $('#box').animate({
      width: '200px',
      height: '120px',
      opacity: 0.5
    }, 1000);
  });

  $('#reset-btn').click(function() {
    $('#box').animate({
      width: '80px',
      height: '80px',
      opacity: 1
    }, 600);
  });
});
</script>`,
  },

  {
    id: 'jq-animate-multi',
    chapter: 'Animation',
    title: 'Animate Multiple Properties',
    concept: 'You can animate multiple CSS properties simultaneously in one `animate()` call. Use **relative values** with `"+="` or `"-="` to animate relative to the current value rather than setting an absolute target.',
    code: `<div id="ball" style="width:60px;height:60px;background:#f472b6;border-radius:50%;position:relative;left:0;"></div>
<br>
<button id="right">Move Right</button>
<button id="left">Move Left</button>
<button id="grow">Grow</button>
<button id="shrink">Shrink</button>

<script>
$(function() {
  $('#right').click(function() {
    // relative value: move 100px to the right of current position
    $('#ball').animate({ left: '+=100px' }, 400);
  });
  $('#left').click(function() {
    $('#ball').animate({ left: '-=100px' }, 400);
  });
  $('#grow').click(function() {
    $('#ball').animate({ width: '+=20px', height: '+=20px' }, 300);
  });
  $('#shrink').click(function() {
    $('#ball').animate({ width: '-=20px', height: '-=20px' }, 300);
  });
});
</script>`,
  },

  {
    id: 'jq-animate-queue',
    chapter: 'Animation',
    title: 'Animation Queue',
    concept: 'Multiple `animate()` calls on the same element are added to a **queue** and execute in sequence — each starts after the previous one completes. This lets you chain complex animation sequences without callbacks. Call `clearQueue()` to empty the queue.',
    code: `<div id="box" style="width:80px;height:80px;background:#34d399;border-radius:8px;position:relative;left:0;top:0;"></div>
<br>
<button id="run">Run sequence</button>
<button id="clear">Clear queue</button>

<script>
$(function() {
  $('#run').click(function() {
    $('#box')
      .animate({ left: '200px' }, 600)      // step 1
      .animate({ top: '80px' }, 400)         // step 2
      .animate({ opacity: 0.4 }, 300)        // step 3
      .animate({ left: '0', top: '0' }, 500) // step 4
      .animate({ opacity: 1 }, 300);         // step 5
  });

  $('#clear').click(function() {
    $('#box').clearQueue().stop();
  });
});
</script>`,
  },

  {
    id: 'jq-stop',
    chapter: 'Animation',
    title: 'stop()',
    concept: '`stop()` stops the currently running animation on an element. `stop(true)` clears the queue too. `stop(true, true)` also jumps to the animation\'s end state. Always call `stop()` before starting a new animation on hover to prevent animation queuing up from rapid mouse movements.',
    code: `<div id="box" style="width:60px;height:60px;background:#fb923c;border-radius:8px;opacity:1;"></div>
<br>
<button id="start">Start animating</button>
<button id="stop1">stop()</button>
<button id="stop2">stop(true)</button>
<button id="stop3">stop(true, true)</button>

<script>
$(function() {
  $('#start').click(function() {
    $('#box')
      .animate({ width: '220px' }, 2000)
      .animate({ height: '120px' }, 1000)
      .animate({ opacity: 0.2 }, 800);
  });

  // Stop current step, keep queue
  $('#stop1').click(function() { $('#box').stop(); });
  // Stop and clear queue
  $('#stop2').click(function() { $('#box').stop(true); });
  // Stop, clear queue, jump to end of current step
  $('#stop3').click(function() { $('#box').stop(true, true); });
});
</script>`,
  },

  // ── Chapter 8: Chaining ──────────────────────────────────────────────────────
  {
    id: 'jq-chaining',
    chapter: 'Chaining',
    title: 'Method Chaining',
    concept: 'jQuery methods return the jQuery object, so you can **chain** multiple methods on the same selection in one statement: `$("p").addClass("big").css("color","blue").slideUp(500).slideDown(500)`. Chaining reduces code and avoids repeated DOM lookups. Each method runs in order.',
    code: `<div id="box" style="width:100px;height:100px;background:#a78bfa;border-radius:8px;"></div>
<br>
<button id="chain-btn">Run chain</button>
<button id="reset-btn">Reset</button>

<script>
$(function() {
  $('#chain-btn').click(function() {
    // All on ONE jQuery selection — no need to write $('#box') each time
    $('#box')
      .css('border-radius', '50%')           // become circle
      .animate({ width: '160px', height: '160px' }, 400)
      .css('background', '#f472b6')
      .animate({ opacity: 0.5 }, 300)
      .fadeIn(200)
      .animate({ opacity: 1 }, 300);
  });

  $('#reset-btn').click(function() {
    $('#box').stop(true).css({
      width: '100px', height: '100px',
      background: '#a78bfa', borderRadius: '8px', opacity: 1
    });
  });
});
</script>`,
  },

  // ── Chapter 9: DOM Get & Set ─────────────────────────────────────────────────
  {
    id: 'jq-text-html',
    chapter: 'DOM Get & Set',
    title: 'text() and html()',
    concept: '`text()` with no argument **gets** the combined text content of an element (HTML stripped). `text("value")` **sets** it (HTML is escaped). `html()` gets the inner HTML including tags. `html("value")` sets it allowing real HTML tags. Use `text()` for safe user content, `html()` when you need to inject markup.',
    challenge: {
      question: 'What is the difference between text() and html()?',
      options: [
        'text() is faster than html()',
        'text() escapes HTML; html() renders it as markup',
        'html() only works on div elements',
        'They are identical',
      ],
      correct: 1,
    },
    code: `<div id="demo">
  <p>Original <strong>content</strong> here.</p>
</div>
<br>
<button id="get-text">Get text()</button>
<button id="get-html">Get html()</button>
<button id="set-text">Set text (escapes tags)</button>
<button id="set-html">Set html (renders tags)</button>
<p id="output"></p>

<script>
$(function() {
  $('#get-text').click(function() {
    // text() strips all tags
    $('#output').text('text(): ' + $('#demo').text());
  });
  $('#get-html').click(function() {
    // html() returns the raw HTML inside
    $('#output').text('html(): ' + $('#demo').html());
  });
  $('#set-text').click(function() {
    // < > rendered as literal characters
    $('#demo').text('<em>Set by text()</em> — tags are escaped');
  });
  $('#set-html').click(function() {
    // Real HTML is injected
    $('#demo').html('<em style="color:#0769ad">Set by html()</em> — markup rendered!');
  });
});
</script>`,
  },

  {
    id: 'jq-val',
    chapter: 'DOM Get & Set',
    title: 'val() — Form Values',
    concept: '`val()` gets the current value of a form element (input, textarea, select). `val("newValue")` sets it. For checkboxes and radio buttons, check `val()` returns the `value` attribute; use `prop("checked")` to test if they are checked. For multi-select, `val()` returns an array.',
    code: `<input id="name" type="text" value="Alice" style="display:block;width:100%;padding:7px;margin-bottom:8px;">
<select id="color" style="display:block;width:100%;padding:7px;margin-bottom:8px;">
  <option value="red">Red</option>
  <option value="green" selected>Green</option>
  <option value="blue">Blue</option>
</select>
<input id="agree" type="checkbox" checked> I agree
<br><br>
<button id="get-btn">Get values</button>
<button id="set-btn">Set values programmatically</button>
<p id="output"></p>

<script>
$(function() {
  $('#get-btn').click(function() {
    var name    = $('#name').val();
    var color   = $('#color').val();
    var checked = $('#agree').prop('checked');
    $('#output').text('Name: ' + name + ' | Color: ' + color + ' | Agree: ' + checked);
  });

  $('#set-btn').click(function() {
    $('#name').val('Bob');
    $('#color').val('blue');
    $('#agree').prop('checked', false);
    $('#output').text('Values set programmatically!');
  });
});
</script>`,
  },

  {
    id: 'jq-attr',
    chapter: 'DOM Get & Set',
    title: 'attr() — Attributes',
    concept: '`attr("name")` gets an HTML attribute value. `attr("name", "value")` sets it. `attr("name", function(i, oldVal){})` sets it using a function (useful for bulk updates). `removeAttr("name")` removes the attribute. Use `attr()` for HTML attributes like `href`, `src`, `title`, `placeholder`.',
    code: `<a id="link" href="https://jquery.com" title="jQuery website">jQuery.com</a>
<br><br>
<img id="img" src="https://picsum.photos/120/80?random=1" alt="Random image" style="border-radius:6px;">
<br><br>
<button id="get-attr">Get attr("href")</button>
<button id="set-attr">Set attr("href")</button>
<button id="change-img">Change image src</button>
<p id="output"></p>

<script>
$(function() {
  $('#get-attr').click(function() {
    $('#output').text('href: ' + $('#link').attr('href'));
  });
  $('#set-attr').click(function() {
    $('#link').attr('href', 'https://webdevpuneet.com')
               .text('webdevpuneet.com');
    $('#output').text('Link updated!');
  });
  $('#change-img').click(function() {
    var rand = Math.floor(Math.random() * 100);
    $('#img').attr('src', 'https://picsum.photos/120/80?random=' + rand);
    $('#output').text('Image changed to random=' + rand);
  });
});
</script>`,
  },

  {
    id: 'jq-prop',
    chapter: 'DOM Get & Set',
    title: 'prop() — Properties',
    concept: '`prop("name")` gets a DOM **property** (not HTML attribute). `prop("name", value)` sets it. Properties are the live DOM state: `checked`, `disabled`, `selected`, `readOnly`. Use `prop()` for boolean states, not `attr()` — `attr("checked")` returns the initial HTML attribute; `prop("checked")` returns the current state.',
    code: `<input id="cb" type="checkbox"> Checkbox
<input id="txt" type="text" value="Editable">
<button id="btn1" style="margin-left:8px;">A button</button>
<br><br>
<button id="toggle-cb">Toggle checkbox</button>
<button id="toggle-disable">Toggle input disabled</button>
<button id="toggle-btn">Toggle button disabled</button>
<p id="output"></p>

<script>
$(function() {
  $('#toggle-cb').click(function() {
    var cur = $('#cb').prop('checked');
    $('#cb').prop('checked', !cur);
    $('#output').text('checked: ' + !cur);
  });

  $('#toggle-disable').click(function() {
    var cur = $('#txt').prop('disabled');
    $('#txt').prop('disabled', !cur);
    $('#output').text('input disabled: ' + !cur);
  });

  $('#toggle-btn').click(function() {
    var cur = $('#btn1').prop('disabled');
    $('#btn1').prop('disabled', !cur);
    $('#output').text('button disabled: ' + !cur);
  });
});
</script>`,
  },

  // ── Chapter 10: DOM Add & Remove ─────────────────────────────────────────────
  {
    id: 'jq-append-prepend',
    chapter: 'DOM Add & Remove',
    title: 'append() and prepend()',
    concept: '`append(content)` inserts content **inside** an element at the **end** (after the last child). `prepend(content)` inserts at the **beginning** (before the first child). Both accept HTML strings, DOM elements, or jQuery objects. The content becomes a child of the target element.',
    challenge: {
      question: 'Where does append() insert content?',
      options: ['Before the element', 'After the element', 'Inside at the end', 'Inside at the beginning'],
      correct: 2,
    },
    code: `<ul id="list">
  <li>Existing item</li>
</ul>
<br>
<button id="append-btn">append() — add to end</button>
<button id="prepend-btn">prepend() — add to start</button>
<button id="clear-btn">Clear list</button>

<script>
$(function() {
  var n = 1;
  $('#append-btn').click(function() {
    $('#list').append('<li style="color:#0769ad;">Appended item ' + n++ + '</li>');
  });
  $('#prepend-btn').click(function() {
    $('#list').prepend('<li style="color:#dc2626;">Prepended item ' + n++ + '</li>');
  });
  $('#clear-btn').click(function() {
    $('#list').html('<li>Existing item</li>');
    n = 1;
  });
});
</script>`,
  },

  {
    id: 'jq-after-before',
    chapter: 'DOM Add & Remove',
    title: 'after() and before()',
    concept: '`after(content)` inserts content **after** the element (as a sibling, not a child). `before(content)` inserts **before** it. The difference from append/prepend: these insert **outside** the element. `appendTo()` and `prependTo()` are reversed versions: `$(content).appendTo(target)` is the same as `$(target).append(content)`.',
    code: `<div id="middle" style="background:#dbeafe;padding:12px;border-radius:6px;text-align:center;">
  I am the middle element
</div>
<br>
<button id="before-btn">before() — add above</button>
<button id="after-btn">after() — add below</button>
<button id="clear-btn">Clear extras</button>

<script>
$(function() {
  var n = 1;

  $('#before-btn').click(function() {
    $('#middle').before(
      '<div style="background:#fef9c3;padding:12px;border-radius:6px;text-align:center;margin-bottom:6px;">Before #' + n++ + '</div>'
    );
  });

  $('#after-btn').click(function() {
    $('#middle').after(
      '<div style="background:#a7f3d0;padding:12px;border-radius:6px;text-align:center;margin-top:6px;">After #' + n++ + '</div>'
    );
  });

  $('#clear-btn').click(function() {
    $('#middle').siblings().remove();
    n = 1;
  });
});
</script>`,
  },

  {
    id: 'jq-remove-empty',
    chapter: 'DOM Add & Remove',
    title: 'remove() and empty()',
    concept: '`remove()` removes the element **and all its children** from the DOM (and detaches all event listeners). `empty()` removes only the **contents** (children and text) but keeps the element itself. Pass a selector to `remove()` to filter which elements get removed: `$("li").remove(".old")`.',
    code: `<div id="container" style="background:#f1f5f9;padding:16px;border-radius:8px;">
  <p id="para">I am a paragraph inside the container.</p>
  <ul id="list">
    <li>Item 1</li>
    <li class="old">Item 2 (old)</li>
    <li>Item 3</li>
    <li class="old">Item 4 (old)</li>
  </ul>
</div>
<br>
<button id="empty-btn">empty() container</button>
<button id="remove-para">remove() paragraph</button>
<button id="remove-old">remove(".old") items</button>

<script>
$(function() {
  $('#empty-btn').click(function() {
    // Keeps #container, removes everything inside
    $('#container').empty();
  });

  $('#remove-para').click(function() {
    // Removes #para entirely from the DOM
    $('#para').remove();
  });

  $('#remove-old').click(function() {
    // Removes only <li> elements with class "old"
    $('li').remove('.old');
  });
});
</script>`,
  },

  {
    id: 'jq-clone',
    chapter: 'DOM Add & Remove',
    title: 'clone()',
    concept: '`clone()` creates a deep copy of an element and all its descendants. `clone(true)` also copies the element\'s event handlers and jQuery data. Without `true`, only the DOM structure is cloned — events are not. The clone is detached until you insert it with `append()`, `after()`, etc.',
    code: `<div id="original" style="background:#dbeafe;padding:12px;border-radius:8px;margin-bottom:8px;cursor:pointer;">
  <strong>Original card</strong> — click me to turn green
</div>
<button id="clone-basic">clone() — no events</button>
<button id="clone-events">clone(true) — with events</button>
<button id="clear-btn">Clear clones</button>
<div id="container" style="margin-top:12px;display:flex;flex-direction:column;gap:6px;"></div>

<script>
$(function() {
  var n = 1;

  $('#original').on('click', function() {
    $(this).css('background', $(this).css('background-color') === 'rgb(167, 243, 208)' ? '#dbeafe' : '#a7f3d0');
  });

  $('#clone-basic').click(function() {
    var copy = $('#original').clone(); // no events
    copy.find('strong').text('Clone #' + n++ + ' (no events — click does nothing)');
    copy.css('background', '#fef9c3');
    $('#container').append(copy);
  });

  $('#clone-events').click(function() {
    var copy = $('#original').clone(true); // copies events too
    copy.find('strong').text('Clone #' + n++ + ' (with events — click works!)');
    copy.css('background', '#dcfce7');
    $('#container').append(copy);
  });

  $('#clear-btn').click(function() { $('#container').empty(); n = 1; });
});
</script>`,
  },

  {
    id: 'jq-wrap',
    chapter: 'DOM Add & Remove',
    title: 'wrap(), wrapAll(), unwrap()',
    concept: '`wrap(html)` wraps each matched element individually in the provided HTML structure. `wrapAll(html)` wraps all matched elements together inside one wrapper. `wrapInner(html)` wraps the **contents** of each element. `unwrap()` removes the parent wrapper, leaving the element in place — the reverse of `wrap()`.',
    code: `<p class="item" style="padding:6px;margin:4px 0;">Paragraph 1</p>
<p class="item" style="padding:6px;margin:4px 0;">Paragraph 2</p>
<p class="item" style="padding:6px;margin:4px 0;">Paragraph 3</p>
<br>
<button id="wrap-btn">wrap() each individually</button>
<button id="wrapall-btn">wrapAll() together</button>
<button id="wrapinner-btn">wrapInner() contents</button>
<button id="unwrap-btn">unwrap()</button>

<script>
$(function() {
  $('#wrap-btn').click(function() {
    $('.item').wrap('<div style="border:2px solid #0769ad;border-radius:4px;padding:2px 6px;margin:4px 0;"></div>');
  });

  $('#wrapall-btn').click(function() {
    $('.item').wrapAll('<div style="border:2px solid #dc2626;border-radius:4px;padding:8px;"></div>');
  });

  $('#wrapinner-btn').click(function() {
    $('.item').wrapInner('<strong style="color:#059669;"></strong>');
  });

  $('#unwrap-btn').click(function() {
    $('.item').unwrap(); // removes parent wrapper
  });
});
</script>`,
  },

  {
    id: 'jq-replace',
    chapter: 'DOM Add & Remove',
    title: 'replaceWith() and replaceAll()',
    concept: '`replaceWith(newContent)` replaces the matched elements with new content and removes the originals. `replaceAll(target)` is the inside-out version: `$(new).replaceAll(target)` replaces all `target` elements with the new content. Both remove replaced elements from the DOM along with their event handlers.',
    code: `<ul id="list">
  <li class="old-item" style="padding:4px;">Old item 1</li>
  <li class="old-item" style="padding:4px;">Old item 2</li>
  <li class="old-item" style="padding:4px;">Old item 3</li>
</ul>
<br>
<button id="replace-first">replaceWith() first</button>
<button id="replace-all">replaceAll() all</button>
<button id="reset-btn">Reset</button>

<script>
$(function() {
  function reset() {
    $('#list').html(
      '<li class="old-item" style="padding:4px;">Old item 1</li>' +
      '<li class="old-item" style="padding:4px;">Old item 2</li>' +
      '<li class="old-item" style="padding:4px;">Old item 3</li>'
    );
  }

  $('#replace-first').click(function() {
    $('.old-item:first').replaceWith(
      '<li style="color:#059669;font-weight:bold;padding:4px;">✓ Replaced with replaceWith()</li>'
    );
  });

  $('#replace-all').click(function() {
    $('<li style="color:#0769ad;font-weight:bold;padding:4px;">★ Replaced by replaceAll()</li>')
      .replaceAll('.old-item');
  });

  $('#reset-btn').click(reset);
});
</script>`,
  },

  {
    id: 'jq-detach',
    chapter: 'DOM Add & Remove',
    title: 'detach()',
    concept: '`detach()` removes an element from the DOM like `remove()`, but **preserves** all attached event handlers and jQuery data so the element can be re-inserted later with its behaviour intact. Use `detach()` when temporarily moving elements; use `remove()` when permanently discarding them.',
    code: `<div id="container">
  <div id="card" style="background:#dbeafe;padding:16px;border-radius:8px;cursor:pointer;">
    I have a click handler — click me!
  </div>
</div>
<br>
<button id="detach-btn">detach()</button>
<button id="reattach-btn" disabled>Re-attach</button>
<p id="log">Click count: 0</p>

<script>
$(function() {
  var clicks = 0;
  var $detached = null;

  $('#card').on('click', function() {
    clicks++;
    $('#log').text('Click count: ' + clicks + ' — handler preserved after reattach!');
    $(this).css('background', clicks % 2 === 0 ? '#dbeafe' : '#a7f3d0');
  });

  $('#detach-btn').click(function() {
    $detached = $('#card').detach(); // removed from DOM, events kept
    $('#log').text('Card detached — handler is stored, not destroyed');
    $(this).prop('disabled', true);
    $('#reattach-btn').prop('disabled', false);
  });

  $('#reattach-btn').click(function() {
    $('#container').append($detached); // re-insert with original events
    $detached = null;
    $('#log').text('Card re-attached — click it to confirm the handler works!');
    $(this).prop('disabled', true);
    $('#detach-btn').prop('disabled', false);
  });
});
</script>`,
  },

  // ── Chapter 11: CSS Manipulation ─────────────────────────────────────────────
  {
    id: 'jq-addclass',
    chapter: 'CSS Manipulation',
    title: 'addClass() and removeClass()',
    concept: '`addClass("cls")` adds one or more CSS classes (space-separated for multiple). `removeClass("cls")` removes them. `hasClass("cls")` returns `true`/`false`. These methods do not replace existing classes — they add or remove specifically. This keeps CSS logic in stylesheets and jQuery only toggles state.',
    challenge: {
      question: 'Does addClass() replace existing classes on the element?',
      options: ['Yes, it replaces all classes', 'No, it adds to existing classes', 'Only if the element has no class', 'It depends on the browser'],
      correct: 1,
    },
    code: `<style>
.highlight { background: #fef9c3; border: 2px solid #eab308; }
.error     { background: #fee2e2; border: 2px solid #ef4444; color: #dc2626; }
.success   { background: #dcfce7; border: 2px solid #22c55e; color: #16a34a; }
.big       { font-size: 18px; font-weight: bold; }
</style>

<div id="box" style="padding:16px;border-radius:8px;border:2px solid transparent;">
  I change classes dynamically
</div>
<br>
<button id="b1">Add .highlight</button>
<button id="b2">Add .error</button>
<button id="b3">Add .success .big</button>
<button id="b4">Remove all</button>

<script>
$(function() {
  $('#b1').click(function() {
    $('#box').removeClass().addClass('highlight');
  });
  $('#b2').click(function() {
    $('#box').removeClass().addClass('error');
  });
  $('#b3').click(function() {
    // Add multiple classes
    $('#box').removeClass().addClass('success big');
  });
  $('#b4').click(function() {
    $('#box').removeClass();
  });
});
</script>`,
  },

  {
    id: 'jq-toggleclass',
    chapter: 'CSS Manipulation',
    title: 'toggleClass()',
    concept: '`toggleClass("cls")` adds the class if the element does not have it, removes it if it does. You can toggle multiple classes at once. `toggleClass("cls", switch)` forces add (`true`) or remove (`false`) based on a boolean — useful for syncing with state.',
    code: `<style>
.dark-mode {
  background: #1e293b;
  color: #e2e8f0;
}
.active {
  border: 3px solid #0769ad;
  border-radius: 8px;
}
</style>

<div id="page" style="padding:20px;border-radius:8px;background:#f8fafc;transition:background 0.3s,color 0.3s;">
  <h3>Demo area</h3>
  <p>Click the buttons below to toggle classes.</p>
</div>
<br>
<button id="dark-btn">Toggle .dark-mode</button>
<button id="active-btn">Toggle .active</button>

<script>
$(function() {
  $('#dark-btn').click(function() {
    $('#page').toggleClass('dark-mode');
  });
  $('#active-btn').click(function() {
    $('#page').toggleClass('active');
  });
});
</script>`,
  },

  {
    id: 'jq-css',
    chapter: 'CSS Manipulation',
    title: 'css() Method',
    concept: '`css("property")` gets the **computed** value of a CSS property. `css("property", "value")` sets it (adds inline style). `css({ prop: val, prop2: val2 })` sets multiple properties at once. Property names can be camelCase (`backgroundColor`) or hyphenated (`"background-color"`) — jQuery handles both.',
    code: `<div id="box" style="width:120px;height:120px;background:#818cf8;border-radius:8px;"></div>
<br>
<button id="get-color">Get background</button>
<button id="set-blue">Set blue</button>
<button id="set-multi">Set multiple</button>
<button id="reset-btn">Reset</button>
<p id="output"></p>

<script>
$(function() {
  $('#get-color').click(function() {
    // css() returns the computed value
    var bg = $('#box').css('background-color');
    $('#output').text('Background: ' + bg);
  });

  $('#set-blue').click(function() {
    $('#box').css('background-color', '#3b82f6');
  });

  $('#set-multi').click(function() {
    $('#box').css({
      backgroundColor: '#f472b6',
      borderRadius: '50%',
      width: '160px',
      height: '160px'
    });
  });

  $('#reset-btn').click(function() {
    $('#box').css({
      backgroundColor: '#818cf8',
      borderRadius: '8px',
      width: '120px',
      height: '120px'
    });
  });
});
</script>`,
  },

  {
    id: 'jq-dimensions',
    chapter: 'CSS Manipulation',
    title: 'Dimensions',
    concept: '`width()` / `height()` return the content area (no padding/border/margin). `innerWidth()` / `innerHeight()` include padding. `outerWidth()` / `outerHeight()` include padding + border. Pass `true` to outer methods to include margin too. Call with a value to set: `width(200)`.',
    code: `<div id="box" style="width:200px;height:100px;padding:20px;border:5px solid #0769ad;margin:10px;background:#dbeafe;border-radius:4px;">
  Content area
</div>
<button id="measure">Measure box</button>
<div id="output" style="font-family:monospace;font-size:12px;margin-top:8px;"></div>

<script>
$(function() {
  $('#measure').click(function() {
    var el = $('#box');
    $('#output').html(
      'width():            ' + el.width()            + 'px (content only)<br>' +
      'height():           ' + el.height()           + 'px (content only)<br>' +
      'innerWidth():       ' + el.innerWidth()       + 'px (+ padding)<br>' +
      'innerHeight():      ' + el.innerHeight()      + 'px (+ padding)<br>' +
      'outerWidth():       ' + el.outerWidth()       + 'px (+ padding + border)<br>' +
      'outerWidth(true):   ' + el.outerWidth(true)   + 'px (+ margin too)<br>' +
      'outerHeight():      ' + el.outerHeight()      + 'px (+ padding + border)'
    );
  });
});
</script>`,
  },

  // ── Chapter 12: Traversing ───────────────────────────────────────────────────
  {
    id: 'jq-trav-parent',
    chapter: 'Traversing',
    title: 'parent() and parents()',
    concept: '`parent()` returns the **direct parent** element. `parents()` returns **all ancestors** up to `<html>`. Both accept an optional selector to filter: `parents(".container")` returns only ancestors with class `container`. `parentsUntil(".wrap")` returns ancestors until (not including) the matching element.',
    code: `<div class="level-1" style="padding:12px;background:#e0f2fe;border-radius:6px;">
  Level 1
  <div class="level-2" style="padding:12px;background:#bae6fd;border-radius:6px;margin-top:6px;">
    Level 2
    <div class="level-3" style="padding:12px;background:#7dd3fc;border-radius:6px;margin-top:6px;">
      Level 3
      <span id="target" style="display:inline-block;background:#0369a1;color:#fff;padding:4px 10px;border-radius:4px;cursor:pointer;">
        I am the target
      </span>
    </div>
  </div>
</div>
<br>
<button id="parent-btn">parent()</button>
<button id="parents-btn">parents()</button>
<p id="output"></p>

<script>
$(function() {
  function flash(el) {
    el.css('outline', '3px solid red');
    setTimeout(function() { el.css('outline', ''); }, 1000);
  }

  $('#parent-btn').click(function() {
    var p = $('#target').parent();
    flash(p);
    $('#output').text('parent() tag: ' + p.prop('tagName') + ', class: ' + p.attr('class'));
  });

  $('#parents-btn').click(function() {
    var ps = $('#target').parents();
    ps.each(function() { flash($(this)); });
    var tags = ps.map(function() { return this.tagName; }).get().join(' → ');
    $('#output').text('parents(): ' + tags);
  });
});
</script>`,
  },

  {
    id: 'jq-trav-children',
    chapter: 'Traversing',
    title: 'children() and find()',
    concept: '`children()` returns **direct children** only (one level deep). `find(selector)` returns **all descendants** at any depth that match the selector. `children(".active")` filters direct children; `find("a")` finds all `<a>` anywhere inside the element.',
    code: `<ul id="nav">
  <li class="active"><a href="#">Home</a></li>
  <li>
    <a href="#">Products</a>
    <ul>
      <li><a href="#">Widget A</a></li>
      <li><a href="#">Widget B</a></li>
    </ul>
  </li>
  <li><a href="#">Contact</a></li>
</ul>
<br>
<button id="children-btn">children() of #nav</button>
<button id="find-btn">find("a") in #nav</button>
<p id="output"></p>

<script>
$(function() {
  $('#children-btn').click(function() {
    var kids = $('#nav').children();
    kids.css('outline', '2px solid #0769ad');
    setTimeout(function() { kids.css('outline', ''); }, 1000);
    $('#output').text('Direct children count: ' + kids.length);
  });

  $('#find-btn').click(function() {
    var links = $('#nav').find('a');
    links.css('color', '#dc2626');
    setTimeout(function() { links.css('color', ''); }, 1000);
    $('#output').text('All <a> descendants: ' + links.length);
  });
});
</script>`,
  },

  {
    id: 'jq-trav-siblings',
    chapter: 'Traversing',
    title: 'siblings(), next(), prev()',
    concept: '`siblings()` returns all sibling elements. `next()` returns the immediately following sibling. `nextAll()` returns all following siblings. `prev()` / `prevAll()` go backward. All accept an optional selector to filter. These are useful for tab systems, accordions, and step indicators.',
    code: `<ul style="list-style:none;padding:0;display:flex;gap:8px;">
  <li class="tab" id="t1" style="padding:8px 16px;border-radius:6px;cursor:pointer;background:#e2e8f0;">Tab 1</li>
  <li class="tab" id="t2" style="padding:8px 16px;border-radius:6px;cursor:pointer;background:#e2e8f0;">Tab 2</li>
  <li class="tab" id="t3" style="padding:8px 16px;border-radius:6px;cursor:pointer;background:#e2e8f0;">Tab 3</li>
  <li class="tab" id="t4" style="padding:8px 16px;border-radius:6px;cursor:pointer;background:#e2e8f0;">Tab 4</li>
</ul>
<p id="output">Click a tab.</p>

<script>
$(function() {
  $('.tab').click(function() {
    // Reset all siblings + self
    $(this).siblings().css({ background: '#e2e8f0', fontWeight: '' });
    // Highlight clicked tab
    $(this).css({ background: '#0769ad', color: '#fff', fontWeight: 'bold' });

    var next = $(this).next().text() || 'none';
    var prev = $(this).prev().text() || 'none';
    $('#output').text(
      'Active: ' + $(this).text() +
      ' | prev: ' + prev +
      ' | next: ' + next +
      ' | siblings: ' + $(this).siblings().length
    );
  });
});
</script>`,
  },

  {
    id: 'jq-trav-filter',
    chapter: 'Traversing',
    title: 'first(), last(), eq()',
    concept: '`first()` returns the first element in the matched set. `last()` returns the last. `eq(n)` returns the element at index n (0-based). These are jQuery traversal methods equivalent to the filter selectors `:first`, `:last`, `:eq(n)`, but chainable in a traversal context.',
    code: `<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
  <li>Item 5</li>
</ul>
<br>
<button id="b1">first()</button>
<button id="b2">last()</button>
<button id="b3">eq(2)</button>
<button id="reset">Reset</button>

<script>
$(function() {
  function highlight(el, color) {
    $('li').css('background', '');
    el.css('background', color);
  }

  $('#b1').click(function() { highlight($('li').first(), '#fde68a'); });
  $('#b2').click(function() { highlight($('li').last(),  '#a7f3d0'); });
  $('#b3').click(function() { highlight($('li').eq(2),   '#bfdbfe'); });
  $('#reset').click(function() { $('li').css('background', ''); });
});
</script>`,
  },

  {
    id: 'jq-trav-filtermethod',
    chapter: 'Traversing',
    title: 'filter() and not()',
    concept: '`filter(selector)` reduces the matched set to elements that match the selector. `not(selector)` removes matching elements from the set. Both accept selector strings, DOM elements, or functions: `filter(function(i){ return i % 2 === 0; })` keeps even-indexed items. These are the programmatic equivalents of CSS filter selectors.',
    code: `<ul id="items">
  <li class="new">New item A</li>
  <li class="old">Old item B</li>
  <li class="new">New item C</li>
  <li class="old">Old item D</li>
  <li class="new">New item E</li>
</ul>
<br>
<button id="b1">filter(".new")</button>
<button id="b2">not(".old")</button>
<button id="b3">filter by function (index > 2)</button>
<button id="reset">Reset</button>

<script>
$(function() {
  function highlight(set, color) {
    $('li').css('background', '');
    set.css({ background: color, fontWeight: 'bold' });
  }

  $('#b1').click(function() {
    highlight($('li').filter('.new'), '#a7f3d0');
  });
  $('#b2').click(function() {
    // not(".old") keeps everything that isn't .old
    highlight($('li').not('.old'), '#bfdbfe');
  });
  $('#b3').click(function() {
    highlight($('li').filter(function(i) { return i > 2; }), '#fde68a');
  });
  $('#reset').click(function() { $('li').css({ background: '', fontWeight: '' }); });
});
</script>`,
  },

  {
    id: 'jq-trav-closest',
    chapter: 'Traversing',
    title: 'closest()',
    concept: '`closest(selector)` walks **up** the DOM tree and returns the **first** ancestor (or the element itself) that matches the selector. Unlike `parents()` which returns all matching ancestors, `closest()` stops at the first match. It is the primary pattern for event delegation — finding the meaningful container from a deeply nested click target.',
    challenge: {
      question: 'What does closest() return if no ancestor matches?',
      options: ['null', 'undefined', 'An empty jQuery object', 'The document element'],
      correct: 2,
    },
    code: `<div class="card" style="border:2px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:10px;">
  <h4 style="margin:0 0 6px">Card 1</h4>
  <p style="margin:0 0 8px">Some content inside card 1.</p>
  <button class="delete-btn" style="background:#fee2e2;border:1px solid #fca5a5;border-radius:4px;padding:4px 10px;cursor:pointer;">Delete</button>
</div>
<div class="card" style="border:2px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:10px;">
  <h4 style="margin:0 0 6px">Card 2</h4>
  <p style="margin:0 0 8px">Some content inside card 2.</p>
  <button class="delete-btn" style="background:#fee2e2;border:1px solid #fca5a5;border-radius:4px;padding:4px 10px;cursor:pointer;">Delete</button>
</div>
<p id="log">Click a delete button.</p>

<script>
$(function() {
  $(document).on('click', '.delete-btn', function() {
    // closest() finds the nearest .card ancestor from wherever click originated
    var $card = $(this).closest('.card');
    $('#log').text('Removing: ' + $card.find('h4').text());
    $card.fadeOut(300, function() { $(this).remove(); });
  });
});
</script>`,
  },

  {
    id: 'jq-trav-slice',
    chapter: 'Traversing',
    title: 'slice()',
    concept: '`slice(start, end)` reduces the matched set to a subset by zero-based index range. `slice(2)` keeps from index 2 onward. `slice(1, 4)` keeps indexes 1, 2, 3 (end is exclusive). Negative indices count from the end: `slice(-2)` keeps the last two elements.',
    code: `<ul id="list">
  <li style="padding:4px;">Item 0</li>
  <li style="padding:4px;">Item 1</li>
  <li style="padding:4px;">Item 2</li>
  <li style="padding:4px;">Item 3</li>
  <li style="padding:4px;">Item 4</li>
  <li style="padding:4px;">Item 5</li>
</ul>
<br>
<button id="b1">slice(2) — from index 2</button>
<button id="b2">slice(1, 4) — indexes 1–3</button>
<button id="b3">slice(-2) — last 2</button>
<button id="reset">Reset</button>

<script>
$(function() {
  function highlight(set, color) {
    $('li').css('background', '');
    set.css({ background: color, fontWeight: 'bold' });
  }

  $('#b1').click(function() { highlight($('li').slice(2), '#bfdbfe'); });
  $('#b2').click(function() { highlight($('li').slice(1, 4), '#a7f3d0'); });
  $('#b3').click(function() { highlight($('li').slice(-2), '#fde68a'); });
  $('#reset').click(function() { $('li').css({ background: '', fontWeight: '' }); });
});
</script>`,
  },

  {
    id: 'jq-trav-add',
    chapter: 'Traversing',
    title: 'add() and addBack()',
    concept: '`add(selector)` adds more elements to the current jQuery set so you can act on a combined group in one chain. `addBack()` adds the previous set (before the last traversal) back in — useful after `children()` or `find()` when you want to style both parent and descendants together.',
    code: `<h3 class="title" style="padding:6px;margin:4px 0;">Heading 1</h3>
<p class="note" style="padding:6px;margin:4px 0;">Note paragraph A</p>
<h3 class="title" style="padding:6px;margin:4px 0;">Heading 2</h3>
<p class="note" style="padding:6px;margin:4px 0;">Note paragraph B</p>
<br>
<button id="add-btn">add() — style headings + notes together</button>
<button id="addback-btn">addBack() — children + parent</button>
<button id="reset">Reset</button>

<script>
$(function() {
  $('#add-btn').click(function() {
    $('h3.title')
      .add('p.note')
      .css({ background: '#fef9c3', borderLeft: '3px solid #eab308', paddingLeft: '10px' });
  });

  $('#addback-btn').click(function() {
    // Start at body > find h3 > addBack adds body back into the set
    $('body').find('h3.title').addBack()
      .css({ outline: '2px solid #0769ad' });
    setTimeout(function() {
      $('h3.title, body').css('outline', '');
    }, 1200);
  });

  $('#reset').click(function() {
    $('h3.title, p.note').css({ background: '', borderLeft: '', paddingLeft: '' });
  });
});
</script>`,
  },

  {
    id: 'jq-trav-end',
    chapter: 'Traversing',
    title: 'end()',
    concept: '`end()` reverts the jQuery object to the state before the last filtering or traversal operation. This lets you traverse to a child, act on it, `end()` back to the parent, and act on it — all in a single readable chain without re-selecting.',
    code: `<div id="card" style="border:2px solid #e2e8f0;border-radius:8px;padding:16px;">
  <h4 id="card-title" style="margin:0 0 6px">Card Title</h4>
  <p id="card-body" style="margin:0 0 10px">Card body text.</p>
  <button id="card-btn">Action</button>
</div>
<br>
<button id="chain-btn">Demonstrate end()</button>
<button id="reset-btn">Reset</button>

<script>
$(function() {
  $('#chain-btn').click(function() {
    $('#card')
      .css('border-color', '#0769ad')    // style the card
      .find('h4')                        // go to h4
        .css('color', '#0769ad')         // style h4
      .end()                             // ← back to #card
      .find('p')                         // go to p
        .css('color', '#64748b')         // style p
      .end()                             // ← back to #card
      .find('button')                    // go to button
        .text('Done!')
        .css({ background: '#0769ad', color: '#fff', border: 'none',
               borderRadius: '4px', padding: '5px 12px', cursor: 'pointer' });
  });

  $('#reset-btn').click(function() {
    $('#card').css('border-color', '#e2e8f0');
    $('#card-title').css('color', '');
    $('#card-body').css('color', '');
    $('#card-btn').text('Action').css({ background: '', color: '', border: '', borderRadius: '', padding: '' });
  });
});
</script>`,
  },

  // ── Chapter 13: AJAX ─────────────────────────────────────────────────────────
  {
    id: 'jq-ajax-get',
    chapter: 'AJAX',
    title: '$.get()',
    concept: '`$.get(url, callback)` sends an HTTP GET request and calls the callback with the response data. It is shorthand for `$.ajax({ method: "GET", ... })`. The callback receives `(data, status, jqXHR)`. jQuery auto-parses JSON if the server sends `Content-Type: application/json`.',
    challenge: {
      question: 'What HTTP method does $.get() use?',
      options: ['POST', 'PUT', 'GET', 'PATCH'],
      correct: 2,
    },
    code: `<button id="load-btn">$.get() — fetch a user</button>
<div id="result" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:40px;">
  Click the button to load data.
</div>

<script>
$(function() {
  $('#load-btn').click(function() {
    $('#result').text('Loading...');

    $.get('https://jsonplaceholder.typicode.com/users/1', function(data, status) {
      $('#result').html(
        '<strong>' + data.name + '</strong><br>' +
        'Email: ' + data.email + '<br>' +
        'City: ' + data.address.city + '<br>' +
        'Status: ' + status
      );
    });
  });
});
</script>`,
  },

  {
    id: 'jq-ajax-post',
    chapter: 'AJAX',
    title: '$.post()',
    concept: '`$.post(url, data, callback)` sends an HTTP POST request with a data object. The data is serialised as form data. The callback works the same as `$.get()`. This is commonly used to submit form data to a server without a page reload. JSONPlaceholder accepts fake POST requests for testing.',
    code: `<form id="myForm">
  <input id="title" type="text" value="My new post" style="display:block;width:100%;padding:8px;margin-bottom:8px;">
  <textarea id="body" style="display:block;width:100%;padding:8px;height:80px;">Post body content here.</textarea>
  <button type="submit" style="margin-top:8px;">$.post() — Submit</button>
</form>
<div id="result" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:40px;">
  Response appears here.
</div>

<script>
$(function() {
  $('#myForm').submit(function(e) {
    e.preventDefault();
    $('#result').text('Posting...');

    $.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: $('#title').val(),
        body: $('#body').val(),
        userId: 1
      },
      function(data, status) {
        $('#result').html(
          'Created post ID: <strong>' + data.id + '</strong><br>' +
          'Title: ' + data.title + '<br>' +
          'Status: ' + status
        );
      }
    );
  });
});
</script>`,
  },

  {
    id: 'jq-ajax-method',
    chapter: 'AJAX',
    title: '$.ajax()',
    concept: '`$.ajax(settings)` is the full AJAX method with complete control. Key options: `url`, `method` ("GET"/"POST"/"PUT"/"DELETE"), `data`, `dataType` ("json"/"html"/"text"), `success(data)`, `error(jqXHR, status, error)`, `beforeSend()`, `complete()`. Chaining `.done()`, `.fail()`, `.always()` on the returned jqXHR is the modern pattern.',
    code: `<button id="fetch-btn">$.ajax() — GET request</button>
<button id="error-btn">$.ajax() — trigger error</button>
<div id="result" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:40px;">
  Response appears here.
</div>

<script>
$(function() {
  $('#fetch-btn').click(function() {
    $('#result').text('Sending request...');

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      $('#result').html(
        '<strong>Done!</strong><br>' +
        'Todo: ' + data.title + '<br>' +
        'Completed: ' + data.completed
      );
    })
    .fail(function(jqXHR, status, err) {
      $('#result').html('<span style="color:red">Error: ' + status + ' — ' + err + '</span>');
    })
    .always(function() {
      console.log('Request complete');
    });
  });

  $('#error-btn').click(function() {
    $.ajax({ url: 'https://httpstat.us/404' })
      .fail(function(jqXHR, status) {
        $('#result').html('<span style="color:red">HTTP ' + jqXHR.status + ': ' + status + '</span>');
      });
  });
});
</script>`,
  },

  {
    id: 'jq-ajax-getjson',
    chapter: 'AJAX',
    title: '$.getJSON()',
    concept: '`$.getJSON(url, callback)` is shorthand for `$.ajax` with `dataType: "json"`. It auto-parses the JSON response. The callback receives the parsed JavaScript object, not a string. Use it whenever you expect a JSON response — it is cleaner than `$.get()` with manual `JSON.parse()`.',
    code: `<button id="posts-btn">Load posts</button>
<button id="photo-btn">Load photos</button>
<div id="result" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:60px;max-height:220px;overflow-y:auto;"></div>

<script>
$(function() {
  function renderList(items, labelFn) {
    var html = items.map(function(item) {
      return '<div style="padding:4px 0;border-bottom:1px solid #e2e8f0;">' + labelFn(item) + '</div>';
    }).join('');
    $('#result').html(html);
  }

  $('#posts-btn').click(function() {
    $('#result').text('Loading posts...');
    $.getJSON('https://jsonplaceholder.typicode.com/posts?_limit=5', function(data) {
      renderList(data, function(p) {
        return '<strong>#' + p.id + '</strong> ' + p.title;
      });
    });
  });

  $('#photo-btn').click(function() {
    $('#result').text('Loading photos...');
    $.getJSON('https://jsonplaceholder.typicode.com/photos?_limit=5', function(data) {
      renderList(data, function(p) {
        return '<strong>#' + p.id + '</strong> ' + p.title;
      });
    });
  });
});
</script>`,
  },

  {
    id: 'jq-ajax-load',
    chapter: 'AJAX',
    title: 'load()',
    concept: '`$(selector).load(url)` fetches an HTML file and inserts it into the selected element. You can load a fragment: `load("page.html #section")` loads only the `#section` from the fetched page. A callback `load(url, data, callback)` runs after loading. This is the simplest jQuery AJAX method for loading HTML content.',
    code: `<button id="load-post">Load post #1 as JSON</button>
<button id="load-list">Load 3 users into list</button>
<div id="container" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:60px;">
  Content loads here.
</div>

<script>
$(function() {
  // Note: .load() needs a real HTML URL.
  // Since JSONPlaceholder returns JSON (not HTML),
  // we demonstrate the pattern using $.get() to simulate what .load() does.

  $('#load-post').click(function() {
    // Simulating: $('#container').load('https://example.com/post.html')
    $('#container').text('Loading...');
    $.get('https://jsonplaceholder.typicode.com/posts/1', function(data) {
      $('#container').html(
        '<h3 style="margin:0 0 6px">' + data.title + '</h3>' +
        '<p style="margin:0;color:#64748b">' + data.body + '</p>'
      );
    });
  });

  $('#load-list').click(function() {
    $('#container').text('Loading...');
    $.getJSON('https://jsonplaceholder.typicode.com/users?_limit=3', function(users) {
      var html = users.map(function(u) {
        return '<div style="padding:8px 0;border-bottom:1px solid #e2e8f0">' +
               '<strong>' + u.name + '</strong> — ' + u.email + '</div>';
      }).join('');
      $('#container').html(html);
    });
  });
});
</script>`,
  },

  {
    id: 'jq-ajax-setup',
    chapter: 'AJAX',
    title: '$.ajaxSetup()',
    concept: '`$.ajaxSetup(options)` sets global defaults for all AJAX calls made after it runs. Common uses: set a base URL, add a default header, or turn off caching. Any individual `$.ajax()` call can still override these defaults. Call `$.ajaxSetup()` once at the top of your script instead of repeating the same options on every request.',
    code: `<button id="btn1">GET post #1 (uses defaults)</button>
<button id="btn2">GET post #2 (uses defaults)</button>
<div id="out" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:60px;">
  Results appear here.
</div>

<script>
// Set defaults once — all $.ajax() calls below inherit these
$.ajaxSetup({
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  dataType: 'json',
  error: function() {
    $('#out').html('<span style="color:red">Request failed.</span>');
  }
});

$(function() {
  $('#btn1').click(function() {
    $.ajax({
      // url comes from ajaxSetup
      success: function(data) {
        $('#out').html('<strong>' + data.title + '</strong>');
      }
    });
  });

  $('#btn2').click(function() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts/2', // override default
      success: function(data) {
        $('#out').html('<strong>' + data.title + '</strong>');
      }
    });
  });
});
</script>`,
  },

  {
    id: 'jq-ajax-events',
    chapter: 'AJAX',
    title: 'Global AJAX Events',
    concept: 'jQuery fires global AJAX events on `$(document)` for every request: `ajaxStart` (first request begins), `ajaxSend` (before each send), `ajaxSuccess`, `ajaxError`, `ajaxComplete`, and `ajaxStop` (last request finishes). Attach them with `.on()` to show a loading indicator or log all requests without modifying individual `$.ajax()` calls.',
    code: `<div id="log" style="font-family:monospace;background:#f1f5f9;padding:12px;border-radius:8px;min-height:80px;margin-bottom:12px;">
  Event log:
</div>
<button id="go">Make AJAX request</button>

<script>
function log(msg) {
  $('#log').append('<div>' + msg + '</div>');
}

$(document)
  .on('ajaxStart',    function() { log('▶ ajaxStart — first request began'); })
  .on('ajaxSend',     function() { log('→ ajaxSend — request is being sent'); })
  .on('ajaxSuccess',  function() { log('✓ ajaxSuccess — response OK'); })
  .on('ajaxError',    function() { log('✗ ajaxError — something went wrong'); })
  .on('ajaxComplete', function() { log('◉ ajaxComplete — request finished'); })
  .on('ajaxStop',     function() { log('■ ajaxStop — all requests done'); });

$(function() {
  $('#go').click(function() {
    $('#log').html('Event log:\n');
    $.getJSON('https://jsonplaceholder.typicode.com/posts/1', function(data) {
      log('Data: ' + data.title.slice(0, 40) + '…');
    });
  });
});
</script>`,
  },

  // ── Chapter 14: Utilities ────────────────────────────────────────────────────
  {
    id: 'jq-util-each',
    chapter: 'Utilities',
    title: '$.each()',
    concept: '`$.each(collection, callback)` iterates over arrays and objects. For arrays, the callback receives `(index, value)`. For objects, it receives `(key, value)`. Inside the callback, `this` refers to the current value. Return `false` to break out of the loop early — the equivalent of a `break` statement.',
    challenge: {
      question: 'How do you break out of a $.each() loop early?',
      options: ['return true', 'return false', 'break', 'throw StopIteration'],
      correct: 1,
    },
    code: `<h3>Array iteration</h3>
<ul id="fruits"></ul>

<h3>Object iteration</h3>
<ul id="person"></ul>

<h3>Early break (stop at 3)</h3>
<ul id="nums"></ul>

<script>
$(function() {
  var fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
  $.each(fruits, function(i, val) {
    $('#fruits').append('<li>' + i + ': ' + val + '</li>');
  });

  var person = { name: 'Alice', age: 30, city: 'London' };
  $.each(person, function(key, val) {
    $('#person').append('<li>' + key + ' = ' + val + '</li>');
  });

  $.each([1, 2, 3, 4, 5, 6], function(i, val) {
    if (i >= 3) return false; // break
    $('#nums').append('<li>' + val + '</li>');
  });
});
</script>`,
  },

  {
    id: 'jq-util-map',
    chapter: 'Utilities',
    title: '$.map()',
    concept: '`$.map(array, callback)` transforms each element of an array and returns a new array of the results. The callback receives `(value, index)` — note the order is reversed compared to `$.each()`. Return `null` or `undefined` from the callback to remove that item from the result. Also works on jQuery objects when called as `.map(callback)`.',
    code: `<p id="doubled"></p>
<p id="upper"></p>
<p id="filtered"></p>

<script>
$(function() {
  var nums = [1, 2, 3, 4, 5];

  var doubled = $.map(nums, function(val) {
    return val * 2;
  });
  $('#doubled').text('Doubled: ' + doubled.join(', '));

  var words = ['hello', 'world', 'jquery'];
  var upper = $.map(words, function(val) {
    return val.toUpperCase();
  });
  $('#upper').text('Uppercase: ' + upper.join(', '));

  // Return null to filter items out
  var evens = $.map(nums, function(val) {
    return val % 2 === 0 ? val : null;
  });
  $('#filtered').text('Evens only: ' + evens.join(', '));
});
</script>`,
  },

  {
    id: 'jq-util-grep',
    chapter: 'Utilities',
    title: '$.grep()',
    concept: '`$.grep(array, callback, invert)` filters an array and returns a new array containing only elements for which the callback returns `true`. The callback receives `(value, index)`. Pass `true` as the third argument to invert the filter — returning elements the callback would normally exclude. The original array is not modified.',
    code: `<p id="evens"></p>
<p id="long"></p>
<p id="inverted"></p>

<script>
$(function() {
  var nums = [1, 2, 3, 4, 5, 6, 7, 8];

  var evens = $.grep(nums, function(val) {
    return val % 2 === 0;
  });
  $('#evens').text('Evens: ' + evens.join(', '));

  var words = ['cat', 'elephant', 'dog', 'butterfly', 'ox'];
  var long = $.grep(words, function(val) {
    return val.length > 3;
  });
  $('#long').text('Long words: ' + long.join(', '));

  // Inverted: items that do NOT match (invert = true)
  var odds = $.grep(nums, function(val) {
    return val % 2 === 0;
  }, true);
  $('#inverted').text('Odds (inverted): ' + odds.join(', '));
});
</script>`,
  },

  {
    id: 'jq-util-extend',
    chapter: 'Utilities',
    title: '$.extend()',
    concept: '`$.extend(target, source)` merges properties from `source` into `target` and returns `target`. Properties in `source` overwrite matching ones in `target`. Pass `true` as the first argument for a **deep** merge — nested objects are merged recursively instead of replaced. Passing an empty object `{}` as target creates a new merged object without mutating either source.',
    code: `<pre id="out" style="background:#f1f5f9;padding:16px;border-radius:8px;font-size:13px;"></pre>

<script>
$(function() {
  var defaults = { color: 'blue', size: 14, bold: false };
  var overrides = { color: 'red', bold: true };

  // Shallow merge into a new object (empty target)
  var merged = $.extend({}, defaults, overrides);
  console.log(JSON.stringify(merged));
  $('#out').text(
    'defaults:  ' + JSON.stringify(defaults) + '\\n' +
    'overrides: ' + JSON.stringify(overrides) + '\\n' +
    'merged:    ' + JSON.stringify(merged) + '\\n'
  );

  // Deep merge example
  var a = { font: { size: 14, weight: 'normal' } };
  var b = { font: { weight: 'bold' } };
  var deep = $.extend(true, {}, a, b);
  $('#out').append(
    'deep merged font: ' + JSON.stringify(deep.font)
  );
});
</script>`,
  },

  {
    id: 'jq-util-type',
    chapter: 'Utilities',
    title: '$.type() and Type Checks',
    concept: '`$.type(value)` returns a lowercase string describing the JavaScript type of a value: `"string"`, `"number"`, `"boolean"`, `"array"`, `"object"`, `"function"`, `"null"`, `"undefined"`, `"regexp"`, `"date"`. Unlike `typeof`, it correctly identifies arrays and null. Companion methods: `$.isArray()`, `$.isFunction()`, `$.isNumeric()`, `$.isEmptyObject()`.',
    code: `<table id="tbl" style="border-collapse:collapse;width:100%">
  <thead>
    <tr>
      <th style="text-align:left;padding:6px;background:#e2e8f0">Value</th>
      <th style="text-align:left;padding:6px;background:#e2e8f0">$.type()</th>
      <th style="text-align:left;padding:6px;background:#e2e8f0">typeof</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<script>
$(function() {
  var samples = [
    'hello', 42, true, null, undefined,
    [], {}, function(){}, /regex/, new Date()
  ];

  $.each(samples, function(i, val) {
    var row = '<tr>' +
      '<td style="padding:5px;border-bottom:1px solid #e2e8f0">' + JSON.stringify(val) + '</td>' +
      '<td style="padding:5px;border-bottom:1px solid #e2e8f0;color:#0369a1">' + $.type(val) + '</td>' +
      '<td style="padding:5px;border-bottom:1px solid #e2e8f0;color:#7c3aed">' + typeof val + '</td>' +
    '</tr>';
    $('#tbl tbody').append(row);
  });
});
</script>`,
  },

  // ── Chapter 15: Deferred & Promises ──────────────────────────────────────────
  {
    id: 'jq-deferred-basic',
    chapter: 'Deferred & Promises',
    title: '$.Deferred() Basics',
    concept: '`$.Deferred()` creates a deferred object — a chainable utility for managing async operations. Call `.resolve(value)` when the operation succeeds and `.reject(reason)` when it fails. Attach callbacks with `.done(fn)`, `.fail(fn)`, and `.always(fn)`. Call `.promise()` to return a read-only view — callers can attach handlers but cannot resolve or reject it.',
    challenge: {
      question: 'Which method do you call on a deferred to signal failure?',
      options: ['.fail()', '.reject()', '.error()', '.catch()'],
      correct: 1,
    },
    code: `<button id="succeed">Simulate Success</button>
<button id="fail">Simulate Failure</button>
<div id="status" style="margin-top:12px;padding:12px;border-radius:8px;background:#f1f5f9;min-height:40px;">
  Click a button to run the async operation.
</div>

<script>
function asyncTask(shouldSucceed) {
  var dfd = $.Deferred();
  setTimeout(function() {
    if (shouldSucceed) {
      dfd.resolve('Operation completed successfully!');
    } else {
      dfd.reject('Something went wrong.');
    }
  }, 800);
  return dfd.promise();
}

$(function() {
  $('#succeed').click(function() {
    $('#status').text('Running…').css('background', '#f1f5f9');
    asyncTask(true)
      .done(function(msg)   { $('#status').text('✓ ' + msg).css('background', '#dcfce7'); })
      .fail(function(msg)   { $('#status').text('✗ ' + msg).css('background', '#fee2e2'); })
      .always(function()    { console.log('always runs'); });
  });

  $('#fail').click(function() {
    $('#status').text('Running…').css('background', '#f1f5f9');
    asyncTask(false)
      .done(function(msg)   { $('#status').text('✓ ' + msg).css('background', '#dcfce7'); })
      .fail(function(msg)   { $('#status').text('✗ ' + msg).css('background', '#fee2e2'); });
  });
});
</script>`,
  },

  {
    id: 'jq-deferred-when',
    chapter: 'Deferred & Promises',
    title: '$.when()',
    concept: '`$.when(promise1, promise2, ...)` waits for **all** passed promises to resolve, then calls `.done()` with each result as a separate argument. If **any** promise rejects, `.fail()` fires immediately. Use `$.when()` to coordinate parallel async operations — for example, two AJAX requests that must both complete before updating the UI.',
    code: `<button id="go">Load two resources in parallel</button>
<div id="out" style="margin-top:12px;background:#f1f5f9;padding:16px;border-radius:8px;min-height:60px;">
  Results appear here.
</div>

<script>
$(function() {
  $('#go').click(function() {
    $('#out').text('Loading…');

    var req1 = $.getJSON('https://jsonplaceholder.typicode.com/users/1');
    var req2 = $.getJSON('https://jsonplaceholder.typicode.com/posts/1');

    $.when(req1, req2)
      .done(function(user, post) {
        // Each argument is [data, status, jqXHR]
        var u = user[0];
        var p = post[0];
        $('#out').html(
          '<strong>User:</strong> ' + u.name + ' (' + u.email + ')<br>' +
          '<strong>Post:</strong> ' + p.title
        );
      })
      .fail(function() {
        $('#out').text('One or more requests failed.');
      });
  });
});
</script>`,
  },

  {
    id: 'jq-deferred-chain',
    chapter: 'Deferred & Promises',
    title: 'then() and Promise Chaining',
    concept: '`.then(doneFilter, failFilter)` returns a **new** promise whose value is the return value of the filter function — enabling chains where each step transforms the result. Unlike `.done()`, returning a new promise from `.then()` makes the chain wait for that inner promise before continuing. This allows sequential async operations without deeply nested callbacks.',
    code: `<button id="chain">Run chained requests</button>
<div id="log" style="margin-top:12px;font-family:monospace;background:#f1f5f9;padding:16px;border-radius:8px;min-height:80px;"></div>

<script>
function log(msg) {
  $('#log').append('<div>' + msg + '</div>');
}

$(function() {
  $('#chain').click(function() {
    $('#log').empty();
    log('Step 1: fetch user #1…');

    $.getJSON('https://jsonplaceholder.typicode.com/users/1')
      .then(function(user) {
        log('Step 2: got user — ' + user.name + '. Fetching their posts…');
        // Return a new promise — the chain waits for it
        return $.getJSON('https://jsonplaceholder.typicode.com/posts?userId=' + user.id + '&_limit=3');
      })
      .then(function(posts) {
        log('Step 3: got ' + posts.length + ' posts:');
        $.each(posts, function(i, p) {
          log('  • ' + p.title.slice(0, 50) + '…');
        });
      })
      .fail(function() {
        log('✗ A step failed.');
      });
  });
});
</script>`,
  },

  // ── Chapter 16: Plugin Basics ─────────────────────────────────────────────────
  {
    id: 'jq-plugin-write',
    chapter: 'Plugin Basics',
    title: 'Writing a jQuery Plugin',
    concept: 'A jQuery plugin is a function added to `$.fn` (jQuery\'s prototype): `$.fn.myPlugin = function(options) { ... }`. Inside, `this` is the jQuery object the plugin was called on. Always `return this` to keep the chain alive. Wrap the definition in an IIFE `(function($){ ... })(jQuery)` to protect the `$` alias and avoid polluting the global scope.',
    challenge: {
      question: 'Why should a jQuery plugin always return this?',
      options: [
        'To pass options back to the caller',
        'To allow method chaining on the jQuery object',
        'To trigger the ready event',
        'To register the plugin globally',
      ],
      correct: 1,
    },
    code: `<p class="highlight-me">Paragraph one — hover me!</p>
<p class="highlight-me">Paragraph two — hover me!</p>
<p class="highlight-me">Paragraph three — hover me!</p>

<script>
// Plugin definition wrapped in IIFE
(function($) {
  $.fn.hoverHighlight = function(options) {
    var settings = $.extend({
      color: '#fef08a',
      scale: '1.02',
    }, options);

    return this.each(function() {
      var $el = $(this);
      var original = $el.css('background-color');
      $el.css({ cursor: 'pointer', transition: 'all 0.2s', padding: '8px', borderRadius: '4px' });

      $el.hover(
        function() {
          $el.css({ backgroundColor: settings.color, transform: 'scale(' + settings.scale + ')' });
        },
        function() {
          $el.css({ backgroundColor: original, transform: 'scale(1)' });
        }
      );
    });
  };
})(jQuery);

$(function() {
  // Use the plugin — return this enables chaining
  $('.highlight-me')
    .hoverHighlight({ color: '#bfdbfe', scale: '1.03' })
    .css('font-size', '16px'); // chaining still works
});
</script>`,
  },

  {
    id: 'jq-plugin-options',
    chapter: 'Plugin Basics',
    title: 'Plugin with Methods',
    concept: 'Plugins that expose multiple methods use a pattern where a string argument selects the method: `$(el).myPlugin("open")`. Store per-element state with `$.data(element, key, value)` so each instance is independent. A `defaults` object merged with `$.extend()` gives callers a clean API while keeping the plugin\'s internal defaults intact.',
    code: `<div class="accordion">
  <h4 class="acc-title">Section 1 — click to toggle</h4>
  <div class="acc-body">Content for section 1. The plugin stores open/closed state per element using $.data().</div>
</div>
<div class="accordion" style="margin-top:8px">
  <h4 class="acc-title">Section 2 — click to toggle</h4>
  <div class="acc-body">Content for section 2. Each accordion instance is independent.</div>
</div>
<div style="margin-top:12px">
  <button id="open-all">Open All</button>
  <button id="close-all">Close All</button>
</div>

<script>
(function($) {
  $.fn.accordion = function(method, options) {
    var defaults = { speed: 250 };

    return this.each(function() {
      var $wrap  = $(this);
      var $title = $wrap.find('.acc-title');
      var $body  = $wrap.find('.acc-body');
      var opts   = $.extend({}, defaults, options);

      // Init on first call
      if (!$.data(this, 'accordion-init')) {
        $body.hide();
        $.data(this, 'accordion-open', false);
        $.data(this, 'accordion-init', true);
        $title.css({ cursor: 'pointer', background: '#e2e8f0', padding: '8px', borderRadius: '4px' });
        $body.css({ padding: '8px', background: '#f8fafc', borderRadius: '0 0 4px 4px' });

        $title.click(function() {
          $wrap.accordion('toggle');
        });
      }

      if (method === 'open') {
        $body.slideDown(opts.speed);
        $.data(this, 'accordion-open', true);
      } else if (method === 'close') {
        $body.slideUp(opts.speed);
        $.data(this, 'accordion-open', false);
      } else if (method === 'toggle') {
        var isOpen = $.data(this, 'accordion-open');
        $wrap.accordion(isOpen ? 'close' : 'open');
      }
    });
  };
})(jQuery);

$(function() {
  $('.accordion').accordion(); // init all

  $('#open-all').click(function()  { $('.accordion').accordion('open'); });
  $('#close-all').click(function() { $('.accordion').accordion('close'); });
});
</script>`,
  },

];
