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
