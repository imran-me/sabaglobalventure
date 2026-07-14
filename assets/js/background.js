/* ============================================================================
   background.js — The signature "Delta to the World" animated background
   ----------------------------------------------------------------------------
   Places the per-section golden silhouette accents and runs the drifting gold
   particle field. The fixed stage itself (.bg-stage / .bg-glow / .bg-scene /
   .bg-waves / .bg-veil) is INLINED into each page's HTML so it paints on the
   first frame with no pop-in — this file only adds the parts that depend on
   where the sections landed.

   Silhouettes are SVG files in assets/img/silhouettes/ applied as CSS MASKS,
   so the gold gradient in background.css tints every one of them. Nothing here
   needs photography.

   Performance: transform/opacity only (GPU), IntersectionObserver instead of a
   scroll handler, particles paused when the tab is hidden, accents removed
   entirely below 760px (CSS). Fully disabled under prefers-reduced-motion —
   a tasteful static arrangement is shown instead.

   TUNING KNOBS:
     - which motif appears in which section -> SIDE_ACCENTS below
     - how strong each one is               -> `op:` (target 0.10–0.20)
     - overall scene strength               -> .bg-scene { opacity } in CSS
   ========================================================================== */

window.initBackground = function initBackground() {
  const stage = document.querySelector(".bg-stage");
  if (!stage) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DIR = "assets/img/silhouettes/";
  // Golden motifs at the LEFT / RIGHT edge of successive sections, alternating
  // sides. Each is a child of its section (so it scrolls with the page), peeks
  // in from the edge, and fades up as that section enters view. The mapping
  // tells the company's story in order: the delta -> its goods -> the world.
  //   w  = width in vmin;  y = vertical anchor (% of the section);  op = opacity
  const SIDE_ACCENTS = [
    { section: "hero",         file: "sampan.svg",      side: "right", w: 34, y: 68, op: 0.16 },
    { section: "trust",        file: "water-lily.svg",  side: "left",  w: 16, y: 52, op: 0.14 },
    { section: "about",        file: "tiger.svg",       side: "left",  w: 32, y: 60, op: 0.13 },
    { section: "products",     file: "paddy.svg",       side: "right", w: 24, y: 42, op: 0.15 },
    { section: "capabilities", file: "port-crane.svg",  side: "right", w: 28, y: 56, op: 0.14 },
    { section: "markets",      file: "cargo-ship.svg",  side: "left",  w: 36, y: 62, op: 0.14 },
    { section: "cta",          file: "water-lily.svg",  side: "right", w: 18, y: 55, op: 0.15 },
    { section: "contact",      file: "mosque.svg",      side: "left",  w: 26, y: 58, op: 0.14 },
  ];

  const used = new Set();
  const placed = [];
  SIDE_ACCENTS.forEach((a) => {
    let host = null;
    document.querySelectorAll(`[data-bg-section="${a.section}"]`).forEach((h) => {
      if (!host && !used.has(h)) host = h;
    });
    if (!host) return;
    used.add(host);

    const el = document.createElement("div");
    el.className = `side-accent ${a.side}`;
    el.setAttribute("aria-hidden", "true");
    Object.assign(el.style, {
      width: a.w + "vmin",
      height: (a.w * 0.82) + "vmin",
      top: a.y + "%",
    });
    // Mask (not background-image) so the gold gradient in CSS tints the shape.
    const url = `url(${DIR}${a.file})`;
    el.style.webkitMaskImage = url;
    el.style.maskImage = url;
    el.style.setProperty("--acc-op", a.op);
    host.appendChild(el);
    placed.push(el);
  });

  if (reduce) {
    placed.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window && placed.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-in"); });
    }, { threshold: 0.12 });
    placed.forEach((el) => io.observe(el));
  } else {
    placed.forEach((el) => el.classList.add("is-in"));
  }

  // Signature drifting golden particles on top of the stage.
  if (!reduce) initParticles(stage);
};

/* Lightweight gold particle field on a <canvas>.
   Deterministic seeding (no Math.random) so the field looks identical on every
   load and never "shimmers" differently between reloads. */
function initParticles(stage) {
  const canvas = document.createElement("canvas");
  canvas.className = "bg-particles";
  canvas.setAttribute("aria-hidden", "true");
  stage.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let w, h, dots = [], raf, running = true;

  const isSmall = () => window.innerWidth < 768;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = isSmall() ? 26 : 64;   // fewer particles on mobile
    dots = Array.from({ length: count }, (_, i) => ({
      x: ((i * 97) % w),
      y: ((i * 53) % h),
      r: 0.6 + (i % 5) * 0.25,
      sx: 0.10 + (i % 4) * 0.05,   // drift right, like a current
      sy: 0.05 + (i % 3) * 0.04,   // and gently upward
    }));
  };
  resize();
  window.addEventListener("resize", resize);

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(201,162,75,0.5)";
    dots.forEach((d) => {
      d.x += d.sx; d.y -= d.sy;
      if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };
  draw();

  // Pause when the tab is hidden (perf).
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) draw(); else cancelAnimationFrame(raf);
  });
}
