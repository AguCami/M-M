/* Inversiones Generales M&M — interacciones del sitio */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const props = window.MM_PROPS || [];
  let io = null; // IntersectionObserver for reveal-on-scroll (declared early: catalog init calls observe())

  const WHATSAPP = "5490000000000"; // TODO: reemplazar por el número real de M&M

  /* ---------- helpers ---------- */
  const money = (p) =>
    p.moneda === "USD"
      ? "US$ " + p.precio.toLocaleString("es-AR")
      : "$ " + p.precio.toLocaleString("es-AR");
  const opLabel = { venta: "Venta", alquiler: "Alquiler" };
  const tipoLabel = { casa: "Casa", departamento: "Departamento", lote: "Lote", campo: "Casa quinta / Campo" };

  const icon = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 14h18M3 18v2M21 18v2M7 10V7a1 1 0 0 1 1-1h3v4"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V6a2 2 0 0 1 2-2c1 0 1.5.5 2 1"/><path d="M9 5.5 11 7"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 16v2M19 16v2M3 13l2-5a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 8l2 5v3H3v-3Z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  function cardHTML(p) {
    const tags = [`<span class="tag ${p.operacion}">${opLabel[p.operacion]}</span>`];
    if (p.oportunidad) tags.push('<span class="tag oportunidad">Oportunidad</span>');
    const specs =
      p.tipo === "lote"
        ? `<span>${icon.area} ${p.m2} m²</span>`
        : `<span>${icon.bed} ${p.dorm} dorm</span><span>${icon.bath} ${p.banos} baños</span><span>${icon.area} ${p.m2} m²</span>`;
    const priceSmall = p.operacion === "alquiler" ? " <small>/ mes</small>" : "";
    return `<article class="card reveal">
      <a class="card-media" href="propiedad.html?id=${p.id}" aria-label="${p.titulo}">
        <img src="${p.img}" alt="${tipoLabel[p.tipo]} en ${p.zona} — imagen de demostración" loading="lazy" width="800" height="600"/>
        <div class="card-tags">${tags.join("")}</div>
      </a>
      <button class="card-fav" type="button" aria-label="Guardar propiedad" title="Guardar">
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 6c-2.3 4.5-9.3 9-9.3 9Z"/></svg>
      </button>
      <div class="card-body">
        <div class="card-price">${money(p)}${priceSmall}</div>
        <a href="propiedad.html?id=${p.id}"><h3 class="card-title">${p.titulo}</h3></a>
        <div class="card-loc">${icon.pin} ${p.zona}, Córdoba</div>
        <div class="card-specs">${specs}</div>
      </div>
    </article>`;
  }

  /* ---------- home: destacados ---------- */
  const dest = $("#destacados-grid");
  if (dest) {
    dest.innerHTML = props.filter((p) => p.destacado).slice(0, 6).map(cardHTML).join("");
  }

  /* ---------- home: hero search -> catálogo ---------- */
  const heroForm = $("#hero-search");
  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = new URLSearchParams();
      $$("select, input", heroForm).forEach((el) => {
        if (el.name && el.value) q.set(el.name, el.value);
      });
      window.location.href = "propiedades.html" + (q.toString() ? "?" + q : "");
    });
  }

  /* ---------- catálogo ---------- */
  const grid = $("#catalogo-grid");
  if (grid) {
    const params = new URLSearchParams(location.search);
    const controls = {
      operacion: $("#f-operacion"),
      tipo: $("#f-tipo"),
      zona: $("#f-zona"),
      orden: $("#f-orden"),
    };
    // populate zona options
    const zonas = [...new Set(props.map((p) => p.zona))].sort();
    if (controls.zona) {
      zonas.forEach((z) => {
        const o = document.createElement("option");
        o.value = z; o.textContent = z; controls.zona.appendChild(o);
      });
    }
    // preset from query
    ["operacion", "tipo", "zona"].forEach((k) => {
      if (controls[k] && params.get(k)) controls[k].value = params.get(k);
    });

    function apply() {
      let list = props.filter((p) => {
        if (controls.operacion.value && p.operacion !== controls.operacion.value) return false;
        if (controls.tipo.value && p.tipo !== controls.tipo.value) return false;
        if (controls.zona.value && p.zona !== controls.zona.value) return false;
        return true;
      });
      const ord = controls.orden ? controls.orden.value : "";
      if (ord === "menor") list.sort((a, b) => usd(a) - usd(b));
      if (ord === "mayor") list.sort((a, b) => usd(b) - usd(a));
      grid.innerHTML = list.length
        ? list.map(cardHTML).join("")
        : "";
      const nr = $("#no-results");
      if (nr) nr.hidden = list.length > 0;
      const c = $("#result-count");
      if (c) c.innerHTML = `<b>${list.length}</b> ${list.length === 1 ? "propiedad" : "propiedades"}`;
      observe();
    }
    // approx USD for sorting (rough ARS->USD only for ordering)
    const usd = (p) => (p.moneda === "USD" ? p.precio : p.precio / 1000);
    Object.values(controls).forEach((el) => el && el.addEventListener("change", apply));
    apply();
  }

  /* ---------- detalle ---------- */
  const detail = $("#detalle");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const p = props.find((x) => x.id === id) || props[0];
    document.title = `${p.titulo} — Inversiones Generales M&M`;
    const priceSmall = p.operacion === "alquiler" ? ' <small style="font-size:1rem;color:var(--ink-faint)">/ mes</small>' : "";
    const specs =
      p.tipo === "lote"
        ? [["Superficie", p.m2 + " m²"], ["Tipo", tipoLabel[p.tipo]], ["Operación", opLabel[p.operacion]], ["Zona", p.zona]]
        : [["Dormitorios", p.dorm], ["Baños", p.banos], ["Superficie", p.m2 + " m²"], ["Cocheras", p.cochera]];
    const waText = encodeURIComponent(`Hola M&M, me interesa la propiedad "${p.titulo}" (${p.id}). ¿Podemos coordinar una visita?`);
    detail.querySelector("#d-title").textContent = p.titulo;
    detail.querySelector("#d-loc").innerHTML = icon.pin + " " + p.zona + ", Córdoba";
    detail.querySelector("#d-crumb").textContent = p.titulo;
    detail.querySelector("#d-tags").innerHTML =
      `<span class="tag ${p.operacion}">${opLabel[p.operacion]}</span>` +
      (p.oportunidad ? '<span class="tag oportunidad">Oportunidad</span>' : "");
    detail.querySelector("#d-gallery").innerHTML =
      `<div class="g-main"><img src="${p.img}" alt="${p.titulo} — imagen de demostración"></div>
       <div class="g-side"><img src="assets/img/props/figura.svg" alt="Vista — demo"><img src="${p.img}" alt="Vista — demo"></div>`;
    detail.querySelector("#d-facts").innerHTML = specs
      .map(([k, v]) => `<div class="f"><b>${v}</b><span>${k}</span></div>`)
      .join("");
    detail.querySelector("#d-desc").textContent = p.desc;
    detail.querySelector("#d-amen").innerHTML = p.amenities
      .map((a) => `<li>${icon.arrow.replace('width="16" height="16"', 'width="18" height="18"')} ${a}</li>`)
      .join("");
    detail.querySelector("#d-price").innerHTML = money(p) + priceSmall;
    detail.querySelector("#d-wa").href = `https://wa.me/${WHATSAPP}?text=${waText}`;
    detail.querySelector("#d-id").textContent = "Ref. " + p.id.toUpperCase();
  }

  /* ---------- whatsapp links (global) ---------- */
  $$("[data-wa]").forEach((a) => {
    const msg = a.getAttribute("data-wa") || "Hola M&M, quiero hacer una consulta.";
    a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  });

  /* ---------- contact form (demo) ---------- */
  const cform = $("#contact-form");
  if (cform) {
    cform.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = cform.querySelector('button[type="submit"]');
      btn.textContent = "¡Consulta enviada! (demo)";
      btn.disabled = true;
      setTimeout(() => { btn.textContent = "Enviar consulta"; btn.disabled = false; cform.reset(); }, 2600);
    });
  }

  /* ---------- header scrolled ---------- */
  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile nav ---------- */
  const toggle = $(".nav-toggle");
  const menu = $("#mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));
  }

  /* ---------- reveal on scroll ---------- */
  function observe() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }
  observe();

  /* ---------- year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
