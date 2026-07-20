/* ============================================================================
   nav.js — Header scroll state, mobile overlay menu, active link, scroll bar,
            back-to-top button.
   ----------------------------------------------------------------------------
   Called by main.js AFTER the header/footer partials are injected.
   ========================================================================== */

window.initNav = function initNav() {
  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".mobile-menu");
  const openBtn = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".mobile-menu .close");
  const toTop = document.querySelector(".to-top");
  const waterFill = document.querySelector(".waterline-fill");
  const waterDot = document.querySelector(".waterline-dot");

  /* ---- Header shrink/frost + waterline progress + back-to-top ---------
     The scrollable height is cached and only recomputed on resize/load —
     reading scrollHeight/clientHeight on every scroll tick forces a synchronous
     layout reflow, which is the classic scroll-jank cause. */
  let docMax = 0;
  const recomputeMax = () => {
    const h = document.documentElement;
    docMax = h.scrollHeight - h.clientHeight;
  };
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (toTop) toTop.classList.toggle("is-shown", y > window.innerHeight);
    const frac = docMax > 0 ? y / docMax : 0;
    // The waterline: the river fills as you read; the dot rides the tip.
    if (waterFill) waterFill.style.transform = `scaleY(${frac})`;
    if (waterDot) waterDot.style.top = `${(frac * 100).toFixed(3)}%`;
  };
  recomputeMax();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", recomputeMax, { passive: true });
  window.addEventListener("load", recomputeMax);
  onScroll();

  /* ---- Mobile overlay menu ------------------------------------------- */
  const setMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
  };
  openBtn && openBtn.addEventListener("click", () => setMenu(true));
  closeBtn && closeBtn.addEventListener("click", () => setMenu(false));
  menu && menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---- Back-to-top ---------------------------------------------------- */
  toTop && toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---- Single-page menu -----------------------------------------------
     The nav links are in-page anchors (#home / #products / #about / #contact)
     so the menu just scrolls to that section. On any page OTHER than the home
     page (e.g. a direct hit on a legacy URL), rewrite them to index.html#…
     so they still land on the right section. */
  const onHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  const navLinks = [...document.querySelectorAll(".nav a, .mobile-menu nav a")];
  if (!onHome) {
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) a.setAttribute("href", "index.html" + href);
    });
  }

  /* ---- Scroll-spy: highlight the section currently in view ------------ */
  const spy = navLinks.filter((a) => (a.getAttribute("href") || "").startsWith("#"));
  if (onHome && spy.length && "IntersectionObserver" in window) {
    const setCurrent = (id) => spy.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      a.toggleAttribute("aria-current", on);
      if (on) a.setAttribute("aria-current", "page");
    });
    const sections = spy
      .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => io.observe(s));
  }
};
