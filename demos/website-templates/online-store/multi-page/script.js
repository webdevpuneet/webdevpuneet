(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = G && !reduce;
  document.querySelectorAll('.st').forEach(function (sec) {
    var btn = sec.querySelector('[data-menu-toggle]');
    var panel = sec.querySelector('[data-menu]');
    if (btn && panel) {
      sec.classList.add('has-menu');
      var isOpen = false;
      var mobile = function () { return getComputedStyle(btn).display !== 'none'; };
      // The toggle and the panel's controls, in document order (the toggle may come after the panel)
      var focusables = function () {
        return Array.prototype.filter.call(sec.querySelectorAll('a[href], button'), function (el) { return el === btn || panel.contains(el); });
      };
      var open = function () {
        isOpen = true;
        sec.classList.add('menu-open');
        btn.setAttribute('aria-expanded', 'true');
        if (anim) {
          G.fromTo(panel, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform,opacity' });
          G.fromTo(panel.querySelectorAll('[data-menu-item]'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, delay: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' });
        }
        var first = panel.querySelector('a[href], button');
        if (first) first.focus();
      };
      var close = function (returnFocus) {
        if (!isOpen) return;
        isOpen = false;
        btn.setAttribute('aria-expanded', 'false');
        var done = function () { sec.classList.remove('menu-open'); };
        if (anim) G.to(panel, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in', onComplete: function () { done(); G.set(panel, { clearProps: 'transform,opacity' }); } });
        else done();
        if (returnFocus) btn.focus();
      };
      btn.addEventListener('click', function () { if (isOpen) close(false); else open(); });
      document.addEventListener('keydown', function (e) {
        if (!isOpen) return;
        if (e.key === 'Escape') { close(true); return; }
        if (e.key === 'Tab') {
          var f = focusables(), first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
      document.addEventListener('click', function (e) { if (isOpen && !sec.contains(e.target)) close(false); });
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(false); });
      window.addEventListener('resize', function () { if (isOpen && !mobile()) close(false); });
    }
    sec.querySelectorAll('[data-dismiss]').forEach(function (x) {
      x.addEventListener('click', function () {
        var box = x.closest('[data-dismissable]');
        if (!box) return;
        if (anim) G.to(box, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, duration: 0.35, ease: 'power2.inOut', onComplete: function () { box.remove(); } });
        else box.remove();
      });
    });
    if (sec.querySelector('[data-sticky-flag]')) {
      var hideOn = !!sec.querySelector('[data-hide-flag]');
      var last = window.scrollY, hidden = false;
      var onScroll = function () {
        var y = window.scrollY;
        sec.classList.toggle('is-scrolled', y > 8);
        if (hideOn && !sec.classList.contains('menu-open')) {
          var down = y > last && y > 120;
          if (down !== hidden) {
            hidden = down;
            if (anim) G.to(sec, { yPercent: down ? -100 : 0, duration: 0.35, ease: 'power2.out' });
            else sec.style.transform = down ? 'translateY(-100%)' : '';
          }
        }
        last = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });
})();
(function () {
  var uid = 0;
  document.querySelectorAll('.st').forEach(function (sec) {
    var items = Array.prototype.filter.call(sec.querySelectorAll('.mm-item'), function (li) { return li.querySelector(':scope > .mm-trigger'); });
    if (!items.length) return;
    sec.classList.add('has-mega');
    var burger = sec.querySelector('[data-menu-toggle]');
    var mobile = function () { return !!burger && getComputedStyle(burger).display !== 'none'; };
    var openLi = null, timer = null;
    var triggerOf = function (li) { return li.querySelector(':scope > .mm-trigger'); };
    var setOpen = function (li, on) {
      li.classList.toggle('is-open', on);
      triggerOf(li).setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) openLi = li; else { if (openLi === li) openLi = null; li._pinned = false; }
    };
    var show = function (li) { if (openLi && openLi !== li) setOpen(openLi, false); setOpen(li, true); };
    var closeAll = function () { clearTimeout(timer); items.forEach(function (li) { if (li.classList.contains('is-open')) setOpen(li, false); }); };
    items.forEach(function (li) {
      var btn = triggerOf(li);
      var panel = li.querySelector(':scope > .mm-panel');
      if (panel) { uid++; panel.id = panel.id || 'mm-panel-' + uid; btn.setAttribute('aria-controls', panel.id); }
      li.addEventListener('pointerenter', function (e) {
        if (e.pointerType === 'touch' || mobile()) return;
        clearTimeout(timer);
        if (openLi === li) return;
        timer = setTimeout(function () { show(li); }, openLi ? 0 : 90);
      });
      li.addEventListener('pointerleave', function (e) {
        if (e.pointerType === 'touch' || mobile()) return;
        clearTimeout(timer);
        if (li._pinned || !li.classList.contains('is-open')) return;
        timer = setTimeout(function () { setOpen(li, false); }, 170);
      });
      btn.addEventListener('click', function () {
        if (!li.classList.contains('is-open')) { show(li); li._pinned = true; }
        else if (!li._pinned && !mobile()) li._pinned = true;
        else setOpen(li, false);
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowDown' || mobile()) return;
        e.preventDefault();
        show(li); li._pinned = true;
        var f = panel && panel.querySelector('a[href], button');
        if (f) f.focus();
      });
    });
    sec.addEventListener('focusout', function (e) {
      var li = openLi;
      if (li && e.relatedTarget && !li.contains(e.relatedTarget)) setOpen(li, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !openLi) return;
      var li = openLi, inside = li.contains(document.activeElement);
      setOpen(li, false);
      if (inside) triggerOf(li).focus();
    });
    document.addEventListener('click', function (e) { if (openLi && !openLi.contains(e.target)) closeAll(); });
    window.addEventListener('resize', closeAll);
    sec.querySelectorAll('[data-mega-tabs]').forEach(function (box) {
      var tabs = Array.prototype.slice.call(box.querySelectorAll('.mc-tab'));
      var panes = Array.prototype.slice.call(box.querySelectorAll('.mc-pane'));
      var activate = function (i) {
        tabs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
        panes.forEach(function (p, k) { p.classList.toggle('is-active', k === i); });
      };
      tabs.forEach(function (t, i) {
        if (panes[i]) { uid++; panes[i].id = panes[i].id || 'mm-pane-' + uid; t.setAttribute('aria-controls', panes[i].id); }
        t.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch' && !mobile()) activate(i); });
        t.addEventListener('focus', function () { activate(i); });
        t.addEventListener('click', function () { activate(i); });
        t.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
          if (!d || mobile()) return;
          e.preventDefault();
          var n = tabs[(i + d + tabs.length) % tabs.length];
          n.focus();
        });
      });
      activate(0);
    });
  });
})();
(function () {
  if (window.WDPCart) return;
  var KEY = 'wdp-cart', ORDER = 'wdp-last-order', ORDERS = 'wdp-orders', PROMO = 'wdp-promo', WISH = 'wdp-wishlist';
  var editing = !!(window.ST_STILL || window.ST_PREVIEW || window.ST_POPUP_INLINE) && !window.ST_POPUP_BUTTON;
  var mem = {}, subs = [], drawer = null;
  function get(key, d) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : d; } catch (e) { return key in mem ? mem[key] : d; } }
  function put(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { mem[key] = v; } }
  function slug(t) { return String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'item'; }
  function parse(text) {
    var m = String(text == null ? '' : text).split(' ').join('').match(/^([^0-9.,-]*)([0-9][0-9.,]*)/);
    if (!m) return { cur: '', n: 0 };
    var n = parseFloat(m[2].replace(/,/g, ''));
    return { cur: m[1] || '', n: isNaN(n) ? 0 : n };
  }
  var C = window.WDPCart = { editing: editing, parse: parse };
  C.items = function () { var l = get(KEY, []); return Array.isArray(l) ? l : []; };
  C.count = function (list) { return (list || C.items()).reduce(function (n, i) { return n + (i.qty || 0); }, 0); };
  C.subtotal = function (list) { return (list || C.items()).reduce(function (n, i) { return n + (i.price || 0) * (i.qty || 0); }, 0); };
  C.currency = function (list) { var l = list || C.items(); return (l[0] && l[0].cur) || '$'; };
  C.format = function (n, cur) { return (cur == null ? C.currency() : cur) + (Math.round(n * 100) / 100).toFixed(2); };
  function save(list) { put(KEY, list); emit(); }
  C.add = function (item, qty) {
    var list = C.items(), p = parse(item.priceText != null ? item.priceText : item.price);
    var id = item.id || slug(item.name), key = [id, item.colour || '', item.size || ''].join('|');
    var n = Math.max(1, Math.min(99, parseInt(qty || item.qty, 10) || 1));
    var line = list.filter(function (i) { return i.key === key; })[0];
    if (line) line.qty = Math.min(99, line.qty + n);
    else {
      var img = String(item.image || '');
      if (img.indexOf('data:') === 0 && img.length > 30000) img = '';
      line = { key: key, id: id, name: String(item.name || '').trim(), priceText: String(item.priceText || '').trim(), price: p.n, cur: p.cur, image: img, colour: item.colour || '', size: item.size || '', qty: n, url: item.url || '' };
      list.push(line);
    }
    save(list);
    return line;
  };
  C.remove = function (key) { save(C.items().filter(function (i) { return i.key !== key; })); };
  C.setQty = function (key, qty) {
    var q = parseInt(qty, 10) || 0;
    if (q <= 0) { C.remove(key); return; }
    var list = C.items();
    list.forEach(function (i) { if (i.key === key) i.qty = Math.min(99, q); });
    save(list);
  };
  C.clear = function () { save([]); };
  C.subscribe = function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; };
  function emit() {
    subs.forEach(function (f) { try { f(); } catch (e) { /* one listener must not stop the others */ } });
    badges();
  }
  function badges() {
    if (editing) return;
    var n = C.count(), w = C.wishlist().length;
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; el.style.display = n === 0 ? 'none' : ''; });
    document.querySelectorAll('[data-wish-count]').forEach(function (el) { el.textContent = w; el.hidden = w === 0; el.style.display = w === 0 ? 'none' : ''; });
    document.querySelectorAll('[data-wish-toggle],[data-wish-sync]').forEach(function (el) {
      var id = el.getAttribute('data-wish-id') || (cardItem(el) || {}).id;
      el.setAttribute('aria-pressed', id && C.wishHas(id) ? 'true' : 'false');
    });
  }
  C.promo = function (value) {
    if (value === undefined) return get(PROMO, null);
    put(PROMO, value);
    emit();
    return value;
  };
  C.lastOrder = function () { return get(ORDER, null); };
  C.orders = function () { var l = get(ORDERS, []); return Array.isArray(l) ? l : []; };
  C.saveOrder = function (o) {
    put(ORDER, o);
    put(ORDERS, [o].concat(C.orders().filter(function (x) { return x.id !== o.id; })).slice(0, 25));
  };
  C.wishlist = function () { var l = get(WISH, []); return Array.isArray(l) ? l : []; };
  C.wishHas = function (id) { return C.wishlist().some(function (i) { return i.id === id; }); };
  C.wishRemove = function (id) { put(WISH, C.wishlist().filter(function (i) { return i.id !== id; })); emit(); };
  C.wishToggle = function (item) {
    var id = item.id || slug(item.name), list = C.wishlist();
    if (list.some(function (i) { return i.id === id; })) { C.wishRemove(id); return false; }
    var p = parse(item.priceText), img = String(item.image || '');
    if (img.indexOf('data:') === 0 && img.length > 30000) img = '';
    list.push({ id: id, name: String(item.name || '').trim(), priceText: String(item.priceText || '').trim(), price: p.n, cur: p.cur, image: img, url: item.url || '' });
    put(WISH, list);
    emit();
    return true;
  };
  C.registerDrawer = function (d) { drawer = d; };
  C.open = function (from) { if (!drawer) return false; drawer.open(from); return true; };
  C.close = function () { if (drawer) drawer.close(); };
  /* Totals: subtotal, a percentage promo discount, shipping (flat, free over a threshold) and the total */
  C.totals = function (o) {
    o = o || {};
    var list = o.items || C.items(), sub = C.subtotal(list), pr = o.promo === undefined ? C.promo() : o.promo;
    var disc = pr && pr.pct ? Math.round(sub * pr.pct) / 100 : 0;
    var flat = parseFloat(o.shipFlat), over = parseFloat(o.freeOver);
    var ship = !list.length ? 0 : (over > 0 && sub - disc >= over) ? 0 : (flat > 0 ? flat : 0);
    return { subtotal: sub, discount: disc, shipping: ship, total: Math.max(0, sub - disc + ship), cur: C.currency(list) };
  };
  C.freeShip = function (sub, over, more, done) {
    over = parseFloat(over);
    if (!(over > 0)) return null;
    var left = over - sub;
    return { pct: Math.max(0, Math.min(100, sub / over * 100)), text: left > 0 ? String(more || '').split('{amount}').join(C.format(left)) : String(done || '') };
  };
  /* One cart row. o.edit: quantity stepper and remove button; o.demo: buttons do nothing; o.l: screen-reader labels */
  C.row = function (item, o) {
    o = o || {};
    var l = o.l || {};
    var li = document.createElement('li');
    li.className = 'wc-row';
    if (item.image) { var im = document.createElement('img'); im.className = 'wc-img'; im.alt = ''; im.width = 72; im.height = 90; im.loading = 'lazy'; im.src = item.image; li.appendChild(im); }
    else { var ph = document.createElement('span'); ph.className = 'wc-img-ph'; li.appendChild(ph); }
    var info = document.createElement('div'); info.className = 'wc-info';
    var name = document.createElement('p'); name.className = 'wc-name';
    name.textContent = item.name;
    info.appendChild(name);
    var variant = [item.colour, item.size].filter(Boolean).join(' · ');
    if (variant) { var v = document.createElement('p'); v.className = 'wc-var'; v.textContent = variant; info.appendChild(v); }
    var pr = document.createElement('p'); pr.className = 'wc-price'; pr.textContent = item.priceText; info.appendChild(pr);
    li.appendChild(info);
    var side = document.createElement('div'); side.className = 'wc-side';
    var line = document.createElement('p'); line.className = 'wc-line';
    var price = item.price != null ? item.price : parse(item.priceText).n;
    line.textContent = C.format(price * item.qty, item.cur != null && item.cur !== '' ? item.cur : parse(item.priceText).cur || '$');
    side.appendChild(line);
    if (o.edit) {
      var q = document.createElement('div'); q.className = 'wc-qty'; q.setAttribute('role', 'group'); q.setAttribute('aria-label', (l.qty || 'Quantity') + ': ' + item.name);
      var mk = function (txt, label, fn) { var b = document.createElement('button'); b.type = 'button'; b.textContent = txt; b.setAttribute('aria-label', (label || txt) + ': ' + item.name); b.addEventListener('click', function () { if (!o.demo) fn(); }); return b; };
      var n = document.createElement('span'); n.className = 'wc-n'; n.textContent = item.qty; n.setAttribute('aria-live', 'polite');
      q.appendChild(mk('\u2212', l.minus, function () { C.setQty(item.key, item.qty - 1); }));
      q.appendChild(n);
      q.appendChild(mk('+', l.plus, function () { C.setQty(item.key, item.qty + 1); }));
      side.appendChild(q);
      var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'wc-remove'; rm.textContent = l.remove || 'Remove';
      rm.setAttribute('aria-label', (l.remove || 'Remove') + ': ' + item.name);
      rm.addEventListener('click', function () { if (!o.demo) C.remove(item.key); });
      side.appendChild(rm);
    } else {
      var fq = document.createElement('p'); fq.className = 'wc-fixed-qty'; fq.textContent = (l.qty || 'Qty') + ' ' + item.qty; side.appendChild(fq);
    }
    li.appendChild(side);
    return li;
  };
  C.render = function (list, o) {
    o = o || {};
    list.textContent = '';
    (o.items || []).forEach(function (it) { list.appendChild(C.row(it, o)); });
  };
  /* Reads the row labels a section wrote onto its list element */
  C.labels = function (el) {
    var g = function (n) { return (el && el.getAttribute('data-l-' + n)) || undefined; };
    return { remove: g('remove'), minus: g('minus'), plus: g('plus'), qty: g('qty') };
  };
  C.demoItems = function (el) {
    try { var raw = el && el.getAttribute('data-demo'); var d = raw ? JSON.parse(raw) : []; return d.map(function (i, k) { var p = parse(i.priceText); return { key: 'demo' + k, name: i.name, priceText: i.priceText, price: p.n, cur: p.cur, image: i.image, colour: i.colour || '', size: i.size || '', qty: i.qty || 1 }; }); } catch (e) { return []; }
  };
  /* A small message that fades away (when there is no drawer to show the item) */
  C.toast = function (text) {
    var t = document.createElement('div');
    t.setAttribute('role', 'status');
    t.textContent = text;
    t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147482000;padding:12px 20px;border-radius:12px;background:#0f172a;color:#fff;font:600 15px/1.3 system-ui,sans-serif;box-shadow:0 12px 30px rgba(15,23,42,.3);max-width:calc(100vw - 32px)';
    document.body.appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 450); }, 2200);
  };
  /* The product a button belongs to, read from its card ([data-cart-card] or the section): name, price, image, link */
  function cardItem(el) {
    var sec = el.closest('.st'), card = el.closest('[data-cart-card]') || sec;
    if (!card) return null;
    var pick = function (a) { return card.querySelector('[data-cart-' + a + ']'); };
    var n = pick('name'), pr = pick('price'), im = pick('image');
    if (!n) return null;
    var name = n.textContent.trim();
    return { id: slug(name), name: name, priceText: pr ? pr.textContent.trim() : '', image: im ? im.getAttribute('src') : '', url: n.querySelector('a') ? n.querySelector('a').getAttribute('href') : '' };
  }
  C.cardItem = cardItem;
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var openEl = e.target.closest('[data-cart-open]');
    if (openEl && drawer) { e.preventDefault(); drawer.open(openEl); return; }
    var wt = e.target.closest('[data-wish-toggle]');
    if (wt) {
      var ws = wt.closest('.st');
      if (!ws || !ws.querySelector('[data-cart-flag]')) return;
      e.preventDefault();
      if (editing) return;
      var wi = cardItem(wt);
      if (wi) C.toast(C.wishToggle(wi) ? (wt.getAttribute('data-wish-added') || 'Saved to your wishlist') : (wt.getAttribute('data-wish-removed') || 'Removed from your wishlist'));
      return;
    }
    var add = e.target.closest('[data-cart-add]');
    if (!add) return;
    var sec = add.closest('.st');
    if (!sec || !sec.querySelector('[data-cart-flag]')) return;
    e.preventDefault();
    if (editing) return;
    var it = cardItem(add);
    if (!it) return;
    C.add(it, 1);
    if (!C.open(add)) C.toast(add.getAttribute('data-cart-added') || 'Added to cart');
  });
  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === PROMO) emit(); });
  badges();
})();
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st [data-ps]').forEach(function (root) {
    if (root.getAttribute('data-ps-ready')) return;
    root.setAttribute('data-ps-ready', '1');
    var region = root.querySelector('[data-ps-track]'), prev = root.querySelector('[data-ps-prev]'), next = root.querySelector('[data-ps-next]');
    if (!region) return;
    var by = function (dir) { region.scrollBy({ left: dir * region.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' }); };
    function update() {
      var max = region.scrollWidth - region.clientWidth - 2;
      if (prev) prev.disabled = region.scrollLeft <= 2;
      if (next) next.disabled = region.scrollLeft >= max;
      var none = max <= 0;
      if (prev) prev.hidden = none;
      if (next) next.hidden = none;
    }
    if (prev) prev.addEventListener('click', function () { by(-1); });
    if (next) next.addEventListener('click', function () { by(1); });
    region.addEventListener('keydown', function (e) {
      if (e.target !== region) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); by(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); by(-1); }
    });
    region.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!G || reduce || !fine) return;
  document.querySelectorAll('.st [data-spotlight]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      G.to(el, { '--mx': ((e.clientX - r.left) / r.width * 100) + '%', '--my': ((e.clientY - r.top) / r.height * 100) + '%', duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    });
    el.addEventListener('pointerleave', function () {
      G.to(el, { '--mx': '50%', '--my': '50%', duration: 1, ease: 'power3.out', overwrite: 'auto' });
    });
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!G || reduce || !fine) return;
  document.querySelectorAll('.st [data-magnetic]').forEach(function (el) {
    var x = G.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    var y = G.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener('pointerleave', function () { x(0); y(0); });
  });
})();
(function () {
  var NAMES = { midnight: '#1e293b', sand: '#d99a5b', forest: '#3f9d6e', white: '#ffffff', black: '#111827', grey: '#9ca3af', gray: '#9ca3af', oat: '#e7dcc8', charcoal: '#374151', brass: '#b08d57', oak: '#b98b5b', navy: '#1e3a8a', cream: '#f5efe0', stone: '#a8a29e' };
  document.querySelectorAll('.st [data-pl]').forEach(function (root) {
    if (root.getAttribute('data-pl-ready')) return;
    root.setAttribute('data-pl-ready', '1');
    var one = function (sel) { return root.querySelector(sel); };
    var attr = function (n) { return root.getAttribute('data-' + n) || ''; };
    var make = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
    var grid = one('.pl-grid');
    if (!grid) return;
    var per = Math.max(1, parseInt(attr('per'), 10) || 8);
    var num = function (v) { var m = String(v || '').split(' ').join('').match(/[0-9][0-9.,]*/); return m ? parseFloat(m[0].replace(/,/g, '')) || 0 : 0; };
    var data = Array.prototype.map.call(root.querySelectorAll('.pl-card'), function (el, i) {
      var price = num((el.querySelector('.pl-now') || {}).textContent), old = num((el.querySelector('.pl-old') || {}).textContent);
      var out = el.querySelector('[data-pl-out]');
      if (out) out.textContent = attr('out');
      return {
        el: el, i: i, price: price, sale: old > price,
        cat: (el.getAttribute('data-cat') || '').trim(),
        cols: (el.getAttribute('data-colours') || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean),
        rating: parseFloat(el.getAttribute('data-rating')) || 0,
        date: el.getAttribute('data-date') || '',
        out: el.getAttribute('data-stock') === 'out',
        text: (el.textContent + ' ' + ((el.querySelector('img') || {}).alt || '')).toLowerCase()
      };
    });
    var S = { q: '', cat: '', min: '', max: '', cols: [], rating: 0, instock: false, sale: false, sort: 'featured', shown: per };
    var search = one('[data-pl-search]'), sort = one('[data-pl-sort]'), minIn = one('[data-pl-min]'), maxIn = one('[data-pl-max]');
    var catsBox = one('[data-pl-cats]'), colBox = one('[data-pl-colours]'), colGroup = one('[data-pl-colour-group]'), ratingSel = one('[data-pl-rating]');
    var stockIn = one('[data-pl-instock]'), saleIn = one('[data-pl-sale]');
    var count = one('[data-pl-count]'), more = one('[data-pl-more]'), moreWrap = one('.pl-morewrap'), empty = one('[data-pl-empty]'), activeN = one('[data-pl-active]');
    var panel = one('[data-pl-filters]'), openBtn = one('[data-pl-open]'), closeBtn = one('[data-pl-close]'), back = one('[data-pl-backdrop]');

    /* filter controls built from the products */
    var cats = [];
    data.forEach(function (d) { if (d.cat && cats.indexOf(d.cat) < 0) cats.push(d.cat); });
    function catOption(value, label, n) {
      var l = make('label', 'pl-cat-opt'), r = make('input'); r.type = 'radio'; r.name = 'plcat-' + (root.id || 'x'); r.value = value;
      r.addEventListener('change', function () { S.cat = value; S.shown = per; apply(); });
      l.appendChild(r); l.appendChild(make('span', '', label)); l.appendChild(make('span', '', n));
      catsBox.appendChild(l);
      return r;
    }
    var catInputs = [];
    if (catsBox) {
      catInputs.push(catOption('', attr('all') || 'All', data.length));
      cats.forEach(function (c) { catInputs.push(catOption(c, c, data.filter(function (d) { return d.cat === c; }).length)); });
    }
    var colours = [];
    data.forEach(function (d) { d.cols.forEach(function (c) { if (!colours.some(function (x) { return x.toLowerCase() === c.toLowerCase(); })) colours.push(c); }); });
    if (colGroup) colGroup.hidden = !colours.length;
    colours.forEach(function (c) {
      var b = make('button', 'pl-chip'), sw = make('i'), css = NAMES[c.toLowerCase()] || ((window.CSS && CSS.supports && CSS.supports('color', c)) ? c : '#cbd5e1');
      b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.setAttribute('data-colour', c);
      sw.style.setProperty('--c', css);
      b.appendChild(sw); b.appendChild(document.createTextNode(c));
      b.addEventListener('click', function () {
        var at = S.cols.map(function (x) { return x.toLowerCase(); }).indexOf(c.toLowerCase());
        if (at >= 0) S.cols.splice(at, 1); else S.cols.push(c);
        S.shown = per; apply();
      });
      colBox.appendChild(b);
    });
    if (ratingSel) {
      [[0, attr('rating-any') || 'Any rating'], [4, (attr('rating-over') || '{n}+').split('{n}').join('4')], [3, (attr('rating-over') || '{n}+').split('{n}').join('3')]].forEach(function (o) {
        var op = make('option', '', o[1]); op.value = o[0]; ratingSel.appendChild(op);
      });
      ratingSel.addEventListener('change', function () { S.rating = parseFloat(ratingSel.value) || 0; S.shown = per; apply(); });
    }
    var prices = data.map(function (d) { return d.price; });
    if (minIn && prices.length) minIn.placeholder = String(Math.floor(Math.min.apply(null, prices)));
    if (maxIn && prices.length) maxIn.placeholder = String(Math.ceil(Math.max.apply(null, prices)));
    var timer = 0;
    var later = function (fn, ms) { clearTimeout(timer); timer = setTimeout(fn, ms); };
    if (search) search.addEventListener('input', function () { later(function () { S.q = search.value.trim().toLowerCase(); S.shown = per; apply(); }, 150); });
    if (sort) sort.addEventListener('change', function () { S.sort = sort.value; apply(); });
    var readPrice = function () { later(function () { if (minIn) S.min = minIn.value; if (maxIn) S.max = maxIn.value; S.shown = per; apply(); }, 250); };
    if (minIn) minIn.addEventListener('input', readPrice);
    if (maxIn) maxIn.addEventListener('input', readPrice);
    if (stockIn) stockIn.addEventListener('change', function () { S.instock = stockIn.checked; S.shown = per; apply(); });
    if (saleIn) saleIn.addEventListener('change', function () { S.sale = saleIn.checked; S.shown = per; apply(); });
    function clearAll() {
      S.q = ''; S.cat = ''; S.min = ''; S.max = ''; S.cols = []; S.rating = 0; S.instock = false; S.sale = false; S.shown = per;
      if (search) search.value = '';
      apply();
    }
    root.querySelectorAll('[data-pl-clear],[data-pl-clear2]').forEach(function (b) { b.addEventListener('click', clearAll); });
    if (more) more.addEventListener('click', function () {
      var before = S.shown;
      S.shown += per;
      apply();
      var first = visible[before];
      var a = first ? first.el.querySelector('a[href]') : null;
      if (a && a.focus) a.focus({ preventScroll: true });
    });

    var visible = [];
    function matches(d) {
      if (S.q && d.text.indexOf(S.q) < 0) return false;
      if (S.cat && d.cat !== S.cat) return false;
      if (S.min !== '' && !isNaN(parseFloat(S.min)) && d.price < parseFloat(S.min)) return false;
      if (S.max !== '' && !isNaN(parseFloat(S.max)) && d.price > parseFloat(S.max)) return false;
      if (S.cols.length && !S.cols.some(function (c) { return d.cols.some(function (x) { return x.toLowerCase() === c.toLowerCase(); }); })) return false;
      if (S.rating && d.rating < S.rating) return false;
      if (S.instock && d.out) return false;
      if (S.sale && !d.sale) return false;
      return true;
    }
    var order = {
      'featured': function (a, b) { return a.i - b.i; },
      'price-asc': function (a, b) { return a.price - b.price || a.i - b.i; },
      'price-desc': function (a, b) { return b.price - a.price || a.i - b.i; },
      'newest': function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : a.i - b.i; },
      'rating': function (a, b) { return b.rating - a.rating || a.i - b.i; }
    };
    function activeFilters() {
      return (S.cat ? 1 : 0) + (S.min !== '' ? 1 : 0) + (S.max !== '' ? 1 : 0) + S.cols.length + (S.rating ? 1 : 0) + (S.instock ? 1 : 0) + (S.sale ? 1 : 0);
    }
    function writeUrl() {
      var q = [];
      var add = function (k, v) { if (v !== '' && v !== false && v != null) q.push(k + '=' + encodeURIComponent(v === true ? '1' : v)); };
      add('q', S.q); add('cat', S.cat); add('min', S.min); add('max', S.max); add('colour', S.cols.join(','));
      add('rating', S.rating || ''); add('instock', S.instock); add('sale', S.sale); add('sort', S.sort === 'featured' ? '' : S.sort);
      try { history.replaceState(null, '', location.pathname + (q.length ? '?' + q.join('&') : '') + location.hash); } catch (e) { /* previews have no address */ }
    }
    function apply() {
      var matched = data.filter(matches).sort(order[S.sort] || order.featured);
      visible = matched;
      var rest = data.filter(function (d) { return matched.indexOf(d) < 0; });
      matched.concat(rest).forEach(function (d) { grid.appendChild(d.el); });
      matched.forEach(function (d, k) { d.el.hidden = k >= S.shown; });
      rest.forEach(function (d) { d.el.hidden = true; });
      var shown = Math.min(S.shown, matched.length);
      if (count) count.textContent = matched.length ? attr('count').split('{shown}').join(shown).split('{total}').join(matched.length) : '';
      if (empty) empty.hidden = matched.length > 0;
      if (moreWrap) moreWrap.hidden = shown >= matched.length;
      var n = activeFilters();
      if (activeN) activeN.textContent = n || '';
      catInputs.forEach(function (r) { r.checked = r.value === S.cat; });
      Array.prototype.forEach.call(root.querySelectorAll('.pl-chip'), function (b) {
        b.setAttribute('aria-pressed', S.cols.some(function (c) { return c.toLowerCase() === b.getAttribute('data-colour').toLowerCase(); }) ? 'true' : 'false');
      });
      if (minIn && document.activeElement !== minIn) minIn.value = S.min;
      if (maxIn && document.activeElement !== maxIn) maxIn.value = S.max;
      if (ratingSel) ratingSel.value = String(S.rating);
      if (stockIn) stockIn.checked = S.instock;
      if (saleIn) saleIn.checked = S.sale;
      if (sort) sort.value = S.sort;
      writeUrl();
    }
    /* the page address can start the page filtered */
    try {
      var qs = new URLSearchParams(location.search), get = function (k) { return qs.get(k) || ''; };
      S.q = get('q').toLowerCase(); S.cat = get('cat'); S.min = get('min'); S.max = get('max');
      S.cols = get('colour') ? get('colour').split(',').filter(Boolean) : [];
      S.rating = parseFloat(get('rating')) || 0; S.instock = get('instock') === '1'; S.sale = get('sale') === '1';
      if (order[get('sort')]) S.sort = get('sort');
      if (search) search.value = get('q');
    } catch (e) { /* no address in previews */ }

    /* phone filter panel */
    var panelOpen = false;
    var mobile = function () { return openBtn && getComputedStyle(openBtn).display !== 'none'; };
    function openPanel() { if (!panel || !mobile()) return; panelOpen = true; panel.classList.add('is-open'); if (back) back.hidden = false; var f = panel.querySelector('input,button,select'); if (f) setTimeout(function () { f.focus(); }, 60); }
    function closePanel() { if (!panelOpen) return; panelOpen = false; panel.classList.remove('is-open'); if (back) back.hidden = true; if (openBtn) openBtn.focus(); }
    if (openBtn) openBtn.addEventListener('click', openPanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (back) back.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panelOpen) closePanel(); });
    window.addEventListener('resize', function () { if (panelOpen && !mobile()) closePanel(); });
    apply();
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = G && !reduce;
  document.querySelectorAll('.st [data-accordion]').forEach(function (list) {
    var mode = list.getAttribute('data-accordion') || '';
    var items = Array.prototype.slice.call(list.querySelectorAll('details'));
    var body = function (d) { return d.querySelector('.st-acc-a'); };
    var close = function (d) {
      if (!d.open || d.classList.contains('is-closing')) return;
      if (!anim) { d.open = false; return; }
      d.classList.add('is-closing');
      G.to(body(d), { height: 0, duration: 0.32, ease: 'power2.inOut', onComplete: function () {
        d.open = false; d.classList.remove('is-closing'); G.set(body(d), { clearProps: 'height' });
      } });
    };
    var open = function (d) {
      d.open = true;
      if (!anim) return;
      var b = body(d);
      G.fromTo(b, { height: 0 }, { height: 'auto', duration: 0.4, ease: 'power2.out', clearProps: 'height' });
      G.fromTo(b.children, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, delay: 0.06, ease: 'power2.out', clearProps: 'transform,opacity' });
    };
    items.forEach(function (d) {
      d.querySelector('summary').addEventListener('click', function (e) {
        e.preventDefault();
        if (d.open && !d.classList.contains('is-closing')) { close(d); return; }
        if (/single/.test(mode)) items.forEach(function (o) { if (o !== d) close(o); });
        open(d);
      });
    });
    if (/first/.test(mode) && items[0]) items[0].open = true;
  });
})();
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st [data-pd]').forEach(function (root) {
    if (root.getAttribute('data-pd-ready')) return;
    root.setAttribute('data-pd-ready', '1');
    root.classList.add('pd-js');
    var one = function (sel) { return root.querySelector(sel); };
    var all = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };
    var lower = function (v) { return String(v || '').toLowerCase(); };
    var slides = all('.pd-slide'), thumbs = all('.pd-thumb'), stage = one('.pd-stage'), counter = one('.pd-count');
    var colours = all('.pd-colour'), colourName = one('[data-pd-colour]');
    var sizes = all('.pd-size'), sizeName = one('[data-pd-size]'), err = one('[data-pd-error]');
    var cur = 0, chosen = null;
    if (slides.length < 2) root.classList.add('is-single');

    function pickColour(btn, fromGallery) {
      colours.forEach(function (b) { b.setAttribute('aria-checked', b === btn ? 'true' : 'false'); });
      if (colourName) colourName.textContent = btn ? btn.getAttribute('data-name') || '' : '';
      if (fromGallery || !btn) return;
      var want = lower(btn.getAttribute('data-name'));
      for (var i = 0; i < slides.length; i++) {
        if (lower(slides[i].getAttribute('data-colour')) === want) { show(i, true); break; }
      }
    }
    function show(i, skipColour) {
      if (!slides.length) return;
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === cur); s.setAttribute('aria-hidden', k === cur ? 'false' : 'true'); });
      thumbs.forEach(function (t, k) { if (k === cur) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      if (counter) counter.textContent = (cur + 1) + ' / ' + slides.length;
      var c = lower(slides[cur].getAttribute('data-colour'));
      if (c && !skipColour) {
        var m = colours.filter(function (b) { return lower(b.getAttribute('data-name')) === c; })[0];
        if (m) pickColour(m, true);
      }
    }
    thumbs.forEach(function (t, i) { t.addEventListener('click', function () { show(i); }); });
    var prev = one('.pd-prev'), next = one('.pd-next');
    if (prev) prev.addEventListener('click', function () { show(cur - 1); });
    if (next) next.addEventListener('click', function () { show(cur + 1); });
    if (stage) {
      stage.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
      });
      var x0 = null;
      stage.addEventListener('pointerdown', function (e) { x0 = e.pointerType === 'mouse' ? null : e.clientX; });
      stage.addEventListener('pointerup', function (e) {
        if (x0 === null) return;
        var dx = e.clientX - x0; x0 = null;
        if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      });
      stage.addEventListener('pointercancel', function () { x0 = null; });
      stage.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = stage.getBoundingClientRect();
        stage.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        stage.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    }
    colours.forEach(function (b) { b.addEventListener('click', function () { pickColour(b, false); }); });
    sizes.forEach(function (b) {
      if (b.getAttribute('data-status') === 'out') {
        b.setAttribute('aria-disabled', 'true'); b.classList.add('is-out');
        b.setAttribute('aria-label', b.textContent.trim() + ', ' + (b.getAttribute('data-soldout') || 'sold out'));
      }
      b.addEventListener('click', function () {
        if (b.getAttribute('aria-disabled') === 'true') return;
        chosen = b;
        sizes.forEach(function (o) { o.setAttribute('aria-checked', o === b ? 'true' : 'false'); });
        if (sizeName) sizeName.textContent = b.textContent.trim();
        if (err) err.hidden = true;
      });
    });
    show(0);
    if (colours.length && !colours.some(function (b) { return b.getAttribute('aria-checked') === 'true'; })) pickColour(colours[0], true);

    var qty = one('[data-pd-qty]');
    var setQty = function (n) { n = parseInt(n, 10); if (!(n >= 1)) n = 1; if (n > 10) n = 10; if (qty) qty.value = n; };
    if (qty) {
      var minus = one('[data-pd-minus]'), plus = one('[data-pd-plus]');
      if (minus) minus.addEventListener('click', function () { setQty((parseInt(qty.value, 10) || 1) - 1); });
      if (plus) plus.addEventListener('click', function () { setQty((parseInt(qty.value, 10) || 1) + 1); });
      qty.addEventListener('change', function () { setQty(qty.value); });
    }
    var wish = one('.pd-wish');
    var cartMode = function () { return window.WDPCart && root.closest('.st').querySelector('[data-cart-flag]'); };
    var wishItem = function () {
      var nm = one('.pd-name'), pn = one('.pd-now'), shot = slides[cur] ? slides[cur].querySelector('img') : null;
      var name = nm ? nm.textContent.trim() : '';
      return { id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'item', name: name, priceText: pn ? pn.textContent.trim() : '', image: shot ? shot.getAttribute('src') : '', url: location.href };
    };
    if (wish) {
      if (cartMode()) { wish.setAttribute('data-wish-id', wishItem().id); wish.setAttribute('data-wish-sync', ''); wish.setAttribute('aria-pressed', window.WDPCart.wishHas(wishItem().id) ? 'true' : 'false'); }
      wish.addEventListener('click', function () {
        if (cartMode() && !window.WDPCart.editing) { window.WDPCart.wishToggle(wishItem()); return; }
        wish.setAttribute('aria-pressed', wish.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      });
    }

    var status = one('[data-pd-status]'), timer = 0;
    var say = function (msg) { if (!status) return; status.textContent = msg; clearTimeout(timer); timer = setTimeout(function () { status.textContent = ''; }, 4500); };
    var sizesBox = one('.pd-sizes');
    function go(a, e) {
      if (sizes.length && !chosen) {
        e.preventDefault();
        if (err) err.hidden = false;
        if (sizesBox && sizesBox.scrollIntoView) sizesBox.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        return;
      }
      var colour = colours.filter(function (b) { return b.getAttribute('aria-checked') === 'true'; })[0];
      var parts = [];
      if (colour) parts.push(colour.getAttribute('data-name'));
      if (chosen) parts.push(chosen.textContent.trim());
      var n = qty ? (parseInt(qty.value, 10) || 1) : 1;
      var cartOn = window.WDPCart && root.closest('.st').querySelector('[data-cart-flag]');
      if (cartOn) {
        e.preventDefault();
        if (window.WDPCart.editing) { say((root.getAttribute('data-added') || 'Added to cart') + ' (preview)'); return; }
        var nm = one('.pd-name'), pn = one('.pd-now'), shot = slides[cur] ? slides[cur].querySelector('img') : null;
        window.WDPCart.add({ name: nm ? nm.textContent.trim() : '', priceText: pn ? pn.textContent.trim() : '', image: shot ? shot.getAttribute('src') : '', colour: colour ? colour.getAttribute('data-name') : '', size: chosen ? chosen.textContent.trim() : '', url: location.href }, n);
        var bhref = a === buy ? a.getAttribute('href') : '';
        if (bhref && bhref !== '#') { location.href = bhref; return; }
        if (!window.WDPCart.open(a)) {
          say(root.getAttribute('data-added') || 'Added to cart');
          var vc = one('[data-pd-viewcart]');
          if (vc) vc.hidden = false;
        }
        return;
      }
      var base = a.getAttribute('data-base');
      if (base === null) { base = a.getAttribute('href') || '#'; a.setAttribute('data-base', base); }
      if (base === '#' || base === '') {
        e.preventDefault();
        say(((root.getAttribute('data-added') || 'Added to cart') + ': ' + parts.concat(['x' + n]).join(', ')));
        return;
      }
      var q = [];
      if (colour) q.push('colour=' + encodeURIComponent(colour.getAttribute('data-name')));
      if (chosen) q.push('size=' + encodeURIComponent(chosen.textContent.trim()));
      q.push('qty=' + n);
      var hashAt = base.indexOf('#'), frag = hashAt >= 0 ? base.slice(hashAt) : '', stem = hashAt >= 0 ? base.slice(0, hashAt) : base;
      a.href = stem + (stem.indexOf('?') >= 0 ? '&' : '?') + q.join('&') + frag;
    }
    var add = one('[data-pd-add]'), buy = one('[data-pd-buy]');
    if (add) add.addEventListener('click', function (e) { go(add, e); });
    if (buy) buy.addEventListener('click', function (e) { go(buy, e); });

    var sec = root.closest('.st');
    var sticky = sec ? sec.querySelector('.pd-sticky') : null;
    if (sticky && add && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { sticky.classList.toggle('is-on', !en[0].isIntersecting); }).observe(add);
      var sb = sticky.querySelector('[data-pd-sticky-add]');
      if (sb) sb.addEventListener('click', function () { add.click(); });
    }
  });
})();
(function () {
  document.querySelectorAll('.st [data-revfilter]').forEach(function (root) {
    var btns = root.querySelectorAll('[data-filter-star]');
    var cards = root.querySelectorAll('[data-rating]');
    var status = root.querySelector('[data-filter-status]');
    var msg = status && status.querySelector('[data-filter-message]');
    var clear = status && status.querySelector('[data-filter-clear]');
    if (!btns.length || !cards.length) return;
    var tpl = root.getAttribute('data-filter-text') || 'Showing {n} of {t} reviews rated {s} stars';
    if (clear) clear.textContent = root.getAttribute('data-clear-label') || 'Show all reviews';
    Array.prototype.forEach.call(btns, function (b) {
      var label = b.getAttribute('aria-label');
      if (label) b.setAttribute('aria-label', label.replace('{s}', b.getAttribute('data-star')));
    });
    var current = '';
    function apply(star) {
      current = star;
      var shown = 0;
      Array.prototype.forEach.call(cards, function (c) {
        var show = !star || String(Math.round(parseFloat(c.getAttribute('data-rating')) || 0)) === star;
        c.hidden = !show;
        if (show) shown++;
      });
      Array.prototype.forEach.call(btns, function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-star') === star)); });
      if (status) {
        status.hidden = !star;
        if (msg && star) msg.textContent = tpl.replace('{n}', shown).replace('{t}', cards.length).replace('{s}', star);
      }
    }
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () { var s = b.getAttribute('data-star'); apply(current === s ? '' : s); });
    });
    if (clear) clear.addEventListener('click', function () { apply(''); });
  });
})();
(function () {
  var C = window.WDPCart;
  if (!C) return;
  document.querySelectorAll('.st [data-cp]').forEach(function (root) {
    if (root.getAttribute('data-cp-ready')) return;
    root.setAttribute('data-cp-ready', '1');
    var one = function (sel) { return root.querySelector(sel); };
    var attr = function (n) { return root.getAttribute('data-' + n) || ''; };
    var list = one('[data-cp-items]'), empty = one('[data-cp-empty]'), back = one('[data-cp-back]');
    var free = one('[data-cp-free]'), freeText = one('[data-cp-free-text]'), freeBar = one('[data-cp-free-bar]');
    var form = one('[data-cp-promo]'), msg = one('[data-cp-promo-msg]'), codeIn = form ? form.querySelector('input') : null;
    var subEl = one('[data-cp-subtotal]'), discRow = one('[data-cp-discount-row]'), discEl = one('[data-cp-discount]');
    var shipEl = one('[data-cp-shipping]'), totEl = one('[data-cp-total]'), checkout = one('[data-cp-checkout]'), rm = one('[data-cp-promo-remove]');
    var promos = {};
    attr('promos').split('\n').forEach(function (line) {
      var at = line.lastIndexOf('|');
      if (at < 0) return;
      var code = line.slice(0, at).trim().toUpperCase(), pct = parseFloat(line.slice(at + 1));
      if (code && pct > 0) promos[code] = Math.min(100, pct);
    });
    function paint() {
      var real = C.items();
      var demo = C.editing || (window.ST_POPUP_BUTTON && !real.length);
      var items = demo ? C.demoItems(root) : real;
      var promo = demo ? null : C.promo();
      C.render(list, { items: items, edit: true, demo: demo, l: C.labels(list) });
      var tot = C.totals({ items: items, promo: promo, shipFlat: attr('ship-flat'), freeOver: attr('free-over') });
      if (subEl) subEl.textContent = C.format(tot.subtotal, tot.cur);
      if (discRow) { discRow.hidden = !tot.discount; if (discEl) discEl.textContent = '\u2212' + C.format(tot.discount, tot.cur); }
      if (shipEl) shipEl.textContent = !items.length ? '\u2014' : tot.shipping === 0 ? (attr('free-text') || 'Free') : C.format(tot.shipping, tot.cur);
      if (totEl) totEl.textContent = C.format(tot.total, tot.cur);
      list.hidden = !items.length;
      if (empty) empty.hidden = !!items.length;
      if (back) back.hidden = !items.length;
      if (checkout) checkout.setAttribute('aria-disabled', items.length ? 'false' : 'true');
      if (free) {
        var fs = items.length ? C.freeShip(tot.subtotal - tot.discount, attr('free-over'), attr('free-more'), attr('free-done')) : null;
        free.hidden = !fs;
        if (fs) { if (freeText) freeText.textContent = fs.text; if (freeBar) freeBar.style.width = fs.pct.toFixed(1) + '%'; }
      }
    }
    function say(text, good) { if (!msg) return; msg.textContent = text; msg.classList.toggle('is-ok', !!good); msg.classList.toggle('is-bad', !good && !!text); }
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var code = (codeIn.value || '').trim().toUpperCase();
        if (!code) return;
        if (promos[code]) {
          if (!C.editing) C.promo({ code: code, pct: promos[code] });
          say(attr('promo-ok').split('{code}').join(code), true);
          codeIn.value = '';
        } else say(attr('promo-bad'), false);
      });
    }
    if (rm) rm.addEventListener('click', function () { C.promo(null); say('', true); });
    if (!C.editing) C.subscribe(paint);
    paint();
  });
})();
(function () {
  var C = window.WDPCart;
  if (!C) return;
  document.querySelectorAll('.st [data-ck]').forEach(function (root) {
    if (root.getAttribute('data-ck-ready')) return;
    root.setAttribute('data-ck-ready', '1');
    var one = function (sel) { return root.querySelector(sel); };
    var attr = function (n) { return root.getAttribute('data-' + n) || ''; };
    var form = one('[data-ck-form]'), list = one('[data-ck-items]'), empty = one('[data-ck-empty]'), sum = one('[data-ck-sum]');
    var err = one('[data-ck-error]'), place = one('[data-ck-place]'), note = one('[data-ck-preview]');
    var methods = Array.prototype.slice.call(root.querySelectorAll('input[name=shipping]'));
    var pays = Array.prototype.slice.call(root.querySelectorAll('input[name=payment]'));
    var subEl = one('[data-ck-subtotal]'), discRow = one('[data-ck-discount-row]'), discEl = one('[data-ck-discount]');
    var shipEl = one('[data-ck-shipping]'), totEl = one('[data-ck-total]');
    var sandbox = C.editing || !!window.ST_POPUP_BUTTON;
    if (methods[0]) methods[0].checked = true;
    if (pays[0]) pays[0].checked = true;
    var picked = function (group) { return group.filter(function (i) { return i.checked; })[0]; };
    var cost = function () { var m = picked(methods); return m ? parseFloat(m.getAttribute('data-cost')) || 0 : 0; };
    function current() {
      var real = C.items();
      var demo = C.editing || (window.ST_POPUP_BUTTON && !real.length);
      return { demo: demo, items: demo ? C.demoItems(root) : real };
    }
    /* The free-shipping threshold applies to the first shipping method (standard delivery) only */
    function totals(items, demo) { return C.totals({ items: items, promo: demo ? null : C.promo(), shipFlat: cost(), freeOver: picked(methods) === methods[0] ? attr('free-over') : 0 }); }
    function paint() {
      var cur = current(), tot = totals(cur.items, cur.demo);
      C.render(list, { items: cur.items, edit: false, l: C.labels(list) });
      var base = C.totals({ items: cur.items, promo: cur.demo ? null : C.promo(), shipFlat: 0, freeOver: 0 }), over = parseFloat(attr('free-over'));
      methods.forEach(function (m, k) {
        var c = parseFloat(m.getAttribute('data-cost')) || 0, out = m.closest('label').querySelector('[data-ck-cost]');
        var free = c <= 0 || (k === 0 && over > 0 && base.subtotal - base.discount >= over);
        if (out) out.textContent = free ? (attr('free-text') || 'Free') : C.format(c, tot.cur);
      });
      if (subEl) subEl.textContent = C.format(tot.subtotal, tot.cur);
      if (discRow) { discRow.hidden = !tot.discount; if (discEl) discEl.textContent = '\u2212' + C.format(tot.discount, tot.cur); }
      if (shipEl) shipEl.textContent = tot.shipping === 0 ? (attr('free-text') || 'Free') : C.format(tot.shipping, tot.cur);
      if (totEl) totEl.textContent = C.format(tot.total, tot.cur);
      list.hidden = !cur.items.length;
      if (sum) sum.hidden = !cur.items.length;
      if (empty) empty.hidden = !!cur.items.length;
      if (place) place.disabled = !cur.items.length;
    }
    methods.forEach(function (m) { m.addEventListener('change', paint); });
    function build(items) {
      var tot = totals(items, false), data = new FormData(form), g = function (k) { return String(data.get(k) || '').trim(); };
      var m = picked(methods), pay = picked(pays);
      return {
        id: (attr('prefix') || 'WD') + '-' + (Math.floor(Math.random() * 90000) + 10000),
        date: new Date().toISOString(),
        status: '',
        cur: tot.cur, subtotal: tot.subtotal, discount: tot.discount, shipping: tot.shipping, total: tot.total,
        promo: C.promo() ? C.promo().code : '',
        email: g('email'), phone: g('phone'), name: g('name'),
        address: [g('name'), g('address'), (g('city') + ' ' + g('postcode')).trim(), g('country')].filter(Boolean).join(', '),
        method: m ? m.value : '', payment: pay ? pay.value : '', note: g('note'),
        items: items.map(function (i) { return { name: i.name, priceText: i.priceText, price: i.price, cur: i.cur, image: i.image, colour: i.colour, size: i.size, qty: i.qty, url: i.url }; })
      };
    }
    function text(o) {
      var lines = ['New order ' + o.id, ''];
      o.items.forEach(function (i) { lines.push(i.qty + ' x ' + i.name + (i.colour || i.size ? ' (' + [i.colour, i.size].filter(Boolean).join(', ') + ')' : '') + ' - ' + C.format(i.price * i.qty, o.cur)); });
      lines.push('', 'Total: ' + C.format(o.total, o.cur) + ' (shipping ' + C.format(o.shipping, o.cur) + ')', 'Delivery: ' + o.method, 'Payment: ' + o.payment, '', o.address, o.email + (o.phone ? ' / ' + o.phone : ''));
      if (o.note) lines.push('', 'Note: ' + o.note);
      return lines.join('\n');
    }
    function busy(on) { if (!place) return; if (on) place.setAttribute('aria-busy', 'true'); else place.removeAttribute('aria-busy'); place.disabled = on; }
    function finish(o, url) {
      C.saveOrder(o);
      C.clear();
      C.promo(null);
      if (url && url !== '#') location.href = url;
      else { busy(false); if (err) { err.classList.remove('is-bad'); err.classList.add('is-ok'); err.textContent = o.id; } }
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (err) { err.textContent = ''; err.classList.add('is-bad'); err.classList.remove('is-ok'); }
      if (sandbox) { if (note) { note.hidden = false; note.textContent = attr('preview'); } return; }
      var real = C.items();
      if (!real.length) return;
      var trap = form.querySelector('[name=_gotcha]');
      if (trap && trap.value) return;
      var order = build(real), mode = attr('mode'), done = attr('done');
      busy(true);
      if (mode === 'whatsapp') {
        var digits = attr('whatsapp').split('').filter(function (c) { return c >= '0' && c <= '9'; }).join('');
        window.open('https://wa.me/' + digits + '?text=' + encodeURIComponent(text(order)), '_blank', 'noopener');
        finish(order, done);
      } else if (mode === 'link') {
        finish(order, attr('pay-url') || done);
      } else {
        var payload = JSON.parse(JSON.stringify(order));
        payload.items.forEach(function (i) { delete i.image; });
        fetch(attr('action'), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
          .then(function (r) { if (!r.ok) throw new Error(String(r.status)); finish(order, done); })
          .catch(function () { busy(false); if (err) err.textContent = attr('error'); });
      }
    });
    if (!C.editing) C.subscribe(paint);
    paint();
  });
})();
(function () {
  var C = window.WDPCart;
  if (!C) return;
  var live = !(window.ST_STILL || window.ST_PREVIEW || window.ST_POPUP_INLINE);
  document.querySelectorAll('.st [data-oc]').forEach(function (root) {
    if (root.getAttribute('data-oc-ready')) return;
    root.setAttribute('data-oc-ready', '1');
    var one = function (sel) { return root.querySelector(sel); };
    var set = function (sel, v) { var el = one(sel); if (el) el.textContent = v; };
    var main = one('[data-oc-main]'), none = one('[data-oc-none]'), list = one('[data-oc-items]');
    var order = live ? C.lastOrder() : null;
    if (!order && !live) {
      var items = C.demoItems(root), tot = C.totals({ items: items, promo: null, shipFlat: 0, freeOver: 0 });
      order = { id: 'WD-48213', date: new Date().toISOString(), email: 'sam@example.com', name: 'Sam Rivera', cur: tot.cur, subtotal: tot.subtotal, discount: 0, shipping: 0, total: tot.total, address: 'Sam Rivera, 14 Elm Street, Leeds LS1 4AB, United Kingdom', method: 'Standard delivery', payment: 'Pay online', items: items };
    }
    if (!order) { if (main) main.hidden = true; if (none) none.hidden = false; return; }
    if (none) none.hidden = true;
    var first = String(order.name || '').split(' ')[0];
    if (live) {
      root.querySelectorAll('[data-oc-fill]').forEach(function (el) {
        el.textContent = el.textContent.split('{name}').join(first).split('{order}').join(order.id).split('{email}').join(order.email || '');
      });
    }
    C.render(list, { items: order.items || [], edit: false, l: C.labels(list) });
    var cur = order.cur || '$', fmt = function (n) { return C.format(n, cur); };
    set('[data-oc-subtotal]', fmt(order.subtotal));
    var dr = one('[data-oc-discount-row]');
    if (dr) { dr.hidden = !order.discount; set('[data-oc-discount]', '\u2212' + fmt(order.discount || 0)); }
    set('[data-oc-shipping]', order.shipping ? fmt(order.shipping) : (root.getAttribute('data-free-text') || 'Free'));
    set('[data-oc-total]', fmt(order.total));
    set('[data-oc-id]', order.id || '');
    set('[data-oc-date]', order.date ? new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '');
    set('[data-oc-email]', order.email || '');
    set('[data-oc-address]', order.address || '');
    set('[data-oc-method]', order.method || '');
    set('[data-oc-payment]', order.payment || '');
  });
})();
(function () {
  var C = window.WDPCart;
  if (!C) return;
  var el = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  document.querySelectorAll('.st [data-oh]').forEach(function (root) {
    if (root.getAttribute('data-oh-ready')) return;
    root.setAttribute('data-oh-ready', '1');
    var attr = function (n) { return root.getAttribute('data-' + n) || ''; };
    var list = root.querySelector('[data-oh-list]'), empty = root.querySelector('[data-oh-empty]');
    function demoOrders() {
      try {
        return JSON.parse(root.getAttribute('data-demo-orders') || '[]').map(function (o) {
          o.items = o.items.map(function (i, k) { var p = C.parse(i.priceText); return { key: 'd' + k, name: i.name, priceText: i.priceText, price: p.n, cur: p.cur, image: i.image, colour: i.colour || '', size: i.size || '', qty: i.qty || 1 }; });
          return o;
        });
      } catch (e) { return []; }
    }
    function card(o, demo) {
      var li = el('li', 'cx-card oh-card'), cur = o.cur || '$', fmt = function (n) { return C.format(n, cur); };
      var top = el('div', 'oh-top'), meta = el('dl', 'oh-meta');
      var add = function (dt, dd) { var d = el('div'); d.appendChild(el('dt', '', dt)); d.appendChild(el('dd', '', dd)); meta.appendChild(d); };
      add(attr('order') || 'Order', o.id);
      add(attr('date') || 'Date', o.date ? new Date(o.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '');
      add(attr('total') || 'Total', fmt(o.total));
      top.appendChild(meta);
      var status = o.status || attr('status');
      top.appendChild(el('span', 'oh-status' + (/deliver/i.test(status) ? ' is-done' : ''), status));
      li.appendChild(top);
      var thumbs = el('div', 'oh-thumbs');
      (o.items || []).slice(0, 5).forEach(function (i) { if (i.image) { var im = el('img', 'oh-thumb'); im.alt = ''; im.loading = 'lazy'; im.src = i.image; thumbs.appendChild(im); } });
      var n = C.count(o.items || []);
      thumbs.appendChild(el('span', 'oh-count', attr('items').split('{n}').join(n)));
      li.appendChild(thumbs);
      var det = el('details', 'oh-details');
      det.appendChild(el('summary', '', attr('details') || 'View details'));
      var body = el('div', 'oh-body'), rows = el('ul', 'wc-list');
      C.render(rows, { items: o.items || [], edit: false, l: C.labels(list) });
      body.appendChild(rows);
      var side = el('div'), ship = el('div', 'oh-ship');
      ship.appendChild(el('strong', '', attr('shipto') || 'Delivered to'));
      [o.address, o.method, o.payment].filter(Boolean).forEach(function (line) { ship.appendChild(el('div', '', line)); });
      side.appendChild(ship);
      var sum = el('div', 'wc-sum'), srow = function (label, value, total) { var r = el('div', 'wc-sum-row' + (total ? ' is-total' : '')); r.appendChild(el('span', '', label)); r.appendChild(el('strong', '', value)); sum.appendChild(r); };
      srow(attr('sub') || 'Subtotal', fmt(o.subtotal));
      if (o.discount) srow(attr('disc') || 'Discount', '\u2212' + fmt(o.discount));
      srow(attr('ship') || 'Shipping', o.shipping ? fmt(o.shipping) : (attr('free-text') || 'Free'));
      srow(attr('total') || 'Total', fmt(o.total), true);
      side.appendChild(sum);
      body.appendChild(side);
      det.appendChild(body);
      li.appendChild(det);
      var actions = el('div', 'oh-actions');
      var re = el('button', 'st-btn', attr('reorder') || 'Order again');
      re.type = 'button';
      re.addEventListener('click', function () {
        if (demo) return;
        (o.items || []).forEach(function (i) { C.add(i, i.qty); });
        if (!C.open(re)) { var u = attr('cart-url'); if (u) location.href = u; }
      });
      actions.appendChild(re);
      if (attr('track') && attr('track-url')) {
        var tr = el('a', 'st-btn st-btn--ghost', attr('track'));
        tr.href = attr('track-url') + (attr('track-url').indexOf('?') >= 0 ? '&' : '?') + 'order=' + encodeURIComponent(o.id);
        actions.appendChild(tr);
      }
      li.appendChild(actions);
      return li;
    }
    function paint() {
      var real = C.orders(), demo = C.editing || (window.ST_POPUP_BUTTON && !real.length);
      var orders = demo ? demoOrders() : real;
      list.textContent = '';
      orders.forEach(function (o) { list.appendChild(card(o, demo)); });
      list.hidden = !orders.length;
      if (empty) empty.hidden = !!orders.length;
    }
    paint();
  });
})();
(function () {
  var C = window.WDPCart;
  if (!C) return;
  var el = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  document.querySelectorAll('.st [data-wl]').forEach(function (root) {
    if (root.getAttribute('data-wl-ready')) return;
    root.setAttribute('data-wl-ready', '1');
    var attr = function (n) { return root.getAttribute('data-' + n) || ''; };
    var list = root.querySelector('[data-wl-list]'), empty = root.querySelector('[data-wl-empty]'), all = root.querySelector('[data-wl-all]');
    var demoMode = false, shown = [];
    function addItems(items, from) {
      items.forEach(function (i) { C.add({ id: i.id, name: i.name, priceText: i.priceText, image: i.image, url: i.url }, 1); });
      if (!C.open(from)) C.toast(attr('added') || 'Added to cart');
    }
    function card(i) {
      var li = el('li', 'wl-card'), media = el('a', 'wl-media');
      media.href = i.url || '#';
      media.tabIndex = -1;
      if (i.image) { var im = el('img', 'wl-img'); im.alt = ''; im.loading = 'lazy'; im.src = i.image; media.appendChild(im); }
      li.appendChild(media);
      var body = el('div', 'wl-body'), h = el('h3', 'wl-name');
      if (i.url) { var a = el('a', '', i.name); a.href = i.url; h.appendChild(a); } else h.textContent = i.name;
      body.appendChild(h);
      body.appendChild(el('p', 'wl-price', i.priceText));
      var add = el('button', 'st-btn wl-add', attr('add') || 'Add to cart');
      add.type = 'button';
      add.addEventListener('click', function () { if (!demoMode) addItems([i], add); });
      body.appendChild(add);
      var rm = el('button', 'wl-remove', attr('remove') || 'Remove');
      rm.type = 'button';
      rm.setAttribute('aria-label', (attr('remove') || 'Remove') + ': ' + i.name);
      rm.addEventListener('click', function () { if (!demoMode) C.wishRemove(i.id); });
      body.appendChild(rm);
      li.appendChild(body);
      return li;
    }
    function paint() {
      var real = C.wishlist();
      demoMode = C.editing || (window.ST_POPUP_BUTTON && !real.length);
      shown = demoMode ? C.demoItems(root).map(function (i) { i.id = i.key; return i; }) : real;
      list.textContent = '';
      shown.forEach(function (i) { list.appendChild(card(i)); });
      list.hidden = !shown.length;
      if (empty) empty.hidden = !!shown.length;
      if (all) all.hidden = !shown.length;
    }
    if (all) all.addEventListener('click', function () { if (!demoMode) addItems(shown, all); });
    if (!C.editing) C.subscribe(paint);
    paint();
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.st form[data-form]').forEach(function (form) {
    var ok = form.querySelector('[data-form-success]');
    var bad = form.querySelector('[data-form-error]');
    var btn = form.querySelector('[type="submit"]');
    var done = function () {
      var fields = form.querySelectorAll('[data-form-fields]');
      var show = function () {
        Array.prototype.forEach.call(fields, function (f) { f.hidden = true; });
        if (ok) { ok.hidden = false; ok.focus && ok.focus(); if (G && !reduce) G.from(ok, { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' }); }
      };
      if (G && !reduce && fields.length) G.to(fields, { opacity: 0, y: -10, duration: 0.25, onComplete: show }); else show();
    };
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      if (bad) bad.hidden = true;
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      var finish = function () { if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); } };
      if (window.ST_PREVIEW) { setTimeout(function () { finish(); done(); }, 600); return; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { finish(); if (r.ok) done(); else if (bad) bad.hidden = false; })
        .catch(function () { finish(); if (bad) bad.hidden = false; });
    });
  });
})();
(function () {
  // The part of this frame you can see when it sits inside a scrolling panel of the editor
  // (null on a normal page): { top, bottom } in the frame's own pixels
  function seenRange() {
    var fe = null, pw = null;
    try { fe = window.frameElement; pw = window.parent; } catch (err) { return null; }
    if (!fe || !pw || pw === window) return null;
    try {
      var r = fe.getBoundingClientRect(), k = r.width / (window.innerWidth || r.width) || 1;
      var top = 0, bottom = pw.innerHeight;
      for (var n = fe.parentElement; n; n = n.parentElement) {
        if (/(auto|scroll|hidden|clip)/.test(pw.getComputedStyle(n).overflowY)) {
          var nr = n.getBoundingClientRect();
          top = Math.max(top, nr.top); bottom = Math.min(bottom, nr.bottom);
        }
      }
      return { top: Math.max(0, top - r.top) / k, bottom: (Math.min(bottom, r.bottom) - r.top) / k };
    } catch (err) { return null; }
  }
  // Scrolls to a section. Inside the editor's preview frame, scrollIntoView would also scroll
  // containers the user cannot scroll back (overflow: hidden), so the panel that really
  // scrolls is moved instead
  function goTo(block, behavior) {
    var fe = null, pw = null;
    try { fe = window.frameElement; pw = window.parent; } catch (err) { fe = null; }
    if (fe && pw && pw !== window && (window.ST_STILL || window.ST_PREVIEW)) {
      try {
        var fr = fe.getBoundingClientRect(), k = fr.width / (window.innerWidth || fr.width) || 1;
        var y = fr.top + block.getBoundingClientRect().top * k;
        var gap = (parseFloat(block.style.scrollMarginTop) || 24) * k;
        var sc = null;
        for (var n = fe.parentElement; n; n = n.parentElement) {
          if (/(auto|scroll)/.test(pw.getComputedStyle(n).overflowY) && n.scrollHeight > n.clientHeight + 1) { sc = n; break; }
        }
        if (sc) sc.scrollTo({ top: sc.scrollTop + (y - sc.getBoundingClientRect().top - gap), behavior: behavior });
        else pw.scrollTo({ top: pw.scrollY + y - gap, behavior: behavior });
        return;
      } catch (err) { /* fall back to scrollIntoView */ }
    }
    block.scrollIntoView({ behavior: behavior, block: 'start' });
  }
  document.querySelectorAll('.st [data-toc]').forEach(function (toc) {
    var list = toc.querySelector('[data-toc-list]');
    var sec = toc.closest('.st');
    var source = sec && sec.querySelector('[data-toc-source]');
    if (!list || !source) return;
    var used = {}, links = [], blocks = [];
    source.querySelectorAll('h2').forEach(function (h) {
      var block = h.closest('section') || h.parentNode;
      var text = h.textContent.trim();
      if (!text) return;
      var slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
      var id = slug, n = 2;
      while (used[id] || document.getElementById(id)) { id = slug + '-' + n++; }
      used[id] = true;
      block.id = id;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = text;
      // Slide to the section (the editor keeps links from navigating, so the script does it)
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        goTo(block, reduce ? 'auto' : 'smooth');
        if (!window.ST_STILL && !window.ST_PREVIEW && window.history && history.replaceState) history.replaceState(null, '', '#' + id);
      });
      li.appendChild(a);
      list.appendChild(li);
      links.push(a); blocks.push(block);
    });
    if (!links.length) return;
    toc.hidden = false;
    // A sticky header above this section (a sticky navbar): the contents list and the
    // sections' scroll position sit below it, whatever its height is at the moment
    var lastGap = -1;
    function clearHeader() {
      var h = 0;
      document.querySelectorAll('.st').forEach(function (el) {
        if (el === sec) return;
        var cs = getComputedStyle(el);
        if (cs.position !== 'sticky') return;
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top <= (parseFloat(cs.top) || 0) + 1) h = Math.max(h, r.bottom);
      });
      return Math.round(h);
    }
    function place() {
      var gap = clearHeader() + 24;
      if (gap === lastGap) return;
      lastGap = gap;
      toc.style.top = gap + 'px';
      blocks.forEach(function (b) { b.style.scrollMarginTop = gap + 'px'; });
    }
    place();
    var queued = false;
    function queue() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; place(); }); }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    // In the editor the preview is a tall frame inside a scrolling panel, so CSS sticky has
    // nothing to stick to: follow the panel's scroll by hand
    if (window.ST_STILL || window.ST_PREVIEW) {
      var parentWin = null;
      try { parentWin = window.parent !== window && window.frameElement ? window.parent : null; } catch (err) { parentWin = null; }
      if (parentWin) {
        var follow = function () {
          if (getComputedStyle(toc).position !== 'sticky') { toc.style.transform = ''; return; }
          var range = seenRange();
          if (!range) return;
          var box = toc.parentNode;
          toc.style.transform = '';
          var base = box.getBoundingClientRect().top;
          var max = Math.max(0, box.offsetHeight - toc.offsetHeight);
          toc.style.transform = 'translateY(' + Math.round(Math.min(max, Math.max(0, range.top + lastGap - base))) + 'px)';
        };
        try { parentWin.addEventListener('scroll', follow, true); parentWin.addEventListener('resize', follow); } catch (err) { /* cross-origin parent */ }
        follow();
      }
    }
    if (window.ST_STILL || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = blocks.indexOf(en.target);
        links.forEach(function (l, k) { l.classList.toggle('is-current', k === i); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    blocks.forEach(function (b) { io.observe(b); });
  });
})();
(function () {
  var G = window.gsap;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (G && window.ScrollToPlugin) G.registerPlugin(ScrollToPlugin);
  document.querySelectorAll('.st [data-totop]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (G && window.ScrollToPlugin && !reduce) G.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' });
      else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
(function () {
  var C = window.WDPCart;
  if (!C) return;
  var inline = window.ST_STILL || window.ST_PREVIEW || window.ST_POPUP_INLINE;
  var btnMode = !!window.ST_POPUP_BUTTON;
  var demoOnly = inline && !btnMode;
  document.querySelectorAll('.st [data-cd]').forEach(function (root) {
    if (root.getAttribute('data-cd-ready')) return;
    root.setAttribute('data-cd-ready', '1');
    var panel = root.querySelector('.cd-panel'), list = root.querySelector('[data-cd-items]'), empty = root.querySelector('[data-cd-empty]');
    var foot = root.querySelector('[data-cd-foot]'), sub = root.querySelector('[data-cd-subtotal]'), free = root.querySelector('[data-cd-free]');
    var freeText = root.querySelector('[data-cd-free-text]'), freeBar = root.querySelector('[data-cd-free-bar]');
    var fab = root.querySelector('[data-cd-fab]'), fabN = root.querySelector('[data-cd-fab-n]');
    if (!panel || !list) return;
    var isOpen = false, opener = null, overflow = '';
    function paint() {
      var real = C.items();
      var demo = demoOnly || (btnMode && !real.length);
      var items = demo ? C.demoItems(root) : real;
      C.render(list, { items: items, edit: true, demo: demo, l: C.labels(list) });
      var sum = C.subtotal(items);
      if (sub) sub.textContent = C.format(sum, C.currency(items));
      list.hidden = !items.length;
      if (empty) empty.hidden = !!items.length;
      if (foot) foot.hidden = !items.length;
      if (free) {
        var fs = items.length ? C.freeShip(sum, root.getAttribute('data-free-over'), root.getAttribute('data-free-more'), root.getAttribute('data-free-done')) : null;
        free.hidden = !fs;
        if (fs) { if (freeText) freeText.textContent = fs.text; if (freeBar) freeBar.style.width = fs.pct.toFixed(1) + '%'; }
      }
      if (fabN) fabN.textContent = C.count(items) || '';
    }
    function focusables() { return Array.prototype.slice.call(panel.querySelectorAll('a[href], button:not([disabled])')).filter(function (el) { return !el.hidden && el.offsetParent !== null; }); }
    function openDrawer(from) {
      if (demoOnly) return;
      opener = from || document.activeElement;
      paint();
      isOpen = true;
      root.classList.add('is-open');
      overflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      setTimeout(function () { var c = panel.querySelector('.cd-close'); if (c) c.focus(); }, 60);
    }
    function closeDrawer() {
      if (!isOpen) return;
      isOpen = false;
      root.classList.remove('is-open');
      document.documentElement.style.overflow = overflow;
      if (opener && opener.focus) opener.focus();
    }
    root.querySelectorAll('[data-cd-close]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
    panel.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a[href]') && isOpen) closeDrawer(); });
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    if (demoOnly) root.classList.add('is-preview');
    else {
      C.registerDrawer({ open: openDrawer, close: closeDrawer });
      if (btnMode) { root.classList.add('is-btn'); if (fab) fab.addEventListener('click', function () { openDrawer(fab); }); }
      C.subscribe(function () { paint(); });
    }
    paint();
  });
})();
(function () {
  if (!window.gsap) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var TEXT = window.SplitText ? {"split":"words","part":"words","mask":"words","vars":{"yPercent":110,"stagger":0.06,"duration":0.8}} : null;
  if (TEXT) gsap.registerPlugin(SplitText);
  function run() {
    document.querySelectorAll('.st:not([data-scroll])').forEach(function (section) {
      var heads = TEXT ? section.querySelectorAll('[data-anim-text]') : [];
      var items = section.querySelectorAll(heads.length ? '[data-anim="item"]:not([data-anim-text])' : '[data-anim="item"]');
      var media = section.querySelectorAll('[data-anim="media"]');
      var tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.80 },
        scrollTrigger: window.ScrollTrigger ? (window.ST_PREVIEW ? { trigger: section, start: 'top 80%', end: function () { var pin = ScrollTrigger.getAll().filter(function (t) { return t.pin === section; })[0]; return pin ? pin.end + section.offsetHeight : 'bottom top'; }, toggleActions: 'play reset play reset' } : { trigger: section, start: 'top 80%', once: true }) : undefined
      });
      Array.prototype.forEach.call(heads, function (el, i) {
        var opts = { type: TEXT.split };
        if (TEXT.mask) opts.mask = TEXT.mask;
        var parts = SplitText.create(el, opts)[TEXT.part];
        // The mask clips each line or word to its line box, which cuts off descenders (g, y, p):
        // give the mask a little room below and take it back with a negative margin
        if (TEXT.mask) Array.prototype.forEach.call(parts, function (p) { var m = p.parentElement; if (m && m !== el) { m.style.paddingBottom = '.22em'; m.style.marginBottom = '-.22em'; } });
        tl.from(parts, Object.assign({}, TEXT.vars), i ? '<0.1' : 0);
      });
      if (items.length) tl.from(items, {"y":28,"opacity":0,"stagger":0.09,"clearProps":"transform,opacity"}, heads.length ? '<0.2' : 0);
      if (media.length) tl.from(media, {"y":40,"opacity":0,"duration":1.1,"clearProps":"transform,opacity"}, items.length || heads.length ? '<0.15' : 0);
    });
  }
  // Split text only after the fonts load, so lines break where they finally will
  if (TEXT && document.fonts && document.fonts.ready) document.fonts.ready.then(run); else run();
})();
