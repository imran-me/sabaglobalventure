/* ============================================================================
   img-fallback.js — Elegant placeholder for any image that fails to load
   ----------------------------------------------------------------------------
   Until the client supplies real product/brand photography, the referenced
   .jpg files don't exist. Rather than show broken-image icons, we catch image
   load errors (capture phase, so it also covers images injected later by JS)
   and swap in a branded majestic-blue + gold SVG placeholder built from the
   image's alt text. Decorative silhouettes/SVGs are skipped.

   This is why the catalogue looks intentional and "well arranged" even before
   a single real photo exists.

   Load this EARLY (before partials/products render) on every public page.
   ========================================================================== */

(function () {
  function escXml(s) {
    return String(s || "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));
  }

  // Wrap a label onto at most `max` lines of ~`per` characters, breaking on
  // word boundaries. Keeps long product names readable instead of clipped.
  function wrap(label, per, max) {
    const words = String(label).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    for (const w of words) {
      const next = line ? line + " " + w : w;
      if (next.length > per && line) { lines.push(line); line = w; }
      else { line = next; }
      if (lines.length === max) break;
    }
    if (lines.length < max && line) lines.push(line);
    if (lines.length === max && line && lines[max - 1] !== line) {
      lines[max - 1] = lines[max - 1].replace(/.{1}$/, "…");
    }
    return lines;
  }

  // Build a branded SVG data-URI placeholder labelled with the alt text.
  //
  // The canvas is SQUARE on purpose. These placeholders land in boxes of very
  // different shapes — the product grid's 4:3 media, the featured deck's
  // portrait cards — and `object-fit: cover` crops whatever doesn't fit. A
  // square loses the least in both directions, and the text is wrapped and
  // kept well inside a centre-safe column so nothing gets sliced off.
  function makePlaceholder(label) {
    const lines = wrap(String(label || "Saba Global Ventures"), 18, 3);
    const startY = 470 - (lines.length - 1) * 21;
    const text = lines.map((l, i) =>
      "<text x='400' y='" + (startY + i * 42) + "' text-anchor='middle' fill='%23E8CE79' " +
      "font-family='Georgia, serif' font-size='34'>" + escXml(l) + "</text>").join("");

    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>" +
        "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
          "<stop offset='0' stop-color='#0B2A6B'/><stop offset='1' stop-color='#02071A'/>" +
        "</linearGradient></defs>" +
        "<rect width='800' height='800' fill='url(%23g)'/>" +
        "<rect x='30' y='30' width='740' height='740' rx='14' fill='none' stroke='%23C9A24B' stroke-opacity='0.28' stroke-width='2'/>" +
        // Shapla (water lily) + waterline emblem motif — the house mark.
        "<g transform='translate(400 300)' fill='none' stroke='%23C9A24B' stroke-opacity='0.55' stroke-width='4' stroke-linecap='round'>" +
          "<circle r='62'/>" +
          "<path d='M0 26 L0 -32 M0 26 L-31 -10 M0 26 L31 -10 M0 26 L-48 14 M0 26 L48 14'/>" +
          "<path d='M-40 36 H40 M-26 48 H26' stroke-opacity='0.4'/>" +
        "</g>" +
        text +
        "<text x='400' y='610' text-anchor='middle' fill='%23C9A24B' font-family='Arial, sans-serif' font-size='16' letter-spacing='4'>SABA GLOBAL VENTURES</text>" +
      "</svg>";
    return "data:image/svg+xml," + svg.replace(/#/g, "%23").replace(/\s{2,}/g, " ");
  }

  function handle(img) {
    if (!img || img.tagName !== "IMG" || img.dataset.fbk) return;
    // Skip SVGs we ship (silhouettes, emblem, favicon) — those aren't "missing".
    if ((img.getAttribute("src") || "").endsWith(".svg")) return;
    img.dataset.fbk = "1";
    img.src = makePlaceholder(img.getAttribute("alt"));
  }

  // Capture phase catches resource errors that don't bubble.
  window.addEventListener("error", (e) => handle(e.target), true);

  window.ImgFallback = { makePlaceholder };
})();
