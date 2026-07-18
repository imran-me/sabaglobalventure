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
  // in from the edge, and fades up as that section enters view.
  //
  // The mapping is NOT decoration and the pairings are not arbitrary — each
  // motif is the thing that section is actually about:
  //   hero          the nouka, the boat everything starts on
  //   about/origin  the Royal Bengal tiger — the country's own emblem, beside
  //                 the story of where we come from
  //   trust         the Shapla lily, the national flower, beside our word
  //   products      the BAZAR — a catalogue is a market
  //   capabilities  the port cranes — how the house actually moves goods
  //   journey       the braided delta seen from above: the shape of Bangladesh
  //   markets       the cargo ship, leaving
  //   cta           the Dhaka rickshaw — the last mile, and the country's own
  //                 folk art, at the moment we ask for the conversation
  //   contact       the Shat Gombuj mosque, serene, where we sign off
  //
  // Ivory chapters carry a lighter opacity: the same gold that glows on indigo
  // would smudge on paper.
  //   w = width in vmin;  y = vertical anchor (% of section);  op = opacity
  const SIDE_ACCENTS = [
    { section: "hero",         file: "sampan.svg",      side: "right", w: 34, y: 68, op: 0.16 },
    { section: "about",        file: "tiger.svg",       side: "left",  w: 32, y: 60, op: 0.07 },
    { section: "trust",        file: "water-lily.svg",  side: "left",  w: 16, y: 52, op: 0.14 },
    { section: "products",     file: "bazar.svg",       side: "right", w: 27, y: 44, op: 0.13 },
    { section: "capabilities", file: "port-crane.svg",  side: "right", w: 28, y: 56, op: 0.07 },
    { section: "journey",      file: "river-delta.svg", side: "left",  w: 26, y: 52, op: 0.13 },
    { section: "markets",      file: "cargo-ship.svg",  side: "left",  w: 36, y: 62, op: 0.14 },
    { section: "cta",          file: "rickshaw.svg",    side: "right", w: 26, y: 55, op: 0.15 },
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

  // The drifting "stars" are retired: the client wants a woven Bengali ground,
  // not a starfield. Texture now lives in .bg-weave (CSS). Particles left in the
  // file below in case the effect is ever wanted again, but no longer started.
};

/* ----------------------------------------------------------------------------
   Gold dust.

   Not "particles". What we are drawing is the dust that hangs in a shaft of
   light over a river at the end of the day: motes that rise more than they
   fall, sway as the air moves, and catch the light one at a time.

   Three things make it read as dust rather than as dots on a canvas:

     DEPTH   every mote has a z (0..1). z drives radius, opacity AND speed
             together — near motes are bigger, brighter and faster; far ones are
             small, dim and slow. Parallax you feel rather than notice. Getting
             this wrong (random size, uniform speed) is what makes particle
             fields look cheap.
     SWAY    horizontal drift is a slow sine on its own phase per mote, so the
             field breathes instead of marching in one direction.
     BREATH  each mote twinkles on its own long period, so the light arrives
             unevenly, the way real dust turns through a beam.

   Deterministic seeding (a small LCG, never Math.random) so the field is
   identical on every load — the page must never look subtly different twice.
   Cost: one canvas, ~70 arcs a frame, transform-free. Paused when hidden.
-----------------------------------------------------------------------------*/
function initParticles(stage) {
  const canvas = document.createElement("canvas");
  canvas.className = "bg-particles";
  canvas.setAttribute("aria-hidden", "true");
  stage.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let w, h, dpr, motes = [], raf, running = true, t = 0;

  // Deterministic pseudo-random in [0,1) — same field every load, forever.
  const seeded = (s) => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);

  const build = () => {
    const rnd = seeded(20260715);
    const count = window.innerWidth < 768 ? 30 : 72;
    motes = Array.from({ length: count }, () => {
      const z = rnd();                       // 0 = far, 1 = near
      return {
        x: rnd() * w,
        y: rnd() * h,
        z,
        r: 0.35 + z * 1.35,                  // near motes are larger
        rise: 0.05 + z * 0.22,               // ...and rise faster
        swayAmp: 0.15 + rnd() * 0.5,         // its own sway width
        swayHz: 0.0004 + rnd() * 0.0011,     // ...and its own period
        phase: rnd() * Math.PI * 2,
        twHz: 0.0006 + rnd() * 0.0016,       // its own twinkle period
        twPhase: rnd() * Math.PI * 2,
      };
    });
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);   // cap: 3x costs, never shows
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  };
  resize();
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

  const draw = () => {
    if (!running) return;
    t += 16;
    ctx.clearRect(0, 0, w, h);

    for (const m of motes) {
      m.y -= m.rise;
      const x = m.x + Math.sin(t * m.swayHz + m.phase) * (m.swayAmp * 34);

      // Wrap at the top; re-enter at the bottom on a new column so the field
      // never develops visible vertical "lanes".
      if (m.y < -4) { m.y = h + 4; m.x = (m.x * 1.618 + 97) % w; }

      // Twinkle, biased bright: mostly present, occasionally catching the light.
      const tw = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * m.twHz + m.twPhase));
      const alpha = (0.10 + m.z * 0.45) * tw;

      ctx.beginPath();
      ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214,178,96,${alpha.toFixed(3)})`;
      ctx.fill();

      // The nearest few carry a soft halo — the only glow in the field, which is
      // exactly why it reads as gold and not as white noise.
      if (m.z > 0.82) {
        ctx.beginPath();
        ctx.arc(x, m.y, m.r * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,75,${(alpha * 0.13).toFixed(3)})`;
        ctx.fill();
      }
    }
    raf = requestAnimationFrame(draw);
  };
  draw();

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) draw(); else cancelAnimationFrame(raf);
  });
}
