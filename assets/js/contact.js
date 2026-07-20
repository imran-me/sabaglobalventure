/* ============================================================================
   contact.js — Inquiry form: validation + handoff to WhatsApp/Gmail
   ----------------------------------------------------------------------------
   On submit: validate inline, build a summary message, store the inquiry (so it
   appears in Admin → Inquiries and mirrors to Firestore), then open WhatsApp
   with the pre-filled summary and show a toast. NEVER transacts.

   Also upgrades the contact card's map placeholder to a real embedded map once
   a genuine address exists in config.js / Admin → Settings.
   ========================================================================== */

window.initContact = function initContact() {
  initMap();

  const form = document.querySelector(".inquiry-form[data-inquiry]");
  if (!form) return;

  // Keep the "Product interest" dropdown in sync with the admin-managed
  // categories, so it always matches the live catalogue (built safely via DOM).
  const productSel = form.elements["product"];
  if (productSel && window.Store && window.Store.getCategoryNames) {
    const names = window.Store.getCategoryNames();
    if (names.length) {
      productSel.textContent = "";
      const add = (label, val) => {
        const o = document.createElement("option");
        o.textContent = label;
        if (val != null) o.value = val;
        productSel.appendChild(o);
      };
      add("Select a category…", "");
      names.forEach((n) => add(n));
      add("Multiple / Other");
    }
  }

  const field = (name) => form.elements[name];
  const setErr = (name, on) => {
    const wrap = field(name)?.closest(".field");
    wrap && wrap.classList.toggle("is-invalid", on);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ---- Validate ----
    const data = readForm();
    let ok = true;
    let firstInvalid = null;
    ["name", "country", "product", "reply"].forEach((k) => {
      const empty = !data[k];
      setErr(k, empty);
      if (empty) { ok = false; firstInvalid = firstInvalid || k; }
    });
    if (!ok) {
      // Move focus to the first missing field so the inline (already-translated)
      // error is announced, and translate the summary toast for the AR edition.
      field(firstInvalid)?.focus();
      const msg = "Please complete the required fields.";
      toast(window.I18N ? window.I18N.t(msg) : msg, "err");
      return;
    }

    const body = buildSummary(data);

    // ---- Persist the inquiry (Store -> localStorage; shows in admin) ----
    if (window.Store) { try { window.Store.addInquiry(data); } catch (_) {} }
    else if (typeof window.saveInquiry === "function") { try { window.saveInquiry(data); } catch (_) {} }

    // ---- Handoff to WhatsApp (primary) ----
    // Pass ONLY `body`: CTA.buildMessage prefers the short per-product template
    // whenever `product` is set, which would throw away the detailed summary we
    // just assembled. The summary already names the product.
    const waUrl = window.CTA.whatsappUrl({ body });
    window.open(waUrl, "_blank", "noopener");

    // Tell the buyer exactly where their inquiry now lives — the message is
    // DRAFTED in WhatsApp, not yet sent, and the desk replies within a day.
    toast("Your inquiry is drafted in WhatsApp — press Send there. We reply within 24 hours.", "ok", 7000);
    form.reset();
  });

  // "Prefer Email?" carries the SAME filled form into the email draft — the
  // static gmail CTA it decorates only knows a generic subject line.
  form.querySelector("[data-email-inquiry]")?.addEventListener("click", (e) => {
    const data = readForm();
    if (!data.name && !data.message && !data.product) return;  // empty form → generic CTA is fine
    e.preventDefault();
    e.stopPropagation();
    const c = (window.Store && window.Store.getSettings && window.Store.getSettings()) || window.SITE_CONFIG || {};
    const to = String(c.email || "").trim();
    if (!to || /^\{.*\}$/.test(to)) return;
    const subject = `Bulk Inquiry — ${data.product || "General"} — ${data.name || "Buyer"}`;
    const url = "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(to)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(buildSummary(data))}`;
    window.open(url, "_blank", "noopener");
    if (window.Store) { try { window.Store.addInquiry({ ...data, via: "email" }); } catch (_) {} }
    toast("Your inquiry is drafted in Gmail — press Send there. We reply within 24 hours.", "ok", 7000);
  });

  function readForm() {
    return {
      name: field("name")?.value.trim(),
      company: field("company")?.value.trim(),
      country: field("country")?.value.trim(),
      product: field("product")?.value,
      qty: field("qty")?.value.trim(),
      reply: field("reply")?.value.trim(),
      message: field("message")?.value.trim(),
    };
  }

  function buildSummary(data) {
    return (
      `Bulk inquiry from ${data.name || "a buyer"}` +
      (data.company ? ` (${data.company})` : "") + `.\n` +
      `Product: ${data.product || "to discuss"}\n` +
      `Quantity / MOQ: ${data.qty || "to discuss"}\n` +
      `Destination: ${data.country || "to discuss"}\n` +
      (data.reply ? `Reply to: ${data.reply}\n` : "") +
      (data.message ? `Notes: ${data.message}\n` : "") +
      `Please share FOB/CIF terms.`
    );
  }

  // Clear error styling as the user fixes a field.
  form.addEventListener("input", (e) => {
    const wrap = e.target.closest(".field");
    wrap && wrap.classList.remove("is-invalid");
  });

  /* ---- Map: upgrade the placeholder once a real address exists ---------
     sections/contact.html ships a placeholder panel rather than an iframe with
     a guessed address. As soon as config.js / Admin → Settings carries a real
     address (i.e. not a {CURLY} placeholder), swap in the embedded map. */
  function initMap() {
    const host = document.querySelector(".map[data-map]");
    if (!host) return;
    const c = window.SITE_CONFIG || {};
    const address = String(c.address || "").trim();
    const unset = !address || /^\{.*\}$/.test(address);
    if (unset) return;   // keep the placeholder + its "add your link" note

    const frame = document.createElement("iframe");
    frame.title = `${c.legalName || "Saba Global Ventures"} — ${address}`;
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer-when-downgrade";
    frame.src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    host.textContent = "";
    host.classList.remove("map--placeholder");
    host.appendChild(frame);
  }

  /* ---- Toast helper (shared) ----------------------------------------- */
  function toast(msg, kind = "ok", ms = 4000) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    const t = document.createElement("div");
    t.className = `toast toast--${kind}`;
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }
  window.toast = window.toast || toast;
};
