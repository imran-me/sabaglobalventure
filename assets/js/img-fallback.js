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
    const lines = wrap(String(label || "Saba Global Ventures"), 20, 2);
    const capY = 512 - (lines.length - 1) * 24;
    const caption = lines.map((l, i) =>
      "<text x='400' y='" + (capY + i * 46) + "' text-anchor='middle' fill='#E9DBB2' " +
      "font-family='Georgia, serif' font-style='italic' font-size='36'>" + escXml(l) + "</text>").join("");

    // A jamdani corner motif: a quarter-arc bracket + a small buti diamond.
    const corner = (tx, ty, rot) =>
      "<g transform='translate(" + tx + " " + ty + ") rotate(" + rot + ")' fill='none' stroke='#C8A24A' stroke-linecap='round' stroke-linejoin='round'>" +
        "<path d='M0 70 Q0 0 70 0' stroke-width='2' stroke-opacity='0.5'/>" +
        "<path d='M16 70 Q16 16 70 16' stroke-width='1.4' stroke-opacity='0.28'/>" +
        "<path d='M34 34 L42 26 L50 34 L42 42 Z' stroke-width='1.6' stroke-opacity='0.6'/>" +
        "<circle cx='42' cy='34' r='1.6' fill='#C8A24A' stroke='none'/>" +
      "</g>";

    // A drooping rice panicle (paddy) flanking the lotus.
    const paddy = (tx, sx) =>
      "<g transform='translate(" + tx + " 250) scale(" + sx + " 1)' fill='none' stroke='#C8A24A' stroke-opacity='0.42' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.4'>" +
        "<path d='M0 96 C6 60 4 22 -8 -14'/>" +
        "<path d='M-6 6 C4 2 10 10 6 20 C0 16 -4 12 -6 6Z'/>" +
        "<path d='M-4 30 C6 26 12 34 8 44 C2 40 -2 36 -4 30Z'/>" +
        "<path d='M-1 54 C9 50 15 58 11 68 C5 64 1 60 -1 54Z'/>" +
        "<path d='M2 78 C12 74 18 82 14 92 C8 88 4 84 2 78Z'/>" +
      "</g>";

    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>" +
        "<defs><linearGradient id='g' x1='0.2' y1='0' x2='0.5' y2='1'>" +
          "<stop offset='0' stop-color='#12306A'/><stop offset='0.55' stop-color='#0A1C48'/><stop offset='1' stop-color='#050F2C'/>" +
        "</linearGradient>" +
        "<radialGradient id='halo' cx='0.5' cy='0.36' r='0.5'>" +
          "<stop offset='0' stop-color='#C8A24A' stop-opacity='0.12'/><stop offset='1' stop-color='#C8A24A' stop-opacity='0'/>" +
        "</radialGradient></defs>" +
        "<rect width='800' height='800' fill='url(#g)'/>" +
        "<rect width='800' height='800' fill='url(#halo)'/>" +
        // double gold frame
        "<rect x='26' y='26' width='748' height='748' fill='none' stroke='#C8A24A' stroke-opacity='0.34' stroke-width='2'/>" +
        "<rect x='38' y='38' width='724' height='724' fill='none' stroke='#C8A24A' stroke-opacity='0.16' stroke-width='1'/>" +
        // jamdani corners
        corner(46, 46, 0) + corner(754, 46, 90) + corner(754, 754, 180) + corner(46, 754, 270) +
        // paddy flanking the lotus
        paddy(300, 1) + paddy(500, -1) +
        // the shapla (national flower) — layered petals + water lines, the house mark
        "<g transform='translate(400 300)' fill='none' stroke='#D8BD72' stroke-linecap='round' stroke-linejoin='round' stroke-width='3.2'>" +
          "<path d='M0 74 C-8 22 -8 -54 0 -98 C8 -54 8 22 0 74Z'/>" +
          "<path d='M0 74 C-36 46 -64 -4 -74 -58 C-32 -42 -4 -6 0 74Z'/>" +
          "<path d='M0 74 C36 46 64 -4 74 -58 C32 -42 4 -6 0 74Z'/>" +
          "<path d='M0 74 C-62 56 -102 26 -118 -22 C-62 -20 -20 10 0 74Z' stroke-opacity='0.55'/>" +
          "<path d='M0 74 C62 56 102 26 118 -22 C62 -20 20 10 0 74Z' stroke-opacity='0.55'/>" +
          "<path d='M-86 88 C-32 68 32 68 86 88' stroke-opacity='0.4'/>" +
          "<path d='M-58 100 C-22 88 22 88 58 100' stroke-opacity='0.28'/>" +
        "</g>" +
        caption +
        // a diamond-centred rule under the caption
        "<path d='M292 " + (capY + 34) + " H388 M412 " + (capY + 34) + " H508' stroke='#C8A24A' stroke-opacity='0.5' stroke-width='1'/>" +
        "<path d='M400 " + (capY + 27) + " L407 " + (capY + 34) + " L400 " + (capY + 41) + " L393 " + (capY + 34) + " Z' fill='#C8A24A' fill-opacity='0.65'/>" +
        "<text x='400' y='624' text-anchor='middle' fill='#C8A24A' font-family='Arial, sans-serif' font-size='17' letter-spacing='6'>SABA GLOBAL VENTURES</text>" +
        "<text x='400' y='656' text-anchor='middle' fill='#C8A24A' fill-opacity='0.6' font-family='Georgia, serif' font-style='italic' font-size='19'>imagery on request</text>" +
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
