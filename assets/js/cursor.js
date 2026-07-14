/* ============================================================================
   cursor.js — the gold ring
   ----------------------------------------------------------------------------
   Two parts, and the gap between them is the whole trick:

     DOT    a small gold point sitting exactly on the pointer, with no lag. It
            is the truth — it must never drift, or the cursor feels broken.
     RING   a larger ring that CHASES the dot with easing. It is the flourish.

   Because the ring lags and the dot doesn't, the pair reads as weight — as if
   the ring were a heavier thing being drawn along behind your hand. That is the
   entire illusion, and it is why one element alone never feels like this.

   MAGNETISM: near something you can touch, the ring stops following the pointer
   and eases onto that element's centre, growing to wrap it. The button appears
   to attract the cursor.

   All transform-only, on a single rAF loop. Disabled on touch, on coarse
   pointers, and under reduced-motion — a cursor flourish is meaningless on a
   phone and unwelcome to anyone who asked for calm.
   ========================================================================== */

window.initCursor = function initCursor() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;

  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.setAttribute("aria-hidden", "true");
  document.body.append(ring, dot);

  const INTERACTIVE = "a, button, .pill, .chip--more, [data-cta], input, textarea, select, summary, .product-card";
  const MAGNET_PAD = 26;        // how far outside a target it still pulls

  let px = innerWidth / 2, py = innerHeight / 2;   // pointer (truth)
  let rx = px, ry = py;                            // ring (chases)
  let rs = 1;                                      // ring scale
  let targetRect = null;
  let shown = false;

  const show = (on) => {
    shown = on;
    ring.classList.toggle("is-on", on);
    dot.classList.toggle("is-on", on);
  };

  window.addEventListener("pointermove", (e) => {
    px = e.clientX; py = e.clientY;
    if (!shown) show(true);

    const el = e.target.closest && e.target.closest(INTERACTIVE);
    const r = el ? el.getBoundingClientRect() : null;
    // Ignore anything hidden, zero-sized or page-wide (e.g. the off-screen
    // mobile menu, or a full-bleed link) — wrapping those looks like a bug.
    targetRect = (r && r.width > 0 && r.height > 0 && r.width < innerWidth * 0.9) ? r : null;
    ring.classList.toggle("is-hover", !!targetRect);
  }, { passive: true });

  // Leaving the window: hide both, or they hang in a corner like a dead pixel.
  document.addEventListener("pointerleave", () => show(false));
  window.addEventListener("blur", () => show(false));
  document.addEventListener("pointerdown", () => ring.classList.add("is-down"));
  document.addEventListener("pointerup", () => ring.classList.remove("is-down"));

  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = () => {
    let tx = px, ty = py, ts = 1;

    if (targetRect) {
      // Only snap while the pointer is genuinely over/near it — otherwise a
      // stale rect keeps yanking the ring back after you have moved away.
      const near =
        px > targetRect.left - MAGNET_PAD && px < targetRect.right + MAGNET_PAD &&
        py > targetRect.top - MAGNET_PAD && py < targetRect.bottom + MAGNET_PAD;
      if (near) {
        const cx = targetRect.left + targetRect.width / 2;
        const cy = targetRect.top + targetRect.height / 2;
        // Ease most of the way to the centre, never all of it: keeping some of
        // the pointer's own position means the ring still answers your hand.
        tx = lerp(px, cx, 0.65);
        ty = lerp(py, cy, 0.65);
        ts = Math.min(2.6, Math.max(targetRect.width, targetRect.height) / 26);
      } else {
        targetRect = null;
        ring.classList.remove("is-hover");
      }
    }

    rx = lerp(rx, tx, 0.16);      // the lag that reads as weight
    ry = lerp(ry, ty, 0.16);
    rs = lerp(rs, ts, 0.14);

    ring.style.transform =
      `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${rs.toFixed(3)})`;
    dot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();
};
