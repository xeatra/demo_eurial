/* Eurial group demo — pages */
(function () {
  const SP = window.SP, G = SP.GROUP, I = SP.I, esc = SP.esc, $ = SP.$, $$ = SP.$$, T = SP.T, X = SP.X;
  SP.pages = {};
  const S = SP.STOCK, B = SP.BRANDS, L = SP.LOCATIONS;
  const opt = (v, l, sel) => '<option value="' + esc(v) + '"' + (sel ? ' selected' : '') + '>' + esc(l) + '</option>';
  const head = (h, p, crumb, img) => '<div class="phead"' + (img ? ' style="background:linear-gradient(90deg,rgba(10,10,10,.88),rgba(10,10,10,.45)),url(\'' + img + '\') center/cover;padding:56px 0 48px"' : '') + '><div class="wrap"><div class="crumbs"><a href="index.html">' + T('Acasă', 'Home') + '</a> / ' + (crumb || h) + '</div><h1>' + h + '</h1>' + (p ? '<p>' + p + '</p>' : '') + '</div></div>';
  const deals = () => S.filter(v => v.list > v.price).sort((a, b) => (b.list - b.price) - (a.list - a.price));
  /* mix brands: best deal of each brand in turn */
  const mixDeals = n => { const by = B.map(b => deals().filter(v => v.brand === b.id)).filter(a => a.length), out = []; for (let i = 0; out.length < n && by.some(a => a[i]); i++) by.forEach(a => { if (a[i] && out.length < n) out.push(a[i]); }); return out; };
  const locCard = l => '<article class="loc">' + (l.hq ? '<span class="badge-hq">' + T('Sediu', 'HQ') + '</span>' : '') + '<h3>' + l.name + '</h3><div class="loc__a">' + I('pin') + '<span>' + l.address + '</span></div><div class="loc__a">' + I('phone') + '<span>Call center <a href="tel:0219160">' + G.callCenter + '</a> · <a href="mailto:' + l.email + '">' + l.email + '</a></span></div>' +
    SP.brandChips(l) + SP.deptChips(l) + '<div class="loc__f"><a class="btn btn--brand btn--sm" href="locatie.html?id=' + l.id + '">' + T('Detalii locație', 'Location details') + I('arrow') + '</a><a class="btn btn--line btn--sm" href="service.html?loc=' + l.id + '">' + I('wrench') + T('Programare', 'Book') + '</a></div></article>';

  /* ======================= HOME ======================= */
  SP.pages.home = function () {
    const slides = [
      { img: SP.BANNERS.peugeot, b: 'peugeot', t: T('Cinci mărci. Șapte locații. Un singur grup.', 'Five brands. Seven locations. One group.'), p: T('Peugeot, Citroën, DS, Opel și Omoda & Jaecoo — vânzări, service, piese și ITP în București, Ilfov, Brașov, Cluj, Pitești și Ploiești.', 'Peugeot, Citroën, DS, Opel and Omoda & Jaecoo — sales, service, parts and ITP in Bucharest, Ilfov, Brașov, Cluj, Pitești and Ploiești.') },
      { img: SP.BANNERS.citroen, b: 'citroen', t: T('Noul Citroën C5 Aircross', 'The new Citroën C5 Aircross'), p: T('Hibrid, plug-in sau 100% electric. Test drive în toate cele 7 locații.', 'Hybrid, plug-in or fully electric. Test drives at all 7 locations.') },
      { img: SP.BANNERS.omoda, b: 'omoda', t: T('Omoda & Jaecoo la Eurial Pantelimon', 'Omoda & Jaecoo at Eurial Pantelimon'), p: T('SUV-uri hibride, plug-in și electrice, cu garanție 7 ani.', 'Hybrid, plug-in and electric SUVs with a 7-year warranty.') }
    ];
    const brandTile = (b, wide) => '<a class="btile' + (wide ? ' btile--wide' : '') + '" ' + SP.bhref(b) + ' style="background-image:url(\'' + b.img + '\')"><span class="btile__go">' + (b.site ? T('Site dedicat', 'Brand site') + ' ' + I('ext') : T('Pagina mărcii', 'Brand page') + ' ' + I('arrow')) + '</span><div class="btile__b"><div class="btile__w">' + b.word + '</div><div style="opacity:.9;font-size:.9rem;margin-top:4px">' + X(b.d) + '</div><div class="btile__m"><span>' + I('pin') + SP.brandLocs(b.id).length + ' ' + (SP.brandLocs(b.id).length === 1 ? T('locație', 'location') : T('locații', 'locations')) + '</span>' + (S.some(v => v.brand === b.id) ? '<span>' + S.filter(v => v.brand === b.id).length + ' ' + T('în stoc', 'in stock') + '</span>' : '<span>' + T('Vânzări & service', 'Sales & service') + '</span>') + '</div></div></a>';
    const html =
      '<section class="hero" data-hero style="background-image:url(\'' + slides[0].img + '\')"><div class="wrap"><div class="hero__in"><span class="eyebrow" style="color:#fff;opacity:.8">' + T('Dealer autorizat multi-marcă', 'Authorised multi-brand dealer') + '</span><h1 data-ht>' + slides[0].t + '</h1><p data-hp>' + slides[0].p + '</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px"><a class="btn btn--accent" href="stoc.html">' + I('search') + T('Caută în stoc', 'Search stock') + '</a><a class="btn btn--ghost" href="service.html">' + I('wrench') + T('Programare service', 'Book a service') + '</a></div>' +
      '<div class="hero__brands">' + B.map(b => '<a ' + SP.bhref(b) + '>' + b.word + '</a>').join('') + '<a href="' + G.ocazii + '" ' + SP.ext + '>' + T('OCAZII', 'USED') + ' ↗</a></div></div></div>' +
      '<div class="hero__dots">' + slides.map((s, i) => '<button type="button" aria-label="Slide ' + (i + 1) + '" aria-current="' + (i === 0) + '" data-slide="' + i + '"></button>').join('') + '</div></section>' +
      '<div class="wrap"><form class="search" data-search action="stoc.html" method="get"><div class="search__tabs"><button type="button" aria-selected="true">' + T('Stoc mașini noi', 'New car stock') + '</button><a href="' + G.ocazii + '" ' + SP.ext + ' style="padding:6px 12px;font-weight:700;font-size:.85rem;color:var(--mute);text-decoration:none">' + T('Mașini rulate — Eurial Certified', 'Used cars — Eurial Certified') + ' ↗</a></div>' +
      '<div class="search__g"><div class="fld"><label for="s-b">' + T('Marcă', 'Brand') + '</label><select class="inp" id="s-b" name="b"><option value="">' + T('Toate mărcile', 'All brands') + '</option>' + B.filter(b => S.some(v => v.brand === b.id)).map(b => opt(b.id, b.name + ' (' + S.filter(v => v.brand === b.id).length + ')')).join('') + '</select></div>' +
      '<div class="fld"><label for="s-l">' + T('Locație', 'Location') + '</label><select class="inp" id="s-l" name="loc"><option value="">' + T('Toate locațiile', 'All locations') + '</option>' + L.map(l => opt(l.id, l.name + ' (' + S.filter(v => v.loc === l.id).length + ')')).join('') + '</select></div>' +
      '<div class="fld"><label for="s-f">' + T('Combustibil', 'Fuel') + '</label><select class="inp" id="s-f" name="fuel"><option value="">' + T('Oricare', 'Any') + '</option>' + [...new Set(S.map(v => v.fuel))].map(f => opt(f, f)).join('') + '</select></div>' +
      '<div class="fld"><label for="s-g">' + T('Cutie', 'Gearbox') + '</label><select class="inp" id="s-g" name="gb"><option value="">' + T('Oricare', 'Any') + '</option>' + opt('Automată', T('Automată', 'Automatic')) + opt('Manuală', T('Manuală', 'Manual')) + '</select></div>' +
      '<div class="fld"><label for="s-p">' + T('Preț maxim', 'Max price') + '</label><select class="inp" id="s-p" name="maxp"><option value="">' + T('Fără limită', 'No max') + '</option>' + [20000, 25000, 30000, 35000, 40000, 50000].map(p => opt(p, SP.eur(p))).join('') + '</select></div>' +
      '<button class="btn btn--accent" type="submit" data-sbtn>' + I('search') + T('Caută', 'Search') + ' ' + S.length + '</button></div></form>' +
      '<div class="usps"><a class="usp" href="service.html" style="text-decoration:none">' + I('wrench') + '<div><b>' + T('Programare service', 'Book a service') + '</b><span>' + T('Toate mărcile, 7 ateliere', 'All brands, 7 workshops') + '</span></div></a><a class="usp" href="contact.html?tip=testdrive" style="text-decoration:none">' + I('car') + '<div><b>Test drive</b><span>' + T('În locația cea mai apropiată', 'At your nearest location') + '</span></div></a><a class="usp" href="servicii.html#itp" style="text-decoration:none">' + I('check') + '<div><b>' + T('Stație ITP', 'ITP station') + '</b><span>Eurial Otopeni</span></div></a><a class="usp" href="' + SP.GROUP.portal + '" ' + SP.ext + ' style="text-decoration:none">' + I('user') + '<div><b>' + T('Contul meu', 'My account') + '</b><span>' + T('Mașini, service, documente', 'Cars, service, documents') + '</span></div></a></div></div>' +
      '<section class="sec"><div class="wrap"><div class="sec__h"><div><span class="eyebrow">' + T('Mărcile grupului', 'Our brands') + '</span><h2>' + T('Alegeți marca', 'Choose your brand') + '</h2></div><p class="mute small" style="max-width:420px;margin:0">' + T('Peugeot, Citroën și Omoda & Jaecoo au site dedicat (se deschide într-o filă nouă). DS și Opel au pagină de marcă în site-ul grupului.', 'Peugeot, Citroën and Omoda & Jaecoo have a dedicated site (opens in a new tab). DS and Opel have a brand page in the group site.') + '</p></div>' +
      '<div class="btiles">' + brandTile(B[0], true) + brandTile(B[1]) + brandTile(B[2]) + brandTile(B[3]) + brandTile(B[4]) +
      '<a class="btile btile--full" href="' + G.ocazii + '" ' + SP.ext + ' style="background-image:url(\'' + SP.BANNERS.peugeotRange + '\')"><span class="btile__go">eurialcertified.ro ' + I('ext') + '</span><div class="btile__b"><div class="btile__w">' + T('Ocazii', 'Used cars') + '</div><div style="opacity:.9;font-size:.9rem;margin-top:4px">' + T('Mașini rulate verificate și garantate — Eurial Certified', 'Checked and warranted used cars — Eurial Certified') + '</div><div class="btile__m"><span>' + T('Toate mărcile', 'All makes') + '</span><span>' + T('Garanție', 'Warranty') + '</span></div></div></a></div></div></section>' +
      '<section class="sec sec--alt"><div class="wrap"><div class="sec__h"><div><span class="eyebrow">' + T('Stoc', 'Stock') + '</span><h2>' + T('Mașini noi cu reducere, gata de livrare', 'Discounted new cars, ready to deliver') + '</h2></div><a class="link" href="stoc.html">' + T('Tot stocul', 'All stock') + ' (' + S.length + ')' + I('arrow') + '</a></div><div class="carousel">' + mixDeals(8).map(SP.card).join('') + '</div></div></section>' +
      '<section class="sec"><div class="wrap"><div class="band"><div class="band__img" style="background-image:url(\'' + SP.BANNERS.citroenPro + '\')"></div><div class="band__b"><span class="eyebrow">Service</span><h2>' + T('Programare online în 4 pași', 'Book online in 4 steps') + '</h2><ul class="ticks"><li>' + I('check') + T('Alegeți marca și tipul lucrării', 'Choose the brand and the job') + '</li><li>' + I('check') + T('Vedeți doar locațiile care o pot face (ex. caroserie: Otopeni, Brașov; ITP: Otopeni)', 'Only locations that can do it are shown (e.g. bodywork: Otopeni, Brașov; ITP: Otopeni)') + '</li><li>' + I('check') + T('Alegeți ziua și ora, primiți confirmarea', 'Pick a day and time, get a confirmation') + '</li></ul><a class="btn btn--accent" href="service.html">' + T('Programează acum', 'Book now') + I('arrow') + '</a></div></div></div></section>' +
      '<section class="sec sec--alt"><div class="wrap"><div class="sec__h"><div><span class="eyebrow">' + T('Locații', 'Locations') + '</span><h2>' + T('7 locații de vânzări și service', '7 sales and service locations') + '</h2></div><a class="link" href="locatii.html">' + T('Toate locațiile', 'All locations') + I('arrow') + '</a></div><div class="locs">' + L.map(locCard).join('') + '</div></div></section>' +
      '<section class="sec"><div class="wrap"><div class="sec__h"><div><span class="eyebrow">' + T('Servicii', 'Services') + '</span><h2>' + T('Totul pentru mașina dumneavoastră', 'Everything for your car') + '</h2></div><a class="link" href="servicii.html">' + T('Toate serviciile', 'All services') + I('arrow') + '</a></div><div class="svc-list">' + SP.GROUP_SERVICES.slice(0, 4).map(s => '<a class="card" href="servicii.html#' + s.id + '" style="text-decoration:none"><div class="avatar" style="margin:0 0 12px">' + I(s.ic) + '</div><h3>' + X(s.n) + '</h3><p class="mute" style="margin:0">' + X(s.d) + '</p></a>').join('') + '</div></div></section>' +
      '<section class="sec sec--alt"><div class="wrap"><div class="sec__h"><div><span class="eyebrow">' + T('Noutăți', 'News') + '</span><h2>' + T('Din showroom-urile noastre', 'From our showrooms') + '</h2></div></div><div class="grid">' + SP.NEWS.map(n => '<article class="car"><div class="car__img"><img src="' + n.img + '" alt="" loading="lazy"></div><div class="car__b"><small class="mute">' + new Date(n.date).toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) + '</small><h3 class="car__t">' + X(n.t) + '</h3></div></article>').join('') + '</div></div></section>';
    return {
      title: T('Eurial — Peugeot, Citroën, DS, Opel, Omoda & Jaecoo — 7 locații', 'Eurial — Peugeot, Citroën, DS, Opel, Omoda & Jaecoo — 7 locations'), html,
      bind() {
        let i = 0; const h = $('[data-hero]');
        const go = n => { i = n; h.style.backgroundImage = "url('" + slides[i].img + "')"; $('[data-ht]').textContent = slides[i].t; $('[data-hp]').textContent = slides[i].p; $$('[data-slide]').forEach((b, k) => b.setAttribute('aria-current', k === i)); };
        $$('[data-slide]').forEach(b => b.onclick = () => { go(+b.dataset.slide); clearInterval(t); });
        const t = setInterval(() => go((i + 1) % slides.length), 7000);
        const f = $('[data-search]');
        const upd = () => { const q = SP.formData(f); $('[data-sbtn]', f).innerHTML = I('search') + T('Caută', 'Search') + ' ' + filterStock(q).length; };
        f.addEventListener('change', upd); upd();
        f.addEventListener('submit', e => { e.preventDefault(); const q = SP.formData(f); Object.keys(q).forEach(k => { if (!q[k]) delete q[k]; }); location.href = 'stoc.html' + (Object.keys(q).length ? '?' + new URLSearchParams(q) : ''); });
      }
    };
  };

  /* ======================= STOCK ======================= */
  const lst = s => (s || '').split(',').filter(Boolean);
  function filterStock(q) {
    const bs = lst(q.b), fs = lst(q.fuel);
    return S.filter(v => (!bs.length || bs.includes(v.brand)) && (!q.loc || v.loc === q.loc) && (!fs.length || fs.includes(v.fuel)) && (!q.gb || v.gb === q.gb) && (!q.maxp || v.price <= +q.maxp));
  }
  SP.pages.stock = function () {
    const q = Object.fromEntries(new URLSearchParams(location.search));
    const html = head(T('Stoc mașini noi', 'New car stock'), T('Toate mărcile și toate locațiile, într-o singură căutare. Fiecare mașină se deschide pe site-ul mărcii.', 'All brands and all locations in one search. Each car opens on the brand site.'), T('Stoc', 'Stock')) +
      '<section class="sec" style="padding-top:26px"><div class="wrap stock"><aside class="filters" data-filters aria-label="Filters"></aside><div><div class="toolbar"><div style="display:flex;gap:8px;align-items:center"><button class="btn btn--line btn--sm fbtn" type="button" data-open-f>' + I('filter') + T('Filtre', 'Filters') + '</button><strong data-count></strong></div>' +
      '<div class="toolbar__r"><label class="sr" for="sort">Sort</label><select class="inp" id="sort" style="min-height:40px;width:auto">' + opt('disc', T('Reducere (mare → mică)', 'Discount (high → low)')) + opt('pa', T('Preț (mic → mare)', 'Price (low → high)')) + opt('pd', T('Preț (mare → mic)', 'Price (high → low)')) + '</select></div></div>' +
      '<div data-results></div><div class="info" style="margin-top:26px">' + I('info') + '<span>' + T('Căutați o mașină rulată? Stocul de ocazii este pe ', 'Looking for a used car? Used stock is on ') + '<a href="' + G.ocazii + '" ' + SP.ext + '><b>eurialcertified.ro</b></a> ' + I('ext') + '</span></div></div></div></section>';
    return {
      title: T('Stoc mașini noi', 'New car stock') + ' | Eurial', html,
      bind() {
        const st = Object.assign({ sort: 'disc' }, q); const fb = $('[data-filters]');
        const pills = (name, label, vals) => { const cur = lst(st[name]); return '<div class="fld"><span>' + label + '</span><div class="pills">' + vals.map(v => '<label><input type="checkbox" data-p="' + name + '" value="' + esc(v[0]) + '"' + (cur.includes(v[0]) ? ' checked' : '') + '><span>' + esc(v[1]) + '</span></label>').join('') + '</div></div>'; };
        const sel = (name, label, items, all) => '<div class="fld"><label for="f-' + name + '">' + label + '</label><select class="inp" id="f-' + name + '" data-f="' + name + '"><option value="">' + all + '</option>' + items.map(i => opt(i[0], i[1], String(st[name] || '') === String(i[0]))).join('') + '</select></div>';
        function drawF() {
          fb.innerHTML = '<h3>' + T('Filtre', 'Filters') + ' <button class="btn btn--line btn--sm" type="button" data-reset>' + T('Resetează', 'Reset') + '</button></h3>' +
            pills('b', T('Marcă', 'Brand'), B.filter(b => S.some(v => v.brand === b.id)).map(b => [b.id, b.name + ' (' + S.filter(v => v.brand === b.id).length + ')'])) +
            sel('loc', T('Locație', 'Location'), L.map(l => [l.id, l.name + ' (' + S.filter(v => v.loc === l.id).length + ')']), T('Toate locațiile', 'All locations')) +
            pills('fuel', T('Combustibil', 'Fuel'), [...new Set(S.map(v => v.fuel))].map(f => [f, f])) +
            sel('gb', T('Cutie de viteze', 'Gearbox'), [['Automată', T('Automată', 'Automatic')], ['Manuală', T('Manuală', 'Manual')]], T('Oricare', 'Any')) +
            sel('maxp', T('Preț maxim', 'Max price'), [20000, 25000, 30000, 35000, 40000, 50000].map(p => [p, SP.eur(p)]), T('Fără limită', 'No max')) +
            '<button class="btn btn--accent btn--block fbtn" type="button" data-close-f>' + T('Vezi rezultatele', 'Show results') + '</button>';
          $('[data-reset]', fb).onclick = () => { ['b', 'loc', 'fuel', 'gb', 'maxp'].forEach(k => delete st[k]); drawF(); draw(); };
          $$('[data-f]', fb).forEach(el => el.onchange = () => { st[el.dataset.f] = el.value; draw(); });
          $$('[data-p]', fb).forEach(el => el.onchange = () => { st[el.dataset.p] = $$('[data-p="' + el.dataset.p + '"]:checked', fb).map(x => x.value).join(','); draw(); });
          $('[data-close-f]', fb).onclick = () => fb.classList.remove('is-open');
        }
        function draw() {
          const so = { disc: (a, b) => (b.list - b.price) - (a.list - a.price), pa: (a, b) => a.price - b.price, pd: (a, b) => b.price - a.price }[st.sort];
          const r = filterStock(st).sort(so);
          $('[data-count]').textContent = r.length + ' ' + T('mașini în stoc', 'cars in stock');
          $('[data-results]').innerHTML = r.length ? '<div class="grid">' + r.map(SP.card).join('') + '</div>' : '<div class="empty"><h3>' + T('Nicio mașină nu corespunde', 'No cars match') + '</h3><a class="btn btn--accent" href="contact.html?tip=offer">' + T('Cereți o ofertă', 'Ask for an offer') + '</a></div>';
          $('#sort').value = st.sort;
          const qs = Object.fromEntries(Object.entries(st).filter(([k, v]) => v && !(k === 'sort' && v === 'disc')));
          history.replaceState(null, '', location.pathname + (Object.keys(qs).length ? '?' + new URLSearchParams(qs) : ''));
        }
        $('#sort').onchange = e => { st.sort = e.target.value; draw(); };
        $('[data-open-f]').onclick = () => fb.classList.add('is-open');
        drawF(); draw();
      }
    };
  };

  /* ======================= MODELS ======================= */
  SP.pages.models = function () {
    const b0 = SP.param('b') || '';
    const html = head(T('Gama de modele', 'Model range'), T('Prețuri „de la” cu TVA. Modelele se deschid pe site-ul mărcii.', '"From" prices incl. VAT. Models open on the brand site.'), T('Modele', 'Models')) +
      '<section class="sec" style="padding-top:26px"><div class="wrap"><div class="seg" role="group" aria-label="Brand" style="margin-bottom:20px;flex-wrap:wrap">' + [['', T('Toate', 'All')]].concat(B.map(b => [b.id, b.name])).map(x => '<button type="button" data-mb="' + x[0] + '" aria-pressed="' + (x[0] === b0) + '">' + x[1] + '</button>').join('') + '</div><div data-mg></div></div></section>';
    return {
      title: T('Modele', 'Models') + ' | Eurial', html,
      bind() {
        const draw = b => {
          $$('[data-mb]').forEach(x => x.setAttribute('aria-pressed', x.dataset.mb === b));
          const bs = b ? [SP.brand(b)] : B;
          $('[data-mg]').innerHTML = bs.map(br => '<div class="sec__h" style="margin:26px 0 14px"><h2 style="font-size:1.4rem"><i class="bdot" style="background:' + br.color + '"></i>' + br.name + '</h2><a class="link small" ' + SP.bhref(br) + '>' + (br.site ? T('Site ' + br.name, br.name + ' site') + ' ' + I('ext') : T('Pagina mărcii', 'Brand page') + I('arrow')) + '</a></div>' +
            (br.site ? '<div class="grid">' + SP.MODELS.filter(m => m.brand === br.id).map(SP.mcard).join('') + '</div>' : '<div class="grid">' + SP.BRAND_MODELS[br.id].map(m => '<a class="mcard" href="' + br.page + '#' + SP.slugify(m.n) + '"><div class="mcard__img mcard__img--photo"><img src="' + m.img + '" alt="' + esc(m.n) + '" loading="lazy"></div><div class="mcard__b"><small><i class="bdot" style="background:' + br.color + '"></i>' + br.word + '</small><b>' + m.n + '</b><span class="mute small">' + X(m.t) + '</span><div class="mcard__f"><span>' + T('Preț la cerere', 'Price on request') + '</span>' + I('arrow') + '</div></div></a>').join('') + '</div>')).join('');
          history.replaceState(null, '', location.pathname + (b ? '?b=' + b : ''));
        };
        $$('[data-mb]').forEach(x => x.onclick = () => draw(x.dataset.mb)); draw(b0);
      }
    };
  };
  SP.slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ======================= OFFERS ======================= */
  SP.pages.offers = function () {
    const best = B.filter(b => b.site).map(b => deals().filter(v => v.brand === b.id).slice(0, 4)).flat();
    const html = head(T('Oferte', 'Offers'), T('Reduceri la mașini din stoc, oferte de service și finanțare, pentru toate mărcile grupului.', 'Discounts on stock cars, service and finance offers across all our brands.'), T('Oferte', 'Offers')) +
      '<section class="sec"><div class="wrap"><h2>' + T('Mașini din stoc cu reducere', 'Discounted stock cars') + '</h2><div class="grid">' + best.map(SP.card).join('') + '</div>' +
      '<h2 style="margin-top:44px">' + T('Service & piese', 'Service & parts') + '</h2><div class="svc-list">' +
      [[T('Verificare de iarnă gratuită', 'Free winter check'), T('Verificare în 20 de puncte și reduceri la anvelope și baterii, în toate cele 7 locații.', '20-point check and discounts on tyres and batteries at all 7 locations.'), 'service.html?svc=revizie'], [T('Hotel anvelope', 'Tyre hotel'), T('Depozitare sezonieră la orice locație Eurial.', 'Seasonal storage at any Eurial location.'), 'service.html?svc=anvelope'], [T('Caroserie fără griji', 'Hassle-free bodywork'), T('Constatare și reparații RCA / CASCO la Otopeni și Brașov, cu mașină de schimb.', 'Claims and repairs at Otopeni and Brașov, with a courtesy car.'), 'service.html?svc=caroserie'], [T('Leasing operațional pentru firme', 'Operational leasing for companies'), T('O singură rată lunară: mașină, service, asigurare, anvelope.', 'One monthly fee: car, service, insurance, tyres.'), 'servicii.html#leasing']]
        .map(o => '<a class="card" href="' + o[2] + '" style="text-decoration:none"><span class="chip">' + T('Ofertă', 'Offer') + '</span><h3 style="margin-top:12px">' + o[0] + '</h3><p class="mute" style="margin:0">' + o[1] + '</p></a>').join('') + '</div>' +
      '<p class="small mute" style="margin-top:20px">' + T('Ofertele fiecărei mărci (campanii importator) sunt pe site-urile dedicate: ', 'Each brand’s importer campaigns are on the brand sites: ') + B.filter(b => b.site).map(b => '<a ' + SP.bhref(b) + '>' + b.name + '</a>').join(' · ') + '</p></div></section>';
    return { title: T('Oferte', 'Offers') + ' | Eurial', html };
  };

  /* ======================= SERVICE BOOKING ======================= */
  SP.pages.service = function () {
    const html = head(T('Programare service', 'Book a service'), T('Toate mărcile, 7 ateliere. Vedeți doar locațiile care pot face lucrarea aleasă.', 'All brands, 7 workshops. Only the locations that can do the job are shown.'), 'Service') +
      '<section class="sec"><div class="wrap bk"><form class="card" data-bk novalidate>' +
      '<h3>1. ' + T('Marca mașinii', 'Car brand') + '</h3><div class="opts" style="margin-bottom:22px">' + B.map(b => '<label class="opt"><input type="radio" name="brand" value="' + b.id + '"><span><i class="bdot" style="background:' + b.color + '"></i>' + b.name + '</span></label>').join('') + '<label class="opt"><input type="radio" name="brand" value="other"><span>' + T('Altă marcă', 'Other make') + '<small>' + T('doar ITP', 'ITP only') + '</small></span></label></div>' +
      '<h3>2. ' + T('Ce lucrare', 'What job') + '</h3><div class="opts" style="margin-bottom:22px" data-svcs></div>' +
      '<h3>3. ' + T('Locația', 'Location') + '</h3><div class="opts" style="margin-bottom:22px" data-locs><p class="mute small">' + T('Alegeți marca și lucrarea.', 'Choose the brand and the job.') + '</p></div>' +
      '<h3>4. ' + T('Data și ora', 'Date and time') + '</h3><div class="slots" style="margin-bottom:12px" data-days></div><div class="slots" style="margin-bottom:22px" data-slots></div>' +
      '<h3>5. ' + T('Mașina și datele de contact', 'Car and contact details') + '</h3><div class="form"><div class="fld"><label for="f-plate">' + T('Nr. înmatriculare', 'Registration') + '</label><input class="inp" id="f-plate" name="plate" placeholder="B 123 ABC" required></div><div class="fld"><label for="f-km">' + T('Kilometraj', 'Mileage') + '</label><input class="inp" id="f-km" name="km" inputmode="numeric" placeholder="45000"></div>' + SP.contactFields({ msg: true, msgLabel: T('Detalii (opțional)', 'Details (optional)') }) +
      '<div class="full"><button class="btn btn--accent" type="submit">' + I('send') + T('Trimite programarea', 'Send booking') + '</button></div></div></form>' +
      '<aside class="card sumbox"><h3>' + T('Rezumat', 'Summary') + '</h3><dl data-sum></dl><div class="info" style="margin-top:16px">' + I('info') + '<span>' + T('În producție, sloturile vin din calendarul atelierului din Sales Partner, iar programarea apare direct la recepția locației.', 'In production, slots come from the workshop calendar in Sales Partner and the booking lands at the location’s reception.') + '</span></div></aside></div></section>';
    return {
      title: T('Programare service', 'Book a service') + ' | Eurial', html,
      bind() {
        const f = $('[data-bk]'), st = { brand: SP.param('b'), svc: SP.param('svc'), loc: SP.param('loc'), day: null, slot: null };
        const days = []; for (let k = 1; days.length < 10; k++) { const d = new Date(); d.setDate(d.getDate() + k); if (d.getDay() !== 0) days.push(d); }
        const svcs = () => st.brand === 'other' ? SP.SERVICES.filter(s => s.id === 'itp') : SP.SERVICES;
        const locsFor = () => L.filter(l => (st.brand === 'other' || !st.brand || l.brands.includes(st.brand)) && (!st.svc || l.dept.includes(SP.SERVICES.find(s => s.id === st.svc).dept)));
        const svcOk = s => L.some(l => (st.brand === 'other' || !st.brand || l.brands.includes(st.brand)) && l.dept.includes(s.dept));
        function draw() {
          if (st.brand) { const r = $('input[name=brand][value="' + st.brand + '"]', f); if (r) r.checked = true; }
          $('[data-svcs]').innerHTML = svcs().map(s => { const ok = svcOk(s); if (!ok && st.svc === s.id) st.svc = null; return '<label class="opt"><input type="radio" name="svc" value="' + s.id + '"' + (st.svc === s.id ? ' checked' : '') + (ok ? '' : ' disabled') + '><span>' + X(s.n) + '<small>' + (ok ? X(s.d) : T('Indisponibil pentru această marcă', 'Not available for this brand')) + '</small></span></label>'; }).join('');
          const ls = locsFor(); if (st.loc && !ls.some(l => l.id === st.loc)) st.loc = null;
          $('[data-locs]').innerHTML = !st.brand || !st.svc ? '<p class="mute small">' + T('Alegeți marca și lucrarea.', 'Choose the brand and the job.') + '</p>' : ls.map(l => '<label class="opt"><input type="radio" name="loc" value="' + l.id + '"' + (st.loc === l.id ? ' checked' : '') + '><span>' + l.name + '<small>' + esc(l.address.split(',').slice(0, 2).join(',')) + '</small></span></label>').join('');
          $('[data-days]').innerHTML = days.map((d, i) => '<button type="button" class="btn btn--sm ' + (st.day === i ? 'btn--brand' : 'btn--line') + '" data-day="' + i + '"' + (st.loc ? '' : ' disabled') + '>' + d.toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', { weekday: 'short', day: 'numeric', month: 'short' }) + '</button>').join('');
          const sat = st.day != null && days[st.day].getDay() === 6;
          const slots = st.day == null ? [] : (sat ? ['09:00', '10:00', '11:00', '12:00'] : ['08:30', '09:30', '10:30', '11:30', '13:00', '14:00', '15:00', '16:00']).filter((s, i) => (i + st.day) % 4 !== 1);
          $('[data-slots]').innerHTML = slots.map(s => '<button type="button" class="btn btn--sm ' + (st.slot === s ? 'btn--accent' : 'btn--line') + '" data-slot="' + s + '">' + s + '</button>').join('');
          const b = SP.brand(st.brand), s = SP.SERVICES.find(x => x.id === st.svc), l = SP.loc(st.loc);
          $('[data-sum]').innerHTML = '<dt>' + T('Marcă', 'Brand') + '</dt><dd>' + (b ? b.name : st.brand === 'other' ? T('Altă marcă', 'Other') : '—') + '</dd><dt>' + T('Lucrare', 'Job') + '</dt><dd>' + (s ? X(s.n) : '—') + '</dd><dt>' + T('Locație', 'Location') + '</dt><dd>' + (l ? l.name : '—') + '</dd><dt>' + T('Data', 'Date') + '</dt><dd>' + (st.day != null ? days[st.day].toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', { weekday: 'long', day: 'numeric', month: 'long' }) + (st.slot ? ', ' + st.slot : '') : '—') + '</dd>';
          $$('[data-day]').forEach(x => x.onclick = () => { st.day = +x.dataset.day; st.slot = null; draw(); });
          $$('[data-slot]').forEach(x => x.onclick = () => { st.slot = x.dataset.slot; draw(); });
        }
        f.addEventListener('change', e => { const n = e.target.name; if (n === 'brand') { st.brand = e.target.value; if (st.brand === 'other') st.svc = 'itp'; } else if (n === 'svc') st.svc = e.target.value; else if (n === 'loc') st.loc = e.target.value; else return; draw(); });
        draw();
        f.addEventListener('submit', e => {
          e.preventDefault();
          if (!st.brand || !st.svc || !st.loc || st.day == null || !st.slot) { SP.toast(T('Completați pașii 1–4', 'Complete steps 1–4')); return; }
          if (!SP.validate(f)) return;
          const d = SP.formData(f), when = days[st.day].toLocaleDateString('ro-RO') + ' ' + st.slot;
          const l = SP.lead('service', Object.assign(d, { brand: st.brand, location: st.loc, service: st.svc, slot: when }));
          f.outerHTML = '<div class="card">' + SP.done(T('Programare trimisă', 'Booking sent'), T('Vă așteptăm la ', 'We look forward to seeing you at ') + SP.loc(st.loc).name + ', ' + when + '. ' + T('Primiți confirmarea pe email și SMS.', 'You will get a confirmation by email and SMS.'), l.ref) + '</div>';
        });
      }
    };
  };

  /* ======================= SERVICES (leasing, broker, Rabla, ITP, parts, manuals) ======================= */
  SP.pages.services = function () {
    const html = head(T('Servicii', 'Services'), T('Leasing, asigurări, Rabla, ITP, piese și documentație — pentru toate mărcile.', 'Leasing, insurance, Rabla, ITP, parts and documentation — for all brands.'), T('Servicii', 'Services')) +
      '<section class="sec"><div class="wrap" style="display:grid;gap:18px">' + SP.GROUP_SERVICES.map(s => '<article class="card" id="' + s.id + '" style="display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center"><div class="avatar" style="margin:0">' + I(s.ic) + '</div><div><h2 style="font-size:1.3rem;margin:0 0 6px">' + X(s.n) + '</h2><p class="mute" style="margin:0">' + X(s.d) + '</p></div><div>' +
        (s.ext ? '<a class="btn btn--line btn--sm" href="' + G[s.ext] + '" ' + SP.ext + '>eurialbroker.ro ' + I('ext') + '</a>' : s.id === 'itp' ? '<a class="btn btn--accent btn--sm" href="service.html?svc=itp&loc=otopeni">' + T('Programare ITP', 'Book ITP') + '</a>' : s.id === 'manuale' ? '<a class="btn btn--line btn--sm" href="' + G.portal + '" ' + SP.ext + '>' + T('Contul meu', 'My account') + ' ' + I('ext') + '</a>' : '<a class="btn btn--line btn--sm" href="contact.html?tip=' + (s.id === 'leasing' ? 'leasing' : 'offer') + '">' + T('Cere detalii', 'Ask for details') + '</a>') + '</div></article>').join('') +
      '</div></section>';
    return { title: T('Servicii', 'Services') + ' | Eurial', html };
  };

  /* ======================= LOCATIONS ======================= */
  SP.pages.locations = function () {
    const html = head(T('Locații', 'Locations'), T('7 locații de vânzări și service. Filtrați după marcă, oraș sau departament.', '7 sales and service locations. Filter by brand, city or department.'), T('Locații', 'Locations')) +
      '<section class="sec" style="padding-top:26px"><div class="wrap"><div class="toolbar"><div style="display:flex;gap:10px;flex-wrap:wrap"><select class="inp" id="lf-b" style="width:auto;min-height:40px"><option value="">' + T('Toate mărcile', 'All brands') + '</option>' + B.map(b => opt(b.id, b.name)).join('') + '</select><select class="inp" id="lf-d" style="width:auto;min-height:40px"><option value="">' + T('Toate departamentele', 'All departments') + '</option>' + Object.keys(SP.DEPTS).map(d => opt(d, X(SP.DEPTS[d]))).join('') + '</select><select class="inp" id="lf-c" style="width:auto;min-height:40px"><option value="">' + T('Toate județele', 'All counties') + '</option>' + [...new Set(L.map(l => l.county))].map(c => opt(c, c)).join('') + '</select></div><strong data-lc></strong></div><div class="locs" data-ll></div>' +
      '<div class="info" style="margin-top:24px">' + I('info') + '<span>' + T('Fiecare locație are azi propriul domeniu (ex. eurialotopeni.ro). În această propunere, paginile de locație le înlocuiesc, cu redirecționare 301 pentru a păstra poziția în Google.', 'Each location has its own domain today (e.g. eurialotopeni.ro). In this proposal the location pages replace them, with 301 redirects to keep their Google ranking.') + '</span></div></div></section>';
    return {
      title: T('Locații', 'Locations') + ' | Eurial', html,
      bind() {
        const b0 = SP.param('b'); if (b0) $('#lf-b').value = b0;
        const draw = () => { const b = $('#lf-b').value, d = $('#lf-d').value, c = $('#lf-c').value; const r = L.filter(l => (!b || l.brands.includes(b)) && (!d || l.dept.includes(d)) && (!c || l.county === c)); $('[data-ll]').innerHTML = r.map(locCard).join('') || '<div class="empty">' + T('Nicio locație', 'No location') + '</div>'; $('[data-lc]').textContent = r.length + ' / ' + L.length + ' ' + T('locații', 'locations'); };
        ['#lf-b', '#lf-d', '#lf-c'].forEach(s => $(s).onchange = draw); draw();
      }
    };
  };
  SP.pages.location = function () {
    const l = SP.loc(SP.param('id')) || L[0];
    const stock = S.filter(v => v.loc === l.id);
    const html = head(l.name, l.address, '<a href="locatii.html">' + T('Locații', 'Locations') + '</a> / ' + l.city) +
      '<section class="sec"><div class="wrap two"><div style="display:grid;gap:18px"><div class="mapbox"><iframe title="Map ' + esc(l.name) + '" loading="lazy" src="' + SP.maps(l.address) + '"></iframe></div>' +
      '<div class="card"><h3>' + T('Mărci', 'Brands') + '</h3>' + SP.brandChips(l) + '<h3 style="margin-top:18px">' + T('Departamente', 'Departments') + '</h3>' + SP.deptChips(l) + '</div>' +
      (stock.length ? '<div><div class="sec__h"><h2 style="font-size:1.4rem;margin:0">' + T('În stoc la ', 'In stock at ') + l.city + ' (' + stock.length + ')</h2><a class="link" href="stoc.html?loc=' + l.id + '">' + T('Tot stocul locației', 'All stock here') + I('arrow') + '</a></div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">' + stock.slice(0, 4).map(SP.card).join('') + '</div></div>' : '') + '</div>' +
      '<aside style="display:grid;gap:16px"><div class="card"><h3>Contact</h3><p>' + I('phone') + ' Call center <a href="tel:0219160"><b>' + G.callCenter + '</b></a><br>' + I('mail') + ' <a href="mailto:' + l.email + '">' + l.email + '</a></p><h3>' + T('Program (orientativ)', 'Hours (indicative)') + '</h3>' + SP.hoursTable() +
      '<div style="display:grid;gap:8px;margin-top:16px"><a class="btn btn--accent" href="service.html?loc=' + l.id + '">' + I('wrench') + T('Programare service', 'Book a service') + '</a><a class="btn btn--brand" href="contact.html?tip=testdrive&loc=' + l.id + '">' + I('car') + 'Test drive</a><a class="btn btn--line" href="' + SP.dir(l.address) + '" ' + SP.ext + '>' + I('pin') + T('Indicații rutiere', 'Directions') + '</a></div></div>' +
      '<div class="info">' + I('info') + '<span>' + T('Domeniul actual ', 'Current domain ') + '<b>' + l.web.replace('https://www.', '') + '</b>' + T(' → redirecționare 301 către această pagină.', ' → 301 redirect to this page.') + '</span></div></aside></div></section>';
    return { title: l.name + ' — ' + l.city + ' | Eurial', html };
  };

  /* ======================= BRAND PAGE (DS, Opel) ======================= */
  SP.pages.brand = function () {
    const b = SP.brand(SP.param('b'));
    if (!b || b.site) { location.replace(b ? b.site : 'index.html'); return { html: '' }; }
    const ms = SP.BRAND_MODELS[b.id], locs = SP.brandLocs(b.id);
    const html = '<section class="hero" style="background-image:url(\'' + b.img + '\')"><div class="wrap"><div class="hero__in" style="padding-bottom:clamp(48px,7vw,96px)"><span class="eyebrow" style="color:#fff;opacity:.8">' + T('Dealer autorizat', 'Authorised dealer') + '</span><h1 style="letter-spacing:.12em">' + b.word + '</h1><p>' + X(b.d) + '. ' + T('Disponibil în ', 'Available at ') + locs.length + ' ' + T('locații.', 'locations.') + '</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px"><a class="btn btn--accent" href="#oferta">' + T('Cere ofertă', 'Request an offer') + '</a><a class="btn btn--ghost" href="service.html?b=' + b.id + '">' + I('wrench') + T('Programare service', 'Book a service') + '</a></div></div></div></section>' +
      '<section class="sec"><div class="wrap"><h2>' + T('Modele', 'Models') + '</h2><div class="grid">' + ms.map(m => '<article class="mcard" id="' + SP.slugify(m.n) + '"><div class="mcard__img mcard__img--photo"><img src="' + m.img + '" alt="' + esc(m.n) + '" loading="lazy"></div><div class="mcard__b"><b>' + m.n + '</b><span class="mute small">' + X(m.t) + '</span><div class="mcard__f"><button class="btn btn--line btn--sm" type="button" data-pick="' + esc(m.n) + '">' + T('Cere ofertă', 'Request offer') + '</button><button class="btn btn--line btn--sm" type="button" data-td="' + esc(m.n) + '">Test drive</button></div></div></article>').join('') + '</div>' +
      '<p class="small mute" style="margin-top:12px">' + T('Prețuri și configurații la cerere. Gama completă și noutățile sunt disponibile în showroom.', 'Prices and configurations on request. The full range and new arrivals are available in the showroom.') + '</p></div></section>' +
      '<section class="sec sec--alt" id="oferta"><div class="wrap two"><form class="card form" data-f novalidate><h2 class="full" style="font-size:1.4rem">' + T('Cere ofertă sau test drive', 'Request an offer or test drive') + '</h2>' +
      '<div class="fld"><label for="f-tip">' + T('Solicitare', 'Request') + '</label><select class="inp" id="f-tip" name="tip">' + opt('offer', T('Ofertă de preț', 'Price offer')) + opt('testdrive', 'Test drive') + '</select></div>' +
      '<div class="fld"><label for="f-model">Model</label><select class="inp" id="f-model" name="model">' + ms.map(m => opt(m.n, m.n)).join('') + '</select></div>' +
      '<div class="fld full"><label for="f-loc">' + T('Locația preferată', 'Preferred location') + '</label><select class="inp" id="f-loc" name="location">' + locs.map(l => opt(l.id, l.name + ' — ' + l.city)).join('') + '</select></div>' +
      SP.contactFields({ msg: true }) + '<div class="full"><button class="btn btn--accent" type="submit">' + I('send') + T('Trimite', 'Send') + '</button></div></form>' +
      '<aside><h3>' + T('Locații ', 'Locations: ') + b.name + '</h3><div style="display:grid;gap:10px">' + locs.map(l => '<a class="tile" href="locatie.html?id=' + l.id + '">' + l.name + '<em>' + l.city + '</em></a>').join('') + '</div></aside></div></section>';
    return {
      title: b.name + ' | Eurial', html,
      bind() {
        const f = $('[data-f]');
        $$('[data-pick],[data-td]').forEach(x => x.onclick = () => { $('#f-model').value = x.dataset.pick || x.dataset.td; $('#f-tip').value = x.dataset.td ? 'testdrive' : 'offer'; $('#oferta').scrollIntoView({ behavior: 'smooth' }); });
        f.addEventListener('submit', e => { e.preventDefault(); if (!SP.validate(f)) return; const d = SP.formData(f); const l = SP.lead(d.tip, Object.assign(d, { brand: b.id })); f.outerHTML = '<div class="card">' + SP.done(T('Mulțumim!', 'Thank you!'), T('Un consultant ', 'A ') + b.name + T(' de la ', ' advisor from ') + SP.loc(d.location).name + T(' vă contactează în curând.', ' will contact you shortly.'), l.ref) + '</div>'; });
      }
    };
  };

  /* ======================= CONTACT / ABOUT / CAREERS / COMPLAINTS ======================= */
  SP.pages.contact = function () {
    const tip = SP.param('tip') || 'contact', loc0 = SP.param('loc') || '';
    const html = head('Contact', T('Call center ', 'Call centre ') + G.callCenter + ' · ' + G.email, 'Contact') +
      '<section class="sec"><div class="wrap two"><form class="card form" data-f novalidate><h2 class="full" style="font-size:1.4rem">' + T('Trimiteți-ne un mesaj', 'Send us a message') + '</h2>' +
      '<div class="fld"><label for="c-tip">' + T('Subiect', 'Subject') + '</label><select class="inp" id="c-tip" name="tip">' + [['contact', T('Informații generale', 'General information')], ['offer', T('Ofertă mașină nouă', 'New car offer')], ['testdrive', 'Test drive'], ['leasing', T('Leasing operațional', 'Operational leasing')]].map(o => opt(o[0], o[1], o[0] === tip)).join('') + '</select></div>' +
      '<div class="fld"><label for="c-b">' + T('Marcă', 'Brand') + '</label><select class="inp" id="c-b" name="brand"><option value="">' + T('Oricare', 'Any') + '</option>' + B.map(b => opt(b.id, b.name)).join('') + '</select></div>' +
      '<div class="fld full"><label for="c-l">' + T('Locație', 'Location') + '</label><select class="inp" id="c-l" name="location"><option value="">' + T('Cea mai apropiată', 'Nearest') + '</option>' + L.map(l => opt(l.id, l.name, l.id === loc0)).join('') + '</select></div>' +
      SP.contactFields({ msg: true }) + '<div class="full"><button class="btn btn--accent" type="submit">' + I('send') + T('Trimite', 'Send') + '</button></div></form>' +
      '<aside style="display:grid;gap:16px"><div class="card"><h3>Call center</h3><p style="font-size:1.6rem;font-weight:800;margin:0"><a href="tel:0219160">' + G.callCenter + '</a></p><p class="mute">' + G.email + '</p>' + SP.hoursTable() + '</div><div class="card"><h3>' + T('Locații', 'Locations') + '</h3><div style="display:grid;gap:8px">' + L.map(l => '<a class="tile" href="locatie.html?id=' + l.id + '">' + l.name + '<em>' + l.email + '</em></a>').join('') + '</div></div></aside></div></section>';
    return {
      title: 'Contact | Eurial', html,
      bind() {
        const f = $('[data-f]'), lsel = $('#c-l'), bsel = $('#c-b');
        bsel.onchange = () => { const b = bsel.value; $$('option', lsel).forEach(o => { o.hidden = !!(o.value && b && !SP.loc(o.value).brands.includes(b)); }); if (lsel.selectedOptions[0] && lsel.selectedOptions[0].hidden) lsel.value = ''; };
        f.addEventListener('submit', e => { e.preventDefault(); if (!SP.validate(f)) return; const d = SP.formData(f); const l = SP.lead(d.tip, d); f.outerHTML = '<div class="card">' + SP.done(T('Mulțumim!', 'Thank you!'), T('Mesajul a fost trimis' + (d.location ? ' către ' + SP.loc(d.location).name : '') + '.', 'Message sent' + (d.location ? ' to ' + SP.loc(d.location).name : '') + '.'), l.ref) + '</div>'; });
      }
    };
  };
  SP.pages.about = function () {
    const html = head(T('Despre noi', 'About us'), T('Un grup auto multi-marcă, cu 7 locații în 5 județe și București.', 'A multi-brand auto group with 7 locations across Bucharest and 5 counties.'), T('Despre', 'About')) +
      '<section class="sec"><div class="wrap"><div class="usps" style="margin-top:0">' + [['car', '5', T('mărci auto', 'car brands')], ['building', '7', T('locații de vânzări și service', 'sales & service locations')], ['check', '1', T('stație ITP (Otopeni)', 'ITP station (Otopeni)')], ['shield', 'Certified', T('ocazii verificate', 'checked used cars')]].map(x => '<div class="usp">' + I(x[0]) + '<div><b>' + x[1] + '</b><span>' + x[2] + '</span></div></div>').join('') + '</div>' +
      '<div class="band" style="margin-top:30px"><div class="band__img" style="background-image:url(\'' + SP.BANNERS.peugeotRange + '\')"></div><div class="band__b"><h2>' + T('Vânzări, service, piese, leasing și asigurări', 'Sales, service, parts, leasing and insurance') + '</h2><p class="mute">' + T('Grupul este dealer autorizat Peugeot, Citroën, DS și Opel, iar de curând și Omoda & Jaecoo. Pe lângă mașini noi, oferim mașini rulate certificate, leasing operațional, brokeraj de asigurări, piese și accesorii originale.', 'The group is an authorised Peugeot, Citroën, DS and Opel dealer, and recently Omoda & Jaecoo. Besides new cars we offer certified used cars, operational leasing, insurance brokerage and genuine parts.') + '</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--accent" href="locatii.html">' + T('Locațiile noastre', 'Our locations') + '</a><a class="btn btn--line" href="cariere.html">' + T('Cariere', 'Careers') + '</a></div></div></div></div></section>';
    return { title: T('Despre noi', 'About us'), html };
  };
  SP.pages.careers = function () {
    const jobs = [[T('Consultant vânzări', 'Sales consultant'), 'Cluj-Napoca'], [T('Mecanic auto', 'Car mechanic'), 'Otopeni'], [T('Tinichigiu / vopsitor', 'Body & paint technician'), 'Săcele (Brașov)'], [T('Consilier service', 'Service advisor'), 'Pantelimon'], [T('Specialist piese', 'Parts specialist'), 'Ploiești (Blejoi)']];
    const html = head(T('Cariere', 'Careers'), T('Alăturați-vă echipei din una dintre cele 7 locații.', 'Join the team at one of our 7 locations.'), T('Cariere', 'Careers')) +
      '<section class="sec"><div class="wrap two"><div style="display:grid;gap:10px">' + jobs.map(j => '<div class="tile">' + j[0] + '<em>' + I('pin') + ' ' + j[1] + '</em></div>').join('') + '<p class="small mute">' + T('Posturi exemplificative (demo).', 'Sample positions (demo).') + '</p></div>' +
      '<form class="card form" data-f novalidate><h2 class="full" style="font-size:1.4rem">' + T('Candidatură', 'Application') + '</h2><div class="fld full"><label for="j-p">' + T('Post', 'Position') + '</label><select class="inp" id="j-p" name="position">' + jobs.map(j => opt(j[0] + ' — ' + j[1], j[0] + ' — ' + j[1])).join('') + '</select></div>' + SP.contactFields({ msg: true, msgLabel: T('Despre dumneavoastră / link CV', 'About you / CV link') }) + '<div class="full"><button class="btn btn--accent" type="submit">' + T('Trimite candidatura', 'Apply') + '</button></div></form></div></section>';
    return { title: T('Cariere', 'Careers'), html, bind() { SP.bindForm($('[data-f]'), 'career'); } };
  };
  SP.pages.complaints = function () {
    const html = head(T('Sugestii și reclamații', 'Feedback & complaints'), T('Răspundem în cel mult 30 de zile, conform legii.', 'We reply within 30 days, as required by law.'), T('Reclamații', 'Complaints')) +
      '<section class="sec"><div class="wrap two"><form class="card form" data-f novalidate><div class="fld"><label for="r-t">' + T('Tip', 'Type') + '</label><select class="inp" id="r-t" name="kind">' + opt('sugestie', T('Sugestie', 'Suggestion')) + opt('reclamatie', T('Reclamație', 'Complaint')) + opt('apreciere', T('Apreciere', 'Compliment')) + '</select></div><div class="fld"><label for="r-l">' + T('Locație', 'Location') + '</label><select class="inp" id="r-l" name="location">' + L.map(l => opt(l.id, l.name)).join('') + '</select></div>' +
      SP.contactFields({ msg: true }) + '<div class="full"><button class="btn btn--accent" type="submit">' + T('Trimite', 'Send') + '</button></div></form><aside class="card"><h3>' + T('Alte căi', 'Other routes') + '</h3><p class="mute">' + T('Puteți apela și la ANPC sau la platforma europeană SOL pentru soluționarea alternativă a litigiilor.', 'You can also contact ANPC or the EU ODR platform for alternative dispute resolution.') + '</p><p><a href="https://anpc.ro/ce-este-sal/" ' + SP.ext + '>ANPC – SAL</a> · <a href="https://ec.europa.eu/consumers/odr" ' + SP.ext + '>SOL</a></p></aside></div></section>';
    return { title: T('Sugestii și reclamații', 'Feedback & complaints'), html, bind() { SP.bindForm($('[data-f]'), 'complaint'); } };
  };

  /* ======================= LEGAL ======================= */
  SP.pages.legal = function () {
    const doc = SP.param('doc') || 'gdpr';
    const credits = Object.entries(SP.BRAND_MODELS).flatMap(([k, ms]) => ms.map(m => '<li>' + m.n + ' — ' + m.cr + ' / Wikimedia Commons, CC BY-SA 4.0</li>')).join('');
    const D = {
      gdpr: [T('Protecția datelor (GDPR)', 'Data protection (GDPR)'), T('<p>Datele transmise prin formulare sunt folosite pentru a răspunde solicitării (ofertă, test drive, programare service, contact) și sunt direcționate către marca și locația alese. Temeiul: demersuri precontractuale, interes legitim și, pentru marketing, consimțământul. Aveți dreptul de acces, rectificare, ștergere, restricționare, opoziție și portabilitate, precum și dreptul de a vă adresa ANSPDCP.</p>', '<p>Data sent through the forms is used to answer your request (offer, test drive, service booking, contact) and routed to the chosen brand and location. Legal bases: pre-contractual steps, legitimate interest and, for marketing, consent. You have the rights of access, rectification, erasure, restriction, objection and portability, and may complain to ANSPDCP.</p>')],
      cookies: ['Cookies', T('<p>Folosim cookie-uri și stocare locală esențiale (limbă, alegerea cookie-urilor). Cookie-urile de analiză se activează doar cu acordul dumneavoastră.</p>', '<p>We use essential cookies and local storage (language, cookie choice). Analytics cookies are set only with your consent.</p>')],
      termeni: [T('Termeni și condiții', 'Terms'), T('<p>Prețurile afișate sunt prețuri recomandate cu TVA și au caracter informativ. Oferta finală se confirmă în scris de consultantul de vânzări. Imaginile pot conține echipamente opționale.</p>', '<p>Prices shown are recommended prices incl. VAT and are for information. The final offer is confirmed in writing by the sales advisor. Images may show optional equipment.</p>')],
      credite: [T('Credite foto', 'Photo credits'), T('<p>Imaginile Peugeot și Citroën provin din bibliotecile media peugeot.ro și citroen.ro, iar cele Omoda & Jaecoo din site-ul demo al mărcii (preluate de la importator). Fotografiile DS și Opel: Wikimedia Commons.</p>', '<p>Peugeot and Citroën images come from the peugeot.ro and citroen.ro media libraries; Omoda & Jaecoo images from the brand demo site (importer material). DS and Opel photos: Wikimedia Commons.</p>') + '<ul>' + credits + '</ul>']
    };
    const d = D[doc] || D.gdpr;
    return { title: d[0], html: head(d[0], '', 'Legal') + '<section class="sec"><div class="wrap prose">' + d[1] + '<p class="small mute">' + T('Text demonstrativ — se înlocuiește cu textele legale ale grupului.', 'Demo text — to be replaced by the group’s legal texts.') + '</p></div></section>' };
  };
  SP.pages.notfound = () => ({ title: '404', html: '<section class="sec"><div class="wrap" style="text-align:center"><h1>' + T('Pagina nu a fost găsită', 'Page not found') + '</h1><a class="btn btn--accent" href="index.html">' + T('Înapoi acasă', 'Back home') + '</a></div></section>' });
})();
