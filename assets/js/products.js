/* ============================================================================
   products.js — Render product cards, category filtering, and the detail modal
   ----------------------------------------------------------------------------
   Reads from window.PRODUCTS (assets/data/products.js). Later, swap the data
   source for a Firestore read of published products — the render code stays.

   Mounts into:
     .filter-bar      -> category pills (built from the data)
     .product-grid    -> cards
     .modal           -> detail view (created on demand)
   Each inquiry button is wired through window.CTA so links come from config.js.
   ========================================================================== */

window.initProducts = function initProducts() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  // Read the live catalogue from the Store (localStorage, managed by admin),
  // falling back to the seed data if the Store isn't present on this page.
  const source = window.Store ? window.Store.getProducts() : (window.PRODUCTS || []);
  const products = source.filter((p) => p.status !== "draft");
  if (!products.length && !source.length) return;
  const catNames = (window.Store && window.Store.getCategoryNames && window.Store.getCategoryNames().length)
    ? window.Store.getCategoryNames()
    : ["Rice", "Shrimp", "Fish & Seafood", "Fresh Vegetables",
       "Fresh Fruits", "Spices", "Potato", "Dry & Agro Foods"];
  const CATS = ["All", ...catNames];

  // Resolve Google-Drive share links (and bare ids) to embeddable image URLs.
  const resolveImg = (u) => (window.MEDIA ? window.MEDIA.resolveImg(u) : (u || ""));

  /* ---- Build filter as CIRCLED GOLD LINE-ART ICONS -------------------
     Not a row of pills — a row of thin-gold roundels, each holding a Bengali
     line-art glyph for its category (shapla, paddy, shrimp, fish, gourd, chilli,
     potato, jute sack), with the name beneath. The reference's signature move. */
  // Clear, iconic Bengali food glyphs — matched to the reference mockup's row:
  // alpona rosette, paddy, shrimp, fish, cut gourd, mango pair, potatoes, jar.
  const ICONS = {
    "All":             `<g stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.7"/><g><path d="M12 9.9C10.9 8.2 10.9 5.9 12 4.2 13.1 5.9 13.1 8.2 12 9.9Z"/><path d="M12 14.1C13.1 15.8 13.1 18.1 12 19.8 10.9 18.1 10.9 15.8 12 14.1Z"/></g><g transform="rotate(45 12 12)"><path d="M12 9.9C10.9 8.2 10.9 5.9 12 4.2 13.1 5.9 13.1 8.2 12 9.9Z"/><path d="M12 14.1C13.1 15.8 13.1 18.1 12 19.8 10.9 18.1 10.9 15.8 12 14.1Z"/></g><g transform="rotate(90 12 12)"><path d="M12 9.9C10.9 8.2 10.9 5.9 12 4.2 13.1 5.9 13.1 8.2 12 9.9Z"/><path d="M12 14.1C13.1 15.8 13.1 18.1 12 19.8 10.9 18.1 10.9 15.8 12 14.1Z"/></g><g transform="rotate(135 12 12)"><path d="M12 9.9C10.9 8.2 10.9 5.9 12 4.2 13.1 5.9 13.1 8.2 12 9.9Z"/><path d="M12 14.1C13.1 15.8 13.1 18.1 12 19.8 10.9 18.1 10.9 15.8 12 14.1Z"/></g></g>`,
    "Rice":            `<g stroke-linecap="round" stroke-linejoin="round"><path d="M11 21c.5-4.5.6-9 .4-13.5"/><path d="M11.4 8.5C9.4 8.2 8 6.6 7.8 4.6 9.9 4.9 11.3 6.5 11.4 8.5Z"/><path d="M11.4 8.5C13.4 8.2 14.8 6.6 15 4.6 12.9 4.9 11.5 6.5 11.4 8.5Z"/><path d="M11.2 12.4C9.4 12.2 8.1 10.9 7.9 9.1 9.8 9.3 11 10.6 11.2 12.4Z"/><path d="M11.2 12.4C13 12.2 14.3 10.9 14.5 9.1 12.6 9.3 11.4 10.6 11.2 12.4Z"/><path d="M11 16C9.4 15.8 8.2 14.6 8 13 9.7 13.2 10.8 14.4 11 16Z"/><path d="M11 16C12.6 15.8 13.8 14.6 14 13 12.3 13.2 11.2 14.4 11 16Z"/><path d="M14.5 21c1.8-2.5 2.9-5.4 3.2-8.5" stroke-opacity=".8"/></g>`,
    "Shrimp":          `<g stroke-linecap="round" stroke-linejoin="round"><path d="M18 9c-4-1.4-9 .4-10.4 4.6-1 3 .8 6 3.9 6.6 2 .4 3.9-.3 5.1-1.7"/><path d="M18 9c1.5.3 2.4 1.4 2.4 2.8"/><path d="M9.9 10.5c1 1.4 1.2 4.3.3 6.3M13.2 9.6c.9 1.8 1 4.9 0 7.6M16.2 9.4c.8 1.9.8 4.4-.2 6.4" stroke-opacity=".8"/><path d="M7.6 13.6C6 12.8 4.4 12.9 3.2 13.9"/><path d="M8.4 11.2C7 10.2 5.4 10 4 10.6"/><path d="M11.5 19.2c.6 1 1.7 1.6 2.9 1.4"/><circle cx="16.3" cy="11.4" r=".6" fill="currentColor" stroke="none"/></g>`,
    "Fish & Seafood":  `<g stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.6c2.6-4 8.4-4 11 0-2.6 4-8.4 4-11 0Z"/><path d="M15 12.6c1.5-1.7 3.2-2.3 4.4-2.3-.5 1.5-.5 3.1 0 4.6-1.2 0-2.9-.6-4.4-2.3Z"/><path d="M9 9.9C9.8 9 10.6 8.3 11.7 7.8c.2 1 .1 1.9-.2 2.8" stroke-opacity=".8"/><path d="M8.8 13.5c.4 1 .5 1.9.3 2.9" stroke-opacity=".8"/><circle cx="7.4" cy="11.9" r=".7" fill="currentColor" stroke="none"/></g>`,
    "Fresh Vegetables":`<g stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.4" r="6.4"/><path d="M12 7v12.8M7.2 9.2c3 2.8 6.6 2.8 9.6 0M7.2 17.6c3-2.8 6.6-2.8 9.6 0" stroke-opacity=".75"/><circle cx="12" cy="13.4" r="2.6" stroke-opacity=".9"/><path d="M12 6.8c-.5-1.2 0-2.4 1.2-3"/></g>`,
    "Fresh Fruits":    `<g stroke-linecap="round" stroke-linejoin="round"><path d="M10.2 6.2C7.5 7.4 6 10 6.3 13c.3 3.4 2.8 6 5.7 6 .9 0 1.7-.3 2.4-.8"/><path d="M10.2 6.2c2.6-.9 5.4 0 6.9 2.3 1.7 2.6 1.2 6.2-1 8.4-.9.9-2 1.3-3.1 1.3"/><path d="M10.2 6.2C9.8 4.9 9 4.1 7.8 3.8"/><path d="M11.4 4.9c.9-.3 1.8-.2 2.6.2" stroke-opacity=".8"/></g>`,
    "Spices":          `<g stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 8.5C10 11.5 9.6 16 6.6 19.2c-1 1-2.4 1.5-3.8 1.3"/><path d="M8.5 8.5c1.5.4 2.4 1.8 2.1 3.5"/><path d="M8.5 8.5 10 6.5c.5-.7 1.4-.9 2.2-.5"/><path d="M15.5 9.5c1.2 2.6.8 6.2-1.6 8.9" stroke-opacity=".85"/><path d="M15.5 9.5c1.3.3 2.1 1.5 1.9 3" stroke-opacity=".85"/><circle cx="18.6" cy="16.6" r=".55" fill="currentColor" stroke="none"/><circle cx="17" cy="19" r=".55" fill="currentColor" stroke="none"/><circle cx="19.6" cy="19.4" r=".55" fill="currentColor" stroke="none"/></g>`,
    "Potato":          `<g stroke-linecap="round" stroke-linejoin="round"><path d="M7.4 6.8C9.3 5.6 12 6 13.4 7.9c1.4 1.9 1.1 4.6-.7 6.1-1.8 1.5-4.6 1.3-6.2-.4-1.4-1.6-1.5-3.8 0-5.4l.9-1.4Z"/><path d="M13.9 11.2c2-.6 4.2.1 5.3 1.9 1.2 1.9.7 4.4-1 5.8-1.8 1.4-4.4 1.2-5.9-.5-1-1.1-1.3-2.6-.9-4" /><circle cx="9.6" cy="9.6" r=".5" fill="currentColor" stroke="none"/><circle cx="11.4" cy="12" r=".5" fill="currentColor" stroke="none"/><circle cx="16.4" cy="14.4" r=".5" fill="currentColor" stroke="none"/><circle cx="17.6" cy="16.6" r=".5" fill="currentColor" stroke="none"/></g>`,
    "Dry & Agro Foods":`<g stroke-linecap="round" stroke-linejoin="round"><path d="M9.2 6.8h5.2M9.8 6.8V5.4c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9v1.4"/><path d="M9.2 6.8C8 8 7.4 9.6 7.4 11.4v5.2c0 1.6 1.3 2.9 2.9 2.9h3c1.6 0 2.9-1.3 2.9-2.9v-5.2c0-1.8-.6-3.4-1.8-4.6"/><path d="M7.4 12.6h8.8" stroke-opacity=".8"/><circle cx="4.6" cy="18.4" r=".6" fill="currentColor" stroke="none"/><circle cx="6" cy="20" r=".6" fill="currentColor" stroke="none"/><circle cx="4" cy="20.6" r=".6" fill="currentColor" stroke="none"/><circle cx="19.6" cy="19.6" r=".6" fill="currentColor" stroke="none"/><circle cx="21" cy="18.2" r=".6" fill="currentColor" stroke="none"/></g>`,
  };
  const iconFor = (c) => `<svg class="cat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.15" aria-hidden="true">${ICONS[c] || ICONS["All"]}</svg>`;

  const bar = document.querySelector(".filter-bar");
  if (bar) {
    bar.innerHTML = CATS.map((c, i) =>
      `<button class="cat-filter${i === 0 ? " is-active" : ""}" data-filter="${c}" aria-pressed="${i === 0}">
         <span class="cat-round">${iconFor(c)}</span>
         <span class="cat-label">${c}</span>
       </button>`
    ).join("");
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-filter");
      if (!btn) return;
      bar.querySelectorAll(".cat-filter").forEach((p) => {
        const active = p === btn;
        p.classList.toggle("is-active", active);
        p.setAttribute("aria-pressed", String(active));
      });
      applyFilter(btn.dataset.filter);
    });
  }

  /* ---- Render cards --------------------------------------------------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Every niche must be filled: if a product has no photo yet, drop in the
  // branded Shapla placeholder DIRECTLY (an empty <img src> never fires the
  // load-error fallback, which is why some arches were rendering blank).
  const nicheSrc = (img, p) => {
    const url = resolveImg(img.url);
    if (url) return url;
    return window.ImgFallback ? window.ImgFallback.makePlaceholder(img.alt || p.name) : "";
  };

  // The panel's line ornaments, matched to the reference: a tasselled kite
  // hanging from the top border beside the seam, the lota-pata vine at the
  // panel's top-right, and a paddy stalk rising through the bottom-right.
  const tassel =
    `<svg class="pc-tassel" viewBox="0 0 22 64" fill="none" stroke="currentColor" stroke-width="1"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 0v20"/>
        <path d="M11 20l6.5 9L11 38l-6.5-9Z"/>
        <path d="M11 29h.01" stroke-width="1.6"/>
        <path d="M11 38v7"/>
        <path d="M11 45l-4 8M11 45l4 8M11 45v10"/>
        <circle cx="7" cy="55" r=".8"/><circle cx="15" cy="55" r=".8"/><circle cx="11" cy="57.5" r=".8"/>
     </svg>`;
  const vine =
    `<svg class="pc-vine" viewBox="0 0 55 55" fill="none" stroke="currentColor" stroke-width="0.7"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <use href="#sgv-lota-corner"></use>
     </svg>`;
  const paddySprig =
    `<svg class="pc-paddy" viewBox="0 0 58 110" fill="none" stroke="currentColor" stroke-width="1"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M30 110C32 82 33 54 31 26"/>
        <path d="M31 30C25.5 29 22 25 21.5 19.5 27 20.5 30.5 24.5 31 30Z"/>
        <path d="M31 30C36.5 29 40 25 40.5 19.5 35 20.5 31.5 24.5 31 30Z"/>
        <path d="M31.5 42C26.5 41 23.5 37.5 23 33 28 34 31 37.5 31.5 42Z"/>
        <path d="M31.5 42C36.5 41 39.5 37.5 40 33 35 34 32 37.5 31.5 42Z"/>
        <path d="M31.5 53C27 52.2 24.2 49 23.8 45 28.2 45.8 31 49 31.5 53Z"/>
        <path d="M31.5 53C36 52.2 38.8 49 39.2 45 34.8 45.8 32 49 31.5 53Z"/>
        <path d="M12 110C18 92 24 80 30 72" stroke-opacity=".7"/>
        <path d="M48 110C43 96 39 87 33 80" stroke-opacity=".7"/>
     </svg>`;
  const pin =
    `<svg class="pc-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/>
     </svg>`;
  const arrow =
    `<svg width="30" height="10" viewBox="0 0 30 10" fill="none" stroke="currentColor" stroke-width="1.2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M0 5h27M21 1l6 4-6 4"/>
     </svg>`;
  // The gilt frame: four scooped "ticket" corners + hairline edges. The same
  // scoops are carved out of the card beneath by the .pc-frame CSS mask.
  const cornerPath = "M40 1H31A5 5 0 0 1 21 1H10A9 9 0 0 0 1 10V21A5 5 0 0 1 1 31V40";
  const gild =
    `<span class="pc-gild" aria-hidden="true">
        ${["tl", "tr", "bl", "br"].map((c) =>
          `<svg class="pc-corner pc-corner--${c}" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3"><path d="${cornerPath}"/></svg>`
        ).join("")}
        <i class="pc-edge pc-edge--t"></i><i class="pc-edge pc-edge--b"></i>
        <i class="pc-edge pc-edge--l"></i><i class="pc-edge pc-edge--r"></i>
     </span>`;

  const cardHTML = (p, i) => {
    const img = (p.images && p.images[0]) || { url: "", alt: p.name };
    const origin = (p.origins || [])[0] || "Bangladesh";

    // The reference card: photo LEFT, Midnight-Navy panel RIGHT (category eyebrow
    // with a dash + ✦, serif name, a line of copy, origin with a pin, and
    // "Explore Product ⟶" pinned to the panel foot over a long gold underline).
    return `
    <article class="product-card" data-cat="${esc(p.category)}" data-slug="${esc(p.slug)}" data-reveal
             tabindex="0" role="button" aria-label="${esc(p.name)} — view details">
      <div class="pc-frame">
        <div class="pc-photo">
          <img src="${esc(nicheSrc(img, p))}" alt="${esc(img.alt || p.name)}" loading="lazy" decoding="async">
        </div>
        <div class="pc-body">
          ${tassel}
          ${vine}
          ${paddySprig}
          <p class="pc-cat"><span class="pc-dash"></span>${esc(p.category)} <span class="pc-star">&#10022;</span></p>
          <h3 class="pc-name">${esc(p.name)}</h3>
          <p class="pc-desc">${esc(p.shortDesc)}</p>
          <p class="pc-loc">${pin}${esc(origin)}</p>
          ${p.moq ? `<p class="pc-moq">MOQ&ensp;&middot;&ensp;${esc(p.moq)}</p>` : ""}
          <a class="pc-explore" data-explore>Explore Product <span class="pc-arrow" aria-hidden="true">${arrow}</span></a>
        </div>
      </div>
      ${gild}
    </article>`;
  };

  grid.innerHTML = products.length
    ? products.map(cardHTML).join("")
    : `<p class="products-empty">No products yet — add your first to bring the showcase to life.</p>`;

  // Open modal on card body click (but not on the inquiry buttons), and on
  // Enter/Space for keyboard buyers — every card is a real button.
  grid.addEventListener("click", (e) => {
    if (e.target.closest("[data-cta]")) return;
    const card = e.target.closest(".product-card");
    if (card) openModal(card.dataset.slug);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".product-card");
    if (!card) return;
    e.preventDefault();
    openModal(card.dataset.slug);
  });

  // Wire the freshly-rendered inquiry buttons.
  window.CTA && window.CTA.wireDataAttrs(grid);

  /* ---- Filtering + search + mobile batching ---------------------------
     One `refresh()` owns visibility: active category ∩ search term, and on
     phones the list reveals in batches of 8 (a 20-card single column is a
     scroll marathon, not a catalogue). */
  const searchInput = document.querySelector("[data-product-search]");
  const moreBtn = document.querySelector("[data-show-more]");
  const BATCH = 8;
  let activeCat = "All";
  let term = "";
  let mobileCap = BATCH;

  const matchesTerm = (card, t) =>
    !t || card.textContent.toLowerCase().includes(t);

  function refresh() {
    const phone = window.matchMedia("(max-width: 640px)").matches;
    let shown = 0, hiddenByCap = 0;
    grid.querySelectorAll(".product-card").forEach((card) => {
      const match = (activeCat === "All" || card.dataset.cat === activeCat) &&
                    matchesTerm(card, term);
      let show = match;
      if (match && phone && shown >= mobileCap) { show = false; hiddenByCap++; }
      if (show) shown++;
      card.classList.toggle("is-hidden", !show);
    });
    if (moreBtn) {
      moreBtn.hidden = !(phone && hiddenByCap > 0);
      if (!moreBtn.hidden) moreBtn.textContent = `Show ${Math.min(BATCH, hiddenByCap)} more of ${hiddenByCap}`;
    }
  }

  function applyFilter(cat) {
    activeCat = cat;
    mobileCap = BATCH;          // a new category starts its own tasting
    refresh();
  }

  searchInput?.addEventListener("input", () => {
    term = searchInput.value.trim().toLowerCase();
    mobileCap = BATCH;
    refresh();
  });
  moreBtn?.addEventListener("click", () => { mobileCap += BATCH; refresh(); });
  let rsz;
  window.addEventListener("resize", () => { clearTimeout(rsz); rsz = setTimeout(refresh, 200); });
  refresh();

  /* ---- Detail modal --------------------------------------------------- */
  let lastFocus = null;
  function openModal(slug) {
    const p = products.find((x) => x.slug === slug);
    if (!p) return;
    lastFocus = document.activeElement;
    // A shareable address for THIS product — buyers forward SKUs to colleagues.
    try { history.replaceState(null, "", `#product=${encodeURIComponent(slug)}`); } catch (_) {}
    let modal = document.querySelector(".modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      document.body.appendChild(modal);
    }
    const imgs = (p.images && p.images.length ? p.images : [{ url: "", alt: p.name }])
      .map((im) => ({ url: resolveImg(im.url) || (window.ImgFallback ? window.ImgFallback.makePlaceholder(im.alt || p.name) : ""), alt: im.alt || p.name }));
    const img = imgs[0];
    const specRows = Object.entries(p.specs || {})
      .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    const list = (arr) => (arr || []).map((x) => `<span class="chip">${esc(x)}</span>`).join("");
    const thumbs = imgs.length > 1
      ? `<div class="modal-thumbs">${imgs.map((im, i) =>
          `<button class="modal-thumb${i === 0 ? " is-active" : ""}" data-thumb="${i}" aria-label="Photo ${i + 1}">
             <img src="${esc(im.url)}" alt="">
           </button>`).join("")}</div>`
      : "";

    modal.innerHTML = `
      <div class="modal-panel" role="document">
        <button class="modal-close" aria-label="Close">&times;</button>
        <div class="modal-grid">
          <div class="modal-gallery">
            <img src="${esc(img.url)}" alt="${esc(img.alt)}" data-gallery-main title="Click to zoom">
            ${thumbs}
          </div>
          <div class="modal-body">
            <span class="eyebrow">${esc(p.category)}</span>
            <h3>${esc(p.name)}</h3>
            <p class="lead" style="font-size:1.05rem">${esc(p.longDesc || p.shortDesc)}</p>
            ${p.grades?.length ? `<div><strong>Varieties / Grades</strong><div class="meta" style="margin-top:.4rem">${list(p.grades)}</div></div>` : ""}
            ${p.origins?.length ? `<div><strong>Origins</strong><div class="meta" style="margin-top:.4rem">${list(p.origins)}</div></div>` : ""}
            ${p.packaging?.length ? `<div><strong>Packaging</strong><div class="meta" style="margin-top:.4rem">${list(p.packaging)}</div></div>` : ""}
            ${p.moq ? `<p><strong>MOQ:</strong> ${esc(p.moq)}</p>` : ""}
            ${p.hsCode ? `<p><strong>HS Code:</strong> ${esc(p.hsCode)}</p>` : ""}
            ${specRows ? `<dl class="spec-list">${specRows}</dl>` : ""}
            <div class="modal-actions">
              <a class="btn btn--whatsapp" data-cta="whatsapp" data-product="${esc(p.name)}"
                 data-packaging="${esc((p.packaging || [])[0] || "bulk")}">Inquire on WhatsApp</a>
              <a class="btn btn--ghost" data-cta="gmail" data-product="${esc(p.name)}">Email Trade Desk</a>
              <button class="btn btn--ghost" data-share aria-label="Copy a link to this product">Copy Link</button>
            </div>
          </div>
        </div>
      </div>`;

    window.CTA && window.CTA.wireDataAttrs(modal);
    // The modal is built on demand — the Arabic edition translates its chrome
    // (buttons, labels) here; product data itself stays English by design.
    if (window.I18N && window.I18N.active) window.I18N.apply(modal);
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    // Gallery: thumbnails swap the main image; the main image click-zooms.
    const main = modal.querySelector("[data-gallery-main]");
    modal.querySelectorAll("[data-thumb]").forEach((b) => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const im = imgs[+b.dataset.thumb];
        if (!im) return;
        main.src = im.url; main.alt = im.alt;
        modal.querySelectorAll(".modal-thumb").forEach((x) => x.classList.toggle("is-active", x === b));
        main.classList.remove("is-zoomed");
      });
    });
    main?.addEventListener("click", () => main.classList.toggle("is-zoomed"));

    // Share: copy the product's deep link.
    modal.querySelector("[data-share]")?.addEventListener("click", async () => {
      const url = `${location.origin}${location.pathname}#product=${encodeURIComponent(slug)}`;
      try {
        await navigator.clipboard.writeText(url);
        window.toast && window.toast("Product link copied — paste it anywhere.", "ok");
      } catch (_) {
        prompt("Copy this product link:", url);
      }
    });

    const close = () => {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      try { history.replaceState(null, "", location.pathname + "#products"); } catch (_) {}
      lastFocus && lastFocus.focus && lastFocus.focus();
    };
    modal.querySelector(".modal-close").addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", function escClose(ev) {
      if (ev.key === "Escape") { close(); document.removeEventListener("keydown", escClose); }
    });

    // Keep keyboard focus inside the dialog while it is open.
    const panel = modal.querySelector(".modal-panel");
    modal.querySelector(".modal-close").focus();
    modal.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = panel.querySelectorAll("button, a[href], input, [tabindex]:not([tabindex='-1'])");
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
  }

  /* ---- Category deep-link ---------------------------------------------
     Any in-page link like <a href="#products" data-cat="Rice"> (footer,
     featured deck) scrolls to the catalogue (main.js) then pre-selects that
     category filter here. */
  const selectCat = (cat) => {
    if (!cat) return;
    const btn = bar?.querySelector(`[data-filter="${CSS.escape(cat)}"]`);
    btn && btn.click();
  };
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[data-cat][href="#products"], .featured-card[data-cat]');
    if (!link) return;
    const cat = link.getAttribute("data-cat");
    setTimeout(() => selectCat(cat), 650);   // wait for the smooth scroll
  });

  // Legacy ?category=Rice query param (from old bookmarks) still works.
  const params = new URLSearchParams(location.search);
  const qCat = params.get("category");
  if (qCat && CATS.includes(qCat)) selectCat(qCat);

  // Honour a shared product deep link (#product=slug): open that product's
  // detail once the catalogue is on screen.
  const pm = location.hash.match(/^#product=([\w-]+)/);
  if (pm) {
    const slug = decodeURIComponent(pm[1]);
    if (products.some((p) => p.slug === slug)) {
      document.getElementById("products")?.scrollIntoView();
      setTimeout(() => openModal(slug), 400);
    }
  }
};
