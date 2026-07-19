/* ============================================================================
   main.js — Boot orchestrator
   ----------------------------------------------------------------------------
   Runs AFTER all HTML partials are injected (waits on window.__includesReady).
   Order matters: populate config-driven content first, then wire CTAs, then
   start behaviour/animation modules.

   Each init* function is defined in its own file and is a no-op if its target
   markup isn't on the current page — so the same main.js works on every page.
   ========================================================================== */

(async function boot() {
  // Wait for section includes (index.html). Pages without includes resolve
  // immediately because __includesReady still settles on DOMContentLoaded.
  if (window.__includesReady) { try { await window.__includesReady; } catch (_) {} }
  else { await new Promise((r) => document.addEventListener("DOMContentLoaded", r)); }

  // Make sure the local cache is seeded, then (if Firebase is configured) pull
  // the latest published catalogue/settings from Firestore into that cache so
  // the renderers below show every visitor the newest admin edits.
  if (window.Store) window.Store.ready();
  if (window.SGVCloud && window.SGVCloud.enabled) {
    // Never let a slow/unreachable Firestore block the whole page: race the pull
    // against a short timeout and fall back to the local cache if it's not done.
    try {
      await Promise.race([
        window.SGVCloud.pull(),
        new Promise((resolve) => setTimeout(resolve, 4000)),
      ]);
    } catch (e) { console.error("[cloud] pull failed", e); }
  }

  // Apply any admin Settings overrides onto SITE_CONFIG (mutate in place so the
  // reference cached by cta-helper.js stays valid). Only non-empty values win.
  if (window.Store && window.SITE_CONFIG) {
    const s = window.Store.getSettings();
    ["whatsapp", "email", "phone", "address", "mapUrl", "hours", "emblem",
     "replyPromise", "portLoading", "incoterms", "paymentTerms", "leadTime",
     "samplePolicy", "tradeLicense", "bin", "exportRegNo", "seasonNote",
     "analyticsId"].forEach((k) => {
      if (s[k]) window.SITE_CONFIG[k] = s[k];
    });
    if (s.socials) window.SITE_CONFIG.socials = { ...window.SITE_CONFIG.socials, ...s.socials };
  }

  applyEmblem();
  applyContent();

  populateConfig();
  renderMarketChips();
  renderStats();
  renderCerts();
  renderTradeFacts();
  renderLegalLine();
  renderSeasonNote();
  renderProductJsonLd();
  initAnalytics();

  // Wire every static [data-cta] link/button on the page.
  window.CTA && window.CTA.wireDataAttrs(document);

  // Behaviour / animation modules (guard each — they may not exist on a page).
  //
  // ORDER MATTERS: initReveal must run AFTER every module that injects markup
  // (products, featured, markets pins). It snapshots [data-reveal] targets once
  // and assigns the stagger --i indices to a group's children — run it first and
  // the injected product cards are never observed and never get an index, so
  // their stagger silently does nothing and they only stay visible by an
  // accident of CSS specificity.
  [
    "initPreloader", "initNav", "initCursor",
    "initCounters", "initBackground", "initProducts", "initFeatured",
    "initMarquee", "initMarketsMap",
    "initReveal",     // after everything that injects markup — see note above
    "initKinetic",    // after reveal: the headline reveals itself, not via IO
    "initContact",
  ].forEach((fn) => { try { window[fn] && window[fn](); } catch (e) { console.error(fn, e); } });

  initSmoothScroll();
  honourInitialHash();
})();

/* ---- Land on the right section for a deep-linked URL -----------------
   The page is composed from partials fetched at runtime, so when the browser
   processes a fragment like index.html#products on load, that element does not
   exist yet and the native scroll silently does nothing. Every deep link into
   the site depends on this: the products.html / about.html / contact.html
   redirect stubs, the rewritten nav links on those pages, and any bookmark.
   So once the partials are in, jump to the target ourselves. */
function honourInitialHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  // Wait one frame so late layout (fonts, images) settles before we measure.
  requestAnimationFrame(() => {
    const y = target.getBoundingClientRect().top + window.scrollY - 80;  // header
    window.scrollTo({ top: y, behavior: "auto" });   // instant: this is a load
  });
}

/* ---- Fill config-driven content ------------------------------------- */
// Elements opt in with:
//   data-config="email"            -> sets textContent
//   data-config-href="whatsapp"    -> sets href (wa.me / mailto / map / social)
//   data-config-attr="phone:title" -> sets an arbitrary attribute
function populateConfig() {
  const c = window.SITE_CONFIG || {};
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), c);

  document.querySelectorAll("[data-config]").forEach((el) => {
    const v = get(el.getAttribute("data-config"));
    if (v != null) el.textContent = v;
  });

  // Treat any still-unfilled {CURLY} value as unset, so we never emit a
  // half-built link (e.g. href="{GOOGLE_MAPS_URL}" or tel:{PHONE}).
  const unset = (v) => (window.CTA ? window.CTA.isUnset(v) : !v || /^\{.*\}$/.test(String(v)));

  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const key = el.getAttribute("data-config-href");
    let href = "#";
    if (key === "whatsapp") href = window.CTA.whatsappUrl({});
    else if (key === "email") href = window.CTA.mailtoUrl({});
    else if (key === "phone") href = unset(c.phone) ? "#" : `tel:${String(c.phone).replace(/[\s-]+/g, "")}`;
    else if (key === "map") href = unset(c.mapUrl) ? "#" : c.mapUrl;
    else if (key === "instagram") href = unset(c.socials?.instagram) ? "#" : c.socials.instagram;
    else if (key === "facebook") href = unset(c.socials?.facebook) ? "#" : c.socials.facebook;
    else if (key === "linkedin") href = unset(c.socials?.linkedin) ? "#" : c.socials.linkedin;
    el.setAttribute("href", href);
    // Socials we simply hide when unset — an empty row reads as "no presence",
    // which is better than a dead icon. Dock bubbles likewise: a floating
    // button that does nothing is worse than one fewer bubble.
    if (key.match(/instagram|facebook|linkedin/) && href === "#") el.style.display = "none";
    if (href === "#" && el.closest(".dock")) el.style.display = "none";
    if (href !== "#" && (key === "whatsapp" || key === "map" || key.match(/instagram|facebook|linkedin/))) {
      el.target = "_blank"; el.rel = "noopener";
    }
  });

  // Current year wherever needed.
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---- Editable section content (admin "Content" tab) -----------------
   Any element with data-content="key" has its text replaced by the matching
   admin-saved value; data-content-src="key" swaps an <img> source. If a value
   is blank/unset the committed default in the HTML is kept, so the site always
   reads well even before the client edits anything. */
function applyContent() {
  const s = (window.Store && window.Store.getSettings && window.Store.getSettings()) || {};
  const content = s.content || {};
  document.querySelectorAll("[data-content]").forEach((el) => {
    const v = content[el.getAttribute("data-content")];
    if (v != null && String(v).trim() !== "") el.textContent = v;
  });
  document.querySelectorAll("[data-content-src]").forEach((el) => {
    const v = content[el.getAttribute("data-content-src")];
    if (v && String(v).trim() !== "") el.src = window.MEDIA ? window.MEDIA.resolveImg(v) : v;
  });
}

/* ---- Brand emblem (admin Branding tab overrides the committed logo) -- */
function applyEmblem() {
  const c = window.SITE_CONFIG || {};
  if (!c.emblem) return;
  const src = window.MEDIA ? window.MEDIA.resolveImg(c.emblem) : c.emblem;
  // Header/footer brand mark + preloader emblem.
  document.querySelectorAll(".brand .mark, .preloader .emblem").forEach((img) => {
    img.src = src;
  });
}

/* ---- Market flag chips (hero, CTA band, footer) --------------------- */
// Source of truth = admin-managed Countries (active), falling back to config.
function renderMarketChips() {
  let markets = [];
  if (window.Store && window.Store.getCountries) {
    markets = window.Store.getCountries()
      .filter((c) => c.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((c) => ({ name: c.name.replace(/\s*\(.*\)$/, ""), flag: c.flag || "" }));
  }
  if (!markets.length) markets = (window.SITE_CONFIG || {}).markets || [];

  const LIMIT = 10;   // show at most 10 publicly; the rest live behind "See all"
  const chip = (m, dots) => dots
    ? `<li><span class="flag">${m.flag}</span> ${m.name}</li>`
    : `<span class="chip"><span class="flag">${m.flag}</span> ${m.name}</span>`;

  document.querySelectorAll("[data-markets]").forEach((host) => {
    const asDots = host.hasAttribute("data-markets-dots");
    let html = markets.slice(0, LIMIT).map((m) => chip(m, asDots)).join("");
    if (markets.length > LIMIT) {
      html += asDots
        ? `<li><button type="button" class="see-all-markets">See all ${markets.length} &rarr;</button></li>`
        : `<button type="button" class="see-all-markets chip chip--more">See all ${markets.length} &rarr;</button>`;
    }
    host.insertAdjacentHTML("beforeend", html);
  });

  document.querySelectorAll(".see-all-markets").forEach((b) =>
    b.addEventListener("click", () => openMarketsModal(markets)));
}

/* A simple luxe modal listing every operating country (opened by "See all"). */
function openMarketsModal(markets) {
  let modal = document.querySelector(".markets-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "markets-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    document.body.appendChild(modal);
  }
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  modal.innerHTML = `
    <div class="mm-panel" role="document">
      <button class="mm-close" aria-label="Close">&times;</button>
      <p class="eyebrow">Where We Operate</p>
      <h3>${markets.length} Markets &amp; Growing</h3>
      <ul class="mm-list" role="list">
        ${markets.map((m) => `<li><span class="flag">${m.flag}</span> ${esc(m.name)}</li>`).join("")}
      </ul>
    </div>`;
  requestAnimationFrame(() => modal.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  const close = () => { modal.classList.remove("is-open"); document.body.style.overflow = ""; };
  modal.querySelector(".mm-close").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", function esc2(ev) {
    if (ev.key === "Escape") { close(); document.removeEventListener("keydown", esc2); }
  });
}

/* ---- Trust-strip stats ---------------------------------------------- */
function renderStats() {
  const stats = (window.SITE_CONFIG || {}).stats || [];
  const host = document.querySelector("[data-stats]");
  if (!host) return;
  // The "Markets" counter is LIVE: it counts the active operating countries the
  // client manages in Admin, so adding a country bumps this number automatically.
  let marketCount = 0;
  if (window.Store && window.Store.getCountries) {
    marketCount = window.Store.getCountries().filter((c) => c.active !== false).length;
  }
  host.innerHTML = stats.map((s) => {
    const isMarkets = /market/i.test(s.label);
    const value = (isMarkets && marketCount) ? marketCount : s.value;
    return `
    <div class="stat" data-reveal>
      <div class="num"><span data-count="${value}" data-suffix="${s.suffix || ""}">0</span></div>
      <div class="label">${s.label}</div>
    </div>`;
  }).join("");
}

/* ---- Certification badges (tiny gold line-art + label) -------------- */
const CERT_ICONS = {
  iso:      '<circle cx="12" cy="12" r="7.5"/><path d="M12 6.5v11M6.7 9.2h10.6M6.7 14.8h10.6"/>',
  haccp:    '<path d="M12 3.5l7 3v5c0 4.2-2.9 7-7 9-4.1-2-7-4.8-7-9v-5Z"/><path d="M9 12l2 2 4-4.5"/>',
  halal:    '<circle cx="12" cy="12" r="7.5"/><path d="M9.2 9v6M9.2 12c1.5-1.6 3.4-1.6 3.4.4V15M15.4 8.6V15"/>',
  leaf:     '<path d="M6 18C6 11 11 6.5 18 6.5 18 13 13.5 18 6 18Z"/><path d="M6 18C9 15 12.5 12.5 16 11"/>',
  export:   '<path d="M12 15.5V5.5M8.5 9L12 5.5 15.5 9"/><path d="M5.5 14v3.5c0 .6.4 1 1 1h11c.6 0 1-.4 1-1V14"/>',
  nongmo:   '<circle cx="12" cy="12" r="7.5"/><path d="M8 8c3 1 5 3 8 8M8.5 15.5c1.2-1.6 1.2-3.4 0-5M15.5 8.5c-1.2 1.6-1.2 3.4 0 5"/><path d="M6.7 6.7l10.6 10.6"/>',
  hygiene:  '<path d="M12 4.5c2.5 2.5 5 4.5 5 8a5 5 0 0 1-10 0c0-3.5 2.5-5.5 5-8Z"/><path d="M9.6 13.2c.3 1.6 1.4 2.6 2.9 2.8"/>',
  moisture: '<path d="M12 4.5c2.5 3 5 5.4 5 8.5a5 5 0 0 1-10 0c0-3.1 2.5-5.5 5-8.5Z"/>',
  shield:   '<path d="M12 3.5l7 3v5c0 4.2-2.9 7-7 9-4.1-2-7-4.8-7-9v-5Z"/>',
};
function renderCerts() {
  const certs = ((window.SITE_CONFIG || {}).certs || []).filter((c) => c.show);
  const host = document.querySelector("[data-certs]");
  if (!host) return;
  if (!certs.length) { host.remove(); return; }
  // Each certification is a small FRAMED PLATE — the same hairline + scooped
  // "ticket" corner grammar as the product cards, so proof is displayed the
  // way the house displays everything else (ART-VISION #24). The certificate
  // number line renders only once a real `no:` exists in config.certs[] —
  // never display a number that hasn't been supplied.
  host.innerHTML = certs.map((c) => {
    const ico = CERT_ICONS[c.icon] || CERT_ICONS.shield;
    const no = String(c.no || "").trim();
    return `<span class="cert-plate">
      <svg class="cert-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico}</svg>
      <span class="cert-label">${c.label}</span>
      ${no ? `<span class="cert-no">${no}</span>` : ""}
    </span>`;
  }).join("");
}

/* ---- Smooth scroll: native only ------------------------------------
   We deliberately do NOT use a JS smooth-scroll library (e.g. Lenis): it
   hijacks the mouse wheel (preventDefault) which made desktop scrolling feel
   stuck / unresponsive. Native scrolling + `html { scroll-behavior: smooth }`
   (base.css) is reliable on every device and respects reduced-motion. */
function initSmoothScroll() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // In-page anchor smoothing (header is ~80px tall, so offset the target).
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  });
}


/* ---- Trade facts ledger (CTA band) + contact FAQ ----------------------
   Values live in config.js and Admin -> Settings; every line hides itself
   when blank, so nothing unconfirmed ever renders. */
function renderTradeFacts() {
  const c = window.SITE_CONFIG || {};
  const rows = [
    ["Port of loading", c.portLoading],
    ["Incoterms",       c.incoterms],
    ["Payment",         c.paymentTerms],
    ["Lead time",       c.leadTime],
    ["Samples",         c.samplePolicy],
  ].filter((r) => r[1] && !/^\{.*\}$/.test(r[1]));
  const host = document.querySelector("[data-trade-facts]");
  if (host && rows.length) {
    host.innerHTML = rows.map(([t, v]) =>
      '<div class="fact"><span class="fact-t">' + t + '</span><span class="fact-v">' + v + "</span></div>"
    ).join("");
    host.hidden = false;
  }
  // FAQ (contact section) — same facts, phrased as the buyer asks them.
  const faq = document.querySelector("[data-faq]");
  if (faq) {
    const qa = [
      ["What is the minimum order?", "MOQ applies per product - most lines start at one 20' FCL. The exact MOQ is on every product card."],
      c.paymentTerms ? ["Which payment terms do you accept?", c.paymentTerms + "."] : null,
      c.leadTime ? ["How fast can you ship?", c.leadTime + ", subject to season and vessel space."] : null,
      c.samplePolicy ? ["Can I get samples first?", c.samplePolicy + "."] : null,
      c.portLoading ? ["Which ports do you load from?", c.portLoading + "."] : null,
    ].filter(Boolean);
    if (qa.length) {
      faq.innerHTML = '<h3 class="faq-title">Before you ask</h3>' + qa.map(([q, a]) =>
        "<details class='faq-item'><summary>" + q + "</summary><p>" + a + "</p></details>"
      ).join("");
      faq.hidden = false;
      // FAQPage structured data mirrors the VISIBLE questions only.
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: qa.map(([q, a]) => ({
          "@type": "Question", name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      });
      document.head.appendChild(ld);
    }
  }
}

/* ---- Footer legal line — renders ONLY the registrations that exist ---- */
function renderLegalLine() {
  const c = window.SITE_CONFIG || {};
  const bits = [c.tradeLicense, c.bin, c.exportRegNo]
    .map((v) => String(v || "").trim())
    .filter((v) => v && !/^\{.*\}$/.test(v));
  const host = document.querySelector("[data-legal-line]");
  if (host && bits.length) { host.textContent = bits.join("  ·  "); host.hidden = false; }
}

/* ---- Season note — the one living line under the hero ticker ---------- */
function renderSeasonNote() {
  const c = window.SITE_CONFIG || {};
  const v = String(c.seasonNote || "").trim();
  const host = document.querySelector("[data-season-note]");
  if (host && v && !/^\{.*\}$/.test(v)) {
    host.querySelector("span").textContent = v;
    host.hidden = false;
  }
}

/* ---- Product structured data — rich results build legitimacy ---------- */
function renderProductJsonLd() {
  try {
    const products = (window.Store ? window.Store.getProducts() : window.PRODUCTS || [])
      .filter((p) => p.status !== "draft").slice(0, 24);
    if (!products.length) return;
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": products.map((p) => ({
        "@type": "Product",
        name: p.name,
        description: p.shortDesc || "",
        category: p.category || "",
        url: "https://www.sabaglobalventures.com/#product=" + encodeURIComponent(p.slug || ""),
        brand: { "@type": "Brand", name: "Saba Global Ventures" },
      })),
    });
    document.head.appendChild(ld);
  } catch (_) { /* structured data must never break the page */ }
}

/* ---- Analytics (GA4) — loads ONLY when an id is configured ------------ */
function initAnalytics() {
  const id = String((window.SITE_CONFIG || {}).analyticsId || "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(id)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
  // The event the seller actually cares about: which products drive WhatsApp.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href*='wa.me']");
    if (!a) return;
    gtag("event", "wa_click", {
      product: a.getAttribute("data-product") || "(general)",
      location: a.closest("section")?.id || "page",
    });
  });
}