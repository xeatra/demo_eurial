/* Eurial group demo — content. Locations, brands per location and departments are Eurial's public data
   (eurial.ro/locatii and eurial{location}.ro, October 2026). Opening hours are indicative.
   Production: group & location settings in Sales Partner (website module). */
window.SP = window.SP || {};

SP.GROUP = {
  name: 'Eurial',
  callCenter: '021 9160',
  email: 'office@eurial.ro',
  ocazii: 'https://www.eurialcertified.ro/',
  broker: 'http://eurialbroker.ro',
  portal: 'https://customerportal-wheat.vercel.app/',
  hours: [['Luni – Vineri', 'Monday – Friday', '08:00 – 18:00'], ['Sâmbătă', 'Saturday', '09:00 – 14:00'], ['Duminică', 'Sunday', null]]
};

/* brands: site = demo brand website (opens in a new tab); page = brand page inside the group site */
SP.BRANDS = [
  { id: 'peugeot', name: 'Peugeot', word: 'PEUGEOT', color: '#0A0A0A', site: SP.SITES.peugeot, img: SP.BANNERS.peugeot,
    d: ['Gama completă: 208, 2008, 308, 408, 3008, 5008, Rifter, Traveller și utilitare', 'Full range: 208, 2008, 308, 408, 3008, 5008, Rifter, Traveller and vans'] },
  { id: 'citroen', name: 'Citroën', word: 'CITROËN', color: '#DA291C', site: SP.SITES.citroen, img: SP.BANNERS.citroen,
    d: ['11 modele, configurator, stoc și programare service', '11 models, configurator, stock and service booking'] },
  { id: 'omoda', name: 'Omoda & Jaecoo', word: 'OMODA & JAECOO', color: '#3C4A3E', site: SP.SITES.omoda, img: SP.BANNERS.omoda,
    d: ['SUV-uri hibride, plug-in și electrice, garanție 7 ani', 'Hybrid, plug-in and electric SUVs, 7-year warranty'] },
  { id: 'ds', name: 'DS Automobiles', word: 'DS', color: '#8C7B6B', page: 'marca.html?b=ds', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/DS4_Cross_%282023%29.jpg/1280px-DS4_Cross_%282023%29.jpg',
    d: ['Premium francez: vânzări la cerere și service autorizat', 'French premium: sales on request and authorised service'] },
  { id: 'opel', name: 'Opel', word: 'OPEL', color: '#F7D800', page: 'marca.html?b=opel', img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Opel_Astra_L_1X7A0336.jpg/1280px-Opel_Astra_L_1X7A0336.jpg',
    d: ['Corsa, Astra, Mokka, Grandland: vânzări și service în toate locațiile', 'Corsa, Astra, Mokka, Grandland: sales and service at every location'] }
];

/* the 7 Eurial locations (real addresses; departments as listed on eurial.ro/locatii) */
const W = 'https://www.eurial';
SP.LOCATIONS = [
  { id: 'pantelimon', name: 'Eurial Pantelimon', city: 'Pantelimon', county: 'Ilfov', address: 'B-dul Biruinței nr. 1B, 077145 Pantelimon, jud. Ilfov', email: 'office@eurialpantelimon.ro', web: W + 'pantelimon.ro', dept: ['sales', 'service'], hq: true },
  { id: 'militari', name: 'Eurial Militari', city: 'București', county: 'Sector 6', address: 'Bd. Iuliu Maniu nr. 572–574, Sector 6, 061129 București', email: 'office@eurialmilitari.ro', web: W + 'militari.ro', dept: ['sales', 'service'] },
  { id: 'otopeni', name: 'Eurial Otopeni', city: 'Otopeni', county: 'Ilfov', address: 'Calea Bucureștilor nr. 24, DN1, 075100 Otopeni, jud. Ilfov', email: 'office@eurialotopeni.ro', web: W + 'otopeni.ro', dept: ['sales', 'service', 'body', 'parts', 'itp'] },
  { id: 'brasov', name: 'Eurial Brașov', city: 'Săcele (Brașov)', county: 'Brașov', address: 'Calea București nr. 23, DN1, 505600 Săcele, jud. Brașov', email: 'office@eurialbrasov.ro', web: W + 'brasov.ro', dept: ['sales', 'service', 'body', 'parts'] },
  { id: 'cluj', name: 'Eurial Cluj', city: 'Cluj-Napoca', county: 'Cluj', address: 'Calea Turzii nr. 251, 400702 Cluj-Napoca, jud. Cluj', email: 'office@eurialcluj.ro', web: W + 'cluj.ro', dept: ['sales', 'service'] },
  { id: 'pitesti', name: 'Eurial Pitești', city: 'Pitești (Bradu)', county: 'Argeș', address: 'DN 65B, Comuna Bradu, Zona Comercială nr. 5, jud. Argeș', email: 'office@eurialpitesti.ro', web: W + 'pitesti.ro', dept: ['sales', 'service'] },
  { id: 'ploiesti', name: 'Eurial Ploiești', city: 'Ploiești (Blejoi)', county: 'Prahova', address: 'Str. Republicii nr. 78, Comuna Blejoi, jud. Prahova (fostul DN1B, km 6)', email: 'office@eurialploiesti.ro', web: W + 'ploiesti.ro', dept: ['sales', 'service'] }
];
SP.LOCATIONS.forEach(l => { l.brands = SP.LOC_BRANDS[l.id]; });

SP.DEPTS = {
  sales: ['Vânzări autoturisme noi', 'New car sales', 'car'],
  service: ['Service autorizat', 'Authorised service', 'wrench'],
  body: ['Caroserie & vopsitorie', 'Body & paint', 'sparkle'],
  parts: ['Piese & accesorii', 'Parts & accessories', 'tag'],
  itp: ['Stație ITP', 'MOT (ITP) station', 'check']
};

/* DS and Opel brand pages (no demo site): models with photos (Wikimedia Commons, CC BY-SA 4.0) */
const WM = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/';
SP.BRAND_MODELS = {
  ds: [
    { n: 'DS 3', t: ['Crossover compact premium, benzină sau 100% electric (E-TENSE)', 'Premium compact crossover, petrol or fully electric (E-TENSE)'], img: WM + 'e/eb/2019_DS_DS3_Crossback_Performance_Line_PureTech_1.2_Front.jpg/960px-2019_DS_DS3_Crossback_Performance_Line_PureTech_1.2_Front.jpg', cr: 'Vauxford' },
    { n: 'DS 4', t: ['Compactă premium: hibrid, plug-in hibrid sau electric', 'Premium compact: hybrid, plug-in hybrid or electric'], img: WM + '9/92/2022_DS_4_Rivoli_PHEV_Auto.jpg/960px-2022_DS_4_Rivoli_PHEV_Auto.jpg', cr: 'Calreyn88' },
    { n: 'DS 9', t: ['Berlina de reprezentanță, plug-in hibrid E-TENSE', 'Executive saloon, E-TENSE plug-in hybrid'], img: WM + '6/6e/2022_DS_9_Performance_Line_%2B_Puretech.jpg/960px-2022_DS_9_Performance_Line_%2B_Puretech.jpg', cr: 'Calreyn88' }
  ],
  opel: [
    { n: 'Opel Corsa', t: ['Compacta urbană: benzină, hibrid sau Corsa Electric', 'Urban compact: petrol, hybrid or Corsa Electric'], img: WM + '6/60/2023_Opel_Corsa_F_Auto_Zuerich_2023_1X7A1113.jpg/960px-2023_Opel_Corsa_F_Auto_Zuerich_2023_1X7A1113.jpg', cr: 'Alexander-93' },
    { n: 'Opel Astra', t: ['Hatchback și Sports Tourer: hibrid, plug-in sau electric', 'Hatchback and Sports Tourer: hybrid, plug-in or electric'], img: WM + 'b/bd/Opel_Astra_L_1X7A0336.jpg/960px-Opel_Astra_L_1X7A0336.jpg', cr: 'Alexander Migl' },
    { n: 'Opel Mokka', t: ['SUV compact cu design Vizor, inclusiv Mokka Electric', 'Compact SUV with the Vizor face, including Mokka Electric'], img: WM + '7/78/Opel_Mokka_B_IMG_4457.jpg/960px-Opel_Mokka_B_IMG_4457.jpg', cr: 'Alexander Migl' },
    { n: 'Opel Grandland', t: ['SUV de familie: hibrid, plug-in hibrid sau electric', 'Family SUV: hybrid, plug-in hybrid or electric'], img: WM + '6/6e/Opel_Grandland_B_MHEV_Auto_Zuerich_2024_DSC_6140.jpg/960px-Opel_Grandland_B_MHEV_Auto_Zuerich_2024_DSC_6140.jpg', cr: 'Alexander-93' }
  ]
};

/* service catalogue: which departments are needed */
SP.SERVICES = [
  { id: 'revizie', n: ['Revizie periodică', 'Scheduled service'], d: ['Ulei, filtre și verificări conform planului producătorului', 'Oil, filters and checks per the maker’s plan'], dept: 'service' },
  { id: 'reparatii', n: ['Reparații mecanice', 'Mechanical repairs'], d: ['Diagnoză și reparații motor, transmisie, frâne', 'Diagnosis and repairs: engine, gearbox, brakes'], dept: 'service' },
  { id: 'anvelope', n: ['Anvelope & geometrie', 'Tyres & alignment'], d: ['Schimb sezonier, hotel anvelope, geometrie', 'Seasonal change, tyre hotel, alignment'], dept: 'service' },
  { id: 'garantie', n: ['Garanție & rechemare', 'Warranty & recall'], d: ['Intervenții în garanție și campanii de rechemare', 'Warranty work and recall campaigns'], dept: 'service' },
  { id: 'caroserie', n: ['Caroserie & vopsitorie', 'Body & paint'], d: ['Daune RCA/CASCO, vopsitorie, constatare', 'Insurance claims, paint, damage assessment'], dept: 'body' },
  { id: 'itp', n: ['Inspecție tehnică (ITP)', 'MOT inspection (ITP)'], d: ['Stație ITP autorizată RAR', 'RAR-authorised ITP station'], dept: 'itp' }
];

SP.GROUP_SERVICES = [
  { id: 'leasing', ic: 'doc', n: ['Leasing operațional', 'Operational leasing'], d: ['Mașini noi pentru companii, cu service, asigurare și anvelope incluse într-o rată lunară.', 'New cars for companies, with service, insurance and tyres in one monthly fee.'] },
  { id: 'asigurari', ic: 'shield', n: ['Asigurări — Eurial Broker', 'Insurance — Eurial Broker'], d: ['RCA, CASCO și asigurări de viață prin brokerul grupului.', 'Motor third-party, comprehensive and life insurance through the group broker.'], ext: 'broker' },
  { id: 'rabla', ic: 'leaf', n: ['Programul Rabla', 'Rabla scrappage programme'], d: ['Casarea mașinii vechi și primă pentru mașini electrice și hibride, în limita fondurilor AFM.', 'Scrap your old car and get a bonus for electric and hybrid cars, subject to AFM funds.'] },
  { id: 'itp', ic: 'check', n: ['Stație ITP — Otopeni', 'ITP station — Otopeni'], d: ['Inspecție tehnică periodică pentru toate mărcile, la Eurial Otopeni.', 'Periodic technical inspection for all makes, at Eurial Otopeni.'] },
  { id: 'piese', ic: 'tag', n: ['Piese, consumabile & accesorii', 'Parts, consumables & accessories'], d: ['Piese originale pentru Peugeot, Citroën, DS, Opel, Omoda & Jaecoo. Comandă cu ridicare din locație.', 'Genuine parts for all our brands. Order and collect at a location.'] },
  { id: 'manuale', ic: 'doc', n: ['Manuale & mentenanță', 'Manuals & maintenance'], d: ['Planuri de mentenanță și manuale de utilizare pe model, disponibile și în contul de client.', 'Maintenance plans and owner’s manuals per model, also in your customer account.'] }
];

SP.NEWS = [
  { id: 'jaecoo-7-shs-h', date: '2026-10-13', brand: 'omoda', t: ['Noul JAECOO 7 SHS-H, disponibil la Eurial Pantelimon', 'The new JAECOO 7 SHS-H, now at Eurial Pantelimon'], img: SP.BANNERS.omoda },
  { id: 'c5-aircross', date: '2026-10-02', brand: 'citroen', t: ['Noul Citroën C5 Aircross, în showroom-urile Eurial', 'The new Citroën C5 Aircross, in Eurial showrooms'], img: SP.BANNERS.citroen },
  { id: 'peugeot-3008', date: '2026-09-20', brand: 'peugeot', t: ['PEUGEOT 3008: hibrid, plug-in sau electric, test drive în 7 orașe', 'PEUGEOT 3008: hybrid, plug-in or electric, test drives in 7 cities'], img: SP.BANNERS.peugeot }
];
