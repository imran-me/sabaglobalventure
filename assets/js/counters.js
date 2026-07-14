/* ============================================================================
   counters.js — the figures
   ----------------------------------------------------------------------------
   Any element with [data-count="20"] counts up when it scrolls into view.
   Optional [data-suffix="+"]. Reduced motion -> the final value, immediately.

   Three small things, and small things are the whole point of this file:

   EASING     easeOutExpo, not cubic. It sprints, then lands almost still — the
              number settles rather than stops. Cubic coasts in and reads cheap.
   THE SUFFIX is emitted as <span class="suffix">, because trust.css paints it a
              different gold to the numeral. Written as plain text (as it was),
              that selector never matched and the "+" silently stayed the wrong
              colour — the kind of detail nobody reports and everybody feels.
   STAGGER    figures start a beat apart, left to right. Four numbers moving in
              perfect unison look mechanical; a beat apart they look counted.
   ========================================================================== */

window.initCounters = function initCounters() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const paint = (el, value, suffix) => {
    el.innerHTML = value + (suffix ? `<span class="suffix">${esc(suffix)}</span>` : "");
  };

  const run = (el, index = 0) => {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { paint(el, target, suffix); return; }

    const DUR = 1600;
    const delay = index * 110;          // the beat between figures
    const start = performance.now() + delay;

    const tick = (now) => {
      if (now < start) { requestAnimationFrame(tick); return; }
      const p = Math.min((now - start) / DUR, 1);
      // easeOutExpo — hard deceleration, a soft landing.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      paint(el, Math.round(target * eased), suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) { els.forEach((el, i) => run(el, i)); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      // Index within the row, so the stagger always runs left-to-right even
      // though IntersectionObserver hands entries back in arbitrary order.
      const row = [...document.querySelectorAll("[data-count]")];
      run(e.target, Math.max(0, row.indexOf(e.target)));
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  els.forEach((el) => io.observe(el));
};
