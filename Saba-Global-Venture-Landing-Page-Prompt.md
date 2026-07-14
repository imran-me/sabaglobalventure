# MASTER BUILD PROMPT — "Saba Global Venture" Luxury Corporate Landing Page

> This is the single source of truth for the project. Build **exactly** to this spec — nothing is too small to style, down to the favicon, eyebrow labels, hover states and footer fine print. Where you see `{CURLY_PLACEHOLDERS}`, the client must supply the real value before launch; **never invent contact details.**

---

## 0. ROLE & GOAL

You are a senior brand designer + front-end engineer building a **top-tier, luxurious corporate showcase website** for an international export/import house based in Bangladesh. This is **not** an e-commerce store — there is **no cart, no checkout, no prices, no order flow**. Every "buy/order" intent is converted into a **bulk inquiry** routed to **WhatsApp** and **Gmail**. The site exists to project **authority, authenticity, scale and trust**, present ~20–25 products beautifully, and make it effortless for a wholesale buyer to start a conversation.

The signature experience: a **cinematic "Delta to the World" animated background** — golden silhouettes of the Bengal delta and global trade (sampan under sail, container ship, gantry cranes, Royal Bengal tiger, Shapla water lily, paddy stalks, the Shat Gombuj mosque) that **drift, parallax and fade in as the user scrolls** — present like luminous shadows, elegant and never distracting, over a majestic-blue canvas with slow ocean currents.

Quality bar: **flawless on mobile and desktop**, every micro-interaction intentional, every word on-brand. If a detail isn't specified here, choose the most premium, restrained option.

---

## 1. COMPANY FACTS (use verbatim)

- **Legal name:** Saba Global Venture
- **Business:** International export & import — **wholesale / bulk only**
- **Origin / HQ:** **Cumilla, Bangladesh** — the story is *from Bangladesh to the world*
- **Trading markets:** Bangladesh (origin hub), UAE (Dubai), Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, India, Malaysia — i.e. the Gulf, the wider Middle East and South Asia
- **Core product categories (8):** Rice, Shrimp, Fish & Seafood, Fresh Vegetables, Fresh Fruits, Spices, Potato, Dry & Agro Foods
- **Catalogue size:** ~20–25 SKUs (small, curated — design for quality, not volume)
- **Model:** Buyers browse → inquire in bulk → redirected to **WhatsApp** + **Gmail** (no on-site transactions)
- **Pages/sections:** Home (single-scroll narrative), Products, About, Contact, + hidden **Admin**
- **Contact (CLIENT TO PROVIDE):** `{WHATSAPP_E164}` (e.g. 8801XXXXXXXXX), `{SALES_EMAIL}`, `{PHONE}`, `{ADDRESS_CUMILLA}`, `{GOOGLE_MAPS_URL}`, `{WEBSITE}`, socials `{INSTAGRAM}` `{FACEBOOK}` `{LINKEDIN}`.

---

## 2. BRAND IDENTITY SYSTEM

### 2.1 Positioning & personality
A delta trading house with global reach. Adjectives to embody in every choice: **prestigious, trustworthy, established, oceanic, abundant, international, meticulous.** Think the dignity of a sovereign trade house crossed with a clean modern corporate site. Bangladesh is not a footnote here — it is the *source of the quality*, and the design should say so with pride, never with kitsch.

### 2.2 Logo
- **Primary mark:** a fine double gold ring enclosing a stylised **Shapla (water lily — Bangladesh's national flower)** above water lines, with a rising-sun arc behind and `SGV` in small tracked caps beneath. Lives at `assets/img/icons/emblem.svg`.
- **Wordmark lockup:** "SABA GLOBAL" in Marcellus small-caps (metallic gold), "VENTURE" beneath in fine tracked Manrope (powder blue), then a gold rule and "FROM BANGLADESH TO THE WORLD". Lives at `assets/img/brand/logo.svg`.
- The **square crest** is the site-wide mark (it sits next to a text wordmark in the header — using the wide lockup there prints the brand name twice).
- Subtle metallic gold gradient on the mark; never flat-yellow.

### 2.3 Color palette (exact tokens — see `assets/css/tokens.css`)
Majestic blue + royal blue + ocean blue + powder blue + gold.

| Token | Hex | Use |
|---|---|---|
| `--navy-950` | `#02071A` | Deepest background, footer, preloader |
| `--navy-900` | `#041031` | Deep background wash |
| `--blue-900` | `#071C4D` | **Primary brand surface — "Majestic Blue"** |
| `--blue-800` | `#0B2A6B` | Dark blue sections, gradients |
| `--royal-700` | `#14369E` | Royal Blue deep — cards on dark |
| `--royal-600` | `#1E4FD8` | **ROYAL BLUE** — the signature accent |
| `--ocean-500` | `#1279C4` | Ocean Blue — currents, routes, links |
| `--ocean-400` | `#34A3E0` | Bright ocean — icon tints, glows |
| `--powder-300` | `#A9CFEA` | **Powder Blue** — soft highlights |
| `--powder-200` | `#CFE4F5` | Powder panels |
| `--powder-100` | `#EDF4FB` | Light section background |
| `--gold-700` | `#9A7423` | Gold shadow / engrave |
| `--gold-500` | `#C9A24B` | **Primary gold** (lines, eyebrows, CTAs) |
| `--gold-300` | `#E8CE79` | Hover gold, glows |
| `--gold-metallic` | `linear-gradient(135deg,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)` | Logo, premium headings, CTAs |
| `--frost-100` | `#F2F7FD` | Text on dark, light section bg |
| `--ink-900` | `#050C1C` | Text on light |
| `--line` | `rgba(201,162,75,.22)` | Gold hairline borders |

**Rules:** majestic blue is the dominant canvas; **gold is the jewelry (≤10% of any view)**; powder/frost carry the readable light sections; ocean blue is the "current" — used for motion, routes and glows. Maintain ≥ 4.5:1 contrast for body text (gold text only on deep blue, never on frost).

### 2.4 Typography
Load via Google Fonts with `display=swap` and preconnect; provide system fallbacks.
- **Display / H1–H2:** `Cormorant Garamond` at **weight 300** — high stroke contrast and generous air. It only reads premium at size; never set display type below ~1.4rem.
- **Wordmark / numerals:** `Marcellus` (Roman inscriptional).
- **Body / UI:** `Manrope` — 400/500/600/700.
- **Eyebrows / labels / nav:** `Manrope` 600, UPPERCASE, `letter-spacing:.22em`, `--gold-500`.
- **The signature flourish:** emphasis inside a display heading (`<em>`) is **gold italic** — e.g. "Bangladesh's Harvest, *Carried to the World.*"
- **Type scale (clamp, fluid):** h1 `clamp(2.9rem,6.2vw,5.6rem)`; h2 `clamp(2.1rem,4vw,3.6rem)`; h3 `1.6rem`; lead `1.3rem`; body `1rem/1.7`; eyebrow `.75rem`. Line-height: headings 1.06, body 1.7. Max measure 68ch.

### 2.5 Iconography & motifs
Thin-line gold icons (1.5px stroke). Recurring decorative motif: **nakshi-kantha** (Bengali embroidery) damask and an 8-point lotus star, used as faint card textures (`assets/img/patterns/`) and section dividers. Gold filigree corner ornaments on key panels. Use sparingly and consistently.

### 2.6 Imagery direction
Rich, warm, editorial product photography on deep-blue or powder backgrounds: paddy fields at golden hour, ice-packed tiger shrimp, whole hilsa, jute sacks of rice, spice mounds, crates of mango, container ships at Chattogram port. Consistent warm grade against the cool canvas. Every image: descriptive `alt`, lazy-loaded, soft gold inner-shadow frame on hover.

### 2.7 Voice & copy rules
Confident, refined, globally-minded. Short declarative sentences. Trade vocabulary (FOB, CIF, MOQ, HS code, origin, grade, packaging, cold chain) used naturally. Never salesy/discount language. Every CTA is an **invitation to a conversation**, not a transaction.

---

## 3. TECH & ARCHITECTURE

- **Front-end:** Semantic HTML5 + modern CSS (custom properties, grid, flex) + vanilla JS. Lightweight, fast, no heavy UI kits, no build step.
- **Structure:** **modular** — each section is its own HTML partial in `sections/` plus its own CSS file in `assets/css/sections/`, composed by `assets/js/include.js`. ⚠ Because partials are fetched, the site **must be served over HTTP** during dev (`python -m http.server`); `file://` blocks the includes.
- **Smooth scroll:** native only. Do **not** add Lenis/Locomotive — they hijack the mouse wheel and make desktop scrolling feel stuck.
- **Animation:** IntersectionObserver-driven reveals (no GSAP dependency, so it degrades gracefully). Respect `prefers-reduced-motion` everywhere.
- **Backend:** **Firebase** — Auth (email/password admin), Firestore (products, ads, inquiries, categories, countries, settings). Optional and graceful: with blank credentials the whole site runs on localStorage exactly as if there were no backend.
- **Hosting:** static host (GitHub Pages / Netlify / Vercel / Firebase Hosting) + CDN.
- **No e-commerce libraries.** No payment, no cart.

---

## 4. GLOBAL / SITE-WIDE ELEMENTS

### 4.1 Favicon & app icons
Gold Shapla on `--blue-900`. Deliver `favicon.svg`, `favicon.ico` (16/32/48/64), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` (maskable), `site.webmanifest` (theme_color `#071C4D`, background_color `#02071A`). `<meta name="theme-color" content="#071C4D">`.

### 4.2 Head / SEO / sharing
- Title pattern: `Saba Global Venture — Bulk Rice, Shrimp, Fish & Fresh Produce Exporter from Bangladesh`.
- Meta description, keywords, canonical, robots. **Open Graph + Twitter cards** with a branded 1200×630 share image.
- **JSON-LD:** `Organization` (name, logo, areaServed = the 9 markets, contactPoint). Keep it in sync with `config.js` — search engines read the HTML copy, not the JS.
- `lang="en"`. Sitemap.xml + robots.txt (robots must `Disallow: /admin.html`).

### 4.3 The signature: "Delta to the World" background system
A fixed, full-viewport layered stage behind all content (`z-index:-1`):
- `.bg-glow` — radial mood lighting on the majestic-blue canvas (gold bloom top-right, ocean bloom bottom-left).
- `.bg-scene` — a wide golden **delta panorama** (palms, sampan under sail, container ship, gantry cranes on a waterline), authored as an SVG **mask** so a gold gradient tints it. Slow Ken-Burns drift.
- `.bg-waves` — two ocean currents drifting in opposite directions along the base. Pure gradients: cheap, GPU-only.
- `.bg-veil` — blue veil + scrim so frost/gold text stays legible.
- `.side-accent` — per-section golden silhouettes that **scroll with the page**, alternating left/right, fading up as each section enters view. Mapping (`background.js`): hero → sampan; trust → water lily; about → tiger; products → paddy; capabilities → port cranes; markets → cargo ship; cta → water lily; contact → mosque.
- `.bg-particles` — a drifting golden particle field (canvas, deterministic seeding so it never shimmers differently between loads).
- `.bg-grain` + `.bg-vignette` — film grain (5%) and vignette tie it together.
- **Silhouettes are SVG masks, not photos** — one gold gradient tints every one; nothing to go stale, no photography needed.
- **Performance:** transform/opacity only, IntersectionObserver (not scroll handlers), particles paused when the tab is hidden, **side accents removed from layout below 760px** (not just `opacity:0` — anchored off-edge art otherwise widens the page and causes horizontal scroll). Fully disabled under `prefers-reduced-motion`.

### 4.4 Site-wide UI furniture
Preloader (gold crest + shimmering progress line) · scroll-progress gold hairline · custom gold cursor ring (desktop only) · section reveals (rise 24px + fade, staggered) · gold hairline draws in under titles · back-to-top pill · floating contact dock (WhatsApp green + Email gold + Products, with tooltips; WhatsApp gently pulses) · toasts · lotus dividers between sections.

---

## 5. HEADER / NAVIGATION

- **Layout:** crest + wordmark left; nav `Home · Products · About · Contact`; right cluster: WhatsApp + Email icon-buttons and a primary **"Request a Quote"** gold button.
- **States:** transparent over hero → on scroll, **shrinks + frosted deep-blue bar + gold bottom hairline**. Active link has a gold underline; a **scroll-spy** underlines whichever section is in view.
- **Mobile:** a **fixed inline nav** (Home/Products/About) in the header — not collapsed behind a hamburger. Full-screen overlay menu available with large serif links, staggered in, plus WhatsApp/Email/Quote buttons and socials.
- Keyboard accessible (gold focus rings), `aria-expanded`, escape-to-close.
- **Single-page:** nav links are in-page anchors. On any non-home page they are rewritten to `index.html#…`. Because partials load asynchronously, the app must **honour the initial hash itself after the includes resolve** — the browser's native fragment scroll fires before the section exists and silently does nothing.

---

## 6. PAGE / SECTION BLUEPRINT (Home single-scroll)

Order = scroll order. `products.html` / `about.html` / `contact.html` exist only as **redirect stubs** to `index.html#section`.

1. **Hero** — Eyebrow "Cumilla · Bangladesh · Global Trade". H1: "Bangladesh's Harvest, *Carried to the World.*" Cormorant-italic lead. Two CTAs: **"Request a Bulk Quote"** (gold → WhatsApp) + **"Email Our Trade Desk"** (ghost gold → Gmail). A row of market flag chips. Two tilted, gold-framed "product plate" cards cross-fade through the catalogue photos on desktop — and **remove themselves unless a photo actually loads** (a URL in the data is not proof the file exists). Animated scroll cue.
2. **Trust strip** — gold-hairline band, animated **stat counters** (Trading Markets — *live, counts the active Admin countries* · Export Grades · Core Categories · Bulk/Wholesale) + certification chips (client to confirm; never display a cert not held).
3. **Featured deck** — auto-rotating gold crossfade through `featured:true` products, 5-up desktop / 3-up mobile, pauses on hover/off-screen/hidden tab.
4. **About** — two-column story + framed image with gold filigree, values chips, pull-quote. All editable from Admin → Page Content.
5. **Products (the centerpiece)** — category filter pills + responsive card grid. Each card: image (zoom-on-hover, gold frame), category eyebrow, serif name, one-line description, **all** origin + packaging chips, HS code, and **"Inquire" (WhatsApp)** + **Email** mini-buttons. Cards float and lift with a gold glow. Clicking opens a **detail modal** with gallery, grades, origins, packaging, MOQ, specs and a **WhatsApp/email inquiry pre-filled about that product**. 2-up on mobile.
6. **Capabilities** — six gold-line-icon cards: Direct Sourcing, Quality Control, Sea & Air Freight, Unbroken Cold Chain, Custom Packaging, Trade Documentation.
7. **Markets** — a real **equirectangular world map** (`viewBox 0 0 360 180`, `x = lng+180`, `y = 90-lat`) with golden landmasses, geographic gold pins and **animated trade-route arcs drawn outward from the Bangladesh hub**. Adding a country in Admin (with lat/lng) makes a pin + route appear.
8. **CTA band** — "Ready to place a *bulk inquiry?*" + WhatsApp/Email + market chips.
9. **Contact** — inquiry form (Name, Company, Country, Product interest [built from live Admin categories], Quantity/MOQ, Message) → validates, stores to Admin → Inquiries, then **opens WhatsApp with the full summary pre-filled**. Contact card: WhatsApp, Email, Phone, Cumilla HQ, hours, socials (unset links hide themselves), and a map that **stays a placeholder until a real address exists** — never embed a guessed location. Note clearly: **"Wholesale & bulk inquiries only."**
10. **Footer** (see §8).

---

## 7. ADMIN PANEL (hidden, secure, fully functional)

Route `/admin.html` — not linked publicly except a tiny gold dot in the footer, and `Disallow`ed in robots.txt.

- **Auth:** Firebase Auth email/password, session persistence, route guard, no public signup. With Firebase unconfigured it falls back to a **local demo gate** — in that mode every edit is confined to the editing browser and is not public. Configure Firebase before relying on it.
- **Dashboard:** counts (products, active ads, new inquiries), recent inquiries, quick actions.
- **Products CRUD:** `name, slug, category, shortDesc, longDesc, origins[], grades[], packaging[], moq, hsCode, images[{url,alt}], specs{}, featured, order, status(published|draft), tags[]`. Live preview card. Desktop image upload (canvas-resized to ≤1200px JPEG, kept under Firestore's 1MB doc limit) or a Google Drive share link.
- **Ads / banners:** `title, image, caption, ctaType(whatsapp|email|link), ctaValue, placement, active, order, startDate, endDate`.
- **Inquiries log:** sortable, mark handled, **Export CSV**.
- **Site settings:** WhatsApp, email, phone, address, map URL, socials, hours, emblem — the public site reads these live, no redeploy.
- **Content group:** Page Content (hero + story text/image), Categories, Countries (name, ISO, flag, emblem, lat/lng, hub flag, live toggle), Branding/Emblem.
- **Export catalogue:** regenerates `assets/data/products.js` to commit — the publish path when hosting on GitHub Pages without Firebase.
- **Security:** Firestore rules lock writes to the authed admin and reads to published docs; input sanitisation; XSS-safe rendering.

---

## 8. FOOTER

Deep `--navy-950` with a lotus divider and a faint cargo-ship silhouette. Columns:
1. **Brand:** crest + wordmark, ethos line, social icons (gold hover).
2. **Explore:** Home · Products · About · Contact.
3. **Products:** all 8 categories, deep-linking into the filtered showcase.
4. **Markets:** flag dots (injected from the live country list).
5. **Get in touch:** WhatsApp, Email, Phone, Cumilla HQ, hours. "Bulk & wholesale inquiries only."
- **Bottom bar:** gold hairline; `© {YEAR} Saba Global Venture. All rights reserved.`; `Trade Markets · GCC · Middle East · South Asia`; `Privacy · Terms`. Tiny gold admin dot → `/admin.html`.
- Fine print: "FOB / CIF terms available · MOQ applies to all products."

---

## 9. FUNCTIONAL / INTEGRATION SPEC

- **WhatsApp click-to-chat:** `https://wa.me/{E164}?text=` + URL-encoded message. Per-product: `Hello Saba Global Venture, I'd like a bulk quote for {product} ({packaging}). Destination: {country}. Please share FOB/CIF terms. — {name}`.
- **Email:** `mailto:` primary, plus a **Gmail compose** deep link for desktop users. Same pre-filled subject/body.
- **Contact form:** validate → store to `inquiries` → hand off to WhatsApp with the summary. ⚠ Pass **only** the assembled `body` to the WhatsApp helper: the helper prefers the short per-product template whenever `product` is set and would otherwise throw the detailed summary away.
- All CTAs reuse one helper (`cta-helper.js`) so the number/email come from **settings** (single source).

---

## 10. RESPONSIVENESS & ACCESSIBILITY & PERFORMANCE

- Breakpoints `≥1280 / 1024 / 768 / ≤640 / ≤380`. Fluid `clamp()` + grid. Mobile: single/two-column, ≥44px tap targets, sticky dock, product grid 2-up, reduced particle count. **No horizontal scroll, ever** — test 320→1920px, and remember `overflow-x:hidden` belongs on `<html>` as well as `<body>`.
- WCAG AA: contrast checked, visible gold focus rings, full keyboard nav, `aria` labels, alt text on every image (decorative SVGs `aria-hidden`), skip-to-content link, `prefers-reduced-motion` fully honored.
- Lazy-load images, defer non-critical JS, compress SVGs, Lighthouse ≥ 90, CLS ~0.
- **Native `<select>` options must be given dark text on a light background** — they inherit the field's frost colour otherwise and render nearly invisible in the OS dropdown.

---

## 11. DELIVERABLES & ACCEPTANCE

Source (front-end + admin), Firebase config + rules, seed catalogue, README, favicon/app-icon set, OG image, sitemap/robots.

**Done when:** every section above exists and is themed; the delta background animates on scroll (and stops under reduced-motion); all CTAs pre-fill WhatsApp + Gmail from settings; admin can log in and fully manage products/ads/inquiries/settings/content with changes reflected live; deep links land on the right section; flawless 320→1920px with no horizontal scroll; Lighthouse ≥90; no placeholder text left except the `{CURLY}` client values.

---

### FINAL INSTRUCTION TO THE BUILDER
Treat this as a flagship project for a respected international trading house. Restraint + richness: majestic-blue canvas, gold as jewelry, the delta as living shadow, words chosen with care. When unsure, choose the more elegant, more premium option — and never break the "no e-commerce, inquiry-only" rule.
