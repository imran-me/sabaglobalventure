/* ============================================================================
   kinetic.js — Word-by-word headline reveal + the market marquee
   ----------------------------------------------------------------------------
   Two small pieces of the "maison" feel:

   1. initKinetic() — splits any [data-kinetic] heading into words, wraps each in
      an overflow-hidden box, and lets them rise out from behind the mask in
      sequence. Words are REVEALED, not faded: the mask edge is what makes it
      read as typography rather than as a jQuery effect.

      It splits on words, never characters — the heading must stay one readable
      string for screen readers and for copy/paste, and character-splitting a
      high-contrast serif wrecks its kerning.

   2. initMarquee() — builds an endless ticker of the live markets. The track
      holds the SAME list twice and animates to translateX(-50%), so the second
      copy lands exactly where the first began and the loop has no seam.
   ========================================================================== */

window.initKinetic = function initKinetic() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-kinetic]").forEach((host) => {
    // Walk the direct children so <em> (the gold italic flourish) keeps its tag.
    [...host.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.textContent.trim()) return;
        node.replaceWith(...splitToWords(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const text = node.textContent;
        node.textContent = "";
        node.append(...splitToWords(text));
      }
    });

    // Index every word across the whole heading so the stagger runs in reading
    // order rather than restarting inside the <em>. The per-word transform
    // transition is declared in hero.css (.kw-i); here we only add the
    // longhand duration/curve inline so the rise reads as a hard, considered
    // deceleration (no overshoot) rather than the default power-out — without
    // touching the shared transition-property, so reduced-motion's
    // `.kw-i { transition: none }` still fully disables it (transition: none
    // zeroes transition-property, which these longhands never set).
    host.querySelectorAll(".kw-i").forEach((el, i) => {
      el.style.transitionDelay = `${70 + i * 60}ms`;
      el.style.transitionDuration = "820ms";
      el.style.transitionTimingFunction = "cubic-bezier(.16,1,.3,1)";
    });

    if (reduce) { host.classList.add("is-revealed"); return; }
    requestAnimationFrame(() => host.classList.add("is-revealed"));
  });

  function splitToWords(text) {
    // Keep the spaces: they are real text nodes, so the words don't run together
    // when the heading is read aloud or copied.
    return text.split(/(\s+)/).map((chunk) => {
      if (!chunk.trim()) return document.createTextNode(chunk);
      const outer = document.createElement("span");
      outer.className = "kw";
      const inner = document.createElement("span");
      inner.className = "kw-i";
      inner.textContent = chunk;
      outer.appendChild(inner);
      return outer;
    });
  }
};

/* ---- Market marquee -------------------------------------------------- */
window.initMarquee = function initMarquee() {
  const host = document.querySelector("[data-marquee]");
  if (!host) return;

  // Same source of truth as every other market surface: the admin countries,
  // falling back to config.
  let markets = [];
  if (window.Store && window.Store.getCountries) {
    markets = window.Store.getCountries()
      .filter((c) => c.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((c) => ({ name: c.name.replace(/\s*\(.*\)$/, ""), flag: c.flag || "" }));
  }
  if (!markets.length) markets = (window.SITE_CONFIG || {}).markets || [];
  if (!markets.length) { host.remove(); return; }

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const group = markets
    .map((m) => `<span class="marquee-item"><span class="flag">${esc(m.flag)}</span>${esc(m.name)}</span>`)
    .join("");

  // Two identical groups — the -50% translate swaps one for the other exactly.
  host.innerHTML =
    `<div class="marquee-track">` +
      `<div class="marquee-group">${group}</div>` +
      `<div class="marquee-group">${group}</div>` +
    `</div>`;

  // With few markets the group may be narrower than the viewport, which would
  // leave a visible gap mid-loop. Repeat until each group covers the screen.
  const track = host.querySelector(".marquee-track");
  const groups = [...host.querySelectorAll(".marquee-group")];
  if (groups[0].offsetWidth < window.innerWidth) {
    const need = Math.ceil(window.innerWidth / Math.max(1, groups[0].offsetWidth)) + 1;
    groups.forEach((g) => { g.innerHTML = group.repeat(need); });
  }
  // Longer lists should not scroll faster — keep the pixel speed constant.
  const px = groups[0].offsetWidth;
  if (px) track.style.animationDuration = `${Math.round(px / 28)}s`;
};
