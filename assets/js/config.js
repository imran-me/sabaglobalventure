/* ============================================================================
   config.js — SINGLE SOURCE OF TRUTH for contact details + site settings
   ----------------------------------------------------------------------------
   The CLIENT edits this file (or, once the site is live, the Admin > Settings
   panel, which overrides these values without a redeploy). Every CTA on the
   site reads from here via cta-helper.js, so you change the WhatsApp number /
   email / address ONCE, in one place.

   IMPORTANT: values wrapped in {CURLY} are PLACEHOLDERS. Replace them with the
   real, client-supplied values before launch. Never invent contact details —
   a wrong phone number on a trading site costs real business. Anything still
   left as {CURLY} is treated as UNSET by cta-helper.js: its links are disabled
   rather than half-built, so the gap is obvious instead of silently wrong.

   STILL PENDING: {WEBSITE}, {INSTAGRAM}, {FACEBOOK}, {LINKEDIN}.

   WHERE EACH VALUE SHOWS UP:
     whatsapp -> every "Inquire" button, the floating dock, the contact card
     email    -> "Email Our Trade Desk", the dock, the contact card, the footer
     address  -> contact card, footer, JSON-LD structured data
     markets  -> hero chips, CTA band chips, footer, the world map
     stats    -> the trust strip counters
   ========================================================================== */

window.SITE_CONFIG = {
  /* ---- Business identity ---------------------------------------------- */
  legalName: "Saba Global Venture",
  shortName: "Saba Global",
  brandName: "Saba Global Venture",
  tagline:   "From Bangladesh to the World.",
  ethos:     "Trusted Sourcing Partner from the Bengal Delta",
  website:   "{WEBSITE}",                 // e.g. www.sabaglobalventure.com

  /* ---- Contact (client-supplied) --------------------------------------
     WhatsApp must be E.164 WITHOUT the '+' or any spaces.                 */
  whatsapp: "8801879175319",                          // +880 1879 175319
  email:    "sabaglobalventures.bd@gmail.com",
  // The client gave one number, for WhatsApp. It is shown as the phone line too;
  // replace this if there is a separate landline for the office.
  phone:    "+880 1879 175319",
  address:  "Green House Mansion, Jhautola, Adarsha Sadar, Cumilla 3500, Bangladesh",
  // Derived from the address above — a Google Maps *search*, not a guessed pin.
  // Swap in the exact share link from Google Maps once the office is pinned there.
  mapUrl:   "https://www.google.com/maps/search/?api=1&query=Green+House+Mansion%2C+Jhautola%2C+Adarsha+Sadar%2C+Cumilla+3500%2C+Bangladesh",
  hours:    "Sat–Thu, 9:00–18:00 (BST, GMT+6)",

  /* ---- Social links (optional — unset links hide themselves) ---------- */
  socials: {
    instagram: "{INSTAGRAM}",
    facebook:  "{FACEBOOK}",
    linkedin:  "{LINKEDIN}",
  },

  /* ---- Markets (order = display order) --------------------------------
     Bangladesh is the ORIGIN hub; the rest are destination markets. The world
     map draws trade routes from the hub to each of these. Manage the live list
     in Admin > Content > Countries (this array is only the first-run seed).  */
  markets: [
    { name: "Bangladesh",   flag: "🇧🇩" },
    { name: "UAE",          flag: "🇦🇪" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Qatar",        flag: "🇶🇦" },
    { name: "Kuwait",       flag: "🇰🇼" },
    { name: "Oman",         flag: "🇴🇲" },
    { name: "Bahrain",      flag: "🇧🇭" },
    { name: "India",        flag: "🇮🇳" },
    { name: "Malaysia",     flag: "🇲🇾" },
  ],

  /* ---- Trust-strip stats ----------------------------------------------
     NOTE: the "Trading Markets" counter is LIVE — main.js replaces its value
     with the number of active countries you manage in Admin. The others are
     static; CLIENT TO CONFIRM the real numbers before launch.              */
  stats: [
    { value: 9,   suffix: "",  label: "Trading Markets" },
    { value: 20,  suffix: "+", label: "Export Grades" },
    { value: 8,   suffix: "",  label: "Core Categories" },
    { value: 100, suffix: "%", label: "Bulk / Wholesale" },
  ],

  /* ---- Certifications — CLIENT TO CONFIRM ------------------------------
     Set show:false (or delete the row) for anything not actually held. Do NOT
     display a certification the company does not hold.                     */
  certs: [
    { label: "HACCP",            show: true },
    { label: "Halal Certified",  show: true },
    { label: "Phytosanitary",    show: true },
    { label: "EU Approved Est.", show: false },
  ],

  /* ---- Message templates (used by cta-helper.js) -----------------------
     {product}, {packaging}, {country}, {name} are filled in at click time.  */
  templates: {
    // Generic "Request a Quote" button.
    generic:
      "Hello Saba Global Venture, I'd like to start a bulk inquiry. " +
      "Please share your catalogue and FOB/CIF terms. Thank you.",
    // Per-product inquiry.
    product:
      "Hello Saba Global Venture, I'd like a bulk quote for {product} ({packaging}). " +
      "Destination: {country}. Please share FOB/CIF terms. — {name}",
    // Email subject line.
    emailSubject: "Bulk Inquiry — {product}",
  },
};
