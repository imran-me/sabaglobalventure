/* ============================================================================
   preloader.js — the overture, and knowing when not to perform it
   ----------------------------------------------------------------------------
   The plate in furniture.html plays a short overture: a ring draws closed, the
   crest blooms, the wordmark opens out of tight tracking, a rule runs out.

   Three judgements, and they are the whole file:

   1. LET IT FINISH ITS PHRASE. The old cap was 1.2s, which cut the overture off
      mid-gesture — worse than having no overture at all. We hold for the beat
      (BEAT), then leave. But we never hold for the network: if the page is
      still loading after CEILING we go anyway. A greeting that overstays is
      not a greeting.

   2. GREET ONCE. A flourish on arrival is hospitality; the same flourish on
      every navigation is a toll. After the first view in a session we skip it
      entirely — the returning visitor gets the page instantly.

   3. DON'T PERFORM FOR SOMEONE WHO ASKED YOU NOT TO. Under reduced-motion the
      plate shows its finished frame and leaves almost at once.
   ========================================================================== */

window.initPreloader = function initPreloader() {
  const el = document.querySelector(".preloader");
  if (!el) return;

  const BEAT = 2200;      // the overture's own length — see components.css
  const CEILING = 3200;   // never hold the page longer than this, whatever happens
  const SEEN = "sgv_greeted";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let greeted = false;
  try { greeted = sessionStorage.getItem(SEEN) === "1"; } catch (_) {}

  const leave = () => {
    if (el.classList.contains("is-done")) return;
    el.classList.add("is-done");
    try { sessionStorage.setItem(SEEN, "1"); } catch (_) {}
  };

  // Already greeted this session, or motion is unwelcome: don't perform.
  if (greeted) { el.classList.add("is-instant"); requestAnimationFrame(leave); return; }
  if (reduce) { setTimeout(leave, 400); return; }

  const started = performance.now();
  const holdRemainder = () => setTimeout(leave, Math.max(0, BEAT - (performance.now() - started)));

  if (document.readyState === "complete") holdRemainder();
  else window.addEventListener("load", holdRemainder, { once: true });

  setTimeout(leave, CEILING);

  // Let someone dismiss it — an impatient buyer is still a buyer.
  el.addEventListener("click", leave);
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") leave(); }, { once: true });

  // Take it out of the a11y tree once it has gone, and stop it eating clicks.
  el.addEventListener("transitionend", () => {
    if (el.classList.contains("is-done")) {
      el.setAttribute("aria-hidden", "true");
      el.style.pointerEvents = "none";
    }
  });
};
