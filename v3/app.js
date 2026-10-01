(() => {
  const P = window.TSENOH_PRODUCTS;
  const COPY = window.TSENOH_COPY;
  const SHOP = "https://tsenoh.com";
  const FREE_SHIPPING_FROM = 150; // placeholder threshold, confirm with Eva
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const byHandle = Object.fromEntries(P.map(p => [p.handle, p]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const hasGsap = !!window.gsap;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  let lang = store.get("lang", (navigator.language || "en").startsWith("es") ? "es" : "en");
  let bag = store.get("bag", []).filter(h => byHandle[h]);
  const t = k => COPY[lang][k];
  const img = (url, w) => url + (url.includes("?") ? "&" : "?") + "width=" + w;
  const eur = n => n.toLocaleString(lang === "es" ? "es-ES" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const name = p => p.title.replace(/ - Xs$/i, "");
  const sub = p => (p[lang].sub || "").replace(/\s+/g, " ").toLowerCase();

  /* ---------- i18n ---------- */
  function applyCopy() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach(el => (el.innerHTML = t(el.dataset.i18nHtml)));
    $("#lettersEmail").placeholder = t("lettersPlaceholder");
    $("#langBtn").textContent = lang === "en" ? "ES" : "EN";
    renderChips(); renderGrid(); renderOoak(); renderMoon(); renderBag();
    if (activeStar) showStar(activeStar);
  }
  $("#langBtn").onclick = () => { lang = lang === "en" ? "es" : "en"; store.set("lang", lang); applyCopy(); };

  /* ---------- intro ---------- */
  function openIntro() {
    const intro = $("#intro");
    intro.classList.add("gone");
    setTimeout(() => intro.remove(), 950);
    if (hasGsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(".hero__photo", { scale: 1.12, duration: 2.4, ease: "expo.out" });
      gsap.fromTo(".hero__logo", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut", delay: .35 });
      gsap.from(".hero__goods, .hero__cta, .hero__side", { y: 24, opacity: 0, duration: 1, stagger: .1, ease: "expo.out", delay: 1.1 });
      gsap.from(".hero__b", { scale: 0, rotate: -40, opacity: 0, duration: 1.1, stagger: .12, ease: "back.out(2)", delay: .7 });
      $$(".hero__b").forEach((b, i) => gsap.to(b, { y: i % 2 ? 10 : -12, rotate: `+=${i % 2 ? 6 : -6}`, duration: 3 + i, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 }));
    }
  }
  Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1800))]).then(() => setTimeout(openIntro, 1300));

  /* ---------- hero ---------- */
  $("#heroImgA").src = img(byHandle["vestido-outsider-picnic"].images[0], 900);
  $("#heroImgB").src = img(byHandle["jersey-aries-crudo"].images[1], 700);
  $("#heroImgC").src = img(byHandle["minerva-scarf-rose"].images[0], 800);
  $("#evaImg").src = img(byHandle["havanna-yara"].images[0], 900);

  /* ---------- moon ---------- */
  function moonState(date = new Date()) {
    const synodic = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14);
    const age = (((date - ref) / 864e5) % synodic + synodic) % synodic;
    const phase = age / synodic;
    return { phase, lit: (1 - Math.cos(phase * 2 * Math.PI)) / 2, index: Math.round(phase * 8) % 8 };
  }
  function moonPath(phase) {
    // Lit shape = outer semicircle + terminator ellipse, both on a r=46 disc centred at 50,50.
    const r = 46, waxing = phase < .5, k = Math.cos(phase * 2 * Math.PI);
    const rx = Math.abs(k) * r, outer = waxing ? 1 : 0, inner = waxing === k > 0 ? 0 : 1;
    return `M50 4 A${r} ${r} 0 0 ${outer} 50 96 A${rx} ${r} 0 0 ${inner} 50 4Z`;
  }
  function renderMoon() {
    const m = moonState();
    $("#moonLit").setAttribute("d", moonPath(m.phase));
    $("#moonPhase").textContent = `${t("moonNames")[m.index]} · ${Math.round(m.lit * 100)}% ${t("lit")}`;
    $("#moonLine").textContent = t("moonLines")[m.index];
    $("#ringText").textContent = `${t("moonEyebrow")} ✦ ${t("moonNames")[m.index]} ${Math.round(m.lit * 100)}% ✦ Cruïlles · Baix Empordà ✦ `;
  }

  let moonTaps = [];
  $("#moonDisc").onclick = e => {
    const now = Date.now(); moonTaps = [...moonTaps.filter(x => now - x < 1200), now];
    burst(e.clientX, e.clientY, 10);
    if (moonTaps.length >= 3) { moonTaps = []; pinkRain(); toast(t("rain")); }
  };

  /* ---------- sparkles + cursor ---------- */
  function burst(x, y, n = 7) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "spark"; s.textContent = i % 3 ? "✦" : "✧";
      s.style.left = x + "px"; s.style.top = y + "px";
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 50;
      s.animate([
        { transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(${.6 + Math.random()}) rotate(${Math.random() * 180}deg)`, opacity: 0 },
      ], { duration: 700 + Math.random() * 400, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = () => s.remove();
    }
  }
  addEventListener("pointerdown", e => { if (!e.target.closest("input, .sheet__panel, .bag__panel")) burst(e.clientX, e.clientY, 5); });

  function pinkRain() {
    const glyphs = ["✦", "✧", "❀", "✿", "☾", "♡"];
    for (let i = 0; i < 70; i++) {
      const d = document.createElement("span");
      d.className = "drop"; d.textContent = glyphs[i % glyphs.length];
      d.style.left = Math.random() * 100 + "vw";
      d.style.color = ["#f59897", "#fdd3e2", "#ef60a3", "#b8b3ee"][i % 4];
      d.style.fontSize = 14 + Math.random() * 26 + "px";
      document.body.appendChild(d);
      d.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(${innerHeight + 80}px) rotate(${Math.random() * 720 - 360}deg)` }],
        { duration: 2200 + Math.random() * 2400, delay: Math.random() * 1400, easing: "cubic-bezier(.4,0,.8,.6)" }).onfinish = () => d.remove();
    }
  }

  const cursor = $("#cursor");
  let lastTrail = 0;
  addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    cursor.classList.add("on");
    cursor.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 11}px)`;
    if (e.timeStamp - lastTrail > 60) { lastTrail = e.timeStamp; burst(e.clientX, e.clientY, 1); }
  });

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("on"), 2400);
  }

  /* ---------- nav + menu ---------- */
  addEventListener("scroll", () => $("#nav").classList.toggle("scrolled", scrollY > 40), { passive: true });
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  const toggleMenu = open => { menu.classList.toggle("open", open); menuBtn.classList.toggle("open", open); document.body.classList.toggle("locked", open); };
  menuBtn.onclick = () => toggleMenu(!menu.classList.contains("open"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- one of a kind ---------- */
  function renderOoak() {
    const list = P.filter(p => p.ooak).sort((a, b) => b.available - a.available);
    $("#ooakRail").innerHTML = list.map((p, i) => `
      <button class="ooak-card ${p.available ? "" : "sold"}" data-open="${p.handle}">
        <figure class="ooak-card__photo"><div style="height:100%"><img loading="lazy" src="${img(p.images[0], 700)}" alt="${name(p)}"></div><span class="ooak-card__n">${p.available ? "1/1" : t("soldOut")}</span></figure>
        <h3>${name(p)}</h3><p>${eur(p.price)} · Nº ${String(i + 1).padStart(2, "0")}</p>
      </button>`).join("");
  }

  // Fabric-in-the-wind: SVG displacement on hover (fine pointers only).
  const windMap = $("#windMap"), windNoise = $("#windNoise");
  if (matchMedia("(hover: hover)").matches) {
    let raf, target = 0, cur = 0;
    const tick = time => {
      cur += (target - cur) * .08;
      windMap.setAttribute("scale", cur.toFixed(2));
      windNoise.setAttribute("baseFrequency", `${.008 + Math.sin(time / 900) * .002} ${.02 + Math.cos(time / 700) * .004}`);
      if (Math.abs(target - cur) > .05 || target) raf = requestAnimationFrame(tick); else raf = null;
    };
    document.addEventListener("pointerover", e => {
      const card = e.target.closest(".ooak-card img");
      $$(".ooak-card img").forEach(i => (i.style.filter = i === card ? "url(#wind)" : ""));
      target = card ? 22 : 0;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  }

  /* ---------- constellation ---------- */
  const STARS = [
    { key: "Sirius", x: 90, y: 90, mag: 1 }, { key: "Vega", x: 300, y: 60, mag: .9 },
    { key: "Aries", x: 330, y: 200, mag: .8 }, { key: "Minerva", x: 200, y: 160, mag: .8 },
    { key: "Meteor", x: 60, y: 250, mag: .7 }, { key: "Island", x: 190, y: 290, mag: .9 },
    { key: "Havanna", x: 320, y: 350, mag: .9 }, { key: "Derby", x: 110, y: 400, mag: .9 },
    { key: "Silvestra", x: 250, y: 460, mag: .7 }, { key: "Wild", x: 50, y: 490, mag: .6 },
  ];
  const LINKS = [[0, 3], [3, 1], [1, 2], [3, 5], [0, 4], [4, 5], [5, 6], [5, 7], [7, 8], [6, 8], [7, 9]];
  const family = key => P.filter(p => new RegExp(`\\b${key}\\b`, "i").test(p.title));
  let activeStar = null;

  function renderSky() {
    const svg = $("#skyMap");
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const dust = Array.from({ length: 110 }, () => `<circle class="sky-dust" cx="${rnd() * 400}" cy="${rnd() * 520}" r="${rnd() * 1.1 + .2}" opacity="${rnd() * .6 + .1}"/>`).join("");
    const lines = LINKS.map(([a, b]) => `<line class="sky-line" x1="${STARS[a].x}" y1="${STARS[a].y}" x2="${STARS[b].x}" y2="${STARS[b].y}"/>`).join("");
    const stars = STARS.map((s, i) => {
      const r = 9 * s.mag, n = family(s.key).length;
      const right = s.x < 250;
      return `<g class="sky-star" data-star="${s.key}" tabindex="0" role="button" aria-label="${s.key}">
        <circle class="glow" cx="${s.x}" cy="${s.y}" r="${r * 2.4}" style="animation-delay:${i * .4}s"/>
        <path d="M${s.x} ${s.y - r * 1.6} Q${s.x} ${s.y} ${s.x + r * 1.6} ${s.y} Q${s.x} ${s.y} ${s.x} ${s.y + r * 1.6} Q${s.x} ${s.y} ${s.x - r * 1.6} ${s.y} Q${s.x} ${s.y} ${s.x} ${s.y - r * 1.6}Z"/>
        <circle cx="${s.x}" cy="${s.y}" r="${r * 3}" fill="transparent"/>
        <text x="${s.x + (right ? 20 : -20)}" y="${s.y + 4}" text-anchor="${right ? "start" : "end"}">${s.key}</text>
        <text class="n" x="${s.x + (right ? 20 : -20)}" y="${s.y + 17}" text-anchor="${right ? "start" : "end"}">${String(n).padStart(2, "0")} ✦</text>
      </g>`;
    }).join("");
    svg.innerHTML = dust + lines + stars;
    $$(".sky-star", svg).forEach(g => {
      const go = () => showStar(g.dataset.star, true);
      g.addEventListener("click", go);
      g.addEventListener("keydown", e => e.key === "Enter" && go());
    });
  }
  function showStar(key, scroll) {
    activeStar = key;
    $$(".sky-star").forEach(g => g.classList.toggle("on", g.dataset.star === key));
    const card = $("#skyCard"), list = family(key);
    card.hidden = false;
    card.innerHTML = `<h3>${key}</h3><p class="eyebrow">${t("skyCount")(list.length)}</p>
      <div class="sky__row">${list.map(p => `<button data-open="${p.handle}"><img src="${img(p.images[0], 300)}" alt="${name(p)}" loading="lazy"><span>${sub(p) || name(p)}<br>${eur(p.price)}</span></button>`).join("")}</div>`;
    if (hasGsap) gsap.fromTo(card, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: "expo.out" });
    if (scroll) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------- shop ---------- */
  const FILTERS = [
    ["all", "chipAll", () => true], ["avail", "chipAvail", p => p.available], ["ooak", "chipOoak", p => p.ooak],
    ["linen", "chipLinen", p => p.collections.includes("linen")], ["knit", "chipKnit", p => p.collections.includes("knitwear")],
    ["acc", "chipAcc", p => p.collections.includes("accessories")],
  ];
  let filter = "all";
  function renderChips() {
    $("#chips").innerHTML = FILTERS.map(([k, label]) => `<button data-filter="${k}" class="${k === filter ? "on" : ""}">${t(label)}</button>`).join("");
    $$("#chips button").forEach(b => (b.onclick = () => { filter = b.dataset.filter; renderChips(); applyFilter(true); }));
  }
  function renderGrid() {
    const list = [...P].sort((a, b) => b.available - a.available);
    $("#grid").innerHTML = list.map(p => `
      <div class="card ${p.available ? "" : "sold"}" data-handle="${p.handle}">
        <div class="card__media"><button class="card__img" data-open="${p.handle}" aria-label="${name(p)}">
          ${p.ooak ? `<span class="card__badge card__badge--ooak">1/1</span>` : !p.available ? `<span class="card__badge">${t("soldOut")}</span>` : ""}
          <img loading="lazy" src="${img(p.images[0], 600)}" alt="${name(p)}">
          ${p.images[1] ? `<img loading="lazy" src="${img(p.images[1], 600)}" alt="">` : ""}
        </button>
        ${p.available ? `<button class="card__add" data-add="${p.handle}" aria-label="${t("add")}">+</button>` : ""}</div>
        <div class="card__meta"><div><p class="card__title">${name(p)}</p><p class="card__sub">${sub(p)}</p></div><span class="card__price">${eur(p.price)}</span></div>
      </div>`).join("");
    applyFilter(false);
  }
  function applyFilter(animate) {
    const fn = FILTERS.find(f => f[0] === filter)[2];
    const shown = $$(".card").filter(c => { const ok = fn(byHandle[c.dataset.handle]); c.classList.toggle("hide", !ok); return ok; });
    if (animate && hasGsap) gsap.fromTo(shown, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .04, ease: "expo.out" });
    if (hasGsap) ScrollTrigger.refresh();
  }

  /* ---------- product sheet ---------- */
  const sheet = $("#sheet"), bagEl = $("#bag");
  const lock = () => document.body.classList.toggle("locked", sheet.classList.contains("open") || bagEl.classList.contains("open"));
  // Gallery loads in layers: the grid's 600px image (already cached) or a 48px blur shows at once,
  // the srcset image fades in over it. Pressing a card starts the download before the click lands.
  const GALLERY_WIDTHS = [600, 900, 1200], GALLERY_SIZES = "(min-width: 820px) 480px, 86vw";
  const warmed = new Set();
  function warm(handle) {
    if (warmed.has(handle)) return; warmed.add(handle);
    byHandle[handle].images.forEach((u, i) => {
      const im = new Image();
      if (i < 2) { im.sizes = GALLERY_SIZES; im.srcset = GALLERY_WIDTHS.map(w => `${img(u, w)} ${w}w`).join(", "); }
      else im.src = img(u, 48);
    });
  }
  addEventListener("pointerdown", e => { const o = e.target.closest("[data-open]"); if (o) warm(o.dataset.open); }, { passive: true });
  addEventListener("pointerover", e => { const o = e.target.closest("[data-open]"); if (o && e.pointerType === "mouse") warm(o.dataset.open); }, { passive: true });

  function openProduct(handle) {
    const p = byHandle[handle], L = p[lang];
    const facts = L.body.filter(l => l.length < 46), paras = L.body.filter(l => l.length >= 46);
    const inBag = bag.includes(handle);
    $("#sheetBody").innerHTML = `
      <div class="pgallery" id="pgallery">${p.images.map((u, i) => `
        <div class="pimg ${i ? "" : "sharp"}" style="--lq:url('${i ? img(u, 48) : img(u, 600)}')">
          <img src="${img(u, 900)}" srcset="${GALLERY_WIDTHS.map(w => `${img(u, w)} ${w}w`).join(", ")}" sizes="${GALLERY_SIZES}"
            alt="${name(p)} ${i + 1}" decoding="async" ${i > 1 ? 'loading="lazy"' : 'fetchpriority="high"'} onload="this.classList.add('in')">
        </div>`).join("")}</div>
      <div class="pdots">${p.images.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div>
      <div class="pinfo">
        <h2>${name(p)}</h2>
        <div class="pinfo__row"><span class="pinfo__sub">${sub(p)}</span><span class="pinfo__price">${eur(p.price)}</span></div>
        ${p.ooak ? `<p class="pinfo__flag">✦ ${t("ooakLine")}</p>` : !p.available ? `<p class="pinfo__flag">☾ ${t("soldOutLine")}</p>` : ""}
        <div class="pinfo__facts">${facts.map(f => `<span>${f}</span>`).join("")}</div>
        <div class="pinfo__body">${paras.map(x => `<p>${x}</p>`).join("")}</div>
      </div>
      <div class="pbuy">${p.available
        ? `<button class="btn btn--ink btn--full" data-add="${p.handle}" ${inBag ? "disabled" : ""}>${inBag ? t("added") : `${t("add")} · ${eur(p.price)}`}</button>`
        : `<button class="btn btn--pink btn--full" data-notify>${t("notify")}</button>`}</div>`;
    const g = $("#pgallery"), dots = $$(".pdots i");
    g.addEventListener("scroll", () => { const i = Math.round(g.scrollLeft / g.firstElementChild.offsetWidth); dots.forEach((d, j) => d.classList.toggle("on", i === j)); }, { passive: true });
    sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false"); $(".sheet__panel").scrollTop = 0; lock();
  }
  const close = el => { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); lock(); };

  /* ---------- bag ---------- */
  function renderBag() {
    $("#bagCount").textContent = bag.length;
    const items = bag.map(h => byHandle[h]), total = items.reduce((s, p) => s + p.price, 0);
    const left = Math.max(0, FREE_SHIPPING_FROM - total);
    $("#bagShip").innerHTML = `${left ? t("shipLeft")(left) : t("shipDone")}<div class="bag__bar"><i style="width:${Math.min(100, total / FREE_SHIPPING_FROM * 100)}%"></i></div>`;
    $("#bagItems").innerHTML = items.length ? items.map(p => `
      <div class="bitem"><img src="${img(p.images[0], 200)}" alt=""><div><h4>${name(p)}</h4><button data-remove="${p.handle}">${t("remove")}</button></div><b>${eur(p.price)}</b></div>`).join("")
      : `<p class="bag__empty">${t("bagEmpty")}</p>`;
    $("#bagTotal").textContent = eur(total);
    const co = $("#checkout");
    co.href = items.length ? `${SHOP}/cart/${items.map(p => `${p.variant}:1`).join(",")}` : "#";
    co.toggleAttribute("disabled", !items.length);
  }
  function addToBag(handle, from) {
    if (!bag.includes(handle)) bag.push(handle);
    store.set("bag", bag); renderBag();
    const btn = $("#bagBtn"); btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
    toast(`${name(byHandle[handle])} — ${t("added")}`);
    if (from) {
      const r = from.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 12);
      if (from.closest(".pbuy")) { from.textContent = t("added"); from.disabled = true; }
    }
  }
  const openBag = () => { renderBag(); bagEl.classList.add("open"); bagEl.setAttribute("aria-hidden", "false"); lock(); };
  $("#bagBtn").onclick = openBag;

  /* ---------- delegated clicks ---------- */
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"), a = e.target.closest("[data-add]"), r = e.target.closest("[data-remove]");
    if (a) { e.stopPropagation(); addToBag(a.dataset.add, a); return; }
    if (o) { openProduct(o.dataset.open); return; }
    if (r) { bag = bag.filter(h => h !== r.dataset.remove); store.set("bag", bag); renderBag(); return; }
    if (e.target.closest("[data-notify]")) { const b = e.target.closest("[data-notify]"); b.textContent = t("notified"); b.disabled = true; return; }
    if (e.target.closest("[data-close]")) close(e.target.closest(".sheet, .bag"));
  });
  addEventListener("keydown", e => { if (e.key === "Escape") { close(sheet); close(bagEl); toggleMenu(false); } });

  /* ---------- newsletter ---------- */
  $("#lettersForm").onsubmit = e => {
    e.preventDefault();
    const sec = $("#letters"), r = $("#lettersForm button").getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 18);
    sec.classList.add("done"); $(".letters__small").textContent = t("lettersDone");
  };

  /* ---------- scroll choreography ---------- */
  function choreography() {
    if (!hasGsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(".hero__photo", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__mark", { yPercent: -30, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    const board = { trigger: ".poster__board", start: "top bottom", end: "bottom top", scrub: true };
    gsap.fromTo(".cut--a", { yPercent: 18 }, { yPercent: -14, ease: "none", scrollTrigger: board });
    gsap.fromTo(".cut--b", { yPercent: 30 }, { yPercent: -24, ease: "none", scrollTrigger: board });
    gsap.fromTo(".poster__spark1, .poster__spark2", { rotate: -30 }, { rotate: 40, ease: "none", scrollTrigger: board });
    gsap.from(".poster__title", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".poster", start: "top 75%" } });
    gsap.from(".poster__note", { scale: .4, rotate: -20, opacity: 0, duration: .9, ease: "back.out(2)", scrollTrigger: { trigger: ".poster__note", start: "top 92%" } });
    $$(".display, .lede, .eva__big, .eva__sign").forEach(el =>
      gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
    gsap.from(".ooak-card", { x: 120, opacity: 0, duration: 1.2, stagger: .08, ease: "expo.out", scrollTrigger: { trigger: "#ooakRail", start: "top 85%" } });
    gsap.from(".sky-star", { scale: 0, opacity: 0, transformOrigin: "center", duration: 1, stagger: .09, ease: "back.out(2)", scrollTrigger: { trigger: "#skyMap", start: "top 80%" } });
    gsap.from(".sky-line", { opacity: 0, duration: 1.4, stagger: .06, delay: .4, scrollTrigger: { trigger: "#skyMap", start: "top 80%" } });
    gsap.from(".fibre", { y: 60, rotate: i => [-3, 2, -2][i], opacity: 0, duration: 1, stagger: .12, ease: "expo.out", scrollTrigger: { trigger: ".fibres__list", start: "top 85%" } });
    gsap.from(".eva__photo", { y: 80, rotate: 6, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".eva", start: "top 75%" } });
    gsap.from(".eva__star, .eva__star2", { scale: 0, rotate: -60, duration: 1, stagger: .15, ease: "back.out(2)", scrollTrigger: { trigger: ".eva", start: "top 70%" } });
    gsap.from(".letters__moon", { rotate: 60, scale: 1.8, opacity: 0, duration: 1, ease: "back.out(2)", scrollTrigger: { trigger: ".letters", start: "top 75%" } });
    gsap.from(".foot__word", { yPercent: 60, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".foot", start: "top 90%" } });
    ScrollTrigger.batch(".card", { start: "top 92%", once: true, onEnter: els => gsap.from(els, { y: 50, opacity: 0, duration: .9, stagger: .07, ease: "expo.out" }) });
  }

  renderSky();
  applyCopy();
  choreography();
})();
