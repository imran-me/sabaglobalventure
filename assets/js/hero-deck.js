/* ============================================================================
   hero-deck.js — Two tilted "product plate" cards in the hero (desktop)
   ----------------------------------------------------------------------------
   Fills the open right-hand space of the hero with two overlapping, gold-framed
   cards that quietly cross-fade through every photo in the live catalogue —
   a luxurious, ever-changing glimpse of the products without a heavy carousel.

   - Reads product images from the Store (admin-managed), falling back to the
     seed data, and PROBE-LOADS each one. Only photos that actually decode are
     used; if none do, the deck removes itself.
     Why probe rather than trust the URL: the seed catalogue ships real image
     paths before the client has uploaded the photos, and img-fallback.js only
     rescues a broken <img> ONCE — the rotation below re-assigns .src every
     tick, which would defeat that guard and leave alt text on screen.
   - Each card holds two <img> layers and swaps them with an 0.85s cross-fade.
   - Cards advance one at a time (~1.3s cadence) so something is always gently
     changing. Honors prefers-reduced-motion (shows a static pair, no rotation).
   - The markup + styling live in sections/hero.html and sections/hero.css; the
     whole deck is hidden by CSS below 980px so phones stay clean.
   ========================================================================== */

window.initHeroDeck = async function initHeroDeck() {
  const deck = document.querySelector("[data-hero-deck]");
  if (!deck) return;

  const resolveImg = (u) => (window.MEDIA ? window.MEDIA.resolveImg(u) : (u || ""));

  // Collect every product photo (first + gallery) from the live catalogue.
  const products = (window.Store ? window.Store.getProducts() : (window.PRODUCTS || []))
    .filter((p) => p.status !== "draft");
  const candidates = [];
  products.forEach((p) => (p.images || []).forEach((im) => {
    if (im && im.url) candidates.push({ url: resolveImg(im.url), alt: im.alt || p.name || "" });
  }));

  if (!candidates.length) { deck.remove(); return; }   // no photos at all

  // Keep only the photos that genuinely load. A URL in the data is not proof
  // the file exists — the seed ships paths for photography that may not be
  // uploaded yet, and a broken <img> here would show raw alt text.
  const imgs = (await Promise.all(candidates.map((im) => new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(probe.naturalWidth > 1 ? im : null);
    probe.onerror = () => resolve(null);
    probe.src = im.url;
  })))).filter(Boolean);

  if (!imgs.length) { deck.remove(); return; }   // none usable yet — no deck

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = [...deck.querySelectorAll(".hd-card")];

  // Give each card two stacked layers so we can cross-fade between photos.
  const state = cards.map((cardEl, i) => {
    cardEl.innerHTML = `<img alt="" decoding="async"><img alt="" decoding="async">`;
    return {
      layers: [...cardEl.querySelectorAll("img")],
      front: 0,
      idx: (i * Math.max(1, Math.floor(imgs.length / cards.length))) % imgs.length,
    };
  });

  const show = (s, idx) => {
    const im = imgs[((idx % imgs.length) + imgs.length) % imgs.length];
    const back = s.layers[s.front ^ 1];
    const reveal = () => {
      s.layers.forEach((l, k) => l.classList.toggle("is-on", k === (s.front ^ 1)));
      s.front ^= 1;
    };
    back.alt = im.alt;
    back.onload = reveal;
    // No onerror->reveal here: every `imgs` entry was probe-loaded above, so a
    // failure now is a genuine anomaly and revealing it would show alt text.
    back.src = im.url;
    if (back.complete && back.naturalWidth > 1) reveal();
  };

  state.forEach((s) => show(s, s.idx));

  if (reduce || imgs.length < 2) return;   // static pair — nothing to rotate

  // Advance one card per tick (staggered) so the pair never flips in unison.
  let turn = 0;
  setInterval(() => {
    const s = state[turn % state.length];
    s.idx += state.length;                 // step forward, keep the two cards distinct
    show(s, s.idx);
    turn++;
  }, 1300);
};
