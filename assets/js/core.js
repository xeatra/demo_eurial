/* Eurial group demo — core: language, helpers, header (group bar + brand bar), footer, cards, forms, lead inbox */
(function () {
  const SP = window.SP, G = SP.GROUP;
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  SP.$ = $; SP.$$ = $$;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  SP.esc = esc;
  SP.param = k => new URLSearchParams(location.search).get(k);
  const store = { get(k, d) { try { const v = localStorage.getItem('eg_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem('eg_' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } } };
  SP.store = store;

  /* language RO (default) / EN */
  SP.lang = (SP.param('lang') || store.get('lang', 'ro')) === 'en' ? 'en' : 'ro';
  if (SP.param('lang')) store.set('lang', SP.lang);
  document.documentElement.lang = SP.lang;
  const T = (ro, en) => SP.lang === 'en' ? en : ro;
  const X = a => Array.isArray(a) ? (SP.lang === 'en' ? a[1] : a[0]) : a;
  SP.T = T; SP.X = X;

  SP.eur = n => n == null ? '—' : Math.round(n).toLocaleString('ro-RO') + '\u00a0€';
  SP.brand = id => SP.BRANDS.find(b => b.id === id);
  SP.loc = id => SP.LOCATIONS.find(l => l.id === id);
  SP.brandLocs = b => SP.LOCATIONS.filter(l => l.brands.includes(b));
  SP.ext = 'target="_blank" rel="noopener"';
  SP.bhref = b => b.site ? 'href="' + b.site + '" ' + SP.ext : 'href="' + b.page + '"';
  SP.today = () => (new Date().getDay() + 6) % 7;
  SP.isOpen = () => { const d = new Date(), wd = d.getDay(), h = d.getHours() + d.getMinutes() / 60; return wd >= 1 && wd <= 5 ? h >= 8 && h < 18 : wd === 6 ? h >= 9 && h < 14 : false; };
  SP.maps = q => 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=14&output=embed';
  SP.dir = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

  /* icons */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', down: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    car: '<path d="M5 17h14M3 17v-4l2.2-5.2A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.3L21 13v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>', sparkle: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.2-6"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>', cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/>', fuel: '<path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17M3 22h12M15 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3M7 8h4"/>',
    gear: '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v8M12 8v8M18 8v4H6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>', info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>', building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1"/>'
  };
  const I = (n, c) => '<svg class="ico' + (c ? ' ' + c : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || '') + '</svg>';
  SP.I = I;

  /* logo: Sales Partner (demo) — in production the group logo */
  SP.logo = () => '<img src="https://salespartner.app/logo.svg" alt="Sales Partner" width="95" height="34" onerror="this.outerHTML=\'<b>SALES PARTNER</b>\'"><span><b>EURIAL</b><small>Peugeot · Citroën · DS · Opel · Omoda & Jaecoo</small></span>';

  /* header */
  const NAV = [['home', T('Acasă', 'Home'), 'index.html'], ['models', T('Modele', 'Models'), 'modele.html'], ['stock', T('Stoc', 'Stock'), 'stoc.html'], ['offers', T('Oferte', 'Offers'), 'oferte.html'],
    ['service', T('Service', 'Service'), 'service.html'], ['services', T('Servicii', 'Services'), 'servicii.html'], ['locations', T('Locații', 'Locations'), 'locatii.html'], ['contact', T('Contact', 'Contact'), 'contact.html']];
  SP.header = function (page) {
    const act = { location: 'locations', brand: 'models', article: 'home' }[page] || page;
    const open = SP.isOpen();
    return '<div class="topbar"><div class="wrap topbar__in"><span class="topbar__l">' + I('building') + ' ' + T('7 locații: București, Ilfov, Brașov, Cluj, Pitești, Ploiești', '7 locations: Bucharest, Ilfov, Brașov, Cluj, Pitești, Ploiești') + '</span><span class="topbar__r">' +
      '<span><i class="dot' + (open ? ' is-open' : '') + '"></i>' + (open ? T('Deschis acum', 'Open now') : T('Închis acum', 'Closed now')) + '</span>' +
      '<a href="tel:0219160">' + I('phone') + 'Call center ' + G.callCenter + '</a>' +
      '<a href="' + G.portal + '" ' + SP.ext + '>' + I('user') + T('Contul meu', 'My account') + '</a>' +
      '<span class="lang" role="group" aria-label="Language"><button type="button" data-lang="ro" aria-pressed="' + (SP.lang === 'ro') + '">RO</button><button type="button" data-lang="en" aria-pressed="' + (SP.lang === 'en') + '">EN</button></span></span></div></div>' +
      '<header class="hdr"><div class="wrap hdr__in"><button class="burger" type="button" aria-label="Menu" data-open-drawer>' + I('menu') + '</button>' +
      '<a class="logo" href="index.html" aria-label="Home">' + SP.logo() + '</a>' +
      '<nav class="nav" aria-label="Main"><ul>' + NAV.map(n => '<li' + (act === n[0] ? ' class="is-on"' : '') + '><a href="' + n[2] + '"' + (act === n[0] ? ' aria-current="page"' : '') + '>' + n[1] + '</a></li>').join('') + '</ul></nav>' +
      '<div class="hdr__cta"><a class="btn btn--accent btn--sm" href="service.html">' + I('wrench') + T('Programare service', 'Book service') + '</a></div></div></header>' +
      '<div class="brandbar"><div class="wrap brandbar__in"><span class="brandbar__lbl">' + T('Mărcile noastre', 'Our brands') + '</span>' +
      SP.BRANDS.map(b => '<a ' + SP.bhref(b) + (b.site ? ' class="ext"' : '') + '><i style="background:' + b.color + '"></i>' + b.word + '</a>').join('') +
      '<a href="' + G.ocazii + '" ' + SP.ext + ' class="ext"><i style="background:#D72727"></i>' + T('OCAZII', 'USED') + '</a></div></div>' +
      '<div class="drawer" id="drawer" hidden><div class="drawer__p" role="dialog" aria-label="Menu"><button class="drawer__x" type="button" aria-label="Close" data-close-drawer>' + I('x') + '</button>' +
      '<a class="logo" href="index.html">' + SP.logo() + '</a><ul>' + NAV.map(n => '<li><a href="' + n[2] + '">' + n[1] + I('right') + '</a></li>').join('') + '</ul>' +
      '<h4 style="margin:6px 0 0">' + T('Mărci', 'Brands') + '</h4><ul>' + SP.BRANDS.map(b => '<li><a ' + SP.bhref(b) + '>' + b.name + (b.site ? I('ext') : I('right')) + '</a></li>').join('') + '<li><a href="' + G.ocazii + '" ' + SP.ext + '>' + T('Ocazii (Eurial Certified)', 'Used cars (Eurial Certified)') + I('ext') + '</a></li></ul>' +
      '<a class="btn btn--accent btn--block" href="tel:0219160">' + I('phone') + 'Call center ' + G.callCenter + '</a></div></div>';
  };

  /* footer */
  SP.hoursTable = () => '<table class="hours">' + G.hours.map((h, i) => '<tr' + ((i === 0 && SP.today() < 5) || (i === 1 && SP.today() === 5) || (i === 2 && SP.today() === 6) ? ' class="is-today"' : '') + '><td>' + (SP.lang === 'en' ? h[1] : h[0]) + '</td><td>' + (h[2] || T('Închis', 'Closed')) + '</td></tr>').join('') + '</table>';
  SP.footer = function () {
    const col = (h, l) => '<div><h4>' + h + '</h4><ul>' + l.map(x => '<li><a href="' + x[1] + '"' + (x[2] ? ' ' + SP.ext : '') + '>' + x[0] + '</a></li>').join('') + '</ul></div>';
    return '<footer class="ftr"><div class="wrap"><div class="ftr__g">' +
      '<div><a class="logo" href="index.html" style="background:#fff;padding:8px 10px;border-radius:8px;color:#111;display:inline-flex">' + SP.logo() + '</a><p style="margin-top:14px">' + T('Dealer autorizat Peugeot, Citroën, DS, Opel și Omoda & Jaecoo, cu 7 locații de vânzări și service.', 'Authorised Peugeot, Citroën, DS, Opel and Omoda & Jaecoo dealer with 7 sales and service locations.') + '</p><p>Call center <a href="tel:0219160">' + G.callCenter + '</a><br><a href="mailto:' + G.email + '">' + G.email + '</a></p></div>' +
      col(T('Mărci', 'Brands'), SP.BRANDS.map(b => [b.name, b.site || b.page, !!b.site]).concat([[T('Ocazii — Eurial Certified', 'Used — Eurial Certified'), G.ocazii, true]])) +
      col(T('Locații', 'Locations'), SP.LOCATIONS.map(l => [l.name, 'locatie.html?id=' + l.id])) +
      col(T('Client', 'Customer'), [[T('Programare service', 'Book service'), 'service.html'], [T('Stoc mașini noi', 'New car stock'), 'stoc.html'], [T('Oferte', 'Offers'), 'oferte.html'], [T('Leasing & asigurări', 'Leasing & insurance'), 'servicii.html'], [T('Contul meu', 'My account'), G.portal, true], [T('Despre noi', 'About us'), 'despre.html'], [T('Cariere', 'Careers'), 'cariere.html'], [T('Sugestii și reclamații', 'Feedback & complaints'), 'reclamatii.html'], ['Contact', 'contact.html']]) +
      '</div><div class="ftr__fca"><p>' + T('Prețurile sunt prețuri recomandate cu TVA, în euro, și pot varia în funcție de echipare și disponibilitate. Imaginile au caracter informativ.', 'Prices are recommended prices incl. VAT, in euro, and may vary by equipment and availability. Images are for illustration.') + '</p></div>' +
      '<div class="ftr__b"><span>© 2026 ' + T('Eurial — site demonstrativ realizat de Sales Partner', 'Eurial — demo website by Sales Partner') + '</span><span class="ftr__legal"><a href="legal.html?doc=gdpr">GDPR</a><a href="legal.html?doc=cookies">Cookies</a><a href="legal.html?doc=termeni">' + T('Termeni', 'Terms') + '</a><a href="https://anpc.ro/ce-este-sal/" ' + SP.ext + '>ANPC – SAL</a><a href="https://ec.europa.eu/consumers/odr" ' + SP.ext + '>SOL</a><a href="legal.html?doc=credite">' + T('Credite foto', 'Photo credits') + '</a></span></div>' +
      '<div class="ftr__b"><span>' + T('Demo realizat de Sales Partner pe baza datelor publice Eurial (adrese, mărci, departamente). Programul este orientativ. Stocul și ofertele provin din site-urile demo ale mărcilor.', 'Demo built by Sales Partner from the group’s public data (addresses, brands, departments). Hours are indicative. Stock and offers come from the brand demo sites.') + '</span></div></div></footer>';
  };

  /* stock card: links to the brand demo site vehicle page (new tab) */
  SP.card = function (v) {
    const b = SP.brand(v.brand), l = SP.loc(v.loc), cut = /\.png|V3DImage|studio\.webp|colors\//i.test(v.img);
    return '<article class="car"><div class="car__img' + (cut ? ' car__img--cut' : '') + '">' + (v.price < v.list ? '<span class="car__rib">-' + SP.eur(v.list - v.price) + '</span>' : '<span class="car__rib" style="background:var(--ink);color:#fff">' + T('În stoc', 'In stock') + '</span>') +
      '<img src="' + v.img + '" alt="' + esc(v.title) + '" loading="lazy" onerror="this.style.opacity=0"></div>' +
      '<div class="car__b"><small style="font-weight:800;letter-spacing:.1em;font-size:.7rem;color:var(--mute)"><i class="bdot" style="background:' + b.color + '"></i>' + b.word + '</small><h3 class="car__t"><a href="' + v.url + '" ' + SP.ext + '>' + esc(v.title) + '</a></h3><p class="car__d">' + esc(v.version) + '</p>' +
      '<ul class="car__specs"><li>' + I('cal') + v.year + '</li><li>' + I('fuel') + v.fuel + '</li><li>' + I('gear') + v.gb + '</li><li>' + I('pin') + esc(l.city) + '</li></ul>' +
      '<div class="car__f"><div><div class="price">' + (v.price < v.list ? '<s>' + SP.eur(v.list) + '</s>' : '') + SP.eur(v.price) + '</div><div class="pm">' + T('cu TVA', 'incl. VAT') + '</div></div><span class="ext-note">' + T('site ' + b.name, b.name + ' site') + ' ' + I('ext') + '</span></div></div></article>';
  };
  SP.mcard = function (m) {
    const b = SP.brand(m.brand), photo = /hero|\.jpg/i.test(m.img) && !/png/i.test(m.img);
    return '<a class="mcard" href="' + m.url + '" ' + SP.ext + '><div class="mcard__img' + (photo ? ' mcard__img--photo' : '') + '"><img src="' + m.img + '" alt="' + esc(m.name) + '" loading="lazy" onerror="this.style.opacity=0"></div>' +
      '<div class="mcard__b"><small><i class="bdot" style="background:' + b.color + '"></i>' + b.word + ' · ' + esc(m.seg) + '</small><b>' + esc(m.name) + '</b>' +
      '<div class="mcard__f"><span>' + T('de la', 'from') + ' <b style="font-size:1.05rem">' + SP.eur(m.from) + '</b></span><span class="ext-note">' + I('ext') + '</span></div></div></a>';
  };
  SP.deptChips = l => '<div class="bchips">' + l.dept.map(d => '<span class="dchip">' + I(SP.DEPTS[d][2]) + X(SP.DEPTS[d]) + '</span>').join('') + '</div>';
  SP.brandChips = l => '<div class="bchips">' + l.brands.map(id => { const b = SP.brand(id); return '<a class="bchip" ' + SP.bhref(b) + '><i class="bdot" style="background:' + b.color + '"></i>' + b.name + '</a>'; }).join('') + '</div>';

  /* leads (production: POST /api/leads → Sales Partner, routed by brand + location + department) */
  const LT = { offer: 'Cerere ofertă', testdrive: 'Test drive', service: 'Programare service', contact: 'Contact', complaint: 'Sugestie / reclamație', career: 'Candidatură', leasing: 'Leasing operațional', newsletter: 'Newsletter' };
  SP.lead = function (type, data) {
    const l = { ref: 'EUR-' + Date.now().toString(36).toUpperCase().slice(-6), type, label: LT[type] || type, at: new Date().toISOString(), brand: data.brand || null, location: data.location || null, source: location.pathname.split('/').pop() || 'index.html', data };
    store.set('leads', [l].concat(store.get('leads', [])).slice(0, 30));
    const n = $('[data-lead-n]'); if (n) n.textContent = store.get('leads', []).length; SP.renderLeads();
    return l;
  };
  SP.toast = msg => { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.innerHTML = I('check') + '<span>' + msg + '</span>'; document.body.appendChild(t); setTimeout(() => t.remove(), 3500); };
  SP.validate = function (form) {
    let ok = true;
    $$('[required]', form).forEach(el => { const bad = el.type === 'checkbox' ? !el.checked : !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) || (el.type === 'tel' && el.value.replace(/\D/g, '').length < 10); el.setAttribute('aria-invalid', bad); if (bad && ok) { el.focus(); ok = false; } });
    return ok;
  };
  SP.formData = f => { const o = {}; new FormData(f).forEach((v, k) => { o[k] = v; }); return o; };
  SP.contactFields = o => {
    o = o || {};
    return '<div class="fld"><label for="f-name">' + T('Nume și prenume', 'Full name') + '</label><input class="inp" id="f-name" name="name" autocomplete="name" required></div>' +
      '<div class="fld"><label for="f-phone">' + T('Telefon', 'Phone') + '</label><input class="inp" id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>' +
      '<div class="fld full"><label for="f-email">Email</label><input class="inp" id="f-email" name="email" type="email" autocomplete="email" required></div>' +
      (o.msg ? '<div class="fld full"><label for="f-msg">' + (o.msgLabel || T('Mesaj', 'Message')) + '</label><textarea class="inp" id="f-msg" name="message"></textarea></div>' : '') +
      '<label class="check full"><input type="checkbox" name="consent" required> <span>' + T('Sunt de acord cu prelucrarea datelor pentru a fi contactat. ', 'I agree to my data being processed so you can contact me. ') + '<a href="legal.html?doc=gdpr">GDPR</a></span></label>';
  };
  SP.done = (title, text, ref) => '<div style="text-align:center;padding:10px 0"><div class="avatar" style="background:var(--accent);color:#fff">' + I('check') + '</div><h3>' + title + '</h3><p class="mute">' + text + '</p>' + (ref ? '<p class="small mute">' + T('Referință ', 'Reference ') + ref + ' · ' + T('trimisă în Sales Partner către locația și departamentul ales', 'sent to Sales Partner, routed to the chosen location and department') + '</p>' : '') + '</div>';
  SP.bindForm = (form, type, extra, done) => form.addEventListener('submit', e => {
    e.preventDefault(); if (!SP.validate(form)) return;
    const l = SP.lead(type, Object.assign(SP.formData(form), extra ? extra() : {}));
    form.outerHTML = '<div class="card">' + (done ? done(l) : SP.done(T('Mulțumim!', 'Thank you!'), T('Am primit solicitarea. Un consultant vă contactează în cel mai scurt timp.', 'We have received your request. An advisor will contact you shortly.'), l.ref)) + '</div>';
  });

  /* demo lead inbox */
  SP.renderLeads = function () {
    const box = $('[data-leads]'); if (!box) return;
    const L = store.get('leads', []);
    box.innerHTML = L.length ? L.slice(0, 8).map(l => '<div class="lead"><b><span>' + l.label + '</span><span>' + l.ref + '</span></b><div>' + new Date(l.at).toLocaleString('ro-RO') + (l.brand ? ' · ' + ((SP.brand(l.brand) || {}).name || l.brand) : '') + (l.location ? ' · ' + ((SP.loc(l.location) || {}).name || l.location) : '') + '</div><code>' + esc(JSON.stringify(Object.fromEntries(Object.entries(l.data || {}).filter(([k]) => k !== 'consent')))) + '</code></div>').join('')
      : '<p class="small" style="margin:0;color:#5D6B82">' + T('Nicio solicitare încă. Trimiteți un formular (service, ofertă, test drive, contact) și apare aici, așa cum ar ajunge în Sales Partner.', 'No leads yet. Submit a form (service, offer, test drive, contact) and it appears here as it would in Sales Partner.') + '</p>';
  };
  function demoPanel() {
    const w = document.createElement('div');
    w.innerHTML = '<div class="demo-badge"><button type="button" data-demo>DEMO <em>Leads <span data-lead-n>' + store.get('leads', []).length + '</span></em></button></div>' +
      '<div class="demo" id="demo" hidden><h4>' + T('Solicitări în Sales Partner', 'Leads in Sales Partner') + '</h4><div class="leadlist" data-leads></div>' +
      '<h4>' + T('Conectat la Sales Partner', 'Connected to Sales Partner') + '</h4><ul class="sp-flow"><li>' + T('Stoc nou din DMS, pentru toate mărcile și locațiile', 'New-car stock from the DMS, all brands and locations') + '</li><li>' + T('Fiecare formular → lead la marca și locația corectă', 'Every form → lead to the right brand and location') + '</li><li>' + T('Programări service → calendarul atelierului', 'Service bookings → the workshop calendar') + '</li><li>' + T('Ocazii: Eurial Certified, același stoc DMS', 'Used: Eurial Certified, same DMS stock') + '</li><li>' + T('Contul clientului: mașini, service, rechemări', 'Customer account: cars, service, recalls') + '</li></ul>' +
      '<p style="margin:12px 0 0"><button class="btn btn--line btn--sm" type="button" data-clear>' + T('Șterge datele demo', 'Clear demo data') + '</button></p></div>';
    document.body.appendChild(w);
    $('[data-demo]').onclick = () => { const d = $('#demo'); d.hidden = !d.hidden; if (!d.hidden) SP.renderLeads(); };
    $('[data-clear]').onclick = () => { store.set('leads', []); SP.renderLeads(); $('[data-lead-n]').textContent = 0; };
  }
  function cookies() {
    if (store.get('cookies', null)) return;
    const c = document.createElement('div'); c.className = 'cookies';
    c.innerHTML = '<p>' + T('Folosim cookie-uri esențiale pentru funcționarea site-ului și, cu acordul dumneavoastră, cookie-uri de analiză. ', 'We use essential cookies to run the site and, with your consent, analytics cookies. ') + '<a href="legal.html?doc=cookies">' + T('Politica de cookies', 'Cookie policy') + '</a></p><button class="btn btn--line btn--sm" type="button" data-c="ess">' + T('Doar esențiale', 'Essential only') + '</button><button class="btn btn--accent btn--sm" type="button" data-c="all">' + T('Accept toate', 'Accept all') + '</button>';
    document.body.appendChild(c); $$('[data-c]', c).forEach(b => b.onclick = () => { store.set('cookies', b.dataset.c); c.remove(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const page = document.body.dataset.page;
    $('#site-header').innerHTML = SP.header(page);
    $('#site-footer').innerHTML = SP.footer();
    const r = (SP.pages[page] || SP.pages.notfound)();
    if (r.title) document.title = r.title;
    $('#main').innerHTML = r.html; r.bind && r.bind();
    demoPanel(); cookies();
    document.addEventListener('click', e => {
      if (e.target.closest('[data-open-drawer]')) $('#drawer').hidden = false;
      if (e.target.closest('[data-close-drawer]') || e.target.id === 'drawer') $('#drawer').hidden = true;
      const lb = e.target.closest('[data-lang]'); if (lb) { store.set('lang', lb.dataset.lang); const u = new URL(location.href); u.searchParams.delete('lang'); location.href = u.toString(); }
    });
  });
})();
