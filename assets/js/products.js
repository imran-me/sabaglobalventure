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
  const ICONS = {
    "All":             `<circle cx="12" cy="12" r="2.4"/><g stroke-linecap="round"><path d="M12 9.6C12 6 12 4 12 4"/><path d="M12 9.6C9.4 7 8 5.6 8 5.6"/><path d="M12 9.6C14.6 7 16 5.6 16 5.6"/><path d="M12 14.4C12 18 12 20 12 20"/><path d="M12 14.4C9.4 17 8 18.4 8 18.4"/><path d="M12 14.4C14.6 17 16 18.4 16 18.4"/><path d="M9.6 12C6 12 4 12 4 12"/><path d="M14.4 12C18 12 20 12 20 12"/></g>`,
    "Rice":            `<g stroke-linecap="round"><path d="M12 21V7"/><path d="M12 8.5C10 8 8.6 6.4 8.4 4.3 10.5 4.6 11.9 6.1 12 8.2"/><path d="M12 8.5C14 8 15.4 6.4 15.6 4.3 13.5 4.6 12.1 6.1 12 8.2"/><path d="M12 12.5C10 12 8.6 10.4 8.4 8.3 10.5 8.6 11.9 10.1 12 12.2"/><path d="M12 12.5C14 12 15.4 10.4 15.6 8.3 13.5 8.6 12.1 10.1 12 12.2"/><path d="M12 16.5C10 16 8.6 14.4 8.4 12.3 10.5 12.6 11.9 14.1 12 16.2"/><path d="M12 16.5C14 16 15.4 14.4 15.6 12.3 13.5 12.6 12.1 14.1 12 16.2"/></g>`,
    "Shrimp":          `<g stroke-linecap="round" stroke-linejoin="round"><path d="M17 7C13 6.5 6.5 8 6 12.5c-.3 3 1.8 5.2 4.6 5.4 3.4.3 6-2 6.4-5.4"/><path d="M17 7c1.6.2 2.6 1.3 2.7 2.6"/><path d="M11 18c.4 1 1.4 1.7 2.6 1.6"/><path d="M9 12.4c1.6-1 4-1.2 5.8-.3"/><path d="M6.6 10.6C5.4 10 4.4 10 3.6 10.4"/><path d="M6.2 12.6C5 12.4 4 12.7 3.4 13.4"/></g>`,
    "Fish & Seafood":  `<g stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c3-4.5 9-4.5 12 0-3 4.5-9 4.5-12 0Z"/><path d="M16 12c1.4-1.6 3-2.2 4-2.2-.4 1.4-.4 3 0 4.4-1 0-2.6-.6-4-2.2Z"/><circle cx="8" cy="11.4" r=".6" fill="currentColor" stroke="none"/></g>`,
    "Fresh Vegetables":`<g stroke-linecap="round" stroke-linejoin="round"><path d="M12 20c-3.4 0-5.6-2.8-5.6-6.2C6.4 10.6 8.8 8.4 12 8.4s5.6 2.2 5.6 5.4C17.6 17.2 15.4 20 12 20Z"/><path d="M12 8.4c0-1.8 1.2-3.4 3.2-3.8-.2 2-1.4 3.4-3.2 3.8Z"/><path d="M12 13v4"/><path d="M9.6 13.4c1.6.8 3.2.8 4.8 0"/></g>`,
    "Fresh Fruits":    `<g stroke-linecap="round" stroke-linejoin="round"><path d="M10.6 8.2C9 8 7 9 6.4 11.2c-.8 3 .8 7 3.4 8.2 1 .5 1.8.2 2.2-.2.4.4 1.2.7 2.2.2 2.6-1.2 4.2-5.2 3.4-8.2C17 9 15 8 13.4 8.2c-.7.1-1.1.4-1.4.7-.3-.3-.7-.6-1.4-.7Z"/><path d="M12 8.9V6.4c0-1.2 1-2.2 2.4-2.4"/></g>`,
    "Spices":          `<g stroke-linecap="round" stroke-linejoin="round"><path d="M10 5c1.4 3 1.4 9-1.6 14.4"/><path d="M10 5c1.6.6 2.4 2 2 3.6"/><path d="M11 9c1.4.6 2.2 2 1.8 3.6"/><path d="M11.6 13c1.4.6 2.1 1.9 1.8 3.4"/><path d="M8.4 19.4c-1.6-.6-2.6-1.8-3-3.2"/></g>`,
    "Potato":          `<g stroke-linecap="round" stroke-linejoin="round"><path d="M8.4 7.6C11 6.4 14.6 6.8 16.6 9.2c2 2.4 1.8 6-.6 8-2.4 2-6.2 1.8-8.4-.4-2-2-2.2-5 0-7.2.2-.2.5-.4.8-.6Z"/><circle cx="10.4" cy="11.4" r=".5" fill="currentColor" stroke="none"/><circle cx="14" cy="13.6" r=".5" fill="currentColor" stroke="none"/><circle cx="12" cy="15.6" r=".5" fill="currentColor" stroke="none"/></g>`,
    "Dry & Agro Foods":`<g stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 9h9l-1 9.5c-.1 1-.9 1.5-1.9 1.5h-3.2c-1 0-1.8-.5-1.9-1.5Z"/><path d="M7.5 9c-.6-1 .2-2.4 1.5-2.2 1 .1 1.7.9 2 1.8"/><path d="M16.5 9c.6-1-.2-2.4-1.5-2.2-1 .1-1.7.9-2 1.8"/><path d="M9.6 13c1.6.8 3.2.8 4.8 0"/></g>`,
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

  // A faint jamdani/paddy vine hugging the card's top-right corner (the reference's
  // quiet ornament). One symbol, tinted gold, drawn thin.
  const cornerVine =
    `<svg class="pc-vine" viewBox="0 0 55 55" fill="none" stroke="currentColor" stroke-width="0.7"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <use href="#sgv-lota-corner"></use>
     </svg>`;
  const pin =
    `<svg class="pc-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/>
     </svg>`;

  const cardHTML = (p, i) => {
    const img = (p.images && p.images[0]) || { url: "", alt: p.name };
    const origin = (p.origins || [])[0] || "Bangladesh";
    const hs = p.hsCode ? `<span class="pc-hs">HS ${esc(p.hsCode)}</span>` : "";

    // The reference card: a full photograph on the left, a Midnight-Navy panel on
    // the right — category eyebrow, serif name, a line of copy, the origin with a
    // pin, then "Explore Product →" (opens the detail + inquiry modal). A thin gold
    // frame with cut corners and a faint corner vine finishes it.
    return `
    <article class="product-card" data-cat="${esc(p.category)}" data-slug="${esc(p.slug)}" data-reveal>
      <div class="pc-photo">
        <img src="${esc(nicheSrc(img, p))}" alt="${esc(img.alt || p.name)}" loading="lazy" decoding="async">
      </div>
      <div class="pc-body">
        ${cornerVine}
        <p class="pc-cat">${esc(p.category)} <i>&#10022;</i></p>
        <h3 class="pc-name">${esc(p.name)}</h3>
        <p class="pc-desc">${esc(p.shortDesc)}</p>
        <p class="pc-loc">${pin}${esc(origin)} ${hs}</p>
        <div class="pc-foot">
          <a class="pc-explore" data-explore>Explore Product <span aria-hidden="true">&rarr;</span></a>
          <a class="pc-inquire" data-cta="whatsapp" data-product="${esc(p.name)}"
             data-packaging="${esc((p.packaging || [])[0] || "bulk")}" aria-label="Inquire about ${esc(p.name)} on WhatsApp">Inquire</a>
        </div>
      </div>
      <span class="pc-corner pc-corner--tl" aria-hidden="true"></span>
      <span class="pc-corner pc-corner--br" aria-hidden="true"></span>
    </article>`;
  };

  grid.innerHTML = products.length
    ? products.map(cardHTML).join("")
    : `<p class="products-empty">No products yet — add your first to bring the showcase to life.</p>`;

  // Open modal on card body click (but not on the inquiry buttons).
  grid.addEventListener("click", (e) => {
    if (e.target.closest("[data-cta]")) return;
    const card = e.target.closest(".product-card");
    if (card) openModal(card.dataset.slug);
  });

  // Wire the freshly-rendered inquiry buttons.
  window.CTA && window.CTA.wireDataAttrs(grid);

  /* ---- Filtering ------------------------------------------------------ */
  function applyFilter(cat) {
    grid.querySelectorAll(".product-card").forEach((card) => {
      const show = cat === "All" || card.dataset.cat === cat;
      card.classList.toggle("is-hidden", !show);
    });
  }

  /* ---- Detail modal --------------------------------------------------- */
  function openModal(slug) {
    const p = products.find((x) => x.slug === slug);
    if (!p) return;
    let modal = document.querySelector(".modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      document.body.appendChild(modal);
    }
    const img = (p.images && p.images[0]) || { url: "", alt: p.name };
    const specRows = Object.entries(p.specs || {})
      .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    const list = (arr) => (arr || []).map((x) => `<span class="chip">${esc(x)}</span>`).join("");

    modal.innerHTML = `
      <div class="modal-panel" role="document">
        <button class="modal-close" aria-label="Close">&times;</button>
        <div class="modal-grid">
          <div class="modal-gallery"><img src="${esc(resolveImg(img.url))}" alt="${esc(img.alt || p.name)}"></div>
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
            </div>
          </div>
        </div>
      </div>`;

    window.CTA && window.CTA.wireDataAttrs(modal);
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    const close = () => { modal.classList.remove("is-open"); document.body.style.overflow = ""; };
    modal.querySelector(".modal-close").addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", function escClose(ev) {
      if (ev.key === "Escape") { close(); document.removeEventListener("keydown", escClose); }
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
};
