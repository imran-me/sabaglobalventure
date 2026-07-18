# PROJECT_CONTEXT.md — Saba Global Ventures

> **Purpose of this file:** the living context / memory for the project. Read it at
> the start of every session to instantly recall what this is, what's done, what's
> next, and which decisions are already settled. **Append to the Session Log at the
> bottom at the end of each working day.**

---

## 0. Standing instructions (read first)

These are durable rules from the owner. They do not change between sessions.

1. **Attribution — Md Imran Hossain, alone.** Every commit and push is authored
   *and* committed by **Md Imran Hossain** (`me.imran.personal@gmail.com`, already
   the global git identity). **Never** add a `Co-Authored-By` trailer or list any
   AI assistant as author/committer/contributor. If such a trailer ever reaches
   pushed history, rewrite it out and force-push `main` (the owner has authorized
   force-pushing `main` for this specific purpose).
2. **Keep this context in the repo, and push it.** Standing instructions and
   session context live *inside the project* (this file) — not only in any
   assistant's private memory — and get pushed to GitHub, so they travel with the
   code. Append a Session Log entry and push at the end of each working session.
3. **Design bar: the reference is a *vibe*, never a blueprint.** This project was
   rejected once for copying a sibling site's structure and recolouring it. If the
   reference is 100/100, this must be 1000. Luxury = **Bengali specificity**, not
   gloss: indigo/ivory that breathes, the লতা পাতা cusped arch that draws itself
   in, alpona, Jamdani, terracotta, the Royal Bengal tiger, delta/nouka/bazar/
   rickshaw — motifs placed by **meaning**. See §0.1 of
   `Saba-Global-Venture-Landing-Page-Prompt.md` for the full "what this must NOT be".
4. **Never invent contact details.** Anything unknown stays a visible `{CURLY}`
   placeholder; `cta-helper.js` disables (not half-builds) links for unset values.
5. **Verify by driving the real thing.** No Node/Playwright on this machine — serve
   over HTTP (`python -m http.server`) and use the CDP client in the scratchpad;
   emulate `prefers-reduced-motion` to check it, don't just read the CSS; keep zero
   horizontal overflow at 320–1920px.

---

## 1. What this project is

A **top-tier luxury corporate showcase website** for **Saba Global Ventures**, an
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

- **Legal name:** Saba Global Ventures
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

### 2026-07-16 — Standing instructions captured in-repo
Owner asked that context + instructions always be saved *inside the project
folder* and pushed to GitHub (not only in an assistant's private memory). Added
**§0 Standing instructions** at the top of this file — attribution (Md Imran
Hossain only, no AI co-author), keep-context-in-repo-and-push, the design bar,
the never-invent-contacts rule, and how to verify. These are durable and should
be honoured every session.

### 2026-07-15 — Session 4 (লতা পাতা: the arches are carved, not drawn)
Client: *"make all arc more creative, Lota Pata, Flower little, after scrolling,
do animation, like the alpana."*

A plain cusped outline is architecture. **Lota-pata is what a Bengali craftsman
would actually carve into it** — so every arch on the site is now wreathed in
climbing vine, leaf, bud and small five-petal flowers, closing at a lotus-bud
finial, and it **paints itself in on scroll exactly like the alpona**.

- **`assets/img/ornaments/arch-lota.svg`** — 52 drawable strokes + 4 flower
  centres. Base geometry is byte-identical to `arch-mask.svg`, so the ornament
  sits exactly on the opening. Pixel-verified: zero ink in the central field, so
  content still shows through cleanly.
- **`sections/defs.html`** — the ornament is defined ONCE and `<use>`d by all
  **22 arches** (hero portal, story portrait, 20 product niches). Inlining it per
  card would have put ~300KB of duplicate path data in the DOM. This works
  because `stroke-dasharray`/`-dashoffset` are **inherited** SVG properties, so
  the draw-in set on the `<use>` cascades into the referenced art.
- **Split into three `<use>`s (frame / vines / crest)** because CSS cannot reach
  inside a `<use>` shadow tree — that split is the only way to stagger them. They
  draw in the order a craftsman works: structure, then growth, then the clasp.

⚠ **TRAP, VERIFIED THE HARD WAY — do not "fix" this:**
`vector-effect="non-scaling-stroke"` is **incompatible with `pathLength` +
`stroke-dasharray` in Blink**. The dash lengths resolve in *screen* space while
`pathLength` normalises *user* space, which shatters every leaf into permanent
fragments — not just mid-animation, but at `dashoffset:0` too. It is deliberately
absent from `arch-lota.svg`; hairline weight is achieved with `stroke-width:0.25`
instead. There is a comment in the file saying so. Re-adding it will silently
break the ornament.

Superseded and removed: the static masked-gradient `.media-frame` on product
cards, and the plain two-path `.arch-frame` in the hero (kept in CSS only as a
fallback for any future un-ornamented arch).

### 2026-07-15 — Session 3 (the craft pass: art, animation, detail)
Client: *"more luxurious, premium, perfection even in the tiniest detailing, more
premium animations, art animation, background animation, more themed"* and
*"royal bengal pattern, royal bengal tiger, rikshaw, river, nouka, bazar too —
premium artistic luxurious cultural"*.

**THE JOURNEY FRIEZE (the centrepiece).** `sections/frieze.html` — one unbroken
gold line, 164 strokes across 7 scenes: paddy field → braided river → nouka under
sail → bazar (baskets, balance scale, awning) → Dhaka rickshaw (its painted back
panel engraved, not coloured) → port cranes → container ship leaving. It **draws
itself scene by scene, left to right**, at reading pace. Placed deliberately
between "03 The House" and "04 Reach": it is the bridge from *how we work* to
*where it goes*. Every stroke carries `pathLength="100"` so they draw at one rate.

**Cultural art, placed by meaning not decoration** (see `background.js`
SIDE_ACCENTS — the comment there explains each pairing): tiger beside the origin
story, **bazar** behind the catalogue (a catalogue *is* a market), **river-delta**
(the braided delta from above — the shape of Bangladesh) behind the Journey,
**rickshaw** at the CTA (the last mile), mosque at the sign-off.

**Royal Bengal damask** (`patterns/royal-bengal-gold.svg`) — a medallion whose
petals are tiger-stripe brush blades set in terracotta-temple geometry. Used at
**full strength in exactly one place**: the CTA band, the moment we ask. Used
everywhere it would be wallpaper. It drifts one tile per 90s.

**Background is now living art:** "liquid silk" — four colour blooms drifting on
**coprime periods (37/53/71/89s) so the canvas never resyncs and never visibly
repeats**; gold **caustics** skimming the waterline (translating exactly one
120px pattern period, so the loop is invisible); and **gold dust** rebuilt with
real depth — every mote's z drives radius, opacity AND speed together, with its
own sway and twinkle phase. Deterministic seeding (a small LCG, never
Math.random) so the field is identical on every load.

**The overture.** The preloader was capped at 1.2s — which cut its own animation
off mid-gesture. Now: ring draws closed, crest blooms, wordmark opens out of tight
tracking, rule runs out; it holds for the beat (2.2s), never for the network
(3.2s ceiling), is dismissable, and **greets once per session** — a flourish on
arrival is hospitality, the same flourish on every navigation is a toll.

**Detail pass:** arches that **draw themselves** (a mason's line); a one-pass gold
**sheen** across a niche on hover; images **unveiled** (clip-path + a lifting
curtain) rather than faded; a **two-part cursor** — a dot that never lags plus a
ring that does, which is what reads as weight — with magnetic snap to anything
interactive.

**Bugs found and fixed:**
- **The header went muddy grey.** `rgba(2,7,26,.72)` was written when the whole
  page was dark; over the new ivory chapters that 28% transparency pulled warm
  paper through and blended to ~#474A56. Now near-opaque indigo.
- **`counters.js` never emitted the suffix span** that `trust.css` paints gold, so
  the "+" was silently the wrong colour. Also moved to easeOutExpo and a
  left-to-right stagger.
- Dropped `mix-blend-mode: difference` from the cursor: over ivory it turned the
  gold ring muddy cyan.
- Reduced-motion verified by emulating the media feature, not by reading the CSS:
  no cursor, no particles, no curtain, arches drawn instantly.


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

### 2026-07-18 — "Louis Vuitton meets Bengal" luxury overhaul (client called earlier build "cheap")
Client rapid-fire brief + a reference screenshot of a "Our Products" page as the north star.
Standing rules unchanged (push as **Md Imran Hossain** only, never Claude; save context here).
- **Exact palette (client-fixed)** — now in tokens.css: Midnight Navy `#081B45`, Royal Gold
  `#C8A24A`, Warm Ivory `#F7F2E8`, Rice White `#FDFBF6`, Terracotta `#A85A2A`, Paddy Green
  `#597A3A`. Token names kept (`--indigo-*` etc.) but revalued around one confident navy;
  gold is antique (highlight never bleaches to white).
- **NO bright green buttons — ever.** New button grammar (components.css): thin **gold
  outline at rest → solid gold seal on hover** (label→ink navy), no glow, no light-sweep.
  `.btn--whatsapp` reuses this (was WhatsApp green). Dock bubbles gilt-on-navy, no green pulse.
- **Background**: retired the gold-particle starfield (background.js no longer calls
  `initParticles`). Added `.bg-weave` (index.html + background.css): Midnight Navy under a
  <20% Jamdani buti + lotus watermark + faint terracotta bloom, radial-feathered.
- **Catalogue filter** = the reference's signature: circled thin-gold **line-art category
  glyphs** (shapla/paddy/shrimp/fish/gourd/chilli/potato/jute-sack), name beneath, active
  fills gold. Icons live in `products.js` `ICONS{}`; styles `.cat-filter/.cat-round`.
- **Empty niches fixed**: an empty `<img src>` never fired the load-error fallback, so some
  arches rendered blank. `products.js nicheSrc()` now injects `ImgFallback.makePlaceholder`
  directly. Placeholder redrawn to a Shapla lily on the new palette (img-fallback.js).
- **Certifications** → 8 gold-outline badges w/ tiny line-art icons (config.js `certs[]` now
  carries `icon:`; `main.js CERT_ICONS{}` + `renderCerts`; trust.css `.cert-badge`): ISO,
  HACCP, Halal, Phytosanitary, Premium Export, Non GMO, Hygienically Processed, Moisture
  Controlled. Any not actually held → `show:false`.
- **Bengal Story** band added to products.html (fertile plains of Bengal… aroma/purity/
  consistency) flanked by gold sampan+shapla line-art + centred serif pull-quote.
- **Arch ornament redraw** (sections/defs.html): leaf vines → **rice panicles (paddy) +
  jamdani buti diamonds + shapla-bud finial**, thin gold. Draw-in contract preserved
  (`.lota-line`/`.lo-line` + `pathLength=100`, no `vector-effect`). Client said **NOT a
  temple arch** — silhouette (the cusped arch-mask) is UNCHANGED; Bengali feel is ornament-only.
- **Client will supply real photography** (chosen in-session). Biggest remaining gap to the
  reference is photos (paddy-sunset banner, spice bowls, shrimp, rice-in-field). Cannot be
  generated — wire them via Admin → Products / a banner slot when they arrive. Hero portal
  still uses the older leafy `arch-lota.svg` (not the defs symbols) — swap to paddy later for
  full consistency.
- ⚠ **NEVER `taskkill /IM chrome.exe`** — it killed the client's working browser mid-session.
  Headless renders must terminate ONLY their own spawned instance (proc.terminate / by PID).
- Commits this session: `6e6c6bd` (palette/buttons/weave/filter/badges/story), `a8506ce`
  (paddy/shapla/jamdani vines). Both pushed to origin/main, 0 Claude attribution.
```
(Add a new dated entry above this line each day.)
```
