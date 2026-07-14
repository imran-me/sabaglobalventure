# PROJECT_CONTEXT.md — Saba Global Venture

> **Purpose of this file:** the living context / memory for the project. Read it at
> the start of every session to instantly recall what this is, what's done, what's
> next, and which decisions are already settled. **Append to the Session Log at the
> bottom at the end of each working day.**

---

## 1. What this project is

A **top-tier luxury corporate showcase website** for **Saba Global Venture**, an
international wholesale export/import house based in **Cumilla, Bangladesh**.

- **NOT an e-commerce site.** No cart, no checkout, no prices, no orders.
- Every "buy/order" intent becomes a **bulk inquiry** routed to **WhatsApp + Gmail**.
- Goal: project **authority, authenticity, scale and trust**; present ~20–25 products
  beautifully; make it effortless for a wholesale buyer to start a chat.
- Signature experience: a cinematic **"Delta to the World"** background — golden
  silhouettes of the Bengal delta and global trade drifting over a majestic-blue
  canvas with slow ocean currents.

Full source-of-truth spec: **`Saba-Global-Venture-Landing-Page-Prompt.md`**.

---

## 2. Company facts (do not invent)

- **Legal name:** Saba Global Venture
- **HQ / origin:** Cumilla, Bangladesh — the story is *from Bangladesh to the world*
- **Markets (9):** Bangladesh (origin **hub**), UAE, Saudi Arabia, Qatar, Kuwait,
  Oman, Bahrain, India, Malaysia
- **Categories (8):** Rice · Shrimp · Fish & Seafood · Fresh Vegetables ·
  Fresh Fruits · Spices · Potato · Dry & Agro Foods
- **Tagline:** "From Bangladesh to the World."
- **Ethos:** "Trusted Sourcing Partner from the Bengal Delta"

### Client-supplied contact details
| Field | Value | Status |
|---|---|---|
| WhatsApp | `8801879175319` (+880 1879 175319) | ✅ provided |
| Email | `sabaglobalventures.bd@gmail.com` | ✅ provided |
| Phone | `+880 1879 175319` | ⚠ reusing the WhatsApp number — confirm if the office has a separate line |
| Address | Green House Mansion, Jhautola, Adarsha Sadar, Cumilla 3500, Bangladesh | ✅ provided |
| Google Maps | Derived **search** URL built from the address | ⚠ replace with the exact share link once the office is pinned on Maps |
| Website | `{WEBSITE}` | ⏳ pending |
| Instagram / Facebook / LinkedIn | `{INSTAGRAM}` / `{FACEBOOK}` / `{LINKEDIN}` | ⏳ pending (unset socials hide themselves) |

> When contact details change, update **both** `assets/js/config.js` **and** the
> JSON-LD block in `index.html` (search engines read the HTML copy), and **bump
> `seeded` in `store.js`** — a browser that already seeded has saved Settings that
> mask `config.js`, so returning visitors would otherwise keep the old details.

**Single source of truth = `assets/js/config.js`** (overridden live by Admin →
Settings). Every CTA reads from there. Unset socials hide themselves; the contact
map stays a placeholder until a real address exists — we never guess a location.

---

## 3. Brand system (quick reference — full tokens in `assets/css/tokens.css`)

- **Canvas:** majestic blue (`--blue-900 #071C4D`) dominant; **gold is jewelry (≤10%)**.
- **Royal blue** `#1E4FD8` is the signature accent; **ocean blue** `#1279C4` is the
  "current" (motion, routes, glows); **powder blue** `#A9CFEA` softens.
- **Gold:** `--gold-500 #C9A24B` for lines/eyebrows/CTAs; metallic gradient for the mark.
- **Type:** Cormorant Garamond **300** (display), Marcellus (wordmark/numerals),
  Manrope (body/UI). Signature flourish: `<em>` inside a heading = **gold italic**.
- **Motif:** nakshi-kantha damask + 8-point lotus star (faint card textures).
- Gold text only on deep blue, never on frost.

---

## 4. Tech & architecture decisions

| Area | Decision | Notes |
|---|---|---|
| Front-end | Semantic HTML5 + modern CSS + vanilla JS | No build step, no UI kit |
| Structure | **Modular** — each section = own HTML partial + own CSS file | |
| HTML composition | `sections/*.html` loaded via `assets/js/include.js` (fetch) | **Needs a local web server** |
| Smooth scroll | **Native only** — deliberately NO Lenis | Lenis hijacks the wheel; desktop scrolling felt stuck |
| Animation | IntersectionObserver reveals (no GSAP dependency) | Degrades gracefully; respects reduced-motion |
| Background | Authored SVG **masks** tinted by one gold gradient | No photography needed; `background.js` |
| Admin / backend | **Firebase** (Auth + Firestore), optional & graceful | Blank config ⇒ pure localStorage |
| Hosting | Static host + CDN | |

> ⚠ **Serve over HTTP during dev** — `python -m http.server 8777`. Opening
> `index.html` via `file://` blocks the fetch includes and you get a blank page.
> (There is no Node on this machine; use Python.)

---

## 5. File / folder map

```
sabaglobal/
├── Saba-Global-Venture-Landing-Page-Prompt.md   # master spec (source of truth)
├── PROJECT_CONTEXT.md      # THIS FILE — read first each session
├── README.md               # how to run / deploy / edit
├── FIREBASE_SETUP.md       # backend setup + security rules
├── index.html              # the whole site (single-scroll)
├── products.html  about.html  contact.html      # redirect stubs -> index.html#…
├── admin.html              # hidden admin panel
├── site.webmanifest  robots.txt  sitemap.xml
├── sections/               # HTML partials
│   ├── header hero trust featured about products
│   ├── capabilities markets cta contact footer furniture
├── assets/
│   ├── css/
│   │   ├── tokens.css base.css layout.css components.css background.css
│   │   ├── admin.css
│   │   └── sections/*.css   (one per section)
│   ├── js/
│   │   ├── config.js        # contact details + settings (SINGLE SOURCE)
│   │   ├── store.js         # localStorage data layer (+ mirrors to Firestore)
│   │   ├── firebase-config.js  firebase.js   # optional cloud backend
│   │   ├── include.js cta-helper.js media.js img-fallback.js
│   │   ├── preloader.js nav.js cursor.js reveal.js counters.js
│   │   ├── background.js products.js featured.js hero-deck.js
│   │   ├── markets-map.js contact.js admin.js
│   │   └── main.js          # boot orchestrator
│   ├── data/products.js     # seed catalogue (21 SKUs, 1 draft)
│   └── img/
│       ├── icons/    favicon + app icons + emblem.svg + og-image.png
│       ├── brand/    logo.svg (wide lockup)
│       ├── silhouettes/  sampan tiger water-lily paddy port-crane cargo-ship mosque
│       ├── patterns/ kantha-gold.svg  lotus-gold.svg
│       ├── bg/       delta-scene.svg  (the hero panorama)
│       ├── products/ ⏳ real product photos go here
│       └── photos/   ⏳ real brand/story photos go here
```

---

## 6. Build status

- [x] CSS foundation (tokens, base, layout, components, background)
- [x] Per-section CSS + admin.css
- [x] JS modules (all rebranded from the reference engine)
- [x] Seed catalogue — 21 SKUs across 8 categories (20 published + 1 draft)
- [x] HTML section partials + include system
- [x] Pages (index, redirect stubs, admin) + manifest/robots/sitemap
- [x] Brand assets — emblem, logo, favicon set, OG image, 7 silhouettes, 2 patterns, delta panorama
- [x] Verified in a real headless Chrome (see Session Log)
- [ ] **Firebase wiring** — credentials are BLANK by design; client must create the project
- [ ] **Real content** — contact details, product photography, confirmed specs/HS codes
- [ ] Lighthouse pass on the live domain

---

## 7. Open questions / TODO for the client

1. Remaining `{CURLY}` values: **website + socials**. Also confirm whether the office
   has a **separate phone line** (the WhatsApp number is currently shown as the phone)
   and supply the exact **Google Maps share link** for the office pin.
2. Confirm the trust-strip numbers (Export Grades "20+", Core Categories "8").
3. Confirm certifications actually held — HACCP / Halal / Phytosanitary are shown by
   default and **EU Approved Est. is off**. Never display a cert not held.
4. Supply real product photography → `assets/img/products/` and a story photo →
   `assets/img/photos/`. Until then a branded blue/gold placeholder is drawn.
5. Confirm the line card: grades, packaging, MOQ, **HS codes** and specs are
   realistic placeholders and must be verified before launch.
6. Decide whether to carry the non-food **Jute Bags & Sacking** line (currently
   `status: "draft"`, so it's hidden).
7. Create the Firebase project (`FIREBASE_SETUP.md`) and rotate away from the demo gate.

---

## 8. Conventions

- **Never invent contact details.** Leave `{CURLY}` until the client provides.
- Keep the "inquiry-only, no e-commerce" rule sacred — no prices, cart, or checkout.
- All CTAs go through `cta-helper.js` so the number/email come from `config.js`.
- Every file has a top comment explaining its role and how to edit it.
- Decorative SVGs are `aria-hidden`; real images get descriptive `alt`.
- The site-wide emblem must be the **square crest**, not the wide lockup.

---

## 9. Session Log (newest first)

### 2026-07-15 — Session 2 (THE REDESIGN — and why it was needed)
**Client feedback, verbatim and fair:** *"you have made everything same to same of
sara al salam, just color is different… it is not a luxurious practice to make
exactly same, I have given that as reference of what type of luxurious vibe I want.
If SAS is 100/100, make Saba 1000/100."*

They were right. Session 1 kept the reference's section order, its card grid, its
repeated eyebrow/H2/rule stack and its single dark canvas, and changed the paint.
That is a recolour, not a design. What changed:

- **Palette deepened and opened.** Added **indigo** (`--indigo-950…700`) as the real
  canvas — Bengal traded indigo to the world, so it earns its place — plus a warm
  **ivory** second canvas and **terracotta** as the rare spark. The page now
  ALTERNATES indigo ↔ ivory. This is the single biggest reason it now reads as
  editorial rather than as a template.
- **The arch became the house's shape.** A Mughal/Bengali cusped niche
  (`ornaments/arch-mask.svg` + `arch-outline.svg`) applied as a CSS mask: the hero
  **portal**, the story portrait, and every product as a **framed arched portrait**.
- **New Bengal ornament, all of it specific:** Jamdani weave (the figured muslin)
  replacing the generic damask; **alpona** rice-paste line art that draws itself in.
- **Narrative restructured** into numbered chapters (01 Origin → 05 Trade Desk), with
  the story placed BEFORE the catalogue, an asymmetric hero (1.15/.85, never 50/50),
  rotated side-rails, a market **marquee**, a word-by-word kinetic headline, the stats
  as an **editorial numbers band**, and capabilities as a **numbered ruled list**
  instead of six identical icon cards.
- **Removed** `hero-deck.js` (superseded by the portal) and the old divider.

**Bug found while verifying (would have shipped broken):** the arch masks were
declared as `--arch: url("../img/…")` in tokens.css. A relative `url()` inside a
custom property resolves against the stylesheet that **uses** the var, not the one
that declares it — so it became `assets/css/img/…` from `assets/css/sections/*.css`,
404'd, and **a mask whose image fails masks the element away entirely**: the hero
portal and all 20 product niches rendered blank. Paths are now spelled out per
stylesheet. Never put a relative url() in a custom property.

**Verified:** no horizontal overflow at 390 or 1440; 0 broken images; 0 dead CTAs; 20
arched niches sized correctly; alpona draws; marquee loops seamlessly; every
[data-reveal] reaches opacity 1 (see the headless caveat below — fast scripted
scrolling outruns IntersectionObserver on a GPU-less browser and gives false
"unrevealed" readings; park the element and dwell instead).


### 2026-07-15 — Pushed to GitHub
- Repo: **<https://github.com/imran-me/sabaglobalventure.git>**, branch `main`,
  initial commit `fa4f55b` (86 files), author **Md Imran Hossain**.
- The repo root **is** the site root (`index.html` at top level), so GitHub Pages can
  serve it as-is. `.nojekyll` is committed and every path is relative, so a project
  subpath (`imran-me.github.io/sabaglobalventure/`) works.
- ⏳ To go live: repo → **Settings → Pages → Deploy from branch `main` / root**.
  Then add that domain to Firebase → Authentication → Authorized domains.
- Note: only the `sabaglobal/` project folder was committed. The parent directory
  still holds `saraalsalam-main.zip` and the old Sara Alsalam prompt — those belong to
  a **different client** and were deliberately kept out of this repo.

### 2026-07-15 — Session 1 (project built end-to-end)
Built the entire site from scratch, reusing the proven architecture of the earlier
`saraalsalam` project (same category of business) but with a wholly new identity:
**blue + gold, Bangladesh-origin, "Delta to the World"** instead of green + gold,
Dubai-origin, Arabian monuments.

- **Design system rebuilt**, not recoloured: new tokens (majestic/royal/ocean/powder
  blue), new type pairing (Cormorant Garamond 300 + Marcellus + Manrope, replacing
  Cinzel), gold-italic `<em>` as the signature heading flourish, nakshi-kantha and
  lotus card motifs replacing the arabesque ones.
- **Background reconceived.** The reference leaned on client-supplied Dubai photos we
  don't have for Bangladesh, so the whole system is now authored **SVG masks tinted by
  one gold gradient** (delta panorama + 7 silhouettes) plus drifting ocean currents.
  No photography needed and nothing to go stale.
- **Engine reused** (store/admin/firebase/media/include/nav/reveal/counters/…) with a
  `SAS*`→`SGV*` rename and new seeds. Catalogue seeded with 21 realistic BD SKUs.
- **Firebase credentials deliberately blanked** — the reference file still carried the
  *other* project's live keys. Client must create a fresh project.
- **Bugs found and fixed while verifying** (all real, all caught by driving a browser):
  1. `applyEmblem()` stamped the wide `logo.svg` lockup into `.brand .mark`, printing
     the brand name twice in the header. Seed now points at the square crest.
  2. The hero deck showed raw **alt text**: it only checked that a photo *URL* existed,
     and its 1.3s rotation re-assigned `src`, defeating `img-fallback.js`'s one-shot
     guard. It now **probe-loads** each photo and removes itself if none decode.
  3. **Deep links were broken.** Partials load async, so the browser processed
     `index.html#products` before that section existed and silently did nothing —
     breaking every redirect stub and bookmark. `main.js honourInitialHash()` added.
  4. `contact.js` passed both `product` and `body` to `CTA.whatsappUrl`, but the helper
     prefers the short per-product template when `product` is set — **silently
     discarding the form's detailed summary**. Now passes `body` only.
  5. `trust.html` used `.stat-row`/`.cert-row` while `trust.css` styles `.stats`/`.certs`,
     so the counters stacked vertically down the left edge. (Found by auditing every
     styled class against the markup — worth repeating after any partial is rewritten.)
  6. The image placeholder was 4:3 and got sliced by the portrait featured cards; it's
     now square with wrapped text so it survives any crop.
  7. **`cta-helper.js` built `https://wa.me/164`** from the unfilled `{WHATSAPP_E164}`
     placeholder — it strips non-digits, and "164" survives. That is a *live link to a
     stranger*, not the "visibly invalid" link its comment claimed. Unset contact
     details now yield a dead `#` + `data-cta-unset` + a console warning.
  8. `initReveal` ran **before** `initProducts`/`initFeatured` injected their cards, so
     those cards were never observed and never got a stagger `--i`; they stayed visible
     only by an accident of CSS specificity (`[data-reveal-stagger].is-visible > *`
     outranks `[data-reveal]`). `initReveal` now runs after all injecting modules.
- **Verified** with a hand-rolled CDP client (no Node/Playwright on this box): zero
  console errors; 20 published cards, 9 map pins + 8 trade routes, 4 counters, 8
  background accents all render; every `[data-reveal]` reaches opacity 1 after scroll;
  deep links land 80px from the section top; **no horizontal overflow at 390px**
  (`scrollWidth == clientWidth == 390`) — the exact bug the reference shipped;
  admin logs in and lists all 21 products and 8 categories.
- ⚠ **Headless caveats for future sessions:** the CDP profile **caches JS hard** — call
  `Network.setCacheDisabled` or you'll "verify" a stale build and think your fix did
  nothing (this happened). `--virtual-time-budget` screenshots show
  below-fold content unrevealed (IO never fires) and `captureBeyondViewport` resizes the
  viewport, which re-expands `.hero{min-height:100svh}` and wrecks the layout. Take
  **viewport** shots after an instant scroll instead. With `--disable-gpu` the blur/mask
  compositing is so slow a 0.6s transition can take seconds of wall-clock — don't
  mistake that for a stuck animation.
- ⏳ Next: client contact details → Firebase project → real photography → Lighthouse.
```
(Add a new dated entry above this line each day.)
```
